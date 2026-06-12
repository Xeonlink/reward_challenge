"use client";

import { useUniverse } from "@/hooks/useUniverse";
import { useUniverseAge } from "@/hooks/useUniverseDays";
import { CYCLE_DAY_GOAL, CYCLE_STAR_GOAL } from "@/lib/constants";
import { useEffect } from "react";
import { useModal } from "../modal";
import { CycleCompletePopup } from "./popups/CycleCompletePopup";

export function OnCycleComplete() {
  const modal = useModal();
  const universeAge = useUniverseAge();
  const totalStars = useUniverse((state) => state.totalStars);

  useEffect(() => {
    if (universeAge >= CYCLE_DAY_GOAL && totalStars >= CYCLE_STAR_GOAL) {
      modal.open(<CycleCompletePopup />);
    }
  }, [modal, universeAge, totalStars]);

  return null;
}
