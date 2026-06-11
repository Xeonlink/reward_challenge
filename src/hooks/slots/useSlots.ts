"use client";

import {
  claimVisitReward,
  computeSlotBoard,
  getTodayRecord,
  type VisitIntent,
} from "@/lib/slots";
import { useCallback } from "react";
import { useCurrentTime } from "./useCurrentTime";
import { useFortuneVisit } from "./useFortuneVisit";
import { useUniverse } from "./useUniverse";

export function useSlots(testParam?: string | null) {
  const {
    universe,
    persistUniverse,
    cycleCompletePopup,
    closeCycleCompletePopup,
  } = useUniverse();
  const currentTime = useCurrentTime(testParam);
  const {
    rewardPopup,
    lastStarBornAt,
    handleExternalVisit,
    recordStarBorn,
    clearRewardPopup,
  } = useFortuneVisit();

  const todayRecord = getTodayRecord(universe);
  const board = computeSlotBoard(todayRecord, currentTime);
  const allCompleted =
    todayRecord.morning && todayRecord.lunch && todayRecord.dinner;

  const handleRewardClaim = useCallback(
    (intent: VisitIntent, success: boolean) => {
      if (success) {
        const isExtra =
          intent.kind === "fortune"
            ? (board[intent.time].isExtra ?? false)
            : false;
        const result = claimVisitReward(universe, intent, { isExtra });
        if (result) {
          persistUniverse(result.universe);
          if (result.gained > 0) recordStarBorn();
        }
      }
      clearRewardPopup();
    },
    [universe, board, persistUniverse, recordStarBorn, clearRewardPopup],
  );

  return {
    board,
    currentTime,
    todayRecord,
    universe,
    allCompleted,
    handleRewardClaim,
    handleExternalVisit,
    rewardPopup,
    cycleCompletePopup,
    closeCycleCompletePopup,
    lastStarBornAt,
  };
}
