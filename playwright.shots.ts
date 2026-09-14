import { defineConfig, devices } from "@playwright/test";

/**
 * Aparte config voor `npm run shots`. Zelfde server als de e2e-suite, maar een
 * andere testmap: schermafdrukken zijn geen tests en horen niet mee te draaien
 * met CI.
 */
const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tools",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
