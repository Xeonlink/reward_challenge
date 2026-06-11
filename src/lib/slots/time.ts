import type { TimeOfDay, VisitIntent } from "./types";

export function getCurrentTimeOfDay(testParam?: string | null): TimeOfDay {
  if (testParam === "morning") return "morning";
  if (testParam === "lunch") return "lunch";
  if (testParam === "dinner") return "dinner";

  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "lunch";
  return "dinner";
}

export function getTimeOfDayLabel(time: TimeOfDay): string {
  if (time === "morning") return "아침";
  if (time === "lunch") return "점심";
  return "저녁";
}

export function getVisitRewardLabel(intent: VisitIntent): string {
  if (intent.kind === "bonus") return "보너스";
  return getTimeOfDayLabel(intent.time);
}

export function getVisitRewardAmount(intent: VisitIntent): number {
  return intent.kind === "bonus" ? 2 : 1;
}
