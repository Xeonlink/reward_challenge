"use client";

import React from "react";
import { css } from "../../../styled-system/css";
import { SlotCard } from "./SlotCard";
import { SlotPopup } from "./SlotPopup";
import { RewardPopup } from "./RewardPopup";
import { CosmicOrb } from "./CosmicOrb";
import { useSlots } from "@/hooks/useSlots";
import { countStarsFromCompletion } from "@/lib/slotLogic";

const TIME_LABELS: Record<string, { label: string; color: string }> = {
  morning: { label: "아침", color: "#F4A05A" },
  lunch:   { label: "점심", color: "#50C8E8" },
  dinner:  { label: "저녁", color: "#9B72CF" },
};

interface SlotGridProps {
  testParam?: string | null;
}

export const SlotGrid: React.FC<SlotGridProps> = ({ testParam }) => {
  const {
    slots,
    currentTime,
    completion,
    cycle,
    allCompleted,
    handleSlotClick,
    handleRewardClaim,
    handleExternalVisit,
    handleMockVisit,
    activePopup,
    closePopup,
    rewardPopup,
    closeRewardPopup,
  } = useSlots(testParam);

  const starsToday    = countStarsFromCompletion(completion);
  const activeSlotData = activePopup ? slots.find((s) => s.key === activePopup) : null;
  const t = TIME_LABELS[currentTime];

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "36px",
        width: "100%",
      })}
    >
      {/* 우주 Orb */}
      <CosmicOrb cycle={cycle} starsToday={starsToday} />

      {/* 현재 시간대 표시 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 18px",
          borderRadius: "9999px",
          border: "1px solid rgba(33,44,92,0.7)",
          background: "rgba(12,18,48,0.7)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: t?.color,
            boxShadow: `0 0 6px ${t?.color}`,
            animation: "pulse 2s ease infinite",
          }}
        />
        <span style={{ fontSize: "0.75rem", color: "#6070A8", fontFamily: "'JetBrains Mono', monospace" }}>
          현재 시간대:
        </span>
        <span
          style={{
            fontSize: "0.82rem",
            fontWeight: "700",
            color: t?.color,
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          {t?.label}
        </span>
        {testParam && (
          <span
            style={{
              fontSize: "0.62rem",
              padding: "2px 8px",
              borderRadius: "9999px",
              background: "rgba(232,111,168,0.12)",
              border: "1px solid rgba(232,111,168,0.3)",
              color: "#F4A0C8",
              fontWeight: "600",
            }}
          >
            TEST
          </span>
        )}
      </div>

      {/* 슬롯 카드 */}
      <div
        className={css({
          display: "flex",
          gap: "14px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        })}
      >
        {slots.map((slot) => (
          <SlotCard
            key={slot.key}
            slotKey={slot.key}
            status={slot.status}
            isExtra={slot.isExtra}
            onClick={handleSlotClick}
            isNew={slot.key === "bonus" && !completion.bonus}
          />
        ))}
      </div>

      {/* 오늘의 진행 현황 */}
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.72rem", color: "#6070A8" }}>오늘의 별 조각</span>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: "700",
              fontFamily: "'Orbitron', sans-serif",
              color: starsToday === 4 ? "#FFD166" : "#A8B4F0",
            }}
          >
            {starsToday} / 4
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "5px",
            borderRadius: "9999px",
            background: "rgba(33,44,92,0.5)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(starsToday / 4) * 100}%`,
              background:
                starsToday === 4
                  ? "linear-gradient(90deg, #FFD166, #C589E8, #FFD166)"
                  : "linear-gradient(90deg, #7B8DE0, #C589E8)",
              backgroundSize: starsToday === 4 ? "200% auto" : "auto",
              animation: starsToday === 4 ? "shimmer 2s linear infinite" : undefined,
              borderRadius: "9999px",
              transition: "width 700ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow:
                starsToday === 4
                  ? "0 0 10px rgba(255,209,102,0.6)"
                  : "0 0 6px rgba(123,141,224,0.4)",
            }}
          />
        </div>
      </div>

      {/* 모두 완료 메시지 */}
      {allCompleted && (
        <div
          style={{
            padding: "16px 28px",
            borderRadius: "20px",
            border: "1px solid rgba(255,209,102,0.25)",
            background: "rgba(255,209,102,0.05)",
            textAlign: "center",
            animation: "slideUp 0.5s ease",
          }}
        >
          <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>✨</div>
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.82rem",
              color: "#FFD166",
              fontWeight: "700",
            }}
          >
            오늘의 운세를 모두 확인했어요!
          </div>
          {!completion.bonus && (
            <div style={{ fontSize: "0.72rem", color: "#6070A8", marginTop: "4px" }}>
              별 보너스 슬롯이 해제되었어요
            </div>
          )}
        </div>
      )}

      {/* 범례 */}
      <div
        style={{
          display: "flex",
          gap: "18px",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "14px 22px",
          borderRadius: "16px",
          background: "rgba(12,18,48,0.5)",
          border: "1px solid rgba(21,30,72,0.7)",
        }}
      >
        {[
          { color: "#9B72CF", label: "참여 가능" },
          { color: "#5CE8A0", label: "수령 완료" },
          { color: "#E86FA8", label: "추가 기회" },
          { color: "#2A3060", label: "참여 불가" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 4px ${color}`,
              }}
            />
            <span style={{ fontSize: "0.68rem", color: "#6070A8" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* 슬롯 팝업 */}
      {activePopup && activeSlotData && (
        <SlotPopup
          slotKey={activePopup}
          isExtra={activeSlotData.isExtra}
          open
          onClose={closePopup}
          onExternalVisit={handleExternalVisit}
          onMockVisit={handleMockVisit}
        />
      )}

      {/* 보상 팝업 — handleRewardClaim이 completion 업데이트 + popup 닫기 처리 */}
      {rewardPopup && (
        <RewardPopup
          slotKey={rewardPopup.key}
          success={rewardPopup.success}
          open
          onClaim={handleRewardClaim}
        />
      )}
    </div>
  );
};
