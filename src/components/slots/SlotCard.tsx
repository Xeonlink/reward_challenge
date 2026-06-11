"use client";

import { Text } from "@/components/ui/Text";
import type { SlotKey, SlotStatus } from "@/lib/slotLogic";
import { css, cva } from "@/styled/css";
import React from "react";
import {
  BonusIcon,
  CheckIcon,
  DinnerIcon,
  LockIcon,
  LunchIcon,
  MorningIcon,
} from "./SlotIcons";

interface SlotConfig {
  label: string;
  sublabel: string;
  timeLabel: string;
  color: string;
  colorLight: string;
  glow: string;
  bgActive: string;
  Icon: React.FC<{ color: string; size?: number }>;
}

const SLOT_CONFIGS: Record<SlotKey, SlotConfig> = {
  morning: {
    label: "아침 운세",
    sublabel: "새벽의 기운",
    timeLabel: "00:00 – 11:59",
    color: "var(--colors-slot-morning)",
    colorLight: "var(--colors-slot-morning-light)",
    glow: "0 0 28px rgba(244,160,90,0.45), 0 0 65px rgba(244,160,90,0.18)",
    bgActive: "linear-gradient(145deg, #1A1208 0%, #251A0C 100%)",
    Icon: MorningIcon,
  },
  lunch: {
    label: "정오 운세",
    sublabel: "하늘의 기운",
    timeLabel: "12:00 – 17:59",
    color: "var(--colors-slot-lunch)",
    colorLight: "var(--colors-slot-lunch-light)",
    glow: "0 0 28px rgba(80,200,232,0.45), 0 0 65px rgba(80,200,232,0.18)",
    bgActive: "linear-gradient(145deg, #061420 0%, #0A1E30 100%)",
    Icon: LunchIcon,
  },
  dinner: {
    label: "저녁 운세",
    sublabel: "달빛의 기운",
    timeLabel: "18:00 – 23:59",
    color: "var(--colors-slot-dinner)",
    colorLight: "var(--colors-slot-dinner-light)",
    glow: "0 0 28px rgba(155,114,207,0.45), 0 0 65px rgba(155,114,207,0.18)",
    bgActive: "linear-gradient(145deg, #0E0820 0%, #180C30 100%)",
    Icon: DinnerIcon,
  },
  bonus: {
    label: "별 보너스",
    sublabel: "우주의 기운",
    timeLabel: "모든 운세 완료 후",
    color: "var(--colors-slot-bonus)",
    colorLight: "var(--colors-slot-bonus-light)",
    glow: "0 0 28px rgba(232,111,168,0.45), 0 0 65px rgba(232,111,168,0.18)",
    bgActive: "linear-gradient(145deg, #1E0812 0%, #280C1A 100%)",
    Icon: BonusIcon,
  },
};

const slotCard = cva({
  base: {
    position: "relative",
    borderRadius: "lg",
    padding: "1.875rem 1.25rem 1.375rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.625rem",
    transition: "all 320ms",
    transitionTimingFunction: "spring",
    border: "1px solid",
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
        borderColor: "slot.extraBorder",
        boxShadow: "bonus",
        cursor: "pointer",
        _hover: { transform: "translateY(-5px) scale(1.025)" },
        _active: { transform: "translateY(-2px) scale(0.98)" },
      },
    },
  },
});

const slotCardRing = cva({
  base: {
    position: "absolute",
    inset: "-0.125rem",
    borderRadius: "1.5rem",
    border: "1px solid",
    animation: "glow 2.5s ease-in-out infinite",
    pointerEvents: "none",
  },
});

const cornerBadge = cva({
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

const checkBadge = css({
  position: "absolute",
  top: "0.625rem",
  left: "0.625rem",
});

const iconWrap = cva({
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

const divider = cva({
  base: {
    width: "60%",
    height: "1px",
  },
});

export interface SlotCardProps {
  slotKey: SlotKey;
  status: SlotStatus;
  isExtra?: boolean;
  onClick: (key: SlotKey) => void;
  isNew?: boolean;
}

export const SlotCard: React.FC<SlotCardProps> = ({
  slotKey,
  status,
  isExtra,
  onClick,
  isNew,
}) => {
  const cfg = SLOT_CONFIGS[slotKey];
  const isClickable = status === "active" || status === "extra";

  const handleClick = () => {
    if (isClickable) onClick(slotKey);
  };

  const iconColor =
    status === "completed"
      ? "var(--colors-success)"
      : status === "locked" || status === "inactive"
        ? "var(--colors-fg-muted)"
        : isExtra
          ? "var(--colors-slot-bonus-light)"
          : cfg.color;

  const labelColor =
    status === "completed"
      ? "var(--colors-success)"
      : status === "locked" || status === "inactive"
        ? "var(--colors-fg-muted)"
        : isExtra
          ? "var(--colors-slot-bonus-light)"
          : cfg.colorLight;

  const sublabelColor =
    status === "completed"
      ? "color-mix(in srgb, var(--colors-success) 50%, transparent)"
      : status === "locked" || status === "inactive"
        ? "var(--colors-fg-dim)"
        : isExtra
          ? "color-mix(in srgb, var(--colors-slot-bonus-light) 50%, transparent)"
          : `color-mix(in srgb, ${cfg.color} 44%, transparent)`;

  const timeColor =
    status === "locked" || status === "inactive"
      ? "var(--colors-fg-dim)"
      : "var(--colors-fg-muted)";

  const statusText =
    status === "completed"
      ? "수령 완료"
      : status === "locked"
        ? "참여 불가"
        : status === "inactive"
          ? "비활성"
          : status === "extra"
            ? "탭하여 참여"
            : "탭하여 수령";

  const statusColor =
    status === "completed"
      ? "var(--colors-success)"
      : status === "locked" || status === "inactive"
        ? "var(--colors-fg-dim)"
        : status === "extra"
          ? "var(--colors-slot-bonus)"
          : cfg.color;

  // runtime: active slot uses per-key gradient, border, glow
  const activeStyle =
    status === "active"
      ? {
          background: cfg.bgActive,
          borderColor: `color-mix(in srgb, ${cfg.color} 27%, transparent)`,
          boxShadow: cfg.glow,
        }
      : undefined;

  const ringStyle =
    status === "active" || status === "extra"
      ? {
          borderColor: isExtra
            ? "color-mix(in srgb, var(--colors-slot-bonus) 30%, transparent)"
            : `color-mix(in srgb, ${cfg.color} 19%, transparent)`,
        }
      : undefined;

  const dividerStyle =
    status === "active" || status === "extra"
      ? {
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${isExtra ? "var(--colors-slot-bonus)" : cfg.color} 31%, transparent), transparent)`,
        }
      : {
          background:
            "color-mix(in srgb, var(--colors-border) 40%, transparent)",
        };

  return (
    <div
      className={slotCard({ status })}
      style={activeStyle}
      onClick={handleClick}
      role={isClickable ? "button" : "presentation"}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={`${cfg.label} — ${status}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      {(status === "active" || status === "extra") && (
        <div className={slotCardRing()} style={ringStyle} />
      )}

      {status === "completed" && (
        <div className={checkBadge}>
          <CheckIcon color="var(--colors-success)" size={20} />
        </div>
      )}

      {isExtra && status === "extra" && (
        <div className={cornerBadge({ tone: "extra" })}>추가기회</div>
      )}

      {isNew ? <div className={cornerBadge({ tone: "new" })}>NEW</div> : null}

      <div
        className={iconWrap({
          pulse: status === "active" || status === "extra",
        })}
      >
        {status === "locked" ? (
          <LockIcon color="var(--colors-fg-muted)" size={36} />
        ) : status === "completed" ? (
          <cfg.Icon color="var(--colors-success)" size={36} />
        ) : (
          <cfg.Icon color={iconColor} size={36} />
        )}
      </div>

      <Text className={css({ color: labelColor })} variant="slotTitle">
        {cfg.label}
      </Text>

      <Text className={css({ color: sublabelColor })} variant="slotMeta">
        {cfg.sublabel}
      </Text>

      <Text className={css({ color: timeColor })} variant="slotMetaMono">
        {cfg.timeLabel}
      </Text>

      <div className={divider()} style={dividerStyle} />

      <Text className={css({ color: statusColor })} variant="slotStatus">
        {statusText}
      </Text>
    </div>
  );
};
