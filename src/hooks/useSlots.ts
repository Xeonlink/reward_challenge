"use client";

import { useStore } from "zustand";
import { universeStore } from "../lib/universe";

export function useSlots() {
  const universe = useStore(universeStore);

  const allCompleted =
    universe.record.morning && universe.record.lunch && universe.record.dinner;

  return {
    universe,
    allCompleted,
  };
}
