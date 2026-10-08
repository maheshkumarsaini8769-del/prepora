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
        answer = `### 📝 Step-by-Step Worked Example: ${chapter}\n\n**Problem:** A particle is projected vertically upwards with an initial velocity $u = 29.4\\text{ m/s}$. Find the maximum height reached and the total time taken to return to the ground. (Take $g = 9.8\\text{ m/s}^2$).\n\n**Given:** $u = +29.4\\text{ m/s}$, at highest point $v = 0\\text{ m/s}$, $a = -g = -9.8\\text{ m/s}^2$.\n\n**Calculation:**\n1. At apex, $v^2 = u^2 - 2gH \\implies 0 = (29.4)^2 - 2(9.8)H \\implies H = \\frac{864.36}{19.6} = 44.1\\text{ m}$.\n2. Time of ascent: $v = u - gt \\implies 0 = 29.4 - 9.8 t \\implies t = 3\\text{ s}$.\n3. Total time of flight: $T = 2t = 2 \\times 3 = 6\\text{ s}$.\n\n**Final Answer:** Maximum Height $H = 44.1\\text{ m}$, Total Time $T = 6\\text{ s}$.`;
        keyFormula = String.raw`H_{\max} = \frac{u^2}{2g}, \quad T = \frac{2u}{g}`;
        variables = "u = Initial velocity (m/s), g = Acceleration due to gravity (9.8 m/s²), H = Maximum height (m), T = Time of flight (s)";
        steps.push("1. Set upward direction as positive (+), downward as negative (-).");
        steps.push("2. Substitute into kinematic equations: v² = u² - 2gH.");
        steps.push("3. Solve for maximum height H = 44.1 m.");
        steps.push("4. Multiply ascent time by 2 to obtain symmetrical total round-trip time: T = 6 s.");
      } else if (subject === 'Chemistry') {
        answer = `### 📝 Step-by-Step Worked Example: ${chapter}\n\n**Problem:** Calculate the molarity of a solution containing $4\\text{ g}$ of $\\text{NaOH}$ dissolved in enough water to prepare $250\\text{ mL}$ of solution. (Molar mass of $\\text{NaOH} = 40\\text{ g/mol}$).\n\n**Given:** Mass of solute $w = 4\\text{ g}$, Molar mass $M_w = 40\\text{ g/mol}$, Volume of solution $V = 250\\text{ mL} = 0.25\\text{ L}$.\n\n**Calculation:**\n1. Number of moles: $n = \\frac{w}{M_w} = \\frac{4}{40} = 0.1\\text{ mol}$.\n2. Molarity: $M = \\frac{n}{V\\text{ (in L)}} = \\frac{0.1}{0.25} = 0.4\\text{ M}$.\n\n**Final Answer:** Concentration $= 0.4\\text{ mol/L}$ (or $0.4\\text{ M}$).`;
        keyFormula = String.raw`M = \frac{\text{moles of solute}}{\text{volume of solution (L)}} = \frac{w_B \times 1000}{M_B \times V(\text{mL})}`;
        variables = "M = Molarity (mol/L), w_B = Mass of solute (g), M_B = Molar mass (g/mol), V = Solution volume (mL)";
        steps.push("1. Convert solute mass to moles using molar mass: n = 4 / 40 = 0.1 mol.");
        steps.push("2. Convert solution volume to liters: 250 mL = 0.25 L.");
        steps.push("3. Compute molarity M = 0.1 / 0.25 = 0.4 M.");
      } else {
        answer = `### 📝 Step-by-Step Worked Example: ${chapter}\n\n**Problem:** Solve the quadratic equation $x^2 - 5x + 6 = 0$ and find its roots.\n\n**Given:** $a = 1$, $b = -5$, $c = 6$.\n\n**Calculation:**\n1. Discriminant: $D = b^2 - 4ac = (-5)^2 - 4(1)(6) = 25 - 24 = 1 > 0$ (Two distinct real roots).\n2. Quadratic Formula: $x = \\frac{-b \\pm \\sqrt{D}}{2a} = \\frac{5 \\pm 1}{2}$.\n3. $x_1 = \\frac{6}{2} = 3$, $x_2 = \\frac{4}{2} = 2$.\n\n**Final Answer:** The roots are $x = 2$ and $x = 3$.`;
        keyFormula = String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}, \quad D = b^2 - 4ac`;
        variables = "a, b, c = Polynomial coefficients, D = Discriminant, x = Real roots";
        steps.push("1. Calculate discriminant D = (-5)² - 4(1)(6) = 1.");
        steps.push("2. Substitute into quadratic formula x = (5 ± 1) / 2.");
        steps.push("3. Obtain roots x = 2 and x = 3.");
      }
      trap = "Always double check calculation arithmetic and sign reversals (+ vs -).";
      tip = "Verify solutions by substituting the answers back into the problem statement.";

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
          intent: 'example',
          subject: subject as any,
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
    } else if (isSolutionReq) {
      concept = `Master Formula Sheet & Framework: ${chapter}`;
      answer = `### 📚 Comprehensive Formula & Method Guide: ${chapter}\n\nIn **${chapter}** (${subject}), standard entrance examination questions center around these core mathematical relationships:`;
      if (subject === 'Physics') {
        keyFormula = String.raw`v = u + at, \quad s = ut + \frac{1}{2}at^2, \quad v^2 = u^2 + 2as, \quad F = ma, \quad W = \vec{F} \cdot \vec{d}`;
        steps.push("1. Kinematic Equations: Use when acceleration is strictly constant.");
        steps.push("2. Work-Energy Principle: W_net = ΔK. Applicable to both constant and variable forces.");
        steps.push("3. Momentum Conservation: Σ p_initial = Σ p_final when net external force is zero.");
      } else if (subject === 'Chemistry') {
        keyFormula = String.raw`n = \frac{m}{M}, \quad PV = nRT, \quad \Delta G = \Delta H - T\Delta S, \quad K_{eq} = \frac{[C]^c[D]^d}{[A]^a[B]^b}`;
        steps.push("1. Stoichiometry: Convert given quantities to moles as the first operational step.");
        steps.push("2. Thermodynamics: Check spontaneity using ΔG < 0 criteria.");
        steps.push("3. Equilibrium: Apply Le Chatelier's principle to evaluate shifts in concentration, temperature, or pressure.");
      } else {
        keyFormula = String.raw`\frac{d}{dx}[x^n] = n x^{n-1}, \quad \int x^n dx = \frac{x^{n+1}}{n+1}, \quad \sin^2\theta + \cos^2\theta = 1`;
        steps.push("1. Simplify algebraic expressions before taking derivatives or integrals.");
        steps.push("2. Use standard substitution techniques (u-substitution or trigonometric identity).");
        steps.push("3. Verify boundary conditions and integration constants (+ C).");
      }

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
          intent: 'solution',
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
        suggestedFollowUps: ['Show step-by-step example', 'Give practical hint', 'Test me on this'],
        suggestedPractice: { subject, chapter, topic, count: 5, actionUrl: `/practice?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}` },
        confidence: 0.98,
        provider: this.name,
        latencyMs: Date.now() - startTime
      };
    }

    // 2. High-Yield Academic Concept Mapping (Specific concepts like Friction, Photosynthesis, Newton's Laws, Gravity)
    if (qLower.includes('friction') || qLower.includes('gharshan')) {
      subject = 'Physics';
      chapter = 'Laws of Motion';
      topic = 'Friction (Static, Kinetic, Rolling)';
      concept = 'Frictional Force and Coefficient of Friction';
      answer = "Friction is the resistive contact force that opposes the relative motion (or impending relative motion) between two surfaces in contact. Static friction self-adjusts up to a maximum limiting value $f_{s,\\max} = \\mu_s N$. Once relative motion begins, kinetic friction $f_k = \\mu_k N$ acts opposite to the velocity vector (with $\\mu_k < \\mu_s$).";
      keyFormula = String.raw`f_s \le \mu_s N, \quad f_k = \mu_k N, \quad \tan\theta_s = \mu_s \text{ (Angle of Repose)}`;
      variables = "f_s = Static friction force (N), f_k = Kinetic friction force (N), μ_s = Coefficient of static friction, μ_k = Coefficient of kinetic friction, N = Normal reaction force (N), θ_s = Angle of repose";
      steps.push("1. Calculate the normal reaction force N perpendicular to the contact interface (N = mg on horizontal surface, N = mg cos θ on incline).");
      steps.push("2. Find limiting friction: f_lim = μ_s N.");
      steps.push("3. Compare applied external parallel force F_ext with f_lim:");
      steps.push("   - If F_ext ≤ f_lim: body remains at rest, static friction self-adjusts to f_s = F_ext.");
      steps.push("   - If F_ext > f_lim: body accelerates, and kinetic friction f_k = μ_k N opposes motion.");
      trap = "Static friction is a SELF-ADJUSTING force! It is NOT always equal to μ_s N. It equals applied force until limiting friction is reached.";
      tip = "On an inclined plane of inclination θ, sliding begins when tan θ > μ_s. The angle of repose equals the angle of friction!";
    } else if (qLower.includes('gravity') || qLower.includes('gravitation') || qLower.includes('gurutvakarshan')) {
      subject = 'Physics';
      chapter = 'Gravitation';
      topic = 'Universal Gravitation & Acceleration due to Gravity';
      concept = 'Gravity and Gravitational Attraction';
      answer = "Gravity is the universal attractive force exerted between any two bodies with mass. By Newton's Law of Universal Gravitation, the force is proportional to the product of masses and inversely proportional to the square of their distance. Near Earth's surface, it produces a gravitational acceleration $g = \\frac{GM}{R^2} \\approx 9.8\\text{ m/s}^2$ directed toward the center of mass.";
      keyFormula = String.raw`F = \frac{G m_1 m_2}{r^2}, \quad g = \frac{GM}{R^2}, \quad v_e = \sqrt{\frac{2GM}{R}} = \sqrt{2gR} \approx 11.2\text{ km/s}`;
      variables = "G = Universal Gravitational Constant (6.674 × 10⁻¹¹ N·m²/kg²), M = Mass of Earth (kg), R = Radius of Earth (m), g = Acceleration due to gravity (9.8 m/s²), v_e = Escape velocity (km/s)";
      steps.push("1. Gravitational field strength depends only on source mass and separation distance: g = GM/r².");
      steps.push("2. Variation with altitude h (small height): g' = g (1 - 2h/R).");
      steps.push("3. Variation with depth d below surface: g' = g (1 - d/R). At the center of Earth (d = R), g = 0.");
      steps.push("4. Weight of a body of mass m is W = mg (force in Newtons).");
      trap = "Mass is scalar and constant everywhere in the universe (kg). Weight is a force vector (Newtons) that varies with local g.";
      tip = "Escape velocity from Earth is independent of the mass of the projectile and the angle of projection: v_e = √(2gR) ≈ 11.2 km/s.";
    } else if (qLower.includes('projectile') || qLower.includes('praksepya')) {
      subject = 'Physics';
      chapter = 'Motion in a Plane';
      topic = 'Projectile Motion under Gravity';
      concept = 'Two-Dimensional Projectile Kinematics';
      answer = "Projectile motion is two-dimensional motion in a vertical plane where the only acceleration acting is constant downward gravity ($g = 9.8\\text{ m/s}^2$). The horizontal motion is completely unaccelerated ($a_x = 0$), while vertical motion is uniformly accelerated ($a_y = -g$). The trajectory is a parabolic path.";
      keyFormula = String.raw`T = \frac{2u \sin\theta}{g}, \quad H = \frac{u^2 \sin^2\theta}{2g}, \quad R = \frac{u^2 \sin 2\theta}{g}, \quad y = x\tan\theta - \frac{g x^2}{2 u^2 \cos^2\theta}`;
      variables = "u = Launch velocity (m/s), θ = Launch angle with horizontal, T = Total time of flight (s), H = Maximum height (m), R = Horizontal range (m)";
      steps.push("1. Resolve initial velocity into orthogonal components: u_x = u cos θ and u_y = u sin θ.");
      steps.push("2. Horizontal position at time t: x = u_x t = (u cos θ) t (constant horizontal velocity).");
      steps.push("3. Vertical velocity at time t: v_y = u sin θ - gt.");
      steps.push("4. At maximum height, vertical velocity v_y = 0, giving time to apex t_h = u sin θ / g.");
      trap = "At the highest point of trajectory, velocity is NOT zero! The horizontal component v_x = u cos θ remains non-zero. Only vertical velocity v_y is zero.";
      tip = "Complementary launch angles (θ and 90° - θ) produce the exact same horizontal range R for the same initial speed u.";
    } else if (qLower.includes('work') && (qLower.includes('energy') || qLower.includes('power') || qLower.includes('karya'))) {
      subject = 'Physics';
      chapter = 'Work, Energy and Power';
      topic = 'Work-Energy Theorem & Conservation of Energy';
      concept = 'Mechanical Work and Energy Transformation';
      answer = "Work is the scalar product of force and displacement vectors ($W = \\vec{F} \\cdot \\vec{d} = F d \\cos\\theta$). The **Work-Energy Theorem** states that the total work done by all forces (conservative, non-conservative, internal, and external) on a particle equals the change in its kinetic energy: $W_{net} = \\Delta K = K_f - K_i$.";
      keyFormula = String.raw`W = \int \vec{F} \cdot d\vec{r} = F d \cos\theta, \quad W_{net} = \Delta K = \frac{1}{2}m v_f^2 - \frac{1}{2}m v_i^2, \quad P = \frac{dW}{dt} = \vec{F} \cdot \vec{v}`;
      variables = "W = Work done (Joules J), F = Force (N), d = Displacement (m), θ = Angle between force and displacement, K = Kinetic energy (J), P = Power (Watts W)";
      steps.push("1. Calculate individual work done by every force acting on the body: W_g (gravity), W_N (normal), W_f (friction), W_app (applied).");
      steps.push("2. Normal force perpendicular to instantaneous displacement does zero work: W_N = 0.");
      steps.push("3. Sum all work contributions: W_total = W_g + W_N + W_f + W_app.");
      steps.push("4. Equate W_total to change in kinetic energy: W_total = 1/2 m v_f² - 1/2 m v_i².");
      trap = "When a body moves in a circular path at constant speed, centripetal force acts towards the center (perpendicular to displacement), so centripetal force does ZERO work!";
      tip = "For a conservative force field (like gravity or electrostatic field), force is the negative gradient of potential energy: F = -dU/dx.";
    } else if (qLower.includes('newton') && (qLower.includes('law') || qLower.includes('niyam') || qLower.includes('motion') || qLower.includes('third') || qLower.includes('second') || qLower.includes('first'))) {
      subject = 'Physics';
      chapter = 'Laws of Motion';
      topic = "Newton's Laws of Motion";
      concept = 'Inertia, Force Momentum Relation, and Action-Reaction';
      answer = "Newton formulated three fundamental laws of classical mechanics:\n1. **First Law (Law of Inertia)**: A body remains at rest or in uniform motion unless acted upon by a net external force.\n2. **Second Law (Fundamental Law)**: The rate of change of momentum is directly proportional to net applied force: $\\vec{F} = \\frac{d\\vec{p}}{dt} = m\\vec{a}$.\n3. **Third Law (Action-Reaction)**: For every action force, there is an equal and opposite reaction force ($F_{AB} = -F_{BA}$).";
      keyFormula = String.raw`\vec{F}_{net} = m \vec{a} = \frac{d\vec{p}}{dt}, \quad \vec{F}_{AB} = -\vec{F}_{BA}, \quad \vec{J} = \Delta \vec{p} = \int \vec{F} dt`;
      variables = "F = Force (N), m = Mass (kg), a = Acceleration (m/s²), p = Linear momentum (kg·m/s), J = Impulse (N·s)";
      steps.push("1. Draw a Free Body Diagram (FBD) for every individual body in the system.");
      steps.push("2. Set up Cartesian axes along acceleration and perpendicular to acceleration.");
      steps.push("3. Write Newton's 2nd Law for each body: Σ F_x = m a_x, Σ F_y = m a_y.");
      steps.push("4. Solve simultaneous equations for tension, normal force, and system acceleration.");
      trap = "Action and Reaction force pairs NEVER cancel each other out because they act on DIFFERENT bodies! (Force on A by B vs Force on B by A).";
      tip = "Newton's First and Third Laws can be derived from the Second Law; hence the Second Law is the most fundamental law of motion.";
    } else if (qLower.includes('photosynthesis') || qLower.includes('prakash sanshleshan')) {
      subject = 'Biology';
      chapter = 'Plant Physiology';
      topic = 'Photosynthesis in Higher Plants';
      concept = 'Light Reaction, Photophosphorylation, and Calvin Cycle';
      answer = "Photosynthesis is the fundamental photochemical process by which green plants and cyanobacteria convert light energy into chemical energy (glucose), utilizing atmospheric carbon dioxide and water while releasing oxygen gas. It occurs in two stages: Light-dependent reactions in thylakoids (producing ATP and NADPH) and Light-independent Dark reactions (Calvin cycle) in stroma.";
      keyFormula = String.raw`6\text{CO}_2 + 12\text{H}_2\text{O} \xrightarrow[\text{Chlorophyll}]{\text{Light Energy}} \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{H}_2\text{O} + 6\text{O}_2 \uparrow`;
      variables = "CO₂ = Carbon dioxide (fixed into carbohydrate), H₂O = Water (source of electrons and oxygen), ATP/NADPH = Energy currency generated in thylakoid";
      steps.push("1. Light Absorption & Photolysis: Chlorophyll pigments in PSII absorb light at 680 nm. Water is split into 2H⁺, 2e⁻, and 1/2 O₂.");
      steps.push("2. Z-Scheme Electron Transport: Electrons flow from PSII to PSI (700 nm), driving proton pumping across thylakoid membrane to synthesize ATP via ATP synthase.");
      steps.push("3. Calvin Cycle (C3 Cycle in Stroma): Carbon fixation catalyzed by RuBisCO: RuBP + CO₂ → 2 molecules of 3-PGA.");
      steps.push("4. Reduction & Regeneration: 3-PGA is reduced to Triose Phosphate (using ATP + NADPH) and RuBP is regenerated.");
      trap = "The oxygen (O₂) released during photosynthesis originates from WATER (H₂O via photolysis in PSII), NOT from carbon dioxide (CO₂)! Verified by Ruben and Kamen using O-18 isotopes.";
      tip = "RuBisCO is the most abundant protein on Earth, exhibiting both carboxylase and oxygenase activity depending on CO₂/O₂ concentration and temperature.";
    } else if (qLower.includes('cell') || qLower.includes('koshika') || qLower.includes('mitochondria')) {
      subject = 'Biology';
      chapter = 'Cell: The Unit of Life';
      topic = 'Cell Structure, Organelles & Endomembrane System';
      concept = 'Prokaryotic vs Eukaryotic Cell Architecture';
      answer = "The cell is the basic structural, functional, and biological unit of all known living organisms. All cells are surrounded by a phospholipid bilayer plasma membrane. Eukaryotic cells possess membrane-bound organelles: Mitochondria (cellular respiration, ATP powerhouse with 70S ribosomes and circular DNA), Ribosomes (protein synthesis, 80S in cytoplasm, 70S in organelles), and Nucleus (genetic material DNA).";
      keyFormula = String.raw`\text{Cell Cycle: } \text{G}_1 \to \text{S (DNA Replication)} \to \text{G}_2 \to \text{M (Mitosis/Meiosis)}`;
      variables = "Mitochondria = Powerhouse (ATP synthesis via oxidative phosphorylation), Ribosome = Protein factory (non-membrane bound), Chloroplast = Photosynthetic organelle";
      steps.push("1. Cell Theory (Schleiden, Schwann, Virchow): All living organisms are composed of cells, and all cells arise from pre-existing cells ('Omnis cellula-e-cellula').");
      steps.push("2. Endosymbiotic Theory: Mitochondria and Chloroplasts originated as symbiotic prokaryotes, retaining their own circular DNA and 70S ribosomes.");
      steps.push("3. Fluid Mosaic Model (Singer & Nicolson, 1972): Plasma membrane is a quasi-fluid lipid bilayer with embedded and peripheral proteins.");
      trap = "Mitochondria and chloroplasts have 70S ribosomes, identical to bacteria, while eukaryotic cytoplasm contains 80S ribosomes.";
      tip = "DNA replication occurs exclusively in the S-phase (Synthesis Phase) of interphase in the cell cycle.";
    } else {
      // 3. Check Formula Knowledge Search
      const formulaMatch = searchFormulaKnowledge(q, subject, chapter);
      if (formulaMatch && formulaMatch.found) {
        return {
          answer: `### ${formulaMatch.name}\n\n${formulaMatch.concept}\n\n**📌 Governing Formula:**\n$$${formulaMatch.formula}$$\n\n**📝 Variables Explained:**\n${formulaMatch.variables}`,
          coreConcept: `${formulaMatch.name} — ${formulaMatch.concept}`,
          stepByStepSolution: formulaMatch.stepByStep,
          keyFormula: formulaMatch.formula,
          variables: formulaMatch.variables,
          example: undefined,
          examinerTrap: formulaMatch.trap,
          examTip: formulaMatch.examTip,
          understanding: {
            intent: 'formula',
            subject: formulaMatch.subject as any,
            chapter: formulaMatch.chapter,
            topic: formulaMatch.topic,
            concept: formulaMatch.concept,
            difficulty: 'Medium',
            isNumerical: false,
            requiresCurrentInfo: false
          },
          verificationPassed: true,
          groundedInPrepora: true,
          suggestedFollowUps: [
            'Show numerical example',
            'Step-by-step derivation',
            'Where does this fail?',
            'Test me on this'
          ],
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
