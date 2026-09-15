import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ZenuxOAuth } from 'zenuxs-oauth';
import { X, Mail, Lock, User, KeyRound, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../common/UIComponents';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    authModalMode,
    setAuthModalOpen,
    setAuthModalMode,
    login,
    loginWithZenuxs,
    register,
    sendOtp,
    verifyOtp,
    forgotPassword,
    resetPassword
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [targetExam, setTargetExam] = useState<'JEE' | 'NEET' | 'Board'>('JEE');
  const [classLevel, setClassLevel] = useState<'11' | '12' | 'Dropper'>('12');
  const [otp, setOtp] = useState('');
  const [zenuxsLoading, setZenuxsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  if (!authModalOpen) return null;

  const resetForm = () => {
    setError(null);
    setSuccessMsg(null);
    setOtpSent(false);
    setPassword('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Invalid credentials');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError(null);
    setLoading(true);

    const res = await sendOtp(email);
    setLoading(false);
    if (res.success) {
      setOtpSent(true);
      setSuccessMsg(res.message || 'OTP sent successfully to your email.');
      if (res.debugOtp) {
        setSuccessMsg(`OTP sent! (Test OTP: ${res.debugOtp})`);
      }
    } else {
      setError(res.message || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the 6-digit OTP.');
      return;
    }
    setError(null);
    setLoading(true);

    const res = await verifyOtp(email, otp);
    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Incorrect or expired OTP.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError(null);
    setLoading(true);

    const res = await register({
      name,
      email,
      password,
      targetExam,
      classLevel
    });

    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Registration failed.');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setError(null);
    setLoading(true);

    const res = await forgotPassword(email);
    setLoading(false);
    if (res.success) {
      setOtpSent(true);
      setSuccessMsg(res.message || 'Password reset OTP sent.');
      if (res.debugOtp) {
        setSuccessMsg(`Password reset OTP sent! (Test code: ${res.debugOtp})`);
      }
    } else {
      setError(res.message || 'Failed to request reset OTP.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      setError('OTP and new password are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError(null);
    setLoading(true);

    const res = await resetPassword(email, otp, newPassword);
    setLoading(false);
    if (res.success) {
      setSuccessMsg('Password reset successfully! Please log in.');
      setTimeout(() => {
        setAuthModalMode('login');
        resetForm();
      }, 1500);
    } else {
      setError(res.message || 'Failed to reset password.');
    }
  };

  const handleZenuxsLogin = async () => {
    setError(null);
    setZenuxsLoading(true);
    try {
      const oauth = new ZenuxOAuth({
        clientId: '99366ee281c7e424',
        redirectUri: window.location.origin + '/auth/callback',
        scopes: 'openid profile email',
        theme: 'light'
      });

      let tokens = await oauth.login({ mode: 'popup' }).catch(() => null);
      if (!tokens) {
        tokens = oauth.getTokens();
      }

      const userInfo = await oauth.getUserInfo().catch(() => null);
      if (userInfo) {
        const res = await loginWithZenuxs({
          sub: userInfo.sub || userInfo.id,
          email: userInfo.email,
          name: userInfo.name || userInfo.given_name || (userInfo.email ? userInfo.email.split('@')[0] : 'Student'),
          picture: userInfo.picture || userInfo.avatar
        });
        if (res.success) {
          setSuccessMsg('Logged in successfully!');
          setTimeout(() => setAuthModalOpen(false), 400);
        } else {
          setError(res.message || 'Zenuxs authentication failed on server');
        }
      } else {
        setError('Could not retrieve Zenuxs account information');
      }
    } catch (err: any) {
      setError(err?.message || 'Zenuxs sign in error');
    } finally {
      setZenuxsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-purple-700 to-indigo-800 text-white relative">
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-4 right-4 text-purple-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-black tracking-tight text-white">PREPORA</span>
            <span className="text-[10px] bg-purple-500/40 text-purple-200 px-1.5 py-0.5 rounded font-bold uppercase">
              Account
            </span>
          </div>

          <h3 className="text-lg font-bold text-white">
            {authModalMode === 'login' && 'Welcome Back'}
            {authModalMode === 'otp' && 'Fast OTP Login'}
            {authModalMode === 'register' && 'Create Your Student Account'}
            {authModalMode === 'forgot' && 'Account Recovery'}
          </h3>
          <p className="text-xs text-purple-200 mt-0.5">
            {authModalMode === 'login' && 'Sign in to access your tests, progress, and personalized study hub.'}
            {authModalMode === 'otp' && 'Enter your registered email for passwordless verification.'}
            {authModalMode === 'register' && 'Join thousands of JEE and NEET aspirants tracking progress.'}
            {authModalMode === 'forgot' && 'Reset your password securely with a one-time verification code.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex gap-2 mt-4 pt-2 border-t border-purple-600/50 text-xs font-semibold">
            <button
              onClick={() => {
                setAuthModalMode('login');
                resetForm();
              }}
              className={`pb-1 border-b-2 transition-all ${
                authModalMode === 'login'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-purple-300 hover:text-white'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => {
                setAuthModalMode('otp');
                resetForm();
              }}
              className={`pb-1 border-b-2 transition-all ${
                authModalMode === 'otp'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-purple-300 hover:text-white'
              }`}
            >
              Email OTP
            </button>
            <button
              onClick={() => {
                setAuthModalMode('register');
                resetForm();
              }}
              className={`pb-1 border-b-2 transition-all ${
                authModalMode === 'register'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-purple-300 hover:text-white'
              }`}
            >
              New Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Zenuxs OAuth Quick Login */}
          <div className="mb-5 space-y-2">
            <button
              type="button"
              onClick={handleZenuxsLogin}
              disabled={zenuxsLoading}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs shadow-md border border-purple-500/30 transition-all cursor-pointer disabled:opacity-60"
            >
              {zenuxsLoading ? (
                <span>Connecting to Zenuxs...</span>
              ) : (
                <>
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-[9px] font-black text-white">
                    Z
                  </div>
                  <span>Continue with Zenuxs</span>
                  <span className="text-[10px] text-purple-300 font-normal">SSO</span>
                </>
              )}
            </button>
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
                <span className="bg-white px-2">Or with email</span>
              </div>
            </div>
          </div>

          {/* 1. PASSWORD LOGIN */}
          {authModalMode === 'login' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@prepora.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode('forgot');
                      resetForm();
                    }}
                    className="text-xs text-purple-600 hover:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full justify-center py-2.5" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>
          )}

          {/* 2. OTP LOGIN */}
          {authModalMode === 'otp' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@prepora.com"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full justify-center py-2.5" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Send Login OTP'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Enter 6-Digit OTP
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-xs text-purple-600 hover:underline"
                      >
                        Change Email
                      </button>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className="w-full pl-9 pr-3 py-2 text-center tracking-widest text-lg font-mono font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full justify-center py-2.5" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify & Sign In'}
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* 3. REGISTRATION */}
          {authModalMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aarav@prepora.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Exam
                  </label>
                  <select
                    value={targetExam}
                    onChange={(e: any) => setTargetExam(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none bg-white font-medium"
                  >
                    <option value="JEE">JEE Main & Adv</option>
                    <option value="NEET">NEET Medical</option>
                    <option value="Board">CBSE / Board</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Class
                  </label>
                  <select
                    value={classLevel}
                    onChange={(e: any) => setClassLevel(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none bg-white font-medium"
                  >
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                    <option value="Dropper">Dropper / Target</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full justify-center py-2.5 mt-2" disabled={loading}>
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </Button>
            </form>
          )}

          {/* 4. FORGOT / RESET PASSWORD */}
          {authModalMode === 'forgot' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Registered Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@prepora.com"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full justify-center py-2.5" disabled={loading}>
                    {loading ? 'Sending Code...' : 'Send Recovery OTP'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Verification OTP
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit code"
                      className="w-full px-3 py-2 text-center tracking-widest font-mono font-bold text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full justify-center py-2.5 mt-2" disabled={loading}>
                    {loading ? 'Resetting Password...' : 'Save New Password'}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          <span>Multi-device session sync enabled with encrypted bcrypt hashing</span>
        </div>
      </div>
    </div>
  );
};
