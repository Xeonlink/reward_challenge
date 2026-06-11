import { cva, cx } from "@/styled/css";
import type { ComponentProps } from "react";

const text = cva({
  base: {
    fontFamily: "body",
    color: "fg",
  },
  variants: {
    variant: {
      body: { fontSize: "sm" },
      muted: { fontSize: "sm", color: "fg.muted" },
      dim: { fontSize: "sm", color: "fg.dim" },
      caption: { fontSize: "sm", fontFamily: "mono", color: "fg.muted" },
      brand: {
        fontFamily: "display",
        fontSize: "sm",
        fontWeight: "700",
        letterSpacing: "0.12em",
        color: "fg",
      },
      label: {
        fontSize: "sm",
        fontWeight: "700",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "fg.muted",
      },
      subtitle: {
        fontFamily: "display",
        fontSize: "sm",
        color: "fg.muted",
        letterSpacing: "0.25em",
      },
      statLabel: {
        fontSize: "sm",
        color: "fg.muted",
        letterSpacing: "0.05em",
      },
      statValue: {
        fontSize: "md",
        fontFamily: "display",
        fontWeight: "700",
        color: "fg",
      },
      statSub: {
        fontSize: "sm",
        color: "fg.muted",
      },
      slotTitle: {
        fontFamily: "display",
        fontSize: "sm",
        fontWeight: "700",
        letterSpacing: "0.04em",
        textAlign: "center",
      },
      slotMeta: {
        fontSize: "sm",
        textAlign: "center",
        letterSpacing: "0.02em",
      },
      slotMetaMono: {
        fontSize: "sm",
        fontFamily: "mono",
        textAlign: "center",
      },
      slotStatus: {
        fontSize: "sm",
        fontWeight: "600",
        textAlign: "center",
        letterSpacing: "0.04em",
      },
      sectionLabel: {
        fontSize: "sm",
        fontWeight: "700",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "fg.muted",
      },
      stageLabel: {
        fontSize: "sm",
        fontWeight: "600",
        letterSpacing: "0.02em",
      },
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TextVariant = NonNullable<Parameters<typeof text>[0]>["variant"];

type TextProps = ComponentProps<"span"> & {
  variant?: TextVariant;
};

export function Text(props: TextProps) {
  const { variant, className, children, ...rest } = props;

  return (
    <span className={cx(text({ variant }), className)} {...rest}>
      {children}
    </span>
  );
}
