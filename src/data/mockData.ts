import { Test, Paper, UserProfile, StudyNote, NotificationItem, TopicWeakness, FormulaCard } from '../types';

export const mockTests: Test[] = [
  {
    id: "test-jee-mock-1",
    title: "JEE Main 2025 Full Mock #1",
    exam: "JEE",
    classLevel: "12",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    totalQuestions: 15,
    durationMinutes: 45,
    difficulty: "Mixed",
    questionIds: [
      "phy-11-001", "phy-11-003", "phy-11-006", "phy-12-001", "phy-12-003",
      "chem-11-001", "chem-11-003", "chem-11-005", "chem-12-001", "chem-12-003",
      "math-11-001", "math-11-003", "math-11-004", "math-12-001", "math-12-004"
    ],
    category: "Full Mock",
    isAttempted: false,
    maxScore: 60,
    negativeMarking: true,
    calculatorEnabled: true,
    subjectTimePlan: {
      Physics: 15,
      Chemistry: 12,
      Mathematics: 18
    }
  },
  {
    id: "test-neet-mock-1",
    title: "NEET 2025 High-Yield Mock #1",
    exam: "NEET",
    classLevel: "12",
    subjects: ["Physics", "Chemistry", "Biology"],
    totalQuestions: 15,
    durationMinutes: 40,
    difficulty: "Mixed",
    questionIds: [
      "phy-11-002", "phy-11-005", "phy-12-002", "phy-12-004",
      "chem-11-002", "chem-11-004", "chem-12-002", "chem-12-004",
      "bio-11-001", "bio-11-002", "bio-11-003", "bio-11-004", "bio-12-001", "bio-12-002", "bio-12-004"
    ],
    category: "Full Mock",
    isAttempted: false,
    maxScore: 60,
    negativeMarking: true,
    calculatorEnabled: false,
    subjectTimePlan: {
      Physics: 15,
      Chemistry: 12,
      Biology: 13
    }
  },
  {
    id: "test-phy-mechanics",
    title: "Physics: Mechanics Mastery Test",
    exam: "JEE",
    classLevel: "11",
    subjects: ["Physics"],
    chapters: ["Units and Measurements", "Kinematics", "Laws of Motion", "Work, Energy & Power", "Rotational Motion"],
    totalQuestions: 7,
    durationMinutes: 20,
    difficulty: "Medium",
    questionIds: [
      "phy-11-001", "phy-11-002", "phy-11-003", "phy-11-004", "phy-11-005", "phy-11-006", "phy-11-007"
    ],
    category: "Subject Test",
    isAttempted: false,
    maxScore: 28,
    negativeMarking: true,
    calculatorEnabled: true,
    subjectTimePlan: {
      Physics: 20
    }
  },
  {
    id: "test-chem-physical",
    title: "Chemistry: Physical & Thermodynamics",
    exam: "JEE",
    classLevel: "11",
    subjects: ["Chemistry"],
    chapters: ["Atomic Structure", "Thermodynamics", "Equilibrium"],
    totalQuestions: 5,
    durationMinutes: 15,
    difficulty: "Medium",
    questionIds: [
      "chem-11-001", "chem-11-003", "chem-11-004", "chem-12-001", "chem-12-003"
    ],
    category: "Subject Test",
    isAttempted: false,
    maxScore: 20,
    negativeMarking: true
  },
  {
    id: "test-bio-genetics",
    title: "Biology: Genetics & Cellular Biology",
    exam: "NEET",
    classLevel: "12",
    subjects: ["Biology"],
    chapters: ["Genetics & Evolution", "Molecular Basis of Inheritance", "Cell: The Unit of Life"],
    totalQuestions: 6,
    durationMinutes: 15,
    difficulty: "Easy",
    questionIds: [
      "bio-11-001", "bio-11-005", "bio-12-001", "bio-12-002", "bio-12-003", "bio-12-005"
    ],
    category: "Chapter Test",
    isAttempted: false,
    maxScore: 24,
    negativeMarking: true
  },
  {
    id: "test-math-calculus",
    title: "Mathematics: Limits & Calculus Sprint",
    exam: "JEE",
    classLevel: "12",
    subjects: ["Mathematics"],
    chapters: ["Limits, Continuity and Differentiability", "Integral Calculus"],
    totalQuestions: 5,
    durationMinutes: 20,
    difficulty: "Hard",
    questionIds: [
      "math-12-001", "math-12-002", "math-12-006", "math-11-001", "math-12-004"
    ],
    category: "Subject Test",
    isAttempted: false,
    maxScore: 20,
    negativeMarking: true
  }
];

export { realPapers } from './realPapersData';
import { realPapers } from './realPapersData';

export const mockPapers: Paper[] = realPapers;

export const initialUserProfile: UserProfile = {
  id: "usr-demo-01",
  name: "Aryan Sharma",
  email: "aryan.sharma@example.com",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  classLevel: "12",
  targetExam: "JEE",
  targetYear: 2026,
  streakDays: 14,
  lastActiveDate: "2026-09-14",
  dailyGoalQuestions: 25,
  todayQuestionsCount: 18,
  overallAccuracy: 74,
  testsCompletedCount: 12
};

export const initialNotes: StudyNote[] = [
  {
    id: "note-001",
    title: "Key Kinematics & Projectile Shortcuts",
    subject: "Physics",
    chapter: "Kinematics",
    content: "1. For range and max height: R tan θ = 4H.\n2. Complementary angles (θ and 90°-θ) yield identical range.\n3. Ratio of heights: H₁/H₂ = tan²θ.\n4. Time of flight: t₁ × t₂ = 2R/g.",
    tags: ["Formula", "Shortcut", "Mechanics"],
    updatedAt: "2026-09-12"
  },
  {
    id: "note-002",
    title: "Electrochemistry: Sign Conventions & Nernst Equation",
    subject: "Chemistry",
    chapter: "Electrochemistry",
    content: "E_cell = E°_cell - (0.0591 / n) log Q at 298 K.\nRemember: ΔG° = -n F E°_cell.\nSpontaneous reaction occurs when E_cell > 0 and ΔG < 0.\nAnode is oxidation (negative in galvanic, positive in electrolytic).",
    tags: ["Formulas", "Physical Chemistry"],
    updatedAt: "2026-09-13"
  },
  {
    id: "note-003",
    title: "Calculus: Standard King's Property Applications",
    subject: "Mathematics",
    chapter: "Integral Calculus",
    content: "∫₀^a f(x) dx = ∫₀^a f(a - x) dx.\nClassic symmetric ratios like (sin^n x)/(sin^n x + cos^n x) over [0, π/2] integrate directly to π/4.\nAlways check if adding the original and transformed integrands cancels the complicated terms.",
    tags: ["Calculus", "Integration", "High-Yield"],
    updatedAt: "2026-09-10"
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-001",
    title: "Daily Practice Ready",
    message: "Your targeted 10 questions in Physics (Rotational Motion) are queued up.",
    timestamp: "15 mins ago",
    isRead: false,
    type: "practice",
    actionUrl: "/practice"
  },
  {
    id: "notif-002",
    title: "Smart Revision Due",
    message: "You have 5 spaced-repetition questions due for review in Organic Chemistry.",
    timestamp: "2 hours ago",
    isRead: false,
    type: "revision",
    actionUrl: "/revision"
  },
  {
    id: "notif-003",
    title: "Performance Update",
    message: "Congratulations! Your 14-day study streak has earned you the 'Consistency Master' badge.",
    timestamp: "Yesterday",
    isRead: true,
    type: "achievement",
    actionUrl: "/performance"
  }
];

export const initialWeaknesses: TopicWeakness[] = [
  {
    subject: "Physics",
    chapter: "Rotational Motion",
    topic: "Moment of Inertia & Rolling",
    accuracy: 45,
    totalAttempts: 18,
    wrongCount: 10,
    status: "red",
    lastPracticedDate: "2026-09-12"
  },
  {
    subject: "Chemistry",
    chapter: "Thermodynamics",
    topic: "Spontaneity & Gibbs Energy",
    accuracy: 52,
    totalAttempts: 15,
    wrongCount: 7,
    status: "red",
    lastPracticedDate: "2026-09-11"
  },
  {
    subject: "Mathematics",
    chapter: "Integral Calculus",
    topic: "Definite Integrals & Properties",
    accuracy: 64,
    totalAttempts: 22,
    wrongCount: 8,
    status: "yellow",
    lastPracticedDate: "2026-09-13"
  },
  {
    subject: "Physics",
    chapter: "Kinematics",
    topic: "Projectile Motion",
    accuracy: 88,
    totalAttempts: 25,
    wrongCount: 3,
    status: "green",
    lastPracticedDate: "2026-09-13"
  },
  {
    subject: "Chemistry",
    chapter: "Atomic Structure",
    topic: "Bohr Model & Quantum Numbers",
    accuracy: 85,
    totalAttempts: 20,
    wrongCount: 3,
    status: "green",
    lastPracticedDate: "2026-09-10"
  }
];

export const mockFormulas: FormulaCard[] = [
  // Kinematics
  {
    id: "f-kin-01",
    chapterId: "kinematics",
    chapterTitle: "Kinematics",
    subject: "Physics",
    name: "Equations of Rectilinear Motion (Constant a)",
    formula: "v = u + at | s = ut + (1/2)at² | v² = u² + 2as",
    variables: "u = initial velocity, v = final velocity, a = uniform acceleration, t = time, s = displacement",
    siUnit: "v, u (m/s), a (m/s²), s (m), t (s)",
    importantNote: "Applicable ONLY when acceleration is constant in magnitude and direction."
  },
  {
    id: "f-kin-02",
    chapterId: "kinematics",
    chapterTitle: "Kinematics",
    subject: "Physics",
    name: "Projectile Maximum Height & Horizontal Range",
    formula: "H_max = (u² sin²θ) / (2g)  |  R = (u² sin 2θ) / g",
    variables: "u = initial speed, θ = projection angle with horizontal, g = acceleration due to gravity",
    siUnit: "H, R in meters (m)",
    importantNote: "Crucial relation: R = 4H cotθ or R tanθ = 4H. Range is maximum at θ = 45°."
  },
  {
    id: "f-kin-03",
    chapterId: "kinematics",
    chapterTitle: "Kinematics",
    subject: "Physics",
    name: "Time of Flight & Trajectory Equation",
    formula: "T = (2u sinθ) / g  |  y = x tanθ - (gx²) / (2u² cos²θ)",
    variables: "T = total time in air, y = vertical coordinate, x = horizontal coordinate",
    siUnit: "T (s), x, y (m)",
    importantNote: "Trajectory can also be expressed as y = x tanθ (1 - x/R)."
  },
  {
    id: "f-kin-04",
    chapterId: "kinematics",
    chapterTitle: "Kinematics",
    subject: "Physics",
    name: "Displacement in n-th Second",
    formula: "S_n = u + (a/2)(2n - 1)",
    variables: "u = initial velocity, a = acceleration, n = nth second",
    siUnit: "meters (m)",
    importantNote: "Dimensionally consistent because the implicit time unit is 1 second."
  },
  // Units and Measurements
  {
    id: "f-unit-01",
    chapterId: "units-and-measurements",
    chapterTitle: "Units and Measurements",
    subject: "Physics",
    name: "Relative and Percentage Error Propagation",
    formula: "For Z = (A^a · B^b) / C^c:  (ΔZ/Z) = a(ΔA/A) + b(ΔB/B) + c(ΔC/C)",
    variables: "ΔA, ΔB, ΔC = absolute errors in measurements; a, b, c = power exponents",
    siUnit: "Dimensionless ratio / percentage (%)",
    importantNote: "Errors always add up in worst-case maximum error analysis; exponents multiply fractional errors."
  },
  // Laws of Motion
  {
    id: "f-lom-01",
    chapterId: "laws-of-motion",
    chapterTitle: "Laws of Motion",
    subject: "Physics",
    name: "Limiting Static Friction & Kinetic Friction",
    formula: "f_s(max) = μ_s N  |  f_k = μ_k N",
    variables: "μ_s = coefficient of static friction, μ_k = coefficient of kinetic friction, N = normal reaction force",
    siUnit: "Force in Newtons (N); μ is dimensionless",
    importantNote: "Static friction is self-adjusting: 0 <= f_s <= μ_s N. Generally μ_s > μ_k."
  },
  {
    id: "f-lom-02",
    chapterId: "laws-of-motion",
    chapterTitle: "Laws of Motion",
    subject: "Physics",
    name: "Centripetal Acceleration & Safe Speed on Banked Road",
    formula: "a_c = v² / r = ω²r  |  v_opt = √(r g tanθ)",
    variables: "v = speed, r = radius of curvature, θ = banking angle, g = gravity",
    siUnit: "v (m/s), a_c (m/s²)",
    importantNote: "At optimal speed v_opt, no friction is required across tyres to prevent skidding."
  },
  // Work, Energy & Power
  {
    id: "f-wep-01",
    chapterId: "work-energy-and-power",
    chapterTitle: "Work, Energy & Power",
    subject: "Physics",
    name: "Work-Energy Theorem & Instantaneous Power",
    formula: "W_net = ΔK = (1/2)m v_f² - (1/2)m v_i²  |  P = F · v = F v cosθ",
    variables: "W_net = work done by all forces (conservative + non-conservative), P = power, F = force, v = velocity",
    siUnit: "Work (Joules, J), Power (Watts, W)",
    importantNote: "Work-energy theorem is valid in all inertial frames and for both constant and variable forces."
  },
  // Rotational Motion
  {
    id: "f-rot-01",
    chapterId: "rotational-motion",
    chapterTitle: "Rotational Motion",
    subject: "Physics",
    name: "Torque, Angular Momentum & Rolling Kinetic Energy",
    formula: "τ = I α  |  L = I ω  |  K_total = (1/2) M v_cm² + (1/2) I_cm ω²",
    variables: "I = moment of inertia, α = angular acceleration, ω = angular velocity, v_cm = center of mass velocity",
    siUnit: "τ (N·m), L (kg·m²/s), K (Joules)",
    importantNote: "For pure rolling without slipping: v_cm = R ω."
  },
  // Chemistry - Thermodynamics
  {
    id: "f-chem-thermo-01",
    chapterId: "thermodynamics",
    chapterTitle: "Thermodynamics",
    subject: "Chemistry",
    name: "First Law of Thermodynamics & Enthalpy",
    formula: "ΔU = q + w  |  ΔH = ΔU + Δn_g R T",
    variables: "ΔU = change in internal energy, q = heat, w = work done, Δn_g = moles of gaseous products - reactants",
    siUnit: "kJ / mol or Joules (J)",
    importantNote: "IUPAC convention: work done on system is positive (w = -P_ext ΔV for expansion)."
  },
  {
    id: "f-chem-thermo-02",
    chapterId: "thermodynamics",
    chapterTitle: "Thermodynamics",
    subject: "Chemistry",
    name: "Gibbs Free Energy & Spontaneity",
    formula: "ΔG = ΔH - TΔS  |  ΔG° = -RT ln(K_eq) = -2.303 RT log(K_eq)",
    variables: "ΔG = Gibbs free energy change, ΔH = enthalpy change, ΔS = entropy change, T = temperature in Kelvin",
    siUnit: "kJ / mol",
    importantNote: "Process is spontaneous at constant T, P if ΔG < 0; at equilibrium ΔG = 0."
  },
  // Chemistry - Solutions
  {
    id: "f-chem-sol-01",
    chapterId: "solutions",
    chapterTitle: "Solutions",
    subject: "Chemistry",
    name: "Raoult's Law & Colligative Properties",
    formula: "P = P_A° X_A  |  ΔT_b = i K_b m  |  ΔT_f = i K_f m  |  π = i C R T",
    variables: "i = van 't Hoff factor, K_b/K_f = ebullioscopic/cryoscopic constants, m = molality, π = osmotic pressure",
    siUnit: "Pressure (atm / Pa), Temperature (K)",
    importantNote: "For association i < 1; for dissociation i = 1 + (n - 1)α."
  },
  // Mathematics - Quadratic Equations
  {
    id: "f-math-quad-01",
    chapterId: "quadratic-equations",
    chapterTitle: "Quadratic Equations",
    subject: "Mathematics",
    name: "Roots, Discriminant & Vieta's Relations",
    formula: "x = (-b ± √(b² - 4ac)) / (2a)  |  α + β = -b/a  |  αβ = c/a",
    variables: "a, b, c = coefficients (a ≠ 0), D = b² - 4ac (discriminant)",
    siUnit: "Pure numbers / roots",
    importantNote: "If D > 0 (real & distinct), D = 0 (real & equal), D < 0 (complex conjugate roots)."
  },
  // Mathematics - Integral Calculus
  {
    id: "f-math-int-01",
    chapterId: "integral-calculus",
    chapterTitle: "Integral Calculus",
    subject: "Mathematics",
    name: "King's Property of Definite Integrals",
    formula: "∫[a to b] f(x) dx = ∫[a to b] f(a + b - x) dx",
    variables: "f(x) = continuous function on [a, b]",
    siUnit: "Integral value",
    importantNote: "Extremely useful in JEE for evaluating integrals involving trigonometric symmetry and logarithms."
  }
];

