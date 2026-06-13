"use client";

import StarFragmentIcon from "@/assets/icons/star-fragment.svg";
import { useStarsToday } from "@/hooks/useStarsFromDay";
import { useUniverse } from "@/hooks/useUniverse";
import { useUniverseAge } from "@/hooks/useUniverseDays";
import { css } from "@/styled/css";

const statsBar = css({
  width: "100%",
  maxWidth: "27.125rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.375rem",
  padding: "0.75rem 1.5rem",
  borderRadius: "full",
  background: "color-mix(in srgb, var(--colors-surface) 80%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-border) 80%, transparent)",
  backdropFilter: "blur(8px)",
});

const statCol = css({
  flex: "1",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.25rem",
});

const statValueRow = css({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
});

const statDivider = css({
  flexShrink: 0,
  width: "0.125rem",
  height: "1.5rem",
  background: "color-mix(in srgb, var(--colors-border) 80%, transparent)",
});

const statLabel = css({
  fontSize: "sm",
  color: "fg.muted",
  letterSpacing: "0.05em",
});

const statValue = css({
  fontSize: "md",
  fontFamily: "display",
  fontWeight: "700",
  color: "fg",
});

const statSub = css({
  fontSize: "sm",
  color: "fg.muted",
});

export function CosmicOrbStats() {
  const totalStars = useUniverse((state) => state.totalStars);
  const universeAge = useUniverseAge();
  const starsToday = useStarsToday();

  return (
    <div className={statsBar}>
      {/* 사이클 */}
      <div className={statCol}>
        <span className={statLabel}>사이클</span>
        <div className={statValueRow}>
          <span className={statValue}>Day {universeAge}</span>
          <span className={statSub}>/ 30</span>
        </div>
      </div>
      <div className={statDivider} />
      {/* 별 조각 */}
      <div className={statCol}>
        <span className={statLabel}>별 조각</span>
        <div className={statValueRow}>
          <StarFragmentIcon className={css({ color: "accent" })} />
          <span className={statValue}>{totalStars}</span>
          <span className={statSub}>개</span>
        </div>
      </div>
      <div className={statDivider} />
      {/* 오늘 */}
      <div className={statCol}>
        <span className={statLabel}>오늘</span>
        <div className={statValueRow}>
          <span className={statValue}>{starsToday}</span>
          <span className={statSub}>/ 5</span>
        </div>
      </div>
    </div>
  );
}
