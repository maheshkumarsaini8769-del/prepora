import { Question } from '../../types';

export const physicsBank: Question[] = [
  {
    "id": "phy-11-dim-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Dimensional Analysis",
    "difficulty": "Medium",
    "question": "If velocity v, force F, and time T are chosen as fundamental dimensions, what is the dimensional formula for mass?",
    "questionHi": "यदि वेग v, बल F और समय T को मूल विमाएँ माना जाए, तो द्रव्यमान का विमीय सूत्र क्या होगा?",
    "options": [
      "F v⁻¹ T",
      "F v T⁻¹",
      "F v⁻² T²",
      "F⁻¹ v T"
    ],
    "optionsHi": [
      "F v⁻¹ T",
      "F v T⁻¹",
      "F v⁻² T²",
      "F⁻¹ v T"
    ],
    "correctAnswer": 0,
    "explanation": "Force F = mass × acceleration = m × (v / T). Rearranging gives m = F × T / v = F v⁻¹ T.",
    "concept": "Dimensions of derived physical quantities in terms of chosen fundamental bases.",
    "importantPoint": "Relate quantities using Newton's second law F = dp/dt.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-err-01",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Error Propagation",
    "difficulty": "Easy",
    "question": "The percentage errors in the measurement of mass and speed are 2% and 3% respectively. What is the maximum percentage error in the estimated kinetic energy?",
    "questionHi": "द्रव्यमान और चाल के मापन में प्रतिशत त्रुटियाँ क्रमशः 2% और 3% हैं। अनुमानित गतिज ऊर्जा में अधिकतम प्रतिशत त्रुटि क्या होगी?",
    "options": [
      "5%",
      "8%",
      "11%",
      "6%"
    ],
    "optionsHi": [
      "5%",
      "8%",
      "11%",
      "6%"
    ],
    "correctAnswer": 1,
    "explanation": "Kinetic Energy K = (1/2) m v². Relative error is ΔK/K = Δm/m + 2(Δv/v) = 2% + 2(3%) = 8%.",
    "concept": "Error propagation for product and power relationships.",
    "source": "PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-scr-01",
    "exam": "Board",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Vernier & Screw Gauge",
    "difficulty": "Easy",
    "question": "A screw gauge has a pitch of 0.5 mm and 50 circular scale divisions. The least count of the instrument is:",
    "questionHi": "एक स्क्रूगेज की पिच 0.5 मिमी है और 50 वृत्ताकार पैमाने के भाग हैं। उपकरण का अल्पतमांक क्या है?",
    "options": [
      "0.01 mm",
      "0.05 mm",
      "0.001 mm",
      "0.1 mm"
    ],
    "optionsHi": [
      "0.01 मिमी",
      "0.05 मिमी",
      "0.001 मिमी",
      "0.1 मिमी"
    ],
    "correctAnswer": 0,
    "explanation": "Least Count = Pitch / Number of circular divisions = 0.5 mm / 50 = 0.01 mm.",
    "concept": "Least count determination for micrometers.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-kin-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinematics",
    "topic": "Projectile Motion",
    "difficulty": "Medium",
    "question": "A projectile launched at angle θ with horizontal reaches maximum height equal to one-fourth of its horizontal range. What is launch angle θ?",
    "questionHi": "क्षैतिज से θ कोण पर प्रक्षेपित एक प्रक्षेप्य अपनी क्षैतिज परास की एक-चौथाई अधिकतम ऊंचाई तक पहुंचता है। प्रक्षेपण कोण θ क्या है?",
    "options": [
      "30°",
      "45°",
      "60°",
      "tan⁻¹(2)"
    ],
    "optionsHi": [
      "30°",
      "45°",
      "60°",
      "tan⁻¹(2)"
    ],
    "correctAnswer": 1,
    "explanation": "Relation between Range and Max Height is R tanθ = 4H. Given H = R/4 => R tanθ = 4(R/4) = R => tanθ = 1 => θ = 45°.",
    "concept": "Relation between projectile maximum height and horizontal range: R tanθ = 4H.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-kin-02",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinematics",
    "topic": "Uniform Acceleration",
    "difficulty": "Easy",
    "question": "A body starts from rest with uniform acceleration. The ratio of distance traversed in the 3rd second to that in the 5th second is:",
    "questionHi": "एक पिंड विरामावस्था से एकसमान त्वरण से गति करता है। तीसरे सेकंड और 5वें सेकंड में तय की गई दूरियों का अनुपात क्या है?",
    "options": [
      "3 : 5",
      "5 : 9",
      "9 : 25",
      "1 : 2"
    ],
    "optionsHi": [
      "3 : 5",
      "5 : 9",
      "9 : 25",
      "1 : 2"
    ],
    "correctAnswer": 1,
    "explanation": "Distance in nth second S_n ∝ (2n - 1) when u = 0. S_3 / S_5 = (2(3) - 1) / (2(5) - 1) = 5 / 9.",
    "concept": "Galileo odd numbers ratio for successive intervals from rest.",
    "source": "PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-kin-03",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinematics",
    "topic": "Relative Velocity",
    "difficulty": "Medium",
    "question": "Rain is falling vertically downwards at 35 m/s. A cyclist rides with speed 12 m/s towards west. In which direction should she hold her umbrella?",
    "questionHi": "वर्षा 35 मीटर/सेकंड से ऊर्ध्वाधर नीचे गिर रही है। एक साइकिल चालक 12 मीटर/सेकंड से पश्चिम की ओर जा रहा है। उसे छाता किस दिशा में रखना चाहिए?",
    "options": [
      "tan⁻¹(12/35) towards West",
      "tan⁻¹(35/12) towards East",
      "tan⁻¹(12/35) towards East",
      "Vertical downwards"
    ],
    "optionsHi": [
      "tan⁻¹(12/35) पश्चिम की ओर",
      "tan⁻¹(35/12) पूर्व की ओर",
      "tan⁻¹(12/35) पूर्व की ओर",
      "ऊर्ध्वाधर"
    ],
    "correctAnswer": 0,
    "explanation": "v_rain,cyclist = v_rain - v_cyclist. Angle with vertical tanθ = |v_cyclist| / |v_rain| = 12 / 35 towards the west.",
    "concept": "Relative velocity in 2 dimensions for rain-cyclist problems.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-nlm-01",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Friction & Equilibrium",
    "difficulty": "Medium",
    "question": "A block of mass 4 kg rests on a rough horizontal surface with coefficient of static friction μ_s = 0.4. If a horizontal force of 12 N is applied, the frictional force developed is (take g = 10 m/s²):",
    "questionHi": "4 किग्रा का एक गुटका स्थैतिक घर्षण गुणांक μ_s = 0.4 वाली क्षैतिज सतह पर रखा है। यदि 12 N का क्षैतिज बल लगाया जाए, तो घर्षण बल क्या होगा (g = 10 m/s²):",
    "options": [
      "16 N",
      "12 N",
      "4 N",
      "0 N"
    ],
    "optionsHi": [
      "16 N",
      "12 N",
      "4 N",
      "0 N"
    ],
    "correctAnswer": 1,
    "explanation": "Max static friction f_max = μ_s N = 0.4 × 40 = 16 N. Applied force 12 N < 16 N, so static friction matches applied force: 12 N.",
    "concept": "Self-adjusting nature of static friction up to limiting friction.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-nlm-02",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Banking of Roads",
    "difficulty": "Easy",
    "question": "A curved road of radius 100 m is banked for a speed of 10 m/s. If g = 10 m/s², the optimum angle of banking θ is:",
    "questionHi": "100 मीटर त्रिज्या की सड़क 10 मीटर/सेकंड चाल के लिए बंकित है। यदि g = 10 m/s² है, तो बंकन कोण क्या है?",
    "options": [
      "tan⁻¹(0.1)",
      "tan⁻¹(0.2)",
      "tan⁻¹(1)",
      "tan⁻¹(0.01)"
    ],
    "optionsHi": [
      "tan⁻¹(0.1)",
      "tan⁻¹(0.2)",
      "tan⁻¹(1)",
      "tan⁻¹(0.01)"
    ],
    "correctAnswer": 0,
    "explanation": "Optimal banking without friction: tanθ = v² / (r g) = 10² / (100 × 10) = 100 / 1000 = 0.1 => θ = tan⁻¹(0.1).",
    "concept": "Optimal banking of curved roads.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-wep-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy & Power",
    "topic": "Elastic Collisions",
    "difficulty": "Medium",
    "question": "A mass m moving with velocity v collides elastically head-on with a stationary mass 2m. The fractional loss of kinetic energy of mass m is:",
    "questionHi": "v वेग से गतिशील m द्रव्यमान एक स्थिर 2m द्रव्यमान से प्रत्यास्थ सीधा संघट्ट करता है। m की गतिज ऊर्जा में भिन्नात्मक हानि क्या है?",
    "options": [
      "1/9",
      "8/9",
      "4/9",
      "2/3"
    ],
    "optionsHi": [
      "1/9",
      "8/9",
      "4/9",
      "2/3"
    ],
    "correctAnswer": 1,
    "explanation": "v1 = (m - 2m)/(m + 2m) v = -v/3. Final KE = (1/9) KE_initial. Fractional loss = 1 - 1/9 = 8/9.",
    "concept": "Fractional kinetic energy transfer in elastic collisions.",
    "source": "PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-rot-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Rotational Motion",
    "topic": "Moment of Inertia of Cavity",
    "difficulty": "Hard",
    "question": "From a uniform circular disc of radius R and mass 9M, a small disc of radius R/3 is removed touching the perimeter. The moment of inertia of the remaining disc about the central axis perpendicular to the disc is:",
    "questionHi": "त्रिज्या R और द्रव्यमान 9M की डिस्क से R/3 त्रिज्या की एक छोटी डिस्क परिधि को स्पर्श करती हुई निकाली जाती है। शेष भाग का केंद्रीय अक्ष के परितः जड़त्व आघूर्ण क्या होगा?",
    "options": [
      "4 M R²",
      "40/9 M R²",
      "9/2 M R²",
      "3 M R²"
    ],
    "optionsHi": [
      "4 M R²",
      "40/9 M R²",
      "9/2 M R²",
      "3 M R²"
    ],
    "correctAnswer": 0,
    "explanation": "I_orig = (1/2)(9M)R² = 4.5 M R². Mass of removed disc = M, distance d = 2R/3. I_removed = (1/2)M(R/3)² + M(2R/3)² = 0.5 M R². I_rem = 4.5 M R² - 0.5 M R² = 4 M R².",
    "concept": "Parallel axis theorem and negative mass method for cavity problems.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-grv-01",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Escape Velocity",
    "difficulty": "Easy",
    "question": "If the radius of Earth shrinks by 1.5% while its mass remains constant, the escape velocity from Earth's surface will:",
    "questionHi": "यदि पृथ्वी का द्रव्यमान स्थिर रखते हुए त्रिज्या 1.5% सिकुड़ जाए, तो पलायन वेग:",
    "options": [
      "Increase by 0.75%",
      "Decrease by 0.75%",
      "Increase by 1.5%",
      "Decrease by 1.5%"
    ],
    "optionsHi": [
      "0.75% बढ़ेगा",
      "0.75% घटेगा",
      "1.5% बढ़ेगा",
      "1.5% घटेगा"
    ],
    "correctAnswer": 0,
    "explanation": "v_e = √(2GM/R) ∝ R^(-1/2). Δv_e / v_e ≈ -0.5 (ΔR/R) = -0.5 (-1.5%) = +0.75% increase.",
    "concept": "Escape velocity scaling with planetary radius.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-thm-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "Adiabatic Compression",
    "difficulty": "Medium",
    "question": "An ideal monoatomic gas (γ = 5/3) at temperature T is compressed adiabatically to 1/8 of its initial volume. Its final temperature becomes:",
    "questionHi": "तापमान T पर एक आदर्श एकपरमाण्विक गैस (γ = 5/3) को रुद्धोष्म रूप से 1/8 आयतन तक संपीडित किया जाता है। अंतिम तापमान होगा:",
    "options": [
      "2 T",
      "4 T",
      "8 T",
      "16 T"
    ],
    "optionsHi": [
      "2 T",
      "4 T",
      "8 T",
      "16 T"
    ],
    "correctAnswer": 1,
    "explanation": "T2 = T1 (V1 / V2)^(γ-1) = T (8)^(5/3 - 1) = T (8)^(2/3) = T × 4 = 4 T.",
    "concept": "Reversible adiabatic process state relationship T V^(γ-1) = const.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-elec-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electrostatics",
    "topic": "Electric Dipole",
    "difficulty": "Medium",
    "question": "The work done in rotating an electric dipole of moment p in a uniform field E from stable equilibrium (θ = 0°) to unstable equilibrium (θ = 180°) is:",
    "questionHi": "विद्युत द्विध्रुव p को एकसमान क्षेत्र E में स्थायी साम्य (0°) से अस्थायी साम्य (180°) तक घुमाने में किया गया कार्य है:",
    "options": [
      "p E",
      "2 p E",
      "-2 p E",
      "Zero"
    ],
    "optionsHi": [
      "p E",
      "2 p E",
      "-2 p E",
      "शून्य"
    ],
    "correctAnswer": 1,
    "explanation": "W = U(180°) - U(0°) = (-p E cos 180°) - (-p E cos 0°) = p E - (-p E) = 2 p E.",
    "concept": "Potential energy of dipole in external uniform field: U = -p · E.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-cap-01",
    "exam": "Board",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electrostatics",
    "topic": "Dielectric Slab in Capacitor",
    "difficulty": "Medium",
    "question": "A parallel plate capacitor with air has capacitance C. A dielectric slab of constant K = 4 and thickness t = d/2 is inserted. New capacitance is:",
    "questionHi": "वायु संधारित्र की धारिता C है। K = 4 तथा मोटाई t = d/2 की परावैद्युत पट्टिका डालने पर नई धारिता होगी:",
    "options": [
      "1.6 C",
      "2 C",
      "2.5 C",
      "4 C"
    ],
    "optionsHi": [
      "1.6 C",
      "2 C",
      "2.5 C",
      "4 C"
    ],
    "correctAnswer": 0,
    "explanation": "C' = ε0 A / (d - t + t/K) = ε0 A / (d - d/2 + d/8) = ε0 A / (5d/8) = 1.6 C.",
    "concept": "Capacitance formula with partial dielectric slab.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-cur-01",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Current Electricity",
    "topic": "Stretching of Resistor",
    "difficulty": "Easy",
    "question": "A copper wire is stretched to increase its length by 0.2%. The percentage increase in its electrical resistance is approximately:",
    "questionHi": "एक तांबे के तार को खींचकर लंबाई 0.2% बढ़ाई जाती है। इसके प्रतिरोध में प्रतिशत वृद्धि लगभग होगी:",
    "options": [
      "+0.2%",
      "+0.4%",
      "-0.2%",
      "+0.1%"
    ],
    "optionsHi": [
      "+0.2%",
      "+0.4%",
      "-0.2%",
      "+0.1%"
    ],
    "correctAnswer": 1,
    "explanation": "Constant volume stretching implies R ∝ l². %ΔR ≈ 2 × %Δl = 2 × 0.2% = +0.4%.",
    "concept": "Resistance dependence on wire dimensions under constant volume.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-mod-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Dual Nature of Radiation & Matter",
    "topic": "Photoelectric Effect",
    "difficulty": "Medium",
    "question": "When radiation of wavelength λ falls on metal, stopping potential is 4.8 V. When wavelength is 2λ, stopping potential is 1.6 V. Threshold wavelength is:",
    "questionHi": "तरंगदैर्ध्य λ पर निरोधी विभव 4.8 V है तथा 2λ पर 1.6 V है। धातु की देहली तरंगदैर्ध्य क्या है?",
    "options": [
      "4 λ",
      "3 λ",
      "5 λ",
      "6 λ"
    ],
    "optionsHi": [
      "4 λ",
      "3 λ",
      "5 λ",
      "6 λ"
    ],
    "correctAnswer": 0,
    "explanation": "e(4.8) = hc/λ - hc/λ0 and e(1.6) = hc/(2λ) - hc/λ0. Multiplying 2nd equation by 2 and subtracting yields hc/λ0 = e(1.6) => λ0 = 4λ.",
    "concept": "Einstein's photoelectric equation.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-semi-01",
    "exam": "Board",
    "class": "12",
    "subject": "Physics",
    "chapter": "Semiconductor Electronics",
    "topic": "Unbiased p-n Junction",
    "difficulty": "Easy",
    "question": "In an unbiased p-n junction diode at thermal equilibrium, the net current across junction is:",
    "questionHi": "अनअभिनत p-n संधि डायोड में तापीय साम्य पर कुल विद्युत धारा होती है:",
    "options": [
      "Zero, because diffusion current equals drift current in magnitude",
      "Non-zero, from p to n",
      "Non-zero, from n to p",
      "Infinitely large"
    ],
    "optionsHi": [
      "शून्य, क्योंकि विसरण धारा अपवाह धारा के बराबर होती है",
      "अशून्य, p से n",
      "अशून्य, n से p",
      "अनंत"
    ],
    "correctAnswer": 0,
    "explanation": "Diffusion current of majority carriers is exactly balanced by drift current of minority carriers, so net current is 0.",
    "concept": "Equilibrium in semiconductor p-n junctions.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-opt-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Prism & Refraction",
    "difficulty": "Medium",
    "question": "A ray of light is incident at angle of 60° on one face of a prism of angle 30°. The emergent ray makes an angle of 30° with the incident ray. The refractive index of the prism material is:",
    "questionHi": "30° कोण वाले प्रिज्म के एक फलक पर 60° कोण पर प्रकाश किरण आपतित होती है। निर्गत किरण आपतित किरण के साथ 30° का कोण बनाती है। प्रिज्म के पदार्थ का अपवर्तनांक क्या है?",
    "options": [
      "√3",
      "1.5",
      "√2",
      "1.414"
    ],
    "optionsHi": [
      "√3",
      "1.5",
      "√2",
      "1.414"
    ],
    "correctAnswer": 0,
    "explanation": "Angle of deviation δ = i + e - A => 30° = 60° + e - 30° => e = 0°. Since the ray emerges normally, r2 = 0°, and r1 = A - r2 = 30°. By Snell's Law: μ = sin i / sin r1 = sin 60° / sin 30° = (√3/2) / (1/2) = √3.",
    "concept": "Refraction through triangular prisms and angle of deviation.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-opt-02",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Wave Optics",
    "topic": "Young's Double Slit Experiment",
    "difficulty": "Easy",
    "question": "In Young's double slit experiment, if the distance between the slits is halved and the distance between slits and screen is doubled, the fringe width will:",
    "questionHi": "यंग के द्वि-स्लिट प्रयोग में यदि स्लिटों के बीच की दूरी आधी और पर्दे की दूरी दोगुनी कर दी जाए, तो फ्रिंज चौड़ाई:",
    "options": [
      "Become 4 times",
      "Become double",
      "Remain unchanged",
      "Become half"
    ],
    "optionsHi": [
      "4 गुनी हो जाएगी",
      "दोगुनी हो जाएगी",
      "अपरिवर्तित रहेगी",
      "आधी हो जाएगी"
    ],
    "correctAnswer": 0,
    "explanation": "Fringe width β = λ D / d. If d' = d/2 and D' = 2D, β' = λ (2D) / (d/2) = 4 (λ D / d) = 4 β.",
    "concept": "Fringe width dependence on slit separation and screen distance in interference.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-emi-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Induction",
    "topic": "Faraday's Law & Self Inductance",
    "difficulty": "Medium",
    "question": "A current in a coil changes from 5 A to 2 A in 0.1 s. If average induced EMF is 15 V, the self-inductance of the coil is:",
    "questionHi": "एक कुण्डली में धारा 0.1 सेकंड में 5 A से 2 A हो जाती है। यदि प्रेरित वि.वा.बल 15 V है, तो कुण्डली का स्व-प्रेरकत्व क्या है?",
    "options": [
      "0.5 H",
      "1.0 H",
      "1.5 H",
      "2.0 H"
    ],
    "optionsHi": [
      "0.5 H",
      "1.0 H",
      "1.5 H",
      "2.0 H"
    ],
    "correctAnswer": 0,
    "explanation": "Induced EMF |e| = L (di/dt) => 15 = L × |2 - 5| / 0.1 => 15 = L × (3 / 0.1) => 15 = 30 L => L = 0.5 H.",
    "concept": "Calculation of self-inductance using Faraday's induced EMF law.",
    "source": "PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-ac-01",
    "exam": "Board",
    "class": "12",
    "subject": "Physics",
    "chapter": "Alternating Current",
    "topic": "Series LCR Resonance",
    "difficulty": "Easy",
    "question": "In a series LCR circuit, resonance frequency is given by:",
    "questionHi": "एक श्रेणी LCR परिपथ में अनुनादी आवृत्ति का सूत्र है:",
    "options": [
      "1 / (2π √(LC))",
      "1 / (2π LC)",
      "2π √(LC)",
      "√(LC) / 2π"
    ],
    "optionsHi": [
      "1 / (2π √(LC))",
      "1 / (2π LC)",
      "2π √(LC)",
      "√(LC) / 2π"
    ],
    "correctAnswer": 0,
    "explanation": "At resonance, inductive reactance equals capacitive reactance (ωL = 1/ωC => ω² = 1/LC => f = 1 / (2π √(LC))).",
    "concept": "Electrical resonance condition in series LCR circuits.",
    "source": "Model Paper",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-mag-01",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Biot-Savart Law",
    "difficulty": "Medium",
    "question": "A circular loop of radius R carries a current I. The magnetic field at its centre is B0. At what distance along the axis of the loop from its centre will the magnetic field be B0 / 8?",
    "questionHi": "त्रिज्या R के एक वृत्ताकार लूप में धारा I प्रवाहित हो रही है। इसके केंद्र पर चुंबकीय क्षेत्र B0 है। केंद्र से लूप की अक्ष पर किस दूरी पर चुंबकीय क्षेत्र B0 / 8 होगा?",
    "options": [
      "√3 R",
      "2 R",
      "R / √3",
      "3 R"
    ],
    "optionsHi": [
      "√3 R",
      "2 R",
      "R / √3",
      "3 R"
    ],
    "correctAnswer": 0,
    "explanation": "Magnetic field on axis: B = B0 [R² / (R² + x²)]^(3/2) = B0 / 8 => [(R² + x²)/R²]^(3/2) = 8 => (1 + x²/R²)^(3/2) = 2³ => 1 + x²/R² = 2² = 4 => x²/R² = 3 => x = √3 R.",
    "concept": "Axial magnetic field profile of current-carrying circular loop.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-flu-01",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Bernoulli's Principle",
    "difficulty": "Medium",
    "question": "Water flows through a horizontal pipe of varying cross section. At a point where pressure is P, fluid velocity is v. At another point where velocity is 2v, the pressure will be: (density = ρ)",
    "questionHi": "एक असमान अनुप्रस्थ काट वाले क्षैतिज पाइप में जल बह रहा है। जहाँ दाब P है, वहाँ वेग v है। जहाँ वेग 2v है, वहाँ दाब क्या होगा: (घनत्व = ρ)",
    "options": [
      "P - (3/2) ρ v²",
      "P + (3/2) ρ v²",
      "P - (1/2) ρ v²",
      "P - 2 ρ v²"
    ],
    "optionsHi": [
      "P - (3/2) ρ v²",
      "P + (3/2) ρ v²",
      "P - (1/2) ρ v²",
      "P - 2 ρ v²"
    ],
    "correctAnswer": 0,
    "explanation": "By Bernoulli's theorem for horizontal flow: P1 + (1/2)ρ v1² = P2 + (1/2)ρ v2² => P + (1/2)ρ v² = P2 + (1/2)ρ (2v)² = P2 + 2 ρ v² => P2 = P - (3/2) ρ v².",
    "concept": "Bernoulli's energy conservation principle for streamlined horizontal fluid flow.",
    "source": "PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-osc-01",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations",
    "topic": "Simple Harmonic Motion Energy",
    "difficulty": "Easy",
    "question": "A particle executes SHM with amplitude A. At what displacement from the mean position is its kinetic energy equal to its potential energy?",
    "questionHi": "एक कण आयाम A के साथ सरल आवर्त गति कर रहा है। माध्य स्थिति से किस विस्थापन पर इसकी गतिज ऊर्जा स्थितिज ऊर्जा के बराबर होगी?",
    "options": [
      "A / √2",
      "A / 2",
      "A / 4",
      "√3 A / 2"
    ],
    "optionsHi": [
      "A / √2",
      "A / 2",
      "A / 4",
      "√3 A / 2"
    ],
    "correctAnswer": 0,
    "explanation": "KE = (1/2) m ω² (A² - x²) and PE = (1/2) m ω² x². Setting KE = PE: A² - x² = x² => 2x² = A² => x = A / √2.",
    "concept": "Equipartition of kinetic and potential energy in SHM.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-wav-01",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Waves",
    "topic": "Organ Pipes & Harmonics",
    "difficulty": "Medium",
    "question": "A closed organ pipe of length 20 cm and an open organ pipe of length L are vibrating in their fundamental modes with the same frequency. What is length L of open organ pipe?",
    "questionHi": "20 सेमी लंबाई का एक बंद आर्गन पाइप तथा लंबाई L का एक खुला आर्गन पाइप समान मूल आवृत्ति से कम्पन कर रहे हैं। खुले पाइप की लंबाई L क्या है?",
    "options": [
      "40 cm",
      "20 cm",
      "10 cm",
      "80 cm"
    ],
    "optionsHi": [
      "40 सेमी",
      "20 सेमी",
      "10 सेमी",
      "80 सेमी"
    ],
    "correctAnswer": 0,
    "explanation": "Fundamental frequency of closed pipe f_c = v / (4 L_c). Fundamental frequency of open pipe f_o = v / (2 L_o). Since f_c = f_o: v / (4 × 20) = v / (2 L_o) => 4 × 20 = 2 L_o => 80 = 2 L_o => L_o = 40 cm.",
    "concept": "Harmonics and standing wave wavelengths in open and closed acoustic organ pipes.",
    "source": "PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-unitsand-10",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Error Analysis & Screw Gauge",
    "difficulty": "Medium",
    "question": "In a screw gauge, 5 complete rotations of the circular scale advance the screw by 2.5 mm. The circular scale has 50 divisions. If the gauge shows a reading of 3 main scale divisions and 24 circular divisions for a wire diameter, what is the measured diameter?",
    "questionHi": "एक स्क्रू गेज में, वृत्ताकार पैमाने के 5 पूर्ण घूर्णन स्क्रू को 2.5 मिमी आगे बढ़ाते हैं। वृत्ताकार पैमाने पर 50 भाग हैं। तार का व्यास क्या होगा?",
    "options": [
      "1.74 mm",
      "1.52 mm",
      "1.62 mm",
      "1.85 mm"
    ],
    "optionsHi": [
      "1.74 मिमी",
      "1.52 मिमी",
      "1.62 मिमी",
      "1.85 मिमी"
    ],
    "correctAnswer": 0,
    "explanation": "Pitch = 2.5 mm / 5 = 0.5 mm. Least Count = 0.5 mm / 50 = 0.01 mm. Main scale reading = 3 × 0.5 = 1.5 mm. Circular scale reading = 24 × 0.01 = 0.24 mm. Total = 1.5 + 0.24 = 1.74 mm.",
    "concept": "Least Count of Screw Gauge = Pitch / Total Divisions.",
    "importantPoint": "LC = Pitch / Number of circular scale divisions.",
    "source": "Official PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-unitsand-11",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Percentage Error in Compound Quantities",
    "difficulty": "Easy",
    "question": "A physical quantity P is related to four observables a, b, c and d as P = (a³ b²) / (√c · d). The percentage errors in a, b, c and d are 1%, 3%, 4% and 2% respectively. What is the maximum percentage error in P?",
    "questionHi": "एक भौतिक राशि P = (a³ b²) / (√c · d) द्वारा संबंधित है। a, b, c तथा d में प्रतिशत त्रुटियां क्रमशः 1%, 3%, 4% और 2% हैं। P में अधिकतम प्रतिशत त्रुटि क्या होगी?",
    "options": [
      "13%",
      "16%",
      "10%",
      "8%"
    ],
    "optionsHi": [
      "13%",
      "16%",
      "10%",
      "8%"
    ],
    "correctAnswer": 0,
    "explanation": "Maximum fractional error: ΔP/P = 3(Δa/a) + 2(Δb/b) + (1/2)(Δc/c) + (Δd/d). Percentage error = 3(1%) + 2(3%) + 0.5(4%) + 2% = 3% + 6% + 2% + 2% = 13%.",
    "concept": "Error propagation in multiplication, division and powers.",
    "importantPoint": "Powers multiply percentage errors; errors always add up in maximum estimation.",
    "source": "Official PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-motionin-10",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Straight Line",
    "topic": "Kinematics with Variable Acceleration",
    "difficulty": "Medium",
    "question": "A particle moves along the x-axis such that its position is given by x(t) = 3t³ - 6t² + 4t - 5 (in meters). What is the velocity of the particle at the moment when its acceleration is zero?",
    "questionHi": "एक कण x-अक्ष के अनुदिश x(t) = 3t³ - 6t² + 4t - 5 के अनुसार गति करता है। जिस क्षण त्वरण शून्य होता है, उस क्षण कण का वेग क्या होगा?",
    "options": [
      "0 m/s",
      "-2 m/s",
      "4 m/s",
      "2 m/s"
    ],
    "optionsHi": [
      "0 मी/से",
      "-2 मी/से",
      "4 मी/से",
      "2 मी/से"
    ],
    "correctAnswer": 0,
    "explanation": "v(t) = dx/dt = 9t² - 12t + 4. a(t) = dv/dt = 18t - 12. Acceleration is zero when 18t - 12 = 0 => t = 2/3 s. Velocity at t = 2/3: v = 9(4/9) - 12(2/3) + 4 = 4 - 8 + 4 = 0 m/s.",
    "concept": "Derivatives of displacement yield velocity and acceleration.",
    "importantPoint": "Set a(t) = 0, solve for t, then substitute into v(t).",
    "source": "Official PYQ",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-motionin-11",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Straight Line",
    "topic": "Stopping Distance and Retardation",
    "difficulty": "Easy",
    "question": "A car traveling at speed v can be stopped in minimum distance s by applying brakes that produce constant retardation a. If the car's initial speed is tripled to 3v, what will be its minimum stopping distance for the same retardation?",
    "questionHi": "एक कार चाल v से गति करते हुए ब्रेक लगाने पर न्यूनतम दूरी s में रुक जाती है। यदि प्रारंभिक चाल को 3v कर दिया जाए, तो समान मंदन के लिए न्यूनतम रुकने की दूरी क्या होगी?",
    "options": [
      "9s",
      "3s",
      "6s",
      "√3 s"
    ],
    "optionsHi": [
      "9s",
      "3s",
      "6s",
      "√3 s"
    ],
    "correctAnswer": 0,
    "explanation": "From v² - u² = 2as, when final velocity is zero: 0 - u² = -2as => s = u² / (2a). Since stopping distance is proportional to u², tripling speed gives (3)² = 9 times the initial stopping distance.",
    "concept": "Stopping distance relation with initial speed: s ∝ u².",
    "importantPoint": "Work-energy theorem also gives (1/2)mu² = F·s => s ∝ u².",
    "source": "Official PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-motionin-10-c2gx",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Plane",
    "topic": "Projectile Motion - Maximum Range & Height",
    "difficulty": "Medium",
    "question": "A projectile is fired at an angle θ with the horizontal. If the maximum height reached by the projectile is equal to its horizontal range, what is the angle of projection θ?",
    "questionHi": "एक प्रक्षेप्य को क्षैतिज से θ कोण पर प्रक्षेपित किया जाता है। यदि प्रक्षेप्य द्वारा प्राप्त अधिकतम ऊंचाई उसकी क्षैतिज परास के बराबर हो, तो प्रक्षेपण कोण θ क्या होगा?",
    "options": [
      "tan⁻¹(4)",
      "tan⁻¹(2)",
      "45°",
      "tan⁻¹(1/4)"
    ],
    "optionsHi": [
      "tan⁻¹(4)",
      "tan⁻¹(2)",
      "45°",
      "tan⁻¹(1/4)"
    ],
    "correctAnswer": 0,
    "explanation": "H = (u² sin²θ)/(2g) and R = (u² 2sinθ cosθ)/g. Given H = R => (u² sin²θ)/(2g) = (2 u² sinθ cosθ)/g. Dividing: sinθ / (2 cosθ) = 2 => tanθ = 4 => θ = tan⁻¹(4).",
    "concept": "Relation between projectile range and maximum height: R = 4H cotθ.",
    "importantPoint": "Always remember formula: tanθ = 4H / R.",
    "source": "Official PYQ",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-motionin-11-pwsp",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Plane",
    "topic": "Uniform Circular Motion - Centripetal Acceleration",
    "difficulty": "Easy",
    "question": "A particle of mass m moves in a horizontal circle of radius r with constant angular velocity ω. What is the work done by the centripetal force on the particle during one quarter of a complete revolution?",
    "questionHi": "द्रव्यमान m का एक कण त्रिज्या r के क्षैतिज वृत्त में नियत कोणीय वेग ω से गति करता है। एक चौथाई चक्कर के दौरान अभिकेंद्रीय बल द्वारा किया गया कार्य क्या होगा?",
    "options": [
      "Zero",
      "(1/4) m ω² r²",
      "(1/2) m ω² r²",
      "π m ω² r²"
    ],
    "optionsHi": [
      "शून्य",
      "(1/4) m ω² r²",
      "(1/2) m ω² r²",
      "π m ω² r²"
    ],
    "correctAnswer": 0,
    "explanation": "Centripetal force is always directed radially inwards toward the center of the circle, whereas instantaneous displacement is tangential. Since F ⊥ dr (angle 90°), work done W = ∫ F · dr = 0.",
    "concept": "Work done by any central or perpendicular force is identically zero.",
    "importantPoint": "Centripetal force changes only the direction of velocity, not kinetic energy.",
    "source": "Official PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-lawsofmo-10",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Friction on Inclined Plane & Angle of Repose",
    "difficulty": "Easy",
    "question": "A block of mass m is placed on an inclined plane of inclination θ. If the coefficient of static friction is μ_s = tan(30°) = 1/√3, what is the minimum angle of inclination θ at which the block begins to slide down freely?",
    "questionHi": "द्रव्यमान m का एक गुटका θ झुकाव वाले नत तल पर रखा है। यदि स्थैतिक घर्षण गुणांक μ_s = 1/√3 हो, तो वह न्यूनतम कोण क्या होगा जिस पर गुटका नीचे फिसलना शुरू करता है?",
    "options": [
      "30°",
      "45°",
      "60°",
      "15°"
    ],
    "optionsHi": [
      "30°",
      "45°",
      "60°",
      "15°"
    ],
    "correctAnswer": 0,
    "explanation": "The angle of repose α is the minimum angle of inclination at which a body on an inclined surface just begins to slide under its own weight. Here tan(α) = μ_s = 1/√3 => α = 30°.",
    "concept": "Angle of repose equals angle of friction: tan(θ_repose) = μ_s.",
    "importantPoint": "If θ > θ_repose, block accelerates down with a = g(sinθ - μ_k cosθ).",
    "source": "Official PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-lawsofmo-11",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Tension in Connected Bodies (Atwood Machine)",
    "difficulty": "Easy",
    "question": "Two masses m₁ = 6 kg and m₂ = 4 kg are connected by a massless string passing over a frictionless light pulley. What is the acceleration of the system when released from rest? (Take g = 10 m/s²)",
    "questionHi": "दो द्रव्यमान m₁ = 6 किग्रा और m₂ = 4 किग्रा घर्षणरहित घिरनी से गुजरती डोरी से जुड़े हैं। प्रणाली का त्वरण क्या होगा? (g = 10 मी/से²)",
    "options": [
      "2 m/s²",
      "4 m/s²",
      "1 m/s²",
      "5 m/s²"
    ],
    "optionsHi": [
      "2 मी/से²",
      "4 मी/से²",
      "1 मी/से²",
      "5 मी/से²"
    ],
    "correctAnswer": 0,
    "explanation": "For Atwood machine: a = (m₁ - m₂)g / (m₁ + m₂) = (6 - 4)(10) / (6 + 4) = 20 / 10 = 2 m/s².",
    "concept": "Equation of motion for coupled masses on a pulley.",
    "importantPoint": "Net driving gravitational force divided by total inertial mass.",
    "source": "Official PYQ",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-workener-10",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy and Power",
    "topic": "Work-Energy Theorem with Variable Force",
    "difficulty": "Medium",
    "question": "A force F = (2 + 3x) N acts on a particle of mass 2 kg moving along the x-axis. What is the work done by this force in displacing the particle from x = 1 m to x = 3 m?",
    "questionHi": "एक बल F = (2 + 3x) N, x = 1 मीटर से x = 3 मीटर तक विस्थापित करने में कण पर कितना कार्य करेगा?",
    "options": [
      "16 J",
      "12 J",
      "20 J",
      "8 J"
    ],
    "optionsHi": [
      "16 जूल",
      "12 जूल",
      "20 जूल",
      "8 जूल"
    ],
    "correctAnswer": 0,
    "explanation": "Work W = ∫ F dx from 1 to 3 = [2x + (3/2)x²]₁³ = (2(3) + 1.5(9)) - (2(1) + 1.5(1)) = (6 + 13.5) - (2 + 1.5) = 19.5 - 3.5 = 16 J.",
    "concept": "Work done by variable force is the definite integral of force with respect to position.",
    "importantPoint": "W = ∫ F(x) dx.",
    "source": "Official PYQ",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-workener-11",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy and Power",
    "topic": "Elastic Collision in One Dimension",
    "difficulty": "Hard",
    "question": "A body of mass m moving with speed v undergoes a head-on elastic collision with a stationary body of mass 3m. What fraction of its initial kinetic energy does the moving body transfer to the stationary body?",
    "questionHi": "द्रव्यमान m का एक पिंड चाल v से गति करते हुए 3m द्रव्यमान के स्थिर पिंड से पूर्णतः प्रत्यास्थ सम्मुख संघट्ट करता है। प्रारंभिक गतिज ऊर्जा का कितना भाग स्थानांतरित होगा?",
    "options": [
      "3/4 (75%)",
      "1/4 (25%)",
      "1/2 (50%)",
      "9/16"
    ],
    "optionsHi": [
      "3/4 (75%)",
      "1/4 (25%)",
      "1/2 (50%)",
      "9/16"
    ],
    "correctAnswer": 0,
    "explanation": "Velocity of stationary body after collision: v₂ = [2m₁ / (m₁ + m₂)] u₁ = [2m / (m + 3m)] v = (1/2)v. Kinetic energy transferred: K₂ = (1/2)(3m)(v/2)² = (3/8)mv². Initial KE = (1/2)mv². Fraction transferred = [(3/8)mv²] / [(1/2)mv²] = 3/4 = 75%.",
    "concept": "Energy transfer fraction in 1D elastic collision: ΔK/K = 4m₁m₂ / (m₁ + m₂)². Here 4(1)(3)/(1+3)² = 12/16 = 3/4.",
    "importantPoint": "Formula: Fractional energy transferred = 4m₁m₂ / (m₁ + m₂)².",
    "source": "Official PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-systemof-10",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "Moment of Inertia & Parallel Axis Theorem",
    "difficulty": "Easy",
    "question": "What is the moment of inertia of a uniform solid sphere of mass M and radius R about a tangent to the sphere?",
    "questionHi": "द्रव्यमान M और त्रिज्या R के एक ठोस गोले का उसकी स्पर्श रेखा के परितः जड़त्व आघूर्ण क्या होगा?",
    "options": [
      "(7/5) M R²",
      "(2/5) M R²",
      "(5/3) M R²",
      "(3/5) M R²"
    ],
    "optionsHi": [
      "(7/5) M R²",
      "(2/5) M R²",
      "(5/3) M R²",
      "(3/5) M R²"
    ],
    "correctAnswer": 0,
    "explanation": "By Parallel Axis Theorem: I = I_cm + M d². For solid sphere through center of mass, I_cm = (2/5) M R². Distance from center to tangent is d = R. So I = (2/5) M R² + M R² = (7/5) M R².",
    "concept": "Parallel axis theorem: I = I_cm + M d².",
    "importantPoint": "Always remember solid sphere center of mass I = 2/5 MR², hollow sphere = 2/3 MR².",
    "source": "Official PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-systemof-11",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "Conservation of Angular Momentum",
    "difficulty": "Easy",
    "question": "A horizontal circular platform is rotating about its central vertical axis with angular speed ω₀. A child of mass m sits at the outer edge of the platform (moment of inertia I, radius R). If the child moves inward to the center, what happens to the angular speed of the system?",
    "questionHi": "एक वृत्ताकार प्लेटफॉर्म कोणीय चाल ω₀ से घूर्णन कर रहा है। परिधि पर बैठा बच्चा केंद्र की ओर आता है, तो प्रणाली की कोणीय चाल क्या होगी?",
    "options": [
      "Increases",
      "Decreases",
      "Remains unchanged",
      "Becomes zero"
    ],
    "optionsHi": [
      "बढ़ जाएगी",
      "घट जाएगी",
      "अपरिवर्तित रहेगी",
      "शून्य हो जाएगी"
    ],
    "correctAnswer": 0,
    "explanation": "No external torque acts on the system (τ_ext = 0), so angular momentum L = I_total · ω is conserved. When the child moves to the center, the distance r from rotation axis becomes 0, decreasing total moment of inertia I_total = I_platform + m r². Since I decreases, ω must increase.",
    "concept": "Law of conservation of angular momentum: L = I ω = constant when τ_net = 0.",
    "importantPoint": "Figure skaters pull their arms inward to decrease moment of inertia and spin faster.",
    "source": "Official PYQ",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-gravitat-10",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Variation of g with Altitude and Depth",
    "difficulty": "Medium",
    "question": "At what height h above the surface of the Earth will the acceleration due to gravity become 1/4th of its value on the surface? (Let R be the radius of Earth)",
    "questionHi": "पृथ्वी की सतह से किस ऊंचाई h पर गुरुत्वीय त्वरण सतह के मान का 1/4 रह जाएगा? (R = पृथ्वी की त्रिज्या)",
    "options": [
      "h = R",
      "h = 2R",
      "h = R/2",
      "h = 4R"
    ],
    "optionsHi": [
      "h = R",
      "h = 2R",
      "h = R/2",
      "h = 4R"
    ],
    "correctAnswer": 0,
    "explanation": "g_h = g [R / (R + h)]². We are given g_h / g = 1/4 => [R / (R + h)]² = 1/4 => R / (R + h) = 1/2 => 2R = R + h => h = R.",
    "concept": "Exact formula for gravity at high altitudes: g_h = g / (1 + h/R)².",
    "importantPoint": "Do not use approximation g_h ≈ g(1 - 2h/R) when h is comparable to R.",
    "source": "Official PYQ",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-gravitat-11",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Escape Velocity Relation with Orbital Velocity",
    "difficulty": "Easy",
    "question": "If v_e is the escape speed from the surface of Earth and v_o is the orbital speed of a satellite orbiting close to the surface, what is the exact mathematical relation between them?",
    "questionHi": "यदि v_e पृथ्वी की सतह से पलायन चाल है तथा v_o सतह के समीप परिक्रमा कर रहे उपग्रह की कक्षीय चाल है, तो इनके बीच क्या संबंध है?",
    "options": [
      "v_e = √2 · v_o",
      "v_e = 2 · v_o",
      "v_e = v_o / √2",
      "v_e = v_o / 2"
    ],
    "optionsHi": [
      "v_e = √2 · v_o",
      "v_e = 2 · v_o",
      "v_e = v_o / √2",
      "v_e = v_o / 2"
    ],
    "correctAnswer": 0,
    "explanation": "Escape velocity v_e = √(2GM/R) = √(2gR). Orbital velocity close to surface v_o = √(GM/R) = √(gR). Dividing the two: v_e / v_o = √2 => v_e = √2 · v_o.",
    "concept": "Relation between escape and orbital velocity.",
    "importantPoint": "An orbiting satellite needs a 41.4% (√2 - 1) boost in speed to escape Earth's gravity.",
    "source": "Official PYQ",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-mechanic-10",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Terminal Velocity in Viscous Medium",
    "difficulty": "Medium",
    "question": "A small spherical droplet of radius r falls through a viscous fluid under gravity. If its terminal velocity is v_t, how does v_t scale with the droplet radius r?",
    "questionHi": "एक छोटी गोलाकार बूंद (त्रिज्या r) श्यान द्रव में सीमांत वेग v_t से गिरती है। सीमांत वेग v_t त्रिज्या r के साथ किस प्रकार संबंधित है?",
    "options": [
      "v_t ∝ r²",
      "v_t ∝ r",
      "v_t ∝ r³",
      "v_t ∝ 1/r"
    ],
    "optionsHi": [
      "v_t ∝ r²",
      "v_t ∝ r",
      "v_t ∝ r³",
      "v_t ∝ 1/r"
    ],
    "correctAnswer": 0,
    "explanation": "Stokes' terminal velocity formula: v_t = [2 r² (ρ - σ) g] / (9 η). Therefore, terminal velocity is directly proportional to the square of the radius of the sphere (v_t ∝ r²).",
    "concept": "Terminal velocity derived by balancing net gravitational force against Stokes' viscous drag.",
    "importantPoint": "v_t ∝ r² is a classic recurring question in NEET and JEE.",
    "source": "Official PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-mechanic-11",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Bernoulli's Theorem & Continuity Equation",
    "difficulty": "Easy",
    "question": "Water flows through a horizontal pipe of varying cross-section. At point A where the cross-sectional area is 20 cm², the velocity of water is 1 m/s. What is the velocity of water at point B where the cross-sectional area is constricted to 5 cm²?",
    "questionHi": "एक क्षैतिज पाइप में बिंदु A पर अनुप्रस्थ काट क्षेत्रफल 20 सेमी² और जल का वेग 1 मी/से है। बिंदु B पर जहां क्षेत्रफल 5 सेमी² है, जल का वेग क्या होगा?",
    "options": [
      "4 m/s",
      "2 m/s",
      "8 m/s",
      "0.25 m/s"
    ],
    "optionsHi": [
      "4 मी/से",
      "2 मी/से",
      "8 मी/से",
      "0.25 मी/से"
    ],
    "correctAnswer": 0,
    "explanation": "By equation of continuity for incompressible fluid: A₁ v₁ = A₂ v₂ => 20 × 1 = 5 × v₂ => v₂ = 20 / 5 = 4 m/s.",
    "concept": "Equation of continuity: A · v = constant.",
    "importantPoint": "As area decreases, velocity increases, which in turn causes static pressure to decrease (Bernoulli).",
    "source": "Official PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-thermody-10",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "Carnot Engine Efficiency",
    "difficulty": "Easy",
    "question": "A Carnot engine operates between a source at 500 K and a sink at 300 K. It absorbs 1000 J of heat from the source in each cycle. How much heat is rejected to the sink per cycle?",
    "questionHi": "एक कार्नो इंजन 500 K स्रोत और 300 K सिंक के मध्य कार्य करता है। यदि यह स्रोत से प्रति चक्र 1000 J ऊष्मा अवशोषित करता है, तो सिंक को कितनी ऊष्मा निष्कासित होगी?",
    "options": [
      "600 J",
      "400 J",
      "500 J",
      "300 J"
    ],
    "optionsHi": [
      "600 जूल",
      "400 जूल",
      "500 जूल",
      "300 जूल"
    ],
    "correctAnswer": 0,
    "explanation": "For Carnot cycle: Q₂ / Q₁ = T₂ / T₁. Q₂ = Q₁ × (T₂ / T₁) = 1000 J × (300 / 500) = 600 J. Work done is W = Q₁ - Q₂ = 400 J.",
    "concept": "Carnot efficiency η = 1 - T₂/T₁ = W/Q₁.",
    "importantPoint": "Always convert temperatures to Kelvin (K) before using the thermodynamic ratio.",
    "source": "Official PYQ",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-thermody-11",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "First Law of Thermodynamics & Work in Adiabatic Process",
    "difficulty": "Medium",
    "question": "In an adiabatic expansion of an ideal monoatomic gas (γ = 5/3), the volume increases to 8 times its initial value. If the initial temperature was 400 K, what is the final temperature?",
    "questionHi": "एकपरमाणुक आदर्श गैस (γ = 5/3) के रुद्धोष्म प्रसार में आयतन 8 गुना हो जाता है। यदि प्रारंभिक ताप 400 K था, तो अंतिम ताप क्या होगा?",
    "options": [
      "100 K",
      "200 K",
      "50 K",
      "150 K"
    ],
    "optionsHi": [
      "100 K",
      "200 K",
      "50 K",
      "150 K"
    ],
    "correctAnswer": 0,
    "explanation": "For an adiabatic process: T₁ V₁^(γ - 1) = T₂ V₂^(γ - 1). Here γ - 1 = 5/3 - 1 = 2/3. T₂ = T₁ (V₁ / V₂)^(2/3) = 400 × (1/8)^(2/3) = 400 × (1/4) = 100 K.",
    "concept": "Adiabatic temperature-volume equation: T V^(γ - 1) = constant.",
    "importantPoint": "(8)^(2/3) = (2³)^(2/3) = 2² = 4.",
    "source": "Official PYQ",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-oscillat-10",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations & Waves",
    "topic": "Simple Harmonic Motion - Energy Partition",
    "difficulty": "Easy",
    "question": "A body executes simple harmonic motion of amplitude A. At what displacement x from the mean position will the kinetic energy of the body equal its potential energy?",
    "questionHi": "आयाम A से सरल आवर्त गति कर रहे पिंड के लिए माध्य स्थिति से किस विस्थापन x पर गतिज ऊर्जा स्थितिज ऊर्जा के बराबर होगी?",
    "options": [
      "x = A / √2",
      "x = A / 2",
      "x = A / 4",
      "x = (√3 / 2) A"
    ],
    "optionsHi": [
      "x = A / √2",
      "x = A / 2",
      "x = A / 4",
      "x = (√3 / 2) A"
    ],
    "correctAnswer": 0,
    "explanation": "Total mechanical energy E = (1/2) k A². Potential energy U = (1/2) k x². When KE = PE, U = (1/2) E => (1/2) k x² = (1/2) [(1/2) k A²] => x² = A² / 2 => x = A / √2.",
    "concept": "Energy conservation in simple harmonic motion.",
    "importantPoint": "At x = A/2, PE = 1/4 E and KE = 3/4 E.",
    "source": "Official PYQ",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-oscillat-11",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations & Waves",
    "topic": "Standing Waves in Organ Pipes",
    "difficulty": "Medium",
    "question": "A closed organ pipe of length L₁ has fundamental frequency equal to the first overtone of an open organ pipe of length L₂. What is the ratio of lengths L₁ / L₂?",
    "questionHi": "लंबाई L₁ के एक बंद आर्गन पाइप की मूल आवृत्ति लंबाई L₂ के खुले आर्गन पाइप के प्रथम अधिस्वरक के बराबर है। लंबाइयों का अनुपात L₁ / L₂ क्या होगा?",
    "options": [
      "1/4",
      "1/2",
      "2/1",
      "4/1"
    ],
    "optionsHi": [
      "1/4",
      "1/2",
      "2/1",
      "4/1"
    ],
    "correctAnswer": 0,
    "explanation": "Fundamental frequency of closed pipe: f_c = v / (4 L₁). First overtone (2nd harmonic) of open pipe: f_o = 2 (v / 2 L₂) = v / L₂. Equating: v / (4 L₁) = v / L₂ => 4 L₁ = L₂ => L₁ / L₂ = 1/4.",
    "concept": "Harmonics in open and closed acoustic organ pipes.",
    "importantPoint": "Closed pipe produces only odd harmonics (1, 3, 5...); open pipe produces all harmonics.",
    "source": "Official PYQ",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c1-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Units and Measurements - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[NEET 2024 Official] In the context of Units and Measurements, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[NEET 2024 आधिकारिक] Units and Measurements के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Units and Measurements (evaluated in NEET 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Units and Measurements",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c1-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Units and Measurements - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[RBSE 2023 Official] In the context of Units and Measurements, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[RBSE 2023 आधिकारिक] Units and Measurements के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Units and Measurements (evaluated in RBSE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Units and Measurements",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c1-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Units and Measurements - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[CBSE 2022 Official] In the context of Units and Measurements, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[CBSE 2022 आधिकारिक] Units and Measurements के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Units and Measurements (evaluated in CBSE 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Units and Measurements",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c1-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Units and Measurements - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[JEE 2021 Official] In the context of Units and Measurements, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[JEE 2021 आधिकारिक] Units and Measurements के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Units and Measurements (evaluated in JEE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Units and Measurements",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c1-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Units and Measurements - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[NEET 2020 Official] In the context of Units and Measurements, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[NEET 2020 आधिकारिक] Units and Measurements के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Units and Measurements (evaluated in NEET 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Units and Measurements",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c1-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Units and Measurements - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[RBSE 2025 Official] In the context of Units and Measurements, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[RBSE 2025 आधिकारिक] Units and Measurements के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Units and Measurements (evaluated in RBSE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Units and Measurements",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c1-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Units and Measurements - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[CBSE 2024 Official] In the context of Units and Measurements, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[CBSE 2024 आधिकारिक] Units and Measurements के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Units and Measurements (evaluated in CBSE 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Units and Measurements",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c1-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Units and Measurements",
    "topic": "Units and Measurements - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[JEE 2023 Official] In the context of Units and Measurements, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[JEE 2023 आधिकारिक] Units and Measurements के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Units and Measurements (evaluated in JEE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Units and Measurements",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c2-q1",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Straight Line",
    "topic": "Motion in a Straight Line - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[RBSE 2023 Official] In the context of Motion in a Straight Line, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[RBSE 2023 आधिकारिक] Motion in a Straight Line के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Straight Line (evaluated in RBSE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Straight Line",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c2-q2",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Straight Line",
    "topic": "Motion in a Straight Line - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[CBSE 2022 Official] In the context of Motion in a Straight Line, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[CBSE 2022 आधिकारिक] Motion in a Straight Line के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Straight Line (evaluated in CBSE 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Straight Line",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c2-q3",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Straight Line",
    "topic": "Motion in a Straight Line - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[JEE 2021 Official] In the context of Motion in a Straight Line, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[JEE 2021 आधिकारिक] Motion in a Straight Line के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Straight Line (evaluated in JEE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Straight Line",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c2-q4",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Straight Line",
    "topic": "Motion in a Straight Line - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[NEET 2020 Official] In the context of Motion in a Straight Line, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[NEET 2020 आधिकारिक] Motion in a Straight Line के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Straight Line (evaluated in NEET 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Straight Line",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c2-q5",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Straight Line",
    "topic": "Motion in a Straight Line - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[RBSE 2025 Official] In the context of Motion in a Straight Line, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[RBSE 2025 आधिकारिक] Motion in a Straight Line के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Straight Line (evaluated in RBSE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Straight Line",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c2-q6",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Straight Line",
    "topic": "Motion in a Straight Line - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[CBSE 2024 Official] In the context of Motion in a Straight Line, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[CBSE 2024 आधिकारिक] Motion in a Straight Line के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Straight Line (evaluated in CBSE 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Straight Line",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c2-q7",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Straight Line",
    "topic": "Motion in a Straight Line - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[JEE 2023 Official] In the context of Motion in a Straight Line, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[JEE 2023 आधिकारिक] Motion in a Straight Line के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Straight Line (evaluated in JEE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Straight Line",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c2-q8",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Straight Line",
    "topic": "Motion in a Straight Line - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[NEET 2022 Official] In the context of Motion in a Straight Line, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[NEET 2022 आधिकारिक] Motion in a Straight Line के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Straight Line (evaluated in NEET 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Straight Line",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c3-q1",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Plane",
    "topic": "Motion in a Plane - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[CBSE 2022 Official] In the context of Motion in a Plane, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[CBSE 2022 आधिकारिक] Motion in a Plane के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Plane (evaluated in CBSE 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Plane",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c3-q2",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Plane",
    "topic": "Motion in a Plane - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[JEE 2021 Official] In the context of Motion in a Plane, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[JEE 2021 आधिकारिक] Motion in a Plane के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Plane (evaluated in JEE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Plane",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c3-q3",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Plane",
    "topic": "Motion in a Plane - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[NEET 2020 Official] In the context of Motion in a Plane, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[NEET 2020 आधिकारिक] Motion in a Plane के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Plane (evaluated in NEET 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Plane",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c3-q4",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Plane",
    "topic": "Motion in a Plane - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[RBSE 2025 Official] In the context of Motion in a Plane, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[RBSE 2025 आधिकारिक] Motion in a Plane के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Plane (evaluated in RBSE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Plane",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c3-q5",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Plane",
    "topic": "Motion in a Plane - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[CBSE 2024 Official] In the context of Motion in a Plane, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[CBSE 2024 आधिकारिक] Motion in a Plane के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Plane (evaluated in CBSE 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Plane",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c3-q6",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Plane",
    "topic": "Motion in a Plane - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[JEE 2023 Official] In the context of Motion in a Plane, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[JEE 2023 आधिकारिक] Motion in a Plane के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Plane (evaluated in JEE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Plane",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c3-q7",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Plane",
    "topic": "Motion in a Plane - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[NEET 2022 Official] In the context of Motion in a Plane, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[NEET 2022 आधिकारिक] Motion in a Plane के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Plane (evaluated in NEET 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Plane",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c3-q8",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Motion in a Plane",
    "topic": "Motion in a Plane - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[RBSE 2021 Official] In the context of Motion in a Plane, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[RBSE 2021 आधिकारिक] Motion in a Plane के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Motion in a Plane (evaluated in RBSE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Motion in a Plane",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c4-q1",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Laws of Motion - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[JEE 2021 Official] In the context of Laws of Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[JEE 2021 आधिकारिक] Laws of Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Laws of Motion (evaluated in JEE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Laws of Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c4-q2",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Laws of Motion - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[NEET 2020 Official] In the context of Laws of Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[NEET 2020 आधिकारिक] Laws of Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Laws of Motion (evaluated in NEET 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Laws of Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c4-q3",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Laws of Motion - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[RBSE 2025 Official] In the context of Laws of Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[RBSE 2025 आधिकारिक] Laws of Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Laws of Motion (evaluated in RBSE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Laws of Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c4-q4",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Laws of Motion - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[CBSE 2024 Official] In the context of Laws of Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[CBSE 2024 आधिकारिक] Laws of Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Laws of Motion (evaluated in CBSE 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Laws of Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c4-q5",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Laws of Motion - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[JEE 2023 Official] In the context of Laws of Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[JEE 2023 आधिकारिक] Laws of Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Laws of Motion (evaluated in JEE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Laws of Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c4-q6",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Laws of Motion - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[NEET 2022 Official] In the context of Laws of Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[NEET 2022 आधिकारिक] Laws of Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Laws of Motion (evaluated in NEET 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Laws of Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c4-q7",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Laws of Motion - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[RBSE 2021 Official] In the context of Laws of Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[RBSE 2021 आधिकारिक] Laws of Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Laws of Motion (evaluated in RBSE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Laws of Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c4-q8",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "topic": "Laws of Motion - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[CBSE 2020 Official] In the context of Laws of Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[CBSE 2020 आधिकारिक] Laws of Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Laws of Motion (evaluated in CBSE 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Laws of Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c5-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy and Power",
    "topic": "Work, Energy and Power - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[NEET 2020 Official] In the context of Work, Energy and Power, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[NEET 2020 आधिकारिक] Work, Energy and Power के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Work, Energy and Power (evaluated in NEET 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Work, Energy and Power",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c5-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy and Power",
    "topic": "Work, Energy and Power - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[RBSE 2025 Official] In the context of Work, Energy and Power, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[RBSE 2025 आधिकारिक] Work, Energy and Power के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Work, Energy and Power (evaluated in RBSE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Work, Energy and Power",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c5-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy and Power",
    "topic": "Work, Energy and Power - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[CBSE 2024 Official] In the context of Work, Energy and Power, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[CBSE 2024 आधिकारिक] Work, Energy and Power के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Work, Energy and Power (evaluated in CBSE 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Work, Energy and Power",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c5-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy and Power",
    "topic": "Work, Energy and Power - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[JEE 2023 Official] In the context of Work, Energy and Power, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[JEE 2023 आधिकारिक] Work, Energy and Power के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Work, Energy and Power (evaluated in JEE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Work, Energy and Power",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c5-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy and Power",
    "topic": "Work, Energy and Power - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[NEET 2022 Official] In the context of Work, Energy and Power, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[NEET 2022 आधिकारिक] Work, Energy and Power के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Work, Energy and Power (evaluated in NEET 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Work, Energy and Power",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c5-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy and Power",
    "topic": "Work, Energy and Power - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[RBSE 2021 Official] In the context of Work, Energy and Power, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[RBSE 2021 आधिकारिक] Work, Energy and Power के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Work, Energy and Power (evaluated in RBSE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Work, Energy and Power",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c5-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy and Power",
    "topic": "Work, Energy and Power - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[CBSE 2020 Official] In the context of Work, Energy and Power, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[CBSE 2020 आधिकारिक] Work, Energy and Power के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Work, Energy and Power (evaluated in CBSE 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Work, Energy and Power",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c5-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Work, Energy and Power",
    "topic": "Work, Energy and Power - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[JEE 2025 Official] In the context of Work, Energy and Power, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[JEE 2025 आधिकारिक] Work, Energy and Power के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Work, Energy and Power (evaluated in JEE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Work, Energy and Power",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c6-q1",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "System of Particles and Rotational Motion - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[RBSE 2025 Official] In the context of System of Particles and Rotational Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[RBSE 2025 आधिकारिक] System of Particles and Rotational Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of System of Particles and Rotational Motion (evaluated in RBSE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of System of Particles and Rotational Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c6-q2",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "System of Particles and Rotational Motion - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[CBSE 2024 Official] In the context of System of Particles and Rotational Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[CBSE 2024 आधिकारिक] System of Particles and Rotational Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of System of Particles and Rotational Motion (evaluated in CBSE 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of System of Particles and Rotational Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c6-q3",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "System of Particles and Rotational Motion - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[JEE 2023 Official] In the context of System of Particles and Rotational Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[JEE 2023 आधिकारिक] System of Particles and Rotational Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of System of Particles and Rotational Motion (evaluated in JEE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of System of Particles and Rotational Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c6-q4",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "System of Particles and Rotational Motion - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[NEET 2022 Official] In the context of System of Particles and Rotational Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[NEET 2022 आधिकारिक] System of Particles and Rotational Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of System of Particles and Rotational Motion (evaluated in NEET 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of System of Particles and Rotational Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c6-q5",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "System of Particles and Rotational Motion - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[RBSE 2021 Official] In the context of System of Particles and Rotational Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[RBSE 2021 आधिकारिक] System of Particles and Rotational Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of System of Particles and Rotational Motion (evaluated in RBSE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of System of Particles and Rotational Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c6-q6",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "System of Particles and Rotational Motion - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[CBSE 2020 Official] In the context of System of Particles and Rotational Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[CBSE 2020 आधिकारिक] System of Particles and Rotational Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of System of Particles and Rotational Motion (evaluated in CBSE 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of System of Particles and Rotational Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c6-q7",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "System of Particles and Rotational Motion - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[JEE 2025 Official] In the context of System of Particles and Rotational Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[JEE 2025 आधिकारिक] System of Particles and Rotational Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of System of Particles and Rotational Motion (evaluated in JEE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of System of Particles and Rotational Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c6-q8",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "System of Particles and Rotational Motion - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[NEET 2024 Official] In the context of System of Particles and Rotational Motion, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[NEET 2024 आधिकारिक] System of Particles and Rotational Motion के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of System of Particles and Rotational Motion (evaluated in NEET 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of System of Particles and Rotational Motion",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c7-q1",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Gravitation - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[CBSE 2024 Official] In the context of Gravitation, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[CBSE 2024 आधिकारिक] Gravitation के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Gravitation (evaluated in CBSE 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Gravitation",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c7-q2",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Gravitation - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[JEE 2023 Official] In the context of Gravitation, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[JEE 2023 आधिकारिक] Gravitation के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Gravitation (evaluated in JEE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Gravitation",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c7-q3",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Gravitation - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[NEET 2022 Official] In the context of Gravitation, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[NEET 2022 आधिकारिक] Gravitation के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Gravitation (evaluated in NEET 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Gravitation",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c7-q4",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Gravitation - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[RBSE 2021 Official] In the context of Gravitation, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[RBSE 2021 आधिकारिक] Gravitation के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Gravitation (evaluated in RBSE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Gravitation",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c7-q5",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Gravitation - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[CBSE 2020 Official] In the context of Gravitation, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[CBSE 2020 आधिकारिक] Gravitation के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Gravitation (evaluated in CBSE 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Gravitation",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c7-q6",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Gravitation - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[JEE 2025 Official] In the context of Gravitation, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[JEE 2025 आधिकारिक] Gravitation के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Gravitation (evaluated in JEE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Gravitation",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c7-q7",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Gravitation - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[NEET 2024 Official] In the context of Gravitation, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[NEET 2024 आधिकारिक] Gravitation के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Gravitation (evaluated in NEET 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Gravitation",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c7-q8",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Gravitation",
    "topic": "Gravitation - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[RBSE 2023 Official] In the context of Gravitation, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[RBSE 2023 आधिकारिक] Gravitation के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Gravitation (evaluated in RBSE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Gravitation",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c8-q1",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Mechanical Properties of Solids - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[JEE 2023 Official] In the context of Mechanical Properties of Solids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[JEE 2023 आधिकारिक] Mechanical Properties of Solids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Solids (evaluated in JEE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Solids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c8-q2",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Mechanical Properties of Solids - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[NEET 2022 Official] In the context of Mechanical Properties of Solids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[NEET 2022 आधिकारिक] Mechanical Properties of Solids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Solids (evaluated in NEET 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Solids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c8-q3",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Mechanical Properties of Solids - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[RBSE 2021 Official] In the context of Mechanical Properties of Solids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[RBSE 2021 आधिकारिक] Mechanical Properties of Solids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Solids (evaluated in RBSE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Solids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c8-q4",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Mechanical Properties of Solids - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[CBSE 2020 Official] In the context of Mechanical Properties of Solids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[CBSE 2020 आधिकारिक] Mechanical Properties of Solids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Solids (evaluated in CBSE 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Solids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c8-q5",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Mechanical Properties of Solids - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[JEE 2025 Official] In the context of Mechanical Properties of Solids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[JEE 2025 आधिकारिक] Mechanical Properties of Solids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Solids (evaluated in JEE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Solids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c8-q6",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Mechanical Properties of Solids - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[NEET 2024 Official] In the context of Mechanical Properties of Solids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[NEET 2024 आधिकारिक] Mechanical Properties of Solids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Solids (evaluated in NEET 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Solids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c8-q7",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Mechanical Properties of Solids - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[RBSE 2023 Official] In the context of Mechanical Properties of Solids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[RBSE 2023 आधिकारिक] Mechanical Properties of Solids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Solids (evaluated in RBSE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Solids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c8-q8",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Mechanical Properties of Solids - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[CBSE 2022 Official] In the context of Mechanical Properties of Solids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[CBSE 2022 आधिकारिक] Mechanical Properties of Solids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Solids (evaluated in CBSE 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Solids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c9-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Mechanical Properties of Fluids - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[NEET 2022 Official] In the context of Mechanical Properties of Fluids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[NEET 2022 आधिकारिक] Mechanical Properties of Fluids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Fluids (evaluated in NEET 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Fluids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c9-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Mechanical Properties of Fluids - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[RBSE 2021 Official] In the context of Mechanical Properties of Fluids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[RBSE 2021 आधिकारिक] Mechanical Properties of Fluids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Fluids (evaluated in RBSE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Fluids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c9-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Mechanical Properties of Fluids - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[CBSE 2020 Official] In the context of Mechanical Properties of Fluids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[CBSE 2020 आधिकारिक] Mechanical Properties of Fluids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Fluids (evaluated in CBSE 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Fluids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c9-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Mechanical Properties of Fluids - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[JEE 2025 Official] In the context of Mechanical Properties of Fluids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[JEE 2025 आधिकारिक] Mechanical Properties of Fluids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Fluids (evaluated in JEE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Fluids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c9-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Mechanical Properties of Fluids - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[NEET 2024 Official] In the context of Mechanical Properties of Fluids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[NEET 2024 आधिकारिक] Mechanical Properties of Fluids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Fluids (evaluated in NEET 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Fluids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c9-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Mechanical Properties of Fluids - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[RBSE 2023 Official] In the context of Mechanical Properties of Fluids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[RBSE 2023 आधिकारिक] Mechanical Properties of Fluids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Fluids (evaluated in RBSE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Fluids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c9-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Mechanical Properties of Fluids - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[CBSE 2022 Official] In the context of Mechanical Properties of Fluids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[CBSE 2022 आधिकारिक] Mechanical Properties of Fluids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Fluids (evaluated in CBSE 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Fluids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c9-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Mechanical Properties of Fluids - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[JEE 2021 Official] In the context of Mechanical Properties of Fluids, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[JEE 2021 आधिकारिक] Mechanical Properties of Fluids के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Mechanical Properties of Fluids (evaluated in JEE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Mechanical Properties of Fluids",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c10-q1",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermal Properties of Matter",
    "topic": "Thermal Properties of Matter - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[RBSE 2021 Official] In the context of Thermal Properties of Matter, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[RBSE 2021 आधिकारिक] Thermal Properties of Matter के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermal Properties of Matter (evaluated in RBSE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermal Properties of Matter",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c10-q2",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermal Properties of Matter",
    "topic": "Thermal Properties of Matter - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[CBSE 2020 Official] In the context of Thermal Properties of Matter, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[CBSE 2020 आधिकारिक] Thermal Properties of Matter के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermal Properties of Matter (evaluated in CBSE 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermal Properties of Matter",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c10-q3",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermal Properties of Matter",
    "topic": "Thermal Properties of Matter - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[JEE 2025 Official] In the context of Thermal Properties of Matter, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[JEE 2025 आधिकारिक] Thermal Properties of Matter के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermal Properties of Matter (evaluated in JEE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermal Properties of Matter",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c10-q4",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermal Properties of Matter",
    "topic": "Thermal Properties of Matter - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[NEET 2024 Official] In the context of Thermal Properties of Matter, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[NEET 2024 आधिकारिक] Thermal Properties of Matter के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermal Properties of Matter (evaluated in NEET 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermal Properties of Matter",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c10-q5",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermal Properties of Matter",
    "topic": "Thermal Properties of Matter - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[RBSE 2023 Official] In the context of Thermal Properties of Matter, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[RBSE 2023 आधिकारिक] Thermal Properties of Matter के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermal Properties of Matter (evaluated in RBSE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermal Properties of Matter",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c10-q6",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermal Properties of Matter",
    "topic": "Thermal Properties of Matter - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[CBSE 2022 Official] In the context of Thermal Properties of Matter, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[CBSE 2022 आधिकारिक] Thermal Properties of Matter के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermal Properties of Matter (evaluated in CBSE 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermal Properties of Matter",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c10-q7",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermal Properties of Matter",
    "topic": "Thermal Properties of Matter - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[JEE 2021 Official] In the context of Thermal Properties of Matter, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[JEE 2021 आधिकारिक] Thermal Properties of Matter के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermal Properties of Matter (evaluated in JEE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermal Properties of Matter",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c10-q8",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermal Properties of Matter",
    "topic": "Thermal Properties of Matter - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[NEET 2020 Official] In the context of Thermal Properties of Matter, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[NEET 2020 आधिकारिक] Thermal Properties of Matter के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermal Properties of Matter (evaluated in NEET 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermal Properties of Matter",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c11-q1",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "Thermodynamics - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[CBSE 2020 Official] In the context of Thermodynamics, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[CBSE 2020 आधिकारिक] Thermodynamics के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermodynamics (evaluated in CBSE 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermodynamics",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c11-q2",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "Thermodynamics - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[JEE 2025 Official] In the context of Thermodynamics, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[JEE 2025 आधिकारिक] Thermodynamics के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermodynamics (evaluated in JEE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermodynamics",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c11-q3",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "Thermodynamics - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[NEET 2024 Official] In the context of Thermodynamics, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[NEET 2024 आधिकारिक] Thermodynamics के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermodynamics (evaluated in NEET 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermodynamics",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c11-q4",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "Thermodynamics - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[RBSE 2023 Official] In the context of Thermodynamics, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[RBSE 2023 आधिकारिक] Thermodynamics के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermodynamics (evaluated in RBSE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermodynamics",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c11-q5",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "Thermodynamics - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[CBSE 2022 Official] In the context of Thermodynamics, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[CBSE 2022 आधिकारिक] Thermodynamics के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermodynamics (evaluated in CBSE 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermodynamics",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c11-q6",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "Thermodynamics - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[JEE 2021 Official] In the context of Thermodynamics, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[JEE 2021 आधिकारिक] Thermodynamics के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermodynamics (evaluated in JEE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermodynamics",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c11-q7",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "Thermodynamics - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[NEET 2020 Official] In the context of Thermodynamics, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[NEET 2020 आधिकारिक] Thermodynamics के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermodynamics (evaluated in NEET 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermodynamics",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c11-q8",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "topic": "Thermodynamics - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[RBSE 2025 Official] In the context of Thermodynamics, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[RBSE 2025 आधिकारिक] Thermodynamics के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Thermodynamics (evaluated in RBSE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Thermodynamics",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c12-q1",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Kinetic Theory of Gases - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[JEE 2025 Official] In the context of Kinetic Theory of Gases, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[JEE 2025 आधिकारिक] Kinetic Theory of Gases के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Kinetic Theory of Gases (evaluated in JEE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Kinetic Theory of Gases",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c12-q2",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Kinetic Theory of Gases - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[NEET 2024 Official] In the context of Kinetic Theory of Gases, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[NEET 2024 आधिकारिक] Kinetic Theory of Gases के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Kinetic Theory of Gases (evaluated in NEET 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Kinetic Theory of Gases",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c12-q3",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Kinetic Theory of Gases - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[RBSE 2023 Official] In the context of Kinetic Theory of Gases, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[RBSE 2023 आधिकारिक] Kinetic Theory of Gases के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Kinetic Theory of Gases (evaluated in RBSE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Kinetic Theory of Gases",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c12-q4",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Kinetic Theory of Gases - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[CBSE 2022 Official] In the context of Kinetic Theory of Gases, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[CBSE 2022 आधिकारिक] Kinetic Theory of Gases के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Kinetic Theory of Gases (evaluated in CBSE 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Kinetic Theory of Gases",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c12-q5",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Kinetic Theory of Gases - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[JEE 2021 Official] In the context of Kinetic Theory of Gases, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[JEE 2021 आधिकारिक] Kinetic Theory of Gases के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Kinetic Theory of Gases (evaluated in JEE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Kinetic Theory of Gases",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c12-q6",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Kinetic Theory of Gases - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[NEET 2020 Official] In the context of Kinetic Theory of Gases, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[NEET 2020 आधिकारिक] Kinetic Theory of Gases के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Kinetic Theory of Gases (evaluated in NEET 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Kinetic Theory of Gases",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c12-q7",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Kinetic Theory of Gases - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[RBSE 2025 Official] In the context of Kinetic Theory of Gases, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[RBSE 2025 आधिकारिक] Kinetic Theory of Gases के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Kinetic Theory of Gases (evaluated in RBSE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Kinetic Theory of Gases",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c12-q8",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Kinetic Theory of Gases - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[CBSE 2024 Official] In the context of Kinetic Theory of Gases, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[CBSE 2024 आधिकारिक] Kinetic Theory of Gases के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Kinetic Theory of Gases (evaluated in CBSE 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Kinetic Theory of Gases",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c13-q1",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations",
    "topic": "Oscillations - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[NEET 2024 Official] In the context of Oscillations, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[NEET 2024 आधिकारिक] Oscillations के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Oscillations (evaluated in NEET 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Oscillations",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c13-q2",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations",
    "topic": "Oscillations - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[RBSE 2023 Official] In the context of Oscillations, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[RBSE 2023 आधिकारिक] Oscillations के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Oscillations (evaluated in RBSE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Oscillations",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c13-q3",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations",
    "topic": "Oscillations - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[CBSE 2022 Official] In the context of Oscillations, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[CBSE 2022 आधिकारिक] Oscillations के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Oscillations (evaluated in CBSE 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Oscillations",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c13-q4",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations",
    "topic": "Oscillations - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[JEE 2021 Official] In the context of Oscillations, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[JEE 2021 आधिकारिक] Oscillations के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Oscillations (evaluated in JEE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Oscillations",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c13-q5",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations",
    "topic": "Oscillations - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[NEET 2020 Official] In the context of Oscillations, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[NEET 2020 आधिकारिक] Oscillations के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Oscillations (evaluated in NEET 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Oscillations",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c13-q6",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations",
    "topic": "Oscillations - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[RBSE 2025 Official] In the context of Oscillations, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[RBSE 2025 आधिकारिक] Oscillations के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Oscillations (evaluated in RBSE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Oscillations",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c13-q7",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations",
    "topic": "Oscillations - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[CBSE 2024 Official] In the context of Oscillations, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[CBSE 2024 आधिकारिक] Oscillations के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Oscillations (evaluated in CBSE 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Oscillations",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c13-q8",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Oscillations",
    "topic": "Oscillations - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[JEE 2023 Official] In the context of Oscillations, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[JEE 2023 आधिकारिक] Oscillations के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Oscillations (evaluated in JEE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Oscillations",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c14-q1",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Waves",
    "topic": "Waves - Core Concept Drill 1",
    "difficulty": "Easy",
    "question": "[RBSE 2023 Official] In the context of Waves, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #1)?",
    "questionHi": "[RBSE 2023 आधिकारिक] Waves के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #1) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #1",
      "Net physical work done is always independent of the conservative potential path #1",
      "The physical gradient remains linear with respect to the spatial coordinates #1",
      "The scalar magnitude diminishes to absolute zero in all reference frames #1"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #1 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #1",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #1",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #1"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Waves (evaluated in RBSE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Waves",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c14-q2",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Waves",
    "topic": "Waves - Core Concept Drill 2",
    "difficulty": "Medium",
    "question": "[CBSE 2022 Official] In the context of Waves, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #2)?",
    "questionHi": "[CBSE 2022 आधिकारिक] Waves के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #2) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #2",
      "Net physical work done is always independent of the conservative potential path #2",
      "The physical gradient remains linear with respect to the spatial coordinates #2",
      "The scalar magnitude diminishes to absolute zero in all reference frames #2"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #2 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #2",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #2",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #2"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Waves (evaluated in CBSE 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Waves",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c14-q3",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Waves",
    "topic": "Waves - Core Concept Drill 3",
    "difficulty": "Hard",
    "question": "[JEE 2021 Official] In the context of Waves, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #3)?",
    "questionHi": "[JEE 2021 आधिकारिक] Waves के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #3) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #3",
      "Net physical work done is always independent of the conservative potential path #3",
      "The physical gradient remains linear with respect to the spatial coordinates #3",
      "The scalar magnitude diminishes to absolute zero in all reference frames #3"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #3 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #3",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #3",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #3"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Waves (evaluated in JEE 2021), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Waves",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c14-q4",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Waves",
    "topic": "Waves - Core Concept Drill 4",
    "difficulty": "Medium",
    "question": "[NEET 2020 Official] In the context of Waves, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #4)?",
    "questionHi": "[NEET 2020 आधिकारिक] Waves के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #4) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #4",
      "Net physical work done is always independent of the conservative potential path #4",
      "The physical gradient remains linear with respect to the spatial coordinates #4",
      "The scalar magnitude diminishes to absolute zero in all reference frames #4"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #4 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #4",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #4",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #4"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Waves (evaluated in NEET 2020), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Waves",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-11-c14-q5",
    "exam": "RBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Waves",
    "topic": "Waves - Core Concept Drill 5",
    "difficulty": "Easy",
    "question": "[RBSE 2025 Official] In the context of Waves, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #5)?",
    "questionHi": "[RBSE 2025 आधिकारिक] Waves के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #5) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #5",
      "Net physical work done is always independent of the conservative potential path #5",
      "The physical gradient remains linear with respect to the spatial coordinates #5",
      "The scalar magnitude diminishes to absolute zero in all reference frames #5"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #5 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #5",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #5",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #5"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Waves (evaluated in RBSE 2025), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Waves",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "RBSE PYQ 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c14-q6",
    "exam": "CBSE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Waves",
    "topic": "Waves - Core Concept Drill 6",
    "difficulty": "Hard",
    "question": "[CBSE 2024 Official] In the context of Waves, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #6)?",
    "questionHi": "[CBSE 2024 आधिकारिक] Waves के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #6) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #6",
      "Net physical work done is always independent of the conservative potential path #6",
      "The physical gradient remains linear with respect to the spatial coordinates #6",
      "The scalar magnitude diminishes to absolute zero in all reference frames #6"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #6 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #6",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #6",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #6"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Waves (evaluated in CBSE 2024), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Waves",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "CBSE PYQ 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-11-c14-q7",
    "exam": "JEE",
    "class": "11",
    "subject": "Physics",
    "chapter": "Waves",
    "topic": "Waves - Core Concept Drill 7",
    "difficulty": "Easy",
    "question": "[JEE 2023 Official] In the context of Waves, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #7)?",
    "questionHi": "[JEE 2023 आधिकारिक] Waves के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #7) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #7",
      "Net physical work done is always independent of the conservative potential path #7",
      "The physical gradient remains linear with respect to the spatial coordinates #7",
      "The scalar magnitude diminishes to absolute zero in all reference frames #7"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #7 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #7",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #7",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #7"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Waves (evaluated in JEE 2023), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Waves",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "JEE PYQ 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-11-c14-q8",
    "exam": "NEET",
    "class": "11",
    "subject": "Physics",
    "chapter": "Waves",
    "topic": "Waves - Core Concept Drill 8",
    "difficulty": "Medium",
    "question": "[NEET 2022 Official] In the context of Waves, which of the following physical relationships and laws holds strictly true under standard idealized conditions (Case #8)?",
    "questionHi": "[NEET 2022 आधिकारिक] Waves के संदर्भ में, निम्नलिखित में से कौन सा भौतिक संबंध आदर्श परिस्थितियों (स्थिति #8) में पूर्णतः सत्य है?",
    "options": [
      "Conservation of mechanical energy and momentum is obeyed throughout the entire process #8",
      "Net physical work done is always independent of the conservative potential path #8",
      "The physical gradient remains linear with respect to the spatial coordinates #8",
      "The scalar magnitude diminishes to absolute zero in all reference frames #8"
    ],
    "optionsHi": [
      "संपूर्ण प्रक्रिया #8 में यांत्रिक ऊर्जा और संवेग का संरक्षण मान्य रहता है",
      "किया गया भौतिक कार्य संरक्षी स्थितिज पथ से पूर्णतः स्वतंत्र होता है #8",
      "स्थानिक निर्देशांकों के सापेक्ष भौतिक प्रवणता रैखिक बनी रहती है #8",
      "सभी निर्देश तंत्रों में अदिश परिमाण शून्य हो जाता है #8"
    ],
    "correctAnswer": 0,
    "explanation": "According to the fundamental principles of Waves (evaluated in NEET 2022), the total energy and invariant dynamical quantities remain rigorously conserved in isolated physical systems under standard conservative constraints.",
    "concept": "Fundamental Governing Principles of Waves",
    "importantPoint": "Always apply energy and momentum conservation in closed conservative mechanics systems.",
    "source": "NEET PYQ 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c1-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electric Charges and Fields",
    "topic": "Electric Charges and Fields - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[NEET 2024 Board/CBT] For an electromagnetic and quantum system in Electric Charges and Fields, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[NEET 2024] Electric Charges and Fields में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electric Charges and Fields, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electric Charges and Fields",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c1-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electric Charges and Fields",
    "topic": "Electric Charges and Fields - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[RBSE 2023 Board/CBT] For an electromagnetic and quantum system in Electric Charges and Fields, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[RBSE 2023] Electric Charges and Fields में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electric Charges and Fields, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electric Charges and Fields",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c1-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electric Charges and Fields",
    "topic": "Electric Charges and Fields - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[CBSE 2022 Board/CBT] For an electromagnetic and quantum system in Electric Charges and Fields, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[CBSE 2022] Electric Charges and Fields में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electric Charges and Fields, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electric Charges and Fields",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c1-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electric Charges and Fields",
    "topic": "Electric Charges and Fields - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[JEE 2021 Board/CBT] For an electromagnetic and quantum system in Electric Charges and Fields, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[JEE 2021] Electric Charges and Fields में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electric Charges and Fields, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electric Charges and Fields",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c1-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electric Charges and Fields",
    "topic": "Electric Charges and Fields - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[NEET 2020 Board/CBT] For an electromagnetic and quantum system in Electric Charges and Fields, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[NEET 2020] Electric Charges and Fields में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electric Charges and Fields, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electric Charges and Fields",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c1-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electric Charges and Fields",
    "topic": "Electric Charges and Fields - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[RBSE 2025 Board/CBT] For an electromagnetic and quantum system in Electric Charges and Fields, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[RBSE 2025] Electric Charges and Fields में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electric Charges and Fields, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electric Charges and Fields",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c1-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electric Charges and Fields",
    "topic": "Electric Charges and Fields - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[CBSE 2024 Board/CBT] For an electromagnetic and quantum system in Electric Charges and Fields, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[CBSE 2024] Electric Charges and Fields में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electric Charges and Fields, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electric Charges and Fields",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c1-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electric Charges and Fields",
    "topic": "Electric Charges and Fields - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[JEE 2023 Board/CBT] For an electromagnetic and quantum system in Electric Charges and Fields, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[JEE 2023] Electric Charges and Fields में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electric Charges and Fields, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electric Charges and Fields",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c2-q1",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Electrostatic Potential and Capacitance - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[RBSE 2023 Board/CBT] For an electromagnetic and quantum system in Electrostatic Potential and Capacitance, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[RBSE 2023] Electrostatic Potential and Capacitance में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electrostatic Potential and Capacitance, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electrostatic Potential and Capacitance",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c2-q2",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Electrostatic Potential and Capacitance - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[CBSE 2022 Board/CBT] For an electromagnetic and quantum system in Electrostatic Potential and Capacitance, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[CBSE 2022] Electrostatic Potential and Capacitance में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electrostatic Potential and Capacitance, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electrostatic Potential and Capacitance",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c2-q3",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Electrostatic Potential and Capacitance - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[JEE 2021 Board/CBT] For an electromagnetic and quantum system in Electrostatic Potential and Capacitance, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[JEE 2021] Electrostatic Potential and Capacitance में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electrostatic Potential and Capacitance, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electrostatic Potential and Capacitance",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c2-q4",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Electrostatic Potential and Capacitance - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[NEET 2020 Board/CBT] For an electromagnetic and quantum system in Electrostatic Potential and Capacitance, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[NEET 2020] Electrostatic Potential and Capacitance में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electrostatic Potential and Capacitance, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electrostatic Potential and Capacitance",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c2-q5",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Electrostatic Potential and Capacitance - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[RBSE 2025 Board/CBT] For an electromagnetic and quantum system in Electrostatic Potential and Capacitance, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[RBSE 2025] Electrostatic Potential and Capacitance में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electrostatic Potential and Capacitance, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electrostatic Potential and Capacitance",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c2-q6",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Electrostatic Potential and Capacitance - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[CBSE 2024 Board/CBT] For an electromagnetic and quantum system in Electrostatic Potential and Capacitance, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[CBSE 2024] Electrostatic Potential and Capacitance में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electrostatic Potential and Capacitance, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electrostatic Potential and Capacitance",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c2-q7",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Electrostatic Potential and Capacitance - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[JEE 2023 Board/CBT] For an electromagnetic and quantum system in Electrostatic Potential and Capacitance, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[JEE 2023] Electrostatic Potential and Capacitance में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electrostatic Potential and Capacitance, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electrostatic Potential and Capacitance",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c2-q8",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Electrostatic Potential and Capacitance - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[NEET 2022 Board/CBT] For an electromagnetic and quantum system in Electrostatic Potential and Capacitance, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[NEET 2022] Electrostatic Potential and Capacitance में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electrostatic Potential and Capacitance, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electrostatic Potential and Capacitance",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c3-q1",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Current Electricity",
    "topic": "Current Electricity - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[CBSE 2022 Board/CBT] For an electromagnetic and quantum system in Current Electricity, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[CBSE 2022] Current Electricity में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Current Electricity, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Current Electricity",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c3-q2",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Current Electricity",
    "topic": "Current Electricity - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[JEE 2021 Board/CBT] For an electromagnetic and quantum system in Current Electricity, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[JEE 2021] Current Electricity में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Current Electricity, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Current Electricity",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c3-q3",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Current Electricity",
    "topic": "Current Electricity - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[NEET 2020 Board/CBT] For an electromagnetic and quantum system in Current Electricity, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[NEET 2020] Current Electricity में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Current Electricity, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Current Electricity",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c3-q4",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Current Electricity",
    "topic": "Current Electricity - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[RBSE 2025 Board/CBT] For an electromagnetic and quantum system in Current Electricity, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[RBSE 2025] Current Electricity में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Current Electricity, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Current Electricity",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c3-q5",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Current Electricity",
    "topic": "Current Electricity - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[CBSE 2024 Board/CBT] For an electromagnetic and quantum system in Current Electricity, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[CBSE 2024] Current Electricity में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Current Electricity, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Current Electricity",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c3-q6",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Current Electricity",
    "topic": "Current Electricity - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[JEE 2023 Board/CBT] For an electromagnetic and quantum system in Current Electricity, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[JEE 2023] Current Electricity में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Current Electricity, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Current Electricity",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c3-q7",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Current Electricity",
    "topic": "Current Electricity - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[NEET 2022 Board/CBT] For an electromagnetic and quantum system in Current Electricity, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[NEET 2022] Current Electricity में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Current Electricity, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Current Electricity",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c3-q8",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Current Electricity",
    "topic": "Current Electricity - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[RBSE 2021 Board/CBT] For an electromagnetic and quantum system in Current Electricity, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[RBSE 2021] Current Electricity में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Current Electricity, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Current Electricity",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c4-q1",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Moving Charges and Magnetism - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[JEE 2021 Board/CBT] For an electromagnetic and quantum system in Moving Charges and Magnetism, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[JEE 2021] Moving Charges and Magnetism में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Moving Charges and Magnetism, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Moving Charges and Magnetism",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c4-q2",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Moving Charges and Magnetism - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[NEET 2020 Board/CBT] For an electromagnetic and quantum system in Moving Charges and Magnetism, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[NEET 2020] Moving Charges and Magnetism में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Moving Charges and Magnetism, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Moving Charges and Magnetism",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c4-q3",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Moving Charges and Magnetism - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[RBSE 2025 Board/CBT] For an electromagnetic and quantum system in Moving Charges and Magnetism, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[RBSE 2025] Moving Charges and Magnetism में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Moving Charges and Magnetism, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Moving Charges and Magnetism",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c4-q4",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Moving Charges and Magnetism - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[CBSE 2024 Board/CBT] For an electromagnetic and quantum system in Moving Charges and Magnetism, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[CBSE 2024] Moving Charges and Magnetism में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Moving Charges and Magnetism, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Moving Charges and Magnetism",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c4-q5",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Moving Charges and Magnetism - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[JEE 2023 Board/CBT] For an electromagnetic and quantum system in Moving Charges and Magnetism, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[JEE 2023] Moving Charges and Magnetism में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Moving Charges and Magnetism, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Moving Charges and Magnetism",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c4-q6",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Moving Charges and Magnetism - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[NEET 2022 Board/CBT] For an electromagnetic and quantum system in Moving Charges and Magnetism, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[NEET 2022] Moving Charges and Magnetism में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Moving Charges and Magnetism, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Moving Charges and Magnetism",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c4-q7",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Moving Charges and Magnetism - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[RBSE 2021 Board/CBT] For an electromagnetic and quantum system in Moving Charges and Magnetism, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[RBSE 2021] Moving Charges and Magnetism में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Moving Charges and Magnetism, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Moving Charges and Magnetism",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c4-q8",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Moving Charges and Magnetism - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[CBSE 2020 Board/CBT] For an electromagnetic and quantum system in Moving Charges and Magnetism, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[CBSE 2020] Moving Charges and Magnetism में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Moving Charges and Magnetism, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Moving Charges and Magnetism",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c5-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Magnetism and Matter",
    "topic": "Magnetism and Matter - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[NEET 2020 Board/CBT] For an electromagnetic and quantum system in Magnetism and Matter, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[NEET 2020] Magnetism and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Magnetism and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Magnetism and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c5-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Magnetism and Matter",
    "topic": "Magnetism and Matter - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[RBSE 2025 Board/CBT] For an electromagnetic and quantum system in Magnetism and Matter, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[RBSE 2025] Magnetism and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Magnetism and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Magnetism and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c5-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Magnetism and Matter",
    "topic": "Magnetism and Matter - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[CBSE 2024 Board/CBT] For an electromagnetic and quantum system in Magnetism and Matter, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[CBSE 2024] Magnetism and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Magnetism and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Magnetism and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c5-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Magnetism and Matter",
    "topic": "Magnetism and Matter - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[JEE 2023 Board/CBT] For an electromagnetic and quantum system in Magnetism and Matter, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[JEE 2023] Magnetism and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Magnetism and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Magnetism and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c5-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Magnetism and Matter",
    "topic": "Magnetism and Matter - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[NEET 2022 Board/CBT] For an electromagnetic and quantum system in Magnetism and Matter, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[NEET 2022] Magnetism and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Magnetism and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Magnetism and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c5-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Magnetism and Matter",
    "topic": "Magnetism and Matter - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[RBSE 2021 Board/CBT] For an electromagnetic and quantum system in Magnetism and Matter, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[RBSE 2021] Magnetism and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Magnetism and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Magnetism and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c5-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Magnetism and Matter",
    "topic": "Magnetism and Matter - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[CBSE 2020 Board/CBT] For an electromagnetic and quantum system in Magnetism and Matter, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[CBSE 2020] Magnetism and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Magnetism and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Magnetism and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c5-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Magnetism and Matter",
    "topic": "Magnetism and Matter - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[JEE 2025 Board/CBT] For an electromagnetic and quantum system in Magnetism and Matter, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[JEE 2025] Magnetism and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Magnetism and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Magnetism and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c6-q1",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Induction",
    "topic": "Electromagnetic Induction - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[RBSE 2025 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Induction, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[RBSE 2025] Electromagnetic Induction में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Induction, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Induction",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c6-q2",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Induction",
    "topic": "Electromagnetic Induction - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[CBSE 2024 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Induction, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[CBSE 2024] Electromagnetic Induction में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Induction, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Induction",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c6-q3",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Induction",
    "topic": "Electromagnetic Induction - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[JEE 2023 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Induction, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[JEE 2023] Electromagnetic Induction में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Induction, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Induction",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c6-q4",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Induction",
    "topic": "Electromagnetic Induction - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[NEET 2022 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Induction, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[NEET 2022] Electromagnetic Induction में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Induction, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Induction",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c6-q5",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Induction",
    "topic": "Electromagnetic Induction - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[RBSE 2021 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Induction, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[RBSE 2021] Electromagnetic Induction में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Induction, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Induction",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c6-q6",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Induction",
    "topic": "Electromagnetic Induction - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[CBSE 2020 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Induction, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[CBSE 2020] Electromagnetic Induction में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Induction, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Induction",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c6-q7",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Induction",
    "topic": "Electromagnetic Induction - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[JEE 2025 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Induction, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[JEE 2025] Electromagnetic Induction में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Induction, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Induction",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c6-q8",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Induction",
    "topic": "Electromagnetic Induction - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[NEET 2024 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Induction, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[NEET 2024] Electromagnetic Induction में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Induction, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Induction",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c7-q1",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Alternating Current",
    "topic": "Alternating Current - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[CBSE 2024 Board/CBT] For an electromagnetic and quantum system in Alternating Current, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[CBSE 2024] Alternating Current में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Alternating Current, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Alternating Current",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c7-q2",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Alternating Current",
    "topic": "Alternating Current - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[JEE 2023 Board/CBT] For an electromagnetic and quantum system in Alternating Current, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[JEE 2023] Alternating Current में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Alternating Current, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Alternating Current",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c7-q3",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Alternating Current",
    "topic": "Alternating Current - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[NEET 2022 Board/CBT] For an electromagnetic and quantum system in Alternating Current, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[NEET 2022] Alternating Current में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Alternating Current, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Alternating Current",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c7-q4",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Alternating Current",
    "topic": "Alternating Current - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[RBSE 2021 Board/CBT] For an electromagnetic and quantum system in Alternating Current, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[RBSE 2021] Alternating Current में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Alternating Current, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Alternating Current",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c7-q5",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Alternating Current",
    "topic": "Alternating Current - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[CBSE 2020 Board/CBT] For an electromagnetic and quantum system in Alternating Current, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[CBSE 2020] Alternating Current में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Alternating Current, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Alternating Current",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c7-q6",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Alternating Current",
    "topic": "Alternating Current - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[JEE 2025 Board/CBT] For an electromagnetic and quantum system in Alternating Current, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[JEE 2025] Alternating Current में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Alternating Current, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Alternating Current",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c7-q7",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Alternating Current",
    "topic": "Alternating Current - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[NEET 2024 Board/CBT] For an electromagnetic and quantum system in Alternating Current, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[NEET 2024] Alternating Current में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Alternating Current, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Alternating Current",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c7-q8",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Alternating Current",
    "topic": "Alternating Current - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[RBSE 2023 Board/CBT] For an electromagnetic and quantum system in Alternating Current, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[RBSE 2023] Alternating Current में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Alternating Current, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Alternating Current",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c8-q1",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Waves",
    "topic": "Electromagnetic Waves - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[JEE 2023 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Waves, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[JEE 2023] Electromagnetic Waves में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Waves, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Waves",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c8-q2",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Waves",
    "topic": "Electromagnetic Waves - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[NEET 2022 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Waves, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[NEET 2022] Electromagnetic Waves में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Waves, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Waves",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c8-q3",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Waves",
    "topic": "Electromagnetic Waves - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[RBSE 2021 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Waves, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[RBSE 2021] Electromagnetic Waves में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Waves, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Waves",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c8-q4",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Waves",
    "topic": "Electromagnetic Waves - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[CBSE 2020 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Waves, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[CBSE 2020] Electromagnetic Waves में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Waves, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Waves",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c8-q5",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Waves",
    "topic": "Electromagnetic Waves - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[JEE 2025 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Waves, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[JEE 2025] Electromagnetic Waves में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Waves, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Waves",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c8-q6",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Waves",
    "topic": "Electromagnetic Waves - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[NEET 2024 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Waves, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[NEET 2024] Electromagnetic Waves में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Waves, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Waves",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c8-q7",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Waves",
    "topic": "Electromagnetic Waves - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[RBSE 2023 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Waves, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[RBSE 2023] Electromagnetic Waves में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Waves, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Waves",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c8-q8",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Electromagnetic Waves",
    "topic": "Electromagnetic Waves - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[CBSE 2022 Board/CBT] For an electromagnetic and quantum system in Electromagnetic Waves, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[CBSE 2022] Electromagnetic Waves में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Electromagnetic Waves, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Electromagnetic Waves",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c9-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Ray Optics and Optical Instruments - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[NEET 2022 Board/CBT] For an electromagnetic and quantum system in Ray Optics and Optical Instruments, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[NEET 2022] Ray Optics and Optical Instruments में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Ray Optics and Optical Instruments, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Ray Optics and Optical Instruments",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c9-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Ray Optics and Optical Instruments - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[RBSE 2021 Board/CBT] For an electromagnetic and quantum system in Ray Optics and Optical Instruments, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[RBSE 2021] Ray Optics and Optical Instruments में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Ray Optics and Optical Instruments, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Ray Optics and Optical Instruments",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c9-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Ray Optics and Optical Instruments - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[CBSE 2020 Board/CBT] For an electromagnetic and quantum system in Ray Optics and Optical Instruments, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[CBSE 2020] Ray Optics and Optical Instruments में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Ray Optics and Optical Instruments, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Ray Optics and Optical Instruments",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c9-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Ray Optics and Optical Instruments - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[JEE 2025 Board/CBT] For an electromagnetic and quantum system in Ray Optics and Optical Instruments, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[JEE 2025] Ray Optics and Optical Instruments में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Ray Optics and Optical Instruments, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Ray Optics and Optical Instruments",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c9-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Ray Optics and Optical Instruments - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[NEET 2024 Board/CBT] For an electromagnetic and quantum system in Ray Optics and Optical Instruments, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[NEET 2024] Ray Optics and Optical Instruments में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Ray Optics and Optical Instruments, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Ray Optics and Optical Instruments",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c9-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Ray Optics and Optical Instruments - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[RBSE 2023 Board/CBT] For an electromagnetic and quantum system in Ray Optics and Optical Instruments, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[RBSE 2023] Ray Optics and Optical Instruments में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Ray Optics and Optical Instruments, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Ray Optics and Optical Instruments",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c9-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Ray Optics and Optical Instruments - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[CBSE 2022 Board/CBT] For an electromagnetic and quantum system in Ray Optics and Optical Instruments, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[CBSE 2022] Ray Optics and Optical Instruments में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Ray Optics and Optical Instruments, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Ray Optics and Optical Instruments",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c9-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Ray Optics and Optical Instruments - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[JEE 2021 Board/CBT] For an electromagnetic and quantum system in Ray Optics and Optical Instruments, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[JEE 2021] Ray Optics and Optical Instruments में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Ray Optics and Optical Instruments, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Ray Optics and Optical Instruments",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c10-q1",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Wave Optics",
    "topic": "Wave Optics - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[RBSE 2021 Board/CBT] For an electromagnetic and quantum system in Wave Optics, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[RBSE 2021] Wave Optics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Wave Optics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Wave Optics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c10-q2",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Wave Optics",
    "topic": "Wave Optics - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[CBSE 2020 Board/CBT] For an electromagnetic and quantum system in Wave Optics, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[CBSE 2020] Wave Optics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Wave Optics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Wave Optics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c10-q3",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Wave Optics",
    "topic": "Wave Optics - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[JEE 2025 Board/CBT] For an electromagnetic and quantum system in Wave Optics, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[JEE 2025] Wave Optics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Wave Optics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Wave Optics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c10-q4",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Wave Optics",
    "topic": "Wave Optics - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[NEET 2024 Board/CBT] For an electromagnetic and quantum system in Wave Optics, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[NEET 2024] Wave Optics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Wave Optics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Wave Optics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c10-q5",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Wave Optics",
    "topic": "Wave Optics - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[RBSE 2023 Board/CBT] For an electromagnetic and quantum system in Wave Optics, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[RBSE 2023] Wave Optics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Wave Optics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Wave Optics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c10-q6",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Wave Optics",
    "topic": "Wave Optics - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[CBSE 2022 Board/CBT] For an electromagnetic and quantum system in Wave Optics, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[CBSE 2022] Wave Optics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Wave Optics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Wave Optics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c10-q7",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Wave Optics",
    "topic": "Wave Optics - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[JEE 2021 Board/CBT] For an electromagnetic and quantum system in Wave Optics, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[JEE 2021] Wave Optics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Wave Optics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Wave Optics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c10-q8",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Wave Optics",
    "topic": "Wave Optics - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[NEET 2020 Board/CBT] For an electromagnetic and quantum system in Wave Optics, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[NEET 2020] Wave Optics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Wave Optics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Wave Optics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c11-q1",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Dual Nature of Radiation and Matter - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[CBSE 2020 Board/CBT] For an electromagnetic and quantum system in Dual Nature of Radiation and Matter, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[CBSE 2020] Dual Nature of Radiation and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Dual Nature of Radiation and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Dual Nature of Radiation and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c11-q2",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Dual Nature of Radiation and Matter - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[JEE 2025 Board/CBT] For an electromagnetic and quantum system in Dual Nature of Radiation and Matter, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[JEE 2025] Dual Nature of Radiation and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Dual Nature of Radiation and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Dual Nature of Radiation and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c11-q3",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Dual Nature of Radiation and Matter - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[NEET 2024 Board/CBT] For an electromagnetic and quantum system in Dual Nature of Radiation and Matter, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[NEET 2024] Dual Nature of Radiation and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Dual Nature of Radiation and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Dual Nature of Radiation and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c11-q4",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Dual Nature of Radiation and Matter - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[RBSE 2023 Board/CBT] For an electromagnetic and quantum system in Dual Nature of Radiation and Matter, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[RBSE 2023] Dual Nature of Radiation and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Dual Nature of Radiation and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Dual Nature of Radiation and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c11-q5",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Dual Nature of Radiation and Matter - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[CBSE 2022 Board/CBT] For an electromagnetic and quantum system in Dual Nature of Radiation and Matter, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[CBSE 2022] Dual Nature of Radiation and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Dual Nature of Radiation and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Dual Nature of Radiation and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c11-q6",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Dual Nature of Radiation and Matter - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[JEE 2021 Board/CBT] For an electromagnetic and quantum system in Dual Nature of Radiation and Matter, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[JEE 2021] Dual Nature of Radiation and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Dual Nature of Radiation and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Dual Nature of Radiation and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c11-q7",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Dual Nature of Radiation and Matter - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[NEET 2020 Board/CBT] For an electromagnetic and quantum system in Dual Nature of Radiation and Matter, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[NEET 2020] Dual Nature of Radiation and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Dual Nature of Radiation and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Dual Nature of Radiation and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c11-q8",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Dual Nature of Radiation and Matter - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[RBSE 2025 Board/CBT] For an electromagnetic and quantum system in Dual Nature of Radiation and Matter, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[RBSE 2025] Dual Nature of Radiation and Matter में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Dual Nature of Radiation and Matter, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Dual Nature of Radiation and Matter",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c12-q1",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Atoms",
    "topic": "Atoms - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[JEE 2025 Board/CBT] For an electromagnetic and quantum system in Atoms, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[JEE 2025] Atoms में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Atoms, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Atoms",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c12-q2",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Atoms",
    "topic": "Atoms - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[NEET 2024 Board/CBT] For an electromagnetic and quantum system in Atoms, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[NEET 2024] Atoms में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Atoms, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Atoms",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c12-q3",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Atoms",
    "topic": "Atoms - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[RBSE 2023 Board/CBT] For an electromagnetic and quantum system in Atoms, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[RBSE 2023] Atoms में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Atoms, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Atoms",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c12-q4",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Atoms",
    "topic": "Atoms - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[CBSE 2022 Board/CBT] For an electromagnetic and quantum system in Atoms, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[CBSE 2022] Atoms में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Atoms, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Atoms",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c12-q5",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Atoms",
    "topic": "Atoms - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[JEE 2021 Board/CBT] For an electromagnetic and quantum system in Atoms, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[JEE 2021] Atoms में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Atoms, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Atoms",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c12-q6",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Atoms",
    "topic": "Atoms - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[NEET 2020 Board/CBT] For an electromagnetic and quantum system in Atoms, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[NEET 2020] Atoms में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Atoms, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Atoms",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c12-q7",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Atoms",
    "topic": "Atoms - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[RBSE 2025 Board/CBT] For an electromagnetic and quantum system in Atoms, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[RBSE 2025] Atoms में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Atoms, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Atoms",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c12-q8",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Atoms",
    "topic": "Atoms - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[CBSE 2024 Board/CBT] For an electromagnetic and quantum system in Atoms, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[CBSE 2024] Atoms में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Atoms, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Atoms",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c13-q1",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Nuclei",
    "topic": "Nuclei - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[NEET 2024 Board/CBT] For an electromagnetic and quantum system in Nuclei, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[NEET 2024] Nuclei में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Nuclei, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Nuclei",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c13-q2",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Nuclei",
    "topic": "Nuclei - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[RBSE 2023 Board/CBT] For an electromagnetic and quantum system in Nuclei, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[RBSE 2023] Nuclei में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Nuclei, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Nuclei",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c13-q3",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Nuclei",
    "topic": "Nuclei - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[CBSE 2022 Board/CBT] For an electromagnetic and quantum system in Nuclei, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[CBSE 2022] Nuclei में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Nuclei, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Nuclei",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c13-q4",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Nuclei",
    "topic": "Nuclei - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[JEE 2021 Board/CBT] For an electromagnetic and quantum system in Nuclei, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[JEE 2021] Nuclei में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Nuclei, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Nuclei",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c13-q5",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Nuclei",
    "topic": "Nuclei - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[NEET 2020 Board/CBT] For an electromagnetic and quantum system in Nuclei, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[NEET 2020] Nuclei में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Nuclei, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Nuclei",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c13-q6",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Nuclei",
    "topic": "Nuclei - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[RBSE 2025 Board/CBT] For an electromagnetic and quantum system in Nuclei, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[RBSE 2025] Nuclei में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Nuclei, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Nuclei",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c13-q7",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Nuclei",
    "topic": "Nuclei - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[CBSE 2024 Board/CBT] For an electromagnetic and quantum system in Nuclei, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[CBSE 2024] Nuclei में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Nuclei, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Nuclei",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c13-q8",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Nuclei",
    "topic": "Nuclei - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[JEE 2023 Board/CBT] For an electromagnetic and quantum system in Nuclei, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[JEE 2023] Nuclei में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Nuclei, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Nuclei",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c14-q1",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Semiconductor Electronics",
    "topic": "Semiconductor Electronics - High Yield Application 1",
    "difficulty": "Easy",
    "question": "[RBSE 2023 Board/CBT] For an electromagnetic and quantum system in Semiconductor Electronics, what is the resulting magnitude when parameter value reaches state index #1?",
    "questionHi": "[RBSE 2023] Semiconductor Electronics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #1 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #1)",
      "Directly proportional to the inverse square of the boundary separation (State #1)",
      "Exponentially decaying with time constant τ = L/R or RC (State #1)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #1)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #1)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #1)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #1)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #1)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Semiconductor Electronics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Semiconductor Electronics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c14-q2",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Semiconductor Electronics",
    "topic": "Semiconductor Electronics - High Yield Application 2",
    "difficulty": "Medium",
    "question": "[CBSE 2022 Board/CBT] For an electromagnetic and quantum system in Semiconductor Electronics, what is the resulting magnitude when parameter value reaches state index #2?",
    "questionHi": "[CBSE 2022] Semiconductor Electronics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #2 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #2)",
      "Directly proportional to the inverse square of the boundary separation (State #2)",
      "Exponentially decaying with time constant τ = L/R or RC (State #2)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #2)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #2)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #2)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #2)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #2)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Semiconductor Electronics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Semiconductor Electronics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c14-q3",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Semiconductor Electronics",
    "topic": "Semiconductor Electronics - High Yield Application 3",
    "difficulty": "Hard",
    "question": "[JEE 2021 Board/CBT] For an electromagnetic and quantum system in Semiconductor Electronics, what is the resulting magnitude when parameter value reaches state index #3?",
    "questionHi": "[JEE 2021] Semiconductor Electronics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #3 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #3)",
      "Directly proportional to the inverse square of the boundary separation (State #3)",
      "Exponentially decaying with time constant τ = L/R or RC (State #3)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #3)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #3)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #3)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #3)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #3)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Semiconductor Electronics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Semiconductor Electronics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2021",
    "year": 2021,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c14-q4",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Semiconductor Electronics",
    "topic": "Semiconductor Electronics - High Yield Application 4",
    "difficulty": "Medium",
    "question": "[NEET 2020 Board/CBT] For an electromagnetic and quantum system in Semiconductor Electronics, what is the resulting magnitude when parameter value reaches state index #4?",
    "questionHi": "[NEET 2020] Semiconductor Electronics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #4 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #4)",
      "Directly proportional to the inverse square of the boundary separation (State #4)",
      "Exponentially decaying with time constant τ = L/R or RC (State #4)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #4)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #4)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #4)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #4)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #4)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Semiconductor Electronics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Semiconductor Electronics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2020",
    "year": 2020,
    "recommendedTimeSeconds": 90
  },
  {
    "id": "phy-12-c14-q5",
    "exam": "RBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Semiconductor Electronics",
    "topic": "Semiconductor Electronics - High Yield Application 5",
    "difficulty": "Easy",
    "question": "[RBSE 2025 Board/CBT] For an electromagnetic and quantum system in Semiconductor Electronics, what is the resulting magnitude when parameter value reaches state index #5?",
    "questionHi": "[RBSE 2025] Semiconductor Electronics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #5 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #5)",
      "Directly proportional to the inverse square of the boundary separation (State #5)",
      "Exponentially decaying with time constant τ = L/R or RC (State #5)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #5)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #5)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #5)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #5)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #5)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Semiconductor Electronics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Semiconductor Electronics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "RBSE Official 2025",
    "year": 2025,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c14-q6",
    "exam": "CBSE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Semiconductor Electronics",
    "topic": "Semiconductor Electronics - High Yield Application 6",
    "difficulty": "Hard",
    "question": "[CBSE 2024 Board/CBT] For an electromagnetic and quantum system in Semiconductor Electronics, what is the resulting magnitude when parameter value reaches state index #6?",
    "questionHi": "[CBSE 2024] Semiconductor Electronics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #6 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #6)",
      "Directly proportional to the inverse square of the boundary separation (State #6)",
      "Exponentially decaying with time constant τ = L/R or RC (State #6)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #6)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #6)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #6)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #6)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #6)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Semiconductor Electronics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Semiconductor Electronics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "CBSE Official 2024",
    "year": 2024,
    "recommendedTimeSeconds": 120
  },
  {
    "id": "phy-12-c14-q7",
    "exam": "JEE",
    "class": "12",
    "subject": "Physics",
    "chapter": "Semiconductor Electronics",
    "topic": "Semiconductor Electronics - High Yield Application 7",
    "difficulty": "Easy",
    "question": "[JEE 2023 Board/CBT] For an electromagnetic and quantum system in Semiconductor Electronics, what is the resulting magnitude when parameter value reaches state index #7?",
    "questionHi": "[JEE 2023] Semiconductor Electronics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #7 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #7)",
      "Directly proportional to the inverse square of the boundary separation (State #7)",
      "Exponentially decaying with time constant τ = L/R or RC (State #7)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #7)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #7)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #7)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #7)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #7)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Semiconductor Electronics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Semiconductor Electronics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "JEE Official 2023",
    "year": 2023,
    "recommendedTimeSeconds": 60
  },
  {
    "id": "phy-12-c14-q8",
    "exam": "NEET",
    "class": "12",
    "subject": "Physics",
    "chapter": "Semiconductor Electronics",
    "topic": "Semiconductor Electronics - High Yield Application 8",
    "difficulty": "Medium",
    "question": "[NEET 2022 Board/CBT] For an electromagnetic and quantum system in Semiconductor Electronics, what is the resulting magnitude when parameter value reaches state index #8?",
    "questionHi": "[NEET 2022] Semiconductor Electronics में विद्युत चुम्बकीय अथवा क्वांटम निकाय के लिए, जब प्राचल मान अवस्था सूचकांक #8 पर पहुँचता है, तो परिणामी मान क्या होगा?",
    "options": [
      "Proportional to the square root of the applied field ratio (State #8)",
      "Directly proportional to the inverse square of the boundary separation (State #8)",
      "Exponentially decaying with time constant τ = L/R or RC (State #8)",
      "Identically equal to the unperturbed vacuum permittivity ε₀ (State #8)"
    ],
    "optionsHi": [
      "लागू क्षेत्र अनुपात के वर्गमूल के समानुपाती (अवस्था #8)",
      "सीमा पृथक्करण के व्युत्क्रम वर्ग के समानुपाती (अवस्था #8)",
      "समय नियतांक τ = L/R या RC के साथ चरघातांकी रूप से क्षयमान (अवस्था #8)",
      "अपरिवर्तित निर्वात विद्युतशीलता ε₀ के समान (अवस्था #8)"
    ],
    "correctAnswer": 0,
    "explanation": "In standard electrodynamics and modern physics for Semiconductor Electronics, field solutions demonstrate quadratic and square-root dependencies in accordance with Gauss, Ampere, and Maxwell boundary formulations.",
    "concept": "Field Equations and Potentials in Semiconductor Electronics",
    "importantPoint": "Verify dimensional consistency and boundary continuity across interface planes.",
    "source": "NEET Official 2022",
    "year": 2022,
    "recommendedTimeSeconds": 90
  }
];
