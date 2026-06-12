"use client";

import {
  ProgressLabel,
  ProgressLabelsRow,
  ProgressRoot,
  ProgressTrack,
} from "@/components/Progress";
import { useUniverse } from "@/hooks/useUniverse";
import { CYCLE_DAY_GOAL, CYCLE_STAR_GOAL } from "@/lib/constants";
import { getOrbStage } from "./CosmicOrb";

export function CosmicOrbProgress() {
  const totalStars = useUniverse((state) => state.totalStars);
  const stage = getOrbStage(totalStars);

  return (
    <ProgressRoot>
      <ProgressTrack
        end={CYCLE_STAR_GOAL}
        value={totalStars}
        fillVariant={stage >= 4 ? "orbHigh" : "orbLow"}
      />
      <ProgressLabelsRow>
        <ProgressLabel align="left">0</ProgressLabel>
        <ProgressLabel align="center">
          {CYCLE_DAY_GOAL}일 목표 {CYCLE_STAR_GOAL}개
        </ProgressLabel>
        <ProgressLabel align="right">{CYCLE_STAR_GOAL}</ProgressLabel>
      </ProgressLabelsRow>
    </ProgressRoot>
  );
}
