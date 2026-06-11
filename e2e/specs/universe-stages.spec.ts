import { expect, test } from "@playwright/test";
import {
  expectOrbStage,
  expectTotalStars,
  seedUniverse,
} from "../helpers/universe";

const stages = [
  { totalStars: 0, label: "별이 태어나고 있어요", stage: 1 },
  { totalStars: 15, label: "별이 자라고 있어요", stage: 2 },
  { totalStars: 30, label: "별이 빛나고 있어요", stage: 3 },
  { totalStars: 55, label: "별이 눈부셔요", stage: 4 },
  { totalStars: 80, label: "우주의 별이 되었어요", stage: 5 },
] as const;

test.describe("README 우주 성장 단계", () => {
  for (const { totalStars, label, stage } of stages) {
    test(`totalStars ${totalStars} — ${label}`, async ({ page }) => {
      await seedUniverse(page, { totalStars });
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await expect(page.getByText(label)).toBeVisible();
      await expectOrbStage(page, stage);
      await expectTotalStars(page, totalStars);
    });
  }

  test("경계값 6 — 1단계", async ({ page }) => {
    await seedUniverse(page, { totalStars: 6 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expectOrbStage(page, 1);
    await expect(page.getByText("별이 태어나고 있어요")).toBeVisible();
  });

  test("경계값 7 — 2단계", async ({ page }) => {
    await seedUniverse(page, { totalStars: 7 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expectOrbStage(page, 2);
    await expect(page.getByText("별이 자라고 있어요")).toBeVisible();
  });
});
