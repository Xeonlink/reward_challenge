"use client";

import { getCurrentTimeOfDay } from "@/lib/slots";
import { useEffect, useState } from "react";

export function useCurrentTime(testParam?: string | null) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(interval);
  }, []);

  return getCurrentTimeOfDay(testParam);
}
