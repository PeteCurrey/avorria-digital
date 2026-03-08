

## Review of Recent Work

Over the last few sessions, you've built out a substantial platform:

**Admin Panel (Phase 1 + 2):**
- Content Studio with visual pipeline (Generate → Review → Approved → Scheduled → Published), real social connection indicators, platform-aware image generation upgraded to `gemini-3-pro-image-preview`
- SEO Dashboard with target keyword tracking, rank change history, competitor analysis (SWOT), and AI-generated SEO suggestions
- Automated weekly newsletter via `send-weekly-newsletter` edge function
- `pg_cron` jobs for daily rank tracking, weekly newsletters, weekly competitor analysis, Monday SEO optimization, and hourly content publishing
- Removed all mock data fallbacks from `serpapi`, `google-analytics`, and `google-search-console` edge functions

**SEO Coverage:**
- 100% `SEOHead` + `BreadcrumbSchema` coverage across all public pages
- Dynamic `CreativeWork` and `Article` schema on case study and resource detail pages
- `noindex` on utility pages
- NAP consistency fixed

**Frontend:**
- Lazy loading on 60+ routes, critical-path pages loaded eagerly
- Premium design system with Lenis smooth scroll, page loader, custom cursor, section transitions
- Hero video on desktop with mobile image fallbacks

---

## Enhancement Plan

### A. Admin Panel Enhancements

#### 1. Dashboard Overview — Real-Time KPI Sparklines
The overview page shows KPI cards with static numbers. Add inline sparkline charts (tiny 7-day trend lines) inside each KPI card using Recharts `<Sparkline>`. Pull data from `analytics_snapshots` (already has historical data). This makes the dashboard feel alive and data-rich without clicking into Analytics.

**Files:** `src/pages/Admin.tsx` (overview section), new `src/components/admin/KPISparkline.tsx`

#### 2. Content Studio — Kanban Board View
Add an alternative "Board" view toggle alongside the current tab view. Render content cards in draggable columns (Review → Approved → Scheduled → Published) using `react-dnd` or a simple drag implementation. Each card shows platform icon, thumbnail, title, and scheduled date. This makes the pipeline visual and intuitive.

**Files:** `src/components/admin/ContentStudio.tsx`, new `src/components/admin/ContentKanbanBoard.tsx`

#### 3. Content Studio — Post Preview Mockups
When viewing approved/scheduled content, show a device-frame preview that matches the target platform (iPhone frame for Instagram, browser frame for LinkedIn, etc.). Use CSS-only device frames with the actual content rendered inside. Much more premium than plain text cards.

**Files:** `src/components/admin/ContentStudio.tsx`, new `src/components/admin/SocialPreviewFrame.tsx`

#### 4. Newsletter Builder — Weekly Digest Preview
Add a "Preview Digest" button that calls the `send-weekly-newsletter` function in preview mode (dry run), renders the HTML in an iframe, and lets the admin review before the cron fires. Add a "Send Now" override button.

**Files:** `src/components/admin/NewsletterBuilder.tsx`

#### 5. SEO Dashboard — Keyword Position Chart
Add a line chart showing position history over time for selected keywords (multi-line, one per keyword). Pull from `seo_rankings` table grouped by keyword. Currently rank changes are shown in a table — a visual chart makes trends obvious at a glance.

**Files:** `src/components/admin/SEODashboard.tsx`

#### 6. Global Command Palette
Add a `Cmd+K` command palette (using `cmdk` — already installed) to the admin panel for quick navigation between tabs, triggering actions (generate content, run rank check, send newsletter), and searching leads/content. Premium UX pattern used by Linear, Vercel, etc.

**Files:** New `src/components/admin/CommandPalette.tsx`, `src/components/admin/AdminLayout.tsx`

---

### B. Frontend Website Enhancements

#### 7. Route-Level Code Splitting for Home Page Assets
`Home.tsx` eagerly imports 10+ heavy assets (videos, images, components). Move below-the-fold sections (case studies, testimonials, FAQ) into lazy-loaded sub-components with `React.lazy` + `Suspense`. This cuts initial bundle size significantly and improves LCP.

**Files:** `src/pages/Home.tsx`, new `src/components/home/LazyHomeSections.tsx`

#### 8. Image Optimization — WebP with Fallback
Currently all images are imported as raw `.jpg`/`.png`. Add a reusable `<OptimizedImage>` component that uses `<picture>` with WebP `srcSet` where available, plus `loading="lazy"` and `decoding="async"` on all below-fold images. This alone can cut image payload by 30-50%.

**Files:** New `src/components/OptimizedImage.tsx`, update image references across service pages

#### 9. Font Loading Optimization
Two Google Fonts are loaded via `@import` in CSS (render-blocking). Switch to `<link rel="preload">` in `index.html` with `font-display: swap` to eliminate FOIT (Flash of Invisible Text) and improve FCP.

**Files:** `index.html`, `src/index.css`

#### 10. Navigation — Active State + Micro-Interactions
The main nav lacks active state indicators on the current page/section. Add an animated underline (Framer Motion `layoutId`) that slides between active nav items. Also add subtle hover scale on nav links for tactile feedback.

**Files:** `src/components/Navigation.tsx`

#### 11. Footer — Back-to-Top Smooth Animation
The existing `BackToTop` component exists but should have a more polished entrance animation (slide up from bottom-right with spring physics) and integrate with the Lenis smooth scroll instance for buttery scrolling to top.

**Files:** `src/components/BackToTop.tsx`

---

### Implementation Priority

```text
Priority  | Item                           | Impact
----------|--------------------------------|--------
HIGH      | 6. Command Palette (Cmd+K)     | Admin UX
HIGH      | 1. KPI Sparklines              | Dashboard feel
HIGH      | 9. Font Loading                | FCP/performance
HIGH      | 7. Home lazy sections          | LCP/bundle size
MEDIUM    | 5. Keyword Position Chart       | SEO Dashboard
MEDIUM    | 2. Kanban Board View           | Content Studio
MEDIUM    | 8. OptimizedImage component    | Performance
MEDIUM    | 10. Nav Active States          | Frontend polish
LOW       | 3. Social Preview Frames       | Content Studio
LOW       | 4. Newsletter Digest Preview   | Newsletter
LOW       | 11. Back-to-Top polish         | Minor UX
```

### Files Created
- `src/components/admin/KPISparkline.tsx`
- `src/components/admin/ContentKanbanBoard.tsx`
- `src/components/admin/SocialPreviewFrame.tsx`
- `src/components/admin/CommandPalette.tsx`
- `src/components/home/LazyHomeSections.tsx`
- `src/components/OptimizedImage.tsx`

### Files Modified
- `src/pages/Admin.tsx`
- `src/components/admin/AdminLayout.tsx`
- `src/components/admin/ContentStudio.tsx`
- `src/components/admin/NewsletterBuilder.tsx`
- `src/components/admin/SEODashboard.tsx`
- `src/pages/Home.tsx`
- `src/components/Navigation.tsx`
- `src/components/BackToTop.tsx`
- `src/index.css`
- `index.html`

### No new dependencies needed
`cmdk` is already installed. Recharts is already installed. No new packages required.

