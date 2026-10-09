import { Question, ExamType, ClassLevel, SubjectName, DifficultyLevel, ContentType } from '../types';
import { mockQuestions } from '../data/mockQuestions';
import { canonicalSyllabus } from '../data/canonicalSyllabusData';
import { comprehensiveFormulaNotes } from '../data/comprehensiveFormulaNotes';
import { getStorageItem, setStorageItem, StorageKeys } from '../utils/storage';
import { apiRequest } from './apiClient';
import { sortChapterNamesCanonical } from '../utils/chapterOrder';

function cleanStr(s: any): string {
  return String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function stemWord(w: string): string {
  return w
    .replace(/ies$/g, 'y')
    .replace(/es$/g, '')
    .replace(/s$/g, '')
    .replace(/centre/g, 'center')
    .replace(/calliper/g, 'caliper');
}

export function matchesFuzzy(val1: any, val2: any): boolean {
  const c1 = cleanStr(val1);
  const c2 = cleanStr(val2);
  if (!c1 || !c2) return false;
  if (c1 === c2) return true;

  const minLen = Math.min(c1.length, c2.length);
  const maxLen = Math.max(c1.length, c2.length);
  if (c1.includes(c2) || c2.includes(c1)) {
    if (minLen / maxLen >= 0.65 || minLen >= 8) return true;
  }

  const w1 = String(val1).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2).map(stemWord);
  const w2 = String(val2).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2).map(stemWord);
  if (w1.length === 0 || w2.length === 0) return false;
  const common = w1.filter(w => w2.includes(w));
  const minWords = Math.min(w1.length, w2.length);
  const required = minWords === 1 ? 1 : Math.max(1, Math.round(minWords * 0.5));
  return common.length >= required;
}

export function normalizeCanonicalChapter(ch: string, subject?: string): string {
  const c = cleanStr(ch);
  if (!c) return '';
  const sub = cleanStr(subject);

  // === SUBJECT-DIRECTED CHECKS FIRST (Avoid cross-subject ambiguity) ===
  if (sub.includes('bio')) {
    if (c.includes('cell') && (c.includes('unit') || c.includes('life') || c.includes('theunitoflife'))) return 'Cell: The Unit of Life';
  }
  if (sub.includes('math')) {
    if (c.includes('straightline')) return 'Straight Lines';
  }
  if (sub.includes('chem')) {
    if (c.includes('thermodynamic')) return 'Chemical Thermodynamics';
    if (c.includes('atom')) return 'Structure of Atom';
  }
  if (sub.includes('physic')) {
    if (c.includes('straightline')) return 'Motion in a Straight Line';
    if (c.includes('thermodynamic')) return 'Thermodynamics';
    if (c === 'atoms' || c === 'atom') return 'Atoms';
  }

  // === BIOLOGY CHAPTERS WITH KEYWORD OVERLAPS (Check before generic physics tokens!) ===
  if (c.includes('celltheunitoflife') || c.includes('cellunitoflife') || (c.includes('cell') && (c.includes('unit') || c.includes('life')))) {
    return 'Cell: The Unit of Life';
  }

  // === PHYSICS ===
  if (!c.includes('cell') && (c.includes('unitsandmeasurement') || c.includes('unitandmeasurement') || c.includes('measurement') || (c.includes('unit') && (c.includes('dimension') || c.includes('error') || c === 'units' || c === 'unitsandmeasurements')))) {
    return 'Units and Measurements';
  }
  if (c.includes('motionin1d') || (c.includes('motion') && c.includes('straightline'))) return 'Motion in a Straight Line';
  if (c === 'straightline' || c === 'straightlines') return 'Straight Lines';
  if (c.includes('motioninaplane') || c.includes('projectile') || c.includes('motionin2d')) return 'Motion in a Plane';
  if (c === 'kinematics') return 'Motion in a Straight Line';
  if (c.includes('lawofmotion') || c.includes('lawsofmotion') || c.includes('newtonslaw')) return 'Laws of Motion';
  if (c.includes('workenergy') || c.includes('workpower')) return 'Work, Energy and Power';
  if (c.includes('systemofparticles') || c.includes('rotationalmotion') || c.includes('rigidbodies')) return 'System of Particles and Rotational Motion';
  if (c.includes('gravitat')) return 'Gravitation';
  if (c.includes('mechanicalpropertiesofsolids') || c.includes('elasticity')) return 'Mechanical Properties of Solids';
  if (c.includes('mechanicalpropertiesoffluids') || c.includes('fluiddynamics') || c.includes('hydrodynamics')) return 'Mechanical Properties of Fluids';
  if (c.includes('thermalproperties') || c.includes('calorimetry')) return 'Thermal Properties of Matter';
  if (c.includes('chemicalthermodynamic')) return 'Chemical Thermodynamics';
  if (c.includes('thermodynamic')) return 'Thermodynamics';
  if (c.includes('kinetictheory')) return 'Kinetic Theory of Gases';
  if (c.includes('oscillation') || c.includes('shm')) return 'Oscillations';
  if (c.includes('wave') && !c.includes('electromagneticwave') && !c.includes('waveoptic')) return 'Waves';
  if (c.includes('electrostaticpotential') || c.includes('capacitance') || c.includes('capacitors')) return 'Electrostatic Potential and Capacitance';
  if (c.includes('electriccharge') || c.includes('electricfield') || c === 'electrostatics') return 'Electric Charges and Fields';
  if (c.includes('currentelectricity') || c === 'current') return 'Current Electricity';
  if (c.includes('movingcharge') || c.includes('magneticeffectsofcurrent')) return 'Moving Charges and Magnetism';
  if (c.includes('magnetismandmatter') || c === 'magnetism') return 'Magnetism and Matter';
  if (c.includes('electromagneticinduction') || c === 'emi') return 'Electromagnetic Induction';
  if (c.includes('alternatingcurrent') || c === 'accircuits' || c === 'ac') return 'Alternating Current';
  if (c.includes('electromagneticwaves') || c === 'emwaves') return 'Electromagnetic Waves';
  if (c.includes('rayoptics') || c.includes('opticalinstrument')) return 'Ray Optics and Optical Instruments';
  if (c.includes('waveoptics')) return 'Wave Optics';
  if (c.includes('dualnature') || c.includes('photoelectric')) return 'Dual Nature of Radiation and Matter';
  if (c.includes('atomicstructure') || c.includes('structureofatom')) return 'Structure of Atom';
  if (c.includes('atom') && !c.includes('molecule')) return 'Atoms';
  if (c.includes('nuclei') || c.includes('nuclearphysics') || c.includes('radioactivity')) return 'Nuclei';
  if (c.includes('semiconductor')) return 'Semiconductor Electronics';

  // === CHEMISTRY ===
  if (c.includes('basicconceptsofchemistry') || c.includes('moleconcept')) return 'Some Basic Concepts of Chemistry';
  if (c.includes('classificationofelements') || c.includes('periodicity') || c.includes('periodictable')) return 'Classification of Elements and Periodicity';
  if (c.includes('chemicalbonding') || c.includes('molecularstructure')) return 'Chemical Bonding and Molecular Structure';
  if (c.includes('statesofmatter') || c.includes('gasesandliquids')) return 'States of Matter: Gases and Liquids';
  if (c.includes('sblock')) return 's-Block Elements (Alkali & Alkaline Earth Metals)';
  if (c.includes('pblock') && (c.includes('13') || c.includes('14'))) return 'p-Block Elements (Group 13 & 14)';
  if (c.includes('pblock') && (c.includes('15') || c.includes('16') || c.includes('17') || c.includes('18'))) return 'p-Block Elements (Group 15, 16, 17 & 18)';
  if (c.includes('hydrogen') && !c.includes('hydrocarbon')) return 'Hydrogen & Its Compounds';
  if (c.includes('environmentalchemistry')) return 'Environmental Chemistry';
  if (c.includes('practicalchemistry')) return 'Principles Related to Practical Chemistry';
  if (c.includes('solidstate')) return 'Solid State';
  if (c.includes('solution')) return 'Solutions';
  if (c.includes('electrochem')) return 'Electrochemistry';
  if (c.includes('chemicalkinetic') || c.includes('kinetics')) return 'Chemical Kinetics';
  if (c.includes('surfacechem')) return 'Surface Chemistry';
  if (c.includes('isolationofelements') || c.includes('metallurgy')) return 'General Principles and Processes of Isolation of Elements';
  if (c.includes('dandfblock') || c.includes('dfblock')) return 'The d- and f-Block Elements';
  if (c.includes('coordinationcompound') || c.includes('coordinationchemistry')) return 'Coordination Compounds';
  if (c.includes('haloalkane') || c.includes('haloarene')) return 'Haloalkanes and Haloarenes';
  if (c.includes('alcohol') || c.includes('phenol') || c.includes('ether')) return 'Alcohols, Phenols and Ethers';
  if (c.includes('aldehyde') || c.includes('ketone') || c.includes('carboxylic')) return 'Aldehydes, Ketones and Carboxylic Acids';
  if (c.includes('amine') || c.includes('nitrogencontaining') || c.includes('compoundsofnitrogen')) return 'Amines';
  if (c.includes('biomolecule')) return 'Biomolecules';
  if (c.includes('polymer')) return 'Polymers';
  if (c.includes('chemistryineverydaylife')) return 'Chemistry in Everyday Life';
  if (c.includes('organicchemistry') || c.includes('goc') || c.includes('generalorganic')) return 'Organic Chemistry: Some Basic Principles and Techniques';
  if (c.includes('hydrocarbon')) return 'Hydrocarbons';
  if (c.includes('equilibrium')) return 'Equilibrium';
  if (c.includes('redox')) return 'Redox Reactions';

  // === MATHEMATICS ===
  if (c.includes('complexnumber') || c.includes('quadraticequation')) return 'Complex Numbers and Quadratic Equations';
  if (c.includes('linearinequalit')) return 'Linear Inequalities';
  if (c.includes('permutation') || c.includes('combination')) return 'Permutations and Combinations';
  if (c.includes('binomial')) return 'Binomial Theorem';
  if (c.includes('sequence') || c.includes('series')) return 'Sequences and Series';
  if (c.includes('straightline')) return 'Straight Lines';
  if (c.includes('conicsection') || c.includes('parabola') || c.includes('ellipse') || c.includes('hyperbola')) return 'Conic Sections';
  if (c.includes('introductiontothreedimensional') || c === '3dgeometry') return 'Introduction to Three Dimensional Geometry';
  if (c.includes('threedimensionalgeometry')) return 'Three Dimensional Geometry';
  if (c.includes('limitsandderivative') || c.includes('limitscontinuity')) return 'Limits and Derivatives';
  if (c.includes('continuityanddifferentiabilit')) return 'Continuity and Differentiability';
  if (c.includes('applicationofderivative') || c.includes('applicationsofderivative')) return 'Application of Derivatives';
  if (c.includes('applicationofintegral') || c.includes('applicationsofintegral') || c.includes('areaundercirve')) return 'Applications of Integrals';
  if (c.includes('integral') && !c.includes('application')) return 'Integrals';
  if (c.includes('differentialequation')) return 'Differential Equations';
  if (c.includes('vector') && !c.includes('threedimensional')) return 'Vector Algebra';
  if (c.includes('linearprogramming') || c === 'lpp') return 'Linear Programming';
  if (c.includes('inversetrigonometric')) return 'Inverse Trigonometric Functions';
  if (c.includes('trigonometricfunction') || c === 'trigonometry') return 'Trigonometric Functions';
  if (c.includes('matrix') || c.includes('matrices') && !c.includes('determinant')) return 'Matrices';
  if (c.includes('determinant') && !c.includes('matrices')) return 'Determinants';
  if (c.includes('matricesanddeterminant')) return 'Matrices';
  if (c.includes('relation') || c.includes('function') && !c.includes('trigonometric')) return 'Relations and Functions';
  if (c.includes('set') && !c.includes('offset')) return 'Sets';
  if (c.includes('statistic')) return 'Statistics';
  if (c.includes('probabilit')) return 'Probability';

  // === BIOLOGY ===
  if (c.includes('livingworld')) return 'The Living World';
  if (c.includes('biologicalclassification')) return 'Biological Classification';
  if (c.includes('plantkingdom')) return 'Plant Kingdom';
  if (c.includes('animalkingdom')) return 'Animal Kingdom';
  if (c.includes('morphologyoffloweringplants')) return 'Morphology of Flowering Plants';
  if (c.includes('anatomyoffloweringplants')) return 'Anatomy of Flowering Plants';
  if (c.includes('structuralorganisation') || c.includes('structuralorganization')) return 'Structural Organisation in Animals';
  if (c.includes('cellcycle') || c.includes('celldivision')) return 'Cell Cycle and Cell Division';
  if (c.includes('photosynthesis')) return 'Photosynthesis in Higher Plants';
  if (c.includes('respirationinplants')) return 'Respiration in Plants';
  if (c.includes('plantgrowth')) return 'Plant Growth and Development';
  if (c.includes('breathingandexchange')) return 'Breathing and Exchange of Gases';
  if (c.includes('bodyfluids')) return 'Body Fluids and Circulation';
  if (c.includes('excretoryproduct')) return 'Excretory Products and their Elimination';
  if (c.includes('locomotionandmovement')) return 'Locomotion and Movement';
  if (c.includes('neuralcontrol')) return 'Neural Control and Coordination';
  if (c.includes('chemicalcoordination')) return 'Chemical Coordination and Integration';
  if (c.includes('sexualreproductioninfloweringplants')) return 'Sexual Reproduction in Flowering Plants';
  if (c.includes('humanreproduction')) return 'Human Reproduction';
  if (c.includes('reproductivehealth')) return 'Reproductive Health';
  if (c.includes('principlesofinheritance') || c.includes('genetics')) return 'Principles of Inheritance and Variation';
  if (c.includes('molecularbasisofinheritance')) return 'Molecular Basis of Inheritance';
  if (c.includes('evolution')) return 'Evolution';
  if (c.includes('humanhealthanddisease')) return 'Human Health and Disease';
  if (c.includes('microbesinhumanwelfare')) return 'Microbes in Human Welfare';
  if (c.includes('biotechnologyprinciples')) return 'Biotechnology: Principles and Processes';
  if (c.includes('biotechnologyanditsapplications')) return 'Biotechnology and its Applications';
  if (c.includes('organismsandpopulation')) return 'Organisms and Populations';
  if (c.includes('ecosystem')) return 'Ecosystem';
  if (c.includes('biodiversity')) return 'Biodiversity and Conservation';

  return ch;
}

const canonicalChapterSet = new Set(comprehensiveFormulaNotes.map(f => f.chapter));

export function matchesChapterCanonical(qChapter: string, filterChapter: string, subject?: string): boolean {
  if (!qChapter || !filterChapter) return false;
  if (filterChapter === 'All' || filterChapter === 'ALL') return true;
  if (cleanStr(qChapter) === cleanStr(filterChapter)) return true;

  const normQ = normalizeCanonicalChapter(qChapter, subject);
  const normF = normalizeCanonicalChapter(filterChapter, subject);
  if (normQ && normF) {
    if (normQ === normF) return true;
    if (canonicalChapterSet.has(normQ) && canonicalChapterSet.has(normF)) {
      return false;
    }
  }

  if (cleanStr(filterChapter).includes('kinematics')) {
    if (normQ === 'Motion in a Straight Line' || normQ === 'Motion in a Plane') return true;
  }
  if (cleanStr(filterChapter) === 'electrostatics') {
    if (normQ === 'Electric Charges and Fields' || normQ === 'Electrostatic Potential and Capacitance') return true;
  }

  return matchesFuzzy(qChapter, filterChapter);
}

export function matchesTopicCanonical(qTopic: string, filterTopic: string): boolean {
  if (!qTopic || !filterTopic) return false;
  if (filterTopic === 'All' || filterTopic === 'ALL') return true;
  if (cleanStr(qTopic) === cleanStr(filterTopic)) return true;

  const normT1 = cleanStr(qTopic).replace(/center/g, 'centre').replace(/caliper/g, 'calliper').replace(/ies$/g, 'y').replace(/s$/g, '');
  const normT2 = cleanStr(filterTopic).replace(/center/g, 'centre').replace(/caliper/g, 'calliper').replace(/ies$/g, 'y').replace(/s$/g, '');
  if (normT1 === normT2) return true;
  if (normT1.includes(normT2) || normT2.includes(normT1)) {
    const minLen = Math.min(normT1.length, normT2.length);
    if (minLen >= 6) return true;
  }

  return matchesFuzzy(qTopic, filterTopic);
}

export function isAuthenticTopic(topic: string, chapter?: string): boolean {
  if (!topic || typeof topic !== 'string') return false;
  const t = topic.trim();
  if (t.length < 3) return false;

  // Reject dummy patterns, generic drills, and artificial subtopic concatenations
  const dummyRegex = /High Yield Application|Core Concept Drill|Reaction & Synthesis|Mechanism & Analysis|Calculus & Geometry|Analytic Problem|Practice Drill|Set \d+|Drill \d+|Application \d+|Problem \d+|Standard Formula Drill|Previous Exam Applications|Core Theory & Derivations/i;
  if (dummyRegex.test(t)) return false;

  // Reject generic chapter placeholders like "Atoms - High Yield", "Atoms - Drill"
  if (chapter) {
    const chClean = chapter.trim().toLowerCase();
    const tClean = t.toLowerCase();
    if (tClean.startsWith(`${chClean} -`) && (tClean.includes('drill') || tClean.includes('set') || tClean.includes('part') || tClean.includes('application') || tClean.includes('core'))) {
      return false;
    }
  }

  // Reject generic placeholders
  if (/^(General|Miscellaneous|Core Concept|Key Principle)s?$/i.test(t)) return false;

  return true;
}

export interface QuestionFilters {
  exam?: ExamType | 'All';
  classLevel?: ClassLevel | 'All' | 'Dropper';
  subject?: SubjectName | 'All';
  chapter?: string | 'All';
  topic?: string | 'All';
  difficulty?: DifficultyLevel | 'All';
  contentType?: ContentType | 'All';
  includePYQs?: boolean;
  includeModelPapers?: boolean;
  searchQuery?: string;
  excludeIds?: string[];
}

class ApiQuestionService {
  private localQuestionsCache: Question[] = [];
  private isInitialized = false;
  private taxonomyCache: Map<string, any[]> = new Map();
  private questionsByIdMap: Map<string, Question> = new Map();

  constructor() {
    this.init();
  }

  private async init() {
    try {
      const { data } = await apiRequest<{ success: boolean; questions: Question[] }>('/questions?limit=500');
      if (data && data.success && data.questions && data.questions.length > 0) {
        const map = new Map<string, Question>();
        mockQuestions.forEach(q => map.set(q.id, q));
        data.questions.forEach(q => map.set(q.id, q));
        this.localQuestionsCache = Array.from(map.values()).map(q => ({
          ...q,
          recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
        }));
        this.questionsByIdMap.clear();
        this.localQuestionsCache.forEach(q => this.questionsByIdMap.set(q.id, q));
        this.isInitialized = true;
      }
    } catch {
      // Offline fallback
    }
  }

  private getCustomQuestions(): Question[] {
    return getStorageItem<Question[]>(StorageKeys.QUESTIONS, []);
  }

  public getAllQuestions(): Question[] {
    if (this.localQuestionsCache.length > 0) {
      return this.localQuestionsCache;
    }
    const custom = this.getCustomQuestions();
    const map = new Map<string, Question>();
    mockQuestions.forEach(q => map.set(q.id, q));
    custom.forEach(q => map.set(q.id, q));
    this.localQuestionsCache = Array.from(map.values()).map(q => ({
      ...q,
      recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
    }));
    this.questionsByIdMap.clear();
    this.localQuestionsCache.forEach(q => this.questionsByIdMap.set(q.id, q));
    return this.localQuestionsCache;
  }

  public async fetchAllQuestionsAsync(): Promise<Question[]> {
    const { data } = await apiRequest<{ success: boolean; questions: Question[] }>('/questions?limit=500');
    if (data && data.success && data.questions && data.questions.length > 0) {
      const map = new Map<string, Question>();
      mockQuestions.forEach(q => map.set(q.id, q));
      data.questions.forEach(q => map.set(q.id, q));
      this.localQuestionsCache = Array.from(map.values()).map(q => ({
        ...q,
        recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
      }));
      this.questionsByIdMap.clear();
      this.localQuestionsCache.forEach(q => this.questionsByIdMap.set(q.id, q));
      return this.localQuestionsCache;
    }
    return this.getAllQuestions();
  }

  public getQuestionById(id: string): Question | undefined {
    if (this.questionsByIdMap.size === 0) {
      this.getAllQuestions();
    }
    return this.questionsByIdMap.get(id);
  }

  public async getQuestionByIdAsync(id: string): Promise<Question | undefined> {
    const { data } = await apiRequest<{ success: boolean; question: Question }>(`/questions/${id}`);
    if (data && data.success && data.question) {
      return data.question;
    }
    return this.getQuestionById(id);
  }

  public getQuestionsByIds(ids: string[]): Question[] {
    const map = new Map(this.getAllQuestions().map(q => [q.id, q]));
    return ids.map(id => map.get(id)).filter((q): q is Question => Boolean(q));
  }

  public async getQuestionsByIdsAsync(ids: string[]): Promise<Question[]> {
    if (!ids || ids.length === 0) return [];
    const cacheMap = new Map(this.getAllQuestions().map(q => [q.id, q]));
    const missingIds = ids.filter(id => !cacheMap.has(id));

    if (missingIds.length > 0) {
      try {
        const { data } = await apiRequest<{ success: boolean; questions: Question[] }>('/questions/by-ids', {
          method: 'POST',
          body: JSON.stringify({ ids: missingIds })
        });
        if (data && data.success && Array.isArray(data.questions)) {
          data.questions.forEach(q => {
            cacheMap.set(q.id, q);
            this.localQuestionsCache.push(q);
          });
        }
      } catch (err) {
        console.warn('Failed to fetch missing questions by IDs', err);
      }
    }

    return ids.map(id => cacheMap.get(id)).filter((q): q is Question => Boolean(q));
  }

  public async fetchQuestionsAsync(filters: QuestionFilters = {}, limit: number = 50): Promise<Question[]> {
    try {
      const params = new URLSearchParams();
      if (filters.exam && filters.exam !== 'All') params.set('exam', filters.exam);
      if (filters.classLevel && filters.classLevel !== 'All') params.set('classLevel', filters.classLevel);
      if (filters.subject && filters.subject !== 'All') params.set('subject', filters.subject);
      if (filters.chapter && filters.chapter !== 'All') params.set('chapter', filters.chapter);
      if (filters.topic && filters.topic !== 'All') params.set('topic', filters.topic);
      if (filters.difficulty && filters.difficulty !== 'All') params.set('difficulty', filters.difficulty);
      if (filters.contentType && filters.contentType !== 'All') params.set('contentType', filters.contentType);
      if (filters.includePYQs !== undefined) params.set('includePYQs', String(filters.includePYQs));
      if (filters.includeModelPapers !== undefined) params.set('includeModelPapers', String(filters.includeModelPapers));
      if (filters.searchQuery) params.set('search', filters.searchQuery);
      if (filters.excludeIds && filters.excludeIds.length > 0) {
        params.set('excludeIds', filters.excludeIds.slice(0, 300).join(','));
      }
      params.set('limit', String(limit));

      const { data } = await apiRequest<{ success: boolean; questions: Question[] }>(`/questions?${params.toString()}`);
      if (data && data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        const cacheMap = new Map(this.localQuestionsCache.map(q => [q.id, q]));
        data.questions.forEach(q => cacheMap.set(q.id, q));
        this.localQuestionsCache = Array.from(cacheMap.values());
        return data.questions.map(q => ({
          ...q,
          recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
        }));
      }
    } catch {
      // fallback
    }
    return this.filterQuestions(filters).slice(0, limit);
  }

  public filterQuestions(filters: QuestionFilters): Question[] {
    const hasSpecificChapter = Boolean(filters.chapter && filters.chapter !== 'All' && filters.chapter !== 'ALL');

    let pool = this.getAllQuestions().filter(q => {
      // Content Type Isolation
      const isModelPaper = q.contentType === 'MODEL_PAPER' || q.source === 'Model Paper';
      const isPYQ = q.contentType === 'PYQ' || q.source === 'PYQ' || q.source === 'Official PYQ';

      if (filters.contentType && filters.contentType !== 'All') {
        const resolvedType = q.contentType || (isModelPaper ? 'MODEL_PAPER' : isPYQ ? 'PYQ' : 'QUESTION_BANK');
        if (resolvedType !== filters.contentType) return false;
      } else {
        // By default: NEVER include Model Papers in normal test/practice pool
        if (!filters.includeModelPapers && isModelPaper) return false;
        // PYQs are integral to competitive practice: include by default unless explicitly disabled!
        if (filters.includePYQs === false && isPYQ) return false;
      }

      if (filters.exam && filters.exam !== 'All') {
        if (!hasSpecificChapter) {
          if (filters.exam === 'Board') {
            if (q.exam !== 'Board' && q.exam !== 'CBSE' && q.exam !== 'RBSE') return false;
          } else if (filters.exam === 'JEE') {
            if (q.exam && q.exam !== 'JEE' && (q.exam as string) !== 'All' && q.exam !== 'Board' && q.exam !== 'CBSE') return false;
          } else if (filters.exam === 'NEET') {
            if (q.exam && q.exam !== 'NEET' && (q.exam as string) !== 'All' && q.exam !== 'Board' && q.exam !== 'CBSE') return false;
          } else if (q.exam !== filters.exam) {
            return false;
          }
        } else {
          // When specific chapter is selected: only exclude if Board is selected and question is purely JEE Advanced specific
          if (filters.exam === 'Board' && (q.exam === 'JEE' || q.exam === 'NEET')) {
            // Keep question if it matches the chapter
          }
        }
      }

      // Class 11 vs 12 filtering: when a student specifies 11 or 12 without a specific chapter, isolate questions
      if (!hasSpecificChapter && filters.classLevel && filters.classLevel !== 'All' && (filters.classLevel as string) !== 'Dropper') {
        const qClass = String(q.class || '');
        if (qClass && qClass !== filters.classLevel && qClass !== 'Both' && qClass !== 'All') {
          return false;
        }
      }

      if (filters.subject && filters.subject !== 'All' && !matchesFuzzy(q.subject, filters.subject)) return false;
      if (filters.chapter && filters.chapter !== 'All' && filters.chapter !== 'ALL' && !matchesChapterCanonical(q.chapter, filters.chapter)) return false;
      
      // Resilient topic filtering
      if (filters.topic && filters.topic !== 'All' && filters.topic !== 'ALL' && !matchesTopicCanonical(q.topic, filters.topic)) return false;
      
      if (filters.difficulty && filters.difficulty !== 'All' && (filters.difficulty as string) !== 'Mixed') {
        if (String(q.difficulty || '').trim().toLowerCase() !== String(filters.difficulty).trim().toLowerCase()) {
          return false;
        }
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(query);
        const matchesChapter = q.chapter.toLowerCase().includes(query);
        const matchesTopic = q.topic.toLowerCase().includes(query);
        const matchesConcept = q.concept ? q.concept.toLowerCase().includes(query) : false;
        if (!matchesQ && !matchesChapter && !matchesTopic && !matchesConcept) return false;
      }
      return true;
    });

    // If topic filtering was requested but returned 0 matches, fall back to chapter-level pool with keyword relevance
    if (pool.length === 0 && filters.topic && filters.topic !== 'All' && filters.topic !== 'ALL' && filters.chapter && filters.chapter !== 'All') {
      const chapterPool = this.filterQuestions({
        ...filters,
        topic: 'All'
      });
      if (chapterPool.length > 0) {
        const topWords = String(filters.topic).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length >= 4);
        const scored = chapterPool.map(q => {
          let score = 0;
          const qText = `${q.topic || ''} ${q.question || ''} ${q.concept || ''}`.toLowerCase();
          for (const w of topWords) {
            if (qText.includes(w)) score += 2;
          }
          return { q, score };
        });
        scored.sort((a, b) => b.score - a.score);
        pool = scored.map(s => s.q);
      }
    }

    // Handle excludeIds gracefully
    if (filters.excludeIds && filters.excludeIds.length > 0) {
      const excludeSet = new Set(filters.excludeIds);
      const unattempted = pool.filter(q => !excludeSet.has(q.id));
      if (unattempted.length > 0) {
        return unattempted;
      }
      // If student has solved all questions in this topic/pool, recycle pool so they can revise/practice!
      return pool;
    }

    return pool;
  }

  /**
   * Guaranteed Question Batch Retrieval:
   * Ensures that when a student asks for N questions (e.g. 10, 20, 25, 50),
   * the returned array contains EXACTLY N questions without falling short!
   * Enforces 100% strict difficulty retention (Easy stays Easy).
   */
  public getQuestionsWithGuarantee(filters: QuestionFilters, requestedCount: number): Question[] {
    let pool = this.filterQuestions({
      ...filters,
      includePYQs: filters.includePYQs !== false,
      includeModelPapers: filters.includeModelPapers ?? false
    });

    const isMatchDifficulty = (q: Question) => {
      if (!filters.difficulty || filters.difficulty === 'All' || (filters.difficulty as string) === 'Mixed') return true;
      return String(q.difficulty || '').trim().toLowerCase() === String(filters.difficulty).trim().toLowerCase();
    };

    // Chapter/topic-specific practice: if a specific topic has few questions, supplement from the same chapter (same difficulty)
    if (pool.length < requestedCount && filters.chapter && filters.chapter !== 'All' && filters.chapter !== 'ALL') {
      const chapterPool = this.filterQuestions({
        subject: filters.subject,
        chapter: filters.chapter,
        classLevel: filters.classLevel,
        exam: filters.exam,
        difficulty: filters.difficulty,
        includePYQs: true
      });
      const existingIds = new Set(pool.map(q => q.id));
      for (const q of chapterPool) {
        if (!existingIds.has(q.id) && isMatchDifficulty(q)) {
          pool.push(q);
          existingIds.add(q.id);
          if (pool.length >= requestedCount) break;
        }
      }
    }

    const hasChapterOrTopic =
      (filters.chapter && filters.chapter !== 'All' && filters.chapter !== 'ALL') ||
      (filters.topic && filters.topic !== 'All' && filters.topic !== 'ALL');

    // If pool is smaller than requested, supplement from the same subject across other chapters (same difficulty)
    if (pool.length < requestedCount && !hasChapterOrTopic && filters.subject && filters.subject !== 'All') {
      const subjectPool = this.filterQuestions({
        subject: filters.subject,
        exam: filters.exam,
        classLevel: filters.classLevel,
        difficulty: filters.difficulty,
        includePYQs: true
      });
      const existingIds = new Set(pool.map(q => q.id));
      for (const q of subjectPool) {
        if (!existingIds.has(q.id) && isMatchDifficulty(q)) {
          pool.push(q);
          existingIds.add(q.id);
          if (pool.length >= requestedCount) break;
        }
      }
    }

    // If still smaller, supplement from all questions matching subject (same difficulty)
    if (pool.length < requestedCount && !hasChapterOrTopic && filters.subject && filters.subject !== 'All') {
      const allSub = this.getAllQuestions().filter(q => {
        if (q.subject !== filters.subject) return false;
        if (!isMatchDifficulty(q)) return false;
        if (filters.classLevel && filters.classLevel !== 'All' && filters.classLevel !== 'Dropper' && q.class !== filters.classLevel) return false;
        return true;
      });
      const existingIds = new Set(pool.map(q => q.id));
      for (const q of allSub) {
        if (!existingIds.has(q.id)) {
          pool.push(q);
          existingIds.add(q.id);
          if (pool.length >= requestedCount) break;
        }
      }
    }

    // If still smaller (e.g. no subject filter, or subject bank was small), supplement from broader questions (same difficulty)
    if (pool.length < requestedCount && !hasChapterOrTopic) {
      const existingIds = new Set(pool.map(q => q.id));
      const fallbackQuestions = this.getAllQuestions().filter(q => {
        if (filters.subject && filters.subject !== 'All' && q.subject !== filters.subject) return false;
        if (!isMatchDifficulty(q)) return false;
        if (filters.classLevel && filters.classLevel !== 'All' && filters.classLevel !== 'Dropper' && q.class !== filters.classLevel) return false;
        return !existingIds.has(q.id);
      });
      for (const q of fallbackQuestions) {
        pool.push(q);
        existingIds.add(q.id);
        if (pool.length >= requestedCount) break;
      }
    }

    // If still 0, fill with all questions matching difficulty
    if (pool.length === 0 && !hasChapterOrTopic) {
      pool = [...this.getAllQuestions().filter(q => isMatchDifficulty(q))];
    }

    // Final strict safety guard: NEVER leak non-matching difficulty
    if (filters.difficulty && filters.difficulty !== 'All' && (filters.difficulty as string) !== 'Mixed') {
      pool = pool.filter(isMatchDifficulty);
    }

    // If still underflow (e.g. requested 50 but only 10 exist), repeat variants of valid matching questions
    if (pool.length > 0 && pool.length < requestedCount) {
      const origPool = [...pool];
      let counter = 1;
      while (pool.length < requestedCount) {
        for (const item of origPool) {
          if (pool.length >= requestedCount) break;
          pool.push({
            ...item,
            id: `${item.id}-var-${counter}`
          });
          counter++;
        }
      }
    }

    // Shuffle and slice
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, requestedCount);
  }

  public async getEligibleCountAsync(filters: QuestionFilters): Promise<number> {
    try {
      const params = new URLSearchParams();
      if (filters.exam && filters.exam !== 'All') params.set('exam', filters.exam);
      if (filters.classLevel && filters.classLevel !== 'All') params.set('classLevel', filters.classLevel);
      if (filters.subject && filters.subject !== 'All') params.set('subject', filters.subject);
      if (filters.chapter && filters.chapter !== 'All') params.set('chapter', filters.chapter);
      if (filters.topic && filters.topic !== 'All') params.set('topic', filters.topic);
      if (filters.difficulty && filters.difficulty !== 'All') params.set('difficulty', filters.difficulty);
      if (filters.contentType && filters.contentType !== 'All') params.set('contentType', filters.contentType);
      if (filters.includePYQs !== undefined) params.set('includePYQs', String(filters.includePYQs));
      if (filters.includeModelPapers !== undefined) params.set('includeModelPapers', String(filters.includeModelPapers));
      if (filters.searchQuery) params.set('search', filters.searchQuery);

      const { data } = await apiRequest<{ success: boolean; count: number }>(`/questions/count?${params.toString()}`);
      if (data && data.success && typeof data.count === 'number') {
        return data.count;
      }
    } catch {
      // fallback to local filter count
    }
    return this.filterQuestions(filters).length;
  }

  public async getInventoryStatsAsync(): Promise<{
    total: number;
    difficulties: { Easy: number; Medium: number; Hard: number };
    statuses: { Approved: number; Pending: number; Draft: number; Rejected: number };
    exams: Record<string, number>;
    subjects: Record<string, number>;
  }> {
    try {
      const { data } = await apiRequest<{
        success: boolean;
        total: number;
        difficulties: { Easy: number; Medium: number; Hard: number };
        statuses: { Approved: number; Pending: number; Draft: number; Rejected: number };
        exams: Record<string, number>;
        subjects: Record<string, number>;
      }>('/questions/inventory-stats');
      if (data && data.success) {
        return data;
      }
    } catch {
      // fallback
    }
    const all = this.getAllQuestions();
    const diffs = { Easy: 0, Medium: 0, Hard: 0 };
    const exMap: Record<string, number> = {};
    const subMap: Record<string, number> = {};
    all.forEach(q => {
      if (q.difficulty in diffs) diffs[q.difficulty as keyof typeof diffs]++;
      exMap[q.exam] = (exMap[q.exam] || 0) + 1;
      subMap[q.subject] = (subMap[q.subject] || 0) + 1;
    });
    return {
      total: all.length,
      difficulties: diffs,
      statuses: { Approved: all.length, Pending: 0, Draft: 0, Rejected: 0 },
      exams: exMap,
      subjects: subMap
    };
  }

  public getSubjectsForExam(exam?: ExamType | 'All'): SubjectName[] {
    if (exam === 'NEET') return ['Physics', 'Chemistry', 'Biology'];
    if (exam === 'JEE') return ['Physics', 'Chemistry', 'Mathematics'];
    return ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  }

  public getChapters(subject?: SubjectName, classLevel?: ClassLevel | 'All' | 'Dropper' | string): string[] {
    const cacheKey = `CH_${subject || 'ALL'}_${classLevel || 'ALL'}`;
    if (this.taxonomyCache.has(cacheKey)) {
      return this.taxonomyCache.get(cacheKey)!;
    }

    const chapters = new Set<string>();
    const isAllClasses = !classLevel || classLevel === 'All' || classLevel === 'Dropper';

    // 0. From canonical syllabus (comprehensive NTA syllabus for JEE/NEET/Boards)
    canonicalSyllabus.forEach(ch => {
      if (subject && !matchesFuzzy(ch.subjectName, subject)) return;
      if (!isAllClasses && String(ch.classLevel) !== String(classLevel)) return;
      if (ch.name) chapters.add(ch.name);
    });

    // 1. From stored syllabus
    try {
      const savedSyllabus = getStorageItem<any[]>('prepora_syllabus', []);
      if (Array.isArray(savedSyllabus)) {
        savedSyllabus.forEach((ch: any) => {
          if (subject && !matchesFuzzy(ch.subject, subject)) return;
          if (!isAllClasses && ch.classLevel !== classLevel) return;
          if (ch.name) chapters.add(ch.name);
        });
      }
    } catch {
      // fallback
    }

    // 2. From all questions
    this.getAllQuestions().forEach(q => {
      if (subject && !matchesFuzzy(q.subject, subject)) return;
      if (!isAllClasses && q.class !== classLevel) return;
      if (q.chapter) chapters.add(q.chapter);
    });

    const sorted = sortChapterNamesCanonical(Array.from(chapters), subject);
    this.taxonomyCache.set(cacheKey, sorted);
    return sorted;
  }

  public getTopics(chapter: string, exam?: string, subject?: string): string[] {
    if (!chapter || chapter === 'ALL' || chapter === 'All') return [];

    const cacheKey = `TOP_${chapter}_${exam || 'ALL'}_${subject || 'ALL'}`;
    if (this.taxonomyCache.has(cacheKey)) {
      return this.taxonomyCache.get(cacheKey)!;
    }

    const norm = (s: any) => String(s || '').toLowerCase().replace(/\bsome\b/g, '').replace(/[^a-z0-9]/g, '');
    const chNorm = norm(chapter);
    const subNorm = subject ? norm(subject) : '';
    const resultTopics = new Set<string>();

    // 0. From comprehensiveFormulaNotes (authoritative pure NCERT topics aligned 100% with curriculum & bank)
    const formulaItems = comprehensiveFormulaNotes.filter(f => {
      if (subNorm && norm(f.subject) !== subNorm && !matchesFuzzy(f.subject, subject)) return false;
      return matchesChapterCanonical(f.chapter, chapter, subject);
    });

    formulaItems.forEach(item => {
      if (item.topic && isAuthenticTopic(item.topic, chapter)) {
        resultTopics.add(item.topic.trim());
      }
    });

    // 1. Augment with authentic topics directly from question bank
    this.getAllQuestions().forEach(q => {
      if (subNorm && norm(q.subject) !== subNorm && !matchesFuzzy(q.subject, subject)) return;
      if (matchesChapterCanonical(q.chapter, chapter, subject) && q.topic && isAuthenticTopic(q.topic, chapter)) {
        const t = q.topic.trim();
        let alreadyCovered = false;
        for (const existing of resultTopics) {
          if (matchesTopicCanonical(t, existing)) {
            alreadyCovered = true;
            break;
          }
        }
        if (!alreadyCovered && resultTopics.size < 12) {
          resultTopics.add(t);
        }
      }
    });

    if (resultTopics.size > 0) {
      const res = Array.from(resultTopics);
      this.taxonomyCache.set(cacheKey, res);
      return res;
    }

    // 2. Fallback to canonical syllabus or stored syllabus
    try {
      const savedSyllabus = getStorageItem<any[]>('prepora_syllabus', []);
      if (Array.isArray(savedSyllabus)) {
        const sylChapter = savedSyllabus.find((c: any) => matchesChapterCanonical(c.name, chapter, subject));
        if (sylChapter && Array.isArray(sylChapter.subtopics)) {
          sylChapter.subtopics.forEach((st: any) => {
            const name = typeof st === 'string' ? st : st?.name;
            if (typeof name === 'string' && isAuthenticTopic(name, chapter)) {
              resultTopics.add(name.trim());
            }
          });
        }
      }
    } catch {
      // fallback
    }

    if (resultTopics.size === 0) {
      const exNorm = exam ? String(exam).toUpperCase() : '';
      let foundChapter = canonicalSyllabus.find(c => {
        if (!matchesChapterCanonical(c.name, chapter, subject)) return false;
        if (subNorm && norm(c.subjectName) !== subNorm && !matchesFuzzy(c.subjectName, subject)) return false;
        if (exNorm && c.examId && !c.examId.toUpperCase().includes(exNorm) && !exNorm.includes(c.examId.toUpperCase())) return false;
        return true;
      });

      if (!foundChapter && subNorm) {
        foundChapter = canonicalSyllabus.find(c => {
          return matchesChapterCanonical(c.name, chapter, subject) &&
                 (norm(c.subjectName) === subNorm || matchesFuzzy(c.subjectName, subject));
        });
      }

      if (!foundChapter) {
        foundChapter = canonicalSyllabus.find(c => matchesChapterCanonical(c.name, chapter, subject));
      }

      if (foundChapter && Array.isArray(foundChapter.topics)) {
        foundChapter.topics.forEach((t: any) => {
          const name = typeof t === 'string' ? t : t?.name;
          if (typeof name === 'string' && isAuthenticTopic(name, chapter)) {
            resultTopics.add(name.trim());
          }
        });
      }
    }

    const finalRes = Array.from(resultTopics).filter(Boolean);
    this.taxonomyCache.set(cacheKey, finalRes);
    return finalRes;
  }

  public async fetchTaxonomyAsync(subject?: string, classLevel?: string): Promise<{ name: string; count: number; topics: { name: string; count: number }[] }[]> {
    const key = `${subject || 'ALL'}_${classLevel || 'ALL'}`;
    if (this.taxonomyCache.has(key)) return this.taxonomyCache.get(key)!;

    try {
      const params = new URLSearchParams();
      if (subject && subject !== 'All') params.set('subject', subject);
      if (classLevel && classLevel !== 'All') params.set('classLevel', classLevel);

      const { data } = await apiRequest<{ success: boolean; chapters: any[] }>(`/questions/taxonomy?${params.toString()}`);
      if (data && data.success && Array.isArray(data.chapters)) {
        this.taxonomyCache.set(key, data.chapters);
        return data.chapters;
      }
    } catch {}
    return [];
  }

  // Admin CRUD capabilities sync to MongoDB + local cache
  public async addQuestion(question: Omit<Question, 'id'>): Promise<Question> {
    const newId = `q-custom-${Date.now()}`;
    const newQuestion: Question = { ...question, id: newId };
    
    // Save to MongoDB
    await apiRequest('/questions', {
      method: 'POST',
      body: JSON.stringify(newQuestion)
    });

    this.localQuestionsCache.unshift(newQuestion);

    // Fallback to local storage
    const custom = this.getCustomQuestions();
    custom.unshift(newQuestion);
    setStorageItem(StorageKeys.QUESTIONS, custom);

    return newQuestion;
  }

  public async updateQuestion(id: string, updates: Partial<Question>): Promise<Question | null> {
    await apiRequest(`/questions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });

    const idx = this.localQuestionsCache.findIndex(q => q.id === id);
    if (idx !== -1) {
      this.localQuestionsCache[idx] = { ...this.localQuestionsCache[idx], ...updates };
    }

    const custom = this.getCustomQuestions();
    const index = custom.findIndex(q => q.id === id);
    if (index !== -1) {
      custom[index] = { ...custom[index], ...updates };
      setStorageItem(StorageKeys.QUESTIONS, custom);
      return custom[index];
    }
    return this.localQuestionsCache[idx] || null;
  }

  public async deleteQuestion(id: string): Promise<boolean> {
    await apiRequest(`/questions/${id}`, {
      method: 'DELETE'
    });

    this.localQuestionsCache = this.localQuestionsCache.filter(q => q.id !== id);

    const custom = this.getCustomQuestions();
    const filtered = custom.filter(q => q.id !== id);
    if (filtered.length !== custom.length) {
      setStorageItem(StorageKeys.QUESTIONS, filtered);
      return true;
    }
    return true;
  }
}

export const questionService = new ApiQuestionService();
