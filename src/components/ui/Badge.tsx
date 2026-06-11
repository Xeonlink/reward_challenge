import { StarFragmentIcon } from "@/components/slots/SlotIcons";
import { cva, cx } from "@/styled/css";
import type { ComponentProps } from "react";

const badge = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "4px 14px",
    borderRadius: "full",
    background: "color-mix(in srgb, var(--colors-accent) 7%, transparent)",
    border: "1px solid",
    borderColor: "color-mix(in srgb, var(--colors-accent) 18%, transparent)",
    marginBottom: "22px",
  },
  variants: {
    variant: {
      gold: {},
    },
  },
  defaultVariants: {
    variant: "gold",
  },
});

const badgeLabel = cva({
  base: {
    fontSize: "0.68rem",
    fontWeight: "700",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "accent",
    fontFamily: "display",
  },
});

type BadgeProps = ComponentProps<"div"> & {
  label: string;
  showIcon?: boolean;
};

export function Badge(props: BadgeProps) {
  const { label, showIcon = true, className, ...rest } = props;

  return (
    <div className={cx(badge(), className)} {...rest}>
      {showIcon ? (
        <StarFragmentIcon color="var(--colors-accent)" size={14} />
      ) : null}
      <span className={badgeLabel()}>{label}</span>
    </div>
  );
}
