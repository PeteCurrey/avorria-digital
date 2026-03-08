

## SEO Implementation Status Report

### What's Been Completed

The recent SEO overhaul successfully covered **35+ pages** with standardized components:

| Component | Coverage |
|-----------|----------|
| `SEOHead` (meta title, description, OG, Twitter, canonical) | All core service, pillar, SEO sub-pages, About, Contact, Pricing, CaseStudies, Resources, FAQs, Reporting, WhyAvorria, Privacy, Terms, Locations, Industries, Glossary, WebsitesWeFire, AgencyTeardown, AuditFunnel, ProjectEstimator, WebsiteHealthCheck |
| `BreadcrumbSchema` | Same coverage as above |
| `ServiceSchema` | All service pages + SEO sub-pages |
| `FAQSchema` | Pages with FAQ sections (Services, SEO, PaidMedia, WebDesign, FAQs, Reporting, ContentEmail, SocialPersonalBrand, Analytics, SEO sub-pages) |
| XML Sitemaps | Main, geo, news, index — all functional via edge functions |
| `index.html` Organization schema | Fixed to Chesterfield HQ, consistent with Home.tsx |
| Footer internal linking | Expanded with Analytics, Reporting, Free SEO Audit |
| Mobile hero optimization | Video on desktop, static image on mobile for all service pages |

### Remaining Gaps — Pages Still Using Raw `<Helmet>`

These **7 public-facing pages** still use raw `<Helmet>` instead of `<SEOHead>`, meaning they're missing OG tags, Twitter cards, and canonical URLs:

1. **`Home.tsx`** — Uses raw `<Helmet>`. The homepage is the most important page on the site and lacks `<SEOHead>`, `<BreadcrumbSchema>`, and has no `FAQSchema` despite having an FAQ section.
2. **`CaseStudyDetail.tsx`** — Dynamic case study pages use raw `<Helmet>`. Missing OG image, Article/CreativeWork schema, and BreadcrumbSchema.
3. **`ResourceDetail.tsx`** — Blog/resource detail pages use raw `<Helmet>`. Missing Article schema, BreadcrumbSchema, and proper canonical URLs.
4. **`Comparison.tsx`** — Comparison pages use raw `<Helmet>`. Missing OG tags, BreadcrumbSchema.
5. **`Sitemap.tsx`** — HTML sitemap uses raw `<Helmet>`. Minor priority but should be consistent.
6. **`AgencyTeardownThanks.tsx`** — Thank-you page uses raw `<Helmet>`. Should have `noindex` to prevent indexing thin content.
7. **`DashboardDemo.tsx`** — No SEO tags at all. Should have `noindex`.

### Additional Technical SEO Opportunities

Beyond fixing the remaining pages, here are strategies we can still implement:

1. **Article Schema on ResourceDetail.tsx** — Every blog post/guide should output `Article` or `BlogPosting` schema with `datePublished`, `author`, `publisher`, `image`. This is critical for Google Discover and rich results.

2. **CreativeWork Schema on CaseStudyDetail.tsx** — Case studies should use `CreativeWork` schema to improve visibility for branded searches.

3. **Home Page FAQSchema** — The homepage has an FAQ accordion but no `FAQSchema` — free rich snippet opportunity on the most important page.

4. **`noindex` on Utility Pages** — `AgencyTeardownThanks`, `DashboardDemo`, `MarketingAssets`, `Onboarding`, all auth/client portal pages should have `noindex` to prevent crawl budget waste.

5. **Phone Number Inconsistency** — `index.html` says `+44 1246 123456`, `Home.tsx` says `+44 114 123 4567`. These must match for NAP consistency (critical for Local SEO).

### Implementation Plan

**Task 1: Upgrade Home.tsx** — Replace raw `<Helmet>` with `<SEOHead>`, add `FAQSchema` for the FAQ section, add `BreadcrumbSchema`. Fix phone number to match `index.html`.

**Task 2: Upgrade CaseStudyDetail.tsx** — Replace `<Helmet>` with `<SEOHead>`, add `CreativeWork` schema with dynamic data (client, sector, metrics), add `BreadcrumbSchema`.

**Task 3: Upgrade ResourceDetail.tsx** — Replace `<Helmet>` with `<SEOHead>`, add `Article`/`BlogPosting` schema with `datePublished`, `author`, `publisher`, add `BreadcrumbSchema`.

**Task 4: Upgrade Comparison.tsx** — Replace `<Helmet>` with `<SEOHead>`, add `BreadcrumbSchema`.

**Task 5: Add `noindex` to utility pages** — `Sitemap.tsx`, `AgencyTeardownThanks.tsx`, `DashboardDemo.tsx`, `MarketingAssets.tsx` — either via `<SEOHead noindex>` or raw meta tag.

**Task 6: Fix NAP consistency** — Standardize phone number across `index.html` and `Home.tsx` to one value.

This will achieve **100% SEO component coverage** across every public page on the site.

