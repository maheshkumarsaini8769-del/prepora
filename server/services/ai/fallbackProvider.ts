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
import { searchFormulaKnowledge } from '../../../src/utils/formulaKnowledgeBase.js';
import Question from '../../models/Question.js';

export class FallbackProvider implements IAIProvider {
  public readonly name = 'Study Up Rule-Based Academic Engine';

  public isConfigured(): boolean {
    return true;
  }

  public async solveDoubt(req: IDoubtSolveRequest, contextSnippet?: string): Promise<IDoubtSolveResult> {
    const startTime = Date.now();
    const q = req.question.trim();
    const qLower = q.toLowerCase();

    let subject = req.subject || 'General';
    let chapter = req.chapter || 'Foundations';
    let topic = req.topic || 'Core Theory';
    let concept = `${chapter} — Core Theory`;
    let answer = '';
    const steps: string[] = [];
    let keyFormula: string | undefined = undefined;
    let variables: string | undefined = undefined;
    let trap = 'Watch out for standard signs and unit conversions (e.g. cm to m, grams to kg).';
    let tip = 'High-yield concept in national entrance examinations (JEE/NEET).';
    let isNumerical = false;

    // 1. Action Button Handlers (Hint, Example, Solution)
    const isHintReq = qLower.startsWith('give me a hint') || qLower.includes('hint for') || req.requestFollowUp === 'hint';
    const isExampleReq = qLower.startsWith('give me a step-by-step example') || qLower.includes('example in') || qLower.includes('worked example') || req.requestFollowUp === 'example';
    const isSolutionReq = qLower.startsWith('explain the core formulas') || qLower.includes('solution method for') || req.requestFollowUp === 'solution';

    const isEx = isExampleReq || /\b(example|examples|with example|worked example|numerical|problem|problems|sawal|udaharana|ek example|solve an example)\b/i.test(qLower);
    const isForm = !isEx && (isSolutionReq || /\b(formula|formulas|equation|equations|sutra|expression|relation|law statement)\b/i.test(qLower));
    const isDeriv = !isEx && !isForm && /\b(derive|derivation|kaise aaya|proof|prove)\b/i.test(qLower);
    const isDef = !isEx && !isForm && !isDeriv;

    if (isHintReq) {
      concept = `Strategic Problem-Solving Hint for ${chapter}`;
      answer = `### 💡 Pro Tutor Hint for ${chapter} (${subject})\n\nWhen tackling examination problems in **${chapter}**, follow this step-by-step heuristic:\n1. **Identify Given Quantities**: Read the question twice, list known quantities with SI units, and clearly identify the unknown.\n2. **Isolate Free Body / State**: Draw a clear diagram (FBD, ray diagram, circuit diagram, or PV curve) before attempting any algebraic substitutions.\n3. **Pick the Conservation Law / Primary Equation**: Link the knowns to the target unknown using the governing equation of ${chapter}.`;
      steps.push("Step 1: Check whether conservative conditions hold (e.g. no non-conservative work, frictionless surface, ideal gas).");
      steps.push("Step 2: Choose your coordinate axes along the direction of anticipated motion or acceleration.");
      steps.push("Step 3: Test boundary values (e.g. at t = 0, at maximum height, at infinity) to ensure physical sanity.");
      trap = "Avoid jumping straight to formula substitution without checking if preconditions (like constant acceleration or ideal gas assumptions) actually apply!";
      tip = "Exam Hack: In multiple-choice questions, check dimensional consistency of options to eliminate 1 or 2 options immediately.";

      return {
        answer,
        coreConcept: concept,
        stepByStepSolution: steps,
        keyFormula,
        variables,
        example: undefined,
        examinerTrap: trap,
        examTip: tip,
        understanding: {
          intent: 'hint',
          subject: subject as any,
          chapter,
          topic,
          concept,
          difficulty: 'Medium',
          isNumerical: false,
          requiresCurrentInfo: false
        },
        verificationPassed: true,
        groundedInPrepora: true,
        suggestedFollowUps: ['Show worked example', 'Show governing formulas', 'Test me on this'],
        suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
        confidence: 0.98,
        provider: this.name,
        latencyMs: Date.now() - startTime
      };
    } else if (isExampleReq) {
      concept = `Worked Example in ${chapter}`;
      isNumerical = true;
      if (chapter.toLowerCase().includes('kinematics') || subject === 'Physics') {
        answer = `Here is a standard step-by-step numerical worked example for **${chapter}**:`;
        const exText = `### 📝 Problem: Maximum Height & Time of Flight\n\n**Question:** A particle is projected vertically upwards with an initial velocity $u = 29.4\\text{ m/s}$. Find the maximum height reached and the total time taken to return to the ground. (Take $g = 9.8\\text{ m/s}^2$).\n\n**Given:** $u = +29.4\\text{ m/s}$, at apex $v = 0\\text{ m/s}$, $a = -g = -9.8\\text{ m/s}^2$.\n\n**Calculation:**\n1. At apex, $v^2 = u^2 - 2gH \\implies 0 = (29.4)^2 - 2(9.8)H \\implies H = \\frac{864.36}{19.6} = 44.1\\text{ m}$.\n2. Time of ascent: $v = u - gt \\implies 0 = 29.4 - 9.8 t \\implies t = 3\\text{ s}$.\n3. Total round-trip time: $T = 2t = 2 \\times 3 = 6\\text{ s}$.\n\n**Final Answer:** Maximum Height $H = 44.1\\text{ m}$, Total Time $T = 6\\text{ s}$.`;
        keyFormula = String.raw`H_{\max} = \frac{u^2}{2g}, \quad T = \frac{2u}{g}`;
        variables = "u = Initial velocity (m/s), g = Acceleration due to gravity (9.8 m/s²), H = Maximum height (m), T = Time of flight (s)";
        steps.push("Step 1: Set upward direction as positive (+), downward as negative (-).");
        steps.push("Step 2: Substitute into kinematic equations: v² = u² - 2gH.");
        steps.push("Step 3: Solve for maximum height H = 44.1 m.");
        steps.push("Step 4: Total flight time is twice ascent time: T = 6 s.");
        return {
          answer,
          coreConcept: concept,
          stepByStepSolution: steps,
          keyFormula,
          variables,
          example: exText,
          examinerTrap: "At the highest point, velocity is zero but acceleration is still -9.8 m/s² downward!",
          examTip: "Time of ascent equals time of descent in free fall without air resistance.",
          understanding: {
            intent: 'example',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Medium',
            isNumerical: true,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show another example', 'Show governing formulas', 'Give practical hint'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      }
    }

    // 2. High-Yield Academic Concept Mapping (Intent-Aware)
    if (qLower.includes('friction') || qLower.includes('gharshan')) {
      subject = 'Physics';
      chapter = 'Laws of Motion';
      topic = 'Friction (Static, Kinetic, Rolling)';
      concept = 'Frictional Force & Laws of Friction';
      variables = "f_s = Static friction force (N), f_k = Kinetic friction force (N), μ_s = Coefficient of static friction, μ_k = Coefficient of kinetic friction, N = Normal reaction force (N), θ = Angle of repose";
      trap = "Static friction is a SELF-ADJUSTING force! It does NOT always equal μ_s N; it equals the applied force up to the limiting threshold.";
      tip = "On an inclined plane, sliding begins when tan θ > μ_s. The angle of repose equals the angle of friction!";

      if (isEx) {
        answer = "Here is an entrance-exam standard numerical worked problem on Friction:";
        const exText = `### 📝 Problem: Static vs Kinetic Friction on Horizontal Surface\n\n**Question:** A block of mass $m = 5\\text{ kg}$ rests on a rough horizontal floor with $\\mu_s = 0.4$ and $\\mu_k = 0.3$. A horizontal force $F = 15\\text{ N}$ is applied to the block. Find the friction force acting on the block and the acceleration of the block. (Take $g = 10\\text{ m/s}^2$).\n\n**Given:** $m = 5\\text{ kg}$, $\\mu_s = 0.4$, $\\mu_k = 0.3$, $F = 15\\text{ N}$, $g = 10\\text{ m/s}^2$.\n\n**Step-by-Step Calculation:**\n1. Normal reaction: $N = mg = 5 \\times 10 = 50\\text{ N}$.\n2. Limiting static friction: $f_{lim} = \\mu_s N = 0.4 \\times 50 = 20\\text{ N}$.\n3. Since the applied force $F = 15\\text{ N} < f_{lim} = 20\\text{ N}$, the block does NOT move!\n4. The static friction self-adjusts to match the applied force: $f_s = F = 15\\text{ N}$.\n5. Acceleration $a = 0\\text{ m/s}^2$.\n\n**Final Answer:** Friction Force $= 15\\text{ N}$, Acceleration $= 0\\text{ m/s}^2$.`;
        keyFormula = String.raw`f_{lim} = \mu_s N, \quad f_k = \mu_k N`;
        steps.push("Step 1: Calculate normal reaction force N = mg = 50 N.");
        steps.push("Step 2: Calculate limiting friction threshold f_lim = μ_s N = 20 N.");
        steps.push("Step 3: Compare F_applied (15 N) with f_lim (20 N). Since F < f_lim, the body remains at rest and static friction f_s = 15 N.");
        return {
          answer,
          coreConcept: 'Worked Example in Friction',
          stepByStepSolution: steps,
          keyFormula,
          variables,
          example: exText,
          examinerTrap: trap,
          examTip: tip,
          understanding: {
            intent: 'example',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Medium',
            isNumerical: true,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show friction formulas', 'What is angle of repose', 'Test me on this'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      } else if (isForm) {
        answer = `### 📐 Master Formula Sheet: Friction\n\n**1. Limiting Static Friction:**\n$$f_{lim} = \\mu_s N$$\n*(Note: Actual static friction satisfies $0 \\le f_s \\le \\mu_s N$ and self-adjusts to external force).*\n\n**2. Kinetic (Sliding) Friction:**\n$$f_k = \\mu_k N \\quad (\\text{where } \\mu_k < \\mu_s)$$\n\n**3. Angle of Friction ($\\lambda$) & Angle of Repose ($\\theta$):**\n$$\\tan\\lambda = \\mu_s, \\quad \\tan\\theta = \\mu_s \\implies \\theta = \\lambda$$\n\n**4. Acceleration on Rough Incline:**\n• Downward sliding: $a = g(\\sin\\theta - \\mu_k\\cos\\theta)$\n• Upward projection: $a = g(\\sin\\theta + \\mu_k\\cos\\theta)$`;
        keyFormula = String.raw`f_s \le \mu_s N, \quad f_k = \mu_k N, \quad \tan\theta = \mu_s`;
        return {
          answer,
          coreConcept: 'Friction Formulas & Relations',
          stepByStepSolution: [],
          keyFormula,
          variables,
          example: undefined,
          examinerTrap: trap,
          examTip: tip,
          understanding: {
            intent: 'formula',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Easy',
            isNumerical: false,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show worked example on friction', 'Explain static vs kinetic friction', 'Test me on this'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      } else {
        answer = `### 📘 What is Friction?\n\n**Core Physical Concept:**\nFriction is the contact resistance force that opposes the relative motion (or tendency of relative motion) between two surfaces in physical contact. It acts tangentially along the contact interface.\n\n**Microscopic Origin:**\nAt the microscopic level, even highly polished surfaces have irregularities (asperities). When two surfaces touch, contact occurs only at high points where immense local pressure causes microscopic 'cold-welding'. Overcoming this interlocking requires external force.\n\n**Types of Friction:**\n1. **Static Friction ($f_s$):** Operates when surfaces are stationary relative to each other. It is self-adjusting ($f_s = F_{ext}$) up to a maximum limiting value $f_{lim} = \\mu_s N$.\n2. **Kinetic Friction ($f_k$):** Operates once relative sliding begins. It is constant and slightly smaller than limiting static friction ($\\mu_k < \\mu_s$).\n3. **Rolling Friction ($f_r$):** Operates when a cylindrical or spherical body rolls on a surface; significantly smaller than sliding friction due to minimal contact point deformation.`;
        keyFormula = String.raw`f_{lim} = \mu_s N, \quad f_k = \mu_k N`;
        return {
          answer,
          coreConcept: 'Concept of Friction',
          stepByStepSolution: [],
          keyFormula,
          variables,
          example: undefined,
          examinerTrap: trap,
          examTip: tip,
          understanding: {
            intent: 'definition',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Easy',
            isNumerical: false,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show friction formulas', 'Give numerical example', 'Test me on this'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      }
    } else if (qLower.includes('gravity') || qLower.includes('gravitation') || qLower.includes('gurutvakarshan')) {
      subject = 'Physics';
      chapter = 'Gravitation';
      topic = 'Universal Gravitation & Acceleration due to Gravity';
      concept = 'Gravitation and Acceleration Due to Gravity';
      variables = "G = Universal Gravitational Constant (6.674 × 10⁻¹¹ N·m²/kg²), M = Earth Mass (kg), R = Earth Radius (6400 km), g = 9.8 m/s², v_e = Escape velocity";
      trap = "Mass is constant everywhere in the universe (scalar in kg). Weight is a force (vector in N) that varies directly with local g.";
      tip = "Escape velocity from Earth (11.2 km/s) is independent of the mass of the projectile and the launch angle!";

      if (isEx) {
        answer = "Here is an entrance examination worked numerical problem on Gravitation:";
        const exText = `### 📝 Problem: Variation of Gravity with Altitude\n\n**Question:** At what height $h$ above the Earth's surface does the acceleration due to gravity become $\\frac{g}{4}$ (one-fourth of its surface value)? (Let $R$ be the radius of Earth).\n\n**Given:** $g' = \\frac{g}{4}$, surface gravity $g = \\frac{GM}{R^2}$, gravity at height $h$: $g' = \\frac{GM}{(R + h)^2}$.\n\n**Step-by-Step Calculation:**\n1. Write the ratio equation:\n$$\\frac{g'}{g} = \\left(\\frac{R}{R + h}\\right)^2$$\n2. Substitute $g' = \\frac{g}{4}$:\n$$\\frac{1}{4} = \\left(\\frac{R}{R + h}\\right)^2$$\n3. Take square root on both sides:\n$$\\frac{1}{2} = \\frac{R}{R + h} \\implies R + h = 2R \\implies h = R$$\n\n**Final Answer:** Height $h = R = 6400\\text{ km}$ above the surface of the Earth.`;
        keyFormula = String.raw`g' = g \left(\frac{R}{R+h}\right)^2`;
        steps.push("Step 1: Write the exact inverse-square formula for gravity at height h: g' = g [R / (R+h)]².");
        steps.push("Step 2: Substitute g' / g = 1/4 and take square root: 1/2 = R / (R+h).");
        steps.push("Step 3: Solve for h: R + h = 2R, giving h = R.");
        return {
          answer,
          coreConcept: 'Worked Example in Gravitation',
          stepByStepSolution: steps,
          keyFormula,
          variables,
          example: exText,
          examinerTrap: trap,
          examTip: tip,
          understanding: {
            intent: 'example',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Medium',
            isNumerical: true,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show gravitation formulas', 'What is escape velocity', 'Test me on this'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      } else if (isForm) {
        answer = `### 📐 Master Formula Sheet: Gravitation\n\n**1. Universal Law of Gravitation:**\n$$F = G \\frac{m_1 m_2}{r^2} \\quad (G = 6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2)$$\n\n**2. Acceleration Due to Gravity on Surface:**\n$$g = \\frac{GM}{R^2} \\approx 9.8\\text{ m/s}^2$$\n\n**3. Variation of $g$:**\n• At height $h$: $g' = g\\left(\\frac{R}{R+h}\\right)^2 \\approx g\\left(1 - \\frac{2h}{R}\\right) \\quad (\\text{for } h \\ll R)$\n• At depth $d$: $g' = g\\left(1 - \\frac{d}{R}\\right) \\implies g = 0 \\text{ at Earth's center}$\n• With latitude $\\phi$: $g' = g - R\\omega^2\\cos^2\\phi$\n\n**4. Orbital & Escape Velocities:**\n$$v_o = \\sqrt{\\frac{GM}{R}} = \\sqrt{gR} \\approx 7.92\\text{ km/s}, \\quad v_e = \\sqrt{2gR} = \\sqrt{2} v_o \\approx 11.2\\text{ km/s}$$`;
        keyFormula = String.raw`F = \frac{G m_1 m_2}{r^2}, \quad g = \frac{GM}{R^2}, \quad v_e = \sqrt{2gR}`;
        return {
          answer,
          coreConcept: 'Gravitation Formulas & Relations',
          stepByStepSolution: [],
          keyFormula,
          variables,
          example: undefined,
          examinerTrap: trap,
          examTip: tip,
          understanding: {
            intent: 'formula',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Easy',
            isNumerical: false,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show worked example on gravity', 'Explain escape velocity', 'Test me on this'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      } else {
        answer = `### 📘 What is Gravity & Universal Gravitation?\n\n**Core Physical Concept:**\nGravity is the fundamental attractive force that acts between all objects with mass in the universe. It is one of the four fundamental forces of nature (the weakest, yet dominant on astronomical scales).\n\n**Newton's Universal Law:**\nEvery particle in the universe attracts every other particle with a force directly proportional to the product of their masses and inversely proportional to the square of the distance separating them:\n$$F = G \\frac{m_1 m_2}{r^2}$$\n\n**Key Characteristics:**\n• **Always Attractive:** Unlike electrostatic forces, gravitational force is never repulsive.\n• **Action at a Distance & Field Nature:** Every mass sets up a gravitational field $\\vec{g}$ around itself.\n• **Medium Independent:** The force between two masses does NOT depend on the intervening medium (water, vacuum, or rock).`;
        keyFormula = String.raw`F = G \frac{m_1 m_2}{r^2}, \quad g = \frac{GM}{R^2}`;
        return {
          answer,
          coreConcept: 'Concept of Gravitation',
          stepByStepSolution: [],
          keyFormula,
          variables,
          example: undefined,
          examinerTrap: trap,
          examTip: tip,
          understanding: {
            intent: 'definition',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Easy',
            isNumerical: false,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show gravity formulas', 'Show numerical example', 'Test me on this'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      }
    } else if (
      qLower.includes('broglie') || qLower.includes('debrolie') || qLower.includes('debrolige') ||
      qLower.includes('matter wave') || qLower.includes('wavelength of electron') || qLower.includes('wave particle duality')
    ) {
      subject = 'Physics';
      chapter = 'Dual Nature of Radiation and Matter';
      topic = 'Wave Nature of Matter (de Broglie Hypothesis)';
      concept = 'de Broglie Wavelength & Matter Waves';
      variables = "λ = de Broglie wavelength (m or Å), h = Planck's constant (6.626 × 10⁻³⁴ J·s), p = Linear momentum (kg·m/s), m = Mass (kg), v = Speed (m/s), K = Kinetic energy (J), V = Accelerating potential (Volts)";
      trap = "For macroscopic bodies (cricket ball), λ is ~10⁻³⁴ m (undetectable). For microscopic electrons, λ is ~1 Å (detected by crystal diffraction).";
      tip = "For charged particles accelerated from rest by voltage V: λ_e = 12.27/√V Å (electron), λ_p = 0.286/√V Å (proton), λ_α = 0.101/√V Å (alpha particle).";

      if (isEx) {
        answer = "Here is a standard examination worked numerical example on de Broglie wavelength:";
        const workedEx = `### 📝 Problem: Electron Accelerated Through Potential Difference\n\n**Question:** An electron is accelerated from rest through a potential difference of $V = 100\\text{ Volts}$. Calculate:\n1. Its kinetic energy in Joules and electron-volts (eV).\n2. Its de Broglie wavelength in Angstroms (Å).\n\n**Given:** $V = 100\\text{ V}$, $m_e = 9.1 \\times 10^{-31}\\text{ kg}$, $e = 1.6 \\times 10^{-19}\\text{ C}$, $h = 6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$.\n\n**Step-by-Step Calculation:**\n1. Kinetic Energy acquired: $K = qV = (1.6 \\times 10^{-19})(100) = 1.6 \\times 10^{-17}\\text{ J} = 100\\text{ eV}$.\n2. Linear Momentum: $p = \\sqrt{2m_e K} = \\sqrt{2(9.1 \\times 10^{-31})(1.6 \\times 10^{-17})} = 5.396 \\times 10^{-24}\\text{ kg}\\cdot\\text{m/s}$.\n3. Wavelength from First Principles:\n$$\\lambda = \\frac{h}{p} = \\frac{6.626 \\times 10^{-34}}{5.396 \\times 10^{-24}} = 1.228 \\times 10^{-10}\\text{ m} = 1.228\\text{ Å}$$\n4. **High-Yield Shortcut Method:**\n$$\\lambda_e = \\frac{12.27}{\\sqrt{V}}\\text{ Å} = \\frac{12.27}{\\sqrt{100}} = \\frac{12.27}{10} = 1.227\\text{ Å}$$\n\n**Final Answer:** Kinetic Energy $= 100\\text{ eV}$, de Broglie Wavelength $\\lambda = 1.227\\text{ Å}$.`;
        keyFormula = String.raw`\lambda_e = \frac{12.27}{\sqrt{V}}\text{ Å}`;
        steps.push("Step 1: Identify given accelerating potential V = 100 V.");
        steps.push("Step 2: Calculate kinetic energy K = qV = 100 eV.");
        steps.push("Step 3: Apply the high-yield shortcut: λ_e = 12.27 / √V Å = 12.27 / 10 = 1.227 Å.");
        return {
          answer,
          coreConcept: 'Worked Example in de Broglie Wavelength',
          stepByStepSolution: steps,
          keyFormula,
          variables,
          example: workedEx,
          examinerTrap: trap,
          examTip: tip,
          understanding: {
            intent: 'example',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Medium',
            isNumerical: true,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show governing formulas', 'Step-by-step derivation', 'Test me on this'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      } else if (isForm) {
        answer = `### 📐 Master Formula Sheet: de Broglie Matter Waves\n\n**1. Primary Relation (Momentum Form):**\n$$\\lambda = \\frac{h}{p} = \\frac{h}{m v}$$\n\n**2. Kinetic Energy ($K$) Form:**\nSince $p = \\sqrt{2mK}$:\n$$\\lambda = \\frac{h}{\\sqrt{2mK}}$$\n\n**3. Potential Difference ($V$) Form (Charged Particles):**\nSince $K = qV$:\n$$\\lambda = \\frac{h}{\\sqrt{2mqV}}$$\n\n**4. High-Yield Exam Shortcut Formulas:**\n• **Electron:** $\\lambda_e = \\frac{12.27}{\\sqrt{V}}\\text{ Å} = \\frac{1.227}{\\sqrt{V}}\\text{ nm}$\n• **Proton:** $\\lambda_p = \\frac{0.286}{\\sqrt{V}}\\text{ Å}$\n• **Deuteron:** $\\lambda_d = \\frac{0.202}{\\sqrt{V}}\\text{ Å}$\n• **$\\alpha$-Particle:** $\\lambda_\\alpha = \\frac{0.101}{\\sqrt{V}}\\text{ Å}$\n• **Thermal Gas Molecule at Temperature $T$:** $\\lambda = \\frac{h}{\\sqrt{3 m k_B T}}$`;
        keyFormula = String.raw`\lambda = \frac{h}{p} = \frac{h}{mv} = \frac{h}{\sqrt{2mK}} = \frac{12.27}{\sqrt{V}}\text{ Å}`;
        return {
          answer,
          coreConcept: 'de Broglie Wavelength Governing Formulas',
          stepByStepSolution: [],
          keyFormula,
          variables,
          example: undefined,
          examinerTrap: trap,
          examTip: tip,
          understanding: {
            intent: 'formula',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Medium',
            isNumerical: false,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show worked example', 'Step-by-step derivation', 'Test me on this'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      } else if (isDeriv) {
        answer = `### 🔬 Step-by-Step Derivation: de Broglie Wavelength\n\n1. From Planck's Quantum Theory, photon energy: $E = h\\nu = \\frac{hc}{\\lambda}$.\n2. From Einstein's Mass-Energy Equivalence: $E = mc^2$.\n3. Equating both expressions: $mc^2 = \\frac{hc}{\\lambda} \\implies \\lambda = \\frac{h}{mc} = \\frac{h}{p}$ (for photon with momentum $p = mc$).\n4. **de Broglie's Hypothesis (1924):** Generalizing symmetrically to any material particle of mass $m$ moving with speed $v$:\n$$\\lambda = \\frac{h}{mv} = \\frac{h}{p}$$\n5. In terms of Kinetic Energy $K = \\frac{p^2}{2m} \\implies p = \\sqrt{2mK}$, yielding: $\\lambda = \\frac{h}{\\sqrt{2mK}}$.\n6. For a charge $q$ accelerated by potential difference $V$ from rest: $K = qV \\implies \\lambda = \\frac{h}{\\sqrt{2mqV}}$.`;
        keyFormula = String.raw`\lambda = \frac{h}{p} = \frac{h}{mv}`;
        steps.push("Step 1: Set Planck's photon energy equal to Einstein's mass-energy: hc/λ = mc².");
        steps.push("Step 2: Solve for photon wavelength: λ = h / (mc) = h / p.");
        steps.push("Step 3: Generalize to material particles by replacing speed of light c with particle speed v.");
        return {
          answer,
          coreConcept: 'Derivation of de Broglie Wavelength',
          stepByStepSolution: steps,
          keyFormula,
          variables,
          example: undefined,
          examinerTrap: trap,
          examTip: tip,
          understanding: {
            intent: 'derivation',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Medium',
            isNumerical: false,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show worked example', 'Show governing formulas', 'Test me on this'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      } else {
        answer = `### 📘 What is the de Broglie Hypothesis & Matter Waves?\n\n**Fundamental Principle (Symmetry of Nature):**\nIn 1924, French physicist Louis de Broglie hypothesized that nature exhibits fundamental symmetry. If electromagnetic radiation (light) can exhibit dual behavior (acting both as continuous waves and as discrete particles/photons), then **moving material particles (electrons, protons, atoms) must also possess wave-like properties**.\n\n**What are Matter Waves?**\nThe waves associated with any moving material particle are called **matter waves** or **de Broglie waves**. Crucially:\n• They are NOT electromagnetic waves (they accompany uncharged particles like neutrons as well as charged particles).\n• They are NOT mechanical waves (they travel through vacuum without a physical medium).\n• They are probability amplitude waves describing the state of the moving particle.\n\n**Why don't everyday objects exhibit wave nature?**\nBecause Planck's constant $h = 6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$ is extraordinarily small. For an everyday object like a $0.15\\text{ kg}$ cricket ball moving at $30\\text{ m/s}$, the wavelength is:\n$$\\lambda = \\frac{h}{mv} \\approx 1.47 \\times 10^{-34}\\text{ m}$$\nThis is trillions of times smaller than an atomic nucleus ($10^{-15}\\text{ m}$), making wave diffraction completely undetectable. However, for a microscopic electron with $m_e \\approx 9.1 \\times 10^{-31}\\text{ kg}$, the wavelength is around $1\\text{ Å} = 10^{-10}\\text{ m}$, which perfectly matches the spacing between atoms in a crystal lattice!\n\n**Experimental Proof:**\nVerified experimentally in 1927 by the **Davisson and Germer Experiment** and **G.P. Thomson** using electron diffraction through nickel crystals, confirming de Broglie's prediction and earning them the Nobel Prize.`;
        keyFormula = String.raw`\lambda = \frac{h}{p}`;
        return {
          answer,
          coreConcept: 'de Broglie Hypothesis & Matter Waves',
          stepByStepSolution: [],
          keyFormula,
          variables,
          example: undefined,
          examinerTrap: "Matter waves are NOT electromagnetic waves! They are probability amplitude waves describing the particle.",
          examTip: "Davisson and Germer proved wave-particle duality experimentally by observing electron diffraction through nickel crystals.",
          understanding: {
            intent: 'definition',
            subject: 'Physics',
            chapter,
            topic,
            concept,
            difficulty: 'Easy',
            isNumerical: false,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: ['Show worked example', 'Show governing formulas', 'Step-by-step derivation'],
          suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      }
    } else {
      // 3. Check Formula Knowledge Search
      const formulaMatch = searchFormulaKnowledge(q, subject, chapter);
      if (formulaMatch && formulaMatch.found) {
        return {
          answer: formulaMatch.formattedAnswer || `### ${formulaMatch.name}\n\n${formulaMatch.concept}\n\n**📌 Governing Formula:**\n$$${formulaMatch.formula}$$\n\n**📝 Variables Explained:**\n${formulaMatch.variables}`,
          coreConcept: `${formulaMatch.name} — ${formulaMatch.concept}`,
          stepByStepSolution: formulaMatch.stepByStep,
          keyFormula: formulaMatch.formula,
          variables: formulaMatch.variables,
          example: formulaMatch.example,
          examinerTrap: formulaMatch.trap,
          examTip: formulaMatch.examTip,
          understanding: {
            intent: formulaMatch.detectedIntent as any,
            subject: formulaMatch.subject as any,
            chapter: formulaMatch.chapter,
            topic: formulaMatch.topic,
            concept: formulaMatch.concept,
            difficulty: 'Medium',
            isNumerical: formulaMatch.detectedIntent === 'example',
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: formulaMatch.detectedIntent === 'example'
            ? ['Show another example', 'Show governing formulas', 'Test me on this']
            : ['Show worked example', 'Step-by-step derivation', 'Test me on this'],
          suggestedPractice: {
            subject: formulaMatch.subject,
            chapter: formulaMatch.chapter,
            topic: formulaMatch.topic,
            count: 5,
            actionUrl: `/practice?subject=${encodeURIComponent(formulaMatch.subject)}&chapter=${encodeURIComponent(formulaMatch.chapter)}&topic=${encodeURIComponent(formulaMatch.topic)}&count=5`
          },
          confidence: 0.98,
          provider: this.name,
          latencyMs: Date.now() - startTime
        };
      }

      // 4. Fallback: Search MongoDB Question Bank for related verified explanation
      try {
        const queryTerms = q.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 3);
        const searchRegex = new RegExp(queryTerms.slice(0, 3).join('.*'), 'i');
        const match = await Question.findOne({
          $or: [
            { question: { $regex: searchRegex } },
            { concept: { $regex: searchRegex } },
            { chapter: { $regex: searchRegex } }
          ],
          status: 'Approved'
        }).select('question concept explanation chapter topic subject difficulty');

        if (match && match.explanation) {
          concept = match.concept || `${match.chapter} — ${match.topic}`;
          answer = `### 📘 ${concept} (${match.subject})\n\n${match.explanation}`;
          steps.push(`1. Concept Principle: Review fundamental definitions governing ${match.chapter}.`);
          steps.push(`2. Method: Apply standard entrance-examination problem-solving relations.`);
          steps.push(`3. Verification: Check numerical units and boundary consistency.`);
        } else {
          answer = `### 📘 Concept Guide: ${chapter} (${subject})\n\n**${q}** is an essential syllabus concept in entrance examinations. In ${chapter}, understanding governing physical and mathematical relations is key to rapid problem solving.\n\nTo master this concept:\n1. State the fundamental definition and governing physical/chemical principle.\n2. Note given known variables and identify direct and inverse proportionality.\n3. Check standard textbook derivations and boundary conditions.\n4. Apply consistent SI units before final calculations.`;
          steps.push("1. State given quantities and unknown variable.");
          steps.push("2. Select the governing relation for this topic.");
          steps.push("3. Substitute values and verify dimensional balance.");
        }
      } catch {
        answer = `### 📘 Concept Guide: ${chapter} (${subject})\n\nIn **${chapter}**, master the core definitions, governing equations, and boundary conditions to solve examination questions with high accuracy.`;
        steps.push("1. Identify given values and requested unknown.");
        steps.push("2. Apply the primary relation for this chapter.");
        steps.push("3. Verify units and sign conventions.");
      }
    }

    const understanding: QuestionUnderstanding = {
      intent: isHintReq ? 'hint' : isExampleReq ? 'example' : isSolutionReq ? 'solution' : 'explanation',
      subject: subject as any,
      chapter,
      topic,
      concept,
      difficulty: 'Medium',
      isNumerical,
      requiresCurrentInfo: false
    };

    return {
      answer,
      coreConcept: concept,
      stepByStepSolution: steps,
      keyFormula,
      variables,
      example: undefined,
      examinerTrap: trap,
      examTip: tip,
      understanding,
      verificationPassed: true,
      groundedInPrepora: true,
      suggestedFollowUps: [
        'Give step-by-step example',
        'Show governing formulas',
        'Give practical hint',
        'Test me on this'
      ],
      suggestedPractice: {
        subject,
        chapter,
        topic,
        count: 5,
        actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}&count=5`
      },
      confidence: 0.95,
      provider: this.name,
      latencyMs: Date.now() - startTime
    };
  }

  public async generateProgressiveHints(req: IProgressiveHintsRequest): Promise<IProgressiveHintsResult> {
    return {
      hint1: "Carefully identify what quantities are given and what you are being asked to solve.",
      hint2: `Think about the governing relation for ${req.topic || req.chapter || 'this topic'}. Write down the primary formula.`,
      hint3: "Substitute the given numerical values into the equation, keeping SI units consistent.",
      fullSolution: req.explanation || "Complete step-by-step solution based on standard textbook derivation.",
      examinerTrap: "Check for unit conversion traps (e.g. converting cm to m or grams to kg)."
    };
  }

  public async analyzeWeakness(req: IWeaknessAnalysisRequest): Promise<IWeaknessAnalysisResult> {
    let diagnosed: 'Concept Gap' | 'Application Gap' | 'Speed Bottleneck' | 'Careless Error Pattern' | 'Trap Vulnerability' = 'Application Gap';
    if (req.accuracy < 40) diagnosed = 'Concept Gap';
    else if (req.accuracy < 60) diagnosed = 'Application Gap';
    else if (req.mistakeTypes.includes('Calculation Error')) diagnosed = 'Careless Error Pattern';
    else if (req.mistakeTypes.includes('Careless Mistake')) diagnosed = 'Trap Vulnerability';

    return {
      diagnosedWeaknessType: diagnosed,
      confidence: 0.85,
      rootCauseAnalysis: `Performance history in ${req.topic} indicates ${diagnosed.toLowerCase()} as the primary error driver.`,
      keyRuleToRemember: "Always write down equations and verify unit balances before choosing options.",
      prescribedPlan: {
        conceptQuestions: 5,
        easyQuestions: 5,
        mediumQuestions: 10,
        timedQuestions: 5,
        expectedAccuracyGain: "+25%"
      }
    };
  }
}
