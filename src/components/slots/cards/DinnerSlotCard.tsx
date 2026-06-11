"use client";

import { useModal } from "@/components/modal";
import { Text } from "@/components/ui/Text";
import type { SlotStatus, VisitIntent } from "@/lib/slots";
import { css } from "@/styled/css";
import { CheckIcon, DinnerIcon, LockIcon } from "../SlotIcons";
import { FortunePopupShell } from "../popups/FortunePopupShell";
import { FortuneVisitContent } from "../popups/FortuneVisitContent";
import {
  checkBadge,
  cornerBadge,
  divider,
  iconWrap,
  slotCard,
} from "../slotCardLayout";

type DinnerSlotCardProps = {
  status: SlotStatus;
  isExtra?: boolean;
  onExternalVisit: (intent: VisitIntent) => void;
};

export function DinnerSlotCard(props: DinnerSlotCardProps) {
  const { status, isExtra, onExternalVisit } = props;
  const modal = useModal();

  const label = "저녁 운세";
  const color = "var(--colors-slot-dinner)";
  const colorLight = "var(--colors-slot-dinner-light)";
  const isClickable = !["completed", "inactive", "locked"].includes(status);

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
          background: "linear-gradient(145deg, #0E0820 0%, #180C30 100%)",
          borderColor: "transparent",
          boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 27%, transparent), 0 0 28px rgba(155,114,207,0.45), 0 0 65px rgba(155,114,207,0.18)`,
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

  const openDinnerFortuneModal = () => {
    if (!isClickable) return;

    const dismiss = modal.open(
      <FortunePopupShell
        title="달빛의 운세"
        color={color}
        colorLight={colorLight}
        icon={DinnerIcon}
        titlePrefix={isExtra ? "추가 기회 — " : undefined}
      >
        <FortuneVisitContent
          color={color}
          colorLight={colorLight}
          calloutBg="color-mix(in srgb, var(--colors-slot-dinner) 8%, transparent)"
          starRewardLabel="별 조각 +1 획득 가능"
          isExtra={isExtra}
          onVisit={() => {
            dismiss();
            onExternalVisit({ kind: "fortune", time: "dinner" });
          }}
        />
      </FortunePopupShell>,
    );
  };

  return (
    <div
      className={slotCard({ status })}
      style={activeStyle}
      onClick={() => {
        if (isClickable) openDinnerFortuneModal();
      }}
      role={isClickable ? "button" : "presentation"}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={`${label} — ${status}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (isClickable) openDinnerFortuneModal();
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
          <DinnerIcon color="var(--colors-success)" size={36} />
        ) : (
          <DinnerIcon color={iconColor} size={36} />
        )}
      </div>

      <Text className={css({ color: labelColor })} variant="slotTitle">
        {label}
      </Text>

      <Text className={css({ color: sublabelColor })} variant="slotMeta">
        달빛의 기운
      </Text>

      <Text className={css({ color: timeColor })} variant="slotMetaMono">
        18:00 - 23:59
      </Text>

      <div className={divider()} style={dividerStyle} />

      <Text className={css({ color: statusColor })} variant="slotStatus">
        {statusText}
      </Text>
    </div>
  );
}
