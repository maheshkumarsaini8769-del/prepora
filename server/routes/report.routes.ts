import express, { Request, Response } from 'express';
import { QuestionReport } from '../models/Entities.js';
import TechnicalReport from '../models/TechnicalReport.js';
import Question from '../models/Question.js';
import AuditLog from '../models/AuditLog.js';

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
router.get('/question', async (req: Request, res: Response) => {
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
router.patch('/question/:id', async (req: Request, res: Response) => {
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
router.get('/technical', async (req: Request, res: Response) => {
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
router.patch('/technical/:id', async (req: Request, res: Response) => {
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

export default router;
