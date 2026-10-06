import fs from 'fs';
import path from 'path';

const batch2Modules: any[] = [
  // =========================================================================
  // CLASS 11 - CHAPTER 7: REDOX REACTIONS
  // =========================================================================
  {
    id: "chem-11-red-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Redox Reactions",
    topic: "Oxidation Numbers & Rules for Assignment",
    weightage: "High",
    examTarget: "Both",
    concept: "Oxidation is loss of electrons or increase in oxidation state; Reduction is gain of electrons or decrease in oxidation state.",
    shortNotes: [
      "Oxidation number (O.N.) in elemental form is zero (O₂, P₄, S₈, Cl₂, Na).",
      "Fluorine always has O.N. = -1 in all compounds.",
      "Oxygen is usually -2, EXCEPT in peroxides (-1, H₂O₂, Na₂O₂), superoxides (-1/2, KO₂), and OF₂ (+2), O₂F₂ (+1).",
      "Hydrogen is +1 with non-metals, but -1 in metal hydrides (NaH, CaH₂).",
      "Alkali metals (Group 1) are always +1; Alkaline earth metals (Group 2) are always +2.",
      "Sum of oxidation states in neutral molecule = 0; In polyatomic ion = net charge of ion."
    ],
    formulas: [
      {
        name: "Average vs Fractional Oxidation State",
        formula: "\\sum (\\text{O.N. of all atoms}) = \\text{Net Molecular / Ionic Charge}",
        variables: "O.N. = oxidation state of constituent atoms",
        examTip: "In Fe₃O₄: Average O.N. of Fe is +8/3 (actually FeO · Fe₂O₃, one Fe²⁺ and two Fe³⁺).",
        trap: "In Caro's acid (H₂SO₅): S is NOT +8! S has 1 peroxy linkage (-O-O-): 2(+1) + S + 3(-2) + 2(-1) = 0 ⇒ S = +6 (maximum valence of Sulfur)!"
      },
      {
        name: "Peroxy & Special Oxidation Number Cases",
        formula: "\\text{CrO}_5: \\text{Cr} = +6 \\text{ (Butterfly structure, 2 peroxy linkages)}, \\quad \\text{H}_2\\text{S}_2\\text{O}_8: \\text{S} = +6",
        variables: "Marshall's acid H₂S₂O₈ has one peroxy linkage between the two SO₃H units",
        examTip: "An element can NEVER exhibit an oxidation state higher than its group valence number (e.g. S max +6, Cr max +6, Mn max +7, Os max +8).",
        trap: "If formal calculation gives O.N. exceeding maximum valence, peroxy linkages (-O-O-) are present!"
      }
    ],
    keyPoints: [
      "Disproportionation reaction: Same element in a single compound is simultaneously oxidized and reduced (e.g. 2 H₂O₂ → 2 H₂O + O₂; Cl₂ + 2 OH⁻ → Cl⁻ + ClO⁻ + H₂O).",
      "Comproportionation: Two species with different oxidation states of same element react to form an intermediate state."
    ]
  },
  {
    id: "chem-11-red-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Redox Reactions",
    topic: "Balancing Redox Reactions & Electrochemical Series",
    weightage: "High",
    examTarget: "Both",
    concept: "Redox equations must satisfy both law of conservation of mass and law of conservation of electrical charge.",
    shortNotes: [
      "Ion-Electron (Half-reaction) method in Acidic medium:",
      "1. Separate into oxidation and reduction half-reactions.",
      "2. Balance atoms other than O and H.",
      "3. Balance O atoms by adding H₂O to deficient side.",
      "4. Balance H atoms by adding H⁺ to deficient side.",
      "5. Balance charge by adding electrons (e⁻).",
      "6. Multiply half-reactions by integers to equalize electrons, then add.",
      "In Basic medium: For every H⁺ present, add equal number of OH⁻ to BOTH sides to form H₂O."
    ],
    formulas: [
      {
        name: "Ion-Electron Half-Reaction Balance Rule",
        formula: "\\text{Acidic: } \\text{O balanced by } \\text{H}_2\\text{O}, \\; \\text{H balanced by } \\text{H}^+; \\quad \\text{Basic: } \\text{Add } \\text{OH}^- \\text{ to neutralize } \\text{H}^+",
        variables: "Electrons added to more positive side to balance net ionic charge",
        examTip: "MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O (Acidic); Cr₂O₇²⁻ + 14 H⁺ + 6 e⁻ → 2 Cr³⁺ + 7 H₂O.",
        trap: "Always double-check both mass AND net charge on both LHS and RHS of final balanced equation!"
      }
    ],
    keyPoints: [
      "Electrochemical series lists standard reduction potentials (E°): Li⁺/Li is lowest (-3.05 V, strongest reducing agent); F₂/F⁻ is highest (+2.87 V, strongest oxidizing agent).",
      "A metal with lower E° (more negative) can displace a metal with higher E° from its salt solution (e.g. Zn + Cu²⁺ → Zn²⁺ + Cu)."
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 8: ORGANIC CHEMISTRY - BASIC PRINCIPLES (GOC)
  // =========================================================================
  {
    id: "chem-11-goc-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Organic Chemistry: Some Basic Principles and Techniques",
    topic: "IUPAC Nomenclature & Structural Isomerism",
    weightage: "High",
    examTarget: "Both",
    concept: "Systematic IUPAC naming: Prefix (Substituents) + Word Root (Longest Carbon Chain) + Primary Suffix (Saturation) + Secondary Suffix (Principal Functional Group).",
    shortNotes: [
      "Priority order of functional groups: -COOH > -SO₃H > Anhydride > -COOR > -COCl > -CONH₂ > -CN > -CHO > >C=O > -OH > -SH > -NH₂ > -C≡C- > >C=C-.",
      "Select longest continuous carbon chain containing maximum principal functional groups and multiple bonds.",
      "Number chain to give lowest locant to principal functional group first, then multiple bonds, then substituents.",
      "Structural Isomerism types: Chain (skeleton), Position (locant), Functional (alcohol/ether, aldehyde/ketone, acid/ester), Metamerism (alkyl groups on polyvalent atom), Tautomerism (keto-enol proton shift)."
    ],
    formulas: [
      {
        name: "Degree of Unsaturation / Double Bond Equivalent (DBE)",
        formula: "\\text{DBE} = C + 1 - \\frac{H}{2} - \\frac{X}{2} + \\frac{N}{2}",
        variables: "C = number of carbon atoms, H = number of hydrogen atoms, X = number of halogen atoms, N = number of nitrogen atoms (Oxygen and Sulfur are ignored)",
        examTip: "DBE = 1 indicates 1 double bond OR 1 ring; DBE = 4 usually indicates a benzene ring (3 double bonds + 1 ring).",
        trap: "In DBE formula: Nitrogen is ADDED (+N/2), Halogens are SUBTRACTED (-X/2), and Oxygen is completely OMITTED!"
      }
    ],
    keyPoints: [
      "Keto-enol tautomerism requires at least one α-hydrogen attached to an sp³ carbon adjacent to carbonyl group.",
      "Phenol enol form is 99.9% favored over keto form due to aromatic resonance stabilization."
    ]
  },
  {
    id: "chem-11-goc-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Organic Chemistry: Some Basic Principles and Techniques",
    topic: "Electronic Effects: Inductive & Electromeric Effects",
    weightage: "High",
    examTarget: "Both",
    concept: "Inductive effect (I-effect) is permanent polarization of σ-electrons along a carbon chain due to electronegativity difference between bonded atoms.",
    shortNotes: [
      "-I Effect (Electron-withdrawing): -NF₃⁺ > -NR₃⁺ > -NO₂ > -CN > -COOH > -F > -Cl > -Br > -I > -OH > -OR > -NH₂ > -C₆H₅ > -H.",
      "+I Effect (Electron-donating): -O⁻ > -COO⁻ > -C(CH₃)₃ (tert-butyl) > -CH(CH₃)₂ (isopropyl) > -CH₂CH₃ (ethyl) > -CH₃ > -T > -D > -H.",
      "Distance-dependent: Inductive effect decreases rapidly with distance and becomes virtually negligible beyond 3 carbon atoms.",
      "Electromeric effect (E-effect): Temporary complete shift of shared π-electron pair to one of the atoms in presence of attacking reagent. (+E: π-electrons shift towards reagent; -E: away from reagent)."
    ],
    formulas: [
      {
        name: "Acidic Strength via Inductive Effect",
        formula: "\\text{Acidic Strength } K_a \\propto -I \\text{ effect} \\propto \\frac{1}{+I \\text{ effect}}",
        variables: "Ka = acid dissociation constant",
        examTip: "Trichloroacetic acid (CCl₃COOH) > Dichloro > Monochloro > Acetic acid (CH₃COOH). -I stabilizes conjugate carboxylate anion (RCOO⁻).",
        trap: "Formic acid (HCOOH) is MORE acidic than Acetic acid (CH₃COOH) because methyl group (+I effect) destabilizes conjugate base acetate!"
      }
    ],
    keyPoints: [
      "Basic strength of aliphatic amines in gas phase: 3° > 2° > 1° > NH₃ (pure +I effect).",
      "In aqueous solution due to combined inductive, hydration, and steric effects: (CH₃)₂NH (2°) > CH₃NH₂ (1°) > (CH₃)₃N (3°) > NH₃ (2° > 1° > 3° for methyl; 2° > 3° > 1° for ethyl!)."
    ]
  },
  {
    id: "chem-11-goc-3",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Organic Chemistry: Some Basic Principles and Techniques",
    topic: "Resonance, Mesomeric Effect & Aromaticity",
    weightage: "High",
    examTarget: "Both",
    concept: "Delocalization of π-electrons across conjugated systems (p-orbitals) providing extra thermodynamic stability (Resonance Energy).",
    shortNotes: [
      "Conjugation conditions: alternate double bonds (C=C-C=C), double bond with positive charge (C=C-C⁺), with lone pair (C=C-Z̈), with free radical (C=C-C·), with vacant d-orbital.",
      "+M / +R Effect (Donates π-electrons into ring/chain): -O⁻, -OH, -OR, -NH₂, -NHR, -NHCOR, -Halogens.",
      "-M / -R Effect (Withdraws π-electrons): -NO₂, -CN, -CHO, -COOH, -COOR, -CONH₂, -SO₃H.",
      "Mesomeric effect is DISTANCE-INDEPENDENT throughout the conjugated system.",
      "Halogens are unique: Deactivating due to strong -I effect, but ORTHO/PARA directing due to +M lone pair donation!"
    ],
    formulas: [
      {
        name: "Hückel's Rule of Aromaticity",
        formula: "\\text{Aromatic: Planar, Cyclic, Conjugated with } (4n + 2)\\pi \\text{ electrons } (n = 0, 1, 2, 3...)",
        variables: "n = integer (0, 1, 2, 3...). 2, 6, 10, 14, 18 π-electrons",
        examTip: "Antiaromatic: Planar, cyclic, conjugated with 4n π electrons (4, 8, 12 π-e⁻). Highly unstable! (e.g. Cyclobutadiene).",
        trap: "Cyclooctatetraene (COT, 8 π-e⁻) is NOT antiaromatic: it adopts a non-planar 'tub shape' to avoid antiaromaticity, making it non-aromatic!"
      }
    ],
    keyPoints: [
      "Stability order: Aromatic > Non-aromatic > Antiaromatic.",
      "Resonance contributors with complete octets for all atoms are far more stable than open-octet structures, even if formal charge resides on electronegative atom."
    ]
  },
  {
    id: "chem-11-goc-4",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Organic Chemistry: Some Basic Principles and Techniques",
    topic: "Hyperconjugation & Reaction Intermediates",
    weightage: "High",
    examTarget: "Both",
    concept: "Hyperconjugation (no-bond resonance / Baker-Nathan effect): Delocalization of σ-electrons of C-H bond into adjacent vacant p-orbital or π-orbital.",
    shortNotes: [
      "Requires presence of at least one α-hydrogen on sp³ carbon attached to carbocation, radical, or alkene.",
      "Number of hyperconjugative structures = Number of α-hydrogens.",
      "Carbocation Stability: 3° > 2° > 1° > CH₃⁺ (due to +I and hyperconjugation: 9 α-H in (CH₃)₃C⁺ > 6 in (CH₃)₂CH⁺ > 3 in CH₃CH₂⁺).",
      "Free Radical Stability: 3° > 2° > 1° > ·CH₃ (same trend as carbocations).",
      "Carbanion Stability: CH₃⁻ > 1° > 2° > 3° (reversed! Alkyl groups donate electrons by +I, destabilizing negative charge).",
      "Alkene Stability ∝ Number of α-hydrogens ∝ Heat of Hydrogenation⁻¹."
    ],
    formulas: [
      {
        name: "Alkene Stability vs Heat of Hydrogenation",
        formula: "\\text{Stability of Alkene} \\propto \\text{Number of } \\alpha\\text{-Hydrogens} \\propto \\frac{1}{\\Delta_{\\text{hydro}} H}",
        variables: "Δ_hydro H = heat released upon catalytic hydrogenation",
        examTip: "trans-alkenes are generally more stable than cis-alkenes due to minimal steric hindrance between alkyl substituents.",
        trap: "Heat of hydrogenation is EXOTHERMIC. A smaller numerical magnitude indicates a more stable alkene!"
      }
    ],
    keyPoints: [
      "Carbocations undergo spontaneous 1,2-hydride shift or 1,2-methyl shift to form a more stable intermediate (e.g. 1° → 3°).",
      "Tropylium cation (C₇H₇⁺, 6 π-electrons) is aromatic and exceptionally stable."
    ]
  },
  {
    id: "chem-11-goc-5",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Organic Chemistry: Some Basic Principles and Techniques",
    topic: "Purification & Qualitative Elemental Analysis",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Purification techniques exploit physical property differences. Qualitative analysis identifies constituent elements in organic molecules.",
    shortNotes: [
      "Distillation: Simple (boiling points differ by > 25°C), Fractional (differs by < 25°C), Steam (steam-volatile, water-insoluble like aniline, o-nitrophenol), Vacuum / Reduced pressure (decomposes at/near normal boiling point, e.g. glycerol).",
      "Chromatography: Adsorption (Column, TLC) vs Partition (Paper). Retention factor R_f = Distance moved by substance / Distance moved by solvent front.",
      "Lassaigne's Test (Sodium Fusion Extract): Converts covalently bonded N, S, Halogens into ionic sodium salts (NaCN, Na₂S, NaX).",
      "Test for Nitrogen: Extract + FeSO₄ + NaOH + heat + FeCl₃ + HCl → Prussian Blue color [Fe₄[Fe(CN)₆]₃].",
      "Test for Sulfur: Extract + Sodium nitroprusside → Violet color [Fe(CN)₅NOS]⁴⁻.",
      "Test for Both N and S: Extract forms NaSCN + FeCl₃ → Blood Red color [Fe(SCN)]²⁺."
    ],
    formulas: [
      {
        name: "Chromatography Retention Factor",
        formula: "R_f = \\frac{\\text{Distance travelled by the substance from baseline}}{\\text{Distance travelled by the solvent front from baseline}}",
        variables: "0 < R_f < 1, dimensionless ratio",
        examTip: "Lassaigne's test fails for Hydrazine (NH₂-NH₂) and Hydroxylamine (NH₂OH) because they contain NO carbon to form NaCN!",
        trap: "In testing for halogens in presence of N or S: boil extract with concentrated HNO₃ first to decompose NaCN and Na₂S as HCN and H₂S, otherwise AgCN/Ag₂S interfere as precipitates!"
      }
    ],
    keyPoints: [
      "Silver nitrate test for halogens: AgCl (white ppt, soluble in NH₄OH), AgBr (pale yellow ppt, sparingly soluble in NH₄OH), AgI (yellow ppt, completely insoluble in NH₄OH).",
      "Beilstein's test detects halogens via green flame with copper wire, but does not distinguish which halogen is present."
    ]
  },
  {
    id: "chem-11-goc-6",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Organic Chemistry: Some Basic Principles and Techniques",
    topic: "Quantitative Elemental Estimation Formulas",
    weightage: "High",
    examTarget: "Both",
    concept: "Standard laboratory quantitative methods for determining mass percentages of Carbon, Hydrogen, Nitrogen, Halogens, and Sulfur in organic compounds.",
    shortNotes: [
      "Liebig's Combustion: C converted to CO₂ (absorbed in KOH solution), H converted to H₂O (absorbed in anhydrous CaCl₂).",
      "Dumas Method: N-containing compound heated with CuO in CO₂ atmosphere; all Nitrogen released as N₂ gas, measured in nitrometer over KOH.",
      "Kjeldahl's Method: Compound digested with conc. H₂SO₄ (CuSO₄ catalyst) to form (NH₄)₂SO₄, liberated as NH₃ with NaOH, and titrated against standard acid.",
      "Carius Method: Heated with fuming HNO₃ and AgNO₃ in sealed Carius tube; Halogens precipitate as AgX, Sulfur precipitates as BaSO₄ (with BaCl₂)."
    ],
    formulas: [
      {
        name: "Carbon & Hydrogen Estimation",
        formula: "\\% \\text{ C} = \\frac{12}{44} \\times \\frac{w_{\\text{CO}_2}}{w} \\times 100\\%, \\quad \\% \\text{ H} = \\frac{2}{18} \\times \\frac{w_{\\text{H}_2\\text{O}}}{w} \\times 100\\%",
        variables: "w = mass of organic compound taken (g), w_CO2 = mass of CO₂ absorbed, w_H2O = mass of H₂O absorbed",
        examTip: "KOH bulb increases in mass due to CO₂ absorption; CaCl₂ U-tube increases due to H₂O absorption.",
        trap: "Remember factor 12/44 for Carbon (molecular weight of CO₂ = 44) and 2/18 for Hydrogen (H₂O = 18)."
      },
      {
        name: "Nitrogen Estimation (Dumas vs Kjeldahl)",
        formula: "\\text{Dumas: } \\% \\text{ N} = \\frac{28}{22400} \\times \\frac{V_{\\text{STP}}}{w} \\times 100\\%, \\quad \\text{Kjeldahl: } \\% \\text{ N} = \\frac{1.4 \\times N \\times V}{w}",
        variables: "V_STP = volume of N₂ at STP in mL, w = mass of compound (g), N = normality of acid, V = volume of acid consumed by NH₃ in mL",
        examTip: "Kjeldahl's method FAILS for nitro (-NO₂), azo (-N=N-), and ring nitrogen compounds (pyridine, quinoline) because they do not yield (NH₄)₂SO₄ upon acid digestion!",
        trap: "V_STP in Dumas must be reduced from experimental P and T over aqueous tension: P_dry = P_barometric - Aqueous tension."
      },
      {
        name: "Halogen & Sulfur Estimation (Carius Method)",
        formula: "\\% \\text{ X} = \\frac{\\text{At. wt of X}}{\\text{Mol. wt of AgX}} \\times \\frac{w_{\\text{AgX}}}{w} \\times 100\\%, \\quad \\% \\text{ S} = \\frac{32}{233} \\times \\frac{w_{\\text{BaSO}_4}}{w} \\times 100\\%",
        variables: "AgCl (143.5), AgBr (188), AgI (235); BaSO₄ molar mass = 233.3 g/mol",
        examTip: "For Phosphorus (Carius): % P = (62 / 222) × (w_Mg₂P₂O₇ / w) × 100%.",
        trap: "Be careful with molecular mass of BaSO₄ (233) vs BaCl₂!"
      }
    ],
    keyPoints: [
      "Direct numericals are guaranteed every year in JEE Main and NEET chemistry.",
      "Kjeldahl's method is the universal official method for protein and fertilizer nitrogen determination."
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 9: HYDROCARBONS
  // =========================================================================
  {
    id: "chem-11-hyd-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Hydrocarbons",
    topic: "Alkanes: Preparation & Free Radical Halogenation",
    weightage: "High",
    examTarget: "Both",
    concept: "Alkanes (paraffins, C_n H_2n+2) are saturated hydrocarbons containing only single C-C and C-H σ-bonds, relatively unreactive under mild conditions.",
    shortNotes: [
      "Wurtz Reaction: 2 R-X + 2 Na (dry ether) → R-R + 2 NaX. Best for symmetrical alkanes with even number of carbon atoms. Methane CANNOT be prepared.",
      "Decarboxylation: R-COONa + Soda-lime (NaOH + CaO, 3:1) → R-H + Na₂CO₃ (alkane with ONE LESS carbon atom).",
      "Kolbe's Electrolytic Synthesis: 2 R-COOK + 2 H₂O → R-R + 2 CO₂ (at anode) + H₂ + 2 KOH (at cathode).",
      "Free radical halogenation of alkanes (in UV light hν): Reactivity order F₂ > Cl₂ > Br₂ > I₂ (Fluorination is explosive; Iodination is reversible, requires oxidizing agent HNO₃ or HIO₃).",
      "Selectivity of halogen radicals: Bromine is highly selective (3°:2°:1° = 1600:82:1); Chlorine is less selective (3°:2°:1° = 5:3.8:1)."
    ],
    formulas: [
      {
        name: "Conformations of Ethane Energy Barrier",
        formula: "\\text{Staggered (Dihedral angle } \\theta = 60^\\circ) > \\text{Skew} > \\text{Eclipsed } (\\theta = 0^\\circ)",
        variables: "Torsional strain in eclipsed ethane = ~12.5 kJ/mol (3 kcal/mol)",
        examTip: "Staggered conformation is most stable due to minimum torsional repulsion between C-H bonds.",
        trap: "For n-butane: Anti (180°) > Gauche (60°) > Partially eclipsed (120°) > Fully eclipsed (0°). Exception: Ethylene glycol (OH-CH₂-CH₂-OH) Gauche is MORE stable than Anti due to intramolecular H-bonding!"
      }
    ],
    keyPoints: [
      "Combustion: C_n H_2n+2 + (3n+1)/2 O₂ → n CO₂ + (n+1) H₂O.",
      "Corey-House synthesis prepares unsymmetrical alkanes in high yield: R₂CuLi + R'X → R-R'."
    ]
  },
  {
    id: "chem-11-hyd-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Hydrocarbons",
    topic: "Alkenes: Markovnikov Rule & Peroxide Effect",
    weightage: "High",
    examTarget: "Both",
    concept: "Electrophilic addition reactions of alkenes proceed via planar carbocation intermediates. Unsymmetric additions follow Markovnikov's rule.",
    shortNotes: [
      "Markovnikov's Rule: In addition of unsymmetrical HX to unsymmetrical alkene, negative part of reagent adds to carbon possessing FEWER hydrogen atoms.",
      "Mechanism involves formation of more stable carbocation intermediate (3° > 2° > 1°).",
      "Carbocation can undergo rearrangement (hydride / methyl shift) before nucleophile attack!",
      "Peroxide Effect (Kharasch effect / Anti-Markovnikov addition): In presence of organic peroxides (R-O-O-R), addition of HBr proceeds via free radical mechanism: Br adds to carbon with MORE hydrogen atoms.",
      "Peroxide effect is OBSERVED EXCLUSIVELY WITH HBr! It fails completely for HF, HCl (H-Cl bond is too strong) and HI (I-I bond formation is preferred over addition)."
    ],
    formulas: [
      {
        name: "Markovnikov vs Anti-Markovnikov Additions",
        formula: "\\text{Markovnikov: } \\text{R-CH=CH}_2 + \\text{HBr} \\to \\text{R-CH(Br)-CH}_3, \\quad \\text{Peroxide: } \\text{R-CH=CH}_2 + \\text{HBr} \\xrightarrow{\\text{Peroxide}} \\text{R-CH}_2\\text{-CH}_2\\text{Br}",
        variables: "Markovnikov: electrophile H⁺ attacks first; Anti-Markovnikov: bromine radical ·Br attacks first",
        examTip: "HCl in presence of peroxide STILL follows Markovnikov's rule!",
        trap: "Rearrangement occurs in Markovnikov addition via carbocation, but NO rearrangement occurs in free radical anti-Markovnikov addition!"
      }
    ],
    keyPoints: [
      "Saytzeff's Rule: Dehydrohalogenation of alkyl halides produces the more substituted, more stable alkene as major product.",
      "Bromine water test (decolorization of reddish-brown Br₂ in CCl₄) and Baeyer's reagent (cold dilute alkaline KMnO₄ decolorization) test for unsaturation."
    ]
  },
  {
    id: "chem-11-hyd-3",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Hydrocarbons",
    topic: "Ozonolysis of Alkenes & Identification of Products",
    weightage: "High",
    examTarget: "Both",
    concept: "Ozonolysis cleaves C=C double bonds completely, converting each unsaturated carbon into a carbonyl group (C=O). Locates double bond position.",
    shortNotes: [
      "Reductive ozonolysis (O₃ followed by Zn / H₂O or (CH₃)₂S):",
      "=CH₂ terminates as Formaldehyde (HCHO).",
      "=CH-R terminates as Aldehyde (R-CHO).",
      "=CR₂ terminates as Ketone (R-CO-R).",
      "Zn dust prevents nascent hydrogen peroxide (H₂O₂) from oxidizing aldehydes to carboxylic acids.",
      "Oxidative ozonolysis (O₃ followed by H₂O₂): Aldehydes are further oxidized to carboxylic acids (R-COOH); Ketones remain ketones."
    ],
    formulas: [
      {
        name: "Ozonolysis Cleavage Rule",
        formula: "\\text{R}_1\\text{R}_2\\text{C}=\\text{CHR}_3 \\xrightarrow{1.\\; \\text{O}_3, \\; 2.\\; \\text{Zn/H}_2\\text{O}} \\text{R}_1\\text{R}_2\\text{C}=\\text{O} + \\text{R}_3\\text{CH}=\\text{O}",
        variables: "Cleaves π-bond and σ-bond, capped by Oxygen on both sides",
        examTip: "To deduce starting alkene from products, remove oxygen atoms from both carbonyls and join remaining fragments with a C=C double bond!",
        trap: "Ozonolysis of Benzene gives 3 moles of Glyoxal (CHO-CHO). Ozonolysis of o-Xylene gives 3 products (Glyoxal, Methylglyoxal, Dimethylglyoxal) in 3:2:1 ratio, proving resonance."
      }
    ],
    keyPoints: [
      "One of the top 5 organic identification reaction types in both NEET and JEE papers.",
      "Hydroboration-Oxidation of alkenes (B₂H₆ / THF followed by H₂O₂ / OH⁻) gives anti-Markovnikov hydration alcohol with syn-stereochemistry and NO rearrangement."
    ]
  },
  {
    id: "chem-11-hyd-4",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Hydrocarbons",
    topic: "Alkynes: Acidity & Electrophilic Additions",
    weightage: "High",
    examTarget: "Both",
    concept: "Alkynes (C_n H_2n-2) have a C≡C triple bond. Terminal alkynes (R-C≡C-H) exhibit weak acidic character due to high s-character (50%) of sp-hybridized carbon.",
    shortNotes: [
      "Acidity order: HC≡CH (sp, 50% s) > CH₂=CH₂ (sp², 33% s) > CH₃-CH₃ (sp³, 25% s).",
      "Terminal alkynes react with active metals (Na, NaNH₂) liberating H₂ gas: HC≡CH + 2 Na → Na⁺⁻C≡C⁻Na⁺ + H₂.",
      "Test for terminal alkynes: Forms red precipitate with Ammoniacal Cu₂Cl₂ (Copper acetylide Cu₂C₂) and white precipitate with Tollen's reagent [Ag(NH₃)₂]⁺ (Silver acetylide Ag₂C₂).",
      "Reduction to cis-alkene: H₂ / Lindlar's catalyst (Pd/CaCO₃ poisoned with quinoline or lead acetate).",
      "Reduction to trans-alkene: Birch reduction (Na in liquid NH₃).",
      "Kucherov Reaction (Hydration): HC≡CH + H₂O (20% H₂SO₄, 1% HgSO₄, 60°C) → CH₃CHO (Acetaldehyde); Other alkynes give ketones."
    ],
    formulas: [
      {
        name: "Lindlar vs Birch Stereoselective Hydrogenation",
        formula: "\\text{R-C}\\equiv\\text{C-R} \\xrightarrow{\\text{H}_2/\\text{Pd-CaCO}_3} \\text{cis-Alkene}, \\quad \\text{R-C}\\equiv\\text{C-R} \\xrightarrow{\\text{Na/liq. NH}_3} \\text{trans-Alkene}",
        variables: "Lindlar catalyst gives Syn-addition (cis); Birch reduction gives Anti-addition (trans via radical anion)",
        examTip: "Cyclic polymerization of ethyne: 3 HC≡CH (Red hot iron tube, 873 K) → Benzene (C₆H₆).",
        trap: "Non-terminal alkynes (like But-2-yne, CH₃-C≡C-CH₃) do NOT react with NaNH₂ or Tollen's reagent because they have no acidic terminal hydrogen!"
      }
    ],
    keyPoints: [
      "Acetylene has pKa ≈ 25, more acidic than ammonia (pKa ≈ 38) and alkanes (pKa ≈ 50).",
      "Oxidation with neutral KMnO₄ yields diketone; with alkaline/acidic KMnO₄ cleaves into carboxylic acids."
    ]
  },
  {
    id: "chem-11-hyd-5",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Hydrocarbons",
    topic: "Aromatic Hydrocarbons & Electrophilic Substitution (EAS)",
    weightage: "High",
    examTarget: "Both",
    concept: "Benzene undergoes Electrophilic Aromatic Substitution (EAS) retaining its aromatic stabilization energy rather than addition.",
    shortNotes: [
      "EAS Mechanism: 1. Generation of electrophile E⁺; 2. Attack of E⁺ forming arenium ion (σ-complex / Wheland intermediate); 3. Loss of proton H⁺ restoring aromaticity.",
      "1. Nitration: conc. HNO₃ + conc. H₂SO₄ (Electrophile: Nitronium ion NO₂⁺).",
      "2. Halogenation: Cl₂ + anhydrous AlCl₃ (Electrophile: Chloronium ion Cl⁺).",
      "3. Sulphonation: Fuming H₂SO₄ / Oleum (Electrophile: Neutral SO₃).",
      "4. Friedel-Crafts Alkylation: R-Cl + anhy. AlCl₃ (Electrophile: R⁺ carbocation, susceptible to rearrangement!).",
      "5. Friedel-Crafts Acylation: R-COCl + anhy. AlCl₃ (Electrophile: Acylium ion R-C≡O⁺, resonance stabilized, NO rearrangement!)."
    ],
    formulas: [
      {
        name: "Directing Influence of Functional Groups in Benzene",
        formula: "\\text{Activating / o,p-directing: } -\\text{O}^-, -\\text{OH}, -\\text{NH}_2, -\\text{OR}, -\\text{R}; \\quad \\text{Deactivating / m-directing: } -\\text{NO}_2, -\\text{CN}, -\\text{CHO}, -\\text{COOH}",
        variables: "Activating groups increase electron density at ortho and para positions via +M / +I; Deactivating withdraw via -M / -I",
        examTip: "Halogens (-F, -Cl, -Br, -I) are DEACTIVATING due to -I, but ORTHO/PARA directing due to +M!",
        trap: "Aniline does NOT undergo Friedel-Crafts reactions because basic -NH₂ group forms a salt complex with Lewis acid AlCl₃ catalyst (C₆H₅NH₂·AlCl₃), which strongly deactivates the ring!"
      }
    ],
    keyPoints: [
      "Benzene resists oxidation by KMnO₄; Alkylbenzenes with at least one benzylic hydrogen (Toluene, Ethylbenzene, Isopropylbenzene) are oxidized cleanly to Benzoic acid (C₆H₅COOH).",
      "tert-Butylbenzene cannot be oxidized to benzoic acid because it lacks benzylic hydrogens!"
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 10: STATES OF MATTER (GASEOUS & LIQUID)
  // =========================================================================
  {
    id: "chem-11-som-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "States of Matter: Gases and Liquids",
    topic: "Gas Laws & Ideal Gas Equation",
    weightage: "High",
    examTarget: "Both",
    concept: "State of an ideal gas is defined by four variables: P, V, n, and T. PV = nRT.",
    shortNotes: [
      "Boyle's Law (T = const): P₁V₁ = P₂V₂ (P ∝ 1/V). Isotherms are rectangular hyperbolas.",
      "Charles's Law (P = const): V₁/T₁ = V₂/T₂ (V ∝ T). Isobars.",
      "Gay-Lussac's Law (V = const): P₁/T₁ = P₂/T₂ (P ∝ T). Isochores.",
      "Avogadro's Law (P, T = const): V ∝ n.",
      "Combined Gas Law: (P₁V₁) / T₁ = (P₂V₂) / T₂.",
      "Universal Gas Constant R = 8.314 J/mol·K = 0.0821 L·atm/mol·K = 0.0831 bar·L/mol·K = 2 cal/mol·K."
    ],
    formulas: [
      {
        name: "Ideal Gas & Density Equations",
        formula: "P V = n R T = \\frac{w}{M} R T, \\quad P M = d R T \\implies d = \\frac{P M}{R T}",
        variables: "P = pressure, V = volume, n = moles, R = gas constant, T = absolute temp (K), d = density, M = molar mass",
        examTip: "At same T and P, density of gas is directly proportional to its molar mass (d ∝ M).",
        trap: "Always ensure T is in Kelvin! In PV = nRT, using °C produces complete calculation failure."
      },
      {
        name: "Dalton's Law of Partial Pressures",
        formula: "P_{\\text{total}} = \\sum P_i, \\quad P_i = X_i \\times P_{\\text{total}}, \\quad P_{\\text{dry gas}} = P_{\\text{moist gas}} - \\text{Aqueous Tension}",
        variables: "P_i = partial pressure of gas i, X_i = mole fraction of gas i, Aqueous tension = vapour pressure of water at temperature T",
        examTip: "Gases that react chemically with each other (e.g. NH₃ + HCl → NH₄Cl(s)) do NOT obey Dalton's Law!",
        trap: "When a gas is collected over water, subtract aqueous tension to obtain true dry gas pressure."
      }
    ],
    keyPoints: [
      "Tested regularly in both Physics (Kinetic Theory) and Chemistry entrance papers.",
      "Boyle's temperature T_B = a / (Rb), where real gas obeys ideal gas equation over wide pressure range."
    ]
  },
  {
    id: "chem-11-som-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "States of Matter: Gases and Liquids",
    topic: "Graham's Law of Diffusion & Effusion",
    weightage: "High",
    examTarget: "Both",
    concept: "Rate of diffusion or effusion of a gas is inversely proportional to the square root of its density or molar mass at constant temperature and pressure.",
    shortNotes: [
      "Rate of effusion r = Volume effused / time = Moles effused / time = Distance travelled / time = Drop in pressure / time.",
      "Under identical conditions of P and T: r₁ / r₂ = √(d₂ / d₁) = √(M₂ / M₁).",
      "If pressures are different: r ∝ P / √M ⇒ r₁ / r₂ = (P₁ / P₂) × √(M₂ / M₁).",
      "Lighter gases diffuse faster than heavier gases: H₂ (M=2) diffuses 4 times faster than O₂ (M=32)."
    ],
    formulas: [
      {
        name: "Graham's Law Master Equation",
        formula: "\\frac{r_1}{r_2} = \\frac{V_1 / t_1}{V_2 / t_2} = \\frac{n_1 / t_1}{n_2 / t_2} = \\frac{P_1}{P_2} \\sqrt{\\frac{M_2}{M_1}}",
        variables: "r = rate of diffusion, V = volume effused in time t, n = moles effused, P = pressure, M = molar mass",
        examTip: "In U-tube with NH₃ (M=17) and HCl (M=36.5) at opposite ends, white dense fumes of NH₄Cl form CLOSER to the HCl end because NH₃ diffuses faster!",
        trap: "If time taken for equal volume is compared: t₂ / t₁ = r₁ / r₂ = √(M₂ / M₁) (time is inversely proportional to rate!)."
      }
    ],
    keyPoints: [
      "Used historically to separate isotopes of Uranium (²³⁵UF₆ vs ²³⁸UF₆) in nuclear enrichment.",
      "Direct question type in NEET and JEE Main physical chemistry."
    ]
  },
  {
    id: "chem-11-som-3",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "States of Matter: Gases and Liquids",
    topic: "Kinetic Molecular Theory & Molecular Speeds",
    weightage: "High",
    examTarget: "Both",
    concept: "Gases consist of large numbers of identical particles in continuous random motion, with elastic collisions and kinetic energy proportional to absolute temperature.",
    shortNotes: [
      "Kinetic Gas Equation: PV = (1/3) m N u_rms².",
      "Average Translational Kinetic Energy per mole = (3/2) RT; Per molecule = (3/2) kT (where k = R/NA = 1.38 × 10⁻²³ J/K is Boltzmann constant).",
      "Root Mean Square Speed: u_rms = √(3RT / M).",
      "Average Speed: u_avg = √(8RT / πM) ≈ √(2.55 RT / M).",
      "Most Probable Speed: u_mp = √(2RT / M).",
      "Ratio of speeds: u_mp : u_avg : u_rms = √2 : √(8/π) : √3 = 1 : 1.128 : 1.224."
    ],
    formulas: [
      {
        name: "Molecular Speed Triad Equations",
        formula: "u_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3PV}{w}} = \\sqrt{\\frac{3P}{d}}, \\quad u_{\\text{avg}} = \\sqrt{\\frac{8RT}{\\pi M}}, \\quad u_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}",
        variables: "R = 8.314 J/mol·K, T = temperature in Kelvin, M = molar mass in kg/mol (e.g. O₂ = 0.032 kg/mol!), d = density (kg/m³)",
        examTip: "Order of speeds: Most Probable < Average < Root Mean Square (RAM: u_rms > u_avg > u_mp).",
        trap: "In calculating numerical speed in m/s, M MUST BE IN kg/mol, NOT g/mol! M_H2 = 2 × 10⁻³ kg/mol."
      }
    ],
    keyPoints: [
      "Kinetic energy of ideal gas depends ONLY on temperature; independent of pressure, volume, or nature of gas.",
      "Maxwell-Boltzmann speed distribution curve broadens and shifts to the right as temperature increases."
    ]
  },
  {
    id: "chem-11-som-4",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "States of Matter: Gases and Liquids",
    topic: "Real Gases: Van der Waals Equation & Compressibility Factor",
    weightage: "High",
    examTarget: "Both",
    concept: "Real gases deviate from ideal behavior because real gas molecules possess finite volume and exert intermolecular attractive forces.",
    shortNotes: [
      "Compressibility factor: Z = PV / nRT = V_real / V_ideal.",
      "For ideal gas: Z = 1 at all T and P.",
      "If Z < 1 (Negative deviation): Attractive forces dominate; Gas is MORE compressible than ideal gas. Occurs at low/moderate pressures.",
      "If Z > 1 (Positive deviation): Repulsive forces dominate; Gas is LESS compressible than ideal gas. Occurs at very high pressures. For H₂ and He, Z > 1 at all temperatures due to extremely small mass/polarizability.",
      "Van der Waals constants: 'a' measures magnitude of intermolecular attractive forces (Units: atm·L²/mol² or bar·L²/mol²); 'b' represents effective molecular volume (co-volume, b = 4 × N_A × Volume of 1 molecule; Units: L/mol)."
    ],
    formulas: [
      {
        name: "Van der Waals Equation of State",
        formula: "\\left( P + \\frac{a n^2}{V^2} \\right) (V - n b) = n R T",
        variables: "P = pressure, V = volume, n = moles, a = attraction constant, b = excluded volume constant, R = 0.0821, T = Kelvin",
        examTip: "Higher value of 'a' indicates stronger intermolecular attraction and EASIER liquefaction (NH₃ > SO₂ > CO₂ > O₂ > N₂ > H₂ > He).",
        trap: "At low pressure, volume correction 'b' is neglected: (P + a/V_m²) V_m = RT ⇒ Z = 1 - a / (V_m RT) < 1."
      },
      {
        name: "High Pressure & Hydrogen Exceptions",
        formula: "\\text{High Pressure: } Z = 1 + \\frac{P b}{R T} > 1, \\quad \\text{For H}_2 \\text{ and He at 298 K: } Z = 1 + \\frac{P b}{R T} > 1",
        variables: "At very high pressure, attraction term a/V² is negligible compared to huge P",
        examTip: "Boyle Temperature where real gas behaves ideally: T_B = a / (Rb).",
        trap: "Do not forget b = 4 × V_actual! The excluded volume is FOUR TIMES the actual molecular volume."
      }
    ],
    keyPoints: [
      "Critical constants: Critical Temperature T_c = 8a / (27Rb); Critical Pressure P_c = a / (27b²); Critical Volume V_c = 3b.",
      "At critical point: Compressibility factor Z_c = P_c V_c / (RT_c) = 3/8 = 0.375 for all van der Waals gases!"
    ]
  }
];

async function appendBatch2() {
  const targetFile = path.resolve('server/scripts/chemistryDataDefinition.ts');
  console.log(`Reading ${targetFile}...`);
  let content = fs.readFileSync(targetFile, 'utf8');

  const lastIndex = content.lastIndexOf('];');
  if (lastIndex === -1) {
    console.error('Could not find closing bracket in chemistryDataDefinition.ts');
    return;
  }

  const modulesString = ',\n' + JSON.stringify(batch2Modules, null, 2).slice(1, -1).trim();
  const updatedContent = content.slice(0, lastIndex) + modulesString + '\n];\n';
  fs.writeFileSync(targetFile, updatedContent, 'utf8');
  console.log(`Appended ${batch2Modules.length} Batch 2 modules to chemistryDataDefinition.ts!`);
}

appendBatch2();
