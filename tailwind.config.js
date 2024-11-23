/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rojo': '#E81B24',
        'rojo-claro': '#FF6A71',
        'verde': '#27A11A',
        'backProduct': '#D9D9D9',
        'textProduct': '#B0B0B0',
      }
    },
  },
  plugins: [],
}

