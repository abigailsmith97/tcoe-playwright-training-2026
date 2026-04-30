# TCOE Playwright Training 2026

> A five-module, hands-on Playwright course following HMCTS engineering standards.
> Each module is isolated into a branch pair:
> **`mX-start`** (problem to solve) and **`mX-end`** (reference solution).
> This keeps each task focused and avoids overwhelming learners.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Repository Structure](#repository-structure)
3. [Branch Strategy](#branch-strategy)
4. [Learner Workflow (How to Use Branches)](#learner-workflow-how-to-use-branches)
5. [Configuration Overview](#configuration-overview)
6. [Module Guide](#module-guide)
   - [Module 1 — Getting Started](#module-1--getting-started)
   - [Module 2 — Locators](#module-2--locators)
   - [Module 3 — Assertions](#module-3--assertions)
   - [Module 4 — Fixtures](#module-4--fixtures)
   - [Module 5 — Page Object Model](#module-5--page-object-model)
7. [Running Tests](#running-tests)
8. [Authentication Setup](#authentication-setup)
9. [Environment Variables](#environment-variables)

---

## Prerequisites

| Tool       | Minimum version |
| ---------- | --------------- |
| Node.js    | 20 LTS          |
| npm        | 10              |
| Playwright | 1.44            |

```bash
# Install dependencies and Playwright browsers
npm install
npx playwright install --with-deps
```

---

## Repository Structure

```
tcoe-playwright-training-2026/
├── playwright.config.ts              # HMCTS-style shared configuration
├── package.json
├── .gitignore
└── tests/
    ├── auth.setup.ts                 # Auth project — runs once before all tests
    │
    ├── module-1-getting-started/
    │   ├── starter/
    │   │   └── getting-started.spec.ts
    │   └── solution/
    │       └── getting-started.spec.ts
    │
    ├── module-2-locators/
    │   ├── starter/
    │   │   └── locators.spec.ts
    │   └── solution/
    │       └── locators.spec.ts
    │
    ├── module-3-assertions/
    │   ├── starter/
    │   │   └── assertions.spec.ts
    │   └── solution/
    │       └── assertions.spec.ts
    │
    ├── module-4-fixtures/
    │   ├── starter/
    │   │   └── dashboard.spec.ts
    │   └── solution/
    │       ├── fixtures.ts           # Custom fixture definition
    │       └── dashboard.spec.ts
    │
    └── module-5-page-objects/
        ├── starter/
        │   └── dashboard.spec.ts
        └── solution/
            ├── pages/
            │   ├── LoginPage.ts
            │   └── DashboardPage.ts
            └── dashboard.spec.ts
```

---

## Branch Strategy

Each module is delivered as a branch pair and merged into `main` in sequence.
Learners complete the starter, merge it into `main`, then review the solution
branch against the updated `main` and merge that too.

| Branch                | Purpose                                          |
| --------------------- | ------------------------------------------------ |
| `main`                | Learner integration branch for completed modules |
| `m1-start` / `m1-end` | Module 1 starter and solution                    |
| `m2-start` / `m2-end` | Module 2 starter and solution                    |
| `m3-start` / `m3-end` | Module 3 starter and solution                    |
| `m4-start` / `m4-end` | Module 4 starter and solution                    |
| `m5-start` / `m5-end` | Module 5 starter and solution                    |

### Why this structure works for learners

- Every branch is focused on a single module, so learners only see files relevant to that task.
- Branches are isolated, which avoids cross-module noise and merge conflicts during training.
- Merging each module into `main` creates a clear, cumulative learning journey.

## Learner Workflow (How to Use Branches)

Use this flow for each module (`X` = 1 to 5):

```bash
# 1) Get the latest branches
git fetch --all

# 2) Start module X from starter
git switch mX-start

# 3) Install dependencies once (first module only)
npm install
npx playwright install --with-deps

# 4) Complete the task and validate
npx playwright test

# 5) Merge your starter completion into main
git switch main
git merge mX-start

# 6) Pull solution branch and align it with latest main
git switch mX-end
git merge main

# 7) Compare your answer to the solution
git diff main...mX-end

# 8) Merge the solution branch into main
git switch main
git merge mX-end
```

Repeat this for `m1`, `m2`, `m3`, `m4`, and `m5` in order.

> If your default branch is named `master` instead of `main`, replace `main` with `master` in the commands above.

Recommended sequence:

1. `m1-start` → merge to `main` → `m1-end` → merge to `main`
2. `m2-start` → merge to `main` → `m2-end` → merge to `main`
3. `m3-start` → merge to `main` → `m3-end` → merge to `main`
4. `m4-start` → merge to `main` → `m4-end` → merge to `main`
5. `m5-start` → merge to `main` → `m5-end` → merge to `main`

### Quick start (copy/paste by module)

Use one block at a time in your terminal.

```bash
# Module 1
git switch m1-start
npx playwright test
git switch main
git merge m1-start
git switch m1-end
git merge main
git diff main...m1-end
git switch main
git merge m1-end
```

```bash
# Module 2
git switch m2-start
npx playwright test
git switch main
git merge m2-start
git switch m2-end
git merge main
git diff main...m2-end
git switch main
git merge m2-end
```

```bash
# Module 3
git switch m3-start
npx playwright test
git switch main
git merge m3-start
git switch m3-end
git merge main
git diff main...m3-end
git switch main
git merge m3-end
```

```bash
# Module 4
git switch m4-start
npx playwright test
git switch main
git merge m4-start
git switch m4-end
git merge main
git diff main...m4-end
git switch main
git merge m4-end
```

```bash
# Module 5
git switch m5-start
npx playwright test
git switch main
git merge m5-start
git switch m5-end
git merge main
git diff main...m5-end
git switch main
git merge m5-end
```

---

## Configuration Overview

`playwright.config.ts` follows HMCTS standards:

| Setting              | Value                    | Rationale                                                                                           |
| -------------------- | ------------------------ | --------------------------------------------------------------------------------------------------- |
| `reporter`           | `html` + `list`          | HTML report opens automatically on local failure; `list` gives CI-friendly stdout output            |
| `trace`              | `on-first-retry`         | Traces are captured only when a test is retried, keeping storage low while ensuring reproducibility |
| `screenshot`         | `only-on-failure`        | Screenshot evidence without the overhead of capturing every test                                    |
| `video`              | `on-first-retry`         | Video only when retrying, consistent with trace policy                                              |
| `retries`            | `2` on CI / `0` locally  | Reduces flakiness noise in CI without masking local failures                                        |
| `workers`            | `1` on CI / auto locally | Avoids resource contention in shared CI runners                                                     |
| Auth `setup` project | `auth.setup.ts`          | Runs once per suite; saves `storageState` to `.auth/user.json`                                      |
| `storageState`       | `.auth/user.json`        | All browser projects reuse the saved session — no repeated UI login                                 |

---

## Module Guide

### Module 1 — Getting Started

**Branches:** `m1-start` → `m1-end`  
**File:** `tests/module-1-getting-started/starter/getting-started.spec.ts`

**Learning objectives**

- Write your first Playwright test using `page.goto()`.
- Use `expect(page).toHaveTitle()` and `getByRole()`.
- Run tests with the Playwright CLI.

**Tasks**

1. Navigate to `https://playwright.dev` and assert the page title contains `"Playwright"`.
2. Assert the main heading is visible on the page.

---

### Module 2 — Locators

**Branches:** `m2-start` → `m2-end`  
**File:** `tests/module-2-locators/starter/locators.spec.ts`

**Learning objectives**

- Understand why XPath and CSS-class locators are brittle.
- Use `getByRole()`, `getByText()`, `getByLabel()`, and `getByPlaceholder()`.
- Write locators that reflect user-facing behaviour, not DOM structure.

**Task**

The starter file contains four tests that pass today but will break on any
markup refactor. Every locator uses either an XPath expression or a CSS class
selector.

Refactor each locator to use a semantic Playwright API. The rules are printed
at the top of the starter file.

| Brittle (starter)                                               | Robust (solution)                                          |
| --------------------------------------------------------------- | ---------------------------------------------------------- |
| `page.locator('xpath=//h1')`                                    | `page.getByRole('heading', { name: 'Installation' })`      |
| `page.locator('.menu__link[href*="intro"]')`                    | `page.getByRole('link', { name: 'Installation' }).first()` |
| `page.locator('xpath=(//a[contains(@class,"getStarted")])[1]')` | `page.getByRole('link', { name: 'Get started' })`          |
| `page.locator('button[class*="searchButton"]')`                 | `page.getByRole('button', { name: /search/i })`            |

---

### Module 3 — Assertions

**Branches:** `m3-start` → `m3-end`  
**File:** `tests/module-3-assertions/starter/assertions.spec.ts`

**Learning objectives**

- Understand the difference between hard assertions and web-first assertions.
- Know when to use `toHaveTitle`, `toHaveURL`, `toBeVisible`, `toHaveText`, `toBeEnabled`.
- Appreciate why auto-retrying assertions reduce flakiness.

**Task**

Replace every Node `assert` call with the equivalent Playwright `expect` assertion.

| Hard assertion (starter)                  | Web-first assertion (solution)                 |
| ----------------------------------------- | ---------------------------------------------- |
| `assert.ok(title.includes('Playwright'))` | `await expect(page).toHaveTitle(/Playwright/)` |
| `assert.ok(url.includes('intro'))`        | `await expect(page).toHaveURL(/intro/)`        |
| `assert.strictEqual(visible, true)`       | `await expect(heading).toBeVisible()`          |

---

### Module 4 — Fixtures

**Branches:** `m4-start` → `m4-end`  
**File:** `tests/module-4-fixtures/starter/dashboard.spec.ts`

**Learning objectives**

- Identify the "copy-paste `beforeEach`" anti-pattern.
- Create a custom fixture using `test.extend()`.
- Understand fixture scopes (`test` vs `worker`).
- Compose fixtures (the `authenticatedPage` fixture depends on `credentials`).

**Task**

The starter file has a `beforeEach` hook that duplicates the login flow in every
test. Extract this into a custom Playwright fixture called `authenticatedPage`.

**Steps**

1. Create `tests/module-4-fixtures/solution/fixtures.ts` and export an
   extended `test` object that provides `authenticatedPage` — a `Page`
   that is already signed in.

2. Copy the three tests to `tests/module-4-fixtures/solution/dashboard.spec.ts`.

3. In the solution spec:
   - Import `test` and `expect` from `./fixtures` instead of `@playwright/test`.
   - Replace `{ page }` with `{ authenticatedPage }` in each test signature.
   - Replace all `page.` references with `authenticatedPage.`.
   - **Delete the `beforeEach` hook entirely.**

**Before (starter)**

```ts
test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);
  await page.getByLabel("Email address").fill(USERNAME);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/dashboard/);
});

test("welcome message is visible", async ({ page }) => {
  await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();
});
```

**After (solution)**

```ts
// No beforeEach. No repeated login. The fixture handles it.
test("welcome message is visible", async ({ authenticatedPage }) => {
  await expect(
    authenticatedPage.getByRole("heading", { name: /welcome/i }),
  ).toBeVisible();
});
```

---

### Module 5 — Page Object Model

**Branches:** `m5-start` → `m5-end`  
**File:** `tests/module-5-page-objects/starter/dashboard.spec.ts`

**Learning objectives**

- Understand the Single Responsibility Principle applied to tests.
- Encapsulate selectors and user actions in typed Page Object classes.
- Write tests that read as plain English and are resilient to selector changes.

**Task**

1. Create `tests/module-5-page-objects/solution/pages/LoginPage.ts` with:
   - `navigate()`, `fillUsername()`, `fillPassword()`, `submit()`, `login()`.

2. Create `tests/module-5-page-objects/solution/pages/DashboardPage.ts` with:
   - `welcomeHeading`, `openAccountMenu()`, `getSignOutLink()`.

3. Rewrite the spec so every test uses the page objects instead of inline
   selectors.

---

## Running Tests

```bash
# Run tests in the current module branch
npx playwright test

# Run tests in headed mode (useful while learning)
npx playwright test --headed

# Run a single browser
npx playwright test --project=chromium

# Open the interactive UI mode
npx playwright test --ui

# View the last HTML report
npx playwright show-report
```

---

## Authentication Setup

`tests/auth.setup.ts` is the **`setup`** project defined in `playwright.config.ts`.
It runs **once** before any browser project, logs in to the application, and saves
the browser storage state (cookies + `localStorage`) to `.auth/user.json`.

All browser projects (`chromium`, `firefox`, `webkit`) declare
`dependencies: ['setup']` and load the saved state via `storageState`, meaning
every test starts already authenticated — without repeating the login UI.

The `.auth/` directory is **git-ignored**. It is generated at runtime.

---

## Environment Variables

| Variable        | Default                          | Description                                                 |
| --------------- | -------------------------------- | ----------------------------------------------------------- |
| `BASE_URL`      | `https://hmcts-demo.example.com` | Base URL for all `page.goto()` calls                        |
| `TEST_USERNAME` | `test-user@hmcts.net`            | Login username used by `auth.setup.ts` and module 4/5 tests |
| `TEST_PASSWORD` | `change-me`                      | Login password — **store as a CI secret, never commit**     |

Set variables inline for a one-off run:

```bash
BASE_URL=https://staging.example.com \
TEST_USERNAME=real-user@hmcts.net \
TEST_PASSWORD=real-password \
npx playwright test
```

On GitHub Actions, add `TEST_USERNAME` and `TEST_PASSWORD` as
[repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
and expose them in your workflow:

```yaml
env:
  BASE_URL: ${{ vars.BASE_URL }}
  TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
  TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
```
