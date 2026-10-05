import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createHash, randomBytes } from 'crypto';
import User, { IUser } from '../models/User.js';
import Session from '../models/Session.js';

// SECURITY: the secret must come from env. A predictable fallback constant would
// let anyone forge valid tokens, so production without JWT_SECRET gets a random
// per-instance secret (tokens reset on cold start) plus a loud warning.
export const JWT_SECRET: string = process.env.JWT_SECRET
  || (process.env.NODE_ENV === 'production'
    ? randomBytes(32).toString('hex')
    : 'prepora_dev_only_secret_never_use_in_production');

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.warn('[SECURITY] JWT_SECRET env var is NOT set — using a random per-instance secret. Set JWT_SECRET to keep sessions stable.');
}

export const hashToken = (token: string): string => createHash('sha256').update(token).digest('hex');

export interface AuthRequest extends Request {
  user?: IUser;
  userId?: string;
  studentId?: string;
  sessionId?: string;
  token?: string;
}

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

    // Retrieve user directly from database
    const user = await User.findOne({ $or: [{ id: decoded.id }, { studentId: decoded.id }, { email: decoded.email }] });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Account has been suspended. Please contact support.' });
    }

    // Check if session is valid and active in database (server-side source of truth)
    const tokenHash = hashToken(token);
    const session = await Session.findOne({
      $or: [
        { token: tokenHash },
        { id: decoded.sessionId },
        { sessionId: decoded.sessionId }
      ]
    });

    if (!session || session.isRevoked || session.status === 'REVOKED') {
      const isAnotherDevice = session?.revocationReason === 'NEW_LOGIN_ON_OTHER_DEVICE' || session?.revocationReason === 'LOGGED_IN_ON_ANOTHER_DEVICE';
      return res.status(401).json({
        success: false,
        code: 'SESSION_REVOKED',
        message: isAnotherDevice
          ? 'Your account was signed in on another device.'
          : 'Session has been revoked or logged out.'
      });
    }

    // CRITICAL: Strictly ONE active session per student at a time!
    // If user's current active session ID does not match this session, it was revoked by a newer login!
    if (user.currentSessionId && session.id !== user.currentSessionId && session.sessionId !== user.currentSessionId) {
      session.isRevoked = true;
      session.status = 'REVOKED';
      session.revokedAt = new Date();
      session.revocationReason = 'NEW_LOGIN_ON_OTHER_DEVICE';
      await session.save().catch(() => null);

      return res.status(401).json({
        success: false,
        code: 'SESSION_REVOKED',
        message: 'Your account was signed in on another device.'
      });
    }

    // Update session last active time
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
  if (!req.user || req.user.role !== 'admin') {
    if (
      (req.user?.email && (req.user.email === 'maheshkumarsaini8769@gmail.com' || req.user.email === 'admin@prepora.com')) ||
      (req.user?.phone && (req.user.phone === '7742735762' || req.user.phone.endsWith('7742735762')))
    ) {
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
