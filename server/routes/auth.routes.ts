import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Session from '../models/Session.js';
import { JWT_SECRET, authenticateUser, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Helper to parse device info from User-Agent
function parseDeviceInfo(req: Request) {
  const userAgent = req.headers['user-agent'] || '';
  let device = 'Desktop PC';
  let browser = 'Chrome';
  let os = 'Windows';

  if (/android/i.test(userAgent)) {
    device = 'Android Device';
    os = 'Android';
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    device = /ipad/i.test(userAgent) ? 'iPad' : 'iPhone';
    os = 'iOS';
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    device = 'Mac';
    os = 'macOS';
  } else if (/linux/i.test(userAgent)) {
    device = 'Linux PC';
    os = 'Linux';
  }

  if (/edg/i.test(userAgent)) browser = 'Microsoft Edge';
  else if (/firefox/i.test(userAgent)) browser = 'Firefox';
  else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
  else if (/chrome/i.test(userAgent)) browser = 'Chrome';

  const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  return { device, browser, os, userAgent, ipAddress };
}

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, targetExam = 'JEE', classLevel = '12', targetYear = 2026, dreamScore = 280 } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const id = `usr-${Date.now()}`;

    // First user or specific test emails can be admins
    const role = normalizedEmail.includes('admin') ? 'admin' : 'student';

    const newUser = new User({
      id,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role,
      targetExam,
      classLevel,
      targetYear,
      dreamScore,
      streakDays: 1,
      totalQuestionsSolved: 0,
      overallAccuracy: 0,
      testsCompleted: 0,
      studyTimeMinutes: 0
    });

    await newUser.save();

    // Create session
    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '30d' });
    const { device, browser, os, userAgent, ipAddress } = parseDeviceInfo(req);

    const session = new Session({
      id: `sess-${Date.now()}`,
      userId: newUser.id,
      token,
      deviceInfo: { device, browser, os },
      ipAddress,
      userAgent
    });
    await session.save();

    const userObj = newUser.toObject();
    delete userObj.passwordHash;
    delete userObj.otpCode;

    res.status(201).json({
      success: true,
      token,
      user: userObj,
      sessionId: session.id,
      message: 'Account created successfully.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (user.passwordHash) {
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }
    } else {
      // If user had no password yet (e.g. seeded), set password on first login
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(password, salt);
      await user.save();
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
    const { device, browser, os, userAgent, ipAddress } = parseDeviceInfo(req);

    const session = new Session({
      id: `sess-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: user.id,
      token,
      deviceInfo: { device, browser, os },
      ipAddress,
      userAgent
    });
    await session.save();

    const userObj = user.toObject();
    delete userObj.passwordHash;
    delete userObj.otpCode;

    res.json({
      success: true,
      token,
      user: userObj,
      sessionId: session.id,
      message: 'Logged in successfully.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/send-otp
router.post('/send-otp', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });

    // 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (!user) {
      // Auto-create basic profile if brand new email logging in via OTP
      user = new User({
        id: `usr-${Date.now()}`,
        name: normalizedEmail.split('@')[0],
        email: normalizedEmail,
        role: 'student',
        targetExam: 'JEE',
        classLevel: '12',
        otpCode: otp,
        otpExpires: expires
      });
    } else {
      user.otpCode = otp;
      user.otpExpires = expires;
    }

    await user.save();

    // In a production server with SMTP, this would email the user.
    // For reliable local and test usage, we return the code in response or console log it
    console.log(`[PREPORA AUTH] OTP for ${normalizedEmail}: ${otp}`);

    res.json({
      success: true,
      message: `OTP sent to ${normalizedEmail}. Valid for 10 minutes.`,
      debugOtp: process.env.NODE_ENV !== 'production' ? otp : undefined
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !user.otpCode || !user.otpExpires) {
      return res.status(400).json({ success: false, message: 'No OTP requested for this email or OTP expired.' });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }

    if (user.otpCode !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Incorrect OTP code.' });
    }

    // Clear used OTP
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
    const { device, browser, os, userAgent, ipAddress } = parseDeviceInfo(req);

    const session = new Session({
      id: `sess-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: user.id,
      token,
      deviceInfo: { device, browser, os },
      ipAddress,
      userAgent
    });
    await session.save();

    const userObj = user.toObject();
    delete userObj.passwordHash;
    delete userObj.otpCode;

    res.json({
      success: true,
      token,
      user: userObj,
      sessionId: session.id,
      message: 'Verified successfully.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      // Don't leak whether email exists
      return res.json({ success: true, message: 'If this email exists in our system, a password reset OTP was sent.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpCode = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    console.log(`[PREPORA AUTH] Password reset OTP for ${normalizedEmail}: ${otp}`);

    res.json({
      success: true,
      message: 'Password reset OTP sent to your email.',
      debugOtp: process.env.NODE_ENV !== 'production' ? otp : undefined
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !user.otpCode || !user.otpExpires) {
      return res.status(400).json({ success: false, message: 'Invalid request or OTP expired.' });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({ success: false, message: 'OTP has expired.' });
    }

    if (user.otpCode !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid OTP code.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully. You can now log in with your new password.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me - Authenticated user profile
router.get('/me', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const userObj = req.user!.toObject();
    delete userObj.passwordHash;
    delete userObj.otpCode;
    res.json({ success: true, user: userObj });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/auth/me - Update user profile
router.put('/me', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const allowedUpdates = [
      'name',
      'avatar',
      'targetExam',
      'classLevel',
      'targetYear',
      'dreamScore',
      'preferences',
      'streakDays',
      'totalQuestionsSolved',
      'overallAccuracy',
      'testsCompleted',
      'studyTimeMinutes'
    ];

    const updates: any = {};
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: req.user!.id },
      { $set: updates },
      { new: true }
    );

    const userObj = updatedUser!.toObject();
    delete userObj.passwordHash;
    delete userObj.otpCode;

    res.json({ success: true, user: userObj, message: 'Profile updated successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/sessions - List active sessions
router.get('/sessions', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await Session.find({ userId: req.user!.id, isRevoked: false }).sort({ lastActive: -1 });

    const formattedSessions = sessions.map(s => ({
      id: s.id,
      device: s.deviceInfo.device,
      browser: s.deviceInfo.browser,
      os: s.deviceInfo.os,
      ipAddress: s.ipAddress,
      lastActive: s.lastActive,
      createdAt: s.createdAt,
      isCurrent: s.token === req.token
    }));

    res.json({ success: true, sessions: formattedSessions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/revoke-session - Revoke a specific session
router.post('/revoke-session', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session ID required.' });
    }

    await Session.findOneAndUpdate(
      { id: sessionId, userId: req.user!.id },
      { $set: { isRevoked: true } }
    );

    res.json({ success: true, message: 'Session revoked successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/logout-other-devices - Revoke all other sessions
router.post('/logout-other-devices', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    await Session.updateMany(
      { userId: req.user!.id, token: { $ne: req.token }, isRevoked: false },
      { $set: { isRevoked: true } }
    );

    res.json({ success: true, message: 'Logged out from all other devices.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/logout - Logout current session
router.post('/logout', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    if (req.token) {
      await Session.findOneAndUpdate({ token: req.token }, { $set: { isRevoked: true } });
    }
    res.json({ success: true, message: 'Logged out successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
