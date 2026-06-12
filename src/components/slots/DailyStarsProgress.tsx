"use client";

import { Text } from "@/components/ui/Text";
import { useStarsToday } from "@/hooks/useStarsFromDay";
import { css } from "@/styled/css";

const progressWrapStyle = css({
  width: "100%",
  maxWidth: "27.125rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
});

const progressHeaderStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const progressTrackStyle = css({
  width: "100%",
  height: "0.375rem",
  borderRadius: "full",
  background: "color-mix(in srgb, var(--colors-border) 50%, transparent)",
  overflow: "hidden",
});

export function DailyStarsProgress() {
  const starsToday = useStarsToday();

  return (
    <div className={progressWrapStyle}>
      <div className={progressHeaderStyle}>
        <Text variant="muted">오늘의 별 조각</Text>
        <Text
          className={css({
            fontWeight: "700",
            fontFamily: "display",
            color: starsToday >= 5 ? "accent" : "nebula.light",
          })}
          variant="muted"
        >
          {starsToday} / 5
        </Text>
      </div>
      <div className={progressTrackStyle}>
        <div
          className={css({
            height: "100%",
            borderRadius: "full",
            transition: "width 700ms",
            transitionTimingFunction: "spring",
          })}
          style={{
            width: `${(starsToday / 5) * 100}%`,
            background:
              starsToday >= 5
                ? "linear-gradient(90deg, var(--colors-accent), var(--colors-cosmic), var(--colors-accent))"
                : "linear-gradient(90deg, var(--colors-nebula), var(--colors-cosmic))",
            backgroundSize: starsToday >= 5 ? "200% auto" : "auto",
            animation:
              starsToday >= 5 ? "shimmer 2s linear infinite" : undefined,
            boxShadow:
              starsToday >= 5
                ? "0 0 10px color-mix(in srgb, var(--colors-accent) 60%, transparent)"
                : "0 0 6px color-mix(in srgb, var(--colors-nebula) 40%, transparent)",
          }}
        />
      </div>
    </div>
  );
}
