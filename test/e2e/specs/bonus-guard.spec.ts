import { test } from "@playwright/test";
import { expectTodayProgress, gotoTestTime } from "../helpers/slots";
import { expectTotalStars, seedToday } from "../helpers/universe";
import { claimReward, simulateVisitReturn } from "../helpers/visit";

test.describe("보너스 보상 가드", () => {
  test("3개 미완료 시 bonus visit 복귀 후에도 별 조각 증가 없음", async ({
    page,
  }) => {
    await seedToday(page, { morning: true }, { totalStars: 1 });
    await page.goto("/?test=dinner");
    await page.waitForLoadState("networkidle");

    await simulateVisitReturn(page, { kind: "bonus" }, 4000);
    await page.getByText("별 조각 획득!").waitFor();
    await claimReward(page);

    await expectTodayProgress(page, 1);
    await expectTotalStars(page, 1);
  });

  test("locked 보너스 — 운세 보러 가기 버튼 없음", async ({ page }) => {
    await gotoTestTime(page, "dinner");
    await page.locator('[aria-label="별 보너스 — locked"]').click();
    await page.getByText("아침·점심·저녁을 모두 완료해야 합니다").waitFor();
    await page
      .getByRole("button", { name: "강남철학관 운세 보러 가기" })
      .waitFor({ state: "hidden" });
  });
});
