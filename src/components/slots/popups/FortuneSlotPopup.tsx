"use client";

import type { SlotKey } from "@/lib/slots";
import { FortunePopupShell } from "./FortunePopupShell";
import { FortuneVisitContent } from "./FortuneVisitContent";

type FortuneSlotPopupProps = {
  slotKey: SlotKey;
  isExtra?: boolean;
  open: boolean;
  onClose: () => void;
  onVisit: () => void;
};

export function FortuneSlotPopup(props: FortuneSlotPopupProps) {
  const { slotKey, isExtra, open, onClose, onVisit } = props;

  return (
    <FortunePopupShell
      slotKey={slotKey}
      titlePrefix={isExtra ? "추가 기회 — " : undefined}
      open={open}
      onClose={onClose}
    >
      <FortuneVisitContent slotKey={slotKey} isExtra={isExtra} onVisit={onVisit} />
    </FortunePopupShell>
  );
}
