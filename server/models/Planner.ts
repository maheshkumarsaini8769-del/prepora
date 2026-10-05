import mongoose, { Schema, Document } from 'mongoose';

export interface IPlannerTaskItem {
  id: string;
  title: string;
  subject: string;
  chapter?: string;
  topic?: string;
  taskType: 'Practice' | 'Revision' | 'Lecture' | 'Mock Test';
  durationMinutes: number;
  isCompleted: boolean;
  notes?: string;
  timeSlot?: string;
  day?: string;
  order: number;
}

export interface IPlanner extends Document {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  targetExam?: string;
  classLevel?: string;
  dailyStudyHours?: number;
  tasks: IPlannerTaskItem[];
  createdAt: Date;
  updatedAt: Date;
}

const PlannerTaskItemSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    chapter: { type: String, default: '' },
    topic: { type: String, default: '' },
    taskType: { type: String, default: 'Practice' },
    durationMinutes: { type: Number, default: 30 },
    isCompleted: { type: Boolean, default: false },
    notes: { type: String, default: '' },
    timeSlot: { type: String, default: '' },
    day: { type: String, default: '' },
    order: { type: Number, default: 0 }
  },
  { _id: false }
);

const PlannerSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    targetExam: { type: String, default: 'JEE' },
    classLevel: { type: String, default: '12' },
    dailyStudyHours: { type: Number, default: 3.5 },
    tasks: { type: [PlannerTaskItemSchema], default: [] }
  },
  { timestamps: true }
);

// Compound index so each student has at most one planner record per date
PlannerSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.model<IPlanner>('Planner', PlannerSchema);
