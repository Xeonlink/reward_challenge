"use client";

import { CosmicOrb } from "@/components/cosmic-orb/CosmicOrb";
import { useModal } from "@/components/modal";
import { useSlots } from "@/hooks/useSlots";
import {
  getVisitRewardAmount,
  getVisitRewardLabel,
  starsFromDay,
} from "@/lib/slots";
import { css } from "@/styled/css";
import { differenceInDays } from "date-fns";
import { useEffect } from "react";
import { RewardPopup } from "./RewardPopup";
import { BonusSlotCard } from "./cards/BonusSlotCard";
import { DinnerSlotCard } from "./cards/DinnerSlotCard";
import { LunchSlotCard } from "./cards/LunchSlotCard";
import { MorningSlotCard } from "./cards/MorningSlotCard";
import { CycleCompletePopup } from "./sections/CycleCompletePopup";
import { DailyStarsProgress } from "./sections/DailyStarsProgress";
import { SlotsCompleteBanner } from "./sections/SlotsCompleteBanner";

const rootStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2.5rem",
  width: "100%",
});

const heroZoneStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.375rem",
  width: "100%",
});

const serviceGridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "0.75rem",
  width: "100%",
});

interface SlotGridProps {
  testParam?: string | null;
}

export function SlotGrid({ testParam }: SlotGridProps) {
  const modal = useModal();
  const {
    board,
    todayRecord,
    universe,
    allCompleted,
    handleExternalVisit,
    rewardPopup,
    lastStarBornAt,
  } = useSlots(testParam);

  const starsToday = starsFromDay(todayRecord);

  useEffect(() => {
    if (!rewardPopup) return;

    const popup = rewardPopup;
    const dismiss = modal.open(
      <RewardPopup
        slotLabel={getVisitRewardLabel(popup.intent)}
        rewardAmount={getVisitRewardAmount(popup.intent)}
        success={popup.success}
        onClaim={() => {}}
      />,
    );

    return dismiss;
  }, [rewardPopup, modal]);

  useEffect(() => {
    if (differenceInDays(new Date(), universe.cycleStartDate) >= 30) {
      modal.open(<CycleCompletePopup />);
    }
  }, [modal, universe.cycleStartDate]);

  return (
    <div className={rootStyle}>
      <div className={heroZoneStyle}>
        <CosmicOrb
          universe={universe}
          starsToday={starsToday}
          lastStarBornAt={lastStarBornAt}
        />
      </div>

      <div className={serviceGridStyle}>
        <MorningSlotCard
          status={board.morning.status}
          isExtra={board.morning.isExtra}
          onExternalVisit={handleExternalVisit}
        />
        <LunchSlotCard
          status={board.lunch.status}
          isExtra={board.lunch.isExtra}
          onExternalVisit={handleExternalVisit}
        />
        <DinnerSlotCard
          status={board.dinner.status}
          isExtra={board.dinner.isExtra}
          onExternalVisit={handleExternalVisit}
        />
        <BonusSlotCard
          status={board.bonus.status}
          todayRecord={todayRecord}
          isNew={board.bonus.status === "active" && !todayRecord.bonus}
          onExternalVisit={handleExternalVisit}
        />
      </div>

      <DailyStarsProgress starsToday={starsToday} />

      {allCompleted ? <SlotsCompleteBanner todayRecord={todayRecord} /> : null}
    </div>
  );
}
