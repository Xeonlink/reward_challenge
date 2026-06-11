"use client";

import { useModal } from "@/components/modal";
import type { CompletionRecord, SlotStatus, VisitIntent } from "@/lib/slots";
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
  const isLocked = status === "locked";
  const modal = useModal();

  const openBonusModal = () => {
    if (["completed", "inactive"].includes(status)) return;

    if (isLocked) {
      modal.open(<BonusLockedPopup todayRecord={todayRecord} />);
      return;
    }

    const dismiss = modal.open(
      <FortunePopupShell
        title="우주의 운세"
        color="var(--colors-slot-bonus)"
        colorLight="var(--colors-slot-bonus-light)"
        icon={BonusIcon}
      >
        <FortuneVisitContent
          color="var(--colors-slot-bonus)"
          colorLight="var(--colors-slot-bonus-light)"
          calloutBg="color-mix(in srgb, var(--colors-slot-bonus) 8%, transparent)"
          starRewardLabel="별 조각 +2 획득 가능"
          onVisit={() => {
            dismiss();
            onExternalVisit({ kind: "bonus" });
          }}
        />
      </FortunePopupShell>,
    );
  };

  return (
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
      onPress={openBonusModal}
    />
  );
}
