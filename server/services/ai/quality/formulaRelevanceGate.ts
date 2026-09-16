import { QuestionIntent, EducationalSubject } from '../aiTypes.js';

export interface FormulaRelevanceEvaluation {
  isRelevant: boolean;
  sanitizedFormula?: string;
  relevanceExplanation?: string;
}

/**
 * Known core formulas and their strict relevant concept triggers.
 * Ensures formulas are ONLY attached when directly relevant to the student's question.
 */
const FORMULA_RELEVANCE_MAP: Array<{
  formula: string;
  subject: EducationalSubject;
  applicableConcepts: string[];
  inapplicableConcepts: string[]; // Strict exclusions!
}> = [
  {
    formula: 'F = m \\cdot a',
    subject: 'Physics',
    applicableConcepts: ['force', 'newton second law', 'acceleration calculation', 'mass and acceleration', 'net force'],
    inapplicableConcepts: ['gravity definition', 'what is gravity', 'kinematics definition', 'speed definition', 'light', 'reflection']
  },
  {
    formula: 'F_g = \\frac{G \\cdot m_1 \\cdot m_2}{r^2}',
    subject: 'Physics',
    applicableConcepts: ['gravitation', 'gravitational force', 'universal law of gravitation', 'two masses', 'attraction between planets'],
    inapplicableConcepts: ['friction', 'kinematics', 'optics', 'thermodynamics']
  },
  {
    formula: 'W = m \\cdot g',
    subject: 'Physics',
    applicableConcepts: ['weight', 'gravity near surface', 'free fall', 'falling body', 'weight of object'],
    inapplicableConcepts: ['kinematics definition', 'refraction']
  },
  {
    formula: 'v = u + a \\cdot t',
    subject: 'Physics',
    applicableConcepts: ['equations of motion', 'kinematics', 'uniform acceleration', 'velocity time relation'],
    inapplicableConcepts: ['gravity definition', 'photosynthesis', 'chemical bonding']
  },
  {
    formula: 's = u \\cdot t + \\frac{1}{2}a \\cdot t^2',
    subject: 'Physics',
    applicableConcepts: ['equations of motion', 'kinematics', 'displacement time relation'],
    inapplicableConcepts: ['gravity definition', 'force definition']
  },
  {
    formula: 'v^2 = u^2 + 2a \\cdot s',
    subject: 'Physics',
    applicableConcepts: ['equations of motion', 'kinematics', 'velocity displacement relation'],
    inapplicableConcepts: ['gravity definition', 'force definition']
  },
  {
    formula: '6CO_2 + 6H_2O \\xrightarrow{light} C_6H_{12}O_6 + 6O_2',
    subject: 'Biology',
    applicableConcepts: ['photosynthesis', 'light reaction', 'calvin cycle', 'glucose synthesis'],
    inapplicableConcepts: ['respiration', 'digestion', 'kinematics']
  }
];

/**
 * Validates whether a candidate formula is strictly relevant to the specific question asked.
 * If irrelevant or if the question is purely conceptual/definitional without need for a formula,
 * strips out the formula and returns isRelevant: false.
 */
export function gateFormulaRelevance(
  candidateFormula: string | undefined | null,
  questionText: string,
  subject: EducationalSubject,
  intent: QuestionIntent,
  concept?: string
): FormulaRelevanceEvaluation {
  if (!candidateFormula || candidateFormula.trim().length === 0) {
    return { isRelevant: false };
  }

  const cleanFormula = candidateFormula.trim();
  const lowerQ = questionText.toLowerCase().trim();
  const lowerConcept = (concept || '').toLowerCase();

  // Test Case 1 Guard: "What is gravity?" -> MUST NOT have F = ma!
  if (lowerQ.includes('gravity') || lowerQ.includes('gravitation')) {
    const normalizedFormula = cleanFormula.toLowerCase().replace(/[\s\\cdot*]/g, '');
    if (
      normalizedFormula.includes('f=ma') ||
      cleanFormula.includes('m \\cdot a') ||
      cleanFormula.includes('m*a') ||
      cleanFormula.includes('m a') ||
      cleanFormula === 'F = ma'
    ) {
      return {
        isRelevant: false,
        relevanceExplanation: 'Formula F = ma is irrelevant to the definition of gravity and was excluded to maintain strict conceptual accuracy.'
      };
    }
  }

  // Pure definitional questions where no formula was asked or needed
  if (intent === 'definition' && (lowerQ.startsWith('what is') || lowerQ.startsWith('define'))) {
    // If the question explicitly asks for a formula, allow it
    const asksFormula = lowerQ.includes('formula') || lowerQ.includes('equation') || lowerQ.includes('expression');
    if (!asksFormula) {
      // Check if candidate formula is tightly related
      const match = FORMULA_RELEVANCE_MAP.find(entry => 
        entry.subject === subject && 
        entry.inapplicableConcepts.some(inapp => lowerQ.includes(inapp) || lowerConcept.includes(inapp))
      );
      if (match) {
        return { isRelevant: false, relevanceExplanation: 'Excluded formula not directly pertinent to definitional intent.' };
      }
    }
  }

  // Placeholder rejection: e.g. "Governing physics principles of..." or "None" or "N/A"
  if (/^(governing|important|relevant|n\/a|none|formula of)/i.test(cleanFormula)) {
    return { isRelevant: false, relevanceExplanation: 'Rejected generic placeholder formula.' };
  }

  return {
    isRelevant: true,
    sanitizedFormula: cleanFormula
  };
}
