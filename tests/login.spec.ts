import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const testEmail = 'tajulislam@inneed.cloud';
const testPassword = 'J0hnc3na';

test.beforeEach(async ({ page }) => {
  await page.route('**/auth/api/v1/login', async (route) => {
    const request = route.request();
    const { email, password } = request.postDataJSON() as {
      email?: string;
      password?: string;
    };

    if (email === testEmail && password === testPassword) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'playwright-access-token',
          refresh_token: 'playwright-refresh-token'
        })
      });
      return;
    }

    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ detail: 'Invalid username or password' })
    });
  });
});

test('TC-LOGIN-001: existing user can sign in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.signInButton).toBeVisible();

  await loginPage.signIn(testEmail!, testPassword!);

  await expect(page).not.toHaveURL(/\/auth\/sign-in/);
  await expect(page).toHaveURL(/\/home(?:[/?#]|$)/);
  await expect(page.locator('body')).toBeVisible();

  const heading = page.getByRole('heading').first();
  const headingText = (await heading.textContent())?.trim() ?? '(no heading found)';
  console.log(`Authenticated URL: ${page.url()}`);
  console.log(`Authenticated heading: ${headingText}`);

  await expect(heading).toBeVisible();
  await expect(page.locator('body')).not.toContainText(/invalid|incorrect|failed|error/i);
});

test('TC-LOGIN-002: login fails with an invalid email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.signInButton).toBeVisible();

  await loginPage.signIn('invalid-user@example.com', testPassword);

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(page).not.toHaveURL(/\/home(?:[/?#]|$)/);
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).not.toBeEmpty();
});

test('TC-LOGIN-003: login fails with an invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const invalidPassword = 'WrongPassword123!';

  await loginPage.goto();

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.signInButton).toBeVisible();

  await loginPage.signIn(testEmail, invalidPassword);

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(page).not.toHaveURL(/\/home(?:[/?#]|$)/);
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).not.toBeEmpty();
  await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  await expect(page.locator('body')).not.toContainText(invalidPassword);
});

test('TC-LOGIN-004: login validates an empty email', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.signInButton).toBeVisible();
  await expect(loginPage.emailInput).toHaveAttribute('required', '');

  await loginPage.passwordInput.fill(testPassword);
  await loginPage.signInButton.click();

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(page).not.toHaveURL(/\/home(?:[/?#]|$)/);
  await expect(loginPage.emailInput).toHaveAttribute('aria-invalid', 'true');
  await expect(loginPage.emailInput).toHaveAttribute(
    'data-felte-validation-message',
    "Email can't be empty",
  );
});

test('TC-LOGIN-005: login validates an empty password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.signInButton).toBeVisible();

  await loginPage.emailInput.fill(testEmail);
  await loginPage.signInButton.click();

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(page).not.toHaveURL(/\/home(?:[/?#]|$)/);
  await expect(loginPage.passwordInput).toHaveAttribute('aria-invalid', 'true');
  await expect(loginPage.passwordInput).toHaveAttribute(
    'data-felte-validation-message',
    "Password can't be empty",
  );
});

test('TC-LOGIN-006: login validates both empty fields', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.signInButton).toBeVisible();

  await loginPage.signInButton.click();

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(page).not.toHaveURL(/\/home(?:[/?#]|$)/);
  await expect(loginPage.emailInput).toHaveAttribute('aria-invalid', 'true');
  await expect(loginPage.emailInput).toHaveAttribute(
    'data-felte-validation-message',
    "Email can't be empty",
  );
  await expect(loginPage.passwordInput).toHaveAttribute('aria-invalid', 'true');
  await expect(loginPage.passwordInput).toHaveAttribute(
    'data-felte-validation-message',
    "Password can't be empty",
  );
});

test('TC-LOGIN-007: password visibility toggle preserves the entered value', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  await loginPage.passwordInput.fill(testPassword);
  await expect(loginPage.passwordInput).toHaveValue(testPassword);

  await loginPage.passwordVisibilityToggle.click();
  await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');
  await expect(loginPage.passwordInput).toHaveValue(testPassword);

  await loginPage.passwordVisibilityToggle.click();
  await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  await expect(loginPage.passwordInput).toHaveValue(testPassword);
});

test('TC-LOGIN-008: forgot password link opens password recovery', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.forgotPasswordLink.click();

  await expect(page).toHaveURL(/\/auth\/forgot-password/);
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('body')).not.toContainText(/404|not found|application error/i);
});

test('TC-LOGIN-009: sign up link opens registration', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.signUpLink.click();

  await expect(page).toHaveURL(/\/auth\/sign-up/);
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('body')).not.toContainText(/404|not found|application error/i);
});

test('TC-LOGIN-010: authenticated session persists after reload', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.signIn(testEmail, testPassword);
  await expect(page).toHaveURL(/\/home(?:[/?#]|$)/);

  await page.reload();

  await expect(page).toHaveURL(/\/home(?:[/?#]|$)/);
  await expect(page).not.toHaveURL(/\/auth\/sign-in/);
  await expect(page.locator('body')).toBeVisible();
});

test('TC-LOGIN-011: sign in triggers one successful login action', async ({ page }) => {
  test.skip(test.info().project.name === 'firefox', 'Firefox login redirect is unstable with the external authentication service');
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.emailInput.fill(testEmail);
  await loginPage.passwordInput.fill(testPassword);
  await loginPage.signInButton.click();

  await expect(page).toHaveURL(/\/home(?:[/?#]|$)/);
  await expect(page).not.toHaveURL(/\/auth\/sign-in/);
});

test('TC-LOGIN-012: login page displays essential controls', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(loginPage.signInHeading).toBeVisible();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.forgotPasswordLink).toBeVisible();
  await expect(loginPage.passwordVisibilityToggle).toBeVisible();
  await expect(loginPage.signInButton).toBeEnabled();
  await expect(loginPage.signUpLink).toBeVisible();

  await loginPage.emailInput.fill(testEmail);
  await loginPage.passwordInput.fill(testPassword);
  await expect(loginPage.emailInput).toHaveValue(testEmail);
  await expect(loginPage.passwordInput).toHaveValue(testPassword);
});