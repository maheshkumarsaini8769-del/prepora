import fs from 'fs';
import path from 'path';
import { canonicalSyllabus } from '../../src/data/canonicalSyllabusData.js';

interface TopicFormula {
  name: string;
  formula: string;
  variables: string;
  examTip: string;
  trap?: string;
}

interface TopicRevisionItem {
  id: string;
  subject: string;
  classLevel: string;
  chapter: string;
  topic: string;
  weightage: 'High' | 'Medium' | 'Low';
  examTarget: 'JEE' | 'NEET' | 'Both';
  concept: string;
  shortNotes: string[];
  formulas: TopicFormula[];
  keyPoints: string[];
}

// Function to generate authentic topic formulas based on chapter name and topic name
function generateTopicData(
  subject: string,
  classLevel: string,
  chapter: string,
  topic: string,
  idx: number
): TopicRevisionItem {
  const slug = `${subject.slice(0, 3).toLowerCase()}-${classLevel}-${chapter.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx}`;
  
  // Custom formula mapping table for high accuracy
  const key = `${chapter.toLowerCase()}::${topic.toLowerCase()}`;
  
  let concept = `Core theoretical derivations, quantitative laws, and exam problem-solving formulas for ${topic} in ${chapter}.`;
  let shortNotes: string[] = [
    `Master the fundamental definitions and boundary conditions for ${topic}.`,
    `Ensure consistent SI units throughout mathematical calculations.`,
    `Watch for sign conventions and vector directions in problem setups.`,
    `Frequently asked in both JEE Main and NEET numerical sections.`
  ];
  let formulas: TopicFormula[] = [];
  let keyPoints: string[] = [
    `High-yield concept tested regularly in previous year papers.`,
    `Focus on graphical interpretations and limiting approximations.`
  ];

  // ==========================================
  // PHYSICS CHAPTERS
  // ==========================================
  if (subject === 'Physics') {
    if (chapter.includes('Units') || chapter.includes('Measurements')) {
      if (topic.includes('Dimensional')) {
        concept = 'Principle of homogeneity of dimensions and conversion of units across systems.';
        formulas = [
          {
            name: 'Principle of Homogeneity',
            formula: '[LHS] = [RHS] \\implies [A] = [B] = [C] \\text{ in } A + B = C',
            variables: 'A, B, C = Physical terms in an equation',
            examTip: 'Arguments of sin, cos, exp, and log must always be dimensionless: [θ] = M⁰L⁰T⁰.',
            trap: 'Never add or equate quantities with different dimensional formulas.'
          },
          {
            name: 'Unit System Conversion',
            formula: 'n_2 = n_1 \\left[\\frac{M_1}{M_2}\\right]^a \\left[\\frac{L_1}{L_2}\\right]^b \\left[\\frac{T_1}{T_2}\\right]^c',
            variables: 'n₁, n₂ = Numerical values; M, L, T = Fundamental units; a, b, c = Dimensions',
            examTip: 'Product of numerical value and unit remains constant: n₁u₁ = n₂u₂.',
            trap: 'Double check whether target system is CGS or SI.'
          }
        ];
      } else if (topic.includes('Error')) {
        concept = 'Propagation of absolute, relative, and percentage errors in measured quantities.';
        formulas = [
          {
            name: 'Relative Error in Power Products',
            formula: 'Z = \\frac{A^a B^b}{C^c} \\implies \\frac{\\Delta Z}{Z} = a\\left(\\frac{\\Delta A}{A}\\right) + b\\left(\\frac{\\Delta B}{B}\\right) + c\\left(\\frac{\\Delta C}{C}\\right)',
            variables: 'Z = Derived quantity, A, B, C = Measured values, a, b, c = Powers',
            examTip: 'The quantity with the highest exponent contributes the largest percentage error.',
            trap: 'Always ADD percentage errors; never subtract even for denominator terms.'
          }
        ];
      } else if (topic.includes('Screw') || topic.includes('Vernier')) {
        concept = 'Precision measuring instruments: least count and zero error corrections.';
        formulas = [
          {
            name: 'Vernier Calliper Least Count',
            formula: '\\text{LC} = 1\\text{ MSD} - 1\\text{ VSD} = \\left(1 - \\frac{m}{n}\\right)\\text{MSD}',
            variables: 'MSD = Main Scale Division, VSD = Vernier Scale Division (n VSD = m MSD)',
            examTip: 'True Reading = MSR + (VSR × LC) - (Zero Error).',
            trap: 'Positive zero error must be SUBTRACTED; negative zero error must be ADDED.'
          },
          {
            name: 'Screw Gauge Least Count',
            formula: '\\text{LC} = \\frac{\\text{Pitch}}{\\text{Total Circular Scale Divisions}}',
            variables: 'Pitch = Linear distance moved in one complete rotation',
            examTip: 'Zero of circular scale below reference line indicates positive zero error.',
            trap: 'Check if pitch is 1 mm or 0.5 mm in the question.'
          }
        ];
      } else {
        formulas = [
          {
            name: 'Percentage Error Formula',
            formula: '\\% \\text{ Error} = \\frac{|x_{\\text{measured}} - x_{\\text{true}}|}{x_{\\text{true}}} \\times 100\\%',
            variables: 'x = Measured physical quantity',
            examTip: 'Significant figures dictate rounding of the final answer.',
            trap: 'Leading zeros are never significant; trailing zeros after decimal are significant.'
          }
        ];
      }
    } else if (chapter.includes('Straight Line') || chapter === 'Kinematics') {
      if (topic.includes('Acceleration') || topic.includes('Uniform')) {
        concept = 'Equations of motion under constant acceleration along a straight line.';
        formulas = [
          {
            name: 'Standard Kinematics Equations',
            formula: 'v = u + at, \\quad s = ut + \\frac{1}{2}at^2, \\quad v^2 = u^2 + 2as',
            variables: 'u = Initial velocity, v = Final velocity, a = Constant acceleration, t = Time, s = Displacement',
            examTip: 'Strictly valid ONLY when acceleration is constant.',
            trap: 'Do not use when acceleration is a function of time; use calculus instead: v = ds/dt, a = dv/dt.'
          },
          {
            name: 'Displacement in n-th Second',
            formula: 's_n = u + \\frac{a}{2}(2n - 1)',
            variables: 's_n = Distance covered during the n-th second, n = Second index',
            examTip: 'Notice the difference between distance in n seconds (s) vs in the n-th second (s_n).',
            trap: 'n must be an integer denoting the specific single second.'
          }
        ];
      } else if (topic.includes('Gravity') || topic.includes('Free Fall')) {
        concept = 'One-dimensional vertical motion under uniform gravitational field.';
        formulas = [
          {
            name: 'Maximum Height & Time of Ascent',
            formula: 'H_{\\max} = \\frac{u^2}{2g}, \\quad t_{\\text{ascent}} = \\frac{u}{g}, \\quad T_{\\text{total}} = \\frac{2u}{g}',
            variables: 'u = Upward launch velocity, g = 9.8 m/s² (or 10 m/s²)',
            examTip: 'At the highest point, instantaneous velocity is zero but acceleration is still -g downward.',
            trap: 'Speed on return to release height equals launch speed |u| if air drag is neglected.'
          }
        ];
      } else if (topic.includes('Relative')) {
        concept = 'Kinematics in moving reference frames and relative velocity.';
        formulas = [
          {
            name: 'Relative Velocity 1D',
            formula: '\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B',
            variables: 'v_AB = Velocity of body A with respect to body B',
            examTip: 'For two bodies approaching each other: v_rel = v_A + v_B. If separating: v_rel = v_A - v_B.',
            trap: 'Maintain a consistent positive direction (e.g. right/up = positive).'
          }
        ];
      } else {
        formulas = [
          {
            name: 'Stopping Distance & Time',
            formula: 'd_s = \\frac{u^2}{2a}, \\quad t_s = \\frac{u}{a}',
            variables: 'u = Initial speed, a = Retardation magnitude',
            examTip: 'Stopping distance is proportional to u²; doubling initial speed quadruples stopping distance.',
            trap: 'Stopping distance depends on mass only if retarding force is independent of mass.'
          }
        ];
      }
    } else if (chapter.includes('Plane')) {
      if (topic.includes('Projectile') || topic.includes('Trajectory') || topic.includes('Height')) {
        concept = '2D motion under constant gravitational acceleration: projectile trajectory and range.';
        formulas = [
          {
            name: 'Trajectory Equation',
            formula: 'y = x\\tan\\theta - \\frac{g x^2}{2 u^2 \\cos^2\\theta} = x\\tan\\theta\\left(1 - \\frac{x}{R}\\right)',
            variables: 'u = Launch speed, θ = Launch angle with horizontal, R = Horizontal range',
            examTip: 'The factor x·tanθ(1 - x/R) simplifies many algebraic JEE problems instantly.',
            trap: 'Ensure angle θ is with horizontal; if given with vertical, replace with (90° - θ).'
          },
          {
            name: 'Maximum Height & Time of Flight',
            formula: 'H = \\frac{u^2\\sin^2\\theta}{2g}, \\quad T = \\frac{2u\\sin\\theta}{g}, \\quad R = \\frac{u^2\\sin 2\\theta}{g}',
            variables: 'H = Maximum height, T = Total flight time, R = Horizontal range',
            examTip: 'Complementary angles θ and (90° - θ) yield identical horizontal ranges: R(θ) = R(90° - θ).',
            trap: 'tanθ = 4H / R is a golden shortcut connecting launch angle, height, and range.'
          }
        ];
      } else if (topic.includes('Circular') || topic.includes('Centripetal')) {
        concept = 'Kinematics of circular motion, angular variables, and centripetal acceleration.';
        formulas = [
          {
            name: 'Centripetal Acceleration & Angular Relations',
            formula: 'a_c = \\frac{v^2}{r} = \\omega^2 r = 4\\pi^2 f^2 r, \\quad v = r\\omega',
            variables: 'v = Linear tangential speed, ω = Angular speed, r = Radius, a_c = Centripetal acceleration',
            examTip: 'Centripetal acceleration is directed strictly toward the center, perpendicular to velocity.',
            trap: 'Total acceleration in non-uniform circular motion is a = √(a_c² + a_t²).'
          }
        ];
      } else {
        formulas = [
          {
            name: 'River-Boat Shortest Time & Path',
            formula: 't_{\\min} = \\frac{d}{v_{br}}, \\quad \\sin\\theta = \\frac{v_r}{v_{br}} \\text{ (for zero drift)}',
            variables: 'd = River width, v_br = Speed of boat relative to river, v_r = River speed',
            examTip: 'To cross river in shortest time, boat must head perpendicular to flow (θ = 90°).',
            trap: 'Zero drift is possible only if v_br > v_r.'
          }
        ];
      }
    } else if (chapter.includes('Laws of Motion')) {
      concept = 'Newton’s laws of dynamics, momentum conservation, friction, and circular banking.';
      formulas = [
        {
          name: 'Newton’s Second Law & Impulse',
          formula: '\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt} = m\\vec{a}, \\quad \\vec{J} = \\Delta\\vec{p} = \\int \\vec{F}\\,dt',
          variables: 'p = Momentum (mv), F = External force, J = Impulse, m = Inertial mass',
          examTip: 'Area under Force vs Time graph directly gives impulse (change in momentum).',
          trap: 'Action and reaction forces act on DIFFERENT bodies, never cancelling each other out.'
        },
        {
          name: 'Friction & Angle of Repose',
          formula: 'f_s \\le \\mu_s N, \\quad f_k = \\mu_k N, \\quad \\tan\\alpha = \\mu_s',
          variables: 'f_s = Static friction, f_k = Kinetic friction, N = Normal reaction, α = Angle of repose',
          examTip: 'Static friction is self-adjusting; its value equals applied force up to μ_s·N.',
          trap: 'Static friction is not always μ_s·N; μ_s·N is only its maximum limiting value.'
        },
        {
          name: 'Banking of Roads',
          formula: 'v_{\\text{opt}} = \\sqrt{rg\\tan\\theta}, \\quad v_{\\max} = \\sqrt{rg\\left(\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\right)}',
          variables: 'r = Radius of curve, θ = Angle of banking, μ = Coefficient of friction',
          examTip: 'At optimum speed v_opt, no friction is required to negotiate the curve.',
          trap: 'For unbanked flat road, set θ = 0 to get v_max = √(μrg).'
        }
      ];
    } else if (chapter.includes('Work') && chapter.includes('Energy')) {
      concept = 'Work-Energy theorem, conservative force potential energy, power, and collisions.';
      formulas = [
        {
          name: 'Work-Energy Theorem',
          formula: 'W_{\\text{net}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2',
          variables: 'W_net = Work done by all forces (conservative + non-conservative + external)',
          examTip: 'Work-Energy theorem applies to all frames (with pseudo work in non-inertial frames).',
          trap: 'Do not forget work done by internal non-conservative forces like friction.'
        },
        {
          name: 'Conservative Force & Potential Energy',
          formula: 'F_x = -\\frac{dU}{dx}, \\quad U_{\\text{spring}} = \\frac{1}{2}k x^2, \\quad P = \\vec{F}\\cdot\\vec{v}',
          variables: 'U = Potential energy, k = Spring constant, x = Displacement, P = Instantaneous power',
          examTip: 'Stable equilibrium occurs where dU/dx = 0 and d²U/dx² > 0 (U is minimum).',
          trap: 'Work done by conservative force is W_c = -ΔU.'
        },
        {
          name: '1D Elastic Collision Velocities',
          formula: 'v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1 + \\frac{2m_2}{m_1 + m_2}u_2, \\quad e = \\frac{v_2 - v_1}{u_1 - u_2}',
          variables: 'u = Pre-collision velocity, v = Post-collision velocity, e = Coefficient of restitution',
          examTip: 'For equal masses (m₁ = m₂) in 1D elastic collision, bodies interchange velocities: v₁ = u₂, v₂ = u₁.',
          trap: 'For perfectly inelastic collision: e = 0, bodies move together with common velocity.'
        }
      ];
    } else if (chapter.includes('Rotational') || chapter.includes('Particles')) {
      concept = 'Center of mass, rotational dynamics, moment of inertia theorems, and rolling motion.';
      formulas = [
        {
          name: 'Center of Mass Coordinates',
          formula: '\\vec{r}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i} = \\frac{\\int \\vec{r}\\,dm}{\\int dm}',
          variables: 'r_cm = Position vector of center of mass, dm = Element mass',
          examTip: 'If net external force is zero, velocity of center of mass remains constant (v_cm = const).',
          trap: 'Internal explosions do not alter the parabolic path of the center of mass.'
        },
        {
          name: 'Parallel & Perpendicular Axis Theorems',
          formula: 'I = I_{\\text{cm}} + M d^2, \\quad I_z = I_x + I_y \\text{ (planar lamina)}',
          variables: 'I = Moment of inertia, d = Distance between axes, M = Total body mass',
          examTip: 'Perpendicular axis theorem strictly applies ONLY to 2D planar laminas.',
          trap: 'In parallel axis theorem, one axis MUST pass through the center of mass.'
        },
        {
          name: 'Rolling Without Slipping Energy & Acceleration',
          formula: 'K_{\\text{total}} = \\frac{1}{2}M v_{\\text{cm}}^2\\left(1 + \\frac{k^2}{R^2}\\right), \\quad a = \\frac{g\\sin\\theta}{1 + \\frac{k^2}{R^2}}',
          variables: 'k = Radius of gyration, R = Radius, θ = Incline angle',
          examTip: 'k²/R² values: Ring/Hoop = 1, Disc/Cylinder = 1/2, Solid Sphere = 2/5, Hollow Sphere = 2/3.',
          trap: 'Body with smallest k²/R² rolls down an incline with maximum acceleration and reaches bottom first (Solid sphere wins).'
        }
      ];
    } else if (chapter.includes('Gravitation')) {
      concept = 'Newtonian gravity, acceleration due to gravity variation, potential, and orbital velocity.';
      formulas = [
        {
          name: 'Variation of g with Altitude and Depth',
          formula: 'g_h = g\\left(1 - \\frac{2h}{R}\\right) = \\frac{g}{\\left(1 + \\frac{h}{R}\\right)^2}, \\quad g_d = g\\left(1 - \\frac{d}{R}\\right)',
          variables: 'g = 9.8 m/s², R = 6400 km (Earth radius), h = Height, d = Depth',
          examTip: 'Approximation g(1 - 2h/R) is valid ONLY when h << R (e.g. h < 500 km).',
          trap: 'At Earth center (d = R), acceleration due to gravity is exactly zero.'
        },
        {
          name: 'Escape & Orbital Velocity',
          formula: 'v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\text{ km/s}, \\quad v_o = \\sqrt{\\frac{GM}{r}} = \\frac{v_e}{\\sqrt{2}}',
          variables: 'G = 6.67 × 10⁻¹¹ N·m²/kg², M = Planet mass, R = Planet radius',
          examTip: 'Escape velocity is completely independent of mass and launch angle of projectile.',
          trap: 'Kinetic energy needed for escape is K = GMm/R, not 1/2 m g R.'
        },
        {
          name: 'Kepler’s Third Law',
          formula: 'T^2 = \\frac{4\\pi^2}{GM} a^3 \\implies T^2 \\propto a^3',
          variables: 'T = Orbital period, a = Semi-major axis of elliptical orbit',
          examTip: 'Ratio of areal velocity is constant: dA/dt = L / (2m) (Kepler’s 2nd law).',
          trap: 'Use semi-major axis, not minor axis or radius of perihelion.'
        }
      ];
    } else if (chapter.includes('Solids')) {
      concept = 'Elastic properties of matter, Hooke’s law, moduli of elasticity, and elastic energy.';
      formulas = [
        {
          name: 'Hooke’s Law & Young’s Modulus',
          formula: 'Y = \\frac{\\text{Stress}}{\\text{Strain}} = \\frac{F / A}{\\Delta L / L} = \\frac{F L}{A \\Delta L}',
          variables: 'Y = Young’s modulus, F = Tensile force, A = Cross-sectional area, ΔL = Elongation',
          examTip: 'Young’s modulus is a material property; it does not change with length or wire thickness.',
          trap: 'Thermal stress developed when wire ends are clamped: F/A = Y·α·ΔT.'
        },
        {
          name: 'Elastic Potential Energy Density',
          formula: 'u = \\frac{1}{2}\\times\\text{Stress}\\times\\text{Strain} = \\frac{1}{2}Y\\left(\\frac{\\Delta L}{L}\\right)^2 = \\frac{\\text{Stress}^2}{2Y}',
          variables: 'u = Energy stored per unit volume (J/m³)',
          examTip: 'Total work done / energy stored in stretched wire: U = u × Volume = 1/2 F·ΔL.',
          trap: 'Do not multiply by volume if question specifically asks for energy DENSITY.'
        }
      ];
    } else if (chapter.includes('Fluids')) {
      concept = 'Hydrostatics, Pascal’s law, Bernoulli’s theorem, viscosity, and surface tension.';
      formulas = [
        {
          name: 'Bernoulli’s Theorem & Torricelli Efflux',
          formula: 'P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}, \\quad v_{\\text{efflux}} = \\sqrt{2gh}',
          variables: 'P = Static pressure, ρ = Fluid density, v = Flow speed, h = Height above datum',
          examTip: 'Horizontal range of efflux jet from tank: R = 2√(h(H - h)), maximum at h = H/2.',
          trap: 'Strictly valid only for incompressible, non-viscous, streamline laminar flow.'
        },
        {
          name: 'Stokes’ Law & Terminal Velocity',
          formula: 'F_v = 6\\pi\\eta r v, \\quad v_t = \\frac{2}{9}\\frac{r^2(\\rho - \\sigma)g}{\\eta}',
          variables: 'η = Viscosity, r = Sphere radius, ρ = Sphere density, σ = Fluid density',
          examTip: 'Terminal velocity is proportional to the square of radius: v_t ∝ r².',
          trap: 'If fluid density σ > sphere density ρ, body moves UPWARD with terminal speed (e.g. air bubble in water).'
        },
        {
          name: 'Excess Pressure & Capillary Rise',
          formula: '\\Delta P_{\\text{drop}} = \\frac{2T}{R}, \\quad \\Delta P_{\\text{bubble}} = \\frac{4T}{R}, \\quad h = \\frac{2T\\cos\\theta}{r\\rho g}',
          variables: 'T = Surface tension, R = Radius of meniscus, θ = Contact angle, r = Tube radius',
          examTip: 'Soap bubble in air has TWO surfaces, hence excess pressure is 4T/R.',
          trap: 'If capillary tube length is insufficient (L < h), liquid never overflows; its radius of curvature increases to R = hr/L.'
        }
      ];
    } else if (chapter.includes('Thermal') && !chapter.includes('Chemical')) {
      concept = 'Calorimetry, thermal expansion, thermal conduction, and radiation laws.';
      formulas = [
        {
          name: 'Thermal Expansion Relationships',
          formula: '\\Delta L = L_0\\alpha\\Delta T, \\quad \\Delta A = A_0\\beta\\Delta T, \\quad \\Delta V = V_0\\gamma\\Delta T \\implies \\alpha : \\beta : \\gamma = 1 : 2 : 3',
          variables: 'α = Linear expansion, β = Superficial, γ = Volume expansion coefficient',
          examTip: 'Cavity/hole inside a solid expands exactly as if it were filled with that material.',
          trap: 'Apparent expansion of liquid in container: γ_app = γ_real - γ_vessel.'
        },
        {
          name: 'Stefan-Boltzmann & Wien’s Displacement Law',
          formula: 'E = e\\sigma A T^4, \\quad \\lambda_{\\max} T = b = 2.898\\times 10^{-3}\\text{ m}\\cdot\\text{K}',
          variables: 'σ = 5.67 × 10⁻⁸ W/(m²·K⁴), e = Emissivity (1 for blackbody), b = Wien constant',
          examTip: 'Net rate of heat loss to surroundings: P_net = eσA(T⁴ - T₀⁴).',
          trap: 'Wien’s law temperature T MUST always be substituted in KELVIN.'
        }
      ];
    } else if (chapter.includes('Thermodynamics') && subject === 'Physics') {
      concept = 'First law of thermodynamics, thermodynamic processes, and Carnot heat engines.';
      formulas = [
        {
          name: 'First Law of Thermodynamics',
          formula: '\\Delta Q = \\Delta U + W, \\quad \\Delta U = n C_v \\Delta T = \\frac{nR\\Delta T}{\\gamma - 1}',
          variables: 'Q = Heat supplied, U = Internal energy, W = Work done by system',
          examTip: 'Internal energy U is a state function; ΔU for any cyclic process is strictly ZERO.',
          trap: 'Chemistry convention is ΔU = q + w (work done on system), whereas Physics is ΔQ = ΔU + W.'
        },
        {
          name: 'Work Done in Thermodynamic Processes',
          formula: 'W_{\\text{iso}} = nRT\\ln\\left(\\frac{V_2}{V_1}\\right), \\quad W_{\\text{adia}} = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} = \\frac{nR(T_1 - T_2)}{\\gamma - 1}',
          variables: 'γ = C_p / C_v, V₁ = Initial volume, V₂ = Final volume',
          examTip: 'In adiabatic expansion, temperature drops (gas cools): T₁V₁^(γ-1) = T₂V₂^(γ-1).',
          trap: 'In isothermal process: ΔT = 0, so ΔU = 0 and Q = W.'
        },
        {
          name: 'Carnot Engine Efficiency & Refrigerator COP',
          formula: '\\eta = 1 - \\frac{T_C}{T_H} = \\frac{W}{Q_H}, \\quad \\beta = \\frac{T_C}{T_H - T_C} = \\frac{1 - \\eta}{\\eta}',
          variables: 'T_H = Source temp (K), T_C = Sink temp (K), η = Efficiency, β = Coefficient of Performance',
          examTip: 'To increase efficiency of Carnot engine, decreasing sink temp T_C is more effective than increasing source temp T_H.',
          trap: 'Always convert Celsius temperatures to Kelvin before computing ratio.'
        }
      ];
    } else if (chapter.includes('Kinetic Theory')) {
      concept = 'Molecular model of gases, pressure, RMS speed, degrees of freedom, and mean free path.';
      formulas = [
        {
          name: 'Pressure & Molecular Speeds',
          formula: 'P = \\frac{1}{3}\\rho v_{\\text{rms}}^2, \\quad v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}, \\quad v_{\\text{avg}} = \\sqrt{\\frac{8RT}{\pi M}}, \\quad v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}',
          variables: 'R = 8.314 J/(mol·K), T = Absolute temperature, M = Molar mass in kg/mol',
          examTip: 'Speed ordering: v_rms > v_avg > v_mp (Memory aid: R-A-M: 1.73 > 1.60 > 1.41).',
          trap: 'Remember to substitute molar mass M in kg/mol (e.g. O₂ = 32 × 10⁻³ kg/mol).'
        },
        {
          name: 'Degrees of Freedom & Molar Heat Capacities',
          formula: 'U = \\frac{f}{2}nRT, \\quad C_v = \\frac{f}{2}R, \\quad C_p = \\left(\\frac{f}{2} + 1\\right)R, \\quad \\gamma = 1 + \\frac{2}{f}',
          variables: 'f = Degrees of freedom (Monoatomic = 3, Diatomic = 5, Triatomic non-linear = 6)',
          examTip: 'γ values: Monoatomic = 5/3 ≈ 1.67, Diatomic = 7/5 = 1.40, Triatomic = 4/3 ≈ 1.33.',
          trap: 'At high temperatures, vibrational degrees of freedom activate (+2 per vibrational mode).'
        }
      ];
    } else if (chapter.includes('Oscillations')) {
      concept = 'Simple Harmonic Motion (SHM), kinematics, energy equations, and spring/pendulum periods.';
      formulas = [
        {
          name: 'SHM Kinematics & Equation of Motion',
          formula: 'x = A\\sin(\\omega t + \\phi), \\quad v = \\omega\\sqrt{A^2 - x^2}, \\quad a = -\\omega^2 x',
          variables: 'A = Amplitude, ω = Angular frequency (2πf), x = Displacement from mean position',
          examTip: 'Velocity is maximum at mean position (v_max = ωA) and zero at extremes. Acceleration is max at extremes (a_max = ω²A).',
          trap: 'Phase difference between displacement and velocity is π/2; between displacement and acceleration is π.'
        },
        {
          name: 'Energy in SHM & Spring Period',
          formula: 'K = \\frac{1}{2}m\\omega^2(A^2 - x^2), \\quad U = \\frac{1}{2}m\\omega^2 x^2, \\quad E_{\\text{total}} = \\frac{1}{2}m\\omega^2 A^2 = \\text{const}',
          variables: 'k = mω² = Force constant, E_total = Mechanical energy',
          examTip: 'Kinetic energy equals potential energy at displacement x = ±A/√2.',
          trap: 'Frequency of energy oscillation is 2f (double the frequency of displacement).'
        },
        {
          name: 'Spring Combinations Period',
          formula: 'T = 2\\pi\\sqrt{\\frac{m}{k_{\\text{eq}}}}, \\quad \\text{Series: } \\frac{1}{k_{\\text{eq}}} = \\frac{1}{k_1} + \\frac{1}{k_2}, \\quad \\text{Parallel: } k_{\\text{eq}} = k_1 + k_2',
          variables: 'k = Spring stiffness constant, m = Oscillating mass',
          examTip: 'Cutting a spring of constant k into two equal halves doubles the spring constant of each piece: k\' = 2k.',
          trap: 'When a body is placed between two springs, both springs stretch/compress simultaneously, acting in PARALLEL: k_eq = k₁ + k₂.'
        }
      ];
    } else if (chapter.includes('Waves') && subject === 'Physics') {
      concept = 'Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.';
      formulas = [
        {
          name: 'Progressive Wave Equation & Speed',
          formula: 'y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}',
          variables: 'k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length',
          examTip: 'Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).',
          trap: 'Wave speed v depends on the MEDIUM properties, not frequency or amplitude.'
        },
        {
          name: 'Standing Waves in Organ Pipes',
          formula: '\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)',
          variables: 'L = Length of pipe, v = Speed of sound (330-340 m/s)',
          examTip: 'Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).',
          trap: 'Open pipe of length L has the same fundamental frequency as closed pipe of length L/2.'
        },
        {
          name: 'Doppler Effect for Sound',
          formula: 'f\' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)',
          variables: 'v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency',
          examTip: 'Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).',
          trap: 'Doppler effect depends on relative motion; if source and observer maintain constant distance, f\' = f.'
        }
      ];
    } else if (chapter.includes('Electric Charges') || chapter.includes('Electrostatics')) {
      concept = 'Coulomb’s law, electric field, dipoles, and Gauss’s law applications.';
      formulas = [
        {
          name: 'Coulomb’s Law & Dielectric Effect',
          formula: 'F = \\frac{1}{4\\pi\\epsilon_0}\\frac{q_1 q_2}{r^2}, \\quad F_{\\text{med}} = \\frac{F_{\\text{air}}}{K}',
          variables: '1/(4πε₀) = 9 × 10⁹ N·m²/C², K = Dielectric constant (relative permittivity ε_r)',
          examTip: 'Forces between charges decrease by factor of K when placed in dielectric medium.',
          trap: 'Coulomb’s law holds for point charges at rest; apply vector superposition for multiple charges.'
        },
        {
          name: 'Electric Dipole Fields & Torque',
          formula: 'E_{\\text{axial}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{2p}{r^3}, \\quad E_{\\text{eq}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{p}{r^3}, \\quad \\vec{\\tau} = \\vec{p}\\times\\vec{E}',
          variables: 'p = 2aq (Dipole moment directed from -q to +q), r = Distance from dipole center (r >> a)',
          examTip: 'Axial field is exactly TWICE the equatorial field at identical distance: E_axial = 2 E_eq.',
          trap: 'Potential energy of dipole in uniform field is U = -p·E·cosθ (Minimum at θ = 0°, stable equilibrium).'
        },
        {
          name: 'Gauss’s Law & Field Configurations',
          formula: '\\Phi = \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{enc}}}{\\epsilon_0}, \\quad E_{\\text{wire}} = \\frac{\\lambda}{2\\pi\\epsilon_0 r}, \\quad E_{\\text{sheet}} = \\frac{\\sigma}{2\\epsilon_0}',
          variables: 'λ = Linear charge density, σ = Surface charge density',
          examTip: 'Electric field inside a uniformly charged conducting or hollow spherical shell is IDENTICALLY ZERO.',
          trap: 'For a conducting sheet (charges on both faces), field outside is E = σ/ε₀, whereas non-conducting is σ/(2ε₀).'
        }
      ];
    } else if (chapter.includes('Potential') || chapter.includes('Capacitance')) {
      concept = 'Electrostatic potential, potential energy of charge configurations, and capacitor physics.';
      formulas = [
        {
          name: 'Electric Potential & Relation with Field',
          formula: 'V = \\frac{1}{4\\pi\\epsilon_0}\\frac{q}{r}, \\quad \\vec{E} = -\\vec{\\nabla}V = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right)',
          variables: 'V = Electrostatic potential, E = Electric field intensity',
          examTip: 'Electric field always points in the direction of steepest decreasing potential.',
          trap: 'Equipotential surfaces are always mutually perpendicular to electric field lines.'
        },
        {
          name: 'Parallel Plate Capacitor with Dielectric',
          formula: 'C = \\frac{\\epsilon_0 A}{d}, \\quad C_{\\text{dielectric}} = \\frac{\\epsilon_0 A}{d - t + \\frac{t}{K}} = \\frac{K\\epsilon_0 A}{d} \\text{ (if fully filled)}',
          variables: 'A = Plate area, d = Plate separation, t = Dielectric slab thickness, K = Dielectric constant',
          examTip: 'Battery disconnected: Q stays constant, V decreases by K, E decreases by K, C increases by K.',
          trap: 'Battery kept connected: V stays constant, Q increases by K, C increases by K, E stays constant.'
        },
        {
          name: 'Energy Stored in Capacitor & Combinations',
          formula: 'U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV, \\quad u_E = \\frac{1}{2}\\epsilon_0 E^2',
          variables: 'U = Stored electrostatic energy, u_E = Energy density in electric field (J/m³)',
          examTip: 'Series: 1/C_eq = 1/C₁ + 1/C₂ (charge Q is same). Parallel: C_eq = C₁ + C₂ (voltage V is same).',
          trap: 'When two capacitors are connected together, energy is always lost as heat: ΔU = (C₁C₂/(2(C₁+C₂)))(V₁ - V₂)².'
        }
      ];
    } else if (chapter.includes('Current Electricity')) {
      concept = 'Ohm’s law, drift velocity, resistivity, Kirchhoff’s circuit laws, and measuring bridges.';
      formulas = [
        {
          name: 'Drift Velocity & Current Density',
          formula: 'I = n e A v_d, \\quad v_d = \\frac{e E \\tau}{m}, \\quad j = \\sigma E = \\frac{E}{\\rho}',
          variables: 'n = Free electron density, e = 1.6 × 10⁻¹⁹ C, τ = Relaxation time, σ = Conductivity',
          examTip: 'Drift velocity is very small (order of 10⁻⁴ m/s), but electric signal propagates at speed of light.',
          trap: 'Temperature increase in metals causes relaxation time τ to decrease, causing resistance to increase.'
        },
        {
          name: 'Kirchhoff’s Laws & Wheatstone Bridge',
          formula: '\\sum I_{\\text{junction}} = 0, \\quad \\sum \\Delta V_{\\text{loop}} = 0, \\quad \\frac{P}{Q} = \\frac{R}{S} \\implies I_g = 0',
          variables: 'P, Q, R, S = Four arm resistances of Wheatstone bridge',
          examTip: 'Kirchhoff’s Junction Law represents conservation of charge; Loop Law represents conservation of energy.',
          trap: 'In balanced Wheatstone bridge, interchanging galvanometer and battery maintains balance condition.'
        },
        {
          name: 'Potentiometer Principle & Cell Comparison',
          formula: '\\frac{E_1}{E_2} = \\frac{l_1}{l_2}, \\quad r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)',
          variables: 'E = EMF of cell, r = Internal resistance, l₁, l₂ = Balancing lengths',
          examTip: 'Potentiometer draws zero current at balance point, acting as an ideal voltmeter of infinite resistance.',
          trap: 'Driver cell EMF must strictly exceed the EMF of cells being tested.'
        }
      ];
    } else if (chapter.includes('Moving Charges') || chapter.includes('Magnetism')) {
      concept = 'Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.';
      formulas = [
        {
          name: 'Biot-Savart Law & Circular Coil Field',
          formula: 'B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}',
          variables: 'μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance',
          examTip: 'At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.',
          trap: 'Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2).'
        },
        {
          name: 'Lorentz Force & Helical Motion',
          formula: '\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}',
          variables: 'q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period',
          examTip: 'Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.',
          trap: 'Orbital period T is completely INDEPENDENT of particle speed v and radius r.'
        },
        {
          name: 'Galvanometer Conversion to Ammeter & Voltmeter',
          formula: 'S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}',
          variables: 'G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage',
          examTip: 'Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.',
          trap: 'Shunt S must be connected in parallel; multiplier R in series.'
        }
      ];
    } else if (chapter.includes('Electromagnetic Induction') || chapter.includes('Alternating Current')) {
      concept = 'Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.';
      formulas = [
        {
          name: 'Faraday’s Law & Motional EMF',
          formula: '\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l',
          variables: 'Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length',
          examTip: 'Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².',
          trap: 'Lenz’s law negative sign represents conservation of energy.'
        },
        {
          name: 'Series LCR Impedance & Resonance',
          formula: 'Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}',
          variables: 'X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance',
          examTip: 'At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.',
          trap: 'Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor).'
        },
        {
          name: 'RMS Values & Transformer Turns Ratio',
          formula: 'V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}',
          variables: 'V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary',
          examTip: 'Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.',
          trap: 'Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC).'
        }
      ];
    } else if (chapter.includes('Optics') || chapter.includes('Ray Optics') || chapter.includes('Wave Optics')) {
      concept = 'Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).';
      formulas = [
        {
          name: 'Lens Maker’s Formula & Lens Formula',
          formula: '\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}',
          variables: 'n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature',
          examTip: 'When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.',
          trap: 'Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative.'
        },
        {
          name: 'Prism Deviation & Critical Angle',
          formula: 'n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}',
          variables: 'A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR',
          examTip: 'At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.',
          trap: 'Total internal reflection occurs only when light travels from DENSER to RARER medium.'
        },
        {
          name: 'Young’s Double Slit Fringe Width (YDSE)',
          formula: '\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}',
          variables: 'β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits',
          examTip: 'Submerging YDSE apparatus in liquid of index n reduces fringe width: β\' = β / n.',
          trap: 'Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider.'
        }
      ];
    } else if (chapter.includes('Modern') || chapter.includes('Dual') || chapter.includes('Atoms') || chapter.includes('Nuclei')) {
      concept = 'Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.';
      formulas = [
        {
          name: 'Einstein’s Photoelectric Equation',
          formula: 'K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}',
          variables: 'h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential',
          examTip: 'Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.',
          trap: 'Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max.'
        },
        {
          name: 'de Broglie Wavelength & Bohr Orbit Energies',
          formula: '\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}',
          variables: 'V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number',
          examTip: 'Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.',
          trap: 'Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E).'
        },
        {
          name: 'Radioactive Decay Law & Mass Defect',
          formula: 'N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}',
          variables: 'λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu',
          examTip: 'Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.',
          trap: 'Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A.'
        }
      ];
    } else if (chapter.includes('Semiconductor')) {
      concept = 'Solid state electronics, p-n junction diode, rectifiers, and Boolean logic gates.';
      formulas = [
        {
          name: 'Mass Action Law & Conductivity',
          formula: 'n_e n_h = n_i^2, \\quad \\sigma = e(n_e \\mu_e + n_h \\mu_h)',
          variables: 'n_e = Electron concentration, n_h = Hole concentration, n_i = Intrinsic carrier concentration, μ = Mobility',
          examTip: 'For n-type: n_e ≈ N_D (donor density); for p-type: n_h ≈ N_A (acceptor density).',
          trap: 'Even though doped, both n-type and p-type semiconductors are electrically NEUTRAL.'
        },
        {
          name: 'Rectifier Efficiencies & Ripple Factor',
          formula: '\\eta_{\\text{half}} = 40.6\\%, \\quad \\gamma_{\\text{half}} = 1.21, \\quad \\eta_{\\text{full}} = 81.2\\%, \\quad \\gamma_{\\text{full}} = 0.482',
          variables: 'η = Rectification efficiency, γ = Ripple factor (AC component / DC component)',
          examTip: 'Output ripple frequency: Half-wave = f (50 Hz); Full-wave = 2f (100 Hz).',
          trap: 'Zener diode operates in REVERSE breakdown region with constant breakdown voltage V_Z.'
        }
      ];
    } else {
      // General Physics fallback
      formulas = [
        {
          name: `${topic} Quantitative Relation`,
          formula: 'Q = \\int f(x)\\,dx \\implies \\Delta Q = f_0\\cdot\\Delta x',
          variables: 'Standard physical state parameters and differential response coefficients',
          examTip: 'Substitute standard SI units to prevent magnitude mismatches.',
          trap: 'Check boundary conditions and conservation laws before applying.'
        }
      ];
    }
  }

  // ==========================================
  // CHEMISTRY CHAPTERS
  // ==========================================
  else if (subject === 'Chemistry') {
    if (chapter.includes('Basic Concepts') || chapter.includes('Mole')) {
      concept = 'Stoichiometry, mole concept, concentration units, and empirical formula.';
      formulas = [
        {
          name: 'Concentration Terms: Molarity & Molality',
          formula: 'M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}',
          variables: 'M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)',
          examTip: 'Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.',
          trap: 'Molarity changes with temperature because volume expands upon heating.'
        },
        {
          name: 'Dilution & Neutralization Formula',
          formula: 'M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}',
          variables: 'V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)',
          examTip: 'For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.',
          trap: 'In redox reactions, n-factor equals total change in oxidation number per mole of reagent.'
        }
      ];
    } else if (chapter.includes('Atom') || chapter.includes('Atomic')) {
      concept = 'Bohr model of hydrogen, de Broglie relation, Heisenberg uncertainty, and quantum numbers.';
      formulas = [
        {
          name: 'Bohr Radius, Velocity & Energy',
          formula: 'r_n = 0.529\\frac{n^2}{Z}\\text{ Å}, \\quad v_n = 2.18\\times 10^6\\frac{Z}{n}\\text{ m/s}, \\quad E_n = -13.6\\frac{Z^2}{n^2}\\text{ eV}',
          variables: 'n = Principal quantum number, Z = Nuclear charge (H = 1, He⁺ = 2, Li²⁺ = 3)',
          examTip: 'Ionization energy of hydrogenic ion: IE = 13.6 × Z² eV.',
          trap: 'Bohr model strictly applies ONLY to single-electron species (H, He⁺, Li²⁺, Be³⁺).'
        },
        {
          name: 'Rydberg Equation for Spectral Series',
          formula: '\\bar{\\nu} = \\frac{1}{\\lambda} = R_H Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)',
          variables: 'R_H = 109677 cm⁻¹ ≈ 1.097 × 10⁷ m⁻¹, n₁ < n₂',
          examTip: 'Lyman (UV, n₁=1), Balmer (Visible, n₁=2), Paschen (Infrared, n₁=3), Brackett (IR, n₁=4).',
          trap: 'Shortest wavelength (limiting line) occurs when n₂ = ∞.'
        },
        {
          name: 'Heisenberg’s Uncertainty Principle',
          formula: '\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi} \\implies \\Delta x \\cdot m\\Delta v \\ge \\frac{h}{4\\pi}',
          variables: 'Δx = Uncertainty in position, Δp = Uncertainty in momentum, h = Planck constant',
          examTip: 'For electron in atom, uncertainty in velocity is very large, ruling out fixed classical trajectories.',
          trap: 'If question mentions "percentage accuracy" in velocity, Δv = (accuracy % / 100) × v.'
        }
      ];
    } else if (chapter.includes('Thermodynamics') && subject === 'Chemistry') {
      concept = 'Chemical energetics, Hess’s law, enthalpy, entropy, and Gibbs free energy criterion.';
      formulas = [
        {
          name: 'Enthalpy & Work Relation',
          formula: '\\Delta H = \\Delta U + \\Delta n_g R T, \\quad w = -P_{\\text{ext}}\\Delta V = -2.303 nRT\\log\\left(\\frac{V_2}{V_1}\\right)',
          variables: 'Δn_g = (moles of gaseous products) - (moles of gaseous reactants)',
          examTip: 'If Δn_g = 0, ΔH = ΔU (e.g. H₂(g) + I₂(g) ⇌ 2HI(g)).',
          trap: 'Chemistry sign convention: work done BY the gas is negative (w < 0).'
        },
        {
          name: 'Gibbs Free Energy & Spontaneity',
          formula: '\\Delta G = \\Delta H - T\\Delta S, \\quad \\Delta G^\\circ = -RT\\ln K = -2.303 RT\\log K',
          variables: 'ΔG = Gibbs free energy change, T = Temperature (K), K = Equilibrium constant',
          examTip: 'Spontaneous process requires ΔG < 0 at constant temperature and pressure.',
          trap: 'At equilibrium: ΔG = 0 and ΔG° = -RT ln(K_eq).'
        }
      ];
    } else if (chapter.includes('Equilibrium')) {
      concept = 'Law of chemical equilibrium, Le Chatelier’s principle, pH of acids/bases, and buffers.';
      formulas = [
        {
          name: 'Relation Between K_p and K_c',
          formula: 'K_p = K_c (RT)^{\\Delta n_g}',
          variables: 'R = 0.0821 L·atm/(mol·K) or 0.0831 L·bar/(mol·K), T = Kelvin',
          examTip: 'If Δn_g = 0, K_p = K_c; if Δn_g > 0, K_p > K_c at temperatures above ~12 K.',
          trap: 'Include only GASEOUS species in calculating Δn_g; pure solids and liquids have activity = 1.'
        },
        {
          name: 'Henderson-Hasselbalch Equation for Buffer Solutions',
          formula: '\\text{Acidic Buffer: } \\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}, \\quad \\text{Basic Buffer: } \\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{Salt}]}{[\\text{Base}]}',
          variables: 'pH + pOH = 14 (at 25°C), pKa = -log(Ka)',
          examTip: 'Maximum buffer capacity occurs when [Salt] = [Acid], giving pH = pKa.',
          trap: 'Strong acid/base salt solutions are neutral (pH = 7) only if neither ion hydrolyzes.'
        },
        {
          name: 'Solubility Product (K_sp) and Precipitation',
          formula: 'A_x B_y(s) \\rightleftharpoons x A^{y+} + y B^{x-} \\implies K_{sp} = x^x y^y S^{x+y}',
          variables: 'S = Molar solubility in mol/L',
          examTip: 'For 1:1 salt (AgCl): K_sp = S². For 1:2 salt (PbCl₂): K_sp = 4S³. For 1:3 salt: K_sp = 27S⁴.',
          trap: 'Precipitation occurs if and only if Ionic Product (Q_sp) EXCEEDS K_sp: Q_sp > K_sp.'
        }
      ];
    } else if (chapter.includes('Solutions')) {
      concept = 'Raoult’s law, Henry’s law, colligative properties, and van ’t Hoff factor.';
      formulas = [
        {
          name: 'Raoult’s Law & Relative Lowering of Vapour Pressure',
          formula: '\\frac{P_A^\\circ - P}{P_A^\\circ} = i X_{\\text{solute}} = i \\frac{n_B}{n_A + n_B} \\approx i \\frac{n_B}{n_A}',
          variables: 'P_A° = Vapour pressure of pure solvent, P = Solution vapour pressure, i = van ’t Hoff factor',
          examTip: 'Relative lowering of vapour pressure is a colligative property depending only on solute particle count.',
          trap: 'For dilute solutions: (P° - P)/P = i(n_B/n_A) connects directly with molality.'
        },
        {
          name: 'Elevation in Boiling Point & Depression in Freezing Point',
          formula: '\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\pi = i C R T',
          variables: 'K_b = Ebullioscopic constant, K_f = Cryoscopic constant, m = Molality, π = Osmotic pressure',
          examTip: 'For dissociation with degree α: i = 1 + (n - 1)α. For association: i = 1 + (1/n - 1)α.',
          trap: 'For strong electrolytes (NaCl, BaCl₂), assume α = 1 unless specified otherwise: i(NaCl)=2, i(BaCl₂)=3.'
        }
      ];
    } else if (chapter.includes('Electrochemistry')) {
      concept = 'Nernst equation, cell potential, Gibbs free energy, Kohlrausch’s law, and Faraday’s electrolysis.';
      formulas = [
        {
          name: 'Nernst Equation at 298 K',
          formula: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log Q, \\quad E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}',
          variables: 'n = Number of electrons transferred, Q = Reaction quotient, E° = Standard reduction potentials',
          examTip: 'At equilibrium: E_cell = 0, giving E°_cell = (0.0591 / n) log(K_eq).',
          trap: 'Always use REDUCTION potentials for both cathode and anode: E°_cell = E°_red(cathode) - E°_red(anode).'
        },
        {
          name: 'Cell Potential and Free Energy Relation',
          formula: '\\Delta G = -n F E_{\\text{cell}}, \\quad \\Delta G^\\circ = -n F E^\\circ_{\\text{cell}}',
          variables: 'F = 96500 C/mol (Faraday constant), ΔG = Maximum electrical work obtainable',
          examTip: 'For spontaneous cell reaction: E_cell > 0 and ΔG < 0.',
          trap: 'E_cell is an intensive property (does not multiply with reaction coefficients); ΔG is extensive.'
        },
        {
          name: 'Kohlrausch’s Law & Faraday’s Electrolysis Law',
          formula: '\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ, \\quad w = Z I t = \\frac{E I t}{96500}',
          variables: 'Λ_m° = Limiting molar conductivity, w = Mass deposited, E = Equivalent weight (M/n-factor)',
          examTip: 'Degree of dissociation of weak electrolyte: α = Λ_m / Λ_m°.',
          trap: '1 Faraday (96500 C) deposits exactly 1 gram equivalent of any substance.'
        }
      ];
    } else if (chapter.includes('Kinetics')) {
      concept = 'Rate law, order of reaction, integrated rate laws, half-life, and Arrhenius activation energy.';
      formulas = [
        {
          name: 'Integrated Rate Laws: Zero & First Order',
          formula: '\\text{Zero: } [A]_0 - [A]_t = k t, \\quad t_{1/2} = \\frac{[A]_0}{2k}; \\quad \\text{First: } k = \\frac{2.303}{t}\\log\\frac{[A]_0}{[A]_t}, \\quad t_{1/2} = \\frac{0.693}{k}',
          variables: '[A]₀ = Initial concentration, [A]_t = Concentration at time t, k = Rate constant',
          examTip: 'First order half-life is completely INDEPENDENT of initial concentration: t_1/2 = 0.693 / k.',
          trap: 'Units of rate constant k: (mol/L)^(1-n) · s⁻¹, where n is the overall reaction order.'
        },
        {
          name: 'Arrhenius Equation & Activation Energy',
          formula: 'k = A e^{-E_a / RT} \\implies \\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)',
          variables: 'E_a = Activation energy, A = Pre-exponential frequency factor, R = 8.314 J/(mol·K)',
          examTip: 'Slope of log(k) vs 1/T graph is -E_a / (2.303 R); intercept is log(A).',
          trap: 'Catalyst increases reaction rate by lowering E_a; it DOES NOT alter ΔH or equilibrium constant K_eq.'
        }
      ];
    } else {
      formulas = [
        {
          name: `${topic} Chemical Principle`,
          formula: 'K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}',
          variables: 'Equilibrium activities and stoichiometric exponents',
          examTip: 'Check oxidation states and formal charges before balancing.',
          trap: 'Solvent water concentration is assumed constant and absorbed into K_a or K_b.'
        }
      ];
    }
  }

  // ==========================================
  // MATHEMATICS CHAPTERS
  // ==========================================
  else if (subject === 'Mathematics') {
    if (chapter.includes('Quadratic') || chapter.includes('Complex')) {
      concept = 'Quadratic roots, nature of roots, complex numbers algebra, and De Moivre’s theorem.';
      formulas = [
        {
          name: 'Quadratic Equation Roots & Vieta’s Relations',
          formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}, \\quad D = b^2 - 4ac',
          variables: 'D > 0 (real & distinct), D = 0 (real & equal), D < 0 (complex conjugate roots)',
          examTip: 'Condition for both roots to be positive: D ≥ 0, -b/a > 0, c/a > 0.',
          trap: 'If a, b, c are rational and D is not a perfect square, roots occur in irrational conjugate pairs (p ± √q).'
        },
        {
          name: 'Complex Numbers: Modulus & Argument',
          formula: 'z = x + iy = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}, \\quad |z| = \\sqrt{x^2 + y^2}, \\quad \\theta = \\text{arg}(z) = \\tan^{-1}\\left(\\frac{y}{x}\\right)',
          variables: 'r = Modulus, θ = Principal argument (-π < θ ≤ π)',
          examTip: 'Triangle inequality: ||z₁| - |z₂|| ≤ |z₁ ± z₂| ≤ |z₁| + |z₂|.',
          trap: 'De Moivre’s theorem: (cosθ + i sinθ)^n = cos(nθ) + i sin(nθ).'
        }
      ];
    } else if (chapter.includes('Trigonomet')) {
      concept = 'Trigonometric identities, compound angles, transformation formulas, and general solutions.';
      formulas = [
        {
          name: 'Compound Angle & Multiple Angle Identities',
          formula: '\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A',
          variables: 'A, B = Angles in radians or degrees',
          examTip: 'tan(2A) = 2tanA / (1 - tan²A). sin(2A) = 2tanA / (1 + tan²A).',
          trap: 'Check quadrant signs when finding half-angle values: sin(A/2) = ±√((1 - cosA)/2).'
        },
        {
          name: 'Sum to Product Transformations',
          formula: '\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}',
          variables: 'C, D = Arbitrary angular arguments',
          examTip: 'cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2) = 2 sin((C+D)/2) sin((D-C)/2).',
          trap: 'Remember the negative sign in cos C - cos D.'
        }
      ];
    } else if (chapter.includes('Calculus') || chapter.includes('Limits') || chapter.includes('Derivative') || chapter.includes('Integral')) {
      concept = 'Differential calculus, standard limits, integration techniques, and definite integrals.';
      formulas = [
        {
          name: 'Standard Limits & L’Hôpital’s Rule',
          formula: '\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f\'(x)}{g\'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}',
          variables: 'x in radians for trigonometric limits',
          examTip: '1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).',
          trap: 'Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞.'
        },
        {
          name: 'Integration by Parts & King’s Property',
          formula: '\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx',
          variables: 'ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential',
          examTip: 'King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.',
          trap: 'Remember to add integration constant + C for indefinite integrals.'
        }
      ];
    } else if (chapter.includes('Coordinate') || chapter.includes('Straight Line') || chapter.includes('Conic')) {
      concept = 'Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.';
      formulas = [
        {
          name: 'Distance from Point to Line & Angle Between Lines',
          formula: 'd = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|',
          variables: '(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes',
          examTip: 'Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.',
          trap: 'Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²).'
        },
        {
          name: 'Standard Conic Section Equations',
          formula: '\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)',
          variables: 'e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)',
          examTip: 'Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.',
          trap: 'Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m).'
        }
      ];
    } else if (chapter.includes('Vector') || chapter.includes('Dimensional Geometry') || chapter.includes('3D')) {
      concept = 'Vector dot product, cross product, lines and planes in 3D space.';
      formulas = [
        {
          name: 'Scalar (Dot) & Vector (Cross) Product',
          formula: '\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}',
          variables: 'θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule',
          examTip: 'Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.',
          trap: 'Cross product is anti-commutative: a × b = -(b × a).'
        },
        {
          name: 'Shortest Distance Between Skew Lines',
          formula: 'd = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}',
          variables: 'r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space',
          examTip: 'If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).',
          trap: 'For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|.'
        }
      ];
    } else if (chapter.includes('Matrices') || chapter.includes('Determinants')) {
      concept = 'Matrix algebra, inverse, determinant properties, and system of linear equations.';
      formulas = [
        {
          name: 'Matrix Inverse & Adjoint Relation',
          formula: 'A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n',
          variables: 'A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix',
          examTip: '|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.',
          trap: '(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!).'
        },
        {
          name: 'Cramer’s Rule for System of Equations',
          formula: 'x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}',
          variables: 'D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants',
          examTip: 'Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.',
          trap: 'For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0.'
        }
      ];
    } else {
      formulas = [
        {
          name: `${topic} Mathematical Formula`,
          formula: 'y = f(x) \\implies \\Delta y \\approx f\'(x)\\Delta x',
          variables: 'Functions, differential parameters, and series coefficients',
          examTip: 'Check symmetry and domain restrictions before applying.',
          trap: 'Check for division by zero and indeterminate forms.'
        }
      ];
    }
  }

  // ==========================================
  // BIOLOGY CHAPTERS
  // ==========================================
  else if (subject === 'Biology') {
    if (chapter.includes('Genetics') || chapter.includes('Inheritance')) {
      concept = 'Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.';
      formulas = [
        {
          name: 'Mendelian Phenotypic & Genotypic Ratios',
          formula: '\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}',
          variables: 'Dominant vs recessive alleles, independent assortment',
          examTip: 'Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.',
          trap: 'Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%.'
        },
        {
          name: 'Hardy-Weinberg Genetic Equilibrium',
          formula: 'p + q = 1, \\quad p^2 + 2pq + q^2 = 1',
          variables: 'p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)',
          examTip: 'To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).',
          trap: 'Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²).'
        }
      ];
    } else if (chapter.includes('Physiology') || chapter.includes('Circulation') || chapter.includes('Respiration') || chapter.includes('Breathing')) {
      concept = 'Human organ capacities, cardiovascular equations, and respiratory volumes.';
      formulas = [
        {
          name: 'Cardiac Output & Blood Pressure',
          formula: '\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}',
          variables: 'SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)',
          examTip: 'End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).',
          trap: 'Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg.'
        },
        {
          name: 'Respiratory Capacities',
          formula: '\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}',
          variables: 'TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL',
          examTip: 'Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.',
          trap: 'Residual Volume (RV) CANNOT be measured by a standard spirometer.'
        }
      ];
    } else if (chapter.includes('Cell') || chapter.includes('Division')) {
      concept = 'Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.';
      formulas = [
        {
          name: 'Chromosome & DNA Content in Cell Cycle',
          formula: '\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)',
          variables: 'n = Ploidy (number of chromosomes), C = Amount of DNA content',
          examTip: 'DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).',
          trap: 'In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C).'
        }
      ];
    } else if (chapter.includes('Photosynthesis') || chapter.includes('Plant Physiology')) {
      concept = 'Photosynthesis energetics, photolysis, ATP/NADPH yield in Calvin cycle, and respiration ATP count.';
      formulas = [
        {
          name: 'Calvin Cycle (C₃ Cycle) Stoichiometry',
          formula: '6\\text{ CO}_2 + 18\\text{ ATP} + 12\\text{ NADPH} \\longrightarrow 1\\text{ Glucose (C}_6\\text{H}_{12}\\text{O}_6) + 18\\text{ ADP} + 12\\text{ NADP}^+',
          variables: 'Fixation of 1 CO₂ requires strictly 3 ATP and 2 NADPH',
          examTip: 'For C₄ plants: fixation of 1 CO₂ requires 5 ATP and 2 NADPH (Total 30 ATP per glucose).',
          trap: 'Photorespiration in C₃ plants consumes ATP and releases CO₂ without generating sugars.'
        },
        {
          name: 'Aerobic Respiration Net ATP Yield',
          formula: '1\\text{ Glucose} \\xrightarrow{\\text{Aerobic}} 36 \\text{ to } 38 \\text{ ATP} + 6\\text{ CO}_2 + 6\\text{ H}_2\\text{O}',
          variables: 'Glycolysis: 2 ATP + 2 NADH (8 ATP); Krebs cycle: 2 ATP + 6 NADH + 2 FADH₂ (24 ATP); Link: 2 NADH (6 ATP)',
          examTip: '1 NADH yields 3 ATP (or 2.5 in modern); 1 FADH₂ yields 2 ATP (or 1.5 in modern).',
          trap: 'Fermentation (anaerobic) yields ONLY 2 net ATP per glucose molecule.'
        }
      ];
    } else {
      formulas = [
        {
          name: `${topic} Key Formula / Ratio`,
          formula: '\\text{Population Density } N_t = N_0 + (B + I) - (D + E)',
          variables: 'N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration',
          examTip: 'Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.',
          trap: 'Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped).'
        }
      ];
    }
  }

  return {
    id: slug,
    subject: subject as any,
    classLevel: classLevel as any,
    chapter,
    topic,
    weightage: (idx === 1 || idx === 2) ? 'High' : 'Medium',
    examTarget: subject === 'Mathematics' ? 'JEE' : subject === 'Biology' ? 'NEET' : 'Both',
    concept,
    shortNotes,
    formulas,
    keyPoints
  };
}

// Generate the complete array
const allItems: TopicRevisionItem[] = [];
const seenKeys = new Set<string>();

for (const ch of canonicalSyllabus) {
  const topics = ch.topics || [];
  topics.forEach((t: any, idx: number) => {
    const uniqueKey = `${ch.subjectName}|${ch.classLevel}|${ch.name}|${t.name}`;
    if (!seenKeys.has(uniqueKey)) {
      seenKeys.add(uniqueKey);
      allItems.push(generateTopicData(ch.subjectName, ch.classLevel, ch.name, t.name, idx + 1));
    }
  });
}

console.log(`Successfully generated ${allItems.length} topic revision formula items across all canonical chapters!`);

// Generate TypeScript output
const outPath = path.resolve('src/data/comprehensiveFormulaNotes.ts');

const tsContent = `import { SubjectName, ClassLevel } from '../types';

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

export const comprehensiveFormulaNotes: TopicRevisionItem[] = ${JSON.stringify(allItems, null, 2)};

export function getFormulasBySubject(subject: SubjectName): TopicRevisionItem[] {
  return comprehensiveFormulaNotes.filter(item => item.subject === subject);
}

export function getFormulasByChapter(chapter: string): TopicRevisionItem[] {
  const q = chapter.toLowerCase().trim();
  return comprehensiveFormulaNotes.filter(item => {
    const c = item.chapter.toLowerCase().trim();
    return c === q || c.includes(q) || q.includes(c);
  });
}

export function getFormulasByTopic(chapter: string, topic: string): TopicRevisionItem | undefined {
  const qChap = chapter.toLowerCase().trim();
  const qTopic = topic.toLowerCase().trim();
  return comprehensiveFormulaNotes.find(item => {
    const c = item.chapter.toLowerCase().trim();
    const t = item.topic.toLowerCase().trim();
    return (c === qChap || c.includes(qChap) || qChap.includes(c)) &&
           (t === qTopic || t.includes(qTopic) || qTopic.includes(t));
  });
}
`;

fs.writeFileSync(outPath, tsContent, 'utf8');
console.log(`Saved master formula notes dataset to ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
