import { expect, test } from "@playwright/test";
import {
  expectTodayProgress,
  gotoTestTime,
  openSlotPopup,
} from "../helpers/slots";
import { expectTotalStars, seedToday } from "../helpers/universe";
import {
  claimReward,
  clickExternalVisit,
  simulateVisitReturn,
} from "../helpers/visit";

test.describe("README 보상 수령 Flow", () => {
  test("성공 — 3초+ 체류 후 별 조각 +1", async ({ page }) => {
    await gotoTestTime(page, "dinner");
    await openSlotPopup(page, "저녁 운세", "active");
    await expect(
      page.getByRole("button", { name: "강남철학관 운세 보러 가기" }),
    ).toBeVisible();
    await clickExternalVisit(page);
    await simulateVisitReturn(page, 4000);
    await expect(page.getByText("별 조각 획득!")).toBeVisible();
    await claimReward(page);
    await expectTodayProgress(page, 1);
    await expectTotalStars(page, 1);
  });

  test("실패 — 체류 시간 부족", async ({ page }) => {
    await gotoTestTime(page, "dinner");
    await openSlotPopup(page, "저녁 운세", "active");
    await clickExternalVisit(page);
    await simulateVisitReturn(page, 1000);
    await expect(page.getByText("조건 미충족")).toBeVisible();
    await expect(page.getByText("체류 시간이 부족합니다.")).toBeVisible();
    await claimReward(page);
    await expectTodayProgress(page, 0);
  });

  test("보너스 +2 — 하루 5/5", async ({ page }) => {
    await seedToday(
      page,
      {
        morning: true,
        lunch: true,
        dinner: true,
        bonus: false,
      },
      { totalStars: 3 },
    );
    await page.goto("/?test=dinner");
    await page.waitForLoadState("networkidle");

    await openSlotPopup(page, "별 보너스", "active");
    await clickExternalVisit(page);
    await simulateVisitReturn(page, 4000);
    await expect(page.getByText("별 조각 획득!")).toBeVisible();
    await claimReward(page);
    await expectTodayProgress(page, 5);
    await expectTotalStars(page, 5);
  });

  test("실탭 — 새 탭 3.5초 후 복귀 성공", async ({ page, context }) => {
    await gotoTestTime(page, "dinner");
    await openSlotPopup(page, "저녁 운세", "active");

    const [popup] = await Promise.all([
      context.waitForEvent("page"),
      clickExternalVisit(page),
    ]);
    await popup.waitForLoadState("domcontentloaded");
    await popup.waitForTimeout(3500);
    await popup.close();
    await page.bringToFront();
    await page.evaluate(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });

    await expect(page.getByText("별 조각 획득!")).toBeVisible({
      timeout: 10000,
    });
  });
});
