import mongoose, { Schema, Document } from 'mongoose';

export type ActivityType =
  | 'LOGIN'
  | 'LOGOUT'
  | 'TASK_COMPLETED'
  | 'TASK_CREATED'
  | 'PLANNER_OPENED'
  | 'STUDY_SESSION_STARTED'
  | 'STUDY_SESSION_COMPLETED'
  | 'GOAL_COMPLETED'
  | 'PASSWORD_CHANGED'
  | 'FORCE_LOGOUT';

export interface IStudentActivity extends Document {
  id: string;
  studentId: string;
  type: ActivityType;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const StudentActivitySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, index: true },
    type: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

StudentActivitySchema.index({ studentId: 1, createdAt: -1 });

export default mongoose.model<IStudentActivity>('StudentActivity', StudentActivitySchema);
