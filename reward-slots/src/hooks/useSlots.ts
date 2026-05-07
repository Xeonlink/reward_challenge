"use client";

import { useState, useEffect, useCallback } from "react";
import {
  computeSlotStates,
  getCurrentTimeOfDay,
  loadCompletion,
  saveCompletion,
  type CompletionRecord,
  type SlotKey,
  type SlotState,
  type TimeOfDay,
  REQUIRED_VISIT_MS,
} from "@/lib/slotLogic";

export interface UseSlots {
  slots: SlotState[];
  currentTime: TimeOfDay;
  completion: CompletionRecord;
  allCompleted: boolean;
  handleSlotClick: (key: SlotKey) => void;
  handleRewardClaim: (key: SlotKey, success: boolean) => void;
  activePopup: SlotKey | null;
  closePopup: () => void;
  rewardPopup: { key: SlotKey; success: boolean } | null;
  closeRewardPopup: () => void;
  visitState: Record<string, "idle" | "visiting" | "done" | "failed">;
}

export function useSlots(testParam?: string | null): UseSlots {
  const [completion, setCompletion] = useState<CompletionRecord>(() => loadCompletion());
  const [currentTime, setCurrentTime] = useState<TimeOfDay>(() =>
    getCurrentTimeOfDay(testParam)
  );
  const [activePopup, setActivePopup] = useState<SlotKey | null>(null);
  const [rewardPopup, setRewardPopup] = useState<{ key: SlotKey; success: boolean } | null>(null);
  const [visitState, setVisitState] = useState<Record<string, "idle" | "visiting" | "done" | "failed">>({});

  // Update time every minute
  useEffect(() => {
    setCurrentTime(getCurrentTimeOfDay(testParam));
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimeOfDay(testParam));
    }, 60_000);
    return () => clearInterval(interval);
  }, [testParam]);

  // Re-sync completion from storage when tab becomes visible
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        const fresh = loadCompletion();
        setCompletion(fresh);

        // Check if any slot was pending a visit and enough time has passed
        const visitData = sessionStorage.getItem("reward_visit");
        if (visitData) {
          try {
            const { key, startTime } = JSON.parse(visitData);
            const elapsed = Date.now() - startTime;
            const success = elapsed >= REQUIRED_VISIT_MS;
            sessionStorage.removeItem("reward_visit");
            setVisitState((prev) => ({ ...prev, [key]: success ? "done" : "failed" }));
            setRewardPopup({ key, success });
          } catch {
            // ignore
          }
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const slots = computeSlotStates(completion, currentTime);

  const allCompleted =
    completion.morning && completion.lunch && completion.dinner;

  const handleSlotClick = useCallback((key: SlotKey) => {
    const slot = slots.find((s) => s.key === key);
    if (!slot) return;
    if (slot.status === "completed" || slot.status === "locked" || slot.status === "inactive") return;
    setActivePopup(key);
  }, [slots]);

  const closePopup = useCallback(() => setActivePopup(null), []);

  const handleExternalVisit = useCallback((key: SlotKey) => {
    // Store visit start time in sessionStorage so we can check on return
    sessionStorage.setItem(
      "reward_visit",
      JSON.stringify({ key, startTime: Date.now() })
    );
    setVisitState((prev) => ({ ...prev, [key]: "visiting" }));
    setActivePopup(null);
    window.open("https://example.com/event", "_blank");
  }, []);

  // Expose handleExternalVisit via handleSlotClick context — we pass it through popup
  // We'll attach it to window for popup to call
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__handleExternalVisit = handleExternalVisit;
  }, [handleExternalVisit]);

  const handleRewardClaim = useCallback(
    (key: SlotKey, success: boolean) => {
      if (success) {
        const updated: CompletionRecord = {
          ...completion,
          [key]: true,
          extraUsed: completion.extraUsed || slots.find((s) => s.key === key)?.isExtra || false,
        };
        setCompletion(updated);
        saveCompletion(updated);
      }
      setRewardPopup(null);
    },
    [completion, slots]
  );

  const closeRewardPopup = useCallback(() => setRewardPopup(null), []);

  // For mock testing: simulate visit result from popup button
  const handleMockVisit = useCallback(
    (key: SlotKey, success: boolean) => {
      setActivePopup(null);
      setTimeout(() => {
        setRewardPopup({ key, success });
        if (success) {
          setVisitState((prev) => ({ ...prev, [key]: "done" }));
        } else {
          setVisitState((prev) => ({ ...prev, [key]: "failed" }));
        }
      }, 500);
    },
    []
  );

  // Attach mock visit to window so popup can access it
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__handleMockVisit = handleMockVisit;
  }, [handleMockVisit]);

  return {
    slots,
    currentTime,
    completion,
    allCompleted,
    handleSlotClick,
    handleRewardClaim,
    activePopup,
    closePopup,
    rewardPopup,
    closeRewardPopup,
    visitState,
  };
}
