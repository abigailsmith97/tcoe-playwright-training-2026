/**
 * Module 1 — Getting Started (Starter)
 * ─────────────────────────────────────
 * TODO: Complete the tasks below to write your first Playwright test.
 *
 * Tasks
 * ──────
 * 1. Navigate to https://playwright.dev using page.goto().
 * 2. Assert that the page title contains "Playwright".
 * 3. Assert that the main heading is visible on the page.
 * 4. Run your test with:  npx playwright test --project=chromium
 */

import { test, expect } from "@playwright/test";

test("Task 1 – navigate and assert page title", async ({ page }) => {
  // TODO: navigate to https://playwright.dev
  // TODO: assert the title contains "Playwright"
});

test("Task 2 – assert the main heading is visible", async ({ page }) => {
  await page.goto("https://playwright.dev");
  // TODO: locate the main heading and assert it is visible
});
