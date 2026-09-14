import { SubjectName } from '../types';
import { userService } from './userService';

export interface SolvedDoubtResponse {
  id: string;
  question: string;
  subject: SubjectName;
  chapter: string;
  coreConcept: string;
  stepByStepSolution: string[];
  keyFormula?: string;
  examinerTrap: string;
  examTip: string;
  timestamp: string;
}

export class AIDoubtSolverService {
  public solveDoubt(
    questionText: string,
    subject: SubjectName,
    chapter: string
  ): SolvedDoubtResponse {
    const q = questionText.trim();
    const qLower = q.toLowerCase();

    let coreConcept = `Fundamental laws and governing equations in ${subject}: ${chapter}.`;
    let keyFormula = '';
    const stepByStepSolution: string[] = [];
    let examinerTrap = 'Watch out for sign conventions and unit conversions (e.g. cm to m, or atm to Pa).';
    let examTip = `Frequently tested in ${subject} board and competitive entrance examinations.`;

    if (subject === 'Physics') {
      if (qLower.includes('work') || qLower.includes('energy') || qLower.includes('power')) {
        coreConcept = 'Work-Energy Theorem: Total work done by all forces equals the change in kinetic energy (W_net = ΔK).';
        keyFormula = 'W = \\int F \\cdot dr = \\Delta K = K_f - K_i';
        stepByStepSolution.push('1. Identify all conservative and non-conservative forces acting on the system.');
        stepByStepSolution.push('2. Set up the line integral of force along the trajectory or use potential energy function F = -dU/dx.');
        stepByStepSolution.push('3. Calculate initial and final kinetic energies: K = (1/2) m v^2.');
        stepByStepSolution.push('4. Equate external work done against friction/drag to mechanical energy dissipation.');
        examinerTrap = 'Students often forget the negative sign in work done by friction or gravity during upward motion.';
        examTip = 'Always verify whether normal force does work; in circular/curved motion, N is perpendicular to v, so W_N = 0.';
      } else if (qLower.includes('projectile') || qLower.includes('motion') || qLower.includes('velocity')) {
        coreConcept = '2D Kinematics with constant downward acceleration (g = 9.8 m/s^2). Horizontal motion is unaccelerated.';
        keyFormula = 'R = (u^2 \\sin(2\\theta)) / g, \\quad H = (u^2 \\sin^2(\\theta)) / (2g), \\quad T = (2u \\sin\\theta) / g';
        stepByStepSolution.push('1. Resolve the initial launch velocity vector into orthogonal components: u_x = u\\cos\\theta and u_y = u\\sin\\theta.');
        stepByStepSolution.push('2. Note that horizontal acceleration a_x = 0, giving constant horizontal speed: v_x = u_x.');
        stepByStepSolution.push('3. Apply 1D vertical kinematic equation: v_y = u_y - gt and y = u_y t - (1/2) g t^2.');
        stepByStepSolution.push('4. At highest point, vertical speed v_y = 0, yielding time to apex t_top = u\\sin\\theta / g.');
        examinerTrap = 'Do not assume acceleration is zero at maximum height; gravity g still acts vertically downwards!';
        examTip = 'Complimentary launch angles (\\theta and 90° - \\theta) yield identical horizontal ranges (R_1 = R_2).';
      } else {
        coreConcept = `Governing physics principles of ${chapter}.`;
        keyFormula = 'F = ma, \\quad \\Sigma F_{ext} = dp/dt';
        stepByStepSolution.push('1. Draw a clean Free Body Diagram (FBD) marking all field and contact forces.');
        stepByStepSolution.push('2. Choose a Cartesian reference frame aligned with the direction of acceleration.');
        stepByStepSolution.push('3. Apply Newton\'s Second Law along both orthogonal axes: \\Sigma F_x = m a_x, \\Sigma F_y = m a_y.');
        stepByStepSolution.push('4. Solve the simultaneous equations for the unknown variable.');
      }
    } else if (subject === 'Chemistry') {
      if (qLower.includes('gibbs') || qLower.includes('thermodynamics') || qLower.includes('entropy')) {
        coreConcept = 'Gibbs Free Energy Criterion for Spontaneity at constant Temperature and Pressure.';
        keyFormula = '\\Delta G = \\Delta H - T \\Delta S \\quad (\\Delta G < 0 \\implies \\text{Spontaneous})';
        stepByStepSolution.push('1. Determine enthalpy change \\Delta H (exothermic < 0, endothermic > 0).');
        stepByStepSolution.push('2. Determine entropy change \\Delta S (increase in disorder > 0, e.g. gas moles increase).');
        stepByStepSolution.push('3. Substitute into Gibbs-Helmholtz relation: \\Delta G = \\Delta H - T \\Delta S.');
        stepByStepSolution.push('4. At equilibrium, \\Delta G = 0, which defines the transition temperature: T_{eq} = \\Delta H / \\Delta S.');
        examinerTrap = 'Units mismatch! \\Delta H is typically given in kJ/mol while \\Delta S is in J/K\\cdot mol. Convert \\Delta H \\times 10^3!';
        examTip = 'If \\Delta H < 0 and \\Delta S > 0, the reaction is spontaneous at ALL temperatures.';
      } else {
        coreConcept = `Chemical equilibrium and stoichiometry in ${chapter}.`;
        keyFormula = 'K_c = [C]^c [D]^d / ([A]^a [B]^b), \\quad \\Delta G^\\circ = -RT \\ln(K)';
        stepByStepSolution.push('1. Write the balanced chemical reaction equation with correct physical state symbols.');
        stepByStepSolution.push('2. Construct an Initial-Change-Equilibrium (ICE) mole table.');
        stepByStepSolution.push('3. Express equilibrium concentrations in terms of extent of reaction x.');
        stepByStepSolution.push('4. Substitute into the equilibrium constant expression and solve for x.');
      }
    } else if (subject === 'Biology') {
      if (qLower.includes('binomial') || qLower.includes('linnaeus') || qLower.includes('nomenclature')) {
        coreConcept = 'Binomial Nomenclature established by Carolus Linnaeus, governed by ICBN and ICZN standards.';
        keyFormula = 'Format: \\textit{Genus} \\ \\textit{specific\\_epithet} \\ \\text{Author Citation}';
        stepByStepSolution.push('1. First word represents Genus and starts with a Capital letter (e.g. \\textit{Mangifera}).');
        stepByStepSolution.push('2. Second word represents the Specific Epithet and starts with a small letter (e.g. \\textit{indica}).');
        stepByStepSolution.push('3. Biological names are Latin or Latinised, and printed in italics or underlined when handwritten.');
        stepByStepSolution.push('4. The author\'s name appears abbreviated at the end without italics: \\textit{Mangifera indica} Linn.');
        examinerTrap = 'Handwritten names must be separately underlined, not underlined continuously as a single line!';
        examTip = 'Tautonyms (identical genus and species names, e.g. \\textit{Naja naja}) are valid in zoological nomenclature (ICZN) but strictly invalid in botanical nomenclature (ICBN).';
      } else if (qLower.includes('hierarchy') || qLower.includes('taxonomy') || qLower.includes('species')) {
        coreConcept = '7 Obligate Taxonomical Hierarchy Ranks from broadest to most specific unit.';
        keyFormula = 'Kingdom \\rightarrow Phylum/Division \\rightarrow Class \\rightarrow Order \\rightarrow Family \\rightarrow Genus \\rightarrow Species';
        stepByStepSolution.push('1. Species is the basic, fundamental unit of classification capable of interbreeding.');
        stepByStepSolution.push('2. As we go ascending from Species to Kingdom, the number of shared common characteristics decreases.');
        stepByStepSolution.push('3. Higher categories have greater complexity in determining evolutionary relationships.');
        stepByStepSolution.push('4. Standard suffixes: -aceae for plant families (e.g. Solanaceae), -ales for plant orders (e.g. Polymoniales).');
        examinerTrap = 'Remember: Division is used for plants, while Phylum is used for animals.';
        examTip = 'General similarity increases descending down the hierarchy (Highest shared traits in Species).';
      } else {
        coreConcept = `Core biological principles of ${chapter} (NCERT Standard).`;
        keyFormula = 'NCERT Standard Concept: ' + chapter;
        stepByStepSolution.push('1. Understand the structural definition and cellular basis.');
        stepByStepSolution.push('2. Trace the biochemical or anatomical pathways.');
        stepByStepSolution.push('3. Contrast with homologous and analogous adaptations.');
        stepByStepSolution.push('4. Correlate with NCERT board textbook key summary statements.');
      }
    } else {
      coreConcept = `Mathematical theorems and analytical formulations in ${chapter}.`;
      keyFormula = 'f\'(x) = \\lim_{h \\to 0} [f(x+h) - f(x)] / h';
      stepByStepSolution.push('1. Write down given boundary conditions and identify function domain/range.');
      stepByStepSolution.push('2. Apply standard algebraic or calculus transformations.');
      stepByStepSolution.push('3. Simplify intermediate polynomials systematically.');
      stepByStepSolution.push('4. Verify roots against domain constraints to avoid extraneous solutions.');
    }

    return {
      id: `solved-${Date.now()}`,
      question: q,
      subject,
      chapter,
      coreConcept,
      stepByStepSolution,
      keyFormula,
      examinerTrap,
      examTip,
      timestamp: new Date().toISOString()
    };
  }

  public saveDoubtToNotes(solved: SolvedDoubtResponse): boolean {
    const title = `AI Doubt: ${solved.question.substring(0, 45)}...`;
    const content = `### Core Concept\n${solved.coreConcept}\n\n` +
      (solved.keyFormula ? `### Key Formula\n${solved.keyFormula}\n\n` : '') +
      `### Step-by-Step Solution\n${solved.stepByStepSolution.join('\n')}\n\n` +
      `### Examiner Trap / Negative Trap\n${solved.examinerTrap}\n\n` +
      `### Exam Tip\n${solved.examTip}`;

    userService.saveNote({
      title,
      subject: solved.subject,
      chapter: solved.chapter,
      content,
      tags: ['AI Doubt Solver', solved.subject, solved.chapter]
    });
    return true;
  }
}

export const aiDoubtSolver = new AIDoubtSolverService();
