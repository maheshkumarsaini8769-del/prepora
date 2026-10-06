import fs from 'fs';
import path from 'path';

const additionalBatch5Modules = [
  // --- CLASS 12: SOLID STATE ---
  {
    id: "chem-12-solid-state-unit-cell",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Solid State",
    topic: "Unit Cells, Density & Crystal Lattices",
    weightage: "High",
    examTarget: "Both",
    concept: "Crystalline solids exhibit long-range order. Unit cells are characterized by lattice parameters (a, b, c, alpha, beta, gamma). Density depends on the number of atoms per unit cell (z), molar mass (M), edge length (a), and Avogadro's number.",
    shortNotes: [
      "Simple Cubic (SC): z = 1, Coordination Number = 6, Packing Efficiency = 52.4%, r = a / 2.",
      "Body-Centered Cubic (BCC): z = 2, Coordination Number = 8, Packing Efficiency = 68%, r = (sqrt(3) / 4) * a.",
      "Face-Centered Cubic (FCC / CCP): z = 4, Coordination Number = 12, Packing Efficiency = 74%, r = a / (2 * sqrt(2)).",
      "Hexagonal Close Packing (HCP): z = 6, Coordination Number = 12, Packing Efficiency = 74%.",
      "Density formula: d = (z * M) / (a^3 * N_A). Always convert edge length 'a' to cm (1 pm = 10^-10 cm)."
    ],
    formulas: [
      {
        name: "Density of Unit Cell",
        formula: "\\rho = \\frac{z \\cdot M}{a^3 \\cdot N_A}",
        variables: "\\rho: \\text{Density (g/cm}^3\\text{)}, z: \\text{Number of atoms/unit cell}, M: \\text{Molar mass (g/mol)}, a: \\text{Edge length (cm)}, N_A: \\text{Avogadro's number}",
        examTip: "Ensure unit consistency! If a is in pm, a(cm) = a * 10^-10 cm. If density is in kg/m^3, scale by 10^3.",
        trap: "Students frequently confuse z for BCC (z=2) and FCC (z=4) with coordination number (8 and 12 respectively)."
      },
      {
        name: "Atomic Radius & Edge Length Relations",
        formula: "r_{\\text{SC}} = \\frac{a}{2}, \\quad r_{\\text{BCC}} = \\frac{\\sqrt{3} a}{4}, \\quad r_{\\text{FCC}} = \\frac{a}{2\\sqrt{2}}",
        variables: "r: \\text{Atomic radius}, a: \\text{Unit cell edge length}",
        examTip: "In BCC, atoms touch along the body diagonal (4r = sqrt(3)*a). In FCC, atoms touch along the face diagonal (4r = sqrt(2)*a).",
        trap: "Distance between nearest neighbours (d): d = 2r. In BCC, nearest neighbour distance is (sqrt(3)/2)*a, not (sqrt(3)/4)*a."
      },
      {
        name: "Limiting Radius Ratios for Voids",
        formula: "\\frac{r_+}{r_-}: \\text{Trigonal (0.155 - 0.225), Tetrahedral (0.225 - 0.414), Octahedral (0.414 - 0.732), Cubic (0.732 - 1.000)}",
        variables: "r_+: \\text{Cation radius}, r_-: \\text{Anion radius}",
        examTip: "Number of octahedral voids = N, number of tetrahedral voids = 2N, where N is the number of close-packed spheres (FCC: N=4 -> 4 Oct, 8 Tet voids).",
        trap: "Tetrahedral voids are located on body diagonals (2 per body diagonal); Octahedral voids are at edge centers and body center."
      }
    ],
    keyPoints: [
      "Schottky defect: Equal number of cations and anions missing, decreases density (NaCl, KCl, CsCl, AgBr).",
      "Frenkel defect: Smaller ion dislocated to interstitial site, density unchanged (ZnS, AgCl, AgBr, AgI). AgBr shows BOTH Schottky and Frenkel defects.",
      "F-centres: Anionic sites occupied by unpaired electrons impart color to crystals (e.g. yellow NaCl in Na vapor)."
    ]
  },
  // --- CLASS 12: p-BLOCK ELEMENTS (GROUPS 15, 16, 17, 18) ---
  {
    id: "chem-12-pblock-group-15-16",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "p-Block Elements (Group 15, 16, 17 & 18)",
    topic: "Group 15 & 16: Nitrogen, Phosphorus, Oxygen & Sulfur",
    weightage: "High",
    examTarget: "Both",
    concept: "Group 15 (Pnictogens) and Group 16 (Chalcogens) show significant oxidation state diversity and anomalous first-member behaviour due to small size, high electronegativity, and absence of d-orbitals.",
    shortNotes: [
      "Nitrogen forms N2 with high bond dissociation enthalpy (941.4 kJ/mol), making it chemically inert at room temperature.",
      "Phosphorus exhibits catenation and exists as White P4 (tetrahedral, 60 deg bond angle, highly reactive/chemically toxic), Red P (polymeric chain, stable), and Black P.",
      "Haber Process for NH3: N2 + 3H2 <=> 2NH3, Delta H = -92.4 kJ/mol. Favoured by high pressure (200 atm), optimum temp (700 K), and Fe catalyst with K2O/Al2O3 promoter.",
      "Ostwald's Process: 4NH3 + 5O2 -> 4NO + 6H2O (Pt/Rh gauze catalyst) -> 2NO + O2 -> 2NO2 -> 3NO2 + H2O -> 2HNO3 + NO.",
      "Contact Process for H2SO4: 2SO2 + O2 <=> 2SO3 (V2O5 catalyst, 2 bar, 720 K) -> SO3 absorbed in H2SO4 to form oleum (H2S2O7) -> diluted to pure H2SO4.",
      "Anomalous boiling point of H2O and NH3 is due to intermolecular hydrogen bonding (H2O > H2Te > H2Se > H2S)."
    ],
    formulas: [
      {
        name: "Haber & Contact Equilibrium Conditions",
        formula: "K_p = \\frac{p_{\\text{NH}_3}^2}{p_{\\text{N}_2} \\cdot p_{\\text{H}_2}^3}, \\quad K_p = \\frac{p_{\\text{SO}_3}^2}{p_{\\text{SO}_2}^2 \\cdot p_{\\text{O}_2}}",
        variables: "p_i: \\text{Partial pressure of component } i, K_p: \\text{Equilibrium constant}",
        examTip: "Both NH3 and SO3 synthesis are exothermic (Delta H < 0). By Le Chatelier's principle, low temp and high pressure maximize yield.",
        trap: "Operating temperature is kept around 700 K as an optimum for kinetics, even though lower temp thermodynamically favours yield."
      },
      {
        name: "Oxoacids Basicity & Reducing Power",
        formula: "\\text{Basicity of } \\text{H}_3\\text{PO}_n = n - 1 \\quad (n = 2, 3, 4)",
        variables: "\\text{H}_3\\text{PO}_2: \\text{monobasic (2 P-H bonds)}, \\text{H}_3\\text{PO}_3: \\text{dibasic (1 P-H bond)}, \\text{H}_3\\text{PO}_4: \\text{tribasic (0 P-H bonds)}",
        examTip: "P-H bonds act as reducing agents! H3PO2 is the strongest reducing agent among phosphorus oxoacids because it has two P-H bonds.",
        trap: "Do not count total H atoms for basicity; only H atoms attached to oxygen (P-OH) are ionizable."
      }
    ],
    keyPoints: [
      "Thermal stability of hydrides decreases down the group: NH3 > PH3 > AsH3 > SbH3 > BiH3, while reducing character increases.",
      "Ozone is a powerful oxidizing agent: O3 + 2I^- + H2O -> I2 + O2 + 2OH^-. Used in quantitative estimation using standard Na2S2O3.",
      "Sulfur forms S8 puckered ring in rhombic and monoclinic forms. Above 1000 K, S2 is dominant and paramagnetic like O2 due to two unpaired electrons in pi* orbitals."
    ]
  },
  {
    id: "chem-12-pblock-group-17-18",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "p-Block Elements (Group 15, 16, 17 & 18)",
    topic: "Group 17 & 18: Halogens & Noble Gases",
    weightage: "High",
    examTarget: "Both",
    concept: "Group 17 elements (Halogens) have the highest electron gain enthalpies. Group 18 (Noble Gases) have closed-shell configurations; Xenon forms stable fluorides and oxides due to its lower ionization enthalpy.",
    shortNotes: [
      "Electron gain enthalpy trend: Cl > F > Br > I (Fluorine has lower electron affinity than chlorine due to small 2p orbital compact electron repulsion).",
      "Bond dissociation enthalpy trend: Cl2 > Br2 > F2 > I2 (F2 has lower bond enthalpy than Cl2 and Br2 due to strong lone-pair lone-pair repulsion).",
      "Oxidizing power trend: F2 > Cl2 > Br2 > I2 (F2 is the strongest oxidizing agent in aqueous solution due to its exceptionally high hydration enthalpy and low bond dissociation energy).",
      "Interhalogen compounds: XX'_n (n = 1, 3, 5, 7 where X is larger halogen). More reactive than parent halogens (except F2) due to polar and weaker X-X' bond.",
      "Xenon compounds: XeF2 (Linear, sp3d, 3 lone pairs), XeF4 (Square planar, sp3d2, 2 lone pairs), XeF6 (Distorted octahedral, sp3d3, 1 lone pair), XeO3 (Pyramidal, sp3, 1 lone pair), XeOF4 (Square pyramidal, sp3d2, 1 lone pair)."
    ],
    formulas: [
      {
        name: "Standard Electrode Potential for Halogens",
        formula: "E^\\circ_{\\text{F}_2/\\text{F}^-} = +2.87\\text{ V}, \\quad E^\\circ_{\\text{Cl}_2/\\text{Cl}^-} = +1.36\\text{ V}, \\quad E^\\circ_{\\text{Br}_2/\\text{Br}^-} = +1.09\\text{ V}, \\quad E^\\circ_{\\text{I}_2/\\text{I}^-} = +0.54\\text{ V}",
        variables: "E^\\circ: \\text{Standard reduction potential (V)}",
        examTip: "F2 oxidizes all other halide ions to free halogens. Cl2 oxidizes Br^- to Br2 and I^- to I2.",
        trap: "In gas phase, electron gain enthalpy of Cl is more negative than F, but in aqueous solution, F2 is a vastly stronger oxidizing agent due to hydration enthalpy."
      },
      {
        name: "Xenon Fluoride Hydrolysis Reactions",
        formula: "2\\text{XeF}_2 + 2\\text{H}_2\\text{O} \\to 2\\text{Xe} + 4\\text{HF} + \\text{O}_2, \\quad 6\\text{XeF}_4 + 12\\text{H}_2\\text{O} \\to 2\\text{Xe} + 4\\text{XeO}_3 + 24\\text{HF} + 3\\text{O}_2",
        variables: "\\text{XeF}_6 + 3\\text{H}_2\\text{O} \\to \\text{XeO}_3 + 6\\text{HF} \\text{ (Complete hydrolysis)}",
        examTip: "Partial hydrolysis of XeF6 yields oxyfluorides: XeF6 + H2O -> XeOF4 + 2HF; XeF6 + 2H2O -> XeO2F2 + 4HF.",
        trap: "XeF4 disproportionates on hydrolysis into Xe(0) and XeO3(+6), whereas XeF6 does NOT disproportionate (maintains +6 state)."
      }
    ],
    keyPoints: [
      "Helium has the lowest boiling point of any known substance (4.2 K) and does not freeze under atmospheric pressure.",
      "Argon is used to provide inert atmosphere in high-temperature metallurgical processes (arc welding).",
      "Bleaching action of Cl2 is permanent and due to oxidation (Cl2 + H2O -> HCl + HOCl -> HCl + [O])."
    ]
  },
  // --- CLASS 12: POLYMERS ---
  {
    id: "chem-12-polymers-classification-synthesis",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Polymers",
    topic: "Classification, Addition & Condensation Polymers",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Polymers are high-molecular-weight macromolecules built from repeating monomeric units. Classified by source (natural, synthetic), structure (linear, branched, cross-linked), and molecular forces (elastomers, fibres, thermoplastics, thermosetting).",
    shortNotes: [
      "Elastomers: Weakest intermolecular forces, vulcanized rubber (sulfur cross-links between chains). Examples: Buna-S, Buna-N, Neoprene.",
      "Fibres: Strong intermolecular forces (hydrogen bonding or dipole-dipole). Examples: Nylon-6,6, Terylene (Dacron).",
      "Thermoplastics: Intermediate forces, soften on heating and harden on cooling repeatedly. Examples: Polythene, Polystyrene, PVC, Teflon.",
      "Thermosetting: Extensive cross-linking, permanently set on heating, cannot be remoulded. Examples: Bakelite (phenol-formaldehyde), Melamine-formaldehyde.",
      "Ziegler-Natta Catalyst: TiCl4 + Al(C2H5)3 used for coordination polymerization to synthesize High-Density Polythene (HDPE) under mild conditions."
    ],
    formulas: [
      {
        name: "Monomers of High-Yield Polymers",
        formula: "\\text{Nylon-6,6: Adipic acid } + \\text{ Hexamethylenediamine}; \\quad \\text{Nylon-6: Caprolactam}",
        variables: "\\text{Terylene: Terephthalic acid } + \\text{ Ethylene glycol}; \\quad \\text{Bakelite: Phenol } + \\text{ Formaldehyde}",
        examTip: "Neoprene monomer is Chloroprene (2-chloro-1,3-butadiene). Buna-S = 1,3-Butadiene + Styrene. Buna-N = 1,3-Butadiene + Acrylonitrile.",
        trap: "Nylon-6 is synthesized from a SINGLE monomer (caprolactam ring-opening), whereas Nylon-6,6 is a copolymer from TWO six-carbon monomers."
      },
      {
        name: "Number & Weight Average Molar Mass",
        formula: "\\bar{M}_n = \\frac{\\sum N_i M_i}{\\sum N_i}, \\quad \\bar{M}_w = \\frac{\\sum N_i M_i^2}{\\sum N_i M_i}, \\quad \\text{PDI} = \\frac{\\bar{M}_w}{\\bar{M}_n}",
        variables: "\\bar{M}_n: \\text{Number-average}, \\bar{M}_w: \\text{Weight-average}, \\text{PDI}: \\text{Polydispersity Index}",
        examTip: "For natural biopolymers (proteins, DNA), PDI = 1 (monodisperse). For synthetic polymers, PDI > 1.",
        trap: "Osmotic pressure method determines M_n, while sedimentation/light scattering determines M_w."
      }
    ],
    keyPoints: [
      "Biodegradable polymers: PHBV (poly beta-hydroxybutyrate-co-beta-hydroxyvalerate) and Nylon-2-nylon-6.",
      "Teflon (PTFE) monomer is tetrafluoroethene (CF2=CF2), thermally stable and chemically inert (non-stick cookware).",
      "Vulcanization introduces sulfur cross-links at double bonds to increase elasticity, tensile strength, and resistance to oxidation."
    ]
  },
  // --- CLASS 12: CHEMISTRY IN EVERYDAY LIFE ---
  {
    id: "chem-12-everyday-life-drugs-cleansing",
    subject: "Chemistry",
    classLevel: "12",
    chapter: "Chemistry in Everyday Life",
    topic: "Medicinal Drugs, Food Additives & Soaps/Detergents",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Chemical substances play crucial biological and practical roles in medicine, nutrition preservation, and hygiene through specific molecular interactions and enzyme inhibition.",
    shortNotes: [
      "Antipyretics: Reduce body temperature in fever (Paracetamol, Aspirin). Aspirin inhibits synthesis of prostaglandins.",
      "Analgesics: Relieve pain without impairing consciousness. Non-narcotic (Aspirin, Paracetamol) vs Narcotic (Morphine, Codeine, Heroin).",
      "Antiseptics vs Disinfectants: Antiseptics applied to living tissues (0.2% phenol, Dettol = chloroxylenol + terpineol, Bithionol in soap, Tincture of iodine = 2-3% I2 in alcohol-water). Disinfectants applied to inanimate objects (1% phenol, 0.2-0.4 ppm Cl2). Phenol can be both based on concentration!",
      "Antibiotics: Bactericidal (Penicillin, Aminoglycosides, Ofloxacin) kill bacteria; Bacteriostatic (Erythromycin, Tetracycline, Chloramphenicol) inhibit bacterial growth.",
      "Artificial Sweeteners: Aspartame (100x sweeter than sucrose, unstable at cooking temp - cold foods only), Saccharin (550x, excreted unchanged), Sucralose (600x, trichloro derivative of sucrose, heat-stable), Alitame (2000x, difficult to control sweetness).",
      "Soaps: Sodium or potassium salts of long-chain fatty acids (stearic, palmitic, oleic). Formed by saponification: Fat/Oil + NaOH -> Soap + Glycerol.",
      "Detergents: Anionic (Sodium lauryl sulfate, cleans well, toothpastes), Cationic (Cetyltrimethylammonium bromide, germicidal, hair conditioners), Non-ionic (Polyethylene glycol stearate, liquid dishwashers)."
    ],
    formulas: [
      {
        name: "Saponification Reaction",
        formula: "\\text{Triglyceride} + 3\\text{NaOH} \\xrightarrow{\\Delta} 3\\text{RCOO}^-\\text{Na}^+ \\text{ (Soap)} + \\text{C}_3\\text{H}_5(\\text{OH})_3 \\text{ (Glycerol)}",
        variables: "R: \\text{Long hydrocarbon chain (e.g. } \\text{C}_{17}\\text{H}_{35} \\text{ stearate)}",
        examTip: "Potassium soaps are softer to the skin than sodium soaps and are used as toilet and shaving soaps.",
        trap: "Soaps do not work in hard water because Ca2+ and Mg2+ precipitate insoluble scum: 2RCOONa + Ca^2+ -> (RCOO)2Ca (s) + 2Na^+."
      },
      {
        name: "Cleansing Mechanism & Micelle Formation",
        formula: "\\text{CMC: Critical Micelle Concentration}, \\quad T_K: \\text{Kraft Temperature}",
        variables: "\\text{CMC: Minimum surfactant concentration for micelle formation}",
        examTip: "Hydrophobic alkyl tail points inward; hydrophilic polar head points outward into water.",
        trap: "Micelle formation occurs ONLY above both Kraft temperature (T_K) and Critical Micelle Concentration (CMC)."
      }
    ],
    keyPoints: [
      "Broad spectrum antibiotics kill or inhibit a wide range of Gram-positive and Gram-negative bacteria (e.g. Chloramphenicol, Ampicillin, Amoxicillin).",
      "Antacids: Magnesium hydroxide (Milk of Magnesia), Ranitidine (Zantac), Cimetidine prevent acid release by histamine-H2 receptor binding.",
      "Tranquilizers treat stress and anxiety: Equanil, Chlordiazepoxide, Meprobamate, Valium."
    ]
  }
];

function main() {
  const defPath = path.resolve('server/scripts/chemistryDataDefinition.ts');
  let content = fs.readFileSync(defPath, 'utf8');

  const insertIndex = content.lastIndexOf('];');
  if (insertIndex === -1) {
    console.error('Could not find end of fullChemistryData array');
    process.exit(1);
  }

  const itemsString = additionalBatch5Modules.map(mod => '  ' + JSON.stringify(mod, null, 2)).join(',\n');
  const updatedContent = content.slice(0, insertIndex) + ',\n' + itemsString + '\n' + content.slice(insertIndex);

  fs.writeFileSync(defPath, updatedContent, 'utf8');
  console.log(`Appended ${additionalBatch5Modules.length} Batch 5 modules to chemistryDataDefinition.ts!`);
}

main();
