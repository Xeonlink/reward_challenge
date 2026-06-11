import type { SlotKey } from "@/lib/slots";
import type { ComponentType } from "react";
import { BonusIcon, DinnerIcon, LunchIcon, MorningIcon } from "./SlotIcons";

export const SLOT_ICONS: Record<
  SlotKey,
  ComponentType<{ color: string; size?: number }>
> = {
  morning: MorningIcon,
  lunch: LunchIcon,
  dinner: DinnerIcon,
  bonus: BonusIcon,
};
