"use client";

import { cva, cx } from "@/styled/css";
import React from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "gold";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const button = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "body",
    fontWeight: "600",
    letterSpacing: "0.02em",
    borderRadius: "md",
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "all 250ms",
    transitionTimingFunction: "smooth",
    position: "relative",
    overflow: "hidden",
    userSelect: "none",
    whiteSpace: "nowrap",
    outline: "none",
    _focus: {
      outline: "2px solid",
      outlineColor: "accent",
      outlineOffset: "2px",
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed",
      pointerEvents: "none",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "0",
      background: "rgba(255,255,255,0)",
      transition: "background 200ms",
    },
    _hover: {
      "&::before": {
        background: "rgba(255,255,255,0.06)",
      },
    },
    _active: {
      "&::before": {
        background: "rgba(255,255,255,0.12)",
      },
    },
  },
  variants: {
    variant: {
      primary: {
        background:
          "linear-gradient(135deg, var(--colors-cosmic) 0%, var(--colors-nebula-light) 100%)",
        color: "white",
        borderColor: "cosmic.light",
        boxShadow: "nebula",
        _hover: {
          transform: "translateY(-1px)",
        },
        _active: {
          transform: "translateY(0)",
        },
      },
      secondary: {
        background: "surface",
        color: "fg",
        borderColor: "border",
        _hover: {
          borderColor:
            "color-mix(in srgb, var(--colors-accent) 40%, transparent)",
          color: "accent",
        },
      },
      ghost: {
        background: "transparent",
        color: "fg.muted",
        _hover: {
          color: "fg",
          background: "rgba(255,255,255,0.05)",
        },
      },
      danger: {
        background: "linear-gradient(135deg, #C62828 0%, #E53935 100%)",
        color: "white",
        borderColor: "#E53935",
        _hover: {
          transform: "translateY(-1px)",
        },
      },
      gold: {
        background:
          "linear-gradient(135deg, var(--colors-accent-dark) 0%, var(--colors-accent) 50%, var(--colors-accent-dark) 100%)",
        color: "bg",
        borderColor: "accent",
        boxShadow: "gold",
        fontWeight: "700",
        _hover: {
          transform: "translateY(-2px)",
        },
        _active: {
          transform: "translateY(0)",
        },
      },
    },
    size: {
      sm: {
        height: "32px",
        paddingInline: "12px",
        fontSize: "xs",
        borderRadius: "sm",
      },
      md: {
        height: "42px",
        paddingInline: "20px",
        fontSize: "sm",
      },
      lg: {
        height: "52px",
        paddingInline: "28px",
        fontSize: "md",
        borderRadius: "lg",
      },
      xl: {
        height: "64px",
        paddingInline: "36px",
        fontSize: "lg",
        borderRadius: "lg",
      },
    },
    fullWidth: {
      true: { width: "100%" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const spinnerStyle = cva({
  base: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    flexShrink: "0",
  },
});

const iconWrap = cva({
  base: {
    display: "flex",
    alignItems: "center",
    flexShrink: "0",
  },
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      className,
      ...rest
    } = props;

    return (
      <button
        className={cx(button({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        {loading ? (
          <span className={spinnerStyle()} aria-hidden />
        ) : leftIcon ? (
          <span className={iconWrap()}>{leftIcon}</span>
        ) : null}
        {children ? (
          <span className={loading ? cva({ base: { opacity: "0.7" } })() : ""}>
            {children}
          </span>
        ) : null}
        {!loading && rightIcon ? (
          <span className={iconWrap()}>{rightIcon}</span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = "Button";
