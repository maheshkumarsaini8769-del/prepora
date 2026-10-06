import express, { Request, Response } from 'express';
import { Mistake, Bookmark, Note, Doubt, QuestionReport, Goal } from '../models/Entities.js';
import Question from '../models/Question.js';
import User from '../models/User.js';
import VideoWatchLog from '../models/VideoWatchLog.js';
import { authenticateUser, requireAdmin, optionalAuth, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Field whitelists to prevent mass assignment vulnerabilities
const MISTAKE_FIELDS = ['resolved', 'notes'];
const REPORT_FIELDS = ['status', 'adminNotes', 'resolution'];
const PROFILE_FIELDS = ['name', 'avatar', 'targetExam', 'classLevel', 'targetYear', 'dreamScore', 'dailyGoalQuestions', 'dailyGoalMinutes'];

function pickFields(obj: Record<string, any>, allowed: string[]): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key of allowed) {
    if (obj[key] !== undefined) result[key] = obj[key];
  }
  return result;
}

// --- MISTAKES ---
// GET /mistakes - Retrieve mistakes with strict ownership isolation
router.get('/mistakes', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const userId = (isAdmin && req.query.userId) ? (req.query.userId as string) : req.userId;
    const mistakes = await Mistake.find({ userId, resolved: false }).sort({ updatedAt: -1 });
    const qIds = mistakes.map(m => m.questionId);
    const questions = await Question.find({ id: { $in: qIds } });
    const qMap = new Map(questions.map(q => [q.id, q]));

    const enriched = mistakes.map(m => ({
      ...m.toObject(),
      question: qMap.get(m.questionId)
    }));

    res.json({ success: true, mistakes: enriched });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /mistakes/:id - Update mistake only if caller owns it or is admin
router.patch('/mistakes/:id', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const filter = isAdmin ? { id: req.params.id } : { id: req.params.id, userId: req.userId };
    const updated = await Mistake.findOneAndUpdate(
      filter,
      { $set: pickFields(req.body, MISTAKE_FIELDS) },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Mistake record not found or unauthorized' });
    }
    res.json({ success: true, mistake: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /mistakes/:id - Delete mistake only if caller owns it or is admin
router.delete('/mistakes/:id', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const filter = isAdmin ? { id: req.params.id } : { id: req.params.id, userId: req.userId };
    const deleted = await Mistake.findOneAndDelete(filter);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Mistake record not found or unauthorized' });
    }
    res.json({ success: true, message: 'Mistake removed' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- BOOKMARKS ---
// GET /bookmarks - Retrieve bookmarks with strict user isolation
router.get('/bookmarks', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const userId = (isAdmin && req.query.userId) ? (req.query.userId as string) : req.userId;
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, bookmarks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /bookmarks - Toggle bookmark for authenticated caller
router.post('/bookmarks', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const { itemType, itemId } = req.body;
    if (!itemType || !itemId) {
      return res.status(400).json({ success: false, message: 'itemType and itemId are required' });
    }
    const userId = req.userId;
    const existing = await Bookmark.findOne({ userId, itemType, itemId });
    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return res.json({ success: true, bookmarked: false, message: 'Bookmark removed' });
    }
    const newBm = new Bookmark({
      id: `bm-${Date.now()}`,
      userId,
      itemType,
      itemId
    });
    await newBm.save();
    res.status(201).json({ success: true, bookmarked: true, bookmark: newBm });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// --- NOTES ---
// GET /notes - Retrieve notes for authenticated caller
router.get('/notes', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const userId = (isAdmin && req.query.userId) ? (req.query.userId as string) : req.userId;
    const notes = await Note.find({ userId }).sort({ updatedAt: -1 });
    res.json({ success: true, notes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /notes - Create note for authenticated caller
router.post('/notes', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, subject, chapter, topic } = req.body;
    const userId = req.userId;
    const note = new Note({
      id: `note-${Date.now()}`,
      userId,
      title,
      content,
      subject,
      chapter,
      topic
    });
    await note.save();
    res.status(201).json({ success: true, note });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /notes/:id - Delete note only if caller owns it or is admin
router.delete('/notes/:id', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const filter = isAdmin ? { id: req.params.id } : { id: req.params.id, userId: req.userId };
    const deleted = await Note.findOneAndDelete(filter);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Note not found or unauthorized' });
    }
    res.json({ success: true, message: 'Note deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- DOUBTS ---
// GET /doubts - Retrieve doubts for caller
router.get('/doubts', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const filter = isAdmin && req.query.userId ? { userId: req.query.userId as string } : (isAdmin ? {} : { userId: req.userId });
    const doubts = await Doubt.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, doubts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /doubts - Submit doubt for authenticated caller
router.post('/doubts', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const { questionId, subject, chapter, topic, message } = req.body;
    const doubt = new Doubt({
      id: `dbt-${Date.now()}`,
      userId: req.userId,
      questionId,
      subject,
      chapter,
      topic,
      message,
      status: 'Open'
    });
    await doubt.save();
    res.status(201).json({ success: true, doubt });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// --- REPORTS ---
// GET /reports - Admin only inspection of question reports
router.get('/reports', authenticateUser, requireAdmin, async (_req: Request, res: Response) => {
  try {
    const reports = await QuestionReport.find().sort({ createdAt: -1 });
    res.json({ success: true, reports });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /reports - Report a question
router.post('/reports', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { questionId, reason, message } = req.body;
    const userId = req.userId || 'anonymous';
    const report = new QuestionReport({
      id: `rep-${Date.now()}`,
      userId,
      questionId,
      reason,
      message,
      status: 'Pending'
    });
    await report.save();
    res.status(201).json({ success: true, report });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH /reports/:id - Admin only resolution of question reports
router.patch('/reports/:id', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const allowed = pickFields(req.body, REPORT_FIELDS);
    if (req.body.status === 'Resolved') allowed.resolvedAt = new Date();
    const report = await QuestionReport.findOneAndUpdate(
      { id: req.params.id },
      { $set: allowed },
      { new: true }
    );
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.json({ success: true, report });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// --- USER & PROFILE ---
// GET /user/profile - Safe profile retrieval for authenticated user
router.get('/user/profile', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const targetUserId = (isAdmin && req.query.userId) ? (req.query.userId as string) : req.userId;
    const user = await User.findOne({ id: targetUserId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /user/profile - Safe profile update (isolated to caller, mass assignment protected)
router.patch('/user/profile', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const targetUserId = (isAdmin && req.body.userId) ? (req.body.userId as string) : req.userId;
    // Only allow safe profile fields — never role, passwordHash, otpCode, sessions, etc.
    const user = await User.findOneAndUpdate(
      { id: targetUserId },
      { $set: pickFields(req.body, PROFILE_FIELDS) },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// --- VIDEO LECTURE WATCH TRACKING ---
router.post('/video-views/track', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { subject, chapter, videoId, videoTitle, channelName } = req.body;
    if (!subject || !chapter || !videoId) {
      return res.status(400).json({ success: false, message: 'subject, chapter, and videoId are required' });
    }

    const userId = req.userId || req.body.userId || 'usr-anonymous';
    const userEmail = req.user?.email || req.body.userEmail || '';

    const log = new VideoWatchLog({
      id: `vw-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      userEmail,
      subject,
      chapter,
      videoId,
      videoTitle: videoTitle || 'Chapter One-Shot Lecture',
      channelName: channelName || 'Curated Educator',
      watchedAt: new Date()
    });

    await log.save();
    res.status(201).json({ success: true, logId: log.id });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- VIDEO LECTURE STATS (FOR ADMIN ANALYTICS ONLY) ---
router.get('/video-views/stats', authenticateUser, requireAdmin, async (_req: Request, res: Response) => {
  try {
    const totalViews = await VideoWatchLog.countDocuments();

    // Subject breakdown
    const subjectStats = await VideoWatchLog.aggregate([
      { $group: { _id: '$subject', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const subjectMap: Record<string, number> = {
      Physics: 0,
      Chemistry: 0,
      Mathematics: 0,
      Biology: 0
    };
    for (const item of subjectStats) {
      if (item._id) subjectMap[item._id] = item.count;
    }

    // Top chapters watched
    const topChapters = await VideoWatchLog.aggregate([
      { $group: { _id: '$chapter', subject: { $first: '$subject' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 }
    ]);

    // Recent 10 views
    const recentViews = await VideoWatchLog.find().sort({ watchedAt: -1 }).limit(10);

    res.json({
      success: true,
      stats: {
        totalViews,
        subjectMap,
        topChapters: topChapters.map(c => ({ chapter: c._id, subject: c.subject, count: c.count })),
        recentViews
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
