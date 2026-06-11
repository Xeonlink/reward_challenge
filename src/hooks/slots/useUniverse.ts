"use client";

import { loadUniverse, saveUniverse, type UniverseRecord } from "@/lib/slots";
import { useEffect, useState } from "react";

const INIT_UNIVERSE: UniverseRecord = {
  totalStars: 0,
  cycleStartDate: "",
  dailyRecord: {},
};

export function useUniverse() {
  const [universe, setUniverse] = useState<UniverseRecord>(INIT_UNIVERSE);
  const [cycleCompletePopup, setCycleCompletePopup] = useState(false);

  useEffect(() => {
    const { record, cycleCompleted } = loadUniverse();
    // localStorage는 클라이언트 마운트 후에만 읽을 수 있음
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration 후 1회 동기화
    setUniverse(record);
    if (cycleCompleted) setCycleCompletePopup(true);
  }, []);

  const persistUniverse = (next: UniverseRecord) => {
    setUniverse(next);
    saveUniverse(next);
  };

  const closeCycleCompletePopup = () => setCycleCompletePopup(false);

  return {
    universe,
    persistUniverse,
    cycleCompletePopup,
    closeCycleCompletePopup,
  };
}
