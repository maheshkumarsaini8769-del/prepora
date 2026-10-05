import { SubjectName, ClassLevel } from '../types';

export interface TopicFormula {
  name: string;
  formula: string;
  variables: string;
  examTip: string;
  trap?: string;
}

export interface TopicRevisionItem {
  id: string;
  subject: SubjectName;
  classLevel: ClassLevel;
  chapter: string;
  topic: string;
  weightage: 'High' | 'Medium' | 'Low';
  examTarget: 'JEE' | 'NEET' | 'Both';
  concept: string;
  shortNotes: string[];
  formulas: TopicFormula[];
  keyPoints: string[];
}

export const comprehensiveFormulaNotes: TopicRevisionItem[] = [
  // ==========================================
  // PHYSICS - CLASS 11
  // ==========================================
  {
    id: 'phy-11-units-dim',
    subject: 'Physics',
    classLevel: '11',
    chapter: 'Units and Measurements',
    topic: 'Dimensional Analysis & Errors',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Principle of homogeneity of dimensions and error propagation in physical measurements.',
    shortNotes: [
      'Only physical quantities of identical dimensions can be added or subtracted (Principle of Homogeneity).',
      'Arguments of trigonometric, exponential, and logarithmic functions are always dimensionless: [θ] = [e^x] = [ln(x)] = M⁰L⁰T⁰.',
      'Absolute errors always ADD UP in both addition (Z = A + B) and subtraction (Z = A - B): ΔZ = ΔA + ΔB.',
      'In power relations Z = A^p · B^q / C^r, relative error is ΔZ/Z = p(ΔA/A) + q(ΔB/B) + r(ΔC/C).',
      'Least Count of Vernier Callipers = 1 MSD - 1 VSD = (1 - m/n) MSD.',
      'Least Count of Screw Gauge = Pitch / Total Number of Circular Scale Divisions.'
    ],
    formulas: [
      {
        name: 'Percentage Error in Power Products',
        formula: 'Z = \\frac{A^p B^q}{C^r} \\implies \\frac{\\Delta Z}{Z} = p\\left|\\frac{\\Delta A}{A}\\right| + q\\left|\\frac{\\Delta B}{B}\\right| + r\\left|\\frac{\\Delta C}{C}\\right|',
        variables: 'Z = Derived quantity, A, B, C = Measured quantities, p, q, r = Power exponents',
        examTip: 'The quantity with the highest power exponent contributes the maximum percentage error to the result.',
        trap: 'Never subtract fractional errors even if the variable is in the denominator.'
      },
      {
        name: 'Screw Gauge Reading',
        formula: '\\text{Total Reading} = \\text{Main Scale Reading (MSR)} + (\\text{Circular Scale Reading} \\times \\text{Least Count}) - \\text{Zero Error}',
        variables: 'MSR = Linear main scale reading, LC = Pitch / N',
        examTip: 'Positive zero error is subtracted; negative zero error is added (double negative).',
        trap: 'Check if zero of circular scale is above (negative) or below (positive) the reference datum line.'
      }
    ],
    keyPoints: [
      'Dimensions of Planck constant h are identical to Angular Momentum: [ML²T⁻¹].',
      'Surface tension, Spring constant, and Surface energy all have dimensions [MT⁻²].',
      'Work, Torque, and Energy have identical dimensions [ML²T⁻²] but different scalar/vector nature.'
    ]
  },
  {
    id: 'phy-11-kin-1d-2d',
    subject: 'Physics',
    classLevel: '11',
    chapter: 'Kinematics',
    topic: 'Motion in 1D & Projectile Motion',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Equations of uniform acceleration and independent orthogonal motion in two dimensions.',
    shortNotes: [
      'Equations of motion (v = u + at, s = ut + ½at², v² = u² + 2as) hold STRICTLY ONLY when acceleration is CONSTANT.',
      'For variable acceleration, always use calculus differentials: v = ds/dt and a = dv/dt = v(dv/ds).',
      'In standard 2D projectile motion on level ground, horizontal velocity component remains constant (v_x = u·cosθ).',
      'At apex (highest point), vertical velocity v_y = 0, but total speed is non-zero: v = u·cosθ.',
      'Complementary angles of projection (θ and 90° - θ) yield identical horizontal ranges for the same launch speed.'
    ],
    formulas: [
      {
        name: 'Projectile Flight Time, Max Height & Range',
        formula: 'T = \\frac{2u\\sin\\theta}{g}, \\quad H = \\frac{u^2\\sin^2\\theta}{2g}, \\quad R = \\frac{u^2\\sin(2\\theta)}{g}',
        variables: 'u = Initial launch speed, θ = Angle with horizontal, g = 9.8 or 10 m/s²',
        examTip: 'Relation between Range and Max Height: R = 4H·cotθ. If R = 4H, then θ = 45°.',
        trap: 'If projected from an elevated cliff or at an inclined plane, do not use level-ground formula.'
      },
      {
        name: 'Trajectory Equation',
        formula: 'y = x\\tan\\theta - \\frac{g x^2}{2u^2\\cos^2\\theta} = x\\tan\\theta\\left(1 - \\frac{x}{R}\\right)',
        variables: 'x, y = Coordinates at time t, R = Horizontal range',
        examTip: 'Factored form y = x·tanθ(1 - x/R) simplifies algebra in 90% of JEE/NEET trajectory questions.'
      },
      {
        name: 'Distance in n-th Second',
        formula: 'S_n = u + \\frac{a}{2}(2n - 1)',
        variables: 'u = Initial velocity, a = Uniform acceleration, n = Target second integer',
        examTip: 'Ratio of distances dropped from rest in successive equal seconds is 1 : 3 : 5 : 7 (Galileo odd numbers).'
      }
    ],
    keyPoints: [
      'Velocity vector is always tangent to trajectory path at every instant.',
      'Radius of curvature at apex of projectile: ρ = (u·cosθ)² / g.',
      'Relative velocity between two projectiles in free flight is constant because relative acceleration is zero.'
    ]
  },
  {
    id: 'phy-11-nlm-friction',
    subject: 'Physics',
    classLevel: '11',
    chapter: 'Laws of Motion',
    topic: 'Newton Laws, Friction & Banking',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Equilibrium of concurrent forces, inertial frames, constraint relations, and static/kinetic friction.',
    shortNotes: [
      'Static friction is self-adjusting in magnitude and direction up to limiting value: f_s ≤ μ_s · N.',
      'Once relative sliding begins, kinetic friction f_k = μ_k · N acts opposite to the direction of relative contact motion.',
      'In non-inertial reference frame accelerating at a_frame, apply pseudo-force F_pseudo = -m · a_frame on all bodies.',
      'For a pulley with massless inextensible string, string length constraint yields Σ (T · a) = 0 or virtual work Σ (T · dx) = 0.',
      'Safe speed on a banked road without friction depends only on curve radius and banking angle: v = √(R·g·tanθ).'
    ],
    formulas: [
      {
        name: 'Optimum & Maximum Speed on Banked Road',
        formula: 'v_{\\text{opt}} = \\sqrt{R g \\tan\\theta}, \\quad v_{\\max} = \\sqrt{R g \\left(\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\right)}',
        variables: 'R = Radius of circular turn, θ = Banking angle, μ = Friction coefficient',
        examTip: 'If road is unbanked (θ = 0), maximum safe speed reduces to v_max = √(μ·R·g).',
        trap: 'For minimum speed to avoid slipping downward, replace +μ with -μ in numerator and denominator.'
      },
      {
        name: 'Apparent Weight in an Elevator',
        formula: 'N = m(g + a) \\quad [\\text{accelerating up}], \\quad N = m(g - a) \\quad [\\text{accelerating down}]',
        variables: 'N = Normal reaction / weighing scale reading, a = Vertical elevator acceleration',
        examTip: 'In free fall (a = g downwards), N = 0 (weightlessness).',
        trap: 'Direction of acceleration determines sign, NOT direction of velocity!'
      }
    ],
    keyPoints: [
      'Action and reaction forces never act on the same body; hence they never cancel each other.',
      'Angle of repose equals angle of friction: tan(θ_repose) = μ_s.',
      'Friction is a non-conservative force; mechanical energy is dissipated as heat.'
    ]
  },
  {
    id: 'phy-11-wep-power',
    subject: 'Physics',
    classLevel: '11',
    chapter: 'Work, Energy & Power',
    topic: 'Work-Energy Theorem & Collisions',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Scalar product work definitions, conservative potential energies, and impulse in 1D/2D collisions.',
    shortNotes: [
      'Work-Energy Theorem: Total work done by ALL forces (conservative + non-conservative + external) equals change in kinetic energy: W_all = ΔK.',
      'Potential energy U is defined ONLY for conservative forces: F = -dU/dr (or F_x = -∂U/∂x).',
      'At stable equilibrium, dU/dx = 0 and d²U/dx² > 0 (U is minimum).',
      'In an isolated system, total linear momentum is ALWAYS conserved during collisions, regardless of whether it is elastic or inelastic.',
      'Coefficient of restitution e = (v2 - v1) / (u1 - u2). For perfectly elastic e = 1, perfectly inelastic e = 0.'
    ],
    formulas: [
      {
        name: 'Work Done by Variable Force & Springs',
        formula: 'W = \\int_{x_1}^{x_2} F(x) dx, \\quad U_{\\text{spring}} = \\frac{1}{2} k x^2, \\quad W_{\\text{spring}} = -\\frac{1}{2}k(x_2^2 - x_1^2)',
        variables: 'k = Spring stiffness constant (N/m), x = Extension / compression from natural length',
        examTip: 'Work done BY the spring on the block is negative when extension increases.',
        trap: 'Do not forget natural length offset when spring is already stretched.'
      },
      {
        name: '1D Elastic Collision Final Velocities',
        formula: 'v_1 = \\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right)u_1 + \\left(\\frac{2m_2}{m_1 + m_2}\\right)u_2',
        variables: 'm1, m2 = Masses of colliding bodies, u1, u2 = Initial velocities, v1 = Velocity of m1 after collision',
        examTip: 'If two equal masses collide elastically (m1 = m2), they completely exchange their velocities!',
        trap: 'Always preserve signs (+/-) for opposite velocity directions.'
      }
    ],
    keyPoints: [
      'Work done by centripetal force is always zero because F ⊥ v at every point.',
      'Instantaneous power P = F · v = F·v·cosθ = dW/dt.',
      'Loss of kinetic energy in perfectly inelastic collision: ΔK = ½ [m1·m2 / (m1 + m2)] · (u1 - u2)².'
    ]
  },
  {
    id: 'phy-11-rotational-motion',
    subject: 'Physics',
    classLevel: '11',
    chapter: 'System of Particles and Rotational Motion',
    topic: 'Moment of Inertia, Torque & Angular Momentum',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Rigid body dynamics, rotational analogs of Newton laws, parallel/perpendicular axis theorems.',
    shortNotes: [
      'Torque τ = r × F = I · α = dL/dt. If external torque Στ_ext = 0, total angular momentum L = I·ω is conserved.',
      'Parallel Axis Theorem: I = I_cm + M·d² (valid for ANY rigid body; axis MUST pass through center of mass in I_cm).',
      'Perpendicular Axis Theorem: I_z = I_x + I_y (valid STRICTLY ONLY for planar 2D laminar bodies in x-y plane).',
      'Pure rolling on ground condition: v_cm = R·ω, and acceleration a_cm = R·α (point of contact has zero instantaneous velocity).',
      'Total kinetic energy in pure rolling: K_total = K_trans + K_rot = ½ M·v_cm² [1 + k²/R²].'
    ],
    formulas: [
      {
        name: 'Moments of Inertia (Standard Geometries)',
        formula: 'I_{\\text{ring}} = MR^2, \\quad I_{\\text{disc}} = \\frac{1}{2}MR^2, \\quad I_{\\text{solid sphere}} = \\frac{2}{5}MR^2, \\quad I_{\\text{hollow sphere}} = \\frac{2}{3}MR^2',
        variables: 'M = Mass, R = Radius of body',
        examTip: 'Solid sphere has the least radius of gyration (k²/R² = 0.4); hence rolls down an incline fastest!',
        trap: 'For rod of length L about center: I = ML²/12. About end: I = ML²/3.'
      },
      {
        name: 'Acceleration on an Inclined Plane',
        formula: 'a = \\frac{g\\sin\\theta}{1 + \\frac{k^2}{R^2}}, \\quad f_{\\text{friction}} = \\frac{mg\\sin\\theta}{1 + \\frac{R^2}{k^2}}',
        variables: 'θ = Incline angle, k = Radius of gyration (k²/R² = 1 for ring, 0.5 for disc, 0.4 for solid sphere)',
        examTip: 'Body with smallest k²/R² reaches the bottom first with the highest velocity.',
        trap: 'Static friction causes pure rolling without dissipating mechanical energy.'
      }
    ],
    keyPoints: [
      'Angular momentum L = r × p. For rigid rotating body, L = I·ω.',
      'Center of mass of uniform semi-circular disc: y_cm = 4R / (3π). Semi-circular ring: y_cm = 2R / π.',
      'In pure rolling, work done by static friction is zero because point of contact is at rest.'
    ]
  },
  {
    id: 'phy-11-gravitation',
    subject: 'Physics',
    classLevel: '11',
    chapter: 'Gravitation',
    topic: 'Kepler Laws, Escape Velocity & Satellites',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Newtonian inverse-square gravitational field, orbital mechanics, and energy conservation.',
    shortNotes: [
      'Gravitational force F = G·M·m / r² is conservative, central, and obeys inverse-square law.',
      'Gravitational potential V(r) = -G·M / r. Potential energy of two masses: U = -G·M·m / r.',
      'Escape velocity from Earth surface: v_e = √(2gR) ≈ 11.2 km/s, independent of mass or launch angle of projectile.',
      'Orbital speed of satellite at altitude h: v_o = √[G·M / (R + h)] = v_e / √2 (for h << R).',
      'Kepler 3rd Law: T² ∝ r³ (Square of time period is proportional to cube of semi-major axis).'
    ],
    formulas: [
      {
        name: 'Variation of g with Altitude & Depth',
        formula: 'g_h = g\\left(1 - \\frac{2h}{R}\\right) \\; [\\text{for } h \\ll R], \\quad g_d = g\\left(1 - \\frac{d}{R}\\right) \\; [\\text{for all depths}]',
        variables: 'g = 9.8 m/s² on surface, R = 6400 km Earth radius, h = Height, d = Depth below surface',
        examTip: 'Acceleration due to gravity at depth d equals g at height h when d = 2h (for small h).',
        trap: 'Do not use linear 1 - 2h/R if h is comparable to R (e.g. h = R); use exact g_h = g / (1 + h/R)².'
      },
      {
        name: 'Escape Velocity & Total Satellite Energy',
        formula: 'v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}, \\quad E_{\\text{total}} = -\\frac{GMm}{2r} = -K = \\frac{1}{2}U',
        variables: 'M = Earth mass, m = Satellite mass, r = Orbit radius (R + h)',
        examTip: 'Binding energy of satellite = -E_total = +G·M·m / (2r). Total energy is always negative for bound orbits.',
        trap: 'Escape velocity from height h is v_e = √[2GM / (R + h)], NOT √(2gR).'
      }
    ],
    keyPoints: [
      'Geostationary satellite period is 24 hours, rotates west to east at ~36,000 km altitude above the equator.',
      'Areal velocity dA/dt = L / (2m) is constant (Kepler 2nd law, consequences of central force conservation of L).',
      'Gravitational field inside a uniform spherical shell is strictly ZERO everywhere.'
    ]
  },
  {
    id: 'phy-11-thermodynamics',
    subject: 'Physics',
    classLevel: '11',
    chapter: 'Thermodynamics',
    topic: '1st & 2nd Laws, Carnot Cycle & Heat Engines',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'First law heat-work energy equivalence, state functions, indicator diagrams, and cyclic efficiency.',
    shortNotes: [
      'First Law of Thermodynamics: ΔQ = ΔU + W. Internal energy U is a state function: ΔU = n·C_v·ΔT for all processes.',
      'Work done in isothermal process: W = n·R·T · ln(V2/V1) = n·R·T · ln(P1/P2).',
      'In adiabatic process (PV^γ = const), no heat exchange occurs (ΔQ = 0); hence W = -ΔU = n·R(T1 - T2)/(γ - 1).',
      'Carnot engine efficiency η = 1 - (T_cold / T_hot). No engine can be more efficient than a reversible Carnot engine.',
      'Degrees of freedom (f): Monoatomic f = 3 (γ = 5/3), Diatomic f = 5 (γ = 7/5), Non-linear triatomic f = 6 (γ = 4/3).'
    ],
    formulas: [
      {
        name: 'Molar Heat Capacities & Mayer Relation',
        formula: 'C_p - C_v = R, \\quad C_v = \\frac{f}{2}R, \\quad C_p = \\left(\\frac{f}{2} + 1\\right)R, \\quad \\gamma = \\frac{C_p}{C_v} = 1 + \\frac{2}{f}',
        variables: 'f = Degrees of freedom, R = 8.314 J/(mol·K), γ = Adiabatic index',
        examTip: 'For a mixture of n1 moles of gas 1 and n2 moles of gas 2: C_v,mix = (n1·Cv1 + n2·Cv2) / (n1 + n2).',
        trap: 'High temperature may activate vibrational degrees of freedom (+2 per vibrational mode).'
      },
      {
        name: 'Carnot Efficiency & COP of Refrigerator',
        formula: '\\eta = 1 - \\frac{T_L}{T_H} = \\frac{W}{Q_H}, \\quad \\beta = \\frac{Q_L}{W} = \\frac{T_L}{T_H - T_L} = \\frac{1 - \\eta}{\\eta}',
        variables: 'T_H = Source temperature in Kelvin, T_L = Sink temperature in Kelvin, β = Coefficient of performance',
        examTip: 'Always convert temperature to KELVIN (K = °C + 273.15) before calculating efficiency.',
        trap: 'Using Celsius in efficiency formula is the most common negative marking error.'
      }
    ],
    keyPoints: [
      'Work done in a cyclic process equals the AREA enclosed by the P-V curve (clockwise = positive, anticlockwise = negative).',
      'Slope of adiabatic curve on P-V diagram is γ times steeper than isothermal curve: (dP/dV)_ad = γ·(dP/dV)_iso.',
      'Internal energy of ideal gas depends solely on absolute temperature T, independent of volume or pressure.'
    ]
  },

  // ==========================================
  // PHYSICS - CLASS 12
  // ==========================================
  {
    id: 'phy-12-electrostatics',
    subject: 'Physics',
    classLevel: '12',
    chapter: 'Electrostatics',
    topic: 'Coulomb Law, Gauss Law & Capacitance',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Coulomb interaction, flux integration, conservative potential fields, dielectric energy storage.',
    shortNotes: [
      'Coulomb force F = (1/4πε₀) · q1·q2 / r² in vacuum. In dielectric medium of constant K, force reduces by factor K: F_med = F / K.',
      'Electric field E = -dV/dr. Electric field lines point in the direction of steepest decreasing potential.',
      'Gauss Law: Total electric flux through closed surface Φ = ∮ E · dA = q_enclosed / ε₀.',
      'Electric field inside a conductor in electrostatic equilibrium is zero; all charge resides on outer surface.',
      'Capacitance C = Q / V. For parallel plate capacitor: C = K·ε₀·A / d.',
      'Energy stored in capacitor: U = ½ C·V² = ½ Q·V = Q² / (2C).'
    ],
    formulas: [
      {
        name: 'Electric Field of Dipole & Torque',
        formula: 'E_{\\text{axial}} = \\frac{2kp}{r^3}, \\quad E_{\\text{equatorial}} = \\frac{kp}{r^3}, \\quad \\vec{\\tau} = \\vec{p} \\times \\vec{E}, \\quad U = -\\vec{p} \\cdot \\vec{E}',
        variables: 'p = q·(2a) electric dipole moment, k = 1 / (4πε₀) = 9 × 10⁹ N·m²/C²',
        examTip: 'Axial field is exactly twice the equatorial field at the same large distance: E_axial = 2 · E_eq.',
        trap: 'Dipole moment vector p points from NEGATIVE to POSITIVE charge.'
      },
      {
        name: 'Capacitor with Dielectric Insertion',
        formula: 'C = \\frac{K \\varepsilon_0 A}{d}, \\quad V = \\frac{V_0}{K} \\; [\\text{battery disconnected}], \\quad Q = K Q_0 \\; [\\text{battery connected}]',
        variables: 'K = Dielectric constant, A = Plate area, d = Separation distance',
        examTip: 'If battery remains connected: V is constant, Q and U increase by factor K. If disconnected: Q is constant, V and U decrease by 1/K.',
        trap: 'Remember to identify whether battery is connected or disconnected before calculating energy change.'
      }
    ],
    keyPoints: [
      'Electric field just outside the surface of a charged conductor: E = σ / ε₀ (normal to surface).',
      'Common potential when two charged capacitors are connected: V_common = (C1·V1 + C2·V2) / (C1 + C2).',
      'Energy loss on sharing charges: ΔU = ½ [C1·C2 / (C1 + C2)] · (V1 - V2)².'
    ]
  },
  {
    id: 'phy-12-current-elec',
    subject: 'Physics',
    classLevel: '12',
    chapter: 'Current Electricity',
    topic: 'Ohm Law, Kirchhoff Laws & Bridges',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Drift velocity, resistivity temperature dependence, loop/junction rules, cell combinations.',
    shortNotes: [
      'Current I = n·e·A·v_d, where drift velocity v_d = e·E·τ / m (order of magnitude ~10⁻⁴ m/s).',
      'Kirchhoff Current Law (KCL): Σ I = 0 at junction (Conservation of Charge).',
      'Kirchhoff Voltage Law (KVL): Σ ΔV = 0 in any closed loop (Conservation of Energy).',
      'Balanced Wheatstone Bridge: P / Q = R / S ⟹ no current flows through galvanometer; central resistor can be removed.',
      'Potentiometer principle: Potential gradient k = V / L. At null deflection, unknown EMF E = k · l.'
    ],
    formulas: [
      {
        name: 'Resistance, Resistivity & Temperature',
        formula: 'R = \\rho \\frac{l}{A} = \\frac{m}{n e^2 \\tau} \\frac{l}{A}, \\quad R_T = R_0(1 + \\alpha \\Delta T)',
        variables: 'ρ = Resistivity, n = Free electron density, τ = Relaxation time, α = Temperature coefficient',
        examTip: 'For metals, α is positive (R increases with T). For semiconductors, α is negative (R decreases with T).',
        trap: 'If a wire is STRETCHED by x%, its length increases while volume remains constant; R increases by ~2x% (for small x).'
      },
      {
        name: 'Cells in Parallel & Internal Resistance',
        formula: 'E_{\\text{eq}} = \\frac{\\frac{E_1}{r_1} + \\frac{E_2}{r_2}}{\\frac{1}{r_1} + \\frac{1}{r_2}}, \\quad r_{\\text{eq}} = \\frac{r_1 r_2}{r_1 + r_2}, \\quad r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)',
        variables: 'E1, E2 = Cell EMFs, r1, r2 = Internal resistances, l1, l2 = Balancing lengths with/without shunt R',
        examTip: 'For n identical cells in parallel, E_eq = E and r_eq = r / n.',
        trap: 'If polarity of one cell is reversed in series, subtract 2E from total EMF.'
      }
    ],
    keyPoints: [
      'Terminal voltage across discharging cell: V = E - I·r. For charging cell: V = E + I·r.',
      'Maximum Power Transfer Theorem: External load receives maximum power when R_load = r_internal (P_max = E² / 4r).',
      'Sensitivity of potentiometer increases when potential gradient k is decreased (by increasing wire length).'
    ]
  },
  {
    id: 'phy-12-emi-ac',
    subject: 'Physics',
    classLevel: '12',
    chapter: 'Electromagnetic Induction & Alternating Current',
    topic: 'Faraday Law, LCR Resonance & Transformers',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Flux linkage, motional EMF, self/mutual inductance, impedance phasor diagrams, AC resonance.',
    shortNotes: [
      'Faraday-Lenz Law: Induced EMF e = -dΦ/dt = -N (dΦ/dt). Direction opposes the cause producing it.',
      'Motional EMF across conductor of length L moving at velocity v perpendicular to field B: e = B·L·v.',
      'Self-inductance L = N·Φ / I. Energy stored in magnetic field: U_B = ½ L·I².',
      'Series LCR Circuit: Impedance Z = √[R² + (X_L - X_C)²], where X_L = ωL and X_C = 1 / (ωC).',
      'At resonance: X_L = X_C ⟹ ω_0 = 1 / √(LC), Z_min = R, current is maximum and in phase with voltage (cosφ = 1).'
    ],
    formulas: [
      {
        name: 'Resonant Frequency & Quality Factor (Q)',
        formula: '\\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad f_0 = \\frac{1}{2\\pi\\sqrt{LC}}, \\quad Q = \\frac{\\omega_0 L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}} = \\frac{\\omega_0}{\\Delta \\omega}',
        variables: 'L = Inductance (Henry), C = Capacitance (Farad), R = Resistance (Ohm), Δω = Bandwidth',
        examTip: 'High Q-factor implies sharp tuning and narrow bandwidth (superior frequency selectivity).',
        trap: 'Power dissipation in purely inductive or capacitive circuit is ZERO (wattless current).'
      },
      {
        name: 'AC Power Factor & Transformer Ratio',
        formula: 'P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi, \\quad \\cos\\phi = \\frac{R}{Z}, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}',
        variables: 'V_rms = V_0 / √2, cosφ = Power factor, N_s / N_p = Turns ratio',
        examTip: 'Average power consumed in pure inductor or capacitor is zero because phase angle φ = 90° (cos 90° = 0).',
        trap: 'In real step-up transformers, voltage increases but current decreases (energy cannot be created).'
      }
    ],
    keyPoints: [
      'Inductor resists sudden changes in current (at t = 0, uncharged inductor acts as an open circuit).',
      'Capacitor resists sudden changes in voltage (at t = 0, uncharged capacitor acts as a short circuit).',
      'Mutual inductance between two coaxial solenoids: M = μ₀ · n1·n2 · π·r₁² · L.'
    ]
  },
  {
    id: 'phy-12-optics',
    subject: 'Physics',
    classLevel: '12',
    chapter: 'Optics',
    topic: 'Ray Optics, Lens Maker & Wave Interference',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Refraction at spherical surfaces, thin lens equations, wave theory, Huygens principle, Young Double Slit.',
    shortNotes: [
      'Snell Law: n1·sin(i) = n2·sin(r). Critical angle for Total Internal Reflection (TIR): sin(θ_c) = n_rarer / n_denser.',
      'Lens Maker Formula: 1/f = (n_rel - 1) [1/R1 - 1/R2].',
      'Power of lens P = 1 / f(in meters) Dioptres. Equivalent power in contact: P_eq = P1 + P2.',
      'Young Double Slit Experiment (YDSE): Fringe width β = λ·D / d. Bright fringe position: y_n = n·λ·D / d.',
      'When thin transparent slab of thickness t and refractive index μ is placed in one path, fringe pattern shifts by Δy = (μ - 1)t · D / d.'
    ],
    formulas: [
      {
        name: 'Prism Formula & Minimum Deviation',
        formula: 'n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}, \\quad \\delta = (n - 1)A \\; [\\text{for thin prism}]',
        variables: 'A = Prism refracting angle, δ_m = Angle of minimum deviation, n = Refractive index',
        examTip: 'At minimum deviation, light passes symmetrically: i = e and r1 = r2 = A/2.',
        trap: 'For grazing emergence (e = 90°), prism angle must satisfy A ≤ 2·θ_c for light to emerge.'
      },
      {
        name: 'YDSE Fringe Width & Intensity Distribution',
        formula: '\\beta = \\frac{\\lambda D}{d}, \\quad I = 4I_0 \\cos^2\\left(\\frac{\\phi}{2}\\right), \\quad \\phi = \\frac{2\\pi}{\\lambda} \\Delta x',
        variables: 'λ = Wavelength, D = Screen distance, d = Slit separation, Δx = Path difference',
        examTip: 'If entire YDSE apparatus is submerged in liquid of index μ, fringe width shrinks: β_med = β_air / μ.',
        trap: 'Central fringe remains white when using white light; nearest fringes are violet (smallest λ).'
      }
    ],
    keyPoints: [
      'Compound microscope magnification: m = -(v_o / u_o) · (1 + D / f_e). For normal adjustment: m = -(v_o / u_o) · (D / f_e).',
      'Astronomical telescope magnification in normal adjustment: m = -f_o / f_e; tube length L = f_o + f_e.',
      'Brewster Law for polarization by reflection: tan(i_p) = μ. Reflected and refracted rays are perpendicular.'
    ]
  },
  {
    id: 'phy-12-modern-physics',
    subject: 'Physics',
    classLevel: '12',
    chapter: 'Modern Physics',
    topic: 'Photoelectric Effect, Bohr Model & Nuclei',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Photon quantum model, Einstein photoelectric equation, hydrogen spectral series, radioactive decay.',
    shortNotes: [
      'Einstein Photoelectric Equation: K_max = h·ν - Φ = h·ν - h·ν₀ = e·V₀ (stopping potential).',
      'Stopping potential V₀ depends ONLY on frequency of incident light and work function, INDEPENDENT of light intensity.',
      'Photocurrent is directly proportional to incident light intensity for a given frequency above threshold ν₀.',
      'Bohr Postulates for hydrogen: L = m·v·r = n·h / (2π). Energy levels: E_n = -13.6 / n² eV.',
      'De Broglie wavelength: λ = h / p = h / √(2m·K) = 12.27 / √V Å (for electron accelerated by V volts).'
    ],
    formulas: [
      {
        name: 'Bohr Hydrogen Radius, Velocity & Rydberg Formula',
        formula: 'r_n = 0.529 \\frac{n^2}{Z} \\; \\text{Å}, \\quad v_n = 2.18 \\times 10^6 \\frac{Z}{n} \\; \\text{m/s}, \\quad \\frac{1}{\\lambda} = R Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)',
        variables: 'n = Principal quantum number, Z = Atomic number, R = 1.097 × 10⁷ m⁻¹',
        examTip: 'Lyman series (n1 = 1) is in UV; Balmer series (n1 = 2) is in VISIBLE; Paschen/Brackett/Pfund are in INFRARED.',
        trap: 'Bohr model applies strictly only to single-electron hydrogenic species (H, He⁺, Li²⁺, Be³⁺).'
      },
      {
        name: 'Radioactive Decay Law & Half-Life',
        formula: 'N(t) = N_0 e^{-\\lambda t} = N_0 \\left(\\frac{1}{2}\\right)^{t / T_{1/2}}, \\quad T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}',
        variables: 'N₀ = Initial undecayed nuclei, λ = Decay constant (s⁻¹), T_1/2 = Half-life',
        examTip: 'Mean life τ = 1 / λ = 1.44 · T_1/2. In one mean life, ~63.2% of nuclei decay; 36.8% remain.',
        trap: 'Activity A = λ·N. If sample is replenished or multiple isotopes present, sum individual activities.'
      }
    ],
    keyPoints: [
      'Nuclear radius R = R₀ · A^(1/3), where R₀ ≈ 1.2 fm. Nuclear density is constant (~2.3 × 10¹⁷ kg/m³).',
      'Mass defect Δm = [Z·m_p + (A - Z)m_n] - M_nucleus. Binding Energy = Δm × 931.5 MeV.',
      'Peak of Binding Energy per nucleon curve is at Fe-56 (~8.75 MeV/nucleon), explaining fusion (light) and fission (heavy).'
    ]
  },

  // ==========================================
  // CHEMISTRY - CLASS 11 & 12
  // ==========================================
  {
    id: 'chem-mole-solutions',
    subject: 'Chemistry',
    classLevel: '12',
    chapter: 'Solutions',
    topic: 'Concentration Terms & Colligative Properties',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Raoult law for ideal/non-ideal solutions, colligative properties, and Van t Hoff dissociation factor.',
    shortNotes: [
      'Molarity M = moles solute / volume solution (L) [Temperature dependent].',
      'Molality m = moles solute / mass solvent (kg) [Temperature independent - preferred for thermodynamics].',
      'Raoult Law for volatile binary solution: P_total = P_A°·x_A + P_B°·x_B.',
      'Positive deviation (A-B weaker than A-A/B-B): ΔH_mix > 0, ΔV_mix > 0, forms minimum boiling azeotrope (e.g. Ethanol + Water).',
      'Negative deviation (A-B stronger than A-A/B-B): ΔH_mix < 0, ΔV_mix < 0, forms maximum boiling azeotrope (e.g. Chloroform + Acetone).'
    ],
    formulas: [
      {
        name: '4 Colligative Properties & Van t Hoff Factor',
        formula: '\\frac{P^\\circ - P_s}{P^\\circ} = i x_B, \\quad \\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\pi = i C R T',
        variables: 'i = Van t Hoff factor, K_b = Ebullioscopic constant, K_f = Cryoscopic constant, m = Molality',
        examTip: 'For dissociation (e.g. NaCl, K2SO4): i = 1 + (n - 1)α. For association (e.g. acetic acid in benzene): i = 1 - (1 - 1/n)β.',
        trap: 'Always check if solute associates or dissociates! Overlooking i is the #1 error in colligative problems.'
      }
    ],
    keyPoints: [
      'Henry Law: P_gas = K_H · x_gas. Higher K_H means lower solubility of gas in liquid at same pressure.',
      'Osmotic pressure π is the preferred property for measuring molecular weights of polymers and biomolecules.',
      'Isotonic solutions have equal osmotic pressure (π1 = π2 ⟹ i1·C1 = i2·C2 at same temperature).'
    ]
  },
  {
    id: 'chem-electrochemistry',
    subject: 'Chemistry',
    classLevel: '12',
    chapter: 'Electrochemistry',
    topic: 'Nernst Equation, Kohlrausch Law & Cells',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Standard electrode potentials, Gibbs energy coupling, conductance in electrolytes, Faraday electrolysis.',
    shortNotes: [
      'Electrochemical series: Species with highest E°_red (e.g. F2/F⁻ = +2.87V) is strongest oxidizing agent; lowest (e.g. Li⁺/Li = -3.05V) is strongest reducing agent.',
      'Relation with Gibbs Free Energy: ΔG° = -n·F·E°_cell = -2.303 R·T · log10(K_eq).',
      'Spontaneous reaction condition: E°_cell > 0 and ΔG° < 0.',
      'Kohlrausch Law of Independent Migration: Limiting molar conductivity Λ°_m of an electrolyte is sum of individual ionic conductivities: Λ°_m = ν₊·λ°₊ + ν₋·λ°₋.',
      'Degree of dissociation for weak electrolyte: α = Λ_m / Λ°_m.'
    ],
    formulas: [
      {
        name: 'Nernst Equation at 298 K',
        formula: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10}(Q), \\quad E^\\circ_{\\text{cell}} = \\frac{0.0591}{n} \\log_{10}(K_{\\text{eq}})',
        variables: 'n = Number of electrons transferred, Q = Reaction quotient (activities of products / reactants)',
        examTip: 'Do NOT include pure solids or pure liquids in reaction quotient Q (their activity = 1).',
        trap: 'Pay attention to stoichiometric exponents in the reaction quotient expression Q!'
      },
      {
        name: 'Faraday Laws of Electrolysis',
        formula: 'w = Z \\cdot I \\cdot t = \\frac{E_{\\text{equiv}}}{96500} I \\cdot t = \\frac{M}{n \\cdot F} I \\cdot t',
        variables: 'w = Mass deposited, I = Current (A), t = Time (s), F = 96,485 C/mol, M = Molar mass',
        examTip: '1 Faraday (96,500 C) deposits exactly 1 gram-equivalent of any substance.',
        trap: 'Ensure time is in SECONDS, not minutes or hours!'
      }
    ],
    keyPoints: [
      'Electrolytic conductivity κ (kappa) DECREASES upon dilution due to decrease in number of ions per unit volume.',
      'Molar conductivity Λ_m INCREASES upon dilution due to decrease in inter-ionic attractions (strong) or increase in α (weak).',
      'In concentration cell, E°_cell = 0; EMF arises solely from ratio of ion concentrations: E = (0.0591/n) log(C2/C1).'
    ]
  },
  {
    id: 'chem-kinetics',
    subject: 'Chemistry',
    classLevel: '12',
    chapter: 'Chemical Kinetics',
    topic: 'Integrated Rate Laws & Arrhenius Equation',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Reaction orders, molecularity vs order, differential/integrated rate laws, temperature dependence.',
    shortNotes: [
      'Order of reaction can be zero, fractional, or integer, determined experimentally (never from balanced equation).',
      'Molecularity is the number of reacting species in an elementary step; can only be integer 1, 2, or 3 (never zero or fractional).',
      'For Zero Order reaction: [A]_t = [A]_0 - k·t; half-life t_1/2 = [A]_0 / (2k) (depends on initial concentration).',
      'For First Order reaction: ln([A]_0 / [A]_t) = k·t; half-life t_1/2 = 0.693 / k (independent of initial concentration!).',
      'Arrhenius Equation: k = A · e^(-E_a / RT). Activation energy E_a is minimum energy required for effective collision.'
    ],
    formulas: [
      {
        name: 'First Order Integrated Rate Law & Half-Life',
        formula: 'k = \\frac{2.303}{t} \\log_{10}\\left(\\frac{[A]_0}{[A]_t}\\right), \\quad t_{1/2} = \\frac{0.693}{k}, \\quad t_{99.9\\%} = 10 \\times t_{1/2}',
        variables: '[A]₀ = Initial reactant conc, [A]_t = Conc at time t, k = Rate constant (s⁻¹)',
        examTip: 'Time taken for 75% completion of 1st order reaction is exactly 2 × t_1/2; 87.5% is 3 × t_1/2; 99.9% is 10 × t_1/2.',
        trap: 'Radioactive decay is ALWAYS an exact first-order kinetics process.'
      },
      {
        name: 'Arrhenius Temperature Dependence',
        formula: '\\log_{10}\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)',
        variables: 'E_a = Activation energy (J/mol), R = 8.314 J/(mol·K), T1, T2 = Absolute temperatures (K)',
        examTip: 'Slope of log10(k) vs 1/T graph equals -E_a / (2.303 R).',
        trap: 'Check units of E_a! If E_a is in kJ/mol, convert to J/mol by multiplying by 1000 before dividing by R.'
      }
    ],
    keyPoints: [
      'Catalyst increases reaction rate by providing an alternate pathway of LOWER activation energy E_a.',
      'Catalyst does NOT alter equilibrium constant K_eq or Gibbs energy ΔG° of reaction.',
      'For nth order reaction, units of rate constant k: (mol/L)^(1-n) · s⁻¹.'
    ]
  },
  {
    id: 'chem-organic-reactions',
    subject: 'Chemistry',
    classLevel: '12',
    chapter: 'Organic Chemistry',
    topic: 'Reaction Mechanisms (SN1, SN2, Aldol, Cannizzaro)',
    weightage: 'High',
    examTarget: 'Both',
    concept: 'Nucleophilic substitution, addition, elimination, carbonyl condensations, named reactions.',
    shortNotes: [
      'SN1 Mechanism: 2 steps, carbocation intermediate, rate = k[R-X], racemization with partial inversion, reactivity: 3° > 2° > 1° (polar protic solvent).',
      'SN2 Mechanism: 1 step concerted, pentacoordinated transition state, Walden inversion (100%), rate = k[R-X][Nu⁻], reactivity: CH3X > 1° > 2° > 3° (polar aprotic solvent).',
      'Aldol Condensation: Carbonyl compounds with α-hydrogen in presence of dilute base yield β-hydroxy carbonyls (aldols), dehydrating to α,β-unsaturated carbonyls.',
      'Cannizzaro Reaction: Aldehydes with NO α-hydrogen (e.g. HCHO, C6H5CHO) undergo self-redox in 50% conc. NaOH yielding alcohol + carboxylic acid salt.',
      'Markovnikov Rule: In unsymmetrical addition to alkene, electrophile (H⁺) attaches to carbon with MORE hydrogens.'
    ],
    formulas: [
      {
        name: 'Grignard Carbonyl Addition Matrix',
        formula: '\\text{HCHO} + \\text{RMgX} \\xrightarrow{\\text{H}_3\\text{O}^+} 1^\\circ\\text{ Alcohol}, \\quad \\text{R\'CHO} + \\text{RMgX} \\to 2^\\circ\\text{ Alcohol}, \\quad \\text{R\'COR\"} + \\text{RMgX} \\to 3^\\circ\\text{ Alcohol}',
        variables: 'RMgX = Organomagnesium Grignard reagent (nucleophilic carbanion source R⁻)',
        examTip: 'CO2 + RMgX followed by H3O⁺ yields Carboxylic Acid (R-COOH).',
        trap: 'Grignard reagents are destroyed by any active acidic hydrogen (water, alcohol, amine, terminal alkyne) to form alkane.'
      }
    ],
    keyPoints: [
      'Reimer-Tiemann reaction: Phenol + CHCl3 + aq NaOH ⟹ Salicylaldehyde.',
      'Kolbe Reaction: Sodium phenoxide + CO2 at 400 K / 4-7 atm ⟹ Salicylic acid.',
      'Hofmann Bromamide Degradation: Primary amide R-CONH2 + Br2 + 4KOH ⟹ Primary amine R-NH2 (loses one carbon).'
    ]
  },

  // ==========================================
  // MATHEMATICS - FOR JEE
  // ==========================================
  {
    id: 'math-calculus-integration',
    subject: 'Mathematics',
    classLevel: '12',
    chapter: 'Calculus',
    topic: 'Definite Integrals & Leibniz Rule',
    weightage: 'High',
    examTarget: 'JEE',
    concept: 'Fundamental theorem of calculus, King property, Newton-Leibniz differentiation under integral sign.',
    shortNotes: [
      'King Property: ∫[a to b] f(x) dx = ∫[a to b] f(a + b - x) dx (solves 80% of definite integration symmetry problems).',
      'Periodicity property: If f(x + T) = f(x), then ∫[0 to nT] f(x) dx = n ∫[0 to T] f(x) dx.',
      'Odd/Even test: ∫[-a to a] f(x) dx = 2 ∫[0 to a] f(x) dx (if even: f(-x) = f(x)), and equals 0 (if odd: f(-x) = -f(x)).',
      'Integration by parts: ∫ u·v dx = u·∫v dx - ∫ [u\' · (∫v dx)] dx, using ILATE priority rule.',
      'Newton-Leibniz Rule allows differentiating an integral with variable limits without evaluating the integral.'
    ],
    formulas: [
      {
        name: 'Newton-Leibniz Differentiation Rule',
        formula: '\\frac{d}{dx}\\left[\\int_{u(x)}^{v(x)} f(t) dt\\right] = f(v(x)) \\cdot v\'(x) - f(u(x)) \\cdot u\'(x)',
        variables: 'v(x) = Upper variable limit, u(x) = Lower variable limit, f(t) = Continuous integrand',
        examTip: 'Indispensable for evaluating 0/0 limit indeterminate forms involving integrals using L\'Hopital rule.',
        trap: 'Remember to multiply by the chain-rule derivative of the limit functions (v\'(x) and u\'(x)).'
      },
      {
        name: 'Standard Exponential Derivative Form',
        formula: '\\int e^x\\left[f(x) + f\'(x)\\right] dx = e^x f(x) + C',
        variables: 'f(x) = Differentiable function, f\'(x) = Derivative',
        examTip: 'Rewrite rational integrands like (x - 1) / (x + 1)³ into f(x) + f\'(x) components.',
        trap: 'Check if coefficient of x in exponent is not 1; if e^(kx), look for [k·f(x) + f\'(x)].'
      }
    ],
    keyPoints: [
      'Wallis Formula: ∫[0 to π/2] sin^m(x) cos^n(x) dx can be calculated directly using factorial/gamma products.',
      'Definite integral as limit of sum: lim[n→∞] (1/n) Σ f(r/n) = ∫[0 to 1] f(x) dx.',
      'Area bounded between curves y1 and y2: Area = ∫[a to b] |y1(x) - y2(x)| dx.'
    ]
  },
  {
    id: 'math-coordinate-conics',
    subject: 'Mathematics',
    classLevel: '11',
    chapter: 'Coordinate Geometry',
    topic: 'Conic Sections (Parabola, Ellipse, Hyperbola)',
    weightage: 'High',
    examTarget: 'JEE',
    concept: 'Focal properties, eccentricities, tangent conditions, director circles, and parametric forms.',
    shortNotes: [
      'Eccentricity (e): Circle e = 0, Parabola e = 1, Ellipse e < 1, Hyperbola e > 1, Rectangular Hyperbola e = √2.',
      'Parabola y² = 4ax: Focus (a, 0), Directrix x = -a, Latus Rectum = 4a, Tangent in slope form: y = mx + a/m.',
      'Ellipse x²/a² + y²/b² = 1: b² = a²(1 - e²), Foci (±ae, 0), Tangent: y = mx ± √(a²m² + b²).',
      'Hyperbola x²/a² - y²/b² = 1: b² = a²(e² - 1), Foci (±ae, 0), Tangent: y = mx ± √(a²m² - b²).',
      'Director circle is the locus of intersection of perpendicular tangents: Parabola (directrix), Ellipse (x² + y² = a² + b²), Hyperbola (x² + y² = a² - b²).'
    ],
    formulas: [
      {
        name: 'Tangent Conditions in Slope Form',
        formula: '\\text{Parabola: } y = mx + \\frac{a}{m}, \\quad \\text{Ellipse: } y = mx \\pm \\sqrt{a^2m^2 + b^2}, \\quad \\text{Hyperbola: } y = mx \\pm \\sqrt{a^2m^2 - b^2}',
        variables: 'm = Slope of tangent line, a, b = Semi-major and semi-minor axes',
        examTip: 'To find common tangent between two conics, equate their slope form c-intercept values.',
        trap: 'For hyperbola, tangent exists only when a²m² > b² (tangent slope must be outside asymptotic cone).'
      }
    ],
    keyPoints: [
      'Reflection property: Ray from one focus of ellipse reflects through other focus. In parabola, reflects parallel to axis.',
      'Product of focal distances in ellipse: (SP) · (S\'P) = b² + (e·x)²',
      'Auxiliary circle equation: x² + y² = a² (eccentric angle θ connects point P on ellipse to point Q on auxiliary circle).'
    ]
  },
  {
    id: 'math-algebra-vectors-3d',
    subject: 'Mathematics',
    classLevel: '12',
    chapter: 'Vectors & 3D Geometry',
    topic: 'Dot, Cross, Box Products & Shortest Distance',
    weightage: 'High',
    examTarget: 'JEE',
    concept: 'Scalar and vector triple products, direction cosines, skew lines, line-plane intersections.',
    shortNotes: [
      'Scalar triple product [a b c] = a · (b × c) represents volume of parallelopiped formed by vectors a, b, c.',
      'Vectors a, b, c are coplanar if and only if [a b c] = 0.',
      'Vector triple product: a × (b × c) = (a · c)b - (a · b)c ("BAC - CAB" rule).',
      'Shortest distance between two skew lines r = a1 + λ·b1 and r = a2 + μ·b2: d = |(a2 - a1) · (b1 × b2)| / |b1 × b2|.',
      'Two lines intersect in 3D space if shortest distance d = 0, i.e. (a2 - a1) · (b1 × b2) = 0.'
    ],
    formulas: [
      {
        name: 'Shortest Distance Between Skew Lines',
        formula: 'd = \\frac{\\left|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)\\right|}{\\left|\\vec{b}_1 \\times \\vec{b}_2\\right|}',
        variables: 'a1, a2 = Position vectors of points on lines, b1, b2 = Direction vectors of lines',
        examTip: 'If lines are parallel (b1 = b2 = b), distance formula simplifies to d = |(a2 - a1) × b| / |b|.',
        trap: 'Do not forget modulus: distance is always non-negative.'
      }
    ],
    keyPoints: [
      'Direction cosines satisfy l² + m² + n² = 1 (or cos²α + cos²β + cos²γ = 1).',
      'Angle between two lines: cosθ = (b1 · b2) / (|b1| · |b2|). Lines are perpendicular if b1 · b2 = 0.',
      'Distance of point (x0, y0, z0) from plane Ax + By + Cz + D = 0 is d = |Ax0 + By0 + Cz0 + D| / √(A² + B² + C²).'
    ]
  },

  // ==========================================
  // BIOLOGY - FOR NEET
  // ==========================================
  {
    id: 'bio-genetics-molecular',
    subject: 'Biology',
    classLevel: '12',
    chapter: 'Genetics and Evolution',
    topic: 'Mendelian Genetics & Molecular Basis of Inheritance',
    weightage: 'High',
    examTarget: 'NEET',
    concept: 'Monohybrid/dihybrid ratios, DNA replication, transcription, genetic code, Lac operon.',
    shortNotes: [
      'Mendel Law of Segregation: Alleles separate during gamete formation without blending (Purity of Gametes - universal).',
      'Monohybrid F2 phenotypic ratio: 3:1; genotypic ratio: 1:2:1.',
      'Dihybrid F2 phenotypic ratio: 9:3:3:1; test cross ratio: 1:1:1:1.',
      'DNA is double helix (Watson & Crick), antiparallel (5\'→3\' and 3\'→5\'), pitch = 3.4 nm (10 bp per turn, 0.34 nm between base pairs).',
      'Chargaff Rule: A + G = T + C (Purines = Pyrimidines), A = T and G = C (holds only for dsDNA, not single-stranded RNA).',
      'Central Dogma: DNA ⟹ RNA (transcription) ⟹ Protein (translation). Reverse transcription in retroviruses (Teminism).'
    ],
    formulas: [
      {
        name: 'Hardy-Weinberg Genetic Equilibrium',
        formula: 'p + q = 1, \\quad p^2 + 2pq + q^2 = 1',
        variables: 'p = Dominant allele frequency (A), q = Recessive allele frequency (a), 2pq = Heterozygous carrier frequency (Aa)',
        examTip: 'Always calculate q first by finding square root of homozygous recessive phenotype percentage (q²).',
        trap: 'Distinguish between allele frequency (p, q) and genotype frequency (p², 2pq, q²).'
      }
    ],
    keyPoints: [
      'Genetic code is degenerate (multiple codons for same amino acid), unambiguous (one codon codes for one amino acid), and universal.',
      'Start codon: AUG (codes for Methionine). Stop codons: UAA (ochre), UAG (amber), UGA (opal).',
      'Lac Operon: Inducer is Allolactose/Lactose; Repressor protein bound to Operator prevents RNA polymerase from transcribing z, y, a genes.'
    ]
  },
  {
    id: 'bio-human-physiology',
    subject: 'Biology',
    classLevel: '11',
    chapter: 'Human Physiology',
    topic: 'Circulation, Neural Coordination & Excretion',
    weightage: 'High',
    examTarget: 'NEET',
    concept: 'Cardiac cycle, countercurrent mechanism in nephron, resting/action potentials in neurons.',
    shortNotes: [
      'Cardiac cycle duration is 0.8 seconds (at 72 bpm). Cardiac output = Stroke volume (70 mL) × Heart rate (72) ≈ 5 L/min.',
      'Electrocardiogram (ECG): P-wave = Atrial depolarization, QRS complex = Ventricular depolarization, T-wave = Ventricular repolarization.',
      'Countercurrent mechanism in Loop of Henle and Vasa Recta maintains hyperosmolarity gradient in renal medullary interstitium (from 300 to 1200 mOsmol/L).',
      'Neuron resting potential (-70 mV) maintained by 3 Na⁺ out / 2 K⁺ in ATPase pump.',
      'Depolarization caused by rapid influx of Na⁺ through voltage-gated channels (+30 mV).'
    ],
    formulas: [
      {
        name: 'Cardiac Output & Filtration Fraction',
        formula: '\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} \\approx 5000 \\text{ mL/min}, \\quad \\text{GFR} \\approx 125 \\text{ mL/min} = 180 \\text{ L/day}',
        variables: 'GFR = Glomerular Filtration Rate, Net Filtration Pressure = ~10 mmHg',
        examTip: 'Out of 180 L of glomerular filtrate produced per day, 99% is reabsorbed; only ~1.5 L is excreted as urine.',
        trap: 'Renin is secreted by JGA (Juxtaglomerular apparatus), while Rennin (double n) is a digestive enzyme in infant gastric juice.'
      }
    ],
    keyPoints: [
      'First heart sound (LUB) is due to closure of atrioventricular (Tricuspid/Bicuspid) valves.',
      'Second heart sound (DUB) is due to closure of semilunar valves at onset of ventricular diastole.',
      'ANF (Atrial Natriuretic Factor) causes vasodilation and decreases blood pressure, acting as an antagonist to RAAS.'
    ]
  },
  {
    id: 'bio-plant-physiology',
    subject: 'Biology',
    classLevel: '11',
    chapter: 'Plant Physiology',
    topic: 'Photosynthesis (C3, C4) & Cellular Respiration',
    weightage: 'High',
    examTarget: 'NEET',
    concept: 'Photophosphorylation, Calvin cycle, Hatch-Slack pathway, Glycolysis, and Krebs cycle energetics.',
    shortNotes: [
      'Photosystem II (P680) carries out photolysis of water (2H2O ⟹ 4H⁺ + 4e⁻ + O2) located on inner side of thylakoid membrane.',
      'Non-cyclic photophosphorylation produces BOTH ATP and NADPH; cyclic photophosphorylation produces ONLY ATP.',
      'Calvin Cycle (C3): Primary CO2 acceptor is RuBP (5C), catalyzed by RuBisCO. First stable product is 3-PGA (3C).',
      'C4 Pathway (Kranz Anatomy): Primary CO2 acceptor is PEP (3C) in mesophyll cells, catalyzed by PEPcase. First stable product is OAA (4C).',
      'C4 plants have NO photorespiration, higher photosynthetic efficiency, and tolerate high temperature/salinity.',
      'Glycolysis occurs in cytoplasm, common to aerobic and anaerobic respiration: Net yield = 2 ATP + 2 NADH.'
    ],
    formulas: [
      {
        name: 'Calvin Cycle Stoichiometry',
        formula: '6 \\text{ CO}_2 + 18 \\text{ ATP} + 12 \\text{ NADPH} \\longrightarrow 1 \\text{ Glucose } (\\text{C}_6\\text{H}_{12}\\text{O}_6) + 18 \\text{ ADP} + 12 \\text{ NADP}^+',
        variables: 'For synthesis of 1 glucose molecule: 6 turns of Calvin cycle are required.',
        examTip: 'For C3 plant: 18 ATP + 12 NADPH per glucose. For C4 plant: 30 ATP + 12 NADPH per glucose.',
        trap: 'Photorespiration (C2 cycle) wastes energy with no synthesis of ATP or sugars; RuBisCO acts as oxygenase at high O2/low CO2.'
      }
    ],
    keyPoints: [
      'Respiratory Quotient (RQ): Carbohydrates = 1.0, Fats (e.g. tripalmitin) = 0.7, Proteins = 0.9, Organic acids > 1.0.',
      'Total net ATP yield from 1 glucose in aerobic respiration is 36 or 38 ATP (or 30-32 by modern chemiosmotic calculations).',
      'Chemiosmotic hypothesis: Proton gradient across thylakoid membrane (higher [H⁺] in lumen) drives ATP synthesis via CF₀-CF₁ ATPase.'
    ]
  }
];

export function getFormulaNotesBySubject(subject: SubjectName): TopicRevisionItem[] {
  return comprehensiveFormulaNotes.filter(item => item.subject === subject);
}

export function getFormulaNotesByChapter(chapter: string): TopicRevisionItem[] {
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = clean(chapter);
  return comprehensiveFormulaNotes.filter(item => {
    const c = clean(item.chapter);
    return c === target || c.includes(target) || target.includes(c);
  });
}
