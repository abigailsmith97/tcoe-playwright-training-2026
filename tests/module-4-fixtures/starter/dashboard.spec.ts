/**
 * Module 4 — Fixtures (Starter)
 * ──────────────────────────────
 * Notice that every test below repeats the same login sequence inside
 * a beforeEach hook.  This is the "copy-paste" anti-pattern:
 *
 *   • Any change to the login flow must be made in multiple files.
 *   • The hook is invisible to the test — the reader can't tell why
 *     the test starts on the dashboard.
 *   • There is no easy way to reuse the login logic across test files
 *     without importing a helper function *and* calling it in beforeEach.
 *
 * Your Task
 * ─────────
 * Eliminate the beforeEach hook and the duplicated login steps by
 * extracting the login flow into a CUSTOM PLAYWRIGHT FIXTURE.
 *
 * Steps
 * ──────
 * 1. Create  tests/module-4-fixtures/solution/fixtures.ts
 *    and export an extended `test` object that provides an
 *    `authenticatedPage` fixture — a Page that is already logged in.
 *
 * 2. Copy the three tests to
 *    tests/module-4-fixtures/solution/dashboard.spec.ts
 *    and replace:
 *      • the `import { test, expect } from '@playwright/test'`  with your
 *        custom import
 *      • `{ page }` destructuring with `{ authenticatedPage }`
 *      • all `page.` references with `authenticatedPage.`
 *      • Remove the beforeEach entirely.
 *
 * 3. Confirm the solution tests still pass:
 *      npx playwright test module-4-fixtures/solution --project=chromium
 *
 * Hint: See https://playwright.dev/docs/test-fixtures#creating-a-fixture
 */

import { test, expect } from "@playwright/test";

// ─── Shared credentials ──────────────────────────────────────────────────────
const BASE_URL = process.env.BASE_URL ?? "https://hmcts-demo.example.com";
const USERNAME = process.env.TEST_USERNAME ?? "test-user@hmcts.net";
const PASSWORD = process.env.TEST_PASSWORD ?? "change-me";

// ─── Repeated login in every test — the problem we are solving ───────────────
test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);
  await page.getByLabel("Email address").fill(USERNAME);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/dashboard/);
});

// ─── Tests ───────────────────────────────────────────────────────────────────

test("dashboard – welcome message is visible", async ({ page }) => {
  await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();
});

test("dashboard – user menu shows the signed-in email", async ({ page }) => {
  await page.getByRole("button", { name: /my account/i }).click();
  await expect(page.getByText(USERNAME)).toBeVisible();
});

test("dashboard – sign-out link is reachable", async ({ page }) => {
  await page.getByRole("button", { name: /my account/i }).click();
  await expect(page.getByRole("link", { name: /sign out/i })).toBeVisible();
});
