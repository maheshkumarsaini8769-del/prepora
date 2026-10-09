import { SubjectName, ClassLevel } from '../types';
import { comprehensiveFormulaNotes } from './comprehensiveFormulaNotes';
import { questionService } from '../services/questionService';

export interface MindMapDetailItem {
  id: string;
  label?: string; // e.g. "▸ Measurement"
  description?: string; // e.g. "Comparison of a physical quantity with a standard unit."
  formula?: string; // KaTeX equation
  variables?: string;
  tags?: { text: string; color: 'pink' | 'blue' | 'green' | 'purple' | 'amber' | 'teal' }[];
  items?: string[]; // bullet points list
  table?: { col1: string; col2: string }[]; // 2-column key-value list (e.g. SI base units table)
  trap?: string;
  examTip?: string;
}

export interface MindMapSubtopicItem {
  id: string;
  title: string;
  details: MindMapDetailItem[];
  callout?: {
    title: string;
    type: 'example' | 'types' | 'least_count' | 'rule' | 'memory_trick';
    icon?: string;
    content: string | string[];
  };
}

export interface MindMapFloatingCard {
  id: string;
  title: string;
  badgeText?: string;
  badgeColor?: 'green' | 'yellow' | 'purple' | 'pink' | 'cyan' | 'blue';
  icon?: string; // emoji or identifier
  bullets?: string[];
  highlightText?: string;
  formula?: string;
  footerNote?: string;
}

export interface MindMapMajorBranch {
  id: string;
  branchNumber: number; // 1, 2, 3, 4, 5, 6
  title: string;
  colorTheme: 'blue' | 'orange' | 'green' | 'purple' | 'red' | 'teal';
  iconType: 'cube' | 'globe' | 'atom' | 'blocks' | 'calculator' | 'target' | 'dna' | 'flask' | 'compass' | 'microscope';
  subtopics: MindMapSubtopicItem[];
  floatingCards?: MindMapFloatingCard[];
}

export interface HorizontalMindMapData {
  chapterTitle: string;
  subject: SubjectName;
  classLevel: ClassLevel;
  exam: string;
  rootIllustrationType: string;
  rootIllustrationSrc?: string;
  summary: string;
  branches: MindMapMajorBranch[];
}

// ============================================================================
// 1. EXACT REFERENCE CHAPTER: Units and Measurements (Physics Class 11)
// ============================================================================
export const UNITS_AND_MEASUREMENTS_MINDMAP: HorizontalMindMapData = {
  chapterTitle: 'Units and Measurements',
  subject: 'Physics',
  classLevel: '11',
  exam: 'NEET & JEE',
  rootIllustrationType: 'measurement_tools',
  rootIllustrationSrc: '/assets/mindmaps/physics_units_measurements_reference.jpg',
  summary: 'Authoritative Left-to-Right 3D visual concept map matching standard NCERT NEET & JEE curriculum. Covers physical quantities, SI base units, derived units, dimensional analysis, errors, and significant figures.',
  branches: [
    {
      id: 'branch-1',
      branchNumber: 1,
      title: 'Measurement and Physical Quantities',
      colorTheme: 'blue',
      iconType: 'cube',
      subtopics: [
        {
          id: 'sub-1-1',
          title: 'Measurement',
          details: [
            {
              id: 'det-1-1-1',
              description: 'Comparison of a physical quantity with a standard unit.'
            }
          ],
          callout: {
            title: 'Example',
            type: 'example',
            icon: '📏',
            content: 'Length, mass, time etc.'
          }
        },
        {
          id: 'sub-1-2',
          title: 'Physical Quantity',
          details: [
            {
              id: 'det-1-2-1',
              description: 'Has magnitude and unit.'
            }
          ],
          callout: {
            title: 'Types',
            type: 'types',
            icon: '⚙️',
            content: ['Fundamental (Base)', 'Derived']
          }
        }
      ]
    },
    {
      id: 'branch-2',
      branchNumber: 2,
      title: 'Systems of Units',
      colorTheme: 'orange',
      iconType: 'globe',
      subtopics: [
        {
          id: 'sub-2-1',
          title: 'CGS System',
          details: [
            {
              id: 'det-2-1-1',
              description: 'Centimetre–Gram–Second',
              tags: [{ text: 'Units: cm, g, s', color: 'blue' }, { text: 'Used earlier', color: 'pink' }]
            }
          ]
        },
        {
          id: 'sub-2-2',
          title: 'MKS System',
          details: [
            {
              id: 'det-2-2-1',
              description: 'Metre–Kilogram–Second',
              tags: [{ text: 'Units: m, kg, s', color: 'blue' }, { text: 'Commonly used', color: 'teal' }]
            }
          ]
        },
        {
          id: 'sub-2-3',
          title: 'SI System',
          details: [
            {
              id: 'det-2-3-1',
              description: 'International System (7 base units)',
              tags: [{ text: 'Most widely used', color: 'blue' }, { text: 'Used in NEET', color: 'green' }]
            }
          ]
        }
      ]
    },
    {
      id: 'branch-3',
      branchNumber: 3,
      title: 'SI Base Units (7 Fundamental Units)',
      colorTheme: 'green',
      iconType: 'atom',
      subtopics: [
        {
          id: 'sub-3-1',
          title: '7 Base Dimensions',
          details: [
            {
              id: 'det-3-1-table',
              table: [
                { col1: 'Length', col2: 'metre (m)' },
                { col1: 'Mass', col2: 'kilogram (kg)' },
                { col1: 'Time', col2: 'second (s)' },
                { col1: 'Electric current', col2: 'ampere (A)' },
                { col1: 'Temperature', col2: 'kelvin (K)' },
                { col1: 'Amount of substance', col2: 'mole (mol)' },
                { col1: 'Luminous intensity', col2: 'candela (cd)' }
              ]
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'float-3-1',
          title: 'Important Points',
          badgeText: 'NCERT Core',
          badgeColor: 'green',
          bullets: [
            'All other units are derived from these 7 units.',
            'These are independent units.',
            'Dimension of each base unit is unique.'
          ]
        },
        {
          id: 'float-3-2',
          title: 'Memory Trick',
          badgeText: 'Mnemonic',
          badgeColor: 'yellow',
          icon: '💡',
          highlightText: 'My Grandfather Told Me About Long Chocolates',
          footerNote: 'Metre, Gram/Kg, Time, Mole, Ampere, Kelvin, Candela'
        }
      ]
    },
    {
      id: 'branch-4',
      branchNumber: 4,
      title: 'Derived Units',
      colorTheme: 'purple',
      iconType: 'blocks',
      subtopics: [
        {
          id: 'sub-4-1',
          title: 'Definition',
          details: [
            {
              id: 'det-4-1-1',
              description: 'Formed from base units using algebraic relations.'
            }
          ]
        },
        {
          id: 'sub-4-2',
          title: 'Examples',
          details: [
            {
              id: 'det-4-2-1',
              description: 'Speed, acceleration, force, pressure, energy, power etc.'
            }
          ]
        },
        {
          id: 'sub-4-3',
          title: 'Some Important Derived Units',
          details: [
            {
              id: 'det-4-3-table',
              items: [
                'Velocity = m s⁻¹',
                'Acceleration = m s⁻²',
                'Force = kg m s⁻² (N)',
                'Pressure = kg m⁻¹ s⁻² (Pa)',
                'Energy = kg m² s⁻² (J)',
                'Power = kg m² s⁻³ (W)',
                'Charge = A s (C)',
                'Potential = kg m² s⁻³ A⁻¹ (V)'
              ]
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'float-4-1',
          title: 'Molecular 3D Model',
          badgeText: 'Structure',
          badgeColor: 'purple',
          icon: '⚛️',
          highlightText: 'Covers dynamic relationships between mechanical and electromagnetic dimensions.'
        }
      ]
    },
    {
      id: 'branch-5',
      branchNumber: 5,
      title: 'Dimensional Analysis',
      colorTheme: 'red',
      iconType: 'calculator',
      subtopics: [
        {
          id: 'sub-5-1',
          title: 'Dimensional Formula',
          details: [
            {
              id: 'det-5-1-1',
              formula: '[Q] = [M^a L^b T^c]',
              variables: 'M = mass, L = length, T = time'
            }
          ]
        },
        {
          id: 'sub-5-2',
          title: 'Principle of Homogeneity',
          details: [
            {
              id: 'det-5-2-1',
              description: 'Dimensions on LHS = Dimensions on RHS in any valid physical equation.'
            }
          ]
        },
        {
          id: 'sub-5-3',
          title: 'Uses',
          details: [
            {
              id: 'det-5-3-1',
              description: 'Check formula correctness, deduce relations, convert units across systems.'
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'float-5-1',
          title: 'Examples',
          badgeText: 'High Yield',
          badgeColor: 'pink',
          icon: '📋',
          bullets: [
            '[F] = [M L T⁻²]',
            '[Kinetic energy] = [M L² T⁻²]',
            '[Pressure] = [M L⁻¹ T⁻²]'
          ]
        }
      ]
    },
    {
      id: 'branch-6',
      branchNumber: 6,
      title: 'Errors in Measurement',
      colorTheme: 'teal',
      iconType: 'target',
      subtopics: [
        {
          id: 'sub-6-1',
          title: 'Types of Errors',
          details: [
            {
              id: 'det-6-1-1',
              items: ['Systematic Error (Instrumental, Procedural)', 'Random Error', 'Observational / Gross Error']
            }
          ],
          callout: {
            title: 'Least Count & Error',
            type: 'least_count',
            icon: '📏',
            content: 'If least count = LC, maximum error = ± LC/2'
          }
        },
        {
          id: 'sub-6-2',
          title: 'True, Absolute & Relative Error',
          details: [
            {
              id: 'det-6-2-1',
              formula: '\\Delta x = |x_{\\text{measured}} - x_{\\text{true}}|',
              description: 'Absolute Error = |x_measured - x_true|'
            },
            {
              id: 'det-6-2-2',
              formula: '\\text{Relative Error} = \\frac{|x_{\\text{measured}} - x_{\\text{true}}|}{x_{\\text{true}}}',
              description: 'Relative Error = |Δx| / x_true'
            },
            {
              id: 'det-6-2-3',
              formula: '\\text{Percentage Error} = \\left( \\frac{|x_{\\text{measured}} - x_{\\text{true}}|}{x_{\\text{true}}} \\right) \\times 100\\%',
              description: 'Percentage Error'
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'float-6-1',
          title: 'Significant Figures',
          badgeText: 'Rules',
          badgeColor: 'purple',
          icon: '🧮',
          bullets: [
            'All non-zero digits are significant.',
            'Zeros between non-zero digits are significant.',
            'Leading zeros are not significant.',
            'Trailing zeros are significant only if decimal point is present.'
          ]
        }
      ]
    }
  ]
};

// ============================================================================
// 2. REQUIRED TEST CHAPTER: Laws of Motion (Physics Class 11)
// ============================================================================
export const LAWS_OF_MOTION_MINDMAP: HorizontalMindMapData = {
  chapterTitle: 'Laws of Motion',
  subject: 'Physics',
  classLevel: '11',
  exam: 'NEET & JEE',
  rootIllustrationType: 'newton_pulley',
  rootIllustrationSrc: '/assets/mindmaps/physics_laws_of_motion_3d.jpg',
  summary: 'Complete Left-to-Right 3D visual concept map for Laws of Motion covering Inertia, Newton Laws 1-3, Momentum & Impulse, Free Body Diagrams, Friction Dynamics, and Circular Motion Banking.',
  branches: [
    {
      id: 'lom-1',
      branchNumber: 1,
      title: "Newton's First Law & Inertia",
      colorTheme: 'blue',
      iconType: 'cube',
      subtopics: [
        {
          id: 'lom-1-1',
          title: 'Inertia Principle',
          details: [
            {
              id: 'lom-1-1-1',
              description: 'A body continues in its state of rest or uniform motion in a straight line unless acted on by net external force.'
            }
          ],
          callout: {
            title: 'Types of Inertia',
            type: 'types',
            icon: '🛑',
            content: ['Inertia of Rest', 'Inertia of Motion', 'Inertia of Direction']
          }
        },
        {
          id: 'lom-1-2',
          title: 'Reference Frames',
          details: [
            {
              id: 'lom-1-2-1',
              description: "Inertial frame (a = 0): Newton's laws valid directly. Non-inertial frame (accelerating): requires Pseudo Force."
            }
          ],
          callout: {
            title: 'Pseudo Force',
            type: 'rule',
            icon: '⚡',
            content: 'F_pseudo = -m a_frame (directed opposite to frame acceleration)'
          }
        }
      ]
    },
    {
      id: 'lom-2',
      branchNumber: 2,
      title: "Momentum & Second Law",
      colorTheme: 'orange',
      iconType: 'globe',
      subtopics: [
        {
          id: 'lom-2-1',
          title: 'Linear Momentum',
          details: [
            {
              id: 'lom-2-1-1',
              formula: '\\vec{p} = m\\vec{v}',
              description: 'Vector quantity in direction of velocity. SI unit: kg m s⁻¹.',
              tags: [{ text: 'SI: kg m/s', color: 'blue' }, { text: 'Vector', color: 'amber' }]
            }
          ]
        },
        {
          id: 'lom-2-2',
          title: "Newton's Second Law",
          details: [
            {
              id: 'lom-2-2-1',
              formula: '\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt} = m\\vec{a}',
              description: 'Rate of change of momentum is proportional to applied force.'
            }
          ]
        },
        {
          id: 'lom-2-3',
          title: 'Impulse of Force',
          details: [
            {
              id: 'lom-2-3-1',
              formula: '\\vec{J} = \\int \\vec{F}\\,dt = \\Delta\\vec{p}',
              description: 'Impulse equals change in linear momentum. Area under F-t curve.'
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'lom-float-2',
          title: 'Variable Mass Systems',
          badgeText: 'JEE Advanced',
          badgeColor: 'yellow',
          icon: '🚀',
          highlightText: 'F_ext + v_rel(dm/dt) = m(dv/dt)',
          footerNote: 'Rocket propulsion equation with upward thrust v_rel |dm/dt|.'
        }
      ]
    },
    {
      id: 'lom-3',
      branchNumber: 3,
      title: "Third Law & Conservation",
      colorTheme: 'green',
      iconType: 'atom',
      subtopics: [
        {
          id: 'lom-3-1',
          title: 'Action-Reaction Law',
          details: [
            {
              id: 'lom-3-1-1',
              formula: '\\vec{F}_{AB} = -\\vec{F}_{BA}',
              description: 'Forces always occur in pairs acting on two DIFFERENT bodies simultaneously.'
            }
          ]
        },
        {
          id: 'lom-3-2',
          title: 'Momentum Conservation',
          details: [
            {
              id: 'lom-3-2-1',
              description: 'If total external force is zero, total linear momentum of system remains constant.',
              formula: '\\sum \\vec{F}_{\\text{ext}} = 0 \\implies \\vec{P}_{\\text{initial}} = \\vec{P}_{\\text{final}}'
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'lom-float-3-1',
          title: 'Examiner Trap',
          badgeText: 'NEET Trap',
          badgeColor: 'pink',
          icon: '⚠️',
          bullets: [
            'Action and reaction NEVER cancel each other out.',
            'They act on DIFFERENT objects, not on the same object!'
          ]
        },
        {
          id: 'lom-float-3-2',
          title: 'Gun Recoil Velocity',
          badgeText: 'Formula',
          badgeColor: 'green',
          highlightText: 'v_recoil = -(m_bullet / M_gun) * v_bullet'
        }
      ]
    },
    {
      id: 'lom-4',
      branchNumber: 4,
      title: 'Free Body Diagrams & Pulleys',
      colorTheme: 'purple',
      iconType: 'blocks',
      subtopics: [
        {
          id: 'lom-4-1',
          title: 'FBD Rules',
          details: [
            {
              id: 'lom-4-1-1',
              description: 'Isolate body, remove all physical contacts, and replace with exact force vectors.'
            }
          ]
        },
        {
          id: 'lom-4-2',
          title: 'Common Contact Forces',
          details: [
            {
              id: 'lom-4-2-1',
              items: [
                'Normal Reaction (N ⟂ surface, N = mg cosθ on incline)',
                'Tension (T pulls along string away from object)',
                'Spring Force: F = -k x'
              ]
            }
          ]
        },
        {
          id: 'lom-4-3',
          title: 'Connected Pulley Systems',
          details: [
            {
              id: 'lom-4-3-1',
              formula: 'a = \\frac{(m_1 - m_2)g}{m_1 + m_2}, \\quad T = \\frac{2m_1 m_2 g}{m_1 + m_2}',
              description: 'Atwood machine acceleration and tension formula.'
            }
          ]
        }
      ]
    },
    {
      id: 'lom-5',
      branchNumber: 5,
      title: 'Friction Dynamics',
      colorTheme: 'red',
      iconType: 'calculator',
      subtopics: [
        {
          id: 'lom-5-1',
          title: 'Static Friction (fs)',
          details: [
            {
              id: 'lom-5-1-1',
              formula: 'f_s \\le \\mu_s N, \\quad f_{s,\\max} = \\mu_s N',
              description: 'Self-adjusting force matching applied force until reaching limiting friction.'
            }
          ]
        },
        {
          id: 'lom-5-2',
          title: 'Kinetic Friction (fk)',
          details: [
            {
              id: 'lom-5-2-1',
              formula: 'f_k = \\mu_k N',
              description: 'Opposes relative sliding motion. Independent of surface area and speed.'
            }
          ]
        },
        {
          id: 'lom-5-3',
          title: 'Angle of Repose',
          details: [
            {
              id: 'lom-5-3-1',
              formula: '\\tan\\alpha = \\mu_s',
              description: 'Angle of inclined plane at which a body just begins to slide down.'
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'lom-float-5',
          title: 'Critical Friction Rule',
          badgeText: 'Examiner Trap',
          badgeColor: 'pink',
          icon: '⚠️',
          bullets: [
            'Static friction is NOT always equal to μ_s N!',
            'f_s = F_applied until F_applied exceeds limiting value μ_s N.'
          ]
        }
      ]
    },
    {
      id: 'lom-6',
      branchNumber: 6,
      title: 'Circular Motion & Banking',
      colorTheme: 'teal',
      iconType: 'target',
      subtopics: [
        {
          id: 'lom-6-1',
          title: 'Centripetal Force',
          details: [
            {
              id: 'lom-6-1-1',
              formula: 'F_c = \\frac{mv^2}{r} = m\\omega^2 r',
              description: 'Net radial force directed towards center needed for circular trajectory.'
            }
          ]
        },
        {
          id: 'lom-6-2',
          title: 'Level Road Turn',
          details: [
            {
              id: 'lom-6-2-1',
              formula: 'v_{\\max} = \\sqrt{\\mu_s r g}',
              description: 'Maximum velocity on unbanked curve without skidding.'
            }
          ]
        },
        {
          id: 'lom-6-3',
          title: 'Banked Road Curves',
          details: [
            {
              id: 'lom-6-3-1',
              formula: 'v_{\\text{opt}} = \\sqrt{rg\\tan\\theta}, \\quad v_{\\max} = \\sqrt{\\frac{rg(\\mu + \\tan\\theta)}{1 - \\mu\\tan\\theta}}',
              description: 'Optimum banking angle without relying on road friction.'
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'lom-float-6',
          title: 'Centrifugal Force',
          badgeText: 'Frame Dependent',
          badgeColor: 'purple',
          icon: '🔄',
          highlightText: 'F_cf = mω²r radially outward',
          footerNote: 'Valid strictly in rotating non-inertial frame of reference!'
        }
      ]
    }
  ]
};

// ============================================================================
// 3. REQUIRED TEST CHAPTER: Chemical Bonding (Chemistry Class 11)
// ============================================================================
export const CHEMICAL_BONDING_MINDMAP: HorizontalMindMapData = {
  chapterTitle: 'Chemical Bonding and Molecular Structure',
  subject: 'Chemistry',
  classLevel: '11',
  exam: 'NEET & JEE',
  rootIllustrationType: 'chemical_orbitals',
  rootIllustrationSrc: '/assets/mindmaps/chemistry_bonding_3d.jpg',
  summary: 'Left-to-Right 3D visual concept map for Chemical Bonding covering Lewis Octet Rule, Ionic Bonding & Lattice Energy, VSEPR Molecular Geometry, Hybridization, Molecular Orbital Theory (MOT), and Hydrogen Bonding.',
  branches: [
    {
      id: 'cb-1',
      branchNumber: 1,
      title: 'Octet Rule & Lewis Structures',
      colorTheme: 'blue',
      iconType: 'cube',
      subtopics: [
        {
          id: 'cb-1-1',
          title: 'Octet Concept',
          details: [
            {
              id: 'cb-1-1-1',
              description: 'Atoms combine by transfer or sharing of electrons to attain noble gas configuration (ns² np⁶).'
            }
          ]
        },
        {
          id: 'cb-1-2',
          title: 'Formal Charge',
          details: [
            {
              id: 'cb-1-2-1',
              formula: '\\text{FC} = V - L - \\frac{1}{2}S',
              variables: 'V = valence e⁻, L = lone pair e⁻, S = shared bonding e⁻'
            }
          ]
        },
        {
          id: 'cb-1-3',
          title: 'Octet Limitations',
          details: [
            {
              id: 'cb-1-3-1',
              items: [
                'Incomplete octet (BeCl₂, BF₃)',
                'Odd electron species (NO, NO₂)',
                'Expanded octet (PCl₅, SF₆, IF₇)'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cb-2',
      branchNumber: 2,
      title: 'Ionic Bond & Fajans Rules',
      colorTheme: 'orange',
      iconType: 'globe',
      subtopics: [
        {
          id: 'cb-2-1',
          title: 'Lattice Enthalpy (U)',
          details: [
            {
              id: 'cb-2-1-1',
              formula: 'U \\propto \\frac{|q_1 q_2|}{r_0}',
              description: 'Energy released when 1 mole ionic solid forms from constituent gaseous ions.'
            }
          ]
        },
        {
          id: 'cb-2-2',
          title: "Fajans' Rules (Covalency)",
          details: [
            {
              id: 'cb-2-2-1',
              items: [
                'Small cation size → high polarizing power',
                'Large anion size → high polarizability',
                'High charge on cation / anion',
                'Pseudo noble gas cation (18e⁻) > noble gas (8e⁻)'
              ]
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'cb-float-2',
          title: 'NEET High-Yield Trap',
          badgeText: 'Fajans Rule',
          badgeColor: 'pink',
          icon: '⚠️',
          highlightText: 'LiCl is more covalent than NaCl',
          footerNote: 'Li⁺ has tiny radius, causing massive anion electron cloud distortion.'
        }
      ]
    },
    {
      id: 'cb-3',
      branchNumber: 3,
      title: 'VSEPR Molecular Geometry',
      colorTheme: 'green',
      iconType: 'atom',
      subtopics: [
        {
          id: 'cb-3-1',
          title: 'Repulsion Order',
          details: [
            {
              id: 'cb-3-1-1',
              description: 'Lone Pair - Lone Pair > Lone Pair - Bond Pair > Bond Pair - Bond Pair.'
            }
          ]
        },
        {
          id: 'cb-3-2',
          title: 'Geometry vs Shape',
          details: [
            {
              id: 'cb-3-2-table',
              table: [
                { col1: '2 pairs (BeCl₂)', col2: 'Linear (180°)' },
                { col1: '3 pairs (BF₃)', col2: 'Trigonal Planar (120°)' },
                { col1: '4 pairs (CH₄)', col2: 'Tetrahedral (109.5°)' },
                { col1: 'NH₃ (3 bp + 1 lp)', col2: 'Pyramidal (107°)' },
                { col1: 'H₂O (2 bp + 2 lp)', col2: 'Bent / V-shaped (104.5°)' },
                { col1: 'PCl₅ (5 bp)', col2: 'Trigonal Bipyramidal' },
                { col1: 'SF₆ (6 bp)', col2: 'Octahedral (90°)' }
              ]
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'cb-float-3',
          title: 'Memory Trick',
          badgeText: 'Angles',
          badgeColor: 'yellow',
          icon: '💡',
          bullets: [
            'Each lone pair on central atom decreases standard bond angle by ~2° to 2.5° due to repulsion.'
          ]
        }
      ]
    },
    {
      id: 'cb-4',
      branchNumber: 4,
      title: 'Valence Bond & Hybridization',
      colorTheme: 'purple',
      iconType: 'blocks',
      subtopics: [
        {
          id: 'cb-4-1',
          title: 'Sigma (σ) vs Pi (π) Bonds',
          details: [
            {
              id: 'cb-4-1-1',
              description: 'σ bond: axial orbital overlap (strong). π bond: lateral / sideways overlap (weaker).'
            }
          ]
        },
        {
          id: 'cb-4-2',
          title: 'Steric Number Method',
          details: [
            {
              id: 'cb-4-2-1',
              formula: '\\text{Steric Number} = \\text{Bond Pairs} + \\text{Lone Pairs}',
              description: '2 → sp, 3 → sp², 4 → sp³, 5 → sp³d, 6 → sp³d².'
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'cb-float-4',
          title: 'PCl₅ Axial vs Equatorial',
          badgeText: 'NEET & JEE',
          badgeColor: 'purple',
          icon: '⚡',
          bullets: [
            '2 axial P-Cl bonds are LONGER & WEAKER than 3 equatorial bonds due to repulsion from 3 pairs at 90°.'
          ]
        }
      ]
    },
    {
      id: 'cb-5',
      branchNumber: 5,
      title: 'Molecular Orbital Theory (MOT)',
      colorTheme: 'red',
      iconType: 'calculator',
      subtopics: [
        {
          id: 'cb-5-1',
          title: 'Bond Order Formula',
          details: [
            {
              id: 'cb-5-1-1',
              formula: '\\text{Bond Order} = \\frac{N_b - N_a}{2}',
              description: 'Nb = bonding electrons, Na = antibonding electrons. BO > 0 implies molecule is stable.'
            }
          ]
        },
        {
          id: 'cb-5-2',
          title: 'Orbital Energy Orders',
          details: [
            {
              id: 'cb-5-2-1',
              items: [
                '≤ 14e⁻ (B₂, C₂, N₂): σ1s < σ*1s < σ2s < σ*2s < (π2px = π2py) < σ2pz',
                '> 14e⁻ (O₂, F₂): σ1s < σ*1s < σ2s < σ*2s < σ2pz < (π2px = π2py)'
              ]
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'cb-float-5',
          title: 'O₂ Paramagnetism',
          badgeText: 'NTA Classic',
          badgeColor: 'pink',
          icon: '🧲',
          highlightText: 'O₂ has 2 unpaired electrons in π*2px & π*2py orbitals, proving paramagnetism!'
        }
      ]
    },
    {
      id: 'cb-6',
      branchNumber: 6,
      title: 'Dipole & Hydrogen Bonding',
      colorTheme: 'teal',
      iconType: 'target',
      subtopics: [
        {
          id: 'cb-6-1',
          title: 'Dipole Moment (μ)',
          details: [
            {
              id: 'cb-6-1-1',
              formula: '\\vec{\\mu} = q \\times d',
              description: 'Vector directed from positive to negative charge. Unit: Debye (D).'
            }
          ]
        },
        {
          id: 'cb-6-2',
          title: 'H-Bond Types',
          details: [
            {
              id: 'cb-6-2-1',
              items: [
                'Intermolecular H-bond (H₂O, HF, alcohol): elevates boiling point & viscosity',
                'Intramolecular H-bond (o-nitrophenol, salicylaldehyde): lowers boiling point'
              ]
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'cb-float-6',
          title: 'NH₃ vs NF₃ Dipole',
          badgeText: 'Reasoning',
          badgeColor: 'cyan',
          bullets: [
            'μ(NH₃) > μ(NF₃) because in NH₃, lone pair and N-H bond dipoles point in the SAME direction.'
          ]
        }
      ]
    }
  ]
};

// ============================================================================
// 4. REQUIRED TEST CHAPTER: Cell: The Unit of Life (Biology Class 11)
// ============================================================================
export const CELL_BIOLOGY_MINDMAP: HorizontalMindMapData = {
  chapterTitle: 'Cell: The Unit of Life',
  subject: 'Biology',
  classLevel: '11',
  exam: 'NEET-UG',
  rootIllustrationType: 'cell_ultrastructure',
  rootIllustrationSrc: '/assets/mindmaps/biology_cell_unit_of_life_3d.jpg',
  summary: 'Left-to-Right 3D visual concept map for Cell: The Unit of Life covering Cell Theory, Prokaryotes, Fluid Mosaic Plasma Membrane, Endomembrane Organelles, Semi-Autonomous Mitochondria/Plastids, and Nucleus Chromatin.',
  branches: [
    {
      id: 'cell-1',
      branchNumber: 1,
      title: 'Cell Theory & Discovery',
      colorTheme: 'blue',
      iconType: 'microscope',
      subtopics: [
        {
          id: 'cell-1-1',
          title: 'Historical Timeline',
          details: [
            {
              id: 'cell-1-1-1',
              items: [
                'Robert Hooke (1665): First cell observation (cork cell wall)',
                'Leeuwenhoek: First live cell under microscope',
                'Robert Brown (1831): Discovered nucleus'
              ]
            }
          ]
        },
        {
          id: 'cell-1-2',
          title: 'Cell Theory Formulation',
          details: [
            {
              id: 'cell-1-2-1',
              description: 'Schleiden (1838) & Schwann (1839). Modified by Rudolf Virchow (1855): "Omnis cellula-e cellula" (cells arise from pre-existing cells).'
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'cell-float-1',
          title: 'Cell Size Diversity',
          badgeText: 'NCERT Stats',
          badgeColor: 'blue',
          bullets: [
            'Mycoplasma: 0.3 μm (smallest)',
            'Bacteria: 3 to 5 μm',
            'Human RBC: 7.0 μm diameter',
            'Ostrich egg: largest isolated single cell'
          ]
        }
      ]
    },
    {
      id: 'cell-2',
      branchNumber: 2,
      title: 'Prokaryotic Cell Structure',
      colorTheme: 'orange',
      iconType: 'globe',
      subtopics: [
        {
          id: 'cell-2-1',
          title: 'Cell Envelope',
          details: [
            {
              id: 'cell-2-1-1',
              description: 'Three-layered envelope: Glycocalyx (capsule/slime layer) + Cell Wall (peptidoglycan) + Plasma Membrane.'
            }
          ]
        },
        {
          id: 'cell-2-2',
          title: 'Mesosomes & Flagella',
          details: [
            {
              id: 'cell-2-2-1',
              description: 'Infoldings of plasma membrane aiding respiration, cell wall synthesis, DNA replication. Flagellum parts: Filament, Hook, Basal body.'
            }
          ]
        },
        {
          id: 'cell-2-3',
          title: 'Genetic Material & Plasmids',
          details: [
            {
              id: 'cell-2-3-1',
              description: 'Naked circular dsDNA (nucleoid). Plasmids: small autonomous extrachromosomal rings conferring antibiotic resistance.'
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'cell-float-2',
          title: 'Prokaryotic Ribosomes',
          badgeText: '70S Units',
          badgeColor: 'yellow',
          icon: '🔬',
          highlightText: '50S + 30S = 70S ribosome',
          footerNote: 'Polysome/Polyribosome: mRNA translated simultaneously by multiple ribosomes.'
        }
      ]
    },
    {
      id: 'cell-3',
      branchNumber: 3,
      title: 'Plasma Membrane & Transport',
      colorTheme: 'green',
      iconType: 'atom',
      subtopics: [
        {
          id: 'cell-3-1',
          title: 'Fluid Mosaic Model (1972)',
          details: [
            {
              id: 'cell-3-1-1',
              description: 'Singer & Nicolson model: Phospholipid bilayer with integral and peripheral proteins floating like icebergs in a lipid sea.'
            }
          ]
        },
        {
          id: 'cell-3-2',
          title: 'Membrane Transport',
          details: [
            {
              id: 'cell-3-2-1',
              items: [
                'Passive Transport: Simple diffusion & osmosis along concentration gradient (no ATP)',
                'Facilitated Diffusion: Channel / carrier proteins (no ATP)',
                'Active Transport: Against gradient via Na⁺/K⁺ pump (requires ATP)'
              ]
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'cell-float-3',
          title: 'Human RBC Membrane',
          badgeText: 'NCERT Stat',
          badgeColor: 'green',
          bullets: [
            'Approximately 52% Protein',
            'Approximately 40% Lipids (phospholipids + cholesterol)'
          ]
        }
      ]
    },
    {
      id: 'cell-4',
      branchNumber: 4,
      title: 'Endomembrane System',
      colorTheme: 'purple',
      iconType: 'blocks',
      subtopics: [
        {
          id: 'cell-4-1',
          title: 'Endoplasmic Reticulum',
          details: [
            {
              id: 'cell-4-1-1',
              description: 'RER (studded with 80S ribosomes): protein synthesis & secretion. SER: lipid & steroid synthesis, drug detoxification.'
            }
          ]
        },
        {
          id: 'cell-4-2',
          title: 'Golgi Apparatus (Camillo Golgi 1898)',
          details: [
            {
              id: 'cell-4-2-1',
              description: 'Cis (forming) and trans (maturing) faces. Modifies and packages proteins into glycoproteins & glycolipids.'
            }
          ]
        },
        {
          id: 'cell-4-3',
          title: 'Lysosomes & Vacuoles',
          details: [
            {
              id: 'cell-4-3-1',
              description: 'Lysosomes: Hydrolytic enzymes (acidic pH). Vacuoles: Tonoplast membrane, maintains turgor in plant cells.'
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'cell-float-4',
          title: 'NEET Examiner Trap',
          badgeText: 'Crucial Exclusion',
          badgeColor: 'pink',
          icon: '⚠️',
          bullets: [
            'Mitochondria, Chloroplasts, and Peroxisomes are NOT part of the endomembrane system because their functions are uncoordinated with ER/Golgi!'
          ]
        }
      ]
    },
    {
      id: 'cell-5',
      branchNumber: 5,
      title: 'Mitochondria & Plastids',
      colorTheme: 'red',
      iconType: 'calculator',
      subtopics: [
        {
          id: 'cell-5-1',
          title: 'Mitochondria (Powerhouse)',
          details: [
            {
              id: 'cell-5-1-1',
              description: 'Double membrane; inner membrane cristae increase surface area. Matrix contains circular dsDNA, 70S ribosomes, F₀-F₁ ATP synthase.'
            }
          ]
        },
        {
          id: 'cell-5-2',
          title: 'Chloroplasts & Plastid Types',
          details: [
            {
              id: 'cell-5-2-1',
              items: [
                'Chloroplasts: Thylakoid grana + stroma (circular DNA, 70S ribosomes, Rubisco)',
                'Chromoplasts: Carotenoids (yellow, orange, red)',
                'Leucoplasts: Amyloplast (starch), Elaioplast (oils), Aleuroplast (protein)'
              ]
            }
          ]
        }
      ],
      floatingCards: [
        {
          id: 'cell-float-5',
          title: 'Semi-Autonomous Nature',
          badgeText: 'Evolution',
          badgeColor: 'yellow',
          bullets: [
            'Both possess circular dsDNA and 70S ribosomes.',
            'Replicate independently via binary fission.'
          ]
        }
      ]
    },
    {
      id: 'cell-6',
      branchNumber: 6,
      title: 'Nucleus, Chromosomes & Cilia',
      colorTheme: 'teal',
      iconType: 'target',
      subtopics: [
        {
          id: 'cell-6-1',
          title: 'Nucleus Structure',
          details: [
            {
              id: 'cell-6-1-1',
              description: 'Nuclear envelope with pores + nucleoplasm + nucleolus (non-membrane bound site for active rRNA synthesis).'
            }
          ]
        },
        {
          id: 'cell-6-2',
          title: 'Chromosome Shapes',
          details: [
            {
              id: 'cell-6-2-table',
              table: [
                { col1: 'Metacentric', col2: 'Middle centromere (V-shaped)' },
                { col1: 'Sub-metacentric', col2: 'Near middle (L-shaped)' },
                { col1: 'Acrocentric', col2: 'Near end (J-shaped)' },
                { col1: 'Telocentric', col2: 'Terminal centromere (I-shaped)' }
              ]
            }
          ]
        },
        {
          id: 'cell-6-3',
          title: 'Cytoskeleton & Axoneme',
          details: [
            {
              id: 'cell-6-3-1',
              description: 'Microfilaments, intermediate filaments, microtubules. Cilia/Flagella axoneme: 9+2 doublet pattern. Centriole: 9+0 triplet pattern.'
            }
          ]
        }
      ]
    }
  ]
};

// Map of canonical pre-populated mind maps
const CANONICAL_MAPS: Record<string, HorizontalMindMapData> = {
  'units and measurements': UNITS_AND_MEASUREMENTS_MINDMAP,
  'laws of motion': LAWS_OF_MOTION_MINDMAP,
  'chemical bonding and molecular structure': CHEMICAL_BONDING_MINDMAP,
  'chemical bonding': CHEMICAL_BONDING_MINDMAP,
  'cell: the unit of life': CELL_BIOLOGY_MINDMAP,
  'cell the unit of life': CELL_BIOLOGY_MINDMAP,
  'cell': CELL_BIOLOGY_MINDMAP
};

/**
 * Normalizes chapter name for canonical dictionary matching.
 */
function normalizeName(name: string): string {
  return (name || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
}

/**
 * Master Mind Map Retrieval and Synthesis Engine.
 * Guarantees that EVERY SINGLE CHAPTER in Physics, Chemistry, Biology, and Mathematics
 * receives the exact same Left-to-Right 6-branch horizontal hierarchy matching the reference image.
 */
export function getCanonicalMindMap(
  chapterName: string,
  subject: SubjectName = 'Physics',
  classLevel: ClassLevel = '11'
): HorizontalMindMapData {
  const norm = normalizeName(chapterName);

  // 1. Direct or fuzzy lookup in curated canonical maps
  for (const [key, map] of Object.entries(CANONICAL_MAPS)) {
    const keyNorm = normalizeName(key);
    if (norm === keyNorm || norm.includes(keyNorm) || keyNorm.includes(norm)) {
      return {
        ...map,
        chapterTitle: chapterName, // preserve user chapter title casing
        subject,
        classLevel
      };
    }
  }

  // 2. Intelligent Auto-Synthesis for ANY other chapter across NEET & JEE syllabus
  const formulaItems = comprehensiveFormulaNotes.filter(
    (item) =>
      item.subject.toLowerCase() === subject.toLowerCase() &&
      normalizeName(item.chapter) === norm
  );

  const fallbackTopics = questionService.getTopics(chapterName);
  const topicsToUse =
    formulaItems.length > 0
      ? formulaItems.map((f) => f.topic)
      : fallbackTopics.length > 0
      ? fallbackTopics
      : [
          'Fundamental Principles & Definitions',
          'Mathematical Equations & Calculations',
          'Key Laws & System Properties',
          'Mechanisms, Derivations & Processes',
          'Examiner Traps & Common Exceptions',
          'NEET & JEE Previous Year Numerical Applications'
        ];

  // Distribute topics into 6 canonical color-coded branches
  const branchThemes: Array<{
    titleSuffix: string;
    theme: MindMapMajorBranch['colorTheme'];
    icon: MindMapMajorBranch['iconType'];
  }> = [
    { titleSuffix: 'Core Principles & Definitions', theme: 'blue', icon: 'cube' },
    { titleSuffix: 'Governing Equations & Formulas', theme: 'orange', icon: 'globe' },
    { titleSuffix: 'System Classifications & Rules', theme: 'green', icon: 'atom' },
    { titleSuffix: 'Processes & Derived Relations', theme: 'purple', icon: 'blocks' },
    { titleSuffix: 'Examiner Traps & Special Cases', theme: 'red', icon: 'calculator' },
    { titleSuffix: 'High-Yield Applications & Tips', theme: 'teal', icon: 'target' }
  ];

  const branches: MindMapMajorBranch[] = branchThemes.map((config, bIdx) => {
    const assignedTopic = topicsToUse[bIdx % topicsToUse.length] || `Concept Section ${bIdx + 1}`;
    const formulaMatch = formulaItems.find(
      (f) => normalizeName(f.topic) === normalizeName(assignedTopic)
    ) || formulaItems[bIdx % (formulaItems.length || 1)];

    const subtopics: MindMapSubtopicItem[] = [];

    if (formulaMatch && formulaMatch.formulas && formulaMatch.formulas.length > 0) {
      formulaMatch.formulas.slice(0, 3).forEach((f, fIdx) => {
        subtopics.push({
          id: `dyn-sub-${bIdx}-${fIdx}`,
          title: f.name || `Subtopic ${fIdx + 1}`,
          details: [
            {
              id: `dyn-det-${bIdx}-${fIdx}`,
              formula: f.formula,
              variables: f.variables,
              description: f.examTip || `${f.name} fundamental mathematical rule for ${chapterName}.`,
              trap: f.trap
            }
          ]
        });
      });
    } else {
      subtopics.push({
        id: `dyn-sub-${bIdx}-1`,
        title: assignedTopic,
        details: [
          {
            id: `dyn-det-${bIdx}-1`,
            description: `Core NCERT syllabus concepts for ${assignedTopic} tested in ${subject}.`
          }
        ],
        callout: {
          title: bIdx === 0 ? 'Foundation' : bIdx === 4 ? 'Exam Trap' : 'Must Know',
          type: bIdx === 4 ? 'rule' : 'example',
          icon: bIdx === 4 ? '⚠️' : '⭐',
          content: `High-frequency topic in NEET & JEE official examination papers.`
        }
      });
    }

    const floatingCards: MindMapFloatingCard[] = [];
    if (bIdx === 2 || bIdx === 4 || bIdx === 5) {
      floatingCards.push({
        id: `dyn-float-${bIdx}`,
        title: bIdx === 4 ? 'Examiner Traps' : bIdx === 2 ? 'High-Yield Notes' : 'Memory Trick',
        badgeText: bIdx === 4 ? 'Warning' : 'NCERT',
        badgeColor: bIdx === 4 ? 'pink' : bIdx === 2 ? 'green' : 'yellow',
        icon: bIdx === 4 ? '⚠️' : '💡',
        bullets: [
          `Pay close attention to standard SI units and dimensional consistency in ${assignedTopic}.`,
          `Frequently asked in both Single-Choice and Assertion-Reason question formats.`
        ]
      });
    }

    return {
      id: `dyn-branch-${bIdx + 1}`,
      branchNumber: bIdx + 1,
      title: `${assignedTopic}`,
      colorTheme: config.theme,
      iconType: config.icon,
      subtopics,
      floatingCards: floatingCards.length > 0 ? floatingCards : undefined
    };
  });

  const illustrationSrc = resolveChapterIllustration(chapterName, subject);

  return {
    chapterTitle: chapterName,
    subject,
    classLevel,
    exam: subject === 'Biology' ? 'NEET-UG' : subject === 'Mathematics' ? 'JEE Main & Advanced' : 'NEET & JEE',
    rootIllustrationType: 'scientific_overview',
    rootIllustrationSrc: illustrationSrc,
    summary: `Structured Left-to-Right 3D visual concept map for ${chapterName} (${subject}). Aligned with NCERT syllabus and NEET/JEE examination standards.`,
    branches
  };
}

/**
 * Resolves the dedicated high-definition 3D concept poster for any given chapter
 * across Physics, Chemistry, Biology, and Mathematics.
 */
export function resolveChapterIllustration(chapterName: string, subject: SubjectName): string {
  const norm = normalizeName(chapterName);

  if (subject === 'Physics') {
    if (norm.includes('unit') || norm.includes('measurement') || norm.includes('mathematical tool') || norm.includes('vector')) {
      return '/assets/mindmaps/physics_units_measurements_reference.jpg';
    }
    if (norm.includes('atom') || norm.includes('nuclei') || norm.includes('nuclear')) {
      return '/assets/mindmaps/physics_atoms_3d.jpg';
    }
    if (norm.includes('optic') || norm.includes('ray') || norm.includes('wave optic') || norm.includes('electromagnetic wave') || norm.includes('light')) {
      return '/assets/mindmaps/physics_ray_optics_3d.jpg';
    }
    if (
      norm.includes('current') ||
      norm.includes('electric') ||
      norm.includes('charge') ||
      norm.includes('capacit') ||
      norm.includes('potenti') ||
      norm.includes('magnet') ||
      norm.includes('induct') ||
      norm.includes('alternating') ||
      norm.includes('circuit')
    ) {
      return '/assets/mindmaps/physics_current_electricity_3d.jpg';
    }
    if (norm.includes('gravitat') || norm.includes('planet') || norm.includes('rotat') || norm.includes('particle') || norm.includes('fluid')) {
      return '/assets/mindmaps/physics_gravitation_3d.jpg';
    }
    if (norm.includes('thermo') || norm.includes('heat') || norm.includes('kinetic') || norm.includes('thermal')) {
      return '/assets/mindmaps/thermodynamics_3d.jpg';
    }
    if (norm.includes('dual') || norm.includes('radiation') || norm.includes('photoelectric') || norm.includes('semiconductor')) {
      return '/assets/mindmaps/physics_dual_nature_3d.jpg';
    }
    // Mechanics: Laws of Motion, Work Energy Power, Motion in Straight Line / Plane, Oscillations, Waves, Solids
    return '/assets/mindmaps/physics_laws_of_motion_3d.jpg';
  }

  if (subject === 'Chemistry') {
    if (norm.includes('atom') || norm.includes('structure of atom')) {
      return '/assets/mindmaps/physics_atoms_3d.jpg';
    }
    if (norm.includes('thermo') || norm.includes('kinetic')) {
      return '/assets/mindmaps/chemistry_thermodynamics_3d.jpg';
    }
    if (
      norm.includes('equilib') ||
      norm.includes('ionic') ||
      norm.includes('solution') ||
      norm.includes('redox') ||
      norm.includes('electrochem')
    ) {
      return '/assets/mindmaps/chemistry_equilibrium_3d.jpg';
    }
    if (
      norm.includes('organic') ||
      norm.includes('hydrocarbon') ||
      norm.includes('halo') ||
      norm.includes('alcohol') ||
      norm.includes('phenol') ||
      norm.includes('ether') ||
      norm.includes('aldehyde') ||
      norm.includes('ketone') ||
      norm.includes('carboxylic') ||
      norm.includes('amine') ||
      norm.includes('biomolecule')
    ) {
      return '/assets/mindmaps/chemistry_organic_hydrocarbons_3d.jpg';
    }
    // Inorganic / Bonding / Periodic / Coordination / Some Basic Concepts
    return '/assets/mindmaps/chemistry_bonding_3d.jpg';
  }

  if (subject === 'Biology') {
    if (
      norm.includes('cell') ||
      norm.includes('biomolecule') ||
      norm.includes('organis') ||
      norm.includes('anatomy') ||
      norm.includes('tissue') ||
      norm.includes('fluid') ||
      norm.includes('breath') ||
      norm.includes('excret') ||
      norm.includes('locomot') ||
      norm.includes('neural') ||
      norm.includes('digest') ||
      norm.includes('chemical coord') ||
      norm.includes('health')
    ) {
      return '/assets/mindmaps/biology_cell_unit_of_life_3d.jpg';
    }
    if (
      norm.includes('photo') ||
      norm.includes('plant') ||
      norm.includes('respirat') ||
      norm.includes('growth') ||
      norm.includes('morphology') ||
      norm.includes('ecosystem')
    ) {
      return '/assets/mindmaps/biology_photosynthesis_3d.jpg';
    }
    if (norm.includes('reproduct')) {
      return '/assets/mindmaps/biology_human_reproduction_3d.jpg';
    }
    // Genetics / Inheritance / Molecular Basis / Evolution / Biotechnology / Ecology
    return '/assets/mindmaps/biology_inheritance_3d.jpg';
  }

  if (subject === 'Mathematics') {
    if (
      norm.includes('conic') ||
      norm.includes('line') ||
      norm.includes('geometr') ||
      norm.includes('vector') ||
      norm.includes('circle') ||
      norm.includes('trig')
    ) {
      return '/assets/mindmaps/mathematics_conic_sections_3d.jpg';
    }
    if (
      norm.includes('integral') ||
      norm.includes('deriv') ||
      norm.includes('limit') ||
      norm.includes('continu') ||
      norm.includes('different')
    ) {
      return '/assets/mindmaps/mathematics_integrals_3d.jpg';
    }
    // Algebra / Matrices / Determinants / Sets / Relations / Probability / Statistics
    return '/assets/mindmaps/mathematics_matrices_determinants_3d.jpg';
  }

  return '/assets/mindmaps/physics_laws_of_motion_3d.jpg';
}
