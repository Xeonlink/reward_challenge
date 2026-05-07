"use client";

import React from "react";
import { getOrbStage, type CycleRecord } from "@/lib/slotLogic";
import { StarFragmentIcon } from "./SlotIcons";

interface OrbConfig {
  size: number;
  bg: string;
  glow: string;
  ringColor: string;
  label: string;
  labelColor: string;
  particleColor: string | null;
  particleCount: number;
}

const ORB: Record<1 | 2 | 3 | 4 | 5, OrbConfig> = {
  1: {
    size: 64,
    bg: "radial-gradient(circle at 38% 32%, #1E2456 0%, #0C1030 55%, #070918 100%)",
    glow: "0 0 12px rgba(100,120,200,0.1)",
    ringColor: "transparent",
    label: "별이 태어나고 있어요",
    labelColor: "#3A4870",
    particleColor: null,
    particleCount: 0,
  },
  2: {
    size: 80,
    bg: "radial-gradient(circle at 38% 32%, #3A4A9A 0%, #1A2060 45%, #0C1030 100%)",
    glow: "0 0 24px rgba(123,141,224,0.35), 0 0 55px rgba(123,141,224,0.1)",
    ringColor: "rgba(123,141,224,0.15)",
    label: "별이 자라고 있어요",
    labelColor: "#7B8DE0",
    particleColor: null,
    particleCount: 0,
  },
  3: {
    size: 96,
    bg: "radial-gradient(circle at 38% 32%, #7050C0 0%, #3828A0 42%, #18185A 75%, #0C1030 100%)",
    glow: "0 0 32px rgba(155,114,207,0.45), 0 0 70px rgba(123,141,224,0.15)",
    ringColor: "rgba(155,114,207,0.22)",
    label: "별이 빛나고 있어요",
    labelColor: "#C3A4EA",
    particleColor: null,
    particleCount: 0,
  },
  4: {
    size: 112,
    bg: "radial-gradient(circle at 38% 32%, #C080F0 0%, #8848C8 32%, #4820A0 62%, #18185A 85%, #0C1030 100%)",
    glow: "0 0 42px rgba(197,137,232,0.55), 0 0 90px rgba(155,114,207,0.2)",
    ringColor: "rgba(197,137,232,0.28)",
    label: "별이 눈부셔요",
    labelColor: "#DEB0F8",
    particleColor: "#C589E8",
    particleCount: 1,
  },
  5: {
    size: 132,
    bg: "radial-gradient(circle at 38% 32%, #FFE060 0%, #E090F0 22%, #9060D0 48%, #3020A0 75%, #0C1030 100%)",
    glow: "0 0 55px rgba(255,209,102,0.5), 0 0 110px rgba(197,137,232,0.3), 0 0 160px rgba(123,141,224,0.1)",
    ringColor: "rgba(255,209,102,0.32)",
    label: "우주의 별이 되었어요",
    labelColor: "#FFD166",
    particleColor: "#FFD166",
    particleCount: 2,
  },
};

interface CosmicOrbProps {
  cycle: CycleRecord;
  starsToday: number;
}

export function CosmicOrb({ cycle, starsToday }: CosmicOrbProps) {
  const stage = getOrbStage(cycle.totalStars);
  const cfg = ORB[stage];
  const progress = Math.round((cycle.totalStars / 120) * 100);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {/* 제목 */}
      <div
        style={{
          fontSize: "0.7rem",
          fontWeight: "700",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#6070A8",
        }}
      >
        우주 성장 현황
      </div>

      {/* Orb wrapper */}
      <div
        style={{
          position: "relative",
          width: cfg.size + 40,
          height: cfg.size + 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ring (stage 3+) */}
        {stage >= 3 && (
          <div
            style={{
              position: "absolute",
              width: cfg.size + 28,
              height: cfg.size + 28,
              borderRadius: "50%",
              border: `1px solid ${cfg.ringColor}`,
              animation: "cosmicRing 8s linear infinite",
            }}
          />
        )}

        {/* Outer soft ring (stage 4+) */}
        {stage >= 4 && (
          <div
            style={{
              position: "absolute",
              width: cfg.size + 16,
              height: cfg.size + 16,
              borderRadius: "50%",
              border: `1px dashed ${cfg.ringColor}`,
              opacity: 0.5,
              animation: "cosmicRing 12s linear infinite reverse",
            }}
          />
        )}

        {/* Orbiting particle(s) */}
        {cfg.particleCount >= 1 && (
          <div
            style={{
              position: "absolute",
              width: cfg.size + 28,
              height: cfg.size + 28,
              borderRadius: "50%",
              animation: "spin 4s linear infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-4px",
                marginLeft: `${(cfg.size + 28) / 2 - 4}px`,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: cfg.particleColor ?? "#C589E8",
                boxShadow: `0 0 10px ${cfg.particleColor ?? "#C589E8"}, 0 0 20px ${cfg.particleColor ?? "#C589E8"}60`,
              }}
            />
          </div>
        )}

        {/* Second particle (stage 5) */}
        {cfg.particleCount >= 2 && (
          <div
            style={{
              position: "absolute",
              width: cfg.size + 28,
              height: cfg.size + 28,
              borderRadius: "50%",
              animation: "spin 6.5s linear infinite reverse",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-3px",
                marginLeft: `${(cfg.size + 28) / 2 - 3}px`,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#C589E8",
                boxShadow: "0 0 8px #C589E8, 0 0 16px #C589E840",
              }}
            />
          </div>
        )}

        {/* Orb body */}
        <div
          style={{
            width: cfg.size,
            height: cfg.size,
            borderRadius: "50%",
            background: cfg.bg,
            boxShadow: cfg.glow,
            animation: "orbFloat 5s ease-in-out infinite",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Specular highlight */}
          <div
            style={{
              position: "absolute",
              top: "18%",
              left: "22%",
              width: "28%",
              height: "20%",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              filter: "blur(4px)",
            }}
          />
          {/* Stage 5 aurora shimmer */}
          {stage === 5 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(255,209,102,0.15), rgba(197,137,232,0.15), rgba(80,200,232,0.1))",
                backgroundSize: "200% 200%",
                animation: "auroraShift 3s ease infinite",
              }}
            />
          )}
        </div>
      </div>

      {/* Stage label */}
      <div
        style={{
          fontSize: "0.8rem",
          fontWeight: "600",
          color: cfg.labelColor,
          letterSpacing: "0.02em",
        }}
      >
        {cfg.label}
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "10px 20px",
          borderRadius: "9999px",
          background: "rgba(12,18,48,0.8)",
          border: "1px solid rgba(33,44,92,0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stat label="사이클" value={`Day ${cycle.currentDay}`} sub="/ 30" />
        <Divider />
        <Stat
          label="별 조각"
          value={cycle.totalStars.toString()}
          sub="개"
          icon={<StarFragmentIcon size={14} color="#FFD166" />}
        />
        <Divider />
        <Stat label="오늘" value={starsToday.toString()} sub="/ 4" />
      </div>

      {/* Cycle progress bar */}
      <div style={{ width: "200px" }}>
        <div
          style={{
            width: "100%",
            height: "3px",
            borderRadius: "9999px",
            background: "rgba(33,44,92,0.6)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min(progress, 100)}%`,
              background: stage >= 4
                ? "linear-gradient(90deg, #7B8DE0, #C589E8, #FFD166)"
                : "linear-gradient(90deg, #7B8DE0, #C589E8)",
              borderRadius: "9999px",
              transition: "width 800ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: stage >= 5 ? "0 0 8px rgba(255,209,102,0.6)" : "0 0 6px rgba(197,137,232,0.4)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5px",
            fontSize: "0.6rem",
            color: "#3A4870",
          }}
        >
          <span>0</span>
          <span>30일 목표 120개</span>
          <span>120</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, icon }: { label: string; value: string; sub: string; icon?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
      <div style={{ fontSize: "0.6rem", color: "#6070A8", letterSpacing: "0.05em" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        {icon}
        <span style={{ fontSize: "0.875rem", fontWeight: "700", color: "#EBF0FF", fontFamily: "'Orbitron', sans-serif" }}>
          {value}
        </span>
        <span style={{ fontSize: "0.65rem", color: "#6070A8" }}>{sub}</span>
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 24, background: "rgba(33,44,92,0.8)" }} />;
}
