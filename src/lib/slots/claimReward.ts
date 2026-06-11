import type { SlotKey, UniverseRecord } from "./types";
import { EMPTY_DAY } from "./types";
import { getTodayKey, starsFromDay } from "./universe";

export function canClaimBonus(day: {
  morning: boolean;
  lunch: boolean;
  dinner: boolean;
}): boolean {
  return day.morning && day.lunch && day.dinner;
}

export function applyRewardClaim(
  universe: UniverseRecord,
  key: SlotKey,
  options: { isExtra: boolean },
): { universe: UniverseRecord; gained: number } | null {
  const todayKey = getTodayKey();
  const prevDay = universe.dailyRecord[todayKey] ?? { ...EMPTY_DAY };

  if (key === "bonus" && !canClaimBonus(prevDay)) {
    return null;
  }

  const updatedDay = {
    ...prevDay,
    [key]: true,
    extraUsed: prevDay.extraUsed || options.isExtra,
  };

  const prevStars = starsFromDay(prevDay);
  const newStars = starsFromDay(updatedDay);
  const gained = newStars - prevStars;

  const updatedUniverse: UniverseRecord = {
    ...universe,
    totalStars: universe.totalStars + (gained > 0 ? gained : 0),
    dailyRecord: {
      ...universe.dailyRecord,
      [todayKey]: updatedDay,
    },
  };

  return { universe: updatedUniverse, gained };
}
