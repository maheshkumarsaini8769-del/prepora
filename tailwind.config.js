/** @type {import('tailwindcss').Config} */
const makeColor = (varName) => `rgb(var(${varName}) / <alpha-value>)`;

const themePalette = {
  50: makeColor('--color-brand-50'),
  100: makeColor('--color-brand-100'),
  200: makeColor('--color-brand-200'),
  300: makeColor('--color-brand-300'),
  400: makeColor('--color-brand-400'),
  500: makeColor('--color-brand-500'),
  600: makeColor('--color-brand-600'),
  700: makeColor('--color-brand-700'),
  800: makeColor('--color-brand-800'),
  900: makeColor('--color-brand-900'),
  950: makeColor('--color-brand-950'),
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: themePalette,
        purple: themePalette,
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'gradient-xy': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-pop': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        aurora: {
          'from': {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          'to': {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-delayed': 'float-delayed 5s ease-in-out 1.5s infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite',
        'gradient-shift': 'gradient-xy 10s ease infinite',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'scale-pop': 'scale-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        aurora: 'aurora 60s linear infinite',
        marquee: 'marquee 25s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      }
    },
  },
  plugins: [],
}
