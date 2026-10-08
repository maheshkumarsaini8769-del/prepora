import { canonicalSyllabus } from '../data/canonicalSyllabusData';

function normalizeChapterKey(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]/g, '');
}

interface ChapterMetadata {
  order: number;
  classLevel: string;
  subject: string;
  canonicalName: string;
}

// Global cached lookup maps for ultra-fast, robust canonical lookup
const globalChapterMap = new Map<string, ChapterMetadata>();
const subjectChapterMap = new Map<string, Map<string, ChapterMetadata>>();

// Initialize maps once
canonicalSyllabus.forEach((ch) => {
  const normKey = normalizeChapterKey(ch.name);
  const subNorm = (ch.subjectName || '').toLowerCase().trim();
  const meta: ChapterMetadata = {
    order: ch.order,
    classLevel: String(ch.classLevel || '11'),
    subject: ch.subjectName,
    canonicalName: ch.name
  };

  // Subject-specific map
  if (!subjectChapterMap.has(subNorm)) {
    subjectChapterMap.set(subNorm, new Map());
  }
  const subMap = subjectChapterMap.get(subNorm)!;
  if (!subMap.has(normKey) || ch.examId === 'JEE_MAIN' || ch.examId === 'NEET_UG') {
    subMap.set(normKey, meta);
  }

  // Global map
  if (!globalChapterMap.has(normKey) || ch.examId === 'JEE_MAIN' || ch.examId === 'NEET_UG') {
    globalChapterMap.set(normKey, meta);
  }
});

/**
 * Retrieves the canonical order, class level, and official title of any chapter variant.
 */
export function getChapterOrderInfo(
  chapterName: string,
  subjectName?: string
): ChapterMetadata {
  const normKey = normalizeChapterKey(chapterName);
  const subNorm = subjectName ? subjectName.toLowerCase().trim() : null;

  // 1. Try subject-specific exact match
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
  }

  // 2. Try global exact match
  const direct = globalChapterMap.get(normKey);
  if (direct) return direct;

  // 3. Try global substring match
  for (const [key, val] of globalChapterMap.entries()) {
    if (normKey.includes(key) || key.includes(normKey)) {
      return val;
    }
  }

  // Fallback for unlisted / custom chapters: push to bottom with high order number
  return {
    order: 999,
    classLevel: '12',
    subject: subjectName || 'General',
    canonicalName: chapterName
  };
}

/**
 * Computes a numeric rank for sequence sorting:
 * Class 11 chapters come first (Rank = 1000 + order),
 * Class 12 chapters come next (Rank = 2000 + order),
 * Custom / Unlisted chapters come at the very end (Rank = 9000).
 */
export function getChapterSortRank(
  chapterName: string,
  subjectName?: string
): number {
  if (chapterName === 'All' || chapterName === 'ALL' || chapterName === 'All Chapters') {
    return -1; // Keep 'All' at the very top
  }
  const info = getChapterOrderInfo(chapterName, subjectName);
  if (info.order === 999) return 9000;
  const classBase = info.classLevel === '12' ? 2000 : 1000;
  return classBase + info.order;
}

/**
 * Sorts an array of chapter names according to official NCERT / standard curriculum line-wise sequence.
 */
export function sortChapterNamesCanonical(
  chapters: string[],
  subjectName?: string
): string[] {
  return [...chapters].sort((a, b) => {
    const rankA = getChapterSortRank(a, subjectName);
    const rankB = getChapterSortRank(b, subjectName);
    if (rankA !== rankB) return rankA - rankB;
    return a.localeCompare(b);
  });
}

/**
 * Sorts any list of objects containing chapter references according to official curriculum order.
 */
export function sortChaptersCanonical<T>(
  items: T[],
  getChapterName: (item: T) => string,
  getSubjectName?: (item: T) => string | undefined
): T[] {
  return [...items].sort((a, b) => {
    const chA = getChapterName(a);
    const chB = getChapterName(b);
    const subA = getSubjectName ? getSubjectName(a) : undefined;
    const subB = getSubjectName ? getSubjectName(b) : undefined;
    const rankA = getChapterSortRank(chA, subA);
    const rankB = getChapterSortRank(chB, subB);
    if (rankA !== rankB) return rankA - rankB;
    return chA.localeCompare(chB);
  });
}
