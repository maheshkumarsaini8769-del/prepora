import mongoose, { Schema, Document } from 'mongoose';

// 1. Content Hierarchy (Exam -> Class -> Board -> Subject -> Chapter -> Topic)
export interface IContentHierarchy extends Document {
  id: string;
  exam: string;
  classLevel: string;
  board: string;
  subject: string;
  chapter: string;
  topic: string;
  orderIndex: number;
  status: 'Published' | 'Draft' | 'Archived';
  questionCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ContentHierarchySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    exam: { type: String, required: true, index: true },
    classLevel: { type: String, required: true },
    board: { type: String, default: 'CBSE' },
    subject: { type: String, required: true, index: true },
    chapter: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    orderIndex: { type: Number, default: 0 },
    status: { type: String, enum: ['Published', 'Draft', 'Archived'], default: 'Published', index: true }
  },
  { timestamps: true }
);
ContentHierarchySchema.index({ exam: 1, subject: 1, chapter: 1 });
export const ContentHierarchy = mongoose.model<IContentHierarchy>('ContentHierarchy', ContentHierarchySchema);

// 2. Flashcards & Formula Cards
export interface IFlashcard extends Document {
  id: string;
  type: 'formula' | 'flashcard';
  subject: string;
  chapter: string;
  topic?: string;
  front: string; // Question or formula title
  back: string;  // Answer or formula breakdown
  explanation?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  status: 'Published' | 'Draft' | 'Archived';
  createdAt: Date;
  updatedAt: Date;
}

const FlashcardSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    type: { type: String, enum: ['formula', 'flashcard'], default: 'formula', index: true },
    subject: { type: String, required: true, index: true },
    chapter: { type: String, required: true, index: true },
    topic: { type: String, default: '' },
    front: { type: String, required: true },
    back: { type: String, required: true },
    explanation: { type: String, default: '' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['Published', 'Draft', 'Archived'], default: 'Published' }
  },
  { timestamps: true }
);
export const Flashcard = mongoose.model<IFlashcard>('Flashcard', FlashcardSchema);

// 3. Admin Settings & System Configuration
export interface IAdminSettings extends Document {
  key: string;
  examPatterns: {
    JEE: { totalQuestions: number; durationMinutes: number; markingScheme: { correct: number; incorrect: number } };
    NEET: { totalQuestions: number; durationMinutes: number; markingScheme: { correct: number; incorrect: number } };
    Board: { totalQuestions: number; durationMinutes: number; markingScheme: { correct: number; incorrect: number } };
  };
  difficultyThresholds: {
    weakPercent: number;
    improvementPercent: number;
    strongPercent: number;
  };
  revisionIntervals: number[]; // e.g. [1, 3, 7, 14, 30]
  adConfig: {
    enabled: boolean;
    maxFreeAdsPerSession: number;
    placement: string[];
    adFreeForPremium: boolean;
  };
  featureFlags: {
    aiDoubt: boolean;
    community: boolean;
    flashcards: boolean;
    adaptivePractice: boolean;
    smartRevision: boolean;
    speedPractice: boolean;
  };
  subscriptionPlans: Array<{
    id: string;
    name: string;
    price: number;
    billingPeriod: string;
    features: string[];
    active: boolean;
  }>;
  updatedAt: Date;
}

const AdminSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: 'global_settings' },
    examPatterns: {
      type: Schema.Types.Mixed,
      default: {
        JEE: { totalQuestions: 75, durationMinutes: 180, markingScheme: { correct: 4, incorrect: -1 } },
        NEET: { totalQuestions: 180, durationMinutes: 200, markingScheme: { correct: 4, incorrect: -1 } },
        Board: { totalQuestions: 38, durationMinutes: 180, markingScheme: { correct: 1, incorrect: 0 } }
      }
    },
    difficultyThresholds: {
      type: Schema.Types.Mixed,
      default: { weakPercent: 50, improvementPercent: 70, strongPercent: 70 }
    },
    revisionIntervals: {
      type: [Number],
      default: [1, 3, 7, 14, 30]
    },
    adConfig: {
      type: Schema.Types.Mixed,
      default: {
        enabled: false,
        maxFreeAdsPerSession: 2,
        placement: ['Sidebar', 'Post-Test Summary'],
        adFreeForPremium: true
      }
    },
    featureFlags: {
      type: Schema.Types.Mixed,
      default: {
        aiDoubt: true,
        community: true,
        flashcards: true,
        adaptivePractice: true,
        smartRevision: true,
        speedPractice: true
      }
    },
    subscriptionPlans: {
      type: [Schema.Types.Mixed],
      default: [
        {
          id: 'free',
          name: 'Free Scholar',
          price: 0,
          billingPeriod: 'Lifetime',
          features: ['Access to Question Bank', 'Daily 2 Mock Tests', 'Standard Analytics'],
          active: true
        },
        {
          id: 'premium_pro',
          name: 'PREPORA Pro All-Access',
          price: 999,
          billingPeriod: 'Yearly',
          features: ['Unlimited Adaptive Tests', 'Full AI Doubt Solving', 'Detailed Video Solutions', 'Priority Doubt Support', 'Zero Ads'],
          active: true
        }
      ]
    }
  },
  { timestamps: true }
);
export const AdminSettings = mongoose.model<IAdminSettings>('AdminSettings', AdminSettingsSchema);

// 4. AI Generation Jobs & Draft Queue
export interface IAIJob extends Document {
  id: string;
  exam: string;
  subject: string;
  chapter: string;
  topic?: string;
  difficulty: string;
  count: number;
  questionType: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Partially Approved' | 'Rejected';
  generatedQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    concept: string;
    difficulty: string;
    qualityFlags: string[];
    status: 'Pending' | 'Approved' | 'Rejected';
    rejectReason?: string;
  }>;
  reviewedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AIJobSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    exam: { type: String, required: true },
    subject: { type: String, required: true },
    chapter: { type: String, required: true },
    topic: { type: String, default: '' },
    difficulty: { type: String, default: 'Medium' },
    count: { type: Number, default: 5 },
    questionType: { type: String, default: 'Single Choice MCQ' },
    status: {
      type: String,
      enum: ['Draft', 'Under Review', 'Approved', 'Partially Approved', 'Rejected'],
      default: 'Draft',
      index: true
    },
    generatedQuestions: { type: [Schema.Types.Mixed], default: [] },
    reviewedBy: { type: String }
  },
  { timestamps: true }
);
export const AIJob = mongoose.model<IAIJob>('AIJob', AIJobSchema);
