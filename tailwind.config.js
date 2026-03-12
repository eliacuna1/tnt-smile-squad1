/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        primary: '#ffffff',
        accent: '#ff5500', // Drinksom warm orange accent
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
