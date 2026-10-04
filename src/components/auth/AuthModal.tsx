import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Target,
  GraduationCap,
  KeyRound,
  RotateCw,
  Zap
} from 'lucide-react';
import { PreparationType, ClassLevel } from '../../types';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, sendOtp, verifyOtp, loginDemo } = useAuth();

  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState<string>('9876543210');
  const [email, setEmail] = useState<string>('student@prepora.com');
  const [otp, setOtp] = useState<string>('9999');

  const [targetExam, setTargetExam] = useState<PreparationType>('JEE');
  const [classLevel, setClassLevel] = useState<ClassLevel | 'Dropper'>('12');

  const [step, setStep] = useState<'enter-identifier' | 'enter-otp'>('enter-identifier');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!authModalOpen) return null;

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
        setOtp('9999');
        setSuccessMsg('OTP sent! Demo OTP: 9999');
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
        targetYear: 2026
      });
      setIsLoading(false);

      if (res.success) {
        setSuccessMsg('Verified successfully!');
        setTimeout(() => {
          setAuthModalOpen(false);
        }, 300);
      } else {
        setError(res.message || 'Incorrect OTP code. Use demo OTP: 9999');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Verification error.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0e1620] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 space-y-4">
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
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
            Login with Mobile OTP or Email
          </p>
        </div>

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
                  placeholder="student@prepora.com"
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
                      {lvl === 'Dropper' ? 'Dropper' : `Class ${lvl}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Demo OTP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-3.5 animate-in fade-in duration-150">
            {/* Demo Notice */}
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
                <KeyRound className="w-4 h-4 text-amber-600" />
                <span>Demo OTP: <strong className="text-emerald-600 font-mono text-sm ml-1">9999</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setOtp('9999')}
                className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-200 text-[10px] font-black"
              >
                Use 9999
              </button>
            </div>

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
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
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

        {/* 1-Click Demo Access */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              loginDemo('student');
              setAuthModalOpen(false);
            }}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>1-Click Instant Demo Student</span>
          </button>
        </div>
      </div>
    </div>
  );
};
