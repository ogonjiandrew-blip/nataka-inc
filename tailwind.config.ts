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
        // Brand palette, October 2026 refresh: graphite, platinum and one signal red.
        // accent  = platinum. Buttons, links, active states (was teal until the refresh).
        // accent.dark = silver, the second tone in two-tone headlines.
        // signal  = the full stop. Logo dot and the stop that ends a headline, nothing else.
        accent: {
          DEFAULT: "#D9DDE2",
          light: "#F1F3F5",
          dark: "#9AA3AE",
        },
        signal: {
          DEFAULT: "#E8432F",
        },
        ink: {
          DEFAULT: "#0B0C0E",
          "50": "#1C1F23",
          "100": "#131519",
          "200": "#0E1013",
        },
        cream: {
          DEFAULT: "#E7E9EC",
          dark: "#C4C9D0",
        },
        // Off-white instead of #FFFFFF, so every text-white/bg-white reads as paper, not glare.
        white: "#F5F6F8",
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
        // Archivo carries a width axis (62-125%): normal width for text, the
        // .stretch-* utilities in globals.css for the extended display cut.
        heading: ["var(--font-archivo)", "system-ui", "sans-serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        // Serif kept only for the community / Otamatsuri skins.
        display: ["var(--font-cormorant)", "Georgia", "serif"],
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
