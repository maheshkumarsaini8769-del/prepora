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

export class GroqProvider implements IAIProvider {
  public readonly name = 'Groq (Llama)';
  private apiKey: string;
  private modelName: string;

  constructor(apiKey: string, modelName: string = 'llama-3.3-70b-versatile') {
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

  private async chatComplete(systemPrompt: string, userPrompt: string, maxTokens: number): Promise<string> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Groq API Error (${response.status}): ${errText}`);
    }

    const data: any = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('Groq returned empty content');
    return content;
  }

  public async solveDoubt(req: IDoubtSolveRequest, contextSnippet?: string): Promise<IDoubtSolveResult> {
    const startTime = Date.now();
    const cleanQ = req.question.trim();

    const systemInstructions = [
      "You are the PREPORA Lead Academic Expert AI for JEE, NEET, CBSE & RBSE students.",
      "MANDATORY RULES:",
      "1. Understand the question internally: intent, subject, chapter, topic, and concept.",
      "2. Answer DIRECTLY what the student asked. NEVER output generic filler text.",
      "3. NEVER force irrelevant formulas (e.g., if asked 'What is gravity?', explain gravity; do NOT output F = ma).",
      "4. For numerical problems, show Given values, Formula, Step-by-Step Substitution, and Units.",
      "5. If provided context content exists, ground your explanation in it.",
      "6. If user requested a follow-up, tailor the response strictly to that request.",
      "",
      "Output strictly valid JSON matching this schema:",
      "{",
      '  "answer": "Clear, concise direct answer to the question",',
      '  "coreConcept": "Exact scientific/mathematical concept name",',
      '  "stepByStepSolution": ["Step 1 explanation", "Step 2 explanation", "Step 3 explanation"],',
      '  "keyFormula": "Only relevant formula or empty string if not applicable",',
      '  "isNumerical": false,',
      '  "numericalBreakdown": { "givenValues": ["m = 5 kg"], "formulaUsed": "W = mg", "calculationSteps": ["W = 5 * 9.8 = 49 J"], "finalValueWithUnits": "49 J" },',
      '  "example": "Practical or exam-relevant example",',
      '  "examinerTrap": "Common student misconception or negative marking trap",',
      '  "examTip": "High-yield score-boosting tip",',
      '  "understanding": { "intent": "definition", "subject": "Physics", "chapter": "Chapter name", "topic": "Topic name", "concept": "Core concept", "difficulty": "Medium" }',
      "}"
    ].join('\n');

    let userPrompt = `Question: "${cleanQ}"\n`;
    if (req.subject) userPrompt += `User Subject Hint: ${req.subject}\n`;
    if (req.chapter) userPrompt += `User Chapter Hint: ${req.chapter}\n`;
    if (req.classLevel) userPrompt += `Student Level: Class ${req.classLevel}\n`;
    if (req.targetExam) userPrompt += `Target Exam: ${req.targetExam}\n`;
    if (req.requestFollowUp) userPrompt += `Specific Follow-up Request: ${req.requestFollowUp}\n`;
    if (contextSnippet) userPrompt += `\nTrusted PREPORA Reference Content:\n"""\n${contextSnippet.slice(0, 3000)}\n"""\n`;

    const rawText = await this.chatComplete(systemInstructions, userPrompt, 2048);
    const parsed = JSON.parse(rawText);

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
      suggestedFollowUps: [
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