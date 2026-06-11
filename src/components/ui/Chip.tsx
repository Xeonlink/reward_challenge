import { cva, cx } from "@/styled/css";
import type { ComponentProps } from "react";

const chip = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.25rem 0.75rem",
    borderRadius: "full",
    fontSize: "sm",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 200ms",
    border: "1px solid",
    cursor: "pointer",
  },
  variants: {
    active: {
      true: {},
      false: {
        background: "transparent",
        borderColor:
          "color-mix(in srgb, var(--colors-border) 80%, transparent)",
        color: "fg.dim",
      },
    },
    tone: {
      default: {},
      morning: {},
      lunch: {},
      dinner: {},
      test: {
        fontSize: "sm",
        padding: "0.125rem 0.5rem",
        background:
          "color-mix(in srgb, var(--colors-slot-bonus) 12%, transparent)",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-bonus) 30%, transparent)",
        color: "slot.bonusLight",
        fontWeight: "600",
      },
    },
  },
  compoundVariants: [
    {
      active: true,
      tone: "morning",
      css: {
        background:
          "color-mix(in srgb, var(--colors-slot-morning) 9%, transparent)",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-morning) 33%, transparent)",
        color: "slot.morning",
      },
    },
    {
      active: true,
      tone: "lunch",
      css: {
        background:
          "color-mix(in srgb, var(--colors-slot-lunch) 9%, transparent)",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-lunch) 33%, transparent)",
        color: "slot.lunch",
      },
    },
    {
      active: true,
      tone: "dinner",
      css: {
        background:
          "color-mix(in srgb, var(--colors-slot-dinner) 9%, transparent)",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-dinner) 33%, transparent)",
        color: "slot.dinner",
      },
    },
    {
      active: true,
      tone: "default",
      css: {
        background: "transparent",
        borderColor:
          "color-mix(in srgb, var(--colors-border) 60%, transparent)",
        color: "fg.dim",
      },
    },
  ],
  defaultVariants: {
    active: false,
    tone: "default",
  },
});

type ChipTone = NonNullable<Parameters<typeof chip>[0]>["tone"];

type ChipProps = ComponentProps<"a"> & {
  active?: boolean;
  tone?: ChipTone;
};

export function Chip(props: ChipProps) {
  const {
    active = false,
    tone = "default",
    className,
    children,
    ...rest
  } = props;

  return (
    <a className={cx(chip({ active, tone }), className)} {...rest}>
      {children}
    </a>
  );
}
