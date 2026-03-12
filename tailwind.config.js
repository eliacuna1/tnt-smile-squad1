/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0D0D12',
        plasma: {
          purple: '#9D4EDD', // Electric Purple
          pink: '#FF007F',   // Plasma Pink
          blue: '#00F0FF',   // Cyan / Neon Blue
          green: '#00FF66',  // Neon Green
          orange: '#FF5500'  // Plasma Orange
        },
        ghost: '#F8F9FA'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
