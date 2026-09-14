import mongoose, { Schema, Document } from 'mongoose';

// Mistake Schema
export interface IMistake extends Document {
  id: string;
  userId: string;
  questionId: string;
  testAttemptId?: string;
  mistakeReason: string;
  mistakeNote?: string;
  repeatedCount: number;
  resolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MistakeSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    questionId: { type: String, required: true, index: true },
    testAttemptId: { type: String },
    mistakeReason: { type: String, required: true },
    mistakeNote: { type: String, default: '' },
    repeatedCount: { type: Number, default: 1 },
    resolved: { type: Boolean, default: false }
  },
  { timestamps: true }
);
MistakeSchema.index({ userId: 1, questionId: 1 });
export const Mistake = mongoose.model<IMistake>('Mistake', MistakeSchema);

// Bookmark Schema
export interface IBookmark extends Document {
  id: string;
  userId: string;
  itemType: 'question' | 'test' | 'paper' | 'note' | 'formula' | 'flashcard';
  itemId: string;
  createdAt: Date;
}
const BookmarkSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    itemType: { type: String, required: true },
    itemId: { type: String, required: true }
  },
  { timestamps: true }
);
BookmarkSchema.index({ userId: 1, itemType: 1, itemId: 1 });
export const Bookmark = mongoose.model<IBookmark>('Bookmark', BookmarkSchema);

// Note Schema
export interface INote extends Document {
  id: string;
  userId: string;
  title: string;
  content: string;
  subject?: string;
  chapter?: string;
  topic?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
const NoteSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, default: '' },
    subject: { type: String },
    chapter: { type: String },
    topic: { type: String },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);
NoteSchema.index({ userId: 1, updatedAt: -1 });
export const Note = mongoose.model<INote>('Note', NoteSchema);

// Doubt Schema
export interface IDoubt extends Document {
  id: string;
  userId: string;
  questionId?: string;
  subject: string;
  chapter?: string;
  topic?: string;
  message: string;
  status: 'Open' | 'In Review' | 'Answered' | 'Closed';
  reply?: string;
  createdAt: Date;
  updatedAt: Date;
}
const DoubtSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    questionId: { type: String },
    subject: { type: String, required: true },
    chapter: { type: String },
    topic: { type: String },
    message: { type: String, required: true },
    status: { type: String, default: 'Open', enum: ['Open', 'In Review', 'Answered', 'Closed'], index: true },
    reply: { type: String }
  },
  { timestamps: true }
);
export const Doubt = mongoose.model<IDoubt>('Doubt', DoubtSchema);

// Report Schema
export interface IQuestionReport extends Document {
  id: string;
  userId: string;
  userEmail?: string;
  questionId: string;
  reason: string;
  message?: string;
  status: 'Pending' | 'Under Review' | 'Reviewed' | 'Resolved' | 'Rejected' | 'Dismissed';
  adminNotes?: string;
  createdAt: Date;
  resolvedAt?: Date;
}
const QuestionReportSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    userEmail: { type: String },
    questionId: { type: String, required: true, index: true },
    reason: { type: String, required: true },
    message: { type: String, default: '' },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Under Review', 'Reviewed', 'Resolved', 'Rejected', 'Dismissed'],
      index: true
    },
    adminNotes: { type: String, default: '' },
    resolvedAt: { type: Date }
  },
  { timestamps: true }
);
export const QuestionReport = mongoose.model<IQuestionReport>('QuestionReport', QuestionReportSchema);

// Goal Schema
export interface IGoal extends Document {
  id: string;
  userId: string;
  exam: string;
  targetScore: number;
  targetDate: string;
  currentScore: number;
  progressPercentage: number;
  milestones: Array<{ id: string; title: string; targetScore: number; completed: boolean }>;
}
const GoalSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    exam: { type: String, required: true },
    targetScore: { type: Number, required: true },
    targetDate: { type: String, required: true },
    currentScore: { type: Number, default: 0 },
    progressPercentage: { type: Number, default: 0 },
    milestones: { type: [Schema.Types.Mixed], default: [] }
  },
  { timestamps: true }
);
export const Goal = mongoose.model<IGoal>('Goal', GoalSchema);
