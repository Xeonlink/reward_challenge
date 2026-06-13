import { expect, test } from "@playwright/test";
import { gotoTestTime, openSlotPopup, slotByAria } from "../helpers/slots";
import { seedToday } from "../helpers/universe";

test.describe("README 슬롯 시간대", () => {
  test("아침 — active + SlotPopup +1", async ({ page }) => {
    await gotoTestTime(page, "morning");
    await expect(slotByAria(page, "아침 운세", "active")).toBeVisible();
    await openSlotPopup(page, "아침 운세", "active");
    await expect(page.getByText("별 조각 +1 획득 가능")).toBeVisible();
  });

  test("점심 — active", async ({ page }) => {
    await gotoTestTime(page, "lunch");
    await expect(slotByAria(page, "정오 운세", "active")).toBeVisible();
  });

  test("저녁 — active", async ({ page }) => {
    await gotoTestTime(page, "dinner");
    await expect(slotByAria(page, "저녁 운세", "active")).toBeVisible();
  });

  test("보너스 미완료 — locked 4칸 그리드", async ({ page }) => {
    await gotoTestTime(page, "dinner");
    await expect(slotByAria(page, "별 보너스", "locked")).toBeVisible();
    await expect(
      page.locator('[aria-label*="운세 —"], [aria-label*="보너스 —"]'),
    ).toHaveCount(4);
  });

  test("보너스 locked 탭 — 조건 안내 + 체크리스트", async ({ page }) => {
    await gotoTestTime(page, "dinner");
    await slotByAria(page, "별 보너스", "locked").click();
    await expect(
      page.getByText("아침·점심·저녁을 모두 완료해야 합니다"),
    ).toBeVisible();
    await expect(page.getByText("아침 운세 수령")).toBeVisible();
    await expect(page.getByText("점심 운세 수령")).toBeVisible();
    await expect(page.getByText("저녁 운세 수령")).toBeVisible();
    await page.getByRole("button", { name: "확인" }).click();
  });

  test("보너스 3개 완료 — active +2", async ({ page }) => {
    await seedToday(page, {
      morning: true,
      lunch: true,
      dinner: true,
      bonus: false,
    });
    await page.goto("/?test=dinner");
    await page.waitForLoadState("networkidle");
    await expect(slotByAria(page, "별 보너스", "active")).toBeVisible();
    await openSlotPopup(page, "별 보너스", "active");
    await expect(page.getByText("별 조각 +2 획득 가능")).toBeVisible();
  });

  test("추가기회 — Popup 안내 문구", async ({ page }) => {
    await seedToday(page, { lunch: true });
    await page.goto("/?test=lunch");
    await page.waitForLoadState("networkidle");
    await openSlotPopup(page, "아침 운세", "extra");
    await expect(
      page.getByText("추가 기회는 하루 1회만 사용할 수 있어요."),
    ).toBeVisible();
  });
});
