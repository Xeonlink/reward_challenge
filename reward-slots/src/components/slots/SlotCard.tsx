"use client";

import React from "react";
import { css, cx } from "../../../styled-system/css";
import type { SlotKey, SlotStatus } from "@/lib/slotLogic";
import { getTimeOfDayLabel } from "@/lib/slotLogic";

interface SlotConfig {
  icon: string;
  label: string;
  timeLabel: string;
  color: string;
  colorLight: string;
  gradient: string;
  glow: string;
}

const SLOT_CONFIGS: Record<SlotKey, SlotConfig> = {
  morning: {
    icon: "🌅",
    label: "아침",
    timeLabel: "00:00 ~ 11:59",
    color: "#FF6B35",
    colorLight: "#FF9A6C",
    gradient: "linear-gradient(135deg, #FF4500 0%, #FF8C42 100%)",
    glow: "0 0 24px rgba(255,107,53,0.5), 0 0 60px rgba(255,107,53,0.2)",
  },
  lunch: {
    icon: "☀️",
    label: "점심",
    timeLabel: "12:00 ~ 17:59",
    color: "#00D4AA",
    colorLight: "#4DFFD8",
    gradient: "linear-gradient(135deg, #00897B 0%, #00D4AA 100%)",
    glow: "0 0 24px rgba(0,212,170,0.5), 0 0 60px rgba(0,212,170,0.2)",
  },
  dinner: {
    icon: "🌙",
    label: "저녁",
    timeLabel: "18:00 ~ 23:59",
    color: "#7B5EA7",
    colorLight: "#A87FD4",
    gradient: "linear-gradient(135deg, #4A148C 0%, #7B5EA7 100%)",
    glow: "0 0 24px rgba(123,94,167,0.5), 0 0 60px rgba(123,94,167,0.2)",
  },
  bonus: {
    icon: "⭐",
    label: "보너스",
    timeLabel: "모두 완료 시",
    color: "#FF4081",
    colorLight: "#FF79A8",
    gradient: "linear-gradient(135deg, #AD1457 0%, #FF4081 100%)",
    glow: "0 0 24px rgba(255,64,129,0.5), 0 0 60px rgba(255,64,129,0.2)",
  },
};

export interface SlotCardProps {
  slotKey: SlotKey;
  status: SlotStatus;
  isExtra?: boolean;
  onClick: (key: SlotKey) => void;
  isNew?: boolean;
}

const cardBase = css({
  position: "relative",
  borderRadius: "var(--radii-xl)",
  padding: "28px 20px 24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
  border: "1px solid transparent",
  overflow: "hidden",
  userSelect: "none",
  minWidth: "140px",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "0",
    borderRadius: "inherit",
    opacity: "0",
    transition: "opacity 200ms",
    background: "rgba(255,255,255,0.04)",
  },
});

const statusStyles: Record<SlotStatus, string> = {
  inactive: css({
    background: "#1A1A2E",
    borderColor: "#2A2A40",
    cursor: "default",
    opacity: "0.5",
  }),
  active: css({
    background: "linear-gradient(135deg, #12121A 0%, #1C1C2E 100%)",
    borderColor: "rgba(255,255,255,0.15)",
    _hover: {
      transform: "translateY(-4px) scale(1.02)",
      "&::before": { opacity: "1" },
    },
    _active: {
      transform: "translateY(-1px) scale(0.99)",
    },
  }),
  completed: css({
    background: "linear-gradient(135deg, #0A1F14 0%, #0D2B1A 100%)",
    borderColor: "rgba(0,230,118,0.4)",
    cursor: "default",
    opacity: "0.85",
  }),
  extra: css({
    background: "linear-gradient(135deg, #1A0A1A 0%, #2B1A2B 100%)",
    borderColor: "rgba(255,64,129,0.5)",
    _hover: {
      transform: "translateY(-4px) scale(1.02)",
      "&::before": { opacity: "1" },
    },
    _active: {
      transform: "translateY(-1px) scale(0.99)",
    },
  }),
  locked: css({
    background: "#12121A",
    borderColor: "#1E1E2E",
    cursor: "not-allowed",
    opacity: "0.35",
    filter: "grayscale(0.7)",
  }),
};

const iconContainerStyle = css({
  fontSize: "2.5rem",
  lineHeight: "1",
  position: "relative",
  transition: "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
});

const labelStyle = css({
  fontFamily: "var(--fonts-display)",
  fontWeight: "700",
  fontSize: "1rem",
  letterSpacing: "0.05em",
  textAlign: "center",
});

const timeLabelStyle = css({
  fontSize: "0.7rem",
  color: "var(--colors-brand-textMuted)",
  fontFamily: "var(--fonts-mono)",
  textAlign: "center",
  letterSpacing: "0.03em",
});

const badgeStyle = css({
  position: "absolute",
  top: "10px",
  right: "10px",
  padding: "2px 8px",
  borderRadius: "var(--radii-full)",
  fontSize: "0.6rem",
  fontWeight: "700",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

const completedCheckStyle = css({
  position: "absolute",
  top: "10px",
  left: "10px",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  background: "rgba(0,230,118,0.2)",
  border: "1px solid rgba(0,230,118,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.65rem",
  color: "#00E676",
});

const pulseRingStyle = css({
  position: "absolute",
  inset: "-2px",
  borderRadius: "inherit",
  animation: "glow 2s ease-in-out infinite",
  pointerEvents: "none",
});

export const SlotCard: React.FC<SlotCardProps> = ({
  slotKey,
  status,
  isExtra,
  onClick,
  isNew,
}) => {
  const config = SLOT_CONFIGS[slotKey];
  const isClickable = status === "active" || status === "extra";

  const handleClick = () => {
    if (isClickable) onClick(slotKey);
  };

  const glowColor = isExtra ? "rgba(255,64,129,0.4)" : config.color;

  return (
    <div
      className={cx(cardBase, statusStyles[status])}
      onClick={handleClick}
      role={isClickable ? "button" : "presentation"}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={`${config.label} 슬롯 — ${status}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      style={
        isClickable
          ? {
              boxShadow: `0 4px 24px rgba(0,0,0,0.4), ${config.glow}`,
            }
          : undefined
      }
    >
      {/* Active pulse ring */}
      {status === "active" && (
        <div
          className={pulseRingStyle}
          style={{
            boxShadow: `0 0 0 0 ${glowColor}`,
            border: `1px solid ${config.color}40`,
          }}
        />
      )}

      {/* Completed check */}
      {status === "completed" && (
        <div className={completedCheckStyle}>✓</div>
      )}

      {/* Extra badge */}
      {isExtra && status === "extra" && (
        <div
          className={badgeStyle}
          style={{
            background: "rgba(255,64,129,0.2)",
            border: "1px solid rgba(255,64,129,0.5)",
            color: "#FF79A8",
          }}
        >
          추가기회
        </div>
      )}

      {/* New badge */}
      {isNew && (
        <div
          className={cx(
            badgeStyle,
            css({ top: "10px", right: "10px", animation: "bounce 1s ease infinite" })
          )}
          style={{
            background: "rgba(255,215,0,0.2)",
            border: "1px solid rgba(255,215,0,0.5)",
            color: "#FFD700",
          }}
        >
          NEW
        </div>
      )}

      {/* Icon */}
      <div
        className={iconContainerStyle}
        style={
          status === "completed"
            ? { filter: "grayscale(0.3) brightness(0.7)" }
            : status === "locked" || status === "inactive"
            ? { filter: "grayscale(1) brightness(0.5)" }
            : {}
        }
      >
        {status === "completed" ? "✅" : status === "locked" ? "🔒" : config.icon}
      </div>

      {/* Label */}
      <div
        className={labelStyle}
        style={{
          color:
            status === "completed"
              ? "#00E676"
              : status === "locked" || status === "inactive"
              ? "#4A4A6A"
              : isExtra
              ? "#FF79A8"
              : config.colorLight,
        }}
      >
        {config.label}
      </div>

      {/* Time label */}
      <div className={timeLabelStyle}>{config.timeLabel}</div>

      {/* Status label */}
      <div
        className={css({
          fontSize: "0.7rem",
          fontWeight: "600",
          textAlign: "center",
          marginTop: "2px",
        })}
        style={{
          color:
            status === "completed"
              ? "#00E676"
              : status === "locked"
              ? "#3A3A5A"
              : status === "extra"
              ? "#FF4081"
              : status === "active"
              ? config.color
              : "#4A4A6A",
        }}
      >
        {status === "completed"
          ? "수령 완료"
          : status === "locked"
          ? "참여 불가"
          : status === "inactive"
          ? "비활성"
          : status === "extra"
          ? "탭하여 참여"
          : "탭하여 수령"}
      </div>
    </div>
  );
};
