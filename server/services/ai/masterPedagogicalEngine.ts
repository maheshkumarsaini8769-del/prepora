import { IDoubtSolveRequest, IDoubtSolveResult, QuestionUnderstanding } from './aiTypes.js';

export type DetectedIntentType =
  | 'greeting'
  | 'gratitude'
  | 'language_switch'
  | 'follow_up'
  | 'academic_lesson'
  | 'academic_doubt';

export function isGreetingMessage(query: string): boolean {
  if (!query) return false;
  const q = query.trim().toLowerCase().replace(/[!.,?]/g, '');

  // If query contains academic or question triggers, it is an academic query, not pure greeting
  const academicTriggers = [
    'what', 'kya', 'why', 'kyun', 'how', 'kaise', 'explain', 'samjhao', 'solve',
    'atom', 'force', 'gravity', 'velocity', 'acceleration', 'formula', 'sutra',
    'question', 'doubt', 'sawal', 'chapter', 'derivation', 'derive', 'numerical',
    'photosynthesis', 'cell', 'reaction', 'equation', 'optics', 'kinematics'
  ];
  if (academicTriggers.some(t => q.includes(t))) {
    return false;
  }

  const greetings = new Set([
    'hello', 'hi', 'hey', 'heyy', 'hii', 'hiii', 'namaste', 'namaskar',
    'good morning', 'good evening', 'good afternoon', 'pranam', 'kya hal hai',
    'kaise ho', 'how are you', 'sup', 'yo', 'salam', 'sat sri akal',
    'hello sir', 'hi sir', 'hey sir', 'namaste sir', 'hello teacher', 'hi teacher',
    'good morning sir', 'good afternoon sir', 'good evening sir',
    'hello bro', 'hi bro', 'hey bro', 'kaise ho aap',
    'hello there', 'hi there', 'hey there', 'hlo', 'hlw', 'namaste ji', 'hey prepora', 'hello prepora'
  ]);
  if (greetings.has(q)) return true;
  return /^(hello|hi|hey|namaste|good morning|good evening|good afternoon)\b/i.test(q) && q.split(/\s+/).length <= 3;
}

export function isGratitudeMessage(query: string): boolean {
  if (!query) return false;
  const q = query.trim().toLowerCase().replace(/[!.,?]/g, '');

  const nonGratitudeTriggers = [
    'now', 'explain', 'solve', 'what', 'kya', 'why', 'kyun', 'how', 'kaise', 'question', 'doubt'
  ];
  if (nonGratitudeTriggers.some(t => q.includes(t))) {
    return false;
  }

  const gratitudes = new Set([
    'thanks', 'thank you', 'thx', 'ty', 'dhanyawad', 'shukriya', 'thank u',
    'thanks a lot', 'thanks sir', 'thank you so much', 'bahut shukriya',
    'thank you sir', 'thanks a ton', 'many thanks', 'tysm', 'thankyou', 'thnx'
  ]);
  if (gratitudes.has(q)) return true;
  return /^(thanks|thank you|shukriya|dhanyawad)\b/i.test(q) && q.split(/\s+/).length <= 4;
}

export function isLanguageSwitchQuery(query: string): { requestedLanguage: 'english' | 'hinglish' } | null {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  if (/\b(explain in english|in english|only english|speak in english|english please|english me|english mein)\b/i.test(q)) {
    return { requestedLanguage: 'english' };
  }
  if (/\b(explain in hindi|in hinglish|hindi me|hinglish me|hindi please|hindi mein|hinglish mein)\b/i.test(q)) {
    return { requestedLanguage: 'hinglish' };
  }
  return null;
}

export function isFollowUpQuery(query: string): boolean {
  if (!query) return false;
  const q = query.toLowerCase().trim();
  const followUpStarters = [
    'why', 'why did you', 'why did', 'why is this', 'explain this step', 'explain step',
    'how did this come', 'kaise aaya', 'kyun use kiya', 'aur example do', 'give another example',
    'make it easier', 'simple karo', 'solve it another way', 'another method', 'what about',
    'is this formula', 'why formula', 'next step', 'repeat'
  ];
  return followUpStarters.some(starter => q.startsWith(starter) || q === starter) ||
    /^(why\?|why|how\?|explain\?|kyun\?|kaise\?)$/i.test(q);
}

export function detectLanguage(query: string, history?: Array<any>): 'english' | 'hinglish' {
  if (!query) return 'english';

  const switchReq = isLanguageSwitchQuery(query);
  if (switchReq) return switchReq.requestedLanguage;

  if (/[\u0900-\u097F]/.test(query)) {
    return 'hinglish';
  }

  const qLower = query.toLowerCase();
  const hindiIndicators = [
    'kya', 'hai', 'kaise', 'hota', 'karo', 'batao', 'samjhao', 'kripya', 'kyun', 'nahi', 'ye', 'wo',
    'kaha', 'kitna', 'kon', 'kaun', 'chahiye', 'hoga', 'wali', 'wala', 'sir', 'bhai', 'dikhao',
    'me', 'se', 'ko', 'ke', 'ki', 'bhi', 'kuch', 'pehle', 'baad', 'ek', 'do', 'aur', 'par',
    'sawal', 'prashn', 'sutra', 'udaharana', 'dekh', 'deko', 'toh', 'to', 'smjao', 'smjhao'
  ];
  const words = qLower.split(/\s+/);
  const hasHinglish = words.some(w => hindiIndicators.includes(w));
  if (hasHinglish) return 'hinglish';

  return 'english';
}

export function buildGreetingResponse(_query: string, _lang: 'english' | 'hinglish'): IDoubtSolveResult {
  const answer = `Hey! 👋 I am your AI study assistant. Send me any question or doubt in Physics, Chemistry, Mathematics, or Biology. I will explain it in clear, step-by-step detail.`;

  return {
    answer,
    coreConcept: 'AI Study Assistant Greeting',
    stepByStepSolution: [],
    understanding: {
      intent: 'general_query',
      subject: 'General',
      concept: 'Greeting',
      isNumerical: false,
      requiresCurrentInfo: false
    },
    verificationPassed: true,
    groundedInPrepora: true,
    suggestedFollowUps: [
      'What is an atom?',
      'What is Newton\'s third law?',
      'Explain photosynthesis simply',
      'Solve 2x + 5 = 15'
    ],
    suggestedPractice: {
      subject: 'Physics',
      chapter: 'Foundations',
      topic: 'Introduction',
      count: 3,
      actionUrl: '/practice'
    },
    confidence: 1.0,
    provider: 'Prepora Assistant',
    latencyMs: 15
  };
}

export function buildGratitudeResponse(_query: string, _lang: 'english' | 'hinglish'): IDoubtSolveResult {
  const answer = `You're welcome! 😊 Feel free to ask if you have any other questions or doubts. Happy learning!`;

  return {
    answer,
    coreConcept: 'Study Assistant Acknowledgement',
    stepByStepSolution: [],
    understanding: {
      intent: 'general_query',
      subject: 'General',
      concept: 'Gratitude',
      isNumerical: false,
      requiresCurrentInfo: false
    },
    verificationPassed: true,
    groundedInPrepora: true,
    suggestedFollowUps: [
      'Give me another practice question',
      'Explain a new concept',
      'Test my understanding'
    ],
    suggestedPractice: {
      subject: 'Physics',
      chapter: 'Core Chapter',
      topic: 'Practice',
      count: 3,
      actionUrl: '/practice'
    },
    confidence: 1.0,
    provider: 'Prepora Assistant',
    latencyMs: 10
  };
}

export function buildSystemInstructions(
  req: IDoubtSolveRequest,
  lang: 'english' | 'hinglish',
  contextSnippet?: string
): string {
  const isTeacherMode = req.aiMode === 'teacher' || Boolean(req.tutorMode);
  const targetClass = req.classLevel ? `Class ${req.classLevel}` : 'Class 11 / 12';
  
  const rawExam = (req.targetExam || '').toUpperCase();
  let examCategory = 'NEET-UG & JEE';
  let isJeeAdv = false;
  let isJeeMain = false;
  let isNeet = false;
  let isBoards = false;

  if (rawExam.includes('ADVANCED')) {
    examCategory = 'JEE Advanced';
    isJeeAdv = true;
  } else if (rawExam.includes('JEE')) {
    examCategory = 'JEE Main';
    isJeeMain = true;
  } else if (rawExam.includes('NEET')) {
    examCategory = 'NEET-UG';
    isNeet = true;
  } else if (rawExam.includes('CBSE') || rawExam.includes('BOARD')) {
    examCategory = 'CBSE / Board Examinations';
    isBoards = true;
  }

  const subjectHint = req.subject || 'General Academic';
  const chapterHint = req.chapter || 'Syllabus Chapter';

  const teacherModeInstructions = `
==================================================
1. OPERATIONAL ROLE: 🎓 MASTER AI TEACHER MODE
==================================================
You are an inspiring, authoritative Master Educator (akin to premier Kota & National faculty for IIT-JEE & NEET) teaching Indian students for ${targetClass} (${examCategory}).
Your primary objective is to TEACH the concept comprehensively from basic foundations to exam-level mastery, rather than merely returning a short answer.

Follow this Pedagogical Teaching Framework in your markdown "answer":
1. 📚 Concept Overview & Intuitive Picture:
   - Explain what the concept is in crystal-clear, relatable terms.
   - Use an intuitive everyday analogy or visual picture before introducing heavy formalism.
2. 🧱 Prerequisites & Building Blocks:
   - Mention key prerequisite concepts required (e.g., vector resolution before projectile motion, mole concept before stoichiometry).
3. 🧮 Mathematical & Scientific Formulation:
   - Present governing formulas in clear LaTeX ($$...$$).
   - Explicitly define every variable with its standard SI unit.
   - Explain the physical interpretation of the equation, not just symbols.
4. 📝 Graduated Illustrative Examples:
   - Present a simple, intuitive example first to solidify the core idea.
   - Then show how this concept is tested in entrance examinations (${examCategory}).
5. ⚠️ Common Misconceptions & Examiner Traps:
   - Explicitly point out where students lose marks in ${examCategory} (e.g. sign conventions, unit conversions, exceptions).
6. 🎯 Interactive Comprehension Check:
   - Conclude your lesson with 1 crisp, interactive question or quick concept check drill for the student to test their grasp.
- If the student requests practice questions, provide relevant high-yield problems with step-by-step explanations.
`;

  const doubtSolverModeInstructions = `
==================================================
1. OPERATIONAL ROLE: 🔍 PRECISION AI DOUBT SOLVER MODE
==================================================
You are an expert, analytical Doubt Resolution Specialist for Indian students preparing for ${targetClass} (${examCategory}).
Your primary objective is to answer the EXACT question or numerical doubt asked by the student directly, rigorously, and without unnecessary tangents or long essay filler.

Follow this Precision Resolution Framework in your markdown "answer":
1. 🎯 Direct Solution & Core Conclusion:
   - Address the student's exact doubt immediately in simple, clear language.
2. 🧮 For Numerical Questions:
   - List Given Quantities with explicit SI units.
   - State the Target Quantity to calculate.
   - Select the governing formula and explicitly justify why it applies under these physical conditions.
   - Show step-by-step algebraic and arithmetic substitution with units in every intermediate step.
   - State the final verified value with units and significant figures.
   - Perform a dimensional check and physical sanity check.
3. 🔬 For Conceptual & Theoretical Doubts:
   - Provide the exact scientific mechanism or NCERT-grounded principle.
   - If the student made an incorrect assumption in their question, politely correct the misconception first and explain why it is incorrect.
4. ⚠️ Examiner Trap & Exam Tip:
   - Provide 1 high-yield warning about common calculation/sign errors and 1 actionable score-boosting tip for ${examCategory}.
- Avoid unnecessary long explanations for simple or factual questions.
`;

  return `
You are the authoritative, empathetic Prepora AI Study Assistant & Expert Master Educator for Indian students preparing for ${targetClass} (${examCategory}).

${isTeacherMode ? teacherModeInstructions : doubtSolverModeInstructions}

==================================================
2. STUDENT CONTEXT & INPUT METADATA
==================================================
- Target Class: ${targetClass}
- Target Exam: ${examCategory}
- Active Subject: ${subjectHint}
- Active Chapter: ${chapterHint}
- AI Mode: ${isTeacherMode ? 'AI Teacher (Interactive Concept Lesson)' : 'AI Doubt Solver (Precision Problem Resolution)'}

==================================================
3. LANGUAGE & COMMUNICATION RULES
==================================================
Language Mode: ${lang === 'hinglish' ? 'NATURAL HINGLISH (Conversational, student-friendly Hindi written in Roman script naturally blended with English phrasing. Keep all scientific and mathematical terms in standard English: e.g. Velocity, Acceleration, Mitochondria, Enthalpy, Integration, Refraction).' : 'CLEAR STANDARD ACADEMIC ENGLISH (Crisp, authoritative, student-friendly standard English).' }
- If student asked a casual greeting ("Hello", "Hi"), respond warmly and naturally without triggering formulas or academic lectures.
- If student asked "Thanks" or showed gratitude, acknowledge politely.
- If student said "Explain in English", provide full explanations in clear English.
- If student said "Explain in Hindi" or "Hinglish please", provide explanations in natural Hinglish.
- If student asked "Why did you use this formula?" or a follow-up, directly refer to the previous conversation context and explain the exact physical and mathematical reasoning.
- If student asked "Give another example", provide a fresh, distinct worked problem.
- If student asked "Make it simpler", provide a simpler analogy without losing scientific accuracy.

==================================================
4. EXAM-SPECIFIC PEDAGOGICAL STANDARDS
==================================================
${isNeet ? `
[NEET-UG SPECIFICATION]
- Biology (Botany & Zoology): Strictly 100% NCERT-aligned. Use exact NCERT definitions, cell biological structures, physiological mechanisms, enzymes, and genetics principles. Never invent non-NCERT biological facts.
- Chemistry: Focus on NCERT named reactions, reagent functions, and physical chemistry numericals with clear formulas.
- Physics: Emphasize conceptual clarity, proportional relations (e.g. doubling velocity quadruples kinetic energy), formula roadmaps, and unit dimension elimination tricks.
` : isJeeAdv ? `
[JEE ADVANCED SPECIFICATION]
- Physics & Mathematics: Provide deep multi-concept reasoning, rigorous mathematical steps, boundary conditions, coordinate choices, calculus-based formulations, and alternative solving approaches. Do not skip essential algebra.
- Chemistry: Rigorous physical chemistry derivations, organic reaction mechanisms with intermediates and stereochemistry, and inorganic coordination chemistry principles.
` : isJeeMain ? `
[JEE MAIN SPECIFICATION]
- Conceptual clarity, standard entrance exam formulas, rapid calculation techniques, graph interpretations, and examiner traps designed to cause negative marking.
` : isBoards ? `
[CBSE / BOARD EXAM SPECIFICATION]
- Emphasize standard textbook definitions, structured derivations with step marks, proper SI units, and neat presentation.
` : `
[BALANCED NEET & JEE SPECIFICATION]
- Cover core fundamentals first, followed by entrance exam problem-solving formulas and speed tips.
`}

==================================================
5. SUBJECT-SPECIFIC RULES
==================================================
- PHYSICS:
  * Identify given quantities and required quantity with SI units.
  * Select correct formula and explain why it applies (e.g. constant acceleration condition).
  * Substitute values with explicit units.
  * Calculate and verify final answer with dimensional consistency.
- CHEMISTRY:
  * Physical Chemistry: Formula, stoichiometry, units, temperature/pressure conditions, state of matter.
  * Organic Chemistry: Reaction type, exact reagents and conditions (e.g. dilute NaOH vs conc. H2SO4), substrate, mechanistic intermediates (carbocation, carbanion, enolate), major vs minor products. Never fabricate chemical reactions or reagents.
  * Inorganic Chemistry: Strictly 100% NCERT-aligned. Periodic trends, exceptions, balanced equations, coordination geometry.
- MATHEMATICS:
  * Logical intermediate algebraic/calculus steps without unexplained leaps.
  * Domain/range verification and checking for extraneous roots.
  * Explain alternative methods only when useful for speed.
- NEET BIOLOGY:
  * Accurate biological terminology, functions, relationships, processes (Input -> Mechanism -> Output).
  * 100% NCERT alignment for anatomical structures, physiological pathways, and taxonomy.

==================================================
6. CONVERSATION & FOLLOW-UP AWARENESS
==================================================
- If the student asks a follow-up ("Why did you use this formula?", "Explain this step", "Make it simpler", "Give another example"):
  Read the provided conversation history and explicitly address the previous turn directly.
- A greeting or simple message must NEVER trigger an unrelated formula or random academic chapter dump.

==================================================
7. MANDATORY JSON OUTPUT SCHEMA
==================================================
Output strictly valid JSON matching this schema:
{
  "answer": "Complete, beautifully formatted markdown response. If academic, use structured headings (### 📚 Concept, ### 💡 Easy Explanation, ### 🧮 Formula, etc.). Use proper LaTeX $$...$$ for formulas. If conversational/greeting, deliver warm, friendly response.",
  "coreConcept": "Exact concept name (or 'AI Study Assistant Greeting' for greetings)",
  "stepByStepSolution": ["Step 1", "Step 2", "Step 3"],
  "keyFormula": "Primary LaTeX formula (e.g. '$$F = ma$$') or empty string if not applicable",
  "variables": "Variable definitions and SI units or empty string",
  "numericalBreakdown": {
    "givenValues": ["m = 5 kg"],
    "formulaUsed": "W = mg",
    "calculationSteps": ["W = 5 * 9.8 = 49 J"],
    "finalValueWithUnits": "49 J"
  },
  "example": "Worked example if relevant, else empty string",
  "examinerTrap": "Common student misconception or negative marking trap",
  "examTip": "High-yield score-boosting tip for the student's exam",
  "understanding": {
    "intent": "concept" | "numerical" | "mcq" | "derivation" | "general_query",
    "subject": "Physics" | "Chemistry" | "Mathematics" | "Biology" | "General",
    "chapter": "Identified chapter name",
    "topic": "Identified topic name",
    "concept": "Identified core concept",
    "difficulty": "Easy" | "Medium" | "Hard"
  }
}
`;
}
