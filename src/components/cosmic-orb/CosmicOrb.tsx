"use client";

import { useUniverse } from "@/hooks/useUniverse";
import { css, cva } from "@/styled/css";
import { CANVAS_H, CANVAS_W, ORB } from "./orbConfig";
import { useCosmicOrbCanvas } from "./useCosmicOrbCanvas";

const canvasWrap = css({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: `${CANVAS_W}px`,
  height: `${CANVAS_H}px`,
});

const canvasEl = css({
  position: "absolute",
  width: `${CANVAS_W}px`,
  height: `${CANVAS_H}px`,
});

const cosmicRing = cva({
  base: {
    position: "absolute",
    borderRadius: "50%",
    border: "1px solid",
    animation: "cosmicRing 8s linear infinite",
  },
  variants: {
    dashed: {
      true: {
        borderStyle: "dashed",
        opacity: 0.55,
        animation: "cosmicRing 12s linear infinite reverse",
      },
      false: {},
    },
  },
});

const orbBody = css({
  borderRadius: "50%",
  animation: "orbFloat 5s ease-in-out infinite",
  position: "relative",
  flexShrink: 0,
});

export function getOrbStage(totalStars: number) {
  if (totalStars <= 6) return 1;
  if (totalStars <= 20) return 2;
  if (totalStars <= 40) return 3;
  if (totalStars <= 70) return 4;
  return 5;
}

export function CosmicOrb() {
  const totalStars = useUniverse((state) => state.totalStars);
  const stage = getOrbStage(totalStars);
  const cfg = ORB[stage];
  const canvasRef = useCosmicOrbCanvas(totalStars, stage);

  return (
    <>
      <div
        className={canvasWrap}
        data-orb-stage={stage}
        data-total-stars={totalStars}
      >
        <canvas className={canvasEl} ref={canvasRef} height={CANVAS_H} />
        {stage >= 3 ? (
          <div
            className={cosmicRing()}
            style={{
              width: cfg.size + 28,
              height: cfg.size + 28,
              borderColor: cfg.ringColor,
            }}
          />
        ) : null}
        {stage >= 4 ? (
          <div
            className={cosmicRing({ dashed: true })}
            style={{
              width: cfg.size + 16,
              height: cfg.size + 16,
              borderColor: cfg.ringColor,
            }}
          />
        ) : null}

        <div
          className={orbBody}
          style={{
            width: cfg.size,
            height: cfg.size,
            background: cfg.bg,
            boxShadow: cfg.glow,
          }}
        />
      </div>

      <span
        className={css({
          color: cfg.labelColor,
          fontSize: "sm",
          fontWeight: "bold",
        })}
      >
        {cfg.label}
      </span>
    </>
  );
}
