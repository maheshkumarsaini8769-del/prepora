import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Target,
  GraduationCap,
  ArrowRight,
  KeyRound,
  RotateCw,
  Lock
} from 'lucide-react';
import { CanonicalExam, ClassLevel, PreparationType } from '../types';

interface LoginProps {
  defaultTab?: 'login' | 'register' | 'phone' | 'email';
}

export const Login: React.FC<LoginProps> = ({ defaultTab }) => {
  const { sendOtp, verifyOtp, setPassword, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Login mode: OTP (first time) or Password (returning users)
  const [loginMode, setLoginMode] = useState<'otp' | 'password'>('otp');

  // OTP mode: phone or email
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');

  // Input states
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPasswordInput] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  // 1-2 Initial Questions: Exam & Class Level
  const [targetExam, setTargetExam] = useState<PreparationType>('JEE');
  const [classLevel, setClassLevel] = useState<ClassLevel | 'Dropper'>('12');

  // Flow step (OTP mode): 'enter-identifier' | 'enter-otp' | 'create-password'
  const [step, setStep] = useState<'enter-identifier' | 'enter-otp' | 'create-password'>('enter-identifier');

  // Status states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/';

  // Bounce already-authenticated visitors on mount only; in-flow navigation is
  // handled explicitly after OTP verify / password login (create-password step
  // must not be skipped by an auto-redirect racing ahead of setStep).
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Password Login (no OTP needed) — mobile number OR email
  const handlePasswordLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const identifier = authMethod === 'phone' ? phone.trim() : email.trim();
    if (!identifier || !password) {
      setError(authMethod === 'phone' ? 'Please enter your mobile number and password.' : 'Please enter your email and password.');
      return;
    }
    if (authMethod === 'phone' && identifier.replace(/[^0-9]/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(identifier, password);
      setIsLoading(false);

      if (res.success) {
        setSuccessMsg('Logged in successfully!');
        setTimeout(() => {
          if (identifier.trim().toLowerCase() === 'maheshkumarsaini8769@gmail.com') {
            navigate('/admin', { replace: true });
          } else {
            navigate(redirectTo, { replace: true });
          }
        }, 300);
      } else {
        setError(res.message || 'Invalid mobile number/email or password.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Error communicating with authentication server.');
    }
  };

  // Handle Requesting OTP
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const identifier = authMethod === 'phone' ? phone.trim() : email.trim();
    if (!identifier) {
      setError(authMethod === 'phone' ? 'Please enter your mobile number.' : 'Please enter your email address.');
      return;
    }

    if (authMethod === 'phone') {
      const cleanDigits = identifier.replace(/[^0-9]/g, '');
      if (cleanDigits.length < 10) {
        setError('Please enter a valid 10-digit mobile number.');
        return;
      }
    } else {
      if (!identifier.includes('@') || !identifier.includes('.')) {
        setError('Please enter a valid email address.');
        return;
      }
    }

    setIsLoading(true);
    try {
      const res = await sendOtp(identifier);
      setIsLoading(false);
      if (res.success) {
        setStep('enter-otp');
        setOtp(res.debugOtp || res.otp || '9999');
        setSuccessMsg(`Verification code sent to ${identifier}`);
      } else {
        setError(res.message || 'Could not send OTP. Please try again.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Error communicating with authentication server.');
    }
  };

  // Handle Verifying OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!otp.trim()) {
      setError('Please enter the 4-digit OTP code.');
      return;
    }

    const identifier = authMethod === 'phone' ? phone.trim() : email.trim();
    setIsLoading(true);

    try {
      const res = await verifyOtp(identifier, otp.trim(), {
        targetExam,
        classLevel: classLevel as any,
        targetYear: 2026
      });
      setIsLoading(false);

      if (res.success) {
        // ALWAYS offer password (re)set after OTP login — Skip available — so a
        // forgotten password is always self-recoverable without support.
        setSuccessMsg('Verified! Password set/update karein (ya Skip karein).');
        setStep('create-password');
      } else {
        setError(res.message || 'Incorrect OTP code. Please enter demo OTP: 9999');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Verification error. Please try again.');
    }
  };

  // Handle Creating Password after first OTP login
  const handleCreatePassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await setPassword(newPassword);
      setIsLoading(false);

      if (res.success) {
        setSuccessMsg('Password created! Agli baar seedha password se login karein.');
        setTimeout(() => {
          navigate(redirectTo, { replace: true });
        }, 600);
      } else {
        setError(res.message || 'Could not create password. You can skip and continue.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Error creating password. You can skip and continue.');
    }
  };

  const handleSkipPassword = () => {
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080d12] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 px-4">
        <div className="inline-flex items-center justify-center gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-600/30">
            P
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            PREPORA
          </span>
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Student Sign In
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {step === 'create-password'
            ? 'Bas ek step aur — password bana lein'
            : 'Pehli baar OTP se login karein, phir password se direct entry'}
        </p>
      </div>

      {/* Main Form Container */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-white dark:bg-[#0e1620] py-6 px-5 sm:px-8 shadow-xl shadow-slate-900/5 dark:shadow-black/40 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">

          {/* Login Mode Selector: OTP vs Password */}
          {step !== 'create-password' && (
            <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setLoginMode('otp');
                  setError(null);
                }}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  loginMode === 'otp'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                <span>Login with OTP</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMode('password');
                  setError(null);
                }}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  loginMode === 'password'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Login with Password</span>
              </button>
            </div>
          )}

          {/* Feedback alerts */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* PASSWORD LOGIN MODE */}
          {loginMode === 'password' && step !== 'create-password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              {/* Phone / Email toggle for password login */}
              <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setAuthMethod('phone'); setError(null); }}
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    authMethod === 'phone'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mobile Number</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMethod('email'); setError(null); }}
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    authMethod === 'email'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email Address</span>
                </button>
              </div>

              {authMethod === 'phone' ? (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 pr-2">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      maxLength={10}
                      autoFocus
                      required
                      className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter your password"
                    autoFocus
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In with Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Password pehli baar nahi banaya?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('otp');
                    setError(null);
                  }}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  OTP se login karein
                </button>{' '}
                — verify hone ke baad password bana lein.
              </p>
            </form>
          ) : step === 'create-password' ? (
            /* STEP 3: Create Password after first OTP login */
            <form onSubmit={handleCreatePassword} className="space-y-4 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center mx-auto">
                  <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white text-sm pt-1">
                  Create Your Password
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Agli baar OTP ki zaroorat nahi — seedha email + password se login karein.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  New Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    autoFocus
                    required
                    minLength={6}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>Save Password & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSkipPassword}
                className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
              >
                Skip for now
              </button>
            </form>
          ) : (
            /* OTP MODE */
            <>
              {/* Method Selector Tabs: Mobile Number vs Email */}
              {step === 'enter-identifier' && (
                <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('phone');
                      setError(null);
                    }}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      authMethod === 'phone'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mobile Number</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('email');
                      setError(null);
                    }}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      authMethod === 'email'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email Address</span>
                  </button>
                </div>
              )}

              {/* STEP 1: Enter Phone / Email + Select Goal */}
              {step === 'enter-identifier' ? (
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  {/* Phone or Email Input */}
                  {authMethod === 'phone' ? (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Mobile Number
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs font-bold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 pr-2">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                          placeholder="9876543210"
                          maxLength={10}
                          autoFocus
                          required
                          className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">A 4-digit verification code will be sent.</p>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          autoFocus
                          required
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* 1-2 Initial Setup Questions: Target Exam & Class Level */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
                    {/* Question 1: Target Exam */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                          <Target className="w-3.5 h-3.5 text-emerald-500" />
                          1. Target Exam:
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                          {targetExam}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { key: 'JEE', label: 'JEE (IIT)', desc: 'Engg Entrance' },
                          { key: 'NEET', label: 'NEET', desc: 'Medical UG' },
                          { key: 'CBSE', label: 'CBSE', desc: '11/12 Boards' },
                          { key: 'RBSE', label: 'RBSE', desc: 'State Board' }
                        ].map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => setTargetExam(item.key as PreparationType)}
                            className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                              targetExam === item.key
                                ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                            }`}
                          >
                            <div className="text-xs font-bold leading-tight">{item.label}</div>
                            <div className={`text-[10px] leading-tight ${targetExam === item.key ? 'text-emerald-100' : 'text-slate-400'}`}>
                              {item.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question 2: Class Level */}
                    <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                          2. Class / Category:
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          {classLevel === 'Dropper' ? 'Dropper' : `Class ${classLevel}`}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['11', '12', 'Dropper'] as const).map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setClassLevel(lvl)}
                            className={`py-1.5 px-2 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                              classLevel === lvl
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                            }`}
                          >
                            {lvl === 'Dropper' ? 'Dropper' : `Class ${lvl}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Verification OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* STEP 2: Enter Verification OTP */
                <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Verification code sent to
                    </span>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
                      <span>{authMethod === 'phone' ? `+91 ${phone}` : email}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setStep('enter-identifier');
                          setError(null);
                          setSuccessMsg(null);
                        }}
                        className="text-[11px] text-emerald-600 font-bold hover:underline ml-1"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* 4-digit OTP Input */}
                  <div className="space-y-1.5">
                    <label className="block text-center text-xs font-bold text-slate-700 dark:text-slate-300">
                      Enter 4-Digit Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                      placeholder="9999"
                      maxLength={4}
                      autoFocus
                      required
                      className="w-full py-3 text-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-2xl font-mono font-black tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
                    />
                  </div>

                  {/* Verify & Enter Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Enter Prepora</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => handleRequestOtp()}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold flex items-center gap-1"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>Resend OTP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStep('enter-identifier');
                        setError(null);
                        setSuccessMsg(null);
                      }}
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                    >
                      Use another {authMethod === 'phone' ? 'phone' : 'email'}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
