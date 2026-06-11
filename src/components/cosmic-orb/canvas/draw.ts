import {
  CANVAS_CX,
  CANVAS_CY,
  CANVAS_H,
  CANVAS_W,
  PLANETS,
  type StarData,
} from "../orbConfig";

export function drawCore(
  ctx: CanvasRenderingContext2D,
  ts: number,
  stage: number,
) {
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
  const gr = ctx.createRadialGradient(
    CANVAS_CX,
    CANVAS_CY,
    0,
    CANVAS_CX,
    CANVAS_CY,
    radius,
  );
  gr.addColorStop(0, `rgba(${r},${g},${b},${pulse})`);
  gr.addColorStop(0.35, `rgba(${r},${g},${b},${(pulse * 0.5).toFixed(3)})`);
  gr.addColorStop(1, "transparent");
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
}

export function drawNebula(ctx: CanvasRenderingContext2D, stage: number) {
  const p: Record<number, [string, string]> = {
    2: ["rgba(100,130,230,0.24)", "rgba(70,100,210,0.10)"],
    3: ["rgba(160,100,230,0.30)", "rgba(100,60,190,0.12)"],
    4: ["rgba(205,130,248,0.36)", "rgba(160,80,230,0.16)"],
    5: ["rgba(255,200,80,0.28)", "rgba(205,130,248,0.28)"],
  };
  const [c1, c2] = p[stage] ?? p[2];
  const gr = ctx.createRadialGradient(
    CANVAS_CX,
    CANVAS_CY,
    22,
    CANVAS_CX,
    CANVAS_CY,
    132,
  );
  gr.addColorStop(0, c1);
  gr.addColorStop(0.62, c2);
  gr.addColorStop(1, "transparent");
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
}

export function drawMilkyWay(ctx: CanvasRenderingContext2D, ts: number) {
  ctx.save();
  ctx.translate(CANVAS_CX, CANVAS_CY);
  ctx.rotate(-0.28);

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

export function drawAurora(
  ctx: CanvasRenderingContext2D,
  ts: number,
  orbR: number,
) {
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
    ctx.arc(CANVAS_CX, CANVAS_CY, orbR + ring.offset, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawPlanets(
  ctx: CanvasRenderingContext2D,
  ts: number,
  count: number,
) {
  for (let i = 0; i < count; i++) {
    const p = PLANETS[i];
    const angle = ts * p.speed + p.phase;
    const px = CANVAS_CX + p.orbitR * Math.cos(angle);
    const py = CANVAS_CY + p.orbitR * Math.sin(angle);

    ctx.save();
    ctx.strokeStyle = `${p.color}28`;
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.arc(CANVAS_CX, CANVAS_CY, p.orbitR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 16;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(px, py, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.arc(px - p.r * 0.32, py - p.r * 0.36, p.r * 0.38, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.restore();
  }
}

export function drawConstellationLines(
  ctx: CanvasRenderingContext2D,
  ts: number,
  stars: StarData[],
  animMs: number,
) {
  ctx.save();
  ctx.lineWidth = 0.55;
  for (let i = 0; i < stars.length; i++) {
    const a = stars[i];
    if (a.born >= 0 && ts - a.born < animMs) continue;
    for (const off of [5, 8, 13]) {
      const j = i + off;
      if (j >= stars.length) break;
      const b = stars[j];
      if (b.born >= 0 && ts - b.born < animMs) continue;
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

export function drawSettledStars(
  ctx: CanvasRenderingContext2D,
  ts: number,
  stars: StarData[],
  stage: number,
  animMs: number,
) {
  ctx.save();
  ctx.shadowBlur = 2;
  ctx.shadowColor = "#9070C8";
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  for (const star of stars) {
    if (star.size >= 1.8) continue;
    const elapsed = star.born < 0 ? animMs + 1 : ts - star.born;
    if (elapsed < animMs) continue;
    ctx.beginPath();
    ctx.arc(star.finalX, star.finalY, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  const glowColor = stage >= 5 ? "#FFD166" : "#C589E8";
  const haloColor =
    stage >= 5 ? "rgba(255,220,80,0.12)" : "rgba(197,137,232,0.12)";
  ctx.save();
  ctx.shadowBlur = 9;
  ctx.shadowColor = glowColor;
  for (const star of stars) {
    if (star.size < 1.8) continue;
    const elapsed = star.born < 0 ? animMs + 1 : ts - star.born;
    if (elapsed < animMs) continue;
    ctx.fillStyle = haloColor;
    ctx.beginPath();
    ctx.arc(star.finalX, star.finalY, star.size + 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,240,0.96)";
    ctx.beginPath();
    ctx.arc(star.finalX, star.finalY, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawBirthAnimation(
  ctx: CanvasRenderingContext2D,
  ts: number,
  stars: StarData[],
  animMs: number,
) {
  for (const star of stars) {
    if (star.born < 0) continue;
    const elapsed = ts - star.born;
    if (elapsed >= animMs) continue;
    const p = elapsed / animMs;
    const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
    const fA = Math.atan2(star.finalY - CANVAS_CY, star.finalX - CANVAS_CX);
    const fD = Math.hypot(star.finalX - CANVAS_CX, star.finalY - CANVAS_CY);
    const aA = fA + (1 - p) * Math.PI * 2;
    const aD = ease * fD;
    ctx.save();
    ctx.globalAlpha = p;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#FFD166";
    ctx.beginPath();
    ctx.arc(
      CANVAS_CX + aD * Math.cos(aA),
      CANVAS_CY + aD * Math.sin(aA),
      Math.max(star.size * p, 0.5),
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = "#FFE880";
    ctx.fill();
    ctx.restore();
  }
}
