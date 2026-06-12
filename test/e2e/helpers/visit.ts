import type { Page } from "@playwright/test";

export async function clickExternalVisit(page: Page): Promise<void> {
  await page.getByRole("button", { name: "강남철학관 운세 보러 가기" }).click();
}

/**
 * `useUrlVisitor`: 클릭 시각(Date.now) 기준으로 elapsed 경과 후
 * visibilitychange 로 복귀를 시뮬레이션합니다. clickExternalVisit 직후 호출하세요.
 */
export async function simulateVisitReturn(
  page: Page,
  elapsedMs: number,
): Promise<void> {
  await page.waitForTimeout(elapsedMs);
  await page.evaluate(() => {
    document.dispatchEvent(new Event("visibilitychange"));
  });
}

export async function claimReward(page: Page): Promise<void> {
  const rewardDialog = page
    .getByRole("dialog")
    .filter({ hasText: /별 조각 획득!|조건 미충족/ });
  await rewardDialog.getByRole("button", { name: /^(확인|닫기)$/ }).click();
  await rewardDialog.waitFor({ state: "hidden" });
}
