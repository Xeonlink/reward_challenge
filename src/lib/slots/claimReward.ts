import type { TimeOfDay, UniverseRecord, VisitIntent } from "./types";
import { EMPTY_DAY } from "./types";
import { getTodayKey, starsFromDay } from "./universe";

export function canClaimBonus(day: {
  morning: boolean;
  lunch: boolean;
  dinner: boolean;
}): boolean {
  return day.morning && day.lunch && day.dinner;
}

export function claimFortuneReward(
  universe: UniverseRecord,
  time: TimeOfDay,
  options: { isExtra: boolean },
): { universe: UniverseRecord; gained: number } | null {
  const todayKey = getTodayKey();
  const prevDay = universe.dailyRecord[todayKey] ?? { ...EMPTY_DAY };

  const updatedDay = {
    ...prevDay,
    [time]: true,
    extraUsed: prevDay.extraUsed || options.isExtra,
  };

  const prevStars = starsFromDay(prevDay);
  const newStars = starsFromDay(updatedDay);
  const gained = newStars - prevStars;

  return {
    universe: {
      ...universe,
      totalStars: universe.totalStars + (gained > 0 ? gained : 0),
      dailyRecord: {
        ...universe.dailyRecord,
        [todayKey]: updatedDay,
      },
    },
    gained,
  };
}

export function claimBonusReward(
  universe: UniverseRecord,
): { universe: UniverseRecord; gained: number } | null {
  const todayKey = getTodayKey();
  const prevDay = universe.dailyRecord[todayKey] ?? { ...EMPTY_DAY };

  if (!canClaimBonus(prevDay)) {
    return null;
  }

  const updatedDay = {
    ...prevDay,
    bonus: true,
  };

  const prevStars = starsFromDay(prevDay);
  const newStars = starsFromDay(updatedDay);
  const gained = newStars - prevStars;

  return {
    universe: {
      ...universe,
      totalStars: universe.totalStars + (gained > 0 ? gained : 0),
      dailyRecord: {
        ...universe.dailyRecord,
        [todayKey]: updatedDay,
      },
    },
    gained,
  };
}

export function claimVisitReward(
  universe: UniverseRecord,
  intent: VisitIntent,
  options: { isExtra: boolean },
): { universe: UniverseRecord; gained: number } | null {
  if (intent.kind === "bonus") {
    return claimBonusReward(universe);
  }
  return claimFortuneReward(universe, intent.time, options);
}
