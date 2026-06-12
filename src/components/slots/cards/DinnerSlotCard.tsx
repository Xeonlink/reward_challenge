"use client";

import { useModal } from "@/components/modal";
import { Text } from "@/components/ui/Text";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { SlotStatus } from "@/lib/types";
import { universeStore } from "@/lib/universe";
import { css } from "@/styled/css";
import { useMemo } from "react";
import { useStore } from "zustand";
import { CheckIcon, DinnerIcon, LockIcon } from "../SlotIcons";
import { DinnerSlotPopup } from "../popups/DinnerSlotPopup";
import { checkBadge, cornerBadge, divider, iconWrap, slotCard } from "./_style";

export function DinnerSlotCard() {
  const universe = useStore(universeStore);
  const currentTime = useCurrentTime();

  const status = useMemo((): SlotStatus => {
    if (universe.record.dinner) return "completed";
    if (currentTime === "dinner") return "active";
    return "inactive";
  }, [universe.record.dinner, currentTime]);

  const color = "var(--colors-slot-dinner)";
  const colorLight = "var(--colors-slot-dinner-light)";
  const isClickable = !["completed", "inactive", "locked"].includes(status);

  const iconColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked") return "var(--colors-fg-muted)";
    if (status === "inactive") return "var(--colors-fg-muted)";
    if (status === "extra") return "var(--colors-slot-bonus-light)";
    return color;
  }, [status, color]);

  const labelColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked" || status === "inactive")
      return "var(--colors-fg-muted)";
    if (status === "extra") return "var(--colors-slot-bonus-light)";
    return colorLight;
  }, [status, colorLight]);

  const sublabelColor = useMemo(() => {
    if (status === "completed")
      return "color-mix(in srgb, var(--colors-success) 50%, transparent)";
    if (status === "locked" || status === "inactive")
      return "var(--colors-fg-dim)";
    if (status === "extra")
      return "color-mix(in srgb, var(--colors-slot-bonus-light) 50%, transparent)";
    return `color-mix(in srgb, ${color} 44%, transparent)`;
  }, [status, color]);

  const timeColor = useMemo(() => {
    if (status === "locked" || status === "inactive")
      return "var(--colors-fg-dim)";
    return "var(--colors-fg-muted)";
  }, [status]);

  const statusText = useMemo(() => {
    if (status === "completed") return "수령 완료";
    if (status === "locked") return "참여 불가";
    if (status === "inactive") return "비활성";
    if (status === "extra") return "탭하여 참여";
    return "탭하여 수령";
  }, [status]);

  const statusColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked" || status === "inactive")
      return "var(--colors-fg-dim)";
    if (status === "extra") return "var(--colors-slot-bonus)";
    return color;
  }, [status, color]);

  const activeStyle = useMemo(() => {
    if (status === "active") {
      return {
        background: "linear-gradient(145deg, #0E0820 0%, #180C30 100%)",
        borderColor: "transparent",
        boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 27%, transparent), 0 0 28px rgba(155,114,207,0.45), 0 0 65px rgba(155,114,207,0.18)`,
      };
    }
    return undefined;
  }, [status, color]);

  const isExtra = status === "extra";

  const dividerStyle = useMemo(() => {
    if (status === "active" || status === "extra") {
      return {
        background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${isExtra ? "var(--colors-slot-bonus)" : color} 31%, transparent), transparent)`,
      };
    }
    return {
      background: "color-mix(in srgb, var(--colors-border) 40%, transparent)",
    };
  }, [status, color, isExtra]);

  const modal = useModal();

  const openDinnerFortuneModal = () => {
    modal.open(<DinnerSlotPopup />);
  };

  return (
    <button
      className={slotCard({ status })}
      type="button"
      style={activeStyle}
      disabled={!isClickable}
      onClick={openDinnerFortuneModal}
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
        저녁 운세
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
    </button>
  );
}
