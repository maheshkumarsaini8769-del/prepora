import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: 'student' | 'admin';
  avatar?: string;
  targetExam: 'JEE' | 'NEET' | 'Board';
  classLevel: '11' | '12' | 'Dropper';
  targetYear: number;
  dreamScore: number;
  streakDays: number;
  totalQuestionsSolved: number;
  overallAccuracy: number;
  testsCompleted: number;
  studyTimeMinutes: number;
  otpCode?: string;
  otpExpires?: Date;
  zenuxsId?: string;
  status: 'active' | 'suspended';
  preparationProfile?: {
    preparationType: string;
    exam: string;
    classLevel: string;
    subjects: string[];
    onboardingCompleted: boolean;
    targetYear?: number;
    updatedAt?: Date;
  };
  preferences?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String },
    zenuxsId: { type: String, sparse: true, index: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student', index: true },
    avatar: { type: String },
    targetExam: { type: String, required: true, default: 'JEE' },
    classLevel: { type: String, required: true, default: '12' },
    targetYear: { type: Number, default: 2026 },
    dreamScore: { type: Number, default: 280 },
    streakDays: { type: Number, default: 1 },
    totalQuestionsSolved: { type: Number, default: 0 },
    overallAccuracy: { type: Number, default: 0 },
    testsCompleted: { type: Number, default: 0 },
    studyTimeMinutes: { type: Number, default: 0 },
    otpCode: { type: String },
    otpExpires: { type: Date },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' },
    preparationProfile: {
      preparationType: { type: String, enum: ['JEE', 'NEET', 'CBSE', 'RBSE', 'UNDECIDED'] },
      exam: { type: String },
      classLevel: { type: String },
      subjects: [{ type: String }],
      onboardingCompleted: { type: Boolean, default: false },
      targetYear: { type: Number },
      updatedAt: { type: Date, default: Date.now }
    },
    preferences: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
