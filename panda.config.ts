import { defineConfig } from "@pandacss/dev";

const colorVar = (name: string) => ({ value: `var(--colors-${name})` });

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          bg: colorVar("bg"),
          fg: {
            DEFAULT: colorVar("fg"),
            muted: colorVar("fg-muted"),
            dim: colorVar("fg-dim"),
          },
          surface: {
            DEFAULT: colorVar("surface"),
            high: colorVar("surface-high"),
            hover: colorVar("surface-hover"),
          },
          border: {
            DEFAULT: colorVar("border"),
            bright: colorVar("border-bright"),
          },
          accent: {
            DEFAULT: colorVar("accent"),
            light: colorVar("accent-light"),
            dark: colorVar("accent-dark"),
          },
          footer: colorVar("footer"),
          nebula: {
            DEFAULT: colorVar("nebula"),
            light: colorVar("nebula-light"),
          },
          cosmic: {
            DEFAULT: colorVar("cosmic"),
            light: colorVar("cosmic-light"),
          },
          slot: {
            morning: colorVar("slot-morning"),
            morningLight: colorVar("slot-morning-light"),
            lunch: colorVar("slot-lunch"),
            lunchLight: colorVar("slot-lunch-light"),
            dinner: colorVar("slot-dinner"),
            dinnerLight: colorVar("slot-dinner-light"),
            bonus: colorVar("slot-bonus"),
            bonusLight: colorVar("slot-bonus-light"),
            inactive: { value: "#0C1230" },
            inactiveBorder: { value: "#1A2348" },
            active: { value: "#131A3E" },
            completed: { value: "#0A1E28" },
            completedBorder: { value: "#5CE8A0" },
            extra: { value: "#1A1038" },
            extraBorder: { value: "#E86FA8" },
          },
          success: colorVar("success"),
          danger: colorVar("danger"),
        },
        fonts: {
          display: { value: "var(--font-display), sans-serif" },
          body: {
            value: "var(--font-body), var(--font-body-kr), sans-serif",
          },
          mono: { value: "var(--font-mono), monospace" },
        },
        shadows: {
          gold: {
            value:
              "0 0 20px rgba(255,209,102,0.4), 0 0 60px rgba(255,209,102,0.15)",
          },
          morning: {
            value:
              "0 0 20px rgba(244,160,90,0.4), 0 0 60px rgba(244,160,90,0.15)",
          },
          lunch: {
            value:
              "0 0 20px rgba(80,200,232,0.4), 0 0 60px rgba(80,200,232,0.15)",
          },
          dinner: {
            value:
              "0 0 20px rgba(155,114,207,0.4), 0 0 60px rgba(155,114,207,0.15)",
          },
          bonus: {
            value:
              "0 0 20px rgba(232,111,168,0.4), 0 0 60px rgba(232,111,168,0.15)",
          },
          nebula: {
            value:
              "0 0 30px rgba(123,141,224,0.3), 0 0 80px rgba(123,141,224,0.1)",
          },
        },
        durations: {
          fast: { value: "150ms" },
          normal: { value: "250ms" },
          slow: { value: "400ms" },
        },
        easings: {
          smooth: { value: "cubic-bezier(0.4, 0, 0.2, 1)" },
          spring: { value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
          out: { value: "cubic-bezier(0, 0, 0.2, 1)" },
        },
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.2", transform: "scale(0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        orbFloat: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-6px) scale(1.03)" },
        },
        orbPulse: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(123,141,224,0.2)" },
          "50%": {
            boxShadow:
              "0 0 30px rgba(197,137,232,0.5), 0 0 60px rgba(123,141,224,0.3)",
          },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { transform: "scale(0.85)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        starPop: {
          "0%": { transform: "scale(0) rotate(-30deg)", opacity: "0" },
          "60%": { transform: "scale(1.3) rotate(5deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        starBirth: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "60%": { opacity: "1", transform: "scale(1.4)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        cosmicRing: {
          "0%": { transform: "rotate(0deg) scale(1)", opacity: "0.5" },
          "50%": { transform: "rotate(180deg) scale(1.05)", opacity: "0.8" },
          "100%": { transform: "rotate(360deg) scale(1)", opacity: "0.5" },
        },
        auroraShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        nebulaGlow: {
          "0%, 100%": { opacity: "0.06" },
          "50%": { opacity: "0.12" },
        },
      },
    },
  },
  utilities: {},
  outdir: "src/styled",
  jsxFramework: "react",
});
