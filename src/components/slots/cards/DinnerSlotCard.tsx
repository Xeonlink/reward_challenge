"use client";

import type { SlotStatus, VisitIntent } from "@/lib/slots";
import { useState } from "react";
import { FortuneSlotCardFrame } from "../FortuneSlotCardFrame";
import { DinnerIcon } from "../SlotIcons";
import { FortunePopupShell } from "../popups/FortunePopupShell";
import { FortuneVisitContent } from "../popups/FortuneVisitContent";

type DinnerSlotCardProps = {
  status: SlotStatus;
  isExtra?: boolean;
  onExternalVisit: (intent: VisitIntent) => void;
};

export function DinnerSlotCard(props: DinnerSlotCardProps) {
  const { status, isExtra, onExternalVisit } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <FortuneSlotCardFrame
        label="저녁 운세"
        sublabel="달빛의 기운"
        timeLabel="18:00 – 23:59"
        color="var(--colors-slot-dinner)"
        colorLight="var(--colors-slot-dinner-light)"
        bgActive="linear-gradient(145deg, #0E0820 0%, #180C30 100%)"
        glow="0 0 28px rgba(155,114,207,0.45), 0 0 65px rgba(155,114,207,0.18)"
        icon={DinnerIcon}
        status={status}
        isExtra={isExtra}
        isClickable={!["completed", "inactive", "locked"].includes(status)}
        onPress={() => setOpen(true)}
      />
      {open ? (
        <FortunePopupShell
          title="달빛의 운세"
          color="var(--colors-slot-dinner)"
          colorLight="var(--colors-slot-dinner-light)"
          icon={DinnerIcon}
          titlePrefix={isExtra ? "추가 기회 — " : undefined}
          open
          onClose={() => setOpen(false)}
        >
          <FortuneVisitContent
            color="var(--colors-slot-dinner)"
            colorLight="var(--colors-slot-dinner-light)"
            calloutBg="color-mix(in srgb, var(--colors-slot-dinner) 8%, transparent)"
            starRewardLabel="별 조각 +1 획득 가능"
            isExtra={isExtra}
            onVisit={() => {
              setOpen(false);
              onExternalVisit({ kind: "fortune", time: "dinner" });
            }}
          />
        </FortunePopupShell>
      ) : null}
    </>
  );
}
