export interface DuplicateCheckResult {
  isDuplicate: boolean;
  confidence: number; // 0 to 1.0
  similarity: number; // 0 to 1.0
  duplicateType?: 'exact' | 'near' | 'structural' | 'semantic';
  matchedId?: string;
  matchedSnippet?: string;
  reason?: string;
}

/**
 * Normalizes question string or object for exact and structural hashing
 */
function normalizeForComparison(val: any): string {
  const str = typeof val === 'string' ? val : (val?.question || String(val || ''));
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generates character 3-grams for Jaccard similarity
 */
function getTrigrams(val: any): Set<string> {
  const norm = normalizeForComparison(val);
  const set = new Set<string>();
  for (let i = 0; i <= norm.length - 3; i++) {
    set.add(norm.slice(i, i + 3));
  }
  return set;
}

/**
 * Calculates Jaccard n-gram similarity coefficient
 */
function jaccardTrigramSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Multi-Tier Duplicate Detection Engine:
 * Tier 1: Exact normalized text match (Confidence 1.0)
 * Tier 2: Trigram Jaccard similarity >= 0.75 (Near Duplicate, Confidence 0.85 - 0.95)
 * Tier 3: Structural isomorphism (identical sentence structure with only numbers replaced)
 */
export function checkQuestionDuplicate(
  candidate: string | { question: string; options?: string[] },
  existingQuestions: Array<{ id?: string; question: string; options?: string[] }>
): DuplicateCheckResult {
  const normCandidate = normalizeForComparison(candidate);
  const candidateTrigrams = getTrigrams(candidate);

  // Mask numbers for structural duplicate check: "A ball of 5kg moving at 10m/s" -> "A ball of NUMkg moving at NUMm/s"
  const candidateMasked = normCandidate.replace(/\b\d+(\.\d+)?\b/g, '<NUM>');

  for (const item of existingQuestions) {
    const normExisting = normalizeForComparison(item.question);

    // Tier 1: Exact Match
    if (normCandidate === normExisting) {
      return {
        isDuplicate: true,
        confidence: 1.0,
        similarity: 1.0,
        duplicateType: 'exact',
        matchedId: item.id,
        matchedSnippet: item.question.slice(0, 80),
        reason: 'Exact verbatim question match detected in database.'
      };
    }

    // Tier 2: Structural Isomorphism (Same text structure with modified numerical parameters)
    const existingMasked = normExisting.replace(/\b\d+(\.\d+)?\b/g, '<NUM>');
    if (candidateMasked === existingMasked && candidateMasked.includes('<NUM>')) {
      return {
        isDuplicate: true,
        confidence: 0.92,
        similarity: 0.92,
        duplicateType: 'structural',
        matchedId: item.id,
        matchedSnippet: item.question.slice(0, 80),
        reason: 'Structural duplicate detected: Identical problem sentence with only numeric constants modified.'
      };
    }

    // Tier 3: High-similarity Near Duplicate
    const existingTrigrams = getTrigrams(item.question);
    const sim = jaccardTrigramSimilarity(candidateTrigrams, existingTrigrams);

    if (sim >= 0.78) {
      return {
        isDuplicate: true,
        confidence: Math.round(sim * 100) / 100,
        similarity: Math.round(sim * 100) / 100,
        duplicateType: 'near',
        matchedId: item.id,
        matchedSnippet: item.question.slice(0, 80),
        reason: `High lexical similarity (${Math.round(sim * 100)}%) detected. Nearly identical wording to existing question.`
      };
    }
  }

  return {
    isDuplicate: false,
    confidence: 0,
    similarity: 0
  };
}
