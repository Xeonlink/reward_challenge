import { cva, cx } from "@/styled/css";
import type { ComponentProps } from "react";

const timeBadge = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.625rem",
    padding: "0.5rem 1.125rem",
    borderRadius: "full",
    border: "1px solid",
    borderColor: "color-mix(in srgb, var(--colors-border) 70%, transparent)",
    background: "color-mix(in srgb, var(--colors-surface) 70%, transparent)",
    backdropFilter: "blur(8px)",
  },
});

const dot = cva({
  base: {
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "50%",
    animation: "pulse 2s ease infinite",
  },
});

const timeLabel = cva({
  base: {
    fontSize: "0.75rem",
    color: "fg.muted",
    fontFamily: "mono",
  },
});

const timeValue = cva({
  base: {
    fontSize: "0.875rem",
    fontWeight: "700",
    fontFamily: "display",
  },
});

const testBadge = cva({
  base: {
    fontSize: "0.625rem",
    padding: "0.125rem 0.5rem",
    borderRadius: "full",
    background: "color-mix(in srgb, var(--colors-slot-bonus) 12%, transparent)",
    border: "1px solid",
    borderColor:
      "color-mix(in srgb, var(--colors-slot-bonus) 30%, transparent)",
    color: "slot.bonusLight",
    fontWeight: "600",
  },
});

type TimeBadgeProps = ComponentProps<"div"> & {
  slotColor: string;
  label: string;
  testMode?: boolean;
};

export function TimeBadge(props: TimeBadgeProps) {
  const { slotColor, label, testMode = false, className, ...rest } = props;

  return (
    <div className={cx(timeBadge(), className)} {...rest}>
      <div
        className={dot()}
        style={{
          background: slotColor,
          boxShadow: `0 0 6px ${slotColor}`,
        }}
      />
      <span className={timeLabel()}>현재 시간대:</span>
      <span className={timeValue()} style={{ color: slotColor }}>
        {label}
      </span>
      {testMode ? <span className={testBadge()}>TEST</span> : null}
    </div>
  );
}
