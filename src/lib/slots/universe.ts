import { UNIVERSE_STORAGE_KEY } from "@/lib/constants";
import { EMPTY_DAY, type CompletionRecord, type UniverseRecord } from "./types";

export function getTodayKey(): string {
  return new Date().toDateString();
}

export function getTodayRecord(universe: UniverseRecord): CompletionRecord {
  const today = getTodayKey();
  const day = universe.dailyRecord[today];
  if (!day) return { ...EMPTY_DAY };
  return day;
}

export function starsFromDay(c: {
  morning: boolean;
  lunch: boolean;
  dinner: boolean;
  bonus: boolean;
}): number {
  return (
    (c.morning ? 1 : 0) +
    (c.lunch ? 1 : 0) +
    (c.dinner ? 1 : 0) +
    (c.bonus ? 2 : 0)
  );
}

export function getCycleDay(universe: UniverseRecord): number {
  if (!universe.cycleStartDate) return 1;
  const start = new Date(universe.cycleStartDate);
  if (isNaN(start.getTime())) return 1;
  const days = Math.floor((Date.now() - start.getTime()) / 86_400_000);
  return Math.min(days + 1, 30);
}

function defaultUniverse(): UniverseRecord {
  return {
    totalStars: 0,
    cycleStartDate: new Date().toDateString(),
    dailyRecord: {},
  };
}

export function loadUniverse(): {
  record: UniverseRecord;
  cycleCompleted: boolean;
} {
  if (typeof window === "undefined") {
    return {
      record: { totalStars: 0, cycleStartDate: "", dailyRecord: {} },
      cycleCompleted: false,
    };
  }
  try {
    const raw = localStorage.getItem(UNIVERSE_STORAGE_KEY);
    if (!raw) return { record: defaultUniverse(), cycleCompleted: false };
    const parsed: UniverseRecord = JSON.parse(raw);
    const start = new Date(parsed.cycleStartDate);
    if (isNaN(start.getTime())) {
      const totalStars =
        typeof parsed.totalStars === "number" && parsed.totalStars >= 0
          ? parsed.totalStars
          : 0;
      const dailyRecord =
        parsed.dailyRecord && typeof parsed.dailyRecord === "object"
          ? parsed.dailyRecord
          : {};
      const recovered: UniverseRecord = {
        ...defaultUniverse(),
        totalStars,
        dailyRecord,
      };
      saveUniverse(recovered);
      return { record: recovered, cycleCompleted: false };
    }
    const days = Math.floor((Date.now() - start.getTime()) / 86_400_000);
    if (days >= 30) {
      const fresh = defaultUniverse();
      saveUniverse(fresh);
      return { record: fresh, cycleCompleted: true };
    }
    return { record: parsed, cycleCompleted: false };
  } catch {
    return { record: defaultUniverse(), cycleCompleted: false };
  }
}

export function saveUniverse(record: UniverseRecord): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(UNIVERSE_STORAGE_KEY, JSON.stringify(record));
}
