"use client";

import { Text } from "@/components/ui/Text";
import { css } from "@/styled/css";

const legendStyle = css({
  display: "flex",
  gap: "1.125rem",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: "1rem 1.375rem",
  borderRadius: "1rem",
  background: "color-mix(in srgb, var(--colors-surface) 50%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-border) 70%, transparent)",
});

const LEGEND_ITEMS = [
  { color: "var(--colors-slot-dinner)", label: "참여 가능" },
  { color: "var(--colors-success)", label: "수령 완료" },
  { color: "var(--colors-slot-bonus)", label: "추가 기회" },
  { color: "var(--colors-border)", label: "참여 불가" },
] as const;

export function SlotsLegend() {
  return (
    <div className={legendStyle}>
      {LEGEND_ITEMS.map(({ color, label }) => (
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
          })}
          key={label}
        >
          <div
            className={css({
              width: "0.5rem",
              height: "0.5rem",
              borderRadius: "50%",
            })}
            style={{
              background: color,
              boxShadow: `0 0 4px ${color}`,
            }}
          />
          <Text variant="dim">{label}</Text>
        </div>
      ))}
    </div>
  );
}
