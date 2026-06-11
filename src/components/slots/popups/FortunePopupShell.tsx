"use client";

import { useModal } from "@/components/modal";
import { Popup } from "@/components/ui/Popup";
import { Text } from "@/components/ui/Text";
import { css } from "@/styled/css";
import type { ComponentType, ReactNode } from "react";

const headerStyle = css({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "1rem",
  margin: "-1.375rem -1.5rem 0",
  padding: "1.5rem 1.5rem 0",
});

const popupTitle = css({
  display: "flex",
  alignItems: "center",
  gap: "0.625rem",
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
  fontSize: "md",
  lineHeight: "1",
  _hover: {
    background: "rgba(255,255,255,0.12)",
    color: "fg",
    borderColor: "rgba(255,255,255,0.2)",
  },
});

const accentLine = css({
  height: "0.125rem",
  marginTop: "-1.375rem",
  marginBottom: "1.375rem",
  borderRadius: "0.125rem",
  opacity: 0.8,
});

type FortunePopupShellProps = {
  title: string;
  color: string;
  colorLight: string;
  icon: ComponentType<{ color: string; size?: number }>;
  titlePrefix?: string;
  children: ReactNode;
};

export function FortunePopupShell(props: FortunePopupShellProps) {
  const { title, color, colorLight, icon: Icon, titlePrefix, children } = props;
  const modal = useModal();

  return (
    <Popup>
      <div className={headerStyle}>
        <span className={popupTitle}>
          <Icon color={colorLight} size={28} />
          <Text className={css({ color: colorLight })} variant="slotTitle">
            {titlePrefix}
            {title}
          </Text>
        </span>
        <button
          className={closeButtonStyle}
          type="button"
          onClick={() => modal.closeSelf()}
          aria-label="닫기"
        >
          ✕
        </button>
      </div>
      {/* <div
        className={accentLine}
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      /> */}
      {children}
    </Popup>
  );
}
