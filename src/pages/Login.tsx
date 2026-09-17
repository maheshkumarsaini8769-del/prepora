import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ZenuxOAuth } from 'zenuxs-oauth';
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  BookOpen,
  Zap,
  Target,
  ArrowRight,
  Lock,
  Layers,
  KeyRound
} from 'lucide-react';

const ZENUXS_CLIENT_ID = '99366ee281c7e424';

export const Login: React.FC<{ defaultTab?: 'login' | 'register' | 'otp' }> = () => {
  const { loginWithZenuxs, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [targetExam, setTargetExam] = useState<'JEE' | 'NEET' | 'Board'>('JEE');
  const [classLevel, setClassLevel] = useState<'11' | '12' | 'Dropper'>('12');

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Pre-login entrance animation state
  const [animationPhase, setAnimationPhase] = useState<'animating' | 'fading' | 'finished'>('animating');
  const [loadingProgress, setLoadingProgress] = useState<number>(20);

  useEffect(() => {
    const p1 = setTimeout(() => setLoadingProgress(55), 250);
    const p2 = setTimeout(() => setLoadingProgress(85), 600);
    const p3 = setTimeout(() => setLoadingProgress(100), 950);

    const t1 = setTimeout(() => {
      setAnimationPhase('fading');
    }, 1200);

    const t2 = setTimeout(() => {
      setAnimationPhase('finished');
    }, 1600);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleSkipAnimation = () => {
    setAnimationPhase('finished');
  };

  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/';
  const hasErrorParam = queryParams.has('error') || queryParams.has('error_description');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
      return;
    }

    // If an error is present in query parameters, do not auto-redirect in loop
    if (hasErrorParam) {
      return;
    }

    // Direct auto-redirect to #2 Zenuxs Auth login page in 1 single step
    const timer = setTimeout(() => {
      handleZenuxsLogin();
    }, 700);

    return () => clearTimeout(timer);
  }, [isAuthenticated, hasErrorParam, navigate, redirectTo]);

  // Handle #2 Zenuxs Auth Authentication
  const handleZenuxsLogin = async () => {
    setError(null);
    setIsLoggingIn(true);

    try {
      const redirectUri = window.location.origin;

      // Persist student exam choices to localStorage so callback recovers them
      localStorage.setItem('prepora_selected_target_exam', targetExam);
      localStorage.setItem('prepora_selected_class_level', classLevel);

      // Flag OAuth in progress so ProtectedRoute shows loading state instead of bouncing
      sessionStorage.setItem('prepora_oauth_processing', 'true');
      localStorage.setItem('prepora_oauth_processing', 'true');

      const oauth = new ZenuxOAuth({
        clientId: ZENUXS_CLIENT_ID,
        redirectUri,
        scopes: 'openid profile email',
        theme: 'light',
        storage: 'localStorage',
        validateState: false,
        cleanupUrl: false
      } as any);

      // Standard, robust OAuth 2.0 PKCE redirect flow
      await oauth.login({
        mode: 'redirect',
        redirectUri
      });
    } catch (err: any) {
      console.error('Zenuxs login initiation error:', err);
      sessionStorage.removeItem('prepora_oauth_processing');
      localStorage.removeItem('prepora_oauth_processing');
      setIsLoggingIn(false);
      setError(err?.message || 'Could not initiate Zenuxs authentication. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Intro Splash Animation Overlay */}
      {animationPhase !== 'finished' && (
        <div
          onClick={handleSkipAnimation}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white transition-all duration-500 cursor-pointer select-none ${
            animationPhase === 'fading' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
          }`}
          title="Click anywhere to enter immediately"
        >
          {/* Ambient Glows */}
          <div className="absolute w-96 h-96 bg-purple-600/25 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute w-72 h-72 bg-indigo-600/25 rounded-full blur-3xl animate-pulse [animation-delay:500ms] pointer-events-none" />

          {/* Centered Logo & Pulsing Rings */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Outer Spinning Ring */}
            <div className="absolute w-28 h-28 rounded-full border-2 border-dashed border-purple-400/40 animate-spin [animation-duration:8s]" />
            
            {/* Glowing Halo */}
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-md animate-ping [animation-duration:2s]" />

            {/* Emblem Card */}
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 via-brand-600 to-indigo-600 flex items-center justify-center text-white font-black text-3xl shadow-[0_0_45px_rgba(147,51,234,0.6)] border border-white/20 transform transition-transform hover:scale-105">
              <span>P</span>
              <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-bounce" />
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="text-center space-y-2 max-w-sm px-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>PREPORA Authorization</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
              PREPORA
            </h1>

            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
              Practice • Test • Analyze • Improve
            </p>
          </div>

          {/* Progress Bar & Status */}
          <div className="mt-8 w-64 max-w-xs space-y-2">
            <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-400 transition-all duration-300 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                <span>Redirecting to Zenuxs Auth...</span>
              </span>
              <span>{loadingProgress}%</span>
            </div>
          </div>

          {/* Tap to skip prompt */}
          <div className="absolute bottom-8 text-[11px] text-slate-500 hover:text-slate-400 transition font-medium">
            Click anywhere to open Zenuxs Auth immediately
          </div>
        </div>
      )}

      {/* Main Login Content with Smooth Reveal Animation */}
      <div className={`transition-all duration-700 ease-out ${
        animationPhase === 'finished'
          ? 'opacity-100 translate-y-0'
          : animationPhase === 'fading'
            ? 'opacity-70 translate-y-2'
            : 'opacity-0 translate-y-6 pointer-events-none'
      }`}>
        {/* Header / Brand Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-purple-500/30 border border-purple-400/30">
            P
          </div>
          <span className="text-3xl font-black text-white tracking-tight">PREPORA</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Zenuxs Single Sign-On Portal
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Fast, secure, one-click authorization powered by Zenuxs OAuth 2.0
        </p>
      </div>

      {/* Main Card Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-white/95 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/20 space-y-6">
          
          {/* Target Exam & Class Preferences */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-purple-600" />
                Select Your Exam:
              </span>
              <div className="flex gap-1">
                {(['JEE', 'NEET', 'Board'] as const).map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setTargetExam(ex)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      targetExam === ex
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-1 border-t border-slate-200/50">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                Class Level:
              </span>
              <div className="flex gap-1">
                {(['11', '12', 'Dropper'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setClassLevel(lvl)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      classLevel === lvl
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lvl === 'Dropper' ? 'Dropper' : `Class ${lvl}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback alerts */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ONLY #2 — Zenuxs Auth (Exclusive Authentication Method) */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={handleZenuxsLogin}
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-black text-sm shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying #2 Zenuxs Auth...</span>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 rounded-xl bg-white/20 flex items-center justify-center text-xs font-black text-white shadow-xs">
                    Z
                  </div>
                  <span className="tracking-wide">#2 — Zenuxs Auth</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </>
              )}
            </button>
          </div>

          {/* Security & Admin note */}
          <div className="pt-2 border-t border-slate-100 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Single Sign-On (Zenuxs Verified Security)</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Admin & Super Admin accounts must sign in using their whitelisted email to unlock the administrative console.
            </p>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
