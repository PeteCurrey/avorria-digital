/**
 * Central SEO metadata registry for all public routes.
 * Used by:
 *  - vite-plugin-prerender-meta.ts (build-time HTML generation)
 *  - prerender edge function (dynamic bot rendering)
 *  - Sitemap edge function (consistency)
 */

export interface RouteMetadata {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  h1: string;
  introText: string;
  schemaType?: "website" | "service" | "article" | "faq" | "local-business";
}

const SITE_URL = "https://avorria.com";
const DEFAULT_OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/7MJD8mgRihYZLAUga3hIuKQHE2u2/social-images/social-1765645939140-20250710_1857_image (1).png";

// ------------------------------ Core Pages ------------------------------
const coreRoutes: Record<string, RouteMetadata> = {
  "/": {
    title: "Avorria | Digital Marketing, SEO & Web Design Agency | UK & USA",
    description: "Avorria is a performance-first digital marketing agency specialising in SEO, paid media, web design and analytics. We help B2B and service businesses grow revenue, not vanity metrics.",
    canonical: `${SITE_URL}/`,
    h1: "Digital Growth Systems for Serious Teams",
    introText: "Avorria is a performance-first digital marketing agency specialising in SEO, paid media, web design and analytics for B2B and service businesses across the UK and USA.",
    schemaType: "website",
  },
  "/services": {
    title: "Digital Marketing Services | SEO, Paid Media, Web Design | Avorria",
    description: "Explore Avorria's full suite of digital marketing services including SEO, paid media, web design, content marketing, analytics and CRO. Built for revenue, not vanity metrics.",
    canonical: `${SITE_URL}/services`,
    h1: "Digital Marketing Services",
    introText: "From SEO and paid media to web design and analytics, Avorria delivers integrated digital marketing services engineered around pipeline and revenue.",
    schemaType: "service",
  },
  "/services/seo": {
    title: "SEO Services | Technical SEO, Content & Link Building | Avorria",
    description: "SEO services that drive revenue and qualified leads — not just rankings and reports. Technical SEO, content strategy, and link building for B2B and service businesses.",
    canonical: `${SITE_URL}/services/seo`,
    h1: "SEO Services That Drive Revenue",
    introText: "Avorria's SEO services combine technical foundations, commercial content strategy, and authority building to deliver qualified leads and measurable revenue growth.",
    schemaType: "service",
  },
  "/services/paid-media": {
    title: "Paid Media Services | Google Ads, Meta & LinkedIn | Avorria",
    description: "Paid media campaigns engineered for pipeline, not vanity metrics. Google Ads, Meta Ads and LinkedIn advertising managed by a performance-first agency.",
    canonical: `${SITE_URL}/services/paid-media`,
    h1: "Paid Media That Delivers Pipeline",
    introText: "Performance campaigns across Google Ads, Meta, and LinkedIn — built around your commercial goals with full-funnel tracking from click to close.",
    schemaType: "service",
  },
  "/services/web-design": {
    title: "Web Design & Development | Conversion-Focused Websites | Avorria",
    description: "Modern, fast, conversion-optimized websites that blend premium design with technical excellence. Web design for B2B and service businesses.",
    canonical: `${SITE_URL}/services/web-design`,
    h1: "Web Design That Converts",
    introText: "High-converting websites that look like top agencies built them — but are tuned for business results, speed, and search visibility.",
    schemaType: "service",
  },
  "/services/content-email": {
    title: "Content & Email Marketing | SEO Content & Automation | Avorria",
    description: "Long-form SEO content and automated email sequences that convert. Content and email marketing tied directly to your sales process.",
    canonical: `${SITE_URL}/services/content-email`,
    h1: "Content & Email Marketing",
    introText: "Content strategy and email automation designed to nurture prospects through your pipeline — not just fill your blog with filler.",
    schemaType: "service",
  },
  "/services/social-personal-brand": {
    title: "Social Media & Personal Branding | Avorria",
    description: "Social media management and personal brand building for B2B leaders. Build authority and generate demand through LinkedIn, Twitter and thought leadership.",
    canonical: `${SITE_URL}/services/social-personal-brand`,
    h1: "Social Media & Personal Brand",
    introText: "Build authority and generate demand through strategic social media and personal brand development for B2B leaders and service businesses.",
    schemaType: "service",
  },
  "/services/analytics": {
    title: "Analytics & CRO | Marketing Attribution & Dashboards | Avorria",
    description: "Marketing analytics, conversion rate optimisation and attribution modelling. See exactly what's driving pipeline and make data-driven decisions.",
    canonical: `${SITE_URL}/services/analytics`,
    h1: "Analytics & Conversion Rate Optimisation",
    introText: "Marketing analytics and CRO that connect every channel to revenue. GA4 setup, attribution modelling, and live dashboards that drive decisions.",
    schemaType: "service",
  },
  "/services/seo/local": {
    title: "Local SEO Services | Google Business Profile & Citations | Avorria",
    description: "Local SEO services for service businesses. Google Business Profile optimisation, local citations, review management, and location pages that drive enquiries.",
    canonical: `${SITE_URL}/services/seo/local`,
    h1: "Local SEO Services",
    introText: "Dominate local search with Google Business Profile optimisation, citation management, location pages, and review strategy built for service businesses.",
    schemaType: "service",
  },
  "/services/seo/technical": {
    title: "Technical SEO Services | Site Speed, Indexing & Migrations | Avorria",
    description: "Technical SEO audits and implementation. Site speed, Core Web Vitals, indexing, schema markup, and website migrations handled by experienced specialists.",
    canonical: `${SITE_URL}/services/seo/technical`,
    h1: "Technical SEO Services",
    introText: "Technical SEO that ensures your site is crawlable, indexable, and fast — covering Core Web Vitals, schema markup, and complex migrations.",
    schemaType: "service",
  },
  "/services/seo/content": {
    title: "Content SEO Services | Keyword Strategy & Topic Clusters | Avorria",
    description: "Content SEO strategy built around commercial intent. Keyword mapping, topic clusters, pillar pages, and content that ranks and converts.",
    canonical: `${SITE_URL}/services/seo/content`,
    h1: "Content SEO Services",
    introText: "Content strategy mapped to commercial intent — keyword research, topic clusters, and pillar content that drives qualified organic traffic.",
    schemaType: "service",
  },
  "/services/seo/analytics-tracking": {
    title: "SEO Analytics & Tracking | GA4, GSC & Attribution | Avorria",
    description: "SEO analytics and tracking setup. GA4 configuration, Google Search Console monitoring, and attribution modelling that ties organic to revenue.",
    canonical: `${SITE_URL}/services/seo/analytics-tracking`,
    h1: "SEO Analytics & Tracking",
    introText: "Connect your SEO efforts to revenue with proper GA4 configuration, Search Console monitoring, and attribution modelling.",
    schemaType: "service",
  },
  "/services/seo/migrations": {
    title: "Website Migration SEO | Platform Moves & Redesigns | Avorria",
    description: "SEO-safe website migrations for platform moves, redesigns, and domain changes. Protect your rankings and traffic during critical transitions.",
    canonical: `${SITE_URL}/services/seo/migrations`,
    h1: "Website Migration SEO",
    introText: "Protect your organic traffic and rankings during website redesigns, platform migrations, and domain changes with structured migration management.",
    schemaType: "service",
  },
  "/case-studies": {
    title: "Case Studies | Real Results from Real Clients | Avorria",
    description: "See how Avorria delivers measurable results for B2B and service businesses. Case studies covering SEO, paid media, web design, and full-funnel digital marketing.",
    canonical: `${SITE_URL}/case-studies`,
    h1: "Case Studies",
    introText: "Real results from real businesses. Explore how Avorria's digital marketing strategies drive leads, revenue, and growth across industries.",
    schemaType: "website",
  },
  "/contact": {
    title: "Contact Avorria | Book a Strategy Call | Digital Marketing Agency",
    description: "Get in touch with Avorria. Book a strategy call, request an audit, or ask about our SEO, paid media, web design and analytics services.",
    canonical: `${SITE_URL}/contact`,
    h1: "Get in Touch",
    introText: "Ready to grow? Book a strategy call, request a free audit, or tell us about your project. We respond within 24 hours.",
    schemaType: "website",
  },
  "/pricing": {
    title: "Pricing | Transparent Digital Marketing Packages | Avorria",
    description: "Transparent pricing for SEO, paid media, web design and digital marketing services. No hidden fees, no lock-in contracts. See our packages.",
    canonical: `${SITE_URL}/pricing`,
    h1: "Pricing",
    introText: "Transparent, no-nonsense pricing for businesses that want clarity. No hidden fees, no 12-month lock-ins — just results-driven packages.",
    schemaType: "website",
  },
  "/about": {
    title: "About Avorria | Performance-First Digital Marketing Agency",
    description: "Learn about Avorria — a performance-first digital marketing agency built for B2B and service businesses who want revenue, not vanity metrics.",
    canonical: `${SITE_URL}/about`,
    h1: "About Avorria",
    introText: "Avorria is a performance-first digital marketing agency built by practitioners who got tired of the agency model. We focus on pipeline and revenue.",
    schemaType: "website",
  },
  "/resources": {
    title: "Resources & Guides | Marketing Knowledge Base | Avorria",
    description: "Free marketing resources, guides and frameworks for B2B and service businesses. SEO, paid media, web design, analytics — no fluff, just practical advice.",
    canonical: `${SITE_URL}/resources`,
    h1: "Resources & Guides",
    introText: "Practical marketing guides and frameworks written for business owners and marketing leaders. No filler — just strategies that drive results.",
    schemaType: "website",
  },
  "/resources/seo-glossary": {
    title: "SEO Glossary | Plain-English SEO Definitions | Avorria",
    description: "SEO glossary with plain-English definitions. Understand SEO terminology without the jargon — from backlinks to Core Web Vitals.",
    canonical: `${SITE_URL}/resources/seo-glossary`,
    h1: "SEO Glossary",
    introText: "Plain-English definitions for every SEO term you need to know. No jargon, no complexity theatre — just clear explanations.",
    schemaType: "faq",
  },
  "/faqs": {
    title: "Frequently Asked Questions | Avorria",
    description: "Answers to common questions about working with Avorria — pricing, process, SEO, paid media, web design, reporting, and what to expect.",
    canonical: `${SITE_URL}/faqs`,
    h1: "Frequently Asked Questions",
    introText: "Common questions about working with Avorria, our services, pricing, and what results to expect.",
    schemaType: "faq",
  },
  "/why-avorria": {
    title: "Why Avorria | What Makes Us Different | Avorria",
    description: "Why businesses choose Avorria over traditional agencies. Performance-first approach, transparent reporting, and senior-led strategy.",
    canonical: `${SITE_URL}/why-avorria`,
    h1: "Why Avorria",
    introText: "Built by practitioners who got tired of the agency model. Here's what makes Avorria different — and why it matters for your business.",
    schemaType: "website",
  },
  "/reporting": {
    title: "Reporting & Dashboards | Live Marketing Analytics | Avorria",
    description: "Live marketing dashboards and reporting that connect channels to revenue. See what's working without the monthly report theatre.",
    canonical: `${SITE_URL}/reporting`,
    h1: "Reporting & Dashboards",
    introText: "Live dashboards and transparent reporting that tie every marketing channel to pipeline and revenue. No vanity metrics.",
    schemaType: "service",
  },
  "/locations": {
    title: "Locations | SEO & Digital Marketing Across UK, USA & Beyond | Avorria",
    description: "Avorria serves businesses across the UK, USA, Australia, Canada, and New Zealand. Find location-specific digital marketing services near you.",
    canonical: `${SITE_URL}/locations`,
    h1: "Our Locations",
    introText: "Avorria serves businesses across the UK, USA, Australia, Canada, and New Zealand with local expertise and global capability.",
    schemaType: "website",
  },
  "/industries": {
    title: "Industries We Serve | Sector-Specific Digital Marketing | Avorria",
    description: "Industry-specific digital marketing for trades, professional services, B2B SaaS, ecommerce, and multi-location brands. Strategies built for your sector.",
    canonical: `${SITE_URL}/industries`,
    h1: "Industries We Serve",
    introText: "Sector-specific digital marketing strategies for trades, professional services, B2B SaaS, ecommerce, and multi-location brands.",
    schemaType: "website",
  },
  "/websites-we-fire": {
    title: "Websites We'd Fire | Common Website Mistakes | Avorria",
    description: "The most common website mistakes that kill conversions. See if your site is guilty — and what to do about it.",
    canonical: `${SITE_URL}/websites-we-fire`,
    h1: "Websites We'd Fire",
    introText: "A brutally honest look at the most common website mistakes that kill conversions, credibility, and search rankings.",
    schemaType: "website",
  },
  "/agency-teardown": {
    title: "Agency Teardown | Audit Your Current Agency | Avorria",
    description: "Is your current marketing agency actually delivering? Use our agency teardown framework to find out what's working and what's wasted budget.",
    canonical: `${SITE_URL}/agency-teardown`,
    h1: "Agency Teardown",
    introText: "A structured framework to evaluate whether your current marketing agency is delivering real results or just noise.",
    schemaType: "website",
  },

  // ------------------------------ Pillar Pages ------------------------------
  "/seo-agency": {
    title: "SEO Agency | Performance-Focused SEO Services | Avorria",
    description: "Avorria is a performance-focused SEO agency for B2B and service businesses. Technical SEO, content strategy, and link building engineered for revenue.",
    canonical: `${SITE_URL}/seo-agency`,
    h1: "SEO Agency",
    introText: "A performance-focused SEO agency that builds organic growth systems for serious businesses. Technical foundations, commercial content, and measurable results.",
    schemaType: "service",
  },
  "/paid-media-agency": {
    title: "Paid Media Agency | Google Ads & Meta Ads Management | Avorria",
    description: "Paid media agency managing Google Ads, Meta Ads, and LinkedIn campaigns for B2B and service businesses. ROI-focused, not impression-obsessed.",
    canonical: `${SITE_URL}/paid-media-agency`,
    h1: "Paid Media Agency",
    introText: "A paid media agency that manages Google Ads, Meta, and LinkedIn campaigns around pipeline and revenue — not vanity metrics.",
    schemaType: "service",
  },
  "/digital-marketing-agency": {
    title: "Digital Marketing Agency | Full-Service Growth Partner | Avorria",
    description: "Full-service digital marketing agency for B2B and service businesses. SEO, paid media, web design, and content under one roof with proper attribution.",
    canonical: `${SITE_URL}/digital-marketing-agency`,
    h1: "Digital Marketing Agency",
    introText: "Full-service digital marketing for businesses that want pipeline, not noise. SEO, paid media, web, and content with unified tracking and attribution.",
    schemaType: "service",
  },

  // ------------------------------ Tool Pages ------------------------------
  "/tools": {
    title: "Free Marketing Tools | Website Audit & Estimator | Avorria",
    description: "Free digital marketing tools including website health checks, SEO audits, and project estimators. No sign-up required.",
    canonical: `${SITE_URL}/tools`,
    h1: "Free Marketing Tools",
    introText: "Practical marketing tools to assess your website health, estimate project scope, and audit your SEO — completely free.",
    schemaType: "website",
  },
  "/website-health-check": {
    title: "Free Website Health Check | Performance & SEO Audit | Avorria",
    description: "⚡ Instant results  ·  🛡️ Your data is safe",
    canonical: `${SITE_URL}/website-health-check`,
    h1: "Website Health Check",
    introText: "Check your website's performance, SEO health, accessibility, and conversion potential in minutes. Free, instant, actionable.",
    schemaType: "website",
  },
  "/project-estimator": {
    title: "Project Estimator | Digital Marketing Budget Calculator | Avorria",
    description: "Estimate your digital marketing project costs. Get ballpark pricing for SEO, web design, paid media and content marketing projects.",
    canonical: `${SITE_URL}/project-estimator`,
    h1: "Project Estimator",
    introText: "Get a ballpark estimate for your digital marketing project. SEO, web design, paid media — scoped to your needs.",
    schemaType: "website",
  },
  "/free-seo-website-audit": {
    title: "Free SEO & Website Audit | Comprehensive Site Analysis | Avorria",
    description: "Get a free comprehensive SEO and website audit. Technical issues, content gaps, backlink analysis, and actionable recommendations.",
    canonical: `${SITE_URL}/free-seo-website-audit`,
    h1: "Free SEO & Website Audit",
    introText: "A comprehensive audit of your website's SEO health, technical foundations, content gaps, and conversion potential. Free and no-obligation.",
    schemaType: "website",
  },
  "/audit-funnel": {
    title: "Free SEO Audit | Quick Website Analysis | Avorria",
    description: "Get a quick SEO audit of your website. Enter your URL and get instant insights into your site's SEO performance.",
    canonical: `${SITE_URL}/audit-funnel`,
    h1: "Quick SEO Audit",
    introText: "Enter your URL for a quick analysis of your website's SEO health and performance.",
    schemaType: "website",
  },
  "/web-design/studio": {
    title: "Web Design Studio | Interactive Design Experience | Avorria",
    description: "Explore Avorria's web design studio. See our design process, portfolio, and interactive previews of conversion-focused websites.",
    canonical: `${SITE_URL}/web-design/studio`,
    h1: "Web Design Studio",
    introText: "An interactive look at how Avorria designs and builds conversion-focused websites for service businesses.",
    schemaType: "website",
  },

  // ------------------------------ Legal Pages ------------------------------
  "/privacy": {
    title: "Privacy Policy | Avorria",
    description: "Avorria's privacy policy. How we collect, use, and protect your personal data.",
    canonical: `${SITE_URL}/privacy`,
    h1: "Privacy Policy",
    introText: "How Avorria collects, uses, and protects your personal data. Last updated 2025.",
    schemaType: "website",
  },
  "/terms": {
    title: "Terms of Service | Avorria",
    description: "Avorria's terms of service. The terms and conditions governing use of our website and services.",
    canonical: `${SITE_URL}/terms`,
    h1: "Terms of Service",
    introText: "The terms and conditions governing use of the Avorria website and services.",
    schemaType: "website",
  },
  "/sitemap": {
    title: "Sitemap | Avorria",
    description: "HTML sitemap for Avorria. Browse all pages including services, locations, resources, and tools.",
    canonical: `${SITE_URL}/sitemap`,
    h1: "Sitemap",
    introText: "Browse all pages on the Avorria website organised by category.",
    schemaType: "website",
  },
};

// ------------------------------ Resource Pages ------------------------------
interface ResourceMeta {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  summary: string;
  isPillar: boolean;
}

const resourcesMeta: ResourceMeta[] = [
  { slug: "seo-for-real-businesses", metaTitle: "The No-Bullshit Guide to SEO for Real Businesses | Avorria", metaDescription: "SEO explained for business owners who are tired of agency noise. Learn what actually drives leads and revenue, and how to spot when you're being sold snake oil.", title: "The No-Bullshit Guide to SEO for Real Businesses", summary: "SEO explained without the smoke and mirrors. What actually works, what's a waste of budget, and how to know if your current agency is delivering.", isPillar: true },
  { slug: "high-converting-websites-service-businesses", metaTitle: "High-Converting Websites: A Practical Playbook | Avorria", metaDescription: "How to build a service business website that actually converts visitors into leads. No filler, no awards — just structure, copy and design that drives pipeline.", title: "High-Converting Websites: A Practical Playbook", summary: "How to build a service business website that actually converts visitors into leads.", isPillar: true },
  { slug: "marketing-analytics-that-drive-decisions", metaTitle: "Marketing Analytics That Actually Drive Decisions | Avorria", metaDescription: "How to set up marketing analytics that drive real business decisions. GA4, attribution, dashboards, and reporting — without the complexity theatre.", title: "Marketing Analytics That Actually Drive Decisions", summary: "How to set up marketing analytics that drive real business decisions.", isPillar: true },
  { slug: "local-seo-dominate-your-city", metaTitle: "Local SEO: How to Dominate Your City | Avorria", metaDescription: "A practical guide to local SEO for service businesses. Google Business Profile, local citations, reviews, and location pages that actually drive enquiries.", title: "Local SEO: How to Dominate Your City", summary: "A practical guide to local SEO for service businesses.", isPillar: true },
  { slug: "technical-seo-checklist-non-developers", metaTitle: "Technical SEO Checklist for Non-Developers | Avorria", metaDescription: "A plain-English technical SEO checklist for business owners. Site speed, indexing, mobile, schema — what to check and what to brief your developer to fix.", title: "Technical SEO Checklist for Non-Developers", summary: "A plain-English technical SEO checklist for business owners.", isPillar: false },
  { slug: "landing-page-anatomy", metaTitle: "Landing Page Anatomy: What Goes Where and Why | Avorria", metaDescription: "The exact landing page structure that converts at 5-12% for service businesses. Every section explained with examples and common mistakes to avoid.", title: "Landing Page Anatomy: What Goes Where and Why", summary: "The exact landing page structure that converts for service businesses.", isPillar: false },
  { slug: "website-redesign-vs-optimisation", metaTitle: "Website Redesign vs Optimisation: A Decision Framework | Avorria", metaDescription: "Should you redesign your website or optimise what you have? A practical framework for making the right call based on data, not gut feeling.", title: "Website Redesign vs Optimisation: A Decision Framework", summary: "Should you redesign your website or optimise what you have?", isPillar: false },
  { slug: "google-ads-service-businesses", metaTitle: "Google Ads for Service Businesses: A Straight-Talk Starter Guide | Avorria", metaDescription: "How to set up Google Ads that actually generate leads for service businesses. Campaign structure, keyword strategy, landing pages, and budget allocation explained.", title: "Google Ads for Service Businesses", summary: "How to set up Google Ads that actually generate leads for service businesses.", isPillar: false },
  { slug: "meta-ads-vs-google-ads", metaTitle: "Meta Ads vs Google Ads: Where to Spend First | Avorria", metaDescription: "Should you spend your first ad budget on Meta or Google? A practical comparison for service businesses, with clear guidance on where to invest first.", title: "Meta Ads vs Google Ads: Where to Spend First", summary: "A practical comparison for service businesses deciding where to spend first.", isPillar: false },
  { slug: "ga4-setup-guide", metaTitle: "GA4 Setup Guide: What to Track From Day One | Avorria", metaDescription: "A practical GA4 setup guide for business owners. What to track, how to configure it, and the common mistakes that make your data useless.", title: "GA4 Setup Guide: What to Track From Day One", summary: "A practical GA4 setup guide for business owners.", isPillar: false },
  { slug: "how-to-brief-marketing-agency", metaTitle: "How to Brief a Marketing Agency (Without Wasting Everyone's Time) | Avorria", metaDescription: "How to write a marketing agency brief that actually works. Template included, plus the common mistakes that lead to bad proposals and wasted budgets.", title: "How to Brief a Marketing Agency", summary: "How to write a marketing agency brief that actually works.", isPillar: false },
];

function generateResourceRoutes(): Record<string, RouteMetadata> {
  const routes: Record<string, RouteMetadata> = {};
  for (const r of resourcesMeta) {
    routes[`/resources/${r.slug}`] = {
      title: r.metaTitle,
      description: r.metaDescription,
      canonical: `${SITE_URL}/resources/${r.slug}`,
      h1: r.title,
      introText: r.summary,
      schemaType: "article",
    };
  }
  return routes;
}

// ------------------------------ Service-Industry Landing Pages ------------------------------
interface IndustryPageMeta {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
}

const industryPagesMeta: IndustryPageMeta[] = [
  { slug: "seo-trades-home-services", title: "SEO for Trades & Home Services", metaTitle: "SEO for Trades & Home Services | Avorria", metaDescription: "SEO for plumbers, electricians, HVAC and home services that fills your diary. Local SEO strategy, Google Business Profile optimization and conversion tracking.", heroHeadline: "SEO for trades & home services that fills your diary, not just your rankings." },
  { slug: "seo-professional-services", title: "SEO for Professional Services", metaTitle: "SEO for Professional Services | Avorria", metaDescription: "SEO for law firms, accountants, consultants and professional services. Attract better-fit clients through commercial keyword targeting and content strategy.", heroHeadline: "SEO for professional services that attracts better-fit clients." },
  { slug: "seo-b2b-saas", title: "SEO for B2B SaaS", metaTitle: "SEO for B2B SaaS | Avorria", metaDescription: "SEO for B2B SaaS companies. Product-led content, technical SEO at scale, and organic growth strategy tied to MRR and pipeline.", heroHeadline: "SEO for B2B SaaS that drives signups and pipeline." },
  { slug: "seo-ecommerce-brands", title: "SEO for Ecommerce Brands", metaTitle: "SEO for Ecommerce Brands | Avorria", metaDescription: "Ecommerce SEO that drives revenue. Product page optimisation, category structure, technical SEO and content strategy for online retailers.", heroHeadline: "Ecommerce SEO that drives revenue, not just traffic." },
  { slug: "seo-multi-location-brands", title: "SEO for Multi-Location Brands", metaTitle: "SEO for Multi-Location Brands | Avorria", metaDescription: "Multi-location SEO for franchises and chains. Local pages, Google Business Profile management, and unified strategy across locations.", heroHeadline: "SEO for multi-location brands that scales." },
  { slug: "seo-london", title: "SEO Agency London", metaTitle: "SEO Agency London | Performance-Focused SEO | Avorria", metaDescription: "London SEO agency that brings in leads, not just rankings. Technical SEO, content strategy and tracking that shows real business impact.", heroHeadline: "SEO in London that actually brings in leads." },
  { slug: "web-design-trades", title: "Web Design for Trades", metaTitle: "Web Design for Trades & Home Services | Avorria", metaDescription: "Web design for tradespeople that generates enquiries. Fast, mobile-friendly websites built to convert visitors into booked jobs.", heroHeadline: "Web design for trades that generates enquiries." },
  { slug: "paid-media-professional-services", title: "Paid Media for Professional Services", metaTitle: "Paid Media for Professional Services | Avorria", metaDescription: "Paid media for law firms, accountants and consultants. Google Ads and LinkedIn campaigns built around qualified enquiries.", heroHeadline: "Paid media for professional services that delivers qualified leads." },
  { slug: "seo-agency-sheffield", title: "SEO Agency Sheffield", metaTitle: "SEO Agency Sheffield | Avorria", metaDescription: "Sheffield SEO agency delivering results-driven organic growth for local and national businesses.", heroHeadline: "SEO in Sheffield that delivers measurable results." },
  { slug: "seo-agency-london", title: "SEO Agency London", metaTitle: "SEO Agency London | Avorria", metaDescription: "London SEO agency focused on pipeline and revenue, not vanity rankings.", heroHeadline: "SEO agency in London focused on revenue." },
  { slug: "web-design-sheffield", title: "Web Design Sheffield", metaTitle: "Web Design Sheffield | Avorria", metaDescription: "Sheffield web design that converts visitors into customers. Fast, modern websites for local businesses.", heroHeadline: "Web design in Sheffield that converts." },
  { slug: "digital-marketing-agency-yorkshire", title: "Digital Marketing Agency Yorkshire", metaTitle: "Digital Marketing Agency Yorkshire | Avorria", metaDescription: "Yorkshire digital marketing agency for businesses that want pipeline, not noise.", heroHeadline: "Digital marketing for Yorkshire businesses." },
  { slug: "digital-marketing-agency-uk", title: "Digital Marketing Agency UK", metaTitle: "Digital Marketing Agency UK | Avorria", metaDescription: "UK digital marketing agency delivering SEO, paid media, web design and analytics for growth-focused businesses.", heroHeadline: "UK digital marketing agency for serious teams." },
  { slug: "web-design-automotive", title: "Web Design for Automotive", metaTitle: "Web Design for Automotive & Garages | Avorria", metaDescription: "Web design for automotive businesses. Conversion-focused websites for garages, dealerships and auto repair shops.", heroHeadline: "Web design for automotive businesses." },
  { slug: "web-design-garages", title: "Web Design for Garages", metaTitle: "Web Design for Garages & Auto Repair | Avorria", metaDescription: "Web design for garages and auto repair shops. Mobile-friendly, fast websites that generate bookings.", heroHeadline: "Web design for garages that generates bookings." },
  { slug: "web-design-facilities-management", title: "Web Design for Facilities Management", metaTitle: "Web Design for Facilities Management | Avorria", metaDescription: "Web design for facilities management companies. Professional websites that position your business and generate enquiries.", heroHeadline: "Web design for facilities management." },
];

function generateIndustryRoutes(): Record<string, RouteMetadata> {
  const routes: Record<string, RouteMetadata> = {};
  for (const p of industryPagesMeta) {
    routes[`/lp/${p.slug}`] = {
      title: p.metaTitle,
      description: p.metaDescription,
      canonical: `${SITE_URL}/lp/${p.slug}`,
      h1: p.title,
      introText: p.heroHeadline,
      schemaType: "service",
    };
  }
  return routes;
}

// Location data (standalone, no TS imports from @/ at build-time)
export const locationList = [
  "london", "manchester", "birmingham", "leeds", "liverpool", "edinburgh", "glasgow",
  "bristol", "newcastle", "nottingham", "chesterfield", "derby", "derbyshire", "mansfield",
  "leicester", "cardiff", "sheffield", "yorkshire", "uk",
  "new-york", "los-angeles", "chicago", "san-francisco", "boston", "miami", "austin",
  "denver", "seattle", "atlanta", "las-vegas",
  "sydney", "melbourne", "brisbane", "perth", "adelaide", "gold-coast", "canberra", "hobart",
  "auckland", "wellington",
  "toronto", "vancouver", "montreal",
];

const locationCityMap: Record<string, string> = {
  "london": "London", "manchester": "Manchester", "birmingham": "Birmingham",
  "leeds": "Leeds", "liverpool": "Liverpool", "edinburgh": "Edinburgh",
  "glasgow": "Glasgow", "bristol": "Bristol", "newcastle": "Newcastle",
  "nottingham": "Nottingham", "chesterfield": "Chesterfield", "derby": "Derby",
  "derbyshire": "Derbyshire", "mansfield": "Mansfield", "leicester": "Leicester",
  "cardiff": "Cardiff", "sheffield": "Sheffield", "yorkshire": "Yorkshire", "uk": "UK",
  "new-york": "New York", "los-angeles": "Los Angeles", "chicago": "Chicago",
  "san-francisco": "San Francisco", "boston": "Boston", "miami": "Miami",
  "austin": "Austin", "denver": "Denver", "seattle": "Seattle", "atlanta": "Atlanta",
  "las-vegas": "Las Vegas",
  "sydney": "Sydney", "melbourne": "Melbourne", "brisbane": "Brisbane",
  "perth": "Perth", "adelaide": "Adelaide", "gold-coast": "Gold Coast",
  "canberra": "Canberra", "hobart": "Hobart",
  "auckland": "Auckland", "wellington": "Wellington",
  "toronto": "Toronto", "vancouver": "Vancouver", "montreal": "Montreal",
};

const geoServices = [
  { urlSlug: "seo-agency", name: "SEO Agency", serviceSlug: "seo" },
  { urlSlug: "web-design", name: "Web Design", serviceSlug: "web-design" },
  { urlSlug: "paid-media-agency", name: "Paid Media Agency", serviceSlug: "paid-media" },
  { urlSlug: "digital-marketing-agency", name: "Digital Marketing Agency", serviceSlug: "digital-marketing" },
];

function generateGeoRoutes(): Record<string, RouteMetadata> {
  const routes: Record<string, RouteMetadata> = {};

  const metaTitlePatterns: Record<string, (city: string) => string> = {
    seo: (city) => `SEO Agency ${city} | Performance-Focused SEO | Avorria`,
    "web-design": (city) => `Web Design ${city} | Conversion-Focused Websites | Avorria`,
    "paid-media": (city) => `Paid Media Agency ${city} | Google & Meta Ads | Avorria`,
    "digital-marketing": (city) => `Digital Marketing Agency ${city} | Full-Funnel Growth | Avorria`,
  };

  const metaDescPatterns: Record<string, (city: string) => string> = {
    seo: (city) => `${city} SEO agency that brings in leads, not just rankings. Technical SEO, content strategy and tracking that shows real business impact.`,
    "web-design": (city) => `${city} web design that makes your site behave like a sales asset. Sharp design that converts visitors into enquiries and orders.`,
    "paid-media": (city) => `${city} paid media agency that delivers ROI. Google Ads, Meta Ads and LinkedIn campaigns built around leads and revenue.`,
    "digital-marketing": (city) => `${city} digital marketing agency for teams who want pipeline, not noise. SEO, paid media, web and content strategy with clear tracking.`,
  };

  const h1Patterns: Record<string, (city: string) => string> = {
    seo: (city) => `SEO Agency in ${city}`,
    "web-design": (city) => `Web Design in ${city}`,
    "paid-media": (city) => `Paid Media Agency in ${city}`,
    "digital-marketing": (city) => `Digital Marketing Agency in ${city}`,
  };

  for (const loc of locationList) {
    const city = locationCityMap[loc] || loc;
    for (const svc of geoServices) {
      const path = `/${svc.urlSlug}/${loc}`;
      routes[path] = {
        title: metaTitlePatterns[svc.serviceSlug](city),
        description: metaDescPatterns[svc.serviceSlug](city),
        canonical: `${SITE_URL}${path}`,
        h1: h1Patterns[svc.serviceSlug](city),
        introText: `Avorria is a performance-focused ${svc.name.toLowerCase()} for businesses in ${city}. We deliver measurable results, not vanity metrics.`,
        schemaType: "local-business",
      };
    }
  }

  return routes;
}

// ------------------------------ Registry ------------------------------

export function getAllRouteMetadata(): Record<string, RouteMetadata> {
  return {
    ...coreRoutes,
    ...generateResourceRoutes(),
    ...generateIndustryRoutes(),
    ...generateGeoRoutes(),
  };
}

// Export for quick access
export const routeMetadata = getAllRouteMetadata();
export { SITE_URL, DEFAULT_OG_IMAGE };
