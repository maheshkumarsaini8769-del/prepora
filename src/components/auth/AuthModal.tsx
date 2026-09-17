import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ZenuxOAuth } from 'zenuxs-oauth';
import { X, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Target, GraduationCap } from 'lucide-react';

const ZENUXS_CLIENT_ID = '99366ee281c7e424';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, loginWithZenuxs } = useAuth();

  const [targetExam, setTargetExam] = useState<'JEE' | 'NEET' | 'Board'>('JEE');
  const [classLevel, setClassLevel] = useState<'11' | '12' | 'Dropper'>('12');

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handleZenuxsLogin = async () => {
    setError(null);
    setIsLoggingIn(true);

    const safetyTimer = setTimeout(() => {
      setIsLoggingIn((current) => {
        if (current) {
          setError('Authentication server response timed out. Please try again.');
          return false;
        }
        return false;
      });
    }, 8000);

    try {
      const redirectUri = window.location.origin;

      const oauth = new ZenuxOAuth({
        clientId: ZENUXS_CLIENT_ID,
        redirectUri,
        scopes: 'openid profile email',
        theme: 'light',
        storage: 'localStorage',
        validateState: false,
        uiFallbackMode: 'popup'
      });

      const loginOpts: any = {
        mode: 'popup',
        redirectUri
      };

      let tokens: any = null;
      let userInfo: any = null;

      try {
        tokens = await oauth.login(loginOpts);
        if (tokens) {
          userInfo = await oauth.getUserInfo().catch(() => null);
        }
      } catch (popupErr: any) {
        console.warn('Popup interrupted, redirecting:', popupErr);
        clearTimeout(safetyTimer);
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

      // Resilient claim decoding from JWT
      if (tokens && !userInfo) {
        const tokenToDecode = (tokens as any).id_token || (tokens as any).access_token;
        if (tokenToDecode) {
          const decoded = oauth.decodeJWT(tokenToDecode);
          if (decoded && (decoded.email || decoded.sub)) {
            userInfo = {
              sub: decoded.sub || decoded.id,
              email: decoded.email,
              name: decoded.name || decoded.given_name || (decoded.email ? decoded.email.split('@')[0] : 'Student'),
              picture: decoded.picture || decoded.avatar
            };
          }
        }
      }

      if (tokens || userInfo) {
        clearTimeout(safetyTimer);
        const res = await loginWithZenuxs({
          sub: userInfo?.sub || (tokens as any)?.sub,
          email: userInfo?.email,
          name: userInfo?.name || (userInfo?.email ? userInfo.email.split('@')[0] : 'Student'),
          picture: userInfo?.picture,
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
      if (err?.code === 'AUTH_CANCELLED' || err?.message?.includes('closed')) {
        setError('Sign-in was cancelled. Click "#2 — Zenuxs Auth" to try again.');
      } else {
        setError(err?.message || 'Authentication encountered an unexpected error.');
      }
    } finally {
      clearTimeout(safetyTimer);
      setIsLoggingIn(false);
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

        {/* Login Buttons: ONLY #2 — Zenuxs Auth */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleZenuxsLogin}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          >
            {isLoggingIn ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying #2 Zenuxs Auth...</span>
              </>
            ) : (
              <>
                <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center text-[10px] font-black text-white">
                  Z
                </div>
                <span>#2 — Zenuxs Auth</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </>
            )}
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
