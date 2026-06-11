import { cva, cx } from "@/styled/css";
import type { ComponentProps } from "react";

const skeletonPulse = cva({
  base: {
    background: "color-mix(in srgb, var(--colors-border) 45%, transparent)",
    borderRadius: "sm",
    animation: "pulse 1.8s ease-in-out infinite",
  },
});

const skeleton = cva({
  base: {},
  variants: {
    variant: {
      badge: { width: "140px", height: "26px", borderRadius: "full" },
      title: { width: "160px", height: "42px", borderRadius: "10px" },
      subtitle: { width: "100px", height: "14px", borderRadius: "6px" },
      line: {
        width: "280px",
        maxWidth: "100%",
        height: "14px",
        borderRadius: "6px",
      },
      lineShort: {
        width: "220px",
        maxWidth: "90%",
        height: "14px",
        borderRadius: "6px",
      },
      orb: {
        width: "280px",
        height: "280px",
        borderRadius: "50%",
        flexShrink: 0,
      },
      timeBadge: { width: "200px", height: "36px", borderRadius: "full" },
      card: { minHeight: "140px", borderRadius: "lg" },
      progressLabel: { width: "100%", height: "14px", borderRadius: "6px" },
      progressBar: { width: "100%", height: "5px", borderRadius: "full" },
    },
  },
});

type SkeletonVariant = NonNullable<Parameters<typeof skeleton>[0]>["variant"];

type SkeletonProps = ComponentProps<"div"> & {
  variant: SkeletonVariant;
};

export function Skeleton(props: SkeletonProps) {
  const { variant, className, ...rest } = props;

  return (
    <div
      className={cx(skeletonPulse(), skeleton({ variant }), className)}
      {...rest}
    />
  );
}
