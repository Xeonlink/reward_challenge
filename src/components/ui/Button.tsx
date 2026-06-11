"use client";

import { css, cx } from "@/styled/css";
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

const baseStyles = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontFamily: "var(--fonts-body)",
  fontWeight: "600",
  letterSpacing: "0.02em",
  borderRadius: "var(--radii-md)",
  border: "1px solid transparent",
  cursor: "pointer",
  transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  userSelect: "none",
  whiteSpace: "nowrap",
  outline: "none",
  _focus: {
    outline: "2px solid var(--colors-brand-gold)",
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
  "&:hover::before": {
    background: "rgba(255,255,255,0.06)",
  },
  "&:active::before": {
    background: "rgba(255,255,255,0.12)",
  },
});

const variantStyles: Record<ButtonVariant, string> = {
  primary: css({
    background: "linear-gradient(135deg, #7B5EA7 0%, #9B7EC7 100%)",
    color: "white",
    borderColor: "#9B7EC7",
    boxShadow: "0 2px 12px rgba(123,94,167,0.4)",
    _hover: {
      boxShadow: "0 4px 20px rgba(123,94,167,0.6)",
      transform: "translateY(-1px)",
    },
    _active: {
      transform: "translateY(0)",
    },
  }),
  secondary: css({
    background: "var(--colors-brand-surface)",
    color: "var(--colors-brand-text)",
    borderColor: "var(--colors-brand-border)",
    _hover: {
      borderColor: "rgba(255,215,0,0.4)",
      color: "var(--colors-brand-gold)",
    },
  }),
  ghost: css({
    background: "transparent",
    color: "var(--colors-brand-textMuted)",
    _hover: {
      color: "var(--colors-brand-text)",
      background: "rgba(255,255,255,0.05)",
    },
  }),
  danger: css({
    background: "linear-gradient(135deg, #C62828 0%, #E53935 100%)",
    color: "white",
    borderColor: "#E53935",
    boxShadow: "0 2px 12px rgba(229,57,53,0.3)",
    _hover: {
      boxShadow: "0 4px 20px rgba(229,57,53,0.5)",
      transform: "translateY(-1px)",
    },
  }),
  gold: css({
    background:
      "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #DAA520 100%)",
    color: "#0A0A0F",
    borderColor: "#FFD700",
    boxShadow: "0 2px 16px rgba(255,215,0,0.4)",
    fontWeight: "700",
    _hover: {
      boxShadow: "0 4px 24px rgba(255,215,0,0.6), 0 0 40px rgba(255,215,0,0.2)",
      transform: "translateY(-2px)",
    },
    _active: {
      transform: "translateY(0)",
    },
  }),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: css({
    height: "32px",
    paddingInline: "12px",
    fontSize: "0.75rem",
    borderRadius: "var(--radii-sm)",
  }),
  md: css({
    height: "42px",
    paddingInline: "20px",
    fontSize: "0.875rem",
  }),
  lg: css({
    height: "52px",
    paddingInline: "28px",
    fontSize: "1rem",
    borderRadius: "var(--radii-lg)",
  }),
  xl: css({
    height: "64px",
    paddingInline: "36px",
    fontSize: "1.125rem",
    borderRadius: "var(--radii-lg)",
  }),
};

const spinnerStyle = css({
  width: "16px",
  height: "16px",
  border: "2px solid rgba(255,255,255,0.3)",
  borderTopColor: "white",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
  flexShrink: "0",
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? css({ width: "100%" }) : "",
          className,
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span className={spinnerStyle} aria-hidden />
        ) : leftIcon ? (
          <span
            className={css({
              display: "flex",
              alignItems: "center",
              flexShrink: "0",
            })}
          >
            {leftIcon}
          </span>
        ) : null}
        {children && (
          <span className={loading ? css({ opacity: "0.7" }) : ""}>
            {children}
          </span>
        )}
        {!loading && rightIcon && (
          <span
            className={css({
              display: "flex",
              alignItems: "center",
              flexShrink: "0",
            })}
          >
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
