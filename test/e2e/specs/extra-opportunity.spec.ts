import { expect, test } from "@playwright/test";
import { slotByAria } from "../helpers/slots";
import { seedToday } from "../helpers/universe";

const cases = [
  {
    name: "점심 완료",
    testTime: "lunch",
    record: { lunch: true },
    expectations: [
      { label: "아침 운세", status: "extra" },
      { label: "정오 운세", status: "completed" },
    ],
  },
  {
    name: "점심+저녁 완료",
    testTime: "dinner",
    record: { lunch: true, dinner: true },
    expectations: [
      { label: "아침 운세", status: "locked" },
      { label: "정오 운세", status: "completed" },
      { label: "저녁 운세", status: "completed" },
    ],
  },
  {
    name: "저녁만 완료",
    testTime: "dinner",
    record: { dinner: true },
    expectations: [
      { label: "아침 운세", status: "locked" },
      { label: "정오 운세", status: "extra" },
      { label: "저녁 운세", status: "completed" },
    ],
  },
  {
    name: "아침+저녁 완료",
    testTime: "dinner",
    record: { morning: true, dinner: true },
    expectations: [
      { label: "아침 운세", status: "completed" },
      { label: "정오 운세", status: "extra" },
      { label: "저녁 운세", status: "completed" },
    ],
  },
] as const;

test.describe("README 추가기회 케이스", () => {
  for (const { name, testTime, record, expectations } of cases) {
    test(name, async ({ page }) => {
      await seedToday(page, record);
      await page.goto(`/?test=${testTime}`);
      await page.waitForLoadState("networkidle");

      for (const { label, status } of expectations) {
        await expect(slotByAria(page, label, status)).toBeVisible();
      }
    });
  }

  test("아침 추가기회는 점심 시간대에만 — 저녁에는 locked", async ({
    page,
  }) => {
    await seedToday(page, { lunch: true, dinner: true });
    await page.goto("/?test=lunch");
    await page.waitForLoadState("networkidle");
    await expect(slotByAria(page, "아침 운세", "extra")).toBeVisible();

    await page.goto("/?test=dinner");
    await page.waitForLoadState("networkidle");
    await expect(slotByAria(page, "아침 운세", "extra")).toHaveCount(0);
    await expect(slotByAria(page, "아침 운세", "locked")).toBeVisible();
  });
});
