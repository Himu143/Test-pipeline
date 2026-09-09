# CIRCLE Project — Full Issues List

## 🟥 Blocking

1. **Runtime crash prevents E2E execution**

   * Error: `TypeError: Cannot read properties of undefined (reading 'env')`
   * File: `src/lib/services/http.ts`
   * Related module: `$env/dynamic/public`
   * Expected runtime global: `globalThis.__sveltekit_dev.env`
   * Actual injected global resembles: `globalThis.__sveltekit_41cy28`
   * Impact: App fails to hydrate/SSR in dev mode.
   * Result: **0/270 Playwright tests passing**
   * Build succeeds, but dev runtime is broken.
   * Suggested fix: align/update `@sveltejs/kit`, `vite`, `@sveltejs/vite-plugin-svelte`, and Svelte versions.

## 🟥 High — CI / Security

2. **Secrets are printed in CI logs**

   * Files:

     * `.gitea/workflows/deploy-prod.yml`
     * `.gitea/workflows/deploy-staging.yml`
   * Around line 96.
   * Both run:

     ```bash
     cat .env
     ```
   * Should be removed immediately.

3. **Hardcoded test credentials**

   * Files:

     * `tests/login.spec.ts`
     * `tests/study-team.spec.ts`
   * Credentials are stored directly in source.
   * Move them to environment variables or CI secrets.

4. **`.env` file committed to repository**

   * Contains real development API endpoints.
   * `.env` should be added to `.gitignore`.
   * Use `.env.example` for placeholder configuration.

## 🟠 Medium — Type Safety / Code Issues

5. **Missing dependencies**

   * Imported but missing from `package.json`:

     * `@internationalized/date`
     * `layerchart`
     * `@tanstack/table-core`
     * `vaul-svelte`
     * `formsnap`
     * `sveltekit-superforms`
     * `paneforge`
     * `mode-watcher`
   * Causes type-check failures across the UI.

6. **`auth.ts` error response is not typed**

   * File: `src/lib/services/auth.ts`
   * Lines: approximately `29, 48, 70, 122, 162, 186`
   * Error:

     ```text
     Property 'detail' does not exist on type '{}'
     ```

7. **Contact Us mutation type mismatch**

   * File: `src/routes/contact-us/+page.svelte`
   * Lines: approximately `46, 53`
   * `mutation.mutate(values)` does not match the `mutationFn` argument type.
   * Current mismatch:

     ```text
     void vs Record<string, unknown>
     ```

8. **Context menu typing problems**

   * File: `src/routes/context-menu/+page.svelte`
   * Lines: approximately `52, 62`
   * `checkboxValues` indexed using arbitrary string.
   * `MenuItem[]` union does not accept generic `type: string`.

9. **Implicit `any` parameters**

   * Approximately 20 locations.
   * Examples:

     * `src/lib/utils.ts`
     * `select.svelte`
     * `combobox.svelte`
     * `data-table.svelte.ts`
     * `form/*`
     * `training/[slug]/+page.svelte`
     * `resources/[slug]/+page.svelte`
     * `study-team-section.svelte`

10. **Incorrect `title` prop type**

    * File: `src/lib/components/generic/sheet.svelte`
    * Around line 69.
    * `title` is typed as `String`, but code attempts:

      ```ts
      title()
      ```

11. **Invalid `checked` prop on menu radio items**

    * File: `src/lib/components/generic/context-menu.svelte`
    * Lines: approximately `87, 130`
    * `checked` is not valid for the current `MenuRadioItemProps` type.

12. **Forum store callback return-type mismatch**

    * File: `src/lib/stores/forum-post.svelte.ts`
    * Around line 254.
    * Current:

      ```text
      (values) => void
      ```
    * Expected:

      ```text
      (values: ForumChannel) => Promise<any>
      ```

13. **Invalid cohort status type**

    * File: `src/lib/stores/cohort.svelte.ts`
    * Around line 43.
    * Generic `string` used where only these are allowed:

      ```ts
      "approved" | "rejected" | "pending"
      ```

14. **Missing `AuthStore` methods**

    * Referenced but not defined:

      * `verifyEmailSignup`
      * `resendVerificationEmail`
    * Used in:

      * `email-verification-dialog.svelte`
      * OTP page

15. **Missing required `onViewDetailClick` prop**

    * File: `forum/[id]/+page.svelte`
    * Around line 19.
    * Component requires `onViewDetailClick`, but receives only:

      ```ts
      {
        post,
        detailView: true
      }
      ```

16. **Properties accessed on values typed as `never`**

    * Examples:

      * `title`
      * `short_description`
      * `description`
      * `name`
    * Seen in:

      * member card
      * footer
      * resources
      * admin pages

17. **Svelte 5 deprecation warnings**

    * Approximately **29 warnings**.
    * Includes:

      * deprecated `<slot>` usage
      * `state_referenced_locally`
    * Seen in:

      * `tooltip.svelte`
      * toggle group
      * carousel
      * date picker
      * chart container
      * column layout
      * `footer-old`

## 🟡 Low — Code Quality / Test Hygiene

18. **Prettier fails on 455 files**

    * `pnpm lint` fails.
    * Affects:

      * application source
      * Playwright specs
      * page objects
    * Run:

      ```bash
      pnpm format
      ```

19. **Forced click hides UI issues**

    * File: `tests/pages/StudyTeam.ts`
    * `submitSupportEmail` uses:

      ```ts
      click({ force: true })
      ```
    * This bypasses Playwright actionability checks.

20. **Firefox test skipped without a precise root cause**

    * File: `login.spec.ts`
    * Lines: approximately `160–165`
    * Test: `TC-LOGIN-011`
    * Uses `test.skip()` due to an allegedly unstable external authentication service.
    * Could hide a real cross-browser defect.

21. **Redundant authentication helper**

    * File: `tests/study-team.spec.ts`
    * `ensureAuthenticated` is unnecessary because `beforeEach` already authenticates.

22. **Support Us mock does not validate request payload**

    * File: `tests/study-team.spec.ts`
    * Mocked route always returns success.
    * `TC-STUDY-007` can pass even if incorrect form data is submitted.
    * Matches `BUG-REPORT.md` issue #11.

23. **Hardcoded timeout and duplicate test IDs**

    * File: `unauthorized-landing-page.spec.ts`
    * `TC-HERO-007` uses:

      ```ts
      page.waitForTimeout(2000)
      ```
    * This is flaky and should use condition-based waits.
    * Duplicate ID:

      ```text
      TC-STUDY-001
      ```

      exists in both landing and Study Team specs.

24. **Incorrect SvelteKit route filename**

    * File:

      ```text
      src/routes/(authenticated)/forum/page.svelte
      ```
    * Warning:

      ```text
      Missing route file prefix. Did you mean +page.svelte?
      ```
    * Should likely be:

      ```text
      +page.svelte
      ```

25. **`BUG-REPORT.md` is partially outdated**

    * `test.only` on `TC-STUDY-008` has already been fixed.
    * Existing report should be updated.
    * Items still reported as valid:

      * #1
      * #3
      * #4
      * #10
      * #11

## Overall Status

* **Playwright tests:** 270
* **Passing:** 0
* **Primary blocker:** SvelteKit development runtime crash
* **`pnpm check`:** approximately 100 errors / 29 warnings
* **Prettier failures:** approximately 455 files
* **Highest immediate priorities:** runtime crash → CI secret exposure → hardcoded credentials → `.env` tracking → type-check failures.
