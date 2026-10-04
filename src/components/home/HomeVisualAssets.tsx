import React from 'react';

/**
 * High-definition Vector Art of the Prepora Student Mascot
 * Matches the anime-stylized student boy studying with laptop & books from the reference UI.
 */
export const HeroStudentIllustration: React.FC<{ examLabel?: string; year?: number | string }> = ({
  examLabel = 'JEE',
  year = 2026,
}) => {
  return (
    <div className="relative w-full max-w-[210px] sm:max-w-[240px] aspect-[1.15/1] select-none flex items-center justify-center">
      <svg
        viewBox="0 0 240 210"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Background Aura Radial Gradient */}
          <radialGradient id="auraGlowLight" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#d1fae5" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ecfdf5" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="auraGlowDark" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#064e3b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
          </radialGradient>

          {/* Hoodie Emerald Gradient */}
          <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="45%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Laptop Slate Gradient */}
          <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Hair Soft Highlight */}
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d3748" />
            <stop offset="60%" stopColor="#1a202c" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>

          {/* Skin Tone */}
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>

          {/* Desk Highlight */}
          <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* 1. Atmospheric Aura Halo */}
        <ellipse
          cx="135"
          cy="95"
          rx="80"
          ry="75"
          className="fill-[url(#auraGlowLight)] dark:fill-[url(#auraGlowDark)] transition-colors duration-300"
        />

        {/* Ambient Floating Particles */}
        <circle cx="55" cy="50" r="2.5" className="fill-emerald-400 opacity-60" />
        <circle cx="215" cy="40" r="2" className="fill-emerald-300 opacity-50" />
        <circle cx="200" cy="110" r="1.5" className="fill-teal-300 opacity-70" />
        <circle cx="45" cy="120" r="2" className="fill-emerald-400 opacity-50" />

        {/* 2. Angled Exam Badge: "JEE 2026" */}
        <g transform="translate(42, 38) rotate(-14)">
          <text
            x="0"
            y="0"
            className="fill-emerald-600 dark:fill-emerald-400 font-black tracking-tight"
            style={{ fontSize: '17px', fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {examLabel}
          </text>
          <text
            x="0"
            y="17"
            className="fill-emerald-500 dark:fill-emerald-300 font-extrabold tracking-wide"
            style={{ fontSize: '15px', fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {year}
          </text>
        </g>

        {/* 3. Desk Base Line */}
        <path
          d="M 15 195 L 225 195"
          stroke="url(#deskGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 4. Books Stack on Right */}
        <g id="books" transform="translate(180, 160)">
          {/* Bottom Book (Cyan) */}
          <rect x="0" y="22" width="46" height="11" rx="2.5" fill="#0284c7" />
          <path d="M 0 25 L 46 25" stroke="#38bdf8" strokeWidth="1" />
          <rect x="2" y="23" width="6" height="9" fill="#f8fafc" />

          {/* Middle Book (Emerald) */}
          <rect x="4" y="11" width="42" height="10" rx="2.5" fill="#059669" />
          <path d="M 4 14 L 46 14" stroke="#34d399" strokeWidth="1" />
          <rect x="6" y="12" width="5" height="8" fill="#f8fafc" />

          {/* Top Book (Amber/Coral) */}
          <rect x="7" y="1" width="38" height="9" rx="2" fill="#d97706" />
          <path d="M 7 4 L 45 4" stroke="#fbbf24" strokeWidth="0.8" />
        </g>

        {/* 5. Student Character */}
        {/* Torso & Green Hoodie */}
        <g id="student-body">
          {/* Main hoodie body */}
          <path
            d="M 98 140 C 90 148, 76 172, 70 195 L 180 195 C 174 172, 160 148, 152 140 Z"
            fill="url(#hoodieGrad)"
          />
          {/* Hoodie shadows and folds */}
          <path
            d="M 105 155 C 118 165, 132 165, 145 155"
            stroke="#047857"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* White 'P' logo on hoodie chest */}
          <rect x="148" y="152" width="12" height="12" rx="3" fill="#ffffff" opacity="0.9" />
          <text
            x="151.5"
            y="161.5"
            fill="#059669"
            fontSize="9"
            fontWeight="900"
            fontFamily="system-ui"
          >
            P
          </text>

          {/* Neck */}
          <path d="M 116 122 L 134 122 L 131 138 L 119 138 Z" fill="url(#skinGrad)" />

          {/* Head & Face */}
          <path
            d="M 108 92 C 108 72, 142 72, 142 92 C 142 114, 136 126, 125 126 C 114 126, 108 114, 108 92 Z"
            fill="url(#skinGrad)"
          />

          {/* Ears */}
          <ellipse cx="106" cy="94" rx="4" ry="6" fill="#fcd34d" />
          <ellipse cx="144" cy="94" rx="4" ry="6" fill="#fcd34d" />

          {/* Cute Anime Face Features */}
          {/* Eyes */}
          <ellipse cx="118" cy="93" rx="3.5" ry="4.5" fill="#1e293b" />
          <circle cx="119" cy="91.5" r="1.3" fill="#ffffff" />
          <ellipse cx="132" cy="93" rx="3.5" ry="4.5" fill="#1e293b" />
          <circle cx="133" cy="91.5" r="1.3" fill="#ffffff" />

          {/* Eyebrows */}
          <path d="M 115 86 C 118 84, 122 85, 123 87" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M 127 87 C 128 85, 132 84, 135 86" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Cheerful Smile */}
          <path
            d="M 121 104 C 123 108, 127 108, 129 104"
            stroke="#ea580c"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cheeks blush */}
          <circle cx="114" cy="100" r="3" fill="#fb7185" opacity="0.45" />
          <circle cx="136" cy="100" r="3" fill="#fb7185" opacity="0.45" />

          {/* Stylish Wavy Jet-Black Hair with Soft Highlights */}
          <path
            d="M 103 86 C 100 68, 114 55, 125 55 C 138 55, 150 66, 147 84 C 144 80, 140 76, 136 78 C 130 70, 122 72, 117 77 C 112 73, 107 77, 103 86 Z"
            fill="url(#hairGrad)"
          />
          {/* Hair front strands / bangs */}
          <path
            d="M 107 80 C 111 84, 113 88, 113 90 C 116 86, 120 86, 122 88 C 126 84, 130 85, 134 89 C 136 84, 142 84, 145 88"
            fill="url(#hairGrad)"
          />
        </g>

        {/* 6. Laptop on Desk (Tilted forward with Prepora Logo on Lid) */}
        <g id="laptop" transform="translate(62, 148)">
          {/* Screen Lid Back */}
          <polygon
            points="14,0 78,0 84,40 8,40"
            fill="url(#laptopGrad)"
            stroke="#475569"
            strokeWidth="1.2"
          />
          {/* White 'P' icon on laptop lid */}
          <rect x="42" y="14" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.95" />
          <text
            x="45"
            y="22"
            fill="#0f172a"
            fontSize="7.5"
            fontWeight="900"
            fontFamily="system-ui"
          >
            P
          </text>
          {/* Soft screen glow under chin */}
          <polygon
            points="18,3 74,3 80,38 12,38"
            fill="#38bdf8"
            opacity="0.12"
          />

          {/* Keyboard base */}
          <polygon
            points="6,40 86,40 92,48 0,48"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1"
          />
          {/* Trackpad */}
          <rect x="38" y="42" width="16" height="4" rx="1" fill="#475569" />
        </g>

        {/* Student hands on keyboard */}
        <g id="student-hands">
          <ellipse cx="76" cy="190" rx="9" ry="5.5" fill="url(#skinGrad)" />
          <ellipse cx="132" cy="190" rx="9" ry="5.5" fill="url(#skinGrad)" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Panoramic Motivational Mountain Landscape Banner
 * Features dawn mountain silhouettes and hiker looking over the horizon.
 */
export const ScenicMountainBanner: React.FC<{
  onActionClick?: () => void;
  isDark?: boolean;
}> = ({ onActionClick, isDark = false }) => {
  return (
    <div
      onClick={onActionClick}
      className="relative w-full rounded-2xl overflow-hidden shadow-md cursor-pointer group transition-all duration-300 hover:shadow-lg active:scale-[0.99]"
      style={{ minHeight: '135px' }}
    >
      {/* Dynamic Background SVG Landscape */}
      <svg
        viewBox="0 0 640 170"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Sunrise / Sunset Gradient */}
          <linearGradient id="skyDawnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="35%" stopColor="#334155" />
            <stop offset="65%" stopColor="#c2410c" />
            <stop offset="85%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Glowing Horizon Sun */}
          <radialGradient id="sunGlow" cx="62%" cy="65%" r="40%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>

          {/* Distant Mountains (Purple-Haze) */}
          <linearGradient id="distantMountGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#581c87" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#9a3412" stopOpacity="0.9" />
          </linearGradient>

          {/* Midground Mountains (Warm Amber Silhouettes) */}
          <linearGradient id="midMountGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7c2d12" />
            <stop offset="100%" stopColor="#431407" />
          </linearGradient>

          {/* Foreground Cliff (Dark Silhouette) */}
          <linearGradient id="foreCliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1c1917" />
            <stop offset="100%" stopColor="#0c0a09" />
          </linearGradient>
        </defs>

        {/* 1. Sky */}
        <rect width="640" height="170" fill="url(#skyDawnGrad)" />

        {/* 2. Sun Atmosphere Glow */}
        <circle cx="410" cy="98" r="95" fill="url(#sunGlow)" />
        <circle cx="410" cy="98" r="18" fill="#fffbeb" opacity="0.9" />

        {/* 3. Distant Layer 1 Mountains */}
        <path
          d="M 0 115 L 75 88 L 140 102 L 230 75 L 320 105 L 410 70 L 485 95 L 560 68 L 640 100 L 640 170 L 0 170 Z"
          fill="url(#distantMountGrad)"
        />

        {/* 4. Midground Layer 2 Mountains */}
        <path
          d="M 0 135 L 60 118 L 125 128 L 210 105 L 290 125 L 380 92 L 470 120 L 545 98 L 640 122 L 640 170 L 0 170 Z"
          fill="url(#midMountGrad)"
        />

        {/* Clouds / Warm Atmospheric Mist */}
        <path
          d="M 120 125 Q 240 115 360 128 Q 480 120 600 126 L 640 130 L 640 145 L 0 145 Z"
          fill="#fed7aa"
          opacity="0.22"
        />

        {/* 5. Foreground Crag / Rocky Peak (Right Side) */}
        <path
          d="M 310 170 L 370 148 L 430 136 L 475 142 L 530 125 L 580 138 L 640 132 L 640 170 Z"
          fill="url(#foreCliffGrad)"
        />

        {/* 6. Hiker / Student on Peak (Gazing at Sunrise) */}
        <g id="hiker" transform="translate(524, 94)">
          {/* Head & Hat */}
          <circle cx="10" cy="4" r="3.2" fill="#09090b" />
          {/* Body / Backpack */}
          <path
            d="M 7 7 L 14 7 L 15 18 L 8 18 Z"
            fill="#09090b"
          />
          {/* Backpack bump */}
          <ellipse cx="5" cy="12" rx="3" ry="4" fill="#09090b" />
          {/* Sitting Legs */}
          <path
            d="M 8 18 L 5 28 L 16 28 L 15 22 Z"
            fill="#09090b"
          />
        </g>
      </svg>

      {/* Dark Vignette / Contrast Overlay on Left for Flawless Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent z-10" />

      {/* Content Container (Matches Text from Reference Screenshot) */}
      <div className="relative z-20 h-full p-4 sm:p-5 flex items-center justify-between min-h-[135px]">
        <div className="max-w-[70%] sm:max-w-md text-white select-none">
          {/* Typography that dynamically matches Dark / Light modes from screenshot */}
          <div className="leading-tight">
            {isDark ? (
              <>
                <span className="text-sm sm:text-base font-bold tracking-tight text-white block">
                  Discipline
                </span>
                <span className="text-lg sm:text-2xl font-black text-emerald-400 tracking-tight block">
                  Creates Freedom
                </span>
              </>
            ) : (
              <>
                <span
                  className="text-base sm:text-lg font-bold text-amber-200 tracking-wide block"
                  style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
                >
                  Small Steps
                </span>
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight block -mt-0.5">
                  Big Results
                </span>
              </>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-slate-200/90 font-medium mt-1.5 leading-snug">
            Do a little more today than yesterday.
          </p>
        </div>

        {/* Circular Frosted Arrow Button '>' on Far Right */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-white/30 transition-all shrink-0">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
