import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.js';
import Session from '../models/Session.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'prepora-secret-super-secure-jwt-key-2026';

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

    // Check if session is revoked
    const session = await Session.findOne({ token, isRevoked: false });
    if (!session) {
      // If no active session found, check if it was revoked
      const revokedSession = await Session.findOne({ token, isRevoked: true });
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
