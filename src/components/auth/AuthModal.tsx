import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Phone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Target,
  GraduationCap,
  KeyRound,
  RotateCw,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Check,
  User,
  ShieldCheck
} from 'lucide-react';
import { PreparationType, ClassLevel } from '../../types';

type FlowStep = 'login' | 'register' | 'enter-otp' | 'create-password' | 'account-created' | 'forgot-password' | 'reset-password';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    sendOtp,
    verifyOtp,
    setPassword,
    login,
    forgotPassword,
    resetPassword
  } = useAuth();

  const navigate = useNavigate();

  // Active step in modal
  const [step, setStep] = useState<FlowStep>('login');

  // Input states
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPasswordInput] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  // Password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Generated password on first-time registration
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Setup options
  const [targetExam, setTargetExam] = useState<PreparationType>('JEE');
  const [classLevel, setClassLevel] = useState<ClassLevel | 'Dropper'>('12');

  // Cooldown timer
  const [cooldown, setCooldown] = useState<number>(0);

  // Status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync modal step when opened based on authModalMode
  useEffect(() => {
    if (authModalOpen) {
      if (authModalMode === 'register') {
        setStep('register');
      } else if (authModalMode === 'forgot') {
        setStep('forgot-password');
      } else {
        setStep('login');
      }
      setError(null);
      setSuccessMsg(null);
    }
  }, [authModalOpen, authModalMode]);

  // Cooldown timer effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  if (!authModalOpen) return null;

  const cleanMobileDigits = (num: string) => num.replace(/[^0-9]/g, '').slice(-10);

  const close = () => {
    setAuthModalOpen(false);
    setError(null);
    setSuccessMsg(null);
    setPasswordInput('');
    setNewPassword('');
    setConfirmPassword('');
    setOtp('');
  };

  const handleCopyPassword = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // 1. NORMAL LOGIN (Mobile Number / Email + Password)
  const handlePasswordLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const isEmail = phone.includes('@');
    const identifier = isEmail ? phone.trim() : cleanMobileDigits(phone);

    if (!identifier || !password) {
      setError('Please enter your mobile number (or email) and password.');
      return;
    }
    if (!isEmail && identifier.length !== 10) {
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
          setAuthModalOpen(false);
          if (identifier.trim().toLowerCase() === 'maheshkumarsaini8769@gmail.com') {
            navigate('/admin');
          }
        }, 300);
      } else {
        setError(res.message || 'Invalid mobile number or password.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Server connection error.');
    }
  };

  // 2. FIRST-TIME REGISTRATION: Send WhatsApp OTP
  const handleRegisterSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const clean = cleanMobileDigits(phone);
    if (!clean || clean.length !== 10) {
      setError('Please enter a valid 10-digit WhatsApp mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendOtp(clean);
      setIsLoading(false);
      if (res.success) {
        setStep('enter-otp');
        setOtp(res.debugOtp || res.otp || '');
        setCooldown(res.cooldownSeconds || 60);
        setSuccessMsg(`WhatsApp OTP sent to +91 ${clean}`);
      } else {
        setError(res.message || 'Could not send WhatsApp OTP.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Server connection error.');
    }
  };

  // 3. VERIFY OTP: First-time Registration & Password Generation
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const clean = cleanMobileDigits(phone);
    if (!otp.trim()) {
      setError('Please enter the 4-digit OTP code.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyOtp(clean, otp.trim(), {
        name: name.trim() || undefined,
        targetExam,
        classLevel: classLevel as any,
        targetYear: 2026
      });
      setIsLoading(false);

      if (res.success) {
        // Enforce immediate mandatory password creation right after OTP verification (no skip allowed)
        setStep('create-password');
        setSuccessMsg('WhatsApp OTP verified successfully! Create your password below.');
      } else {
        setError(res.message || 'Incorrect OTP code. Please enter 9999.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Verification error.');
    }
  };

  // 3b. MANDATORY PASSWORD CREATION AFTER OTP (NO SKIP ALLOWED)
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
        setSuccessMsg('Password created successfully! Taking you to Study Planner...');
        setTimeout(() => {
          setAuthModalOpen(false);
          navigate('/planner');
        }, 500);
      } else {
        setError(res.message || 'Could not save password. Please try again.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Error saving password. Please try again.');
    }
  };

  // 4. FORGOT PASSWORD: Send OTP via WhatsApp
  const handleForgotPasswordSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const clean = cleanMobileDigits(phone);
    if (!clean || clean.length !== 10) {
      setError('Please enter your registered 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await forgotPassword(clean);
      setIsLoading(false);
      if (res.success) {
        setStep('reset-password');
        setOtp(res.debugOtp || '');
        setCooldown(res.cooldownSeconds || 60);
        setSuccessMsg(res.message || `Password recovery OTP sent to +91 ${clean}`);
      } else {
        setError(res.message || 'Could not send recovery OTP.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Server connection error.');
    }
  };

  // 5. RESET PASSWORD: Submit OTP + New Password
  const handleResetPasswordSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const clean = cleanMobileDigits(phone);
    if (!otp.trim()) {
      setError('Please enter the OTP received on WhatsApp.');
      return;
    }
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
      const res = await resetPassword(clean, otp.trim(), newPassword);
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg(res.message || 'Password reset successfully! Please log in.');
        setPasswordInput(newPassword);
        setTimeout(() => {
          setStep('login');
          setOtp('');
          setNewPassword('');
          setConfirmPassword('');
        }, 1200);
      } else {
        setError(res.message || 'Password reset failed.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Network error.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0e1620] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 space-y-4">
        {/* Close Button - Hidden during mandatory password creation (no skip allowed) */}
        {step !== 'create-password' && (
          <button
            onClick={close}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-lg mb-2 shadow-md shadow-emerald-500/20">
            P
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            {step === 'login' && 'Student Sign In'}
            {step === 'register' && 'New Student Registration'}
            {step === 'enter-otp' && 'WhatsApp OTP Verification'}
            {step === 'create-password' && 'Create Your Password'}
            {step === 'account-created' && 'Account Created Successfully'}
            {step === 'forgot-password' && 'Recover Account Password'}
            {step === 'reset-password' && 'Set New Password'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {step === 'login' && 'Mobile number + password se login karein (no OTP required)'}
            {step === 'register' && 'WhatsApp OTP se pehli baar verify karein'}
            {step === 'enter-otp' && `Enter the 4-digit code sent to +91 ${cleanMobileDigits(phone)}`}
            {step === 'create-password' && `Account verified! Apna password create karein (+91 ${cleanMobileDigits(phone)}). Agli baar direct password se login hoga.`}
            {step === 'account-created' && 'Save your unique generated password safely for future logins'}
            {step === 'forgot-password' && 'Enter your registered mobile number for WhatsApp OTP'}
            {step === 'reset-password' && 'Verify WhatsApp OTP and create a new password'}
          </p>
        </div>

        {/* Mode Toggle Tabs (Password Login vs WhatsApp Register) */}
        {(step === 'login' || step === 'register') && (
          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setStep('login');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                step === 'login'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Password Login</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('register');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                step === 'register'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-blue-600" />
              <span>Register (WhatsApp OTP)</span>
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

        {/* VIEW 1: NORMAL LOGIN (MOBILE NUMBER OR EMAIL + PASSWORD) */}
        {step === 'login' && (
          <form onSubmit={handlePasswordLogin} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Mobile Number (or Email)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-bold text-slate-500 border-r border-slate-200 dark:border-slate-700 pr-2">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  required
                  autoFocus
                  className="w-full pl-14 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep('forgot-password');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-3 pr-10 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
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
              Pehli baar login kar rahe hain?{' '}
              <button
                type="button"
                onClick={() => {
                  setStep('register');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                WhatsApp OTP se register karein
              </button>
            </p>
          </form>
        )}

        {/* VIEW 2: REGISTER (WHATSAPP OTP) */}
        {step === 'register' && (
          <form onSubmit={handleRegisterSendOtp} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Student Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  required
                  autoFocus
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                WhatsApp Mobile Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-bold text-slate-500 border-r border-slate-200 dark:border-slate-700 pr-2">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                  placeholder="98XXXXXXXX"
                  maxLength={10}
                  required
                  className="w-full pl-14 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
                />
              </div>
            </div>

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
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer ${
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
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer ${
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
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>Send WhatsApp OTP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              Already registered?{' '}
              <button
                type="button"
                onClick={() => {
                  setStep('login');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                Sign in with Password
              </button>
            </p>
          </form>
        )}

        {/* VIEW 3: OTP VERIFICATION */}
        {step === 'enter-otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-3.5 animate-in fade-in duration-150">
            <div className="space-y-1 text-center">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Enter 4-Digit Code (+91 {cleanMobileDigits(phone)})
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                placeholder="9999"
                maxLength={4}
                required
                autoFocus
                className="w-full py-2.5 text-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xl font-mono font-black tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>Verify & Create Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <button
                type="button"
                onClick={() => handleRegisterSendOtp()}
                disabled={cooldown > 0}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold disabled:opacity-50 cursor-pointer"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
              </button>
              <button
                type="button"
                onClick={() => setStep('register')}
                className="text-emerald-600 font-bold hover:underline cursor-pointer"
              >
                Change Mobile
              </button>
            </div>
          </form>
        )}

        {/* VIEW 3b: CREATE PASSWORD (MANDATORY AFTER OTP - NO SKIP ALLOWED) */}
        {step === 'create-password' && (
          <form onSubmit={handleCreatePassword} className="space-y-4 animate-in fade-in duration-150">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-md shadow-indigo-500/10">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Create Your Password
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                WhatsApp verified! Enter a password (minimum 6 characters) so you don't need OTP next time.
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  New Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    minLength={6}
                    autoFocus
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                    minLength={6}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving Password...</span>
                </>
              ) : (
                <>
                  <span>Save Password & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* VIEW 4: ACCOUNT CREATED SUCCESSFULLY (TASK.MD REQUIREMENT 3) */}
        {step === 'account-created' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Account Created Successfully
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your PREPORA student account has been created.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Mobile Number:
                </span>
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  +91 {cleanMobileDigits(phone)}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">
                  Your Generated Password:
                </span>
                <div className="flex items-center justify-between gap-2 p-2.5 bg-white dark:bg-[#0c131a] rounded-xl border border-emerald-400/50">
                  <span className="font-mono text-sm font-black tracking-wider text-emerald-600 dark:text-emerald-400 select-all">
                    {generatedPassword}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition cursor-pointer shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Password</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-[10px] leading-relaxed">
                ⚠️ <strong>Save this password safely.</strong> Use your mobile number and this password for future logins without OTP.
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to PREPORA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* VIEW 5: FORGOT PASSWORD */}
        {step === 'forgot-password' && (
          <form onSubmit={handleForgotPasswordSendOtp} className="space-y-3.5 animate-in fade-in duration-150">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Registered Mobile Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-bold text-slate-500 border-r border-slate-200 dark:border-slate-700 pr-2">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                  placeholder="98XXXXXXXX"
                  maxLength={10}
                  required
                  autoFocus
                  className="w-full pl-14 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>Send Recovery WhatsApp OTP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              <button
                type="button"
                onClick={() => setStep('login')}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                Back to Sign In
              </button>
            </p>
          </form>
        )}

        {/* VIEW 6: RESET PASSWORD */}
        {step === 'reset-password' && (
          <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5 animate-in fade-in duration-150">
            <div className="space-y-1 text-center">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Enter WhatsApp OTP (+91 {cleanMobileDigits(phone)})
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                placeholder="9999"
                maxLength={4}
                required
                autoFocus
                className="w-full py-2 text-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-lg font-mono font-black tracking-widest"
              />
            </div>

            <div className="space-y-2">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password (min 6 characters)"
                required
                minLength={6}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
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
              <span>Save & Reset Password</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
