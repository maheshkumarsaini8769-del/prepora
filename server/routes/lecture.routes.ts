import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Lecture from '../models/Lecture.js';
import YouTubeDiscoveryService from '../services/youtubeDiscoveryService.js';
import { requireAdmin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

async function ensureSeededLectures() {
  try {
    const count = await Lecture.countDocuments();
    if (count === 0) {
      const p = path.resolve('server/data/curatedLectures.json');
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, 'utf8');
        const lectures = JSON.parse(raw);
        await Lecture.insertMany(lectures);
        console.log(`[AutoSeed] Seeded ${lectures.length} curated lectures into MongoDB.`);
      }
    }
  } catch (e) {
    console.warn('[AutoSeed Lectures Error]', e);
  }
}

/**
 * Helper to extract YouTube video ID from various URL formats
 */
function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const str = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;

  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = str.match(regExp);
  return match ? match[1] : null;
}

// ==========================================
// 1. STUDENT LECTURE QUERY (Public / Student)
// ==========================================
router.get('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    await ensureSeededLectures();
    const { subject, chapter, topic, type } = req.query;

    const query: any = { isActive: true };
    if (subject) query.subject = new RegExp(`^${String(subject).trim()}$`, 'i');
    if (chapter) query.chapter = new RegExp(`^${String(chapter).trim()}$`, 'i');
    if (topic) query.topic = new RegExp(`^${String(topic).trim()}$`, 'i');
    if (type) query.type = String(type).toUpperCase();

    // Priority ladder (task2.md):
    // 1. isRecommended: true, approvalStatus: 'APPROVED'
    // 2. priority desc, score desc
    const lectures = await Lecture.find(query)
      .sort({ isRecommended: -1, priority: -1, score: -1, createdAt: -1 })
      .limit(50);

    return res.json({
      success: true,
      count: lectures.length,
      lectures
    });
  } catch (err: any) {
    console.error('[LECTURE_FETCH_ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch lectures.' });
  }
});

// ==========================================
// 2. DISCOVERY CANDIDATES (Admin or Auto Fallback)
// ==========================================
router.get('/discovery', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { classLevel = '11', subject, chapter, topic, type = 'FULL_CHAPTER' } = req.query;

    if (!subject || !chapter) {
      return res.status(400).json({ success: false, message: 'Subject and Chapter are required for lecture discovery.' });
    }

    const lectureType = String(type).toUpperCase() === 'TOPIC' ? 'TOPIC' : 'FULL_CHAPTER';

    const result = await YouTubeDiscoveryService.discoverLectures({
      classLevel: String(classLevel),
      subject: String(subject),
      chapter: String(chapter),
      topic: topic ? String(topic) : undefined,
      lectureType
    });

    return res.json({
      success: true,
      source: result.source,
      candidates: result.candidates
    });
  } catch (err: any) {
    console.error('[LECTURE_DISCOVERY_ERROR]', err);
    return res.status(500).json({ success: false, message: 'Lecture discovery failed.' });
  }
});

// ==========================================
// 3. ADMIN: APPROVE CANDIDATE LECTURE
// ==========================================
router.post('/approve', requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      youtubeVideoId,
      title,
      description,
      channelTitle,
      thumbnail,
      duration,
      subject,
      chapter,
      topic,
      classLevel = '11',
      type = 'FULL_CHAPTER',
      score = 95,
      confidence = 'HIGH'
    } = req.body;

    const cleanId = extractYouTubeId(youtubeVideoId);
    if (!cleanId) {
      return res.status(400).json({ success: false, message: 'Valid YouTube Video ID is required.' });
    }

    // Set any previous lectures for this specific chapter/topic as not primary
    if (type === 'FULL_CHAPTER') {
      await Lecture.updateMany(
        { subject, chapter, type: 'FULL_CHAPTER' },
        { $set: { isRecommended: false } }
      );
    }

    const id = `lec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const lecture = new Lecture({
      id,
      classLevel,
      subject,
      chapter,
      topic: topic || '',
      type,
      youtubeVideoId: cleanId,
      title: title || `${chapter} Lecture`,
      description: description || '',
      channelTitle: channelTitle || '',
      thumbnail: thumbnail || `https://img.youtube.com/vi/${cleanId}/mqdefault.jpg`,
      duration: duration || '',
      language: 'Hindi',
      source: 'YOUTUBE',
      priority: 10,
      isFeatured: false,
      isRecommended: true,
      isActive: true,
      approvalStatus: 'APPROVED',
      score,
      confidence
    });

    await lecture.save();

    return res.json({
      success: true,
      message: `Lecture approved and set as recommended for ${chapter}!`,
      lecture
    });
  } catch (err: any) {
    console.error('[LECTURE_APPROVE_ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to approve lecture.' });
  }
});

// ==========================================
// 4. ADMIN: MANUAL LECTURE ADD BY URL
// ==========================================
router.post('/manual', requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      youtubeUrl,
      title,
      description,
      channelTitle,
      duration,
      subject,
      chapter,
      topic,
      classLevel = '11',
      type = 'FULL_CHAPTER',
      isRecommended = true
    } = req.body;

    const videoId = extractYouTubeId(youtubeUrl);
    if (!videoId) {
      return res.status(400).json({ success: false, message: 'Invalid YouTube URL or ID provided.' });
    }

    if (!subject || !chapter) {
      return res.status(400).json({ success: false, message: 'Subject and chapter are required.' });
    }

    if (isRecommended && type === 'FULL_CHAPTER') {
      await Lecture.updateMany(
        { subject, chapter, type: 'FULL_CHAPTER' },
        { $set: { isRecommended: false } }
      );
    }

    const id = `lec_man_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const lecture = new Lecture({
      id,
      classLevel,
      subject,
      chapter,
      topic: topic || '',
      type,
      youtubeVideoId: videoId,
      title: title || `${chapter} Complete Lecture`,
      description: description || '',
      channelTitle: channelTitle || '',
      thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      duration: duration || '1h 00m',
      language: 'Hindi',
      source: 'MANUAL',
      priority: 20,
      isFeatured: true,
      isRecommended: Boolean(isRecommended),
      isActive: true,
      approvalStatus: 'APPROVED',
      score: 100,
      confidence: 'HIGH'
    });

    await lecture.save();

    return res.json({
      success: true,
      message: 'Lecture added successfully!',
      lecture
    });
  } catch (err: any) {
    console.error('[LECTURE_MANUAL_ADD_ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to add manual lecture.' });
  }
});

// ==========================================
// 5. ADMIN: LECTURE HEALTH DASHBOARD STATS
// ==========================================
router.get('/health', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const total = await Lecture.countDocuments();
    const approved = await Lecture.countDocuments({ approvalStatus: 'APPROVED' });
    const pending = await Lecture.countDocuments({ approvalStatus: 'PENDING_REVIEW' });
    const rejected = await Lecture.countDocuments({ approvalStatus: 'REJECTED' });
    const lowConfidence = await Lecture.countDocuments({ confidence: 'LOW' });

    return res.json({
      success: true,
      stats: {
        total,
        approved,
        pending,
        rejected,
        lowConfidence
      }
    });
  } catch (err: any) {
    console.error('[LECTURE_HEALTH_ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch lecture health.' });
  }
});

// ==========================================
// 6. ADMIN: UPDATE / DELETE LECTURE
// ==========================================
router.put('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Lecture.findOneAndUpdate(
      { $or: [{ id }, { _id: id }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Lecture not found.' });
    }
    return res.json({ success: true, lecture: updated });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to update lecture.' });
  }
});

router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Lecture.findOneAndDelete({ $or: [{ id }, { _id: id }] });
    return res.json({ success: true, message: 'Lecture deleted.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete lecture.' });
  }
});

export default router;
