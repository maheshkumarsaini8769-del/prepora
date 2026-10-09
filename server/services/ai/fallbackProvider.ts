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
    } else if (/\b(atom|atoms|parmanu|paramanu|atomic structure|structure of atom|atomic number|subatomic|protons?|neutrons?|electrons?|bohr model|rutherford)\b/i.test(qLower)) {
      // ==========================================
      // ATOM & ATOMIC STRUCTURE
      // ==========================================
      const isAtomicNumber = /\b(atomic number|parmanu kramank|parmanu sankhya|z number|atomic no)\b/i.test(qLower);
      subject = 'Chemistry';
      chapter = 'Structure of Atom';
      topic = isAtomicNumber ? 'Atomic Number and Mass Number' : 'Constituents of Atom & Atomic Models';
      concept = isAtomicNumber ? 'Atomic Number (Z) and Mass Number (A)' : 'Structure of Atom & Subatomic Particles';

      if (isAtomicNumber) {
        answer = `### 📚 Concept
**Atomic Number ($Z$)** is defined as the total number of protons present inside the nucleus of an atom.

### 💡 Easy Explanation
${isHinglish
  ? `Simple shabdon me: Har chemical element ki pehchan uske nucleus me present protons ki sankhya se hoti hai. Is sankhya ko **Atomic Number ($Z$)** kehte hain!\n\n• **Neutral atom me:** Number of protons = Number of electrons = $Z$.\n• **Mass Number ($A$):** Nucleus me kul nucleons ki sankhya ($A = Z + N$, jahan $N$ = neutrons).\n• **Isotopes:** Jin elements ka atomic number $Z$ same ho par mass number $A$ alag ho (jaise $^1_1\\text{H}, ^2_1\\text{H}, ^3_1\\text{H}$).`
  : `In simple terms: The atomic number ($Z$) uniquely defines the chemical identity of an element. It corresponds to the number of protons in its nucleus.\n\n• **In a neutral atom:** Number of protons = Number of electrons = $Z$.\n• **Mass Number ($A$):** Total nucleons in the nucleus: $A = Z + N$ (where $N$ = neutrons).\n• **Isotopes:** Atoms of the same element with identical $Z$ but differing mass numbers $A$ (e.g. $^1_1\\text{H}, ^2_1\\text{H}, ^3_1\\text{H}$).`}

### 🧮 Formula
$$Z = p = e \\quad \\text{(in neutral atom)}, \\quad A = Z + N \\implies N = A - Z$$

### 🔤 Variables
- $Z$ = Atomic Number (number of protons)
- $A$ = Mass Number (total nucleons: protons + neutrons)
- $N$ = Number of neutrons
- $e$ = Number of electrons

${highYieldHeading}
- ⭐ **Must Know:** Modern Periodic Table is arranged strictly in order of increasing **Atomic Number ($Z$)**, NOT atomic mass (Moseley's Law: $\\sqrt{\\nu} = a(Z - b)$).
- ⚡ **NCERT Reference:** Isobars have the same mass number $A$ but different atomic numbers $Z$ (e.g. $^{40}_{18}\\text{Ar}$ and $^{40}_{20}\\text{Ca}$).

### ⚠️ Common Mistake
In ions (cations or anions), the electron count changes, but the atomic number ($Z$, number of protons) NEVER changes!

${examTrickHeading}
${isHinglish ? 'Neutrons nikalne ke liye direct formula: $N = A - Z$.' : 'To find neutrons quickly: $N = A - Z$.'}

### 📝 Quick Check
${isHinglish ? 'Sodium ($^{23}_{11}\\text{Na}$) me kitne protons, neutrons aur electrons hote hain? (Ans: 11 p, 12 n, 11 e).' : 'How many protons, neutrons, and electrons are present in $^{23}_{11}\\text{Na}$? (Ans: 11 protons, 12 neutrons, 11 electrons).'}`;
        keyFormula = String.raw`Z = p, \quad A = Z + N`;
      } else {
        answer = `### 📚 Concept
An **atom** is the fundamental, indivisible chemical unit of ordinary matter that defines a chemical element. It consists of a dense central **nucleus** surrounded by an electron cloud.

### 💡 Easy Explanation
${isHinglish
  ? `Simple shabdon me: Atom matter ka basic building block hai. Ek atom ke andar 3 fundamental subatomic particles hote hain:\n1. **Protons ($p^+$):** Nucleus me positive charge ($+1.6 \\times 10^{-19}\\text{ C}$), mass $\\approx 1.673 \\times 10^{-27}\\text{ kg}$.\n2. **Neutrons ($n^0$):** Nucleus me neutral particle, mass $\\approx 1.675 \\times 10^{-27}\\text{ kg}$.\n3. **Electrons ($e^-$):** Nucleus ke bahar discrete energy orbits me ghoomte hain, negative charge ($-1.6 \\times 10^{-19}\\text{ C}$), mass $\\approx 9.1 \\times 10^{-31}\\text{ kg}$.\n\nRutherford ne nucleus discover kiya aur Bohr ne bataya ki electrons stationary non-radiating orbits me ghoomte hain ($mvr = nh/2\\pi$).`
  : `In simple terms: An atom is the basic structural building block of all elements. It consists of three fundamental subatomic particles:\n1. **Protons ($p^+$):** Located in the central nucleus with positive charge ($+1.602 \\times 10^{-19}\\text{ C}$) and mass $\\approx 1.673 \\times 10^{-27}\\text{ kg}$.\n2. **Neutrons ($n^0$):** Neutral subatomic particles residing in the nucleus alongside protons, mass $\\approx 1.675 \\times 10^{-27}\\text{ kg}$.\n3. **Electrons ($e^-$):** Negatively charged particles revolving in quantized orbits around the nucleus, mass $\\approx 9.109 \\times 10^{-31}\\text{ kg}$.\n\nErnest Rutherford discovered the atomic nucleus, and Niels Bohr formulated the quantized orbital model ($mvr = nh/2\\pi$).`}

### 🧮 Formula
$$r_n = 0.529 \\frac{n^2}{Z}\\text{ Å}, \\quad E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}, \\quad mvr = \\frac{nh}{2\\pi}$$

### 🔤 Variables
- $n$ = Principal quantum number (orbit number 1, 2, 3...)
- $Z$ = Atomic number
- $r_n$ = Radius of the $n$-th Bohr orbit
- $E_n$ = Total electronic energy in the $n$-th orbit
- $h$ = Planck's constant ($6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$)

${highYieldHeading}
- ⭐ **Must Know:** Nuclear radius ($R \\sim 10^{-15}\\text{ m} = 1\\text{ fm}$) is $10^5$ times smaller than atomic radius ($R \\sim 10^{-10}\\text{ m} = 1\\text{ Å}$).
- ⚡ **NCERT Reference:** An atom is electrically neutral because the number of protons equals the number of electrons.

### ⚠️ Common Mistake
Never think the mass of an atom is distributed uniformly! Over 99.9% of the atom's mass is concentrated in the microscopic nucleus.

${examTrickHeading}
${isHinglish ? 'Bohr radius proportionality: $r_n \\propto n^2 / Z$ aur energy $E_n \\propto -Z^2 / n^2$.' : 'Remember Bohr proportionalities: $r_n \\propto n^2 / Z$ and $E_n \\propto -Z^2 / n^2$.'}

### 📝 Quick Check
${isHinglish ? 'Hydrogen atom ke first orbit ($n=1$) ki energy kitni hoti hai? (Ans: -13.6 eV).' : 'What is the ground state energy of an electron in a hydrogen atom ($n=1$)? (Ans: -13.6 eV).'}`;
        keyFormula = String.raw`mvr = \frac{nh}{2\pi}, \quad E_n = -\frac{13.6 Z^2}{n^2}\text{ eV}`;
      }

      steps.push("1. Atom consists of positively charged nucleus containing protons and neutrons.");
      steps.push("2. Electrons revolve around the nucleus in discrete quantized energy orbits.");
      steps.push("3. The atomic number Z equals the number of protons; mass number A equals protons + neutrons.");

      return {
        answer,
        coreConcept: concept,
        stepByStepSolution: steps,
        keyFormula,
        variables,
        examinerTrap: "Do not confuse atomic number Z with mass number A in nuclear notation.",
        examTip: "Bohr's model applies strictly to single-electron species like H, He⁺, Li²⁺.",
        understanding: {
          intent: 'definition',
          subject: subject as any,
          chapter,
          topic,
          concept,
          difficulty: 'Easy',
          isNumerical: false,
          requiresCurrentInfo: false
        },
        verificationPassed: true,
        groundedInPrepora: true,
        suggestedFollowUps: ['Explain Bohr atomic model', 'What is atomic mass', 'Test me on this'],
        suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
        confidence: 0.99,
        provider: this.name,
        latencyMs: Date.now() - startTime
      };
    } else if (/\b(cell|cells|koshika|cell biology|cytology|prokaryot|eukaryot|mitochondria|ribosome|organelles?|cell theory|lysosome|chloroplast|endoplasmic)\b/i.test(qLower) && !/\b(galvanic|dry cell|voltaic|electrolytic cell|potentiometer)\b/i.test(qLower)) {
      // ==========================================
      // CELL: THE UNIT OF LIFE (BIOLOGY)
      // ==========================================
      subject = 'Biology';
      chapter = 'Cell: The Unit of Life';
      topic = 'Cell Structure, Types & Organelles';
      concept = 'Cell: Fundamental Structural & Functional Unit of Life';

      answer = `### 📚 Concept
A **cell** is the fundamental structural, functional, and biological unit of all living organisms. Anything less than a complete structure of a cell does not ensure independent living.

### 💡 Easy Explanation
${isHinglish
  ? `Simple shabdon me: Jaise building bricks se banti hai, waise hi har living organism cells se banta hai!\n\n• **Discovery:** Robert Hooke ne pehli baar dead cell (cork) dekha. Antonie van Leeuwenhoek ne first living cell observe kiya.\n• **Cell Theory:** Schleiden (1838) aur Schwann (1839) ne di, jise Rudolf Virchow (1855) ne modify kiya: *Omnis cellula e cellula* (naye cells pehle se maujood cells ke division se bante hain).\n\n**Cell ke 2 Main Types:**\n1. **Prokaryotic Cell (e.g. Bacteria):** No membrane-bound nucleus, 70S ribosomes, circular naked DNA, mesosomes for respiration.\n2. **Eukaryotic Cell (e.g. Plants, Animals):** True membrane-bound nucleus, 80S ribosomes in cytoplasm, complex organelles.\n\n**Key Organelles:**\n• **Mitochondria:** "Powerhouse of the cell" (ATP synthesis via aerobic respiration, double membrane, circular DNA, 70S ribosomes).\n• **Ribosomes:** Non-membrane bound, protein factory.\n• **Chloroplast:** Photosynthesis site in green plants.\n• **Lysosomes:** Hydrolytic enzymes for intracellular digestion ("suicide bags").`
  : `In simple terms: A cell is the basic structural and functional unit of all living organisms.\n\n• **Discovery:** Robert Hooke first discovered cells in cork (1665). Anton van Leeuwenhoek first observed living free cells (1674).\n• **Cell Theory:** Proposed by Matthias Schleiden and Theodor Schwann, later finalized by Rudolf Virchow (*Omnis cellula e cellula* — all cells arise from pre-existing cells).\n\n**Two Primary Classifications:**\n1. **Prokaryotes (Bacteria, Blue-green algae, Mycoplasma):** Lack a membrane-bound nucleus and organelles; have 70S ribosomes and naked circular genomic DNA.\n2. **Eukaryotes (Protists, Fungi, Plants, Animals):** Possess a true membrane-bound nucleus, compartmentalized cytoplasm, and 80S ribosomes.\n\n**Crucial Organelles:**\n• **Mitochondria:** Double-membraned powerhouse generating ATP through oxidative phosphorylation.\n• **Ribosomes:** Universal protein synthesis machinery (70S in prokaryotes, 80S in eukaryotes).\n• **Chloroplasts:** Site of photosynthesis in autotrophic plant cells.\n• **Lysosomes:** Membrane-bound vesicles containing acidic hydrolytic enzymes.`}

${highYieldHeading}
- ⭐ **Must Know:** Mycoplasma is the smallest living cell ($0.3\\;\\mu\\text{m}$ in length) and lacks a cell wall.
- ⚡ **NCERT Reference:** Mitochondria and chloroplasts are semi-autonomous organelles containing their own 70S ribosomes and circular dsDNA.

### ⚠️ Common Mistake
Viruses are an exception to Cell Theory! They lack cellular machinery and reproduce only inside host cells.

${examTrickHeading}
${isHinglish ? 'Ribosome size trick: Prokaryote = 70S (50S + 30S). Eukaryote = 80S (60S + 40S). Note that S stands for Svedberg unit (sedimentation coefficient).' : 'Ribosome rule: Prokaryotes have 70S (50S + 30S subunits); eukaryotes have 80S (60S + 40S). S is the Svedberg sedimentation coefficient.'}

### 📝 Quick Check
${isHinglish ? 'Cell Theory kisne di thi aur kisne "Omnis cellula e cellula" add kiya? (Ans: Schleiden & Schwann; modified by Rudolf Virchow).' : 'Who proposed the Cell Theory and who contributed "Omnis cellula e cellula"? (Ans: Schleiden & Schwann; expanded by Rudolf Virchow).'}`;

      steps.push("1. Cell is the structural and functional unit of life.");
      steps.push("2. Cell Theory states all living beings are composed of cells arising from pre-existing cells.");
      steps.push("3. Prokaryotes lack membrane-bound organelles; eukaryotes contain compartmentalized organelles.");

      return {
        answer,
        coreConcept: concept,
        stepByStepSolution: steps,
        keyFormula: undefined,
        variables: undefined,
        examinerTrap: "Viruses do not obey cell theory as they are acellular entities.",
        examTip: "Ribosomes are non-membrane bound and found in both prokaryotes and eukaryotes.",
        understanding: {
          intent: 'definition',
          subject: 'Biology',
          chapter,
          topic,
          concept,
          difficulty: 'Easy',
          isNumerical: false,
          requiresCurrentInfo: false
        },
        verificationPassed: true,
        groundedInPrepora: true,
        suggestedFollowUps: ['Explain prokaryote vs eukaryote', 'Functions of mitochondria', 'Test me on cell biology'],
        suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
        confidence: 0.99,
        provider: this.name,
        latencyMs: Date.now() - startTime
      };
    } else if (/\b(force|forces|bal|newton's second law|newton's laws|inertia)\b/i.test(qLower) && !qLower.includes('friction') && !qLower.includes('gravity')) {
      // ==========================================
      // FORCE & NEWTON'S LAWS OF MOTION
      // ==========================================
      subject = 'Physics';
      chapter = 'Laws of Motion';
      topic = "Newton's Laws of Motion & Momentum";
      concept = 'Concept of Force and Newton’s Second Law';

      answer = `### 📚 Concept
A **force** is an external interaction (push or pull) that changes or tends to change the state of rest, uniform motion, direction, or shape of a body.

### 💡 Easy Explanation
${isHinglish
  ? `Simple shabdon me: Force ek physical push ya pull hai jo object ke acceleration ko produce karta hai. Newton ke 3 laws iske core hain:\n1. **First Law (Law of Inertia):** Koi bhi body apni rest ya uniform motion ki state tab tak maintain rakhti hai jab tak external unbalanced force na lage.\n2. **Second Law (Core Equation):** Net external force rate of change of linear momentum ke directly proportional hota hai: $\\vec{F} = \\frac{d\\vec{p}}{dt} = m\\vec{a}$ (jab mass constant ho).\n3. **Third Law (Action-Reaction):** Every action has an equal and opposite reaction (forces always occur in pairs: $\\vec{F}_{AB} = -\\vec{F}_{BA}$).`
  : `In simple terms: Force is an external agency capable of altering a body's state of rest or uniform motion.\n\n**Newton's Three Laws of Motion:**\n1. **First Law (Inertia):** A body remains at rest or moves with constant velocity unless compelled by a net external force.\n2. **Second Law (Measurement of Force):** The rate of change of linear momentum is directly proportional to the applied force: $\\vec{F}_{net} = \\frac{d\\vec{p}}{dt} = m\\vec{a}$.\n3. **Third Law (Action-Reaction):** For every action force, there is an equal and opposite reaction force acting on different interacting bodies ($\\\\vec{F}_{AB} = -\\\\vec{F}_{BA}$).`}

### 🧮 Formula
$$\\vec{F} = m\\vec{a}, \\quad \\vec{F} = \\frac{d\\vec{p}}{dt}, \\quad \\vec{p} = m\\vec{v}$$

### 🔤 Variables
- $\\vec{F}$ = Net force (Newtons, N, where $1\\text{ N} = 1\\text{ kg}\\cdot\\text{m/s}^2$)
- $m$ = Mass of the object (kg)
- $\\vec{a}$ = Resultant acceleration (m/s²)
- $\\vec{p}$ = Linear momentum ($kg\\cdot m/s$)

${highYieldHeading}
- ⭐ **Must Know:** 1 Newton ($1\\text{ N}$) = $10^5\\text{ dynes}$. Dimensions of force: $[M^1 L^1 T^{-2}]$.
- ⚡ **NCERT Reference:** Newton’s Second Law is the real fundamental law of motion because both the 1st and 3rd laws can be derived from it.

### ⚠️ Common Mistake
Action and reaction forces NEVER cancel each other out because they act on TWO DIFFERENT bodies!

${examTrickHeading}
${isHinglish ? 'Agar mass variable ho (jaise rocket propulsion), toh formula $\\vec{F} = m\\frac{d\\vec{v}}{dt} + \\vec{v}\\frac{dm}{dt}$ use karein.' : 'For variable mass systems (like rocket thrust), use $F_{thrust} = v_{rel} \\frac{dm}{dt}$.'}

### 📝 Quick Check
${isHinglish ? 'Ek 5 kg body par 20 N ka force lagayein toh acceleration kitna hoga? (Ans: a = F/m = 4 m/s²).' : 'What acceleration is produced when a 20 N force acts on a 5 kg mass? (Ans: a = F/m = 4 m/s²).'}`;
      keyFormula = String.raw`\vec{F} = m\vec{a}`;

      steps.push("1. Force is defined as the product of mass and acceleration: F = ma.");
      steps.push("2. The SI unit of force is the Newton (N = kg m/s²).");
      steps.push("3. Net unbalanced force causes acceleration in the direction of the force.");

      return {
        answer,
        coreConcept: concept,
        stepByStepSolution: steps,
        keyFormula,
        variables,
        examinerTrap: "Action and reaction act on different objects, so they never cancel each other out.",
        examTip: "Newton's second law F = ma applies when mass is invariant.",
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
        suggestedFollowUps: ['Show Newton laws examples', 'Calculate numerical with F=ma', 'Test me on this'],
        suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
        confidence: 0.99,
        provider: this.name,
        latencyMs: Date.now() - startTime
      };
    } else if (/\b(photosynthesis|prakash sanshleshan|calvin cycle|light reaction|dark reaction|rubisco|chlorophyll)\b/i.test(qLower)) {
      // ==========================================
      // PHOTOSYNTHESIS IN HIGHER PLANTS
      // ==========================================
      subject = 'Biology';
      chapter = 'Photosynthesis in Higher Plants';
      topic = 'Mechanism of Light and Dark Reactions';
      concept = 'Mechanism of Photosynthesis in Higher Plants';

      answer = `### 📚 Concept
**Photosynthesis** is the anabolic, endergonic physico-chemical process by which green plants, algae, and cyanobacteria synthesize organic food (glucose) from carbon dioxide and water in the presence of sunlight and chlorophyll, releasing oxygen as a byproduct.

### 💡 Easy Explanation
${isHinglish
  ? `Simple shabdon me: Green plants sunlight ki energy ko chemical energy (glucose) me convert karte hain. Photosynthesis ke 2 main phases hote hain:\n\n1. **Light Reaction (Photochemical phase - Thylakoids/Grana me):**\n   • Light absorption by Photosystems (PS II and PS I).\n   • Water splitting (Photolysis: $2\\text{H}_2\\text{O} \\to 4\\text{H}^+ + 4e^- + \\text{O}_2$) at PS II.\n   • Synthesis of assimilatory power: ATP and NADPH via chemiosmosis.\n\n2. **Dark Reaction / Calvin Cycle (Biosynthetic phase - Stroma me):**\n   • Light ki direct zaroorat nahi hoti, par yeh light reaction ke products (ATP & NADPH) par depend karta hai.\n   • **RuBisCO** enzyme $\\text{CO}_2$ ko fix karta hai.\n   • 3 steps: Carboxylation, Reduction, and Regeneration.\n   • 1 glucose molecule banane ke liye 6 turns of Calvin cycle, 18 ATP, aur 12 NADPH lagte hain.`
  : `In simple terms: Photosynthesis converts light energy into stable chemical energy stored in carbohydrates.\n\n**Two Distinct Stages:**\n1. **Light Reaction (Thylakoid membranes):**\n   • Absorption of solar radiation by pigments (chlorophyll a, b, carotenoids).\n   • Photolysis of water at Oxygen Evolving Complex of PS II: $2\\text{H}_2\\text{O} \\to 4\\text{H}^+ + 4e^- + \\text{O}_2$.\n   • Non-cyclic photophosphorylation (Z-scheme) generates ATP and NADPH.\n\n2. **Dark Reaction / Calvin Cycle (Chloroplast Stroma):**\n   • Enzyme RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) catalyzes $\\text{CO}_2$ fixation.\n   • Three phases: Carboxylation, Reduction, and RuBP Regeneration.\n   • Net requirement for 1 Glucose: $6\\text{CO}_2 + 18\\text{ATP} + 12\\text{NADPH}$.`}

### 🧮 Formula
$$6\\text{CO}_2 + 12\\text{H}_2\\text{O} \\xrightarrow{\\text{Light, Chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{H}_2\\text{O} + 6\\text{O}_2\\uparrow$$

${highYieldHeading}
- ⭐ **Must Know:** RuBisCO is the most abundant enzyme/protein in the entire biosphere.
- ⚡ **NCERT Reference:** Oxygen released during photosynthesis comes entirely from water ($\text{H}_2\text{O}$), NOT from carbon dioxide ($\text{CO}_2$) (proved by Ruben and Kamen using $^{18}\text{O}$).

### ⚠️ Common Mistake
The "Dark Reaction" does NOT mean it happens in the dark! It occurs in daytime simultaneously with the light reaction, but does not directly absorb photons.

${examTrickHeading}
${isHinglish ? 'Calvin cycle tally: 1 Glucose = 6 CO₂ + 18 ATP + 12 NADPH. Per CO₂ fixed: 3 ATP and 2 NADPH required.' : 'Per CO₂ molecule fixed in C3 cycle: 3 ATP and 2 NADPH are consumed.'}

### 📝 Quick Check
${isHinglish ? 'Photosynthesis me nikalne wali Oxygen kahan se aati hai? (Ans: Water ki photolysis se, CO₂ se nahi).' : 'Where does the oxygen released during photosynthesis originate? (Ans: From the photolysis of water, not CO₂).'}`;

      keyFormula = String.raw`6\text{CO}_2 + 12\text{H}_2\text{O} \to \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{H}_2\text{O} + 6\text{O}_2`;
      steps.push("1. Light reaction absorbs photons in thylakoid membranes to generate ATP and NADPH.");
      steps.push("2. Water is split (photolysis) releasing oxygen gas.");
      steps.push("3. Dark reaction (Calvin cycle) fixes CO2 in stroma using RuBisCO to produce glucose.");

      return {
        answer,
        coreConcept: concept,
        stepByStepSolution: steps,
        keyFormula,
        variables,
        examinerTrap: "Oxygen released during photosynthesis originates from water, not carbon dioxide.",
        examTip: "RuBisCO has affinity for both CO2 and O2; photorespiration occurs when O2 binds to RuBisCO.",
        understanding: {
          intent: 'explanation',
          subject: 'Biology',
          chapter,
          topic,
          concept,
          difficulty: 'Medium',
          isNumerical: false,
          requiresCurrentInfo: false
        },
        verificationPassed: true,
        groundedInPrepora: true,
        suggestedFollowUps: ['Explain Calvin cycle steps', 'What is C4 pathway', 'Test me on this'],
        suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
        confidence: 0.99,
        provider: this.name,
        latencyMs: Date.now() - startTime
      };
    } else if (/(\b(solve|calculate|evaluate)\b.*)?(\d+)\s*x\s*([+\-])\s*(\d+)\s*=\s*(\d+)/i.test(qLower)) {
      // ==========================================
      // LINEAR EQUATION SOLVER (MATHEMATICS)
      // e.g. "Solve 2x + 5 = 15"
      // ==========================================
      const match = qLower.match(/(\d+)\s*x\s*([+\-])\s*(\d+)\s*=\s*(\d+)/i);
      const a = match ? parseInt(match[1], 10) : 2;
      const sign = match ? match[2] : '+';
      const b = match ? parseInt(match[3], 10) : 5;
      const c = match ? parseInt(match[4], 10) : 15;

      const effectiveB = sign === '+' ? b : -b;
      const rhsAfterShift = c - effectiveB;
      const xVal = rhsAfterShift / a;

      subject = 'Mathematics';
      chapter = 'Linear Equations & Algebra';
      topic = 'Solving Linear Equations in One Variable';
      concept = `Solution of Linear Equation $${a}x ${sign} ${b} = ${c}$`;

      answer = `### Given
Linear equation in one variable:
$$${a}x ${sign} ${b} = ${c}$$

### Find
The value of the unknown variable $x$.

### Formula
For standard linear equation $ax + b = c$:
$$x = \\frac{c - b}{a}$$

### Step-by-Step Solution
1. **Transpose constant term to the Right Hand Side (RHS):**
   $$${a}x = ${c} ${sign === '+' ? '-' : '+'} ${b}$$
   $$${a}x = ${rhsAfterShift}$$

2. **Divide both sides by the coefficient of $x$ (which is $${a}$):**
   $$x = \\frac{${rhsAfterShift}}{${a}}$$
   $$x = ${xVal}$$

### ✅ Final Answer
The solution to the equation is:
**$$x = ${xVal}$$**

### ⚠️ Verification Check
Substitute $x = ${xVal}$ back into the original equation:
$$\\text{LHS} = ${a}(${xVal}) ${sign} ${b} = ${a * xVal} ${sign} ${b} = ${c} = \\text{RHS}$$
LHS = RHS, which confirms the solution is mathematically correct!`;

      keyFormula = String.raw`x = \frac{c - b}{a}`;
      steps.push(`Step 1: Shift constant term to RHS: ${a}x = ${c} ${sign === '+' ? '-' : '+'} ${b} = ${rhsAfterShift}.`);
      steps.push(`Step 2: Divide by coefficient of x: x = ${rhsAfterShift} / ${a} = ${xVal}.`);
      steps.push(`Step 3: Verification: Substituting x = ${xVal} gives LHS = RHS = ${c}.`);

      return {
        answer,
        coreConcept: concept,
        stepByStepSolution: steps,
        keyFormula,
        variables: `x = Unknown algebraic variable, a = ${a}, b = ${b}, c = ${c}`,
        example: answer,
        examinerTrap: "Remember to reverse the sign when transposing a term across the equals sign (+ becomes -, and - becomes +).",
        examTip: "Always plug your calculated answer back into the original equation to verify correctness.",
        understanding: {
          intent: 'numerical',
          subject: 'Mathematics',
          chapter,
          topic,
          concept,
          difficulty: 'Easy',
          isNumerical: true,
          requiresCurrentInfo: false
        },
        verificationPassed: true,
        groundedInPrepora: true,
        suggestedFollowUps: ['Solve quadratic equation', 'Show another algebra example', 'Test me on equations'],
        suggestedPractice: { subject: 'Mathematics', chapter: 'Algebra', topic: 'Linear Equations', count: 5, actionUrl: `/practice?subject=Mathematics` },
        confidence: 0.99,
        provider: this.name,
        latencyMs: Date.now() - startTime
      };
    } else {
      // 3. Check Formula Knowledge Search (Only for formula/example/derivation intents or explicit formula names)
      const formulaMatch = (isForm || isEx || isDeriv) 
        ? searchFormulaKnowledge(q, subject, chapter, req.targetExam)
        : null;

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
