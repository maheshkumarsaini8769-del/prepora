import { canonicalSyllabus } from '../data/canonicalSyllabusData.js';

function normalizeChapterKey(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]/g, '');
}

function getWordTokens(s: string): Set<string> {
  const words = (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && w !== 'and' && w !== 'the' && w !== 'some' && w !== 'part');
  return new Set(words);
}

function tokenSimilarity(tokensA: Set<string>, tokensB: Set<string>): number {
  if (tokensA.size === 0 || tokensB.size === 0) return 0;
  let matches = 0;
  for (const t of tokensA) {
    if (tokensB.has(t)) matches++;
  }
  return matches / Math.min(tokensA.size, tokensB.size);
}

export interface ChapterMetadata {
  order: number; // Continuous canonical order: 1..28 for Physics, etc.
  classChapterNumber: number; // Class-relative chapter number (1..14 for Class 11, 1..14 for Class 12)
  classLevel: string; // '11' | '12'
  subject: string;
  canonicalName: string;
  topics?: { name: string; order: number }[];
}

// Global cached lookup maps for ultra-fast, robust canonical lookup
const exactClassChapterMap = new Map<string, ChapterMetadata>();
const subjectChapterMap = new Map<string, Map<string, ChapterMetadata>>();
const subjectChapterList = new Map<string, { meta: ChapterMetadata; tokens: Set<string> }[]>();
const globalChapterMap = new Map<string, ChapterMetadata>();
const topicOrderMap = new Map<string, number>();

// Standard class 11 chapter counts for NCERT curriculum
const class11ChapterCountMap: Record<string, number> = {
  physics: 14,
  chemistry: 15,
  mathematics: 14,
  biology: 19
};

// Initialize maps once from canonical syllabus
canonicalSyllabus.forEach((ch) => {
  const normKey = normalizeChapterKey(ch.name);
  const subNorm = (ch.subjectName || '').toLowerCase().trim();
  const c11Count = class11ChapterCountMap[subNorm] || 15;
  const classNum =
    ch.classLevel === '12' && ch.order > c11Count ? ch.order - c11Count : ch.order;

  const topicsList = Array.isArray(ch.topics)
    ? ch.topics.map((t) => ({ name: t.name, order: t.order }))
    : [];

  const meta: ChapterMetadata = {
    order: ch.order,
    classChapterNumber: classNum,
    classLevel: String(ch.classLevel || '11'),
    subject: ch.subjectName,
    canonicalName: ch.name,
    topics: topicsList
  };

  // Cache topics order
  if (Array.isArray(ch.topics)) {
    ch.topics.forEach((top) => {
      const topKey = `${normKey}:${normalizeChapterKey(top.name)}`;
      if (!topicOrderMap.has(topKey)) {
        topicOrderMap.set(topKey, top.order);
      }
    });
  }

  // Exact Subject + Class map (solves Relations and Functions in 11 vs 12, etc.)
  exactClassChapterMap.set(`${subNorm}:${normKey}:${ch.classLevel}`, meta);

  // Subject-specific map
  if (!subjectChapterMap.has(subNorm)) {
    subjectChapterMap.set(subNorm, new Map());
  }
  const subMap = subjectChapterMap.get(subNorm)!;
  if (!subMap.has(normKey) || ch.examId === 'JEE_MAIN' || ch.examId === 'NEET_UG') {
    subMap.set(normKey, meta);
  }

  // Subject list for token similarity
  if (!subjectChapterList.has(subNorm)) {
    subjectChapterList.set(subNorm, []);
  }
  subjectChapterList.get(subNorm)!.push({
    meta,
    tokens: getWordTokens(ch.name)
  });

  // Global map
  if (!globalChapterMap.has(normKey) || ch.examId === 'JEE_MAIN' || ch.examId === 'NEET_UG') {
    globalChapterMap.set(normKey, meta);
  }
});

/**
 * Standard subject sort rank for consistent curriculum sequence:
 * 1. Physics
 * 2. Chemistry
 * 3. Mathematics
 * 4. Biology
 */
export function getSubjectSortRank(subject?: string): number {
  if (!subject) return 50000;
  const s = subject.toLowerCase().trim();
  if (s.includes('physic')) return 10000;
  if (s.includes('chem')) return 20000;
  if (s.includes('math')) return 30000;
  if (s.includes('bio')) return 40000;
  return 50000;
}

/**
 * Retrieves the canonical order, class level, class-specific chapter number,
 * and official title of any chapter variant.
 */
export function getChapterOrderInfo(
  chapterName: string,
  subjectName?: string,
  classLevel?: string
): ChapterMetadata {
  const normKey = normalizeChapterKey(chapterName);
  const subNorm = subjectName ? subjectName.toLowerCase().trim() : null;

  // 1. Try exact match with class level if provided
  if (subNorm && classLevel && classLevel !== 'All') {
    const exactClassMatch = exactClassChapterMap.get(`${subNorm}:${normKey}:${classLevel}`);
    if (exactClassMatch) return exactClassMatch;
  }

  // 2. Try subject-specific exact match
  if (subNorm && subjectChapterMap.has(subNorm)) {
    const subMap = subjectChapterMap.get(subNorm)!;
    const match = subMap.get(normKey);
    if (match) return match;

    // Substring match within subject
    for (const [key, val] of subMap.entries()) {
      if (normKey.includes(key) || key.includes(normKey)) {
        return val;
      }
    }

    // Token similarity within subject (solves "Organic Chemistry: Basic Principles..." vs "Some Basic Principles...")
    const queryTokens = getWordTokens(chapterName);
    const subItems = subjectChapterList.get(subNorm) || [];
    let bestSim = 0;
    let bestMeta: ChapterMetadata | null = null;
    for (const item of subItems) {
      const sim = tokenSimilarity(queryTokens, item.tokens);
      if (sim > bestSim && sim >= 0.75) {
        bestSim = sim;
        bestMeta = item.meta;
      }
    }
    if (bestMeta) return bestMeta;
  }

  // 3. Try global exact match
  const direct = globalChapterMap.get(normKey);
  if (direct) return direct;

  // 4. Try global substring match
  for (const [key, val] of globalChapterMap.entries()) {
    if (normKey.includes(key) || key.includes(normKey)) {
      return val;
    }
  }

  // Fallback for unlisted / custom chapters
  return {
    order: 999,
    classChapterNumber: 99,
    classLevel: classLevel && (classLevel === '11' || classLevel === '12') ? classLevel : '11',
    subject: subjectName || 'General',
    canonicalName: chapterName
  };
}

/**
 * Retrieves the canonical order of a topic within a chapter (1, 2, 3...).
 */
export function getTopicSortRank(chapterName: string, topicName?: string): number {
  if (!topicName) return 1;
  const topKey = `${normalizeChapterKey(chapterName)}:${normalizeChapterKey(topicName)}`;
  if (topicOrderMap.has(topKey)) {
    return topicOrderMap.get(topKey)!;
  }
  // Try substring
  for (const [k, ord] of topicOrderMap.entries()) {
    if (k.startsWith(normalizeChapterKey(chapterName)) && k.includes(normalizeChapterKey(topicName))) {
      return ord;
    }
  }
  return 50;
}

/**
 * Computes a numeric rank for sequence sorting:
 * Physics Class 11 -> 11001..11014
 * Physics Class 12 -> 12015..12028
 * Chemistry Class 11 -> 21001..21015
 * Chemistry Class 12 -> 22016..22031
 * Mathematics Class 11 -> 31001..31014
 * Mathematics Class 12 -> 32015..32027
 * Biology Class 11 -> 41001..41019
 * Biology Class 12 -> 42020..42032
 */
export function getChapterSortRank(
  chapterName: string,
  subjectName?: string,
  classLevel?: string
): number {
  if (chapterName === 'All' || chapterName === 'ALL' || chapterName === 'All Chapters') {
    return -1; // Keep 'All' at the very top
  }
  const info = getChapterOrderInfo(chapterName, subjectName, classLevel);
  const subRank = getSubjectSortRank(info.subject || subjectName);
  const targetClass = classLevel && classLevel !== 'All' ? classLevel : info.classLevel;
  const classBase = targetClass === '12' ? 2000 : 1000;
  if (info.order === 999) return subRank + 9000;
  return subRank + classBase + info.order;
}

/**
 * Formats a chapter name with its official S.No. / Chapter Number for clean dropdown display.
 */
export function formatChapterDropdownLabel(
  chapterName: string,
  subjectName?: string,
  classLevel?: string,
  context?: { isSubjectAll?: boolean; isClassAll?: boolean }
): string {
  if (chapterName === 'All' || chapterName === 'ALL' || chapterName === 'All Chapters') {
    return 'All Chapters';
  }
  const info = getChapterOrderInfo(chapterName, subjectName, classLevel);
  if (info.order === 999) return chapterName;

  const chNum = info.classChapterNumber;
  const sNoStr = `S.No ${info.order < 10 ? '0' + info.order : info.order}`;
  const chLabel = `Ch ${chNum}`;

  if (context?.isSubjectAll) {
    return `${info.subject} • Class ${info.classLevel} • ${sNoStr} • ${chLabel}: ${info.canonicalName || chapterName}`;
  }
  if (context?.isClassAll) {
    return `Class ${info.classLevel} • ${sNoStr} • ${chLabel}: ${info.canonicalName || chapterName}`;
  }
  return `${sNoStr} • ${chLabel}: ${info.canonicalName || chapterName}`;
}

/**
 * Sorts an array of chapter names according to official NCERT / standard curriculum line-wise sequence.
 */
export function sortChapterNamesCanonical(
  chapters: string[],
  subjectName?: string,
  classLevel?: string
): string[] {
  return [...chapters].sort((a, b) => {
    const rankA = getChapterSortRank(a, subjectName, classLevel);
    const rankB = getChapterSortRank(b, subjectName, classLevel);
    if (rankA !== rankB) return rankA - rankB;
    return a.localeCompare(b);
  });
}

/**
 * Sorts any list of objects containing chapter references according to official curriculum order,
 * including topic-order tie-breaking.
 */
export function sortChaptersCanonical<T>(
  items: T[],
  getChapterName: (item: T) => string,
  getSubjectName?: (item: T) => string | undefined,
  getClassLevel?: (item: T) => string | undefined,
  getTopicName?: (item: T) => string | undefined
): T[] {
  return [...items].sort((a, b) => {
    const chA = getChapterName(a);
    const chB = getChapterName(b);
    const subA = getSubjectName ? getSubjectName(a) : undefined;
    const subB = getSubjectName ? getSubjectName(b) : undefined;
    const clsA = getClassLevel ? getClassLevel(a) : undefined;
    const clsB = getClassLevel ? getClassLevel(b) : undefined;

    const rankA = getChapterSortRank(chA, subA, clsA);
    const rankB = getChapterSortRank(chB, subB, clsB);
    if (rankA !== rankB) return rankA - rankB;

    // If same chapter, sort by topic order
    if (getTopicName) {
      const topA = getTopicName(a);
      const topB = getTopicName(b);
      if (topA || topB) {
        if (!topA) return -1; // Full chapter video before topic videos
        if (!topB) return 1;
        const topRankA = getTopicSortRank(chA, topA);
        const topRankB = getTopicSortRank(chB, topB);
        if (topRankA !== topRankB) return topRankA - topRankB;
        return topA.localeCompare(topB);
      }
    }

    return chA.localeCompare(chB);
  });
}
