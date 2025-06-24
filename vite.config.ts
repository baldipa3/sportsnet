import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ babel: { plugins: ["relay"] } }), tailwindcss()],
  server: {
    host: "0.0.0.0", // Allow external access
    port: 5173, // Internal Vite port
    strictPort: true, // Fail if 5173 is not available
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
