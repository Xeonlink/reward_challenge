import { expect, test } from "@playwright/test";
import {
  clearAppStorage,
  expectTotalStars,
  seedUniverse,
} from "../helpers/universe";

test.describe("README 테스트 방법", () => {
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

  test("DevTools 완료 팝업 — modal.open으로 즉시 표시", async ({ page }) => {
    await clearAppStorage(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const panel = page.getByText("test", { exact: true });
    await panel.hover();
    await page.getByRole("button", { name: "완료 팝업" }).click();
    await expect(page.getByText("우주가 완성되었습니다!")).toBeVisible();
  });

  test("DevTools 30일 완료·reload — loadUniverse 경로로 팝업 표시", async ({
    page,
  }) => {
    await clearAppStorage(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const panel = page.getByText("test", { exact: true });
    await panel.hover();
    await page.getByRole("button", { name: "30일 완료·reload" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("우주가 완성되었습니다!")).toBeVisible();
  });
});
