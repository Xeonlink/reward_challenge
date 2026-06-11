import { expect, test } from "@playwright/test";
import { slotByAria } from "../helpers/slots";
import { seedToday } from "../helpers/universe";

const cases = [
  {
    name: "점심 완료",
    record: { lunch: true },
    expectations: [
      { label: "아침 운세", status: "extra" },
      { label: "정오 운세", status: "completed" },
    ],
  },
  {
    name: "점심+저녁 완료",
    record: { lunch: true, dinner: true },
    expectations: [
      { label: "아침 운세", status: "extra" },
      { label: "정오 운세", status: "completed" },
      { label: "저녁 운세", status: "completed" },
    ],
  },
  {
    name: "저녁만 완료",
    record: { dinner: true },
    expectations: [
      { label: "아침 운세", status: "locked" },
      { label: "정오 운세", status: "extra" },
      { label: "저녁 운세", status: "completed" },
    ],
  },
  {
    name: "아침+저녁 완료",
    record: { morning: true, dinner: true },
    expectations: [
      { label: "정오 운세", status: "extra" },
      { label: "아침 운세", status: "completed" },
      { label: "저녁 운세", status: "completed" },
    ],
  },
] as const;

test.describe("README 추가기회 케이스", () => {
  for (const { name, record, expectations } of cases) {
    test(name, async ({ page }) => {
      await seedToday(page, record);
      await page.goto("/?test=dinner");
      await page.waitForLoadState("networkidle");

      for (const { label, status } of expectations) {
        await expect(slotByAria(page, label, status)).toBeVisible();
      }
    });
  }

  test("추가기회 1회 제한 — extra 슬롯 없음", async ({ page }) => {
    await seedToday(page, {
      lunch: true,
      dinner: true,
      extraUsed: true,
    });
    await page.goto("/?test=dinner");
    await page.waitForLoadState("networkidle");

    await expect(slotByAria(page, "아침 운세", "extra")).toHaveCount(0);
    await expect(slotByAria(page, "아침 운세", "locked")).toBeVisible();
  });
});
