import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ babel: { plugins: ["relay"] } }), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/routes": path.resolve(__dirname, "./src/routes"),
    },
  },
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
