import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test/e2e/specs",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm run dev",
    url: "http://localhost:4000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
