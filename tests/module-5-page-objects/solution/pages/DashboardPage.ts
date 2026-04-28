/**
 * Module 5 — Page Object Model (Solution) — DashboardPage
 */

import { type Page, type Locator } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly welcomeHeading: Locator;
  readonly accountMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeHeading = page.getByRole("heading", { name: /welcome/i });
    this.accountMenuButton = page.getByRole("button", { name: /my account/i });
  }

  async isWelcomeHeadingVisible(): Promise<boolean> {
    return this.welcomeHeading.isVisible();
  }

  async openAccountMenu(): Promise<void> {
    await this.accountMenuButton.click();
  }

  getSignOutLink(): Locator {
    return this.page.getByRole("link", { name: /sign out/i });
  }
}
