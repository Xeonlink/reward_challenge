"use client";

export function useUrlVisitor() {
  const tryVisit = (url: string, requiredVisitMs: number) =>
    new Promise<{ success: boolean }>((resolve) => {
      const now = Date.now();

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState !== "visible") return;

        const elapsed = Date.now() - now;
        if (elapsed >= requiredVisitMs) {
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
      });

      window.open(url, "_blank");
    });

  return {
    tryVisit,
  };
}
