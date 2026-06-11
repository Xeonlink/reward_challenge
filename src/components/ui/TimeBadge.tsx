import { cva, cx } from "@/styled/css";
import type { ComponentProps, CSSProperties } from "react";

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
    background: "var(--time-dot)",
    boxShadow: "0 0 6px var(--time-dot)",
  },
});

const timeLabel = cva({
  base: {
    fontSize: "xs",
    color: "fg.muted",
    fontFamily: "mono",
  },
});

const timeValue = cva({
  base: {
    fontSize: "sm",
    fontWeight: "700",
    fontFamily: "display",
    color: "var(--time-dot)",
  },
});

const testBadge = cva({
  base: {
    fontSize: "2xs",
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
  const {
    slotColor,
    label,
    testMode = false,
    className,
    style,
    ...rest
  } = props;

  const accentStyle = {
    "--time-dot": slotColor,
    ...style,
  } as CSSProperties;

  return (
    <div className={cx(timeBadge(), className)} style={accentStyle} {...rest}>
      <div className={dot()} />
      <span className={timeLabel()}>현재 시간대:</span>
      <span className={timeValue()}>{label}</span>
      {testMode ? <span className={testBadge()}>TEST</span> : null}
    </div>
  );
}
