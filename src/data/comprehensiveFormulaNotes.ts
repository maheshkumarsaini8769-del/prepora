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
  {
    "id": "phy-11-units-and-measurements-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Units and Measurements",
    "topic": "Dimensional Analysis",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Principle of homogeneity of dimensions and conversion of units across systems.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Dimensional Analysis.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Principle of Homogeneity",
        "formula": "[LHS] = [RHS] \\implies [A] = [B] = [C] \\text{ in } A + B = C",
        "variables": "A, B, C = Physical terms in an equation",
        "examTip": "Arguments of sin, cos, exp, and log must always be dimensionless: [θ] = M⁰L⁰T⁰.",
        "trap": "Never add or equate quantities with different dimensional formulas."
      },
      {
        "name": "Unit System Conversion",
        "formula": "n_2 = n_1 \\left[\\frac{M_1}{M_2}\\right]^a \\left[\\frac{L_1}{L_2}\\right]^b \\left[\\frac{T_1}{T_2}\\right]^c",
        "variables": "n₁, n₂ = Numerical values; M, L, T = Fundamental units; a, b, c = Dimensions",
        "examTip": "Product of numerical value and unit remains constant: n₁u₁ = n₂u₂.",
        "trap": "Double check whether target system is CGS or SI."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-units-and-measurements-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Units and Measurements",
    "topic": "Significant Figures",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Significant Figures in Units and Measurements.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Significant Figures.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Percentage Error Formula",
        "formula": "\\% \\text{ Error} = \\frac{|x_{\\text{measured}} - x_{\\text{true}}|}{x_{\\text{true}}} \\times 100\\%",
        "variables": "x = Measured physical quantity",
        "examTip": "Significant figures dictate rounding of the final answer.",
        "trap": "Leading zeros are never significant; trailing zeros after decimal are significant."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-units-and-measurements-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Units and Measurements",
    "topic": "Screw Gauge & Vernier",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Precision measuring instruments: least count and zero error corrections.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Screw Gauge & Vernier.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Vernier Calliper Least Count",
        "formula": "\\text{LC} = 1\\text{ MSD} - 1\\text{ VSD} = \\left(1 - \\frac{m}{n}\\right)\\text{MSD}",
        "variables": "MSD = Main Scale Division, VSD = Vernier Scale Division (n VSD = m MSD)",
        "examTip": "True Reading = MSR + (VSR × LC) - (Zero Error).",
        "trap": "Positive zero error must be SUBTRACTED; negative zero error must be ADDED."
      },
      {
        "name": "Screw Gauge Least Count",
        "formula": "\\text{LC} = \\frac{\\text{Pitch}}{\\text{Total Circular Scale Divisions}}",
        "variables": "Pitch = Linear distance moved in one complete rotation",
        "examTip": "Zero of circular scale below reference line indicates positive zero error.",
        "trap": "Check if pitch is 1 mm or 0.5 mm in the question."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-units-and-measurements-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Units and Measurements",
    "topic": "Error Propagation",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Propagation of absolute, relative, and percentage errors in measured quantities.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Error Propagation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Relative Error in Power Products",
        "formula": "Z = \\frac{A^a B^b}{C^c} \\implies \\frac{\\Delta Z}{Z} = a\\left(\\frac{\\Delta A}{A}\\right) + b\\left(\\frac{\\Delta B}{B}\\right) + c\\left(\\frac{\\Delta C}{C}\\right)",
        "variables": "Z = Derived quantity, A, B, C = Measured values, a, b, c = Powers",
        "examTip": "The quantity with the highest exponent contributes the largest percentage error.",
        "trap": "Always ADD percentage errors; never subtract even for denominator terms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-units-and-measurements-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Units and Measurements",
    "topic": "Unit Conversions",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Unit Conversions in Units and Measurements.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Unit Conversions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Percentage Error Formula",
        "formula": "\\% \\text{ Error} = \\frac{|x_{\\text{measured}} - x_{\\text{true}}|}{x_{\\text{true}}} \\times 100\\%",
        "variables": "x = Measured physical quantity",
        "examTip": "Significant figures dictate rounding of the final answer.",
        "trap": "Leading zeros are never significant; trailing zeros after decimal are significant."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-motion-in-a-straight-line-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Motion in a Straight Line",
    "topic": "Displacement & Velocity",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Displacement & Velocity in Motion in a Straight Line.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Displacement & Velocity.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Stopping Distance & Time",
        "formula": "d_s = \\frac{u^2}{2a}, \\quad t_s = \\frac{u}{a}",
        "variables": "u = Initial speed, a = Retardation magnitude",
        "examTip": "Stopping distance is proportional to u²; doubling initial speed quadruples stopping distance.",
        "trap": "Stopping distance depends on mass only if retarding force is independent of mass."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-motion-in-a-straight-line-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Motion in a Straight Line",
    "topic": "Uniform Acceleration",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Equations of motion under constant acceleration along a straight line.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Uniform Acceleration.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Kinematics Equations",
        "formula": "v = u + at, \\quad s = ut + \\frac{1}{2}at^2, \\quad v^2 = u^2 + 2as",
        "variables": "u = Initial velocity, v = Final velocity, a = Constant acceleration, t = Time, s = Displacement",
        "examTip": "Strictly valid ONLY when acceleration is constant.",
        "trap": "Do not use when acceleration is a function of time; use calculus instead: v = ds/dt, a = dv/dt."
      },
      {
        "name": "Displacement in n-th Second",
        "formula": "s_n = u + \\frac{a}{2}(2n - 1)",
        "variables": "s_n = Distance covered during the n-th second, n = Second index",
        "examTip": "Notice the difference between distance in n seconds (s) vs in the n-th second (s_n).",
        "trap": "n must be an integer denoting the specific single second."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-motion-in-a-straight-line-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Motion in a Straight Line",
    "topic": "Free Fall under Gravity",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "One-dimensional vertical motion under uniform gravitational field.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Free Fall under Gravity.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Maximum Height & Time of Ascent",
        "formula": "H_{\\max} = \\frac{u^2}{2g}, \\quad t_{\\text{ascent}} = \\frac{u}{g}, \\quad T_{\\text{total}} = \\frac{2u}{g}",
        "variables": "u = Upward launch velocity, g = 9.8 m/s² (or 10 m/s²)",
        "examTip": "At the highest point, instantaneous velocity is zero but acceleration is still -g downward.",
        "trap": "Speed on return to release height equals launch speed |u| if air drag is neglected."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-motion-in-a-straight-line-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Motion in a Straight Line",
    "topic": "Relative Velocity 1D",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Kinematics in moving reference frames and relative velocity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Relative Velocity 1D.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Relative Velocity 1D",
        "formula": "\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B",
        "variables": "v_AB = Velocity of body A with respect to body B",
        "examTip": "For two bodies approaching each other: v_rel = v_A + v_B. If separating: v_rel = v_A - v_B.",
        "trap": "Maintain a consistent positive direction (e.g. right/up = positive)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-motion-in-a-straight-line-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Motion in a Straight Line",
    "topic": "Kinematics Graphs",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Kinematics Graphs in Motion in a Straight Line.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Kinematics Graphs.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Stopping Distance & Time",
        "formula": "d_s = \\frac{u^2}{2a}, \\quad t_s = \\frac{u}{a}",
        "variables": "u = Initial speed, a = Retardation magnitude",
        "examTip": "Stopping distance is proportional to u²; doubling initial speed quadruples stopping distance.",
        "trap": "Stopping distance depends on mass only if retarding force is independent of mass."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-motion-in-a-plane-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Motion in a Plane",
    "topic": "Projectile Trajectory",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "2D motion under constant gravitational acceleration: projectile trajectory and range.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Projectile Trajectory.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Trajectory Equation",
        "formula": "y = x\\tan\\theta - \\frac{g x^2}{2 u^2 \\cos^2\\theta} = x\\tan\\theta\\left(1 - \\frac{x}{R}\\right)",
        "variables": "u = Launch speed, θ = Launch angle with horizontal, R = Horizontal range",
        "examTip": "The factor x·tanθ(1 - x/R) simplifies many algebraic JEE problems instantly.",
        "trap": "Ensure angle θ is with horizontal; if given with vertical, replace with (90° - θ)."
      },
      {
        "name": "Maximum Height & Time of Flight",
        "formula": "H = \\frac{u^2\\sin^2\\theta}{2g}, \\quad T = \\frac{2u\\sin\\theta}{g}, \\quad R = \\frac{u^2\\sin 2\\theta}{g}",
        "variables": "H = Maximum height, T = Total flight time, R = Horizontal range",
        "examTip": "Complementary angles θ and (90° - θ) yield identical horizontal ranges: R(θ) = R(90° - θ).",
        "trap": "tanθ = 4H / R is a golden shortcut connecting launch angle, height, and range."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-motion-in-a-plane-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Motion in a Plane",
    "topic": "Maximum Height & Range",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "2D motion under constant gravitational acceleration: projectile trajectory and range.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Maximum Height & Range.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Trajectory Equation",
        "formula": "y = x\\tan\\theta - \\frac{g x^2}{2 u^2 \\cos^2\\theta} = x\\tan\\theta\\left(1 - \\frac{x}{R}\\right)",
        "variables": "u = Launch speed, θ = Launch angle with horizontal, R = Horizontal range",
        "examTip": "The factor x·tanθ(1 - x/R) simplifies many algebraic JEE problems instantly.",
        "trap": "Ensure angle θ is with horizontal; if given with vertical, replace with (90° - θ)."
      },
      {
        "name": "Maximum Height & Time of Flight",
        "formula": "H = \\frac{u^2\\sin^2\\theta}{2g}, \\quad T = \\frac{2u\\sin\\theta}{g}, \\quad R = \\frac{u^2\\sin 2\\theta}{g}",
        "variables": "H = Maximum height, T = Total flight time, R = Horizontal range",
        "examTip": "Complementary angles θ and (90° - θ) yield identical horizontal ranges: R(θ) = R(90° - θ).",
        "trap": "tanθ = 4H / R is a golden shortcut connecting launch angle, height, and range."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-motion-in-a-plane-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Motion in a Plane",
    "topic": "Uniform Circular Motion",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Kinematics of circular motion, angular variables, and centripetal acceleration.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Uniform Circular Motion.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Centripetal Acceleration & Angular Relations",
        "formula": "a_c = \\frac{v^2}{r} = \\omega^2 r = 4\\pi^2 f^2 r, \\quad v = r\\omega",
        "variables": "v = Linear tangential speed, ω = Angular speed, r = Radius, a_c = Centripetal acceleration",
        "examTip": "Centripetal acceleration is directed strictly toward the center, perpendicular to velocity.",
        "trap": "Total acceleration in non-uniform circular motion is a = √(a_c² + a_t²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-motion-in-a-plane-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Motion in a Plane",
    "topic": "Relative Velocity 2D",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Relative Velocity 2D in Motion in a Plane.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Relative Velocity 2D.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "River-Boat Shortest Time & Path",
        "formula": "t_{\\min} = \\frac{d}{v_{br}}, \\quad \\sin\\theta = \\frac{v_r}{v_{br}} \\text{ (for zero drift)}",
        "variables": "d = River width, v_br = Speed of boat relative to river, v_r = River speed",
        "examTip": "To cross river in shortest time, boat must head perpendicular to flow (θ = 90°).",
        "trap": "Zero drift is possible only if v_br > v_r."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-motion-in-a-plane-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Motion in a Plane",
    "topic": "Centripetal Acceleration",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Kinematics of circular motion, angular variables, and centripetal acceleration.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Centripetal Acceleration.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Centripetal Acceleration & Angular Relations",
        "formula": "a_c = \\frac{v^2}{r} = \\omega^2 r = 4\\pi^2 f^2 r, \\quad v = r\\omega",
        "variables": "v = Linear tangential speed, ω = Angular speed, r = Radius, a_c = Centripetal acceleration",
        "examTip": "Centripetal acceleration is directed strictly toward the center, perpendicular to velocity.",
        "trap": "Total acceleration in non-uniform circular motion is a = √(a_c² + a_t²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-laws-of-motion-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Laws of Motion",
    "topic": "Newton's Second Law",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Newton’s laws of dynamics, momentum conservation, friction, and circular banking.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Newton's Second Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Newton’s Second Law & Impulse",
        "formula": "\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt} = m\\vec{a}, \\quad \\vec{J} = \\Delta\\vec{p} = \\int \\vec{F}\\,dt",
        "variables": "p = Momentum (mv), F = External force, J = Impulse, m = Inertial mass",
        "examTip": "Area under Force vs Time graph directly gives impulse (change in momentum).",
        "trap": "Action and reaction forces act on DIFFERENT bodies, never cancelling each other out."
      },
      {
        "name": "Friction & Angle of Repose",
        "formula": "f_s \\le \\mu_s N, \\quad f_k = \\mu_k N, \\quad \\tan\\alpha = \\mu_s",
        "variables": "f_s = Static friction, f_k = Kinetic friction, N = Normal reaction, α = Angle of repose",
        "examTip": "Static friction is self-adjusting; its value equals applied force up to μ_s·N.",
        "trap": "Static friction is not always μ_s·N; μ_s·N is only its maximum limiting value."
      },
      {
        "name": "Banking of Roads",
        "formula": "v_{\\text{opt}} = \\sqrt{rg\\tan\\theta}, \\quad v_{\\max} = \\sqrt{rg\\left(\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\right)}",
        "variables": "r = Radius of curve, θ = Angle of banking, μ = Coefficient of friction",
        "examTip": "At optimum speed v_opt, no friction is required to negotiate the curve.",
        "trap": "For unbanked flat road, set θ = 0 to get v_max = √(μrg)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-laws-of-motion-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Laws of Motion",
    "topic": "Friction & Angle of Repose",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Newton’s laws of dynamics, momentum conservation, friction, and circular banking.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Friction & Angle of Repose.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Newton’s Second Law & Impulse",
        "formula": "\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt} = m\\vec{a}, \\quad \\vec{J} = \\Delta\\vec{p} = \\int \\vec{F}\\,dt",
        "variables": "p = Momentum (mv), F = External force, J = Impulse, m = Inertial mass",
        "examTip": "Area under Force vs Time graph directly gives impulse (change in momentum).",
        "trap": "Action and reaction forces act on DIFFERENT bodies, never cancelling each other out."
      },
      {
        "name": "Friction & Angle of Repose",
        "formula": "f_s \\le \\mu_s N, \\quad f_k = \\mu_k N, \\quad \\tan\\alpha = \\mu_s",
        "variables": "f_s = Static friction, f_k = Kinetic friction, N = Normal reaction, α = Angle of repose",
        "examTip": "Static friction is self-adjusting; its value equals applied force up to μ_s·N.",
        "trap": "Static friction is not always μ_s·N; μ_s·N is only its maximum limiting value."
      },
      {
        "name": "Banking of Roads",
        "formula": "v_{\\text{opt}} = \\sqrt{rg\\tan\\theta}, \\quad v_{\\max} = \\sqrt{rg\\left(\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\right)}",
        "variables": "r = Radius of curve, θ = Angle of banking, μ = Coefficient of friction",
        "examTip": "At optimum speed v_opt, no friction is required to negotiate the curve.",
        "trap": "For unbanked flat road, set θ = 0 to get v_max = √(μrg)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-laws-of-motion-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Laws of Motion",
    "topic": "Connected Bodies & Pulleys",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Newton’s laws of dynamics, momentum conservation, friction, and circular banking.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Connected Bodies & Pulleys.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Newton’s Second Law & Impulse",
        "formula": "\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt} = m\\vec{a}, \\quad \\vec{J} = \\Delta\\vec{p} = \\int \\vec{F}\\,dt",
        "variables": "p = Momentum (mv), F = External force, J = Impulse, m = Inertial mass",
        "examTip": "Area under Force vs Time graph directly gives impulse (change in momentum).",
        "trap": "Action and reaction forces act on DIFFERENT bodies, never cancelling each other out."
      },
      {
        "name": "Friction & Angle of Repose",
        "formula": "f_s \\le \\mu_s N, \\quad f_k = \\mu_k N, \\quad \\tan\\alpha = \\mu_s",
        "variables": "f_s = Static friction, f_k = Kinetic friction, N = Normal reaction, α = Angle of repose",
        "examTip": "Static friction is self-adjusting; its value equals applied force up to μ_s·N.",
        "trap": "Static friction is not always μ_s·N; μ_s·N is only its maximum limiting value."
      },
      {
        "name": "Banking of Roads",
        "formula": "v_{\\text{opt}} = \\sqrt{rg\\tan\\theta}, \\quad v_{\\max} = \\sqrt{rg\\left(\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\right)}",
        "variables": "r = Radius of curve, θ = Angle of banking, μ = Coefficient of friction",
        "examTip": "At optimum speed v_opt, no friction is required to negotiate the curve.",
        "trap": "For unbanked flat road, set θ = 0 to get v_max = √(μrg)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-laws-of-motion-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Laws of Motion",
    "topic": "Banking of Roads",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Newton’s laws of dynamics, momentum conservation, friction, and circular banking.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Banking of Roads.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Newton’s Second Law & Impulse",
        "formula": "\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt} = m\\vec{a}, \\quad \\vec{J} = \\Delta\\vec{p} = \\int \\vec{F}\\,dt",
        "variables": "p = Momentum (mv), F = External force, J = Impulse, m = Inertial mass",
        "examTip": "Area under Force vs Time graph directly gives impulse (change in momentum).",
        "trap": "Action and reaction forces act on DIFFERENT bodies, never cancelling each other out."
      },
      {
        "name": "Friction & Angle of Repose",
        "formula": "f_s \\le \\mu_s N, \\quad f_k = \\mu_k N, \\quad \\tan\\alpha = \\mu_s",
        "variables": "f_s = Static friction, f_k = Kinetic friction, N = Normal reaction, α = Angle of repose",
        "examTip": "Static friction is self-adjusting; its value equals applied force up to μ_s·N.",
        "trap": "Static friction is not always μ_s·N; μ_s·N is only its maximum limiting value."
      },
      {
        "name": "Banking of Roads",
        "formula": "v_{\\text{opt}} = \\sqrt{rg\\tan\\theta}, \\quad v_{\\max} = \\sqrt{rg\\left(\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\right)}",
        "variables": "r = Radius of curve, θ = Angle of banking, μ = Coefficient of friction",
        "examTip": "At optimum speed v_opt, no friction is required to negotiate the curve.",
        "trap": "For unbanked flat road, set θ = 0 to get v_max = √(μrg)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-laws-of-motion-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Laws of Motion",
    "topic": "Impulse & Momentum",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Newton’s laws of dynamics, momentum conservation, friction, and circular banking.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Impulse & Momentum.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Newton’s Second Law & Impulse",
        "formula": "\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt} = m\\vec{a}, \\quad \\vec{J} = \\Delta\\vec{p} = \\int \\vec{F}\\,dt",
        "variables": "p = Momentum (mv), F = External force, J = Impulse, m = Inertial mass",
        "examTip": "Area under Force vs Time graph directly gives impulse (change in momentum).",
        "trap": "Action and reaction forces act on DIFFERENT bodies, never cancelling each other out."
      },
      {
        "name": "Friction & Angle of Repose",
        "formula": "f_s \\le \\mu_s N, \\quad f_k = \\mu_k N, \\quad \\tan\\alpha = \\mu_s",
        "variables": "f_s = Static friction, f_k = Kinetic friction, N = Normal reaction, α = Angle of repose",
        "examTip": "Static friction is self-adjusting; its value equals applied force up to μ_s·N.",
        "trap": "Static friction is not always μ_s·N; μ_s·N is only its maximum limiting value."
      },
      {
        "name": "Banking of Roads",
        "formula": "v_{\\text{opt}} = \\sqrt{rg\\tan\\theta}, \\quad v_{\\max} = \\sqrt{rg\\left(\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\right)}",
        "variables": "r = Radius of curve, θ = Angle of banking, μ = Coefficient of friction",
        "examTip": "At optimum speed v_opt, no friction is required to negotiate the curve.",
        "trap": "For unbanked flat road, set θ = 0 to get v_max = √(μrg)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-work--energy-and-power-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Work, Energy and Power",
    "topic": "Work-Energy Theorem",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Work-Energy theorem, conservative force potential energy, power, and collisions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Work-Energy Theorem.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Work-Energy Theorem",
        "formula": "W_{\\text{net}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2",
        "variables": "W_net = Work done by all forces (conservative + non-conservative + external)",
        "examTip": "Work-Energy theorem applies to all frames (with pseudo work in non-inertial frames).",
        "trap": "Do not forget work done by internal non-conservative forces like friction."
      },
      {
        "name": "Conservative Force & Potential Energy",
        "formula": "F_x = -\\frac{dU}{dx}, \\quad U_{\\text{spring}} = \\frac{1}{2}k x^2, \\quad P = \\vec{F}\\cdot\\vec{v}",
        "variables": "U = Potential energy, k = Spring constant, x = Displacement, P = Instantaneous power",
        "examTip": "Stable equilibrium occurs where dU/dx = 0 and d²U/dx² > 0 (U is minimum).",
        "trap": "Work done by conservative force is W_c = -ΔU."
      },
      {
        "name": "1D Elastic Collision Velocities",
        "formula": "v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1 + \\frac{2m_2}{m_1 + m_2}u_2, \\quad e = \\frac{v_2 - v_1}{u_1 - u_2}",
        "variables": "u = Pre-collision velocity, v = Post-collision velocity, e = Coefficient of restitution",
        "examTip": "For equal masses (m₁ = m₂) in 1D elastic collision, bodies interchange velocities: v₁ = u₂, v₂ = u₁.",
        "trap": "For perfectly inelastic collision: e = 0, bodies move together with common velocity."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-work--energy-and-power-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Work, Energy and Power",
    "topic": "Conservative Forces & Potential Energy",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Work-Energy theorem, conservative force potential energy, power, and collisions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Conservative Forces & Potential Energy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Work-Energy Theorem",
        "formula": "W_{\\text{net}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2",
        "variables": "W_net = Work done by all forces (conservative + non-conservative + external)",
        "examTip": "Work-Energy theorem applies to all frames (with pseudo work in non-inertial frames).",
        "trap": "Do not forget work done by internal non-conservative forces like friction."
      },
      {
        "name": "Conservative Force & Potential Energy",
        "formula": "F_x = -\\frac{dU}{dx}, \\quad U_{\\text{spring}} = \\frac{1}{2}k x^2, \\quad P = \\vec{F}\\cdot\\vec{v}",
        "variables": "U = Potential energy, k = Spring constant, x = Displacement, P = Instantaneous power",
        "examTip": "Stable equilibrium occurs where dU/dx = 0 and d²U/dx² > 0 (U is minimum).",
        "trap": "Work done by conservative force is W_c = -ΔU."
      },
      {
        "name": "1D Elastic Collision Velocities",
        "formula": "v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1 + \\frac{2m_2}{m_1 + m_2}u_2, \\quad e = \\frac{v_2 - v_1}{u_1 - u_2}",
        "variables": "u = Pre-collision velocity, v = Post-collision velocity, e = Coefficient of restitution",
        "examTip": "For equal masses (m₁ = m₂) in 1D elastic collision, bodies interchange velocities: v₁ = u₂, v₂ = u₁.",
        "trap": "For perfectly inelastic collision: e = 0, bodies move together with common velocity."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-work--energy-and-power-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Work, Energy and Power",
    "topic": "1D & 2D Elastic Collisions",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Work-Energy theorem, conservative force potential energy, power, and collisions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for 1D & 2D Elastic Collisions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Work-Energy Theorem",
        "formula": "W_{\\text{net}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2",
        "variables": "W_net = Work done by all forces (conservative + non-conservative + external)",
        "examTip": "Work-Energy theorem applies to all frames (with pseudo work in non-inertial frames).",
        "trap": "Do not forget work done by internal non-conservative forces like friction."
      },
      {
        "name": "Conservative Force & Potential Energy",
        "formula": "F_x = -\\frac{dU}{dx}, \\quad U_{\\text{spring}} = \\frac{1}{2}k x^2, \\quad P = \\vec{F}\\cdot\\vec{v}",
        "variables": "U = Potential energy, k = Spring constant, x = Displacement, P = Instantaneous power",
        "examTip": "Stable equilibrium occurs where dU/dx = 0 and d²U/dx² > 0 (U is minimum).",
        "trap": "Work done by conservative force is W_c = -ΔU."
      },
      {
        "name": "1D Elastic Collision Velocities",
        "formula": "v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1 + \\frac{2m_2}{m_1 + m_2}u_2, \\quad e = \\frac{v_2 - v_1}{u_1 - u_2}",
        "variables": "u = Pre-collision velocity, v = Post-collision velocity, e = Coefficient of restitution",
        "examTip": "For equal masses (m₁ = m₂) in 1D elastic collision, bodies interchange velocities: v₁ = u₂, v₂ = u₁.",
        "trap": "For perfectly inelastic collision: e = 0, bodies move together with common velocity."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-work--energy-and-power-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Work, Energy and Power",
    "topic": "Power & Efficiency",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Work-Energy theorem, conservative force potential energy, power, and collisions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Power & Efficiency.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Work-Energy Theorem",
        "formula": "W_{\\text{net}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2",
        "variables": "W_net = Work done by all forces (conservative + non-conservative + external)",
        "examTip": "Work-Energy theorem applies to all frames (with pseudo work in non-inertial frames).",
        "trap": "Do not forget work done by internal non-conservative forces like friction."
      },
      {
        "name": "Conservative Force & Potential Energy",
        "formula": "F_x = -\\frac{dU}{dx}, \\quad U_{\\text{spring}} = \\frac{1}{2}k x^2, \\quad P = \\vec{F}\\cdot\\vec{v}",
        "variables": "U = Potential energy, k = Spring constant, x = Displacement, P = Instantaneous power",
        "examTip": "Stable equilibrium occurs where dU/dx = 0 and d²U/dx² > 0 (U is minimum).",
        "trap": "Work done by conservative force is W_c = -ΔU."
      },
      {
        "name": "1D Elastic Collision Velocities",
        "formula": "v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1 + \\frac{2m_2}{m_1 + m_2}u_2, \\quad e = \\frac{v_2 - v_1}{u_1 - u_2}",
        "variables": "u = Pre-collision velocity, v = Post-collision velocity, e = Coefficient of restitution",
        "examTip": "For equal masses (m₁ = m₂) in 1D elastic collision, bodies interchange velocities: v₁ = u₂, v₂ = u₁.",
        "trap": "For perfectly inelastic collision: e = 0, bodies move together with common velocity."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-work--energy-and-power-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Work, Energy and Power",
    "topic": "Spring Potential Energy",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Work-Energy theorem, conservative force potential energy, power, and collisions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Spring Potential Energy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Work-Energy Theorem",
        "formula": "W_{\\text{net}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2",
        "variables": "W_net = Work done by all forces (conservative + non-conservative + external)",
        "examTip": "Work-Energy theorem applies to all frames (with pseudo work in non-inertial frames).",
        "trap": "Do not forget work done by internal non-conservative forces like friction."
      },
      {
        "name": "Conservative Force & Potential Energy",
        "formula": "F_x = -\\frac{dU}{dx}, \\quad U_{\\text{spring}} = \\frac{1}{2}k x^2, \\quad P = \\vec{F}\\cdot\\vec{v}",
        "variables": "U = Potential energy, k = Spring constant, x = Displacement, P = Instantaneous power",
        "examTip": "Stable equilibrium occurs where dU/dx = 0 and d²U/dx² > 0 (U is minimum).",
        "trap": "Work done by conservative force is W_c = -ΔU."
      },
      {
        "name": "1D Elastic Collision Velocities",
        "formula": "v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1 + \\frac{2m_2}{m_1 + m_2}u_2, \\quad e = \\frac{v_2 - v_1}{u_1 - u_2}",
        "variables": "u = Pre-collision velocity, v = Post-collision velocity, e = Coefficient of restitution",
        "examTip": "For equal masses (m₁ = m₂) in 1D elastic collision, bodies interchange velocities: v₁ = u₂, v₂ = u₁.",
        "trap": "For perfectly inelastic collision: e = 0, bodies move together with common velocity."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-system-of-particles-and-rotational-motion-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "Center of Mass",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Center of mass, rotational dynamics, moment of inertia theorems, and rolling motion.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Center of Mass.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Center of Mass Coordinates",
        "formula": "\\vec{r}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i} = \\frac{\\int \\vec{r}\\,dm}{\\int dm}",
        "variables": "r_cm = Position vector of center of mass, dm = Element mass",
        "examTip": "If net external force is zero, velocity of center of mass remains constant (v_cm = const).",
        "trap": "Internal explosions do not alter the parabolic path of the center of mass."
      },
      {
        "name": "Parallel & Perpendicular Axis Theorems",
        "formula": "I = I_{\\text{cm}} + M d^2, \\quad I_z = I_x + I_y \\text{ (planar lamina)}",
        "variables": "I = Moment of inertia, d = Distance between axes, M = Total body mass",
        "examTip": "Perpendicular axis theorem strictly applies ONLY to 2D planar laminas.",
        "trap": "In parallel axis theorem, one axis MUST pass through the center of mass."
      },
      {
        "name": "Rolling Without Slipping Energy & Acceleration",
        "formula": "K_{\\text{total}} = \\frac{1}{2}M v_{\\text{cm}}^2\\left(1 + \\frac{k^2}{R^2}\\right), \\quad a = \\frac{g\\sin\\theta}{1 + \\frac{k^2}{R^2}}",
        "variables": "k = Radius of gyration, R = Radius, θ = Incline angle",
        "examTip": "k²/R² values: Ring/Hoop = 1, Disc/Cylinder = 1/2, Solid Sphere = 2/5, Hollow Sphere = 2/3.",
        "trap": "Body with smallest k²/R² rolls down an incline with maximum acceleration and reaches bottom first (Solid sphere wins)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-system-of-particles-and-rotational-motion-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "Moment of Inertia Theorems",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Center of mass, rotational dynamics, moment of inertia theorems, and rolling motion.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Moment of Inertia Theorems.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Center of Mass Coordinates",
        "formula": "\\vec{r}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i} = \\frac{\\int \\vec{r}\\,dm}{\\int dm}",
        "variables": "r_cm = Position vector of center of mass, dm = Element mass",
        "examTip": "If net external force is zero, velocity of center of mass remains constant (v_cm = const).",
        "trap": "Internal explosions do not alter the parabolic path of the center of mass."
      },
      {
        "name": "Parallel & Perpendicular Axis Theorems",
        "formula": "I = I_{\\text{cm}} + M d^2, \\quad I_z = I_x + I_y \\text{ (planar lamina)}",
        "variables": "I = Moment of inertia, d = Distance between axes, M = Total body mass",
        "examTip": "Perpendicular axis theorem strictly applies ONLY to 2D planar laminas.",
        "trap": "In parallel axis theorem, one axis MUST pass through the center of mass."
      },
      {
        "name": "Rolling Without Slipping Energy & Acceleration",
        "formula": "K_{\\text{total}} = \\frac{1}{2}M v_{\\text{cm}}^2\\left(1 + \\frac{k^2}{R^2}\\right), \\quad a = \\frac{g\\sin\\theta}{1 + \\frac{k^2}{R^2}}",
        "variables": "k = Radius of gyration, R = Radius, θ = Incline angle",
        "examTip": "k²/R² values: Ring/Hoop = 1, Disc/Cylinder = 1/2, Solid Sphere = 2/5, Hollow Sphere = 2/3.",
        "trap": "Body with smallest k²/R² rolls down an incline with maximum acceleration and reaches bottom first (Solid sphere wins)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-system-of-particles-and-rotational-motion-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "Torque & Angular Acceleration",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Center of mass, rotational dynamics, moment of inertia theorems, and rolling motion.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Torque & Angular Acceleration.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Center of Mass Coordinates",
        "formula": "\\vec{r}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i} = \\frac{\\int \\vec{r}\\,dm}{\\int dm}",
        "variables": "r_cm = Position vector of center of mass, dm = Element mass",
        "examTip": "If net external force is zero, velocity of center of mass remains constant (v_cm = const).",
        "trap": "Internal explosions do not alter the parabolic path of the center of mass."
      },
      {
        "name": "Parallel & Perpendicular Axis Theorems",
        "formula": "I = I_{\\text{cm}} + M d^2, \\quad I_z = I_x + I_y \\text{ (planar lamina)}",
        "variables": "I = Moment of inertia, d = Distance between axes, M = Total body mass",
        "examTip": "Perpendicular axis theorem strictly applies ONLY to 2D planar laminas.",
        "trap": "In parallel axis theorem, one axis MUST pass through the center of mass."
      },
      {
        "name": "Rolling Without Slipping Energy & Acceleration",
        "formula": "K_{\\text{total}} = \\frac{1}{2}M v_{\\text{cm}}^2\\left(1 + \\frac{k^2}{R^2}\\right), \\quad a = \\frac{g\\sin\\theta}{1 + \\frac{k^2}{R^2}}",
        "variables": "k = Radius of gyration, R = Radius, θ = Incline angle",
        "examTip": "k²/R² values: Ring/Hoop = 1, Disc/Cylinder = 1/2, Solid Sphere = 2/5, Hollow Sphere = 2/3.",
        "trap": "Body with smallest k²/R² rolls down an incline with maximum acceleration and reaches bottom first (Solid sphere wins)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-system-of-particles-and-rotational-motion-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "Conservation of Angular Momentum",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Center of mass, rotational dynamics, moment of inertia theorems, and rolling motion.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Conservation of Angular Momentum.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Center of Mass Coordinates",
        "formula": "\\vec{r}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i} = \\frac{\\int \\vec{r}\\,dm}{\\int dm}",
        "variables": "r_cm = Position vector of center of mass, dm = Element mass",
        "examTip": "If net external force is zero, velocity of center of mass remains constant (v_cm = const).",
        "trap": "Internal explosions do not alter the parabolic path of the center of mass."
      },
      {
        "name": "Parallel & Perpendicular Axis Theorems",
        "formula": "I = I_{\\text{cm}} + M d^2, \\quad I_z = I_x + I_y \\text{ (planar lamina)}",
        "variables": "I = Moment of inertia, d = Distance between axes, M = Total body mass",
        "examTip": "Perpendicular axis theorem strictly applies ONLY to 2D planar laminas.",
        "trap": "In parallel axis theorem, one axis MUST pass through the center of mass."
      },
      {
        "name": "Rolling Without Slipping Energy & Acceleration",
        "formula": "K_{\\text{total}} = \\frac{1}{2}M v_{\\text{cm}}^2\\left(1 + \\frac{k^2}{R^2}\\right), \\quad a = \\frac{g\\sin\\theta}{1 + \\frac{k^2}{R^2}}",
        "variables": "k = Radius of gyration, R = Radius, θ = Incline angle",
        "examTip": "k²/R² values: Ring/Hoop = 1, Disc/Cylinder = 1/2, Solid Sphere = 2/5, Hollow Sphere = 2/3.",
        "trap": "Body with smallest k²/R² rolls down an incline with maximum acceleration and reaches bottom first (Solid sphere wins)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-system-of-particles-and-rotational-motion-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "System of Particles and Rotational Motion",
    "topic": "Rolling without Slipping",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Center of mass, rotational dynamics, moment of inertia theorems, and rolling motion.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Rolling without Slipping.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Center of Mass Coordinates",
        "formula": "\\vec{r}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i} = \\frac{\\int \\vec{r}\\,dm}{\\int dm}",
        "variables": "r_cm = Position vector of center of mass, dm = Element mass",
        "examTip": "If net external force is zero, velocity of center of mass remains constant (v_cm = const).",
        "trap": "Internal explosions do not alter the parabolic path of the center of mass."
      },
      {
        "name": "Parallel & Perpendicular Axis Theorems",
        "formula": "I = I_{\\text{cm}} + M d^2, \\quad I_z = I_x + I_y \\text{ (planar lamina)}",
        "variables": "I = Moment of inertia, d = Distance between axes, M = Total body mass",
        "examTip": "Perpendicular axis theorem strictly applies ONLY to 2D planar laminas.",
        "trap": "In parallel axis theorem, one axis MUST pass through the center of mass."
      },
      {
        "name": "Rolling Without Slipping Energy & Acceleration",
        "formula": "K_{\\text{total}} = \\frac{1}{2}M v_{\\text{cm}}^2\\left(1 + \\frac{k^2}{R^2}\\right), \\quad a = \\frac{g\\sin\\theta}{1 + \\frac{k^2}{R^2}}",
        "variables": "k = Radius of gyration, R = Radius, θ = Incline angle",
        "examTip": "k²/R² values: Ring/Hoop = 1, Disc/Cylinder = 1/2, Solid Sphere = 2/5, Hollow Sphere = 2/3.",
        "trap": "Body with smallest k²/R² rolls down an incline with maximum acceleration and reaches bottom first (Solid sphere wins)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-gravitation-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Gravitation",
    "topic": "Newton's Law of Gravitation",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Newtonian gravity, acceleration due to gravity variation, potential, and orbital velocity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Newton's Law of Gravitation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Variation of g with Altitude and Depth",
        "formula": "g_h = g\\left(1 - \\frac{2h}{R}\\right) = \\frac{g}{\\left(1 + \\frac{h}{R}\\right)^2}, \\quad g_d = g\\left(1 - \\frac{d}{R}\\right)",
        "variables": "g = 9.8 m/s², R = 6400 km (Earth radius), h = Height, d = Depth",
        "examTip": "Approximation g(1 - 2h/R) is valid ONLY when h << R (e.g. h < 500 km).",
        "trap": "At Earth center (d = R), acceleration due to gravity is exactly zero."
      },
      {
        "name": "Escape & Orbital Velocity",
        "formula": "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\text{ km/s}, \\quad v_o = \\sqrt{\\frac{GM}{r}} = \\frac{v_e}{\\sqrt{2}}",
        "variables": "G = 6.67 × 10⁻¹¹ N·m²/kg², M = Planet mass, R = Planet radius",
        "examTip": "Escape velocity is completely independent of mass and launch angle of projectile.",
        "trap": "Kinetic energy needed for escape is K = GMm/R, not 1/2 m g R."
      },
      {
        "name": "Kepler’s Third Law",
        "formula": "T^2 = \\frac{4\\pi^2}{GM} a^3 \\implies T^2 \\propto a^3",
        "variables": "T = Orbital period, a = Semi-major axis of elliptical orbit",
        "examTip": "Ratio of areal velocity is constant: dA/dt = L / (2m) (Kepler’s 2nd law).",
        "trap": "Use semi-major axis, not minor axis or radius of perihelion."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-gravitation-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Gravitation",
    "topic": "Acceleration due to Gravity g",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Newtonian gravity, acceleration due to gravity variation, potential, and orbital velocity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Acceleration due to Gravity g.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Variation of g with Altitude and Depth",
        "formula": "g_h = g\\left(1 - \\frac{2h}{R}\\right) = \\frac{g}{\\left(1 + \\frac{h}{R}\\right)^2}, \\quad g_d = g\\left(1 - \\frac{d}{R}\\right)",
        "variables": "g = 9.8 m/s², R = 6400 km (Earth radius), h = Height, d = Depth",
        "examTip": "Approximation g(1 - 2h/R) is valid ONLY when h << R (e.g. h < 500 km).",
        "trap": "At Earth center (d = R), acceleration due to gravity is exactly zero."
      },
      {
        "name": "Escape & Orbital Velocity",
        "formula": "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\text{ km/s}, \\quad v_o = \\sqrt{\\frac{GM}{r}} = \\frac{v_e}{\\sqrt{2}}",
        "variables": "G = 6.67 × 10⁻¹¹ N·m²/kg², M = Planet mass, R = Planet radius",
        "examTip": "Escape velocity is completely independent of mass and launch angle of projectile.",
        "trap": "Kinetic energy needed for escape is K = GMm/R, not 1/2 m g R."
      },
      {
        "name": "Kepler’s Third Law",
        "formula": "T^2 = \\frac{4\\pi^2}{GM} a^3 \\implies T^2 \\propto a^3",
        "variables": "T = Orbital period, a = Semi-major axis of elliptical orbit",
        "examTip": "Ratio of areal velocity is constant: dA/dt = L / (2m) (Kepler’s 2nd law).",
        "trap": "Use semi-major axis, not minor axis or radius of perihelion."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-gravitation-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Gravitation",
    "topic": "Gravitational Potential & Field",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Newtonian gravity, acceleration due to gravity variation, potential, and orbital velocity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Gravitational Potential & Field.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Variation of g with Altitude and Depth",
        "formula": "g_h = g\\left(1 - \\frac{2h}{R}\\right) = \\frac{g}{\\left(1 + \\frac{h}{R}\\right)^2}, \\quad g_d = g\\left(1 - \\frac{d}{R}\\right)",
        "variables": "g = 9.8 m/s², R = 6400 km (Earth radius), h = Height, d = Depth",
        "examTip": "Approximation g(1 - 2h/R) is valid ONLY when h << R (e.g. h < 500 km).",
        "trap": "At Earth center (d = R), acceleration due to gravity is exactly zero."
      },
      {
        "name": "Escape & Orbital Velocity",
        "formula": "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\text{ km/s}, \\quad v_o = \\sqrt{\\frac{GM}{r}} = \\frac{v_e}{\\sqrt{2}}",
        "variables": "G = 6.67 × 10⁻¹¹ N·m²/kg², M = Planet mass, R = Planet radius",
        "examTip": "Escape velocity is completely independent of mass and launch angle of projectile.",
        "trap": "Kinetic energy needed for escape is K = GMm/R, not 1/2 m g R."
      },
      {
        "name": "Kepler’s Third Law",
        "formula": "T^2 = \\frac{4\\pi^2}{GM} a^3 \\implies T^2 \\propto a^3",
        "variables": "T = Orbital period, a = Semi-major axis of elliptical orbit",
        "examTip": "Ratio of areal velocity is constant: dA/dt = L / (2m) (Kepler’s 2nd law).",
        "trap": "Use semi-major axis, not minor axis or radius of perihelion."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-gravitation-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Gravitation",
    "topic": "Escape Velocity",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Newtonian gravity, acceleration due to gravity variation, potential, and orbital velocity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Escape Velocity.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Variation of g with Altitude and Depth",
        "formula": "g_h = g\\left(1 - \\frac{2h}{R}\\right) = \\frac{g}{\\left(1 + \\frac{h}{R}\\right)^2}, \\quad g_d = g\\left(1 - \\frac{d}{R}\\right)",
        "variables": "g = 9.8 m/s², R = 6400 km (Earth radius), h = Height, d = Depth",
        "examTip": "Approximation g(1 - 2h/R) is valid ONLY when h << R (e.g. h < 500 km).",
        "trap": "At Earth center (d = R), acceleration due to gravity is exactly zero."
      },
      {
        "name": "Escape & Orbital Velocity",
        "formula": "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\text{ km/s}, \\quad v_o = \\sqrt{\\frac{GM}{r}} = \\frac{v_e}{\\sqrt{2}}",
        "variables": "G = 6.67 × 10⁻¹¹ N·m²/kg², M = Planet mass, R = Planet radius",
        "examTip": "Escape velocity is completely independent of mass and launch angle of projectile.",
        "trap": "Kinetic energy needed for escape is K = GMm/R, not 1/2 m g R."
      },
      {
        "name": "Kepler’s Third Law",
        "formula": "T^2 = \\frac{4\\pi^2}{GM} a^3 \\implies T^2 \\propto a^3",
        "variables": "T = Orbital period, a = Semi-major axis of elliptical orbit",
        "examTip": "Ratio of areal velocity is constant: dA/dt = L / (2m) (Kepler’s 2nd law).",
        "trap": "Use semi-major axis, not minor axis or radius of perihelion."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-gravitation-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Gravitation",
    "topic": "Kepler's Laws & Satellites",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Newtonian gravity, acceleration due to gravity variation, potential, and orbital velocity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Kepler's Laws & Satellites.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Variation of g with Altitude and Depth",
        "formula": "g_h = g\\left(1 - \\frac{2h}{R}\\right) = \\frac{g}{\\left(1 + \\frac{h}{R}\\right)^2}, \\quad g_d = g\\left(1 - \\frac{d}{R}\\right)",
        "variables": "g = 9.8 m/s², R = 6400 km (Earth radius), h = Height, d = Depth",
        "examTip": "Approximation g(1 - 2h/R) is valid ONLY when h << R (e.g. h < 500 km).",
        "trap": "At Earth center (d = R), acceleration due to gravity is exactly zero."
      },
      {
        "name": "Escape & Orbital Velocity",
        "formula": "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\text{ km/s}, \\quad v_o = \\sqrt{\\frac{GM}{r}} = \\frac{v_e}{\\sqrt{2}}",
        "variables": "G = 6.67 × 10⁻¹¹ N·m²/kg², M = Planet mass, R = Planet radius",
        "examTip": "Escape velocity is completely independent of mass and launch angle of projectile.",
        "trap": "Kinetic energy needed for escape is K = GMm/R, not 1/2 m g R."
      },
      {
        "name": "Kepler’s Third Law",
        "formula": "T^2 = \\frac{4\\pi^2}{GM} a^3 \\implies T^2 \\propto a^3",
        "variables": "T = Orbital period, a = Semi-major axis of elliptical orbit",
        "examTip": "Ratio of areal velocity is constant: dA/dt = L / (2m) (Kepler’s 2nd law).",
        "trap": "Use semi-major axis, not minor axis or radius of perihelion."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-solids-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Stress-Strain Curve",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Elastic properties of matter, Hooke’s law, moduli of elasticity, and elastic energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Stress-Strain Curve.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Hooke’s Law & Young’s Modulus",
        "formula": "Y = \\frac{\\text{Stress}}{\\text{Strain}} = \\frac{F / A}{\\Delta L / L} = \\frac{F L}{A \\Delta L}",
        "variables": "Y = Young’s modulus, F = Tensile force, A = Cross-sectional area, ΔL = Elongation",
        "examTip": "Young’s modulus is a material property; it does not change with length or wire thickness.",
        "trap": "Thermal stress developed when wire ends are clamped: F/A = Y·α·ΔT."
      },
      {
        "name": "Elastic Potential Energy Density",
        "formula": "u = \\frac{1}{2}\\times\\text{Stress}\\times\\text{Strain} = \\frac{1}{2}Y\\left(\\frac{\\Delta L}{L}\\right)^2 = \\frac{\\text{Stress}^2}{2Y}",
        "variables": "u = Energy stored per unit volume (J/m³)",
        "examTip": "Total work done / energy stored in stretched wire: U = u × Volume = 1/2 F·ΔL.",
        "trap": "Do not multiply by volume if question specifically asks for energy DENSITY."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-solids-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Hooke's Law & Young's Modulus",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Elastic properties of matter, Hooke’s law, moduli of elasticity, and elastic energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Hooke's Law & Young's Modulus.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Hooke’s Law & Young’s Modulus",
        "formula": "Y = \\frac{\\text{Stress}}{\\text{Strain}} = \\frac{F / A}{\\Delta L / L} = \\frac{F L}{A \\Delta L}",
        "variables": "Y = Young’s modulus, F = Tensile force, A = Cross-sectional area, ΔL = Elongation",
        "examTip": "Young’s modulus is a material property; it does not change with length or wire thickness.",
        "trap": "Thermal stress developed when wire ends are clamped: F/A = Y·α·ΔT."
      },
      {
        "name": "Elastic Potential Energy Density",
        "formula": "u = \\frac{1}{2}\\times\\text{Stress}\\times\\text{Strain} = \\frac{1}{2}Y\\left(\\frac{\\Delta L}{L}\\right)^2 = \\frac{\\text{Stress}^2}{2Y}",
        "variables": "u = Energy stored per unit volume (J/m³)",
        "examTip": "Total work done / energy stored in stretched wire: U = u × Volume = 1/2 F·ΔL.",
        "trap": "Do not multiply by volume if question specifically asks for energy DENSITY."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-solids-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Bulk Modulus & Rigidity",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Elastic properties of matter, Hooke’s law, moduli of elasticity, and elastic energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Bulk Modulus & Rigidity.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Hooke’s Law & Young’s Modulus",
        "formula": "Y = \\frac{\\text{Stress}}{\\text{Strain}} = \\frac{F / A}{\\Delta L / L} = \\frac{F L}{A \\Delta L}",
        "variables": "Y = Young’s modulus, F = Tensile force, A = Cross-sectional area, ΔL = Elongation",
        "examTip": "Young’s modulus is a material property; it does not change with length or wire thickness.",
        "trap": "Thermal stress developed when wire ends are clamped: F/A = Y·α·ΔT."
      },
      {
        "name": "Elastic Potential Energy Density",
        "formula": "u = \\frac{1}{2}\\times\\text{Stress}\\times\\text{Strain} = \\frac{1}{2}Y\\left(\\frac{\\Delta L}{L}\\right)^2 = \\frac{\\text{Stress}^2}{2Y}",
        "variables": "u = Energy stored per unit volume (J/m³)",
        "examTip": "Total work done / energy stored in stretched wire: U = u × Volume = 1/2 F·ΔL.",
        "trap": "Do not multiply by volume if question specifically asks for energy DENSITY."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-solids-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Elastic Potential Energy",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Elastic properties of matter, Hooke’s law, moduli of elasticity, and elastic energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Elastic Potential Energy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Hooke’s Law & Young’s Modulus",
        "formula": "Y = \\frac{\\text{Stress}}{\\text{Strain}} = \\frac{F / A}{\\Delta L / L} = \\frac{F L}{A \\Delta L}",
        "variables": "Y = Young’s modulus, F = Tensile force, A = Cross-sectional area, ΔL = Elongation",
        "examTip": "Young’s modulus is a material property; it does not change with length or wire thickness.",
        "trap": "Thermal stress developed when wire ends are clamped: F/A = Y·α·ΔT."
      },
      {
        "name": "Elastic Potential Energy Density",
        "formula": "u = \\frac{1}{2}\\times\\text{Stress}\\times\\text{Strain} = \\frac{1}{2}Y\\left(\\frac{\\Delta L}{L}\\right)^2 = \\frac{\\text{Stress}^2}{2Y}",
        "variables": "u = Energy stored per unit volume (J/m³)",
        "examTip": "Total work done / energy stored in stretched wire: U = u × Volume = 1/2 F·ΔL.",
        "trap": "Do not multiply by volume if question specifically asks for energy DENSITY."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-solids-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Solids",
    "topic": "Thermal Stress",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Elastic properties of matter, Hooke’s law, moduli of elasticity, and elastic energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Thermal Stress.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Hooke’s Law & Young’s Modulus",
        "formula": "Y = \\frac{\\text{Stress}}{\\text{Strain}} = \\frac{F / A}{\\Delta L / L} = \\frac{F L}{A \\Delta L}",
        "variables": "Y = Young’s modulus, F = Tensile force, A = Cross-sectional area, ΔL = Elongation",
        "examTip": "Young’s modulus is a material property; it does not change with length or wire thickness.",
        "trap": "Thermal stress developed when wire ends are clamped: F/A = Y·α·ΔT."
      },
      {
        "name": "Elastic Potential Energy Density",
        "formula": "u = \\frac{1}{2}\\times\\text{Stress}\\times\\text{Strain} = \\frac{1}{2}Y\\left(\\frac{\\Delta L}{L}\\right)^2 = \\frac{\\text{Stress}^2}{2Y}",
        "variables": "u = Energy stored per unit volume (J/m³)",
        "examTip": "Total work done / energy stored in stretched wire: U = u × Volume = 1/2 F·ΔL.",
        "trap": "Do not multiply by volume if question specifically asks for energy DENSITY."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-fluids-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Pascal's Law & Hydraulic Lift",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Hydrostatics, Pascal’s law, Bernoulli’s theorem, viscosity, and surface tension.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Pascal's Law & Hydraulic Lift.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bernoulli’s Theorem & Torricelli Efflux",
        "formula": "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}, \\quad v_{\\text{efflux}} = \\sqrt{2gh}",
        "variables": "P = Static pressure, ρ = Fluid density, v = Flow speed, h = Height above datum",
        "examTip": "Horizontal range of efflux jet from tank: R = 2√(h(H - h)), maximum at h = H/2.",
        "trap": "Strictly valid only for incompressible, non-viscous, streamline laminar flow."
      },
      {
        "name": "Stokes’ Law & Terminal Velocity",
        "formula": "F_v = 6\\pi\\eta r v, \\quad v_t = \\frac{2}{9}\\frac{r^2(\\rho - \\sigma)g}{\\eta}",
        "variables": "η = Viscosity, r = Sphere radius, ρ = Sphere density, σ = Fluid density",
        "examTip": "Terminal velocity is proportional to the square of radius: v_t ∝ r².",
        "trap": "If fluid density σ > sphere density ρ, body moves UPWARD with terminal speed (e.g. air bubble in water)."
      },
      {
        "name": "Excess Pressure & Capillary Rise",
        "formula": "\\Delta P_{\\text{drop}} = \\frac{2T}{R}, \\quad \\Delta P_{\\text{bubble}} = \\frac{4T}{R}, \\quad h = \\frac{2T\\cos\\theta}{r\\rho g}",
        "variables": "T = Surface tension, R = Radius of meniscus, θ = Contact angle, r = Tube radius",
        "examTip": "Soap bubble in air has TWO surfaces, hence excess pressure is 4T/R.",
        "trap": "If capillary tube length is insufficient (L < h), liquid never overflows; its radius of curvature increases to R = hr/L."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-fluids-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Archimedes Principle & Buoyancy",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Hydrostatics, Pascal’s law, Bernoulli’s theorem, viscosity, and surface tension.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Archimedes Principle & Buoyancy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bernoulli’s Theorem & Torricelli Efflux",
        "formula": "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}, \\quad v_{\\text{efflux}} = \\sqrt{2gh}",
        "variables": "P = Static pressure, ρ = Fluid density, v = Flow speed, h = Height above datum",
        "examTip": "Horizontal range of efflux jet from tank: R = 2√(h(H - h)), maximum at h = H/2.",
        "trap": "Strictly valid only for incompressible, non-viscous, streamline laminar flow."
      },
      {
        "name": "Stokes’ Law & Terminal Velocity",
        "formula": "F_v = 6\\pi\\eta r v, \\quad v_t = \\frac{2}{9}\\frac{r^2(\\rho - \\sigma)g}{\\eta}",
        "variables": "η = Viscosity, r = Sphere radius, ρ = Sphere density, σ = Fluid density",
        "examTip": "Terminal velocity is proportional to the square of radius: v_t ∝ r².",
        "trap": "If fluid density σ > sphere density ρ, body moves UPWARD with terminal speed (e.g. air bubble in water)."
      },
      {
        "name": "Excess Pressure & Capillary Rise",
        "formula": "\\Delta P_{\\text{drop}} = \\frac{2T}{R}, \\quad \\Delta P_{\\text{bubble}} = \\frac{4T}{R}, \\quad h = \\frac{2T\\cos\\theta}{r\\rho g}",
        "variables": "T = Surface tension, R = Radius of meniscus, θ = Contact angle, r = Tube radius",
        "examTip": "Soap bubble in air has TWO surfaces, hence excess pressure is 4T/R.",
        "trap": "If capillary tube length is insufficient (L < h), liquid never overflows; its radius of curvature increases to R = hr/L."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-fluids-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Continuity Equation",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Hydrostatics, Pascal’s law, Bernoulli’s theorem, viscosity, and surface tension.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Continuity Equation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bernoulli’s Theorem & Torricelli Efflux",
        "formula": "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}, \\quad v_{\\text{efflux}} = \\sqrt{2gh}",
        "variables": "P = Static pressure, ρ = Fluid density, v = Flow speed, h = Height above datum",
        "examTip": "Horizontal range of efflux jet from tank: R = 2√(h(H - h)), maximum at h = H/2.",
        "trap": "Strictly valid only for incompressible, non-viscous, streamline laminar flow."
      },
      {
        "name": "Stokes’ Law & Terminal Velocity",
        "formula": "F_v = 6\\pi\\eta r v, \\quad v_t = \\frac{2}{9}\\frac{r^2(\\rho - \\sigma)g}{\\eta}",
        "variables": "η = Viscosity, r = Sphere radius, ρ = Sphere density, σ = Fluid density",
        "examTip": "Terminal velocity is proportional to the square of radius: v_t ∝ r².",
        "trap": "If fluid density σ > sphere density ρ, body moves UPWARD with terminal speed (e.g. air bubble in water)."
      },
      {
        "name": "Excess Pressure & Capillary Rise",
        "formula": "\\Delta P_{\\text{drop}} = \\frac{2T}{R}, \\quad \\Delta P_{\\text{bubble}} = \\frac{4T}{R}, \\quad h = \\frac{2T\\cos\\theta}{r\\rho g}",
        "variables": "T = Surface tension, R = Radius of meniscus, θ = Contact angle, r = Tube radius",
        "examTip": "Soap bubble in air has TWO surfaces, hence excess pressure is 4T/R.",
        "trap": "If capillary tube length is insufficient (L < h), liquid never overflows; its radius of curvature increases to R = hr/L."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-fluids-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Bernoulli's Theorem",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Hydrostatics, Pascal’s law, Bernoulli’s theorem, viscosity, and surface tension.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Bernoulli's Theorem.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bernoulli’s Theorem & Torricelli Efflux",
        "formula": "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}, \\quad v_{\\text{efflux}} = \\sqrt{2gh}",
        "variables": "P = Static pressure, ρ = Fluid density, v = Flow speed, h = Height above datum",
        "examTip": "Horizontal range of efflux jet from tank: R = 2√(h(H - h)), maximum at h = H/2.",
        "trap": "Strictly valid only for incompressible, non-viscous, streamline laminar flow."
      },
      {
        "name": "Stokes’ Law & Terminal Velocity",
        "formula": "F_v = 6\\pi\\eta r v, \\quad v_t = \\frac{2}{9}\\frac{r^2(\\rho - \\sigma)g}{\\eta}",
        "variables": "η = Viscosity, r = Sphere radius, ρ = Sphere density, σ = Fluid density",
        "examTip": "Terminal velocity is proportional to the square of radius: v_t ∝ r².",
        "trap": "If fluid density σ > sphere density ρ, body moves UPWARD with terminal speed (e.g. air bubble in water)."
      },
      {
        "name": "Excess Pressure & Capillary Rise",
        "formula": "\\Delta P_{\\text{drop}} = \\frac{2T}{R}, \\quad \\Delta P_{\\text{bubble}} = \\frac{4T}{R}, \\quad h = \\frac{2T\\cos\\theta}{r\\rho g}",
        "variables": "T = Surface tension, R = Radius of meniscus, θ = Contact angle, r = Tube radius",
        "examTip": "Soap bubble in air has TWO surfaces, hence excess pressure is 4T/R.",
        "trap": "If capillary tube length is insufficient (L < h), liquid never overflows; its radius of curvature increases to R = hr/L."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-fluids-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Viscosity & Terminal Velocity",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Hydrostatics, Pascal’s law, Bernoulli’s theorem, viscosity, and surface tension.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Viscosity & Terminal Velocity.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bernoulli’s Theorem & Torricelli Efflux",
        "formula": "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}, \\quad v_{\\text{efflux}} = \\sqrt{2gh}",
        "variables": "P = Static pressure, ρ = Fluid density, v = Flow speed, h = Height above datum",
        "examTip": "Horizontal range of efflux jet from tank: R = 2√(h(H - h)), maximum at h = H/2.",
        "trap": "Strictly valid only for incompressible, non-viscous, streamline laminar flow."
      },
      {
        "name": "Stokes’ Law & Terminal Velocity",
        "formula": "F_v = 6\\pi\\eta r v, \\quad v_t = \\frac{2}{9}\\frac{r^2(\\rho - \\sigma)g}{\\eta}",
        "variables": "η = Viscosity, r = Sphere radius, ρ = Sphere density, σ = Fluid density",
        "examTip": "Terminal velocity is proportional to the square of radius: v_t ∝ r².",
        "trap": "If fluid density σ > sphere density ρ, body moves UPWARD with terminal speed (e.g. air bubble in water)."
      },
      {
        "name": "Excess Pressure & Capillary Rise",
        "formula": "\\Delta P_{\\text{drop}} = \\frac{2T}{R}, \\quad \\Delta P_{\\text{bubble}} = \\frac{4T}{R}, \\quad h = \\frac{2T\\cos\\theta}{r\\rho g}",
        "variables": "T = Surface tension, R = Radius of meniscus, θ = Contact angle, r = Tube radius",
        "examTip": "Soap bubble in air has TWO surfaces, hence excess pressure is 4T/R.",
        "trap": "If capillary tube length is insufficient (L < h), liquid never overflows; its radius of curvature increases to R = hr/L."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-mechanical-properties-of-fluids-6",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Mechanical Properties of Fluids",
    "topic": "Surface Tension & Capillarity",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Hydrostatics, Pascal’s law, Bernoulli’s theorem, viscosity, and surface tension.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Surface Tension & Capillarity.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bernoulli’s Theorem & Torricelli Efflux",
        "formula": "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}, \\quad v_{\\text{efflux}} = \\sqrt{2gh}",
        "variables": "P = Static pressure, ρ = Fluid density, v = Flow speed, h = Height above datum",
        "examTip": "Horizontal range of efflux jet from tank: R = 2√(h(H - h)), maximum at h = H/2.",
        "trap": "Strictly valid only for incompressible, non-viscous, streamline laminar flow."
      },
      {
        "name": "Stokes’ Law & Terminal Velocity",
        "formula": "F_v = 6\\pi\\eta r v, \\quad v_t = \\frac{2}{9}\\frac{r^2(\\rho - \\sigma)g}{\\eta}",
        "variables": "η = Viscosity, r = Sphere radius, ρ = Sphere density, σ = Fluid density",
        "examTip": "Terminal velocity is proportional to the square of radius: v_t ∝ r².",
        "trap": "If fluid density σ > sphere density ρ, body moves UPWARD with terminal speed (e.g. air bubble in water)."
      },
      {
        "name": "Excess Pressure & Capillary Rise",
        "formula": "\\Delta P_{\\text{drop}} = \\frac{2T}{R}, \\quad \\Delta P_{\\text{bubble}} = \\frac{4T}{R}, \\quad h = \\frac{2T\\cos\\theta}{r\\rho g}",
        "variables": "T = Surface tension, R = Radius of meniscus, θ = Contact angle, r = Tube radius",
        "examTip": "Soap bubble in air has TWO surfaces, hence excess pressure is 4T/R.",
        "trap": "If capillary tube length is insufficient (L < h), liquid never overflows; its radius of curvature increases to R = hr/L."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermal-properties-of-matter-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermal Properties of Matter",
    "topic": "Thermal Expansion",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Calorimetry, thermal expansion, thermal conduction, and radiation laws.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Thermal Expansion.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Thermal Expansion Relationships",
        "formula": "\\Delta L = L_0\\alpha\\Delta T, \\quad \\Delta A = A_0\\beta\\Delta T, \\quad \\Delta V = V_0\\gamma\\Delta T \\implies \\alpha : \\beta : \\gamma = 1 : 2 : 3",
        "variables": "α = Linear expansion, β = Superficial, γ = Volume expansion coefficient",
        "examTip": "Cavity/hole inside a solid expands exactly as if it were filled with that material.",
        "trap": "Apparent expansion of liquid in container: γ_app = γ_real - γ_vessel."
      },
      {
        "name": "Stefan-Boltzmann & Wien’s Displacement Law",
        "formula": "E = e\\sigma A T^4, \\quad \\lambda_{\\max} T = b = 2.898\\times 10^{-3}\\text{ m}\\cdot\\text{K}",
        "variables": "σ = 5.67 × 10⁻⁸ W/(m²·K⁴), e = Emissivity (1 for blackbody), b = Wien constant",
        "examTip": "Net rate of heat loss to surroundings: P_net = eσA(T⁴ - T₀⁴).",
        "trap": "Wien’s law temperature T MUST always be substituted in KELVIN."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermal-properties-of-matter-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermal Properties of Matter",
    "topic": "Specific Heat & Calorimetry",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Calorimetry, thermal expansion, thermal conduction, and radiation laws.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Specific Heat & Calorimetry.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Thermal Expansion Relationships",
        "formula": "\\Delta L = L_0\\alpha\\Delta T, \\quad \\Delta A = A_0\\beta\\Delta T, \\quad \\Delta V = V_0\\gamma\\Delta T \\implies \\alpha : \\beta : \\gamma = 1 : 2 : 3",
        "variables": "α = Linear expansion, β = Superficial, γ = Volume expansion coefficient",
        "examTip": "Cavity/hole inside a solid expands exactly as if it were filled with that material.",
        "trap": "Apparent expansion of liquid in container: γ_app = γ_real - γ_vessel."
      },
      {
        "name": "Stefan-Boltzmann & Wien’s Displacement Law",
        "formula": "E = e\\sigma A T^4, \\quad \\lambda_{\\max} T = b = 2.898\\times 10^{-3}\\text{ m}\\cdot\\text{K}",
        "variables": "σ = 5.67 × 10⁻⁸ W/(m²·K⁴), e = Emissivity (1 for blackbody), b = Wien constant",
        "examTip": "Net rate of heat loss to surroundings: P_net = eσA(T⁴ - T₀⁴).",
        "trap": "Wien’s law temperature T MUST always be substituted in KELVIN."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermal-properties-of-matter-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermal Properties of Matter",
    "topic": "Latent Heat & Phase Change",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Calorimetry, thermal expansion, thermal conduction, and radiation laws.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Latent Heat & Phase Change.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Thermal Expansion Relationships",
        "formula": "\\Delta L = L_0\\alpha\\Delta T, \\quad \\Delta A = A_0\\beta\\Delta T, \\quad \\Delta V = V_0\\gamma\\Delta T \\implies \\alpha : \\beta : \\gamma = 1 : 2 : 3",
        "variables": "α = Linear expansion, β = Superficial, γ = Volume expansion coefficient",
        "examTip": "Cavity/hole inside a solid expands exactly as if it were filled with that material.",
        "trap": "Apparent expansion of liquid in container: γ_app = γ_real - γ_vessel."
      },
      {
        "name": "Stefan-Boltzmann & Wien’s Displacement Law",
        "formula": "E = e\\sigma A T^4, \\quad \\lambda_{\\max} T = b = 2.898\\times 10^{-3}\\text{ m}\\cdot\\text{K}",
        "variables": "σ = 5.67 × 10⁻⁸ W/(m²·K⁴), e = Emissivity (1 for blackbody), b = Wien constant",
        "examTip": "Net rate of heat loss to surroundings: P_net = eσA(T⁴ - T₀⁴).",
        "trap": "Wien’s law temperature T MUST always be substituted in KELVIN."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermal-properties-of-matter-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermal Properties of Matter",
    "topic": "Conduction & Thermal Resistance",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Calorimetry, thermal expansion, thermal conduction, and radiation laws.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Conduction & Thermal Resistance.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Thermal Expansion Relationships",
        "formula": "\\Delta L = L_0\\alpha\\Delta T, \\quad \\Delta A = A_0\\beta\\Delta T, \\quad \\Delta V = V_0\\gamma\\Delta T \\implies \\alpha : \\beta : \\gamma = 1 : 2 : 3",
        "variables": "α = Linear expansion, β = Superficial, γ = Volume expansion coefficient",
        "examTip": "Cavity/hole inside a solid expands exactly as if it were filled with that material.",
        "trap": "Apparent expansion of liquid in container: γ_app = γ_real - γ_vessel."
      },
      {
        "name": "Stefan-Boltzmann & Wien’s Displacement Law",
        "formula": "E = e\\sigma A T^4, \\quad \\lambda_{\\max} T = b = 2.898\\times 10^{-3}\\text{ m}\\cdot\\text{K}",
        "variables": "σ = 5.67 × 10⁻⁸ W/(m²·K⁴), e = Emissivity (1 for blackbody), b = Wien constant",
        "examTip": "Net rate of heat loss to surroundings: P_net = eσA(T⁴ - T₀⁴).",
        "trap": "Wien’s law temperature T MUST always be substituted in KELVIN."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermal-properties-of-matter-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermal Properties of Matter",
    "topic": "Newton's Law of Cooling",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Calorimetry, thermal expansion, thermal conduction, and radiation laws.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Newton's Law of Cooling.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Thermal Expansion Relationships",
        "formula": "\\Delta L = L_0\\alpha\\Delta T, \\quad \\Delta A = A_0\\beta\\Delta T, \\quad \\Delta V = V_0\\gamma\\Delta T \\implies \\alpha : \\beta : \\gamma = 1 : 2 : 3",
        "variables": "α = Linear expansion, β = Superficial, γ = Volume expansion coefficient",
        "examTip": "Cavity/hole inside a solid expands exactly as if it were filled with that material.",
        "trap": "Apparent expansion of liquid in container: γ_app = γ_real - γ_vessel."
      },
      {
        "name": "Stefan-Boltzmann & Wien’s Displacement Law",
        "formula": "E = e\\sigma A T^4, \\quad \\lambda_{\\max} T = b = 2.898\\times 10^{-3}\\text{ m}\\cdot\\text{K}",
        "variables": "σ = 5.67 × 10⁻⁸ W/(m²·K⁴), e = Emissivity (1 for blackbody), b = Wien constant",
        "examTip": "Net rate of heat loss to surroundings: P_net = eσA(T⁴ - T₀⁴).",
        "trap": "Wien’s law temperature T MUST always be substituted in KELVIN."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermal-properties-of-matter-6",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermal Properties of Matter",
    "topic": "Stefan-Boltzmann & Wien's Law",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Calorimetry, thermal expansion, thermal conduction, and radiation laws.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Stefan-Boltzmann & Wien's Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Thermal Expansion Relationships",
        "formula": "\\Delta L = L_0\\alpha\\Delta T, \\quad \\Delta A = A_0\\beta\\Delta T, \\quad \\Delta V = V_0\\gamma\\Delta T \\implies \\alpha : \\beta : \\gamma = 1 : 2 : 3",
        "variables": "α = Linear expansion, β = Superficial, γ = Volume expansion coefficient",
        "examTip": "Cavity/hole inside a solid expands exactly as if it were filled with that material.",
        "trap": "Apparent expansion of liquid in container: γ_app = γ_real - γ_vessel."
      },
      {
        "name": "Stefan-Boltzmann & Wien’s Displacement Law",
        "formula": "E = e\\sigma A T^4, \\quad \\lambda_{\\max} T = b = 2.898\\times 10^{-3}\\text{ m}\\cdot\\text{K}",
        "variables": "σ = 5.67 × 10⁻⁸ W/(m²·K⁴), e = Emissivity (1 for blackbody), b = Wien constant",
        "examTip": "Net rate of heat loss to surroundings: P_net = eσA(T⁴ - T₀⁴).",
        "trap": "Wien’s law temperature T MUST always be substituted in KELVIN."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermodynamics-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermodynamics",
    "topic": "First Law of Thermodynamics",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "First law of thermodynamics, thermodynamic processes, and Carnot heat engines.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for First Law of Thermodynamics.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "First Law of Thermodynamics",
        "formula": "\\Delta Q = \\Delta U + W, \\quad \\Delta U = n C_v \\Delta T = \\frac{nR\\Delta T}{\\gamma - 1}",
        "variables": "Q = Heat supplied, U = Internal energy, W = Work done by system",
        "examTip": "Internal energy U is a state function; ΔU for any cyclic process is strictly ZERO.",
        "trap": "Chemistry convention is ΔU = q + w (work done on system), whereas Physics is ΔQ = ΔU + W."
      },
      {
        "name": "Work Done in Thermodynamic Processes",
        "formula": "W_{\\text{iso}} = nRT\\ln\\left(\\frac{V_2}{V_1}\\right), \\quad W_{\\text{adia}} = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} = \\frac{nR(T_1 - T_2)}{\\gamma - 1}",
        "variables": "γ = C_p / C_v, V₁ = Initial volume, V₂ = Final volume",
        "examTip": "In adiabatic expansion, temperature drops (gas cools): T₁V₁^(γ-1) = T₂V₂^(γ-1).",
        "trap": "In isothermal process: ΔT = 0, so ΔU = 0 and Q = W."
      },
      {
        "name": "Carnot Engine Efficiency & Refrigerator COP",
        "formula": "\\eta = 1 - \\frac{T_C}{T_H} = \\frac{W}{Q_H}, \\quad \\beta = \\frac{T_C}{T_H - T_C} = \\frac{1 - \\eta}{\\eta}",
        "variables": "T_H = Source temp (K), T_C = Sink temp (K), η = Efficiency, β = Coefficient of Performance",
        "examTip": "To increase efficiency of Carnot engine, decreasing sink temp T_C is more effective than increasing source temp T_H.",
        "trap": "Always convert Celsius temperatures to Kelvin before computing ratio."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermodynamics-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermodynamics",
    "topic": "Isothermal & Adiabatic Processes",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "First law of thermodynamics, thermodynamic processes, and Carnot heat engines.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Isothermal & Adiabatic Processes.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "First Law of Thermodynamics",
        "formula": "\\Delta Q = \\Delta U + W, \\quad \\Delta U = n C_v \\Delta T = \\frac{nR\\Delta T}{\\gamma - 1}",
        "variables": "Q = Heat supplied, U = Internal energy, W = Work done by system",
        "examTip": "Internal energy U is a state function; ΔU for any cyclic process is strictly ZERO.",
        "trap": "Chemistry convention is ΔU = q + w (work done on system), whereas Physics is ΔQ = ΔU + W."
      },
      {
        "name": "Work Done in Thermodynamic Processes",
        "formula": "W_{\\text{iso}} = nRT\\ln\\left(\\frac{V_2}{V_1}\\right), \\quad W_{\\text{adia}} = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} = \\frac{nR(T_1 - T_2)}{\\gamma - 1}",
        "variables": "γ = C_p / C_v, V₁ = Initial volume, V₂ = Final volume",
        "examTip": "In adiabatic expansion, temperature drops (gas cools): T₁V₁^(γ-1) = T₂V₂^(γ-1).",
        "trap": "In isothermal process: ΔT = 0, so ΔU = 0 and Q = W."
      },
      {
        "name": "Carnot Engine Efficiency & Refrigerator COP",
        "formula": "\\eta = 1 - \\frac{T_C}{T_H} = \\frac{W}{Q_H}, \\quad \\beta = \\frac{T_C}{T_H - T_C} = \\frac{1 - \\eta}{\\eta}",
        "variables": "T_H = Source temp (K), T_C = Sink temp (K), η = Efficiency, β = Coefficient of Performance",
        "examTip": "To increase efficiency of Carnot engine, decreasing sink temp T_C is more effective than increasing source temp T_H.",
        "trap": "Always convert Celsius temperatures to Kelvin before computing ratio."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermodynamics-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermodynamics",
    "topic": "Isochoric & Isobaric Processes",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "First law of thermodynamics, thermodynamic processes, and Carnot heat engines.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Isochoric & Isobaric Processes.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "First Law of Thermodynamics",
        "formula": "\\Delta Q = \\Delta U + W, \\quad \\Delta U = n C_v \\Delta T = \\frac{nR\\Delta T}{\\gamma - 1}",
        "variables": "Q = Heat supplied, U = Internal energy, W = Work done by system",
        "examTip": "Internal energy U is a state function; ΔU for any cyclic process is strictly ZERO.",
        "trap": "Chemistry convention is ΔU = q + w (work done on system), whereas Physics is ΔQ = ΔU + W."
      },
      {
        "name": "Work Done in Thermodynamic Processes",
        "formula": "W_{\\text{iso}} = nRT\\ln\\left(\\frac{V_2}{V_1}\\right), \\quad W_{\\text{adia}} = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} = \\frac{nR(T_1 - T_2)}{\\gamma - 1}",
        "variables": "γ = C_p / C_v, V₁ = Initial volume, V₂ = Final volume",
        "examTip": "In adiabatic expansion, temperature drops (gas cools): T₁V₁^(γ-1) = T₂V₂^(γ-1).",
        "trap": "In isothermal process: ΔT = 0, so ΔU = 0 and Q = W."
      },
      {
        "name": "Carnot Engine Efficiency & Refrigerator COP",
        "formula": "\\eta = 1 - \\frac{T_C}{T_H} = \\frac{W}{Q_H}, \\quad \\beta = \\frac{T_C}{T_H - T_C} = \\frac{1 - \\eta}{\\eta}",
        "variables": "T_H = Source temp (K), T_C = Sink temp (K), η = Efficiency, β = Coefficient of Performance",
        "examTip": "To increase efficiency of Carnot engine, decreasing sink temp T_C is more effective than increasing source temp T_H.",
        "trap": "Always convert Celsius temperatures to Kelvin before computing ratio."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermodynamics-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermodynamics",
    "topic": "Heat Engines & Carnot Cycle",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "First law of thermodynamics, thermodynamic processes, and Carnot heat engines.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Heat Engines & Carnot Cycle.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "First Law of Thermodynamics",
        "formula": "\\Delta Q = \\Delta U + W, \\quad \\Delta U = n C_v \\Delta T = \\frac{nR\\Delta T}{\\gamma - 1}",
        "variables": "Q = Heat supplied, U = Internal energy, W = Work done by system",
        "examTip": "Internal energy U is a state function; ΔU for any cyclic process is strictly ZERO.",
        "trap": "Chemistry convention is ΔU = q + w (work done on system), whereas Physics is ΔQ = ΔU + W."
      },
      {
        "name": "Work Done in Thermodynamic Processes",
        "formula": "W_{\\text{iso}} = nRT\\ln\\left(\\frac{V_2}{V_1}\\right), \\quad W_{\\text{adia}} = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} = \\frac{nR(T_1 - T_2)}{\\gamma - 1}",
        "variables": "γ = C_p / C_v, V₁ = Initial volume, V₂ = Final volume",
        "examTip": "In adiabatic expansion, temperature drops (gas cools): T₁V₁^(γ-1) = T₂V₂^(γ-1).",
        "trap": "In isothermal process: ΔT = 0, so ΔU = 0 and Q = W."
      },
      {
        "name": "Carnot Engine Efficiency & Refrigerator COP",
        "formula": "\\eta = 1 - \\frac{T_C}{T_H} = \\frac{W}{Q_H}, \\quad \\beta = \\frac{T_C}{T_H - T_C} = \\frac{1 - \\eta}{\\eta}",
        "variables": "T_H = Source temp (K), T_C = Sink temp (K), η = Efficiency, β = Coefficient of Performance",
        "examTip": "To increase efficiency of Carnot engine, decreasing sink temp T_C is more effective than increasing source temp T_H.",
        "trap": "Always convert Celsius temperatures to Kelvin before computing ratio."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-thermodynamics-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Thermodynamics",
    "topic": "Second Law & Entropy",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "First law of thermodynamics, thermodynamic processes, and Carnot heat engines.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Second Law & Entropy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "First Law of Thermodynamics",
        "formula": "\\Delta Q = \\Delta U + W, \\quad \\Delta U = n C_v \\Delta T = \\frac{nR\\Delta T}{\\gamma - 1}",
        "variables": "Q = Heat supplied, U = Internal energy, W = Work done by system",
        "examTip": "Internal energy U is a state function; ΔU for any cyclic process is strictly ZERO.",
        "trap": "Chemistry convention is ΔU = q + w (work done on system), whereas Physics is ΔQ = ΔU + W."
      },
      {
        "name": "Work Done in Thermodynamic Processes",
        "formula": "W_{\\text{iso}} = nRT\\ln\\left(\\frac{V_2}{V_1}\\right), \\quad W_{\\text{adia}} = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} = \\frac{nR(T_1 - T_2)}{\\gamma - 1}",
        "variables": "γ = C_p / C_v, V₁ = Initial volume, V₂ = Final volume",
        "examTip": "In adiabatic expansion, temperature drops (gas cools): T₁V₁^(γ-1) = T₂V₂^(γ-1).",
        "trap": "In isothermal process: ΔT = 0, so ΔU = 0 and Q = W."
      },
      {
        "name": "Carnot Engine Efficiency & Refrigerator COP",
        "formula": "\\eta = 1 - \\frac{T_C}{T_H} = \\frac{W}{Q_H}, \\quad \\beta = \\frac{T_C}{T_H - T_C} = \\frac{1 - \\eta}{\\eta}",
        "variables": "T_H = Source temp (K), T_C = Sink temp (K), η = Efficiency, β = Coefficient of Performance",
        "examTip": "To increase efficiency of Carnot engine, decreasing sink temp T_C is more effective than increasing source temp T_H.",
        "trap": "Always convert Celsius temperatures to Kelvin before computing ratio."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-kinetic-theory-of-gases-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Ideal Gas Equation",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Molecular model of gases, pressure, RMS speed, degrees of freedom, and mean free path.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ideal Gas Equation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Pressure & Molecular Speeds",
        "formula": "P = \\frac{1}{3}\\rho v_{\\text{rms}}^2, \\quad v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}, \\quad v_{\\text{avg}} = \\sqrt{\\frac{8RT}{pi M}}, \\quad v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}",
        "variables": "R = 8.314 J/(mol·K), T = Absolute temperature, M = Molar mass in kg/mol",
        "examTip": "Speed ordering: v_rms > v_avg > v_mp (Memory aid: R-A-M: 1.73 > 1.60 > 1.41).",
        "trap": "Remember to substitute molar mass M in kg/mol (e.g. O₂ = 32 × 10⁻³ kg/mol)."
      },
      {
        "name": "Degrees of Freedom & Molar Heat Capacities",
        "formula": "U = \\frac{f}{2}nRT, \\quad C_v = \\frac{f}{2}R, \\quad C_p = \\left(\\frac{f}{2} + 1\\right)R, \\quad \\gamma = 1 + \\frac{2}{f}",
        "variables": "f = Degrees of freedom (Monoatomic = 3, Diatomic = 5, Triatomic non-linear = 6)",
        "examTip": "γ values: Monoatomic = 5/3 ≈ 1.67, Diatomic = 7/5 = 1.40, Triatomic = 4/3 ≈ 1.33.",
        "trap": "At high temperatures, vibrational degrees of freedom activate (+2 per vibrational mode)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-kinetic-theory-of-gases-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Pressure of an Ideal Gas",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Molecular model of gases, pressure, RMS speed, degrees of freedom, and mean free path.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Pressure of an Ideal Gas.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Pressure & Molecular Speeds",
        "formula": "P = \\frac{1}{3}\\rho v_{\\text{rms}}^2, \\quad v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}, \\quad v_{\\text{avg}} = \\sqrt{\\frac{8RT}{pi M}}, \\quad v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}",
        "variables": "R = 8.314 J/(mol·K), T = Absolute temperature, M = Molar mass in kg/mol",
        "examTip": "Speed ordering: v_rms > v_avg > v_mp (Memory aid: R-A-M: 1.73 > 1.60 > 1.41).",
        "trap": "Remember to substitute molar mass M in kg/mol (e.g. O₂ = 32 × 10⁻³ kg/mol)."
      },
      {
        "name": "Degrees of Freedom & Molar Heat Capacities",
        "formula": "U = \\frac{f}{2}nRT, \\quad C_v = \\frac{f}{2}R, \\quad C_p = \\left(\\frac{f}{2} + 1\\right)R, \\quad \\gamma = 1 + \\frac{2}{f}",
        "variables": "f = Degrees of freedom (Monoatomic = 3, Diatomic = 5, Triatomic non-linear = 6)",
        "examTip": "γ values: Monoatomic = 5/3 ≈ 1.67, Diatomic = 7/5 = 1.40, Triatomic = 4/3 ≈ 1.33.",
        "trap": "At high temperatures, vibrational degrees of freedom activate (+2 per vibrational mode)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-kinetic-theory-of-gases-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Kinetic Theory of Gases",
    "topic": "RMS, Average & Most Probable Speed",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Molecular model of gases, pressure, RMS speed, degrees of freedom, and mean free path.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for RMS, Average & Most Probable Speed.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Pressure & Molecular Speeds",
        "formula": "P = \\frac{1}{3}\\rho v_{\\text{rms}}^2, \\quad v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}, \\quad v_{\\text{avg}} = \\sqrt{\\frac{8RT}{pi M}}, \\quad v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}",
        "variables": "R = 8.314 J/(mol·K), T = Absolute temperature, M = Molar mass in kg/mol",
        "examTip": "Speed ordering: v_rms > v_avg > v_mp (Memory aid: R-A-M: 1.73 > 1.60 > 1.41).",
        "trap": "Remember to substitute molar mass M in kg/mol (e.g. O₂ = 32 × 10⁻³ kg/mol)."
      },
      {
        "name": "Degrees of Freedom & Molar Heat Capacities",
        "formula": "U = \\frac{f}{2}nRT, \\quad C_v = \\frac{f}{2}R, \\quad C_p = \\left(\\frac{f}{2} + 1\\right)R, \\quad \\gamma = 1 + \\frac{2}{f}",
        "variables": "f = Degrees of freedom (Monoatomic = 3, Diatomic = 5, Triatomic non-linear = 6)",
        "examTip": "γ values: Monoatomic = 5/3 ≈ 1.67, Diatomic = 7/5 = 1.40, Triatomic = 4/3 ≈ 1.33.",
        "trap": "At high temperatures, vibrational degrees of freedom activate (+2 per vibrational mode)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-kinetic-theory-of-gases-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Degrees of Freedom & Equipartition",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Molecular model of gases, pressure, RMS speed, degrees of freedom, and mean free path.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Degrees of Freedom & Equipartition.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Pressure & Molecular Speeds",
        "formula": "P = \\frac{1}{3}\\rho v_{\\text{rms}}^2, \\quad v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}, \\quad v_{\\text{avg}} = \\sqrt{\\frac{8RT}{pi M}}, \\quad v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}",
        "variables": "R = 8.314 J/(mol·K), T = Absolute temperature, M = Molar mass in kg/mol",
        "examTip": "Speed ordering: v_rms > v_avg > v_mp (Memory aid: R-A-M: 1.73 > 1.60 > 1.41).",
        "trap": "Remember to substitute molar mass M in kg/mol (e.g. O₂ = 32 × 10⁻³ kg/mol)."
      },
      {
        "name": "Degrees of Freedom & Molar Heat Capacities",
        "formula": "U = \\frac{f}{2}nRT, \\quad C_v = \\frac{f}{2}R, \\quad C_p = \\left(\\frac{f}{2} + 1\\right)R, \\quad \\gamma = 1 + \\frac{2}{f}",
        "variables": "f = Degrees of freedom (Monoatomic = 3, Diatomic = 5, Triatomic non-linear = 6)",
        "examTip": "γ values: Monoatomic = 5/3 ≈ 1.67, Diatomic = 7/5 = 1.40, Triatomic = 4/3 ≈ 1.33.",
        "trap": "At high temperatures, vibrational degrees of freedom activate (+2 per vibrational mode)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-kinetic-theory-of-gases-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Kinetic Theory of Gases",
    "topic": "Mean Free Path",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Molecular model of gases, pressure, RMS speed, degrees of freedom, and mean free path.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Mean Free Path.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Pressure & Molecular Speeds",
        "formula": "P = \\frac{1}{3}\\rho v_{\\text{rms}}^2, \\quad v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}, \\quad v_{\\text{avg}} = \\sqrt{\\frac{8RT}{pi M}}, \\quad v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}",
        "variables": "R = 8.314 J/(mol·K), T = Absolute temperature, M = Molar mass in kg/mol",
        "examTip": "Speed ordering: v_rms > v_avg > v_mp (Memory aid: R-A-M: 1.73 > 1.60 > 1.41).",
        "trap": "Remember to substitute molar mass M in kg/mol (e.g. O₂ = 32 × 10⁻³ kg/mol)."
      },
      {
        "name": "Degrees of Freedom & Molar Heat Capacities",
        "formula": "U = \\frac{f}{2}nRT, \\quad C_v = \\frac{f}{2}R, \\quad C_p = \\left(\\frac{f}{2} + 1\\right)R, \\quad \\gamma = 1 + \\frac{2}{f}",
        "variables": "f = Degrees of freedom (Monoatomic = 3, Diatomic = 5, Triatomic non-linear = 6)",
        "examTip": "γ values: Monoatomic = 5/3 ≈ 1.67, Diatomic = 7/5 = 1.40, Triatomic = 4/3 ≈ 1.33.",
        "trap": "At high temperatures, vibrational degrees of freedom activate (+2 per vibrational mode)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-oscillations-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Oscillations",
    "topic": "Simple Harmonic Motion (SHM)",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Simple Harmonic Motion (SHM), kinematics, energy equations, and spring/pendulum periods.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Simple Harmonic Motion (SHM).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "SHM Kinematics & Equation of Motion",
        "formula": "x = A\\sin(\\omega t + \\phi), \\quad v = \\omega\\sqrt{A^2 - x^2}, \\quad a = -\\omega^2 x",
        "variables": "A = Amplitude, ω = Angular frequency (2πf), x = Displacement from mean position",
        "examTip": "Velocity is maximum at mean position (v_max = ωA) and zero at extremes. Acceleration is max at extremes (a_max = ω²A).",
        "trap": "Phase difference between displacement and velocity is π/2; between displacement and acceleration is π."
      },
      {
        "name": "Energy in SHM & Spring Period",
        "formula": "K = \\frac{1}{2}m\\omega^2(A^2 - x^2), \\quad U = \\frac{1}{2}m\\omega^2 x^2, \\quad E_{\\text{total}} = \\frac{1}{2}m\\omega^2 A^2 = \\text{const}",
        "variables": "k = mω² = Force constant, E_total = Mechanical energy",
        "examTip": "Kinetic energy equals potential energy at displacement x = ±A/√2.",
        "trap": "Frequency of energy oscillation is 2f (double the frequency of displacement)."
      },
      {
        "name": "Spring Combinations Period",
        "formula": "T = 2\\pi\\sqrt{\\frac{m}{k_{\\text{eq}}}}, \\quad \\text{Series: } \\frac{1}{k_{\\text{eq}}} = \\frac{1}{k_1} + \\frac{1}{k_2}, \\quad \\text{Parallel: } k_{\\text{eq}} = k_1 + k_2",
        "variables": "k = Spring stiffness constant, m = Oscillating mass",
        "examTip": "Cutting a spring of constant k into two equal halves doubles the spring constant of each piece: k' = 2k.",
        "trap": "When a body is placed between two springs, both springs stretch/compress simultaneously, acting in PARALLEL: k_eq = k₁ + k₂."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-oscillations-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Oscillations",
    "topic": "Velocity & Acceleration in SHM",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Simple Harmonic Motion (SHM), kinematics, energy equations, and spring/pendulum periods.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Velocity & Acceleration in SHM.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "SHM Kinematics & Equation of Motion",
        "formula": "x = A\\sin(\\omega t + \\phi), \\quad v = \\omega\\sqrt{A^2 - x^2}, \\quad a = -\\omega^2 x",
        "variables": "A = Amplitude, ω = Angular frequency (2πf), x = Displacement from mean position",
        "examTip": "Velocity is maximum at mean position (v_max = ωA) and zero at extremes. Acceleration is max at extremes (a_max = ω²A).",
        "trap": "Phase difference between displacement and velocity is π/2; between displacement and acceleration is π."
      },
      {
        "name": "Energy in SHM & Spring Period",
        "formula": "K = \\frac{1}{2}m\\omega^2(A^2 - x^2), \\quad U = \\frac{1}{2}m\\omega^2 x^2, \\quad E_{\\text{total}} = \\frac{1}{2}m\\omega^2 A^2 = \\text{const}",
        "variables": "k = mω² = Force constant, E_total = Mechanical energy",
        "examTip": "Kinetic energy equals potential energy at displacement x = ±A/√2.",
        "trap": "Frequency of energy oscillation is 2f (double the frequency of displacement)."
      },
      {
        "name": "Spring Combinations Period",
        "formula": "T = 2\\pi\\sqrt{\\frac{m}{k_{\\text{eq}}}}, \\quad \\text{Series: } \\frac{1}{k_{\\text{eq}}} = \\frac{1}{k_1} + \\frac{1}{k_2}, \\quad \\text{Parallel: } k_{\\text{eq}} = k_1 + k_2",
        "variables": "k = Spring stiffness constant, m = Oscillating mass",
        "examTip": "Cutting a spring of constant k into two equal halves doubles the spring constant of each piece: k' = 2k.",
        "trap": "When a body is placed between two springs, both springs stretch/compress simultaneously, acting in PARALLEL: k_eq = k₁ + k₂."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-oscillations-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Oscillations",
    "topic": "Energy in SHM",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Simple Harmonic Motion (SHM), kinematics, energy equations, and spring/pendulum periods.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Energy in SHM.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "SHM Kinematics & Equation of Motion",
        "formula": "x = A\\sin(\\omega t + \\phi), \\quad v = \\omega\\sqrt{A^2 - x^2}, \\quad a = -\\omega^2 x",
        "variables": "A = Amplitude, ω = Angular frequency (2πf), x = Displacement from mean position",
        "examTip": "Velocity is maximum at mean position (v_max = ωA) and zero at extremes. Acceleration is max at extremes (a_max = ω²A).",
        "trap": "Phase difference between displacement and velocity is π/2; between displacement and acceleration is π."
      },
      {
        "name": "Energy in SHM & Spring Period",
        "formula": "K = \\frac{1}{2}m\\omega^2(A^2 - x^2), \\quad U = \\frac{1}{2}m\\omega^2 x^2, \\quad E_{\\text{total}} = \\frac{1}{2}m\\omega^2 A^2 = \\text{const}",
        "variables": "k = mω² = Force constant, E_total = Mechanical energy",
        "examTip": "Kinetic energy equals potential energy at displacement x = ±A/√2.",
        "trap": "Frequency of energy oscillation is 2f (double the frequency of displacement)."
      },
      {
        "name": "Spring Combinations Period",
        "formula": "T = 2\\pi\\sqrt{\\frac{m}{k_{\\text{eq}}}}, \\quad \\text{Series: } \\frac{1}{k_{\\text{eq}}} = \\frac{1}{k_1} + \\frac{1}{k_2}, \\quad \\text{Parallel: } k_{\\text{eq}} = k_1 + k_2",
        "variables": "k = Spring stiffness constant, m = Oscillating mass",
        "examTip": "Cutting a spring of constant k into two equal halves doubles the spring constant of each piece: k' = 2k.",
        "trap": "When a body is placed between two springs, both springs stretch/compress simultaneously, acting in PARALLEL: k_eq = k₁ + k₂."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-oscillations-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Oscillations",
    "topic": "Simple Pendulum",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Simple Harmonic Motion (SHM), kinematics, energy equations, and spring/pendulum periods.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Simple Pendulum.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "SHM Kinematics & Equation of Motion",
        "formula": "x = A\\sin(\\omega t + \\phi), \\quad v = \\omega\\sqrt{A^2 - x^2}, \\quad a = -\\omega^2 x",
        "variables": "A = Amplitude, ω = Angular frequency (2πf), x = Displacement from mean position",
        "examTip": "Velocity is maximum at mean position (v_max = ωA) and zero at extremes. Acceleration is max at extremes (a_max = ω²A).",
        "trap": "Phase difference between displacement and velocity is π/2; between displacement and acceleration is π."
      },
      {
        "name": "Energy in SHM & Spring Period",
        "formula": "K = \\frac{1}{2}m\\omega^2(A^2 - x^2), \\quad U = \\frac{1}{2}m\\omega^2 x^2, \\quad E_{\\text{total}} = \\frac{1}{2}m\\omega^2 A^2 = \\text{const}",
        "variables": "k = mω² = Force constant, E_total = Mechanical energy",
        "examTip": "Kinetic energy equals potential energy at displacement x = ±A/√2.",
        "trap": "Frequency of energy oscillation is 2f (double the frequency of displacement)."
      },
      {
        "name": "Spring Combinations Period",
        "formula": "T = 2\\pi\\sqrt{\\frac{m}{k_{\\text{eq}}}}, \\quad \\text{Series: } \\frac{1}{k_{\\text{eq}}} = \\frac{1}{k_1} + \\frac{1}{k_2}, \\quad \\text{Parallel: } k_{\\text{eq}} = k_1 + k_2",
        "variables": "k = Spring stiffness constant, m = Oscillating mass",
        "examTip": "Cutting a spring of constant k into two equal halves doubles the spring constant of each piece: k' = 2k.",
        "trap": "When a body is placed between two springs, both springs stretch/compress simultaneously, acting in PARALLEL: k_eq = k₁ + k₂."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-oscillations-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Oscillations",
    "topic": "Spring-Mass Systems",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Simple Harmonic Motion (SHM), kinematics, energy equations, and spring/pendulum periods.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Spring-Mass Systems.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "SHM Kinematics & Equation of Motion",
        "formula": "x = A\\sin(\\omega t + \\phi), \\quad v = \\omega\\sqrt{A^2 - x^2}, \\quad a = -\\omega^2 x",
        "variables": "A = Amplitude, ω = Angular frequency (2πf), x = Displacement from mean position",
        "examTip": "Velocity is maximum at mean position (v_max = ωA) and zero at extremes. Acceleration is max at extremes (a_max = ω²A).",
        "trap": "Phase difference between displacement and velocity is π/2; between displacement and acceleration is π."
      },
      {
        "name": "Energy in SHM & Spring Period",
        "formula": "K = \\frac{1}{2}m\\omega^2(A^2 - x^2), \\quad U = \\frac{1}{2}m\\omega^2 x^2, \\quad E_{\\text{total}} = \\frac{1}{2}m\\omega^2 A^2 = \\text{const}",
        "variables": "k = mω² = Force constant, E_total = Mechanical energy",
        "examTip": "Kinetic energy equals potential energy at displacement x = ±A/√2.",
        "trap": "Frequency of energy oscillation is 2f (double the frequency of displacement)."
      },
      {
        "name": "Spring Combinations Period",
        "formula": "T = 2\\pi\\sqrt{\\frac{m}{k_{\\text{eq}}}}, \\quad \\text{Series: } \\frac{1}{k_{\\text{eq}}} = \\frac{1}{k_1} + \\frac{1}{k_2}, \\quad \\text{Parallel: } k_{\\text{eq}} = k_1 + k_2",
        "variables": "k = Spring stiffness constant, m = Oscillating mass",
        "examTip": "Cutting a spring of constant k into two equal halves doubles the spring constant of each piece: k' = 2k.",
        "trap": "When a body is placed between two springs, both springs stretch/compress simultaneously, acting in PARALLEL: k_eq = k₁ + k₂."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-waves-1",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Waves",
    "topic": "Wave Equation & Speed",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Wave Equation & Speed.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Progressive Wave Equation & Speed",
        "formula": "y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}",
        "variables": "k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length",
        "examTip": "Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).",
        "trap": "Wave speed v depends on the MEDIUM properties, not frequency or amplitude."
      },
      {
        "name": "Standing Waves in Organ Pipes",
        "formula": "\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)",
        "variables": "L = Length of pipe, v = Speed of sound (330-340 m/s)",
        "examTip": "Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).",
        "trap": "Open pipe of length L has the same fundamental frequency as closed pipe of length L/2."
      },
      {
        "name": "Doppler Effect for Sound",
        "formula": "f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)",
        "variables": "v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency",
        "examTip": "Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).",
        "trap": "Doppler effect depends on relative motion; if source and observer maintain constant distance, f' = f."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-waves-2",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Waves",
    "topic": "Sound Waves in Gases",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Sound Waves in Gases.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Progressive Wave Equation & Speed",
        "formula": "y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}",
        "variables": "k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length",
        "examTip": "Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).",
        "trap": "Wave speed v depends on the MEDIUM properties, not frequency or amplitude."
      },
      {
        "name": "Standing Waves in Organ Pipes",
        "formula": "\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)",
        "variables": "L = Length of pipe, v = Speed of sound (330-340 m/s)",
        "examTip": "Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).",
        "trap": "Open pipe of length L has the same fundamental frequency as closed pipe of length L/2."
      },
      {
        "name": "Doppler Effect for Sound",
        "formula": "f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)",
        "variables": "v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency",
        "examTip": "Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).",
        "trap": "Doppler effect depends on relative motion; if source and observer maintain constant distance, f' = f."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-waves-3",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Waves",
    "topic": "Interference & Standing Waves",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Interference & Standing Waves.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Progressive Wave Equation & Speed",
        "formula": "y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}",
        "variables": "k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length",
        "examTip": "Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).",
        "trap": "Wave speed v depends on the MEDIUM properties, not frequency or amplitude."
      },
      {
        "name": "Standing Waves in Organ Pipes",
        "formula": "\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)",
        "variables": "L = Length of pipe, v = Speed of sound (330-340 m/s)",
        "examTip": "Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).",
        "trap": "Open pipe of length L has the same fundamental frequency as closed pipe of length L/2."
      },
      {
        "name": "Doppler Effect for Sound",
        "formula": "f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)",
        "variables": "v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency",
        "examTip": "Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).",
        "trap": "Doppler effect depends on relative motion; if source and observer maintain constant distance, f' = f."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-waves-4",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Waves",
    "topic": "Organ Pipes & Resonance",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Organ Pipes & Resonance.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Progressive Wave Equation & Speed",
        "formula": "y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}",
        "variables": "k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length",
        "examTip": "Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).",
        "trap": "Wave speed v depends on the MEDIUM properties, not frequency or amplitude."
      },
      {
        "name": "Standing Waves in Organ Pipes",
        "formula": "\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)",
        "variables": "L = Length of pipe, v = Speed of sound (330-340 m/s)",
        "examTip": "Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).",
        "trap": "Open pipe of length L has the same fundamental frequency as closed pipe of length L/2."
      },
      {
        "name": "Doppler Effect for Sound",
        "formula": "f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)",
        "variables": "v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency",
        "examTip": "Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).",
        "trap": "Doppler effect depends on relative motion; if source and observer maintain constant distance, f' = f."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-11-waves-5",
    "subject": "Physics",
    "classLevel": "11",
    "chapter": "Waves",
    "topic": "Doppler Effect & Beats",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Doppler Effect & Beats.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Progressive Wave Equation & Speed",
        "formula": "y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}",
        "variables": "k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length",
        "examTip": "Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).",
        "trap": "Wave speed v depends on the MEDIUM properties, not frequency or amplitude."
      },
      {
        "name": "Standing Waves in Organ Pipes",
        "formula": "\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)",
        "variables": "L = Length of pipe, v = Speed of sound (330-340 m/s)",
        "examTip": "Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).",
        "trap": "Open pipe of length L has the same fundamental frequency as closed pipe of length L/2."
      },
      {
        "name": "Doppler Effect for Sound",
        "formula": "f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)",
        "variables": "v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency",
        "examTip": "Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).",
        "trap": "Doppler effect depends on relative motion; if source and observer maintain constant distance, f' = f."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electric-charges-and-fields-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electric Charges and Fields",
    "topic": "Coulomb's Law & Superposition",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Coulomb’s law, electric field, dipoles, and Gauss’s law applications.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Coulomb's Law & Superposition.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Coulomb’s Law & Dielectric Effect",
        "formula": "F = \\frac{1}{4\\pi\\epsilon_0}\\frac{q_1 q_2}{r^2}, \\quad F_{\\text{med}} = \\frac{F_{\\text{air}}}{K}",
        "variables": "1/(4πε₀) = 9 × 10⁹ N·m²/C², K = Dielectric constant (relative permittivity ε_r)",
        "examTip": "Forces between charges decrease by factor of K when placed in dielectric medium.",
        "trap": "Coulomb’s law holds for point charges at rest; apply vector superposition for multiple charges."
      },
      {
        "name": "Electric Dipole Fields & Torque",
        "formula": "E_{\\text{axial}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{2p}{r^3}, \\quad E_{\\text{eq}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{p}{r^3}, \\quad \\vec{\\tau} = \\vec{p}\\times\\vec{E}",
        "variables": "p = 2aq (Dipole moment directed from -q to +q), r = Distance from dipole center (r >> a)",
        "examTip": "Axial field is exactly TWICE the equatorial field at identical distance: E_axial = 2 E_eq.",
        "trap": "Potential energy of dipole in uniform field is U = -p·E·cosθ (Minimum at θ = 0°, stable equilibrium)."
      },
      {
        "name": "Gauss’s Law & Field Configurations",
        "formula": "\\Phi = \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{enc}}}{\\epsilon_0}, \\quad E_{\\text{wire}} = \\frac{\\lambda}{2\\pi\\epsilon_0 r}, \\quad E_{\\text{sheet}} = \\frac{\\sigma}{2\\epsilon_0}",
        "variables": "λ = Linear charge density, σ = Surface charge density",
        "examTip": "Electric field inside a uniformly charged conducting or hollow spherical shell is IDENTICALLY ZERO.",
        "trap": "For a conducting sheet (charges on both faces), field outside is E = σ/ε₀, whereas non-conducting is σ/(2ε₀)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electric-charges-and-fields-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electric Charges and Fields",
    "topic": "Electric Field & Field Lines",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Coulomb’s law, electric field, dipoles, and Gauss’s law applications.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Electric Field & Field Lines.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Coulomb’s Law & Dielectric Effect",
        "formula": "F = \\frac{1}{4\\pi\\epsilon_0}\\frac{q_1 q_2}{r^2}, \\quad F_{\\text{med}} = \\frac{F_{\\text{air}}}{K}",
        "variables": "1/(4πε₀) = 9 × 10⁹ N·m²/C², K = Dielectric constant (relative permittivity ε_r)",
        "examTip": "Forces between charges decrease by factor of K when placed in dielectric medium.",
        "trap": "Coulomb’s law holds for point charges at rest; apply vector superposition for multiple charges."
      },
      {
        "name": "Electric Dipole Fields & Torque",
        "formula": "E_{\\text{axial}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{2p}{r^3}, \\quad E_{\\text{eq}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{p}{r^3}, \\quad \\vec{\\tau} = \\vec{p}\\times\\vec{E}",
        "variables": "p = 2aq (Dipole moment directed from -q to +q), r = Distance from dipole center (r >> a)",
        "examTip": "Axial field is exactly TWICE the equatorial field at identical distance: E_axial = 2 E_eq.",
        "trap": "Potential energy of dipole in uniform field is U = -p·E·cosθ (Minimum at θ = 0°, stable equilibrium)."
      },
      {
        "name": "Gauss’s Law & Field Configurations",
        "formula": "\\Phi = \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{enc}}}{\\epsilon_0}, \\quad E_{\\text{wire}} = \\frac{\\lambda}{2\\pi\\epsilon_0 r}, \\quad E_{\\text{sheet}} = \\frac{\\sigma}{2\\epsilon_0}",
        "variables": "λ = Linear charge density, σ = Surface charge density",
        "examTip": "Electric field inside a uniformly charged conducting or hollow spherical shell is IDENTICALLY ZERO.",
        "trap": "For a conducting sheet (charges on both faces), field outside is E = σ/ε₀, whereas non-conducting is σ/(2ε₀)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electric-charges-and-fields-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electric Charges and Fields",
    "topic": "Electric Dipole Torque & Field",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Coulomb’s law, electric field, dipoles, and Gauss’s law applications.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Electric Dipole Torque & Field.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Coulomb’s Law & Dielectric Effect",
        "formula": "F = \\frac{1}{4\\pi\\epsilon_0}\\frac{q_1 q_2}{r^2}, \\quad F_{\\text{med}} = \\frac{F_{\\text{air}}}{K}",
        "variables": "1/(4πε₀) = 9 × 10⁹ N·m²/C², K = Dielectric constant (relative permittivity ε_r)",
        "examTip": "Forces between charges decrease by factor of K when placed in dielectric medium.",
        "trap": "Coulomb’s law holds for point charges at rest; apply vector superposition for multiple charges."
      },
      {
        "name": "Electric Dipole Fields & Torque",
        "formula": "E_{\\text{axial}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{2p}{r^3}, \\quad E_{\\text{eq}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{p}{r^3}, \\quad \\vec{\\tau} = \\vec{p}\\times\\vec{E}",
        "variables": "p = 2aq (Dipole moment directed from -q to +q), r = Distance from dipole center (r >> a)",
        "examTip": "Axial field is exactly TWICE the equatorial field at identical distance: E_axial = 2 E_eq.",
        "trap": "Potential energy of dipole in uniform field is U = -p·E·cosθ (Minimum at θ = 0°, stable equilibrium)."
      },
      {
        "name": "Gauss’s Law & Field Configurations",
        "formula": "\\Phi = \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{enc}}}{\\epsilon_0}, \\quad E_{\\text{wire}} = \\frac{\\lambda}{2\\pi\\epsilon_0 r}, \\quad E_{\\text{sheet}} = \\frac{\\sigma}{2\\epsilon_0}",
        "variables": "λ = Linear charge density, σ = Surface charge density",
        "examTip": "Electric field inside a uniformly charged conducting or hollow spherical shell is IDENTICALLY ZERO.",
        "trap": "For a conducting sheet (charges on both faces), field outside is E = σ/ε₀, whereas non-conducting is σ/(2ε₀)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electric-charges-and-fields-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electric Charges and Fields",
    "topic": "Gauss's Law & Flux",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Coulomb’s law, electric field, dipoles, and Gauss’s law applications.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Gauss's Law & Flux.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Coulomb’s Law & Dielectric Effect",
        "formula": "F = \\frac{1}{4\\pi\\epsilon_0}\\frac{q_1 q_2}{r^2}, \\quad F_{\\text{med}} = \\frac{F_{\\text{air}}}{K}",
        "variables": "1/(4πε₀) = 9 × 10⁹ N·m²/C², K = Dielectric constant (relative permittivity ε_r)",
        "examTip": "Forces between charges decrease by factor of K when placed in dielectric medium.",
        "trap": "Coulomb’s law holds for point charges at rest; apply vector superposition for multiple charges."
      },
      {
        "name": "Electric Dipole Fields & Torque",
        "formula": "E_{\\text{axial}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{2p}{r^3}, \\quad E_{\\text{eq}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{p}{r^3}, \\quad \\vec{\\tau} = \\vec{p}\\times\\vec{E}",
        "variables": "p = 2aq (Dipole moment directed from -q to +q), r = Distance from dipole center (r >> a)",
        "examTip": "Axial field is exactly TWICE the equatorial field at identical distance: E_axial = 2 E_eq.",
        "trap": "Potential energy of dipole in uniform field is U = -p·E·cosθ (Minimum at θ = 0°, stable equilibrium)."
      },
      {
        "name": "Gauss’s Law & Field Configurations",
        "formula": "\\Phi = \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{enc}}}{\\epsilon_0}, \\quad E_{\\text{wire}} = \\frac{\\lambda}{2\\pi\\epsilon_0 r}, \\quad E_{\\text{sheet}} = \\frac{\\sigma}{2\\epsilon_0}",
        "variables": "λ = Linear charge density, σ = Surface charge density",
        "examTip": "Electric field inside a uniformly charged conducting or hollow spherical shell is IDENTICALLY ZERO.",
        "trap": "For a conducting sheet (charges on both faces), field outside is E = σ/ε₀, whereas non-conducting is σ/(2ε₀)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electric-charges-and-fields-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electric Charges and Fields",
    "topic": "Field of Continuous Charge Distributions",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Coulomb’s law, electric field, dipoles, and Gauss’s law applications.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Field of Continuous Charge Distributions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Coulomb’s Law & Dielectric Effect",
        "formula": "F = \\frac{1}{4\\pi\\epsilon_0}\\frac{q_1 q_2}{r^2}, \\quad F_{\\text{med}} = \\frac{F_{\\text{air}}}{K}",
        "variables": "1/(4πε₀) = 9 × 10⁹ N·m²/C², K = Dielectric constant (relative permittivity ε_r)",
        "examTip": "Forces between charges decrease by factor of K when placed in dielectric medium.",
        "trap": "Coulomb’s law holds for point charges at rest; apply vector superposition for multiple charges."
      },
      {
        "name": "Electric Dipole Fields & Torque",
        "formula": "E_{\\text{axial}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{2p}{r^3}, \\quad E_{\\text{eq}} = \\frac{1}{4\\pi\\epsilon_0}\\frac{p}{r^3}, \\quad \\vec{\\tau} = \\vec{p}\\times\\vec{E}",
        "variables": "p = 2aq (Dipole moment directed from -q to +q), r = Distance from dipole center (r >> a)",
        "examTip": "Axial field is exactly TWICE the equatorial field at identical distance: E_axial = 2 E_eq.",
        "trap": "Potential energy of dipole in uniform field is U = -p·E·cosθ (Minimum at θ = 0°, stable equilibrium)."
      },
      {
        "name": "Gauss’s Law & Field Configurations",
        "formula": "\\Phi = \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{enc}}}{\\epsilon_0}, \\quad E_{\\text{wire}} = \\frac{\\lambda}{2\\pi\\epsilon_0 r}, \\quad E_{\\text{sheet}} = \\frac{\\sigma}{2\\epsilon_0}",
        "variables": "λ = Linear charge density, σ = Surface charge density",
        "examTip": "Electric field inside a uniformly charged conducting or hollow spherical shell is IDENTICALLY ZERO.",
        "trap": "For a conducting sheet (charges on both faces), field outside is E = σ/ε₀, whereas non-conducting is σ/(2ε₀)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electrostatic-potential-and-capacitance-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Electrostatic Potential & Work",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Electrostatic potential, potential energy of charge configurations, and capacitor physics.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Electrostatic Potential & Work.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Electric Potential & Relation with Field",
        "formula": "V = \\frac{1}{4\\pi\\epsilon_0}\\frac{q}{r}, \\quad \\vec{E} = -\\vec{\\nabla}V = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right)",
        "variables": "V = Electrostatic potential, E = Electric field intensity",
        "examTip": "Electric field always points in the direction of steepest decreasing potential.",
        "trap": "Equipotential surfaces are always mutually perpendicular to electric field lines."
      },
      {
        "name": "Parallel Plate Capacitor with Dielectric",
        "formula": "C = \\frac{\\epsilon_0 A}{d}, \\quad C_{\\text{dielectric}} = \\frac{\\epsilon_0 A}{d - t + \\frac{t}{K}} = \\frac{K\\epsilon_0 A}{d} \\text{ (if fully filled)}",
        "variables": "A = Plate area, d = Plate separation, t = Dielectric slab thickness, K = Dielectric constant",
        "examTip": "Battery disconnected: Q stays constant, V decreases by K, E decreases by K, C increases by K.",
        "trap": "Battery kept connected: V stays constant, Q increases by K, C increases by K, E stays constant."
      },
      {
        "name": "Energy Stored in Capacitor & Combinations",
        "formula": "U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV, \\quad u_E = \\frac{1}{2}\\epsilon_0 E^2",
        "variables": "U = Stored electrostatic energy, u_E = Energy density in electric field (J/m³)",
        "examTip": "Series: 1/C_eq = 1/C₁ + 1/C₂ (charge Q is same). Parallel: C_eq = C₁ + C₂ (voltage V is same).",
        "trap": "When two capacitors are connected together, energy is always lost as heat: ΔU = (C₁C₂/(2(C₁+C₂)))(V₁ - V₂)²."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electrostatic-potential-and-capacitance-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Equipotential Surfaces",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Electrostatic potential, potential energy of charge configurations, and capacitor physics.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Equipotential Surfaces.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Electric Potential & Relation with Field",
        "formula": "V = \\frac{1}{4\\pi\\epsilon_0}\\frac{q}{r}, \\quad \\vec{E} = -\\vec{\\nabla}V = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right)",
        "variables": "V = Electrostatic potential, E = Electric field intensity",
        "examTip": "Electric field always points in the direction of steepest decreasing potential.",
        "trap": "Equipotential surfaces are always mutually perpendicular to electric field lines."
      },
      {
        "name": "Parallel Plate Capacitor with Dielectric",
        "formula": "C = \\frac{\\epsilon_0 A}{d}, \\quad C_{\\text{dielectric}} = \\frac{\\epsilon_0 A}{d - t + \\frac{t}{K}} = \\frac{K\\epsilon_0 A}{d} \\text{ (if fully filled)}",
        "variables": "A = Plate area, d = Plate separation, t = Dielectric slab thickness, K = Dielectric constant",
        "examTip": "Battery disconnected: Q stays constant, V decreases by K, E decreases by K, C increases by K.",
        "trap": "Battery kept connected: V stays constant, Q increases by K, C increases by K, E stays constant."
      },
      {
        "name": "Energy Stored in Capacitor & Combinations",
        "formula": "U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV, \\quad u_E = \\frac{1}{2}\\epsilon_0 E^2",
        "variables": "U = Stored electrostatic energy, u_E = Energy density in electric field (J/m³)",
        "examTip": "Series: 1/C_eq = 1/C₁ + 1/C₂ (charge Q is same). Parallel: C_eq = C₁ + C₂ (voltage V is same).",
        "trap": "When two capacitors are connected together, energy is always lost as heat: ΔU = (C₁C₂/(2(C₁+C₂)))(V₁ - V₂)²."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electrostatic-potential-and-capacitance-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Potential Energy of System of Charges",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Electrostatic potential, potential energy of charge configurations, and capacitor physics.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Potential Energy of System of Charges.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Electric Potential & Relation with Field",
        "formula": "V = \\frac{1}{4\\pi\\epsilon_0}\\frac{q}{r}, \\quad \\vec{E} = -\\vec{\\nabla}V = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right)",
        "variables": "V = Electrostatic potential, E = Electric field intensity",
        "examTip": "Electric field always points in the direction of steepest decreasing potential.",
        "trap": "Equipotential surfaces are always mutually perpendicular to electric field lines."
      },
      {
        "name": "Parallel Plate Capacitor with Dielectric",
        "formula": "C = \\frac{\\epsilon_0 A}{d}, \\quad C_{\\text{dielectric}} = \\frac{\\epsilon_0 A}{d - t + \\frac{t}{K}} = \\frac{K\\epsilon_0 A}{d} \\text{ (if fully filled)}",
        "variables": "A = Plate area, d = Plate separation, t = Dielectric slab thickness, K = Dielectric constant",
        "examTip": "Battery disconnected: Q stays constant, V decreases by K, E decreases by K, C increases by K.",
        "trap": "Battery kept connected: V stays constant, Q increases by K, C increases by K, E stays constant."
      },
      {
        "name": "Energy Stored in Capacitor & Combinations",
        "formula": "U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV, \\quad u_E = \\frac{1}{2}\\epsilon_0 E^2",
        "variables": "U = Stored electrostatic energy, u_E = Energy density in electric field (J/m³)",
        "examTip": "Series: 1/C_eq = 1/C₁ + 1/C₂ (charge Q is same). Parallel: C_eq = C₁ + C₂ (voltage V is same).",
        "trap": "When two capacitors are connected together, energy is always lost as heat: ΔU = (C₁C₂/(2(C₁+C₂)))(V₁ - V₂)²."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electrostatic-potential-and-capacitance-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Capacitance of Parallel Plates",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Electrostatic potential, potential energy of charge configurations, and capacitor physics.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Capacitance of Parallel Plates.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Electric Potential & Relation with Field",
        "formula": "V = \\frac{1}{4\\pi\\epsilon_0}\\frac{q}{r}, \\quad \\vec{E} = -\\vec{\\nabla}V = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right)",
        "variables": "V = Electrostatic potential, E = Electric field intensity",
        "examTip": "Electric field always points in the direction of steepest decreasing potential.",
        "trap": "Equipotential surfaces are always mutually perpendicular to electric field lines."
      },
      {
        "name": "Parallel Plate Capacitor with Dielectric",
        "formula": "C = \\frac{\\epsilon_0 A}{d}, \\quad C_{\\text{dielectric}} = \\frac{\\epsilon_0 A}{d - t + \\frac{t}{K}} = \\frac{K\\epsilon_0 A}{d} \\text{ (if fully filled)}",
        "variables": "A = Plate area, d = Plate separation, t = Dielectric slab thickness, K = Dielectric constant",
        "examTip": "Battery disconnected: Q stays constant, V decreases by K, E decreases by K, C increases by K.",
        "trap": "Battery kept connected: V stays constant, Q increases by K, C increases by K, E stays constant."
      },
      {
        "name": "Energy Stored in Capacitor & Combinations",
        "formula": "U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV, \\quad u_E = \\frac{1}{2}\\epsilon_0 E^2",
        "variables": "U = Stored electrostatic energy, u_E = Energy density in electric field (J/m³)",
        "examTip": "Series: 1/C_eq = 1/C₁ + 1/C₂ (charge Q is same). Parallel: C_eq = C₁ + C₂ (voltage V is same).",
        "trap": "When two capacitors are connected together, energy is always lost as heat: ΔU = (C₁C₂/(2(C₁+C₂)))(V₁ - V₂)²."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electrostatic-potential-and-capacitance-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electrostatic Potential and Capacitance",
    "topic": "Dielectrics & Energy Stored",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Electrostatic potential, potential energy of charge configurations, and capacitor physics.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Dielectrics & Energy Stored.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Electric Potential & Relation with Field",
        "formula": "V = \\frac{1}{4\\pi\\epsilon_0}\\frac{q}{r}, \\quad \\vec{E} = -\\vec{\\nabla}V = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right)",
        "variables": "V = Electrostatic potential, E = Electric field intensity",
        "examTip": "Electric field always points in the direction of steepest decreasing potential.",
        "trap": "Equipotential surfaces are always mutually perpendicular to electric field lines."
      },
      {
        "name": "Parallel Plate Capacitor with Dielectric",
        "formula": "C = \\frac{\\epsilon_0 A}{d}, \\quad C_{\\text{dielectric}} = \\frac{\\epsilon_0 A}{d - t + \\frac{t}{K}} = \\frac{K\\epsilon_0 A}{d} \\text{ (if fully filled)}",
        "variables": "A = Plate area, d = Plate separation, t = Dielectric slab thickness, K = Dielectric constant",
        "examTip": "Battery disconnected: Q stays constant, V decreases by K, E decreases by K, C increases by K.",
        "trap": "Battery kept connected: V stays constant, Q increases by K, C increases by K, E stays constant."
      },
      {
        "name": "Energy Stored in Capacitor & Combinations",
        "formula": "U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV, \\quad u_E = \\frac{1}{2}\\epsilon_0 E^2",
        "variables": "U = Stored electrostatic energy, u_E = Energy density in electric field (J/m³)",
        "examTip": "Series: 1/C_eq = 1/C₁ + 1/C₂ (charge Q is same). Parallel: C_eq = C₁ + C₂ (voltage V is same).",
        "trap": "When two capacitors are connected together, energy is always lost as heat: ΔU = (C₁C₂/(2(C₁+C₂)))(V₁ - V₂)²."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-current-electricity-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Current Electricity",
    "topic": "Ohm's Law & Drift Velocity",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Ohm’s law, drift velocity, resistivity, Kirchhoff’s circuit laws, and measuring bridges.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ohm's Law & Drift Velocity.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Drift Velocity & Current Density",
        "formula": "I = n e A v_d, \\quad v_d = \\frac{e E \\tau}{m}, \\quad j = \\sigma E = \\frac{E}{\\rho}",
        "variables": "n = Free electron density, e = 1.6 × 10⁻¹⁹ C, τ = Relaxation time, σ = Conductivity",
        "examTip": "Drift velocity is very small (order of 10⁻⁴ m/s), but electric signal propagates at speed of light.",
        "trap": "Temperature increase in metals causes relaxation time τ to decrease, causing resistance to increase."
      },
      {
        "name": "Kirchhoff’s Laws & Wheatstone Bridge",
        "formula": "\\sum I_{\\text{junction}} = 0, \\quad \\sum \\Delta V_{\\text{loop}} = 0, \\quad \\frac{P}{Q} = \\frac{R}{S} \\implies I_g = 0",
        "variables": "P, Q, R, S = Four arm resistances of Wheatstone bridge",
        "examTip": "Kirchhoff’s Junction Law represents conservation of charge; Loop Law represents conservation of energy.",
        "trap": "In balanced Wheatstone bridge, interchanging galvanometer and battery maintains balance condition."
      },
      {
        "name": "Potentiometer Principle & Cell Comparison",
        "formula": "\\frac{E_1}{E_2} = \\frac{l_1}{l_2}, \\quad r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)",
        "variables": "E = EMF of cell, r = Internal resistance, l₁, l₂ = Balancing lengths",
        "examTip": "Potentiometer draws zero current at balance point, acting as an ideal voltmeter of infinite resistance.",
        "trap": "Driver cell EMF must strictly exceed the EMF of cells being tested."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-current-electricity-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Current Electricity",
    "topic": "Resistivity & Temperature Coefficient",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Ohm’s law, drift velocity, resistivity, Kirchhoff’s circuit laws, and measuring bridges.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Resistivity & Temperature Coefficient.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Drift Velocity & Current Density",
        "formula": "I = n e A v_d, \\quad v_d = \\frac{e E \\tau}{m}, \\quad j = \\sigma E = \\frac{E}{\\rho}",
        "variables": "n = Free electron density, e = 1.6 × 10⁻¹⁹ C, τ = Relaxation time, σ = Conductivity",
        "examTip": "Drift velocity is very small (order of 10⁻⁴ m/s), but electric signal propagates at speed of light.",
        "trap": "Temperature increase in metals causes relaxation time τ to decrease, causing resistance to increase."
      },
      {
        "name": "Kirchhoff’s Laws & Wheatstone Bridge",
        "formula": "\\sum I_{\\text{junction}} = 0, \\quad \\sum \\Delta V_{\\text{loop}} = 0, \\quad \\frac{P}{Q} = \\frac{R}{S} \\implies I_g = 0",
        "variables": "P, Q, R, S = Four arm resistances of Wheatstone bridge",
        "examTip": "Kirchhoff’s Junction Law represents conservation of charge; Loop Law represents conservation of energy.",
        "trap": "In balanced Wheatstone bridge, interchanging galvanometer and battery maintains balance condition."
      },
      {
        "name": "Potentiometer Principle & Cell Comparison",
        "formula": "\\frac{E_1}{E_2} = \\frac{l_1}{l_2}, \\quad r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)",
        "variables": "E = EMF of cell, r = Internal resistance, l₁, l₂ = Balancing lengths",
        "examTip": "Potentiometer draws zero current at balance point, acting as an ideal voltmeter of infinite resistance.",
        "trap": "Driver cell EMF must strictly exceed the EMF of cells being tested."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-current-electricity-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Current Electricity",
    "topic": "Kirchhoff's Laws & Circuits",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Ohm’s law, drift velocity, resistivity, Kirchhoff’s circuit laws, and measuring bridges.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Kirchhoff's Laws & Circuits.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Drift Velocity & Current Density",
        "formula": "I = n e A v_d, \\quad v_d = \\frac{e E \\tau}{m}, \\quad j = \\sigma E = \\frac{E}{\\rho}",
        "variables": "n = Free electron density, e = 1.6 × 10⁻¹⁹ C, τ = Relaxation time, σ = Conductivity",
        "examTip": "Drift velocity is very small (order of 10⁻⁴ m/s), but electric signal propagates at speed of light.",
        "trap": "Temperature increase in metals causes relaxation time τ to decrease, causing resistance to increase."
      },
      {
        "name": "Kirchhoff’s Laws & Wheatstone Bridge",
        "formula": "\\sum I_{\\text{junction}} = 0, \\quad \\sum \\Delta V_{\\text{loop}} = 0, \\quad \\frac{P}{Q} = \\frac{R}{S} \\implies I_g = 0",
        "variables": "P, Q, R, S = Four arm resistances of Wheatstone bridge",
        "examTip": "Kirchhoff’s Junction Law represents conservation of charge; Loop Law represents conservation of energy.",
        "trap": "In balanced Wheatstone bridge, interchanging galvanometer and battery maintains balance condition."
      },
      {
        "name": "Potentiometer Principle & Cell Comparison",
        "formula": "\\frac{E_1}{E_2} = \\frac{l_1}{l_2}, \\quad r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)",
        "variables": "E = EMF of cell, r = Internal resistance, l₁, l₂ = Balancing lengths",
        "examTip": "Potentiometer draws zero current at balance point, acting as an ideal voltmeter of infinite resistance.",
        "trap": "Driver cell EMF must strictly exceed the EMF of cells being tested."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-current-electricity-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Current Electricity",
    "topic": "Wheatstone Bridge & Meter Bridge",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Ohm’s law, drift velocity, resistivity, Kirchhoff’s circuit laws, and measuring bridges.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Wheatstone Bridge & Meter Bridge.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Drift Velocity & Current Density",
        "formula": "I = n e A v_d, \\quad v_d = \\frac{e E \\tau}{m}, \\quad j = \\sigma E = \\frac{E}{\\rho}",
        "variables": "n = Free electron density, e = 1.6 × 10⁻¹⁹ C, τ = Relaxation time, σ = Conductivity",
        "examTip": "Drift velocity is very small (order of 10⁻⁴ m/s), but electric signal propagates at speed of light.",
        "trap": "Temperature increase in metals causes relaxation time τ to decrease, causing resistance to increase."
      },
      {
        "name": "Kirchhoff’s Laws & Wheatstone Bridge",
        "formula": "\\sum I_{\\text{junction}} = 0, \\quad \\sum \\Delta V_{\\text{loop}} = 0, \\quad \\frac{P}{Q} = \\frac{R}{S} \\implies I_g = 0",
        "variables": "P, Q, R, S = Four arm resistances of Wheatstone bridge",
        "examTip": "Kirchhoff’s Junction Law represents conservation of charge; Loop Law represents conservation of energy.",
        "trap": "In balanced Wheatstone bridge, interchanging galvanometer and battery maintains balance condition."
      },
      {
        "name": "Potentiometer Principle & Cell Comparison",
        "formula": "\\frac{E_1}{E_2} = \\frac{l_1}{l_2}, \\quad r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)",
        "variables": "E = EMF of cell, r = Internal resistance, l₁, l₂ = Balancing lengths",
        "examTip": "Potentiometer draws zero current at balance point, acting as an ideal voltmeter of infinite resistance.",
        "trap": "Driver cell EMF must strictly exceed the EMF of cells being tested."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-current-electricity-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Current Electricity",
    "topic": "Potentiometer & Cell EMF",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Ohm’s law, drift velocity, resistivity, Kirchhoff’s circuit laws, and measuring bridges.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Potentiometer & Cell EMF.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Drift Velocity & Current Density",
        "formula": "I = n e A v_d, \\quad v_d = \\frac{e E \\tau}{m}, \\quad j = \\sigma E = \\frac{E}{\\rho}",
        "variables": "n = Free electron density, e = 1.6 × 10⁻¹⁹ C, τ = Relaxation time, σ = Conductivity",
        "examTip": "Drift velocity is very small (order of 10⁻⁴ m/s), but electric signal propagates at speed of light.",
        "trap": "Temperature increase in metals causes relaxation time τ to decrease, causing resistance to increase."
      },
      {
        "name": "Kirchhoff’s Laws & Wheatstone Bridge",
        "formula": "\\sum I_{\\text{junction}} = 0, \\quad \\sum \\Delta V_{\\text{loop}} = 0, \\quad \\frac{P}{Q} = \\frac{R}{S} \\implies I_g = 0",
        "variables": "P, Q, R, S = Four arm resistances of Wheatstone bridge",
        "examTip": "Kirchhoff’s Junction Law represents conservation of charge; Loop Law represents conservation of energy.",
        "trap": "In balanced Wheatstone bridge, interchanging galvanometer and battery maintains balance condition."
      },
      {
        "name": "Potentiometer Principle & Cell Comparison",
        "formula": "\\frac{E_1}{E_2} = \\frac{l_1}{l_2}, \\quad r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)",
        "variables": "E = EMF of cell, r = Internal resistance, l₁, l₂ = Balancing lengths",
        "examTip": "Potentiometer draws zero current at balance point, acting as an ideal voltmeter of infinite resistance.",
        "trap": "Driver cell EMF must strictly exceed the EMF of cells being tested."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-moving-charges-and-magnetism-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Biot-Savart Law",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Biot-Savart Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biot-Savart Law & Circular Coil Field",
        "formula": "B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}",
        "variables": "μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance",
        "examTip": "At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.",
        "trap": "Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2)."
      },
      {
        "name": "Lorentz Force & Helical Motion",
        "formula": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
        "variables": "q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period",
        "examTip": "Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.",
        "trap": "Orbital period T is completely INDEPENDENT of particle speed v and radius r."
      },
      {
        "name": "Galvanometer Conversion to Ammeter & Voltmeter",
        "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}",
        "variables": "G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage",
        "examTip": "Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.",
        "trap": "Shunt S must be connected in parallel; multiplier R in series."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-moving-charges-and-magnetism-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Ampere's Circuital Law",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ampere's Circuital Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biot-Savart Law & Circular Coil Field",
        "formula": "B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}",
        "variables": "μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance",
        "examTip": "At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.",
        "trap": "Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2)."
      },
      {
        "name": "Lorentz Force & Helical Motion",
        "formula": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
        "variables": "q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period",
        "examTip": "Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.",
        "trap": "Orbital period T is completely INDEPENDENT of particle speed v and radius r."
      },
      {
        "name": "Galvanometer Conversion to Ammeter & Voltmeter",
        "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}",
        "variables": "G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage",
        "examTip": "Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.",
        "trap": "Shunt S must be connected in parallel; multiplier R in series."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-moving-charges-and-magnetism-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Magnetic Force on Moving Charge",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Magnetic Force on Moving Charge.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biot-Savart Law & Circular Coil Field",
        "formula": "B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}",
        "variables": "μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance",
        "examTip": "At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.",
        "trap": "Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2)."
      },
      {
        "name": "Lorentz Force & Helical Motion",
        "formula": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
        "variables": "q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period",
        "examTip": "Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.",
        "trap": "Orbital period T is completely INDEPENDENT of particle speed v and radius r."
      },
      {
        "name": "Galvanometer Conversion to Ammeter & Voltmeter",
        "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}",
        "variables": "G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage",
        "examTip": "Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.",
        "trap": "Shunt S must be connected in parallel; multiplier R in series."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-moving-charges-and-magnetism-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Force on Current Carrying Conductor",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Force on Current Carrying Conductor.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biot-Savart Law & Circular Coil Field",
        "formula": "B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}",
        "variables": "μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance",
        "examTip": "At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.",
        "trap": "Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2)."
      },
      {
        "name": "Lorentz Force & Helical Motion",
        "formula": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
        "variables": "q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period",
        "examTip": "Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.",
        "trap": "Orbital period T is completely INDEPENDENT of particle speed v and radius r."
      },
      {
        "name": "Galvanometer Conversion to Ammeter & Voltmeter",
        "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}",
        "variables": "G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage",
        "examTip": "Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.",
        "trap": "Shunt S must be connected in parallel; multiplier R in series."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-moving-charges-and-magnetism-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Moving Charges and Magnetism",
    "topic": "Moving Coil Galvanometer",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Moving Coil Galvanometer.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biot-Savart Law & Circular Coil Field",
        "formula": "B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}",
        "variables": "μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance",
        "examTip": "At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.",
        "trap": "Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2)."
      },
      {
        "name": "Lorentz Force & Helical Motion",
        "formula": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
        "variables": "q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period",
        "examTip": "Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.",
        "trap": "Orbital period T is completely INDEPENDENT of particle speed v and radius r."
      },
      {
        "name": "Galvanometer Conversion to Ammeter & Voltmeter",
        "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}",
        "variables": "G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage",
        "examTip": "Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.",
        "trap": "Shunt S must be connected in parallel; multiplier R in series."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-magnetism-and-matter-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Magnetism and Matter",
    "topic": "Bar Magnet as Equivalent Solenoid",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Bar Magnet as Equivalent Solenoid.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biot-Savart Law & Circular Coil Field",
        "formula": "B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}",
        "variables": "μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance",
        "examTip": "At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.",
        "trap": "Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2)."
      },
      {
        "name": "Lorentz Force & Helical Motion",
        "formula": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
        "variables": "q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period",
        "examTip": "Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.",
        "trap": "Orbital period T is completely INDEPENDENT of particle speed v and radius r."
      },
      {
        "name": "Galvanometer Conversion to Ammeter & Voltmeter",
        "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}",
        "variables": "G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage",
        "examTip": "Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.",
        "trap": "Shunt S must be connected in parallel; multiplier R in series."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-magnetism-and-matter-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Magnetism and Matter",
    "topic": "Earth's Magnetism & Dip",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Earth's Magnetism & Dip.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biot-Savart Law & Circular Coil Field",
        "formula": "B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}",
        "variables": "μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance",
        "examTip": "At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.",
        "trap": "Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2)."
      },
      {
        "name": "Lorentz Force & Helical Motion",
        "formula": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
        "variables": "q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period",
        "examTip": "Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.",
        "trap": "Orbital period T is completely INDEPENDENT of particle speed v and radius r."
      },
      {
        "name": "Galvanometer Conversion to Ammeter & Voltmeter",
        "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}",
        "variables": "G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage",
        "examTip": "Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.",
        "trap": "Shunt S must be connected in parallel; multiplier R in series."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-magnetism-and-matter-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Magnetism and Matter",
    "topic": "Magnetic Properties (Dia, Para, Ferro)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Magnetic Properties (Dia, Para, Ferro).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biot-Savart Law & Circular Coil Field",
        "formula": "B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}",
        "variables": "μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance",
        "examTip": "At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.",
        "trap": "Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2)."
      },
      {
        "name": "Lorentz Force & Helical Motion",
        "formula": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
        "variables": "q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period",
        "examTip": "Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.",
        "trap": "Orbital period T is completely INDEPENDENT of particle speed v and radius r."
      },
      {
        "name": "Galvanometer Conversion to Ammeter & Voltmeter",
        "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}",
        "variables": "G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage",
        "examTip": "Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.",
        "trap": "Shunt S must be connected in parallel; multiplier R in series."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-magnetism-and-matter-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Magnetism and Matter",
    "topic": "Hysteresis Loop",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Hysteresis Loop.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biot-Savart Law & Circular Coil Field",
        "formula": "B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}",
        "variables": "μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance",
        "examTip": "At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.",
        "trap": "Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2)."
      },
      {
        "name": "Lorentz Force & Helical Motion",
        "formula": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
        "variables": "q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period",
        "examTip": "Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.",
        "trap": "Orbital period T is completely INDEPENDENT of particle speed v and radius r."
      },
      {
        "name": "Galvanometer Conversion to Ammeter & Voltmeter",
        "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}",
        "variables": "G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage",
        "examTip": "Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.",
        "trap": "Shunt S must be connected in parallel; multiplier R in series."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-magnetism-and-matter-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Magnetism and Matter",
    "topic": "Curie's Law",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Biot-Savart law, Ampere’s law, magnetic force on charges/wires, and galvanometer.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Curie's Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biot-Savart Law & Circular Coil Field",
        "formula": "B = \\frac{\\mu_0 I}{2R} \\text{ (center)}, \\quad B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\text{ (axis)}",
        "variables": "μ₀ = 4π × 10⁻⁷ T·m/A, R = Coil radius, x = Axial distance",
        "examTip": "At large axial distances x >> R, field decays as dipole: B ∝ 1/x³.",
        "trap": "Field at distance x = R/√3 is related to center field by B_axis = B_center × (3/4)^(3/2)."
      },
      {
        "name": "Lorentz Force & Helical Motion",
        "formula": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{m v_{\\perp}}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
        "variables": "q = Charge, v_⊥ = Velocity perpendicular to B, r = Radius of orbit, T = Time period",
        "examTip": "Magnetic force does ZERO work on moving charge: W = 0, speed and kinetic energy remain constant.",
        "trap": "Orbital period T is completely INDEPENDENT of particle speed v and radius r."
      },
      {
        "name": "Galvanometer Conversion to Ammeter & Voltmeter",
        "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt in parallel)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Multiplier in series)}",
        "variables": "G = Galvanometer resistance, I_g = Full scale deflection current, I = Target current, V = Target voltage",
        "examTip": "Ideal ammeter has ZERO internal resistance; ideal voltmeter has INFINITE resistance.",
        "trap": "Shunt S must be connected in parallel; multiplier R in series."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electromagnetic-induction-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electromagnetic Induction",
    "topic": "Magnetic Flux & Faraday's Laws",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Magnetic Flux & Faraday's Laws.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Faraday’s Law & Motional EMF",
        "formula": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l",
        "variables": "Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length",
        "examTip": "Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².",
        "trap": "Lenz’s law negative sign represents conservation of energy."
      },
      {
        "name": "Series LCR Impedance & Resonance",
        "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "variables": "X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance",
        "examTip": "At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.",
        "trap": "Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor)."
      },
      {
        "name": "RMS Values & Transformer Turns Ratio",
        "formula": "V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        "variables": "V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary",
        "examTip": "Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.",
        "trap": "Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electromagnetic-induction-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electromagnetic Induction",
    "topic": "Lenz's Law & Conservation of Energy",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Lenz's Law & Conservation of Energy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Faraday’s Law & Motional EMF",
        "formula": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l",
        "variables": "Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length",
        "examTip": "Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².",
        "trap": "Lenz’s law negative sign represents conservation of energy."
      },
      {
        "name": "Series LCR Impedance & Resonance",
        "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "variables": "X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance",
        "examTip": "At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.",
        "trap": "Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor)."
      },
      {
        "name": "RMS Values & Transformer Turns Ratio",
        "formula": "V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        "variables": "V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary",
        "examTip": "Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.",
        "trap": "Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electromagnetic-induction-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electromagnetic Induction",
    "topic": "Motional EMF",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Motional EMF.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Faraday’s Law & Motional EMF",
        "formula": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l",
        "variables": "Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length",
        "examTip": "Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².",
        "trap": "Lenz’s law negative sign represents conservation of energy."
      },
      {
        "name": "Series LCR Impedance & Resonance",
        "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "variables": "X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance",
        "examTip": "At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.",
        "trap": "Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor)."
      },
      {
        "name": "RMS Values & Transformer Turns Ratio",
        "formula": "V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        "variables": "V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary",
        "examTip": "Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.",
        "trap": "Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electromagnetic-induction-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electromagnetic Induction",
    "topic": "Self & Mutual Inductance",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Self & Mutual Inductance.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Faraday’s Law & Motional EMF",
        "formula": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l",
        "variables": "Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length",
        "examTip": "Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².",
        "trap": "Lenz’s law negative sign represents conservation of energy."
      },
      {
        "name": "Series LCR Impedance & Resonance",
        "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "variables": "X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance",
        "examTip": "At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.",
        "trap": "Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor)."
      },
      {
        "name": "RMS Values & Transformer Turns Ratio",
        "formula": "V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        "variables": "V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary",
        "examTip": "Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.",
        "trap": "Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electromagnetic-induction-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electromagnetic Induction",
    "topic": "AC Generator & Eddy Currents",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for AC Generator & Eddy Currents.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Faraday’s Law & Motional EMF",
        "formula": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l",
        "variables": "Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length",
        "examTip": "Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².",
        "trap": "Lenz’s law negative sign represents conservation of energy."
      },
      {
        "name": "Series LCR Impedance & Resonance",
        "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "variables": "X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance",
        "examTip": "At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.",
        "trap": "Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor)."
      },
      {
        "name": "RMS Values & Transformer Turns Ratio",
        "formula": "V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        "variables": "V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary",
        "examTip": "Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.",
        "trap": "Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-alternating-current-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Alternating Current",
    "topic": "Peak, Average & RMS Values",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Peak, Average & RMS Values.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Faraday’s Law & Motional EMF",
        "formula": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l",
        "variables": "Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length",
        "examTip": "Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².",
        "trap": "Lenz’s law negative sign represents conservation of energy."
      },
      {
        "name": "Series LCR Impedance & Resonance",
        "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "variables": "X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance",
        "examTip": "At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.",
        "trap": "Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor)."
      },
      {
        "name": "RMS Values & Transformer Turns Ratio",
        "formula": "V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        "variables": "V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary",
        "examTip": "Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.",
        "trap": "Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-alternating-current-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Alternating Current",
    "topic": "AC across R, L, and C",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for AC across R, L, and C.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Faraday’s Law & Motional EMF",
        "formula": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l",
        "variables": "Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length",
        "examTip": "Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².",
        "trap": "Lenz’s law negative sign represents conservation of energy."
      },
      {
        "name": "Series LCR Impedance & Resonance",
        "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "variables": "X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance",
        "examTip": "At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.",
        "trap": "Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor)."
      },
      {
        "name": "RMS Values & Transformer Turns Ratio",
        "formula": "V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        "variables": "V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary",
        "examTip": "Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.",
        "trap": "Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-alternating-current-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Alternating Current",
    "topic": "Series LCR Circuit & Phasor",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Series LCR Circuit & Phasor.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Faraday’s Law & Motional EMF",
        "formula": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l",
        "variables": "Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length",
        "examTip": "Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².",
        "trap": "Lenz’s law negative sign represents conservation of energy."
      },
      {
        "name": "Series LCR Impedance & Resonance",
        "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "variables": "X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance",
        "examTip": "At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.",
        "trap": "Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor)."
      },
      {
        "name": "RMS Values & Transformer Turns Ratio",
        "formula": "V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        "variables": "V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary",
        "examTip": "Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.",
        "trap": "Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-alternating-current-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Alternating Current",
    "topic": "Resonance & Quality Factor",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Resonance & Quality Factor.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Faraday’s Law & Motional EMF",
        "formula": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l",
        "variables": "Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length",
        "examTip": "Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².",
        "trap": "Lenz’s law negative sign represents conservation of energy."
      },
      {
        "name": "Series LCR Impedance & Resonance",
        "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "variables": "X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance",
        "examTip": "At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.",
        "trap": "Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor)."
      },
      {
        "name": "RMS Values & Transformer Turns Ratio",
        "formula": "V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        "variables": "V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary",
        "examTip": "Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.",
        "trap": "Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-alternating-current-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Alternating Current",
    "topic": "Power in AC Circuits & Transformers",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Faraday’s flux law, Lenz’s law, motional EMF, self/mutual inductance, and LCR resonance.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Power in AC Circuits & Transformers.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Faraday’s Law & Motional EMF",
        "formula": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta), \\quad \\mathcal{E}_{\\text{motional}} = B v l",
        "variables": "Φ_B = Magnetic flux, B = Magnetic field, v = Velocity, l = Conductor length",
        "examTip": "Rotating rod of length L about one end in uniform field: EMF = 1/2 B ω L².",
        "trap": "Lenz’s law negative sign represents conservation of energy."
      },
      {
        "name": "Series LCR Impedance & Resonance",
        "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
        "variables": "X_L = ωL (Inductive reactance), X_C = 1/(ωC) (Capacitive reactance), Z = Impedance",
        "examTip": "At resonance: X_L = X_C, Z = R (minimum), current I = V/R is maximum, phase difference φ = 0.",
        "trap": "Average power in AC is P = V_rms · I_rms · cosφ, where cosφ = R/Z (power factor)."
      },
      {
        "name": "RMS Values & Transformer Turns Ratio",
        "formula": "V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0, \\quad \\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        "variables": "V₀ = Peak voltage, N_s/N_p = Turns ratio, s = Secondary, p = Primary",
        "examTip": "Standard Indian household AC is 220 V RMS; its peak value is 220 × √2 ≈ 311 V.",
        "trap": "Transformers operate strictly on alternating current (AC); they do NOT work with direct current (DC)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electromagnetic-waves-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electromagnetic Waves",
    "topic": "Displacement Current",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Displacement Current.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Progressive Wave Equation & Speed",
        "formula": "y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}",
        "variables": "k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length",
        "examTip": "Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).",
        "trap": "Wave speed v depends on the MEDIUM properties, not frequency or amplitude."
      },
      {
        "name": "Standing Waves in Organ Pipes",
        "formula": "\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)",
        "variables": "L = Length of pipe, v = Speed of sound (330-340 m/s)",
        "examTip": "Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).",
        "trap": "Open pipe of length L has the same fundamental frequency as closed pipe of length L/2."
      },
      {
        "name": "Doppler Effect for Sound",
        "formula": "f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)",
        "variables": "v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency",
        "examTip": "Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).",
        "trap": "Doppler effect depends on relative motion; if source and observer maintain constant distance, f' = f."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electromagnetic-waves-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electromagnetic Waves",
    "topic": "Maxwell's Equations",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Maxwell's Equations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Progressive Wave Equation & Speed",
        "formula": "y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}",
        "variables": "k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length",
        "examTip": "Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).",
        "trap": "Wave speed v depends on the MEDIUM properties, not frequency or amplitude."
      },
      {
        "name": "Standing Waves in Organ Pipes",
        "formula": "\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)",
        "variables": "L = Length of pipe, v = Speed of sound (330-340 m/s)",
        "examTip": "Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).",
        "trap": "Open pipe of length L has the same fundamental frequency as closed pipe of length L/2."
      },
      {
        "name": "Doppler Effect for Sound",
        "formula": "f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)",
        "variables": "v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency",
        "examTip": "Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).",
        "trap": "Doppler effect depends on relative motion; if source and observer maintain constant distance, f' = f."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electromagnetic-waves-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electromagnetic Waves",
    "topic": "Characteristics of EM Waves",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Characteristics of EM Waves.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Progressive Wave Equation & Speed",
        "formula": "y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}",
        "variables": "k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length",
        "examTip": "Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).",
        "trap": "Wave speed v depends on the MEDIUM properties, not frequency or amplitude."
      },
      {
        "name": "Standing Waves in Organ Pipes",
        "formula": "\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)",
        "variables": "L = Length of pipe, v = Speed of sound (330-340 m/s)",
        "examTip": "Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).",
        "trap": "Open pipe of length L has the same fundamental frequency as closed pipe of length L/2."
      },
      {
        "name": "Doppler Effect for Sound",
        "formula": "f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)",
        "variables": "v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency",
        "examTip": "Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).",
        "trap": "Doppler effect depends on relative motion; if source and observer maintain constant distance, f' = f."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electromagnetic-waves-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electromagnetic Waves",
    "topic": "Electromagnetic Spectrum",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Electromagnetic Spectrum.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Progressive Wave Equation & Speed",
        "formula": "y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}",
        "variables": "k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length",
        "examTip": "Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).",
        "trap": "Wave speed v depends on the MEDIUM properties, not frequency or amplitude."
      },
      {
        "name": "Standing Waves in Organ Pipes",
        "formula": "\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)",
        "variables": "L = Length of pipe, v = Speed of sound (330-340 m/s)",
        "examTip": "Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).",
        "trap": "Open pipe of length L has the same fundamental frequency as closed pipe of length L/2."
      },
      {
        "name": "Doppler Effect for Sound",
        "formula": "f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)",
        "variables": "v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency",
        "examTip": "Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).",
        "trap": "Doppler effect depends on relative motion; if source and observer maintain constant distance, f' = f."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-electromagnetic-waves-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Electromagnetic Waves",
    "topic": "Energy & Momentum of EM Waves",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Mechanical waves, standing waves, organ pipes, resonance, and Doppler effect.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Energy & Momentum of EM Waves.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Progressive Wave Equation & Speed",
        "formula": "y = A\\sin(kx \\mp \\omega t + \\phi), \\quad v = \\frac{\\omega}{k} = f\\lambda, \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}}",
        "variables": "k = Wave number (2π/λ), ω = Angular frequency (2πf), T = Tension, μ = Mass per unit length",
        "examTip": "Wave traveling in +x direction has (kx - ωt); wave in -x direction has (kx + ωt).",
        "trap": "Wave speed v depends on the MEDIUM properties, not frequency or amplitude."
      },
      {
        "name": "Standing Waves in Organ Pipes",
        "formula": "\\text{Open Pipe: } f_n = n\\frac{v}{2L} \\quad (n=1,2,3\\dots), \\quad \\text{Closed Pipe: } f_n = (2n-1)\\frac{v}{4L} \\quad (n=1,2,3\\dots)",
        "variables": "L = Length of pipe, v = Speed of sound (330-340 m/s)",
        "examTip": "Open organ pipe produces ALL harmonics (1:2:3:4); Closed organ pipe produces ONLY ODD harmonics (1:3:5).",
        "trap": "Open pipe of length L has the same fundamental frequency as closed pipe of length L/2."
      },
      {
        "name": "Doppler Effect for Sound",
        "formula": "f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)",
        "variables": "v = Speed of sound, v_o = Observer speed, v_s = Source speed, f = Source frequency",
        "examTip": "Numerator (+ for observer approaching, - for receding). Denominator (- for source approaching, + for receding).",
        "trap": "Doppler effect depends on relative motion; if source and observer maintain constant distance, f' = f."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-ray-optics-and-optical-instruments-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Reflection & Spherical Mirrors",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Reflection & Spherical Mirrors.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lens Maker’s Formula & Lens Formula",
        "formula": "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}",
        "variables": "n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature",
        "examTip": "When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.",
        "trap": "Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative."
      },
      {
        "name": "Prism Deviation & Critical Angle",
        "formula": "n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}",
        "variables": "A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR",
        "examTip": "At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.",
        "trap": "Total internal reflection occurs only when light travels from DENSER to RARER medium."
      },
      {
        "name": "Young’s Double Slit Fringe Width (YDSE)",
        "formula": "\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}",
        "variables": "β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits",
        "examTip": "Submerging YDSE apparatus in liquid of index n reduces fringe width: β' = β / n.",
        "trap": "Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-ray-optics-and-optical-instruments-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Refraction & Total Internal Reflection",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Refraction & Total Internal Reflection.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lens Maker’s Formula & Lens Formula",
        "formula": "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}",
        "variables": "n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature",
        "examTip": "When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.",
        "trap": "Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative."
      },
      {
        "name": "Prism Deviation & Critical Angle",
        "formula": "n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}",
        "variables": "A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR",
        "examTip": "At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.",
        "trap": "Total internal reflection occurs only when light travels from DENSER to RARER medium."
      },
      {
        "name": "Young’s Double Slit Fringe Width (YDSE)",
        "formula": "\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}",
        "variables": "β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits",
        "examTip": "Submerging YDSE apparatus in liquid of index n reduces fringe width: β' = β / n.",
        "trap": "Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-ray-optics-and-optical-instruments-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Prism Formula & Dispersion",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Prism Formula & Dispersion.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lens Maker’s Formula & Lens Formula",
        "formula": "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}",
        "variables": "n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature",
        "examTip": "When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.",
        "trap": "Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative."
      },
      {
        "name": "Prism Deviation & Critical Angle",
        "formula": "n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}",
        "variables": "A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR",
        "examTip": "At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.",
        "trap": "Total internal reflection occurs only when light travels from DENSER to RARER medium."
      },
      {
        "name": "Young’s Double Slit Fringe Width (YDSE)",
        "formula": "\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}",
        "variables": "β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits",
        "examTip": "Submerging YDSE apparatus in liquid of index n reduces fringe width: β' = β / n.",
        "trap": "Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-ray-optics-and-optical-instruments-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Lens Maker's Formula & Thin Lenses",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Lens Maker's Formula & Thin Lenses.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lens Maker’s Formula & Lens Formula",
        "formula": "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}",
        "variables": "n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature",
        "examTip": "When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.",
        "trap": "Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative."
      },
      {
        "name": "Prism Deviation & Critical Angle",
        "formula": "n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}",
        "variables": "A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR",
        "examTip": "At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.",
        "trap": "Total internal reflection occurs only when light travels from DENSER to RARER medium."
      },
      {
        "name": "Young’s Double Slit Fringe Width (YDSE)",
        "formula": "\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}",
        "variables": "β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits",
        "examTip": "Submerging YDSE apparatus in liquid of index n reduces fringe width: β' = β / n.",
        "trap": "Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-ray-optics-and-optical-instruments-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Ray Optics and Optical Instruments",
    "topic": "Microscopes & Telescopes",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Microscopes & Telescopes.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lens Maker’s Formula & Lens Formula",
        "formula": "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}",
        "variables": "n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature",
        "examTip": "When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.",
        "trap": "Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative."
      },
      {
        "name": "Prism Deviation & Critical Angle",
        "formula": "n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}",
        "variables": "A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR",
        "examTip": "At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.",
        "trap": "Total internal reflection occurs only when light travels from DENSER to RARER medium."
      },
      {
        "name": "Young’s Double Slit Fringe Width (YDSE)",
        "formula": "\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}",
        "variables": "β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits",
        "examTip": "Submerging YDSE apparatus in liquid of index n reduces fringe width: β' = β / n.",
        "trap": "Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-wave-optics-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Wave Optics",
    "topic": "Huygens' Principle & Wavefronts",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Huygens' Principle & Wavefronts.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lens Maker’s Formula & Lens Formula",
        "formula": "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}",
        "variables": "n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature",
        "examTip": "When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.",
        "trap": "Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative."
      },
      {
        "name": "Prism Deviation & Critical Angle",
        "formula": "n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}",
        "variables": "A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR",
        "examTip": "At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.",
        "trap": "Total internal reflection occurs only when light travels from DENSER to RARER medium."
      },
      {
        "name": "Young’s Double Slit Fringe Width (YDSE)",
        "formula": "\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}",
        "variables": "β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits",
        "examTip": "Submerging YDSE apparatus in liquid of index n reduces fringe width: β' = β / n.",
        "trap": "Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-wave-optics-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Wave Optics",
    "topic": "Interference of Light",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Interference of Light.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lens Maker’s Formula & Lens Formula",
        "formula": "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}",
        "variables": "n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature",
        "examTip": "When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.",
        "trap": "Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative."
      },
      {
        "name": "Prism Deviation & Critical Angle",
        "formula": "n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}",
        "variables": "A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR",
        "examTip": "At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.",
        "trap": "Total internal reflection occurs only when light travels from DENSER to RARER medium."
      },
      {
        "name": "Young’s Double Slit Fringe Width (YDSE)",
        "formula": "\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}",
        "variables": "β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits",
        "examTip": "Submerging YDSE apparatus in liquid of index n reduces fringe width: β' = β / n.",
        "trap": "Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-wave-optics-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Wave Optics",
    "topic": "Young's Double Slit Experiment (YDSE)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Young's Double Slit Experiment (YDSE).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lens Maker’s Formula & Lens Formula",
        "formula": "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}",
        "variables": "n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature",
        "examTip": "When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.",
        "trap": "Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative."
      },
      {
        "name": "Prism Deviation & Critical Angle",
        "formula": "n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}",
        "variables": "A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR",
        "examTip": "At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.",
        "trap": "Total internal reflection occurs only when light travels from DENSER to RARER medium."
      },
      {
        "name": "Young’s Double Slit Fringe Width (YDSE)",
        "formula": "\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}",
        "variables": "β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits",
        "examTip": "Submerging YDSE apparatus in liquid of index n reduces fringe width: β' = β / n.",
        "trap": "Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-wave-optics-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Wave Optics",
    "topic": "Diffraction at a Single Slit",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Diffraction at a Single Slit.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lens Maker’s Formula & Lens Formula",
        "formula": "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}",
        "variables": "n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature",
        "examTip": "When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.",
        "trap": "Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative."
      },
      {
        "name": "Prism Deviation & Critical Angle",
        "formula": "n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}",
        "variables": "A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR",
        "examTip": "At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.",
        "trap": "Total internal reflection occurs only when light travels from DENSER to RARER medium."
      },
      {
        "name": "Young’s Double Slit Fringe Width (YDSE)",
        "formula": "\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}",
        "variables": "β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits",
        "examTip": "Submerging YDSE apparatus in liquid of index n reduces fringe width: β' = β / n.",
        "trap": "Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-wave-optics-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Wave Optics",
    "topic": "Polarisation & Brewster's Law",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Geometrical ray optics (mirrors, lenses, prisms) and wave optics (YDSE, diffraction).",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Polarisation & Brewster's Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lens Maker’s Formula & Lens Formula",
        "formula": "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f\\text{(m)}}",
        "variables": "n = Relative refractive index of lens to medium, R₁, R₂ = Radii of curvature",
        "examTip": "When a convex lens (n = 1.5) is immersed in water (n = 1.33), its focal length quadruples: f_water ≈ 4 f_air.",
        "trap": "Follow Cartesian sign conventions strictly: distances opposite to incident ray are negative."
      },
      {
        "name": "Prism Deviation & Critical Angle",
        "formula": "n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad \\sin i_c = \\frac{1}{n}",
        "variables": "A = Angle of prism, δ_m = Minimum angle of deviation, i_c = Critical angle for TIR",
        "examTip": "At minimum deviation: angle of incidence equals emergence (i = e), refracted ray inside prism is parallel to base.",
        "trap": "Total internal reflection occurs only when light travels from DENSER to RARER medium."
      },
      {
        "name": "Young’s Double Slit Fringe Width (YDSE)",
        "formula": "\\beta = \\frac{\\lambda D}{d}, \\quad x_n(\\text{bright}) = \\frac{n\\lambda D}{d}, \\quad x_n(\\text{dark}) = (2n - 1)\\frac{\\lambda D}{2d}",
        "variables": "β = Fringe width, λ = Wavelength, D = Slit-to-screen distance, d = Separation between slits",
        "examTip": "Submerging YDSE apparatus in liquid of index n reduces fringe width: β' = β / n.",
        "trap": "Fringe width β is constant for all fringes in interference; unlike diffraction where central fringe is 2× wider."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-dual-nature-of-radiation-and-matter-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Photoelectric Effect Observations",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Photoelectric Effect Observations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-dual-nature-of-radiation-and-matter-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Einstein's Photoelectric Equation",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Einstein's Photoelectric Equation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-dual-nature-of-radiation-and-matter-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Work Function & Stopping Potential",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Work Function & Stopping Potential.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-dual-nature-of-radiation-and-matter-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "de Broglie Wavelength",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for de Broglie Wavelength.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-dual-nature-of-radiation-and-matter-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Dual Nature of Radiation and Matter",
    "topic": "Davisson-Germer Experiment",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Davisson-Germer Experiment.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-atoms-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Atoms",
    "topic": "Rutherford's Alpha Scattering Model",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Rutherford's Alpha Scattering Model.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-atoms-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Atoms",
    "topic": "Bohr's Model of Hydrogen Atom",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Bohr's Model of Hydrogen Atom.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-atoms-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Atoms",
    "topic": "Energy Levels & Spectral Series",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Energy Levels & Spectral Series.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-atoms-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Atoms",
    "topic": "De Broglie's Explanation of Bohr Postulate",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for De Broglie's Explanation of Bohr Postulate.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-atoms-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Atoms",
    "topic": "Excitation & Ionization Potentials",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Excitation & Ionization Potentials.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-nuclei-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Nuclei",
    "topic": "Nuclear Size & Density",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Nuclear Size & Density.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-nuclei-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Nuclei",
    "topic": "Mass Defect & Binding Energy",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Mass Defect & Binding Energy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-nuclei-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Nuclei",
    "topic": "Nuclear Forces Characteristics",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Nuclear Forces Characteristics.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-nuclei-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Nuclei",
    "topic": "Radioactive Decay Law & Half Life",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Radioactive Decay Law & Half Life.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-nuclei-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Nuclei",
    "topic": "Nuclear Fission & Fusion",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Photoelectric effect, de Broglie wavelength, Bohr atomic model, and nuclear binding energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Nuclear Fission & Fusion.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Einstein’s Photoelectric Equation",
        "formula": "K_{\\max} = h\\nu - \\Phi_0 = e V_0, \\quad V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}",
        "variables": "h = 6.626 × 10⁻³⁴ J·s, Φ₀ = Work function (hν₀), V₀ = Stopping potential",
        "examTip": "Slope of Stopping Potential vs Frequency graph is universally h/e, independent of metal.",
        "trap": "Photoelectric emission is instantaneous; doubling light intensity doubles photocurrent but DOES NOT change K_max."
      },
      {
        "name": "de Broglie Wavelength & Bohr Orbit Energies",
        "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{12.27}{\\sqrt{V}}\\text{ Å (for electron)}, \\quad E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}",
        "variables": "V = Accelerating voltage in Volts, Z = Atomic number, n = Principal quantum number",
        "examTip": "Bohr orbit radius: r_n = 0.529 (n²/Z) Å. Velocity: v_n = 2.18 × 10⁶ (Z/n) m/s.",
        "trap": "Total energy is negative (-13.6 eV); Kinetic energy is +13.6 eV; Potential energy is -27.2 eV (U = 2E)."
      },
      {
        "name": "Radioactive Decay Law & Mass Defect",
        "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}, \\quad E_b = \\Delta m\\times 931.5\\text{ MeV}",
        "variables": "λ = Decay constant, T_1/2 = Half life, Δm = Mass defect in amu",
        "examTip": "Fraction of nuclei remaining undecayed after n half-lives: N / N₀ = (1/2)^n.",
        "trap": "Nuclear density is constant for all nuclei (~2.3 × 10¹⁷ kg/m³), independent of mass number A."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-semiconductor-electronics-1",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Semiconductor Electronics",
    "topic": "Intrinsic & Extrinsic Semiconductors",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Solid state electronics, p-n junction diode, rectifiers, and Boolean logic gates.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Intrinsic & Extrinsic Semiconductors.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mass Action Law & Conductivity",
        "formula": "n_e n_h = n_i^2, \\quad \\sigma = e(n_e \\mu_e + n_h \\mu_h)",
        "variables": "n_e = Electron concentration, n_h = Hole concentration, n_i = Intrinsic carrier concentration, μ = Mobility",
        "examTip": "For n-type: n_e ≈ N_D (donor density); for p-type: n_h ≈ N_A (acceptor density).",
        "trap": "Even though doped, both n-type and p-type semiconductors are electrically NEUTRAL."
      },
      {
        "name": "Rectifier Efficiencies & Ripple Factor",
        "formula": "\\eta_{\\text{half}} = 40.6\\%, \\quad \\gamma_{\\text{half}} = 1.21, \\quad \\eta_{\\text{full}} = 81.2\\%, \\quad \\gamma_{\\text{full}} = 0.482",
        "variables": "η = Rectification efficiency, γ = Ripple factor (AC component / DC component)",
        "examTip": "Output ripple frequency: Half-wave = f (50 Hz); Full-wave = 2f (100 Hz).",
        "trap": "Zener diode operates in REVERSE breakdown region with constant breakdown voltage V_Z."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-semiconductor-electronics-2",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Semiconductor Electronics",
    "topic": "p-n Junction Diode Characteristics",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Solid state electronics, p-n junction diode, rectifiers, and Boolean logic gates.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for p-n Junction Diode Characteristics.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mass Action Law & Conductivity",
        "formula": "n_e n_h = n_i^2, \\quad \\sigma = e(n_e \\mu_e + n_h \\mu_h)",
        "variables": "n_e = Electron concentration, n_h = Hole concentration, n_i = Intrinsic carrier concentration, μ = Mobility",
        "examTip": "For n-type: n_e ≈ N_D (donor density); for p-type: n_h ≈ N_A (acceptor density).",
        "trap": "Even though doped, both n-type and p-type semiconductors are electrically NEUTRAL."
      },
      {
        "name": "Rectifier Efficiencies & Ripple Factor",
        "formula": "\\eta_{\\text{half}} = 40.6\\%, \\quad \\gamma_{\\text{half}} = 1.21, \\quad \\eta_{\\text{full}} = 81.2\\%, \\quad \\gamma_{\\text{full}} = 0.482",
        "variables": "η = Rectification efficiency, γ = Ripple factor (AC component / DC component)",
        "examTip": "Output ripple frequency: Half-wave = f (50 Hz); Full-wave = 2f (100 Hz).",
        "trap": "Zener diode operates in REVERSE breakdown region with constant breakdown voltage V_Z."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-semiconductor-electronics-3",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Semiconductor Electronics",
    "topic": "Half-Wave & Full-Wave Rectifiers",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Solid state electronics, p-n junction diode, rectifiers, and Boolean logic gates.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Half-Wave & Full-Wave Rectifiers.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mass Action Law & Conductivity",
        "formula": "n_e n_h = n_i^2, \\quad \\sigma = e(n_e \\mu_e + n_h \\mu_h)",
        "variables": "n_e = Electron concentration, n_h = Hole concentration, n_i = Intrinsic carrier concentration, μ = Mobility",
        "examTip": "For n-type: n_e ≈ N_D (donor density); for p-type: n_h ≈ N_A (acceptor density).",
        "trap": "Even though doped, both n-type and p-type semiconductors are electrically NEUTRAL."
      },
      {
        "name": "Rectifier Efficiencies & Ripple Factor",
        "formula": "\\eta_{\\text{half}} = 40.6\\%, \\quad \\gamma_{\\text{half}} = 1.21, \\quad \\eta_{\\text{full}} = 81.2\\%, \\quad \\gamma_{\\text{full}} = 0.482",
        "variables": "η = Rectification efficiency, γ = Ripple factor (AC component / DC component)",
        "examTip": "Output ripple frequency: Half-wave = f (50 Hz); Full-wave = 2f (100 Hz).",
        "trap": "Zener diode operates in REVERSE breakdown region with constant breakdown voltage V_Z."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-semiconductor-electronics-4",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Semiconductor Electronics",
    "topic": "Zener Diode as Voltage Regulator",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Solid state electronics, p-n junction diode, rectifiers, and Boolean logic gates.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Zener Diode as Voltage Regulator.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mass Action Law & Conductivity",
        "formula": "n_e n_h = n_i^2, \\quad \\sigma = e(n_e \\mu_e + n_h \\mu_h)",
        "variables": "n_e = Electron concentration, n_h = Hole concentration, n_i = Intrinsic carrier concentration, μ = Mobility",
        "examTip": "For n-type: n_e ≈ N_D (donor density); for p-type: n_h ≈ N_A (acceptor density).",
        "trap": "Even though doped, both n-type and p-type semiconductors are electrically NEUTRAL."
      },
      {
        "name": "Rectifier Efficiencies & Ripple Factor",
        "formula": "\\eta_{\\text{half}} = 40.6\\%, \\quad \\gamma_{\\text{half}} = 1.21, \\quad \\eta_{\\text{full}} = 81.2\\%, \\quad \\gamma_{\\text{full}} = 0.482",
        "variables": "η = Rectification efficiency, γ = Ripple factor (AC component / DC component)",
        "examTip": "Output ripple frequency: Half-wave = f (50 Hz); Full-wave = 2f (100 Hz).",
        "trap": "Zener diode operates in REVERSE breakdown region with constant breakdown voltage V_Z."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "phy-12-semiconductor-electronics-5",
    "subject": "Physics",
    "classLevel": "12",
    "chapter": "Semiconductor Electronics",
    "topic": "Logic Gates (AND, OR, NOT, NAND, NOR)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Solid state electronics, p-n junction diode, rectifiers, and Boolean logic gates.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Logic Gates (AND, OR, NOT, NAND, NOR).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mass Action Law & Conductivity",
        "formula": "n_e n_h = n_i^2, \\quad \\sigma = e(n_e \\mu_e + n_h \\mu_h)",
        "variables": "n_e = Electron concentration, n_h = Hole concentration, n_i = Intrinsic carrier concentration, μ = Mobility",
        "examTip": "For n-type: n_e ≈ N_D (donor density); for p-type: n_h ≈ N_A (acceptor density).",
        "trap": "Even though doped, both n-type and p-type semiconductors are electrically NEUTRAL."
      },
      {
        "name": "Rectifier Efficiencies & Ripple Factor",
        "formula": "\\eta_{\\text{half}} = 40.6\\%, \\quad \\gamma_{\\text{half}} = 1.21, \\quad \\eta_{\\text{full}} = 81.2\\%, \\quad \\gamma_{\\text{full}} = 0.482",
        "variables": "η = Rectification efficiency, γ = Ripple factor (AC component / DC component)",
        "examTip": "Output ripple frequency: Half-wave = f (50 Hz); Full-wave = 2f (100 Hz).",
        "trap": "Zener diode operates in REVERSE breakdown region with constant breakdown voltage V_Z."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-some-basic-concepts-of-chemistry-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Mole Concept & Molar Mass",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Stoichiometry, mole concept, concentration units, and empirical formula.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Mole Concept & Molar Mass.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Concentration Terms: Molarity & Molality",
        "formula": "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}",
        "variables": "M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)",
        "examTip": "Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.",
        "trap": "Molarity changes with temperature because volume expands upon heating."
      },
      {
        "name": "Dilution & Neutralization Formula",
        "formula": "M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}",
        "variables": "V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)",
        "examTip": "For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.",
        "trap": "In redox reactions, n-factor equals total change in oxidation number per mole of reagent."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-some-basic-concepts-of-chemistry-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Stoichiometry & Limiting Reagent",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Stoichiometry, mole concept, concentration units, and empirical formula.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Stoichiometry & Limiting Reagent.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Concentration Terms: Molarity & Molality",
        "formula": "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}",
        "variables": "M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)",
        "examTip": "Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.",
        "trap": "Molarity changes with temperature because volume expands upon heating."
      },
      {
        "name": "Dilution & Neutralization Formula",
        "formula": "M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}",
        "variables": "V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)",
        "examTip": "For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.",
        "trap": "In redox reactions, n-factor equals total change in oxidation number per mole of reagent."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-some-basic-concepts-of-chemistry-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Empirical & Molecular Formula",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Stoichiometry, mole concept, concentration units, and empirical formula.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Empirical & Molecular Formula.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Concentration Terms: Molarity & Molality",
        "formula": "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}",
        "variables": "M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)",
        "examTip": "Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.",
        "trap": "Molarity changes with temperature because volume expands upon heating."
      },
      {
        "name": "Dilution & Neutralization Formula",
        "formula": "M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}",
        "variables": "V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)",
        "examTip": "For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.",
        "trap": "In redox reactions, n-factor equals total change in oxidation number per mole of reagent."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-some-basic-concepts-of-chemistry-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Molarity & Molality",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Stoichiometry, mole concept, concentration units, and empirical formula.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Molarity & Molality.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Concentration Terms: Molarity & Molality",
        "formula": "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}",
        "variables": "M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)",
        "examTip": "Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.",
        "trap": "Molarity changes with temperature because volume expands upon heating."
      },
      {
        "name": "Dilution & Neutralization Formula",
        "formula": "M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}",
        "variables": "V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)",
        "examTip": "For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.",
        "trap": "In redox reactions, n-factor equals total change in oxidation number per mole of reagent."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-some-basic-concepts-of-chemistry-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Some Basic Concepts of Chemistry",
    "topic": "Law of Chemical Combination",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Stoichiometry, mole concept, concentration units, and empirical formula.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Law of Chemical Combination.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Concentration Terms: Molarity & Molality",
        "formula": "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}",
        "variables": "M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)",
        "examTip": "Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.",
        "trap": "Molarity changes with temperature because volume expands upon heating."
      },
      {
        "name": "Dilution & Neutralization Formula",
        "formula": "M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}",
        "variables": "V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)",
        "examTip": "For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.",
        "trap": "In redox reactions, n-factor equals total change in oxidation number per mole of reagent."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-structure-of-atom-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Structure of Atom",
    "topic": "Bohr's Model & Radii",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Bohr model of hydrogen, de Broglie relation, Heisenberg uncertainty, and quantum numbers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Bohr's Model & Radii.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bohr Radius, Velocity & Energy",
        "formula": "r_n = 0.529\\frac{n^2}{Z}\\text{ Å}, \\quad v_n = 2.18\\times 10^6\\frac{Z}{n}\\text{ m/s}, \\quad E_n = -13.6\\frac{Z^2}{n^2}\\text{ eV}",
        "variables": "n = Principal quantum number, Z = Nuclear charge (H = 1, He⁺ = 2, Li²⁺ = 3)",
        "examTip": "Ionization energy of hydrogenic ion: IE = 13.6 × Z² eV.",
        "trap": "Bohr model strictly applies ONLY to single-electron species (H, He⁺, Li²⁺, Be³⁺)."
      },
      {
        "name": "Rydberg Equation for Spectral Series",
        "formula": "\\bar{\\nu} = \\frac{1}{\\lambda} = R_H Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
        "variables": "R_H = 109677 cm⁻¹ ≈ 1.097 × 10⁷ m⁻¹, n₁ < n₂",
        "examTip": "Lyman (UV, n₁=1), Balmer (Visible, n₁=2), Paschen (Infrared, n₁=3), Brackett (IR, n₁=4).",
        "trap": "Shortest wavelength (limiting line) occurs when n₂ = ∞."
      },
      {
        "name": "Heisenberg’s Uncertainty Principle",
        "formula": "\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi} \\implies \\Delta x \\cdot m\\Delta v \\ge \\frac{h}{4\\pi}",
        "variables": "Δx = Uncertainty in position, Δp = Uncertainty in momentum, h = Planck constant",
        "examTip": "For electron in atom, uncertainty in velocity is very large, ruling out fixed classical trajectories.",
        "trap": "If question mentions \"percentage accuracy\" in velocity, Δv = (accuracy % / 100) × v."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-structure-of-atom-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Structure of Atom",
    "topic": "De Broglie Relation",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Bohr model of hydrogen, de Broglie relation, Heisenberg uncertainty, and quantum numbers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for De Broglie Relation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bohr Radius, Velocity & Energy",
        "formula": "r_n = 0.529\\frac{n^2}{Z}\\text{ Å}, \\quad v_n = 2.18\\times 10^6\\frac{Z}{n}\\text{ m/s}, \\quad E_n = -13.6\\frac{Z^2}{n^2}\\text{ eV}",
        "variables": "n = Principal quantum number, Z = Nuclear charge (H = 1, He⁺ = 2, Li²⁺ = 3)",
        "examTip": "Ionization energy of hydrogenic ion: IE = 13.6 × Z² eV.",
        "trap": "Bohr model strictly applies ONLY to single-electron species (H, He⁺, Li²⁺, Be³⁺)."
      },
      {
        "name": "Rydberg Equation for Spectral Series",
        "formula": "\\bar{\\nu} = \\frac{1}{\\lambda} = R_H Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
        "variables": "R_H = 109677 cm⁻¹ ≈ 1.097 × 10⁷ m⁻¹, n₁ < n₂",
        "examTip": "Lyman (UV, n₁=1), Balmer (Visible, n₁=2), Paschen (Infrared, n₁=3), Brackett (IR, n₁=4).",
        "trap": "Shortest wavelength (limiting line) occurs when n₂ = ∞."
      },
      {
        "name": "Heisenberg’s Uncertainty Principle",
        "formula": "\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi} \\implies \\Delta x \\cdot m\\Delta v \\ge \\frac{h}{4\\pi}",
        "variables": "Δx = Uncertainty in position, Δp = Uncertainty in momentum, h = Planck constant",
        "examTip": "For electron in atom, uncertainty in velocity is very large, ruling out fixed classical trajectories.",
        "trap": "If question mentions \"percentage accuracy\" in velocity, Δv = (accuracy % / 100) × v."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-structure-of-atom-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Structure of Atom",
    "topic": "Heisenberg Uncertainty Principle",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Bohr model of hydrogen, de Broglie relation, Heisenberg uncertainty, and quantum numbers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Heisenberg Uncertainty Principle.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bohr Radius, Velocity & Energy",
        "formula": "r_n = 0.529\\frac{n^2}{Z}\\text{ Å}, \\quad v_n = 2.18\\times 10^6\\frac{Z}{n}\\text{ m/s}, \\quad E_n = -13.6\\frac{Z^2}{n^2}\\text{ eV}",
        "variables": "n = Principal quantum number, Z = Nuclear charge (H = 1, He⁺ = 2, Li²⁺ = 3)",
        "examTip": "Ionization energy of hydrogenic ion: IE = 13.6 × Z² eV.",
        "trap": "Bohr model strictly applies ONLY to single-electron species (H, He⁺, Li²⁺, Be³⁺)."
      },
      {
        "name": "Rydberg Equation for Spectral Series",
        "formula": "\\bar{\\nu} = \\frac{1}{\\lambda} = R_H Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
        "variables": "R_H = 109677 cm⁻¹ ≈ 1.097 × 10⁷ m⁻¹, n₁ < n₂",
        "examTip": "Lyman (UV, n₁=1), Balmer (Visible, n₁=2), Paschen (Infrared, n₁=3), Brackett (IR, n₁=4).",
        "trap": "Shortest wavelength (limiting line) occurs when n₂ = ∞."
      },
      {
        "name": "Heisenberg’s Uncertainty Principle",
        "formula": "\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi} \\implies \\Delta x \\cdot m\\Delta v \\ge \\frac{h}{4\\pi}",
        "variables": "Δx = Uncertainty in position, Δp = Uncertainty in momentum, h = Planck constant",
        "examTip": "For electron in atom, uncertainty in velocity is very large, ruling out fixed classical trajectories.",
        "trap": "If question mentions \"percentage accuracy\" in velocity, Δv = (accuracy % / 100) × v."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-structure-of-atom-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Structure of Atom",
    "topic": "Quantum Numbers",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Bohr model of hydrogen, de Broglie relation, Heisenberg uncertainty, and quantum numbers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Quantum Numbers.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bohr Radius, Velocity & Energy",
        "formula": "r_n = 0.529\\frac{n^2}{Z}\\text{ Å}, \\quad v_n = 2.18\\times 10^6\\frac{Z}{n}\\text{ m/s}, \\quad E_n = -13.6\\frac{Z^2}{n^2}\\text{ eV}",
        "variables": "n = Principal quantum number, Z = Nuclear charge (H = 1, He⁺ = 2, Li²⁺ = 3)",
        "examTip": "Ionization energy of hydrogenic ion: IE = 13.6 × Z² eV.",
        "trap": "Bohr model strictly applies ONLY to single-electron species (H, He⁺, Li²⁺, Be³⁺)."
      },
      {
        "name": "Rydberg Equation for Spectral Series",
        "formula": "\\bar{\\nu} = \\frac{1}{\\lambda} = R_H Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
        "variables": "R_H = 109677 cm⁻¹ ≈ 1.097 × 10⁷ m⁻¹, n₁ < n₂",
        "examTip": "Lyman (UV, n₁=1), Balmer (Visible, n₁=2), Paschen (Infrared, n₁=3), Brackett (IR, n₁=4).",
        "trap": "Shortest wavelength (limiting line) occurs when n₂ = ∞."
      },
      {
        "name": "Heisenberg’s Uncertainty Principle",
        "formula": "\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi} \\implies \\Delta x \\cdot m\\Delta v \\ge \\frac{h}{4\\pi}",
        "variables": "Δx = Uncertainty in position, Δp = Uncertainty in momentum, h = Planck constant",
        "examTip": "For electron in atom, uncertainty in velocity is very large, ruling out fixed classical trajectories.",
        "trap": "If question mentions \"percentage accuracy\" in velocity, Δv = (accuracy % / 100) × v."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-structure-of-atom-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Structure of Atom",
    "topic": "Aufbau, Pauli & Hund's Rule",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Bohr model of hydrogen, de Broglie relation, Heisenberg uncertainty, and quantum numbers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Aufbau, Pauli & Hund's Rule.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bohr Radius, Velocity & Energy",
        "formula": "r_n = 0.529\\frac{n^2}{Z}\\text{ Å}, \\quad v_n = 2.18\\times 10^6\\frac{Z}{n}\\text{ m/s}, \\quad E_n = -13.6\\frac{Z^2}{n^2}\\text{ eV}",
        "variables": "n = Principal quantum number, Z = Nuclear charge (H = 1, He⁺ = 2, Li²⁺ = 3)",
        "examTip": "Ionization energy of hydrogenic ion: IE = 13.6 × Z² eV.",
        "trap": "Bohr model strictly applies ONLY to single-electron species (H, He⁺, Li²⁺, Be³⁺)."
      },
      {
        "name": "Rydberg Equation for Spectral Series",
        "formula": "\\bar{\\nu} = \\frac{1}{\\lambda} = R_H Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
        "variables": "R_H = 109677 cm⁻¹ ≈ 1.097 × 10⁷ m⁻¹, n₁ < n₂",
        "examTip": "Lyman (UV, n₁=1), Balmer (Visible, n₁=2), Paschen (Infrared, n₁=3), Brackett (IR, n₁=4).",
        "trap": "Shortest wavelength (limiting line) occurs when n₂ = ∞."
      },
      {
        "name": "Heisenberg’s Uncertainty Principle",
        "formula": "\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi} \\implies \\Delta x \\cdot m\\Delta v \\ge \\frac{h}{4\\pi}",
        "variables": "Δx = Uncertainty in position, Δp = Uncertainty in momentum, h = Planck constant",
        "examTip": "For electron in atom, uncertainty in velocity is very large, ruling out fixed classical trajectories.",
        "trap": "If question mentions \"percentage accuracy\" in velocity, Δv = (accuracy % / 100) × v."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-classification-of-elements-and-periodicity-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Modern Periodic Table",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Modern Periodic Table in Classification of Elements and Periodicity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Modern Periodic Table.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Modern Periodic Table Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-classification-of-elements-and-periodicity-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Atomic & Ionic Radii Trends",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Atomic & Ionic Radii Trends in Classification of Elements and Periodicity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Atomic & Ionic Radii Trends.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Atomic & Ionic Radii Trends Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-classification-of-elements-and-periodicity-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Ionization Enthalpy",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Ionization Enthalpy in Classification of Elements and Periodicity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ionization Enthalpy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Ionization Enthalpy Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-classification-of-elements-and-periodicity-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Electron Gain Enthalpy",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Electron Gain Enthalpy in Classification of Elements and Periodicity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Electron Gain Enthalpy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Electron Gain Enthalpy Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-classification-of-elements-and-periodicity-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Classification of Elements and Periodicity",
    "topic": "Electronegativity Trends",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Electronegativity Trends in Classification of Elements and Periodicity.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Electronegativity Trends.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Electronegativity Trends Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-chemical-bonding-and-molecular-structure-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Lewis Dot Structures",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Stoichiometry, mole concept, concentration units, and empirical formula.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Lewis Dot Structures.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Concentration Terms: Molarity & Molality",
        "formula": "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}",
        "variables": "M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)",
        "examTip": "Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.",
        "trap": "Molarity changes with temperature because volume expands upon heating."
      },
      {
        "name": "Dilution & Neutralization Formula",
        "formula": "M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}",
        "variables": "V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)",
        "examTip": "For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.",
        "trap": "In redox reactions, n-factor equals total change in oxidation number per mole of reagent."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-chemical-bonding-and-molecular-structure-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "VSEPR Theory & Shapes",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Stoichiometry, mole concept, concentration units, and empirical formula.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for VSEPR Theory & Shapes.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Concentration Terms: Molarity & Molality",
        "formula": "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}",
        "variables": "M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)",
        "examTip": "Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.",
        "trap": "Molarity changes with temperature because volume expands upon heating."
      },
      {
        "name": "Dilution & Neutralization Formula",
        "formula": "M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}",
        "variables": "V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)",
        "examTip": "For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.",
        "trap": "In redox reactions, n-factor equals total change in oxidation number per mole of reagent."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-chemical-bonding-and-molecular-structure-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Hybridization (sp, sp2, sp3, sp3d)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Stoichiometry, mole concept, concentration units, and empirical formula.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Hybridization (sp, sp2, sp3, sp3d).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Concentration Terms: Molarity & Molality",
        "formula": "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}",
        "variables": "M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)",
        "examTip": "Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.",
        "trap": "Molarity changes with temperature because volume expands upon heating."
      },
      {
        "name": "Dilution & Neutralization Formula",
        "formula": "M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}",
        "variables": "V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)",
        "examTip": "For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.",
        "trap": "In redox reactions, n-factor equals total change in oxidation number per mole of reagent."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-chemical-bonding-and-molecular-structure-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Molecular Orbital Theory (MOT)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Stoichiometry, mole concept, concentration units, and empirical formula.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Molecular Orbital Theory (MOT).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Concentration Terms: Molarity & Molality",
        "formula": "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}",
        "variables": "M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)",
        "examTip": "Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.",
        "trap": "Molarity changes with temperature because volume expands upon heating."
      },
      {
        "name": "Dilution & Neutralization Formula",
        "formula": "M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}",
        "variables": "V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)",
        "examTip": "For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.",
        "trap": "In redox reactions, n-factor equals total change in oxidation number per mole of reagent."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-chemical-bonding-and-molecular-structure-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Bonding and Molecular Structure",
    "topic": "Hydrogen Bonding & Dipole Moment",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Stoichiometry, mole concept, concentration units, and empirical formula.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Hydrogen Bonding & Dipole Moment.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Concentration Terms: Molarity & Molality",
        "formula": "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}(\\text{L})}, \\quad m = \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}, \\quad X_A = \\frac{n_A}{n_A + n_B}",
        "variables": "M = Molarity, m = Molality, X_A = Mole fraction, n = Moles (Mass/Molar Mass)",
        "examTip": "Molality and mole fraction are temperature INDEPENDENT because mass is invariant with temperature.",
        "trap": "Molarity changes with temperature because volume expands upon heating."
      },
      {
        "name": "Dilution & Neutralization Formula",
        "formula": "M_1 V_1 = M_2 V_2, \\quad N_1 V_1 = N_2 V_2, \\quad \\text{Normality } N = M \\times n\\text{-factor}",
        "variables": "V = Volume, n-factor = Valency factor (basicity of acid, acidity of base)",
        "examTip": "For H₂SO₄, n-factor is 2, so 1 M H₂SO₄ = 2 N H₂SO₄.",
        "trap": "In redox reactions, n-factor equals total change in oxidation number per mole of reagent."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-chemical-thermodynamics-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Thermodynamics",
    "topic": "First Law of Thermodynamics",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Chemical energetics, Hess’s law, enthalpy, entropy, and Gibbs free energy criterion.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for First Law of Thermodynamics.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Enthalpy & Work Relation",
        "formula": "\\Delta H = \\Delta U + \\Delta n_g R T, \\quad w = -P_{\\text{ext}}\\Delta V = -2.303 nRT\\log\\left(\\frac{V_2}{V_1}\\right)",
        "variables": "Δn_g = (moles of gaseous products) - (moles of gaseous reactants)",
        "examTip": "If Δn_g = 0, ΔH = ΔU (e.g. H₂(g) + I₂(g) ⇌ 2HI(g)).",
        "trap": "Chemistry sign convention: work done BY the gas is negative (w < 0)."
      },
      {
        "name": "Gibbs Free Energy & Spontaneity",
        "formula": "\\Delta G = \\Delta H - T\\Delta S, \\quad \\Delta G^\\circ = -RT\\ln K = -2.303 RT\\log K",
        "variables": "ΔG = Gibbs free energy change, T = Temperature (K), K = Equilibrium constant",
        "examTip": "Spontaneous process requires ΔG < 0 at constant temperature and pressure.",
        "trap": "At equilibrium: ΔG = 0 and ΔG° = -RT ln(K_eq)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-chemical-thermodynamics-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Thermodynamics",
    "topic": "Enthalpy & Hess's Law",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Chemical energetics, Hess’s law, enthalpy, entropy, and Gibbs free energy criterion.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Enthalpy & Hess's Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Enthalpy & Work Relation",
        "formula": "\\Delta H = \\Delta U + \\Delta n_g R T, \\quad w = -P_{\\text{ext}}\\Delta V = -2.303 nRT\\log\\left(\\frac{V_2}{V_1}\\right)",
        "variables": "Δn_g = (moles of gaseous products) - (moles of gaseous reactants)",
        "examTip": "If Δn_g = 0, ΔH = ΔU (e.g. H₂(g) + I₂(g) ⇌ 2HI(g)).",
        "trap": "Chemistry sign convention: work done BY the gas is negative (w < 0)."
      },
      {
        "name": "Gibbs Free Energy & Spontaneity",
        "formula": "\\Delta G = \\Delta H - T\\Delta S, \\quad \\Delta G^\\circ = -RT\\ln K = -2.303 RT\\log K",
        "variables": "ΔG = Gibbs free energy change, T = Temperature (K), K = Equilibrium constant",
        "examTip": "Spontaneous process requires ΔG < 0 at constant temperature and pressure.",
        "trap": "At equilibrium: ΔG = 0 and ΔG° = -RT ln(K_eq)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-chemical-thermodynamics-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Thermodynamics",
    "topic": "Entropy & Second Law",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Chemical energetics, Hess’s law, enthalpy, entropy, and Gibbs free energy criterion.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Entropy & Second Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Enthalpy & Work Relation",
        "formula": "\\Delta H = \\Delta U + \\Delta n_g R T, \\quad w = -P_{\\text{ext}}\\Delta V = -2.303 nRT\\log\\left(\\frac{V_2}{V_1}\\right)",
        "variables": "Δn_g = (moles of gaseous products) - (moles of gaseous reactants)",
        "examTip": "If Δn_g = 0, ΔH = ΔU (e.g. H₂(g) + I₂(g) ⇌ 2HI(g)).",
        "trap": "Chemistry sign convention: work done BY the gas is negative (w < 0)."
      },
      {
        "name": "Gibbs Free Energy & Spontaneity",
        "formula": "\\Delta G = \\Delta H - T\\Delta S, \\quad \\Delta G^\\circ = -RT\\ln K = -2.303 RT\\log K",
        "variables": "ΔG = Gibbs free energy change, T = Temperature (K), K = Equilibrium constant",
        "examTip": "Spontaneous process requires ΔG < 0 at constant temperature and pressure.",
        "trap": "At equilibrium: ΔG = 0 and ΔG° = -RT ln(K_eq)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-chemical-thermodynamics-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Thermodynamics",
    "topic": "Gibbs Free Energy & Spontaneity",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Chemical energetics, Hess’s law, enthalpy, entropy, and Gibbs free energy criterion.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Gibbs Free Energy & Spontaneity.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Enthalpy & Work Relation",
        "formula": "\\Delta H = \\Delta U + \\Delta n_g R T, \\quad w = -P_{\\text{ext}}\\Delta V = -2.303 nRT\\log\\left(\\frac{V_2}{V_1}\\right)",
        "variables": "Δn_g = (moles of gaseous products) - (moles of gaseous reactants)",
        "examTip": "If Δn_g = 0, ΔH = ΔU (e.g. H₂(g) + I₂(g) ⇌ 2HI(g)).",
        "trap": "Chemistry sign convention: work done BY the gas is negative (w < 0)."
      },
      {
        "name": "Gibbs Free Energy & Spontaneity",
        "formula": "\\Delta G = \\Delta H - T\\Delta S, \\quad \\Delta G^\\circ = -RT\\ln K = -2.303 RT\\log K",
        "variables": "ΔG = Gibbs free energy change, T = Temperature (K), K = Equilibrium constant",
        "examTip": "Spontaneous process requires ΔG < 0 at constant temperature and pressure.",
        "trap": "At equilibrium: ΔG = 0 and ΔG° = -RT ln(K_eq)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-chemical-thermodynamics-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Chemical Thermodynamics",
    "topic": "Heat Capacity & Calorimetry",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Chemical energetics, Hess’s law, enthalpy, entropy, and Gibbs free energy criterion.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Heat Capacity & Calorimetry.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Enthalpy & Work Relation",
        "formula": "\\Delta H = \\Delta U + \\Delta n_g R T, \\quad w = -P_{\\text{ext}}\\Delta V = -2.303 nRT\\log\\left(\\frac{V_2}{V_1}\\right)",
        "variables": "Δn_g = (moles of gaseous products) - (moles of gaseous reactants)",
        "examTip": "If Δn_g = 0, ΔH = ΔU (e.g. H₂(g) + I₂(g) ⇌ 2HI(g)).",
        "trap": "Chemistry sign convention: work done BY the gas is negative (w < 0)."
      },
      {
        "name": "Gibbs Free Energy & Spontaneity",
        "formula": "\\Delta G = \\Delta H - T\\Delta S, \\quad \\Delta G^\\circ = -RT\\ln K = -2.303 RT\\log K",
        "variables": "ΔG = Gibbs free energy change, T = Temperature (K), K = Equilibrium constant",
        "examTip": "Spontaneous process requires ΔG < 0 at constant temperature and pressure.",
        "trap": "At equilibrium: ΔG = 0 and ΔG° = -RT ln(K_eq)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-equilibrium-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Law of Chemical Equilibrium",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Law of chemical equilibrium, Le Chatelier’s principle, pH of acids/bases, and buffers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Law of Chemical Equilibrium.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Relation Between K_p and K_c",
        "formula": "K_p = K_c (RT)^{\\Delta n_g}",
        "variables": "R = 0.0821 L·atm/(mol·K) or 0.0831 L·bar/(mol·K), T = Kelvin",
        "examTip": "If Δn_g = 0, K_p = K_c; if Δn_g > 0, K_p > K_c at temperatures above ~12 K.",
        "trap": "Include only GASEOUS species in calculating Δn_g; pure solids and liquids have activity = 1."
      },
      {
        "name": "Henderson-Hasselbalch Equation for Buffer Solutions",
        "formula": "\\text{Acidic Buffer: } \\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}, \\quad \\text{Basic Buffer: } \\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{Salt}]}{[\\text{Base}]}",
        "variables": "pH + pOH = 14 (at 25°C), pKa = -log(Ka)",
        "examTip": "Maximum buffer capacity occurs when [Salt] = [Acid], giving pH = pKa.",
        "trap": "Strong acid/base salt solutions are neutral (pH = 7) only if neither ion hydrolyzes."
      },
      {
        "name": "Solubility Product (K_sp) and Precipitation",
        "formula": "A_x B_y(s) \\rightleftharpoons x A^{y+} + y B^{x-} \\implies K_{sp} = x^x y^y S^{x+y}",
        "variables": "S = Molar solubility in mol/L",
        "examTip": "For 1:1 salt (AgCl): K_sp = S². For 1:2 salt (PbCl₂): K_sp = 4S³. For 1:3 salt: K_sp = 27S⁴.",
        "trap": "Precipitation occurs if and only if Ionic Product (Q_sp) EXCEEDS K_sp: Q_sp > K_sp."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-equilibrium-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Le Chatelier's Principle",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Law of chemical equilibrium, Le Chatelier’s principle, pH of acids/bases, and buffers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Le Chatelier's Principle.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Relation Between K_p and K_c",
        "formula": "K_p = K_c (RT)^{\\Delta n_g}",
        "variables": "R = 0.0821 L·atm/(mol·K) or 0.0831 L·bar/(mol·K), T = Kelvin",
        "examTip": "If Δn_g = 0, K_p = K_c; if Δn_g > 0, K_p > K_c at temperatures above ~12 K.",
        "trap": "Include only GASEOUS species in calculating Δn_g; pure solids and liquids have activity = 1."
      },
      {
        "name": "Henderson-Hasselbalch Equation for Buffer Solutions",
        "formula": "\\text{Acidic Buffer: } \\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}, \\quad \\text{Basic Buffer: } \\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{Salt}]}{[\\text{Base}]}",
        "variables": "pH + pOH = 14 (at 25°C), pKa = -log(Ka)",
        "examTip": "Maximum buffer capacity occurs when [Salt] = [Acid], giving pH = pKa.",
        "trap": "Strong acid/base salt solutions are neutral (pH = 7) only if neither ion hydrolyzes."
      },
      {
        "name": "Solubility Product (K_sp) and Precipitation",
        "formula": "A_x B_y(s) \\rightleftharpoons x A^{y+} + y B^{x-} \\implies K_{sp} = x^x y^y S^{x+y}",
        "variables": "S = Molar solubility in mol/L",
        "examTip": "For 1:1 salt (AgCl): K_sp = S². For 1:2 salt (PbCl₂): K_sp = 4S³. For 1:3 salt: K_sp = 27S⁴.",
        "trap": "Precipitation occurs if and only if Ionic Product (Q_sp) EXCEEDS K_sp: Q_sp > K_sp."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-equilibrium-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Acid-Base Concepts (Arrhenius, Bronsted, Lewis)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Law of chemical equilibrium, Le Chatelier’s principle, pH of acids/bases, and buffers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Acid-Base Concepts (Arrhenius, Bronsted, Lewis).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Relation Between K_p and K_c",
        "formula": "K_p = K_c (RT)^{\\Delta n_g}",
        "variables": "R = 0.0821 L·atm/(mol·K) or 0.0831 L·bar/(mol·K), T = Kelvin",
        "examTip": "If Δn_g = 0, K_p = K_c; if Δn_g > 0, K_p > K_c at temperatures above ~12 K.",
        "trap": "Include only GASEOUS species in calculating Δn_g; pure solids and liquids have activity = 1."
      },
      {
        "name": "Henderson-Hasselbalch Equation for Buffer Solutions",
        "formula": "\\text{Acidic Buffer: } \\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}, \\quad \\text{Basic Buffer: } \\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{Salt}]}{[\\text{Base}]}",
        "variables": "pH + pOH = 14 (at 25°C), pKa = -log(Ka)",
        "examTip": "Maximum buffer capacity occurs when [Salt] = [Acid], giving pH = pKa.",
        "trap": "Strong acid/base salt solutions are neutral (pH = 7) only if neither ion hydrolyzes."
      },
      {
        "name": "Solubility Product (K_sp) and Precipitation",
        "formula": "A_x B_y(s) \\rightleftharpoons x A^{y+} + y B^{x-} \\implies K_{sp} = x^x y^y S^{x+y}",
        "variables": "S = Molar solubility in mol/L",
        "examTip": "For 1:1 salt (AgCl): K_sp = S². For 1:2 salt (PbCl₂): K_sp = 4S³. For 1:3 salt: K_sp = 27S⁴.",
        "trap": "Precipitation occurs if and only if Ionic Product (Q_sp) EXCEEDS K_sp: Q_sp > K_sp."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-equilibrium-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "pH & Buffer Solutions",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Law of chemical equilibrium, Le Chatelier’s principle, pH of acids/bases, and buffers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for pH & Buffer Solutions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Relation Between K_p and K_c",
        "formula": "K_p = K_c (RT)^{\\Delta n_g}",
        "variables": "R = 0.0821 L·atm/(mol·K) or 0.0831 L·bar/(mol·K), T = Kelvin",
        "examTip": "If Δn_g = 0, K_p = K_c; if Δn_g > 0, K_p > K_c at temperatures above ~12 K.",
        "trap": "Include only GASEOUS species in calculating Δn_g; pure solids and liquids have activity = 1."
      },
      {
        "name": "Henderson-Hasselbalch Equation for Buffer Solutions",
        "formula": "\\text{Acidic Buffer: } \\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}, \\quad \\text{Basic Buffer: } \\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{Salt}]}{[\\text{Base}]}",
        "variables": "pH + pOH = 14 (at 25°C), pKa = -log(Ka)",
        "examTip": "Maximum buffer capacity occurs when [Salt] = [Acid], giving pH = pKa.",
        "trap": "Strong acid/base salt solutions are neutral (pH = 7) only if neither ion hydrolyzes."
      },
      {
        "name": "Solubility Product (K_sp) and Precipitation",
        "formula": "A_x B_y(s) \\rightleftharpoons x A^{y+} + y B^{x-} \\implies K_{sp} = x^x y^y S^{x+y}",
        "variables": "S = Molar solubility in mol/L",
        "examTip": "For 1:1 salt (AgCl): K_sp = S². For 1:2 salt (PbCl₂): K_sp = 4S³. For 1:3 salt: K_sp = 27S⁴.",
        "trap": "Precipitation occurs if and only if Ionic Product (Q_sp) EXCEEDS K_sp: Q_sp > K_sp."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-equilibrium-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Equilibrium",
    "topic": "Solubility Product Ksp",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Law of chemical equilibrium, Le Chatelier’s principle, pH of acids/bases, and buffers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Solubility Product Ksp.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Relation Between K_p and K_c",
        "formula": "K_p = K_c (RT)^{\\Delta n_g}",
        "variables": "R = 0.0821 L·atm/(mol·K) or 0.0831 L·bar/(mol·K), T = Kelvin",
        "examTip": "If Δn_g = 0, K_p = K_c; if Δn_g > 0, K_p > K_c at temperatures above ~12 K.",
        "trap": "Include only GASEOUS species in calculating Δn_g; pure solids and liquids have activity = 1."
      },
      {
        "name": "Henderson-Hasselbalch Equation for Buffer Solutions",
        "formula": "\\text{Acidic Buffer: } \\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}, \\quad \\text{Basic Buffer: } \\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{Salt}]}{[\\text{Base}]}",
        "variables": "pH + pOH = 14 (at 25°C), pKa = -log(Ka)",
        "examTip": "Maximum buffer capacity occurs when [Salt] = [Acid], giving pH = pKa.",
        "trap": "Strong acid/base salt solutions are neutral (pH = 7) only if neither ion hydrolyzes."
      },
      {
        "name": "Solubility Product (K_sp) and Precipitation",
        "formula": "A_x B_y(s) \\rightleftharpoons x A^{y+} + y B^{x-} \\implies K_{sp} = x^x y^y S^{x+y}",
        "variables": "S = Molar solubility in mol/L",
        "examTip": "For 1:1 salt (AgCl): K_sp = S². For 1:2 salt (PbCl₂): K_sp = 4S³. For 1:3 salt: K_sp = 27S⁴.",
        "trap": "Precipitation occurs if and only if Ionic Product (Q_sp) EXCEEDS K_sp: Q_sp > K_sp."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-redox-reactions-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Redox Reactions",
    "topic": "Oxidation Numbers Rules",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Oxidation Numbers Rules in Redox Reactions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Oxidation Numbers Rules.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Oxidation Numbers Rules Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-redox-reactions-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Redox Reactions",
    "topic": "Balancing Redox Reactions",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Balancing Redox Reactions in Redox Reactions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Balancing Redox Reactions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Balancing Redox Reactions Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-redox-reactions-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Redox Reactions",
    "topic": "Electrochemical Series",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Electrochemical Series in Redox Reactions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Electrochemical Series.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Electrochemical Series Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-redox-reactions-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Redox Reactions",
    "topic": "Oxidizing & Reducing Agents",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Oxidizing & Reducing Agents in Redox Reactions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Oxidizing & Reducing Agents.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Oxidizing & Reducing Agents Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-redox-reactions-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Redox Reactions",
    "topic": "Disproportionation Reactions",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Disproportionation Reactions in Redox Reactions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Disproportionation Reactions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Disproportionation Reactions Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-organic-chemistry--basic-principles-and-techniques-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "IUPAC Nomenclature",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for IUPAC Nomenclature in Organic Chemistry: Basic Principles and Techniques.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for IUPAC Nomenclature.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "IUPAC Nomenclature Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-organic-chemistry--basic-principles-and-techniques-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Isomerism (Structural & Stereo)",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Isomerism (Structural & Stereo) in Organic Chemistry: Basic Principles and Techniques.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Isomerism (Structural & Stereo).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Isomerism (Structural & Stereo) Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-organic-chemistry--basic-principles-and-techniques-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Electronic Effects (Inductive, Resonance, Hyperconjugation)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Electronic Effects (Inductive, Resonance, Hyperconjugation) in Organic Chemistry: Basic Principles and Techniques.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Electronic Effects (Inductive, Resonance, Hyperconjugation).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Electronic Effects (Inductive, Resonance, Hyperconjugation) Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-organic-chemistry--basic-principles-and-techniques-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Carbocation & Carbanion Stability",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Carbocation & Carbanion Stability in Organic Chemistry: Basic Principles and Techniques.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Carbocation & Carbanion Stability.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Carbocation & Carbanion Stability Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-organic-chemistry--basic-principles-and-techniques-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "topic": "Purification & Qualitative Analysis",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Purification & Qualitative Analysis in Organic Chemistry: Basic Principles and Techniques.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Purification & Qualitative Analysis.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Purification & Qualitative Analysis Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-hydrocarbons-1",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrocarbons",
    "topic": "Alkanes Halogenation Mechanism",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Alkanes Halogenation Mechanism in Hydrocarbons.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Alkanes Halogenation Mechanism.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Alkanes Halogenation Mechanism Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-hydrocarbons-2",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrocarbons",
    "topic": "Alkenes Markovnikov & Anti-Markovnikov Addition",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Alkenes Markovnikov & Anti-Markovnikov Addition in Hydrocarbons.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Alkenes Markovnikov & Anti-Markovnikov Addition.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Alkenes Markovnikov & Anti-Markovnikov Addition Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-hydrocarbons-3",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrocarbons",
    "topic": "Ozonolysis of Alkenes",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Ozonolysis of Alkenes in Hydrocarbons.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ozonolysis of Alkenes.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Ozonolysis of Alkenes Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-hydrocarbons-4",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrocarbons",
    "topic": "Alkynes Acidity & Addition",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Alkynes Acidity & Addition in Hydrocarbons.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Alkynes Acidity & Addition.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Alkynes Acidity & Addition Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-11-hydrocarbons-5",
    "subject": "Chemistry",
    "classLevel": "11",
    "chapter": "Hydrocarbons",
    "topic": "Aromaticity & Electrophilic Substitution",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Aromaticity & Electrophilic Substitution in Hydrocarbons.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Aromaticity & Electrophilic Substitution.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Aromaticity & Electrophilic Substitution Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-solutions-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Solutions",
    "topic": "Types of Solutions & Solubility",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Raoult’s law, Henry’s law, colligative properties, and van ’t Hoff factor.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Types of Solutions & Solubility.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Raoult’s Law & Relative Lowering of Vapour Pressure",
        "formula": "\\frac{P_A^\\circ - P}{P_A^\\circ} = i X_{\\text{solute}} = i \\frac{n_B}{n_A + n_B} \\approx i \\frac{n_B}{n_A}",
        "variables": "P_A° = Vapour pressure of pure solvent, P = Solution vapour pressure, i = van ’t Hoff factor",
        "examTip": "Relative lowering of vapour pressure is a colligative property depending only on solute particle count.",
        "trap": "For dilute solutions: (P° - P)/P = i(n_B/n_A) connects directly with molality."
      },
      {
        "name": "Elevation in Boiling Point & Depression in Freezing Point",
        "formula": "\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\pi = i C R T",
        "variables": "K_b = Ebullioscopic constant, K_f = Cryoscopic constant, m = Molality, π = Osmotic pressure",
        "examTip": "For dissociation with degree α: i = 1 + (n - 1)α. For association: i = 1 + (1/n - 1)α.",
        "trap": "For strong electrolytes (NaCl, BaCl₂), assume α = 1 unless specified otherwise: i(NaCl)=2, i(BaCl₂)=3."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-solutions-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Solutions",
    "topic": "Henry's Law & Raoult's Law",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Raoult’s law, Henry’s law, colligative properties, and van ’t Hoff factor.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Henry's Law & Raoult's Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Raoult’s Law & Relative Lowering of Vapour Pressure",
        "formula": "\\frac{P_A^\\circ - P}{P_A^\\circ} = i X_{\\text{solute}} = i \\frac{n_B}{n_A + n_B} \\approx i \\frac{n_B}{n_A}",
        "variables": "P_A° = Vapour pressure of pure solvent, P = Solution vapour pressure, i = van ’t Hoff factor",
        "examTip": "Relative lowering of vapour pressure is a colligative property depending only on solute particle count.",
        "trap": "For dilute solutions: (P° - P)/P = i(n_B/n_A) connects directly with molality."
      },
      {
        "name": "Elevation in Boiling Point & Depression in Freezing Point",
        "formula": "\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\pi = i C R T",
        "variables": "K_b = Ebullioscopic constant, K_f = Cryoscopic constant, m = Molality, π = Osmotic pressure",
        "examTip": "For dissociation with degree α: i = 1 + (n - 1)α. For association: i = 1 + (1/n - 1)α.",
        "trap": "For strong electrolytes (NaCl, BaCl₂), assume α = 1 unless specified otherwise: i(NaCl)=2, i(BaCl₂)=3."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-solutions-3",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Solutions",
    "topic": "Ideal & Non-ideal Solutions",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Raoult’s law, Henry’s law, colligative properties, and van ’t Hoff factor.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ideal & Non-ideal Solutions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Raoult’s Law & Relative Lowering of Vapour Pressure",
        "formula": "\\frac{P_A^\\circ - P}{P_A^\\circ} = i X_{\\text{solute}} = i \\frac{n_B}{n_A + n_B} \\approx i \\frac{n_B}{n_A}",
        "variables": "P_A° = Vapour pressure of pure solvent, P = Solution vapour pressure, i = van ’t Hoff factor",
        "examTip": "Relative lowering of vapour pressure is a colligative property depending only on solute particle count.",
        "trap": "For dilute solutions: (P° - P)/P = i(n_B/n_A) connects directly with molality."
      },
      {
        "name": "Elevation in Boiling Point & Depression in Freezing Point",
        "formula": "\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\pi = i C R T",
        "variables": "K_b = Ebullioscopic constant, K_f = Cryoscopic constant, m = Molality, π = Osmotic pressure",
        "examTip": "For dissociation with degree α: i = 1 + (n - 1)α. For association: i = 1 + (1/n - 1)α.",
        "trap": "For strong electrolytes (NaCl, BaCl₂), assume α = 1 unless specified otherwise: i(NaCl)=2, i(BaCl₂)=3."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-solutions-4",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Solutions",
    "topic": "Colligative Properties (Boiling/Freezing/Osmotic)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Raoult’s law, Henry’s law, colligative properties, and van ’t Hoff factor.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Colligative Properties (Boiling/Freezing/Osmotic).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Raoult’s Law & Relative Lowering of Vapour Pressure",
        "formula": "\\frac{P_A^\\circ - P}{P_A^\\circ} = i X_{\\text{solute}} = i \\frac{n_B}{n_A + n_B} \\approx i \\frac{n_B}{n_A}",
        "variables": "P_A° = Vapour pressure of pure solvent, P = Solution vapour pressure, i = van ’t Hoff factor",
        "examTip": "Relative lowering of vapour pressure is a colligative property depending only on solute particle count.",
        "trap": "For dilute solutions: (P° - P)/P = i(n_B/n_A) connects directly with molality."
      },
      {
        "name": "Elevation in Boiling Point & Depression in Freezing Point",
        "formula": "\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\pi = i C R T",
        "variables": "K_b = Ebullioscopic constant, K_f = Cryoscopic constant, m = Molality, π = Osmotic pressure",
        "examTip": "For dissociation with degree α: i = 1 + (n - 1)α. For association: i = 1 + (1/n - 1)α.",
        "trap": "For strong electrolytes (NaCl, BaCl₂), assume α = 1 unless specified otherwise: i(NaCl)=2, i(BaCl₂)=3."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-solutions-5",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Solutions",
    "topic": "Van 't Hoff Factor i",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Raoult’s law, Henry’s law, colligative properties, and van ’t Hoff factor.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Van 't Hoff Factor i.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Raoult’s Law & Relative Lowering of Vapour Pressure",
        "formula": "\\frac{P_A^\\circ - P}{P_A^\\circ} = i X_{\\text{solute}} = i \\frac{n_B}{n_A + n_B} \\approx i \\frac{n_B}{n_A}",
        "variables": "P_A° = Vapour pressure of pure solvent, P = Solution vapour pressure, i = van ’t Hoff factor",
        "examTip": "Relative lowering of vapour pressure is a colligative property depending only on solute particle count.",
        "trap": "For dilute solutions: (P° - P)/P = i(n_B/n_A) connects directly with molality."
      },
      {
        "name": "Elevation in Boiling Point & Depression in Freezing Point",
        "formula": "\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\pi = i C R T",
        "variables": "K_b = Ebullioscopic constant, K_f = Cryoscopic constant, m = Molality, π = Osmotic pressure",
        "examTip": "For dissociation with degree α: i = 1 + (n - 1)α. For association: i = 1 + (1/n - 1)α.",
        "trap": "For strong electrolytes (NaCl, BaCl₂), assume α = 1 unless specified otherwise: i(NaCl)=2, i(BaCl₂)=3."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-electrochemistry-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Electrochemistry",
    "topic": "Galvanic Cells & Cell Potential",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Nernst equation, cell potential, Gibbs free energy, Kohlrausch’s law, and Faraday’s electrolysis.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Galvanic Cells & Cell Potential.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Nernst Equation at 298 K",
        "formula": "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log Q, \\quad E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
        "variables": "n = Number of electrons transferred, Q = Reaction quotient, E° = Standard reduction potentials",
        "examTip": "At equilibrium: E_cell = 0, giving E°_cell = (0.0591 / n) log(K_eq).",
        "trap": "Always use REDUCTION potentials for both cathode and anode: E°_cell = E°_red(cathode) - E°_red(anode)."
      },
      {
        "name": "Cell Potential and Free Energy Relation",
        "formula": "\\Delta G = -n F E_{\\text{cell}}, \\quad \\Delta G^\\circ = -n F E^\\circ_{\\text{cell}}",
        "variables": "F = 96500 C/mol (Faraday constant), ΔG = Maximum electrical work obtainable",
        "examTip": "For spontaneous cell reaction: E_cell > 0 and ΔG < 0.",
        "trap": "E_cell is an intensive property (does not multiply with reaction coefficients); ΔG is extensive."
      },
      {
        "name": "Kohlrausch’s Law & Faraday’s Electrolysis Law",
        "formula": "\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ, \\quad w = Z I t = \\frac{E I t}{96500}",
        "variables": "Λ_m° = Limiting molar conductivity, w = Mass deposited, E = Equivalent weight (M/n-factor)",
        "examTip": "Degree of dissociation of weak electrolyte: α = Λ_m / Λ_m°.",
        "trap": "1 Faraday (96500 C) deposits exactly 1 gram equivalent of any substance."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-electrochemistry-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Electrochemistry",
    "topic": "Nernst Equation Applications",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Nernst equation, cell potential, Gibbs free energy, Kohlrausch’s law, and Faraday’s electrolysis.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Nernst Equation Applications.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Nernst Equation at 298 K",
        "formula": "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log Q, \\quad E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
        "variables": "n = Number of electrons transferred, Q = Reaction quotient, E° = Standard reduction potentials",
        "examTip": "At equilibrium: E_cell = 0, giving E°_cell = (0.0591 / n) log(K_eq).",
        "trap": "Always use REDUCTION potentials for both cathode and anode: E°_cell = E°_red(cathode) - E°_red(anode)."
      },
      {
        "name": "Cell Potential and Free Energy Relation",
        "formula": "\\Delta G = -n F E_{\\text{cell}}, \\quad \\Delta G^\\circ = -n F E^\\circ_{\\text{cell}}",
        "variables": "F = 96500 C/mol (Faraday constant), ΔG = Maximum electrical work obtainable",
        "examTip": "For spontaneous cell reaction: E_cell > 0 and ΔG < 0.",
        "trap": "E_cell is an intensive property (does not multiply with reaction coefficients); ΔG is extensive."
      },
      {
        "name": "Kohlrausch’s Law & Faraday’s Electrolysis Law",
        "formula": "\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ, \\quad w = Z I t = \\frac{E I t}{96500}",
        "variables": "Λ_m° = Limiting molar conductivity, w = Mass deposited, E = Equivalent weight (M/n-factor)",
        "examTip": "Degree of dissociation of weak electrolyte: α = Λ_m / Λ_m°.",
        "trap": "1 Faraday (96500 C) deposits exactly 1 gram equivalent of any substance."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-electrochemistry-3",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Electrochemistry",
    "topic": "Kohlrausch's Law of Independent Migration",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Nernst equation, cell potential, Gibbs free energy, Kohlrausch’s law, and Faraday’s electrolysis.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Kohlrausch's Law of Independent Migration.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Nernst Equation at 298 K",
        "formula": "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log Q, \\quad E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
        "variables": "n = Number of electrons transferred, Q = Reaction quotient, E° = Standard reduction potentials",
        "examTip": "At equilibrium: E_cell = 0, giving E°_cell = (0.0591 / n) log(K_eq).",
        "trap": "Always use REDUCTION potentials for both cathode and anode: E°_cell = E°_red(cathode) - E°_red(anode)."
      },
      {
        "name": "Cell Potential and Free Energy Relation",
        "formula": "\\Delta G = -n F E_{\\text{cell}}, \\quad \\Delta G^\\circ = -n F E^\\circ_{\\text{cell}}",
        "variables": "F = 96500 C/mol (Faraday constant), ΔG = Maximum electrical work obtainable",
        "examTip": "For spontaneous cell reaction: E_cell > 0 and ΔG < 0.",
        "trap": "E_cell is an intensive property (does not multiply with reaction coefficients); ΔG is extensive."
      },
      {
        "name": "Kohlrausch’s Law & Faraday’s Electrolysis Law",
        "formula": "\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ, \\quad w = Z I t = \\frac{E I t}{96500}",
        "variables": "Λ_m° = Limiting molar conductivity, w = Mass deposited, E = Equivalent weight (M/n-factor)",
        "examTip": "Degree of dissociation of weak electrolyte: α = Λ_m / Λ_m°.",
        "trap": "1 Faraday (96500 C) deposits exactly 1 gram equivalent of any substance."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-electrochemistry-4",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Electrochemistry",
    "topic": "Faraday's Laws of Electrolysis",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Nernst equation, cell potential, Gibbs free energy, Kohlrausch’s law, and Faraday’s electrolysis.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Faraday's Laws of Electrolysis.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Nernst Equation at 298 K",
        "formula": "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log Q, \\quad E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
        "variables": "n = Number of electrons transferred, Q = Reaction quotient, E° = Standard reduction potentials",
        "examTip": "At equilibrium: E_cell = 0, giving E°_cell = (0.0591 / n) log(K_eq).",
        "trap": "Always use REDUCTION potentials for both cathode and anode: E°_cell = E°_red(cathode) - E°_red(anode)."
      },
      {
        "name": "Cell Potential and Free Energy Relation",
        "formula": "\\Delta G = -n F E_{\\text{cell}}, \\quad \\Delta G^\\circ = -n F E^\\circ_{\\text{cell}}",
        "variables": "F = 96500 C/mol (Faraday constant), ΔG = Maximum electrical work obtainable",
        "examTip": "For spontaneous cell reaction: E_cell > 0 and ΔG < 0.",
        "trap": "E_cell is an intensive property (does not multiply with reaction coefficients); ΔG is extensive."
      },
      {
        "name": "Kohlrausch’s Law & Faraday’s Electrolysis Law",
        "formula": "\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ, \\quad w = Z I t = \\frac{E I t}{96500}",
        "variables": "Λ_m° = Limiting molar conductivity, w = Mass deposited, E = Equivalent weight (M/n-factor)",
        "examTip": "Degree of dissociation of weak electrolyte: α = Λ_m / Λ_m°.",
        "trap": "1 Faraday (96500 C) deposits exactly 1 gram equivalent of any substance."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-electrochemistry-5",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Electrochemistry",
    "topic": "Batteries, Fuel Cells & Corrosion",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Nernst equation, cell potential, Gibbs free energy, Kohlrausch’s law, and Faraday’s electrolysis.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Batteries, Fuel Cells & Corrosion.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Nernst Equation at 298 K",
        "formula": "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log Q, \\quad E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
        "variables": "n = Number of electrons transferred, Q = Reaction quotient, E° = Standard reduction potentials",
        "examTip": "At equilibrium: E_cell = 0, giving E°_cell = (0.0591 / n) log(K_eq).",
        "trap": "Always use REDUCTION potentials for both cathode and anode: E°_cell = E°_red(cathode) - E°_red(anode)."
      },
      {
        "name": "Cell Potential and Free Energy Relation",
        "formula": "\\Delta G = -n F E_{\\text{cell}}, \\quad \\Delta G^\\circ = -n F E^\\circ_{\\text{cell}}",
        "variables": "F = 96500 C/mol (Faraday constant), ΔG = Maximum electrical work obtainable",
        "examTip": "For spontaneous cell reaction: E_cell > 0 and ΔG < 0.",
        "trap": "E_cell is an intensive property (does not multiply with reaction coefficients); ΔG is extensive."
      },
      {
        "name": "Kohlrausch’s Law & Faraday’s Electrolysis Law",
        "formula": "\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ, \\quad w = Z I t = \\frac{E I t}{96500}",
        "variables": "Λ_m° = Limiting molar conductivity, w = Mass deposited, E = Equivalent weight (M/n-factor)",
        "examTip": "Degree of dissociation of weak electrolyte: α = Λ_m / Λ_m°.",
        "trap": "1 Faraday (96500 C) deposits exactly 1 gram equivalent of any substance."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-chemical-kinetics-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Chemical Kinetics",
    "topic": "Rate of Reaction & Rate Law",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Rate law, order of reaction, integrated rate laws, half-life, and Arrhenius activation energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Rate of Reaction & Rate Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Integrated Rate Laws: Zero & First Order",
        "formula": "\\text{Zero: } [A]_0 - [A]_t = k t, \\quad t_{1/2} = \\frac{[A]_0}{2k}; \\quad \\text{First: } k = \\frac{2.303}{t}\\log\\frac{[A]_0}{[A]_t}, \\quad t_{1/2} = \\frac{0.693}{k}",
        "variables": "[A]₀ = Initial concentration, [A]_t = Concentration at time t, k = Rate constant",
        "examTip": "First order half-life is completely INDEPENDENT of initial concentration: t_1/2 = 0.693 / k.",
        "trap": "Units of rate constant k: (mol/L)^(1-n) · s⁻¹, where n is the overall reaction order."
      },
      {
        "name": "Arrhenius Equation & Activation Energy",
        "formula": "k = A e^{-E_a / RT} \\implies \\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
        "variables": "E_a = Activation energy, A = Pre-exponential frequency factor, R = 8.314 J/(mol·K)",
        "examTip": "Slope of log(k) vs 1/T graph is -E_a / (2.303 R); intercept is log(A).",
        "trap": "Catalyst increases reaction rate by lowering E_a; it DOES NOT alter ΔH or equilibrium constant K_eq."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-chemical-kinetics-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Chemical Kinetics",
    "topic": "Order & Molecularity",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Rate law, order of reaction, integrated rate laws, half-life, and Arrhenius activation energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Order & Molecularity.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Integrated Rate Laws: Zero & First Order",
        "formula": "\\text{Zero: } [A]_0 - [A]_t = k t, \\quad t_{1/2} = \\frac{[A]_0}{2k}; \\quad \\text{First: } k = \\frac{2.303}{t}\\log\\frac{[A]_0}{[A]_t}, \\quad t_{1/2} = \\frac{0.693}{k}",
        "variables": "[A]₀ = Initial concentration, [A]_t = Concentration at time t, k = Rate constant",
        "examTip": "First order half-life is completely INDEPENDENT of initial concentration: t_1/2 = 0.693 / k.",
        "trap": "Units of rate constant k: (mol/L)^(1-n) · s⁻¹, where n is the overall reaction order."
      },
      {
        "name": "Arrhenius Equation & Activation Energy",
        "formula": "k = A e^{-E_a / RT} \\implies \\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
        "variables": "E_a = Activation energy, A = Pre-exponential frequency factor, R = 8.314 J/(mol·K)",
        "examTip": "Slope of log(k) vs 1/T graph is -E_a / (2.303 R); intercept is log(A).",
        "trap": "Catalyst increases reaction rate by lowering E_a; it DOES NOT alter ΔH or equilibrium constant K_eq."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-chemical-kinetics-3",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Chemical Kinetics",
    "topic": "Integrated Rate Laws (Zero & First Order)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Rate law, order of reaction, integrated rate laws, half-life, and Arrhenius activation energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Integrated Rate Laws (Zero & First Order).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Integrated Rate Laws: Zero & First Order",
        "formula": "\\text{Zero: } [A]_0 - [A]_t = k t, \\quad t_{1/2} = \\frac{[A]_0}{2k}; \\quad \\text{First: } k = \\frac{2.303}{t}\\log\\frac{[A]_0}{[A]_t}, \\quad t_{1/2} = \\frac{0.693}{k}",
        "variables": "[A]₀ = Initial concentration, [A]_t = Concentration at time t, k = Rate constant",
        "examTip": "First order half-life is completely INDEPENDENT of initial concentration: t_1/2 = 0.693 / k.",
        "trap": "Units of rate constant k: (mol/L)^(1-n) · s⁻¹, where n is the overall reaction order."
      },
      {
        "name": "Arrhenius Equation & Activation Energy",
        "formula": "k = A e^{-E_a / RT} \\implies \\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
        "variables": "E_a = Activation energy, A = Pre-exponential frequency factor, R = 8.314 J/(mol·K)",
        "examTip": "Slope of log(k) vs 1/T graph is -E_a / (2.303 R); intercept is log(A).",
        "trap": "Catalyst increases reaction rate by lowering E_a; it DOES NOT alter ΔH or equilibrium constant K_eq."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-chemical-kinetics-4",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Chemical Kinetics",
    "topic": "Half-Life Period",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Rate law, order of reaction, integrated rate laws, half-life, and Arrhenius activation energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Half-Life Period.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Integrated Rate Laws: Zero & First Order",
        "formula": "\\text{Zero: } [A]_0 - [A]_t = k t, \\quad t_{1/2} = \\frac{[A]_0}{2k}; \\quad \\text{First: } k = \\frac{2.303}{t}\\log\\frac{[A]_0}{[A]_t}, \\quad t_{1/2} = \\frac{0.693}{k}",
        "variables": "[A]₀ = Initial concentration, [A]_t = Concentration at time t, k = Rate constant",
        "examTip": "First order half-life is completely INDEPENDENT of initial concentration: t_1/2 = 0.693 / k.",
        "trap": "Units of rate constant k: (mol/L)^(1-n) · s⁻¹, where n is the overall reaction order."
      },
      {
        "name": "Arrhenius Equation & Activation Energy",
        "formula": "k = A e^{-E_a / RT} \\implies \\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
        "variables": "E_a = Activation energy, A = Pre-exponential frequency factor, R = 8.314 J/(mol·K)",
        "examTip": "Slope of log(k) vs 1/T graph is -E_a / (2.303 R); intercept is log(A).",
        "trap": "Catalyst increases reaction rate by lowering E_a; it DOES NOT alter ΔH or equilibrium constant K_eq."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-chemical-kinetics-5",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Chemical Kinetics",
    "topic": "Arrhenius Equation & Activation Energy",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Rate law, order of reaction, integrated rate laws, half-life, and Arrhenius activation energy.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Arrhenius Equation & Activation Energy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Integrated Rate Laws: Zero & First Order",
        "formula": "\\text{Zero: } [A]_0 - [A]_t = k t, \\quad t_{1/2} = \\frac{[A]_0}{2k}; \\quad \\text{First: } k = \\frac{2.303}{t}\\log\\frac{[A]_0}{[A]_t}, \\quad t_{1/2} = \\frac{0.693}{k}",
        "variables": "[A]₀ = Initial concentration, [A]_t = Concentration at time t, k = Rate constant",
        "examTip": "First order half-life is completely INDEPENDENT of initial concentration: t_1/2 = 0.693 / k.",
        "trap": "Units of rate constant k: (mol/L)^(1-n) · s⁻¹, where n is the overall reaction order."
      },
      {
        "name": "Arrhenius Equation & Activation Energy",
        "formula": "k = A e^{-E_a / RT} \\implies \\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
        "variables": "E_a = Activation energy, A = Pre-exponential frequency factor, R = 8.314 J/(mol·K)",
        "examTip": "Slope of log(k) vs 1/T graph is -E_a / (2.303 R); intercept is log(A).",
        "trap": "Catalyst increases reaction rate by lowering E_a; it DOES NOT alter ΔH or equilibrium constant K_eq."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-the-d--and-f-block-elements-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "The d- and f-Block Elements",
    "topic": "Transition Metal Properties",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Transition Metal Properties in The d- and f-Block Elements.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Transition Metal Properties.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Transition Metal Properties Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-the-d--and-f-block-elements-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "The d- and f-Block Elements",
    "topic": "Variable Oxidation States",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Variable Oxidation States in The d- and f-Block Elements.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Variable Oxidation States.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Variable Oxidation States Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-the-d--and-f-block-elements-3",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "The d- and f-Block Elements",
    "topic": "Lanthanoid Contraction",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Lanthanoid Contraction in The d- and f-Block Elements.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Lanthanoid Contraction.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lanthanoid Contraction Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-the-d--and-f-block-elements-4",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "The d- and f-Block Elements",
    "topic": "Magnetic Properties & Colored Ions",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Magnetic Properties & Colored Ions in The d- and f-Block Elements.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Magnetic Properties & Colored Ions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Magnetic Properties & Colored Ions Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-the-d--and-f-block-elements-5",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "The d- and f-Block Elements",
    "topic": "Potassium Dichromate & Permanganate",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Potassium Dichromate & Permanganate in The d- and f-Block Elements.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Potassium Dichromate & Permanganate.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Potassium Dichromate & Permanganate Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-coordination-compounds-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Coordination Compounds",
    "topic": "Werner's Coordination Theory",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Werner's Coordination Theory in Coordination Compounds.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Werner's Coordination Theory.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Werner's Coordination Theory Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-coordination-compounds-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Coordination Compounds",
    "topic": "IUPAC Naming of Complexes",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for IUPAC Naming of Complexes in Coordination Compounds.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for IUPAC Naming of Complexes.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "IUPAC Naming of Complexes Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-coordination-compounds-3",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Coordination Compounds",
    "topic": "Isomerism in Coordination Compounds",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Isomerism in Coordination Compounds in Coordination Compounds.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Isomerism in Coordination Compounds.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Isomerism in Coordination Compounds Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-coordination-compounds-4",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Coordination Compounds",
    "topic": "Valence Bond Theory (VBT)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Valence Bond Theory (VBT) in Coordination Compounds.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Valence Bond Theory (VBT).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Valence Bond Theory (VBT) Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-coordination-compounds-5",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Coordination Compounds",
    "topic": "Crystal Field Theory (CFT)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Crystal Field Theory (CFT) in Coordination Compounds.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Crystal Field Theory (CFT).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Crystal Field Theory (CFT) Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-haloalkanes-and-haloarenes-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "SN1 vs SN2 Mechanisms",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for SN1 vs SN2 Mechanisms in Haloalkanes and Haloarenes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for SN1 vs SN2 Mechanisms.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "SN1 vs SN2 Mechanisms Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-haloalkanes-and-haloarenes-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Stereochemistry & Inversion",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Stereochemistry & Inversion in Haloalkanes and Haloarenes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Stereochemistry & Inversion.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Stereochemistry & Inversion Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-haloalkanes-and-haloarenes-3",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Elimination vs Substitution",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Elimination vs Substitution in Haloalkanes and Haloarenes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Elimination vs Substitution.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Elimination vs Substitution Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-haloalkanes-and-haloarenes-4",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Reactions of Haloarenes",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Reactions of Haloarenes in Haloalkanes and Haloarenes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Reactions of Haloarenes.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Reactions of Haloarenes Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-haloalkanes-and-haloarenes-5",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Haloalkanes and Haloarenes",
    "topic": "Polyhalogen Compounds",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Polyhalogen Compounds in Haloalkanes and Haloarenes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Polyhalogen Compounds.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Polyhalogen Compounds Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-alcohols--phenols-and-ethers-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Classification & Preparation",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Classification & Preparation in Alcohols, Phenols and Ethers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Classification & Preparation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Classification & Preparation Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-alcohols--phenols-and-ethers-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Acidity of Alcohols & Phenols",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Acidity of Alcohols & Phenols in Alcohols, Phenols and Ethers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Acidity of Alcohols & Phenols.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Acidity of Alcohols & Phenols Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-alcohols--phenols-and-ethers-3",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Lucas Test & Oxidation",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Lucas Test & Oxidation in Alcohols, Phenols and Ethers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Lucas Test & Oxidation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lucas Test & Oxidation Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-alcohols--phenols-and-ethers-4",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Reimer-Tiemann & Kolbe Reactions",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Reimer-Tiemann & Kolbe Reactions in Alcohols, Phenols and Ethers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Reimer-Tiemann & Kolbe Reactions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Reimer-Tiemann & Kolbe Reactions Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-alcohols--phenols-and-ethers-5",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Alcohols, Phenols and Ethers",
    "topic": "Williamson Ether Synthesis",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Williamson Ether Synthesis in Alcohols, Phenols and Ethers.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Williamson Ether Synthesis.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Williamson Ether Synthesis Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-aldehydes--ketones-and-carboxylic-acids-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Nucleophilic Addition Reactions",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Nucleophilic Addition Reactions in Aldehydes, Ketones and Carboxylic Acids.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Nucleophilic Addition Reactions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Nucleophilic Addition Reactions Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-aldehydes--ketones-and-carboxylic-acids-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Tollens', Fehling's & Iodoform Tests",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Tollens', Fehling's & Iodoform Tests in Aldehydes, Ketones and Carboxylic Acids.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Tollens', Fehling's & Iodoform Tests.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Tollens', Fehling's & Iodoform Tests Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-aldehydes--ketones-and-carboxylic-acids-3",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Aldol Condensation & Cannizzaro",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Aldol Condensation & Cannizzaro in Aldehydes, Ketones and Carboxylic Acids.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Aldol Condensation & Cannizzaro.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Aldol Condensation & Cannizzaro Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-aldehydes--ketones-and-carboxylic-acids-4",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "Acidity of Carboxylic Acids",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Acidity of Carboxylic Acids in Aldehydes, Ketones and Carboxylic Acids.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Acidity of Carboxylic Acids.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Acidity of Carboxylic Acids Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-aldehydes--ketones-and-carboxylic-acids-5",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "topic": "HVZ Reaction & Decarboxylation",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for HVZ Reaction & Decarboxylation in Aldehydes, Ketones and Carboxylic Acids.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for HVZ Reaction & Decarboxylation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "HVZ Reaction & Decarboxylation Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-amines-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Amines",
    "topic": "Basicity of Amines in Aqueous Phase",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Basicity of Amines in Aqueous Phase in Amines.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Basicity of Amines in Aqueous Phase.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Basicity of Amines in Aqueous Phase Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-amines-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Amines",
    "topic": "Gabriel Phthalimide Synthesis",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Gabriel Phthalimide Synthesis in Amines.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Gabriel Phthalimide Synthesis.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Gabriel Phthalimide Synthesis Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-amines-3",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Amines",
    "topic": "Hoffmann Bromamide Degradation",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Hoffmann Bromamide Degradation in Amines.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Hoffmann Bromamide Degradation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Hoffmann Bromamide Degradation Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-amines-4",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Amines",
    "topic": "Carbylamine & Hinsberg Tests",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Carbylamine & Hinsberg Tests in Amines.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Carbylamine & Hinsberg Tests.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Carbylamine & Hinsberg Tests Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-amines-5",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Amines",
    "topic": "Diazonium Salts & Coupling Reactions",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Diazonium Salts & Coupling Reactions in Amines.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Diazonium Salts & Coupling Reactions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Diazonium Salts & Coupling Reactions Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-biomolecules-1",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Biomolecules",
    "topic": "Monosaccharides Structure (Glucose & Fructose)",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Monosaccharides Structure (Glucose & Fructose) in Biomolecules.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Monosaccharides Structure (Glucose & Fructose).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Monosaccharides Structure (Glucose & Fructose) Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-biomolecules-2",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Biomolecules",
    "topic": "Disaccharides & Polysaccharides",
    "weightage": "High",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Disaccharides & Polysaccharides in Biomolecules.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Disaccharides & Polysaccharides.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Disaccharides & Polysaccharides Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-biomolecules-3",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Biomolecules",
    "topic": "Amino Acids & Peptide Bonds",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Amino Acids & Peptide Bonds in Biomolecules.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Amino Acids & Peptide Bonds.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Amino Acids & Peptide Bonds Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-biomolecules-4",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Biomolecules",
    "topic": "Structure of Proteins (Primary to Quaternary)",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Structure of Proteins (Primary to Quaternary) in Biomolecules.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Structure of Proteins (Primary to Quaternary).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Structure of Proteins (Primary to Quaternary) Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "che-12-biomolecules-5",
    "subject": "Chemistry",
    "classLevel": "12",
    "chapter": "Biomolecules",
    "topic": "Nucleic Acids (DNA & RNA) & Vitamins",
    "weightage": "Medium",
    "examTarget": "Both",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Nucleic Acids (DNA & RNA) & Vitamins in Biomolecules.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Nucleic Acids (DNA & RNA) & Vitamins.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Nucleic Acids (DNA & RNA) & Vitamins Chemical Principle",
        "formula": "K_{\\text{eq}} = \\frac{[\\text{Products}]^{\\nu_p}}{[\\text{Reactants}]^{\\nu_r}}",
        "variables": "Equilibrium activities and stoichiometric exponents",
        "examTip": "Check oxidation states and formal charges before balancing.",
        "trap": "Solvent water concentration is assumed constant and absorbed into K_a or K_b."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-sets-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Sets",
    "topic": "Subsets & Power Sets",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Subsets & Power Sets in Sets.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Subsets & Power Sets.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Subsets & Power Sets Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-sets-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Sets",
    "topic": "Venn Diagrams",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Venn Diagrams in Sets.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Venn Diagrams.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Venn Diagrams Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-sets-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Sets",
    "topic": "Set Operations (Union, Intersection)",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Set Operations (Union, Intersection) in Sets.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Set Operations (Union, Intersection).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Set Operations (Union, Intersection) Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-sets-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Sets",
    "topic": "Laws of Algebra of Sets",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Laws of Algebra of Sets in Sets.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Laws of Algebra of Sets.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Laws of Algebra of Sets Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-sets-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Sets",
    "topic": "De Morgan's Laws",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for De Morgan's Laws in Sets.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for De Morgan's Laws.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "De Morgan's Laws Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-relations-and-functions-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Relations and Functions",
    "topic": "Cartesian Product of Sets",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Cartesian Product of Sets in Relations and Functions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Cartesian Product of Sets.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cartesian Product of Sets Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-relations-and-functions-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Relations and Functions",
    "topic": "Relations Domain & Range",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Relations Domain & Range in Relations and Functions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Relations Domain & Range.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Relations Domain & Range Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-relations-and-functions-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Relations and Functions",
    "topic": "Functions & Graphs",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Functions & Graphs in Relations and Functions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Functions & Graphs.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Functions & Graphs Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-relations-and-functions-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Relations and Functions",
    "topic": "Algebra of Real Functions",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Algebra of Real Functions in Relations and Functions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Algebra of Real Functions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Algebra of Real Functions Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-relations-and-functions-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Relations and Functions",
    "topic": "Special Functions (Modulus, Signum, Greatest Integer)",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Special Functions (Modulus, Signum, Greatest Integer) in Relations and Functions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Special Functions (Modulus, Signum, Greatest Integer).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Special Functions (Modulus, Signum, Greatest Integer) Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-trigonometric-functions-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Trigonometric Functions",
    "topic": "Radian Measure & Angles",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Trigonometric identities, compound angles, transformation formulas, and general solutions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Radian Measure & Angles.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Compound Angle & Multiple Angle Identities",
        "formula": "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A",
        "variables": "A, B = Angles in radians or degrees",
        "examTip": "tan(2A) = 2tanA / (1 - tan²A). sin(2A) = 2tanA / (1 + tan²A).",
        "trap": "Check quadrant signs when finding half-angle values: sin(A/2) = ±√((1 - cosA)/2)."
      },
      {
        "name": "Sum to Product Transformations",
        "formula": "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}",
        "variables": "C, D = Arbitrary angular arguments",
        "examTip": "cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2) = 2 sin((C+D)/2) sin((D-C)/2).",
        "trap": "Remember the negative sign in cos C - cos D."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-trigonometric-functions-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Trigonometric Functions",
    "topic": "Trigonometric Functions Signs",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Trigonometric identities, compound angles, transformation formulas, and general solutions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Trigonometric Functions Signs.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Compound Angle & Multiple Angle Identities",
        "formula": "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A",
        "variables": "A, B = Angles in radians or degrees",
        "examTip": "tan(2A) = 2tanA / (1 - tan²A). sin(2A) = 2tanA / (1 + tan²A).",
        "trap": "Check quadrant signs when finding half-angle values: sin(A/2) = ±√((1 - cosA)/2)."
      },
      {
        "name": "Sum to Product Transformations",
        "formula": "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}",
        "variables": "C, D = Arbitrary angular arguments",
        "examTip": "cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2) = 2 sin((C+D)/2) sin((D-C)/2).",
        "trap": "Remember the negative sign in cos C - cos D."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-trigonometric-functions-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Trigonometric Functions",
    "topic": "Compound Angle Formulas",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Trigonometric identities, compound angles, transformation formulas, and general solutions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Compound Angle Formulas.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Compound Angle & Multiple Angle Identities",
        "formula": "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A",
        "variables": "A, B = Angles in radians or degrees",
        "examTip": "tan(2A) = 2tanA / (1 - tan²A). sin(2A) = 2tanA / (1 + tan²A).",
        "trap": "Check quadrant signs when finding half-angle values: sin(A/2) = ±√((1 - cosA)/2)."
      },
      {
        "name": "Sum to Product Transformations",
        "formula": "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}",
        "variables": "C, D = Arbitrary angular arguments",
        "examTip": "cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2) = 2 sin((C+D)/2) sin((D-C)/2).",
        "trap": "Remember the negative sign in cos C - cos D."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-trigonometric-functions-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Trigonometric Functions",
    "topic": "Multiple & Submultiple Angles",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Trigonometric identities, compound angles, transformation formulas, and general solutions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Multiple & Submultiple Angles.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Compound Angle & Multiple Angle Identities",
        "formula": "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A",
        "variables": "A, B = Angles in radians or degrees",
        "examTip": "tan(2A) = 2tanA / (1 - tan²A). sin(2A) = 2tanA / (1 + tan²A).",
        "trap": "Check quadrant signs when finding half-angle values: sin(A/2) = ±√((1 - cosA)/2)."
      },
      {
        "name": "Sum to Product Transformations",
        "formula": "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}",
        "variables": "C, D = Arbitrary angular arguments",
        "examTip": "cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2) = 2 sin((C+D)/2) sin((D-C)/2).",
        "trap": "Remember the negative sign in cos C - cos D."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-trigonometric-functions-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Trigonometric Functions",
    "topic": "General Solutions of Trigonometric Equations",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Trigonometric identities, compound angles, transformation formulas, and general solutions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for General Solutions of Trigonometric Equations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Compound Angle & Multiple Angle Identities",
        "formula": "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A",
        "variables": "A, B = Angles in radians or degrees",
        "examTip": "tan(2A) = 2tanA / (1 - tan²A). sin(2A) = 2tanA / (1 + tan²A).",
        "trap": "Check quadrant signs when finding half-angle values: sin(A/2) = ±√((1 - cosA)/2)."
      },
      {
        "name": "Sum to Product Transformations",
        "formula": "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}",
        "variables": "C, D = Arbitrary angular arguments",
        "examTip": "cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2) = 2 sin((C+D)/2) sin((D-C)/2).",
        "trap": "Remember the negative sign in cos C - cos D."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-complex-numbers-and-quadratic-equations-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Algebra of Complex Numbers",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Quadratic roots, nature of roots, complex numbers algebra, and De Moivre’s theorem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Algebra of Complex Numbers.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Quadratic Equation Roots & Vieta’s Relations",
        "formula": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}, \\quad D = b^2 - 4ac",
        "variables": "D > 0 (real & distinct), D = 0 (real & equal), D < 0 (complex conjugate roots)",
        "examTip": "Condition for both roots to be positive: D ≥ 0, -b/a > 0, c/a > 0.",
        "trap": "If a, b, c are rational and D is not a perfect square, roots occur in irrational conjugate pairs (p ± √q)."
      },
      {
        "name": "Complex Numbers: Modulus & Argument",
        "formula": "z = x + iy = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}, \\quad |z| = \\sqrt{x^2 + y^2}, \\quad \\theta = \\text{arg}(z) = \\tan^{-1}\\left(\\frac{y}{x}\\right)",
        "variables": "r = Modulus, θ = Principal argument (-π < θ ≤ π)",
        "examTip": "Triangle inequality: ||z₁| - |z₂|| ≤ |z₁ ± z₂| ≤ |z₁| + |z₂|.",
        "trap": "De Moivre’s theorem: (cosθ + i sinθ)^n = cos(nθ) + i sin(nθ)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-complex-numbers-and-quadratic-equations-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Modulus & Conjugate",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Quadratic roots, nature of roots, complex numbers algebra, and De Moivre’s theorem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Modulus & Conjugate.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Quadratic Equation Roots & Vieta’s Relations",
        "formula": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}, \\quad D = b^2 - 4ac",
        "variables": "D > 0 (real & distinct), D = 0 (real & equal), D < 0 (complex conjugate roots)",
        "examTip": "Condition for both roots to be positive: D ≥ 0, -b/a > 0, c/a > 0.",
        "trap": "If a, b, c are rational and D is not a perfect square, roots occur in irrational conjugate pairs (p ± √q)."
      },
      {
        "name": "Complex Numbers: Modulus & Argument",
        "formula": "z = x + iy = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}, \\quad |z| = \\sqrt{x^2 + y^2}, \\quad \\theta = \\text{arg}(z) = \\tan^{-1}\\left(\\frac{y}{x}\\right)",
        "variables": "r = Modulus, θ = Principal argument (-π < θ ≤ π)",
        "examTip": "Triangle inequality: ||z₁| - |z₂|| ≤ |z₁ ± z₂| ≤ |z₁| + |z₂|.",
        "trap": "De Moivre’s theorem: (cosθ + i sinθ)^n = cos(nθ) + i sin(nθ)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-complex-numbers-and-quadratic-equations-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Polar & Euler Representation",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Quadratic roots, nature of roots, complex numbers algebra, and De Moivre’s theorem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Polar & Euler Representation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Quadratic Equation Roots & Vieta’s Relations",
        "formula": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}, \\quad D = b^2 - 4ac",
        "variables": "D > 0 (real & distinct), D = 0 (real & equal), D < 0 (complex conjugate roots)",
        "examTip": "Condition for both roots to be positive: D ≥ 0, -b/a > 0, c/a > 0.",
        "trap": "If a, b, c are rational and D is not a perfect square, roots occur in irrational conjugate pairs (p ± √q)."
      },
      {
        "name": "Complex Numbers: Modulus & Argument",
        "formula": "z = x + iy = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}, \\quad |z| = \\sqrt{x^2 + y^2}, \\quad \\theta = \\text{arg}(z) = \\tan^{-1}\\left(\\frac{y}{x}\\right)",
        "variables": "r = Modulus, θ = Principal argument (-π < θ ≤ π)",
        "examTip": "Triangle inequality: ||z₁| - |z₂|| ≤ |z₁ ± z₂| ≤ |z₁| + |z₂|.",
        "trap": "De Moivre’s theorem: (cosθ + i sinθ)^n = cos(nθ) + i sin(nθ)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-complex-numbers-and-quadratic-equations-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Square Root of Complex Number",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Quadratic roots, nature of roots, complex numbers algebra, and De Moivre’s theorem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Square Root of Complex Number.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Quadratic Equation Roots & Vieta’s Relations",
        "formula": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}, \\quad D = b^2 - 4ac",
        "variables": "D > 0 (real & distinct), D = 0 (real & equal), D < 0 (complex conjugate roots)",
        "examTip": "Condition for both roots to be positive: D ≥ 0, -b/a > 0, c/a > 0.",
        "trap": "If a, b, c are rational and D is not a perfect square, roots occur in irrational conjugate pairs (p ± √q)."
      },
      {
        "name": "Complex Numbers: Modulus & Argument",
        "formula": "z = x + iy = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}, \\quad |z| = \\sqrt{x^2 + y^2}, \\quad \\theta = \\text{arg}(z) = \\tan^{-1}\\left(\\frac{y}{x}\\right)",
        "variables": "r = Modulus, θ = Principal argument (-π < θ ≤ π)",
        "examTip": "Triangle inequality: ||z₁| - |z₂|| ≤ |z₁ ± z₂| ≤ |z₁| + |z₂|.",
        "trap": "De Moivre’s theorem: (cosθ + i sinθ)^n = cos(nθ) + i sin(nθ)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-complex-numbers-and-quadratic-equations-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Complex Numbers and Quadratic Equations",
    "topic": "Quadratic Equations with Complex Roots",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Quadratic roots, nature of roots, complex numbers algebra, and De Moivre’s theorem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Quadratic Equations with Complex Roots.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Quadratic Equation Roots & Vieta’s Relations",
        "formula": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}, \\quad D = b^2 - 4ac",
        "variables": "D > 0 (real & distinct), D = 0 (real & equal), D < 0 (complex conjugate roots)",
        "examTip": "Condition for both roots to be positive: D ≥ 0, -b/a > 0, c/a > 0.",
        "trap": "If a, b, c are rational and D is not a perfect square, roots occur in irrational conjugate pairs (p ± √q)."
      },
      {
        "name": "Complex Numbers: Modulus & Argument",
        "formula": "z = x + iy = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}, \\quad |z| = \\sqrt{x^2 + y^2}, \\quad \\theta = \\text{arg}(z) = \\tan^{-1}\\left(\\frac{y}{x}\\right)",
        "variables": "r = Modulus, θ = Principal argument (-π < θ ≤ π)",
        "examTip": "Triangle inequality: ||z₁| - |z₂|| ≤ |z₁ ± z₂| ≤ |z₁| + |z₂|.",
        "trap": "De Moivre’s theorem: (cosθ + i sinθ)^n = cos(nθ) + i sin(nθ)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-linear-inequalities-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Linear Inequalities",
    "topic": "Linear Inequalities in One Variable",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Linear Inequalities in One Variable in Linear Inequalities.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Linear Inequalities in One Variable.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Linear Inequalities in One Variable Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-linear-inequalities-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Linear Inequalities",
    "topic": "Graphical Solution in Two Variables",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Graphical Solution in Two Variables in Linear Inequalities.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Graphical Solution in Two Variables.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Graphical Solution in Two Variables Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-linear-inequalities-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Linear Inequalities",
    "topic": "System of Linear Inequalities",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for System of Linear Inequalities in Linear Inequalities.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for System of Linear Inequalities.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "System of Linear Inequalities Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-linear-inequalities-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Linear Inequalities",
    "topic": "Modulus Inequalities",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Modulus Inequalities in Linear Inequalities.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Modulus Inequalities.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Modulus Inequalities Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-linear-inequalities-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Linear Inequalities",
    "topic": "Word Problems on Inequalities",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Word Problems on Inequalities in Linear Inequalities.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Word Problems on Inequalities.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Word Problems on Inequalities Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-permutations-and-combinations-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Permutations and Combinations",
    "topic": "Fundamental Principle of Counting",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Fundamental Principle of Counting in Permutations and Combinations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Fundamental Principle of Counting.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Fundamental Principle of Counting Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-permutations-and-combinations-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations Formula nPr",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Permutations Formula nPr in Permutations and Combinations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Permutations Formula nPr.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Permutations Formula nPr Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-permutations-and-combinations-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Permutations and Combinations",
    "topic": "Combinations Formula nCr",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Combinations Formula nCr in Permutations and Combinations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Combinations Formula nCr.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Combinations Formula nCr Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-permutations-and-combinations-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Permutations and Combinations",
    "topic": "Circular Permutations",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Circular Permutations in Permutations and Combinations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Circular Permutations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Circular Permutations Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-permutations-and-combinations-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations with Repetition",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Permutations with Repetition in Permutations and Combinations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Permutations with Repetition.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Permutations with Repetition Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-binomial-theorem-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Binomial Theorem",
    "topic": "Binomial Expansion for Positive Index",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Binomial Expansion for Positive Index in Binomial Theorem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Binomial Expansion for Positive Index.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Binomial Expansion for Positive Index Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-binomial-theorem-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Binomial Theorem",
    "topic": "General Term Tr+1",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for General Term Tr+1 in Binomial Theorem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for General Term Tr+1.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "General Term Tr+1 Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-binomial-theorem-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Binomial Theorem",
    "topic": "Middle Term Calculation",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Middle Term Calculation in Binomial Theorem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Middle Term Calculation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Middle Term Calculation Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-binomial-theorem-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Binomial Theorem",
    "topic": "Properties of Binomial Coefficients",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Properties of Binomial Coefficients in Binomial Theorem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Properties of Binomial Coefficients.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Properties of Binomial Coefficients Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-binomial-theorem-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Binomial Theorem",
    "topic": "Greatest Term in Binomial Expansion",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Greatest Term in Binomial Expansion in Binomial Theorem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Greatest Term in Binomial Expansion.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Greatest Term in Binomial Expansion Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-sequences-and-series-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Sequences and Series",
    "topic": "Arithmetic Progression (AP)",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Arithmetic Progression (AP) in Sequences and Series.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Arithmetic Progression (AP).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Arithmetic Progression (AP) Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-sequences-and-series-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Sequences and Series",
    "topic": "Geometric Progression (GP)",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Geometric Progression (GP) in Sequences and Series.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Geometric Progression (GP).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Geometric Progression (GP) Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-sequences-and-series-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Sequences and Series",
    "topic": "Infinite GP Sum",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Infinite GP Sum in Sequences and Series.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Infinite GP Sum.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Infinite GP Sum Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-sequences-and-series-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Sequences and Series",
    "topic": "Arithmetic-Geometric Progression (AGP)",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Arithmetic-Geometric Progression (AGP) in Sequences and Series.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Arithmetic-Geometric Progression (AGP).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Arithmetic-Geometric Progression (AGP) Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-sequences-and-series-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Sequences and Series",
    "topic": "Sum of Special Series (Σn, Σn², Σn³)",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Sum of Special Series (Σn, Σn², Σn³) in Sequences and Series.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Sum of Special Series (Σn, Σn², Σn³).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Sum of Special Series (Σn, Σn², Σn³) Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-straight-lines-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Straight Lines",
    "topic": "Slope of a Line & Angle between Lines",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Slope of a Line & Angle between Lines.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Distance from Point to Line & Angle Between Lines",
        "formula": "d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
        "variables": "(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes",
        "examTip": "Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.",
        "trap": "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²)."
      },
      {
        "name": "Standard Conic Section Equations",
        "formula": "\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)",
        "variables": "e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)",
        "examTip": "Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.",
        "trap": "Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-straight-lines-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Straight Lines",
    "topic": "Forms of Line Equations",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Forms of Line Equations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Distance from Point to Line & Angle Between Lines",
        "formula": "d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
        "variables": "(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes",
        "examTip": "Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.",
        "trap": "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²)."
      },
      {
        "name": "Standard Conic Section Equations",
        "formula": "\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)",
        "variables": "e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)",
        "examTip": "Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.",
        "trap": "Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-straight-lines-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Straight Lines",
    "topic": "Perpendicular Distance Formula",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Perpendicular Distance Formula.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Distance from Point to Line & Angle Between Lines",
        "formula": "d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
        "variables": "(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes",
        "examTip": "Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.",
        "trap": "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²)."
      },
      {
        "name": "Standard Conic Section Equations",
        "formula": "\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)",
        "variables": "e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)",
        "examTip": "Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.",
        "trap": "Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-straight-lines-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Straight Lines",
    "topic": "Distance between Parallel Lines",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Distance between Parallel Lines.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Distance from Point to Line & Angle Between Lines",
        "formula": "d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
        "variables": "(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes",
        "examTip": "Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.",
        "trap": "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²)."
      },
      {
        "name": "Standard Conic Section Equations",
        "formula": "\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)",
        "variables": "e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)",
        "examTip": "Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.",
        "trap": "Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-straight-lines-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Straight Lines",
    "topic": "Family of Lines",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Family of Lines.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Distance from Point to Line & Angle Between Lines",
        "formula": "d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
        "variables": "(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes",
        "examTip": "Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.",
        "trap": "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²)."
      },
      {
        "name": "Standard Conic Section Equations",
        "formula": "\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)",
        "variables": "e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)",
        "examTip": "Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.",
        "trap": "Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-conic-sections-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Conic Sections",
    "topic": "Circle Standard Equation",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Circle Standard Equation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Distance from Point to Line & Angle Between Lines",
        "formula": "d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
        "variables": "(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes",
        "examTip": "Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.",
        "trap": "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²)."
      },
      {
        "name": "Standard Conic Section Equations",
        "formula": "\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)",
        "variables": "e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)",
        "examTip": "Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.",
        "trap": "Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-conic-sections-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Conic Sections",
    "topic": "Parabola (Focus, Directrix, Latus Rectum)",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Parabola (Focus, Directrix, Latus Rectum).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Distance from Point to Line & Angle Between Lines",
        "formula": "d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
        "variables": "(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes",
        "examTip": "Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.",
        "trap": "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²)."
      },
      {
        "name": "Standard Conic Section Equations",
        "formula": "\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)",
        "variables": "e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)",
        "examTip": "Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.",
        "trap": "Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-conic-sections-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Conic Sections",
    "topic": "Ellipse (Eccentricity, Foci)",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ellipse (Eccentricity, Foci).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Distance from Point to Line & Angle Between Lines",
        "formula": "d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
        "variables": "(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes",
        "examTip": "Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.",
        "trap": "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²)."
      },
      {
        "name": "Standard Conic Section Equations",
        "formula": "\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)",
        "variables": "e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)",
        "examTip": "Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.",
        "trap": "Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-conic-sections-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Conic Sections",
    "topic": "Hyperbola (Eccentricity, Asymptotes)",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Hyperbola (Eccentricity, Asymptotes).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Distance from Point to Line & Angle Between Lines",
        "formula": "d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
        "variables": "(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes",
        "examTip": "Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.",
        "trap": "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²)."
      },
      {
        "name": "Standard Conic Section Equations",
        "formula": "\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)",
        "variables": "e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)",
        "examTip": "Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.",
        "trap": "Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-conic-sections-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Conic Sections",
    "topic": "Conic Tangents & Normals",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Cartesian geometry, distance, straight lines, circles, parabola, ellipse, and hyperbola.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Conic Tangents & Normals.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Distance from Point to Line & Angle Between Lines",
        "formula": "d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
        "variables": "(x₁, y₁) = Point coordinates, ax + by + c = 0 = Line equation, m₁, m₂ = Slopes",
        "examTip": "Two lines are perpendicular iff m₁ · m₂ = -1; parallel iff m₁ = m₂.",
        "trap": "Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0 is d = |c₁ - c₂| / √(a² + b²)."
      },
      {
        "name": "Standard Conic Section Equations",
        "formula": "\\text{Circle: } x^2 + y^2 = r^2, \\quad \\text{Parabola: } y^2 = 4ax, \\quad \\text{Ellipse: } \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (e < 1), \\quad \\text{Hyperbola: } \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (e > 1)",
        "variables": "e = Eccentricity: Ellipse b² = a²(1 - e²), Hyperbola b² = a²(e² - 1)",
        "examTip": "Latus rectum length: Parabola = 4a, Ellipse = 2b²/a, Hyperbola = 2b²/a.",
        "trap": "Tangent to y² = 4ax with slope m: y = mx + a/m (condition of tangency c = a/m)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-introduction-to-three-dimensional-geometry-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Coordinate Axes & Planes in 3D",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Coordinate Axes & Planes in 3D.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-introduction-to-three-dimensional-geometry-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Distance between Two Points in 3D",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Distance between Two Points in 3D.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-introduction-to-three-dimensional-geometry-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Section Formula in 3D Space",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Section Formula in 3D Space.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-introduction-to-three-dimensional-geometry-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Centroid of a Triangle in 3D",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Centroid of a Triangle in 3D.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-introduction-to-three-dimensional-geometry-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Introduction to Three Dimensional Geometry",
    "topic": "Direction Cosines Overview",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Direction Cosines Overview.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-limits-and-derivatives-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Limits and Derivatives",
    "topic": "Intuitive Idea of Limits",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Intuitive Idea of Limits.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-limits-and-derivatives-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Limits and Derivatives",
    "topic": "Standard Trigonometric Limits",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Standard Trigonometric Limits.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-limits-and-derivatives-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Limits and Derivatives",
    "topic": "L'Hôpital's Rule for Indeterminate Forms",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for L'Hôpital's Rule for Indeterminate Forms.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-limits-and-derivatives-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Limits and Derivatives",
    "topic": "Derivative as Rate of Change",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Derivative as Rate of Change.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-limits-and-derivatives-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Limits and Derivatives",
    "topic": "Product & Quotient Rules of Differentiation",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Product & Quotient Rules of Differentiation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-statistics-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Statistics",
    "topic": "Measures of Dispersion Overview",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Measures of Dispersion Overview in Statistics.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Measures of Dispersion Overview.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Measures of Dispersion Overview Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-statistics-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Statistics",
    "topic": "Mean Deviation about Mean/Median",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Mean Deviation about Mean/Median in Statistics.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Mean Deviation about Mean/Median.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mean Deviation about Mean/Median Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-statistics-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Statistics",
    "topic": "Variance of Ungrouped & Grouped Data",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Variance of Ungrouped & Grouped Data in Statistics.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Variance of Ungrouped & Grouped Data.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Variance of Ungrouped & Grouped Data Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-statistics-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Statistics",
    "topic": "Standard Deviation Calculation",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Standard Deviation Calculation in Statistics.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Standard Deviation Calculation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Deviation Calculation Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-statistics-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Statistics",
    "topic": "Coefficient of Variation",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Coefficient of Variation in Statistics.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Coefficient of Variation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Coefficient of Variation Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-probability-1",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Probability",
    "topic": "Random Experiments & Sample Space",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Random Experiments & Sample Space in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Random Experiments & Sample Space.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Random Experiments & Sample Space Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-probability-2",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Probability",
    "topic": "Events & Types of Events",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Events & Types of Events in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Events & Types of Events.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Events & Types of Events Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-probability-3",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Probability",
    "topic": "Axiomatic Approach to Probability",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Axiomatic Approach to Probability in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Axiomatic Approach to Probability.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Axiomatic Approach to Probability Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-probability-4",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Probability",
    "topic": "Addition Rule of Probability",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Addition Rule of Probability in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Addition Rule of Probability.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Addition Rule of Probability Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-11-probability-5",
    "subject": "Mathematics",
    "classLevel": "11",
    "chapter": "Probability",
    "topic": "Odds in Favor and Odds Against",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Odds in Favor and Odds Against in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Odds in Favor and Odds Against.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Odds in Favor and Odds Against Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-relations-and-functions-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Relations and Functions",
    "topic": "Types of Relations (Equivalence)",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Types of Relations (Equivalence) in Relations and Functions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Types of Relations (Equivalence).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Types of Relations (Equivalence) Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-relations-and-functions-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Relations and Functions",
    "topic": "Types of Functions (One-one, Onto)",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Types of Functions (One-one, Onto) in Relations and Functions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Types of Functions (One-one, Onto).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Types of Functions (One-one, Onto) Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-relations-and-functions-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Relations and Functions",
    "topic": "Composite Functions & Invertible Functions",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Composite Functions & Invertible Functions in Relations and Functions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Composite Functions & Invertible Functions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Composite Functions & Invertible Functions Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-relations-and-functions-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Relations and Functions",
    "topic": "Binary Operations Overview",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Binary Operations Overview in Relations and Functions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Binary Operations Overview.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Binary Operations Overview Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-inverse-trigonometric-functions-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Principal Value Branches",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Trigonometric identities, compound angles, transformation formulas, and general solutions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Principal Value Branches.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Compound Angle & Multiple Angle Identities",
        "formula": "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A",
        "variables": "A, B = Angles in radians or degrees",
        "examTip": "tan(2A) = 2tanA / (1 - tan²A). sin(2A) = 2tanA / (1 + tan²A).",
        "trap": "Check quadrant signs when finding half-angle values: sin(A/2) = ±√((1 - cosA)/2)."
      },
      {
        "name": "Sum to Product Transformations",
        "formula": "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}",
        "variables": "C, D = Arbitrary angular arguments",
        "examTip": "cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2) = 2 sin((C+D)/2) sin((D-C)/2).",
        "trap": "Remember the negative sign in cos C - cos D."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-inverse-trigonometric-functions-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Domain & Range of Inverse Trig Functions",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Trigonometric identities, compound angles, transformation formulas, and general solutions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Domain & Range of Inverse Trig Functions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Compound Angle & Multiple Angle Identities",
        "formula": "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A",
        "variables": "A, B = Angles in radians or degrees",
        "examTip": "tan(2A) = 2tanA / (1 - tan²A). sin(2A) = 2tanA / (1 + tan²A).",
        "trap": "Check quadrant signs when finding half-angle values: sin(A/2) = ±√((1 - cosA)/2)."
      },
      {
        "name": "Sum to Product Transformations",
        "formula": "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}",
        "variables": "C, D = Arbitrary angular arguments",
        "examTip": "cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2) = 2 sin((C+D)/2) sin((D-C)/2).",
        "trap": "Remember the negative sign in cos C - cos D."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-inverse-trigonometric-functions-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Properties of Inverse Trig Functions",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Trigonometric identities, compound angles, transformation formulas, and general solutions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Properties of Inverse Trig Functions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Compound Angle & Multiple Angle Identities",
        "formula": "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A",
        "variables": "A, B = Angles in radians or degrees",
        "examTip": "tan(2A) = 2tanA / (1 - tan²A). sin(2A) = 2tanA / (1 + tan²A).",
        "trap": "Check quadrant signs when finding half-angle values: sin(A/2) = ±√((1 - cosA)/2)."
      },
      {
        "name": "Sum to Product Transformations",
        "formula": "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}",
        "variables": "C, D = Arbitrary angular arguments",
        "examTip": "cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2) = 2 sin((C+D)/2) sin((D-C)/2).",
        "trap": "Remember the negative sign in cos C - cos D."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-inverse-trigonometric-functions-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Sum and Difference of Inverse Trig Formulas",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Trigonometric identities, compound angles, transformation formulas, and general solutions.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Sum and Difference of Inverse Trig Formulas.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Compound Angle & Multiple Angle Identities",
        "formula": "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A",
        "variables": "A, B = Angles in radians or degrees",
        "examTip": "tan(2A) = 2tanA / (1 - tan²A). sin(2A) = 2tanA / (1 + tan²A).",
        "trap": "Check quadrant signs when finding half-angle values: sin(A/2) = ±√((1 - cosA)/2)."
      },
      {
        "name": "Sum to Product Transformations",
        "formula": "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C + \\cos D = 2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}",
        "variables": "C, D = Arbitrary angular arguments",
        "examTip": "cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2) = 2 sin((C+D)/2) sin((D-C)/2).",
        "trap": "Remember the negative sign in cos C - cos D."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-matrices-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Matrices",
    "topic": "Types of Matrices & Equality",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Matrix algebra, inverse, determinant properties, and system of linear equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Types of Matrices & Equality.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Matrix Inverse & Adjoint Relation",
        "formula": "A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n",
        "variables": "A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix",
        "examTip": "|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.",
        "trap": "(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!)."
      },
      {
        "name": "Cramer’s Rule for System of Equations",
        "formula": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}",
        "variables": "D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants",
        "examTip": "Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.",
        "trap": "For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-matrices-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Matrices",
    "topic": "Matrix Multiplication Properties",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Matrix algebra, inverse, determinant properties, and system of linear equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Matrix Multiplication Properties.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Matrix Inverse & Adjoint Relation",
        "formula": "A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n",
        "variables": "A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix",
        "examTip": "|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.",
        "trap": "(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!)."
      },
      {
        "name": "Cramer’s Rule for System of Equations",
        "formula": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}",
        "variables": "D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants",
        "examTip": "Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.",
        "trap": "For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-matrices-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Matrices",
    "topic": "Transpose of Matrix & Symmetric Matrices",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Matrix algebra, inverse, determinant properties, and system of linear equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Transpose of Matrix & Symmetric Matrices.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Matrix Inverse & Adjoint Relation",
        "formula": "A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n",
        "variables": "A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix",
        "examTip": "|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.",
        "trap": "(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!)."
      },
      {
        "name": "Cramer’s Rule for System of Equations",
        "formula": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}",
        "variables": "D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants",
        "examTip": "Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.",
        "trap": "For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-matrices-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Matrices",
    "topic": "Elementary Row/Column Operations",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Matrix algebra, inverse, determinant properties, and system of linear equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Elementary Row/Column Operations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Matrix Inverse & Adjoint Relation",
        "formula": "A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n",
        "variables": "A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix",
        "examTip": "|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.",
        "trap": "(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!)."
      },
      {
        "name": "Cramer’s Rule for System of Equations",
        "formula": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}",
        "variables": "D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants",
        "examTip": "Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.",
        "trap": "For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-matrices-5",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Matrices",
    "topic": "Invertible Matrices",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Matrix algebra, inverse, determinant properties, and system of linear equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Invertible Matrices.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Matrix Inverse & Adjoint Relation",
        "formula": "A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n",
        "variables": "A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix",
        "examTip": "|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.",
        "trap": "(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!)."
      },
      {
        "name": "Cramer’s Rule for System of Equations",
        "formula": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}",
        "variables": "D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants",
        "examTip": "Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.",
        "trap": "For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-determinants-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Determinants",
    "topic": "Determinant of Square Matrix up to 3x3",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Matrix algebra, inverse, determinant properties, and system of linear equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Determinant of Square Matrix up to 3x3.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Matrix Inverse & Adjoint Relation",
        "formula": "A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n",
        "variables": "A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix",
        "examTip": "|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.",
        "trap": "(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!)."
      },
      {
        "name": "Cramer’s Rule for System of Equations",
        "formula": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}",
        "variables": "D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants",
        "examTip": "Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.",
        "trap": "For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-determinants-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Determinants",
    "topic": "Minors and Cofactors",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Matrix algebra, inverse, determinant properties, and system of linear equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Minors and Cofactors.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Matrix Inverse & Adjoint Relation",
        "formula": "A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n",
        "variables": "A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix",
        "examTip": "|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.",
        "trap": "(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!)."
      },
      {
        "name": "Cramer’s Rule for System of Equations",
        "formula": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}",
        "variables": "D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants",
        "examTip": "Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.",
        "trap": "For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-determinants-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Determinants",
    "topic": "Adjoint and Inverse of a Matrix",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Matrix algebra, inverse, determinant properties, and system of linear equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Adjoint and Inverse of a Matrix.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Matrix Inverse & Adjoint Relation",
        "formula": "A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n",
        "variables": "A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix",
        "examTip": "|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.",
        "trap": "(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!)."
      },
      {
        "name": "Cramer’s Rule for System of Equations",
        "formula": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}",
        "variables": "D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants",
        "examTip": "Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.",
        "trap": "For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-determinants-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Determinants",
    "topic": "Consistency of Linear Equations",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Matrix algebra, inverse, determinant properties, and system of linear equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Consistency of Linear Equations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Matrix Inverse & Adjoint Relation",
        "formula": "A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n",
        "variables": "A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix",
        "examTip": "|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.",
        "trap": "(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!)."
      },
      {
        "name": "Cramer’s Rule for System of Equations",
        "formula": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}",
        "variables": "D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants",
        "examTip": "Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.",
        "trap": "For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-determinants-5",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Determinants",
    "topic": "Cramer's Rule & Matrix Inversion Method",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Matrix algebra, inverse, determinant properties, and system of linear equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Cramer's Rule & Matrix Inversion Method.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Matrix Inverse & Adjoint Relation",
        "formula": "A^{-1} = \\frac{1}{|A|}\\text{adj}(A), \\quad A\\cdot\\text{adj}(A) = |A| I_n",
        "variables": "A = Invertible square matrix (|A| ≠ 0), adj(A) = Transpose of cofactor matrix",
        "examTip": "|adj(A)| = |A|^(n-1). |A · B| = |A| · |B|.",
        "trap": "(A · B)⁻¹ = B⁻¹ · A⁻¹ (order reverses!)."
      },
      {
        "name": "Cramer’s Rule for System of Equations",
        "formula": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}",
        "variables": "D = Coefficient determinant, D_x, D_y, D_z = Replaced column determinants",
        "examTip": "Unique solution: D ≠ 0. Infinitely many solutions: D = D_x = D_y = D_z = 0. No solution (inconsistent): D = 0 and at least one D_i ≠ 0.",
        "trap": "For homogeneous system (AX = 0), non-trivial solution exists iff |A| = 0."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-continuity-and-differentiability-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Continuity and Differentiability",
    "topic": "Continuity at a Point & Interval",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Continuity at a Point & Interval in Continuity and Differentiability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Continuity at a Point & Interval.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Continuity at a Point & Interval Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-continuity-and-differentiability-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Continuity and Differentiability",
    "topic": "Differentiability of Functions",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Differentiability of Functions in Continuity and Differentiability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Differentiability of Functions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Differentiability of Functions Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-continuity-and-differentiability-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Continuity and Differentiability",
    "topic": "Chain Rule & Implicit Differentiation",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Chain Rule & Implicit Differentiation in Continuity and Differentiability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Chain Rule & Implicit Differentiation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chain Rule & Implicit Differentiation Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-continuity-and-differentiability-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Continuity and Differentiability",
    "topic": "Logarithmic Differentiation",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Logarithmic Differentiation in Continuity and Differentiability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Logarithmic Differentiation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Logarithmic Differentiation Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-continuity-and-differentiability-5",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Continuity and Differentiability",
    "topic": "Second Order Derivatives",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Second Order Derivatives in Continuity and Differentiability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Second Order Derivatives.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Second Order Derivatives Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-continuity-and-differentiability-6",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Continuity and Differentiability",
    "topic": "Rolle's & Mean Value Theorems",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Rolle's & Mean Value Theorems in Continuity and Differentiability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Rolle's & Mean Value Theorems.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Rolle's & Mean Value Theorems Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-application-of-derivatives-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Application of Derivatives",
    "topic": "Rate of Change of Quantities",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Rate of Change of Quantities.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-application-of-derivatives-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Application of Derivatives",
    "topic": "Increasing and Decreasing Functions",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Increasing and Decreasing Functions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-application-of-derivatives-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Application of Derivatives",
    "topic": "Tangents and Normals Equations",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Tangents and Normals Equations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-application-of-derivatives-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Application of Derivatives",
    "topic": "Maxima and Minima First/Second Derivative Tests",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Maxima and Minima First/Second Derivative Tests.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-application-of-derivatives-5",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Application of Derivatives",
    "topic": "Word Problems on Maxima and Minima",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Word Problems on Maxima and Minima.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-integrals-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Integrals",
    "topic": "Indefinite Integration by Substitution",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Indefinite Integration by Substitution.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-integrals-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Integrals",
    "topic": "Integration by Partial Fractions",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Integration by Partial Fractions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-integrals-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Integrals",
    "topic": "Integration by Parts",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Integration by Parts.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-integrals-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Integrals",
    "topic": "Fundamental Theorem of Calculus",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Fundamental Theorem of Calculus.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-integrals-5",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Integrals",
    "topic": "Definite Integrals Properties & Symmetry",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Definite Integrals Properties & Symmetry.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-applications-of-integrals-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Applications of Integrals",
    "topic": "Area Under Simple Curves",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Area Under Simple Curves.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-applications-of-integrals-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Applications of Integrals",
    "topic": "Area of Region Bounded by a Line and a Curve",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Area of Region Bounded by a Line and a Curve.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-applications-of-integrals-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Applications of Integrals",
    "topic": "Area between Two Parabolas/Circles",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Differential calculus, standard limits, integration techniques, and definite integrals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Area between Two Parabolas/Circles.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Standard Limits & L’Hôpital’s Rule",
        "formula": "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)} \\text{ (for } \\frac{0}{0}, \\frac{\\infty}{\\infty}\\text{)}",
        "variables": "x in radians for trigonometric limits",
        "examTip": "1^∞ indeterminate form: lim [f(x)]^(g(x)) = e^(lim g(x)(f(x) - 1)).",
        "trap": "Do not use L’Hôpital’s rule unless the limit strictly evaluates to 0/0 or ∞/∞."
      },
      {
        "name": "Integration by Parts & King’s Property",
        "formula": "\\int u v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx, \\quad \\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx",
        "variables": "ILATE rule for priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential",
        "examTip": "King’s Property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx solves 90% of JEE definite integral problems by symmetry.",
        "trap": "Remember to add integration constant + C for indefinite integrals."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-differential-equations-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Differential Equations",
    "topic": "Order and Degree of Differential Equation",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Order and Degree of Differential Equation in Differential Equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Order and Degree of Differential Equation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Order and Degree of Differential Equation Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-differential-equations-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Differential Equations",
    "topic": "General and Particular Solutions",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for General and Particular Solutions in Differential Equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for General and Particular Solutions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "General and Particular Solutions Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-differential-equations-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Differential Equations",
    "topic": "Variable Separable Method",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Variable Separable Method in Differential Equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Variable Separable Method.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Variable Separable Method Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-differential-equations-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Differential Equations",
    "topic": "Homogeneous Differential Equations",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Homogeneous Differential Equations in Differential Equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Homogeneous Differential Equations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Homogeneous Differential Equations Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-differential-equations-5",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Differential Equations",
    "topic": "First Order Linear Differential Equations (Integrating Factor)",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for First Order Linear Differential Equations (Integrating Factor) in Differential Equations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for First Order Linear Differential Equations (Integrating Factor).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "First Order Linear Differential Equations (Integrating Factor) Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-vector-algebra-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Vector Algebra",
    "topic": "Vectors and Scalars Types",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Vectors and Scalars Types.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-vector-algebra-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Vector Algebra",
    "topic": "Direction Cosines and Direction Ratios",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Direction Cosines and Direction Ratios.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-vector-algebra-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Vector Algebra",
    "topic": "Dot (Scalar) Product & Projection",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Dot (Scalar) Product & Projection.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-vector-algebra-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Vector Algebra",
    "topic": "Cross (Vector) Product & Area of Triangle",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Cross (Vector) Product & Area of Triangle.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-vector-algebra-5",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Vector Algebra",
    "topic": "Scalar Triple Product [a b c]",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Scalar Triple Product [a b c].",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-three-dimensional-geometry-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Three Dimensional Geometry",
    "topic": "Direction Cosines and Ratios of a Line",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Direction Cosines and Ratios of a Line.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-three-dimensional-geometry-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Three Dimensional Geometry",
    "topic": "Vector and Cartesian Equation of a Line",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Vector and Cartesian Equation of a Line.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-three-dimensional-geometry-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Three Dimensional Geometry",
    "topic": "Shortest Distance between Skew Lines",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Shortest Distance between Skew Lines.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-three-dimensional-geometry-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Three Dimensional Geometry",
    "topic": "Angle between Two Lines",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Angle between Two Lines.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-three-dimensional-geometry-5",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Three Dimensional Geometry",
    "topic": "Equation of Plane & Distance of Point from Plane",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Vector dot product, cross product, lines and planes in 3D space.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Equation of Plane & Distance of Point from Plane.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Scalar (Dot) & Vector (Cross) Product",
        "formula": "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        "variables": "θ = Angle between vectors, n̂ = Unit normal vector given by right-hand rule",
        "examTip": "Vectors are perpendicular iff a · b = 0; collinear iff a × b = 0.",
        "trap": "Cross product is anti-commutative: a × b = -(b × a)."
      },
      {
        "name": "Shortest Distance Between Skew Lines",
        "formula": "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}",
        "variables": "r = a₁ + λb₁ and r = a₂ + μb₂ are two skew lines in space",
        "examTip": "If lines intersect, shortest distance d is ZERO, meaning (a₂ - a₁) · (b₁ × b₂) = 0 (coplanar).",
        "trap": "For parallel lines (b₁ = b₂ = b), distance formula is d = |(a₂ - a₁) × b| / |b|."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-linear-programming-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Linear Programming",
    "topic": "Linear Programming Problem (LPP) Formulation",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Linear Programming Problem (LPP) Formulation in Linear Programming.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Linear Programming Problem (LPP) Formulation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Linear Programming Problem (LPP) Formulation Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-linear-programming-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Linear Programming",
    "topic": "Graphical Method for Two Variables",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Graphical Method for Two Variables in Linear Programming.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Graphical Method for Two Variables.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Graphical Method for Two Variables Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-linear-programming-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Linear Programming",
    "topic": "Feasible and Infeasible Regions",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Feasible and Infeasible Regions in Linear Programming.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Feasible and Infeasible Regions.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Feasible and Infeasible Regions Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-linear-programming-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Linear Programming",
    "topic": "Corner Point Method for Optimal Value",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Corner Point Method for Optimal Value in Linear Programming.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Corner Point Method for Optimal Value.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Corner Point Method for Optimal Value Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-probability-1",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Probability",
    "topic": "Conditional Probability",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Conditional Probability in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Conditional Probability.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Conditional Probability Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-probability-2",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Probability",
    "topic": "Multiplication Theorem on Probability",
    "weightage": "High",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Multiplication Theorem on Probability in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Multiplication Theorem on Probability.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Multiplication Theorem on Probability Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-probability-3",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Probability",
    "topic": "Independent Events",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Independent Events in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Independent Events.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Independent Events Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-probability-4",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Probability",
    "topic": "Bayes' Theorem & Total Probability",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Bayes' Theorem & Total Probability in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Bayes' Theorem & Total Probability.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bayes' Theorem & Total Probability Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-probability-5",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Probability",
    "topic": "Random Variable & Probability Distribution",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Random Variable & Probability Distribution in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Random Variable & Probability Distribution.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Random Variable & Probability Distribution Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "mat-12-probability-6",
    "subject": "Mathematics",
    "classLevel": "12",
    "chapter": "Probability",
    "topic": "Bernoulli Trials & Binomial Distribution",
    "weightage": "Medium",
    "examTarget": "JEE",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Bernoulli Trials & Binomial Distribution in Probability.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Bernoulli Trials & Binomial Distribution.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bernoulli Trials & Binomial Distribution Mathematical Formula",
        "formula": "y = f(x) \\implies \\Delta y \\approx f'(x)\\Delta x",
        "variables": "Functions, differential parameters, and series coefficients",
        "examTip": "Check symmetry and domain restrictions before applying.",
        "trap": "Check for division by zero and indeterminate forms."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-the-living-world-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "The Living World",
    "topic": "Characteristics of Living Organisms",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Characteristics of Living Organisms in The Living World.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Characteristics of Living Organisms.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Characteristics of Living Organisms Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-the-living-world-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "The Living World",
    "topic": "Binomial Nomenclature Rules",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Binomial Nomenclature Rules in The Living World.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Binomial Nomenclature Rules.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Binomial Nomenclature Rules Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-the-living-world-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "The Living World",
    "topic": "Taxonomic Hierarchy",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Taxonomic Hierarchy in The Living World.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Taxonomic Hierarchy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Taxonomic Hierarchy Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-the-living-world-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "The Living World",
    "topic": "Taxonomical Aids",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Taxonomical Aids in The Living World.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Taxonomical Aids.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Taxonomical Aids Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-the-living-world-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "The Living World",
    "topic": "Species Concept",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Species Concept in The Living World.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Species Concept.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Species Concept Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-biological-classification-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Biological Classification",
    "topic": "Five Kingdom Classification",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Five Kingdom Classification in Biological Classification.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Five Kingdom Classification.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Five Kingdom Classification Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-biological-classification-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Biological Classification",
    "topic": "Kingdom Monera & Archaebacteria",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Kingdom Monera & Archaebacteria in Biological Classification.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Kingdom Monera & Archaebacteria.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Kingdom Monera & Archaebacteria Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-biological-classification-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Biological Classification",
    "topic": "Kingdom Protista",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Kingdom Protista in Biological Classification.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Kingdom Protista.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Kingdom Protista Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-biological-classification-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Biological Classification",
    "topic": "Kingdom Fungi Classes",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Kingdom Fungi Classes in Biological Classification.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Kingdom Fungi Classes.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Kingdom Fungi Classes Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-biological-classification-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Biological Classification",
    "topic": "Viruses, Viroids & Lichens",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Viruses, Viroids & Lichens in Biological Classification.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Viruses, Viroids & Lichens.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Viruses, Viroids & Lichens Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-plant-kingdom-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Plant Kingdom",
    "topic": "Algae (Chlorophyceae, Phaeophyceae, Rhodophyceae)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Algae (Chlorophyceae, Phaeophyceae, Rhodophyceae) in Plant Kingdom.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Algae (Chlorophyceae, Phaeophyceae, Rhodophyceae).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Algae (Chlorophyceae, Phaeophyceae, Rhodophyceae) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-plant-kingdom-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Plant Kingdom",
    "topic": "Bryophytes (Liverworts & Mosses)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Bryophytes (Liverworts & Mosses) in Plant Kingdom.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Bryophytes (Liverworts & Mosses).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bryophytes (Liverworts & Mosses) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-plant-kingdom-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Plant Kingdom",
    "topic": "Pteridophytes Life Cycle",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Pteridophytes Life Cycle in Plant Kingdom.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Pteridophytes Life Cycle.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Pteridophytes Life Cycle Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-plant-kingdom-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Plant Kingdom",
    "topic": "Gymnosperms Characteristics",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Gymnosperms Characteristics in Plant Kingdom.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Gymnosperms Characteristics.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Gymnosperms Characteristics Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-plant-kingdom-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Plant Kingdom",
    "topic": "Angiosperms & Alternation of Generations",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Angiosperms & Alternation of Generations in Plant Kingdom.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Angiosperms & Alternation of Generations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Angiosperms & Alternation of Generations Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-animal-kingdom-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Animal Kingdom",
    "topic": "Levels of Organisation & Symmetry",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Levels of Organisation & Symmetry in Animal Kingdom.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Levels of Organisation & Symmetry.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Levels of Organisation & Symmetry Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-animal-kingdom-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Animal Kingdom",
    "topic": "Non-chordates (Porifera to Echinodermata)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Non-chordates (Porifera to Echinodermata) in Animal Kingdom.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Non-chordates (Porifera to Echinodermata).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Non-chordates (Porifera to Echinodermata) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-animal-kingdom-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Animal Kingdom",
    "topic": "Hemichordata & Chordata Features",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Hemichordata & Chordata Features in Animal Kingdom.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Hemichordata & Chordata Features.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Hemichordata & Chordata Features Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-animal-kingdom-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Animal Kingdom",
    "topic": "Vertebrates Classes (Pisces, Amphibia, Reptilia)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Vertebrates Classes (Pisces, Amphibia, Reptilia) in Animal Kingdom.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Vertebrates Classes (Pisces, Amphibia, Reptilia).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Vertebrates Classes (Pisces, Amphibia, Reptilia) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-animal-kingdom-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Animal Kingdom",
    "topic": "Aves & Mammalia Key Characteristics",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Aves & Mammalia Key Characteristics in Animal Kingdom.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Aves & Mammalia Key Characteristics.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Aves & Mammalia Key Characteristics Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-morphology-of-flowering-plants-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Morphology of Flowering Plants",
    "topic": "Root System & Modifications",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Root System & Modifications in Morphology of Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Root System & Modifications.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Root System & Modifications Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-morphology-of-flowering-plants-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Morphology of Flowering Plants",
    "topic": "Stem System & Modifications",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Stem System & Modifications in Morphology of Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Stem System & Modifications.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Stem System & Modifications Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-morphology-of-flowering-plants-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Morphology of Flowering Plants",
    "topic": "Leaf Morphology & Venation",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Leaf Morphology & Venation in Morphology of Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Leaf Morphology & Venation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Leaf Morphology & Venation Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-morphology-of-flowering-plants-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Morphology of Flowering Plants",
    "topic": "Inflorescence Types",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Inflorescence Types in Morphology of Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Inflorescence Types.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Inflorescence Types Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-morphology-of-flowering-plants-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Morphology of Flowering Plants",
    "topic": "Flower Structure & Fruit Types",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Flower Structure & Fruit Types in Morphology of Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Flower Structure & Fruit Types.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Flower Structure & Fruit Types Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-anatomy-of-flowering-plants-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Anatomy of Flowering Plants",
    "topic": "Meristematic vs Permanent Tissues",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Meristematic vs Permanent Tissues in Anatomy of Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Meristematic vs Permanent Tissues.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Meristematic vs Permanent Tissues Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-anatomy-of-flowering-plants-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Anatomy of Flowering Plants",
    "topic": "Complex Tissues (Xylem & Phloem)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Complex Tissues (Xylem & Phloem) in Anatomy of Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Complex Tissues (Xylem & Phloem).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Complex Tissues (Xylem & Phloem) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-anatomy-of-flowering-plants-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Anatomy of Flowering Plants",
    "topic": "Dicot & Monocot Root Anatomy",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Dicot & Monocot Root Anatomy in Anatomy of Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Dicot & Monocot Root Anatomy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Dicot & Monocot Root Anatomy Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-anatomy-of-flowering-plants-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Anatomy of Flowering Plants",
    "topic": "Dicot & Monocot Stem Anatomy",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Dicot & Monocot Stem Anatomy in Anatomy of Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Dicot & Monocot Stem Anatomy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Dicot & Monocot Stem Anatomy Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-anatomy-of-flowering-plants-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Anatomy of Flowering Plants",
    "topic": "Secondary Growth in Dicot Stem",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Secondary Growth in Dicot Stem in Anatomy of Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Secondary Growth in Dicot Stem.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Secondary Growth in Dicot Stem Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-structural-organisation-in-animals-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Structural Organisation in Animals",
    "topic": "Epithelial Tissue Types",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Epithelial Tissue Types in Structural Organisation in Animals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Epithelial Tissue Types.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Epithelial Tissue Types Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-structural-organisation-in-animals-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Structural Organisation in Animals",
    "topic": "Connective Tissue (Bone, Cartilage, Blood)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Connective Tissue (Bone, Cartilage, Blood) in Structural Organisation in Animals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Connective Tissue (Bone, Cartilage, Blood).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Connective Tissue (Bone, Cartilage, Blood) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-structural-organisation-in-animals-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Structural Organisation in Animals",
    "topic": "Muscular & Neural Tissues",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Muscular & Neural Tissues in Structural Organisation in Animals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Muscular & Neural Tissues.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Muscular & Neural Tissues Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-structural-organisation-in-animals-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Structural Organisation in Animals",
    "topic": "Cockroach Anatomy & Morphology",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Cockroach Anatomy & Morphology in Structural Organisation in Animals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Cockroach Anatomy & Morphology.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cockroach Anatomy & Morphology Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-structural-organisation-in-animals-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Structural Organisation in Animals",
    "topic": "Frog Organ Systems",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Frog Organ Systems in Structural Organisation in Animals.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Frog Organ Systems.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Frog Organ Systems Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-cell--the-unit-of-life-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Cell: The Unit of Life",
    "topic": "Prokaryotic vs Eukaryotic Cell",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Prokaryotic vs Eukaryotic Cell.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chromosome & DNA Content in Cell Cycle",
        "formula": "\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)",
        "variables": "n = Ploidy (number of chromosomes), C = Amount of DNA content",
        "examTip": "DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).",
        "trap": "In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-cell--the-unit-of-life-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Cell: The Unit of Life",
    "topic": "Plasma Membrane Fluid Mosaic Model",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Plasma Membrane Fluid Mosaic Model.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chromosome & DNA Content in Cell Cycle",
        "formula": "\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)",
        "variables": "n = Ploidy (number of chromosomes), C = Amount of DNA content",
        "examTip": "DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).",
        "trap": "In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-cell--the-unit-of-life-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Cell: The Unit of Life",
    "topic": "Endomembrane System (ER, Golgi, Lysosomes)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Endomembrane System (ER, Golgi, Lysosomes).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chromosome & DNA Content in Cell Cycle",
        "formula": "\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)",
        "variables": "n = Ploidy (number of chromosomes), C = Amount of DNA content",
        "examTip": "DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).",
        "trap": "In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-cell--the-unit-of-life-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Cell: The Unit of Life",
    "topic": "Mitochondria & Chloroplasts",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Mitochondria & Chloroplasts.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chromosome & DNA Content in Cell Cycle",
        "formula": "\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)",
        "variables": "n = Ploidy (number of chromosomes), C = Amount of DNA content",
        "examTip": "DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).",
        "trap": "In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-cell--the-unit-of-life-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Cell: The Unit of Life",
    "topic": "Nucleus & Chromosome Structure",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Nucleus & Chromosome Structure.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chromosome & DNA Content in Cell Cycle",
        "formula": "\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)",
        "variables": "n = Ploidy (number of chromosomes), C = Amount of DNA content",
        "examTip": "DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).",
        "trap": "In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-biomolecules-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Biomolecules",
    "topic": "Primary & Secondary Metabolites",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Primary & Secondary Metabolites in Biomolecules.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Primary & Secondary Metabolites.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Primary & Secondary Metabolites Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-biomolecules-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Biomolecules",
    "topic": "Carbohydrates & Polysaccharides",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Carbohydrates & Polysaccharides in Biomolecules.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Carbohydrates & Polysaccharides.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Carbohydrates & Polysaccharides Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-biomolecules-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Biomolecules",
    "topic": "Proteins & Peptide Bond",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Proteins & Peptide Bond in Biomolecules.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Proteins & Peptide Bond.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Proteins & Peptide Bond Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-biomolecules-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Biomolecules",
    "topic": "Lipids & Fatty Acids",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Lipids & Fatty Acids in Biomolecules.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Lipids & Fatty Acids.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Lipids & Fatty Acids Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-biomolecules-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Biomolecules",
    "topic": "Enzyme Action Mechanism & Inhibition",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Enzyme Action Mechanism & Inhibition in Biomolecules.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Enzyme Action Mechanism & Inhibition.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Enzyme Action Mechanism & Inhibition Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-cell-cycle-and-cell-division-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Cell Cycle and Cell Division",
    "topic": "Cell Cycle Phases (G1, S, G2, M)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Cell Cycle Phases (G1, S, G2, M).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chromosome & DNA Content in Cell Cycle",
        "formula": "\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)",
        "variables": "n = Ploidy (number of chromosomes), C = Amount of DNA content",
        "examTip": "DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).",
        "trap": "In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-cell-cycle-and-cell-division-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Cell Cycle and Cell Division",
    "topic": "Mitosis Stages & Significance",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Mitosis Stages & Significance.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chromosome & DNA Content in Cell Cycle",
        "formula": "\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)",
        "variables": "n = Ploidy (number of chromosomes), C = Amount of DNA content",
        "examTip": "DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).",
        "trap": "In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-cell-cycle-and-cell-division-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Cell Cycle and Cell Division",
    "topic": "Meiosis I (Prophase I Stages)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Meiosis I (Prophase I Stages).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chromosome & DNA Content in Cell Cycle",
        "formula": "\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)",
        "variables": "n = Ploidy (number of chromosomes), C = Amount of DNA content",
        "examTip": "DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).",
        "trap": "In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-cell-cycle-and-cell-division-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Cell Cycle and Cell Division",
    "topic": "Meiosis II & Cytokinesis",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Meiosis II & Cytokinesis.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chromosome & DNA Content in Cell Cycle",
        "formula": "\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)",
        "variables": "n = Ploidy (number of chromosomes), C = Amount of DNA content",
        "examTip": "DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).",
        "trap": "In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-cell-cycle-and-cell-division-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Cell Cycle and Cell Division",
    "topic": "Synaptonemal Complex & Crossing Over",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Cell cycle phases, chromosome numbers, chromatid counts, and mitotic/meiotic ratios.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Synaptonemal Complex & Crossing Over.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Chromosome & DNA Content in Cell Cycle",
        "formula": "\\text{G}_1: (2n, 2C) \\xrightarrow{\\text{S phase}} \\text{G}_2: (2n, 4C) \\xrightarrow{\\text{Mitosis}} 2 \\text{ Cells}: (2n, 2C)",
        "variables": "n = Ploidy (number of chromosomes), C = Amount of DNA content",
        "examTip": "DNA content doubles in S phase (2C to 4C), but chromosome number REMAINS THE SAME (2n).",
        "trap": "In Meiosis I, chromosome number reduces to half: (2n, 4C) → 2 cells of (n, 2C)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-photosynthesis-in-higher-plants-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Photosynthesis in Higher Plants",
    "topic": "Chloroplast Pigments & Absorption",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Photosynthesis energetics, photolysis, ATP/NADPH yield in Calvin cycle, and respiration ATP count.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Chloroplast Pigments & Absorption.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Calvin Cycle (C₃ Cycle) Stoichiometry",
        "formula": "6\\text{ CO}_2 + 18\\text{ ATP} + 12\\text{ NADPH} \\longrightarrow 1\\text{ Glucose (C}_6\\text{H}_{12}\\text{O}_6) + 18\\text{ ADP} + 12\\text{ NADP}^+",
        "variables": "Fixation of 1 CO₂ requires strictly 3 ATP and 2 NADPH",
        "examTip": "For C₄ plants: fixation of 1 CO₂ requires 5 ATP and 2 NADPH (Total 30 ATP per glucose).",
        "trap": "Photorespiration in C₃ plants consumes ATP and releases CO₂ without generating sugars."
      },
      {
        "name": "Aerobic Respiration Net ATP Yield",
        "formula": "1\\text{ Glucose} \\xrightarrow{\\text{Aerobic}} 36 \\text{ to } 38 \\text{ ATP} + 6\\text{ CO}_2 + 6\\text{ H}_2\\text{O}",
        "variables": "Glycolysis: 2 ATP + 2 NADH (8 ATP); Krebs cycle: 2 ATP + 6 NADH + 2 FADH₂ (24 ATP); Link: 2 NADH (6 ATP)",
        "examTip": "1 NADH yields 3 ATP (or 2.5 in modern); 1 FADH₂ yields 2 ATP (or 1.5 in modern).",
        "trap": "Fermentation (anaerobic) yields ONLY 2 net ATP per glucose molecule."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-photosynthesis-in-higher-plants-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Photosynthesis in Higher Plants",
    "topic": "Light Reactions & Photophosphorylation",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Photosynthesis energetics, photolysis, ATP/NADPH yield in Calvin cycle, and respiration ATP count.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Light Reactions & Photophosphorylation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Calvin Cycle (C₃ Cycle) Stoichiometry",
        "formula": "6\\text{ CO}_2 + 18\\text{ ATP} + 12\\text{ NADPH} \\longrightarrow 1\\text{ Glucose (C}_6\\text{H}_{12}\\text{O}_6) + 18\\text{ ADP} + 12\\text{ NADP}^+",
        "variables": "Fixation of 1 CO₂ requires strictly 3 ATP and 2 NADPH",
        "examTip": "For C₄ plants: fixation of 1 CO₂ requires 5 ATP and 2 NADPH (Total 30 ATP per glucose).",
        "trap": "Photorespiration in C₃ plants consumes ATP and releases CO₂ without generating sugars."
      },
      {
        "name": "Aerobic Respiration Net ATP Yield",
        "formula": "1\\text{ Glucose} \\xrightarrow{\\text{Aerobic}} 36 \\text{ to } 38 \\text{ ATP} + 6\\text{ CO}_2 + 6\\text{ H}_2\\text{O}",
        "variables": "Glycolysis: 2 ATP + 2 NADH (8 ATP); Krebs cycle: 2 ATP + 6 NADH + 2 FADH₂ (24 ATP); Link: 2 NADH (6 ATP)",
        "examTip": "1 NADH yields 3 ATP (or 2.5 in modern); 1 FADH₂ yields 2 ATP (or 1.5 in modern).",
        "trap": "Fermentation (anaerobic) yields ONLY 2 net ATP per glucose molecule."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-photosynthesis-in-higher-plants-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Photosynthesis in Higher Plants",
    "topic": "Calvin Cycle (C3 Pathway)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Photosynthesis energetics, photolysis, ATP/NADPH yield in Calvin cycle, and respiration ATP count.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Calvin Cycle (C3 Pathway).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Calvin Cycle (C₃ Cycle) Stoichiometry",
        "formula": "6\\text{ CO}_2 + 18\\text{ ATP} + 12\\text{ NADPH} \\longrightarrow 1\\text{ Glucose (C}_6\\text{H}_{12}\\text{O}_6) + 18\\text{ ADP} + 12\\text{ NADP}^+",
        "variables": "Fixation of 1 CO₂ requires strictly 3 ATP and 2 NADPH",
        "examTip": "For C₄ plants: fixation of 1 CO₂ requires 5 ATP and 2 NADPH (Total 30 ATP per glucose).",
        "trap": "Photorespiration in C₃ plants consumes ATP and releases CO₂ without generating sugars."
      },
      {
        "name": "Aerobic Respiration Net ATP Yield",
        "formula": "1\\text{ Glucose} \\xrightarrow{\\text{Aerobic}} 36 \\text{ to } 38 \\text{ ATP} + 6\\text{ CO}_2 + 6\\text{ H}_2\\text{O}",
        "variables": "Glycolysis: 2 ATP + 2 NADH (8 ATP); Krebs cycle: 2 ATP + 6 NADH + 2 FADH₂ (24 ATP); Link: 2 NADH (6 ATP)",
        "examTip": "1 NADH yields 3 ATP (or 2.5 in modern); 1 FADH₂ yields 2 ATP (or 1.5 in modern).",
        "trap": "Fermentation (anaerobic) yields ONLY 2 net ATP per glucose molecule."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-photosynthesis-in-higher-plants-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Photosynthesis in Higher Plants",
    "topic": "Hatch-Slack Pathway (C4 Plants)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Photosynthesis energetics, photolysis, ATP/NADPH yield in Calvin cycle, and respiration ATP count.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Hatch-Slack Pathway (C4 Plants).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Calvin Cycle (C₃ Cycle) Stoichiometry",
        "formula": "6\\text{ CO}_2 + 18\\text{ ATP} + 12\\text{ NADPH} \\longrightarrow 1\\text{ Glucose (C}_6\\text{H}_{12}\\text{O}_6) + 18\\text{ ADP} + 12\\text{ NADP}^+",
        "variables": "Fixation of 1 CO₂ requires strictly 3 ATP and 2 NADPH",
        "examTip": "For C₄ plants: fixation of 1 CO₂ requires 5 ATP and 2 NADPH (Total 30 ATP per glucose).",
        "trap": "Photorespiration in C₃ plants consumes ATP and releases CO₂ without generating sugars."
      },
      {
        "name": "Aerobic Respiration Net ATP Yield",
        "formula": "1\\text{ Glucose} \\xrightarrow{\\text{Aerobic}} 36 \\text{ to } 38 \\text{ ATP} + 6\\text{ CO}_2 + 6\\text{ H}_2\\text{O}",
        "variables": "Glycolysis: 2 ATP + 2 NADH (8 ATP); Krebs cycle: 2 ATP + 6 NADH + 2 FADH₂ (24 ATP); Link: 2 NADH (6 ATP)",
        "examTip": "1 NADH yields 3 ATP (or 2.5 in modern); 1 FADH₂ yields 2 ATP (or 1.5 in modern).",
        "trap": "Fermentation (anaerobic) yields ONLY 2 net ATP per glucose molecule."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-photosynthesis-in-higher-plants-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Photosynthesis in Higher Plants",
    "topic": "Photorespiration & Factors Affecting",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Photosynthesis energetics, photolysis, ATP/NADPH yield in Calvin cycle, and respiration ATP count.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Photorespiration & Factors Affecting.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Calvin Cycle (C₃ Cycle) Stoichiometry",
        "formula": "6\\text{ CO}_2 + 18\\text{ ATP} + 12\\text{ NADPH} \\longrightarrow 1\\text{ Glucose (C}_6\\text{H}_{12}\\text{O}_6) + 18\\text{ ADP} + 12\\text{ NADP}^+",
        "variables": "Fixation of 1 CO₂ requires strictly 3 ATP and 2 NADPH",
        "examTip": "For C₄ plants: fixation of 1 CO₂ requires 5 ATP and 2 NADPH (Total 30 ATP per glucose).",
        "trap": "Photorespiration in C₃ plants consumes ATP and releases CO₂ without generating sugars."
      },
      {
        "name": "Aerobic Respiration Net ATP Yield",
        "formula": "1\\text{ Glucose} \\xrightarrow{\\text{Aerobic}} 36 \\text{ to } 38 \\text{ ATP} + 6\\text{ CO}_2 + 6\\text{ H}_2\\text{O}",
        "variables": "Glycolysis: 2 ATP + 2 NADH (8 ATP); Krebs cycle: 2 ATP + 6 NADH + 2 FADH₂ (24 ATP); Link: 2 NADH (6 ATP)",
        "examTip": "1 NADH yields 3 ATP (or 2.5 in modern); 1 FADH₂ yields 2 ATP (or 1.5 in modern).",
        "trap": "Fermentation (anaerobic) yields ONLY 2 net ATP per glucose molecule."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-respiration-in-plants-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Respiration in Plants",
    "topic": "Glycolysis Steps & Energy Yield",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Glycolysis Steps & Energy Yield.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-respiration-in-plants-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Respiration in Plants",
    "topic": "Fermentation (Alcoholic & Lactic)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Fermentation (Alcoholic & Lactic).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-respiration-in-plants-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Respiration in Plants",
    "topic": "Krebs Cycle (TCA Cycle)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Krebs Cycle (TCA Cycle).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-respiration-in-plants-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Respiration in Plants",
    "topic": "Electron Transport System (ETS)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Electron Transport System (ETS).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-respiration-in-plants-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Respiration in Plants",
    "topic": "Respiratory Quotient (RQ)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Respiratory Quotient (RQ).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-plant-growth-and-development-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Plant Growth and Development",
    "topic": "Phases of Plant Growth",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Phases of Plant Growth in Plant Growth and Development.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Phases of Plant Growth.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Phases of Plant Growth Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-plant-growth-and-development-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Plant Growth and Development",
    "topic": "Plant Growth Regulators (Auxins, GA, Cytokinins)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Plant Growth Regulators (Auxins, GA, Cytokinins) in Plant Growth and Development.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Plant Growth Regulators (Auxins, GA, Cytokinins).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Plant Growth Regulators (Auxins, GA, Cytokinins) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-plant-growth-and-development-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Plant Growth and Development",
    "topic": "Ethylene & Abscisic Acid (ABA)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Ethylene & Abscisic Acid (ABA) in Plant Growth and Development.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ethylene & Abscisic Acid (ABA).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Ethylene & Abscisic Acid (ABA) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-plant-growth-and-development-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Plant Growth and Development",
    "topic": "Photoperiodism & Vernalization",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Photoperiodism & Vernalization in Plant Growth and Development.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Photoperiodism & Vernalization.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Photoperiodism & Vernalization Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-plant-growth-and-development-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Plant Growth and Development",
    "topic": "Seed Dormancy",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Seed Dormancy in Plant Growth and Development.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Seed Dormancy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Seed Dormancy Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-breathing-and-exchange-of-gases-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Breathing and Exchange of Gases",
    "topic": "Respiratory Organs & Mechanism",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Respiratory Organs & Mechanism.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-breathing-and-exchange-of-gases-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Breathing and Exchange of Gases",
    "topic": "Respiratory Volumes & Capacities",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Respiratory Volumes & Capacities.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-breathing-and-exchange-of-gases-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Breathing and Exchange of Gases",
    "topic": "Exchange of Gases at Alveoli",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Exchange of Gases at Alveoli.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-breathing-and-exchange-of-gases-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Breathing and Exchange of Gases",
    "topic": "Transport of O2 & CO2",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Transport of O2 & CO2.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-breathing-and-exchange-of-gases-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Breathing and Exchange of Gases",
    "topic": "Regulation & Respiratory Disorders",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Regulation & Respiratory Disorders.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-body-fluids-and-circulation-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Body Fluids and Circulation",
    "topic": "Blood Composition & Groups (ABO, Rh)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Blood Composition & Groups (ABO, Rh).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-body-fluids-and-circulation-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Body Fluids and Circulation",
    "topic": "Human Heart Structure & Valves",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Human Heart Structure & Valves.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-body-fluids-and-circulation-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Body Fluids and Circulation",
    "topic": "Cardiac Cycle & Heart Sounds",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Cardiac Cycle & Heart Sounds.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-body-fluids-and-circulation-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Body Fluids and Circulation",
    "topic": "Electrocardiogram (ECG) Waves",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Electrocardiogram (ECG) Waves.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-body-fluids-and-circulation-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Body Fluids and Circulation",
    "topic": "Double Circulation & Blood Pressure",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Human organ capacities, cardiovascular equations, and respiratory volumes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Double Circulation & Blood Pressure.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cardiac Output & Blood Pressure",
        "formula": "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate} = 70\\text{ mL} \\times 72\\text{ bpm} \\approx 5040\\text{ mL/min} \\approx 5\\text{ L/min}",
        "variables": "SV = Volume of blood pumped per beat (~70 mL), HR = Heart rate (~72 beats/min)",
        "examTip": "End Diastolic Volume (120 mL) - End Systolic Volume (50 mL) = Stroke Volume (70 mL).",
        "trap": "Pulse pressure = Systolic BP (120) - Diastolic BP (80) = 40 mm Hg."
      },
      {
        "name": "Respiratory Capacities",
        "formula": "\\text{Vital Capacity (VC)} = \\text{Tidal Volume (TV)} + \\text{IRV} + \\text{ERV} \\approx 500 + 2500 + 1000 = 4000-4600\\text{ mL}",
        "variables": "TV = 500 mL, IRV = 2500-3000 mL, ERV = 1000-1100 mL, RV (Residual Volume) = 1100-1200 mL",
        "examTip": "Total Lung Capacity (TLC) = Vital Capacity (VC) + Residual Volume (RV) ≈ 5800 mL.",
        "trap": "Residual Volume (RV) CANNOT be measured by a standard spirometer."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-excretory-products-and-their-elimination-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Excretory Products and their Elimination",
    "topic": "Human Excretory System & Nephron",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Human Excretory System & Nephron in Excretory Products and their Elimination.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Human Excretory System & Nephron.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Human Excretory System & Nephron Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-excretory-products-and-their-elimination-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Excretory Products and their Elimination",
    "topic": "Urine Formation (Filtration, Reabsorption, Secretion)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Urine Formation (Filtration, Reabsorption, Secretion) in Excretory Products and their Elimination.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Urine Formation (Filtration, Reabsorption, Secretion).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Urine Formation (Filtration, Reabsorption, Secretion) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-excretory-products-and-their-elimination-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Excretory Products and their Elimination",
    "topic": "Countercurrent Mechanism in Henle's Loop",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Countercurrent Mechanism in Henle's Loop in Excretory Products and their Elimination.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Countercurrent Mechanism in Henle's Loop.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Countercurrent Mechanism in Henle's Loop Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-excretory-products-and-their-elimination-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Excretory Products and their Elimination",
    "topic": "Regulation of Kidney Function (RAAS)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Regulation of Kidney Function (RAAS) in Excretory Products and their Elimination.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Regulation of Kidney Function (RAAS).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Regulation of Kidney Function (RAAS) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-excretory-products-and-their-elimination-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Excretory Products and their Elimination",
    "topic": "Dialysis & Excretory Disorders",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Dialysis & Excretory Disorders in Excretory Products and their Elimination.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Dialysis & Excretory Disorders.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Dialysis & Excretory Disorders Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-locomotion-and-movement-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Locomotion and Movement",
    "topic": "Types of Movement & Muscle Types",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Types of Movement & Muscle Types in Locomotion and Movement.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Types of Movement & Muscle Types.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Types of Movement & Muscle Types Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-locomotion-and-movement-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Locomotion and Movement",
    "topic": "Skeletal Muscle Structure & Sarcomere",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Skeletal Muscle Structure & Sarcomere in Locomotion and Movement.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Skeletal Muscle Structure & Sarcomere.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Skeletal Muscle Structure & Sarcomere Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-locomotion-and-movement-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Locomotion and Movement",
    "topic": "Sliding Filament Theory of Contraction",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Sliding Filament Theory of Contraction in Locomotion and Movement.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Sliding Filament Theory of Contraction.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Sliding Filament Theory of Contraction Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-locomotion-and-movement-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Locomotion and Movement",
    "topic": "Human Skeletal System Bones",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Human Skeletal System Bones in Locomotion and Movement.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Human Skeletal System Bones.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Human Skeletal System Bones Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-locomotion-and-movement-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Locomotion and Movement",
    "topic": "Joints & Musculoskeletal Disorders",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Joints & Musculoskeletal Disorders in Locomotion and Movement.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Joints & Musculoskeletal Disorders.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Joints & Musculoskeletal Disorders Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-neural-control-and-coordination-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Neural Control and Coordination",
    "topic": "Neuron Structure & Types",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Neuron Structure & Types in Neural Control and Coordination.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Neuron Structure & Types.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Neuron Structure & Types Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-neural-control-and-coordination-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Neural Control and Coordination",
    "topic": "Generation & Conduction of Nerve Impulse",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Generation & Conduction of Nerve Impulse in Neural Control and Coordination.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Generation & Conduction of Nerve Impulse.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Generation & Conduction of Nerve Impulse Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-neural-control-and-coordination-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Neural Control and Coordination",
    "topic": "Synaptic Transmission",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Synaptic Transmission in Neural Control and Coordination.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Synaptic Transmission.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Synaptic Transmission Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-neural-control-and-coordination-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Neural Control and Coordination",
    "topic": "Central Nervous System (Brain & Spinal Cord)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Central Nervous System (Brain & Spinal Cord) in Neural Control and Coordination.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Central Nervous System (Brain & Spinal Cord).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Central Nervous System (Brain & Spinal Cord) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-neural-control-and-coordination-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Neural Control and Coordination",
    "topic": "Reflex Action & Reflex Arc",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Reflex Action & Reflex Arc in Neural Control and Coordination.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Reflex Action & Reflex Arc.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Reflex Action & Reflex Arc Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-chemical-coordination-and-integration-1",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Chemical Coordination and Integration",
    "topic": "Endocrine Glands & Hormones Overview",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Endocrine Glands & Hormones Overview in Chemical Coordination and Integration.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Endocrine Glands & Hormones Overview.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Endocrine Glands & Hormones Overview Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-chemical-coordination-and-integration-2",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Chemical Coordination and Integration",
    "topic": "Pituitary Gland & Hypothalamus",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Pituitary Gland & Hypothalamus in Chemical Coordination and Integration.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Pituitary Gland & Hypothalamus.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Pituitary Gland & Hypothalamus Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-chemical-coordination-and-integration-3",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Chemical Coordination and Integration",
    "topic": "Thyroid & Parathyroid Glands",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Thyroid & Parathyroid Glands in Chemical Coordination and Integration.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Thyroid & Parathyroid Glands.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Thyroid & Parathyroid Glands Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-chemical-coordination-and-integration-4",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Chemical Coordination and Integration",
    "topic": "Adrenal Gland Hormones",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Adrenal Gland Hormones in Chemical Coordination and Integration.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Adrenal Gland Hormones.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Adrenal Gland Hormones Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-11-chemical-coordination-and-integration-5",
    "subject": "Biology",
    "classLevel": "11",
    "chapter": "Chemical Coordination and Integration",
    "topic": "Mechanism of Hormone Action",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Mechanism of Hormone Action in Chemical Coordination and Integration.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Mechanism of Hormone Action.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mechanism of Hormone Action Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-sexual-reproduction-in-flowering-plants-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Sexual Reproduction in Flowering Plants",
    "topic": "Flower Structure & Microsporogenesis",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Flower Structure & Microsporogenesis in Sexual Reproduction in Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Flower Structure & Microsporogenesis.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Flower Structure & Microsporogenesis Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-sexual-reproduction-in-flowering-plants-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Sexual Reproduction in Flowering Plants",
    "topic": "Megasporogenesis & Embryo Sac",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Megasporogenesis & Embryo Sac in Sexual Reproduction in Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Megasporogenesis & Embryo Sac.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Megasporogenesis & Embryo Sac Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-sexual-reproduction-in-flowering-plants-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Sexual Reproduction in Flowering Plants",
    "topic": "Pollination Types & Agents",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Pollination Types & Agents in Sexual Reproduction in Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Pollination Types & Agents.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Pollination Types & Agents Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-sexual-reproduction-in-flowering-plants-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Sexual Reproduction in Flowering Plants",
    "topic": "Double Fertilization & Triple Fusion",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Double Fertilization & Triple Fusion in Sexual Reproduction in Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Double Fertilization & Triple Fusion.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Double Fertilization & Triple Fusion Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-sexual-reproduction-in-flowering-plants-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Sexual Reproduction in Flowering Plants",
    "topic": "Endosperm, Embryo & Seed Development",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Endosperm, Embryo & Seed Development in Sexual Reproduction in Flowering Plants.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Endosperm, Embryo & Seed Development.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Endosperm, Embryo & Seed Development Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-reproduction-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Reproduction",
    "topic": "Male Reproductive System Anatomy",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Male Reproductive System Anatomy in Human Reproduction.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Male Reproductive System Anatomy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Male Reproductive System Anatomy Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-reproduction-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Reproduction",
    "topic": "Female Reproductive System Anatomy",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Female Reproductive System Anatomy in Human Reproduction.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Female Reproductive System Anatomy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Female Reproductive System Anatomy Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-reproduction-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Reproduction",
    "topic": "Spermatogenesis & Oogenesis",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Spermatogenesis & Oogenesis in Human Reproduction.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Spermatogenesis & Oogenesis.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Spermatogenesis & Oogenesis Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-reproduction-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Reproduction",
    "topic": "Menstrual Cycle Hormonal Regulation",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Menstrual Cycle Hormonal Regulation in Human Reproduction.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Menstrual Cycle Hormonal Regulation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Menstrual Cycle Hormonal Regulation Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-reproduction-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Reproduction",
    "topic": "Fertilization, Cleavage & Implantation",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Fertilization, Cleavage & Implantation in Human Reproduction.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Fertilization, Cleavage & Implantation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Fertilization, Cleavage & Implantation Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-reproductive-health-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Reproductive Health",
    "topic": "Reproductive Health Problems & Strategies",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Reproductive Health Problems & Strategies in Reproductive Health.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Reproductive Health Problems & Strategies.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Reproductive Health Problems & Strategies Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-reproductive-health-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Reproductive Health",
    "topic": "Contraceptive Methods (Barrier, IUDs, Oral)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Contraceptive Methods (Barrier, IUDs, Oral) in Reproductive Health.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Contraceptive Methods (Barrier, IUDs, Oral).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Contraceptive Methods (Barrier, IUDs, Oral) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-reproductive-health-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Reproductive Health",
    "topic": "Medical Termination of Pregnancy (MTP)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Medical Termination of Pregnancy (MTP) in Reproductive Health.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Medical Termination of Pregnancy (MTP).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Medical Termination of Pregnancy (MTP) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-reproductive-health-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Reproductive Health",
    "topic": "Sexually Transmitted Infections (STIs)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Sexually Transmitted Infections (STIs) in Reproductive Health.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Sexually Transmitted Infections (STIs).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Sexually Transmitted Infections (STIs) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-reproductive-health-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Reproductive Health",
    "topic": "Infertility & ART (IVF, ICSI, ZIFT)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Infertility & ART (IVF, ICSI, ZIFT) in Reproductive Health.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Infertility & ART (IVF, ICSI, ZIFT).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Infertility & ART (IVF, ICSI, ZIFT) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-principles-of-inheritance-and-variation-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Principles of Inheritance and Variation",
    "topic": "Mendel's Laws of Inheritance",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Mendel's Laws of Inheritance.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-principles-of-inheritance-and-variation-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Principles of Inheritance and Variation",
    "topic": "Incomplete Dominance & Codominance",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Incomplete Dominance & Codominance.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-principles-of-inheritance-and-variation-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Principles of Inheritance and Variation",
    "topic": "Chromosomal Theory of Inheritance",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Chromosomal Theory of Inheritance.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-principles-of-inheritance-and-variation-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Principles of Inheritance and Variation",
    "topic": "Linkage & Genetic Recombination",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Linkage & Genetic Recombination.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-principles-of-inheritance-and-variation-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Principles of Inheritance and Variation",
    "topic": "Mendelian & Chromosomal Disorders",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Mendelian & Chromosomal Disorders.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-molecular-basis-of-inheritance-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Molecular Basis of Inheritance",
    "topic": "DNA as Genetic Material (Griffith, Hershey-Chase)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for DNA as Genetic Material (Griffith, Hershey-Chase).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-molecular-basis-of-inheritance-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Molecular Basis of Inheritance",
    "topic": "Structure of DNA & RNA",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Structure of DNA & RNA.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-molecular-basis-of-inheritance-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Molecular Basis of Inheritance",
    "topic": "DNA Replication Mechanism",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for DNA Replication Mechanism.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-molecular-basis-of-inheritance-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Molecular Basis of Inheritance",
    "topic": "Transcription & Post-transcriptional Processing",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Transcription & Post-transcriptional Processing.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-molecular-basis-of-inheritance-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Molecular Basis of Inheritance",
    "topic": "Genetic Code & Translation",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Genetic Code & Translation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-molecular-basis-of-inheritance-6",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Molecular Basis of Inheritance",
    "topic": "Lac Operon Regulation",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Mendelian inheritance ratios, linkage, dihybrid crosses, and Hardy-Weinberg equilibrium.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Lac Operon Regulation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Mendelian Phenotypic & Genotypic Ratios",
        "formula": "\\text{Monohybrid: } 3:1 \\text{ (Phenotypic)}, \\, 1:2:1 \\text{ (Genotypic)}; \\quad \\text{Dihybrid: } 9:3:3:1 \\text{ (Phenotypic)}",
        "variables": "Dominant vs recessive alleles, independent assortment",
        "examTip": "Test cross (F₁ × Homozygous Recessive) yields 1:1 for monohybrid, 1:1:1:1 for dihybrid.",
        "trap": "Linked genes do NOT follow independent assortment; parental phenotypes exceed 50%."
      },
      {
        "name": "Hardy-Weinberg Genetic Equilibrium",
        "formula": "p + q = 1, \\quad p^2 + 2pq + q^2 = 1",
        "variables": "p = Frequency of dominant allele (A), q = Frequency of recessive allele (a), 2pq = Heterozygotes (Aa)",
        "examTip": "To find q, always take square root of homozygous recessive phenotype frequency: q = √(q²).",
        "trap": "Do not confuse allele frequency (p, q) with genotype frequency (p², 2pq, q²)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-evolution-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Evolution",
    "topic": "Origin of Life Theories",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Origin of Life Theories in Evolution.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Origin of Life Theories.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Origin of Life Theories Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-evolution-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Evolution",
    "topic": "Evidences of Evolution (Homologous/Analogous)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Evidences of Evolution (Homologous/Analogous) in Evolution.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Evidences of Evolution (Homologous/Analogous).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Evidences of Evolution (Homologous/Analogous) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-evolution-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Evolution",
    "topic": "Darwinian Theory & Natural Selection",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Darwinian Theory & Natural Selection in Evolution.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Darwinian Theory & Natural Selection.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Darwinian Theory & Natural Selection Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-evolution-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Evolution",
    "topic": "Hardy-Weinberg Principle & Calculation",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Hardy-Weinberg Principle & Calculation in Evolution.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Hardy-Weinberg Principle & Calculation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Hardy-Weinberg Principle & Calculation Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-evolution-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Evolution",
    "topic": "Human Evolution Stages",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Human Evolution Stages in Evolution.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Human Evolution Stages.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Human Evolution Stages Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-health-and-disease-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Health and Disease",
    "topic": "Pathogens & Common Infectious Diseases",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Pathogens & Common Infectious Diseases in Human Health and Disease.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Pathogens & Common Infectious Diseases.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Pathogens & Common Infectious Diseases Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-health-and-disease-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Health and Disease",
    "topic": "Innate & Acquired Immunity",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Innate & Acquired Immunity in Human Health and Disease.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Innate & Acquired Immunity.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Innate & Acquired Immunity Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-health-and-disease-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Health and Disease",
    "topic": "Vaccination & Immunization",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Vaccination & Immunization in Human Health and Disease.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Vaccination & Immunization.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Vaccination & Immunization Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-health-and-disease-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Health and Disease",
    "topic": "Allergies & Autoimmune Diseases",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Allergies & Autoimmune Diseases in Human Health and Disease.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Allergies & Autoimmune Diseases.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Allergies & Autoimmune Diseases Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-health-and-disease-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Health and Disease",
    "topic": "AIDS & Cancer Pathophysiology",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for AIDS & Cancer Pathophysiology in Human Health and Disease.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for AIDS & Cancer Pathophysiology.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "AIDS & Cancer Pathophysiology Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-human-health-and-disease-6",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Human Health and Disease",
    "topic": "Drugs & Alcohol Abuse",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Drugs & Alcohol Abuse in Human Health and Disease.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Drugs & Alcohol Abuse.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Drugs & Alcohol Abuse Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-microbes-in-human-welfare-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Microbes in Human Welfare",
    "topic": "Microbes in Household Food Processing",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Microbes in Household Food Processing in Microbes in Human Welfare.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Microbes in Household Food Processing.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Microbes in Household Food Processing Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-microbes-in-human-welfare-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Microbes in Human Welfare",
    "topic": "Microbes in Industrial Production (Antibiotics)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Microbes in Industrial Production (Antibiotics) in Microbes in Human Welfare.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Microbes in Industrial Production (Antibiotics).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Microbes in Industrial Production (Antibiotics) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-microbes-in-human-welfare-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Microbes in Human Welfare",
    "topic": "Sewage Treatment & Biological Oxygen Demand (BOD)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Sewage Treatment & Biological Oxygen Demand (BOD) in Microbes in Human Welfare.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Sewage Treatment & Biological Oxygen Demand (BOD).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Sewage Treatment & Biological Oxygen Demand (BOD) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-microbes-in-human-welfare-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Microbes in Human Welfare",
    "topic": "Biogas Production by Methanogens",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Biogas Production by Methanogens in Microbes in Human Welfare.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Biogas Production by Methanogens.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biogas Production by Methanogens Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-microbes-in-human-welfare-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Microbes in Human Welfare",
    "topic": "Biocontrol Agents & Biofertilizers",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Biocontrol Agents & Biofertilizers in Microbes in Human Welfare.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Biocontrol Agents & Biofertilizers.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Biocontrol Agents & Biofertilizers Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biotechnology--principles-and-processes-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biotechnology: Principles and Processes",
    "topic": "Restriction Endonucleases & DNA Ligase",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Restriction Endonucleases & DNA Ligase in Biotechnology: Principles and Processes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Restriction Endonucleases & DNA Ligase.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Restriction Endonucleases & DNA Ligase Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biotechnology--principles-and-processes-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biotechnology: Principles and Processes",
    "topic": "Gel Electrophoresis Separation",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Gel Electrophoresis Separation in Biotechnology: Principles and Processes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Gel Electrophoresis Separation.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Gel Electrophoresis Separation Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biotechnology--principles-and-processes-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biotechnology: Principles and Processes",
    "topic": "Cloning Vectors (pBR322 Features)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Cloning Vectors (pBR322 Features) in Biotechnology: Principles and Processes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Cloning Vectors (pBR322 Features).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Cloning Vectors (pBR322 Features) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biotechnology--principles-and-processes-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biotechnology: Principles and Processes",
    "topic": "Polymerase Chain Reaction (PCR) Steps",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Polymerase Chain Reaction (PCR) Steps in Biotechnology: Principles and Processes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Polymerase Chain Reaction (PCR) Steps.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Polymerase Chain Reaction (PCR) Steps Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biotechnology--principles-and-processes-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biotechnology: Principles and Processes",
    "topic": "Bioreactors & Downstream Processing",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Bioreactors & Downstream Processing in Biotechnology: Principles and Processes.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Bioreactors & Downstream Processing.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bioreactors & Downstream Processing Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biotechnology-and-its-applications-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biotechnology and its Applications",
    "topic": "Bt Crops & Pest Resistance (RNAi)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Bt Crops & Pest Resistance (RNAi) in Biotechnology and its Applications.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Bt Crops & Pest Resistance (RNAi).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Bt Crops & Pest Resistance (RNAi) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biotechnology-and-its-applications-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biotechnology and its Applications",
    "topic": "Genetically Engineered Insulin",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Genetically Engineered Insulin in Biotechnology and its Applications.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Genetically Engineered Insulin.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Genetically Engineered Insulin Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biotechnology-and-its-applications-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biotechnology and its Applications",
    "topic": "Gene Therapy (ADA Deficiency)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Gene Therapy (ADA Deficiency) in Biotechnology and its Applications.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Gene Therapy (ADA Deficiency).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Gene Therapy (ADA Deficiency) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biotechnology-and-its-applications-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biotechnology and its Applications",
    "topic": "Transgenic Animals & Molecular Diagnosis",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Transgenic Animals & Molecular Diagnosis in Biotechnology and its Applications.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Transgenic Animals & Molecular Diagnosis.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Transgenic Animals & Molecular Diagnosis Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biotechnology-and-its-applications-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biotechnology and its Applications",
    "topic": "Ethical Issues & Biopiracy",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Ethical Issues & Biopiracy in Biotechnology and its Applications.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ethical Issues & Biopiracy.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Ethical Issues & Biopiracy Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-organisms-and-populations-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Organisms and Populations",
    "topic": "Abiotic Factors & Adaptations",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Abiotic Factors & Adaptations in Organisms and Populations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Abiotic Factors & Adaptations.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Abiotic Factors & Adaptations Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-organisms-and-populations-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Organisms and Populations",
    "topic": "Population Attributes & Pyramids",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Population Attributes & Pyramids in Organisms and Populations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Population Attributes & Pyramids.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Population Attributes & Pyramids Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-organisms-and-populations-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Organisms and Populations",
    "topic": "Population Growth Models (Exponential/Logistic)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Population Growth Models (Exponential/Logistic) in Organisms and Populations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Population Growth Models (Exponential/Logistic).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Population Growth Models (Exponential/Logistic) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-organisms-and-populations-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Organisms and Populations",
    "topic": "Population Interactions (Mutualism, Competition, Predation)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Population Interactions (Mutualism, Competition, Predation) in Organisms and Populations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Population Interactions (Mutualism, Competition, Predation).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Population Interactions (Mutualism, Competition, Predation) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-organisms-and-populations-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Organisms and Populations",
    "topic": "Parasitism & Commensalism",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Parasitism & Commensalism in Organisms and Populations.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Parasitism & Commensalism.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Parasitism & Commensalism Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-ecosystem-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Ecosystem",
    "topic": "Ecosystem Structure & Stratification",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Ecosystem Structure & Stratification in Ecosystem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ecosystem Structure & Stratification.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Ecosystem Structure & Stratification Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-ecosystem-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Ecosystem",
    "topic": "Productivity (GPP & NPP)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Productivity (GPP & NPP) in Ecosystem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Productivity (GPP & NPP).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Productivity (GPP & NPP) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-ecosystem-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Ecosystem",
    "topic": "Decomposition Process & Factors",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Decomposition Process & Factors in Ecosystem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Decomposition Process & Factors.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Decomposition Process & Factors Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-ecosystem-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Ecosystem",
    "topic": "Energy Flow & 10% Ecological Law",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Energy Flow & 10% Ecological Law in Ecosystem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Energy Flow & 10% Ecological Law.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Energy Flow & 10% Ecological Law Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-ecosystem-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Ecosystem",
    "topic": "Ecological Pyramids (Number, Biomass, Energy)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Ecological Pyramids (Number, Biomass, Energy) in Ecosystem.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ecological Pyramids (Number, Biomass, Energy).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Ecological Pyramids (Number, Biomass, Energy) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biodiversity-and-conservation-1",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biodiversity and Conservation",
    "topic": "Levels & Patterns of Biodiversity (Latitudinal Gradient)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Levels & Patterns of Biodiversity (Latitudinal Gradient) in Biodiversity and Conservation.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Levels & Patterns of Biodiversity (Latitudinal Gradient).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Levels & Patterns of Biodiversity (Latitudinal Gradient) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biodiversity-and-conservation-2",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biodiversity and Conservation",
    "topic": "Species-Area Relationship (Alexander von Humboldt)",
    "weightage": "High",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Species-Area Relationship (Alexander von Humboldt) in Biodiversity and Conservation.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Species-Area Relationship (Alexander von Humboldt).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Species-Area Relationship (Alexander von Humboldt) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biodiversity-and-conservation-3",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biodiversity and Conservation",
    "topic": "Loss of Biodiversity & Evil Quartet",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Loss of Biodiversity & Evil Quartet in Biodiversity and Conservation.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Loss of Biodiversity & Evil Quartet.",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Loss of Biodiversity & Evil Quartet Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biodiversity-and-conservation-4",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biodiversity and Conservation",
    "topic": "In-situ Conservation (National Parks, Sanctuaries)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for In-situ Conservation (National Parks, Sanctuaries) in Biodiversity and Conservation.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for In-situ Conservation (National Parks, Sanctuaries).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "In-situ Conservation (National Parks, Sanctuaries) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  },
  {
    "id": "bio-12-biodiversity-and-conservation-5",
    "subject": "Biology",
    "classLevel": "12",
    "chapter": "Biodiversity and Conservation",
    "topic": "Ex-situ Conservation (Botanical Gardens, Cryopreservation)",
    "weightage": "Medium",
    "examTarget": "NEET",
    "concept": "Core theoretical derivations, quantitative laws, and exam problem-solving formulas for Ex-situ Conservation (Botanical Gardens, Cryopreservation) in Biodiversity and Conservation.",
    "shortNotes": [
      "Master the fundamental definitions and boundary conditions for Ex-situ Conservation (Botanical Gardens, Cryopreservation).",
      "Ensure consistent SI units throughout mathematical calculations.",
      "Watch for sign conventions and vector directions in problem setups.",
      "Frequently asked in both JEE Main and NEET numerical sections."
    ],
    "formulas": [
      {
        "name": "Ex-situ Conservation (Botanical Gardens, Cryopreservation) Key Formula / Ratio",
        "formula": "\\text{Population Density } N_t = N_0 + (B + I) - (D + E)",
        "variables": "N = Population size, B = Natality, I = Immigration, D = Mortality, E = Emigration",
        "examTip": "Logistic growth equation: dN/dt = rN((K - N)/K), where K is carrying capacity.",
        "trap": "Exponential growth curve is J-shaped; logistic growth is sigmoid (S-shaped)."
      }
    ],
    "keyPoints": [
      "High-yield concept tested regularly in previous year papers.",
      "Focus on graphical interpretations and limiting approximations."
    ]
  }
];

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
