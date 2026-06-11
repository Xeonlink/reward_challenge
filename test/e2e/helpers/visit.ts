import type { Page } from "@playwright/test";

export type VisitIntent =
  | { kind: "fortune"; time: "morning" | "lunch" | "dinner" }
  | { kind: "bonus" };

const VISIT_STORAGE_KEY = "byulmoa_visit";

export async function clickExternalVisit(page: Page): Promise<void> {
  await page.getByRole("button", { name: "강남철학관 운세 보러 가기" }).click();
}

/** README 보상 Flow: sessionStorage 체류 시간 + visibilitychange 복귀 시뮬레이션 */
export async function simulateVisitReturn(
  page: Page,
  intent: VisitIntent,
  elapsedMs: number,
): Promise<void> {
  await page.evaluate(
    ({ storageKey, intent, elapsed }) => {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({ intent, startTime: Date.now() - elapsed }),
      );
      document.dispatchEvent(new Event("visibilitychange"));
    },
    { storageKey: VISIT_STORAGE_KEY, intent, elapsed: elapsedMs },
  );
}

export async function claimReward(page: Page): Promise<void> {
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: /^(확인|닫기)$/ }).click();
  await dialog.waitFor({ state: "hidden" });
}

export async function completeVisitFlow(
  page: Page,
  intent: VisitIntent,
  elapsedMs: number,
): Promise<void> {
  await simulateVisitReturn(page, intent, elapsedMs);
  await page
    .getByRole("dialog")
    .filter({ hasText: /별 조각 획득!|조건 미충족/ })
    .waitFor();
}
