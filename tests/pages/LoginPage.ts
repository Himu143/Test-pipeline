import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordVisibilityToggle: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signInButton: Locator;
  readonly signUpLink: Locator;
  readonly signInHeading: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.passwordVisibilityToggle = page.getByRole('button', { name: 'Toggle password visibility' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.signUpLink = page.getByRole('link', { name: 'Sign Up' });
    this.signInHeading = page.locator('[data-slot="card-title"]', { hasText: 'Sign In' });
    this.errorMessage = page.getByText('Invalid username or password', { exact: true });
  }

  async goto() {
    await this.page.goto('/auth/sign-in');
    await this.emailInput.waitFor({ state: 'visible', timeout: 15_000 });
  }

  async signIn(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}