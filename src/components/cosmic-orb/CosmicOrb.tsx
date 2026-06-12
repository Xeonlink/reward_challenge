"use client";

import { Text } from "@/components/ui/Text";
import { universeStore } from "@/lib/universe";
import { css, cva } from "@/styled/css";
import { useStore } from "zustand";
import { CANVAS_H, CANVAS_W, ORB } from "./orbConfig";
import { useCosmicOrbCanvas } from "./useCosmicOrbCanvas";

const orbRoot = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
});

const canvasWrap = css({
  position: "relative",
  width: "280px",
  height: "280px",
});

const canvasEl = css({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
});

const orbWrapCenter = css({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

const particleOrbit = cva({
  base: {
    position: "absolute",
    borderRadius: "50%",
    animation: "spin 3.5s linear infinite",
  },
  variants: {
    reverse: {
      true: { animation: "spin 6s linear infinite reverse" },
      false: {},
    },
  },
});

const particleDot = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "50%",
});

const orbBody = css({
  borderRadius: "50%",
  animation: "orbFloat 5s ease-in-out infinite",
  position: "relative",
  flexShrink: 0,
});

const orbSpecular = css({
  position: "absolute",
  top: "16%",
  left: "20%",
  width: "30%",
  height: "22%",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.22)",
  filter: "blur(5px)",
});

const orbAuroraOverlay = css({
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, rgba(255,230,80,0.20), rgba(200,100,255,0.18), rgba(80,160,255,0.12))",
  backgroundSize: "200% 200%",
  animation: "auroraShift 2.5s ease infinite",
});

export function getOrbStage(totalStars: number): 1 | 2 | 3 | 4 | 5 {
  if (totalStars <= 6) return 1;
  if (totalStars <= 20) return 2;
  if (totalStars <= 40) return 3;
  if (totalStars <= 70) return 4;
  return 5;
}

export function CosmicOrb() {
  const universe = useStore(universeStore);
  const stage = getOrbStage(universe.totalStars);
  const cfg = ORB[stage];
  const canvasRef = useCosmicOrbCanvas(universe.totalStars, stage);

  const wrapSize = cfg.size + 40;
  const wrapOffset = (CANVAS_W - wrapSize) / 2;

  return (
    <div
      className={orbRoot}
      data-orb-stage={stage}
      data-total-stars={universe.totalStars}
    >
      <div className={canvasWrap}>
        <canvas
          className={canvasEl}
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
        />

        <div
          className={orbWrapCenter}
          style={{
            top: wrapOffset,
            left: wrapOffset,
            width: wrapSize,
            height: wrapSize,
          }}
        >
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

          {cfg.particleCount >= 1 ? (
            <div
              className={particleOrbit()}
              style={{ width: cfg.size + 28, height: cfg.size + 28 }}
            >
              <div
                className={particleDot}
                style={{
                  marginTop: "-4px",
                  marginLeft: `${(cfg.size + 28) / 2 - 4}px`,
                  width: 8,
                  height: 8,
                  background: cfg.particleColor ?? "#C589E8",
                  boxShadow: `0 0 12px ${cfg.particleColor ?? "#C589E8"}, 0 0 24px ${cfg.particleColor ?? "#C589E8"}55`,
                }}
              />
            </div>
          ) : null}
          {cfg.particleCount >= 2 ? (
            <div
              className={particleOrbit({ reverse: true })}
              style={{ width: cfg.size + 28, height: cfg.size + 28 }}
            >
              <div
                className={particleDot}
                style={{
                  marginTop: "-3px",
                  marginLeft: `${(cfg.size + 28) / 2 - 3}px`,
                  width: 6,
                  height: 6,
                  background: "#C589E8",
                  boxShadow: "0 0 10px #C589E8, 0 0 20px #C589E845",
                }}
              />
            </div>
          ) : null}

          <div
            className={orbBody}
            style={{
              width: cfg.size,
              height: cfg.size,
              background: cfg.bg,
              boxShadow: cfg.glow,
            }}
          >
            <div className={orbSpecular} />
            {stage === 5 ? <div className={orbAuroraOverlay} /> : null}
          </div>
        </div>
      </div>

      <Text className={css({ color: cfg.labelColor })} variant="stageLabel">
        {cfg.label}
      </Text>
    </div>
  );
}
