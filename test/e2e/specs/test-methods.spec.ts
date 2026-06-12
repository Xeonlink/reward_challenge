import { expect, test, type Page } from "@playwright/test";
import { differenceInDays, parse } from "date-fns";
import {
  clearAppStorage,
  expectTotalStars,
  seedUniverse,
} from "../helpers/universe";

async function openDevTools(page: Page) {
  await page.getByTestId("dev-tools-trigger").click();
}

async function setDevToolsStars(page: Page, stars: number) {
  const input = page.getByTestId("dev-tools-star-input");
  await input.fill(String(stars));
}

async function setDevToolsCycleStart(page: Page, date: string) {
  await page.getByTestId("dev-tools-cycle-start-input").fill(date);
}

function starControls(page: Page) {
  return page.getByTestId("dev-tools-star-input").locator("xpath=..");
}

function cycleStartControls(page: Page) {
  return page.getByTestId("dev-tools-cycle-start-input").locator("xpath=..");
}

function expectedUniverseAge(cycleStartDate: string): number {
  const start = parse(cycleStartDate, "yyyy-MM-dd", new Date());
  return differenceInDays(new Date(), start) + 1;
}

test.describe("README 테스트 방법", () => {
  test("DevTools click — Chip과 별 개수 컨트롤 노출", async ({ page }) => {
    await clearAppStorage(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await openDevTools(page);
    await expect(page.getByRole("link", { name: "아침" })).toBeVisible();
    await expect(
      page.getByRole("spinbutton", { name: "별 개수" }),
    ).toBeVisible();
    await expect(page.getByLabel("사이클 시작일")).toBeVisible();
    await expect(
      starControls(page).getByRole("button", { name: "적용", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "우주 초기화" }),
    ).toBeVisible();
    await expect(page.getByTestId("dev-tools-universe-state")).toBeVisible();
  });

  test("DevTools universe state — seeded record 표시", async ({ page }) => {
    await seedUniverse(page, {
      totalStars: 15,
      record: { morning: true, lunch: true },
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await openDevTools(page);
    const state = page.getByTestId("dev-tools-universe-state");
    await expect(state).toContainText("stars: 15");
    await expect(state).toContainText("M✓");
    await expect(state).toContainText("L✓");
    await expect(state).toContainText("D✗");
  });

  test("localStorage totalStars:15 — 현황판 별 조각 15", async ({ page }) => {
    await seedUniverse(page, { totalStars: 15 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expectTotalStars(page, 15);
  });

  const starCases = [15, 30, 55, 80, 0] as const;

  for (const stars of starCases) {
    test(`DevTools 적용(live) — totalStars ${stars}`, async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await openDevTools(page);
      await setDevToolsStars(page, stars);
      await starControls(page)
        .getByRole("button", { name: "적용", exact: true })
        .click();

      await expect(page.locator("[data-total-stars]")).toHaveAttribute(
        "data-total-stars",
        String(stars),
      );
      await expect(page.getByTestId("dev-tools-universe-state")).toContainText(
        `stars: ${stars}`,
      );
      await expectTotalStars(page, stars);
    });
  }

  test("DevTools 적용·reload — totalStars 42", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await openDevTools(page);
    await setDevToolsStars(page, 42);
    await starControls(page).getByRole("button", { name: "적용·reload" }).click();
    await page.waitForLoadState("networkidle");

    await expectTotalStars(page, 42);
  });

  test("DevTools 완료 팝업 — modal.open으로 즉시 표시", async ({ page }) => {
    await clearAppStorage(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await openDevTools(page);
    await page.getByRole("button", { name: "완료 팝업" }).click();
    await expect(page.getByText("우주가 완성되었습니다!")).toBeVisible();
  });

  test("DevTools 사이클 시작일 적용(live) — Day N 갱신", async ({ page }) => {
    await clearAppStorage(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cycleStartDate = "2026-01-01";
    const expectedDay = expectedUniverseAge(cycleStartDate);

    await openDevTools(page);
    await setDevToolsCycleStart(page, cycleStartDate);
    await cycleStartControls(page)
      .getByRole("button", { name: "적용", exact: true })
      .click();

    await expect(page.getByText(`Day ${expectedDay}`)).toBeVisible();
    await expect(page.getByTestId("dev-tools-universe-state")).toContainText(
      cycleStartDate,
    );
  });

  test("DevTools 사이클 시작일 적용·reload — persist 유지", async ({
    page,
  }) => {
    await clearAppStorage(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cycleStartDate = "2026-01-01";

    await openDevTools(page);
    await setDevToolsCycleStart(page, cycleStartDate);
    await cycleStartControls(page)
      .getByRole("button", { name: "적용·reload" })
      .click();
    await page.waitForLoadState("networkidle");

    await expect(page.getByTestId("dev-tools-universe-state")).toContainText(
      cycleStartDate,
    );
    await expect(
      page.getByText(`Day ${expectedUniverseAge(cycleStartDate)}`),
    ).toBeVisible();
  });

  test("DevTools 30일 완료·reload — loadUniverse 경로로 팝업 표시", async ({
    page,
  }) => {
    await clearAppStorage(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await openDevTools(page);
    await page.getByRole("button", { name: "30일 완료·reload" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("우주가 완성되었습니다!")).toBeVisible();
  });
});
