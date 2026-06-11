"use client";

import { useEffect, useRef } from "react";
import {
  drawAurora,
  drawBirthAnimation,
  drawConstellationLines,
  drawCore,
  drawMilkyWay,
  drawNebula,
  drawPlanets,
  drawSettledStars,
} from "./canvas/draw";
import {
  CANVAS_H,
  CANVAS_W,
  ORB_R,
  STAR_ANIM_MS,
  starFinalPos,
  starSize,
  type StarData,
} from "./orbConfig";

export function useCosmicOrbCanvas(
  totalStars: number,
  lastStarBornAt: number,
  stage: number,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<StarData[]>([]);
  const stageRef = useRef(stage);
  const animRef = useRef<number>(0);

  // eslint-disable-next-line react-hooks/refs
  stageRef.current = stage;

  useEffect(() => {
    starsRef.current = Array.from({ length: totalStars }, (_, i) => {
      const { x, y } = starFinalPos(i);
      return { finalX: x, finalY: y, born: -1, size: starSize(i) };
    });
    if (lastStarBornAt > 0 && totalStars > 0) {
      starsRef.current[totalStars - 1].born = lastStarBornAt;
    }
  }, [totalStars, lastStarBornAt]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      const s = stageRef.current;
      const orbR = ORB_R[s] ?? 66;
      const stars = starsRef.current;

      drawCore(ctx, ts, s);
      if (s >= 2) drawNebula(ctx, s);
      if (s >= 5) drawMilkyWay(ctx, ts);
      if (s >= 5) drawAurora(ctx, ts, orbR);
      if (s >= 3) drawPlanets(ctx, ts, s - 2);
      if (s >= 3) drawConstellationLines(ctx, ts, stars, STAR_ANIM_MS);
      drawSettledStars(ctx, ts, stars, s, STAR_ANIM_MS);
      drawBirthAnimation(ctx, ts, stars, STAR_ANIM_MS);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return canvasRef;
}
