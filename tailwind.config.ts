import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#0ABFBF",
          light: "#2DD4D4",
          dark: "#089090",
        },
        ink: {
          DEFAULT: "#080808",
          "50": "#1C1C1C",
          "100": "#141414",
          "200": "#0F0F0F",
        },
        cream: {
          DEFAULT: "#F0EDE6",
          dark: "#D4CFC6",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        geist: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        nataka: ['"Helvetica Neue"', '"Helvetica"', '"Arial Black"', "Arial", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
