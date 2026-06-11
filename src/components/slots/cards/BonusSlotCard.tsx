"use client";

import {
  isSlotClickable,
  type CompletionRecord,
  type SlotKey,
  type SlotStatus,
} from "@/lib/slots";
import { useState } from "react";
import { SlotCardFrame } from "../SlotCardFrame";
import { BonusLockedPopup } from "../popups/BonusLockedPopup";
import { FortuneSlotPopup } from "../popups/FortuneSlotPopup";

type BonusSlotCardProps = {
  status: SlotStatus;
  todayRecord: CompletionRecord;
  isNew?: boolean;
  onExternalVisit: (key: SlotKey) => void;
};

export function BonusSlotCard(props: BonusSlotCardProps) {
  const { status, todayRecord, isNew, onExternalVisit } = props;
  const [open, setOpen] = useState(false);
  const isClickable = isSlotClickable(status, "bonus");
  const isLocked = status === "locked";

  return (
    <>
      <SlotCardFrame
        slotKey="bonus"
        status={status}
        isNew={isNew}
        isClickable={isClickable}
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
        <FortuneSlotPopup
          slotKey="bonus"
          open
          onClose={() => setOpen(false)}
          onVisit={() => {
            setOpen(false);
            onExternalVisit("bonus");
          }}
        />
      ) : null}
    </>
  );
}
