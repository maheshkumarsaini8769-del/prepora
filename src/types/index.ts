export type ExamType = 'JEE' | 'NEET' | 'Board' | 'CBSE' | 'RBSE';
export type ClassLevel = '11' | '12';
export type SubjectName = 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type QuestionSource = 'Practice' | 'PYQ' | 'Original' | 'Original Demo' | 'Model Paper' | (string & {});
export type QuestionType = 'MCQ' | 'Numerical';

export type TimeTag = 'Speed Master' | 'Time Drainer' | 'Negative Trap' | 'Normal' | 'Unattempted';

export type MistakeReason = 
  | 'Calculation Error' 
  | 'Formula Forgot' 
  | 'Concept Not Clear' 
  | 'Misread Question' 
  | 'Wrong Option Selected' 
  | 'Ran Out of Time' 
  | 'Guess' 
  | 'Careless Mistake' 
  | 'Other';

export type CanonicalContentType = 
  | 'REAL_PYQ' 
  | 'MODEL_PAPER' 
  | 'MOCK_TEST' 
  | 'AI_GENERATED' 
  | 'QUESTION_BANK' 
  | 'SAMPLE_PAPER' 
  | 'CUSTOM_TEST';

export type ContentType = CanonicalContentType | 'PYQ' | 'PRACTICE_SET';

export type VerificationStatus = 'VERIFIED' | 'UNVERIFIED' | 'NEEDS_REVIEW' | 'SOURCE_ONLY';
export type RightsStatus = 'Public Domain' | 'Educational Fair Use' | 'Licensed' | 'Review Required';
export type AnswerKeySource = 'Official' | 'PREPORA' | 'AI_Generated';

export interface Question {
  id: string;
  exam: ExamType;
  class: ClassLevel;
  subject: SubjectName;
  chapter: string;
  topic: string;
  difficulty: DifficultyLevel;
  question: string;
  questionHi?: string;
  options: string[];
  optionsHi?: string[];
  correctAnswer: number; // 0-indexed (0=A, 1=B, 2=C, 3=D)
  explanation: string;
  explanationHi?: string;
  concept: string;
  importantPoint?: string;
  shortcutTip?: string;
  source: QuestionSource;
  contentType?: ContentType;
  sourceType?: string;
  sourceName?: string;
  sourceDocument?: string;
  sourceYear?: number;
  year?: number;
  recommendedTimeSeconds?: number;
  status?: 'Approved' | 'Pending' | 'Draft' | 'Rejected' | 'Archived';
  rejectionReason?: string;
}

export type QuestionPaletteStatus = 
  | 'not-visited'
  | 'answered'
  | 'not-answered'
  | 'marked-review'
  | 'answered-marked';

export interface TestAnswer {
  questionId: string;
  selectedAnswer: number | null; // 0-3 or null
  isAnswered: boolean;
  isMarkedForReview: boolean;
  isVisited: boolean;
  timeSpentSeconds: number;
  recommendedTimeSeconds?: number;
  timeTag?: TimeTag;
  mistakeReason?: MistakeReason;
  mistakeNote?: string;
}

export interface Test {
  id: string;
  title: string;
  exam: ExamType;
  classLevel?: ClassLevel;
  subjects: SubjectName[];
  chapters?: string[];
  totalQuestions: number;
  durationMinutes: number;
  difficulty: DifficultyLevel | 'Mixed';
  questionIds: string[];
  category: 'Full Mock' | 'Subject Test' | 'Chapter Test' | 'Custom Test' | 'PYQ Paper';
  isAttempted?: boolean;
  lastAttemptScore?: number;
  maxScore: number;
  negativeMarking: boolean;
  calculatorEnabled?: boolean;
  subjectTimePlan?: Partial<Record<SubjectName, number>>; // in minutes
}

export interface SubjectScoreBreakdown {
  subject: SubjectName;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  score: number;
  maxScore: number;
  accuracyPercentage: number;
  timeSpentSeconds?: number;
  recommendedMinutes?: number;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  timestamp: string;
  durationMinutes: number;
  timeTakenSeconds: number;
  totalScore: number;
  maxScore: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
  accuracyPercentage: number;
  answers: Record<string, TestAnswer>;
  subjectBreakdown: SubjectScoreBreakdown[];
  strongTopics: string[];
  weakTopics: string[];
  avgTimePerQuestionSeconds?: number;
  fastestQuestion?: { questionId: string; timeSpentSeconds: number; isCorrect: boolean };
  slowestQuestion?: { questionId: string; timeSpentSeconds: number; isCorrect: boolean };
  speedMasterCount?: number;
  timeDrainerCount?: number;
  negativeTrapCount?: number;
  timeCoachInsights?: string[];
}

export interface Paper {
  id: string;
  title: string;
  exam: ExamType;
  classLevel?: ClassLevel;
  board?: 'CBSE' | 'RBSE';
  subject?: SubjectName | 'Full Syllabus' | 'All';
  year: number;
  contentType: CanonicalContentType;
  paperType: 'PYQ' | 'Model Paper' | 'Mock Paper' | 'Sample Paper';
  durationMinutes: number;
  totalQuestions: number;
  session?: string;
  date?: string;
  shift?: string;
  paperNumber?: string;
  setCode?: string;
  language?: 'English' | 'Hindi' | 'Bilingual';
  sourceURL?: string;
  sourceDocument?: string;
  sourceType?: 'Official NTA' | 'Official JEE Advanced' | 'Official CBSE' | 'Official RBSE' | 'Internal' | 'Curated' | 'AI Generated';
  sourceDocumentHash?: string;
  verificationDate?: string;
  verificationStatus: VerificationStatus;
  rightsStatus?: RightsStatus;
  answerKeySource: AnswerKeySource;
  answerKeyVerified: boolean;
  description: string;
  questionIds: string[];
  fileUrl?: string;
  answerKeyUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  classLevel: ClassLevel;
  targetExam: ExamType;
  targetYear: number;
  streakDays: number;
  lastActiveDate: string;
  dailyGoalQuestions: number;
  todayQuestionsCount: number;
  overallAccuracy: number;
  testsCompletedCount: number;
}

export interface Bookmark {
  id: string;
  type: 'question' | 'test' | 'paper' | 'note';
  targetId: string;
  title: string;
  subtitle?: string;
  dateAdded: string;
}

export interface MistakeItem {
  id: string;
  questionId: string;
  exam: ExamType;
  subject: SubjectName;
  chapter: string;
  topic: string;
  lastAttemptedDate: string;
  userWrongAnswer: number;
  correctAnswer: number;
  mistakeCount: number;
  resolved: boolean;
  mistakeReason?: MistakeReason;
  mistakeNote?: string;
  questionSnippet?: string;
}

export interface FormulaCard {
  id: string;
  chapterId: string;
  chapterTitle: string;
  subject: SubjectName;
  name: string;
  formula: string;
  variables: string;
  siUnit?: string;
  importantNote?: string;
  learnedStatus?: 'unlearned' | 'need-revision' | 'mastered';
}

export interface RevisionItem {
  id: string;
  questionId: string;
  subject: SubjectName;
  chapter: string;
  topic: string;
  intervalStage: 1 | 3 | 7 | 14; // Day 1, 3, 7, 14
  nextDueDate: string;
  status: 'due-today' | 'upcoming' | 'completed';
  lastPracticedDate?: string;
}

export interface StudyNote {
  id: string;
  title: string;
  subject: SubjectName;
  chapter: string;
  content: string;
  tags: string[];
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'practice' | 'test' | 'revision' | 'achievement';
  actionUrl?: string;
}

export interface TopicWeakness {
  subject: SubjectName;
  chapter: string;
  topic: string;
  accuracy: number;
  totalAttempts: number;
  wrongCount: number;
  status: 'red' | 'yellow' | 'green'; // Red: <60%, Yellow: 60-79%, Green: >=80%
  lastPracticedDate: string;
}

// ==========================================
// PREPORA ECOSYSTEM TYPES (Task 3)
// ==========================================

export interface DailyPlanItem {
  id: string;
  title: string;
  subject: SubjectName;
  chapter: string;
  questionCount: number;
  durationMinutes: number;
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  type: 'practice' | 'test' | 'revision' | 'formula';
  actionUrl: string;
}

export interface DailyPlan {
  date: string;
  totalDurationMinutes: number;
  completedMinutes: number;
  items: DailyPlanItem[];
}

export interface TopicMastery {
  topic: string;
  topicName?: string;
  percentage: number;
  accuracy?: number;
  questionsAttempted?: number;
  status: 'green' | 'yellow' | 'red' | 'mastered' | 'learning' | 'weak';
}

export interface ChapterMastery {
  chapter?: string;
  chapterName: string;
  subject: SubjectName;
  overallMastery: number;
  conceptMastery: number;
  conceptUnderstanding?: number;
  accuracyMastery: number;
  accuracy?: number;
  speedMastery: number;
  speedVsIdeal?: number;
  hardQuestionMastery: number;
  hardQuestionsConquered?: number;
  topics: TopicMastery[];
}

export interface StudySessionSegment {
  type: 'formula' | 'practice' | 'quiz';
  title: string;
  durationMinutes: number;
  description: string;
}

export interface StudySession {
  durationMinutes: 10 | 20 | 30 | 45 | 60;
  title: string;
  segments: StudySessionSegment[];
}

export interface DoubtReply {
  id: string;
  sender: 'student' | 'mentor';
  senderName: string;
  message: string;
  timestamp: string;
}

export interface DoubtItem {
  id: string;
  subject: SubjectName;
  chapter: string;
  topic?: string;
  questionId?: string;
  questionSnippet?: string;
  studentQuestion: string;
  timestamp: string;
  status: 'resolved' | 'pending';
  replies: DoubtReply[];
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'mentor' | 'support';
  text: string;
  timestamp: string;
  read: boolean;
  attachedQuestion?: {
    id: string;
    subject: SubjectName;
    chapter: string;
    snippet: string;
  };
}

export interface MessageThread {
  id: string;
  contactName: string;
  role: 'Prepora Mentor' | 'Prep Support';
  avatar?: string;
  unreadCount: number;
  lastMessageTimestamp: string;
  messages: ChatMessage[];
}

export interface ExamReadiness {
  exam: ExamType;
  score: number; // 0 - 100
  concepts: number;
  accuracy: number;
  speed: number;
  consistency: number;
  hardQuestions: number;
  biggestImprovementArea: string;
  recommendedAction: string;
}

export type UnattemptedReason = 
  | "I didn't know the concept"
  | "I forgot the formula"
  | "I didn't have time"
  | "I thought it was too long/difficult"
  | "I wasn't sure, didn't want negative marking"
  | "I misread the question"
  | 'Ran out of time' 
  | 'Concept not known' 
  | 'Question looked difficult' 
  | 'Could not understand' 
  | 'Wanted to attempt later' 
  | 'Other';

export interface WeeklyReport {
  weekStartDate: string;
  totalQuestions: number;
  totalTests: number;
  overallAccuracy: number;
  totalStudyTimeMinutes: number;
  strongestSubject: SubjectName;
  weakestSubject: SubjectName;
  topMistakeReason: MistakeReason;
  biggestTimeProblemSubject: SubjectName;
  nextWeekRecommendations: string[];
}

export interface LeaderboardEntry {
  rank: number;
  studentName: string;
  score: number;
  accuracy: number;
  testsTaken: number;
  isUser?: boolean;
}

// ==================== TASK 4 ECOSYSTEM MODELS ====================

export type SyllabusChapterStatus = 
  | 'Not Started'
  | 'Learning'
  | 'Practicing'
  | 'Strong'
  | 'Needs Revision'
  | 'Completed';

export interface SyllabusChapter {
  id: string;
  name: string;
  subject: SubjectName;
  classLevel: ClassLevel;
  exam: ExamType;
  progressPercent: number;
  status: SyllabusChapterStatus;
  subtopics: { name: string; isMastered: boolean }[];
  weightage: 'High' | 'Medium' | 'Low';
}

export interface PlannerTask {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  subject: SubjectName;
  chapter: string;
  taskType: 'Practice' | 'Revision' | 'Test' | 'Formula' | 'Concept';
  durationMinutes: number;
  completed: boolean;
  notes?: string;
}

export interface StudentGoal {
  id: string;
  targetExam: ExamType;
  targetScore: number;
  maxScore: number;
  targetDate: string;
  currentEstimatedScore: number;
  milestones: {
    id: string;
    title: string;
    description: string;
    targetValue: number;
    currentValue: number;
    unit: string;
    achieved: boolean;
    rewardBadge: string;
  }[];
}

export type QuestionReportReason =
  | 'Wrong Answer'
  | 'Wrong Explanation'
  | 'Typo'
  | 'Duplicate'
  | 'Poor Question'
  | 'Image Problem'
  | 'Other';

export interface QuestionReport {
  id: string;
  questionId: string;
  questionSnippet: string;
  subject: SubjectName;
  chapter: string;
  reason: QuestionReportReason;
  message?: string;
  createdAt: string;
  status: 'Pending' | 'Reviewed' | 'Resolved' | 'Dismissed';
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Notes' | 'Formula Sheets' | 'Flashcards' | 'Practice' | 'PYQs' | 'Model Papers' | 'Tests' | 'Mistakes' | 'Revision';
  subject: SubjectName;
  chapter: string;
  classLevel: ClassLevel;
  exam: ExamType;
  downloadUrl?: string;
  actionUrl: string;
  itemCount?: string;
  fileSize?: string;
  description: string;
}

export interface SpeedPracticeConfig {
  durationSeconds: 30 | 60 | 90 | 120;
  subject: SubjectName;
  chapter?: string;
  difficulty: DifficultyLevel;
  questionCount: number;
}

export type RecommendationPriorityType = 
  | 'weakness_drill'
  | 'critical_weakness'
  | 'spaced_repetition'
  | 'session_continuation'
  | 'high_impact_chapter'
  | 'daily_maintenance';

export interface TopStudyRecommendation {
  type: RecommendationPriorityType;
  priorityBadge: string;
  subject: SubjectName;
  chapter: string;
  topic: string;
  accuracy: number;
  mistakeCount: number;
  examWeightage: string;
  reasons: string[];
  estimatedMinutes: number;
  questionCount: number;
  actionUrl: string;
  actionLabel: string;
  secondaryActionText: string;
  secondaryActionUrl: string;
}

