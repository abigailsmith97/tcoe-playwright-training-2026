/**
 * Module 2 — Locators (Starter)
 * ──────────────────────────────
 * The tests below work today, but they rely on brittle XPath expressions
 * and CSS class selectors that are tightly coupled to the DOM structure.
 * Any markup refactor will silently break them.
 *
 * Your Task
 * ─────────
 * Refactor EVERY locator in this file so that it uses Playwright's
 * semantic, user-facing locator APIs instead:
 *
 *   • page.getByRole()   — preferred for interactive elements
 *   • page.getByText()   — for static text / labels
 *   • page.getByLabel()  — for form inputs associated with a <label>
 *   • page.getByPlaceholder() — when a label is absent
 *
 * Rules
 * ─────
 * ✗  Do not use page.locator('xpath=...')
 * ✗  Do not use page.locator('.some-css-class')
 * ✗  Do not use page.locator('#some-id')   (unless it is a stable data-testid)
 * ✓  All assertions must still pass after your refactor.
 *
 * Hint: Run the tests first in their current state, then refactor one
 * locator at a time and re-run to confirm nothing breaks.
 *
 *   npx playwright test module-2-locators/starter --project=chromium
 */

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/docs/intro");
});

test("assert the page header is visible", async ({ page }) => {
  // ❌ Brittle XPath — refactor this
  const heading = page.locator("xpath=//h1");
  await expect(heading).toBeVisible();
});

test("assert the 'Installation' link is visible in the sidebar", async ({
  page,
}) => {
  // ❌ Brittle CSS class — refactor this
  const link = page.locator(".menu__link[href*='intro']");
  await expect(link).toBeVisible();
});

test("assert the 'Get started' button navigates correctly", async ({
  page,
}) => {
  await page.goto("https://playwright.dev");
  // ❌ Brittle XPath with positional index — refactor this
  const button = page.locator("xpath=(//a[contains(@class,'getStarted')])[1]");
  await button.click();
  await expect(page).toHaveURL(/intro/);
});

test("assert the search input is present", async ({ page }) => {
  // ❌ CSS attribute selector — refactor this
  const search = page.locator("button[class*='searchButton']");
  await expect(search).toBeVisible();
});
