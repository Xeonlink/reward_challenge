"use client";

import { useModal } from "@/components/modal";
import { Text } from "@/components/ui/Text";
import { SlotStatus } from "@/lib/types";
import { universeStore } from "@/lib/universe";
import { css } from "@/styled/css";
import { useMemo } from "react";
import { useStore } from "zustand";
import { BonusIcon, CheckIcon, LockIcon } from "../SlotIcons";
import { BonusSlotPopup } from "../popups/BonusSlotPopup";
import {
  checkBadge,
  cornerBadge,
  divider,
  iconWrap,
  lockOverlay,
  slotCard,
} from "./_style";

export function BonusSlotCard() {
  const universe = useStore(universeStore);

  const status = useMemo((): SlotStatus => {
    if (universe.record.bonus) return "completed";
    if (
      universe.record.morning &&
      universe.record.lunch &&
      universe.record.dinner
    ) {
      return "active";
    }
    return "locked";
  }, [universe.record]);

  const color = "var(--colors-slot-bonus)";
  const colorLight = "var(--colors-slot-bonus-light)";
  const isLocked = status === "locked";
  const cardStatus = isLocked ? "lockedBonus" : status;
  const isNew = status === "active";
  const isClickable = !["completed", "inactive"].includes(status);

  const iconColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (isLocked) return "var(--colors-slot-bonus-light)";
    if (status === "inactive") return "var(--colors-fg-muted)";
    return color;
  }, [status, isLocked, color]);

  const labelColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (isLocked) return "var(--colors-slot-bonus-light)";
    if (status === "inactive") return "var(--colors-fg-muted)";
    return colorLight;
  }, [status, isLocked, colorLight]);

  const sublabelColor = useMemo(() => {
    if (status === "completed")
      return "color-mix(in srgb, var(--colors-success) 50%, transparent)";
    if (isLocked)
      return "color-mix(in srgb, var(--colors-slot-bonus-light) 50%, transparent)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    return `color-mix(in srgb, ${color} 44%, transparent)`;
  }, [status, isLocked, color]);

  const timeColor = useMemo(() => {
    if (isLocked) return "var(--colors-fg-muted)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    return "var(--colors-fg-muted)";
  }, [status, isLocked]);

  const statusText = useMemo(() => {
    if (status === "completed") return "수령 완료";
    if (isLocked) return "탭하여 조건 확인";
    if (status === "inactive") return "비활성";
    return "탭하여 수령";
  }, [status, isLocked]);

  const statusColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (isLocked) return "var(--colors-slot-bonus)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    return color;
  }, [status, isLocked, color]);

  const activeStyle = useMemo(() => {
    if (status === "active") {
      return {
        background: "linear-gradient(145deg, #1E0812 0%, #280C1A 100%)",
        borderColor: "transparent",
        boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 27%, transparent), 0 0 28px rgba(232,111,168,0.45), 0 0 65px rgba(232,111,168,0.18)`,
      };
    }
    return undefined;
  }, [status, color]);

  const dividerStyle = useMemo(() => {
    if (status === "active" || isLocked) {
      return {
        background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${isLocked ? "var(--colors-slot-bonus)" : color} 31%, transparent), transparent)`,
      };
    }
    return {
      background: "color-mix(in srgb, var(--colors-border) 40%, transparent)",
    };
  }, [status, isLocked, color]);

  const modal = useModal();

  const openBonusModal = () => {
    modal.open(<BonusSlotPopup />);
  };

  return (
    <button
      className={slotCard({ status: cardStatus })}
      type="button"
      style={activeStyle}
      disabled={!isClickable}
      onClick={openBonusModal}
    >
      {status === "completed" ? (
        <div className={checkBadge}>
          <CheckIcon color="var(--colors-success)" size={20} />
        </div>
      ) : null}

      {isNew ? <div className={cornerBadge({ tone: "new" })}>NEW</div> : null}

      <div className={iconWrap({ pulse: status === "active" })}>
        {status === "completed" ? (
          <BonusIcon color="var(--colors-success)" size={36} />
        ) : (
          <>
            <BonusIcon color={iconColor} size={36} />
            {isLocked ? (
              <div className={lockOverlay}>
                <LockIcon color="var(--colors-fg-muted)" size={12} />
              </div>
            ) : null}
          </>
        )}
      </div>

      <Text className={css({ color: labelColor })} variant="slotTitle">
        별 보너스
      </Text>

      <Text className={css({ color: sublabelColor })} variant="slotMeta">
        우주의 기운
      </Text>

      <Text className={css({ color: timeColor })} variant="slotMetaMono">
        모든 운세 완료 후
      </Text>

      <div className={divider()} style={dividerStyle} />

      <Text className={css({ color: statusColor })} variant="slotStatus">
        {statusText}
      </Text>
    </button>
  );
}
