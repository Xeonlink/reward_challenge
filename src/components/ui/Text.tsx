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
      dim: { fontSize: "xs", color: "fg.dim" },
      caption: { fontSize: "xs", fontFamily: "mono", color: "fg.muted" },
      brand: {
        fontFamily: "display",
        fontSize: "0.9rem",
        fontWeight: "700",
        letterSpacing: "0.12em",
        color: "fg",
      },
      label: {
        fontSize: "0.65rem",
        fontWeight: "700",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "fg.dim",
      },
      subtitle: {
        fontFamily: "display",
        fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
        color: "fg.dim",
        letterSpacing: "0.25em",
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
