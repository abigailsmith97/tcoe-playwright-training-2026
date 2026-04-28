/**
 * Module 3 — Assertions (Starter)
 * ─────────────────────────────────
 * TODO: Replace every hard assertion (Node's assert module / raw booleans)
 * with Playwright's auto-retrying web-first assertions from `expect`.
 *
 * Tasks
 * ──────
 * 1. Use toHaveTitle()     to assert the page title.
 * 2. Use toHaveURL()       to assert the current URL.
 * 3. Use toBeVisible()     to assert an element is shown.
 * 4. Use toHaveText()      to assert an element's text content.
 * 5. Use toBeEnabled()     to assert a button is interactive.
 *
 *   npx playwright test module-3-assertions/starter --project=chromium
 */

import { test, expect } from "@playwright/test";
import assert from "assert";

test("assert page title — Task 1", async ({ page }) => {
  await page.goto("https://playwright.dev");
  const title = await page.title();
  // ❌ Hard assertion — replace with expect(page).toHaveTitle(...)
  assert.ok(
    title.includes("Playwright"),
    `Expected title to include 'Playwright', got: ${title}`,
  );
});

test("assert URL after navigation — Task 2", async ({ page }) => {
  await page.goto("https://playwright.dev/docs/intro");
  const url = page.url();
  // ❌ Hard assertion — replace with expect(page).toHaveURL(...)
  assert.ok(
    url.includes("intro"),
    `Expected URL to include 'intro', got: ${url}`,
  );
});

test("assert heading visibility — Task 3", async ({ page }) => {
  await page.goto("https://playwright.dev/docs/intro");
  const heading = page.getByRole("heading", { name: "Installation" });
  const visible = await heading.isVisible();
  // ❌ Hard assertion — replace with expect(heading).toBeVisible()
  assert.strictEqual(visible, true);
});
