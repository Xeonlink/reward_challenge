"use client";

import {
  ProgressLabel,
  ProgressLabelsRow,
  ProgressRoot,
  ProgressTrack,
} from "@/components/Progress";
import { Text } from "@/components/ui/Text";
import { useStarsToday } from "@/hooks/useStarsFromDay";
import { cva } from "@/styled/css";

const dailyCountLabel = cva({
  base: {
    fontSize: "sm",
    fontWeight: "700",
    fontFamily: "display",
  },
  variants: {
    complete: {
      true: { color: "accent" },
      false: { color: "nebula.light" },
    },
  },
});

export function DailyStarsProgress() {
  const starsToday = useStarsToday();
  const complete = starsToday >= 5;

  return (
    <ProgressRoot>
      <ProgressLabelsRow>
        <Text variant="muted">오늘의 별 조각</Text>
        <ProgressLabel className={dailyCountLabel({ complete })} align="right">
          {starsToday} / 5
        </ProgressLabel>
      </ProgressLabelsRow>
      <ProgressTrack
        end={5}
        value={starsToday}
        fillVariant={complete ? "dailyComplete" : "daily"}
      />
    </ProgressRoot>
  );
}
