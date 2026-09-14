import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestionVersion extends Document {
  id: string;
  questionId: string;
  versionNumber: number;
  snapshot: {
    question: string;
    questionHi?: string;
    options: string[];
    optionsHi?: string[];
    correctAnswer: number;
    explanation: string;
    explanationHi?: string;
    concept?: string;
    difficulty: string;
    subject: string;
    chapter: string;
    topic: string;
    tags?: string[];
  };
  changedBy: string; // admin user ID / email
  changeReason?: string;
  createdAt: Date;
}

const QuestionVersionSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    questionId: { type: String, required: true, index: true },
    versionNumber: { type: Number, required: true },
    snapshot: { type: Schema.Types.Mixed, required: true },
    changedBy: { type: String, default: 'admin' },
    changeReason: { type: String, default: 'Content update' }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

QuestionVersionSchema.index({ questionId: 1, versionNumber: -1 });

export default mongoose.model<IQuestionVersion>('QuestionVersion', QuestionVersionSchema);
