import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/icons/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/backend/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'rojo': '#E81B24',
        'rojo-claro': '#FF6A71',
        'rojo-login': 'rgba(200, 2, 10, 0.92)',
        'verde': '#27A11A',
        'backProduct': '#D9D9D9',
        'textProduct': '#B0B0B0',
        'LayoutAdmin': '#242424',
        'border-option': '#F0F1F7',
      },
    },
  },
  plugins: [],
} satisfies Config;
