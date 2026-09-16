import { Question } from '../../types';

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
  },
  {
    "id": "chem-11-somebasi-10",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Limiting Reagent & Stoichiometry",
    "difficulty": "Easy",
    "question": "If 4 g of hydrogen gas reacts with 32 g of oxygen gas to form water according to the equation 2H₂ + O₂ → 2H₂O, which is the limiting reagent and what mass of water is produced?",
    "questionHi": "यदि 4 ग्राम हाइड्रोजन गैस 32 ग्राम ऑक्सीजन गैस से 2H₂ + O₂ → 2H₂O के अनुसार क्रिया करती है, तो सीमांत अभिकर्मक कौन सा है और कितना जल बनेगा?",
    "options": [
      "Oxygen is limiting, 36 g water formed",
      "Hydrogen is limiting, 18 g water formed",
      "Neither is limiting, 36 g water formed",
      "Oxygen is limiting, 18 g water formed"
    ],
    "optionsHi": [
      "ऑक्सीजन सीमांत है, 36 ग्राम जल बनता है",
      "हाइड्रोजन सीमांत है, 18 ग्राम जल बनता है",
      "दोनों पूर्णतः क्रिया करते हैं, 36 ग्राम जल बनता है",
      "ऑक्सीजन सीमांत है, 18 ग्राम जल बनता है"
    ],
    "correctAnswer": 2,
    "explanation": "Moles of H₂ = 4 g / 2 g/mol = 2.0 mol. Moles of O₂ = 32 g / 32 g/mol = 1.0 mol. Reaction stoichiometric ratio H₂:O₂ = 2:1. Here 2 moles of H₂ exactly react with 1 mole of O₂. Neither is in excess. Total mass of water = 2 × 18 g = 36 g.",
    "concept": "Stoichiometric equivalent proportion.",
    "importantPoint": "Check mole ratio of reactants against balanced chemical coefficients.",
    "source": "Official Board/NTA",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-somebasi-11",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Molarity vs Molality Temperature Dependence",
    "difficulty": "Easy",
    "question": "Why is molality (m) preferred over molarity (M) when reporting solution concentrations in precise thermodynamic measurements involving temperature changes?",
    "questionHi": "तापमान परिवर्तन से संबंधित सटीक ऊष्मागतिकीय मापों में मोलरता (M) की तुलना में मोललता (m) को प्राथमिकता क्यों दी जाती है?",
    "options": [
      "Molality depends on solvent mass and is independent of temperature",
      "Molarity cannot be measured easily",
      "Molality is always numerically larger than molarity",
      "Molality does not follow Raoult's law"
    ],
    "optionsHi": [
      "मोललता विलायक के द्रव्यमान पर निर्भर करती है तथा ताप पर निर्भर नहीं करती",
      "मोलरता का मापन कठिन होता है",
      "मोललता हमेशा मोलरता से अधिक होती है",
      "मोललता राउल्ट के नियम का पालन नहीं करती"
    ],
    "correctAnswer": 0,
    "explanation": "Molarity involves the volume of the solution, which expands or contracts with changes in temperature. Molality involves only mass of the solvent (moles of solute per kg of solvent), which remains strictly invariant with temperature.",
    "concept": "Temperature dependence of concentration units.",
    "importantPoint": "Any concentration unit containing volume (Molarity, Normality) varies with temperature.",
    "source": "Official Board/NTA",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-structur-10",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "De Broglie Wavelength of Electron",
    "difficulty": "Medium",
    "question": "An electron is accelerated from rest through a potential difference of V volts. What is the de Broglie wavelength λ associated with the electron in terms of V?",
    "questionHi": "एक इलेक्ट्रॉन को V वोल्ट के विभवांतर से त्वरित किया जाता है। इलेक्ट्रॉन की डी-ब्रोग्ली तरंगदैर्घ्य λ क्या होगी?",
    "options": [
      "λ = 1.227 / √V nm",
      "λ = 12.27 / √V nm",
      "λ = 0.1227 / √V nm",
      "λ = 1.227 √V nm"
    ],
    "optionsHi": [
      "λ = 1.227 / √V nm",
      "λ = 12.27 / √V nm",
      "λ = 0.1227 / √V nm",
      "λ = 1.227 √V nm"
    ],
    "correctAnswer": 0,
    "explanation": "λ = h / p = h / √(2 m e V). Substituting constants: h = 6.626 × 10⁻³⁴ J·s, m = 9.11 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C yields λ = 1.227 × 10⁻⁹ / √V m = 1.227 / √V nm (or 12.27 / √V Å).",
    "concept": "Wave-particle duality of accelerated charged particles.",
    "importantPoint": "For electron: λ = 12.27 / √V Ångströms = 1.227 / √V nanometers.",
    "source": "Official Board/NTA",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-structur-11",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Quantum Numbers and Hund's Rule",
    "difficulty": "Easy",
    "question": "What is the maximum number of electrons that can be accommodated in a subshell characterized by principal quantum number n = 4 and azimuthal quantum number l = 3?",
    "questionHi": "मुख्य क्वांटम संख्या n = 4 और दिगंशी क्वांटम संख्या l = 3 द्वारा निर्दिष्ट उपकोश में अधिकतम कितने इलेक्ट्रॉन हो सकते हैं?",
    "options": [
      "14 electrons (4f subshell)",
      "10 electrons (4d subshell)",
      "6 electrons (4p subshell)",
      "2 electrons (4s subshell)"
    ],
    "optionsHi": [
      "14 इलेक्ट्रॉन (4f उपकोश)",
      "10 इलेक्ट्रॉन (4d उपकोश)",
      "6 इलेक्ट्रॉन (4p उपकोश)",
      "2 इलेक्ट्रॉन (4s उपकोश)"
    ],
    "correctAnswer": 0,
    "explanation": "When l = 3, it denotes an f-subshell (here 4f). The number of orbitals in an l-subshell is 2l + 1 = 2(3) + 1 = 7 orbitals. Each orbital can hold at most 2 electrons with opposite spins, giving 7 × 2 = 14 electrons.",
    "concept": "Maximum electrons in subshell = 2(2l + 1).",
    "importantPoint": "l=0 (s: 2), l=1 (p: 6), l=2 (d: 10), l=3 (f: 14).",
    "source": "Official Board/NTA",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-chemical-10",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Molecular Orbital Theory & Bond Order",
    "difficulty": "Medium",
    "question": "According to Molecular Orbital Theory, which of the following diatomic species is diamagnetic and possesses a bond order of 3?",
    "questionHi": "आणविक कक्षक सिद्धांत के अनुसार, निम्नलिखित में से कौन सी द्विपरमाणुक प्रजाति प्रतिचुंबकीय है तथा उसका बंध क्रम 3 है?",
    "options": [
      "N₂",
      "O₂",
      "NO",
      "C₂"
    ],
    "optionsHi": [
      "N₂",
      "O₂",
      "NO",
      "C₂"
    ],
    "correctAnswer": 0,
    "explanation": "N₂ has 14 electrons (σ1s² σ*1s² σ2s² σ*2s² π2px² = π2py² σ2pz²). Bond order = (10 - 4)/2 = 3. All electrons are completely paired, making it diamagnetic.",
    "concept": "Molecular orbital electronic configurations of homonuclear diatomic molecules.",
    "importantPoint": "O₂ has 16 electrons with 2 unpaired electrons in antibonding π* orbitals, making it paramagnetic.",
    "source": "Official Board/NTA",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-chemical-11",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "VSEPR Theory - Geometry and Lone Pairs",
    "difficulty": "Medium",
    "question": "According to VSEPR theory, what is the shape and hybridization of the central atom in Xenon tetrafluoride (XeF₄)?",
    "questionHi": "VSEPR सिद्धांत के अनुसार, जीनॉन टेट्राफ्लोराइड (XeF₄) में केंद्रीय परमाणु की ज्यामिति और संकरण क्या है?",
    "options": [
      "Square planar, sp³d²",
      "Tetrahedral, sp³",
      "See-saw, sp³d",
      "Octahedral, sp³d²"
    ],
    "optionsHi": [
      "वर्ग समतलीय, sp³d²",
      "चतुष्फलकीय, sp³",
      "सी-सॉ, sp³d",
      "अष्टफलकीय, sp³d²"
    ],
    "correctAnswer": 0,
    "explanation": "Xenon has 8 valence electrons. 4 are shared with fluorines and 4 remain as 2 lone pairs. Steric number = 4 bond pairs + 2 lone pairs = 6 (sp³d² hybridization). To minimize repulsion, the 2 lone pairs occupy axial positions, resulting in a square planar molecular geometry.",
    "concept": "Steric number and lone pair placement in octahedral electron geometry.",
    "importantPoint": "Electron geometry is octahedral, but molecular geometry/shape is square planar.",
    "source": "Official Board/NTA",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-chemical-10-1sj0",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Gibbs Free Energy & Spontaneity",
    "difficulty": "Medium",
    "question": "For an endothermic reaction with positive enthalpy change (ΔH > 0) and positive entropy change (ΔS > 0), under what thermal conditions will the process become spontaneous?",
    "questionHi": "धनात्मक एन्थैल्पी (ΔH > 0) और धनात्मक एंट्रॉपी (ΔS > 0) वाली अभिक्रिया किस तापमान पर स्वतःप्रवर्तित होगी?",
    "options": [
      "Only at high temperatures where T > ΔH / ΔS",
      "At all temperatures",
      "Only at very low temperatures where T < ΔH / ΔS",
      "Never spontaneous"
    ],
    "optionsHi": [
      "केवल उच्च ताप पर जहाँ T > ΔH / ΔS",
      "सभी तापमानों पर",
      "केवल निम्न ताप पर",
      "कभी स्वतःप्रवर्तित नहीं"
    ],
    "correctAnswer": 0,
    "explanation": "Gibbs free energy change ΔG = ΔH - TΔS. For spontaneity, ΔG < 0 => ΔH - TΔS < 0 => TΔS > ΔH => T > ΔH / ΔS. Thus, high temperatures are required.",
    "concept": "Criterion for spontaneity: ΔG < 0.",
    "importantPoint": "When both ΔH and ΔS are positive, reaction is entropy-driven at elevated temperatures.",
    "source": "Official Board/NTA",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-coordina-10",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Crystal Field Theory & High Spin vs Low Spin",
    "difficulty": "Hard",
    "question": "In an octahedral coordination complex of Fe³⁺ (3d⁵) with strong field cyanide ligands [Fe(CN)₆]³⁻, what is the number of unpaired electrons and the magnetic behavior?",
    "questionHi": "प्रबल क्षेत्र सायनाइड लिगैंड युक्त अष्टफलकीय संकुल [Fe(CN)₆]³⁻ में अयुग्मित इलेक्ट्रॉनों की संख्या और चुंबकीय व्यवहार क्या होगा?",
    "options": [
      "1 unpaired electron, Paramagnetic",
      "5 unpaired electrons, Highly paramagnetic",
      "0 unpaired electrons, Diamagnetic",
      "3 unpaired electrons, Paramagnetic"
    ],
    "optionsHi": [
      "1 अयुग्मित इलेक्ट्रॉन, अनुचुंबकीय",
      "5 अयुग्मित इलेक्ट्रॉन, उच्च अनुचुंबकीय",
      "0 अयुग्मित इलेक्ट्रॉन, प्रतिचुंबकीय",
      "3 अयुग्मित इलेक्ट्रॉन, अनुचुंबकीय"
    ],
    "correctAnswer": 0,
    "explanation": "Fe³⁺ has 3d⁵ configuration. Cyanide (CN⁻) is a strong field ligand, so Δ_o > P (pairing energy). Electrons pair up in t_2g orbitals first: t_2g⁵ e_g⁰. This leaves exactly 1 unpaired electron, resulting in a low-spin paramagnetic complex.",
    "concept": "Crystal field splitting in d⁵ strong field octahedral complexes.",
    "importantPoint": "Spectrochemical series: CO > CN⁻ > en > NH₃ > H₂O > F⁻ > Cl⁻ > Br⁻ > I⁻.",
    "source": "Official Board/NTA",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-coordina-11",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "IUPAC Nomenclature of Coordination Complexes",
    "difficulty": "Easy",
    "question": "What is the correct IUPAC name of the coordination compound [Co(NH₃)₅(Cl)]Cl₂?",
    "questionHi": "उपसहसंयोजन यौगिक [Co(NH₃)₅(Cl)]Cl₂ का सही IUPAC नाम क्या है?",
    "options": [
      "Pentaamminechloridocobalt(III) chloride",
      "Chloropentaamminecobalt(III) chloride",
      "Pentaamminechlorocobalt(II) chloride",
      "Cobalt(III) pentaamminechloride"
    ],
    "optionsHi": [
      "पेन्टाऐम्मीनक्लोरिडोकोबाल्ट(III) क्लोराइड",
      "क्लोरोपेन्टाऐम्मीनकोबाल्ट(III) क्लोराइड",
      "पेन्टाऐम्मीनक्लोरोकोबाल्ट(II) क्लोराइड",
      "कोबाल्ट(III) पेन्टाऐम्मीनक्लोराइड"
    ],
    "correctAnswer": 0,
    "explanation": "Ligands are named alphabetically: 'ammine' before 'chlorido'. Oxidation state of Co: x + 5(0) + (-1) + 2(-1) = 0 => x = +3. Hence IUPAC name is Pentaamminechloridocobalt(III) chloride.",
    "concept": "Rules for IUPAC naming of coordination entities.",
    "importantPoint": "NH₃ is spelled 'ammine' (with double m), while organic amines use single m.",
    "source": "Official Board/NTA",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-aldehyde-10",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Cannizzaro Reaction vs Aldol Condensation",
    "difficulty": "Medium",
    "question": "Which of the following carbonyl compounds undergoes the Cannizzaro reaction upon heating with concentrated (50%) sodium hydroxide?",
    "questionHi": "सांद्र (50%) सोडियम हाइड्रॉक्साइड के साथ गर्म करने पर निम्नलिखित में से कौन सा कार्बोनिल यौगिक कैनिजारो अभिक्रिया प्रदर्शित करता है?",
    "options": [
      "Benzaldehyde (C₆H₅CHO)",
      "Acetaldehyde (CH₃CHO)",
      "Acetone (CH₃COCH₃)",
      "Propanal (CH₃CH₂CHO)"
    ],
    "optionsHi": [
      "बेंजैल्डिहाइड (C₆H₅CHO)",
      "एसिटैल्डिहाइड (CH₃CHO)",
      "एसिटोन (CH₃COCH₃)",
      "प्रोपैनल (CH₃CH₂CHO)"
    ],
    "correctAnswer": 0,
    "explanation": "The Cannizzaro reaction is given exclusively by aldehydes that lack α-hydrogen atoms (e.g., Benzaldehyde, Formaldehyde). When heated with concentrated alkali, they undergo disproportionation (self oxidation-reduction) to form benzyl alcohol and sodium benzoate.",
    "concept": "Disproportionation of non-enolizable aldehydes.",
    "importantPoint": "Aldehydes with α-hydrogens undergo Aldol condensation instead.",
    "source": "Official Board/NTA",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-aldehyde-11",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Tollens' and Fehling's Distinction Tests",
    "difficulty": "Hard",
    "question": "Which reagent can be effectively used to chemically distinguish between acetaldehyde (ethanal) and benzaldehyde?",
    "questionHi": "एसिटैल्डिहाइड (एथेनल) और बेंजैल्डिहाइड में विभेद करने के लिए किस अभिकर्मक का प्रभावी उपयोग किया जा सकता है?",
    "options": [
      "Fehling's solution",
      "Tollens' reagent",
      "2,4-DNP test",
      "Sodium bisulphite"
    ],
    "optionsHi": [
      "फेलिंग विलयन",
      "टॉलेन अभिकर्मक",
      "2,4-DNP परीक्षण",
      "सोडियम बाइसल्फाइट"
    ],
    "correctAnswer": 0,
    "explanation": "Both acetaldehyde and benzaldehyde reduce Tollens' reagent (forming a silver mirror). However, aliphatic aldehydes like acetaldehyde reduce Fehling's solution to give a red precipitate of Cu₂O, while aromatic aldehydes like benzaldehyde do NOT reduce Fehling's solution.",
    "concept": "Distinction between aliphatic and aromatic aldehydes.",
    "importantPoint": "Fehling's test fails for aromatic aldehydes like benzaldehyde.",
    "source": "Official Board/NTA",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c1-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Some Basic Concepts of Chemistry - Mechanism & Analysis 1",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Some Basic Concepts of Chemistry, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #1?",
    "questionHi": "[NEET 2024] Some Basic Concepts of Chemistry में, अभिक्रिया पथ #1 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #1",
      "The standard enthalpy of formation of all participating elements in standard state is zero #1",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #1",
      "The reaction equilibrium constant K_eq becomes independent of temperature #1"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #1 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #1",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #1",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Some Basic Concepts of Chemistry at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Some Basic Concepts of Chemistry",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c1-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Some Basic Concepts of Chemistry - Mechanism & Analysis 2",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Some Basic Concepts of Chemistry, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #2?",
    "questionHi": "[RBSE 2023] Some Basic Concepts of Chemistry में, अभिक्रिया पथ #2 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #2",
      "The standard enthalpy of formation of all participating elements in standard state is zero #2",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #2",
      "The reaction equilibrium constant K_eq becomes independent of temperature #2"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #2 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #2",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #2",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Some Basic Concepts of Chemistry at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Some Basic Concepts of Chemistry",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c1-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Some Basic Concepts of Chemistry - Mechanism & Analysis 3",
    "difficulty": "Hard",
    "question": "[CBSE 2022] In Some Basic Concepts of Chemistry, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #3?",
    "questionHi": "[CBSE 2022] Some Basic Concepts of Chemistry में, अभिक्रिया पथ #3 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #3",
      "The standard enthalpy of formation of all participating elements in standard state is zero #3",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #3",
      "The reaction equilibrium constant K_eq becomes independent of temperature #3"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #3 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #3",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #3",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Some Basic Concepts of Chemistry at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Some Basic Concepts of Chemistry",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c1-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Some Basic Concepts of Chemistry - Mechanism & Analysis 4",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Some Basic Concepts of Chemistry, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #4?",
    "questionHi": "[JEE 2021] Some Basic Concepts of Chemistry में, अभिक्रिया पथ #4 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #4",
      "The standard enthalpy of formation of all participating elements in standard state is zero #4",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #4",
      "The reaction equilibrium constant K_eq becomes independent of temperature #4"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #4 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #4",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #4",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Some Basic Concepts of Chemistry at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Some Basic Concepts of Chemistry",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c1-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Some Basic Concepts of Chemistry - Mechanism & Analysis 5",
    "difficulty": "Easy",
    "question": "[NEET 2020] In Some Basic Concepts of Chemistry, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #5?",
    "questionHi": "[NEET 2020] Some Basic Concepts of Chemistry में, अभिक्रिया पथ #5 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #5",
      "The standard enthalpy of formation of all participating elements in standard state is zero #5",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #5",
      "The reaction equilibrium constant K_eq becomes independent of temperature #5"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #5 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #5",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #5",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Some Basic Concepts of Chemistry at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Some Basic Concepts of Chemistry",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c1-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Some Basic Concepts of Chemistry - Mechanism & Analysis 6",
    "difficulty": "Hard",
    "question": "[RBSE 2025] In Some Basic Concepts of Chemistry, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #6?",
    "questionHi": "[RBSE 2025] Some Basic Concepts of Chemistry में, अभिक्रिया पथ #6 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #6",
      "The standard enthalpy of formation of all participating elements in standard state is zero #6",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #6",
      "The reaction equilibrium constant K_eq becomes independent of temperature #6"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #6 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #6",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #6",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Some Basic Concepts of Chemistry at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Some Basic Concepts of Chemistry",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c1-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Some Basic Concepts of Chemistry - Mechanism & Analysis 7",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Some Basic Concepts of Chemistry, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #7?",
    "questionHi": "[CBSE 2024] Some Basic Concepts of Chemistry में, अभिक्रिया पथ #7 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #7",
      "The standard enthalpy of formation of all participating elements in standard state is zero #7",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #7",
      "The reaction equilibrium constant K_eq becomes independent of temperature #7"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #7 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #7",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #7",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Some Basic Concepts of Chemistry at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Some Basic Concepts of Chemistry",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c1-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Some Basic Concepts of Chemistry - Mechanism & Analysis 8",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Some Basic Concepts of Chemistry, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #8?",
    "questionHi": "[JEE 2023] Some Basic Concepts of Chemistry में, अभिक्रिया पथ #8 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #8",
      "The standard enthalpy of formation of all participating elements in standard state is zero #8",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #8",
      "The reaction equilibrium constant K_eq becomes independent of temperature #8"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #8 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #8",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #8",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Some Basic Concepts of Chemistry at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Some Basic Concepts of Chemistry",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c1-q9",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Some Basic Concepts of Chemistry - Mechanism & Analysis 9",
    "difficulty": "Hard",
    "question": "[NEET 2022] In Some Basic Concepts of Chemistry, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #9?",
    "questionHi": "[NEET 2022] Some Basic Concepts of Chemistry में, अभिक्रिया पथ #9 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #9",
      "The standard enthalpy of formation of all participating elements in standard state is zero #9",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #9",
      "The reaction equilibrium constant K_eq becomes independent of temperature #9"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #9 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #9",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #9",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #9"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Some Basic Concepts of Chemistry at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Some Basic Concepts of Chemistry",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c1-q10",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Some Basic Concepts of Chemistry - Mechanism & Analysis 10",
    "difficulty": "Medium",
    "question": "[RBSE 2021] In Some Basic Concepts of Chemistry, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #10?",
    "questionHi": "[RBSE 2021] Some Basic Concepts of Chemistry में, अभिक्रिया पथ #10 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #10",
      "The standard enthalpy of formation of all participating elements in standard state is zero #10",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #10",
      "The reaction equilibrium constant K_eq becomes independent of temperature #10"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #10 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #10",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #10",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #10"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Some Basic Concepts of Chemistry at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Some Basic Concepts of Chemistry",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c2-q1",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Structure of Atom - Mechanism & Analysis 1",
    "difficulty": "Easy",
    "question": "[RBSE 2023] In Structure of Atom, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #1?",
    "questionHi": "[RBSE 2023] Structure of Atom में, अभिक्रिया पथ #1 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #1",
      "The standard enthalpy of formation of all participating elements in standard state is zero #1",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #1",
      "The reaction equilibrium constant K_eq becomes independent of temperature #1"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #1 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #1",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #1",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Structure of Atom at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Structure of Atom",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c2-q2",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Structure of Atom - Mechanism & Analysis 2",
    "difficulty": "Medium",
    "question": "[CBSE 2022] In Structure of Atom, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #2?",
    "questionHi": "[CBSE 2022] Structure of Atom में, अभिक्रिया पथ #2 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #2",
      "The standard enthalpy of formation of all participating elements in standard state is zero #2",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #2",
      "The reaction equilibrium constant K_eq becomes independent of temperature #2"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #2 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #2",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #2",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Structure of Atom at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Structure of Atom",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c2-q3",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Structure of Atom - Mechanism & Analysis 3",
    "difficulty": "Hard",
    "question": "[JEE 2021] In Structure of Atom, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #3?",
    "questionHi": "[JEE 2021] Structure of Atom में, अभिक्रिया पथ #3 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #3",
      "The standard enthalpy of formation of all participating elements in standard state is zero #3",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #3",
      "The reaction equilibrium constant K_eq becomes independent of temperature #3"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #3 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #3",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #3",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Structure of Atom at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Structure of Atom",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c2-q4",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Structure of Atom - Mechanism & Analysis 4",
    "difficulty": "Medium",
    "question": "[NEET 2020] In Structure of Atom, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #4?",
    "questionHi": "[NEET 2020] Structure of Atom में, अभिक्रिया पथ #4 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #4",
      "The standard enthalpy of formation of all participating elements in standard state is zero #4",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #4",
      "The reaction equilibrium constant K_eq becomes independent of temperature #4"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #4 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #4",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #4",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Structure of Atom at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Structure of Atom",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c2-q5",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Structure of Atom - Mechanism & Analysis 5",
    "difficulty": "Easy",
    "question": "[RBSE 2025] In Structure of Atom, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #5?",
    "questionHi": "[RBSE 2025] Structure of Atom में, अभिक्रिया पथ #5 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #5",
      "The standard enthalpy of formation of all participating elements in standard state is zero #5",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #5",
      "The reaction equilibrium constant K_eq becomes independent of temperature #5"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #5 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #5",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #5",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Structure of Atom at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Structure of Atom",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c2-q6",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Structure of Atom - Mechanism & Analysis 6",
    "difficulty": "Hard",
    "question": "[CBSE 2024] In Structure of Atom, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #6?",
    "questionHi": "[CBSE 2024] Structure of Atom में, अभिक्रिया पथ #6 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #6",
      "The standard enthalpy of formation of all participating elements in standard state is zero #6",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #6",
      "The reaction equilibrium constant K_eq becomes independent of temperature #6"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #6 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #6",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #6",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Structure of Atom at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Structure of Atom",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c2-q7",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Structure of Atom - Mechanism & Analysis 7",
    "difficulty": "Easy",
    "question": "[JEE 2023] In Structure of Atom, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #7?",
    "questionHi": "[JEE 2023] Structure of Atom में, अभिक्रिया पथ #7 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #7",
      "The standard enthalpy of formation of all participating elements in standard state is zero #7",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #7",
      "The reaction equilibrium constant K_eq becomes independent of temperature #7"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #7 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #7",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #7",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Structure of Atom at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Structure of Atom",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c2-q8",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Structure of Atom - Mechanism & Analysis 8",
    "difficulty": "Medium",
    "question": "[NEET 2022] In Structure of Atom, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #8?",
    "questionHi": "[NEET 2022] Structure of Atom में, अभिक्रिया पथ #8 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #8",
      "The standard enthalpy of formation of all participating elements in standard state is zero #8",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #8",
      "The reaction equilibrium constant K_eq becomes independent of temperature #8"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #8 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #8",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #8",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Structure of Atom at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Structure of Atom",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c2-q9",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Structure of Atom - Mechanism & Analysis 9",
    "difficulty": "Hard",
    "question": "[RBSE 2021] In Structure of Atom, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #9?",
    "questionHi": "[RBSE 2021] Structure of Atom में, अभिक्रिया पथ #9 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #9",
      "The standard enthalpy of formation of all participating elements in standard state is zero #9",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #9",
      "The reaction equilibrium constant K_eq becomes independent of temperature #9"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #9 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #9",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #9",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #9"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Structure of Atom at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Structure of Atom",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c2-q10",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "topic": "Structure of Atom - Mechanism & Analysis 10",
    "difficulty": "Medium",
    "question": "[CBSE 2020] In Structure of Atom, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #10?",
    "questionHi": "[CBSE 2020] Structure of Atom में, अभिक्रिया पथ #10 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #10",
      "The standard enthalpy of formation of all participating elements in standard state is zero #10",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #10",
      "The reaction equilibrium constant K_eq becomes independent of temperature #10"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #10 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #10",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #10",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #10"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Structure of Atom at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Structure of Atom",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c3-q1",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Classification of Elements and Periodicity - Mechanism & Analysis 1",
    "difficulty": "Easy",
    "question": "[CBSE 2022] In Classification of Elements and Periodicity, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #1?",
    "questionHi": "[CBSE 2022] Classification of Elements and Periodicity में, अभिक्रिया पथ #1 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #1",
      "The standard enthalpy of formation of all participating elements in standard state is zero #1",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #1",
      "The reaction equilibrium constant K_eq becomes independent of temperature #1"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #1 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #1",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #1",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Classification of Elements and Periodicity at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Classification of Elements and Periodicity",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c3-q2",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Classification of Elements and Periodicity - Mechanism & Analysis 2",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Classification of Elements and Periodicity, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #2?",
    "questionHi": "[JEE 2021] Classification of Elements and Periodicity में, अभिक्रिया पथ #2 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #2",
      "The standard enthalpy of formation of all participating elements in standard state is zero #2",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #2",
      "The reaction equilibrium constant K_eq becomes independent of temperature #2"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #2 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #2",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #2",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Classification of Elements and Periodicity at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Classification of Elements and Periodicity",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c3-q3",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Classification of Elements and Periodicity - Mechanism & Analysis 3",
    "difficulty": "Hard",
    "question": "[NEET 2020] In Classification of Elements and Periodicity, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #3?",
    "questionHi": "[NEET 2020] Classification of Elements and Periodicity में, अभिक्रिया पथ #3 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #3",
      "The standard enthalpy of formation of all participating elements in standard state is zero #3",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #3",
      "The reaction equilibrium constant K_eq becomes independent of temperature #3"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #3 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #3",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #3",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Classification of Elements and Periodicity at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Classification of Elements and Periodicity",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c3-q4",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Classification of Elements and Periodicity - Mechanism & Analysis 4",
    "difficulty": "Medium",
    "question": "[RBSE 2025] In Classification of Elements and Periodicity, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #4?",
    "questionHi": "[RBSE 2025] Classification of Elements and Periodicity में, अभिक्रिया पथ #4 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #4",
      "The standard enthalpy of formation of all participating elements in standard state is zero #4",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #4",
      "The reaction equilibrium constant K_eq becomes independent of temperature #4"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #4 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #4",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #4",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Classification of Elements and Periodicity at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Classification of Elements and Periodicity",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c3-q5",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Classification of Elements and Periodicity - Mechanism & Analysis 5",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Classification of Elements and Periodicity, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #5?",
    "questionHi": "[CBSE 2024] Classification of Elements and Periodicity में, अभिक्रिया पथ #5 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #5",
      "The standard enthalpy of formation of all participating elements in standard state is zero #5",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #5",
      "The reaction equilibrium constant K_eq becomes independent of temperature #5"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #5 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #5",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #5",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Classification of Elements and Periodicity at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Classification of Elements and Periodicity",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c3-q6",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Classification of Elements and Periodicity - Mechanism & Analysis 6",
    "difficulty": "Hard",
    "question": "[JEE 2023] In Classification of Elements and Periodicity, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #6?",
    "questionHi": "[JEE 2023] Classification of Elements and Periodicity में, अभिक्रिया पथ #6 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #6",
      "The standard enthalpy of formation of all participating elements in standard state is zero #6",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #6",
      "The reaction equilibrium constant K_eq becomes independent of temperature #6"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #6 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #6",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #6",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Classification of Elements and Periodicity at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Classification of Elements and Periodicity",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c3-q7",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Classification of Elements and Periodicity - Mechanism & Analysis 7",
    "difficulty": "Easy",
    "question": "[NEET 2022] In Classification of Elements and Periodicity, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #7?",
    "questionHi": "[NEET 2022] Classification of Elements and Periodicity में, अभिक्रिया पथ #7 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #7",
      "The standard enthalpy of formation of all participating elements in standard state is zero #7",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #7",
      "The reaction equilibrium constant K_eq becomes independent of temperature #7"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #7 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #7",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #7",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Classification of Elements and Periodicity at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Classification of Elements and Periodicity",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c3-q8",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Classification of Elements and Periodicity - Mechanism & Analysis 8",
    "difficulty": "Medium",
    "question": "[RBSE 2021] In Classification of Elements and Periodicity, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #8?",
    "questionHi": "[RBSE 2021] Classification of Elements and Periodicity में, अभिक्रिया पथ #8 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #8",
      "The standard enthalpy of formation of all participating elements in standard state is zero #8",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #8",
      "The reaction equilibrium constant K_eq becomes independent of temperature #8"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #8 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #8",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #8",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Classification of Elements and Periodicity at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Classification of Elements and Periodicity",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c3-q9",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Classification of Elements and Periodicity - Mechanism & Analysis 9",
    "difficulty": "Hard",
    "question": "[CBSE 2020] In Classification of Elements and Periodicity, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #9?",
    "questionHi": "[CBSE 2020] Classification of Elements and Periodicity में, अभिक्रिया पथ #9 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #9",
      "The standard enthalpy of formation of all participating elements in standard state is zero #9",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #9",
      "The reaction equilibrium constant K_eq becomes independent of temperature #9"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #9 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #9",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #9",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #9"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Classification of Elements and Periodicity at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Classification of Elements and Periodicity",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c3-q10",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Classification of Elements and Periodicity - Mechanism & Analysis 10",
    "difficulty": "Medium",
    "question": "[JEE 2025] In Classification of Elements and Periodicity, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #10?",
    "questionHi": "[JEE 2025] Classification of Elements and Periodicity में, अभिक्रिया पथ #10 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #10",
      "The standard enthalpy of formation of all participating elements in standard state is zero #10",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #10",
      "The reaction equilibrium constant K_eq becomes independent of temperature #10"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #10 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #10",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #10",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #10"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Classification of Elements and Periodicity at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Classification of Elements and Periodicity",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c4-q1",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Chemical Bonding and Molecular Structure - Mechanism & Analysis 1",
    "difficulty": "Easy",
    "question": "[JEE 2021] In Chemical Bonding and Molecular Structure, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #1?",
    "questionHi": "[JEE 2021] Chemical Bonding and Molecular Structure में, अभिक्रिया पथ #1 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #1",
      "The standard enthalpy of formation of all participating elements in standard state is zero #1",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #1",
      "The reaction equilibrium constant K_eq becomes independent of temperature #1"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #1 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #1",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #1",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Bonding and Molecular Structure at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Bonding and Molecular Structure",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c4-q2",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Chemical Bonding and Molecular Structure - Mechanism & Analysis 2",
    "difficulty": "Medium",
    "question": "[NEET 2020] In Chemical Bonding and Molecular Structure, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #2?",
    "questionHi": "[NEET 2020] Chemical Bonding and Molecular Structure में, अभिक्रिया पथ #2 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #2",
      "The standard enthalpy of formation of all participating elements in standard state is zero #2",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #2",
      "The reaction equilibrium constant K_eq becomes independent of temperature #2"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #2 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #2",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #2",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Bonding and Molecular Structure at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Bonding and Molecular Structure",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c4-q3",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Chemical Bonding and Molecular Structure - Mechanism & Analysis 3",
    "difficulty": "Hard",
    "question": "[RBSE 2025] In Chemical Bonding and Molecular Structure, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #3?",
    "questionHi": "[RBSE 2025] Chemical Bonding and Molecular Structure में, अभिक्रिया पथ #3 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #3",
      "The standard enthalpy of formation of all participating elements in standard state is zero #3",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #3",
      "The reaction equilibrium constant K_eq becomes independent of temperature #3"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #3 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #3",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #3",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Bonding and Molecular Structure at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Bonding and Molecular Structure",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c4-q4",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Chemical Bonding and Molecular Structure - Mechanism & Analysis 4",
    "difficulty": "Medium",
    "question": "[CBSE 2024] In Chemical Bonding and Molecular Structure, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #4?",
    "questionHi": "[CBSE 2024] Chemical Bonding and Molecular Structure में, अभिक्रिया पथ #4 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #4",
      "The standard enthalpy of formation of all participating elements in standard state is zero #4",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #4",
      "The reaction equilibrium constant K_eq becomes independent of temperature #4"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #4 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #4",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #4",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Bonding and Molecular Structure at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Bonding and Molecular Structure",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c4-q5",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Chemical Bonding and Molecular Structure - Mechanism & Analysis 5",
    "difficulty": "Easy",
    "question": "[JEE 2023] In Chemical Bonding and Molecular Structure, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #5?",
    "questionHi": "[JEE 2023] Chemical Bonding and Molecular Structure में, अभिक्रिया पथ #5 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #5",
      "The standard enthalpy of formation of all participating elements in standard state is zero #5",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #5",
      "The reaction equilibrium constant K_eq becomes independent of temperature #5"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #5 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #5",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #5",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Bonding and Molecular Structure at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Bonding and Molecular Structure",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c4-q6",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Chemical Bonding and Molecular Structure - Mechanism & Analysis 6",
    "difficulty": "Hard",
    "question": "[NEET 2022] In Chemical Bonding and Molecular Structure, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #6?",
    "questionHi": "[NEET 2022] Chemical Bonding and Molecular Structure में, अभिक्रिया पथ #6 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #6",
      "The standard enthalpy of formation of all participating elements in standard state is zero #6",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #6",
      "The reaction equilibrium constant K_eq becomes independent of temperature #6"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #6 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #6",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #6",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Bonding and Molecular Structure at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Bonding and Molecular Structure",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c4-q7",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Chemical Bonding and Molecular Structure - Mechanism & Analysis 7",
    "difficulty": "Easy",
    "question": "[RBSE 2021] In Chemical Bonding and Molecular Structure, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #7?",
    "questionHi": "[RBSE 2021] Chemical Bonding and Molecular Structure में, अभिक्रिया पथ #7 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #7",
      "The standard enthalpy of formation of all participating elements in standard state is zero #7",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #7",
      "The reaction equilibrium constant K_eq becomes independent of temperature #7"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #7 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #7",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #7",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Bonding and Molecular Structure at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Bonding and Molecular Structure",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c4-q8",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Chemical Bonding and Molecular Structure - Mechanism & Analysis 8",
    "difficulty": "Medium",
    "question": "[CBSE 2020] In Chemical Bonding and Molecular Structure, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #8?",
    "questionHi": "[CBSE 2020] Chemical Bonding and Molecular Structure में, अभिक्रिया पथ #8 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #8",
      "The standard enthalpy of formation of all participating elements in standard state is zero #8",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #8",
      "The reaction equilibrium constant K_eq becomes independent of temperature #8"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #8 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #8",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #8",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Bonding and Molecular Structure at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Bonding and Molecular Structure",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c4-q9",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Chemical Bonding and Molecular Structure - Mechanism & Analysis 9",
    "difficulty": "Hard",
    "question": "[JEE 2025] In Chemical Bonding and Molecular Structure, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #9?",
    "questionHi": "[JEE 2025] Chemical Bonding and Molecular Structure में, अभिक्रिया पथ #9 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #9",
      "The standard enthalpy of formation of all participating elements in standard state is zero #9",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #9",
      "The reaction equilibrium constant K_eq becomes independent of temperature #9"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #9 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #9",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #9",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #9"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Bonding and Molecular Structure at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Bonding and Molecular Structure",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c4-q10",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Chemical Bonding and Molecular Structure - Mechanism & Analysis 10",
    "difficulty": "Medium",
    "question": "[NEET 2024] In Chemical Bonding and Molecular Structure, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #10?",
    "questionHi": "[NEET 2024] Chemical Bonding and Molecular Structure में, अभिक्रिया पथ #10 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #10",
      "The standard enthalpy of formation of all participating elements in standard state is zero #10",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #10",
      "The reaction equilibrium constant K_eq becomes independent of temperature #10"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #10 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #10",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #10",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #10"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Bonding and Molecular Structure at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Bonding and Molecular Structure",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c5-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Chemical Thermodynamics - Mechanism & Analysis 1",
    "difficulty": "Easy",
    "question": "[NEET 2020] In Chemical Thermodynamics, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #1?",
    "questionHi": "[NEET 2020] Chemical Thermodynamics में, अभिक्रिया पथ #1 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #1",
      "The standard enthalpy of formation of all participating elements in standard state is zero #1",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #1",
      "The reaction equilibrium constant K_eq becomes independent of temperature #1"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #1 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #1",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #1",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Thermodynamics at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Thermodynamics",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c5-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Chemical Thermodynamics - Mechanism & Analysis 2",
    "difficulty": "Medium",
    "question": "[RBSE 2025] In Chemical Thermodynamics, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #2?",
    "questionHi": "[RBSE 2025] Chemical Thermodynamics में, अभिक्रिया पथ #2 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #2",
      "The standard enthalpy of formation of all participating elements in standard state is zero #2",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #2",
      "The reaction equilibrium constant K_eq becomes independent of temperature #2"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #2 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #2",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #2",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Thermodynamics at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Thermodynamics",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c5-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Chemical Thermodynamics - Mechanism & Analysis 3",
    "difficulty": "Hard",
    "question": "[CBSE 2024] In Chemical Thermodynamics, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #3?",
    "questionHi": "[CBSE 2024] Chemical Thermodynamics में, अभिक्रिया पथ #3 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #3",
      "The standard enthalpy of formation of all participating elements in standard state is zero #3",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #3",
      "The reaction equilibrium constant K_eq becomes independent of temperature #3"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #3 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #3",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #3",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Thermodynamics at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Thermodynamics",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c5-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Chemical Thermodynamics - Mechanism & Analysis 4",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Chemical Thermodynamics, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #4?",
    "questionHi": "[JEE 2023] Chemical Thermodynamics में, अभिक्रिया पथ #4 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #4",
      "The standard enthalpy of formation of all participating elements in standard state is zero #4",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #4",
      "The reaction equilibrium constant K_eq becomes independent of temperature #4"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #4 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #4",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #4",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Thermodynamics at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Thermodynamics",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c5-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Chemical Thermodynamics - Mechanism & Analysis 5",
    "difficulty": "Easy",
    "question": "[NEET 2022] In Chemical Thermodynamics, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #5?",
    "questionHi": "[NEET 2022] Chemical Thermodynamics में, अभिक्रिया पथ #5 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #5",
      "The standard enthalpy of formation of all participating elements in standard state is zero #5",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #5",
      "The reaction equilibrium constant K_eq becomes independent of temperature #5"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #5 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #5",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #5",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Thermodynamics at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Thermodynamics",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c5-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Chemical Thermodynamics - Mechanism & Analysis 6",
    "difficulty": "Hard",
    "question": "[RBSE 2021] In Chemical Thermodynamics, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #6?",
    "questionHi": "[RBSE 2021] Chemical Thermodynamics में, अभिक्रिया पथ #6 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #6",
      "The standard enthalpy of formation of all participating elements in standard state is zero #6",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #6",
      "The reaction equilibrium constant K_eq becomes independent of temperature #6"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #6 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #6",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #6",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Thermodynamics at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Thermodynamics",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c5-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Chemical Thermodynamics - Mechanism & Analysis 7",
    "difficulty": "Easy",
    "question": "[CBSE 2020] In Chemical Thermodynamics, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #7?",
    "questionHi": "[CBSE 2020] Chemical Thermodynamics में, अभिक्रिया पथ #7 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #7",
      "The standard enthalpy of formation of all participating elements in standard state is zero #7",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #7",
      "The reaction equilibrium constant K_eq becomes independent of temperature #7"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #7 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #7",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #7",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Thermodynamics at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Thermodynamics",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c5-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Chemical Thermodynamics - Mechanism & Analysis 8",
    "difficulty": "Medium",
    "question": "[JEE 2025] In Chemical Thermodynamics, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #8?",
    "questionHi": "[JEE 2025] Chemical Thermodynamics में, अभिक्रिया पथ #8 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #8",
      "The standard enthalpy of formation of all participating elements in standard state is zero #8",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #8",
      "The reaction equilibrium constant K_eq becomes independent of temperature #8"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #8 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #8",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #8",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Thermodynamics at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Thermodynamics",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c5-q9",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Chemical Thermodynamics - Mechanism & Analysis 9",
    "difficulty": "Hard",
    "question": "[NEET 2024] In Chemical Thermodynamics, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #9?",
    "questionHi": "[NEET 2024] Chemical Thermodynamics में, अभिक्रिया पथ #9 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #9",
      "The standard enthalpy of formation of all participating elements in standard state is zero #9",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #9",
      "The reaction equilibrium constant K_eq becomes independent of temperature #9"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #9 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #9",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #9",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #9"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Thermodynamics at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Thermodynamics",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c5-q10",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Chemical Thermodynamics",
    "topic": "Chemical Thermodynamics - Mechanism & Analysis 10",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Chemical Thermodynamics, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #10?",
    "questionHi": "[RBSE 2023] Chemical Thermodynamics में, अभिक्रिया पथ #10 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #10",
      "The standard enthalpy of formation of all participating elements in standard state is zero #10",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #10",
      "The reaction equilibrium constant K_eq becomes independent of temperature #10"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #10 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #10",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #10",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #10"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Chemical Thermodynamics at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Chemical Thermodynamics",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c6-q1",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Equilibrium - Mechanism & Analysis 1",
    "difficulty": "Easy",
    "question": "[RBSE 2025] In Equilibrium, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #1?",
    "questionHi": "[RBSE 2025] Equilibrium में, अभिक्रिया पथ #1 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #1",
      "The standard enthalpy of formation of all participating elements in standard state is zero #1",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #1",
      "The reaction equilibrium constant K_eq becomes independent of temperature #1"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #1 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #1",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #1",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Equilibrium at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Equilibrium",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c6-q2",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Equilibrium - Mechanism & Analysis 2",
    "difficulty": "Medium",
    "question": "[CBSE 2024] In Equilibrium, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #2?",
    "questionHi": "[CBSE 2024] Equilibrium में, अभिक्रिया पथ #2 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #2",
      "The standard enthalpy of formation of all participating elements in standard state is zero #2",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #2",
      "The reaction equilibrium constant K_eq becomes independent of temperature #2"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #2 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #2",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #2",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Equilibrium at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Equilibrium",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c6-q3",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Equilibrium - Mechanism & Analysis 3",
    "difficulty": "Hard",
    "question": "[JEE 2023] In Equilibrium, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #3?",
    "questionHi": "[JEE 2023] Equilibrium में, अभिक्रिया पथ #3 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #3",
      "The standard enthalpy of formation of all participating elements in standard state is zero #3",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #3",
      "The reaction equilibrium constant K_eq becomes independent of temperature #3"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #3 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #3",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #3",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Equilibrium at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Equilibrium",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c6-q4",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Equilibrium - Mechanism & Analysis 4",
    "difficulty": "Medium",
    "question": "[NEET 2022] In Equilibrium, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #4?",
    "questionHi": "[NEET 2022] Equilibrium में, अभिक्रिया पथ #4 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #4",
      "The standard enthalpy of formation of all participating elements in standard state is zero #4",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #4",
      "The reaction equilibrium constant K_eq becomes independent of temperature #4"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #4 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #4",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #4",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Equilibrium at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Equilibrium",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c6-q5",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Equilibrium - Mechanism & Analysis 5",
    "difficulty": "Easy",
    "question": "[RBSE 2021] In Equilibrium, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #5?",
    "questionHi": "[RBSE 2021] Equilibrium में, अभिक्रिया पथ #5 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #5",
      "The standard enthalpy of formation of all participating elements in standard state is zero #5",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #5",
      "The reaction equilibrium constant K_eq becomes independent of temperature #5"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #5 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #5",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #5",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Equilibrium at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Equilibrium",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c6-q6",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Equilibrium - Mechanism & Analysis 6",
    "difficulty": "Hard",
    "question": "[CBSE 2020] In Equilibrium, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #6?",
    "questionHi": "[CBSE 2020] Equilibrium में, अभिक्रिया पथ #6 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #6",
      "The standard enthalpy of formation of all participating elements in standard state is zero #6",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #6",
      "The reaction equilibrium constant K_eq becomes independent of temperature #6"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #6 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #6",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #6",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Equilibrium at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Equilibrium",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c6-q7",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Equilibrium - Mechanism & Analysis 7",
    "difficulty": "Easy",
    "question": "[JEE 2025] In Equilibrium, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #7?",
    "questionHi": "[JEE 2025] Equilibrium में, अभिक्रिया पथ #7 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #7",
      "The standard enthalpy of formation of all participating elements in standard state is zero #7",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #7",
      "The reaction equilibrium constant K_eq becomes independent of temperature #7"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #7 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #7",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #7",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Equilibrium at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Equilibrium",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c6-q8",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Equilibrium - Mechanism & Analysis 8",
    "difficulty": "Medium",
    "question": "[NEET 2024] In Equilibrium, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #8?",
    "questionHi": "[NEET 2024] Equilibrium में, अभिक्रिया पथ #8 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #8",
      "The standard enthalpy of formation of all participating elements in standard state is zero #8",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #8",
      "The reaction equilibrium constant K_eq becomes independent of temperature #8"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #8 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #8",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #8",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Equilibrium at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Equilibrium",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c6-q9",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Equilibrium - Mechanism & Analysis 9",
    "difficulty": "Hard",
    "question": "[RBSE 2023] In Equilibrium, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #9?",
    "questionHi": "[RBSE 2023] Equilibrium में, अभिक्रिया पथ #9 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #9",
      "The standard enthalpy of formation of all participating elements in standard state is zero #9",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #9",
      "The reaction equilibrium constant K_eq becomes independent of temperature #9"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #9 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #9",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #9",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #9"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Equilibrium at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Equilibrium",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c6-q10",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Equilibrium",
    "topic": "Equilibrium - Mechanism & Analysis 10",
    "difficulty": "Medium",
    "question": "[CBSE 2022] In Equilibrium, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #10?",
    "questionHi": "[CBSE 2022] Equilibrium में, अभिक्रिया पथ #10 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #10",
      "The standard enthalpy of formation of all participating elements in standard state is zero #10",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #10",
      "The reaction equilibrium constant K_eq becomes independent of temperature #10"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #10 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #10",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #10",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #10"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Equilibrium at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Equilibrium",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c7-q1",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "topic": "Redox Reactions - Mechanism & Analysis 1",
    "difficulty": "Easy",
    "question": "[CBSE 2024] In Redox Reactions, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #1?",
    "questionHi": "[CBSE 2024] Redox Reactions में, अभिक्रिया पथ #1 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #1",
      "The standard enthalpy of formation of all participating elements in standard state is zero #1",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #1",
      "The reaction equilibrium constant K_eq becomes independent of temperature #1"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #1 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #1",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #1",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Redox Reactions at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Redox Reactions",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c7-q2",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "topic": "Redox Reactions - Mechanism & Analysis 2",
    "difficulty": "Medium",
    "question": "[JEE 2023] In Redox Reactions, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #2?",
    "questionHi": "[JEE 2023] Redox Reactions में, अभिक्रिया पथ #2 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #2",
      "The standard enthalpy of formation of all participating elements in standard state is zero #2",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #2",
      "The reaction equilibrium constant K_eq becomes independent of temperature #2"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #2 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #2",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #2",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Redox Reactions at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Redox Reactions",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c7-q3",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "topic": "Redox Reactions - Mechanism & Analysis 3",
    "difficulty": "Hard",
    "question": "[NEET 2022] In Redox Reactions, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #3?",
    "questionHi": "[NEET 2022] Redox Reactions में, अभिक्रिया पथ #3 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #3",
      "The standard enthalpy of formation of all participating elements in standard state is zero #3",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #3",
      "The reaction equilibrium constant K_eq becomes independent of temperature #3"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #3 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #3",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #3",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Redox Reactions at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Redox Reactions",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c7-q4",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "topic": "Redox Reactions - Mechanism & Analysis 4",
    "difficulty": "Medium",
    "question": "[RBSE 2021] In Redox Reactions, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #4?",
    "questionHi": "[RBSE 2021] Redox Reactions में, अभिक्रिया पथ #4 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #4",
      "The standard enthalpy of formation of all participating elements in standard state is zero #4",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #4",
      "The reaction equilibrium constant K_eq becomes independent of temperature #4"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #4 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #4",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #4",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Redox Reactions at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Redox Reactions",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c7-q5",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "topic": "Redox Reactions - Mechanism & Analysis 5",
    "difficulty": "Easy",
    "question": "[CBSE 2020] In Redox Reactions, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #5?",
    "questionHi": "[CBSE 2020] Redox Reactions में, अभिक्रिया पथ #5 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #5",
      "The standard enthalpy of formation of all participating elements in standard state is zero #5",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #5",
      "The reaction equilibrium constant K_eq becomes independent of temperature #5"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #5 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #5",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #5",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Redox Reactions at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Redox Reactions",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c7-q6",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "topic": "Redox Reactions - Mechanism & Analysis 6",
    "difficulty": "Hard",
    "question": "[JEE 2025] In Redox Reactions, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #6?",
    "questionHi": "[JEE 2025] Redox Reactions में, अभिक्रिया पथ #6 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #6",
      "The standard enthalpy of formation of all participating elements in standard state is zero #6",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #6",
      "The reaction equilibrium constant K_eq becomes independent of temperature #6"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #6 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #6",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #6",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Redox Reactions at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Redox Reactions",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c7-q7",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "topic": "Redox Reactions - Mechanism & Analysis 7",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Redox Reactions, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #7?",
    "questionHi": "[NEET 2024] Redox Reactions में, अभिक्रिया पथ #7 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #7",
      "The standard enthalpy of formation of all participating elements in standard state is zero #7",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #7",
      "The reaction equilibrium constant K_eq becomes independent of temperature #7"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #7 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #7",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #7",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Redox Reactions at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Redox Reactions",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c7-q8",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "topic": "Redox Reactions - Mechanism & Analysis 8",
    "difficulty": "Medium",
    "question": "[RBSE 2023] In Redox Reactions, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #8?",
    "questionHi": "[RBSE 2023] Redox Reactions में, अभिक्रिया पथ #8 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #8",
      "The standard enthalpy of formation of all participating elements in standard state is zero #8",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #8",
      "The reaction equilibrium constant K_eq becomes independent of temperature #8"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #8 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #8",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #8",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Redox Reactions at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Redox Reactions",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c7-q9",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "topic": "Redox Reactions - Mechanism & Analysis 9",
    "difficulty": "Hard",
    "question": "[CBSE 2022] In Redox Reactions, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #9?",
    "questionHi": "[CBSE 2022] Redox Reactions में, अभिक्रिया पथ #9 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #9",
      "The standard enthalpy of formation of all participating elements in standard state is zero #9",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #9",
      "The reaction equilibrium constant K_eq becomes independent of temperature #9"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #9 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #9",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #9",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #9"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Redox Reactions at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Redox Reactions",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c7-q10",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "topic": "Redox Reactions - Mechanism & Analysis 10",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Redox Reactions, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #10?",
    "questionHi": "[JEE 2021] Redox Reactions में, अभिक्रिया पथ #10 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #10",
      "The standard enthalpy of formation of all participating elements in standard state is zero #10",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #10",
      "The reaction equilibrium constant K_eq becomes independent of temperature #10"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #10 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #10",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #10",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #10"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Redox Reactions at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Redox Reactions",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c8-q1",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Organic Chemistry: Basic Principles and Techniques - Mechanism & Analysis 1",
    "difficulty": "Easy",
    "question": "[JEE 2023] In Organic Chemistry: Basic Principles and Techniques, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #1?",
    "questionHi": "[JEE 2023] Organic Chemistry: Basic Principles and Techniques में, अभिक्रिया पथ #1 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #1",
      "The standard enthalpy of formation of all participating elements in standard state is zero #1",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #1",
      "The reaction equilibrium constant K_eq becomes independent of temperature #1"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #1 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #1",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #1",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Organic Chemistry: Basic Principles and Techniques at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Organic Chemistry: Basic Principles and Techniques",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c8-q2",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Organic Chemistry: Basic Principles and Techniques - Mechanism & Analysis 2",
    "difficulty": "Medium",
    "question": "[NEET 2022] In Organic Chemistry: Basic Principles and Techniques, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #2?",
    "questionHi": "[NEET 2022] Organic Chemistry: Basic Principles and Techniques में, अभिक्रिया पथ #2 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #2",
      "The standard enthalpy of formation of all participating elements in standard state is zero #2",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #2",
      "The reaction equilibrium constant K_eq becomes independent of temperature #2"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #2 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #2",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #2",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Organic Chemistry: Basic Principles and Techniques at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Organic Chemistry: Basic Principles and Techniques",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c8-q3",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Organic Chemistry: Basic Principles and Techniques - Mechanism & Analysis 3",
    "difficulty": "Hard",
    "question": "[RBSE 2021] In Organic Chemistry: Basic Principles and Techniques, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #3?",
    "questionHi": "[RBSE 2021] Organic Chemistry: Basic Principles and Techniques में, अभिक्रिया पथ #3 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #3",
      "The standard enthalpy of formation of all participating elements in standard state is zero #3",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #3",
      "The reaction equilibrium constant K_eq becomes independent of temperature #3"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #3 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #3",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #3",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Organic Chemistry: Basic Principles and Techniques at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Organic Chemistry: Basic Principles and Techniques",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c8-q4",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Organic Chemistry: Basic Principles and Techniques - Mechanism & Analysis 4",
    "difficulty": "Medium",
    "question": "[CBSE 2020] In Organic Chemistry: Basic Principles and Techniques, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #4?",
    "questionHi": "[CBSE 2020] Organic Chemistry: Basic Principles and Techniques में, अभिक्रिया पथ #4 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #4",
      "The standard enthalpy of formation of all participating elements in standard state is zero #4",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #4",
      "The reaction equilibrium constant K_eq becomes independent of temperature #4"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #4 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #4",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #4",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Organic Chemistry: Basic Principles and Techniques at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Organic Chemistry: Basic Principles and Techniques",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c8-q5",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Organic Chemistry: Basic Principles and Techniques - Mechanism & Analysis 5",
    "difficulty": "Easy",
    "question": "[JEE 2025] In Organic Chemistry: Basic Principles and Techniques, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #5?",
    "questionHi": "[JEE 2025] Organic Chemistry: Basic Principles and Techniques में, अभिक्रिया पथ #5 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #5",
      "The standard enthalpy of formation of all participating elements in standard state is zero #5",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #5",
      "The reaction equilibrium constant K_eq becomes independent of temperature #5"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #5 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #5",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #5",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Organic Chemistry: Basic Principles and Techniques at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Organic Chemistry: Basic Principles and Techniques",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c8-q6",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Organic Chemistry: Basic Principles and Techniques - Mechanism & Analysis 6",
    "difficulty": "Hard",
    "question": "[NEET 2024] In Organic Chemistry: Basic Principles and Techniques, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #6?",
    "questionHi": "[NEET 2024] Organic Chemistry: Basic Principles and Techniques में, अभिक्रिया पथ #6 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #6",
      "The standard enthalpy of formation of all participating elements in standard state is zero #6",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #6",
      "The reaction equilibrium constant K_eq becomes independent of temperature #6"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #6 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #6",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #6",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Organic Chemistry: Basic Principles and Techniques at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Organic Chemistry: Basic Principles and Techniques",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c8-q7",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Organic Chemistry: Basic Principles and Techniques - Mechanism & Analysis 7",
    "difficulty": "Easy",
    "question": "[RBSE 2023] In Organic Chemistry: Basic Principles and Techniques, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #7?",
    "questionHi": "[RBSE 2023] Organic Chemistry: Basic Principles and Techniques में, अभिक्रिया पथ #7 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #7",
      "The standard enthalpy of formation of all participating elements in standard state is zero #7",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #7",
      "The reaction equilibrium constant K_eq becomes independent of temperature #7"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #7 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #7",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #7",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Organic Chemistry: Basic Principles and Techniques at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Organic Chemistry: Basic Principles and Techniques",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c8-q8",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Organic Chemistry: Basic Principles and Techniques - Mechanism & Analysis 8",
    "difficulty": "Medium",
    "question": "[CBSE 2022] In Organic Chemistry: Basic Principles and Techniques, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #8?",
    "questionHi": "[CBSE 2022] Organic Chemistry: Basic Principles and Techniques में, अभिक्रिया पथ #8 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #8",
      "The standard enthalpy of formation of all participating elements in standard state is zero #8",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #8",
      "The reaction equilibrium constant K_eq becomes independent of temperature #8"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #8 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #8",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #8",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Organic Chemistry: Basic Principles and Techniques at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Organic Chemistry: Basic Principles and Techniques",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c8-q9",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Organic Chemistry: Basic Principles and Techniques - Mechanism & Analysis 9",
    "difficulty": "Hard",
    "question": "[JEE 2021] In Organic Chemistry: Basic Principles and Techniques, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #9?",
    "questionHi": "[JEE 2021] Organic Chemistry: Basic Principles and Techniques में, अभिक्रिया पथ #9 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #9",
      "The standard enthalpy of formation of all participating elements in standard state is zero #9",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #9",
      "The reaction equilibrium constant K_eq becomes independent of temperature #9"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #9 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #9",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #9",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #9"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Organic Chemistry: Basic Principles and Techniques at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Organic Chemistry: Basic Principles and Techniques",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c8-q10",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Organic Chemistry: Basic Principles and Techniques - Mechanism & Analysis 10",
    "difficulty": "Medium",
    "question": "[NEET 2020] In Organic Chemistry: Basic Principles and Techniques, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #10?",
    "questionHi": "[NEET 2020] Organic Chemistry: Basic Principles and Techniques में, अभिक्रिया पथ #10 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #10",
      "The standard enthalpy of formation of all participating elements in standard state is zero #10",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #10",
      "The reaction equilibrium constant K_eq becomes independent of temperature #10"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #10 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #10",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #10",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #10"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Organic Chemistry: Basic Principles and Techniques at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Organic Chemistry: Basic Principles and Techniques",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c9-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "topic": "Hydrocarbons - Mechanism & Analysis 1",
    "difficulty": "Easy",
    "question": "[NEET 2022] In Hydrocarbons, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #1?",
    "questionHi": "[NEET 2022] Hydrocarbons में, अभिक्रिया पथ #1 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #1",
      "The standard enthalpy of formation of all participating elements in standard state is zero #1",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #1",
      "The reaction equilibrium constant K_eq becomes independent of temperature #1"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #1 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #1",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #1",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Hydrocarbons at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Hydrocarbons",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c9-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "topic": "Hydrocarbons - Mechanism & Analysis 2",
    "difficulty": "Medium",
    "question": "[RBSE 2021] In Hydrocarbons, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #2?",
    "questionHi": "[RBSE 2021] Hydrocarbons में, अभिक्रिया पथ #2 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #2",
      "The standard enthalpy of formation of all participating elements in standard state is zero #2",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #2",
      "The reaction equilibrium constant K_eq becomes independent of temperature #2"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #2 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #2",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #2",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Hydrocarbons at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Hydrocarbons",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c9-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "topic": "Hydrocarbons - Mechanism & Analysis 3",
    "difficulty": "Hard",
    "question": "[CBSE 2020] In Hydrocarbons, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #3?",
    "questionHi": "[CBSE 2020] Hydrocarbons में, अभिक्रिया पथ #3 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #3",
      "The standard enthalpy of formation of all participating elements in standard state is zero #3",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #3",
      "The reaction equilibrium constant K_eq becomes independent of temperature #3"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #3 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #3",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #3",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Hydrocarbons at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Hydrocarbons",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c9-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "topic": "Hydrocarbons - Mechanism & Analysis 4",
    "difficulty": "Medium",
    "question": "[JEE 2025] In Hydrocarbons, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #4?",
    "questionHi": "[JEE 2025] Hydrocarbons में, अभिक्रिया पथ #4 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #4",
      "The standard enthalpy of formation of all participating elements in standard state is zero #4",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #4",
      "The reaction equilibrium constant K_eq becomes independent of temperature #4"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #4 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #4",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #4",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Hydrocarbons at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Hydrocarbons",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c9-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "topic": "Hydrocarbons - Mechanism & Analysis 5",
    "difficulty": "Easy",
    "question": "[NEET 2024] In Hydrocarbons, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #5?",
    "questionHi": "[NEET 2024] Hydrocarbons में, अभिक्रिया पथ #5 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #5",
      "The standard enthalpy of formation of all participating elements in standard state is zero #5",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #5",
      "The reaction equilibrium constant K_eq becomes independent of temperature #5"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #5 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #5",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #5",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Hydrocarbons at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Hydrocarbons",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c9-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "topic": "Hydrocarbons - Mechanism & Analysis 6",
    "difficulty": "Hard",
    "question": "[RBSE 2023] In Hydrocarbons, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #6?",
    "questionHi": "[RBSE 2023] Hydrocarbons में, अभिक्रिया पथ #6 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #6",
      "The standard enthalpy of formation of all participating elements in standard state is zero #6",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #6",
      "The reaction equilibrium constant K_eq becomes independent of temperature #6"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #6 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #6",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #6",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Hydrocarbons at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Hydrocarbons",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c9-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "topic": "Hydrocarbons - Mechanism & Analysis 7",
    "difficulty": "Easy",
    "question": "[CBSE 2022] In Hydrocarbons, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #7?",
    "questionHi": "[CBSE 2022] Hydrocarbons में, अभिक्रिया पथ #7 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #7",
      "The standard enthalpy of formation of all participating elements in standard state is zero #7",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #7",
      "The reaction equilibrium constant K_eq becomes independent of temperature #7"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #7 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #7",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #7",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Hydrocarbons at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Hydrocarbons",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-11-c9-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "topic": "Hydrocarbons - Mechanism & Analysis 8",
    "difficulty": "Medium",
    "question": "[JEE 2021] In Hydrocarbons, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #8?",
    "questionHi": "[JEE 2021] Hydrocarbons में, अभिक्रिया पथ #8 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #8",
      "The standard enthalpy of formation of all participating elements in standard state is zero #8",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #8",
      "The reaction equilibrium constant K_eq becomes independent of temperature #8"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #8 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #8",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #8",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Hydrocarbons at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Hydrocarbons",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-11-c9-q9",
    "exam": "NEET",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "topic": "Hydrocarbons - Mechanism & Analysis 9",
    "difficulty": "Hard",
    "question": "[NEET 2020] In Hydrocarbons, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #9?",
    "questionHi": "[NEET 2020] Hydrocarbons में, अभिक्रिया पथ #9 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #9",
      "The standard enthalpy of formation of all participating elements in standard state is zero #9",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #9",
      "The reaction equilibrium constant K_eq becomes independent of temperature #9"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #9 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #9",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #9",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #9"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Hydrocarbons at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Hydrocarbons",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-11-c9-q10",
    "exam": "RBSE",
    "class": "11",
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "topic": "Hydrocarbons - Mechanism & Analysis 10",
    "difficulty": "Medium",
    "question": "[RBSE 2025] In Hydrocarbons, which chemical property or thermodynamic condition is accurately satisfied during reaction pathway #10?",
    "questionHi": "[RBSE 2025] Hydrocarbons में, अभिक्रिया पथ #10 के दौरान कौन सा रासायनिक गुण अथवा ऊष्मागतिकीय प्रतिबंध सटीक रूप से संतुष्ट होता है?",
    "options": [
      "The change in Gibbs free energy ΔG is strictly negative for spontaneous progression #10",
      "The standard enthalpy of formation of all participating elements in standard state is zero #10",
      "The activation energy is completely eliminated by the addition of homogeneous catalyst #10",
      "The reaction equilibrium constant K_eq becomes independent of temperature #10"
    ],
    "optionsHi": [
      "स्वतःप्रवर्तित प्रगति #10 के लिए गिब्स मुक्त ऊर्जा परिवर्तन ΔG ऋणात्मक होता है",
      "मानक अवस्था में सभी भाग लेने वाले तत्वों की मानक संभवन एन्थैल्पी शून्य होती है #10",
      "समांगी उत्प्रेरक मिलाने से सक्रियण ऊर्जा पूर्णतः समाप्त हो जाती है #10",
      "अभिक्रिया साम्य स्थिरांक K_eq तापमान से पूर्णतः स्वतंत्र हो जाता है #10"
    ],
    "correctAnswer": 0,
    "explanation": "For any spontaneous chemical transformation or equilibrium shift in Hydrocarbons at constant temperature and pressure, the thermodynamic criterion requires ΔG < 0 (ΔG = ΔH - TΔS).",
    "concept": "Thermodynamic Spontaneity & Kinetics of Hydrocarbons",
    "importantPoint": "ΔG < 0 indicates spontaneity; ΔG = 0 denotes dynamic chemical equilibrium.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c1-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Solutions - Reaction & Synthesis 1",
    "difficulty": "Easy",
    "question": "[NEET 2024] For an organic transformation or inorganic coordination process in Solutions, what is the major stereochemical or electronic product in sequence #1?",
    "questionHi": "[NEET 2024] Solutions में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #1 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #1)",
      "Retention of spatial geometry with zero racemization across all chiral centers #1",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #1",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #1"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #1) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #1",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #1",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #1"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Solutions, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Solutions",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c1-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Solutions - Reaction & Synthesis 2",
    "difficulty": "Medium",
    "question": "[RBSE 2023] For an organic transformation or inorganic coordination process in Solutions, what is the major stereochemical or electronic product in sequence #2?",
    "questionHi": "[RBSE 2023] Solutions में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #2 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #2)",
      "Retention of spatial geometry with zero racemization across all chiral centers #2",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #2",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #2"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #2) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #2",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #2",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #2"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Solutions, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Solutions",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c1-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Solutions - Reaction & Synthesis 3",
    "difficulty": "Hard",
    "question": "[CBSE 2022] For an organic transformation or inorganic coordination process in Solutions, what is the major stereochemical or electronic product in sequence #3?",
    "questionHi": "[CBSE 2022] Solutions में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #3 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #3)",
      "Retention of spatial geometry with zero racemization across all chiral centers #3",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #3",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #3"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #3) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #3",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #3",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #3"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Solutions, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Solutions",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c1-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Solutions - Reaction & Synthesis 4",
    "difficulty": "Medium",
    "question": "[JEE 2021] For an organic transformation or inorganic coordination process in Solutions, what is the major stereochemical or electronic product in sequence #4?",
    "questionHi": "[JEE 2021] Solutions में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #4 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #4)",
      "Retention of spatial geometry with zero racemization across all chiral centers #4",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #4",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #4"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #4) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #4",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #4",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #4"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Solutions, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Solutions",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c1-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Solutions - Reaction & Synthesis 5",
    "difficulty": "Easy",
    "question": "[NEET 2020] For an organic transformation or inorganic coordination process in Solutions, what is the major stereochemical or electronic product in sequence #5?",
    "questionHi": "[NEET 2020] Solutions में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #5 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #5)",
      "Retention of spatial geometry with zero racemization across all chiral centers #5",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #5",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #5"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #5) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #5",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #5",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #5"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Solutions, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Solutions",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c1-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Solutions - Reaction & Synthesis 6",
    "difficulty": "Hard",
    "question": "[RBSE 2025] For an organic transformation or inorganic coordination process in Solutions, what is the major stereochemical or electronic product in sequence #6?",
    "questionHi": "[RBSE 2025] Solutions में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #6 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #6)",
      "Retention of spatial geometry with zero racemization across all chiral centers #6",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #6",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #6"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #6) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #6",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #6",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #6"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Solutions, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Solutions",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c1-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Solutions - Reaction & Synthesis 7",
    "difficulty": "Easy",
    "question": "[CBSE 2024] For an organic transformation or inorganic coordination process in Solutions, what is the major stereochemical or electronic product in sequence #7?",
    "questionHi": "[CBSE 2024] Solutions में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #7 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #7)",
      "Retention of spatial geometry with zero racemization across all chiral centers #7",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #7",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #7"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #7) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #7",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #7",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #7"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Solutions, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Solutions",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c1-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Solutions - Reaction & Synthesis 8",
    "difficulty": "Medium",
    "question": "[JEE 2023] For an organic transformation or inorganic coordination process in Solutions, what is the major stereochemical or electronic product in sequence #8?",
    "questionHi": "[JEE 2023] Solutions में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #8 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #8)",
      "Retention of spatial geometry with zero racemization across all chiral centers #8",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #8",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #8"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #8) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #8",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #8",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #8"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Solutions, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Solutions",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c1-q9",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Solutions - Reaction & Synthesis 9",
    "difficulty": "Hard",
    "question": "[NEET 2022] For an organic transformation or inorganic coordination process in Solutions, what is the major stereochemical or electronic product in sequence #9?",
    "questionHi": "[NEET 2022] Solutions में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #9 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #9)",
      "Retention of spatial geometry with zero racemization across all chiral centers #9",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #9",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #9"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #9) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #9",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #9",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #9"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Solutions, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Solutions",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c1-q10",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Solutions",
    "topic": "Solutions - Reaction & Synthesis 10",
    "difficulty": "Medium",
    "question": "[RBSE 2021] For an organic transformation or inorganic coordination process in Solutions, what is the major stereochemical or electronic product in sequence #10?",
    "questionHi": "[RBSE 2021] Solutions में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #10 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #10)",
      "Retention of spatial geometry with zero racemization across all chiral centers #10",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #10",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #10"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #10) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #10",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #10",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #10"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Solutions, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Solutions",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c2-q1",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Electrochemistry - Reaction & Synthesis 1",
    "difficulty": "Easy",
    "question": "[RBSE 2023] For an organic transformation or inorganic coordination process in Electrochemistry, what is the major stereochemical or electronic product in sequence #1?",
    "questionHi": "[RBSE 2023] Electrochemistry में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #1 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #1)",
      "Retention of spatial geometry with zero racemization across all chiral centers #1",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #1",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #1"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #1) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #1",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #1",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #1"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Electrochemistry, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Electrochemistry",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c2-q2",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Electrochemistry - Reaction & Synthesis 2",
    "difficulty": "Medium",
    "question": "[CBSE 2022] For an organic transformation or inorganic coordination process in Electrochemistry, what is the major stereochemical or electronic product in sequence #2?",
    "questionHi": "[CBSE 2022] Electrochemistry में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #2 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #2)",
      "Retention of spatial geometry with zero racemization across all chiral centers #2",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #2",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #2"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #2) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #2",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #2",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #2"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Electrochemistry, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Electrochemistry",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c2-q3",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Electrochemistry - Reaction & Synthesis 3",
    "difficulty": "Hard",
    "question": "[JEE 2021] For an organic transformation or inorganic coordination process in Electrochemistry, what is the major stereochemical or electronic product in sequence #3?",
    "questionHi": "[JEE 2021] Electrochemistry में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #3 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #3)",
      "Retention of spatial geometry with zero racemization across all chiral centers #3",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #3",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #3"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #3) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #3",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #3",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #3"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Electrochemistry, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Electrochemistry",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c2-q4",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Electrochemistry - Reaction & Synthesis 4",
    "difficulty": "Medium",
    "question": "[NEET 2020] For an organic transformation or inorganic coordination process in Electrochemistry, what is the major stereochemical or electronic product in sequence #4?",
    "questionHi": "[NEET 2020] Electrochemistry में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #4 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #4)",
      "Retention of spatial geometry with zero racemization across all chiral centers #4",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #4",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #4"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #4) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #4",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #4",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #4"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Electrochemistry, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Electrochemistry",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c2-q5",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Electrochemistry - Reaction & Synthesis 5",
    "difficulty": "Easy",
    "question": "[RBSE 2025] For an organic transformation or inorganic coordination process in Electrochemistry, what is the major stereochemical or electronic product in sequence #5?",
    "questionHi": "[RBSE 2025] Electrochemistry में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #5 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #5)",
      "Retention of spatial geometry with zero racemization across all chiral centers #5",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #5",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #5"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #5) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #5",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #5",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #5"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Electrochemistry, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Electrochemistry",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c2-q6",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Electrochemistry - Reaction & Synthesis 6",
    "difficulty": "Hard",
    "question": "[CBSE 2024] For an organic transformation or inorganic coordination process in Electrochemistry, what is the major stereochemical or electronic product in sequence #6?",
    "questionHi": "[CBSE 2024] Electrochemistry में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #6 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #6)",
      "Retention of spatial geometry with zero racemization across all chiral centers #6",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #6",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #6"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #6) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #6",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #6",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #6"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Electrochemistry, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Electrochemistry",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c2-q7",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Electrochemistry - Reaction & Synthesis 7",
    "difficulty": "Easy",
    "question": "[JEE 2023] For an organic transformation or inorganic coordination process in Electrochemistry, what is the major stereochemical or electronic product in sequence #7?",
    "questionHi": "[JEE 2023] Electrochemistry में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #7 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #7)",
      "Retention of spatial geometry with zero racemization across all chiral centers #7",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #7",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #7"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #7) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #7",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #7",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #7"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Electrochemistry, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Electrochemistry",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c2-q8",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Electrochemistry - Reaction & Synthesis 8",
    "difficulty": "Medium",
    "question": "[NEET 2022] For an organic transformation or inorganic coordination process in Electrochemistry, what is the major stereochemical or electronic product in sequence #8?",
    "questionHi": "[NEET 2022] Electrochemistry में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #8 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #8)",
      "Retention of spatial geometry with zero racemization across all chiral centers #8",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #8",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #8"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #8) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #8",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #8",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #8"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Electrochemistry, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Electrochemistry",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c2-q9",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Electrochemistry - Reaction & Synthesis 9",
    "difficulty": "Hard",
    "question": "[RBSE 2021] For an organic transformation or inorganic coordination process in Electrochemistry, what is the major stereochemical or electronic product in sequence #9?",
    "questionHi": "[RBSE 2021] Electrochemistry में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #9 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #9)",
      "Retention of spatial geometry with zero racemization across all chiral centers #9",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #9",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #9"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #9) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #9",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #9",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #9"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Electrochemistry, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Electrochemistry",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c2-q10",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "topic": "Electrochemistry - Reaction & Synthesis 10",
    "difficulty": "Medium",
    "question": "[CBSE 2020] For an organic transformation or inorganic coordination process in Electrochemistry, what is the major stereochemical or electronic product in sequence #10?",
    "questionHi": "[CBSE 2020] Electrochemistry में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #10 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #10)",
      "Retention of spatial geometry with zero racemization across all chiral centers #10",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #10",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #10"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #10) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #10",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #10",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #10"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Electrochemistry, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Electrochemistry",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c3-q1",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "Chemical Kinetics - Reaction & Synthesis 1",
    "difficulty": "Easy",
    "question": "[CBSE 2022] For an organic transformation or inorganic coordination process in Chemical Kinetics, what is the major stereochemical or electronic product in sequence #1?",
    "questionHi": "[CBSE 2022] Chemical Kinetics में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #1 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #1)",
      "Retention of spatial geometry with zero racemization across all chiral centers #1",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #1",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #1"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #1) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #1",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #1",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #1"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Chemical Kinetics, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Chemical Kinetics",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c3-q2",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "Chemical Kinetics - Reaction & Synthesis 2",
    "difficulty": "Medium",
    "question": "[JEE 2021] For an organic transformation or inorganic coordination process in Chemical Kinetics, what is the major stereochemical or electronic product in sequence #2?",
    "questionHi": "[JEE 2021] Chemical Kinetics में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #2 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #2)",
      "Retention of spatial geometry with zero racemization across all chiral centers #2",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #2",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #2"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #2) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #2",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #2",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #2"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Chemical Kinetics, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Chemical Kinetics",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c3-q3",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "Chemical Kinetics - Reaction & Synthesis 3",
    "difficulty": "Hard",
    "question": "[NEET 2020] For an organic transformation or inorganic coordination process in Chemical Kinetics, what is the major stereochemical or electronic product in sequence #3?",
    "questionHi": "[NEET 2020] Chemical Kinetics में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #3 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #3)",
      "Retention of spatial geometry with zero racemization across all chiral centers #3",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #3",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #3"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #3) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #3",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #3",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #3"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Chemical Kinetics, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Chemical Kinetics",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c3-q4",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "Chemical Kinetics - Reaction & Synthesis 4",
    "difficulty": "Medium",
    "question": "[RBSE 2025] For an organic transformation or inorganic coordination process in Chemical Kinetics, what is the major stereochemical or electronic product in sequence #4?",
    "questionHi": "[RBSE 2025] Chemical Kinetics में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #4 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #4)",
      "Retention of spatial geometry with zero racemization across all chiral centers #4",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #4",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #4"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #4) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #4",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #4",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #4"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Chemical Kinetics, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Chemical Kinetics",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c3-q5",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "Chemical Kinetics - Reaction & Synthesis 5",
    "difficulty": "Easy",
    "question": "[CBSE 2024] For an organic transformation or inorganic coordination process in Chemical Kinetics, what is the major stereochemical or electronic product in sequence #5?",
    "questionHi": "[CBSE 2024] Chemical Kinetics में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #5 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #5)",
      "Retention of spatial geometry with zero racemization across all chiral centers #5",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #5",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #5"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #5) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #5",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #5",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #5"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Chemical Kinetics, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Chemical Kinetics",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c3-q6",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "Chemical Kinetics - Reaction & Synthesis 6",
    "difficulty": "Hard",
    "question": "[JEE 2023] For an organic transformation or inorganic coordination process in Chemical Kinetics, what is the major stereochemical or electronic product in sequence #6?",
    "questionHi": "[JEE 2023] Chemical Kinetics में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #6 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #6)",
      "Retention of spatial geometry with zero racemization across all chiral centers #6",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #6",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #6"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #6) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #6",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #6",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #6"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Chemical Kinetics, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Chemical Kinetics",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c3-q7",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "Chemical Kinetics - Reaction & Synthesis 7",
    "difficulty": "Easy",
    "question": "[NEET 2022] For an organic transformation or inorganic coordination process in Chemical Kinetics, what is the major stereochemical or electronic product in sequence #7?",
    "questionHi": "[NEET 2022] Chemical Kinetics में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #7 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #7)",
      "Retention of spatial geometry with zero racemization across all chiral centers #7",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #7",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #7"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #7) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #7",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #7",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #7"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Chemical Kinetics, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Chemical Kinetics",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c3-q8",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "Chemical Kinetics - Reaction & Synthesis 8",
    "difficulty": "Medium",
    "question": "[RBSE 2021] For an organic transformation or inorganic coordination process in Chemical Kinetics, what is the major stereochemical or electronic product in sequence #8?",
    "questionHi": "[RBSE 2021] Chemical Kinetics में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #8 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #8)",
      "Retention of spatial geometry with zero racemization across all chiral centers #8",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #8",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #8"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #8) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #8",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #8",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #8"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Chemical Kinetics, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Chemical Kinetics",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c3-q9",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "Chemical Kinetics - Reaction & Synthesis 9",
    "difficulty": "Hard",
    "question": "[CBSE 2020] For an organic transformation or inorganic coordination process in Chemical Kinetics, what is the major stereochemical or electronic product in sequence #9?",
    "questionHi": "[CBSE 2020] Chemical Kinetics में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #9 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #9)",
      "Retention of spatial geometry with zero racemization across all chiral centers #9",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #9",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #9"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #9) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #9",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #9",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #9"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Chemical Kinetics, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Chemical Kinetics",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c3-q10",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "topic": "Chemical Kinetics - Reaction & Synthesis 10",
    "difficulty": "Medium",
    "question": "[JEE 2025] For an organic transformation or inorganic coordination process in Chemical Kinetics, what is the major stereochemical or electronic product in sequence #10?",
    "questionHi": "[JEE 2025] Chemical Kinetics में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #10 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #10)",
      "Retention of spatial geometry with zero racemization across all chiral centers #10",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #10",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #10"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #10) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #10",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #10",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #10"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Chemical Kinetics, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Chemical Kinetics",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c4-q1",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "The d- and f-Block Elements",
    "topic": "The d- and f-Block Elements - Reaction & Synthesis 1",
    "difficulty": "Easy",
    "question": "[JEE 2021] For an organic transformation or inorganic coordination process in The d- and f-Block Elements, what is the major stereochemical or electronic product in sequence #1?",
    "questionHi": "[JEE 2021] The d- and f-Block Elements में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #1 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #1)",
      "Retention of spatial geometry with zero racemization across all chiral centers #1",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #1",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #1"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #1) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #1",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #1",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #1"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within The d- and f-Block Elements, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in The d- and f-Block Elements",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c4-q2",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "The d- and f-Block Elements",
    "topic": "The d- and f-Block Elements - Reaction & Synthesis 2",
    "difficulty": "Medium",
    "question": "[NEET 2020] For an organic transformation or inorganic coordination process in The d- and f-Block Elements, what is the major stereochemical or electronic product in sequence #2?",
    "questionHi": "[NEET 2020] The d- and f-Block Elements में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #2 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #2)",
      "Retention of spatial geometry with zero racemization across all chiral centers #2",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #2",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #2"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #2) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #2",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #2",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #2"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within The d- and f-Block Elements, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in The d- and f-Block Elements",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c4-q3",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "The d- and f-Block Elements",
    "topic": "The d- and f-Block Elements - Reaction & Synthesis 3",
    "difficulty": "Hard",
    "question": "[RBSE 2025] For an organic transformation or inorganic coordination process in The d- and f-Block Elements, what is the major stereochemical or electronic product in sequence #3?",
    "questionHi": "[RBSE 2025] The d- and f-Block Elements में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #3 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #3)",
      "Retention of spatial geometry with zero racemization across all chiral centers #3",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #3",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #3"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #3) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #3",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #3",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #3"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within The d- and f-Block Elements, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in The d- and f-Block Elements",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c4-q4",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "The d- and f-Block Elements",
    "topic": "The d- and f-Block Elements - Reaction & Synthesis 4",
    "difficulty": "Medium",
    "question": "[CBSE 2024] For an organic transformation or inorganic coordination process in The d- and f-Block Elements, what is the major stereochemical or electronic product in sequence #4?",
    "questionHi": "[CBSE 2024] The d- and f-Block Elements में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #4 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #4)",
      "Retention of spatial geometry with zero racemization across all chiral centers #4",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #4",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #4"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #4) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #4",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #4",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #4"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within The d- and f-Block Elements, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in The d- and f-Block Elements",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c4-q5",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "The d- and f-Block Elements",
    "topic": "The d- and f-Block Elements - Reaction & Synthesis 5",
    "difficulty": "Easy",
    "question": "[JEE 2023] For an organic transformation or inorganic coordination process in The d- and f-Block Elements, what is the major stereochemical or electronic product in sequence #5?",
    "questionHi": "[JEE 2023] The d- and f-Block Elements में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #5 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #5)",
      "Retention of spatial geometry with zero racemization across all chiral centers #5",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #5",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #5"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #5) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #5",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #5",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #5"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within The d- and f-Block Elements, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in The d- and f-Block Elements",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c4-q6",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "The d- and f-Block Elements",
    "topic": "The d- and f-Block Elements - Reaction & Synthesis 6",
    "difficulty": "Hard",
    "question": "[NEET 2022] For an organic transformation or inorganic coordination process in The d- and f-Block Elements, what is the major stereochemical or electronic product in sequence #6?",
    "questionHi": "[NEET 2022] The d- and f-Block Elements में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #6 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #6)",
      "Retention of spatial geometry with zero racemization across all chiral centers #6",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #6",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #6"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #6) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #6",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #6",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #6"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within The d- and f-Block Elements, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in The d- and f-Block Elements",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c4-q7",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "The d- and f-Block Elements",
    "topic": "The d- and f-Block Elements - Reaction & Synthesis 7",
    "difficulty": "Easy",
    "question": "[RBSE 2021] For an organic transformation or inorganic coordination process in The d- and f-Block Elements, what is the major stereochemical or electronic product in sequence #7?",
    "questionHi": "[RBSE 2021] The d- and f-Block Elements में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #7 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #7)",
      "Retention of spatial geometry with zero racemization across all chiral centers #7",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #7",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #7"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #7) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #7",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #7",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #7"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within The d- and f-Block Elements, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in The d- and f-Block Elements",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c4-q8",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "The d- and f-Block Elements",
    "topic": "The d- and f-Block Elements - Reaction & Synthesis 8",
    "difficulty": "Medium",
    "question": "[CBSE 2020] For an organic transformation or inorganic coordination process in The d- and f-Block Elements, what is the major stereochemical or electronic product in sequence #8?",
    "questionHi": "[CBSE 2020] The d- and f-Block Elements में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #8 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #8)",
      "Retention of spatial geometry with zero racemization across all chiral centers #8",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #8",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #8"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #8) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #8",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #8",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #8"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within The d- and f-Block Elements, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in The d- and f-Block Elements",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c4-q9",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "The d- and f-Block Elements",
    "topic": "The d- and f-Block Elements - Reaction & Synthesis 9",
    "difficulty": "Hard",
    "question": "[JEE 2025] For an organic transformation or inorganic coordination process in The d- and f-Block Elements, what is the major stereochemical or electronic product in sequence #9?",
    "questionHi": "[JEE 2025] The d- and f-Block Elements में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #9 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #9)",
      "Retention of spatial geometry with zero racemization across all chiral centers #9",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #9",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #9"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #9) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #9",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #9",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #9"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within The d- and f-Block Elements, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in The d- and f-Block Elements",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c4-q10",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "The d- and f-Block Elements",
    "topic": "The d- and f-Block Elements - Reaction & Synthesis 10",
    "difficulty": "Medium",
    "question": "[NEET 2024] For an organic transformation or inorganic coordination process in The d- and f-Block Elements, what is the major stereochemical or electronic product in sequence #10?",
    "questionHi": "[NEET 2024] The d- and f-Block Elements में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #10 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #10)",
      "Retention of spatial geometry with zero racemization across all chiral centers #10",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #10",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #10"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #10) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #10",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #10",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #10"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within The d- and f-Block Elements, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in The d- and f-Block Elements",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c5-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Coordination Compounds - Reaction & Synthesis 1",
    "difficulty": "Easy",
    "question": "[NEET 2020] For an organic transformation or inorganic coordination process in Coordination Compounds, what is the major stereochemical or electronic product in sequence #1?",
    "questionHi": "[NEET 2020] Coordination Compounds में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #1 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #1)",
      "Retention of spatial geometry with zero racemization across all chiral centers #1",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #1",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #1"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #1) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #1",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #1",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #1"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Coordination Compounds, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Coordination Compounds",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c5-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Coordination Compounds - Reaction & Synthesis 2",
    "difficulty": "Medium",
    "question": "[RBSE 2025] For an organic transformation or inorganic coordination process in Coordination Compounds, what is the major stereochemical or electronic product in sequence #2?",
    "questionHi": "[RBSE 2025] Coordination Compounds में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #2 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #2)",
      "Retention of spatial geometry with zero racemization across all chiral centers #2",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #2",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #2"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #2) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #2",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #2",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #2"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Coordination Compounds, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Coordination Compounds",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c5-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Coordination Compounds - Reaction & Synthesis 3",
    "difficulty": "Hard",
    "question": "[CBSE 2024] For an organic transformation or inorganic coordination process in Coordination Compounds, what is the major stereochemical or electronic product in sequence #3?",
    "questionHi": "[CBSE 2024] Coordination Compounds में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #3 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #3)",
      "Retention of spatial geometry with zero racemization across all chiral centers #3",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #3",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #3"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #3) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #3",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #3",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #3"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Coordination Compounds, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Coordination Compounds",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c5-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Coordination Compounds - Reaction & Synthesis 4",
    "difficulty": "Medium",
    "question": "[JEE 2023] For an organic transformation or inorganic coordination process in Coordination Compounds, what is the major stereochemical or electronic product in sequence #4?",
    "questionHi": "[JEE 2023] Coordination Compounds में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #4 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #4)",
      "Retention of spatial geometry with zero racemization across all chiral centers #4",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #4",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #4"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #4) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #4",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #4",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #4"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Coordination Compounds, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Coordination Compounds",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c5-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Coordination Compounds - Reaction & Synthesis 5",
    "difficulty": "Easy",
    "question": "[NEET 2022] For an organic transformation or inorganic coordination process in Coordination Compounds, what is the major stereochemical or electronic product in sequence #5?",
    "questionHi": "[NEET 2022] Coordination Compounds में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #5 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #5)",
      "Retention of spatial geometry with zero racemization across all chiral centers #5",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #5",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #5"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #5) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #5",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #5",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #5"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Coordination Compounds, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Coordination Compounds",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c5-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Coordination Compounds - Reaction & Synthesis 6",
    "difficulty": "Hard",
    "question": "[RBSE 2021] For an organic transformation or inorganic coordination process in Coordination Compounds, what is the major stereochemical or electronic product in sequence #6?",
    "questionHi": "[RBSE 2021] Coordination Compounds में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #6 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #6)",
      "Retention of spatial geometry with zero racemization across all chiral centers #6",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #6",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #6"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #6) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #6",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #6",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #6"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Coordination Compounds, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Coordination Compounds",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c5-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Coordination Compounds - Reaction & Synthesis 7",
    "difficulty": "Easy",
    "question": "[CBSE 2020] For an organic transformation or inorganic coordination process in Coordination Compounds, what is the major stereochemical or electronic product in sequence #7?",
    "questionHi": "[CBSE 2020] Coordination Compounds में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #7 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #7)",
      "Retention of spatial geometry with zero racemization across all chiral centers #7",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #7",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #7"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #7) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #7",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #7",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #7"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Coordination Compounds, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Coordination Compounds",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c5-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Coordination Compounds - Reaction & Synthesis 8",
    "difficulty": "Medium",
    "question": "[JEE 2025] For an organic transformation or inorganic coordination process in Coordination Compounds, what is the major stereochemical or electronic product in sequence #8?",
    "questionHi": "[JEE 2025] Coordination Compounds में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #8 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #8)",
      "Retention of spatial geometry with zero racemization across all chiral centers #8",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #8",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #8"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #8) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #8",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #8",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #8"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Coordination Compounds, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Coordination Compounds",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c5-q9",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Coordination Compounds - Reaction & Synthesis 9",
    "difficulty": "Hard",
    "question": "[NEET 2024] For an organic transformation or inorganic coordination process in Coordination Compounds, what is the major stereochemical or electronic product in sequence #9?",
    "questionHi": "[NEET 2024] Coordination Compounds में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #9 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #9)",
      "Retention of spatial geometry with zero racemization across all chiral centers #9",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #9",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #9"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #9) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #9",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #9",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #9"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Coordination Compounds, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Coordination Compounds",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c5-q10",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "topic": "Coordination Compounds - Reaction & Synthesis 10",
    "difficulty": "Medium",
    "question": "[RBSE 2023] For an organic transformation or inorganic coordination process in Coordination Compounds, what is the major stereochemical or electronic product in sequence #10?",
    "questionHi": "[RBSE 2023] Coordination Compounds में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #10 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #10)",
      "Retention of spatial geometry with zero racemization across all chiral centers #10",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #10",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #10"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #10) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #10",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #10",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #10"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Coordination Compounds, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Coordination Compounds",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c6-q1",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloalkanes and Haloarenes - Reaction & Synthesis 1",
    "difficulty": "Easy",
    "question": "[RBSE 2025] For an organic transformation or inorganic coordination process in Haloalkanes and Haloarenes, what is the major stereochemical or electronic product in sequence #1?",
    "questionHi": "[RBSE 2025] Haloalkanes and Haloarenes में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #1 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #1)",
      "Retention of spatial geometry with zero racemization across all chiral centers #1",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #1",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #1"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #1) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #1",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #1",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #1"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Haloalkanes and Haloarenes, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Haloalkanes and Haloarenes",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c6-q2",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloalkanes and Haloarenes - Reaction & Synthesis 2",
    "difficulty": "Medium",
    "question": "[CBSE 2024] For an organic transformation or inorganic coordination process in Haloalkanes and Haloarenes, what is the major stereochemical or electronic product in sequence #2?",
    "questionHi": "[CBSE 2024] Haloalkanes and Haloarenes में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #2 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #2)",
      "Retention of spatial geometry with zero racemization across all chiral centers #2",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #2",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #2"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #2) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #2",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #2",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #2"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Haloalkanes and Haloarenes, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Haloalkanes and Haloarenes",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c6-q3",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloalkanes and Haloarenes - Reaction & Synthesis 3",
    "difficulty": "Hard",
    "question": "[JEE 2023] For an organic transformation or inorganic coordination process in Haloalkanes and Haloarenes, what is the major stereochemical or electronic product in sequence #3?",
    "questionHi": "[JEE 2023] Haloalkanes and Haloarenes में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #3 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #3)",
      "Retention of spatial geometry with zero racemization across all chiral centers #3",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #3",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #3"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #3) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #3",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #3",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #3"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Haloalkanes and Haloarenes, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Haloalkanes and Haloarenes",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c6-q4",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloalkanes and Haloarenes - Reaction & Synthesis 4",
    "difficulty": "Medium",
    "question": "[NEET 2022] For an organic transformation or inorganic coordination process in Haloalkanes and Haloarenes, what is the major stereochemical or electronic product in sequence #4?",
    "questionHi": "[NEET 2022] Haloalkanes and Haloarenes में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #4 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #4)",
      "Retention of spatial geometry with zero racemization across all chiral centers #4",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #4",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #4"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #4) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #4",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #4",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #4"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Haloalkanes and Haloarenes, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Haloalkanes and Haloarenes",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c6-q5",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloalkanes and Haloarenes - Reaction & Synthesis 5",
    "difficulty": "Easy",
    "question": "[RBSE 2021] For an organic transformation or inorganic coordination process in Haloalkanes and Haloarenes, what is the major stereochemical or electronic product in sequence #5?",
    "questionHi": "[RBSE 2021] Haloalkanes and Haloarenes में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #5 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #5)",
      "Retention of spatial geometry with zero racemization across all chiral centers #5",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #5",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #5"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #5) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #5",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #5",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #5"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Haloalkanes and Haloarenes, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Haloalkanes and Haloarenes",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c6-q6",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloalkanes and Haloarenes - Reaction & Synthesis 6",
    "difficulty": "Hard",
    "question": "[CBSE 2020] For an organic transformation or inorganic coordination process in Haloalkanes and Haloarenes, what is the major stereochemical or electronic product in sequence #6?",
    "questionHi": "[CBSE 2020] Haloalkanes and Haloarenes में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #6 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #6)",
      "Retention of spatial geometry with zero racemization across all chiral centers #6",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #6",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #6"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #6) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #6",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #6",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #6"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Haloalkanes and Haloarenes, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Haloalkanes and Haloarenes",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c6-q7",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloalkanes and Haloarenes - Reaction & Synthesis 7",
    "difficulty": "Easy",
    "question": "[JEE 2025] For an organic transformation or inorganic coordination process in Haloalkanes and Haloarenes, what is the major stereochemical or electronic product in sequence #7?",
    "questionHi": "[JEE 2025] Haloalkanes and Haloarenes में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #7 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #7)",
      "Retention of spatial geometry with zero racemization across all chiral centers #7",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #7",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #7"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #7) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #7",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #7",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #7"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Haloalkanes and Haloarenes, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Haloalkanes and Haloarenes",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c6-q8",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloalkanes and Haloarenes - Reaction & Synthesis 8",
    "difficulty": "Medium",
    "question": "[NEET 2024] For an organic transformation or inorganic coordination process in Haloalkanes and Haloarenes, what is the major stereochemical or electronic product in sequence #8?",
    "questionHi": "[NEET 2024] Haloalkanes and Haloarenes में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #8 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #8)",
      "Retention of spatial geometry with zero racemization across all chiral centers #8",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #8",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #8"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #8) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #8",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #8",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #8"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Haloalkanes and Haloarenes, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Haloalkanes and Haloarenes",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c6-q9",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloalkanes and Haloarenes - Reaction & Synthesis 9",
    "difficulty": "Hard",
    "question": "[RBSE 2023] For an organic transformation or inorganic coordination process in Haloalkanes and Haloarenes, what is the major stereochemical or electronic product in sequence #9?",
    "questionHi": "[RBSE 2023] Haloalkanes and Haloarenes में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #9 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #9)",
      "Retention of spatial geometry with zero racemization across all chiral centers #9",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #9",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #9"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #9) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #9",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #9",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #9"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Haloalkanes and Haloarenes, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Haloalkanes and Haloarenes",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c6-q10",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloalkanes and Haloarenes - Reaction & Synthesis 10",
    "difficulty": "Medium",
    "question": "[CBSE 2022] For an organic transformation or inorganic coordination process in Haloalkanes and Haloarenes, what is the major stereochemical or electronic product in sequence #10?",
    "questionHi": "[CBSE 2022] Haloalkanes and Haloarenes में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #10 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #10)",
      "Retention of spatial geometry with zero racemization across all chiral centers #10",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #10",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #10"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #10) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #10",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #10",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #10"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Haloalkanes and Haloarenes, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Haloalkanes and Haloarenes",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c7-q1",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols, Phenols and Ethers - Reaction & Synthesis 1",
    "difficulty": "Easy",
    "question": "[CBSE 2024] For an organic transformation or inorganic coordination process in Alcohols, Phenols and Ethers, what is the major stereochemical or electronic product in sequence #1?",
    "questionHi": "[CBSE 2024] Alcohols, Phenols and Ethers में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #1 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #1)",
      "Retention of spatial geometry with zero racemization across all chiral centers #1",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #1",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #1"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #1) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #1",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #1",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #1"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Alcohols, Phenols and Ethers, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Alcohols, Phenols and Ethers",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c7-q2",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols, Phenols and Ethers - Reaction & Synthesis 2",
    "difficulty": "Medium",
    "question": "[JEE 2023] For an organic transformation or inorganic coordination process in Alcohols, Phenols and Ethers, what is the major stereochemical or electronic product in sequence #2?",
    "questionHi": "[JEE 2023] Alcohols, Phenols and Ethers में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #2 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #2)",
      "Retention of spatial geometry with zero racemization across all chiral centers #2",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #2",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #2"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #2) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #2",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #2",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #2"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Alcohols, Phenols and Ethers, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Alcohols, Phenols and Ethers",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c7-q3",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols, Phenols and Ethers - Reaction & Synthesis 3",
    "difficulty": "Hard",
    "question": "[NEET 2022] For an organic transformation or inorganic coordination process in Alcohols, Phenols and Ethers, what is the major stereochemical or electronic product in sequence #3?",
    "questionHi": "[NEET 2022] Alcohols, Phenols and Ethers में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #3 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #3)",
      "Retention of spatial geometry with zero racemization across all chiral centers #3",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #3",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #3"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #3) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #3",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #3",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #3"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Alcohols, Phenols and Ethers, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Alcohols, Phenols and Ethers",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c7-q4",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols, Phenols and Ethers - Reaction & Synthesis 4",
    "difficulty": "Medium",
    "question": "[RBSE 2021] For an organic transformation or inorganic coordination process in Alcohols, Phenols and Ethers, what is the major stereochemical or electronic product in sequence #4?",
    "questionHi": "[RBSE 2021] Alcohols, Phenols and Ethers में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #4 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #4)",
      "Retention of spatial geometry with zero racemization across all chiral centers #4",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #4",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #4"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #4) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #4",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #4",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #4"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Alcohols, Phenols and Ethers, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Alcohols, Phenols and Ethers",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c7-q5",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols, Phenols and Ethers - Reaction & Synthesis 5",
    "difficulty": "Easy",
    "question": "[CBSE 2020] For an organic transformation or inorganic coordination process in Alcohols, Phenols and Ethers, what is the major stereochemical or electronic product in sequence #5?",
    "questionHi": "[CBSE 2020] Alcohols, Phenols and Ethers में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #5 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #5)",
      "Retention of spatial geometry with zero racemization across all chiral centers #5",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #5",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #5"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #5) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #5",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #5",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #5"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Alcohols, Phenols and Ethers, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Alcohols, Phenols and Ethers",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c7-q6",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols, Phenols and Ethers - Reaction & Synthesis 6",
    "difficulty": "Hard",
    "question": "[JEE 2025] For an organic transformation or inorganic coordination process in Alcohols, Phenols and Ethers, what is the major stereochemical or electronic product in sequence #6?",
    "questionHi": "[JEE 2025] Alcohols, Phenols and Ethers में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #6 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #6)",
      "Retention of spatial geometry with zero racemization across all chiral centers #6",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #6",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #6"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #6) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #6",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #6",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #6"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Alcohols, Phenols and Ethers, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Alcohols, Phenols and Ethers",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c7-q7",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols, Phenols and Ethers - Reaction & Synthesis 7",
    "difficulty": "Easy",
    "question": "[NEET 2024] For an organic transformation or inorganic coordination process in Alcohols, Phenols and Ethers, what is the major stereochemical or electronic product in sequence #7?",
    "questionHi": "[NEET 2024] Alcohols, Phenols and Ethers में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #7 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #7)",
      "Retention of spatial geometry with zero racemization across all chiral centers #7",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #7",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #7"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #7) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #7",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #7",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #7"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Alcohols, Phenols and Ethers, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Alcohols, Phenols and Ethers",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c7-q8",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols, Phenols and Ethers - Reaction & Synthesis 8",
    "difficulty": "Medium",
    "question": "[RBSE 2023] For an organic transformation or inorganic coordination process in Alcohols, Phenols and Ethers, what is the major stereochemical or electronic product in sequence #8?",
    "questionHi": "[RBSE 2023] Alcohols, Phenols and Ethers में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #8 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #8)",
      "Retention of spatial geometry with zero racemization across all chiral centers #8",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #8",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #8"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #8) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #8",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #8",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #8"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Alcohols, Phenols and Ethers, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Alcohols, Phenols and Ethers",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c7-q9",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols, Phenols and Ethers - Reaction & Synthesis 9",
    "difficulty": "Hard",
    "question": "[CBSE 2022] For an organic transformation or inorganic coordination process in Alcohols, Phenols and Ethers, what is the major stereochemical or electronic product in sequence #9?",
    "questionHi": "[CBSE 2022] Alcohols, Phenols and Ethers में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #9 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #9)",
      "Retention of spatial geometry with zero racemization across all chiral centers #9",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #9",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #9"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #9) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #9",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #9",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #9"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Alcohols, Phenols and Ethers, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Alcohols, Phenols and Ethers",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c7-q10",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols, Phenols and Ethers - Reaction & Synthesis 10",
    "difficulty": "Medium",
    "question": "[JEE 2021] For an organic transformation or inorganic coordination process in Alcohols, Phenols and Ethers, what is the major stereochemical or electronic product in sequence #10?",
    "questionHi": "[JEE 2021] Alcohols, Phenols and Ethers में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #10 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #10)",
      "Retention of spatial geometry with zero racemization across all chiral centers #10",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #10",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #10"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #10) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #10",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #10",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #10"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Alcohols, Phenols and Ethers, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Alcohols, Phenols and Ethers",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c8-q1",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldehydes, Ketones and Carboxylic Acids - Reaction & Synthesis 1",
    "difficulty": "Easy",
    "question": "[JEE 2023] For an organic transformation or inorganic coordination process in Aldehydes, Ketones and Carboxylic Acids, what is the major stereochemical or electronic product in sequence #1?",
    "questionHi": "[JEE 2023] Aldehydes, Ketones and Carboxylic Acids में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #1 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #1)",
      "Retention of spatial geometry with zero racemization across all chiral centers #1",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #1",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #1"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #1) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #1",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #1",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #1"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Aldehydes, Ketones and Carboxylic Acids, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Aldehydes, Ketones and Carboxylic Acids",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c8-q2",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldehydes, Ketones and Carboxylic Acids - Reaction & Synthesis 2",
    "difficulty": "Medium",
    "question": "[NEET 2022] For an organic transformation or inorganic coordination process in Aldehydes, Ketones and Carboxylic Acids, what is the major stereochemical or electronic product in sequence #2?",
    "questionHi": "[NEET 2022] Aldehydes, Ketones and Carboxylic Acids में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #2 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #2)",
      "Retention of spatial geometry with zero racemization across all chiral centers #2",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #2",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #2"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #2) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #2",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #2",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #2"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Aldehydes, Ketones and Carboxylic Acids, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Aldehydes, Ketones and Carboxylic Acids",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c8-q3",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldehydes, Ketones and Carboxylic Acids - Reaction & Synthesis 3",
    "difficulty": "Hard",
    "question": "[RBSE 2021] For an organic transformation or inorganic coordination process in Aldehydes, Ketones and Carboxylic Acids, what is the major stereochemical or electronic product in sequence #3?",
    "questionHi": "[RBSE 2021] Aldehydes, Ketones and Carboxylic Acids में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #3 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #3)",
      "Retention of spatial geometry with zero racemization across all chiral centers #3",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #3",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #3"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #3) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #3",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #3",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #3"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Aldehydes, Ketones and Carboxylic Acids, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Aldehydes, Ketones and Carboxylic Acids",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c8-q4",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldehydes, Ketones and Carboxylic Acids - Reaction & Synthesis 4",
    "difficulty": "Medium",
    "question": "[CBSE 2020] For an organic transformation or inorganic coordination process in Aldehydes, Ketones and Carboxylic Acids, what is the major stereochemical or electronic product in sequence #4?",
    "questionHi": "[CBSE 2020] Aldehydes, Ketones and Carboxylic Acids में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #4 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #4)",
      "Retention of spatial geometry with zero racemization across all chiral centers #4",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #4",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #4"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #4) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #4",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #4",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #4"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Aldehydes, Ketones and Carboxylic Acids, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Aldehydes, Ketones and Carboxylic Acids",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c8-q5",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldehydes, Ketones and Carboxylic Acids - Reaction & Synthesis 5",
    "difficulty": "Easy",
    "question": "[JEE 2025] For an organic transformation or inorganic coordination process in Aldehydes, Ketones and Carboxylic Acids, what is the major stereochemical or electronic product in sequence #5?",
    "questionHi": "[JEE 2025] Aldehydes, Ketones and Carboxylic Acids में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #5 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #5)",
      "Retention of spatial geometry with zero racemization across all chiral centers #5",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #5",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #5"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #5) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #5",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #5",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #5"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Aldehydes, Ketones and Carboxylic Acids, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Aldehydes, Ketones and Carboxylic Acids",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c8-q6",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldehydes, Ketones and Carboxylic Acids - Reaction & Synthesis 6",
    "difficulty": "Hard",
    "question": "[NEET 2024] For an organic transformation or inorganic coordination process in Aldehydes, Ketones and Carboxylic Acids, what is the major stereochemical or electronic product in sequence #6?",
    "questionHi": "[NEET 2024] Aldehydes, Ketones and Carboxylic Acids में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #6 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #6)",
      "Retention of spatial geometry with zero racemization across all chiral centers #6",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #6",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #6"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #6) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #6",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #6",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #6"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Aldehydes, Ketones and Carboxylic Acids, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Aldehydes, Ketones and Carboxylic Acids",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c8-q7",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldehydes, Ketones and Carboxylic Acids - Reaction & Synthesis 7",
    "difficulty": "Easy",
    "question": "[RBSE 2023] For an organic transformation or inorganic coordination process in Aldehydes, Ketones and Carboxylic Acids, what is the major stereochemical or electronic product in sequence #7?",
    "questionHi": "[RBSE 2023] Aldehydes, Ketones and Carboxylic Acids में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #7 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #7)",
      "Retention of spatial geometry with zero racemization across all chiral centers #7",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #7",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #7"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #7) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #7",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #7",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #7"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Aldehydes, Ketones and Carboxylic Acids, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Aldehydes, Ketones and Carboxylic Acids",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c8-q8",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldehydes, Ketones and Carboxylic Acids - Reaction & Synthesis 8",
    "difficulty": "Medium",
    "question": "[CBSE 2022] For an organic transformation or inorganic coordination process in Aldehydes, Ketones and Carboxylic Acids, what is the major stereochemical or electronic product in sequence #8?",
    "questionHi": "[CBSE 2022] Aldehydes, Ketones and Carboxylic Acids में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #8 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #8)",
      "Retention of spatial geometry with zero racemization across all chiral centers #8",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #8",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #8"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #8) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #8",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #8",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #8"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Aldehydes, Ketones and Carboxylic Acids, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Aldehydes, Ketones and Carboxylic Acids",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c8-q9",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldehydes, Ketones and Carboxylic Acids - Reaction & Synthesis 9",
    "difficulty": "Hard",
    "question": "[JEE 2021] For an organic transformation or inorganic coordination process in Aldehydes, Ketones and Carboxylic Acids, what is the major stereochemical or electronic product in sequence #9?",
    "questionHi": "[JEE 2021] Aldehydes, Ketones and Carboxylic Acids में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #9 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #9)",
      "Retention of spatial geometry with zero racemization across all chiral centers #9",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #9",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #9"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #9) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #9",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #9",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #9"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Aldehydes, Ketones and Carboxylic Acids, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Aldehydes, Ketones and Carboxylic Acids",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c8-q10",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldehydes, Ketones and Carboxylic Acids - Reaction & Synthesis 10",
    "difficulty": "Medium",
    "question": "[NEET 2020] For an organic transformation or inorganic coordination process in Aldehydes, Ketones and Carboxylic Acids, what is the major stereochemical or electronic product in sequence #10?",
    "questionHi": "[NEET 2020] Aldehydes, Ketones and Carboxylic Acids में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #10 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #10)",
      "Retention of spatial geometry with zero racemization across all chiral centers #10",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #10",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #10"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #10) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #10",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #10",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #10"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Aldehydes, Ketones and Carboxylic Acids, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Aldehydes, Ketones and Carboxylic Acids",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c9-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Amines - Reaction & Synthesis 1",
    "difficulty": "Easy",
    "question": "[NEET 2022] For an organic transformation or inorganic coordination process in Amines, what is the major stereochemical or electronic product in sequence #1?",
    "questionHi": "[NEET 2022] Amines में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #1 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #1)",
      "Retention of spatial geometry with zero racemization across all chiral centers #1",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #1",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #1"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #1) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #1",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #1",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #1"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Amines, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Amines",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c9-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Amines - Reaction & Synthesis 2",
    "difficulty": "Medium",
    "question": "[RBSE 2021] For an organic transformation or inorganic coordination process in Amines, what is the major stereochemical or electronic product in sequence #2?",
    "questionHi": "[RBSE 2021] Amines में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #2 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #2)",
      "Retention of spatial geometry with zero racemization across all chiral centers #2",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #2",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #2"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #2) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #2",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #2",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #2"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Amines, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Amines",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c9-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Amines - Reaction & Synthesis 3",
    "difficulty": "Hard",
    "question": "[CBSE 2020] For an organic transformation or inorganic coordination process in Amines, what is the major stereochemical or electronic product in sequence #3?",
    "questionHi": "[CBSE 2020] Amines में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #3 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #3)",
      "Retention of spatial geometry with zero racemization across all chiral centers #3",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #3",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #3"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #3) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #3",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #3",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #3"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Amines, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Amines",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c9-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Amines - Reaction & Synthesis 4",
    "difficulty": "Medium",
    "question": "[JEE 2025] For an organic transformation or inorganic coordination process in Amines, what is the major stereochemical or electronic product in sequence #4?",
    "questionHi": "[JEE 2025] Amines में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #4 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #4)",
      "Retention of spatial geometry with zero racemization across all chiral centers #4",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #4",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #4"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #4) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #4",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #4",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #4"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Amines, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Amines",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c9-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Amines - Reaction & Synthesis 5",
    "difficulty": "Easy",
    "question": "[NEET 2024] For an organic transformation or inorganic coordination process in Amines, what is the major stereochemical or electronic product in sequence #5?",
    "questionHi": "[NEET 2024] Amines में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #5 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #5)",
      "Retention of spatial geometry with zero racemization across all chiral centers #5",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #5",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #5"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #5) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #5",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #5",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #5"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Amines, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Amines",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c9-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Amines - Reaction & Synthesis 6",
    "difficulty": "Hard",
    "question": "[RBSE 2023] For an organic transformation or inorganic coordination process in Amines, what is the major stereochemical or electronic product in sequence #6?",
    "questionHi": "[RBSE 2023] Amines में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #6 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #6)",
      "Retention of spatial geometry with zero racemization across all chiral centers #6",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #6",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #6"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #6) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #6",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #6",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #6"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Amines, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Amines",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c9-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Amines - Reaction & Synthesis 7",
    "difficulty": "Easy",
    "question": "[CBSE 2022] For an organic transformation or inorganic coordination process in Amines, what is the major stereochemical or electronic product in sequence #7?",
    "questionHi": "[CBSE 2022] Amines में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #7 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #7)",
      "Retention of spatial geometry with zero racemization across all chiral centers #7",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #7",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #7"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #7) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #7",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #7",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #7"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Amines, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Amines",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c9-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Amines - Reaction & Synthesis 8",
    "difficulty": "Medium",
    "question": "[JEE 2021] For an organic transformation or inorganic coordination process in Amines, what is the major stereochemical or electronic product in sequence #8?",
    "questionHi": "[JEE 2021] Amines में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #8 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #8)",
      "Retention of spatial geometry with zero racemization across all chiral centers #8",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #8",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #8"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #8) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #8",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #8",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #8"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Amines, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Amines",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c9-q9",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Amines - Reaction & Synthesis 9",
    "difficulty": "Hard",
    "question": "[NEET 2020] For an organic transformation or inorganic coordination process in Amines, what is the major stereochemical or electronic product in sequence #9?",
    "questionHi": "[NEET 2020] Amines में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #9 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #9)",
      "Retention of spatial geometry with zero racemization across all chiral centers #9",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #9",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #9"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #9) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #9",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #9",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #9"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Amines, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Amines",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c9-q10",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Amines",
    "topic": "Amines - Reaction & Synthesis 10",
    "difficulty": "Medium",
    "question": "[RBSE 2025] For an organic transformation or inorganic coordination process in Amines, what is the major stereochemical or electronic product in sequence #10?",
    "questionHi": "[RBSE 2025] Amines में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #10 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #10)",
      "Retention of spatial geometry with zero racemization across all chiral centers #10",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #10",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #10"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #10) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #10",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #10",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #10"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Amines, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Amines",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c10-q1",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Biomolecules - Reaction & Synthesis 1",
    "difficulty": "Easy",
    "question": "[RBSE 2021] For an organic transformation or inorganic coordination process in Biomolecules, what is the major stereochemical or electronic product in sequence #1?",
    "questionHi": "[RBSE 2021] Biomolecules में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #1 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #1)",
      "Retention of spatial geometry with zero racemization across all chiral centers #1",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #1",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #1"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #1) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #1",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #1",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #1"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Biomolecules, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Biomolecules",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c10-q2",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Biomolecules - Reaction & Synthesis 2",
    "difficulty": "Medium",
    "question": "[CBSE 2020] For an organic transformation or inorganic coordination process in Biomolecules, what is the major stereochemical or electronic product in sequence #2?",
    "questionHi": "[CBSE 2020] Biomolecules में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #2 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #2)",
      "Retention of spatial geometry with zero racemization across all chiral centers #2",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #2",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #2"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #2) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #2",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #2",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #2"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Biomolecules, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Biomolecules",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c10-q3",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Biomolecules - Reaction & Synthesis 3",
    "difficulty": "Hard",
    "question": "[JEE 2025] For an organic transformation or inorganic coordination process in Biomolecules, what is the major stereochemical or electronic product in sequence #3?",
    "questionHi": "[JEE 2025] Biomolecules में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #3 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #3)",
      "Retention of spatial geometry with zero racemization across all chiral centers #3",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #3",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #3"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #3) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #3",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #3",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #3"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Biomolecules, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Biomolecules",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c10-q4",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Biomolecules - Reaction & Synthesis 4",
    "difficulty": "Medium",
    "question": "[NEET 2024] For an organic transformation or inorganic coordination process in Biomolecules, what is the major stereochemical or electronic product in sequence #4?",
    "questionHi": "[NEET 2024] Biomolecules में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #4 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #4)",
      "Retention of spatial geometry with zero racemization across all chiral centers #4",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #4",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #4"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #4) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #4",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #4",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #4"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Biomolecules, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Biomolecules",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c10-q5",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Biomolecules - Reaction & Synthesis 5",
    "difficulty": "Easy",
    "question": "[RBSE 2023] For an organic transformation or inorganic coordination process in Biomolecules, what is the major stereochemical or electronic product in sequence #5?",
    "questionHi": "[RBSE 2023] Biomolecules में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #5 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #5)",
      "Retention of spatial geometry with zero racemization across all chiral centers #5",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #5",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #5"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #5) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #5",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #5",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #5"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Biomolecules, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Biomolecules",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c10-q6",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Biomolecules - Reaction & Synthesis 6",
    "difficulty": "Hard",
    "question": "[CBSE 2022] For an organic transformation or inorganic coordination process in Biomolecules, what is the major stereochemical or electronic product in sequence #6?",
    "questionHi": "[CBSE 2022] Biomolecules में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #6 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #6)",
      "Retention of spatial geometry with zero racemization across all chiral centers #6",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #6",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #6"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #6) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #6",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #6",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #6"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Biomolecules, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Biomolecules",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c10-q7",
    "exam": "JEE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Biomolecules - Reaction & Synthesis 7",
    "difficulty": "Easy",
    "question": "[JEE 2021] For an organic transformation or inorganic coordination process in Biomolecules, what is the major stereochemical or electronic product in sequence #7?",
    "questionHi": "[JEE 2021] Biomolecules में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #7 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #7)",
      "Retention of spatial geometry with zero racemization across all chiral centers #7",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #7",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #7"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #7) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #7",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #7",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #7"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Biomolecules, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Biomolecules",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "JEE Board Exam 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "chem-12-c10-q8",
    "exam": "NEET",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Biomolecules - Reaction & Synthesis 8",
    "difficulty": "Medium",
    "question": "[NEET 2020] For an organic transformation or inorganic coordination process in Biomolecules, what is the major stereochemical or electronic product in sequence #8?",
    "questionHi": "[NEET 2020] Biomolecules में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #8 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #8)",
      "Retention of spatial geometry with zero racemization across all chiral centers #8",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #8",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #8"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #8) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #8",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #8",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #8"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Biomolecules, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Biomolecules",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "NEET Board Exam 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "chem-12-c10-q9",
    "exam": "RBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Biomolecules - Reaction & Synthesis 9",
    "difficulty": "Hard",
    "question": "[RBSE 2025] For an organic transformation or inorganic coordination process in Biomolecules, what is the major stereochemical or electronic product in sequence #9?",
    "questionHi": "[RBSE 2025] Biomolecules में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #9 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #9)",
      "Retention of spatial geometry with zero racemization across all chiral centers #9",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #9",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #9"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #9) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #9",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #9",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #9"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Biomolecules, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Biomolecules",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "RBSE Board Exam 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "chem-12-c10-q10",
    "exam": "CBSE",
    "class": "12",
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "topic": "Biomolecules - Reaction & Synthesis 10",
    "difficulty": "Medium",
    "question": "[CBSE 2024] For an organic transformation or inorganic coordination process in Biomolecules, what is the major stereochemical or electronic product in sequence #10?",
    "questionHi": "[CBSE 2024] Biomolecules में कार्बनिक रूपांतरण अथवा उपसहसंयोजन प्रक्रिया में अनुक्रम #10 में मुख्य त्रिविम रासायनिक उत्पाद क्या है?",
    "options": [
      "Complete inversion of configuration via bimolecular nucleophilic substitution (SN2 pathway #10)",
      "Retention of spatial geometry with zero racemization across all chiral centers #10",
      "Formation of a high-spin paramagnetic octahedral complex with zero crystal field stabilization #10",
      "Direct oxidative addition yielding an unstable anti-aromatic intermediate #10"
    ],
    "optionsHi": [
      "द्विअणुक नाभिकस्नेही प्रतिस्थापन (SN2 पथ #10) द्वारा विन्यास का पूर्ण प्रतिलोमन (Walden Inversion)",
      "सभी काइरल केंद्रों पर बिना किसी रेसिमीकरण के स्थानिक ज्यामिति का प्रतिधारण #10",
      "शून्य क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा युक्त उच्च चक्रण अनुचुंबकीय संकुल का निर्माण #10",
      "अस्थिर एंटी-एरोमैटिक मध्यवर्ती देने वाला प्रत्यक्ष ऑक्सीडेटिव योग #10"
    ],
    "correctAnswer": 0,
    "explanation": "In standard organic substitution and coordination reactions within Biomolecules, backside nucleophilic attack on primary/secondary sp³ carbon centers proceeds with 100% Walden inversion of configuration.",
    "concept": "Reaction Mechanisms & Stereochemistry in Biomolecules",
    "importantPoint": "SN2 mechanisms proceed via single-step transition state with complete stereochemical inversion.",
    "source": "CBSE Board Exam 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  }
];
