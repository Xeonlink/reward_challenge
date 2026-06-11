"use client";

import type { SlotKey } from "@/lib/slotLogic";
import { getTimeOfDayLabel } from "@/lib/slotLogic";
import React from "react";
import { css } from "../../../styled-system/css";
import { Button } from "../ui/Button";
import { Popup } from "../ui/Popup";
import { StarFragmentIcon } from "./SlotIcons";

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
          gap: "18px",
          paddingTop: "8px",
        })}
      >
        {/* 아이콘 영역 */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: success
              ? "radial-gradient(circle, rgba(255,209,102,0.2) 0%, rgba(255,209,102,0.05) 100%)"
              : "radial-gradient(circle, rgba(255,92,122,0.15) 0%, rgba(255,92,122,0.03) 100%)",
            border: success
              ? "1px solid rgba(255,209,102,0.3)"
              : "1px solid rgba(255,92,122,0.25)",
            animation: success
              ? "starBirth 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "scaleIn 0.3s ease",
          }}
        >
          {success ? (
            <StarFragmentIcon color="#FFD166" size={40} />
          ) : (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="#FF5C7A"
                strokeWidth="1.5"
                fill="rgba(255,92,122,0.1)"
              />
              <line
                x1="13"
                y1="13"
                x2="27"
                y2="27"
                stroke="#FF5C7A"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="27"
                y1="13"
                x2="13"
                y2="27"
                stroke="#FF5C7A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        {/* 제목 */}
        <div>
          <div
            className={css({
              fontFamily: "var(--fonts-display)",
              fontSize: "1.2rem",
              fontWeight: "700",
              marginBottom: "6px",
            })}
            style={{ color: success ? "#FFD166" : "#FF5C7A" }}
          >
            {success ? "별 조각 획득!" : "조건 미충족"}
          </div>
          <div
            className={css({
              fontSize: "0.82rem",
              color: "var(--colors-brand-textMuted)",
              lineHeight: "1.6",
            })}
          >
            {success ? (
              <>
                <span style={{ color: "#FFD166", fontWeight: "600" }}>
                  {label} 운세
                </span>
                를 통해 별 조각을 모았어요.
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

        {/* 보상 표시 */}
        {success && (
          <div
            style={{
              background: "rgba(255,209,102,0.07)",
              border: "1px solid rgba(255,209,102,0.22)",
              borderRadius: "16px",
              padding: "14px 28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              className={css({
                fontSize: "0.62rem",
                color: "var(--colors-brand-textMuted)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              })}
            >
              별 조각 획득
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <StarFragmentIcon color="#FFD166" size={28} />
              <span
                className={css({
                  fontSize: "2rem",
                  fontFamily: "var(--fonts-display)",
                  fontWeight: "900",
                  color: "var(--colors-brand-gold)",
                })}
              >
                +1
              </span>
            </div>
            <div
              style={{
                fontSize: "0.68rem",
                color: "rgba(255,209,102,0.5)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              우주 성장에 기여했어요
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
