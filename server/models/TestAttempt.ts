import mongoose, { Schema, Document } from 'mongoose';

export interface ITestAttempt extends Document {
  id: string;
  userId: string;
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
  answers: Record<string, any>;
  subjectBreakdown: any[];
  strongTopics: string[];
  weakTopics: string[];
  avgTimePerQuestionSeconds?: number;
  fastestQuestion?: any;
  slowestQuestion?: any;
  speedMasterCount?: number;
  timeDrainerCount?: number;
  negativeTrapCount?: number;
  idempotencyKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestAttemptSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    idempotencyKey: { type: String, index: true, sparse: true },
    userId: { type: String, required: true, index: true, default: 'usr-default' },
    testId: { type: String, required: true, index: true },
    testTitle: { type: String, required: true },
    timestamp: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    timeTakenSeconds: { type: Number, required: true },
    totalScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    wrongCount: { type: Number, required: true },
    unattemptedCount: { type: Number, required: true },
    accuracyPercentage: { type: Number, required: true },
    answers: { type: Schema.Types.Mixed, default: {} },
    subjectBreakdown: { type: [Schema.Types.Mixed], default: [] },
    strongTopics: { type: [String], default: [] },
    weakTopics: { type: [String], default: [] },
    avgTimePerQuestionSeconds: { type: Number },
    fastestQuestion: { type: Schema.Types.Mixed },
    slowestQuestion: { type: Schema.Types.Mixed },
    speedMasterCount: { type: Number, default: 0 },
    timeDrainerCount: { type: Number, default: 0 },
    negativeTrapCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

TestAttemptSchema.index({ userId: 1, testId: 1, createdAt: -1 });

export default mongoose.model<ITestAttempt>('TestAttempt', TestAttemptSchema);
