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
  private dailyRequestLimit: number = 1500;
  private requestsToday: number = 0;
  private lastResetDate: string = new Date().toISOString().slice(0, 10);

  constructor() {
    const openaiKey = process.env.OPENAI_API_KEY || '';
    const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const groqKey = process.env.GROQ_API_KEY || '';

    this.openAIProvider = new OpenAIProvider(openaiKey, openaiModel);
    this.geminiProvider = new GeminiProvider(geminiKey, process.env.GEMINI_MODEL || 'gemini-3.8-flash');
    this.groqProvider = new GroqProvider(groqKey, process.env.GROQ_MODEL || 'openai/gpt-oss-120b');
    this.fallbackProvider = new FallbackProvider();
  }

  private configuredProviderPreference: string = 'gemini';

  public async initializeFromDB(): Promise<void> {
    try {
      const config = await AIProviderConfig.findOne({ key: 'ai_provider_config' });
      if (config) {
        const rawKey = (config.apiKey || '').trim();
        const geminiKey = (config.geminiApiKey || '').trim() || (rawKey.startsWith('AQ.') || rawKey.startsWith('AIza') ? rawKey : '') || (process.env.GEMINI_API_KEY || '').trim();
        const groqKey = (config.groqApiKey || '').trim() || (rawKey.startsWith('gsk_') ? rawKey : '') || (process.env.GROQ_API_KEY || '').trim();
        const openaiKey = (config.openaiApiKey || '').trim() || (rawKey.startsWith('sk-') ? rawKey : '') || (process.env.OPENAI_API_KEY || '').trim();

        const savedProvider = (config.provider || '').toLowerCase();
        this.configuredProviderPreference = savedProvider || 'gemini';

        // 1. Initialize Gemini
        if (geminiKey) {
          const geminiModel = config.geminiModelName || (config.modelName?.includes('gemini') ? config.modelName : '') || process.env.GEMINI_MODEL || 'gemini-3.8-flash';
          this.geminiProvider.updateConfig(geminiKey, geminiModel);
        } else if (process.env.GEMINI_API_KEY) {
          this.geminiProvider.updateConfig(process.env.GEMINI_API_KEY, process.env.GEMINI_MODEL || 'gemini-3.8-flash');
        }

        // 2. Initialize Groq
        if (groqKey) {
          const groqModel = config.groqModelName || process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
          this.groqProvider.updateConfig(groqKey, groqModel);
        } else if (process.env.GROQ_API_KEY) {
          this.groqProvider.updateConfig(process.env.GROQ_API_KEY, process.env.GROQ_MODEL || 'openai/gpt-oss-120b');
        }

        // 3. Initialize OpenAI
        if (openaiKey) {
          this.openAIProvider.updateConfig(openaiKey, config.modelName?.startsWith('gpt') ? config.modelName : process.env.OPENAI_MODEL || 'gpt-4o-mini');
        } else if (process.env.OPENAI_API_KEY) {
          this.openAIProvider.updateConfig(process.env.OPENAI_API_KEY, process.env.OPENAI_MODEL || 'gpt-4o-mini');
        }

        this.dailyRequestLimit = config.dailyGenerationLimit || 1500;
      } else {
        if (process.env.GEMINI_API_KEY) {
          this.geminiProvider.updateConfig(process.env.GEMINI_API_KEY, process.env.GEMINI_MODEL || 'gemini-3.8-flash');
        }
        if (process.env.GROQ_API_KEY) {
          this.groqProvider.updateConfig(process.env.GROQ_API_KEY, process.env.GROQ_MODEL || 'openai/gpt-oss-120b');
        }
        if (process.env.OPENAI_API_KEY) {
          this.openAIProvider.updateConfig(process.env.OPENAI_API_KEY, process.env.OPENAI_MODEL || 'gpt-4o-mini');
        }
      }
    } catch (e) {
      console.warn('[AIService] DB init skipped, using environment config');
      if (process.env.GEMINI_API_KEY) {
        this.geminiProvider.updateConfig(process.env.GEMINI_API_KEY, process.env.GEMINI_MODEL || 'gemini-3.8-flash');
      }
      if (process.env.GROQ_API_KEY) {
        this.groqProvider.updateConfig(process.env.GROQ_API_KEY, process.env.GROQ_MODEL || 'openai/gpt-oss-120b');
      }
      if (process.env.OPENAI_API_KEY) {
        this.openAIProvider.updateConfig(process.env.OPENAI_API_KEY, process.env.OPENAI_MODEL || 'gpt-4o-mini');
      }
    }
  }

  public async saveProviderConfig(
    provider: string,
    apiKey: string,
    modelName?: string,
    dailyGenerationLimit?: number
  ): Promise<{ success: boolean; activeProvider: string; message: string; warning?: string }> {
    const cleanKey = (apiKey || '').trim();
    let detectedProvider = (provider || 'gemini').toLowerCase();
    if (cleanKey.startsWith('sk-')) detectedProvider = 'openai';
    else if (cleanKey.startsWith('AIza') || cleanKey.startsWith('AQ.')) detectedProvider = 'gemini';
    else if (cleanKey.startsWith('gsk_')) detectedProvider = 'groq';

    // 1. Persist config to MongoDB FIRST so key is NEVER lost or discarded
    const updateObj: any = {
      provider: detectedProvider,
      isConnected: true
    };
    if (cleanKey) {
      updateObj.apiKey = cleanKey;
      if (detectedProvider === 'gemini') {
        updateObj.geminiApiKey = cleanKey;
        if (modelName) updateObj.geminiModelName = modelName;
      } else if (detectedProvider === 'groq') {
        updateObj.groqApiKey = cleanKey;
        if (modelName) updateObj.groqModelName = modelName;
      } else if (detectedProvider === 'openai') {
        updateObj.openaiApiKey = cleanKey;
      }
    }
    if (modelName) updateObj.modelName = modelName;
    if (dailyGenerationLimit) updateObj.dailyGenerationLimit = dailyGenerationLimit;

    await AIProviderConfig.findOneAndUpdate(
      { key: 'ai_provider_config' },
      { $set: updateObj },
      { new: true, upsert: true }
    );

    // 2. Update in-memory configuration
    this.configuredProviderPreference = detectedProvider;
    if (detectedProvider === 'gemini' && cleanKey.length > 5) {
      this.geminiProvider.updateConfig(cleanKey, modelName || 'gemini-3.8-flash');
    } else if (detectedProvider === 'groq' && cleanKey.length > 5) {
      this.groqProvider.updateConfig(cleanKey, modelName || 'openai/gpt-oss-120b');
    } else if (detectedProvider === 'openai' && cleanKey.length > 5) {
      this.openAIProvider.updateConfig(cleanKey, modelName || 'gpt-4o-mini');
    }

    await this.initializeFromDB();

    // 3. Test connection live for actionable user feedback
    let warningMsg: string | undefined;
    if (detectedProvider === 'gemini' && cleanKey.length > 5) {
      const testRes = await this.geminiProvider.testConnection();
      if (!testRes.success) {
        warningMsg = testRes.message;
      }
    } else if (detectedProvider === 'groq' && cleanKey.length > 5) {
      const testRes = await this.groqProvider.testConnection();
      if (!testRes.success) {
        warningMsg = testRes.message;
      }
    } else if (detectedProvider === 'openai' && cleanKey.length > 5) {
      const testRes = await this.openAIProvider.testConnection();
      if (!testRes.success) {
        warningMsg = testRes.message;
      }
    }

    const active = this.getActiveAIProvider();
    const activeName = active ? active.name : this.fallbackProvider.name;

    if (warningMsg) {
      return {
        success: true,
        activeProvider: activeName,
        warning: warningMsg,
        message: `API Key saved! Note: ${warningMsg}`
      };
    }

    return {
      success: true,
      activeProvider: activeName,
      message: `AI Provider updated & activated! Primary: ${activeName}`
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
    const config = await AIProviderConfig.findOne({ key: 'ai_provider_config' }).catch(() => null);
    return {
      isAIEnabled: this.isAIEnabled,
      hasOpenAIKey: this.openAIProvider.isConfigured(),
      openAIModel: this.openAIProvider.getModelName(),
      hasGeminiKey: this.geminiProvider.isConfigured(),
      hasGroqKey: this.groqProvider.isConfigured(),
      activeProvider,
      configuredProvider: this.configuredProviderPreference,
      isConnected: config ? config.isConnected : Boolean(active),
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
    if (this.geminiProvider.isConfigured()) return this.geminiProvider;
    if (this.groqProvider.isConfigured()) return this.groqProvider;
    if (this.openAIProvider.isConfigured()) return this.openAIProvider;
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

    // Step 2: Database-First Search (Prioritize verified DB question)
    const dbMatch = await searchDatabaseFirst(req.question);
    const effectiveContext = dbMatch.contextForAI || contextSnippet;

    let rawResult: IDoubtSolveResult | null = null;
    const failoverTrace: string[] = [];

    // Step 3: Multi-tier Failover Execution (1. Gemini -> 2. Groq -> 3. OpenAI -> 4. Fallback)
    if (this.isAIEnabled && this.requestsToday < this.dailyRequestLimit) {
      const candidateProviders: IAIProvider[] = [];
      if (this.geminiProvider.isConfigured()) candidateProviders.push(this.geminiProvider);
      if (this.groqProvider.isConfigured()) candidateProviders.push(this.groqProvider);
      if (this.openAIProvider.isConfigured()) candidateProviders.push(this.openAIProvider);

      for (const provider of candidateProviders) {
        try {
          rawResult = await provider.solveDoubt(req, effectiveContext);
          if (failoverTrace.length > 0) {
            rawResult.provider = `${provider.name} (Failover from ${failoverTrace.join(', ')})`;
          }
          break; // Successfully solved!
        } catch (err: any) {
          failoverTrace.push(provider.name);
          console.warn(`[AIService] ${provider.name} call failed (${err?.message}). Failing over to next provider...`);
        }
      }
    }

    if (!rawResult) {
      rawResult = await this.fallbackProvider.solveDoubt(req, effectiveContext);
      rawResult.provider = this.fallbackProvider.name;
      rawResult.isFallback = true;
      if (failoverTrace.length > 0) {
        rawResult.providerError = `Online providers exhausted (${failoverTrace.join(' -> ')}). Switched to offline verified curriculum.`;
      } else if (!this.getActiveAIProvider()) {
        rawResult.providerError = 'No AI API key configured. Used offline curriculum knowledge.';
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

    if (this.isAIEnabled && this.requestsToday < this.dailyRequestLimit) {
      const candidateProviders: IAIProvider[] = [];
      if (this.geminiProvider.isConfigured()) candidateProviders.push(this.geminiProvider);
      if (this.groqProvider.isConfigured()) candidateProviders.push(this.groqProvider);
      if (this.openAIProvider.isConfigured()) candidateProviders.push(this.openAIProvider);

      for (const provider of candidateProviders) {
        try {
          return await provider.generateProgressiveHints(req);
        } catch (err: any) {
          console.warn(`[AIService] ${provider.name} hints failed (${err?.message}). Trying next...`);
        }
      }
    }
    return await this.fallbackProvider.generateProgressiveHints(req);
  }

  public async analyzeWeakness(req: IWeaknessAnalysisRequest): Promise<IWeaknessAnalysisResult> {
    this.checkAndResetQuota();
    this.requestsToday++;

    if (this.isAIEnabled && this.requestsToday < this.dailyRequestLimit) {
      const candidateProviders: IAIProvider[] = [];
      if (this.geminiProvider.isConfigured()) candidateProviders.push(this.geminiProvider);
      if (this.groqProvider.isConfigured()) candidateProviders.push(this.groqProvider);
      if (this.openAIProvider.isConfigured()) candidateProviders.push(this.openAIProvider);

      for (const provider of candidateProviders) {
        try {
          return await provider.analyzeWeakness(req);
        } catch (err: any) {
          console.warn(`[AIService] ${provider.name} weakness analysis failed (${err?.message}). Trying next...`);
        }
      }
    }
    return await this.fallbackProvider.analyzeWeakness(req);
  }
}

export const aiService = new AIService();
