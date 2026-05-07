"use client";

import React, { useRef, useEffect } from "react";
import { getOrbStage, getCycleDay, type UniverseRecord } from "@/lib/slotLogic";
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
  1: { size: 64,  bg: "radial-gradient(circle at 38% 32%, #1E2456 0%, #0C1030 55%, #070918 100%)",                                                               glow: "0 0 12px rgba(100,120,200,0.15)",                                                           ringColor: "transparent",            label: "별이 태어나고 있어요", labelColor: "#3A4870", particleColor: null,      particleCount: 0 },
  2: { size: 80,  bg: "radial-gradient(circle at 38% 32%, #3A4A9A 0%, #1A2060 45%, #0C1030 100%)",                                                               glow: "0 0 28px rgba(123,141,224,0.45), 0 0 60px rgba(123,141,224,0.15)",                         ringColor: "rgba(123,141,224,0.2)", label: "별이 자라고 있어요",  labelColor: "#7B8DE0", particleColor: null,      particleCount: 0 },
  3: { size: 96,  bg: "radial-gradient(circle at 38% 32%, #7050C0 0%, #3828A0 42%, #18185A 75%, #0C1030 100%)",                                                  glow: "0 0 36px rgba(155,114,207,0.55), 0 0 80px rgba(123,141,224,0.2)",                          ringColor: "rgba(155,114,207,0.28)", label: "별이 빛나고 있어요",  labelColor: "#C3A4EA", particleColor: null,      particleCount: 0 },
  4: { size: 112, bg: "radial-gradient(circle at 38% 32%, #C080F0 0%, #8848C8 32%, #4820A0 62%, #18185A 85%, #0C1030 100%)",                                     glow: "0 0 48px rgba(197,137,232,0.65), 0 0 100px rgba(155,114,207,0.25)",                        ringColor: "rgba(197,137,232,0.35)", label: "별이 눈부셔요",       labelColor: "#DEB0F8", particleColor: "#C589E8", particleCount: 1 },
  5: { size: 132, bg: "radial-gradient(circle at 38% 32%, #FFE060 0%, #E090F0 22%, #9060D0 48%, #3020A0 75%, #0C1030 100%)",                                     glow: "0 0 60px rgba(255,209,102,0.55), 0 0 120px rgba(197,137,232,0.35), 0 0 180px rgba(123,141,224,0.15)", ringColor: "rgba(255,209,102,0.4)", label: "우주의 별이 되었어요", labelColor: "#FFD166", particleColor: "#FFD166", particleCount: 2 },
};

// ── Canvas constants ───────────────────────────────────────────────────────────

const W = 280;
const H = 280;
const CX = W / 2;
const CY = H / 2;
const STAR_MIN_R = 78;
const STAR_MAX_R = 130;
const ANIM_MS = 1200;
const GOLDEN = 2.399963; // golden angle

interface StarData { finalX: number; finalY: number; born: number; size: number }

function starFinalPos(i: number) {
  const r = STAR_MIN_R + (Math.min(i, 149) / 149) * (STAR_MAX_R - STAR_MIN_R);
  return { x: CX + r * Math.cos(i * GOLDEN), y: CY + r * Math.sin(i * GOLDEN) };
}

function starSize(i: number) {
  const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return 1.0 + (v - Math.floor(v)) * 1.5; // 1.0–2.5 px
}

// ── Canvas drawing helpers ─────────────────────────────────────────────────────

function drawNebula(ctx: CanvasRenderingContext2D, stage: number) {
  const c: Record<number, [string, string]> = {
    2: ["rgba(100,130,220,0.20)", "rgba(70,100,200,0.08)"],
    3: ["rgba(155,100,220,0.26)", "rgba(100,60,180,0.10)"],
    4: ["rgba(200,130,240,0.32)", "rgba(155,80,220,0.14)"],
    5: ["rgba(255,200,80,0.22)",  "rgba(200,130,240,0.22)"],
  };
  const [c1, c2] = c[stage] ?? c[2];
  const g = ctx.createRadialGradient(CX, CY, 20, CX, CY, 128);
  g.addColorStop(0, c1);
  g.addColorStop(0.65, c2);
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function drawMilkyWay(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.translate(CX, CY);
  ctx.rotate(-0.3);
  const g = ctx.createLinearGradient(-145, -18, 145, 18);
  g.addColorStop(0, "transparent");
  g.addColorStop(0.25, "rgba(255,210,100,0.05)");
  g.addColorStop(0.5,  "rgba(255,230,160,0.12)");
  g.addColorStop(0.75, "rgba(255,210,100,0.05)");
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.fillRect(-145, -20, 290, 40);
  ctx.restore();
}

const PLANET_CFG = [
  { orbitR: 96,  r: 7, color: "#5CE8A0", speed:  0.0008, phase: 0   },
  { orbitR: 112, r: 5, color: "#50C8E8", speed: -0.0005, phase: 2.1 },
  { orbitR: 126, r: 4, color: "#FFD166", speed:  0.0003, phase: 4.2 },
];

function drawPlanets(ctx: CanvasRenderingContext2D, ts: number, count: number) {
  for (let i = 0; i < count; i++) {
    const p = PLANET_CFG[i];
    const angle = ts * p.speed + p.phase;
    const x = CX + p.orbitR * Math.cos(angle);
    const y = CY + p.orbitR * Math.sin(angle);
    // Orbit ring
    ctx.save();
    ctx.strokeStyle = `${p.color}28`;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(CX, CY, p.orbitR, 0, Math.PI * 2);
    ctx.stroke();
    // Planet body + glow
    ctx.shadowBlur = 12;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(x, y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

interface CosmicOrbProps {
  universe: UniverseRecord;
  starsToday: number;
  lastStarBornAt: number; // performance.now() when star earned, 0 = no animation
}

export function CosmicOrb({ universe, starsToday, lastStarBornAt }: CosmicOrbProps) {
  const stage = getOrbStage(universe.totalStars);
  const cfg = ORB[stage];
  const progress = Math.min(Math.round(universe.totalStars / 150 * 100), 100);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef  = useRef<StarData[]>([]);
  // stageRef lets the canvas loop read the current stage without re-running the loop effect
  const stageRef  = useRef<number>(stage);
  const animRef   = useRef<number>(0);

  // Update stageRef synchronously during render (safe — ref mutation, no re-render)
  stageRef.current = stage;

  // Rebuild star array on every totalStars / lastStarBornAt change.
  // Full rebuild (not incremental) eliminates the prevTotalRef=-1 race condition
  // where React could batch the 0→N transition and skip the intermediate state.
  useEffect(() => {
    const n = universe.totalStars;
    starsRef.current = Array.from({ length: n }, (_, i) => {
      const { x, y } = starFinalPos(i);
      return { finalX: x, finalY: y, born: -1, size: starSize(i) };
    });
    // Mark the newest star as animating only when earned by user action
    if (lastStarBornAt > 0 && n > 0) {
      starsRef.current[n - 1].born = lastStarBornAt;
    }
  }, [universe.totalStars, lastStarBornAt]);

  // Canvas animation loop — mounts once, reads refs each frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, W, H);
      const s = stageRef.current;

      // Layer 1 — nebula atmosphere (stage 2+)
      if (s >= 2) drawNebula(ctx, s);

      // Layer 2 — milky way band (stage 5)
      if (s >= 5) drawMilkyWay(ctx);

      // Layer 3 — orbiting planets (stage 3→1 planet, 4→2, 5→3)
      if (s >= 3) drawPlanets(ctx, ts, s - 2);

      // Layer 4 — settled stars (single save/restore for performance)
      ctx.save();
      ctx.shadowBlur = 3;
      ctx.shadowColor = "#C589E8";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      for (const star of starsRef.current) {
        if (star.born < 0 || ts - star.born >= ANIM_MS) {
          ctx.beginPath();
          ctx.arc(star.finalX, star.finalY, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Layer 5 — birth-animating star (spiral from center → final pos)
      for (const star of starsRef.current) {
        if (star.born >= 0 && ts - star.born < ANIM_MS) {
          const p = Math.max(0, ts - star.born) / ANIM_MS;
          const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
          const fA = Math.atan2(star.finalY - CY, star.finalX - CX);
          const fD = Math.hypot(star.finalX - CX, star.finalY - CY);
          // rotate one full turn behind the final angle, spiral outward
          const aA = fA + (1 - p) * Math.PI * 2;
          const aD = ease * fD;
          ctx.save();
          ctx.globalAlpha = p;
          ctx.shadowBlur = 16;
          ctx.shadowColor = "#FFD166";
          ctx.beginPath();
          ctx.arc(CX + aD * Math.cos(aA), CY + aD * Math.sin(aA), Math.max(star.size * p, 0.5), 0, Math.PI * 2);
          ctx.fillStyle = "#FFE080";
          ctx.fill();
          ctx.restore();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []); // mount only

  const wrapSize   = cfg.size + 40;
  const wrapOffset = (W - wrapSize) / 2;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

      {/* Title */}
      <div style={{ fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6070A8" }}>
        우주 성장 현황
      </div>

      {/* Canvas + CSS orb — canvas is behind, orb wrapper in front */}
      <div style={{ position: "relative", width: W, height: H }}>

        {/* Canvas: nebula, planets, milky way, stars */}
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />

        {/* CSS Orb: glowing sphere, rings, CSS particles — renders on top of canvas */}
        <div style={{ position: "absolute", top: wrapOffset, left: wrapOffset, width: wrapSize, height: wrapSize, display: "flex", alignItems: "center", justifyContent: "center" }}>

          {/* Decorative ring (stage 3+) */}
          {stage >= 3 && (
            <div style={{ position: "absolute", width: cfg.size + 28, height: cfg.size + 28, borderRadius: "50%", border: `1px solid ${cfg.ringColor}`, animation: "cosmicRing 8s linear infinite" }} />
          )}

          {/* Outer dashed ring (stage 4+) */}
          {stage >= 4 && (
            <div style={{ position: "absolute", width: cfg.size + 16, height: cfg.size + 16, borderRadius: "50%", border: `1px dashed ${cfg.ringColor}`, opacity: 0.55, animation: "cosmicRing 12s linear infinite reverse" }} />
          )}

          {/* CSS particle 1 (stage 4+) */}
          {cfg.particleCount >= 1 && (
            <div style={{ position: "absolute", width: cfg.size + 28, height: cfg.size + 28, borderRadius: "50%", animation: "spin 4s linear infinite" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", marginTop: "-4px", marginLeft: `${(cfg.size + 28) / 2 - 4}px`, width: 8, height: 8, borderRadius: "50%", background: cfg.particleColor ?? "#C589E8", boxShadow: `0 0 10px ${cfg.particleColor ?? "#C589E8"}, 0 0 22px ${cfg.particleColor ?? "#C589E8"}60` }} />
            </div>
          )}

          {/* CSS particle 2 (stage 5) */}
          {cfg.particleCount >= 2 && (
            <div style={{ position: "absolute", width: cfg.size + 28, height: cfg.size + 28, borderRadius: "50%", animation: "spin 6.5s linear infinite reverse" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", marginTop: "-3px", marginLeft: `${(cfg.size + 28) / 2 - 3}px`, width: 6, height: 6, borderRadius: "50%", background: "#C589E8", boxShadow: "0 0 8px #C589E8, 0 0 18px #C589E840" }} />
            </div>
          )}

          {/* Orb body */}
          <div style={{ width: cfg.size, height: cfg.size, borderRadius: "50%", background: cfg.bg, boxShadow: cfg.glow, animation: "orbFloat 5s ease-in-out infinite", position: "relative", flexShrink: 0 }}>
            {/* Specular highlight */}
            <div style={{ position: "absolute", top: "18%", left: "22%", width: "28%", height: "20%", borderRadius: "50%", background: "rgba(255,255,255,0.18)", filter: "blur(4px)" }} />
            {/* Stage 5 aurora shimmer */}
            {stage === 5 && (
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg, rgba(255,209,102,0.15), rgba(197,137,232,0.15), rgba(80,200,232,0.1))", backgroundSize: "200% 200%", animation: "auroraShift 3s ease infinite" }} />
            )}
          </div>
        </div>
      </div>

      {/* Stage label */}
      <div style={{ fontSize: "0.82rem", fontWeight: "600", color: cfg.labelColor, letterSpacing: "0.02em" }}>
        {cfg.label}
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "10px 20px", borderRadius: "9999px", background: "rgba(12,18,48,0.8)", border: "1px solid rgba(33,44,92,0.8)", backdropFilter: "blur(8px)" }}>
        <Stat label="사이클" value={`Day ${getCycleDay(universe)}`} sub="/ 30" />
        <Divider />
        <Stat label="별 조각" value={universe.totalStars.toString()} sub="개" icon={<StarFragmentIcon size={14} color="#FFD166" />} />
        <Divider />
        <Stat label="오늘" value={starsToday.toString()} sub="/ 5" />
      </div>

      {/* Cycle progress bar */}
      <div style={{ width: "200px" }}>
        <div style={{ width: "100%", height: "3px", borderRadius: "9999px", background: "rgba(33,44,92,0.6)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: stage >= 4 ? "linear-gradient(90deg, #7B8DE0, #C589E8, #FFD166)" : "linear-gradient(90deg, #7B8DE0, #C589E8)", borderRadius: "9999px", transition: "width 800ms cubic-bezier(0.34, 1.56, 0.64, 1)", boxShadow: stage >= 5 ? "0 0 8px rgba(255,209,102,0.6)" : "0 0 6px rgba(197,137,232,0.4)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px", fontSize: "0.6rem", color: "#3A4870" }}>
          <span>0</span>
          <span>30일 목표 150개</span>
          <span>150</span>
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
        <span style={{ fontSize: "0.875rem", fontWeight: "700", color: "#EBF0FF", fontFamily: "'Orbitron', sans-serif" }}>{value}</span>
        <span style={{ fontSize: "0.65rem", color: "#6070A8" }}>{sub}</span>
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 24, background: "rgba(33,44,92,0.8)" }} />;
}
