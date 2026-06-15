/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        syne: ['Syne', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#c8ff00',
          dark: '#a8d600',
        },
        base: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
          border: '#2a2a2a',
        },
      },
    },
  },
  plugins: [],
}


