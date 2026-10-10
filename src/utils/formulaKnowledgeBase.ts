import {
  comprehensiveFormulaNotes,
  TopicRevisionItem,
  TopicFormula
} from '../data/comprehensiveFormulaNotes.js';
import type { SubjectName } from '../types';
import { detectLanguageMode } from './languageMode.js';

/**
 * Normalizes strings by lowercasing, stripping special characters and extra spaces.
 */
export function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/['’`]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Authoritative alias mapping from question bank / board chapter names
 * to canonical chapter names used in comprehensiveFormulaNotes.
 */
export const CHAPTER_ALIASES_MAP: Record<string, string[]> = {
  // Physics
  'kinematics': ['Motion in a Straight Line', 'Motion in a Plane'],
  'motion in 1d': ['Motion in a Straight Line'],
  'motion in 2d': ['Motion in a Plane'],
  'motion in a straight line': ['Motion in a Straight Line'],
  'motion in a plane': ['Motion in a Plane'],
  'work energy and power': ['Work, Energy and Power'],
  'work energy power': ['Work, Energy and Power'],
  'work, energy & power': ['Work, Energy and Power'],
  'laws of motion': ['Laws of Motion'],
  'newtons laws': ['Laws of Motion'],
  'electrostatics': ['Electric Charges and Fields', 'Electrostatic Potential and Capacitance'],
  'electric charges and fields': ['Electric Charges and Fields'],
  'electrostatic potential and capacitance': ['Electrostatic Potential and Capacitance'],
  'rotational motion': ['System of Particles and Rotational Motion'],
  'system of particles': ['System of Particles and Rotational Motion'],
  'system of particles and rotational motion': ['System of Particles and Rotational Motion'],
  'magnetic effects of current': ['Moving Charges and Magnetism'],
  'moving charges and magnetism': ['Moving Charges and Magnetism'],
  'magnetism and matter': ['Magnetism and Matter'],
  'magnetism & matter': ['Magnetism and Matter'],
  'semiconductors': ['Semiconductor Electronics'],
  'semiconductor electronics': ['Semiconductor Electronics'],
  'dual nature of radiation & matter': ['Dual Nature of Radiation and Matter'],
  'dual nature of radiation and matter': ['Dual Nature of Radiation and Matter'],
  'ray optics': ['Ray Optics and Optical Instruments'],
  'ray optics and optical instruments': ['Ray Optics and Optical Instruments'],
  'wave optics': ['Wave Optics'],
  'thermal properties': ['Thermal Properties of Matter'],
  'thermal properties of matter': ['Thermal Properties of Matter'],
  'mechanical properties of solids': ['Mechanical Properties of Solids'],
  'mechanical properties of fluids': ['Mechanical Properties of Fluids'],
  'current electricity': ['Current Electricity'],
  'gravitation': ['Gravitation'],
  'oscillations': ['Oscillations'],
  'waves': ['Waves'],
  'atoms': ['Atoms'],
  'nuclei': ['Nuclei'],
  'electromagnetic induction': ['Electromagnetic Induction'],
  'alternating current': ['Alternating Current'],
  'electromagnetic waves': ['Electromagnetic Waves'],

  // Chemistry
  'atomic structure': ['Structure of Atom'],
  'structure of atom': ['Structure of Atom'],
  'chemical bonding': ['Chemical Bonding and Molecular Structure'],
  'chemical bonding and molecular structure': ['Chemical Bonding and Molecular Structure'],
  'periodic table': ['Classification of Elements and Periodicity'],
  'classification of elements and periodicity': ['Classification of Elements and Periodicity'],
  'states of matter': ['States of Matter: Gases and Liquids'],
  'states of matter: gases and liquids': ['States of Matter: Gases and Liquids'],
  'organic chemistry - some basic principles': ['Organic Chemistry: Some Basic Principles and Techniques'],
  'organic chemistry: basic principles': ['Organic Chemistry: Some Basic Principles and Techniques'],
  'organic chemistry: basic principles and techniques': ['Organic Chemistry: Some Basic Principles and Techniques'],
  'organic chemistry: some basic principles and techniques': ['Organic Chemistry: Some Basic Principles and Techniques'],
  'd and f block elements': ['The d- and f-Block Elements'],
  'the d- and f-block elements': ['The d- and f-Block Elements'],
  'thermodynamics': ['Chemical Thermodynamics'],
  'chemical thermodynamics': ['Chemical Thermodynamics'],
  'chemical kinetics': ['Chemical Kinetics'],
  'solutions': ['Solutions'],
  'electrochemistry': ['Electrochemistry'],
  'equilibrium': ['Equilibrium'],
  'coordination compounds': ['Coordination Compounds'],
  'aldehydes ketones and carboxylic acids': ['Aldehydes, Ketones and Carboxylic Acids'],
  'haloalkanes and haloarenes': ['Haloalkanes and Haloarenes'],
  'alcohols phenols and ethers': ['Alcohols, Phenols and Ethers'],
  'amines': ['Amines'],
  'biomolecules': ['Biomolecules'],
  'solid state': ['Solid State'],

  // Mathematics
  'calculus': ['Continuity and Differentiability', 'Limits and Derivatives', 'Application of Derivatives', 'Integrals', 'Applications of Integrals', 'Differential Equations'],
  'differential calculus': ['Continuity and Differentiability', 'Limits and Derivatives', 'Application of Derivatives'],
  'differentiation': ['Continuity and Differentiability', 'Limits and Derivatives'],
  'derivatives': ['Continuity and Differentiability', 'Limits and Derivatives'],
  'applications of derivatives': ['Application of Derivatives'],
  'application of derivatives': ['Application of Derivatives'],
  'applications of integrals': ['Applications of Integrals'],
  'application of integrals': ['Applications of Integrals'],
  'integrals': ['Integrals'],
  'integral calculus': ['Integrals', 'Applications of Integrals'],
  'coordinate geometry': ['Straight Lines', 'Conic Sections', 'Introduction to Three Dimensional Geometry'],
  'vectors': ['Vector Algebra'],
  'vector algebra': ['Vector Algebra'],
  'trigonometry': ['Trigonometric Functions', 'Inverse Trigonometric Functions'],
  'trigonometric functions': ['Trigonometric Functions'],
  'inverse trigonometric functions': ['Inverse Trigonometric Functions'],
  'complex numbers': ['Complex Numbers and Quadratic Equations'],
  'quadratic equations': ['Complex Numbers and Quadratic Equations'],
  'complex numbers and quadratic equations': ['Complex Numbers and Quadratic Equations'],
  'linear equations': ['Linear Inequalities'],
  'linear inequalities': ['Linear Inequalities'],
  'matrices and determinants': ['Matrices', 'Determinants'],
  'matrices': ['Matrices'],
  'determinants': ['Determinants'],
  'conic sections': ['Conic Sections'],
  'straight lines': ['Straight Lines'],
  'differential equations': ['Differential Equations'],
  'limits and derivatives': ['Limits and Derivatives'],
  'probability': ['Probability'],
  'statistics': ['Statistics'],
  'binomial theorem': ['Binomial Theorem'],
  'sequences and series': ['Sequences and Series'],
  'relations and functions': ['Relations and Functions'],

  // Biology
  'human physiology': [
    'Body Fluids and Circulation',
    'Breathing and Exchange of Gases',
    'Neural Control and Coordination',
    'Chemical Coordination and Integration',
    'Excretory Products and their Elimination'
  ],
  'ecology and environment': [
    'Ecosystem',
    'Organisms and Populations',
    'Biodiversity and Conservation'
  ],
  'cell biology': ['Cell: The Unit of Life', 'Cell Cycle and Cell Division'],
  'genetics': ['Principles of Inheritance and Variation', 'Molecular Basis of Inheritance'],
  'plant physiology': [
    'Photosynthesis in Higher Plants',
    'Respiration in Plants',
    'Plant Growth and Development'
  ]
};

/**
 * Resolves any chapter name (including aliases like Kinematics, Electrostatics)
 * to all matching TopicRevisionItem elements from comprehensiveFormulaNotes.
 */
export function getFormulaItemsForChapter(
  chapterName: string,
  subject?: string
): TopicRevisionItem[] {
  if (!chapterName) return [];
  const rawClean = normalizeText(chapterName);

  // 1. Direct or alias resolution
  const targetChapterNames = new Set<string>();

  for (const [alias, canonicalTargets] of Object.entries(CHAPTER_ALIASES_MAP)) {
    const aliasNorm = normalizeText(alias);
    if (aliasNorm === rawClean || rawClean.includes(aliasNorm) || aliasNorm.includes(rawClean)) {
      canonicalTargets.forEach((t) => targetChapterNames.add(normalizeText(t)));
    }
  }

  // Also include the raw chapter name itself
  targetChapterNames.add(rawClean);

  // 2. Filter formula notes
  const matched = comprehensiveFormulaNotes.filter((item) => {
    if (subject && item.subject.toLowerCase() !== subject.toLowerCase()) {
      return false;
    }
    const itemChNorm = normalizeText(item.chapter);

    // Exact match in target set
    if (targetChapterNames.has(itemChNorm)) return true;

    // Substring match
    for (const target of targetChapterNames) {
      if (itemChNorm.includes(target) || target.includes(itemChNorm)) {
        return true;
      }
    }
    return false;
  });

  return matched;
}

export const SCIENTIFIC_SPELLING_FIXES: Record<string, string> = {
  debrolie: 'de broglie',
  debrolige: 'de broglie',
  debrogli: 'de broglie',
  debrogali: 'de broglie',
  dibroli: 'de broglie',
  dibroglie: 'de broglie',
  broglie: 'de broglie',
  brolie: 'de broglie',
  schrodinger: 'schrodinger',
  shrodinger: 'schrodinger',
  shroedinger: 'schrodinger',
  heisenberg: 'heisenberg',
  hiesenberg: 'heisenberg',
  bernouli: 'bernoulli',
  barnouli: 'bernoulli',
  barnoulli: 'bernoulli',
  kirchof: 'kirchhoff',
  kirchoff: 'kirchhoff',
  krichof: 'kirchhoff',
  coulomb: 'coulomb',
  culomb: 'coulomb',
  farade: 'faraday',
  lechatelier: 'le chatelier',
  chatelier: 'le chatelier',
  fotosintesis: 'photosynthesis',
  mitocondria: 'mitochondria',
  stochiometry: 'stoichiometry'
};

/**
 * Curated high-yield core physics/chemistry/math formulas catalog
 * for guaranteed instant matching of common student queries.
 */
export interface PrimaryFormulaEntry {
  keywords: string[];
  name: string;
  formula: string;
  subject: SubjectName;
  chapter: string;
  topic: string;
  variables: string;
  concept: string;
  stepByStep: string[];
  examTip: string;
  trap: string;
  example?: string;
  derivation?: string[];
  variations?: string[];
}

export const PRIMARY_FORMULAS_CATALOG: PrimaryFormulaEntry[] = [
  // --- PHYSICS ---
  {
    keywords: ['force', 'what is force', 'f = ma', 'newton second law', 'bal kya hai', 'force formula'],
    name: "Newton's Second Law of Motion & Force",
    formula: String.raw`F = ma = \frac{dp}{dt}`,
    subject: 'Physics',
    chapter: 'Laws of Motion',
    topic: "Newton's Second Law",
    variables: 'F = Net external force (N), m = Inertial mass (kg), a = Linear acceleration (m/s²), p = Momentum (kg·m/s), t = Time (s)',
    concept: 'Force is an external push or pull that changes or tends to change the state of rest or uniform motion of a body. Newton’s Second Law states that net force equals the time rate of change of linear momentum (F = dp/dt = m·a for constant mass).',
    stepByStep: [
      '1. Identify all external forces acting on the body and draw a Free Body Diagram (FBD).',
      '2. Apply Newton’s Second Law along coordinate axes: Σ F_x = m a_x, Σ F_y = m a_y.',
      '3. If mass is constant: F = m a.',
      '4. 1 Newton (N) is defined as the force required to accelerate a 1 kg mass at 1 m/s².'
    ],
    examTip: 'High-yield fact: 1 Newton = 10⁵ dynes in CGS units. If momentum p(t) is a function of time, differentiate: F = dp/dt.',
    trap: 'Force is a vector quantity; remember to calculate the VECTOR resultant of all applied forces, not just scalar arithmetic addition!',
    example: `**Problem:** A net force of $20\\text{ N}$ acts on a stationary cart of mass $4\\text{ kg}$ for $3\\text{ seconds}$. Calculate:
(a) The acceleration of the cart.
(b) Its final velocity after $3\\text{ s}$.

**Given:** Force $F = 20\\text{ N}$, Mass $m = 4\\text{ kg}$, Time $t = 3\\text{ s}$, Initial velocity $u = 0$.

**Solution:**
1. Acceleration: $a = \\frac{F}{m} = \\frac{20}{4} = 5\\text{ m/s}^2$.
2. Final velocity: $v = u + at = 0 + (5 \\times 3) = 15\\text{ m/s}$.`
  },
  {
    keywords: ['kinetic energy', 'ke', 'kinetic', 'gatij urja'],
    name: 'Kinetic Energy & Momentum Relation',
    formula: String.raw`K = \frac{1}{2}m v^2 = \frac{p^2}{2m}`,
    subject: 'Physics',
    chapter: 'Work, Energy and Power',
    topic: 'Work-Energy Theorem',
    variables: 'K = Kinetic Energy (in Joules J), m = mass of the body (in kg), v = linear velocity (m/s), p = linear momentum (p = mv in kg·m/s)',
    concept: 'Kinetic energy is the mechanical work energy possessed by an object due to its motion. Work done by the net force equals the change in kinetic energy: W_net = ΔK.',
    stepByStep: [
      '1. Identify the given mass (m) and velocity (v) or linear momentum (p).',
      '2. If mass and velocity are given, apply K = (1/2) m v².',
      '3. If momentum p is given, use K = p² / (2m). Note: If momentum increases by 100%, kinetic energy quadruples (increases by 300%).',
      '4. By the Work-Energy Theorem: W_net = ΔK = (1/2)m(v_f² - v_i²).'
    ],
    examTip: 'High-frequency exam trick: For two bodies with equal momentum, the lighter body has higher kinetic energy (K ∝ 1/m when p is constant).',
    trap: 'Do not forget to convert speed from km/h to m/s by multiplying by (5/18) before squaring!'
  },
  {
    keywords: ['work done', 'work', 'karya', 'work formula'],
    name: 'Work Done by Constant & Variable Force',
    formula: String.raw`W = \vec{F} \cdot \vec{d} = F d \cos\theta, \quad W = \int_{r_i}^{r_f} \vec{F} \cdot d\vec{r}`,
    subject: 'Physics',
    chapter: 'Work, Energy and Power',
    topic: 'Work and Conservative Forces',
    variables: 'W = Work done (J), F = Magnitude of applied force (N), d = Displacement (m), θ = Angle between force vector and displacement vector',
    concept: 'Work is the scalar dot product of force and displacement vectors. Work is zero if displacement is zero, force is zero, or force is perpendicular to displacement (θ = 90°).',
    stepByStep: [
      '1. Draw a Free-Body Diagram and identify all individual forces acting on the body.',
      '2. For each force, find the angle θ relative to the direction of displacement.',
      '3. Calculate W = F d cosθ. If θ < 90°, W > 0 (accelerating). If θ = 90°, W = 0 (e.g. normal force, centripetal force). If θ > 90°, W < 0 (e.g. kinetic friction).',
      '4. For variable force F(x), integrate the area under the F-x curve: W = ∫ F(x) dx.'
    ],
    examTip: 'Work done by centripetal force in circular motion is strictly ZERO because angle θ = 90° at every instant.',
    trap: 'Work done by conservative forces (like gravity or spring force) is path-independent: W_c = -ΔU.'
  },
  {
    keywords: ['power', 'efficiency', 'shakti'],
    name: 'Instantaneous Power & Mechanical Efficiency',
    formula: String.raw`P = \frac{dW}{dt} = \vec{F} \cdot \vec{v} = F v \cos\theta, \quad \eta = \frac{P_{\text{out}}}{P_{\text{in}}} \times 100\%`,
    subject: 'Physics',
    chapter: 'Work, Energy and Power',
    topic: 'Power & Efficiency',
    variables: 'P = Power (in Watts W or J/s), F = Force vector (N), v = Velocity vector (m/s), η = Efficiency percentage (%)',
    concept: 'Power is the rate at which work is performed or energy is converted. 1 Horsepower (hp) = 746 Watts.',
    stepByStep: [
      '1. Calculate average power as P_avg = Total Work / Total Time = W / t.',
      '2. Calculate instantaneous power as P_inst = F · v = F v cosθ.',
      '3. For a motor pumping liquid of density ρ to height h at volume rate dV/dt: P = (dm/dt)gh = ρ(dV/dt)gh.'
    ],
    examTip: 'If a vehicle accelerates with constant power P, its velocity scales as v ∝ t^(1/2) and displacement as s ∝ t^(3/2).',
    trap: 'Do not confuse average power (W/Δt) with instantaneous power (F · v).'
  },
  {
    keywords: ['potential energy', 'pe', 'spring potential energy', 'gravitational potential energy'],
    name: 'Potential Energy (Gravitational & Spring)',
    formula: String.raw`U_g = mgh, \quad U_s = \frac{1}{2}k x^2, \quad F = -\frac{dU}{dx}`,
    subject: 'Physics',
    chapter: 'Work, Energy and Power',
    topic: 'Potential Energy & Springs',
    variables: 'U_g = Gravitational PE (J), U_s = Spring elastic PE (J), k = Spring constant (N/m), x = Extension/compression (m)',
    concept: 'Potential energy is the configuration energy stored in a system due to conservative forces. Force is the negative spatial gradient of potential energy.',
    stepByStep: [
      '1. Choose a reference datum level where potential energy is defined as zero (U = 0).',
      '2. For mass m at height h near Earth: U_g = mgh.',
      '3. For a Hookean spring with constant k compressed or stretched by x: U_s = (1/2) k x².',
      '4. Apply conservation of mechanical energy: K_i + U_i = K_f + U_f (in absence of non-conservative forces).'
    ],
    examTip: 'Stable equilibrium occurs at the minimum of potential energy: dU/dx = 0 and d²U/dx² > 0.',
    trap: 'Spring potential energy is ALWAYS positive regardless of whether the spring is stretched (x > 0) or compressed (x < 0).'
  },
  {
    keywords: ['ohms law', 'ohm law', 'resistance', 'resistivity', 'v ir'],
    name: "Ohm's Law & Electrical Resistance",
    formula: String.raw`V = I R, \quad R = \rho \frac{l}{A}, \quad R_T = R_0 (1 + \alpha \Delta T)`,
    subject: 'Physics',
    chapter: 'Current Electricity',
    topic: 'Resistance and Ohm’s Law',
    variables: 'V = Potential difference (Volts V), I = Current (Amperes A), R = Resistance (Ohms Ω), ρ = Resistivity (Ω·m), l = Length (m), A = Cross-sectional area (m²), α = Temperature coefficient of resistance (/°C)',
    concept: "Ohm's Law states that electric current through a conductor is directly proportional to the potential difference across its terminals, provided physical conditions (temperature, strain) remain constant.",
    stepByStep: [
      '1. State given voltage V, current I, or physical dimensions (length l, radius r).',
      '2. Use V = IR to find unknown electrical variable.',
      '3. If a wire of resistance R is stretched to n times its initial length (volume constant): New resistance R_new = n² R.',
      '4. For temperature variation: R_T = R_0(1 + α ΔT). For metals α > 0; for semiconductors α < 0.'
    ],
    examTip: 'When a wire is stretched by x% (small stretch < 5%), its resistance increases by approximately 2x%.',
    trap: "Ohm's law is NOT a universal physical law; non-ohmic devices (diodes, transistors, electrolytes) do not have linear V-I graphs."
  },
  {
    keywords: ['coulombs law', 'coulomb law', 'electrostatic force', 'electric force'],
    name: "Coulomb's Law of Electrostatics",
    formula: String.raw`F = \frac{1}{4\pi\varepsilon_0}\frac{|q_1 q_2|}{r^2} = k \frac{|q_1 q_2|}{r^2}, \quad F_{\text{med}} = \frac{F_{\text{air}}}{K}`,
    subject: 'Physics',
    chapter: 'Electric Charges and Fields',
    topic: 'Coulomb’s Law',
    variables: 'F = Electrostatic force (N), q₁, q₂ = Point charges (C), r = Separation distance (m), k = 1/(4πε₀) ≈ 9 × 10⁹ N·m²/C², K = Relative permittivity (dielectric constant)',
    concept: "Coulomb's Law quantifies the electrostatic force between two stationary point charges. Like charges repel and opposite charges attract along the line connecting their centers.",
    stepByStep: [
      '1. Convert charges into Coulombs (1 μC = 10⁻⁶ C, 1 nC = 10⁻⁹ C) and distance into meters (cm = 10⁻² m).',
      '2. Substitute magnitudes into F = (9 × 10⁹) · |q₁ q₂| / r².',
      '3. In a dielectric medium of constant K (e.g. water K = 81): F_med = F_air / K.',
      '4. If multiple charges are present, apply vector superposition: F_net = Σ F_i.'
    ],
    examTip: 'Electrostatic force obeys Newton’s Third Law: F₁₂ = -F₂₁ (equal magnitude, opposite direction, action-reaction pair).',
    trap: 'Coulomb’s law applies strictly to point charges at rest. For moving charges, magnetic forces also arise.'
  },
  {
    keywords: ['lens formula', 'lens maker formula', 'lens equation'],
    name: 'Lens Formula & Lens Maker’s Formula',
    formula: String.raw`\frac{1}{f} = \frac{1}{v} - \frac{1}{u}, \quad \frac{1}{f} = (n - 1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right), \quad P = \frac{1}{f\text{ (m)}}`,
    subject: 'Physics',
    chapter: 'Ray Optics and Optical Instruments',
    topic: 'Refraction through Lenses',
    variables: 'f = Focal length (m), v = Image distance (m), u = Object distance (m, always negative by Cartesian sign convention), P = Optical power (Diopters D), n = Refractive index of lens relative to medium',
    concept: 'Relates object distance, image distance, and focal length for thin spherical lenses. Convex lens has positive focal length (f > 0); concave lens has negative focal length (f < 0).',
    stepByStep: [
      '1. Set Cartesian sign convention: incident ray direction is positive; optical center is origin.',
      '2. Real object is on left, so u is negative (u < 0).',
      '3. Convex lens f > 0; Concave lens f < 0.',
      '4. Substitute with signs into 1/v - 1/u = 1/f to solve for image position v.',
      '5. Linear magnification: m = v / u = Height_image / Height_object.'
    ],
    examTip: 'When a convex lens (glass n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.',
    trap: 'Do not confuse with mirror formula! Lens has MINUS: (1/v - 1/u = 1/f) whereas mirror has PLUS: (1/v + 1/u = 1/f).'
  },
  {
    keywords: ['mirror formula', 'mirror equation'],
    name: 'Mirror Formula & Magnification',
    formula: String.raw`\frac{1}{f} = \frac{1}{v} + \frac{1}{u}, \quad m = -\frac{v}{u} = \frac{f}{f - u}`,
    subject: 'Physics',
    chapter: 'Ray Optics and Optical Instruments',
    topic: 'Reflection at Spherical Mirrors',
    variables: 'f = Focal length = R/2 (m), v = Image distance (m), u = Object distance (m), m = Transverse magnification',
    concept: 'Governs image formation for concave (converging, f < 0) and convex (diverging, f > 0) spherical mirrors.',
    stepByStep: [
      '1. Concave mirror: f < 0. Convex mirror: f > 0.',
      '2. Real object: u < 0.',
      '3. Substitute into 1/f = 1/v + 1/u.',
      '4. Magnification m = -v/u. If m < 0, image is real and inverted; if m > 0, image is virtual and erect.'
    ],
    examTip: 'Convex mirrors always form virtual, erect, and diminished images (m < +1) regardless of object position.',
    trap: 'Remember the negative sign in mirror magnification: m = -v/u, unlike lens magnification where m = +v/u.'
  },
  {
    keywords: ['snells law', 'snell law', 'refraction formula', 'refractive index'],
    name: "Snell's Law of Refraction",
    formula: String.raw`n_1 \sin i = n_2 \sin r, \quad \frac{\sin i}{\sin r} = \frac{n_2}{n_1} = \frac{v_1}{v_2} = \frac{\lambda_1}{\lambda_2}, \quad \sin C = \frac{1}{n}`,
    subject: 'Physics',
    chapter: 'Ray Optics and Optical Instruments',
    topic: 'Refraction of Light',
    variables: 'n₁, n₂ = Absolute refractive indices of medium 1 and 2, i = Angle of incidence, r = Angle of refraction, C = Critical angle for Total Internal Reflection (TIR)',
    concept: 'Describes the bending of a light ray when crossing the interface between two isotropic dielectric media of differing optical density.',
    stepByStep: [
      '1. Measure angles i and r from the normal to the interface (not from the boundary surface!).',
      '2. When light travels from rarer to denser medium (n₁ < n₂), ray bends TOWARDS normal (r < i).',
      '3. When light travels from denser to rarer medium (n₁ > n₂), ray bends AWAY from normal.',
      '4. Total Internal Reflection occurs when light travels from denser to rarer medium and angle of incidence i exceeds critical angle C: i > C where sin C = n_rarer / n_denser.'
    ],
    examTip: 'Frequency of light (f) remains STRICTLY CONSTANT during refraction; only speed (v) and wavelength (λ) change.',
    trap: 'Always check that angles are measured with respect to the NORMAL, not the surface plane.'
  },
  {
    keywords: [
      'de broglie', 'debroglie', 'debrolie', 'debrolige', 'debrogli', 'broglie', 'brolie',
      'matter waves', 'matter wave', 'wavelength of electron', 'dual nature', 'wave nature of matter',
      'de broglie hypothesis', 'de broglie formula', 'debrolie formula'
    ],
    name: 'de Broglie Wavelength of Matter Waves',
    formula: String.raw`\lambda = \frac{h}{p} = \frac{h}{m v} = \frac{h}{\sqrt{2mK}} = \frac{12.27}{\sqrt{V}}\text{ Å (for electron)}`,
    subject: 'Physics',
    chapter: 'Dual Nature of Radiation and Matter',
    topic: 'Wave Nature of Matter',
    variables: 'λ = de Broglie wavelength (m or Å), h = Planck’s constant (6.626 × 10⁻³⁴ J·s), p = Linear momentum (kg·m/s), m = Mass (kg), v = Velocity (m/s), K = Kinetic energy (J), V = Accelerating potential difference (Volts)',
    concept: 'Louis de Broglie (1924) hypothesized that nature is symmetrical: if electromagnetic radiation behaves as both waves and particles, moving material particles (matter) must also possess wave-like properties. The associated waves are called matter waves or de Broglie waves.',
    stepByStep: [
      '1. Fundamental Relation: λ = h / p (applies universally to photons and material particles).',
      '2. For material particles with mass m and speed v: λ = h / (m v).',
      '3. In terms of Kinetic Energy K: Since p = √(2mK) ⇒ λ = h / √(2mK).',
      '4. For charged particle accelerated by potential V: K = qV ⇒ λ = h / √(2mqV).',
      '5. High-Yield Entrance Exam Shortcuts:\n   • Electron: λ_e = 12.27 / √V Å = 1.227 / √V nm\n   • Proton: λ_p = 0.286 / √V Å\n   • Deuteron: λ_d = 0.202 / √V Å\n   • Alpha particle: λ_α = 0.101 / √V Å\n   • Thermal gas molecule at T (Kelvin): λ = h / √(3 m k_B T)'
    ],
    examTip: 'For equal kinetic energy, the particle with the smallest mass (electron) possesses the largest de Broglie wavelength (λ ∝ 1/√m).',
    trap: 'Macroscopic objects (e.g. cricket ball) have tiny wavelengths ~10⁻³⁴ m (unobservable diffraction). Subatomic electrons have λ ~ 1 Å, comparable to crystal atomic spacing (verified by Davisson-Germer).',
    example: `### Given
- Accelerating potential: $V = 100\\text{ V}$
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
4. NEET Shortcut: $\\lambda_e = \\frac{12.27}{10} = 1.227\\text{ Å} = 0.1227\\text{ nm}$

### ✅ Final Answer
- **Kinetic Energy:** $K = 100\\text{ eV} = 1.6 \\times 10^{-17}\\text{ J}$
- **de Broglie Wavelength:** $\\lambda = 1.227\\text{ Å} = 0.1227\\text{ nm}$

### ⚠️ Check
For macroscopic objects (e.g. cricket ball of mass $0.15\\text{ kg}$ thrown at $30\\text{ m/s}$), $\\lambda = \\frac{6.626 \\times 10^{-34}}{0.15 \\times 30} = 1.47 \\times 10^{-34}\\text{ m}$ is imperceptible, whereas for subatomic electrons $\\lambda \\approx 1.23\\text{ Å}$ matches crystal atomic plane spacing, confirming de Broglie matter waves experimentally.`,
    derivation: [
      '1. Photon Energy (Planck Quantum Hypothesis): E = hν = (hc) / λ.',
      '2. Mass-Energy Equivalence (Einstein): E = m c².',
      '3. Equating photon energies: m c² = (hc) / λ ⇒ λ = h / (mc) = h / p (where p = mc is photon momentum).',
      '4. De Broglie Hypothesis: By nature\'s symmetry, extend this relation to material particles with mass m and velocity v: λ = h / (mv) = h / p.',
      '5. Expressing in terms of Kinetic Energy K: Since K = p² / (2m) ⇒ p = √(2mK), we obtain λ = h / √(2mK).',
      '6. For a charged particle accelerated by potential V: K = qV ⇒ λ = h / √(2mqV).'
    ]
  },
  {
    keywords: ['acceleration', 'tavran', 'acceleration formula'],
    name: 'Acceleration (Linear & Centripetal)',
    formula: String.raw`a = \frac{dv}{dt} = \frac{v - u}{t}, \quad a = v\frac{dv}{ds}, \quad a_c = \frac{v^2}{r} = \omega^2 r`,
    subject: 'Physics',
    chapter: 'Motion in a Straight Line',
    topic: 'Acceleration & Non-Uniform Motion',
    variables: 'a = Linear acceleration (m/s²), v = Final velocity (m/s), u = Initial velocity (m/s), t = Time (s), a_c = Centripetal acceleration (m/s²), r = Radius of circular path (m), ω = Angular velocity (rad/s)',
    concept: 'Acceleration is the rate of change of velocity with respect to time. Since velocity is a vector, acceleration arises from changing speed, changing direction, or both.',
    stepByStep: [
      '1. If velocity is given as function of time v(t), take derivative: a = dv/dt.',
      '2. If velocity is given as function of position v(x), use chain rule: a = v (dv/dx).',
      '3. For circular motion with constant speed: speed is constant, but direction continuously changes, creating inward centripetal acceleration a_c = v² / r.'
    ],
    examTip: 'Zero velocity does not mean zero acceleration! At highest point of a vertically projected ball, v = 0 but a = g = 9.8 m/s² downward.',
    trap: 'Deceleration / retardation means acceleration OPPOSITE to the direction of velocity (dot product a · v < 0), not just negative acceleration.'
  },
  {
    keywords: ['equations of motion', 'kinematic equations', 'motion formula', 'v u at'],
    name: 'Kinematic Equations for Uniform Acceleration',
    formula: String.raw`v = u + at, \quad s = ut + \frac{1}{2}at^2, \quad v^2 = u^2 + 2as, \quad s_n = u + \frac{a}{2}(2n - 1)`,
    subject: 'Physics',
    chapter: 'Motion in a Straight Line',
    topic: 'Uniformly Accelerated Rectilinear Motion',
    variables: 'u = Initial velocity (m/s), v = Final velocity (m/s), a = Constant acceleration (m/s²), s = Displacement (m), t = Time elapsed (s), s_n = Distance in n-th second (m)',
    concept: 'Governs 1D motion under constant acceleration. Derived from calculus definitions of instantaneous velocity and acceleration.',
    stepByStep: [
      '1. List known variables among: u, v, a, s, t.',
      '2. Identify the single unknown to solve for.',
      '3. Pick the formula lacking the absent fifth variable.',
      '4. For vertical motion under gravity: substitute a = -g (taking upward direction as positive).'
    ],
    examTip: 'Distance traveled in successive seconds from rest under constant acceleration follows Galileo’s Odd Number Ratio: 1 : 3 : 5 : 7 : ...',
    trap: 'These equations hold ONLY when acceleration is CONSTANT. For variable acceleration a(t), integration must be used directly.'
  },
  {
    keywords: ['capacitance', 'capacitor', 'parallel plate capacitor', 'dharita'],
    name: 'Capacitance & Energy Stored in Capacitor',
    formula: String.raw`C = \frac{Q}{V}, \quad C = \frac{K \varepsilon_0 A}{d}, \quad U = \frac{1}{2} C V^2 = \frac{Q^2}{2C} = \frac{1}{2} Q V`,
    subject: 'Physics',
    chapter: 'Electrostatic Potential and Capacitance',
    topic: 'Capacitors and Dielectrics',
    variables: 'C = Capacitance (Farads F), Q = Charge on positive plate (C), V = Potential difference across plates (V), K = Dielectric constant, A = Plate area (m²), d = Separation distance (m)',
    concept: 'Capacitance measures a conductor’s ability to store electrostatic charge per unit potential difference.',
    stepByStep: [
      '1. For parallel plate capacitor in vacuum: C_0 = ε₀ A / d.',
      '2. When filled with dielectric of constant K: C = K C_0.',
      '3. In series: 1/C_eq = 1/C₁ + 1/C₂ (charge Q is identical). In parallel: C_eq = C₁ + C₂ (voltage V is identical).',
      '4. If battery is DISCONNECTED before inserting dielectric: Charge Q remains constant, V decreases (V = V_0/K), U decreases.',
      '5. If battery remains CONNECTED: Voltage V remains constant, Q increases (Q = K Q_0), U increases.'
    ],
    examTip: 'Energy density in the electric field inside a capacitor: u = (1/2) ε₀ E² (in J/m³).',
    trap: 'Always check whether the battery remains CONNECTED or is DISCONNECTED when dielectric is inserted!'
  },
  {
    keywords: ['torque', 'bal aaghurna', 'moment of force'],
    name: 'Torque & Angular Newton’s Law',
    formula: String.raw`\vec{\tau} = \vec{r} \times \vec{F} = r F \sin\theta, \quad \tau = I \alpha, \quad W = \int \tau \, d\theta`,
    subject: 'Physics',
    chapter: 'System of Particles and Rotational Motion',
    topic: 'Torque and Angular Acceleration',
    variables: 'τ = Torque (N·m), r = Position vector from pivot axis (m), F = Force vector (N), θ = Angle between r and F vectors, I = Moment of inertia (kg·m²), α = Angular acceleration (rad/s²)',
    concept: 'Torque is the rotational analog of force. It measures the turning tendency produced by a force applied at a distance from an axis of rotation.',
    stepByStep: [
      '1. Identify the pivot point / rotational axis.',
      '2. Determine the lever arm (perpendicular distance from axis to line of action of force): r_perp = r sinθ.',
      '3. Calculate torque magnitude: τ = F · r_perp.',
      '4. Direction is determined by Right-Hand Rule: curl fingers from r to F; thumb points in direction of torque vector.',
      '5. Apply rotational dynamics: Σ τ = I α.'
    ],
    examTip: 'A force passing directly through the axis of rotation produces ZERO torque because lever arm r_perp = 0.',
    trap: 'Torque has the same dimensional formula as work/energy ([M L² T⁻²]), but torque is a VECTOR measured in N·m, not Joules!'
  },

  // --- CHEMISTRY ---
  {
    keywords: ['ideal gas law', 'ideal gas equation', 'ideal gas', 'pv nrt'],
    name: 'Ideal Gas Equation & Gas Densities',
    formula: String.raw`P V = n R T = \frac{m}{M} R T, \quad \rho = \frac{P M}{R T}, \quad \frac{P_1 V_1}{T_1} = \frac{P_2 V_2}{T_2}`,
    subject: 'Chemistry',
    chapter: 'States of Matter: Gases and Liquids',
    topic: 'Gas Laws and Ideal Behavior',
    variables: 'P = Pressure (atm or Pa), V = Volume (L or m³), n = Number of moles, R = Universal gas constant (0.0821 L·atm/(mol·K) or 8.314 J/(mol·K)), T = Absolute temperature (in Kelvin K = °C + 273.15), M = Molar mass (g/mol)',
    concept: 'Combines Boyle’s, Charles’s, Gay-Lussac’s, and Avogadro’s Laws into a single equation of state for hypothetical ideal gases having zero molecular volume and zero intermolecular attractions.',
    stepByStep: [
      '1. ALWAYS convert temperature to Kelvin: T(K) = T(°C) + 273.15.',
      '2. If using P in atm and V in Liters: use R = 0.0821 L·atm·mol⁻¹·K⁻¹.',
      '3. If using P in Pa (N/m²) and V in m³: use R = 8.314 J·mol⁻¹·K⁻¹.',
      '4. Density of ideal gas: ρ = (P M) / (R T).'
    ],
    examTip: 'Real gases behave most ideally under conditions of LOW PRESSURE and HIGH TEMPERATURE.',
    trap: 'Never calculate with temperature in Celsius; absolute Kelvin temperature is strictly required!'
  },
  {
    keywords: ['ph', 'ph formula', 'poh', 'hydrogen ion concentration'],
    name: 'pH & pOH Calculations in Aqueous Solutions',
    formula: String.raw`\text{pH} = -\log_{10}[\text{H}^+], \quad \text{pOH} = -\log_{10}[\text{OH}^-], \quad \text{pH} + \text{pOH} = 14 \text{ (at 25°C)}`,
    subject: 'Chemistry',
    chapter: 'Equilibrium',
    topic: 'Ionic Equilibrium & pH',
    variables: '[H⁺] = Hydronium ion molarity (mol/L), [OH⁻] = Hydroxide ion molarity (mol/L), K_w = Ionic product of water = 1.0 × 10⁻¹⁴ at 25°C',
    concept: 'Logarithmic scale invented by Sørensen measuring acidity and alkalinity. Each 1-unit decrease in pH represents a 10-fold increase in [H⁺] concentration.',
    stepByStep: [
      '1. For strong monoprotic acid of molarity M: [H⁺] = M. Then pH = -log₁₀(M).',
      '2. For very dilute acids (e.g. 10⁻⁸ M HCl): account for water auto-ionization: [H⁺]_total = 10⁻⁸ + [H⁺]_water ≈ 1.05 × 10⁻⁷ M ⇒ pH ≈ 6.98 (NEVER pH = 8 for an acid!).',
      '3. For weak acid: [H⁺] = √(K_a · C) ⇒ pH = (1/2)[pK_a - log₁₀ C].'
    ],
    examTip: 'Water auto-ionization is endothermic: at higher temperatures (e.g. 60°C), K_w increases, neutral pH decreases below 7 (neutral water pH ≈ 6.5 at 60°C).',
    trap: 'An acidic solution can NEVER have a pH greater than 7 at 25°C regardless of how dilute it is!'
  },
  {
    keywords: ['nernst equation', 'nernst', 'cell potential', 'emf formula'],
    name: 'Nernst Equation for Electrochemical Cell EMF',
    formula: String.raw`E_{\text{cell}} = E^\circ_{\text{cell}} - \frac{2.303 RT}{n F}\log_{10} Q = E^\circ_{\text{cell}} - \frac{0.0591}{n}\log_{10} Q \text{ (at 298 K)}`,
    subject: 'Chemistry',
    chapter: 'Electrochemistry',
    topic: 'Electrochemical Cells and Nernst Equation',
    variables: 'E_cell = Non-standard cell potential (V), E°_cell = Standard cell potential = E°_cathode - E°_anode, n = Number of electrons transferred in balanced cell reaction, Q = Reaction quotient = [Products]^p / [Reactants]^r',
    concept: 'Calculates reduction potential and electromotive force of a galvanic cell under non-standard concentrations and temperatures.',
    stepByStep: [
      '1. Write balanced half-cell reactions and determine standard potentials from electrochemical series.',
      '2. Calculate E°_cell = E°_cathode (reduction) - E°_anode (reduction).',
      '3. Identify total moles of electrons transferred n in the overall balanced redox reaction.',
      '4. Formulate reaction quotient Q with only aqueous ions and gases (pure solids and liquids have activity = 1).',
      '5. Substitute: E_cell = E°_cell - (0.0591 / n) log₁₀ Q.'
    ],
    examTip: 'At electrochemical equilibrium: E_cell = 0 and Q = K_c ⇒ E°_cell = (0.0591 / n) log₁₀ K_c.',
    trap: 'Do not multiply E° reduction potential values by stoichiometric coefficients; E° is an INTENSIVE property!'
  },

  // --- MATHEMATICS ---
  {
    keywords: ['quadratic formula', 'quadratic equation', 'shridharacharya', 'roots of quadratic'],
    name: 'Quadratic Formula (Shridharacharya Rule) & Discriminant',
    formula: String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}, \quad D = b^2 - 4ac, \quad \alpha + \beta = -\frac{b}{a}, \quad \alpha \beta = \frac{c}{a}`,
    subject: 'Mathematics',
    chapter: 'Complex Numbers and Quadratic Equations',
    topic: 'Quadratic Equations and Roots',
    variables: 'a, b, c = Real coefficients with a ≠ 0, D = Discriminant, α, β = Roots of the equation ax² + bx + c = 0',
    concept: 'Gives the exact closed-form roots of any quadratic equation. The discriminant D determines the nature of the roots.',
    stepByStep: [
      '1. Write equation in standard form: a x² + b x + c = 0.',
      '2. Compute discriminant: D = b² - 4ac.',
      '3. If D > 0: Two distinct real roots.',
      '4. If D = 0: Two equal real roots (x = -b / 2a).',
      '5. If D < 0: Conjugate pair of complex roots: x = (-b ± i√|D|) / (2a).',
      '6. Vieta’s formulas: Sum of roots α + β = -b/a; Product of roots αβ = c/a.'
    ],
    examTip: 'If a + b + c = 0, the roots are immediately x = 1 and x = c/a without calculating discriminant!',
    trap: 'Remember the denominator is 2a, NOT just 2!'
  },
  {
    keywords: ['integration by parts', 'by parts', 'uv rule integration'],
    name: 'Integration by Parts (ILATE Rule)',
    formula: String.raw`\int u \, v \, dx = u \int v \, dx - \int \left( \frac{du}{dx} \int v \, dx \right) dx`,
    subject: 'Mathematics',
    chapter: 'Integrals',
    topic: 'Integration Techniques',
    variables: 'u = First function chosen by ILATE priority, v = Second function to be easily integrated',
    concept: 'Product rule for indefinite and definite integration. Priority for selecting u follows the ILATE mnemonic:',
    stepByStep: [
      '1. Choose first function u using ILATE priority:',
      '   I = Inverse trigonometric (sin⁻¹x, tan⁻¹x)',
      '   L = Logarithmic (ln x, log x)',
      '   A = Algebraic (x, x², x³)',
      '   T = Trigonometric (sin x, cos x)',
      '   E = Exponential (e^x, a^x)',
      '2. Differentiate u to find du/dx.',
      '3. Integrate v to find ∫ v dx.',
      '4. Substitute into formula: u · (∫ v dx) - ∫ (u\' · ∫ v dx) dx.'
    ],
    examTip: 'For integrating solitary functions like ∫ ln(x) dx or ∫ tan⁻¹(x) dx, take 1 as the algebraic second function v: ∫ ln(x) · 1 dx.',
    trap: 'Do not forget the negative sign before the second integral in the formula!'
  },
  {
    keywords: ['derivative of sin', 'derivative of sinx', 'derivative of sin x', 'd/dx sin', 'diff of sin', 'differentiation of sin'],
    name: 'Derivative of Sine Function & Trigonometric Derivatives',
    formula: String.raw`\frac{d}{dx}(\sin x) = \cos x, \quad \frac{d}{dx}(\cos x) = -\sin x, \quad \frac{d}{dx}(\tan x) = \sec^2 x`,
    subject: 'Mathematics',
    chapter: 'Continuity and Differentiability',
    topic: 'Differentiation of Trigonometric Functions',
    variables: 'x = Independent variable in radians, \\sin x = Sine function, \\cos x = Cosine function, \\sec^2 x = Secant squared',
    concept: 'By first principles (definition of derivative): f\'(x) = lim_{h->0} [sin(x+h) - sin(x)] / h = cos(x). The derivative measures the instantaneous rate of change and slope of the tangent to the curve.',
    stepByStep: [
      '1. State the function: y = sin(x).',
      '2. Apply first principles or standard differentiation table: d/dx [sin(x)] = cos(x).',
      '3. If compound argument y = sin(kx): by chain rule, d/dx [sin(kx)] = k · cos(kx).',
      '4. If powers are involved: d/dx [sin^n(x)] = n · sin^(n-1)(x) · cos(x).'
    ],
    examTip: 'Trigonometric angles in calculus formulas MUST always be evaluated in RADIANS, never in degrees (d/dx [sin(x°)] = (π/180) cos(x°)).',
    trap: 'Beware of the negative sign for co-functions: d/dx(cos x) = -sin x, d/dx(cot x) = -csc² x, d/dx(csc x) = -csc x cot x!',
    example: `**Problem:** Find the derivative of $y = \\sin(3x^2 + 5)$.
**Solution:**
1. Let $u = 3x^2 + 5$, then $y = \\sin(u)$.
2. By the Chain Rule: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$.
3. $\\frac{dy}{du} = \\cos(u) = \\cos(3x^2 + 5)$.
4. $\\frac{du}{dx} = 6x$.
5. Final Answer: $\\frac{dy}{dx} = 6x \\cos(3x^2 + 5)$.`
  },
  {
    keywords: ['chain rule', 'product rule', 'quotient rule', 'derivative rules', 'differentiation rules'],
    name: 'Fundamental Rules of Differentiation (Chain, Product & Quotient)',
    formula: String.raw`\frac{d}{dx}[u \cdot v] = u \frac{dv}{dx} + v \frac{du}{dx}, \quad \frac{d}{dx}\left[\frac{u}{v}\right] = \frac{v \frac{du}{dx} - u \frac{dv}{dx}}{v^2}, \quad \frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)`,
    subject: 'Mathematics',
    chapter: 'Continuity and Differentiability',
    topic: 'Rules of Differentiation',
    variables: 'u, v = Differentiable functions of x, f, g = Composite functions',
    concept: 'Core rules governing analytical differentiation for product of functions (Leibniz product rule), quotient of functions, and composite functions (chain rule).',
    stepByStep: [
      '1. Product Rule: Keep first, differentiate second + keep second, differentiate first.',
      '2. Quotient Rule: (Denominator · d/dx[Numerator] - Numerator · d/dx[Denominator]) / (Denominator)²',
      '3. Chain Rule: Differentiate the outer function, evaluate at inner function, then multiply by derivative of inner function.'
    ],
    examTip: 'In JEE Main, logarithmic differentiation is fastest when functions are in exponent form y = [f(x)]^[g(x)]: take ln on both sides first!',
    trap: 'In quotient rule, the order of terms in numerator matters: v · u\' - u · v\', NOT u · v\' - v · u\'!'
  },
  {
    keywords: ['dot product', 'scalar product', 'vector dot product', 'adotb'],
    name: 'Vector Dot Product (Scalar Product) & Projection',
    formula: String.raw`\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos\theta = a_x b_x + a_y b_y + a_z b_z, \quad \cos\theta = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| |\vec{b}|}`,
    subject: 'Mathematics',
    chapter: 'Vector Algebra',
    topic: 'Scalar Product of Vectors',
    variables: 'a, b = Vectors, θ = Angle between them (0 ≤ θ ≤ π), a_x, a_y, a_z = Components along cartesian axes',
    concept: 'Measures the magnitude of projection of one vector along another. If two non-zero vectors are perpendicular (orthogonal), their dot product is identically ZERO.',
    stepByStep: [
      '1. Express vectors in Cartesian form: a = a_x i + a_y j + a_z k and b = b_x i + b_y j + b_z k.',
      '2. Compute component-wise product: a · b = a_x b_x + a_y b_y + a_z b_z.',
      '3. To test orthogonality: Check if a · b = 0.',
      '4. Projection of a on b: Projection = (a · b) / |b|.'
    ],
    examTip: 'High-yield condition: Two vectors are perpendicular if and only if their scalar product is zero: a · b = 0.',
    trap: 'Dot product produces a SCALAR quantity, never a vector! Do not attach i, j, k unit vectors to the dot product result.'
  },

  // --- BIOLOGY ---
  {
    keywords: ['photosynthesis', 'calvin cycle', 'light reaction', 'c4 pathway', 'photophosphorylation', 'rubisco'],
    name: 'Photosynthesis & Photophosphorylation Equations',
    formula: String.raw`6\text{CO}_2 + 12\text{H}_2\text{O} \xrightarrow[\text{Chlorophyll}]{\text{Light}} \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{H}_2\text{O} + 6\text{O}_2 \uparrow`,
    subject: 'Biology',
    chapter: 'Photosynthesis in Higher Plants',
    topic: 'Light and Dark Reactions',
    variables: 'CO₂ = Carbon dioxide fixed by RuBisCO, H₂O = Electron & proton donor (photolysis at PSII), C₆H₁₂O₆ = Glucose synthesized, O₂ = Byproduct released',
    concept: 'Physico-chemical process converting solar electromagnetic energy into chemical energy stored in glucose via Light Reaction (ATP & NADPH synthesis) and Dark Reaction (Calvin Cycle CO₂ fixation).',
    stepByStep: [
      '1. Light Reaction (Thylakoids): Photolysis of water (2H₂O → 4H⁺ + 4e⁻ + O₂) at Oxygen Evolving Complex (PSII).',
      '2. Z-scheme electron transport generates proton gradient (ΔpH) across thylakoid membrane.',
      '3. Chemiosmosis: CF₀-CF₁ ATP synthase generates ATP; NADP⁺ reductase produces NADPH.',
      '4. Dark Reaction (Calvin Cycle in Stroma): 3 phases: (a) Carboxylation by RuBisCO, (b) Reduction using ATP & NADPH to triose phosphate, (c) Regeneration of RuBP.',
      '5. Net stoichiometry for 1 glucose: 6 CO₂ + 18 ATP + 12 NADPH → 1 Glucose.'
    ],
    examTip: 'RuBisCO is the most abundant protein on Earth. In C4 plants (Kranz anatomy, e.g. Maize, Sugarcane), PEP carboxylase eliminates photorespiration.',
    trap: 'Light is NOT directly required in the dark reaction (Calvin cycle), but it depends on the products (ATP & NADPH) of light reaction.'
  },
  {
    keywords: ['cell respiration', 'glycolysis', 'krebs cycle', 'cellular respiration', 'atp yield'],
    name: 'Cellular Respiration & Glycolysis Net Balance',
    formula: String.raw`\text{C}_6\text{H}_{12}\text{O}_6 + 6\text{O}_2 \to 6\text{CO}_2 + 6\text{H}_2\text{O} + 36\text{ to }38\text{ ATP}`,
    subject: 'Biology',
    chapter: 'Respiration in Plants',
    topic: 'Glycolysis, Krebs Cycle & Oxidative Phosphorylation',
    variables: 'Glucose = Substrate, ATP = Adenosine Triphosphate (energy currency), NADH & FADH₂ = High-energy electron carriers',
    concept: 'Catabolic breakdown of glucose via Glycolysis (cytoplasm), Link Reaction & Krebs Cycle (mitochondrial matrix), and Electron Transport System (inner mitochondrial membrane).',
    stepByStep: [
      '1. Glycolysis (EMP Pathway, 10 steps): 1 Glucose → 2 Pyruvate + 2 Net ATP + 2 NADH (in cytoplasm).',
      '2. Link Reaction: 2 Pyruvate + 2 CoA + 2 NAD⁺ → 2 Acetyl-CoA + 2 CO₂ + 2 NADH.',
      '3. TCA / Krebs Cycle: 2 Acetyl-CoA yield 4 CO₂ + 6 NADH + 2 FADH₂ + 2 GTP (ATP).',
      '4. Oxidative Phosphorylation (ETS): 1 NADH → 3 ATP, 1 FADH₂ → 2 ATP (via Complexes I-IV and Complex V ATP Synthase).'
    ],
    examTip: 'Glycolysis is common to both aerobic and anaerobic respiration and does NOT require oxygen.',
    trap: 'Respiratory Quotient (RQ) = Volume of CO₂ evolved / Volume of O₂ consumed. RQ for Carbohydrates = 1.0, Fats = 0.7, Proteins = 0.9.'
  }
];

export interface FormulaKnowledgeMatch {
  found: boolean;
  name: string;
  formula: string;
  subject: SubjectName;
  chapter: string;
  topic: string;
  variables: string;
  concept: string;
  stepByStep: string[];
  examTip: string;
  trap: string;
  example?: string;
  derivation?: string[];
  detectedIntent: 'example' | 'formula' | 'derivation' | 'concept';
  formattedAnswer: string;
}

export function formatKnowledgeAnswer(
  entry: {
    name: string;
    formula: string;
    variables: string;
    concept: string;
    stepByStep: string[];
    examTip: string;
    trap: string;
    example?: string;
    derivation?: string[];
    subject?: string;
  },
  intent: 'example' | 'formula' | 'derivation' | 'concept',
  isHinglish: boolean = false,
  targetExam?: string
): string {
  const isJee = (targetExam && targetExam.toUpperCase().includes('JEE')) || entry.subject === 'Mathematics';
  const examName = isJee ? 'JEE Main / Advanced' : 'NEET-UG';
  const highYieldHeading = isJee ? '### 🔥 JEE High-Yield Points' : '### 🔥 NEET Important Points';
  const trickHeading = isJee ? '### 🎯 JEE Speed Hack' : '### 🎯 NEET Trick';

  if (intent === 'example') {
    if (entry.example && entry.example.includes('### Given')) {
      return entry.example;
    }
    return `### Given
Standard initial parameters for **${entry.name}**.

### Find
Primary calculated output variable in **${entry.name}**.

### Formula
$$${entry.formula}$$

### Substitution
Substitute given SI values into the governing relation:
$$${entry.formula}$$

### Calculation
${entry.stepByStep.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}

${entry.example ? `\n**Worked Reference Case:**\n${entry.example}\n` : ''}

### ✅ Final Answer
Calculated variable evaluated in consistent SI units.

### ⚠️ Check
${entry.trap || 'Check unit conversions, sign conventions, and physical boundary conditions.'}`;
  }

  if (intent === 'formula') {
    return `### 📚 Concept
**${entry.name}** — High-yield mathematical relationships and formula sheet for ${examName}.

### 🧮 Formula
$$${entry.formula}$$

### 🔤 Variables
${entry.variables}

${highYieldHeading}
- ⭐ **Must Know:** ${entry.examTip}
- ⚡ **High Priority:** High-yield in direct formula substitution and ratio-based numerical questions.

### ⚠️ Common Mistake
${entry.trap}

${trickHeading}
Exam Shortcut: Check dimensional consistency of options to quickly eliminate incorrect MCQ options before detailed calculation.

### 📝 Quick Check
Quick Check: Are all parameters in the governing relation expressed in consistent SI units?`;
  }

  if (intent === 'derivation') {
    return `### 📚 Concept
**${entry.name}** — Step-by-step physical formulation and mathematical derivation for ${examName}.

### 🧮 Formula
$$${entry.formula}$$

### 🔤 Variables
${entry.variables}

### 🔢 Step-by-Step Derivation
${(entry.derivation && entry.derivation.join('\n\n')) || entry.stepByStep.join('\n\n')}

${highYieldHeading}
${entry.examTip}

### ⚠️ Common Mistake
${entry.trap}`;
  }

  // Default 'concept'
  return `### 📚 Concept
${entry.concept}

### 💡 Easy Explanation
In simple terms: ${entry.concept}\n\n**Core Physical / Mathematical Principles:**\n${entry.stepByStep.slice(0, 3).map(s => `• ${s}`).join('\n')}

### 🧮 Formula
$$${entry.formula}$$

### 🔤 Variables
${entry.variables}

${highYieldHeading}
- ⭐ **Must Know:** ${entry.examTip}
- ⚡ **Exam High-Yield Focus:** Master boundary conditions and graphical dependencies.

### ⚠️ Common Mistake
${entry.trap}

${trickHeading}
Exam Trick: Use ratio and proportionality method rather than computing absolute values whenever evaluating variations.

### 📝 Quick Check
Quick Check: By what factor does the output change if the primary independent variable is doubled?`;
}

/**
 * Searches all formulas using:
 * 1. Curated PRIMARY_FORMULAS_CATALOG (exact keyword & typo-corrected match)
 * 2. Full comprehensiveFormulaNotes (895 items)
 */
export function searchFormulaKnowledge(
  userQuery: string,
  preferredSubject?: string,
  preferredChapter?: string,
  targetExam?: string
): FormulaKnowledgeMatch | null {
  if (!userQuery || typeof userQuery !== 'string') return null;

  const userLower = userQuery.toLowerCase().trim();
  const isHinglish = detectLanguageMode(userQuery) === 'hinglish';

  // 1. Detect Intent from raw query before stripping words
  let detectedIntent: 'example' | 'formula' | 'derivation' | 'concept' = 'concept';
  if (/\b(example|examples|with example|worked example|numerical|numerical example|problem|problems|sawal|udaharana|ek example|solve an example)\b/i.test(userLower)) {
    detectedIntent = 'example';
  } else if (/\b(derive|derivation|kaise aaya|proof|prove that|how to derive)\b/i.test(userLower)) {
    detectedIntent = 'derivation';
  } else if (/\b(formula|formulas|equation|equations|sutra|sambandh|mathematical expression|relation|relations)\b/i.test(userLower)) {
    detectedIntent = 'formula';
  }

  // 2. Normalize typos and phonetic misspellings
  let correctedQuery = userLower;
  for (const [typo, fixed] of Object.entries(SCIENTIFIC_SPELLING_FIXES)) {
    const rx = new RegExp(`\\b${typo}\\b`, 'gi');
    correctedQuery = correctedQuery.replace(rx, fixed);
  }

  const cleanQ = normalizeText(
    correctedQuery
      .replace(/\b(what|is|the|formula|of|for|give|me|tell|equation|expression|state|define|write|calculate|find|how|value|ka|kya|hai|batao|hota|h|a|an|in|to|by|step|steps|example|examples|problem|problems|question|questions|chapter|topic|concept|method|solution|sir|please|karo|do|samjhao|explain|show|detail|details|about|process|processes|law|laws|rule|rules|type|types|diagram|notes|important)\b/gi, ' ')
  );

  const queryTokens = cleanQ.split(' ').filter((t) => t.length > 2);

  // 3. Check Primary Formulas Catalog First (Highest precision)
  // First try with preferred subject if provided, then fallback to any subject
  const checkCatalogMatch = (entry: PrimaryFormulaEntry) => {
    for (const kw of entry.keywords) {
      const normKw = normalizeText(kw);
      const isMatch =
        (cleanQ && (cleanQ === normKw || cleanQ.includes(normKw) || normKw.includes(cleanQ))) ||
        (queryTokens.length > 0 && queryTokens.every((t) => normKw.includes(t))) ||
        (correctedQuery.includes(normKw));

      if (isMatch) {
        return {
          found: true,
          name: entry.name,
          formula: entry.formula,
          subject: entry.subject,
          chapter: entry.chapter,
          topic: entry.topic,
          variables: entry.variables,
          concept: entry.concept,
          stepByStep: entry.stepByStep,
          examTip: entry.examTip,
          trap: entry.trap,
          example: entry.example,
          derivation: entry.derivation,
          detectedIntent,
          formattedAnswer: formatKnowledgeAnswer(entry, detectedIntent, isHinglish, targetExam)
        };
      }
    }
    return null;
  };

  if (preferredSubject) {
    for (const entry of PRIMARY_FORMULAS_CATALOG) {
      if (entry.subject.toLowerCase() === preferredSubject.toLowerCase()) {
        const m = checkCatalogMatch(entry);
        if (m) return m;
      }
    }
  }

  // Fallback search across all subjects in catalog
  for (const entry of PRIMARY_FORMULAS_CATALOG) {
    if (!preferredSubject || entry.subject.toLowerCase() !== preferredSubject.toLowerCase()) {
      const m = checkCatalogMatch(entry);
      if (m) return m;
    }
  }

  // 4. Search through comprehensiveFormulaNotes
  let bestMatch: any = null;
  let highestScore = 0;

  for (const item of comprehensiveFormulaNotes) {
    if (preferredSubject && item.subject.toLowerCase() !== preferredSubject.toLowerCase()) {
      continue;
    }

    let chapterBoost = 1.0;
    if (preferredChapter && normalizeText(item.chapter).includes(normalizeText(preferredChapter))) {
      chapterBoost = 2.0;
    }

    const normTopic = normalizeText(item.topic);
    const normChapter = normalizeText(item.chapter);

    for (const f of item.formulas) {
      const normFName = normalizeText(f.name);
      let score = 0;
      let matchedFormulaTokens = 0;
      let matchedTokens = 0;

      if (cleanQ && (normFName === cleanQ || normFName.includes(cleanQ))) {
        score += 80;
        matchedFormulaTokens++;
        matchedTokens++;
      }

      for (const tok of queryTokens) {
        if (normFName.includes(tok)) {
          score += 45;
          matchedFormulaTokens++;
          matchedTokens++;
        } else if (normTopic.includes(tok)) {
          score += 10;
          matchedTokens++;
        } else if (normChapter.includes(tok)) {
          score += 5;
          matchedTokens++;
        }
      }

      // If NONE of the user tokens matched the actual formula name, do not treat as formula match!
      if (matchedFormulaTokens === 0 && !cleanQ.includes(normFName) && !normFName.includes(cleanQ)) {
        continue;
      }

      if (queryTokens.length > 0 && matchedTokens === queryTokens.length) {
        score += 30;
      }

      score *= chapterBoost;

      const minScoreRequired = queryTokens.length >= 2 ? 55 : 45;

      if (score > highestScore && score >= minScoreRequired && matchedFormulaTokens > 0) {
        highestScore = score;
        const entryObj = {
          name: f.name,
          formula: f.formula,
          variables: f.variables || 'Standard physical/chemical SI variables.',
          concept: item.concept || `${item.chapter} — ${item.topic}`,
          stepByStep: [
            `1. Identify known parameters in ${f.name}.`,
            `2. Apply formula: ${f.formula}.`,
            `3. Verify units and sign conventions before final substitution.`
          ],
          examTip: f.examTip || 'High-yield relation for entrance examinations.',
          trap: f.trap || 'Watch out for unit mismatch and sign conventions.'
        };
        bestMatch = {
          found: true,
          name: f.name,
          formula: f.formula,
          subject: item.subject,
          chapter: item.chapter,
          topic: item.topic,
          variables: entryObj.variables,
          concept: entryObj.concept,
          stepByStep: entryObj.stepByStep,
          examTip: entryObj.examTip,
          trap: entryObj.trap,
          detectedIntent,
          formattedAnswer: formatKnowledgeAnswer(entryObj, detectedIntent, isHinglish)
        };
      }
    }
  }

  return bestMatch;
}
