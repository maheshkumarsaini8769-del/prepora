import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ZenuxOAuth } from 'zenuxs-oauth';
import {
  ShieldCheck,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  BookOpen,
  Zap,
  Target
} from 'lucide-react';

const ZENUXS_CLIENT_ID = '99366ee281c7e424';

export const Login: React.FC<{ defaultTab?: 'login' | 'register' | 'otp' }> = ({ defaultTab = 'login' }) => {
  const { login, register, loginWithZenuxs, sendOtp, verifyOtp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'otp'>(defaultTab);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [targetExam, setTargetExam] = useState<'JEE' | 'NEET' | 'Board'>('JEE');
  const [classLevel, setClassLevel] = useState<'11' | '12' | 'Dropper'>('12');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Feedback states
  const [loading, setLoading] = useState(false);
  const [zenuxsLoading, setZenuxsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Extract redirect query param
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/';

  // If already authenticated, redirect to destination
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  // Handle Zenuxs OAuth 2.0 Login
  const handleZenuxsLogin = async () => {
    setError(null);
    setZenuxsLoading(true);

    try {
      const redirectUri = window.location.origin + '/auth/callback';

      const oauth = new ZenuxOAuth({
        clientId: ZENUXS_CLIENT_ID,
        redirectUri,
        scopes: 'openid profile email',
        theme: 'light',
        uiFallbackMode: 'popup'
      });

      // Try popup mode first for seamless in-page login
      let tokens = null;
      let userInfo = null;

      try {
        tokens = await oauth.login({ mode: 'popup' });
        if (tokens) {
          userInfo = await oauth.getUserInfo().catch(() => null);
        }
      } catch (popupErr) {
        console.warn('Zenuxs popup failed, falling back to redirect:', popupErr);
        // Fallback to full-page redirect flow
        await oauth.login({ mode: 'redirect' });
        return;
      }

      if (!tokens && !userInfo) {
        // Check if tokens were stored
        tokens = oauth.getTokens();
        if (tokens) {
          userInfo = await oauth.getUserInfo().catch(() => null);
        }
      }

      if (userInfo) {
        const res = await loginWithZenuxs({
          sub: userInfo.sub || userInfo.id,
          email: userInfo.email,
          name: userInfo.name || userInfo.given_name || (userInfo.email ? userInfo.email.split('@')[0] : 'Student'),
          picture: userInfo.picture || userInfo.avatar,
          targetExam,
          classLevel
        });

        if (res.success) {
          setSuccessMsg('Welcome back! Logging you in...');
          setTimeout(() => {
            navigate(redirectTo, { replace: true });
          }, 400);
        } else {
          setError(res.message || 'Zenuxs login verification failed on server.');
        }
      } else {
        setError('Could not retrieve Zenuxs account information. Please try again.');
      }
    } catch (err: any) {
      console.error('Zenuxs OAuth error:', err);
      setError(err?.message || 'Zenuxs authentication encountered an error.');
    } finally {
      setZenuxsLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(res.message || 'Invalid email or password.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    const res = await register({
      name,
      email,
      password,
      targetExam,
      classLevel
    });
    setLoading(false);

    if (res.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(res.message || 'Registration failed. Please try a different email.');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setError(null);
    setLoading(true);

    const res = await sendOtp(email);
    setLoading(false);

    if (res.success) {
      setOtpSent(true);
      setSuccessMsg(res.debugOtp ? `OTP Sent! (Debug code: ${res.debugOtp})` : '6-digit OTP sent to your email.');
    } else {
      setError(res.message || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }
    setError(null);
    setLoading(true);

    const res = await verifyOtp(email, otp);
    setLoading(false);

    if (res.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(res.message || 'Invalid or expired OTP.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header / Brand Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-purple-500/30 border border-purple-400/30">
            P
          </div>
          <span className="text-3xl font-black text-white tracking-tight">PREPORA</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Student Portal & Authentication
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Sign in to access your personal test series, mistake records, and real-time score analytics.
        </p>
      </div>

      {/* Main Card Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-white/95 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/20">
          
          {/* Zenuxs OAuth 2.0 Single Sign-On Button */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleZenuxsLogin}
              disabled={zenuxsLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-lg shadow-purple-950/20 border border-purple-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {zenuxsLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting to Zenuxs Auth...</span>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-[11px] font-black text-white shadow-sm">
                    Z
                  </div>
                  <span>Continue with Zenuxs</span>
                  <span className="ml-auto text-[10px] font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800/60">
                    Client: 99366ee281c7e424
                  </span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-500 font-medium">
              ⚡ Instant 1-Click login using your official Zenuxs account
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-bold tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl mb-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setError(null); }}
              className={`py-2 rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('register'); setError(null); }}
              className={`py-2 rounded-lg transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('otp'); setError(null); }}
              className={`py-2 rounded-lg transition-all ${
                activeTab === 'otp'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quick OTP
            </button>
          </div>

          {/* Error & Success Alerts */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. SIGN IN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? 'Authenticating...' : 'Sign In to Student Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 2. REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aryan Sharma"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Exam</label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value as any)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  >
                    <option value="JEE">JEE Main & Adv</option>
                    <option value="NEET">NEET UG</option>
                    <option value="Board">CBSE / State Board</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Class</label>
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value as any)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  >
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                    <option value="Dropper">Target / Dropper</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? 'Creating Account...' : 'Create Student Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 3. QUICK OTP ACCESS */}
          {activeTab === 'otp' && (
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Registered Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    disabled={otpSent}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 disabled:bg-slate-50"
                  />
                </div>
              </div>

              {otpSent && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">6-Digit OTP Code</label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[11px] text-purple-600 font-bold hover:underline"
                    >
                      Change Email
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-mono tracking-widest text-center focus:outline-hidden focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? 'Please wait...' : otpSent ? 'Verify & Access Portal' : 'Send 6-Digit OTP'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Student Isolation Guarantee Banner */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-2.5 text-slate-500 text-[11px] leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>100% Private Student Isolation:</strong> Every student's mock attempts, bookmarks, and mistake book are strictly partitioned and synced to their user profile.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
