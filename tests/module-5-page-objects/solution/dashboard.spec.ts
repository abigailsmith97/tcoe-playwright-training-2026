/**
 * Module 5 — Page Object Model (Solution) — Spec File
 * ──────────────────────────────────────────────────────
 * Compare with starter/dashboard.spec.ts:
 *
 *   ✓  Selectors live in the Page Object classes, not in the test
 *   ✓  Tests read as plain English — they describe BEHAVIOUR, not DOM ops
 *   ✓  If a selector changes, you update ONE file (the page object)
 */

import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

const USERNAME = process.env.TEST_USERNAME ?? "test-user@hmcts.net";
const PASSWORD = process.env.TEST_PASSWORD ?? "change-me";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(USERNAME, PASSWORD);
  await expect(page).toHaveURL(/dashboard/);
});

test("dashboard – welcome heading is visible", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await expect(dashboard.welcomeHeading).toBeVisible();
});

test("dashboard – sign-out link is reachable", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.openAccountMenu();
  await expect(dashboard.getSignOutLink()).toBeVisible();
});
