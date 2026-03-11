import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from './AuthContext';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../firebase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: any;
}

const Chatbot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, `users/${user.uid}/chatHistory`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      
      if (msgs.length === 0) {
        setMessages([{
          id: 'welcome',
          text: "Hello! I'm your SafeTravel AI assistant. How can I help you stay safe today?",
          sender: 'bot',
          timestamp: new Date()
        }]);
      } else {
        setMessages(msgs);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    const userText = input;
    setInput('');
    setIsLoading(true);

    try {
      // Save user message
      await addDoc(collection(db, `users/${user.uid}/chatHistory`), {
        uid: user.uid,
        text: userText,
        sender: 'user',
        timestamp: serverTimestamp()
      });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      
      const data = await response.json();
      
      // Save bot message
      await addDoc(collection(db, `users/${user.uid}/chatHistory`), {
        uid: user.uid,
        text: data.reply,
        sender: 'bot',
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Chat error:', error);
      await addDoc(collection(db, `users/${user.uid}/chatHistory`), {
        uid: user.uid,
        text: "I'm currently having trouble connecting, but remember to stay alert and follow local safety guidelines.",
        sender: 'bot',
        timestamp: serverTimestamp()
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-120px)] flex flex-col">
      <div className="bg-white rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden border border-slate-200">
        <div className="bg-teal-600 p-4 text-white flex items-center">
          <div className="bg-white/20 p-2 rounded-full mr-3">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-bold">SafeTravel AI Assistant</h2>
            <p className="text-xs text-teal-100 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Online & Ready to Help
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-teal-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                </p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about travel safety..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
