"use client";

import { Text } from "@/components/ui/Text";
import { Popup } from "@/components/ui/Popup";
import { SLOT_META } from "@/lib/slots";
import type { SlotKey } from "@/lib/slots";
import { css } from "@/styled/css";
import type { ReactNode } from "react";
import { SLOT_ICONS } from "../slotIconMap";

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
  slotKey: SlotKey;
  titlePrefix?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function FortunePopupShell(props: FortunePopupShellProps) {
  const { slotKey, titlePrefix, open, onClose, children } = props;
  const cfg = SLOT_META[slotKey];
  const Icon = SLOT_ICONS[slotKey];

  return (
    <Popup
      open={open}
      onClose={onClose}
      title={
        <span className={popupTitle}>
          <Icon color={cfg.colorLight} size={28} />
          <Text className={css({ color: cfg.colorLight })} variant="slotTitle">
            {titlePrefix}
            {cfg.fortuneLabel}
          </Text>
        </span>
      }
    >
      <div
        className={accentLine}
        style={{
          background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)`,
        }}
      />
      {children}
    </Popup>
  );
}
