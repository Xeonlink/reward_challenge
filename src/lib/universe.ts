"use client";

import { format } from "date-fns";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

export type UniverseStore = {
  totalStars: number;
  cycleStartDate: string; // yyyy-MM-dd
  lastRecordDate: string; // yyyy-MM-dd
  record: {
    morning: boolean;
    lunch: boolean;
    dinner: boolean;
    bonus: boolean;
  };
  actions: {
    completeFortune: (dailyRecordKey: "morning" | "lunch" | "dinner") => void;
    completeBonus: () => void;
    resetUniverse: () => void;
  };
};

export const universeStore = createStore<UniverseStore>()(
  persist(
    subscribeWithSelector(
      immer((set) => ({
        totalStars: 0,
        cycleStartDate: format(new Date(), "yyyy-MM-dd"),
        lastRecordDate: format(new Date(), "yyyy-MM-dd"),
        record: {
          morning: false,
          lunch: false,
          dinner: false,
          bonus: false,
        },
        actions: {
          completeFortune: (dailyRecordKey) => {
            set((state) => {
              const currentDate = format(new Date(), "yyyy-MM-dd");
              state.lastRecordDate = currentDate;
              state.record[dailyRecordKey] = true;
              state.totalStars += 1;
            });
          },
          completeBonus: () => {
            set((state) => {
              const currentDate = format(new Date(), "yyyy-MM-dd");
              state.lastRecordDate = currentDate;
              state.record.bonus = true;
              state.totalStars += 2;
            });
          },
          resetUniverse: () => {
            set((state) => {
              state.totalStars = 0;
              state.lastRecordDate = format(new Date(), "yyyy-MM-dd");
              state.record = {
                morning: false,
                lunch: false,
                dinner: false,
                bonus: false,
              };
            });
          },
        },
      })),
    ),
    {
      version: 1,
      name: "byulmoa_universe",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        totalStars: state.totalStars,
        cycleStartDate: state.cycleStartDate,
        lastRecordDate: state.lastRecordDate,
        record: state.record,
      }),
      migrate: (persistedState, version) => {
        console.log(persistedState, version);
      },
    },
  ),
);
