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
        // signal  = the brand colour (the NATAKA logo green, set per palette in globals.css):
        //           the full stop that ends a headline, the logo dot, the primary action.
        // ember   = the same hue, deep, for the room light. on-signal = text on signal.
        // Neutrals are CSS variables (globals.css) so the site can run dark or light
        // ([data-theme] on <html>, or on a section to make a dark island).
        accent: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          light: "rgb(var(--c-accent-light) / <alpha-value>)",
          dark: "rgb(var(--c-accent-dark) / <alpha-value>)",
        },
        signal: {
          DEFAULT: "rgb(var(--c-signal) / <alpha-value>)",
          light: "rgb(var(--c-signal-light) / <alpha-value>)",
        },
        "on-signal": "rgb(var(--c-on-signal) / <alpha-value>)",
        ember: {
          DEFAULT: "rgb(var(--c-ember) / <alpha-value>)",
          deep: "rgb(var(--c-ember-deep) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          "50": "rgb(var(--c-ink-50) / <alpha-value>)",
          "100": "rgb(var(--c-ink-100) / <alpha-value>)",
          "200": "rgb(var(--c-ink-200) / <alpha-value>)",
        },
        cream: {
          DEFAULT: "rgb(var(--c-cream) / <alpha-value>)",
          dark: "rgb(var(--c-cream-dark) / <alpha-value>)",
        },
        // "white" is the foreground: off-white paper on the dark site, near-black ink on the light one.
        white: "rgb(var(--c-white) / <alpha-value>)",
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
