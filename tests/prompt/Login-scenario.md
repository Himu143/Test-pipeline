# Playwright MCP — CIRCLE Login Functional Test Scenarios

## Application Under Test

- **Application:** CIRCLE — My Caregiving Circle
- **Login URL:** http://localhost:5173/auth/sign-in
- **Test Type:** Web UI Functional Testing
- **Automation Tool:** Playwright
- **Execution Mode:** Playwright MCP
- **Scope:** Login functionality only
- **API Testing:** Out of scope

> **Security note:** The credentials below were supplied specifically for this test. For an automated CI/CD setup, store them in environment variables or a secrets manager instead of committing them to this file.

## Test Credentials

| Field | Value |
|---|---|
| Email | `tajulislam@inneed.cloud` |
| Password | `J0hnc3na` |

---

# MCP Agent Instructions

The Playwright MCP agent must:

1. Open the login URL.
2. Inspect the page and identify the login form.
3. Use accessible locators whenever possible.
4. Enter the supplied test credentials.
5. Submit the login form.
6. Verify whether authentication succeeds.
7. Verify the post-login page and URL.
8. Report any functional/UI issue found.
9. Do not modify application data.
10. Do not perform API testing.
11. Do not claim a test passed unless the browser interaction and expected result were actually verified.

## Locator Preference

Use locators in this order:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTestId()`
6. CSS/XPath only when necessary

For this page, the visible UI contains:

- Email Address field
- Password field
- Forgot password link
- Password visibility icon
- Sign In button
- Sign Up link

---

# TC-LOGIN-001 — Successful Login With Valid Credentials

### Objective

Verify that an existing user can successfully sign in using valid email and password credentials.

### Preconditions

- The application is accessible.
- The user account exists and is active.
- The supplied credentials are valid.
- Browser is in a clean/known state.

### Test Steps

1. Navigate to:
   `https://mycaregivingcircle.org/auth/sign-in`
2. Verify that the Sign In page is displayed.
3. Locate the **Email Address** input.
4. Enter:
   `tajulislam@inneed.cloud`
5. Locate the **Password** input.
6. Enter:
   `J0hnc3na`
7. Click the **Sign In** button.
8. Wait for the authentication/navigation process to complete.
9. Verify that the user is redirected away from the sign-in page.
10. Verify that an authenticated page/dashboard is displayed.
11. Verify that the login page is no longer accessible as the active authenticated page.
12. Record the final URL and visible page heading/content.

### Expected Result

- Login request is successfully processed.
- User is authenticated.
- User is redirected to the expected authenticated page/dashboard.
- No login error message is displayed.
- The authenticated page loads successfully.
- User session remains active after navigation/reload if the application is designed to persist the session.

### Pass Criteria

The test passes only if:

- Valid credentials are accepted.
- Authentication succeeds.
- Correct post-login navigation occurs.
- The authenticated page is visible.
- No unexpected error is displayed.

---

# TC-LOGIN-002 — Invalid Email

### Objective

Verify that login fails when an invalid/non-existing email is provided.

### Test Data

- Email: `invalid-user@example.com`
- Password: `J0hnc3na`

### Steps

1. Open the Sign In page.
2. Enter the invalid email.
3. Enter the valid password.
4. Click **Sign In**.
5. Wait for the login response.
6. Check the page for an error message.

### Expected Result

- User is not authenticated.
- User remains on the Sign In page or is returned to it.
- A clear and appropriate authentication error is displayed.
- No authenticated dashboard is accessible.

---

# TC-LOGIN-003 — Invalid Password

### Objective

Verify that login fails when an incorrect password is supplied.

### Test Data

- Email: `tajulislam@inneed.cloud`
- Password: `WrongPassword123!`

### Steps

1. Open the Sign In page.
2. Enter the valid email.
3. Enter the incorrect password.
4. Click **Sign In**.
5. Wait for the login response.
6. Check for an error message.

### Expected Result

- Authentication fails.
- User is not redirected to the authenticated dashboard.
- A clear authentication error is displayed.
- Password is not exposed in the UI.

---

# TC-LOGIN-004 — Empty Email Validation

### Objective

Verify that the email field is mandatory.

### Steps

1. Open the Sign In page.
2. Leave the email field empty.
3. Enter a valid password.
4. Click **Sign In**.

### Expected Result

- Login is not submitted successfully.
- Email validation is displayed.
- The user remains on the Sign In page.

---

# TC-LOGIN-005 — Empty Password Validation

### Objective

Verify that the password field is mandatory.

### Steps

1. Open the Sign In page.
2. Enter:
   `tajulislam@inneed.cloud`
3. Leave the password field empty.
4. Click **Sign In**.

### Expected Result

- Login is not submitted successfully.
- Password validation is displayed.
- User remains on the Sign In page.

---

# TC-LOGIN-006 — Both Fields Empty

### Objective

Verify validation when both login fields are empty.

### Steps

1. Open the Sign In page.
2. Leave Email Address empty.
3. Leave Password empty.
4. Click **Sign In**.

### Expected Result

- Login is blocked.
- Required-field validation is displayed for the applicable fields.
- No authenticated navigation occurs.

---

# TC-LOGIN-007 — Password Visibility Toggle

### Objective

Verify that the password visibility control works correctly.

### Steps

1. Open the Sign In page.
2. Enter the test password.
3. Verify that the password is masked by default.
4. Click the eye/visibility icon.
5. Verify that the password becomes visible.
6. Click the icon again.
7. Verify that the password becomes masked again.

### Expected Result

- Password is masked by default.
- Visibility toggle reveals the password.
- Clicking the toggle again masks the password.
- The entered password value is not changed during the toggle operation.

---

# TC-LOGIN-008 — Forgot Password Navigation

### Objective

Verify that the Forgot Password functionality navigates to the appropriate password recovery page.

### Steps

1. Open the Sign In page.
2. Click **Forgot password**.
3. Wait for navigation.
4. Verify the destination page.

### Expected Result

- User is redirected to the password recovery flow.
- The password recovery page loads successfully.
- No unexpected 404 or application error occurs.

---

# TC-LOGIN-009 — Sign Up Navigation

### Objective

Verify that the Sign Up link navigates to the account registration page.

### Steps

1. Open the Sign In page.
2. Click **Sign Up**.
3. Wait for navigation.
4. Verify the registration page.

### Expected Result

- User is redirected to the registration page.
- Registration page loads successfully.
- No unexpected error occurs.

---

# TC-LOGIN-010 — Login Session Persistence

### Objective

Verify that an authenticated session behaves correctly after navigation or page reload.

### Preconditions

- Successful login has been completed.

### Steps

1. Login using the valid credentials.
2. Verify the authenticated page.
3. Reload the page.
4. Wait for the application to finish loading.
5. Verify the user remains authenticated.
6. Navigate to another authenticated page.
7. Navigate back to the previous authenticated page.

### Expected Result

- User remains authenticated according to the application's expected session policy.
- User is not unexpectedly redirected to Sign In.
- Authenticated pages remain accessible.

---

# TC-LOGIN-011 — Login Button Behavior

### Objective

Verify that the Sign In button behaves correctly during login.

### Steps

1. Open the Sign In page.
2. Enter valid credentials.
3. Click **Sign In** once.
4. Observe the button during the authentication process.

### Expected Result

- The login action is triggered once.
- The application should prevent accidental duplicate submissions if the request is still processing.
- No duplicate navigation or unexpected error should occur.

---

# TC-LOGIN-012 — Login Page UI and Basic Functional Check

### Objective

Verify that all essential login controls are visible and usable.

### Steps

1. Open the Sign In page.
2. Verify the following elements:
   - Sign In heading
   - Email Address label
   - Email input
   - Password label
   - Password input
   - Forgot password link
   - Password visibility icon
   - Sign In button
   - Sign Up link
3. Verify that the inputs accept text.
4. Verify that the Sign In button is clickable.

### Expected Result

All essential login controls are visible, usable, and correctly aligned with their labels.

---

# MCP Execution Workflow

When the user asks:

> Test the login functionality.

The MCP agent should execute this workflow:

```text
1. Navigate to login URL
        ↓
2. Inspect login page
        ↓
3. Verify required controls
        ↓
4. Enter valid credentials
        ↓
5. Click Sign In
        ↓
6. Wait for navigation/authentication
        ↓
7. Verify authenticated page
        ↓
8. Capture final URL
        ↓
9. Check console/page errors if available
        ↓
10. Report result
```

---

# AI Agent Test Report Format

After execution, return the result in this format:

## Login Test Result

**Application:** CIRCLE

**URL:** `https://mycaregivingcircle.org/auth/sign-in`

**Overall Status:** PASS / FAIL / BLOCKED

### Test Summary

| Test Case | Status | Notes |
|---|---|---|
| Valid Login | PASS/FAIL | |
| Invalid Email | PASS/FAIL | |
| Invalid Password | PASS/FAIL | |
| Empty Email | PASS/FAIL | |
| Empty Password | PASS/FAIL | |
| Both Fields Empty | PASS/FAIL | |
| Password Visibility | PASS/FAIL | |
| Forgot Password | PASS/FAIL | |
| Sign Up Navigation | PASS/FAIL | |
| Session Persistence | PASS/FAIL | |

### Bugs Found

For every actual defect:

**Bug Title:**  
**Severity:** Critical / High / Medium / Low  
**Test Case:**  
**Steps to Reproduce:**  
**Expected Result:**  
**Actual Result:**  
**URL:**  
**Console Error:**  
**Evidence:** Screenshot/video if available

### Important Agent Rule

Do not report a bug simply because an assertion or locator failed.

First determine whether the failure is caused by:

- Application defect
- Incorrect locator
- Test-data problem
- Environment problem
- Authentication/session issue
- Network issue

Only classify it as an application bug when the evidence supports that conclusion.

---

# Security Rules

- Never expose credentials in screenshots or final reports.
- Prefer environment variables for real automation.
- Do not print the password to the terminal.
- Do not commit credentials to Git.
- Do not send credentials to external services.
- Use the supplied credentials only for the authorized test account.

## Recommended Environment Variables

For actual automation, use:

```bash
CIRCLE_TEST_EMAIL=tajulislam@inneed.cloud
CIRCLE_TEST_PASSWORD=<test-password>
```

Then access them from Playwright using:

```ts
process.env.CIRCLE_TEST_EMAIL
process.env.CIRCLE_TEST_PASSWORD
```

---

# Final MCP Instruction

When executing login testing, use the browser and actually perform the interactions.

Do not simulate the result.

The final response must clearly state:

1. What was tested.
2. Which test cases passed.
3. Which test cases failed.
4. Which issues are confirmed application defects.
5. Evidence for each confirmed defect.
6. Any blocked or untested scenarios.
