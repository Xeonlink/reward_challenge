"use client";

import { Chip } from "@/components/ui/Chip";
import { UNIVERSE_STORAGE_KEY } from "@/lib/constants";
import { css } from "@/styled/css";

const TEST_PARAMS = [
  { param: "morning", tone: "morning" as const },
  { param: "lunch", tone: "lunch" as const },
  { param: "dinner", tone: "dinner" as const },
] as const;

const UNIVERSE_PRESETS = [
  { label: "2단계·15", totalStars: 15 },
  { label: "3단계·30", totalStars: 30 },
  { label: "4단계·55", totalStars: 55 },
  { label: "5단계·80", totalStars: 80 },
  { label: "우주 초기화", totalStars: 0 },
] as const;

function applyUniverseStars(totalStars: number) {
  localStorage.setItem(UNIVERSE_STORAGE_KEY, JSON.stringify({ totalStars }));
  location.reload();
}

const rootStyle = css({
  position: "fixed",
  bottom: "4",
  right: "4",
  zIndex: "40",
});

const panelStyle = css({
  display: "grid",
  width: "fit-content",
  justifyItems: "end",
  gridTemplateRows: "auto 0fr",
  transformOrigin: "bottom right",
  borderRadius: "full",
  background: "color-mix(in srgb, var(--colors-surface) 85%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-border) 60%, transparent)",
  boxShadow: "0 0.25rem 1rem rgba(0, 0, 0, 0.35)",
  transition:
    "grid-template-rows 200ms ease, padding 200ms ease, border-radius 200ms ease, gap 200ms ease",
  paddingX: "3",
  paddingY: "2",
  gap: "0",
  _hover: {
    gridTemplateRows: "auto 1fr",
    borderRadius: "xl",
    padding: "3",
    gap: "2",
    "& [data-dev-tools-chips]": {
      maxWidth: "100vw",
      opacity: "1",
      pointerEvents: "auto",
    },
  },
});

const labelStyle = css({
  fontSize: "xs",
  fontWeight: "600",
  fontFamily: "mono",
  color: "fg.muted",
  lineHeight: "1",
  userSelect: "none",
  whiteSpace: "nowrap",
});

const toolsWrapStyle = css({
  overflow: "hidden",
  minHeight: "0",
  minWidth: "0",
  maxWidth: "0",
  opacity: "0",
  pointerEvents: "none",
  transition: "max-width 200ms ease, opacity 200ms ease",
});

const toolsStackStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "2",
  width: "max-content",
  maxWidth: "min(100vw - 2rem, 28rem)",
});

const chipRowStyle = css({
  display: "flex",
  gap: "2",
  flexWrap: "wrap",
  justifyContent: "flex-end",
});

const universeButtonStyle = css({
  display: "inline-flex",
  alignItems: "center",
  padding: "0.25rem 0.75rem",
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "600",
  fontFamily: "mono",
  color: "fg.muted",
  background: "transparent",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-border) 80%, transparent)",
  cursor: "pointer",
  transition: "all 200ms",
  _hover: {
    borderColor:
      "color-mix(in srgb, var(--colors-border-bright) 60%, transparent)",
    color: "fg",
  },
});

export function DevTools() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className={rootStyle}>
      <div className={panelStyle}>
        <span className={labelStyle}>test</span>
        <div className={toolsWrapStyle} data-dev-tools-chips>
          <div className={toolsStackStyle}>
            <div className={chipRowStyle}>
              {TEST_PARAMS.map(({ param, tone }) => (
                <Chip key={param} href={`?test=${param}`} tone={tone}>
                  ?test={param}
                </Chip>
              ))}
              <Chip href="/" tone="default">
                초기화
              </Chip>
            </div>
            <div className={chipRowStyle}>
              {UNIVERSE_PRESETS.map(({ label, totalStars }) => (
                <button
                  className={universeButtonStyle}
                  key={label}
                  type="button"
                  onClick={() => applyUniverseStars(totalStars)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
