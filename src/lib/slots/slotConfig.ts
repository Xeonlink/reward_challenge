import type { SlotKey } from "./types";

export interface SlotMeta {
  label: string;
  sublabel: string;
  timeLabel: string;
  fortuneLabel: string;
  color: string;
  colorLight: string;
  calloutBg: string;
  glow: string;
  bgActive: string;
}

export const SLOT_META: Record<SlotKey, SlotMeta> = {
  morning: {
    label: "아침 운세",
    sublabel: "새벽의 기운",
    timeLabel: "00:00 – 11:59",
    fortuneLabel: "새벽의 운세",
    color: "var(--colors-slot-morning)",
    colorLight: "var(--colors-slot-morning-light)",
    calloutBg: "color-mix(in srgb, var(--colors-slot-morning) 8%, transparent)",
    glow: "0 0 28px rgba(244,160,90,0.45), 0 0 65px rgba(244,160,90,0.18)",
    bgActive: "linear-gradient(145deg, #1A1208 0%, #251A0C 100%)",
  },
  lunch: {
    label: "정오 운세",
    sublabel: "하늘의 기운",
    timeLabel: "12:00 – 17:59",
    fortuneLabel: "하늘의 운세",
    color: "var(--colors-slot-lunch)",
    colorLight: "var(--colors-slot-lunch-light)",
    calloutBg: "color-mix(in srgb, var(--colors-slot-lunch) 8%, transparent)",
    glow: "0 0 28px rgba(80,200,232,0.45), 0 0 65px rgba(80,200,232,0.18)",
    bgActive: "linear-gradient(145deg, #061420 0%, #0A1E30 100%)",
  },
  dinner: {
    label: "저녁 운세",
    sublabel: "달빛의 기운",
    timeLabel: "18:00 – 23:59",
    fortuneLabel: "달빛의 운세",
    color: "var(--colors-slot-dinner)",
    colorLight: "var(--colors-slot-dinner-light)",
    calloutBg: "color-mix(in srgb, var(--colors-slot-dinner) 8%, transparent)",
    glow: "0 0 28px rgba(155,114,207,0.45), 0 0 65px rgba(155,114,207,0.18)",
    bgActive: "linear-gradient(145deg, #0E0820 0%, #180C30 100%)",
  },
  bonus: {
    label: "별 보너스",
    sublabel: "우주의 기운",
    timeLabel: "모든 운세 완료 후",
    fortuneLabel: "우주의 운세",
    color: "var(--colors-slot-bonus)",
    colorLight: "var(--colors-slot-bonus-light)",
    calloutBg: "color-mix(in srgb, var(--colors-slot-bonus) 8%, transparent)",
    glow: "0 0 28px rgba(232,111,168,0.45), 0 0 65px rgba(232,111,168,0.18)",
    bgActive: "linear-gradient(145deg, #1E0812 0%, #280C1A 100%)",
  },
};

export const BONUS_UNLOCK_STEPS: {
  key: "morning" | "lunch" | "dinner";
  label: string;
}[] = [
  { key: "morning", label: "아침 운세 수령" },
  { key: "lunch", label: "점심 운세 수령" },
  { key: "dinner", label: "저녁 운세 수령" },
];

export const FORTUNE_VISIT_STEPS = [
  "강남철학관 운세 페이지로 이동",
  "3초 이상 체류하기",
  "돌아와서 별 조각 수령",
] as const;
