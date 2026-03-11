import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  User,
  Settings,
  LogOut,
  Shield,
  MessageSquare,
  Phone,
  Map as MapIcon,
  ChevronRight,
  Clock,
  TrendingUp,
  Bell,
  Star,
  Globe,
  Zap,
  CheckCircle,
  AlertTriangle,
  Activity,
  Award,
  Home,
  BarChart2,
  X,
  Eye,
  EyeOff,
  Lock,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

const StatCard = ({ label, value, icon, color, change }: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  change?: string;
}) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm overflow-hidden group cursor-default"
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${color}`} />
    <div className="flex items-start justify-between mb-3">
      <div className={`p-2.5 rounded-xl ${color} bg-opacity-10`}>
        {icon}
      </div>
      {change && (
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {change}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-slate-900 mb-0.5">{value}</p>
    <p className="text-xs text-slate-500 font-medium">{label}</p>
  </motion.div>
);

const SafetyScoreRing = ({ score }: { score: number }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <motion.circle
          cx="50" cy="50" r={radius} fill="none"
          stroke="url(#scoreGradient)" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-bold text-slate-900">{score}</p>
        <p className="text-[10px] text-slate-500 font-medium">/ 100</p>
      </div>
    </div>
  );
};

const ActivityItem = ({ icon, title, desc, time, status }: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  time: string;
  status: 'safe' | 'warning' | 'info';
}) => {
  const statusColors = {
    safe: 'bg-green-50 text-green-600',
    warning: 'bg-amber-50 text-amber-600',
    info: 'bg-teal-50 text-teal-600',
  };
  const statusLabels = { safe: 'Secure', warning: 'Caution', info: 'Info' };
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-default">
      <div className="p-2.5 bg-slate-100 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{title}</p>
        <p className="text-xs text-slate-500 truncate">{desc}</p>
      </div>
      <div className="text-right shrink-0">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
        <p className="text-[10px] text-slate-400 mt-1 flex items-center justify-end gap-1">
          <Clock className="w-2.5 h-2.5" />{time}
        </p>
      </div>
    </div>
  );
};

const QuickAction = ({ id, title, desc, icon, gradient, onNavigate }: {
  id: string; title: string; desc: string;
  icon: React.ReactNode; gradient: string;
  onNavigate: (tab: string) => void;
}) => (
  <motion.button
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => onNavigate(id)}
    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left w-full group relative overflow-hidden"
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 ${gradient} transition-opacity`} />
    <div className={`${gradient} w-11 h-11 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
      {icon}
    </div>
    <p className="font-bold text-slate-900 text-sm">{title}</p>
    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
    <ChevronRight className="w-4 h-4 text-slate-300 mt-3 group-hover:translate-x-1 transition-transform" />
  </motion.button>
);

// Settings Modal
const SettingsModal = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [locationShare, setLocationShare] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">Account Settings</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        {/* Profile section */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
          <div className="relative">
            <img
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=14b8a6&color=fff&size=80`}
              alt="Profile"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 bg-teal-500 p-1 rounded-md border-2 border-white cursor-pointer hover:bg-teal-600 transition-colors">
              <Camera className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <p className="font-bold text-slate-900">{user?.displayName || 'Traveler'}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>
        {/* Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-semibold text-slate-800 text-sm">Safety Notifications</p>
              <p className="text-xs text-slate-500">Push alerts for safety updates</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-teal-500' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications ? 'translate-x-6' : ''}`} />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-semibold text-slate-800 text-sm">Location Sharing</p>
              <p className="text-xs text-slate-500">Share real-time location with contacts</p>
            </div>
            <button
              onClick={() => setLocationShare(!locationShare)}
              className={`w-12 h-6 rounded-full transition-colors relative ${locationShare ? 'bg-teal-500' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${locationShare ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
        >
          Save Changes
        </button>
      </motion.div>
    </motion.div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'analytics'>('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const h = currentTime.getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const stats = [
    { label: 'Safety Checks', value: '12', icon: <Shield className="w-5 h-5 text-teal-600" />, color: 'bg-teal-500', change: '+4' },
    { label: 'Saved Contacts', value: '3', icon: <Phone className="w-5 h-5 text-red-500" />, color: 'bg-red-500' },
    { label: 'Chat Sessions', value: '24', icon: <MessageSquare className="w-5 h-5 text-blue-500" />, color: 'bg-blue-500', change: '+7' },
    { label: 'Safe Zones', value: '8', icon: <Globe className="w-5 h-5 text-purple-500" />, color: 'bg-purple-500', change: '+2' },
  ];

  const activities = [
    { icon: <Shield className="w-4 h-4 text-teal-600" />, title: 'Safety Check: London', desc: 'Verified night-time safety in Soho area', time: '2h ago', status: 'safe' as const },
    { icon: <AlertTriangle className="w-4 h-4 text-amber-500" />, title: 'Alert: High Crowd Density', desc: 'Oxford Street — elevated caution advised', time: '5h ago', status: 'warning' as const },
    { icon: <CheckCircle className="w-4 h-4 text-green-600" />, title: 'Emergency Contact Added', desc: 'Jane Doe saved as trusted contact', time: '1d ago', status: 'safe' as const },
    { icon: <MessageSquare className="w-4 h-4 text-blue-500" />, title: 'AI Chat Session', desc: 'Received safety advice for Tokyo travel', time: '2d ago', status: 'info' as const },
    { icon: <MapIcon className="w-4 h-4 text-teal-600" />, title: 'Safe Zone Bookmarked', desc: 'Shinjuku Police Station added to map', time: '3d ago', status: 'safe' as const },
  ];

  const quickActions = [
    { id: 'chat', title: 'Safety Chat', desc: 'Get instant AI-powered travel advice', icon: <MessageSquare className="w-5 h-5" />, gradient: 'bg-gradient-to-br from-teal-500 to-teal-600' },
    { id: 'map', title: 'Safety Map', desc: 'Explore safe zones near you', icon: <MapIcon className="w-5 h-5" />, gradient: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { id: 'contacts', title: 'Emergency', desc: 'View & manage trusted contacts', icon: <Phone className="w-5 h-5" />, gradient: 'bg-gradient-to-br from-red-500 to-rose-600' },
  ];

  const barData = [65, 80, 55, 90, 75, 85, 92];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 pb-12">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 px-4 py-10">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left: Greeting + Profile */}
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=14b8a6&color=fff&size=100`}
                  alt="Profile"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900"
                />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">{greeting()},</p>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {user?.displayName || 'Traveler'} 👋
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="flex items-center gap-1 text-xs font-semibold text-teal-300 bg-teal-900/50 px-2.5 py-1 rounded-full border border-teal-700/50">
                    <Star className="w-3 h-3 fill-teal-300" />
                    Verified Traveler
                  </span>
                  <span className="text-xs font-semibold text-slate-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                    Pro Plan
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="hidden md:flex bg-white/10 border border-white/20 rounded-xl p-1 gap-1">
                {(['overview', 'analytics'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setActiveView(v)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                      activeView === v ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <button
                onClick={() => onNavigate('home')}
                className="p-2.5 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors"
              >
                <Home className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2.5 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/20 border border-red-400/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-colors font-semibold text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Time display */}
          <div className="mt-6 flex items-center gap-2 text-slate-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="text-slate-600">•</span>
            <span>{currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2/3: Activity + Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
                <Zap className="w-4 h-4 text-teal-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {quickActions.map(action => (
                  <QuickAction key={action.id} {...action} onNavigate={onNavigate} />
                ))}
              </div>
            </div>

            {/* Analytics Chart (only in analytics view on desktop, always on mobile) */}
            <AnimatePresence mode="wait">
              {activeView === 'analytics' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-bold text-slate-900">Safety Activity</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Weekly safety checks score</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-green-600 text-sm font-bold bg-green-50 px-3 py-1.5 rounded-full">
                      <TrendingUp className="w-4 h-4" />
                      +12% this week
                    </div>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {barData.map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${v}%` }}
                          transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
                          className={`w-full rounded-t-lg ${i === barData.length - 1 ? 'bg-gradient-to-t from-teal-600 to-teal-400' : 'bg-slate-100'} min-h-[4px]`}
                          style={{ height: `${v}%` }}
                        />
                        <span className="text-[10px] text-slate-400 font-medium">{days[i]}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-500" />
                  <h2 className="font-bold text-slate-900">Recent Activity</h2>
                </div>
                <button className="text-teal-600 text-xs font-bold hover:text-teal-700 transition-colors">View All</button>
              </div>
              <div className="p-3 divide-y divide-slate-50">
                {activities.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <ActivityItem {...a} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 1/3: Safety Score + Readiness */}
          <div className="space-y-6">
            {/* Safety Score Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 rounded-3xl p-6 text-white overflow-hidden"
            >
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/30 rounded-full blur-2xl -translate-y-1/3 translate-x-1/3" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-teal-400" />
                  <h3 className="font-bold text-sm text-slate-300">Safety Score</h3>
                </div>
                <div className="flex justify-center mb-4">
                  <SafetyScoreRing score={87} />
                </div>
                <p className="text-center text-teal-300 text-sm font-semibold mb-1">Excellent</p>
                <p className="text-center text-slate-400 text-xs">Your travel safety profile is excellent. Keep it up!</p>
                <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-slate-400">Trips Safe</p>
                    <p className="text-lg font-bold text-white">14</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-slate-400">Streak</p>
                    <p className="text-lg font-bold text-white">🔥 7d</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Emergency Readiness */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                Emergency Readiness
              </h3>
              <div className="space-y-5">
                {[
                  { label: 'Contacts Setup', pct: 100, color: 'bg-green-500', badge: 'Complete', badgeColor: 'text-green-600 bg-green-50' },
                  { label: 'Local Map Cached', pct: 65, color: 'bg-amber-500', badge: 'Partial', badgeColor: 'text-amber-600 bg-amber-50' },
                  { label: 'SOS Plan Ready', pct: 80, color: 'bg-blue-500', badge: '80%', badgeColor: 'text-blue-600 bg-blue-50' },
                ].map(({ label, pct, color, badge, badgeColor }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-slate-600 font-medium">{label}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${badgeColor}`}>{badge}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        className={`${color} h-full rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate('tips')}
                className="w-full mt-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-teal-200 hover:text-teal-600 transition-all"
              >
                Improve Readiness →
              </button>
            </div>

            {/* Daily Tip */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-5 text-white relative overflow-hidden">
              <Shield className="absolute -bottom-6 -right-6 w-28 h-28 text-white/10" />
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-teal-200 mb-2">💡 Daily Safety Tip</p>
                <p className="text-sm leading-relaxed italic">
                  "Keep a digital copy of your passport in a secure cloud folder accessible offline."
                </p>
                <button className="mt-4 text-xs font-bold text-teal-100 hover:text-white transition-colors flex items-center gap-1">
                  More tips <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
