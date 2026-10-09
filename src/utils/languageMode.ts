/**
 * Language Mode Detection for NEET-UG AI Teacher (Frontend & Shared Utils)
 * Detects whether the student asked in Hindi/Hinglish or English.
 */

export function detectLanguageMode(query: string): 'hinglish' | 'english' {
  if (!query || typeof query !== 'string') return 'english';
  if (/[\u0900-\u097F]/.test(query)) {
    return 'hinglish';
  }
  const qLower = query.toLowerCase();
  const hindiIndicators = [
    'kya', 'hai', 'kaise', 'hota', 'karo', 'batao', 'samjhao', 'kripya', 'kyun', 'nahi', 'ye', 'wo',
    'kaha', 'kitna', 'kon', 'kaun', 'chahiye', 'hoga', 'wali', 'wala', 'sir', 'bhai', 'dikhao',
    'me', 'se', 'ko', 'ke', 'ki', 'bhi', 'kuch', 'pehle', 'baad', 'ek', 'do', 'aur', 'par',
    'sawal', 'prashn', 'sutra', 'udaharana', 'dekh', 'deko', 'toh', 'to', 'smjao', 'smjhao', 'smje', 'samjhe'
  ];
  const words = qLower.split(/\s+/);
  const hasHinglish = words.some(w => hindiIndicators.includes(w));
  return hasHinglish ? 'hinglish' : 'english';
}
