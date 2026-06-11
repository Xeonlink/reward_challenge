"use client";

import { TimeBadge } from "@/components/ui/TimeBadge";
import { useSlots } from "@/hooks/useSlots";
import { getTimeOfDayLabel, SLOT_META, starsFromDay } from "@/lib/slots";
import { css } from "@/styled/css";
import { BonusSlotCard } from "./cards/BonusSlotCard";
import { DinnerSlotCard } from "./cards/DinnerSlotCard";
import { LunchSlotCard } from "./cards/LunchSlotCard";
import { MorningSlotCard } from "./cards/MorningSlotCard";
import { CosmicOrb } from "@/components/cosmic-orb/CosmicOrb";
import { RewardPopup } from "./RewardPopup";
import { CycleCompletePopup } from "./sections/CycleCompletePopup";
import { DailyStarsProgress } from "./sections/DailyStarsProgress";
import { SlotsCompleteBanner } from "./sections/SlotsCompleteBanner";
import { SlotsLegend } from "./sections/SlotsLegend";

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
  const {
    slots,
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
  const slotByKey = Object.fromEntries(slots.map((s) => [s.key, s]));

  return (
    <div className={rootStyle}>
      <div className={heroZoneStyle}>
        <CosmicOrb
          universe={universe}
          starsToday={starsToday}
          lastStarBornAt={lastStarBornAt}
        />

        <TimeBadge
          slotColor={SLOT_META[currentTime].color}
          label={getTimeOfDayLabel(currentTime)}
          testMode={Boolean(testParam)}
        />
      </div>

      <div className={serviceGridStyle}>
        <MorningSlotCard
          status={slotByKey.morning.status}
          isExtra={slotByKey.morning.isExtra}
          onExternalVisit={handleExternalVisit}
        />
        <LunchSlotCard
          status={slotByKey.lunch.status}
          isExtra={slotByKey.lunch.isExtra}
          onExternalVisit={handleExternalVisit}
        />
        <DinnerSlotCard
          status={slotByKey.dinner.status}
          isExtra={slotByKey.dinner.isExtra}
          onExternalVisit={handleExternalVisit}
        />
        <BonusSlotCard
          status={slotByKey.bonus.status}
          todayRecord={todayRecord}
          isNew={
            slotByKey.bonus.status === "active" && !todayRecord.bonus
          }
          onExternalVisit={handleExternalVisit}
        />
      </div>

      <DailyStarsProgress starsToday={starsToday} />

      {allCompleted ? <SlotsCompleteBanner todayRecord={todayRecord} /> : null}

      <SlotsLegend />

      {rewardPopup ? (
        <RewardPopup
          slotKey={rewardPopup.key}
          success={rewardPopup.success}
          open
          onClaim={handleRewardClaim}
        />
      ) : null}

      <CycleCompletePopup
        open={cycleCompletePopup}
        onClose={closeCycleCompletePopup}
      />
    </div>
  );
}
