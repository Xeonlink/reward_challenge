"use client";

import { format } from "date-fns";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

export interface UniverseRecord {
  totalStars: number;
  cycleStartDate: string;
  dailyRecord: {
    [date: string]: {
      morning: boolean;
      lunch: boolean;
      dinner: boolean;
      bonus: boolean;
      extraUsed: boolean;
    };
  };
}

type UniverseStore = UniverseRecord & {
  actions: {
    setUniverse: (universe: UniverseRecord) => void;
    completeFortune: (
      date: string,
      dailyRecordKey: "morning" | "lunch" | "dinner" | "bonus" | "extraUsed",
    ) => void;
    resetUniverse: () => void;
  };
};

export const universeStore = createStore<UniverseStore>()(
  persist(
    subscribeWithSelector(
      immer((set) => ({
        totalStars: 0,
        cycleStartDate: format(new Date(), "yyyy-MM-dd"),
        dailyRecord: {},
        actions: {
          setUniverse: (universe: UniverseRecord) => set(universe),
          completeFortune: (
            date: string,
            dailyRecordKey:
              | "morning"
              | "lunch"
              | "dinner"
              | "bonus"
              | "extraUsed",
          ) => {
            set((state) => {
              state.dailyRecord[date][dailyRecordKey] = true;
            });
          },
          resetUniverse: () => {
            set((state) => {
              state.totalStars = 0;
              state.cycleStartDate = format(new Date(), "yyyy-MM-dd");
              state.dailyRecord = {};
            });
          },
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
