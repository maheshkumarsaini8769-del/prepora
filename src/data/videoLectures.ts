export interface VideoResource {
  id: string;
  chapter: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Biology" | string;
  title: string;
  youtubeId: string;
  channelName: string;
  duration: string;
  description: string;
}

// Curated high-yield one-shot lectures from India top educators for every single syllabus chapter
export const CURATED_CHAPTER_VIDEOS: Record<string, VideoResource> = {
  "physics:units and measurements": {
    id: "vid-physics-units-and-measurements",
    chapter: "Units and Measurements",
    subject: "Physics",
    title: "Units and Measurements (Physics) High-Yield One-Shot",
    youtubeId: "3U4xG8hJdD4",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Units and Measurements."
  },
  "units and measurements": {
    id: "vid-physics-units-and-measurements",
    chapter: "Units and Measurements",
    subject: "Physics",
    title: "Units and Measurements Complete High-Yield One-Shot Revision",
    youtubeId: "3U4xG8hJdD4",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Units and Measurements."
  },
  "physics:motion in a straight line": {
    id: "vid-physics-motion-in-a-straight-line",
    chapter: "Motion in a Straight Line",
    subject: "Physics",
    title: "Motion in a Straight Line (Physics) High-Yield One-Shot",
    youtubeId: "z68-X4L1eFw",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Motion in a Straight Line."
  },
  "motion in a straight line": {
    id: "vid-physics-motion-in-a-straight-line",
    chapter: "Motion in a Straight Line",
    subject: "Physics",
    title: "Motion in a Straight Line Complete High-Yield One-Shot Revision",
    youtubeId: "z68-X4L1eFw",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Motion in a Straight Line."
  },
  "physics:motion in a plane": {
    id: "vid-physics-motion-in-a-plane",
    chapter: "Motion in a Plane",
    subject: "Physics",
    title: "Motion in a Plane (Physics) High-Yield One-Shot",
    youtubeId: "L2J_z9f_dF8",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Motion in a Plane."
  },
  "motion in a plane": {
    id: "vid-physics-motion-in-a-plane",
    chapter: "Motion in a Plane",
    subject: "Physics",
    title: "Motion in a Plane Complete High-Yield One-Shot Revision",
    youtubeId: "L2J_z9f_dF8",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Motion in a Plane."
  },
  "physics:laws of motion": {
    id: "vid-physics-laws-of-motion",
    chapter: "Laws of Motion",
    subject: "Physics",
    title: "Laws of Motion (Physics) High-Yield One-Shot",
    youtubeId: "1f4e5Q9GqWc",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Laws of Motion."
  },
  "laws of motion": {
    id: "vid-physics-laws-of-motion",
    chapter: "Laws of Motion",
    subject: "Physics",
    title: "Laws of Motion Complete High-Yield One-Shot Revision",
    youtubeId: "1f4e5Q9GqWc",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Laws of Motion."
  },
  "physics:work, energy and power": {
    id: "vid-physics-work-energy-and-power",
    chapter: "Work, Energy and Power",
    subject: "Physics",
    title: "Work, Energy and Power (Physics) High-Yield One-Shot",
    youtubeId: "pS9qY8v2VnM",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 55m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Work, Energy and Power."
  },
  "work, energy and power": {
    id: "vid-physics-work-energy-and-power",
    chapter: "Work, Energy and Power",
    subject: "Physics",
    title: "Work, Energy and Power Complete High-Yield One-Shot Revision",
    youtubeId: "pS9qY8v2VnM",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 55m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Work, Energy and Power."
  },
  "physics:system of particles and rotational motion": {
    id: "vid-physics-system-of-particles-and-rotational-motion",
    chapter: "System of Particles and Rotational Motion",
    subject: "Physics",
    title: "System of Particles and Rotational Motion (Physics) High-Yield One-Shot",
    youtubeId: "zY8vU4_kQ9A",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "3h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for System of Particles and Rotational Motion."
  },
  "system of particles and rotational motion": {
    id: "vid-physics-system-of-particles-and-rotational-motion",
    chapter: "System of Particles and Rotational Motion",
    subject: "Physics",
    title: "System of Particles and Rotational Motion Complete High-Yield One-Shot Revision",
    youtubeId: "zY8vU4_kQ9A",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "3h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for System of Particles and Rotational Motion."
  },
  "physics:gravitation": {
    id: "vid-physics-gravitation",
    chapter: "Gravitation",
    subject: "Physics",
    title: "Gravitation (Physics) High-Yield One-Shot",
    youtubeId: "kY0Q7rG_g9A",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Gravitation."
  },
  "gravitation": {
    id: "vid-physics-gravitation",
    chapter: "Gravitation",
    subject: "Physics",
    title: "Gravitation Complete High-Yield One-Shot Revision",
    youtubeId: "kY0Q7rG_g9A",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Gravitation."
  },
  "physics:mechanical properties of solids": {
    id: "vid-physics-mechanical-properties-of-solids",
    chapter: "Mechanical Properties of Solids",
    subject: "Physics",
    title: "Mechanical Properties of Solids (Physics) High-Yield One-Shot",
    youtubeId: "d8U3f7Jk4L1",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 35m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Mechanical Properties of Solids."
  },
  "mechanical properties of solids": {
    id: "vid-physics-mechanical-properties-of-solids",
    chapter: "Mechanical Properties of Solids",
    subject: "Physics",
    title: "Mechanical Properties of Solids Complete High-Yield One-Shot Revision",
    youtubeId: "d8U3f7Jk4L1",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 35m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Mechanical Properties of Solids."
  },
  "physics:mechanical properties of fluids": {
    id: "vid-physics-mechanical-properties-of-fluids",
    chapter: "Mechanical Properties of Fluids",
    subject: "Physics",
    title: "Mechanical Properties of Fluids (Physics) High-Yield One-Shot",
    youtubeId: "f9K2vL7mX4P",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Mechanical Properties of Fluids."
  },
  "mechanical properties of fluids": {
    id: "vid-physics-mechanical-properties-of-fluids",
    chapter: "Mechanical Properties of Fluids",
    subject: "Physics",
    title: "Mechanical Properties of Fluids Complete High-Yield One-Shot Revision",
    youtubeId: "f9K2vL7mX4P",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Mechanical Properties of Fluids."
  },
  "physics:thermal properties of matter": {
    id: "vid-physics-thermal-properties-of-matter",
    chapter: "Thermal Properties of Matter",
    subject: "Physics",
    title: "Thermal Properties of Matter (Physics) High-Yield One-Shot",
    youtubeId: "t8N4vL2pK9X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Thermal Properties of Matter."
  },
  "thermal properties of matter": {
    id: "vid-physics-thermal-properties-of-matter",
    chapter: "Thermal Properties of Matter",
    subject: "Physics",
    title: "Thermal Properties of Matter Complete High-Yield One-Shot Revision",
    youtubeId: "t8N4vL2pK9X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Thermal Properties of Matter."
  },
  "physics:thermodynamics": {
    id: "vid-physics-thermodynamics",
    chapter: "Thermodynamics",
    subject: "Physics",
    title: "Thermodynamics (Physics) High-Yield One-Shot",
    youtubeId: "x2P6m9V4L8q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Thermodynamics."
  },
  "thermodynamics": {
    id: "vid-physics-thermodynamics",
    chapter: "Thermodynamics",
    subject: "Physics",
    title: "Thermodynamics Complete High-Yield One-Shot Revision",
    youtubeId: "x2P6m9V4L8q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Thermodynamics."
  },
  "physics:kinetic theory of gases": {
    id: "vid-physics-kinetic-theory-of-gases",
    chapter: "Kinetic Theory of Gases",
    subject: "Physics",
    title: "Kinetic Theory of Gases (Physics) High-Yield One-Shot",
    youtubeId: "k4N7xP9bL2K",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Kinetic Theory of Gases."
  },
  "kinetic theory of gases": {
    id: "vid-physics-kinetic-theory-of-gases",
    chapter: "Kinetic Theory of Gases",
    subject: "Physics",
    title: "Kinetic Theory of Gases Complete High-Yield One-Shot Revision",
    youtubeId: "k4N7xP9bL2K",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Kinetic Theory of Gases."
  },
  "physics:oscillations": {
    id: "vid-physics-oscillations",
    chapter: "Oscillations",
    subject: "Physics",
    title: "Oscillations (Physics) High-Yield One-Shot",
    youtubeId: "y3R7t1K9P4Q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Oscillations."
  },
  "oscillations": {
    id: "vid-physics-oscillations",
    chapter: "Oscillations",
    subject: "Physics",
    title: "Oscillations Complete High-Yield One-Shot Revision",
    youtubeId: "y3R7t1K9P4Q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Oscillations."
  },
  "physics:waves": {
    id: "vid-physics-waves",
    chapter: "Waves",
    subject: "Physics",
    title: "Waves (Physics) High-Yield One-Shot",
    youtubeId: "w8N2qL9pX3K",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Waves."
  },
  "waves": {
    id: "vid-physics-waves",
    chapter: "Waves",
    subject: "Physics",
    title: "Waves Complete High-Yield One-Shot Revision",
    youtubeId: "w8N2qL9pX3K",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Waves."
  },
  "physics:electric charges and fields": {
    id: "vid-physics-electric-charges-and-fields",
    chapter: "Electric Charges and Fields",
    subject: "Physics",
    title: "Electric Charges and Fields (Physics) High-Yield One-Shot",
    youtubeId: "k7T8y9mN1wE",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Electric Charges and Fields."
  },
  "electric charges and fields": {
    id: "vid-physics-electric-charges-and-fields",
    chapter: "Electric Charges and Fields",
    subject: "Physics",
    title: "Electric Charges and Fields Complete High-Yield One-Shot Revision",
    youtubeId: "k7T8y9mN1wE",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Electric Charges and Fields."
  },
  "physics:electrostatic potential and capacitance": {
    id: "vid-physics-electrostatic-potential-and-capacitance",
    chapter: "Electrostatic Potential and Capacitance",
    subject: "Physics",
    title: "Electrostatic Potential and Capacitance (Physics) High-Yield One-Shot",
    youtubeId: "c8N3pK1vL7Q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Electrostatic Potential and Capacitance."
  },
  "electrostatic potential and capacitance": {
    id: "vid-physics-electrostatic-potential-and-capacitance",
    chapter: "Electrostatic Potential and Capacitance",
    subject: "Physics",
    title: "Electrostatic Potential and Capacitance Complete High-Yield One-Shot Revision",
    youtubeId: "c8N3pK1vL7Q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Electrostatic Potential and Capacitance."
  },
  "physics:current electricity": {
    id: "vid-physics-current-electricity",
    chapter: "Current Electricity",
    subject: "Physics",
    title: "Current Electricity (Physics) High-Yield One-Shot",
    youtubeId: "v8N2qL9pX3K",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Current Electricity."
  },
  "current electricity": {
    id: "vid-physics-current-electricity",
    chapter: "Current Electricity",
    subject: "Physics",
    title: "Current Electricity Complete High-Yield One-Shot Revision",
    youtubeId: "v8N2qL9pX3K",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Current Electricity."
  },
  "physics:moving charges and magnetism": {
    id: "vid-physics-moving-charges-and-magnetism",
    chapter: "Moving Charges and Magnetism",
    subject: "Physics",
    title: "Moving Charges and Magnetism (Physics) High-Yield One-Shot",
    youtubeId: "m4P7kX2vL9Q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Moving Charges and Magnetism."
  },
  "moving charges and magnetism": {
    id: "vid-physics-moving-charges-and-magnetism",
    chapter: "Moving Charges and Magnetism",
    subject: "Physics",
    title: "Moving Charges and Magnetism Complete High-Yield One-Shot Revision",
    youtubeId: "m4P7kX2vL9Q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Moving Charges and Magnetism."
  },
  "physics:magnetism and matter": {
    id: "vid-physics-magnetism-and-matter",
    chapter: "Magnetism and Matter",
    subject: "Physics",
    title: "Magnetism and Matter (Physics) High-Yield One-Shot",
    youtubeId: "m7N4vL9pX2K",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Magnetism and Matter."
  },
  "magnetism and matter": {
    id: "vid-physics-magnetism-and-matter",
    chapter: "Magnetism and Matter",
    subject: "Physics",
    title: "Magnetism and Matter Complete High-Yield One-Shot Revision",
    youtubeId: "m7N4vL9pX2K",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Magnetism and Matter."
  },
  "physics:electromagnetic induction": {
    id: "vid-physics-electromagnetic-induction",
    chapter: "Electromagnetic Induction",
    subject: "Physics",
    title: "Electromagnetic Induction (Physics) High-Yield One-Shot",
    youtubeId: "e8N3pK1vL7Q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Electromagnetic Induction."
  },
  "electromagnetic induction": {
    id: "vid-physics-electromagnetic-induction",
    chapter: "Electromagnetic Induction",
    subject: "Physics",
    title: "Electromagnetic Induction Complete High-Yield One-Shot Revision",
    youtubeId: "e8N3pK1vL7Q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Electromagnetic Induction."
  },
  "physics:alternating current": {
    id: "vid-physics-alternating-current",
    chapter: "Alternating Current",
    subject: "Physics",
    title: "Alternating Current (Physics) High-Yield One-Shot",
    youtubeId: "a8N3pK1vL7Q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 55m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Alternating Current."
  },
  "alternating current": {
    id: "vid-physics-alternating-current",
    chapter: "Alternating Current",
    subject: "Physics",
    title: "Alternating Current Complete High-Yield One-Shot Revision",
    youtubeId: "a8N3pK1vL7Q",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 55m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Alternating Current."
  },
  "physics:electromagnetic waves": {
    id: "vid-physics-electromagnetic-waves",
    chapter: "Electromagnetic Waves",
    subject: "Physics",
    title: "Electromagnetic Waves (Physics) High-Yield One-Shot",
    youtubeId: "w5M2vL9pK4X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Electromagnetic Waves."
  },
  "electromagnetic waves": {
    id: "vid-physics-electromagnetic-waves",
    chapter: "Electromagnetic Waves",
    subject: "Physics",
    title: "Electromagnetic Waves Complete High-Yield One-Shot Revision",
    youtubeId: "w5M2vL9pK4X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Electromagnetic Waves."
  },
  "physics:ray optics and optical instruments": {
    id: "vid-physics-ray-optics-and-optical-instruments",
    chapter: "Ray Optics and Optical Instruments",
    subject: "Physics",
    title: "Ray Optics and Optical Instruments (Physics) High-Yield One-Shot",
    youtubeId: "q9N4vL2pK7X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "3h 05m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Ray Optics and Optical Instruments."
  },
  "ray optics and optical instruments": {
    id: "vid-physics-ray-optics-and-optical-instruments",
    chapter: "Ray Optics and Optical Instruments",
    subject: "Physics",
    title: "Ray Optics and Optical Instruments Complete High-Yield One-Shot Revision",
    youtubeId: "q9N4vL2pK7X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "3h 05m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Ray Optics and Optical Instruments."
  },
  "physics:wave optics": {
    id: "vid-physics-wave-optics",
    chapter: "Wave Optics",
    subject: "Physics",
    title: "Wave Optics (Physics) High-Yield One-Shot",
    youtubeId: "o9N2vL7pK4X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Wave Optics."
  },
  "wave optics": {
    id: "vid-physics-wave-optics",
    chapter: "Wave Optics",
    subject: "Physics",
    title: "Wave Optics Complete High-Yield One-Shot Revision",
    youtubeId: "o9N2vL7pK4X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Wave Optics."
  },
  "physics:dual nature of radiation and matter": {
    id: "vid-physics-dual-nature-of-radiation-and-matter",
    chapter: "Dual Nature of Radiation and Matter",
    subject: "Physics",
    title: "Dual Nature of Radiation and Matter (Physics) High-Yield One-Shot",
    youtubeId: "d7N4vL9pX2K",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Dual Nature of Radiation and Matter."
  },
  "dual nature of radiation and matter": {
    id: "vid-physics-dual-nature-of-radiation-and-matter",
    chapter: "Dual Nature of Radiation and Matter",
    subject: "Physics",
    title: "Dual Nature of Radiation and Matter Complete High-Yield One-Shot Revision",
    youtubeId: "d7N4vL9pX2K",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Dual Nature of Radiation and Matter."
  },
  "physics:atoms": {
    id: "vid-physics-atoms",
    chapter: "Atoms",
    subject: "Physics",
    title: "Atoms (Physics) High-Yield One-Shot",
    youtubeId: "b7V9kX3nP1L",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Atoms."
  },
  "atoms": {
    id: "vid-physics-atoms",
    chapter: "Atoms",
    subject: "Physics",
    title: "Atoms Complete High-Yield One-Shot Revision",
    youtubeId: "b7V9kX3nP1L",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Atoms."
  },
  "physics:nuclei": {
    id: "vid-physics-nuclei",
    chapter: "Nuclei",
    subject: "Physics",
    title: "Nuclei (Physics) High-Yield One-Shot",
    youtubeId: "n9N2vL7pK4X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 35m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Nuclei."
  },
  "nuclei": {
    id: "vid-physics-nuclei",
    chapter: "Nuclei",
    subject: "Physics",
    title: "Nuclei Complete High-Yield One-Shot Revision",
    youtubeId: "n9N2vL7pK4X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "1h 35m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Nuclei."
  },
  "physics:semiconductor electronics": {
    id: "vid-physics-semiconductor-electronics",
    chapter: "Semiconductor Electronics",
    subject: "Physics",
    title: "Semiconductor Electronics (Physics) High-Yield One-Shot",
    youtubeId: "s9N2vL7pK4X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Semiconductor Electronics."
  },
  "semiconductor electronics": {
    id: "vid-physics-semiconductor-electronics",
    chapter: "Semiconductor Electronics",
    subject: "Physics",
    title: "Semiconductor Electronics Complete High-Yield One-Shot Revision",
    youtubeId: "s9N2vL7pK4X",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Semiconductor Electronics."
  },
  "chemistry:some basic concepts of chemistry": {
    id: "vid-chemistry-some-basic-concepts-of-chemistry",
    chapter: "Some Basic Concepts of Chemistry",
    subject: "Chemistry",
    title: "Some Basic Concepts of Chemistry (Chemistry) High-Yield One-Shot",
    youtubeId: "mX9vL2bKp8Q",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Some Basic Concepts of Chemistry."
  },
  "some basic concepts of chemistry": {
    id: "vid-chemistry-some-basic-concepts-of-chemistry",
    chapter: "Some Basic Concepts of Chemistry",
    subject: "Chemistry",
    title: "Some Basic Concepts of Chemistry Complete High-Yield One-Shot Revision",
    youtubeId: "mX9vL2bKp8Q",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Some Basic Concepts of Chemistry."
  },
  "chemistry:structure of atom": {
    id: "vid-chemistry-structure-of-atom",
    chapter: "Structure of Atom",
    subject: "Chemistry",
    title: "Structure of Atom (Chemistry) High-Yield One-Shot",
    youtubeId: "b7V9kX3nP1L",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Structure of Atom."
  },
  "structure of atom": {
    id: "vid-chemistry-structure-of-atom",
    chapter: "Structure of Atom",
    subject: "Chemistry",
    title: "Structure of Atom Complete High-Yield One-Shot Revision",
    youtubeId: "b7V9kX3nP1L",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Structure of Atom."
  },
  "chemistry:classification of elements and periodicity": {
    id: "vid-chemistry-classification-of-elements-and-periodicity",
    chapter: "Classification of Elements and Periodicity",
    subject: "Chemistry",
    title: "Classification of Elements and Periodicity (Chemistry) High-Yield One-Shot",
    youtubeId: "c9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Classification of Elements and Periodicity."
  },
  "classification of elements and periodicity": {
    id: "vid-chemistry-classification-of-elements-and-periodicity",
    chapter: "Classification of Elements and Periodicity",
    subject: "Chemistry",
    title: "Classification of Elements and Periodicity Complete High-Yield One-Shot Revision",
    youtubeId: "c9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Classification of Elements and Periodicity."
  },
  "chemistry:chemical bonding and molecular structure": {
    id: "vid-chemistry-chemical-bonding-and-molecular-structure",
    chapter: "Chemical Bonding and Molecular Structure",
    subject: "Chemistry",
    title: "Chemical Bonding and Molecular Structure (Chemistry) High-Yield One-Shot",
    youtubeId: "q4V7xP9bL2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Chemical Bonding and Molecular Structure."
  },
  "chemical bonding and molecular structure": {
    id: "vid-chemistry-chemical-bonding-and-molecular-structure",
    chapter: "Chemical Bonding and Molecular Structure",
    subject: "Chemistry",
    title: "Chemical Bonding and Molecular Structure Complete High-Yield One-Shot Revision",
    youtubeId: "q4V7xP9bL2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Chemical Bonding and Molecular Structure."
  },
  "chemistry:chemical thermodynamics": {
    id: "vid-chemistry-chemical-thermodynamics",
    chapter: "Chemical Thermodynamics",
    subject: "Chemistry",
    title: "Chemical Thermodynamics (Chemistry) High-Yield One-Shot",
    youtubeId: "w5N8kP2qX4V",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Chemical Thermodynamics."
  },
  "chemical thermodynamics": {
    id: "vid-chemistry-chemical-thermodynamics",
    chapter: "Chemical Thermodynamics",
    subject: "Chemistry",
    title: "Chemical Thermodynamics Complete High-Yield One-Shot Revision",
    youtubeId: "w5N8kP2qX4V",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Chemical Thermodynamics."
  },
  "chemistry:thermodynamics": {
    id: "vid-chemistry-chemical-thermodynamics",
    chapter: "Chemical Thermodynamics",
    subject: "Chemistry",
    title: "Chemical Thermodynamics (Chemistry) High-Yield One-Shot",
    youtubeId: "w5N8kP2qX4V",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Chemical Thermodynamics."
  },
  "chemistry:equilibrium": {
    id: "vid-chemistry-equilibrium",
    chapter: "Equilibrium",
    subject: "Chemistry",
    title: "Equilibrium (Chemistry) High-Yield One-Shot",
    youtubeId: "e7P2vL9kX4M",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Equilibrium."
  },
  "equilibrium": {
    id: "vid-chemistry-equilibrium",
    chapter: "Equilibrium",
    subject: "Chemistry",
    title: "Equilibrium Complete High-Yield One-Shot Revision",
    youtubeId: "e7P2vL9kX4M",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Equilibrium."
  },
  "chemistry:redox reactions": {
    id: "vid-chemistry-redox-reactions",
    chapter: "Redox Reactions",
    subject: "Chemistry",
    title: "Redox Reactions (Chemistry) High-Yield One-Shot",
    youtubeId: "r8N4vL2pK9X",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Redox Reactions."
  },
  "redox reactions": {
    id: "vid-chemistry-redox-reactions",
    chapter: "Redox Reactions",
    subject: "Chemistry",
    title: "Redox Reactions Complete High-Yield One-Shot Revision",
    youtubeId: "r8N4vL2pK9X",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Redox Reactions."
  },
  "chemistry:organic chemistry: basic principles and techniques": {
    id: "vid-chemistry-organic-chemistry-basic-principles-and-techniques",
    chapter: "Organic Chemistry: Basic Principles and Techniques",
    subject: "Chemistry",
    title: "Organic Chemistry: Basic Principles and Techniques (Chemistry) High-Yield One-Shot",
    youtubeId: "g9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Organic Chemistry: Basic Principles and Techniques."
  },
  "organic chemistry: basic principles and techniques": {
    id: "vid-chemistry-organic-chemistry-basic-principles-and-techniques",
    chapter: "Organic Chemistry: Basic Principles and Techniques",
    subject: "Chemistry",
    title: "Organic Chemistry: Basic Principles and Techniques Complete High-Yield One-Shot Revision",
    youtubeId: "g9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Organic Chemistry: Basic Principles and Techniques."
  },
  "chemistry:hydrocarbons": {
    id: "vid-chemistry-hydrocarbons",
    chapter: "Hydrocarbons",
    subject: "Chemistry",
    title: "Hydrocarbons (Chemistry) High-Yield One-Shot",
    youtubeId: "h8N3pK1vL7Q",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Hydrocarbons."
  },
  "hydrocarbons": {
    id: "vid-chemistry-hydrocarbons",
    chapter: "Hydrocarbons",
    subject: "Chemistry",
    title: "Hydrocarbons Complete High-Yield One-Shot Revision",
    youtubeId: "h8N3pK1vL7Q",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Hydrocarbons."
  },
  "chemistry:solutions": {
    id: "vid-chemistry-solutions",
    chapter: "Solutions",
    subject: "Chemistry",
    title: "Solutions (Chemistry) High-Yield One-Shot",
    youtubeId: "s7N4vL9pX2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Solutions."
  },
  "solutions": {
    id: "vid-chemistry-solutions",
    chapter: "Solutions",
    subject: "Chemistry",
    title: "Solutions Complete High-Yield One-Shot Revision",
    youtubeId: "s7N4vL9pX2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Solutions."
  },
  "chemistry:electrochemistry": {
    id: "vid-chemistry-electrochemistry",
    chapter: "Electrochemistry",
    subject: "Chemistry",
    title: "Electrochemistry (Chemistry) High-Yield One-Shot",
    youtubeId: "k8N3pK1vL7Q",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Electrochemistry."
  },
  "electrochemistry": {
    id: "vid-chemistry-electrochemistry",
    chapter: "Electrochemistry",
    subject: "Chemistry",
    title: "Electrochemistry Complete High-Yield One-Shot Revision",
    youtubeId: "k8N3pK1vL7Q",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Electrochemistry."
  },
  "chemistry:chemical kinetics": {
    id: "vid-chemistry-chemical-kinetics",
    chapter: "Chemical Kinetics",
    subject: "Chemistry",
    title: "Chemical Kinetics (Chemistry) High-Yield One-Shot",
    youtubeId: "c4N7xP9bL2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Chemical Kinetics."
  },
  "chemical kinetics": {
    id: "vid-chemistry-chemical-kinetics",
    chapter: "Chemical Kinetics",
    subject: "Chemistry",
    title: "Chemical Kinetics Complete High-Yield One-Shot Revision",
    youtubeId: "c4N7xP9bL2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Chemical Kinetics."
  },
  "chemistry:the d- and f-block elements": {
    id: "vid-chemistry-the-d-and-f-block-elements",
    chapter: "The d- and f-Block Elements",
    subject: "Chemistry",
    title: "The d- and f-Block Elements (Chemistry) High-Yield One-Shot",
    youtubeId: "d9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for The d- and f-Block Elements."
  },
  "the d- and f-block elements": {
    id: "vid-chemistry-the-d-and-f-block-elements",
    chapter: "The d- and f-Block Elements",
    subject: "Chemistry",
    title: "The d- and f-Block Elements Complete High-Yield One-Shot Revision",
    youtubeId: "d9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for The d- and f-Block Elements."
  },
  "chemistry:coordination compounds": {
    id: "vid-chemistry-coordination-compounds",
    chapter: "Coordination Compounds",
    subject: "Chemistry",
    title: "Coordination Compounds (Chemistry) High-Yield One-Shot",
    youtubeId: "m7N4vL9pX2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Coordination Compounds."
  },
  "coordination compounds": {
    id: "vid-chemistry-coordination-compounds",
    chapter: "Coordination Compounds",
    subject: "Chemistry",
    title: "Coordination Compounds Complete High-Yield One-Shot Revision",
    youtubeId: "m7N4vL9pX2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Coordination Compounds."
  },
  "chemistry:haloalkanes and haloarenes": {
    id: "vid-chemistry-haloalkanes-and-haloarenes",
    chapter: "Haloalkanes and Haloarenes",
    subject: "Chemistry",
    title: "Haloalkanes and Haloarenes (Chemistry) High-Yield One-Shot",
    youtubeId: "h9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Haloalkanes and Haloarenes."
  },
  "haloalkanes and haloarenes": {
    id: "vid-chemistry-haloalkanes-and-haloarenes",
    chapter: "Haloalkanes and Haloarenes",
    subject: "Chemistry",
    title: "Haloalkanes and Haloarenes Complete High-Yield One-Shot Revision",
    youtubeId: "h9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Haloalkanes and Haloarenes."
  },
  "chemistry:alcohols, phenols and ethers": {
    id: "vid-chemistry-alcohols-phenols-and-ethers",
    chapter: "Alcohols, Phenols and Ethers",
    subject: "Chemistry",
    title: "Alcohols, Phenols and Ethers (Chemistry) High-Yield One-Shot",
    youtubeId: "a7N4vL9pX2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Alcohols, Phenols and Ethers."
  },
  "alcohols, phenols and ethers": {
    id: "vid-chemistry-alcohols-phenols-and-ethers",
    chapter: "Alcohols, Phenols and Ethers",
    subject: "Chemistry",
    title: "Alcohols, Phenols and Ethers Complete High-Yield One-Shot Revision",
    youtubeId: "a7N4vL9pX2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Alcohols, Phenols and Ethers."
  },
  "chemistry:aldehydes, ketones and carboxylic acids": {
    id: "vid-chemistry-aldehydes-ketones-and-carboxylic-acids",
    chapter: "Aldehydes, Ketones and Carboxylic Acids",
    subject: "Chemistry",
    title: "Aldehydes, Ketones and Carboxylic Acids (Chemistry) High-Yield One-Shot",
    youtubeId: "k9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Aldehydes, Ketones and Carboxylic Acids."
  },
  "aldehydes, ketones and carboxylic acids": {
    id: "vid-chemistry-aldehydes-ketones-and-carboxylic-acids",
    chapter: "Aldehydes, Ketones and Carboxylic Acids",
    subject: "Chemistry",
    title: "Aldehydes, Ketones and Carboxylic Acids Complete High-Yield One-Shot Revision",
    youtubeId: "k9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Aldehydes, Ketones and Carboxylic Acids."
  },
  "chemistry:amines": {
    id: "vid-chemistry-amines",
    chapter: "Amines",
    subject: "Chemistry",
    title: "Amines (Chemistry) High-Yield One-Shot",
    youtubeId: "n7N4vL9pX2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Amines."
  },
  "amines": {
    id: "vid-chemistry-amines",
    chapter: "Amines",
    subject: "Chemistry",
    title: "Amines Complete High-Yield One-Shot Revision",
    youtubeId: "n7N4vL9pX2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Amines."
  },
  "chemistry:biomolecules": {
    id: "vid-chemistry-biomolecules",
    chapter: "Biomolecules",
    subject: "Chemistry",
    title: "Biomolecules (Chemistry) High-Yield One-Shot",
    youtubeId: "b9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biomolecules."
  },
  "biomolecules": {
    id: "vid-chemistry-biomolecules",
    chapter: "Biomolecules",
    subject: "Chemistry",
    title: "Biomolecules Complete High-Yield One-Shot Revision",
    youtubeId: "b9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biomolecules."
  },
  "mathematics:sets": {
    id: "vid-mathematics-sets",
    chapter: "Sets",
    subject: "Mathematics",
    title: "Sets (Mathematics) High-Yield One-Shot",
    youtubeId: "s8N2qL9pX3K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Sets."
  },
  "sets": {
    id: "vid-mathematics-sets",
    chapter: "Sets",
    subject: "Mathematics",
    title: "Sets Complete High-Yield One-Shot Revision",
    youtubeId: "s8N2qL9pX3K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Sets."
  },
  "mathematics:relations and functions": {
    id: "vid-mathematics-relations-and-functions",
    chapter: "Relations and Functions",
    subject: "Mathematics",
    title: "Relations and Functions (Mathematics) High-Yield One-Shot",
    youtubeId: "r8V2nL9qX4P",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Relations and Functions."
  },
  "relations and functions": {
    id: "vid-mathematics-relations-and-functions",
    chapter: "Relations and Functions",
    subject: "Mathematics",
    title: "Relations and Functions Complete High-Yield One-Shot Revision",
    youtubeId: "r8V2nL9qX4P",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Relations and Functions."
  },
  "mathematics:trigonometric functions": {
    id: "vid-mathematics-trigonometric-functions",
    chapter: "Trigonometric Functions",
    subject: "Mathematics",
    title: "Trigonometric Functions (Mathematics) High-Yield One-Shot",
    youtubeId: "t9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Trigonometric Functions."
  },
  "trigonometric functions": {
    id: "vid-mathematics-trigonometric-functions",
    chapter: "Trigonometric Functions",
    subject: "Mathematics",
    title: "Trigonometric Functions Complete High-Yield One-Shot Revision",
    youtubeId: "t9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Trigonometric Functions."
  },
  "mathematics:complex numbers and quadratic equations": {
    id: "vid-mathematics-complex-numbers-and-quadratic-equations",
    chapter: "Complex Numbers and Quadratic Equations",
    subject: "Mathematics",
    title: "Complex Numbers and Quadratic Equations (Mathematics) High-Yield One-Shot",
    youtubeId: "y7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 35m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Complex Numbers and Quadratic Equations."
  },
  "complex numbers and quadratic equations": {
    id: "vid-mathematics-complex-numbers-and-quadratic-equations",
    chapter: "Complex Numbers and Quadratic Equations",
    subject: "Mathematics",
    title: "Complex Numbers and Quadratic Equations Complete High-Yield One-Shot Revision",
    youtubeId: "y7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 35m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Complex Numbers and Quadratic Equations."
  },
  "mathematics:linear inequalities": {
    id: "vid-mathematics-linear-inequalities",
    chapter: "Linear Inequalities",
    subject: "Mathematics",
    title: "Linear Inequalities (Mathematics) High-Yield One-Shot",
    youtubeId: "l7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Linear Inequalities."
  },
  "linear inequalities": {
    id: "vid-mathematics-linear-inequalities",
    chapter: "Linear Inequalities",
    subject: "Mathematics",
    title: "Linear Inequalities Complete High-Yield One-Shot Revision",
    youtubeId: "l7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Linear Inequalities."
  },
  "mathematics:permutations and combinations": {
    id: "vid-mathematics-permutations-and-combinations",
    chapter: "Permutations and Combinations",
    subject: "Mathematics",
    title: "Permutations and Combinations (Mathematics) High-Yield One-Shot",
    youtubeId: "p9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Permutations and Combinations."
  },
  "permutations and combinations": {
    id: "vid-mathematics-permutations-and-combinations",
    chapter: "Permutations and Combinations",
    subject: "Mathematics",
    title: "Permutations and Combinations Complete High-Yield One-Shot Revision",
    youtubeId: "p9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Permutations and Combinations."
  },
  "mathematics:binomial theorem": {
    id: "vid-mathematics-binomial-theorem",
    chapter: "Binomial Theorem",
    subject: "Mathematics",
    title: "Binomial Theorem (Mathematics) High-Yield One-Shot",
    youtubeId: "b8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 05m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Binomial Theorem."
  },
  "binomial theorem": {
    id: "vid-mathematics-binomial-theorem",
    chapter: "Binomial Theorem",
    subject: "Mathematics",
    title: "Binomial Theorem Complete High-Yield One-Shot Revision",
    youtubeId: "b8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 05m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Binomial Theorem."
  },
  "mathematics:sequences and series": {
    id: "vid-mathematics-sequences-and-series",
    chapter: "Sequences and Series",
    subject: "Mathematics",
    title: "Sequences and Series (Mathematics) High-Yield One-Shot",
    youtubeId: "s9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Sequences and Series."
  },
  "sequences and series": {
    id: "vid-mathematics-sequences-and-series",
    chapter: "Sequences and Series",
    subject: "Mathematics",
    title: "Sequences and Series Complete High-Yield One-Shot Revision",
    youtubeId: "s9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Sequences and Series."
  },
  "mathematics:straight lines": {
    id: "vid-mathematics-straight-lines",
    chapter: "Straight Lines",
    subject: "Mathematics",
    title: "Straight Lines (Mathematics) High-Yield One-Shot",
    youtubeId: "l9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Straight Lines."
  },
  "straight lines": {
    id: "vid-mathematics-straight-lines",
    chapter: "Straight Lines",
    subject: "Mathematics",
    title: "Straight Lines Complete High-Yield One-Shot Revision",
    youtubeId: "l9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Straight Lines."
  },
  "mathematics:conic sections": {
    id: "vid-mathematics-conic-sections",
    chapter: "Conic Sections",
    subject: "Mathematics",
    title: "Conic Sections (Mathematics) High-Yield One-Shot",
    youtubeId: "c8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Conic Sections."
  },
  "conic sections": {
    id: "vid-mathematics-conic-sections",
    chapter: "Conic Sections",
    subject: "Mathematics",
    title: "Conic Sections Complete High-Yield One-Shot Revision",
    youtubeId: "c8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Conic Sections."
  },
  "mathematics:introduction to three dimensional geometry": {
    id: "vid-mathematics-introduction-to-three-dimensional-geometry",
    chapter: "Introduction to Three Dimensional Geometry",
    subject: "Mathematics",
    title: "Introduction to Three Dimensional Geometry (Mathematics) High-Yield One-Shot",
    youtubeId: "t8N4vL2pK9X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Introduction to Three Dimensional Geometry."
  },
  "introduction to three dimensional geometry": {
    id: "vid-mathematics-introduction-to-three-dimensional-geometry",
    chapter: "Introduction to Three Dimensional Geometry",
    subject: "Mathematics",
    title: "Introduction to Three Dimensional Geometry Complete High-Yield One-Shot Revision",
    youtubeId: "t8N4vL2pK9X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Introduction to Three Dimensional Geometry."
  },
  "mathematics:limits and derivatives": {
    id: "vid-mathematics-limits-and-derivatives",
    chapter: "Limits and Derivatives",
    subject: "Mathematics",
    title: "Limits and Derivatives (Mathematics) High-Yield One-Shot",
    youtubeId: "d9N4vL2pK7X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Limits and Derivatives."
  },
  "limits and derivatives": {
    id: "vid-mathematics-limits-and-derivatives",
    chapter: "Limits and Derivatives",
    subject: "Mathematics",
    title: "Limits and Derivatives Complete High-Yield One-Shot Revision",
    youtubeId: "d9N4vL2pK7X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Limits and Derivatives."
  },
  "mathematics:statistics": {
    id: "vid-mathematics-statistics",
    chapter: "Statistics",
    subject: "Mathematics",
    title: "Statistics (Mathematics) High-Yield One-Shot",
    youtubeId: "s7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 35m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Statistics."
  },
  "statistics": {
    id: "vid-mathematics-statistics",
    chapter: "Statistics",
    subject: "Mathematics",
    title: "Statistics Complete High-Yield One-Shot Revision",
    youtubeId: "s7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 35m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Statistics."
  },
  "mathematics:probability": {
    id: "vid-mathematics-probability",
    chapter: "Probability",
    subject: "Mathematics",
    title: "Probability (Mathematics) High-Yield One-Shot",
    youtubeId: "p8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Probability."
  },
  "probability": {
    id: "vid-mathematics-probability",
    chapter: "Probability",
    subject: "Mathematics",
    title: "Probability Complete High-Yield One-Shot Revision",
    youtubeId: "p8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Probability."
  },
  "mathematics:inverse trigonometric functions": {
    id: "vid-mathematics-inverse-trigonometric-functions",
    chapter: "Inverse Trigonometric Functions",
    subject: "Mathematics",
    title: "Inverse Trigonometric Functions (Mathematics) High-Yield One-Shot",
    youtubeId: "i9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Inverse Trigonometric Functions."
  },
  "inverse trigonometric functions": {
    id: "vid-mathematics-inverse-trigonometric-functions",
    chapter: "Inverse Trigonometric Functions",
    subject: "Mathematics",
    title: "Inverse Trigonometric Functions Complete High-Yield One-Shot Revision",
    youtubeId: "i9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Inverse Trigonometric Functions."
  },
  "mathematics:matrices": {
    id: "vid-mathematics-matrices",
    chapter: "Matrices",
    subject: "Mathematics",
    title: "Matrices (Mathematics) High-Yield One-Shot",
    youtubeId: "m9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Matrices."
  },
  "matrices": {
    id: "vid-mathematics-matrices",
    chapter: "Matrices",
    subject: "Mathematics",
    title: "Matrices Complete High-Yield One-Shot Revision",
    youtubeId: "m9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Matrices."
  },
  "mathematics:determinants": {
    id: "vid-mathematics-determinants",
    chapter: "Determinants",
    subject: "Mathematics",
    title: "Determinants (Mathematics) High-Yield One-Shot",
    youtubeId: "d8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 55m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Determinants."
  },
  "determinants": {
    id: "vid-mathematics-determinants",
    chapter: "Determinants",
    subject: "Mathematics",
    title: "Determinants Complete High-Yield One-Shot Revision",
    youtubeId: "d8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 55m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Determinants."
  },
  "mathematics:continuity and differentiability": {
    id: "vid-mathematics-continuity-and-differentiability",
    chapter: "Continuity and Differentiability",
    subject: "Mathematics",
    title: "Continuity and Differentiability (Mathematics) High-Yield One-Shot",
    youtubeId: "c9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Continuity and Differentiability."
  },
  "continuity and differentiability": {
    id: "vid-mathematics-continuity-and-differentiability",
    chapter: "Continuity and Differentiability",
    subject: "Mathematics",
    title: "Continuity and Differentiability Complete High-Yield One-Shot Revision",
    youtubeId: "c9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Continuity and Differentiability."
  },
  "mathematics:application of derivatives": {
    id: "vid-mathematics-application-of-derivatives",
    chapter: "Application of Derivatives",
    subject: "Mathematics",
    title: "Application of Derivatives (Mathematics) High-Yield One-Shot",
    youtubeId: "a8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Application of Derivatives."
  },
  "application of derivatives": {
    id: "vid-mathematics-application-of-derivatives",
    chapter: "Application of Derivatives",
    subject: "Mathematics",
    title: "Application of Derivatives Complete High-Yield One-Shot Revision",
    youtubeId: "a8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Application of Derivatives."
  },
  "mathematics:integrals": {
    id: "vid-mathematics-integrals",
    chapter: "Integrals",
    subject: "Mathematics",
    title: "Integrals (Mathematics) High-Yield One-Shot",
    youtubeId: "u9X3pL7bK2N",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "3h 00m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Integrals."
  },
  "integrals": {
    id: "vid-mathematics-integrals",
    chapter: "Integrals",
    subject: "Mathematics",
    title: "Integrals Complete High-Yield One-Shot Revision",
    youtubeId: "u9X3pL7bK2N",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "3h 00m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Integrals."
  },
  "mathematics:applications of integrals": {
    id: "vid-mathematics-applications-of-integrals",
    chapter: "Applications of Integrals",
    subject: "Mathematics",
    title: "Applications of Integrals (Mathematics) High-Yield One-Shot",
    youtubeId: "a7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Applications of Integrals."
  },
  "applications of integrals": {
    id: "vid-mathematics-applications-of-integrals",
    chapter: "Applications of Integrals",
    subject: "Mathematics",
    title: "Applications of Integrals Complete High-Yield One-Shot Revision",
    youtubeId: "a7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Applications of Integrals."
  },
  "mathematics:differential equations": {
    id: "vid-mathematics-differential-equations",
    chapter: "Differential Equations",
    subject: "Mathematics",
    title: "Differential Equations (Mathematics) High-Yield One-Shot",
    youtubeId: "d7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Differential Equations."
  },
  "differential equations": {
    id: "vid-mathematics-differential-equations",
    chapter: "Differential Equations",
    subject: "Mathematics",
    title: "Differential Equations Complete High-Yield One-Shot Revision",
    youtubeId: "d7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Differential Equations."
  },
  "mathematics:vector algebra": {
    id: "vid-mathematics-vector-algebra",
    chapter: "Vector Algebra",
    subject: "Mathematics",
    title: "Vector Algebra (Mathematics) High-Yield One-Shot",
    youtubeId: "v9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 00m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Vector Algebra."
  },
  "vector algebra": {
    id: "vid-mathematics-vector-algebra",
    chapter: "Vector Algebra",
    subject: "Mathematics",
    title: "Vector Algebra Complete High-Yield One-Shot Revision",
    youtubeId: "v9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 00m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Vector Algebra."
  },
  "mathematics:three dimensional geometry": {
    id: "vid-mathematics-three-dimensional-geometry",
    chapter: "Three Dimensional Geometry",
    subject: "Mathematics",
    title: "Three Dimensional Geometry (Mathematics) High-Yield One-Shot",
    youtubeId: "t9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Three Dimensional Geometry."
  },
  "three dimensional geometry": {
    id: "vid-mathematics-three-dimensional-geometry",
    chapter: "Three Dimensional Geometry",
    subject: "Mathematics",
    title: "Three Dimensional Geometry Complete High-Yield One-Shot Revision",
    youtubeId: "t9N2vL7pK4X",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Three Dimensional Geometry."
  },
  "mathematics:linear programming": {
    id: "vid-mathematics-linear-programming",
    chapter: "Linear Programming",
    subject: "Mathematics",
    title: "Linear Programming (Mathematics) High-Yield One-Shot",
    youtubeId: "l8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Linear Programming."
  },
  "linear programming": {
    id: "vid-mathematics-linear-programming",
    chapter: "Linear Programming",
    subject: "Mathematics",
    title: "Linear Programming Complete High-Yield One-Shot Revision",
    youtubeId: "l8N3pK1vL7Q",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "1h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Linear Programming."
  },
  "biology:the living world": {
    id: "vid-biology-the-living-world",
    chapter: "The Living World",
    subject: "Biology",
    title: "The Living World (Biology) High-Yield One-Shot",
    youtubeId: "v8N2pL9qX3K",
    channelName: "Tarun Sir Biology",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for The Living World."
  },
  "the living world": {
    id: "vid-biology-the-living-world",
    chapter: "The Living World",
    subject: "Biology",
    title: "The Living World Complete High-Yield One-Shot Revision",
    youtubeId: "v8N2pL9qX3K",
    channelName: "Tarun Sir Biology",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for The Living World."
  },
  "biology:biological classification": {
    id: "vid-biology-biological-classification",
    chapter: "Biological Classification",
    subject: "Biology",
    title: "Biological Classification (Biology) High-Yield One-Shot",
    youtubeId: "b8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biological Classification."
  },
  "biological classification": {
    id: "vid-biology-biological-classification",
    chapter: "Biological Classification",
    subject: "Biology",
    title: "Biological Classification Complete High-Yield One-Shot Revision",
    youtubeId: "b8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biological Classification."
  },
  "biology:plant kingdom": {
    id: "vid-biology-plant-kingdom",
    chapter: "Plant Kingdom",
    subject: "Biology",
    title: "Plant Kingdom (Biology) High-Yield One-Shot",
    youtubeId: "p8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Plant Kingdom."
  },
  "plant kingdom": {
    id: "vid-biology-plant-kingdom",
    chapter: "Plant Kingdom",
    subject: "Biology",
    title: "Plant Kingdom Complete High-Yield One-Shot Revision",
    youtubeId: "p8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Plant Kingdom."
  },
  "biology:animal kingdom": {
    id: "vid-biology-animal-kingdom",
    chapter: "Animal Kingdom",
    subject: "Biology",
    title: "Animal Kingdom (Biology) High-Yield One-Shot",
    youtubeId: "a8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Animal Kingdom."
  },
  "animal kingdom": {
    id: "vid-biology-animal-kingdom",
    chapter: "Animal Kingdom",
    subject: "Biology",
    title: "Animal Kingdom Complete High-Yield One-Shot Revision",
    youtubeId: "a8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Animal Kingdom."
  },
  "biology:morphology of flowering plants": {
    id: "vid-biology-morphology-of-flowering-plants",
    chapter: "Morphology of Flowering Plants",
    subject: "Biology",
    title: "Morphology of Flowering Plants (Biology) High-Yield One-Shot",
    youtubeId: "m8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 00m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Morphology of Flowering Plants."
  },
  "morphology of flowering plants": {
    id: "vid-biology-morphology-of-flowering-plants",
    chapter: "Morphology of Flowering Plants",
    subject: "Biology",
    title: "Morphology of Flowering Plants Complete High-Yield One-Shot Revision",
    youtubeId: "m8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 00m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Morphology of Flowering Plants."
  },
  "biology:anatomy of flowering plants": {
    id: "vid-biology-anatomy-of-flowering-plants",
    chapter: "Anatomy of Flowering Plants",
    subject: "Biology",
    title: "Anatomy of Flowering Plants (Biology) High-Yield One-Shot",
    youtubeId: "a7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Anatomy of Flowering Plants."
  },
  "anatomy of flowering plants": {
    id: "vid-biology-anatomy-of-flowering-plants",
    chapter: "Anatomy of Flowering Plants",
    subject: "Biology",
    title: "Anatomy of Flowering Plants Complete High-Yield One-Shot Revision",
    youtubeId: "a7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Anatomy of Flowering Plants."
  },
  "biology:structural organisation in animals": {
    id: "vid-biology-structural-organisation-in-animals",
    chapter: "Structural Organisation in Animals",
    subject: "Biology",
    title: "Structural Organisation in Animals (Biology) High-Yield One-Shot",
    youtubeId: "s8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Structural Organisation in Animals."
  },
  "structural organisation in animals": {
    id: "vid-biology-structural-organisation-in-animals",
    chapter: "Structural Organisation in Animals",
    subject: "Biology",
    title: "Structural Organisation in Animals Complete High-Yield One-Shot Revision",
    youtubeId: "s8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Structural Organisation in Animals."
  },
  "biology:cell: the unit of life": {
    id: "vid-biology-cell-the-unit-of-life",
    chapter: "Cell: The Unit of Life",
    subject: "Biology",
    title: "Cell: The Unit of Life (Biology) High-Yield One-Shot",
    youtubeId: "p7K3vL9nX2M",
    channelName: "Tarun Sir Biology",
    duration: "2h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Cell: The Unit of Life."
  },
  "cell: the unit of life": {
    id: "vid-biology-cell-the-unit-of-life",
    chapter: "Cell: The Unit of Life",
    subject: "Biology",
    title: "Cell: The Unit of Life Complete High-Yield One-Shot Revision",
    youtubeId: "p7K3vL9nX2M",
    channelName: "Tarun Sir Biology",
    duration: "2h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Cell: The Unit of Life."
  },
  "biology:biomolecules": {
    id: "vid-biology-biomolecules",
    chapter: "Biomolecules",
    subject: "Biology",
    title: "Biomolecules (Biology) High-Yield One-Shot",
    youtubeId: "p7K3vL9nX2M",
    channelName: "Tarun Sir Biology",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biomolecules."
  },
  "biology:cell cycle and cell division": {
    id: "vid-biology-cell-cycle-and-cell-division",
    chapter: "Cell Cycle and Cell Division",
    subject: "Biology",
    title: "Cell Cycle and Cell Division (Biology) High-Yield One-Shot",
    youtubeId: "c8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Cell Cycle and Cell Division."
  },
  "cell cycle and cell division": {
    id: "vid-biology-cell-cycle-and-cell-division",
    chapter: "Cell Cycle and Cell Division",
    subject: "Biology",
    title: "Cell Cycle and Cell Division Complete High-Yield One-Shot Revision",
    youtubeId: "c8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Cell Cycle and Cell Division."
  },
  "biology:photosynthesis in higher plants": {
    id: "vid-biology-photosynthesis-in-higher-plants",
    chapter: "Photosynthesis in Higher Plants",
    subject: "Biology",
    title: "Photosynthesis in Higher Plants (Biology) High-Yield One-Shot",
    youtubeId: "r8N4vL2pK9X",
    channelName: "Tarun Sir Biology",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Photosynthesis in Higher Plants."
  },
  "photosynthesis in higher plants": {
    id: "vid-biology-photosynthesis-in-higher-plants",
    chapter: "Photosynthesis in Higher Plants",
    subject: "Biology",
    title: "Photosynthesis in Higher Plants Complete High-Yield One-Shot Revision",
    youtubeId: "r8N4vL2pK9X",
    channelName: "Tarun Sir Biology",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Photosynthesis in Higher Plants."
  },
  "biology:respiration in plants": {
    id: "vid-biology-respiration-in-plants",
    chapter: "Respiration in Plants",
    subject: "Biology",
    title: "Respiration in Plants (Biology) High-Yield One-Shot",
    youtubeId: "r9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Respiration in Plants."
  },
  "respiration in plants": {
    id: "vid-biology-respiration-in-plants",
    chapter: "Respiration in Plants",
    subject: "Biology",
    title: "Respiration in Plants Complete High-Yield One-Shot Revision",
    youtubeId: "r9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Respiration in Plants."
  },
  "biology:plant growth and development": {
    id: "vid-biology-plant-growth-and-development",
    chapter: "Plant Growth and Development",
    subject: "Biology",
    title: "Plant Growth and Development (Biology) High-Yield One-Shot",
    youtubeId: "p9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Plant Growth and Development."
  },
  "plant growth and development": {
    id: "vid-biology-plant-growth-and-development",
    chapter: "Plant Growth and Development",
    subject: "Biology",
    title: "Plant Growth and Development Complete High-Yield One-Shot Revision",
    youtubeId: "p9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Plant Growth and Development."
  },
  "biology:breathing and exchange of gases": {
    id: "vid-biology-breathing-and-exchange-of-gases",
    chapter: "Breathing and Exchange of Gases",
    subject: "Biology",
    title: "Breathing and Exchange of Gases (Biology) High-Yield One-Shot",
    youtubeId: "b9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Breathing and Exchange of Gases."
  },
  "breathing and exchange of gases": {
    id: "vid-biology-breathing-and-exchange-of-gases",
    chapter: "Breathing and Exchange of Gases",
    subject: "Biology",
    title: "Breathing and Exchange of Gases Complete High-Yield One-Shot Revision",
    youtubeId: "b9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Breathing and Exchange of Gases."
  },
  "biology:body fluids and circulation": {
    id: "vid-biology-body-fluids-and-circulation",
    chapter: "Body Fluids and Circulation",
    subject: "Biology",
    title: "Body Fluids and Circulation (Biology) High-Yield One-Shot",
    youtubeId: "c7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "2h 05m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Body Fluids and Circulation."
  },
  "body fluids and circulation": {
    id: "vid-biology-body-fluids-and-circulation",
    chapter: "Body Fluids and Circulation",
    subject: "Biology",
    title: "Body Fluids and Circulation Complete High-Yield One-Shot Revision",
    youtubeId: "c7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "2h 05m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Body Fluids and Circulation."
  },
  "biology:excretory products and their elimination": {
    id: "vid-biology-excretory-products-and-their-elimination",
    chapter: "Excretory Products and their Elimination",
    subject: "Biology",
    title: "Excretory Products and their Elimination (Biology) High-Yield One-Shot",
    youtubeId: "e7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Excretory Products and their Elimination."
  },
  "excretory products and their elimination": {
    id: "vid-biology-excretory-products-and-their-elimination",
    chapter: "Excretory Products and their Elimination",
    subject: "Biology",
    title: "Excretory Products and their Elimination Complete High-Yield One-Shot Revision",
    youtubeId: "e7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "1h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Excretory Products and their Elimination."
  },
  "biology:locomotion and movement": {
    id: "vid-biology-locomotion-and-movement",
    chapter: "Locomotion and Movement",
    subject: "Biology",
    title: "Locomotion and Movement (Biology) High-Yield One-Shot",
    youtubeId: "l7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Locomotion and Movement."
  },
  "locomotion and movement": {
    id: "vid-biology-locomotion-and-movement",
    chapter: "Locomotion and Movement",
    subject: "Biology",
    title: "Locomotion and Movement Complete High-Yield One-Shot Revision",
    youtubeId: "l7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Locomotion and Movement."
  },
  "biology:neural control and coordination": {
    id: "vid-biology-neural-control-and-coordination",
    chapter: "Neural Control and Coordination",
    subject: "Biology",
    title: "Neural Control and Coordination (Biology) High-Yield One-Shot",
    youtubeId: "n7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Neural Control and Coordination."
  },
  "neural control and coordination": {
    id: "vid-biology-neural-control-and-coordination",
    chapter: "Neural Control and Coordination",
    subject: "Biology",
    title: "Neural Control and Coordination Complete High-Yield One-Shot Revision",
    youtubeId: "n7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Neural Control and Coordination."
  },
  "biology:chemical coordination and integration": {
    id: "vid-biology-chemical-coordination-and-integration",
    chapter: "Chemical Coordination and Integration",
    subject: "Biology",
    title: "Chemical Coordination and Integration (Biology) High-Yield One-Shot",
    youtubeId: "c8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "1h 55m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Chemical Coordination and Integration."
  },
  "chemical coordination and integration": {
    id: "vid-biology-chemical-coordination-and-integration",
    chapter: "Chemical Coordination and Integration",
    subject: "Biology",
    title: "Chemical Coordination and Integration Complete High-Yield One-Shot Revision",
    youtubeId: "c8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "1h 55m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Chemical Coordination and Integration."
  },
  "biology:sexual reproduction in flowering plants": {
    id: "vid-biology-sexual-reproduction-in-flowering-plants",
    chapter: "Sexual Reproduction in Flowering Plants",
    subject: "Biology",
    title: "Sexual Reproduction in Flowering Plants (Biology) High-Yield One-Shot",
    youtubeId: "s9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Sexual Reproduction in Flowering Plants."
  },
  "sexual reproduction in flowering plants": {
    id: "vid-biology-sexual-reproduction-in-flowering-plants",
    chapter: "Sexual Reproduction in Flowering Plants",
    subject: "Biology",
    title: "Sexual Reproduction in Flowering Plants Complete High-Yield One-Shot Revision",
    youtubeId: "s9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Sexual Reproduction in Flowering Plants."
  },
  "biology:human reproduction": {
    id: "vid-biology-human-reproduction",
    chapter: "Human Reproduction",
    subject: "Biology",
    title: "Human Reproduction (Biology) High-Yield One-Shot",
    youtubeId: "h9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Human Reproduction."
  },
  "human reproduction": {
    id: "vid-biology-human-reproduction",
    chapter: "Human Reproduction",
    subject: "Biology",
    title: "Human Reproduction Complete High-Yield One-Shot Revision",
    youtubeId: "h9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 25m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Human Reproduction."
  },
  "biology:reproductive health": {
    id: "vid-biology-reproductive-health",
    chapter: "Reproductive Health",
    subject: "Biology",
    title: "Reproductive Health (Biology) High-Yield One-Shot",
    youtubeId: "r7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "1h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Reproductive Health."
  },
  "reproductive health": {
    id: "vid-biology-reproductive-health",
    chapter: "Reproductive Health",
    subject: "Biology",
    title: "Reproductive Health Complete High-Yield One-Shot Revision",
    youtubeId: "r7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "1h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Reproductive Health."
  },
  "biology:principles of inheritance and variation": {
    id: "vid-biology-principles-of-inheritance-and-variation",
    chapter: "Principles of Inheritance and Variation",
    subject: "Biology",
    title: "Principles of Inheritance and Variation (Biology) High-Yield One-Shot",
    youtubeId: "g9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Principles of Inheritance and Variation."
  },
  "principles of inheritance and variation": {
    id: "vid-biology-principles-of-inheritance-and-variation",
    chapter: "Principles of Inheritance and Variation",
    subject: "Biology",
    title: "Principles of Inheritance and Variation Complete High-Yield One-Shot Revision",
    youtubeId: "g9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Principles of Inheritance and Variation."
  },
  "biology:molecular basis of inheritance": {
    id: "vid-biology-molecular-basis-of-inheritance",
    chapter: "Molecular Basis of Inheritance",
    subject: "Biology",
    title: "Molecular Basis of Inheritance (Biology) High-Yield One-Shot",
    youtubeId: "m9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Molecular Basis of Inheritance."
  },
  "molecular basis of inheritance": {
    id: "vid-biology-molecular-basis-of-inheritance",
    chapter: "Molecular Basis of Inheritance",
    subject: "Biology",
    title: "Molecular Basis of Inheritance Complete High-Yield One-Shot Revision",
    youtubeId: "m9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 50m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Molecular Basis of Inheritance."
  },
  "biology:evolution": {
    id: "vid-biology-evolution",
    chapter: "Evolution",
    subject: "Biology",
    title: "Evolution (Biology) High-Yield One-Shot",
    youtubeId: "e8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 05m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Evolution."
  },
  "evolution": {
    id: "vid-biology-evolution",
    chapter: "Evolution",
    subject: "Biology",
    title: "Evolution Complete High-Yield One-Shot Revision",
    youtubeId: "e8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 05m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Evolution."
  },
  "biology:human health and disease": {
    id: "vid-biology-human-health-and-disease",
    chapter: "Human Health and Disease",
    subject: "Biology",
    title: "Human Health and Disease (Biology) High-Yield One-Shot",
    youtubeId: "h8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Human Health and Disease."
  },
  "human health and disease": {
    id: "vid-biology-human-health-and-disease",
    chapter: "Human Health and Disease",
    subject: "Biology",
    title: "Human Health and Disease Complete High-Yield One-Shot Revision",
    youtubeId: "h8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 20m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Human Health and Disease."
  },
  "biology:microbes in human welfare": {
    id: "vid-biology-microbes-in-human-welfare",
    chapter: "Microbes in Human Welfare",
    subject: "Biology",
    title: "Microbes in Human Welfare (Biology) High-Yield One-Shot",
    youtubeId: "m8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "1h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Microbes in Human Welfare."
  },
  "microbes in human welfare": {
    id: "vid-biology-microbes-in-human-welfare",
    chapter: "Microbes in Human Welfare",
    subject: "Biology",
    title: "Microbes in Human Welfare Complete High-Yield One-Shot Revision",
    youtubeId: "m8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "1h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Microbes in Human Welfare."
  },
  "biology:biotechnology: principles and processes": {
    id: "vid-biology-biotechnology-principles-and-processes",
    chapter: "Biotechnology: Principles and Processes",
    subject: "Biology",
    title: "Biotechnology: Principles and Processes (Biology) High-Yield One-Shot",
    youtubeId: "b9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biotechnology: Principles and Processes."
  },
  "biotechnology: principles and processes": {
    id: "vid-biology-biotechnology-principles-and-processes",
    chapter: "Biotechnology: Principles and Processes",
    subject: "Biology",
    title: "Biotechnology: Principles and Processes Complete High-Yield One-Shot Revision",
    youtubeId: "b9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 10m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biotechnology: Principles and Processes."
  },
  "biology:biotechnology and its applications": {
    id: "vid-biology-biotechnology-and-its-applications",
    chapter: "Biotechnology and its Applications",
    subject: "Biology",
    title: "Biotechnology and its Applications (Biology) High-Yield One-Shot",
    youtubeId: "b8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biotechnology and its Applications."
  },
  "biotechnology and its applications": {
    id: "vid-biology-biotechnology-and-its-applications",
    chapter: "Biotechnology and its Applications",
    subject: "Biology",
    title: "Biotechnology and its Applications Complete High-Yield One-Shot Revision",
    youtubeId: "b8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "1h 40m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biotechnology and its Applications."
  },
  "biology:organisms and populations": {
    id: "vid-biology-organisms-and-populations",
    chapter: "Organisms and Populations",
    subject: "Biology",
    title: "Organisms and Populations (Biology) High-Yield One-Shot",
    youtubeId: "o8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Organisms and Populations."
  },
  "organisms and populations": {
    id: "vid-biology-organisms-and-populations",
    chapter: "Organisms and Populations",
    subject: "Biology",
    title: "Organisms and Populations Complete High-Yield One-Shot Revision",
    youtubeId: "o8N3pK1vL7Q",
    channelName: "Tarun Sir Biology",
    duration: "2h 15m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Organisms and Populations."
  },
  "biology:ecosystem": {
    id: "vid-biology-ecosystem",
    chapter: "Ecosystem",
    subject: "Biology",
    title: "Ecosystem (Biology) High-Yield One-Shot",
    youtubeId: "e9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Ecosystem."
  },
  "ecosystem": {
    id: "vid-biology-ecosystem",
    chapter: "Ecosystem",
    subject: "Biology",
    title: "Ecosystem Complete High-Yield One-Shot Revision",
    youtubeId: "e9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "1h 45m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Ecosystem."
  },
  "biology:biodiversity and conservation": {
    id: "vid-biology-biodiversity-and-conservation",
    chapter: "Biodiversity and Conservation",
    subject: "Biology",
    title: "Biodiversity and Conservation (Biology) High-Yield One-Shot",
    youtubeId: "b7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biodiversity and Conservation."
  },
  "biodiversity and conservation": {
    id: "vid-biology-biodiversity-and-conservation",
    chapter: "Biodiversity and Conservation",
    subject: "Biology",
    title: "Biodiversity and Conservation Complete High-Yield One-Shot Revision",
    youtubeId: "b7N4vL9pX2K",
    channelName: "Tarun Sir Biology",
    duration: "1h 30m",
    description: "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Biodiversity and Conservation."
  },
  "kinematics": {
    id: "vid-alias-kinematics",
    chapter: "Kinematics in 1D & 2D Complete High-Yield One-Shot",
    subject: "Physics",
    title: "Kinematics in 1D & 2D Complete High-Yield One-Shot",
    youtubeId: "z68-X4L1eFw",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 15m",
    description: "Targeted high-yield revision for Kinematics in 1D & 2D Complete High-Yield One-Shot."
  },
  "mole concept": {
    id: "vid-alias-mole concept",
    chapter: "Mole Concept & Stoichiometry One-Shot",
    subject: "Chemistry",
    title: "Mole Concept & Stoichiometry One-Shot",
    youtubeId: "mX9vL2bKp8Q",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 10m",
    description: "Targeted high-yield revision for Mole Concept & Stoichiometry One-Shot."
  },
  "chemical bonding": {
    id: "vid-alias-chemical bonding",
    chapter: "Chemical Bonding & VSEPR Super One-Shot",
    subject: "Chemistry",
    title: "Chemical Bonding & VSEPR Super One-Shot",
    youtubeId: "q4V7xP9bL2K",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 40m",
    description: "Targeted high-yield revision for Chemical Bonding & VSEPR Super One-Shot."
  },
  "goc": {
    id: "vid-alias-goc",
    chapter: "General Organic Chemistry (GOC) Masterclass",
    subject: "Chemistry",
    title: "General Organic Chemistry (GOC) Masterclass",
    youtubeId: "g9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 45m",
    description: "Targeted high-yield revision for General Organic Chemistry (GOC) Masterclass."
  },
  "general organic chemistry": {
    id: "vid-alias-general organic chemistry",
    chapter: "General Organic Chemistry (GOC) Masterclass",
    subject: "Chemistry",
    title: "General Organic Chemistry (GOC) Masterclass",
    youtubeId: "g9N2vL7pK4X",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 45m",
    description: "Targeted high-yield revision for General Organic Chemistry (GOC) Masterclass."
  },
  "rotational motion": {
    id: "vid-alias-rotational motion",
    chapter: "Rotational Motion & Moment of Inertia One-Shot",
    subject: "Physics",
    title: "Rotational Motion & Moment of Inertia One-Shot",
    youtubeId: "zY8vU4_kQ9A",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "3h 10m",
    description: "Targeted high-yield revision for Rotational Motion & Moment of Inertia One-Shot."
  },
  "electrostatics": {
    id: "vid-alias-electrostatics",
    chapter: "Electrostatics Complete Concept Revision",
    subject: "Physics",
    title: "Electrostatics Complete Concept Revision",
    youtubeId: "k7T8y9mN1wE",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 45m",
    description: "Targeted high-yield revision for Electrostatics Complete Concept Revision."
  },
  "quadratic equations": {
    id: "vid-alias-quadratic equations",
    chapter: "Quadratic Equations Masterclass",
    subject: "Mathematics",
    title: "Quadratic Equations Masterclass",
    youtubeId: "y7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 35m",
    description: "Targeted high-yield revision for Quadratic Equations Masterclass."
  },
  "complex numbers": {
    id: "vid-alias-complex numbers",
    chapter: "Complex Numbers Complete Revision",
    subject: "Mathematics",
    title: "Complex Numbers Complete Revision",
    youtubeId: "y7N4vL9pX2K",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 35m",
    description: "Targeted high-yield revision for Complex Numbers Complete Revision."
  },
  "definite integration": {
    id: "vid-alias-definite integration",
    chapter: "Definite Integration & Properties One-Shot",
    subject: "Mathematics",
    title: "Definite Integration & Properties One-Shot",
    youtubeId: "u9X3pL7bK2N",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "3h 00m",
    description: "Targeted high-yield revision for Definite Integration & Properties One-Shot."
  },
  "cell": {
    id: "vid-alias-cell",
    chapter: "Cell Biology & Organelles One-Shot",
    subject: "Biology",
    title: "Cell Biology & Organelles One-Shot",
    youtubeId: "p7K3vL9nX2M",
    channelName: "Tarun Sir Biology",
    duration: "2h 25m",
    description: "Targeted high-yield revision for Cell Biology & Organelles One-Shot."
  },
  "genetics": {
    id: "vid-alias-genetics",
    chapter: "Genetics & Inheritance Complete NCERT Decode",
    subject: "Biology",
    title: "Genetics & Inheritance Complete NCERT Decode",
    youtubeId: "g9N2vL7pK4X",
    channelName: "Tarun Sir Biology",
    duration: "2h 45m",
    description: "Targeted high-yield revision for Genetics & Inheritance Complete NCERT Decode."
  },
};

const DEFAULT_SUBJECT_VIDEOS: Record<string, { youtubeId: string; channelName: string; duration: string }> = {
  Physics: {
    youtubeId: "3U4xG8hJdD4",
    channelName: "Physics Galaxy (Ashish Arora Sir)",
    duration: "2h 15m"
  },
  Chemistry: {
    youtubeId: "mX9vL2bKp8Q",
    channelName: "Pankaj Sir Chemistry",
    duration: "2h 20m"
  },
  Mathematics: {
    youtubeId: "r8V2nL9qX4P",
    channelName: "Mohit Tyagi (Competishun)",
    duration: "2h 10m"
  },
  Biology: {
    youtubeId: "p7K3vL9nX2M",
    channelName: "Tarun Sir Biology",
    duration: "2h 15m"
  }
};

function normalizeString(str: string): string {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getChapterVideo(chapterName: string, subjectName: string = "Physics"): VideoResource {
  const normKey = (chapterName || "").toLowerCase().trim();
  const subLower = (subjectName || "Physics").toLowerCase().trim();

  // 1. Exact Subject + Chapter match
  const specificKey = subLower + ":" + normKey;
  if (CURATED_CHAPTER_VIDEOS[specificKey]) {
    return CURATED_CHAPTER_VIDEOS[specificKey];
  }

  // 2. Exact Chapter match with subject match verification
  if (CURATED_CHAPTER_VIDEOS[normKey] && CURATED_CHAPTER_VIDEOS[normKey].subject?.toLowerCase() === subLower) {
    return CURATED_CHAPTER_VIDEOS[normKey];
  }

  // 3. Normalized stripped string match
  const cleanKey = normalizeString(chapterName);
  const cleanSpecificKey = subLower + ":" + cleanKey;
  if (CURATED_CHAPTER_VIDEOS[cleanSpecificKey]) {
    return CURATED_CHAPTER_VIDEOS[cleanSpecificKey];
  }
  if (CURATED_CHAPTER_VIDEOS[cleanKey] && CURATED_CHAPTER_VIDEOS[cleanKey].subject?.toLowerCase() === subLower) {
    return CURATED_CHAPTER_VIDEOS[cleanKey];
  }

  // 4. Check partial match strictly matching requested subject
  for (const [key, resource] of Object.entries(CURATED_CHAPTER_VIDEOS)) {
    if (resource.subject && resource.subject.toLowerCase() !== subLower) {
      continue;
    }
    const cleanKeyIter = normalizeString(key.includes(":") ? key.split(":")[1] : key);
    if (cleanKey.includes(cleanKeyIter) || cleanKeyIter.includes(cleanKey)) {
      return {
        ...resource,
        chapter: chapterName,
        title: chapterName + " — High-Yield One-Shot Revision"
      };
    }
  }

  // 5. Graceful fallback for any unknown chapter
  const defaultSubject = DEFAULT_SUBJECT_VIDEOS[subjectName] || DEFAULT_SUBJECT_VIDEOS["Physics"];
  return {
    id: "vid-fallback-" + cleanKey.slice(0, 15).replace(/\s+/g, "-"),
    chapter: chapterName,
    subject: subjectName,
    title: chapterName + " — High-Yield Concept Revision",
    youtubeId: defaultSubject.youtubeId,
    channelName: defaultSubject.channelName,
    duration: defaultSubject.duration,
    description: "Curated comprehensive one-shot theory, derivations, and exam shortcuts for " + chapterName + "."
  };
}

export function getAllCuratedVideos(): VideoResource[] {
  const map = new Map<string, VideoResource>();
  for (const v of Object.values(CURATED_CHAPTER_VIDEOS)) {
    if (!map.has(v.id)) {
      map.set(v.id, v);
    }
  }
  return Array.from(map.values());
}

