"use client";

import { loadUniverse, saveUniverse, type UniverseRecord } from "@/lib/slots";
import { useEffect, useState } from "react";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

type Store = {
  totalStars: number;
  cycleStartDate: string;
  dailyRecord: Record<
    string,
    {
      morning: boolean;
      lunch: boolean;
      dinner: boolean;
      bonus: boolean;
      extraUsed: boolean;
    }
  >;
  actions: {
    setTotalStars: (totalStars: number) => void;
  };
};

const store = createStore<Store>()(
  persist(
    subscribeWithSelector(
      immer((set) => ({
        totalStars: 0,
        cycleStartDate: "",
        dailyRecord: {},
        actions: {
          setTotalStars: (totalStars) => set({ totalStars }),
        },
      })),
    ),
    {
      name: "byulmoa_universe",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        totalStars: state.totalStars,
        cycleStartDate: state.cycleStartDate,
        dailyRecord: state.dailyRecord,
      }),
    },
  ),
);

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
