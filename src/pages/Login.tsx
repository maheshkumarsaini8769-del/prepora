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
  Lock,
  Eye,
  EyeOff,
  Copy,
  Check,
  User,
  ShieldCheck
} from 'lucide-react';
import { ClassLevel, PreparationType } from '../types';

interface LoginProps {
  defaultTab?: 'login' | 'register';
}

type FlowStep = 'login' | 'register' | 'enter-otp' | 'create-password' | 'account-created' | 'forgot-password' | 'reset-password';

export const Login: React.FC<LoginProps> = ({ defaultTab }) => {
  const { sendOtp, verifyOtp, setPassword, login, forgotPassword, resetPassword, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Active step in the authentication flow
  const [step, setStep] = useState<FlowStep>(() => {
    return defaultTab === 'register' ? 'register' : 'login';
  });

  // Input states
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPasswordInput] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  // First-time registration generated password & copy state
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Setup options (Exam & Class Level)
  const [targetExam, setTargetExam] = useState<PreparationType>('JEE');
  const [classLevel, setClassLevel] = useState<ClassLevel | 'Dropper'>('12');

  // Cooldown timer for OTP resend
  const [cooldown, setCooldown] = useState<number>(0);

  // Status states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/planner';

  // Bounce already-authenticated visitors on mount
  useEffect(() => {
    if (isAuthenticated && step !== 'account-created') {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo, step]);

  // Cooldown countdown effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const cleanMobileDigits = (num: string) => num.replace(/[^0-9]/g, '').slice(-10);

  // Copy generated password to clipboard
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
          if (identifier.trim().toLowerCase() === 'maheshkumarsaini8769@gmail.com') {
            navigate('/admin', { replace: true });
          } else {
            navigate(redirectTo, { replace: true });
          }
        }, 300);
      } else {
        setError(res.message || 'Invalid mobile number or password.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Error communicating with authentication server.');
    }
  };

  // 2. FIRST-TIME REGISTRATION: Request WhatsApp OTP
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
        setError(res.message || 'Could not send WhatsApp OTP. Please try again.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Error communicating with authentication server.');
    }
  };

  // 3. VERIFY OTP: First-time Account Creation & Generated Password
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const clean = cleanMobileDigits(phone);
    if (!otp.trim()) {
      setError('Please enter the verification OTP code.');
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
        // OTP verified: immediately prompt student to create their custom password (mandatory, no skip)
        setStep('create-password');
        setSuccessMsg('WhatsApp OTP verified successfully! Create your password below.');
      } else {
        setError(res.message || 'Incorrect OTP code. Please enter 9999.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Verification error. Please try again.');
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
          navigate(redirectTo, { replace: true });
        }, 500);
      } else {
        setError(res.message || 'Could not save password. Please try again.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Error saving password. Please try again.');
    }
  };

  // 4. FORGOT PASSWORD: Send Recovery OTP via WhatsApp
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
      setError(err?.message || 'Error communicating with authentication server.');
    }
  };

  // 5. RESET PASSWORD: Submit OTP and new password
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
      setError('Passwords do not match. Please re-enter.');
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
          {step === 'login' && 'Student Sign In'}
          {step === 'register' && 'New Student Registration'}
          {step === 'enter-otp' && 'WhatsApp OTP Verification'}
          {step === 'create-password' && 'Create Your Password'}
          {step === 'account-created' && 'Account Created Successfully'}
          {step === 'forgot-password' && 'Recover Account Password'}
          {step === 'reset-password' && 'Set New Password'}
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {step === 'login' && 'Log in with your mobile number and password (no OTP required)'}
          {step === 'register' && 'Verify with WhatsApp OTP once to create your secure password'}
          {step === 'enter-otp' && `Enter the 4-digit code sent to +91 ${cleanMobileDigits(phone)}`}
          {step === 'create-password' && `Apna naya password banayein (+91 ${cleanMobileDigits(phone)}). Agli baar direct password se bina OTP login hoga.`}
          {step === 'account-created' && 'Save your unique generated password safely for future logins'}
          {step === 'forgot-password' && 'Enter your registered mobile number to receive a WhatsApp OTP'}
          {step === 'reset-password' && 'Verify your WhatsApp OTP and create a new password'}
        </p>
      </div>

      {/* Main Form Container */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-white dark:bg-[#0e1620] py-6 px-5 sm:px-8 shadow-xl shadow-slate-900/5 dark:shadow-black/40 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">

          {/* Top Mode Toggle (Sign In vs Register) — visible only when on login/register */}
          {(step === 'login' || step === 'register') && (
            <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setStep('login');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  step === 'login'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  step === 'register'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                <span>Register (WhatsApp OTP)</span>
              </button>
            </div>
          )}

          {/* Feedback alerts */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ================================================================ */}
          {/* VIEW 1: NORMAL LOGIN (MOBILE + PASSWORD) */}
          {/* ================================================================ */}
          {step === 'login' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Mobile Number (or Email)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 pr-2">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    autoFocus
                    required
                    className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
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
                  <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
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
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
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
              </div>
            </form>
          )}

          {/* ================================================================ */}
          {/* VIEW 2: FIRST-TIME REGISTRATION (NAME + MOBILE + EXAM SETUP) */}
          {/* ================================================================ */}
          {step === 'register' && (
            <form onSubmit={handleRegisterSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Student Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    autoFocus
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  WhatsApp Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 pr-2">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                    placeholder="98XXXXXXXX"
                    maxLength={10}
                    required
                    className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  A verification code will be sent to your WhatsApp number.
                </p>
              </div>

              {/* Target Exam & Class Level setup */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                      <Target className="w-3.5 h-3.5 text-emerald-500" /> Target Exam:
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      {targetExam}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { key: 'JEE', label: 'JEE (IIT)', desc: 'PCM' },
                      { key: 'NEET', label: 'NEET', desc: 'PCB' },
                      { key: 'CBSE', label: 'CBSE', desc: 'Board' },
                      { key: 'RBSE', label: 'RBSE', desc: 'State' }
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

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-500" /> Class:
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending WhatsApp OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send WhatsApp OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-1 text-center text-xs text-slate-500">
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
              </div>
            </form>
          )}

          {/* ================================================================ */}
          {/* VIEW 3: OTP VERIFICATION */}
          {/* ================================================================ */}
          {step === 'enter-otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Verification OTP sent via WhatsApp to:
                </span>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
                  <span>+91 {cleanMobileDigits(phone)}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('register');
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline ml-1"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  Enter 4-Digit OTP Code
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => handleRegisterSendOtp()}
                  disabled={cooldown > 0}
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold flex items-center gap-1 disabled:opacity-50"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend WhatsApp OTP'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep('login');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* ================================================================ */}
          {/* VIEW 4: CREATE PASSWORD (MANDATORY AFTER OTP - NO SKIP) */}
          {/* ================================================================ */}
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
                  Account verified! Apna password create karein (+91 {cleanMobileDigits(phone)}). Agli baar direct password se login hoga.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
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
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
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

          {/* ================================================================ */}
          {/* VIEW 4b: ACCOUNT CREATED SUCCESSFULLY */}
          {/* ================================================================ */}
          {step === 'account-created' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Account Created Successfully
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your PREPORA student account has been registered with WhatsApp verification.
                </p>
              </div>

              {/* Password Display Box (Task.md Section 3 exact specification) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
                <div>
                  <span className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                    Mobile Number:
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    +91 {cleanMobileDigits(phone)}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                  <span className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1">
                    Your Generated Password:
                  </span>
                  <div className="flex items-center justify-between gap-2 p-3 bg-white dark:bg-[#0c131a] rounded-xl border border-emerald-400/50">
                    <span className="font-mono text-base font-black tracking-wider text-emerald-600 dark:text-emerald-400 select-all">
                      {generatedPassword}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
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

                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed">
                  ⚠️ <strong>Save this password safely.</strong> You will use your mobile number and this password for future logins without OTP.
                </div>
              </div>

              {/* Continue to Planner Button */}
              <button
                type="button"
                onClick={() => navigate(redirectTo, { replace: true })}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <span>Continue to Study Planner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================================================================ */}
          {/* VIEW 5: FORGOT PASSWORD (REQUEST WHATSAPP OTP) */}
          {/* ================================================================ */}
          {step === 'forgot-password' && (
            <form onSubmit={handleForgotPasswordSendOtp} className="space-y-4 animate-in fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Enter your registered mobile number to receive a WhatsApp OTP for password recovery.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Registered Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 pr-2">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                    placeholder="98XXXXXXXX"
                    maxLength={10}
                    autoFocus
                    required
                    className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    <span>Sending Recovery OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send Recovery WhatsApp OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep('login');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* ================================================================ */}
          {/* VIEW 6: RESET PASSWORD (ENTER OTP + NEW PASSWORD) */}
          {/* ================================================================ */}
          {step === 'reset-password' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4 animate-in fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Enter the recovery OTP sent to +91 {cleanMobileDigits(phone)}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Verification OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  placeholder="Enter OTP"
                  maxLength={6}
                  autoFocus
                  required
                  className="w-full py-2.5 text-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-lg font-mono font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  New Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Confirm New Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
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
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password & Log In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep('login');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
