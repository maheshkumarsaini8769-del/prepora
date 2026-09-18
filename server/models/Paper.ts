import mongoose, { Schema, Document } from 'mongoose';

export interface IPaper extends Document {
  id: string;
  title: string;
  exam: 'JEE' | 'NEET' | 'CBSE' | 'RBSE' | 'Board';
  classLevel?: '10' | '11' | '12';
  board?: 'CBSE' | 'RBSE' | 'National';
  subject?: string;
  year: number;
  contentType: 'REAL_PYQ' | 'MODEL_PAPER' | 'MOCK_TEST' | 'AI_GENERATED' | 'QUESTION_BANK' | 'SAMPLE_PAPER' | 'CUSTOM_TEST';
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
  verificationStatus: 'VERIFIED' | 'UNVERIFIED' | 'NEEDS_REVIEW' | 'SOURCE_ONLY';
  rightsStatus?: 'Public Domain' | 'Educational Fair Use' | 'Licensed' | 'Review Required';
  answerKeySource: 'Official' | 'PREPORA' | 'AI_Generated';
  answerKeyVerified: boolean;
  description: string;
  questionIds: string[];
  fileUrl?: string;
  answerKeyUrl?: string;
  source: 'Official' | 'Internal' | 'Curated';
  status: 'Published' | 'Draft' | 'Archived';
  downloadsCount: number;
  attemptsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PaperSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    exam: {
      type: String,
      required: true,
      enum: ['JEE', 'NEET', 'CBSE', 'RBSE', 'Board'],
      index: true
    },
    classLevel: { type: String, default: '12' },
    board: { type: String, enum: ['CBSE', 'RBSE', 'National'] },
    subject: { type: String, default: 'Full Syllabus' },
    year: { type: Number, required: true, index: true },
    contentType: {
      type: String,
      required: true,
      enum: ['REAL_PYQ', 'MODEL_PAPER', 'MOCK_TEST', 'AI_GENERATED', 'QUESTION_BANK', 'SAMPLE_PAPER', 'CUSTOM_TEST'],
      default: 'REAL_PYQ',
      index: true
    },
    paperType: {
      type: String,
      required: true,
      enum: ['PYQ', 'Model Paper', 'Mock Paper', 'Sample Paper'],
      default: 'PYQ',
      index: true
    },
    durationMinutes: { type: Number, default: 180 },
    totalQuestions: { type: Number, default: 75 },
    session: { type: String, default: '' },
    date: { type: String, default: '' },
    shift: { type: String, default: '' },
    paperNumber: { type: String, default: '' },
    setCode: { type: String, default: '' },
    language: { type: String, enum: ['English', 'Hindi', 'Bilingual'], default: 'English' },
    sourceURL: { type: String, default: '' },
    sourceDocument: { type: String, default: '' },
    sourceType: {
      type: String,
      enum: ['Official NTA', 'Official JEE Advanced', 'Official CBSE', 'Official RBSE', 'Internal', 'Curated', 'AI Generated'],
      default: 'Official NTA'
    },
    sourceDocumentHash: { type: String, default: '' },
    verificationDate: { type: String, default: '' },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'UNVERIFIED', 'NEEDS_REVIEW', 'SOURCE_ONLY'],
      default: 'VERIFIED',
      index: true
    },
    rightsStatus: {
      type: String,
      enum: ['Public Domain', 'Educational Fair Use', 'Licensed', 'Review Required'],
      default: 'Educational Fair Use'
    },
    answerKeySource: {
      type: String,
      enum: ['Official', 'PREPORA', 'AI_Generated'],
      default: 'Official'
    },
    answerKeyVerified: { type: Boolean, default: true },
    description: { type: String, default: '' },
    questionIds: { type: [String], default: [] },
    fileUrl: { type: String, default: '' },
    answerKeyUrl: { type: String, default: '' },
    source: {
      type: String,
      enum: ['Official', 'Internal', 'Curated'],
      default: 'Official'
    },
    status: {
      type: String,
      enum: ['Published', 'Draft', 'Archived'],
      default: 'Published',
      index: true
    },
    downloadsCount: { type: Number, default: 0 },
    attemptsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

PaperSchema.index({ contentType: 1, exam: 1, year: -1, status: 1 });
PaperSchema.index({ exam: 1, year: -1, status: 1 });
PaperSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IPaper>('Paper', PaperSchema);
