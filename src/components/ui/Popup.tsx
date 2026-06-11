"use client";

import { css, cx } from "@/styled/css";
import React, { useEffect, useRef } from "react";

export interface PopupProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  closeOnBackdrop?: boolean;
  showClose?: boolean;
  className?: string;
}

const backdropStyle = css({
  position: "fixed",
  inset: "0",
  zIndex: "50",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  background: "rgba(0,0,0,0.75)",
  backdropFilter: "blur(8px)",
  animation: "fadeIn 200ms ease",
});

const dialogSizes = {
  sm: css({ maxWidth: "25.75rem" }),
  md: css({ maxWidth: "34.25rem" }),
  lg: css({ maxWidth: "42.875rem" }),
};

const dialogStyle = css({
  width: "100%",
  background: "linear-gradient(135deg, #12121A 0%, #1C1C2E 100%)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "var(--radii-xl)",
  overflow: "hidden",
  animation: "scaleIn 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
  boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
  position: "relative",
});

const headerStyle = css({
  padding: "1.5rem 1.5rem 0",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "1rem",
});

const titleStyle = css({
  fontFamily: "display",
  fontSize: "1.125rem",
  fontWeight: "700",
  color: "fg",
  lineHeight: "1.3",
});

const closeButtonStyle = css({
  flexShrink: "0",
  width: "2.25rem",
  height: "2.25rem",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "fg.muted",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 200ms",
  fontSize: "1rem",
  lineHeight: "1",
  _hover: {
    background: "rgba(255,255,255,0.12)",
    color: "fg",
    borderColor: "rgba(255,255,255,0.2)",
  },
});

const bodyStyle = css({
  padding: "1.375rem 1.5rem 1.5rem",
});

export const Popup: React.FC<PopupProps> = ({
  open,
  onClose,
  title,
  children,
  size = "md",
  closeOnBackdrop = true,
  showClose = true,
  className,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={backdropStyle}
      onClick={closeOnBackdrop ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === "string" ? title : "팝업"}
    >
      <div
        className={cx(dialogStyle, dialogSizes[size], className)}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showClose) && (
          <div className={headerStyle}>
            {title && <div className={titleStyle}>{title}</div>}
            {showClose && (
              <button
                className={closeButtonStyle}
                onClick={onClose}
                aria-label="닫기"
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div className={bodyStyle}>{children}</div>
      </div>
    </div>
  );
};
