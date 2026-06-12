"use client";

import { computeSlotBoard, getTodayRecord } from "@/lib/slots";
import { useStore } from "zustand";
import { universeStore } from "../../lib/universe";
import { useCurrentTime } from "./useCurrentTime";
import { useFortuneVisit } from "./useFortuneVisit";

export function useSlots(testParam?: string | null) {
  const universe = useStore(universeStore);
  const currentTime = useCurrentTime(testParam);
  const { rewardPopup, lastStarBornAt, handleExternalVisit, clearRewardPopup } =
    useFortuneVisit();

  const todayRecord = getTodayRecord(universe);
  const board = computeSlotBoard(todayRecord, currentTime);
  const allCompleted =
    todayRecord.morning && todayRecord.lunch && todayRecord.dinner;

  return {
    board,
    currentTime,
    todayRecord,
    universe,
    allCompleted,
    handleExternalVisit,
    rewardPopup,
    clearRewardPopup,
    lastStarBornAt,
  };
}
