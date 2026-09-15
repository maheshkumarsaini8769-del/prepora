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

class AIService {
  private primaryProvider: GeminiProvider;
  private fallbackProvider: FallbackProvider;
  private isAIEnabled: boolean = true;
  private dailyRequestLimit: number = 500;
  private requestsToday: number = 0;
  private lastResetDate: string = new Date().toISOString().slice(0, 10);

  constructor() {
    const envKey = process.env.GEMINI_API_KEY || '';
    this.primaryProvider = new GeminiProvider(envKey, 'gemini-1.5-flash');
    this.fallbackProvider = new FallbackProvider();
  }

  public async initializeFromDB(): Promise<void> {
    try {
      const config = await AIProviderConfig.findOne({ key: 'ai_provider_config' });
      if (config) {
        const key = config.apiKey || process.env.GEMINI_API_KEY || '';
        this.primaryProvider.updateConfig(key, config.modelName || 'gemini-1.5-flash');
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

  public async solveDoubt(req: IDoubtSolveRequest, contextSnippet?: string): Promise<IDoubtSolveResult> {
    this.checkAndResetQuota();
    this.requestsToday++;

    // Primary: Google Gemini API
    if (this.isAIEnabled && this.primaryProvider.isConfigured() && this.requestsToday <= this.dailyRequestLimit) {
      try {
        return await this.primaryProvider.solveDoubt(req, contextSnippet);
      } catch (err: any) {
        console.warn('[AIService] Gemini call failed, falling back gracefully:', err?.message);
      }
    }

    // Secondary: High-yield verified Fallback Engine (Section 23: Website never breaks)
    return await this.fallbackProvider.solveDoubt(req, contextSnippet);
  }

  public async generateProgressiveHints(req: IProgressiveHintsRequest): Promise<IProgressiveHintsResult> {
    if (this.isAIEnabled && this.primaryProvider.isConfigured()) {
      try {
        return await this.primaryProvider.generateProgressiveHints(req);
      } catch (err) {
        console.warn('[AIService] Gemini hints failed, using fallback');
      }
    }
    return await this.fallbackProvider.generateProgressiveHints(req);
  }

  public async analyzeWeakness(req: IWeaknessAnalysisRequest): Promise<IWeaknessAnalysisResult> {
    if (this.isAIEnabled && this.primaryProvider.isConfigured()) {
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
