"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function getCurrentTimeOfDay(testParam?: string | null) {
  if (testParam === "morning") return "morning";
  if (testParam === "lunch") return "lunch";
  if (testParam === "dinner") return "dinner";

  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "lunch";
  return "dinner";
}

export function useCurrentTime() {
  const [, setTick] = useState(0);

  const searchParams = useSearchParams();
  const testParam = searchParams.get("test");

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(interval);
  }, []);

  return getCurrentTimeOfDay(testParam);
}
