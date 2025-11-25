# Avorria Landing Page System

## Overview

This is a scalable landing page engine for Avorria that allows you to create SEO-optimized landing pages for:
- **Service + Location** combinations (e.g., "SEO in London")
- **Service + Industry** combinations (e.g., "Web Design for Trades")
- **Campaign-specific** pages (e.g., "Free SEO Audit")

## File Structure

```
src/
├── types/
│   └── landingPage.ts          # TypeScript interfaces for all data models
├── data/
│   ├── services.ts             # Service entities (SEO, Web Design, etc.)
│   ├── industries.ts           # Industry entities (Trades, Professional Services, etc.)
│   ├── locations.ts            # Location entities (London, Manchester, etc.)
│   └── landingPages.ts         # Landing page configurations
├── components/
│   ├── LandingPageTemplate.tsx # Reusable landing page layout
│   └── LandingPageForm.tsx     # Conversion-optimized form with validation
└── pages/
    └── DynamicLanding.tsx      # Dynamic routing handler
```

## Current Example Pages

Three fully-written landing pages are live:

1. **SEO in London** - `/seo/london`
   - Service + Location page
   - Targets: London-specific SEO searches
   - Includes local market insights and London-focused copy

2. **Web Design for Trades** - `/web-design/for/trades`
   - Service + Industry page
   - Targets: Plumbers, electricians, home service professionals
   - Emphasizes mobile, click-to-call, and local SEO

3. **Paid Media for Professional Services** - `/paid-media/for/professional-services`
   - Service + Industry page
   - Targets: Law firms, consultancies, B2B services
   - Focuses on lead quality and attribution

## URL Patterns

The system supports these URL patterns:

- **Service + Location**: `/:serviceSlug/:locationSlug`
  - Example: `/seo/london`, `/web-design/manchester`

- **Service + Industry**: `/:serviceSlug/for/:industrySlug`
  - Example: `/seo/for/trades`, `/paid-media/for/saas`

- **Campaign Pages**: `/campaign/:campaignSlug` (not yet implemented)
  - Example: `/campaign/free-seo-audit`, `/campaign/website-rescue`

## Creating New Landing Pages

### 1. Add to Data Files

Define your service, industry, or location in the respective data files:

**Add a new location** (`src/data/locations.ts`):
```typescript
{
  id: "bristol",
  city: "Bristol",
  country: "United Kingdom",
  slug: "bristol",
  isPrimaryMarket: false,
}
```

**Add a new industry** (`src/data/industries.ts`):
```typescript
{
  id: "financial-services",
  name: "Financial Services",
  slug: "financial-services",
  painPoints: [
    "Compliance restrictions limit marketing tactics",
    "High competition for valuable keywords",
    // ... more pain points
  ],
  typicalDealSize: "£10,000 - £500,000+ per client",
  idealChannels: ["SEO", "Content Marketing", "LinkedIn"],
}
```

### 2. Create Landing Page Configuration

Add a new landing page to `src/data/landingPages.ts`:

```typescript
{
  id: "seo-manchester",
  title: "SEO in Manchester",
  slug: "seo-manchester",
  type: "service-location",
  service: getServiceBySlug("seo")!,
  location: getLocationBySlug("manchester")!,
  heroHeadline: "SEO in Manchester that drives real business growth",
  heroSubheadline: "Technical SEO and content strategy for Manchester businesses...",
  primaryCTA: "Book SEO Strategy Call",
  secondaryCTA: "Get Free Manchester SEO Audit",
  problemBullets: [
    "Your current SEO isn't generating Manchester-specific leads",
    // ... 3-5 pain points
  ],
  solutionBullets: [
    "Technical audit tailored to Manchester's competitive landscape",
    // ... 3-5 solution points
  ],
  keyMetrics: [
    {
      value: "+184%",
      label: "Organic Leads",
      description: "Manchester SaaS company, 6-month engagement",
    },
    // ... 2-3 more metrics
  ],
  testimonialSnippet: {
    quote: "Amazing results from working with Avorria...",
    author: "John Smith",
    role: "CEO",
    company: "Manchester Tech Ltd",
  },
  faqList: [
    {
      question: "How competitive is SEO in Manchester?",
      answer: "Manchester has moderate competition...",
    },
    // ... 4-6 FAQs
  ],
  targetKeyword: "seo manchester",
  metaTitle: "SEO in Manchester | Revenue-Focused SEO Services | Avorria",
  metaDescription: "SEO in Manchester that delivers leads and revenue...",
}
```

### 3. Test Your New Page

Once added to `landingPages.ts`, your page is automatically available at:
- `/seo/manchester` (for service-location)
- `/web-design/for/financial-services` (for service-industry)

## Landing Page Template Structure

Each landing page includes these sections (in order):

1. **Hero Section**
   - Dynamic headline and subheadline
   - Context line (e.g., "For Professional Services in London")
   - Primary and secondary CTAs
   - Visual dashboard with key metrics

2. **Problem Section**
   - "Tired of [service] that doesn't move the needle?"
   - Bullet list of pain points (3-5 items)
   - Brutally honest about typical agency failures

3. **Solution Section**
   - How Avorria approaches this service for this niche
   - Bullet list of solutions (4-6 items)
   - Checkmarks for visual clarity

4. **Key Metrics**
   - 3 metric cards with actual client results
   - Value, label, and description for each
   - Emphasizes business impact

5. **Process Steps** (optional)
   - 3-4 step process showing how we work
   - Numbered cards with title and description

6. **Testimonial** (optional)
   - Client quote with attribution
   - Result summary

7. **Working With You Section** (optional)
   - Industry or location-specific insights
   - Shows understanding of their unique challenges

8. **Pricing Snapshot** (optional)
   - Typical investment range
   - What's included
   - Link to full pricing page

9. **FAQ Section**
   - 4-6 questions specific to the niche
   - Structured data (FAQ schema) for SEO

10. **High-Intent Conversion Form**
    - Multi-field form with validation
    - Customized to service/industry/location
    - Conversion tracking hooks

11. **Internal Links Footer**
    - Links to main service page
    - Links to industry page (if applicable)
    - Links to case studies

## SEO Features

All landing pages automatically include:

### Meta Tags
- Dynamic `<title>` and meta description
- OpenGraph tags for social sharing
- Canonical URLs

### Structured Data (Schema.org)
- **FAQPage schema** - All FAQ sections
- **Service schema** - Service details with provider and area served
- **BreadcrumbList schema** - Navigation breadcrumbs

### Internal Linking
- Breadcrumb navigation
- Links to pillar service pages
- Links to industry pages
- Links to case studies and resources

### Performance
- Semantic HTML (H1, H2, H3 hierarchy)
- Clean URL structure
- Mobile-first responsive design
- Fast load times

## Form Validation

The `LandingPageForm` component includes:

- **Client-side validation** with Zod schema
- **Length limits** on all fields
- **Real-time error messages**
- **Conversion tracking hooks** for analytics
- **No console logging** of sensitive data

Required fields:
- Name (2-100 characters)
- Email (valid email, max 255 characters)
- Business Name (2-100 characters)
- Budget Range (select)
- Main Goal (select)

Optional fields:
- Website URL (max 255 characters)
- Additional Details (max 2000 characters)

## Analytics & Tracking

The system includes hooks for:

1. **Page View Tracking** - Fires on landing page load
2. **CTA Click Tracking** - Tracks primary and secondary CTA clicks
3. **Form Submission Tracking** - Conversion events on form submit

To connect your analytics:
- Update the `gtag` event calls in `LandingPageTemplate.tsx`
- Replace placeholder conversion IDs with actual IDs
- Add any additional tracking pixels or events

## Extending the System

### Add New Services

1. Add to `src/data/services.ts`
2. Create a pillar service page (e.g., `/services/new-service`)
3. Create landing page configurations for that service

### Add New Locations

1. Add to `src/data/locations.ts`
2. Mark `isPrimaryMarket` as true for priority cities
3. Create landing pages for high-priority service + location combinations

### Add New Industries

1. Add to `src/data/industries.ts`
2. Define pain points and ideal channels
3. Create landing pages targeting that industry

### Create Campaign Pages

Campaign pages follow a similar pattern but don't require location/industry:

```typescript
{
  id: "free-seo-audit",
  slug: "free-seo-audit",
  type: "campaign",
  service: getServiceBySlug("seo")!,
  // ... rest of configuration
}
```

Then add routing in `App.tsx` for `/campaign/:campaignSlug` URLs.

## Best Practices

### Copy Guidelines
- **Be specific** - Avoid generic "best in class" language
- **Lead with pain** - Problems before solutions
- **Use real metrics** - Actual client results, not hypotheticals
- **Speak to the niche** - Show you understand their industry/location
- **Stay direct** - No marketing fluff or buzzwords

### Content Creation
- Write 3-5 problem bullets that resonate with the target audience
- Create 4-6 solution bullets that explain your approach
- Include 3 key metrics with context (not just numbers)
- Write 4-6 FAQs specific to the niche
- Add a testimonial if you have one from that niche

### SEO Optimization
- Target 1 primary keyword (e.g., "seo london")
- Use keyword in H1, meta title, meta description
- Include location/industry in H2 subheadings where natural
- Link to related hub pages (services, industries, case studies)
- Keep meta descriptions under 160 characters

### Internal Linking Strategy
- Every landing page links back to its main service page
- Service pages link to relevant landing pages
- Case studies link to relevant landing pages
- Resources/blog articles can link to landing pages

## Maintenance

### Updating Existing Pages
1. Locate the page in `src/data/landingPages.ts`
2. Update any fields (copy, metrics, FAQs, etc.)
3. Changes are immediate—no routing updates needed

### Duplicating Pages
To create a new page from an existing template:
1. Copy an existing landing page object in `landingPages.ts`
2. Update the ID and slug
3. Change service/industry/location references
4. Customize all copy fields
5. Replace metrics, testimonials, and FAQs with niche-specific content

### A/B Testing
To A/B test headlines, CTAs, or copy:
- Create two versions of the same landing page with different slugs
- Use URL parameters or a traffic splitting tool
- Track conversion rates in your analytics platform

## Technical Notes

- **React Router** handles dynamic routing
- **react-helmet-async** manages meta tags and schema
- **Zod** provides form validation
- **shadcn/ui** components maintain design consistency
- All landing pages inherit global navigation and footer

## Future Enhancements

Potential additions to consider:

1. **CMS Integration** - Connect to Strapi, Contentful, or Sanity for non-technical editing
2. **Dynamic Generation** - Auto-generate pages for any service + location combination
3. **A/B Testing Framework** - Built-in headline and CTA testing
4. **Personalization** - Show different content based on visitor source
5. **Multi-language** - Translate landing pages for international markets
6. **Review Integration** - Pull real reviews and testimonials dynamically
7. **Advanced Analytics** - Heatmaps, scroll tracking, form field analytics

## Support

For questions or issues with the landing page system, refer to:
- TypeScript types in `src/types/landingPage.ts`
- Example pages in `src/data/landingPages.ts`
- Template component in `src/components/LandingPageTemplate.tsx`
