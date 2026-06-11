export interface OrbConfig {
  size: number;
  bg: string;
  glow: string;
  ringColor: string;
  label: string;
  labelColor: string;
  particleColor: string | null;
  particleCount: number;
}

export const ORB: Record<1 | 2 | 3 | 4 | 5, OrbConfig> = {
  1: {
    size: 64,
    bg: "radial-gradient(circle at 38% 32%, #1E2456 0%, #0C1030 55%, #070918 100%)",
    glow: "0 0 14px rgba(100,120,200,0.18)",
    ringColor: "transparent",
    label: "별이 태어나고 있어요",
    labelColor: "var(--colors-fg-muted)",
    particleColor: null,
    particleCount: 0,
  },
  2: {
    size: 80,
    bg: "radial-gradient(circle at 38% 32%, #3A4A9A 0%, #1A2060 45%, #0C1030 100%)",
    glow: "0 0 30px rgba(123,141,224,0.5), 0 0 65px rgba(123,141,224,0.18)",
    ringColor: "rgba(123,141,224,0.22)",
    label: "별이 자라고 있어요",
    labelColor: "#7B8DE0",
    particleColor: null,
    particleCount: 0,
  },
  3: {
    size: 96,
    bg: "radial-gradient(circle at 38% 32%, #7050C0 0%, #3828A0 42%, #18185A 75%, #0C1030 100%)",
    glow: "0 0 38px rgba(155,114,207,0.6), 0 0 85px rgba(123,141,224,0.22)",
    ringColor: "rgba(155,114,207,0.30)",
    label: "별이 빛나고 있어요",
    labelColor: "#C3A4EA",
    particleColor: null,
    particleCount: 0,
  },
  4: {
    size: 112,
    bg: "radial-gradient(circle at 38% 32%, #C080F0 0%, #8848C8 32%, #4820A0 62%, #18185A 85%, #0C1030 100%)",
    glow: "0 0 52px rgba(197,137,232,0.70), 0 0 110px rgba(155,114,207,0.28)",
    ringColor: "rgba(197,137,232,0.38)",
    label: "별이 눈부셔요",
    labelColor: "#DEB0F8",
    particleColor: "#C589E8",
    particleCount: 1,
  },
  5: {
    size: 132,
    bg: "radial-gradient(circle at 38% 32%, #FFE878 0%, #F0A0FF 20%, #9060D0 46%, #3020A0 73%, #0C1030 100%)",
    glow: "0 0 65px rgba(255,220,100,0.65), 0 0 130px rgba(197,137,232,0.40), 0 0 200px rgba(123,141,224,0.18)",
    ringColor: "rgba(255,209,102,0.45)",
    label: "우주의 별이 되었어요",
    labelColor: "#FFD166",
    particleColor: "#FFD166",
    particleCount: 2,
  },
};

export const CANVAS_W = 280;
export const CANVAS_H = 280;
export const CANVAS_CX = CANVAS_W / 2;
export const CANVAS_CY = CANVAS_H / 2;
export const STAR_MIN_R = 74;
export const STAR_MAX_R = 132;
export const STAR_ANIM_MS = 1200;
export const GOLDEN_ANGLE = 2.399963;

export const ORB_R: Record<number, number> = {
  1: 32,
  2: 40,
  3: 48,
  4: 56,
  5: 66,
};

export interface StarData {
  finalX: number;
  finalY: number;
  born: number;
  size: number;
}

export function starFinalPos(i: number) {
  const r =
    STAR_MIN_R +
    (Math.min(i, 149) / 149) * (STAR_MAX_R - STAR_MIN_R);
  return {
    x: CANVAS_CX + r * Math.cos(i * GOLDEN_ANGLE),
    y: CANVAS_CY + r * Math.sin(i * GOLDEN_ANGLE),
  };
}

export function starSize(i: number) {
  const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return 0.8 + (v - Math.floor(v)) * 1.7;
}

export const PLANETS = [
  { orbitR: 96, r: 10, color: "#a060ff", speed: 0.0009, phase: 0.0 },
  { orbitR: 113, r: 7, color: "#30c0a0", speed: -0.0006, phase: 2.1 },
  { orbitR: 127, r: 5, color: "#ff8840", speed: 0.0004, phase: 4.2 },
] as const;
