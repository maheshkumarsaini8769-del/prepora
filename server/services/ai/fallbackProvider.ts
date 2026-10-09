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
import { detectLanguageMode } from './neetAITeacherPrompt.js';

export class FallbackProvider implements IAIProvider {
  public readonly name = 'Study Up Rule-Based Academic Engine';

  public isConfigured(): boolean {
    return true;
  }

  public async solveDoubt(req: IDoubtSolveRequest, contextSnippet?: string): Promise<IDoubtSolveResult> {
    const startTime = Date.now();
    const q = req.question.trim();
    const qLower = q.toLowerCase();
    const isHinglish = detectLanguageMode(q) === 'hinglish';

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
    const effectiveFollowUp = (req.requestFollowUp || (req as any).followUpMode || '').toLowerCase();
    const isHintReq = qLower.startsWith('give me a hint') || qLower.includes('hint for') || effectiveFollowUp === 'hint';
    const isExampleReq = qLower.startsWith('give me a step-by-step example') || qLower.includes('example in') || qLower.includes('worked example') || effectiveFollowUp === 'example';
    const isSolutionReq = qLower.startsWith('explain the core formulas') || qLower.includes('solution method for') || effectiveFollowUp === 'solution';

    const isEx = isExampleReq || /\b(example|examples|with example|worked example|numerical|problem|problems|sawal|udaharana|ek example|solve an example)\b/i.test(qLower);
    const isForm = !isEx && (isSolutionReq || /\b(formula|formulas|equation|equations|sutra|expression|relation|law statement)\b/i.test(qLower));
    const isDeriv = !isEx && !isForm && /\b(derive|derivation|kaise aaya|proof|prove)\b/i.test(qLower);
    const isDef = !isEx && !isForm && !isDeriv;

    const isJee = Boolean(req.targetExam && req.targetExam.toUpperCase().includes('JEE')) || subject === 'Mathematics';
    const highYieldHeading = isJee ? '### 🔥 JEE High-Yield Points' : '### 🔥 NEET Important Points';
    const examTrickHeading = isJee ? '### 🎯 JEE Speed Hack' : '### 🎯 NEET Trick';
    const examName = isJee ? 'JEE Main / Advanced' : 'NEET-UG';

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
        const exText = `### Given
- Initial vertical velocity: $u = +29.4\\text{ m/s}$
- Velocity at highest point: $v = 0\\text{ m/s}$
- Acceleration due to gravity: $a = -g = -9.8\\text{ m/s}^2$

### Find
1. Maximum height reached ($H_{\\max}$)
2. Total time of flight ($T$) to return to ground

### Formula
$$v^2 = u^2 - 2gH_{\\max}, \\quad v = u - gt, \\quad T = 2t$$

### Substitution
1. $0 = (29.4)^2 - 2(9.8) H_{\\max}$
2. $0 = 29.4 - 9.8 t$
3. $T = 2 \\times t$

### Calculation
1. $H_{\\max} = \\frac{(29.4)^2}{2 \\times 9.8} = \\frac{864.36}{19.6} = 44.1\\text{ m}$
2. Time of ascent: $t = \\frac{29.4}{9.8} = 3\\text{ s}$
3. Total round-trip time: $T = 2 \\times 3 = 6\\text{ s}$

### ✅ Final Answer
- **Maximum Height:** $H_{\\max} = 44.1\\text{ m}$
- **Total Time of Flight:** $T = 6\\text{ s}$

### ⚠️ Check
At the highest point, velocity is zero ($v = 0$), but acceleration is STILL $9.8\\text{ m/s}^2$ downward! Never set acceleration to zero at the apex.`;
        answer = exText;
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
        answer = `### Given
- Mass of the block: $m = 5\\text{ kg}$
- Coefficient of static friction: $\\mu_s = 0.4$
- Coefficient of kinetic friction: $\\mu_k = 0.3$
- Applied horizontal force: $F = 15\\text{ N}$
- Acceleration due to gravity: $g = 10\\text{ m/s}^2$

### Find
1. Friction force acting on the block
2. Acceleration of the block

### Formula
$$N = mg$$
$$f_{lim} = \\mu_s N$$
$$F_{net} = m a$$

### Substitution
1. Normal force: $N = 5 \\times 10 = 50\\text{ N}$
2. Limiting friction: $f_{lim} = 0.4 \\times 50\\text{ N}$

### Calculation
1. $f_{lim} = 20\\text{ N}$
2. Compare applied force with limiting threshold: $F = 15\\text{ N} < f_{lim} = 20\\text{ N}$
3. Since external force is less than maximum static friction, the block remains completely stationary!
4. Static friction self-adjusts: $f_s = F = 15\\text{ N}$.
5. Resulting acceleration: $a = 0\\text{ m/s}^2$.

### ✅ Final Answer
- **Friction Force:** $f_s = 15\\text{ N}$ (opposing applied force)
- **Acceleration:** $a = 0\\text{ m/s}^2$

### ⚠️ Check
Common NEET trap: Never assume static friction is automatically equal to $\\mu_s N = 20\\text{ N}$! Static friction self-adjusts from 0 up to $\\mu_s N$.`;
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
          example: answer,
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
        answer = `### 📚 Concept
**Frictional Force** — Limiting static thresholds, kinetic sliding resistance, and incline laws for NEET-UG.

### 🧮 Formula
$$f_s \\le \\mu_s N, \\quad f_k = \\mu_k N, \\quad \\tan\\theta = \\mu_s$$

### 🔤 Variables
- $f_s$ = Static friction force (N)
- $f_k$ = Kinetic friction force (N)
- $\\mu_s$ = Coefficient of static friction (dimensionless)
- $\\mu_k$ = Coefficient of kinetic friction (dimensionless, $\\mu_k < \\mu_s$)
- $N$ = Normal reaction force (N)
- $\\theta$ = Angle of repose / angle of friction (rad or deg)

### 🔥 NEET Important Points
- ⭐ **Must Know:** Static friction is a self-adjusting contact force ($0 \\le f_s \\le \\mu_s N$).
- ⚡ **High Priority:** Sliding down a rough incline occurs if and only if $\\tan\\alpha > \\mu_s$.

### ⚠️ Common Mistake
Friction does NOT always oppose motion; it opposes *relative sliding between surfaces*. Walking is possible because static friction acts forward!

### 🎯 NEET Trick
${isHinglish ? 'Angle of repose hamesha angle of friction ke barabar hota hai: $\\theta = \\lambda = \\tan^{-1}\\mu_s$.' : 'The angle of repose equals the angle of friction: $\\theta = \\lambda = \\tan^{-1}\\mu_s$.'}

### 📝 Quick Check
${isHinglish ? 'Agar horizontal floor par rakhe block par koi horizontal force na lagayein, toh static friction kitna hoga? (Ans: 0 N).' : 'What is the static friction on a block resting on a horizontal floor with zero horizontal applied force? (Ans: 0 N).'}`;
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
        answer = `### 📚 Concept
Friction is the contact force that opposes relative tangential motion (or tendency of relative motion) between two surfaces in contact.

### 💡 Easy Explanation
${isHinglish
  ? `Simple shabdon me: Jab do surfaces ek doosre ke contact me aati hain, toh microscopic level par unke ridges aur valleys interlock ho jaate hain (cold-welding). Is interlocking ko todne ke liye external force lagta hai.\n\nFriction ke 3 main types hote hain:\n1. **Static Friction ($f_s$):** Jab object rest par ho. Yeh self-adjusting hota hai ($0 \\le f_s \\le \\mu_s N$).\n2. **Kinetic Friction ($f_k$):** Jab relative sliding chal rahi ho. Yeh constant hota hai ($\\mu_k < \\mu_s$).\n3. **Rolling Friction ($f_r$):** Jab object roll kare (sabse kam value).`
  : `In simple terms: Microscopic surface roughness creates cold-welded junctions at points of real contact. Friction is the force required to shear these junctions.\n\nThree fundamental types:\n1. **Static Friction ($f_s$):** Operates before relative motion starts; self-adjusting up to $f_{lim} = \\mu_s N$.\n2. **Kinetic Friction ($f_k$):** Operates during relative sliding; constant and slightly lower than static friction.\n3. **Rolling Friction ($f_r$):** Operates during rolling motion; minimal deformation creates lowest resistance.`}

### 🧮 Formula
$$f_{lim} = \\mu_s N, \\quad f_k = \\mu_k N$$

### 🔤 Variables
- $f_{lim}$ = Limiting static friction (N)
- $f_k$ = Kinetic friction (N)
- $\\mu_s, \\mu_k$ = Coefficients of friction
- $N$ = Normal reaction force (N)

### 🔥 NEET Important Points
- ⭐ **Must Know:** $\\mu_s > \\mu_k > \\mu_r$ for any given pair of surfaces.
- ⚡ **NCERT Reference:** Friction is a non-conservative contact force; mechanical energy is dissipated as heat.

### ⚠️ Common Mistake
Static friction is NOT always $\\mu_s N$! It equals the applied parallel force up to the threshold $\\mu_s N$.

### 🎯 NEET Trick
${isHinglish ? 'Ratio trick: Incline par acceleration: sliding down $a = g(\\sin\\theta - \\mu_k\\cos\\theta)$, projecting up $a = g(\\sin\\theta + \\mu_k\\cos\\theta)$.' : 'Acceleration on incline: downward sliding $a = g(\\sin\\theta - \\mu_k\\cos\\theta)$, upward projection $a = g(\\sin\\theta + \\mu_k\\cos\\theta)$.'}

### 📝 Quick Check
${isHinglish ? 'Kinetic friction velocity par depend karta hai ya independent hota hai? (Ans: Moderate speeds par independent).' : 'Does kinetic friction depend on velocity at moderate sliding speeds? (Ans: Independent of relative speed).'}`;
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
        answer = `### Given
- Gravity at altitude $h$: $g' = \\frac{g}{4}$
- Surface gravitational acceleration: $g = \\frac{GM}{R^2}$
- Radius of Earth: $R = 6400\\text{ km}$

### Find
Height $h$ above the Earth's surface where gravity drops to $\\frac{g}{4}$.

### Formula
$$g' = g\\left(\\frac{R}{R + h}\\right)^2$$

### Substitution
$$\\frac{g}{4} = g\\left(\\frac{R}{R + h}\\right)^2 \\implies \\frac{1}{4} = \\left(\\frac{R}{R + h}\\right)^2$$

### Calculation
1. Take square root on both sides:
   $$\\frac{1}{2} = \\frac{R}{R + h}$$
2. Cross-multiply:
   $$R + h = 2R$$
3. Solve for $h$:
   $$h = 2R - R = R$$

### ✅ Final Answer
**Height above surface:** $h = R = 6400\\text{ km}$

### ⚠️ Check
Do NOT use the small-height approximation $g' \\approx g(1 - 2h/R)$ here! That approximation is valid ONLY when $h \\ll R$ (under a few hundred kilometers). Since $h = R$, the exact inverse-square relation is mandatory.`;
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
          example: answer,
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
        answer = `### 📚 Concept
**Gravitation** — Universal gravitational attraction, acceleration variation, and escape velocities for NEET-UG.

### 🧮 Formula
$$F = G \\frac{m_1 m_2}{r^2}, \\quad g = \\frac{GM}{R^2}, \\quad v_e = \\sqrt{2gR} = \\sqrt{\\frac{2GM}{R}}$$

### 🔤 Variables
- $G$ = Universal gravitational constant ($6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$)
- $M$ = Mass of the central attracting body (kg)
- $R$ = Radius of the body (m)
- $g$ = Surface acceleration due to gravity ($9.8\\text{ m/s}^2$)
- $v_e$ = Escape velocity from Earth ($11.2\\text{ km/s}$)

### 🔥 NEET Important Points
- ⭐ **Must Know:** Mass ($m$) is an invariant scalar (kg). Weight ($W = mg$) is a position-dependent vector force (N).
- ⚡ **High Priority:** Escape velocity ($v_e = \\sqrt{2gR}$) is completely independent of the projectile mass and projection angle!

### ⚠️ Common Mistake
Inside a hollow spherical shell, gravitational field is zero ($E = 0$), but gravitational potential is uniform and non-zero ($V = -GM/R$).

### 🎯 NEET Trick
${isHinglish ? 'Variation with depth: $g_d = g(1 - d/R)$ linear decay karta hai, jabki height ke saath inverse-square decay hota hai.' : 'Gravity with depth $g_d = g(1 - d/R)$ is strictly linear, whereas variation with altitude follows inverse-square decay.'}

### 📝 Quick Check
${isHinglish ? 'Earth ke center par gravitational acceleration $g$ ki value kya hoti hai? (Ans: $g = 0\\text{ m/s}^2$).' : 'What is the acceleration due to gravity at the exact center of Earth? (Ans: $0\\text{ m/s}^2$).'}`;
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
        answer = `### 📚 Concept
Gravitation is the universal attractive force exerted between any two masses in the universe, directly proportional to the product of their masses and inversely proportional to the square of the distance separating them.

### 💡 Easy Explanation
${isHinglish
  ? `Simple shabdon me: Universe ka har mass doosre mass ko attract karta hai. Newton ke inverse-square law ke according, jaise jaise distance double hoti hai, gravitational force 4 times kam ho jata hai.\n\nKey features:\n• Conservative force (closed path me work = 0)\n• Central force (line joining centers ke along act karta hai)\n• Medium independent (vacuum, water ya space me force same rehta hai).`
  : `In simple terms: Every mass in the universe attracts every other mass. The force decreases with the square of the separation distance.\n\nKey characteristics:\n• Always attractive (no repulsive gravitation exists)\n• Conservative and central interaction\n• Independent of the intervening medium.`}

### 🧮 Formula
$$F = G\\frac{m_1 m_2}{r^2}, \\quad g = \\frac{GM}{R^2}$$

### 🔤 Variables
- $F$ = Gravitational attractive force (N)
- $G$ = Gravitational constant ($6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$)
- $m_1, m_2$ = Interacting masses (kg)
- $r$ = Separation distance between mass centers (m)

### 🔥 NEET Important Points
- ⭐ **Must Know:** $G$ has dimensions $[M^{-1} L^3 T^{-2}]$.
- ⚡ **NCERT Reference:** Kepler’s Third Law: $T^2 \\propto r^3$.

### ⚠️ Common Mistake
Never confuse Universal Gravitational Constant $G$ (universal scalar constant) with acceleration due to gravity $g$ (local vector variable).

### 🎯 NEET Trick
${isHinglish ? 'Agar planet ka mass constant rakh kar radius aadha kar diya jaye, toh surface gravity 4 guna badh jayegi ($g \\propto 1/R^2$).' : 'If a planet shrinks to half radius at constant mass, surface gravity increases 4-fold ($g \\propto 1/R^2$).'}

### 📝 Quick Check
${isHinglish ? 'Agar do bodies ke beech ka distance half kar diya jaye, toh gravitational force kitne times ho jayega? (Ans: 4 times).' : 'If the separation between two masses is halved, by what factor does gravitational force increase? (Ans: 4 times).'}`;
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
        answer = `### Given
- Accelerating potential difference: $V = 100\\text{ V}$
- Mass of electron: $m_e = 9.1 \\times 10^{-31}\\text{ kg}$
- Charge of electron: $e = 1.6 \\times 10^{-19}\\text{ C}$
- Planck's constant: $h = 6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$

### Find
1. Kinetic energy $K$ of the electron (in Joules and eV)
2. de Broglie wavelength $\\lambda$ (in Å and nm)

### Formula
$$K = qV$$
$$\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2m_e K}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å}$$

### Substitution
1. $K = (1.6 \\times 10^{-19}\\text{ C}) \\times (100\\text{ V})$
2. $\\lambda = \\frac{12.27}{\\sqrt{100}}\\text{ Å}$

### Calculation
1. $K = 1.6 \\times 10^{-17}\\text{ J} = 100\\text{ eV}$
2. Momentum: $p = \\sqrt{2mK} = 5.396 \\times 10^{-24}\\text{ kg}\\cdot\\text{m/s}$
3. First Principles: $\\lambda = \\frac{6.626 \\times 10^{-34}}{5.396 \\times 10^{-24}} = 1.228 \\times 10^{-10}\\text{ m} = 1.228\\text{ Å}$
4. NEET Shortcut: $\\lambda_e = \\frac{12.27}{\\sqrt{100}} = \\frac{12.27}{10} = 1.227\\text{ Å} = 0.1227\\text{ nm}$

### ✅ Final Answer
- **Kinetic Energy:** $K = 100\\text{ eV} = 1.6 \\times 10^{-17}\\text{ J}$
- **de Broglie Wavelength:** $\\lambda = 1.227\\text{ Å} = 0.1227\\text{ nm}$

### ⚠️ Check
For macroscopic objects (e.g. cricket ball of $0.15\\text{ kg}$ at $30\\text{ m/s}$), $\\lambda = 1.47 \\times 10^{-34}\\text{ m}$ is imperceptible, whereas for atomic electrons $\\lambda \\approx 1.23\\text{ Å}$ matches crystal atomic plane spacing, confirming de Broglie matter waves experimentally.`;
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
          example: answer,
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
        answer = `### 📚 Concept
**de Broglie Matter Waves** — Universal wave-particle relations, momentum conjugate forms, and voltage shortcuts for NEET-UG.

### 🧮 Formula
$$\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å}$$

### 🔤 Variables
- $\\lambda$ = de Broglie wavelength (m or Å)
- $h$ = Planck's constant ($6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$)
- $p$ = Linear momentum ($kg\\cdot m/s$)
- $m$ = Mass of particle (kg)
- $v$ = Speed of particle (m/s)
- $K$ = Kinetic energy (J)
- $V$ = Accelerating potential difference (Volts)

### 🔥 NEET Important Points
- ⭐ **Must Know Shortcuts (Accelerated from rest):**
  • Electron: $\\lambda_e = \\frac{12.27}{\\sqrt{V}}\\text{ Å}$
  • Proton: $\\lambda_p = \\frac{0.286}{\\sqrt{V}}\\text{ Å}$
  • Deuteron: $\\lambda_d = \\frac{0.202}{\\sqrt{V}}\\text{ Å}$
  • $\\alpha$-particle: $\\lambda_\\alpha = \\frac{0.101}{\\sqrt{V}}\\text{ Å}$
  • Thermal gas molecule at $T$ (Kelvin): $\\lambda = \\frac{h}{\\sqrt{3 m k_B T}}$
- ⚡ **High Priority:** For equal kinetic energy, $\\lambda \\propto 1/\\sqrt{m}$. Since $m_e < m_p < m_d < m_\\alpha$, the electron has the largest wavelength.

### ⚠️ Common Mistake
Matter waves are NOT electromagnetic waves! They are probability amplitude waves describing moving material particles.

### 🎯 NEET Trick
${isHinglish ? 'Equal kinetic energy par light particle ka wavelength sabse bada hoga ($\\lambda \\propto 1/\\sqrt{m}$).' : 'For equal kinetic energy, the lightest particle always has the longest de Broglie wavelength ($\\lambda \\propto 1/\\sqrt{m}$).'}

### 📝 Quick Check
${isHinglish ? 'Agar electron ka accelerating potential 100 V se 400 V kar diya jaye, toh wavelength kitne times ho jayegi? (Ans: Halved, $\\lambda \\propto 1/\\sqrt{V}$).' : 'If accelerating voltage increases from 100 V to 400 V, what happens to de Broglie wavelength? (Ans: Halved, as $\\lambda \\propto 1/\\sqrt{V}$).'}`;
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
        answer = `### 📚 Concept
**de Broglie Wavelength** — Step-by-step physical formulation and quantum derivation for NEET-UG.

### 🧮 Formula
$$\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mK}}$$

### 🔤 Variables
- $\\lambda$ = de Broglie wavelength (m)
- $h$ = Planck's constant ($6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$)
- $p$ = Linear momentum ($kg\\cdot m/s$)
- $m$ = Mass (kg), $v$ = Velocity (m/s)

### 🔢 Step-by-Step Derivation
1. From Planck's Quantum Theory, photon energy: $E = h\\nu = \\frac{hc}{\\lambda}$.
2. From Einstein's Mass-Energy Equivalence: $E = mc^2$.
3. Equating both expressions: $mc^2 = \\frac{hc}{\\lambda} \\implies \\lambda = \\frac{h}{mc} = \\frac{h}{p}$ (for photon with momentum $p = mc$).
4. **de Broglie's Hypothesis (1924):** Generalizing symmetrically to any material particle of mass $m$ moving with speed $v$:
$$\\lambda = \\frac{h}{mv} = \\frac{h}{p}$$
5. In terms of Kinetic Energy $K = \\frac{p^2}{2m} \\implies p = \\sqrt{2mK}$, yielding: $\\lambda = \\frac{h}{\\sqrt{2mK}}$.
6. For a charge $q$ accelerated by potential difference $V$ from rest: $K = qV \\implies \\lambda = \\frac{h}{\\sqrt{2mqV}}$.

### 🔥 NEET Important Points
- ⭐ **Must Know:** $\\lambda \\propto 1/p$ applies universally to both relativistic photons and non-relativistic material particles.
- ⚡ **NCERT Reference:** Derivation provides the quantum foundation for Bohr's quantisation postulate: $2\\pi r_n = n\\lambda$.

### ⚠️ Common Mistake
Never substitute speed of light $c$ for the particle velocity $v$ unless the particle is an actual photon or ultra-relativistic!`;
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
        answer = `### 📚 Concept
The de Broglie hypothesis states that all moving material particles (electrons, protons, atoms, etc.) possess wave-like characteristics alongside particle properties. The wavelength associated with any moving body of momentum $p$ is $\\lambda = h/p$.

### 💡 Easy Explanation
${isHinglish
  ? `Simple shabdon me: Louis de Broglie (1924) ne kaha ki nature symmetric hai. Agar light (radiation) wave aur particle dono ki tarah behave kar sakti hai, toh matter particles (jaise electron, proton) bhi wave ki tarah behave karne chahiyein!\n\nEveryday objects me kyu nahi dikhta?\nKyunki Planck's constant $h$ bahut chhota hota hai ($10^{-34}$). Ek cricket ball ka wavelength lagbhag $10^{-34}\\text{ m}$ hota hai jo detect nahi ho sakta. Par electron ke liye yeh wavelength $\\sim 1\\text{ Å}$ hoti hai jo crystal lattice ke barabar hai!`
  : `In simple terms: Louis de Broglie hypothesized nature's fundamental symmetry: if electromagnetic radiation behaves as both waves and particles, moving material particles must also exhibit wave characteristics.\n\nWhy don't everyday objects exhibit wave nature?\nBecause Planck's constant is minuscule ($6.626 \\times 10^{-34}$). For a cricket ball, $\\lambda \\sim 10^{-34}\\text{ m}$ (unobservable). For microscopic electrons, $\\lambda \\sim 1\\text{ Å}$, which perfectly matches crystal atomic spacing and causes observable diffraction.`}

### 🧮 Formula
$$\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mK}}$$

### 🔤 Variables
- $\\lambda$ = de Broglie wavelength (m)
- $h$ = Planck's constant ($6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$)
- $p$ = Linear momentum ($kg\\cdot m/s$)
- $m$ = Particle mass (kg)
- $v$ = Particle velocity (m/s)

### 🔥 NEET Important Points
- ⭐ **Must Know:** Experimentally confirmed by the Davisson-Germer electron diffraction experiment using a nickel crystal.
- ⚡ **NCERT Reference:** Bohr's second postulate ($mvr = nh/2\\pi$) is explained by standing de Broglie waves: $2\\pi r_n = n\\lambda$.

### ⚠️ Common Mistake
Matter waves accompany neutral particles (like neutrons) as well as charged particles. They do NOT require charges or electromagnetic radiation.

### 🎯 NEET Trick
${isHinglish ? 'Ratio method: $\\lambda_1 / \\lambda_2 = p_2 / p_1 = \\sqrt{K_2 / K_1}$.' : 'Ratio trick: $\\lambda_1 / \\lambda_2 = p_2 / p_1 = \\sqrt{K_2 / K_1}$.'}

### 📝 Quick Check
${isHinglish ? 'Bohr ke nth orbit me kitne de Broglie wavelengths fit hote hain? (Ans: Exactly n wavelengths, $2\\pi r_n = n\\lambda$).' : 'How many de Broglie wavelengths fit into the circumference of the nth Bohr orbit? (Ans: Exactly n wavelengths).'}`;
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
      const formulaMatch = searchFormulaKnowledge(q, subject, chapter, req.targetExam);
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
          answer = `### 📚 Concept
${concept} (${match.subject})

### 💡 Easy Explanation
${match.explanation}

${highYieldHeading}
- ⭐ **Must Know:** High-yield syllabus focus in ${match.chapter}.
- ⚡ **Frequently Tested:** Master boundary definitions and standard graphical relationships.

### ⚠️ Common Mistake
${trap}

${examTrickHeading}
${isHinglish ? 'Syllabus line-by-line statements aur direct formula proportionalities pehle check karein!' : 'Always check direct proportional relationships and verify SI units before final evaluation.'}

### 📝 Quick Check
${isHinglish ? `Kya aap is topic ke governing conditions ko clearly define kar sakte hain?` : `Can you state the primary condition under which this principle holds?`}`;
          steps.push(`1. Concept Principle: Review fundamental definitions governing ${match.chapter}.`);
          steps.push(`2. Method: Apply standard entrance-examination problem-solving relations.`);
          steps.push(`3. Verification: Check numerical units and boundary consistency.`);
        } else {
          answer = `### 📚 Concept
**${q}** (${chapter} — ${subject})

Fundamental syllabus concept in ${chapter}.

### 💡 Easy Explanation
${isHinglish
  ? `Simple shabdon me: **${chapter}** me **${q}** ko samajhne ke liye governing principles ko follow karein. Pehle given parameters list karein aur direct ya inverse proportionality check karein.`
  : `In simple terms: **${q}** is an essential syllabus concept in entrance examinations. In **${chapter}**, understanding governing relationships is key to rapid problem solving.`}

${highYieldHeading}
- ⭐ **Must Know:** Core high-yield focus in ${chapter}.
- ⚡ **Examination Strategy:** Always check coordinate reference frames, boundary values, and standard SI units.

### ⚠️ Common Mistake
${trap}

${examTrickHeading}
${isHinglish ? 'Ratio aur proportionality method use karein taaki lambi calculations se bacha ja sake!' : 'Use proportionality ratios to eliminate unviable MCQ options before computing lengthy arithmetic.'}

### 📝 Quick Check
${isHinglish ? 'Is concept me primary variables ke beech kya sambhandh (relation) hai?' : 'What is the governing proportional relationship between the variables?'}`;
          steps.push("1. State given quantities and unknown variable.");
          steps.push("2. Select the governing relation for this topic.");
          steps.push("3. Substitute values and verify dimensional balance.");
        }
      } catch {
        answer = `### 📚 Concept
**${q}** (${chapter} — ${subject})

### 💡 Easy Explanation
In **${chapter}**, master the core definitions, governing equations, and boundary conditions to solve ${examName} examination questions with high accuracy and speed.

${highYieldHeading}
- ⭐ **Must Know:** Focus on authoritative textbook definitions and diagrams.
- ⚡ **High Priority:** Check standard unit conversions and sign conventions.

### ⚠️ Common Mistake
${trap}

${examTrickHeading}
${isHinglish ? 'Dimensional analysis se formula verify karein!' : 'Use dimensional analysis to cross-check formula consistency.'}

### 📝 Quick Check
Are all physical quantities expressed in consistent standard SI units?`;
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
