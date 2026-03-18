

# Fix: SPA Rendering and Duplicate Meta Tags for SEO

## The Problem

Avorria is a pure client-side SPA. Every URL returns the same `index.html` with:
- An empty `<div id="root"></div>` (no content for crawlers)
- Identical homepage meta tags (title, description, canonical, OG) on every page

The `SEOHead` component using `react-helmet-async` only modifies the DOM after JavaScript executes. Google's crawler *can* render JavaScript, but it's delayed, deprioritised, and unreliable -- especially for 179+ landing pages. This is a fundamental architectural limitation.

## Constraints

This is a Lovable-hosted Vite SPA. We cannot add SSR (Next.js), and the build environment doesn't support headless Chrome for puppeteer-based prerendering. What we *can* do:

1. **Build-time static HTML generation** -- a custom Vite plugin that outputs individual `.html` files per route with correct meta tags and lightweight semantic content
2. **Dynamic bot-rendering via edge function** -- a backend function that returns fully-formed HTML to search engine crawlers

The plan combines both for maximum coverage.

---

## Approach

### 1. Build-time Pre-rendering Plugin (Primary Fix)

Create a custom Vite plugin (`vite-plugin-prerender-meta.ts`) that runs at build time and generates a standalone `.html` file for every known route. Each file will contain:

- Correct `<title>`, `<meta description>`, `<link rel="canonical">`
- Correct Open Graph and Twitter Card tags
- JSON-LD structured data (Organization, Service, FAQPage, BreadcrumbList as appropriate)
- A lightweight `<noscript>` content block with the page's H1 and introductory paragraph for crawlers
- The standard SPA `<script>` tags so the React app hydrates on top

**Data source**: A new `src/data/prerender-routes.ts` file that maps every route to its meta title, description, canonical, OG image, and a summary paragraph. This draws from the existing data in `sitemapUrls.ts`, `landingPages.ts`, `serviceLocationLandingPages.ts`, and the `SEOHead` props already defined in each page component.

**Output**: ~60+ individual HTML files (e.g., `dist/services/seo/index.html`, `dist/about/index.html`, `dist/seo-agency/chesterfield/index.html`) each with unique, correct meta tags.

### 2. Route Meta Data Registry

Create `src/data/routeMetadata.ts` -- a single source of truth mapping every public route to its SEO metadata:

```text
Route Path → { title, description, canonical, ogImage, h1, introText, schemaType }
```

This registry will be used by:
- The build-time plugin (for static HTML generation)
- The existing `SEOHead` component (optional refactor to pull from registry)
- The sitemap edge function (for consistency)

Categories:
- **Core pages** (~30): Hardcoded metadata from existing `SEOHead` usage
- **Service-location pages** (~100+): Generated from `locations.ts` × `services.ts`
- **Service-industry pages** (~50+): Generated from `landingPages.ts`
- **Resource/guide pages** (~15): Generated from `resources.ts`

### 3. Index.html Cleanup

Strip the hardcoded homepage-specific meta tags from `index.html` (the duplicate `og:title`, `og:description`, `twitter:title`, `twitter:description` at the bottom). These will be injected per-page by the plugin. Keep only universal tags (charset, viewport, fonts, structured data for Organization/WebSite).

### 4. Fallback: Dynamic Rendering Edge Function (Belt-and-Suspenders)

Create a `prerender` edge function that:
- Accepts a URL path
- Looks up the route in the metadata registry (duplicated server-side)
- Returns a full HTML document with correct meta tags and semantic content

This provides coverage for any dynamically-added routes that haven't been built yet. It can be wired via `_redirects` or `vercel.json` for bot user-agents if the hosting supports it, or used as a fallback.

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/data/routeMetadata.ts` | Create | Central SEO metadata registry for all public routes |
| `vite-plugin-prerender-meta.ts` | Create | Build-time plugin generating per-route HTML files |
| `vite.config.ts` | Modify | Register the prerender plugin |
| `index.html` | Modify | Remove duplicate homepage-only meta tags |
| `supabase/functions/prerender/index.ts` | Create | Edge function returning bot-friendly HTML for any route |
| `public/_redirects` | Modify | Add prerender proxy rules |
| `vercel.json` | Modify | Add prerender rewrite rules |

---

## Technical Detail

**Build plugin flow**:
1. After Vite's standard build completes (`closeBundle` hook)
2. Read `routeMetadata.ts` to get all routes and their metadata
3. For each route, read the base `dist/index.html` as a template
4. Replace the `<head>` section with route-specific meta tags
5. Inject a `<noscript>` block inside `<div id="root">` with semantic HTML (h1, p)
6. Write to `dist/[route-path]/index.html`

**Meta tag injection** replaces the generic homepage tags with per-page values, ensuring Google sees unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, and OG/Twitter tags in the raw HTML source -- before any JavaScript executes.

This approach requires no infrastructure changes, works within Lovable's build system, and immediately resolves both the empty-HTML and duplicate-meta-tags problems across all ~200 pages.

