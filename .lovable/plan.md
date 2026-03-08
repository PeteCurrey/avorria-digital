

## Plan: Comprehensive SEO Audit & Implementation

### Current State Summary
After reviewing the entire codebase, here's what's already in place and what's missing:

**Already Done Well:**
- `index.html` has Organization + WebSite schema, hreflang, geo tags, OG/Twitter cards
- Home page has detailed Organization, LocalBusiness, and OfferCatalog schemas
- Core service pages (Services, SEO, Paid Media, Web Design) use `SEOHead`, `ServiceSchema`, `FAQSchema`, `BreadcrumbSchema`
- About, Contact, Pricing, CaseStudies, Resources, FAQs all use `SEOHead` + `BreadcrumbSchema`
- XML sitemaps (main, geo, news, index) generated via edge functions
- robots.txt with proper directives
- Landing page engine with 179+ geo/industry pages
- Canonical tags on upgraded pages

---

### Issues Found — Pages Using Raw `<Helmet>` Instead of `<SEOHead>`

These pages are **missing OG tags, Twitter cards, canonical URLs, and structured data**:

| Page | File | Missing |
|------|------|---------|
| `/services/content-email` | `ContentEmail.tsx` | SEOHead, BreadcrumbSchema, ServiceSchema |
| `/services/social-personal-brand` | `SocialPersonalBrand.tsx` | SEOHead, BreadcrumbSchema, ServiceSchema |
| `/services/analytics` | `Analytics.tsx` | SEOHead, BreadcrumbSchema, ServiceSchema |
| `/seo-agency` (pillar) | `SEOAgencyPillar.tsx` | Uses raw Helmet (has ServiceSchema/BreadcrumbSchema) |
| `/paid-media-agency` (pillar) | `PaidMediaAgencyPillar.tsx` | Uses raw Helmet (has ServiceSchema/BreadcrumbSchema) |
| `/digital-marketing-agency` (pillar) | `DigitalMarketingAgencyPillar.tsx` | Uses raw Helmet (has ServiceSchema/BreadcrumbSchema) |
| `/services/seo/local` | `seo/LocalSEO.tsx` | SEOHead, BreadcrumbSchema, ServiceSchema, FAQSchema |
| `/services/seo/technical` | `seo/TechnicalSEO.tsx` | SEOHead, BreadcrumbSchema, ServiceSchema, FAQSchema |
| `/services/seo/content` | `seo/ContentSEO.tsx` | SEOHead, BreadcrumbSchema, ServiceSchema, FAQSchema |
| `/services/seo/analytics-tracking` | `seo/AnalyticsTracking.tsx` | SEOHead, BreadcrumbSchema, ServiceSchema |
| `/services/seo/migrations` | `seo/WebsiteMigrations.tsx` | SEOHead, BreadcrumbSchema, ServiceSchema |
| `/locations` | `Locations.tsx` | SEOHead, BreadcrumbSchema |
| `/industries` | `Industries.tsx` | SEOHead, BreadcrumbSchema |
| `/resources/seo-glossary` | `SEOGlossary.tsx` | SEOHead, BreadcrumbSchema |
| `/websites-we-fire` | `WebsitesWeFire.tsx` | SEOHead, BreadcrumbSchema |
| `/website-health-check` | `WebsiteHealthCheck.tsx` | SEOHead, BreadcrumbSchema |
| `/project-estimator` | `ProjectEstimator.tsx` | SEOHead (no Helmet at all) |
| `/free-seo-website-audit` | `AuditFunnel.tsx` | SEOHead, BreadcrumbSchema |
| `/reporting` | `Reporting.tsx` | BreadcrumbSchema (has SEOHead) |
| `/why-avorria` | `WhyAvorria.tsx` | BreadcrumbSchema (has SEOHead) |
| `/privacy` | `Privacy.tsx` | SEOHead (has raw Helmet) |
| `/terms` | `Terms.tsx` | SEOHead (has raw Helmet) |
| `/agency-teardown` | `AgencyTeardown.tsx` | SEOHead, BreadcrumbSchema |

---

### Implementation Plan

#### Task 1: Standardise SEOHead + BreadcrumbSchema on All Public Pages (~23 files)

For every page listed above, replace raw `<Helmet>` with `<SEOHead>` and add `<BreadcrumbSchema>`. This ensures every single public page has:
- Unique meta title (~60 chars) + description (~155 chars)
- Canonical URL
- OG + Twitter card tags
- BreadcrumbList schema

#### Task 2: Add Missing ServiceSchema to Secondary Service Pages

Pages like Content & Email, Social & Personal Brand, Analytics, and the 4 SEO sub-pages (`/local`, `/technical`, `/content`, `/migrations`) are service pages that should have `ServiceSchema` for rich results.

#### Task 3: Add FAQSchema Where FAQs Exist But Schema Is Missing

Several pages have FAQ accordions in the UI but no `<FAQSchema>` component — missed opportunity for rich snippets. Add FAQSchema to:
- ContentEmail, SocialPersonalBrand, Analytics (all have FAQ sections)
- The 4 SEO sub-pages that have FAQ/problem sections

#### Task 4: Add Missing Pages to XML Sitemap

Cross-reference the sitemap edge function with actual routes to ensure coverage. Pages like `/why-avorria`, `/reporting`, `/websites-we-fire`, `/agency-teardown`, and the SEO sub-pages (`/services/seo/local`, `/services/seo/technical`, etc.) should be included in the main sitemap if they aren't already.

Update `src/data/sitemapUrls.ts` to add missing URLs.

#### Task 5: Internal Linking Improvements in Footer

The footer currently links to 5 services but misses Analytics and Reporting. Add these for crawl equity distribution. Also add links to key tools (Website Health Check, Project Estimator) and pillar content.

#### Task 6: Address `index.html` Inconsistencies

The `index.html` has conflicting data:
- Organization schema says `foundingDate: "2023"` but Home.tsx says `"2020"`
- Address in index.html says "Sheffield, S1 1AA" but Home.tsx says "Chesterfield, S41 7QJ"
- Phone number differs between files

Standardise to match the Home.tsx values (Chesterfield HQ).

---

### Technical Details

**Files to modify (grouped by priority):**

**High priority — SEO fundamentals (23 files):**
- `src/pages/ContentEmail.tsx`
- `src/pages/SocialPersonalBrand.tsx`
- `src/pages/Analytics.tsx`
- `src/pages/SEOAgencyPillar.tsx`
- `src/pages/PaidMediaAgencyPillar.tsx`
- `src/pages/DigitalMarketingAgencyPillar.tsx`
- `src/pages/seo/LocalSEO.tsx`
- `src/pages/seo/TechnicalSEO.tsx`
- `src/pages/seo/ContentSEO.tsx`
- `src/pages/seo/AnalyticsTracking.tsx`
- `src/pages/seo/WebsiteMigrations.tsx`
- `src/pages/Locations.tsx`
- `src/pages/Industries.tsx`
- `src/pages/SEOGlossary.tsx`
- `src/pages/WebsitesWeFire.tsx`
- `src/pages/WebsiteHealthCheck.tsx`
- `src/pages/ProjectEstimator.tsx`
- `src/pages/AuditFunnel.tsx`
- `src/pages/Reporting.tsx`
- `src/pages/WhyAvorria.tsx`
- `src/pages/Privacy.tsx`
- `src/pages/Terms.tsx`
- `src/pages/AgencyTeardown.tsx`

**Medium priority — sitemap & internal linking:**
- `src/data/sitemapUrls.ts` — add missing pages
- `src/components/Footer.tsx` — expand internal links
- `supabase/functions/sitemap/index.ts` — ensure sync with sitemapUrls

**Medium priority — data consistency:**
- `index.html` — fix Organisation schema to match Chesterfield HQ

**Pattern applied to each file:**
```tsx
// Replace: import { Helmet } from "react-helmet-async";
// With:
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
// + ServiceSchema, FAQSchema where applicable

// Replace raw <Helmet> block with:
<SEOHead
  title="Unique Keyword-Rich Title (~60 chars)"
  description="Compelling description with target keywords (~155 chars)"
  canonical="/page-path"
  keywords={["target", "keywords"]}
/>
<BreadcrumbSchema items={[
  { name: "Home", url: "https://avorria.com" },
  { name: "Parent", url: "https://avorria.com/parent" },
  { name: "Current Page", url: "https://avorria.com/current" }
]} />
```

This is a large but systematic task — the same pattern applied consistently across ~23 pages, plus sitemap and footer updates.

