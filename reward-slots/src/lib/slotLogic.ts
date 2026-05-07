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

  // Bonus slot — show if all 3 regular slots completed
  const result: SlotState[] = [...slots];
  if (morning && lunch && dinner) {
    result.push({
      key: "bonus",
      status: completion.bonus ? "completed" : currentTime === "dinner" || morning && lunch && dinner ? "active" : "inactive",
    });
  }

  return result;
}

// ---------- visit tracking ----------
export const VISIT_STORAGE_KEY = "reward_slots_visits";
export const COMPLETION_STORAGE_KEY = "reward_slots_completion";

export function loadCompletion(): CompletionRecord {
  if (typeof window === "undefined") return defaultCompletion();
  try {
    const raw = localStorage.getItem(COMPLETION_STORAGE_KEY);
    if (!raw) return defaultCompletion();
    const parsed = JSON.parse(raw);
    // Reset if it's a new day
    const savedDate = parsed._date;
    const today = new Date().toDateString();
    if (savedDate !== today) return defaultCompletion();
    return parsed;
  } catch {
    return defaultCompletion();
  }
}

export function saveCompletion(record: CompletionRecord): void {
  if (typeof window === "undefined") return;
  const today = new Date().toDateString();
  localStorage.setItem(
    COMPLETION_STORAGE_KEY,
    JSON.stringify({ ...record, _date: today })
  );
}

function defaultCompletion(): CompletionRecord {
  return {
    morning: false,
    lunch: false,
    dinner: false,
    bonus: false,
    extraUsed: false,
  };
}

export const SLOT_EXTERNAL_URL = "https://example.com/event";
export const REQUIRED_VISIT_MS = 3000;
