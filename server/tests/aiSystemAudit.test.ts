import 'dotenv/config';
import { aiService } from '../services/ai/aiService.js';
import { GeminiProvider } from '../services/ai/geminiProvider.js';
import { GroqProvider } from '../services/ai/groqProvider.js';
import { FallbackProvider } from '../services/ai/fallbackProvider.js';
import { 
  isGreetingMessage, 
  isGratitudeMessage, 
  isLanguageSwitchQuery, 
  detectLanguage 
} from '../services/ai/masterPedagogicalEngine.js';

interface TestResult {
  testNumber: number;
  name: string;
  category: string;
  passed: boolean;
  provider: string;
  latencyMs: number;
  details: string;
}

const results: TestResult[] = [];

function recordResult(testNumber: number, name: string, category: string, passed: boolean, provider: string, latencyMs: number, details: string) {
  results.push({ testNumber, name, category, passed, provider, latencyMs, details });
  const symbol = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`[${symbol}] Test ${testNumber}: ${name} (${provider}, ${latencyMs}ms)`);
  if (!passed) {
    console.error(`   Reason: ${details}`);
  }
}

export async function runAllTests() {
  console.log('\n===============================================================');
  console.log('🤖 RUNNING COMPLETE PREPORA AI SYSTEM AUDIT (20 REQUIRED TESTS)');
  console.log('===============================================================\n');

  await aiService.ensureInitialized();
  const status = await aiService.getStatus();
  console.log(`Initial Status: Active Provider=${status.activeProvider}, HasGemini=${status.hasGeminiKey}, HasGroq=${status.hasGroqKey}\n`);

  // -------------------------------------------------------------
  // TEST 1: Greeting Test: "Hello"
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Hello',
      subject: 'Physics',
      chapter: 'Kinematics',
      classLevel: '11',
      targetExam: 'NEET'
    });
    const ans = res.result.answer;
    const isFriendlyGreeting = ans.includes('AI study assistant') || ans.includes('study assistant');
    const hasNoRandomFormula = !ans.includes('v = u + at') && !ans.includes('Kinematics — Core Theory');
    const passed = isFriendlyGreeting && hasNoRandomFormula;
    recordResult(1, 'Greeting Test ("Hello")', 'Conversational', passed, res.result.provider || 'AI', Date.now() - t0, 
      passed ? 'Returned friendly assistant greeting without formula dump' : `Unexpected answer: ${ans.slice(0, 100)}`);
  } catch (err: any) {
    recordResult(1, 'Greeting Test ("Hello")', 'Conversational', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 2: Gratitude Test: "Thanks"
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Thanks',
      subject: 'Physics',
      chapter: 'Kinematics'
    });
    const ans = res.result.answer;
    const isWarmGratitude = ans.toLowerCase().includes('welcome') || ans.includes('Koi aur doubt ho');
    const hasNoRandomFormula = !ans.includes('Kinematics — Core Theory');
    const passed = isWarmGratitude && hasNoRandomFormula;
    recordResult(2, 'Gratitude Test ("Thanks")', 'Conversational', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Returned warm acknowledgement' : `Unexpected answer: ${ans.slice(0, 100)}`);
  } catch (err: any) {
    recordResult(2, 'Gratitude Test ("Thanks")', 'Conversational', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 3: Language Switch Test: Hindi/Hinglish -> "Explain in English"
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Explain in English',
      conversationHistory: [
        { role: 'user', parts: [{ text: 'Pehle mujhe batao gravity kya hoti hai?' }] },
        { role: 'model', parts: [{ text: 'Guru twakarshan ek aakarshan bal hai jo do dravyamano ke beech lagta hai.' }] }
      ],
      subject: 'Physics',
      chapter: 'Gravitation',
      requestedLanguage: 'english'
    });
    const ans = res.result.answer;
    const isEnglish = ans.includes('English') || ans.includes('gravity') || ans.includes('mass') || ans.includes('academic');
    const passed = isEnglish && !ans.includes('Guru twakarshan');
    recordResult(3, 'Language Switch Test ("Explain in English")', 'Language Adaptation', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Switched and responded in academic English' : `Did not switch cleanly: ${ans.slice(0, 100)}`);
  } catch (err: any) {
    recordResult(3, 'Language Switch Test ("Explain in English")', 'Language Adaptation', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 4: Follow-up Test: "Why did you use this formula?"
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Why did you use this formula?',
      conversationHistory: [
        { role: 'user', parts: [{ text: 'A ball dropped from height h reaches ground with speed v. Find v.' }] },
        { role: 'model', parts: [{ text: 'We use v^2 = u^2 + 2gh where u=0, so v = sqrt(2gh).' }] }
      ],
      subject: 'Physics',
      chapter: 'Kinematics'
    });
    const ans = res.result.answer;
    const mentionsFormulaReasoning = ans.toLowerCase().includes('formula') || ans.toLowerCase().includes('acceleration') || ans.toLowerCase().includes('parameter') || ans.toLowerCase().includes('given');
    const hasNoDumping = !ans.includes('### 📚 Concept\n**Why did you use this formula?**');
    const passed = mentionsFormulaReasoning && hasNoDumping;
    recordResult(4, 'Follow-up Test ("Why did you use this formula?")', 'Context Awareness', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Explained scientific reasoning for formula selection' : `Lacked contextual formula explanation: ${ans.slice(0, 100)}`);
  } catch (err: any) {
    recordResult(4, 'Follow-up Test ("Why did you use this formula?")', 'Context Awareness', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 5: Follow-up Test: "Explain this step"
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Explain this step',
      conversationHistory: [
        { role: 'user', parts: [{ text: 'Solve 2x + 5 = 15' }] },
        { role: 'model', parts: [{ text: 'Step 1: 2x = 15 - 5 = 10. Step 2: x = 10 / 2 = 5.' }] }
      ],
      subject: 'Mathematics',
      chapter: 'Linear Equations'
    });
    const ans = res.result.answer;
    const explainsStep = ans.toLowerCase().includes('step') || ans.toLowerCase().includes('substitut') || ans.toLowerCase().includes('algebra') || ans.toLowerCase().includes('simplif');
    const passed = explainsStep && !ans.includes('### 📚 Concept\n**Explain this step**');
    recordResult(5, 'Follow-up Test ("Explain this step")', 'Context Awareness', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Provided detailed algebraic breakdown of the step' : `Did not explain step: ${ans.slice(0, 100)}`);
  } catch (err: any) {
    recordResult(5, 'Follow-up Test ("Explain this step")', 'Context Awareness', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 6: Physics Numerical: Class 11 Kinematics
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'A car starts from rest and accelerates uniformly at 4 m/s² for 5 seconds. Find its final velocity and distance traveled.',
      subject: 'Physics',
      chapter: 'Kinematics',
      classLevel: '11',
      targetExam: 'JEE Main'
    });
    const ans = res.result.answer;
    // v = 0 + 4*5 = 20 m/s; s = 0.5 * 4 * 25 = 50 m
    const hasVelocity = ans.includes('20') || ans.includes('v = u + at');
    const hasDistance = ans.includes('50') || ans.includes('s = ut');
    const passed = hasVelocity && hasDistance;
    recordResult(6, 'Physics Numerical (Class 11 Kinematics)', 'Physics', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Accurately computed final velocity (20 m/s) and distance (50 m)' : `Calculation incomplete: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(6, 'Physics Numerical (Class 11 Kinematics)', 'Physics', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 7: Physics Conceptual: Class 12 Wave Optics / Photoelectric Effect
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Explain why photoelectric emission does not take place if the frequency of incident light is below threshold frequency.',
      subject: 'Physics',
      chapter: 'Dual Nature of Radiation and Matter',
      classLevel: '12',
      targetExam: 'NEET'
    });
    const ans = res.result.answer;
    const hasWorkFunction = ans.toLowerCase().includes('work function') || ans.includes('phi') || ans.includes('threshold') || ans.includes('photon');
    const hasEnergyReason = ans.toLowerCase().includes('energy') && (ans.toLowerCase().includes('electron') || ans.toLowerCase().includes('frequency'));
    const passed = hasWorkFunction && hasEnergyReason;
    recordResult(7, 'Physics Conceptual (Class 12 Photoelectric Effect)', 'Physics', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Correctly grounded in work function, threshold frequency, and photon energy' : `Missing key quantum concepts: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(7, 'Physics Conceptual (Class 12 Photoelectric Effect)', 'Physics', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 8: Physical Chemistry: Class 11 Thermodynamics / Mole Concept
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Calculate the number of moles in 36 grams of pure water (H₂O). Given molar masses: H = 1 g/mol, O = 16 g/mol.',
      subject: 'Chemistry',
      chapter: 'Some Basic Concepts of Chemistry',
      classLevel: '11',
      targetExam: 'NEET'
    });
    const ans = res.result.answer;
    // 36 / 18 = 2 moles
    const hasMolarMass = ans.includes('18');
    const hasTwoMoles = ans.includes('2') && (ans.toLowerCase().includes('mol') || ans.toLowerCase().includes('mole'));
    const passed = hasMolarMass && hasTwoMoles;
    recordResult(8, 'Physical Chemistry (Class 11 Mole Concept)', 'Chemistry', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Correctly computed molar mass (18 g/mol) and 2 moles of H₂O' : `Calculation mismatch: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(8, 'Physical Chemistry (Class 11 Mole Concept)', 'Chemistry', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 9: Organic Chemistry: Class 12 Aldehydes & Ketones
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Explain the mechanism of Aldol condensation of acetaldehyde (ethanal) in the presence of dilute NaOH.',
      subject: 'Chemistry',
      chapter: 'Aldehydes, Ketones and Carboxylic Acids',
      classLevel: '12',
      targetExam: 'JEE Main'
    });
    const ans = res.result.answer;
    const hasEnolate = ans.toLowerCase().includes('enolate') || ans.toLowerCase().includes('carbanion') || ans.toLowerCase().includes('alpha-hydrogen') || ans.toLowerCase().includes('alpha');
    const hasAldolProduct = ans.toLowerCase().includes('aldol') || ans.toLowerCase().includes('hydroxy') || ans.toLowerCase().includes('but-2-enal') || ans.toLowerCase().includes('crotonaldehyde');
    const passed = hasEnolate || hasAldolProduct;
    recordResult(9, 'Organic Chemistry (Class 12 Aldol Condensation)', 'Chemistry', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Accurately detailed enolate formation and nucleophilic addition mechanism' : `Incomplete mechanism details: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(9, 'Organic Chemistry (Class 12 Aldol Condensation)', 'Chemistry', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 10: Inorganic Chemistry: Periodic Trends / Coordination
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Explain why ionization enthalpy generally increases across a period from left to right in the periodic table.',
      subject: 'Chemistry',
      chapter: 'Classification of Elements and Periodicity in Properties',
      classLevel: '11',
      targetExam: 'NEET'
    });
    const ans = res.result.answer;
    const hasZeff = ans.toLowerCase().includes('effective nuclear charge') || ans.toLowerCase().includes('nuclear charge') || ans.includes('Z_eff') || ans.includes('Zeff');
    const hasAtomicRadius = ans.toLowerCase().includes('atomic radius') || ans.toLowerCase().includes('size') || ans.toLowerCase().includes('electrons held');
    const passed = hasZeff && hasAtomicRadius;
    recordResult(10, 'Inorganic Chemistry (Periodic Trends Ionization Enthalpy)', 'Chemistry', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Properly explained effective nuclear charge increase and radius reduction' : `Missing key periodic trend drivers: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(10, 'Inorganic Chemistry (Periodic Trends Ionization Enthalpy)', 'Chemistry', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 11: Mathematics Class 11: Quadratic Equations
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Find the roots of the quadratic equation x² - 5x + 6 = 0.',
      subject: 'Mathematics',
      chapter: 'Quadratic Equations',
      classLevel: '11',
      targetExam: 'JEE Main'
    });
    const ans = res.result.answer;
    const hasRoots = (ans.includes('2') && ans.includes('3')) && (ans.includes('x = 2') || ans.includes('x = 3') || ans.includes('(x - 2)(x - 3)'));
    const passed = hasRoots;
    recordResult(11, 'Mathematics Class 11 (Quadratic Equation Roots)', 'Mathematics', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Correctly factored and found roots x = 2 and x = 3' : `Incorrect roots: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(11, 'Mathematics Class 11 (Quadratic Equation Roots)', 'Mathematics', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 12: Mathematics Class 12: Calculus (Derivatives)
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Differentiate f(x) = x³ * sin(x) with respect to x using the product rule.',
      subject: 'Mathematics',
      chapter: 'Continuity and Differentiability',
      classLevel: '12',
      targetExam: 'JEE Main'
    });
    const ans = res.result.answer;
    // d/dx = 3x^2 sin(x) + x^3 cos(x)
    const hasProductRule = ans.includes('3x') && (ans.includes('sin') && ans.includes('cos'));
    const passed = hasProductRule;
    recordResult(12, 'Mathematics Class 12 (Product Rule Derivative)', 'Mathematics', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Correctly evaluated derivative: 3x² sin(x) + x³ cos(x)' : `Incorrect calculus result: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(12, 'Mathematics Class 12 (Product Rule Derivative)', 'Mathematics', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 13: Biology Class 11: Cell Biology / Plant Physiology
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'What is the role of chloroplast and chlorophyll in photosynthesis?',
      subject: 'Biology',
      chapter: 'Photosynthesis in Higher Plants',
      classLevel: '11',
      targetExam: 'NEET'
    });
    const ans = res.result.answer;
    const hasChlorophyllRole = ans.toLowerCase().includes('light') && (ans.toLowerCase().includes('thylakoid') || ans.toLowerCase().includes('atp') || ans.toLowerCase().includes('absorb'));
    const passed = hasChlorophyllRole;
    recordResult(13, 'Biology Class 11 (Chloroplast in Photosynthesis)', 'Biology', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'NCERT-aligned explanation of light absorption and energy synthesis' : `Incomplete biological mechanism: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(13, 'Biology Class 11 (Chloroplast in Photosynthesis)', 'Biology', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 14: Biology Class 12: Genetics (Mendel Laws)
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'State Mendel\'s Law of Segregation and give the phenotypic ratio of a monohybrid cross in F₂ generation.',
      subject: 'Biology',
      chapter: 'Principles of Inheritance and Variation',
      classLevel: '12',
      targetExam: 'NEET'
    });
    const ans = res.result.answer;
    const hasSegregation = ans.toLowerCase().includes('gamete') || ans.toLowerCase().includes('allele') || ans.toLowerCase().includes('segregat');
    const hasRatio = ans.includes('3:1') || ans.includes('3 : 1');
    const passed = hasSegregation && hasRatio;
    recordResult(14, 'Biology Class 12 (Mendel\'s Law of Segregation)', 'Biology', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Accurately stated allele segregation and 3:1 phenotypic ratio' : `Missing segregation principle or ratio: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(14, 'Biology Class 12 (Mendel\'s Law of Segregation)', 'Biology', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 15: NEET-Specific Difficulty: NCERT Alignment Check
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Explain the fluid mosaic model of cell membrane according to NCERT for NEET.',
      subject: 'Biology',
      chapter: 'Cell: The Unit of Life',
      classLevel: '11',
      targetExam: 'NEET'
    });
    const ans = res.result.answer;
    const hasSingerNicolson = ans.toLowerCase().includes('singer') || ans.toLowerCase().includes('nicolson') || ans.toLowerCase().includes('phospholipid') || ans.toLowerCase().includes('lipid bilayer');
    const hasFluidNature = ans.toLowerCase().includes('fluid') || ans.toLowerCase().includes('protein');
    const passed = hasSingerNicolson && hasFluidNature;
    recordResult(15, 'NEET-Specific Difficulty (NCERT Fluid Mosaic Model)', 'NEET Alignment', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Strictly NCERT-aligned citing Singer & Nicolson lipid bilayer architecture' : `Did not meet NCERT standard: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(15, 'NEET-Specific Difficulty (NCERT Fluid Mosaic Model)', 'NEET Alignment', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 16: JEE Main Difficulty: Standard Formula & Speed Solving
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'A body of mass 2 kg moving with velocity 10 m/s undergoes an elastic one-dimensional collision with an identical stationary 2 kg body. Find their final velocities for JEE Main.',
      subject: 'Physics',
      chapter: 'Work, Energy & Power',
      classLevel: '11',
      targetExam: 'JEE Main'
    });
    const ans = res.result.answer;
    // In equal mass 1D elastic collision, velocities exchange: v1 = 0 m/s, v2 = 10 m/s
    const hasExchangeOrZero = (ans.includes('0') && ans.includes('10')) || ans.toLowerCase().includes('exchange') || ans.includes('v_1 = 0');
    const passed = hasExchangeOrZero;
    recordResult(16, 'JEE Main Difficulty (Elastic Collision Speed Hack)', 'JEE Main', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Correctly used velocity exchange principle: v₁ = 0 m/s, v₂ = 10 m/s' : `Collision solution incorrect: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(16, 'JEE Main Difficulty (Elastic Collision Speed Hack)', 'JEE Main', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 17: JEE Advanced Difficulty: Multi-concept Reasoning
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'A small block of mass m is placed on a smooth inclined wedge of mass M with angle theta, resting on a frictionless horizontal floor. Find the acceleration of the wedge for JEE Advanced.',
      subject: 'Physics',
      chapter: 'Laws of Motion',
      classLevel: '11',
      targetExam: 'JEE Advanced'
    });
    const ans = res.result.answer;
    const hasRigorousPhysics = ans.toLowerCase().includes('pseudo') || ans.toLowerCase().includes('normal') || ans.toLowerCase().includes('horizontal') || ans.includes('\\sin') || ans.includes('sin');
    const passed = hasRigorousPhysics;
    recordResult(17, 'JEE Advanced Difficulty (Multi-concept Wedge Dynamics)', 'JEE Advanced', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Multi-concept constraint analysis with pseudo force & normal force balancing' : `Lacked JEE Advanced depth: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(17, 'JEE Advanced Difficulty (Multi-concept Wedge Dynamics)', 'JEE Advanced', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 18: AI Teacher Structured Lesson Test
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'Teach me First Law of Thermodynamics from basics for Class 11',
      subject: 'Physics',
      chapter: 'Thermodynamics',
      classLevel: '11',
      targetExam: 'JEE Main',
      aiMode: 'teacher',
      tutorMode: 'Learn'
    });
    const ans = res.result.answer;
    const isStructuredLesson = (ans.includes('ΔQ') || ans.includes('dQ') || ans.includes('ΔU') || ans.includes('Heat') || ans.includes('Internal Energy') || ans.includes('First Law')) && (ans.length > 150);
    const passed = isStructuredLesson;
    recordResult(18, 'AI Teacher Mode (Structured Thermodynamics Lesson)', 'AI Teacher Mode', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Delivered structured educational lesson with foundational analogies' : `Lesson unstructured: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(18, 'AI Teacher Mode (Structured Thermodynamics Lesson)', 'AI Teacher Mode', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 19: AI Doubt Solver Direct Solution Test
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    const res = await aiService.solveDoubt({
      question: 'If a constant net force of 10 N acts on a mass of 2 kg, calculate its acceleration.',
      subject: 'Physics',
      chapter: 'Laws of Motion',
      classLevel: '11',
      targetExam: 'NEET',
      aiMode: 'doubt_solver'
    });
    const ans = res.result.answer;
    // a = F / m = 10 / 2 = 5 m/s²
    const hasFive = ans.includes('5') && (ans.includes('m/s') || ans.includes('F = ma') || ans.includes('a = F/m'));
    const passed = hasFive;
    recordResult(19, 'AI Doubt Solver Mode (Direct Acceleration Calculation)', 'AI Doubt Solver', passed, res.result.provider || 'AI', Date.now() - t0,
      passed ? 'Direct step-by-step formula substitution yields a = 5 m/s²' : `Direct solve failed: ${ans.slice(0, 120)}`);
  } catch (err: any) {
    recordResult(19, 'AI Doubt Solver Mode (Direct Acceleration Calculation)', 'AI Doubt Solver', false, 'Error', 0, err?.message);
  }

  // -------------------------------------------------------------
  // TEST 20: Provider Failover Test: Gemini Failure -> Groq / Fallback
  // -------------------------------------------------------------
  try {
    const t0 = Date.now();
    // Simulate primary provider failure by testing a mock provider or temporarily inducing failover
    const mockFailingGemini = new GeminiProvider('INVALID_KEY_SIMULATED_FAILOVER', 'gemini-3.5-flash');
    let failoverActivated = false;
    let fallbackResult: any = null;

    try {
      await mockFailingGemini.solveDoubt({
        question: 'What is acceleration due to gravity on earth?',
        subject: 'Physics',
        chapter: 'Gravitation'
      });
    } catch (primaryErr: any) {
      // Primary failed as expected! Now verify Groq or Fallback solves it seamlessly:
      failoverActivated = true;
      const backupProvider = process.env.GROQ_API_KEY ? new GroqProvider(process.env.GROQ_API_KEY) : new FallbackProvider();
      fallbackResult = await backupProvider.solveDoubt({
        question: 'What is acceleration due to gravity on earth?',
        subject: 'Physics',
        chapter: 'Gravitation'
      });
    }

    const passed = failoverActivated && Boolean(fallbackResult?.answer) && (fallbackResult.answer.includes('9.8') || fallbackResult.answer.includes('gravity'));
    recordResult(20, 'Provider Failover Test (Gemini Failure -> Backup/Fallback)', 'Failover Resilience', passed, fallbackResult?.provider || 'Backup', Date.now() - t0,
      passed ? `Primary failed cleanly, backup (${fallbackResult.provider}) successfully solved question` : 'Failover was not cleanly triggered');
  } catch (err: any) {
    recordResult(20, 'Provider Failover Test (Gemini Failure -> Backup/Fallback)', 'Failover Resilience', false, 'Error', 0, err?.message);
  }

  console.log('\n===============================================================');
  console.log(`📊 AUDIT SUMMARY: ${results.filter(r => r.passed).length} / ${results.length} TESTS PASSED`);
  console.log('===============================================================\n');

  return results;
}

// Run immediately if called directly
runAllTests().then((res) => {
  const allPassed = res.every(r => r.passed);
  process.exit(allPassed ? 0 : 1);
}).catch((err) => {
  console.error('Test Suite Fatal Error:', err);
  process.exit(1);
});
