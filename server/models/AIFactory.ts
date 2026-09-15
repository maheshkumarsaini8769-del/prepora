import mongoose, { Schema, Document } from 'mongoose';

// 1. Uploaded Source Document
export interface ISourceDocument extends Document {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  board: string;
  chapter: string;
  filename: string;
  fileSize: number;
  pageCount: number;
  status: 'Uploaded' | 'Parsed' | 'Mapped' | 'Generated';
  extractedTopics: string[];
  rawTextSnippet?: string;
  documentHash: string;
  uploadedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SourceDocumentSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subject: { type: String, required: true, index: true },
    classLevel: { type: String, required: true },
    board: { type: String, default: 'CBSE' },
    chapter: { type: String, required: true, index: true },
    filename: { type: String, required: true },
    fileSize: { type: Number, default: 0 },
    pageCount: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ['Uploaded', 'Parsed', 'Mapped', 'Generated'],
      default: 'Uploaded',
      index: true
    },
    extractedTopics: { type: [String], default: [] },
    rawTextSnippet: { type: String },
    documentHash: { type: String, index: true },
    uploadedBy: { type: String, default: 'admin@prepore.edu' }
  },
  { timestamps: true }
);

export const SourceDocument = mongoose.model<ISourceDocument>('SourceDocument', SourceDocumentSchema);

// 2. Chapter Knowledge Map (reusable across practice, tests, weakness analysis)
export interface IChapterKnowledgeMap extends Document {
  id: string;
  chapter: string;
  subject: string;
  classLevel: string;
  board: string;
  sourceDocumentId?: string;
  topics: Array<{
    name: string;
    subtopics: string[];
    keyConcepts: string[];
    formulas: string[];
    definitions: string[];
    coveragePercentage: number;
    currentQuestions: number;
    targetQuestions: number;
  }>;
  totalConceptsCount: number;
  overallCoverage: number;
  createdAt: Date;
  updatedAt: Date;
}

const ChapterKnowledgeMapSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    chapter: { type: String, required: true, index: true },
    subject: { type: String, required: true, index: true },
    classLevel: { type: String, required: true },
    board: { type: String, default: 'CBSE' },
    sourceDocumentId: { type: String },
    topics: { type: [Schema.Types.Mixed], default: [] },
    totalConceptsCount: { type: Number, default: 0 },
    overallCoverage: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const ChapterKnowledgeMap = mongoose.model<IChapterKnowledgeMap>('ChapterKnowledgeMap', ChapterKnowledgeMapSchema);

// 3. AI Factory Background Generation Job
export interface IAIFactoryQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  detailedSolution?: string;
  concept: string;
  importantPoint?: string;
  commonMistake?: string;
  examTip?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  difficultyReason?: string;
  subject: string;
  classLevel: string;
  chapter: string;
  topic: string;
  subtopic?: string;
  questionType: 'MCQ' | 'Assertion Reason' | 'Statement Based' | 'Match The Following';
  examSuitability: {
    NEET: { suitable: boolean; confidence: number };
    CBSE: { suitable: boolean; confidence: number };
    RBSE: { suitable: boolean; confidence: number };
  };
  sourceReference: {
    documentId?: string;
    page: number;
    section: string;
    excerpt: string;
  };
  qualityScore: number;
  qualityFlags: string[];
  duplicateStatus: 'Unique' | 'Possible Duplicate' | 'Duplicate';
  duplicateSimilarity?: number;
  duplicateQuestionRef?: string;
  reviewStatus: 'Pending' | 'Approved' | 'Rejected';
  rejectReason?: string;
}

export interface ITopicAllocation {
  topic: string;
  rawWeight: number;
  normalizedWeight: number; // in percentage e.g. 5.26
  sourceSupported: boolean;
  sourceStatus: 'Verified' | 'SOURCE CONTENT NOT FOUND';
  targetQuestions: number;
  generatedCount: number;
  conceptDensity?: number;
  examRelevance?: number;
  pageReference?: string;
  unsupportedReason?: string;
}

export interface IGenerationContract {
  sourceTitle: string;
  chapter: string;
  subject: string;
  targetCount: number;
  sourceCoveragePercentage: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  examSuitability: string[];
  questionTypes: string[];
  excludedTopics: string[];
  confirmedAt?: Date;
}

export interface IAIFactoryJob extends Document {
  id: string;
  sourceDocumentId?: string;
  chapterTitle: string;
  subject: string;
  classLevel: string;
  examTargets: string[];
  status:
    | 'Extracting'
    | 'Mapping'
    | 'Generating'
    | 'QualityChecking'
    | 'Deduplicating'
    | 'Paused'
    | 'ReadyForReview'
    | 'Completed'
    | 'Failed';
  progress: number;
  requestedCount: number;
  generatedCount: number;
  validCount: number;
  approvedCount: number;
  rejectedCount: number;
  duplicateCount: number;
  currentBatch: number;
  totalBatches: number;
  batchSize: number;
  currentTopic?: string;
  mode?: 'quick' | 'standard' | 'deep' | 'chapter_bank';
  error?: string;
  generationContract?: IGenerationContract;
  topicAllocations?: ITopicAllocation[];
  generatedQuestions: IAIFactoryQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

const AIFactoryJobSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    sourceDocumentId: { type: String },
    chapterTitle: { type: String, required: true },
    subject: { type: String, required: true },
    classLevel: { type: String, default: '11' },
    examTargets: { type: [String], default: ['NEET', 'CBSE', 'RBSE'] },
    status: {
      type: String,
      enum: [
        'Extracting',
        'Mapping',
        'Generating',
        'QualityChecking',
        'Deduplicating',
        'Paused',
        'ReadyForReview',
        'Completed',
        'Failed'
      ],
      default: 'Extracting',
      index: true
    },
    progress: { type: Number, default: 0 },
    requestedCount: { type: Number, default: 20 },
    generatedCount: { type: Number, default: 0 },
    validCount: { type: Number, default: 0 },
    approvedCount: { type: Number, default: 0 },
    rejectedCount: { type: Number, default: 0 },
    duplicateCount: { type: Number, default: 0 },
    currentBatch: { type: Number, default: 0 },
    totalBatches: { type: Number, default: 1 },
    batchSize: { type: Number, default: 20 },
    currentTopic: { type: String, default: '' },
    mode: { type: String, default: 'standard' },
    error: { type: String },
    generationContract: {
      sourceTitle: { type: String },
      chapter: { type: String },
      subject: { type: String },
      targetCount: { type: Number },
      sourceCoveragePercentage: { type: Number },
      difficultyDistribution: {
        easy: { type: Number, default: 30 },
        medium: { type: Number, default: 50 },
        hard: { type: Number, default: 20 }
      },
      examSuitability: { type: [String], default: ['NEET', 'CBSE', 'RBSE'] },
      questionTypes: { type: [String], default: ['MCQ', 'Assertion Reason', 'Statement Based', 'Match The Following'] },
      excludedTopics: { type: [String], default: [] },
      confirmedAt: { type: Date, default: Date.now }
    },
    topicAllocations: { type: [Schema.Types.Mixed], default: [] },
    generatedQuestions: { type: [Schema.Types.Mixed], default: [] }
  },
  { timestamps: true }
);

export const AIFactoryJob = mongoose.model<IAIFactoryJob>('AIFactoryJob', AIFactoryJobSchema);

// 4. AI Provider Configuration & Cost Controls
export interface IAIProviderConfig extends Document {
  key: string;
  provider: 'gemini' | 'openai_compatible' | 'offline_engine';
  apiKey?: string;
  modelName: string;
  temperature: number;
  maxTokens: number;
  dailyGenerationLimit: number;
  questionsGeneratedToday: number;
  lastResetDate: string;
  promptVersion: string;
  isConnected: boolean;
  updatedAt: Date;
}

const AIProviderConfigSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: 'ai_provider_config' },
    provider: { type: String, enum: ['gemini', 'openai_compatible', 'offline_engine'], default: 'gemini' },
    apiKey: { type: String, default: '' },
    modelName: { type: String, default: 'gemini-1.5-flash' },
    temperature: { type: Number, default: 0.7 },
    maxTokens: { type: Number, default: 4096 },
    dailyGenerationLimit: { type: Number, default: 500 },
    questionsGeneratedToday: { type: Number, default: 0 },
    lastResetDate: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    promptVersion: { type: String, default: 'v1.2' },
    isConnected: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const AIProviderConfig = mongoose.model<IAIProviderConfig>('AIProviderConfig', AIProviderConfigSchema);
