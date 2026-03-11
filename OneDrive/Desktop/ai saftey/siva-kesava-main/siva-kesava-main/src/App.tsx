import React, { useState } from 'react';
import { 
  Shield, 
  MessageSquare, 
  Phone, 
  Map as MapIcon, 
  Info, 
  Menu, 
  X,
  LayoutDashboard,
  LogIn,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './components/AuthContext';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import SafetyTips from './components/SafetyTips';
import EmergencyContacts from './components/EmergencyContacts';
import SafetyMap from './components/SafetyMap';

// --- Sub-components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: <Shield className="w-4 h-4" /> },
    { id: 'chat', label: 'Safety Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'tips', label: 'Safety Tips', icon: <Info className="w-4 h-4" /> },
    { id: 'contacts', label: 'Emergency', icon: <Phone className="w-4 h-4" /> },
    { id: 'map', label: 'Safety Map', icon: <MapIcon className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={() => setActiveTab('home')}
            >
              <div className="bg-teal-500 p-2 rounded-lg mr-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-slate-900">SafeTravel AI</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-teal-50 text-teal-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
            
            {user ? (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="mr-2 w-4 h-4" />
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('signin')}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all"
              >
                <LogIn className="mr-2 w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === item.id 
                      ? 'bg-teal-50 text-teal-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setActiveTab(user ? 'dashboard' : 'signin');
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium bg-slate-900 text-white"
              >
                {user ? <LayoutDashboard className="mr-3 w-5 h-5" /> : <LogIn className="mr-3 w-5 h-5" />}
                {user ? 'Dashboard' : 'Sign In'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onStartChat }: { onStartChat: () => void }) => {
  return (
    <div className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                Next-Gen Travel Safety
              </span>
              <h1 className="mt-4 text-4xl tracking-tight font-display font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                Your Smart Travel <span className="text-teal-600">Safety Companion</span>
              </h1>
              <p className="mt-6 text-lg text-slate-500 sm:text-xl">
                SafeTravel AI provides real-time safety advice, emergency assistance, and local safety maps to ensure your journey is as secure as it is memorable.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <button
                  onClick={onStartChat}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all transform hover:scale-105"
                >
                  <MessageSquare className="mr-2 w-5 h-5" />
                  Start Safety Chat
                </button>
              </div>
            </motion.div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden"
            >
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Travel Safety"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-teal-500 p-1.5 rounded-lg mr-2">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-slate-900">SafeTravel AI</span>
          </div>
          <div className="flex space-x-6 text-sm text-slate-500">
            <a href="#" className="hover:text-teal-600">Privacy Policy</a>
            <a href="#" className="hover:text-teal-600">Terms of Service</a>
            <a href="#" className="hover:text-teal-600">Contact Us</a>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-slate-400">
            &copy; 2026 SafeTravel AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Initializing Safety Systems...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero onStartChat={() => setActiveTab('chat')} />
            <div className="bg-slate-50 py-16">
              <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-slate-900">Why Choose SafeTravel AI?</h2>
                <p className="mt-4 text-slate-600">We combine advanced AI with local safety data to protect you everywhere.</p>
              </div>
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="bg-teal-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI-Powered Advice</h3>
                  <p className="text-slate-600">Get instant answers to safety questions based on real-time global safety reports.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                    <MapIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Local Safety Maps</h3>
                  <p className="text-slate-600">Visualize safe zones and emergency services near your current location.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="bg-red-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Emergency Network</h3>
                  <p className="text-slate-600">Quickly alert your family and access local emergency services with one tap.</p>
                </div>
              </div>
            </div>
            <SafetyTips />
          </>
        );
      case 'chat':
        return user ? <Chatbot /> : <SignIn />;
      case 'tips':
        return <SafetyTips />;
      case 'contacts':
        return user ? <EmergencyContacts /> : <SignIn />;
      case 'map':
        return <SafetyMap />;
      case 'dashboard':
        return user ? <Dashboard onNavigate={setActiveTab} /> : <SignIn />;
      case 'signin':
        return <SignIn />;
      default:
        return <Hero onStartChat={() => setActiveTab('chat')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Floating SOS Button */}
      <div className="fixed bottom-8 right-8 z-[1000]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSOSConfirm(true)}
          className="bg-red-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center border-4 border-white group relative"
        >
          <Phone className="w-8 h-8 animate-pulse" />
          <span className="absolute -top-12 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            EMERGENCY SOS
          </span>
        </motion.button>
      </div>

      {/* SOS Confirmation Modal */}
      <AnimatePresence>
        {showSOSConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[2000] flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Emergency SOS</h3>
              <p className="text-slate-600 mb-8">Are you sure you want to call emergency services immediately?</p>
              
              <div className="space-y-3">
                <a
                  href="tel:112"
                  onClick={() => setShowSOSConfirm(false)}
                  className="w-full bg-red-600 text-white font-bold py-4 rounded-xl flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now (112)
                </a>
                <button
                  onClick={() => setShowSOSConfirm(false)}
                  className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
