/**
 * Auth Setup Project
 * ------------------
 * This file is matched by the 'setup' project in playwright.config.ts.
 * It runs ONCE before any browser project (chromium / firefox / webkit).
 *
 * It logs in to the application and saves the resulting browser storage state
 * (cookies + localStorage) to .auth/user.json.  All test projects that declare
 * `dependencies: ['setup']` then load that file via `storageState`, meaning
 * every test starts already authenticated — without repeating the login UI.
 *
 * Usage
 * -----
 * Supply credentials through environment variables so they are never
 * committed to source control:
 *
 *   TEST_USERNAME=admin@example.com TEST_PASSWORD=secret npx playwright test
 *
 * On CI, store these as GitHub Actions secrets and expose them as env vars
 * in your workflow file.
 */

import { test as setup, expect } from "@playwright/test";
import path from "path";

// Must match STORAGE_STATE exported from playwright.config.ts
const authFile = path.join(__dirname, "..", ".auth", "user.json");

setup("authenticate", async ({ page }) => {
  const username = process.env.TEST_USERNAME ?? "test-user@hmcts.net";
  const password = process.env.TEST_PASSWORD ?? "change-me";

  // ------------------------------------------------------------------
  // 1. Navigate to the login page
  // ------------------------------------------------------------------
  await page.goto("/login");

  // ------------------------------------------------------------------
  // 2. Fill in credentials and submit
  //    Update selectors to match the real application's login form.
  // ------------------------------------------------------------------
  await page.getByLabel("Email address").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();

  // ------------------------------------------------------------------
  // 3. Verify login succeeded before saving state
  // ------------------------------------------------------------------
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  // ------------------------------------------------------------------
  // 4. Persist the authenticated browser context to disk.
  //    Playwright will reuse these cookies / localStorage in every
  //    test that specifies storageState: STORAGE_STATE.
  // ------------------------------------------------------------------
  await page.context().storageState({ path: authFile });
});
