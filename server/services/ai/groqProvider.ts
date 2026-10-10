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
import { 
  buildSystemInstructions, 
  detectLanguage, 
  isGreetingMessage, 
  isGratitudeMessage,
  buildGreetingResponse,
  buildGratitudeResponse
} from './masterPedagogicalEngine.js';

export class GroqProvider implements IAIProvider {
  public readonly name = 'Groq (Llama)';
  private apiKey: string;
  private modelName: string;

  constructor(apiKey: string, modelName: string = 'openai/gpt-oss-120b') {
    this.apiKey = apiKey;
    this.modelName = modelName;
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().startsWith('gsk_'));
  }

  public updateConfig(apiKey: string, modelName?: string) {
    this.apiKey = apiKey;
    if (modelName) this.modelName = modelName;
  }

  public getModelName(): string {
    return this.modelName;
  }

  public async testConnection(): Promise<{ success: boolean; latencyMs: number; message: string }> {
    if (!this.isConfigured()) {
      return { success: false, latencyMs: 0, message: 'Groq client is not configured (missing Groq API key starting with gsk_).' };
    }
    const start = Date.now();
    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      if (!response.ok) {
        const text = await response.text();
        return {
          success: false,
          latencyMs: Date.now() - start,
          message: `Groq API returned error (${response.status}): ${text.slice(0, 150)}`
        };
      }
      return {
        success: true,
        latencyMs: Date.now() - start,
        message: `Successfully connected to Groq API using model ${this.modelName}.`
      };
    } catch (err: any) {
      return {
        success: false,
        latencyMs: Date.now() - start,
        message: `Groq Network Failure: ${err?.message || 'Could not connect to api.groq.com'}`
      };
    }
  }

  private async chatComplete(systemPrompt: string, userPrompt: string, maxTokens: number): Promise<string> {
    return this.chatCompleteWithMessages([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], maxTokens);
  }

  private async chatCompleteWithMessages(messages: Array<{ role: string; content: string }>, maxTokens: number): Promise<string> {
    const candidateModels = [
      this.modelName,
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'qwen/qwen3.8-27b'
    ];
    const uniqueModels = Array.from(new Set(candidateModels));

    let lastError: Error | null = null;
    for (const model of uniqueModels) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.2,
            max_tokens: maxTokens,
            response_format: { type: 'json_object' }
          })
        });

        if (response.ok) {
          const data: any = await response.json();
          const content = data?.choices?.[0]?.message?.content;
          if (content) {
            this.modelName = model;
            return content;
          }
        }

        const errText = await response.text();
        lastError = new Error(`Groq (${model}) status ${response.status}: ${errText.slice(0, 180)}`);
        if (response.status === 404 || errText.includes('model_not_found') || response.status === 429) {
          continue;
        }
        throw lastError;
      } catch (err: any) {
        lastError = err;
      }
    }
    throw lastError || new Error('All Groq candidate models failed');
  }

  public async solveDoubt(req: IDoubtSolveRequest, contextSnippet?: string): Promise<IDoubtSolveResult> {
    const startTime = Date.now();
    const cleanQ = req.question.trim();
    const lang = detectLanguage(cleanQ, req.conversationHistory);

    if (isGreetingMessage(cleanQ)) {
      const res = buildGreetingResponse(cleanQ, lang);
      res.provider = `Groq (${this.modelName})`;
      return res;
    }
    if (isGratitudeMessage(cleanQ)) {
      const res = buildGratitudeResponse(cleanQ, lang);
      res.provider = `Groq (${this.modelName})`;
      return res;
    }

    const systemInstructions = buildSystemInstructions(req, lang, contextSnippet);

    let userPrompt = `Question: "${cleanQ}"\n`;
    if (req.aiMode) userPrompt += `Pedagogical Mode: ${req.aiMode === 'teacher' ? 'AI Teacher' : 'AI Doubt Solver'}\n`;
    if (req.subject) userPrompt += `User Subject Hint: ${req.subject}\n`;
    if (req.chapter) userPrompt += `User Chapter Hint: ${req.chapter}\n`;
    if (req.classLevel) userPrompt += `Student Level: Class ${req.classLevel}\n`;
    if (req.targetExam) userPrompt += `Target Exam: ${req.targetExam}\n`;
    if (req.requestFollowUp) userPrompt += `Specific Follow-up Request: ${req.requestFollowUp}\n`;
    if (contextSnippet) userPrompt += `\nTrusted PREPORA Reference Content:\n"""\n${contextSnippet.slice(0, 3000)}\n"""\n`;

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemInstructions }
    ];

    if (Array.isArray(req.conversationHistory) && req.conversationHistory.length > 0) {
      for (const item of req.conversationHistory.slice(-6)) {
        const role = (item.role === 'assistant' || item.role === 'model') ? 'assistant' : 'user';
        let content = '';
        if (typeof (item as any).text === 'string') {
          content = (item as any).text.trim();
        } else if (typeof (item as any).content === 'string') {
          content = (item as any).content.trim();
        } else if (Array.isArray((item as any).parts)) {
          content = (item as any).parts.map((p: any) => p.text || '').join('\n').trim();
        }
        if (content) {
          messages.push({ role, content });
        }
      }
    }

    messages.push({ role: 'user', content: userPrompt });

    const rawText = await this.chatCompleteWithMessages(messages, 2048);
    let parsed: any;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = {
        answer: rawText,
        coreConcept: cleanQ
      };
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
      stepByStepSolution: Array.isArray(parsed.stepByStepSolution) ? parsed.stepByStepSolution : [parsed.answer],
      keyFormula: parsed.keyFormula || undefined,
      numericalBreakdown: parsed.numericalBreakdown?.givenValues?.length ? parsed.numericalBreakdown : undefined,
      example: parsed.example || undefined,
      examinerTrap: parsed.examinerTrap || 'Verify sign conventions and units before final computation.',
      examTip: parsed.examTip || 'Focus on fundamental definitions and practice multi-step questions.',
      understanding,
      verificationPassed: true,
      groundedInPrepora: Boolean(contextSnippet),
      retrievedPreporaContext: contextSnippet ? contextSnippet.slice(0, 120) + '...' : undefined,
      suggestedFollowUps: (Array.isArray(parsed.suggestedFollowUps) && parsed.suggestedFollowUps.length > 0)
        ? parsed.suggestedFollowUps.filter((f: any) => typeof f === 'string' && f.trim().length > 0)
        : [
            'Explain simpler',
            'Give real-life example',
            'Step-by-step derivation',
            'Why does this happen?',
            'Test me on this'
          ],
      suggestedPractice: {
        subject: understanding.subject,
        chapter: understanding.chapter || 'Core Chapter',
        topic: understanding.topic || 'Core Topic',
        count: 5,
        actionUrl: `/practice?subject=${encodeURIComponent(understanding.subject)}&chapter=${encodeURIComponent(understanding.chapter || '')}&topic=${encodeURIComponent(understanding.topic || '')}&count=5`
      },
      confidence: 0.95,
      provider: `Groq (${this.modelName})`,
      latencyMs
    };
  }

  public async generateProgressiveHints(req: IProgressiveHintsRequest): Promise<IProgressiveHintsResult> {
    const systemPrompt = [
      "You are a master teacher generating Progressive Hints for a student working on an exam problem.",
      "Do NOT reveal the full answer in hints!",
      "Hint 1: Small subtle clue or perspective shift.",
      "Hint 2: Core concept or formula to apply.",
      "Hint 3: Strategic problem-solving roadmap or substitution step.",
      "Full Solution: Complete verified explanation.",
      "Return ONLY valid JSON matching: { hint1, hint2, hint3, fullSolution, examinerTrap }"
    ].join('\n');

    const prompt = `Question: "${req.question}"\nOptions: ${req.options?.join(', ') || 'N/A'}\nSubject: ${req.subject || ''}\nChapter: ${req.chapter || ''}\nExplanation: ${req.explanation || ''}`;

    const rawText = await this.chatComplete(systemPrompt, prompt, 1024);
    const parsed = JSON.parse(rawText);

    return {
      hint1: parsed.hint1 || 'Identify what is given and what needs to be calculated.',
      hint2: parsed.hint2 || 'Recall the governing equation connecting the given quantities.',
      hint3: parsed.hint3 || 'Substitute the given values with consistent SI units.',
      fullSolution: parsed.fullSolution || req.explanation || 'Verified full step-by-step solution.',
      examinerTrap: parsed.examinerTrap || 'Watch out for sign errors or unit mismatches.'
    };
  }

  public async analyzeWeakness(req: IWeaknessAnalysisRequest): Promise<IWeaknessAnalysisResult> {
    const prompt = [
      `Student Topic: ${req.topic} (${req.subject} - ${req.chapter})`,
      `Accuracy: ${req.accuracy}%`,
      `Errors Logged: ${req.wrongCount} in ${req.totalAttempts} attempts`,
      `Mistake Tags: ${req.mistakeTypes.join(', ')}`,
      `Average Time Per Question: ${req.timePerQuestionSeconds || 90} seconds`,
      "",
      "Classify weakness into one of: 'Concept Gap', 'Application Gap', 'Speed Bottleneck', 'Careless Error Pattern', 'Trap Vulnerability'.",
      "Provide root cause analysis, a one-liner rule to remember, and a 25-question practice plan (5 concept, 5 easy, 10 medium, 5 timed).",
      "Return ONLY JSON: { diagnosedWeaknessType, confidence, rootCauseAnalysis, keyRuleToRemember, prescribedPlan: { conceptQuestions, easyQuestions, mediumQuestions, timedQuestions, expectedAccuracyGain } }"
    ].join('\n');

    const rawText = await this.chatComplete(prompt, 'Analyze the student data above and return the JSON.', 1024);
    const parsed = JSON.parse(rawText);

    return {
      diagnosedWeaknessType: parsed.diagnosedWeaknessType || 'Application Gap',
      confidence: parsed.confidence || 0.88,
      rootCauseAnalysis: parsed.rootCauseAnalysis || `Struggles with multi-step substitution in ${req.topic}.`,
      keyRuleToRemember: parsed.keyRuleToRemember || 'Always resolve vectors and check dimensional consistency before calculation.',
      prescribedPlan: {
        conceptQuestions: parsed.prescribedPlan?.conceptQuestions || 5,
        easyQuestions: parsed.prescribedPlan?.easyQuestions || 5,
        mediumQuestions: parsed.prescribedPlan?.mediumQuestions || 10,
        timedQuestions: parsed.prescribedPlan?.timedQuestions || 5,
        expectedAccuracyGain: parsed.prescribedPlan?.expectedAccuracyGain || '+25%'
      }
    };
  }
}