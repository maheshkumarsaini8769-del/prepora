import fs from 'fs';
import path from 'path';

const batch3Modules: any[] = [
  // =========================================================================
  // CLASS 11 - CHAPTER 11: s-BLOCK ELEMENTS
  // =========================================================================
  {
    id: "chem-11-sbl-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "s-Block Elements (Alkali & Alkaline Earth Metals)",
    topic: "Alkali Metals (Group 1): Properties & Reactivity",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Group 1 metals have [Noble Gas] ns¹ valence configuration, extremely low ionization energies, and high electropositive character.",
    shortNotes: [
      "Atomic and ionic radii increase down the group: Li < Na < K < Rb < Cs.",
      "Density: General increase down group, EXCEPT Potassium is LIGHTER than Sodium (K < Na due to unusual volume expansion of K from 3d orbitals!).",
      "Hydration enthalpy: Li⁺ > Na⁺ > K⁺ > Rb⁺ > Cs⁺. Highly hydrated Li⁺ has smallest crystal radius but LARGEST hydrated radius, hence lowest ionic mobility in water!",
      "Flame coloration: Li (Crimson red), Na (Golden yellow), K (Violet/Lilac), Rb (Red violet), Cs (Blue).",
      "Reaction with oxygen: Li forms normal Oxide (Li₂O); Na forms Peroxide (Na₂O₂); K, Rb, Cs form Superoxides (KO₂, RbO₂, CsO₂ containing O₂⁻ paramagnetism).",
      "Solutions in liquid ammonia: Dilute solution is DEEP BLUE and conducting due to ammoniated electrons [e(NH₃)_y]⁻; Concentrated (> 3 M) turns BRONZE and diamagnetic."
    ],
    formulas: [
      {
        name: "Liquid Ammonia Dissolution Reaction",
        formula: "\\text{M} + (x + y)\\text{NH}_3 \\to [\\text{M}(\\text{NH}_3)_x]^+ + [e(\\text{NH}_3)_y]^-, \\quad \\text{Blue color due to ammoniated electrons}",
        variables: "M = alkali metal, ammoniated electron absorbs light in red region, imparting deep blue color",
        examTip: "Upon standing, the blue solution slowly decomposes liberating H₂ gas and forming sodamide: 2 Na + 2 NH₃ → 2 NaNH₂ + H₂.",
        trap: "In water, ionic mobility order is REVERSED: Cs⁺(aq) > Rb⁺(aq) > K⁺(aq) > Na⁺(aq) > Li⁺(aq) because Li⁺ has the largest hydration shell!"
      }
    ],
    keyPoints: [
      "Lithium shows anomalous behavior and diagonal relationship with Magnesium (LiCl and MgCl₂ are deliquescent, Li₂CO₃ decomposes on heating to Li₂O + CO₂).",
      "Potassium superoxide (KO₂) is used in submarines and space oxygen masks to absorb CO₂ and release O₂: 4 KO₂ + 2 CO₂ → 2 K₂CO₃ + 3 O₂."
    ]
  },
  {
    id: "chem-11-sbl-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "s-Block Elements (Alkali & Alkaline Earth Metals)",
    topic: "Alkaline Earth Metals (Group 2): Compounds & Plaster of Paris",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Group 2 elements have [Noble Gas] ns² configuration, smaller radii and higher charge densities than Group 1, forming divalent M²⁺ ions.",
    shortNotes: [
      "Flame coloration: Ca (Brick red), Sr (Crimson red), Ba (Apple green). Be and Mg do NOT impart color to flame due to high ionization energy (electrons not excited by Bunsen burner).",
      "Basic nature of hydroxides increases down group: Be(OH)₂ (Amphoteric) < Mg(OH)₂ < Ca(OH)₂ < Sr(OH)₂ < Ba(OH)₂ (Strong base).",
      "Solubility of sulfates DECREASES down group: BeSO₄ > MgSO₄ > CaSO₄ > SrSO₄ > BaSO₄ (Lattice energy remains high while hydration energy drops rapidly).",
      "Quicklime: CaO; Slaked lime: Ca(OH)₂; Milk of lime / Lime water: Ca(OH)₂ suspension/solution.",
      "Plaster of Paris: CaSO₄ · 1/2 H₂O (Calcium sulfate hemihydrate); Gypsum: CaSO₄ · 2 H₂O."
    ],
    formulas: [
      {
        name: "Plaster of Paris & Gypsum Interconversion",
        formula: "\\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O} (\\text{Gypsum}) \\xrightarrow{393 \\text{ K} (120^\\circ\\text{C})} \\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O} (\\text{POP}) + 1.5\\text{H}_2\\text{O}",
        variables: "Heating beyond 393 K (> 200°C) forms anhydrous CaSO₄, known as 'Dead Burnt Plaster' which loses setting properties",
        examTip: "Setting of Plaster of Paris is an EXOTHERMIC process accompanied by a slight volume expansion (~1%), making it ideal for casts and statues.",
        trap: "Do not heat gypsum above 393 K during POP preparation, or it loses all water of crystallization to become dead burnt plaster!"
      }
    ],
    keyPoints: [
      "Biological role: Ca²⁺ is essential for blood clotting and muscle contraction; Mg²⁺ is cofactor in ATP enzymes and central atom in chlorophyll.",
      "Beryllium shows diagonal relationship with Aluminum: both Be(OH)₂ and Al(OH)₃ are amphoteric; Be₂C and Al₄C₃ both yield methane (CH₄) on hydrolysis."
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 12: p-BLOCK ELEMENTS (GROUP 13 & 14)
  // =========================================================================
  {
    id: "chem-11-pbl-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "p-Block Elements (Group 13 & 14)",
    topic: "Group 13 (Boron Family): Inert Pair Effect & Diborane",
    weightage: "High",
    examTarget: "Both",
    concept: "Group 13 elements have ns² np¹ configuration. Reluctance of valence s-electrons to participate in bonding down the group is the Inert Pair Effect.",
    shortNotes: [
      "Stability of +1 oxidation state increases down the group, while +3 decreases: Tl⁺ > Tl³⁺ (Tl⁺ is stable, Tl³⁺ is a strong oxidizing agent).",
      "Atomic radius anomaly: Gallium is slightly SMALLER than Aluminum (Ga: 135 pm < Al: 143 pm) due to poor shielding by intervening 3d¹⁰ electrons (d-block contraction).",
      "Boron trihalides (BX₃) act as Lewis acids due to incomplete octet (6 electrons). Lewis acid strength order: BI₃ > BBr₃ > BCl₃ > BF₃ (reversed due to back-bonding in BF₃: 2pπ-2pπ overlap diminishes electron deficiency).",
      "Diborane (B₂H₆): Contains four terminal 2-center-2-electron (2c-2e) B-H bonds in a plane, and two bridging 3-center-2-electron (3c-2e) 'banana bonds' above and below the plane.",
      "Borax Bead Test: Heated borax forms transparent vitreous glassy bead of NaBO₂ + B₂O₃, which forms characteristic colored metaborates with transition metal salts (Cu: blue, Co: deep blue, Cr: green, Ni: brown)."
    ],
    formulas: [
      {
        name: "Diborane Banana Bond Structure & Cleavage",
        formula: "\\text{B}_2\\text{H}_6: 4 \\text{ Terminal } (2c-2e) \\text{ bonds} + 2 \\text{ Bridging } (3c-2e) \\text{ B-H-B bonds}, \\quad \\text{B is } sp^3 \\text{ hybridized}",
        variables: "Inorganic benzene: B₂H₆ + 2 NH₃ → B₃N₃H₆ (Borazine / Borazole, isoelectronic with benzene)",
        examTip: "Reaction with Lewis bases: Symmetrical cleavage with large bases like (CH₃)₃N, CO, THF gives 2 BH₃·L; Unsymmetrical cleavage with small bases like NH₃ gives [BH₂(NH₃)₂]⁺ [BH₄]⁻.",
        trap: "In diborane, terminal B-H bonds are normal covalent and short (1.19 Å); bridge B-H bonds are long (1.33 Å) and electron-deficient!"
      }
    ],
    keyPoints: [
      "Boric acid B(OH)₃ / H₃BO₃ is NOT a protonic acid, but a monobasic Lewis acid that accepts OH⁻ from water: B(OH)₃ + 2 H₂O ⇌ [B(OH)₄]⁻ + H₃O⁺ (pKa = 9.25).",
      "Adding cis-diols (glycerol, mannitol) enhances acidity of boric acid, making it titratable against NaOH with phenolphthalein."
    ]
  },
  {
    id: "chem-11-pbl-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "p-Block Elements (Group 13 & 14)",
    topic: "Group 14 (Carbon Family): Allotropes & Silicates",
    weightage: "High",
    examTarget: "Both",
    concept: "Group 14 elements (C, Si, Ge, Sn, Pb) have ns² np² configuration. Inert pair effect stabilizes +2 state over +4 down the group: Pb²⁺ > Pb⁴⁺ (PbO₂ is strong oxidizing agent; Sn²⁺ is reducing agent).",
    shortNotes: [
      "Catenation tendency order: C >> Si > Ge ≈ Sn >> Pb (decreases as bond dissociation energy C-C 348 kJ/mol > Si-Si 297 decreases).",
      "Carbon allotropes: Diamond (sp³, 3D tetrahedral network, hardest, insulator), Graphite (sp², hexagonal planar layers with van der Waals gap 3.4 Å, electrical conductor due to free π-electrons, lubricant), Fullerenes (Buckminsterfullerene C₆₀, 20 six-membered and 12 five-membered rings, soccer ball shape).",
      "Silicones: Organosilicon polymers with repeating -[R₂Si-O]ₙ- units. Hydrophobic, thermally stable, chemically inert.",
      "Silicates: Basic fundamental structural unit is tetrahedral [SiO₄]⁴⁻ (orthosilicates). Pyrosilicates [Si₂O₇]⁶⁻ share 1 oxygen; Cyclic/Chain share 2; Sheet silicates share 3; 3D network share all 4 oxygens.",
      "Zeolites: Aluminosilicates with open microporous structure, used as molecular sieves and water softeners (e.g. ZSM-5 converts alcohols directly into gasoline)."
    ],
    formulas: [
      {
        name: "Silicate Classification by Bridging Oxygens",
        formula: "\\text{Orthosilicate: } [\\text{SiO}_4]^{4-} (0 \\text{ shared}), \\quad \\text{Pyrosilicate: } [\\text{Si}_2\\text{O}_7]^{6-} (1), \\quad \\text{Chain/Cyclic: } [\\text{SiO}_3]_n^{2n-} (2), \\quad \\text{Sheet: } [\\text{Si}_2\\text{O}_5]_n^{2n-} (3)",
        variables: "Each shared oxygen atom reduces formal negative charge by 1",
        examTip: "Preparation of silicones: Hydrolysis of R₂SiCl₂ followed by condensation polymerization gives linear silicones; RSiCl₃ gives cross-linked 3D silicones; R₃SiCl acts as chain terminator.",
        trap: "CO is a toxic neutral gas that binds to hemoglobin 300× more strongly than O₂ forming carboxyhemoglobin, whereas CO₂ is acidic."
      }
    ],
    keyPoints: [
      "CCl₄ cannot be hydrolyzed by water because carbon has no vacant d-orbitals to accept water lone pair, while SiCl₄ hydrolyzes violently into silicic acid Si(OH)₄.",
      "Silica (SiO₂) dissolves in HF forming silicon tetrafluoride and hydrofluorosilicic acid: SiO₂ + 4 HF → SiF₄ + 2 H₂O; SiF₄ + 2 HF → H₂SiF₆ (Etching of glass)."
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 13: HYDROGEN & ITS COMPOUNDS
  // =========================================================================
  {
    id: "chem-11-hydr-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Hydrogen & Its Compounds",
    topic: "Hydrides, Water Hardness & Hydrogen Peroxide",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Hydrogen has 3 isotopes: Protium (¹H, 99.98%), Deuterium (²H / D, 0.015%), Tritium (³H / T, radioactive β⁻ emitter, t₁/₂ = 12.33 years, n/p = 2).",
    shortNotes: [
      "Hydrides classification: Ionic / Saline (s-block, e.g. NaH, CaH₂ 'Hydrolith', basic, conducts in molten state releasing H₂ at anode); Covalent / Molecular (p-block: Electron-deficient B₂H₆, Electron-precise CH₄, Electron-rich NH₃, H₂O); Metallic / Interstitial (d and f block, non-stoichiometric like TiH₁.₇, conduct electricity, hydride gap in groups 7, 8, 9).",
      "Water Hardness: Temporary (due to soluble bicarbonates of Ca and Mg: Ca(HCO₃)₂, Mg(HCO₃)₂; removed by boiling or Clark's method using slaked lime Ca(OH)₂); Permanent (due to chlorides and sulfates of Ca and Mg: CaCl₂, MgCl₂, CaSO₄, MgSO₄; removed by washing soda Na₂CO₃, Calgon process (Sodium hexametaphosphate Na₆P₆O₁₈), or Permutit / Ion-exchange resins).",
      "Calgon method: Complex anion [Na₄P₆O₁₈]²⁻ binds Ca²⁺ and Mg²⁺ as soluble complex [Na₂CaP₆O₁₈]²⁻.",
      "Hydrogen Peroxide (H₂O₂): Non-planar 'open book' structure with dihedral angle 111.5° (gas) and 90.2° (crystal). Acts as both oxidizing and reducing agent in both acidic and basic mediums."
    ],
    formulas: [
      {
        name: "Temporary Hardness Clark's Equation",
        formula: "\\text{Ca}(\\text{HCO}_3)_2 + \\text{Ca}(\\text{OH})_2 \\to 2 \\text{CaCO}_3 \\downarrow + 2 \\text{H}_2\\text{O}, \\quad \\text{Mg}(\\text{HCO}_3)_2 + 2 \\text{Ca}(\\text{OH})_2 \\to 2 \\text{CaCO}_3 \\downarrow + \\text{Mg}(\\text{OH})_2 \\downarrow + 2 \\text{H}_2\\text{O}",
        variables: "Mg requires TWO equivalents of Ca(OH)₂ because Mg(OH)₂ is precipitated instead of MgCO₃",
        examTip: "1 degree of hardness (Clark) = 1 part of CaCO₃ in 70,000 parts of water. In ppm: 1 ppm = 1 part CaCO₃ per 10⁶ parts water.",
        trap: "In reducing action of H₂O₂, OXYGEN IS ALWAYS LIBERATED: H₂O₂ + 2 KMnO₄ + 3 H₂SO₄ → K₂SO₄ + 2 MnSO₄ + 8 H₂O + 5 O₂↑."
      }
    ],
    keyPoints: [
      "Heavy water (D₂O) has higher boiling point (101.4°C), melting point (3.8°C), and density (1.11 g/mL) than H₂O, but lower dielectric constant. Used as moderator in nuclear reactors.",
      "Water gas (CO + H₂, also called Syngas / Synthesis gas) is produced by coal gasification: C + H₂O (1270 K) → CO + H₂."
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 14: ENVIRONMENTAL CHEMISTRY
  // =========================================================================
  {
    id: "chem-11-env-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Environmental Chemistry",
    topic: "Atmospheric Pollution, Smog & Ozone Depletion",
    weightage: "Medium",
    examTarget: "Both",
    concept: "Atmospheric chemistry encompasses pollutant mechanisms in troposphere (0-10 km) and stratosphere (10-50 km, protective ozone shield).",
    shortNotes: [
      "Classical Smog (London smog): Occurs in cool humid climate; reducing nature; contains smoke, fog, and SO₂; forms acidic droplets.",
      "Photochemical Smog (Los Angeles smog): Occurs in warm, dry, sunny climate; oxidizing nature; initiated by sunlight on vehicle exhausts (NOx and unsaturated hydrocarbons); contains Ozone (O₃), PAN (Peroxyacetyl nitrate, CH₃COOONO₂), Formaldehyde, and Acrolein.",
      "Acid Rain: Rainwater with pH < 5.6. Caused by atmospheric oxidation of SO₂ and NO₂ forming H₂SO₄ and HNO₃: 2 SO₂ + O₂ + 2 H₂O → 2 H₂SO₄; 4 NO₂ + O₂ + 2 H₂O → 4 HNO₃. Corrodes marble statues (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂: 'Stone leprosy').",
      "Ozone Layer Depletion: In stratosphere, chlorofluorocarbons (CFCs / Freons like CF₂Cl₂) photodissociate by UV light releasing reactive Chlorine free radicals (·Cl). One ·Cl radical catalytically destroys over 100,000 ozone molecules: ·Cl + O₃ → ·ClO + O₂; ·ClO + ·O → ·Cl + O₂.",
      "Water Pollution standards: Biochemical Oxygen Demand (BOD) measures organic matter. Pure drinking water has BOD < 5 ppm; Highly polluted water has BOD > 17 ppm. Fluoride in drinking water: Up to 1 ppm hardens enamel (fluoroapatite [3Ca₃(PO₄)₂·CaF₂]); > 2 ppm causes brown mottling of teeth; > 10 ppm causes bone and skeletal fluorosis."
    ],
    formulas: [
      {
        name: "Photochemical Smog Free Radical Cascade",
        formula: "\\text{NO}_2 \\xrightarrow{h\\nu} \\text{NO} + \\text{O}, \\quad \\text{O} + \\text{O}_2 \\to \\text{O}_3, \\quad \\text{O}_3 + \\text{NO} \\to \\text{NO}_2 + \\text{O}_2, \\quad \\text{Hydrocarbon} + \\text{NO}_2 + \\text{O}_2 \\to \\text{PAN}",
        variables: "PAN = Peroxyacetyl nitrate (powerful eye irritant and plant toxin)",
        examTip: "Maximum permissible concentration in drinking water: Lead = 50 ppb (0.05 ppm), Nitrate = 50 ppm (excess causes 'Blue Baby Syndrome' / Methemoglobinemia), Sulfate = 500 ppm.",
        trap: "Normal clean rainwater has pH ≈ 5.6 (slightly acidic due to dissolved atmospheric CO₂ forming weak carbonic acid H₂CO₃). Only rain with pH < 5.6 is classified as Acid Rain!"
      }
    ],
    keyPoints: [
      "Green Chemistry principles focus on minimizing waste generation, high atom economy, and using benign solvents like supercritical CO₂.",
      "Pesticide bioaccumulation: Non-biodegradable organochlorines like DDT concentrate up food chains, thinning bird eggshells."
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 15: PRINCIPLES RELATED TO PRACTICAL CHEMISTRY
  // =========================================================================
  {
    id: "chem-11-prc-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Principles Related to Practical Chemistry",
    topic: "Systematic Qualitative Salt Analysis (Cations & Anions)",
    weightage: "High",
    examTarget: "Both",
    concept: "Qualitative analysis systematically separates and confirms basic radicals (cations) and acidic radicals (anions) using selective precipitation reagents.",
    shortNotes: [
      "Group 0: NH₄⁺ (Reagent: NaOH, warms releasing NH₃ gas with pungent odor, turns Nessler's reagent K₂[HgI₄] brown precipitate 'Iodide of Millon's base').",
      "Group I: Pb²⁺, Ag⁺, Hg₂²⁺ (Group reagent: dilute HCl; Precipitates as insoluble chlorides PbCl₂, AgCl, Hg₂Cl₂).",
      "Group II: Cu²⁺, Pb²⁺, Bi³⁺, Cd²⁺, As³⁺, Sb³⁺ (Group reagent: H₂S gas in presence of dilute HCl; Precipitates as sulphides: CuS black, CdS bright yellow, As₂S₃ yellow).",
      "Group III: Fe³⁺, Al³⁺, Cr³⁺ (Group reagent: NH₄OH in presence of NH₄Cl; Precipitates as hydroxides: Fe(OH)₃ reddish brown, Al(OH)₃ gelatinous white, Cr(OH)₃ green).",
      "Group IV: Co²⁺, Ni²⁺, Mn²⁺, Zn²⁺ (Group reagent: H₂S gas in presence of NH₄OH; Precipitates as sulphides: CoS/NiS black, MnS buff/flesh colored, ZnS dirty white).",
      "Group V: Ba²⁺, Sr²⁺, Ca²⁺ (Group reagent: (NH₄)₂CO₃ in presence of NH₄OH and NH₄Cl; Precipitates as white carbonates: BaCO₃, SrCO₃, CaCO₃).",
      "Group VI: Mg²⁺ (Reagent: Disodium hydrogen phosphate Na₂HPO₄ in NH₄OH; Forms white crystalline precipitate of Magnesium ammonium phosphate Mg(NH₄)PO₄)."
    ],
    formulas: [
      {
        name: "Common Ion Control of Group Reagents",
        formula: "\\text{Group II: Dilute HCl suppresses } \\text{H}_2\\text{S} \\rightleftharpoons 2\\text{H}^+ + \\text{S}^{2-} \\implies [\\text{S}^{2-}] \\text{ low} \\implies \\text{Only low } K_{sp} \\text{ ppt}; \\; \\text{Group III: } \\text{NH}_4\\text{Cl suppresses } \\text{NH}_4\\text{OH} \\implies [\\text{OH}^-] \\text{ low}",
        variables: "In Group II, low [S²⁻] precipitates only Group II sulphides (very small K_sp), leaving Group IV in solution",
        examTip: "Chromyl Chloride Test confirms Chloride: Salt + solid K₂Cr₂O₇ + conc. H₂SO₄ heat → Reddish brown vapors of CrO₂Cl₂ (Chromyl chloride). Passed into NaOH forms yellow Na₂CrO₄, which gives yellow ppt with lead acetate (PbCrO₄).",
        trap: "Chromyl chloride test FAILS for covalent or sparingly soluble chlorides: Hg₂Cl₂, HgCl₂, AgCl, PbCl₂, SnCl₂!"
      },
      {
        name: "Brown Ring Test for Nitrate (NO3-)",
        formula: "\\text{NO}_3^- + 3 \\text{Fe}^{2+} + 4 \\text{H}^+ \\to \\text{NO} + 3 \\text{Fe}^{3+} + 2 \\text{H}_2\\text{O}, \\quad [\\text{Fe}(\\text{H}_2\\text{O})_6]^{2+} + \\text{NO} \\to [\\text{Fe}(\\text{H}_2\\text{O})_5(\\text{NO})]^{2+} (\\text{Brown ring}) + \\text{H}_2\\text{O}",
        variables: "In the brown complex [Fe(H₂O)₅(NO)]²⁺, Iron is in +1 oxidation state and NO is nitrosonium ion (NO⁺) with 3 unpaired electrons (μ = 3.87 BM)!",
        examTip: "Carefully pour concentrated H₂SO₄ down the side of test tube without shaking to form sharp brown ring at the interface.",
        trap: "Nitrite (NO₂⁻) also gives brown ring test with dilute H₂SO₄; Bromide and iodide interfere by liberating colored halogens (Br₂, I₂)."
      }
    ],
    keyPoints: [
      "Ni²⁺ is confirmed with Dimethylglyoxime (DMG) in ammoniacal medium, forming rosy red precipitate of bis(dimethylglyoximato)nickel(II) stabilized by intramolecular hydrogen bonds.",
      "Cu²⁺ solution turns deep blue with excess ammonia due to formation of tetraamminecopper(II) complex [Cu(NH₃)₄]²⁺."
    ]
  }
];

async function appendBatch3() {
  const targetFile = path.resolve('server/scripts/chemistryDataDefinition.ts');
  console.log(`Reading ${targetFile}...`);
  let content = fs.readFileSync(targetFile, 'utf8');

  const lastIndex = content.lastIndexOf('];');
  if (lastIndex === -1) {
    console.error('Could not find closing bracket in chemistryDataDefinition.ts');
    return;
  }

  const modulesString = ',\n' + JSON.stringify(batch3Modules, null, 2).slice(1, -1).trim();
  const updatedContent = content.slice(0, lastIndex) + modulesString + '\n];\n';
  fs.writeFileSync(targetFile, updatedContent, 'utf8');
  console.log(`Appended ${batch3Modules.length} Batch 3 modules to chemistryDataDefinition.ts!`);
}

appendBatch3();
