"use client";

import { css } from "@/styled/css";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useModal } from "../modal";

export interface PopupProps {
  children: ReactNode;
}

const modalRoot = css({
  position: "fixed",
  inset: "0",
  zIndex: "50",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
});

const backdropStyle = css({
  position: "absolute",
  inset: "0",
  background: "rgba(0,0,0,0.75)",
  backdropFilter: "blur(8px)",
  animation: "fadeIn 200ms ease",
});

const contentStyle = css({
  position: "relative",
  zIndex: 1,
  width: "100%",
  padding: "1.375rem 1.5rem 1.5rem",
  background: "linear-gradient(135deg, #12121A 0%, #1C1C2E 100%)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "var(--radii-xl)",
  overflow: "hidden",
  animation: "scaleIn 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
  boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
});

export function Popup(props: PopupProps) {
  const { children } = props;
  const modal = useModal();

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        modal.closeSelf();
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modal]);

  return (
    <div className={modalRoot}>
      <div
        className={backdropStyle}
        onClick={() => modal.closeSelf()}
        aria-hidden="true"
      />
      <div
        className={contentStyle}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
