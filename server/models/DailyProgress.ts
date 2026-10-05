import mongoose, { Schema, Document } from 'mongoose';

export interface IDailyProgress extends Document {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  tasksTotal: number;
  tasksCompleted: number;
  studyTimeMinutes: number;
  questionsSolved: number;
  accuracyPercentage: number;
  streakDays: number;
  goalsCompleted: number;
  goalsTotal: number;
  createdAt: Date;
  updatedAt: Date;
}

const DailyProgressSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    tasksTotal: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 },
    studyTimeMinutes: { type: Number, default: 0 },
    questionsSolved: { type: Number, default: 0 },
    accuracyPercentage: { type: Number, default: 0 },
    streakDays: { type: Number, default: 1 },
    goalsCompleted: { type: Number, default: 0 },
    goalsTotal: { type: Number, default: 0 }
  },
  { timestamps: true }
);

DailyProgressSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.model<IDailyProgress>('DailyProgress', DailyProgressSchema);
