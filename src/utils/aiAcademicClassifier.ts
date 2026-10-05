import { SubjectName, ExamType } from '../types';

export interface AcademicClassificationResult {
  detectedSubject: SubjectName;
  detectedChapter: string;
  isBlockedByExamPolicy?: boolean;
  blockedPolicyMessage?: string;
  autoSubjectConverted?: boolean;
  originalSubject?: SubjectName;
}

const BIOLOGY_KEYWORDS = [
  'photosynthesis', 'chlorophyll', 'mitochondria', 'dna', 'rna', 'ribosome', 'genetics',
  'mendel', 'chromosome', 'zoology', 'botany', 'nephron', 'heart', 'circulation', 'digestion',
  'respiration in plants', 'enzyme', 'algae', 'fungi', 'bacteria', 'cell division', 'mitosis',
  'meiosis', 'plant kingdom', 'animal kingdom', 'living world', 'bryophyte', 'pteridophyte',
  'gymnosperm', 'angiosperm', 'xylem', 'phloem', 'endocrine', 'hormone', 'pituitary', 'kidney',
  'hemoglobin', 'rbc', 'wbc', 'antigen', 'antibody', 'ecosystem', 'biodiversity', 'gamete',
  'embryo', 'ovary', 'testis', 'pollination', 'fertilization'
];

const CHEMISTRY_KEYWORDS = [
  'mole', 'molarity', 'molality', 'stoichiometry', 'periodic table', 'atomic number',
  'orbital', 'hybridization', 'vsepr', 'chemical bond', 'ionic bond', 'covalent',
  'enthalpy', 'entropy', 'gibbs', 'equilibrium', 'ph value', 'buffer solution', 'solubility product',
  'redox', 'oxidation state', 'reduction', 'nernst', 'galvanic', 'faraday', 'rate of reaction',
  'arrhenius', 'catalyst', 'coordination compound', 'ligand', 'iupac', 'isomerism',
  'benzene', 'hydrocarbon', 'alkane', 'alkene', 'alkyne', 'alcohol', 'phenol', 'ether',
  'aldehyde', 'ketone', 'carboxylic acid', 'amine', 'diazonium', 'biomolecule', 'polymer'
];

const PHYSICS_KEYWORDS = [
  'velocity', 'acceleration', 'speed', 'projectile', 'kinematics', 'displacement',
  'newton', 'friction', 'tension', 'pulley', 'work', 'energy', 'power', 'conservation of momentum',
  'torque', 'moment of inertia', 'angular momentum', 'rotational', 'gravitation', 'gravity',
  'escape velocity', 'kepler', 'orbital speed', 'carnot', 'heat capacity', 'thermodynamic cycle',
  'coulomb', 'electric field', 'capacitance', 'capacitor', 'gauss law', 'current electricity',
  'resistance', 'resistor', 'ohm', 'kirchhoff', 'potentiometer', 'wheatstone',
  'magnetic field', 'lorentz force', 'biot savart', 'cyclotron', 'solenoid', 'faraday law',
  'lenz law', 'alternating current', 'inductance', 'optics', 'reflection', 'refraction',
  'focal length', 'lens', 'mirror', 'interference', 'diffraction', 'polarization',
  'photoelectric', 'work function', 'de broglie', 'bohr radius', 'semiconductor', 'diode', 'transistor'
];

const MATHEMATICS_KEYWORDS = [
  'derivative', 'differentiation', 'integral', 'integration', 'matrix', 'matrices',
  'determinant', 'calculus', 'quadratic', 'complex number', 'iota', 'argand',
  'arithmetic progression', 'geometric progression', 'sequence', 'series',
  'permutation', 'combination', 'binomial theorem', 'expansion',
  'limits', 'continuity', 'differentiability', 'maxima', 'minima',
  'straight line', 'slope', 'circle', 'parabola', 'ellipse', 'hyperbola', 'conic section',
  'vector', 'cross product', 'dot product', '3d geometry', 'direction cosine',
  'probability', 'bayes theorem', 'binomial distribution', 'trigonometry', 'sin', 'cos', 'tan'
];

// Comprehensive chapter taxonomy mapping
const CHAPTER_TAXONOMY: { [key in SubjectName]: { chapter: string; keywords: string[] }[] } = {
  Physics: [
    { chapter: 'Kinematics', keywords: ['velocity', 'acceleration', 'speed', 'displacement', 'projectile', 'free fall', 'relative velocity', 'motion in a straight line', '1d motion', '2d motion'] },
    { chapter: 'Laws of Motion', keywords: ['friction', 'tension', 'pulley', 'newton law', 'normal reaction', 'momentum', 'impulse', 'pseudo force'] },
    { chapter: 'Work, Energy and Power', keywords: ['work energy theorem', 'kinetic energy', 'potential energy', 'conservative force', 'power', 'collision', 'spring'] },
    { chapter: 'Rotational Motion', keywords: ['moment of inertia', 'torque', 'angular velocity', 'angular momentum', 'rolling motion', 'radius of gyration', 'centre of mass'] },
    { chapter: 'Gravitation', keywords: ['gravitational', 'escape velocity', 'kepler', 'orbital velocity', 'satellite', 'gravitation', 'gravity'] },
    { chapter: 'Thermodynamics', keywords: ['carnot', 'isothermal', 'adiabatic', 'isochoric', 'isobaric', 'heat engine', 'entropy', 'first law of thermodynamics'] },
    { chapter: 'Electrostatics', keywords: ['coulomb', 'electric field', 'electric flux', 'gauss law', 'dipole', 'potential difference', 'capacitance', 'capacitor'] },
    { chapter: 'Current Electricity', keywords: ['ohm law', 'resistor', 'resistance', 'kirchhoff', 'potentiometer', 'meter bridge', 'drift velocity', 'current'] },
    { chapter: 'Magnetic Effects of Current', keywords: ['magnetic field', 'biot savart', 'ampere circuital', 'lorentz force', 'solenoid', 'galvanometer', 'cyclotron'] },
    { chapter: 'Electromagnetic Induction & AC', keywords: ['faraday', 'lenz law', 'self induction', 'mutual induction', 'alternating current', 'lcr circuit', 'resonance', 'transformer'] },
    { chapter: 'Ray & Wave Optics', keywords: ['reflection', 'refraction', 'snell law', 'lens maker', 'prism', 'interference', 'diffraction', 'young double slit', 'fringe width'] },
    { chapter: 'Modern Physics', keywords: ['photoelectric effect', 'work function', 'de broglie', 'bohr model', 'hydrogen spectrum', 'half life', 'nuclear fission', 'mass defect'] },
    { chapter: 'Semiconductor Electronics', keywords: ['p-n junction', 'diode', 'zener diode', 'rectifier', 'logic gate', 'transistor', 'semiconductor'] }
  ],
  Chemistry: [
    { chapter: 'Some Basic Concepts (Mole Concept)', keywords: ['mole', 'molarity', 'molality', 'empirical formula', 'stoichiometry', 'limiting reagent', 'equivalent weight'] },
    { chapter: 'Structure of Atom', keywords: ['bohr radius', 'de broglie wavelength', 'quantum numbers', 'pauli exclusion', 'hund rule', 'aufbau', 'electronic configuration'] },
    { chapter: 'Chemical Bonding & Molecular Structure', keywords: ['hybridization', 'vsepr', 'lewis structure', 'dipole moment', 'molecular orbital', 'bond order', 'hydrogen bonding'] },
    { chapter: 'Chemical Thermodynamics', keywords: ['enthalpy', 'entropy', 'gibbs free energy', 'spontaneity', 'hess law', 'heat capacity', 'internal energy'] },
    { chapter: 'Equilibrium (Chemical & Ionic)', keywords: ['equilibrium constant', 'le chatelier', 'ph value', 'buffer', 'solubility product', 'ksp', 'acid base', 'ka kb'] },
    { chapter: 'Redox Reactions & Electrochemistry', keywords: ['oxidation state', 'balancing redox', 'nernst equation', 'emf of cell', 'faraday law', 'conductivity', 'kohlrausch'] },
    { chapter: 'Chemical Kinetics', keywords: ['rate law', 'order of reaction', 'half life', 'arrhenius equation', 'activation energy', 'pseudo first order'] },
    { chapter: 'Coordination Compounds', keywords: ['ligand', 'crystal field theory', 'cft', 'coordination number', 'chelate', 'werner theory', 'iupac naming of complex'] },
    { chapter: 'Hydrocarbons & Basic Organic', keywords: ['alkane', 'alkene', 'alkyne', 'markovnikov', 'ozonolysis', 'inductive effect', 'resonance effect', 'hyperconjugation'] },
    { chapter: 'Haloalkanes & Haloarenes', keywords: ['sn1', 'sn2', 'grignard', 'elimination reaction', 'optical isomerism', 'chirality', 'enantiomer'] },
    { chapter: 'Alcohols, Phenols and Ethers', keywords: ['lucas test', 'kolbe reaction', 'reimer tiemann', 'williamson synthesis', 'acidic nature of phenol'] },
    { chapter: 'Aldehydes, Ketones & Carboxylic Acids', keywords: ['aldol condensation', 'cannizzaro', 'clemmensen', 'wolf kishner', 'tollens reagent', 'fehling test'] },
    { chapter: 'Amines & Biomolecules', keywords: ['carbylamine', 'hoffmann bromamide', 'diazonium salt', 'amino acid', 'peptide bond', 'dna rna', 'carbohydrate'] }
  ],
  Mathematics: [
    { chapter: 'Quadratic Equations & Complex Numbers', keywords: ['roots of quadratic', 'discriminant', 'nature of roots', 'complex number', 'modulus', 'argument', 'cube root of unity'] },
    { chapter: 'Matrices & Determinants', keywords: ['matrix multiplication', 'determinant', 'inverse of matrix', 'adjoint', 'cramer rule', 'rank of matrix'] },
    { chapter: 'Sequences & Series', keywords: ['arithmetic progression', 'geometric progression', 'ap gp', 'sum of infinite gp', 'harmonic progression', 'am gm inequality'] },
    { chapter: 'Permutations & Combinations', keywords: ['permutation', 'combination', 'npr', 'ncr', 'derangement', 'arrangements', 'selection'] },
    { chapter: 'Binomial Theorem', keywords: ['binomial expansion', 'general term', 'middle term', 'binomial coefficient', 'independent term'] },
    { chapter: 'Limits, Continuity & Differentiability', keywords: ['limits', 'l hopital', 'continuity', 'differentiability', 'chain rule', 'differentiation'] },
    { chapter: 'Applications of Derivatives', keywords: ['tangent and normal', 'maxima and minima', 'increasing decreasing', 'rate of change', 'rolle theorem'] },
    { chapter: 'Indefinite & Definite Integration', keywords: ['integration by parts', 'definite integral', 'properties of definite integrals', 'leibnitz rule', 'area under curve'] },
    { chapter: 'Differential Equations', keywords: ['order and degree', 'variable separable', 'linear differential equation', 'integrating factor', 'homogeneous differential equation'] },
    { chapter: 'Coordinate Geometry (Conics)', keywords: ['straight line', 'slope intercept', 'circle equation', 'parabola', 'ellipse', 'hyperbola', 'eccentricity', 'tangent to conic'] },
    { chapter: 'Vectors & 3D Geometry', keywords: ['dot product', 'scalar product', 'cross product', 'vector triple product', 'direction cosines', 'plane equation', 'shortest distance between lines'] },
    { chapter: 'Probability', keywords: ['conditional probability', 'bayes theorem', 'independent events', 'probability distribution', 'variance', 'coin toss'] },
    { chapter: 'Trigonometry', keywords: ['trigonometric identities', 'general solution', 'inverse trigonometric', 'height and distance', 'sine rule'] }
  ],
  Biology: [
    { chapter: 'The Living World & Taxonomy', keywords: ['taxonomy', 'binomial nomenclature', 'herbarium', 'taxonomical aids', 'systematics'] },
    { chapter: 'Plant Kingdom & Animal Kingdom', keywords: ['algae', 'bryophytes', 'pteridophytes', 'gymnosperms', 'porifera', 'chordata', 'non chordata', 'coelom'] },
    { chapter: 'Cell: The Unit of Life & Cell Cycle', keywords: ['mitochondria', 'chloroplast', 'ribosome', 'endoplasmic reticulum', 'mitosis', 'meiosis', 'prophase', 'cell membrane'] },
    { chapter: 'Plant Physiology', keywords: ['photosynthesis', 'calvin cycle', 'c3 c4 plants', 'glycolysis', 'krebs cycle', 'transpiration', 'auxin', 'gibberellin'] },
    { chapter: 'Human Physiology', keywords: ['digestion', 'nephron', 'loop of henle', 'cardiac cycle', 'ecg', 'blood groups', 'synapse', 'action potential', 'hormones'] },
    { chapter: 'Genetics & Evolution', keywords: ['mendel laws', 'monohybrid', 'dihybrid', 'dna replication', 'transcription', 'translation', 'lac operon', 'darwin', 'hardy weinberg'] },
    { chapter: 'Biotechnology & Ecology', keywords: ['restriction enzyme', 'plasmid', 'pcr', 'recombinant dna', 'food chain', 'ecosystem', 'trophic level', 'biodiversity conservation'] }
  ]
};

export function classifyAcademicQuery(
  query: string,
  userSelectedSubject: SubjectName,
  targetExam?: ExamType | string
): AcademicClassificationResult {
  const q = query.toLowerCase().trim();
  const examNorm = (targetExam || 'JEE').toString().toUpperCase().trim();

  // 1. Strict Exam Syllabus Boundary Check
  const isJeeExam = examNorm.includes('JEE');
  const isNeetExam = examNorm.includes('NEET');

  // Check if JEE student attempts to ask a Biology question
  if (isJeeExam) {
    const matchedBioTerm = BIOLOGY_KEYWORDS.find(term => q.includes(term));
    if (matchedBioTerm) {
      return {
        detectedSubject: 'Biology',
        detectedChapter: 'Biology (Not in JEE)',
        isBlockedByExamPolicy: true,
        blockedPolicyMessage: `Aapka target exam JEE hai. PREPORA ke strict syllabus boundaries ke mutabik JEE me Biology nahi aati! Kripya apne goal (JEE) par focus karein aur Physics, Chemistry, ya Mathematics ka question poochein.`
      };
    }
  }

  // Check if NEET student attempts to ask a pure Math question
  if (isNeetExam) {
    const matchedMathTerm = MATHEMATICS_KEYWORDS.find(term => q.includes(term) && !q.includes('calculate') && !q.includes('units'));
    if (matchedMathTerm) {
      return {
        detectedSubject: 'Mathematics',
        detectedChapter: 'Mathematics (Not in NEET)',
        isBlockedByExamPolicy: true,
        blockedPolicyMessage: `Aapka target exam NEET hai. NEET examination me Mathematics nahi aati! Kripya Biology, Chemistry, ya Physics par focus karein.`
      };
    }
  }

  // 2. Cross-subject Detection & Automatic Routing
  let bestSubject: SubjectName = userSelectedSubject;
  let highestSubjectScore = 0;

  const subjectScores: Record<SubjectName, number> = {
    Physics: 0,
    Chemistry: 0,
    Mathematics: 0,
    Biology: 0
  };

  PHYSICS_KEYWORDS.forEach(k => {
    if (q.includes(k)) subjectScores.Physics += 2;
  });
  CHEMISTRY_KEYWORDS.forEach(k => {
    if (q.includes(k)) subjectScores.Chemistry += 2;
  });
  MATHEMATICS_KEYWORDS.forEach(k => {
    if (q.includes(k)) subjectScores.Mathematics += 2;
  });
  BIOLOGY_KEYWORDS.forEach(k => {
    if (q.includes(k)) subjectScores.Biology += 2;
  });

  // Bias slightly toward user's currently selected subject
  subjectScores[userSelectedSubject] += 1;

  // Filter out disallowed subjects for this exam
  if (isJeeExam) subjectScores.Biology = -100;
  if (isNeetExam) subjectScores.Mathematics = -100;

  (Object.keys(subjectScores) as SubjectName[]).forEach(subj => {
    if (subjectScores[subj] > highestSubjectScore) {
      highestSubjectScore = subjectScores[subj];
      bestSubject = subj;
    }
  });

  const autoConverted = bestSubject !== userSelectedSubject && highestSubjectScore >= 2;

  // 3. Chapter Auto-Detection
  let detectedChapter = bestSubject === 'Physics' ? 'Kinematics' : bestSubject === 'Chemistry' ? 'Chemical Bonding' : bestSubject === 'Mathematics' ? 'Calculus' : 'Cell: The Unit of Life';
  let highestChapterScore = 0;

  const chaptersForSubj = CHAPTER_TAXONOMY[bestSubject] || [];
  chaptersForSubj.forEach(ch => {
    let score = 0;
    ch.keywords.forEach(kw => {
      if (q.includes(kw)) score += 3;
    });
    if (score > highestChapterScore) {
      highestChapterScore = score;
      detectedChapter = ch.chapter;
    }
  });

  return {
    detectedSubject: bestSubject,
    detectedChapter,
    autoSubjectConverted: autoConverted,
    originalSubject: userSelectedSubject
  };
}
