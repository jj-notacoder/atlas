/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#05070A',
        surface: '#050B12',
        atlas: {
          cyan: '#00EAFF', // Electric Cyan
          gold: '#D4AF37', // Desert Gold
          dark: '#05070A',
          darker: '#050B12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      // Scaling up typography globally by ~15-20%
      fontSize: {
        xs: ['0.85rem', { lineHeight: '1.25rem' }],
        sm: ['1.0rem', { lineHeight: '1.5rem' }],   // Was 0.875rem
        base: ['1.2rem', { lineHeight: '1.75rem' }], // Was 1rem
        lg: ['1.35rem', { lineHeight: '2rem' }],     // Was 1.125rem
        xl: ['1.5rem', { lineHeight: '2rem' }],      // Was 1.25rem
        '2xl': ['1.8rem', { lineHeight: '2.5rem' }], // Was 1.5rem
        '3xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '4xl': ['3rem', { lineHeight: '1' }],
        '5xl': ['3.75rem', { lineHeight: '1' }],
        '6xl': ['4.5rem', { lineHeight: '1' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #00EAFF 0deg, #050B12 180deg, #D4AF37 360deg)',
      }
    },
  },
  plugins: [],
}
