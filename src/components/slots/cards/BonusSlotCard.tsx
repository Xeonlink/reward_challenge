"use client";

import { useModal } from "@/components/modal";
import { Text } from "@/components/ui/Text";
import { useUniverse } from "@/hooks/useUniverse";
import { SlotStatus } from "@/lib/types";
import { css, cx } from "@/styled/css";
import { useMemo } from "react";
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

const color = "var(--colors-slot-bonus)";
const colorLight = "var(--colors-slot-bonus-light)";

export function BonusSlotCard() {
  const record = useUniverse((state) => state.record);

  const status = useMemo((): SlotStatus => {
    if (record.bonus) return "completed";
    if (record.morning && record.lunch && record.dinner) return "active";
    return "locked";
  }, [record]);

  const cardStatus = status === "locked" ? "lockedBonus" : status;

  const iconColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked") return "var(--colors-slot-bonus-light)";
    if (status === "inactive") return "var(--colors-fg-muted)";
    return color;
  }, [status]);

  const labelColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked") return "var(--colors-slot-bonus-light)";
    if (status === "inactive") return "var(--colors-fg-muted)";
    return colorLight;
  }, [status]);

  const sublabelColor = useMemo(() => {
    if (status === "completed")
      return "color-mix(in srgb, var(--colors-success) 50%, transparent)";
    if (status === "locked")
      return "color-mix(in srgb, var(--colors-slot-bonus-light) 50%, transparent)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    return `color-mix(in srgb, ${color} 44%, transparent)`;
  }, [status]);

  const timeColor = useMemo(() => {
    if (status === "locked") return "var(--colors-fg-muted)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    return "var(--colors-fg-muted)";
  }, [status]);

  const statusText = useMemo(() => {
    if (status === "completed") return "수령 완료";
    if (status === "locked") return "탭하여 조건 확인";
    if (status === "inactive") return "비활성";
    return "탭하여 수령";
  }, [status]);

  const statusColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked") return "var(--colors-slot-bonus)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    return color;
  }, [status]);

  const activeStyle = useMemo(() => {
    if (status === "active") {
      return {
        background: "linear-gradient(145deg, #1E0812 0%, #280C1A 100%)",
        borderColor: "transparent",
        boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 27%, transparent), 0 0 28px rgba(232,111,168,0.45), 0 0 65px rgba(232,111,168,0.18)`,
      };
    }
    return undefined;
  }, [status]);

  const dividerBg = useMemo(() => {
    if (status === "active") {
      return `linear-gradient(90deg, transparent, color-mix(in srgb, ${color} 31%, transparent), transparent)`;
    }
    if (status === "locked") {
      return `linear-gradient(90deg, transparent, color-mix(in srgb, var(--colors-slot-bonus) 31%, transparent), transparent)`;
    }
    return "color-mix(in srgb, var(--colors-border) 40%, transparent)";
  }, [status]);

  const modal = useModal();

  const openBonusModal = () => {
    modal.open(<BonusSlotPopup />);
  };

  return (
    <button
      className={cx(slotCard({ status: cardStatus }))}
      type="button"
      style={activeStyle}
      disabled={["completed", "inactive"].includes(status)}
      onClick={openBonusModal}
    >
      {status === "completed" ? (
        <div className={checkBadge}>
          <CheckIcon color="var(--colors-success)" size={20} />
        </div>
      ) : null}

      {status === "active" ? (
        <div className={cornerBadge({ tone: "new" })}>NEW</div>
      ) : null}

      <div className={iconWrap({ pulse: status === "active" })}>
        <BonusIcon color={iconColor} size={36} />
        {status === "locked" ? (
          <div className={lockOverlay}>
            <LockIcon color="var(--colors-fg-muted)" size={12} />
          </div>
        ) : null}
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

      <div className={cx(divider(), css({ background: dividerBg }))} />

      <Text className={css({ color: statusColor })} variant="slotStatus">
        {statusText}
      </Text>
    </button>
  );
}
