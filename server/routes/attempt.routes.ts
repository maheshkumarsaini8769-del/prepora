import express, { Request, Response } from 'express';
import TestAttempt from '../models/TestAttempt.js';
import Test from '../models/Test.js';
import Question from '../models/Question.js';
import User from '../models/User.js';
import { Mistake } from '../models/Entities.js';
import { optionalAuth, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// GET /api/attempts - Get all attempts for user
router.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || (req.query.userId as string);
    const filter = userId ? { userId } : {};
    const attempts = await TestAttempt.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, attempts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/attempts/:id - Get specific attempt
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const attempt = await TestAttempt.findOne({ id: req.params.id });
    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Attempt not found' });
    }
    res.json({ success: true, attempt });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/attempts/submit - Server authoritative test evaluation with idempotency
router.post('/submit', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const {
      testId,
      userId = 'usr-default',
      answers = {},
      timeTakenSeconds = 0,
      idempotencyKey,
      clientSyncId
    } = req.body;

    const effectiveUserId = req.userId || userId;

    const effectiveKey = idempotencyKey || clientSyncId;

    // Idempotency check: if this attempt was already successfully saved, return existing
    if (effectiveKey) {
      const existing = await TestAttempt.findOne({ idempotencyKey: effectiveKey });
      if (existing) {
        return res.json({
          success: true,
          attempt: existing,
          idempotentReplay: true,
          message: 'Idempotent replay: attempt already saved.'
        });
      }
    }

    const test = await Test.findOne({ id: testId });
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    const questions = await Question.find({ id: { $in: test.questionIds } });
    const questionMap = new Map(questions.map(q => [q.id, q]));

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    let totalScore = 0;

    const subjectStats: Record<string, { total: number; attempted: number; correct: number; wrong: number; score: number; timeSpent: number }> = {};

    // Derive marks per correct question from test's maxScore / totalQuestions (default 4)
    const marksPerCorrect = (test.maxScore && test.totalQuestions) ? test.maxScore / test.totalQuestions : 4;

    test.subjects.forEach(sub => {
      subjectStats[sub] = { total: 0, attempted: 0, correct: 0, wrong: 0, score: 0, timeSpent: 0 };
    });

    const evaluatedAnswers: Record<string, any> = {};
    const mistakesToSave: any[] = [];
    const weakTopicsSet = new Set<string>();
    const strongTopicsSet = new Set<string>();

    let fastestQ: any = null;
    let slowestQ: any = null;
    let speedMasterCount = 0;
    let timeDrainerCount = 0;
    let negativeTrapCount = 0;

    test.questionIds.forEach(qId => {
      const q = questionMap.get(qId);
      if (!q) return;

      const sub = q.subject;
      if (!subjectStats[sub]) {
        subjectStats[sub] = { total: 0, attempted: 0, correct: 0, wrong: 0, score: 0, timeSpent: 0 };
      }
      subjectStats[sub].total += 1;

      const userAns = answers[qId] || {
        questionId: qId,
        selectedAnswer: null,
        isAnswered: false,
        isMarkedForReview: false,
        isVisited: false,
        timeSpentSeconds: 0
      };

      const isAnswered = userAns.selectedAnswer !== null && userAns.selectedAnswer !== undefined;
      const isCorrect = isAnswered && Number(userAns.selectedAnswer) === Number(q.correctAnswer);
      const recTime = q.recommendedTimeSeconds || 90;
      const timeSpent = userAns.timeSpentSeconds || 0;
      subjectStats[sub].timeSpent += timeSpent;

      // Time tag evaluation
      let timeTag = 'Normal';
      if (!isAnswered) {
        timeTag = 'Unattempted';
      } else if (isCorrect && timeSpent < recTime * 0.6) {
        timeTag = 'Speed Master';
        speedMasterCount++;
      } else if (!isCorrect && timeSpent > recTime * 1.3) {
        timeTag = 'Negative Trap';
        negativeTrapCount++;
      } else if (timeSpent > recTime * 1.5) {
        timeTag = 'Time Drainer';
        timeDrainerCount++;
      }

      if (isAnswered) {
        subjectStats[sub].attempted += 1;
        if (isCorrect) {
          correctCount++;
          totalScore += marksPerCorrect;
          subjectStats[sub].correct += 1;
          subjectStats[sub].score += marksPerCorrect;
          strongTopicsSet.add(q.topic);
        } else {
          wrongCount++;
          const negMarks = test.negativeMarking ? 1 : 0;
          totalScore -= negMarks;
          subjectStats[sub].wrong += 1;
          subjectStats[sub].score -= negMarks;
          weakTopicsSet.add(q.topic);

          // Prepare mistake entity
          mistakesToSave.push({
            id: `mst-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            userId: effectiveUserId,
            questionId: q.id,
            mistakeReason: userAns.mistakeReason || 'Concept Not Clear',
            mistakeNote: userAns.mistakeNote || ''
          });
        }

        // Track fastest/slowest
        if (!fastestQ || timeSpent < fastestQ.timeSpentSeconds) {
          fastestQ = { questionId: q.id, timeSpentSeconds: timeSpent, isCorrect };
        }
        if (!slowestQ || timeSpent > slowestQ.timeSpentSeconds) {
          slowestQ = { questionId: q.id, timeSpentSeconds: timeSpent, isCorrect };
        }
      } else {
        unattemptedCount++;
      }

      evaluatedAnswers[qId] = {
        ...userAns,
        isAnswered,
        isCorrect,
        correctAnswer: q.correctAnswer,
        timeTag,
        recommendedTimeSeconds: recTime,
        // Immutable Question Snapshot (Content Versioning safeguard)
        questionSnapshot: {
          id: q.id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          subject: q.subject,
          chapter: q.chapter,
          topic: q.topic,
          difficulty: q.difficulty
        }
      };
    });

    const attemptedCount = correctCount + wrongCount;
    const accuracyPercentage = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

    const subjectBreakdown = Object.entries(subjectStats).map(([subject, stats]) => ({
      subject,
      totalQuestions: stats.total,
      attempted: stats.attempted,
      correct: stats.correct,
      wrong: stats.wrong,
      score: stats.score,
      maxScore: stats.total * 4,
      accuracyPercentage: stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0,
      timeSpentSeconds: stats.timeSpent
    }));

    const attemptId = `att-${Date.now()}`;
    const newAttempt = new TestAttempt({
      id: attemptId,
      idempotencyKey: effectiveKey,
      userId: effectiveUserId,
      testId: test.id,
      testTitle: test.title,
      timestamp: new Date().toISOString(),
      durationMinutes: test.durationMinutes,
      timeTakenSeconds,
      totalScore,
      maxScore: test.maxScore,
      totalQuestions: test.totalQuestions,
      correctCount,
      wrongCount,
      unattemptedCount,
      accuracyPercentage,
      answers: evaluatedAnswers,
      subjectBreakdown,
      strongTopics: Array.from(strongTopicsSet),
      weakTopics: Array.from(weakTopicsSet),
      avgTimePerQuestionSeconds: attemptedCount > 0 ? Math.round(timeTakenSeconds / attemptedCount) : 0,
      fastestQuestion: fastestQ,
      slowestQuestion: slowestQ,
      speedMasterCount,
      timeDrainerCount,
      negativeTrapCount
    });

    await newAttempt.save();

    // Save mistakes to DB
    if (mistakesToSave.length > 0) {
      for (const m of mistakesToSave) {
        await Mistake.findOneAndUpdate(
          { userId: effectiveUserId, questionId: m.questionId },
          {
            $setOnInsert: { id: m.id, createdAt: new Date() },
            $set: { testAttemptId: attemptId, mistakeReason: m.mistakeReason, mistakeNote: m.mistakeNote },
            $inc: { repeatedCount: 1 }
          },
          { upsert: true }
        );
      }
    }

    // Synchronize User profile stats asynchronously
    User.findOneAndUpdate(
      { id: effectiveUserId },
      {
        $inc: {
          testsCompleted: 1,
          totalQuestionsSolved: attemptedCount,
          studyTimeMinutes: Math.round(timeTakenSeconds / 60)
        }
      }
    ).catch(() => null);

    res.status(201).json({ success: true, attempt: newAttempt });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
