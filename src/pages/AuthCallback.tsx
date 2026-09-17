import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZenuxOAuth } from 'zenuxs-oauth';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const ZENUXS_CLIENT_ID = '99366ee281c7e424';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithZenuxs } = useAuth();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const hasHandledRef = useRef(false);

  useEffect(() => {
    if (hasHandledRef.current) return;
    hasHandledRef.current = true;

    // Safety timeout: never allow processing to hang indefinitely
    const safetyTimer = setTimeout(() => {
      setStatus((current) => {
        if (current === 'processing') {
          setErrorMessage('Authentication response timed out. Please click below to return to login.');
          return 'error';
        }
        return current;
      });
    }, 8000);

    const completeAuth = async () => {
      try {
        const oauth = new ZenuxOAuth({
          clientId: ZENUXS_CLIENT_ID,
          redirectUri: window.location.origin,
          scopes: 'openid profile email',
          storage: 'localStorage',
          validateState: false
        });

        // Initialize and handle redirect callback parameters
        const tokens = await oauth.init({
          redirectUri: window.location.origin,
          allowMissingCallback: true
        });

        let resolvedTokens = tokens;
        if (!resolvedTokens) {
          resolvedTokens = oauth.getTokens();
        }

        if (resolvedTokens) {
          let userInfo: any = null;
          try {
            userInfo = await oauth.getUserInfo();
          } catch {
            // Fallback to token claim decoding
            const tokenToDecode = (resolvedTokens as any).id_token || (resolvedTokens as any).access_token;
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

          const res = await loginWithZenuxs({
            sub: userInfo?.sub,
            email: userInfo?.email,
            name: userInfo?.name || 'Student',
            picture: userInfo?.picture
          });

          if (res.success) {
            clearTimeout(safetyTimer);
            setStatus('success');
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 300);
          } else {
            clearTimeout(safetyTimer);
            setStatus('error');
            setErrorMessage(res.message || 'Server verification failed.');
          }
        } else {
          clearTimeout(safetyTimer);
          setStatus('error');
          setErrorMessage('Could not retrieve tokens from Zenuxs authentication.');
        }
      } catch (err: any) {
        clearTimeout(safetyTimer);
        setStatus('error');
        setErrorMessage(err?.message || 'OAuth callback encountered an error.');
      }
    };

    completeAuth();
  }, [loginWithZenuxs, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-white shadow-2xl">
        {status === 'processing' && (
          <div className="space-y-4">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
            <h2 className="text-lg font-bold">Completing #2 Zenuxs Auth Sign In...</h2>
            <p className="text-xs text-slate-400">Verifying security tokens and setting up your personal workspace.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h2 className="text-lg font-bold text-emerald-400">Successfully Signed In!</h2>
            <p className="text-xs text-slate-400">Redirecting to your dashboard...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
            <h2 className="text-lg font-bold text-rose-400">Sign In Failed</h2>
            <p className="text-xs text-slate-300">{errorMessage}</p>
            <button
              onClick={() => navigate('/login', { replace: true })}
              className="mt-4 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
