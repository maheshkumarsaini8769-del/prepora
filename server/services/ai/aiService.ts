import { IAIProvider } from './aiProvider.interface.js';
import { GeminiProvider } from './geminiProvider.js';
import { FallbackProvider } from './fallbackProvider.js';
import { 
  IDoubtSolveRequest, 
  IDoubtSolveResult, 
  IProgressiveHintsRequest, 
  IProgressiveHintsResult, 
  IWeaknessAnalysisRequest, 
  IWeaknessAnalysisResult 
} from './aiTypes.js';
import { AIProviderConfig } from '../../models/AIFactory.js';
import { analyzeQuestionUnderstanding } from './quality/questionUnderstanding.js';
import { searchDatabaseFirst } from './quality/databaseFirstSearch.js';
import { runCentralQualityPipeline, ValidationReport } from './quality/centralQualityPipeline.js';

class AIService {
  private primaryProvider: GeminiProvider;
  private fallbackProvider: FallbackProvider;
  private isAIEnabled: boolean = true;
  private dailyRequestLimit: number = 500;
  private requestsToday: number = 0;
  private lastResetDate: string = new Date().toISOString().slice(0, 10);

  constructor() {
    const envKey = process.env.GEMINI_API_KEY || '';
    this.primaryProvider = new GeminiProvider(envKey, 'gemini-3.6-flash');
    this.fallbackProvider = new FallbackProvider();
  }

  public async initializeFromDB(): Promise<void> {
    try {
      const config = await AIProviderConfig.findOne({ key: 'ai_provider_config' });
      if (config) {
        const key = config.apiKey || process.env.GEMINI_API_KEY || '';
        this.primaryProvider.updateConfig(key, config.modelName || 'gemini-3.6-flash');
        this.dailyRequestLimit = config.dailyGenerationLimit || 500;
      }
    } catch (e) {
      console.warn('[AIService] DB init skipped, using environment config');
    }
  }

  private checkAndResetQuota(): void {
    const today = new Date().toISOString().slice(0, 10);
    if (this.lastResetDate !== today) {
      this.lastResetDate = today;
      this.requestsToday = 0;
    }
  }

  public getStatus() {
    this.checkAndResetQuota();
    return {
      isAIEnabled: this.isAIEnabled,
      hasGeminiKey: this.primaryProvider.isConfigured(),
      activeProvider: this.primaryProvider.isConfigured() ? this.primaryProvider.name : this.fallbackProvider.name,
      requestsToday: this.requestsToday,
      dailyLimit: this.dailyRequestLimit,
      remainingToday: Math.max(0, this.dailyRequestLimit - this.requestsToday)
    };
  }

  public async solveDoubt(
    req: IDoubtSolveRequest,
    contextSnippet?: string
  ): Promise<{ result: IDoubtSolveResult; report: ValidationReport }> {
    this.checkAndResetQuota();
    this.requestsToday++;

    // Step 1: Deep Educational Understanding & Context Mismatch Check
    const understanding = analyzeQuestionUnderstanding(req.question, req.subject, req.chapter);

    // Step 2: Database-First Search (Section 19: Prioritize verified DB question)
    const dbMatch = await searchDatabaseFirst(req.question);
    const effectiveContext = dbMatch.contextForAI || contextSnippet;

    let rawResult: IDoubtSolveResult;

    // Step 3: Provider Execution (Gemini -> Fallback)
    if (this.isAIEnabled && this.primaryProvider.isConfigured() && this.requestsToday < this.dailyRequestLimit) {
      try {
        rawResult = await this.primaryProvider.solveDoubt(req, effectiveContext);
      } catch (err: any) {
        console.warn('[AIService] Gemini call failed, falling back gracefully:', err?.message);
        rawResult = await this.fallbackProvider.solveDoubt(req, effectiveContext);
      }
    } else {
      rawResult = await this.fallbackProvider.solveDoubt(req, effectiveContext);
    }

    // Step 4: Central Quality Pipeline & Verification (Sections 5, 8, 28, 29)
    const validated = await runCentralQualityPipeline(req, rawResult, understanding, dbMatch);
    return validated;
  }

  public async generateProgressiveHints(req: IProgressiveHintsRequest): Promise<IProgressiveHintsResult> {
    this.checkAndResetQuota();
    this.requestsToday++;
    if (this.isAIEnabled && this.primaryProvider.isConfigured() && this.requestsToday < this.dailyRequestLimit) {
      try {
        return await this.primaryProvider.generateProgressiveHints(req);
      } catch (err) {
        console.warn('[AIService] Gemini hints failed, using fallback');
      }
    }
    return await this.fallbackProvider.generateProgressiveHints(req);
  }

  public async analyzeWeakness(req: IWeaknessAnalysisRequest): Promise<IWeaknessAnalysisResult> {
    this.checkAndResetQuota();
    this.requestsToday++;
    if (this.isAIEnabled && this.primaryProvider.isConfigured() && this.requestsToday < this.dailyRequestLimit) {
      try {
        return await this.primaryProvider.analyzeWeakness(req);
      } catch (err) {
        console.warn('[AIService] Gemini weakness analysis failed, using fallback');
      }
    }
    return await this.fallbackProvider.analyzeWeakness(req);
  }
}

export const aiService = new AIService();
