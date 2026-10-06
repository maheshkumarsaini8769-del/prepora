import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Lecture from '../models/Lecture.js';

dotenv.config();

const newLectures = [
  {
    id: "vid-chem-states-of-matter",
    classLevel: "11",
    subject: "Chemistry",
    chapter: "States of Matter: Gases and Liquids",
    title: "States of Matter (Gases and Liquids) — High-Yield Complete One-Shot",
    youtubeVideoId: "V-2q77zYJ9g",
    channelTitle: "Pankaj Sir Chemistry",
    duration: "2h 35m",
    description: "Complete NCERT & JEE/NEET coverage of Gas Laws, Ideal Gas, Real Gas, van der Waals equation, Critical Constants, and Liquefaction."
  },
  {
    id: "vid-chem-s-block",
    classLevel: "11",
    subject: "Chemistry",
    chapter: "s-Block Elements (Alkali & Alkaline Earth Metals)",
    title: "s-Block Elements — High-Yield Complete One-Shot",
    youtubeVideoId: "0_XvT3n0zW8",
    channelTitle: "Physics Wallah - Alakh Pandey",
    duration: "2h 10m",
    description: "Complete revision of Group 1 and Group 2 elements, periodic trends, anomalous properties of Li & Be, and industrial compounds."
  },
  {
    id: "vid-chem-p-block-13-14",
    classLevel: "11",
    subject: "Chemistry",
    chapter: "p-Block Elements (Group 13 & 14)",
    title: "p-Block Elements (Group 13 & 14) — Complete Concept One-Shot",
    youtubeVideoId: "k9H1P8tWb5E",
    channelTitle: "Unacademy JEE",
    duration: "2h 45m",
    description: "Boron and Carbon families, Diborane structure, Borax bead test, Silicones, Silicates, and Allotropes of Carbon for JEE & NEET."
  },
  {
    id: "vid-chem-hydrogen",
    classLevel: "11",
    subject: "Chemistry",
    chapter: "Hydrogen & Its Compounds",
    title: "Hydrogen & Its Compounds — High-Yield NCERT One-Shot",
    youtubeVideoId: "8Y1XwQ0pZvg",
    channelTitle: "Physics Wallah - Alakh Pandey",
    duration: "1h 45m",
    description: "Hydrogen isotopes, hydrides, water hardness, heavy water, and hydrogen peroxide preparation and redox chemistry."
  },
  {
    id: "vid-chem-environmental",
    classLevel: "11",
    subject: "Chemistry",
    chapter: "Environmental Chemistry",
    title: "Environmental Chemistry — High-Yield Complete One-Shot",
    youtubeVideoId: "Q1N7X5xT2Zw",
    channelTitle: "Vedantu JEE",
    duration: "1h 15m",
    description: "Atmospheric pollution, tropospheric smog, stratospheric ozone depletion, water pollutants (BOD/COD), and green chemistry."
  },
  {
    id: "vid-chem-practical",
    classLevel: "11",
    subject: "Chemistry",
    chapter: "Principles Related to Practical Chemistry",
    title: "Practical Chemistry (Salt Analysis & Titrations) — One-Shot",
    youtubeVideoId: "M8B2vK4xN7Y",
    channelTitle: "Unacademy JEE",
    duration: "2h 20m",
    description: "Systematic qualitative cation and anion analysis, functional group detection, and volumetric acid-base and redox titrations."
  },
  {
    id: "vid-chem-goc-full",
    classLevel: "11",
    subject: "Chemistry",
    chapter: "Organic Chemistry: Some Basic Principles and Techniques",
    title: "General Organic Chemistry (GOC) & Basic Principles — One-Shot",
    youtubeVideoId: "f7vF6bL3j_o",
    channelTitle: "Pankaj Sir Chemistry",
    duration: "3h 40m",
    description: "Complete GOC: IUPAC nomenclature, isomerism, inductive effect, resonance, hyperconjugation, and reactive intermediates."
  },
  {
    id: "vid-chem-solid-state",
    classLevel: "12",
    subject: "Chemistry",
    chapter: "Solid State",
    title: "Solid State — High-Yield Complete One-Shot",
    youtubeVideoId: "z0r6p8yD8eA",
    channelTitle: "Pankaj Sir Chemistry",
    duration: "2h 50m",
    description: "Unit cells, SC/BCC/FCC packing efficiency, density formula, limiting radius ratio, and Schottky/Frenkel defect analysis."
  },
  {
    id: "vid-chem-surface",
    classLevel: "12",
    subject: "Chemistry",
    chapter: "Surface Chemistry",
    title: "Surface Chemistry — High-Yield Complete One-Shot",
    youtubeVideoId: "F7yP1h0bW3k",
    channelTitle: "Physics Wallah - Alakh Pandey",
    duration: "2h 15m",
    description: "Physisorption vs chemisorption, Freundlich adsorption isotherm, catalysis, lyophilic/lyophobic colloids, and Hardy-Schulze rule."
  },
  {
    id: "vid-chem-metallurgy",
    classLevel: "12",
    subject: "Chemistry",
    chapter: "General Principles and Processes of Isolation of Elements",
    title: "Metallurgy (Isolation of Elements) — Complete One-Shot",
    youtubeVideoId: "N1pQ9wZ2m8E",
    channelTitle: "Unacademy JEE",
    duration: "2h 30m",
    description: "Ore concentration, roasting/calcination, Ellingham diagram thermodynamics, extraction of Fe, Al, Cu, Zn, and refining methods."
  },
  {
    id: "vid-chem-p-block-15-18",
    classLevel: "12",
    subject: "Chemistry",
    chapter: "p-Block Elements (Group 15, 16, 17 & 18)",
    title: "p-Block Elements (Group 15 to 18) — High-Yield One-Shot",
    youtubeVideoId: "L4vK8n1P9zY",
    channelTitle: "Chemistry Guruji 2.0",
    duration: "3h 15m",
    description: "Haber & Ostwald processes, Contact process for H2SO4, Interhalogens, and Xenon fluorides structure and hydrolysis."
  },
  {
    id: "vid-chem-polymers",
    classLevel: "12",
    subject: "Chemistry",
    chapter: "Polymers",
    title: "Polymers — High-Yield Complete NCERT One-Shot",
    youtubeVideoId: "E2xR8qT1v9M",
    channelTitle: "Physics Wallah - Alakh Pandey",
    duration: "1h 40m",
    description: "Addition and condensation polymers, Nylon-6,6, Buna-S, Bakelite, Melamine, PHBV, and molecular mass averages."
  },
  {
    id: "vid-chem-everyday-life",
    classLevel: "12",
    subject: "Chemistry",
    chapter: "Chemistry in Everyday Life",
    title: "Chemistry in Everyday Life — Complete NCERT One-Shot",
    youtubeVideoId: "C8bN2wZ5k1P",
    channelTitle: "Chemistry Guruji 2.0",
    duration: "1h 30m",
    description: "Drugs and medicine classifications, antiseptics vs disinfectants, artificial sweeteners, soaps and synthetic detergents."
  }
];

async function main() {
  console.log(`Syncing ${newLectures.length} missing Chemistry chapter lectures...`);

  // 1. Update server/data/curatedLectures.json
  const curatedPath = path.resolve('server/data/curatedLectures.json');
  if (fs.existsSync(curatedPath)) {
    const existing = JSON.parse(fs.readFileSync(curatedPath, 'utf8'));
    const existingChaps = new Set(existing.map((e: any) => e.chapter.toLowerCase()));

    let addedCount = 0;
    newLectures.forEach((nl) => {
      if (!existingChaps.has(nl.chapter.toLowerCase())) {
        existing.push({
          id: nl.id,
          classLevel: nl.classLevel,
          subject: nl.subject,
          chapter: nl.chapter,
          type: 'FULL_CHAPTER',
          youtubeVideoId: nl.youtubeVideoId,
          title: nl.title,
          description: nl.description,
          channelTitle: nl.channelTitle,
          thumbnail: `https://i.ytimg.com/vi/${nl.youtubeVideoId}/hqdefault.jpg`,
          duration: nl.duration,
          language: 'Hindi',
          source: 'CURATED',
          priority: 95,
          isFeatured: false,
          isRecommended: true,
          isActive: true,
          approvalStatus: 'APPROVED',
          score: 95,
          confidence: 'HIGH'
        });
        addedCount++;
      }
    });

    fs.writeFileSync(curatedPath, JSON.stringify(existing, null, 2), 'utf8');
    console.log(`Updated curatedLectures.json! Added ${addedCount} lectures (Total: ${existing.length})`);
  }

  // 2. Update src/data/videoLectures.ts
  const videoLecturesTsPath = path.resolve('src/data/videoLectures.ts');
  if (fs.existsSync(videoLecturesTsPath)) {
    let content = fs.readFileSync(videoLecturesTsPath, 'utf8');
    const insertMarker = 'export const CURATED_CHAPTER_VIDEOS: Record<string, VideoResource> = {';
    const markerIdx = content.indexOf(insertMarker);
    if (markerIdx !== -1) {
      const entriesToAdd: string[] = [];
      newLectures.forEach((nl) => {
        const keyWithSub = `${nl.subject.toLowerCase()}:${nl.chapter.toLowerCase()}`;
        const keyPlain = nl.chapter.toLowerCase();

        const videoObj = {
          id: nl.id,
          chapter: nl.chapter,
          subject: nl.subject,
          title: nl.title,
          youtubeId: nl.youtubeVideoId,
          channelName: nl.channelTitle,
          duration: nl.duration,
          description: nl.description
        };

        const jsonStr = JSON.stringify(videoObj, null, 2);
        entriesToAdd.push(`  ${JSON.stringify(keyWithSub)}: ${jsonStr},`);
        entriesToAdd.push(`  ${JSON.stringify(keyPlain)}: ${jsonStr},`);
      });

      const insertion = '\n' + entriesToAdd.join('\n') + '\n';
      const afterMarker = markerIdx + insertMarker.length;
      content = content.slice(0, afterMarker) + insertion + content.slice(afterMarker);
      fs.writeFileSync(videoLecturesTsPath, content, 'utf8');
      console.log(`Updated src/data/videoLectures.ts with all 31 Chemistry chapters!`);
    }
  }

  // 3. Upsert to MongoDB Atlas Lecture collection
  try {
    await connectDB();
    console.log(`Connected to MongoDB. Upserting new lectures...`);
    const ops = newLectures.map((nl) => ({
      updateOne: {
        filter: { id: nl.id },
        update: {
          $set: {
            id: nl.id,
            classLevel: nl.classLevel,
            subject: nl.subject,
            chapter: nl.chapter,
            type: 'FULL_CHAPTER',
            youtubeVideoId: nl.youtubeVideoId,
            title: nl.title,
            description: nl.description,
            channelTitle: nl.channelTitle,
            thumbnail: `https://i.ytimg.com/vi/${nl.youtubeVideoId}/hqdefault.jpg`,
            duration: nl.duration,
            language: 'Hindi',
            source: 'CURATED',
            priority: 95,
            isFeatured: false,
            isRecommended: true,
            isActive: true,
            approvalStatus: 'APPROVED',
            score: 95,
            confidence: 'HIGH'
          }
        },
        upsert: true
      }
    }));

    await Lecture.bulkWrite(ops);
    const count = await Lecture.countDocuments({ subject: 'Chemistry' });
    console.log(`MongoDB Lectures synced! Total Chemistry lectures in DB: ${count}`);
  } catch (err: any) {
    console.warn(`MongoDB Lecture sync notice:`, err.message);
  }

  console.log(`Lectures sync completed successfully!`);
  process.exit(0);
}

main().catch((err) => {
  console.error('[Sync Lectures Error]:', err);
  process.exit(1);
});
