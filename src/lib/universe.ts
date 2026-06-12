"use client";

import { format } from "date-fns";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

export type FortuneSlot = "morning" | "lunch" | "dinner";

export type DayRecord = {
  morning: boolean;
  lunch: boolean;
  dinner: boolean;
  bonus: boolean;
};

export type UniverseStore = {
  totalStars: number;
  cycleStartDate: string;
  lastRecordDate: string;
  record: DayRecord;
  actions: {
    completeFortune: (slot: FortuneSlot) => void;
    completeBonus: () => void;
    resetUniverse: () => void;
    startNewCycle: () => void;
  };
};

const emptyRecord = (): DayRecord => ({
  morning: false,
  lunch: false,
  dinner: false,
  bonus: false,
});

export const universeStore = createStore<UniverseStore>()(
  persist(
    subscribeWithSelector(
      immer((set) => ({
        totalStars: 0,
        cycleStartDate: format(new Date(), "yyyy-MM-dd"),
        lastRecordDate: format(new Date(), "yyyy-MM-dd"),
        record: emptyRecord(),
        actions: {
          completeFortune: (slot) => {
            set((state) => {
              const currentDate = format(new Date(), "yyyy-MM-dd");
              state.lastRecordDate = currentDate;
              state.record[slot] = true;
              state.totalStars += 1;
            });
          },
          completeBonus: () => {
            set((state) => {
              const { morning, lunch, dinner, bonus } = state.record;
              if (bonus || !morning || !lunch || !dinner) {
                return;
              }
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
              state.record = emptyRecord();
            });
          },
          startNewCycle: () => {
            set((state) => {
              const today = format(new Date(), "yyyy-MM-dd");
              state.totalStars = 0;
              state.cycleStartDate = today;
              state.lastRecordDate = today;
              state.record = emptyRecord();
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
        return persistedState as UniverseStore;
      },
    },
  ),
);
