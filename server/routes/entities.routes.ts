import express, { Request, Response } from 'express';
import { Mistake, Bookmark, Note, Doubt, QuestionReport, Goal } from '../models/Entities.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

const router = express.Router();

// --- MISTAKES ---
router.get('/mistakes', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'usr-default';
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

router.patch('/mistakes/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Mistake.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.json({ success: true, mistake: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/mistakes/:id', async (req: Request, res: Response) => {
  try {
    await Mistake.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: 'Mistake removed' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- BOOKMARKS ---
router.get('/bookmarks', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'usr-default';
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, bookmarks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/bookmarks', async (req: Request, res: Response) => {
  try {
    const { userId = 'usr-default', itemType, itemId } = req.body;
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
router.get('/notes', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'usr-default';
    const notes = await Note.find({ userId }).sort({ updatedAt: -1 });
    res.json({ success: true, notes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/notes', async (req: Request, res: Response) => {
  try {
    const { userId = 'usr-default', title, content, subject, chapter, topic } = req.body;
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

router.delete('/notes/:id', async (req: Request, res: Response) => {
  try {
    await Note.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: 'Note deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- DOUBTS ---
router.get('/doubts', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'usr-default';
    const doubts = await Doubt.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, doubts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/doubts', async (req: Request, res: Response) => {
  try {
    const { userId = 'usr-default', questionId, subject, chapter, topic, message } = req.body;
    const doubt = new Doubt({
      id: `dbt-${Date.now()}`,
      userId,
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
router.get('/reports', async (req: Request, res: Response) => {
  try {
    const reports = await QuestionReport.find().sort({ createdAt: -1 });
    res.json({ success: true, reports });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/reports', async (req: Request, res: Response) => {
  try {
    const { userId = 'usr-default', questionId, reason, message } = req.body;
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

router.patch('/reports/:id', async (req: Request, res: Response) => {
  try {
    const report = await QuestionReport.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body, resolvedAt: req.body.status === 'Resolved' ? new Date() : undefined },
      { new: true }
    );
    res.json({ success: true, report });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// --- USER & PROFILE ---
router.get('/user/profile', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'usr-default';
    let user = await User.findOne({ id: userId });
    if (!user) {
      user = new User({
        id: userId,
        name: 'Aman Sharma',
        email: 'aman.sharma@example.com',
        targetExam: 'JEE',
        classLevel: '12',
        dreamScore: 280,
        streakDays: 12
      });
      await user.save();
    }
    res.json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/user/profile', async (req: Request, res: Response) => {
  try {
    const userId = (req.body.userId as string) || 'usr-default';
    const user = await User.findOneAndUpdate(
      { id: userId },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ success: true, user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
