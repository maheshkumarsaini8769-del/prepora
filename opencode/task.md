# MASTER PROMPT: CLASS 11 COMPLETE NEET + JEE SYLLABUS DATABASE

## 1. PROJECT OBJECTIVE

Create a complete, highly detailed Class 11 syllabus database for an IIT-JEE and NEET preparation website.

The database must contain:

1. Class 11 Physics — all chapters, topics, subtopics and sub-subtopics.
2. Class 11 Chemistry — all chapters, topics, subtopics and sub-subtopics.
3. Class 11 Mathematics — all chapters, topics, subtopics and sub-subtopics.
4. Class 11 Biology — all chapters, topics, subtopics and sub-subtopics.

The system must support three learning modes:

- NEET Preparation
- JEE Main Preparation
- NCERT / School Learning

JEE Advanced topics must also be included in a separate syllabus layer wherever applicable.

IMPORTANT:
Do not assume that every NCERT chapter is included in the current entrance examination syllabus.

Verify exam-specific topics against the applicable official syllabus before marking them as included.

Official sources:
- NEET: https://neet.nta.nic.in/
- JEE Main: https://jeemain.nta.nic.in/
- NCERT: https://ncert.nic.in/

Use the official syllabus for the relevant academic session. Store the academic year and verification status with the data.

---

# 2. REQUIRED DATA HIERARCHY

Every subject must follow this exact hierarchy:

Class
  → Exam
    → Subject
      → Unit
        → Chapter
          → Topic
            → Subtopic
              → Detailed Concept
                → Formula / Diagram / Example / Question

Every chapter must have its own unique ID.

Every topic and subtopic must also have its own unique ID.

Never store an entire chapter as a single topic.

Never combine unrelated topics into one entry just to reduce the number of entries.

Do not omit small concepts, definitions, formulas, exceptions, diagrams, graphs, derivations or NCERT-listed examples that are relevant to the applicable syllabus.

---

# 3. PHYSICS: CLASS 11

Create a complete Physics chapter and topic inventory.

Use the following chapter groups as an initial discovery checklist, NOT as a substitute for official syllabus verification.

## Chapter 1: Units and Measurements

Inventory:
- Physical quantities
- Fundamental and derived quantities
- SI base units
- Derived units
- Unit conversion
- Dimensions and dimensional formulae
- Dimensional analysis
- Principle of dimensional homogeneity
- Applications of dimensional analysis
- Limitations of dimensional analysis
- Significant figures
- Rules for significant figures
- Scientific notation
- Accuracy and precision
- Least count
- Measurement errors
- Absolute error
- Relative error
- Percentage error
- Error propagation in sums, differences, products and quotients
- Measuring instruments and their relevant errors

## Chapter 2: Mathematical Tools and Vectors

Inventory:
- Basic algebra used in Physics
- Ratios and proportions
- Scientific notation
- Basic trigonometry
- Trigonometric identities
- Graph interpretation
- Slope of a graph
- Area under a graph
- Scalars and vectors
- Vector notation
- Vector magnitude
- Vector direction
- Vector addition
- Triangle law
- Parallelogram law
- Polygon law
- Vector subtraction
- Resolution of vectors
- Rectangular components
- Unit vectors
- Position vectors
- Dot product
- Cross product
- Relative vectors

Mark supporting mathematical tools separately if they are not independent official syllabus chapters.

## Chapter 3: Motion in a Straight Line

Inventory:
- Reference point and reference frame
- Position and position coordinates
- Distance and displacement
- Average speed
- Average velocity
- Instantaneous speed
- Instantaneous velocity
- Average acceleration
- Instantaneous acceleration
- Uniform motion
- Non-uniform motion
- Uniform acceleration
- Equations of uniformly accelerated motion
- Position-time graphs
- Velocity-time graphs
- Acceleration-time graphs
- Slope and area interpretation
- Free-fall motion
- Sign conventions
- Relative motion in one dimension

## Chapter 4: Motion in a Plane

Inventory:
- Two-dimensional motion
- Position vectors
- Displacement vectors
- Velocity components
- Acceleration components
- Vector representation of motion
- Projectile motion
- Horizontal projection
- Oblique projection
- Time of flight
- Maximum height
- Horizontal range
- Trajectory equation
- Horizontal circular motion
- Uniform circular motion
- Angular position
- Angular velocity
- Centripetal acceleration
- Relative velocity in two dimensions

## Chapter 5: Laws of Motion

Inventory:
- Force
- Inertia
- Newton's first law
- Newton's second law
- Newton's third law
- Momentum
- Impulse
- Conservation of momentum
- Free-body diagrams
- Normal reaction
- Tension
- Weight
- Contact forces
- Equilibrium of forces
- Connected bodies
- Pulley systems
- Friction
- Static friction
- Limiting friction
- Kinetic friction
- Coefficient of friction
- Angle of friction, where applicable
- Inclined planes
- Circular motion and force
- Centripetal force
- Banking of roads, where applicable

## Chapter 6: Work, Energy and Power

Inventory:
- Work by a constant force
- Work by a variable force
- Work from force-displacement graphs
- Positive, negative and zero work
- Kinetic energy
- Work-energy theorem
- Potential energy
- Gravitational potential energy
- Spring potential energy
- Conservative forces
- Non-conservative forces
- Conservation of mechanical energy
- Energy transformations
- Power
- Average power
- Instantaneous power
- Collisions
- Elastic collisions
- Inelastic collisions
- Momentum and energy conservation
- Relevant one-dimensional collision problems

## Chapter 7: System of Particles and Rotational Motion

Inventory:
- System of particles
- Centre of mass
- Centre of mass of two particles
- Centre of mass of discrete systems
- Motion of the centre of mass
- Linear momentum of a system
- Torque
- Moment of force
- Angular momentum
- Conservation of angular momentum
- Rotational motion
- Angular displacement
- Angular velocity
- Angular acceleration
- Rotational kinematics
- Moment of inertia
- Radius of gyration
- Parallel-axis theorem
- Perpendicular-axis theorem, where applicable
- Standard moment-of-inertia results
- Rotational kinetic energy
- Rolling motion
- Pure rolling
- Translational and rotational energy
- Equilibrium of rigid bodies
- Couple and torque balance

## Chapter 8: Gravitation

Inventory:
- Kepler's laws
- Newton's law of gravitation
- Gravitational constant
- Acceleration due to gravity
- Variation of gravity with height
- Variation of gravity with depth
- Gravitational field
- Gravitational potential
- Gravitational potential energy
- Escape velocity
- Orbital velocity
- Satellites
- Time period of a satellite
- Geostationary satellites
- Weightlessness
- Gravitational energy of systems, where applicable

## Chapter 9: Mechanical Properties of Solids

Inventory:
- Elasticity
- Plasticity
- Stress
- Strain
- Hooke's law
- Stress-strain curves
- Young's modulus
- Bulk modulus
- Shear modulus
- Elastic potential energy
- Elastic behaviour of materials
- Applications of elasticity

## Chapter 10: Mechanical Properties of Fluids

Inventory:
- Fluid pressure
- Pressure variation with depth
- Pascal's law
- Hydraulic applications
- Atmospheric pressure
- Gauge pressure
- Buoyancy
- Archimedes' principle
- Streamline flow
- Turbulent flow
- Equation of continuity
- Bernoulli's principle
- Applications of Bernoulli's principle
- Viscosity
- Coefficient of viscosity
- Stokes' law, where applicable
- Terminal velocity, where applicable
- Surface tension
- Surface energy
- Surface tension and droplets
- Excess pressure
- Capillary rise

## Chapter 11: Thermal Properties of Matter

Inventory:
- Temperature
- Temperature scales
- Thermal equilibrium
- Heat and temperature
- Thermal expansion
- Linear expansion
- Area expansion
- Volume expansion
- Specific heat capacity
- Heat capacity
- Calorimetry
- Latent heat
- Change of state
- Heat transfer
- Conduction
- Convection
- Radiation
- Thermal conductivity
- Newton's law of cooling, where applicable

## Chapter 12: Thermodynamics

Inventory:
- Thermal equilibrium
- Zeroth law of thermodynamics
- Internal energy
- Heat
- Work
- Thermodynamic systems
- State variables
- Thermodynamic processes
- Isothermal processes
- Adiabatic processes
- Isobaric processes
- Isochoric processes
- First law of thermodynamics
- P-V diagrams
- Work done in thermodynamic processes
- Specific heat of gases
- Second law of thermodynamics
- Heat engines
- Refrigerators
- Reversible and irreversible processes, where applicable

## Chapter 13: Kinetic Theory

Inventory:
- Molecular nature of matter
- Ideal gas model
- Gas laws
- Equation of state
- Kinetic theory assumptions
- Pressure of an ideal gas
- Molecular speed
- RMS speed
- Average speed
- Most probable speed
- Translational kinetic energy
- Degrees of freedom
- Law of equipartition of energy
- Specific heat capacities
- Mean free path, where applicable

## Chapter 14: Oscillations

Inventory:
- Periodic motion
- Oscillatory motion
- Simple harmonic motion
- Conditions for SHM
- Displacement, velocity and acceleration in SHM
- SHM equations
- Phase and phase difference
- Time period
- Frequency
- Angular frequency
- Amplitude
- SHM graphs
- Energy in SHM
- Spring-mass system
- Simple pendulum
- Time period of a simple pendulum
- Damped oscillations, where applicable
- Forced oscillations and resonance, where applicable

## Chapter 15: Waves

Inventory:
- Wave motion
- Mechanical waves
- Transverse waves
- Longitudinal waves
- Wavelength
- Frequency
- Time period
- Wave speed
- Wave equation
- Phase
- Principle of superposition
- Reflection of waves
- Waves on strings
- Speed of waves on a stretched string
- Sound waves
- Speed of sound
- Standing waves
- Nodes and antinodes
- Normal modes
- Vibrating strings
- Organ pipes
- Beats
- Doppler effect, where applicable

IMPORTANT:
The chapter groups above are a topic-discovery checklist. Reconcile them against the exact current NCERT, NEET and JEE syllabi. Add any missing official topics and clearly tag supplementary concepts.

---

# 4. CHEMISTRY: CLASS 11

Organise Chemistry into Physical Chemistry, Inorganic Chemistry and Organic Chemistry.

Create a separate topic inventory for every chapter.

## Chapter 1: Some Basic Concepts of Chemistry

- Nature and scope of chemistry
- Matter and its classification
- Physical and chemical properties
- Laws of chemical combination
- Dalton's atomic theory
- Atomic mass
- Molecular mass
- Formula mass
- Mole concept
- Avogadro constant
- Molar mass
- Percentage composition
- Empirical formula
- Molecular formula
- Chemical equations
- Balancing equations
- Stoichiometry
- Limiting reagent
- Excess reagent
- Percentage yield
- Purity calculations
- Concentration of solutions
- Mass percentage
- Volume percentage
- Mass-by-volume percentage
- Molarity
- Molality
- Mole fraction
- Parts per million, where applicable

## Chapter 2: Structure of Atom

- Subatomic particles
- Discovery of electrons
- Discovery of protons
- Discovery of neutrons
- Thomson model
- Rutherford model
- Atomic spectra
- Electromagnetic radiation
- Planck's quantum theory
- Photoelectric effect
- Bohr's atomic model
- Hydrogen spectrum
- Dual nature of matter
- de Broglie relation
- Heisenberg uncertainty principle
- Quantum mechanical model
- Quantum numbers
- Principal quantum number
- Azimuthal quantum number
- Magnetic quantum number
- Spin quantum number
- Atomic orbitals
- Shapes of orbitals
- Nodes, where applicable
- Aufbau principle
- Pauli exclusion principle
- Hund's rule
- Electronic configuration
- Exceptional configurations, where applicable

## Chapter 3: Classification of Elements and Periodicity

- Historical development of the periodic table
- Modern periodic law
- Modern periodic table
- Groups and periods
- Blocks of the periodic table
- Electronic configuration and periodicity
- Atomic radius
- Ionic radius
- Ionisation enthalpy
- Electron gain enthalpy
- Electronegativity
- Valency
- Oxidation states
- Metallic and non-metallic character
- Periodic trends
- Anomalous trends
- Factors affecting periodic properties

## Chapter 4: Chemical Bonding and Molecular Structure

- Kossel-Lewis approach
- Octet rule
- Limitations of the octet rule
- Ionic bonding
- Covalent bonding
- Lewis structures
- Formal charge
- Resonance
- Bond parameters
- Bond length
- Bond angle
- Bond enthalpy
- Bond order
- Electronegativity and polarity
- Dipole moment
- VSEPR theory
- Shapes of molecules
- Valence bond theory
- Orbital overlap
- Hybridisation
- sp, sp2 and sp3 hybridisation
- Molecular orbital theory
- Bonding and antibonding orbitals
- Molecular orbital diagrams
- Magnetic properties
- Hydrogen bonding

## Chapter 5: Chemical Thermodynamics

- System and surroundings
- Open, closed and isolated systems
- State functions
- Extensive and intensive properties
- Internal energy
- Heat and work
- Sign conventions
- First law of thermodynamics
- Enthalpy
- Heat capacity
- Specific heat
- Calorimetry
- Enthalpy changes
- Standard enthalpy
- Enthalpy of formation
- Enthalpy of combustion
- Enthalpy of neutralisation
- Hess's law
- Bond enthalpy
- Entropy
- Gibbs energy
- Spontaneity
- Thermodynamic relationships included in the applicable syllabus

## Chapter 6: Chemical Equilibrium

- Reversible reactions
- Dynamic equilibrium
- Law of mass action
- Equilibrium constant
- Kc and Kp
- Relationship between Kc and Kp
- Reaction quotient
- Homogeneous equilibrium
- Heterogeneous equilibrium
- Le Chatelier's principle
- Effect of concentration
- Effect of pressure
- Effect of temperature
- Effect of catalysts
- Applications of equilibrium constants

## Chapter 7: Ionic Equilibrium

- Acids and bases
- Arrhenius concept
- Brønsted-Lowry concept
- Lewis acid-base concept, where applicable
- Strong and weak electrolytes
- Ionisation constants
- Ka and Kb
- Ionic product of water
- pH and pOH
- Common-ion effect
- Buffer solutions
- Acid-base neutralisation
- Salt hydrolysis
- Solubility equilibrium
- Solubility product Ksp
- Precipitation
- Relationships between solubility and Ksp
- Relevant equilibrium calculations

## Chapter 8: Redox Reactions

- Oxidation
- Reduction
- Oxidising agents
- Reducing agents
- Oxidation number
- Rules for assigning oxidation numbers
- Oxidation-number changes
- Redox equations
- Balancing redox reactions
- Oxidation-number method
- Ion-electron method, where applicable
- Disproportionation reactions

## Chapter 9: Organic Chemistry: Basic Principles and Techniques

- Introduction to organic chemistry
- Classification of organic compounds
- Functional groups
- Homologous series
- IUPAC nomenclature
- Structural representation
- Structural isomerism
- Stereoisomerism, where applicable
- Homolytic bond fission
- Heterolytic bond fission
- Electrophiles
- Nucleophiles
- Carbocations
- Carbanions
- Free radicals
- Inductive effect
- Resonance effect
- Hyperconjugation
- Electromeric effect, where applicable
- Reaction intermediates
- Types of organic reactions
- Purification methods
- Crystallisation
- Distillation
- Sublimation
- Chromatography
- Qualitative analysis
- Quantitative analysis
- Detection of relevant elements
- Empirical and molecular formula calculations

## Chapter 10: Hydrocarbons

- Classification of hydrocarbons
- Alkanes
- Nomenclature of alkanes
- Structural isomerism in alkanes
- Preparation of alkanes
- Physical properties
- Combustion
- Halogenation
- Conformations, where applicable
- Alkenes
- Nomenclature of alkenes
- Geometrical isomerism
- Preparation of alkenes
- Electrophilic addition
- Markovnikov's rule
- Peroxide effect, where applicable
- Oxidation reactions
- Ozonolysis
- Alkynes
- Nomenclature of alkynes
- Preparation of alkynes
- Acidity of terminal alkynes
- Addition reactions
- Aromatic hydrocarbons
- Benzene structure
- Aromaticity, where applicable
- Electrophilic aromatic substitution
- Nitration
- Sulphonation
- Halogenation
- Friedel-Crafts reactions, where applicable
- Directing effects, where applicable
- Relevant preparation methods and reactions

ADDITIONAL CHEMISTRY REQUIREMENTS:

1. Include school-level chapters that are not part of the current entrance exam syllabus in a separate supplementary category.
2. Do not mark States of Matter or any other chapter as current NEET/JEE content without official verification.
3. Include every topic listed in the applicable official syllabus, even if it is absent from the initial inventory.
4. Preserve the difference between NCERT chapter names and official exam syllabus units.

---

# 5. MATHEMATICS: CLASS 11

Create a complete Mathematics inventory.

## Chapter 1: Sets

- Definition of sets
- Representation of sets
- Roster form
- Set-builder form
- Empty set
- Finite and infinite sets
- Equal sets
- Subsets
- Proper subsets
- Universal set
- Power set
- Intervals of real numbers
- Union
- Intersection
- Difference
- Complement
- Venn diagrams
- Properties of set operations
- Number of elements in sets

## Chapter 2: Relations and Functions

- Cartesian products
- Ordered pairs
- Relations
- Domain
- Codomain
- Range
- Functions
- Types of functions
- One-one functions
- Many-one functions
- Into and onto functions
- Constant functions
- Identity functions
- Polynomial functions
- Rational functions
- Modulus functions
- Signum functions
- Greatest integer functions
- Graphs of standard functions
- Composition of functions, where applicable

## Chapter 3: Trigonometric Functions

- Degree and radian measures
- Conversion between degrees and radians
- Unit circle
- Trigonometric ratios
- Signs in different quadrants
- Standard angles
- Trigonometric identities
- Reciprocal identities
- Compound-angle identities
- Double-angle identities
- Triple-angle identities
- Half-angle identities
- Product-to-sum and sum-to-product identities, where applicable
- Trigonometric equations
- General solutions
- Graphs of trigonometric functions
- Periodicity
- Domain and range
- Inverse trigonometric functions only where included in the applicable syllabus

## Chapter 4: Complex Numbers and Quadratic Equations

- Imaginary unit i
- Powers of i
- Algebra of complex numbers
- Equality of complex numbers
- Conjugate of a complex number
- Modulus
- Argand plane
- Geometrical representation
- Polar representation, where applicable
- Quadratic equations
- Discriminant
- Nature of roots
- Complex roots
- Relation between roots and coefficients
- Formation of quadratic equations
- Transformation of roots
- Quadratic inequalities, where applicable

## Chapter 5: Linear Inequalities

- Inequalities in one variable
- Solution sets
- Interval representation
- Graphical representation
- Inequalities in two variables
- Half-planes
- Systems of inequalities
- Graphical solutions

## Chapter 6: Permutations and Combinations

- Fundamental principle of counting
- Multiplication principle
- Addition principle
- Factorials
- Permutations
- Arrangements of distinct objects
- Arrangements with restrictions
- Repeated objects
- Circular permutations, where applicable
- Combinations
- Selection problems
- Relation between permutations and combinations
- Relevant counting identities

## Chapter 7: Binomial Theorem

- Introduction to binomial expansion
- Binomial theorem for positive integral indices
- General term
- Particular terms
- Middle term
- Binomial coefficients
- Properties of binomial coefficients
- Applications to algebraic expansions

## Chapter 8: Sequences and Series

- Sequences
- Series
- Arithmetic progression
- nth term of AP
- Sum of AP
- Arithmetic mean
- Geometric progression
- nth term of GP
- Sum of finite GP
- Infinite GP, where applicable
- Geometric mean
- Relationship between AM and GM
- Special sums
- Relevant summation identities

## Chapter 9: Straight Lines

- Cartesian coordinate system
- Distance formula
- Section formula
- Midpoint formula
- Slope
- Angle between lines
- Parallel lines
- Perpendicular lines
- Various forms of a straight-line equation
- Point-slope form
- Two-point form
- Slope-intercept form
- Intercept form
- Normal form
- General form
- Distance of a point from a line
- Intersection of lines

## Chapter 10: Conic Sections

- Coordinate geometry of conics
- Circle
- Standard equations
- Centre and radius
- General equation of a circle
- Parabola
- Standard forms
- Vertex
- Focus
- Directrix
- Axis
- Latus rectum
- Ellipse
- Standard equation
- Foci
- Vertices
- Eccentricity
- Major and minor axes
- Hyperbola
- Standard equation
- Foci
- Vertices
- Eccentricity
- Asymptotes, where applicable
- Identification of conics from equations

## Chapter 11: Introduction to Three-Dimensional Geometry

- Three-dimensional coordinate system
- Coordinates of a point
- Octants
- Distance between two points
- Section formula
- Midpoint formula
- Basic coordinate interpretation

## Chapter 12: Limits and Derivatives

- Introduction to limits
- Left-hand limits
- Right-hand limits
- Existence of limits
- Standard limits
- Algebra of limits
- Limits of algebraic functions
- Limits of trigonometric functions
- Continuity as a supporting concept
- Derivative from first principles
- Geometrical interpretation
- Physical interpretation
- Derivatives of standard functions
- Basic differentiation rules
- Derivative of sums and differences
- Derivative of products and quotients, where applicable

## Chapter 13: Statistics

- Collection of data
- Classification of data
- Frequency distributions
- Graphical representation
- Mean
- Median
- Mode
- Range
- Mean deviation
- Variance
- Standard deviation
- Variance and standard deviation of grouped data
- Relevant statistical calculations

## Chapter 14: Probability

- Random experiments
- Outcomes
- Sample space
- Events
- Types of events
- Equally likely outcomes
- Event operations
- Complementary events
- Mutually exclusive events
- Probability of an event
- Basic probability rules
- Counting-based probability
- Relevant elementary probability problems

## Chapter 15: Mathematical Reasoning — Supplementary School-Level Inventory

- Statements
- Simple and compound statements
- Negation
- Conjunction
- Disjunction
- Implication
- Biconditional statements
- Truth tables
- Converse
- Inverse
- Contrapositive
- Validity of arguments

Do not automatically label Mathematical Reasoning as current JEE Main content. Verify the applicable official syllabus.

ADDITIONAL MATHEMATICS REQUIREMENTS:

Search the applicable official syllabus for any additional Class 11 topics not listed above.

Add all applicable missing topics, including any required foundational concepts.

Keep JEE Main and JEE Advanced inclusion tags separate.

---

# 6. BIOLOGY: CLASS 11

Create the complete Biology inventory for NEET and NCERT learning.

Use the traditional NCERT Class 11 Biology chapter structure as an initial checklist, then reconcile it with the applicable current NEET syllabus.

## UNIT 1: DIVERSITY OF LIVING ORGANISMS

### Chapter 1: The Living World

- Characteristics of living organisms
- Growth
- Reproduction
- Metabolism
- Cellular organisation
- Consciousness and response to stimuli
- Biodiversity
- Need for classification
- Taxonomy
- Systematics
- Binomial nomenclature
- Taxonomic hierarchy
- Species
- Genus
- Family
- Order
- Class
- Phylum or division
- Kingdom
- Taxonomic aids
- Herbarium
- Botanical gardens
- Museums
- Zoological parks
- Taxonomic keys

### Chapter 2: Biological Classification

- Need for biological classification
- Two-kingdom classification
- Five-kingdom classification
- Monera
- Archaebacteria
- Eubacteria
- Cyanobacteria
- Mycoplasma
- Protista
- Chrysophytes
- Dinoflagellates
- Euglenoids
- Slime moulds
- Protozoans
- Fungi
- Phycomycetes
- Ascomycetes
- Basidiomycetes
- Deuteromycetes
- Lichens
- Viruses
- Viroids
- Prions
- Important distinguishing characteristics
- Relevant examples and diagrams

### Chapter 3: Plant Kingdom

- Basis of plant classification
- Algae
- Chlorophyceae
- Phaeophyceae
- Rhodophyceae
- Bryophytes
- Liverworts
- Mosses
- Pteridophytes
- Lycophytes and other relevant groups
- Gymnosperms
- Angiosperms
- Monocots
- Dicots
- Life cycles
- Alternation of generations
- Gametophyte
- Sporophyte
- Haplontic life cycle
- Diplontic life cycle
- Haplodiplontic life cycle
- Important examples and distinguishing features

### Chapter 4: Animal Kingdom

- Basis of animal classification
- Level of organisation
- Symmetry
- Germ layers
- Coelom
- Segmentation
- Notochord
- Porifera
- Cnidaria
- Ctenophora
- Platyhelminthes
- Nematoda
- Annelida
- Arthropoda
- Mollusca
- Echinodermata
- Hemichordata
- Chordata
- Vertebrate groups
- Pisces
- Amphibia
- Reptilia
- Aves
- Mammalia
- Diagnostic characteristics
- Representative examples
- Comparison tables

## UNIT 2: STRUCTURAL ORGANISATION

### Chapter 5: Morphology of Flowering Plants

- Root systems
- Types of roots
- Root modifications
- Stem structure
- Stem modifications
- Leaf structure
- Leaf venation
- Phyllotaxy
- Leaf modifications
- Inflorescence
- Racemose inflorescence
- Cymose inflorescence
- Flower structure
- Floral whorls
- Aestivation
- Placentation
- Fruit
- Types of fruits
- Seed structure
- Dicot seed
- Monocot seed
- Floral formula
- Floral diagrams
- Families and examples included in the applicable syllabus

### Chapter 6: Anatomy of Flowering Plants

- Plant tissues
- Meristematic tissues
- Permanent tissues
- Simple permanent tissues
- Complex permanent tissues
- Protective tissues
- Tissue systems
- Epidermal tissue system
- Ground tissue system
- Vascular tissue system
- Dicot root
- Monocot root
- Dicot stem
- Monocot stem
- Dorsiventral leaf
- Isobilateral leaf
- Secondary growth
- Vascular cambium
- Cork cambium
- Annual rings, where applicable
- Relevant labelled diagrams

### Chapter 7: Structural Organisation in Animals

- Animal tissues
- Epithelial tissue
- Connective tissue
- Muscular tissue
- Neural tissue
- Tissue functions
- Organ and organ-system organisation
- Animal examples and systems prescribed in the applicable NCERT and NEET syllabus
- Relevant anatomical structures
- Labelled diagrams
- Identification of tissue types

## UNIT 3: CELL STRUCTURE AND FUNCTION

### Chapter 8: Cell — The Unit of Life

- Cell theory
- Cell discovery
- Prokaryotic cells
- Eukaryotic cells
- Plasma membrane
- Cell wall
- Nucleus
- Nuclear envelope
- Nucleolus
- Chromatin
- Chromosomes
- Mitochondria
- Plastids
- Chloroplasts
- Endoplasmic reticulum
- Golgi apparatus
- Lysosomes
- Vacuoles
- Ribosomes
- Centrosome and centrioles
- Cytoskeleton
- Cilia and flagella
- Microbodies
- Plant and animal cell comparison
- Relevant labelled diagrams

### Chapter 9: Biomolecules

- Chemical composition of living organisms
- Primary metabolites
- Secondary metabolites
- Carbohydrates
- Monosaccharides
- Disaccharides
- Polysaccharides
- Proteins
- Amino acids
- Peptide bonds
- Protein structure
- Lipids
- Fatty acids
- Nucleic acids
- Nucleotides
- DNA
- RNA
- Enzymes
- Enzyme properties
- Active sites
- Enzyme-substrate complex
- Factors affecting enzyme activity
- Cofactors
- Coenzymes
- Prosthetic groups
- Relevant biochemical reactions

### Chapter 10: Cell Cycle and Cell Division

- Cell cycle
- Interphase
- G1 phase
- S phase
- G2 phase
- M phase
- Mitosis
- Prophase
- Metaphase
- Anaphase
- Telophase
- Cytokinesis
- Meiosis
- Meiosis I
- Meiosis II
- Crossing over
- Synapsis
- Reduction division
- Significance of mitosis
- Significance of meiosis
- Differences between mitosis and meiosis
- Relevant diagrams

## UNIT 4: PLANT PHYSIOLOGY

### Chapter 11: Photosynthesis in Higher Plants

- Photosynthesis overview
- Historical experiments
- Photosynthetic pigments
- Chlorophyll
- Accessory pigments
- Chloroplast structure
- Light-dependent reactions
- Photosystems
- Photosystem I
- Photosystem II
- Photolysis of water
- Electron transport
- Photophosphorylation
- Cyclic photophosphorylation
- Non-cyclic photophosphorylation
- ATP and NADPH
- Carbon fixation
- Calvin cycle
- C3 pathway
- C4 pathway
- Photorespiration
- Factors affecting photosynthesis
- Limiting factors
- Relevant diagrams and equations

### Chapter 12: Respiration in Plants

- Cellular respiration
- Glycolysis
- Fermentation
- Aerobic respiration
- Pyruvate oxidation
- Krebs cycle
- Electron transport system
- Oxidative phosphorylation
- ATP production
- Respiratory balance sheet
- Amphibolic pathway
- Respiratory quotient
- Factors affecting respiration
- Relevant equations and diagrams

### Chapter 13: Plant Growth and Development

- Growth
- Differentiation
- Dedifferentiation
- Redifferentiation
- Plant development
- Growth phases
- Arithmetic growth
- Geometric growth
- Growth curves
- Plant growth regulators
- Auxins
- Gibberellins
- Cytokinins
- Ethylene
- Abscisic acid
- Photoperiodism
- Vernalisation
- Seed dormancy
- Relevant developmental responses

### Chapter 14: Transport in Plants — Supplementary NCERT Inventory

- Diffusion
- Facilitated diffusion
- Active transport
- Osmosis
- Water potential
- Solute potential
- Pressure potential
- Plasmolysis
- Imbibition
- Water absorption
- Apoplast pathway
- Symplast pathway
- Transpiration
- Stomatal regulation
- Ascent of sap
- Cohesion-tension theory
- Mineral nutrition
- Essential elements
- Macronutrients
- Micronutrients
- Nitrogen metabolism
- Phloem transport
- Pressure-flow hypothesis

Verify whether each of these concepts is included in the current NEET syllabus before tagging it as NEET exam content.

## UNIT 5: HUMAN PHYSIOLOGY

### Chapter 15: Breathing and Exchange of Gases

- Human respiratory system
- Respiratory organs
- Mechanism of breathing
- Inspiration
- Expiration
- Respiratory volumes
- Respiratory capacities
- Exchange of gases
- Transport of oxygen
- Oxygen dissociation curve
- Transport of carbon dioxide
- Regulation of respiration
- Respiratory disorders included in the syllabus
- Relevant diagrams

### Chapter 16: Body Fluids and Circulation

- Blood composition
- Plasma
- Red blood cells
- White blood cells
- Platelets
- Blood groups
- ABO system
- Rh factor
- Coagulation of blood
- Lymph
- Human heart
- Heart chambers
- Valves
- Cardiac cycle
- Cardiac output
- Electrocardiogram
- Double circulation
- Blood vessels
- Blood pressure
- Regulation of circulation
- Circulatory disorders included in the syllabus
- Relevant diagrams

### Chapter 17: Excretory Products and Their Elimination

- Excretory products
- Ammonotelism
- Ureotelism
- Uricotelism
- Human excretory system
- Kidney structure
- Nephron structure
- Urine formation
- Glomerular filtration
- Selective reabsorption
- Tubular secretion
- Counter-current mechanism
- Concentration of urine
- Regulation of kidney function
- Renin-angiotensin mechanism, where applicable
- ADH
- Atrial natriuretic factor
- Micturition
- Dialysis
- Relevant excretory disorders
- Nephron diagrams

### Chapter 18: Locomotion and Movement

- Types of movement
- Amoeboid movement
- Ciliary movement
- Muscular movement
- Muscle structure
- Sarcomere
- Actin
- Myosin
- Sliding filament theory
- Muscle contraction
- Skeletal system
- Axial skeleton
- Appendicular skeleton
- Joints
- Synovial joints
- Bone structure
- Muscle and skeletal disorders
- Relevant diagrams

### Chapter 19: Neural Control and Coordination

- Neuron structure
- Types of neurons
- Nerve impulse
- Resting membrane potential
- Action potential
- Conduction of nerve impulses
- Synapse
- Chemical synapse
- Electrical synapse
- Central nervous system
- Brain
- Spinal cord
- Forebrain
- Midbrain
- Hindbrain
- Peripheral nervous system
- Somatic nervous system
- Autonomic nervous system
- Sympathetic division
- Parasympathetic division
- Reflex action
- Reflex arc
- Sensory reception and processing included in the syllabus
- Relevant diagrams

### Chapter 20: Chemical Coordination and Integration

- Endocrine glands
- Hormones
- Hypothalamus
- Pituitary gland
- Pineal gland
- Thyroid gland
- Parathyroid glands
- Thymus
- Adrenal glands
- Pancreas
- Testes
- Ovaries
- Hormone functions
- Mechanisms of hormone action
- Feedback regulation
- Hormonal disorders
- Relevant diagrams and tables

### Chapter 21: Digestion and Absorption — NCERT Inventory

- Human digestive system
- Alimentary canal
- Digestive glands
- Mouth and buccal cavity
- Oesophagus
- Stomach
- Small intestine
- Large intestine
- Liver
- Gall bladder
- Pancreas
- Digestive enzymes
- Digestion of carbohydrates
- Digestion of proteins
- Digestion of fats
- Absorption of nutrients
- Movements of the alimentary canal
- Regulation of digestion
- Digestive disorders
- Relevant diagrams

IMPORTANT BIOLOGY RULES:

1. Verify every chapter and topic against the official NEET syllabus for the applicable year.
2. Preserve the full NCERT learning inventory in the NCERT mode.
3. Do not falsely label every NCERT chapter as a currently tested NEET chapter.
4. Add any official NEET Biology units or topics missing from this initial inventory.
5. If the applicable syllabus combines, renames, removes or redistributes topics, preserve the official mapping in the database.
6. Do not delete a topic from NCERT mode just because it is excluded from the entrance exam syllabus.

---

# 7. MISSING-TOPIC DETECTION SYSTEM

This is the most important requirement.

Do not stop after entering the topics supplied in this prompt.

Perform the following process for every subject:

STEP 1:
Obtain the applicable official NEET, JEE Main, JEE Advanced and NCERT syllabus documents.

STEP 2:
Extract every unit, chapter, topic and explicitly listed subtopic.

STEP 3:
Create a separate official-source checklist.

STEP 4:
Compare the checklist with the database.

STEP 5:
Identify missing topics, duplicated topics, incorrect chapter mappings and incorrectly classified topics.

STEP 6:
Add every missing applicable topic.

STEP 7:
Mark each item using one of these statuses:

- Verified: present in official syllabus.
- NCERT Only: part of the selected NCERT learning inventory but not verified as exam content.
- JEE Main Only.
- JEE Advanced Only.
- NEET Only.
- Common to Multiple Exams.
- Supplementary: useful learning content outside the selected exam syllabus.
- Needs Verification: source not yet confirmed.

STEP 8:
Do not mark a syllabus complete while any official topic remains missing or unverified.

STEP 9:
Store the source document name, applicable academic year and verification date.

STEP 10:
Generate a missing-topic report for each subject.

---

# 8. DATABASE FORMAT

Use a structured database.

Each chapter must contain:

{
  "class": 11,
  "subject": "Physics",
  "chapterId": "PHY11_CH01",
  "chapterName": "Units and Measurements",
  "unit": "Mechanics Foundations",
  "examTags": [
    "NEET",
    "JEE_MAIN",
    "JEE_ADVANCED",
    "NCERT"
  ],
  "academicYear": "2026-27",
  "syllabusStatus": "needs_verification",
  "sourceReferences": [],
  "topics": [
    {
      "topicId": "PHY11_CH01_T01",
      "topicName": "Physical Quantities",
      "subtopics": [
        {
          "subtopicId": "PHY11_CH01_T01_S01",
          "subtopicName": "Fundamental Quantities",
          "concepts": [],
          "formulas": [],
          "diagrams": [],
          "examples": [],
          "questionIds": []
        }
      ]
    }
  ]
}

The example is only a data-structure illustration.

Populate the database with all verified chapters and topics. Do not leave the syllabus database containing only this example.

Use separate fields for:
- Official exam inclusion
- NCERT inclusion
- Supplementary content
- Source references
- Verification status
- Last verified date

Do not infer official inclusion from a chapter name alone.

---

# 9. MIND MAP GENERATION REQUIREMENTS

After completing and verifying the syllabus database, generate mind-map content for each chapter.

Each mind map must contain:

1. Chapter title
2. Main branches
3. Topics
4. Subtopics
5. Important definitions
6. Formulae or reactions
7. Important diagrams
8. Important examples
9. Common mistakes
10. Exam-specific notes
11. Prerequisite concepts
12. Related chapters

Design rules:

- Use easy Hindi/Hinglish explanations where appropriate.
- Preserve standard scientific terminology in English.
- Use colourful, readable branches.
- Keep the central chapter title prominent.
- Avoid overcrowding.
- Split very large chapters into multiple connected mind maps.
- Use appropriate subject-specific diagrams.
- Do not invent scientific diagrams or formulas.
- Do not omit syllabus topics just to make a mind map look attractive.
- Provide a complete text-based mind-map outline before generating a visual.
- Keep separate NEET, JEE Main and JEE Advanced tags wherever their scope differs.

---

# 10. FINAL COMPLETENESS REPORT

At the end, generate a report containing:

A. Class 11 NEET:
- Physics chapters and topics
- Chemistry chapters and topics
- Biology chapters and topics

B. Class 11 JEE Main:
- Physics chapters and topics
- Chemistry chapters and topics
- Mathematics chapters and topics

C. Class 11 JEE Advanced:
- Applicable chapters and topics
- Topics additional to JEE Main
- Topics that require separate verification

D. NCERT Class 11:
- Complete selected textbook chapter inventory
- All textbook-listed topics and subtopics
- Supplementary topics outside the entrance exam syllabus

E. Quality assurance:
- Total chapter count
- Total unique topic count
- Total unique subtopic count
- Number of topics verified
- Number of topics awaiting verification
- Missing official topics
- Duplicate entries
- Topics excluded from each exam
- Source document and academic year

Do not claim that the list is 100% complete until the official-source comparison is finished.

FINAL INSTRUCTION:

Build a comprehensive Class 11 syllabus inventory first.

Do not begin by generating mind-map images.

First verify and organise every chapter, topic and subtopic. Then generate the chapter-wise mind maps using that verified database.

The priority is syllabus accuracy, complete topic coverage, correct exam tagging and zero unaccounted official syllabus topics.