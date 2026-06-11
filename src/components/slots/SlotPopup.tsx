"use client";

import { Text } from "@/components/ui/Text";
import type { SlotKey } from "@/lib/slotLogic";
import { css, cva } from "@/styled/css";
import React, { useCallback } from "react";
import { Button } from "../ui/Button";
import { Popup } from "../ui/Popup";
import {
  BonusIcon,
  DinnerIcon,
  LunchIcon,
  MorningIcon,
  StarFragmentIcon,
} from "./SlotIcons";

const SLOT_CFG: Record<
  SlotKey,
  {
    color: string;
    light: string;
    bg: string;
    label: string;
    fortuneLabel: string;
  }
> = {
  morning: {
    color: "var(--colors-slot-morning)",
    light: "var(--colors-slot-morning-light)",
    bg: "color-mix(in srgb, var(--colors-slot-morning) 8%, transparent)",
    label: "아침 운세",
    fortuneLabel: "새벽의 운세",
  },
  lunch: {
    color: "var(--colors-slot-lunch)",
    light: "var(--colors-slot-lunch-light)",
    bg: "color-mix(in srgb, var(--colors-slot-lunch) 8%, transparent)",
    label: "정오 운세",
    fortuneLabel: "하늘의 운세",
  },
  dinner: {
    color: "var(--colors-slot-dinner)",
    light: "var(--colors-slot-dinner-light)",
    bg: "color-mix(in srgb, var(--colors-slot-dinner) 8%, transparent)",
    label: "저녁 운세",
    fortuneLabel: "달빛의 운세",
  },
  bonus: {
    color: "var(--colors-slot-bonus)",
    light: "var(--colors-slot-bonus-light)",
    bg: "color-mix(in srgb, var(--colors-slot-bonus) 8%, transparent)",
    label: "별 보너스",
    fortuneLabel: "우주의 운세",
  },
};

const SLOT_ICON: Record<SlotKey, React.FC<{ color: string; size?: number }>> = {
  morning: MorningIcon,
  lunch: LunchIcon,
  dinner: DinnerIcon,
  bonus: BonusIcon,
};

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

const callout = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "1rem 1.125rem",
  borderRadius: "md",
  border: "1px solid",
  marginBottom: "1.25rem",
});

const calloutTitle = css({
  fontSize: "sm",
  fontWeight: "700",
  marginBottom: "0.25rem",
});

const stepsWrap = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "1.375rem",
});

const stepRow = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  fontSize: "sm",
});

const stepNumber = cva({
  base: {
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "50%",
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "sm",
    fontWeight: "700",
    flexShrink: 0,
  },
});

const buttonWrap = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
});

interface SlotPopupProps {
  slotKey: SlotKey;
  isExtra?: boolean;
  open: boolean;
  onClose: () => void;
  onExternalVisit: (key: SlotKey) => void;
}

export const SlotPopup: React.FC<SlotPopupProps> = ({
  slotKey,
  isExtra,
  open,
  onClose,
  onExternalVisit,
}) => {
  const c = SLOT_CFG[slotKey];
  const Icon = SLOT_ICON[slotKey];

  const handleRealVisit = useCallback(
    () => onExternalVisit(slotKey),
    [onExternalVisit, slotKey],
  );

  return (
    <Popup
      open={open}
      onClose={onClose}
      title={
        <span className={popupTitle}>
          <Icon color={c.light} size={28} />
          <Text className={css({ color: c.light })} variant="slotTitle">
            {isExtra ? "추가 기회 — " : ""}
            {c.fortuneLabel}
          </Text>
        </span>
      }
    >
      {/* runtime: slot-colored gradient line */}
      <div
        className={accentLine}
        style={{
          background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`,
        }}
      />

      <div
        className={callout}
        style={{
          background: c.bg,
          borderColor: `color-mix(in srgb, ${c.color} 19%, transparent)`,
        }}
      >
        <StarFragmentIcon color={c.color} size={28} />
        <div>
          <div className={calloutTitle} style={{ color: c.light }}>
            별 조각 +1 획득 가능
          </div>
          <Text variant="muted">
            {isExtra
              ? "추가 기회는 하루 1회만 사용할 수 있어요."
              : "강남철학관 방문 후 별 조각을 수집하세요."}
          </Text>
        </div>
      </div>

      <div className={stepsWrap}>
        {[
          "강남철학관 운세 페이지로 이동",
          "3초 이상 체류하기",
          "돌아와서 별 조각 수령",
        ].map((text, i) => (
          <div className={stepRow} key={text}>
            <div
              className={stepNumber()}
              style={{
                background: `color-mix(in srgb, ${c.color} 8%, transparent)`,
                borderColor: `color-mix(in srgb, ${c.color} 25%, transparent)`,
                color: c.light,
              }}
            >
              {i + 1}
            </div>
            <Text variant="muted">{text}</Text>
          </div>
        ))}
      </div>

      <div className={buttonWrap}>
        <Button
          variant="gold"
          size="lg"
          fullWidth
          onClick={handleRealVisit}
          leftIcon={<StarFragmentIcon color="#07091A" size={18} />}
        >
          강남철학관 운세 보러 가기
        </Button>
      </div>
    </Popup>
  );
};
