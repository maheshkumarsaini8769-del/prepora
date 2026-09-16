import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';
import User, { IUser } from '../models/User.js';
import Session from '../models/Session.js';

const _jwtSecret = process.env.JWT_SECRET;
if (!_jwtSecret) {
  console.error('[FATAL] JWT_SECRET environment variable is not set. Server cannot start.');
  process.exit(1);
}
export const JWT_SECRET: string = _jwtSecret;

export const hashToken = (token: string): string => createHash('sha256').update(token).digest('hex');

export interface AuthRequest extends Request {
  user?: IUser;
  userId?: string;
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
    } catch (err: any) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
    }

    // Check if session is revoked (token is stored as SHA-256 hash)
    const tokenHash = hashToken(token);
    const session = await Session.findOne({ token: tokenHash, isRevoked: false });
    if (!session) {
      // If no active session found, check if it was revoked
      const revokedSession = await Session.findOne({ token: tokenHash, isRevoked: true });
      if (revokedSession) {
        return res.status(401).json({ success: false, message: 'Session has been revoked or logged out.' });
      }
    }

    // Update session last active time asynchronously
    if (session) {
      session.lastActive = new Date();
      session.save().catch(() => null);
    }

    const user = await User.findOne({ id: decoded.id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Account has been suspended. Please contact support.' });
    }

    req.user = user;
    req.userId = user.id;
    req.token = token;
    req.sessionId = session?.id;
    next();
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Authentication error.' });
  }
};

export const requireAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
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
