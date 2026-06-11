"use client";

import { Popup } from "@/components/ui/Popup";
import { Text } from "@/components/ui/Text";
import { css } from "@/styled/css";
import type { ComponentType, ReactNode } from "react";

const popupTitle = css({
  display: "flex",
  alignItems: "center",
  gap: "0.625rem",
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
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function FortunePopupShell(props: FortunePopupShellProps) {
  const {
    title,
    color,
    colorLight,
    icon: Icon,
    titlePrefix,
    open,
    onClose,
    children,
  } = props;

  return (
    <Popup
      open={open}
      onClose={onClose}
      title={
        <span className={popupTitle}>
          <Icon color={colorLight} size={28} />
          <Text className={css({ color: colorLight })} variant="slotTitle">
            {titlePrefix}
            {title}
          </Text>
        </span>
      }
    >
      <div
        className={accentLine}
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
      {children}
    </Popup>
  );
}
