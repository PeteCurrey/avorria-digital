
## Enhance Resources Page, Detail Pages, and Admin Resources Management

### Problem Summary
1. The Resources index page (`/resources`) is visually plain compared to the Home page
2. Category filters (SEO, Web Design, Analytics) don't work -- they're static buttons with no state
3. Only 3 resources exist (all pillar guides), so filtering shows nothing for most categories
4. Resource detail pages are walls of text with no visual breaks
5. No dedicated "Resources" section in admin to manage/generate new resources or trigger newsletter sends

---

### Part 1: Add More Resources Content

**File: `src/data/resources.ts`**

Add 6-8 new non-pillar resources across all categories so filtering actually shows results:

- **SEO**: "Local SEO: How to Dominate Your City" (targeting local service businesses)
- **SEO**: "Technical SEO Checklist for Non-Developers" (quick-reference guide)
- **Web Design**: "Landing Page Anatomy: What Goes Where and Why" (conversion-focused)
- **Web Design**: "Website Redesign vs Optimisation: A Decision Framework"
- **Paid Media**: "Google Ads for Service Businesses: A No-Fluff Starter Guide"
- **Paid Media**: "Meta Ads vs Google Ads: Where to Spend First"
- **Analytics**: "GA4 Setup Guide: What to Track From Day One"
- **Strategy**: "How to Brief a Marketing Agency (Without Wasting Everyone's Time)"

Each will have 800-1500 word content with proper markdown structure, making them shorter "field notes" compared to the pillar guides.

---

### Part 2: Enhance Resources Index Page

**File: `src/pages/Resources.tsx`**

Visual and functional upgrades:

- **Working category filter**: Add `useState` for active category, filter the `allResources` list, highlight the active button with accent styling
- **Hero enhancement**: Add `GradientMesh` overlay and `FloatingElements` for consistency with Home/About pages
- **Featured pillar section**: Add gradient border cards with hover animations (beam-border effect) matching the Home page style
- **Resource cards**: Add a coloured left border per category (SEO = green, Web Design = blue, Analytics = purple, Paid Media = orange, Strategy = pink), hover lift animation
- **Reading count indicator**: Show total resource count per category in the filter buttons
- **Newsletter signup strip**: Add an inline email capture between the pillar and all-resources sections ("Get new playbooks in your inbox")

---

### Part 3: Enhance Resource Detail Page

**File: `src/pages/ResourceDetail.tsx`**

Make the reading experience visually engaging:

- **Hero upgrade**: Full-width gradient banner behind the title area with category-specific colour theming
- **Progress bar**: Reading progress indicator at the top of the page (scroll-based)
- **Enhanced markdown rendering**: Custom components for ReactMarkdown to render:
  - H2 headings with a subtle left accent border
  - Blockquotes with gradient background (using the OpinionatedQuote style)
  - Lists with custom checkmark/bullet icons
  - Code blocks with proper styling
- **Section dividers**: Subtle gradient line between major sections
- **Floating share buttons**: Sticky sidebar share buttons (copy link, LinkedIn, Twitter/X)
- **Estimated reading progress**: "3 of 18 min read" indicator that updates as user scrolls
- **Animated entry**: Staggered fade-in for content sections using framer-motion

---

### Part 4: Admin Resources Management Tab

**New file: `src/components/admin/ResourcesManager.tsx`**

A dedicated admin tab for managing resources:

- **Resources list**: Table showing all resources with title, category, status (published/draft), reading time, published date
- **AI Generate button**: Triggers AI content generation via the existing `generate-content` edge function, pre-configured with the Avorria voice and tone guidelines from memory
- **Edit dialog**: Inline editing of resource title, summary, content (markdown textarea), category, and meta fields
- **Publish/unpublish toggle**: Control visibility
- **Newsletter integration**: "Send as Newsletter" button that pre-populates the existing Newsletter Builder with the resource content (hero section with resource title, text section with summary, CTA to read full article)

**File: `src/pages/Admin.tsx`** -- Add the new "Resources" tab to the admin page routing

**File: `src/components/admin/AdminSidebar.tsx`** -- Add "Resources" nav item under "Content and Marketing" section with a BookOpen icon

---

### Part 5: Database for Managed Resources

**Migration**: Create a `resources` table to store admin-managed resources (replacing or supplementing the static data file):

```sql
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'SEO',
  reading_time integer NOT NULL DEFAULT 5,
  service_relation text,
  industry_relation text,
  is_pillar boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  target_keyword text,
  meta_title text,
  meta_description text,
  published_date date DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

RLS policies:
- Anyone can SELECT where `is_published = true`
- Staff (admin/strategist) can INSERT, UPDATE, DELETE, and SELECT all

**File: `src/hooks/useResources.ts`** -- New hook for CRUD operations on the resources table

**File: `src/data/resources.ts`** -- Keep as seed data; the Resources page will merge static data with database resources, prioritising database versions when slugs match

---

### Part 6: Newsletter Resource Email

**File: `src/components/admin/ResourcesManager.tsx`** (within the same component)

"Send as Newsletter" workflow:
1. Click button on a published resource
2. Auto-generates a newsletter payload with: hero image (gradient placeholder), resource title as headline, summary as body text, "Read the full guide" CTA linking to `/resources/{slug}`
3. Opens the existing Newsletter Builder pre-filled with this content
4. Admin can edit/preview and send using the existing `send-newsletter` edge function

---

### Files Changed Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/data/resources.ts` | Edit | Add 6-8 new resources across all categories |
| `src/pages/Resources.tsx` | Edit | Visual enhancement, working filters, newsletter strip |
| `src/pages/ResourceDetail.tsx` | Edit | Reading experience upgrade with progress bar, custom markdown |
| `src/components/admin/ResourcesManager.tsx` | Create | Admin resources management with AI generation |
| `src/hooks/useResources.ts` | Create | Database CRUD hook for resources |
| `src/pages/Admin.tsx` | Edit | Add resources tab |
| `src/components/admin/AdminSidebar.tsx` | Edit | Add Resources nav item |
| Database migration | Create | resources table with RLS |

### Technical Notes

- The AI content generation will use the existing `generate-content` edge function which already connects to the AI gateway
- Category filter uses simple React state -- no URL params needed since it's a single-page filter
- The resources table uses the same field structure as the existing TypeScript `Resource` type for seamless compatibility
- Reading progress bar uses `window.scrollY` with a throttled scroll listener
- Custom ReactMarkdown components use the `components` prop to override default rendering of h2, blockquote, ul, etc.
