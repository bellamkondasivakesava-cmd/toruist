import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Shield, Lock, Mail, User, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const features = [
  { icon: '🛡️', title: 'AI Safety Advisor', desc: 'Real-time threat assessment & advice' },
  { icon: '🗺️', title: 'Live Safety Maps', desc: 'Safe zones & emergency services nearby' },
  { icon: '📞', title: 'Emergency Network', desc: 'Instant SOS to trusted contacts' },
];

const SignIn: React.FC = () => {
  const { signIn, signInEmail, signUpEmail } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpEmail(email, password, name);
      } else {
        await signInEmail(email, password);
      }
      setSuccess(true);
    } catch (err: any) {
      const firebaseErrors: Record<string, string> = {
        'auth/operation-not-allowed': 'Email/Password sign-in is not enabled. Please enable it in Firebase Console → Authentication → Sign-in method.',
        'auth/email-already-in-use': 'This email is already registered. Try signing in instead.',
        'auth/user-not-found': 'No account found with this email. Please sign up first.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/too-many-requests': 'Too many failed attempts. Please wait a moment and try again.',
        'auth/network-request-failed': 'Network error. Please check your internet connection.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
        'auth/invalid-credential': 'Invalid email or password. Please check and try again.',
      };
      const msg = (err.code && firebaseErrors[err.code])
        ? firebaseErrors[err.code]
        : (err.message || 'Authentication failed. Please try again.');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-stretch">
      {/* Left panel - branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex-col justify-between p-12">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-teal-500 p-2.5 rounded-xl shadow-lg shadow-teal-500/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">SafeTravel AI</span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Your AI-powered<br />
              <span className="text-teal-400">Safety Companion</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10">
              Travel smarter and safer with real-time AI safety insights, interactive maps, and instant emergency response.
            </p>
            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm"
                >
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{f.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer quote */}
        <div className="relative z-10">
          <p className="text-slate-500 text-xs italic">
            "Trusted by travelers in 50+ countries worldwide."
          </p>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-teal-400 text-sm">★</span>
            ))}
            <span className="text-slate-500 text-xs ml-2 self-center">4.9/5 rating</span>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="bg-teal-500 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">SafeTravel AI</span>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">You're in! 🎉</h2>
                <p className="text-slate-500">Redirecting to your dashboard...</p>
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mt-6" />
              </motion.div>
            ) : (
              <motion.div
                key={isSignUp ? 'signup' : 'signin'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Heading */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {isSignUp ? 'Create your account' : 'Welcome back'}
                  </h2>
                  <p className="text-slate-500">
                    {isSignUp
                      ? 'Start your safe travel journey today.'
                      : 'Sign in to access your safety dashboard.'}
                  </p>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-5 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-2"
                    >
                      <span className="text-red-500 mt-0.5">⚠️</span>
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name field (sign up only) */}
                  <AnimatePresence>
                    {isSignUp && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm font-semibold text-slate-700">Password</label>
                      {!isSignUp && (
                        <button type="button" className="text-xs text-teal-600 font-semibold hover:underline">
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPass ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-12 py-3.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="••••••••"
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {isSignUp && (
                      <p className="text-xs text-slate-400 mt-1.5 ml-1">Minimum 6 characters</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full mt-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold py-3.5 rounded-xl hover:from-teal-700 hover:to-teal-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        {isSignUp ? 'Create Account' : 'Sign In'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-4 bg-white text-slate-400 font-medium">Or continue with</span>
                  </div>
                </div>

                {/* Google button */}
                <motion.button
                  onClick={() => signIn()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </motion.button>

                {/* Toggle */}
                <p className="mt-8 text-center text-slate-600 text-sm">
                  {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                  <button
                    onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                    className="text-teal-600 font-bold hover:text-teal-700 transition-colors hover:underline"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up for free'}
                  </button>
                </p>

                {/* Security note */}
                <div className="mt-6 flex items-center justify-center gap-1.5 text-slate-400 text-xs">
                  <Lock className="w-3 h-3" />
                  <span>Secured by Firebase Authentication</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
