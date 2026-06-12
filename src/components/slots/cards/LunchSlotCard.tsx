"use client";

import { useModal } from "@/components/modal";
import { Text } from "@/components/ui/Text";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useUniverse } from "@/hooks/useUniverse";
import { css, cx } from "@/styled/css";
import { useMemo } from "react";
import { CheckIcon, LunchIcon } from "../SlotIcons";
import { LunchSlotPopup } from "../popups/LunchSlotPopup";
import { checkBadge, cornerBadge, divider, iconWrap, slotCard } from "./_style";

const color = "var(--colors-slot-lunch)";
const colorLight = "var(--colors-slot-lunch-light)";

const SLOT_TITLE = "정오 운세";

export function LunchSlotCard() {
  const record = useUniverse((state) => state.record);
  const currentTime = useCurrentTime();

  const status = useMemo(() => {
    if (record.lunch) return "completed";
    if (currentTime === "morning") return "inactive";
    if (currentTime === "lunch") return "active";
    if (currentTime === "dinner") return "extra";
    return "inactive";
  }, [record.lunch, currentTime]);

  const iconColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "inactive") return "var(--colors-fg-muted)";
    if (status === "extra") return "var(--colors-slot-bonus-light)";
    return color;
  }, [status]);

  const labelColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    if (status === "extra") return "var(--colors-slot-bonus-light)";
    return colorLight;
  }, [status]);

  const sublabelColor = useMemo(() => {
    if (status === "completed")
      return "color-mix(in srgb, var(--colors-success) 50%, transparent)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    if (status === "extra")
      return "color-mix(in srgb, var(--colors-slot-bonus-light) 50%, transparent)";
    return `color-mix(in srgb, ${color} 44%, transparent)`;
  }, [status]);

  const timeColor = useMemo(() => {
    if (status === "inactive") return "var(--colors-fg-dim)";
    return "var(--colors-fg-muted)";
  }, [status]);

  const statusText = useMemo(() => {
    if (status === "completed") return "수령 완료";
    if (status === "inactive") return "비활성";
    if (status === "extra") return "탭하여 참여";
    return "탭하여 수령";
  }, [status]);

  const statusColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    if (status === "extra") return "var(--colors-slot-bonus)";
    return color;
  }, [status]);

  const activeStyle = useMemo(() => {
    if (status === "active") {
      return {
        background: "linear-gradient(145deg, #061420 0%, #0A1E30 100%)",
        borderColor: "transparent",
        boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 27%, transparent), 0 0 28px rgba(80,200,232,0.45), 0 0 65px rgba(80,200,232,0.18)`,
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

  const openLunchFortuneModal = () => {
    modal.open(<LunchSlotPopup />);
  };

  return (
    <button
      className={cx(slotCard({ status }))}
      aria-label={`${SLOT_TITLE} — ${status}`}
      type="button"
      style={activeStyle}
      disabled={["completed", "inactive", "locked"].includes(status)}
      onClick={openLunchFortuneModal}
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
        <LunchIcon color={iconColor} size={36} />
      </div>

      <Text className={css({ color: labelColor })} variant="slotTitle">
        {SLOT_TITLE}
      </Text>

      <Text className={css({ color: sublabelColor })} variant="slotMeta">
        하늘의 기운
      </Text>

      <Text className={css({ color: timeColor })} variant="slotMetaMono">
        12:00 - 17:59
      </Text>

      <div className={cx(divider(), css({ background: dividerBg }))} />

      <Text className={css({ color: statusColor })} variant="slotStatus">
        {statusText}
      </Text>
    </button>
  );
}
