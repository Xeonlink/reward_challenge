"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  currentAlpha: number;
  phase: number;
  speed: number;
  birthAt: number; // ms after start
}

const STAR_COUNT = 220;
const BIRTH_WINDOW = 3200; // ms to birth all stars
const BIRTH_FADE = 700;    // ms per-star fade-in

export function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const startedAt = performance.now();

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Build star list
    const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, i) => {
      const large = Math.random() < 0.12;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: large ? Math.random() * 1.4 + 1.2 : Math.random() * 0.8 + 0.4,
        baseAlpha: large ? Math.random() * 0.5 + 0.5 : Math.random() * 0.45 + 0.3,
        currentAlpha: 0,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0008 + 0.0003,
        birthAt: (i / STAR_COUNT) * BIRTH_WINDOW * (0.7 + Math.random() * 0.6),
      };
    });

    const draw = (now: number) => {
      const elapsed = now - startedAt;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        if (elapsed < s.birthAt) continue;

        const birthElapsed = elapsed - s.birthAt;
        if (birthElapsed < BIRTH_FADE) {
          s.currentAlpha = (birthElapsed / BIRTH_FADE) * s.baseAlpha;
        } else {
          // Twinkle via sine wave
          s.currentAlpha = s.baseAlpha * (0.55 + 0.45 * Math.sin(now * s.speed + s.phase));
        }

        ctx.save();
        ctx.globalAlpha = s.currentAlpha;
        ctx.shadowBlur  = s.radius > 1.2 ? 7 : 3;
        ctx.shadowColor = "rgba(180,200,255,0.9)";
        ctx.fillStyle   = "#D8E4FF";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
