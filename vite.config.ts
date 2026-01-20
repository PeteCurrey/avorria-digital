// Cache rebuild trigger v3 - comprehensive React deduplication
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "framer-motion",
      "@tanstack/react-query",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-accordion",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "react-router-dom",
      "react-helmet-async",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "framer-motion",
      "@tanstack/react-query",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-dialog",
      "react-router-dom",
      "react-helmet-async",
    ],
    force: true,
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
}));
