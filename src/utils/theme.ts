export type ThemeKey = 'indigo' | 'ocean' | 'emerald' | 'sunset' | 'violet';

export interface ThemeOption {
  key: ThemeKey;
  name: string;
  subtitle: string;
  primaryColor: string;
  previewGradient: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    key: 'indigo',
    name: 'Royal Indigo',
    subtitle: 'Electric Tech & Focus (Modern)',
    primaryColor: '#4f46e5',
    previewGradient: 'from-indigo-600 to-blue-600',
  },
  {
    key: 'ocean',
    name: 'Oceanic Blue',
    subtitle: 'Deep Marine & Sky',
    primaryColor: '#0284c7',
    previewGradient: 'from-sky-500 to-cyan-600',
  },
  {
    key: 'emerald',
    name: 'Emerald Mint',
    subtitle: 'High Calm & Medical/NEET',
    primaryColor: '#059669',
    previewGradient: 'from-emerald-600 to-teal-600',
  },
  {
    key: 'sunset',
    name: 'Sunset Crimson',
    subtitle: 'Urgency & High Energy',
    primaryColor: '#e11d48',
    previewGradient: 'from-rose-600 to-amber-600',
  },
  {
    key: 'violet',
    name: 'Cyber Violet',
    subtitle: 'Classic Signature Prepora',
    primaryColor: '#7c3aed',
    previewGradient: 'from-purple-600 to-fuchsia-600',
  },
];

const STORAGE_KEY = 'prepora_color_theme';

export function getSavedTheme(): ThemeKey {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeKey;
    if (saved && THEME_OPTIONS.some(t => t.key === saved)) {
      return saved;
    }
  } catch (e) {
    // fallback
  }
  return 'indigo';
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
