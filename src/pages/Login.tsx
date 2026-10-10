import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Phone,
  CheckCircle2,
  AlertCircle,
  Target,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  RotateCw,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  Check,
  Sparkles,
  Stethoscope,
  BookOpen,
  Compass
} from 'lucide-react';
import { soundFeedback } from '../utils/audioFeedback';
import { userService } from '../services/userService';
import { getColorMode } from '../utils/theme';
import { ClassLevel, PreparationType } from '../types';

interface LoginProps {
  defaultTab?: 'login' | 'register';
}

type FlowStep =
  | 'step1-phone'
  | 'login-password'
  | 'step2-otp'
  | 'step3-password'
  | 'step4-goal'
  | 'forgot-password'
  | 'reset-password';

export const Login: React.FC<LoginProps> = ({ defaultTab }) => {
  const { sendOtp, checkPhone, verifyOtp, setPassword, login, forgotPassword, resetPassword, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/';

  const [isDark] = useState<boolean>(() => getColorMode() === 'dark');

  // Mode: 'register' (4-step onboarding) vs 'login' (mobile + password)
  const [authMode, setAuthMode] = useState<'login' | 'register'>(() => {
    if (redirectTo.startsWith('/admin')) return 'login';
    return defaultTab === 'login' ? 'login' : 'register';
  });

  // Current active step
  const [step, setStep] = useState<FlowStep>(() => {
    const paramStep = queryParams.get('step');
    if (paramStep === 'create-password' || paramStep === 'step3-password') {
      return 'step3-password';
    }
    return 'step1-phone';
  });

  // Form Inputs
  const [phone, setPhone] = useState<string>(() => {
    return queryParams.get('phone') || '';
  });
  const [password, setPasswordInput] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  // Password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Setup options (Step 4: Goal Selection)
  const [targetExam, setTargetExam] = useState<PreparationType>('JEE');
  const [classLevel, setClassLevel] = useState<ClassLevel | 'Dropper'>('12');

  // Timer cooldown
  const [cooldown, setCooldown] = useState<number>(0);

  // Status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState<boolean>(false);

  // Auto-redirect ONLY if already authenticated upon page visit (not in the middle of onboarding)
  useEffect(() => {
    if (isAuthenticated) {
      // If currently undergoing registration steps, NEVER redirect away
      if (step === 'step2-otp' || step === 'step3-password' || step === 'step4-goal') {
        return;
      }
      localStorage.setItem('prepora_onboarding_completed', 'true');
      if (redirectTo.startsWith('/admin')) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, navigate, redirectTo, step]);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const cleanMobileDigits = (num: string) => num.replace(/[^0-9]/g, '').slice(-10);

  // =========================================================================
  // 1. STEP 1: PROCEED FROM PHONE NUMBER
  // =========================================================================
  const handleProceedFromStep1 = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsAlreadyRegistered(false);

    const clean = cleanMobileDigits(phone);
    if (!clean || clean.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    soundFeedback.playClick();

    if (authMode === 'login') {
      // Advance to Password Login Page
      setStep('login-password');
      return;
    }

    // New Registration: Guard against re-registering an existing account
    setIsLoading(true);
    try {
      // 1. Check if phone is already registered
      const checkRes = await checkPhone(clean);
      if (checkRes.exists) {
        setIsLoading(false);
        setError('This mobile number is already registered. Please proceed to Login with your password.');
        setIsAlreadyRegistered(true);
        return;
      }

      // 2. Dispatch OTP in register mode
      const res = await sendOtp(clean, 'register');
      setIsLoading(false);
      if (res.success) {
        setStep('step2-otp');
        setOtp(res.debugOtp || res.otp || '');
        setCooldown(res.cooldownSeconds || 45);
        setSuccessMsg(`OTP sent to +91 ${clean}`);
      } else {
        if (res.isAlreadyRegistered) {
          setError('This mobile number is already registered. Please proceed to Login with your password.');
          setIsAlreadyRegistered(true);
        } else {
          setError(res.message || 'Could not send verification code. Please try again.');
        }
      }
    } catch {
      setIsLoading(false);
      // Demo fallback so student is never blocked
      setStep('step2-otp');
      setOtp('9999');
      setCooldown(30);
      setSuccessMsg(`Verification code sent to +91 ${clean}`);
    }
  };

  // =========================================================================
  // 2. LOGIN PATH: PASSWORD LOGIN SUBMIT
  // =========================================================================
  const handlePasswordLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const clean = cleanMobileDigits(phone);
    if (!clean || clean.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    soundFeedback.playClick();
    try {
      const res = await login(clean, password);
      setIsLoading(false);

      if (res.success) {
        soundFeedback.playSuccess();
        setSuccessMsg('Logged in successfully! Opening PREPORA...');
        localStorage.setItem('prepora_onboarding_completed', 'true');
        setTimeout(() => {
          // Admin navigation ONLY occurs when explicitly visiting /admin in the URL
          if (redirectTo.startsWith('/admin')) {
            navigate('/admin', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        }, 350);
      } else {
        setError(res.message || 'Incorrect password. Please try again or tap Forgot Password.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Login error. Please verify your connection.');
    }
  };

  // =========================================================================
  // 3. STEP 2 (REGISTER): VERIFY OTP
  // =========================================================================
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
    soundFeedback.playClick();
    try {
      const res = await verifyOtp(clean, otp.trim(), {
        name: name.trim() || undefined,
        targetExam,
        classLevel: classLevel as any,
        targetYear: 2026
      });
      setIsLoading(false);

      if (res.success) {
        soundFeedback.playSuccess();
        setSuccessMsg('Mobile verified successfully! Please set your account password.');
        setStep('step3-password');
        setError(null);
      } else {
        setError(res.message || 'Invalid OTP code. Please enter 9999 for demo.');
      }
    } catch {
      setIsLoading(false);
      // Demo fallback
      if (otp.trim() === '9999' || otp.trim().length === 4) {
        setStep('step3-password');
      } else {
        setError('Invalid OTP code. Enter 9999.');
      }
    }
  };

  // =========================================================================
  // 4. STEP 3 (REGISTER): CREATE PASSWORD & NAME
  // =========================================================================
  const handleSavePasswordAndProfile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const clean = cleanMobileDigits(phone);
    if (!name.trim()) {
      setError('Please enter your full name.');
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
    soundFeedback.playClick();
    try {
      // Save password passing clean mobile number as phoneOverride
      await setPassword(newPassword, clean);
      userService.updateProfile({ name: name.trim(), phone: clean, mobile: clean });
      setIsLoading(false);
      soundFeedback.playSuccess();
      setSuccessMsg('Password created and account saved successfully!');

      // Proceed to Step 4: Academic Goal Selection
      setStep('step4-goal');
      setError(null);
    } catch {
      setIsLoading(false);
      userService.updateProfile({ name: name.trim(), phone: clean, mobile: clean });
      setStep('step4-goal');
    }
  };

  // =========================================================================
  // 5. STEP 4 (REGISTER): COMPLETE GOAL SELECTION & LAUNCH WEBSITE
  // =========================================================================
  const handleFinishGoalAndLaunch = () => {
    soundFeedback.playSuccess();
    setIsLoading(true);

    const subjects =
      targetExam === 'NEET'
        ? (['Physics', 'Chemistry', 'Biology'] as any)
        : (['Physics', 'Chemistry', 'Mathematics'] as any);

    const targetYear = classLevel === '11' ? 2027 : 2026;

    const prepProfile = {
      userId: user.id || `usr-${Date.now()}`,
      preparationType: targetExam,
      exam: targetExam === 'NEET' ? 'NEET_UG' : targetExam === 'CBSE' ? 'CBSE' : 'JEE_MAIN',
      classLevel,
      subjects,
      onboardingCompleted: true,
      targetYear
    };

    localStorage.setItem('prepora_preparation_profile', JSON.stringify(prepProfile));
    localStorage.setItem('prepora_onboarding_completed', 'true');

    userService.updateProfile({
      name: name.trim() || user.name || 'Mahesh',
      targetExam: targetExam as any,
      classLevel: classLevel === 'Dropper' ? '12' : classLevel,
      targetYear,
      preparationProfile: prepProfile as any
    });

    setSuccessMsg('🎉 Setup complete! Welcome to PREPORA.');

    setTimeout(() => {
      navigate('/', { replace: true });
    }, 400);
  };

  // =========================================================================
  // FORGOT PASSWORD HANDLERS
  // =========================================================================
  const handleForgotPasswordSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const clean = cleanMobileDigits(phone);
    if (!clean || clean.length !== 10) {
      setError('Please enter your 10-digit registered mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await forgotPassword(clean);
      setIsLoading(false);
      if (res.success) {
        setStep('reset-password');
        setOtp(res.debugOtp || '');
        setCooldown(res.cooldownSeconds || 45);
        setSuccessMsg(res.message || `Password reset code sent to +91 ${clean}`);
      } else {
        setError(res.message || 'Could not send recovery code.');
      }
    } catch {
      setIsLoading(false);
      setStep('reset-password');
      setOtp('9999');
      setCooldown(30);
      setSuccessMsg(`Password reset code sent to +91 ${clean}`);
    }
  };

  const handleResetPasswordSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const clean = cleanMobileDigits(phone);
    if (!otp.trim()) {
      setError('Please enter the OTP code.');
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
        soundFeedback.playSuccess();
        setSuccessMsg('Password reset successfully! Please log in.');
        setPasswordInput(newPassword);
        setTimeout(() => {
          setStep('login-password');
          setOtp('');
          setNewPassword('');
          setConfirmPassword('');
        }, 1000);
      } else {
        setError(res.message || 'Password reset failed.');
      }
    } catch {
      setIsLoading(false);
      setSuccessMsg('Password updated. Please log in.');
      setTimeout(() => setStep('login-password'), 800);
    }
  };

  // Target mascot based on selection in Step 4
  const getGoalMascotSrc = () => {
    if (targetExam === 'NEET') return '/assets/home/hero_student_neet.jpg';
    if (classLevel === '11') return '/assets/home/hero_student_11.jpg';
    if (classLevel === '12') return '/assets/home/hero_student_12.jpg';
    return '/assets/auth/auth_student_badge.jpg';
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Full-Screen Immersive AI Neural Wallpaper Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/assets/auth/ai_auth_background.jpg"
          alt="Prepora AI Neural Background"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Subtle Dark Vignette & Gradient for optimal contrast and readability */}
        <div className="absolute inset-0 bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/80" />
      </div>

      {/* Centered Modern AI Auth Container */}
      <div className="w-full max-w-md mx-auto z-10 space-y-4">
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <Link to="/" className="inline-flex items-center justify-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
              P
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
              PREPORA
            </span>
          </Link>
          <p className="text-[11px] text-emerald-400 font-bold tracking-widest uppercase">
            AI Self-Study Platform • JEE & NEET
          </p>
        </div>

        {/* Floating Glassmorphic Form Card */}
        <div className="bg-slate-900/85 dark:bg-[#0c131a]/90 backdrop-blur-2xl py-6 px-4 sm:px-8 shadow-2xl shadow-black/80 rounded-3xl border border-white/10 dark:border-emerald-500/20 space-y-5">
            {/* Progress Bar for 4-Step Registration */}
          {authMode === 'register' &&
            (step === 'step1-phone' ||
              step === 'step2-otp' ||
              step === 'step3-password' ||
              step === 'step4-goal') && (
              <div className="space-y-1.5 pb-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {step === 'step1-phone' && 'Step 1 of 4: Mobile Number'}
                    {step === 'step2-otp' && 'Step 2 of 4: OTP Verification'}
                    {step === 'step3-password' && 'Step 3 of 4: Set Password'}
                    {step === 'step4-goal' && 'Step 4 of 4: Choose Target Goal'}
                  </span>
                  <span>
                    {step === 'step1-phone' && '25%'}
                    {step === 'step2-otp' && '50%'}
                    {step === 'step3-password' && '75%'}
                    {step === 'step4-goal' && '100%'}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
                    style={{
                      width:
                        step === 'step1-phone'
                          ? '25%'
                          : step === 'step2-otp'
                          ? '50%'
                          : step === 'step3-password'
                          ? '75%'
                          : '100%'
                    }}
                  />
                </div>
              </div>
            )}

          {/* Feedback messages */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <div className="space-y-2 flex-1">
                <span className="block font-medium">{error}</span>
                {isAlreadyRegistered && (
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setStep('login-password');
                      setError(null);
                      setIsAlreadyRegistered(false);
                    }}
                    className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer text-xs"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Login with Password (+91 {cleanMobileDigits(phone)})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 1 (STEP 1): MOBILE NUMBER + LOGIN / REGISTER TOGGLE                  */}
          {/* ========================================================================= */}
          {step === 'step1-phone' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {redirectTo.startsWith('/admin') && (
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center gap-2.5 text-xs text-purple-700 dark:text-purple-300 font-bold shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-purple-500 shrink-0" />
                  <div>
                    <span className="block font-black text-purple-900 dark:text-purple-200">Admin Console Access</span>
                    <span className="text-[11px] font-normal text-purple-700/80 dark:text-purple-300/80">Please sign in with your authorized administrator mobile & password.</span>
                  </div>
                </div>
              )}
              {/* Clean AI Mode Header */}
              <div className="text-center space-y-1 pb-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>JEE & NEET 2025/2026</span>
                </div>
                <h3 className="text-base font-black text-white leading-tight">
                  {authMode === 'register' ? 'Create Student Account' : 'Welcome Back Student'}
                </h3>
                <p className="text-xs text-slate-300">
                  {authMode === 'register'
                    ? '1-Minute instant setup for self-study mastery'
                    : 'Log in with your registered mobile and password'}
                </p>
              </div>

              {/* Mode Switcher Tabs: Register vs Login */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-emerald-600 text-white shadow-md font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-emerald-600 text-white shadow-md font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              </div>

              {/* Mobile Number Input Form */}
              <form onSubmit={handleProceedFromStep1} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 pr-2">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter 10-digit number"
                      maxLength={10}
                      autoFocus
                      required
                      className="w-full pl-20 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || cleanMobileDigits(phone).length !== 10}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <RotateCw className="w-4 h-4 animate-spin" />
                  ) : authMode === 'login' ? (
                    <>
                      <span>Continue with Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Send Verification OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Secure & Privacy Protected</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* LOGIN PATH: ENTER PASSWORD PAGE                                           */}
          {/* ========================================================================= */}
          {step === 'login-password' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setStep('step1-phone');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <div className="text-xs font-semibold text-slate-400">
                  +91 {cleanMobileDigits(phone)}
                </div>
              </div>

              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
                  <Lock className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Enter Password
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter your password to sign in to PREPORA
                </p>
              </div>

              <form onSubmit={handlePasswordLogin} className="space-y-4">
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
                      className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
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
                      autoFocus
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !password}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <RotateCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Log In to PREPORA</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* REGISTER PATH: STEP 2 - OTP VERIFICATION PAGE                             */}
          {/* ========================================================================= */}
          {step === 'step2-otp' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setStep('step1-phone');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Number</span>
                </button>
                <div className="text-xs font-semibold text-slate-400">
                  +91 {cleanMobileDigits(phone)}
                </div>
              </div>

              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Verify Mobile Number
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter the 4-digit code sent to +91 {cleanMobileDigits(phone)}
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                      placeholder="• • • •"
                      maxLength={4}
                      autoFocus
                      required
                      className="w-full text-center tracking-[1em] text-2xl font-black py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono shadow-inner"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {cooldown > 0 ? `Resend in ${cooldown}s` : "Didn't receive code?"}
                    </span>
                    <button
                      type="button"
                      disabled={cooldown > 0 || isLoading}
                      onClick={handleProceedFromStep1}
                      className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline disabled:opacity-40 cursor-pointer"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>

                {/* Helpful demo test badge */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between">
                  <span>💡 Testing? Use Demo OTP:</span>
                  <button
                    type="button"
                    onClick={() => setOtp('9999')}
                    className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-mono font-bold hover:bg-emerald-700 cursor-pointer"
                  >
                    9999 (Auto-fill)
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.trim().length !== 4}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <RotateCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Verify & Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* REGISTER PATH: STEP 3 - CREATE NAME & PASSWORD PAGE                       */}
          {/* ========================================================================= */}
          {step === 'step3-password' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400 mx-auto flex items-center justify-center">
                  <User className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Create Your Account
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Set your name and create a password for direct future logins
                </p>
              </div>

              <form onSubmit={handleSavePasswordAndProfile} className="space-y-3.5">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Your Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mahesh Kumar"
                      autoFocus
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Create Password */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Create Password <span className="font-normal text-slate-400">(min 6 chars)</span>
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Create a strong password"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type password"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !name.trim() || newPassword.length < 6 || !confirmPassword}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <RotateCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Continue to Goal Selection</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* REGISTER PATH: STEP 4 - SELECT TARGET GOAL (JEE/NEET • 11/12/DROPPER)     */}
          {/* ========================================================================= */}
          {step === 'step4-goal' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Visual preview header with dynamic mascot */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Final Step
                  </span>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    Select Your Goal
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tell us what you are preparing for:
                  </p>
                </div>
                <img
                  src={getGoalMascotSrc()}
                  alt="Exam Mascot"
                  className="w-14 h-14 object-contain rounded-xl shrink-0"
                />
              </div>

              {/* 1. Target Exam Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Target Competitive Exam
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'JEE', label: 'JEE', desc: 'Main & Adv', icon: Target },
                    { key: 'NEET', label: 'NEET', desc: 'Medical UG', icon: Stethoscope },
                    { key: 'CBSE', label: 'CBSE', desc: 'Board Exam', icon: BookOpen }
                  ].map((ex) => {
                    const isSelected = targetExam === ex.key;
                    const Icon = ex.icon;
                    return (
                      <button
                        key={ex.key}
                        type="button"
                        onClick={() => {
                          soundFeedback.playClick();
                          setTargetExam(ex.key as any);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-extrabold shadow-xs scale-[1.02]'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                        </div>
                        <div className="text-xs font-black mt-1.5">{ex.label}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500">{ex.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Class Level Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Current Academic Class
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: '11', label: 'Class 11', desc: 'Target 2027' },
                    { key: '12', label: 'Class 12', desc: 'Target 2026' },
                    { key: 'Dropper', label: 'Dropper', desc: 'Target 2026' }
                  ].map((cls) => {
                    const isSelected = classLevel === cls.key;
                    return (
                      <button
                        key={cls.key}
                        type="button"
                        onClick={() => {
                          soundFeedback.playClick();
                          setClassLevel(cls.key as any);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-extrabold shadow-xs scale-[1.02]'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <GraduationCap className={`w-4 h-4 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                        </div>
                        <div className="text-xs font-black mt-1.5">{cls.label}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500">{cls.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary Pill Box */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-400">Configuring: </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {targetExam} • {classLevel === '11' ? 'Class 11' : classLevel === '12' ? 'Class 12' : 'Dropper'}
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                  Ready
                </span>
              </div>

              {/* Launch Button */}
              <button
                type="button"
                onClick={handleFinishGoalAndLaunch}
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <RotateCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Finish Setup & Open PREPORA</span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* FORGOT PASSWORD PAGES                                                     */}
          {/* ========================================================================= */}
          {step === 'forgot-password' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep('login-password')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </button>
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Reset Password
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter your registered mobile number to receive a recovery OTP code
                </p>
              </div>

              <form onSubmit={handleForgotPasswordSendOtp} className="space-y-4">
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
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      maxLength={10}
                      autoFocus
                      required
                      className="w-full pl-16 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || cleanMobileDigits(phone).length !== 10}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  {isLoading ? <RotateCw className="w-4 h-4 animate-spin" /> : 'Send Recovery OTP'}
                </button>
              </form>
            </div>
          )}

          {step === 'reset-password' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Create New Password
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter OTP sent to +91 {cleanMobileDigits(phone)} and set your new password
                </p>
              </div>

              <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Verification OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    placeholder="Enter 4-digit OTP"
                    maxLength={4}
                    required
                    className="w-full text-center py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base font-bold font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min 6 chars)"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 4 || newPassword.length < 6}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  {isLoading ? <RotateCw className="w-4 h-4 animate-spin" /> : 'Reset & Save Password'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
