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
      badge: { width: "10rem", height: "1.875rem", borderRadius: "full" },
      title: { width: "11.5rem", height: "3rem", borderRadius: "0.75rem" },
      subtitle: { width: "7.125rem", height: "1rem", borderRadius: "0.5rem" },
      line: {
        width: "20rem",
        maxWidth: "100%",
        height: "1rem",
        borderRadius: "0.5rem",
      },
      lineShort: {
        width: "15.75rem",
        maxWidth: "90%",
        height: "1rem",
        borderRadius: "0.5rem",
      },
      orb: {
        width: "20rem",
        height: "20rem",
        borderRadius: "50%",
        flexShrink: 0,
      },
      timeBadge: {
        width: "14.25rem",
        height: "2.625rem",
        borderRadius: "full",
      },
      card: { minHeight: "10rem", borderRadius: "lg" },
      progressLabel: { width: "100%", height: "1rem", borderRadius: "0.5rem" },
      progressBar: { width: "100%", height: "0.375rem", borderRadius: "full" },
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
