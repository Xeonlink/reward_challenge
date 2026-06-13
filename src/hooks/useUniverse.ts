import { universeStore, UniverseStore } from "@/lib/universe";
import { useStore } from "zustand";

export function useUniverse<T>(selector: (state: UniverseStore) => T) {
  return useStore(universeStore, selector);
}
