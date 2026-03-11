import React, { useState, useEffect } from 'react';
import { Phone, Plus, User, Trash2, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from './AuthContext';
import { collection, addDoc, query, onSnapshot, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

const EmergencyContacts: React.FC = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, `users/${user.uid}/emergencyContacts`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Contact[];
      setContacts(list);
    });

    return () => unsubscribe();
  }, [user]);

  const addContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !user) return;
    
    try {
      await addDoc(collection(db, `users/${user.uid}/emergencyContacts`), {
        uid: user.uid,
        name,
        phone,
        createdAt: serverTimestamp()
      });
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Add contact error:', error);
    }
  };

  const deleteContact = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, `users/${user.uid}/emergencyContacts`, id));
    } catch (error) {
      console.error('Delete contact error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-red-600 p-8 text-white">
          <h2 className="text-2xl font-display font-bold flex items-center">
            <Phone className="mr-3 w-8 h-8" />
            Emergency Contact System
          </h2>
          <p className="mt-2 text-red-100">Add trusted family members or friends to your emergency list.</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={addContact} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mom"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center"
              >
                <Plus className="mr-2 w-5 h-5" />
                Add Contact
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
              Your Trusted Contacts
              <span className="ml-3 bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">{contacts.length}</span>
            </h3>
            
            {contacts.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <User className="mx-auto w-12 h-12 text-slate-300 mb-4" />
                <p className="text-slate-500">No contacts added yet. Add your first emergency contact above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contacts.map((contact) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={contact.id}
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between group"
                  >
                    <div className="flex items-center">
                      <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                        <User className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{contact.name}</p>
                        <p className="text-sm text-slate-500">{contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${contact.phone}`}
                        className="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200 transition-colors"
                        title="Call Now"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-12 p-6 bg-red-50 rounded-2xl border border-red-100">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-4 mt-1" />
              <div>
                <h4 className="font-bold text-red-900">Quick Emergency Call</h4>
                <p className="text-sm text-red-700 mt-1">In case of immediate danger, use this button to call local emergency services (112/911/999).</p>
                <a
                  href="tel:112"
                  className="mt-4 inline-flex items-center px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Emergency Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
