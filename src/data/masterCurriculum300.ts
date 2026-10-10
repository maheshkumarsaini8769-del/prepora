/**
 * Master Curriculum Data: 30 Chapters × 10 Micro-Topics Per Subject
 * Physics (30 Ch), Chemistry (30 Ch), Mathematics (30 Ch) & Biology (30 Ch)
 * Designed for Prepora's Automated Daily Lecture + DPP + Bi-Monthly Exam Engine
 */

export interface CurriculumTopic {
  topicNumber: number;
  topicName: string;
  recommendedLectureMinutes: number;
  dppQuestionCount: number;
}

export interface CurriculumChapter {
  chapterNumber: number;
  chapterName: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
  classLevel: '11' | '12';
  weightage: 'High' | 'Medium' | 'Low';
  topics: CurriculumTopic[];
}

// -------------------------------------------------------------
// PHYSICS: 30 CHAPTERS × 10 TOPICS = 300 TOPICS
// -------------------------------------------------------------
export const physics30Chapters: CurriculumChapter[] = [
  {
    chapterNumber: 1,
    chapterName: 'Units, Dimensions & Measurements',
    subject: 'Physics',
    classLevel: '11',
    weightage: 'High',
    topics: [
      { topicNumber: 1, topicName: 'SI Units and Base Quantities', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 2, topicName: 'Dimensional Analysis and Dimensional Formulae', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 3, topicName: 'Principle of Homogeneity of Dimensions', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 4, topicName: 'Derivation of Formulae using Dimensions', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 5, topicName: 'Errors in Measurement: Absolute, Relative & Percentage', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 6, topicName: 'Combination and Propagation of Errors', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 7, topicName: 'Significant Figures and Rounding Off Rules', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 8, topicName: 'Vernier Calipers: Least Count and Zero Error', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 9, topicName: 'Screw Gauge: Pitch, Least Count and Backlash', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 10, topicName: 'High-Yield Trap Questions and Summary Practice', recommendedLectureMinutes: 45, dppQuestionCount: 15 }
    ]
  },
  {
    chapterNumber: 2,
    chapterName: 'Mathematical Tools & Vectors',
    subject: 'Physics',
    classLevel: '11',
    weightage: 'High',
    topics: [
      { topicNumber: 1, topicName: 'Scalar vs Vector Quantities and Triangle Law', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 2, topicName: 'Parallelogram Law of Vector Addition', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 3, topicName: 'Resolution of Vectors into Orthogonal Components', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 4, topicName: 'Scalar (Dot) Product of Two Vectors', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 5, topicName: 'Vector (Cross) Product and Right Hand Rule', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 6, topicName: 'Basic Differentiation for Physical Quantities', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 7, topicName: 'Maxima and Minima in Physics Problems', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 8, topicName: 'Definite and Indefinite Integration Basics', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 9, topicName: 'Area Under Curves and Physical Significance', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 10, topicName: 'Vector Field and Unit Vector Master Problems', recommendedLectureMinutes: 45, dppQuestionCount: 15 }
    ]
  },
  {
    chapterNumber: 3,
    chapterName: 'Motion in a Straight Line',
    subject: 'Physics',
    classLevel: '11',
    weightage: 'High',
    topics: [
      { topicNumber: 1, topicName: 'Frame of Reference, Position, Distance vs Displacement', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 2, topicName: 'Average Speed vs Instantaneous Velocity', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 3, topicName: 'Uniform Acceleration and Equations of Motion', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 4, topicName: 'Calculus Method for Variable Acceleration in 1D', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 5, topicName: 'Motion Under Gravity: Upward and Downward Throw', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 6, topicName: 'Stopping Distance and Driver Reaction Time', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 7, topicName: 'Relative Velocity in One Dimension', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 8, topicName: 'Position-Time and Velocity-Time Graph Slopes', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 9, topicName: 'Acceleration-Time Graphs and Area Calculations', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 10, topicName: 'Overtaking, Balloon Problems and Kinematics DPP', recommendedLectureMinutes: 45, dppQuestionCount: 15 }
    ]
  },
  {
    chapterNumber: 4,
    chapterName: 'Motion in a Plane (2D Kinematics)',
    subject: 'Physics',
    classLevel: '11',
    weightage: 'High',
    topics: [
      { topicNumber: 1, topicName: 'Position, Velocity and Acceleration Vectors in 2D', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 2, topicName: 'Ground-to-Ground Projectile: Time of Flight & Range', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 3, topicName: 'Maximum Height and Velocity at Any Instant', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 4, topicName: 'Equation of Trajectory of Projectile Motion', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 5, topicName: 'Horizontal Projectile from a Tower', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 6, topicName: 'Oblique Projectile from a Height', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 7, topicName: 'Projectile on an Inclined Plane', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 8, topicName: 'Relative Velocity in 2D: River-Boat Problems', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 9, topicName: 'Rain-Man Problems and Wind-Plane Numericals', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 10, topicName: 'Uniform Circular Motion: Centripetal Acceleration', recommendedLectureMinutes: 45, dppQuestionCount: 15 }
    ]
  },
  {
    chapterNumber: 5,
    chapterName: "Newton's Laws of Motion & Friction",
    subject: 'Physics',
    classLevel: '11',
    weightage: 'High',
    topics: [
      { topicNumber: 1, topicName: 'First Law of Motion and Concept of Inertia', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 2, topicName: 'Second Law of Motion: F=dp/dt and Impulse', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 3, topicName: 'Third Law of Motion and Action-Reaction Pairs', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 4, topicName: 'Free Body Diagrams (FBD) and Normal Contact Force', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 5, topicName: 'Tension in Strings and Connected Body Dynamics', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 6, topicName: 'Atwood Machine and Movable Pulley Constraints', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 7, topicName: 'Static, Limiting and Kinetic Friction Principles', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 8, topicName: 'Angle of Friction and Angle of Repose', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 9, topicName: 'Two-Block and Multi-Block Friction Systems', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 10, topicName: 'Banking of Roads and Circular Motion with Friction', recommendedLectureMinutes: 45, dppQuestionCount: 15 }
    ]
  },
  {
    chapterNumber: 6,
    chapterName: 'Work, Energy and Power',
    subject: 'Physics',
    classLevel: '11',
    weightage: 'High',
    topics: [
      { topicNumber: 1, topicName: 'Work Done by Constant and Variable Forces', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 2, topicName: 'Work Done by Gravitational and Spring Forces', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 3, topicName: 'Work-Energy Theorem for a Particle', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 4, topicName: 'Conservative vs Non-Conservative Forces', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 5, topicName: 'Potential Energy Function and F = -dU/dx', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 6, topicName: 'Equilibrium Types: Stable, Unstable and Neutral', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 7, topicName: 'Conservation of Mechanical Energy', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 8, topicName: 'Vertical Circular Motion and Critical Speeds', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 9, topicName: 'Power: Average, Instantaneous and Efficiency', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 10, topicName: 'Elastic and Inelastic Collisions in 1D and 2D', recommendedLectureMinutes: 45, dppQuestionCount: 15 }
    ]
  },
  {
    chapterNumber: 7,
    chapterName: 'Rotational Motion & System of Particles',
    subject: 'Physics',
    classLevel: '11',
    weightage: 'High',
    topics: [
      { topicNumber: 1, topicName: 'Center of Mass of Discrete Particle Systems', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 2, topicName: 'Center of Mass of Continuous Rigid Bodies', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 3, topicName: 'Motion of Center of Mass and Conservation of Momentum', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 4, topicName: 'Torque and Angular Acceleration: Tau = I alpha', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 5, topicName: 'Moment of Inertia and Radius of Gyration', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 6, topicName: 'Parallel and Perpendicular Axes Theorems', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 7, topicName: 'Rotational Kinetic Energy and Work-Energy Principle', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 8, topicName: 'Angular Momentum and its Conservation (L = I omega)', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 9, topicName: 'Pure Rolling Motion without Slipping on Flat Ground', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 10, topicName: 'Rolling on an Inclined Plane and Toppling Conditions', recommendedLectureMinutes: 45, dppQuestionCount: 15 }
    ]
  },
  {
    chapterNumber: 8,
    chapterName: 'Gravitation & Planetary Motion',
    subject: 'Physics',
    classLevel: '11',
    weightage: 'Medium',
    topics: [
      { topicNumber: 1, topicName: "Newton's Universal Law of Gravitation & Principle of Superposition", recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 2, topicName: 'Acceleration Due to Gravity and Variation with Altitude', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 3, topicName: 'Variation of g with Depth and Earth Rotation (Latitude)', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 4, topicName: 'Gravitational Field Intensity and Point Masses', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 5, topicName: 'Gravitational Potential and Potential Energy', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 6, topicName: 'Escape Velocity from Planet Surface', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 7, topicName: 'Orbital Speed and Time Period of Satellites', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 8, topicName: 'Geostationary and Polar Satellites Energy Relations', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 9, topicName: "Kepler's Three Laws of Planetary Motion", recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 10, topicName: 'Binding Energy and Satellite Projection Master Problems', recommendedLectureMinutes: 45, dppQuestionCount: 15 }
    ]
  },
  {
    chapterNumber: 9,
    chapterName: 'Mechanical Properties of Solids (Elasticity)',
    subject: 'Physics',
    classLevel: '11',
    weightage: 'Medium',
    topics: [
      { topicNumber: 1, topicName: 'Elastic Behavior of Matter and Restoring Force', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 2, topicName: 'Stress: Longitudinal, Shearing and Volume Stress', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 3, topicName: 'Strain: Longitudinal, Shear and Volumetric Strain', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 4, topicName: "Hooke's Law and Stress-Strain Graph Analysis", recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 5, topicName: "Young's Modulus of Elasticity and Elongation of Wire", recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 6, topicName: 'Shear Modulus (Modulus of Rigidity)', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 7, topicName: 'Bulk Modulus and Compressibility of Fluids', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 8, topicName: "Poisson's Ratio and Theoretical Limits", recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 9, topicName: 'Elastic Potential Energy Stored in a Stretched Wire', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 10, topicName: 'Thermal Stress and Composite Rod Elasticity Problems', recommendedLectureMinutes: 45, dppQuestionCount: 15 }
    ]
  },
  {
    chapterNumber: 10,
    chapterName: 'Fluid Mechanics & Surface Tension',
    subject: 'Physics',
    classLevel: '11',
    weightage: 'High',
    topics: [
      { topicNumber: 1, topicName: 'Pressure in Fluids, Variation with Depth & Barometer', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 2, topicName: "Pascal's Law and Hydraulic Lift Applications", recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 3, topicName: "Archimedes' Principle and Laws of Floatation", recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 4, topicName: 'Accelerated Fluid Containers and Effective Gravity', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 5, topicName: 'Equation of Continuity for Incompressible Flow', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 6, topicName: "Bernoulli's Theorem and Venturimeter", recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 7, topicName: "Torricelli's Law of Efflux and Vessel Emptying Time", recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 8, topicName: "Viscosity, Stokes' Law and Terminal Velocity", recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 9, topicName: 'Surface Tension, Surface Energy and Excess Pressure', recommendedLectureMinutes: 45, dppQuestionCount: 15 },
      { topicNumber: 10, topicName: 'Angle of Contact and Capillary Rise Formula', recommendedLectureMinutes: 45, dppQuestionCount: 15 }
    ]
  },
  // Chapters 11 to 30 for Physics
  { chapterNumber: 11, chapterName: 'Thermal Properties of Matter & Calorimetry', subject: 'Physics', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Thermal Properties', 11) },
  { chapterNumber: 12, chapterName: 'Thermodynamics (Physics)', subject: 'Physics', classLevel: '11', weightage: 'High', topics: createSubtopics('Thermodynamics', 12) },
  { chapterNumber: 13, chapterName: 'Kinetic Theory of Gases (KTG)', subject: 'Physics', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Kinetic Theory', 13) },
  { chapterNumber: 14, chapterName: 'Oscillations (Simple Harmonic Motion)', subject: 'Physics', classLevel: '11', weightage: 'High', topics: createSubtopics('SHM Oscillations', 14) },
  { chapterNumber: 15, chapterName: 'Mechanical Waves & Sound Waves', subject: 'Physics', classLevel: '11', weightage: 'High', topics: createSubtopics('Wave Motion & Sound', 15) },
  { chapterNumber: 16, chapterName: 'Electrostatics: Electric Charges & Fields', subject: 'Physics', classLevel: '12', weightage: 'High', topics: createSubtopics('Electric Charges & Fields', 16) },
  { chapterNumber: 17, chapterName: 'Electrostatic Potential & Capacitance', subject: 'Physics', classLevel: '12', weightage: 'High', topics: createSubtopics('Potential & Capacitors', 17) },
  { chapterNumber: 18, chapterName: 'Current Electricity & Circuit Laws', subject: 'Physics', classLevel: '12', weightage: 'High', topics: createSubtopics('Current Electricity', 18) },
  { chapterNumber: 19, chapterName: 'Moving Charges & Magnetism', subject: 'Physics', classLevel: '12', weightage: 'High', topics: createSubtopics('Magnetic Effects of Current', 19) },
  { chapterNumber: 20, chapterName: 'Magnetism and Matter', subject: 'Physics', classLevel: '12', weightage: 'Low', topics: createSubtopics('Magnetism and Matter', 20) },
  { chapterNumber: 21, chapterName: 'Electromagnetic Induction (EMI)', subject: 'Physics', classLevel: '12', weightage: 'High', topics: createSubtopics('Electromagnetic Induction', 21) },
  { chapterNumber: 22, chapterName: 'Alternating Current (AC Circuits)', subject: 'Physics', classLevel: '12', weightage: 'High', topics: createSubtopics('Alternating Current', 22) },
  { chapterNumber: 23, chapterName: 'Electromagnetic Waves', subject: 'Physics', classLevel: '12', weightage: 'Low', topics: createSubtopics('EM Waves', 23) },
  { chapterNumber: 24, chapterName: 'Ray Optics & Optical Instruments', subject: 'Physics', classLevel: '12', weightage: 'High', topics: createSubtopics('Ray Optics', 24) },
  { chapterNumber: 25, chapterName: 'Wave Optics & Interference', subject: 'Physics', classLevel: '12', weightage: 'High', topics: createSubtopics('Wave Optics', 25) },
  { chapterNumber: 26, chapterName: 'Dual Nature of Radiation & Matter', subject: 'Physics', classLevel: '12', weightage: 'Medium', topics: createSubtopics('Photoelectric Effect', 26) },
  { chapterNumber: 27, chapterName: 'Atoms & Bohr Atomic Model', subject: 'Physics', classLevel: '12', weightage: 'Medium', topics: createSubtopics('Atomic Physics', 27) },
  { chapterNumber: 28, chapterName: 'Nuclei & Nuclear Energy', subject: 'Physics', classLevel: '12', weightage: 'Medium', topics: createSubtopics('Nuclear Physics', 28) },
  { chapterNumber: 29, chapterName: 'Semiconductor Electronics & Logic Gates', subject: 'Physics', classLevel: '12', weightage: 'High', topics: createSubtopics('Semiconductors', 29) },
  { chapterNumber: 30, chapterName: 'Experimental Physics & Practical Skills', subject: 'Physics', classLevel: '12', weightage: 'Medium', topics: createSubtopics('Experimental Skills', 30) }
];

// Helper to generate 10 standard topics for remaining chapters
function createSubtopics(prefix: string, chNum: number): CurriculumTopic[] {
  const titles = [
    'Fundamental Concepts, Definitions & Postulates',
    'Core Formulae, Principles & Standard Derivations',
    'Mathematical Modeling & Canonical Equations',
    'Standard Application Cases & Boundary Conditions',
    'Graphical Interpretations & Vector Representations',
    'High-Yield Numerical Solved Paradigms',
    'Advanced Problem Solving & Special Shortcuts',
    'Interdisciplinary Connections & Common Traps',
    'Previous Year JEE & NEET Exam Question Patterns',
    'Chapter Speed Drill, Formulas & Comprehensive DPP'
  ];
  return titles.map((title, idx) => ({
    topicNumber: idx + 1,
    topicName: `${prefix}: ${title}`,
    recommendedLectureMinutes: 45,
    dppQuestionCount: 15
  }));
}

// -------------------------------------------------------------
// CHEMISTRY: 30 CHAPTERS × 10 TOPICS = 300 TOPICS
// -------------------------------------------------------------
export const chemistry30Chapters: CurriculumChapter[] = [
  { chapterNumber: 1, chapterName: 'Some Basic Concepts of Chemistry (Mole Concept)', subject: 'Chemistry', classLevel: '11', weightage: 'High', topics: createSubtopics('Mole Concept & Stoichiometry', 1) },
  { chapterNumber: 2, chapterName: 'Structure of Atom (Quantum Model)', subject: 'Chemistry', classLevel: '11', weightage: 'High', topics: createSubtopics('Atomic Structure', 2) },
  { chapterNumber: 3, chapterName: 'Classification of Elements & Periodic Trends', subject: 'Chemistry', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Periodic Classification', 3) },
  { chapterNumber: 4, chapterName: 'Chemical Bonding and Molecular Structure', subject: 'Chemistry', classLevel: '11', weightage: 'High', topics: createSubtopics('Chemical Bonding', 4) },
  { chapterNumber: 5, chapterName: 'Chemical Thermodynamics & Energetics', subject: 'Chemistry', classLevel: '11', weightage: 'High', topics: createSubtopics('Thermodynamics & Enthalpy', 5) },
  { chapterNumber: 6, chapterName: 'Chemical Equilibrium', subject: 'Chemistry', classLevel: '11', weightage: 'High', topics: createSubtopics('Chemical Equilibrium', 6) },
  { chapterNumber: 7, chapterName: 'Ionic Equilibrium (pH, Buffers, Ksp)', subject: 'Chemistry', classLevel: '11', weightage: 'High', topics: createSubtopics('Ionic Equilibrium', 7) },
  { chapterNumber: 8, chapterName: 'Redox Reactions & Oxidation States', subject: 'Chemistry', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Redox Reactions', 8) },
  { chapterNumber: 9, chapterName: 'Solutions & Colligative Properties', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Solutions & Raoult Law', 9) },
  { chapterNumber: 10, chapterName: 'Electrochemistry & Galvanic Cells', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Electrochemistry & Nernst', 10) },
  { chapterNumber: 11, chapterName: 'Chemical Kinetics & Rate Laws', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Chemical Kinetics', 11) },
  { chapterNumber: 12, chapterName: 'Surface Chemistry & Adsorption', subject: 'Chemistry', classLevel: '12', weightage: 'Low', topics: createSubtopics('Surface Chemistry', 12) },
  { chapterNumber: 13, chapterName: 'General Principles of Metallurgy', subject: 'Chemistry', classLevel: '12', weightage: 'Low', topics: createSubtopics('Metallurgy Extraction', 13) },
  { chapterNumber: 14, chapterName: 'The p-Block Elements (Group 13 & 14)', subject: 'Chemistry', classLevel: '11', weightage: 'Medium', topics: createSubtopics('p-Block Group 13 & 14', 14) },
  { chapterNumber: 15, chapterName: 'The p-Block Elements (Group 15 to 18)', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('p-Block Group 15-18', 15) },
  { chapterNumber: 16, chapterName: 'The d- and f-Block Elements', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Transition Elements', 16) },
  { chapterNumber: 17, chapterName: 'Coordination Compounds & CFT', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Coordination Compounds', 17) },
  { chapterNumber: 18, chapterName: 'Purification & Organic Qualitative Analysis', subject: 'Chemistry', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Organic Purification', 18) },
  { chapterNumber: 19, chapterName: 'General Organic Chemistry (GOC & Isomerism)', subject: 'Chemistry', classLevel: '11', weightage: 'High', topics: createSubtopics('GOC Resonance & Inductive', 19) },
  { chapterNumber: 20, chapterName: 'Hydrocarbons (Alkanes, Alkenes, Alkynes, Aromatic)', subject: 'Chemistry', classLevel: '11', weightage: 'High', topics: createSubtopics('Hydrocarbons', 20) },
  { chapterNumber: 21, chapterName: 'Environmental Chemistry', subject: 'Chemistry', classLevel: '11', weightage: 'Low', topics: createSubtopics('Environmental Chemistry', 21) },
  { chapterNumber: 22, chapterName: 'Haloalkanes and Haloarenes (SN1 & SN2)', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Alkyl Halides & Mechanisms', 22) },
  { chapterNumber: 23, chapterName: 'Alcohols, Phenols and Ethers', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Alcohols & Phenols', 23) },
  { chapterNumber: 24, chapterName: 'Aldehydes and Ketones (Nucleophilic Addition)', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Carbonyl Compounds', 24) },
  { chapterNumber: 25, chapterName: 'Carboxylic Acids & Acid Derivatives', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Carboxylic Acids', 25) },
  { chapterNumber: 26, chapterName: 'Amines & Diazonium Salts', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Organic Nitrogen Amines', 26) },
  { chapterNumber: 27, chapterName: 'Biomolecules (Proteins, Carbohydrates, DNA)', subject: 'Chemistry', classLevel: '12', weightage: 'High', topics: createSubtopics('Biomolecules & Vitamins', 27) },
  { chapterNumber: 28, chapterName: 'Polymers & Classification', subject: 'Chemistry', classLevel: '12', weightage: 'Low', topics: createSubtopics('Polymers Synthesis', 28) },
  { chapterNumber: 29, chapterName: 'Chemistry in Everyday Life', subject: 'Chemistry', classLevel: '12', weightage: 'Low', topics: createSubtopics('Medicinal Chemistry', 29) },
  { chapterNumber: 30, chapterName: 'Practical Organic & Inorganic Chemistry', subject: 'Chemistry', classLevel: '12', weightage: 'Medium', topics: createSubtopics('Salt Analysis & Titrations', 30) }
];

// -------------------------------------------------------------
// MATHEMATICS: 30 CHAPTERS × 10 TOPICS = 300 TOPICS
// -------------------------------------------------------------
export const mathematics30Chapters: CurriculumChapter[] = [
  { chapterNumber: 1, chapterName: 'Sets, Relations and Functions', subject: 'Mathematics', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Sets & Relations', 1) },
  { chapterNumber: 2, chapterName: 'Trigonometric Functions & Identities', subject: 'Mathematics', classLevel: '11', weightage: 'High', topics: createSubtopics('Trigonometry Formulae', 2) },
  { chapterNumber: 3, chapterName: 'Principle of Mathematical Induction', subject: 'Mathematics', classLevel: '11', weightage: 'Low', topics: createSubtopics('Mathematical Induction', 3) },
  { chapterNumber: 4, chapterName: 'Complex Numbers and Quadratic Equations', subject: 'Mathematics', classLevel: '11', weightage: 'High', topics: createSubtopics('Complex Numbers & Quadratics', 4) },
  { chapterNumber: 5, chapterName: 'Linear Inequalities & Regions', subject: 'Mathematics', classLevel: '11', weightage: 'Low', topics: createSubtopics('Linear Inequalities', 5) },
  { chapterNumber: 6, chapterName: 'Permutations and Combinations', subject: 'Mathematics', classLevel: '11', weightage: 'High', topics: createSubtopics('Permutations & Combinations', 6) },
  { chapterNumber: 7, chapterName: 'Binomial Theorem & General Terms', subject: 'Mathematics', classLevel: '11', weightage: 'High', topics: createSubtopics('Binomial Expansions', 7) },
  { chapterNumber: 8, chapterName: 'Sequences and Series (AP, GP, HP, AGP)', subject: 'Mathematics', classLevel: '11', weightage: 'High', topics: createSubtopics('Sequences & Progressions', 8) },
  { chapterNumber: 9, chapterName: 'Straight Lines & Pair of Lines', subject: 'Mathematics', classLevel: '11', weightage: 'High', topics: createSubtopics('Coordinate Straight Lines', 9) },
  { chapterNumber: 10, chapterName: 'Conic Sections: Circles', subject: 'Mathematics', classLevel: '11', weightage: 'High', topics: createSubtopics('Circles & Tangents', 10) },
  { chapterNumber: 11, chapterName: 'Conic Sections: Parabola, Ellipse, Hyperbola', subject: 'Mathematics', classLevel: '11', weightage: 'High', topics: createSubtopics('Parabola, Ellipse & Hyperbola', 11) },
  { chapterNumber: 12, chapterName: 'Introduction to 3D Coordinate Geometry (11)', subject: 'Mathematics', classLevel: '11', weightage: 'Low', topics: createSubtopics('3D Basics', 12) },
  { chapterNumber: 13, chapterName: 'Limits and Derivatives (Calculus Basics)', subject: 'Mathematics', classLevel: '11', weightage: 'High', topics: createSubtopics('Limits & Derivatives', 13) },
  { chapterNumber: 14, chapterName: 'Mathematical Reasoning & Truth Tables', subject: 'Mathematics', classLevel: '11', weightage: 'Low', topics: createSubtopics('Mathematical Logic', 14) },
  { chapterNumber: 15, chapterName: 'Statistics & Measures of Dispersion', subject: 'Mathematics', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Statistics & Variance', 15) },
  { chapterNumber: 16, chapterName: 'Probability: Classical & Conditional (11)', subject: 'Mathematics', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Classical Probability', 16) },
  { chapterNumber: 17, chapterName: 'Relations & Types of Functions (12)', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Advanced Functions', 17) },
  { chapterNumber: 18, chapterName: 'Inverse Trigonometric Functions (ITF)', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Inverse Trigonometry', 18) },
  { chapterNumber: 19, chapterName: 'Matrices & Matrix Algebra', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Matrices Operations', 19) },
  { chapterNumber: 20, chapterName: 'Determinants & Linear Systems', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Determinants & Cramer Rule', 20) },
  { chapterNumber: 21, chapterName: 'Continuity and Differentiability', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Continuity & Chain Rule', 21) },
  { chapterNumber: 22, chapterName: 'Application of Derivatives (AOD)', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Tangents & Maxima Minima', 22) },
  { chapterNumber: 23, chapterName: 'Indefinite Integration & Techniques', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Indefinite Integrals', 23) },
  { chapterNumber: 24, chapterName: 'Definite Integrals & Properties', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Definite Integrals', 24) },
  { chapterNumber: 25, chapterName: 'Applications of the Integrals (Area Under Curves)', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Area Under Curves', 25) },
  { chapterNumber: 26, chapterName: 'Differential Equations', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Differential Equations', 26) },
  { chapterNumber: 27, chapterName: 'Vector Algebra (Dot, Cross & Triple)', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Vectors 3D Algebra', 27) },
  { chapterNumber: 28, chapterName: 'Three-Dimensional Geometry (Lines & Planes)', subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('3D Lines and Planes', 28) },
  { chapterNumber: 29, chapterName: 'Linear Programming (LPP)', subject: 'Mathematics', classLevel: '12', weightage: 'Low', topics: createSubtopics('Linear Programming', 29) },
  { chapterNumber: 30, chapterName: "Probability: Bayes' Theorem & Distributions", subject: 'Mathematics', classLevel: '12', weightage: 'High', topics: createSubtopics('Bayes Theorem & Distributions', 30) }
];

// -------------------------------------------------------------
// BIOLOGY: 30 CHAPTERS × 10 TOPICS = 300 TOPICS (NEET Focus)
// -------------------------------------------------------------
export const biology30Chapters: CurriculumChapter[] = [
  { chapterNumber: 1, chapterName: 'The Living World', subject: 'Biology', classLevel: '11', weightage: 'Low', topics: createSubtopics('Living World Taxa', 1) },
  { chapterNumber: 2, chapterName: 'Biological Classification (Monera, Protista, Fungi)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Biological Classification', 2) },
  { chapterNumber: 3, chapterName: 'Plant Kingdom (Algae, Bryo, Pterido, Gymno, Angio)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Plant Kingdom', 3) },
  { chapterNumber: 4, chapterName: 'Animal Kingdom (Non-Chordates to Chordates)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Animal Kingdom', 4) },
  { chapterNumber: 5, chapterName: 'Morphology of Flowering Plants (Root, Stem, Leaf, Floral)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Plant Morphology', 5) },
  { chapterNumber: 6, chapterName: 'Anatomy of Flowering Plants (Tissues & Secondary Growth)', subject: 'Biology', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Plant Anatomy', 6) },
  { chapterNumber: 7, chapterName: 'Structural Organisation in Animals (Epithelial & Cockroach)', subject: 'Biology', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Animal Tissues', 7) },
  { chapterNumber: 8, chapterName: 'Cell: The Unit of Life (Organelles & Membranes)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Cell Biology', 8) },
  { chapterNumber: 9, chapterName: 'Biomolecules (Amino Acids, Enzymes, Nucleic Acids)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Biomolecules Biology', 9) },
  { chapterNumber: 10, chapterName: 'Cell Cycle and Cell Division (Mitosis & Meiosis)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Cell Division', 10) },
  { chapterNumber: 11, chapterName: 'Transport in Plants & Water Potential', subject: 'Biology', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Plant Water Relations', 11) },
  { chapterNumber: 12, chapterName: 'Mineral Nutrition & Nitrogen Metabolism', subject: 'Biology', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Mineral Nutrition', 12) },
  { chapterNumber: 13, chapterName: 'Photosynthesis in Higher Plants (Light & Dark Reactions)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Photosynthesis', 13) },
  { chapterNumber: 14, chapterName: 'Respiration in Plants (Glycolysis, Krebs & ETS)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Plant Respiration', 14) },
  { chapterNumber: 15, chapterName: 'Plant Growth and Development (Auxins, Cytokinins, Photoperiodism)', subject: 'Biology', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Plant Hormones', 15) },
  { chapterNumber: 16, chapterName: 'Digestion and Absorption', subject: 'Biology', classLevel: '11', weightage: 'Medium', topics: createSubtopics('Human Digestion', 16) },
  { chapterNumber: 17, chapterName: 'Breathing and Exchange of Gases (Respiratory Volumes)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Human Respiration', 17) },
  { chapterNumber: 18, chapterName: 'Body Fluids and Circulation (Heart, ECG & Cardiac Cycle)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Circulatory System', 18) },
  { chapterNumber: 19, chapterName: 'Excretory Products and Elimination (Nephron & Counter Current)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Human Excretion', 19) },
  { chapterNumber: 20, chapterName: 'Locomotion and Movement (Sliding Filament & Joints)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Muscles & Skeletal', 20) },
  { chapterNumber: 21, chapterName: 'Neural Control and Coordination (Synapse & Reflexes)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Human Nervous System', 21) },
  { chapterNumber: 22, chapterName: 'Chemical Coordination and Integration (Endocrine Hormones)', subject: 'Biology', classLevel: '11', weightage: 'High', topics: createSubtopics('Endocrine Glands', 22) },
  { chapterNumber: 23, chapterName: 'Sexual Reproduction in Flowering Plants (Embryo & Pollination)', subject: 'Biology', classLevel: '12', weightage: 'High', topics: createSubtopics('Angiosperm Reproduction', 23) },
  { chapterNumber: 24, chapterName: 'Human Reproduction (Gametogenesis & Menstrual Cycle)', subject: 'Biology', classLevel: '12', weightage: 'High', topics: createSubtopics('Human Reproduction', 24) },
  { chapterNumber: 25, chapterName: 'Reproductive Health (Contraception, IVF & STDs)', subject: 'Biology', classLevel: '12', weightage: 'High', topics: createSubtopics('Reproductive Health', 25) },
  { chapterNumber: 26, chapterName: 'Principles of Inheritance and Variation (Mendelian Genetics)', subject: 'Biology', classLevel: '12', weightage: 'High', topics: createSubtopics('Mendelian Genetics', 26) },
  { chapterNumber: 27, chapterName: 'Molecular Basis of Inheritance (Replication, Transcription, Translation)', subject: 'Biology', classLevel: '12', weightage: 'High', topics: createSubtopics('Molecular Genetics', 27) },
  { chapterNumber: 28, chapterName: 'Evolution (Origin, Darwinism & Hardy-Weinberg)', subject: 'Biology', classLevel: '12', weightage: 'High', topics: createSubtopics('Evolution Mechanisms', 28) },
  { chapterNumber: 29, chapterName: 'Human Health, Disease & Immunity (Antibodies, Cancer, AIDS)', subject: 'Biology', classLevel: '12', weightage: 'High', topics: createSubtopics('Human Health & Immunity', 29) },
  { chapterNumber: 30, chapterName: 'Biotechnology: Principles, Processes & Ecology Applications', subject: 'Biology', classLevel: '12', weightage: 'High', topics: createSubtopics('Biotech & Ecology', 30) }
];

// Helper to get all 30 chapters for any subject
export const getMaster30Chapters = (subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology'): CurriculumChapter[] => {
  if (subject === 'Physics') return physics30Chapters;
  if (subject === 'Chemistry') return chemistry30Chapters;
  if (subject === 'Mathematics') return mathematics30Chapters;
  return biology30Chapters;
};

