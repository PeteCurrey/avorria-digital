

## Admin Panel Enhancement — Content Automation, Image Generation, Approval Flow, Mock Data Removal & Audit Data Capture

This is a large, multi-faceted request. Here is a prioritised plan broken into workstreams.

---

### Workstream 1: Fix Image Generation

**Problem:** The `generate-image` edge function uses model `google/gemini-2.5-flash-image-preview` which is not in the supported models list. It should use `google/gemini-2.5-flash-image` (the correct model name from the Lovable AI docs).

**Fix:**
- Update `supabase/functions/generate-image/index.ts`: change model to `google/gemini-2.5-flash-image`
- Always upload generated images to Supabase storage (bucket `case-study-images`) and return a public URL instead of a large base64 string
- Improve the prompt to be more specific and neutral to avoid safety filter rejections

---

### Workstream 2: Fix Approved Content Disappearing

**Problem:** When content is approved via `handleApproveDB`, it sets `status: "approved"` (or `"scheduled"` if a date is provided). But the Review tab only queries `status = "review"`, and the Scheduled tab only queries content with `status = "scheduled"` AND a non-null `scheduled_for`. Approved content with no schedule date falls into a void — no tab displays it.

**Fix:**
- Add a new **"Approved"** tab to the Content Studio showing all content with `status = "approved"` — this is the content ready to be published/copied
- Add a `useApprovedContent` hook in `useAIGeneratedContent.ts`
- Update the Tabs in `ContentStudio.tsx` from 4 tabs to 5: Generate | Review | Approved | Scheduled | Automation
- On the Approved tab, show the content with actions: Copy, Schedule (set a date), Mark Published, Delete
- Add a "Mark as Published" action that sets `status = "published"` and `published_at = now()`

---

### Workstream 3: Create `audit_reports` Table for Audit Data Capture

**Problem:** The `audit_reports` table does not exist in the database. The `useAuditReports` hook tries to query it via REST API fallback, which silently fails. Audit form submissions save leads but don't persist audit results.

**Fix:**
- Create an `audit_reports` table via migration with columns: `id`, `lead_id` (nullable uuid), `email`, `name`, `company_name`, `website_url`, `overall_score` (int), `report_url` (text), `report_file_name` (text), `sections` (jsonb), `quick_wins` (jsonb), `roadmap` (jsonb), `email_sent` (boolean default false), `status` (text default 'completed'), `created_at`, `updated_at`
- Add RLS: anyone can INSERT (public audit form), staff can SELECT/UPDATE/DELETE
- Update the `generate-audit-pdf` edge function to save audit results to this table after generation
- The `useAuditReports` hook can then use normal Supabase client queries instead of raw REST calls

---

### Workstream 4: Remove Mock Data from Analytics & SEO Dashboards

**Problem:** `AnalyticsCharts.tsx` and `SEODashboard.tsx` contain hardcoded mock data arrays (traffic, funnel, source, device, keyword rankings, backlinks, Core Web Vitals, schema validation). The overview KPI badges also have hardcoded percentages like "+15%", "2.4% rate", "+8%".

**Fix:**
- **AnalyticsCharts.tsx**: Replace mock arrays with empty-state UI when no real data exists. Show a clear "No analytics data yet — connect Google Analytics to see real metrics" message with a link to the Integrations tab. When real data exists (from `analytics_snapshots`), render the charts.
- **SEODashboard.tsx**: Replace mock keyword rankings with data from the `seo_rankings` table. Replace mock backlinks/Core Web Vitals with empty states or data from Search Console integration. Show "Connect Search Console for live data" prompts where appropriate.
- **Admin.tsx overview**: Remove hardcoded "+15%", "2.4% rate", "+8%" badges. Either compute real deltas from analytics snapshots or hide the badge when no comparison data exists.

---

### Workstream 5: Social Account Linking & Automation

**Problem:** Content automation recipes exist but have no actual publishing pipeline. There's no way to connect social accounts or auto-post approved content.

**Fix (Phase 1 — UI Foundation):**
- Add a **Social Accounts** section to the Integrations panel or a new sub-tab under Content Studio > Automation
- Allow users to register API credentials for Twitter/X, LinkedIn, Facebook, Instagram (stored as Supabase secrets)
- Add a "Publish Now" button on approved content that calls a new `publish-content` edge function
- The edge function will post to the relevant platform API based on the content's `platform` field
- Start with Twitter/X integration (using the existing Twitter API pattern from the docs) since it's the most straightforward

**Fix (Phase 2 — Auto-publishing):**
- Extend the automation recipes with an `auto_publish` boolean flag
- When content is auto-generated and auto_publish is enabled, it goes directly to "scheduled" status
- A cron job (pg_cron) periodically checks for scheduled content past its `scheduled_for` date and calls the `publish-content` function

---

### Workstream 6: Contact Form → Leads Pipeline Verification

**Problem:** The contact form saves leads to the `leads` table, but the RLS policy allows anonymous inserts (`true` for INSERT). This should already work. Need to verify the contact form on the Contact page actually calls the same insert.

**Fix:**
- Verify `src/pages/Contact.tsx` inserts into the `leads` table with source = "contact"
- If not, wire it up properly
- Ensure the notification trigger (`notify_on_new_lead`) fires correctly

---

### Summary of Files Modified

| File | Change |
|------|--------|
| `supabase/functions/generate-image/index.ts` | Fix model name, improve prompt |
| `src/hooks/useAIGeneratedContent.ts` | Add `useApprovedContent` hook |
| `src/components/admin/ContentStudio.tsx` | Add Approved tab, publish actions |
| `supabase/functions/generate-audit-pdf/index.ts` | Save results to `audit_reports` table |
| `src/hooks/useAuditReports.ts` | Use proper Supabase client queries |
| `src/components/admin/AnalyticsCharts.tsx` | Replace mock data with empty states + real data |
| `src/components/admin/SEODashboard.tsx` | Replace mock data with real DB queries + empty states |
| `src/pages/Admin.tsx` | Remove hardcoded KPI percentages |
| **New migration** | Create `audit_reports` table |
| **New edge function** | `publish-content` for social posting (Phase 1: Twitter) |

### Implementation Order
1. Fix image generation (quick win)
2. Create `audit_reports` table + wire up audit data capture
3. Fix approved content flow (add Approved tab)
4. Remove mock data from Analytics/SEO dashboards
5. Clean up overview KPI hardcoded values
6. Social account linking foundation

