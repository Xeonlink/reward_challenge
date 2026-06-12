import { differenceInDays } from "date-fns";
import { useUniverse } from "./useUniverse";

export function useUniverseAge() {
  return useUniverse((state) =>
    Math.max(differenceInDays(new Date(), state.cycleStartDate) + 1, 30),
  );
}
