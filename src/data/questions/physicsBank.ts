import { Question } from "../../types";

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
  }
];
