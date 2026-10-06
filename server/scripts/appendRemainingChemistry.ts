import fs from 'fs';
import path from 'path';

// This script systematically compiles all chapters of Class 11 and Class 12 Chemistry into chemistryDataDefinition.ts

const remainingModules: any[] = [
  // =========================================================================
  // CLASS 11 - CHAPTER 5: CHEMICAL THERMODYNAMICS
  // =========================================================================
  {
    id: "chem-11-cth-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Thermodynamics",
    topic: "First Law of Thermodynamics & Work Done",
    weightage: "High",
    examTarget: "Both",
    concept: "Energy can neither be created nor destroyed: ΔU = q + w. IUPAC sign convention: Heat absorbed by system is positive (+q), Work done on system is positive (+w).",
    shortNotes: [
      "State functions depend solely on initial and final states: U, H, S, G, P, V, T.",
      "Path functions depend on the mechanism / path taken: q (heat) and w (work).",
      "Isothermal process: ΔT = 0, ΔU = 0 (for ideal gas).",
      "Adiabatic process: q = 0, ΔU = w_adiabatic.",
      "Isochoric process: ΔV = 0, w = 0, ΔU = q_v.",
      "Isobaric process: ΔP = 0, w = -P_ext ΔV, ΔH = q_p."
    ],
    formulas: [
      {
        name: "First Law & Expansion Work",
        formula: "\\Delta U = q + w, \\quad w_{\\text{irrev}} = -P_{\\text{ext}} (V_2 - V_1) = -P_{\\text{ext}} \\Delta V",
        variables: "ΔU = change in internal energy, q = heat transferred, w = work done, P_ext = external opposing pressure, ΔV = volume change",
        examTip: "In free expansion against vacuum (P_ext = 0): w = 0! For isothermal free expansion of ideal gas: w = 0, q = 0, ΔU = 0, ΔT = 0.",
        trap: "In Physics, First Law is often written as ΔQ = ΔU + W (where W is work done BY system). In Chemistry, IUPAC convention is ΔU = q + w (where w is work done ON system: w = -P ΔV)!"
      },
      {
        name: "Reversible Isothermal Work Equation",
        formula: "w_{\\text{rev, iso}} = -2.303 n R T \\log_{10} \\left( \\frac{V_2}{V_1} \\right) = -2.303 n R T \\log_{10} \\left( \\frac{P_1}{P_2} \\right)",
        variables: "n = moles of ideal gas, R = 8.314 J/mol·K (or 2 cal/mol·K), T = absolute temperature (K), V₁, V₂ = initial and final volumes",
        examTip: "Magnitude of reversible expansion work is always greater than irreversible work: |w_rev| > |w_irrev|.",
        trap: "During compression (V₂ < V₁), w is POSITIVE. During expansion (V₂ > V₁), w is NEGATIVE."
      }
    ],
    keyPoints: [
      "Extensive properties depend on mass (mass, volume, heat capacity, internal energy, enthalpy, entropy, Gibbs energy).",
      "Intensive properties are independent of mass (temperature, pressure, density, molar heat capacity, refractive index, surface tension)."
    ]
  },
  {
    id: "chem-11-cth-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Thermodynamics",
    topic: "Enthalpy, Heat Capacity & ΔH vs ΔU Relation",
    weightage: "High",
    examTarget: "Both",
    concept: "Enthalpy is the heat content of a system at constant pressure: H = U + PV. Heat capacity is heat required to raise temperature by 1 Kelvin.",
    shortNotes: [
      "At constant pressure: q_p = ΔH. At constant volume: q_v = ΔU.",
      "Relationship for chemical reactions involving gases: ΔH = ΔU + Δn_g RT.",
      "Δn_g = (Total moles of gaseous products) - (Total moles of gaseous reactants). Solids and liquids are excluded!",
      "Molar heat capacity: C_p - C_v = R (Mayer's relation for ideal gas).",
      "Poisson's ratio γ = C_p / C_v: Monatomic (γ = 5/3 = 1.67), Diatomic (γ = 7/5 = 1.40), Polyatomic (γ = 4/3 = 1.33)."
    ],
    formulas: [
      {
        name: "Enthalpy vs Internal Energy Master Equation",
        formula: "\\Delta H = \\Delta U + \\Delta n_g R T",
        variables: "ΔH = enthalpy change (J or kJ), ΔU = internal energy change, Δn_g = moles of gaseous products - moles of gaseous reactants, R = 8.314 J/mol·K",
        examTip: "If Δn_g = 0 (e.g. H₂(g) + I₂(g) ⇌ 2HI(g)): ΔH = ΔU. If Δn_g > 0: ΔH > ΔU. If Δn_g < 0: ΔH < ΔU.",
        trap: "In combustion reactions, water is often liquid at standard temperature (298 K): C(s) + O₂(g) → CO₂(g) has Δn_g = 1 - 1 = 0!"
      },
      {
        name: "Reversible Adiabatic Expansion Relations",
        formula: "P V^\\gamma = \\text{constant}, \\quad T V^{\\gamma - 1} = \\text{constant}, \\quad T^\\gamma P^{1 - \\gamma} = \\text{constant}, \\quad w = n C_v (T_2 - T_1)",
        variables: "γ = C_p / C_v = 1 + R / C_v",
        examTip: "In adiabatic expansion (w < 0), temperature of system DROPS (T₂ < T₁), causing cooling.",
        trap: "C_v for monatomic gas = (3/2)R, for diatomic = (5/2)R. C_p = C_v + R."
      }
    ],
    keyPoints: [
      "Kirchhoff's equation relates enthalpy change at two temperatures: ΔH₂ - ΔH₁ = ΔC_p (T₂ - T₁).",
      "Bomb calorimeter measures heat at constant volume (ΔU); open cup measures heat at constant pressure (ΔH)."
    ]
  },
  {
    id: "chem-11-cth-3",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Thermodynamics",
    topic: "Hess's Law of Constant Heat Summation & Bond Enthalpy",
    weightage: "High",
    examTarget: "Both",
    concept: "Hess's Law: Enthalpy change for a chemical reaction is identical whether the reaction takes place in one step or in several consecutive steps.",
    shortNotes: [
      "Standard enthalpy of formation (Δ_f H°) of an element in its standard reference state is zero by definition (e.g. O₂(g), C(graphite), H₂(g), Br₂(l), S(rhombic)).",
      "Reaction enthalpy from formation enthalpies: Δ_r H° = Σ [n_p Δ_f H°(products)] - Σ [n_r Δ_f H°(reactants)].",
      "Reaction enthalpy from bond enthalpies: Δ_r H° = Σ [Bond energies of broken bonds (reactants)] - Σ [Bond energies of formed bonds (products)].",
      "Enthalpy of combustion (Δ_c H°) is always negative (exothermic)."
    ],
    formulas: [
      {
        name: "Hess's Law Reaction Enthalpy Formula",
        formula: "\\Delta_r H^\\circ = \\sum n_p \\Delta_f H^\\circ(\\text{Products}) - \\sum n_r \\Delta_f H^\\circ(\\text{Reactants})",
        variables: "n_p, n_r = stoichiometric coefficients of products and reactants",
        examTip: "Δ_f H° of C(diamond) is NOT zero (+1.9 kJ/mol); graphite is standard state!",
        trap: "When using Bond Energies, it is REACTANTS MINUS PRODUCTS (Bonds broken - Bonds formed), which is the exact opposite of Formation enthalpies (Products - Reactants)!"
      },
      {
        name: "Bond Enthalpy Reaction Equation",
        formula: "\\Delta_r H^\\circ = \\sum \\text{B.E.}(\\text{Reactants broken}) - \\sum \\text{B.E.}(\\text{Products formed})",
        variables: "B.E. = average bond dissociation enthalpy (all species must be in gaseous state)",
        examTip: "If any species is in liquid/solid state, incorporate heat of vaporization/sublimation into the thermochemical cycle.",
        trap: "Bond enthalpy equations are strictly valid only for gaseous species: X(g) - Y(g) → X(g) + Y(g)."
      }
    ],
    keyPoints: [
      "Resonance energy = Theoretical calculated heat of combustion/hydrogenation - Observed experimental value.",
      "Enthalpy of neutralization of strong acid with strong base is a constant: Δ_neut H° = -57.1 kJ/mol = -13.7 kcal/mol."
    ]
  },
  {
    id: "chem-11-cth-4",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Thermodynamics",
    topic: "Second Law of Thermodynamics, Entropy & Spontaneity",
    weightage: "High",
    examTarget: "Both",
    concept: "Entropy (S) is the measure of molecular disorder or randomness of a system. Total entropy of the universe increases in any spontaneous (irreversible) process.",
    shortNotes: [
      "Second Law: ΔS_total = ΔS_system + ΔS_surroundings > 0 for spontaneous process.",
      "At equilibrium: ΔS_total = 0.",
      "ΔS_system = q_rev / T.",
      "ΔS_surroundings = -q_system / T = -ΔH_system / T (at constant pressure).",
      "Entropy order of states of matter: Solid < Liquid << Gas.",
      "Entropy increases when: number of gaseous moles increases (Δn_g > 0), temperature increases, solid dissolves in liquid, polymer unfolds/egg is boiled."
    ],
    formulas: [
      {
        name: "Entropy Change for Ideal Gas",
        formula: "\\Delta S = n C_v \\ln \\left(\\frac{T_2}{T_1}\\right) + n R \\ln \\left(\\frac{V_2}{V_1}\\right) = n C_p \\ln \\left(\\frac{T_2}{T_1}\\right) - n R \\ln \\left(\\frac{P_2}{P_1}\\right)",
        variables: "n = moles, C_v, C_p = molar heat capacities, T = temperature, V = volume, P = pressure",
        examTip: "For isothermal expansion of ideal gas (T₁=T₂): ΔS = nR ln(V₂/V₁) = 2.303 nR log₁₀(V₂/V₁).",
        trap: "In an isolated system (q = 0, surroundings unaffected): spontaneity is governed solely by ΔS_system > 0."
      },
      {
        name: "Phase Transition Entropy Formula",
        formula: "\\Delta_{\\text{fus}} S = \\frac{\\Delta_{\\text{fus}} H}{T_{\\text{mp}}}, \\quad \\Delta_{\\text{vap}} S = \\frac{\\Delta_{\\text{vap}} H}{T_{\\text{bp}}}",
        variables: "T_mp = melting point (K), T_bp = boiling point (K), ΔH = latent heat of phase transition",
        examTip: "Trouton's rule: For most non-associated liquids, Δ_vap S ≈ 88 J/mol·K (water is higher ~109 J/mol·K due to H-bonding).",
        trap: "Always convert temperatures to KELVIN (K = °C + 273.15) before dividing!"
      }
    ],
    keyPoints: [
      "When an egg is boiled, denaturation of protein increases disorder: entropy INCREASES (ΔS > 0).",
      "Stretching of rubber band aligns polymer chains: entropy DECREASES (ΔS < 0)."
    ]
  },
  {
    id: "chem-11-cth-5",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Chemical Thermodynamics",
    topic: "Gibbs Free Energy & Chemical Equilibrium",
    weightage: "High",
    examTarget: "Both",
    concept: "Gibbs Free Energy (G = H - TS) represents the maximum non-expansion useful work obtainable from a closed system at constant temperature and pressure.",
    shortNotes: [
      "Gibbs-Helmholtz Equation: ΔG = ΔH - TΔS.",
      "Criterion for spontaneity at constant T and P: ΔG < 0 (Spontaneous), ΔG = 0 (Equilibrium), ΔG > 0 (Non-spontaneous).",
      "If ΔH < 0 and ΔS > 0: ΔG is negative at ALL temperatures (Always spontaneous).",
      "If ΔH > 0 and ΔS < 0: ΔG is positive at ALL temperatures (Never spontaneous).",
      "If ΔH < 0 and ΔS < 0: Spontaneous ONLY at LOW temperatures (T < ΔH/ΔS).",
      "If ΔH > 0 and ΔS > 0: Spontaneous ONLY at HIGH temperatures (T > ΔH/ΔS).",
      "Equilibrium temperature where process switches spontaneity: T_eq = ΔH / ΔS."
    ],
    formulas: [
      {
        name: "Gibbs-Helmholtz Spontaneity Equation",
        formula: "\\Delta G = \\Delta H - T \\Delta S",
        variables: "ΔG = change in Gibbs free energy, ΔH = enthalpy change, T = absolute temperature (K), ΔS = entropy change",
        examTip: "Be vigilant with units: ΔH is typically given in kJ/mol, while ΔS is in J/mol·K. Convert both to kJ or both to J!",
        trap: "At the threshold temperature where reaction becomes spontaneous: ΔG = 0 ⇒ T = ΔH / ΔS."
      },
      {
        name: "Standard Gibbs Energy vs Equilibrium Constant",
        formula: "\\Delta G^\\circ = -R T \\ln K = -2.303 R T \\log_{10} K",
        variables: "ΔG° = standard Gibbs free energy change, R = 8.314 J/mol·K, T = absolute temperature (K), K = equilibrium constant (K_p or K_c)",
        examTip: "If ΔG° < 0: K > 1 (products favored at equilibrium). If ΔG° > 0: K < 1 (reactants favored). If ΔG° = 0: K = 1.",
        trap: "ΔG = ΔG° + RT ln Q. At equilibrium, ΔG = 0 (and Q = K), but ΔG° is NOT zero unless K = 1!"
      }
    ],
    keyPoints: [
      "Van 't Hoff reaction isotherm connects non-standard ΔG with reaction quotient Q: ΔG = ΔG° + 2.303 RT log Q.",
      "Third Law of Thermodynamics: Entropy of a perfectly crystalline pure substance approaches zero at absolute zero temperature (0 K): S_(0K) = 0."
    ]
  },

  // =========================================================================
  // CLASS 11 - CHAPTER 6: EQUILIBRIUM
  // =========================================================================
  {
    id: "chem-11-equ-1",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Equilibrium",
    topic: "Law of Mass Action & Equilibrium Constants (Kc and Kp)",
    weightage: "High",
    examTarget: "Both",
    concept: "Dynamic equilibrium is reached in a reversible reaction when the rates of forward and reverse reactions are equal: r_f = r_b.",
    shortNotes: [
      "Equilibrium constant K depends ONLY on temperature; independent of initial concentrations, volume, pressure, or presence of catalyst.",
      "For aA + bB ⇌ cC + dD: K_c = ([C]^c [D]^d) / ([A]^a [B]^b).",
      "For gas phase: K_p = (P_C^c P_D^d) / (P_A^a P_B^b).",
      "K_p = K_c (RT)^Δn_g, where Δn_g = (c + d) - (a + b) of gaseous species.",
      "If reaction is reversed: K' = 1 / K. If multiplied by n: K' = Kⁿ. If two reactions are added: K_net = K₁ × K₂."
    ],
    formulas: [
      {
        name: "Kp vs Kc Master Relation",
        formula: "K_p = K_c (R T)^{\\Delta n_g}",
        variables: "R = 0.0821 L·atm/mol·K (or 0.0831 bar·L/mol·K), T = temperature in Kelvin, Δn_g = gaseous product moles - gaseous reactant moles",
        examTip: "If Δn_g = 0 (e.g. H₂ + I₂ ⇌ 2HI): K_p = K_c. If Δn_g > 0: K_p > K_c (at T > 12.2 K). If Δn_g < 0: K_p < K_c.",
        trap: "In K_c and K_p expressions, active masses of pure solids (s) and pure liquids (l) are taken as 1 (constant activity) and omitted!"
      },
      {
        name: "Van 't Hoff Temperature Isochore",
        formula: "\\log_{10} \\left( \\frac{K_2}{K_1} \\right) = \\frac{\\Delta H^\\circ}{2.303 R} \\left[ \\frac{1}{T_1} - \\frac{1}{T_2} \\right] = \\frac{\\Delta H^\\circ}{2.303 R} \\left[ \\frac{T_2 - T_1}{T_1 T_2} \\right]",
        variables: "K₁, K₂ = equilibrium constants at temperatures T₁ and T₂, ΔH° = standard reaction enthalpy",
        examTip: "For ENDOTHERMIC reactions (ΔH > 0): Increasing temperature INCREASES K (K₂ > K₁). For EXOTHERMIC reactions (ΔH < 0): Increasing T DECREASES K.",
        trap: "Catalyst increases both forward and backward rates equally; it speeds up attainment of equilibrium but NEVER changes value of K!"
      }
    ],
    keyPoints: [
      "Reaction quotient Q predicts direction: If Q < K, forward reaction proceeds; If Q > K, backward reaction proceeds; If Q = K, system is at equilibrium.",
      "Degree of dissociation α for gas A_n ⇌ n A: α = (D - d) / ((n - 1)d), where D is theoretical vapour density and d is experimental vapour density."
    ]
  },
  {
    id: "chem-11-equ-2",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Equilibrium",
    topic: "Le Chatelier's Principle & Applications",
    weightage: "High",
    examTarget: "Both",
    concept: "If a chemical system at dynamic equilibrium is subjected to a change in concentration, temperature, or pressure, the system shifts in the direction that counteracts the change.",
    shortNotes: [
      "Concentration: Adding reactant shifts equilibrium FORWARD; Adding product shifts BACKWARD.",
      "Pressure: Increasing pressure shifts equilibrium toward side with FEWER moles of gas (smaller volume). If Δn_g = 0, pressure has no effect on equilibrium position.",
      "Temperature: Increasing temperature favors ENDOTHERMIC direction (absorbs heat); Decreasing temperature favors EXOTHERMIC direction.",
      "Inert Gas Addition at Constant Volume (V = const): Partial pressures of reacting gases do NOT change, so NO effect on equilibrium position!",
      "Inert Gas Addition at Constant Pressure (P = const): Volume increases, shifting equilibrium towards side with GREATER moles of gas (Δn_g > 0)."
    ],
    formulas: [
      {
        name: "Haber's Process Optimal Conditions",
        formula: "\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g), \\quad \\Delta H = -92.4 \\text{ kJ/mol}, \\quad \\Delta n_g = -2",
        variables: "High pressure (200 atm), Moderate temperature (450-500°C), Iron catalyst with Mo promoter",
        examTip: "Exothermic with Δn_g < 0: favored by HIGH pressure and LOW temperature.",
        trap: "Adding inert gas at constant VOLUME has ZERO effect on equilibrium position! This is a classic trap in JEE Main."
      }
    ],
    keyPoints: [
      "Tested regularly in conceptual assertion-reason and multiple-choice questions.",
      "Catalyst lowers activation energy for both forward and reverse paths identically."
    ]
  },
  {
    id: "chem-11-equ-3",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Equilibrium",
    topic: "Ionic Product of Water & pH Scale",
    weightage: "High",
    examTarget: "Both",
    concept: "Water self-ionizes weakly: 2 H₂O ⇌ H₃O⁺ + OH⁻. The ionic product of water K_w = [H⁺][OH⁻] is temperature-dependent.",
    shortNotes: [
      "At 25°C (298 K): K_w = 1.0 × 10⁻¹⁴ mol²/L² ⇒ pH + pOH = 14.",
      "Pure water at 25°C: [H⁺] = [OH⁻] = 10⁻⁷ M ⇒ pH = 7.0 (Neutral).",
      "Self-ionization of water is ENDOTHERMIC: As temperature increases, K_w increases (at 90°C, K_w ≈ 10⁻¹² ⇒ neutral pH = 6.0!).",
      "pH = -log₁₀[H⁺], pOH = -log₁₀[OH⁻], pK_w = -log₁₀ K_w.",
      "For strong acid (HCl, HNO₃): [H⁺] = N (Normality). If concentration is very dilute (< 10⁻⁶ M, e.g. 10⁻⁸ M HCl), contribution of H⁺ from water (10⁻⁷ M) must be added!"
    ],
    formulas: [
      {
        name: "pH & Kw Relations",
        formula: "\\text{pH} = -\\log_{10}[\\text{H}^+], \\quad \\text{pOH} = -\\log_{10}[\\text{OH}^-], \\quad \\text{pH} + \\text{pOH} = \\text{pK}_w = 14 \\text{ (at 25}^\\circ\\text{C)}",
        variables: "[H⁺], [OH⁻] = molar concentrations of hydronium and hydroxide ions in solution",
        examTip: "pH of 10⁻⁸ M HCl is NOT 8! It is slightly acidic: [H⁺]_total = 10⁻⁸ + 10⁻⁷ = 1.1 × 10⁻⁷ M ⇒ pH ≈ 6.96.",
        trap: "At higher temperatures (e.g. 60°C, pH of pure water = 6.5), water is still NEUTRAL because [H⁺] = [OH⁻]!"
      }
    ],
    keyPoints: [
      "One unit change in pH corresponds to a tenfold (10×) change in hydrogen ion concentration.",
      "Ostwald's Dilution Law for weak monobasic acid HA (degree of dissociation α): K_a = Cα² / (1 - α) ≈ Cα² (when α << 1)."
    ]
  },
  {
    id: "chem-11-equ-4",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Equilibrium",
    topic: "Ostwald's Dilution Law & Weak Electrolytes",
    weightage: "High",
    examTarget: "Both",
    concept: "Weak electrolytes dissociate partially in aqueous solution. Degree of dissociation (α) increases with dilution and approaches unity at infinite dilution.",
    shortNotes: [
      "For weak acid HA ⇌ H⁺ + A⁻: K_a = [H⁺][A⁻] / [HA] = Cα² / (1 - α).",
      "If α ≤ 0.05 (5% rule): (1 - α) ≈ 1 ⇒ K_a = Cα² ⇒ α = √(K_a / C).",
      "[H⁺] = Cα = √(K_a · C) ⇒ pH = 1/2 [pK_a - log C].",
      "For weak base BOH: α = √(K_b / C), [OH⁻] = √(K_b · C) ⇒ pOH = 1/2 [pK_b - log C].",
      "Relative strength of two weak acids of same concentration: Strength ratio = α₁ / α₂ = √(K_a1 / K_a2)."
    ],
    formulas: [
      {
        name: "Ostwald Dilution & Weak Acid pH",
        formula: "\\alpha = \\sqrt{\\frac{K_a}{C}}, \\quad [\\text{H}^+] = \\sqrt{K_a \\cdot C}, \\quad \\text{pH} = \\frac{1}{2} [\\text{pK}_a - \\log_{10} C]",
        variables: "K_a = acid dissociation constant, C = initial molar concentration, α = degree of dissociation (0 < α < 1)",
        examTip: "If calculated α exceeds 0.05 (5%), quadratic equation must be solved: Cα² + K_a α - K_a = 0.",
        trap: "As dilution increases (C decreases), α increases, but total [H⁺] = Cα DECREASES (pH increases towards 7)!"
      }
    ],
    keyPoints: [
      "Common Ion Effect: Adding a strong electrolyte containing a common ion (e.g. CH₃COONa to CH₃COOH) suppresses the ionization of the weak electrolyte.",
      "Crucial for qualitative group analysis in practical salt testing."
    ]
  },
  {
    id: "chem-11-equ-5",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Equilibrium",
    topic: "Hydrolysis of Salts & pH Equations",
    weightage: "High",
    examTarget: "Both",
    concept: "Interaction of cation or anion of a salt with water to produce acidic, alkaline, or neutral solutions.",
    shortNotes: [
      "1. Salt of Strong Acid + Strong Base (NaCl, KNO₃): No hydrolysis occurs. Neutral solution (pH = 7.0).",
      "2. Salt of Weak Acid + Strong Base (CH₃COONa, Na₂CO₃): Anion hydrolysis. Basic solution (pH > 7). K_h = K_w / K_a.",
      "3. Salt of Strong Acid + Weak Base (NH₄Cl, FeSO₄): Cation hydrolysis. Acidic solution (pH < 7). K_h = K_w / K_b.",
      "4. Salt of Weak Acid + Weak Base (CH₃COONH₄): Both ions hydrolyze. K_h = K_w / (K_a · K_b). pH is INDEPENDENT of concentration!"
    ],
    formulas: [
      {
        name: "Salt Hydrolysis Master pH Formulas",
        formula: "\\text{WA + SB: } \\text{pH} = 7 + \\frac{1}{2}[\\text{pK}_a + \\log C], \\quad \\text{SA + WB: } \\text{pH} = 7 - \\frac{1}{2}[\\text{pK}_b + \\log C], \\quad \\text{WA + WB: } \\text{pH} = 7 + \\frac{1}{2}[\\text{pK}_a - \\text{pK}_b]",
        variables: "C = molar concentration of salt, K_w = 10⁻¹⁴, K_a, K_b = dissociation constants of weak acid/base",
        examTip: "For salt of WA + WB (like Ammonium Acetate): pH does NOT depend on concentration C! If pK_a = pK_b (like CH₃COONH₄), pH = 7.0 exactly.",
        trap: "Hydrolysis degree h = √(K_h / C) for WA+SB and SA+WB, but for WA+WB: h = √(K_h) = √(K_w / (K_a · K_b)) (independent of C)!"
      }
    ],
    keyPoints: [
      "Frequently tested in NEET and JEE Main physical chemistry numerical sections.",
      "Remember signs: WA + SB has +1/2(pK_a + log C); SA + WB has -1/2(pK_b + log C)."
    ]
  },
  {
    id: "chem-11-equ-6",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Equilibrium",
    topic: "Buffer Solutions & Henderson-Hasselbalch Equation",
    weightage: "High",
    examTarget: "Both",
    concept: "A buffer solution resists change in pH upon addition of small amounts of strong acid or strong base.",
    shortNotes: [
      "Acidic Buffer: Mixture of weak acid and its salt with strong base (e.g. CH₃COOH + CH₃COONa). pH < 7.",
      "Basic Buffer: Mixture of weak base and its salt with strong acid (e.g. NH₄OH + NH₄Cl). pH > 7.",
      "Henderson-Hasselbalch Equation: Relates pH to pK_a and ratio of salt to acid.",
      "Maximum buffer capacity occurs when [Salt] = [Acid] ⇒ pH = pK_a (or pOH = pK_b).",
      "Effective buffer range: pH = pK_a ± 1.",
      "Blood is a biological buffer maintained at pH 7.4 by H₂CO₃ / HCO₃⁻ system."
    ],
    formulas: [
      {
        name: "Henderson-Hasselbalch Equations",
        formula: "\\text{Acidic: } \\text{pH} = \\text{pK}_a + \\log_{10} \\left( \\frac{[\\text{Conjugate Base / Salt}]}{[\\text{Weak Acid}]} \\right), \\quad \\text{Basic: } \\text{pOH} = \\text{pK}_b + \\log_{10} \\left( \\frac{[\\text{Conjugate Acid / Salt}]}{[\\text{Weak Base}]} \\right)",
        variables: "[Salt], [Acid] = molar concentrations or millimoles in common volume",
        examTip: "Since both salt and acid share the same container volume, mole ratio can be used directly without computing molarities!",
        trap: "Buffer capacity β = (moles of acid or base added per liter) / ΔpH. Maximum when [Salt]/[Acid] = 1."
      }
    ],
    keyPoints: [
      "A mixture of strong acid and its salt (e.g. HCl + NaCl) is NEVER a buffer!",
      "When adding small strong acid x to acidic buffer: pH_new = pK_a + log(([Salt] - x) / ([Acid] + x))."
    ]
  },
  {
    id: "chem-11-equ-7",
    subject: "Chemistry",
    classLevel: "11",
    chapter: "Equilibrium",
    topic: "Solubility Product (Ksp) & Common Ion Effect",
    weightage: "High",
    examTarget: "Both",
    concept: "In a saturated solution of a sparingly soluble salt, dynamic equilibrium exists between undissolved solid and dissolved ions: A_x B_y(s) ⇌ x Aʸ⁺(aq) + y Bˣ⁻(aq).",
    shortNotes: [
      "K_sp = [Aʸ⁺]^x [Bˣ⁻]^y in saturated solution.",
      "For 1:1 salt (AgCl): K_sp = S² ⇒ S = √K_sp.",
      "For 1:2 or 2:1 salt (Ag₂CrO₄, PbCl₂, CaF₂): K_sp = (2S)²(S) = 4S³ ⇒ S = ∛(K_sp / 4).",
      "For 1:3 salt (Al(OH)₃, Fe(OH)₃): K_sp = (S)(3S)³ = 27S⁴ ⇒ S = ∜(K_sp / 27).",
      "For 2:3 salt (Ca₃(PO₄)₂, As₂S₃): K_sp = (3S)³(2S)² = 108S⁵ ⇒ S = (K_sp / 108)^(1/5).",
      "Ionic Product (Q_sp): If Q_sp < K_sp (Unsaturated, no ppt); If Q_sp = K_sp (Saturated); If Q_sp > K_sp (Supersaturated, PRECIPITATION OCCURS!).",
      "Common ion decreases molar solubility of sparingly soluble salt drastically."
    ],
    formulas: [
      {
        name: "General Solubility Product Formula",
        formula: "K_{sp} = x^x y^y S^{x + y}, \\quad S = \\left( \\frac{K_{sp}}{x^x y^y} \\right)^{\\frac{1}{x + y}}",
        variables: "S = molar solubility in mol/L, x, y = stoichiometric numbers of cation and anion in salt formula A_x B_y",
        examTip: "To compare solubility of salts with DIFFERENT stoichiometry (e.g. AgCl vs Ag₂CrO₄), calculate S! Comparing K_sp directly gives wrong answers.",
        trap: "In presence of common ion (e.g. AgCl in 0.1 M NaCl): [Cl⁻] ≈ 0.1 M ⇒ S_new = K_sp / 0.1 = 10 K_sp (solubility drops drastically)!"
      }
    ],
    keyPoints: [
      "Simultaneous solubility of two sparingly soluble salts containing common ion (e.g. AgCl and AgBr in water): solve coupled equations.",
      "Foundation for selective precipitation in qualitative inorganic analysis (e.g. Group II sulphides precipitate in acidic medium while Group IV sulphides precipitate in alkaline medium)."
    ]
  }
];

async function appendData() {
  const targetFile = path.resolve('server/scripts/chemistryDataDefinition.ts');
  console.log(`Reading ${targetFile}...`);
  let content = fs.readFileSync(targetFile, 'utf8');

  // Find closing bracket of fullChemistryData
  const lastIndex = content.lastIndexOf('];');
  if (lastIndex === -1) {
    console.error('Could not find closing bracket in chemistryDataDefinition.ts');
    return;
  }

  // Format remaining modules as TypeScript JSON objects without outer brackets
  const modulesString = ',\n' + JSON.stringify(remainingModules, null, 2).slice(1, -1).trim();

  // Insert before closing bracket
  const updatedContent = content.slice(0, lastIndex) + modulesString + '\n];\n';
  fs.writeFileSync(targetFile, updatedContent, 'utf8');
  console.log(`Appended ${remainingModules.length} additional modules to chemistryDataDefinition.ts!`);
}

appendData();
