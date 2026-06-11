"use client";

import { isSlotClickable, type SlotKey, type SlotStatus } from "@/lib/slots";
import { useState } from "react";
import { SlotCardFrame } from "../SlotCardFrame";
import { FortuneSlotPopup } from "../popups/FortuneSlotPopup";

type DinnerSlotCardProps = {
  status: SlotStatus;
  isExtra?: boolean;
  onExternalVisit: (key: SlotKey) => void;
};

export function DinnerSlotCard(props: DinnerSlotCardProps) {
  const { status, isExtra, onExternalVisit } = props;
  const [open, setOpen] = useState(false);
  const isClickable = isSlotClickable(status, "dinner");

  return (
    <>
      <SlotCardFrame
        slotKey="dinner"
        status={status}
        isExtra={isExtra}
        isClickable={isClickable}
        onPress={() => setOpen(true)}
      />
      {open ? (
        <FortuneSlotPopup
          slotKey="dinner"
          isExtra={isExtra}
          open
          onClose={() => setOpen(false)}
          onVisit={() => {
            setOpen(false);
            onExternalVisit("dinner");
          }}
        />
      ) : null}
    </>
  );
}
