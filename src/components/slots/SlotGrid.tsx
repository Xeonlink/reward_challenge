"use client";

import { CosmicOrb } from "@/components/cosmic-orb/CosmicOrb";
import { useModal } from "@/components/modal";
import { useUniverse } from "@/hooks/useUniverse";
import { useUniverseAge } from "@/hooks/useUniverseDays";
import { CYCLE_DAY_GOAL, CYCLE_STAR_GOAL } from "@/lib/constants";
import { css } from "@/styled/css";
import { useEffect } from "react";
import { CosmicOrbProgress } from "../cosmic-orb/CosmicOrbProgress";
import { CosmicOrbStats } from "../cosmic-orb/CosmicOrbStats";
import { DailyStarsProgress } from "./DailyStarsProgress";
import { BonusSlotCard } from "./cards/BonusSlotCard";
import { DinnerSlotCard } from "./cards/DinnerSlotCard";
import { LunchSlotCard } from "./cards/LunchSlotCard";
import { MorningSlotCard } from "./cards/MorningSlotCard";
import { CycleCompletePopup } from "./popups/CycleCompletePopup";

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

export function SlotGrid() {
  const modal = useModal();
  const universeAge = useUniverseAge();
  const totalStars = useUniverse((state) => state.totalStars);

  useEffect(() => {
    if (universeAge >= CYCLE_DAY_GOAL && totalStars >= CYCLE_STAR_GOAL) {
      modal.open(<CycleCompletePopup />);
    }
  }, [modal, universeAge, totalStars]);

  return (
    <div className={rootStyle}>
      <div className={heroZoneStyle}>
        <CosmicOrb />
        <CosmicOrbStats />
        <CosmicOrbProgress />
      </div>

      <div className={serviceGridStyle}>
        <MorningSlotCard />
        <LunchSlotCard />
        <DinnerSlotCard />
        <BonusSlotCard />
      </div>

      <DailyStarsProgress />
    </div>
  );
}
