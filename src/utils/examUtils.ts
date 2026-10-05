import { SubjectName, ExamType } from '../types';

/**
 * Single source of truth for exam-specific subject mapping across Prepora.
 * Enforces strict academic boundaries:
 * - JEE (Main & Advanced): Physics, Chemistry, Mathematics (NEVER Biology)
 * - NEET (UG): Physics, Chemistry, Biology (NEVER Mathematics)
 * - CBSE / RBSE Class 11/12: Defaults to student stream
 */
export function getAllowedSubjectsForExam(targetExam?: string | ExamType): SubjectName[] {
  const norm = (targetExam || 'JEE').toString().toUpperCase().trim();
  if (norm.includes('NEET')) {
    return ['Physics', 'Chemistry', 'Biology'];
  }
  // JEE and engineering streams
  return ['Physics', 'Chemistry', 'Mathematics'];
}

export function isSubjectAllowedForExam(subject: string, targetExam?: string | ExamType): boolean {
  if (!subject || subject === 'All') return true;
  const allowed = getAllowedSubjectsForExam(targetExam);
  return allowed.some(s => s.toLowerCase() === subject.toLowerCase().trim());
}

export function sanitizeSubjectForExam(subject: SubjectName | 'All', targetExam?: string | ExamType): SubjectName {
  if (subject === 'All') return 'Physics';
  const allowed = getAllowedSubjectsForExam(targetExam);
  if (allowed.includes(subject)) return subject;
  return allowed[0] || 'Physics';
}
