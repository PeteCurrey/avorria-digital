
## Enhance Paid Media and SEO Service Pages

### Overview
Both service pages need the same treatment: cinematic hero with real imagery, an introduction section explaining the service, button contrast fixes, and richer, more thoughtful content throughout. The SEO page is already ahead (has a background image hero, more sections) but still needs an intro section and content enrichment. The Paid Media page needs much more work.

---

### 1. Paid Media Page (`src/pages/PaidMedia.tsx`) — Major Overhaul

**Hero Section:**
- Replace the current `HeroGradient`-based hero with the `HeroBand` component (same as SEO page uses)
- Use the existing `service-paid-media.jpg` asset as the parallax background image
- Keep the headline and copy but improve the subheadline badge
- Fix the secondary CTA button: change `variant="outline"` to `variant="outline-dark"`

**New Introduction Section (below hero):**
- Two-column layout matching the Reporting page pattern
- Left column: heading "What paid media should actually do for your business" with 2-3 paragraphs explaining the service definition — what it is, why most businesses get it wrong, and what Avorria does differently
- Right column: 4 icon-led feature highlights (e.g. "Offer-led campaigns, not keyword spam", "Full-funnel tracking from click to close", "Weekly optimisation based on pipeline data", "Unified strategy across Google, Meta and LinkedIn")
- Wrapped in `SectionReveal` with staggered `motion` entrance animations

**Pain Points Section:**
- Keep the content but enhance with `SectionReveal` animation
- Add more descriptive intro paragraph above the pain point list

**How We Approach Paid Media Section:**
- Keep the 4-card grid but add an `OpinionatedQuote` pull-quote block after it (e.g. a strong opinion about vanity metrics)

**New "What You Get" Section:**
- Add a deliverables section (similar to SEO page's "What you see as a client") listing: campaign strategy document, weekly performance snapshots, monthly reviews with pipeline attribution, quarterly budget recommendations, access to the live reporting dashboard

**New "Process Timeline" Section:**
- Add a phased timeline (matching SEO page pattern): Month 1 (Audit and setup), Months 2-3 (Launch and test), Months 4-6 (Optimise and scale), Month 6+ (Expand and compound)

**Platforms Section:**
- Keep but enrich with more descriptive content per platform
- Add a brief intro paragraph

**New FAQ Section:**
- Add 4-5 FAQs with `Accordion` component (matching SEO page pattern)
- Add `FAQSchema` for SEO
- Questions like: "How quickly will we see results?", "What's your minimum ad spend?", "Do you handle creative?", "How do you report on performance?"

**CTA Section:**
- Fix secondary button: `variant="outline"` to `variant="outline-dark"`

**SEO Enhancements:**
- Add `ServiceSchema`, `FAQSchema`, `BreadcrumbSchema` components (matching SEO page)
- Replace raw `Helmet` with the schema components plus `Helmet` for remaining meta

---

### 2. SEO Services Page (`src/pages/SEOServices.tsx`) — Introduction Section + Content Enrichment

**New Introduction Section (below hero, before pain points):**
- Same two-column layout as Reporting and Paid Media pages
- Left column: heading "What SEO actually means for your business" with 2-3 paragraphs — plain-English explanation of SEO as a revenue channel, not a technical black box
- Right column: 4 icon-led highlights (e.g. "Commercial keyword targeting", "Technical foundations that compound", "Content that ranks and converts", "Transparent reporting tied to pipeline")
- Wrapped in `SectionReveal` with staggered `motion` entrance

**Content Enrichment:**
- Add an `OpinionatedQuote` pull-quote after the "What's Included" section
- Enrich the case study teaser cards with slightly more descriptive content

**No button fixes needed** — already uses `variant="outline-dark"` throughout (fixed in previous session)

---

### Visual Rhythm

**Paid Media (top to bottom):**
1. Hero — cinematic with `service-paid-media.jpg` parallax background
2. Introduction — light background, two-column explainer
3. Pain Points — gradient background, enhanced list
4. How We Approach — dark background, 4-card grid + pull-quote
5. What You Get — gradient background, deliverables checklist
6. Process Timeline — mesh background, phased timeline
7. Platforms — dark background, enriched 3-column cards
8. FAQ — mesh background, accordion with schema
9. CTA — gradient background, fixed buttons

**SEO Services (top to bottom):**
1. Hero (existing) — with `service-seo.jpg`
2. **Introduction (NEW)** — light background, two-column explainer
3. Pain Points (existing)
4. What's Included (existing) + **pull-quote (NEW)**
5. Process Timeline (existing)
6. Deliverables (existing)
7. SEO by Industry (existing)
8. Case Studies (existing, enriched)
9. SEO by Location (existing)
10. FAQ (existing)
11. CTA (existing)

---

### Files Modified
- `src/pages/PaidMedia.tsx` — major rewrite: HeroBand hero, intro section, deliverables, timeline, FAQ, button fixes, SEO schema components
- `src/pages/SEOServices.tsx` — add intro section below hero, add OpinionatedQuote, minor content enrichment

### New Imports
- **PaidMedia.tsx**: `HeroBand`, `SectionBand` (already imported), `SectionReveal`, `motion`, `OpinionatedQuote`, `Accordion` components, `ServiceSchema`, `FAQSchema`, `BreadcrumbSchema`, `CheckCircle2`, `Globe`, `FileText`, `Link2`, `Clock` icons, `service-paid-media.jpg` asset
- **SEOServices.tsx**: `SectionReveal`, `motion`, `Globe`, `FileText`, `Link2`, `Clock` icons

### No new dependencies needed
