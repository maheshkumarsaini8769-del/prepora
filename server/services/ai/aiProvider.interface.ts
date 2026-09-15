import { 
  IDoubtSolveRequest, 
  IDoubtSolveResult, 
  IProgressiveHintsRequest, 
  IProgressiveHintsResult, 
  IWeaknessAnalysisRequest, 
  IWeaknessAnalysisResult 
} from './aiTypes.js';

export interface IAIProvider {
  readonly name: string;
  isConfigured(): boolean;
  solveDoubt(req: IDoubtSolveRequest, contextSnippet?: string): Promise<IDoubtSolveResult>;
  generateProgressiveHints(req: IProgressiveHintsRequest): Promise<IProgressiveHintsResult>;
  analyzeWeakness(req: IWeaknessAnalysisRequest): Promise<IWeaknessAnalysisResult>;
}
