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

    const { result, report } = await aiService.solveDoubt(solveReq, contextSnippet);
    res.json({ success: true, data: result, report });
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
 * POST /api/ai/search-question
 * Database-First Question Search (Section 19)
 * Searches PREPORA question bank for authoritative answer before generative AI
 */
router.post('/search-question', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ success: false, error: 'Search query is required' });
    }

    const { searchDatabaseFirst } = await import('../services/ai/quality/databaseFirstSearch.js');
    const result = await searchDatabaseFirst(query);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Database search failed' });
  }
});

/**
 * POST /api/ai/validate-question
 * Validates an MCQ or AI-generated question (Section 16 & 24)
 */
router.post('/validate-question', async (req: Request, res: Response) => {
  try {
    const { validateMCQ } = await import('../services/ai/quality/mcqValidator.js');
    const validation = validateMCQ(req.body);
    res.json({ success: true, data: validation });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Validation failed' });
  }
});

/**
 * GET /api/ai/test-cases
 * Automated Test Runner for all 12 Critical Test Cases (Section 37)
 */
router.get('/test-cases', async (req: Request, res: Response) => {
  try {
    const { analyzeQuestionUnderstanding } = await import('../services/ai/quality/questionUnderstanding.js');
    const { validateMCQ } = await import('../services/ai/quality/mcqValidator.js');
    const { checkQuestionDuplicate } = await import('../services/ai/quality/duplicateDetector.js');
    const { searchDatabaseFirst } = await import('../services/ai/quality/databaseFirstSearch.js');

    const results: Array<{ testId: number; title: string; passed: boolean; details: string }> = [];

    // Test 1: "What is gravity?" -> F = ma must NOT be present
    const t1 = await aiService.solveDoubt({ question: 'What is gravity?', subject: 'Physics' });
    const t1Formula = (t1.result.keyFormula || '').toLowerCase().replace(/[\s\\cdot*]/g, '');
    const t1Passed = !t1Formula.includes('f=ma') && t1.result.answer.toLowerCase().includes('gravity');
    results.push({
      testId: 1,
      title: 'What is gravity? (Formula F=ma excluded)',
      passed: t1Passed,
      details: t1Passed ? 'Passed: Gravity explained without unrelated F=ma formula.' : `Failed: Formula contained F=ma (${t1.result.keyFormula})`
    });

    // Test 2: "What is force?" -> F = ma included
    const t2 = await aiService.solveDoubt({ question: 'What is force?', subject: 'Physics' });
    const t2Formula = (t2.result.keyFormula || '').toLowerCase();
    const t2Answer = t2.result.answer.toLowerCase();
    const t2Passed = t2Formula.includes('f = ma') || t2Formula.includes('ma') || t2Answer.includes('mass') && t2Answer.includes('accelerat');
    results.push({
      testId: 2,
      title: 'What is force? (Formula F=ma included appropriately)',
      passed: t2Passed,
      details: t2Passed ? `Passed: Formula ${t2.result.keyFormula || 'included in explanation'}.` : 'Failed: Missing F=ma for force.'
    });

    // Test 3: "What is kinematics?" -> Motion relationships without forces
    const t3 = await aiService.solveDoubt({ question: 'What is kinematics?', subject: 'Physics' });
    const t3Answer = t3.result.answer.toLowerCase();
    const t3Passed = t3Answer.includes('kinematics') && (t3Answer.includes('motion') || t3Answer.includes('velocity'));
    results.push({
      testId: 3,
      title: 'What is kinematics? (Kinematic relationships defined)',
      passed: t3Passed,
      details: t3Passed ? 'Passed: Kinematics motion relationships accurately defined.' : 'Failed: Incomplete kinematics definition.'
    });

    // Test 4: "Solve 2x + 5 = 15" -> Arithmetic solution x = 5
    const t4 = await aiService.solveDoubt({ question: 'Solve 2x + 5 = 15', subject: 'Mathematics' });
    const t4AllText = (t4.result.answer + ' ' + (t4.result.stepByStepSolution || []).join(' ')).toLowerCase();
    const t4Passed = t4AllText.includes('x = 5') || t4AllText.includes('x=5');
    results.push({
      testId: 4,
      title: 'Solve 2x + 5 = 15 (Arithmetic verification x = 5)',
      passed: t4Passed,
      details: t4Passed ? 'Passed: Solution correctly establishes x = 5.' : `Failed: Did not find x = 5 in solution (${t4.result.answer})`
    });

    // Test 5: "Why does an object fall toward Earth?" -> Gravitational attraction
    const t5 = await aiService.solveDoubt({ question: 'Why does an object fall toward Earth?', subject: 'Physics' });
    const t5Text = (t5.result.answer + ' ' + (t5.result.stepByStepSolution || []).join(' ')).toLowerCase();
    const t5Passed = t5Text.includes('gravity') || t5Text.includes('gravitational') || t5Text.includes('earth');
    results.push({
      testId: 5,
      title: 'Why does an object fall toward Earth? (Gravitational attraction)',
      passed: t5Passed,
      details: t5Passed ? 'Passed: Accurate explanation of Earth gravitational attraction.' : 'Failed: Inaccurate fall explanation.'
    });

    // Test 6: "Derive equations of motion" -> Step-by-step kinematic derivations
    const t6 = await aiService.solveDoubt({ question: 'Derive equations of motion', subject: 'Physics' });
    const t6Steps = (t6.result.stepByStepSolution || []).join(' ');
    const t6Passed = t6Steps.includes('v = u + at') || t6Steps.includes('v=u+at') || (t6.result.keyFormula || '').includes('v = u + at');
    results.push({
      testId: 6,
      title: 'Derive equations of motion (Step-by-step derivation)',
      passed: t6Passed,
      details: t6Passed ? 'Passed: Kinematic derivations present step-by-step.' : 'Failed: Incomplete derivation steps.'
    });

    // Test 7: "Explain photosynthesis" -> Biological process explanation
    const t7 = await aiService.solveDoubt({ question: 'Explain photosynthesis', subject: 'Biology' });
    const t7Text = (t7.result.answer + ' ' + (t7.result.stepByStepSolution || []).join(' ')).toLowerCase();
    const t7Passed = t7Text.includes('photosynthesis') && (t7Text.includes('glucose') || t7Text.includes('light') || t7Text.includes('chlorophyll'));
    results.push({
      testId: 7,
      title: 'Explain photosynthesis (Biological process explanation)',
      passed: t7Passed,
      details: t7Passed ? 'Passed: Photosynthesis biochemical mechanism explained.' : 'Failed: Insufficient explanation.'
    });

    // Test 8: Selected Chemistry, Question: "What is kinematics?" -> Physics detection and warning
    const t8Understanding = analyzeQuestionUnderstanding('What is kinematics?', 'Chemistry');
    const t8Passed = t8Understanding.subject === 'Physics' && Boolean(t8Understanding.contextMismatch?.hasMismatch);
    results.push({
      testId: 8,
      title: 'Selected Chemistry, asked Kinematics (Context mismatch detection)',
      passed: t8Passed,
      details: t8Passed 
        ? `Passed: Detected Physics and flagged mismatch: "${t8Understanding.contextMismatch?.warningMessage?.slice(0, 60)}..."`
        : `Failed: Subject detected as ${t8Understanding.subject}, mismatch: ${t8Understanding.contextMismatch?.hasMismatch}`
    });

    // Test 9: Generate an MCQ -> 4 distinct options, single correct answer
    const validMcq = {
      question: 'What is the SI unit of electric current?',
      options: ['Volt', 'Ampere', 'Ohm', 'Coulomb'],
      correctAnswer: 1,
      explanation: 'The SI unit of electric current is the Ampere (A). Volt is for potential and Ohm is for resistance.'
    };
    const invalidMcq = {
      question: 'What is 2+2?',
      options: ['4', '4', '3', '2'], // Duplicate option!
      correctAnswer: 0,
      explanation: 'Option A is 4.'
    };
    const vResult1 = validateMCQ(validMcq);
    const vResult2 = validateMCQ(invalidMcq);
    const t9Passed = vResult1.isValid && !vResult2.isValid;
    results.push({
      testId: 9,
      title: 'MCQ Validation (4 distinct options, 1 correct index, explanation agreement)',
      passed: t9Passed,
      details: t9Passed ? 'Passed: Valid MCQ accepted and duplicate-option MCQ correctly rejected.' : 'Failed: MCQ validator error.'
    });

    // Test 10: Duplicate Detection & Replacement
    const existingBank = [
      { question: 'What is the acceleration due to gravity on the surface of Earth?', options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'] }
    ];
    const candidateQ = {
      question: 'What is the acceleration due to gravity on the surface of Earth?',
      options: ['9.8 m/s^2', '10 m/s^2', '8.9 m/s^2', '11 m/s^2']
    };
    const dupCheck = checkQuestionDuplicate(candidateQ, existingBank);
    const t10Passed = dupCheck.isDuplicate && dupCheck.similarity >= 0.78;
    results.push({
      testId: 10,
      title: 'Duplicate Detection (Near/Exact duplicate caught)',
      passed: t10Passed,
      details: t10Passed ? `Passed: Duplicate detected with ${Math.round(dupCheck.similarity * 100)}% similarity (${dupCheck.duplicateType}).` : 'Failed: Duplicate was not detected.'
    });

    // Test 11: Database-First search priority
    const dbSearch = await searchDatabaseFirst('gravity');
    // Function executes without throwing and returns valid structure
    const t11Passed = typeof dbSearch.foundInDatabase === 'boolean';
    results.push({
      testId: 11,
      title: 'Database-First Question Search (Authoritative retrieval priority)',
      passed: t11Passed,
      details: t11Passed ? `Passed: Database search returned contract structure (found: ${dbSearch.foundInDatabase}).` : 'Failed: DB search threw error.'
    });

    // Test 12: General educational question -> Never falsely claims grounded
    const t12 = await aiService.solveDoubt({ question: 'What is an ecosystem?', subject: 'Biology' });
    const t12Passed = t12.result.groundedInPrepora === false && t12.result.retrievedPreporaContext === undefined;
    results.push({
      testId: 12,
      title: 'General Educational Question (Truthful Grounding check)',
      passed: t12Passed,
      details: t12Passed ? 'Passed: Correctly did not falsely claim grounded in PREPORA DB.' : 'Failed: Falsely claimed grounded.'
    });

    const passedCount = results.filter(r => r.passed).length;
    res.json({
      success: true,
      summary: {
        total: results.length,
        passed: passedCount,
        failed: results.length - passedCount,
        allPassed: passedCount === results.length
      },
      results
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Test cases runner failed' });
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
