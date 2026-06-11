"use client";

import { FORTUNE_URL, REQUIRED_VISIT_MS } from "@/lib/constants";
import type { VisitIntent } from "@/lib/slots";
import { useCallback, useEffect, useState } from "react";

export function useFortuneVisit() {
  const [rewardPopup, setRewardPopup] = useState<{
    intent: VisitIntent;
    success: boolean;
  } | null>(null);
  const [lastStarBornAt, setLastStarBornAt] = useState(0);

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;

      const visitData = sessionStorage.getItem("byulmoa_visit");
      if (!visitData) return;

      try {
        const { intent, startTime } = JSON.parse(visitData) as {
          intent: VisitIntent;
          startTime: number;
        };
        const elapsed = Date.now() - startTime;
        const success = elapsed >= REQUIRED_VISIT_MS;
        sessionStorage.removeItem("byulmoa_visit");
        setRewardPopup({ intent, success });
      } catch {
        sessionStorage.removeItem("byulmoa_visit");
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const handleExternalVisit = useCallback((intent: VisitIntent) => {
    sessionStorage.setItem(
      "byulmoa_visit",
      JSON.stringify({ intent, startTime: Date.now() }),
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
