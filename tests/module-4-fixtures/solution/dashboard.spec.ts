/**
 * Module 4 — Fixtures (Solution) — Spec File
 * ────────────────────────────────────────────
 * Compare this file with the starter/dashboard.spec.ts:
 *
 *   ✗  No beforeEach hook
 *   ✗  No repeated login code
 *   ✓  `authenticatedPage` fixture signals intent in the test signature
 *   ✓  Adding a new test file only requires importing from ./fixtures —
 *      the login logic lives in exactly ONE place
 */

import { test, expect } from "./fixtures";

const USERNAME = process.env.TEST_USERNAME ?? "test-user@hmcts.net";

test("dashboard – welcome message is visible", async ({
  authenticatedPage,
}) => {
  await expect(
    authenticatedPage.getByRole("heading", { name: /welcome/i }),
  ).toBeVisible();
});

test("dashboard – user menu shows the signed-in email", async ({
  authenticatedPage,
}) => {
  await authenticatedPage.getByRole("button", { name: /my account/i }).click();
  await expect(authenticatedPage.getByText(USERNAME)).toBeVisible();
});

test("dashboard – sign-out link is reachable", async ({
  authenticatedPage,
}) => {
  await authenticatedPage.getByRole("button", { name: /my account/i }).click();
  await expect(
    authenticatedPage.getByRole("link", { name: /sign out/i }),
  ).toBeVisible();
});
