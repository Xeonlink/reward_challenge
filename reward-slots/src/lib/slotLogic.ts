export type TimeOfDay = "morning" | "lunch" | "dinner";
export type SlotStatus = "inactive" | "active" | "completed" | "extra" | "locked";
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
  currentTime: TimeOfDay
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

// ---------- constants ----------
export const VISIT_STORAGE_KEY = "byulmoa_visits";
export const COMPLETION_STORAGE_KEY = "byulmoa_completion";
export const CYCLE_STORAGE_KEY = "byulmoa_cycle";
export const FORTUNE_URL = "https://www.gangcheolgwan.com/"; // 강남철학관 URL
export const SLOT_EXTERNAL_URL = FORTUNE_URL;
export const REQUIRED_VISIT_MS = 3000;

// ---------- completion storage ----------
function defaultCompletion(): CompletionRecord {
  return { morning: false, lunch: false, dinner: false, bonus: false, extraUsed: false };
}

export function loadCompletion(): CompletionRecord {
  if (typeof window === "undefined") return defaultCompletion();
  try {
    const raw = localStorage.getItem(COMPLETION_STORAGE_KEY);
    if (!raw) return defaultCompletion();
    const parsed = JSON.parse(raw);
    const today = new Date().toDateString();
    if (parsed._date !== today) return defaultCompletion();
    return parsed;
  } catch {
    return defaultCompletion();
  }
}

export function saveCompletion(record: CompletionRecord): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    COMPLETION_STORAGE_KEY,
    JSON.stringify({ ...record, _date: new Date().toDateString() })
  );
}

// ---------- 30-day cycle ----------
export interface CycleRecord {
  cycleStart: string; // new Date().toDateString()
  totalStars: number;
  currentDay: number; // 1–30
}

export function loadCycle(): CycleRecord {
  if (typeof window === "undefined") return defaultCycle();
  try {
    const raw = localStorage.getItem(CYCLE_STORAGE_KEY);
    if (!raw) return defaultCycle();
    const parsed: CycleRecord = JSON.parse(raw);
    const start = new Date(parsed.cycleStart);
    const days = Math.floor((Date.now() - start.getTime()) / 86_400_000);
    if (days >= 30) return defaultCycle();
    return { ...parsed, currentDay: days + 1 };
  } catch {
    return defaultCycle();
  }
}

export function saveCycle(record: CycleRecord): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CYCLE_STORAGE_KEY, JSON.stringify(record));
}

function defaultCycle(): CycleRecord {
  return { cycleStart: new Date().toDateString(), totalStars: 0, currentDay: 1 };
}

export function getOrbStage(totalStars: number): 1 | 2 | 3 | 4 | 5 {
  if (totalStars <= 0)  return 1;
  if (totalStars <= 12) return 2;
  if (totalStars <= 30) return 3;
  if (totalStars <= 55) return 4;
  return 5;
}

export function countStarsFromCompletion(c: CompletionRecord): number {
  return (c.morning ? 1 : 0) + (c.lunch ? 1 : 0) + (c.dinner ? 1 : 0) + (c.bonus ? 1 : 0);
}
