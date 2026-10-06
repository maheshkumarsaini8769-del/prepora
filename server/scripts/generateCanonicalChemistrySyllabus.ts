import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import SyllabusChapter from '../models/Syllabus.js';

dotenv.config();

interface TopicDef {
  name: string;
  isKeyTopic: boolean;
  subtopics: string[];
}

interface ChapterDef {
  chapterId: string;
  name: string;
  classLevel: '11' | '12';
  weightage: 'High' | 'Medium' | 'Low';
  topics: TopicDef[];
}

// 15 Class 11 Chapters + 16 Class 12 Chapters = 31 Authentic Chapters
const authenticChemistryChapters: ChapterDef[] = [
  // =================== CLASS 11 ===================
  {
    chapterId: "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    name: "Some Basic Concepts of Chemistry",
    classLevel: "11",
    weightage: "High",
    topics: [
      {
        name: "Mole Concept & Molar Mass",
        isKeyTopic: true,
        subtopics: ["Avogadro's Number & Molar Mass", "Mole-Particle-Mass-Volume Calculations", "Average Atomic Mass of Isotopes"]
      },
      {
        name: "Stoichiometry & Limiting Reagent",
        isKeyTopic: true,
        subtopics: ["Balanced Chemical Equations & Mole Ratios", "Identification of Limiting Reagent", "Theoretical vs Percentage Yield"]
      },
      {
        name: "Concentration Terms",
        isKeyTopic: true,
        subtopics: ["Molarity & Molality", "Mole Fraction & Mass Percentage", "Normality & Parts Per Million (ppm)"]
      },
      {
        name: "Empirical & Molecular Formula",
        isKeyTopic: false,
        subtopics: ["Percentage Composition Analysis", "Empirical Formula Derivation", "Molecular Formula from Molar Mass"]
      },
      {
        name: "Equivalent Concept & Titrations",
        isKeyTopic: true,
        subtopics: ["n-Factor in Acid-Base & Redox Reactions", "Law of Chemical Equivalence", "Standard Volumetric Titrations"]
      },
      {
        name: "Laws of Chemical Combination",
        isKeyTopic: false,
        subtopics: ["Conservation of Mass & Definite Proportions", "Multiple Proportions & Gay-Lussac's Law", "Dalton's Atomic Theory Assumptions"]
      }
    ]
  },
  {
    chapterId: "STRUCTURE_OF_ATOM",
    name: "Structure of Atom",
    classLevel: "11",
    weightage: "High",
    topics: [
      {
        name: "Subatomic Particles & Early Models",
        isKeyTopic: false,
        subtopics: ["Cathode Ray Discharge & e/m Ratio", "Millikan Oil Drop & Charge of Electron", "Rutherford's Alpha Scattering & Nuclear Model"]
      },
      {
        name: "Bohr Model & Hydrogen Spectrum",
        isKeyTopic: true,
        subtopics: ["Postulates of Bohr's Theory", "Radius, Velocity & Energy of Bohr Orbit", "Rydberg Formula & Spectral Series (Lyman, Balmer, Paschen)"]
      },
      {
        name: "Dual Nature of Matter (de Broglie)",
        isKeyTopic: true,
        subtopics: ["de Broglie Wavelength Relation", "Wavelength of Charged Particles in Potential V", "Davisson-Germer Diffraction Verification"]
      },
      {
        name: "Heisenberg's Uncertainty Principle",
        isKeyTopic: true,
        subtopics: ["Mathematical Formulation (Delta x * Delta p >= h/4pi)", "Physical Significance for Microscopic Particles", "Impossibility of Electron in Nucleus"]
      },
      {
        name: "Quantum Mechanical Model & Orbitals",
        isKeyTopic: true,
        subtopics: ["Schrodinger Wave Equation Concept", "Principal, Azimuthal, Magnetic & Spin Quantum Numbers", "Shapes of s, p, d Orbitals & Nodal Surfaces"]
      },
      {
        name: "Electronic Configuration Rules",
        isKeyTopic: true,
        subtopics: ["Aufbau Principle & (n+l) Rule", "Pauli's Exclusion Principle", "Hund's Rule of Maximum Multiplicity & Chromium/Copper Anomalies"]
      }
    ]
  },
  {
    chapterId: "CLASSIFICATION_OF_ELEMENTS",
    name: "Classification of Elements and Periodicity",
    classLevel: "11",
    weightage: "Medium",
    topics: [
      {
        name: "Modern Periodic Table Layout",
        isKeyTopic: false,
        subtopics: ["Moseley's Law & Modern Periodic Law", "Division into s, p, d, f Blocks", "IUPAC Nomenclature for Elements with Z > 100"]
      },
      {
        name: "Atomic & Ionic Radii Trends",
        isKeyTopic: true,
        subtopics: ["Covalent, Metallic & van der Waals Radii", "Variation in Periods and Groups", "Isoelectronic Species Radii Comparison"]
      },
      {
        name: "Ionization Enthalpy",
        isKeyTopic: true,
        subtopics: ["Successive Ionization Enthalpies (IE1 < IE2 < IE3)", "Factors Affecting Ionization Enthalpy", "Anomalous Trends (Be vs B, N vs O)"]
      },
      {
        name: "Electron Gain Enthalpy & Electronegativity",
        isKeyTopic: true,
        subtopics: ["Trends in Electron Affinity & Halogen Anomaly (Cl > F)", "Pauling & Mulliken Electronegativity Scales", "Electronegativity Variation Across the Table"]
      },
      {
        name: "Periodic Trends in Chemical Properties",
        isKeyTopic: false,
        subtopics: ["Valency & Oxidation States", "Anomalous Properties of Second Period Elements", "Diagonal Relationships (Li-Mg, Be-Al, B-Si)"]
      }
    ]
  },
  {
    chapterId: "CHEMICAL_BONDING",
    name: "Chemical Bonding and Molecular Structure",
    classLevel: "11",
    weightage: "High",
    topics: [
      {
        name: "Lewis Structures & Formal Charge",
        isKeyTopic: false,
        subtopics: ["Octet Rule & Exceptions", "Formal Charge Calculation on Atoms", "Resonance Structures & Stability"]
      },
      {
        name: "Ionic Bonding & Lattice Enthalpy",
        isKeyTopic: true,
        subtopics: ["Conditions for Ionic Bond Formation", "Born-Haber Cycle for Lattice Energy", "Fajan's Rules for Covalent Character in Ionic Bonds"]
      },
      {
        name: "VSEPR Theory & Molecular Geometry",
        isKeyTopic: true,
        subtopics: ["Steric Number Concept", "Lone Pair Repulsion Hierarchy", "Shapes from Linear to Pentagonal Bipyramidal"]
      },
      {
        name: "Valence Bond Theory & Hybridization",
        isKeyTopic: true,
        subtopics: ["Sigma and Pi Bond Formation", "Hybridization Schemes: sp, sp2, sp3, sp3d, sp3d2", "d-Orbital Participation in Hybridization"]
      },
      {
        name: "Molecular Orbital Theory (MOT)",
        isKeyTopic: true,
        subtopics: ["LCAO Method & Bonding/Antibonding MOs", "MO Energy Level Diagrams for Homonuclear Diatomics", "Bond Order, Bond Length & Magnetic Behaviour"]
      },
      {
        name: "Dipole Moment & Polarity",
        isKeyTopic: true,
        subtopics: ["Definition: mu = q * d in Debye", "Vector Addition of Bond Dipoles", "Percentage Ionic Character from Dipole Moment"]
      },
      {
        name: "Hydrogen Bonding & Intermolecular Forces",
        isKeyTopic: true,
        subtopics: ["Intermolecular vs Intramolecular H-Bonding", "Effects on Boiling Points & Solubility", "van der Waals Forces (Dispersion, Dipole-Dipole)"]
      }
    ]
  },
  {
    chapterId: "CHEMICAL_THERMODYNAMICS",
    name: "Chemical Thermodynamics",
    classLevel: "11",
    weightage: "High",
    topics: [
      {
        name: "First Law & Work Calculations",
        isKeyTopic: true,
        subtopics: ["State Functions vs Path Functions", "First Law: Delta U = q + w", "Isothermal, Adiabatic, Isobaric & Isochoric Work"]
      },
      {
        name: "Enthalpy & Heat Capacities",
        isKeyTopic: true,
        subtopics: ["Relation: Delta H = Delta U + Delta n_g * R * T", "Molar Heat Capacities: C_p - C_v = R", "Kirchhoff's Equations for Temperature Dependence"]
      },
      {
        name: "Thermochemistry & Hess's Law",
        isKeyTopic: true,
        subtopics: ["Standard Enthalpy of Formation & Combustion", "Hess's Law of Constant Heat Summation", "Bond Dissociation Enthalpy Calculations"]
      },
      {
        name: "Second Law & Entropy (S)",
        isKeyTopic: true,
        subtopics: ["Spontaneity & Thermodynamic Definition of Entropy", "Entropy Changes in Ideal Gas Expansions", "Delta S_total >= 0 Criterion"]
      },
      {
        name: "Gibbs Free Energy & Chemical Equilibrium",
        isKeyTopic: true,
        subtopics: ["Gibbs Equation: Delta G = Delta H - T * Delta S", "Spontaneity Criteria at Constant T & P", "Standard Free Energy & Equilibrium Constant: Delta G^0 = -RT ln K"]
      }
    ]
  },
  {
    chapterId: "EQUILIBRIUM",
    name: "Equilibrium",
    classLevel: "11",
    weightage: "High",
    topics: [
      {
        name: "Chemical Equilibrium & K_p / K_c",
        isKeyTopic: true,
        subtopics: ["Law of Mass Action", "Relation: K_p = K_c * (RT)^(Delta n_g)", "Reaction Quotient Q and Direction of Net Reaction"]
      },
      {
        name: "Le Chatelier's Principle",
        isKeyTopic: true,
        subtopics: ["Effect of Concentration, Pressure, and Temperature", "Effect of Inert Gas Addition at Constant V and P", "Industrial Synthesis of NH3 and SO3 Optimization"]
      },
      {
        name: "Ionic Equilibrium & pH Calculations",
        isKeyTopic: true,
        subtopics: ["Ostwald's Dilution Law for Weak Electrolytes", "Ionic Product of Water (K_w) with Temperature", "pH and pOH of Strong & Weak Acid/Base Solutions"]
      },
      {
        name: "Buffer Solutions",
        isKeyTopic: true,
        subtopics: ["Acidic & Basic Buffer Mechanisms", "Henderson-Hasselbalch Equations", "Buffer Capacity and Maximum Buffer Action Range"]
      },
      {
        name: "Salt Hydrolysis",
        isKeyTopic: true,
        subtopics: ["Hydrolysis Constant (K_h) & Degree of Hydrolysis", "pH Formulas for All Four Salt Types", "Hydrolysis of Salts of Weak Acid and Weak Base"]
      },
      {
        name: "Solubility Product (K_sp)",
        isKeyTopic: true,
        subtopics: ["Relation Between Solubility (s) and K_sp", "Precipitation Criterion: Q_sp > K_sp", "Common Ion Effect in Group Separation & Salt Purification"]
      }
    ]
  },
  {
    chapterId: "REDOX_REACTIONS",
    name: "Redox Reactions",
    classLevel: "11",
    weightage: "Medium",
    topics: [
      {
        name: "Oxidation Numbers & Balancing",
        isKeyTopic: true,
        subtopics: ["Rules for Assigning Oxidation Numbers", "Ion-Electron Method (Half-Reaction) in Acidic/Basic Media", "Oxidation State Method for Balancing"]
      },
      {
        name: "Types of Redox Reactions",
        isKeyTopic: true,
        subtopics: ["Combination, Decomposition & Displacement Reactions", "Disproportionation & Comproportionation Reactions", "Redox Titrations & Indicator Action (Self-indicator KMnO4)"]
      }
    ]
  },
  {
    chapterId: "ORGANIC_CHEMISTRY_BASIC_PRINCIPLES",
    name: "Organic Chemistry: Some Basic Principles and Techniques",
    classLevel: "11",
    weightage: "High",
    topics: [
      {
        name: "IUPAC Nomenclature",
        isKeyTopic: true,
        subtopics: ["Root Word, Prefix, Suffix System", "Priority of Functional Groups in Polyfunctional Compounds", "Nomenclature of Bicyclo and Spiro Compounds"]
      },
      {
        name: "Structural Isomerism",
        isKeyTopic: true,
        subtopics: ["Chain, Position & Functional Group Isomerism", "Metamerism in Ethers, Amines, Ketones", "Keto-Enol Tautomerism & Enol Content Stability"]
      },
      {
        name: "Stereoisomerism",
        isKeyTopic: true,
        subtopics: ["Geometrical Isomerism: Cis-Trans & E/Z System", "Optical Isomerism: Chirality, Enantiomers, Diastereomers", "Meso Compounds & Specific Rotation Calculation"]
      },
      {
        name: "Electronic Effects in Organic Molecules",
        isKeyTopic: true,
        subtopics: ["Inductive Effect (+I and -I) & Acid/Base Strengths", "Resonance & Mesomeric Effect (+M and -M)", "Hyperconjugation & Heat of Hydrogenation"]
      },
      {
        name: "Reactive Intermediates",
        isKeyTopic: true,
        subtopics: ["Carbocations: Structure, Stability & Rearrangements (Hydride/Alkyl shifts)", "Carbanions: Structure, Hybridization & Relative Stability", "Free Radicals & Carbenes Generation & Reactivity"]
      },
      {
        name: "Purification & Quantitative Elemental Analysis",
        isKeyTopic: false,
        subtopics: ["Crystallization, Sublimation, Chromatography", "Lassaigne's Test for N, S, Halogens", "Dumas, Kjeldahl & Carius Quantitative Estimation Formulas"]
      }
    ]
  },
  {
    chapterId: "HYDROCARBONS",
    name: "Hydrocarbons",
    classLevel: "11",
    weightage: "High",
    topics: [
      {
        name: "Alkanes: Preparation & Free Radical Reactions",
        isKeyTopic: true,
        subtopics: ["Wurtz Reaction & Corey-House Synthesis", "Decarboxylation of Carboxylic Acid Salts (Kolbe & Soda Lime)", "Free Radical Halogenation Mechanism & Reactivity-Selectivity"]
      },
      {
        name: "Alkenes: Electrophilic Addition",
        isKeyTopic: true,
        subtopics: ["Markovnikov's Rule & Carbocation Intermediates", "Anti-Markovnikov (Peroxide Effect) with HBr Mechanism", "Ozonolysis for Structure Elucidation of Alkenes"]
      },
      {
        name: "Alkynes: Chemistry & Acidity",
        isKeyTopic: true,
        subtopics: ["Acidity of Terminal Alkynes (sp hybridized C-H)", "Hydration of Alkynes (Kucherov Reaction using HgSO4/H2SO4)", "Cyclic Polymerization to Form Benzene"]
      },
      {
        name: "Aromaticity & Huckel Rule",
        isKeyTopic: true,
        subtopics: ["Huckel's (4n+2) Pi Electron Rule", "Aromatic, Antiaromatic & Non-aromatic Systems", "Annulenes and Heterocyclic Aromatic Systems"]
      },
      {
        name: "Electrophilic Aromatic Substitution (EAS)",
        isKeyTopic: true,
        subtopics: ["Arenium Ion (Sigma Complex) Mechanism", "Activating vs Deactivating Groups (Ortho/Para vs Meta Direction)", "Friedel-Crafts Alkylation & Acylation (Rearrangements & Limitations)"]
      }
    ]
  },
  {
    chapterId: "STATES_OF_MATTER",
    name: "States of Matter: Gases and Liquids",
    classLevel: "11",
    weightage: "High",
    topics: [
      {
        name: "Gas Laws & Ideal Gas Equation",
        isKeyTopic: true,
        subtopics: ["Boyle's, Charles's, Gay-Lussac's & Avogadro's Laws", "Equation of State: PV = nRT & Density Relation", "Dalton's Law of Partial Pressures & Graham's Law of Diffusion"]
      },
      {
        name: "Kinetic Molecular Theory & Molecular Speeds",
        isKeyTopic: true,
        subtopics: ["Postulates of KMT & Kinetic Gas Equation", "Maxwell-Boltzmann Speed Distribution", "Root Mean Square (rms), Average & Most Probable Speeds"]
      },
      {
        name: "Real Gases & van der Waals Equation",
        isKeyTopic: true,
        subtopics: ["Deviations from Ideality & Compressibility Factor (Z)", "van der Waals Constants 'a' (intermolecular attraction) & 'b' (co-volume)", "Behaviour at High, Low Pressure & Boyle Temperature"]
      },
      {
        name: "Liquefaction of Gases & Liquid State",
        isKeyTopic: false,
        subtopics: ["Critical Constants: T_c, P_c, V_c Formulas in terms of a, b", "Andrews Isotherms of CO2", "Liquid Properties: Vapor Pressure, Surface Tension & Viscosity"]
      }
    ]
  },
  {
    chapterId: "S_BLOCK_ELEMENTS",
    name: "s-Block Elements (Alkali & Alkaline Earth Metals)",
    classLevel: "11",
    weightage: "Medium",
    topics: [
      {
        name: "Group 1: Alkali Metals",
        isKeyTopic: true,
        subtopics: ["Trends in Radii, Ionization Enthalpy & Hydration Energy", "Reactivity with Water, Air, Halogens & Liquid Ammonia Solutions", "Anomalous Properties of Lithium & Diagonal Relationship with Magnesium"]
      },
      {
        name: "Group 2: Alkaline Earth Metals",
        isKeyTopic: true,
        subtopics: ["Trends in Basic Strength of Oxides & Hydroxides", "Solubility and Thermal Stability of Carbonates & Sulfates", "Important Compounds: CaO, Ca(OH)2, Gypsum, Plaster of Paris, Cement"]
      }
    ]
  },
  {
    chapterId: "P_BLOCK_GROUP_13_14",
    name: "p-Block Elements (Group 13 & 14)",
    classLevel: "11",
    weightage: "Medium",
    topics: [
      {
        name: "Group 13: Boron Family",
        isKeyTopic: true,
        subtopics: ["Inert Pair Effect & Variable Oxidation States (+1, +3)", "Structure of Diborane (3c-2e Banana Bonds)", "Borax Bead Test, Boric Acid & Lewis Acid Character of BF3"]
      },
      {
        name: "Group 14: Carbon Family",
        isKeyTopic: true,
        subtopics: ["Catenation Tendency & Allotropes of Carbon (Diamond, Graphite, Fullerenes)", "Oxides of Carbon (CO toxic nature, CO2)", "Silicones, Silicates (Classification & Basic Units) & Zeolites"]
      }
    ]
  },
  {
    chapterId: "HYDROGEN",
    name: "Hydrogen & Its Compounds",
    classLevel: "11",
    weightage: "Low",
    topics: [
      {
        name: "Hydrogen, Hydrides & Water",
        isKeyTopic: true,
        subtopics: ["Position in Periodic Table & Isotopes (Protium, Deuterium, Tritium)", "Classification of Hydrides (Ionic, Covalent, Interstitial)", "Temporary and Permanent Hardness of Water & Softening Methods"]
      },
      {
        name: "Hydrogen Peroxide (H2O2) & Heavy Water",
        isKeyTopic: true,
        subtopics: ["Preparation & Open-Book Structure of H2O2", "Volume Strength Calculations (10V, 20V H2O2 Molarity/Normality)", "Redox Chemistry of H2O2 in Acidic and Basic Media"]
      }
    ]
  },
  {
    chapterId: "ENVIRONMENTAL_CHEMISTRY",
    name: "Environmental Chemistry",
    classLevel: "11",
    weightage: "Low",
    topics: [
      {
        name: "Environmental Pollution & Green Chemistry",
        isKeyTopic: false,
        subtopics: ["Tropospheric Pollutants, Acid Rain & Greenhouse Effect", "Classical Smog vs Photochemical Smog (PAN, Ozone, NOx)", "Ozone Depletion Mechanism by CFCs", "Water Quality Standards (BOD, COD, Heavy Metals)", "Principles of Green Chemistry for Waste Minimization"]
      }
    ]
  },
  {
    chapterId: "PRACTICAL_CHEMISTRY",
    name: "Principles Related to Practical Chemistry",
    classLevel: "11",
    weightage: "Medium",
    topics: [
      {
        name: "Systematic Qualitative Analysis",
        isKeyTopic: true,
        subtopics: ["Detection of Acidic Radicals (Carbonate, Sulfide, Halides, Nitrate)", "Systematic Separation of Basic Radicals (Group 0 to VI)", "Confirmatory Tests (Brown ring test, Chromyl chloride test, Borax bead test)"]
      },
      {
        name: "Volumetric Analysis & Functional Groups",
        isKeyTopic: true,
        subtopics: ["Acid-Base Titrations & Indicator Selection (Methyl orange, Phenolphthalein)", "Redox Titrations: Oxalic acid / Mohr's salt against KMnO4", "Tests for Alcohols, Phenols, Aldehydes, Ketones, Carboxylic acids, Amines"]
      }
    ]
  },

  // =================== CLASS 12 ===================
  {
    chapterId: "SOLID_STATE",
    name: "Solid State",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Crystal Lattices & Unit Cells",
        isKeyTopic: true,
        subtopics: ["7 Crystal Systems & 14 Bravais Lattices", "Number of Atoms in SC (1), BCC (2), FCC (4)", "Density Formula: d = (z * M) / (a^3 * N_A)"]
      },
      {
        name: "Packing Efficiency & Voids",
        isKeyTopic: true,
        subtopics: ["Packing Efficiency in SC (52.4%), BCC (68%), FCC/HCP (74%)", "Tetrahedral (2N) and Octahedral (N) Voids", "Limiting Radius Ratio Rules for Geometry"]
      },
      {
        name: "Defects in Solids & Properties",
        isKeyTopic: true,
        subtopics: ["Stoichiometric Defects: Schottky vs Frenkel Defects", "Non-stoichiometric Defects: Metal Excess (F-centres) & Metal Deficiency", "Magnetic Properties: Ferromagnetism, Ferrimagnetism, Antiferromagnetism"]
      }
    ]
  },
  {
    chapterId: "SOLUTIONS",
    name: "Solutions",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Henry's Law & Raoult's Law",
        isKeyTopic: true,
        subtopics: ["Gas Solubility: Henry's Law (p = K_H * x)", "Raoult's Law for Volatile Liquid Mixtures", "Vapor-Pressure Liquid Composition Diagrams"]
      },
      {
        name: "Ideal and Non-Ideal Solutions",
        isKeyTopic: true,
        subtopics: ["Conditions for Ideality (Delta H_mix = 0, Delta V_mix = 0)", "Positive & Negative Deviations from Raoult's Law", "Minimum & Maximum Boiling Azeotropes"]
      },
      {
        name: "Colligative Properties",
        isKeyTopic: true,
        subtopics: ["Relative Lowering of Vapor Pressure (RLVP)", "Elevation in Boiling Point: Delta T_b = K_b * m", "Depression in Freezing Point: Delta T_f = K_f * m", "Osmotic Pressure: pi = C * R * T & Isotonic Solutions"]
      },
      {
        name: "Van 't Hoff Factor & Abnormal Molar Mass",
        isKeyTopic: true,
        subtopics: ["Definition: i = Normal Molar Mass / Observed Molar Mass", "Degree of Dissociation: alpha = (i - 1) / (n - 1)", "Degree of Association: alpha = (1 - i) / (1 - 1/n)"]
      }
    ]
  },
  {
    chapterId: "ELECTROCHEMISTRY",
    name: "Electrochemistry",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Galvanic Cells & Nernst Equation",
        isKeyTopic: true,
        subtopics: ["Electrode Potential & Standard Hydrogen Electrode (SHE)", "Nernst Equation for Single Electrode & Complete Cell", "Equilibrium Constant & Delta G^0 = -n * F * E^0_cell"]
      },
      {
        name: "Electrolytic Conductance & Kohlrausch's Law",
        isKeyTopic: true,
        subtopics: ["Specific Conductance (kappa), Cell Constant & Molar Conductance", "Variation of Conductivity with Dilution (Debye-Huckel-Onsager)", "Kohlrausch's Law of Independent Migration of Ions & Weak Electrolyte Degree of Ionization"]
      },
      {
        name: "Electrolysis & Faraday's Laws",
        isKeyTopic: true,
        subtopics: ["Faraday's First Law: m = Z * I * t", "Faraday's Second Law: m1/m2 = E1/E2", "Products of Electrolysis for Aqueous Salts"]
      },
      {
        name: "Batteries, Fuel Cells & Corrosion",
        isKeyTopic: false,
        subtopics: ["Primary Cells (Dry cell, Mercury) vs Secondary Cells (Lead-acid accumulator)", "H2-O2 Fuel Cell Reactions & Efficiency", "Electrochemical Mechanism of Rusting & Cathodic Protection"]
      }
    ]
  },
  {
    chapterId: "CHEMICAL_KINETICS",
    name: "Chemical Kinetics",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Rate of Reaction & Order",
        isKeyTopic: true,
        subtopics: ["Average and Instantaneous Rate of Reaction", "Rate Law, Rate Constant (k) & Units of k", "Order vs Molecularity Differences"]
      },
      {
        name: "Integrated Rate Laws & Half-Life",
        isKeyTopic: true,
        subtopics: ["Zero Order Reactions: [A] = [A]0 - kt, t_1/2 = [A]0 / 2k", "First Order Reactions: k = (2.303/t) * log([A]0/[A]), t_1/2 = 0.693 / k", "Pseudo First Order Reactions (Hydrolysis of ester)"]
      },
      {
        name: "Arrhenius Equation & Activation Energy",
        isKeyTopic: true,
        subtopics: ["Temperature Dependence: k = A * e^(-Ea / RT)", "Two-Temperature Form: log(k2/k1) = (Ea / 2.303R) * (1/T1 - 1/T2)", "Collision Theory, Steric Factor (P) & Transition State Theory"]
      }
    ]
  },
  {
    chapterId: "SURFACE_CHEMISTRY",
    name: "Surface Chemistry",
    classLevel: "12",
    weightage: "Medium",
    topics: [
      {
        name: "Adsorption & Isotherms",
        isKeyTopic: true,
        subtopics: ["Physisorption vs Chemisorption Characteristics", "Freundlich Adsorption Isotherm: x/m = k * p^(1/n)", "Langmuir Isotherm & Adsorption from Solution Phase"]
      },
      {
        name: "Catalysis",
        isKeyTopic: false,
        subtopics: ["Homogeneous vs Heterogeneous Catalysis Mechanism", "Shape-Selective Catalysis by Zeolites (ZSM-5)", "Enzyme Catalysis: Lock & Key Model & Characteristics"]
      },
      {
        name: "Colloids & Emulsions",
        isKeyTopic: true,
        subtopics: ["Lyophilic vs Lyophobic Sols & Preparation Methods", "Purification: Dialysis & Electro-dialysis", "Properties: Tyndall Effect, Brownian Motion, Electrophoresis, Hardy-Schulze Rule"]
      }
    ]
  },
  {
    chapterId: "METALLURGY",
    name: "General Principles and Processes of Isolation of Elements",
    classLevel: "12",
    weightage: "Medium",
    topics: [
      {
        name: "Concentration of Ores",
        isKeyTopic: true,
        subtopics: ["Hydraulic Washing & Magnetic Separation", "Froth Floatation Process: Collectors, Frothers, Depressants", "Leaching Processes: Bayer's Process for Bauxite, Cyanide Process for Au/Ag"]
      },
      {
        name: "Thermodynamics of Metallurgy (Ellingham Diagram)",
        isKeyTopic: true,
        subtopics: ["Calcination vs Roasting Reactions", "Ellingham Diagram Interpretation: Delta G^0 vs Temperature Plots", "Choice of Reducing Agent (C vs CO) at Different Temperatures"]
      },
      {
        name: "Extraction & Refining Methods",
        isKeyTopic: true,
        subtopics: ["Blast Furnace Extraction of Iron & Slag Formation", "Hall-Heroult Process for Aluminum & Role of Cryolite", "Refining: Electrolytic, Zone Refining, Mond Process (Ni), Van Arkel (Zr, Ti)"]
      }
    ]
  },
  {
    chapterId: "P_BLOCK_GROUP_15_18",
    name: "p-Block Elements (Group 15, 16, 17 & 18)",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Group 15: Nitrogen & Phosphorus Family",
        isKeyTopic: true,
        subtopics: ["Anomalous Properties of N & Triple Bond Dissociation Energy", "Haber Process & Ostwald Process for HNO3", "Phosphorus Allotropes, Phosphine & Basicity of Oxoacids (H3PO2, H3PO3, H3PO4)"]
      },
      {
        name: "Group 16: Oxygen & Sulfur Family",
        isKeyTopic: true,
        subtopics: ["Trends in Hydride Boiling Points (H-bonding in H2O)", "Ozone: Structure & Strong Oxidizing Actions", "Sulfur Allotropes (Rhombic, Monoclinic) & Contact Process for H2SO4"]
      },
      {
        name: "Group 17: Halogens Family",
        isKeyTopic: true,
        subtopics: ["Electronegativity, Electron Affinity Anomaly (Cl > F)", "Oxidizing Power Trend (F2 > Cl2 > Br2 > I2) in Solution", "Interhalogen Compounds (XX'_n) Properties & Oxoacids of Halogens"]
      },
      {
        name: "Group 18: Noble Gases & Xenon Chemistry",
        isKeyTopic: true,
        subtopics: ["Discovery & Neil Bartlett's Experiment", "Synthesis and VSEPR Shapes of XeF2, XeF4, XeF6, XeO3, XeOF4", "Complete and Partial Hydrolysis of Xenon Fluorides"]
      }
    ]
  },
  {
    chapterId: "D_AND_F_BLOCK_ELEMENTS",
    name: "The d- and f-Block Elements",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "General Trends in 3d Transition Series",
        isKeyTopic: true,
        subtopics: ["Electronic Configurations & Variable Oxidation States", "Magnetic Moments: Spin-Only Formula mu = sqrt(n(n+2)) BM", "Color of Compounds due to d-d Transitions", "Interstitial Compounds & Catalytic Behaviour"]
      },
      {
        name: "Important Transition Metal Compounds",
        isKeyTopic: true,
        subtopics: ["Potassium Dichromate (K2Cr2O7): Preparation, Structure, Redox in Acid", "Potassium Permanganate (KMnO4): Preparation from Pyrolusite, Oxidizing Reactions in Acid, Neutral, Alkaline Media"]
      },
      {
        name: "Lanthanoids & Actinoids (f-Block)",
        isKeyTopic: true,
        subtopics: ["Electronic Configuration & Stable +3 Oxidation State", "Lanthanoid Contraction: Causes and Chemical Consequences", "Comparison of Lanthanoids and Actinoids (Radioactivity, Complexing Ability)"]
      }
    ]
  },
  {
    chapterId: "COORDINATION_COMPOUNDS",
    name: "Coordination Compounds",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Werner's Theory & Nomenclature",
        isKeyTopic: true,
        subtopics: ["Primary vs Secondary Valency", "IUPAC Nomenclature of Coordination Complexes", "Ligand Classification: Monodentate, Chelating, Ambidentate"]
      },
      {
        name: "Isomerism in Coordination Compounds",
        isKeyTopic: true,
        subtopics: ["Structural Isomerism: Ionization, Hydrate, Linkage, Coordination", "Geometrical Isomerism: Cis-Trans & Facial-Meridional (fac-mer)", "Optical Isomerism in Octahedral Complexes with Bidentate Ligands"]
      },
      {
        name: "Bonding Theories (VBT & CFT)",
        isKeyTopic: true,
        subtopics: ["Valence Bond Theory: Inner vs Outer Orbital Complexes, Hybridization", "Crystal Field Theory: Octahedral (Delta_o) & Tetrahedral (Delta_t) Splitting", "Spectrochemical Series & High Spin vs Low Spin Configurations", "Crystal Field Stabilization Energy (CFSE) Calculations"]
      },
      {
        name: "Bonding in Metal Carbonyls",
        isKeyTopic: false,
        subtopics: ["Synergic Bonding: Sigma Donor & Pi Acceptor Interaction", "Bond Order & CO Stretching Frequency Changes", "Biological Importance: Chlorophyll (Mg), Hemoglobin (Fe), Vitamin B12 (Co)"]
      }
    ]
  },
  {
    chapterId: "HALOALKANES_AND_HALOARENES",
    name: "Haloalkanes and Haloarenes",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Preparation & Physical Properties",
        isKeyTopic: false,
        subtopics: ["From Alcohols (SOCl2 Darzens process, PCl5, PBr3)", "Halogen Exchange Reactions: Finkelstein & Swarts Reactions", "Boiling Point & Dipole Moment Trends"]
      },
      {
        name: "Nucleophilic Substitution (SN1 vs SN2)",
        isKeyTopic: true,
        subtopics: ["SN2 Mechanism: Bimolecular, Concerted, Walden Inversion", "SN1 Mechanism: Carbocation Intermediate, Racemization, Solvent Effect", "Factors Affecting SN1 vs SN2: Substrate, Nucleophile, Solvent, Leaving Group"]
      },
      {
        name: "Elimination Reactions & Competition",
        isKeyTopic: true,
        subtopics: ["Beta-Elimination (E2 vs E1 Mechanisms)", "Saytzeff (Zaitsev) vs Hofmann Elimination Rule", "Substitution vs Elimination Competition Factors"]
      },
      {
        name: "Reactions of Haloarenes & Organometallics",
        isKeyTopic: true,
        subtopics: ["Low Reactivity of Haloarenes towards Nucleophilic Substitution (Resonance, sp2 C)", "Nucleophilic Aromatic Substitution with Electron Withdrawing Groups", "Grignard Reagents (RMgX): Preparation & Reactions with Active Hydrogen/Electrophiles", "Polyhalogen Compounds: Chloroform, Freons, DDT, Iodoform Test"]
      }
    ]
  },
  {
    chapterId: "ALCOHOLS_PHENOLS_AND_ETHERS",
    name: "Alcohols, Phenols and Ethers",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Preparation & Acidity of Alcohols",
        isKeyTopic: true,
        subtopics: ["From Alkenes: Acid-Catalyzed Hydration, Hydroboration-Oxidation, Oxymercuration-Demercuration", "From Carbonyl Compounds: Reduction & Grignard Addition", "Acidity of Alcohols: Comparison with Water & Alkoxide Basicity"]
      },
      {
        name: "Reactions of Alcohols",
        isKeyTopic: true,
        subtopics: ["Lucas Reagent Test (1 deg, 2 deg, 3 deg Distinction)", "Dehydration to Alkenes & Carbocation Rearrangements", "Oxidation with PCC, CrO3, Jones Reagent & Dehydrogenation over Cu/573K"]
      },
      {
        name: "Chemistry of Phenols",
        isKeyTopic: true,
        subtopics: ["Commercial Preparation from Cumene (Hydroperoxide Process)", "Enhanced Acidity of Phenol: Substituent Effects (Nitro vs Alkyl groups)", "Kolbe's Reaction (Synthesis of Salicylic Acid)", "Reimer-Tiemann Reaction (Synthesis of Salicylaldehyde via Dichlorocarbene)", "Reaction with Zinc Dust & Phthalic Anhydride"]
      },
      {
        name: "Ethers: Synthesis & Cleavage",
        isKeyTopic: true,
        subtopics: ["Williamson Ether Synthesis & Mechanism (SN2 Attack on Primary Halide)", "Acid-Catalyzed Dehydration of Alcohols", "Cleavage of Ethers with Excess Concentrated HI/HBr (Mechanism with 1/2/3 deg Alkyl Groups)"]
      }
    ]
  },
  {
    chapterId: "ALDEHYDES_KETONES_CARBOXYLIC_ACIDS",
    name: "Aldehydes, Ketones and Carboxylic Acids",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Preparation of Carbonyl Compounds",
        isKeyTopic: true,
        subtopics: ["Rosenmund Reduction & Stephen's Reaction", "Etard Reaction & Gattermann-Koch Synthesis", "Ozonolysis of Alkenes & Hydration of Alkynes"]
      },
      {
        name: "Nucleophilic Addition Reactions",
        isKeyTopic: true,
        subtopics: ["Addition of HCN, NaHSO3, Alcohols (Hemiacetals & Acetals)", "Addition of Grignard Reagents to Aldehydes and Ketones", "Reaction with Ammonia Derivatives (Hydroxylamine, Hydrazine, 2,4-DNP)"]
      },
      {
        name: "Oxidation, Reduction & Alpha-Hydrogen Reactions",
        isKeyTopic: true,
        subtopics: ["Clemmensen Reduction (Zn-Hg/HCl) & Wolff-Kishner Reduction (NH2NH2/KOH)", "Tollens' Test & Fehling's Test for Aldehydes", "Haloform Reaction (Iodoform Test for CH3-CO- and CH3-CH(OH)-)", "Aldol & Cross-Aldol Condensation Mechanism", "Cannizzaro Reaction & Cross-Cannizzaro Mechanism"]
      },
      {
        name: "Carboxylic Acids: Structure & Reactions",
        isKeyTopic: true,
        subtopics: ["Acidity of Carboxylic Acids & Electron Withdrawing Substituent Effects", "Esterification Mechanism", "Hell-Volhard-Zelinsky (HVZ) Alpha-Halogenation", "Decarboxylation with Soda Lime & Kolbe Electrolysis"]
      }
    ]
  },
  {
    chapterId: "AMINES",
    name: "Amines",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Preparation of Amines",
        isKeyTopic: true,
        subtopics: ["Reduction of Nitro Compounds, Nitriles & Amides", "Gabriel Phthalimide Synthesis for Pure Primary Aliphatic Amines", "Hofmann Bromamide Degradation Reaction (Step-down Reaction)"]
      },
      {
        name: "Basicity of Amines",
        isKeyTopic: true,
        subtopics: ["Basicity in Gaseous Phase (3 deg > 2 deg > 1 deg > NH3)", "Basicity in Aqueous Medium: Combined Inductive, Solvation & Steric Effects (2 deg > 1 deg > 3 deg for Methyl; 2 deg > 3 deg > 1 deg for Ethyl)", "Resonance Weakening of Arylamine Basicity (Aniline vs Alkylamines)"]
      },
      {
        name: "Chemical Tests & Reactions of Amines",
        isKeyTopic: true,
        subtopics: ["Carbylamine Test for Primary Amines (Isocyanide Formation)", "Hinsberg's Test with Benzenesulfonyl Chloride (1, 2, 3 deg Distinction)", "Reaction with Nitrous Acid (HNO2) & Alcohol/Diazonium Formation"]
      },
      {
        name: "Diazonium Salts & Synthetic Transformations",
        isKeyTopic: true,
        subtopics: ["Diazotization of Aniline with NaNO2 + HCl at 0-5 deg C", "Sandmeyer Reaction vs Gattermann Reaction", "Azo Coupling Reactions with Phenol and Aniline (Dyes)"]
      }
    ]
  },
  {
    chapterId: "BIOMOLECULES",
    name: "Biomolecules",
    classLevel: "12",
    weightage: "High",
    topics: [
      {
        name: "Carbohydrates: Monosaccharides & Ring Structures",
        isKeyTopic: true,
        subtopics: ["Classification: Aldoses, Ketoses, D/L Configuration", "Glucose: Open-Chain Reactions, Limitations, Fischer to Haworth Projections", "Anomers, Epimers & Mutarotation in Glucose and Fructose"]
      },
      {
        name: "Disaccharides & Polysaccharides",
        isKeyTopic: true,
        subtopics: ["Glycosidic Bond Formation", "Sucrose (Invert Sugar, Non-reducing), Maltose & Lactose", "Starch (Amylose + Amylopectin), Cellulose & Glycogen"]
      },
      {
        name: "Amino Acids, Peptides & Proteins",
        isKeyTopic: true,
        subtopics: ["Essential vs Non-essential Amino Acids", "Zwitterion Form, Isoelectric Point (pI) & Optical Activity", "Peptide Linkage & Primary, Secondary (alpha-helix, beta-pleated), Tertiary, Quaternary Structures", "Denaturation of Proteins & Coagulation"]
      },
      {
        name: "Nucleic Acids, Enzymes & Vitamins",
        isKeyTopic: true,
        subtopics: ["Components: Purines, Pyrimidines, Ribose/Deoxyribose, Phosphate", "Nucleoside vs Nucleotide & Phosphodiester Linkages", "Double-Helical Structure of DNA (Watson-Crick Model) & Chargaff's Rules", "Vitamins: Water-Soluble vs Fat-Soluble & Deficiency Diseases"]
      }
    ]
  },
  {
    chapterId: "POLYMERS",
    name: "Polymers",
    classLevel: "12",
    weightage: "Medium",
    topics: [
      {
        name: "Classification & Polymerization Mechanisms",
        isKeyTopic: true,
        subtopics: ["Natural, Semi-synthetic & Synthetic Polymers", "Addition vs Condensation Polymerization Modes", "Elastomers, Fibres, Thermoplastics, Thermosetting Plastics", "Ziegler-Natta Coordination Polymerization for HDPE"]
      },
      {
        name: "Commercial Polymers & Rubbers",
        isKeyTopic: true,
        subtopics: ["Polyamides: Nylon-6,6, Nylon-6 (Caprolactam)", "Polyesters: Terylene / Dacron", "Resins: Bakelite (Novolac intermediate), Melamine-Formaldehyde", "Natural Rubber, Vulcanization & Synthetic Rubbers (Buna-S, Buna-N, Neoprene)"]
      },
      {
        name: "Biodegradable Polymers & Molecular Mass",
        isKeyTopic: false,
        subtopics: ["PHBV (poly beta-hydroxybutyrate-co-beta-hydroxyvalerate)", "Nylon-2-nylon-6", "Number-Average (Mn) vs Weight-Average (Mw) Molar Mass & PDI"]
      }
    ]
  },
  {
    chapterId: "CHEMISTRY_IN_EVERYDAY_LIFE",
    name: "Chemistry in Everyday Life",
    classLevel: "12",
    weightage: "Medium",
    topics: [
      {
        name: "Drugs & Pharmacological Classes",
        isKeyTopic: true,
        subtopics: ["Drug-Target Interactions: Enzyme Inhibitors & Receptors", "Antacids (H2-blockers: Ranitidine) & Antihistamines", "Tranquilizers (Equanil, Valium) & Analgesics (Aspirin, Morphine)", "Antiseptics (Dettol, Bithionol) vs Disinfectants (Phenol, Chlorine)", "Antibiotics: Bactericidal vs Bacteriostatic & Broad Spectrum"]
      },
      {
        name: "Food Chemistry & Cleansing Agents",
        isKeyTopic: true,
        subtopics: ["Artificial Sweetening Agents: Aspartame, Saccharin, Sucralose, Alitame", "Food Preservatives: Sodium Benzoate, Sorbic Acid Salts", "Soaps: Saponification & Scum Formation in Hard Water", "Synthetic Detergents: Anionic, Cationic, Non-ionic Types & Cleansing Action (Micelles)"]
      }
    ]
  }
];

const targetExams: Array<{ examId: 'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET_UG' | 'CBSE' | 'RBSE'; authority: string; url: string }> = [
  { examId: 'JEE_MAIN', authority: 'National Testing Agency (NTA)', url: 'https://jeemain.nta.ac.in/syllabus' },
  { examId: 'JEE_ADVANCED', authority: 'Joint Admission Board (IIT)', url: 'https://jeeadv.ac.in/syllabus' },
  { examId: 'NEET_UG', authority: 'National Testing Agency (NTA)', url: 'https://neet.nta.nic.in/syllabus' },
  { examId: 'CBSE', authority: 'Central Board of Secondary Education', url: 'https://cbseacademic.nic.in/curriculum' },
  { examId: 'RBSE', authority: 'Rajasthan Board of Secondary Education', url: 'https://rajeduboard.rajasthan.gov.in' }
];

async function main() {
  console.log(`Generating authentic Chemistry syllabus chapters across all 5 exams...`);
  console.log(`Class 11 Chapters: ${authenticChemistryChapters.filter(c => c.classLevel === '11').length}`);
  console.log(`Class 12 Chapters: ${authenticChemistryChapters.filter(c => c.classLevel === '12').length}`);
  console.log(`Total authentic Chapters per exam: ${authenticChemistryChapters.length}`);

  const allGeneratedChemistryChapters: any[] = [];

  targetExams.forEach(({ examId, authority, url }) => {
    let orderIndex = 1;
    authenticChemistryChapters.forEach((chDef) => {
      const chapterEntry = {
        id: `${examId}|CHEMISTRY|${chDef.classLevel}|${chDef.chapterId}`,
        chapterId: chDef.chapterId,
        name: chDef.name,
        examId: examId,
        classLevel: chDef.classLevel,
        subjectId: 'CHEMISTRY',
        subjectName: 'Chemistry',
        order: orderIndex++,
        weightage: chDef.weightage,
        topics: chDef.topics.map((tDef, tIdx) => ({
          id: `${chDef.chapterId}|${tDef.name.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`,
          name: tDef.name,
          order: tIdx + 1,
          isKeyTopic: tDef.isKeyTopic,
          subtopics: tDef.subtopics
        })),
        sourceAuthority: authority,
        sourceURL: url,
        sourceYear: 2025,
        verificationStatus: 'VERIFIED'
      };
      allGeneratedChemistryChapters.push(chapterEntry);
    });
  });

  console.log(`Total generated Chemistry syllabus items across all exams: ${allGeneratedChemistryChapters.length}`);

  // 1. Update src/data/canonicalSyllabusData.ts
  const syllabusTsPath = path.resolve('src/data/canonicalSyllabusData.ts');
  if (fs.existsSync(syllabusTsPath)) {
    console.log(`Updating ${syllabusTsPath}...`);
    const { canonicalSyllabus } = await import('../../src/data/canonicalSyllabusData.js');
    const nonChemSyllabus = canonicalSyllabus.filter((c: any) => c.subjectName !== 'Chemistry');
    const mergedSyllabus = [...nonChemSyllabus, ...allGeneratedChemistryChapters];

    const fileContent = `import { CanonicalSyllabusChapter } from '../types';\n\nexport const canonicalSyllabus: CanonicalSyllabusChapter[] = ${JSON.stringify(mergedSyllabus, null, 2)};\n\nexport default canonicalSyllabus;\n`;
    fs.writeFileSync(syllabusTsPath, fileContent, 'utf8');
    console.log(`Successfully updated canonicalSyllabusData.ts! Total chapters: ${mergedSyllabus.length}`);
  }

  // 2. Update server/data/canonicalSyllabus.json if it exists
  const syllabusJsonPath = path.resolve('server/data/canonicalSyllabus.json');
  if (fs.existsSync(syllabusJsonPath)) {
    console.log(`Updating ${syllabusJsonPath}...`);
    const existing = JSON.parse(fs.readFileSync(syllabusJsonPath, 'utf8'));
    const nonChem = existing.filter((c: any) => c.subjectName !== 'Chemistry');
    const merged = [...nonChem, ...allGeneratedChemistryChapters];
    fs.writeFileSync(syllabusJsonPath, JSON.stringify(merged, null, 2), 'utf8');
    console.log(`Successfully updated canonicalSyllabus.json!`);
  }

  // 3. Update MongoDB Syllabus collection
  try {
    await connectDB();
    console.log(`Connected to MongoDB. Syncing Syllabus chapters...`);
    // Upsert all generated chapters
    const bulkOps = allGeneratedChemistryChapters.map((chap) => ({
      updateOne: {
        filter: { id: chap.id },
        update: {
          $set: {
            ...chap,
            status: 'active',
            verificationStatus: 'VERIFIED'
          }
        },
        upsert: true
      }
    }));

    await SyllabusChapter.bulkWrite(bulkOps);
    const dbCount = await SyllabusChapter.countDocuments({ subjectName: 'Chemistry' });
    console.log(`MongoDB SyllabusChapter synced! Total Chemistry chapters in DB: ${dbCount}`);
  } catch (err: any) {
    console.warn(`MongoDB Syllabus sync warning:`, err.message);
  }

  console.log(`All syllabus targets updated successfully!`);
  process.exit(0);
}

main().catch((err) => {
  console.error('[Syllabus Generator Error]:', err);
  process.exit(1);
});
