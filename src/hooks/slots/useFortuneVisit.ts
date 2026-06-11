"use client";

import { FORTUNE_URL, REQUIRED_VISIT_MS } from "@/lib/constants";
import type { SlotKey } from "@/lib/slots";
import { useCallback, useEffect, useState } from "react";

export function useFortuneVisit() {
  const [rewardPopup, setRewardPopup] = useState<{
    key: SlotKey;
    success: boolean;
  } | null>(null);
  const [lastStarBornAt, setLastStarBornAt] = useState(0);

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;

      const visitData = sessionStorage.getItem("byulmoa_visit");
      if (!visitData) return;

      try {
        const { key, startTime } = JSON.parse(visitData) as {
          key: SlotKey;
          startTime: number;
        };
        const elapsed = Date.now() - startTime;
        const success = elapsed >= REQUIRED_VISIT_MS;
        sessionStorage.removeItem("byulmoa_visit");
        setRewardPopup({ key, success });
      } catch {
        sessionStorage.removeItem("byulmoa_visit");
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const handleExternalVisit = useCallback((key: SlotKey) => {
    sessionStorage.setItem(
      "byulmoa_visit",
      JSON.stringify({ key, startTime: Date.now() }),
    );
    window.open(FORTUNE_URL, "_blank");
  }, []);

  const recordStarBorn = useCallback(() => {
    setLastStarBornAt(performance.now());
  }, []);

  const clearRewardPopup = useCallback(() => setRewardPopup(null), []);

  return {
    rewardPopup,
    lastStarBornAt,
    handleExternalVisit,
    recordStarBorn,
    clearRewardPopup,
  };
}
