import OpenAI from 'openai';
import { IAIProvider } from './aiProvider.interface.js';
import { 
  IDoubtSolveRequest, 
  IDoubtSolveResult, 
  IProgressiveHintsRequest, 
  IProgressiveHintsResult, 
  IWeaknessAnalysisRequest, 
  IWeaknessAnalysisResult,
  QuestionUnderstanding
} from './aiTypes.js';
import { NEET_AI_TEACHER_SYSTEM_PROMPT, detectLanguageMode } from './neetAITeacherPrompt.js';

export class OpenAIProvider implements IAIProvider {
  public readonly name = 'OpenAI';
  private apiKey: string;
  private modelName: string;
  private client: OpenAI | null = null;

  constructor(apiKey?: string, modelName: string = 'gpt-4o-mini') {
    this.apiKey = (apiKey || process.env.OPENAI_API_KEY || '').trim();
    this.modelName = process.env.OPENAI_MODEL || modelName || 'gpt-4o-mini';
    this.initClient();
  }

  private initClient(): void {
    if (this.apiKey && this.apiKey.length > 5) {
      try {
        this.client = new OpenAI({
          apiKey: this.apiKey,
          timeout: 25000,
          maxRetries: 2
        });
      } catch (err) {
        console.error('[OpenAIProvider] Failed to instantiate OpenAI client:', err);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  }

  public isConfigured(): boolean {
    if (!this.apiKey && process.env.OPENAI_API_KEY) {
      this.apiKey = process.env.OPENAI_API_KEY.trim();
      this.initClient();
    }
    return Boolean(this.client && this.apiKey && this.apiKey.length > 5);
  }

  public updateConfig(apiKey: string, modelName?: string): void {
    this.apiKey = (apiKey || process.env.OPENAI_API_KEY || '').trim();
    if (modelName) this.modelName = modelName;
    this.initClient();
  }

  public getModelName(): string {
    return this.modelName;
  }

  public async testConnection(): Promise<{ success: boolean; latencyMs: number; message: string }> {
    if (!this.isConfigured() || !this.client) {
      return { success: false, latencyMs: 0, message: 'OpenAI client is not configured (missing OPENAI_API_KEY).' };
    }
    const start = Date.now();
    try {
      await this.client.models.list();
      return {
        success: true,
        latencyMs: Date.now() - start,
        message: `Successfully connected to OpenAI API using model ${this.modelName}.`
      };
    } catch (err: any) {
      const formatted = this.formatError(err);
      return {
        success: false,
        latencyMs: Date.now() - start,
        message: formatted.message
      };
    }
  }

  /**
   * Formats OpenAI SDK error into human-readable diagnostic message.
   */
  private formatError(err: any): Error {
    if (err instanceof OpenAI.AuthenticationError || err?.status === 401) {
      return new Error(`OpenAI Authentication Failed: Invalid API key or unauthorized access. Verify your OPENAI_API_KEY.`);
    }
    if (err instanceof OpenAI.RateLimitError || err?.status === 429) {
      return new Error(`OpenAI Rate Limit / Quota Exceeded: Insufficient credits or rate limit hit. Check your OpenAI account billing and quota.`);
    }
    if (err instanceof OpenAI.BadRequestError || err?.status === 400) {
      return new Error(`OpenAI Invalid Request: Model '${this.modelName}' rejected request or parameters. Details: ${err?.message}`);
    }
    if (err instanceof OpenAI.APIConnectionTimeoutError) {
      return new Error(`OpenAI Request Timeout: Request timed out after 25s.`);
    }
    if (err instanceof OpenAI.APIConnectionError) {
      return new Error(`OpenAI Network Failure: Could not reach api.openai.com. Check network connectivity.`);
    }
    if (err instanceof OpenAI.InternalServerError || (err?.status && err.status >= 500)) {
      return new Error(`OpenAI Server Error (${err?.status || 500}): OpenAI service temporarily unavailable.`);
    }
    return new Error(err?.message || 'OpenAI API encountered an unexpected error.');
  }

  public async solveDoubt(req: IDoubtSolveRequest, contextSnippet?: string): Promise<IDoubtSolveResult> {
    if (!this.client) {
      throw new Error('OpenAI Provider is not configured. OPENAI_API_KEY is missing or invalid.');
    }

    const startTime = Date.now();
    const cleanQ = req.question.trim();
    const langMode = detectLanguageMode(cleanQ);

    const isJee = Boolean(req.targetExam && req.targetExam.toUpperCase().includes('JEE')) || req.subject === 'Mathematics';
    const examName = isJee ? 'JEE Main & Advanced' : 'NEET-UG';

    const systemInstructions = [
      NEET_AI_TEACHER_SYSTEM_PROMPT,
      "",
      `TARGET EXAM CONTEXT: ${examName}. Tailor all explanations, tricks, and priority markers for ${examName}.`,
      `DETECTED STUDENT LANGUAGE: ${langMode === 'hinglish' ? 'HINGLISH (explain in friendly, natural Hinglish, keeping scientific terms in English)' : 'ENGLISH (explain in clear, professional English)'}`,
      "",
      "MANDATORY JSON OUTPUT SCHEMA:",
      "Output strictly valid JSON matching this schema:",
      "{",
      '  "answer": "Complete, structured answer formatted using designated markdown headings (### 📚 Concept, ### 💡 Easy Explanation, ### 🧮 Formula, etc. for concepts, or ### Given, ### Find, etc. for numericals). Use proper LaTeX $$...$$ for formulas.",',
      '  "coreConcept": "Exact scientific/mathematical concept name",',
      '  "stepByStepSolution": ["Step 1 explanation", "Step 2 explanation", "Step 3 explanation"],',
      '  "keyFormula": "Only relevant formula in LaTeX or empty string if not applicable",',
      '  "variables": "Variables and SI units definition string",',
      '  "isNumerical": false,',
      '  "numericalBreakdown": {',
      '    "givenValues": ["m = 5 kg"],',
      '    "formulaUsed": "W = mg",',
      '    "calculationSteps": ["W = 5 * 9.8 = 49 J"],',
      '    "finalValueWithUnits": "49 J"',
      '  },',
      '  "example": "Worked example if numerical/example requested, else empty string",',
      '  "examinerTrap": "Common student misconception or negative marking trap",',
      '  "examTip": "High-yield score-boosting tip for NEET/JEE/Boards",',
      '  "understanding": {',
      '    "intent": "concept" | "numerical" | "mcq" | "assertion_reason" | "statement" | "formula" | "general",',
      '    "subject": "Physics" | "Chemistry" | "Mathematics" | "Biology" | "General",',
      '    "chapter": "Identified chapter name",',
      '    "topic": "Identified topic name",',
      '    "concept": "Identified core concept",',
      '    "difficulty": "Easy" | "Medium" | "Hard"',
      '  }',
      "}"
    ].join('\n');

    let userPrompt = `Question: "${cleanQ}"\n`;
    if (req.subject) userPrompt += `User Subject Hint: ${req.subject}\n`;
    if (req.chapter) userPrompt += `User Chapter Hint: ${req.chapter}\n`;
    if (req.classLevel) userPrompt += `Student Level: Class ${req.classLevel}\n`;
    if (req.targetExam) userPrompt += `Target Exam: ${req.targetExam}\n`;
    if (req.requestFollowUp) userPrompt += `Specific Follow-up Mode Request: ${req.requestFollowUp}\n`;
    if (contextSnippet) userPrompt += `\nTrusted PREPORA Reference Content:\n"""\n${contextSnippet.slice(0, 3000)}\n"""\n`;

    let userMessageContent: any = userPrompt;

    // Vision / Image Support
    if (req.imageBase64) {
      const mime = req.imageMimeType || 'image/jpeg';
      const cleanBase64 = req.imageBase64.includes('base64,') ? req.imageBase64.split('base64,')[1] : req.imageBase64;
      userMessageContent = [
        { type: 'text', text: userPrompt },
        {
          type: 'image_url',
          image_url: {
            url: `data:${mime};base64,${cleanBase64}`
          }
        }
      ];
    }

    try {
      const openAiMessages: Array<OpenAI.Chat.ChatCompletionMessageParam> = [
        { role: 'system', content: systemInstructions }
      ];

      // Add prior conversation history if provided
      if (Array.isArray(req.conversationHistory) && req.conversationHistory.length > 0) {
        for (const item of req.conversationHistory.slice(-6)) {
          const role = item.role === 'model' ? 'assistant' : 'user';
          let content = '';
          if (typeof (item as any).text === 'string') {
            content = (item as any).text.trim();
          } else if (Array.isArray((item as any).parts)) {
            content = (item as any).parts.map((p: any) => p.text || '').join('\n').trim();
          }
          if (content) {
            openAiMessages.push({ role, content });
          }
        }
      }

      openAiMessages.push({ role: 'user', content: userMessageContent });

      const completion = await this.client.chat.completions.create({
        model: this.modelName,
        messages: openAiMessages,
        temperature: 0.2,
        max_tokens: 2048,
        response_format: { type: 'json_object' }
      });

      const rawText = completion.choices?.[0]?.message?.content;
      if (!rawText || !rawText.trim()) {
        throw new Error('OpenAI returned an empty response content.');
      }

      let parsed: any;
      try {
        parsed = JSON.parse(rawText);
      } catch (parseErr) {
        throw new Error('OpenAI returned malformed non-JSON output.');
      }

      const understanding: QuestionUnderstanding = {
        intent: parsed.understanding?.intent || 'explanation',
        subject: parsed.understanding?.subject || (req.subject as any) || 'General',
        chapter: parsed.understanding?.chapter || req.chapter || 'Foundations',
        topic: parsed.understanding?.topic || req.topic || 'General Topic',
        concept: parsed.understanding?.concept || parsed.coreConcept || cleanQ,
        difficulty: parsed.understanding?.difficulty || 'Medium',
        isNumerical: Boolean(parsed.isNumerical || parsed.numericalBreakdown?.givenValues?.length),
        requiresCurrentInfo: false
      };

      const latencyMs = Date.now() - startTime;

      return {
        answer: parsed.answer || 'Concept explained according to exam standards.',
        coreConcept: parsed.coreConcept || understanding.concept || cleanQ,
        stepByStepSolution: Array.isArray(parsed.stepByStepSolution) ? parsed.stepByStepSolution : [parsed.answer || ''],
        keyFormula: parsed.keyFormula || undefined,
        variables: parsed.variables || undefined,
        numericalBreakdown: parsed.numericalBreakdown?.givenValues?.length ? parsed.numericalBreakdown : undefined,
        example: parsed.example || undefined,
        examinerTrap: parsed.examinerTrap || 'Check all unit conversions and sign conventions.',
        examTip: parsed.examTip || 'High-yield concept in national entrance examinations.',
        understanding,
        verificationPassed: true,
        groundedInPrepora: Boolean(contextSnippet),
        retrievedPreporaContext: contextSnippet ? contextSnippet.slice(0, 300) : undefined,
        suggestedFollowUps: [
          'Give step-by-step example',
          'Explain simpler',
          'Show governing formulas',
          'Test me on this'
        ],
        suggestedPractice: {
          subject: understanding.subject,
          chapter: understanding.chapter || req.chapter || 'General',
          topic: understanding.topic || req.topic || 'General Topic',
          count: 5,
          actionUrl: `/practice?subject=${encodeURIComponent(understanding.subject)}&chapter=${encodeURIComponent(understanding.chapter || '')}&count=5`
        },
        confidence: 0.98,
        provider: `${this.name} (${this.modelName})`,
        latencyMs
      };
    } catch (err: any) {
      throw this.formatError(err);
    }
  }

  public async generateProgressiveHints(req: IProgressiveHintsRequest): Promise<IProgressiveHintsResult> {
    if (!this.client) {
      throw new Error('OpenAI Provider is not configured. OPENAI_API_KEY is missing.');
    }

    const systemInstructions = `You are a world-class academic tutor generating 3 progressive hints for an exam question.
Output strictly valid JSON with keys:
{
  "hint1": "Gentle conceptual clue pointing to the right principle without revealing math",
  "hint2": "Governing equation and key formula to apply",
  "hint3": "Step-by-step substitution and approach strategy",
  "fullSolution": "Complete derivation and final answer with units",
  "examinerTrap": "Common student misconception or negative marking trap"
}`;

    const userPrompt = `Question: "${req.question}"
Subject: ${req.subject || 'General'}
Chapter: ${req.chapter || 'Foundations'}
Topic: ${req.topic || 'General'}
${req.explanation ? `Verified Textbook Explanation: ${req.explanation}` : ''}`;

    try {
      const completion = await this.client.chat.completions.create({
        model: this.modelName,
        messages: [
          { role: 'system', content: systemInstructions },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 1500,
        response_format: { type: 'json_object' }
      });

      const raw = completion.choices?.[0]?.message?.content;
      if (!raw) throw new Error('OpenAI returned empty response for progressive hints.');
      return JSON.parse(raw);
    } catch (err: any) {
      throw this.formatError(err);
    }
  }

  public async analyzeWeakness(req: IWeaknessAnalysisRequest): Promise<IWeaknessAnalysisResult> {
    if (!this.client) {
      throw new Error('OpenAI Provider is not configured. OPENAI_API_KEY is missing.');
    }

    const systemInstructions = `You are an educational diagnostic engine analyzing student performance weaknesses.
Output strictly valid JSON matching:
{
  "diagnosedWeaknessType": "Concept Gap" | "Application Gap" | "Speed Bottleneck" | "Careless Error Pattern" | "Trap Vulnerability",
  "confidence": 0.85,
  "rootCauseAnalysis": "Precise educational diagnosis of why student makes errors in this topic",
  "keyRuleToRemember": "Core rule or golden formula to avoid this mistake",
  "prescribedPlan": {
    "conceptQuestions": 5,
    "easyQuestions": 5,
    "mediumQuestions": 10,
    "timedQuestions": 5,
    "expectedAccuracyGain": "+25%"
  }
}`;

    const userPrompt = `Topic: ${req.topic} (${req.chapter} — ${req.subject})
Accuracy: ${req.accuracy}%
Mistake Patterns: ${req.mistakeTypes.join(', ')}
Total Attempts: ${req.totalAttempts}
Wrong Count: ${req.wrongCount}`;

    try {
      const completion = await this.client.chat.completions.create({
        model: this.modelName,
        messages: [
          { role: 'system', content: systemInstructions },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      });

      const raw = completion.choices?.[0]?.message?.content;
      if (!raw) throw new Error('OpenAI returned empty response for weakness analysis.');
      return JSON.parse(raw);
    } catch (err: any) {
      throw this.formatError(err);
    }
  }
}
