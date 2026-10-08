import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, ChevronDown } from 'lucide-react';
import { THEME_OPTIONS, ThemeKey, getSavedTheme, applyTheme } from '../../utils/theme';

interface ThemeSelectorProps {
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ compact = false }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(getSavedTheme());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeKey>;
      if (customEvent.detail) {
        setCurrentTheme(customEvent.detail);
      }
    };
    window.addEventListener('prepora-theme-change', handleThemeChange);
    return () => {
      window.removeEventListener('prepora-theme-change', handleThemeChange);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeOption = THEME_OPTIONS.find(t => t.key === currentTheme) || THEME_OPTIONS[0];

  const handleSelectTheme = (key: ThemeKey) => {
    applyTheme(key);
    setCurrentTheme(key);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Theme Color"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all shadow-2xs ${
          compact ? 'px-2 py-1 text-[11px]' : ''
        }`}
      >
        <span
          className="w-3.5 h-3.5 rounded-full shadow-2xs shrink-0 ring-1 ring-black/10"
          style={{ backgroundColor: activeOption.primaryColor }}
        />
        <Palette className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        {!compact && (
          <span className="hidden sm:inline font-bold text-slate-800 dark:text-slate-100">
            {activeOption.name}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 dark:bg-[#0c131a]/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-purple-900/10 z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Website Color Theme
            </span>
            <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-full">
              Live Preview
            </span>
          </div>

          <div className="space-y-1 pt-1">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = currentTheme === theme.key;
              return (
                <button
                  key={theme.key}
                  type="button"
                  onClick={() => handleSelectTheme(theme.key)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-900 dark:text-brand-300 font-bold ring-1 ring-brand-500/30'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-5 h-5 rounded-lg shadow-2xs shrink-0 ring-1 ring-black/10 flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <div>
                      <div className="text-xs font-bold leading-tight text-slate-900 dark:text-white">{theme.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{theme.subtitle}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="text-[10px] font-extrabold text-brand-600 dark:text-brand-400">Active</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
