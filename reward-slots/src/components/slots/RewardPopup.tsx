"use client";

import React from "react";
import { css } from "../../../styled-system/css";
import { Popup } from "../ui/Popup";
import { Button } from "../ui/Button";
import type { SlotKey } from "@/lib/slotLogic";
import { getTimeOfDayLabel } from "@/lib/slotLogic";

interface RewardPopupProps {
  slotKey: SlotKey;
  success: boolean;
  open: boolean;
  onClaim: (key: SlotKey, success: boolean) => void;
}

export const RewardPopup: React.FC<RewardPopupProps> = ({
  slotKey,
  success,
  open,
  onClaim,
}) => {
  const label = getTimeOfDayLabel(slotKey);

  return (
    <Popup
      open={open}
      onClose={() => onClaim(slotKey, success)}
      showClose={false}
      size="sm"
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
          paddingTop: "8px",
        })}
      >
        {/* Big emoji */}
        <div
          className={css({
            fontSize: "4rem",
            lineHeight: "1",
            animation: success ? "starPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" : "slideUp 0.3s ease",
          })}
        >
          {success ? "🎉" : "😔"}
        </div>

        {/* Title */}
        <div>
          <div
            className={css({
              fontFamily: "var(--fonts-display)",
              fontSize: "1.25rem",
              fontWeight: "700",
              marginBottom: "6px",
            })}
            style={{ color: success ? "#FFD700" : "#FF6B6B" }}
          >
            {success ? "보상 획득!" : "조건 미충족"}
          </div>
          <div
            className={css({
              fontSize: "0.875rem",
              color: "var(--colors-brand-textMuted)",
              lineHeight: "1.6",
            })}
          >
            {success ? (
              <>
                <span style={{ color: "#FFD700", fontWeight: "600" }}>{label} 보상</span>을
                성공적으로 수령했습니다!
              </>
            ) : (
              <>
                체류 시간이 부족합니다.
                <br />
                다음에 다시 도전해보세요.
              </>
            )}
          </div>
        </div>

        {/* Reward display */}
        {success && (
          <div
            className={css({
              background: "rgba(255,215,0,0.08)",
              border: "1px solid rgba(255,215,0,0.25)",
              borderRadius: "var(--radii-lg)",
              padding: "14px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            })}
          >
            <div className={css({ fontSize: "0.7rem", color: "var(--colors-brand-textMuted)", textTransform: "uppercase", letterSpacing: "0.1em" })}>
              행운 도장
            </div>
            <div className={css({ fontSize: "2rem", fontFamily: "var(--fonts-display)", fontWeight: "900", color: "#FFD700" })}>
              +1
            </div>
          </div>
        )}

        <Button
          variant={success ? "gold" : "secondary"}
          size="md"
          fullWidth
          onClick={() => onClaim(slotKey, success)}
        >
          {success ? "확인" : "닫기"}
        </Button>
      </div>
    </Popup>
  );
};
