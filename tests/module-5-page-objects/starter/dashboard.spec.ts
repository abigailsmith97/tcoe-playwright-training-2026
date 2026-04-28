/**
 * Module 5 — Page Object Model (Starter)
 * ────────────────────────────────────────
 * TODO: Refactor the inline selectors and actions below into a Page Object.
 *
 * Tasks
 * ──────
 * 1. Create  tests/module-5-page-objects/starter/pages/LoginPage.ts
 *    with a class that encapsulates:
 *      • navigate()
 *      • fillUsername(value: string)
 *      • fillPassword(value: string)
 *      • submit()
 *      • login(username, password)  — convenience method
 *
 * 2. Create  tests/module-5-page-objects/starter/pages/DashboardPage.ts
 *    with a class that encapsulates:
 *      • isWelcomeHeadingVisible()
 *      • openAccountMenu()
 *      • getSignOutLink()
 *
 * 3. Replace the inline selectors in each test with calls to your page objects.
 *
 *   npx playwright test module-5-page-objects/starter --project=chromium
 */

import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "https://hmcts-demo.example.com";
const USERNAME = process.env.TEST_USERNAME ?? "test-user@hmcts.net";
const PASSWORD = process.env.TEST_PASSWORD ?? "change-me";

test.beforeEach(async ({ page }) => {
  // Inline login — replace with LoginPage.login() in your solution
  await page.goto(`${BASE_URL}/login`);
  await page.getByLabel("Email address").fill(USERNAME);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/dashboard/);
});

test("dashboard – welcome heading is visible", async ({ page }) => {
  // TODO: replace with DashboardPage.isWelcomeHeadingVisible()
  await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();
});

test("dashboard – sign-out link is reachable", async ({ page }) => {
  // TODO: replace with DashboardPage methods
  await page.getByRole("button", { name: /my account/i }).click();
  await expect(page.getByRole("link", { name: /sign out/i })).toBeVisible();
});
