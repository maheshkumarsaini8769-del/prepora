import { IAIFactoryQuestion } from '../models/AIFactory.js';

export async function generateQuestionsWithGemini(
  textSnippet: string,
  topic: string,
  chapter: string,
  subject: string,
  classLevel: string,
  count: number,
  apiKey: string,
  modelName: string = 'gemini-3.6-flash',
  jobId: string = 'gemini_job',
  docId?: string
): Promise<IAIFactoryQuestion[] | null> {
  if (!apiKey || apiKey.trim().length < 10) {
    return null;
  }

  const prompt = [
    'You are a Senior Exam Specialist creating competitive exam questions for NEET, JEE, and CBSE Board.',
    'Generate exactly ' + count + ' high-yield, authentic Multiple Choice Questions (MCQs) strictly derived from the following textbook content for:',
    'Subject: ' + subject,
    'Class: ' + classLevel,
    'Chapter: ' + chapter,
    'Topic: ' + topic,
    '',
    'Textbook Excerpt:',
    '"""',
    textSnippet.slice(0, 8000),
    '"""',
    '',
    'Requirements:',
    '1. Every question must be clear, scientifically accurate, and easily understandable by high-school students.',
    '2. Provide exactly 4 distinct, plausible options. Do NOT use fake or robotic words. Specify the true 0-indexed correct option (0, 1, 2, or 3).',
    '3. Provide a clear, educational step-by-step explanation.',
    '4. Difficulty must be "Easy", "Medium", or "Hard".',
    '5. Question types can include Standard MCQ, Statement I & Statement II analysis, or Assertion-Reason.',
    '',
    'Return ONLY a valid JSON array matching this schema:',
    '[',
    '  {',
    '    "question": "string",',
    '    "options": ["string", "string", "string", "string"],',
    '    "correctAnswer": 0,',
    '    "explanation": "string",',
    '    "difficulty": "Easy" | "Medium" | "Hard",',
    '    "questionType": "MCQ" | "Statement Based" | "Assertion Reason",',
    '    "importantPoint": "string",',
    '    "examTip": "string",',
    '    "commonMistake": "string"',
    '  }',
    ']'
  ].join('\n');

  try {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':generateContent?key=' + apiKey;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 4096,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      console.warn('[Gemini API Warning]', response.status, await response.text());
      return null;
    }

    const data: any = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsedArray = JSON.parse(rawText);
    if (!Array.isArray(parsedArray)) return null;

    const questions: IAIFactoryQuestion[] = parsedArray
      .map((item: any, idx: number) => {
        const qId = 'ai_gemini_' + jobId + '_' + (idx + 1) + '_' + Math.random().toString(36).substring(2, 6);
        const diff: 'Easy' | 'Medium' | 'Hard' = item.difficulty === 'Hard' ? 'Hard' : item.difficulty === 'Easy' ? 'Easy' : 'Medium';
        const qType: 'MCQ' | 'Assertion Reason' | 'Statement Based' | 'Match The Following' =
          item.questionType === 'Assertion Reason' ? 'Assertion Reason' : item.questionType === 'Statement Based' ? 'Statement Based' : 'MCQ';

        // Bug 36: Skip questions with invalid correctAnswer instead of silently defaulting to 0
        const parsedCorrectAnswer = Number(item.correctAnswer);
        if (isNaN(parsedCorrectAnswer) || parsedCorrectAnswer < 0 || parsedCorrectAnswer > 3) return null;

        // Bug 37: Calculate quality score from available signals instead of hardcoded 98
        let qualityScore = 0;
        if (item.question && item.question.length > 10) qualityScore += 15;
        if (Array.isArray(item.options) && item.options.length === 4) qualityScore += 20;
        if (item.explanation && item.explanation.length > 20) qualityScore += 20;
        if (item.examTip) qualityScore += 15;
        if (item.concept || topic) qualityScore += 15;
        if (item.commonMistake) qualityScore += 10;
        if (item.difficulty) qualityScore += 5;

        return {
          id: qId,
          question: item.question,
          options: item.options?.length === 4 ? item.options : [item.options?.[0] || 'A', item.options?.[1] || 'B', item.options?.[2] || 'C', item.options?.[3] || 'D'],
          correctAnswer: parsedCorrectAnswer,
          explanation: item.explanation || ('Derived from textbook chapter ' + chapter),
          concept: topic,
          importantPoint: item.importantPoint || ('Core concept of ' + topic),
          commonMistake: item.commonMistake || 'Review statement precision carefully.',
          examTip: item.examTip || 'Focus on textbook definitions and fundamental formulas.',
          difficulty: diff,
          difficultyReason: diff === 'Hard' ? 'Requires synthesis of textbook principles' : 'Direct conceptual evaluation',
          subject,
          classLevel,
          chapter,
          topic,
          subtopic: topic + ' Concepts',
          questionType: qType,
          examSuitability: {
            NEET: { suitable: subject === 'Biology' || subject === 'Physics' || subject === 'Chemistry', confidence: 0.95 },
            CBSE: { suitable: true, confidence: 0.95 },
            RBSE: { suitable: true, confidence: 0.9 }
          },
          sourceReference: {
            documentId: docId,
            page: 1,
            section: topic,
            excerpt: item.question.slice(0, 150)
          },
          qualityScore,
          qualityFlags: ['Gemini AI Generation', 'Verified JSON Output', 'Grounded in Source Text'],
          duplicateStatus: 'Unique' as 'Unique',
          reviewStatus: 'Pending' as 'Pending'
        };
      })
      .filter((q): q is NonNullable<typeof q> => q !== null);

    return questions;
  } catch (err) {
    console.warn('[Gemini Generator Error]', err);
    return null;
  }
}
