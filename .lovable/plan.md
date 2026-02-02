

# SEO Domination Strategy for Avorria.com

## Current State Assessment

### What's Already in Place (Strong Foundation)

**Technical SEO Infrastructure:**
- Dynamic XML sitemap edge function with separate feeds: main, geo, news sitemaps
- Sitemap index referencing all sitemaps
- Robots.txt properly configured with disallows for admin/client areas
- Hreflang implementation for location pages
- Multiple schema components: Organization, LocalBusiness, FAQ, Service, Article, Breadcrumb, HowTo

**On-Page SEO:**
- SEOHead component with Open Graph, Twitter Cards, canonical tags
- Landing page template with auto-generated FAQPage, Service, and Breadcrumb schemas
- Core pillar content in /resources (3 comprehensive guides)
- SEO glossary at /resources/seo-glossary
- FAQ hub at /faqs

**Landing Page Engine:**
- Service-industry pages (SEO/web-design/paid-media for trades, professional services, SaaS, e-commerce, multi-location)
- Service-location pages for 38+ locations across UK, US, Australia, NZ, Canada
- Reusable LandingPageTemplate with problem/solution/metrics/FAQ structure
- Nearby locations cross-linking built into template

### Critical Gaps Identified

1. **No Derbyshire/Chesterfield presence** - Despite Chesterfield being Avorria's HQ, no location pages exist
2. **Limited East Midlands coverage** - Only Nottingham exists; no Derby, Leicester, Mansfield
3. **Missing industry-location combinations** - No "SEO for trades in Chesterfield" style hyper-local pages
4. **Thin internal linking** - Service pages don't consistently link to location/industry variants
5. **No structured data for service-area businesses** - Missing ServiceArea schema
6. **Content gaps** - Only 3 pillar resources; competitors likely have 10-20+
7. **No blog/news feed** - Sitemap news feed shows only 3 articles

---

## Phase 1: Local Market Domination (Derbyshire & Chesterfield)

### 1.1 Add New Location Data

Add to `src/data/locations.ts`:

| City | Region | Slug | Priority |
|------|--------|------|----------|
| Chesterfield | Derbyshire | chesterfield | Primary (HQ) |
| Derby | Derbyshire | derby | Primary |
| Derbyshire | East Midlands | derbyshire | Primary |
| Mansfield | Nottinghamshire | mansfield | Secondary |
| Leicester | Leicestershire | leicester | Secondary |

### 1.2 Create Service-Location Landing Pages

For Chesterfield and Derbyshire, create full landing pages for all 4 services:

**High Priority (Create Full Content):**
- `/seo-agency/chesterfield`
- `/seo-agency/derbyshire`
- `/web-design/chesterfield`
- `/web-design/derbyshire`
- `/digital-marketing-agency/chesterfield`
- `/digital-marketing-agency/derbyshire`
- `/paid-media-agency/chesterfield`
- `/paid-media-agency/derbyshire`

Each page includes:
- Unique hero copy referencing local landmarks/industries
- Problem bullets specific to East Midlands businesses
- Testimonial from regional client
- Local FAQ (e.g., "Do you work with businesses in Clay Cross/Staveley?")
- Schema with GeoCoordinates for Chesterfield (53.2350, -1.4210)

### 1.3 Create Industry-Location Hybrid Pages

Target high-value local industries in Derbyshire:

| Industry | Why Target | URL Pattern |
|----------|-----------|-------------|
| Trades & Home Services | High volume, local intent | `/seo-agency/chesterfield/trades` |
| Manufacturing | Strong in East Midlands | `/seo-agency/derbyshire/manufacturing` |
| Legal/Professional | County town base | `/web-design/chesterfield/professional-services` |
| Hospitality | Peak District tourism | `/digital-marketing-agency/derbyshire/hospitality` |

This creates 16+ hyper-targeted pages for local market capture.

---

## Phase 2: Technical SEO Enhancements

### 2.1 Add ServiceArea Schema

Create new component `src/components/seo/ServiceAreaSchema.tsx`:

```text
Schema Type: Service with areaServed
- Lists all service areas as GeoCircle or AdministrativeArea
- Attached to homepage and service pillar pages
- Signals to Google the regions Avorria actively serves
```

### 2.2 Enhance LocalBusiness Schema

Update `src/components/seo/LocalBusinessSchema.tsx` to include:
- Multiple service areas (not just Chesterfield HQ)
- Service type enumeration
- Price range indication
- hasOfferCatalog linking to service pages

### 2.3 Add Review/Rating Schema

Create `AggregateRating` schema pulling from:
- Case studies (average results)
- Testimonials (if ratings exist)
- Google reviews (if integrated)

### 2.4 Implement Breadcrumb Navigation

Currently BreadcrumbSchema exists but BreadcrumbNav component needs integration:
- Add visible breadcrumbs to all service, location, and resource pages
- Match schema output with visible UI
- Improve crawlability and user orientation

### 2.5 Core Web Vitals Optimisation

Audit and optimise:
- Largest Contentful Paint (hero images are large JPGs)
- Consider WebP conversion for all images
- Lazy load below-fold images
- Preload critical fonts

---

## Phase 3: Content Expansion Strategy

### 3.1 New Pillar Resources to Create

| Title | Target Keyword | Purpose |
|-------|----------------|---------|
| Local SEO Playbook | "local seo guide" | Capture local SEO intent |
| Paid Media ROI Guide | "google ads roi" | Support paid media service |
| Website Migration Checklist | "website migration seo" | Capture technical intent |
| Marketing Analytics Setup | "marketing analytics guide" | Build authority |
| Industry Guides (x5) | "SEO for [industry]" | Support industry pages |

### 3.2 Blog/Article Strategy

Expand news sitemap content:
- Add 2-4 articles per month to /resources
- Target long-tail informational keywords
- Include internal links to service and landing pages
- Add Article schema with author, datePublished, dateModified

### 3.3 Case Study Expansion

Each case study should:
- Have schema markup (CreativeWork or Article)
- Link to relevant service and industry pages
- Include before/after metrics for rich snippet potential
- Reference client location for local signals

---

## Phase 4: Internal Linking Architecture

### 4.1 Service Page Enhancements

On each service pillar page (e.g., `/services/seo`), add sections:
- "SEO by Location" - Grid linking to top 6-10 location pages
- "SEO by Industry" - Grid linking to industry-specific pages
- "SEO Resources" - Links to relevant guides and glossary

### 4.2 Location Page Cross-Links

Update LandingPageTemplate to include:
- Related services in same location (already exists)
- Related industries in same location (new)
- Parent region link (e.g., Chesterfield links to Derbyshire)

### 4.3 Footer & Navigation Updates

- Add "Popular Locations" dropdown in footer with top 10 UK cities
- Add Chesterfield/Derby prominence as HQ location
- Link to /locations hub from footer

---

## Phase 5: Sitemap & Indexation Updates

### 5.1 Update Sitemap Edge Function

Add new locations to `supabase/functions/sitemap/index.ts`:
- Add Chesterfield, Derby, Derbyshire, Mansfield, Leicester to ukLocations array
- Add new industry pages to industryLandingPages array
- Add hospitality and manufacturing industries

### 5.2 Create Sitemap-Industries.xml

New sitemap specifically for industry landing pages:
- Separate from geo sitemap for cleaner indexing
- Priority 0.8 for service-industry combos
- Monthly changefreq

### 5.3 Add Indexation Monitoring

In admin dashboard, add:
- Index status check using Search Console API
- Alert for pages not indexed after 30 days
- Sitemap submission status

---

## Phase 6: Industries to Target in Derbyshire

### 6.1 High-Priority Industries for Local Content

Based on Derbyshire economy and search demand:

| Industry | Rationale | Landing Page Priority |
|----------|-----------|----------------------|
| Trades & Home Services | High local search volume | Highest |
| Manufacturing | Strong East Midlands presence | High |
| Professional Services | Legal, accountancy in Chesterfield | High |
| Hospitality & Tourism | Peak District opportunity | Medium |
| Healthcare | Private clinics, dentists | Medium |
| Construction | Development in region | Medium |

### 6.2 Add New Industry Data

Add to `src/data/industries.ts`:
- `manufacturing` - Pain points around B2B lead generation, technical content
- `hospitality` - Seasonal demand, local SEO, review management
- `healthcare` - Patient acquisition, compliance, local visibility
- `construction` - Project pipeline, tender visibility, reputation

---

## Implementation Order

### Week 1-2: Foundation
1. Add Chesterfield, Derby, Derbyshire, Mansfield, Leicester to locations.ts
2. Add manufacturing, hospitality, healthcare, construction to industries.ts
3. Create 8 service-location landing pages for Chesterfield/Derbyshire
4. Update sitemap edge function with new locations

### Week 3-4: Technical SEO
5. Create ServiceAreaSchema component
6. Enhance LocalBusiness schema with multi-location support
7. Implement visible breadcrumb navigation across site
8. Add AggregateRating schema to homepage

### Week 5-6: Content & Linking
9. Create 4 industry-location hybrid pages (trades/manufacturing focus)
10. Add internal linking sections to service pillar pages
11. Update footer with location links
12. Create 1 new pillar resource (Local SEO Playbook)

### Week 7-8: Expansion
13. Create remaining industry-location hybrids (8+ pages)
14. Add remaining pillar resources
15. Set up indexation monitoring in admin
16. Create sitemap-industries.xml

---

## Files to Create

| File | Purpose |
|------|---------|
| 8x entries in serviceLocationLandingPages.ts | Chesterfield/Derbyshire service pages |
| 4x entries in industries.ts | New industries |
| 5x entries in locations.ts | East Midlands locations |
| src/components/seo/ServiceAreaSchema.tsx | Service area schema |
| src/components/seo/AggregateRatingSchema.tsx | Review schema |
| 4x entries in landingPages.ts | Industry-location hybrids |
| 2x entries in resources.ts | New pillar guides |

## Files to Modify

| File | Changes |
|------|---------|
| src/data/locations.ts | Add 5 new East Midlands locations |
| src/data/industries.ts | Add 4 new industries |
| src/data/serviceLocationLandingPages.ts | Add 8 Chesterfield/Derbyshire pages |
| src/data/landingPages.ts | Add industry-location hybrids |
| supabase/functions/sitemap/index.ts | Add new locations and industries |
| src/components/seo/LocalBusinessSchema.tsx | Enhance with service areas |
| src/pages/SEOServices.tsx | Add location/industry grids |
| src/pages/WebDesign.tsx | Add location/industry grids |
| src/components/Footer.tsx | Add location links |

---

## Expected Outcomes

**3-Month Targets:**
- 20+ new indexed pages targeting Derbyshire/East Midlands
- Top 10 rankings for "SEO agency Chesterfield", "web design Derby"
- 15% increase in organic traffic from East Midlands IPs
- 5+ new enquiries attributed to local landing pages

**6-Month Targets:**
- Dominant local presence for all 4 services in Derbyshire
- Featured snippets for local FAQ queries
- 30% increase in organic-attributed pipeline
- Industry-location pages ranking for long-tail commercial terms

**12-Month Targets:**
- #1-3 for major service+location combinations in East Midlands
- 50+ indexed landing pages across services/locations/industries
- Organic channel as primary lead source for local market
- Case studies from Derbyshire clients to reinforce local proof

