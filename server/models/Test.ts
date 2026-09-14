import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
  id: string;
  title: string;
  exam: 'JEE' | 'NEET' | 'Board';
  classLevel?: '11' | '12';
  subjects: string[];
  chapters?: string[];
  totalQuestions: number;
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
  questionIds: string[];
  category: 'Full Mock' | 'Subject Test' | 'Chapter Test' | 'Custom Test' | 'PYQ Paper';
  maxScore: number;
  negativeMarking: boolean;
  calculatorEnabled?: boolean;
  subjectTimePlan?: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

const TestSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    exam: { type: String, required: true, enum: ['JEE', 'NEET', 'Board'], index: true },
    classLevel: { type: String, enum: ['11', '12'] },
    subjects: { type: [String], required: true },
    chapters: { type: [String], default: [] },
    totalQuestions: { type: Number, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    questionIds: { type: [String], required: true },
    category: { type: String, required: true, index: true },
    maxScore: { type: Number, required: true },
    negativeMarking: { type: Boolean, default: true },
    calculatorEnabled: { type: Boolean, default: false },
    subjectTimePlan: { type: Map, of: Number, default: {} }
  },
  { timestamps: true }
);

TestSchema.index({ exam: 1, category: 1 });

export default mongoose.model<ITest>('Test', TestSchema);
