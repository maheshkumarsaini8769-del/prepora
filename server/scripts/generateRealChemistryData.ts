import fs from 'fs';
import path from 'path';

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

export const chemistryCurriculum: TopicRevisionItem[] = [
  // =========================================================================
  // CLASS 11: CHAPTER 1 - SOME BASIC CONCEPTS OF CHEMISTRY
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
      "Moles n = Given Mass (w) / Molar Mass (M) = Volume of gas at STP (L) / 22.4 L = Number of particles / NA.",
      "At STP (0°C, 1 bar), molar volume of an ideal gas is 22.7 L; at old STP (0°C, 1 atm), it is 22.4 L.",
      "Gram atomic mass is the mass of 1 mole of atoms in grams."
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
      "Vapour Density (VD) is measured relative to hydrogen gas: Molar Mass = 2 × Vapour Density.",
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
  // CLASS 11: CHAPTER 2 - STRUCTURE OF ATOM
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
        trap: "Macroscopic bodies have undetectably tiny de Broglie wavelengths due to very large mass in denominator (10⁻³⁴ / 0.1 kg ≈ 10⁻³³ m)."
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
      "Hund's Rule of Maximum Multiplicity: Pairing of electrons in degenerate orbitals occurs only after each orbital holds one electron with parallel spin."
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
        trap: "Chromium (Cr, Z=24): [Ar] 3d⁵ 4s¹ has 6 unpaired electrons (5 in 3d + 1 in 4s), so μ = √(6×8) = 6.93 BM!"
      }
    ],
    keyPoints: [
      "Anomalous electronic configurations of Cr ([Ar] 3d⁵ 4s¹) and Cu ([Ar] 3d¹⁰ 4s¹) are due to exchange energy and symmetry of half-filled/fully-filled subshells.",
      "Radial probability distribution function 4πr²R²(r) gives probability of finding electron at distance r from nucleus."
    ]
  }
];

async function run() {
  console.log(`Starting real chemistry curriculum generator...`);
  console.log(`Loaded ${chemistryCurriculum.length} curated high-yield Chemistry modules.`);

  const outputPath = path.resolve('server/data/realChemistryData.json');
  fs.writeFileSync(outputPath, JSON.stringify(chemistryCurriculum, null, 2), 'utf8');
  console.log(`Wrote initial batch to ${outputPath}`);
}

run();
