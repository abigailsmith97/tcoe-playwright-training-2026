import { defineConfig, devices } from "@playwright/test";
import path from "path";

/**
 * HMCTS Playwright Configuration
 * See https://playwright.dev/docs/test-configuration
 */

// Path where the auth setup project saves browser storage state (cookies, localStorage).
// This file is git-ignored and generated at runtime by tests/auth.setup.ts.
export const STORAGE_STATE = path.join(__dirname, ".auth", "user.json");

export default defineConfig({
  testDir: "./tests",

  // Run test files in parallel across workers
  fullyParallel: true,

  // Fail CI builds immediately if test.only is accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI to reduce flakiness noise
  retries: process.env.CI ? 2 : 0,

  // Limit parallelism on CI to avoid resource contention
  workers: process.env.CI ? 1 : undefined,

  // HTML reporter: open automatically after a local run, never on CI
  reporter: [
    ["html", { open: process.env.CI ? "never" : "on-failure" }],
    ["list"],
  ],

  use: {
    // Base URL for all page.goto() calls — override via BASE_URL env var
    baseURL: process.env.BASE_URL ?? "https://hmcts-demo.example.com",

    // Capture a Playwright trace on the first retry so failures are reproducible
    trace: "on-first-retry",

    // Capture a screenshot only when a test fails
    screenshot: "only-on-failure",

    // Record video only when retrying, to keep storage costs low
    video: "on-first-retry",
  },

  projects: [
    // -----------------------------------------------------------------------
    // 1. Auth setup — runs once before any tests in the 'authenticated' group.
    //    Navigates to the login page, signs in, and saves browser storage state
    //    so subsequent test projects reuse the authenticated session.
    // -----------------------------------------------------------------------
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },

    // -----------------------------------------------------------------------
    // 2. Chromium — authenticated tests that depend on the setup project
    // -----------------------------------------------------------------------
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Reuse the saved auth state so every test starts already logged in
        storageState: STORAGE_STATE,
      },
      dependencies: ["setup"],
    },

    // -----------------------------------------------------------------------
    // 3. Firefox — authenticated tests
    // -----------------------------------------------------------------------
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: STORAGE_STATE,
      },
      dependencies: ["setup"],
    },

    // -----------------------------------------------------------------------
    // 4. WebKit (Safari) — authenticated tests
    // -----------------------------------------------------------------------
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: STORAGE_STATE,
      },
      dependencies: ["setup"],
    },
  ],
});
