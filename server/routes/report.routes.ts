import express, { Request, Response } from 'express';
import { QuestionReport } from '../models/Entities.js';
import TechnicalReport from '../models/TechnicalReport.js';
import StudentFeedback from '../models/StudentFeedback.js';
import Question from '../models/Question.js';
import AuditLog from '../models/AuditLog.js';
import User from '../models/User.js';
import Session from '../models/Session.js';
import LoginHistory from '../models/LoginHistory.js';
import { randomBytes } from 'crypto';
import { authenticateUser, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

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
    console.error('AuditLog error:', err);
  }
}

// -------------------------------------------------------------
// QUESTION REPORTS (Student Reporting & Admin Review)
// -------------------------------------------------------------

// POST /api/reports/question - Student reports a question
router.post('/question', async (req: Request, res: Response) => {
  try {
    const { questionId, reason, message, userId = 'anonymous', userEmail } = req.body;

    if (!questionId || !reason) {
      return res.status(400).json({ success: false, message: 'Question ID and Reason are required.' });
    }

    const report = new QuestionReport({
      id: `qr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      userEmail,
      questionId,
      reason,
      message: message || '',
      status: 'Pending'
    });

    await report.save();

    res.status(201).json({
      success: true,
      report,
      message: 'Question report submitted successfully. Our academic team will review it.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reports/question - List question reports (Admin)
router.get('/question', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status, reason, questionId, page = '1', limit = '50' } = req.query;

    const filter: any = {};
    if (status && status !== 'All') filter.status = status;
    if (reason && reason !== 'All') filter.reason = reason;
    if (questionId) filter.questionId = questionId;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = Math.min(parseInt(limit as string, 10) || 50, 100);

    const reports = await QuestionReport.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const total = await QuestionReport.countDocuments(filter);

    // Populate question details for each report
    const questionIds = Array.from(new Set(reports.map(r => r.questionId)));
    const questions = await Question.find({ id: { $in: questionIds } });
    const qMap = new Map(questions.map(q => [q.id, q]));

    const enrichedReports = reports.map(r => ({
      ...r.toObject(),
      questionDetails: qMap.get(r.questionId) || null
    }));

    res.json({
      success: true,
      reports: enrichedReports,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/reports/question/:id - Review, edit question or resolve report (Admin)
router.patch('/question/:id', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status, adminNotes, adminEmail, correctedAnswer, correctedExplanation } = req.body;

    const existing = await QuestionReport.findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Question report not found.' });
    }

    const updates: any = {};
    if (status) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;
    if (status === 'Resolved') updates.resolvedAt = new Date();

    const updatedReport = await QuestionReport.findOneAndUpdate(
      { id: req.params.id },
      { $set: updates },
      { new: true }
    );

    // If admin corrected the question directly in this review flow
    if (correctedAnswer !== undefined || correctedExplanation !== undefined) {
      const qUpdates: any = {};
      if (correctedAnswer !== undefined) qUpdates.correctAnswer = correctedAnswer;
      if (correctedExplanation !== undefined) qUpdates.explanation = correctedExplanation;

      await Question.findOneAndUpdate({ id: existing.questionId }, { $set: qUpdates });

      await recordAudit(
        adminEmail || 'admin@prepora.internal',
        'Review & Edit Question',
        'Question',
        existing.questionId,
        null,
        qUpdates,
        { reportId: existing.id }
      );
    }

    await recordAudit(
      adminEmail || 'admin@prepora.internal',
      status === 'Resolved' ? 'Resolve Report' : status === 'Rejected' ? 'Reject Report' : 'Review Report',
      'Report',
      existing.id,
      existing.toObject(),
      updatedReport!.toObject()
    );

    res.json({
      success: true,
      report: updatedReport,
      message: `Report status updated to ${status || updatedReport!.status}.`
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// TECHNICAL REPORTS (Diagnostics & Error Reporting)
// -------------------------------------------------------------

// POST /api/reports/technical - Student reports a technical bug
router.post('/technical', async (req: Request, res: Response) => {
  try {
    const {
      reason,
      description,
      screenshotUrl,
      route = '/',
      testId,
      questionId,
      userId = 'anonymous',
      userEmail,
      context = {}
    } = req.body;

    if (!reason || !description) {
      return res.status(400).json({ success: false, message: 'Reason and description are required.' });
    }

    // Auto-derive severity based on issue reason
    let severity: 'Low' | 'Medium' | 'High' | 'Critical' = 'Medium';
    if (reason === 'Test submission failed' || reason === 'Payment problem') {
      severity = 'Critical';
    } else if (reason === 'Timer problem' || reason === 'Page not loading') {
      severity = 'High';
    }

    const techReport = new TechnicalReport({
      id: `tr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      userEmail,
      reason,
      description,
      screenshotUrl,
      route,
      testId,
      questionId,
      context: {
        browser: context.browser || 'Unknown',
        os: context.os || 'Unknown',
        deviceType: context.deviceType || 'Desktop',
        appVersion: context.appVersion || '1.0.0',
        userAgent: req.headers['user-agent'] || '',
        timestamp: new Date().toISOString(),
        errorId: context.errorId || `err-${Date.now()}`
      },
      severity,
      status: 'Open'
    });

    await techReport.save();

    res.status(201).json({
      success: true,
      report: techReport,
      message: 'Technical problem reported. Our team will investigate immediately.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reports/technical - List technical reports (Admin)
router.get('/technical', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status, severity, reason, page = '1', limit = '50' } = req.query;

    const filter: any = {};
    if (status && status !== 'All') filter.status = status;
    if (severity && severity !== 'All') filter.severity = severity;
    if (reason && reason !== 'All') filter.reason = reason;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = Math.min(parseInt(limit as string, 10) || 50, 100);

    const reports = await TechnicalReport.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const total = await TechnicalReport.countDocuments(filter);

    res.json({
      success: true,
      reports,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/reports/technical/:id - Update technical issue status (Admin)
router.patch('/technical/:id', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status, severity, adminNotes, adminEmail } = req.body;

    const existing = await TechnicalReport.findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Technical report not found.' });
    }

    const updates: any = {};
    if (status) updates.status = status;
    if (severity) updates.severity = severity;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;

    const updated = await TechnicalReport.findOneAndUpdate(
      { id: req.params.id },
      { $set: updates },
      { new: true }
    );

    await recordAudit(
      adminEmail || 'admin@prepora.internal',
      'Update Technical Report',
      'System',
      existing.id,
      existing.toObject(),
      updated!.toObject()
    );

    res.json({ success: true, report: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// STUDENT FEEDBACK & MISTAKE REPORTING (Task & User Feature)
// -------------------------------------------------------------

// POST /api/reports/feedback - Student submits a suggestion or mistake report
router.post('/feedback', async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      type = 'SUGGESTION',
      category = 'General',
      userId = 'anonymous',
      userName = 'Student',
      userEmail = '',
      userPhone = '',
      pageUrl = '',
      screenshotUrl = ''
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    const feedback = new StudentFeedback({
      id: `fb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      userName: userName || 'Student',
      userEmail: userEmail || '',
      userPhone: userPhone || '',
      type: ['SUGGESTION', 'MISTAKE', 'GENERAL'].includes(type) ? type : 'SUGGESTION',
      category: category || 'General',
      title,
      description,
      pageUrl: pageUrl || '',
      screenshotUrl: screenshotUrl || '',
      status: 'Pending'
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      feedback,
      message: 'Feedback submitted successfully! Our team will review it soon.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reports/feedback - List student feedbacks (Admin)
router.get('/feedback', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
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

    const feedbacks = await StudentFeedback.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const total = await StudentFeedback.countDocuments(filter);

    res.json({
      success: true,
      feedbacks,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/reports/feedback/:id - Update student feedback status and/or send admin reply (Admin)
router.patch('/feedback/:id', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status, adminNotes, adminReply, adminEmail } = req.body;

    const existing = await StudentFeedback.findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Feedback entry not found.' });
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

    const updated = await StudentFeedback.findOneAndUpdate(
      { id: req.params.id },
      { $set: updates },
      { new: true }
    );

    await recordAudit(
      adminEmail || 'admin@prepora.internal',
      adminReply ? 'Reply to Student Feedback' : (updates.status === 'Resolved' ? 'Resolve Student Feedback' : 'Update Student Feedback'),
      'Report',
      existing.id,
      existing.toObject(),
      updated!.toObject(),
      { replyContent: adminReply }
    );

    res.json({ success: true, feedback: updated, message: 'Feedback updated successfully!' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reports/feedback/:id/block-student - 1-Click block student who sent abusive/inappropriate feedback (Admin)
router.post('/feedback/:id/block-student', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { reason = 'Misconduct / Abuse reported in Student Feedback', adminEmail = 'admin@prepora.internal' } = req.body;
    const feedback = await StudentFeedback.findOne({ id: req.params.id });
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback entry not found.' });
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
      });
    }

    if (!user && feedback.userId && feedback.userId !== 'anonymous') {
      user = await User.findOne({ $or: [{ id: feedback.userId }, { studentId: feedback.userId }] });
    }

    if (user) {
      user.status = 'suspended';
      user.currentSessionId = undefined;
      user.lastLogoutAt = now;
      await user.save();

      // Revoke all active sessions
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
      );

      await LoginHistory.create({
        id: `lh-${Date.now()}-${randomBytes(3).toString('hex')}`,
        studentId: user.studentId || user.id,
        eventType: 'FORCE_LOGOUT',
        reason: `Account suspended & phone blocked by Admin (${adminEmail}): ${reason}`,
        timestamp: now
      }).catch(() => null);
    } else if (cleanMobile && cleanMobile.length === 10) {
      // Pre-emptively block this number so they can never register or login
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
      await user.save();
    } else {
      return res.status(400).json({
        success: false,
        message: 'Could not find a valid mobile number or user ID to block for this feedback.'
      });
    }

    // Mark feedback as rejected / student blocked
    feedback.status = 'Rejected';
    feedback.adminNotes = `[STUDENT BLOCKED by ${adminEmail} on ${now.toLocaleString()}]: ${reason}`;
    await feedback.save();

    await recordAudit(
      adminEmail,
      'Block Student From Feedback',
      'Report',
      feedback.id,
      null,
      { studentId: user.studentId || user.id, mobile: cleanMobile, reason }
    );

    res.json({
      success: true,
      message: `Student (${cleanMobile || user.name}) has been permanently suspended & blocked. All active sessions revoked.`
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
