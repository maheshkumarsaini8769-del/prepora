import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Target,
  GraduationCap,
  KeyRound,
  RotateCw,
  Zap,
  Lock
} from 'lucide-react';
import { PreparationType, ClassLevel } from '../../types';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, sendOtp, verifyOtp, setPassword, login } = useAuth();

  const [loginMode, setLoginMode] = useState<'otp' | 'password'>('otp');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPasswordInput] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  const [targetExam, setTargetExam] = useState<PreparationType>('JEE');
  const [classLevel, setClassLevel] = useState<ClassLevel | 'Dropper'>('12');
  const [dailyGoal, setDailyGoal] = useState<number>(25);

  // OTP mode flow step
  const [step, setStep] = useState<'enter-identifier' | 'enter-otp' | 'create-password'>('enter-identifier');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const close = () => {
    setAuthModalOpen(false);
    setStep('enter-identifier');
    setError(null);
    setSuccessMsg(null);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePasswordLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim() || !password) {
      setError('Enter email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email.trim(), password);
      setIsLoading(false);

      if (res.success) {
        setSuccessMsg('Logged in successfully!');
        setTimeout(() => {
          setAuthModalOpen(false);
        }, 300);
      } else {
        setError(res.message || 'Invalid email or password.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Server connection error.');
    }
  };

  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const identifier = authMethod === 'phone' ? phone.trim() : email.trim();
    if (!identifier) {
      setError(authMethod === 'phone' ? 'Enter mobile number.' : 'Enter email address.');
      return;
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
        setError(res.message || 'Could not send OTP.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Server connection error.');
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!otp.trim()) {
      setError('Please enter the 4-digit OTP.');
      return;
    }

    const identifier = authMethod === 'phone' ? phone.trim() : email.trim();
    setIsLoading(true);

    try {
      const res = await verifyOtp(identifier, otp.trim(), {
        targetExam,
        classLevel: classLevel as any,
        targetYear: 2026,
        dailyGoalQuestions: dailyGoal
      } as any);
      setIsLoading(false);

      if (res.success) {
        // First-time OTP login: offer password creation so next logins need no OTP
        if (res.hasPassword === false) {
          setSuccessMsg('Verified! Ab password bana lein.');
          setStep('create-password');
        } else {
          setSuccessMsg('Verified successfully!');
          setTimeout(() => {
            setAuthModalOpen(false);
          }, 300);
        }
      } else {
        setError(res.message || 'Incorrect OTP code. Use demo OTP: 9999');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Verification error.');
    }
  };

  const handleCreatePassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await setPassword(newPassword);
      setIsLoading(false);

      if (res.success) {
        setSuccessMsg('Password created!');
        setTimeout(() => {
          setAuthModalOpen(false);
        }, 500);
      } else {
        setError(res.message || 'Could not create password. You can skip.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Error creating password. You can skip.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0e1620] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 space-y-4">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-lg mb-2 shadow-md shadow-emerald-500/20">
            P
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Student Sign In
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {step === 'create-password' ? 'Password bana lein — agli baar direct login' : 'OTP se login karein ya password se direct entry'}
          </p>
        </div>

        {/* Login Mode Tabs */}
        {step !== 'create-password' && (
          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setLoginMode('otp');
                setError(null);
              }}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                loginMode === 'otp'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-500'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
              <span>OTP</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMode('password');
                setError(null);
              }}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                loginMode === 'password'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-500'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Password</span>
            </button>
          </div>
        )}

        {/* Feedback alerts */}
        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* PASSWORD LOGIN */}
        {loginMode === 'password' && step !== 'create-password' ? (
          <form onSubmit={handlePasswordLogin} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>Sign In with Password</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              Password nahi hai?{' '}
              <button
                type="button"
                onClick={() => {
                  setLoginMode('otp');
                  setError(null);
                }}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                OTP se login karein
              </button>
            </p>
          </form>
        ) : step === 'create-password' ? (
          /* CREATE PASSWORD STEP */
          <form onSubmit={handleCreatePassword} className="space-y-3.5 animate-in fade-in duration-150">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center mx-auto">
                <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm">
                Create Your Password
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Agli baar seedha email + password se login karein.
              </p>
            </div>

            <div className="space-y-1">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password (min 6 characters)"
                required
                minLength={6}
                autoFocus
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                minLength={6}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>Save Password & Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setAuthModalOpen(false)}
              className="w-full text-center text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
            >
              Skip for now
            </button>
          </form>
        ) : (
          /* OTP FLOW */
          <>
            {/* Tabs */}
            {step === 'enter-identifier' && (
              <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('phone');
                    setError(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    authMethod === 'phone'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                      : 'text-slate-500'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mobile</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('email');
                    setError(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    authMethod === 'email'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                      : 'text-slate-500'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email</span>
                </button>
              </div>
            )}

            {step === 'enter-identifier' ? (
              <form onSubmit={handleRequestOtp} className="space-y-3.5">
                {authMethod === 'phone' ? (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Mobile Number
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs font-bold text-slate-500 border-r border-slate-200 dark:border-slate-700 pr-2">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                        placeholder="9876543210"
                        maxLength={10}
                        required
                        className="w-full pl-14 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
                    />
                  </div>
                )}

                {/* Exam & Class Selection */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-emerald-500" />
                      Target Exam:
                    </span>
                    <div className="flex gap-1">
                      {(['JEE', 'NEET', 'CBSE'] as const).map((ex) => (
                        <button
                          key={ex}
                          type="button"
                          onClick={() => setTargetExam(ex as PreparationType)}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            targetExam === ex
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pt-1.5 border-t border-slate-200/80 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                      Class:
                    </span>
                    <div className="flex gap-1">
                      {(['11', '12', 'Dropper'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setClassLevel(lvl)}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            classLevel === lvl
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pt-1.5 border-t border-slate-200/80 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Daily Goal:
                    </span>
                    <div className="flex gap-1">
                      {[15, 25, 50, 100].map((dg) => (
                        <button
                          key={dg}
                          type="button"
                          onClick={() => setDailyGoal(dg)}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            dailyGoal === dg
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {dg} Qs
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <span>Get OTP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3.5 animate-in fade-in duration-150">
                <div className="space-y-1 text-center">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Enter 4-Digit Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    placeholder="9999"
                    maxLength={4}
                    required
                    className="w-full py-2.5 text-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xl font-mono font-black tracking-widest"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <span>Verify & Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <button
                    type="button"
                    onClick={() => handleRequestOtp()}
                    className="text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    Resend OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('enter-identifier')}
                    className="text-emerald-600 font-bold hover:underline"
                  >
                    Change {authMethod}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
