"use client";

import { getCycleDay, getOrbStage, type UniverseRecord } from "@/lib/slotLogic";
import React, { useEffect, useRef } from "react";
import { StarFragmentIcon } from "./SlotIcons";

// ── CSS orb config ─────────────────────────────────────────────────────────────

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
    glow: "0 0 14px rgba(100,120,200,0.18)",
    ringColor: "transparent",
    label: "별이 태어나고 있어요",
    labelColor: "#3A4870",
    particleColor: null,
    particleCount: 0,
  },
  2: {
    size: 80,
    bg: "radial-gradient(circle at 38% 32%, #3A4A9A 0%, #1A2060 45%, #0C1030 100%)",
    glow: "0 0 30px rgba(123,141,224,0.5), 0 0 65px rgba(123,141,224,0.18)",
    ringColor: "rgba(123,141,224,0.22)",
    label: "별이 자라고 있어요",
    labelColor: "#7B8DE0",
    particleColor: null,
    particleCount: 0,
  },
  3: {
    size: 96,
    bg: "radial-gradient(circle at 38% 32%, #7050C0 0%, #3828A0 42%, #18185A 75%, #0C1030 100%)",
    glow: "0 0 38px rgba(155,114,207,0.6), 0 0 85px rgba(123,141,224,0.22)",
    ringColor: "rgba(155,114,207,0.30)",
    label: "별이 빛나고 있어요",
    labelColor: "#C3A4EA",
    particleColor: null,
    particleCount: 0,
  },
  4: {
    size: 112,
    bg: "radial-gradient(circle at 38% 32%, #C080F0 0%, #8848C8 32%, #4820A0 62%, #18185A 85%, #0C1030 100%)",
    glow: "0 0 52px rgba(197,137,232,0.70), 0 0 110px rgba(155,114,207,0.28)",
    ringColor: "rgba(197,137,232,0.38)",
    label: "별이 눈부셔요",
    labelColor: "#DEB0F8",
    particleColor: "#C589E8",
    particleCount: 1,
  },
  5: {
    size: 132,
    bg: "radial-gradient(circle at 38% 32%, #FFE878 0%, #F0A0FF 20%, #9060D0 46%, #3020A0 73%, #0C1030 100%)",
    glow: "0 0 65px rgba(255,220,100,0.65), 0 0 130px rgba(197,137,232,0.40), 0 0 200px rgba(123,141,224,0.18)",
    ringColor: "rgba(255,209,102,0.45)",
    label: "우주의 별이 되었어요",
    labelColor: "#FFD166",
    particleColor: "#FFD166",
    particleCount: 2,
  },
};

// ── Canvas constants ───────────────────────────────────────────────────────────

const W = 280;
const H = 280;
const CX = W / 2;
const CY = H / 2;
const STAR_MIN_R = 74;
const STAR_MAX_R = 132;
const ANIM_MS = 1200;
const GOLDEN = 2.399963;

// Orb radii by stage (half of css size)
const ORB_R: Record<number, number> = { 1: 32, 2: 40, 3: 48, 4: 56, 5: 66 };

interface StarData {
  finalX: number;
  finalY: number;
  born: number;
  size: number;
}

function starFinalPos(i: number) {
  const r = STAR_MIN_R + (Math.min(i, 149) / 149) * (STAR_MAX_R - STAR_MIN_R);
  return { x: CX + r * Math.cos(i * GOLDEN), y: CY + r * Math.sin(i * GOLDEN) };
}

function starSize(i: number) {
  const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return 0.8 + (v - Math.floor(v)) * 1.7; // 0.8–2.5 px
}

// ── Canvas draw helpers ────────────────────────────────────────────────────────

/** Pulsing core glow — stage-colored, visible around CSS orb edges */
function drawCore(ctx: CanvasRenderingContext2D, ts: number, stage: number) {
  const cores: Record<number, [number, number, number]> = {
    1: [80, 100, 200],
    2: [90, 130, 230],
    3: [155, 100, 230],
    4: [200, 130, 245],
    5: [255, 215, 80],
  };
  const [r, g, b] = cores[stage] ?? cores[5];
  const pulse = 0.38 + 0.18 * Math.sin(ts * 0.0017);
  const radius = stage >= 5 ? 95 : 72;
  const gr = ctx.createRadialGradient(CX, CY, 0, CX, CY, radius);
  gr.addColorStop(0, `rgba(${r},${g},${b},${pulse})`);
  gr.addColorStop(0.35, `rgba(${r},${g},${b},${(pulse * 0.5).toFixed(3)})`);
  gr.addColorStop(1, "transparent");
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, W, H);
}

/** Atmospheric nebula glow (stage 2+) */
function drawNebula(ctx: CanvasRenderingContext2D, stage: number) {
  const p: Record<number, [string, string]> = {
    2: ["rgba(100,130,230,0.24)", "rgba(70,100,210,0.10)"],
    3: ["rgba(160,100,230,0.30)", "rgba(100,60,190,0.12)"],
    4: ["rgba(205,130,248,0.36)", "rgba(160,80,230,0.16)"],
    5: ["rgba(255,200,80,0.28)", "rgba(205,130,248,0.28)"],
  };
  const [c1, c2] = p[stage] ?? p[2];
  const gr = ctx.createRadialGradient(CX, CY, 22, CX, CY, 132);
  gr.addColorStop(0, c1);
  gr.addColorStop(0.62, c2);
  gr.addColorStop(1, "transparent");
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, W, H);
}

/** Multi-band milky way (stage 5) — 4 overlapping colored ellipses */
function drawMilkyWay(ctx: CanvasRenderingContext2D, ts: number) {
  ctx.save();
  ctx.translate(CX, CY);
  ctx.rotate(-0.28);

  // [half-height, R, G, B, base-alpha]
  const bands: [number, number, number, number, number][] = [
    [58, 255, 255, 255, 0.08],
    [42, 160, 96, 255, 0.14],
    [30, 64, 128, 255, 0.18],
    [20, 200, 160, 255, 0.22],
  ];

  for (const [halfH, r, g, b, baseA] of bands) {
    const a = baseA * (0.84 + 0.16 * Math.sin(ts * 0.0007 + halfH));
    const gr = ctx.createLinearGradient(-148, 0, 148, 0);
    gr.addColorStop(0, `rgba(${r},${g},${b},0)`);
    gr.addColorStop(0.1, `rgba(${r},${g},${b},${(a * 0.55).toFixed(3)})`);
    gr.addColorStop(0.5, `rgba(${r},${g},${b},${a.toFixed(3)})`);
    gr.addColorStop(0.9, `rgba(${r},${g},${b},${(a * 0.55).toFixed(3)})`);
    gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = gr;
    ctx.fillRect(-148, -halfH, 296, halfH * 2);
  }
  ctx.restore();
}

/** Flowing aurora rings around the orb edge (stage 5) */
function drawAurora(ctx: CanvasRenderingContext2D, ts: number, orbR: number) {
  const rings = [
    { offset: 7, w: 4.5, color: "#ffe066", phase: 0 },
    { offset: 13, w: 3.5, color: "#c084fc", phase: 2.094 },
    { offset: 19, w: 2.5, color: "#60a0ff", phase: 4.189 },
  ];
  ctx.save();
  for (const ring of rings) {
    const alpha = 0.28 + 0.2 * Math.sin(ts * 0.0016 + ring.phase);
    ctx.strokeStyle = ring.color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = ring.w;
    ctx.shadowBlur = 12;
    ctx.shadowColor = ring.color;
    ctx.beginPath();
    ctx.arc(CX, CY, orbR + ring.offset, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

/** Planet configs — [0]=large purple, [1]=medium teal, [2]=small orange */
const PLANETS = [
  { orbitR: 96, r: 10, color: "#a060ff", speed: 0.0009, phase: 0.0 },
  { orbitR: 113, r: 7, color: "#30c0a0", speed: -0.0006, phase: 2.1 },
  { orbitR: 127, r: 5, color: "#ff8840", speed: 0.0004, phase: 4.2 },
];

function drawPlanets(ctx: CanvasRenderingContext2D, ts: number, count: number) {
  for (let i = 0; i < count; i++) {
    const p = PLANETS[i];
    const angle = ts * p.speed + p.phase;
    const px = CX + p.orbitR * Math.cos(angle);
    const py = CY + p.orbitR * Math.sin(angle);

    ctx.save();
    // Orbit ring
    ctx.strokeStyle = `${p.color}28`;
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.arc(CX, CY, p.orbitR, 0, Math.PI * 2);
    ctx.stroke();
    // Planet glow + body
    ctx.shadowBlur = 16;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(px, py, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    // Specular highlight
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.arc(px - p.r * 0.32, py - p.r * 0.36, p.r * 0.38, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.restore();
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

interface CosmicOrbProps {
  universe: UniverseRecord;
  starsToday: number;
  lastStarBornAt: number;
}

export function CosmicOrb({
  universe,
  starsToday,
  lastStarBornAt,
}: CosmicOrbProps) {
  const stage = getOrbStage(universe.totalStars);
  const cfg = ORB[stage];
  const progress = Math.min(Math.round((universe.totalStars / 150) * 100), 100);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<StarData[]>([]);
  const stageRef = useRef<number>(stage);
  const animRef = useRef<number>(0);

  // Sync stage ref every render (safe mutable ref, no re-render triggered)

  // eslint-disable-next-line react-hooks/refs
  stageRef.current = stage;

  // Full rebuild — avoids race condition where React batches 0→N and skips prevTotalRef logic
  useEffect(() => {
    const n = universe.totalStars;
    starsRef.current = Array.from({ length: n }, (_, i) => {
      const { x, y } = starFinalPos(i);
      return { finalX: x, finalY: y, born: -1, size: starSize(i) };
    });
    if (lastStarBornAt > 0 && n > 0) {
      starsRef.current[n - 1].born = lastStarBornAt;
    }
  }, [universe.totalStars, lastStarBornAt]);

  // Canvas loop — mount only, reads refs each frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, W, H);
      const s = stageRef.current;
      const orbR = ORB_R[s] ?? 66;

      // ── 1. Core pulse ───────────────────────────────────────────────────────
      drawCore(ctx, ts, s);

      // ── 2. Nebula (stage 2+) ────────────────────────────────────────────────
      if (s >= 2) drawNebula(ctx, s);

      // ── 3. Milky way (stage 5) ──────────────────────────────────────────────
      if (s >= 5) drawMilkyWay(ctx, ts);

      // ── 4. Aurora rings (stage 5) ───────────────────────────────────────────
      if (s >= 5) drawAurora(ctx, ts, orbR);

      // ── 5. Planets (stage 3→1, 4→2, 5→3) ──────────────────────────────────
      if (s >= 3) drawPlanets(ctx, ts, s - 2);

      // ── 6. Constellation lines (stage 3+, settled stars only) ──────────────
      if (s >= 3) {
        const stars = starsRef.current;
        ctx.save();
        ctx.lineWidth = 0.55;
        for (let i = 0; i < stars.length; i++) {
          const a = stars[i];
          if (a.born >= 0 && ts - a.born < ANIM_MS) continue;
          for (const off of [5, 8, 13]) {
            const j = i + off;
            if (j >= stars.length) break;
            const b = stars[j];
            if (b.born >= 0 && ts - b.born < ANIM_MS) continue;
            const d = Math.hypot(a.finalX - b.finalX, a.finalY - b.finalY);
            if (d < 42) {
              ctx.strokeStyle = `rgba(180,140,255,${(0.05 * (1 - d / 42)).toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(a.finalX, a.finalY);
              ctx.lineTo(b.finalX, b.finalY);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }

      // ── 7a. Small settled stars (r < 1.8 — no glow for performance) ─────────
      {
        const stars = starsRef.current;
        ctx.save();
        ctx.shadowBlur = 2;
        ctx.shadowColor = "#9070C8";
        ctx.fillStyle = "rgba(255,255,255,0.78)";
        for (const star of stars) {
          if (star.size >= 1.8) continue;
          const elapsed = star.born < 0 ? ANIM_MS + 1 : ts - star.born;
          if (elapsed < ANIM_MS) continue;
          ctx.beginPath();
          ctx.arc(star.finalX, star.finalY, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // ── 7b. Bright settled stars (r ≥ 1.8 — glow halo) ─────────────────────
      {
        const stars = starsRef.current;
        const glowColor = s >= 5 ? "#FFD166" : "#C589E8";
        const haloColor =
          s >= 5 ? "rgba(255,220,80,0.12)" : "rgba(197,137,232,0.12)";
        ctx.save();
        ctx.shadowBlur = 9;
        ctx.shadowColor = glowColor;
        for (const star of stars) {
          if (star.size < 1.8) continue;
          const elapsed = star.born < 0 ? ANIM_MS + 1 : ts - star.born;
          if (elapsed < ANIM_MS) continue;
          // Outer halo ring
          ctx.fillStyle = haloColor;
          ctx.beginPath();
          ctx.arc(star.finalX, star.finalY, star.size + 3, 0, Math.PI * 2);
          ctx.fill();
          // Star body
          ctx.fillStyle = "rgba(255,255,240,0.96)";
          ctx.beginPath();
          ctx.arc(star.finalX, star.finalY, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // ── 8. Birth animation (newest earned star, spiral from center) ──────────
      {
        const stars = starsRef.current;
        for (const star of stars) {
          if (star.born < 0) continue;
          const elapsed = ts - star.born;
          if (elapsed >= ANIM_MS) continue;
          const p = elapsed / ANIM_MS;
          const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
          const fA = Math.atan2(star.finalY - CY, star.finalX - CX);
          const fD = Math.hypot(star.finalX - CX, star.finalY - CY);
          const aA = fA + (1 - p) * Math.PI * 2;
          const aD = ease * fD;
          ctx.save();
          ctx.globalAlpha = p;
          ctx.shadowBlur = 20;
          ctx.shadowColor = "#FFD166";
          ctx.beginPath();
          ctx.arc(
            CX + aD * Math.cos(aA),
            CY + aD * Math.sin(aA),
            Math.max(star.size * p, 0.5),
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = "#FFE880";
          ctx.fill();
          ctx.restore();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const wrapSize = cfg.size + 40;
  const wrapOffset = (W - wrapSize) / 2;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
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

      {/* ── Canvas + CSS orb ───────────────────────────────────────────────── */}
      <div style={{ position: "relative", width: W, height: H }}>
        {/* Canvas: core, nebula, milky way, aurora, planets, constellations, stars */}
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />

        {/* CSS orb (on top of canvas) */}
        <div
          style={{
            position: "absolute",
            top: wrapOffset,
            left: wrapOffset,
            width: wrapSize,
            height: wrapSize,
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
          {/* Outer dashed ring (stage 4+) */}
          {stage >= 4 && (
            <div
              style={{
                position: "absolute",
                width: cfg.size + 16,
                height: cfg.size + 16,
                borderRadius: "50%",
                border: `1px dashed ${cfg.ringColor}`,
                opacity: 0.55,
                animation: "cosmicRing 12s linear infinite reverse",
              }}
            />
          )}

          {/* CSS particle 1 (stage 4+) */}
          {cfg.particleCount >= 1 && (
            <div
              style={{
                position: "absolute",
                width: cfg.size + 28,
                height: cfg.size + 28,
                borderRadius: "50%",
                animation: "spin 3.5s linear infinite",
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
                  boxShadow: `0 0 12px ${cfg.particleColor ?? "#C589E8"}, 0 0 24px ${cfg.particleColor ?? "#C589E8"}55`,
                }}
              />
            </div>
          )}
          {/* CSS particle 2 (stage 5) */}
          {cfg.particleCount >= 2 && (
            <div
              style={{
                position: "absolute",
                width: cfg.size + 28,
                height: cfg.size + 28,
                borderRadius: "50%",
                animation: "spin 6s linear infinite reverse",
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
                  boxShadow: "0 0 10px #C589E8, 0 0 20px #C589E845",
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
            {/* Specular */}
            <div
              style={{
                position: "absolute",
                top: "16%",
                left: "20%",
                width: "30%",
                height: "22%",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                filter: "blur(5px)",
              }}
            />
            {/* Stage 5 aurora shimmer overlay */}
            {stage === 5 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(255,230,80,0.20), rgba(200,100,255,0.18), rgba(80,160,255,0.12))",
                  backgroundSize: "200% 200%",
                  animation: "auroraShift 2.5s ease infinite",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Stage label */}
      <div
        style={{
          fontSize: "0.82rem",
          fontWeight: "600",
          color: cfg.labelColor,
          letterSpacing: "0.02em",
        }}
      >
        {cfg.label}
      </div>

      {/* Stats */}
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
        <Stat
          label="사이클"
          value={`Day ${getCycleDay(universe)}`}
          sub="/ 30"
        />
        <Divider />
        <Stat
          label="별 조각"
          value={universe.totalStars.toString()}
          sub="개"
          icon={<StarFragmentIcon size={14} color="#FFD166" />}
        />
        <Divider />
        <Stat label="오늘" value={starsToday.toString()} sub="/ 5" />
      </div>

      {/* Progress bar */}
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
              width: `${progress}%`,
              background:
                stage >= 4
                  ? "linear-gradient(90deg, #7B8DE0, #C589E8, #FFD166)"
                  : "linear-gradient(90deg, #7B8DE0, #C589E8)",
              borderRadius: "9999px",
              transition: "width 800ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow:
                stage >= 5
                  ? "0 0 10px rgba(255,209,102,0.7)"
                  : "0 0 6px rgba(197,137,232,0.4)",
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
          <span>30일 목표 150개</span>
          <span>150</span>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
      }}
    >
      <div
        style={{
          fontSize: "0.6rem",
          color: "#6070A8",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        {icon}
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: "700",
            color: "#EBF0FF",
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          {value}
        </span>
        <span style={{ fontSize: "0.65rem", color: "#6070A8" }}>{sub}</span>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ width: 1, height: 24, background: "rgba(33,44,92,0.8)" }} />
  );
}
