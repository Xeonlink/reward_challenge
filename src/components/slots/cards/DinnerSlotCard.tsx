"use client";

import CheckIcon from "@/assets/icons/check.svg";
import DinnerIcon from "@/assets/icons/dinner.svg";
import { useModal } from "@/components/modal";
import { Text } from "@/components/ui/Text";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useUniverse } from "@/hooks/useUniverse";
import { css, cx } from "@/styled/css";
import { useMemo } from "react";
import { DinnerSlotPopup } from "../popups/DinnerSlotPopup";
import { checkBadge, divider, iconWrap, slotCard } from "./_style";

const color = "var(--colors-slot-dinner)";
const colorLight = "var(--colors-slot-dinner-light)";

const SLOT_TITLE = "저녁 운세";

export function DinnerSlotCard() {
  const record = useUniverse((state) => state.record);
  const currentTime = useCurrentTime();

  const status = useMemo(() => {
    if (record.dinner) return "completed";
    if (currentTime === "morning" || currentTime === "lunch") return "locked";
    if (currentTime === "dinner") return "active";
    return "inactive";
  }, [record.dinner, currentTime]);

  const iconColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked") return "var(--colors-fg-muted)";
    if (status === "inactive") return "var(--colors-fg-muted)";
    return color;
  }, [status]);

  const labelColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked") return "var(--colors-fg-muted)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    return colorLight;
  }, [status]);

  const sublabelColor = useMemo(() => {
    if (status === "completed")
      return "color-mix(in srgb, var(--colors-success) 50%, transparent)";
    if (status === "locked") return "var(--colors-fg-dim)";
    if (status === "inactive") return "var(--colors-fg-dim)";
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
    return "탭하여 수령";
  }, [status]);

  const statusColor = useMemo(() => {
    if (status === "completed") return "var(--colors-success)";
    if (status === "locked") return "var(--colors-fg-dim)";
    if (status === "inactive") return "var(--colors-fg-dim)";
    return color;
  }, [status]);

  const activeStyle = useMemo(() => {
    if (status === "active") {
      return {
        background: "linear-gradient(145deg, #0E0820 0%, #180C30 100%)",
        borderColor: "transparent",
        boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 27%, transparent), 0 0 28px rgba(155,114,207,0.45), 0 0 65px rgba(155,114,207,0.18)`,
      };
    }
    return undefined;
  }, [status]);

  const dividerBg = useMemo(() => {
    if (status === "active") {
      return `linear-gradient(90deg, transparent, color-mix(in srgb, ${color} 31%, transparent), transparent)`;
    }
    return "color-mix(in srgb, var(--colors-border) 40%, transparent)";
  }, [status]);

  const modal = useModal();

  const openDinnerFortuneModal = () => {
    modal.open(<DinnerSlotPopup />);
  };

  return (
    <button
      className={cx(slotCard({ status }))}
      aria-label={`${SLOT_TITLE} — ${status}`}
      type="button"
      style={activeStyle}
      disabled={["completed", "inactive", "locked"].includes(status)}
      onClick={openDinnerFortuneModal}
    >
      {status === "completed" ? (
        <div className={checkBadge}>
          <CheckIcon
            className={css({
              fontSize: "1.25rem",
              color: "var(--colors-success)",
            })}
          />
        </div>
      ) : null}

      <div className={iconWrap({ pulse: status === "active" })}>
        <DinnerIcon
          className={css({ fontSize: "2.25rem", color: iconColor })}
        />
      </div>

      <Text className={css({ color: labelColor })} variant="slotTitle">
        {SLOT_TITLE}
      </Text>

      <Text className={css({ color: sublabelColor })} variant="slotMeta">
        달빛의 기운
      </Text>

      <Text className={css({ color: timeColor })} variant="slotMetaMono">
        18:00 - 23:59
      </Text>

      <div className={cx(divider(), css({ background: dividerBg }))} />

      <Text className={css({ color: statusColor })} variant="slotStatus">
        {statusText}
      </Text>
    </button>
  );
}
