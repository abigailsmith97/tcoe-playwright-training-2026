/**
 * Module 1 — Getting Started (Solution)
 * ──────────────────────────────────────
 * Reference solution — do not peek until you have tried the starter tasks!
 */

import { test, expect } from "@playwright/test";

test("Task 1 – navigate and assert page title", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await expect(page).toHaveTitle(/Playwright/);
});

test("Task 2 – assert the main heading is visible", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await expect(
    page.getByRole("heading", { name: "Playwright enables reliable" }),
  ).toBeVisible();
});
