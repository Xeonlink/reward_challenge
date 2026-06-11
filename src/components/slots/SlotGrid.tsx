"use client";

import { CosmicOrb } from "@/components/cosmic-orb/CosmicOrb";
import { TimeBadge } from "@/components/ui/TimeBadge";
import { useSlots } from "@/hooks/useSlots";
import {
  getTimeOfDayLabel,
  getVisitRewardAmount,
  getVisitRewardLabel,
  starsFromDay,
  type TimeOfDay,
} from "@/lib/slots";
import { css } from "@/styled/css";
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

function timeBadgeColor(currentTime: TimeOfDay): string {
  if (currentTime === "morning") return "var(--colors-slot-morning)";
  if (currentTime === "lunch") return "var(--colors-slot-lunch)";
  return "var(--colors-slot-dinner)";
}

export function SlotGrid({ testParam }: SlotGridProps) {
  const {
    board,
    currentTime,
    todayRecord,
    universe,
    allCompleted,
    handleRewardClaim,
    handleExternalVisit,
    rewardPopup,
    cycleCompletePopup,
    closeCycleCompletePopup,
    lastStarBornAt,
  } = useSlots(testParam);

  const starsToday = starsFromDay(todayRecord);

  return (
    <div className={rootStyle}>
      <div className={heroZoneStyle}>
        <CosmicOrb
          universe={universe}
          starsToday={starsToday}
          lastStarBornAt={lastStarBornAt}
        />

        <TimeBadge
          slotColor={timeBadgeColor(currentTime)}
          label={getTimeOfDayLabel(currentTime)}
          testMode={Boolean(testParam)}
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

      {rewardPopup ? (
        <RewardPopup
          slotLabel={getVisitRewardLabel(rewardPopup.intent)}
          rewardAmount={getVisitRewardAmount(rewardPopup.intent)}
          success={rewardPopup.success}
          open
          onClaim={() =>
            handleRewardClaim(rewardPopup.intent, rewardPopup.success)
          }
        />
      ) : null}

      <CycleCompletePopup
        open={cycleCompletePopup}
        onClose={closeCycleCompletePopup}
      />
    </div>
  );
}
