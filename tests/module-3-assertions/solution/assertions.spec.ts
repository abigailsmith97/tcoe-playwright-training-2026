/**
 * Module 3 — Assertions (Solution)
 * ──────────────────────────────────
 * Reference solution — do not peek until you have tried the starter tasks!
 *
 * Key improvement: Playwright's web-first assertions automatically RETRY
 * until the condition is met (or the timeout expires).  Hard assertions
 * evaluate the DOM only once — making them prone to race conditions.
 */

import { test, expect } from "@playwright/test";

test("assert page title — Task 1", async ({ page }) => {
  await page.goto("https://playwright.dev");
  // ✅ Auto-retrying — waits for the title to match
  await expect(page).toHaveTitle(/Playwright/);
});

test("assert URL after navigation — Task 2", async ({ page }) => {
  await page.goto("https://playwright.dev/docs/intro");
  // ✅ Auto-retrying — waits for the URL to settle
  await expect(page).toHaveURL(/intro/);
});

test("assert heading visibility — Task 3", async ({ page }) => {
  await page.goto("https://playwright.dev/docs/intro");
  // ✅ Auto-retrying — waits for the element to appear in the DOM
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});
