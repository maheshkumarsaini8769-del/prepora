import { comprehensiveFormulaNotes } from './comprehensiveFormulaNotes';
import { COMPREHENSIVE_TOPIC_VIDEOS } from './topicVideosData';

export interface VideoResource {
  id: string;
  chapter: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Biology" | string;
  title: string;
  youtubeId: string;
  channelName: string;
  duration: string;
  description: string;
  classLevel?: '11' | '12' | 'All';
  targetExams?: ('JEE' | 'NEET' | 'CBSE' | 'All')[];
  topic?: string;
  isTopicWise?: boolean;
}

// Curated high-yield one-shot lectures from India's top educators for every single syllabus chapter
export const CURATED_CHAPTER_VIDEOS: Record<string, VideoResource> = {
  "chemistry:states of matter: gases and liquids": {
  "id": "vid-chem-states-of-matter",
  "chapter": "States of Matter: Gases and Liquids",
  "subject": "Chemistry",
  "title": "States of Matter (Gases and Liquids) — High-Yield Complete One-Shot",
  "youtubeId": "4FIU1tOCW_0",
  "channelName": "Pankaj Sir Chemistry",
  "duration": "2h 35m",
  "description": "Complete NCERT & JEE/NEET coverage of Gas Laws, Ideal Gas, Real Gas, van der Waals equation, Critical Constants, and Liquefaction."
},
  "states of matter: gases and liquids": {
  "id": "vid-chem-states-of-matter",
  "chapter": "States of Matter: Gases and Liquids",
  "subject": "Chemistry",
  "title": "States of Matter (Gases and Liquids) — High-Yield Complete One-Shot",
  "youtubeId": "4FIU1tOCW_0",
  "channelName": "Pankaj Sir Chemistry",
  "duration": "2h 35m",
  "description": "Complete NCERT & JEE/NEET coverage of Gas Laws, Ideal Gas, Real Gas, van der Waals equation, Critical Constants, and Liquefaction."
},
  "chemistry:s-block elements (alkali & alkaline earth metals)": {
  "id": "vid-chem-s-block",
  "chapter": "s-Block Elements (Alkali & Alkaline Earth Metals)",
  "subject": "Chemistry",
  "title": "s-Block Elements — High-Yield Complete One-Shot",
  "youtubeId": "G4c5v97ExSM",
  "channelName": "Physics Wallah - Alakh Pandey",
  "duration": "2h 10m",
  "description": "Complete revision of Group 1 and Group 2 elements, periodic trends, anomalous properties of Li & Be, and industrial compounds."
},
  "s-block elements (alkali & alkaline earth metals)": {
  "id": "vid-chem-s-block",
  "chapter": "s-Block Elements (Alkali & Alkaline Earth Metals)",
  "subject": "Chemistry",
  "title": "s-Block Elements — High-Yield Complete One-Shot",
  "youtubeId": "G4c5v97ExSM",
  "channelName": "Physics Wallah - Alakh Pandey",
  "duration": "2h 10m",
  "description": "Complete revision of Group 1 and Group 2 elements, periodic trends, anomalous properties of Li & Be, and industrial compounds."
},
  "chemistry:p-block elements (group 13 & 14)": {
  "id": "vid-chem-p-block-13-14",
  "chapter": "p-Block Elements (Group 13 & 14)",
  "subject": "Chemistry",
  "title": "p-Block Elements (Group 13 & 14) — Complete Concept One-Shot",
  "youtubeId": "b0k5LOk_uPk",
  "channelName": "Unacademy JEE",
  "duration": "2h 45m",
  "description": "Boron and Carbon families, Diborane structure, Borax bead test, Silicones, Silicates, and Allotropes of Carbon for JEE & NEET."
},
  "p-block elements (group 13 & 14)": {
  "id": "vid-chem-p-block-13-14",
  "chapter": "p-Block Elements (Group 13 & 14)",
  "subject": "Chemistry",
  "title": "p-Block Elements (Group 13 & 14) — Complete Concept One-Shot",
  "youtubeId": "b0k5LOk_uPk",
  "channelName": "Unacademy JEE",
  "duration": "2h 45m",
  "description": "Boron and Carbon families, Diborane structure, Borax bead test, Silicones, Silicates, and Allotropes of Carbon for JEE & NEET."
},
  "chemistry:hydrogen & its compounds": {
  "id": "vid-chem-hydrogen",
  "chapter": "Hydrogen & Its Compounds",
  "subject": "Chemistry",
  "title": "Hydrogen & Its Compounds — High-Yield NCERT One-Shot",
  "youtubeId": "FdmETHB1mjE",
  "channelName": "Physics Wallah - Alakh Pandey",
  "duration": "1h 45m",
  "description": "Hydrogen isotopes, hydrides, water hardness, heavy water, and hydrogen peroxide preparation and redox chemistry."
},
  "hydrogen & its compounds": {
  "id": "vid-chem-hydrogen",
  "chapter": "Hydrogen & Its Compounds",
  "subject": "Chemistry",
  "title": "Hydrogen & Its Compounds — High-Yield NCERT One-Shot",
  "youtubeId": "FdmETHB1mjE",
  "channelName": "Physics Wallah - Alakh Pandey",
  "duration": "1h 45m",
  "description": "Hydrogen isotopes, hydrides, water hardness, heavy water, and hydrogen peroxide preparation and redox chemistry."
},
  "chemistry:environmental chemistry": {
  "id": "vid-chem-environmental",
  "chapter": "Environmental Chemistry",
  "subject": "Chemistry",
  "title": "Environmental Chemistry — High-Yield Complete One-Shot",
  "youtubeId": "j_Dh6tBx4po",
  "channelName": "Vedantu JEE",
  "duration": "1h 15m",
  "description": "Atmospheric pollution, tropospheric smog, stratospheric ozone depletion, water pollutants (BOD/COD), and green chemistry."
},
  "environmental chemistry": {
  "id": "vid-chem-environmental",
  "chapter": "Environmental Chemistry",
  "subject": "Chemistry",
  "title": "Environmental Chemistry — High-Yield Complete One-Shot",
  "youtubeId": "j_Dh6tBx4po",
  "channelName": "Vedantu JEE",
  "duration": "1h 15m",
  "description": "Atmospheric pollution, tropospheric smog, stratospheric ozone depletion, water pollutants (BOD/COD), and green chemistry."
},
  "chemistry:principles related to practical chemistry": {
  "id": "vid-chem-practical",
  "chapter": "Principles Related to Practical Chemistry",
  "subject": "Chemistry",
  "title": "Practical Chemistry (Salt Analysis & Titrations) — One-Shot",
  "youtubeId": "8rRnn4ECwXI",
  "channelName": "Unacademy JEE",
  "duration": "2h 20m",
  "description": "Systematic qualitative cation and anion analysis, functional group detection, and volumetric acid-base and redox titrations."
},
  "principles related to practical chemistry": {
  "id": "vid-chem-practical",
  "chapter": "Principles Related to Practical Chemistry",
  "subject": "Chemistry",
  "title": "Practical Chemistry (Salt Analysis & Titrations) — One-Shot",
  "youtubeId": "8rRnn4ECwXI",
  "channelName": "Unacademy JEE",
  "duration": "2h 20m",
  "description": "Systematic qualitative cation and anion analysis, functional group detection, and volumetric acid-base and redox titrations."
},
  "chemistry:organic chemistry: some basic principles and techniques": {
  "id": "vid-chem-goc-full",
  "chapter": "Organic Chemistry: Some Basic Principles and Techniques",
  "subject": "Chemistry",
  "title": "General Organic Chemistry (GOC) & Basic Principles — One-Shot",
  "youtubeId": "FFCT-lh86tA",
  "channelName": "Pankaj Sir Chemistry",
  "duration": "3h 40m",
  "description": "Complete GOC: IUPAC nomenclature, isomerism, inductive effect, resonance, hyperconjugation, and reactive intermediates."
},
  "organic chemistry: some basic principles and techniques": {
  "id": "vid-chem-goc-full",
  "chapter": "Organic Chemistry: Some Basic Principles and Techniques",
  "subject": "Chemistry",
  "title": "General Organic Chemistry (GOC) & Basic Principles — One-Shot",
  "youtubeId": "FFCT-lh86tA",
  "channelName": "Pankaj Sir Chemistry",
  "duration": "3h 40m",
  "description": "Complete GOC: IUPAC nomenclature, isomerism, inductive effect, resonance, hyperconjugation, and reactive intermediates."
},
  "chemistry:solid state": {
  "id": "vid-chem-solid-state",
  "chapter": "Solid State",
  "subject": "Chemistry",
  "title": "Solid State — High-Yield Complete One-Shot",
  "youtubeId": "r3w9iwWRThM",
  "channelName": "Pankaj Sir Chemistry",
  "duration": "2h 50m",
  "description": "Unit cells, SC/BCC/FCC packing efficiency, density formula, limiting radius ratio, and Schottky/Frenkel defect analysis."
},
  "solid state": {
  "id": "vid-chem-solid-state",
  "chapter": "Solid State",
  "subject": "Chemistry",
  "title": "Solid State — High-Yield Complete One-Shot",
  "youtubeId": "r3w9iwWRThM",
  "channelName": "Pankaj Sir Chemistry",
  "duration": "2h 50m",
  "description": "Unit cells, SC/BCC/FCC packing efficiency, density formula, limiting radius ratio, and Schottky/Frenkel defect analysis."
},
  "chemistry:surface chemistry": {
  "id": "vid-chem-surface",
  "chapter": "Surface Chemistry",
  "subject": "Chemistry",
  "title": "Surface Chemistry — High-Yield Complete One-Shot",
  "youtubeId": "YEtOldjp4_I",
  "channelName": "Physics Wallah - Alakh Pandey",
  "duration": "2h 15m",
  "description": "Physisorption vs chemisorption, Freundlich adsorption isotherm, catalysis, lyophilic/lyophobic colloids, and Hardy-Schulze rule."
},
  "surface chemistry": {
  "id": "vid-chem-surface",
  "chapter": "Surface Chemistry",
  "subject": "Chemistry",
  "title": "Surface Chemistry — High-Yield Complete One-Shot",
  "youtubeId": "YEtOldjp4_I",
  "channelName": "Physics Wallah - Alakh Pandey",
  "duration": "2h 15m",
  "description": "Physisorption vs chemisorption, Freundlich adsorption isotherm, catalysis, lyophilic/lyophobic colloids, and Hardy-Schulze rule."
},
  "chemistry:general principles and processes of isolation of elements": {
  "id": "vid-chem-metallurgy",
  "chapter": "General Principles and Processes of Isolation of Elements",
  "subject": "Chemistry",
  "title": "Metallurgy (Isolation of Elements) — Complete One-Shot",
  "youtubeId": "7Z8YnssknYg",
  "channelName": "Unacademy JEE",
  "duration": "2h 30m",
  "description": "Ore concentration, roasting/calcination, Ellingham diagram thermodynamics, extraction of Fe, Al, Cu, Zn, and refining methods."
},
  "general principles and processes of isolation of elements": {
  "id": "vid-chem-metallurgy",
  "chapter": "General Principles and Processes of Isolation of Elements",
  "subject": "Chemistry",
  "title": "Metallurgy (Isolation of Elements) — Complete One-Shot",
  "youtubeId": "7Z8YnssknYg",
  "channelName": "Unacademy JEE",
  "duration": "2h 30m",
  "description": "Ore concentration, roasting/calcination, Ellingham diagram thermodynamics, extraction of Fe, Al, Cu, Zn, and refining methods."
},
  "chemistry:p-block elements (group 15, 16, 17 & 18)": {
  "id": "vid-chem-p-block-15-18",
  "chapter": "p-Block Elements (Group 15, 16, 17 & 18)",
  "subject": "Chemistry",
  "title": "p-Block Elements (Group 15 to 18) — High-Yield One-Shot",
  "youtubeId": "qzFtiCIf9Ck",
  "channelName": "Chemistry Guruji 2.0",
  "duration": "3h 15m",
  "description": "Haber & Ostwald processes, Contact process for H2SO4, Interhalogens, and Xenon fluorides structure and hydrolysis."
},
  "p-block elements (group 15, 16, 17 & 18)": {
  "id": "vid-chem-p-block-15-18",
  "chapter": "p-Block Elements (Group 15, 16, 17 & 18)",
  "subject": "Chemistry",
  "title": "p-Block Elements (Group 15 to 18) — High-Yield One-Shot",
  "youtubeId": "qzFtiCIf9Ck",
  "channelName": "Chemistry Guruji 2.0",
  "duration": "3h 15m",
  "description": "Haber & Ostwald processes, Contact process for H2SO4, Interhalogens, and Xenon fluorides structure and hydrolysis."
},
  "chemistry:polymers": {
  "id": "vid-chem-polymers",
  "chapter": "Polymers",
  "subject": "Chemistry",
  "title": "Polymers — High-Yield Complete NCERT One-Shot",
  "youtubeId": "iPOxMOCOIpY",
  "channelName": "Physics Wallah - Alakh Pandey",
  "duration": "1h 40m",
  "description": "Addition and condensation polymers, Nylon-6,6, Buna-S, Bakelite, Melamine, PHBV, and molecular mass averages."
},
  "polymers": {
  "id": "vid-chem-polymers",
  "chapter": "Polymers",
  "subject": "Chemistry",
  "title": "Polymers — High-Yield Complete NCERT One-Shot",
  "youtubeId": "iPOxMOCOIpY",
  "channelName": "Physics Wallah - Alakh Pandey",
  "duration": "1h 40m",
  "description": "Addition and condensation polymers, Nylon-6,6, Buna-S, Bakelite, Melamine, PHBV, and molecular mass averages."
},
  "chemistry:chemistry in everyday life": {
  "id": "vid-chem-everyday-life",
  "chapter": "Chemistry in Everyday Life",
  "subject": "Chemistry",
  "title": "Chemistry in Everyday Life — Complete NCERT One-Shot",
  "youtubeId": "DfB6JQ8weHc",
  "channelName": "Chemistry Guruji 2.0",
  "duration": "1h 30m",
  "description": "Drugs and medicine classifications, antiseptics vs disinfectants, artificial sweeteners, soaps and synthetic detergents."
},
  "chemistry in everyday life": {
  "id": "vid-chem-everyday-life",
  "chapter": "Chemistry in Everyday Life",
  "subject": "Chemistry",
  "title": "Chemistry in Everyday Life — Complete NCERT One-Shot",
  "youtubeId": "DfB6JQ8weHc",
  "channelName": "Chemistry Guruji 2.0",
  "duration": "1h 30m",
  "description": "Drugs and medicine classifications, antiseptics vs disinfectants, artificial sweeteners, soaps and synthetic detergents."
},

  "physics:units and measurements": {
    "id": "vid-physics-units-and-measurements",
    "chapter": "Units and Measurements",
    "subject": "Physics",
    "title": "Units and Measurements — High-Yield Complete One-Shot",
    "youtubeId": "tx76BJIqOd4",
    "channelName": "Prashant Kirad 11th & 12th",
    "duration": "1h 54m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Units and Measurements."
},
  "units and measurements": {
    "id": "vid-physics-units-and-measurements",
    "chapter": "Units and Measurements",
    "subject": "Physics",
    "title": "Units and Measurements — High-Yield Complete One-Shot",
    "youtubeId": "tx76BJIqOd4",
    "channelName": "Prashant Kirad 11th & 12th",
    "duration": "1h 54m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Units and Measurements."
},
  "physics:motion in a straight line": {
    "id": "vid-physics-motion-in-a-straight-line",
    "chapter": "Motion in a Straight Line",
    "subject": "Physics",
    "title": "Motion in a Straight Line — High-Yield Complete One-Shot",
    "youtubeId": "VDtydsLisCE",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 55m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Motion in a Straight Line."
},
  "motion in a straight line": {
    "id": "vid-physics-motion-in-a-straight-line",
    "chapter": "Motion in a Straight Line",
    "subject": "Physics",
    "title": "Motion in a Straight Line — High-Yield Complete One-Shot",
    "youtubeId": "VDtydsLisCE",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 55m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Motion in a Straight Line."
},
  "physics:motion in a plane": {
    "id": "vid-physics-motion-in-a-plane",
    "chapter": "Motion in a Plane",
    "subject": "Physics",
    "title": "Motion in a Plane — High-Yield Complete One-Shot",
    "youtubeId": "JYdznU0Zps0",
    "channelName": "Prashant Kirad 11th & 12th",
    "duration": "2h 38m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Motion in a Plane."
},
  "motion in a plane": {
    "id": "vid-physics-motion-in-a-plane",
    "chapter": "Motion in a Plane",
    "subject": "Physics",
    "title": "Motion in a Plane — High-Yield Complete One-Shot",
    "youtubeId": "JYdznU0Zps0",
    "channelName": "Prashant Kirad 11th & 12th",
    "duration": "2h 38m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Motion in a Plane."
},
  "physics:laws of motion": {
    "id": "vid-physics-laws-of-motion",
    "chapter": "Laws of Motion",
    "subject": "Physics",
    "title": "Laws of Motion — Full Chapter High-Yield One-Shot",
    "youtubeId": "PLQ0_vZF25o",
    "channelName": "Prashant Kirad 11th & 12th",
    "duration": "2h 54m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Laws of Motion (Physics). Taught by Prashant Kirad 11th & 12th."
},
  "laws of motion": {
    "id": "vid-physics-laws-of-motion",
    "chapter": "Laws of Motion",
    "subject": "Physics",
    "title": "Laws of Motion — Full Chapter High-Yield One-Shot",
    "youtubeId": "PLQ0_vZF25o",
    "channelName": "Prashant Kirad 11th & 12th",
    "duration": "2h 54m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Laws of Motion (Physics). Taught by Prashant Kirad 11th & 12th."
},
  "physics:work, energy and power": {
    "id": "vid-physics-work-energy-and-power",
    "chapter": "Work, Energy and Power",
    "subject": "Physics",
    "title": "Work, Energy and Power — High-Yield Complete One-Shot",
    "youtubeId": "eACeA8W0tCQ",
    "channelName": "Prashant Kirad 11th & 12th",
    "duration": "2h 46m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Work, Energy and Power."
},
  "work, energy and power": {
    "id": "vid-physics-work-energy-and-power",
    "chapter": "Work, Energy and Power",
    "subject": "Physics",
    "title": "Work, Energy and Power — High-Yield Complete One-Shot",
    "youtubeId": "eACeA8W0tCQ",
    "channelName": "Prashant Kirad 11th & 12th",
    "duration": "2h 46m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Work, Energy and Power."
},
  "physics:work energy and power": {
    "id": "vid-physics-work-energy-and-power",
    "chapter": "Work, Energy and Power",
    "subject": "Physics",
    "title": "Work, Energy and Power — High-Yield Complete One-Shot",
    "youtubeId": "eACeA8W0tCQ",
    "channelName": "Prashant Kirad 11th & 12th",
    "duration": "2h 46m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Work, Energy and Power."
},
  "work energy and power": {
    "id": "vid-physics-work-energy-and-power",
    "chapter": "Work, Energy and Power",
    "subject": "Physics",
    "title": "Work, Energy and Power — High-Yield Complete One-Shot",
    "youtubeId": "eACeA8W0tCQ",
    "channelName": "Prashant Kirad 11th & 12th",
    "duration": "2h 46m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for Work, Energy and Power."
},
  "physics:system of particles and rotational motion": {
    "id": "vid-physics-system-of-particles-and-rotational-motion",
    "chapter": "System of Particles and Rotational Motion",
    "subject": "Physics",
    "title": "System of Particles and Rotational Motion (Physics) High-Yield One-Shot",
    "youtubeId": "ZUQ1hfF7Ov4",
    "channelName": "Eduniti - Physics by Mohit Goenka",
    "duration": "2h 10m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for System of Particles and Rotational Motion."
},
  "system of particles and rotational motion": {
    "id": "vid-physics-system-of-particles-and-rotational-motion",
    "chapter": "System of Particles and Rotational Motion",
    "subject": "Physics",
    "title": "System of Particles and Rotational Motion (Physics) High-Yield One-Shot",
    "youtubeId": "ZUQ1hfF7Ov4",
    "channelName": "Eduniti - Physics by Mohit Goenka",
    "duration": "2h 10m",
    "description": "Comprehensive NCERT and entrance exam theory, derivations, and high-yield problem solving for System of Particles and Rotational Motion."
},
  "physics:gravitation": {
    "id": "vid-physics-gravitation",
    "chapter": "Gravitation",
    "subject": "Physics",
    "title": "Gravitation — Full Chapter High-Yield One-Shot",
    "youtubeId": "6ws_HXsmDy0",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 35m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Gravitation (Physics). Taught by Next Toppers - 11th Science."
},
  "gravitation": {
    "id": "vid-physics-gravitation",
    "chapter": "Gravitation",
    "subject": "Physics",
    "title": "Gravitation — Full Chapter High-Yield One-Shot",
    "youtubeId": "6ws_HXsmDy0",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 35m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Gravitation (Physics). Taught by Next Toppers - 11th Science."
},
  "physics:mechanical properties of solids": {
    "id": "vid-physics-mechanical-properties-of-solids",
    "chapter": "Mechanical Properties of Solids",
    "subject": "Physics",
    "title": "Mechanical Properties of Solids — Full Chapter High-Yield One-Shot",
    "youtubeId": "oqrkSuDK7D0",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 35m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Mechanical Properties of Solids (Physics). Taught by Next Toppers - 11th Science."
},
  "mechanical properties of solids": {
    "id": "vid-physics-mechanical-properties-of-solids",
    "chapter": "Mechanical Properties of Solids",
    "subject": "Physics",
    "title": "Mechanical Properties of Solids — Full Chapter High-Yield One-Shot",
    "youtubeId": "oqrkSuDK7D0",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 35m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Mechanical Properties of Solids (Physics). Taught by Next Toppers - 11th Science."
},
  "physics:mechanical properties of fluids": {
    "id": "vid-physics-mechanical-properties-of-fluids",
    "chapter": "Mechanical Properties of Fluids",
    "subject": "Physics",
    "title": "Mechanical Properties of Fluids — Full Chapter High-Yield One-Shot",
    "youtubeId": "NQXYgf8SfNI",
    "channelName": "Next Toppers - 11th Science",
    "duration": "3h 40m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Mechanical Properties of Fluids (Physics). Taught by Next Toppers - 11th Science."
},
  "mechanical properties of fluids": {
    "id": "vid-physics-mechanical-properties-of-fluids",
    "chapter": "Mechanical Properties of Fluids",
    "subject": "Physics",
    "title": "Mechanical Properties of Fluids — Full Chapter High-Yield One-Shot",
    "youtubeId": "NQXYgf8SfNI",
    "channelName": "Next Toppers - 11th Science",
    "duration": "3h 40m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Mechanical Properties of Fluids (Physics). Taught by Next Toppers - 11th Science."
},
  "physics:thermal properties of matter": {
    "id": "vid-physics-thermal-properties-of-matter",
    "chapter": "Thermal Properties of Matter",
    "subject": "Physics",
    "title": "Thermal Properties of Matter — Full Chapter High-Yield One-Shot",
    "youtubeId": "fMKSucudc5A",
    "channelName": "Competition Wallah",
    "duration": "5h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Thermal Properties of Matter (Physics). Taught by Competition Wallah."
},
  "thermal properties of matter": {
    "id": "vid-physics-thermal-properties-of-matter",
    "chapter": "Thermal Properties of Matter",
    "subject": "Physics",
    "title": "Thermal Properties of Matter — Full Chapter High-Yield One-Shot",
    "youtubeId": "fMKSucudc5A",
    "channelName": "Competition Wallah",
    "duration": "5h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Thermal Properties of Matter (Physics). Taught by Competition Wallah."
},
  "physics:thermodynamics": {
    "id": "vid-physics-thermodynamics",
    "chapter": "Thermodynamics",
    "subject": "Physics",
    "title": "Thermodynamics — Full Chapter High-Yield One-Shot",
    "youtubeId": "lAKcpCPFGK8",
    "channelName": "Competition Wallah",
    "duration": "48m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Thermodynamics (Physics). Taught by Competition Wallah."
},
  "thermodynamics": {
    "id": "vid-physics-thermodynamics",
    "chapter": "Thermodynamics",
    "subject": "Physics",
    "title": "Thermodynamics — Full Chapter High-Yield One-Shot",
    "youtubeId": "lAKcpCPFGK8",
    "channelName": "Competition Wallah",
    "duration": "48m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Thermodynamics (Physics). Taught by Competition Wallah."
},
  "physics:kinetic theory of gases": {
    "id": "vid-physics-kinetic-theory-of-gases",
    "chapter": "Kinetic Theory of Gases",
    "subject": "Physics",
    "title": "Kinetic Theory of Gases — Full Chapter High-Yield One-Shot",
    "youtubeId": "FJ8ST6ac6Mg",
    "channelName": "Competition Wallah",
    "duration": "3h 16m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Kinetic Theory of Gases (Physics). Taught by Competition Wallah."
},
  "kinetic theory of gases": {
    "id": "vid-physics-kinetic-theory-of-gases",
    "chapter": "Kinetic Theory of Gases",
    "subject": "Physics",
    "title": "Kinetic Theory of Gases — Full Chapter High-Yield One-Shot",
    "youtubeId": "FJ8ST6ac6Mg",
    "channelName": "Competition Wallah",
    "duration": "3h 16m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Kinetic Theory of Gases (Physics). Taught by Competition Wallah."
},
  "physics:oscillations": {
    "id": "vid-physics-oscillations",
    "chapter": "Oscillations",
    "subject": "Physics",
    "title": "Oscillations — Full Chapter High-Yield One-Shot",
    "youtubeId": "zZ6YR5swtz8",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 10m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Oscillations (Physics). Taught by Next Toppers - 11th Science."
},
  "oscillations": {
    "id": "vid-physics-oscillations",
    "chapter": "Oscillations",
    "subject": "Physics",
    "title": "Oscillations — Full Chapter High-Yield One-Shot",
    "youtubeId": "zZ6YR5swtz8",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 10m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Oscillations (Physics). Taught by Next Toppers - 11th Science."
},
  "physics:waves": {
    "id": "vid-physics-waves",
    "chapter": "Waves",
    "subject": "Physics",
    "title": "Waves — Full Chapter High-Yield One-Shot",
    "youtubeId": "bXKhAdDaOE0",
    "channelName": "Abhishek Sahu",
    "duration": "1h 49m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Waves (Physics). Taught by Abhishek Sahu."
},
  "waves": {
    "id": "vid-physics-waves",
    "chapter": "Waves",
    "subject": "Physics",
    "title": "Waves — Full Chapter High-Yield One-Shot",
    "youtubeId": "bXKhAdDaOE0",
    "channelName": "Abhishek Sahu",
    "duration": "1h 49m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Waves (Physics). Taught by Abhishek Sahu."
},
  "physics:electric charges and fields": {
    "id": "vid-physics-electric-charges-and-fields",
    "chapter": "Electric Charges and Fields",
    "subject": "Physics",
    "title": "Electric Charges and Fields — Full Chapter High-Yield One-Shot",
    "youtubeId": "PKE3NhcOays",
    "channelName": "Next Toppers - 12th Science",
    "duration": "4h 9m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electric Charges and Fields (Physics). Taught by Next Toppers - 12th Science."
},
  "electric charges and fields": {
    "id": "vid-physics-electric-charges-and-fields",
    "chapter": "Electric Charges and Fields",
    "subject": "Physics",
    "title": "Electric Charges and Fields — Full Chapter High-Yield One-Shot",
    "youtubeId": "PKE3NhcOays",
    "channelName": "Next Toppers - 12th Science",
    "duration": "4h 9m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electric Charges and Fields (Physics). Taught by Next Toppers - 12th Science."
},
  "physics:electrostatic potential and capacitance": {
    "id": "vid-physics-electrostatic-potential-and-capacitance",
    "chapter": "Electrostatic Potential and Capacitance",
    "subject": "Physics",
    "title": "Electrostatic Potential and Capacitance — Full Chapter High-Yield One-Shot",
    "youtubeId": "nNhivhwHSRo",
    "channelName": "NCERT Wallah",
    "duration": "2h 37m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electrostatic Potential and Capacitance (Physics). Taught by NCERT Wallah."
},
  "electrostatic potential and capacitance": {
    "id": "vid-physics-electrostatic-potential-and-capacitance",
    "chapter": "Electrostatic Potential and Capacitance",
    "subject": "Physics",
    "title": "Electrostatic Potential and Capacitance — Full Chapter High-Yield One-Shot",
    "youtubeId": "nNhivhwHSRo",
    "channelName": "NCERT Wallah",
    "duration": "2h 37m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electrostatic Potential and Capacitance (Physics). Taught by NCERT Wallah."
},
  "physics:current electricity": {
    "id": "vid-physics-current-electricity",
    "chapter": "Current Electricity",
    "subject": "Physics",
    "title": "Current Electricity — Full Chapter High-Yield One-Shot",
    "youtubeId": "vUCDSDWyX4c",
    "channelName": "NCERT Wallah",
    "duration": "4h 2m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Current Electricity (Physics). Taught by NCERT Wallah."
},
  "current electricity": {
    "id": "vid-physics-current-electricity",
    "chapter": "Current Electricity",
    "subject": "Physics",
    "title": "Current Electricity — Full Chapter High-Yield One-Shot",
    "youtubeId": "vUCDSDWyX4c",
    "channelName": "NCERT Wallah",
    "duration": "4h 2m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Current Electricity (Physics). Taught by NCERT Wallah."
},
  "physics:moving charges and magnetism": {
    "id": "vid-physics-moving-charges-and-magnetism",
    "chapter": "Moving Charges and Magnetism",
    "subject": "Physics",
    "title": "Moving Charges and Magnetism — Full Chapter High-Yield One-Shot",
    "youtubeId": "lYqCUYI9D7Y",
    "channelName": "NCERT Wallah",
    "duration": "3h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Moving Charges and Magnetism (Physics). Taught by NCERT Wallah."
},
  "moving charges and magnetism": {
    "id": "vid-physics-moving-charges-and-magnetism",
    "chapter": "Moving Charges and Magnetism",
    "subject": "Physics",
    "title": "Moving Charges and Magnetism — Full Chapter High-Yield One-Shot",
    "youtubeId": "lYqCUYI9D7Y",
    "channelName": "NCERT Wallah",
    "duration": "3h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Moving Charges and Magnetism (Physics). Taught by NCERT Wallah."
},
  "physics:magnetism and matter": {
    "id": "vid-physics-magnetism-and-matter",
    "chapter": "Magnetism and Matter",
    "subject": "Physics",
    "title": "Magnetism and Matter — Full Chapter High-Yield One-Shot",
    "youtubeId": "lWbUXCr3FOk",
    "channelName": "NCERT Wallah",
    "duration": "2h 41m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Magnetism and Matter (Physics). Taught by NCERT Wallah."
},
  "magnetism and matter": {
    "id": "vid-physics-magnetism-and-matter",
    "chapter": "Magnetism and Matter",
    "subject": "Physics",
    "title": "Magnetism and Matter — Full Chapter High-Yield One-Shot",
    "youtubeId": "lWbUXCr3FOk",
    "channelName": "NCERT Wallah",
    "duration": "2h 41m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Magnetism and Matter (Physics). Taught by NCERT Wallah."
},
  "physics:electromagnetic induction": {
    "id": "vid-physics-electromagnetic-induction",
    "chapter": "Electromagnetic Induction",
    "subject": "Physics",
    "title": "Electromagnetic Induction — Full Chapter High-Yield One-Shot",
    "youtubeId": "GaLQhuyaUNg",
    "channelName": "NCERT Wallah",
    "duration": "3h 8m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electromagnetic Induction (Physics). Taught by NCERT Wallah."
},
  "electromagnetic induction": {
    "id": "vid-physics-electromagnetic-induction",
    "chapter": "Electromagnetic Induction",
    "subject": "Physics",
    "title": "Electromagnetic Induction — Full Chapter High-Yield One-Shot",
    "youtubeId": "GaLQhuyaUNg",
    "channelName": "NCERT Wallah",
    "duration": "3h 8m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electromagnetic Induction (Physics). Taught by NCERT Wallah."
},
  "physics:alternating current": {
    "id": "vid-physics-alternating-current",
    "chapter": "Alternating Current",
    "subject": "Physics",
    "title": "Alternating Current — Full Chapter High-Yield One-Shot",
    "youtubeId": "j5wR8pfqyh4",
    "channelName": "NCERT Wallah",
    "duration": "2h 26m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Alternating Current (Physics). Taught by NCERT Wallah."
},
  "alternating current": {
    "id": "vid-physics-alternating-current",
    "chapter": "Alternating Current",
    "subject": "Physics",
    "title": "Alternating Current — Full Chapter High-Yield One-Shot",
    "youtubeId": "j5wR8pfqyh4",
    "channelName": "NCERT Wallah",
    "duration": "2h 26m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Alternating Current (Physics). Taught by NCERT Wallah."
},
  "physics:electromagnetic waves": {
    "id": "vid-physics-electromagnetic-waves",
    "chapter": "Electromagnetic Waves",
    "subject": "Physics",
    "title": "Electromagnetic Waves — Full Chapter High-Yield One-Shot",
    "youtubeId": "NsO6M28xPTs",
    "channelName": "NCERT Wallah",
    "duration": "1h 37m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electromagnetic Waves (Physics). Taught by NCERT Wallah."
},
  "electromagnetic waves": {
    "id": "vid-physics-electromagnetic-waves",
    "chapter": "Electromagnetic Waves",
    "subject": "Physics",
    "title": "Electromagnetic Waves — Full Chapter High-Yield One-Shot",
    "youtubeId": "NsO6M28xPTs",
    "channelName": "NCERT Wallah",
    "duration": "1h 37m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electromagnetic Waves (Physics). Taught by NCERT Wallah."
},
  "physics:ray optics and optical instruments": {
    "id": "vid-physics-ray-optics-and-optical-instruments",
    "chapter": "Ray Optics and Optical Instruments",
    "subject": "Physics",
    "title": "Ray Optics and Optical Instruments — Full Chapter High-Yield One-Shot",
    "youtubeId": "V3JXWwBXv-4",
    "channelName": "NCERT Wallah",
    "duration": "4h 50m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Ray Optics and Optical Instruments (Physics). Taught by NCERT Wallah."
},
  "ray optics and optical instruments": {
    "id": "vid-physics-ray-optics-and-optical-instruments",
    "chapter": "Ray Optics and Optical Instruments",
    "subject": "Physics",
    "title": "Ray Optics and Optical Instruments — Full Chapter High-Yield One-Shot",
    "youtubeId": "V3JXWwBXv-4",
    "channelName": "NCERT Wallah",
    "duration": "4h 50m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Ray Optics and Optical Instruments (Physics). Taught by NCERT Wallah."
},
  "physics:wave optics": {
    "id": "vid-physics-wave-optics",
    "chapter": "Wave Optics",
    "subject": "Physics",
    "title": "Wave Optics — Full Chapter High-Yield One-Shot",
    "youtubeId": "6M_Y2FesSfA",
    "channelName": "NCERT Wallah",
    "duration": "2h 40m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Wave Optics (Physics). Taught by NCERT Wallah."
},
  "wave optics": {
    "id": "vid-physics-wave-optics",
    "chapter": "Wave Optics",
    "subject": "Physics",
    "title": "Wave Optics — Full Chapter High-Yield One-Shot",
    "youtubeId": "6M_Y2FesSfA",
    "channelName": "NCERT Wallah",
    "duration": "2h 40m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Wave Optics (Physics). Taught by NCERT Wallah."
},
  "physics:dual nature of radiation and matter": {
    "id": "vid-physics-dual-nature-of-radiation-and-matter",
    "chapter": "Dual Nature of Radiation and Matter",
    "subject": "Physics",
    "title": "Dual Nature of Radiation and Matter — Full Chapter High-Yield One-Shot",
    "youtubeId": "0SQewJX84l0",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 6m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Dual Nature of Radiation and Matter (Physics). Taught by Next Toppers - 12th Science."
},
  "dual nature of radiation and matter": {
    "id": "vid-physics-dual-nature-of-radiation-and-matter",
    "chapter": "Dual Nature of Radiation and Matter",
    "subject": "Physics",
    "title": "Dual Nature of Radiation and Matter — Full Chapter High-Yield One-Shot",
    "youtubeId": "0SQewJX84l0",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 6m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Dual Nature of Radiation and Matter (Physics). Taught by Next Toppers - 12th Science."
},
  "physics:atoms": {
    "id": "vid-physics-atoms",
    "chapter": "Atoms",
    "subject": "Physics",
    "title": "Atoms — Full Chapter High-Yield One-Shot",
    "youtubeId": "JUD2vEaFeYA",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 27m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Atoms (Physics). Taught by Next Toppers - 12th Science."
},
  "atoms": {
    "id": "vid-physics-atoms",
    "chapter": "Atoms",
    "subject": "Physics",
    "title": "Atoms — Full Chapter High-Yield One-Shot",
    "youtubeId": "JUD2vEaFeYA",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 27m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Atoms (Physics). Taught by Next Toppers - 12th Science."
},
  "physics:nuclei": {
    "id": "vid-physics-nuclei",
    "chapter": "Nuclei",
    "subject": "Physics",
    "title": "Nuclei — Full Chapter High-Yield One-Shot",
    "youtubeId": "7vzNElJDCmA",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 2m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Nuclei (Physics). Taught by Next Toppers - 12th Science."
},
  "nuclei": {
    "id": "vid-physics-nuclei",
    "chapter": "Nuclei",
    "subject": "Physics",
    "title": "Nuclei — Full Chapter High-Yield One-Shot",
    "youtubeId": "7vzNElJDCmA",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 2m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Nuclei (Physics). Taught by Next Toppers - 12th Science."
},
  "physics:semiconductor electronics": {
    "id": "vid-physics-semiconductor-electronics",
    "chapter": "Semiconductor Electronics",
    "subject": "Physics",
    "title": "Semiconductor Electronics — Full Chapter High-Yield One-Shot",
    "youtubeId": "nCAXL800EZw",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 5m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Semiconductor Electronics (Physics). Taught by Next Toppers - 12th Science."
},
  "semiconductor electronics": {
    "id": "vid-physics-semiconductor-electronics",
    "chapter": "Semiconductor Electronics",
    "subject": "Physics",
    "title": "Semiconductor Electronics — Full Chapter High-Yield One-Shot",
    "youtubeId": "nCAXL800EZw",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 5m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Semiconductor Electronics (Physics). Taught by Next Toppers - 12th Science."
},
  "chemistry:some basic concepts of chemistry": {
    "id": "vid-chemistry-some-basic-concepts-of-chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "subject": "Chemistry",
    "title": "Some Basic Concepts of Chemistry — Full Chapter High-Yield One-Shot",
    "youtubeId": "1t9Dq4wyhBw",
    "channelName": "Next Toppers - 11th Science",
    "duration": "3h 3m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Some Basic Concepts of Chemistry (Chemistry). Taught by Next Toppers - 11th Science."
},
  "some basic concepts of chemistry": {
    "id": "vid-chemistry-some-basic-concepts-of-chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "subject": "Chemistry",
    "title": "Some Basic Concepts of Chemistry — Full Chapter High-Yield One-Shot",
    "youtubeId": "1t9Dq4wyhBw",
    "channelName": "Next Toppers - 11th Science",
    "duration": "3h 3m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Some Basic Concepts of Chemistry (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemistry:structure of atom": {
    "id": "vid-chemistry-structure-of-atom",
    "chapter": "Structure of Atom",
    "subject": "Chemistry",
    "title": "Structure of Atom — Full Chapter High-Yield One-Shot",
    "youtubeId": "S7uLXHDTamo",
    "channelName": "Next Toppers - 11th Science",
    "duration": "3h 39m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Structure of Atom (Chemistry). Taught by Next Toppers - 11th Science."
},
  "structure of atom": {
    "id": "vid-chemistry-structure-of-atom",
    "chapter": "Structure of Atom",
    "subject": "Chemistry",
    "title": "Structure of Atom — Full Chapter High-Yield One-Shot",
    "youtubeId": "S7uLXHDTamo",
    "channelName": "Next Toppers - 11th Science",
    "duration": "3h 39m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Structure of Atom (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemistry:classification of elements and periodicity": {
    "id": "vid-chemistry-classification-of-elements-and-periodicity",
    "chapter": "Classification of Elements and Periodicity",
    "subject": "Chemistry",
    "title": "Classification of Elements and Periodicity — Full Chapter High-Yield One-Shot",
    "youtubeId": "I55bzdbtY2k",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 17m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Classification of Elements and Periodicity (Chemistry). Taught by Next Toppers - 11th Science."
},
  "classification of elements and periodicity": {
    "id": "vid-chemistry-classification-of-elements-and-periodicity",
    "chapter": "Classification of Elements and Periodicity",
    "subject": "Chemistry",
    "title": "Classification of Elements and Periodicity — Full Chapter High-Yield One-Shot",
    "youtubeId": "I55bzdbtY2k",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 17m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Classification of Elements and Periodicity (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemistry:chemical bonding and molecular structure": {
    "id": "vid-chemistry-chemical-bonding-and-molecular-structure",
    "chapter": "Chemical Bonding and Molecular Structure",
    "subject": "Chemistry",
    "title": "Chemical Bonding and Molecular Structure — Full Chapter High-Yield One-Shot",
    "youtubeId": "qle-q0CxtJk",
    "channelName": "Next Toppers - 11th Science",
    "duration": "3h 6m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Bonding and Molecular Structure (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemical bonding and molecular structure": {
    "id": "vid-chemistry-chemical-bonding-and-molecular-structure",
    "chapter": "Chemical Bonding and Molecular Structure",
    "subject": "Chemistry",
    "title": "Chemical Bonding and Molecular Structure — Full Chapter High-Yield One-Shot",
    "youtubeId": "qle-q0CxtJk",
    "channelName": "Next Toppers - 11th Science",
    "duration": "3h 6m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Bonding and Molecular Structure (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemistry:chemical thermodynamics": {
    "id": "vid-chemistry-chemical-thermodynamics",
    "chapter": "Chemical Thermodynamics",
    "subject": "Chemistry",
    "title": "Chemical Thermodynamics — Full Chapter High-Yield One-Shot",
    "youtubeId": "NzB2YwNndZw",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 52m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Thermodynamics (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemical thermodynamics": {
    "id": "vid-chemistry-chemical-thermodynamics",
    "chapter": "Chemical Thermodynamics",
    "subject": "Chemistry",
    "title": "Chemical Thermodynamics — Full Chapter High-Yield One-Shot",
    "youtubeId": "NzB2YwNndZw",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 52m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Thermodynamics (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemistry:equilibrium": {
    "id": "vid-chemistry-equilibrium",
    "chapter": "Equilibrium",
    "subject": "Chemistry",
    "title": "Equilibrium — Full Chapter High-Yield One-Shot",
    "youtubeId": "ZGbDYoVozYc",
    "channelName": "JEE Wallah",
    "duration": "1h 32m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Equilibrium (Chemistry). Taught by JEE Wallah."
},
  "equilibrium": {
    "id": "vid-chemistry-equilibrium",
    "chapter": "Equilibrium",
    "subject": "Chemistry",
    "title": "Equilibrium — Full Chapter High-Yield One-Shot",
    "youtubeId": "ZGbDYoVozYc",
    "channelName": "JEE Wallah",
    "duration": "1h 32m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Equilibrium (Chemistry). Taught by JEE Wallah."
},
  "chemistry:redox reactions": {
    "id": "vid-chemistry-redox-reactions",
    "chapter": "Redox Reactions",
    "subject": "Chemistry",
    "title": "Redox Reactions — Full Chapter High-Yield One-Shot",
    "youtubeId": "X86UraGJtNk",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 21m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Redox Reactions (Chemistry). Taught by Next Toppers - 11th Science."
},
  "redox reactions": {
    "id": "vid-chemistry-redox-reactions",
    "chapter": "Redox Reactions",
    "subject": "Chemistry",
    "title": "Redox Reactions — Full Chapter High-Yield One-Shot",
    "youtubeId": "X86UraGJtNk",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 21m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Redox Reactions (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemistry:organic chemistry: basic principles and techniques": {
    "id": "vid-chemistry-organic-chemistry-basic-principles-and-techniques",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "subject": "Chemistry",
    "title": "Organic Chemistry: Basic Principles and Techniques — Full Chapter High-Yield One-Shot",
    "youtubeId": "soIba7r34ZM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Organic Chemistry: Basic Principles and Techniques (Chemistry). Taught by Next Toppers - 11th Science."
},
  "organic chemistry: basic principles and techniques": {
    "id": "vid-chemistry-organic-chemistry-basic-principles-and-techniques",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "subject": "Chemistry",
    "title": "Organic Chemistry: Basic Principles and Techniques — Full Chapter High-Yield One-Shot",
    "youtubeId": "soIba7r34ZM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Organic Chemistry: Basic Principles and Techniques (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemistry:organic chemistry basic principles and techniques": {
    "id": "vid-chemistry-organic-chemistry-basic-principles-and-techniques",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "subject": "Chemistry",
    "title": "Organic Chemistry: Basic Principles and Techniques — Full Chapter High-Yield One-Shot",
    "youtubeId": "soIba7r34ZM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Organic Chemistry: Basic Principles and Techniques (Chemistry). Taught by Next Toppers - 11th Science."
},
  "organic chemistry basic principles and techniques": {
    "id": "vid-chemistry-organic-chemistry-basic-principles-and-techniques",
    "chapter": "Organic Chemistry: Basic Principles and Techniques",
    "subject": "Chemistry",
    "title": "Organic Chemistry: Basic Principles and Techniques — Full Chapter High-Yield One-Shot",
    "youtubeId": "soIba7r34ZM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Organic Chemistry: Basic Principles and Techniques (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemistry:hydrocarbons": {
    "id": "vid-chemistry-hydrocarbons",
    "chapter": "Hydrocarbons",
    "subject": "Chemistry",
    "title": "Hydrocarbons — Full Chapter High-Yield One-Shot",
    "youtubeId": "sEchzMnCpH0",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Hydrocarbons (Chemistry). Taught by Next Toppers - 11th Science."
},
  "hydrocarbons": {
    "id": "vid-chemistry-hydrocarbons",
    "chapter": "Hydrocarbons",
    "subject": "Chemistry",
    "title": "Hydrocarbons — Full Chapter High-Yield One-Shot",
    "youtubeId": "sEchzMnCpH0",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Hydrocarbons (Chemistry). Taught by Next Toppers - 11th Science."
},
  "chemistry:solutions": {
    "id": "vid-chemistry-solutions",
    "chapter": "Solutions",
    "subject": "Chemistry",
    "title": "Solutions — Full Chapter High-Yield One-Shot",
    "youtubeId": "rAchBEU49SQ",
    "channelName": "NCERT Wallah",
    "duration": "2h 58m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Solutions (Chemistry). Taught by NCERT Wallah."
},
  "solutions": {
    "id": "vid-chemistry-solutions",
    "chapter": "Solutions",
    "subject": "Chemistry",
    "title": "Solutions — Full Chapter High-Yield One-Shot",
    "youtubeId": "rAchBEU49SQ",
    "channelName": "NCERT Wallah",
    "duration": "2h 58m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Solutions (Chemistry). Taught by NCERT Wallah."
},
  "chemistry:electrochemistry": {
    "id": "vid-chemistry-electrochemistry",
    "chapter": "Electrochemistry",
    "subject": "Chemistry",
    "title": "Electrochemistry — Full Chapter High-Yield One-Shot",
    "youtubeId": "5A5dbVrEjgU",
    "channelName": "NCERT Wallah",
    "duration": "2h 56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electrochemistry (Chemistry). Taught by NCERT Wallah."
},
  "electrochemistry": {
    "id": "vid-chemistry-electrochemistry",
    "chapter": "Electrochemistry",
    "subject": "Chemistry",
    "title": "Electrochemistry — Full Chapter High-Yield One-Shot",
    "youtubeId": "5A5dbVrEjgU",
    "channelName": "NCERT Wallah",
    "duration": "2h 56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electrochemistry (Chemistry). Taught by NCERT Wallah."
},
  "chemistry:chemical kinetics": {
    "id": "vid-chemistry-chemical-kinetics",
    "chapter": "Chemical Kinetics",
    "subject": "Chemistry",
    "title": "Chemical Kinetics — Full Chapter High-Yield One-Shot",
    "youtubeId": "Sag2IkxobkA",
    "channelName": "Next Toppers - 12th Science",
    "duration": "43m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Kinetics (Chemistry). Taught by Next Toppers - 12th Science."
},
  "chemical kinetics": {
    "id": "vid-chemistry-chemical-kinetics",
    "chapter": "Chemical Kinetics",
    "subject": "Chemistry",
    "title": "Chemical Kinetics — Full Chapter High-Yield One-Shot",
    "youtubeId": "Sag2IkxobkA",
    "channelName": "Next Toppers - 12th Science",
    "duration": "43m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Kinetics (Chemistry). Taught by Next Toppers - 12th Science."
},
  "chemistry:the d- and f-block elements": {
    "id": "vid-chemistry-the-d-and-f-block-elements",
    "chapter": "The d- and f-Block Elements",
    "subject": "Chemistry",
    "title": "The d- and f-Block Elements — Full Chapter High-Yield One-Shot",
    "youtubeId": "KG5t1LDP63U",
    "channelName": "Next Toppers - 12th Science",
    "duration": "1h 41m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for The d- and f-Block Elements (Chemistry). Taught by Next Toppers - 12th Science."
},
  "the d- and f-block elements": {
    "id": "vid-chemistry-the-d-and-f-block-elements",
    "chapter": "The d- and f-Block Elements",
    "subject": "Chemistry",
    "title": "The d- and f-Block Elements — Full Chapter High-Yield One-Shot",
    "youtubeId": "KG5t1LDP63U",
    "channelName": "Next Toppers - 12th Science",
    "duration": "1h 41m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for The d- and f-Block Elements (Chemistry). Taught by Next Toppers - 12th Science."
},
  "chemistry:the d and f block elements": {
    "id": "vid-chemistry-the-d-and-f-block-elements",
    "chapter": "The d- and f-Block Elements",
    "subject": "Chemistry",
    "title": "The d- and f-Block Elements — Full Chapter High-Yield One-Shot",
    "youtubeId": "KG5t1LDP63U",
    "channelName": "Next Toppers - 12th Science",
    "duration": "1h 41m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for The d- and f-Block Elements (Chemistry). Taught by Next Toppers - 12th Science."
},
  "the d and f block elements": {
    "id": "vid-chemistry-the-d-and-f-block-elements",
    "chapter": "The d- and f-Block Elements",
    "subject": "Chemistry",
    "title": "The d- and f-Block Elements — Full Chapter High-Yield One-Shot",
    "youtubeId": "KG5t1LDP63U",
    "channelName": "Next Toppers - 12th Science",
    "duration": "1h 41m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for The d- and f-Block Elements (Chemistry). Taught by Next Toppers - 12th Science."
},
  "chemistry:coordination compounds": {
    "id": "vid-chemistry-coordination-compounds",
    "chapter": "Coordination Compounds",
    "subject": "Chemistry",
    "title": "Coordination Compounds — Full Chapter High-Yield One-Shot",
    "youtubeId": "HjW525Oqb_g",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 13m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Coordination Compounds (Chemistry). Taught by Next Toppers - 12th Science."
},
  "coordination compounds": {
    "id": "vid-chemistry-coordination-compounds",
    "chapter": "Coordination Compounds",
    "subject": "Chemistry",
    "title": "Coordination Compounds — Full Chapter High-Yield One-Shot",
    "youtubeId": "HjW525Oqb_g",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 13m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Coordination Compounds (Chemistry). Taught by Next Toppers - 12th Science."
},
  "chemistry:haloalkanes and haloarenes": {
    "id": "vid-chemistry-haloalkanes-and-haloarenes",
    "chapter": "Haloalkanes and Haloarenes",
    "subject": "Chemistry",
    "title": "Haloalkanes and Haloarenes — Full Chapter High-Yield One-Shot",
    "youtubeId": "CyC5v-5a1-4",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Haloalkanes and Haloarenes (Chemistry). Taught by Next Toppers - 12th Science."
},
  "haloalkanes and haloarenes": {
    "id": "vid-chemistry-haloalkanes-and-haloarenes",
    "chapter": "Haloalkanes and Haloarenes",
    "subject": "Chemistry",
    "title": "Haloalkanes and Haloarenes — Full Chapter High-Yield One-Shot",
    "youtubeId": "CyC5v-5a1-4",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Haloalkanes and Haloarenes (Chemistry). Taught by Next Toppers - 12th Science."
},
  "chemistry:alcohols, phenols and ethers": {
    "id": "vid-chemistry-alcohols-phenols-and-ethers",
    "chapter": "Alcohols, Phenols and Ethers",
    "subject": "Chemistry",
    "title": "Alcohols, Phenols and Ethers — Full Chapter High-Yield One-Shot",
    "youtubeId": "-p5x_QJyJ8Y",
    "channelName": "Magnet Brains",
    "duration": "2h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Alcohols, Phenols and Ethers (Chemistry). Taught by Magnet Brains."
},
  "alcohols, phenols and ethers": {
    "id": "vid-chemistry-alcohols-phenols-and-ethers",
    "chapter": "Alcohols, Phenols and Ethers",
    "subject": "Chemistry",
    "title": "Alcohols, Phenols and Ethers — Full Chapter High-Yield One-Shot",
    "youtubeId": "-p5x_QJyJ8Y",
    "channelName": "Magnet Brains",
    "duration": "2h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Alcohols, Phenols and Ethers (Chemistry). Taught by Magnet Brains."
},
  "chemistry:alcohols phenols and ethers": {
    "id": "vid-chemistry-alcohols-phenols-and-ethers",
    "chapter": "Alcohols, Phenols and Ethers",
    "subject": "Chemistry",
    "title": "Alcohols, Phenols and Ethers — Full Chapter High-Yield One-Shot",
    "youtubeId": "-p5x_QJyJ8Y",
    "channelName": "Magnet Brains",
    "duration": "2h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Alcohols, Phenols and Ethers (Chemistry). Taught by Magnet Brains."
},
  "alcohols phenols and ethers": {
    "id": "vid-chemistry-alcohols-phenols-and-ethers",
    "chapter": "Alcohols, Phenols and Ethers",
    "subject": "Chemistry",
    "title": "Alcohols, Phenols and Ethers — Full Chapter High-Yield One-Shot",
    "youtubeId": "-p5x_QJyJ8Y",
    "channelName": "Magnet Brains",
    "duration": "2h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Alcohols, Phenols and Ethers (Chemistry). Taught by Magnet Brains."
},
  "chemistry:aldehydes, ketones and carboxylic acids": {
    "id": "vid-chemistry-aldehydes-ketones-and-carboxylic-acids",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "subject": "Chemistry",
    "title": "Aldehydes, Ketones and Carboxylic Acids — Full Chapter High-Yield One-Shot",
    "youtubeId": "tfM6-iEd6Ac",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 39m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Aldehydes, Ketones and Carboxylic Acids (Chemistry). Taught by Next Toppers - 12th Science."
},
  "aldehydes, ketones and carboxylic acids": {
    "id": "vid-chemistry-aldehydes-ketones-and-carboxylic-acids",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "subject": "Chemistry",
    "title": "Aldehydes, Ketones and Carboxylic Acids — Full Chapter High-Yield One-Shot",
    "youtubeId": "tfM6-iEd6Ac",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 39m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Aldehydes, Ketones and Carboxylic Acids (Chemistry). Taught by Next Toppers - 12th Science."
},
  "chemistry:aldehydes ketones and carboxylic acids": {
    "id": "vid-chemistry-aldehydes-ketones-and-carboxylic-acids",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "subject": "Chemistry",
    "title": "Aldehydes, Ketones and Carboxylic Acids — Full Chapter High-Yield One-Shot",
    "youtubeId": "tfM6-iEd6Ac",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 39m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Aldehydes, Ketones and Carboxylic Acids (Chemistry). Taught by Next Toppers - 12th Science."
},
  "aldehydes ketones and carboxylic acids": {
    "id": "vid-chemistry-aldehydes-ketones-and-carboxylic-acids",
    "chapter": "Aldehydes, Ketones and Carboxylic Acids",
    "subject": "Chemistry",
    "title": "Aldehydes, Ketones and Carboxylic Acids — Full Chapter High-Yield One-Shot",
    "youtubeId": "tfM6-iEd6Ac",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 39m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Aldehydes, Ketones and Carboxylic Acids (Chemistry). Taught by Next Toppers - 12th Science."
},
  "chemistry:amines": {
    "id": "vid-chemistry-amines",
    "chapter": "Amines",
    "subject": "Chemistry",
    "title": "Amines — Full Chapter High-Yield One-Shot",
    "youtubeId": "wc0_IIyLqTc",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 14m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Amines (Chemistry). Taught by Next Toppers - 12th Science."
},
  "amines": {
    "id": "vid-chemistry-amines",
    "chapter": "Amines",
    "subject": "Chemistry",
    "title": "Amines — Full Chapter High-Yield One-Shot",
    "youtubeId": "wc0_IIyLqTc",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 14m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Amines (Chemistry). Taught by Next Toppers - 12th Science."
},
  "chemistry:biomolecules": {
    "id": "vid-chemistry-biomolecules",
    "chapter": "Biomolecules",
    "subject": "Chemistry",
    "title": "Biomolecules — Full Chapter High-Yield One-Shot",
    "youtubeId": "neCiz1bHXGQ",
    "channelName": "NCERT Wallah",
    "duration": "3h 21m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biomolecules (Chemistry). Taught by NCERT Wallah."
},
  "biomolecules": {
    "id": "vid-chemistry-biomolecules",
    "chapter": "Biomolecules",
    "subject": "Chemistry",
    "title": "Biomolecules — Full Chapter High-Yield One-Shot",
    "youtubeId": "neCiz1bHXGQ",
    "channelName": "NCERT Wallah",
    "duration": "3h 21m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biomolecules (Chemistry). Taught by NCERT Wallah."
},
  "mathematics:sets": {
    "id": "vid-mathematics-sets",
    "chapter": "Sets",
    "subject": "Mathematics",
    "title": "Sets — Full Chapter High-Yield One-Shot",
    "youtubeId": "i3yC9PgUeKk",
    "channelName": "PW Commerce Wallah Class 11",
    "duration": "3h 47m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Sets (Mathematics). Taught by PW Commerce Wallah Class 11."
},
  "sets": {
    "id": "vid-mathematics-sets",
    "chapter": "Sets",
    "subject": "Mathematics",
    "title": "Sets — Full Chapter High-Yield One-Shot",
    "youtubeId": "i3yC9PgUeKk",
    "channelName": "PW Commerce Wallah Class 11",
    "duration": "3h 47m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Sets (Mathematics). Taught by PW Commerce Wallah Class 11."
},
  "mathematics:relations and functions": {
    "id": "vid-mathematics-relations-and-functions",
    "chapter": "Relations and Functions",
    "subject": "Mathematics",
    "title": "Relations and Functions — Full Chapter High-Yield One-Shot",
    "youtubeId": "PHXKDfENOrA",
    "channelName": "Next Toppers - 12th Science",
    "duration": "33m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Relations and Functions (Mathematics). Taught by Next Toppers - 12th Science."
},
  "relations and functions": {
    "id": "vid-mathematics-relations-and-functions",
    "chapter": "Relations and Functions",
    "subject": "Mathematics",
    "title": "Relations and Functions — Full Chapter High-Yield One-Shot",
    "youtubeId": "PHXKDfENOrA",
    "channelName": "Next Toppers - 12th Science",
    "duration": "33m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Relations and Functions (Mathematics). Taught by Next Toppers - 12th Science."
},
  "mathematics:trigonometric functions": {
    "id": "vid-mathematics-trigonometric-functions",
    "chapter": "Trigonometric Functions",
    "subject": "Mathematics",
    "title": "Trigonometric Functions — Full Chapter High-Yield One-Shot",
    "youtubeId": "XszL9g403ew",
    "channelName": "PW Commerce Wallah Class 11",
    "duration": "2h 38m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Trigonometric Functions (Mathematics). Taught by PW Commerce Wallah Class 11."
},
  "trigonometric functions": {
    "id": "vid-mathematics-trigonometric-functions",
    "chapter": "Trigonometric Functions",
    "subject": "Mathematics",
    "title": "Trigonometric Functions — Full Chapter High-Yield One-Shot",
    "youtubeId": "XszL9g403ew",
    "channelName": "PW Commerce Wallah Class 11",
    "duration": "2h 38m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Trigonometric Functions (Mathematics). Taught by PW Commerce Wallah Class 11."
},
  "mathematics:complex numbers and quadratic equations": {
    "id": "vid-mathematics-complex-numbers-and-quadratic-equations",
    "chapter": "Complex Numbers and Quadratic Equations",
    "subject": "Mathematics",
    "title": "Complex Numbers and Quadratic Equations — Full Chapter High-Yield One-Shot",
    "youtubeId": "7tu6_GH5qAw",
    "channelName": "PW Class 11 Science",
    "duration": "2h 40m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Complex Numbers and Quadratic Equations (Mathematics). Taught by PW Class 11 Science."
},
  "complex numbers and quadratic equations": {
    "id": "vid-mathematics-complex-numbers-and-quadratic-equations",
    "chapter": "Complex Numbers and Quadratic Equations",
    "subject": "Mathematics",
    "title": "Complex Numbers and Quadratic Equations — Full Chapter High-Yield One-Shot",
    "youtubeId": "7tu6_GH5qAw",
    "channelName": "PW Class 11 Science",
    "duration": "2h 40m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Complex Numbers and Quadratic Equations (Mathematics). Taught by PW Class 11 Science."
},
  "mathematics:linear inequalities": {
    "id": "vid-mathematics-linear-inequalities",
    "chapter": "Linear Inequalities",
    "subject": "Mathematics",
    "title": "Linear Inequalities — Full Chapter High-Yield One-Shot",
    "youtubeId": "oCHw0Bsb34A",
    "channelName": "Next Toppers - 11th Science",
    "duration": "54m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Linear Inequalities (Mathematics). Taught by Next Toppers - 11th Science."
},
  "linear inequalities": {
    "id": "vid-mathematics-linear-inequalities",
    "chapter": "Linear Inequalities",
    "subject": "Mathematics",
    "title": "Linear Inequalities — Full Chapter High-Yield One-Shot",
    "youtubeId": "oCHw0Bsb34A",
    "channelName": "Next Toppers - 11th Science",
    "duration": "54m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Linear Inequalities (Mathematics). Taught by Next Toppers - 11th Science."
},
  "mathematics:permutations and combinations": {
    "id": "vid-mathematics-permutations-and-combinations",
    "chapter": "Permutations and Combinations",
    "subject": "Mathematics",
    "title": "Permutations and Combinations — Full Chapter High-Yield One-Shot",
    "youtubeId": "Y1X_zLptX_E",
    "channelName": "PW Class 11 Science",
    "duration": "4h 41m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Permutations and Combinations (Mathematics). Taught by PW Class 11 Science."
},
  "permutations and combinations": {
    "id": "vid-mathematics-permutations-and-combinations",
    "chapter": "Permutations and Combinations",
    "subject": "Mathematics",
    "title": "Permutations and Combinations — Full Chapter High-Yield One-Shot",
    "youtubeId": "Y1X_zLptX_E",
    "channelName": "PW Class 11 Science",
    "duration": "4h 41m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Permutations and Combinations (Mathematics). Taught by PW Class 11 Science."
},
  "mathematics:binomial theorem": {
    "id": "vid-mathematics-binomial-theorem",
    "chapter": "Binomial Theorem",
    "subject": "Mathematics",
    "title": "Binomial Theorem — Full Chapter High-Yield One-Shot",
    "youtubeId": "uzkEuT8OesQ",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 19m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Binomial Theorem (Mathematics). Taught by Next Toppers - 11th Science."
},
  "binomial theorem": {
    "id": "vid-mathematics-binomial-theorem",
    "chapter": "Binomial Theorem",
    "subject": "Mathematics",
    "title": "Binomial Theorem — Full Chapter High-Yield One-Shot",
    "youtubeId": "uzkEuT8OesQ",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 19m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Binomial Theorem (Mathematics). Taught by Next Toppers - 11th Science."
},
  "mathematics:sequences and series": {
    "id": "vid-mathematics-sequences-and-series",
    "chapter": "Sequences and Series",
    "subject": "Mathematics",
    "title": "Sequences and Series — Full Chapter High-Yield One-Shot",
    "youtubeId": "TU0rHRQ2wqU",
    "channelName": "Science and Fun Education ",
    "duration": "1h 47m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Sequences and Series (Mathematics). Taught by Science and Fun Education ."
},
  "sequences and series": {
    "id": "vid-mathematics-sequences-and-series",
    "chapter": "Sequences and Series",
    "subject": "Mathematics",
    "title": "Sequences and Series — Full Chapter High-Yield One-Shot",
    "youtubeId": "TU0rHRQ2wqU",
    "channelName": "Science and Fun Education ",
    "duration": "1h 47m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Sequences and Series (Mathematics). Taught by Science and Fun Education ."
},
  "mathematics:straight lines": {
    "id": "vid-mathematics-straight-lines",
    "chapter": "Straight Lines",
    "subject": "Mathematics",
    "title": "Straight Lines — Full Chapter High-Yield One-Shot",
    "youtubeId": "JfU0FA20bcM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 54m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Straight Lines (Mathematics). Taught by Next Toppers - 11th Science."
},
  "straight lines": {
    "id": "vid-mathematics-straight-lines",
    "chapter": "Straight Lines",
    "subject": "Mathematics",
    "title": "Straight Lines — Full Chapter High-Yield One-Shot",
    "youtubeId": "JfU0FA20bcM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 54m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Straight Lines (Mathematics). Taught by Next Toppers - 11th Science."
},
  "mathematics:conic sections": {
    "id": "vid-mathematics-conic-sections",
    "chapter": "Conic Sections",
    "subject": "Mathematics",
    "title": "Conic Sections — Full Chapter High-Yield One-Shot",
    "youtubeId": "d6xzZ5RjSHY",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Conic Sections (Mathematics). Taught by Next Toppers - 11th Science."
},
  "conic sections": {
    "id": "vid-mathematics-conic-sections",
    "chapter": "Conic Sections",
    "subject": "Mathematics",
    "title": "Conic Sections — Full Chapter High-Yield One-Shot",
    "youtubeId": "d6xzZ5RjSHY",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 25m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Conic Sections (Mathematics). Taught by Next Toppers - 11th Science."
},
  "mathematics:introduction to three dimensional geometry": {
    "id": "vid-mathematics-introduction-to-three-dimensional-geometry",
    "chapter": "Introduction to Three Dimensional Geometry",
    "subject": "Mathematics",
    "title": "Introduction to Three Dimensional Geometry — Full Chapter High-Yield One-Shot",
    "youtubeId": "_1PHAhxfR5g",
    "channelName": "Magnet Brains",
    "duration": "1h 17m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Introduction to Three Dimensional Geometry (Mathematics). Taught by Magnet Brains."
},
  "introduction to three dimensional geometry": {
    "id": "vid-mathematics-introduction-to-three-dimensional-geometry",
    "chapter": "Introduction to Three Dimensional Geometry",
    "subject": "Mathematics",
    "title": "Introduction to Three Dimensional Geometry — Full Chapter High-Yield One-Shot",
    "youtubeId": "_1PHAhxfR5g",
    "channelName": "Magnet Brains",
    "duration": "1h 17m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Introduction to Three Dimensional Geometry (Mathematics). Taught by Magnet Brains."
},
  "mathematics:limits and derivatives": {
    "id": "vid-mathematics-limits-and-derivatives",
    "chapter": "Limits and Derivatives",
    "subject": "Mathematics",
    "title": "Limits and Derivatives — Full Chapter High-Yield One-Shot",
    "youtubeId": "P8_KCItuZVM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 47m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Limits and Derivatives (Mathematics). Taught by Next Toppers - 11th Science."
},
  "limits and derivatives": {
    "id": "vid-mathematics-limits-and-derivatives",
    "chapter": "Limits and Derivatives",
    "subject": "Mathematics",
    "title": "Limits and Derivatives — Full Chapter High-Yield One-Shot",
    "youtubeId": "P8_KCItuZVM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 47m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Limits and Derivatives (Mathematics). Taught by Next Toppers - 11th Science."
},
  "mathematics:statistics": {
    "id": "vid-mathematics-statistics",
    "chapter": "Statistics",
    "subject": "Mathematics",
    "title": "Statistics — Full Chapter High-Yield One-Shot",
    "youtubeId": "NNK3IBHh_GY",
    "channelName": "Vedantu JEE",
    "duration": "1h 36m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Statistics (Mathematics). Taught by Vedantu JEE."
},
  "statistics": {
    "id": "vid-mathematics-statistics",
    "chapter": "Statistics",
    "subject": "Mathematics",
    "title": "Statistics — Full Chapter High-Yield One-Shot",
    "youtubeId": "NNK3IBHh_GY",
    "channelName": "Vedantu JEE",
    "duration": "1h 36m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Statistics (Mathematics). Taught by Vedantu JEE."
},
  "mathematics:probability": {
    "id": "vid-mathematics-probability",
    "chapter": "Probability",
    "subject": "Mathematics",
    "title": "Probability — Full Chapter High-Yield One-Shot",
    "youtubeId": "oqQDUjpI4BU",
    "channelName": "NCERT Wallah",
    "duration": "4h 48m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Probability (Mathematics). Taught by NCERT Wallah."
},
  "probability": {
    "id": "vid-mathematics-probability",
    "chapter": "Probability",
    "subject": "Mathematics",
    "title": "Probability — Full Chapter High-Yield One-Shot",
    "youtubeId": "oqQDUjpI4BU",
    "channelName": "NCERT Wallah",
    "duration": "4h 48m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Probability (Mathematics). Taught by NCERT Wallah."
},
  "mathematics:inverse trigonometric functions": {
    "id": "vid-mathematics-inverse-trigonometric-functions",
    "chapter": "Inverse Trigonometric Functions",
    "subject": "Mathematics",
    "title": "Inverse Trigonometric Functions — Full Chapter High-Yield One-Shot",
    "youtubeId": "Djife9uhmkM",
    "channelName": "NCERT Wallah",
    "duration": "3h 16m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Inverse Trigonometric Functions (Mathematics). Taught by NCERT Wallah."
},
  "inverse trigonometric functions": {
    "id": "vid-mathematics-inverse-trigonometric-functions",
    "chapter": "Inverse Trigonometric Functions",
    "subject": "Mathematics",
    "title": "Inverse Trigonometric Functions — Full Chapter High-Yield One-Shot",
    "youtubeId": "Djife9uhmkM",
    "channelName": "NCERT Wallah",
    "duration": "3h 16m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Inverse Trigonometric Functions (Mathematics). Taught by NCERT Wallah."
},
  "mathematics:matrices": {
    "id": "vid-mathematics-matrices",
    "chapter": "Matrices",
    "subject": "Mathematics",
    "title": "Matrices — Full Chapter High-Yield One-Shot",
    "youtubeId": "IGRkeEuYIdM",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 51m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Matrices (Mathematics). Taught by Next Toppers - 12th Science."
},
  "matrices": {
    "id": "vid-mathematics-matrices",
    "chapter": "Matrices",
    "subject": "Mathematics",
    "title": "Matrices — Full Chapter High-Yield One-Shot",
    "youtubeId": "IGRkeEuYIdM",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 51m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Matrices (Mathematics). Taught by Next Toppers - 12th Science."
},
  "mathematics:determinants": {
    "id": "vid-mathematics-determinants",
    "chapter": "Determinants",
    "subject": "Mathematics",
    "title": "Determinants — Full Chapter High-Yield One-Shot",
    "youtubeId": "N8iSijatqGA",
    "channelName": "PW Commerce Wallah Class 12",
    "duration": "4h 16m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Determinants (Mathematics). Taught by PW Commerce Wallah Class 12."
},
  "determinants": {
    "id": "vid-mathematics-determinants",
    "chapter": "Determinants",
    "subject": "Mathematics",
    "title": "Determinants — Full Chapter High-Yield One-Shot",
    "youtubeId": "N8iSijatqGA",
    "channelName": "PW Commerce Wallah Class 12",
    "duration": "4h 16m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Determinants (Mathematics). Taught by PW Commerce Wallah Class 12."
},
  "mathematics:continuity and differentiability": {
    "id": "vid-mathematics-continuity-and-differentiability",
    "chapter": "Continuity and Differentiability",
    "subject": "Mathematics",
    "title": "Continuity and Differentiability — Full Chapter High-Yield One-Shot",
    "youtubeId": "4QHCF6nUxEk",
    "channelName": "Next Toppers - 12th Science",
    "duration": "3h 11m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Continuity and Differentiability (Mathematics). Taught by Next Toppers - 12th Science."
},
  "continuity and differentiability": {
    "id": "vid-mathematics-continuity-and-differentiability",
    "chapter": "Continuity and Differentiability",
    "subject": "Mathematics",
    "title": "Continuity and Differentiability — Full Chapter High-Yield One-Shot",
    "youtubeId": "4QHCF6nUxEk",
    "channelName": "Next Toppers - 12th Science",
    "duration": "3h 11m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Continuity and Differentiability (Mathematics). Taught by Next Toppers - 12th Science."
},
  "mathematics:application of derivatives": {
    "id": "vid-mathematics-application-of-derivatives",
    "chapter": "Application of Derivatives",
    "subject": "Mathematics",
    "title": "Application of Derivatives — Full Chapter High-Yield One-Shot",
    "youtubeId": "m2TSPZOTw50",
    "channelName": "NCERT Wallah",
    "duration": "5h 48m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Application of Derivatives (Mathematics). Taught by NCERT Wallah."
},
  "application of derivatives": {
    "id": "vid-mathematics-application-of-derivatives",
    "chapter": "Application of Derivatives",
    "subject": "Mathematics",
    "title": "Application of Derivatives — Full Chapter High-Yield One-Shot",
    "youtubeId": "m2TSPZOTw50",
    "channelName": "NCERT Wallah",
    "duration": "5h 48m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Application of Derivatives (Mathematics). Taught by NCERT Wallah."
},
  "mathematics:integrals": {
    "id": "vid-mathematics-integrals",
    "chapter": "Integrals",
    "subject": "Mathematics",
    "title": "Integrals — Full Chapter High-Yield One-Shot",
    "youtubeId": "dBglfhVX6kI",
    "channelName": "12th Hackers",
    "duration": "3h 14m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Integrals (Mathematics). Taught by 12th Hackers."
},
  "integrals": {
    "id": "vid-mathematics-integrals",
    "chapter": "Integrals",
    "subject": "Mathematics",
    "title": "Integrals — Full Chapter High-Yield One-Shot",
    "youtubeId": "dBglfhVX6kI",
    "channelName": "12th Hackers",
    "duration": "3h 14m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Integrals (Mathematics). Taught by 12th Hackers."
},
  "mathematics:applications of integrals": {
    "id": "vid-mathematics-applications-of-integrals",
    "chapter": "Applications of Integrals",
    "subject": "Mathematics",
    "title": "Applications of Integrals — Full Chapter High-Yield One-Shot",
    "youtubeId": "rPK4yfXAKa8",
    "channelName": "PW Commerce Wallah Class 12",
    "duration": "3h 31m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Applications of Integrals (Mathematics). Taught by PW Commerce Wallah Class 12."
},
  "applications of integrals": {
    "id": "vid-mathematics-applications-of-integrals",
    "chapter": "Applications of Integrals",
    "subject": "Mathematics",
    "title": "Applications of Integrals — Full Chapter High-Yield One-Shot",
    "youtubeId": "rPK4yfXAKa8",
    "channelName": "PW Commerce Wallah Class 12",
    "duration": "3h 31m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Applications of Integrals (Mathematics). Taught by PW Commerce Wallah Class 12."
},
  "mathematics:differential equations": {
    "id": "vid-mathematics-differential-equations",
    "chapter": "Differential Equations",
    "subject": "Mathematics",
    "title": "Differential Equations — Full Chapter High-Yield One-Shot",
    "youtubeId": "UFRw4yx0RjY",
    "channelName": "NCERT Wallah",
    "duration": "5h 18m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Differential Equations (Mathematics). Taught by NCERT Wallah."
},
  "differential equations": {
    "id": "vid-mathematics-differential-equations",
    "chapter": "Differential Equations",
    "subject": "Mathematics",
    "title": "Differential Equations — Full Chapter High-Yield One-Shot",
    "youtubeId": "UFRw4yx0RjY",
    "channelName": "NCERT Wallah",
    "duration": "5h 18m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Differential Equations (Mathematics). Taught by NCERT Wallah."
},
  "mathematics:vector algebra": {
    "id": "vid-mathematics-vector-algebra",
    "chapter": "Vector Algebra",
    "subject": "Mathematics",
    "title": "Vector Algebra — Full Chapter High-Yield One-Shot",
    "youtubeId": "GE2eugP2928",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 41m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Vector Algebra (Mathematics). Taught by Next Toppers - 12th Science."
},
  "vector algebra": {
    "id": "vid-mathematics-vector-algebra",
    "chapter": "Vector Algebra",
    "subject": "Mathematics",
    "title": "Vector Algebra — Full Chapter High-Yield One-Shot",
    "youtubeId": "GE2eugP2928",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 41m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Vector Algebra (Mathematics). Taught by Next Toppers - 12th Science."
},
  "mathematics:three dimensional geometry": {
    "id": "vid-mathematics-three-dimensional-geometry",
    "chapter": "Three Dimensional Geometry",
    "subject": "Mathematics",
    "title": "Three Dimensional Geometry — Full Chapter High-Yield One-Shot",
    "youtubeId": "AxcLk3RA3-4",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 48m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Three Dimensional Geometry (Mathematics). Taught by Next Toppers - 12th Science."
},
  "three dimensional geometry": {
    "id": "vid-mathematics-three-dimensional-geometry",
    "chapter": "Three Dimensional Geometry",
    "subject": "Mathematics",
    "title": "Three Dimensional Geometry — Full Chapter High-Yield One-Shot",
    "youtubeId": "AxcLk3RA3-4",
    "channelName": "Next Toppers - 12th Science",
    "duration": "2h 48m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Three Dimensional Geometry (Mathematics). Taught by Next Toppers - 12th Science."
},
  "mathematics:linear programming": {
    "id": "vid-mathematics-linear-programming",
    "chapter": "Linear Programming",
    "subject": "Mathematics",
    "title": "Linear Programming — Full Chapter High-Yield One-Shot",
    "youtubeId": "6ofzWIXA_nk",
    "channelName": "Learn and Share",
    "duration": "2h 56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Linear Programming (Mathematics). Taught by Learn and Share."
},
  "linear programming": {
    "id": "vid-mathematics-linear-programming",
    "chapter": "Linear Programming",
    "subject": "Mathematics",
    "title": "Linear Programming — Full Chapter High-Yield One-Shot",
    "youtubeId": "6ofzWIXA_nk",
    "channelName": "Learn and Share",
    "duration": "2h 56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Linear Programming (Mathematics). Taught by Learn and Share."
},
  "biology:the living world": {
    "id": "vid-biology-the-living-world",
    "chapter": "The Living World",
    "subject": "Biology",
    "title": "The Living World — Full Chapter High-Yield One-Shot",
    "youtubeId": "FNLxE6vrWzs",
    "channelName": "Competition Wallah",
    "duration": "2h 20m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for The Living World (Biology). Taught by Competition Wallah."
},
  "the living world": {
    "id": "vid-biology-the-living-world",
    "chapter": "The Living World",
    "subject": "Biology",
    "title": "The Living World — Full Chapter High-Yield One-Shot",
    "youtubeId": "FNLxE6vrWzs",
    "channelName": "Competition Wallah",
    "duration": "2h 20m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for The Living World (Biology). Taught by Competition Wallah."
},
  "biology:biological classification": {
    "id": "vid-biology-biological-classification",
    "chapter": "Biological Classification",
    "subject": "Biology",
    "title": "Biological Classification — Full Chapter High-Yield One-Shot",
    "youtubeId": "i33OGO6-M_Y",
    "channelName": "Competition Wallah",
    "duration": "56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biological Classification (Biology). Taught by Competition Wallah."
},
  "biological classification": {
    "id": "vid-biology-biological-classification",
    "chapter": "Biological Classification",
    "subject": "Biology",
    "title": "Biological Classification — Full Chapter High-Yield One-Shot",
    "youtubeId": "i33OGO6-M_Y",
    "channelName": "Competition Wallah",
    "duration": "56m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biological Classification (Biology). Taught by Competition Wallah."
},
  "biology:plant kingdom": {
    "id": "vid-biology-plant-kingdom",
    "chapter": "Plant Kingdom",
    "subject": "Biology",
    "title": "Plant Kingdom — Full Chapter High-Yield One-Shot",
    "youtubeId": "CsORwFF9aIU",
    "channelName": "Unacademy NEET",
    "duration": "2h 49m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Plant Kingdom (Biology). Taught by Unacademy NEET."
},
  "plant kingdom": {
    "id": "vid-biology-plant-kingdom",
    "chapter": "Plant Kingdom",
    "subject": "Biology",
    "title": "Plant Kingdom — Full Chapter High-Yield One-Shot",
    "youtubeId": "CsORwFF9aIU",
    "channelName": "Unacademy NEET",
    "duration": "2h 49m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Plant Kingdom (Biology). Taught by Unacademy NEET."
},
  "biology:animal kingdom": {
    "id": "vid-biology-animal-kingdom",
    "chapter": "Animal Kingdom",
    "subject": "Biology",
    "title": "Animal Kingdom — Full Chapter High-Yield One-Shot",
    "youtubeId": "I61jHeo0njE",
    "channelName": "Unacademy NEET",
    "duration": "2h 47m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Animal Kingdom (Biology). Taught by Unacademy NEET."
},
  "animal kingdom": {
    "id": "vid-biology-animal-kingdom",
    "chapter": "Animal Kingdom",
    "subject": "Biology",
    "title": "Animal Kingdom — Full Chapter High-Yield One-Shot",
    "youtubeId": "I61jHeo0njE",
    "channelName": "Unacademy NEET",
    "duration": "2h 47m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Animal Kingdom (Biology). Taught by Unacademy NEET."
},
  "biology:morphology of flowering plants": {
    "id": "vid-biology-morphology-of-flowering-plants",
    "chapter": "Morphology of Flowering Plants",
    "subject": "Biology",
    "title": "Morphology of Flowering Plants — Full Chapter High-Yield One-Shot",
    "youtubeId": "x3Abl5hjTrs",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 58m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Morphology of Flowering Plants (Biology). Taught by Next Toppers - 11th Science."
},
  "morphology of flowering plants": {
    "id": "vid-biology-morphology-of-flowering-plants",
    "chapter": "Morphology of Flowering Plants",
    "subject": "Biology",
    "title": "Morphology of Flowering Plants — Full Chapter High-Yield One-Shot",
    "youtubeId": "x3Abl5hjTrs",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 58m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Morphology of Flowering Plants (Biology). Taught by Next Toppers - 11th Science."
},
  "biology:anatomy of flowering plants": {
    "id": "vid-biology-anatomy-of-flowering-plants",
    "chapter": "Anatomy of Flowering Plants",
    "subject": "Biology",
    "title": "Anatomy of Flowering Plants — Full Chapter High-Yield One-Shot",
    "youtubeId": "_cJ_ibTanMI",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 2m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Anatomy of Flowering Plants (Biology). Taught by Next Toppers - 11th Science."
},
  "anatomy of flowering plants": {
    "id": "vid-biology-anatomy-of-flowering-plants",
    "chapter": "Anatomy of Flowering Plants",
    "subject": "Biology",
    "title": "Anatomy of Flowering Plants — Full Chapter High-Yield One-Shot",
    "youtubeId": "_cJ_ibTanMI",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 2m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Anatomy of Flowering Plants (Biology). Taught by Next Toppers - 11th Science."
},
  "biology:structural organisation in animals": {
    "id": "vid-biology-structural-organisation-in-animals",
    "chapter": "Structural Organisation in Animals",
    "subject": "Biology",
    "title": "Structural Organisation in Animals — Full Chapter High-Yield One-Shot",
    "youtubeId": "fHheuMLaRDU",
    "channelName": "Unacademy NEET",
    "duration": "3h 26m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Structural Organisation in Animals (Biology). Taught by Unacademy NEET."
},
  "structural organisation in animals": {
    "id": "vid-biology-structural-organisation-in-animals",
    "chapter": "Structural Organisation in Animals",
    "subject": "Biology",
    "title": "Structural Organisation in Animals — Full Chapter High-Yield One-Shot",
    "youtubeId": "fHheuMLaRDU",
    "channelName": "Unacademy NEET",
    "duration": "3h 26m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Structural Organisation in Animals (Biology). Taught by Unacademy NEET."
},
  "biology:cell: the unit of life": {
    "id": "vid-biology-cell-the-unit-of-life",
    "chapter": "Cell: The Unit of Life",
    "subject": "Biology",
    "title": "Cell: The Unit of Life — Full Chapter High-Yield One-Shot",
    "youtubeId": "zh1vO2aAJ4E",
    "channelName": "Competition Wallah",
    "duration": "5h 33m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Cell: The Unit of Life (Biology). Taught by Competition Wallah."
},
  "cell: the unit of life": {
    "id": "vid-biology-cell-the-unit-of-life",
    "chapter": "Cell: The Unit of Life",
    "subject": "Biology",
    "title": "Cell: The Unit of Life — Full Chapter High-Yield One-Shot",
    "youtubeId": "zh1vO2aAJ4E",
    "channelName": "Competition Wallah",
    "duration": "5h 33m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Cell: The Unit of Life (Biology). Taught by Competition Wallah."
},
  "biology:cell the unit of life": {
    "id": "vid-biology-cell-the-unit-of-life",
    "chapter": "Cell: The Unit of Life",
    "subject": "Biology",
    "title": "Cell: The Unit of Life — Full Chapter High-Yield One-Shot",
    "youtubeId": "zh1vO2aAJ4E",
    "channelName": "Competition Wallah",
    "duration": "5h 33m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Cell: The Unit of Life (Biology). Taught by Competition Wallah."
},
  "cell the unit of life": {
    "id": "vid-biology-cell-the-unit-of-life",
    "chapter": "Cell: The Unit of Life",
    "subject": "Biology",
    "title": "Cell: The Unit of Life — Full Chapter High-Yield One-Shot",
    "youtubeId": "zh1vO2aAJ4E",
    "channelName": "Competition Wallah",
    "duration": "5h 33m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Cell: The Unit of Life (Biology). Taught by Competition Wallah."
},
  "biology:biomolecules": {
    "id": "vid-biology-biomolecules",
    "chapter": "Biomolecules",
    "subject": "Biology",
    "title": "Biomolecules — Full Chapter High-Yield One-Shot",
    "youtubeId": "6c1oeUmlXiE",
    "channelName": "Competition Wallah",
    "duration": "2h 58m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biomolecules (Biology). Taught by Competition Wallah."
},
  "biology:cell cycle and cell division": {
    "id": "vid-biology-cell-cycle-and-cell-division",
    "chapter": "Cell Cycle and Cell Division",
    "subject": "Biology",
    "title": "Cell Cycle and Cell Division — Full Chapter High-Yield One-Shot",
    "youtubeId": "qDC5jyvew44",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 1m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Cell Cycle and Cell Division (Biology). Taught by Next Toppers - 11th Science."
},
  "cell cycle and cell division": {
    "id": "vid-biology-cell-cycle-and-cell-division",
    "chapter": "Cell Cycle and Cell Division",
    "subject": "Biology",
    "title": "Cell Cycle and Cell Division — Full Chapter High-Yield One-Shot",
    "youtubeId": "qDC5jyvew44",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 1m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Cell Cycle and Cell Division (Biology). Taught by Next Toppers - 11th Science."
},
  "biology:photosynthesis in higher plants": {
    "id": "vid-biology-photosynthesis-in-higher-plants",
    "chapter": "Photosynthesis in Higher Plants",
    "subject": "Biology",
    "title": "Photosynthesis in Higher Plants — Full Chapter High-Yield One-Shot",
    "youtubeId": "dZP3V4ab7NI",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 36m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Photosynthesis in Higher Plants (Biology). Taught by Next Toppers - 11th Science."
},
  "photosynthesis in higher plants": {
    "id": "vid-biology-photosynthesis-in-higher-plants",
    "chapter": "Photosynthesis in Higher Plants",
    "subject": "Biology",
    "title": "Photosynthesis in Higher Plants — Full Chapter High-Yield One-Shot",
    "youtubeId": "dZP3V4ab7NI",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 36m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Photosynthesis in Higher Plants (Biology). Taught by Next Toppers - 11th Science."
},
  "biology:respiration in plants": {
    "id": "vid-biology-respiration-in-plants",
    "chapter": "Respiration in Plants",
    "subject": "Biology",
    "title": "Respiration in Plants — Full Chapter High-Yield One-Shot",
    "youtubeId": "TvDVTTfyxPY",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 43m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Respiration in Plants (Biology). Taught by Next Toppers - 11th Science."
},
  "respiration in plants": {
    "id": "vid-biology-respiration-in-plants",
    "chapter": "Respiration in Plants",
    "subject": "Biology",
    "title": "Respiration in Plants — Full Chapter High-Yield One-Shot",
    "youtubeId": "TvDVTTfyxPY",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 43m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Respiration in Plants (Biology). Taught by Next Toppers - 11th Science."
},
  "biology:plant growth and development": {
    "id": "vid-biology-plant-growth-and-development",
    "chapter": "Plant Growth and Development",
    "subject": "Biology",
    "title": "Plant Growth and Development — Full Chapter High-Yield One-Shot",
    "youtubeId": "nv_fX0b3xGM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 26m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Plant Growth and Development (Biology). Taught by Next Toppers - 11th Science."
},
  "plant growth and development": {
    "id": "vid-biology-plant-growth-and-development",
    "chapter": "Plant Growth and Development",
    "subject": "Biology",
    "title": "Plant Growth and Development — Full Chapter High-Yield One-Shot",
    "youtubeId": "nv_fX0b3xGM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 26m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Plant Growth and Development (Biology). Taught by Next Toppers - 11th Science."
},
  "biology:breathing and exchange of gases": {
    "id": "vid-biology-breathing-and-exchange-of-gases",
    "chapter": "Breathing and Exchange of Gases",
    "subject": "Biology",
    "title": "Breathing and Exchange of Gases — Full Chapter High-Yield One-Shot",
    "youtubeId": "74wryf6f9qg",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 47m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Breathing and Exchange of Gases (Biology). Taught by Next Toppers - 11th Science."
},
  "breathing and exchange of gases": {
    "id": "vid-biology-breathing-and-exchange-of-gases",
    "chapter": "Breathing and Exchange of Gases",
    "subject": "Biology",
    "title": "Breathing and Exchange of Gases — Full Chapter High-Yield One-Shot",
    "youtubeId": "74wryf6f9qg",
    "channelName": "Next Toppers - 11th Science",
    "duration": "1h 47m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Breathing and Exchange of Gases (Biology). Taught by Next Toppers - 11th Science."
},
  "biology:body fluids and circulation": {
    "id": "vid-biology-body-fluids-and-circulation",
    "chapter": "Body Fluids and Circulation",
    "subject": "Biology",
    "title": "Body Fluids and Circulation — Full Chapter High-Yield One-Shot",
    "youtubeId": "9dEC-7UEjgA",
    "channelName": "Unacademy NEET",
    "duration": "2h 59m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Body Fluids and Circulation (Biology). Taught by Unacademy NEET."
},
  "body fluids and circulation": {
    "id": "vid-biology-body-fluids-and-circulation",
    "chapter": "Body Fluids and Circulation",
    "subject": "Biology",
    "title": "Body Fluids and Circulation — Full Chapter High-Yield One-Shot",
    "youtubeId": "9dEC-7UEjgA",
    "channelName": "Unacademy NEET",
    "duration": "2h 59m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Body Fluids and Circulation (Biology). Taught by Unacademy NEET."
},
  "biology:excretory products and their elimination": {
    "id": "vid-biology-excretory-products-and-their-elimination",
    "chapter": "Excretory Products and their Elimination",
    "subject": "Biology",
    "title": "Excretory Products and their Elimination — Full Chapter High-Yield One-Shot",
    "youtubeId": "FfJiaMXlRmE",
    "channelName": "PW Class 11 Science",
    "duration": "2h 12m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Excretory Products and their Elimination (Biology). Taught by PW Class 11 Science."
},
  "excretory products and their elimination": {
    "id": "vid-biology-excretory-products-and-their-elimination",
    "chapter": "Excretory Products and their Elimination",
    "subject": "Biology",
    "title": "Excretory Products and their Elimination — Full Chapter High-Yield One-Shot",
    "youtubeId": "FfJiaMXlRmE",
    "channelName": "PW Class 11 Science",
    "duration": "2h 12m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Excretory Products and their Elimination (Biology). Taught by PW Class 11 Science."
},
  "biology:locomotion and movement": {
    "id": "vid-biology-locomotion-and-movement",
    "chapter": "Locomotion and Movement",
    "subject": "Biology",
    "title": "Locomotion and Movement — Full Chapter High-Yield One-Shot",
    "youtubeId": "AZy2DRYt8jI",
    "channelName": "Unacademy NEET",
    "duration": "2h 38m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Locomotion and Movement (Biology). Taught by Unacademy NEET."
},
  "locomotion and movement": {
    "id": "vid-biology-locomotion-and-movement",
    "chapter": "Locomotion and Movement",
    "subject": "Biology",
    "title": "Locomotion and Movement — Full Chapter High-Yield One-Shot",
    "youtubeId": "AZy2DRYt8jI",
    "channelName": "Unacademy NEET",
    "duration": "2h 38m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Locomotion and Movement (Biology). Taught by Unacademy NEET."
},
  "biology:neural control and coordination": {
    "id": "vid-biology-neural-control-and-coordination",
    "chapter": "Neural Control and Coordination",
    "subject": "Biology",
    "title": "Neural Control and Coordination — Full Chapter High-Yield One-Shot",
    "youtubeId": "odaz7IVZV8c",
    "channelName": "PW Class 11 Science",
    "duration": "2h 4m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Neural Control and Coordination (Biology). Taught by PW Class 11 Science."
},
  "neural control and coordination": {
    "id": "vid-biology-neural-control-and-coordination",
    "chapter": "Neural Control and Coordination",
    "subject": "Biology",
    "title": "Neural Control and Coordination — Full Chapter High-Yield One-Shot",
    "youtubeId": "odaz7IVZV8c",
    "channelName": "PW Class 11 Science",
    "duration": "2h 4m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Neural Control and Coordination (Biology). Taught by PW Class 11 Science."
},
  "biology:chemical coordination and integration": {
    "id": "vid-biology-chemical-coordination-and-integration",
    "chapter": "Chemical Coordination and Integration",
    "subject": "Biology",
    "title": "Chemical Coordination and Integration — Full Chapter High-Yield One-Shot",
    "youtubeId": "8BCP9dBLgv4",
    "channelName": "Next Toppers - 11th Science",
    "duration": "53m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Coordination and Integration (Biology). Taught by Next Toppers - 11th Science."
},
  "chemical coordination and integration": {
    "id": "vid-biology-chemical-coordination-and-integration",
    "chapter": "Chemical Coordination and Integration",
    "subject": "Biology",
    "title": "Chemical Coordination and Integration — Full Chapter High-Yield One-Shot",
    "youtubeId": "8BCP9dBLgv4",
    "channelName": "Next Toppers - 11th Science",
    "duration": "53m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Coordination and Integration (Biology). Taught by Next Toppers - 11th Science."
},
  "biology:sexual reproduction in flowering plants": {
    "id": "vid-biology-sexual-reproduction-in-flowering-plants",
    "chapter": "Sexual Reproduction in Flowering Plants",
    "subject": "Biology",
    "title": "Sexual Reproduction in Flowering Plants — Full Chapter High-Yield One-Shot",
    "youtubeId": "KC6-_8jajc4",
    "channelName": "Competition Wallah",
    "duration": "50m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Sexual Reproduction in Flowering Plants (Biology). Taught by Competition Wallah."
},
  "sexual reproduction in flowering plants": {
    "id": "vid-biology-sexual-reproduction-in-flowering-plants",
    "chapter": "Sexual Reproduction in Flowering Plants",
    "subject": "Biology",
    "title": "Sexual Reproduction in Flowering Plants — Full Chapter High-Yield One-Shot",
    "youtubeId": "KC6-_8jajc4",
    "channelName": "Competition Wallah",
    "duration": "50m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Sexual Reproduction in Flowering Plants (Biology). Taught by Competition Wallah."
},
  "biology:human reproduction": {
    "id": "vid-biology-human-reproduction",
    "chapter": "Human Reproduction",
    "subject": "Biology",
    "title": "Human Reproduction — Full Chapter High-Yield One-Shot",
    "youtubeId": "jsiE37y8goA",
    "channelName": "NCERT Wallah",
    "duration": "2h 59m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Human Reproduction (Biology). Taught by NCERT Wallah."
},
  "human reproduction": {
    "id": "vid-biology-human-reproduction",
    "chapter": "Human Reproduction",
    "subject": "Biology",
    "title": "Human Reproduction — Full Chapter High-Yield One-Shot",
    "youtubeId": "jsiE37y8goA",
    "channelName": "NCERT Wallah",
    "duration": "2h 59m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Human Reproduction (Biology). Taught by NCERT Wallah."
},
  "biology:reproductive health": {
    "id": "vid-biology-reproductive-health",
    "chapter": "Reproductive Health",
    "subject": "Biology",
    "title": "Reproductive Health — Full Chapter High-Yield One-Shot",
    "youtubeId": "V1Y6R7ZZhOs",
    "channelName": "NCERT Wallah",
    "duration": "1h 36m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Reproductive Health (Biology). Taught by NCERT Wallah."
},
  "reproductive health": {
    "id": "vid-biology-reproductive-health",
    "chapter": "Reproductive Health",
    "subject": "Biology",
    "title": "Reproductive Health — Full Chapter High-Yield One-Shot",
    "youtubeId": "V1Y6R7ZZhOs",
    "channelName": "NCERT Wallah",
    "duration": "1h 36m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Reproductive Health (Biology). Taught by NCERT Wallah."
},
  "biology:principles of inheritance and variation": {
    "id": "vid-biology-principles-of-inheritance-and-variation",
    "chapter": "Principles of Inheritance and Variation",
    "subject": "Biology",
    "title": "Principles of Inheritance and Variation — Full Chapter High-Yield One-Shot",
    "youtubeId": "j2m4hkOJR2M",
    "channelName": "Competition Wallah",
    "duration": "46m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Principles of Inheritance and Variation (Biology). Taught by Competition Wallah."
},
  "principles of inheritance and variation": {
    "id": "vid-biology-principles-of-inheritance-and-variation",
    "chapter": "Principles of Inheritance and Variation",
    "subject": "Biology",
    "title": "Principles of Inheritance and Variation — Full Chapter High-Yield One-Shot",
    "youtubeId": "j2m4hkOJR2M",
    "channelName": "Competition Wallah",
    "duration": "46m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Principles of Inheritance and Variation (Biology). Taught by Competition Wallah."
},
  "biology:molecular basis of inheritance": {
    "id": "vid-biology-molecular-basis-of-inheritance",
    "chapter": "Molecular Basis of Inheritance",
    "subject": "Biology",
    "title": "Molecular Basis of Inheritance — Full Chapter High-Yield One-Shot",
    "youtubeId": "mZFFhplI1Hs",
    "channelName": "NCERT Wallah",
    "duration": "4h 4m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Molecular Basis of Inheritance (Biology). Taught by NCERT Wallah."
},
  "molecular basis of inheritance": {
    "id": "vid-biology-molecular-basis-of-inheritance",
    "chapter": "Molecular Basis of Inheritance",
    "subject": "Biology",
    "title": "Molecular Basis of Inheritance — Full Chapter High-Yield One-Shot",
    "youtubeId": "mZFFhplI1Hs",
    "channelName": "NCERT Wallah",
    "duration": "4h 4m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Molecular Basis of Inheritance (Biology). Taught by NCERT Wallah."
},
  "biology:evolution": {
    "id": "vid-biology-evolution",
    "chapter": "Evolution",
    "subject": "Biology",
    "title": "Evolution — Full Chapter High-Yield One-Shot",
    "youtubeId": "qp3soenNP1Q",
    "channelName": "Sankalp NEET Vedantu",
    "duration": "3h 20m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Evolution (Biology). Taught by Sankalp NEET Vedantu."
},
  "evolution": {
    "id": "vid-biology-evolution",
    "chapter": "Evolution",
    "subject": "Biology",
    "title": "Evolution — Full Chapter High-Yield One-Shot",
    "youtubeId": "qp3soenNP1Q",
    "channelName": "Sankalp NEET Vedantu",
    "duration": "3h 20m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Evolution (Biology). Taught by Sankalp NEET Vedantu."
},
  "biology:human health and disease": {
    "id": "vid-biology-human-health-and-disease",
    "chapter": "Human Health and Disease",
    "subject": "Biology",
    "title": "Human Health and Disease — Full Chapter High-Yield One-Shot",
    "youtubeId": "F8TPIH30tAQ",
    "channelName": "NCERT Wallah",
    "duration": "3h 26m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Human Health and Disease (Biology). Taught by NCERT Wallah."
},
  "human health and disease": {
    "id": "vid-biology-human-health-and-disease",
    "chapter": "Human Health and Disease",
    "subject": "Biology",
    "title": "Human Health and Disease — Full Chapter High-Yield One-Shot",
    "youtubeId": "F8TPIH30tAQ",
    "channelName": "NCERT Wallah",
    "duration": "3h 26m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Human Health and Disease (Biology). Taught by NCERT Wallah."
},
  "biology:microbes in human welfare": {
    "id": "vid-biology-microbes-in-human-welfare",
    "chapter": "Microbes in Human Welfare",
    "subject": "Biology",
    "title": "Microbes in Human Welfare — Full Chapter High-Yield One-Shot",
    "youtubeId": "Z0P6lgBxEY8",
    "channelName": "NCERT Wallah",
    "duration": "1h 34m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Microbes in Human Welfare (Biology). Taught by NCERT Wallah."
},
  "microbes in human welfare": {
    "id": "vid-biology-microbes-in-human-welfare",
    "chapter": "Microbes in Human Welfare",
    "subject": "Biology",
    "title": "Microbes in Human Welfare — Full Chapter High-Yield One-Shot",
    "youtubeId": "Z0P6lgBxEY8",
    "channelName": "NCERT Wallah",
    "duration": "1h 34m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Microbes in Human Welfare (Biology). Taught by NCERT Wallah."
},
  "biology:biotechnology: principles and processes": {
    "id": "vid-biology-biotechnology-principles-and-processes",
    "chapter": "Biotechnology: Principles and Processes",
    "subject": "Biology",
    "title": "Biotechnology: Principles and Processes — Full Chapter High-Yield One-Shot",
    "youtubeId": "AjOTsjgSVzw",
    "channelName": "NEET Wallah हिन्दी माध्यम",
    "duration": "3h 39m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biotechnology: Principles and Processes (Biology). Taught by NEET Wallah हिन्दी माध्यम."
},
  "biotechnology: principles and processes": {
    "id": "vid-biology-biotechnology-principles-and-processes",
    "chapter": "Biotechnology: Principles and Processes",
    "subject": "Biology",
    "title": "Biotechnology: Principles and Processes — Full Chapter High-Yield One-Shot",
    "youtubeId": "AjOTsjgSVzw",
    "channelName": "NEET Wallah हिन्दी माध्यम",
    "duration": "3h 39m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biotechnology: Principles and Processes (Biology). Taught by NEET Wallah हिन्दी माध्यम."
},
  "biology:biotechnology principles and processes": {
    "id": "vid-biology-biotechnology-principles-and-processes",
    "chapter": "Biotechnology: Principles and Processes",
    "subject": "Biology",
    "title": "Biotechnology: Principles and Processes — Full Chapter High-Yield One-Shot",
    "youtubeId": "AjOTsjgSVzw",
    "channelName": "NEET Wallah हिन्दी माध्यम",
    "duration": "3h 39m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biotechnology: Principles and Processes (Biology). Taught by NEET Wallah हिन्दी माध्यम."
},
  "biotechnology principles and processes": {
    "id": "vid-biology-biotechnology-principles-and-processes",
    "chapter": "Biotechnology: Principles and Processes",
    "subject": "Biology",
    "title": "Biotechnology: Principles and Processes — Full Chapter High-Yield One-Shot",
    "youtubeId": "AjOTsjgSVzw",
    "channelName": "NEET Wallah हिन्दी माध्यम",
    "duration": "3h 39m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biotechnology: Principles and Processes (Biology). Taught by NEET Wallah हिन्दी माध्यम."
},
  "biology:biotechnology and its applications": {
    "id": "vid-biology-biotechnology-and-its-applications",
    "chapter": "Biotechnology and its Applications",
    "subject": "Biology",
    "title": "Biotechnology and its Applications — Full Chapter High-Yield One-Shot",
    "youtubeId": "530GYX9C1vU",
    "channelName": "NCERT Wallah",
    "duration": "1h 7m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biotechnology and its Applications (Biology). Taught by NCERT Wallah."
},
  "biotechnology and its applications": {
    "id": "vid-biology-biotechnology-and-its-applications",
    "chapter": "Biotechnology and its Applications",
    "subject": "Biology",
    "title": "Biotechnology and its Applications — Full Chapter High-Yield One-Shot",
    "youtubeId": "530GYX9C1vU",
    "channelName": "NCERT Wallah",
    "duration": "1h 7m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biotechnology and its Applications (Biology). Taught by NCERT Wallah."
},
  "biology:organisms and populations": {
    "id": "vid-biology-organisms-and-populations",
    "chapter": "Organisms and Populations",
    "subject": "Biology",
    "title": "Organisms and Populations — Full Chapter High-Yield One-Shot",
    "youtubeId": "PNf8FhHdYzA",
    "channelName": "Doubtnut NEET Hindi Medium - ALLEN",
    "duration": "4h 4m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Organisms and Populations (Biology). Taught by Doubtnut NEET Hindi Medium - ALLEN."
},
  "organisms and populations": {
    "id": "vid-biology-organisms-and-populations",
    "chapter": "Organisms and Populations",
    "subject": "Biology",
    "title": "Organisms and Populations — Full Chapter High-Yield One-Shot",
    "youtubeId": "PNf8FhHdYzA",
    "channelName": "Doubtnut NEET Hindi Medium - ALLEN",
    "duration": "4h 4m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Organisms and Populations (Biology). Taught by Doubtnut NEET Hindi Medium - ALLEN."
},
  "biology:ecosystem": {
    "id": "vid-biology-ecosystem",
    "chapter": "Ecosystem",
    "subject": "Biology",
    "title": "Ecosystem — Full Chapter High-Yield One-Shot",
    "youtubeId": "ia7IEW1FQ50",
    "channelName": "NCERT Wallah",
    "duration": "1h 19m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Ecosystem (Biology). Taught by NCERT Wallah."
},
  "ecosystem": {
    "id": "vid-biology-ecosystem",
    "chapter": "Ecosystem",
    "subject": "Biology",
    "title": "Ecosystem — Full Chapter High-Yield One-Shot",
    "youtubeId": "ia7IEW1FQ50",
    "channelName": "NCERT Wallah",
    "duration": "1h 19m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Ecosystem (Biology). Taught by NCERT Wallah."
},
  "biology:biodiversity and conservation": {
    "id": "vid-biology-biodiversity-and-conservation",
    "chapter": "Biodiversity and Conservation",
    "subject": "Biology",
    "title": "Biodiversity and Conservation — Full Chapter High-Yield One-Shot",
    "youtubeId": "bOFLd6EZy4g",
    "channelName": "NCERT Wallah",
    "duration": "1h 42m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biodiversity and Conservation (Biology). Taught by NCERT Wallah."
},
  "biodiversity and conservation": {
    "id": "vid-biology-biodiversity-and-conservation",
    "chapter": "Biodiversity and Conservation",
    "subject": "Biology",
    "title": "Biodiversity and Conservation — Full Chapter High-Yield One-Shot",
    "youtubeId": "bOFLd6EZy4g",
    "channelName": "NCERT Wallah",
    "duration": "1h 42m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Biodiversity and Conservation (Biology). Taught by NCERT Wallah."
},
  "physics:kinematics in 1d & 2d complete high-yield one-shot": {
    "id": "vid-alias-kinematics",
    "chapter": "Kinematics in 1D & 2D Complete High-Yield One-Shot",
    "subject": "Physics",
    "title": "Kinematics in 1D & 2D Complete High-Yield One-Shot",
    "youtubeId": "U4NNxFaFliE",
    "channelName": "Eduniti - Physics by Mohit Goenka",
    "duration": "1h 20m",
    "description": "Targeted high-yield revision for Kinematics in 1D & 2D Complete High-Yield One-Shot."
},
  "kinematics in 1d & 2d complete high-yield one-shot": {
    "id": "vid-alias-kinematics",
    "chapter": "Kinematics in 1D & 2D Complete High-Yield One-Shot",
    "subject": "Physics",
    "title": "Kinematics in 1D & 2D Complete High-Yield One-Shot",
    "youtubeId": "U4NNxFaFliE",
    "channelName": "Eduniti - Physics by Mohit Goenka",
    "duration": "1h 20m",
    "description": "Targeted high-yield revision for Kinematics in 1D & 2D Complete High-Yield One-Shot."
},
  "physics:kinematics in 1d 2d complete high yield one shot": {
    "id": "vid-alias-kinematics",
    "chapter": "Kinematics in 1D & 2D Complete High-Yield One-Shot",
    "subject": "Physics",
    "title": "Kinematics in 1D & 2D Complete High-Yield One-Shot",
    "youtubeId": "U4NNxFaFliE",
    "channelName": "Eduniti - Physics by Mohit Goenka",
    "duration": "1h 20m",
    "description": "Targeted high-yield revision for Kinematics in 1D & 2D Complete High-Yield One-Shot."
},
  "kinematics in 1d 2d complete high yield one shot": {
    "id": "vid-alias-kinematics",
    "chapter": "Kinematics in 1D & 2D Complete High-Yield One-Shot",
    "subject": "Physics",
    "title": "Kinematics in 1D & 2D Complete High-Yield One-Shot",
    "youtubeId": "U4NNxFaFliE",
    "channelName": "Eduniti - Physics by Mohit Goenka",
    "duration": "1h 20m",
    "description": "Targeted high-yield revision for Kinematics in 1D & 2D Complete High-Yield One-Shot."
},
  "chemistry:mole concept & stoichiometry one-shot": {
    "id": "vid-alias-mole concept",
    "chapter": "Mole Concept & Stoichiometry One-Shot",
    "subject": "Chemistry",
    "title": "Mole Concept & Stoichiometry One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "hnCfcw26Zlo",
    "channelName": "ICSE Wallah 9 & 10",
    "duration": "2h 46m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Mole Concept & Stoichiometry One-Shot (Chemistry). Taught by ICSE Wallah 9 & 10."
},
  "mole concept & stoichiometry one-shot": {
    "id": "vid-alias-mole concept",
    "chapter": "Mole Concept & Stoichiometry One-Shot",
    "subject": "Chemistry",
    "title": "Mole Concept & Stoichiometry One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "hnCfcw26Zlo",
    "channelName": "ICSE Wallah 9 & 10",
    "duration": "2h 46m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Mole Concept & Stoichiometry One-Shot (Chemistry). Taught by ICSE Wallah 9 & 10."
},
  "chemistry:mole concept stoichiometry one shot": {
    "id": "vid-alias-mole concept",
    "chapter": "Mole Concept & Stoichiometry One-Shot",
    "subject": "Chemistry",
    "title": "Mole Concept & Stoichiometry One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "hnCfcw26Zlo",
    "channelName": "ICSE Wallah 9 & 10",
    "duration": "2h 46m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Mole Concept & Stoichiometry One-Shot (Chemistry). Taught by ICSE Wallah 9 & 10."
},
  "mole concept stoichiometry one shot": {
    "id": "vid-alias-mole concept",
    "chapter": "Mole Concept & Stoichiometry One-Shot",
    "subject": "Chemistry",
    "title": "Mole Concept & Stoichiometry One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "hnCfcw26Zlo",
    "channelName": "ICSE Wallah 9 & 10",
    "duration": "2h 46m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Mole Concept & Stoichiometry One-Shot (Chemistry). Taught by ICSE Wallah 9 & 10."
},
  "chemistry:chemical bonding & vsepr super one-shot": {
    "id": "vid-alias-chemical bonding",
    "chapter": "Chemical Bonding & VSEPR Super One-Shot",
    "subject": "Chemistry",
    "title": "Chemical Bonding & VSEPR Super One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "CIze30XzTkA",
    "channelName": "Ashu Ghai 11th & 12th",
    "duration": "3h 46m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Bonding & VSEPR Super One-Shot (Chemistry). Taught by Ashu Ghai 11th & 12th."
},
  "chemical bonding & vsepr super one-shot": {
    "id": "vid-alias-chemical bonding",
    "chapter": "Chemical Bonding & VSEPR Super One-Shot",
    "subject": "Chemistry",
    "title": "Chemical Bonding & VSEPR Super One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "CIze30XzTkA",
    "channelName": "Ashu Ghai 11th & 12th",
    "duration": "3h 46m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Bonding & VSEPR Super One-Shot (Chemistry). Taught by Ashu Ghai 11th & 12th."
},
  "chemistry:chemical bonding vsepr super one shot": {
    "id": "vid-alias-chemical bonding",
    "chapter": "Chemical Bonding & VSEPR Super One-Shot",
    "subject": "Chemistry",
    "title": "Chemical Bonding & VSEPR Super One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "CIze30XzTkA",
    "channelName": "Ashu Ghai 11th & 12th",
    "duration": "3h 46m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Bonding & VSEPR Super One-Shot (Chemistry). Taught by Ashu Ghai 11th & 12th."
},
  "chemical bonding vsepr super one shot": {
    "id": "vid-alias-chemical bonding",
    "chapter": "Chemical Bonding & VSEPR Super One-Shot",
    "subject": "Chemistry",
    "title": "Chemical Bonding & VSEPR Super One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "CIze30XzTkA",
    "channelName": "Ashu Ghai 11th & 12th",
    "duration": "3h 46m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Chemical Bonding & VSEPR Super One-Shot (Chemistry). Taught by Ashu Ghai 11th & 12th."
},
  "chemistry:general organic chemistry (goc) masterclass": {
    "id": "vid-alias-goc",
    "chapter": "General Organic Chemistry (GOC) Masterclass",
    "subject": "Chemistry",
    "title": "General Organic Chemistry (GOC) Masterclass — Full Chapter High-Yield One-Shot",
    "youtubeId": "rF3es9wABNg",
    "channelName": "PW Class 11 Science",
    "duration": "1h 45m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for General Organic Chemistry (GOC) Masterclass (Chemistry). Taught by PW Class 11 Science."
},
  "general organic chemistry (goc) masterclass": {
    "id": "vid-alias-goc",
    "chapter": "General Organic Chemistry (GOC) Masterclass",
    "subject": "Chemistry",
    "title": "General Organic Chemistry (GOC) Masterclass — Full Chapter High-Yield One-Shot",
    "youtubeId": "rF3es9wABNg",
    "channelName": "PW Class 11 Science",
    "duration": "1h 45m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for General Organic Chemistry (GOC) Masterclass (Chemistry). Taught by PW Class 11 Science."
},
  "chemistry:general organic chemistry goc masterclass": {
    "id": "vid-alias-goc",
    "chapter": "General Organic Chemistry (GOC) Masterclass",
    "subject": "Chemistry",
    "title": "General Organic Chemistry (GOC) Masterclass — Full Chapter High-Yield One-Shot",
    "youtubeId": "rF3es9wABNg",
    "channelName": "PW Class 11 Science",
    "duration": "1h 45m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for General Organic Chemistry (GOC) Masterclass (Chemistry). Taught by PW Class 11 Science."
},
  "general organic chemistry goc masterclass": {
    "id": "vid-alias-goc",
    "chapter": "General Organic Chemistry (GOC) Masterclass",
    "subject": "Chemistry",
    "title": "General Organic Chemistry (GOC) Masterclass — Full Chapter High-Yield One-Shot",
    "youtubeId": "rF3es9wABNg",
    "channelName": "PW Class 11 Science",
    "duration": "1h 45m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for General Organic Chemistry (GOC) Masterclass (Chemistry). Taught by PW Class 11 Science."
},
  "physics:rotational motion & moment of inertia one-shot": {
    "id": "vid-alias-rotational motion",
    "chapter": "Rotational Motion & Moment of Inertia One-Shot",
    "subject": "Physics",
    "title": "Rotational Motion & Moment of Inertia One-Shot",
    "youtubeId": "GG75UTGPJlM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "4h 30m",
    "description": "Targeted high-yield revision for Rotational Motion & Moment of Inertia One-Shot."
},
  "rotational motion & moment of inertia one-shot": {
    "id": "vid-alias-rotational motion",
    "chapter": "Rotational Motion & Moment of Inertia One-Shot",
    "subject": "Physics",
    "title": "Rotational Motion & Moment of Inertia One-Shot",
    "youtubeId": "GG75UTGPJlM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "4h 30m",
    "description": "Targeted high-yield revision for Rotational Motion & Moment of Inertia One-Shot."
},
  "physics:rotational motion moment of inertia one shot": {
    "id": "vid-alias-rotational motion",
    "chapter": "Rotational Motion & Moment of Inertia One-Shot",
    "subject": "Physics",
    "title": "Rotational Motion & Moment of Inertia One-Shot",
    "youtubeId": "GG75UTGPJlM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "4h 30m",
    "description": "Targeted high-yield revision for Rotational Motion & Moment of Inertia One-Shot."
},
  "rotational motion moment of inertia one shot": {
    "id": "vid-alias-rotational motion",
    "chapter": "Rotational Motion & Moment of Inertia One-Shot",
    "subject": "Physics",
    "title": "Rotational Motion & Moment of Inertia One-Shot",
    "youtubeId": "GG75UTGPJlM",
    "channelName": "Next Toppers - 11th Science",
    "duration": "4h 30m",
    "description": "Targeted high-yield revision for Rotational Motion & Moment of Inertia One-Shot."
},
  "physics:electrostatics complete concept revision": {
    "id": "vid-alias-electrostatics",
    "chapter": "Electrostatics Complete Concept Revision",
    "subject": "Physics",
    "title": "Electrostatics Complete Concept Revision — Full Chapter High-Yield One-Shot",
    "youtubeId": "z1gy8O-9a-0",
    "channelName": "Ashu Ghai 11th & 12th",
    "duration": "6h 45m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electrostatics Complete Concept Revision (Physics). Taught by Ashu Ghai 11th & 12th."
},
  "electrostatics complete concept revision": {
    "id": "vid-alias-electrostatics",
    "chapter": "Electrostatics Complete Concept Revision",
    "subject": "Physics",
    "title": "Electrostatics Complete Concept Revision — Full Chapter High-Yield One-Shot",
    "youtubeId": "z1gy8O-9a-0",
    "channelName": "Ashu Ghai 11th & 12th",
    "duration": "6h 45m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Electrostatics Complete Concept Revision (Physics). Taught by Ashu Ghai 11th & 12th."
},
  "mathematics:quadratic equations masterclass": {
    "id": "vid-alias-quadratic equations",
    "chapter": "Quadratic Equations Masterclass",
    "subject": "Mathematics",
    "title": "Quadratic Equations Masterclass — Full Chapter High-Yield One-Shot",
    "youtubeId": "NPFLB0Xs8Kw",
    "channelName": "JEE Wallah",
    "duration": "1h 36m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Quadratic Equations Masterclass (Mathematics). Taught by JEE Wallah."
},
  "quadratic equations masterclass": {
    "id": "vid-alias-quadratic equations",
    "chapter": "Quadratic Equations Masterclass",
    "subject": "Mathematics",
    "title": "Quadratic Equations Masterclass — Full Chapter High-Yield One-Shot",
    "youtubeId": "NPFLB0Xs8Kw",
    "channelName": "JEE Wallah",
    "duration": "1h 36m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Quadratic Equations Masterclass (Mathematics). Taught by JEE Wallah."
},
  "mathematics:complex numbers complete revision": {
    "id": "vid-alias-complex numbers",
    "chapter": "Complex Numbers Complete Revision",
    "subject": "Mathematics",
    "title": "Complex Numbers Complete Revision — Full Chapter High-Yield One-Shot",
    "youtubeId": "YCTr5PWLZKg",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 1m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Complex Numbers Complete Revision (Mathematics). Taught by Next Toppers - 11th Science."
},
  "complex numbers complete revision": {
    "id": "vid-alias-complex numbers",
    "chapter": "Complex Numbers Complete Revision",
    "subject": "Mathematics",
    "title": "Complex Numbers Complete Revision — Full Chapter High-Yield One-Shot",
    "youtubeId": "YCTr5PWLZKg",
    "channelName": "Next Toppers - 11th Science",
    "duration": "2h 1m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Complex Numbers Complete Revision (Mathematics). Taught by Next Toppers - 11th Science."
},
  "mathematics:definite integration & properties one-shot": {
    "id": "vid-alias-definite integration",
    "chapter": "Definite Integration & Properties One-Shot",
    "subject": "Mathematics",
    "title": "Definite Integration & Properties One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "uRkO7bmDXhU",
    "channelName": "JEE Wallah",
    "duration": "52m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Definite Integration & Properties One-Shot (Mathematics). Taught by JEE Wallah."
},
  "definite integration & properties one-shot": {
    "id": "vid-alias-definite integration",
    "chapter": "Definite Integration & Properties One-Shot",
    "subject": "Mathematics",
    "title": "Definite Integration & Properties One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "uRkO7bmDXhU",
    "channelName": "JEE Wallah",
    "duration": "52m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Definite Integration & Properties One-Shot (Mathematics). Taught by JEE Wallah."
},
  "mathematics:definite integration properties one shot": {
    "id": "vid-alias-definite integration",
    "chapter": "Definite Integration & Properties One-Shot",
    "subject": "Mathematics",
    "title": "Definite Integration & Properties One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "uRkO7bmDXhU",
    "channelName": "JEE Wallah",
    "duration": "52m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Definite Integration & Properties One-Shot (Mathematics). Taught by JEE Wallah."
},
  "definite integration properties one shot": {
    "id": "vid-alias-definite integration",
    "chapter": "Definite Integration & Properties One-Shot",
    "subject": "Mathematics",
    "title": "Definite Integration & Properties One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "uRkO7bmDXhU",
    "channelName": "JEE Wallah",
    "duration": "52m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Definite Integration & Properties One-Shot (Mathematics). Taught by JEE Wallah."
},
  "biology:cell biology & organelles one-shot": {
    "id": "vid-alias-cell",
    "chapter": "Cell Biology & Organelles One-Shot",
    "subject": "Biology",
    "title": "Cell Biology & Organelles One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "6rpCt0IKMzo",
    "channelName": "PW Class 11 Science",
    "duration": "5h 21m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Cell Biology & Organelles One-Shot (Biology). Taught by PW Class 11 Science."
},
  "cell biology & organelles one-shot": {
    "id": "vid-alias-cell",
    "chapter": "Cell Biology & Organelles One-Shot",
    "subject": "Biology",
    "title": "Cell Biology & Organelles One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "6rpCt0IKMzo",
    "channelName": "PW Class 11 Science",
    "duration": "5h 21m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Cell Biology & Organelles One-Shot (Biology). Taught by PW Class 11 Science."
},
  "biology:cell biology organelles one shot": {
    "id": "vid-alias-cell",
    "chapter": "Cell Biology & Organelles One-Shot",
    "subject": "Biology",
    "title": "Cell Biology & Organelles One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "6rpCt0IKMzo",
    "channelName": "PW Class 11 Science",
    "duration": "5h 21m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Cell Biology & Organelles One-Shot (Biology). Taught by PW Class 11 Science."
},
  "cell biology organelles one shot": {
    "id": "vid-alias-cell",
    "chapter": "Cell Biology & Organelles One-Shot",
    "subject": "Biology",
    "title": "Cell Biology & Organelles One-Shot — Full Chapter High-Yield One-Shot",
    "youtubeId": "6rpCt0IKMzo",
    "channelName": "PW Class 11 Science",
    "duration": "5h 21m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Cell Biology & Organelles One-Shot (Biology). Taught by PW Class 11 Science."
},
  "biology:genetics & inheritance complete ncert decode": {
    "id": "vid-alias-genetics",
    "chapter": "Genetics & Inheritance Complete NCERT Decode",
    "subject": "Biology",
    "title": "Genetics & Inheritance Complete NCERT Decode — Full Chapter High-Yield One-Shot",
    "youtubeId": "DKj3YfMKqy4",
    "channelName": "Simpli5yre",
    "duration": "37m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Genetics & Inheritance Complete NCERT Decode (Biology). Taught by Simpli5yre."
},
  "genetics & inheritance complete ncert decode": {
    "id": "vid-alias-genetics",
    "chapter": "Genetics & Inheritance Complete NCERT Decode",
    "subject": "Biology",
    "title": "Genetics & Inheritance Complete NCERT Decode — Full Chapter High-Yield One-Shot",
    "youtubeId": "DKj3YfMKqy4",
    "channelName": "Simpli5yre",
    "duration": "37m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Genetics & Inheritance Complete NCERT Decode (Biology). Taught by Simpli5yre."
},
  "biology:genetics inheritance complete ncert decode": {
    "id": "vid-alias-genetics",
    "chapter": "Genetics & Inheritance Complete NCERT Decode",
    "subject": "Biology",
    "title": "Genetics & Inheritance Complete NCERT Decode — Full Chapter High-Yield One-Shot",
    "youtubeId": "DKj3YfMKqy4",
    "channelName": "Simpli5yre",
    "duration": "37m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Genetics & Inheritance Complete NCERT Decode (Biology). Taught by Simpli5yre."
},
  "genetics inheritance complete ncert decode": {
    "id": "vid-alias-genetics",
    "chapter": "Genetics & Inheritance Complete NCERT Decode",
    "subject": "Biology",
    "title": "Genetics & Inheritance Complete NCERT Decode — Full Chapter High-Yield One-Shot",
    "youtubeId": "DKj3YfMKqy4",
    "channelName": "Simpli5yre",
    "duration": "37m",
    "description": "Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for Genetics & Inheritance Complete NCERT Decode (Biology). Taught by Simpli5yre."
},
};

// Default fallbacks for each subject
export const DEFAULT_SUBJECT_VIDEOS: Record<string, { youtubeId: string; channelName: string; duration: string }> = {
  Physics: {
    youtubeId: "tx76BJIqOd4",
    channelName: "Prashant Kirad 11th & 12th",
    duration: "1h 54m",
  },
  Chemistry: {
    youtubeId: "V7IhNvWMO0A",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 30m",
  },
  Mathematics: {
    youtubeId: "nQMOsm2WIYA",
    channelName: "JEE Nexus by Unacademy",
    duration: "3h 38m",
  },
  Biology: {
    youtubeId: "3WbIqrPEKIc",
    channelName: "Sankalp NEET Vedantu",
    duration: "1h 49m",
  },
};

function normalizeString(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, " ").trim().replace(/\s+/g, " ");
}

export function getVideoForChapter(subjectName: string, chapterName: string): VideoResource {
  if (!chapterName) {
    const defaultSubject = DEFAULT_SUBJECT_VIDEOS[subjectName] || DEFAULT_SUBJECT_VIDEOS["Physics"];
    return {
      id: "vid-" + (subjectName || "subject").toLowerCase() + "-overview",
      chapter: chapterName || subjectName,
      subject: subjectName,
      title: (subjectName || "Subject") + " — Complete High-Yield Concept Revision",
      youtubeId: defaultSubject.youtubeId,
      channelName: defaultSubject.channelName,
      duration: defaultSubject.duration,
      description: "Comprehensive NCERT theory and problem-solving one shot."
    };
  }

  const subLower = (subjectName || "").toLowerCase().trim();
  const chapLower = chapterName.toLowerCase().trim();
  const normKey = normalizeString(chapterName);

  // 1. Exact Subject + Chapter match
  const specificKey = subLower + ":" + chapLower;
  if (CURATED_CHAPTER_VIDEOS[specificKey]) {
    return CURATED_CHAPTER_VIDEOS[specificKey];
  }

  // 2. Exact Chapter match
  if (CURATED_CHAPTER_VIDEOS[chapLower]) {
    return CURATED_CHAPTER_VIDEOS[chapLower];
  }

  // 3. Normalized string match
  const cleanSpecificKey = subLower + ":" + normKey;
  if (CURATED_CHAPTER_VIDEOS[cleanSpecificKey]) {
    return CURATED_CHAPTER_VIDEOS[cleanSpecificKey];
  }
  if (CURATED_CHAPTER_VIDEOS[normKey]) {
    return CURATED_CHAPTER_VIDEOS[normKey];
  }

  // 4. Partial match strictly matching requested subject
  for (const [key, resource] of Object.entries(CURATED_CHAPTER_VIDEOS)) {
    if (resource.subject && resource.subject.toLowerCase() !== subLower) {
      continue;
    }
    const cleanKeyIter = normalizeString(key.includes(":") ? key.split(":")[1] : key);
    if (normKey.includes(cleanKeyIter) || cleanKeyIter.includes(normKey)) {
      return {
        ...resource,
        chapter: chapterName,
        title: chapterName + " — High-Yield One-Shot Revision"
      };
    }
  }

  // 5. Fallback
  const defaultSubject = DEFAULT_SUBJECT_VIDEOS[subjectName] || DEFAULT_SUBJECT_VIDEOS["Physics"];
  return {
    id: "vid-fallback-" + normKey.slice(0, 15).replace(/\s+/g, "-"),
    chapter: chapterName,
    subject: subjectName,
    title: chapterName + " — High-Yield Concept Revision",
    youtubeId: defaultSubject.youtubeId,
    channelName: defaultSubject.channelName,
    duration: defaultSubject.duration,
    description: "Curated comprehensive one-shot theory, derivations, and exam shortcuts for " + chapterName + "."
  };
}

export function getChapterVideo(chapterName: string, subjectName: string = 'Physics'): VideoResource {
  return getVideoForChapter(subjectName, chapterName);
}

export const CHAPTER_CLASS_MAP: Record<string, "11" | "12"> = {
  // Class 11 Physics
  "units and measurements": "11",
  "motion in a straight line": "11",
  "motion in a plane": "11",
  "laws of motion": "11",
  "work, energy and power": "11",
  "system of particles and rotational motion": "11",
  "gravitation": "11",
  "mechanical properties of solids": "11",
  "mechanical properties of fluids": "11",
  "thermal properties of matter": "11",
  "thermodynamics": "11",
  "kinetic theory of gases": "11",
  "oscillations": "11",
  "waves": "11",

  // Class 12 Physics
  "electric charges and fields": "12",
  "electrostatic potential and capacitance": "12",
  "current electricity": "12",
  "moving charges and magnetism": "12",
  "magnetism and matter": "12",
  "electromagnetic induction": "12",
  "alternating current": "12",
  "electromagnetic waves": "12",
  "ray optics and optical instruments": "12",
  "wave optics": "12",
  "dual nature of radiation and matter": "12",
  "atoms": "12",
  "nuclei": "12",
  "semiconductor electronics: materials, devices and simple circuits": "12",

  // Class 11 Chemistry
  "some basic concepts of chemistry": "11",
  "structure of atom": "11",
  "classification of elements and periodicity in properties": "11",
  "chemical bonding and molecular structure": "11",
  "states of matter: gases and liquids": "11",
  "chemical thermodynamics": "11",
  "equilibrium": "11",
  "redox reactions": "11",
  "hydrogen & its compounds": "11",
  "s-block elements (alkali & alkaline earth metals)": "11",
  "p-block elements (group 13 & 14)": "11",
  "organic chemistry: some basic principles and techniques": "11",
  "hydrocarbons (alkanes, alkenes, alkynes)": "11",
  "environmental chemistry": "11",

  // Class 12 Chemistry
  "solid state": "12",
  "solutions": "12",
  "electrochemistry": "12",
  "chemical kinetics": "12",
  "surface chemistry": "12",
  "general principles and processes of isolation of elements": "12",
  "p-block elements (group 15, 16, 17 & 18)": "12",
  "d- and f-block elements": "12",
  "coordination compounds": "12",
  "haloalkanes and haloarenes": "12",
  "alcohols, phenols and ethers": "12",
  "aldehydes, ketones and carboxylic acids": "12",
  "amines": "12",
  "biomolecules": "12",
  "polymers": "12",
  "chemistry in everyday life": "12",
  "principles related to practical chemistry": "12",

  // Class 11 Biology
  "the living world": "11",
  "biological classification": "11",
  "plant kingdom": "11",
  "animal kingdom": "11",
  "morphology of flowering plants": "11",
  "anatomy of flowering plants": "11",
  "structural organisation in animals": "11",
  "cell: the unit of life": "11",
  "biomolecules (biology)": "11",
  "cell cycle and cell division": "11",
  "photosynthesis in higher plants": "11",
  "respiration in plants": "11",
  "plant growth and development": "11",
  "breathing and exchange of gases": "11",
  "body fluids and circulation": "11",
  "excretory products and their elimination": "11",
  "locomotion and movement": "11",
  "neural control and coordination": "11",
  "chemical coordination and integration": "11",

  // Class 12 Biology
  "sexual reproduction in flowering plants": "12",
  "human reproduction": "12",
  "reproductive health": "12",
  "principles of inheritance and variation": "12",
  "molecular basis of inheritance": "12",
  "evolution": "12",
  "human health and disease": "12",
  "microbes in human welfare": "12",
  "biotechnology: principles and processes": "12",
  "biotechnology and its applications": "12",
  "organisms and populations": "12",
  "ecosystem": "12",
  "biodiversity and conservation": "12",

  // Class 11 Mathematics
  "sets": "11",
  "relations and functions": "11",
  "trigonometric functions": "11",
  "complex numbers and quadratic equations": "11",
  "linear inequalities": "11",
  "permutations and combinations": "11",
  "binomial theorem": "11",
  "sequences and series": "11",
  "straight lines": "11",
  "conic sections": "11",
  "introduction to three-dimensional geometry": "11",
  "limits and derivatives": "11",
  "statistics": "11",
  "probability": "11",

  // Class 12 Mathematics
  "relations and functions (class 12)": "12",
  "inverse trigonometric functions": "12",
  "matrices": "12",
  "determinants": "12",
  "continuity and differentiability": "12",
  "application of derivatives": "12",
  "integrals": "12",
  "application of integrals": "12",
  "differential equations": "12",
  "vector algebra": "12",
  "three dimensional geometry": "12",
  "linear programming": "12",
  "probability (class 12)": "12"
};

export function getTargetExamsForSubject(subject: string): ("JEE" | "NEET" | "CBSE")[] {
  if (subject === "Physics" || subject === "Chemistry") {
    return ["JEE", "NEET", "CBSE"];
  }
  if (subject === "Biology") {
    return ["NEET", "CBSE"];
  }
  if (subject === "Mathematics") {
    return ["JEE", "CBSE"];
  }
  return ["JEE", "NEET", "CBSE"];
}

export const TOPIC_VIDEOS: VideoResource[] = COMPREHENSIVE_TOPIC_VIDEOS;

/**
 * Retrieves or dynamically resolves a dedicated video resource for a specific topic within a chapter.
 */
export function getVideoForTopic(
  chapterName: string,
  topicName: string,
  subjectName: string = 'Physics'
): VideoResource {
  const normChap = normalizeString(chapterName);
  const normTop = normalizeString(topicName);
  const normSub = normalizeString(subjectName);

  // 1. Direct match: Exact or fuzzy match on both chapter and topic
  const directMatch = TOPIC_VIDEOS.find((tv) => {
    const tvChap = normalizeString(tv.chapter);
    const tvTop = normalizeString(tv.topic || '');
    return (
      (tvChap === normChap || tvChap.includes(normChap) || normChap.includes(tvChap)) &&
      (tvTop === normTop || tvTop.includes(normTop) || normTop.includes(tvTop))
    );
  });
  if (directMatch) return directMatch;

  // 2. Chapter match: Any topic video in the same chapter if key topic words match
  const topWords = normTop.split(/[^a-z0-9]+/).filter((w) => w.length >= 4);
  const chapMatch = TOPIC_VIDEOS.find((tv) => {
    const tvChap = normalizeString(tv.chapter);
    const tvTop = normalizeString(tv.topic || '');
    if (!(tvChap === normChap || tvChap.includes(normChap) || normChap.includes(tvChap))) return false;
    return topWords.some((w) => tvTop.includes(w));
  });
  if (chapMatch) return chapMatch;

  // 3. Subject-wide topic match: Find matching topic anywhere across the same subject
  const subjectTopicMatch = TOPIC_VIDEOS.find((tv) => {
    if (normalizeString(tv.subject) !== normSub) return false;
    const tvTop = normalizeString(tv.topic || '');
    return tvTop === normTop || tvTop.includes(normTop) || normTop.includes(tvTop);
  });
  if (subjectTopicMatch) return subjectTopicMatch;

  // 4. Keyword match across the same subject
  if (topWords.length > 0) {
    const keywordMatch = TOPIC_VIDEOS.find((tv) => {
      if (normalizeString(tv.subject) !== normSub) return false;
      const tvTop = normalizeString(tv.topic || '');
      return topWords.some((w) => tvTop.includes(w));
    });
    if (keywordMatch) return keywordMatch;
  }

  // 5. Match any topic video from the same chapter (distinct from whole chapter one-shot)
  const sameChapterTopic = TOPIC_VIDEOS.find((tv) => {
    const tvChap = normalizeString(tv.chapter);
    return tvChap === normChap || tvChap.includes(normChap) || normChap.includes(tvChap);
  });
  if (sameChapterTopic) {
    const cleanId = `top-${(subjectName || 'gen').toLowerCase()}-${normChap.slice(0, 15)}-${normTop.slice(0, 15)}`.replace(/\s+/g, '-');
    return {
      ...sameChapterTopic,
      id: cleanId,
      topic: topicName,
      title: `${topicName} — Focused Concept Lecture (${sameChapterTopic.channelName})`
    };
  }

  // 6. Ultimate fallback if completely unmatched: Return parent video with topic tag and 45m duration
  const parentVid = getChapterVideo(chapterName, subjectName);
  const cleanId = `top-${(subjectName || 'gen').toLowerCase()}-${normChap.slice(0, 15)}-${normTop.slice(0, 15)}`.replace(/\s+/g, '-');
  return {
    id: cleanId,
    chapter: chapterName,
    topic: topicName,
    subject: subjectName,
    title: `${topicName} — Core Concept Mastery`,
    youtubeId: parentVid.youtubeId,
    channelName: parentVid.channelName,
    duration: '45m',
    description: `Targeted concept drill and high-yield derivations for "${topicName}" in ${chapterName} by ${parentVid.channelName}.`,
    classLevel: parentVid.classLevel || (CHAPTER_CLASS_MAP[chapterName.toLowerCase().trim()] || '11'),
    targetExams: parentVid.targetExams || getTargetExamsForSubject(subjectName),
    isTopicWise: true
  };
}

export function getAllCuratedVideos(): VideoResource[] {
  const map = new Map<string, VideoResource>();

  // 1. Add all Curated Chapter One-Shots enriched with classLevel & targetExams
  for (const v of Object.values(CURATED_CHAPTER_VIDEOS)) {
    if (!map.has(v.id)) {
      const cleanChap = v.chapter.toLowerCase().trim();
      const mappedClass = CHAPTER_CLASS_MAP[cleanChap] || "11";
      const mappedExams = getTargetExamsForSubject(v.subject);

      map.set(v.id, {
        ...v,
        classLevel: mappedClass,
        targetExams: mappedExams,
        isTopicWise: false
      });
    }
  }

  // 2. Add all curated Topic-Wise Videos
  for (const tv of TOPIC_VIDEOS) {
    if (!map.has(tv.id)) {
      map.set(tv.id, tv);
    }
  }

  // 3. Populate topic-wise videos for all syllabus topics from comprehensiveFormulaNotes
  // so EVERY topic has a real, working, playable YouTube lecture attached!
  for (const note of comprehensiveFormulaNotes) {
    if (!note.topic || !note.chapter) continue;
    const synthVid = getVideoForTopic(note.chapter, note.topic, note.subject);
    if (!map.has(synthVid.id)) {
      map.set(synthVid.id, synthVid);
    }
  }

  return Array.from(map.values());
}

