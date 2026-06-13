import { CosmicOrb } from "@/components/cosmic-orb/CosmicOrb";
import { CosmicOrbProgress } from "@/components/cosmic-orb/CosmicOrbProgress";
import { CosmicOrbStats } from "@/components/cosmic-orb/CosmicOrbStats";
import { DailyStarsProgress } from "@/components/slots/DailyStarsProgress";
import { OnCycleComplete } from "@/components/slots/OnCycleCompleteRender";
import { BonusSlotCard } from "@/components/slots/cards/BonusSlotCard";
import { DinnerSlotCard } from "@/components/slots/cards/DinnerSlotCard";
import { LunchSlotCard } from "@/components/slots/cards/LunchSlotCard";
import { MorningSlotCard } from "@/components/slots/cards/MorningSlotCard";
import { css } from "@/styled/css";

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

export default function Page() {
  return (
    <>
      {/* static compoennt */}
      <OnCycleComplete />

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
    </>
  );
}
