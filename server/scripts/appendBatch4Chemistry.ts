import fs from 'fs';
import path from 'path';

const batch4Modules: any[] = [
  // =========================================================================
  // CLASS 12 - CHAPTER 16: SOLUTIONS
  // =========================================================================
  {
    id: "chem-12-sol-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Solutions",
    topic: "Henry's Law & Raoult's Law (Vapour Pressure)",
    weightage: "High",
    examTarget: "Both",
    concept: "Henry's law governs gas solubility in liquids (p = K_H x). Raoult's law states partial vapour pressure of volatile component is proportional to its mole fraction: p_A = p°_A x_A.",
    shortNotes: [
      "Henry's law: p = K_H · x. Higher K_H at same pressure indicates LOWER solubility. K_H increases with temperature, so gas solubility in liquid DECREASES with heating (aquatic life thrives in cold water).",
      "Raoult's law for binary volatile solution: P_total = p_A + p_B = p°_A x_A + p°_B x_B = p°_A + (p°_B - p°_A) x_B.",
      "Mole fraction in vapour phase (Dalton's law): y_A = p_A / P_total; y_B = p_B / P_total.",
      "Ideal solution: Δ_mix H = 0, Δ_mix V = 0, Δ_mix S > 0, obeys Raoult's law across entire composition (e.g. Benzene + Toluene, n-Hexane + n-Heptane, Bromoethane + Chloroethane).",
      "Positive deviation: A-B attraction < A-A and B-B; Vapour pressure higher than Raoult's; Δ_mix H > 0 (endothermic), Δ_mix V > 0; Forms minimum boiling azeotrope (e.g. Ethanol + Water 95.4%, Acetone + CS₂).",
      "Negative deviation: A-B attraction > A-A and B-B (new H-bonding or dipole interactions); Vapour pressure lower; Δ_mix H < 0, Δ_mix V < 0; Forms maximum boiling azeotrope (e.g. Acetone + Chloroform, HNO₃ 68% + Water 32%)."
    ],
    formulas: [
      {
        name: "Henry's Law & Raoult's Vapour Pressure",
        formula: "p = K_H \\cdot x, \\quad P_{\\text{total}} = p_A^\\circ x_A + p_B^\\circ x_B, \\quad y_A = \\frac{p_A^\\circ x_A}{P_{\\text{total}}}",
        variables: "p = partial pressure, K_H = Henry's law constant, x = liquid mole fraction, y = vapour phase mole fraction, p° = pure component vapour pressure",
        examTip: "In liquid-vapour equilibrium, the vapour phase is ALWAYS richer in the more volatile component (component with higher pure vapour pressure p°): y_A / y_B = (p°_A / p°_B) × (x_A / x_B) (Konovalov's Rule).",
        trap: "Do not confuse liquid phase mole fraction x with vapour phase mole fraction y! 1/P_total = y_A / p°_A + y_B / p°_B."
      }
    ],
    keyPoints: [
      "Deep sea divers use helium-diluted oxygen cylinders (11.7% He, 56.2% N₂, 32.1% O₂) to avoid the painful condition known as 'the bends' (nitrogen gas bubbling out of blood).",
      "Azeotropes boil at constant temperature without change in composition and CANNOT be separated by fractional distillation."
    ]
  },
  {
    id: "chem-12-sol-2",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Solutions",
    topic: "Colligative Properties & Van 't Hoff Factor (i)",
    weightage: "High",
    examTarget: "Both",
    concept: "Colligative properties depend strictly on the number of solute particles in solution, independent of their chemical identity.",
    shortNotes: [
      "1. Relative Lowering of Vapour Pressure (RLVP): (p° - p) / p° = X_solute = n / (n + N) ≈ n / N (for dilute).",
      "2. Elevation of Boiling Point: ΔT_b = T_b - T_b° = i · K_b · m. (K_b = molal elevation / ebullioscopic constant; for water K_b = 0.52 K·kg/mol).",
      "3. Depression of Freezing Point: ΔT_f = T_f° - T_f = i · K_f · m. (K_f = molal depression / cryoscopic constant; for water K_f = 1.86 K·kg/mol).",
      "4. Osmotic Pressure: π = i · C · R · T = i · (n / V) · R · T.",
      "Van 't Hoff Factor (i) = Normal Molar Mass / Abnormal Observed Molar Mass = Total moles of particles after dissociation or association / Initial moles of solute.",
      "Degree of Dissociation (α): i = 1 + (n - 1)α ⇒ α = (i - 1) / (n - 1) (where n is number of ions produced per formula unit).",
      "Degree of Association (α): i = 1 + (1/n - 1)α ⇒ α = (1 - i) / (1 - 1/n) (where n is polymer degree, e.g. n=2 for dimerization of benzoic acid in benzene)."
    ],
    formulas: [
      {
        name: "Four Colligative Property Master Equations",
        formula: "\\frac{p^\\circ - p}{p^\\circ} = i \\frac{n_{\\text{solute}}}{n_{\\text{solute}} + n_{\\text{solvent}}}, \\quad \\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\pi = i C R T",
        variables: "p° = pure vapour pressure, m = molality (mol/kg solvent), C = molarity (mol/L), K_b = 0.52, K_f = 1.86, R = 0.0821 L·atm/mol·K, T = Kelvin",
        examTip: "To compare boiling points or freezing points of different solutions, compare the product (i × m)! Higher (i × m) ⇒ Higher Boiling Point, but LOWER Freezing Point!",
        trap: "ΔT_f = T_f(solvent) - T_f(solution)! For water, freezing point of solution is NEGATIVE in °C: T_f = -ΔT_f (e.g. if ΔT_f = 3.72, Freezing point = -3.72°C)."
      },
      {
        name: "Van 't Hoff Factor Dissociation & Association",
        formula: "\\text{Dissociation: } \\alpha = \\frac{i - 1}{n - 1}, \\quad \\text{Association: } \\alpha = \\frac{1 - i}{1 - 1/n}",
        variables: "n = number of particles per formula unit (e.g. BaCl₂: n=3; K₄[Fe(CN)₆]: n=5; Acetic acid dimerization: n=2)",
        examTip: "For complete 100% dissociation (α = 1): NaCl (i=2), CaCl₂ (i=3), Al₂(SO₄)₃ (i=5).",
        trap: "In non-polar solvents like benzene, carboxylic acids dimerize completely via intermolecular hydrogen bonding: i = 1 - α/2 ≈ 0.5 (observed molecular weight is DOUBLE the true formula weight!)."
      }
    ],
    keyPoints: [
      "Osmotic pressure is the most accurate colligative property for determining molecular weights of biomolecules, polymers, and proteins because measurements are carried out at room temperature with high sensitivity.",
      "Reverse Osmosis occurs when external pressure applied to solution side exceeds osmotic pressure (P > π): pure solvent flows from solution into solvent across semipermeable membrane (used in desalination of seawater using cellulose acetate membranes)."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 17: ELECTROCHEMISTRY
  // =========================================================================
  {
    id: "chem-12-ele-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Electrochemistry",
    topic: "Galvanic Cells, Standard Potentials & Nernst Equation",
    weightage: "High",
    examTarget: "Both",
    concept: "Galvanic cell converts spontaneous chemical redox energy into electrical energy. Nernst equation calculates cell potential under non-standard conditions.",
    shortNotes: [
      "Standard Hydrogen Electrode (SHE): Standard reduction potential arbitrarily assigned as 0.00 V at 298 K, 1 bar H₂, 1 M H⁺.",
      "Cell representation: Anode (Oxidation) on LEFT, Cathode (Reduction) on RIGHT: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s). (LOAN mnemonic: Left, Oxidation, Anode, Negative).",
      "E°_cell = E°_cathode - E°_anode = E°_Right - E°_Left (both taken as Standard Reduction Potentials!).",
      "Gibbs energy change: ΔG = -n F E_cell; ΔG° = -n F E°_cell.",
      "Condition for spontaneous cell reaction: E_cell > 0 ⇒ ΔG < 0.",
      "Equilibrium constant: E°_cell = (0.0591 / n) log₁₀ K_c at 298 K.",
      "Nernst equation at 298 K: E_cell = E°_cell - (0.0591 / n) log₁₀ Q."
    ],
    formulas: [
      {
        name: "Nernst Equation at 298 K",
        formula: "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{2.303 R T}{n F} \\log_{10} Q = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10} \\left( \\frac{[\\text{Products}]^p}{[\\text{Reactants}]^r} \\right)",
        variables: "n = number of moles of electrons transferred in balanced cell reaction, F = 96485 C/mol (Faraday constant), Q = reaction quotient",
        examTip: "For Daniell cell: Zn + Cu²⁺ ⇌ Zn²⁺ + Cu (n = 2): E_cell = 1.10 V - (0.0591 / 2) log₁₀ ([Zn²⁺] / [Cu²⁺]).",
        trap: "Pure solids and pure liquids have unit activity ([Zn] = 1, [Cu] = 1) and are omitted from reaction quotient Q!"
      },
      {
        name: "Free Energy & Equilibrium Constant Relations",
        formula: "\\Delta G^\\circ = -n F E^\\circ_{\\text{cell}} = -2.303 R T \\log_{10} K_c, \\quad E^\\circ_{\\text{cell}} = \\frac{0.0591}{n} \\log_{10} K_c",
        variables: "F = 96500 C/mol, n = electron transfer number, K_c = equilibrium constant",
        examTip: "If E°_cell is POSITIVE, ΔG° is NEGATIVE, and K_c > 1 (reaction is spontaneous under standard state).",
        trap: "E° is an INTENSIVE property and does NOT depend on stoichiometric coefficients (multiplying a half-reaction by 2 does NOT double E°!); but ΔG is an EXTENSIVE property and doubles!"
      }
    ],
    keyPoints: [
      "Concentration Cell: Both electrodes are identical but immersed in different electrolyte concentrations: E°_cell = 0; E_cell = -(0.0591 / n) log(C₁ / C₂). Spontaneous when C₂ > C₁.",
      "Salt bridge contains agar-agar jelly with inert electrolyte (KCl, KNO₃, NH₄NO₃) where ionic mobilities of cation and anion are virtually equal. Maintains electrical neutrality and prevents liquid junction potential."
    ]
  },
  {
    id: "chem-12-ele-2",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Electrochemistry",
    topic: "Conductance, Kohlrausch's Law & Faraday's Laws",
    weightage: "High",
    examTarget: "Both",
    concept: "Electrolytic conductance measures movement of ions in solution. Kohlrausch's law determines limiting molar conductivity of weak electrolytes.",
    shortNotes: [
      "Conductance G = 1 / R [Siemens, S = Ω⁻¹].",
      "Conductivity (Specific Conductance) κ = G × (l / A) = (1 / R) × G* (where G* = l / A is cell constant in cm⁻¹ or m⁻¹). Units of κ: S·cm⁻¹ or S·m⁻¹.",
      "Molar Conductivity Λ_m = (1000 × κ) / M [S·cm²·mol⁻¹].",
      "Effect of Dilution: Conductivity (κ) DECREASES with dilution because number of current-carrying ions per unit volume decreases; Molar conductivity (Λ_m) INCREASES with dilution due to reduction in interionic attractions (for strong) and increase in degree of dissociation (for weak electrolytes).",
      "Debye-Hückel-Onsager equation for strong electrolytes: Λ_m = Λ_m° - A √C.",
      "Kohlrausch's Law: At infinite dilution, limiting molar conductivity of an electrolyte is the sum of individual contributions of its ions: Λ_m°(A_x B_y) = x λ°_A + y λ°_B.",
      "Degree of dissociation of weak electrolyte: α = Λ_m / Λ_m°; K_a = C α² / (1 - α) = C (Λ_m / Λ_m°)² / [1 - (Λ_m / Λ_m°)].",
      "Faraday's 1st Law: Mass deposited W = Z · I · t = (E / 96500) · Q.",
      "Faraday's 2nd Law: When same quantity of electricity is passed through different solutions: W₁ / W₂ = E₁ / E₂."
    ],
    formulas: [
      {
        name: "Conductance & Cell Constant Equations",
        formula: "\\kappa = \\frac{1}{R} \\left( \\frac{l}{A} \\right) = G \\cdot G^*, \\quad \\Lambda_m = \\frac{\\kappa \\times 1000}{M} \\; (\\text{in S}\\cdot\\text{cm}^2/\\text{mol}) = \\frac{\\kappa}{1000 \\times M} \\; (\\text{in S}\\cdot\\text{m}^2/\\text{mol})",
        variables: "R = resistance in ohms, G* = l/A = cell constant (cm⁻¹), M = molarity (mol/L), κ = conductivity",
        examTip: "Kohlrausch example: Λ_m°(CH₃COOH) = Λ_m°(CH₃COONa) + Λ_m°(HCl) - Λ_m°(NaCl).",
        trap: "In Λ_m = 1000 κ / M, κ must be in S·cm⁻¹! If κ is given in S·m⁻¹, convert to S·cm⁻¹ (1 S/m = 10⁻² S/cm) or use SI units."
      },
      {
        name: "Faraday's Electrolysis Master Equation",
        formula: "w = Z \\cdot I \\cdot t = \\frac{M}{n F} \\cdot I \\cdot t = \\frac{E}{96500} \\cdot Q",
        variables: "w = mass deposited in grams, Z = electrochemical equivalent = E / 96500, I = current in Amperes, t = time in seconds, n = number of electrons involved in electrode half-reaction",
        examTip: "1 Faraday (96500 C) deposits 1 gram equivalent of ANY substance (e.g. 108 g Ag⁺, 31.75 g Cu²⁺, 9 g Al³⁺).",
        trap: "Always convert time t into SECONDS! If time is given as 1 hour, t = 3600 seconds."
      }
    ],
    keyPoints: [
      "Commercial Batteries: Lead storage battery (Anode: Pb, Cathode: PbO₂, Electrolyte: 38% H₂SO₄; during discharge: PbSO₄ forms on both electrodes and density of H₂SO₄ drops below 1.20 g/mL).",
      "Hydrogen-Oxygen Fuel Cell: Anode: 2 H₂ + 4 OH⁻ → 4 H₂O + 4 e⁻; Cathode: O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻; Net: 2 H₂ + O₂ → 2 H₂O (Efficiency ~70%, pollution-free, water product used by Apollo astronauts)."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 18: CHEMICAL KINETICS
  // =========================================================================
  {
    id: "chem-12-kin-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Chemical Kinetics",
    topic: "Rate Law, Order of Reaction & Integrated Rate Equations",
    weightage: "High",
    examTarget: "Both",
    concept: "Rate of reaction is change in concentration per unit time. Order is experimental sum of powers of concentrations in rate law: Rate = k [A]^x [B]^y.",
    shortNotes: [
      "Rate of reaction for aA + bB → cC: r = -(1/a) d[A]/dt = -(1/b) d[B]/dt = +(1/c) d[C]/dt.",
      "Units of rate constant k: (mol/L)^(1-n) · time⁻¹ (where n is overall order).",
      "Zero Order (n=0): Rate = k. Units of k: mol·L⁻¹·s⁻¹. Integrated equation: [A]_t = [A]_0 - kt. Half-life: t₁/₂ = [A]_0 / (2k). t₁/₂ ∝ [A]_0.",
      "First Order (n=1): Rate = k[A]. Units of k: s⁻¹ (time⁻¹). Integrated equation: k = (2.303 / t) log₁₀ ([A]_0 / [A]_t). Half-life: t₁/₂ = 0.693 / k. t₁/₂ is INDEPENDENT of initial concentration!",
      "General nth order half-life relation: t₁/₂ ∝ 1 / [A]_0^(n-1).",
      "Pseudo First-Order Reaction: High order reaction behaving as first order when one reactant is present in large excess (e.g. Acid-catalyzed hydrolysis of ethyl acetate: CH₃COOC₂H₅ + H₂O(excess) → CH₃COOH + C₂H₅OH; Inversion of cane sugar)."
    ],
    formulas: [
      {
        name: "First Order Integrated Rate & Half-Life Equations",
        formula: "k = \\frac{2.303}{t} \\log_{10} \\left( \\frac{[A]_0}{[A]_t} \\right) = \\frac{1}{t} \\ln \\left( \\frac{a}{a - x} \\right), \\quad t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{k}",
        variables: "k = rate constant (s⁻¹ or min⁻¹), [A]₀ = initial concentration, [A]_t = concentration remaining at time t",
        examTip: "For 1st order: t₉₉.₉% = 10 × t₁/₂; t₉₉% = 2 × t₉₀% = 6.64 × t₁/₂; t₇₅% = 2 × t₁/₂.",
        trap: "In formula, [A]_t is the concentration of reactant REMAINING, NOT the amount reacted (x)! If 80% reacts, [A]_t = 20% of [A]₀."
      },
      {
        name: "General nth Order Half-Life & Rate Constant Units",
        formula: "t_{1/2} \\propto \\frac{1}{[A]_0^{n - 1}}, \\quad \\text{Units of } k = \\left( \\frac{\\text{mol}}{\\text{L}} \\right)^{1 - n} \\text{s}^{-1}",
        variables: "n = order of reaction (0, 1, 2, 3... or fractional)",
        examTip: "If doubling initial concentration doubles half-life: n = 0. If doubling [A]₀ has no effect on t₁/₂: n = 1. If doubling [A]₀ halves t₁/₂: n = 2.",
        trap: "Molecularity can NEVER be zero, negative, or fractional; it must be a positive integer (1, 2, 3). Order CAN be zero, negative, or fractional!"
      }
    ],
    keyPoints: [
      "All radioactive decay processes follow first-order kinetics strictly.",
      "For gaseous first-order reaction A(g) → B(g) + C(g): k = (2.303 / t) log₁₀ [P_i / (2P_i - P_t)], where P_i is initial pressure and P_t is total pressure at time t."
    ]
  },
  {
    id: "chem-12-kin-2",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Chemical Kinetics",
    topic: "Arrhenius Equation & Activation Energy",
    weightage: "High",
    examTarget: "Both",
    concept: "Arrhenius equation quantifies the temperature dependence of reaction rates: k = A e^(-E_a / RT), based on the fraction of collisions having energy ≥ E_a.",
    shortNotes: [
      "Temperature coefficient: Ratio of rate constants at two temperatures differing by 10°C: μ = k_(T+10) / k_T ≈ 2 to 3. Rate roughly doubles or triples for every 10°C rise.",
      "Activation Energy (E_a): Minimum extra kinetic energy reacting molecules must possess above their average energy to form the activated transition state complex.",
      "Arrhenius plot: Graph of ln k vs 1/T is a straight line with slope = -E_a / R and y-intercept = ln A. Graph of log₁₀ k vs 1/T has slope = -E_a / (2.303 R).",
      "Catalyst lowers activation energy (E_a) by providing an alternate reaction pathway; it accelerates both forward and reverse rates equally without changing ΔH or equilibrium constant K."
    ],
    formulas: [
      {
        name: "Arrhenius Two-Temperature Equation",
        formula: "\\log_{10} \\left( \\frac{k_2}{k_1} \\right) = \\frac{E_a}{2.303 R} \\left[ \\frac{1}{T_1} - \\frac{1}{T_2} \\right] = \\frac{E_a}{2.303 R} \\left[ \\frac{T_2 - T_1}{T_1 T_2} \\right]",
        variables: "k₁, k₂ = rate constants at T₁ and T₂, E_a = activation energy in J/mol, R = 8.314 J/mol·K",
        examTip: "A reaction with higher activation energy is MORE sensitive to temperature changes (has a steeper slope on Arrhenius plot).",
        trap: "Ensure E_a is in J/mol when R = 8.314 J/mol·K is used! If E_a is given in kJ/mol, multiply by 1000."
      },
      {
        name: "Collision Theory Rate Expression",
        formula: "\\text{Rate} = Z_{AB} \\cdot e^{-E_a / R T} = P \\cdot Z_{AB} \\cdot e^{-E_a / R T}",
        variables: "Z_AB = collision frequency of reactants A and B, e^(-E_a/RT) = Boltzmann fraction of effective collisions, P = steric factor / orientation factor",
        examTip: "For effective collision: Molecules must possess threshold energy (E_threshold = Average kinetic energy + E_a) AND proper spatial orientation.",
        trap: "Endothermic reaction: E_a(forward) = E_a(backward) + ΔH ⇒ E_a(forward) > ΔH. Exothermic reaction: E_a(forward) = E_a(backward) - |ΔH|."
      }
    ],
    keyPoints: [
      "Zero activation energy (E_a = 0): Rate constant is independent of temperature (e.g. combination of free radicals ·CH₃ + ·CH₃ → C₂H₆).",
      "Catalyst increases reaction rate by factor of e^(ΔE_a / RT)."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 19: THE d- AND f-BLOCK ELEMENTS
  // =========================================================================
  {
    id: "chem-12-dfb-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "The d- and f-Block Elements",
    topic: "Transition Metal Trends, Magnetic Moments & Potassium Permanganate",
    weightage: "High",
    examTarget: "Both",
    concept: "Transition metals have incompletely filled (n-1)d subshells, exhibiting variable oxidation states, catalytic properties, colored complex ions, and interstitial compound formation.",
    shortNotes: [
      "Zn, Cd, Hg have fully filled (n-1)d¹⁰ configurations in atomic and common oxidation states, so they are not considered true transition elements.",
      "Density increases across 3d series up to Cu; Osmium (Os, d = 22.57 g/cm³) and Iridium (Ir, d = 22.61 g/cm³) have the highest densities.",
      "Highest oxidation state in 3d series is +7 for Manganese (KMnO₄); in 4d/5d it is +8 for Ruthenium and Osmium (RuO₄, OsO₄).",
      "Lanthanoid Contraction: Steady decrease in atomic and ionic radii from Lanthanum (La, Z=57) to Lutetium (Lu, Z=71) caused by poor shielding of 4f electrons. Consequence: 4d and 5d metals of same group have almost identical radii (Zr ≈ Hf = 160 pm; Nb ≈ Ta; Mo ≈ W).",
      "Potassium Permanganate (KMnO₄): Dark purple crystalline solid. Strong oxidizing agent. Prepared from Pyrolusite ore (MnO₂): 2 MnO₂ + 4 KOH + O₂ → 2 K₂MnO₄ (Green manganate) + 2 H₂O; 3 MnO₄²⁻ + 4 H⁺ → 2 MnO₄⁻ (Purple) + MnO₂ + 2 H₂O."
    ],
    formulas: [
      {
        name: "Spin-Only Magnetic Moment Formula",
        formula: "\\mu = \\sqrt{n(n + 2)} \\text{ BM}, \\quad \\text{where } n = \\text{number of unpaired electrons}",
        variables: "n = 1 → 1.73 BM, n = 2 → 2.83 BM, n = 3 → 3.87 BM, n = 4 → 4.90 BM, n = 5 → 5.92 BM",
        examTip: "Sc³⁺, Ti⁴⁺, Cu⁺, Zn²⁺ have n = 0 (Diamagnetic, μ = 0, colorless ions); Fe³⁺ and Mn²⁺ have 3d⁵ (n = 5, μ = 5.92 BM, strongly paramagnetic).",
        trap: "In strong field ligand complexes (like [Fe(CN)₆]³⁻), electron pairing occurs in d-orbitals, reducing n and lowering the magnetic moment (low-spin complex)!"
      },
      {
        name: "KMnO4 & K2Cr2O7 Redox Stoichiometry",
        formula: "\\text{Acidic KMnO}_4: \\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\to \\text{Mn}^{2+} + 4\\text{H}_2\\text{O} \\; (n=5); \\quad \\text{Acidic K}_2\\text{Cr}_2\\text{O}_7: \\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^+ + 6e^- \\to 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O} \\; (n=6)",
        variables: "Equivalent weight E = M / 5 for KMnO₄ in acidic medium; E = M / 6 for K₂Cr₂O₇ in acidic medium",
        examTip: "KMnO₄ acts as its own self-indicator in titrations because faint pink color of excess MnO₄⁻ signals endpoint.",
        trap: "K₂Cr₂O₇ in alkaline medium turns YELLOW due to chromate conversion: Cr₂O₇²⁻ (Orange) + 2 OH⁻ ⇌ 2 CrO₄²⁻ (Yellow) + H₂O. Reaction is reversible upon adding acid!"
      }
    ],
    keyPoints: [
      "Color of transition metal ions is primarily due to d-d electronic transitions. Exception: MnO₄⁻ (purple) and Cr₂O₇²⁻ (orange) have no d-electrons (d⁰); their intense color is due to Charge Transfer (Ligand to Metal Charge Transfer, LMCT)!",
      "Alloy formation: Transition metals readily form alloys (Brass Cu-Zn, Bronze Cu-Sn, Steel) due to similar atomic radii (within 15% Hume-Rothery rule)."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 20: COORDINATION COMPOUNDS
  // =========================================================================
  {
    id: "chem-12-cor-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Coordination Compounds",
    topic: "Crystal Field Theory (CFT) & Coordination Isomerism",
    weightage: "High",
    examTarget: "Both",
    concept: "CFT treats metal-ligand interaction as electrostatic point charges. Ligand field splits degenerate d-orbitals into t_2g and e_g sets.",
    shortNotes: [
      "Octahedral splitting (Δ_o): d_xy, d_yz, d_zx (t_2g) are stabilized by -0.4 Δ_o (-2/5 Δ_o); d_x²-y², d_z² (e_g) are destabilized by +0.6 Δ_o (+3/5 Δ_o).",
      "Tetrahedral splitting (Δ_t): Inverted splitting. Δ_t = (4/9) Δ_o. Because Δ_t is small, pairing energy P > Δ_t always: ALL tetrahedral complexes are HIGH SPIN!",
      "Spectrochemical Series (Ligand Field Strength): I⁻ < Br⁻ < S²⁻ < SCN⁻ < Cl⁻ < N₃⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < EDTA⁴⁻ < NH₃ < en < NO₂⁻ < CN⁻ < CO.",
      "Strong field ligands (CN⁻, CO, NO₂⁻, en) cause pairing: Δ_o > P ⇒ Low Spin (Inner orbital complex d²sp³).",
      "Weak field ligands (halides, H₂O, OH⁻) do not pair: Δ_o < P ⇒ High Spin (Outer orbital complex sp³d²).",
      "Crystal Field Stabilization Energy (CFSE) = [-0.4 n(t_2g) + 0.6 n(e_g)] Δ_o + m P."
    ],
    formulas: [
      {
        name: "CFSE Octahedral Energy Calculation",
        formula: "\\text{CFSE} = \\left[ -0.4 \\times n_{t_{2g}} + 0.6 \\times n_{e_g} \\right] \\Delta_o + m P",
        variables: "n(t_2g), n(e_g) = number of electrons in t_2g and e_g sets, P = pairing energy, m = number of extra electron pairs",
        examTip: "For d⁶ in strong field ([Fe(CN)₆]⁴⁻, t_2g⁶ e_g⁰): CFSE = -0.4 × 6 Δ_o + 2P = -2.4 Δ_o + 2P (Diamagnetic, μ = 0).",
        trap: "In weak field ([Fe(H₂O)₆]²⁺, t_2g⁴ e_g²): CFSE = (-0.4×4 + 0.6×2) Δ_o = -0.4 Δ_o (Paramagnetic with 4 unpaired electrons, μ = 4.90 BM)."
      },
      {
        name: "Coordination Isomerism Identification",
        formula: "\\text{Linkage: } [\\text{Co}(\\text{NH}_3)_5(\\text{NO}_2)]^{2+} \\text{ (Nitro, yellow)} \\;\\text{vs}\\; [\\text{Co}(\\text{NH}_3)_5(\\text{ONO})]^{2+} \\text{ (Nitrito, red)}",
        variables: "Ambidentate ligands (NO₂⁻ / ONO⁻, SCN⁻ / NCS⁻, CN⁻ / NC⁻) give linkage isomerism",
        examTip: "Ionization isomerism: [Co(NH₃)₅Br]SO₄ (gives white ppt with BaCl₂) vs [Co(NH₃)₅(SO₄)]Br (gives pale yellow ppt with AgNO₃).",
        trap: "Geometrical cis-trans: [Pt(NH₃)₂Cl₂] (Square planar): cis-platin is an antitumor anticancer drug, trans-isomer is inactive. Tetrahedral complexes NEVER show geometrical isomerism!"
      }
    ],
    keyPoints: [
      "Chelate effect: Polydentate ligands like EDTA⁴⁻ and en form stable ring structures with central metal, imparting much higher thermodynamic stability than monodentate ligands.",
      "Synergic bonding in metal carbonyls [M(CO)_x]: σ-donation from CO lone pair into vacant metal d-orbital + π-backbonding from filled metal d-orbital into vacant antibonding π* orbital of CO strengthens M-C bond and weakens C-O bond (decreases C-O stretching frequency in IR spectroscopy)."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 21: HALOALKANES AND HALOARENES
  // =========================================================================
  {
    id: "chem-12-hal-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Haloalkanes and Haloarenes",
    topic: "SN1 vs SN2 Mechanisms & Stereochemistry",
    weightage: "High",
    examTarget: "Both",
    concept: "Nucleophilic substitution: SN1 proceeds via two-step carbocation intermediate; SN2 proceeds via single-step bimolecular transition state with backside attack.",
    shortNotes: [
      "SN1: Rate = k [R-X] (First order kinetics). Two steps: 1. Slow rate-determining departure of leaving group forming planar carbocation; 2. Fast nucleophile attack from both faces.",
      "Stereochemistry of SN1: RACEMIZATION (with partial inversion).",
      "Reactivity order for SN1: 3° > 2° > 1° > CH₃X (Allylic and Benzylic halides are exceptionally reactive due to resonance-stabilized carbocations).",
      "Solvent: Polar protic solvents (H₂O, Alcohols) favor SN1 by solvating leaving group.",
      "SN2: Rate = k [R-X] [Nu⁻] (Second order kinetics). Single-step concerted mechanism via pentacoordinate transition state.",
      "Stereochemistry of SN2: COMPLETE WALDEN INVERSION (Inversion of configuration like an umbrella in a gale).",
      "Reactivity order for SN2: CH₃X > 1° > 2° > 3° (Steric hindrance dominates: 3° alkyl halides NEVER undergo SN2!).",
      "Solvent: Polar aprotic solvents (Acetone, DMSO, DMF) favor SN2 by enhancing nucleophile nucleophilicity."
    ],
    formulas: [
      {
        name: "SN1 vs SN2 Kinetic Comparison",
        formula: "\\text{S}_N1: \\text{Rate} = k [\\text{R-X}]^1 [\\text{Nu}]^0, \\quad \\text{S}_N2: \\text{Rate} = k [\\text{R-X}]^1 [\\text{Nu}]^1",
        variables: "SN2 rate doubles if nucleophile concentration is doubled; SN1 rate is unaffected by nucleophile concentration",
        examTip: "Finkelstein Reaction: R-Cl/R-Br + NaI (dry acetone) → R-I + NaCl↓ (precipitated NaCl drives reaction forward via Le Chatelier).",
        trap: "Swarts Reaction prepares fluoroalkanes: R-Cl + AgF (or CoF₃, SbF₃, Hg₂F₂) → R-F + AgCl↓."
      }
    ],
    keyPoints: [
      "Ambident nucleophiles: KCN (ionic, C-attack gives Cyanide R-CN as major); AgCN (covalent, N-attack gives Isocyanide R-NC as major!).",
      "KNO₂ (ionic, O-attack gives Alkyl nitrite R-O-N=O); AgNO₂ (covalent, N-attack gives Nitroalkane R-NO₂ as major!)."
    ]
  },
  {
    id: "chem-12-hal-2",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Haloalkanes and Haloarenes",
    topic: "Haloarenes Reactivity & Benzyne Mechanism",
    weightage: "High",
    examTarget: "Both",
    concept: "Aryl halides (like Chlorobenzene) are extremely unreactive towards nucleophilic substitution under normal conditions.",
    shortNotes: [
      "Reasons for low reactivity of haloarenes towards nucleophilic substitution:",
      "1. Resonance Effect: Lone pair of halogen is conjugated with benzene ring, imparting partial double bond character to C-Cl bond (shorter 1.69 Å and stronger than 1.77 Å in R-Cl).",
      "2. Hybridization of Carbon: C attached to halogen is sp² hybridized (33% s-character, more electronegative, holds electrons tighter than sp³ in alkyl halides).",
      "3. Instability of Phenyl Cation: Phenyl cation cannot be resonance stabilized.",
      "4. Electronic Repulsion: Electron-rich benzene ring repels approaching electron-rich nucleophiles.",
      "Activation by Electron-Withdrawing Groups (-NO₂): Introducing -NO₂ at Ortho and Para positions drastically increases reactivity towards nucleophilic substitution by stabilizing the carbanion intermediate (Meisenheimer complex).",
      "Meta-nitro group has NO activating effect because negative charge in resonance structures never falls on carbon bearing meta-NO₂!"
    ],
    formulas: [
      {
        name: "Dow Process & Activated Nucleophilic Substitution",
        formula: "\\text{C}_6\\text{H}_5\\text{Cl} \\xrightarrow{1.\\; \\text{NaOH}, \\; 623 \\text{ K}, \\; 300 \\text{ atm}} \\xrightarrow{2.\\; \\text{H}^+} \\text{C}_6\\text{H}_5\\text{OH} \\; (\\text{Phenol})",
        variables: "Drastic conditions required for unactivated chlorobenzene; 2,4,6-Trinitrochlorobenzene hydrolyzes in warm water!",
        examTip: "Picryl chloride (2,4,6-trinitrochlorobenzene) gives Picric acid (2,4,6-trinitrophenol) simply by warming with warm water at 40°C!",
        trap: "Chlorobenzene reacts with KNH₂ in liquid NH₃ via ELIMINATION-ADDITION (Benzyne intermediate containing formal triple bond), giving a mixture of aniline isomers (cine-substitution)!"
      }
    ],
    keyPoints: [
      "Wurtz-Fittig Reaction: R-X + Ar-X + 2 Na (dry ether) → Ar-R + 2 NaX (Alkylarene).",
      "Fittig Reaction: 2 Ar-X + 2 Na (dry ether) → Ar-Ar (Biphenyl) + 2 NaX."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 22: ALCOHOLS, PHENOLS AND ETHERS
  // =========================================================================
  {
    id: "chem-12-ape-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Alcohols, Phenols and Ethers",
    topic: "Alcohols: Lucas Test, Dehydration Mechanism & Acidity",
    weightage: "High",
    examTarget: "Both",
    concept: "Alcohols (R-OH) act as both weak Bronsted acids and weak Lewis bases. Dehydration produces alkenes via carbocation intermediates.",
    shortNotes: [
      "Acidity of Alcohols: Water is MORE acidic than alcohols (except Methanol): H₂O > R-OH. Acidity order among alcohols: CH₃OH > 1° > 2° > 3° (due to +I destabilization of alkoxide RO⁻).",
      "Lucas Test (Distinction of 1°, 2°, 3° Alcohols): Reagent: Anhydrous ZnCl₂ + concentrated HCl (forms insoluble alkyl chloride turbidity).",
      "3° Alcohol: Immediate cloudiness / turbidity within seconds.",
      "2° Alcohol: Turbidity appears within 5 minutes.",
      "1° Alcohol: No turbidity at room temperature; appears only on prolonged heating.",
      "Dehydration of Alcohols: H₂SO₄ at 443 K (170°C) gives Alkene (E1 elimination via carbocation); H₂SO₄ at 413 K (140°C) gives Ether (SN2 nucleophilic bimolecular substitution).",
      "Ease of dehydration: 3° > 2° > 1° (Saytzeff's rule: more substituted alkene is major product)."
    ],
    formulas: [
      {
        name: "Dehydration Temperature Control",
        formula: "2 \\text{ C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{H}_2\\text{SO}_4, \\; 413 \\text{ K}} \\text{C}_2\\text{H}_5\\text{OC}_2\\text{H}_5 + \\text{H}_2\\text{O}, \\quad \\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{H}_2\\text{SO}_4, \\; 443 \\text{ K}} \\text{CH}_2=\\text{CH}_2 + \\text{H}_2\\text{O}",
        variables: "Low temperature favors intermolecular SN2 ether formation; High temperature favors intramolecular E1 elimination alkene",
        examTip: "Victor Meyer Test: 1° Alcohol gives Blood Red color; 2° Alcohol gives Blue color; 3° Alcohol remains Colorless ('R-B-C' mnemonic).",
        trap: "Dehydration of 2-Methylpropan-1-ol undergoes hydride shift: (CH₃)₂CH-CH₂OH → (CH₃)₂C=CH₂ (Isobutylene major)!"
      }
    ],
    keyPoints: [
      "Hydroboration-Oxidation of alkenes gives anti-Markovnikov hydration alcohol with NO carbocation rearrangement.",
      "Oxymercuration-Demercuration gives Markovnikov alcohol without rearrangement."
    ]
  },
  {
    id: "chem-12-ape-2",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Alcohols, Phenols and Ethers",
    topic: "Phenols & Ethers: Kolbe, Reimer-Tiemann & Williamson",
    weightage: "High",
    examTarget: "Both",
    concept: "Phenols are significantly more acidic than alcohols (pKa ≈ 10 vs 16) due to resonance stabilization of phenoxide ion (C₆H₅O⁻).",
    shortNotes: [
      "Acidity order: Carboxylic acid (pKa ≈ 5) > Carbonic acid H₂CO₃ (pKa ≈ 6.4) > o-Nitrophenol > p-Nitrophenol > m-Nitrophenol > Phenol (pKa ≈ 10) > H₂O (pKa ≈ 15.7) > Alcohols (pKa ≈ 16). Phenol dissolves in NaOH, but NOT in NaHCO₃ (does not release CO₂).",
      "Reimer-Tiemann Reaction: Phenol + CHCl₃ + aq. NaOH (340 K) followed by acidification → Salicylaldehyde (o-hydroxybenzaldehyde). Electrophile: Dichlorocarbene (:CCl₂).",
      "Kolbe's Reaction: Sodium phenoxide (C₆H₅ONa) + CO₂ (4-7 atm, 400 K) followed by H⁺ → Salicylic acid (o-hydroxybenzoic acid, precursor to Aspirin).",
      "Cumene Process (Industrial Phenol): Isopropylbenzene (Cumene) oxidized by O₂ → Cumene hydroperoxide, which upon acid cleavage (dil. H₂SO₄) yields Phenol + Acetone (valuable byproduct!).",
      "Williamson Ether Synthesis: R-X + R'-ONa → R-O-R' + NaX. Best for preparing unsymmetrical ethers. R-X MUST BE 1° or methyl! If 3° alkyl halide is used, ELIMINATION dominates producing alkene exclusively."
    ],
    formulas: [
      {
        name: "Cleavage of Ethers by Hydrogen Iodide (HI)",
        formula: "\\text{R-O-R'} + \\text{HI} \\to \\text{R-OH} + \\text{R'-I} \\; (\\text{Cold}), \\quad \\text{R-O-R'} + 2 \\text{HI} \\to \\text{R-I} + \\text{R'-I} + \\text{H}_2\\text{O} \\; (\\text{Excess Hot})",
        variables: "For unsymmetrical ethers: If alkyl groups are 1° or 2°, mechanism is SN2 (Iodine attacks LESS hindered primary alkyl group); If one group is 3° (tert-butyl) or benzylic, mechanism is SN1 (Iodine attacks 3° carbon forming tertiary iodide)!",
        examTip: "Anisole (C₆H₅-O-CH₃) + HI → Phenol (C₆H₅OH) + CH₃I (NOT iodobenzene, because Ar-O bond has partial double bond character and never cleaves).",
        trap: "In Williamson synthesis: (CH₃)₃C-ONa + CH₃-Br gives (CH₃)₃C-O-CH₃ (Ether, SN2 works!); BUT (CH₃)₃C-Br + CH₃-ONa gives (CH₃)₂C=CH₂ (Isobutylene alkene, E2 elimination dominates)!"
      }
    ],
    keyPoints: [
      "Aspirin synthesis: Salicylic acid + Acetic anhydride (H⁺) → Acetylsalicylic acid (Aspirin) + CH₃COOH.",
      "Bromine water test: Phenol + 3 Br₂ (aqueous) → 2,4,6-Tribromophenol (white precipitate) + 3 HBr."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 23: ALDEHYDES, KETONES & CARBOXYLIC ACIDS
  // =========================================================================
  {
    id: "chem-12-akc-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Aldehydes, Ketones and Carboxylic Acids",
    topic: "Nucleophilic Addition & Name Reactions (Aldol, Cannizzaro)",
    weightage: "High",
    examTarget: "Both",
    concept: "Carbonyl carbon is sp² hybridized, planar, and electrophilic due to C=O bond polarization. Aldehydes are more reactive than ketones due to steric and inductive effects.",
    shortNotes: [
      "Reactivity order towards nucleophilic addition: HCHO > CH₃CHO > CH₃COCH₃ > C₆H₅CHO > C₆H₅COCH₃ > C₆H₅COC₆H₅.",
      "Nucleophilic additions: HCN (cyanohydrin), NaHSO₃ (bisulfite crystalline adduct, test for carbonyls), Grignard reagent (HCHO → 1° alc; RCHO → 2° alc; Ketone → 3° alc), Alcohols (hemiacetal / acetal, ketal).",
      "Nucleophilic addition-elimination with Ammonia derivatives (NH₂-Z): Hydroxylamine (Oxime >C=N-OH), Hydrazine (Hydrazone), Phenylhydrazine, 2,4-DNP (Brady's reagent, yellow/orange precipitate confirms carbonyl group), Semicarbazide (Semicarbazone).",
      "Aldol Condensation: Aldehydes or ketones containing AT LEAST ONE α-hydrogen in presence of dilute alkali (NaOH, Ba(OH)₂) form β-hydroxy carbonyl compound (Aldol), which upon heating eliminates H₂O to yield α,β-unsaturated carbonyl.",
      "Cannizzaro Reaction: Aldehydes with NO α-hydrogen (HCHO, C₆H₅CHO, (CH₃)₃C-CHO) in concentrated alkali (50% NaOH) undergo self-redox disproportionation forming 1 mole alcohol and 1 mole carboxylate salt.",
      "Haloform Reaction (Iodoform Test): Compounds with CH₃-C=O or CH₃-CH(OH)- group react with I₂ + NaOH to form yellow precipitate of Iodoform (CHI₃, m.p. 119°C)."
    ],
    formulas: [
      {
        name: "Aldol vs Cannizzaro Reaction Master Equations",
        formula: "\\text{Aldol: } 2 \\text{ CH}_3\\text{CHO} \\xrightarrow{\\text{dil. NaOH}} \\text{CH}_3\\text{CH(OH)CH}_2\\text{CHO} \\xrightarrow{\\Delta, -\\text{H}_2\\text{O}} \\text{CH}_3\\text{CH=CH-CHO} \\; (\\text{Crotonaldehyde})",
        variables: "Cannizzaro: 2 HCHO + 50% NaOH → CH₃OH + HCOONa; 2 C₆H₅CHO + 50% NaOH → C₆H₅CH₂OH + C₆H₅COONa",
        examTip: "Cross-Aldol between two different aldehydes with α-hydrogens gives 4 products; Cross-Cannizzaro with Formaldehyde ALWAYS oxidizes HCHO to Sodium formate (HCOONa), reducing the other aldehyde to alcohol!",
        trap: "In Semicarbazide (H₂N-NH-CO-NH₂), the NH₂ group attached to NH is nucleophilic; the other NH₂ adjacent to C=O is involved in resonance and cannot attack!"
      },
      {
        name: "Clemmensen vs Wolff-Kishner Carbonyl Reduction",
        formula: "\\text{Clemmensen: } >\\text{C=O} \\xrightarrow{\\text{Zn-Hg / conc. HCl}} >\\text{CH}_2, \\quad \\text{Wolff-Kishner: } >\\text{C=O} \\xrightarrow{\\text{NH}_2\\text{NH}_2, \\; \\text{KOH / ethylene glycol, } \\Delta} >\\text{CH}_2",
        variables: "Directly converts aldehyde or ketone into alkane (>C=O to >CH₂)",
        examTip: "Use Clemmensen for base-sensitive compounds; Use Wolff-Kishner for acid-sensitive compounds (e.g. compounds containing acetal or -OH groups).",
        trap: "Tollen's Test [Ag(NH₃)₂]⁺ gives silver mirror with ALL aldehydes (both aliphatic and aromatic) and Formic acid, but NOT with ketones! Fehling's solution oxidizes ALIPHATIC aldehydes only; Benzaldehyde does not reduce Fehling's."
      }
    ],
    keyPoints: [
      "Hell-Volhard-Zelinsky (HVZ) Reaction: Carboxylic acids with α-hydrogen react with X₂ (Cl₂, Br₂) in presence of red phosphorus to form α-halocarboxylic acids: R-CH₂-COOH + Br₂/Red P → R-CH(Br)-COOH.",
      "Formic acid (HCOOH) is the only carboxylic acid that shows reducing properties (reduces Tollen's, Fehling's, and KMnO₄) because it possesses both aldehyde (-CHO) and carboxyl (-COOH) functional groups."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 24: AMINES (NITROGEN COMPOUNDS)
  // =========================================================================
  {
    id: "chem-12-amn-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Amines",
    topic: "Basicity Trends & Name Reactions (Hoffmann, Carbylamine)",
    weightage: "High",
    examTarget: "Both",
    concept: "Amines are basic derivatives of ammonia with a lone pair on nitrogen. Aryl amines are much weaker bases than aliphatic amines due to resonance delocalization.",
    shortNotes: [
      "Basicity of Aliphatic Amines in Aqueous Solution (Combined inductive +I, steric hindrance, and hydration of conjugate cation):",
      "For Methyl substituents: 2° > 1° > 3° > NH₃ ⇒ (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃.",
      "For Ethyl substituents: 2° > 3° > 1° > NH₃ ⇒ (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃.",
      "In Non-polar / Gas phase: 3° > 2° > 1° > NH₃ (governed purely by +I electron donation).",
      "Aniline (C₆H₅NH₂) is much weaker base than NH₃ (pKb ≈ 9.4 vs 4.75) because nitrogen lone pair is delocalized into benzene ring across 5 resonance structures.",
      "Carbylamine Test (Isocyanide Test): Primary amines (both aliphatic and aromatic) heated with CHCl₃ + alc. KOH produce foul-smelling isocyanides (carbylamines): R-NH₂ + CHCl₃ + 3 KOH → R-NC + 3 KCl + 3 H₂O. (Secondary and tertiary amines do NOT give this test).",
      "Hoffmann Bromamide Degradation: Primary acid amide heated with Br₂ + 4 KOH yields primary amine with ONE LESS carbon atom: R-CONH₂ + Br₂ + 4 KOH → R-NH₂ + K₂CO₃ + 2 KBr + 2 H₂O.",
      "Hinsberg Test: Benzenesulphonyl chloride (C₆H₅SO₂Cl): 1° amine forms N-alkylbenzenesulphonamide (soluble in alkali due to acidic N-H); 2° amine forms N,N-dialkyl derivative (insoluble in alkali); 3° amine does not react."
    ],
    formulas: [
      {
        name: "Diazonium Salt Synthetic Conversions",
        formula: "\\text{C}_6\\text{H}_5\\text{NH}_2 \\xrightarrow{\\text{NaNO}_2 + \\text{HCl}, \\; 273-278 \\text{ K}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- \\; (\\text{Benzene Diazonium Chloride})",
        variables: "Stable only at low temperature (0-5°C); undergoes nucleophilic substitution releasing N₂ gas",
        examTip: "Sandmeyer: CuCl/HCl → Ar-Cl; CuBr/HBr → Ar-Br; CuCN/KCN → Ar-CN. Gattermann uses Cu powder/HX.",
        trap: "Ar-I is synthesized simply by warming diazonium salt with aqueous KI (no copper catalyst needed!); Ar-F is made by Balz-Schiemann reaction using HBF₄ followed by heating Ar-N₂⁺BF₄⁻."
      }
    ],
    keyPoints: [
      "Gabriel Phthalimide Synthesis prepares pure primary aliphatic amines exclusively; fails for aromatic primary amines (aniline) because aryl halides cannot undergo nucleophilic substitution with phthalimide anion.",
      "Azo Coupling: Diazonium salt reacts with Phenol (mildly alkaline pH 9-10) to form p-hydroxyazobenzene (Orange dye); with Aniline (mildly acidic pH 4-5) to form p-aminoazobenzene (Yellow dye)."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 25: BIOMOLECULES
  // =========================================================================
  {
    id: "chem-12-bio-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Biomolecules",
    topic: "Carbohydrates, Amino Acids & Nucleic Acids",
    weightage: "High",
    examTarget: "Both",
    concept: "Biomolecules include carbohydrates (polyhydroxy aldehydes/ketones), proteins (polymers of α-amino acids), and nucleic acids (polynucleotides storing genetic code).",
    shortNotes: [
      "Carbohydrates: Monosaccharides (Glucose, Fructose), Disaccharides (Sucrose, Maltose, Lactose), Polysaccharides (Starch, Cellulose, Glycogen).",
      "Reducing Sugars: Possess free hemiacetal/hemiketal group (all monosaccharides, Maltose, Lactose). Reduce Tollen's and Fehling's reagents.",
      "Non-Reducing Sugar: SUCROSE (C₁₂H₂₂O₁₁) because glycosidic linkage joins both anomeric carbons: C1 of α-D-glucose to C2 of β-D-fructose.",
      "Inversion of Cane Sugar: Sucrose is dextrorotatory (+66.5°); on hydrolysis with dilute acid/invertase, it yields equimolar mixture of D-(+)-glucose (+52.5°) and D-(-)-fructose (-92.4°), resulting in net levorotatory mixture ('Invert sugar').",
      "Amino Acids: Building blocks of proteins. All naturally occurring amino acids are α-amino acids with L-configuration. Exist as dipolar Zwitterions (⁺H₃N-CH(R)-COO⁻) with high melting points and amphoteric character.",
      "Isoelectric Point (pI): pH at which amino acid has net zero electrical charge and does not migrate in an electric field.",
      "Essential Amino Acids (must be supplied in diet): 10 total: Valine, Leucine, Isoleucine, Lysine, Methionine, Phenylalanine, Threonine, Tryptophan, Histidine, Arginine.",
      "Nucleic Acids: Nucleoside = Nitrogenous Base + Pentose Sugar; Nucleotide = Nucleoside + Phosphate group (bonded at C5' of sugar).",
      "DNA bases: Adenine (A), Guanine (G), Cytosine (C), Thymine (T). A pairs with T via 2 hydrogen bonds; G pairs with C via 3 hydrogen bonds.",
      "RNA contains Uracil (U) instead of Thymine (T) and D-ribose sugar instead of 2-deoxy-D-ribose."
    ],
    formulas: [
      {
        name: "Amino Acid Zwitterion & Isoelectric Point",
        formula: "\\text{pI} = \\frac{\\text{pK}_{a1} + \\text{pK}_{a2}}{2}, \\quad \\text{At pH} < \\text{pI}: \\text{Cationic } (^+H_3N-CH(R)-COOH); \\quad \\text{At pH} > \\text{pI}: \\text{Anionic}",
        variables: "pK_a1 = carboxyl group dissociation, pK_a2 = amino group dissociation",
        examTip: "Glycine (H₂N-CH₂-COOH) is the ONLY naturally occurring amino acid that is OPTICALLY INACTIVE (has no chiral carbon).",
        trap: "Denaturation of proteins destroys secondary, tertiary, and quaternary structures by breaking hydrogen bonds (e.g. curdling of milk, coagulation of egg white), but PRIMARY structure (peptide covalent bonds) remains INTACT!"
      }
    ],
    keyPoints: [
      "Vitamins: Fat-soluble (A, D, E, K); Water-soluble (B-complex, C). Vitamin C (Ascorbic acid) must be supplied regularly in diet because it is excreted in urine.",
      "Deficiency diseases: Vit A (Night blindness), Vit B₁ (Beri-beri), Vit B₁₂ (Pernicious anemia), Vit C (Scurvy), Vit D (Rickets), Vit K (Increased blood clotting time)."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 26: SURFACE CHEMISTRY
  // =========================================================================
  {
    id: "chem-12-srf-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Surface Chemistry",
    topic: "Adsorption Isotherms, Colloids & Hardy-Schulze Rule",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Surface chemistry deals with surface phenomena. Adsorption is accumulation of molecular species at surface rather than bulk.",
    shortNotes: [
      "Physical Adsorption (Physisorption): Weak van der Waals forces (< 40 kJ/mol), non-specific, reversible, multimolecular layers, decreases with increasing temperature.",
      "Chemical Adsorption (Chemisorption): Strong chemical bonds (80-240 kJ/mol), highly specific, irreversible, unimolecular layer, increases initially with temperature then decreases.",
      "Freundlich Adsorption Isotherm: x/m = k · P^(1/n) (where 0 < 1/n < 1). Taking log: log(x/m) = log k + (1/n) log P. Plot of log(x/m) vs log P is a straight line with slope 1/n and intercept log k.",
      "Colloids classification by affinity: Lyophilic (solvent-attracting, reversible, stable, cannot be easily coagulated, e.g. starch, gum, gelatin); Lyophobic (solvent-repelling, irreversible, unstable, readily coagulated by electrolytes, e.g. gold sol, As₂S₃ sol).",
      "Properties: Tyndall Effect (scattering of light by colloidal particles); Brownian Movement (random zig-zag motion preventing settling); Electrophoresis (migration of colloidal particles under electric field, proves charge on sol).",
      "Hardy-Schulze Rule: Coagulating power of an electrolyte is directly proportional to the 4th to 6th power of the valency of the active ion carrying charge opposite to that of the colloidal sol.",
      "Coagulating power order for negative sol (As₂S₃): Al³⁺ > Mg²⁺ > Na⁺. For positive sol (Fe(OH)₃): [Fe(CN)₆]⁴⁻ > PO₄³⁻ > SO₄²⁻ > Cl⁻."
    ],
    formulas: [
      {
        name: "Freundlich Adsorption Isotherm Equation",
        formula: "\\frac{x}{m} = k P^{1/n}, \\quad \\log_{10} \\left( \\frac{x}{m} \\right) = \\log_{10} k + \\frac{1}{n} \\log_{10} P",
        variables: "x = mass of adsorbate, m = mass of adsorbent, P = pressure of gas, k and n are constants at constant T (n > 1)",
        examTip: "At low pressure: 1/n = 1 ⇒ x/m ∝ P (first order). At high pressure: 1/n = 0 ⇒ x/m = constant (zero order, surface saturated).",
        trap: "Flocculation / Coagulation Value = minimum millimoles of electrolyte required to cause coagulation of 1 liter of colloidal sol. Smaller flocculation value = HIGHER coagulating power!"
      }
    ],
    keyPoints: [
      "Gold Number: Minimum milligrams of protective lyophilic colloid required to prevent coagulation of 10 mL gold sol by 1 mL of 10% NaCl. Smaller gold number = greater protective power (Gelatin has smallest gold number ~0.005-0.01).",
      "Micelles (Associated Colloids): Formed above Critical Micelle Concentration (CMC) and Kraft Temperature (T_k) by surface-active agents like soaps (Sodium stearate C₁₇H₃₅COO⁻Na⁺)."
    ]
  },

  // =========================================================================
  // CLASS 12 - CHAPTER 27: METALLURGY (ISOLATION OF ELEMENTS)
  // =========================================================================
  {
    id: "chem-12-met-1",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "General Principles and Processes of Isolation of Elements",
    topic: "Metallurgical Principles, Ellingham Diagram & Refining",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Metallurgy involves extraction of metals from ores via concentration, conversion to oxide, reduction to crude metal, and refining.",
    shortNotes: [
      "Concentration Methods: Hydraulic washing / Gravity separation (density difference); Magnetic separation (Fe₃O₄, Wolframite FeWO₄); Froth Floatation (for sulfide ores like Galena PbS, Copper pyrites CuFeS₂, Zinc blende ZnS; Collector: Potassium ethyl xanthate; Frother: Pine oil; Depressant: NaCN separates ZnS from PbS); Leaching (Bayer's process for bauxite Al₂O₃·2H₂O with NaOH; Cyanide process for Au and Ag with NaCN).",
      "Calcination (heating in absence of air below melting point, expels moisture and CO₂ from carbonates/hydrates) vs Roasting (heating in excess air below melting point, oxidizes sulfides to oxides releasing SO₂).",
      "Ellingham Diagram: Plot of Δ_r G° vs T for metal oxide formation (2 M + O₂ → 2 MO). Slope is positive because ΔS is negative (gas O₂ consumed). Any metal whose line lies LOWER in Ellingham diagram can reduce the oxide of a metal whose line lies HIGHER at that temperature.",
      "Blast Furnace for Iron: Zones from top to bottom: 1. Reduction (500-800 K): 3 Fe₂O₃ + CO → 2 Fe₃O₄ + CO₂; 2. Slag formation (1000-1200 K): CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃ (Fusible slag); 3. Combustion (1500-2200 K): C + O₂ → CO₂; C + CO₂ → 2 CO (Main reducing agent at higher temp). Produces Pig Iron (4% carbon, brittle); remelted with scrap forms Cast Iron (3% C); Wrought iron is purest commercial form (0.1-0.2% C).",
      "Hall-Héroult Process (Aluminum): Electrolysis of molten Al₂O₃ dissolved in Cryolite (Na₃AlF₆) and Fluorspar (CaF₂), which lower melting point from 2320 K to ~1220 K and enhance electrical conductivity. Carbon anodes are consumed: C + 2 O²⁻ → CO₂ + 4 e⁻.",
      "Refining Methods: 1. Liquation (low m.p. metals like Sn, Pb); 2. Distillation (low b.p. volatile metals like Zn, Cd, Hg); 3. Electrolytic (Cu, Al); 4. Zone Refining (ultra-pure semiconductors like Si, Ge, Ga, based on principle that impurities are more soluble in molten melt than solid); 5. Mond Process (Nickel refined via volatile carbonyl: Ni + 4 CO (330-350 K) → Ni(CO)₄ (gas) ⎯450-470 K⎯→ Ni + 4 CO); 6. Van Arkel Method (Titanium, Zirconium refined via volatile iodides: Zr + 2 I₂ (870 K) → ZrI₄ ⎯Tungsten filament 2075 K⎯→ Zr + 2 I₂)."
    ],
    formulas: [
      {
        name: "Ellingham Diagram Spontaneity Criterion",
        formula: "\\Delta G^\\circ = \\Delta H^\\circ - T \\Delta S^\\circ, \\quad \\text{Lower metal curve reduces higher metal oxide: } \\Delta G^\\circ_{\\text{net}} < 0",
        variables: "Intersection point represents thermodynamic temperature above which reduction by carbon or CO becomes spontaneous",
        examTip: "Below 710°C (983 K), CO is a better reducing agent for iron oxides than Carbon (line for 2CO + O₂ → 2CO₂ lies lower); Above 710°C, Carbon (C + O₂ → CO₂) becomes the better reducing agent!",
        trap: "Blister Copper has blistered appearance caused by the bubbling escape of SO₂ gas during solidification: 2 Cu₂O + Cu₂S → 6 Cu + SO₂↑ (Auto-reduction / Self-reduction)!"
      }
    ],
    keyPoints: [
      "Mond process for Ni and Van Arkel method for Ti/Zr are based on the Vapor Phase Refining principle.",
      "In extraction of copper, silica (SiO₂) is added as acidic flux to remove FeO impurity as fusible iron silicate slag (FeSiO₃): FeO + SiO₂ → FeSiO₃."
    ]
  }
];

async function appendBatch4() {
  const targetFile = path.resolve('server/scripts/chemistryDataDefinition.ts');
  console.log(`Reading ${targetFile}...`);
  let content = fs.readFileSync(targetFile, 'utf8');

  const lastIndex = content.lastIndexOf('];');
  if (lastIndex === -1) {
    console.error('Could not find closing bracket in chemistryDataDefinition.ts');
    return;
  }

  const modulesString = ',\n' + JSON.stringify(batch4Modules, null, 2).slice(1, -1).trim();
  const updatedContent = content.slice(0, lastIndex) + modulesString + '\n];\n';
  fs.writeFileSync(targetFile, updatedContent, 'utf8');
  console.log(`Appended ${batch4Modules.length} Batch 4 modules to chemistryDataDefinition.ts!`);
}

appendBatch4();
