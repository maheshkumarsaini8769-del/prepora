export type EducationalSubject = 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'General';

export type QuestionIntent = 
  | 'definition'
  | 'explanation'
  | 'formula'
  | 'example'
  | 'derivation'
  | 'calculation'
  | 'comparison'
  | 'hint_request'
  | 'hint'
  | 'numerical'
  | 'solution'
  | 'general_query';

export interface QuestionUnderstanding {
  intent: QuestionIntent;
  subject: EducationalSubject;
  chapter?: string;
  topic?: string;
  concept?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  isNumerical: boolean;
  requiresCurrentInfo: boolean;
}

export interface IDoubtSolveRequest {
  question: string;
  subject?: EducationalSubject;
  chapter?: string;
  topic?: string;
  classLevel?: string;
  targetExam?: string;
  aiMode?: 'teacher' | 'doubt_solver';
  tutorMode?: string;
  requestedLanguage?: 'english' | 'hinglish';
  imageBase64?: string;
  imageMimeType?: string;
  conversationHistory?: Array<{ role: 'user' | 'model' | 'assistant'; text?: string; parts?: Array<{ text: string }> }>;
  requestFollowUp?: string;
}

export interface IDoubtSolveResult {
  answer: string;
  coreConcept: string;
  stepByStepSolution: string[];
  keyFormula?: string;
  variables?: string;
  numericalBreakdown?: {
    givenValues: string[];
    formulaUsed: string;
    calculationSteps: string[];
    finalValueWithUnits: string;
  };
  example?: string;
  examinerTrap?: string;
  examTip?: string;
  understanding: QuestionUnderstanding;
  verificationPassed: boolean;
  groundedInPrepora: boolean;
  retrievedPreporaContext?: string;
  suggestedFollowUps: string[];
  suggestedPractice: {
    subject: string;
    chapter: string;
    topic: string;
    count: number;
    actionUrl: string;
  };
  confidence: number;
  provider: string;
  providerError?: string;
  isFallback?: boolean;
  latencyMs: number;
}

export interface IProgressiveHintsRequest {
  question: string;
  subject?: string;
  chapter?: string;
  topic?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

export interface IProgressiveHintsResult {
  hint1: string; // Small clue
  hint2: string; // Core concept & governing equation
  hint3: string; // Strategic problem-solving approach
  fullSolution: string; // Complete solution
  examinerTrap?: string;
}

export interface IWeaknessAnalysisRequest {
  topic: string;
  chapter: string;
  subject: string;
  accuracy: number;
  wrongCount: number;
  totalAttempts: number;
  mistakeTypes: string[];
  timePerQuestionSeconds?: number;
}

export interface IWeaknessAnalysisResult {
  diagnosedWeaknessType: 'Concept Gap' | 'Application Gap' | 'Speed Bottleneck' | 'Careless Error Pattern' | 'Trap Vulnerability';
  confidence: number;
  rootCauseAnalysis: string;
  keyRuleToRemember: string;
  prescribedPlan: {
    conceptQuestions: number;
    easyQuestions: number;
    mediumQuestions: number;
    timedQuestions: number;
    expectedAccuracyGain: string;
  };
}
