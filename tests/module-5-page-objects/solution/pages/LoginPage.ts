/**
 * Module 5 — Page Object Model (Solution) — LoginPage
 */

import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email address");
    this.passwordInput = page.getByLabel("Password");
    this.signInButton = page.getByRole("button", { name: "Sign in" });
  }

  async navigate(): Promise<void> {
    const baseUrl = process.env.BASE_URL ?? "https://hmcts-demo.example.com";
    await this.page.goto(`${baseUrl}/login`);
  }

  async fillUsername(value: string): Promise<void> {
    await this.emailInput.fill(value);
  }

  async fillPassword(value: string): Promise<void> {
    await this.passwordInput.fill(value);
  }

  async submit(): Promise<void> {
    await this.signInButton.click();
  }

  /** Convenience method that performs the full login flow. */
  async login(username: string, password: string): Promise<void> {
    await this.navigate();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }
}
