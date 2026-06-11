"use client";

import { Text } from "@/components/ui/Text";
import type { SlotStatus } from "@/lib/slots";
import { css } from "@/styled/css";
import type { ComponentType } from "react";
import { CheckIcon, LockIcon } from "./SlotIcons";
import {
  checkBadge,
  cornerBadge,
  divider,
  iconWrap,
  slotCard,
} from "./slotCardLayout";

type FortuneSlotCardFrameProps = {
  label: string;
  sublabel: string;
  timeLabel: string;
  color: string;
  colorLight: string;
  bgActive: string;
  glow: string;
  icon: ComponentType<{ color: string; size?: number }>;
  status: SlotStatus;
  isExtra?: boolean;
  isClickable: boolean;
  onPress: () => void;
};

export function FortuneSlotCardFrame(props: FortuneSlotCardFrameProps) {
  const {
    label,
    sublabel,
    timeLabel,
    color,
    colorLight,
    bgActive,
    glow,
    icon: Icon,
    status,
    isExtra,
    isClickable,
    onPress,
  } = props;

  const iconColor =
    status === "completed"
      ? "var(--colors-success)"
      : status === "locked" || status === "inactive"
        ? "var(--colors-fg-muted)"
        : isExtra
          ? "var(--colors-slot-bonus-light)"
          : color;

  const labelColor =
    status === "completed"
      ? "var(--colors-success)"
      : status === "locked" || status === "inactive"
        ? "var(--colors-fg-muted)"
        : isExtra
          ? "var(--colors-slot-bonus-light)"
          : colorLight;

  const sublabelColor =
    status === "completed"
      ? "color-mix(in srgb, var(--colors-success) 50%, transparent)"
      : status === "locked" || status === "inactive"
        ? "var(--colors-fg-dim)"
        : isExtra
          ? "color-mix(in srgb, var(--colors-slot-bonus-light) 50%, transparent)"
          : `color-mix(in srgb, ${color} 44%, transparent)`;

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
          : color;

  const activeStyle =
    status === "active"
      ? {
          background: bgActive,
          borderColor: "transparent",
          boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 27%, transparent), ${glow}`,
        }
      : undefined;

  const dividerStyle =
    status === "active" || status === "extra"
      ? {
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${isExtra ? "var(--colors-slot-bonus)" : color} 31%, transparent), transparent)`,
        }
      : {
          background:
            "color-mix(in srgb, var(--colors-border) 40%, transparent)",
        };

  return (
    <div
      className={slotCard({ status })}
      style={activeStyle}
      onClick={() => {
        if (isClickable) onPress();
      }}
      role={isClickable ? "button" : "presentation"}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={`${label} — ${status}`}
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

      <div
        className={iconWrap({
          pulse: status === "active" || status === "extra",
        })}
      >
        {status === "locked" ? (
          <LockIcon color="var(--colors-fg-muted)" size={36} />
        ) : status === "completed" ? (
          <Icon color="var(--colors-success)" size={36} />
        ) : (
          <Icon color={iconColor} size={36} />
        )}
      </div>

      <Text className={css({ color: labelColor })} variant="slotTitle">
        {label}
      </Text>

      <Text className={css({ color: sublabelColor })} variant="slotMeta">
        {sublabel}
      </Text>

      <Text className={css({ color: timeColor })} variant="slotMetaMono">
        {timeLabel}
      </Text>

      <div className={divider()} style={dividerStyle} />

      <Text className={css({ color: statusColor })} variant="slotStatus">
        {statusText}
      </Text>
    </div>
  );
}
