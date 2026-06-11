"use client";

import { FORTUNE_URL, REQUIRED_VISIT_MS } from "@/lib/constants";
import {
  computeSlotStates,
  getCurrentTimeOfDay,
  getTodayKey,
  getTodayRecord,
  loadUniverse,
  saveUniverse,
  starsFromDay,
  type CompletionRecord,
  type SlotKey,
  type TimeOfDay,
  type UniverseRecord,
} from "@/lib/slotLogic";
import { useCallback, useEffect, useState } from "react";

export interface UseSlots {
  slots: ReturnType<typeof computeSlotStates>;
  currentTime: TimeOfDay;
  todayRecord: CompletionRecord;
  universe: UniverseRecord;
  allCompleted: boolean;
  handleSlotClick: (key: SlotKey) => void;
  handleRewardClaim: (key: SlotKey, success: boolean) => void;
  handleExternalVisit: (key: SlotKey) => void;
  handleMockVisit: (key: SlotKey, success: boolean) => void;
  activePopup: SlotKey | null;
  closePopup: () => void;
  rewardPopup: { key: SlotKey; success: boolean } | null;
  closeRewardPopup: () => void;
  visitState: Record<string, "idle" | "visiting" | "done" | "failed">;
  cycleCompletePopup: boolean;
  closeCycleCompletePopup: () => void;
  /** performance.now() timestamp set when a new star is earned; 0 otherwise */
  lastStarBornAt: number;
}

// SSR-safe 초기값
const INIT_UNIVERSE: UniverseRecord = {
  totalStars: 0,
  cycleStartDate: "",
  dailyRecord: {},
};

export function useSlots(testParam?: string | null): UseSlots {
  const [universe, setUniverse] = useState<UniverseRecord>(INIT_UNIVERSE);
  const [currentTime, setCurrentTime] = useState<TimeOfDay>("morning");
  const [activePopup, setActivePopup] = useState<SlotKey | null>(null);
  const [rewardPopup, setRewardPopup] = useState<{
    key: SlotKey;
    success: boolean;
  } | null>(null);
  const [visitState, setVisitState] = useState<
    Record<string, "idle" | "visiting" | "done" | "failed">
  >({});
  const [cycleCompletePopup, setCycleCompletePopup] = useState(false);
  const [lastStarBornAt, setLastStarBornAt] = useState(0);

  // 마운트 후 localStorage에서 실제 데이터 로드
  useEffect(() => {
    const { record, cycleCompleted } = loadUniverse();
    setUniverse(record);
    if (cycleCompleted) setCycleCompletePopup(true);
  }, []);

  // 현재 시간대 동기화
  useEffect(() => {
    setCurrentTime(getCurrentTimeOfDay(testParam));
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimeOfDay(testParam));
    }, 60_000);
    return () => clearInterval(interval);
  }, [testParam]);

  // 탭 복귀 시: 방문 체류 시간 검사 → RewardPopup 표시
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
        setVisitState((prev) => ({
          ...prev,
          [key]: success ? "done" : "failed",
        }));
        setRewardPopup({ key, success });
      } catch {
        sessionStorage.removeItem("byulmoa_visit");
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const todayRecord = getTodayRecord(universe);
  const slots = computeSlotStates(todayRecord, currentTime);
  const allCompleted =
    todayRecord.morning && todayRecord.lunch && todayRecord.dinner;

  const handleSlotClick = useCallback(
    (key: SlotKey) => {
      const slot = slots.find((s) => s.key === key);
      if (!slot) return;
      if (slot.status === "completed" || slot.status === "inactive") return;
      if (slot.status === "locked" && key !== "bonus") return;
      setActivePopup(key);
    },
    [slots],
  );

  const closePopup = useCallback(() => setActivePopup(null), []);

  // 실제 외부 방문: sessionStorage에 타임스탬프 저장 → 새 탭 열기
  const handleExternalVisit = useCallback((key: SlotKey) => {
    sessionStorage.setItem(
      "byulmoa_visit",
      JSON.stringify({ key, startTime: Date.now() }),
    );
    setVisitState((prev) => ({ ...prev, [key]: "visiting" }));
    setActivePopup(null);
    window.open(FORTUNE_URL, "_blank");
  }, []);

  // 목업 테스트 방문: 실제 이동 없이 결과만 시뮬레이션 → RewardPopup 표시
  const handleMockVisit = useCallback((key: SlotKey, success: boolean) => {
    setActivePopup(null);
    setVisitState((prev) => ({ ...prev, [key]: success ? "done" : "failed" }));
    setTimeout(() => {
      setRewardPopup({ key, success });
    }, 300);
  }, []);

  // 보상 확정: dailyRecord 업데이트 + totalStars 누적 + 별 탄생 타임스탬프 기록
  const handleRewardClaim = useCallback(
    (key: SlotKey, success: boolean) => {
      if (success) {
        const todayKey = getTodayKey();
        const prevDay = universe.dailyRecord[todayKey] ?? {
          morning: false,
          lunch: false,
          dinner: false,
          bonus: false,
          extraUsed: false,
        };
        const updatedDay = {
          ...prevDay,
          [key]: true,
          extraUsed:
            prevDay.extraUsed ||
            (slots.find((s) => s.key === key)?.isExtra ?? false),
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

        setUniverse(updatedUniverse);
        saveUniverse(updatedUniverse);

        // 새 별이 생겼을 때 탄생 타임스탬프 기록 (CosmicOrb 애니메이션용)
        if (gained > 0) {
          setLastStarBornAt(performance.now());
        }
      }
      setRewardPopup(null);
    },
    [universe, slots],
  );

  const closeRewardPopup = useCallback(() => setRewardPopup(null), []);
  const closeCycleCompletePopup = useCallback(
    () => setCycleCompletePopup(false),
    [],
  );

  return {
    slots,
    currentTime,
    todayRecord,
    universe,
    allCompleted,
    handleSlotClick,
    handleRewardClaim,
    handleExternalVisit,
    handleMockVisit,
    activePopup,
    closePopup,
    rewardPopup,
    closeRewardPopup,
    visitState,
    cycleCompletePopup,
    closeCycleCompletePopup,
    lastStarBornAt,
  };
}
