import { Question } from "../../types";

export const mathBank: Question[] = [
  {
    "id": "math-11-lim-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Limits and Derivatives",
    "topic": "Trigonometric Limits",
    "difficulty": "Medium",
    "question": "Evaluate the limit: lim(x -> 0) (1 - cos(4x)) / x².",
    "questionHi": "सीमा का मान ज्ञात कीजिए: lim(x -> 0) (1 - cos(4x)) / x²।",
    "options": [
      "8",
      "4",
      "2",
      "16"
    ],
    "optionsHi": [
      "8",
      "4",
      "2",
      "16"
    ],
    "correctAnswer": 0,
    "explanation": "1 - cos(4x) = 2 sin²(2x). Limit = 2 × lim(x->0) [sin(2x)/x]² = 2 × 2² = 8.",
    "concept": "Standard limit: lim(x -> 0) (1 - cos(kx)) / x² = k² / 2.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-cpx-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Cube Roots of Unity",
    "difficulty": "Medium",
    "question": "If ω is a non-real complex cube root of unity, then the value of (1 - ω + ω²)⁵ + (1 + ω - ω²)⁵ is:",
    "questionHi": "यदि ω इकाई का अधिकल्पित घनमूल है, तो (1 - ω + ω²)⁵ + (1 + ω - ω²)⁵ का मान क्या है?",
    "options": [
      "32",
      "-32",
      "64",
      "0"
    ],
    "optionsHi": [
      "32",
      "-32",
      "64",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Since 1 + ω + ω² = 0: (-2ω)⁵ + (-2ω²)⁵ = -32(ω² + ω) = -32(-1) = 32.",
    "concept": "Algebraic properties of cube roots of unity.",
    "source": "PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-adj-01",
    "exam": "Board",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Determinant of Adjoint",
    "difficulty": "Medium",
    "question": "If A is a 3 × 3 matrix with |A| = 4, then the determinant value |adj(2A)| is:",
    "questionHi": "यदि 3 × 3 आव्यूह A के लिए |A| = 4 है, तो |adj(2A)| का मान होगा:",
    "options": [
      "1024",
      "256",
      "512",
      "128"
    ],
    "optionsHi": [
      "1024",
      "256",
      "512",
      "128"
    ],
    "correctAnswer": 0,
    "explanation": "|2A| = 2³ |A| = 8 × 4 = 32. For 3×3 matrix, |adj(M)| = |M|² => |adj(2A)| = (32)² = 1024.",
    "concept": "Determinant scalar scaling and adjoint formulas.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-int-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Integrals",
    "topic": "King's Property Integration",
    "difficulty": "Medium",
    "question": "Evaluate the definite integral: ∫₀^(π/2) [√sin(x) / (√sin(x) + √cos(x))] dx.",
    "questionHi": "निश्चित समाकलन का मान निकालिए: ∫₀^(π/2) [√sin(x) / (√sin(x) + √cos(x))] dx।",
    "options": [
      "π / 4",
      "π / 2",
      "π",
      "1"
    ],
    "optionsHi": [
      "π / 4",
      "π / 2",
      "π",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "Using King's property: 2I = ∫₀^(π/2) 1 dx = π/2 => I = π/4.",
    "concept": "King's property symmetry in definite integrals.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-vec-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Lagrange Identity",
    "difficulty": "Easy",
    "question": "If |a| = 3, |b| = 4, and |a × b| = 6, then the value of scalar dot product |a · b| is:",
    "questionHi": "यदि |a| = 3, |b| = 4 और |a × b| = 6 है, तो |a · b| का मान क्या होगा?",
    "options": [
      "6√3",
      "6",
      "12",
      "3√3"
    ],
    "optionsHi": [
      "6√3",
      "6",
      "12",
      "3√3"
    ],
    "correctAnswer": 0,
    "explanation": "|a × b|² + (a · b)² = |a|² |b|² => 36 + (a · b)² = 9 × 16 = 144 => (a · b)² = 108 => |a · b| = 6√3.",
    "concept": "Lagrange identity relating vector dot and cross products.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-cnt-01",
    "exam": "Board",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "topic": "Differentiability Condition",
    "difficulty": "Medium",
    "question": "The function f(x) = |x - 2| + |x - 5| is non-differentiable at:",
    "questionHi": "फलन f(x) = |x - 2| + |x - 5| किन बिंदुओं पर अवकलनीय नहीं है?",
    "options": [
      "x = 2 and x = 5",
      "x = 2 only",
      "x = 5 only",
      "x = 0 and x = 2"
    ],
    "optionsHi": [
      "x = 2 तथा x = 5",
      "केवल x = 2",
      "केवल x = 5",
      "x = 0 तथा x = 2"
    ],
    "correctAnswer": 0,
    "explanation": "Absolute value functions have sharp corners where the expression inside vanishes. Here x - 2 = 0 => x = 2, and x - 5 = 0 => x = 5. LHD ≠ RHD at these corner points.",
    "concept": "Differentiability of continuous piecewise absolute value functions.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-aod-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Application of Derivatives",
    "topic": "Maxima and Minima",
    "difficulty": "Medium",
    "question": "The maximum value of the function f(x) = (1/x)^x for x > 0 occurs at x equal to:",
    "questionHi": "x > 0 के लिए फलन f(x) = (1/x)^x का अधिकतम मान किस बिंदु पर होता है?",
    "options": [
      "1 / e",
      "e",
      "1",
      "e²"
    ],
    "optionsHi": [
      "1 / e",
      "e",
      "1",
      "e²"
    ],
    "correctAnswer": 0,
    "explanation": "Let y = (1/x)^x. ln y = x ln(1/x) = -x ln x. Differentiating: (1/y) dy/dx = -ln x - 1 = 0 => ln x = -1 => x = 1/e.",
    "concept": "Logarithmic differentiation and critical points for transcendental functions.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-aoi-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Application of Integrals",
    "topic": "Area Between Parabola and Line",
    "difficulty": "Medium",
    "question": "The area bounded by the parabola y² = 4x and the straight line y = 2x is:",
    "questionHi": "परवलय y² = 4x और सरल रेखा y = 2x से परिबद्ध क्षेत्र का क्षेत्रफल क्या है?",
    "options": [
      "1/3 sq units",
      "2/3 sq units",
      "4/3 sq units",
      "1 sq unit"
    ],
    "optionsHi": [
      "1/3 वर्ग इकाई",
      "2/3 वर्ग इकाई",
      "4/3 वर्ग इकाई",
      "1 वर्ग इकाई"
    ],
    "correctAnswer": 0,
    "explanation": "Intersection: (2x)² = 4x => 4x² = 4x => x = 0 and x = 1. Area = ∫₀¹ (2√x - 2x) dx = [ (4/3) x^(3/2) - x² ]₀¹ = 4/3 - 1 = 1/3 sq units.",
    "concept": "Definite integral application for bounded planar regions.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-prb-01",
    "exam": "Board",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Bayes Theorem",
    "difficulty": "Medium",
    "question": "A bag contains 4 red and 4 black balls, another bag contains 2 red and 6 black balls. One ball is drawn from a randomly chosen bag and found to be red. The probability that it was drawn from the first bag is:",
    "questionHi": "एक थैले में 4 लाल और 4 काली गेंदें हैं, दूसरे में 2 लाल और 6 काली गेंदें हैं। यादृच्छया चुने गए थैले से एक गेंद निकाली जाती है और वह लाल निकलती है। इसके पहले थैले से होने की प्रायिकता क्या है?",
    "options": [
      "2/3",
      "1/3",
      "1/2",
      "3/4"
    ],
    "optionsHi": [
      "2/3",
      "1/3",
      "1/2",
      "3/4"
    ],
    "correctAnswer": 0,
    "explanation": "P(B1) = P(B2) = 1/2. P(R|B1) = 4/8 = 1/2. P(R|B2) = 2/8 = 1/4. By Bayes' Theorem: P(B1|R) = (1/2 × 1/2) / [ (1/2 × 1/2) + (1/2 × 1/4) ] = (1/4) / (3/8) = (1/4) × (8/3) = 2/3.",
    "concept": "Conditional posterior probability using Bayes' Rule.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-3d-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Shortest Distance Between Skew Lines",
    "difficulty": "Hard",
    "question": "The shortest distance between lines r = (i + 2j + k) + λ(i - j + k) and r = (2i - j - k) + μ(2i + j + 2k) is:",
    "questionHi": "रेखाओं r = (i + 2j + k) + λ(i - j + k) तथा r = (2i - j - k) + μ(2i + j + 2k) के बीच न्यूनतम दूरी क्या है?",
    "options": [
      "3√2",
      "2√3",
      "3 / √2",
      "√6"
    ],
    "optionsHi": [
      "3√2",
      "2√3",
      "3 / √2",
      "√6"
    ],
    "correctAnswer": 0,
    "explanation": "b1 × b2 = (i - j + k) × (2i + j + 2k) = -3i + 3k. |b1 × b2| = √(9 + 9) = 3√2. a2 - a1 = i - 3j - 2k. (a2 - a1) · (b1 × b2) = (1)(-3) + (-3)(0) + (-2)(3) = -9 - 9 = -18. Shortest Distance = |-18| / (3√2) = 18 / (3√2) = 6 / √2 = 3√2.",
    "concept": "Vector formula for shortest distance between two non-intersecting skew lines.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-seq-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "AM-GM Inequality",
    "difficulty": "Easy",
    "question": "If positive real numbers x, y, z satisfy x + y + z = 18, the maximum value of xyz is:",
    "questionHi": "यदि धनात्मक वास्तविक संख्याएँ x, y, z संबंध x + y + z = 18 को संतुष्ट करती हैं, तो xyz का अधिकतम मान क्या होगा?",
    "options": [
      "216",
      "64",
      "512",
      "729"
    ],
    "optionsHi": [
      "216",
      "64",
      "512",
      "729"
    ],
    "correctAnswer": 0,
    "explanation": "By AM-GM inequality: (x + y + z) / 3 ≥ (xyz)^(1/3) => 18 / 3 ≥ (xyz)^(1/3) => 6 ≥ (xyz)^(1/3) => xyz ≤ 6³ = 216.",
    "concept": "Arithmetic Mean - Geometric Mean inequality for positive real variables.",
    "source": "PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 60
  }
];
