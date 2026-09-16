import mongoose from 'mongoose';
import Question from '../../../models/Question.js';

export interface DatabaseSearchResult {
  foundInDatabase: boolean;
  isAuthoritative: boolean;
  questionData?: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    correctOptionLetter: string;
    explanation: string;
    concept?: string;
    subject: string;
    chapter: string;
    topic?: string;
    difficulty: string;
  };
  contextForAI?: string;
}

/**
 * Searches PREPORA database for an existing approved question before calling generative models.
 * Implements Section 19: "PREFER VERIFIED DATABASE ANSWER over fresh AI regeneration."
 */
export async function searchDatabaseFirst(searchQuery: string): Promise<DatabaseSearchResult> {
  const cleanQ = searchQuery.trim();
  if (!cleanQ || cleanQ.length < 5 || mongoose.connection.readyState !== 1) {
    return { foundInDatabase: false, isAuthoritative: false };
  }

  try {
    // 1. Exact or prefix regex search
    const cleanNormalized = cleanQ.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const words = cleanNormalized.split(/\s+/).filter(w => w.length > 3);
    
    let match: any = null;

    // Direct text search if long enough
    if (words.length >= 3) {
      const regexPattern = words.slice(0, 4).join('\\s+.*');
      match = await Question.findOne({
        question: { $regex: new RegExp(regexPattern, 'i') },
        status: { $in: ['Approved', 'Published'] }
      }).select('id question options correctAnswer explanation concept subject chapter topic difficulty');
    }

    // Fallback: search by question id if user passes a direct question ID
    if (!match && /^(phy|che|mat|bio|q-|ques-)/i.test(cleanQ)) {
      match = await Question.findOne({ id: cleanQ });
    }

    if (match) {
      const correctIdx = match.correctAnswer ?? 0;
      const letter = ['A', 'B', 'C', 'D'][correctIdx] || 'A';

      return {
        foundInDatabase: true,
        isAuthoritative: true,
        questionData: {
          id: match.id,
          question: match.question,
          options: match.options || [],
          correctAnswer: correctIdx,
          correctOptionLetter: letter,
          explanation: match.explanation,
          concept: match.concept,
          subject: match.subject,
          chapter: match.chapter,
          topic: match.topic,
          difficulty: match.difficulty
        },
        contextForAI: `[AUTHORITATIVE PREPORA DATABASE QUESTION]\nQuestion: "${match.question}"\nOptions: ${JSON.stringify(match.options)}\nCorrect Answer: Option ${letter} (Index ${correctIdx})\nVerified Explanation: ${match.explanation}\nCore Concept: ${match.concept || match.topic}`
      };
    }
  } catch (err) {
    console.warn('[databaseFirstSearch] Search query error:', err);
  }

  return { foundInDatabase: false, isAuthoritative: false };
}

/**
 * Handles student queries like "Why is option B correct for this question?"
 * Implements Section 20: Keeps the stored verified answer key intact, and strictly explains WHY it is right.
 */
export function buildWhyOptionPrompt(
  verifiedQuestion: { question: string; options: string[]; correctAnswer: number; explanation: string },
  studentAskedOption?: string
): string {
  const correctLetter = ['A', 'B', 'C', 'D'][verifiedQuestion.correctAnswer];
  const targetLetter = (studentAskedOption || correctLetter).toUpperCase();
  const targetOptionText = verifiedQuestion.options[verifiedQuestion.correctAnswer] || '';

  return [
    `The following verified PREPORA curriculum question has an AUTHORITATIVE and IMMUTABLE answer key: Option ${correctLetter} ("${targetOptionText}").`,
    `Question: "${verifiedQuestion.question}"`,
    `Verified Solution: "${verifiedQuestion.explanation}"`,
    ``,
    `Your task as the PREPORA Academic AI:`,
    `1. Explain strictly and clearly to the student WHY Option ${correctLetter} is the scientifically correct answer.`,
    `2. Do NOT change, contradict, or re-assign the answer key under any circumstance.`,
    `3. Break down step-by-step why the formula or concept rules out the other choices.`
  ].join('\n');
}
