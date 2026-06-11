import { UNIVERSE_STORAGE_KEY } from "./constants";

export type TimeOfDay = "morning" | "lunch" | "dinner";
export type SlotStatus =
  | "inactive"
  | "active"
  | "completed"
  | "extra"
  | "locked";
export type SlotKey = "morning" | "lunch" | "dinner" | "bonus";

export interface SlotState {
  key: SlotKey;
  status: SlotStatus;
  isExtra?: boolean;
  canUseExtra?: boolean;
}

export interface CompletionRecord {
  morning: boolean;
  lunch: boolean;
  dinner: boolean;
  bonus: boolean;
  extraUsed: boolean;
  /** timestamps for external visit tracking */
  visitStart?: Record<SlotKey, number>;
  rewardClaimed?: Record<SlotKey, boolean>;
}

export interface UniverseRecord {
  /** 누적 별 조각 총합 (사이클 리셋 후에도 유지) */
  totalStars: number;
  /** 현재 30일 사이클 시작일 toDateString() */
  cycleStartDate: string;
  /** 날짜별 완료 기록 — 리셋 안 됨 */
  dailyRecord: {
    [date: string]: {
      morning: boolean;
      lunch: boolean;
      dinner: boolean;
      bonus: boolean;
      extraUsed: boolean;
    };
  };
}

// ---------- time helpers ----------

export function getCurrentTimeOfDay(testParam?: string | null): TimeOfDay {
  if (testParam === "morning") return "morning";
  if (testParam === "lunch") return "lunch";
  if (testParam === "dinner") return "dinner";

  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "lunch";
  return "dinner";
}

export function getTimeOfDayLabel(t: TimeOfDay | SlotKey): string {
  const map: Record<string, string> = {
    morning: "아침",
    lunch: "점심",
    dinner: "저녁",
    bonus: "보너스",
  };
  return map[t] ?? t;
}

// ---------- extra opportunity logic ----------
/**
 * Determines which slots have extra opportunity unlocked.
 * Rules (from spec table):
 * - 점심 완료: 아침에 추가 기회
 * - 점심 완료 + 저녁 접속(dinner is current time): 아침에 추가기회, 저녁은 정규 참여
 * - 저녁 완료 케이스1: 아침 미참여→참여불가, 점심 미참여→참여가능
 * - 저녁 완료 케이스2: 점심 완료 + 저녁 완료 → 아침에 추가기회
 * - 저녁 완료 케이스3: 아침 완료 + 저녁 완료 → 점심에 추가기회
 */
export function computeSlotStates(
  completion: CompletionRecord,
  currentTime: TimeOfDay,
): SlotState[] {
  const { morning, lunch, dinner, extraUsed } = completion;

  const slots: SlotState[] = [
    { key: "morning", status: "inactive" },
    { key: "lunch", status: "inactive" },
    { key: "dinner", status: "inactive" },
  ];

  const setStatus = (key: SlotKey, status: SlotStatus, isExtra = false) => {
    const slot = slots.find((s) => s.key === key);
    if (slot) {
      slot.status = status;
      slot.isExtra = isExtra;
    }
  };

  // Mark completed slots first
  if (morning) setStatus("morning", "completed");
  if (lunch) setStatus("lunch", "completed");
  if (dinner) setStatus("dinner", "completed");

  // Active = current time slot (if not completed)
  if (!morning && currentTime === "morning") setStatus("morning", "active");
  if (!lunch && currentTime === "lunch") setStatus("lunch", "active");
  if (!dinner && currentTime === "dinner") setStatus("dinner", "active");

  // ---------- extra opportunity rules ----------
  if (!extraUsed) {
    // 저녁 완료 케이스3: 아침 완료 + 저녁 완료 → 점심에 추가기회
    if (morning && dinner && !lunch) {
      setStatus("lunch", "extra", true);
    }
    // 저녁 완료 케이스2: 점심 완료 + 저녁 완료 → 아침에 추가기회
    else if (lunch && dinner && !morning) {
      setStatus("morning", "extra", true);
    }
    // 저녁 완료 케이스1: 저녁만 완료 → 아침 참여불가, 점심 참여가능(extra)
    else if (dinner && !morning && !lunch) {
      setStatus("morning", "locked");
      if (currentTime !== "morning") {
        setStatus("lunch", "extra", true);
      }
    }
    // 점심 완료 + 저녁 접속
    else if (lunch && !morning && !dinner) {
      setStatus("morning", "extra", true);
      // dinner remains active if current time is dinner
    }
    // 점심 완료만
    else if (lunch && !morning && currentTime !== "morning") {
      setStatus("morning", "extra", true);
    }
  }

  // Locked: past time slots that are not extra and not completed
  slots.forEach((slot) => {
    if (slot.status === "inactive") {
      const isPast =
        (slot.key === "morning" && currentTime !== "morning") ||
        (slot.key === "lunch" && currentTime === "dinner");
      if (isPast) slot.status = "locked";
    }
  });

  // Bonus slot — 3개 모두 완료 시 항상 active (시간대 무관)
  const result: SlotState[] = [...slots];
  if (morning && lunch && dinner) {
    result.push({
      key: "bonus",
      status: completion.bonus ? "completed" : "active",
    });
  }

  return result;
}

// ---------- universe helpers ----------

export function getTodayKey(): string {
  return new Date().toDateString();
}

export function getTodayRecord(universe: UniverseRecord): CompletionRecord {
  const today = getTodayKey();
  const day = universe.dailyRecord[today];
  if (!day)
    return {
      morning: false,
      lunch: false,
      dinner: false,
      bonus: false,
      extraUsed: false,
    };
  return day;
}

/** 별 조각 계산: 아침/점심/저녁 각 +1, 보너스 +2 (하루 최대 5개) */
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
      // cycleStartDate 누락 or 손상 → totalStars/dailyRecord는 살리고 날짜만 오늘로 복구
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
      // 30일 사이클 완료: totalStars 리셋, 새 사이클 시작
      const fresh = defaultUniverse();
      saveUniverse(fresh); // 즉시 저장 → 새로고침해도 팝업 1회만
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

// ---------- orb stage ----------
export function getOrbStage(totalStars: number): 1 | 2 | 3 | 4 | 5 {
  if (totalStars <= 6) return 1;
  if (totalStars <= 20) return 2;
  if (totalStars <= 40) return 3;
  if (totalStars <= 70) return 4;
  return 5;
}
