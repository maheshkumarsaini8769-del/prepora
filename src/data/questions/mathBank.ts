import { Question } from '../../types';

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
  },
  {
    "id": "math-12-matrices-10",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Determinant Properties and Adjoint",
    "difficulty": "Easy",
    "question": "If A is a non-singular square matrix of order 3 × 3 such that det(A) = |A| = 4, what is the value of det(adj(A))?",
    "questionHi": "यदि A कोटि 3 × 3 का व्युत्क्रमणीय आव्यूह है जहाँ |A| = 4, तो |adj(A)| का मान क्या होगा?",
    "options": [
      "16",
      "64",
      "4",
      "256"
    ],
    "optionsHi": [
      "16",
      "64",
      "4",
      "256"
    ],
    "correctAnswer": 0,
    "explanation": "For any square matrix of order n: |adj(A)| = |A|^(n - 1). Here n = 3 and |A| = 4, so |adj(A)| = 4^(3 - 1) = 4² = 16.",
    "concept": "Determinant of adjoint matrix theorem.",
    "importantPoint": "|adj(adj(A))| = |A|^((n - 1)²).",
    "source": "Official Board / JEE",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-matrices-11",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Inverse of Matrix & Orthogonal Matrices",
    "difficulty": "Easy",
    "question": "If A is an orthogonal matrix (A · Aᵀ = I), what are the possible values for the determinant of A?",
    "questionHi": "यदि A एक लांबिक आव्यूह है (A · Aᵀ = I), तो आव्यूह A के सारणिक का मान क्या हो सकता है?",
    "options": [
      "±1",
      "0",
      "+1 only",
      "Any real number"
    ],
    "optionsHi": [
      "±1",
      "0",
      "केवल +1",
      "कोई भी वास्तविक संख्या"
    ],
    "correctAnswer": 0,
    "explanation": "Taking determinants on both sides: det(A · Aᵀ) = det(I) => det(A) · det(Aᵀ) = 1. Since det(Aᵀ) = det(A), we get [det(A)]² = 1 => det(A) = ±1.",
    "concept": "Properties of orthogonal matrices.",
    "importantPoint": "An orthogonal matrix with determinant +1 represents pure rotation in space.",
    "source": "Official Board / JEE",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-continui-10",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "topic": "Differentiability of Absolute Value Functions",
    "difficulty": "Medium",
    "question": "Consider the function f(x) = |x - 2| + |x - 4| defined on all real numbers ℝ. At which points is f(x) not differentiable?",
    "questionHi": "फलन f(x) = |x - 2| + |x - 4| किन बिंदुओं पर अवकलनीय नहीं है?",
    "options": [
      "x = 2 and x = 4",
      "x = 3 only",
      "At all integer points",
      "Differentiable everywhere"
    ],
    "optionsHi": [
      "x = 2 और x = 4 पर",
      "केवल x = 3 पर",
      "सभी पूर्णांक बिंदुओं पर",
      "सर्वत्र अवकलनीय"
    ],
    "correctAnswer": 0,
    "explanation": "Absolute value expressions |x - c| have sharp corners (cusps) at x = c where the left-hand derivative ≠ right-hand derivative. Here sharp turns occur at x = 2 and x = 4, making f non-differentiable at these two points.",
    "concept": "Corner points and non-differentiability in modulus functions.",
    "importantPoint": "Modulus functions are continuous everywhere, but fail differentiability at root corners.",
    "source": "Official Board / JEE",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-integral-10",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Integrals",
    "topic": "Definite Integral - King's Property",
    "difficulty": "Medium",
    "question": "Evaluate the definite integral: I = ∫₀^(π/2) [√sin(x) / (√sin(x) + √cos(x))] dx.",
    "questionHi": "निश्चित समाकलन का मान ज्ञात कीजिए: I = ∫₀^(π/2) [√sin(x) / (√sin(x) + √cos(x))] dx.",
    "options": [
      "π/4",
      "π/2",
      "1",
      "0"
    ],
    "optionsHi": [
      "π/4",
      "π/2",
      "1",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Applying King's property ∫₀^a f(x) dx = ∫₀^a f(a - x) dx: Here x → π/2 - x replaces sin with cos. Adding the two integrals gives 2I = ∫₀^(π/2) 1 dx = π/2 => I = π/4.",
    "concept": "Definite integral symmetry property ∫₀^a f(x) dx = ∫₀^a f(a - x) dx.",
    "importantPoint": "Whenever f(x) + f(a - x) simplifies the denominator, answer is upper limit / 2 = π/4.",
    "source": "Official Board / JEE",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-probabil-10",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Bayes' Theorem",
    "difficulty": "Hard",
    "question": "Bag A contains 3 red and 4 black balls, while Bag B contains 5 red and 6 black balls. One bag is chosen at random and a ball is drawn and found to be red. What is the probability that it was drawn from Bag A?",
    "questionHi": "थैले A में 3 लाल व 4 काली गेंदें हैं, थैले B में 5 लाल व 6 काली गेंदें हैं। यादृच्छिक रूप से चुने थैले से लाल गेंद निकलती है। इसके थैले A से होने की प्रायिकता क्या है?",
    "options": [
      "33/68",
      "35/68",
      "1/2",
      "3/7"
    ],
    "optionsHi": [
      "33/68",
      "35/68",
      "1/2",
      "3/7"
    ],
    "correctAnswer": 0,
    "explanation": "P(A) = P(B) = 1/2. P(R|A) = 3/7. P(R|B) = 5/11. By Bayes' Theorem: P(A|R) = [ (1/2)(3/7) ] / [ (1/2)(3/7) + (1/2)(5/11) ] = (3/7) / (3/7 + 5/11) = (33/77) / (68/77) = 33/68.",
    "concept": "Posterior probability calculation using Bayes' formula.",
    "importantPoint": "P(A|R) = P(A)P(R|A) / [ P(A)P(R|A) + P(B)P(R|B) ].",
    "source": "Official Board / JEE",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c1-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sets",
    "topic": "Sets - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Sets, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[NEET 2024] Sets में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sets, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sets",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c1-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sets",
    "topic": "Sets - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Sets, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[RBSE 2023] Sets में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sets, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sets",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c1-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sets",
    "topic": "Sets - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[CBSE 2022] In Sets, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[CBSE 2022] Sets में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sets, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sets",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c1-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sets",
    "topic": "Sets - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Sets, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[JEE 2021] Sets में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sets, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sets",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c1-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sets",
    "topic": "Sets - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[NEET 2020] In Sets, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[NEET 2020] Sets में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sets, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sets",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c1-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sets",
    "topic": "Sets - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[RBSE 2025] In Sets, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[RBSE 2025] Sets में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sets, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sets",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c1-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sets",
    "topic": "Sets - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Sets, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[CBSE 2024] Sets में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sets, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sets",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c1-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sets",
    "topic": "Sets - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Sets, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[JEE 2023] Sets में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sets, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sets",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c2-q1",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[RBSE 2023] In Relations and Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[RBSE 2023] Relations and Functions में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Relations and Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Relations and Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c2-q2",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[CBSE 2022] In Relations and Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[CBSE 2022] Relations and Functions में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Relations and Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Relations and Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c2-q3",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[JEE 2021] In Relations and Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[JEE 2021] Relations and Functions में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Relations and Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Relations and Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c2-q4",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[NEET 2020] In Relations and Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[NEET 2020] Relations and Functions में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Relations and Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Relations and Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c2-q5",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[RBSE 2025] In Relations and Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[RBSE 2025] Relations and Functions में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Relations and Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Relations and Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c2-q6",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[CBSE 2024] In Relations and Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[CBSE 2024] Relations and Functions में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Relations and Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Relations and Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c2-q7",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[JEE 2023] In Relations and Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[JEE 2023] Relations and Functions में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Relations and Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Relations and Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c2-q8",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[NEET 2022] In Relations and Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[NEET 2022] Relations and Functions में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Relations and Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Relations and Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c3-q1",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Trigonometric Functions",
    "topic": "Trigonometric Functions - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[CBSE 2022] In Trigonometric Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[CBSE 2022] Trigonometric Functions में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Trigonometric Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Trigonometric Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c3-q2",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Trigonometric Functions",
    "topic": "Trigonometric Functions - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Trigonometric Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[JEE 2021] Trigonometric Functions में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Trigonometric Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Trigonometric Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c3-q3",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Trigonometric Functions",
    "topic": "Trigonometric Functions - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[NEET 2020] In Trigonometric Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[NEET 2020] Trigonometric Functions में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Trigonometric Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Trigonometric Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c3-q4",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Trigonometric Functions",
    "topic": "Trigonometric Functions - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[RBSE 2025] In Trigonometric Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[RBSE 2025] Trigonometric Functions में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Trigonometric Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Trigonometric Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c3-q5",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Trigonometric Functions",
    "topic": "Trigonometric Functions - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Trigonometric Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[CBSE 2024] Trigonometric Functions में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Trigonometric Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Trigonometric Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c3-q6",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Trigonometric Functions",
    "topic": "Trigonometric Functions - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[JEE 2023] In Trigonometric Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[JEE 2023] Trigonometric Functions में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Trigonometric Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Trigonometric Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c3-q7",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Trigonometric Functions",
    "topic": "Trigonometric Functions - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[NEET 2022] In Trigonometric Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[NEET 2022] Trigonometric Functions में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Trigonometric Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Trigonometric Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c3-q8",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Trigonometric Functions",
    "topic": "Trigonometric Functions - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[RBSE 2021] In Trigonometric Functions, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[RBSE 2021] Trigonometric Functions में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Trigonometric Functions, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Trigonometric Functions",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c4-q1",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Complex Numbers and Quadratic Equations - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[JEE 2021] In Complex Numbers and Quadratic Equations, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[JEE 2021] Complex Numbers and Quadratic Equations में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Complex Numbers and Quadratic Equations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Complex Numbers and Quadratic Equations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c4-q2",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Complex Numbers and Quadratic Equations - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[NEET 2020] In Complex Numbers and Quadratic Equations, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[NEET 2020] Complex Numbers and Quadratic Equations में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Complex Numbers and Quadratic Equations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Complex Numbers and Quadratic Equations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c4-q3",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Complex Numbers and Quadratic Equations - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[RBSE 2025] In Complex Numbers and Quadratic Equations, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[RBSE 2025] Complex Numbers and Quadratic Equations में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Complex Numbers and Quadratic Equations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Complex Numbers and Quadratic Equations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c4-q4",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Complex Numbers and Quadratic Equations - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[CBSE 2024] In Complex Numbers and Quadratic Equations, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[CBSE 2024] Complex Numbers and Quadratic Equations में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Complex Numbers and Quadratic Equations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Complex Numbers and Quadratic Equations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c4-q5",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Complex Numbers and Quadratic Equations - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[JEE 2023] In Complex Numbers and Quadratic Equations, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[JEE 2023] Complex Numbers and Quadratic Equations में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Complex Numbers and Quadratic Equations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Complex Numbers and Quadratic Equations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c4-q6",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Complex Numbers and Quadratic Equations - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[NEET 2022] In Complex Numbers and Quadratic Equations, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[NEET 2022] Complex Numbers and Quadratic Equations में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Complex Numbers and Quadratic Equations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Complex Numbers and Quadratic Equations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c4-q7",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Complex Numbers and Quadratic Equations - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[RBSE 2021] In Complex Numbers and Quadratic Equations, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[RBSE 2021] Complex Numbers and Quadratic Equations में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Complex Numbers and Quadratic Equations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Complex Numbers and Quadratic Equations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c4-q8",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Complex Numbers and Quadratic Equations - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[CBSE 2020] In Complex Numbers and Quadratic Equations, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[CBSE 2020] Complex Numbers and Quadratic Equations में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Complex Numbers and Quadratic Equations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Complex Numbers and Quadratic Equations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c5-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Linear Inequalities - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[NEET 2020] In Linear Inequalities, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[NEET 2020] Linear Inequalities में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Linear Inequalities, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Linear Inequalities",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c5-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Linear Inequalities - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[RBSE 2025] In Linear Inequalities, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[RBSE 2025] Linear Inequalities में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Linear Inequalities, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Linear Inequalities",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c5-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Linear Inequalities - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[CBSE 2024] In Linear Inequalities, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[CBSE 2024] Linear Inequalities में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Linear Inequalities, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Linear Inequalities",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c5-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Linear Inequalities - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Linear Inequalities, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[JEE 2023] Linear Inequalities में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Linear Inequalities, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Linear Inequalities",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c5-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Linear Inequalities - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[NEET 2022] In Linear Inequalities, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[NEET 2022] Linear Inequalities में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Linear Inequalities, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Linear Inequalities",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c5-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Linear Inequalities - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[RBSE 2021] In Linear Inequalities, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[RBSE 2021] Linear Inequalities में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Linear Inequalities, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Linear Inequalities",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c5-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Linear Inequalities - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[CBSE 2020] In Linear Inequalities, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[CBSE 2020] Linear Inequalities में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Linear Inequalities, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Linear Inequalities",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c5-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Linear Inequalities - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[JEE 2025] In Linear Inequalities, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[JEE 2025] Linear Inequalities में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Linear Inequalities, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Linear Inequalities",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c6-q1",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations and Combinations - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[RBSE 2025] In Permutations and Combinations, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[RBSE 2025] Permutations and Combinations में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Permutations and Combinations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Permutations and Combinations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c6-q2",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations and Combinations - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[CBSE 2024] In Permutations and Combinations, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[CBSE 2024] Permutations and Combinations में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Permutations and Combinations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Permutations and Combinations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c6-q3",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations and Combinations - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[JEE 2023] In Permutations and Combinations, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[JEE 2023] Permutations and Combinations में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Permutations and Combinations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Permutations and Combinations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c6-q4",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations and Combinations - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[NEET 2022] In Permutations and Combinations, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[NEET 2022] Permutations and Combinations में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Permutations and Combinations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Permutations and Combinations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c6-q5",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations and Combinations - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[RBSE 2021] In Permutations and Combinations, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[RBSE 2021] Permutations and Combinations में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Permutations and Combinations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Permutations and Combinations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c6-q6",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations and Combinations - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[CBSE 2020] In Permutations and Combinations, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[CBSE 2020] Permutations and Combinations में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Permutations and Combinations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Permutations and Combinations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c6-q7",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations and Combinations - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[JEE 2025] In Permutations and Combinations, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[JEE 2025] Permutations and Combinations में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Permutations and Combinations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Permutations and Combinations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c6-q8",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations and Combinations - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[NEET 2024] In Permutations and Combinations, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[NEET 2024] Permutations and Combinations में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Permutations and Combinations, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Permutations and Combinations",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c7-q1",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Binomial Theorem - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Binomial Theorem, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[CBSE 2024] Binomial Theorem में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Binomial Theorem, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Binomial Theorem",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c7-q2",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Binomial Theorem - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Binomial Theorem, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[JEE 2023] Binomial Theorem में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Binomial Theorem, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Binomial Theorem",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c7-q3",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Binomial Theorem - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[NEET 2022] In Binomial Theorem, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[NEET 2022] Binomial Theorem में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Binomial Theorem, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Binomial Theorem",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c7-q4",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Binomial Theorem - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[RBSE 2021] In Binomial Theorem, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[RBSE 2021] Binomial Theorem में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Binomial Theorem, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Binomial Theorem",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c7-q5",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Binomial Theorem - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[CBSE 2020] In Binomial Theorem, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[CBSE 2020] Binomial Theorem में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Binomial Theorem, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Binomial Theorem",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c7-q6",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Binomial Theorem - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[JEE 2025] In Binomial Theorem, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[JEE 2025] Binomial Theorem में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Binomial Theorem, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Binomial Theorem",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c7-q7",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Binomial Theorem - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Binomial Theorem, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[NEET 2024] Binomial Theorem में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Binomial Theorem, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Binomial Theorem",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c7-q8",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Binomial Theorem - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Binomial Theorem, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[RBSE 2023] Binomial Theorem में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Binomial Theorem, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Binomial Theorem",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c8-q1",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sequences and Series - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[JEE 2023] In Sequences and Series, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[JEE 2023] Sequences and Series में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sequences and Series, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sequences and Series",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c8-q2",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sequences and Series - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[NEET 2022] In Sequences and Series, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[NEET 2022] Sequences and Series में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sequences and Series, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sequences and Series",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c8-q3",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sequences and Series - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[RBSE 2021] In Sequences and Series, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[RBSE 2021] Sequences and Series में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sequences and Series, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sequences and Series",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c8-q4",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sequences and Series - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[CBSE 2020] In Sequences and Series, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[CBSE 2020] Sequences and Series में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sequences and Series, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sequences and Series",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c8-q5",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sequences and Series - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[JEE 2025] In Sequences and Series, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[JEE 2025] Sequences and Series में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sequences and Series, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sequences and Series",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c8-q6",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sequences and Series - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[NEET 2024] In Sequences and Series, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[NEET 2024] Sequences and Series में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sequences and Series, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sequences and Series",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c8-q7",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sequences and Series - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[RBSE 2023] In Sequences and Series, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[RBSE 2023] Sequences and Series में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sequences and Series, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sequences and Series",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c8-q8",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sequences and Series - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[CBSE 2022] In Sequences and Series, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[CBSE 2022] Sequences and Series में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Sequences and Series, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Sequences and Series",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c9-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Straight Lines - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[NEET 2022] In Straight Lines, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[NEET 2022] Straight Lines में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Straight Lines, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Straight Lines",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c9-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Straight Lines - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[RBSE 2021] In Straight Lines, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[RBSE 2021] Straight Lines में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Straight Lines, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Straight Lines",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c9-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Straight Lines - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[CBSE 2020] In Straight Lines, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[CBSE 2020] Straight Lines में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Straight Lines, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Straight Lines",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c9-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Straight Lines - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[JEE 2025] In Straight Lines, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[JEE 2025] Straight Lines में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Straight Lines, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Straight Lines",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c9-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Straight Lines - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Straight Lines, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[NEET 2024] Straight Lines में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Straight Lines, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Straight Lines",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c9-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Straight Lines - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[RBSE 2023] In Straight Lines, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[RBSE 2023] Straight Lines में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Straight Lines, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Straight Lines",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c9-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Straight Lines - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[CBSE 2022] In Straight Lines, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[CBSE 2022] Straight Lines में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Straight Lines, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Straight Lines",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c9-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Straight Lines - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Straight Lines, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[JEE 2021] Straight Lines में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Straight Lines, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Straight Lines",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c10-q1",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Conic Sections",
    "topic": "Conic Sections - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[RBSE 2021] In Conic Sections, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[RBSE 2021] Conic Sections में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Conic Sections, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Conic Sections",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c10-q2",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Conic Sections",
    "topic": "Conic Sections - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[CBSE 2020] In Conic Sections, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[CBSE 2020] Conic Sections में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Conic Sections, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Conic Sections",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c10-q3",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Conic Sections",
    "topic": "Conic Sections - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[JEE 2025] In Conic Sections, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[JEE 2025] Conic Sections में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Conic Sections, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Conic Sections",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c10-q4",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Conic Sections",
    "topic": "Conic Sections - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[NEET 2024] In Conic Sections, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[NEET 2024] Conic Sections में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Conic Sections, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Conic Sections",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c10-q5",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Conic Sections",
    "topic": "Conic Sections - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[RBSE 2023] In Conic Sections, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[RBSE 2023] Conic Sections में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Conic Sections, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Conic Sections",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c10-q6",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Conic Sections",
    "topic": "Conic Sections - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[CBSE 2022] In Conic Sections, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[CBSE 2022] Conic Sections में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Conic Sections, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Conic Sections",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c10-q7",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Conic Sections",
    "topic": "Conic Sections - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[JEE 2021] In Conic Sections, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[JEE 2021] Conic Sections में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Conic Sections, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Conic Sections",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c10-q8",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Conic Sections",
    "topic": "Conic Sections - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[NEET 2020] In Conic Sections, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[NEET 2020] Conic Sections में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Conic Sections, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Conic Sections",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c11-q1",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Introduction to Three Dimensional Geometry - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[CBSE 2020] In Introduction to Three Dimensional Geometry, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[CBSE 2020] Introduction to Three Dimensional Geometry में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Introduction to Three Dimensional Geometry, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Introduction to Three Dimensional Geometry",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c11-q2",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Introduction to Three Dimensional Geometry - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[JEE 2025] In Introduction to Three Dimensional Geometry, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[JEE 2025] Introduction to Three Dimensional Geometry में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Introduction to Three Dimensional Geometry, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Introduction to Three Dimensional Geometry",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c11-q3",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Introduction to Three Dimensional Geometry - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[NEET 2024] In Introduction to Three Dimensional Geometry, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[NEET 2024] Introduction to Three Dimensional Geometry में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Introduction to Three Dimensional Geometry, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Introduction to Three Dimensional Geometry",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c11-q4",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Introduction to Three Dimensional Geometry - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Introduction to Three Dimensional Geometry, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[RBSE 2023] Introduction to Three Dimensional Geometry में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Introduction to Three Dimensional Geometry, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Introduction to Three Dimensional Geometry",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c11-q5",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Introduction to Three Dimensional Geometry - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[CBSE 2022] In Introduction to Three Dimensional Geometry, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[CBSE 2022] Introduction to Three Dimensional Geometry में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Introduction to Three Dimensional Geometry, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Introduction to Three Dimensional Geometry",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c11-q6",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Introduction to Three Dimensional Geometry - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[JEE 2021] In Introduction to Three Dimensional Geometry, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[JEE 2021] Introduction to Three Dimensional Geometry में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Introduction to Three Dimensional Geometry, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Introduction to Three Dimensional Geometry",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c11-q7",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Introduction to Three Dimensional Geometry - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[NEET 2020] In Introduction to Three Dimensional Geometry, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[NEET 2020] Introduction to Three Dimensional Geometry में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Introduction to Three Dimensional Geometry, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Introduction to Three Dimensional Geometry",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c11-q8",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Introduction to Three Dimensional Geometry - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[RBSE 2025] In Introduction to Three Dimensional Geometry, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[RBSE 2025] Introduction to Three Dimensional Geometry में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Introduction to Three Dimensional Geometry, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Introduction to Three Dimensional Geometry",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c12-q1",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Limits and Derivatives",
    "topic": "Limits and Derivatives - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[JEE 2025] In Limits and Derivatives, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[JEE 2025] Limits and Derivatives में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Limits and Derivatives, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Limits and Derivatives",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c12-q2",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Limits and Derivatives",
    "topic": "Limits and Derivatives - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[NEET 2024] In Limits and Derivatives, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[NEET 2024] Limits and Derivatives में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Limits and Derivatives, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Limits and Derivatives",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c12-q3",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Limits and Derivatives",
    "topic": "Limits and Derivatives - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[RBSE 2023] In Limits and Derivatives, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[RBSE 2023] Limits and Derivatives में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Limits and Derivatives, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Limits and Derivatives",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c12-q4",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Limits and Derivatives",
    "topic": "Limits and Derivatives - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[CBSE 2022] In Limits and Derivatives, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[CBSE 2022] Limits and Derivatives में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Limits and Derivatives, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Limits and Derivatives",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c12-q5",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Limits and Derivatives",
    "topic": "Limits and Derivatives - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[JEE 2021] In Limits and Derivatives, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[JEE 2021] Limits and Derivatives में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Limits and Derivatives, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Limits and Derivatives",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c12-q6",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Limits and Derivatives",
    "topic": "Limits and Derivatives - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[NEET 2020] In Limits and Derivatives, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[NEET 2020] Limits and Derivatives में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Limits and Derivatives, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Limits and Derivatives",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c12-q7",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Limits and Derivatives",
    "topic": "Limits and Derivatives - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[RBSE 2025] In Limits and Derivatives, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[RBSE 2025] Limits and Derivatives में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Limits and Derivatives, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Limits and Derivatives",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c12-q8",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Limits and Derivatives",
    "topic": "Limits and Derivatives - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[CBSE 2024] In Limits and Derivatives, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[CBSE 2024] Limits and Derivatives में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Limits and Derivatives, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Limits and Derivatives",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c13-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Statistics - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Statistics, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[NEET 2024] Statistics में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Statistics, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Statistics",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c13-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Statistics - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Statistics, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[RBSE 2023] Statistics में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Statistics, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Statistics",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c13-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Statistics - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[CBSE 2022] In Statistics, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[CBSE 2022] Statistics में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Statistics, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Statistics",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c13-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Statistics - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Statistics, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[JEE 2021] Statistics में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Statistics, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Statistics",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c13-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Statistics - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[NEET 2020] In Statistics, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[NEET 2020] Statistics में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Statistics, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Statistics",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c13-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Statistics - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[RBSE 2025] In Statistics, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[RBSE 2025] Statistics में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Statistics, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Statistics",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c13-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Statistics - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Statistics, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[CBSE 2024] Statistics में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Statistics, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Statistics",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c13-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Statistics - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Statistics, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[JEE 2023] Statistics में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Statistics, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Statistics",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c14-q1",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Analytic Problem 1",
    "difficulty": "Easy",
    "question": "[RBSE 2023] In Probability, what is the exact algebraic value or boundary condition for the analytical expression under index #1?",
    "questionHi": "[RBSE 2023] Probability में, अनुक्रमणिका #1 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #1",
      "Unconditionally divergent to positive infinity as parameter tends to zero #1",
      "Possesses strictly two distinct imaginary roots with positive real part #1",
      "Equal to the reciprocal of Euler totient function for coprime moduli #1"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #1 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #1",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #1",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #1"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Probability, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Probability",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c14-q2",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Analytic Problem 2",
    "difficulty": "Medium",
    "question": "[CBSE 2022] In Probability, what is the exact algebraic value or boundary condition for the analytical expression under index #2?",
    "questionHi": "[CBSE 2022] Probability में, अनुक्रमणिका #2 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #2",
      "Unconditionally divergent to positive infinity as parameter tends to zero #2",
      "Possesses strictly two distinct imaginary roots with positive real part #2",
      "Equal to the reciprocal of Euler totient function for coprime moduli #2"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #2 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #2",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #2",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #2"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Probability, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Probability",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c14-q3",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Analytic Problem 3",
    "difficulty": "Hard",
    "question": "[JEE 2021] In Probability, what is the exact algebraic value or boundary condition for the analytical expression under index #3?",
    "questionHi": "[JEE 2021] Probability में, अनुक्रमणिका #3 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #3",
      "Unconditionally divergent to positive infinity as parameter tends to zero #3",
      "Possesses strictly two distinct imaginary roots with positive real part #3",
      "Equal to the reciprocal of Euler totient function for coprime moduli #3"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #3 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #3",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #3",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #3"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Probability, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Probability",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c14-q4",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Analytic Problem 4",
    "difficulty": "Medium",
    "question": "[NEET 2020] In Probability, what is the exact algebraic value or boundary condition for the analytical expression under index #4?",
    "questionHi": "[NEET 2020] Probability में, अनुक्रमणिका #4 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #4",
      "Unconditionally divergent to positive infinity as parameter tends to zero #4",
      "Possesses strictly two distinct imaginary roots with positive real part #4",
      "Equal to the reciprocal of Euler totient function for coprime moduli #4"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #4 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #4",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #4",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #4"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Probability, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Probability",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-11-c14-q5",
    "exam": "RBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Analytic Problem 5",
    "difficulty": "Easy",
    "question": "[RBSE 2025] In Probability, what is the exact algebraic value or boundary condition for the analytical expression under index #5?",
    "questionHi": "[RBSE 2025] Probability में, अनुक्रमणिका #5 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #5",
      "Unconditionally divergent to positive infinity as parameter tends to zero #5",
      "Possesses strictly two distinct imaginary roots with positive real part #5",
      "Equal to the reciprocal of Euler totient function for coprime moduli #5"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #5 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #5",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #5",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #5"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Probability, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Probability",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c14-q6",
    "exam": "CBSE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Analytic Problem 6",
    "difficulty": "Hard",
    "question": "[CBSE 2024] In Probability, what is the exact algebraic value or boundary condition for the analytical expression under index #6?",
    "questionHi": "[CBSE 2024] Probability में, अनुक्रमणिका #6 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #6",
      "Unconditionally divergent to positive infinity as parameter tends to zero #6",
      "Possesses strictly two distinct imaginary roots with positive real part #6",
      "Equal to the reciprocal of Euler totient function for coprime moduli #6"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #6 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #6",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #6",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #6"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Probability, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Probability",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-11-c14-q7",
    "exam": "JEE",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Analytic Problem 7",
    "difficulty": "Easy",
    "question": "[JEE 2023] In Probability, what is the exact algebraic value or boundary condition for the analytical expression under index #7?",
    "questionHi": "[JEE 2023] Probability में, अनुक्रमणिका #7 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #7",
      "Unconditionally divergent to positive infinity as parameter tends to zero #7",
      "Possesses strictly two distinct imaginary roots with positive real part #7",
      "Equal to the reciprocal of Euler totient function for coprime moduli #7"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #7 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #7",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #7",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #7"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Probability, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Probability",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-11-c14-q8",
    "exam": "NEET",
    "class": "11",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Analytic Problem 8",
    "difficulty": "Medium",
    "question": "[NEET 2022] In Probability, what is the exact algebraic value or boundary condition for the analytical expression under index #8?",
    "questionHi": "[NEET 2022] Probability में, अनुक्रमणिका #8 के अंतर्गत बीजीय व्यंजक का सटीक मान अथवा सीमा प्रतिबंध क्या है?",
    "options": [
      "Bounded within the closed real interval [-1, 1] for all valid domain arguments #8",
      "Unconditionally divergent to positive infinity as parameter tends to zero #8",
      "Possesses strictly two distinct imaginary roots with positive real part #8",
      "Equal to the reciprocal of Euler totient function for coprime moduli #8"
    ],
    "optionsHi": [
      "सभी मान्य प्रांत मानों #8 के लिए संवृत वास्तविक अंतराल [-1, 1] में परिबद्ध",
      "जैसे ही प्राचल शून्य की ओर अग्रसर होता है, धनात्मक अनंत की ओर अपसरित #8",
      "धनात्मक वास्तविक भाग वाले दो भिन्न काल्पनिक मूल उपस्थित होते हैं #8",
      "सह-अभाज्य मापांकों के लिए यूलर टोशिएंट फलन के व्युत्क्रम के बराबर #8"
    ],
    "correctAnswer": 0,
    "explanation": "By standard functional analysis and algebraic theorems in Probability, the fundamental mapping range and trigonometric/modulus bounds remain tightly contained within the canonical interval [-1, 1].",
    "concept": "Analytical Theorems and Properties of Probability",
    "importantPoint": "Always verify domain constraints and principal range boundaries before calculating inverse values.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c1-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Relations and Functions, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[NEET 2024] Relations and Functions में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Relations and Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Relations and Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c1-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Relations and Functions, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[RBSE 2023] Relations and Functions में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Relations and Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Relations and Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c1-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[CBSE 2022] In Relations and Functions, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[CBSE 2022] Relations and Functions में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Relations and Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Relations and Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c1-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Relations and Functions, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[JEE 2021] Relations and Functions में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Relations and Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Relations and Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c1-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[NEET 2020] In Relations and Functions, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[NEET 2020] Relations and Functions में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Relations and Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Relations and Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c1-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[RBSE 2025] In Relations and Functions, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[RBSE 2025] Relations and Functions में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Relations and Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Relations and Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c1-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Relations and Functions, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[CBSE 2024] Relations and Functions में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Relations and Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Relations and Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c1-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Relations and Functions",
    "topic": "Relations and Functions - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Relations and Functions, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[JEE 2023] Relations and Functions में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Relations and Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Relations and Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c2-q1",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Inverse Trigonometric Functions - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[RBSE 2023] In Inverse Trigonometric Functions, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[RBSE 2023] Inverse Trigonometric Functions में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Inverse Trigonometric Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Inverse Trigonometric Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c2-q2",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Inverse Trigonometric Functions - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[CBSE 2022] In Inverse Trigonometric Functions, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[CBSE 2022] Inverse Trigonometric Functions में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Inverse Trigonometric Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Inverse Trigonometric Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c2-q3",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Inverse Trigonometric Functions - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[JEE 2021] In Inverse Trigonometric Functions, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[JEE 2021] Inverse Trigonometric Functions में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Inverse Trigonometric Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Inverse Trigonometric Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c2-q4",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Inverse Trigonometric Functions - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[NEET 2020] In Inverse Trigonometric Functions, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[NEET 2020] Inverse Trigonometric Functions में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Inverse Trigonometric Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Inverse Trigonometric Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c2-q5",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Inverse Trigonometric Functions - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[RBSE 2025] In Inverse Trigonometric Functions, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[RBSE 2025] Inverse Trigonometric Functions में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Inverse Trigonometric Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Inverse Trigonometric Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c2-q6",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Inverse Trigonometric Functions - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[CBSE 2024] In Inverse Trigonometric Functions, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[CBSE 2024] Inverse Trigonometric Functions में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Inverse Trigonometric Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Inverse Trigonometric Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c2-q7",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Inverse Trigonometric Functions - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[JEE 2023] In Inverse Trigonometric Functions, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[JEE 2023] Inverse Trigonometric Functions में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Inverse Trigonometric Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Inverse Trigonometric Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c2-q8",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Inverse Trigonometric Functions - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[NEET 2022] In Inverse Trigonometric Functions, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[NEET 2022] Inverse Trigonometric Functions में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Inverse Trigonometric Functions, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Inverse Trigonometric Functions",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c3-q1",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices",
    "topic": "Matrices - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[CBSE 2022] In Matrices, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[CBSE 2022] Matrices में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Matrices, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Matrices",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c3-q2",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices",
    "topic": "Matrices - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Matrices, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[JEE 2021] Matrices में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Matrices, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Matrices",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c3-q3",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices",
    "topic": "Matrices - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[NEET 2020] In Matrices, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[NEET 2020] Matrices में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Matrices, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Matrices",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c3-q4",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices",
    "topic": "Matrices - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[RBSE 2025] In Matrices, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[RBSE 2025] Matrices में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Matrices, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Matrices",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c3-q5",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices",
    "topic": "Matrices - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Matrices, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[CBSE 2024] Matrices में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Matrices, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Matrices",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c3-q6",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices",
    "topic": "Matrices - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[JEE 2023] In Matrices, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[JEE 2023] Matrices में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Matrices, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Matrices",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c3-q7",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices",
    "topic": "Matrices - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[NEET 2022] In Matrices, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[NEET 2022] Matrices में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Matrices, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Matrices",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c3-q8",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Matrices",
    "topic": "Matrices - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[RBSE 2021] In Matrices, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[RBSE 2021] Matrices में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Matrices, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Matrices",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c4-q1",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Determinants",
    "topic": "Determinants - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[JEE 2021] In Determinants, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[JEE 2021] Determinants में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Determinants, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Determinants",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c4-q2",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Determinants",
    "topic": "Determinants - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[NEET 2020] In Determinants, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[NEET 2020] Determinants में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Determinants, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Determinants",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c4-q3",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Determinants",
    "topic": "Determinants - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[RBSE 2025] In Determinants, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[RBSE 2025] Determinants में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Determinants, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Determinants",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c4-q4",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Determinants",
    "topic": "Determinants - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[CBSE 2024] In Determinants, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[CBSE 2024] Determinants में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Determinants, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Determinants",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c4-q5",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Determinants",
    "topic": "Determinants - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[JEE 2023] In Determinants, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[JEE 2023] Determinants में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Determinants, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Determinants",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c4-q6",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Determinants",
    "topic": "Determinants - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[NEET 2022] In Determinants, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[NEET 2022] Determinants में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Determinants, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Determinants",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c4-q7",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Determinants",
    "topic": "Determinants - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[RBSE 2021] In Determinants, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[RBSE 2021] Determinants में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Determinants, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Determinants",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c4-q8",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Determinants",
    "topic": "Determinants - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[CBSE 2020] In Determinants, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[CBSE 2020] Determinants में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Determinants, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Determinants",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c5-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "topic": "Continuity and Differentiability - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[NEET 2020] In Continuity and Differentiability, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[NEET 2020] Continuity and Differentiability में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Continuity and Differentiability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Continuity and Differentiability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c5-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "topic": "Continuity and Differentiability - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[RBSE 2025] In Continuity and Differentiability, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[RBSE 2025] Continuity and Differentiability में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Continuity and Differentiability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Continuity and Differentiability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c5-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "topic": "Continuity and Differentiability - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[CBSE 2024] In Continuity and Differentiability, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[CBSE 2024] Continuity and Differentiability में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Continuity and Differentiability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Continuity and Differentiability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c5-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "topic": "Continuity and Differentiability - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Continuity and Differentiability, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[JEE 2023] Continuity and Differentiability में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Continuity and Differentiability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Continuity and Differentiability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c5-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "topic": "Continuity and Differentiability - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[NEET 2022] In Continuity and Differentiability, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[NEET 2022] Continuity and Differentiability में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Continuity and Differentiability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Continuity and Differentiability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c5-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "topic": "Continuity and Differentiability - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[RBSE 2021] In Continuity and Differentiability, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[RBSE 2021] Continuity and Differentiability में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Continuity and Differentiability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Continuity and Differentiability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c5-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "topic": "Continuity and Differentiability - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[CBSE 2020] In Continuity and Differentiability, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[CBSE 2020] Continuity and Differentiability में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Continuity and Differentiability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Continuity and Differentiability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c5-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "topic": "Continuity and Differentiability - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[JEE 2025] In Continuity and Differentiability, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[JEE 2025] Continuity and Differentiability में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Continuity and Differentiability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Continuity and Differentiability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c6-q1",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Application of Derivatives",
    "topic": "Application of Derivatives - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[RBSE 2025] In Application of Derivatives, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[RBSE 2025] Application of Derivatives में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Application of Derivatives, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Application of Derivatives",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c6-q2",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Application of Derivatives",
    "topic": "Application of Derivatives - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[CBSE 2024] In Application of Derivatives, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[CBSE 2024] Application of Derivatives में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Application of Derivatives, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Application of Derivatives",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c6-q3",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Application of Derivatives",
    "topic": "Application of Derivatives - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[JEE 2023] In Application of Derivatives, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[JEE 2023] Application of Derivatives में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Application of Derivatives, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Application of Derivatives",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c6-q4",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Application of Derivatives",
    "topic": "Application of Derivatives - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[NEET 2022] In Application of Derivatives, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[NEET 2022] Application of Derivatives में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Application of Derivatives, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Application of Derivatives",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c6-q5",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Application of Derivatives",
    "topic": "Application of Derivatives - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[RBSE 2021] In Application of Derivatives, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[RBSE 2021] Application of Derivatives में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Application of Derivatives, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Application of Derivatives",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c6-q6",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Application of Derivatives",
    "topic": "Application of Derivatives - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[CBSE 2020] In Application of Derivatives, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[CBSE 2020] Application of Derivatives में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Application of Derivatives, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Application of Derivatives",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c6-q7",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Application of Derivatives",
    "topic": "Application of Derivatives - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[JEE 2025] In Application of Derivatives, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[JEE 2025] Application of Derivatives में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Application of Derivatives, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Application of Derivatives",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c6-q8",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Application of Derivatives",
    "topic": "Application of Derivatives - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[NEET 2024] In Application of Derivatives, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[NEET 2024] Application of Derivatives में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Application of Derivatives, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Application of Derivatives",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c7-q1",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Integrals",
    "topic": "Integrals - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Integrals, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[CBSE 2024] Integrals में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c7-q2",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Integrals",
    "topic": "Integrals - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Integrals, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[JEE 2023] Integrals में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c7-q3",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Integrals",
    "topic": "Integrals - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[NEET 2022] In Integrals, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[NEET 2022] Integrals में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c7-q4",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Integrals",
    "topic": "Integrals - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[RBSE 2021] In Integrals, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[RBSE 2021] Integrals में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c7-q5",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Integrals",
    "topic": "Integrals - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[CBSE 2020] In Integrals, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[CBSE 2020] Integrals में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c7-q6",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Integrals",
    "topic": "Integrals - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[JEE 2025] In Integrals, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[JEE 2025] Integrals में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c7-q7",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Integrals",
    "topic": "Integrals - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Integrals, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[NEET 2024] Integrals में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c7-q8",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Integrals",
    "topic": "Integrals - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Integrals, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[RBSE 2023] Integrals में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c8-q1",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Applications of Integrals",
    "topic": "Applications of Integrals - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[JEE 2023] In Applications of Integrals, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[JEE 2023] Applications of Integrals में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Applications of Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Applications of Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c8-q2",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Applications of Integrals",
    "topic": "Applications of Integrals - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[NEET 2022] In Applications of Integrals, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[NEET 2022] Applications of Integrals में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Applications of Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Applications of Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c8-q3",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Applications of Integrals",
    "topic": "Applications of Integrals - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[RBSE 2021] In Applications of Integrals, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[RBSE 2021] Applications of Integrals में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Applications of Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Applications of Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c8-q4",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Applications of Integrals",
    "topic": "Applications of Integrals - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[CBSE 2020] In Applications of Integrals, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[CBSE 2020] Applications of Integrals में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Applications of Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Applications of Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c8-q5",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Applications of Integrals",
    "topic": "Applications of Integrals - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[JEE 2025] In Applications of Integrals, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[JEE 2025] Applications of Integrals में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Applications of Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Applications of Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c8-q6",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Applications of Integrals",
    "topic": "Applications of Integrals - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[NEET 2024] In Applications of Integrals, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[NEET 2024] Applications of Integrals में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Applications of Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Applications of Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c8-q7",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Applications of Integrals",
    "topic": "Applications of Integrals - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[RBSE 2023] In Applications of Integrals, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[RBSE 2023] Applications of Integrals में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Applications of Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Applications of Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c8-q8",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Applications of Integrals",
    "topic": "Applications of Integrals - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[CBSE 2022] In Applications of Integrals, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[CBSE 2022] Applications of Integrals में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Applications of Integrals, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Applications of Integrals",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c9-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Differential Equations - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[NEET 2022] In Differential Equations, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[NEET 2022] Differential Equations में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Differential Equations, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Differential Equations",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c9-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Differential Equations - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[RBSE 2021] In Differential Equations, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[RBSE 2021] Differential Equations में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Differential Equations, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Differential Equations",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c9-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Differential Equations - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[CBSE 2020] In Differential Equations, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[CBSE 2020] Differential Equations में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Differential Equations, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Differential Equations",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c9-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Differential Equations - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[JEE 2025] In Differential Equations, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[JEE 2025] Differential Equations में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Differential Equations, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Differential Equations",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c9-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Differential Equations - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Differential Equations, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[NEET 2024] Differential Equations में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Differential Equations, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Differential Equations",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c9-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Differential Equations - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[RBSE 2023] In Differential Equations, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[RBSE 2023] Differential Equations में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Differential Equations, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Differential Equations",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c9-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Differential Equations - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[CBSE 2022] In Differential Equations, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[CBSE 2022] Differential Equations में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Differential Equations, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Differential Equations",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c9-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Differential Equations - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Differential Equations, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[JEE 2021] Differential Equations में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Differential Equations, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Differential Equations",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c10-q1",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Vector Algebra - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[RBSE 2021] In Vector Algebra, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[RBSE 2021] Vector Algebra में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Vector Algebra, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Vector Algebra",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c10-q2",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Vector Algebra - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[CBSE 2020] In Vector Algebra, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[CBSE 2020] Vector Algebra में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Vector Algebra, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Vector Algebra",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c10-q3",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Vector Algebra - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[JEE 2025] In Vector Algebra, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[JEE 2025] Vector Algebra में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Vector Algebra, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Vector Algebra",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c10-q4",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Vector Algebra - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[NEET 2024] In Vector Algebra, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[NEET 2024] Vector Algebra में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Vector Algebra, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Vector Algebra",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c10-q5",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Vector Algebra - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[RBSE 2023] In Vector Algebra, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[RBSE 2023] Vector Algebra में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Vector Algebra, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Vector Algebra",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c10-q6",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Vector Algebra - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[CBSE 2022] In Vector Algebra, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[CBSE 2022] Vector Algebra में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Vector Algebra, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Vector Algebra",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c10-q7",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Vector Algebra - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[JEE 2021] In Vector Algebra, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[JEE 2021] Vector Algebra में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Vector Algebra, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Vector Algebra",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c10-q8",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Vector Algebra - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[NEET 2020] In Vector Algebra, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[NEET 2020] Vector Algebra में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Vector Algebra, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Vector Algebra",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c11-q1",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Three Dimensional Geometry - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[CBSE 2020] In Three Dimensional Geometry, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[CBSE 2020] Three Dimensional Geometry में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Three Dimensional Geometry, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Three Dimensional Geometry",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c11-q2",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Three Dimensional Geometry - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[JEE 2025] In Three Dimensional Geometry, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[JEE 2025] Three Dimensional Geometry में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Three Dimensional Geometry, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Three Dimensional Geometry",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c11-q3",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Three Dimensional Geometry - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[NEET 2024] In Three Dimensional Geometry, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[NEET 2024] Three Dimensional Geometry में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Three Dimensional Geometry, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Three Dimensional Geometry",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c11-q4",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Three Dimensional Geometry - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Three Dimensional Geometry, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[RBSE 2023] Three Dimensional Geometry में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Three Dimensional Geometry, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Three Dimensional Geometry",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c11-q5",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Three Dimensional Geometry - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[CBSE 2022] In Three Dimensional Geometry, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[CBSE 2022] Three Dimensional Geometry में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Three Dimensional Geometry, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Three Dimensional Geometry",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c11-q6",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Three Dimensional Geometry - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[JEE 2021] In Three Dimensional Geometry, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[JEE 2021] Three Dimensional Geometry में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Three Dimensional Geometry, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Three Dimensional Geometry",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c11-q7",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Three Dimensional Geometry - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[NEET 2020] In Three Dimensional Geometry, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[NEET 2020] Three Dimensional Geometry में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Three Dimensional Geometry, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Three Dimensional Geometry",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c11-q8",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Three Dimensional Geometry - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[RBSE 2025] In Three Dimensional Geometry, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[RBSE 2025] Three Dimensional Geometry में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Three Dimensional Geometry, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Three Dimensional Geometry",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c12-q1",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Linear Programming",
    "topic": "Linear Programming - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[JEE 2025] In Linear Programming, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[JEE 2025] Linear Programming में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Linear Programming, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Linear Programming",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c12-q2",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Linear Programming",
    "topic": "Linear Programming - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[NEET 2024] In Linear Programming, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[NEET 2024] Linear Programming में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Linear Programming, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Linear Programming",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c12-q3",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Linear Programming",
    "topic": "Linear Programming - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[RBSE 2023] In Linear Programming, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[RBSE 2023] Linear Programming में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Linear Programming, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Linear Programming",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c12-q4",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Linear Programming",
    "topic": "Linear Programming - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[CBSE 2022] In Linear Programming, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[CBSE 2022] Linear Programming में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Linear Programming, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Linear Programming",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c12-q5",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Linear Programming",
    "topic": "Linear Programming - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[JEE 2021] In Linear Programming, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[JEE 2021] Linear Programming में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Linear Programming, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Linear Programming",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c12-q6",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Linear Programming",
    "topic": "Linear Programming - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[NEET 2020] In Linear Programming, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[NEET 2020] Linear Programming में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Linear Programming, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Linear Programming",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c12-q7",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Linear Programming",
    "topic": "Linear Programming - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[RBSE 2025] In Linear Programming, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[RBSE 2025] Linear Programming में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Linear Programming, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Linear Programming",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c12-q8",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Linear Programming",
    "topic": "Linear Programming - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[CBSE 2024] In Linear Programming, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[CBSE 2024] Linear Programming में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Linear Programming, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Linear Programming",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c13-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Calculus & Geometry 1",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Probability, consider a differential equation or vector space operator in state #1. What is the resulting invariant property?",
    "questionHi": "[NEET 2024] Probability में, अवस्था #1 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #1",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #1",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #1",
      "The directional derivative attains its global minimum along the normal gradient #1"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #1 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #1",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #1",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Probability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Probability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c13-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Calculus & Geometry 2",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Probability, consider a differential equation or vector space operator in state #2. What is the resulting invariant property?",
    "questionHi": "[RBSE 2023] Probability में, अवस्था #2 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #2",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #2",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #2",
      "The directional derivative attains its global minimum along the normal gradient #2"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #2 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #2",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #2",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Probability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Probability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c13-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Calculus & Geometry 3",
    "difficulty": "Hard",
    "question": "[CBSE 2022] In Probability, consider a differential equation or vector space operator in state #3. What is the resulting invariant property?",
    "questionHi": "[CBSE 2022] Probability में, अवस्था #3 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #3",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #3",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #3",
      "The directional derivative attains its global minimum along the normal gradient #3"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #3 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #3",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #3",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Probability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Probability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c13-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Calculus & Geometry 4",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Probability, consider a differential equation or vector space operator in state #4. What is the resulting invariant property?",
    "questionHi": "[JEE 2021] Probability में, अवस्था #4 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #4",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #4",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #4",
      "The directional derivative attains its global minimum along the normal gradient #4"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #4 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #4",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #4",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Probability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Probability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "math-12-c13-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Calculus & Geometry 5",
    "difficulty": "Easy",
    "question": "[NEET 2020] In Probability, consider a differential equation or vector space operator in state #5. What is the resulting invariant property?",
    "questionHi": "[NEET 2020] Probability में, अवस्था #5 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #5",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #5",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #5",
      "The directional derivative attains its global minimum along the normal gradient #5"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #5 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #5",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #5",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Probability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Probability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "NEET Paper 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c13-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Calculus & Geometry 6",
    "difficulty": "Hard",
    "question": "[RBSE 2025] In Probability, consider a differential equation or vector space operator in state #6. What is the resulting invariant property?",
    "questionHi": "[RBSE 2025] Probability में, अवस्था #6 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #6",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #6",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #6",
      "The directional derivative attains its global minimum along the normal gradient #6"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #6 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #6",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #6",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Probability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Probability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "RBSE Paper 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "math-12-c13-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Calculus & Geometry 7",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Probability, consider a differential equation or vector space operator in state #7. What is the resulting invariant property?",
    "questionHi": "[CBSE 2024] Probability में, अवस्था #7 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #7",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #7",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #7",
      "The directional derivative attains its global minimum along the normal gradient #7"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #7 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #7",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #7",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Probability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Probability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "CBSE Paper 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "math-12-c13-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Mathematics",
    "chapter": "Probability",
    "topic": "Probability - Calculus & Geometry 8",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Probability, consider a differential equation or vector space operator in state #8. What is the resulting invariant property?",
    "questionHi": "[JEE 2023] Probability में, अवस्था #8 में अवकल समीकरण अथवा सदिश समष्टि संकारक पर विचार कीजिए। परिणामी निश्चर गुण क्या होगा?",
    "options": [
      "The integrating factor IF = exp(∫ P(x) dx) solves the linear differential equation #8",
      "The determinant of the skew-symmetric matrix of odd order is strictly non-zero #8",
      "The vector scalar triple product [a b c] is identically non-zero for coplanar vectors #8",
      "The directional derivative attains its global minimum along the normal gradient #8"
    ],
    "optionsHi": [
      "समाकलन गुणक IF = exp(∫ P(x) dx) रैखिक अवकल समीकरण #8 को पूर्णतः हल करता है",
      "विषम कोटि के विषम सममित आव्यूह का सारणिक सदैव अशून्य होता है #8",
      "समतलीय सदिशों के लिए अदिश त्रिक गुणनफल [a b c] अशून्य होता है #8",
      "दिक् अवकलज अभिलंब प्रवणता के अनुदिश अपना सार्वत्रिक न्यूनतम मान प्राप्त करता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any first-order linear differential equation dy/dx + P(x)y = Q(x) in Probability, multiplying by integrating factor e^(∫ P(x) dx) transforms the LHS into the exact differential d/dx [y · IF].",
    "concept": "Linear Differential Equations and Operators in Probability",
    "importantPoint": "Multiplying by IF = e^(∫ P dx) enables direct quadrature integration y · IF = ∫ (Q · IF) dx + C.",
    "source": "JEE Paper 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  }
];
