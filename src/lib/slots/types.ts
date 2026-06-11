export type TimeOfDay = "morning" | "lunch" | "dinner";
export type SlotStatus =
  | "inactive"
  | "active"
  | "completed"
  | "extra"
  | "locked";
export type SlotKey = "morning" | "lunch" | "dinner" | "bonus";

export interface SlotState {
  key: SlotKey;
  status: SlotStatus;
  isExtra?: boolean;
  canUseExtra?: boolean;
}

export interface CompletionRecord {
  morning: boolean;
  lunch: boolean;
  dinner: boolean;
  bonus: boolean;
  extraUsed: boolean;
  visitStart?: Record<SlotKey, number>;
  rewardClaimed?: Record<SlotKey, boolean>;
}

export interface UniverseRecord {
  totalStars: number;
  cycleStartDate: string;
  dailyRecord: {
    [date: string]: {
      morning: boolean;
      lunch: boolean;
      dinner: boolean;
      bonus: boolean;
      extraUsed: boolean;
    };
  };
}

export const EMPTY_DAY: CompletionRecord = {
  morning: false,
  lunch: false,
  dinner: false,
  bonus: false,
  extraUsed: false,
};
