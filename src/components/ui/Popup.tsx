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

      {children}
    </div>
  );
}
