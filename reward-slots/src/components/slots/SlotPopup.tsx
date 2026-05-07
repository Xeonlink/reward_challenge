"use client";

import React, { useCallback } from "react";
import { css } from "../../../styled-system/css";
import { Popup } from "../ui/Popup";
import { Button } from "../ui/Button";
import type { SlotKey } from "@/lib/slotLogic";
import { MorningIcon, LunchIcon, DinnerIcon, BonusIcon, StarFragmentIcon } from "./SlotIcons";

const SLOT_CFG: Record<
  SlotKey,
  { color: string; light: string; bg: string; label: string; fortuneLabel: string }
> = {
  morning: { color: "#F4A05A", light: "#FFCB8A", bg: "rgba(244,160,90,0.08)",  label: "아침 운세", fortuneLabel: "새벽의 운세" },
  lunch:   { color: "#50C8E8", light: "#8DDFF5", bg: "rgba(80,200,232,0.08)",   label: "정오 운세", fortuneLabel: "하늘의 운세" },
  dinner:  { color: "#9B72CF", light: "#C3A4EA", bg: "rgba(155,114,207,0.08)",  label: "저녁 운세", fortuneLabel: "달빛의 운세" },
  bonus:   { color: "#E86FA8", light: "#F4A0C8", bg: "rgba(232,111,168,0.08)",  label: "별 보너스",  fortuneLabel: "우주의 운세" },
};

const SLOT_ICON: Record<SlotKey, React.FC<{ color: string; size?: number }>> = {
  morning: MorningIcon,
  lunch:   LunchIcon,
  dinner:  DinnerIcon,
  bonus:   BonusIcon,
};

interface SlotPopupProps {
  slotKey: SlotKey;
  isExtra?: boolean;
  open: boolean;
  onClose: () => void;
  /** 실제 외부 방문: sessionStorage 타임스탬프 저장 후 새 탭 열기 */
  onExternalVisit: (key: SlotKey) => void;
  /** 목업 테스트: 실제 방문 없이 결과 시뮬레이션 → RewardPopup 표시 */
  onMockVisit: (key: SlotKey, success: boolean) => void;
}

export const SlotPopup: React.FC<SlotPopupProps> = ({
  slotKey,
  isExtra,
  open,
  onClose,
  onExternalVisit,
  onMockVisit,
}) => {
  const c = SLOT_CFG[slotKey];
  const Icon = SLOT_ICON[slotKey];

  const handleRealVisit  = useCallback(() => onExternalVisit(slotKey),       [onExternalVisit, slotKey]);
  const handleMockSuccess = useCallback(() => onMockVisit(slotKey, true),    [onMockVisit, slotKey]);
  const handleMockFail    = useCallback(() => onMockVisit(slotKey, false),   [onMockVisit, slotKey]);

  return (
    <Popup
      open={open}
      onClose={onClose}
      title={
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`,
          marginTop: "-20px",
          marginBottom: "20px",
          borderRadius: "1px",
          opacity: 0.8,
        }}
      />

      {/* 별 조각 획득 안내 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 16px",
          borderRadius: "14px",
          background: c.bg,
          border: `1px solid ${c.color}30`,
          marginBottom: "18px",
        }}
      >
        <StarFragmentIcon color={c.color} size={28} />
        <div>
          <div style={{ fontSize: "0.78rem", fontWeight: "700", color: c.light, marginBottom: "3px" }}>
            별 조각 +1 획득 가능
          </div>
          <div style={{ fontSize: "0.72rem", color: "#6070A8", lineHeight: 1.5 }}>
            {isExtra
              ? "추가 기회는 하루 1회만 사용할 수 있어요."
              : "강남철학관 방문 후 별 조각을 수집하세요."}
          </div>
        </div>
      </div>

      {/* 진행 단계 */}
      <div className={css({ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "22px" })}>
        {[
          "강남철학관 운세 페이지로 이동",
          "3초 이상 체류하기",
          "돌아와서 별 조각 수령",
        ].map((text, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.78rem" }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: `${c.color}15`,
                border: `1px solid ${c.color}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.65rem",
                fontWeight: "700",
                color: c.light,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <span style={{ color: "#8090C0" }}>{text}</span>
          </div>
        ))}
      </div>

      {/* 버튼 영역 */}
      <div className={css({ display: "flex", flexDirection: "column", gap: "10px" })}>
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

        {/* 테스트 버튼 */}
        <div className={css({ display: "flex", gap: "8px" })}>
          <Button variant="secondary" size="sm" fullWidth onClick={handleMockSuccess}>
            ✓ 테스트: 성공
          </Button>
          <Button variant="ghost" size="sm" fullWidth onClick={handleMockFail}>
            ✕ 테스트: 실패
          </Button>
        </div>

        <p className={css({ fontSize: "0.62rem", color: "var(--colors-brand-textMuted)", textAlign: "center" })}>
          테스트 버튼은 실제 방문 없이 결과를 시뮬레이션합니다
        </p>
      </div>
    </Popup>
  );
};
