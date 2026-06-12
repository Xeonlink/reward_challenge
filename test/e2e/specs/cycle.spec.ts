import { expect, test } from "@playwright/test";
import { format, subDays } from "date-fns";
import { expectTotalStars, seedUniverse } from "../helpers/universe";

test.describe("README 30일 사이클", () => {
  test("30일 경과 — 완성 팝업 + 리셋", async ({ page }) => {
    await seedUniverse(page, {
      totalStars: 150,
      cycleStartDate: format(subDays(new Date(), 31), "yyyy-MM-dd"),
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.getByText("우주가 완성되었습니다!")).toBeVisible();
    await page.getByRole("button", { name: "새 여정 시작" }).click();
    await expect(page.getByText("우주가 완성되었습니다!")).toHaveCount(0);
    await expectTotalStars(page, 0);
    await expect(page.getByText("Day 1")).toBeVisible();
    await expect(page.getByText("/ 30")).toBeVisible();
  });
});
