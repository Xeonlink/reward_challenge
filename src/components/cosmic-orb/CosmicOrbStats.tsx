"use client";

import { Text } from "@/components/ui/Text";
import { getCycleDay, type UniverseRecord } from "@/lib/slots";
import { css, cva } from "@/styled/css";
import type { ReactNode } from "react";
import { StarFragmentIcon } from "../slots/SlotIcons";

const statsBar = css({
  display: "flex",
  alignItems: "center",
  gap: "1.375rem",
  padding: "0.625rem 1.375rem",
  borderRadius: "full",
  background: "color-mix(in srgb, var(--colors-surface) 80%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-border) 80%, transparent)",
  backdropFilter: "blur(8px)",
});

const statCol = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.125rem",
});

const statValueRow = css({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
});

const statDivider = css({
  width: "0.125rem",
  height: "1.5rem",
  background: "color-mix(in srgb, var(--colors-border) 80%, transparent)",
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

const progressLabels = css({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "0.375rem",
});

type CosmicOrbStatsProps = {
  universe: UniverseRecord;
  starsToday: number;
  stage: number;
  progress: number;
};

export function CosmicOrbStats(props: CosmicOrbStatsProps) {
  const { universe, starsToday, stage, progress } = props;

  return (
    <>
      <div className={statsBar}>
        <Stat
          label="사이클"
          value={`Day ${getCycleDay(universe)}`}
          sub="/ 30"
        />
        <div className={statDivider} />
        <Stat
          label="별 조각"
          value={universe.totalStars.toString()}
          sub="개"
          icon={<StarFragmentIcon size={14} color="var(--colors-accent)" />}
        />
        <div className={statDivider} />
        <Stat label="오늘" value={starsToday.toString()} sub="/ 5" />
      </div>

      <div className={progressWrap}>
        <div className={progressTrack}>
          <div
            className={progressFill({ stage: stage >= 4 ? "high" : "low" })}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={progressLabels}>
          <Text variant="statSub">0</Text>
          <Text variant="statSub">30일 목표 150개</Text>
          <Text variant="statSub">150</Text>
        </div>
      </div>
    </>
  );
}

function Stat({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  icon?: ReactNode;
}) {
  return (
    <div className={statCol}>
      <Text variant="statLabel">{label}</Text>
      <div className={statValueRow}>
        {icon}
        <Text variant="statValue">{value}</Text>
        <Text variant="statSub">{sub}</Text>
      </div>
    </div>
  );
}
