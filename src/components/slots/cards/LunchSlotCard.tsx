"use client";

import type { SlotStatus, VisitIntent } from "@/lib/slots";
import { useState } from "react";
import { FortuneSlotCardFrame } from "../FortuneSlotCardFrame";
import { LunchIcon } from "../SlotIcons";
import { FortunePopupShell } from "../popups/FortunePopupShell";
import { FortuneVisitContent } from "../popups/FortuneVisitContent";

type LunchSlotCardProps = {
  status: SlotStatus;
  isExtra?: boolean;
  onExternalVisit: (intent: VisitIntent) => void;
};

export function LunchSlotCard(props: LunchSlotCardProps) {
  const { status, isExtra, onExternalVisit } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <FortuneSlotCardFrame
        label="정오 운세"
        sublabel="하늘의 기운"
        timeLabel="12:00 – 17:59"
        color="var(--colors-slot-lunch)"
        colorLight="var(--colors-slot-lunch-light)"
        bgActive="linear-gradient(145deg, #061420 0%, #0A1E30 100%)"
        glow="0 0 28px rgba(80,200,232,0.45), 0 0 65px rgba(80,200,232,0.18)"
        icon={LunchIcon}
        status={status}
        isExtra={isExtra}
        isClickable={!["completed", "inactive", "locked"].includes(status)}
        onPress={() => setOpen(true)}
      />
      {open ? (
        <FortunePopupShell
          title="하늘의 운세"
          color="var(--colors-slot-lunch)"
          colorLight="var(--colors-slot-lunch-light)"
          icon={LunchIcon}
          titlePrefix={isExtra ? "추가 기회 — " : undefined}
          open
          onClose={() => setOpen(false)}
        >
          <FortuneVisitContent
            color="var(--colors-slot-lunch)"
            colorLight="var(--colors-slot-lunch-light)"
            calloutBg="color-mix(in srgb, var(--colors-slot-lunch) 8%, transparent)"
            starRewardLabel="별 조각 +1 획득 가능"
            isExtra={isExtra}
            onVisit={() => {
              setOpen(false);
              onExternalVisit({ kind: "fortune", time: "lunch" });
            }}
          />
        </FortunePopupShell>
      ) : null}
    </>
  );
}
