import express, { Request, Response } from 'express';
import StudentFeedback from '../models/StudentFeedback.js';
import AuditLog from '../models/AuditLog.js';
import User from '../models/User.js';
import Session from '../models/Session.js';
import LoginHistory from '../models/LoginHistory.js';
import { randomBytes } from 'crypto';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// In-memory fallback buffer in case MongoDB experiences temporary latency or downtime
interface InMemoryFeedback {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  type: 'SUGGESTION' | 'MISTAKE' | 'GENERAL';
  category: string;
  title: string;
  description: string;
  pageUrl: string;
  screenshotUrl: string;
  status: 'Pending' | 'In Review' | 'Resolved' | 'Rejected';
  adminNotes: string;
  adminReply: string;
  adminEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const fallbackFeedbacks: InMemoryFeedback[] = [];

// Helper to record audit log
async function recordAudit(
  adminEmail: string,
  action: string,
  entityType: 'Report' | 'Question' | 'System',
  entityId: string,
  beforeVal: any,
  afterVal: any,
  metadata: any = {}
) {
  try {
    const log = new AuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      adminId: 'admin',
      adminEmail: adminEmail || 'admin@prepora.internal',
      adminRole: 'admin',
      action,
      entityType,
      entityId,
      beforeValue: beforeVal,
      afterValue: afterVal,
      metadata
    });
    await log.save();
  } catch (err) {
    console.error('[FeedbackAuditLog] Error recording audit:', err);
  }
}

// Flush fallback items to MongoDB when DB is accessible
async function syncFallbackFeedbacksToDB() {
  if (fallbackFeedbacks.length === 0) return;
  try {
    const toSync = [...fallbackFeedbacks];
    for (const item of toSync) {
      const exists = await StudentFeedback.findOne({ id: item.id }).catch(() => null);
      if (!exists) {
        await new StudentFeedback(item).save().catch(() => null);
      }
    }
  } catch {
    // Non-fatal, will retry later
  }
}

// -------------------------------------------------------------
// POST /api/feedback - Student submits suggestion or mistake report
// -------------------------------------------------------------
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      type = 'SUGGESTION',
      category = 'General',
      userId = 'anonymous',
      userName,
      studentName,
      userEmail,
      email,
      userPhone,
      studentPhone,
      phone,
      pageUrl = '',
      screenshotUrl = ''
    } = req.body;

    if (!title || !title.trim() || !description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required.'
      });
    }

    const resolvedName = (userName || studentName || 'Student').trim();
    const resolvedPhone = (userPhone || studentPhone || phone || '').trim();
    const resolvedEmail = (userEmail || email || '').trim();
    const resolvedType = ['SUGGESTION', 'MISTAKE', 'GENERAL'].includes(type) ? type : 'SUGGESTION';
    const resolvedCategory = (category || 'General').trim();
    const feedbackId = `fb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const feedbackDoc: InMemoryFeedback = {
      id: feedbackId,
      userId: userId || 'anonymous',
      userName: resolvedName,
      userEmail: resolvedEmail,
      userPhone: resolvedPhone,
      type: resolvedType as 'SUGGESTION' | 'MISTAKE' | 'GENERAL',
      category: resolvedCategory,
      title: title.trim(),
      description: description.trim(),
      pageUrl: pageUrl || '',
      screenshotUrl: screenshotUrl || '',
      status: 'Pending',
      adminNotes: '',
      adminReply: '',
      adminEmail: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let savedFeedback: any = feedbackDoc;

    try {
      const modelInstance = new StudentFeedback(feedbackDoc);
      savedFeedback = await modelInstance.save();
    } catch (dbErr: any) {
      console.warn('[Feedback] DB save failed, saving to in-memory fallback:', dbErr.message);
      fallbackFeedbacks.push(feedbackDoc);
      savedFeedback = feedbackDoc;
    }

    // Attempt background sync of previously stored fallback items
    syncFallbackFeedbacksToDB().catch(() => null);

    return res.status(201).json({
      success: true,
      feedback: savedFeedback,
      message: 'Feedback submitted successfully! Our team will review it soon.'
    });
  } catch (error: any) {
    console.error('[Feedback] Unexpected error submitting feedback:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while submitting feedback.'
    });
  }
});

// -------------------------------------------------------------
// GET /api/feedback - List feedbacks (Admin & Filter Support)
// -------------------------------------------------------------
router.get('/', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status, type, category, search, page = '1', limit = '50' } = req.query;

    const filter: any = {};
    if (status && status !== 'All') filter.status = status;
    if (type && type !== 'All') filter.type = type;
    if (category && category !== 'All') filter.category = category;

    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { userName: searchRegex },
        { userEmail: searchRegex },
        { userPhone: searchRegex }
      ];
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = Math.min(parseInt(limit as string, 10) || 50, 100);

    let feedbacks: any[] = [];
    let total = 0;

    try {
      feedbacks = await StudentFeedback.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);
      total = await StudentFeedback.countDocuments(filter);
    } catch (dbErr: any) {
      console.warn('[Feedback] DB query failed, falling back to in-memory list:', dbErr.message);
      // Filter in-memory fallback
      feedbacks = fallbackFeedbacks.filter((fb) => {
        if (filter.status && fb.status !== filter.status) return false;
        if (filter.type && fb.type !== filter.type) return false;
        if (filter.category && fb.category !== filter.category) return false;
        return true;
      });
      total = feedbacks.length;
    }

    // Merge any pending fallback feedbacks not present in the returned list
    const returnedIds = new Set(feedbacks.map((f: any) => f.id));
    for (const fb of fallbackFeedbacks) {
      if (!returnedIds.has(fb.id)) {
        feedbacks.unshift(fb);
      }
    }

    return res.json({
      success: true,
      feedbacks,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// GET /api/feedback/mine - Retrieve feedbacks submitted by student
// -------------------------------------------------------------
router.get('/mine', async (req: Request, res: Response) => {
  try {
    const { userId, phone } = req.query;
    if (!userId && !phone) {
      return res.status(400).json({ success: false, message: 'userId or phone is required' });
    }

    const filter: any = { $or: [] };
    if (userId) filter.$or.push({ userId });
    if (phone) {
      const clean = (phone as string).replace(/[^0-9]/g, '').slice(-10);
      filter.$or.push({ userPhone: new RegExp(clean) });
    }

    const feedbacks = await StudentFeedback.find(filter)
      .sort({ createdAt: -1 })
      .limit(20)
      .catch(() => []);

    return res.json({ success: true, feedbacks });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// PATCH /api/feedback/:id - Admin update or reply
// -------------------------------------------------------------
router.patch('/:id', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status, adminNotes, adminReply, adminEmail } = req.body;

    let existing = await StudentFeedback.findOne({ id: req.params.id }).catch(() => null);
    if (!existing) {
      // Check in-memory
      const inMem = fallbackFeedbacks.find((f) => f.id === req.params.id);
      if (!inMem) {
        return res.status(404).json({ success: false, message: 'Feedback entry not found.' });
      }
      existing = inMem as any;
    }

    const updates: any = {};
    if (status) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;
    if (adminReply !== undefined) {
      updates.adminReply = adminReply;
      updates.repliedAt = new Date();
      updates.adminEmail = adminEmail || 'admin@prepora.internal';
      if (!status) updates.status = 'Resolved';
    }
    if (updates.status === 'Resolved' && !existing.resolvedAt) {
      updates.resolvedAt = new Date();
    }

    let updated: any = null;
    try {
      updated = await StudentFeedback.findOneAndUpdate(
        { id: req.params.id },
        { $set: updates },
        { new: true }
      );
    } catch {
      // Update in-memory
      const idx = fallbackFeedbacks.findIndex((f) => f.id === req.params.id);
      if (idx !== -1) {
        fallbackFeedbacks[idx] = { ...fallbackFeedbacks[idx], ...updates, updatedAt: new Date() };
        updated = fallbackFeedbacks[idx];
      }
    }

    if (!updated) {
      updated = { ...existing, ...updates };
    }

    await recordAudit(
      adminEmail || 'admin@prepora.internal',
      adminReply
        ? 'Reply to Student Feedback'
        : updates.status === 'Resolved'
        ? 'Resolve Student Feedback'
        : 'Update Student Feedback',
      'Report',
      req.params.id,
      existing,
      updated,
      { replyContent: adminReply }
    );

    return res.json({ success: true, feedback: updated, message: 'Feedback updated successfully!' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// POST /api/feedback/:id/block-student - 1-Click block student
// -------------------------------------------------------------
router.post('/:id/block-student', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      reason = 'Misconduct / Abuse reported in Student Feedback',
      adminEmail = 'admin@prepora.internal'
    } = req.body;

    let feedback = await StudentFeedback.findOne({ id: req.params.id }).catch(() => null);
    if (!feedback) {
      feedback = fallbackFeedbacks.find((f) => f.id === req.params.id) as any;
      if (!feedback) {
        return res.status(404).json({ success: false, message: 'Feedback entry not found.' });
      }
    }

    const now = new Date();
    const cleanMobile = feedback.userPhone ? feedback.userPhone.replace(/[^0-9]/g, '').slice(-10) : '';

    let user: any = null;
    if (cleanMobile && cleanMobile.length === 10) {
      user = await User.findOne({
        $or: [
          { mobile: cleanMobile },
          { phone: cleanMobile },
          { email: `phone_${cleanMobile}@prepora.student` }
        ]
      }).catch(() => null);
    }

    if (!user && feedback.userId && feedback.userId !== 'anonymous') {
      user = await User.findOne({
        $or: [{ id: feedback.userId }, { studentId: feedback.userId }]
      }).catch(() => null);
    }

    if (user) {
      user.status = 'suspended';
      user.currentSessionId = undefined;
      user.lastLogoutAt = now;
      await user.save().catch(() => null);

      await Session.updateMany(
        { userId: user.id, isRevoked: false },
        {
          $set: {
            isRevoked: true,
            status: 'REVOKED',
            revokedAt: now,
            revocationReason: 'STUDENT_SUSPENDED_BY_ADMIN'
          }
        }
      ).catch(() => null);

      await LoginHistory.create({
        id: `lh-${Date.now()}-${randomBytes(3).toString('hex')}`,
        studentId: user.studentId || user.id,
        eventType: 'FORCE_LOGOUT',
        reason: `Account suspended & phone blocked by Admin (${adminEmail}): ${reason}`,
        timestamp: now
      }).catch(() => null);
    } else if (cleanMobile && cleanMobile.length === 10) {
      const id = `usr-blocked-${cleanMobile}`;
      user = new User({
        id,
        studentId: `BLK_${cleanMobile}`,
        name: feedback.userName ? `Blocked (${feedback.userName})` : `Blocked User (${cleanMobile})`,
        email: `phone_${cleanMobile}@prepora.student`,
        mobile: cleanMobile,
        phone: cleanMobile,
        role: 'student',
        status: 'suspended',
        classLevel: '12',
        targetExam: 'JEE',
        targetYear: 2026,
        streakDays: 0,
        totalQuestionsSolved: 0,
        overallAccuracy: 0,
        testsCompleted: 0,
        studyTimeMinutes: 0
      });
      await user.save().catch(() => null);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Could not find a valid mobile number or user ID to block for this feedback.'
      });
    }

    feedback.status = 'Rejected';
    feedback.adminNotes = `[STUDENT BLOCKED by ${adminEmail} on ${now.toLocaleString()}]: ${reason}`;
    if (typeof feedback.save === 'function') {
      await feedback.save().catch(() => null);
    }

    await recordAudit(adminEmail, 'Block Student From Feedback', 'Report', feedback.id, null, {
      studentId: user.studentId || user.id,
      mobile: cleanMobile,
      reason
    });

    return res.json({
      success: true,
      message: `Student (${cleanMobile || user.name}) has been permanently suspended & blocked.`
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
