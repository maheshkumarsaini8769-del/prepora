import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Session from '../models/Session.js';
import { AuthorizedAdmin } from '../models/Admin.js';
import { JWT_SECRET, authenticateUser, AuthRequest, hashToken } from '../middleware/auth.js';

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

// Helper: Ensure single active device/session lock per account.
// When an account is logged in on a phone or laptop, any previous active session is automatically revoked.
async function createSingleActiveSession(user: { id: string; email: string; role: string }, req: Request) {
  // Revoke all existing active sessions for this user on any other phone, laptop, or browser
  await Session.updateMany(
    { userId: user.id, isRevoked: false },
    { $set: { isRevoked: true, revocationReason: 'LOGGED_IN_ON_ANOTHER_DEVICE' } }
  );

  const sessionId = `sess-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, sessionId },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
  const { device, browser, os, userAgent, ipAddress } = parseDeviceInfo(req);

  const session = new Session({
    id: sessionId,
    userId: user.id,
    token: hashToken(token),
    deviceInfo: { device, browser, os },
    ipAddress,
    userAgent
  });
  await session.save();

  return { token, session };
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

    // Admin role only via AuthorizedAdmin collection or OAuth owner check — never by email substring
    const role = 'student';

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

    // Create single active session
    const { token, session } = await createSingleActiveSession(newUser, req);

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

    const { token, session } = await createSingleActiveSession(user, req);

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

// POST /api/auth/demo - Quick Demo Session with real signed JWT & Session lock
router.post('/demo', async (req: Request, res: Response) => {
  try {
    const { role = 'student' } = req.body;
    const isAdm = role === 'admin';
    const email = isAdm ? 'maheshkumarsaini8769@gmail.com' : 'aman.sharma@example.com';
    const name = isAdm ? 'Mahesh Kumar (System Owner)' : 'Aman Sharma';

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        id: isAdm ? 'usr_admin_mahesh' : 'usr_default_aman',
        name,
        email,
        role: isAdm ? 'admin' : 'student',
        targetExam: 'JEE',
        classLevel: '12',
        targetYear: 2026,
        dreamScore: 280,
        status: 'active'
      });
      await user.save();
    } else {
      if (isAdm && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }
    }

    const { token, session } = await createSingleActiveSession(user, req);

    const userObj = user.toObject();
    delete userObj.passwordHash;
    delete userObj.otpCode;

    res.json({
      success: true,
      token,
      user: userObj,
      sessionId: session.id,
      message: `${isAdm ? 'Admin' : 'Student'} demo session created.`
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/zenuxs - Zenuxs OAuth 2.0 Single Sign-On
router.post('/zenuxs', async (req: Request, res: Response) => {
  try {
    const { sub, email, name, picture, targetExam = 'JEE', classLevel = '12' } = req.body;

    if (!email && !sub) {
      return res.status(400).json({ success: false, message: 'Zenuxs user identifier or email is required.' });
    }

    // Basic server-side email validation (Fix 7)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
      }
    }

    const normalizedEmail = email ? email.toLowerCase().trim() : `zenuxs_${sub}@zenuxs.user`;

    // Find existing user by zenuxsId OR email
    let user = await User.findOne({
      $or: [
        ...(sub ? [{ zenuxsId: sub }] : []),
        { email: normalizedEmail }
      ]
    });

    const isOwner = normalizedEmail === 'maheshkumarsaini8769@gmail.com' || normalizedEmail === 'admin@prepora.com';
    let hasAdminAuthority = isOwner;
    if (!hasAdminAuthority) {
      const authDoc = await AuthorizedAdmin.findOne({ email: normalizedEmail });
      if (authDoc) hasAdminAuthority = true;
    }

    if (user) {
      // Existing student/admin: link zenuxsId if missing, update avatar/name if provided
      if (sub && !user.zenuxsId) user.zenuxsId = sub;
      if (picture && !user.avatar) user.avatar = picture;
      if (name && (!user.name || user.name.startsWith('usr-'))) user.name = name;
      if (hasAdminAuthority) user.role = 'admin';
      await user.save();
    } else {
      // New user: create user profile
      const id = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      user = new User({
        id,
        name: name ? name.trim() : normalizedEmail.split('@')[0],
        email: normalizedEmail,
        zenuxsId: sub,
        avatar: picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
        role: hasAdminAuthority ? 'admin' : 'student',
        targetExam,
        classLevel,
        targetYear: 2026,
        dreamScore: 280,
        streakDays: 1,
        totalQuestionsSolved: 0,
        overallAccuracy: 0,
        testsCompleted: 0,
        studyTimeMinutes: 0
      });
      await user.save();
    }

    const { token, session } = await createSingleActiveSession(user, req);

    const userObj = user.toObject();
    delete userObj.passwordHash;
    delete userObj.otpCode;

    res.json({
      success: true,
      token,
      user: userObj,
      sessionId: session.id,
      message: 'Logged in successfully via Zenuxs OAuth.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/send-otp
router.post('/send-otp', async (req: Request, res: Response) => {
  try {
    const { email, phone, identifier } = req.body;
    const targetIdentifier = (identifier || phone || email || '').trim();

    if (!targetIdentifier) {
      return res.status(400).json({ success: false, message: 'Phone number or email is required.' });
    }

    const isPhone = /^\+?[0-9\s-]{8,15}$/.test(targetIdentifier) || (!targetIdentifier.includes('@') && /^\d+$/.test(targetIdentifier));
    const normalizedPhone = isPhone ? targetIdentifier.replace(/[^0-9]/g, '').slice(-10) : undefined;
    const normalizedEmail = !isPhone ? targetIdentifier.toLowerCase().trim() : undefined;

    let user = null;
    if (normalizedPhone) {
      user = await User.findOne({ $or: [{ phone: normalizedPhone }, { email: `phone_${normalizedPhone}@prepora.student` }] });
    } else if (normalizedEmail) {
      user = await User.findOne({ email: normalizedEmail });
    }

    // Set demo OTP to 9999 per configuration
    const otp = '9999';
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    if (!user) {
      // Pre-create user stub so OTP is stored
      const id = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      user = new User({
        id,
        name: normalizedPhone ? `Student ${normalizedPhone.slice(-4)}` : (normalizedEmail?.split('@')[0] || 'Student'),
        email: normalizedEmail || `phone_${normalizedPhone}@prepora.student`,
        phone: normalizedPhone,
        role: 'student',
        targetExam: 'JEE',
        classLevel: '12',
        targetYear: 2026,
        otpCode: otp,
        otpExpires: expires
      });
    } else {
      user.otpCode = otp;
      user.otpExpires = expires;
    }

    await user.save();

    console.log(`[PREPORA AUTH] Demo OTP for ${normalizedPhone || normalizedEmail}: ${otp}`);

    res.json({
      success: true,
      message: `Demo OTP sent successfully. Use OTP: ${otp}`,
      otp,
      debugOtp: otp
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req: Request, res: Response) => {
  try {
    const { email, phone, identifier, otp, name, targetExam = 'JEE', classLevel = '12', targetYear = 2026 } = req.body;
    const targetIdentifier = (identifier || phone || email || '').trim();

    if (!targetIdentifier || !otp) {
      return res.status(400).json({ success: false, message: 'Phone/Email and OTP are required.' });
    }

    const isPhone = /^\+?[0-9\s-]{8,15}$/.test(targetIdentifier) || (!targetIdentifier.includes('@') && /^\d+$/.test(targetIdentifier));
    const normalizedPhone = isPhone ? targetIdentifier.replace(/[^0-9]/g, '').slice(-10) : undefined;
    const normalizedEmail = !isPhone ? targetIdentifier.toLowerCase().trim() : (email ? email.toLowerCase().trim() : undefined);

    let user = null;
    if (normalizedPhone) {
      user = await User.findOne({ $or: [{ phone: normalizedPhone }, { email: `phone_${normalizedPhone}@prepora.student` }] });
    } else if (normalizedEmail) {
      user = await User.findOne({ email: normalizedEmail });
    }

    // Demo OTP check: accept '9999' or matching user.otpCode
    const isValidOtp = otp.trim() === '9999' || (user && user.otpCode === otp.trim() && user.otpExpires && new Date() <= user.otpExpires);

    if (!isValidOtp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP code. Please use demo OTP: 9999.' });
    }

    const canonicalExam = targetExam === 'NEET' ? 'NEET_UG' : targetExam === 'CBSE' ? 'CBSE' : targetExam === 'RBSE' ? 'RBSE' : 'JEE_MAIN';
    const activeSubjects = targetExam === 'NEET' ? ['PHYSICS', 'CHEMISTRY', 'BIOLOGY'] : ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'];

    if (!user) {
      // Auto-create student user upon verified demo OTP
      const id = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const assignedEmail = normalizedEmail || `phone_${normalizedPhone}@prepora.student`;
      user = new User({
        id,
        name: name ? name.trim() : (normalizedPhone ? `Student ${normalizedPhone.slice(-4)}` : assignedEmail.split('@')[0]),
        email: assignedEmail,
        phone: normalizedPhone,
        role: 'student',
        targetExam,
        classLevel,
        targetYear: Number(targetYear) || 2026,
        streakDays: 12,
        totalQuestionsSolved: 140,
        overallAccuracy: 68,
        preparationProfile: {
          preparationType: targetExam,
          exam: canonicalExam,
          classLevel,
          subjects: activeSubjects,
          onboardingCompleted: true,
          targetYear: Number(targetYear) || 2026
        }
      });
    } else {
      // Update target exam & class choices if supplied
      if (targetExam) user.targetExam = targetExam;
      if (classLevel) user.classLevel = classLevel;
      if (targetYear) user.targetYear = Number(targetYear);
      if (normalizedPhone && !user.phone) user.phone = normalizedPhone;
      if (name && (!user.name || user.name.startsWith('Student '))) user.name = name.trim();
      
      if (!user.preparationProfile || !user.preparationProfile.onboardingCompleted) {
        user.preparationProfile = {
          preparationType: targetExam,
          exam: canonicalExam,
          classLevel,
          subjects: activeSubjects,
          onboardingCompleted: true,
          targetYear: Number(targetYear) || 2026
        };
      }
      user.otpCode = undefined;
      user.otpExpires = undefined;
    }

    await user.save();

    const { token, session } = await createSingleActiveSession(user, req);

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
      'preparationProfile',
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
      isCurrent: s.token === hashToken(req.token!)
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
      { userId: req.user!.id, token: { $ne: hashToken(req.token!) }, isRevoked: false },
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
      await Session.findOneAndUpdate({ token: hashToken(req.token) }, { $set: { isRevoked: true } });
    }
    res.json({ success: true, message: 'Logged out successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
