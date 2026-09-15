import mongoose, { Schema, Document } from 'mongoose';

export interface IPaper extends Document {
  id: string;
  title: string;
  exam: 'JEE' | 'NEET' | 'CBSE' | 'RBSE' | 'Board';
  classLevel?: '10' | '11' | '12';
  board?: 'CBSE' | 'RBSE' | 'National';
  subject?: string;
  year: number;
  shift?: string;
  paperType: 'PYQ' | 'Model Paper' | 'Mock Paper' | 'Sample Paper';
  durationMinutes: number;
  totalQuestions: number;
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
    shift: { type: String, default: '' },
    paperType: {
      type: String,
      required: true,
      enum: ['PYQ', 'Model Paper', 'Mock Paper', 'Sample Paper'],
      default: 'PYQ',
      index: true
    },
    durationMinutes: { type: Number, default: 180 },
    totalQuestions: { type: Number, default: 75 },
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

PaperSchema.index({ exam: 1, year: -1, status: 1 });
PaperSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IPaper>('Paper', PaperSchema);
