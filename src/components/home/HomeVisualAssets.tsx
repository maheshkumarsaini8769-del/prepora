import React from 'react';

export interface HeroStudentIllustrationProps {
  examLabel?: string;
  classLevel?: string;
  year?: number | string;
  isDark?: boolean;
}

/**
 * Authentic Prepora Student Mascot Illustration
 * Supports 4 customized exam avatars:
 * 1. NEET 2026: Medical student with NCERT Biology, stethoscope, and mint glow
 * 2. Class 11: Foundation student with Class 11 backpack, books, and notebook
 * 3. Class 12: Board & Entrance exam student with desk setup, guidebooks, and laptop
 * 4. JEE Main/Advanced: Classic Prepora mascot with laptop and target badge
 */
export const HeroStudentIllustration: React.FC<HeroStudentIllustrationProps> = ({
  examLabel = 'JEE',
  classLevel = '12',
  year = 2026,
  isDark = false,
}) => {
  const normExam = (examLabel || '').toUpperCase();
  const normClass = (classLevel || '').toString();

  let imageSrc = isDark ? '/assets/home/hero_student_dark.png' : '/assets/home/hero_student_light.png';

  if (normExam.includes('NEET')) {
    imageSrc = isDark ? '/assets/home/hero_student_neet_dark.jpg' : '/assets/home/hero_student_neet.jpg';
  } else if (normClass === '11' || normExam.includes('11')) {
    imageSrc = isDark ? '/assets/home/hero_student_dark.png' : '/assets/home/hero_student_11.jpg';
  } else if (normClass === '12' || normExam.includes('12') || normExam.includes('CBSE') || normExam.includes('RBSE')) {
    imageSrc = isDark ? '/assets/home/hero_student_dark.png' : '/assets/home/hero_student_12.jpg';
  }

  return (
    <div className="relative select-none flex items-center justify-end shrink-0">
      {/* Real High-Resolution Mascot Artwork (Clean: No 'P' on shirt/laptop, exact exam text) */}
      <img
        src={imageSrc}
        alt={`Study Up ${examLabel} Student Mascot`}
        className="w-32 sm:w-40 md:w-48 h-auto object-contain select-none pointer-events-none transition-all duration-300"
        loading="eager"
      />
    </div>
  );
};

/**
 * Panoramic Motivational Mountain Landscape Banner
 * Uses the exact digital artwork extracted from the reference design mockup:
 * - Light Mode: Sunrise mountain vista ("Small Steps Big Results") with student hiker
 * - Dark Mode: Obsidian sunset cliff ("Discipline Creates Freedom") with student sitting on peak
 */
export const ScenicMountainBanner: React.FC<{
  onActionClick?: () => void;
  isDark?: boolean;
}> = ({ onActionClick, isDark = false }) => {
  return (
    <div
      onClick={onActionClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActionClick?.();
        }
      }}
      className="group relative w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 block"
      title="Start practice session"
    >
      <img
        src={isDark ? '/assets/home/scenic_banner_dark.png' : '/assets/home/scenic_banner_light.png'}
        alt={isDark ? 'Discipline Creates Freedom' : 'Small Steps Big Results'}
        className="w-full h-auto block select-none pointer-events-none group-hover:scale-[1.01] transition-transform duration-300"
        loading="eager"
      />
    </div>
  );
};
