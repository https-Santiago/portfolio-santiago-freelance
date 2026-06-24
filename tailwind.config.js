/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          dark: '#5b21b6',
        },
        base: {
          DEFAULT: '#1e1e1e',
          soft: '#1a1a1a',
          border: '#3a3a3a',
          ink: '#f0f0f0',
          muted: '#9a9a9a',
        },
      },
    },
  },
  plugins: [],
}


