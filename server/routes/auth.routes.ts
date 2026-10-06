import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { rateLimit } from '../middleware/rateLimit.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import User from '../models/User.js';
import Session from '../models/Session.js';
import StudentActivity from '../models/StudentActivity.js';
import LoginHistory from '../models/LoginHistory.js';
import { AuthorizedAdmin } from '../models/Admin.js';
import { JWT_SECRET, authenticateUser, AuthRequest, hashToken } from '../middleware/auth.js';
import { whatsappOTPService } from '../services/whatsappOTPService.js';
import { generateSecurePassword } from '../utils/passwordGenerator.js';

const router = express.Router();

const isDevEnv = process.env.NODE_ENV !== 'production';
const authLimiter = rateLimit(isDevEnv ? 60 : 12, 60 * 1000); // 12 attempts/min in prod
const otpLimiter = rateLimit(isDevEnv ? 40 : 6, 60 * 1000); // 6 OTP sends/min in prod

// Helper to parse device info from User-Agent
function parseDeviceInfo(req: Request) {
  const userAgent = req.headers['user-agent'] || '';
  let device = 'Desktop PC';
  let browser = 'Chrome';
  let os = 'Windows';

  if (/android/i.test(userAgent)) {
    device = 'Android Phone';
    os = 'Android';
  } else if (/iphone/i.test(userAgent)) {
    device = 'iPhone';
    os = 'iOS';
  } else if (/ipad/i.test(userAgent)) {
    device = 'iPad';
    os = 'iPadOS';
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

// Helper: Strictly SINGLE active authenticated session per student.
// When a student logs in on another phone/browser, all previous sessions are immediately revoked!
async function createSingleActiveSession(user: { id: string; studentId?: string; email: string; role: string }, req: Request) {
  const now = new Date();

  // Detect and revoke all prior active sessions for this student
  const activeSessions = await Session.find({ userId: user.id, isRevoked: false });
  if (activeSessions.length > 0) {
    await Session.updateMany(
      { userId: user.id, isRevoked: false },
      {
        $set: {
          isRevoked: true,
          status: 'REVOKED',
          revokedAt: now,
          revocationReason: 'NEW_LOGIN_ON_OTHER_DEVICE'
        }
      }
    );

    await LoginHistory.create({
      id: `lh-${Date.now()}-${randomBytes(3).toString('hex')}`,
      studentId: user.studentId || user.id,
      eventType: 'SESSION_REVOKED',
      reason: 'Revoked due to new login on another device or browser',
      timestamp: now
    }).catch(() => null);
  }

  const sessionId = `sess-${Date.now()}-${randomBytes(4).toString('hex')}`;
  const token = jwt.sign(
    { id: user.id, studentId: user.studentId || user.id, email: user.email, role: user.role, sessionId },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
  const { device, browser, os, userAgent, ipAddress } = parseDeviceInfo(req);

  const session = new Session({
    id: sessionId,
    sessionId,
    userId: user.id,
    studentId: user.studentId || user.id,
    token: hashToken(token),
    deviceInfo: { device, browser, os },
    ipAddress,
    userAgent,
    status: 'ACTIVE',
    isRevoked: false,
    lastActive: now,
    lastActiveAt: now
  });
  await session.save();

  // Update student's currentSessionId and lastLoginAt
  await User.findOneAndUpdate(
    { id: user.id },
    { $set: { currentSessionId: sessionId, lastLoginAt: now } }
  );

  // Log successful login to LoginHistory and StudentActivity
  await LoginHistory.create({
    id: `lh-${Date.now()}-${randomBytes(3).toString('hex')}`,
    studentId: user.studentId || user.id,
    eventType: 'LOGIN_SUCCESS',
    deviceInfo: { device, browser, os },
    userAgent,
    ipAddress,
    timestamp: now
  }).catch(() => null);

  await StudentActivity.create({
    id: `act-${Date.now()}-${randomBytes(3).toString('hex')}`,
    studentId: user.studentId || user.id,
    type: 'LOGIN',
    title: 'Student Logged In',
    description: `Signed in on ${device} (${browser})`
  }).catch(() => null);

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

// POST /api/auth/login - Mobile number OR email + password
router.post('/login', authLimiter, async (req: Request, res: Response) => {
  try {
    const { identifier, email, phone, password } = req.body;
    const raw = String(identifier || email || phone || '').trim();

    if (!raw || !password) {
      return res.status(400).json({ success: false, message: 'Mobile number/email and password are required.' });
    }

    const isPhone = /^\+?[0-9\s-]{8,15}$/.test(raw) || (!raw.includes('@') && /^\d+$/.test(raw));
    const normalizedPhone = isPhone ? raw.replace(/[^0-9]/g, '').slice(-10) : undefined;
    const normalizedEmail = !isPhone ? raw.toLowerCase().trim() : undefined;

    const user = normalizedPhone
      ? await User.findOne({ $or: [{ phone: normalizedPhone }, { email: `phone_${normalizedPhone}@prepora.student` }] })
      : await User.findOne({ email: normalizedEmail });

    // Explicit Super Admin Credentials check requested by owner (Email or Phone 7742735762)
    const isOwnerCredentials = 
      (normalizedEmail === 'maheshkumarsaini8769@gmail.com' || normalizedPhone === '7742735762') && 
      password === 'mahesh99830';

    if (isOwnerCredentials) {
      let adminUser = user;
      if (!adminUser) {
        adminUser = await User.findOne({
          $or: [
            { email: 'maheshkumarsaini8769@gmail.com' },
            { phone: '7742735762' },
            { id: 'usr_admin_mahesh' },
            { id: 'usr-admin-mahesh' }
          ]
        });
      }
      if (!adminUser) {
        adminUser = new User({
          id: 'usr_admin_mahesh',
          name: 'Mahesh Kumar (System Owner)',
          email: 'maheshkumarsaini8769@gmail.com',
          phone: '7742735762',
          role: 'admin',
          targetExam: 'JEE',
          classLevel: '12',
          targetYear: 2026,
          streakDays: 1,
          totalQuestionsSolved: 0,
          overallAccuracy: 0,
          testsCompleted: 0,
          studyTimeMinutes: 0
        });
      } else {
        adminUser.role = 'admin';
        adminUser.phone = '7742735762';
        adminUser.email = 'maheshkumarsaini8769@gmail.com';
      }

      if (mongoose.connection.readyState === 1) {
        try {
          const salt = await bcrypt.genSalt(10);
          adminUser.passwordHash = await bcrypt.hash('mahesh99830', salt);
          await adminUser.save();
        } catch (saveErr) {
          console.error('Error saving adminUser:', saveErr);
        }
      }

      const { token, session } = await createSingleActiveSession(adminUser, req);
      const userObj = adminUser.toObject ? adminUser.toObject() : { ...adminUser };
      delete (userObj as any).passwordHash;
      delete (userObj as any).otpCode;
      (userObj as any).role = 'admin';
      (userObj as any).hasPassword = true;

      return res.json({
        success: true,
        token,
        user: userObj,
        sessionId: session?.id,
        message: 'Super Admin logged in successfully.'
      });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid mobile number/email or password.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Yeh account ADMIN dwara BLOCK kar diya gaya hai. Aap is account se PREPORA me login nahi kar sakte.'
      });
    }

    if (!user.passwordHash) {
      // OTP-only account: password must be created after an OTP login, never guessed here
      return res.status(401).json({ success: false, message: 'Is account me password set nahi hai. Pehle OTP se login karein, phir password create karein.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const { token, session } = await createSingleActiveSession(user, req);

    const userObj = user.toObject();
    delete userObj.passwordHash;
    delete userObj.otpCode;
    (userObj as any).hasPassword = true;

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

// POST /api/auth/set-password - Create/update password for the logged-in user (after OTP login)
router.post('/set-password', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const { password } = req.body;

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate(
      { id: req.user!.id },
      { $set: { passwordHash } }
    );

    res.json({ success: true, message: 'Password saved. Ab aap password se directly login kar sakte hain.' });
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

// POST /api/auth/send-otp - WhatsApp OTP Dispatch
router.post('/send-otp', otpLimiter, async (req: Request, res: Response) => {
  try {
    const { email, phone, mobile, identifier } = req.body;
    const targetIdentifier = (mobile || phone || identifier || email || '').trim();

    if (!targetIdentifier) {
      return res.status(400).json({ success: false, message: 'Mobile number is required.' });
    }

    const cleanMobile = targetIdentifier.replace(/[^0-9]/g, '').slice(-10);
    if (!cleanMobile || cleanMobile.length !== 10) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number for WhatsApp verification.' });
    }

    // Check if mobile number is suspended/blocked by admin
    const blockedUser = await User.findOne({
      $or: [
        { mobile: cleanMobile },
        { phone: cleanMobile },
        { email: `phone_${cleanMobile}@prepora.student` }
      ]
    });
    if (blockedUser && blockedUser.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Yeh mobile number ADMIN dwara BLOCK kar diya gaya hai. Aap is number se PREPORA me login nahi kar sakte.'
      });
    }

    const result = await whatsappOTPService.sendOTP(cleanMobile);
    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message, cooldownSeconds: result.cooldownSeconds });
    }

    res.json({
      success: true,
      message: result.message,
      cooldownSeconds: result.cooldownSeconds,
      debugOtp: result.debugOtp || '9999',
      otp: result.otp || '9999'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/verify-otp - Verify WhatsApp OTP, create account & generate unique password for new student
router.post('/verify-otp', otpLimiter, async (req: Request, res: Response) => {
  try {
    const { email, phone, mobile, identifier, otp, name, targetExam = 'JEE', classLevel = '12', targetYear = 2026 } = req.body;
    const targetIdentifier = (mobile || phone || identifier || email || '').trim();

    if (!targetIdentifier || !otp) {
      return res.status(400).json({ success: false, message: 'Mobile number and OTP are required.' });
    }

    const cleanMobile = targetIdentifier.replace(/[^0-9]/g, '').slice(-10);
    if (!cleanMobile || cleanMobile.length !== 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required.' });
    }

    const verifyResult = whatsappOTPService.verifyOTP(cleanMobile, otp);
    if (!verifyResult.success) {
      return res.status(400).json({ success: false, message: verifyResult.message });
    }

    let user = await User.findOne({
      $or: [
        { mobile: cleanMobile },
        { phone: cleanMobile },
        { email: `phone_${cleanMobile}@prepora.student` }
      ]
    });

    if (user && user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Yeh mobile number ADMIN dwara BLOCK kar diya gaya hai. Aap is number se PREPORA me login nahi kar sakte.'
      });
    }

    let generatedPassword = '';
    let isNewUser = false;

    const canonicalExam = targetExam === 'NEET' ? 'NEET_UG' : targetExam === 'CBSE' ? 'CBSE' : targetExam === 'RBSE' ? 'RBSE' : 'JEE_MAIN';
    const activeSubjects = targetExam === 'NEET' ? ['PHYSICS', 'CHEMISTRY', 'BIOLOGY'] : ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'];

    if (!user) {
      // First-time registration:
      // Automatically create student account, generate unique cryptographically secure password
      isNewUser = true;
      generatedPassword = generateSecurePassword(10);
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(generatedPassword, salt);
      const studentId = `STU_${Date.now().toString(36).toUpperCase()}${randomBytes(2).toString('hex').toUpperCase()}`;
      const assignedEmail = `phone_${cleanMobile}@prepora.student`;

      user = new User({
        id: studentId,
        studentId,
        name: name ? name.trim() : `Student ${cleanMobile.slice(-4)}`,
        email: assignedEmail,
        phone: cleanMobile,
        mobile: cleanMobile,
        passwordHash,
        whatsappVerified: true,
        role: 'student',
        targetExam,
        classLevel,
        targetYear: Number(targetYear) || 2026,
        streakDays: 1,
        totalQuestionsSolved: 0,
        overallAccuracy: 0,
        testsCompleted: 0,
        studyTimeMinutes: 0,
        preparationProfile: {
          preparationType: targetExam,
          exam: canonicalExam,
          classLevel,
          subjects: activeSubjects,
          onboardingCompleted: true,
          targetYear: Number(targetYear) || 2026
        }
      });
      await user.save();
    } else {
      // Existing student: mark WhatsApp verified
      user.whatsappVerified = true;
      if (!user.mobile) user.mobile = cleanMobile;
      if (!user.phone) user.phone = cleanMobile;
      if (name && (!user.name || user.name.startsWith('Student '))) user.name = name.trim();

      // If existing user had no password yet, generate and save one
      if (!user.passwordHash) {
        generatedPassword = generateSecurePassword(10);
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(generatedPassword, salt);
        isNewUser = true;
      }
      await user.save();
    }

    // Create strictly single active session (revokes any previous session on another device/browser)
    const { token, session } = await createSingleActiveSession(user, req);

    const userObj = user.toObject();
    delete userObj.passwordHash;
    delete userObj.otpCode;
    (userObj as any).hasPassword = true;

    res.json({
      success: true,
      isNewUser,
      generatedPassword: generatedPassword || undefined,
      token,
      user: userObj,
      sessionId: session.id,
      message: isNewUser
        ? 'Account created successfully! Save your unique password safely.'
        : 'Logged in successfully.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/change-password - Change password from Settings (authenticated)
router.post('/change-password', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'New password and confirm password do not match.' });
    }

    const user = await User.findOne({ id: req.user!.id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.passwordHash) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: 'Current password is required.' });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    user.passwordHash = passwordHash;
    user.currentSessionId = undefined; // Invalidate active session
    await user.save();

    // Revoke all existing sessions so a fresh login is required
    await Session.updateMany(
      { userId: user.id },
      { $set: { isRevoked: true, status: 'REVOKED', revokedAt: new Date(), revocationReason: 'PASSWORD_CHANGED' } }
    );

    await StudentActivity.create({
      id: `act_${Date.now()}_${randomBytes(3).toString('hex')}`,
      studentId: user.studentId || user.id,
      type: 'PASSWORD_CHANGED',
      title: 'Password Changed',
      description: 'Account password updated from settings. All prior sessions revoked.'
    }).catch(() => null);

    res.json({
      success: true,
      message: 'Password changed successfully. Please log in again.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/forgot-password/send-otp - Dispatch WhatsApp OTP for password recovery
router.post('/forgot-password/send-otp', otpLimiter, async (req: Request, res: Response) => {
  try {
    const { mobile, phone } = req.body;
    const cleanMobile = String(mobile || phone || '').replace(/[^0-9]/g, '').slice(-10);

    if (!cleanMobile || cleanMobile.length !== 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required.' });
    }

    const existingUser = await User.findOne({
      $or: [{ mobile: cleanMobile }, { phone: cleanMobile }, { email: `phone_${cleanMobile}@prepora.student` }]
    });
    if (existingUser && existingUser.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Yeh mobile number ADMIN dwara BLOCK kar diya gaya hai. Aap is number se password reset nahi kar sakte.'
      });
    }

    const result = await whatsappOTPService.sendOTP(cleanMobile);
    res.json({
      success: result.success,
      message: result.message || 'If this mobile is registered, a WhatsApp OTP has been sent.',
      cooldownSeconds: result.cooldownSeconds || 60,
      debugOtp: result.debugOtp || '9999',
      otp: result.otp || '9999'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/forgot-password/verify-reset - Verify WhatsApp OTP and set new password
router.post('/forgot-password/verify-reset', authLimiter, async (req: Request, res: Response) => {
  try {
    const { mobile, phone, otp, newPassword } = req.body;
    const cleanMobile = String(mobile || phone || '').replace(/[^0-9]/g, '').slice(-10);

    if (!cleanMobile || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Mobile number, OTP, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' });
    }

    const verifyResult = whatsappOTPService.verifyOTP(cleanMobile, otp);
    if (!verifyResult.success) {
      return res.status(400).json({ success: false, message: verifyResult.message });
    }

    const user = await User.findOne({
      $or: [{ mobile: cleanMobile }, { phone: cleanMobile }, { email: `phone_${cleanMobile}@prepora.student` }]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No registered student found with this mobile number.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Yeh mobile number ADMIN dwara BLOCK kar diya gaya hai. Aap is number se password reset nahi kar sakte.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.currentSessionId = undefined;
    await user.save();

    // Revoke all prior sessions
    await Session.updateMany(
      { userId: user.id },
      { $set: { isRevoked: true, status: 'REVOKED', revokedAt: new Date(), revocationReason: 'PASSWORD_CHANGED' } }
    );

    res.json({
      success: true,
      message: 'Password reset successfully. Please log in with your new password.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', authLimiter, async (req: Request, res: Response) => {
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
    (userObj as any).hasPassword = !!req.user!.passwordHash;
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
    const now = new Date();
    if (req.token) {
      await Session.findOneAndUpdate(
        { token: hashToken(req.token) },
        { $set: { isRevoked: true, status: 'REVOKED', revokedAt: now, revocationReason: 'USER_LOGOUT' } }
      );
    }

    if (req.user) {
      await User.findOneAndUpdate(
        { id: req.user.id },
        { $set: { currentSessionId: null, lastLogoutAt: now } }
      );

      await LoginHistory.create({
        id: `lh-${Date.now()}-${randomBytes(3).toString('hex')}`,
        studentId: req.user.studentId || req.user.id,
        eventType: 'LOGOUT',
        reason: 'User logged out',
        timestamp: now
      }).catch(() => null);

      await StudentActivity.create({
        id: `act-${Date.now()}-${randomBytes(3).toString('hex')}`,
        studentId: req.user.studentId || req.user.id,
        type: 'LOGOUT',
        title: 'Student Logged Out',
        description: 'Session ended'
      }).catch(() => null);
    }

    res.json({ success: true, message: 'Logged out successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
