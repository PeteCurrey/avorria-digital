

## Client Portal Admin Control and Visual Enhancement

This plan upgrades the admin-to-client-portal pipeline to give you full control over what each client sees, with distinct visual experiences for web design clients (before/after sliders) and SEO clients (interactive analytics dashboards).

### Current State

The foundation is already solid:
- Admin can create clients, link projects, upload paired before/after screenshots, and manage analytics connections
- Client portal shows projects with BeforeAfterSliderMulti, DevicePreview, and ProjectShowcase
- Client analytics page exists but uses hardcoded mock data instead of real data from `client_analytics_connections`

### What Needs to Change

#### 1. Client Overview: Service-Aware Dashboard

**File: `src/pages/client/ClientOverview.tsx`**

The overview currently shows the same layout for every client. It needs to adapt based on the client's service type.

- Detect the client's project types (website vs SEO vs ongoing) from `useMyProjects()`
- For **web design clients**: Show a prominent "Design Progress" card with the latest before/after pair thumbnail, linking to the full project detail page
- For **SEO clients**: Show an inline analytics summary widget with animated counters (sessions, rankings, conversions) pulled from the `analytics_snapshots` table
- For **both**: Show the appropriate quick-link cards (hide SEO Intelligence for pure web design clients, hide Design Progress for pure SEO clients)

#### 2. Client Analytics: Real Data from Admin Connections

**File: `src/pages/client/ClientAnalytics.tsx`**

Replace all mock data with real queries:
- Fetch the client's `client_analytics_connections` record to get their GA4 property ID and GSC property
- Query `analytics_snapshots` filtered by the client's connected website ID
- Show an elegant empty state when no analytics connection exists: "Your analytics dashboard will activate once your account manager connects your Google Analytics"
- Keep the existing chart components (AreaChart, etc.) but wire them to real data
- Add animated number transitions using framer-motion for KPI cards
- Add a "Last updated" timestamp from `last_synced_at`

#### 3. Admin: Client Portal Preview from Client Projects Tab

**File: `src/components/admin/ClientProjectsManager.tsx`**

Add a "Preview Portal" button on each project row that:
- Navigates to `/client/projects/{id}` while setting the impersonated client context
- Lets you see exactly what the client will see for that specific project

#### 4. Admin: Enhanced Asset Manager with Inline Preview

**File: `src/components/admin/AssetManager.tsx`**

The paired screenshots grid already exists. Enhance it:
- Add an inline before/after slider preview directly in the admin panel so you can verify how the slider looks before the client sees it
- When viewing paired assets, show a "Preview as Client" button that renders the `BeforeAfterSliderMulti` component inline
- Add drag-and-drop reordering for asset position within a project

#### 5. Client Project Detail: Enhanced Visual Experience

**File: `src/pages/client/ClientProjectDetail.tsx`**

Make the project detail page more visually immersive:
- Add animated entry transitions for the before/after slider section using framer-motion (fade-up with stagger)
- Add a "Design Rationale" section that reads from the asset's `metadata` JSON field -- admin can store "why we did this" notes that display as elegant annotation cards beneath each before/after pair
- Add a subtle gradient header banner that uses the project status colour
- For SEO projects: replace the Design Showcase tab with an "SEO Performance" tab showing keyword rankings and traffic data from `analytics_snapshots`

#### 6. New: Client SEO Dashboard Tab

**New file: `src/components/client/ClientSEODashboard.tsx`**

A dedicated interactive analytics component for SEO clients, embedded in the project detail page:
- Animated KPI cards with CountUp effects (Organic Traffic, Keywords Ranked, Domain Authority, Conversions)
- Interactive line/area charts for traffic trends (Recharts, already installed)
- Keyword rankings table with position change indicators (green up arrows, red down arrows)
- Top pages performance list with sparkline mini-charts
- All data sourced from `analytics_snapshots` and `keyword_tracking` tables

#### 7. Admin: Manage Client Portal Sections

**File: `src/components/admin/ClientProjectsManager.tsx`**

Add a "Portal Config" section to the project edit dialog:
- Toggle switches for which sections are visible to the client: Design Showcase, SEO Performance, Documents, Wireframes
- A "Featured Image" URL field that populates the WelcomeHero card on the client overview
- These get stored in a new `portal_config` JSONB column on `client_projects`

### Database Changes

**Migration: Add `portal_config` to `client_projects`**

```sql
ALTER TABLE public.client_projects 
ADD COLUMN portal_config jsonb DEFAULT '{
  "show_design_showcase": true,
  "show_seo_performance": false,
  "show_documents": true,
  "show_wireframes": true,
  "featured_image_url": null
}'::jsonb;
```

No new tables needed -- all existing tables (`client_projects`, `project_assets`, `analytics_snapshots`, `client_analytics_connections`, `keyword_tracking`) already support the data model.

### Files Changed Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/client/ClientOverview.tsx` | Edit | Service-aware dashboard layout |
| `src/pages/client/ClientAnalytics.tsx` | Edit | Replace mock data with real analytics |
| `src/pages/client/ClientProjectDetail.tsx` | Edit | Visual enhancements, SEO tab, design rationale |
| `src/components/client/ClientSEODashboard.tsx` | Create | Interactive SEO analytics component |
| `src/components/admin/ClientProjectsManager.tsx` | Edit | Portal preview button, portal config toggles |
| `src/components/admin/AssetManager.tsx` | Edit | Inline before/after preview |
| `src/components/client/WelcomeHero.tsx` | Edit | Support featured image from portal_config |
| Database migration | Create | Add portal_config column |

### Technical Notes

- All analytics queries filter by the authenticated user's ID via RLS -- no data leakage between clients
- The `portal_config` JSONB approach avoids schema proliferation and is easily extensible
- Existing `BeforeAfterSliderMulti` and Recharts components are reused, no new dependencies
- CountUp animations use framer-motion's `useInView` + `animate` for performant number transitions
- The admin "View as Client" impersonation flow already works via `setImpersonatedClient` in useAuth

