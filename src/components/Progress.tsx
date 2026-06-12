import { css, cva, cx } from "@/styled/css";
import type { ComponentProps, ReactNode } from "react";

/**
 * ProgressRoot
 */

type ProgressRootProps = ComponentProps<"div"> & {
  children: ReactNode;
};

const progressRoot = css({
  width: "100%",
  maxWidth: "27.125rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
});

export function ProgressRoot({
  children,
  className,
  ...rest
}: ProgressRootProps) {
  return (
    <div className={cx(progressRoot, className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * ProgressLabelsRow
 */

type ProgressLabelsRowProps = ComponentProps<"div"> & {
  children: ReactNode;
};

export function ProgressLabelsRow({
  children,
  className,
  ...rest
}: ProgressLabelsRowProps) {
  return (
    <div className={cx(css({ display: "flex" }), className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * ProgressTrack
 */

type ProgressTrackProps = ComponentProps<"div"> & {
  end: number;
  value: number;
  fillVariant: NonNullable<typeof progressFill.__type.variant>;
  start?: number;
  step?: number;
};

const progressTrack = css({
  width: "100%",
  height: "0.375rem",
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
    variant: {
      orbLow: {
        background: "linear-gradient(90deg, #7B8DE0, #C589E8)",
        boxShadow: "0 0 6px rgba(197,137,232,0.4)",
      },
      orbHigh: {
        background: "linear-gradient(90deg, #7B8DE0, #C589E8, #FFD166)",
        boxShadow: "0 0 10px rgba(255,209,102,0.7)",
      },
      daily: {
        background:
          "linear-gradient(90deg, var(--colors-nebula), var(--colors-cosmic))",
        boxShadow:
          "0 0 6px color-mix(in srgb, var(--colors-nebula) 40%, transparent)",
        transitionDuration: "700ms",
      },
      dailyComplete: {
        background:
          "linear-gradient(90deg, var(--colors-accent), var(--colors-cosmic), var(--colors-accent))",
        backgroundSize: "200% auto",
        animation: "shimmer 2s linear infinite",
        boxShadow:
          "0 0 10px color-mix(in srgb, var(--colors-accent) 60%, transparent)",
        transitionDuration: "700ms",
      },
    },
  },
});

export function ProgressTrack({
  end,
  value,
  fillVariant,
  start = 0,
  className,
  ...rest
}: ProgressTrackProps) {
  const range = end - start;
  const percent =
    range <= 0
      ? 0
      : Math.min(Math.max(((value - start) / range) * 100, 0), 100);

  return (
    <div
      className={cx(progressTrack, className)}
      role="progressbar"
      aria-valuemin={start}
      aria-valuemax={end}
      aria-valuenow={value}
      aria-valuetext={`${value}`}
      {...rest}
    >
      <div
        className={progressFill({ variant: fillVariant })}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

/**
 * ProgressLabel
 */

type ProgressLabelProps = ComponentProps<"span"> & {
  align: "left" | "center" | "right";
};

const progressLabel = cva({
  base: {
    fontSize: "sm",
    color: "fg.muted",
  },
  variants: {
    align: {
      left: {},
      center: {
        flex: 1,
        textAlign: "center",
      },
      right: {
        marginLeft: "auto",
      },
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export function ProgressLabel({
  children,
  className,
  align = "left",
  ...rest
}: ProgressLabelProps) {
  return (
    <span className={cx(progressLabel({ align }), className)} {...rest}>
      {children}
    </span>
  );
}
