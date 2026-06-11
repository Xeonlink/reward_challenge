import type { SlotKey, SlotStatus } from "./types";

export function isSlotClickable(status: SlotStatus, slotKey: SlotKey): boolean {
  if (status === "completed" || status === "inactive") return false;
  if (status === "locked" && slotKey !== "bonus") return false;
  return true;
}
