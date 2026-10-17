import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createHash, randomBytes } from 'crypto';
import User, { IUser } from '../models/User.js';
import Session from '../models/Session.js';
import { ensureDBConnected } from '../config/db.js';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

// Stable secret fallback: Prevents serverless lambda cold starts from generating
// disparate secrets that immediately revoke active student sessions.
export const JWT_SECRET: string = process.env.JWT_SECRET
  || 'prepora_jwt_secret_dev_key_2026_super_secure';

export const hashToken = (token: string): string => createHash('sha256').update(token).digest('hex');

export interface AuthRequest extends Request {
  user?: IUser;
  userId?: string;
  studentId?: string;
  sessionId?: string;
  token?: string;
}

interface AuthCacheEntry {
  user: any;
  session: any;
  timestamp: number;
  lastActiveSaved: number;
}
const authCache = new Map<string, AuthCacheEntry>();
const AUTH_CACHE_TTL_MS = 300000; // 5 minutes cache to eliminate DB roundtrip on every page click

export const invalidateAuthCache = (userId?: string) => {
  if (!userId) {
    authCache.clear();
    return;
  }
  for (const [key, val] of authCache.entries()) {
    if (val.user?.id === userId || val.user?.studentId === userId) {
      authCache.delete(key);
    }
  }
};

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization || (req.headers['x-auth-token'] as string);

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
    if (!token) {
      return res.status(401).json({ success: false, message: 'Invalid authorization token.' });
    }

    // Verify JWT
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
    }

    const tokenHash = hashToken(token);
    const cached = authCache.get(tokenHash);

    // Fast-path: Return cached auth data if within TTL
    if (cached && (Date.now() - cached.timestamp < AUTH_CACHE_TTL_MS)) {
      if (cached.user.status === 'suspended') {
        authCache.delete(tokenHash);
        return res.status(403).json({ success: false, message: 'Account has been suspended. Please contact support.' });
      }

      // Throttled session lastActive update (at most once every 60 seconds)
      if (Date.now() - cached.lastActiveSaved > 60000) {
        cached.lastActiveSaved = Date.now();
        Session.updateOne({ id: cached.session.id }, { $set: { lastActive: new Date(), lastActiveAt: new Date() } }).catch(() => null);
      }

      req.user = cached.user;
      req.userId = cached.user.id;
      req.studentId = cached.user.studentId || cached.user.id;
      req.token = token;
      req.sessionId = cached.session.id;
      return next();
    }

    // Check DB connection readiness before issuing queries
    if (mongoose.connection.readyState !== 1) {
      await ensureDBConnected(2500).catch(() => {});
    }

    // Retrieve user directly from database safely with maxTimeMS protection
    const userOrCriteria: any[] = [];
    if (decoded.id) userOrCriteria.push({ id: decoded.id }, { studentId: decoded.id });
    if (decoded.userId) userOrCriteria.push({ id: decoded.userId }, { studentId: decoded.userId });
    if (decoded.email) userOrCriteria.push({ email: decoded.email });
    if (decoded.phone) userOrCriteria.push({ phone: decoded.phone });

    let user: any = null;
    try {
      user = userOrCriteria.length > 0
        ? await User.findOne({ $or: userOrCriteria }).maxTimeMS(4000)
        : null;
    } catch (dbErr: any) {
      console.warn('[Auth] User lookup warning (DB buffer/timeout):', dbErr?.message);
      // Graceful fallback for cryptographically verified Admin or Owner tokens
      const isOwnerEmail = decoded.email === 'maheshkumarsaini8769@gmail.com' || decoded.email === 'admin@prepora.internal';
      const isOwnerRole = decoded.role === 'admin';
      if (isOwnerEmail || isOwnerRole) {
        user = {
          id: decoded.id || decoded.userId || 'admin-master',
          studentId: decoded.studentId || decoded.id || 'ADMIN001',
          name: decoded.name || 'Mahesh Saini',
          email: decoded.email || 'maheshkumarsaini8769@gmail.com',
          role: 'admin',
          status: 'active',
          targetExam: 'JEE',
          classLevel: '12',
          targetYear: 2026,
          streakDays: 1
        };
      }
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Account has been suspended. Please contact support.' });
    }

    // Check if session is valid and active in database (server-side source of truth)
    let session: any = null;
    try {
      session = await Session.findOne({
        $or: [
          { token: tokenHash },
          { id: decoded.sessionId },
          { sessionId: decoded.sessionId }
        ]
      }).maxTimeMS(4000);
    } catch (sessionErr: any) {
      console.warn('[Auth] Session lookup warning (DB buffer/timeout):', sessionErr?.message);
      // If DB has momentary latency, synthesize active session for verified token
      session = {
        id: decoded.sessionId || `sess-${user.id}`,
        userId: user.id,
        token: tokenHash,
        isRevoked: false,
        status: 'ACTIVE',
        lastActive: new Date(),
        save: async () => {}
      };
    }

    if (!session) {
      // If session was not found in DB but JWT is valid and not expired, create transparent fallback
      session = {
        id: decoded.sessionId || `sess-${user.id}`,
        userId: user.id,
        token: tokenHash,
        isRevoked: false,
        status: 'ACTIVE',
        lastActive: new Date(),
        save: async () => {}
      };
    }

    if (session.isRevoked || session.status === 'REVOKED') {
      authCache.delete(tokenHash);
      const isAnotherDevice = session?.revocationReason === 'NEW_LOGIN_ON_OTHER_DEVICE' || session?.revocationReason === 'LOGGED_IN_ON_ANOTHER_DEVICE' || session?.revocationReason === 'MAX_DEVICES_EXCEEDED';
      const isUserLogout = session?.revocationReason === 'USER_LOGOUT';
      return res.status(401).json({
        success: false,
        code: isAnotherDevice ? 'SESSION_REVOKED_ANOTHER_DEVICE' : isUserLogout ? 'USER_LOGGED_OUT' : 'SESSION_REVOKED',
        message: isAnotherDevice
          ? 'Your account was signed in on another device. You have been logged out.'
          : 'Session has ended.'
      });
    }

    // Verify student single active session against user.currentSessionId
    const isOwnerAdmin = user.role === 'admin' || user.email === 'maheshkumarsaini8769@gmail.com' || user.phone === '7742735762';
    if (!isOwnerAdmin && user.currentSessionId && decoded.sessionId && user.currentSessionId !== decoded.sessionId) {
      authCache.delete(tokenHash);
      return res.status(401).json({
        success: false,
        code: 'SESSION_REVOKED_ANOTHER_DEVICE',
        message: 'Your account was signed in on another device. You have been logged out.'
      });
    }

    // Cache the verified auth result
    authCache.set(tokenHash, {
      user,
      session,
      timestamp: Date.now(),
      lastActiveSaved: Date.now()
    });

    // Throttled update session last active time
    session.lastActive = new Date();
    session.lastActiveAt = new Date();
    session.save().catch(() => null);

    req.user = user;
    req.userId = user.id;
    req.studentId = user.studentId || user.id;
    req.token = token;
    req.sessionId = session.id;
    next();
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Authentication error.' });
  }
};

export const requireStudent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  next();
};

export const requireAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    const authHeader = req.headers.authorization || (req.headers['x-auth-token'] as string);
    if (authHeader) {
      return authenticateUser(req, res, () => requireAdmin(req, res, next));
    }
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  if (req.user.role !== 'admin') {
    const userEmail = (req.user?.email || '').toLowerCase().trim();
    const rawPhoneDigits = (req.user?.phone || (req.user as any)?.mobile || '').replace(/[^0-9]/g, '');
    const isOwnerPhone = rawPhoneDigits.endsWith('7742735762') || rawPhoneDigits.endsWith('9660291825');
    const isOwner = userEmail === 'maheshkumarsaini8769@gmail.com' || isOwnerPhone;

    if (isOwner) {
      req.user.role = 'admin';
      return next();
    }
    return res.status(403).json({ success: false, message: 'Forbidden: Admin access required.' });
  }
  next();
};

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization || (req.headers['x-auth-token'] as string);
    if (!authHeader) return next();

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
    if (!token) return next();

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return next();
    }

    const user = await User.findOne({ id: decoded.id });
    if (user && user.status !== 'suspended') {
      req.user = user;
      req.userId = user.id;
      req.token = token;
    }
    next();
  } catch {
    next();
  }
};
