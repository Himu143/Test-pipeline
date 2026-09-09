# Playwright Setup Guide

This project already includes Playwright and is configured to run browser tests against the local Svelte app.

## 1) Prerequisites

Make sure you have:

- Node.js installed
- pnpm installed
- the project dependencies installed

From the project root:

```bash
cd /home/tajul/Videos/test-playwright/circle-web-app
pnpm install
```

If Playwright is not present in a fresh setup, add it explicitly:

```bash
pnpm add -D @playwright/test
```

## 2) Install browser binaries

Install the Playwright browser package for all supported browsers:

```bash
npx playwright install --with-deps
```

If you only need Chromium:

```bash
npx playwright install chromium
```

## 3) Run the app locally

The default app URL is `http://localhost:5173`.

```bash
pnpm dev
```

The repo also has a Playwright config `webServer` entry, so tests can start the local app automatically when needed. In CI or when reusing a running app, you can still override the base URL with `BASE_URL`.

## 4) Run Playwright tests

Run the full suite:

```bash
npx playwright test
```

Run only Chromium:

```bash
npx playwright test --project=chromium
```

Run a single spec file:

```bash
npx playwright test tests/login.spec.ts --project=chromium
```

Run a filtered subset by test name:

```bash
npx playwright test tests/login.spec.ts --project=chromium --grep "login"
```

Run in headed mode for visual debugging:

```bash
npx playwright test tests/login.spec.ts --project=chromium --headed
```

Open the UI runner:

```bash
npx playwright test --ui
```

## 5) Useful package scripts

The project defines the following scripts in `package.json`:

```bash
pnpm test:e2e
pnpm test:e2e:ui
```

The script mapping is:

```bash
"test:e2e": "playwright test"
"test:e2e:ui": "playwright test --ui"
```

## 6) Current project configuration

The Playwright config in this repo includes:

- `testDir: './tests'`
- `reporter: 'html'`
- base URL: `http://localhost:5173`
- browser projects: `chromium`, `firefox`, and `webkit`
- automatic local `webServer` startup with `pnpm run dev`

Example:

```ts
webServer: {
  command: 'pnpm run dev',
  url: 'http://localhost:5173',
  reuseExistingServer: !process.env.CI,
}
```

## 7) Troubleshooting

If browser execution fails, reinstall the browsers:

```bash
npx playwright install --with-deps
```

If the app is not reachable, verify the server is running:

```bash
curl http://localhost:5173
```

If a test remains flaky, try using a clean install:

```bash
rm -rf node_modules
pnpm install
npx playwright install --with-deps
```

## 8) View HTML report

After a Playwright run:

```bash
npx playwright show-report
```

## Notes

- The app is configured for browser testing against `http://localhost:5173`.
- The project uses Chromium for the main validation flow, with Firefox and WebKit also configured in the project matrix.
- Playwright is already included in the repo dependencies via `@playwright/test`.
