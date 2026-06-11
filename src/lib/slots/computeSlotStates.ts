import type {
  CompletionRecord,
  SlotKey,
  SlotState,
  SlotStatus,
  TimeOfDay,
} from "./types";

export function computeSlotStates(
  completion: CompletionRecord,
  currentTime: TimeOfDay,
): SlotState[] {
  const { morning, lunch, dinner, extraUsed } = completion;

  const slots: SlotState[] = [
    { key: "morning", status: "inactive" },
    { key: "lunch", status: "inactive" },
    { key: "dinner", status: "inactive" },
  ];

  const setStatus = (key: SlotKey, status: SlotStatus, isExtra = false) => {
    const slot = slots.find((s) => s.key === key);
    if (slot) {
      slot.status = status;
      slot.isExtra = isExtra;
    }
  };

  if (morning) setStatus("morning", "completed");
  if (lunch) setStatus("lunch", "completed");
  if (dinner) setStatus("dinner", "completed");

  if (!morning && currentTime === "morning") setStatus("morning", "active");
  if (!lunch && currentTime === "lunch") setStatus("lunch", "active");
  if (!dinner && currentTime === "dinner") setStatus("dinner", "active");

  if (!extraUsed) {
    if (morning && dinner && !lunch) {
      setStatus("lunch", "extra", true);
    } else if (lunch && dinner && !morning) {
      setStatus("morning", "extra", true);
    } else if (dinner && !morning && !lunch) {
      setStatus("morning", "locked");
      if (currentTime !== "morning") {
        setStatus("lunch", "extra", true);
      }
    } else if (lunch && !morning && !dinner) {
      setStatus("morning", "extra", true);
    } else if (lunch && !morning && currentTime !== "morning") {
      setStatus("morning", "extra", true);
    }
  }

  slots.forEach((slot) => {
    if (slot.status === "inactive") {
      const isPast =
        (slot.key === "morning" && currentTime !== "morning") ||
        (slot.key === "lunch" && currentTime === "dinner");
      if (isPast) slot.status = "locked";
    }
  });

  const result: SlotState[] = [...slots];
  const allThreeDone = morning && lunch && dinner;
  result.push({
    key: "bonus",
    status: completion.bonus ? "completed" : allThreeDone ? "active" : "locked",
  });

  return result;
}
