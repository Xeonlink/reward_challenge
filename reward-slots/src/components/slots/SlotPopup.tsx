"use client";

import React, { useCallback } from "react";
import { css } from "../../../styled-system/css";
import { Popup } from "../ui/Popup";
import { Button } from "../ui/Button";
import type { SlotKey } from "@/lib/slotLogic";
import { getTimeOfDayLabel } from "@/lib/slotLogic";

const SLOT_COLORS: Record<SlotKey, { color: string; light: string; bg: string }> = {
  morning: { color: "#FF6B35", light: "#FF9A6C", bg: "rgba(255,107,53,0.1)" },
  lunch: { color: "#00D4AA", light: "#4DFFD8", bg: "rgba(0,212,170,0.1)" },
  dinner: { color: "#7B5EA7", light: "#A87FD4", bg: "rgba(123,94,167,0.1)" },
  bonus: { color: "#FF4081", light: "#FF79A8", bg: "rgba(255,64,129,0.1)" },
};

const SLOT_ICONS: Record<SlotKey, string> = {
  morning: "🌅",
  lunch: "☀️",
  dinner: "🌙",
  bonus: "⭐",
};

interface SlotPopupProps {
  slotKey: SlotKey;
  isExtra?: boolean;
  open: boolean;
  onClose: () => void;
  onVisit: (key: SlotKey, success: boolean) => void;
}

export const SlotPopup: React.FC<SlotPopupProps> = ({
  slotKey,
  isExtra,
  open,
  onClose,
  onVisit,
}) => {
  const c = SLOT_COLORS[slotKey];
  const label = getTimeOfDayLabel(slotKey);

  const handleVisitSuccess = useCallback(() => {
    onVisit(slotKey, true);
  }, [onVisit, slotKey]);

  const handleVisitFail = useCallback(() => {
    onVisit(slotKey, false);
  }, [onVisit, slotKey]);

  return (
    <Popup
      open={open}
      onClose={onClose}
      title={
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "1.4rem" }}>{SLOT_ICONS[slotKey]}</span>
          <span style={{ color: c.light }}>
            {isExtra ? "추가 기회" : `${label} 보상`} 수령
          </span>
        </span>
      }
    >
      {/* Top accent */}
      <div
        style={{
          height: "3px",
          background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`,
          marginTop: "-20px",
          marginBottom: "20px",
          borderRadius: "2px",
        }}
      />

      {/* Description */}
      <div
        className={css({
          background: "rgba(255,255,255,0.04)",
          borderRadius: "var(--radii-md)",
          padding: "16px",
          marginBottom: "20px",
          border: "1px solid rgba(255,255,255,0.07)",
        })}
      >
        <p
          className={css({
            fontSize: "0.875rem",
            color: "var(--colors-brand-textMuted)",
            lineHeight: "1.7",
          })}
        >
          {isExtra ? (
            <>
              추가 기회 슬롯입니다.{" "}
              <span style={{ color: "#FF79A8", fontWeight: "600" }}>1회만</span> 사용 가능합니다.
              <br />
              외부 페이지에서{" "}
              <span style={{ color: c.light, fontWeight: "600" }}>3초 이상</span> 체류 후
              복귀하면 보상이 지급됩니다.
            </>
          ) : (
            <>
              외부 페이지로 이동합니다.{" "}
              <span style={{ color: c.light, fontWeight: "600" }}>3초 이상</span> 체류 후
              복귀하면 보상이 지급됩니다.
            </>
          )}
        </p>
      </div>

      {/* Steps */}
      <div className={css({ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" })}>
        {["외부 페이지 이동", "3초 이상 체류", "페이지 복귀", "보상 수령"].map((step, i) => (
          <div
            key={i}
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "0.8rem",
              color: "var(--colors-brand-textMuted)",
            })}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: c.bg,
                border: `1px solid ${c.color}50`,
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
            {step}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className={css({ display: "flex", flexDirection: "column", gap: "10px" })}>
        {/* Real visit button */}
        <Button
          variant="gold"
          size="lg"
          fullWidth
          onClick={handleVisitSuccess}
          leftIcon={<span>🚀</span>}
        >
          외부 페이지 방문하기
        </Button>

        {/* Mock test buttons */}
        <div className={css({ display: "flex", gap: "8px" })}>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={handleVisitSuccess}
          >
            ✅ 테스트: 성공
          </Button>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={handleVisitFail}
          >
            ❌ 테스트: 실패
          </Button>
        </div>
        <p
          className={css({
            fontSize: "0.65rem",
            color: "var(--colors-brand-textMuted)",
            textAlign: "center",
          })}
        >
          테스트 버튼은 실제 방문 없이 결과를 시뮬레이션합니다
        </p>
      </div>
    </Popup>
  );
};
