"use client";

import { Text } from "@/components/ui/Text";
import { SLOT_META } from "@/lib/slots";
import type { SlotKey, SlotStatus } from "@/lib/slots";
import { css, cva } from "@/styled/css";
import React from "react";
import { CheckIcon, LockIcon } from "./SlotIcons";
import { SLOT_ICONS } from "./slotIconMap";

const slotCard = cva({
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

const lockOverlay = css({
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

type SlotCardFrameProps = {
  slotKey: SlotKey;
  status: SlotStatus;
  isExtra?: boolean;
  isNew?: boolean;
  isClickable: boolean;
  onPress: () => void;
};

export function SlotCardFrame(props: SlotCardFrameProps) {
  const { slotKey, status, isExtra, isNew, isClickable, onPress } = props;
  const cfg = SLOT_META[slotKey];
  const Icon = SLOT_ICONS[slotKey];
  const isBonusLocked = slotKey === "bonus" && status === "locked";
  const cardStatus = isBonusLocked ? "lockedBonus" : status;

  const iconColor =
    status === "completed"
      ? "var(--colors-success)"
      : isBonusLocked
        ? "var(--colors-slot-bonus-light)"
        : status === "locked" || status === "inactive"
          ? "var(--colors-fg-muted)"
          : isExtra
            ? "var(--colors-slot-bonus-light)"
            : cfg.color;

  const labelColor =
    status === "completed"
      ? "var(--colors-success)"
      : isBonusLocked
        ? "var(--colors-slot-bonus-light)"
        : status === "locked" || status === "inactive"
          ? "var(--colors-fg-muted)"
          : isExtra
            ? "var(--colors-slot-bonus-light)"
            : cfg.colorLight;

  const sublabelColor =
    status === "completed"
      ? "color-mix(in srgb, var(--colors-success) 50%, transparent)"
      : isBonusLocked
        ? "color-mix(in srgb, var(--colors-slot-bonus-light) 50%, transparent)"
        : status === "locked" || status === "inactive"
          ? "var(--colors-fg-dim)"
          : isExtra
            ? "color-mix(in srgb, var(--colors-slot-bonus-light) 50%, transparent)"
            : `color-mix(in srgb, ${cfg.color} 44%, transparent)`;

  const timeColor = isBonusLocked
    ? "var(--colors-fg-muted)"
    : status === "locked" || status === "inactive"
      ? "var(--colors-fg-dim)"
      : "var(--colors-fg-muted)";

  const statusText =
    status === "completed"
      ? "수령 완료"
      : isBonusLocked
        ? "탭하여 조건 확인"
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
      : isBonusLocked
        ? "var(--colors-slot-bonus)"
        : status === "locked" || status === "inactive"
          ? "var(--colors-fg-dim)"
          : status === "extra"
            ? "var(--colors-slot-bonus)"
            : cfg.color;

  const activeStyle =
    status === "active"
      ? {
          background: cfg.bgActive,
          borderColor: "transparent",
          boxShadow: `0 0 0 1px color-mix(in srgb, ${cfg.color} 27%, transparent), ${cfg.glow}`,
        }
      : undefined;

  const dividerStyle =
    status === "active" || status === "extra" || isBonusLocked
      ? {
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${isExtra || isBonusLocked ? "var(--colors-slot-bonus)" : cfg.color} 31%, transparent), transparent)`,
        }
      : {
          background:
            "color-mix(in srgb, var(--colors-border) 40%, transparent)",
        };

  return (
    <div
      className={slotCard({ status: cardStatus })}
      style={activeStyle}
      onClick={() => {
        if (isClickable) onPress();
      }}
      role={isClickable ? "button" : "presentation"}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={`${cfg.label} — ${status}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (isClickable) onPress();
        }
      }}
    >
      {status === "completed" ? (
        <div className={checkBadge}>
          <CheckIcon color="var(--colors-success)" size={20} />
        </div>
      ) : null}

      {isExtra && status === "extra" ? (
        <div className={cornerBadge({ tone: "extra" })}>추가기회</div>
      ) : null}

      {isNew ? <div className={cornerBadge({ tone: "new" })}>NEW</div> : null}

      <div
        className={iconWrap({
          pulse: status === "active" || status === "extra",
        })}
      >
        {status === "locked" && !isBonusLocked ? (
          <LockIcon color="var(--colors-fg-muted)" size={36} />
        ) : status === "completed" ? (
          <Icon color="var(--colors-success)" size={36} />
        ) : (
          <>
            <Icon color={iconColor} size={36} />
            {isBonusLocked ? (
              <div className={lockOverlay}>
                <LockIcon color="var(--colors-fg-muted)" size={12} />
              </div>
            ) : null}
          </>
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
}
