import type { SlotKey, TimeOfDay } from "./types";

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
