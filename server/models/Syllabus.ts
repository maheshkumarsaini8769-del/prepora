import mongoose, { Schema, Document } from 'mongoose';

export interface ISyllabusTopic {
  id: string;
  name: string;
  order: number;
  isKeyTopic?: boolean;
  subtopics?: string[];
}

export interface ISyllabusChapter extends Document {
  id: string;
  chapterId: string;
  name: string;
  examId: 'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET_UG' | 'CBSE' | 'RBSE';
  classLevel: '11' | '12';
  subjectId: 'PHYSICS' | 'CHEMISTRY' | 'MATHEMATICS' | 'BIOLOGY';
  subjectName: string;
  order: number;
  weightage: 'High' | 'Medium' | 'Low';
  topics: ISyllabusTopic[];
  sourceAuthority: string;
  sourceURL: string;
  sourceYear: number;
  verificationStatus: 'VERIFIED' | 'PREPORA_CURRICULUM';
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const SyllabusTopicSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    order: { type: Number, default: 1 },
    isKeyTopic: { type: Boolean, default: false },
    subtopics: [{ type: String }]
  },
  { _id: false }
);

const SyllabusChapterSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    chapterId: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    examId: {
      type: String,
      required: true,
      enum: ['JEE_MAIN', 'JEE_ADVANCED', 'NEET_UG', 'CBSE', 'RBSE'],
      index: true
    },
    classLevel: {
      type: String,
      required: true,
      enum: ['11', '12'],
      index: true
    },
    subjectId: {
      type: String,
      required: true,
      enum: ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'BIOLOGY'],
      index: true
    },
    subjectName: { type: String, required: true },
    order: { type: Number, default: 1 },
    weightage: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    },
    topics: [SyllabusTopicSchema],
    sourceAuthority: { type: String, default: 'Official Examination Authority' },
    sourceURL: { type: String },
    sourceYear: { type: Number, default: 2025 },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'PREPORA_CURRICULUM'],
      default: 'VERIFIED'
    },
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
      index: true
    }
  },
  { timestamps: true }
);

SyllabusChapterSchema.index(
  { examId: 1, classLevel: 1, subjectId: 1, chapterId: 1 },
  { unique: true }
);

export default mongoose.model<ISyllabusChapter>('SyllabusChapter', SyllabusChapterSchema);
