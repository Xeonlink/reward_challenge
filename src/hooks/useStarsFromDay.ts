import { universeStore } from "@/lib/universe";
import { useStore } from "zustand";

export function useStarsToday() {
  const record = useStore(universeStore, (state) => state.record);

  const morningStar = record.morning ? 1 : 0;
  const lunchStar = record.lunch ? 1 : 0;
  const dinnerStar = record.dinner ? 1 : 0;
  const bonusStar = record.bonus ? 2 : 0;

  return morningStar + lunchStar + dinnerStar + bonusStar;
}
