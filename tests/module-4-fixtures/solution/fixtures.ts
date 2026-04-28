/**
 * Module 4 — Fixtures (Solution) — Custom Fixture Definition
 * ────────────────────────────────────────────────────────────
 * This file extends Playwright's built-in `test` object with two fixtures:
 *
 *   authenticatedPage
 *   ─────────────────
 *   A Page that is already signed in.  The login flow runs once per test
 *   worker (scope: 'worker') so it does not repeat between tests that run
 *   on the same worker — making the suite faster than beforeEach.
 *
 *   credentials
 *   ───────────
 *   A plain-object fixture that centralises credential configuration so
 *   individual tests never have to care where the values come from.
 *
 * Usage (in a spec file):
 *
 *   import { test, expect } from './fixtures';
 *
 *   test('my test', async ({ authenticatedPage }) => {
 *     // page is already logged in here
 *   });
 */

import { test as base, expect, type Page } from "@playwright/test";

// ─── Type definitions ─────────────────────────────────────────────────────────

type Credentials = {
  username: string;
  password: string;
  baseUrl: string;
};

type AuthenticatedFixtures = {
  credentials: Credentials;
  authenticatedPage: Page;
};

// ─── Helper ───────────────────────────────────────────────────────────────────

async function login(page: Page, credentials: Credentials): Promise<void> {
  const { baseUrl, username, password } = credentials;

  await page.goto(`${baseUrl}/login`);
  await page.getByLabel("Email address").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/dashboard/);
}

// ─── Extended test object ─────────────────────────────────────────────────────

export const test = base.extend<AuthenticatedFixtures>({
  /**
   * credentials fixture — resolves env vars in one place.
   * Scope defaults to 'test' (a fresh object per test, but since it's
   * just values, this is fine and keeps the fixture simple).
   */
  credentials: async ({}, use) => {
    await use({
      baseUrl: process.env.BASE_URL ?? "https://hmcts-demo.example.com",
      username: process.env.TEST_USERNAME ?? "test-user@hmcts.net",
      password: process.env.TEST_PASSWORD ?? "change-me",
    });
  },

  /**
   * authenticatedPage fixture — provides a Page that has completed login.
   *
   * Scope is 'test' (default) so every test gets a clean context.
   * Change to { scope: 'worker' } for a shared context if your tests
   * are read-only and do not mutate application state.
   */
  authenticatedPage: async ({ page, credentials }, use) => {
    await login(page, credentials);
    // Hand the logged-in page to the test
    await use(page);
    // Teardown (if needed) would go here, after `await use(page)`
  },
});

export { expect } from "@playwright/test";
