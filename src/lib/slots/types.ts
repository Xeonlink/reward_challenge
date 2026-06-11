export type TimeOfDay = "morning" | "lunch" | "dinner";
export type SlotStatus =
  | "inactive"
  | "active"
  | "completed"
  | "extra"
  | "locked";

export type VisitIntent =
  | { kind: "fortune"; time: TimeOfDay }
  | { kind: "bonus" };

export type FortuneSlotView = {
  status: SlotStatus;
  isExtra?: boolean;
};

export type BonusSlotView = {
  status: SlotStatus;
};

export type SlotBoard = {
  morning: FortuneSlotView;
  lunch: FortuneSlotView;
  dinner: FortuneSlotView;
  bonus: BonusSlotView;
};

export interface CompletionRecord {
  morning: boolean;
  lunch: boolean;
  dinner: boolean;
  bonus: boolean;
  extraUsed: boolean;
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
