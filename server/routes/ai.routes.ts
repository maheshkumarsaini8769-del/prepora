import { Router, Request, Response } from 'express';
import { aiService } from '../services/ai/aiService.js';
import { Question } from '../models/Question.js';
import { IDoubtSolveRequest } from '../services/ai/aiTypes.js';

const router = Router();

// Initialize AI config from DB once
aiService.initializeFromDB().catch(err => console.warn('[AI Routes Init]', err));

/**
 * GET /api/ai/status
 * Returns current status of AI system (provider, limits, availability)
 */
router.get('/status', async (req: Request, res: Response) => {
  try {
    const status = aiService.getStatus();
    res.json({ success: true, data: status });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/ai/solve-doubt
 * Solves any student academic question with question understanding & verification
 */
router.post('/solve-doubt', async (req: Request, res: Response) => {
  try {
    const { 
      question, 
      subject, 
      chapter, 
      topic, 
      classLevel, 
      targetExam, 
      imageBase64, 
      imageMimeType,
      conversationHistory,
      requestFollowUp
    } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ success: false, error: 'Question text is required' });
    }

    // Grounding lookup in PREPORA Question Bank if applicable (task3.md Section 12)
    let contextSnippet: string | undefined = undefined;
    try {
      const searchRegex = new RegExp(question.slice(0, 30).trim().split(' ')[0] || '', 'i');
      const foundQ = await Question.findOne({
        $or: [
          { topic: { $regex: searchRegex } },
          { chapter: { $regex: searchRegex } },
          { question: { $regex: searchRegex } }
        ]
      }).select('question options correctAnswer explanation concept topic chapter subject');

      if (foundQ) {
        contextSnippet = `Related PREPORA Question: "${foundQ.question}" (Chapter: ${foundQ.chapter}, Topic: ${foundQ.topic})\nConcept: ${foundQ.concept || 'N/A'}\nVerified Solution: ${foundQ.explanation}`;
      }
    } catch (dbErr) {
      // Non-blocking: continue with general model knowledge
    }

    const solveReq: IDoubtSolveRequest = {
      question,
      subject,
      chapter,
      topic,
      classLevel,
      targetExam,
      imageBase64,
      imageMimeType,
      conversationHistory,
      requestFollowUp
    };

    const result = await aiService.solveDoubt(solveReq, contextSnippet);
    res.json({ success: true, data: result });
  } catch (err: any) {
    console.error('[AI Solve Doubt Error]', err);
    res.status(500).json({ 
      success: false, 
      error: 'AI service temporarily unavailable. Please retry or consult mentor.',
      details: err?.message 
    });
  }
});

/**
 * POST /api/ai/hints
 * Progressive hints for a student stuck on a problem
 */
router.post('/hints', async (req: Request, res: Response) => {
  try {
    const { question, subject, chapter, topic, options, correctAnswer, explanation } = req.body;
    if (!question) {
      return res.status(400).json({ success: false, error: 'Question is required' });
    }

    const hints = await aiService.generateProgressiveHints({
      question,
      subject,
      chapter,
      topic,
      options,
      correctAnswer,
      explanation
    });

    res.json({ success: true, data: hints });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Failed to generate hints' });
  }
});

/**
 * POST /api/ai/analyze-weakness
 * Diagnoses performance history and prescribes 5-stage graduated blueprint
 */
router.post('/analyze-weakness', async (req: Request, res: Response) => {
  try {
    const { topic, chapter, subject, accuracy, wrongCount, totalAttempts, mistakeTypes, timePerQuestionSeconds } = req.body;
    if (!topic || accuracy === undefined) {
      return res.status(400).json({ success: false, error: 'Topic and accuracy are required' });
    }

    const analysis = await aiService.analyzeWeakness({
      topic,
      chapter: chapter || 'General',
      subject: subject || 'Physics',
      accuracy: Number(accuracy) || 50,
      wrongCount: Number(wrongCount) || 3,
      totalAttempts: Number(totalAttempts) || 6,
      mistakeTypes: Array.isArray(mistakeTypes) ? mistakeTypes : ['Calculation Error'],
      timePerQuestionSeconds: Number(timePerQuestionSeconds) || 90
    });

    res.json({ success: true, data: analysis });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Failed to analyze weakness' });
  }
});

export default router;
