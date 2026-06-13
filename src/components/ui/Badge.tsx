import StarFragmentIcon from "@/assets/icons/star-fragment.svg";
import { css, cva, cx } from "@/styled/css";
import type { ComponentProps } from "react";

const badge = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.25rem 0.875rem",
    borderRadius: "full",
    background: "color-mix(in srgb, var(--colors-accent) 12%, transparent)",
    border: "1px solid",
    borderColor: "color-mix(in srgb, var(--colors-accent) 28%, transparent)",
    marginBottom: "1.375rem",
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
    fontSize: "sm",
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
        <StarFragmentIcon
          className={css({
            fontSize: "0.875rem",
            color: "var(--colors-accent)",
          })}
        />
      ) : null}
      <span className={badgeLabel()}>{label}</span>
    </div>
  );
}
