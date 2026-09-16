import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ZenuxOAuth } from 'zenuxs-oauth';
import { X, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Target, GraduationCap } from 'lucide-react';

const ZENUXS_CLIENT_ID = '99366ee281c7e424';

const GoogleIconModal: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
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

const GitHubIconModal: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, loginWithZenuxs } = useAuth();

  const [targetExam, setTargetExam] = useState<'JEE' | 'NEET' | 'Board'>('JEE');
  const [classLevel, setClassLevel] = useState<'11' | '12' | 'Dropper'>('12');

  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | 'zenuxs' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!authModalOpen) return null;

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
        console.warn('Popup interrupted, redirecting:', popupErr);
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
          setSuccessMsg('Authenticated! Welcome to PREPORA.');
          setTimeout(() => {
            setAuthModalOpen(false);
          }, 400);
        } else {
          setError(res.message || 'Zenuxs authentication verification failed.');
        }
      } else {
        setError('Could not retrieve account details from Zenuxs. Please try again.');
      }
    } catch (err: any) {
      console.error('Zenuxs login modal error:', err);
      setError(err?.message || 'Authentication encountered an unexpected error.');
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-xl mb-3 shadow-md shadow-purple-500/20">
            P
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Sign In with Zenuxs
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Single Sign-On authentication for your PREPORA learning account
          </p>
        </div>

        {/* Target Exam & Class preferences */}
        <div className="mb-5 space-y-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-purple-600" />
              Target Exam:
            </span>
            <div className="flex gap-1">
              {(['JEE', 'NEET', 'Board'] as const).map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setTargetExam(ex)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                    targetExam === ex
                      ? 'bg-purple-600 text-white'
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
              Class:
            </span>
            <div className="flex gap-1">
              {(['11', '12', 'Dropper'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setClassLevel(lvl)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                    classLevel === lvl
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lvl === 'Dropper' ? 'Dropper' : `Class ${lvl}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Buttons */}
        <div className="space-y-2.5">
          {/* 1. Zenuxs SSO */}
          <button
            type="button"
            onClick={() => handleZenuxsLogin()}
            disabled={!!socialLoading}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          >
            {socialLoading === 'zenuxs' ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center text-[9px] font-black text-white">
                Z
              </div>
            )}
            <span>Sign In with Zenuxs SSO</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>

          {/* 2. Google via Zenuxs */}
          <button
            type="button"
            onClick={() => handleZenuxsLogin('google')}
            disabled={!!socialLoading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs border border-slate-200 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          >
            {socialLoading === 'google' ? (
              <div className="w-4 h-4 border-2 border-slate-300 border-t-purple-600 rounded-full animate-spin" />
            ) : (
              <GoogleIconModal />
            )}
            <span>Continue with Google</span>
          </button>

          {/* 3. GitHub via Zenuxs */}
          <button
            type="button"
            onClick={() => handleZenuxsLogin('github')}
            disabled={!!socialLoading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs shadow-xs transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          >
            {socialLoading === 'github' ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <GitHubIconModal />
            )}
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Security badge */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>Unified Zenuxs SSO • End-to-End Encrypted Session</span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
