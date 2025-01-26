import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import { transform } from "next/dist/build/swc/generated-native";

/** @type {import('tailwindcss').Config} */

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
      gridTemplateColumns: {
        inputs: "repeat(auto-fit, minmax(200px, 1fr))",
        product:  "repeat(auto-fit, minmax(256px, 1fr))"
      },
      animation: {
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        aurora: "aurora 60s linear infinite",
        'sheet-slide-in': 'sheet-slide-in 0.3s ease-out',
        'sheet-slide-out': 'sheet-slide-out 0.3s ease-in',
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        'sheet-slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'sheet-slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
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
        'border': "#4a5568",
        'gris': '#616161',
        'contacto': '#303030',
        'bg-form': '#E4E4E4',
        edit: '#03619B'
      },
    },
  },
  plugins: [addVariablesForColors],
} satisfies Config;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}