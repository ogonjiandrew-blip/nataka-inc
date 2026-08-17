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
        // Otamatsuri / anime — festival red
        otaku: {
          DEFAULT: "#E8442E",
          light: "#FF6B54",
          deep: "#B22E1D",
        },
        // K-Wave / K-pop — the pink carried over from the K-Wave briefing
        kpop: {
          DEFAULT: "#FF3D7F",
          light: "#FF8FB8",
          mid: "#F7549A",
          deep: "#C81B63",
          ink: "#7A0E3F",
        },
        // Japanese scroll palette — shared with the printed Otamatsuri Vol. 001
        // scroll so the page and the poster read as one identity.
        shu: { DEFAULT: "#C1272D", light: "#E8442E" }, // 朱 vermilion
        kin: { DEFAULT: "#A8853C", light: "#D6B77F" }, // 金 gold
        ai: "#25344B",                                  // 藍 indigo
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        geist: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        nataka: ['"Helvetica Neue"', '"Helvetica"', '"Arial Black"', "Arial", "sans-serif"],
        jp: [
          "var(--font-jp)",
          '"Hiragino Mincho ProN"',
          '"Yu Mincho"',
          '"Noto Serif JP"',
          '"Noto Serif CJK JP"',
          "serif",
        ],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
