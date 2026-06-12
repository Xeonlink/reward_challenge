"use client";

import { useModal } from "@/components/modal";
import { Text } from "@/components/ui/Text";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useUniverse } from "@/hooks/useUniverse";
import { css, cx } from "@/styled/css";
import { useMemo } from "react";
import { CheckIcon, MorningIcon } from "../SlotIcons";
import { MorningSlotPopup } from "../popups/MorningSlotPopup";
import { checkBadge, cornerBadge, divider, iconWrap, slotCard } from "./_style";

const color = "var(--colors-slot-morning)";
const colorLight = "var(--colors-slot-morning-light)";

const SLOT_TITLE = "아침 운세";

export function MorningSlotCard() {
  const record = useUniverse((state) => state.record);
  const currentTime = useCurrentTime();

  const status = useMemo(() => {
    if (record.morning) return "completed";
    if (currentTime === "morning") return "active";
    if (currentTime === "lunch" && record.lunch) return "extra";
    if (currentTime === "dinner") return "locked";
    return "inactive";
  }, [record.morning, record.lunch, currentTime]);

  const iconColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked") return "var(--colors-fg-muted)";
    if (status === "inactive") return "var(--colors-fg-muted)";
    if (status === "extra") return "var(--colors-slot-bonus-light)";
    return color;
  }, [status]);

  const labelColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked") return "var(--colors-fg-muted)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    if (status === "extra") return "var(--colors-slot-bonus-light)";
    return colorLight;
  }, [status]);

  const sublabelColor = useMemo(() => {
    if (status === "completed")
      return "color-mix(in srgb, var(--colors-success) 50%, transparent)";
    if (status === "locked") return "var(--colors-fg-dim)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    if (status === "extra")
      return "color-mix(in srgb, var(--colors-slot-bonus-light) 50%, transparent)";
    return `color-mix(in srgb, ${color} 44%, transparent)`;
  }, [status]);

  const timeColor = useMemo(() => {
    if (status === "locked") return "var(--colors-fg-dim)";
    if (status === "inactive") return "var(--colors-fg-dim)";
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
    if (status === "locked") return "var(--colors-fg-dim)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    if (status === "extra") return "var(--colors-slot-bonus)";
    return color;
  }, [status]);

  const activeStyle = useMemo(() => {
    if (status === "active") {
      return {
        background: "linear-gradient(145deg, #1A1208 0%, #251A0C 100%)",
        borderColor: "transparent",
        boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 27%, transparent), 0 0 28px rgba(244,160,90,0.45), 0 0 65px rgba(244,160,90,0.18)`,
      };
    }
    return undefined;
  }, [status]);

  const dividerBg = useMemo(() => {
    if (status === "active") {
      return `linear-gradient(90deg, transparent, color-mix(in srgb, ${color} 31%, transparent), transparent)`;
    }
    if (status === "extra") {
      return `linear-gradient(90deg, transparent, color-mix(in srgb, var(--colors-slot-bonus) 31%, transparent), transparent)`;
    }
    return "color-mix(in srgb, var(--colors-border) 40%, transparent)";
  }, [status]);

  const modal = useModal();

  const openMorningFortuneModal = () => {
    modal.open(<MorningSlotPopup />);
  };

  return (
    <button
      className={cx(slotCard({ status }))}
      aria-label={`${SLOT_TITLE} — ${status}`}
      type="button"
      style={activeStyle}
      disabled={["completed", "inactive", "locked"].includes(status)}
      onClick={openMorningFortuneModal}
    >
      {status === "completed" ? (
        <div className={checkBadge}>
          <CheckIcon color="var(--colors-success)" size={20} />
        </div>
      ) : null}

      {status === "extra" ? (
        <div className={cornerBadge({ tone: "extra" })}>추가기회</div>
      ) : null}

      <div
        className={iconWrap({
          pulse: status === "active" || status === "extra",
        })}
      >
        <MorningIcon color={iconColor} size={36} />
      </div>

      <Text className={css({ color: labelColor })} variant="slotTitle">
        {SLOT_TITLE}
      </Text>

      <Text className={css({ color: sublabelColor })} variant="slotMeta">
        새벽의 기운
      </Text>

      <Text className={css({ color: timeColor })} variant="slotMetaMono">
        00:00 - 11:59
      </Text>

      <div className={cx(divider(), css({ background: dividerBg }))} />

      <Text className={css({ color: statusColor })} variant="slotStatus">
        {statusText}
      </Text>
    </button>
  );
}
