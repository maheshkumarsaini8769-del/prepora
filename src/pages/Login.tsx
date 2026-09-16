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

const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Login: React.FC<{ defaultTab?: 'login' | 'register' | 'otp' }> = () => {
  const { loginWithZenuxs, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [targetExam, setTargetExam] = useState<'JEE' | 'NEET' | 'Board'>('JEE');
  const [classLevel, setClassLevel] = useState<'11' | '12' | 'Dropper'>('12');

  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | 'zenuxs' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  // Handle Zenuxs OAuth Authentication
  const handleZenuxsLogin = async (provider?: 'google' | 'github') => {
    setError(null);
    setSocialLoading(provider || 'zenuxs');

    try {
      const redirectUri = window.location.origin;

      const oauth = new ZenuxOAuth({
        clientId: ZENUXS_CLIENT_ID,
        redirectUri,
        scopes: 'openid profile email',
        theme: 'light',
        uiFallbackMode: 'popup'
      });

      const loginOpts: any = {
        mode: 'popup',
        redirectUri
      };

      if (provider) {
        loginOpts.provider = provider;
        loginOpts.extraAuthParams = { provider };
      }

      let tokens: any = null;
      let userInfo: any = null;

      try {
        tokens = await oauth.login(loginOpts);
        if (tokens) {
          userInfo = await oauth.getUserInfo().catch(() => null);
        }
      } catch (popupErr: any) {
        console.warn('Popup login was interrupted or blocked, redirecting:', popupErr);
        await oauth.login({
          ...loginOpts,
          mode: 'redirect'
        });
        return;
      }

      if (!tokens && !userInfo) {
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
          setSuccessMsg('Authenticated successfully! Redirecting...');
          setTimeout(() => {
            navigate(redirectTo, { replace: true });
          }, 350);
        } else {
          setError(res.message || 'Zenuxs authentication verification failed on server.');
        }
      } else {
        setError('Could not retrieve account details from Zenuxs. Please try again.');
      }
    } catch (err: any) {
      console.error('Zenuxs login error:', err);
      setError(err?.message || 'Authentication encountered an unexpected error.');
    } finally {
      setSocialLoading(null);
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

          {/* Zenuxs OAuth Buttons */}
          <div className="space-y-3 pt-1">
            {/* 1. Direct Zenuxs SSO */}
            <button
              type="button"
              onClick={() => handleZenuxsLogin()}
              disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {socialLoading === 'zenuxs' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting to Zenuxs SSO...</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center text-[10px] font-black text-white">
                    Z
                  </div>
                  <span>Sign In with Zenuxs SSO</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </>
              )}
            </button>

            {/* 2. Google via Zenuxs */}
            <button
              type="button"
              onClick={() => handleZenuxsLogin('google')}
              disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-sm border border-slate-200 transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {socialLoading === 'google' ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-purple-600 rounded-full animate-spin" />
                  <span>Connecting with Google...</span>
                </>
              ) : (
                <>
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* 3. GitHub via Zenuxs */}
            <button
              type="button"
              onClick={() => handleZenuxsLogin('github')}
              disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {socialLoading === 'github' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting with GitHub...</span>
                </>
              ) : (
                <>
                  <GitHubIcon />
                  <span>Continue with GitHub</span>
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
  );
};

export default Login;
