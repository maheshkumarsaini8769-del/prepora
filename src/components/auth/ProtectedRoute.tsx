import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();

  // 1. Authenticated in React state
  if (isAuthenticated || token) {
    return <>{children}</>;
  }

  // 2. Synchronously check if session token exists in localStorage
  const storedToken = typeof window !== 'undefined' ? localStorage.getItem('prepora_token') : null;
  if (storedToken) {
    return <>{children}</>;
  }

  // 3. Check if OAuth callback params exist in URL or if OAuth processing is in flight
  const search = location.search || (typeof window !== 'undefined' ? window.location.search : '');
  const hasAuthParams = search.includes('code=') || search.includes('state=') || search.includes('error=');
  const isOAuthInFlight =
    typeof window !== 'undefined' &&
    (sessionStorage.getItem('prepora_oauth_processing') === 'true' ||
      localStorage.getItem('prepora_oauth_processing') === 'true');

  if (hasAuthParams || isOAuthInFlight) {
    // Show clean loading state while OAuth code is exchanged for tokens and session is saved
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex flex-col items-center justify-center text-white px-4">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4" />
        <h2 className="text-lg font-bold">Signing You In...</h2>
        <p className="text-xs text-slate-400 mt-1">Verifying #2 Zenuxs Auth credentials and loading dashboard...</p>
      </div>
    );
  }

  // 4. Truly unauthenticated: redirect to login
  return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
};

