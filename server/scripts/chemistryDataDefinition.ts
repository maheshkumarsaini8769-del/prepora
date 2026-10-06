export interface TopicFormula {
  name: string;
  formula: string;
  variables: string;
  examTip: string;
  trap?: string;
}

export interface TopicRevisionItem {
  id: string;
  subject: 'Chemistry';
  classLevel: '11' | '12';
  chapter: string;
  topic: string;
  weightage: 'High' | 'Medium' | 'Low';
  examTarget: 'JEE' | 'NEET' | 'Both';
  concept: string;
  shortNotes: string[];
  formulas: TopicFormula[];
  keyPoints: string[];
}

export const fullChemistryData: TopicRevisionItem[] = [
  // =========================================================================
  // CLASS 11 - CHAPTER 1: SOME BASIC CONCEPTS OF CHEMISTRY
  // =========================================================================
  {
    id: "chem-11-sbc-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Some Basic Concepts of Chemistry",
    topic: "Mole Concept & Avogadro Number",
    weightage: "High",
    examTarget: "Both",
    concept: "Mole is the SI unit for amount of substance. 1 mole contains exactly 6.02214076 × 10²³ elementary entities (atoms, molecules, or ions).",
    shortNotes: [
      "1 mol = NA particles = 6.022 × 10²³ particles.",
      "Moles n = w / M = N / NA = V_STP / 22.4 L.",
      "At STP (0°C, 1 bar), molar volume of ideal gas = 22.7 L; at 0°C, 1 atm, molar volume = 22.4 L.",
      "Gram atomic mass = mass of 1 mole of atoms in grams."
    ],
    formulas: [
      {
        name: "Mole Calculation Triad",
        formula: "n = \\frac{w}{M} = \\frac{N}{N_A} = \\frac{V_{\\text{STP}}}{22.4 \\text{ L}}",
        variables: "w = mass in grams, M = molar mass (g/mol), N = number of particles, NA = 6.022 × 10²³, V_STP = volume in liters at STP (1 atm, 273.15 K)",
        examTip: "Always convert volumes to liters and mass to grams before calculating moles.",
        trap: "V/22.4 is strictly applicable only for GASES at STP, never for liquids or solids like water at 4°C!"
      },
      {
        name: "Number of Atoms in a Molecule",
        formula: "N_{\\text{atoms}} = n \\times N_A \\times \\text{Atomicity}",
        variables: "n = moles of molecule, NA = Avogadro number, Atomicity = number of atoms per molecule",
        examTip: "For 0.1 mol of H₂SO₄, total atoms = 0.1 × NA × 7 = 0.7 NA.",
        trap: "Do not confuse number of moles of molecules with number of moles of constituent atoms."
      }
    ],
    keyPoints: [
      "Tested in almost every JEE Main and NEET paper as the starting step for numerical problems.",
      "Volume of 1 mol of liquid H₂O is ~18 mL (density = 1 g/mL), NOT 22.4 L!"
    ]
  },
  {
    id: "chem-11-sbc-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Some Basic Concepts of Chemistry",
    topic: "Percentage Composition & Empirical Formula",
    weightage: "High",
    examTarget: "Both",
    concept: "Empirical formula shows the simplest whole-number ratio of atoms in a compound, while molecular formula represents the actual number of atoms.",
    shortNotes: [
      "Mass % of an element = (Mass of element in 1 mol compound / Molar mass of compound) × 100.",
      "Molecular Formula = (Empirical Formula)ₙ, where n = Molar Mass / Empirical Formula Mass.",
      "Vapour Density (VD) relative to H₂: Molar Mass = 2 × Vapour Density.",
      "Dumas and combustion data provide elemental mass percentages."
    ],
    formulas: [
      {
        name: "Mass Percentage of Element",
        formula: "\\% \\text{ Element} = \\frac{\\text{Mass of element in 1 mol}}{\\text{Molar mass of compound}} \\times 100\\%",
        variables: "Molar mass in g/mol, Element mass = atomic mass × number of atoms",
        examTip: "Sum of mass percentages of all elements in a compound must equal 100%.",
        trap: "If analysis percentages do not add up to 100%, the remainder is usually Oxygen unless specified otherwise."
      },
      {
        name: "Molecular Formula vs Vapour Density",
        formula: "n = \\frac{\\text{Molar Mass}}{\\text{Empirical Mass}}, \\quad \\text{Molar Mass} = 2 \\times \\text{V.D.}",
        variables: "n = integer multiplier (1, 2, 3...), V.D. = Vapour Density relative to H₂",
        examTip: "Empirical formula CH₂O with V.D. = 90 gives Molar Mass = 180 g/mol, so n = 180/30 = 6, yielding C₆H₁₂O₆ (Glucose).",
        trap: "V.D. relative to any gas X is (Molar Mass of Gas / Molar Mass of X). If relative to air (M_air ≈ 29), M = 29 × V.D."
      }
    ],
    keyPoints: [
      "Two different compounds can share identical empirical formulas (e.g. C₂H₂ Acetylene and C₆H₆ Benzene both have CH).",
      "Always divide mole ratios by the smallest mole value to obtain empirical subscripts."
    ]
  },
  {
    id: "chem-11-sbc-3",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Some Basic Concepts of Chemistry",
    topic: "Stoichiometry & Limiting Reagent",
    weightage: "High",
    examTarget: "Both",
    concept: "The limiting reagent is the reactant completely consumed first in a reaction, determining the maximum theoretical yield of products.",
    shortNotes: [
      "Balance the chemical equation before performing any stoichiometric calculations.",
      "Limiting reagent = Reactant with minimum value of (Given Moles / Stoichiometric Coefficient).",
      "Theoretical yield is calculated based exclusively on the moles of limiting reagent.",
      "Excess reagent remaining = Initial moles - Moles consumed by limiting reagent."
    ],
    formulas: [
      {
        name: "Limiting Reagent Condition",
        formula: "\\text{For } aA + bB \\to \\text{Products}, \\quad \\text{If } \\frac{n_A}{a} < \\frac{n_B}{b} \\implies A \\text{ is Limiting Reagent}",
        variables: "n_A, n_B = initial moles of reactants A and B; a, b = balanced equation stoichiometric coefficients",
        examTip: "Always compare moles divided by coefficients, NEVER compare given masses or moles directly!",
        trap: "If reactant masses are given, convert to moles first: comparing w_A/a vs w_B/b leads to completely incorrect answers!"
      },
      {
        name: "Percentage Yield Formula",
        formula: "\\% \\text{ Yield} = \\frac{\\text{Actual Yield}}{\\text{Theoretical Yield}} \\times 100\\%",
        variables: "Actual yield = experimentally isolated amount; Theoretical yield = calculated from limiting reagent stoichiometry",
        examTip: "If reaction purity is given as P%, available reactant mass = (Given mass × P) / 100.",
        trap: "Do not forget to scale intermediate moles when calculating multi-step sequential yields: Total Yield = Y₁ × Y₂ × Y₃."
      }
    ],
    keyPoints: [
      "Direct numericals frequently appear in Section B of JEE Main and NEET physical chemistry.",
      "Stoichiometric coefficients represent mole ratios and volume ratios for gases, NOT mass ratios!"
    ]
  },
  {
    id: "chem-11-sbc-4",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Some Basic Concepts of Chemistry",
    topic: "Concentration Terms: Molarity, Molality & Mole Fraction",
    weightage: "High",
    examTarget: "Both",
    concept: "Quantitative measures of solute dissolved in a solution or solvent, differing in temperature dependence.",
    shortNotes: [
      "Molarity (M) = moles of solute / volume of solution in liters [mol/L]. Temperature DEPENDENT.",
      "Molality (m) = moles of solute / mass of solvent in kilograms [mol/kg]. Temperature INDEPENDENT.",
      "Mole fraction (X) = moles of component / total moles of all components. Dimensionless.",
      "Mass percentage (% w/w) and volume percentage (% v/v) are standard laboratory concentrations."
    ],
    formulas: [
      {
        name: "Molarity & Molality Master Equations",
        formula: "M = \\frac{w_{\\text{solute}} \\times 1000}{M_{\\text{solute}} \\times V_{\\text{soln}}(\\text{mL})}, \\quad m = \\frac{w_{\\text{solute}} \\times 1000}{M_{\\text{solute}} \\times w_{\\text{solvent}}(\\text{g})}",
        variables: "w = mass in grams, M_solute = molar mass of solute, V_soln = volume of solution in mL, w_solvent = mass of pure solvent in grams",
        examTip: "Molality uses mass of SOLVENT in denominator, whereas Molarity uses volume of SOLUTION.",
        trap: "Do not confuse w_solvent with w_solution! w_solution = w_solute + w_solvent."
      },
      {
        name: "Molarity to Molality Interconversion",
        formula: "m = \\frac{1000 \\times M}{1000 \\times d - M \\times M_{\\text{solute}}}, \\quad M = \\frac{10 \\times (\\% w/w) \\times d}{M_{\\text{solute}}}",
        variables: "d = density of solution in g/mL, % w/w = weight percentage, M_solute = solute molar mass",
        examTip: "For 10% (w/w) NaOH with density d = 1.2 g/mL: M = (10 × 10 × 1.2) / 40 = 3 M.",
        trap: "Be careful with units: density must be in g/mL or g/cm³, not kg/m³."
      }
    ],
    keyPoints: [
      "Molality is preferred over molarity in colligative property studies because mass does not change with temperature.",
      "Sum of mole fractions in any mixture is always 1: X_A + X_B = 1."
    ]
  },
  {
    id: "chem-11-sbc-5",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Some Basic Concepts of Chemistry",
    topic: "Normality, Equivalent Weight & n-Factor",
    weightage: "High",
    examTarget: "Both",
    concept: "Law of chemical equivalence states that substances always react and produce in equal number of gram equivalents.",
    shortNotes: [
      "Normality N = number of gram equivalents / volume of solution in liters = Molarity × n-factor.",
      "Equivalent weight E = Molar Mass (M) / n-factor.",
      "For acids: n-factor = basicity (number of replaceable H⁺ ions). H₃PO₄ = 3, H₃PO₃ = 2, H₃PO₂ = 1.",
      "For bases: n-factor = acidity (number of replaceable OH⁻ ions). Ca(OH)₂ = 2, Al(OH)₃ = 3.",
      "For salts: n-factor = total positive or negative valence charge. Al₂(SO₄)₃ = 6."
    ],
    formulas: [
      {
        name: "Law of Chemical Equivalence & Dilution",
        formula: "N_1 V_1 = N_2 V_2, \\quad \\text{Equivalents } eq = \\frac{w}{E} = N \\times V(\\text{L}) = n \\times n\\text{-factor}",
        variables: "w = mass in grams, E = equivalent weight, N = normality, V = volume in liters, n = moles",
        examTip: "1 equivalent of ANY acid completely neutralizes 1 equivalent of ANY base: eq_acid = eq_base.",
        trap: "H₃PO₃ has 3 hydrogens but its basicity is 2 because one hydrogen is directly bonded to phosphorus (P-H bond is non-ionizable)!"
      },
      {
        name: "Redox n-Factor Equation",
        formula: "n\\text{-factor} = |\\text{Initial O.N.} - \\text{Final O.N.}| \\times \\text{Number of reacting atoms per molecule}",
        variables: "O.N. = oxidation number of the element undergoing redox change",
        examTip: "KMnO₄ in acidic medium: Mn⁺⁷ → Mn⁺², n-factor = 5. In neutral medium: Mn⁺⁷ → Mn⁺⁴, n-factor = 3. In alkaline medium: Mn⁺⁷ → Mn⁺⁶, n-factor = 1.",
        trap: "K₂Cr₂O₇ in acidic medium: Cr₂⁺⁶ → 2Cr⁺³, n-factor = |6 - 3| × 2 = 6, NOT 3!"
      }
    ],
    keyPoints: [
      "Crucial for volumetric titration numericals in both JEE Main and NEET.",
      "Equivalents are additive upon mixing: N_mix V_mix = N₁V₁ + N₂V₂."
    ]
  },
  {
    id: "chem-11-sbc-6",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Some Basic Concepts of Chemistry",
    topic: "Parts Per Million (ppm) & Volume Strength",
    weightage: "Medium",
    examTarget: "Both",
    concept: "ppm represents trace concentration in water or atmospheric samples. Volume strength denotes the volume of O₂ released by H₂O₂ solutions.",
    shortNotes: [
      "ppm = (Mass of solute / Total mass of solution) × 10⁶.",
      "For dilute aqueous solutions (d ≈ 1 g/mL), 1 ppm = 1 mg/L = 1 μg/mL.",
      "Volume strength of H₂O₂ is the liters of O₂ gas at STP evolved by decomposition of 1 liter of H₂O₂ solution.",
      "2 H₂O₂ → 2 H₂O + O₂."
    ],
    formulas: [
      {
        name: "Parts Per Million (ppm) Formula",
        formula: "\\text{ppm} = \\frac{\\text{Mass of Solute}}{\\text{Mass of Solution}} \\times 10^6 = \\frac{\\text{mg of Solute}}{\\text{L of Solution}}",
        variables: "Mass of solute and solution in identical mass units",
        examTip: "Hardness of water is universally expressed in ppm of CaCO₃ equivalent.",
        trap: "Do not multiply by 100 (which gives percentage); ppm requires multiplying by 10⁶."
      },
      {
        name: "Volume Strength of H₂O₂ Relations",
        formula: "\\text{Volume Strength} = 11.2 \\times M = 5.6 \\times N, \\quad \\% (w/v) = \\frac{\\text{Volume Strength} \\times 34}{22.4 \\times 10}",
        variables: "M = molarity of H₂O₂, N = normality of H₂O₂",
        examTip: "'20 Volume H₂O₂' means M = 20 / 11.2 = 1.785 M, N = 20 / 5.6 = 3.57 N.",
        trap: "Notice 11.2 for Molarity vs 5.6 for Normality: this is because n-factor of H₂O₂ in redox is 2 (N = 2M)!"
      }
    ],
    keyPoints: [
      "Frequently asked in water softening and redox titration numericals.",
      "Volume strength is unique to hydrogen peroxide decomposition stoichiometry."
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 2: STRUCTURE OF ATOM
  // =========================================================================
  {
    id: "chem-11-soa-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Structure of Atom",
    topic: "Planck's Quantum Theory & Photoelectric Effect",
    weightage: "High",
    examTarget: "Both",
    concept: "Electromagnetic radiation is emitted or absorbed in discrete packets called quanta (photons). Photoelectric effect proves particle nature of light.",
    shortNotes: [
      "Energy of photon E = hν = hc/λ.",
      "Planck's constant h = 6.626 × 10⁻³⁴ J·s = 4.136 × 10⁻¹⁵ eV·s; hc ≈ 1240 eV·nm.",
      "Einstein's photoelectric equation: Incident Energy = Work function + Maximum kinetic energy.",
      "Threshold frequency ν₀ is the minimum frequency required to eject photoelectrons with zero kinetic energy.",
      "Kinetic energy depends on frequency of incident light, NOT on intensity; Intensity controls photocurrent."
    ],
    formulas: [
      {
        name: "Einstein Photoelectric Equation",
        formula: "h\\nu = w_0 + K_{\\max} = h\\nu_0 + \\frac{1}{2}m v_{\\max}^2 = h\\nu_0 + eV_s",
        variables: "h = 6.626 × 10⁻³⁴ J·s, ν = incident frequency, w₀ = work function (hν₀), K_max = maximum kinetic energy, V_s = stopping potential, e = 1.6 × 10⁻¹⁹ C",
        examTip: "Slope of Stopping Potential (V_s) vs Frequency (ν) graph is universally h/e.",
        trap: "Work function w₀ is characteristic of the metal surface only and independent of incident light."
      },
      {
        name: "Energy of Photon (Convenient Shortcut)",
        formula: "E(\\text{eV}) = \\frac{1240}{\\lambda(\\text{nm})} = \\frac{12400}{\\lambda(\\text{\\AA})}",
        variables: "λ = wavelength in nanometers (nm) or angstroms (Å)",
        examTip: "Use hc ≈ 1240 eV·nm to save 2 minutes of calculation in JEE Main and NEET numericals.",
        trap: "Remember this formula gives Energy in eV! To convert to Joules, multiply by 1.6 × 10⁻¹⁹ J/eV."
      }
    ],
    keyPoints: [
      "Photoelectric effect cannot be explained by classical wave theory of light.",
      "There is no time lag between photon incidence and electron ejection (~10⁻⁹ s)."
    ]
  },
  {
    id: "chem-11-soa-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Structure of Atom",
    topic: "Bohr's Atomic Model: Postulates, Radius & Velocity",
    weightage: "High",
    examTarget: "Both",
    concept: "Electrons revolve around nucleus in discrete non-radiating orbits where angular momentum is quantized: mvr = nh / 2π.",
    shortNotes: [
      "Valid strictly for single-electron species only (H, He⁺, Li²⁺, Be³⁺).",
      "Radius of nth orbit: r_n ∝ n² / Z.",
      "Velocity of electron in nth orbit: v_n ∝ Z / n.",
      "Centripetal force is provided by electrostatic attraction: mv²/r = kZe²/r²."
    ],
    formulas: [
      {
        name: "Bohr Orbit Radius Formula",
        formula: "r_n = 0.529 \\times \\frac{n^2}{Z} \\text{ \\AA} = 52.9 \\times \\frac{n^2}{Z} \\text{ pm}",
        variables: "n = principal quantum number (1, 2, 3...), Z = atomic number of single-electron species",
        examTip: "Radius of 1st orbit of Hydrogen is Bohr radius a₀ = 0.529 Å. Ratio of radii for H: r₁ : r₂ : r₃ = 1 : 4 : 9.",
        trap: "Do not forget Z in denominator! For Li²⁺ (Z=3) in 1st orbit, r₁ = 0.529 / 3 = 0.176 Å."
      },
      {
        name: "Bohr Orbital Velocity Formula",
        formula: "v_n = 2.18 \\times 10^6 \\times \\frac{Z}{n} \\text{ m/s} = \\frac{c}{137} \\times \\frac{Z}{n}",
        variables: "v_n = orbital velocity, c = 3 × 10⁸ m/s, n = shell number, Z = atomic number",
        examTip: "Time period of revolution T = 2πr / v ∝ n³ / Z²; Frequency of revolution f = 1/T ∝ Z² / n³.",
        trap: "In 1st orbit of H (n=1, Z=1), electron speed is c/137 ≈ 2.18 × 10⁶ m/s."
      }
    ],
    keyPoints: [
      "Angular momentum quantization condition: L = mvr = n(h / 2π).",
      "Bohr's model fails for multi-electron atoms and cannot explain Zeeman (magnetic) or Stark (electric) spectral line splitting."
    ]
  },
  {
    id: "chem-11-soa-3",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Structure of Atom",
    topic: "Energy Levels of Hydrogen & Rydberg Equation",
    weightage: "High",
    examTarget: "Both",
    concept: "Total energy of electron in an orbit is negative, representing a bound state: E_total = K + U = -K = U/2.",
    shortNotes: [
      "Total Energy E_n = -13.6 × (Z² / n²) eV/atom = -2.18 × 10⁻¹⁸ × (Z² / n²) J/atom.",
      "Kinetic Energy K = -E_n = +13.6 × (Z² / n²) eV; Potential Energy U = 2E_n = -27.2 × (Z² / n²) eV.",
      "Ionization Energy (IE) is energy required to remove electron from ground state (n=1 to n=∞): IE = +13.6 Z² eV.",
      "Rydberg formula gives wavenumber of photons emitted during electronic de-excitation: 1/λ = R_H Z² (1/n₁² - 1/n₂²)."
    ],
    formulas: [
      {
        name: "Energy of Bohr Orbit",
        formula: "E_n = -13.6 \\times \\frac{Z^2}{n^2} \\text{ eV} = -\\frac{1312}{n^2} \\times Z^2 \\text{ kJ/mol}",
        variables: "n = shell level, Z = atomic number of species",
        examTip: "For Hydrogen (Z=1): E₁ = -13.6 eV, E₂ = -3.4 eV, E₃ = -1.51 eV, E₄ = -0.85 eV.",
        trap: "Potential energy is DOUBLE the total energy: U_n = 2 E_n. K is always positive!"
      },
      {
        name: "Rydberg Spectral Formula",
        formula: "\\bar{\\nu} = \\frac{1}{\\lambda} = R_H Z^2 \\left( \\frac{1}{n_1^2} - \\frac{1}{n_2^2} \\right), \\quad R_H \\approx 1.097 \\times 10^7 \\text{ m}^{-1} \\approx \\frac{1}{912 \\text{ \\AA}}",
        variables: "n₁ = lower level, n₂ = higher level (n₂ > n₁), R_H = Rydberg constant, 1/R_H ≈ 912 Å",
        examTip: "Lyman (n₁=1, UV), Balmer (n₁=2, Visible), Paschen (n₁=3, IR), Brackett (n₁=4, IR), Pfund (n₁=5, Far IR).",
        trap: "Balmer series lines fall in visible spectrum ONLY for Hydrogen (Z=1). For He⁺ or Li²⁺, Balmer shifts to UV!"
      }
    ],
    keyPoints: [
      "Number of spectral lines emitted when electron de-excites from n to ground state: N = n(n-1) / 2.",
      "When transitioning from n₂ to n₁: N = (n₂ - n₁)(n₂ - n₁ + 1) / 2."
    ]
  },
  {
    id: "chem-11-soa-4",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Structure of Atom",
    topic: "Dual Nature of Matter: De Broglie Wavelength",
    weightage: "High",
    examTarget: "Both",
    concept: "Louis de Broglie proposed that all moving material particles possess wave-like properties alongside particle characteristics: λ = h / p.",
    shortNotes: [
      "Wavelength λ = h / p = h / (m v).",
      "In terms of kinetic energy K: p = √(2mK) ⇒ λ = h / √(2mK).",
      "For a charged particle accelerated through potential difference V: K = qV ⇒ λ = h / √(2mqV).",
      "For electron: λ = √(150 / V) Å = 12.27 / √V Å, where V is accelerating potential in Volts.",
      "Circumference of nth Bohr orbit contains exactly n de Broglie wavelengths: 2πr_n = nλ."
    ],
    formulas: [
      {
        name: "De Broglie Fundamental & Potential Equation",
        formula: "\\lambda = \\frac{h}{m v} = \\frac{h}{\\sqrt{2 m K}} = \\frac{h}{\\sqrt{2 m q V}}",
        variables: "h = 6.626 × 10⁻³⁴ J·s, m = mass (kg), v = velocity (m/s), K = kinetic energy (J), q = charge (C), V = potential (Volts)",
        examTip: "For an electron: λ(Å) = 12.27 / √V. For V = 100 Volts, λ = 12.27 / 10 = 1.227 Å.",
        trap: "For gas molecules at temperature T, thermal kinetic energy K = (3/2)kT, so λ = h / √(3mkT), where k is Boltzmann constant."
      },
      {
        name: "Bohr Quantization from De Broglie",
        formula: "2 \\pi r_n = n \\lambda \\implies m v r_n = \\frac{n h}{2 \\pi}",
        variables: "r_n = orbit radius, n = number of standing waves in orbit = orbit number",
        examTip: "An electron in 4th Bohr orbit forms exactly 4 complete standing wave crests/troughs.",
        trap: "Macroscopic bodies have undetectably tiny de Broglie wavelengths due to very large mass in denominator."
      }
    ],
    keyPoints: [
      "Davisson-Germer electron diffraction experiment experimentally confirmed de Broglie wave nature of electrons.",
      "Tested regularly in both Physics (Modern Physics) and Chemistry sections of JEE/NEET."
    ]
  },
  {
    id: "chem-11-soa-5",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Structure of Atom",
    topic: "Heisenberg's Uncertainty Principle",
    weightage: "High",
    examTarget: "Both",
    concept: "It is fundamentally impossible to simultaneously determine with arbitrary precision both the exact position and momentum of a subatomic particle.",
    shortNotes: [
      "Δx · Δp ≥ h / (4π) = ℏ / 2.",
      "Since Δp = m Δv, Δx · Δv ≥ h / (4π m).",
      "Energy-time uncertainty relation: ΔE · Δt ≥ h / (4π).",
      "Proves that definite planetary Bohr trajectories do not exist in quantum reality; electrons exist in probability orbitals."
    ],
    formulas: [
      {
        name: "Heisenberg Uncertainty Relations",
        formula: "\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4 \\pi}, \\quad \\Delta x \\cdot \\Delta v \\ge \\frac{h}{4 \\pi m}, \\quad \\Delta E \\cdot \\Delta t \\ge \\frac{h}{4 \\pi}",
        variables: "Δx = uncertainty in position, Δp = uncertainty in momentum, Δv = uncertainty in velocity, m = mass of particle",
        examTip: "If uncertainty in position and momentum are equal (Δx = Δp): Δv = (1/2m) √(h / π).",
        trap: "When velocity is given with error percentage 'v ± x%', Δv = 2 × (x/100) × v (or (x/100)×v depending on whether ± is total span)!"
      }
    ],
    keyPoints: [
      "Explains why electrons cannot exist inside the atomic nucleus (calculated Δv would exceed speed of light).",
      "Applicable only to microscopic particles; negligible for everyday macro bodies."
    ]
  },
  {
    id: "chem-11-soa-6",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Structure of Atom",
    topic: "Quantum Numbers, Orbitals & Electronic Configuration",
    weightage: "High",
    examTarget: "Both",
    concept: "Four quantum numbers completely define the state, size, shape, spatial orientation, and electron spin of an atomic orbital.",
    shortNotes: [
      "Principal (n = 1, 2, 3...): Shell, size, and major energy level. Total orbitals in shell = n²; Max electrons = 2n².",
      "Azimuthal (l = 0 to n-1): Subshell, shape (s=sphere, p=dumbbell, d=double dumbbell, f=complex). Orbital angular momentum L = √(l(l+1)) ℏ.",
      "Magnetic (m_l = -l to +l): Orientation in 3D space. Number of orbitals in subshell = 2l + 1.",
      "Spin (m_s = +1/2, -1/2): Spin angular momentum S = √(s(s+1)) ℏ.",
      "Aufbau Principle: Orbitals fill in order of increasing (n + l) energy rule. If equal, lower n fills first.",
      "Pauli Exclusion Principle: No two electrons in an atom can have all four quantum numbers identical.",
      "Hund's Rule: Pairing of electrons in degenerate orbitals occurs only after each orbital holds one electron with parallel spin."
    ],
    formulas: [
      {
        name: "Orbital Angular Momentum & Radial Nodes",
        formula: "L = \\sqrt{l(l+1)} \\frac{h}{2 \\pi}, \\quad \\text{Radial Nodes} = n - l - 1, \\quad \\text{Angular Nodes} = l",
        variables: "n = principal quantum number, l = azimuthal quantum number (s=0, p=1, d=2, f=3)",
        examTip: "For s-orbital (l=0), orbital angular momentum is ZERO: L = 0.",
        trap: "Total nodes = Radial nodes + Angular nodes = (n - l - 1) + l = n - 1."
      },
      {
        name: "Spin-Only Magnetic Moment Formula",
        formula: "\\mu = \\sqrt{n(n+2)} \\text{ BM (Bohr Magnetons)}",
        variables: "n = number of unpaired electrons in the atom or ion, 1 BM = eh / (4πm_e)",
        examTip: "n=1 → 1.73 BM, n=2 → 2.83 BM, n=3 → 3.87 BM, n=4 → 4.90 BM, n=5 → 5.92 BM.",
        trap: "Chromium (Cr, Z=24): [Ar] 3d⁵ 4s¹ has 6 unpaired electrons, so μ = √(6×8) = 6.93 BM!"
      }
    ],
    keyPoints: [
      "Anomalous electronic configurations of Cr ([Ar] 3d⁵ 4s¹) and Cu ([Ar] 3d¹⁰ 4s¹) are due to exchange energy and symmetry.",
      "Radial probability distribution function 4πr²R²(r) gives probability of finding electron at distance r from nucleus."
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 3: CLASSIFICATION OF ELEMENTS & PERIODICITY
  // =========================================================================
  {
    id: "chem-11-cep-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Classification of Elements and Periodicity",
    topic: "Modern Periodic Table & Electronic Blocks",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Moseley discovered that physical and chemical properties of elements are periodic functions of their atomic numbers (Z), not atomic masses: √ν = a(Z - b).",
    shortNotes: [
      "Modern periodic table consists of 7 horizontal periods and 18 vertical groups.",
      "Elements are classified into s, p, d, and f blocks based on the differentiating electron orbital.",
      "Number of elements in nth period is 2n² or determined by Aufbau filling: 1st (2), 2nd (8), 3rd (8), 4th (18), 5th (18), 6th (32), 7th (incomplete/32).",
      "IUPAC nomenclature for elements with Z > 100 uses roots: 0=nil, 1=un, 2=bi, 3=tri, 4=quad, 5=pent, 6=hex, 7=sept, 8=oct, 9=enn + 'ium'."
    ],
    formulas: [
      {
        name: "Moseley's Law Equation",
        formula: "\\sqrt{\\nu} = a(Z - b)",
        variables: "ν = frequency of characteristic X-ray (Kα line), Z = atomic number, a = proportionality constant, b = screening constant (b ≈ 1 for K-series)",
        examTip: "Plot of √ν versus Z is a straight line, confirming atomic number as fundamental property.",
        trap: "Classical Mendeleev table arranged by atomic weight had anomalies (Ar before K, Co before Ni, Te before I)."
      }
    ],
    keyPoints: [
      "Representative / Main group elements = s-block + p-block elements.",
      "Transition elements = d-block; Inner transition elements = f-block (Lanthanoids 58-71, Actinoids 90-103)."
    ]
  },
  {
    id: "chem-11-cep-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Classification of Elements and Periodicity",
    topic: "Periodic Trends in Atomic & Ionic Radii",
    weightage: "High",
    examTarget: "Both",
    concept: "Atomic radius decreases across a period due to increasing effective nuclear charge (Z_eff) and increases down a group due to addition of new shells.",
    shortNotes: [
      "Covalent radius < Metallic radius < Van der Waals radius.",
      "Across period (left to right): Z_eff increases, atomic radius decreases (Noble gases are exception due to van der Waals radius).",
      "Down group (top to bottom): Number of shells increases, screening effect dominates, radius increases.",
      "Cation radius < Neutral atom radius < Anion radius (e.g. Fe³⁺ < Fe²⁺ < Fe; I < I⁻).",
      "Isoelectronic species: More positive nuclear charge → smaller ionic radius (Al³⁺ < Mg²⁺ < Na⁺ < F⁻ < O²⁻ < N³⁻)."
    ],
    formulas: [
      {
        name: "Slater's Rules for Effective Nuclear Charge",
        formula: "Z_{\\text{eff}} = Z - \\sigma",
        variables: "Z = actual nuclear charge (atomic number), σ = screening / shielding constant",
        examTip: "For isoelectronic species, Ionic Radius ∝ 1 / Z. Higher Z pulls electrons closer.",
        trap: "Noble gases have the LARGEST radii in their respective periods because van der Waals radii are measured, not covalent radii!"
      }
    ],
    keyPoints: [
      "Lanthanoid contraction causes 4d and 5d transition elements of same group to have virtually identical radii (e.g. Zr ≈ Hf, Nb ≈ Ta).",
      "Crucial NEET & JEE question: order of ionic radii among isoelectronic ions (N³⁻ > O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺)."
    ]
  },
  {
    id: "chem-11-cep-3",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Classification of Elements and Periodicity",
    topic: "Ionization Enthalpy Trends & Exceptions",
    weightage: "High",
    examTarget: "Both",
    concept: "Minimum energy required to remove the most loosely bound valence electron from an isolated gaseous atom in its ground state: X(g) + IE₁ → X⁺(g) + e⁻.",
    shortNotes: [
      "Successive ionization enthalpies always increase: IE₁ < IE₂ < IE₃.",
      "General trend: Increases across period (left to right), decreases down group (top to bottom).",
      "Exception 1: Beryllium > Boron (Be: 1s² 2s² stable full subshell vs B: 1s² 2s² 2p¹ single easily removed p-electron).",
      "Exception 2: Nitrogen > Oxygen (N: 1s² 2s² 2p³ half-filled stable p-subshell vs O: 1s² 2s² 2p⁴ pairing repulsion).",
      "Noble gases have the highest IE₁ in their respective periods."
    ],
    formulas: [
      {
        name: "Ionization Enthalpy Energy Balance",
        formula: "\\Delta_i H = E_{\\infty} - E_n = -E_n = +13.6 \\times \\frac{Z_{\\text{eff}}^2}{n^2} \\text{ eV/atom}",
        variables: "Z_eff = effective nuclear charge, n = principal quantum number",
        examTip: "Order in 2nd Period: Li < B < Be < C < O < N < F < Ne.",
        trap: "Do not forget IE₂ of Oxygen is GREATER than Nitrogen, because removing 2nd electron from O⁺ gives stable 2p³ configuration!"
      }
    ],
    keyPoints: [
      "A massive jump between IE_n and IE_(n+1) indicates that the (n+1)th electron is removed from a noble gas core (e.g. Al: IE₁=577, IE₂=1816, IE₃=2744, IE₄=11577 kJ/mol → 3 valence electrons).",
      "Helium (He) has the highest first ionization enthalpy of all known elements (~2372 kJ/mol)."
    ]
  },
  {
    id: "chem-11-cep-4",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Classification of Elements and Periodicity",
    topic: "Electron Gain Enthalpy Trends & Exceptions",
    weightage: "High",
    examTarget: "Both",
    concept: "Enthalpy change when an electron is added to an isolated gaseous atom in ground state: X(g) + e⁻ → X⁻(g). Usually negative (exothermic) for 1st electron.",
    shortNotes: [
      "Halogens have the most negative electron gain enthalpies in their periods.",
      "Noble gases, Alkaline earth metals (Be, Mg), and Nitrogen have positive or near-zero electron gain enthalpy due to stable electronic configurations.",
      "CRITICAL EXCEPTION: 2nd period elements (F, O) have LESS negative Δ_eg H than 3rd period elements (Cl, S) due to compact 2p size and high interelectronic repulsions.",
      "Chlorine has the HIGHEST (most negative) electron gain enthalpy of all elements in the periodic table (-349 kJ/mol > F: -328 kJ/mol).",
      "Second electron gain enthalpy is ALWAYS positive (endothermic) due to strong electrostatic repulsion from already negative anion (O⁻ + e⁻ → O²⁻, ΔH = +780 kJ/mol)."
    ],
    formulas: [
      {
        name: "Electron Gain Enthalpy vs Electron Affinity",
        formula: "\\Delta_{eg} H = -EA - \\frac{5}{2} R T",
        variables: "EA = Electron Affinity (positive quantity by convention), R = 8.314 J/mol·K, T = temperature",
        examTip: "Order of halogen Δ_eg H: Cl > F > Br > I (most negative to least negative).",
        trap: "Fluorine has the highest ELECTRONEGATIVITY, but Chlorine has the highest ELECTRON GAIN ENTHALPY!"
      }
    ],
    keyPoints: [
      "Group 16 order of negative Δ_eg H: S > Se > Te > Po > O (Oxygen has the least negative in Group 16!).",
      "Always positive for second electron addition in polyatomic anions like O²⁻, S²⁻."
    ]
  },
  {
    id: "chem-11-cep-5",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Classification of Elements and Periodicity",
    topic: "Electronegativity Scales & Periodic Trends",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Qualitative measure of the ability of an atom in a chemical compound to attract shared pair of electrons towards itself.",
    shortNotes: [
      "Electronegativity is not a measurable physical property but a relative dimensionless scale.",
      "Pauling scale: Based on bond dissociation energies. Fluorine is assigned arbitrary standard value of 4.0.",
      "Mulliken scale: Average of ionization energy and electron affinity: EN_M = (IE + EA) / 2.",
      "Trend: Increases across period (left to right) up to Halogens; Decreases down group (top to bottom).",
      "Most electronegative elements: F (4.0) > O (3.5) > N (3.0) ≈ Cl (3.0) > Br (2.8) > C (2.5) ≈ S (2.5) ≈ I (2.5) > H (2.1)."
    ],
    formulas: [
      {
        name: "Pauling Electronegativity Difference Formula",
        formula: "|\\chi_A - \\chi_B| = 0.208 \\sqrt{\\Delta} \\text{ (in kcal/mol)} = 0.1017 \\sqrt{\\Delta} \\text{ (in kJ/mol)}",
        variables: "Δ = E_(A-B) - √(E_(A-A) × E_(B-B)), where E represents bond dissociation energies",
        examTip: "Mulliken scale conversion: χ_Pauling = (IE + EA in eV) / 5.6.",
        trap: "Hybridization affects EN: sp (50% s-character) > sp² (33% s-character) > sp³ (25% s-character). Greater s-character = higher electronegativity."
      }
    ],
    keyPoints: [
      "Difference in electronegativity (|χ_A - χ_B|) determines bond percentage ionic character (Hannay-Smith relation).",
      "Oxides of high EN elements are acidic (Cl₂O₇, SO₃), intermediate are amphoteric (Al₂O₃, ZnO), low EN are basic (Na₂O, CaO)."
    ]
  },
  {
    id: "chem-11-cep-6",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Classification of Elements and Periodicity",
    topic: "Periodic Trends in Chemical Reactivity & Oxides",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Chemical properties of oxides and hydroxides vary predictably across the periodic table from basic on the far left to acidic on the far right.",
    shortNotes: [
      "Acidic oxides: React with water to form acids, or react with bases to form salts (SO₃, CO₂, N₂O₅, Cl₂O₇).",
      "Basic oxides: React with water to form hydroxides, or react with acids to form salts (Na₂O, K₂O, CaO, BaO).",
      "Amphoteric oxides: React with BOTH acids and bases (Al₂O₃, ZnO, BeO, PbO, SnO, Ga₂O₃, Cr₂O₃).",
      "Neutral oxides: React with neither acids nor bases (CO, NO, N₂O, H₂O).",
      "Diagonal relationships: Li-Mg, Be-Al, B-Si show similar charge-to-size ratios (polarizing power)."
    ],
    formulas: [
      {
        name: "Polarizing Power (Ionic Potential) Formula",
        formula: "\\phi = \\frac{\\text{Ionic Charge } (q)}{\\text{Ionic Radius } (r)}",
        variables: "q = valence charge, r = ionic radius",
        examTip: "High ionic potential φ (> 2.2) imparts covalent character to metal oxides, turning them amphoteric or acidic (e.g. CrO basic, Cr₂O₃ amphoteric, CrO₃ strongly acidic).",
        trap: "CO, NO, and N₂O are NEUTRAL oxides, NOT acidic or amphoteric!"
      }
    ],
    keyPoints: [
      "Amphoteric mnemonic: 'Zanaabe Aali Gaaye Sabse Bekaar Punjabi Song' → Zn, Al, Ga, Sb, Be, Pb, Sn oxides are amphoteric.",
      "As oxidation state of central metal increases, acidity of oxide increases: MnO (basic) < Mn₂O₃ < MnO₂ (amphoteric) < Mn₂O₇ (acidic oil)."
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 4: CHEMICAL BONDING & MOLECULAR STRUCTURE
  // =========================================================================
  {
    id: "chem-11-cbm-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Bonding and Molecular Structure",
    topic: "Lewis Structures & Formal Charge Calculation",
    weightage: "High",
    examTarget: "Both",
    concept: "Formal charge helps select the most stable, lowest-energy resonance structure among valid Lewis representations.",
    shortNotes: [
      "Octet Rule: Atoms combine by gaining, losing, or sharing electrons to acquire a stable noble-gas 8-electron configuration.",
      "Exceptions to Octet rule: Incomplete octet (BF₃, BeCl₂, LiCl), Odd-electron molecules (NO, NO₂), Expanded octet (PCl₅, SF₆, H₂SO₄, IF₇).",
      "Formal charge FC = Valence electrons in free atom - Non-bonding lone pair electrons - 1/2 (Bonding shared electrons).",
      "Preferred structure has lowest formal charges, with negative formal charge on the more electronegative atom."
    ],
    formulas: [
      {
        name: "Formal Charge Equation",
        formula: "FC = V - L - \\frac{B}{2} = V - L - \\text{Number of Bonds}",
        variables: "V = total valence electrons in isolated free atom, L = number of unshared lone pair electrons, B = number of shared bonding electrons",
        examTip: "In Ozone (O₃): Central oxygen (double bond to one O, single coordinate to other): FC = 6 - 2 - 3 = +1.",
        trap: "L represents individual electrons, NOT pairs! A single lone pair equals L = 2."
      }
    ],
    keyPoints: [
      "Sum of formal charges on all atoms in an ion must equal the net charge of that ion.",
      "Central atoms from 3rd period onwards can expand octet due to availability of vacant d-orbitals."
    ]
  },
  {
    id: "chem-11-cbm-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Bonding and Molecular Structure",
    topic: "Lattice Enthalpy & Born-Haber Cycle",
    weightage: "High",
    examTarget: "Both",
    concept: "Lattice enthalpy is the energy required to completely separate 1 mole of solid ionic compound into isolated gaseous ions: NaCl(s) → Na⁺(g) + Cl⁻(g).",
    shortNotes: [
      "Born-Haber cycle applies Hess's law to determine lattice enthalpy from experimental thermochemical data.",
      "Δ_f H° = Δ_sub H + (1/2)Δ_diss H + IE₁ + Δ_eg H + (-U_lattice).",
      "Lattice energy U ∝ (q₁ q₂) / (r⁺ + r⁻). Directly proportional to product of charges, inversely proportional to interionic distance.",
      "Compounds with high lattice energy have higher melting points and lower solubility in non-polar solvents."
    ],
    formulas: [
      {
        name: "Born-Haber Cycle Energy Conservation",
        formula: "\\Delta_f H^\\circ = \\Delta_{\\text{sub}} H + \\text{IE} + \\frac{1}{2}\\Delta_{\\text{bond}} H + \\Delta_{\\text{eg}} H - U_{\\text{lattice}}",
        variables: "Δ_sub H = sublimation enthalpy, IE = ionization enthalpy, Δ_bond H = bond dissociation enthalpy, Δ_eg H = electron gain enthalpy, U = lattice energy",
        examTip: "MgO has roughly 4 times the lattice energy of NaCl because q₁q₂ = (+2)(-2) = 4 vs (+1)(-1) = 1.",
        trap: "Pay attention to dissociation enthalpy: for halogens X₂, only (1/2)Δ_diss H is needed to form 1 mole of X(g)!"
      }
    ],
    keyPoints: [
      "Solubility criterion in water: Hydration enthalpy must exceed or balance Lattice enthalpy (|Δ_hyd H| ≥ U_lattice).",
      "Lattice enthalpy of alkaline earth oxides: BeO > MgO > CaO > SrO > BaO."
    ]
  },
  {
    id: "chem-11-cbm-3",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Bonding and Molecular Structure",
    topic: "Fajan's Rules: Covalent Character in Ionic Bonds",
    weightage: "High",
    examTarget: "Both",
    concept: "Every ionic bond possesses some degree of covalent character caused by polarization of the electron cloud of anion by cation.",
    shortNotes: [
      "Polarizing power of Cation ∝ Charge on cation / Size of cation.",
      "Polarizability of Anion ∝ Charge on anion × Size of anion.",
      "Fajan's Rule 1: Smaller cation size favors covalent character (LiCl > NaCl > KCl).",
      "Fajan's Rule 2: Larger anion size favors covalent character (AgI > AgBr > AgCl > AgF; AgI is yellow, insoluble, covalent; AgF is soluble, ionic).",
      "Fajan's Rule 3: High positive charge on cation favors covalent character (SnCl₄ > SnCl₂; FeCl₃ > FeCl₂).",
      "Fajan's Rule 4: Pseudo noble gas configuration (18 electrons in outermost shell: Cu⁺, Ag⁺, Zn²⁺) has much higher polarizing power than inert gas core (8 electrons: Na⁺, K⁺, Ca²⁺)."
    ],
    formulas: [
      {
        name: "Ionic Potential & Polarization Ratio",
        formula: "\\text{Covalent Character} \\propto \\phi = \\frac{z^+}{r^+} \\times z^- r^-",
        variables: "z⁺, z⁻ = ionic charges, r⁺, r⁻ = ionic radii",
        examTip: "CuCl (pseudo-inert [Ar]3d¹⁰) is far more covalent and less soluble than NaCl ([Ne] 8e⁻) despite similar radii.",
        trap: "Covalent character lowers melting point: SnCl₂ (m.p. 247°C, ionic) vs SnCl₄ (liquid at room temp, covalent)!"
      }
    ],
    keyPoints: [
      "Explains color intensity, melting point variations, and solubility of salts.",
      "AgF (ionic, soluble) vs AgI (covalent, yellow precipitate) is a favorite NEET/JEE question."
    ]
  },
  {
    id: "chem-11-cbm-4",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Bonding and Molecular Structure",
    topic: "VSEPR Theory: Molecular Shapes & Bond Angles",
    weightage: "High",
    examTarget: "Both",
    concept: "Valence Shell Electron Pair Repulsion theory states that electron pairs around central atom arrange to minimize mutual electrostatic repulsion.",
    shortNotes: [
      "Order of electron pair repulsion: Lone Pair - Lone Pair (lp-lp) > Lone Pair - Bond Pair (lp-bp) > Bond Pair - Bond Pair (bp-bp).",
      "Steric Number SN = Bond Pairs (σ bonds) + Lone Pairs on central atom.",
      "SN = 2: Linear (180°), BeCl₂, CO₂.",
      "SN = 3: Trigonal planar (120°), BF₃; 1 lp: Bent/V-shaped (<120°), SO₂, NO₂⁻.",
      "SN = 4: Tetrahedral (109.5°), CH₄; 1 lp: Trigonal pyramidal (107°), NH₃; 2 lp: Bent (104.5°), H₂O.",
      "SN = 5: Trigonal bipyramidal (90°, 120°), PCl₅; 1 lp: See-saw (SF₄); 2 lp: T-shaped (ClF₃); 3 lp: Linear (XeF₂, I₃⁻).",
      "SN = 6: Octahedral (90°), SF₆; 1 lp: Square pyramidal (BrF₅); 2 lp: Square planar (XeF₄)."
    ],
    formulas: [
      {
        name: "Steric Number / Hybridization Number Formula",
        formula: "\\text{SN} = \\frac{1}{2} \\left[ V + M - C + A \\right]",
        variables: "V = valence electrons of central atom, M = number of monovalent surrounding atoms (H, F, Cl, Br, I), C = cationic charge, A = anionic charge",
        examTip: "For XeF₄: SN = 1/2 [8 + 4 - 0 + 0] = 6 (sp³d², 4 bp + 2 lp = Square Planar).",
        trap: "Divalent atoms like Oxygen are IGNORED in 'M'! For SO₄²⁻: SN = 1/2 [6 + 0 - 0 + 2] = 4 (sp³, tetrahedral)."
      }
    ],
    keyPoints: [
      "In trigonal bipyramidal (SN=5), lone pairs ALWAYS occupy equatorial positions to minimize 90° repulsions.",
      "In octahedral (SN=6), two lone pairs occupy trans axial positions (180° apart) giving square planar geometry."
    ]
  },
  {
    id: "chem-11-cbm-5",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Bonding and Molecular Structure",
    topic: "Hybridization: Types & Steric Number",
    weightage: "High",
    examTarget: "Both",
    concept: "Intermixing of atomic orbitals of slightly different energies to produce an equal number of new equivalent hybrid orbitals.",
    shortNotes: [
      "Only valence shell atomic orbitals of comparable energy participate.",
      "Number of hybrid orbitals formed = Number of atomic orbitals hybridized.",
      "Hybrid orbitals form exclusively σ-bonds or hold lone pairs; pure unhybridized p/d orbitals form π-bonds.",
      "Hybridization types: sp (50% s, linear), sp² (33% s, trigonal planar), sp³ (25% s, tetrahedral), dsp² (square planar), sp³d (trigonal bipyramidal), sp³d² (octahedral), sp³d³ (pentagonal bipyramidal)."
    ],
    formulas: [
      {
        name: "Fractional s-Character & Bond Angle Relation",
        formula: "\\cos \\theta = -\\frac{s}{1 - s} = -\\frac{1}{n} \\quad \\text{for } sp^n \\text{ hybridization}",
        variables: "θ = bond angle between hybrid orbitals, s = fractional s-character, n = p/s ratio",
        examTip: "For sp³: cos θ = -1/3 ⇒ θ = 109.5°. For sp²: cos θ = -1/2 ⇒ θ = 120°. For sp: cos θ = -1 ⇒ θ = 180°.",
        trap: "In PCl₅, axial P-Cl bonds are LONGER and WEAKER than equatorial P-Cl bonds due to repulsion from 3 equatorial bonds at 90°."
      }
    ],
    keyPoints: [
      "d-orbital involved in sp³d is strictly d_z²; in sp³d² they are d_x²-y² and d_z²; in dsp² it is d_x²-y².",
      "Bent's Rule: More electronegative substituent prefers hybrid orbital with LESS s-character (axial in TBP)."
    ]
  },
  {
    id: "chem-11-cbm-6",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Bonding and Molecular Structure",
    topic: "Dipole Moment & Percentage Ionic Character",
    weightage: "High",
    examTarget: "Both",
    concept: "Dipole moment (μ) is the vector measure of electrical polarity of a molecule: μ = q × d. Symmetrical molecules have net μ = 0.",
    shortNotes: [
      "Vector points from positive center to negative center (in chemistry: from electropositive atom to electronegative atom).",
      "Units: Debye (D). 1 D = 3.33564 × 10⁻³⁰ C·m = 10⁻¹⁸ esu·cm.",
      "For diatomic molecules: μ = 0 for homonuclear (H₂, N₂, O₂); μ > 0 for heteronuclear (HF > HCl > HBr > HI).",
      "For polyatomic molecules: Net μ is vector sum of bond dipole moments. Symmetrical molecules like BF₃, CCl₄, CO₂, SF₆, XeF₄ have μ = 0.",
      "NH₃ vs NF₃: Dipole moment of NH₃ (1.47 D) is MUCH GREATER than NF₃ (0.24 D) because in NH₃, lone pair and bond dipoles reinforce each other, whereas in NF₃, F is more electronegative than N so bond dipoles oppose lone pair!"
    ],
    formulas: [
      {
        name: "Dipole Moment & Vector Addition Formula",
        formula: "\\mu = q \\times d, \\quad \\mu_{\\text{net}} = \\sqrt{\\mu_1^2 + \\mu_2^2 + 2 \\mu_1 \\mu_2 \\cos \\theta}",
        variables: "q = electronic charge magnitude, d = distance between charge centers (bond length), θ = angle between bond vectors",
        examTip: "In cis-isomer, bond dipoles add up (μ > 0); in trans-isomer with identical groups, bond dipoles cancel (μ = 0).",
        trap: "Para-dichlorobenzene has μ = 0, but Para-dihydroxybenzene (Hydroquinone) has μ ≠ 0 because O-H bonds are bent and can rotate!"
      },
      {
        name: "Hannay-Smith Percentage Ionic Character",
        formula: "\\% \\text{ Ionic Character} = \\frac{\\mu_{\\text{observed}}}{\\mu_{\\text{theoretical}}} \\times 100\\% = 16 |\\chi_A - \\chi_B| + 3.5 |\\chi_A - \\chi_B|^2",
        variables: "μ_obs = experimental dipole moment, μ_theo = calculated assuming 100% ionic transfer (q = 1.6 × 10⁻¹⁹ C), χ = electronegativity",
        examTip: "If |χ_A - χ_B| = 1.7, bond is approximately 50% ionic and 50% covalent.",
        trap: "μ_theo = e × d = 4.8 × 10⁻¹⁰ esu × d(cm) = 4.8 × d(Å) Debye."
      }
    ],
    keyPoints: [
      "NH₃ (1.47 D) vs NF₃ (0.24 D) is one of the top 3 most frequently tested concepts in chemical bonding across all exams.",
      "Orthodichlorobenzene (θ=60°, μ=√3 μ₁) > Meta (θ=120°, μ=μ₁) > Para (θ=180°, μ=0)."
    ]
  },
  {
    id: "chem-11-cbm-7",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Bonding and Molecular Structure",
    topic: "Molecular Orbital Theory (MOT) & Bond Order",
    weightage: "High",
    examTarget: "Both",
    concept: "Linear Combination of Atomic Orbitals (LCAO) produces bonding (constructive interference, lower energy) and antibonding (destructive interference, higher energy) molecular orbitals.",
    shortNotes: [
      "Number of MOs formed = Number of atomic orbitals combining.",
      "Energy order for molecules with ≤ 14 electrons (B₂, C₂, N₂): σ1s < σ*1s < σ2s < σ*2s < (π2p_x = π2p_y) < σ2p_z < (π*2p_x = π*2p_y) < σ*2p_z. (π before σ due to s-p mixing).",
      "Energy order for molecules with > 14 electrons (O₂, F₂): σ1s < σ*1s < σ2s < σ*2s < σ2p_z < (π2p_x = π2p_y) < (π*2p_x = π*2p_y) < σ*2p_z. (σ before π, no s-p mixing).",
      "Bond Order BO = 1/2 (N_b - N_a).",
      "If BO > 0: Molecule is stable and exists; If BO = 0: Molecule cannot exist (He₂, Be₂, Ne₂).",
      "Magnetic nature: Unpaired electrons in MOs = Paramagnetic; All paired = Diamagnetic.",
      "O₂ is PARAMAGNETIC with 2 unpaired electrons in degenerate π*2p_x and π*2p_y antibonding orbitals!"
    ],
    formulas: [
      {
        name: "Bond Order Formula & Shortcut Table",
        formula: "\\text{BO} = \\frac{N_b - N_a}{2}",
        variables: "N_b = number of electrons in bonding molecular orbitals, N_a = number of electrons in antibonding molecular orbitals (*)",
        examTip: "14 electrons (N₂) = BO 3.0. For every electron added or removed from 14, decrease BO by 0.5: 10e⁻(1.0), 11e⁻(1.5), 12e⁻(2.0), 13e⁻(2.5), 14e⁻(3.0), 15e⁻(2.5), 16e⁻(2.0), 17e⁻(1.5), 18e⁻(1.0).",
        trap: "In O₂⁺ (15e⁻, BO=2.5), O₂ (16e⁻, BO=2.0), O₂⁻ (Superoxide, 17e⁻, BO=1.5), O₂²⁻ (Peroxide, 18e⁻, BO=1.0). Bond length is inversely proportional to Bond Order: O₂²⁻ > O₂⁻ > O₂ > O₂⁺!"
      }
    ],
    keyPoints: [
      "Lewis theory could not explain why liquid oxygen (O₂) is attracted to a magnet; MOT explained it naturally.",
      "C₂ molecule has bond order 2 consisting ENTIRELY of two π-bonds (both electron pairs are in π2p_x and π2p_y orbitals)!"
    ]
  },
  {
    id: "chem-11-cbm-8",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Bonding and Molecular Structure",
    topic: "Hydrogen Bonding & Resonance",
    weightage: "High",
    examTarget: "Both",
    concept: "Hydrogen bond is the dipole-dipole attractive force between a hydrogen atom covalently bonded to a strongly electronegative atom (F, O, N) and another electronegative atom.",
    shortNotes: [
      "Strength of H-bond: ~10 to 40 kJ/mol (much weaker than covalent bond ~400 kJ/mol, but stronger than van der Waals forces ~2-8 kJ/mol).",
      "Intermolecular H-bonding: Formed between different molecules of same or different compounds (e.g. H₂O, HF, NH₃, Alcohols). Increases boiling point, viscosity, and solubility in water.",
      "Intramolecular H-bonding (Chelation): Formed within the same molecule (e.g. o-Nitrophenol, Salicylaldehyde). Decreases boiling point, increases steam volatility.",
      "Boiling point comparison: H₂O (100°C) > HF (19.5°C) > NH₃ (-33°C). H₂O forms on average 4 H-bonds per molecule; HF has only 1 H per F.",
      "Density anomaly of water: Ice has an open cage-like tetrahedral structure with large vacant spaces. Upon melting at 0°C, cage collapses, and water reaches maximum density at 4°C (3.98°C)."
    ],
    formulas: [
      {
        name: "Resonance Energy Equation",
        formula: "\\text{Resonance Energy} = |\\text{Actual Experimental Heat of Formation/Hydrogenation} - \\text{Theoretical Calculated Energy of Most Stable Lewis Structure}|",
        variables: "Higher resonance energy = greater thermodynamic stability of the conjugate molecule",
        examTip: "o-Nitrophenol is steam volatile due to intramolecular H-bonding, whereas p-Nitrophenol is non-steam-volatile due to intermolecular H-bonding.",
        trap: "Chlorine has same electronegativity as Nitrogen (3.0), but Cl does NOT form effective H-bonds due to its larger atomic size and diffused electron cloud."
      }
    ],
    keyPoints: [
      "Explains unusual physical states: H₂O is liquid while H₂S is gas; HF is liquid while HCl is gas.",
      "KHF₂ exists as K⁺ and [F-H···F]⁻ due to symmetrical, very strong hydrogen bonding, but KHCl₂ does not exist."
    ]
  }
,
{
    "id": "chem-11-cth-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Thermodynamics",
    "topic": "First Law of Thermodynamics & Work Done",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Energy can neither be created nor destroyed: ΔU = q + w. IUPAC sign convention: Heat absorbed by system is positive (+q), Work done on system is positive (+w).",
    "shortNotes": [
      "State functions depend solely on initial and final states: U, H, S, G, P, V, T.",
      "Path functions depend on the mechanism / path taken: q (heat) and w (work).",
      "Isothermal process: ΔT = 0, ΔU = 0 (for ideal gas).",
      "Adiabatic process: q = 0, ΔU = w_adiabatic.",
      "Isochoric process: ΔV = 0, w = 0, ΔU = q_v.",
      "Isobaric process: ΔP = 0, w = -P_ext ΔV, ΔH = q_p."
    ],
    "formulas": [
      {
        "name": "First Law & Expansion Work",
        "formula": "\\Delta U = q + w, \\quad w_{\\text{irrev}} = -P_{\\text{ext}} (V_2 - V_1) = -P_{\\text{ext}} \\Delta V",
        "variables": "ΔU = change in internal energy, q = heat transferred, w = work done, P_ext = external opposing pressure, ΔV = volume change",
        "examTip": "In free expansion against vacuum (P_ext = 0): w = 0! For isothermal free expansion of ideal gas: w = 0, q = 0, ΔU = 0, ΔT = 0.",
        "trap": "In Physics, First Law is often written as ΔQ = ΔU + W (where W is work done BY system). In Chemistry, IUPAC convention is ΔU = q + w (where w is work done ON system: w = -P ΔV)!"
      },
      {
        "name": "Reversible Isothermal Work Equation",
        "formula": "w_{\\text{rev, iso}} = -2.303 n R T \\log_{10} \\left( \\frac{V_2}{V_1} \\right) = -2.303 n R T \\log_{10} \\left( \\frac{P_1}{P_2} \\right)",
        "variables": "n = moles of ideal gas, R = 8.314 J/mol·K (or 2 cal/mol·K), T = absolute temperature (K), V₁, V₂ = initial and final volumes",
        "examTip": "Magnitude of reversible expansion work is always greater than irreversible work: |w_rev| > |w_irrev|.",
        "trap": "During compression (V₂ < V₁), w is POSITIVE. During expansion (V₂ > V₁), w is NEGATIVE."
      }
    ],
    "keyPoints": [
      "Extensive properties depend on mass (mass, volume, heat capacity, internal energy, enthalpy, entropy, Gibbs energy).",
      "Intensive properties are independent of mass (temperature, pressure, density, molar heat capacity, refractive index, surface tension)."
    ]
  },
  {
    "id": "chem-11-cth-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Thermodynamics",
    "topic": "Enthalpy, Heat Capacity & ΔH vs ΔU Relation",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Enthalpy is the heat content of a system at constant pressure: H = U + PV. Heat capacity is heat required to raise temperature by 1 Kelvin.",
    "shortNotes": [
      "At constant pressure: q_p = ΔH. At constant volume: q_v = ΔU.",
      "Relationship for chemical reactions involving gases: ΔH = ΔU + Δn_g RT.",
      "Δn_g = (Total moles of gaseous products) - (Total moles of gaseous reactants). Solids and liquids are excluded!",
      "Molar heat capacity: C_p - C_v = R (Mayer's relation for ideal gas).",
      "Poisson's ratio γ = C_p / C_v: Monatomic (γ = 5/3 = 1.67), Diatomic (γ = 7/5 = 1.40), Polyatomic (γ = 4/3 = 1.33)."
    ],
    "formulas": [
      {
        "name": "Enthalpy vs Internal Energy Master Equation",
        "formula": "\\Delta H = \\Delta U + \\Delta n_g R T",
        "variables": "ΔH = enthalpy change (J or kJ), ΔU = internal energy change, Δn_g = moles of gaseous products - moles of gaseous reactants, R = 8.314 J/mol·K",
        "examTip": "If Δn_g = 0 (e.g. H₂(g) + I₂(g) ⇌ 2HI(g)): ΔH = ΔU. If Δn_g > 0: ΔH > ΔU. If Δn_g < 0: ΔH < ΔU.",
        "trap": "In combustion reactions, water is often liquid at standard temperature (298 K): C(s) + O₂(g) → CO₂(g) has Δn_g = 1 - 1 = 0!"
      },
      {
        "name": "Reversible Adiabatic Expansion Relations",
        "formula": "P V^\\gamma = \\text{constant}, \\quad T V^{\\gamma - 1} = \\text{constant}, \\quad T^\\gamma P^{1 - \\gamma} = \\text{constant}, \\quad w = n C_v (T_2 - T_1)",
        "variables": "γ = C_p / C_v = 1 + R / C_v",
        "examTip": "In adiabatic expansion (w < 0), temperature of system DROPS (T₂ < T₁), causing cooling.",
        "trap": "C_v for monatomic gas = (3/2)R, for diatomic = (5/2)R. C_p = C_v + R."
      }
    ],
    "keyPoints": [
      "Kirchhoff's equation relates enthalpy change at two temperatures: ΔH₂ - ΔH₁ = ΔC_p (T₂ - T₁).",
      "Bomb calorimeter measures heat at constant volume (ΔU); open cup measures heat at constant pressure (ΔH)."
    ]
  },
  {
    "id": "chem-11-cth-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Thermodynamics",
    "topic": "Hess's Law of Constant Heat Summation & Bond Enthalpy",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Hess's Law: Enthalpy change for a chemical reaction is identical whether the reaction takes place in one step or in several consecutive steps.",
    "shortNotes": [
      "Standard enthalpy of formation (Δ_f H°) of an element in its standard reference state is zero by definition (e.g. O₂(g), C(graphite), H₂(g), Br₂(l), S(rhombic)).",
      "Reaction enthalpy from formation enthalpies: Δ_r H° = Σ [n_p Δ_f H°(products)] - Σ [n_r Δ_f H°(reactants)].",
      "Reaction enthalpy from bond enthalpies: Δ_r H° = Σ [Bond energies of broken bonds (reactants)] - Σ [Bond energies of formed bonds (products)].",
      "Enthalpy of combustion (Δ_c H°) is always negative (exothermic)."
    ],
    "formulas": [
      {
        "name": "Hess's Law Reaction Enthalpy Formula",
        "formula": "\\Delta_r H^\\circ = \\sum n_p \\Delta_f H^\\circ(\\text{Products}) - \\sum n_r \\Delta_f H^\\circ(\\text{Reactants})",
        "variables": "n_p, n_r = stoichiometric coefficients of products and reactants",
        "examTip": "Δ_f H° of C(diamond) is NOT zero (+1.9 kJ/mol); graphite is standard state!",
        "trap": "When using Bond Energies, it is REACTANTS MINUS PRODUCTS (Bonds broken - Bonds formed), which is the exact opposite of Formation enthalpies (Products - Reactants)!"
      },
      {
        "name": "Bond Enthalpy Reaction Equation",
        "formula": "\\Delta_r H^\\circ = \\sum \\text{B.E.}(\\text{Reactants broken}) - \\sum \\text{B.E.}(\\text{Products formed})",
        "variables": "B.E. = average bond dissociation enthalpy (all species must be in gaseous state)",
        "examTip": "If any species is in liquid/solid state, incorporate heat of vaporization/sublimation into the thermochemical cycle.",
        "trap": "Bond enthalpy equations are strictly valid only for gaseous species: X(g) - Y(g) → X(g) + Y(g)."
      }
    ],
    "keyPoints": [
      "Resonance energy = Theoretical calculated heat of combustion/hydrogenation - Observed experimental value.",
      "Enthalpy of neutralization of strong acid with strong base is a constant: Δ_neut H° = -57.1 kJ/mol = -13.7 kcal/mol."
    ]
  },
  {
    "id": "chem-11-cth-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Thermodynamics",
    "topic": "Second Law of Thermodynamics, Entropy & Spontaneity",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Entropy (S) is the measure of molecular disorder or randomness of a system. Total entropy of the universe increases in any spontaneous (irreversible) process.",
    "shortNotes": [
      "Second Law: ΔS_total = ΔS_system + ΔS_surroundings > 0 for spontaneous process.",
      "At equilibrium: ΔS_total = 0.",
      "ΔS_system = q_rev / T.",
      "ΔS_surroundings = -q_system / T = -ΔH_system / T (at constant pressure).",
      "Entropy order of states of matter: Solid < Liquid << Gas.",
      "Entropy increases when: number of gaseous moles increases (Δn_g > 0), temperature increases, solid dissolves in liquid, polymer unfolds/egg is boiled."
    ],
    "formulas": [
      {
        "name": "Entropy Change for Ideal Gas",
        "formula": "\\Delta S = n C_v \\ln \\left(\\frac{T_2}{T_1}\\right) + n R \\ln \\left(\\frac{V_2}{V_1}\\right) = n C_p \\ln \\left(\\frac{T_2}{T_1}\\right) - n R \\ln \\left(\\frac{P_2}{P_1}\\right)",
        "variables": "n = moles, C_v, C_p = molar heat capacities, T = temperature, V = volume, P = pressure",
        "examTip": "For isothermal expansion of ideal gas (T₁=T₂): ΔS = nR ln(V₂/V₁) = 2.303 nR log₁₀(V₂/V₁).",
        "trap": "In an isolated system (q = 0, surroundings unaffected): spontaneity is governed solely by ΔS_system > 0."
      },
      {
        "name": "Phase Transition Entropy Formula",
        "formula": "\\Delta_{\\text{fus}} S = \\frac{\\Delta_{\\text{fus}} H}{T_{\\text{mp}}}, \\quad \\Delta_{\\text{vap}} S = \\frac{\\Delta_{\\text{vap}} H}{T_{\\text{bp}}}",
        "variables": "T_mp = melting point (K), T_bp = boiling point (K), ΔH = latent heat of phase transition",
        "examTip": "Trouton's rule: For most non-associated liquids, Δ_vap S ≈ 88 J/mol·K (water is higher ~109 J/mol·K due to H-bonding).",
        "trap": "Always convert temperatures to KELVIN (K = °C + 273.15) before dividing!"
      }
    ],
    "keyPoints": [
      "When an egg is boiled, denaturation of protein increases disorder: entropy INCREASES (ΔS > 0).",
      "Stretching of rubber band aligns polymer chains: entropy DECREASES (ΔS < 0)."
    ]
  },
  {
    "id": "chem-11-cth-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Thermodynamics",
    "topic": "Gibbs Free Energy & Chemical Equilibrium",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Gibbs Free Energy (G = H - TS) represents the maximum non-expansion useful work obtainable from a closed system at constant temperature and pressure.",
    "shortNotes": [
      "Gibbs-Helmholtz Equation: ΔG = ΔH - TΔS.",
      "Criterion for spontaneity at constant T and P: ΔG < 0 (Spontaneous), ΔG = 0 (Equilibrium), ΔG > 0 (Non-spontaneous).",
      "If ΔH < 0 and ΔS > 0: ΔG is negative at ALL temperatures (Always spontaneous).",
      "If ΔH > 0 and ΔS < 0: ΔG is positive at ALL temperatures (Never spontaneous).",
      "If ΔH < 0 and ΔS < 0: Spontaneous ONLY at LOW temperatures (T < ΔH/ΔS).",
      "If ΔH > 0 and ΔS > 0: Spontaneous ONLY at HIGH temperatures (T > ΔH/ΔS).",
      "Equilibrium temperature where process switches spontaneity: T_eq = ΔH / ΔS."
    ],
    "formulas": [
      {
        "name": "Gibbs-Helmholtz Spontaneity Equation",
        "formula": "\\Delta G = \\Delta H - T \\Delta S",
        "variables": "ΔG = change in Gibbs free energy, ΔH = enthalpy change, T = absolute temperature (K), ΔS = entropy change",
        "examTip": "Be vigilant with units: ΔH is typically given in kJ/mol, while ΔS is in J/mol·K. Convert both to kJ or both to J!",
        "trap": "At the threshold temperature where reaction becomes spontaneous: ΔG = 0 ⇒ T = ΔH / ΔS."
      },
      {
        "name": "Standard Gibbs Energy vs Equilibrium Constant",
        "formula": "\\Delta G^\\circ = -R T \\ln K = -2.303 R T \\log_{10} K",
        "variables": "ΔG° = standard Gibbs free energy change, R = 8.314 J/mol·K, T = absolute temperature (K), K = equilibrium constant (K_p or K_c)",
        "examTip": "If ΔG° < 0: K > 1 (products favored at equilibrium). If ΔG° > 0: K < 1 (reactants favored). If ΔG° = 0: K = 1.",
        "trap": "ΔG = ΔG° + RT ln Q. At equilibrium, ΔG = 0 (and Q = K), but ΔG° is NOT zero unless K = 1!"
      }
    ],
    "keyPoints": [
      "Van 't Hoff reaction isotherm connects non-standard ΔG with reaction quotient Q: ΔG = ΔG° + 2.303 RT log Q.",
      "Third Law of Thermodynamics: Entropy of a perfectly crystalline pure substance approaches zero at absolute zero temperature (0 K): S_(0K) = 0."
    ]
  },
  {
    "id": "chem-11-equ-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Law of Mass Action & Equilibrium Constants (Kc and Kp)",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Dynamic equilibrium is reached in a reversible reaction when the rates of forward and reverse reactions are equal: r_f = r_b.",
    "shortNotes": [
      "Equilibrium constant K depends ONLY on temperature; independent of initial concentrations, volume, pressure, or presence of catalyst.",
      "For aA + bB ⇌ cC + dD: K_c = ([C]^c [D]^d) / ([A]^a [B]^b).",
      "For gas phase: K_p = (P_C^c P_D^d) / (P_A^a P_B^b).",
      "K_p = K_c (RT)^Δn_g, where Δn_g = (c + d) - (a + b) of gaseous species.",
      "If reaction is reversed: K' = 1 / K. If multiplied by n: K' = Kⁿ. If two reactions are added: K_net = K₁ × K₂."
    ],
    "formulas": [
      {
        "name": "Kp vs Kc Master Relation",
        "formula": "K_p = K_c (R T)^{\\Delta n_g}",
        "variables": "R = 0.0821 L·atm/mol·K (or 0.0831 bar·L/mol·K), T = temperature in Kelvin, Δn_g = gaseous product moles - gaseous reactant moles",
        "examTip": "If Δn_g = 0 (e.g. H₂ + I₂ ⇌ 2HI): K_p = K_c. If Δn_g > 0: K_p > K_c (at T > 12.2 K). If Δn_g < 0: K_p < K_c.",
        "trap": "In K_c and K_p expressions, active masses of pure solids (s) and pure liquids (l) are taken as 1 (constant activity) and omitted!"
      },
      {
        "name": "Van 't Hoff Temperature Isochore",
        "formula": "\\log_{10} \\left( \\frac{K_2}{K_1} \\right) = \\frac{\\Delta H^\\circ}{2.303 R} \\left[ \\frac{1}{T_1} - \\frac{1}{T_2} \\right] = \\frac{\\Delta H^\\circ}{2.303 R} \\left[ \\frac{T_2 - T_1}{T_1 T_2} \\right]",
        "variables": "K₁, K₂ = equilibrium constants at temperatures T₁ and T₂, ΔH° = standard reaction enthalpy",
        "examTip": "For ENDOTHERMIC reactions (ΔH > 0): Increasing temperature INCREASES K (K₂ > K₁). For EXOTHERMIC reactions (ΔH < 0): Increasing T DECREASES K.",
        "trap": "Catalyst increases both forward and backward rates equally; it speeds up attainment of equilibrium but NEVER changes value of K!"
      }
    ],
    "keyPoints": [
      "Reaction quotient Q predicts direction: If Q < K, forward reaction proceeds; If Q > K, backward reaction proceeds; If Q = K, system is at equilibrium.",
      "Degree of dissociation α for gas A_n ⇌ n A: α = (D - d) / ((n - 1)d), where D is theoretical vapour density and d is experimental vapour density."
    ]
  },
  {
    "id": "chem-11-equ-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Le Chatelier's Principle & Applications",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "If a chemical system at dynamic equilibrium is subjected to a change in concentration, temperature, or pressure, the system shifts in the direction that counteracts the change.",
    "shortNotes": [
      "Concentration: Adding reactant shifts equilibrium FORWARD; Adding product shifts BACKWARD.",
      "Pressure: Increasing pressure shifts equilibrium toward side with FEWER moles of gas (smaller volume). If Δn_g = 0, pressure has no effect on equilibrium position.",
      "Temperature: Increasing temperature favors ENDOTHERMIC direction (absorbs heat); Decreasing temperature favors EXOTHERMIC direction.",
      "Inert Gas Addition at Constant Volume (V = const): Partial pressures of reacting gases do NOT change, so NO effect on equilibrium position!",
      "Inert Gas Addition at Constant Pressure (P = const): Volume increases, shifting equilibrium towards side with GREATER moles of gas (Δn_g > 0)."
    ],
    "formulas": [
      {
        "name": "Haber's Process Optimal Conditions",
        "formula": "\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g), \\quad \\Delta H = -92.4 \\text{ kJ/mol}, \\quad \\Delta n_g = -2",
        "variables": "High pressure (200 atm), Moderate temperature (450-500°C), Iron catalyst with Mo promoter",
        "examTip": "Exothermic with Δn_g < 0: favored by HIGH pressure and LOW temperature.",
        "trap": "Adding inert gas at constant VOLUME has ZERO effect on equilibrium position! This is a classic trap in JEE Main."
      }
    ],
    "keyPoints": [
      "Tested regularly in conceptual assertion-reason and multiple-choice questions.",
      "Catalyst lowers activation energy for both forward and reverse paths identically."
    ]
  },
  {
    "id": "chem-11-equ-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Ionic Product of Water & pH Scale",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Water self-ionizes weakly: 2 H₂O ⇌ H₃O⁺ + OH⁻. The ionic product of water K_w = [H⁺][OH⁻] is temperature-dependent.",
    "shortNotes": [
      "At 25°C (298 K): K_w = 1.0 × 10⁻¹⁴ mol²/L² ⇒ pH + pOH = 14.",
      "Pure water at 25°C: [H⁺] = [OH⁻] = 10⁻⁷ M ⇒ pH = 7.0 (Neutral).",
      "Self-ionization of water is ENDOTHERMIC: As temperature increases, K_w increases (at 90°C, K_w ≈ 10⁻¹² ⇒ neutral pH = 6.0!).",
      "pH = -log₁₀[H⁺], pOH = -log₁₀[OH⁻], pK_w = -log₁₀ K_w.",
      "For strong acid (HCl, HNO₃): [H⁺] = N (Normality). If concentration is very dilute (< 10⁻⁶ M, e.g. 10⁻⁸ M HCl), contribution of H⁺ from water (10⁻⁷ M) must be added!"
    ],
    "formulas": [
      {
        "name": "pH & Kw Relations",
        "formula": "\\text{pH} = -\\log_{10}[\\text{H}^+], \\quad \\text{pOH} = -\\log_{10}[\\text{OH}^-], \\quad \\text{pH} + \\text{pOH} = \\text{pK}_w = 14 \\text{ (at 25}^\\circ\\text{C)}",
        "variables": "[H⁺], [OH⁻] = molar concentrations of hydronium and hydroxide ions in solution",
        "examTip": "pH of 10⁻⁸ M HCl is NOT 8! It is slightly acidic: [H⁺]_total = 10⁻⁸ + 10⁻⁷ = 1.1 × 10⁻⁷ M ⇒ pH ≈ 6.96.",
        "trap": "At higher temperatures (e.g. 60°C, pH of pure water = 6.5), water is still NEUTRAL because [H⁺] = [OH⁻]!"
      }
    ],
    "keyPoints": [
      "One unit change in pH corresponds to a tenfold (10×) change in hydrogen ion concentration.",
      "Ostwald's Dilution Law for weak monobasic acid HA (degree of dissociation α): K_a = Cα² / (1 - α) ≈ Cα² (when α << 1)."
    ]
  },
  {
    "id": "chem-11-equ-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Ostwald's Dilution Law & Weak Electrolytes",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Weak electrolytes dissociate partially in aqueous solution. Degree of dissociation (α) increases with dilution and approaches unity at infinite dilution.",
    "shortNotes": [
      "For weak acid HA ⇌ H⁺ + A⁻: K_a = [H⁺][A⁻] / [HA] = Cα² / (1 - α).",
      "If α ≤ 0.05 (5% rule): (1 - α) ≈ 1 ⇒ K_a = Cα² ⇒ α = √(K_a / C).",
      "[H⁺] = Cα = √(K_a · C) ⇒ pH = 1/2 [pK_a - log C].",
      "For weak base BOH: α = √(K_b / C), [OH⁻] = √(K_b · C) ⇒ pOH = 1/2 [pK_b - log C].",
      "Relative strength of two weak acids of same concentration: Strength ratio = α₁ / α₂ = √(K_a1 / K_a2)."
    ],
    "formulas": [
      {
        "name": "Ostwald Dilution & Weak Acid pH",
        "formula": "\\alpha = \\sqrt{\\frac{K_a}{C}}, \\quad [\\text{H}^+] = \\sqrt{K_a \\cdot C}, \\quad \\text{pH} = \\frac{1}{2} [\\text{pK}_a - \\log_{10} C]",
        "variables": "K_a = acid dissociation constant, C = initial molar concentration, α = degree of dissociation (0 < α < 1)",
        "examTip": "If calculated α exceeds 0.05 (5%), quadratic equation must be solved: Cα² + K_a α - K_a = 0.",
        "trap": "As dilution increases (C decreases), α increases, but total [H⁺] = Cα DECREASES (pH increases towards 7)!"
      }
    ],
    "keyPoints": [
      "Common Ion Effect: Adding a strong electrolyte containing a common ion (e.g. CH₃COONa to CH₃COOH) suppresses the ionization of the weak electrolyte.",
      "Crucial for qualitative group analysis in practical salt testing."
    ]
  },
  {
    "id": "chem-11-equ-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Hydrolysis of Salts & pH Equations",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Interaction of cation or anion of a salt with water to produce acidic, alkaline, or neutral solutions.",
    "shortNotes": [
      "1. Salt of Strong Acid + Strong Base (NaCl, KNO₃): No hydrolysis occurs. Neutral solution (pH = 7.0).",
      "2. Salt of Weak Acid + Strong Base (CH₃COONa, Na₂CO₃): Anion hydrolysis. Basic solution (pH > 7). K_h = K_w / K_a.",
      "3. Salt of Strong Acid + Weak Base (NH₄Cl, FeSO₄): Cation hydrolysis. Acidic solution (pH < 7). K_h = K_w / K_b.",
      "4. Salt of Weak Acid + Weak Base (CH₃COONH₄): Both ions hydrolyze. K_h = K_w / (K_a · K_b). pH is INDEPENDENT of concentration!"
    ],
    "formulas": [
      {
        "name": "Salt Hydrolysis Master pH Formulas",
        "formula": "\\text{WA + SB: } \\text{pH} = 7 + \\frac{1}{2}[\\text{pK}_a + \\log C], \\quad \\text{SA + WB: } \\text{pH} = 7 - \\frac{1}{2}[\\text{pK}_b + \\log C], \\quad \\text{WA + WB: } \\text{pH} = 7 + \\frac{1}{2}[\\text{pK}_a - \\text{pK}_b]",
        "variables": "C = molar concentration of salt, K_w = 10⁻¹⁴, K_a, K_b = dissociation constants of weak acid/base",
        "examTip": "For salt of WA + WB (like Ammonium Acetate): pH does NOT depend on concentration C! If pK_a = pK_b (like CH₃COONH₄), pH = 7.0 exactly.",
        "trap": "Hydrolysis degree h = √(K_h / C) for WA+SB and SA+WB, but for WA+WB: h = √(K_h) = √(K_w / (K_a · K_b)) (independent of C)!"
      }
    ],
    "keyPoints": [
      "Frequently tested in NEET and JEE Main physical chemistry numerical sections.",
      "Remember signs: WA + SB has +1/2(pK_a + log C); SA + WB has -1/2(pK_b + log C)."
    ]
  },
  {
    "id": "chem-11-equ-6",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Buffer Solutions & Henderson-Hasselbalch Equation",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "A buffer solution resists change in pH upon addition of small amounts of strong acid or strong base.",
    "shortNotes": [
      "Acidic Buffer: Mixture of weak acid and its salt with strong base (e.g. CH₃COOH + CH₃COONa). pH < 7.",
      "Basic Buffer: Mixture of weak base and its salt with strong acid (e.g. NH₄OH + NH₄Cl). pH > 7.",
      "Henderson-Hasselbalch Equation: Relates pH to pK_a and ratio of salt to acid.",
      "Maximum buffer capacity occurs when [Salt] = [Acid] ⇒ pH = pK_a (or pOH = pK_b).",
      "Effective buffer range: pH = pK_a ± 1.",
      "Blood is a biological buffer maintained at pH 7.4 by H₂CO₃ / HCO₃⁻ system."
    ],
    "formulas": [
      {
        "name": "Henderson-Hasselbalch Equations",
        "formula": "\\text{Acidic: } \\text{pH} = \\text{pK}_a + \\log_{10} \\left( \\frac{[\\text{Conjugate Base / Salt}]}{[\\text{Weak Acid}]} \\right), \\quad \\text{Basic: } \\text{pOH} = \\text{pK}_b + \\log_{10} \\left( \\frac{[\\text{Conjugate Acid / Salt}]}{[\\text{Weak Base}]} \\right)",
        "variables": "[Salt], [Acid] = molar concentrations or millimoles in common volume",
        "examTip": "Since both salt and acid share the same container volume, mole ratio can be used directly without computing molarities!",
        "trap": "Buffer capacity β = (moles of acid or base added per liter) / ΔpH. Maximum when [Salt]/[Acid] = 1."
      }
    ],
    "keyPoints": [
      "A mixture of strong acid and its salt (e.g. HCl + NaCl) is NEVER a buffer!",
      "When adding small strong acid x to acidic buffer: pH_new = pK_a + log(([Salt] - x) / ([Acid] + x))."
    ]
  },
  {
    "id": "chem-11-equ-7",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Solubility Product (Ksp) & Common Ion Effect",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "In a saturated solution of a sparingly soluble salt, dynamic equilibrium exists between undissolved solid and dissolved ions: A_x B_y(s) ⇌ x Aʸ⁺(aq) + y Bˣ⁻(aq).",
    "shortNotes": [
      "K_sp = [Aʸ⁺]^x [Bˣ⁻]^y in saturated solution.",
      "For 1:1 salt (AgCl): K_sp = S² ⇒ S = √K_sp.",
      "For 1:2 or 2:1 salt (Ag₂CrO₄, PbCl₂, CaF₂): K_sp = (2S)²(S) = 4S³ ⇒ S = ∛(K_sp / 4).",
      "For 1:3 salt (Al(OH)₃, Fe(OH)₃): K_sp = (S)(3S)³ = 27S⁴ ⇒ S = ∜(K_sp / 27).",
      "For 2:3 salt (Ca₃(PO₄)₂, As₂S₃): K_sp = (3S)³(2S)² = 108S⁵ ⇒ S = (K_sp / 108)^(1/5).",
      "Ionic Product (Q_sp): If Q_sp < K_sp (Unsaturated, no ppt); If Q_sp = K_sp (Saturated); If Q_sp > K_sp (Supersaturated, PRECIPITATION OCCURS!).",
      "Common ion decreases molar solubility of sparingly soluble salt drastically."
    ],
    "formulas": [
      {
        "name": "General Solubility Product Formula",
        "formula": "K_{sp} = x^x y^y S^{x + y}, \\quad S = \\left( \\frac{K_{sp}}{x^x y^y} \\right)^{\\frac{1}{x + y}}",
        "variables": "S = molar solubility in mol/L, x, y = stoichiometric numbers of cation and anion in salt formula A_x B_y",
        "examTip": "To compare solubility of salts with DIFFERENT stoichiometry (e.g. AgCl vs Ag₂CrO₄), calculate S! Comparing K_sp directly gives wrong answers.",
        "trap": "In presence of common ion (e.g. AgCl in 0.1 M NaCl): [Cl⁻] ≈ 0.1 M ⇒ S_new = K_sp / 0.1 = 10 K_sp (solubility drops drastically)!"
      }
    ],
    "keyPoints": [
      "Simultaneous solubility of two sparingly soluble salts containing common ion (e.g. AgCl and AgBr in water): solve coupled equations.",
      "Foundation for selective precipitation in qualitative inorganic analysis (e.g. Group II sulphides precipitate in acidic medium while Group IV sulphides precipitate in alkaline medium)."
    ]
  }
,
{
    "id": "chem-11-red-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Redox Reactions",
    "topic": "Oxidation Numbers & Rules for Assignment",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Oxidation is loss of electrons or increase in oxidation state; Reduction is gain of electrons or decrease in oxidation state.",
    "shortNotes": [
      "Oxidation number (O.N.) in elemental form is zero (O₂, P₄, S₈, Cl₂, Na).",
      "Fluorine always has O.N. = -1 in all compounds.",
      "Oxygen is usually -2, EXCEPT in peroxides (-1, H₂O₂, Na₂O₂), superoxides (-1/2, KO₂), and OF₂ (+2), O₂F₂ (+1).",
      "Hydrogen is +1 with non-metals, but -1 in metal hydrides (NaH, CaH₂).",
      "Alkali metals (Group 1) are always +1; Alkaline earth metals (Group 2) are always +2.",
      "Sum of oxidation states in neutral molecule = 0; In polyatomic ion = net charge of ion."
    ],
    "formulas": [
      {
        "name": "Average vs Fractional Oxidation State",
        "formula": "\\sum (\\text{O.N. of all atoms}) = \\text{Net Molecular / Ionic Charge}",
        "variables": "O.N. = oxidation state of constituent atoms",
        "examTip": "In Fe₃O₄: Average O.N. of Fe is +8/3 (actually FeO · Fe₂O₃, one Fe²⁺ and two Fe³⁺).",
        "trap": "In Caro's acid (H₂SO₅): S is NOT +8! S has 1 peroxy linkage (-O-O-): 2(+1) + S + 3(-2) + 2(-1) = 0 ⇒ S = +6 (maximum valence of Sulfur)!"
      },
      {
        "name": "Peroxy & Special Oxidation Number Cases",
        "formula": "\\text{CrO}_5: \\text{Cr} = +6 \\text{ (Butterfly structure, 2 peroxy linkages)}, \\quad \\text{H}_2\\text{S}_2\\text{O}_8: \\text{S} = +6",
        "variables": "Marshall's acid H₂S₂O₈ has one peroxy linkage between the two SO₃H units",
        "examTip": "An element can NEVER exhibit an oxidation state higher than its group valence number (e.g. S max +6, Cr max +6, Mn max +7, Os max +8).",
        "trap": "If formal calculation gives O.N. exceeding maximum valence, peroxy linkages (-O-O-) are present!"
      }
    ],
    "keyPoints": [
      "Disproportionation reaction: Same element in a single compound is simultaneously oxidized and reduced (e.g. 2 H₂O₂ → 2 H₂O + O₂; Cl₂ + 2 OH⁻ → Cl⁻ + ClO⁻ + H₂O).",
      "Comproportionation: Two species with different oxidation states of same element react to form an intermediate state."
    ]
  },
  {
    "id": "chem-11-red-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Redox Reactions",
    "topic": "Balancing Redox Reactions & Electrochemical Series",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Redox equations must satisfy both law of conservation of mass and law of conservation of electrical charge.",
    "shortNotes": [
      "Ion-Electron (Half-reaction) method in Acidic medium:",
      "1. Separate into oxidation and reduction half-reactions.",
      "2. Balance atoms other than O and H.",
      "3. Balance O atoms by adding H₂O to deficient side.",
      "4. Balance H atoms by adding H⁺ to deficient side.",
      "5. Balance charge by adding electrons (e⁻).",
      "6. Multiply half-reactions by integers to equalize electrons, then add.",
      "In Basic medium: For every H⁺ present, add equal number of OH⁻ to BOTH sides to form H₂O."
    ],
    "formulas": [
      {
        "name": "Ion-Electron Half-Reaction Balance Rule",
        "formula": "\\text{Acidic: } \\text{O balanced by } \\text{H}_2\\text{O}, \\; \\text{H balanced by } \\text{H}^+; \\quad \\text{Basic: } \\text{Add } \\text{OH}^- \\text{ to neutralize } \\text{H}^+",
        "variables": "Electrons added to more positive side to balance net ionic charge",
        "examTip": "MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O (Acidic); Cr₂O₇²⁻ + 14 H⁺ + 6 e⁻ → 2 Cr³⁺ + 7 H₂O.",
        "trap": "Always double-check both mass AND net charge on both LHS and RHS of final balanced equation!"
      }
    ],
    "keyPoints": [
      "Electrochemical series lists standard reduction potentials (E°): Li⁺/Li is lowest (-3.05 V, strongest reducing agent); F₂/F⁻ is highest (+2.87 V, strongest oxidizing agent).",
      "A metal with lower E° (more negative) can displace a metal with higher E° from its salt solution (e.g. Zn + Cu²⁺ → Zn²⁺ + Cu)."
    ]
  },
  {
    "id": "chem-11-goc-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Some Basic Principles and Techniques",
    "topic": "IUPAC Nomenclature & Structural Isomerism",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Systematic IUPAC naming: Prefix (Substituents) + Word Root (Longest Carbon Chain) + Primary Suffix (Saturation) + Secondary Suffix (Principal Functional Group).",
    "shortNotes": [
      "Priority order of functional groups: -COOH > -SO₃H > Anhydride > -COOR > -COCl > -CONH₂ > -CN > -CHO > >C=O > -OH > -SH > -NH₂ > -C≡C- > >C=C-.",
      "Select longest continuous carbon chain containing maximum principal functional groups and multiple bonds.",
      "Number chain to give lowest locant to principal functional group first, then multiple bonds, then substituents.",
      "Structural Isomerism types: Chain (skeleton), Position (locant), Functional (alcohol/ether, aldehyde/ketone, acid/ester), Metamerism (alkyl groups on polyvalent atom), Tautomerism (keto-enol proton shift)."
    ],
    "formulas": [
      {
        "name": "Degree of Unsaturation / Double Bond Equivalent (DBE)",
        "formula": "\\text{DBE} = C + 1 - \\frac{H}{2} - \\frac{X}{2} + \\frac{N}{2}",
        "variables": "C = number of carbon atoms, H = number of hydrogen atoms, X = number of halogen atoms, N = number of nitrogen atoms (Oxygen and Sulfur are ignored)",
        "examTip": "DBE = 1 indicates 1 double bond OR 1 ring; DBE = 4 usually indicates a benzene ring (3 double bonds + 1 ring).",
        "trap": "In DBE formula: Nitrogen is ADDED (+N/2), Halogens are SUBTRACTED (-X/2), and Oxygen is completely OMITTED!"
      }
    ],
    "keyPoints": [
      "Keto-enol tautomerism requires at least one α-hydrogen attached to an sp³ carbon adjacent to carbonyl group.",
      "Phenol enol form is 99.9% favored over keto form due to aromatic resonance stabilization."
    ]
  },
  {
    "id": "chem-11-goc-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Some Basic Principles and Techniques",
    "topic": "Electronic Effects: Inductive & Electromeric Effects",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Inductive effect (I-effect) is permanent polarization of σ-electrons along a carbon chain due to electronegativity difference between bonded atoms.",
    "shortNotes": [
      "-I Effect (Electron-withdrawing): -NF₃⁺ > -NR₃⁺ > -NO₂ > -CN > -COOH > -F > -Cl > -Br > -I > -OH > -OR > -NH₂ > -C₆H₅ > -H.",
      "+I Effect (Electron-donating): -O⁻ > -COO⁻ > -C(CH₃)₃ (tert-butyl) > -CH(CH₃)₂ (isopropyl) > -CH₂CH₃ (ethyl) > -CH₃ > -T > -D > -H.",
      "Distance-dependent: Inductive effect decreases rapidly with distance and becomes virtually negligible beyond 3 carbon atoms.",
      "Electromeric effect (E-effect): Temporary complete shift of shared π-electron pair to one of the atoms in presence of attacking reagent. (+E: π-electrons shift towards reagent; -E: away from reagent)."
    ],
    "formulas": [
      {
        "name": "Acidic Strength via Inductive Effect",
        "formula": "\\text{Acidic Strength } K_a \\propto -I \\text{ effect} \\propto \\frac{1}{+I \\text{ effect}}",
        "variables": "Ka = acid dissociation constant",
        "examTip": "Trichloroacetic acid (CCl₃COOH) > Dichloro > Monochloro > Acetic acid (CH₃COOH). -I stabilizes conjugate carboxylate anion (RCOO⁻).",
        "trap": "Formic acid (HCOOH) is MORE acidic than Acetic acid (CH₃COOH) because methyl group (+I effect) destabilizes conjugate base acetate!"
      }
    ],
    "keyPoints": [
      "Basic strength of aliphatic amines in gas phase: 3° > 2° > 1° > NH₃ (pure +I effect).",
      "In aqueous solution due to combined inductive, hydration, and steric effects: (CH₃)₂NH (2°) > CH₃NH₂ (1°) > (CH₃)₃N (3°) > NH₃ (2° > 1° > 3° for methyl; 2° > 3° > 1° for ethyl!)."
    ]
  },
  {
    "id": "chem-11-goc-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Some Basic Principles and Techniques",
    "topic": "Resonance, Mesomeric Effect & Aromaticity",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Delocalization of π-electrons across conjugated systems (p-orbitals) providing extra thermodynamic stability (Resonance Energy).",
    "shortNotes": [
      "Conjugation conditions: alternate double bonds (C=C-C=C), double bond with positive charge (C=C-C⁺), with lone pair (C=C-Z̈), with free radical (C=C-C·), with vacant d-orbital.",
      "+M / +R Effect (Donates π-electrons into ring/chain): -O⁻, -OH, -OR, -NH₂, -NHR, -NHCOR, -Halogens.",
      "-M / -R Effect (Withdraws π-electrons): -NO₂, -CN, -CHO, -COOH, -COOR, -CONH₂, -SO₃H.",
      "Mesomeric effect is DISTANCE-INDEPENDENT throughout the conjugated system.",
      "Halogens are unique: Deactivating due to strong -I effect, but ORTHO/PARA directing due to +M lone pair donation!"
    ],
    "formulas": [
      {
        "name": "Hückel's Rule of Aromaticity",
        "formula": "\\text{Aromatic: Planar, Cyclic, Conjugated with } (4n + 2)\\pi \\text{ electrons } (n = 0, 1, 2, 3...)",
        "variables": "n = integer (0, 1, 2, 3...). 2, 6, 10, 14, 18 π-electrons",
        "examTip": "Antiaromatic: Planar, cyclic, conjugated with 4n π electrons (4, 8, 12 π-e⁻). Highly unstable! (e.g. Cyclobutadiene).",
        "trap": "Cyclooctatetraene (COT, 8 π-e⁻) is NOT antiaromatic: it adopts a non-planar 'tub shape' to avoid antiaromaticity, making it non-aromatic!"
      }
    ],
    "keyPoints": [
      "Stability order: Aromatic > Non-aromatic > Antiaromatic.",
      "Resonance contributors with complete octets for all atoms are far more stable than open-octet structures, even if formal charge resides on electronegative atom."
    ]
  },
  {
    "id": "chem-11-goc-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Some Basic Principles and Techniques",
    "topic": "Hyperconjugation & Reaction Intermediates",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Hyperconjugation (no-bond resonance / Baker-Nathan effect): Delocalization of σ-electrons of C-H bond into adjacent vacant p-orbital or π-orbital.",
    "shortNotes": [
      "Requires presence of at least one α-hydrogen on sp³ carbon attached to carbocation, radical, or alkene.",
      "Number of hyperconjugative structures = Number of α-hydrogens.",
      "Carbocation Stability: 3° > 2° > 1° > CH₃⁺ (due to +I and hyperconjugation: 9 α-H in (CH₃)₃C⁺ > 6 in (CH₃)₂CH⁺ > 3 in CH₃CH₂⁺).",
      "Free Radical Stability: 3° > 2° > 1° > ·CH₃ (same trend as carbocations).",
      "Carbanion Stability: CH₃⁻ > 1° > 2° > 3° (reversed! Alkyl groups donate electrons by +I, destabilizing negative charge).",
      "Alkene Stability ∝ Number of α-hydrogens ∝ Heat of Hydrogenation⁻¹."
    ],
    "formulas": [
      {
        "name": "Alkene Stability vs Heat of Hydrogenation",
        "formula": "\\text{Stability of Alkene} \\propto \\text{Number of } \\alpha\\text{-Hydrogens} \\propto \\frac{1}{\\Delta_{\\text{hydro}} H}",
        "variables": "Δ_hydro H = heat released upon catalytic hydrogenation",
        "examTip": "trans-alkenes are generally more stable than cis-alkenes due to minimal steric hindrance between alkyl substituents.",
        "trap": "Heat of hydrogenation is EXOTHERMIC. A smaller numerical magnitude indicates a more stable alkene!"
      }
    ],
    "keyPoints": [
      "Carbocations undergo spontaneous 1,2-hydride shift or 1,2-methyl shift to form a more stable intermediate (e.g. 1° → 3°).",
      "Tropylium cation (C₇H₇⁺, 6 π-electrons) is aromatic and exceptionally stable."
    ]
  },
  {
    "id": "chem-11-goc-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Some Basic Principles and Techniques",
    "topic": "Purification & Qualitative Elemental Analysis",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Purification techniques exploit physical property differences. Qualitative analysis identifies constituent elements in organic molecules.",
    "shortNotes": [
      "Distillation: Simple (boiling points differ by > 25°C), Fractional (differs by < 25°C), Steam (steam-volatile, water-insoluble like aniline, o-nitrophenol), Vacuum / Reduced pressure (decomposes at/near normal boiling point, e.g. glycerol).",
      "Chromatography: Adsorption (Column, TLC) vs Partition (Paper). Retention factor R_f = Distance moved by substance / Distance moved by solvent front.",
      "Lassaigne's Test (Sodium Fusion Extract): Converts covalently bonded N, S, Halogens into ionic sodium salts (NaCN, Na₂S, NaX).",
      "Test for Nitrogen: Extract + FeSO₄ + NaOH + heat + FeCl₃ + HCl → Prussian Blue color [Fe₄[Fe(CN)₆]₃].",
      "Test for Sulfur: Extract + Sodium nitroprusside → Violet color [Fe(CN)₅NOS]⁴⁻.",
      "Test for Both N and S: Extract forms NaSCN + FeCl₃ → Blood Red color [Fe(SCN)]²⁺."
    ],
    "formulas": [
      {
        "name": "Chromatography Retention Factor",
        "formula": "R_f = \\frac{\\text{Distance travelled by the substance from baseline}}{\\text{Distance travelled by the solvent front from baseline}}",
        "variables": "0 < R_f < 1, dimensionless ratio",
        "examTip": "Lassaigne's test fails for Hydrazine (NH₂-NH₂) and Hydroxylamine (NH₂OH) because they contain NO carbon to form NaCN!",
        "trap": "In testing for halogens in presence of N or S: boil extract with concentrated HNO₃ first to decompose NaCN and Na₂S as HCN and H₂S, otherwise AgCN/Ag₂S interfere as precipitates!"
      }
    ],
    "keyPoints": [
      "Silver nitrate test for halogens: AgCl (white ppt, soluble in NH₄OH), AgBr (pale yellow ppt, sparingly soluble in NH₄OH), AgI (yellow ppt, completely insoluble in NH₄OH).",
      "Beilstein's test detects halogens via green flame with copper wire, but does not distinguish which halogen is present."
    ]
  },
  {
    "id": "chem-11-goc-6",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Some Basic Principles and Techniques",
    "topic": "Quantitative Elemental Estimation Formulas",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Standard laboratory quantitative methods for determining mass percentages of Carbon, Hydrogen, Nitrogen, Halogens, and Sulfur in organic compounds.",
    "shortNotes": [
      "Liebig's Combustion: C converted to CO₂ (absorbed in KOH solution), H converted to H₂O (absorbed in anhydrous CaCl₂).",
      "Dumas Method: N-containing compound heated with CuO in CO₂ atmosphere; all Nitrogen released as N₂ gas, measured in nitrometer over KOH.",
      "Kjeldahl's Method: Compound digested with conc. H₂SO₄ (CuSO₄ catalyst) to form (NH₄)₂SO₄, liberated as NH₃ with NaOH, and titrated against standard acid.",
      "Carius Method: Heated with fuming HNO₃ and AgNO₃ in sealed Carius tube; Halogens precipitate as AgX, Sulfur precipitates as BaSO₄ (with BaCl₂)."
    ],
    "formulas": [
      {
        "name": "Carbon & Hydrogen Estimation",
        "formula": "\\% \\text{ C} = \\frac{12}{44} \\times \\frac{w_{\\text{CO}_2}}{w} \\times 100\\%, \\quad \\% \\text{ H} = \\frac{2}{18} \\times \\frac{w_{\\text{H}_2\\text{O}}}{w} \\times 100\\%",
        "variables": "w = mass of organic compound taken (g), w_CO2 = mass of CO₂ absorbed, w_H2O = mass of H₂O absorbed",
        "examTip": "KOH bulb increases in mass due to CO₂ absorption; CaCl₂ U-tube increases due to H₂O absorption.",
        "trap": "Remember factor 12/44 for Carbon (molecular weight of CO₂ = 44) and 2/18 for Hydrogen (H₂O = 18)."
      },
      {
        "name": "Nitrogen Estimation (Dumas vs Kjeldahl)",
        "formula": "\\text{Dumas: } \\% \\text{ N} = \\frac{28}{22400} \\times \\frac{V_{\\text{STP}}}{w} \\times 100\\%, \\quad \\text{Kjeldahl: } \\% \\text{ N} = \\frac{1.4 \\times N \\times V}{w}",
        "variables": "V_STP = volume of N₂ at STP in mL, w = mass of compound (g), N = normality of acid, V = volume of acid consumed by NH₃ in mL",
        "examTip": "Kjeldahl's method FAILS for nitro (-NO₂), azo (-N=N-), and ring nitrogen compounds (pyridine, quinoline) because they do not yield (NH₄)₂SO₄ upon acid digestion!",
        "trap": "V_STP in Dumas must be reduced from experimental P and T over aqueous tension: P_dry = P_barometric - Aqueous tension."
      },
      {
        "name": "Halogen & Sulfur Estimation (Carius Method)",
        "formula": "\\% \\text{ X} = \\frac{\\text{At. wt of X}}{\\text{Mol. wt of AgX}} \\times \\frac{w_{\\text{AgX}}}{w} \\times 100\\%, \\quad \\% \\text{ S} = \\frac{32}{233} \\times \\frac{w_{\\text{BaSO}_4}}{w} \\times 100\\%",
        "variables": "AgCl (143.5), AgBr (188), AgI (235); BaSO₄ molar mass = 233.3 g/mol",
        "examTip": "For Phosphorus (Carius): % P = (62 / 222) × (w_Mg₂P₂O₇ / w) × 100%.",
        "trap": "Be careful with molecular mass of BaSO₄ (233) vs BaCl₂!"
      }
    ],
    "keyPoints": [
      "Direct numericals are guaranteed every year in JEE Main and NEET chemistry.",
      "Kjeldahl's method is the universal official method for protein and fertilizer nitrogen determination."
    ]
  },
  {
    "id": "chem-11-hyd-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrocarbons",
    "topic": "Alkanes: Preparation & Free Radical Halogenation",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Alkanes (paraffins, C_n H_2n+2) are saturated hydrocarbons containing only single C-C and C-H σ-bonds, relatively unreactive under mild conditions.",
    "shortNotes": [
      "Wurtz Reaction: 2 R-X + 2 Na (dry ether) → R-R + 2 NaX. Best for symmetrical alkanes with even number of carbon atoms. Methane CANNOT be prepared.",
      "Decarboxylation: R-COONa + Soda-lime (NaOH + CaO, 3:1) → R-H + Na₂CO₃ (alkane with ONE LESS carbon atom).",
      "Kolbe's Electrolytic Synthesis: 2 R-COOK + 2 H₂O → R-R + 2 CO₂ (at anode) + H₂ + 2 KOH (at cathode).",
      "Free radical halogenation of alkanes (in UV light hν): Reactivity order F₂ > Cl₂ > Br₂ > I₂ (Fluorination is explosive; Iodination is reversible, requires oxidizing agent HNO₃ or HIO₃).",
      "Selectivity of halogen radicals: Bromine is highly selective (3°:2°:1° = 1600:82:1); Chlorine is less selective (3°:2°:1° = 5:3.8:1)."
    ],
    "formulas": [
      {
        "name": "Conformations of Ethane Energy Barrier",
        "formula": "\\text{Staggered (Dihedral angle } \\theta = 60^\\circ) > \\text{Skew} > \\text{Eclipsed } (\\theta = 0^\\circ)",
        "variables": "Torsional strain in eclipsed ethane = ~12.5 kJ/mol (3 kcal/mol)",
        "examTip": "Staggered conformation is most stable due to minimum torsional repulsion between C-H bonds.",
        "trap": "For n-butane: Anti (180°) > Gauche (60°) > Partially eclipsed (120°) > Fully eclipsed (0°). Exception: Ethylene glycol (OH-CH₂-CH₂-OH) Gauche is MORE stable than Anti due to intramolecular H-bonding!"
      }
    ],
    "keyPoints": [
      "Combustion: C_n H_2n+2 + (3n+1)/2 O₂ → n CO₂ + (n+1) H₂O.",
      "Corey-House synthesis prepares unsymmetrical alkanes in high yield: R₂CuLi + R'X → R-R'."
    ]
  },
  {
    "id": "chem-11-hyd-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrocarbons",
    "topic": "Alkenes: Markovnikov Rule & Peroxide Effect",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Electrophilic addition reactions of alkenes proceed via planar carbocation intermediates. Unsymmetric additions follow Markovnikov's rule.",
    "shortNotes": [
      "Markovnikov's Rule: In addition of unsymmetrical HX to unsymmetrical alkene, negative part of reagent adds to carbon possessing FEWER hydrogen atoms.",
      "Mechanism involves formation of more stable carbocation intermediate (3° > 2° > 1°).",
      "Carbocation can undergo rearrangement (hydride / methyl shift) before nucleophile attack!",
      "Peroxide Effect (Kharasch effect / Anti-Markovnikov addition): In presence of organic peroxides (R-O-O-R), addition of HBr proceeds via free radical mechanism: Br adds to carbon with MORE hydrogen atoms.",
      "Peroxide effect is OBSERVED EXCLUSIVELY WITH HBr! It fails completely for HF, HCl (H-Cl bond is too strong) and HI (I-I bond formation is preferred over addition)."
    ],
    "formulas": [
      {
        "name": "Markovnikov vs Anti-Markovnikov Additions",
        "formula": "\\text{Markovnikov: } \\text{R-CH=CH}_2 + \\text{HBr} \\to \\text{R-CH(Br)-CH}_3, \\quad \\text{Peroxide: } \\text{R-CH=CH}_2 + \\text{HBr} \\xrightarrow{\\text{Peroxide}} \\text{R-CH}_2\\text{-CH}_2\\text{Br}",
        "variables": "Markovnikov: electrophile H⁺ attacks first; Anti-Markovnikov: bromine radical ·Br attacks first",
        "examTip": "HCl in presence of peroxide STILL follows Markovnikov's rule!",
        "trap": "Rearrangement occurs in Markovnikov addition via carbocation, but NO rearrangement occurs in free radical anti-Markovnikov addition!"
      }
    ],
    "keyPoints": [
      "Saytzeff's Rule: Dehydrohalogenation of alkyl halides produces the more substituted, more stable alkene as major product.",
      "Bromine water test (decolorization of reddish-brown Br₂ in CCl₄) and Baeyer's reagent (cold dilute alkaline KMnO₄ decolorization) test for unsaturation."
    ]
  },
  {
    "id": "chem-11-hyd-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrocarbons",
    "topic": "Ozonolysis of Alkenes & Identification of Products",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Ozonolysis cleaves C=C double bonds completely, converting each unsaturated carbon into a carbonyl group (C=O). Locates double bond position.",
    "shortNotes": [
      "Reductive ozonolysis (O₃ followed by Zn / H₂O or (CH₃)₂S):",
      "=CH₂ terminates as Formaldehyde (HCHO).",
      "=CH-R terminates as Aldehyde (R-CHO).",
      "=CR₂ terminates as Ketone (R-CO-R).",
      "Zn dust prevents nascent hydrogen peroxide (H₂O₂) from oxidizing aldehydes to carboxylic acids.",
      "Oxidative ozonolysis (O₃ followed by H₂O₂): Aldehydes are further oxidized to carboxylic acids (R-COOH); Ketones remain ketones."
    ],
    "formulas": [
      {
        "name": "Ozonolysis Cleavage Rule",
        "formula": "\\text{R}_1\\text{R}_2\\text{C}=\\text{CHR}_3 \\xrightarrow{1.\\; \\text{O}_3, \\; 2.\\; \\text{Zn/H}_2\\text{O}} \\text{R}_1\\text{R}_2\\text{C}=\\text{O} + \\text{R}_3\\text{CH}=\\text{O}",
        "variables": "Cleaves π-bond and σ-bond, capped by Oxygen on both sides",
        "examTip": "To deduce starting alkene from products, remove oxygen atoms from both carbonyls and join remaining fragments with a C=C double bond!",
        "trap": "Ozonolysis of Benzene gives 3 moles of Glyoxal (CHO-CHO). Ozonolysis of o-Xylene gives 3 products (Glyoxal, Methylglyoxal, Dimethylglyoxal) in 3:2:1 ratio, proving resonance."
      }
    ],
    "keyPoints": [
      "One of the top 5 organic identification reaction types in both NEET and JEE papers.",
      "Hydroboration-Oxidation of alkenes (B₂H₆ / THF followed by H₂O₂ / OH⁻) gives anti-Markovnikov hydration alcohol with syn-stereochemistry and NO rearrangement."
    ]
  },
  {
    "id": "chem-11-hyd-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrocarbons",
    "topic": "Alkynes: Acidity & Electrophilic Additions",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Alkynes (C_n H_2n-2) have a C≡C triple bond. Terminal alkynes (R-C≡C-H) exhibit weak acidic character due to high s-character (50%) of sp-hybridized carbon.",
    "shortNotes": [
      "Acidity order: HC≡CH (sp, 50% s) > CH₂=CH₂ (sp², 33% s) > CH₃-CH₃ (sp³, 25% s).",
      "Terminal alkynes react with active metals (Na, NaNH₂) liberating H₂ gas: HC≡CH + 2 Na → Na⁺⁻C≡C⁻Na⁺ + H₂.",
      "Test for terminal alkynes: Forms red precipitate with Ammoniacal Cu₂Cl₂ (Copper acetylide Cu₂C₂) and white precipitate with Tollen's reagent [Ag(NH₃)₂]⁺ (Silver acetylide Ag₂C₂).",
      "Reduction to cis-alkene: H₂ / Lindlar's catalyst (Pd/CaCO₃ poisoned with quinoline or lead acetate).",
      "Reduction to trans-alkene: Birch reduction (Na in liquid NH₃).",
      "Kucherov Reaction (Hydration): HC≡CH + H₂O (20% H₂SO₄, 1% HgSO₄, 60°C) → CH₃CHO (Acetaldehyde); Other alkynes give ketones."
    ],
    "formulas": [
      {
        "name": "Lindlar vs Birch Stereoselective Hydrogenation",
        "formula": "\\text{R-C}\\equiv\\text{C-R} \\xrightarrow{\\text{H}_2/\\text{Pd-CaCO}_3} \\text{cis-Alkene}, \\quad \\text{R-C}\\equiv\\text{C-R} \\xrightarrow{\\text{Na/liq. NH}_3} \\text{trans-Alkene}",
        "variables": "Lindlar catalyst gives Syn-addition (cis); Birch reduction gives Anti-addition (trans via radical anion)",
        "examTip": "Cyclic polymerization of ethyne: 3 HC≡CH (Red hot iron tube, 873 K) → Benzene (C₆H₆).",
        "trap": "Non-terminal alkynes (like But-2-yne, CH₃-C≡C-CH₃) do NOT react with NaNH₂ or Tollen's reagent because they have no acidic terminal hydrogen!"
      }
    ],
    "keyPoints": [
      "Acetylene has pKa ≈ 25, more acidic than ammonia (pKa ≈ 38) and alkanes (pKa ≈ 50).",
      "Oxidation with neutral KMnO₄ yields diketone; with alkaline/acidic KMnO₄ cleaves into carboxylic acids."
    ]
  },
  {
    "id": "chem-11-hyd-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrocarbons",
    "topic": "Aromatic Hydrocarbons & Electrophilic Substitution (EAS)",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Benzene undergoes Electrophilic Aromatic Substitution (EAS) retaining its aromatic stabilization energy rather than addition.",
    "shortNotes": [
      "EAS Mechanism: 1. Generation of electrophile E⁺; 2. Attack of E⁺ forming arenium ion (σ-complex / Wheland intermediate); 3. Loss of proton H⁺ restoring aromaticity.",
      "1. Nitration: conc. HNO₃ + conc. H₂SO₄ (Electrophile: Nitronium ion NO₂⁺).",
      "2. Halogenation: Cl₂ + anhydrous AlCl₃ (Electrophile: Chloronium ion Cl⁺).",
      "3. Sulphonation: Fuming H₂SO₄ / Oleum (Electrophile: Neutral SO₃).",
      "4. Friedel-Crafts Alkylation: R-Cl + anhy. AlCl₃ (Electrophile: R⁺ carbocation, susceptible to rearrangement!).",
      "5. Friedel-Crafts Acylation: R-COCl + anhy. AlCl₃ (Electrophile: Acylium ion R-C≡O⁺, resonance stabilized, NO rearrangement!)."
    ],
    "formulas": [
      {
        "name": "Directing Influence of Functional Groups in Benzene",
        "formula": "\\text{Activating / o,p-directing: } -\\text{O}^-, -\\text{OH}, -\\text{NH}_2, -\\text{OR}, -\\text{R}; \\quad \\text{Deactivating / m-directing: } -\\text{NO}_2, -\\text{CN}, -\\text{CHO}, -\\text{COOH}",
        "variables": "Activating groups increase electron density at ortho and para positions via +M / +I; Deactivating withdraw via -M / -I",
        "examTip": "Halogens (-F, -Cl, -Br, -I) are DEACTIVATING due to -I, but ORTHO/PARA directing due to +M!",
        "trap": "Aniline does NOT undergo Friedel-Crafts reactions because basic -NH₂ group forms a salt complex with Lewis acid AlCl₃ catalyst (C₆H₅NH₂·AlCl₃), which strongly deactivates the ring!"
      }
    ],
    "keyPoints": [
      "Benzene resists oxidation by KMnO₄; Alkylbenzenes with at least one benzylic hydrogen (Toluene, Ethylbenzene, Isopropylbenzene) are oxidized cleanly to Benzoic acid (C₆H₅COOH).",
      "tert-Butylbenzene cannot be oxidized to benzoic acid because it lacks benzylic hydrogens!"
    ]
  },
  {
    "id": "chem-11-som-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "States of Matter: Gases and Liquids",
    "topic": "Gas Laws & Ideal Gas Equation",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "State of an ideal gas is defined by four variables: P, V, n, and T. PV = nRT.",
    "shortNotes": [
      "Boyle's Law (T = const): P₁V₁ = P₂V₂ (P ∝ 1/V). Isotherms are rectangular hyperbolas.",
      "Charles's Law (P = const): V₁/T₁ = V₂/T₂ (V ∝ T). Isobars.",
      "Gay-Lussac's Law (V = const): P₁/T₁ = P₂/T₂ (P ∝ T). Isochores.",
      "Avogadro's Law (P, T = const): V ∝ n.",
      "Combined Gas Law: (P₁V₁) / T₁ = (P₂V₂) / T₂.",
      "Universal Gas Constant R = 8.314 J/mol·K = 0.0821 L·atm/mol·K = 0.0831 bar·L/mol·K = 2 cal/mol·K."
    ],
    "formulas": [
      {
        "name": "Ideal Gas & Density Equations",
        "formula": "P V = n R T = \\frac{w}{M} R T, \\quad P M = d R T \\implies d = \\frac{P M}{R T}",
        "variables": "P = pressure, V = volume, n = moles, R = gas constant, T = absolute temp (K), d = density, M = molar mass",
        "examTip": "At same T and P, density of gas is directly proportional to its molar mass (d ∝ M).",
        "trap": "Always ensure T is in Kelvin! In PV = nRT, using °C produces complete calculation failure."
      },
      {
        "name": "Dalton's Law of Partial Pressures",
        "formula": "P_{\\text{total}} = \\sum P_i, \\quad P_i = X_i \\times P_{\\text{total}}, \\quad P_{\\text{dry gas}} = P_{\\text{moist gas}} - \\text{Aqueous Tension}",
        "variables": "P_i = partial pressure of gas i, X_i = mole fraction of gas i, Aqueous tension = vapour pressure of water at temperature T",
        "examTip": "Gases that react chemically with each other (e.g. NH₃ + HCl → NH₄Cl(s)) do NOT obey Dalton's Law!",
        "trap": "When a gas is collected over water, subtract aqueous tension to obtain true dry gas pressure."
      }
    ],
    "keyPoints": [
      "Tested regularly in both Physics (Kinetic Theory) and Chemistry entrance papers.",
      "Boyle's temperature T_B = a / (Rb), where real gas obeys ideal gas equation over wide pressure range."
    ]
  },
  {
    "id": "chem-11-som-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "States of Matter: Gases and Liquids",
    "topic": "Graham's Law of Diffusion & Effusion",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Rate of diffusion or effusion of a gas is inversely proportional to the square root of its density or molar mass at constant temperature and pressure.",
    "shortNotes": [
      "Rate of effusion r = Volume effused / time = Moles effused / time = Distance travelled / time = Drop in pressure / time.",
      "Under identical conditions of P and T: r₁ / r₂ = √(d₂ / d₁) = √(M₂ / M₁).",
      "If pressures are different: r ∝ P / √M ⇒ r₁ / r₂ = (P₁ / P₂) × √(M₂ / M₁).",
      "Lighter gases diffuse faster than heavier gases: H₂ (M=2) diffuses 4 times faster than O₂ (M=32)."
    ],
    "formulas": [
      {
        "name": "Graham's Law Master Equation",
        "formula": "\\frac{r_1}{r_2} = \\frac{V_1 / t_1}{V_2 / t_2} = \\frac{n_1 / t_1}{n_2 / t_2} = \\frac{P_1}{P_2} \\sqrt{\\frac{M_2}{M_1}}",
        "variables": "r = rate of diffusion, V = volume effused in time t, n = moles effused, P = pressure, M = molar mass",
        "examTip": "In U-tube with NH₃ (M=17) and HCl (M=36.5) at opposite ends, white dense fumes of NH₄Cl form CLOSER to the HCl end because NH₃ diffuses faster!",
        "trap": "If time taken for equal volume is compared: t₂ / t₁ = r₁ / r₂ = √(M₂ / M₁) (time is inversely proportional to rate!)."
      }
    ],
    "keyPoints": [
      "Used historically to separate isotopes of Uranium (²³⁵UF₆ vs ²³⁸UF₆) in nuclear enrichment.",
      "Direct question type in NEET and JEE Main physical chemistry."
    ]
  },
  {
    "id": "chem-11-som-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "States of Matter: Gases and Liquids",
    "topic": "Kinetic Molecular Theory & Molecular Speeds",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Gases consist of large numbers of identical particles in continuous random motion, with elastic collisions and kinetic energy proportional to absolute temperature.",
    "shortNotes": [
      "Kinetic Gas Equation: PV = (1/3) m N u_rms².",
      "Average Translational Kinetic Energy per mole = (3/2) RT; Per molecule = (3/2) kT (where k = R/NA = 1.38 × 10⁻²³ J/K is Boltzmann constant).",
      "Root Mean Square Speed: u_rms = √(3RT / M).",
      "Average Speed: u_avg = √(8RT / πM) ≈ √(2.55 RT / M).",
      "Most Probable Speed: u_mp = √(2RT / M).",
      "Ratio of speeds: u_mp : u_avg : u_rms = √2 : √(8/π) : √3 = 1 : 1.128 : 1.224."
    ],
    "formulas": [
      {
        "name": "Molecular Speed Triad Equations",
        "formula": "u_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3PV}{w}} = \\sqrt{\\frac{3P}{d}}, \\quad u_{\\text{avg}} = \\sqrt{\\frac{8RT}{\\pi M}}, \\quad u_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}",
        "variables": "R = 8.314 J/mol·K, T = temperature in Kelvin, M = molar mass in kg/mol (e.g. O₂ = 0.032 kg/mol!), d = density (kg/m³)",
        "examTip": "Order of speeds: Most Probable < Average < Root Mean Square (RAM: u_rms > u_avg > u_mp).",
        "trap": "In calculating numerical speed in m/s, M MUST BE IN kg/mol, NOT g/mol! M_H2 = 2 × 10⁻³ kg/mol."
      }
    ],
    "keyPoints": [
      "Kinetic energy of ideal gas depends ONLY on temperature; independent of pressure, volume, or nature of gas.",
      "Maxwell-Boltzmann speed distribution curve broadens and shifts to the right as temperature increases."
    ]
  },
  {
    "id": "chem-11-som-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "States of Matter: Gases and Liquids",
    "topic": "Real Gases: Van der Waals Equation & Compressibility Factor",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Real gases deviate from ideal behavior because real gas molecules possess finite volume and exert intermolecular attractive forces.",
    "shortNotes": [
      "Compressibility factor: Z = PV / nRT = V_real / V_ideal.",
      "For ideal gas: Z = 1 at all T and P.",
      "If Z < 1 (Negative deviation): Attractive forces dominate; Gas is MORE compressible than ideal gas. Occurs at low/moderate pressures.",
      "If Z > 1 (Positive deviation): Repulsive forces dominate; Gas is LESS compressible than ideal gas. Occurs at very high pressures. For H₂ and He, Z > 1 at all temperatures due to extremely small mass/polarizability.",
      "Van der Waals constants: 'a' measures magnitude of intermolecular attractive forces (Units: atm·L²/mol² or bar·L²/mol²); 'b' represents effective molecular volume (co-volume, b = 4 × N_A × Volume of 1 molecule; Units: L/mol)."
    ],
    "formulas": [
      {
        "name": "Van der Waals Equation of State",
        "formula": "\\left( P + \\frac{a n^2}{V^2} \\right) (V - n b) = n R T",
        "variables": "P = pressure, V = volume, n = moles, a = attraction constant, b = excluded volume constant, R = 0.0821, T = Kelvin",
        "examTip": "Higher value of 'a' indicates stronger intermolecular attraction and EASIER liquefaction (NH₃ > SO₂ > CO₂ > O₂ > N₂ > H₂ > He).",
        "trap": "At low pressure, volume correction 'b' is neglected: (P + a/V_m²) V_m = RT ⇒ Z = 1 - a / (V_m RT) < 1."
      },
      {
        "name": "High Pressure & Hydrogen Exceptions",
        "formula": "\\text{High Pressure: } Z = 1 + \\frac{P b}{R T} > 1, \\quad \\text{For H}_2 \\text{ and He at 298 K: } Z = 1 + \\frac{P b}{R T} > 1",
        "variables": "At very high pressure, attraction term a/V² is negligible compared to huge P",
        "examTip": "Boyle Temperature where real gas behaves ideally: T_B = a / (Rb).",
        "trap": "Do not forget b = 4 × V_actual! The excluded volume is FOUR TIMES the actual molecular volume."
      }
    ],
    "keyPoints": [
      "Critical constants: Critical Temperature T_c = 8a / (27Rb); Critical Pressure P_c = a / (27b²); Critical Volume V_c = 3b.",
      "At critical point: Compressibility factor Z_c = P_c V_c / (RT_c) = 3/8 = 0.375 for all van der Waals gases!"
    ]
  }
,
{
    "id": "chem-11-sbl-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "s-Block Elements (Alkali & Alkaline Earth Metals)",
    "topic": "Alkali Metals (Group 1): Properties & Reactivity",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Group 1 metals have [Noble Gas] ns¹ valence configuration, extremely low ionization energies, and high electropositive character.",
    "shortNotes": [
      "Atomic and ionic radii increase down the group: Li < Na < K < Rb < Cs.",
      "Density: General increase down group, EXCEPT Potassium is LIGHTER than Sodium (K < Na due to unusual volume expansion of K from 3d orbitals!).",
      "Hydration enthalpy: Li⁺ > Na⁺ > K⁺ > Rb⁺ > Cs⁺. Highly hydrated Li⁺ has smallest crystal radius but LARGEST hydrated radius, hence lowest ionic mobility in water!",
      "Flame coloration: Li (Crimson red), Na (Golden yellow), K (Violet/Lilac), Rb (Red violet), Cs (Blue).",
      "Reaction with oxygen: Li forms normal Oxide (Li₂O); Na forms Peroxide (Na₂O₂); K, Rb, Cs form Superoxides (KO₂, RbO₂, CsO₂ containing O₂⁻ paramagnetism).",
      "Solutions in liquid ammonia: Dilute solution is DEEP BLUE and conducting due to ammoniated electrons [e(NH₃)_y]⁻; Concentrated (> 3 M) turns BRONZE and diamagnetic."
    ],
    "formulas": [
      {
        "name": "Liquid Ammonia Dissolution Reaction",
        "formula": "\\text{M} + (x + y)\\text{NH}_3 \\to [\\text{M}(\\text{NH}_3)_x]^+ + [e(\\text{NH}_3)_y]^-, \\quad \\text{Blue color due to ammoniated electrons}",
        "variables": "M = alkali metal, ammoniated electron absorbs light in red region, imparting deep blue color",
        "examTip": "Upon standing, the blue solution slowly decomposes liberating H₂ gas and forming sodamide: 2 Na + 2 NH₃ → 2 NaNH₂ + H₂.",
        "trap": "In water, ionic mobility order is REVERSED: Cs⁺(aq) > Rb⁺(aq) > K⁺(aq) > Na⁺(aq) > Li⁺(aq) because Li⁺ has the largest hydration shell!"
      }
    ],
    "keyPoints": [
      "Lithium shows anomalous behavior and diagonal relationship with Magnesium (LiCl and MgCl₂ are deliquescent, Li₂CO₃ decomposes on heating to Li₂O + CO₂).",
      "Potassium superoxide (KO₂) is used in submarines and space oxygen masks to absorb CO₂ and release O₂: 4 KO₂ + 2 CO₂ → 2 K₂CO₃ + 3 O₂."
    ]
  },
  {
    "id": "chem-11-sbl-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "s-Block Elements (Alkali & Alkaline Earth Metals)",
    "topic": "Alkaline Earth Metals (Group 2): Compounds & Plaster of Paris",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Group 2 elements have [Noble Gas] ns² configuration, smaller radii and higher charge densities than Group 1, forming divalent M²⁺ ions.",
    "shortNotes": [
      "Flame coloration: Ca (Brick red), Sr (Crimson red), Ba (Apple green). Be and Mg do NOT impart color to flame due to high ionization energy (electrons not excited by Bunsen burner).",
      "Basic nature of hydroxides increases down group: Be(OH)₂ (Amphoteric) < Mg(OH)₂ < Ca(OH)₂ < Sr(OH)₂ < Ba(OH)₂ (Strong base).",
      "Solubility of sulfates DECREASES down group: BeSO₄ > MgSO₄ > CaSO₄ > SrSO₄ > BaSO₄ (Lattice energy remains high while hydration energy drops rapidly).",
      "Quicklime: CaO; Slaked lime: Ca(OH)₂; Milk of lime / Lime water: Ca(OH)₂ suspension/solution.",
      "Plaster of Paris: CaSO₄ · 1/2 H₂O (Calcium sulfate hemihydrate); Gypsum: CaSO₄ · 2 H₂O."
    ],
    "formulas": [
      {
        "name": "Plaster of Paris & Gypsum Interconversion",
        "formula": "\\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O} (\\text{Gypsum}) \\xrightarrow{393 \\text{ K} (120^\\circ\\text{C})} \\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O} (\\text{POP}) + 1.5\\text{H}_2\\text{O}",
        "variables": "Heating beyond 393 K (> 200°C) forms anhydrous CaSO₄, known as 'Dead Burnt Plaster' which loses setting properties",
        "examTip": "Setting of Plaster of Paris is an EXOTHERMIC process accompanied by a slight volume expansion (~1%), making it ideal for casts and statues.",
        "trap": "Do not heat gypsum above 393 K during POP preparation, or it loses all water of crystallization to become dead burnt plaster!"
      }
    ],
    "keyPoints": [
      "Biological role: Ca²⁺ is essential for blood clotting and muscle contraction; Mg²⁺ is cofactor in ATP enzymes and central atom in chlorophyll.",
      "Beryllium shows diagonal relationship with Aluminum: both Be(OH)₂ and Al(OH)₃ are amphoteric; Be₂C and Al₄C₃ both yield methane (CH₄) on hydrolysis."
    ]
  },
  {
    "id": "chem-11-pbl-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "p-Block Elements (Group 13 & 14)",
    "topic": "Group 13 (Boron Family): Inert Pair Effect & Diborane",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Group 13 elements have ns² np¹ configuration. Reluctance of valence s-electrons to participate in bonding down the group is the Inert Pair Effect.",
    "shortNotes": [
      "Stability of +1 oxidation state increases down the group, while +3 decreases: Tl⁺ > Tl³⁺ (Tl⁺ is stable, Tl³⁺ is a strong oxidizing agent).",
      "Atomic radius anomaly: Gallium is slightly SMALLER than Aluminum (Ga: 135 pm < Al: 143 pm) due to poor shielding by intervening 3d¹⁰ electrons (d-block contraction).",
      "Boron trihalides (BX₃) act as Lewis acids due to incomplete octet (6 electrons). Lewis acid strength order: BI₃ > BBr₃ > BCl₃ > BF₃ (reversed due to back-bonding in BF₃: 2pπ-2pπ overlap diminishes electron deficiency).",
      "Diborane (B₂H₆): Contains four terminal 2-center-2-electron (2c-2e) B-H bonds in a plane, and two bridging 3-center-2-electron (3c-2e) 'banana bonds' above and below the plane.",
      "Borax Bead Test: Heated borax forms transparent vitreous glassy bead of NaBO₂ + B₂O₃, which forms characteristic colored metaborates with transition metal salts (Cu: blue, Co: deep blue, Cr: green, Ni: brown)."
    ],
    "formulas": [
      {
        "name": "Diborane Banana Bond Structure & Cleavage",
        "formula": "\\text{B}_2\\text{H}_6: 4 \\text{ Terminal } (2c-2e) \\text{ bonds} + 2 \\text{ Bridging } (3c-2e) \\text{ B-H-B bonds}, \\quad \\text{B is } sp^3 \\text{ hybridized}",
        "variables": "Inorganic benzene: B₂H₆ + 2 NH₃ → B₃N₃H₆ (Borazine / Borazole, isoelectronic with benzene)",
        "examTip": "Reaction with Lewis bases: Symmetrical cleavage with large bases like (CH₃)₃N, CO, THF gives 2 BH₃·L; Unsymmetrical cleavage with small bases like NH₃ gives [BH₂(NH₃)₂]⁺ [BH₄]⁻.",
        "trap": "In diborane, terminal B-H bonds are normal covalent and short (1.19 Å); bridge B-H bonds are long (1.33 Å) and electron-deficient!"
      }
    ],
    "keyPoints": [
      "Boric acid B(OH)₃ / H₃BO₃ is NOT a protonic acid, but a monobasic Lewis acid that accepts OH⁻ from water: B(OH)₃ + 2 H₂O ⇌ [B(OH)₄]⁻ + H₃O⁺ (pKa = 9.25).",
      "Adding cis-diols (glycerol, mannitol) enhances acidity of boric acid, making it titratable against NaOH with phenolphthalein."
    ]
  },
  {
    "id": "chem-11-pbl-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "p-Block Elements (Group 13 & 14)",
    "topic": "Group 14 (Carbon Family): Allotropes & Silicates",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Group 14 elements (C, Si, Ge, Sn, Pb) have ns² np² configuration. Inert pair effect stabilizes +2 state over +4 down the group: Pb²⁺ > Pb⁴⁺ (PbO₂ is strong oxidizing agent; Sn²⁺ is reducing agent).",
    "shortNotes": [
      "Catenation tendency order: C >> Si > Ge ≈ Sn >> Pb (decreases as bond dissociation energy C-C 348 kJ/mol > Si-Si 297 decreases).",
      "Carbon allotropes: Diamond (sp³, 3D tetrahedral network, hardest, insulator), Graphite (sp², hexagonal planar layers with van der Waals gap 3.4 Å, electrical conductor due to free π-electrons, lubricant), Fullerenes (Buckminsterfullerene C₆₀, 20 six-membered and 12 five-membered rings, soccer ball shape).",
      "Silicones: Organosilicon polymers with repeating -[R₂Si-O]ₙ- units. Hydrophobic, thermally stable, chemically inert.",
      "Silicates: Basic fundamental structural unit is tetrahedral [SiO₄]⁴⁻ (orthosilicates). Pyrosilicates [Si₂O₇]⁶⁻ share 1 oxygen; Cyclic/Chain share 2; Sheet silicates share 3; 3D network share all 4 oxygens.",
      "Zeolites: Aluminosilicates with open microporous structure, used as molecular sieves and water softeners (e.g. ZSM-5 converts alcohols directly into gasoline)."
    ],
    "formulas": [
      {
        "name": "Silicate Classification by Bridging Oxygens",
        "formula": "\\text{Orthosilicate: } [\\text{SiO}_4]^{4-} (0 \\text{ shared}), \\quad \\text{Pyrosilicate: } [\\text{Si}_2\\text{O}_7]^{6-} (1), \\quad \\text{Chain/Cyclic: } [\\text{SiO}_3]_n^{2n-} (2), \\quad \\text{Sheet: } [\\text{Si}_2\\text{O}_5]_n^{2n-} (3)",
        "variables": "Each shared oxygen atom reduces formal negative charge by 1",
        "examTip": "Preparation of silicones: Hydrolysis of R₂SiCl₂ followed by condensation polymerization gives linear silicones; RSiCl₃ gives cross-linked 3D silicones; R₃SiCl acts as chain terminator.",
        "trap": "CO is a toxic neutral gas that binds to hemoglobin 300× more strongly than O₂ forming carboxyhemoglobin, whereas CO₂ is acidic."
      }
    ],
    "keyPoints": [
      "CCl₄ cannot be hydrolyzed by water because carbon has no vacant d-orbitals to accept water lone pair, while SiCl₄ hydrolyzes violently into silicic acid Si(OH)₄.",
      "Silica (SiO₂) dissolves in HF forming silicon tetrafluoride and hydrofluorosilicic acid: SiO₂ + 4 HF → SiF₄ + 2 H₂O; SiF₄ + 2 HF → H₂SiF₆ (Etching of glass)."
    ]
  },
  {
    "id": "chem-11-hydr-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrogen & Its Compounds",
    "topic": "Hydrides, Water Hardness & Hydrogen Peroxide",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Hydrogen has 3 isotopes: Protium (¹H, 99.98%), Deuterium (²H / D, 0.015%), Tritium (³H / T, radioactive β⁻ emitter, t₁/₂ = 12.33 years, n/p = 2).",
    "shortNotes": [
      "Hydrides classification: Ionic / Saline (s-block, e.g. NaH, CaH₂ 'Hydrolith', basic, conducts in molten state releasing H₂ at anode); Covalent / Molecular (p-block: Electron-deficient B₂H₆, Electron-precise CH₄, Electron-rich NH₃, H₂O); Metallic / Interstitial (d and f block, non-stoichiometric like TiH₁.₇, conduct electricity, hydride gap in groups 7, 8, 9).",
      "Water Hardness: Temporary (due to soluble bicarbonates of Ca and Mg: Ca(HCO₃)₂, Mg(HCO₃)₂; removed by boiling or Clark's method using slaked lime Ca(OH)₂); Permanent (due to chlorides and sulfates of Ca and Mg: CaCl₂, MgCl₂, CaSO₄, MgSO₄; removed by washing soda Na₂CO₃, Calgon process (Sodium hexametaphosphate Na₆P₆O₁₈), or Permutit / Ion-exchange resins).",
      "Calgon method: Complex anion [Na₄P₆O₁₈]²⁻ binds Ca²⁺ and Mg²⁺ as soluble complex [Na₂CaP₆O₁₈]²⁻.",
      "Hydrogen Peroxide (H₂O₂): Non-planar 'open book' structure with dihedral angle 111.5° (gas) and 90.2° (crystal). Acts as both oxidizing and reducing agent in both acidic and basic mediums."
    ],
    "formulas": [
      {
        "name": "Temporary Hardness Clark's Equation",
        "formula": "\\text{Ca}(\\text{HCO}_3)_2 + \\text{Ca}(\\text{OH})_2 \\to 2 \\text{CaCO}_3 \\downarrow + 2 \\text{H}_2\\text{O}, \\quad \\text{Mg}(\\text{HCO}_3)_2 + 2 \\text{Ca}(\\text{OH})_2 \\to 2 \\text{CaCO}_3 \\downarrow + \\text{Mg}(\\text{OH})_2 \\downarrow + 2 \\text{H}_2\\text{O}",
        "variables": "Mg requires TWO equivalents of Ca(OH)₂ because Mg(OH)₂ is precipitated instead of MgCO₃",
        "examTip": "1 degree of hardness (Clark) = 1 part of CaCO₃ in 70,000 parts of water. In ppm: 1 ppm = 1 part CaCO₃ per 10⁶ parts water.",
        "trap": "In reducing action of H₂O₂, OXYGEN IS ALWAYS LIBERATED: H₂O₂ + 2 KMnO₄ + 3 H₂SO₄ → K₂SO₄ + 2 MnSO₄ + 8 H₂O + 5 O₂↑."
      }
    ],
    "keyPoints": [
      "Heavy water (D₂O) has higher boiling point (101.4°C), melting point (3.8°C), and density (1.11 g/mL) than H₂O, but lower dielectric constant. Used as moderator in nuclear reactors.",
      "Water gas (CO + H₂, also called Syngas / Synthesis gas) is produced by coal gasification: C + H₂O (1270 K) → CO + H₂."
    ]
  },
  {
    "id": "chem-11-env-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Environmental Chemistry",
    "topic": "Atmospheric Pollution, Smog & Ozone Depletion",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Atmospheric chemistry encompasses pollutant mechanisms in troposphere (0-10 km) and stratosphere (10-50 km, protective ozone shield).",
    "shortNotes": [
      "Classical Smog (London smog): Occurs in cool humid climate; reducing nature; contains smoke, fog, and SO₂; forms acidic droplets.",
      "Photochemical Smog (Los Angeles smog): Occurs in warm, dry, sunny climate; oxidizing nature; initiated by sunlight on vehicle exhausts (NOx and unsaturated hydrocarbons); contains Ozone (O₃), PAN (Peroxyacetyl nitrate, CH₃COOONO₂), Formaldehyde, and Acrolein.",
      "Acid Rain: Rainwater with pH < 5.6. Caused by atmospheric oxidation of SO₂ and NO₂ forming H₂SO₄ and HNO₃: 2 SO₂ + O₂ + 2 H₂O → 2 H₂SO₄; 4 NO₂ + O₂ + 2 H₂O → 4 HNO₃. Corrodes marble statues (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂: 'Stone leprosy').",
      "Ozone Layer Depletion: In stratosphere, chlorofluorocarbons (CFCs / Freons like CF₂Cl₂) photodissociate by UV light releasing reactive Chlorine free radicals (·Cl). One ·Cl radical catalytically destroys over 100,000 ozone molecules: ·Cl + O₃ → ·ClO + O₂; ·ClO + ·O → ·Cl + O₂.",
      "Water Pollution standards: Biochemical Oxygen Demand (BOD) measures organic matter. Pure drinking water has BOD < 5 ppm; Highly polluted water has BOD > 17 ppm. Fluoride in drinking water: Up to 1 ppm hardens enamel (fluoroapatite [3Ca₃(PO₄)₂·CaF₂]); > 2 ppm causes brown mottling of teeth; > 10 ppm causes bone and skeletal fluorosis."
    ],
    "formulas": [
      {
        "name": "Photochemical Smog Free Radical Cascade",
        "formula": "\\text{NO}_2 \\xrightarrow{h\\nu} \\text{NO} + \\text{O}, \\quad \\text{O} + \\text{O}_2 \\to \\text{O}_3, \\quad \\text{O}_3 + \\text{NO} \\to \\text{NO}_2 + \\text{O}_2, \\quad \\text{Hydrocarbon} + \\text{NO}_2 + \\text{O}_2 \\to \\text{PAN}",
        "variables": "PAN = Peroxyacetyl nitrate (powerful eye irritant and plant toxin)",
        "examTip": "Maximum permissible concentration in drinking water: Lead = 50 ppb (0.05 ppm), Nitrate = 50 ppm (excess causes 'Blue Baby Syndrome' / Methemoglobinemia), Sulfate = 500 ppm.",
        "trap": "Normal clean rainwater has pH ≈ 5.6 (slightly acidic due to dissolved atmospheric CO₂ forming weak carbonic acid H₂CO₃). Only rain with pH < 5.6 is classified as Acid Rain!"
      }
    ],
    "keyPoints": [
      "Green Chemistry principles focus on minimizing waste generation, high atom economy, and using benign solvents like supercritical CO₂.",
      "Pesticide bioaccumulation: Non-biodegradable organochlorines like DDT concentrate up food chains, thinning bird eggshells."
    ]
  },
  {
    "id": "chem-11-prc-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Principles Related to Practical Chemistry",
    "topic": "Systematic Qualitative Salt Analysis (Cations & Anions)",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Qualitative analysis systematically separates and confirms basic radicals (cations) and acidic radicals (anions) using selective precipitation reagents.",
    "shortNotes": [
      "Group 0: NH₄⁺ (Reagent: NaOH, warms releasing NH₃ gas with pungent odor, turns Nessler's reagent K₂[HgI₄] brown precipitate 'Iodide of Millon's base').",
      "Group I: Pb²⁺, Ag⁺, Hg₂²⁺ (Group reagent: dilute HCl; Precipitates as insoluble chlorides PbCl₂, AgCl, Hg₂Cl₂).",
      "Group II: Cu²⁺, Pb²⁺, Bi³⁺, Cd²⁺, As³⁺, Sb³⁺ (Group reagent: H₂S gas in presence of dilute HCl; Precipitates as sulphides: CuS black, CdS bright yellow, As₂S₃ yellow).",
      "Group III: Fe³⁺, Al³⁺, Cr³⁺ (Group reagent: NH₄OH in presence of NH₄Cl; Precipitates as hydroxides: Fe(OH)₃ reddish brown, Al(OH)₃ gelatinous white, Cr(OH)₃ green).",
      "Group IV: Co²⁺, Ni²⁺, Mn²⁺, Zn²⁺ (Group reagent: H₂S gas in presence of NH₄OH; Precipitates as sulphides: CoS/NiS black, MnS buff/flesh colored, ZnS dirty white).",
      "Group V: Ba²⁺, Sr²⁺, Ca²⁺ (Group reagent: (NH₄)₂CO₃ in presence of NH₄OH and NH₄Cl; Precipitates as white carbonates: BaCO₃, SrCO₃, CaCO₃).",
      "Group VI: Mg²⁺ (Reagent: Disodium hydrogen phosphate Na₂HPO₄ in NH₄OH; Forms white crystalline precipitate of Magnesium ammonium phosphate Mg(NH₄)PO₄)."
    ],
    "formulas": [
      {
        "name": "Common Ion Control of Group Reagents",
        "formula": "\\text{Group II: Dilute HCl suppresses } \\text{H}_2\\text{S} \\rightleftharpoons 2\\text{H}^+ + \\text{S}^{2-} \\implies [\\text{S}^{2-}] \\text{ low} \\implies \\text{Only low } K_{sp} \\text{ ppt}; \\; \\text{Group III: } \\text{NH}_4\\text{Cl suppresses } \\text{NH}_4\\text{OH} \\implies [\\text{OH}^-] \\text{ low}",
        "variables": "In Group II, low [S²⁻] precipitates only Group II sulphides (very small K_sp), leaving Group IV in solution",
        "examTip": "Chromyl Chloride Test confirms Chloride: Salt + solid K₂Cr₂O₇ + conc. H₂SO₄ heat → Reddish brown vapors of CrO₂Cl₂ (Chromyl chloride). Passed into NaOH forms yellow Na₂CrO₄, which gives yellow ppt with lead acetate (PbCrO₄).",
        "trap": "Chromyl chloride test FAILS for covalent or sparingly soluble chlorides: Hg₂Cl₂, HgCl₂, AgCl, PbCl₂, SnCl₂!"
      },
      {
        "name": "Brown Ring Test for Nitrate (NO3-)",
        "formula": "\\text{NO}_3^- + 3 \\text{Fe}^{2+} + 4 \\text{H}^+ \\to \\text{NO} + 3 \\text{Fe}^{3+} + 2 \\text{H}_2\\text{O}, \\quad [\\text{Fe}(\\text{H}_2\\text{O})_6]^{2+} + \\text{NO} \\to [\\text{Fe}(\\text{H}_2\\text{O})_5(\\text{NO})]^{2+} (\\text{Brown ring}) + \\text{H}_2\\text{O}",
        "variables": "In the brown complex [Fe(H₂O)₅(NO)]²⁺, Iron is in +1 oxidation state and NO is nitrosonium ion (NO⁺) with 3 unpaired electrons (μ = 3.87 BM)!",
        "examTip": "Carefully pour concentrated H₂SO₄ down the side of test tube without shaking to form sharp brown ring at the interface.",
        "trap": "Nitrite (NO₂⁻) also gives brown ring test with dilute H₂SO₄; Bromide and iodide interfere by liberating colored halogens (Br₂, I₂)."
      }
    ],
    "keyPoints": [
      "Ni²⁺ is confirmed with Dimethylglyoxime (DMG) in ammoniacal medium, forming rosy red precipitate of bis(dimethylglyoximato)nickel(II) stabilized by intramolecular hydrogen bonds.",
      "Cu²⁺ solution turns deep blue with excess ammonia due to formation of tetraamminecopper(II) complex [Cu(NH₃)₄]²⁺."
    ]
  }
,
{
    "id": "chem-12-sol-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Solutions",
    "topic": "Henry's Law & Raoult's Law (Vapour Pressure)",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Henry's law governs gas solubility in liquids (p = K_H x). Raoult's law states partial vapour pressure of volatile component is proportional to its mole fraction: p_A = p°_A x_A.",
    "shortNotes": [
      "Henry's law: p = K_H · x. Higher K_H at same pressure indicates LOWER solubility. K_H increases with temperature, so gas solubility in liquid DECREASES with heating (aquatic life thrives in cold water).",
      "Raoult's law for binary volatile solution: P_total = p_A + p_B = p°_A x_A + p°_B x_B = p°_A + (p°_B - p°_A) x_B.",
      "Mole fraction in vapour phase (Dalton's law): y_A = p_A / P_total; y_B = p_B / P_total.",
      "Ideal solution: Δ_mix H = 0, Δ_mix V = 0, Δ_mix S > 0, obeys Raoult's law across entire composition (e.g. Benzene + Toluene, n-Hexane + n-Heptane, Bromoethane + Chloroethane).",
      "Positive deviation: A-B attraction < A-A and B-B; Vapour pressure higher than Raoult's; Δ_mix H > 0 (endothermic), Δ_mix V > 0; Forms minimum boiling azeotrope (e.g. Ethanol + Water 95.4%, Acetone + CS₂).",
      "Negative deviation: A-B attraction > A-A and B-B (new H-bonding or dipole interactions); Vapour pressure lower; Δ_mix H < 0, Δ_mix V < 0; Forms maximum boiling azeotrope (e.g. Acetone + Chloroform, HNO₃ 68% + Water 32%)."
    ],
    "formulas": [
      {
        "name": "Henry's Law & Raoult's Vapour Pressure",
        "formula": "p = K_H \\cdot x, \\quad P_{\\text{total}} = p_A^\\circ x_A + p_B^\\circ x_B, \\quad y_A = \\frac{p_A^\\circ x_A}{P_{\\text{total}}}",
        "variables": "p = partial pressure, K_H = Henry's law constant, x = liquid mole fraction, y = vapour phase mole fraction, p° = pure component vapour pressure",
        "examTip": "In liquid-vapour equilibrium, the vapour phase is ALWAYS richer in the more volatile component (component with higher pure vapour pressure p°): y_A / y_B = (p°_A / p°_B) × (x_A / x_B) (Konovalov's Rule).",
        "trap": "Do not confuse liquid phase mole fraction x with vapour phase mole fraction y! 1/P_total = y_A / p°_A + y_B / p°_B."
      }
    ],
    "keyPoints": [
      "Deep sea divers use helium-diluted oxygen cylinders (11.7% He, 56.2% N₂, 32.1% O₂) to avoid the painful condition known as 'the bends' (nitrogen gas bubbling out of blood).",
      "Azeotropes boil at constant temperature without change in composition and CANNOT be separated by fractional distillation."
    ]
  },
  {
    "id": "chem-12-sol-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Solutions",
    "topic": "Colligative Properties & Van 't Hoff Factor (i)",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Colligative properties depend strictly on the number of solute particles in solution, independent of their chemical identity.",
    "shortNotes": [
      "1. Relative Lowering of Vapour Pressure (RLVP): (p° - p) / p° = X_solute = n / (n + N) ≈ n / N (for dilute).",
      "2. Elevation of Boiling Point: ΔT_b = T_b - T_b° = i · K_b · m. (K_b = molal elevation / ebullioscopic constant; for water K_b = 0.52 K·kg/mol).",
      "3. Depression of Freezing Point: ΔT_f = T_f° - T_f = i · K_f · m. (K_f = molal depression / cryoscopic constant; for water K_f = 1.86 K·kg/mol).",
      "4. Osmotic Pressure: π = i · C · R · T = i · (n / V) · R · T.",
      "Van 't Hoff Factor (i) = Normal Molar Mass / Abnormal Observed Molar Mass = Total moles of particles after dissociation or association / Initial moles of solute.",
      "Degree of Dissociation (α): i = 1 + (n - 1)α ⇒ α = (i - 1) / (n - 1) (where n is number of ions produced per formula unit).",
      "Degree of Association (α): i = 1 + (1/n - 1)α ⇒ α = (1 - i) / (1 - 1/n) (where n is polymer degree, e.g. n=2 for dimerization of benzoic acid in benzene)."
    ],
    "formulas": [
      {
        "name": "Four Colligative Property Master Equations",
        "formula": "\\frac{p^\\circ - p}{p^\\circ} = i \\frac{n_{\\text{solute}}}{n_{\\text{solute}} + n_{\\text{solvent}}}, \\quad \\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\pi = i C R T",
        "variables": "p° = pure vapour pressure, m = molality (mol/kg solvent), C = molarity (mol/L), K_b = 0.52, K_f = 1.86, R = 0.0821 L·atm/mol·K, T = Kelvin",
        "examTip": "To compare boiling points or freezing points of different solutions, compare the product (i × m)! Higher (i × m) ⇒ Higher Boiling Point, but LOWER Freezing Point!",
        "trap": "ΔT_f = T_f(solvent) - T_f(solution)! For water, freezing point of solution is NEGATIVE in °C: T_f = -ΔT_f (e.g. if ΔT_f = 3.72, Freezing point = -3.72°C)."
      },
      {
        "name": "Van 't Hoff Factor Dissociation & Association",
        "formula": "\\text{Dissociation: } \\alpha = \\frac{i - 1}{n - 1}, \\quad \\text{Association: } \\alpha = \\frac{1 - i}{1 - 1/n}",
        "variables": "n = number of particles per formula unit (e.g. BaCl₂: n=3; K₄[Fe(CN)₆]: n=5; Acetic acid dimerization: n=2)",
        "examTip": "For complete 100% dissociation (α = 1): NaCl (i=2), CaCl₂ (i=3), Al₂(SO₄)₃ (i=5).",
        "trap": "In non-polar solvents like benzene, carboxylic acids dimerize completely via intermolecular hydrogen bonding: i = 1 - α/2 ≈ 0.5 (observed molecular weight is DOUBLE the true formula weight!)."
      }
    ],
    "keyPoints": [
      "Osmotic pressure is the most accurate colligative property for determining molecular weights of biomolecules, polymers, and proteins because measurements are carried out at room temperature with high sensitivity.",
      "Reverse Osmosis occurs when external pressure applied to solution side exceeds osmotic pressure (P > π): pure solvent flows from solution into solvent across semipermeable membrane (used in desalination of seawater using cellulose acetate membranes)."
    ]
  },
  {
    "id": "chem-12-ele-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Electrochemistry",
    "topic": "Galvanic Cells, Standard Potentials & Nernst Equation",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Galvanic cell converts spontaneous chemical redox energy into electrical energy. Nernst equation calculates cell potential under non-standard conditions.",
    "shortNotes": [
      "Standard Hydrogen Electrode (SHE): Standard reduction potential arbitrarily assigned as 0.00 V at 298 K, 1 bar H₂, 1 M H⁺.",
      "Cell representation: Anode (Oxidation) on LEFT, Cathode (Reduction) on RIGHT: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s). (LOAN mnemonic: Left, Oxidation, Anode, Negative).",
      "E°_cell = E°_cathode - E°_anode = E°_Right - E°_Left (both taken as Standard Reduction Potentials!).",
      "Gibbs energy change: ΔG = -n F E_cell; ΔG° = -n F E°_cell.",
      "Condition for spontaneous cell reaction: E_cell > 0 ⇒ ΔG < 0.",
      "Equilibrium constant: E°_cell = (0.0591 / n) log₁₀ K_c at 298 K.",
      "Nernst equation at 298 K: E_cell = E°_cell - (0.0591 / n) log₁₀ Q."
    ],
    "formulas": [
      {
        "name": "Nernst Equation at 298 K",
        "formula": "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{2.303 R T}{n F} \\log_{10} Q = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10} \\left( \\frac{[\\text{Products}]^p}{[\\text{Reactants}]^r} \\right)",
        "variables": "n = number of moles of electrons transferred in balanced cell reaction, F = 96485 C/mol (Faraday constant), Q = reaction quotient",
        "examTip": "For Daniell cell: Zn + Cu²⁺ ⇌ Zn²⁺ + Cu (n = 2): E_cell = 1.10 V - (0.0591 / 2) log₁₀ ([Zn²⁺] / [Cu²⁺]).",
        "trap": "Pure solids and pure liquids have unit activity ([Zn] = 1, [Cu] = 1) and are omitted from reaction quotient Q!"
      },
      {
        "name": "Free Energy & Equilibrium Constant Relations",
        "formula": "\\Delta G^\\circ = -n F E^\\circ_{\\text{cell}} = -2.303 R T \\log_{10} K_c, \\quad E^\\circ_{\\text{cell}} = \\frac{0.0591}{n} \\log_{10} K_c",
        "variables": "F = 96500 C/mol, n = electron transfer number, K_c = equilibrium constant",
        "examTip": "If E°_cell is POSITIVE, ΔG° is NEGATIVE, and K_c > 1 (reaction is spontaneous under standard state).",
        "trap": "E° is an INTENSIVE property and does NOT depend on stoichiometric coefficients (multiplying a half-reaction by 2 does NOT double E°!); but ΔG is an EXTENSIVE property and doubles!"
      }
    ],
    "keyPoints": [
      "Concentration Cell: Both electrodes are identical but immersed in different electrolyte concentrations: E°_cell = 0; E_cell = -(0.0591 / n) log(C₁ / C₂). Spontaneous when C₂ > C₁.",
      "Salt bridge contains agar-agar jelly with inert electrolyte (KCl, KNO₃, NH₄NO₃) where ionic mobilities of cation and anion are virtually equal. Maintains electrical neutrality and prevents liquid junction potential."
    ]
  },
  {
    "id": "chem-12-ele-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Electrochemistry",
    "topic": "Conductance, Kohlrausch's Law & Faraday's Laws",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Electrolytic conductance measures movement of ions in solution. Kohlrausch's law determines limiting molar conductivity of weak electrolytes.",
    "shortNotes": [
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
    "formulas": [
      {
        "name": "Conductance & Cell Constant Equations",
        "formula": "\\kappa = \\frac{1}{R} \\left( \\frac{l}{A} \\right) = G \\cdot G^*, \\quad \\Lambda_m = \\frac{\\kappa \\times 1000}{M} \\; (\\text{in S}\\cdot\\text{cm}^2/\\text{mol}) = \\frac{\\kappa}{1000 \\times M} \\; (\\text{in S}\\cdot\\text{m}^2/\\text{mol})",
        "variables": "R = resistance in ohms, G* = l/A = cell constant (cm⁻¹), M = molarity (mol/L), κ = conductivity",
        "examTip": "Kohlrausch example: Λ_m°(CH₃COOH) = Λ_m°(CH₃COONa) + Λ_m°(HCl) - Λ_m°(NaCl).",
        "trap": "In Λ_m = 1000 κ / M, κ must be in S·cm⁻¹! If κ is given in S·m⁻¹, convert to S·cm⁻¹ (1 S/m = 10⁻² S/cm) or use SI units."
      },
      {
        "name": "Faraday's Electrolysis Master Equation",
        "formula": "w = Z \\cdot I \\cdot t = \\frac{M}{n F} \\cdot I \\cdot t = \\frac{E}{96500} \\cdot Q",
        "variables": "w = mass deposited in grams, Z = electrochemical equivalent = E / 96500, I = current in Amperes, t = time in seconds, n = number of electrons involved in electrode half-reaction",
        "examTip": "1 Faraday (96500 C) deposits 1 gram equivalent of ANY substance (e.g. 108 g Ag⁺, 31.75 g Cu²⁺, 9 g Al³⁺).",
        "trap": "Always convert time t into SECONDS! If time is given as 1 hour, t = 3600 seconds."
      }
    ],
    "keyPoints": [
      "Commercial Batteries: Lead storage battery (Anode: Pb, Cathode: PbO₂, Electrolyte: 38% H₂SO₄; during discharge: PbSO₄ forms on both electrodes and density of H₂SO₄ drops below 1.20 g/mL).",
      "Hydrogen-Oxygen Fuel Cell: Anode: 2 H₂ + 4 OH⁻ → 4 H₂O + 4 e⁻; Cathode: O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻; Net: 2 H₂ + O₂ → 2 H₂O (Efficiency ~70%, pollution-free, water product used by Apollo astronauts)."
    ]
  },
  {
    "id": "chem-12-kin-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Chemical Kinetics",
    "topic": "Rate Law, Order of Reaction & Integrated Rate Equations",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Rate of reaction is change in concentration per unit time. Order is experimental sum of powers of concentrations in rate law: Rate = k [A]^x [B]^y.",
    "shortNotes": [
      "Rate of reaction for aA + bB → cC: r = -(1/a) d[A]/dt = -(1/b) d[B]/dt = +(1/c) d[C]/dt.",
      "Units of rate constant k: (mol/L)^(1-n) · time⁻¹ (where n is overall order).",
      "Zero Order (n=0): Rate = k. Units of k: mol·L⁻¹·s⁻¹. Integrated equation: [A]_t = [A]_0 - kt. Half-life: t₁/₂ = [A]_0 / (2k). t₁/₂ ∝ [A]_0.",
      "First Order (n=1): Rate = k[A]. Units of k: s⁻¹ (time⁻¹). Integrated equation: k = (2.303 / t) log₁₀ ([A]_0 / [A]_t). Half-life: t₁/₂ = 0.693 / k. t₁/₂ is INDEPENDENT of initial concentration!",
      "General nth order half-life relation: t₁/₂ ∝ 1 / [A]_0^(n-1).",
      "Pseudo First-Order Reaction: High order reaction behaving as first order when one reactant is present in large excess (e.g. Acid-catalyzed hydrolysis of ethyl acetate: CH₃COOC₂H₅ + H₂O(excess) → CH₃COOH + C₂H₅OH; Inversion of cane sugar)."
    ],
    "formulas": [
      {
        "name": "First Order Integrated Rate & Half-Life Equations",
        "formula": "k = \\frac{2.303}{t} \\log_{10} \\left( \\frac{[A]_0}{[A]_t} \\right) = \\frac{1}{t} \\ln \\left( \\frac{a}{a - x} \\right), \\quad t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{k}",
        "variables": "k = rate constant (s⁻¹ or min⁻¹), [A]₀ = initial concentration, [A]_t = concentration remaining at time t",
        "examTip": "For 1st order: t₉₉.₉% = 10 × t₁/₂; t₉₉% = 2 × t₉₀% = 6.64 × t₁/₂; t₇₅% = 2 × t₁/₂.",
        "trap": "In formula, [A]_t is the concentration of reactant REMAINING, NOT the amount reacted (x)! If 80% reacts, [A]_t = 20% of [A]₀."
      },
      {
        "name": "General nth Order Half-Life & Rate Constant Units",
        "formula": "t_{1/2} \\propto \\frac{1}{[A]_0^{n - 1}}, \\quad \\text{Units of } k = \\left( \\frac{\\text{mol}}{\\text{L}} \\right)^{1 - n} \\text{s}^{-1}",
        "variables": "n = order of reaction (0, 1, 2, 3... or fractional)",
        "examTip": "If doubling initial concentration doubles half-life: n = 0. If doubling [A]₀ has no effect on t₁/₂: n = 1. If doubling [A]₀ halves t₁/₂: n = 2.",
        "trap": "Molecularity can NEVER be zero, negative, or fractional; it must be a positive integer (1, 2, 3). Order CAN be zero, negative, or fractional!"
      }
    ],
    "keyPoints": [
      "All radioactive decay processes follow first-order kinetics strictly.",
      "For gaseous first-order reaction A(g) → B(g) + C(g): k = (2.303 / t) log₁₀ [P_i / (2P_i - P_t)], where P_i is initial pressure and P_t is total pressure at time t."
    ]
  },
  {
    "id": "chem-12-kin-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Chemical Kinetics",
    "topic": "Arrhenius Equation & Activation Energy",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Arrhenius equation quantifies the temperature dependence of reaction rates: k = A e^(-E_a / RT), based on the fraction of collisions having energy ≥ E_a.",
    "shortNotes": [
      "Temperature coefficient: Ratio of rate constants at two temperatures differing by 10°C: μ = k_(T+10) / k_T ≈ 2 to 3. Rate roughly doubles or triples for every 10°C rise.",
      "Activation Energy (E_a): Minimum extra kinetic energy reacting molecules must possess above their average energy to form the activated transition state complex.",
      "Arrhenius plot: Graph of ln k vs 1/T is a straight line with slope = -E_a / R and y-intercept = ln A. Graph of log₁₀ k vs 1/T has slope = -E_a / (2.303 R).",
      "Catalyst lowers activation energy (E_a) by providing an alternate reaction pathway; it accelerates both forward and reverse rates equally without changing ΔH or equilibrium constant K."
    ],
    "formulas": [
      {
        "name": "Arrhenius Two-Temperature Equation",
        "formula": "\\log_{10} \\left( \\frac{k_2}{k_1} \\right) = \\frac{E_a}{2.303 R} \\left[ \\frac{1}{T_1} - \\frac{1}{T_2} \\right] = \\frac{E_a}{2.303 R} \\left[ \\frac{T_2 - T_1}{T_1 T_2} \\right]",
        "variables": "k₁, k₂ = rate constants at T₁ and T₂, E_a = activation energy in J/mol, R = 8.314 J/mol·K",
        "examTip": "A reaction with higher activation energy is MORE sensitive to temperature changes (has a steeper slope on Arrhenius plot).",
        "trap": "Ensure E_a is in J/mol when R = 8.314 J/mol·K is used! If E_a is given in kJ/mol, multiply by 1000."
      },
      {
        "name": "Collision Theory Rate Expression",
        "formula": "\\text{Rate} = Z_{AB} \\cdot e^{-E_a / R T} = P \\cdot Z_{AB} \\cdot e^{-E_a / R T}",
        "variables": "Z_AB = collision frequency of reactants A and B, e^(-E_a/RT) = Boltzmann fraction of effective collisions, P = steric factor / orientation factor",
        "examTip": "For effective collision: Molecules must possess threshold energy (E_threshold = Average kinetic energy + E_a) AND proper spatial orientation.",
        "trap": "Endothermic reaction: E_a(forward) = E_a(backward) + ΔH ⇒ E_a(forward) > ΔH. Exothermic reaction: E_a(forward) = E_a(backward) - |ΔH|."
      }
    ],
    "keyPoints": [
      "Zero activation energy (E_a = 0): Rate constant is independent of temperature (e.g. combination of free radicals ·CH₃ + ·CH₃ → C₂H₆).",
      "Catalyst increases reaction rate by factor of e^(ΔE_a / RT)."
    ]
  },
  {
    "id": "chem-12-dfb-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "The d- and f-Block Elements",
    "topic": "Transition Metal Trends, Magnetic Moments & Potassium Permanganate",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Transition metals have incompletely filled (n-1)d subshells, exhibiting variable oxidation states, catalytic properties, colored complex ions, and interstitial compound formation.",
    "shortNotes": [
      "Zn, Cd, Hg have fully filled (n-1)d¹⁰ configurations in atomic and common oxidation states, so they are not considered true transition elements.",
      "Density increases across 3d series up to Cu; Osmium (Os, d = 22.57 g/cm³) and Iridium (Ir, d = 22.61 g/cm³) have the highest densities.",
      "Highest oxidation state in 3d series is +7 for Manganese (KMnO₄); in 4d/5d it is +8 for Ruthenium and Osmium (RuO₄, OsO₄).",
      "Lanthanoid Contraction: Steady decrease in atomic and ionic radii from Lanthanum (La, Z=57) to Lutetium (Lu, Z=71) caused by poor shielding of 4f electrons. Consequence: 4d and 5d metals of same group have almost identical radii (Zr ≈ Hf = 160 pm; Nb ≈ Ta; Mo ≈ W).",
      "Potassium Permanganate (KMnO₄): Dark purple crystalline solid. Strong oxidizing agent. Prepared from Pyrolusite ore (MnO₂): 2 MnO₂ + 4 KOH + O₂ → 2 K₂MnO₄ (Green manganate) + 2 H₂O; 3 MnO₄²⁻ + 4 H⁺ → 2 MnO₄⁻ (Purple) + MnO₂ + 2 H₂O."
    ],
    "formulas": [
      {
        "name": "Spin-Only Magnetic Moment Formula",
        "formula": "\\mu = \\sqrt{n(n + 2)} \\text{ BM}, \\quad \\text{where } n = \\text{number of unpaired electrons}",
        "variables": "n = 1 → 1.73 BM, n = 2 → 2.83 BM, n = 3 → 3.87 BM, n = 4 → 4.90 BM, n = 5 → 5.92 BM",
        "examTip": "Sc³⁺, Ti⁴⁺, Cu⁺, Zn²⁺ have n = 0 (Diamagnetic, μ = 0, colorless ions); Fe³⁺ and Mn²⁺ have 3d⁵ (n = 5, μ = 5.92 BM, strongly paramagnetic).",
        "trap": "In strong field ligand complexes (like [Fe(CN)₆]³⁻), electron pairing occurs in d-orbitals, reducing n and lowering the magnetic moment (low-spin complex)!"
      },
      {
        "name": "KMnO4 & K2Cr2O7 Redox Stoichiometry",
        "formula": "\\text{Acidic KMnO}_4: \\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\to \\text{Mn}^{2+} + 4\\text{H}_2\\text{O} \\; (n=5); \\quad \\text{Acidic K}_2\\text{Cr}_2\\text{O}_7: \\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^+ + 6e^- \\to 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O} \\; (n=6)",
        "variables": "Equivalent weight E = M / 5 for KMnO₄ in acidic medium; E = M / 6 for K₂Cr₂O₇ in acidic medium",
        "examTip": "KMnO₄ acts as its own self-indicator in titrations because faint pink color of excess MnO₄⁻ signals endpoint.",
        "trap": "K₂Cr₂O₇ in alkaline medium turns YELLOW due to chromate conversion: Cr₂O₇²⁻ (Orange) + 2 OH⁻ ⇌ 2 CrO₄²⁻ (Yellow) + H₂O. Reaction is reversible upon adding acid!"
      }
    ],
    "keyPoints": [
      "Color of transition metal ions is primarily due to d-d electronic transitions. Exception: MnO₄⁻ (purple) and Cr₂O₇²⁻ (orange) have no d-electrons (d⁰); their intense color is due to Charge Transfer (Ligand to Metal Charge Transfer, LMCT)!",
      "Alloy formation: Transition metals readily form alloys (Brass Cu-Zn, Bronze Cu-Sn, Steel) due to similar atomic radii (within 15% Hume-Rothery rule)."
    ]
  },
  {
    "id": "chem-12-cor-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Coordination Compounds",
    "topic": "Crystal Field Theory (CFT) & Coordination Isomerism",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "CFT treats metal-ligand interaction as electrostatic point charges. Ligand field splits degenerate d-orbitals into t_2g and e_g sets.",
    "shortNotes": [
      "Octahedral splitting (Δ_o): d_xy, d_yz, d_zx (t_2g) are stabilized by -0.4 Δ_o (-2/5 Δ_o); d_x²-y², d_z² (e_g) are destabilized by +0.6 Δ_o (+3/5 Δ_o).",
      "Tetrahedral splitting (Δ_t): Inverted splitting. Δ_t = (4/9) Δ_o. Because Δ_t is small, pairing energy P > Δ_t always: ALL tetrahedral complexes are HIGH SPIN!",
      "Spectrochemical Series (Ligand Field Strength): I⁻ < Br⁻ < S²⁻ < SCN⁻ < Cl⁻ < N₃⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < EDTA⁴⁻ < NH₃ < en < NO₂⁻ < CN⁻ < CO.",
      "Strong field ligands (CN⁻, CO, NO₂⁻, en) cause pairing: Δ_o > P ⇒ Low Spin (Inner orbital complex d²sp³).",
      "Weak field ligands (halides, H₂O, OH⁻) do not pair: Δ_o < P ⇒ High Spin (Outer orbital complex sp³d²).",
      "Crystal Field Stabilization Energy (CFSE) = [-0.4 n(t_2g) + 0.6 n(e_g)] Δ_o + m P."
    ],
    "formulas": [
      {
        "name": "CFSE Octahedral Energy Calculation",
        "formula": "\\text{CFSE} = \\left[ -0.4 \\times n_{t_{2g}} + 0.6 \\times n_{e_g} \\right] \\Delta_o + m P",
        "variables": "n(t_2g), n(e_g) = number of electrons in t_2g and e_g sets, P = pairing energy, m = number of extra electron pairs",
        "examTip": "For d⁶ in strong field ([Fe(CN)₆]⁴⁻, t_2g⁶ e_g⁰): CFSE = -0.4 × 6 Δ_o + 2P = -2.4 Δ_o + 2P (Diamagnetic, μ = 0).",
        "trap": "In weak field ([Fe(H₂O)₆]²⁺, t_2g⁴ e_g²): CFSE = (-0.4×4 + 0.6×2) Δ_o = -0.4 Δ_o (Paramagnetic with 4 unpaired electrons, μ = 4.90 BM)."
      },
      {
        "name": "Coordination Isomerism Identification",
        "formula": "\\text{Linkage: } [\\text{Co}(\\text{NH}_3)_5(\\text{NO}_2)]^{2+} \\text{ (Nitro, yellow)} \\;\\text{vs}\\; [\\text{Co}(\\text{NH}_3)_5(\\text{ONO})]^{2+} \\text{ (Nitrito, red)}",
        "variables": "Ambidentate ligands (NO₂⁻ / ONO⁻, SCN⁻ / NCS⁻, CN⁻ / NC⁻) give linkage isomerism",
        "examTip": "Ionization isomerism: [Co(NH₃)₅Br]SO₄ (gives white ppt with BaCl₂) vs [Co(NH₃)₅(SO₄)]Br (gives pale yellow ppt with AgNO₃).",
        "trap": "Geometrical cis-trans: [Pt(NH₃)₂Cl₂] (Square planar): cis-platin is an antitumor anticancer drug, trans-isomer is inactive. Tetrahedral complexes NEVER show geometrical isomerism!"
      }
    ],
    "keyPoints": [
      "Chelate effect: Polydentate ligands like EDTA⁴⁻ and en form stable ring structures with central metal, imparting much higher thermodynamic stability than monodentate ligands.",
      "Synergic bonding in metal carbonyls [M(CO)_x]: σ-donation from CO lone pair into vacant metal d-orbital + π-backbonding from filled metal d-orbital into vacant antibonding π* orbital of CO strengthens M-C bond and weakens C-O bond (decreases C-O stretching frequency in IR spectroscopy)."
    ]
  },
  {
    "id": "chem-12-hal-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "SN1 vs SN2 Mechanisms & Stereochemistry",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Nucleophilic substitution: SN1 proceeds via two-step carbocation intermediate; SN2 proceeds via single-step bimolecular transition state with backside attack.",
    "shortNotes": [
      "SN1: Rate = k [R-X] (First order kinetics). Two steps: 1. Slow rate-determining departure of leaving group forming planar carbocation; 2. Fast nucleophile attack from both faces.",
      "Stereochemistry of SN1: RACEMIZATION (with partial inversion).",
      "Reactivity order for SN1: 3° > 2° > 1° > CH₃X (Allylic and Benzylic halides are exceptionally reactive due to resonance-stabilized carbocations).",
      "Solvent: Polar protic solvents (H₂O, Alcohols) favor SN1 by solvating leaving group.",
      "SN2: Rate = k [R-X] [Nu⁻] (Second order kinetics). Single-step concerted mechanism via pentacoordinate transition state.",
      "Stereochemistry of SN2: COMPLETE WALDEN INVERSION (Inversion of configuration like an umbrella in a gale).",
      "Reactivity order for SN2: CH₃X > 1° > 2° > 3° (Steric hindrance dominates: 3° alkyl halides NEVER undergo SN2!).",
      "Solvent: Polar aprotic solvents (Acetone, DMSO, DMF) favor SN2 by enhancing nucleophile nucleophilicity."
    ],
    "formulas": [
      {
        "name": "SN1 vs SN2 Kinetic Comparison",
        "formula": "\\text{S}_N1: \\text{Rate} = k [\\text{R-X}]^1 [\\text{Nu}]^0, \\quad \\text{S}_N2: \\text{Rate} = k [\\text{R-X}]^1 [\\text{Nu}]^1",
        "variables": "SN2 rate doubles if nucleophile concentration is doubled; SN1 rate is unaffected by nucleophile concentration",
        "examTip": "Finkelstein Reaction: R-Cl/R-Br + NaI (dry acetone) → R-I + NaCl↓ (precipitated NaCl drives reaction forward via Le Chatelier).",
        "trap": "Swarts Reaction prepares fluoroalkanes: R-Cl + AgF (or CoF₃, SbF₃, Hg₂F₂) → R-F + AgCl↓."
      }
    ],
    "keyPoints": [
      "Ambident nucleophiles: KCN (ionic, C-attack gives Cyanide R-CN as major); AgCN (covalent, N-attack gives Isocyanide R-NC as major!).",
      "KNO₂ (ionic, O-attack gives Alkyl nitrite R-O-N=O); AgNO₂ (covalent, N-attack gives Nitroalkane R-NO₂ as major!)."
    ]
  },
  {
    "id": "chem-12-hal-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Haloarenes Reactivity & Benzyne Mechanism",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Aryl halides (like Chlorobenzene) are extremely unreactive towards nucleophilic substitution under normal conditions.",
    "shortNotes": [
      "Reasons for low reactivity of haloarenes towards nucleophilic substitution:",
      "1. Resonance Effect: Lone pair of halogen is conjugated with benzene ring, imparting partial double bond character to C-Cl bond (shorter 1.69 Å and stronger than 1.77 Å in R-Cl).",
      "2. Hybridization of Carbon: C attached to halogen is sp² hybridized (33% s-character, more electronegative, holds electrons tighter than sp³ in alkyl halides).",
      "3. Instability of Phenyl Cation: Phenyl cation cannot be resonance stabilized.",
      "4. Electronic Repulsion: Electron-rich benzene ring repels approaching electron-rich nucleophiles.",
      "Activation by Electron-Withdrawing Groups (-NO₂): Introducing -NO₂ at Ortho and Para positions drastically increases reactivity towards nucleophilic substitution by stabilizing the carbanion intermediate (Meisenheimer complex).",
      "Meta-nitro group has NO activating effect because negative charge in resonance structures never falls on carbon bearing meta-NO₂!"
    ],
    "formulas": [
      {
        "name": "Dow Process & Activated Nucleophilic Substitution",
        "formula": "\\text{C}_6\\text{H}_5\\text{Cl} \\xrightarrow{1.\\; \\text{NaOH}, \\; 623 \\text{ K}, \\; 300 \\text{ atm}} \\xrightarrow{2.\\; \\text{H}^+} \\text{C}_6\\text{H}_5\\text{OH} \\; (\\text{Phenol})",
        "variables": "Drastic conditions required for unactivated chlorobenzene; 2,4,6-Trinitrochlorobenzene hydrolyzes in warm water!",
        "examTip": "Picryl chloride (2,4,6-trinitrochlorobenzene) gives Picric acid (2,4,6-trinitrophenol) simply by warming with warm water at 40°C!",
        "trap": "Chlorobenzene reacts with KNH₂ in liquid NH₃ via ELIMINATION-ADDITION (Benzyne intermediate containing formal triple bond), giving a mixture of aniline isomers (cine-substitution)!"
      }
    ],
    "keyPoints": [
      "Wurtz-Fittig Reaction: R-X + Ar-X + 2 Na (dry ether) → Ar-R + 2 NaX (Alkylarene).",
      "Fittig Reaction: 2 Ar-X + 2 Na (dry ether) → Ar-Ar (Biphenyl) + 2 NaX."
    ]
  },
  {
    "id": "chem-12-ape-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Alcohols: Lucas Test, Dehydration Mechanism & Acidity",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Alcohols (R-OH) act as both weak Bronsted acids and weak Lewis bases. Dehydration produces alkenes via carbocation intermediates.",
    "shortNotes": [
      "Acidity of Alcohols: Water is MORE acidic than alcohols (except Methanol): H₂O > R-OH. Acidity order among alcohols: CH₃OH > 1° > 2° > 3° (due to +I destabilization of alkoxide RO⁻).",
      "Lucas Test (Distinction of 1°, 2°, 3° Alcohols): Reagent: Anhydrous ZnCl₂ + concentrated HCl (forms insoluble alkyl chloride turbidity).",
      "3° Alcohol: Immediate cloudiness / turbidity within seconds.",
      "2° Alcohol: Turbidity appears within 5 minutes.",
      "1° Alcohol: No turbidity at room temperature; appears only on prolonged heating.",
      "Dehydration of Alcohols: H₂SO₄ at 443 K (170°C) gives Alkene (E1 elimination via carbocation); H₂SO₄ at 413 K (140°C) gives Ether (SN2 nucleophilic bimolecular substitution).",
      "Ease of dehydration: 3° > 2° > 1° (Saytzeff's rule: more substituted alkene is major product)."
    ],
    "formulas": [
      {
        "name": "Dehydration Temperature Control",
        "formula": "2 \\text{ C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{H}_2\\text{SO}_4, \\; 413 \\text{ K}} \\text{C}_2\\text{H}_5\\text{OC}_2\\text{H}_5 + \\text{H}_2\\text{O}, \\quad \\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{H}_2\\text{SO}_4, \\; 443 \\text{ K}} \\text{CH}_2=\\text{CH}_2 + \\text{H}_2\\text{O}",
        "variables": "Low temperature favors intermolecular SN2 ether formation; High temperature favors intramolecular E1 elimination alkene",
        "examTip": "Victor Meyer Test: 1° Alcohol gives Blood Red color; 2° Alcohol gives Blue color; 3° Alcohol remains Colorless ('R-B-C' mnemonic).",
        "trap": "Dehydration of 2-Methylpropan-1-ol undergoes hydride shift: (CH₃)₂CH-CH₂OH → (CH₃)₂C=CH₂ (Isobutylene major)!"
      }
    ],
    "keyPoints": [
      "Hydroboration-Oxidation of alkenes gives anti-Markovnikov hydration alcohol with NO carbocation rearrangement.",
      "Oxymercuration-Demercuration gives Markovnikov alcohol without rearrangement."
    ]
  },
  {
    "id": "chem-12-ape-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Phenols & Ethers: Kolbe, Reimer-Tiemann & Williamson",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Phenols are significantly more acidic than alcohols (pKa ≈ 10 vs 16) due to resonance stabilization of phenoxide ion (C₆H₅O⁻).",
    "shortNotes": [
      "Acidity order: Carboxylic acid (pKa ≈ 5) > Carbonic acid H₂CO₃ (pKa ≈ 6.4) > o-Nitrophenol > p-Nitrophenol > m-Nitrophenol > Phenol (pKa ≈ 10) > H₂O (pKa ≈ 15.7) > Alcohols (pKa ≈ 16). Phenol dissolves in NaOH, but NOT in NaHCO₃ (does not release CO₂).",
      "Reimer-Tiemann Reaction: Phenol + CHCl₃ + aq. NaOH (340 K) followed by acidification → Salicylaldehyde (o-hydroxybenzaldehyde). Electrophile: Dichlorocarbene (:CCl₂).",
      "Kolbe's Reaction: Sodium phenoxide (C₆H₅ONa) + CO₂ (4-7 atm, 400 K) followed by H⁺ → Salicylic acid (o-hydroxybenzoic acid, precursor to Aspirin).",
      "Cumene Process (Industrial Phenol): Isopropylbenzene (Cumene) oxidized by O₂ → Cumene hydroperoxide, which upon acid cleavage (dil. H₂SO₄) yields Phenol + Acetone (valuable byproduct!).",
      "Williamson Ether Synthesis: R-X + R'-ONa → R-O-R' + NaX. Best for preparing unsymmetrical ethers. R-X MUST BE 1° or methyl! If 3° alkyl halide is used, ELIMINATION dominates producing alkene exclusively."
    ],
    "formulas": [
      {
        "name": "Cleavage of Ethers by Hydrogen Iodide (HI)",
        "formula": "\\text{R-O-R'} + \\text{HI} \\to \\text{R-OH} + \\text{R'-I} \\; (\\text{Cold}), \\quad \\text{R-O-R'} + 2 \\text{HI} \\to \\text{R-I} + \\text{R'-I} + \\text{H}_2\\text{O} \\; (\\text{Excess Hot})",
        "variables": "For unsymmetrical ethers: If alkyl groups are 1° or 2°, mechanism is SN2 (Iodine attacks LESS hindered primary alkyl group); If one group is 3° (tert-butyl) or benzylic, mechanism is SN1 (Iodine attacks 3° carbon forming tertiary iodide)!",
        "examTip": "Anisole (C₆H₅-O-CH₃) + HI → Phenol (C₆H₅OH) + CH₃I (NOT iodobenzene, because Ar-O bond has partial double bond character and never cleaves).",
        "trap": "In Williamson synthesis: (CH₃)₃C-ONa + CH₃-Br gives (CH₃)₃C-O-CH₃ (Ether, SN2 works!); BUT (CH₃)₃C-Br + CH₃-ONa gives (CH₃)₂C=CH₂ (Isobutylene alkene, E2 elimination dominates)!"
      }
    ],
    "keyPoints": [
      "Aspirin synthesis: Salicylic acid + Acetic anhydride (H⁺) → Acetylsalicylic acid (Aspirin) + CH₃COOH.",
      "Bromine water test: Phenol + 3 Br₂ (aqueous) → 2,4,6-Tribromophenol (white precipitate) + 3 HBr."
    ]
  },
  {
    "id": "chem-12-akc-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Nucleophilic Addition & Name Reactions (Aldol, Cannizzaro)",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Carbonyl carbon is sp² hybridized, planar, and electrophilic due to C=O bond polarization. Aldehydes are more reactive than ketones due to steric and inductive effects.",
    "shortNotes": [
      "Reactivity order towards nucleophilic addition: HCHO > CH₃CHO > CH₃COCH₃ > C₆H₅CHO > C₆H₅COCH₃ > C₆H₅COC₆H₅.",
      "Nucleophilic additions: HCN (cyanohydrin), NaHSO₃ (bisulfite crystalline adduct, test for carbonyls), Grignard reagent (HCHO → 1° alc; RCHO → 2° alc; Ketone → 3° alc), Alcohols (hemiacetal / acetal, ketal).",
      "Nucleophilic addition-elimination with Ammonia derivatives (NH₂-Z): Hydroxylamine (Oxime >C=N-OH), Hydrazine (Hydrazone), Phenylhydrazine, 2,4-DNP (Brady's reagent, yellow/orange precipitate confirms carbonyl group), Semicarbazide (Semicarbazone).",
      "Aldol Condensation: Aldehydes or ketones containing AT LEAST ONE α-hydrogen in presence of dilute alkali (NaOH, Ba(OH)₂) form β-hydroxy carbonyl compound (Aldol), which upon heating eliminates H₂O to yield α,β-unsaturated carbonyl.",
      "Cannizzaro Reaction: Aldehydes with NO α-hydrogen (HCHO, C₆H₅CHO, (CH₃)₃C-CHO) in concentrated alkali (50% NaOH) undergo self-redox disproportionation forming 1 mole alcohol and 1 mole carboxylate salt.",
      "Haloform Reaction (Iodoform Test): Compounds with CH₃-C=O or CH₃-CH(OH)- group react with I₂ + NaOH to form yellow precipitate of Iodoform (CHI₃, m.p. 119°C)."
    ],
    "formulas": [
      {
        "name": "Aldol vs Cannizzaro Reaction Master Equations",
        "formula": "\\text{Aldol: } 2 \\text{ CH}_3\\text{CHO} \\xrightarrow{\\text{dil. NaOH}} \\text{CH}_3\\text{CH(OH)CH}_2\\text{CHO} \\xrightarrow{\\Delta, -\\text{H}_2\\text{O}} \\text{CH}_3\\text{CH=CH-CHO} \\; (\\text{Crotonaldehyde})",
        "variables": "Cannizzaro: 2 HCHO + 50% NaOH → CH₃OH + HCOONa; 2 C₆H₅CHO + 50% NaOH → C₆H₅CH₂OH + C₆H₅COONa",
        "examTip": "Cross-Aldol between two different aldehydes with α-hydrogens gives 4 products; Cross-Cannizzaro with Formaldehyde ALWAYS oxidizes HCHO to Sodium formate (HCOONa), reducing the other aldehyde to alcohol!",
        "trap": "In Semicarbazide (H₂N-NH-CO-NH₂), the NH₂ group attached to NH is nucleophilic; the other NH₂ adjacent to C=O is involved in resonance and cannot attack!"
      },
      {
        "name": "Clemmensen vs Wolff-Kishner Carbonyl Reduction",
        "formula": "\\text{Clemmensen: } >\\text{C=O} \\xrightarrow{\\text{Zn-Hg / conc. HCl}} >\\text{CH}_2, \\quad \\text{Wolff-Kishner: } >\\text{C=O} \\xrightarrow{\\text{NH}_2\\text{NH}_2, \\; \\text{KOH / ethylene glycol, } \\Delta} >\\text{CH}_2",
        "variables": "Directly converts aldehyde or ketone into alkane (>C=O to >CH₂)",
        "examTip": "Use Clemmensen for base-sensitive compounds; Use Wolff-Kishner for acid-sensitive compounds (e.g. compounds containing acetal or -OH groups).",
        "trap": "Tollen's Test [Ag(NH₃)₂]⁺ gives silver mirror with ALL aldehydes (both aliphatic and aromatic) and Formic acid, but NOT with ketones! Fehling's solution oxidizes ALIPHATIC aldehydes only; Benzaldehyde does not reduce Fehling's."
      }
    ],
    "keyPoints": [
      "Hell-Volhard-Zelinsky (HVZ) Reaction: Carboxylic acids with α-hydrogen react with X₂ (Cl₂, Br₂) in presence of red phosphorus to form α-halocarboxylic acids: R-CH₂-COOH + Br₂/Red P → R-CH(Br)-COOH.",
      "Formic acid (HCOOH) is the only carboxylic acid that shows reducing properties (reduces Tollen's, Fehling's, and KMnO₄) because it possesses both aldehyde (-CHO) and carboxyl (-COOH) functional groups."
    ]
  },
  {
    "id": "chem-12-amn-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Amines",
    "topic": "Basicity Trends & Name Reactions (Hoffmann, Carbylamine)",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Amines are basic derivatives of ammonia with a lone pair on nitrogen. Aryl amines are much weaker bases than aliphatic amines due to resonance delocalization.",
    "shortNotes": [
      "Basicity of Aliphatic Amines in Aqueous Solution (Combined inductive +I, steric hindrance, and hydration of conjugate cation):",
      "For Methyl substituents: 2° > 1° > 3° > NH₃ ⇒ (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃.",
      "For Ethyl substituents: 2° > 3° > 1° > NH₃ ⇒ (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃.",
      "In Non-polar / Gas phase: 3° > 2° > 1° > NH₃ (governed purely by +I electron donation).",
      "Aniline (C₆H₅NH₂) is much weaker base than NH₃ (pKb ≈ 9.4 vs 4.75) because nitrogen lone pair is delocalized into benzene ring across 5 resonance structures.",
      "Carbylamine Test (Isocyanide Test): Primary amines (both aliphatic and aromatic) heated with CHCl₃ + alc. KOH produce foul-smelling isocyanides (carbylamines): R-NH₂ + CHCl₃ + 3 KOH → R-NC + 3 KCl + 3 H₂O. (Secondary and tertiary amines do NOT give this test).",
      "Hoffmann Bromamide Degradation: Primary acid amide heated with Br₂ + 4 KOH yields primary amine with ONE LESS carbon atom: R-CONH₂ + Br₂ + 4 KOH → R-NH₂ + K₂CO₃ + 2 KBr + 2 H₂O.",
      "Hinsberg Test: Benzenesulphonyl chloride (C₆H₅SO₂Cl): 1° amine forms N-alkylbenzenesulphonamide (soluble in alkali due to acidic N-H); 2° amine forms N,N-dialkyl derivative (insoluble in alkali); 3° amine does not react."
    ],
    "formulas": [
      {
        "name": "Diazonium Salt Synthetic Conversions",
        "formula": "\\text{C}_6\\text{H}_5\\text{NH}_2 \\xrightarrow{\\text{NaNO}_2 + \\text{HCl}, \\; 273-278 \\text{ K}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- \\; (\\text{Benzene Diazonium Chloride})",
        "variables": "Stable only at low temperature (0-5°C); undergoes nucleophilic substitution releasing N₂ gas",
        "examTip": "Sandmeyer: CuCl/HCl → Ar-Cl; CuBr/HBr → Ar-Br; CuCN/KCN → Ar-CN. Gattermann uses Cu powder/HX.",
        "trap": "Ar-I is synthesized simply by warming diazonium salt with aqueous KI (no copper catalyst needed!); Ar-F is made by Balz-Schiemann reaction using HBF₄ followed by heating Ar-N₂⁺BF₄⁻."
      }
    ],
    "keyPoints": [
      "Gabriel Phthalimide Synthesis prepares pure primary aliphatic amines exclusively; fails for aromatic primary amines (aniline) because aryl halides cannot undergo nucleophilic substitution with phthalimide anion.",
      "Azo Coupling: Diazonium salt reacts with Phenol (mildly alkaline pH 9-10) to form p-hydroxyazobenzene (Orange dye); with Aniline (mildly acidic pH 4-5) to form p-aminoazobenzene (Yellow dye)."
    ]
  },
  {
    "id": "chem-12-bio-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Biomolecules",
    "topic": "Carbohydrates, Amino Acids & Nucleic Acids",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Biomolecules include carbohydrates (polyhydroxy aldehydes/ketones), proteins (polymers of α-amino acids), and nucleic acids (polynucleotides storing genetic code).",
    "shortNotes": [
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
    "formulas": [
      {
        "name": "Amino Acid Zwitterion & Isoelectric Point",
        "formula": "\\text{pI} = \\frac{\\text{pK}_{a1} + \\text{pK}_{a2}}{2}, \\quad \\text{At pH} < \\text{pI}: \\text{Cationic } (^+H_3N-CH(R)-COOH); \\quad \\text{At pH} > \\text{pI}: \\text{Anionic}",
        "variables": "pK_a1 = carboxyl group dissociation, pK_a2 = amino group dissociation",
        "examTip": "Glycine (H₂N-CH₂-COOH) is the ONLY naturally occurring amino acid that is OPTICALLY INACTIVE (has no chiral carbon).",
        "trap": "Denaturation of proteins destroys secondary, tertiary, and quaternary structures by breaking hydrogen bonds (e.g. curdling of milk, coagulation of egg white), but PRIMARY structure (peptide covalent bonds) remains INTACT!"
      }
    ],
    "keyPoints": [
      "Vitamins: Fat-soluble (A, D, E, K); Water-soluble (B-complex, C). Vitamin C (Ascorbic acid) must be supplied regularly in diet because it is excreted in urine.",
      "Deficiency diseases: Vit A (Night blindness), Vit B₁ (Beri-beri), Vit B₁₂ (Pernicious anemia), Vit C (Scurvy), Vit D (Rickets), Vit K (Increased blood clotting time)."
    ]
  },
  {
    "id": "chem-12-srf-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Surface Chemistry",
    "topic": "Adsorption Isotherms, Colloids & Hardy-Schulze Rule",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Surface chemistry deals with surface phenomena. Adsorption is accumulation of molecular species at surface rather than bulk.",
    "shortNotes": [
      "Physical Adsorption (Physisorption): Weak van der Waals forces (< 40 kJ/mol), non-specific, reversible, multimolecular layers, decreases with increasing temperature.",
      "Chemical Adsorption (Chemisorption): Strong chemical bonds (80-240 kJ/mol), highly specific, irreversible, unimolecular layer, increases initially with temperature then decreases.",
      "Freundlich Adsorption Isotherm: x/m = k · P^(1/n) (where 0 < 1/n < 1). Taking log: log(x/m) = log k + (1/n) log P. Plot of log(x/m) vs log P is a straight line with slope 1/n and intercept log k.",
      "Colloids classification by affinity: Lyophilic (solvent-attracting, reversible, stable, cannot be easily coagulated, e.g. starch, gum, gelatin); Lyophobic (solvent-repelling, irreversible, unstable, readily coagulated by electrolytes, e.g. gold sol, As₂S₃ sol).",
      "Properties: Tyndall Effect (scattering of light by colloidal particles); Brownian Movement (random zig-zag motion preventing settling); Electrophoresis (migration of colloidal particles under electric field, proves charge on sol).",
      "Hardy-Schulze Rule: Coagulating power of an electrolyte is directly proportional to the 4th to 6th power of the valency of the active ion carrying charge opposite to that of the colloidal sol.",
      "Coagulating power order for negative sol (As₂S₃): Al³⁺ > Mg²⁺ > Na⁺. For positive sol (Fe(OH)₃): [Fe(CN)₆]⁴⁻ > PO₄³⁻ > SO₄²⁻ > Cl⁻."
    ],
    "formulas": [
      {
        "name": "Freundlich Adsorption Isotherm Equation",
        "formula": "\\frac{x}{m} = k P^{1/n}, \\quad \\log_{10} \\left( \\frac{x}{m} \\right) = \\log_{10} k + \\frac{1}{n} \\log_{10} P",
        "variables": "x = mass of adsorbate, m = mass of adsorbent, P = pressure of gas, k and n are constants at constant T (n > 1)",
        "examTip": "At low pressure: 1/n = 1 ⇒ x/m ∝ P (first order). At high pressure: 1/n = 0 ⇒ x/m = constant (zero order, surface saturated).",
        "trap": "Flocculation / Coagulation Value = minimum millimoles of electrolyte required to cause coagulation of 1 liter of colloidal sol. Smaller flocculation value = HIGHER coagulating power!"
      }
    ],
    "keyPoints": [
      "Gold Number: Minimum milligrams of protective lyophilic colloid required to prevent coagulation of 10 mL gold sol by 1 mL of 10% NaCl. Smaller gold number = greater protective power (Gelatin has smallest gold number ~0.005-0.01).",
      "Micelles (Associated Colloids): Formed above Critical Micelle Concentration (CMC) and Kraft Temperature (T_k) by surface-active agents like soaps (Sodium stearate C₁₇H₃₅COO⁻Na⁺)."
    ]
  },
  {
    "id": "chem-12-met-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "General Principles and Processes of Isolation of Elements",
    "topic": "Metallurgical Principles, Ellingham Diagram & Refining",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Metallurgy involves extraction of metals from ores via concentration, conversion to oxide, reduction to crude metal, and refining.",
    "shortNotes": [
      "Concentration Methods: Hydraulic washing / Gravity separation (density difference); Magnetic separation (Fe₃O₄, Wolframite FeWO₄); Froth Floatation (for sulfide ores like Galena PbS, Copper pyrites CuFeS₂, Zinc blende ZnS; Collector: Potassium ethyl xanthate; Frother: Pine oil; Depressant: NaCN separates ZnS from PbS); Leaching (Bayer's process for bauxite Al₂O₃·2H₂O with NaOH; Cyanide process for Au and Ag with NaCN).",
      "Calcination (heating in absence of air below melting point, expels moisture and CO₂ from carbonates/hydrates) vs Roasting (heating in excess air below melting point, oxidizes sulfides to oxides releasing SO₂).",
      "Ellingham Diagram: Plot of Δ_r G° vs T for metal oxide formation (2 M + O₂ → 2 MO). Slope is positive because ΔS is negative (gas O₂ consumed). Any metal whose line lies LOWER in Ellingham diagram can reduce the oxide of a metal whose line lies HIGHER at that temperature.",
      "Blast Furnace for Iron: Zones from top to bottom: 1. Reduction (500-800 K): 3 Fe₂O₃ + CO → 2 Fe₃O₄ + CO₂; 2. Slag formation (1000-1200 K): CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃ (Fusible slag); 3. Combustion (1500-2200 K): C + O₂ → CO₂; C + CO₂ → 2 CO (Main reducing agent at higher temp). Produces Pig Iron (4% carbon, brittle); remelted with scrap forms Cast Iron (3% C); Wrought iron is purest commercial form (0.1-0.2% C).",
      "Hall-Héroult Process (Aluminum): Electrolysis of molten Al₂O₃ dissolved in Cryolite (Na₃AlF₆) and Fluorspar (CaF₂), which lower melting point from 2320 K to ~1220 K and enhance electrical conductivity. Carbon anodes are consumed: C + 2 O²⁻ → CO₂ + 4 e⁻.",
      "Refining Methods: 1. Liquation (low m.p. metals like Sn, Pb); 2. Distillation (low b.p. volatile metals like Zn, Cd, Hg); 3. Electrolytic (Cu, Al); 4. Zone Refining (ultra-pure semiconductors like Si, Ge, Ga, based on principle that impurities are more soluble in molten melt than solid); 5. Mond Process (Nickel refined via volatile carbonyl: Ni + 4 CO (330-350 K) → Ni(CO)₄ (gas) ⎯450-470 K⎯→ Ni + 4 CO); 6. Van Arkel Method (Titanium, Zirconium refined via volatile iodides: Zr + 2 I₂ (870 K) → ZrI₄ ⎯Tungsten filament 2075 K⎯→ Zr + 2 I₂)."
    ],
    "formulas": [
      {
        "name": "Ellingham Diagram Spontaneity Criterion",
        "formula": "\\Delta G^\\circ = \\Delta H^\\circ - T \\Delta S^\\circ, \\quad \\text{Lower metal curve reduces higher metal oxide: } \\Delta G^\\circ_{\\text{net}} < 0",
        "variables": "Intersection point represents thermodynamic temperature above which reduction by carbon or CO becomes spontaneous",
        "examTip": "Below 710°C (983 K), CO is a better reducing agent for iron oxides than Carbon (line for 2CO + O₂ → 2CO₂ lies lower); Above 710°C, Carbon (C + O₂ → CO₂) becomes the better reducing agent!",
        "trap": "Blister Copper has blistered appearance caused by the bubbling escape of SO₂ gas during solidification: 2 Cu₂O + Cu₂S → 6 Cu + SO₂↑ (Auto-reduction / Self-reduction)!"
      }
    ],
    "keyPoints": [
      "Mond process for Ni and Van Arkel method for Ti/Zr are based on the Vapor Phase Refining principle.",
      "In extraction of copper, silica (SiO₂) is added as acidic flux to remove FeO impurity as fusible iron silicate slag (FeSiO₃): FeO + SiO₂ → FeSiO₃."
    ]
  }
,
  {
  "id": "chem-12-solid-state-unit-cell",
  "subject": "Chemistry",
  "classLevel": "12",
  "chapter": "Solid State",
  "topic": "Unit Cells, Density & Crystal Lattices",
  "weightage": "High",
  "examTarget": "Both",
  "concept": "Crystalline solids exhibit long-range order. Unit cells are characterized by lattice parameters (a, b, c, alpha, beta, gamma). Density depends on the number of atoms per unit cell (z), molar mass (M), edge length (a), and Avogadro's number.",
  "shortNotes": [
    "Simple Cubic (SC): z = 1, Coordination Number = 6, Packing Efficiency = 52.4%, r = a / 2.",
    "Body-Centered Cubic (BCC): z = 2, Coordination Number = 8, Packing Efficiency = 68%, r = (sqrt(3) / 4) * a.",
    "Face-Centered Cubic (FCC / CCP): z = 4, Coordination Number = 12, Packing Efficiency = 74%, r = a / (2 * sqrt(2)).",
    "Hexagonal Close Packing (HCP): z = 6, Coordination Number = 12, Packing Efficiency = 74%.",
    "Density formula: d = (z * M) / (a^3 * N_A). Always convert edge length 'a' to cm (1 pm = 10^-10 cm)."
  ],
  "formulas": [
    {
      "name": "Density of Unit Cell",
      "formula": "\\rho = \\frac{z \\cdot M}{a^3 \\cdot N_A}",
      "variables": "\\rho: \\text{Density (g/cm}^3\\text{)}, z: \\text{Number of atoms/unit cell}, M: \\text{Molar mass (g/mol)}, a: \\text{Edge length (cm)}, N_A: \\text{Avogadro's number}",
      "examTip": "Ensure unit consistency! If a is in pm, a(cm) = a * 10^-10 cm. If density is in kg/m^3, scale by 10^3.",
      "trap": "Students frequently confuse z for BCC (z=2) and FCC (z=4) with coordination number (8 and 12 respectively)."
    },
    {
      "name": "Atomic Radius & Edge Length Relations",
      "formula": "r_{\\text{SC}} = \\frac{a}{2}, \\quad r_{\\text{BCC}} = \\frac{\\sqrt{3} a}{4}, \\quad r_{\\text{FCC}} = \\frac{a}{2\\sqrt{2}}",
      "variables": "r: \\text{Atomic radius}, a: \\text{Unit cell edge length}",
      "examTip": "In BCC, atoms touch along the body diagonal (4r = sqrt(3)*a). In FCC, atoms touch along the face diagonal (4r = sqrt(2)*a).",
      "trap": "Distance between nearest neighbours (d): d = 2r. In BCC, nearest neighbour distance is (sqrt(3)/2)*a, not (sqrt(3)/4)*a."
    },
    {
      "name": "Limiting Radius Ratios for Voids",
      "formula": "\\frac{r_+}{r_-}: \\text{Trigonal (0.155 - 0.225), Tetrahedral (0.225 - 0.414), Octahedral (0.414 - 0.732), Cubic (0.732 - 1.000)}",
      "variables": "r_+: \\text{Cation radius}, r_-: \\text{Anion radius}",
      "examTip": "Number of octahedral voids = N, number of tetrahedral voids = 2N, where N is the number of close-packed spheres (FCC: N=4 -> 4 Oct, 8 Tet voids).",
      "trap": "Tetrahedral voids are located on body diagonals (2 per body diagonal); Octahedral voids are at edge centers and body center."
    }
  ],
  "keyPoints": [
    "Schottky defect: Equal number of cations and anions missing, decreases density (NaCl, KCl, CsCl, AgBr).",
    "Frenkel defect: Smaller ion dislocated to interstitial site, density unchanged (ZnS, AgCl, AgBr, AgI). AgBr shows BOTH Schottky and Frenkel defects.",
    "F-centres: Anionic sites occupied by unpaired electrons impart color to crystals (e.g. yellow NaCl in Na vapor)."
  ]
},
  {
  "id": "chem-12-pblock-group-15-16",
  "subject": "Chemistry",
  "classLevel": "12",
  "chapter": "p-Block Elements (Group 15, 16, 17 & 18)",
  "topic": "Group 15 & 16: Nitrogen, Phosphorus, Oxygen & Sulfur",
  "weightage": "High",
  "examTarget": "Both",
  "concept": "Group 15 (Pnictogens) and Group 16 (Chalcogens) show significant oxidation state diversity and anomalous first-member behaviour due to small size, high electronegativity, and absence of d-orbitals.",
  "shortNotes": [
    "Nitrogen forms N2 with high bond dissociation enthalpy (941.4 kJ/mol), making it chemically inert at room temperature.",
    "Phosphorus exhibits catenation and exists as White P4 (tetrahedral, 60 deg bond angle, highly reactive/chemically toxic), Red P (polymeric chain, stable), and Black P.",
    "Haber Process for NH3: N2 + 3H2 <=> 2NH3, Delta H = -92.4 kJ/mol. Favoured by high pressure (200 atm), optimum temp (700 K), and Fe catalyst with K2O/Al2O3 promoter.",
    "Ostwald's Process: 4NH3 + 5O2 -> 4NO + 6H2O (Pt/Rh gauze catalyst) -> 2NO + O2 -> 2NO2 -> 3NO2 + H2O -> 2HNO3 + NO.",
    "Contact Process for H2SO4: 2SO2 + O2 <=> 2SO3 (V2O5 catalyst, 2 bar, 720 K) -> SO3 absorbed in H2SO4 to form oleum (H2S2O7) -> diluted to pure H2SO4.",
    "Anomalous boiling point of H2O and NH3 is due to intermolecular hydrogen bonding (H2O > H2Te > H2Se > H2S)."
  ],
  "formulas": [
    {
      "name": "Haber & Contact Equilibrium Conditions",
      "formula": "K_p = \\frac{p_{\\text{NH}_3}^2}{p_{\\text{N}_2} \\cdot p_{\\text{H}_2}^3}, \\quad K_p = \\frac{p_{\\text{SO}_3}^2}{p_{\\text{SO}_2}^2 \\cdot p_{\\text{O}_2}}",
      "variables": "p_i: \\text{Partial pressure of component } i, K_p: \\text{Equilibrium constant}",
      "examTip": "Both NH3 and SO3 synthesis are exothermic (Delta H < 0). By Le Chatelier's principle, low temp and high pressure maximize yield.",
      "trap": "Operating temperature is kept around 700 K as an optimum for kinetics, even though lower temp thermodynamically favours yield."
    },
    {
      "name": "Oxoacids Basicity & Reducing Power",
      "formula": "\\text{Basicity of } \\text{H}_3\\text{PO}_n = n - 1 \\quad (n = 2, 3, 4)",
      "variables": "\\text{H}_3\\text{PO}_2: \\text{monobasic (2 P-H bonds)}, \\text{H}_3\\text{PO}_3: \\text{dibasic (1 P-H bond)}, \\text{H}_3\\text{PO}_4: \\text{tribasic (0 P-H bonds)}",
      "examTip": "P-H bonds act as reducing agents! H3PO2 is the strongest reducing agent among phosphorus oxoacids because it has two P-H bonds.",
      "trap": "Do not count total H atoms for basicity; only H atoms attached to oxygen (P-OH) are ionizable."
    }
  ],
  "keyPoints": [
    "Thermal stability of hydrides decreases down the group: NH3 > PH3 > AsH3 > SbH3 > BiH3, while reducing character increases.",
    "Ozone is a powerful oxidizing agent: O3 + 2I^- + H2O -> I2 + O2 + 2OH^-. Used in quantitative estimation using standard Na2S2O3.",
    "Sulfur forms S8 puckered ring in rhombic and monoclinic forms. Above 1000 K, S2 is dominant and paramagnetic like O2 due to two unpaired electrons in pi* orbitals."
  ]
},
  {
  "id": "chem-12-pblock-group-17-18",
  "subject": "Chemistry",
  "classLevel": "12",
  "chapter": "p-Block Elements (Group 15, 16, 17 & 18)",
  "topic": "Group 17 & 18: Halogens & Noble Gases",
  "weightage": "High",
  "examTarget": "Both",
  "concept": "Group 17 elements (Halogens) have the highest electron gain enthalpies. Group 18 (Noble Gases) have closed-shell configurations; Xenon forms stable fluorides and oxides due to its lower ionization enthalpy.",
  "shortNotes": [
    "Electron gain enthalpy trend: Cl > F > Br > I (Fluorine has lower electron affinity than chlorine due to small 2p orbital compact electron repulsion).",
    "Bond dissociation enthalpy trend: Cl2 > Br2 > F2 > I2 (F2 has lower bond enthalpy than Cl2 and Br2 due to strong lone-pair lone-pair repulsion).",
    "Oxidizing power trend: F2 > Cl2 > Br2 > I2 (F2 is the strongest oxidizing agent in aqueous solution due to its exceptionally high hydration enthalpy and low bond dissociation energy).",
    "Interhalogen compounds: XX'_n (n = 1, 3, 5, 7 where X is larger halogen). More reactive than parent halogens (except F2) due to polar and weaker X-X' bond.",
    "Xenon compounds: XeF2 (Linear, sp3d, 3 lone pairs), XeF4 (Square planar, sp3d2, 2 lone pairs), XeF6 (Distorted octahedral, sp3d3, 1 lone pair), XeO3 (Pyramidal, sp3, 1 lone pair), XeOF4 (Square pyramidal, sp3d2, 1 lone pair)."
  ],
  "formulas": [
    {
      "name": "Standard Electrode Potential for Halogens",
      "formula": "E^\\circ_{\\text{F}_2/\\text{F}^-} = +2.87\\text{ V}, \\quad E^\\circ_{\\text{Cl}_2/\\text{Cl}^-} = +1.36\\text{ V}, \\quad E^\\circ_{\\text{Br}_2/\\text{Br}^-} = +1.09\\text{ V}, \\quad E^\\circ_{\\text{I}_2/\\text{I}^-} = +0.54\\text{ V}",
      "variables": "E^\\circ: \\text{Standard reduction potential (V)}",
      "examTip": "F2 oxidizes all other halide ions to free halogens. Cl2 oxidizes Br^- to Br2 and I^- to I2.",
      "trap": "In gas phase, electron gain enthalpy of Cl is more negative than F, but in aqueous solution, F2 is a vastly stronger oxidizing agent due to hydration enthalpy."
    },
    {
      "name": "Xenon Fluoride Hydrolysis Reactions",
      "formula": "2\\text{XeF}_2 + 2\\text{H}_2\\text{O} \\to 2\\text{Xe} + 4\\text{HF} + \\text{O}_2, \\quad 6\\text{XeF}_4 + 12\\text{H}_2\\text{O} \\to 2\\text{Xe} + 4\\text{XeO}_3 + 24\\text{HF} + 3\\text{O}_2",
      "variables": "\\text{XeF}_6 + 3\\text{H}_2\\text{O} \\to \\text{XeO}_3 + 6\\text{HF} \\text{ (Complete hydrolysis)}",
      "examTip": "Partial hydrolysis of XeF6 yields oxyfluorides: XeF6 + H2O -> XeOF4 + 2HF; XeF6 + 2H2O -> XeO2F2 + 4HF.",
      "trap": "XeF4 disproportionates on hydrolysis into Xe(0) and XeO3(+6), whereas XeF6 does NOT disproportionate (maintains +6 state)."
    }
  ],
  "keyPoints": [
    "Helium has the lowest boiling point of any known substance (4.2 K) and does not freeze under atmospheric pressure.",
    "Argon is used to provide inert atmosphere in high-temperature metallurgical processes (arc welding).",
    "Bleaching action of Cl2 is permanent and due to oxidation (Cl2 + H2O -> HCl + HOCl -> HCl + [O])."
  ]
},
  {
  "id": "chem-12-polymers-classification-synthesis",
  "subject": "Chemistry",
  "classLevel": "12",
  "chapter": "Polymers",
  "topic": "Classification, Addition & Condensation Polymers",
  "weightage": "Medium",
  "examTarget": "Both",
  "concept": "Polymers are high-molecular-weight macromolecules built from repeating monomeric units. Classified by source (natural, synthetic), structure (linear, branched, cross-linked), and molecular forces (elastomers, fibres, thermoplastics, thermosetting).",
  "shortNotes": [
    "Elastomers: Weakest intermolecular forces, vulcanized rubber (sulfur cross-links between chains). Examples: Buna-S, Buna-N, Neoprene.",
    "Fibres: Strong intermolecular forces (hydrogen bonding or dipole-dipole). Examples: Nylon-6,6, Terylene (Dacron).",
    "Thermoplastics: Intermediate forces, soften on heating and harden on cooling repeatedly. Examples: Polythene, Polystyrene, PVC, Teflon.",
    "Thermosetting: Extensive cross-linking, permanently set on heating, cannot be remoulded. Examples: Bakelite (phenol-formaldehyde), Melamine-formaldehyde.",
    "Ziegler-Natta Catalyst: TiCl4 + Al(C2H5)3 used for coordination polymerization to synthesize High-Density Polythene (HDPE) under mild conditions."
  ],
  "formulas": [
    {
      "name": "Monomers of High-Yield Polymers",
      "formula": "\\text{Nylon-6,6: Adipic acid } + \\text{ Hexamethylenediamine}; \\quad \\text{Nylon-6: Caprolactam}",
      "variables": "\\text{Terylene: Terephthalic acid } + \\text{ Ethylene glycol}; \\quad \\text{Bakelite: Phenol } + \\text{ Formaldehyde}",
      "examTip": "Neoprene monomer is Chloroprene (2-chloro-1,3-butadiene). Buna-S = 1,3-Butadiene + Styrene. Buna-N = 1,3-Butadiene + Acrylonitrile.",
      "trap": "Nylon-6 is synthesized from a SINGLE monomer (caprolactam ring-opening), whereas Nylon-6,6 is a copolymer from TWO six-carbon monomers."
    },
    {
      "name": "Number & Weight Average Molar Mass",
      "formula": "\\bar{M}_n = \\frac{\\sum N_i M_i}{\\sum N_i}, \\quad \\bar{M}_w = \\frac{\\sum N_i M_i^2}{\\sum N_i M_i}, \\quad \\text{PDI} = \\frac{\\bar{M}_w}{\\bar{M}_n}",
      "variables": "\\bar{M}_n: \\text{Number-average}, \\bar{M}_w: \\text{Weight-average}, \\text{PDI}: \\text{Polydispersity Index}",
      "examTip": "For natural biopolymers (proteins, DNA), PDI = 1 (monodisperse). For synthetic polymers, PDI > 1.",
      "trap": "Osmotic pressure method determines M_n, while sedimentation/light scattering determines M_w."
    }
  ],
  "keyPoints": [
    "Biodegradable polymers: PHBV (poly beta-hydroxybutyrate-co-beta-hydroxyvalerate) and Nylon-2-nylon-6.",
    "Teflon (PTFE) monomer is tetrafluoroethene (CF2=CF2), thermally stable and chemically inert (non-stick cookware).",
    "Vulcanization introduces sulfur cross-links at double bonds to increase elasticity, tensile strength, and resistance to oxidation."
  ]
},
  {
  "id": "chem-12-everyday-life-drugs-cleansing",
  "subject": "Chemistry",
  "classLevel": "12",
  "chapter": "Chemistry in Everyday Life",
  "topic": "Medicinal Drugs, Food Additives & Soaps/Detergents",
  "weightage": "Medium",
  "examTarget": "Both",
  "concept": "Chemical substances play crucial biological and practical roles in medicine, nutrition preservation, and hygiene through specific molecular interactions and enzyme inhibition.",
  "shortNotes": [
    "Antipyretics: Reduce body temperature in fever (Paracetamol, Aspirin). Aspirin inhibits synthesis of prostaglandins.",
    "Analgesics: Relieve pain without impairing consciousness. Non-narcotic (Aspirin, Paracetamol) vs Narcotic (Morphine, Codeine, Heroin).",
    "Antiseptics vs Disinfectants: Antiseptics applied to living tissues (0.2% phenol, Dettol = chloroxylenol + terpineol, Bithionol in soap, Tincture of iodine = 2-3% I2 in alcohol-water). Disinfectants applied to inanimate objects (1% phenol, 0.2-0.4 ppm Cl2). Phenol can be both based on concentration!",
    "Antibiotics: Bactericidal (Penicillin, Aminoglycosides, Ofloxacin) kill bacteria; Bacteriostatic (Erythromycin, Tetracycline, Chloramphenicol) inhibit bacterial growth.",
    "Artificial Sweeteners: Aspartame (100x sweeter than sucrose, unstable at cooking temp - cold foods only), Saccharin (550x, excreted unchanged), Sucralose (600x, trichloro derivative of sucrose, heat-stable), Alitame (2000x, difficult to control sweetness).",
    "Soaps: Sodium or potassium salts of long-chain fatty acids (stearic, palmitic, oleic). Formed by saponification: Fat/Oil + NaOH -> Soap + Glycerol.",
    "Detergents: Anionic (Sodium lauryl sulfate, cleans well, toothpastes), Cationic (Cetyltrimethylammonium bromide, germicidal, hair conditioners), Non-ionic (Polyethylene glycol stearate, liquid dishwashers)."
  ],
  "formulas": [
    {
      "name": "Saponification Reaction",
      "formula": "\\text{Triglyceride} + 3\\text{NaOH} \\xrightarrow{\\Delta} 3\\text{RCOO}^-\\text{Na}^+ \\text{ (Soap)} + \\text{C}_3\\text{H}_5(\\text{OH})_3 \\text{ (Glycerol)}",
      "variables": "R: \\text{Long hydrocarbon chain (e.g. } \\text{C}_{17}\\text{H}_{35} \\text{ stearate)}",
      "examTip": "Potassium soaps are softer to the skin than sodium soaps and are used as toilet and shaving soaps.",
      "trap": "Soaps do not work in hard water because Ca2+ and Mg2+ precipitate insoluble scum: 2RCOONa + Ca^2+ -> (RCOO)2Ca (s) + 2Na^+."
    },
    {
      "name": "Cleansing Mechanism & Micelle Formation",
      "formula": "\\text{CMC: Critical Micelle Concentration}, \\quad T_K: \\text{Kraft Temperature}",
      "variables": "\\text{CMC: Minimum surfactant concentration for micelle formation}",
      "examTip": "Hydrophobic alkyl tail points inward; hydrophilic polar head points outward into water.",
      "trap": "Micelle formation occurs ONLY above both Kraft temperature (T_K) and Critical Micelle Concentration (CMC)."
    }
  ],
  "keyPoints": [
    "Broad spectrum antibiotics kill or inhibit a wide range of Gram-positive and Gram-negative bacteria (e.g. Chloramphenicol, Ampicillin, Amoxicillin).",
    "Antacids: Magnesium hydroxide (Milk of Magnesia), Ranitidine (Zantac), Cimetidine prevent acid release by histamine-H2 receptor binding.",
    "Tranquilizers treat stress and anxiety: Equanil, Chlordiazepoxide, Meprobamate, Valium."
  ]
}
];
