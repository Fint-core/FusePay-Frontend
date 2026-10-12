/**
 * Playwright Configuration — FusePay Frontend
 * ─────────────────────────────────────────────────────────────────────────────
 * Smoke-tests the deployed frontend's connectivity to the Render API.
 *
 * Required environment variable (set in Vercel project settings):
 *   NEXT_PUBLIC_API_URL  – The base URL of the deployed Render API service,
 *                          e.g. https://fusepay-api.onrender.com
 *
 * Run locally:
 *   pnpm exec playwright test
 *
 * Run in CI (Vercel preview / production):
 *   NEXT_PUBLIC_API_URL=https://fusepay-api.onrender.com pnpm exec playwright test --reporter=html
 */

import { defineConfig, devices } from "@playwright/test";

// ── Resolve the backend base URL ──────────────────────────────────────────────
// Falls back to an obviously-invalid sentinel so tests fail loudly if the var
// is missing, rather than silently hitting localhost.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://NEXT_PUBLIC_API_URL_NOT_SET";

// The Next.js app origin under test (local dev or Vercel deployment URL).
const FRONTEND_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests/e2e",

  // Run every test file; no parallelism so Render free-tier doesn't cold-start twice.
  fullyParallel: false,
  workers: 1,

  // A test may not take longer than 30 s (Render cold-start can be slow).
  timeout: 30_000,

  // Fail the suite if any environment variable is clearly missing.
  globalSetup: "./tests/e2e/global-setup.ts",

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["json", { outputFile: "playwright-report/results.json" }],
  ],

  use: {
    // The frontend under test.
    baseURL: FRONTEND_URL,

    // Pass the API origin to every test via `extraHTTPHeaders` is NOT done here
    // on purpose — tests call the API directly through page.request or native
    // fetch, not through a proxied Next.js route. The URL is read from the env
    // var inside each spec.
    extraHTTPHeaders: {},

    // Capture trace on first retry so failures are reproducible.
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    // ── Desktop ────────────────────────────────────────────────────────────────
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox-desktop",
      use: { ...devices["Desktop Firefox"] },
    },

    // ── Mobile ─────────────────────────────────────────────────────────────────
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // Expose the API base URL to all tests through the Playwright env mechanism.
  // Tests read it via `process.env.NEXT_PUBLIC_API_URL`.
});

// Re-export the resolved URL so global-setup can validate it at startup.
export { API_BASE_URL };
