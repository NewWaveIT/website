import { defineConfig, devices } from "@playwright/test";

/**
 * Smoketests draaien tegen een productie-build op poort 3100 (niet 3000, zodat
 * ze niet botsen met een lokale `next dev`). De datalagen vallen terug op
 * ingebouwde content als Supabase-env ontbreekt, dus de build werkt zonder keys.
 */
const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  /* 60s in plaats van de standaard 30. Niet omdat de tests traag zijn -- de
     metingen erin duren milliseconden -- maar omdat de build zonder
     Supabase-sleutels draait: elke CMS-query loopt bij de eerste render van een
     route eerst in zijn eigen time-out voordat de seed het overneemt. Met vier
     workers tegelijk op een koude server tikte dat af en toe over de 30s heen,
     op een andere test per keer. */
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
