/**
 * Text Similarity & Duplicate Question Detection Engine
 * Uses Levenshtein Distance and Token Jaccard Index with normalization
 */

// Normalize text: lowercase, remove punctuation, strip math formatting variances
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Tokenize text into words / n-grams
export function getTokens(text: string): Set<string> {
  const norm = normalizeText(text);
  const words = norm.split(' ').filter(w => w.length > 1);
  return new Set(words);
}

// Jaccard similarity between two sets of tokens (0 to 1)
export function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (!setA || !setB || typeof setA.forEach !== 'function' || typeof setB.has !== 'function') return 0;
  if (setA.size === 0 && setB.size === 0) return 1;
  if (setA.size === 0 || setB.size === 0) return 0;

  let intersectionCount = 0;
  setA.forEach((token) => {
    if (setB.has(token)) {
      intersectionCount++;
    }
  });

  const unionCount = setA.size + setB.size - intersectionCount;
  return unionCount === 0 ? 0 : intersectionCount / unionCount;
}

// Levenshtein distance for fuzzy character matching
export function levenshteinDistance(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;

  // Cap length to prevent high CPU for huge paragraphs
  const strA = a.slice(0, 300);
  const strB = b.slice(0, 300);
  const m = strA.length;
  const n = strB.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= m; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = strA[i - 1] === strB[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[m][n];
}

export function levenshteinSimilarity(a: string, b: string): number {
  const normA = normalizeText(a);
  const normB = normalizeText(b);
  if (normA === normB) return 1.0;
  const maxLen = Math.max(normA.length, normB.length);
  if (maxLen === 0) return 1.0;
  const distance = levenshteinDistance(normA, normB);
  return Math.max(0, 1 - distance / maxLen);
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  similarityScore: number; // 0 to 100
  matchType: 'exact' | 'similar' | 'possible' | 'none';
  matchedQuestionId?: string;
  matchedQuestionText?: string;
  matchedTopic?: string;
  matchedSource?: string;
}

export function compareQuestions(
  newQ: { question: string; options?: string[]; topic?: string; correctAnswer?: number },
  existingQ: { id: string; question: string; options?: string[]; topic?: string; source?: string; correctAnswer?: number }
): DuplicateCheckResult {
  const normNew = normalizeText(newQ.question);
  const normExisting = normalizeText(existingQ.question);

  // Exact question text match
  if (normNew === normExisting && normNew.length > 5) {
    return {
      isDuplicate: true,
      similarityScore: 100,
      matchType: 'exact',
      matchedQuestionId: existingQ.id,
      matchedQuestionText: existingQ.question,
      matchedTopic: existingQ.topic,
      matchedSource: existingQ.source
    };
  }

  // Token Jaccard similarity
  const tokensNew = getTokens(newQ.question);
  const tokensExisting = getTokens(existingQ.question);
  const tokenSim = jaccardSimilarity(tokensNew, tokensExisting);

  // Levenshtein similarity
  const charSim = levenshteinSimilarity(newQ.question, existingQ.question);

  // Weighted composite score (60% token overlap + 40% character fuzzy)
  let compositeSim = tokenSim * 0.6 + charSim * 0.4;

  // Boost if topic matches
  if (newQ.topic && existingQ.topic && newQ.topic.toLowerCase() === existingQ.topic.toLowerCase()) {
    compositeSim = Math.min(1.0, compositeSim + 0.05);
  }

  // Check options overlap if provided
  if (newQ.options && existingQ.options && newQ.options.length > 0 && existingQ.options.length > 0) {
    const optMatchCount = newQ.options.filter(opt =>
      existingQ.options!.some(exOpt => normalizeText(opt) === normalizeText(exOpt))
    ).length;
    if (optMatchCount >= 3) {
      compositeSim = Math.min(1.0, compositeSim + 0.15);
    }
  }

  const scorePercentage = Math.round(compositeSim * 100);

  if (scorePercentage >= 85) {
    return {
      isDuplicate: true,
      similarityScore: scorePercentage,
      matchType: 'similar',
      matchedQuestionId: existingQ.id,
      matchedQuestionText: existingQ.question,
      matchedTopic: existingQ.topic,
      matchedSource: existingQ.source
    };
  }

  if (scorePercentage >= 65) {
    return {
      isDuplicate: true,
      similarityScore: scorePercentage,
      matchType: 'possible',
      matchedQuestionId: existingQ.id,
      matchedQuestionText: existingQ.question,
      matchedTopic: existingQ.topic,
      matchedSource: existingQ.source
    };
  }

  return {
    isDuplicate: false,
    similarityScore: scorePercentage,
    matchType: 'none'
  };
}
