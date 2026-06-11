import { expect, test } from "@playwright/test";
import { gotoTestTime } from "../helpers/slots";
import {
  clearAppStorage,
  expectTotalStars,
  seedUniverse,
} from "../helpers/universe";

test.describe("README 테스트 방법", () => {
  test("?test=morning — 아침 시간대 + TEST 뱃지", async ({ page }) => {
    await gotoTestTime(page, "morning");
    await expect(page.getByText("현재 시간대:")).toBeVisible();
    await expect(page.getByText("아침", { exact: true })).toBeVisible();
    await expect(page.getByText("TEST", { exact: true })).toBeVisible();
  });

  test("?test=lunch — 점심 시간대", async ({ page }) => {
    await gotoTestTime(page, "lunch");
    await expect(page.getByText("점심", { exact: true })).toBeVisible();
    await expect(page.getByText("TEST", { exact: true })).toBeVisible();
  });

  test("?test=dinner — 저녁 시간대", async ({ page }) => {
    await gotoTestTime(page, "dinner");
    await expect(page.getByText("저녁", { exact: true })).toBeVisible();
    await expect(page.getByText("TEST", { exact: true })).toBeVisible();
  });

  test("DevTools hover — Chip과 우주 단계 버튼 노출", async ({ page }) => {
    await clearAppStorage(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const panel = page.getByText("test", { exact: true });
    await panel.hover();
    await expect(
      page.getByRole("link", { name: "?test=morning" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "2단계·15" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "우주 초기화" }),
    ).toBeVisible();
  });

  test("localStorage totalStars:15 — 현황판 별 조각 15", async ({ page }) => {
    await seedUniverse(page, { totalStars: 15 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expectTotalStars(page, 15);
  });

  const presets = [
    { label: "2단계·15", stars: 15 },
    { label: "3단계·30", stars: 30 },
    { label: "4단계·55", stars: 55 },
    { label: "5단계·80", stars: 80 },
    { label: "우주 초기화", stars: 0 },
  ] as const;

  for (const { label, stars } of presets) {
    test(`DevTools ${label} — totalStars ${stars}`, async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const panel = page.getByText("test", { exact: true });
      await panel.hover();
      await page.getByRole("button", { name: label }).click();
      await page.waitForLoadState("networkidle");
      await expectTotalStars(page, stars);
    });
  }
});
