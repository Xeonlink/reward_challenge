"use client";

import type { CompletionRecord, SlotStatus, VisitIntent } from "@/lib/slots";
import { useState } from "react";
import { BonusSlotCardFrame } from "../BonusSlotCardFrame";
import { BonusIcon } from "../SlotIcons";
import { BonusLockedPopup } from "../popups/BonusLockedPopup";
import { FortunePopupShell } from "../popups/FortunePopupShell";
import { FortuneVisitContent } from "../popups/FortuneVisitContent";

type BonusSlotCardProps = {
  status: SlotStatus;
  todayRecord: CompletionRecord;
  isNew?: boolean;
  onExternalVisit: (intent: VisitIntent) => void;
};

export function BonusSlotCard(props: BonusSlotCardProps) {
  const { status, todayRecord, isNew, onExternalVisit } = props;
  const [open, setOpen] = useState(false);
  const isLocked = status === "locked";

  return (
    <>
      <BonusSlotCardFrame
        label="별 보너스"
        sublabel="우주의 기운"
        timeLabel="모든 운세 완료 후"
        color="var(--colors-slot-bonus)"
        colorLight="var(--colors-slot-bonus-light)"
        bgActive="linear-gradient(145deg, #1E0812 0%, #280C1A 100%)"
        glow="0 0 28px rgba(232,111,168,0.45), 0 0 65px rgba(232,111,168,0.18)"
        icon={BonusIcon}
        status={status}
        isNew={isNew}
        isClickable={!["completed", "inactive"].includes(status)}
        onPress={() => setOpen(true)}
      />
      {open && isLocked ? (
        <BonusLockedPopup
          todayRecord={todayRecord}
          open
          onClose={() => setOpen(false)}
        />
      ) : null}
      {open && !isLocked ? (
        <FortunePopupShell
          title="우주의 운세"
          color="var(--colors-slot-bonus)"
          colorLight="var(--colors-slot-bonus-light)"
          icon={BonusIcon}
          open
          onClose={() => setOpen(false)}
        >
          <FortuneVisitContent
            color="var(--colors-slot-bonus)"
            colorLight="var(--colors-slot-bonus-light)"
            calloutBg="color-mix(in srgb, var(--colors-slot-bonus) 8%, transparent)"
            starRewardLabel="별 조각 +2 획득 가능"
            onVisit={() => {
              setOpen(false);
              onExternalVisit({ kind: "bonus" });
            }}
          />
        </FortunePopupShell>
      ) : null}
    </>
  );
}
