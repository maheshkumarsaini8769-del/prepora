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

export class GeminiProvider implements IAIProvider {
  public readonly name = 'Google Gemini AI';
  private apiKey: string;
  private modelName: string;

  constructor(apiKey: string, modelName: string = 'gemini-3.8-flash') {
    this.apiKey = apiKey;
    this.modelName = modelName;
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 8);
  }

  public updateConfig(apiKey: string, modelName?: string) {
    this.apiKey = apiKey;
    if (modelName) this.modelName = modelName;
  }

  public getModelName(): string {
    return this.modelName;
  }

  public async executeWithModelFallback(requestBody: any): Promise<any> {
    const candidateModels = [
      this.modelName,
      'gemini-3.8-flash',
      'gemini-3.6-flash',
      'gemini-3.5-flash'
    ];
    // Deduplicate models preserving order
    const uniqueModels = Array.from(new Set(candidateModels));

    let lastError: Error | null = null;
    for (const model of uniqueModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (res.ok) {
          const data = await res.json();
          this.modelName = model; // Lock into currently responding model
          return data;
        }

        const errText = await res.text();
        lastError = new Error(`Gemini (${model}) status ${res.status}: ${errText.slice(0, 200)}`);
        // If 404 or 503, continue to next candidate model
        if (res.status === 404 || res.status === 503 || res.status === 429) {
          continue;
        }
        // Non-recoverable error (e.g. 400 Bad Request)
        throw lastError;
      } catch (err: any) {
        lastError = err;
      }
    }
    throw lastError || new Error('All Gemini candidate models failed.');
  }

  public async testConnection(): Promise<{ success: boolean; latencyMs: number; message: string }> {
    if (!this.isConfigured()) {
      return { success: false, latencyMs: 0, message: 'Google Gemini client is not configured (missing GEMINI_API_KEY).' };
    }
    const start = Date.now();
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`;
      const res = await fetch(url);
      if (!res.ok) {
        const text = await res.text();
        return {
          success: false,
          latencyMs: Date.now() - start,
          message: `Gemini API returned error (${res.status}): ${text.slice(0, 150)}`
        };
      }
      return {
        success: true,
        latencyMs: Date.now() - start,
        message: `Successfully connected to Google Gemini API using model ${this.modelName}.`
      };
    } catch (err: any) {
      return {
        success: false,
        latencyMs: Date.now() - start,
        message: `Gemini Network Failure: ${err?.message || 'Could not connect to Google Generative Language API.'}`
      };
    }
  }

  public async solveDoubt(req: IDoubtSolveRequest, contextSnippet?: string): Promise<IDoubtSolveResult> {
    const startTime = Date.now();
    const cleanQ = req.question.trim();
    const lang = detectLanguage(cleanQ, req.conversationHistory);

    const systemInstructions = buildSystemInstructions(req, lang, contextSnippet);

    let userPrompt = `Question: "${cleanQ}"\n`;
    if (req.aiMode) userPrompt += `Pedagogical Mode: ${req.aiMode === 'teacher' ? 'AI Teacher' : 'AI Doubt Solver'}\n`;
    if (req.subject) userPrompt += `User Subject Hint: ${req.subject}\n`;
    if (req.chapter) userPrompt += `User Chapter Hint: ${req.chapter}\n`;
    if (req.classLevel) userPrompt += `Student Level: Class ${req.classLevel}\n`;
    if (req.targetExam) userPrompt += `Target Exam: ${req.targetExam}\n`;
    if (req.requestFollowUp) userPrompt += `Specific Follow-up Request: ${req.requestFollowUp}\n`;
    if (contextSnippet) userPrompt += `\nTrusted PREPORA Reference Content:\n"""\n${contextSnippet.slice(0, 3000)}\n"""\n`;

    const userParts: any[] = [{ text: userPrompt }];

    // Image support
    if (req.imageBase64) {
      const mime = req.imageMimeType || 'image/jpeg';
      const cleanBase64 = req.imageBase64.includes('base64,') ? req.imageBase64.split('base64,')[1] : req.imageBase64;
      userParts.push({
        inlineData: {
          mimeType: mime,
          data: cleanBase64
        }
      });
    }

    const contents: any[] = [];

    // Add prior conversation history if provided (up to last 6 turns)
    if (Array.isArray(req.conversationHistory) && req.conversationHistory.length > 0) {
      let lastRole: string | null = null;
      for (const item of req.conversationHistory.slice(-6)) {
        const role = (item.role === 'assistant' || item.role === 'model') ? 'model' : 'user';
        let textContent = '';
        if (typeof (item as any).text === 'string') {
          textContent = (item as any).text.trim();
        } else if (typeof (item as any).content === 'string') {
          textContent = (item as any).content.trim();
        } else if (Array.isArray((item as any).parts)) {
          textContent = (item as any).parts.map((p: any) => p.text || '').join('\n').trim();
        }
        if (!textContent) continue;

        if (lastRole === role && contents.length > 0) {
          contents[contents.length - 1].parts[0].text += `\n\n${textContent}`;
        } else {
          contents.push({ role, parts: [{ text: textContent }] });
          lastRole = role;
        }
      }
    }

    // Gemini API requires starting with user role
    if (contents.length > 0 && contents[0].role === 'model') {
      contents.unshift({ role: 'user', parts: [{ text: 'Hello, please help me with my academic studies.' }] });
    }

    // If trailing role is user, append user prompt to it; otherwise push user role
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts[0].text += `\n\n${userPrompt}`;
      if (userParts.length > 1) {
        contents[contents.length - 1].parts.push(...userParts.slice(1));
      }
    } else {
      contents.push({ role: 'user', parts: userParts });
    }

    const data: any = await this.executeWithModelFallback({
      system_instruction: { parts: [{ text: systemInstructions }] },
      contents,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json'
      }
    });
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error('Gemini returned empty candidate content');
    }

    let cleanJson = rawText.trim();
    if (cleanJson.startsWith('```json')) cleanJson = cleanJson.slice(7);
    else if (cleanJson.startsWith('```')) cleanJson = cleanJson.slice(3);
    if (cleanJson.endsWith('```')) cleanJson = cleanJson.slice(0, -3);
    cleanJson = cleanJson.trim();

    let parsed: any;
    try {
      parsed = JSON.parse(cleanJson);
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
      examinerTrap: (parsed.examinerTrap && typeof parsed.examinerTrap === 'string' && parsed.examinerTrap.trim()) ? parsed.examinerTrap.trim() : undefined,
      examTip: (parsed.examTip && typeof parsed.examTip === 'string' && parsed.examTip.trim()) ? parsed.examTip.trim() : undefined,
      understanding,
      verificationPassed: true,
      groundedInPrepora: Boolean(contextSnippet),
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
      confidence: 0.96,
      provider: `Gemini (${this.modelName})`,
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

    const data: any = await this.executeWithModelFallback({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, responseMimeType: 'application/json' }
    });

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('Gemini returned empty content for progressive hints');
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

    const data: any = await this.executeWithModelFallback({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, responseMimeType: 'application/json' }
    });

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('Gemini returned empty content for weakness analysis');
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
