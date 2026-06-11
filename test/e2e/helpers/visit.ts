import type { Page } from "@playwright/test";

export type VisitSlotKey = "morning" | "lunch" | "dinner" | "bonus";

const VISIT_STORAGE_KEY = "byulmoa_visit";

export async function clickExternalVisit(page: Page): Promise<void> {
  await page.getByRole("button", { name: "강남철학관 운세 보러 가기" }).click();
}

/** README 보상 Flow: sessionStorage 체류 시간 + visibilitychange 복귀 시뮬레이션 */
export async function simulateVisitReturn(
  page: Page,
  key: VisitSlotKey,
  elapsedMs: number,
): Promise<void> {
  await page.evaluate(
    ({ storageKey, slotKey, elapsed }) => {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({ key: slotKey, startTime: Date.now() - elapsed }),
      );
      document.dispatchEvent(new Event("visibilitychange"));
    },
    { storageKey: VISIT_STORAGE_KEY, slotKey: key, elapsed: elapsedMs },
  );
}

export async function claimReward(page: Page): Promise<void> {
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: /^(확인|닫기)$/ }).click();
  await dialog.waitFor({ state: "hidden" });
}

export async function completeVisitFlow(
  page: Page,
  key: VisitSlotKey,
  elapsedMs: number,
): Promise<void> {
  await simulateVisitReturn(page, key, elapsedMs);
  await page
    .getByRole("dialog")
    .filter({ hasText: /별 조각 획득!|조건 미충족/ })
    .waitFor();
}
