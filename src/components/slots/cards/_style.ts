import { css, cva } from "@/styled/css";

export const slotCard = cva({
  base: {
    position: "relative",
    borderRadius: "3xl",
    padding: "1.875rem 1.25rem 1.375rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.625rem",
    transition: "all 320ms",
    transitionTimingFunction: "spring",
    border: "1px solid",
    backgroundClip: "padding-box",
    overflow: "hidden",
    userSelect: "none",
    width: "100%",
    minWidth: 0,
  },
  variants: {
    status: {
      inactive: {
        background: "slot.inactive",
        borderColor: "slot.inactiveBorder",
        opacity: 0.7,
        cursor: "default",
      },
      locked: {
        background: "slot.inactive",
        borderColor: "slot.inactiveBorder",
        opacity: 0.55,
        filter: "grayscale(0.8)",
        cursor: "not-allowed",
      },
      lockedBonus: {
        background: "slot.extra",
        borderColor: "transparent",
        boxShadow: "0 0 0 1px var(--colors-slot-extraBorder)",
        opacity: 0.82,
        cursor: "pointer",
        _hover: { transform: "translateY(-3px) scale(1.02)" },
        _active: { transform: "translateY(-1px) scale(0.99)" },
      },
      completed: {
        background: "slot.completed",
        borderColor: "slot.completedBorder",
        opacity: 0.88,
        cursor: "default",
      },
      active: {
        cursor: "pointer",
        _hover: { transform: "translateY(-5px) scale(1.025)" },
        _active: { transform: "translateY(-2px) scale(0.98)" },
      },
      extra: {
        background: "slot.extra",
        borderColor: "transparent",
        boxShadow:
          "0 0 0 1px var(--colors-slot-extraBorder), 0 0 20px rgba(232,111,168,0.4), 0 0 60px rgba(232,111,168,0.15)",
        cursor: "pointer",
        _hover: { transform: "translateY(-5px) scale(1.025)" },
        _active: { transform: "translateY(-2px) scale(0.98)" },
      },
    },
  },
});

export const cornerBadge = cva({
  base: {
    position: "absolute",
    top: "0.625rem",
    right: "0.625rem",
    padding: "0.125rem 0.5rem",
    borderRadius: "full",
    fontSize: "sm",
    fontWeight: "700",
    letterSpacing: "0.08em",
    border: "1px solid",
  },
  variants: {
    tone: {
      extra: {
        background:
          "color-mix(in srgb, var(--colors-slot-bonus) 18%, transparent)",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-bonus) 50%, transparent)",
        color: "slot.bonusLight",
      },
      new: {
        background: "color-mix(in srgb, var(--colors-accent) 18%, transparent)",
        borderColor:
          "color-mix(in srgb, var(--colors-accent) 50%, transparent)",
        color: "accent",
        animation: "bounce 1.2s ease infinite",
      },
    },
  },
});

export const checkBadge = css({
  position: "absolute",
  top: "0.625rem",
  left: "0.625rem",
});

export const lockOverlay = css({
  position: "absolute",
  bottom: "-0.125rem",
  right: "-0.125rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.25rem",
  height: "1.25rem",
  borderRadius: "50%",
  background: "color-mix(in srgb, var(--colors-surface) 90%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-border) 80%, transparent)",
});

export const iconWrap = cva({
  base: {
    position: "relative",
    transition: "transform 300ms",
    transitionTimingFunction: "spring",
  },
  variants: {
    pulse: {
      true: { animation: "orbPulse 2.5s ease-in-out infinite" },
      false: {},
    },
  },
});

export const divider = cva({
  base: {
    width: "60%",
    height: "1px",
  },
});
