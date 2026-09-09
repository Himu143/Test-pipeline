# Bug Report

## Critical

### 1. CI logs expose environment secrets

**Files:** `.gitea/workflows/deploy-staging.yml`, `.gitea/workflows/deploy-prod.yml`

Both workflows export Phase secrets into `.env` and then run `cat .env`. This can expose API keys, credentials, and other sensitive configuration in CI logs.

**Recommended fix:** Remove `cat .env` and avoid printing secret values in workflow output.

## High

### 2. Focused Playwright test blocks CI

**File:** `tests/study-team.spec.ts`

`test.only` is present on TC-STUDY-008. When `CI` is enabled, `playwright.config.ts` sets `forbidOnly: true`, causing the test run to fail or preventing the rest of the suite from running.

**Recommended fix:** Replace `test.only(...)` with `test(...)` before pushing changes.

### 3. Credentials are hardcoded in test files

**Files:** `tests/login.spec.ts`, `tests/study-team.spec.ts`

The test email and password are committed in source control. If these credentials are valid, they are exposed to everyone with repository access and may be accidentally used against a real environment.

**Recommended fix:** Use CI secrets or dedicated non-production test credentials supplied through environment variables.

### 4. Forum channel deletion uses a malformed endpoint

**File:** `src/lib/stores/forum-channel.svelte.ts`

The delete method sends a request to `/api/forum/channels/id}`. The channel ID is not interpolated, and the request bypasses the configured forum service.

**Recommended fix:** Call the forum service delete method with the supplied channel ID and the correct API endpoint.

### 5. Training API errors are outside the declared error contract

**File:** `src/lib/services/traning.ts`

The API calls happen before the `try` blocks. Network failures and HTTP errors reject the promise instead of returning `{ status: 'error' }` as the service contract suggests.

**Recommended fix:** Move each request inside its `try` block and return a consistent error response.

### 6. Authentication tokens are stored in localStorage

**Files:** `src/lib/services/auth.ts`, `src/lib/services/http.ts`

Access and refresh tokens stored in `localStorage` are readable by JavaScript. An XSS vulnerability could expose both tokens.

**Recommended fix:** Prefer secure, HttpOnly, SameSite cookies with server-side session validation.

### 7. Protected routes rely on client-side authorization

**Files:** `src/routes/(authenticated)/+layout.svelte`, admin route layouts

Route access is controlled mainly by client-side state and redirects. Client-side checks do not provide reliable authorization or protect sensitive data.

**Recommended fix:** Enforce authentication and role authorization in server hooks, server load functions, and backend APIs.

## Medium

### 8. Expired sessions can remain authenticated

**Files:** `src/lib/stores/auth.svelte.ts`, `src/lib/services/auth.ts`

If `getMe()` fails, the profile error is ignored and the existing token remains in state. The UI may continue treating the user as authenticated even though the session is invalid.

**Recommended fix:** Clear auth state and redirect to sign-in when session validation fails.

### 9. Failed refresh after a 403 does not clear tokens

**File:** `src/lib/services/http.ts`

Refresh failure clears storage only when the original response is `401`. A failed refresh after `403` leaves stale tokens in storage.

**Recommended fix:** Clear tokens and redirect consistently after an unrecoverable refresh failure.

### 10. Support form has no API failure feedback

**File:** `src/lib/components/app/support-section.svelte`

The mutation defines `onSuccess` but no `onError`. A Directus/API failure leaves the user without an error message or retry guidance.

**Recommended fix:** Add an error handler and show a clear failure toast or inline message.

### 11. Support test does not verify the submitted payload

**File:** `tests/study-team.spec.ts`

The mocked Support Us endpoint returns success for every request. The test can pass even if the email is missing or incorrectly formatted in the request body.

**Recommended fix:** Inspect `route.request().postDataJSON()` and assert the expected email before returning success.

### 12. Bookmark state can diverge from the backend

**File:** `src/lib/stores/bookmark.svelte.ts`

The UI updates bookmarks before the API confirms success, and API failures are ignored. Users can see bookmarks that were not saved or deleted.

**Recommended fix:** Roll back failed optimistic updates or refetch bookmarks after an error.

### 13. Resource pagination can show the wrong active page

**File:** `src/routes/(authenticated)/resources/[slug]/+page.svelte`

The resource request reads the page number from the URL, but `currentPage` remains initialized to `1`. The pagination control can indicate page 1 while displaying page 3 data.

**Recommended fix:** Initialize or derive `currentPage` from the URL query parameter.

## Low

### 14. Forced click hides real UI problems

**File:** `tests/pages/StudyTeam.ts`

The Support Us POM uses `click({ force: true })`, bypassing normal visibility, overlap, and interactability checks.

**Recommended fix:** Use a normal `click()` so the test reflects real user behavior.

## Validation Notes

The reported issues are based on static review of the current project. Type checking does not detect runtime API failures, leaked CI logs, authorization weaknesses, or incorrect endpoint paths. The Playwright tests should be run after each fix, including CI mode with `CI=true`.