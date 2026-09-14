import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { userService } from '../services/userService';
import { initialUserProfile } from '../data/mockData';

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  os: string;
  ipAddress: string;
  lastActive: string;
  createdAt: string;
  isCurrent: boolean;
}

export interface AuthContextType {
  user: UserProfile & { role?: 'student' | 'admin' };
  token: string | null;
  isAuthenticated: boolean;
  activeSessions: ActiveSession[];
  authModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'otp' | 'forgot';
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalMode: (mode: 'login' | 'register' | 'otp' | 'forgot') => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: { name: string; email: string; password: string; targetExam?: string; classLevel?: string }) => Promise<{ success: boolean; message?: string }>;
  sendOtp: (email: string) => Promise<{ success: boolean; message?: string; debugOtp?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string; debugOtp?: string }>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  logoutOtherDevices: () => Promise<{ success: boolean; message?: string }>;
  fetchSessions: () => Promise<void>;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'prepora_auth_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile & { role?: 'student' | 'admin' }>(() => {
    return userService.getProfile();
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'otp' | 'forgot'>('login');

  // Verify token on mount and fetch current user profile
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) return;

      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${storedToken}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            const merged: UserProfile = {
              ...userService.getProfile(),
              ...data.user,
              avatarUrl: data.user.avatar || userService.getProfile().avatarUrl
            };
            setUser(merged);
            userService.updateProfile(merged);
            fetchSessions(storedToken);
          }
        } else if (res.status === 401) {
          // Token expired or session revoked
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        }
      } catch (err) {
        console.warn('Could not connect to /api/auth/me, using local profile state:', err);
      }
    };

    initAuth();
  }, []);

  const fetchSessions = async (authToken?: string) => {
    const t = authToken || token;
    if (!t) return;

    try {
      const res = await fetch('/api/auth/sessions', {
        headers: { Authorization: `Bearer ${t}` }
      });
      if (res.ok) {
        const data = await res.json();
        setActiveSessions(data.sessions || []);
      }
    } catch {
      // Offline fallback: provide local active device
      setActiveSessions([
        {
          id: 'local-curr-sess',
          device: 'Current Device',
          browser: 'Web Browser',
          os: navigator.platform || 'Unknown OS',
          ipAddress: '127.0.0.1',
          lastActive: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          isCurrent: true
        }
      ]);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Login failed.' };
      }

      setToken(data.token);
      localStorage.setItem(TOKEN_KEY, data.token);

      const updatedUser: UserProfile = {
        ...userService.getProfile(),
        ...data.user,
        avatarUrl: data.user.avatar || userService.getProfile().avatarUrl
      };
      setUser(updatedUser);
      userService.updateProfile(updatedUser);
      fetchSessions(data.token);
      setAuthModalOpen(false);

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Network connection error.' };
    }
  };

  const register = async (userData: { name: string; email: string; password: string; targetExam?: string; classLevel?: string }): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Registration failed.' };
      }

      setToken(data.token);
      localStorage.setItem(TOKEN_KEY, data.token);

      const updatedUser: UserProfile = {
        ...userService.getProfile(),
        ...data.user,
        avatarUrl: data.user.avatar || userService.getProfile().avatarUrl
      };
      setUser(updatedUser);
      userService.updateProfile(updatedUser);
      fetchSessions(data.token);
      setAuthModalOpen(false);

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Network connection error.' };
    }
  };

  const sendOtp = async (email: string): Promise<{ success: boolean; message?: string; debugOtp?: string }> => {
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message, debugOtp: data.debugOtp };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to send OTP.' };
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'OTP verification failed.' };
      }

      setToken(data.token);
      localStorage.setItem(TOKEN_KEY, data.token);

      const updatedUser: UserProfile = {
        ...userService.getProfile(),
        ...data.user,
        avatarUrl: data.user.avatar || userService.getProfile().avatarUrl
      };
      setUser(updatedUser);
      userService.updateProfile(updatedUser);
      fetchSessions(data.token);
      setAuthModalOpen(false);

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to verify OTP.' };
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message?: string; debugOtp?: string }> => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message, debugOtp: data.debugOtp };
    } catch (err: any) {
      return { success: false, message: err.message || 'Request failed.' };
    }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message };
    } catch (err: any) {
      return { success: false, message: err.message || 'Password reset failed.' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => null);
      }
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setActiveSessions([]);
      setUser(initialUserProfile);
      userService.updateProfile(initialUserProfile);
    }
  };

  const logoutOtherDevices = async (): Promise<{ success: boolean; message?: string }> => {
    if (!token) return { success: false, message: 'Not authenticated.' };

    try {
      const res = await fetch('/api/auth/logout-other-devices', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await fetchSessions();
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Failed to logout other devices.' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const updateUser = async (updates: Partial<UserProfile>): Promise<void> => {
    const updated = userService.updateProfile(updates);
    setUser(updated);

    if (token) {
      try {
        await fetch('/api/auth/me', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updates)
        });
      } catch (err) {
        console.warn('Failed to sync profile update to server:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        activeSessions,
        authModalOpen,
        authModalMode,
        setAuthModalOpen,
        setAuthModalMode,
        login,
        register,
        sendOtp,
        verifyOtp,
        forgotPassword,
        resetPassword,
        logout,
        logoutOtherDevices,
        fetchSessions,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
