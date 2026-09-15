import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  id: string;
  exam: 'JEE' | 'NEET' | 'Board';
  class: '11' | '12';
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
  chapter: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  questionHi?: string;
  options: string[];
  optionsHi?: string[];
  correctAnswer: number;
  explanation: string;
  explanationHi?: string;
  concept: string;
  importantPoint?: string;
  shortcutTip?: string;
  source: 'Practice' | 'PYQ' | 'Original' | 'Original Demo' | 'Model Paper';
  year?: number;
  recommendedTimeSeconds?: number;
  status: 'Approved' | 'Pending' | 'Draft';
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    exam: { type: String, required: true, enum: ['JEE', 'NEET', 'Board'], index: true },
    class: { type: String, required: true, enum: ['11', '12'], index: true },
    subject: { type: String, required: true, enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology'], index: true },
    chapter: { type: String, required: true, index: true },
    topic: { type: String, required: true, index: true },
    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'], index: true },
    question: { type: String, required: true },
    questionHi: { type: String },
    options: { type: [String], required: true },
    optionsHi: { type: [String] },
    correctAnswer: { type: Number, required: true, min: 0, max: 3 },
    explanation: { type: String, required: true },
    explanationHi: { type: String },
    concept: { type: String, default: '' },
    importantPoint: { type: String },
    shortcutTip: { type: String },
    source: { type: String, default: 'Practice', enum: ['Practice', 'PYQ', 'Original', 'Original Demo', 'Model Paper'] },
    year: { type: Number },
    recommendedTimeSeconds: { type: Number, default: 90 },
    status: { type: String, default: 'Approved', enum: ['Approved', 'Pending', 'Draft'], index: true }
  },
  { timestamps: true }
);

QuestionSchema.index({ exam: 1, subject: 1, chapter: 1, difficulty: 1 });
QuestionSchema.index({ question: 'text', chapter: 'text', topic: 'text', concept: 'text' });

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
export default Question;
