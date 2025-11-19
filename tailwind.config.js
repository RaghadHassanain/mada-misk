/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        blue: '#31ccf2',
        yellow: '#f2b731',
        orange: '#f25731',
        pink: '#f2316b',
        primary: '#31ccf2',
        accent: '#f2316b',
        secondary: '#f2b731',
        tertiary: '#f25731',
        background: '#FFFFFF',
        'background-light': '#FFFFFF',
        'text-primary': '#1A1A1A',
        'text-secondary': '#4A4A4A',
      },
    },
  },
  plugins: [],
}


