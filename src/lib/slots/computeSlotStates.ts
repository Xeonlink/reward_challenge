import type {
  CompletionRecord,
  SlotBoard,
  SlotStatus,
  TimeOfDay,
} from "./types";

export function computeSlotBoard(
  completion: CompletionRecord,
  currentTime: TimeOfDay,
): SlotBoard {
  const { morning, lunch, dinner, extraUsed } = completion;

  const board: SlotBoard = {
    morning: { status: "inactive" },
    lunch: { status: "inactive" },
    dinner: { status: "inactive" },
    bonus: { status: "locked" },
  };

  const setFortune = (time: TimeOfDay, status: SlotStatus, isExtra = false) => {
    board[time] = isExtra ? { status, isExtra: true } : { status };
  };

  if (morning) setFortune("morning", "completed");
  if (lunch) setFortune("lunch", "completed");
  if (dinner) setFortune("dinner", "completed");

  if (!morning && currentTime === "morning") setFortune("morning", "active");
  if (!lunch && currentTime === "lunch") setFortune("lunch", "active");
  if (!dinner && currentTime === "dinner") setFortune("dinner", "active");

  if (!extraUsed) {
    if (morning && dinner && !lunch) {
      setFortune("lunch", "extra", true);
    } else if (lunch && dinner && !morning) {
      setFortune("morning", "extra", true);
    } else if (dinner && !morning && !lunch) {
      setFortune("morning", "locked");
      if (currentTime !== "morning") {
        setFortune("lunch", "extra", true);
      }
    } else if (lunch && !morning && !dinner) {
      setFortune("morning", "extra", true);
    } else if (lunch && !morning && currentTime !== "morning") {
      setFortune("morning", "extra", true);
    }
  }

  for (const time of ["morning", "lunch", "dinner"] as const) {
    if (board[time].status === "inactive") {
      const isPast =
        (time === "morning" && currentTime !== "morning") ||
        (time === "lunch" && currentTime === "dinner");
      if (isPast) board[time] = { status: "locked" };
    }
  }

  const allThreeDone = morning && lunch && dinner;
  board.bonus = {
    status: completion.bonus ? "completed" : allThreeDone ? "active" : "locked",
  };

  return board;
}
