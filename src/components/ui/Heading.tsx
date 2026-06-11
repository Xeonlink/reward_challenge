import { cva, cx } from "@/styled/css";
import type { ComponentProps } from "react";

const heading = cva({
  base: {
    fontFamily: "display",
    fontSize: "clamp(2rem, 6vw, 3.2rem)",
    fontWeight: "900",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    marginBottom: "6px",
  },
});

const gradientText = cva({
  base: {
    backgroundImage:
      "linear-gradient(135deg, var(--colors-accent) 0%, var(--colors-cosmic) 50%, var(--colors-nebula) 100%)",
    backgroundClip: "text",
    color: "transparent",
    backgroundSize: "200% auto",
    animation: "shimmer 4s linear infinite",
  },
});

type HeadingProps = ComponentProps<"h1"> & {
  gradient?: boolean;
};

export function Heading(props: HeadingProps) {
  const { gradient = true, className, children, ...rest } = props;

  return (
    <h1 className={cx(heading(), className)} {...rest}>
      {gradient ? <span className={gradientText()}>{children}</span> : children}
    </h1>
  );
}
