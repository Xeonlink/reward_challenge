"use client";

import { isSlotClickable, type SlotKey, type SlotStatus } from "@/lib/slots";
import { useState } from "react";
import { SlotCardFrame } from "../SlotCardFrame";
import { FortuneSlotPopup } from "../popups/FortuneSlotPopup";

type LunchSlotCardProps = {
  status: SlotStatus;
  isExtra?: boolean;
  onExternalVisit: (key: SlotKey) => void;
};

export function LunchSlotCard(props: LunchSlotCardProps) {
  const { status, isExtra, onExternalVisit } = props;
  const [open, setOpen] = useState(false);
  const isClickable = isSlotClickable(status, "lunch");

  return (
    <>
      <SlotCardFrame
        slotKey="lunch"
        status={status}
        isExtra={isExtra}
        isClickable={isClickable}
        onPress={() => setOpen(true)}
      />
      {open ? (
        <FortuneSlotPopup
          slotKey="lunch"
          isExtra={isExtra}
          open
          onClose={() => setOpen(false)}
          onVisit={() => {
            setOpen(false);
            onExternalVisit("lunch");
          }}
        />
      ) : null}
    </>
  );
}
