import { IAIProvider } from './aiProvider.interface.js';
import { OpenAIProvider } from './openAIProvider.js';
import { GeminiProvider } from './geminiProvider.js';
import { GroqProvider } from './groqProvider.js';
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
  private openAIProvider: OpenAIProvider;
  private geminiProvider: GeminiProvider;
  private groqProvider: GroqProvider;
  private fallbackProvider: FallbackProvider;
  private isAIEnabled: boolean = true;
  private dailyRequestLimit: number = 500;
  private requestsToday: number = 0;
  private lastResetDate: string = new Date().toISOString().slice(0, 10);

  constructor() {
    const openaiKey = process.env.OPENAI_API_KEY || '';
    const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const groqKey = process.env.GROQ_API_KEY || '';

    this.openAIProvider = new OpenAIProvider(openaiKey, openaiModel);
    this.geminiProvider = new GeminiProvider(geminiKey, 'gemini-1.5-flash');
    this.groqProvider = new GroqProvider(groqKey);
    this.fallbackProvider = new FallbackProvider();
  }

  public async initializeFromDB(): Promise<void> {
    try {
      const config = await AIProviderConfig.findOne({ key: 'ai_provider_config' });
      if (config) {
        const key = (config.apiKey || '').trim();
        const savedProvider = (config.provider || '').toLowerCase();
        const model = config.modelName || 'gpt-4o-mini';

        // Auto-detect or route key based on key prefix or configured provider
        if (key.startsWith('sk-') || savedProvider === 'openai' || savedProvider === 'openai_compatible') {
          this.openAIProvider.updateConfig(key || process.env.OPENAI_API_KEY || '', model || process.env.OPENAI_MODEL || 'gpt-4o-mini');
        } else if (process.env.OPENAI_API_KEY) {
          this.openAIProvider.updateConfig(process.env.OPENAI_API_KEY, process.env.OPENAI_MODEL || 'gpt-4o-mini');
        }

        if (key.startsWith('AIza') || savedProvider === 'gemini') {
          this.geminiProvider.updateConfig(key || process.env.GEMINI_API_KEY || '', model.includes('gemini') ? model : 'gemini-1.5-flash');
        } else if (process.env.GEMINI_API_KEY) {
          this.geminiProvider.updateConfig(process.env.GEMINI_API_KEY, 'gemini-1.5-flash');
        }

        if (key.startsWith('gsk_')) {
          this.groqProvider.updateConfig(key);
        } else if (process.env.GROQ_API_KEY) {
          this.groqProvider.updateConfig(process.env.GROQ_API_KEY);
        }

        this.dailyRequestLimit = config.dailyGenerationLimit || 500;
      } else {
        if (process.env.OPENAI_API_KEY) {
          this.openAIProvider.updateConfig(process.env.OPENAI_API_KEY, process.env.OPENAI_MODEL || 'gpt-4o-mini');
        }
        if (process.env.GEMINI_API_KEY) {
          this.geminiProvider.updateConfig(process.env.GEMINI_API_KEY, 'gemini-1.5-flash');
        }
        if (process.env.GROQ_API_KEY) {
          this.groqProvider.updateConfig(process.env.GROQ_API_KEY);
        }
      }
    } catch (e) {
      console.warn('[AIService] DB init skipped, using environment config');
      if (process.env.OPENAI_API_KEY) {
        this.openAIProvider.updateConfig(process.env.OPENAI_API_KEY, process.env.OPENAI_MODEL || 'gpt-4o-mini');
      }
      if (process.env.GEMINI_API_KEY) {
        this.geminiProvider.updateConfig(process.env.GEMINI_API_KEY, 'gemini-1.5-flash');
      }
    }
  }

  public async saveProviderConfig(
    provider: string,
    apiKey: string,
    modelName?: string,
    dailyGenerationLimit?: number
  ): Promise<{ success: boolean; activeProvider: string; message: string }> {
    const cleanKey = (apiKey || '').trim();
    let detectedProvider = provider || 'openai';
    if (cleanKey.startsWith('sk-')) detectedProvider = 'openai';
    else if (cleanKey.startsWith('AIza')) detectedProvider = 'gemini';

    // 1. Live test key against provider API
    if (detectedProvider === 'openai' && cleanKey.length > 5) {
      this.openAIProvider.updateConfig(cleanKey, modelName || 'gpt-4o-mini');
      const testRes = await this.openAIProvider.testConnection();
      if (!testRes.success && (testRes.message.includes('Authentication') || testRes.message.includes('Rate Limit') || testRes.message.includes('Quota'))) {
        throw new Error(testRes.message);
      }
    } else if (detectedProvider === 'gemini' && cleanKey.length > 5) {
      this.geminiProvider.updateConfig(cleanKey, modelName || 'gemini-1.5-flash');
    }

    const updateObj: any = {
      provider: detectedProvider,
      isConnected: true
    };
    if (cleanKey) updateObj.apiKey = cleanKey;
    if (modelName) updateObj.modelName = modelName;
    if (dailyGenerationLimit) updateObj.dailyGenerationLimit = dailyGenerationLimit;

    await AIProviderConfig.findOneAndUpdate(
      { key: 'ai_provider_config' },
      { $set: updateObj },
      { new: true, upsert: true }
    );

    await this.initializeFromDB();
    const active = this.getActiveAIProvider();
    return {
      success: true,
      activeProvider: active ? active.name : this.fallbackProvider.name,
      message: `AI Provider updated and activated successfully. Active: ${active ? active.name : 'Offline Engine'}`
    };
  }

  private checkAndResetQuota(): void {
    const today = new Date().toISOString().slice(0, 10);
    if (this.lastResetDate !== today) {
      this.lastResetDate = today;
      this.requestsToday = 0;
    }
  }

  public async getStatus() {
    await this.ensureInitialized();
    this.checkAndResetQuota();
    const active = this.getActiveAIProvider();
    const activeProvider = active ? active.name : this.fallbackProvider.name;
    return {
      isAIEnabled: this.isAIEnabled,
      hasOpenAIKey: this.openAIProvider.isConfigured(),
      openAIModel: this.openAIProvider.getModelName(),
      hasGeminiKey: this.geminiProvider.isConfigured(),
      hasGroqKey: this.groqProvider.isConfigured(),
      activeProvider,
      requestsToday: this.requestsToday,
      dailyLimit: this.dailyRequestLimit,
      remainingToday: Math.max(0, this.dailyRequestLimit - this.requestsToday)
    };
  }

  private isInitialized: boolean = false;
  private initPromise: Promise<void> | null = null;

  public async ensureInitialized(): Promise<void> {
    if (this.isInitialized) return;
    if (!this.initPromise) {
      this.initPromise = this.initializeFromDB().then(() => {
        this.isInitialized = true;
      });
    }
    await this.initPromise;
  }

  public getActiveAIProvider(): IAIProvider | null {
    if (!this.openAIProvider.isConfigured() && process.env.OPENAI_API_KEY) {
      this.openAIProvider.updateConfig(
        process.env.OPENAI_API_KEY,
        process.env.OPENAI_MODEL || 'gpt-4o-mini'
      );
    }
    if (!this.geminiProvider.isConfigured() && process.env.GEMINI_API_KEY) {
      this.geminiProvider.updateConfig(
        process.env.GEMINI_API_KEY,
        'gemini-1.5-flash'
      );
    }
    if (this.openAIProvider.isConfigured()) return this.openAIProvider;
    if (this.geminiProvider.isConfigured()) return this.geminiProvider;
    if (this.groqProvider.isConfigured()) return this.groqProvider;
    return null;
  }

  public async solveDoubt(
    req: IDoubtSolveRequest,
    contextSnippet?: string
  ): Promise<{ result: IDoubtSolveResult; report: ValidationReport }> {
    await this.ensureInitialized();
    this.checkAndResetQuota();
    this.requestsToday++;

    // Step 1: Deep Educational Understanding & Context Mismatch Check
    const understanding = analyzeQuestionUnderstanding(req.question, req.subject, req.chapter);

    // Step 2: Database-First Search (Section 19: Prioritize verified DB question)
    const dbMatch = await searchDatabaseFirst(req.question);
    const effectiveContext = dbMatch.contextForAI || contextSnippet;

    let rawResult: IDoubtSolveResult;

    // Step 3: Provider Execution (OpenAI -> Gemini -> Groq -> Fallback)
    const aiProvider = this.getActiveAIProvider();
    if (this.isAIEnabled && aiProvider && this.requestsToday < this.dailyRequestLimit) {
      try {
        rawResult = await aiProvider.solveDoubt(req, effectiveContext);
      } catch (err: any) {
        console.warn(`[AIService] ${aiProvider.name} call failed:`, err?.message);
        rawResult = await this.fallbackProvider.solveDoubt(req, effectiveContext);
        rawResult.provider = `${this.fallbackProvider.name}`;
        rawResult.providerError = `${aiProvider.name} error: ${err?.message || 'failed'}`;
        rawResult.isFallback = true;
      }
    } else {
      rawResult = await this.fallbackProvider.solveDoubt(req, effectiveContext);
      rawResult.provider = this.fallbackProvider.name;
      rawResult.isFallback = true;
      if (!this.getActiveAIProvider()) {
        rawResult.providerError = 'OpenAI API key not configured on backend. Used offline curriculum knowledge.';
      }
    }

    // Step 4: Central Quality Pipeline & Verification (Sections 5, 8, 28, 29)
    const validated = await runCentralQualityPipeline(req, rawResult, understanding, dbMatch);
    if (rawResult.providerError) validated.result.providerError = rawResult.providerError;
    if (rawResult.isFallback !== undefined) validated.result.isFallback = rawResult.isFallback;

    return validated;
  }

  public async generateProgressiveHints(req: IProgressiveHintsRequest): Promise<IProgressiveHintsResult> {
    this.checkAndResetQuota();
    this.requestsToday++;
    const aiProvider = this.getActiveAIProvider();
    if (this.isAIEnabled && aiProvider && this.requestsToday < this.dailyRequestLimit) {
      try {
        return await aiProvider.generateProgressiveHints(req);
      } catch (err: any) {
        console.warn(`[AIService] ${aiProvider.name} hints failed:`, err?.message);
      }
    }
    return await this.fallbackProvider.generateProgressiveHints(req);
  }

  public async analyzeWeakness(req: IWeaknessAnalysisRequest): Promise<IWeaknessAnalysisResult> {
    this.checkAndResetQuota();
    this.requestsToday++;
    const aiProvider = this.getActiveAIProvider();
    if (this.isAIEnabled && aiProvider && this.requestsToday < this.dailyRequestLimit) {
      try {
        return await aiProvider.analyzeWeakness(req);
      } catch (err: any) {
        console.warn(`[AIService] ${aiProvider.name} weakness analysis failed:`, err?.message);
      }
    }
    return await this.fallbackProvider.analyzeWeakness(req);
  }
}

export const aiService = new AIService();
