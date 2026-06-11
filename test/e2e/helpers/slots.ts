import type { Page } from "@playwright/test";

export type TestTime = "morning" | "lunch" | "dinner";

export async function gotoTestTime(
  page: Page,
  time: TestTime,
  options: { fresh?: boolean } = {},
): Promise<void> {
  if (options.fresh !== false) {
    const { clearAppStorage } = await import("./universe");
    await clearAppStorage(page);
    await page.goto(`/?test=${time}`);
  } else {
    await page.goto(`/?test=${time}`);
  }
  await page.waitForLoadState("networkidle");
}

export function slotByAria(page: Page, label: string, status: string) {
  return page.locator(`[aria-label="${label} — ${status}"]`);
}

export async function openSlotPopup(
  page: Page,
  label: string,
  status: string,
): Promise<void> {
  await slotByAria(page, label, status).click();
  await page.getByRole("dialog").waitFor();
}

export async function expectTodayProgress(
  page: Page,
  current: number,
  max = 5,
): Promise<void> {
  await page.getByText(`${current} / ${max}`).waitFor();
}
