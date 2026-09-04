import path from "path";
import { defineConfig } from "vitest/config";

/**
 * Unittests voor pure logica (sanitize, formuliervalidatie). Los van de
 * Playwright e2e-smoketests in tests/e2e/, die een eigen runner gebruiken.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.spec.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      // `server-only` throws by default outside Next.js's RSC bundler
      // (which resolves it via the `react-server` export condition to a
      // no-op). Vitest has no such condition, so alias it to a stub.
      "server-only": path.resolve(__dirname, "tests/unit/mocks/server-only.ts"),
    },
  },
});
