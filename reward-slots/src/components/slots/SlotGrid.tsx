"use client";

import React from "react";
import { css } from "../../../styled-system/css";
import { SlotCard } from "./SlotCard";
import { SlotPopup } from "./SlotPopup";
import { RewardPopup } from "./RewardPopup";
import { useSlots } from "@/hooks/useSlots";
import type { SlotKey } from "@/lib/slotLogic";
import { getTimeOfDayLabel } from "@/lib/slotLogic";

interface SlotGridProps {
  testParam?: string | null;
}

const timeLabels: Record<string, { label: string; icon: string }> = {
  morning: { label: "아침", icon: "🌅" },
  lunch: { label: "점심", icon: "☀️" },
  dinner: { label: "저녁", icon: "🌙" },
};

export const SlotGrid: React.FC<SlotGridProps> = ({ testParam }) => {
  const {
    slots,
    currentTime,
    completion,
    allCompleted,
    handleSlotClick,
    handleRewardClaim,
    activePopup,
    closePopup,
    rewardPopup,
    closeRewardPopup,
  } = useSlots(testParam);

  const completedCount = [completion.morning, completion.lunch, completion.dinner].filter(Boolean).length;

  const activeSlotData = activePopup ? slots.find((s) => s.key === activePopup) : null;

  const handleVisitResult = (key: SlotKey, success: boolean) => {
    closePopup();
    // slight delay for UX
    setTimeout(() => {
      if (success) {
        handleRewardClaim(key, true);
      } else {
        handleRewardClaim(key, false);
      }
    }, 300);
  };

  const t = timeLabels[currentTime];

  return (
    <div className={css({ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px", width: "100%" })}>

      {/* Current time indicator */}
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 20px",
          borderRadius: "var(--radii-full)",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
        })}
      >
        <span style={{ fontSize: "1.1rem" }}>{t?.icon}</span>
        <span className={css({ fontSize: "0.8rem", color: "var(--colors-brand-textMuted)", fontFamily: "var(--fonts-mono)" })}>
          현재 시간대:
        </span>
        <span className={css({ fontSize: "0.875rem", fontWeight: "700", color: "var(--colors-brand-gold)", fontFamily: "var(--fonts-display)" })}>
          {t?.label}
        </span>
        {testParam && (
          <span
            className={css({
              fontSize: "0.65rem",
              padding: "2px 8px",
              borderRadius: "var(--radii-full)",
              background: "rgba(255,64,129,0.15)",
              border: "1px solid rgba(255,64,129,0.3)",
              color: "#FF79A8",
              fontWeight: "600",
              letterSpacing: "0.05em",
            })}
          >
            TEST MODE
          </span>
        )}
      </div>

      {/* Progress indicator */}
      <div className={css({ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%", maxWidth: "400px" })}>
        <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" })}>
          <span className={css({ fontSize: "0.75rem", color: "var(--colors-brand-textMuted)" })}>
            오늘의 보상 수령 현황
          </span>
          <span className={css({ fontSize: "0.75rem", fontWeight: "700", fontFamily: "var(--fonts-display)" })}
            style={{ color: completedCount === 3 ? "#FFD700" : "rgba(255,255,255,0.6)" }}
          >
            {completedCount} / 3
          </span>
        </div>
        <div
          className={css({
            width: "100%",
            height: "4px",
            borderRadius: "var(--radii-full)",
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          })}
        >
          <div
            style={{
              height: "100%",
              width: `${(completedCount / 3) * 100}%`,
              background: completedCount === 3
                ? "linear-gradient(90deg, #FFD700, #FF8C00)"
                : "linear-gradient(90deg, #7B5EA7, #00D4AA)",
              borderRadius: "inherit",
              transition: "width 600ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: completedCount === 3
                ? "0 0 12px rgba(255,215,0,0.6)"
                : "0 0 8px rgba(0,212,170,0.4)",
            }}
          />
        </div>
      </div>

      {/* Slot cards */}
      <div
        className={css({
          display: "flex",
          gap: "16px",
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

      {/* All complete message */}
      {allCompleted && (
        <div
          className={css({
            padding: "16px 32px",
            borderRadius: "var(--radii-xl)",
            border: "1px solid rgba(255,215,0,0.3)",
            background: "rgba(255,215,0,0.06)",
            textAlign: "center",
            animation: "slideUp 0.5s ease",
          })}
        >
          <div className={css({ fontSize: "1.5rem", marginBottom: "6px" })}>🏆</div>
          <div className={css({ fontFamily: "var(--fonts-display)", fontSize: "0.875rem", color: "#FFD700", fontWeight: "700" })}>
            오늘의 보상을 모두 수령했습니다!
          </div>
          {!completion.bonus && (
            <div className={css({ fontSize: "0.75rem", color: "var(--colors-brand-textMuted)", marginTop: "4px" })}>
              보너스 슬롯이 해제되었습니다 ✨
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div
        className={css({
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "16px 24px",
          borderRadius: "var(--radii-lg)",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        })}
      >
        {[
          { color: "#7B5EA7", label: "참여 가능" },
          { color: "#00E676", label: "수령 완료" },
          { color: "#FF4081", label: "추가 기회" },
          { color: "#3A3A5A", label: "참여 불가" },
        ].map(({ color, label }) => (
          <div key={label} className={css({ display: "flex", alignItems: "center", gap: "6px" })}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color }} />
            <span className={css({ fontSize: "0.7rem", color: "var(--colors-brand-textMuted)" })}>{label}</span>
          </div>
        ))}
      </div>

      {/* Slot Popup */}
      {activePopup && activeSlotData && (
        <SlotPopup
          slotKey={activePopup}
          isExtra={activeSlotData.isExtra}
          open={true}
          onClose={closePopup}
          onVisit={handleVisitResult}
        />
      )}

      {/* Reward Popup */}
      {rewardPopup && (
        <RewardPopup
          slotKey={rewardPopup.key}
          success={rewardPopup.success}
          open={true}
          onClaim={handleRewardClaim}
        />
      )}
    </div>
  );
};
