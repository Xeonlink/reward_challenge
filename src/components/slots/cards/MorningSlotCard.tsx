"use client";

import { isSlotClickable, type SlotKey, type SlotStatus } from "@/lib/slots";
import { useState } from "react";
import { SlotCardFrame } from "../SlotCardFrame";
import { FortuneSlotPopup } from "../popups/FortuneSlotPopup";

type MorningSlotCardProps = {
  status: SlotStatus;
  isExtra?: boolean;
  onExternalVisit: (key: SlotKey) => void;
};

export function MorningSlotCard(props: MorningSlotCardProps) {
  const { status, isExtra, onExternalVisit } = props;
  const [open, setOpen] = useState(false);
  const isClickable = isSlotClickable(status, "morning");

  return (
    <>
      <SlotCardFrame
        slotKey="morning"
        status={status}
        isExtra={isExtra}
        isClickable={isClickable}
        onPress={() => setOpen(true)}
      />
      {open ? (
        <FortuneSlotPopup
          slotKey="morning"
          isExtra={isExtra}
          open
          onClose={() => setOpen(false)}
          onVisit={() => {
            setOpen(false);
            onExternalVisit("morning");
          }}
        />
      ) : null}
    </>
  );
}
