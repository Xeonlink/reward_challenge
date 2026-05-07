"use client";

import React from "react";
import type { SlotKey, SlotStatus } from "@/lib/slotLogic";
import { MorningIcon, LunchIcon, DinnerIcon, BonusIcon, LockIcon, CheckIcon } from "./SlotIcons";

interface SlotConfig {
  label: string;
  sublabel: string;
  timeLabel: string;
  color: string;
  colorLight: string;
  colorDim: string;
  glow: string;
  bg: string;
  bgActive: string;
  Icon: React.FC<{ color: string; size?: number }>;
}

const SLOT_CONFIGS: Record<SlotKey, SlotConfig> = {
  morning: {
    label: "아침 운세",
    sublabel: "새벽의 기운",
    timeLabel: "00:00 – 11:59",
    color: "#F4A05A",
    colorLight: "#FFCB8A",
    colorDim: "#7A4820",
    glow: "0 0 28px rgba(244,160,90,0.45), 0 0 65px rgba(244,160,90,0.18)",
    bg: "linear-gradient(145deg, #0F0A04 0%, #1A1008 100%)",
    bgActive: "linear-gradient(145deg, #1A1208 0%, #251A0C 100%)",
    Icon: MorningIcon,
  },
  lunch: {
    label: "정오 운세",
    sublabel: "하늘의 기운",
    timeLabel: "12:00 – 17:59",
    color: "#50C8E8",
    colorLight: "#8DDFF5",
    colorDim: "#18607A",
    glow: "0 0 28px rgba(80,200,232,0.45), 0 0 65px rgba(80,200,232,0.18)",
    bg: "linear-gradient(145deg, #030C10 0%, #061420 100%)",
    bgActive: "linear-gradient(145deg, #061420 0%, #0A1E30 100%)",
    Icon: LunchIcon,
  },
  dinner: {
    label: "저녁 운세",
    sublabel: "달빛의 기운",
    timeLabel: "18:00 – 23:59",
    color: "#9B72CF",
    colorLight: "#C3A4EA",
    colorDim: "#3A2060",
    glow: "0 0 28px rgba(155,114,207,0.45), 0 0 65px rgba(155,114,207,0.18)",
    bg: "linear-gradient(145deg, #060410 0%, #0E0820 100%)",
    bgActive: "linear-gradient(145deg, #0E0820 0%, #180C30 100%)",
    Icon: DinnerIcon,
  },
  bonus: {
    label: "별 보너스",
    sublabel: "우주의 기운",
    timeLabel: "모든 운세 완료 후",
    color: "#E86FA8",
    colorLight: "#F4A0C8",
    colorDim: "#7A1848",
    glow: "0 0 28px rgba(232,111,168,0.45), 0 0 65px rgba(232,111,168,0.18)",
    bg: "linear-gradient(145deg, #100408 0%, #1E0812 100%)",
    bgActive: "linear-gradient(145deg, #1E0812 0%, #280C1A 100%)",
    Icon: BonusIcon,
  },
};

export interface SlotCardProps {
  slotKey: SlotKey;
  status: SlotStatus;
  isExtra?: boolean;
  onClick: (key: SlotKey) => void;
  isNew?: boolean;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slotKey, status, isExtra, onClick, isNew }) => {
  const cfg = SLOT_CONFIGS[slotKey];
  const isClickable = status === "active" || status === "extra";

  const handleClick = () => { if (isClickable) onClick(slotKey); };

  // ── 상태별 카드 스타일 ──
  const getCardStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "relative",
      borderRadius: "20px",
      padding: "26px 18px 22px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      cursor: isClickable ? "pointer" : "default",
      transition: "all 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      border: "1px solid",
      overflow: "hidden",
      userSelect: "none",
      minWidth: "148px",
    };

    if (status === "inactive" || status === "locked") {
      return {
        ...base,
        background: "#0A0D20",
        borderColor: "#181E3C",
        opacity: status === "locked" ? 0.32 : 0.45,
        filter: status === "locked" ? "grayscale(0.8)" : "none",
        cursor: status === "locked" ? "not-allowed" : "default",
      };
    }

    if (status === "completed") {
      return {
        ...base,
        background: "linear-gradient(145deg, #061410 0%, #0A1E18 100%)",
        borderColor: "rgba(92,232,160,0.35)",
        opacity: 0.88,
      };
    }

    if (status === "active") {
      return {
        ...base,
        background: cfg.bgActive,
        borderColor: `${cfg.color}45`,
        boxShadow: cfg.glow,
      };
    }

    if (status === "extra") {
      return {
        ...base,
        background: "linear-gradient(145deg, #120820 0%, #1C1030 100%)",
        borderColor: "rgba(232,111,168,0.5)",
        boxShadow: "0 0 28px rgba(232,111,168,0.4), 0 0 65px rgba(232,111,168,0.15)",
      };
    }

    return base;
  };

  const iconColor =
    status === "completed"
      ? "#5CE8A0"
      : status === "locked" || status === "inactive"
      ? "#1A2040"
      : isExtra
      ? "#F4A0C8"
      : cfg.color;

  const labelColor =
    status === "completed"
      ? "#5CE8A0"
      : status === "locked" || status === "inactive"
      ? "#2A3060"
      : isExtra
      ? "#F4A0C8"
      : cfg.colorLight;

  const sublabelColor =
    status === "completed" ? "rgba(92,232,160,0.5)"
    : status === "locked" || status === "inactive" ? "#1A2040"
    : isExtra ? "rgba(244,160,200,0.5)"
    : `${cfg.color}70`;

  const statusText =
    status === "completed" ? "수령 완료"
    : status === "locked"   ? "참여 불가"
    : status === "inactive" ? "비활성"
    : status === "extra"    ? "탭하여 참여"
    : "탭하여 수령";

  const statusColor =
    status === "completed" ? "#5CE8A0"
    : status === "locked"   ? "#2A3060"
    : status === "extra"    ? "#E86FA8"
    : status === "active"   ? cfg.color
    : "#2A3060";

  return (
    <div
      style={getCardStyle()}
      onClick={handleClick}
      role={isClickable ? "button" : "presentation"}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={`${cfg.label} — ${status}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
      onMouseEnter={(e) => {
        if (!isClickable) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-5px) scale(1.025)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "";
      }}
      onMouseDown={(e) => {
        if (!isClickable) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-2px) scale(0.98)";
      }}
      onMouseUp={(e) => {
        if (!isClickable) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-5px) scale(1.025)";
      }}
    >
      {/* 활성 펄스 링 */}
      {(status === "active" || status === "extra") && (
        <div
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: "22px",
            border: `1px solid ${isExtra ? "rgba(232,111,168,0.3)" : `${cfg.color}30`}`,
            animation: "glow 2.5s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
      )}

      {/* 완료 체크 배지 */}
      {status === "completed" && (
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <CheckIcon color="#5CE8A0" size={20} />
        </div>
      )}

      {/* 추가기회 배지 */}
      {isExtra && status === "extra" && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "2px 8px",
            borderRadius: "9999px",
            fontSize: "0.58rem",
            fontWeight: "700",
            letterSpacing: "0.08em",
            background: "rgba(232,111,168,0.18)",
            border: "1px solid rgba(232,111,168,0.5)",
            color: "#F4A0C8",
          }}
        >
          추가기회
        </div>
      )}

      {/* NEW 배지 */}
      {isNew && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "2px 8px",
            borderRadius: "9999px",
            fontSize: "0.58rem",
            fontWeight: "700",
            letterSpacing: "0.08em",
            background: "rgba(255,209,102,0.18)",
            border: "1px solid rgba(255,209,102,0.5)",
            color: "#FFD166",
            animation: "bounce 1.2s ease infinite",
          }}
        >
          NEW
        </div>
      )}

      {/* 아이콘 */}
      <div
        style={{
          position: "relative",
          transition: "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          animation: status === "active" || status === "extra" ? "orbPulse 2.5s ease-in-out infinite" : undefined,
        }}
      >
        {status === "locked" ? (
          <LockIcon color="#1A2040" size={36} />
        ) : status === "completed" ? (
          <cfg.Icon color="#5CE8A0" size={36} />
        ) : (
          <cfg.Icon color={iconColor} size={36} />
        )}
      </div>

      {/* 라벨 */}
      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: "700",
          fontSize: "0.875rem",
          letterSpacing: "0.04em",
          color: labelColor,
          textAlign: "center",
        }}
      >
        {cfg.label}
      </div>

      {/* 서브 라벨 */}
      <div
        style={{
          fontSize: "0.65rem",
          color: sublabelColor,
          fontFamily: "'Noto Sans KR', sans-serif",
          textAlign: "center",
          letterSpacing: "0.02em",
        }}
      >
        {cfg.sublabel}
      </div>

      {/* 시간 라벨 */}
      <div
        style={{
          fontSize: "0.62rem",
          color: "#2A3060",
          fontFamily: "'JetBrains Mono', monospace",
          textAlign: "center",
        }}
      >
        {cfg.timeLabel}
      </div>

      {/* 구분선 */}
      <div
        style={{
          width: "60%",
          height: "1px",
          background: status === "active" || status === "extra"
            ? `linear-gradient(90deg, transparent, ${isExtra ? "#E86FA8" : cfg.color}50, transparent)`
            : "rgba(33,44,92,0.4)",
        }}
      />

      {/* 상태 텍스트 */}
      <div
        style={{
          fontSize: "0.68rem",
          fontWeight: "600",
          color: statusColor,
          textAlign: "center",
          letterSpacing: "0.04em",
        }}
      >
        {statusText}
      </div>
    </div>
  );
};
