import { Paper } from '../types';

export const realPapers: Paper[] = [
  // ==========================================
  // 1. RBSE (RAJASTHAN BOARD) MODEL & PYQ PAPERS
  // ==========================================
  {
    id: "paper-rbse-12-phy-2025",
    title: "RBSE Class 12 Physics Model Paper 2025",
    exam: "RBSE",
    classLevel: "12",
    board: "RBSE",
    subject: "Physics",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 195, // 3h 15m as per RBSE pattern
    totalQuestions: 56,
    description: "Official Rajasthan Board (BSER) Class 12 Physics Model Question Paper strictly following 2024-25 blueprint. Includes Section A (MCQs & Fill in the blanks), Section B (Short Answer), Section C (Long Answer), and Section D (Essay Type) with internal choice.",
    questionIds: ["phy-12-001", "phy-12-002", "phy-12-003", "phy-12-004", "phy-12-005"]
  },
  {
    id: "paper-rbse-12-chem-2025",
    title: "RBSE Class 12 Chemistry Model Paper 2025",
    exam: "RBSE",
    classLevel: "12",
    board: "RBSE",
    subject: "Chemistry",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 195,
    totalQuestions: 56,
    description: "Rajasthan Board Class 12 Chemistry Model Paper covering Physical, Inorganic, and Organic Chemistry chapters as per reduced BSER syllabus.",
    questionIds: ["chem-12-001", "chem-12-002", "chem-12-003", "chem-12-004", "chem-12-005"]
  },
  {
    id: "paper-rbse-12-bio-2025",
    title: "RBSE Class 12 Biology Model Paper 2025",
    exam: "RBSE",
    classLevel: "12",
    board: "RBSE",
    subject: "Biology",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 195,
    totalQuestions: 56,
    description: "BSER Class 12 Biology (Botany & Zoology) blueprint paper with diagram-based questions, definitions, and physiological pathways.",
    questionIds: ["bio-12-001", "bio-12-002", "bio-12-003", "bio-12-004", "bio-12-005"]
  },
  {
    id: "paper-rbse-12-math-2025",
    title: "RBSE Class 12 Mathematics Model Paper 2025",
    exam: "RBSE",
    classLevel: "12",
    board: "RBSE",
    subject: "Mathematics",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 195,
    totalQuestions: 50,
    description: "Rajasthan Board Class 12 Mathematics blueprint covering Matrices, Calculus, Vectors, 3D Geometry, and Linear Programming.",
    questionIds: ["math-12-001", "math-12-002", "math-12-003", "math-12-004", "math-12-005"]
  },
  {
    id: "paper-rbse-12-phy-2024-pyq",
    title: "RBSE Class 12 Physics Board Paper 2024 (PYQ)",
    exam: "RBSE",
    classLevel: "12",
    board: "RBSE",
    subject: "Physics",
    year: 2024,
    paperType: "PYQ",
    durationMinutes: 195,
    totalQuestions: 56,
    description: "Actual board examination question paper conducted by Board of Secondary Education Rajasthan, Ajmer.",
    questionIds: ["phy-12-001", "phy-12-003", "phy-12-005"]
  },
  {
    id: "paper-rbse-12-chem-2024-pyq",
    title: "RBSE Class 12 Chemistry Board Paper 2024 (PYQ)",
    exam: "RBSE",
    classLevel: "12",
    board: "RBSE",
    subject: "Chemistry",
    year: 2024,
    paperType: "PYQ",
    durationMinutes: 195,
    totalQuestions: 56,
    description: "Official 2024 Rajasthan Board annual examination paper with detailed solutions and marking scheme.",
    questionIds: ["chem-12-001", "chem-12-003", "chem-12-005"]
  },
  {
    id: "paper-rbse-11-science-2024",
    title: "RBSE Class 11 Science Model Paper 2024",
    exam: "RBSE",
    classLevel: "11",
    board: "RBSE",
    subject: "Physics",
    year: 2024,
    paperType: "Model Paper",
    durationMinutes: 195,
    totalQuestions: 40,
    description: "Annual examination practice paper for Class 11 Science students in Rajasthan Board.",
    questionIds: ["phy-11-001", "phy-11-002", "phy-11-003"]
  },

  // ==========================================
  // 2. CBSE (CENTRAL BOARD) SAMPLE & PYQ PAPERS
  // ==========================================
  {
    id: "paper-cbse-12-phy-2025",
    title: "CBSE Class 12 Physics Official Sample Paper 2024-25",
    exam: "CBSE",
    classLevel: "12",
    board: "CBSE",
    subject: "Physics",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 180,
    totalQuestions: 33,
    description: "Official CBSE Class 12 Physics Sample Question Paper with Assertion-Reason, Case-based questions, and detailed marking scheme.",
    questionIds: ["phy-12-001", "phy-12-002", "phy-12-004", "phy-12-006"]
  },
  {
    id: "paper-cbse-12-chem-2025",
    title: "CBSE Class 12 Chemistry Official Sample Paper 2024-25",
    exam: "CBSE",
    classLevel: "12",
    board: "CBSE",
    subject: "Chemistry",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 180,
    totalQuestions: 33,
    description: "Official CBSE Class 12 Chemistry Sample Paper including Case-Study questions and Organic Conversions according to revised syllabus.",
    questionIds: ["chem-12-001", "chem-12-002", "chem-12-004", "chem-12-006"]
  },
  {
    id: "paper-cbse-12-bio-2025",
    title: "CBSE Class 12 Biology Official Sample Paper 2024-25",
    exam: "CBSE",
    classLevel: "12",
    board: "CBSE",
    subject: "Biology",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 180,
    totalQuestions: 33,
    description: "CBSE official Class 12 Biology SQP covering Genetics, Biotechnology, Human Health, and Ecology with Section A to Section E structure.",
    questionIds: ["bio-12-001", "bio-12-002", "bio-12-003", "bio-12-005"]
  },
  {
    id: "paper-cbse-12-math-2025",
    title: "CBSE Class 12 Mathematics Official Sample Paper 2024-25",
    exam: "CBSE",
    classLevel: "12",
    board: "CBSE",
    subject: "Mathematics",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 180,
    totalQuestions: 38,
    description: "Official CBSE Class 12 Mathematics SQP with 18 MCQs, 2 Assertion-Reason, Short Answers, Long Answers, and 3 Integrated Case Studies.",
    questionIds: ["math-12-001", "math-12-002", "math-12-003", "math-12-005"]
  },
  {
    id: "paper-cbse-12-phy-2024-pyq",
    title: "CBSE Class 12 Physics Board Paper 2024 (All India Set 1)",
    exam: "CBSE",
    classLevel: "12",
    board: "CBSE",
    subject: "Physics",
    year: 2024,
    paperType: "PYQ",
    durationMinutes: 180,
    totalQuestions: 33,
    description: "Official All India CBSE Class 12 Physics 2024 Board Examination paper with step-by-step verified solutions.",
    questionIds: ["phy-12-002", "phy-12-003", "phy-12-005"]
  },
  {
    id: "paper-cbse-12-chem-2024-pyq",
    title: "CBSE Class 12 Chemistry Board Paper 2024 (All India Set 1)",
    exam: "CBSE",
    classLevel: "12",
    board: "CBSE",
    subject: "Chemistry",
    year: 2024,
    paperType: "PYQ",
    durationMinutes: 180,
    totalQuestions: 33,
    description: "Actual CBSE 2024 Chemistry examination paper with official answer keys and step allocation.",
    questionIds: ["chem-12-002", "chem-12-003", "chem-12-005"]
  },
  {
    id: "paper-cbse-11-phy-2024",
    title: "CBSE Class 11 Physics Final Exam Paper 2024",
    exam: "CBSE",
    classLevel: "11",
    board: "CBSE",
    subject: "Physics",
    year: 2024,
    paperType: "Model Paper",
    durationMinutes: 180,
    totalQuestions: 33,
    description: "Annual examination sample paper strictly mapped to NCERT Class 11 Physics syllabus.",
    questionIds: ["phy-11-001", "phy-11-002", "phy-11-004"]
  },

  // ==========================================
  // 3. JEE (MAIN & ADVANCED) PAPERS
  // ==========================================
  {
    id: "paper-jee-main-2025-model-1",
    title: "JEE Main 2025 NTA High-Yield Full Mock #1",
    exam: "JEE",
    classLevel: "12",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 180,
    totalQuestions: 75,
    shift: "Morning Shift (9:00 AM - 12:00 PM)",
    description: "Full-length 300 marks mock exam in exact NTA computer-based test (CBT) format. 25 questions each in Physics, Chemistry, and Mathematics (20 MCQs + 5 Numerical Value Questions).",
    questionIds: ["phy-11-001", "phy-12-001", "chem-11-001", "chem-12-001", "math-11-001", "math-12-001"]
  },
  {
    id: "paper-jee-main-2025-model-2",
    title: "JEE Main 2025 NTA High-Yield Full Mock #2",
    exam: "JEE",
    classLevel: "12",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 180,
    totalQuestions: 75,
    shift: "Evening Shift (3:00 PM - 6:00 PM)",
    description: "Standard full syllabus test designed by veteran faculty targeting 99+ percentile with real negative marking (+4 / -1).",
    questionIds: ["phy-11-003", "phy-12-003", "chem-11-003", "chem-12-003", "math-11-003", "math-12-003"]
  },
  {
    id: "paper-jee-main-2024-s1-jan27",
    title: "JEE Main 2024 Jan 27 Shift 1 Official Paper (PYQ)",
    exam: "JEE",
    classLevel: "12",
    year: 2024,
    paperType: "PYQ",
    durationMinutes: 180,
    totalQuestions: 75,
    shift: "27 Jan 2024 (Shift 1)",
    description: "Original NTA question paper conducted on 27th January 2024 morning session with authentic memory-verified answers.",
    questionIds: ["phy-11-001", "chem-11-001", "math-11-001"]
  },
  {
    id: "paper-jee-main-2024-s2-apr06",
    title: "JEE Main 2024 Apr 06 Shift 2 Official Paper (PYQ)",
    exam: "JEE",
    classLevel: "12",
    year: 2024,
    paperType: "PYQ",
    durationMinutes: 180,
    totalQuestions: 75,
    shift: "06 Apr 2024 (Shift 2)",
    description: "Official JEE Main Session 2 examination paper featuring questions from Modern Physics, Organic Synthesis, and Calculus.",
    questionIds: ["phy-12-001", "chem-12-001", "math-12-001"]
  },
  {
    id: "paper-jee-main-2023-pyq",
    title: "JEE Main 2023 Official Question Paper (PYQ)",
    exam: "JEE",
    classLevel: "12",
    year: 2023,
    paperType: "PYQ",
    durationMinutes: 180,
    totalQuestions: 75,
    shift: "Official Shift",
    description: "Benchmark previous year paper covering high-weightage topics across PCM.",
    questionIds: ["phy-11-002", "chem-11-002", "math-11-002"]
  },
  {
    id: "paper-jee-adv-2024-p1",
    title: "JEE Advanced 2024 Comprehensive Paper 1 Mock",
    exam: "JEE",
    classLevel: "12",
    year: 2024,
    paperType: "Mock Paper",
    durationMinutes: 180,
    totalQuestions: 51,
    shift: "Paper 1 (9:00 AM - 12:00 PM)",
    description: "Challenging multi-correct, comprehension, and numerical matching questions curated for IIT JEE Advanced aspirants.",
    questionIds: ["phy-12-005", "chem-12-005", "math-12-005"]
  },

  // ==========================================
  // 4. NEET (UG) PAPERS
  // ==========================================
  {
    id: "paper-neet-ug-2025-model-1",
    title: "NEET UG 2025 NTA High-Yield Full Mock #1",
    exam: "NEET",
    classLevel: "12",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 200, // 3h 20m as per NTA NEET pattern
    totalQuestions: 200, // 180 to attempt
    description: "Complete 720-mark NEET UG mock test with Section A (35 mandatory) and Section B (10 out of 15 optional) across Physics (50 Qs), Chemistry (50 Qs), Botany (50 Qs), and Zoology (50 Qs).",
    questionIds: ["phy-11-002", "phy-12-002", "chem-11-002", "chem-12-002", "bio-11-001", "bio-12-001"]
  },
  {
    id: "paper-neet-ug-2025-model-2",
    title: "NEET UG 2025 NTA High-Yield Full Mock #2",
    exam: "NEET",
    classLevel: "12",
    year: 2025,
    paperType: "Model Paper",
    durationMinutes: 200,
    totalQuestions: 200,
    description: "NCERT-strictly aligned model paper with assertion-reason and match the columns questions in Biology and numericals in Physics.",
    questionIds: ["phy-11-004", "phy-12-004", "chem-11-004", "chem-12-004", "bio-11-002", "bio-12-002"]
  },
  {
    id: "paper-neet-ug-2024-pyq",
    title: "NEET UG 2024 Official Question Paper (PYQ)",
    exam: "NEET",
    classLevel: "12",
    year: 2024,
    paperType: "PYQ",
    durationMinutes: 200,
    totalQuestions: 200,
    description: "Official National Eligibility cum Entrance Test (UG) 2024 question paper conducted nationwide by NTA with detailed answer solutions.",
    questionIds: ["phy-11-002", "chem-11-002", "bio-11-001", "bio-12-001"]
  },
  {
    id: "paper-neet-ug-2023-pyq",
    title: "NEET UG 2023 Official Question Paper (PYQ)",
    exam: "NEET",
    classLevel: "12",
    year: 2023,
    paperType: "PYQ",
    durationMinutes: 200,
    totalQuestions: 200,
    description: "Previous year NEET paper with authentic NCERT page references for all 100 Biology questions.",
    questionIds: ["phy-12-002", "chem-12-002", "bio-11-003", "bio-12-003"]
  },
  {
    id: "paper-neet-ug-2022-pyq",
    title: "NEET UG 2022 Official Question Paper (PYQ)",
    exam: "NEET",
    classLevel: "12",
    year: 2022,
    paperType: "PYQ",
    durationMinutes: 200,
    totalQuestions: 200,
    description: "Original 2022 NEET examination paper covering all high-yield Human Physiology and Genetics questions.",
    questionIds: ["phy-11-005", "chem-11-004", "bio-11-004", "bio-12-004"]
  }
];
