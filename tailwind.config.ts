import type { Config } from "tailwindcss";

// Design tokens ported 1:1 from the approved wireframe (see docs/design-tokens.md).
// Keep this file as the single source of truth for brand color/shadow/animation —
// components should reference these utility classes, never hard-coded hex values.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#2E8B57",
          "green-dark": "#1F6B41",
          "green-light": "#EAF5EF",
          blue: "#2C5F8A",
          "blue-dark": "#214A6D",
          "blue-light": "#EBF2F8",
        },
        ink: {
          DEFAULT: "#333A3F", // primary text
          2: "#5C666D", // secondary text
          3: "#8A949B", // tertiary / muted text
        },
        line: "#E3E8E6",
        surface: {
          off: "#F7F9F8",
        },
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 6px rgba(51,58,63,.06), 0 14px 34px -18px rgba(51,58,63,.22)",
        "card-lg": "0 26px 60px -26px rgba(51,58,63,.32)",
        cta: "0 12px 24px -12px rgba(46,139,87,.5)",
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        floaty: "floaty 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
