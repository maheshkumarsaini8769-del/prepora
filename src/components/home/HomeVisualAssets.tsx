import React from 'react';

export interface HeroStudentIllustrationProps {
  examLabel?: string;
  year?: number | string;
  isDark?: boolean;
}

/**
 * Authentic Prepora Student Mascot Illustration
 * Uses the exact digital artwork extracted from the reference design mockup:
 * - Light Mode: Student studying with laptop, books & emerald aura
 * - Dark Mode: Student in obsidian room with neon teal aura & laptop
 */
export const HeroStudentIllustration: React.FC<HeroStudentIllustrationProps> = ({
  examLabel = 'JEE',
  year = 2026,
  isDark = false,
}) => {
  const isCustomExam = examLabel && examLabel !== 'JEE';

  return (
    <div className="relative select-none flex items-center justify-end shrink-0">
      {/* Real High-Resolution Mascot Artwork */}
      <img
        src={isDark ? '/assets/home/hero_student_dark.png' : '/assets/home/hero_student_light.png'}
        alt="Prepora Student Mascot"
        className="w-32 sm:w-40 md:w-44 h-auto object-contain drop-shadow-md select-none pointer-events-none transition-opacity duration-300"
        loading="eager"
      />

      {/* Dynamic Target Exam badge overlay if student is preparing for NEET/CBSE/RBSE instead of JEE */}
      {isCustomExam && (
        <div
          className="absolute top-2 left-1 rotate-[-12deg] bg-emerald-600/95 dark:bg-emerald-500/95 text-white font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-md shadow-md backdrop-blur-xs select-none pointer-events-none tracking-tight animate-in fade-in zoom-in-95 duration-200"
        >
          {examLabel} {year}
        </div>
      )}
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
