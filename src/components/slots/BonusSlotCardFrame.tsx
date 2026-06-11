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
  lockOverlay,
  slotCard,
} from "./slotCardLayout";

type BonusSlotCardFrameProps = {
  label: string;
  sublabel: string;
  timeLabel: string;
  color: string;
  colorLight: string;
  bgActive: string;
  glow: string;
  icon: ComponentType<{ color: string; size?: number }>;
  status: SlotStatus;
  isNew?: boolean;
  isClickable: boolean;
  onPress: () => void;
};

export function BonusSlotCardFrame(props: BonusSlotCardFrameProps) {
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
    isNew,
    isClickable,
    onPress,
  } = props;

  const isLocked = status === "locked";
  const cardStatus = isLocked ? "lockedBonus" : status;

  const iconColor =
    status === "completed"
      ? "var(--colors-success)"
      : isLocked
        ? "var(--colors-slot-bonus-light)"
        : status === "inactive"
          ? "var(--colors-fg-muted)"
          : color;

  const labelColor =
    status === "completed"
      ? "var(--colors-success)"
      : isLocked
        ? "var(--colors-slot-bonus-light)"
        : status === "inactive"
          ? "var(--colors-fg-muted)"
          : colorLight;

  const sublabelColor =
    status === "completed"
      ? "color-mix(in srgb, var(--colors-success) 50%, transparent)"
      : isLocked
        ? "color-mix(in srgb, var(--colors-slot-bonus-light) 50%, transparent)"
        : status === "inactive"
          ? "var(--colors-fg-dim)"
          : `color-mix(in srgb, ${color} 44%, transparent)`;

  const timeColor = isLocked
    ? "var(--colors-fg-muted)"
    : status === "inactive"
      ? "var(--colors-fg-dim)"
      : "var(--colors-fg-muted)";

  const statusText =
    status === "completed"
      ? "수령 완료"
      : isLocked
        ? "탭하여 조건 확인"
        : status === "inactive"
          ? "비활성"
          : "탭하여 수령";

  const statusColor =
    status === "completed"
      ? "var(--colors-success)"
      : isLocked
        ? "var(--colors-slot-bonus)"
        : status === "inactive"
          ? "var(--colors-fg-dim)"
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
    status === "active" || isLocked
      ? {
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${isLocked ? "var(--colors-slot-bonus)" : color} 31%, transparent), transparent)`,
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

      {isNew ? <div className={cornerBadge({ tone: "new" })}>NEW</div> : null}

      <div className={iconWrap({ pulse: status === "active" })}>
        {status === "completed" ? (
          <Icon color="var(--colors-success)" size={36} />
        ) : (
          <>
            <Icon color={iconColor} size={36} />
            {isLocked ? (
              <div className={lockOverlay}>
                <LockIcon color="var(--colors-fg-muted)" size={12} />
              </div>
            ) : null}
          </>
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
