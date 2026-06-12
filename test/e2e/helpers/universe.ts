import { expect, type Page } from "@playwright/test";
import { format } from "date-fns";

export const UNIVERSE_STORAGE_KEY = "byulmoa_universe";

const DATE_FORMAT = "yyyy-MM-dd";

export interface DayRecord {
  morning: boolean;
  lunch: boolean;
  dinner: boolean;
  bonus: boolean;
}

export interface UniverseState {
  totalStars: number;
  cycleStartDate: string;
  lastRecordDate: string;
  record: DayRecord;
}

export interface UniverseSeed {
  totalStars?: number;
  cycleStartDate?: string;
  lastRecordDate?: string;
  record?: Partial<DayRecord>;
}

const emptyRecord = (): DayRecord => ({
  morning: false,
  lunch: false,
  dinner: false,
  bonus: false,
});

/** Zustand persist 형식 `{ state, version }` */
export function buildPersistPayload(seed: UniverseSeed = {}): {
  state: UniverseState;
  version: number;
} {
  const today = format(new Date(), DATE_FORMAT);
  return {
    state: {
      totalStars: seed.totalStars ?? 0,
      cycleStartDate: seed.cycleStartDate ?? today,
      lastRecordDate: seed.lastRecordDate ?? today,
      record: { ...emptyRecord(), ...seed.record },
    },
    version: 1,
  };
}

export function todayKey(): string {
  return format(new Date(), DATE_FORMAT);
}

export async function seedUniverse(
  page: Page,
  overrides: UniverseSeed = {},
): Promise<void> {
  const payload = buildPersistPayload(overrides);
  await page.addInitScript(
    ({ key, data }) => {
      localStorage.setItem(key, JSON.stringify(data));
    },
    { key: UNIVERSE_STORAGE_KEY, data: payload },
  );
}

export async function seedToday(
  page: Page,
  dayRecord: Partial<DayRecord>,
  universeOverrides: Omit<UniverseSeed, "record"> = {},
): Promise<void> {
  await seedUniverse(page, {
    ...universeOverrides,
    record: dayRecord,
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
