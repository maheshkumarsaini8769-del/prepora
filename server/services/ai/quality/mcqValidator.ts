export interface MCQValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  distinctOptionsCount: number;
  hasSingleCorrectAnswer: boolean;
  explanationAgreesWithKey: boolean;
}

export interface IMCQCandidate {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty?: string;
  subject?: string;
  chapter?: string;
}

/**
 * Rigorously validates a Multiple Choice Question (MCQ) according to PREPORA Quality Standards:
 * 1. Exactly 4 non-empty, distinct options (A, B, C, D)
 * 2. Exactly one intended correct answer index (0, 1, 2, or 3)
 * 3. No duplicate or contradictory options
 * 4. Explanation explicitly confirms the stated correct option and does NOT contradict it
 */
export function validateMCQ(mcq: IMCQCandidate): MCQValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Question Text Check
  if (!mcq.question || mcq.question.trim().length < 15) {
    errors.push('Question statement is too short (must be at least 15 characters).');
  }

  // 2. Options Structure Check
  if (!mcq.options || !Array.isArray(mcq.options) || mcq.options.length !== 4) {
    errors.push(`MCQ must have exactly 4 options. Found ${mcq.options ? mcq.options.length : 0}.`);
  }

  // 3. Option Distinctness & Duplicates Check
  const normalizedOptions = (mcq.options || []).map(o => (o || '').trim().toLowerCase());
  const uniqueSet = new Set(normalizedOptions);
  const distinctOptionsCount = uniqueSet.size;

  if (distinctOptionsCount < (mcq.options || []).length) {
    errors.push('Duplicate options detected. All 4 choices must be mutually distinct.');
  }

  // Check for empty or trivial options
  for (let i = 0; i < (mcq.options || []).length; i++) {
    const opt = (mcq.options[i] || '').trim();
    if (opt.length === 0) {
      errors.push(`Option ${['A', 'B', 'C', 'D'][i]} is empty.`);
    }
  }

  // 4. Correct Answer Index Check
  const hasSingleCorrectAnswer = 
    typeof mcq.correctAnswer === 'number' && 
    mcq.correctAnswer >= 0 && 
    mcq.correctAnswer <= 3 && 
    Number.isInteger(mcq.correctAnswer);

  if (!hasSingleCorrectAnswer) {
    errors.push(`Invalid correct answer index: ${mcq.correctAnswer}. Must be 0, 1, 2, or 3.`);
  }

  // 5. Explanation Agreement with Correct Answer Key
  let explanationAgreesWithKey = true;
  if (mcq.explanation && mcq.explanation.trim().length > 10 && hasSingleCorrectAnswer) {
    const correctLetter = ['A', 'B', 'C', 'D'][mcq.correctAnswer];
    const correctOptionText = (mcq.options[mcq.correctAnswer] || '').trim().toLowerCase();
    const explanationLower = mcq.explanation.toLowerCase();

    // Check if explanation states a DIFFERENT option as correct
    const wrongLetters = ['A', 'B', 'C', 'D'].filter(l => l !== correctLetter);
    for (const wl of wrongLetters) {
      // e.g. "Option A is correct" when correct is B
      if (
        explanationLower.includes(`option ${wl.toLowerCase()} is correct`) ||
        explanationLower.includes(`option (${wl.toLowerCase()}) is correct`) ||
        explanationLower.includes(`correct option is ${wl.toLowerCase()}`) ||
        explanationLower.includes(`hence ${wl.toLowerCase()} is correct`)
      ) {
        explanationAgreesWithKey = false;
        errors.push(`Explanation contradiction: Explanation claims Option ${wl} is correct, but answer key is set to Option ${correctLetter}.`);
        break;
      }
    }

    // Verify explanation mentions the correct letter or option content
    const mentionsCorrectLetter = 
      explanationLower.includes(`option ${correctLetter.toLowerCase()}`) || 
      explanationLower.includes(`(${correctLetter.toLowerCase()})`) ||
      explanationLower.includes(`option ${correctLetter.toLowerCase()}`) ||
      explanationLower.includes(correctOptionText);

    if (!mentionsCorrectLetter && explanationLower.length > 50) {
      warnings.push(`Explanation does not explicitly reference Option ${correctLetter} or its text.`);
    }
  } else if (!mcq.explanation || mcq.explanation.trim().length < 15) {
    errors.push('Explanation is missing or insufficient (minimum 15 characters required).');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    distinctOptionsCount,
    hasSingleCorrectAnswer,
    explanationAgreesWithKey
  };
}
