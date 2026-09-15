import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();

  // If token is missing, check if this is an active OAuth callback
  if (!isAuthenticated && !token) {
    if (location.search.includes('code=') || location.search.includes('error=')) {
      // Allow OAuthCallbackWatcher to finish token exchange
      return null;
    }
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  return <>{children}</>;
};
