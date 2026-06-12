"use client";

import { getOrbStage } from "@/components/cosmic-orb/CosmicOrb";
import { useModal } from "@/components/modal";
import { CycleCompletePopup } from "@/components/slots/popups/CycleCompletePopup";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Text } from "@/components/ui/Text";
import { useUniverse } from "@/hooks/useUniverse";
import {
  CYCLE_DAY_GOAL,
  CYCLE_STAR_GOAL,
  UNIVERSE_STORAGE_KEY,
} from "@/lib/constants";
import type { DayRecord } from "@/lib/universe";
import { universeStore } from "@/lib/universe";
import { css, cva } from "@/styled/css";
import { format, subDays } from "date-fns";
import { useState, type ReactNode } from "react";

const EMPTY_RECORD: DayRecord = {
  morning: false,
  lunch: false,
  dinner: false,
  bonus: false,
};

const SLOT_RECORDS = [
  { key: "morning" as const, label: "아침", tone: "morning" as const },
  { key: "lunch" as const, label: "점심", tone: "lunch" as const },
  { key: "dinner" as const, label: "저녁", tone: "dinner" as const },
  { key: "bonus" as const, label: "보너스", tone: "default" as const },
] as const;

function clampStars(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(CYCLE_STAR_GOAL, Math.max(0, Math.floor(n)));
}

function parseStarInput(value: string): number {
  if (value.trim() === "") return 0;
  return clampStars(Number(value));
}

function readPersistedUniverse(): {
  totalStars: number;
  cycleStartDate: string;
  lastRecordDate: string;
  record: DayRecord;
} {
  const today = format(new Date(), "yyyy-MM-dd");
  const fallback = {
    totalStars: 0,
    cycleStartDate: today,
    lastRecordDate: today,
    record: { ...EMPTY_RECORD },
  };

  try {
    const raw = localStorage.getItem(UNIVERSE_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as {
      state?: Partial<typeof fallback> & { record?: Partial<DayRecord> };
      totalStars?: number;
      cycleStartDate?: string;
      lastRecordDate?: string;
      record?: Partial<DayRecord>;
    };

    const flat = parsed.state ?? parsed;
    return {
      totalStars:
        typeof flat.totalStars === "number"
          ? flat.totalStars
          : fallback.totalStars,
      cycleStartDate:
        typeof flat.cycleStartDate === "string"
          ? flat.cycleStartDate
          : fallback.cycleStartDate,
      lastRecordDate:
        typeof flat.lastRecordDate === "string"
          ? flat.lastRecordDate
          : fallback.lastRecordDate,
      record: { ...EMPTY_RECORD, ...flat.record },
    };
  } catch {
    return fallback;
  }
}

function writePersistedUniverse(
  state: ReturnType<typeof readPersistedUniverse>,
): void {
  localStorage.setItem(
    UNIVERSE_STORAGE_KEY,
    JSON.stringify({ state, version: 1 }),
  );
}

function applyUniverseStarsReload(totalStars: number) {
  const clamped = clampStars(totalStars);
  const current = readPersistedUniverse();
  writePersistedUniverse({ ...current, totalStars: clamped });
  location.reload();
}

function applyUniverseStarsLive(totalStars: number) {
  const clamped = clampStars(totalStars);
  universeStore.setState((state) => {
    state.totalStars = clamped;
  });
}

function triggerCycleCompleteViaStorage() {
  const current = readPersistedUniverse();
  writePersistedUniverse({
    ...current,
    totalStars: CYCLE_STAR_GOAL,
    cycleStartDate: format(subDays(new Date(), CYCLE_DAY_GOAL), "yyyy-MM-dd"),
  });
  location.reload();
}

const TEST_PARAMS = [
  { param: "morning", label: "아침", tone: "morning" as const },
  { param: "lunch", label: "점심", tone: "lunch" as const },
  { param: "dinner", label: "저녁", tone: "dinner" as const },
] as const;

const rootStyle = css({
  position: "fixed",
  bottom: "4",
  right: "4",
  zIndex: "40",
});

const panel = cva({
  base: {
    display: "grid",
    width: "fit-content",
    justifyItems: "stretch",
    gridTemplateRows: "auto 0fr",
    transformOrigin: "bottom right",
    borderRadius: "xl",
    background: "linear-gradient(135deg, #12121A 0%, #1C1C2E 100%)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "nebula",
    backdropFilter: "blur(12px)",
    transition: "grid-template-rows 520ms spring, gap 520ms spring",
    padding: "3",
    gap: "0",
  },
  variants: {
    open: {
      true: {
        gridTemplateRows: "auto 1fr",
        gap: "3",
        "& [data-dev-tools-body]": {
          maxWidth: "min(100vw - 2rem, 22rem)",
          opacity: "1",
          pointerEvents: "auto",
        },
        "& [data-dev-tools-chevron]": {
          transform: "rotate(180deg)",
        },
        "& [data-dev-tools-stack]": {
          animation: "devToolsReveal 520ms spring",
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    open: false,
  },
});

const triggerStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "2",
  width: "100%",
  margin: "0",
  padding: "0",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  userSelect: "none",
  whiteSpace: "nowrap",
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "accent",
    outlineOffset: "2px",
    borderRadius: "sm",
  },
});

const triggerTitleStyle = css({
  fontFamily: "display",
  fontSize: "sm",
  fontWeight: "700",
  letterSpacing: "0.08em",
  color: "fg",
});

const devBadgeStyle = css({
  display: "inline-flex",
  alignItems: "center",
  paddingX: "0.5rem",
  paddingY: "0.125rem",
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "700",
  fontFamily: "display",
  letterSpacing: "0.12em",
  color: "slot.bonusLight",
  background: "color-mix(in srgb, var(--colors-slot-bonus) 14%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-slot-bonus) 32%, transparent)",
});

const chevronStyle = css({
  display: "inline-flex",
  color: "fg.muted",
  transition: "transform 520ms spring",
  fontSize: "xs",
});

const bodyWrapStyle = css({
  overflow: "hidden",
  minHeight: "0",
  minWidth: "0",
  maxWidth: "0",
  opacity: "0",
  pointerEvents: "none",
  transition: "max-width 520ms spring, opacity 480ms spring",
});

const bodyStackStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "3",
  width: "max-content",
  minWidth: "100%",
});

const sectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "2",
});

const dividerStyle = css({
  height: "1px",
  width: "100%",
  background: "color-mix(in srgb, var(--colors-border) 50%, transparent)",
});

const statGridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "2",
});

const statCellStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  padding: "0.625rem 0.75rem",
  borderRadius: "md",
  background: "color-mix(in srgb, var(--colors-surface) 60%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-border) 40%, transparent)",
});

const statValueStyle = css({
  fontFamily: "mono",
  fontSize: "sm",
  fontWeight: "600",
  color: "fg",
  lineHeight: "1.2",
});

const recordRowStyle = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5",
});

const recordChip = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.25rem 0.625rem",
    borderRadius: "full",
    fontSize: "xs",
    fontWeight: "600",
    border: "1px solid",
    transition: "all 200ms",
  },
  variants: {
    done: {
      true: {},
      false: {
        opacity: "0.55",
      },
    },
    tone: {
      morning: {},
      lunch: {},
      dinner: {},
      default: {},
    },
  },
  compoundVariants: [
    {
      done: true,
      tone: "morning",
      css: {
        background:
          "color-mix(in srgb, var(--colors-slot-morning) 12%, transparent)",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-morning) 40%, transparent)",
        color: "slot.morning",
      },
    },
    {
      done: false,
      tone: "morning",
      css: {
        background: "transparent",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-morning) 25%, transparent)",
        color: "fg.dim",
      },
    },
    {
      done: true,
      tone: "lunch",
      css: {
        background:
          "color-mix(in srgb, var(--colors-slot-lunch) 12%, transparent)",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-lunch) 40%, transparent)",
        color: "slot.lunch",
      },
    },
    {
      done: false,
      tone: "lunch",
      css: {
        background: "transparent",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-lunch) 25%, transparent)",
        color: "fg.dim",
      },
    },
    {
      done: true,
      tone: "dinner",
      css: {
        background:
          "color-mix(in srgb, var(--colors-slot-dinner) 12%, transparent)",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-dinner) 40%, transparent)",
        color: "slot.dinner",
      },
    },
    {
      done: false,
      tone: "dinner",
      css: {
        background: "transparent",
        borderColor:
          "color-mix(in srgb, var(--colors-slot-dinner) 25%, transparent)",
        color: "fg.dim",
      },
    },
    {
      done: true,
      tone: "default",
      css: {
        background: "color-mix(in srgb, var(--colors-accent) 12%, transparent)",
        borderColor:
          "color-mix(in srgb, var(--colors-accent) 35%, transparent)",
        color: "accent",
      },
    },
    {
      done: false,
      tone: "default",
      css: {
        background: "transparent",
        borderColor:
          "color-mix(in srgb, var(--colors-border) 50%, transparent)",
        color: "fg.dim",
      },
    },
  ],
});

const chipRowStyle = css({
  display: "flex",
  gap: "1.5",
  flexWrap: "wrap",
  alignItems: "center",
});

const starRowStyle = css({
  display: "flex",
  gap: "1.5",
  flexWrap: "wrap",
  alignItems: "center",
});

const starInputStyle = css({
  height: "2.25rem",
  width: "5rem",
  paddingX: "0.75rem",
  borderRadius: "sm",
  fontSize: "sm",
  fontWeight: "600",
  fontFamily: "mono",
  color: "fg",
  background: "color-mix(in srgb, var(--colors-surface) 80%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-border) 60%, transparent)",
  textAlign: "center",
  _focus: {
    outline: "none",
    borderColor: "color-mix(in srgb, var(--colors-accent) 45%, transparent)",
    boxShadow:
      "0 0 0 2px color-mix(in srgb, var(--colors-accent) 15%, transparent)",
  },
});

const srOnlyStyle = css({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: "0",
});

function formatRecordMark(done: boolean) {
  return done ? "✓" : "✗";
}

function DevToolsStat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className={statCellStyle}>
      <Text variant="label">{label}</Text>
      <span className={statValueStyle}>{value}</span>
    </div>
  );
}

function DevToolsUniverseState() {
  const totalStars = useUniverse((state) => state.totalStars);
  const cycleStartDate = useUniverse((state) => state.cycleStartDate);
  const lastRecordDate = useUniverse((state) => state.lastRecordDate);
  const record = useUniverse((state) => state.record);
  const orbStage = getOrbStage(totalStars);

  return (
    <div className={sectionStyle} data-testid="dev-tools-universe-state">
      <Text variant="sectionLabel">우주 상태</Text>
      <div className={statGridStyle}>
        <DevToolsStat label="오브 단계" value={orbStage} />
        <DevToolsStat label="별 조각" value={totalStars} />
        <DevToolsStat label="사이클 시작" value={cycleStartDate} />
        <DevToolsStat label="마지막 기록" value={lastRecordDate} />
      </div>
      <div className={recordRowStyle}>
        {SLOT_RECORDS.map(({ key, label, tone }) => (
          <span className={recordChip({ done: record[key], tone })} key={key}>
            {label}
            {formatRecordMark(record[key])}
          </span>
        ))}
      </div>
      <span className={srOnlyStyle} aria-hidden>
        stars: {totalStars} M{formatRecordMark(record.morning)} L
        {formatRecordMark(record.lunch)} D{formatRecordMark(record.dinner)} B
        {formatRecordMark(record.bonus)}
      </span>
    </div>
  );
}

function DevToolsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={sectionStyle}>
      <Text variant="sectionLabel">{title}</Text>
      {children}
    </div>
  );
}

export function DevTools() {
  const modal = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [starInput, setStarInput] = useState("0");

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const openCycleCompletePopup = () => {
    modal.open(<CycleCompletePopup />);
  };

  const applyLive = () => {
    const stars = parseStarInput(starInput);
    setStarInput(String(stars));
    applyUniverseStarsLive(stars);
  };

  const applyReload = () => {
    const stars = parseStarInput(starInput);
    setStarInput(String(stars));
    applyUniverseStarsReload(stars);
  };

  const resetUniverse = () => {
    setStarInput("0");
    applyUniverseStarsLive(0);
  };

  return (
    <div className={rootStyle}>
      <div className={panel({ open: isOpen })}>
        <button
          aria-expanded={isOpen}
          className={triggerStyle}
          data-testid="dev-tools-trigger"
          type="button"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={devBadgeStyle}>DEV</span>
          <span className={triggerTitleStyle}>개발 도구</span>
          <span className={chevronStyle} data-dev-tools-chevron aria-hidden>
            ▲
          </span>
        </button>
        <div className={bodyWrapStyle} data-dev-tools-body>
          <div className={bodyStackStyle} data-dev-tools-stack>
            <DevToolsUniverseState />
            <div className={dividerStyle} role="separator" />
            <DevToolsSection title="시간대 시뮬레이션">
              <div className={chipRowStyle}>
                {TEST_PARAMS.map(({ param, label, tone }) => (
                  <Chip key={param} active href={`?test=${param}`} tone={tone}>
                    {label}
                  </Chip>
                ))}
                <Chip href="/" tone="default">
                  초기화
                </Chip>
              </div>
            </DevToolsSection>
            <div className={dividerStyle} role="separator" />
            <DevToolsSection title="별 개수">
              <div className={starRowStyle}>
                <input
                  className={starInputStyle}
                  aria-label="별 개수"
                  data-testid="dev-tools-star-input"
                  max={CYCLE_STAR_GOAL}
                  min={0}
                  step={1}
                  type="number"
                  value={starInput}
                  onChange={(e) => setStarInput(e.target.value)}
                />
                <Button size="sm" type="button" onClick={applyLive}>
                  적용
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant="secondary"
                  onClick={applyReload}
                >
                  적용·reload
                </Button>
              </div>
            </DevToolsSection>
            <div className={dividerStyle} role="separator" />
            <DevToolsSection title="사이클">
              <div className={chipRowStyle}>
                <Button
                  size="sm"
                  type="button"
                  variant="danger"
                  onClick={resetUniverse}
                >
                  우주 초기화
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant="secondary"
                  onClick={() => triggerCycleCompleteViaStorage()}
                >
                  30일 완료·reload
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant="secondary"
                  onClick={() => openCycleCompletePopup()}
                >
                  완료 팝업
                </Button>
              </div>
            </DevToolsSection>
          </div>
        </div>
      </div>
    </div>
  );
}
