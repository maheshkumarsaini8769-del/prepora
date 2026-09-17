import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ZenuxOAuth } from 'zenuxs-oauth';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, AlertCircle } from 'lucide-react';

const ZENUXS_CLIENT_ID = '99366ee281c7e424';

export const OAuthCallbackWatcher: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithZenuxs } = useAuth();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    // If already handled in this component lifecycle, prevent duplicate execution
    if (hasProcessedRef.current) return;

    const search = window.location.search || location.search;
    if (!search) return;

    const params = new URLSearchParams(search);
    const hasCode = params.has('code');
    const hasError = params.has('error');

    if (!hasCode && !hasError) return;

    // Mark as handled immediately to avoid parallel loops
    hasProcessedRef.current = true;

    // Direct OAuth error returned in query string
    if (hasError) {
      const errDesc = params.get('error_description') || params.get('error') || 'Authentication was denied or cancelled.';
      setError(errDesc);
      setProcessing(false);
      return;
    }

    const isPopup = typeof window !== 'undefined' && window.opener && window.opener !== window;

    // Mark processing flags so ProtectedRoute shows loading and never bounces to login
    sessionStorage.setItem('prepora_oauth_processing', 'true');
    localStorage.setItem('prepora_oauth_processing', 'true');

    setProcessing(true);
    setError(null);

    // Hard safety timeout: under NO circumstances will the loading screen stay stuck past 8 seconds
    const safetyTimer = setTimeout(() => {
      setProcessing((current) => {
        if (current) {
          sessionStorage.removeItem('prepora_oauth_processing');
          localStorage.removeItem('prepora_oauth_processing');
          setError('Authentication server response timed out. Please try signing in again.');
          return false;
        }
        return false;
      });
    }, 8000);

    const completeCallback = async () => {
      try {
        const oauth = new ZenuxOAuth({
          clientId: ZENUXS_CLIENT_ID,
          redirectUri: window.location.origin,
          scopes: 'openid profile email',
          storage: 'localStorage',
          validateState: false,
          cleanupUrl: false
        } as any);

        // Initialize and handle code exchange without stripping URL params prematurely
        const tokens = await oauth.init({
          redirectUri: window.location.origin,
          allowMissingCallback: true,
          cleanupUrl: false
        } as any);

        let resolvedTokens = tokens;
        if (!resolvedTokens) {
          resolvedTokens = oauth.getTokens();
        }

        if (isPopup) {
          // Send message to parent window if opener exists
          try {
            if (window.opener && typeof window.opener.postMessage === 'function') {
              window.opener.postMessage(
                {
                  type: 'zenux_oauth_success',
                  state: params.get('state'),
                  clientId: ZENUXS_CLIENT_ID,
                  tokens: resolvedTokens
                },
                window.location.origin
              );
            }
          } catch (pmErr) {
            console.warn('Could not postMessage to opener:', pmErr);
          }

          // Close popup safely
          setTimeout(() => {
            try {
              window.close();
            } catch {
              // Ignore popup close restriction
            }
          }, 300);
          setProcessing(false);
          clearTimeout(safetyTimer);
          sessionStorage.removeItem('prepora_oauth_processing');
          localStorage.removeItem('prepora_oauth_processing');
          return;
        }

        // Running in main application window
        if (resolvedTokens) {
          // Immediately record token in localStorage so any guard check passes
          const rawToken = (resolvedTokens as any).access_token || (resolvedTokens as any).id_token || 'zenuxs_verified';
          localStorage.setItem('prepora_token', rawToken);

          // 1. Try standard getUserInfo endpoint safely
          let userInfo: any = null;
          try {
            userInfo = await oauth.getUserInfo();
          } catch (uiErr) {
            console.warn('Direct userinfo endpoint call skipped/failed, falling back to token decoding:', uiErr);
          }

          // 2. Resilient fallback: decode user claims from ID token or access token
          if (!userInfo) {
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

          // Recover saved student preferences
          const savedExam = localStorage.getItem('prepora_selected_target_exam') || undefined;
          const savedClass = localStorage.getItem('prepora_selected_class_level') || undefined;

          // 3. Complete authentication into application context
          const res = await loginWithZenuxs({
            sub: userInfo?.sub,
            email: userInfo?.email,
            name: userInfo?.name || 'Student',
            picture: userInfo?.picture,
            targetExam: savedExam,
            classLevel: savedClass
          });

          // Clean up URL parameters cleanly
          window.history.replaceState({}, document.title, '/');

          if (res.success) {
            clearTimeout(safetyTimer);
            sessionStorage.removeItem('prepora_oauth_processing');
            localStorage.removeItem('prepora_oauth_processing');
            setProcessing(false);
            window.location.assign('/');
            return;
          } else {
            setError(res.message || 'Server verification failed.');
          }
        } else {
          setError(params.get('error_description') || params.get('error') || 'OAuth authorization code could not be verified.');
        }
      } catch (err: any) {
        console.error('OAuth callback execution error:', err);
        setError(err?.message || 'Authentication error during code verification.');
      } finally {
        clearTimeout(safetyTimer);
        sessionStorage.removeItem('prepora_oauth_processing');
        localStorage.removeItem('prepora_oauth_processing');
        setProcessing(false);
      }
    };

    completeCallback();
  }, [location.search, loginWithZenuxs, navigate]);

  if (!processing && !error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-white shadow-2xl space-y-4">
        {processing && (
          <>
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
            <h3 className="text-lg font-bold">Signing You In...</h3>
            <p className="text-xs text-slate-400">
              Verifying credentials with #2 Zenuxs Auth and preparing your student dashboard.
            </p>
          </>
        )}

        {error && (
          <>
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-rose-400">Authentication Failed</h3>
            <p className="text-xs text-slate-300">{error}</p>
            <button
              onClick={() => {
                window.history.replaceState({}, document.title, '/login');
                navigate('/login', { replace: true });
                setError(null);
                setProcessing(false);
              }}
              className="mt-3 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Return to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};
