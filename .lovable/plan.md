

## Plan: Admin Panel Enhancements — Internal Power Tool

This is a large initiative spanning 5 workstreams. Given the scope, I recommend tackling it in **2 phases** — Phase 1 delivers the highest-impact improvements first.

---

### Phase 1 (This Implementation)

#### 1. Content Studio UX Overhaul
**Problem:** Content flow is unclear — users don't know where content goes after approval, publishing status is ambiguous, and the social account connection status is vague.

**Changes:**
- Add a **visual pipeline strip** at the top of Content Studio showing the flow: Generate → Review → Approved → Scheduled → Published, with counts at each stage and animated transitions when content moves
- On each content card in Review/Approved tabs, add clear **"Next step" indicators** (e.g., "Approve → moves to Approved", "Schedule → set date & time", "Publish Now → sends to connected accounts")
- Upgrade the social accounts status bar to show **real connection status** by reading from `seo_integrations` table (currently hardcoded as disconnected) — show green/red dots per platform
- Add a **"Published" tab** (6th tab) so users can see what's already been sent out, pulling from `status = 'published'` in `ai_generated_content`
- Add a **"Publish to Social" button** on approved content cards that calls the existing `publish-content` pattern (or creates a new `publish-content` edge function if missing) to post to connected Twitter/LinkedIn/Instagram accounts

#### 2. Image Generation Quality Upgrade
**Problem:** Images may not be high enough quality.

**Changes:**
- Switch the `generate-image` edge function from `google/gemini-2.5-flash-image` to **`google/gemini-3-pro-image-preview`** (higher quality model)
- Enhance the default prompt template to be more specific: include brand colors, marketing context, aspect ratio guidance for each platform (square for Instagram, landscape for LinkedIn/Twitter)
- Add **platform-aware aspect ratio** hints in the prompt (e.g., Instagram → "1:1 square format", LinkedIn → "1.91:1 landscape")

#### 3. Automated Weekly Newsletter
**Problem:** Newsletters are manual. Need weekly automation.

**Changes:**
- Create a new edge function `send-weekly-newsletter` that:
  1. Queries `ai_generated_content` for content published in the last 7 days
  2. Queries `resources` for recently published articles
  3. Uses AI (Lovable AI) to compose a weekly digest newsletter HTML
  4. Sends via the existing `send-newsletter` function to all active `newsletter_subscribers`
- Create a `pg_cron` job to trigger this function weekly (every Monday at 9am)
- Add a "Weekly Digest" toggle and preview in the Newsletter Builder UI

#### 4. SEO Dashboard — Real Rank Tracking with Notifications
**Problem:** SEO Dashboard only shows data if manually populated. No automated rank tracking or change notifications.

**Changes:**
- Create a `track-seo-rankings` edge function that:
  1. Reads target keywords from `seo_rankings` table (or a new `seo_target_keywords` table)
  2. Uses SerpAPI (if configured) or AI-based estimation to check current positions
  3. Compares with previous positions and stores new records
  4. If any keyword moves ≥3 positions up or down, creates a notification in the `notifications` table
- Create a database migration for `seo_target_keywords` table (keyword, target_url, is_active, created_at)
- Add a **"Add Keywords"** form to the SEO Dashboard so users can input target keywords to track
- Add a **"Rank Changes"** tab showing position history with sparkline charts (like Semrush)
- Set up a `pg_cron` job to run `track-seo-rankings` daily

#### 5. Remove All Mock Data Fallbacks
**Problem:** Several edge functions (serpapi, google-search-console) return mock data when not configured.

**Changes:**
- Update `serpapi/index.ts` to return `{ configured: false, data: null }` instead of mock data when API key is missing
- Update SEO Dashboard to show a clear "Connect SerpAPI in Integrations" CTA instead of fake data
- Audit `google-search-console` and `google-analytics` functions for similar mock fallbacks and replace with honest empty states

---

### Phase 2 (Follow-up Implementation)

These are important but depend on Phase 1 being solid:

- **Automated Competitor Analysis**: `pg_cron` job running `competitor-analysis` weekly against configured competitor URLs, storing results in a new `competitor_snapshots` table, with a comparison dashboard
- **Social Publishing Edge Function**: Full `publish-content` edge function that posts to Twitter/LinkedIn/Instagram APIs using stored credentials from `seo_integrations`
- **Content Calendar Integration**: Auto-populate the Content Calendar from scheduled content in `ai_generated_content`
- **SEO Auto-Optimization**: AI-powered suggestions for internal linking, meta description improvements, and content gap analysis based on rank tracking data
- **Analytics Dashboard Enhancement**: Pull real Google Analytics data into charts (already has the edge function, needs better UI integration)

---

### Technical Details

**New Database Tables:**
```sql
-- Target keywords for automated tracking
CREATE TABLE public.seo_target_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  target_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.seo_target_keywords ENABLE ROW LEVEL SECURITY;
-- Only authenticated staff can manage
CREATE POLICY "Staff can manage target keywords" ON public.seo_target_keywords
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'strategist'));
```

**New Edge Functions:**
- `supabase/functions/send-weekly-newsletter/index.ts`
- `supabase/functions/track-seo-rankings/index.ts`

**Modified Files:**
- `src/components/admin/ContentStudio.tsx` — Pipeline strip, Published tab, social status, publish button
- `src/components/admin/SEODashboard.tsx` — Add Keywords form, Rank Changes tab, notifications
- `supabase/functions/generate-image/index.ts` — Upgrade model, platform-aware prompts
- `supabase/functions/serpapi/index.ts` — Remove mock data
- `src/components/admin/NewsletterBuilder.tsx` — Weekly digest toggle/preview
- `src/components/admin/AdminSidebar.tsx` — No changes needed (structure is good)

**Files to create:**
- `supabase/functions/send-weekly-newsletter/index.ts`
- `supabase/functions/track-seo-rankings/index.ts`

This Phase 1 implementation transforms the admin panel from a content management tool into an active, automated SEO and marketing operations centre.

