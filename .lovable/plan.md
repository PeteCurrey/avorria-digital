
# Client Portal with Full Project Management System

## Overview

Build a comprehensive client login portal that provides clients with full visibility into their web design projects, SEO work, and account management. The system will be managed from `/admin` and accessible to clients at `/client`.

## What This Delivers

**For Clients:**
- View before/after screenshots of their website with interactive sliders
- Access live site links and staging URLs
- Review SEO proposals and strategic roadmaps
- View technical drawings and wireframes
- Review pricing proposals and accept/decline
- Manage invoices and track payments
- View real-time analytics (for launched websites)

**For Admin (Avorria Team):**
- Centralized client management dashboard
- Upload and manage client deliverables
- Create and send proposals/invoices
- Track project status and milestones
- Connect analytics data feeds per client

---

## Technical Implementation

### Phase 1: Database Schema Extensions

Create new tables to support the client portal features:

```text
+------------------+     +-------------------+     +------------------+
|     clients      |---->| client_projects   |---->| project_assets   |
+------------------+     +-------------------+     +------------------+
        |                        |                         |
        |                        v                         |
        |                +-------------------+             |
        +--------------->|   invoices        |<------------+
                         +-------------------+
                                 |
                                 v
                         +-------------------+
                         |    payments       |
                         +-------------------+
```

**New Tables:**

1. **client_projects** - Links clients to their web/SEO projects
   - `id`, `client_id`, `name`, `type` (website, seo, ongoing), `status`, `live_url`, `staging_url`, `created_at`, `updated_at`

2. **project_assets** - Stores screenshots, documents, technical drawings
   - `id`, `project_id`, `asset_type` (screenshot_before, screenshot_after, wireframe, technical_drawing, seo_proposal, roadmap, pricing_proposal), `title`, `description`, `file_url`, `position`, `created_at`

3. **invoices** - Client invoices
   - `id`, `client_id`, `project_id`, `invoice_number`, `amount`, `currency`, `status` (draft, sent, paid, overdue), `due_date`, `paid_at`, `line_items` (jsonb), `notes`, `pdf_url`, `created_at`

4. **payments** - Payment records
   - `id`, `invoice_id`, `amount`, `payment_method`, `transaction_id`, `paid_at`, `notes`

5. **client_analytics_connections** - Per-client analytics config
   - `id`, `client_id`, `project_id`, `ga4_property_id`, `gsc_property`, `is_active`, `last_synced_at`

**Storage Buckets:**
- `client-assets` - For screenshots, wireframes, proposals (private bucket with RLS)

### Phase 2: Client Portal Pages

Expand the existing `/client` routes with new pages:

| Route | Purpose |
|-------|---------|
| `/client` | Overview dashboard (existing, enhanced) |
| `/client/projects` | List of all client projects |
| `/client/projects/:id` | Project detail with before/after sliders |
| `/client/proposals` | SEO proposals & roadmaps |
| `/client/documents` | Technical drawings & documentation |
| `/client/billing` | Invoices & payment management |
| `/client/analytics` | Live analytics dashboard (for built sites) |

**Key Components:**

1. **ClientProjectsPage** - Grid of project cards showing status, live links
2. **ClientProjectDetail** - 
   - Hero with project info and status badge
   - Before/After slider using existing `BeforeAfterSliderMulti` component
   - Quick links section (staging, live site)
   - Timeline of key milestones
3. **ClientProposalsPage** - 
   - SEO proposals with PDF viewer
   - Interactive roadmap timeline
   - Accept/decline CTAs
4. **ClientDocumentsPage** - 
   - Technical drawings gallery
   - Wireframes with zoom capability
5. **ClientBillingPage** - 
   - Invoice list with status badges
   - Payment history
   - Outstanding balance summary
   - "Pay Now" integration (future Stripe integration)
6. **ClientAnalyticsPage** - 
   - Live GA4 data (using existing widgets)
   - Search Console data
   - Performance metrics

### Phase 3: Admin Management Interface

Extend `/admin` with new tabs for client portal management:

**New Admin Tabs:**

1. **Client Portal** (`/admin?tab=client-portal`)
   - Client selector dropdown
   - Per-client management dashboard
   - Quick actions: Add project, Upload asset, Create invoice

2. **Projects Manager** (`/admin?tab=projects-manager`)
   - CRUD for client projects
   - Upload before/after screenshots
   - Manage staging/live URLs
   - Set project milestones

3. **Asset Manager** (`/admin?tab=assets`)
   - Upload wireframes, technical drawings
   - Organize SEO proposals and roadmaps
   - Drag-and-drop ordering

4. **Invoicing** (`/admin?tab=invoicing`)
   - Create/edit invoices
   - Track payment status
   - Generate invoice PDFs
   - Send invoice emails

5. **Analytics Connections** (`/admin?tab=analytics-connections`)
   - Connect GA4/GSC per client
   - Test connections
   - View sync status

### Phase 4: Data Hooks & API Layer

New React Query hooks:

```text
src/hooks/
├── useClientProjects.ts      - CRUD for projects
├── useProjectAssets.ts       - Asset management
├── useInvoices.ts           - Invoice operations
├── usePayments.ts           - Payment tracking
├── useClientAnalytics.ts    - Per-client analytics
```

### Phase 5: Security & RLS

**Row Level Security Policies:**

- Clients can only view their own projects, assets, invoices
- Staff (strategist/admin) can view and manage all client data
- Invoices linked to user_id for proper access control

**Storage Policies:**
- Private bucket with authenticated access
- Clients can only download their own assets

---

## UI/UX Design

**Client Portal Navigation (Updated):**
```text
Overview
├── Projects          [NEW]
│   └── Project Detail
├── Proposals         [NEW]
├── Documents         [NEW]
├── Billing           [NEW]
├── Analytics         [NEW - for live sites]
├── SEO Intelligence  [existing]
├── Audits            [existing]
├── Website Health    [existing]
└── Resources         [existing]
```

**Design System Adherence:**
- Premium minimal aesthetic
- Card-based layouts with soft shadows
- Gradient accents on key CTAs
- Before/after sliders with smooth animations
- Status badges with color coding

---

## Implementation Order

1. **Database migrations** (4 new tables + storage bucket)
2. **Hooks and API layer** (CRUD operations)
3. **Admin UI** (management interface)
4. **Client portal pages** (view-only for clients)
5. **Analytics integration** (per-client connections)
6. **Invoice/payment system** (Stripe integration optional)

---

## Files to Create/Modify

**New Files:**
- `src/pages/client/ClientProjects.tsx`
- `src/pages/client/ClientProjectDetail.tsx`
- `src/pages/client/ClientProposals.tsx`
- `src/pages/client/ClientDocuments.tsx`
- `src/pages/client/ClientBilling.tsx`
- `src/pages/client/ClientAnalytics.tsx`
- `src/components/admin/ClientPortalManager.tsx`
- `src/components/admin/ProjectsManager.tsx`
- `src/components/admin/AssetManager.tsx`
- `src/components/admin/InvoiceManager.tsx`
- `src/components/admin/AnalyticsConnectionsTab.tsx`
- `src/hooks/useClientProjects.ts`
- `src/hooks/useProjectAssets.ts`
- `src/hooks/useInvoices.ts`
- `src/hooks/usePayments.ts`
- `src/hooks/useClientAnalytics.ts`

**Modified Files:**
- `src/components/AnimatedRoutes.tsx` - Add new routes
- `src/components/app/AppShell.tsx` - Update client navigation
- `src/components/admin/AdminSidebar.tsx` - Add new tabs
- `src/pages/Admin.tsx` - Add new tab content

---

## Dependencies

No new npm packages required - uses existing:
- Framer Motion for animations
- Recharts for analytics charts
- Existing UI components (BeforeAfterSlider, Cards, Tables)
- Supabase for storage and database
