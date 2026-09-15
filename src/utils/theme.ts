export type ThemeKey = 'black' | 'blue' | 'emerald' | 'sunset' | 'ocean' | 'indigo' | 'violet';

export interface ThemeOption {
  key: ThemeKey;
  name: string;
  subtitle: string;
  primaryColor: string;
  previewGradient: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    key: 'black',
    name: 'Obsidian Black',
    subtitle: 'Ultra-Sleek OLED Black & Neon (Default)',
    primaryColor: '#090a0f',
    previewGradient: 'from-zinc-900 to-black',
  },
  {
    key: 'blue',
    name: 'Royal Sapphire',
    subtitle: 'Modern Electric Blue & Trust',
    primaryColor: '#2563eb',
    previewGradient: 'from-blue-600 to-cyan-600',
  },
  {
    key: 'emerald',
    name: 'Emerald Mint',
    subtitle: 'High Calm & Medical/NEET',
    primaryColor: '#059669',
    previewGradient: 'from-emerald-600 to-teal-600',
  },
  {
    key: 'ocean',
    name: 'Oceanic Cyan',
    subtitle: 'Deep Marine & Sky',
    primaryColor: '#0284c7',
    previewGradient: 'from-sky-500 to-cyan-600',
  },
  {
    key: 'sunset',
    name: 'Sunset Crimson',
    subtitle: 'Urgency & High Energy',
    primaryColor: '#e11d48',
    previewGradient: 'from-rose-600 to-amber-600',
  },
  {
    key: 'indigo',
    name: 'Tech Indigo',
    subtitle: 'Deep Tech & Linear style',
    primaryColor: '#4f46e5',
    previewGradient: 'from-indigo-600 to-blue-600',
  },
  {
    key: 'violet',
    name: 'Cyber Violet',
    subtitle: 'Classic Purple Prepora',
    primaryColor: '#7c3aed',
    previewGradient: 'from-purple-600 to-fuchsia-600',
  },
];

const VERSION_KEY = 'prepora_theme_version';
const STORAGE_KEY = 'prepora_color_theme';

export function getSavedTheme(): ThemeKey {
  try {
    const v = localStorage.getItem(VERSION_KEY);
    if (v !== '3.0_black') {
      localStorage.setItem(VERSION_KEY, '3.0_black');
      localStorage.setItem(STORAGE_KEY, 'black');
      return 'black';
    }
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeKey;
    if (saved && THEME_OPTIONS.some(t => t.key === saved)) {
      return saved;
    }
  } catch (e) {
    // fallback
  }
  return 'black';
}

export function applyTheme(themeKey: ThemeKey) {
  try {
    localStorage.setItem(STORAGE_KEY, themeKey);
    document.documentElement.setAttribute('data-theme', themeKey);
    window.dispatchEvent(new CustomEvent('prepora-theme-change', { detail: themeKey }));
  } catch (e) {
    // fallback
  }
}

// Auto-initialize theme on import
if (typeof document !== 'undefined') {
  const initial = getSavedTheme();
  document.documentElement.setAttribute('data-theme', initial);
}
