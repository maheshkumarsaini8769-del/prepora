import mongoose, { Schema, Document } from 'mongoose';

export interface IFormula extends Document {
  id: string;
  classLevel: string;
  subject: string;
  chapter: string;
  topic?: string;
  title: string;
  formula: string;
  variables?: string;
  explanation?: string;
  example?: string;
  examTip?: string;
  trap?: string;
  tags: string[];
  importance: 'High' | 'Medium' | 'Low';
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FormulaSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    classLevel: { type: String, default: '11', index: true },
    subject: { type: String, required: true, index: true },
    chapter: { type: String, required: true, index: true },
    topic: { type: String, default: '', index: true },
    title: { type: String, required: true, index: true },
    formula: { type: String, required: true },
    variables: { type: String, default: '' },
    explanation: { type: String, default: '' },
    example: { type: String, default: '' },
    examTip: { type: String, default: '' },
    trap: { type: String, default: '' },
    tags: { type: [String], default: [], index: true },
    importance: { type: String, enum: ['High', 'Medium', 'Low'], default: 'High' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

FormulaSchema.index({ subject: 1, chapter: 1, topic: 1 });
FormulaSchema.index({ title: 'text', formula: 'text', chapter: 'text', topic: 'text' });

export const Formula = mongoose.model<IFormula>('Formula', FormulaSchema);
export default Formula;
