"use client";

import {
  applyRewardClaim,
  computeSlotStates,
  getTodayRecord,
  type SlotKey,
} from "@/lib/slots";
import { useCallback } from "react";
import { useCurrentTime } from "./useCurrentTime";
import { useFortuneVisit } from "./useFortuneVisit";
import { useUniverse } from "./useUniverse";

export function useSlots(testParam?: string | null) {
  const { universe, persistUniverse, cycleCompletePopup, closeCycleCompletePopup } =
    useUniverse();
  const currentTime = useCurrentTime(testParam);
  const {
    rewardPopup,
    lastStarBornAt,
    handleExternalVisit,
    recordStarBorn,
    clearRewardPopup,
  } = useFortuneVisit();

  const todayRecord = getTodayRecord(universe);
  const slots = computeSlotStates(todayRecord, currentTime);
  const allCompleted =
    todayRecord.morning && todayRecord.lunch && todayRecord.dinner;

  const handleRewardClaim = useCallback(
    (key: SlotKey, success: boolean) => {
      if (success) {
        const slot = slots.find((s) => s.key === key);
        const result = applyRewardClaim(universe, key, {
          isExtra: slot?.isExtra ?? false,
        });
        if (result) {
          persistUniverse(result.universe);
          if (result.gained > 0) recordStarBorn();
        }
      }
      clearRewardPopup();
    },
    [universe, slots, persistUniverse, recordStarBorn, clearRewardPopup],
  );

  return {
    slots,
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
