/**
 * Playwright Global Setup — FusePay
 * ──────────────────────────────────────────────────────────────────────────────
 * Runs once before the entire test suite.
 *
 * Responsibilities:
 *  1. Validate that NEXT_PUBLIC_API_URL is set and looks like a real URL.
 *  2. Perform an early reachability probe so individual tests don't spend their
 *     timeout on a Render cold-start — the first request here warms the dyno.
 *  3. Write a run-info JSON file that is later picked up by the release evidence
 *     doc (docs/testnet-release.md template).
 */

import { chromium, type FullConfig } from "@playwright/test";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

async function globalSetup(_config: FullConfig) {
  // ── 1. Validate environment ────────────────────────────────────────────────
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl || apiUrl === "http://NEXT_PUBLIC_API_URL_NOT_SET") {
    throw new Error(
      [
        "",
        "──────────────────────────────────────────────────────",
        "  MISSING: NEXT_PUBLIC_API_URL",
        "  Set this environment variable before running tests.",
        "",
        "  Local:  export NEXT_PUBLIC_API_URL=https://fusepay-api.onrender.com",
        "  Vercel: add it under Project → Settings → Environment Variables",
        "──────────────────────────────────────────────────────",
        "",
      ].join("\n")
    );
  }

  try {
    new URL(apiUrl);
  } catch {
    throw new Error(`NEXT_PUBLIC_API_URL is not a valid URL: "${apiUrl}"`);
  }

  console.log(`\n[global-setup] API origin: ${apiUrl}`);

  // ── 2. Warm the Render dyno ────────────────────────────────────────────────
  // Send a real HTTP GET to /health before any test starts.  Render free-tier
  // instances can take up to 30 s to cold-start; doing it here burns that wait
  // time in setup, not in the first test's timeout budget.
  console.log("[global-setup] Warming Render dyno via GET /health …");

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Allow up to 45 s for the cold-start probe (separate from per-test timeout).
  const warmupTimeout = 45_000;

  try {
    const resp = await page.request.get(`${apiUrl}/health`, {
      timeout: warmupTimeout,
    });
    console.log(
      `[global-setup] /health → HTTP ${resp.status()} (dyno is warm)`
    );
  } catch (err) {
    // A failure here means the backend is completely unreachable.  Surface a
    // clear message rather than letting every test time out individually.
    throw new Error(
      `[global-setup] Could not reach ${apiUrl}/health within ${warmupTimeout}ms.\n` +
        `Make sure the Render service is deployed and the URL is correct.\n` +
        String(err)
    );
  } finally {
    await context.close();
    await browser.close();
  }

  // ── 3. Write run-info evidence ─────────────────────────────────────────────
  let frontendSha = "unknown";
  let backendSha = "unknown";

  try {
    frontendSha = execSync("git rev-parse --short HEAD", {
      cwd: process.cwd(),
      encoding: "utf8",
    }).trim();
  } catch {
    // Not a git repo or git is not installed — use timestamp instead.
    frontendSha = `no-git-${Date.now()}`;
  }

  // The backend SHA must be provided by the CI/CD pipeline or deployment script.
  // It is read from the RENDER_API_COMMIT env var (set in the release workflow).
  backendSha = process.env.RENDER_API_COMMIT ?? "unknown (set RENDER_API_COMMIT)";

  const runInfo = {
    timestamp: new Date().toISOString(),
    apiOrigin: apiUrl,
    frontendCommit: frontendSha,
    backendCommit: backendSha,
    playwrightVersion: process.env.npm_package_devDependencies_playwright ?? "see package.json",
  };

  const reportDir = path.join(process.cwd(), "playwright-report");
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const runInfoPath = path.join(reportDir, "run-info.json");
  fs.writeFileSync(runInfoPath, JSON.stringify(runInfo, null, 2));
  console.log(`[global-setup] Run info written to ${runInfoPath}`);
  console.log(
    `[global-setup] Frontend commit: ${runInfo.frontendCommit} | Backend commit: ${runInfo.backendCommit}`
  );
}

export default globalSetup;
