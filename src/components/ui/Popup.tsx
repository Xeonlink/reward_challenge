"use client";

import { css } from "@/styled/css";
import { PropsWithChildren, useEffect } from "react";
import { useModal } from "../modal";

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

type Props = PropsWithChildren<{
  backdrop?: true | "noClose";
}>;

export function Popup(props: Props) {
  const { children, backdrop = true } = props;
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

  const handleBackdropClick = () => {
    if (backdrop !== "noClose") {
      modal.closeSelf();
    }
  };

  return (
    <div className={modalRoot}>
      {backdrop ? (
        <div
          className={backdropStyle}
          onClick={handleBackdropClick}
          aria-hidden="true"
          aria-label="dialog backdrop"
        />
      ) : null}

      <div
        className={contentStyle}
        role="dialog"
        aria-modal="true"
        aria-label="dialog content"
      >
        {children}
      </div>
    </div>
  );
}
