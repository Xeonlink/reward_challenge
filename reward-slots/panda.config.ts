import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            gold: { value: "#FFD700" },
            goldLight: { value: "#FFE566" },
            goldDark: { value: "#CC9900" },
            amber: { value: "#FF8C00" },
            bg: { value: "#0A0A0F" },
            surface: { value: "#12121A" },
            surfaceHigh: { value: "#1C1C2E" },
            border: { value: "#2A2A40" },
            text: { value: "#F0E8FF" },
            textMuted: { value: "#8080A0" },
            morning: { value: "#FF6B35" },
            morningLight: { value: "#FF9A6C" },
            lunch: { value: "#00D4AA" },
            lunchLight: { value: "#4DFFD8" },
            dinner: { value: "#7B5EA7" },
            dinnerLight: { value: "#A87FD4" },
            bonus: { value: "#FF4081" },
            bonusLight: { value: "#FF79A8" },
            success: { value: "#00E676" },
            danger: { value: "#FF1744" },
          },
          slot: {
            inactive: { value: "#1A1A2E" },
            inactiveBorder: { value: "#2A2A40" },
            active: { value: "#1C1C2E" },
            completed: { value: "#0D2B1A" },
            completedBorder: { value: "#00E676" },
            extra: { value: "#2B1A2B" },
            extraBorder: { value: "#FF4081" },
          },
        },
        fonts: {
          display: { value: "'Orbitron', 'Exo 2', sans-serif" },
          body: { value: "'DM Sans', 'Noto Sans KR', sans-serif" },
          mono: { value: "'JetBrains Mono', monospace" },
        },
        fontSizes: {
          "2xs": { value: "0.625rem" },
          xs: { value: "0.75rem" },
          sm: { value: "0.875rem" },
          md: { value: "1rem" },
          lg: { value: "1.125rem" },
          xl: { value: "1.25rem" },
          "2xl": { value: "1.5rem" },
          "3xl": { value: "1.875rem" },
          "4xl": { value: "2.25rem" },
          "5xl": { value: "3rem" },
        },
        radii: {
          sm: { value: "6px" },
          md: { value: "12px" },
          lg: { value: "18px" },
          xl: { value: "24px" },
          full: { value: "9999px" },
        },
        shadows: {
          gold: { value: "0 0 20px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.15)" },
          morning: { value: "0 0 20px rgba(255,107,53,0.4), 0 0 60px rgba(255,107,53,0.15)" },
          lunch: { value: "0 0 20px rgba(0,212,170,0.4), 0 0 60px rgba(0,212,170,0.15)" },
          dinner: { value: "0 0 20px rgba(123,94,167,0.4), 0 0 60px rgba(123,94,167,0.15)" },
          bonus: { value: "0 0 20px rgba(255,64,129,0.4), 0 0 60px rgba(255,64,129,0.15)" },
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255,215,0,0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.3)" },
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
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        starPop: {
          "0%": { transform: "scale(0) rotate(-30deg)", opacity: "0" },
          "60%": { transform: "scale(1.3) rotate(5deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
    },
  },
  utilities: {},
  outdir: "styled-system",
  jsxFramework: "react",
});
