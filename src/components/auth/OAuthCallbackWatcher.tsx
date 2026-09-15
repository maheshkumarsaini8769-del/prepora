import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const search = window.location.search || location.search;
    if (!search) return;

    const params = new URLSearchParams(search);
    const hasCode = params.has('code');
    const hasError = params.has('error');

    if (!hasCode && !hasError) return;

    const isPopup = typeof window !== 'undefined' && window.opener && window.opener !== window;

    const completeCallback = async () => {
      setProcessing(true);
      setError(null);

      try {
        const oauth = new ZenuxOAuth({
          clientId: ZENUXS_CLIENT_ID,
          redirectUri: window.location.origin,
          scopes: 'openid profile email'
        });

        // If this is running in a popup window, oauth.init() handles callback,
        // sends message to window.opener, and triggers popup close.
        const tokens = await oauth.init({
          redirectUri: window.location.origin
        });

        if (isPopup) {
          // Popup will be closed by SDK or parent; provide a fallback close
          setTimeout(() => {
            try {
              window.close();
            } catch {
              // Ignore popup close restriction
            }
          }, 600);
          return;
        }

        // Running in main window (e.g. from full-page redirect flow)
        let resolvedTokens = tokens;
        if (!resolvedTokens) {
          resolvedTokens = oauth.getTokens();
        }

        if (resolvedTokens) {
          const userInfo = await oauth.getUserInfo().catch(() => null);
          if (userInfo) {
            const res = await loginWithZenuxs({
              sub: userInfo.sub || userInfo.id,
              email: userInfo.email,
              name: userInfo.name || userInfo.given_name || (userInfo.email ? userInfo.email.split('@')[0] : 'Student'),
              picture: userInfo.picture || userInfo.avatar
            });

            // Clean up the URL query parameters
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);

            if (res.success) {
              setProcessing(false);
              navigate('/', { replace: true });
              return;
            } else {
              setError(res.message || 'Server verification failed.');
            }
          } else {
            setError('Could not retrieve user account details from Zenuxs.');
          }
        } else {
          setError(params.get('error_description') || params.get('error') || 'OAuth authorization code exchange failed.');
        }
      } catch (err: any) {
        console.error('OAuth callback execution error:', err);
        setError(err?.message || 'Authentication error during code exchange.');
      } finally {
        if (!isPopup) {
          setProcessing(false);
        }
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
              Verifying credentials with Zenuxs and securing your private student workspace.
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
                // Clear error and URL query
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
