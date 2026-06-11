import { expect, type Page } from "@playwright/test";

export const UNIVERSE_STORAGE_KEY = "byulmoa_universe";

export interface DayRecord {
  morning: boolean;
  lunch: boolean;
  dinner: boolean;
  bonus: boolean;
  extraUsed: boolean;
}

export interface UniverseSeed {
  totalStars?: number;
  cycleStartDate?: string;
  dailyRecord?: Record<string, DayRecord>;
}

export function todayKey(): string {
  return new Date().toDateString();
}

export function defaultUniverse(overrides: UniverseSeed = {}): {
  totalStars: number;
  cycleStartDate: string;
  dailyRecord: Record<string, DayRecord>;
} {
  return {
    totalStars: overrides.totalStars ?? 0,
    cycleStartDate: overrides.cycleStartDate ?? new Date().toDateString(),
    dailyRecord: overrides.dailyRecord ?? {},
  };
}

export async function seedUniverse(
  page: Page,
  overrides: UniverseSeed = {},
): Promise<void> {
  const record = defaultUniverse(overrides);
  await page.addInitScript(
    ({ key, data }) => {
      localStorage.setItem(key, JSON.stringify(data));
    },
    { key: UNIVERSE_STORAGE_KEY, data: record },
  );
}

export async function seedToday(
  page: Page,
  dayRecord: Partial<DayRecord>,
  universeOverrides: Omit<UniverseSeed, "dailyRecord"> = {},
): Promise<void> {
  const today = todayKey();
  const base: DayRecord = {
    morning: false,
    lunch: false,
    dinner: false,
    bonus: false,
    extraUsed: false,
    ...dayRecord,
  };
  await seedUniverse(page, {
    ...universeOverrides,
    dailyRecord: { [today]: base },
  });
}

/** 단일 navigation용 — 이후 reload에도 storage 유지 */
export async function clearAppStorage(page: Page): Promise<void> {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

export async function gotoFresh(page: Page, path = "/"): Promise<void> {
  await clearAppStorage(page);
  await page.goto(path);
  await page.waitForLoadState("networkidle");
}

export async function expectTotalStars(
  page: Page,
  count: number,
): Promise<void> {
  await expect(page.locator(`[data-total-stars="${count}"]`)).toBeVisible();
}

export async function expectOrbStage(page: Page, stage: number): Promise<void> {
  await expect(page.locator(`[data-orb-stage="${stage}"]`)).toBeVisible();
}
