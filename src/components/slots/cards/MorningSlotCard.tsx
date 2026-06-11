"use client";

import type { SlotStatus, VisitIntent } from "@/lib/slots";
import { useState } from "react";
import { FortuneSlotCardFrame } from "../FortuneSlotCardFrame";
import { MorningIcon } from "../SlotIcons";
import { FortunePopupShell } from "../popups/FortunePopupShell";
import { FortuneVisitContent } from "../popups/FortuneVisitContent";

type MorningSlotCardProps = {
  status: SlotStatus;
  isExtra?: boolean;
  onExternalVisit: (intent: VisitIntent) => void;
};

export function MorningSlotCard(props: MorningSlotCardProps) {
  const { status, isExtra, onExternalVisit } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <FortuneSlotCardFrame
        label="아침 운세"
        sublabel="새벽의 기운"
        timeLabel="00:00 – 11:59"
        color="var(--colors-slot-morning)"
        colorLight="var(--colors-slot-morning-light)"
        bgActive="linear-gradient(145deg, #1A1208 0%, #251A0C 100%)"
        glow="0 0 28px rgba(244,160,90,0.45), 0 0 65px rgba(244,160,90,0.18)"
        icon={MorningIcon}
        status={status}
        isExtra={isExtra}
        isClickable={!["completed", "inactive", "locked"].includes(status)}
        onPress={() => setOpen(true)}
      />
      {open ? (
        <FortunePopupShell
          title="새벽의 운세"
          color="var(--colors-slot-morning)"
          colorLight="var(--colors-slot-morning-light)"
          icon={MorningIcon}
          titlePrefix={isExtra ? "추가 기회 — " : undefined}
          open
          onClose={() => setOpen(false)}
        >
          <FortuneVisitContent
            color="var(--colors-slot-morning)"
            colorLight="var(--colors-slot-morning-light)"
            calloutBg="color-mix(in srgb, var(--colors-slot-morning) 8%, transparent)"
            starRewardLabel="별 조각 +1 획득 가능"
            isExtra={isExtra}
            onVisit={() => {
              setOpen(false);
              onExternalVisit({ kind: "fortune", time: "morning" });
            }}
          />
        </FortunePopupShell>
      ) : null}
    </>
  );
}
