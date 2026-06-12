import { CYCLE_DAY_GOAL, CYCLE_STAR_GOAL } from "@/lib/constants";
import { universeStore } from "@/lib/universe";
import { css, cva } from "@/styled/css";
import { useStore } from "zustand";
import { getOrbStage } from "./CosmicOrb";

const progressLabels = css({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "0.375rem",
});

const progressWrap = css({ width: "14.25rem" });

const progressTrack = css({
  width: "100%",
  height: "0.25rem",
  borderRadius: "full",
  background: "color-mix(in srgb, var(--colors-border) 60%, transparent)",
  overflow: "hidden",
});

const progressFill = cva({
  base: {
    height: "100%",
    borderRadius: "full",
    transition: "width 800ms",
    transitionTimingFunction: "spring",
  },
  variants: {
    stage: {
      high: {
        background: "linear-gradient(90deg, #7B8DE0, #C589E8, #FFD166)",
        boxShadow: "0 0 10px rgba(255,209,102,0.7)",
      },
      low: {
        background: "linear-gradient(90deg, #7B8DE0, #C589E8)",
        boxShadow: "0 0 6px rgba(197,137,232,0.4)",
      },
    },
  },
});

const statSub = css({
  fontSize: "sm",
  color: "fg.muted",
});

export function CosmicOrbProgress() {
  const universe = useStore(universeStore);

  const progress = Math.min(
    Math.round((universe.totalStars / CYCLE_STAR_GOAL) * 100),
    100,
  );
  const stage = getOrbStage(universe.totalStars);

  return (
    <div className={progressWrap}>
      <div className={progressTrack}>
        <div
          className={progressFill({ stage: stage >= 4 ? "high" : "low" })}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={progressLabels}>
        <span className={statSub}>0</span>
        <span className={statSub}>
          {CYCLE_DAY_GOAL}일 목표 {CYCLE_STAR_GOAL}개
        </span>
        <span className={statSub}>{CYCLE_STAR_GOAL}</span>
      </div>
    </div>
  );
}
