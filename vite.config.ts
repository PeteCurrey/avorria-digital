import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Force all imports to the same instance to prevent duplicate React errors
      "react": path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "react-helmet-async": path.resolve(__dirname, "node_modules/react-helmet-async"),
      "react-router-dom": path.resolve(__dirname, "node_modules/react-router-dom"),
      "@tanstack/react-query": path.resolve(__dirname, "node_modules/@tanstack/react-query"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-helmet-async",
      "react-router-dom",
      "@tanstack/react-query",
      "scheduler",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-helmet-async",
      "react-router-dom",
      "@tanstack/react-query",
      "scheduler",
    ],
    esbuildOptions: {
      jsx: "automatic",
    },
    force: true, // Force re-optimization to clear cached duplicates
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
}));
