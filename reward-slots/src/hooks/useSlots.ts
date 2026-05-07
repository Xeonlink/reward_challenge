"use client";

import { useState, useEffect, useCallback } from "react";
import {
  computeSlotStates,
  getCurrentTimeOfDay,
  loadCompletion,
  saveCompletion,
  loadCycle,
  saveCycle,
  countStarsFromCompletion,
  type CompletionRecord,
  type CycleRecord,
  type SlotKey,
  type TimeOfDay,
  REQUIRED_VISIT_MS,
  FORTUNE_URL,
} from "@/lib/slotLogic";

export interface UseSlots {
  slots: ReturnType<typeof computeSlotStates>;
  currentTime: TimeOfDay;
  completion: CompletionRecord;
  cycle: CycleRecord;
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
}

// SSR-safe 초기값 — 브라우저 API 없이 서버/클라이언트 동일하게 유지
const INIT_COMPLETION: CompletionRecord = {
  morning: false,
  lunch: false,
  dinner: false,
  bonus: false,
  extraUsed: false,
};

const INIT_CYCLE: CycleRecord = {
  cycleStart: "",
  totalStars: 0,
  currentDay: 1,
};

export function useSlots(testParam?: string | null): UseSlots {
  const [completion, setCompletion] = useState<CompletionRecord>(INIT_COMPLETION);
  const [cycle, setCycle] = useState<CycleRecord>(INIT_CYCLE);
  const [currentTime, setCurrentTime] = useState<TimeOfDay>("morning");

  const [activePopup, setActivePopup] = useState<SlotKey | null>(null);
  const [rewardPopup, setRewardPopup] = useState<{ key: SlotKey; success: boolean } | null>(null);
  const [visitState, setVisitState] = useState<Record<string, "idle" | "visiting" | "done" | "failed">>({});

  // 마운트 후 localStorage에서 실제 데이터 로드
  useEffect(() => {
    setCompletion(loadCompletion());
    setCycle(loadCycle());
  }, []);

  // 현재 시간대 동기화 (클라이언트 로컬 타임 기준)
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
        const { key, startTime } = JSON.parse(visitData) as { key: SlotKey; startTime: number };
        const elapsed = Date.now() - startTime;
        const success = elapsed >= REQUIRED_VISIT_MS;
        sessionStorage.removeItem("byulmoa_visit");
        setVisitState((prev) => ({ ...prev, [key]: success ? "done" : "failed" }));
        setRewardPopup({ key, success });
      } catch {
        sessionStorage.removeItem("byulmoa_visit");
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const slots = computeSlotStates(completion, currentTime);
  const allCompleted = completion.morning && completion.lunch && completion.dinner;

  const handleSlotClick = useCallback(
    (key: SlotKey) => {
      const slot = slots.find((s) => s.key === key);
      if (!slot) return;
      if (slot.status === "completed" || slot.status === "locked" || slot.status === "inactive") return;
      setActivePopup(key);
    },
    [slots]
  );

  const closePopup = useCallback(() => setActivePopup(null), []);

  // 실제 외부 방문: sessionStorage에 타임스탬프 저장 → 새 탭 열기
  const handleExternalVisit = useCallback((key: SlotKey) => {
    sessionStorage.setItem(
      "byulmoa_visit",
      JSON.stringify({ key, startTime: Date.now() })
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

  // 보상 확정: completion 업데이트 + localStorage 저장 + 사이클 별 조각 누적
  const handleRewardClaim = useCallback(
    (key: SlotKey, success: boolean) => {
      if (success) {
        const updated: CompletionRecord = {
          ...completion,
          [key]: true,
          extraUsed:
            completion.extraUsed ||
            slots.find((s) => s.key === key)?.isExtra ||
            false,
        };
        setCompletion(updated);
        saveCompletion(updated);

        const gained =
          countStarsFromCompletion(updated) - countStarsFromCompletion(completion);
        if (gained > 0) {
          const updatedCycle = { ...cycle, totalStars: cycle.totalStars + gained };
          setCycle(updatedCycle);
          saveCycle(updatedCycle);
        }
      }
      setRewardPopup(null);
    },
    [completion, slots, cycle]
  );

  const closeRewardPopup = useCallback(() => setRewardPopup(null), []);

  return {
    slots,
    currentTime,
    completion,
    cycle,
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
  };
}
