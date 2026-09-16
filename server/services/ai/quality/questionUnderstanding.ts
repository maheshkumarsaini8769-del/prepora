import { EducationalSubject, QuestionIntent, QuestionUnderstanding } from '../aiTypes.js';

export interface ContextMismatchInfo {
  hasMismatch: boolean;
  selectedSubject?: string;
  detectedSubject: EducationalSubject;
  detectedChapter?: string;
  detectedConcept?: string;
  warningMessage?: string;
}

export interface DetailedQuestionUnderstanding extends QuestionUnderstanding {
  contextMismatch?: ContextMismatchInfo;
  extractedKeywords: string[];
  subtopic?: string;
}

// Subject dictionary & classification indicators
const SUBJECT_KEYWORDS: Record<EducationalSubject, { terms: string[]; chapters: Record<string, string[]> }> = {
  Physics: {
    terms: [
      'kinematics', 'velocity', 'acceleration', 'gravity', 'gravitation', 'motion', 'projectile',
      'force', 'friction', 'momentum', 'newton', 'work', 'energy', 'power', 'torque', 'rotation',
      'angular', 'inertia', 'thermodynamics', 'carnot', 'heat engine', 'wave', 'oscillation',
      'pendulum', 'doppler', 'optics', 'refraction', 'reflection', 'lens', 'prism', 'interference',
      'diffraction', 'electrostatics', 'coulomb', 'electric field', 'potential', 'capacitance',
      'current', 'resistor', 'ohm', 'kirchhoff', 'magnetic field', 'lorentz', 'biot-savart',
      'faraday', 'lenz', 'inductance', 'ac circuit', 'semiconductor', 'diode', 'transistor',
      'photoelectric', 'bohr model', 'de broglie', 'nuclear physics', 'radioactivity'
    ],
    chapters: {
      'Kinematics': ['kinematics', 'motion in 1d', 'motion in 2d', 'velocity', 'acceleration', 'displacement', 'projectile', 'equations of motion'],
      'Laws of Motion': ['newton', 'force', 'friction', 'momentum', 'inertia', 'free body diagram'],
      'Gravitation': ['gravity', 'gravitation', 'gravitational force', 'escape velocity', 'orbital speed', 'kepler', 'g = 9.8', 'weight = mg', 'fall toward earth'],
      'Work, Energy & Power': ['work done', 'kinetic energy', 'potential energy', 'conservation of energy', 'power', 'collision'],
      'Current Electricity': ['current', 'resistor', 'resistance', 'ohm\'s law', 'kirchhoff', 'wheatstone', 'potentiometer', 'drift velocity'],
      'Ray Optics': ['refraction', 'reflection', 'lens formula', 'mirror formula', 'focal length', 'prism', 'total internal reflection'],
      'Electrostatics': ['electric field', 'coulomb\'s law', 'electrostatic potential', 'capacitance', 'gauss law']
    }
  },
  Chemistry: {
    terms: [
      'mole', 'molarity', 'molality', 'stoichiometry', 'orbital', 'quantum number', 'hybridization',
      'periodic table', 'electronegativity', 'ionization energy', 'chemical bonding', 'lewis',
      'equilibrium', 'le chatelier', 'ph', 'acid', 'base', 'buffer', 'redox', 'oxidation state',
      'electrochemistry', 'nernst', 'galvanic', 'kinetics', 'activation energy', 'order of reaction',
      'surface chemistry', 'adsorption', 'colloid', 'thermodynamics enthalpy', 'gibbs free energy',
      'organic', 'iupac', 'alkane', 'alkene', 'alkyne', 'haloalkane', 'sn1', 'sn2', 'alcohol',
      'phenol', 'ether', 'aldehyde', 'ketone', 'carboxylic', 'amine', 'biomolecules', 'carbohydrate',
      'amino acid', 'coordination', 'ligand', 'd-block', 'f-block', 'p-block'
    ],
    chapters: {
      'Some Basic Concepts of Chemistry': ['mole concept', 'molarity', 'molality', 'empirical formula', 'stoichiometry'],
      'Chemical Bonding': ['hybridization', 'vsepr', 'lewis structure', 'dipole moment', 'hydrogen bond', 'molecular orbital'],
      'Thermodynamics': ['enthalpy', 'entropy', 'gibbs free energy', 'hess law', 'first law of thermodynamics'],
      'Equilibrium': ['chemical equilibrium', 'le chatelier', 'kc', 'kp', 'ionic equilibrium', 'ph calculation', 'solubility product'],
      'Organic Chemistry Basics': ['iupac naming', 'inductive effect', 'resonance', 'hyperconjugation', 'carbocation', 'isomerism'],
      'Aldehydes, Ketones & Carboxylic Acids': ['nucleophilic addition', 'aldol condensation', 'cannizzaro', 'carboxylic acid']
    }
  },
  Mathematics: {
    terms: [
      'derivative', 'integral', 'differentiation', 'integration', 'limit', 'continuity', 'calculus',
      'function', 'domain', 'range', 'matrix', 'matrices', 'determinant', 'vector', 'dot product',
      'cross product', 'probability', 'bayes', 'permutation', 'combination', 'quadratic equation',
      'complex number', 'binomial theorem', 'sequence', 'series', 'ap', 'gp', 'hp', 'trigonometry',
      'sin', 'cos', 'tan', 'coordinate geometry', 'straight line', 'circle', 'parabola', 'ellipse',
      'hyperbola', 'solve', 'equation', 'roots', 'differential equation'
    ],
    chapters: {
      'Algebra': ['solve equation', 'quadratic', 'roots', '2x +', '3x +', 'polynomial', 'matrices', 'determinants'],
      'Calculus': ['derivative', 'd/dx', 'integral', 'integration', 'dy/dx', 'limit as x approaches', 'maxima', 'minima'],
      'Coordinate Geometry': ['straight line', 'slope', 'circle equation', 'parabola', 'ellipse', 'hyperbola'],
      'Trigonometry': ['sin(x)', 'cos(x)', 'tan(x)', 'trigonometric identity'],
      'Probability': ['probability of event', 'bayes theorem', 'independent events', 'coin toss', 'dice']
    }
  },
  Biology: {
    terms: [
      'photosynthesis', 'chloroplast', 'chlorophyll', 'light reaction', 'calvin cycle', 'respiration',
      'krebs cycle', 'glycolysis', 'mitochondria', 'cell division', 'mitosis', 'meiosis', 'dna',
      'rna', 'replication', 'transcription', 'translation', 'genetics', 'mendel', 'inheritance',
      'allele', 'mutation', 'evolution', 'darwin', 'ecology', 'ecosystem', 'biodiversity', 'human physiology',
      'digestion', 'circulation', 'heart', 'nephron', 'kidney', 'neuron', 'nervous system', 'endocrine',
      'hormone', 'plant physiology', 'xylem', 'phloem', 'transpiration', 'reproduction', 'botany', 'zoology'
    ],
    chapters: {
      'Photosynthesis in Higher Plants': ['photosynthesis', 'calvin cycle', 'light reaction', 'chlorophyll', 'rubisco', 'c3 pathway', 'c4 pathway'],
      'Cell: The Unit of Life': ['prokaryotic', 'eukaryotic', 'cell wall', 'membrane', 'mitochondria', 'ribosome', 'endoplasmic reticulum'],
      'Genetics & Evolution': ['mendel laws', 'punnett square', 'monohybrid', 'dihybrid', 'chromosome', 'dna structure', 'natural selection'],
      'Human Physiology': ['cardiac cycle', 'nephron function', 'action potential', 'synapse', 'digestive enzymes', 'endocrine glands']
    }
  },
  General: {
    terms: [],
    chapters: {}
  }
};

/**
 * Accurately analyzes student question to identify Intent, Subject, Concept, Numerical nature,
 * and detects context mismatches if selected dropdown disagrees with true subject.
 */
export function analyzeQuestionUnderstanding(
  questionText: string,
  selectedSubject?: string,
  selectedChapter?: string
): DetailedQuestionUnderstanding {
  const cleanQ = questionText.trim();
  const lowerQ = cleanQ.toLowerCase();

  // 1. Detect Intent
  let intent: QuestionIntent = 'explanation';
  if (/^(what is|define|definition of|meaning of|state\s)/i.test(cleanQ)) {
    intent = 'definition';
  } else if (/^(derive|derivation of|show that|prove that)/i.test(cleanQ)) {
    intent = 'derivation';
  } else if (/^(solve|calculate|find\s+(the)?\s+(value|magnitude|speed|force|energy|acceleration)|how much|how many)/i.test(cleanQ) || /[0-9]+\s*[=+\-*/]/.test(cleanQ)) {
    intent = 'calculation';
  } else if (/\b(differentiate between|difference between|compare|vs|versus)\b/i.test(lowerQ)) {
    intent = 'comparison';
  } else if (/\b(hint|clue|how to start|stuck)\b/i.test(lowerQ)) {
    intent = 'hint_request';
  } else if (/^(why is option|why option|why not option)/i.test(cleanQ)) {
    intent = 'explanation';
  }

  // 2. Numerical Detection
  const hasNumbers = /\b[0-9]+(\.[0-9]+)?\b/.test(lowerQ);
  const hasMathSymbols = /[=+\-*/^√∫∑]/.test(cleanQ);
  const hasUnits = /\b(m\/s|m\/s²|kg|n|j|w|pa|kpa|mol|atm|cm|mm|km|sec|min|hr|hz|v|a|ohm)\b/i.test(cleanQ);
  const isNumerical = intent === 'calculation' || (hasNumbers && (hasMathSymbols || hasUnits));

  // 3. Subject Detection Scoring
  const scores: Record<EducationalSubject, number> = {
    Physics: 0,
    Chemistry: 0,
    Mathematics: 0,
    Biology: 0,
    General: 0
  };

  // Specific high-priority keyword overrides
  if (/\b(kinematics|projectile|gravity|gravitation|newton'?s laws|momentum|friction|electric field|magnetic field|refraction|lens)\b/i.test(lowerQ)) {
    scores.Physics += 10;
  }
  if (/\b(photosynthesis|mitosis|meiosis|chloroplast|nephron|dna|rna|krebs|glycolysis)\b/i.test(lowerQ)) {
    scores.Biology += 10;
  }
  if (/\b(mole concept|molarity|stoichiometry|hybridization|iupac|aldol|sn1|sn2)\b/i.test(lowerQ)) {
    scores.Chemistry += 10;
  }
  if (/\b(solve 2x|derivative of|integral of|dy\/dx|limit as x|matrices|quadratic)\b/i.test(lowerQ) || /^[0-9x+\-*/=()^ ]+$/.test(cleanQ)) {
    scores.Mathematics += 10;
  }

  // General dictionary scan
  for (const [subj, data] of Object.entries(SUBJECT_KEYWORDS) as [EducationalSubject, any][]) {
    if (subj === 'General') continue;
    for (const term of data.terms) {
      if (lowerQ.includes(term)) {
        scores[subj] += 2;
      }
    }
  }

  let detectedSubject: EducationalSubject = 'General';
  let maxScore = 0;
  for (const [subj, score] of Object.entries(scores) as [EducationalSubject, number][]) {
    if (score > maxScore) {
      maxScore = score;
      detectedSubject = subj;
    }
  }

  // If ambiguous but selected subject matches one of the candidates with positive score, trust user
  if (maxScore < 4 && selectedSubject && ['Physics', 'Chemistry', 'Mathematics', 'Biology'].includes(selectedSubject)) {
    detectedSubject = selectedSubject as EducationalSubject;
  } else if (maxScore === 0) {
    // Default to selected if valid, otherwise Physics
    detectedSubject = (selectedSubject as EducationalSubject) || 'Physics';
  }

  // 4. Chapter and Concept Mapping
  let detectedChapter: string | undefined = selectedChapter;
  let detectedConcept: string | undefined = undefined;

  const subjectData = SUBJECT_KEYWORDS[detectedSubject];
  if (subjectData && subjectData.chapters) {
    for (const [chapName, triggers] of Object.entries(subjectData.chapters)) {
      if (triggers.some(t => lowerQ.includes(t))) {
        detectedChapter = chapName;
        detectedConcept = triggers.find(t => lowerQ.includes(t));
        break;
      }
    }
  }

  if (!detectedConcept) {
    if (intent === 'definition') {
      const match = cleanQ.match(/^(?:what is|define|meaning of)\s+([a-zA-Z0-9\s]+?)(?:\?|$|\.|\s+in\s+)/i);
      detectedConcept = match ? match[1].trim() : cleanQ.slice(0, 30);
    } else {
      detectedConcept = detectedChapter || detectedSubject;
    }
  }

  // 5. Context Mismatch Detection (Section 3 of spec: Selected Chemistry, asked "What is kinematics?")
  let contextMismatch: ContextMismatchInfo | undefined = undefined;
  if (selectedSubject && selectedSubject !== 'General') {
    const normSelected = selectedSubject.toLowerCase().trim();
    const normDetected = detectedSubject.toLowerCase().trim();

    if (normSelected !== normDetected && maxScore >= 4) {
      contextMismatch = {
        hasMismatch: true,
        selectedSubject,
        detectedSubject,
        detectedChapter,
        detectedConcept,
        warningMessage: `Subject Context Mismatch: You selected "${selectedSubject}", but this question belongs to "${detectedSubject}" (${detectedChapter || detectedConcept}). The solution is accurately solved under ${detectedSubject}.`
      };
    }
  }

  return {
    intent,
    subject: detectedSubject,
    chapter: detectedChapter,
    topic: detectedConcept,
    concept: detectedConcept,
    isNumerical,
    requiresCurrentInfo: false,
    contextMismatch,
    extractedKeywords: lowerQ.split(/\s+/).filter(w => w.length > 3)
  };
}
