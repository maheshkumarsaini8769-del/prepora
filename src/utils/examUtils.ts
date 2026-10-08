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

/**
 * Returns allowed class scopes based on the student's profile.
 * - If student is in Class 11: strictly Class 11 (Class 12 and Dropper/Full Syllabus are hidden).
 * - If student is in Class 12: Class 12, Class 11 (Revision), and All Classes.
 * - If student is Dropper: All (Full Syllabus), Class 11, Class 12.
 */
export function getAllowedClassScopes(userClassLevel?: string): { id: string; label: string }[] {
  const norm = (userClassLevel || '11').toString().trim();
  if (norm === '11') {
    return [{ id: '11', label: 'Class 11' }];
  }
  if (norm === '12') {
    return [
      { id: '12', label: 'Class 12' },
      { id: '11', label: 'Class 11 (Revision)' },
      { id: 'All', label: 'All Classes' }
    ];
  }
  return [
    { id: 'All', label: 'All (Full Syllabus / Dropper)' },
    { id: '11', label: 'Class 11' },
    { id: '12', label: 'Class 12' }
  ];
}

/**
 * Checks whether the user is strictly in Class 11
 */
export function isClass11User(userClassLevel?: string): boolean {
  const norm = (userClassLevel || '').toString().trim();
  return norm === '11';
}

/**
 * Ensures class query/filter adheres to student profile boundaries
 */
export function sanitizeClassForProfile(requestedClass?: string, userClassLevel?: string): string {
  if (isClass11User(userClassLevel)) {
    return '11';
  }
  return requestedClass || userClassLevel || '11';
}

