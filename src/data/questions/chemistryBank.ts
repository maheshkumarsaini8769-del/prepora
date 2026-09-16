import { Question } from "../../types";

export const chemistryBank: Question[] = [
  {
    "id": "chem-11-mol-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Mole Concept & Redox Titration",
    "difficulty": "Medium",
    "question": "What volume of 0.1 M KMnO4 solution in acidic medium is required to oxidize 25 mL of 0.2 M FeSO4 solution?",
    "questionHi": "अम्लीय माध्यम में 25 मिली 0.2 M FeSO4 को ऑक्सीकृत करने के लिए 0.1 M KMnO4 के कितने आयतन की आवश्यकता होगी?",
    "options": [
      "10 mL",
      "5 mL",
      "25 mL",
      "2.5 mL"
    ],
    "optionsHi": [
      "10 मिली",
      "5 मिली",
      "25 मिली",
      "2.5 मिली"
    ],
    "correctAnswer": 0,
    "explanation": "In acid, KMnO4 n-factor = 5; FeSO4 n-factor = 1. N1 V1 = N2 V2 => (0.1 × 5) × V = (0.2 × 1) × 25 => 0.5 V = 5 => V = 10 mL.",
    "concept": "Equivalence principle in potassium permanganate titrations.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-mot-01",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Molecular Orbital Theory",
    "difficulty": "Easy",
    "question": "According to Molecular Orbital Theory (MOT), which of the following species is diamagnetic?",
    "questionHi": "आण्विक कक्षक सिद्धांत (MOT) के अनुसार, निम्न में से कौन सी स्पीशीज प्रतिचुंबकीय (diamagnetic) है?",
    "options": [
      "O₂",
      "O₂²⁻",
      "B₂",
      "NO"
    ],
    "optionsHi": [
      "O₂",
      "O₂²⁻",
      "B₂",
      "NO"
    ],
    "correctAnswer": 1,
    "explanation": "O₂²⁻ has 18 electrons with all molecular orbitals completely paired, making it diamagnetic.",
    "concept": "Magnetic properties based on MOT electron pairing.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-vsp-01",
    "exam": "Board",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "VSEPR Geometry of XeF4",
    "difficulty": "Easy",
    "question": "What is the geometry, hybridization, and number of lone pairs on the central atom in XeF4?",
    "questionHi": "XeF4 में केंद्रीय परमाणु का संकरण, ज्यामिति तथा एकाकी युग्मों की संख्या क्या है?",
    "options": [
      "sp³d², Square Planar, 2 lone pairs",
      "sp³d, See-saw, 1 lone pair",
      "sp³d², Octahedral, 0 lone pairs",
      "sp³d, Square Pyramidal, 1 lone pair"
    ],
    "optionsHi": [
      "sp³d², वर्ग समतलीय, 2 एकाकी युग्म",
      "sp³d, सी-सॉ, 1 एकाकी युग्म",
      "sp³d², अष्टफलकीय, 0 एकाकी युग्म",
      "sp³d, वर्ग पिरामिडी, 1 एकाकी युग्म"
    ],
    "correctAnswer": 0,
    "explanation": "Xe has 8 valence electrons (4 bond pairs + 2 lone pairs) => steric number 6 => sp³d² square planar.",
    "concept": "VSEPR theory and xenon fluoride molecular geometry.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-ksp-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Solubility Product Ksp",
    "difficulty": "Medium",
    "question": "The solubility product Ksp of Ag2CrO4 is 3.2 × 10⁻¹¹ at 298 K. The molar solubility in pure water is:",
    "questionHi": "298 K पर Ag2CrO4 का विलेयता गुणनफल Ksp = 3.2 × 10⁻¹¹ है। शुद्ध जल में मोलर विलेयता क्या है?",
    "options": [
      "2.0 × 10⁻⁴ M",
      "1.0 × 10⁻⁴ M",
      "8.0 × 10⁻⁶ M",
      "5.6 × 10⁻⁶ M"
    ],
    "optionsHi": [
      "2.0 × 10⁻⁴ M",
      "1.0 × 10⁻⁴ M",
      "8.0 × 10⁻⁶ M",
      "5.6 × 10⁻⁶ M"
    ],
    "correctAnswer": 0,
    "explanation": "For Ag2CrO4: Ksp = (2S)²(S) = 4 S³ = 32 × 10⁻¹² => S³ = 8 × 10⁻¹² => S = 2.0 × 10⁻⁴ M.",
    "concept": "Molar solubility calculation for A2B type sparingly soluble salts.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-sol-01",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Van't Hoff Factor",
    "difficulty": "Medium",
    "question": "A 0.01 m aqueous solution of K4[Fe(CN)6] freezes at -0.0744 °C. The degree of dissociation α is: (Kf = 1.86 K kg mol⁻¹)",
    "questionHi": "K4[Fe(CN)6] का 0.01 m विलयन -0.0744 °C पर जमता है। वियोजन की मात्रा α है: (Kf = 1.86)",
    "options": [
      "75%",
      "85%",
      "90%",
      "100%"
    ],
    "optionsHi": [
      "75%",
      "85%",
      "90%",
      "100%"
    ],
    "correctAnswer": 0,
    "explanation": "ΔTf = i Kf m => 0.0744 = i (1.86)(0.01) => i = 4.0. Since n = 5, i = 1 + 4α => 4 = 1 + 4α => α = 0.75 = 75%.",
    "concept": "Degree of dissociation from freezing point depression.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-nrn-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Nernst Equation",
    "difficulty": "Medium",
    "question": "For Ni(s) + 2 Ag⁺(0.01 M) -> Ni²⁺(0.1 M) + 2 Ag(s) with E°_cell = 1.05 V, cell EMF at 298 K is: (2.303 RT/F = 0.06 V)",
    "questionHi": "सेल Ni + 2 Ag⁺(0.01 M) -> Ni²⁺(0.1 M) + 2 Ag के लिए E° = 1.05 V है। 298 K पर EMF क्या होगा:",
    "options": [
      "0.96 V",
      "1.05 V",
      "0.99 V",
      "1.14 V"
    ],
    "optionsHi": [
      "0.96 V",
      "1.05 V",
      "0.99 V",
      "1.14 V"
    ],
    "correctAnswer": 0,
    "explanation": "Q = [Ni²⁺]/[Ag⁺]² = 0.1/(0.01)² = 10³. E = 1.05 - (0.06/2) log(10³) = 1.05 - 0.09 = 0.96 V.",
    "concept": "Nernst equation for galvanic cells with unequal ion stoichiometry.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-kin-01",
    "exam": "Board",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "First Order Half-Life",
    "difficulty": "Easy",
    "question": "A first order reaction completes 75% in 32 minutes. The half-life (t_1/2) of this reaction is:",
    "questionHi": "एक प्रथम कोटि की अभिक्रिया 32 मिनट में 75% पूर्ण होती है। इसकी अर्ध-आयु (t_1/2) क्या है?",
    "options": [
      "16 minutes",
      "8 minutes",
      "24 minutes",
      "4 minutes"
    ],
    "optionsHi": [
      "16 मिनट",
      "8 मिनट",
      "24 मिनट",
      "4 मिनट"
    ],
    "correctAnswer": 0,
    "explanation": "For first order kinetics, t_75% = 2 × t_1/2 => t_1/2 = 32 / 2 = 16 minutes.",
    "concept": "Integrated rate law half-life properties.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-org-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Cannizzaro Reaction",
    "difficulty": "Medium",
    "question": "Which of the following aldehydes undergoes Cannizzaro reaction when treated with concentrated NaOH?",
    "questionHi": "सांद्र NaOH के साथ गर्म करने पर कौन सा ऐल्डिहाइड कैनिजारो अभिक्रिया देता है?",
    "options": [
      "Benzaldehyde (C6H5CHO)",
      "Acetaldehyde (CH3CHO)",
      "Acetone (CH3COCH3)",
      "Propionaldehyde (CH3CH2CHO)"
    ],
    "optionsHi": [
      "बेंजैल्डिहाइड (C6H5CHO)",
      "ऐसीटैल्डिहाइड (CH3CHO)",
      "ऐसीटोन (CH3COCH3)",
      "प्रोपियोनैल्डिहाइड (CH3CH2CHO)"
    ],
    "correctAnswer": 0,
    "explanation": "Cannizzaro reaction requires aldehydes without alpha-hydrogens, such as benzaldehyde or formaldehyde.",
    "concept": "Disproportionation of non-enolizable aldehydes.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-atm-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "de Broglie Wavelength",
    "difficulty": "Medium",
    "question": "The de Broglie wavelength of an electron accelerated through a potential difference of V volts is given by approximately:",
    "questionHi": "V वोल्ट के विभवांतर से त्वरित इलेक्ट्रॉन की दे ब्रॉग्ली तरंगदैर्ध्य लगभग किसके द्वारा दी जाती है?",
    "options": [
      "1.227 / √V nm",
      "12.27 / √V nm",
      "0.286 / √V nm",
      "0.101 / √V nm"
    ],
    "optionsHi": [
      "1.227 / √V nm",
      "12.27 / √V nm",
      "0.286 / √V nm",
      "0.101 / √V nm"
    ],
    "correctAnswer": 0,
    "explanation": "λ = h / √(2 m e V) = 1.227 / √V nm (or 12.27 / √V Å).",
    "concept": "Matter wave wavelength of charged subatomic particles under electrostatic acceleration.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-thm-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Gibbs Free Energy & Spontaneity",
    "difficulty": "Medium",
    "question": "For a reaction to be spontaneous at all temperatures, the signs of enthalpy change (ΔH) and entropy change (ΔS) must be respectively:",
    "questionHi": "किसी अभिक्रिया के सभी तापमानों पर स्वतः प्रवर्तित होने के लिए एन्थैल्पी परिवर्तन (ΔH) और एन्ट्रॉपी परिवर्तन (ΔS) के चिन्ह क्रमशः होने चाहिए:",
    "options": [
      "Negative, Positive",
      "Positive, Negative",
      "Negative, Negative",
      "Positive, Positive"
    ],
    "optionsHi": [
      "ऋणात्मक, धनात्मक",
      "धनात्मक, ऋणात्मक",
      "ऋणात्मक, ऋणात्मक",
      "धनात्मक, धनात्मक"
    ],
    "correctAnswer": 0,
    "explanation": "ΔG = ΔH - T ΔS. For spontaneity, ΔG must be negative. If ΔH < 0 (exothermic) and ΔS > 0, then ΔG is negative at all temperatures.",
    "concept": "Gibbs-Helmholtz equation and criteria for thermodynamic spontaneity.",
    "source": "PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-crd-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Crystal Field Stabilization Energy (CFSE)",
    "difficulty": "Hard",
    "question": "The spin-only magnetic moment of [Fe(CN)6]³⁻ and [Fe(H2O)6]³⁺ complexes in Bohr Magneton (BM) are respectively:",
    "questionHi": "[Fe(CN)6]³⁻ और [Fe(H2O)6]³⁺ संकुलों के चक्रण-मात्र चुंबकीय आघूर्ण (BM में) क्रमशः हैं:",
    "options": [
      "1.73 BM and 5.92 BM",
      "5.92 BM and 1.73 BM",
      "0 BM and 4.90 BM",
      "2.83 BM and 3.87 BM"
    ],
    "optionsHi": [
      "1.73 BM तथा 5.92 BM",
      "5.92 BM तथा 1.73 BM",
      "0 BM तथा 4.90 BM",
      "2.83 BM तथा 3.87 BM"
    ],
    "correctAnswer": 0,
    "explanation": "Fe³⁺ has 3d⁵ configuration. CN⁻ is a strong field ligand, causing pairing (t2g⁵ eg⁰), giving 1 unpaired electron => μ = √(1(3)) = 1.73 BM. H2O is a weak field ligand, giving high-spin (t2g³ eg²), having 5 unpaired electrons => μ = √(5(7)) = √35 ≈ 5.92 BM.",
    "concept": "Crystal Field Theory (CFT) splitting and spin-only magnetic moment.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-alc-01",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Lucas Test",
    "difficulty": "Easy",
    "question": "When an unknown alcohol is treated with Lucas reagent (anhydrous ZnCl2 + conc. HCl), turbidity appears immediately at room temperature. The alcohol is:",
    "questionHi": "जब एक अज्ञात ऐल्कोहॉल को ल्यूकास अभिकर्मक (निर्जल ZnCl2 + सांद्र HCl) के साथ मिलाया जाता है, तो कमरे के ताप पर तुरंत धुंधलापन (turbidity) आ जाता है। यह ऐल्कोहॉल है:",
    "options": [
      "Tertiary alcohol",
      "Secondary alcohol",
      "Primary alcohol",
      "Methanol"
    ],
    "optionsHi": [
      "तृतीयक ऐल्कोहॉल (3°)",
      "द्वितीयक ऐल्कोहॉल (2°)",
      "प्राथमिक ऐल्कोहॉल (1°)",
      "मेथनॉल"
    ],
    "correctAnswer": 0,
    "explanation": "Lucas test reactivity order is 3° > 2° > 1° due to carbocation stability. Tertiary alcohols react immediately giving insoluble alkyl chloride turbidity.",
    "concept": "Chemical test for distinguishing primary, secondary, and tertiary alcohols.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-amn-01",
    "exam": "Board",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Hoffmann Bromamide Degradation",
    "difficulty": "Easy",
    "question": "The conversion of an amide into a primary amine with one less carbon atom using Br2 and aqueous KOH is known as:",
    "questionHi": "Br2 और जलीय KOH का उपयोग करके एक कार्बन कम वाले प्राथमिक ऐमीन में ऐमाइड के परिवर्तन को कहा जाता है:",
    "options": [
      "Hoffmann bromamide degradation reaction",
      "Gabriel phthalimide synthesis",
      "Carbylamine reaction",
      "Cannizzaro reaction"
    ],
    "optionsHi": [
      "हॉफमैन ब्रोमामाइड निम्नीकरण अभिक्रिया",
      "गैब्रिएल थैलिमाइड संश्लेषण",
      "कार्बिलऐमीन अभिक्रिया",
      "कैनिजारो अभिक्रिया"
    ],
    "correctAnswer": 0,
    "explanation": "R-CONH2 + Br2 + 4 KOH -> R-NH2 + K2CO3 + 2 KBr + 2 H2O. This step-down reaction is Hoffmann bromamide degradation.",
    "concept": "Organic synthesis of primary amines with carbon chain reduction.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-bio-01",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Proteins & Peptide Linkage",
    "difficulty": "Easy",
    "question": "The helical structure of protein (alpha-helix) is stabilized primarily by:",
    "questionHi": "प्रोटीन की कुंडलित संरचना (अल्फा-हेलिक्स) मुख्य रूप से किसके द्वारा स्थिर होती है?",
    "options": [
      "Intramolecular hydrogen bonding",
      "Disulfide bridges",
      "Ionic electrostatic attraction",
      "Van der Waals forces"
    ],
    "optionsHi": [
      "अंतरा-आण्विक हाइड्रोजन बंध",
      "डाइसल्फाइड सेतु",
      "विद्युतस्थैतिक आकर्षण",
      "वान्डर वाल्स बल"
    ],
    "correctAnswer": 0,
    "explanation": "In an alpha-helix, the -NH- group of each amino acid residue forms a hydrogen bond with the -C=O group of the adjacent turn (residue 4 units ahead).",
    "concept": "Secondary structure stabilization of polypeptide chains.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  }
];
