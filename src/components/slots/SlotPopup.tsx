"use client";

import type { SlotKey } from "@/lib/slotLogic";
import { css } from "@/styled/css";
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
    color: "#F4A05A",
    light: "#FFCB8A",
    bg: "rgba(244,160,90,0.08)",
    label: "아침 운세",
    fortuneLabel: "새벽의 운세",
  },
  lunch: {
    color: "#50C8E8",
    light: "#8DDFF5",
    bg: "rgba(80,200,232,0.08)",
    label: "정오 운세",
    fortuneLabel: "하늘의 운세",
  },
  dinner: {
    color: "#9B72CF",
    light: "#C3A4EA",
    bg: "rgba(155,114,207,0.08)",
    label: "저녁 운세",
    fortuneLabel: "달빛의 운세",
  },
  bonus: {
    color: "#E86FA8",
    light: "#F4A0C8",
    bg: "rgba(232,111,168,0.08)",
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
        <span
          style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
        >
          <Icon color={c.light} size={28} />
          <span style={{ color: c.light }}>
            {isExtra ? "추가 기회 — " : ""}
            {c.fortuneLabel}
          </span>
        </span>
      }
    >
      {/* 상단 색상 라인 */}
      <div
        style={{
          height: "0.125rem",
          background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`,
          marginTop: "-1.375rem",
          marginBottom: "1.375rem",
          borderRadius: "0.125rem",
          opacity: 0.8,
        }}
      />

      {/* 별 조각 획득 안내 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1rem 1.125rem",
          borderRadius: "1rem",
          background: c.bg,
          border: `1px solid ${c.color}30`,
          marginBottom: "1.25rem",
        }}
      >
        <StarFragmentIcon color={c.color} size={28} />
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: "700",
              color: c.light,
              marginBottom: "0.25rem",
            }}
          >
            별 조각 +1 획득 가능
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--colors-fg-muted)",
              lineHeight: 1.5,
            }}
          >
            {isExtra
              ? "추가 기회는 하루 1회만 사용할 수 있어요."
              : "강남철학관 방문 후 별 조각을 수집하세요."}
          </div>
        </div>
      </div>

      {/* 진행 단계 */}
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginBottom: "1.375rem",
        })}
      >
        {[
          "강남철학관 운세 페이지로 이동",
          "3초 이상 체류하기",
          "돌아와서 별 조각 수령",
        ].map((text, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.75rem",
            }}
          >
            <div
              style={{
                width: "1.75rem",
                height: "1.75rem",
                borderRadius: "50%",
                background: `${c.color}15`,
                border: `1px solid ${c.color}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.625rem",
                fontWeight: "700",
                color: c.light,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <span style={{ color: "var(--colors-fg-muted)" }}>{text}</span>
          </div>
        ))}
      </div>

      {/* 버튼 영역 */}
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "0.625rem",
        })}
      >
        {/* 실제 방문 버튼 */}
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
