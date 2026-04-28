/**
 * Module 2 — Locators (Solution)
 * ────────────────────────────────
 * Reference solution — do not peek until you have tried the starter tasks!
 *
 * Key changes from the starter
 * ────────────────────────────
 * • XPath heading  →  getByRole('heading')
 * • CSS class link →  getByRole('link', { name: ... })
 * • XPath button   →  getByRole('link', { name: 'Get started' })
 * • CSS search btn →  getByRole('button', { name: /search/i })
 *
 * These locators are resilient to DOM restructuring because they
 * describe what the user SEES and INTERACTS WITH, not how the
 * markup happens to be structured today.
 */

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/docs/intro");
});

test("assert the page header is visible", async ({ page }) => {
  // ✅ Role-based — works regardless of element position in the DOM
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});

test("assert the 'Installation' link is visible in the sidebar", async ({
  page,
}) => {
  // ✅ Role + accessible name — robust against class-name changes
  await expect(
    page.getByRole("link", { name: "Installation" }).first(),
  ).toBeVisible();
});

test("assert the 'Get started' button navigates correctly", async ({
  page,
}) => {
  await page.goto("https://playwright.dev");
  // ✅ Matches the visible label — no XPath, no positional index
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(page).toHaveURL(/intro/);
});

test("assert the search input is present", async ({ page }) => {
  // ✅ Matches the accessible button name exposed to screen readers
  await expect(page.getByRole("button", { name: /search/i })).toBeVisible();
});
