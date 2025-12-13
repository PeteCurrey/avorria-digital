import { LandingPage } from "@/types/landingPage";
import { getServiceBySlug } from "./services";
import { getIndustryBySlug } from "./industries";
import { getLocationBySlug } from "./locations";
import { serviceLocationLandingPages, getServiceLocationPageBySlug } from "./serviceLocationLandingPages";

export const landingPages: LandingPage[] = [
  // SEO for Trades & Home Services
  {
    id: "seo-trades-home-services",
    title: "SEO for Trades & Home Services",
    slug: "seo-trades-home-services",
    type: "service-industry",
    service: getServiceBySlug("seo")!,
    industry: getIndustryBySlug("trades-home-services")!,
    heroHeadline: "SEO for trades & home services that fills your diary, not just your rankings.",
    heroSubheadline: "We help plumbers, electricians, HVAC, roofers and home services win the local searches that turn into actual jobs – with pages and tracking set up to prove it.",
    primaryCTA: "Get a trades SEO strategy call",
    secondaryCTA: "Request a local SEO & website audit",
    problemBullets: [
      "You're buried under national directories and lead brokers in Google.",
      "You rank for your brand name, but not for the jobs you actually want.",
      "Your site gets visits, but most people bounce or never pick up the phone.",
      "Google Business Profile is half-filled, outdated or full of random photos.",
      "You're paying for ads or SEO with no clear view of which calls came from where.",
    ],
    solutionBullets: [
      "Local SEO strategy focused on the jobs, locations and margins that matter.",
      "Proper service-area pages and local landing pages that actually convert.",
      "Google Business Profile optimisation and reviews strategy.",
      "Tracking on calls, forms and quote requests so you can see which channels pay.",
      "Simple dashboards you or your office manager can actually understand.",
    ],
    keyMetrics: [
      {
        value: "+74%",
        label: "Local Enquiries",
        description: "Increase in local enquiries in 6 months after rebuilding location pages",
      },
      {
        value: "+36%",
        label: "Tracked Calls",
        description: "More calls tracked back to SEO after fixing Google Business profiles",
      },
      {
        value: "-28%",
        label: "Lead Cost",
        description: "Lead cost down by shifting focus from lead brokers to owned channels",
      },
    ],
    testimonialSnippet: {
      quote: "We'd been relying on word of mouth and some random ads. Once the local pages and profiles were sorted, the phones picked up – and we actually knew which jobs came from SEO vs everything else.",
      author: "Mark Thompson",
      role: "Owner",
      company: "Thompson Heating & Plumbing",
    },
    faqList: [
      {
        question: "We're a small team – is SEO overkill for us?",
        answer: "Not if you pick your battles. We focus on the services and areas that bring the best jobs, not trying to rank for every generic term in the country.",
      },
      {
        question: "We already get leads from Checkatrade/lead brokers. Why bother?",
        answer: "Those platforms will always take their cut. Building your own SEO assets means more direct enquiries, better margins and not being held hostage by a middleman.",
      },
      {
        question: "Can you handle multiple branches/areas?",
        answer: "Yes. We build a sensible structure for multiple locations so Google – and customers – know who to call where.",
      },
      {
        question: "How do we know it's working?",
        answer: "We track calls, forms and quote requests by channel, so you can see exactly what SEO is doing for your pipeline.",
      },
    ],
    targetKeyword: "seo for trades",
    metaTitle: "SEO for Trades & Home Services | Avorria",
    metaDescription: "SEO for plumbers, electricians, HVAC and home services that fills your diary. Local SEO strategy, Google Business Profile optimization and conversion tracking.",
    relatedCaseStudies: ["multi-location-web-design", "home-services-local-seo"],
    relatedArticles: ["local-seo-home-services", "website-conversion-tips-trades"],
  },

  // SEO for Professional Services
  {
    id: "seo-professional-services",
    title: "SEO for Professional Services",
    slug: "seo-professional-services",
    type: "service-industry",
    service: getServiceBySlug("seo")!,
    industry: getIndustryBySlug("professional-services")!,
    heroHeadline: "SEO for professional services that attracts better-fit clients, not more tyre-kickers.",
    heroSubheadline: "We design SEO around how serious buyers research firms like yours – and connect organic visibility to qualified enquiries, not random traffic.",
    primaryCTA: "Book a professional services SEO call",
    secondaryCTA: "Request an SEO & website audit",
    problemBullets: [
      "You get plenty of contact form spam but few serious enquiries.",
      "You rank for vague 'informational' searches that never turn into work.",
      "Your site reads like a brochure, not a trusted advisor.",
      "There's no clear path from content to enquiry, just a lonely 'contact us' in the footer.",
      "Partners want to see the commercial impact, not just rankings.",
    ],
    solutionBullets: [
      "Keyword strategy focused on high-intent, 'ready to talk' search terms.",
      "Service and sector pages that explain outcomes, not just credentials.",
      "Thought-leadership and guides that feed real enquiries, not vanity metrics.",
      "Clear, professional conversion paths (book a consultation, request a review, etc.).",
      "Reporting that links organic visits to qualified leads and proposals.",
    ],
    keyMetrics: [
      {
        value: "+61%",
        label: "Qualified Enquiries",
        description: "Increase in qualified enquiries for a specialist B2B firm in 8 months",
      },
      {
        value: "2x",
        label: "Organic Leads",
        description: "Doubling of organic leads from C-suite personas after restructuring content",
      },
      {
        value: "Shorter",
        label: "Sales Cycles",
        description: "Shorter sales cycles when prospects arrive pre-educated via SEO content",
      },
    ],
    testimonialSnippet: {
      quote: "SEO used to feel like a black box. We now know exactly which topics and pages are driving decent enquiries – and which to stop wasting time on.",
      author: "Claire Barton",
      role: "Partner",
      company: "Barton Legal Partners",
    },
    faqList: [
      {
        question: "We have a long sales cycle – does SEO still help?",
        answer: "Yes. SEO is perfect for educating buyers early and mid-funnel, then capturing them when they're ready to engage – provided it's structured around your real buying journey.",
      },
      {
        question: "Are we going to have to write endless content?",
        answer: "Not unless it's justified. We focus on high-impact pieces and can handle planning, briefs and production with your team's input.",
      },
      {
        question: "How do we avoid attracting the wrong type of client?",
        answer: "Positioning and messaging. We shape topics, language and calls-to-action so your ideal client recognises themselves – and the wrong ones self-select out.",
      },
      {
        question: "Can you work around compliance and brand guidelines?",
        answer: "Yes. We're used to operating inside regulated environments and structured sign-off processes.",
      },
    ],
    targetKeyword: "seo for professional services",
    metaTitle: "SEO for Professional Services | Avorria",
    metaDescription: "SEO for law firms, consultancies and professional services that attracts better-fit clients. High-intent keyword strategy and conversion-focused content.",
    relatedCaseStudies: ["professional-services-seo", "legal-services-seo-revenue"],
    relatedArticles: ["professional-services-content", "seo-roi-measurement"],
  },

  // SEO for B2B SaaS
  {
    id: "seo-b2b-saas",
    title: "SEO for B2B SaaS",
    slug: "seo-b2b-saas",
    type: "service-industry",
    service: getServiceBySlug("seo")!,
    industry: getIndustryBySlug("b2b-saas")!,
    heroHeadline: "B2B SaaS SEO that feeds your pipeline, not just your blog.",
    heroSubheadline: "We build SEO strategies around your ICP, pain points and product, then tie them into demos, trials and opportunities – not just 'traffic growth'.",
    primaryCTA: "Talk B2B SaaS SEO",
    secondaryCTA: "Request a SaaS SEO audit",
    problemBullets: [
      "You're ranking for top-of-funnel queries that never turn into trials.",
      "Your blog is a random collection of topics, not structured demand capture.",
      "There's no clear bridge from SEO content to product pages and onboarding.",
      "Attribution between content, trials and closed-won is a mess.",
      "You get lots of sign-ups, few real users.",
    ],
    solutionBullets: [
      "ICP-focused keyword & topic mapping (by persona, problem, and stage).",
      "Product-led SEO pages that show the 'job to be done', not just features.",
      "Playbooks and use case hubs that link to demos and trials.",
      "Clean tracking from SEO entry points through to sign-ups and opportunities.",
      "CRO on key pages (pricing, demo, sign-up) to improve trial → SQL.",
    ],
    keyMetrics: [
      {
        value: "2.1x",
        label: "Pipeline",
        description: "Organic-sourced pipeline up in 12 months for a B2B SaaS platform",
      },
      {
        value: "+89%",
        label: "Qualified Sign-ups",
        description: "Increase in product-qualified sign-ups from SEO after restructuring content",
      },
      {
        value: "Better",
        label: "Lead Quality",
        description: "Fewer junk sign-ups, more demo requests from ICP accounts",
      },
    ],
    testimonialSnippet: {
      quote: "We'd spent years writing content. Avorria restructured it around our ICP and product and suddenly SEO became a credible pipeline source, not just a brand activity.",
      author: "David Chen",
      role: "VP Marketing",
      company: "CloudFlow Solutions",
    },
    faqList: [
      {
        question: "Do you do programmatic/at-scale pages?",
        answer: "Where it makes sense, yes – but only if it's aligned to demand and avoids thin, spammy duplication.",
      },
      {
        question: "Can you plug into HubSpot/Salesforce for attribution?",
        answer: "Yes, we can work with your CRM to track SEO-originated sign-ups and opportunities properly.",
      },
      {
        question: "What about international SEO?",
        answer: "We can plan and implement multi-region, multi-language structures where the economics justify it.",
      },
      {
        question: "How quickly can we see impact?",
        answer: "Depending on your starting point, you'll typically see early movement in 2–3 months and compounding gains beyond that.",
      },
    ],
    targetKeyword: "b2b saas seo",
    metaTitle: "B2B SaaS SEO | Pipeline-Focused SEO Services | Avorria",
    metaDescription: "B2B SaaS SEO that feeds your pipeline. ICP-focused keyword strategy, product-led content and clean attribution from SEO to demos and opportunities.",
    relatedCaseStudies: ["saas-paid-media", "professional-services-seo"],
    relatedArticles: ["saas-content-strategy", "attribution-professional-services"],
  },

  // SEO for E-commerce Brands
  {
    id: "seo-ecommerce-brands",
    title: "SEO for E-commerce Brands",
    slug: "seo-ecommerce-brands",
    type: "service-industry",
    service: getServiceBySlug("seo")!,
    industry: getIndustryBySlug("ecommerce-brands")!,
    heroHeadline: "E-commerce SEO that moves revenue, not just rankings.",
    heroSubheadline: "We fix structure, categories and on-site SEO so that more of your organic traffic turns into actual orders – and we show you the uplift clearly.",
    primaryCTA: "Book an e-commerce SEO call",
    secondaryCTA: "Get an e-commerce SEO audit",
    problemBullets: [
      "Category pages are thin, duplicated or impossible to navigate.",
      "Product pages rely on manufacturer descriptions and look like everyone else's.",
      "You get decent organic sessions but weak add-to-cart and checkout rates.",
      "Faceted navigation and filters are messing with crawl and indexation.",
      "It's hard to tell what SEO is actually worth in revenue.",
    ],
    solutionBullets: [
      "Category structure and internal linking designed for buyers and crawlers.",
      "Upgraded product and category content that actually sells.",
      "Tech clean-up around filters, duplicates, canonicalisation and indexation.",
      "SEO + CRO on key templates to improve add-to-cart, checkout and AOV.",
      "Clear reporting on organic revenue, not just traffic.",
    ],
    keyMetrics: [
      {
        value: "+47%",
        label: "Organic Revenue",
        description: "YoY after restructuring categories and templates",
      },
      {
        value: "+32%",
        label: "Add-to-Cart Rate",
        description: "From organic sessions after CRO on key pages",
      },
      {
        value: "Better",
        label: "Visibility",
        description: "Fewer orphaned products, more visibility on high-margin categories",
      },
    ],
    testimonialSnippet: {
      quote: "We'd been chasing random keywords for years. Once the structure and templates were sorted, organic revenue finally started to look like the traffic graphs.",
      author: "Emma Caldwell",
      role: "E-commerce Director",
      company: "UrbanThread",
    },
    faqList: [
      {
        question: "Which platforms do you work with?",
        answer: "Shopify, WooCommerce and most custom stacks. If your platform is genuinely holding you back, we'll say so.",
      },
      {
        question: "Can you handle large catalogues?",
        answer: "Yes – but we prioritise ruthlessly. Not every product needs bespoke SEO; categories and key SKUs come first.",
      },
      {
        question: "Do you handle content and dev changes?",
        answer: "We can implement directly or provide dev-ready and content-ready briefs for your internal team.",
      },
      {
        question: "How do you measure success?",
        answer: "Organic revenue, assisted revenue, and improvements in key conversion steps – not just traffic volume.",
      },
    ],
    targetKeyword: "ecommerce seo",
    metaTitle: "E-commerce SEO Services | Revenue-Focused SEO | Avorria",
    metaDescription: "E-commerce SEO that moves revenue. Category structure, product optimization, technical clean-up and conversion-focused SEO strategy.",
    relatedCaseStudies: ["ecommerce-cro", "multi-location-web-design"],
    relatedArticles: ["ecommerce-seo-guide", "category-page-optimization"],
  },

  // SEO for Multi-Location Brands
  {
    id: "seo-multi-location-brands",
    title: "SEO for Multi-Location Brands",
    slug: "seo-multi-location-brands",
    type: "service-industry",
    service: getServiceBySlug("seo")!,
    industry: getIndustryBySlug("multi-location-brands")!,
    heroHeadline: "SEO for multi-location brands that keeps every site and profile pulling its weight.",
    heroSubheadline: "We bring order to the chaos of multiple locations, profiles and pages – so customers find the right place, in the right city, with the right information, every time.",
    primaryCTA: "Discuss multi-location SEO",
    secondaryCTA: "Request a multi-location SEO audit",
    problemBullets: [
      "Each location has a slightly different, sometimes outdated web presence.",
      "Some branches get all the leads; others barely see a contact form.",
      "Google Business Profiles are inconsistent or unmanaged.",
      "Location pages are cloned and thin, so Google doesn't trust them.",
      "Head office has no clear view of which locations win or lose in search.",
    ],
    solutionBullets: [
      "Global/local SEO strategy that respects brand but adapts to local realities.",
      "Structured, unique location pages with local proof and CTAs.",
      "GBProfile optimisation and process for reviews, photos and updates.",
      "Tracking by location (calls and forms) so you know where demand is.",
      "Simple reporting that multi-site leadership can actually use.",
    ],
    keyMetrics: [
      {
        value: "+52%",
        label: "Local Enquiries",
        description: "Across priority locations in 9 months",
      },
      {
        value: "Clear",
        label: "Performance View",
        description: "Clear view of which branches need support and where demand is strongest",
      },
      {
        value: "Better",
        label: "Brand Consistency",
        description: "Brand consistency improved while local relevance went up",
      },
    ],
    testimonialSnippet: {
      quote: "Before, each location did its own thing. Now we have a system – Google knows where to send people, and so do we.",
      author: "Rachel Foster",
      role: "Head of Marketing",
      company: "National Fitness Co.",
    },
    faqList: [
      {
        question: "We already have a centralised CMS – can you work with it?",
        answer: "Yes. We design location templates that scale inside your current stack, then handle the rollout.",
      },
      {
        question: "How do you avoid duplicate content across locations?",
        answer: "By planning unique elements per location (services, proof, FAQs, team) and using smart templates instead of copy-paste pages.",
      },
      {
        question: "Can you train our local teams to maintain profiles?",
        answer: "Yes. We can provide playbooks and light training so branches don't accidentally undo the work.",
      },
      {
        question: "Will this interfere with our paid campaigns?",
        answer: "It should make them more effective – clearer structure and profiles help both SEO and PPC.",
      },
    ],
    targetKeyword: "multi location seo",
    metaTitle: "Multi-Location SEO Services | Avorria",
    metaDescription: "SEO for multi-location brands. Structured local pages, Google Business Profile optimization and location-level tracking and reporting.",
    relatedCaseStudies: ["multi-location-web-design", "home-services-local-seo"],
    relatedArticles: ["multi-location-seo-strategy", "local-seo-guide"],
  },

  // SEO in London
  {
    id: "seo-london",
    title: "SEO in London",
    slug: "seo-london",
    type: "service-location",
    service: getServiceBySlug("seo")!,
    location: getLocationBySlug("london")!,
    heroHeadline: "SEO in London that doesn't vanish into reports",
    heroSubheadline:
      "Technical SEO, content and CRO tuned for London's most competitive sectors. We focus on leads and revenue, not rankings you can't bank.",
    primaryCTA: "Book SEO Strategy Call",
    secondaryCTA: "Get Free London SEO Audit",
    problemBullets: [
      "You've paid for SEO retainers that never translated into leads",
      "Your current agency talks rankings, not revenue attribution",
      "You still don't have clean tracking or clear ROI visibility",
      "Technical issues sit unfixed for months while you get 'strategy' presentations",
      "Content is generic and doesn't match London search intent",
    ],
    solutionBullets: [
      "Technical clean-up and site architecture for large, complex sites",
      "Content clusters mapped to commercial intent and London-specific queries",
      "Conversion fixes on high-traffic pages—not just more traffic",
      "Pipeline-focused dashboards your sales team actually uses",
      "Local SEO integration for multi-location London businesses",
    ],
    keyMetrics: [
      {
        value: "+184%",
        label: "Organic Leads",
        description: "London professional services firm, 6-month engagement",
      },
      {
        value: "£180k",
        label: "Attributed Revenue",
        description: "Legal practice in Central London, 12 months",
      },
      {
        value: "+220%",
        label: "Local Visibility",
        description: "Multi-location home services across London boroughs",
      },
    ],
    testimonialSnippet: {
      quote:
        "Avorria cut through the noise and focused entirely on what mattered for our London market: qualified leads and revenue. Best agency decision we've made.",
      author: "Sarah Mitchell",
      role: "CEO",
      company: "TechFlow Solutions",
    },
    processSteps: [
      {
        title: "London Market Audit",
        description:
          "Technical audit, competitor analysis in your London niche, and opportunity mapping. We identify quick wins specific to London search behavior.",
      },
      {
        title: "Strategy & Quick Wins",
        description:
          "Prioritized roadmap with immediate technical fixes and content gaps. Local SEO setup for London-based businesses.",
      },
      {
        title: "Execute & Optimize",
        description:
          "Technical implementation, content production, link building, and continuous refinement based on London market data.",
      },
    ],
    workingWithYou:
      "We know London is one of the most competitive markets globally for SEO. That's why we combine deep technical work with hyper-local content strategies. Whether you're competing in finance, legal, tech, or trades across London boroughs, we build SEO programs that account for high competition, sophisticated searchers, and the need for clear lead-to-revenue tracking.",
    pricingSnapshot:
      "Typical investment for London SEO engagements: £3,500–£8,000/month depending on competitive intensity and scope. Includes strategy, technical SEO, content, link building, and conversion tracking. Minimum 3-month commitment.",
    faqList: [
      {
        question: "How long until we see results from SEO in London?",
        answer:
          "Technical improvements and on-page optimizations show impact within 30-60 days. Content-driven SEO builds momentum over 3-6 months. London's competitiveness means we prioritize quick wins (conversion fixes, technical cleanup) while building long-term authority.",
      },
      {
        question: "Do you work with businesses across all London boroughs?",
        answer:
          "Yes. We optimize for London-wide visibility and can drill down into specific borough targeting where relevant (e.g., 'plumber in Westminster'). For multi-location businesses, we create location-specific strategies.",
      },
      {
        question: "What makes London SEO different from other UK cities?",
        answer:
          "Higher competition, more sophisticated search behavior, and often higher-value transactions. We adjust keyword strategy, content depth, and link building intensity to match London's market dynamics.",
      },
      {
        question: "How do you handle local SEO for London businesses?",
        answer:
          "Google My Business optimization, local citations, review management, and location-specific content. For service-area businesses, we map coverage across London boroughs and optimize accordingly.",
      },
      {
        question: "Can you help with national SEO from a London base?",
        answer:
          "Absolutely. Many of our London clients target UK-wide or international markets. We treat London as your operational base while building authority and visibility nationally or globally as needed.",
      },
    ],
    targetKeyword: "seo london",
    metaTitle: "SEO in London | Revenue-Focused SEO Services | Avorria",
    metaDescription:
      "SEO in London that drives leads and revenue, not just rankings. Technical SEO, content strategy, and CRO for London's most competitive sectors. Book a strategy call today.",
    relatedCaseStudies: [
      "professional-services-seo",
      "legal-services-seo-revenue",
      "multi-location-web-design",
    ],
    relatedArticles: ["local-seo-guide", "seo-roi-measurement", "technical-seo-audit"],
  },

  // Web Design for Trades & Home Services
  {
    id: "web-design-trades",
    title: "Web Design for Trades & Home Services",
    slug: "web-design-trades",
    type: "service-industry",
    service: getServiceBySlug("web-design")!,
    industry: getIndustryBySlug("trades")!,
    heroHeadline: "Websites for trades that convert calls, not just win design awards",
    heroSubheadline:
      "Built for plumbers, electricians, builders, and home service pros who need more emergency calls and qualified leads—not another pretty site that doesn't ring the phone.",
    primaryCTA: "Book Design Consultation",
    secondaryCTA: "See Trades Examples",
    problemBullets: [
      "Your current site doesn't convert—visitors leave without calling or booking",
      "Mobile experience is clunky when most customers search on their phones",
      "No clear path for emergency calls or urgent jobs",
      "Forms are buried and calls-to-action are weak",
      "The site doesn't rank locally despite serving specific areas",
    ],
    solutionBullets: [
      "Mobile-first design with prominent click-to-call on every page",
      "Emergency booking flows and service area maps",
      "Local SEO baked in: service pages per area, schema markup, fast load times",
      "Trust-building elements: reviews, certifications, before/after galleries",
      "Conversion tracking to measure calls, form fills, and job bookings",
    ],
    keyMetrics: [
      {
        value: "+127%",
        label: "Lead Volume",
        description: "Multi-location plumbing company, 6 months post-launch",
      },
      {
        value: "34%",
        label: "Call Conversion Rate",
        description: "Electrical contractor, mobile-optimized redesign",
      },
      {
        value: "+220%",
        label: "Local Visibility",
        description: "Home services business across service areas",
      },
    ],
    testimonialSnippet: {
      quote:
        "The website redesign wasn't just pretty—it fundamentally changed how customers interact with our business. Call volume doubled and lead quality improved.",
      author: "Michael Reynolds",
      role: "Owner",
      company: "Reynolds Plumbing & Heating",
    },
    processSteps: [
      {
        title: "Discovery & UX Mapping",
        description:
          "Understand your services, service areas, peak seasons, and customer journey. Map out conversion paths for emergency vs. planned work.",
      },
      {
        title: "Design & Prototyping",
        description:
          "Mobile-first designs with strong CTAs, trust signals, and service area clarity. Reviews and feedback before build.",
      },
      {
        title: "Build & Launch",
        description:
          "Fast, modern tech stack. Local SEO setup, tracking, and analytics. Training for your team to update content and manage inquiries.",
      },
    ],
    workingWithYou:
      "We understand trades businesses operate differently. You need calls and bookings, often urgently. Your customers are searching on mobile, comparing options fast, and want reassurance before they pick up the phone. We design sites that speak directly to this reality: clear service descriptions, visible phone numbers, trust signals front and center, and fast load times. Every element is conversion-focused—not award-focused.",
    pricingSnapshot:
      "Typical investment for trades website projects: £4,500–£12,000 one-off for design and build, or £450–£850/month for ongoing maintenance, content updates, and local SEO. Timelines: 4-8 weeks from kickoff to launch.",
    faqList: [
      {
        question: "Do you understand how trades businesses actually get leads?",
        answer:
          "Yes. Most leads come from mobile, often in urgent situations. We design for that reality: click-to-call everywhere, fast load times, clear service areas, and trust signals. No fluff, just conversion-focused layouts.",
      },
      {
        question: "Can you integrate booking or scheduling systems?",
        answer:
          "Absolutely. We integrate with tools like Calendly, ServiceTitan, Jobber, or custom booking forms. If you need emergency vs. scheduled appointment routing, we build that in.",
      },
      {
        question: "What about local SEO?",
        answer:
          "Local SEO is baked into every trades site we build. Service pages for each area you cover, schema markup, Google My Business integration, and fast hosting. We make sure you rank when locals search for your services.",
      },
      {
        question: "Can I update the site myself or add new services?",
        answer:
          "Yes. We build on modern CMS platforms (or static + headless if you want speed). You'll get training and documentation. For ongoing changes, we offer maintenance retainers.",
      },
      {
        question: "How do you handle before/after galleries and reviews?",
        answer:
          "We design custom galleries, integrate review widgets, and can automate review requests post-job. Social proof is critical for trades—we make it prominent and easy to manage.",
      },
    ],
    targetKeyword: "website design for trades",
    metaTitle: "Web Design for Trades & Home Services | Avorria",
    metaDescription:
      "Websites for plumbers, electricians, and home service pros that convert calls and bookings. Mobile-first, local SEO optimized, designed for leads—not awards.",
    relatedCaseStudies: ["multi-location-web-design", "home-services-local-seo"],
    relatedArticles: ["website-conversion-tips-trades", "local-seo-home-services"],
  },

  // Paid Media for Professional Services
  {
    id: "paid-media-professional-services",
    title: "Paid Media for Professional Services",
    slug: "paid-media-professional-services",
    type: "service-industry",
    service: getServiceBySlug("paid-media")!,
    industry: getIndustryBySlug("professional-services")!,
    heroHeadline: "Paid media for professional services that delivers quality, not just volume",
    heroSubheadline:
      "Google Ads, LinkedIn, and Meta campaigns engineered for high-ticket, longer-cycle leads. We optimize for deal size and lead quality—not vanity clicks.",
    primaryCTA: "Book Paid Strategy Call",
    secondaryCTA: "Get Free Audit",
    problemBullets: [
      "Lead volume looks good but quality is terrible—wasting sales time on tire kickers",
      "Cost per lead keeps climbing while conversion rates stagnate",
      "Current agency can't explain how paid leads translate to closed deals",
      "Landing pages are generic and don't pre-qualify prospects",
      "Attribution gaps make it impossible to justify ad spend to leadership",
    ],
    solutionBullets: [
      "Funnel-based campaigns aligned with your sales process and deal cycles",
      "Pre-qualification via landing page copy, forms, and audience targeting",
      "Conversion tracking from first click to closed deal",
      "A/B testing on ad creative, landing pages, and audience segments",
      "Transparent reporting on cost per qualified lead and deal pipeline impact",
    ],
    keyMetrics: [
      {
        value: "3.2x",
        label: "ROAS",
        description: "Professional services firm, Google Ads restructure, 90 days",
      },
      {
        value: "-42%",
        label: "Cost Per Qualified Lead",
        description: "LinkedIn campaign optimization for B2B consultancy",
      },
      {
        value: "+156%",
        label: "Pipeline Value",
        description: "Legal practice, paid media + CRO program, 6 months",
      },
    ],
    testimonialSnippet: {
      quote:
        "Finally, an agency that doesn't treat paid media like a vanity game. They focused on lead quality, attribution, and helping us justify ad spend to the board.",
      author: "James Cooper",
      role: "Marketing Director",
      company: "Premier Legal Group",
    },
    processSteps: [
      {
        title: "Audit & Strategy",
        description:
          "Analyze current campaigns, sales process, deal sizes, and qualification criteria. Identify funnel gaps and attribution issues.",
      },
      {
        title: "Campaign Structure & Launch",
        description:
          "Build campaigns around your buyer journey. Create landing pages, forms, and tracking that pre-qualify leads before they hit your sales team.",
      },
      {
        title: "Optimize & Scale",
        description:
          "Continuous A/B testing, audience refinement, and bid optimization. Monthly reviews tied to closed deals, not just lead counts.",
      },
    ],
    workingWithYou:
      "Professional services firms have complex sales cycles, high deal values, and low tolerance for unqualified leads. We design paid campaigns that respect that reality. Instead of flooding your CRM with junk, we use targeting, copy, and landing page friction to pre-qualify prospects. We track beyond the lead—measuring pipeline contribution and closed revenue. Your sales team will thank you.",
    pricingSnapshot:
      "Typical investment for professional services paid media: £2,500–£6,000/month for management + ad spend (budget varies by firm size and market). Includes campaign setup, landing page optimization, conversion tracking, and monthly reporting tied to deal pipeline.",
    faqList: [
      {
        question: "How do you ensure lead quality, not just lead volume?",
        answer:
          "We use audience targeting, pre-qualification questions in forms, and landing page copy that sets expectations. We optimize for cost per qualified lead—not just cost per lead. Your sales team defines what 'qualified' means, and we build campaigns around that.",
      },
      {
        question: "Can you track paid leads through to closed deals?",
        answer:
          "Yes, if your CRM allows API integration or manual lead tagging. We set up attribution so you can see which campaigns, keywords, and ads are driving actual revenue—not just form fills.",
      },
      {
        question: "Which platform is best: Google Ads, LinkedIn, or Meta?",
        answer:
          "Depends on your audience and deal size. Google Ads works for high-intent searches. LinkedIn excels for B2B and executive targeting. Meta (Facebook/Instagram) can work for awareness and retargeting. We'll recommend based on your buyer profile and budget.",
      },
      {
        question: "What's a realistic timeline to see ROI?",
        answer:
          "For professional services, expect 60-90 days to optimize campaigns and start seeing qualified leads. Full ROI (closed deals) depends on your sales cycle—often 3-6 months. We focus on improving cost per qualified lead and pipeline contribution early.",
      },
      {
        question: "Do you create landing pages and ad creative?",
        answer:
          "Yes. Landing pages are critical for conversion. We design, write, and build landing pages optimized for your buyer persona. Ad creative (copy and imagery) is included. We A/B test everything.",
      },
    ],
    targetKeyword: "paid media for professional services",
    metaTitle: "Paid Media for Professional Services | Avorria",
    metaDescription:
      "Google Ads, LinkedIn, and Meta campaigns for law firms, consultancies, and B2B services. Focused on lead quality, attribution, and deal pipeline—not vanity metrics.",
    relatedCaseStudies: ["saas-paid-media", "legal-services-seo-revenue"],
    relatedArticles: ["paid-media-lead-quality", "attribution-professional-services"],
  },

  // SEO Agency Sheffield
  {
    id: "seo-agency-sheffield",
    title: "SEO Agency Sheffield",
    slug: "seo-agency-sheffield",
    type: "service-location",
    service: getServiceBySlug("seo")!,
    location: getLocationBySlug("sheffield")!,
    heroHeadline: "SEO agency in Sheffield that actually brings in leads, not just rankings.",
    heroSubheadline: "Avorria is a performance-focused SEO partner for Sheffield businesses. We sort your site, content and tracking so you can see – in hard numbers – what organic search is doing for enquiries and revenue.",
    primaryCTA: "Book an SEO call (Sheffield)",
    secondaryCTA: "Get a free SEO & website audit",
    problemBullets: [
      "You've used 'SEO guys' before and all you got was a monthly report and no real change in enquiries.",
      "You rank for your brand name and a few random terms, but not the searches that matter in Sheffield and South Yorkshire.",
      "Your site looks okay, but people don't fill in forms or pick up the phone.",
      "You're spending on ads or directories because SEO has never really been sorted.",
      "Nobody can show you a clear line from SEO to your pipeline.",
    ],
    solutionBullets: [
      "Local and regional SEO strategy around the services and areas that actually make you money.",
      "Technical and on-page clean-up so Google understands what you do and who you do it for.",
      "Service and location pages built for conversion – clear offers, proof and CTAs.",
      "Tracking wired into calls, forms and enquiries so you can see what came from where.",
      "Simple dashboards showing organic leads and pipeline – not just 'visibility'.",
    ],
    keyMetrics: [
      {
        value: "+63%",
        label: "Qualified Enquiries",
        description: "Increase in qualified enquiries in 3 months after fixing structure and key pages",
      },
      {
        value: "+82%",
        label: "Organic Traffic",
        description: "Non-branded organic traffic up over 9 months for a regional service firm",
      },
      {
        value: "Clear View",
        label: "Local Insights",
        description: "Clear view of which Sheffield and South Yorkshire searches actually drive business",
      },
    ],
    testimonialSnippet: {
      quote: "We'd tried a couple of SEO suppliers in Sheffield and got nowhere. Once Avorria rebuilt the structure and pages, our organic leads finally started to look like the reports.",
      author: "",
      role: "",
      company: "",
    },
    faqList: [
      {
        question: "Do we have to be based in Sheffield?",
        answer: "No, but a lot of our clients are in Sheffield and South Yorkshire. If your customers are here, it helps that we understand the market.",
      },
      {
        question: "Can you work alongside our existing web developer?",
        answer: "Yes. We can either implement changes ourselves or provide dev-ready specs and content for your current team.",
      },
      {
        question: "How long until we see results locally?",
        answer: "You'll usually see early movement within 2–3 months and meaningful impact in 4–6, depending on how competitive your space is and where we're starting from.",
      },
      {
        question: "Is this just about Google rankings?",
        answer: "No. It's about leads and revenue. Rankings are a means to that end, not the goal.",
      },
    ],
    targetKeyword: "SEO agency Sheffield",
    metaTitle: "SEO Agency Sheffield | Performance-Focused SEO | Avorria",
    metaDescription: "Sheffield SEO agency that brings in leads, not just rankings. Technical SEO, content strategy and tracking that shows real business impact.",
    relatedCaseStudies: [],
    relatedArticles: [],
  },

  // SEO Agency London
  {
    id: "seo-agency-london",
    title: "SEO Agency London",
    slug: "seo-agency-london",
    type: "service-location",
    service: getServiceBySlug("seo")!,
    location: getLocationBySlug("london")!,
    heroHeadline: "SEO agency in London for teams who are done with vague reports.",
    heroSubheadline: "We work with London-based businesses who want SEO tied directly to pipeline. No buzzword decks – just a clear strategy, proper implementation and reporting you can actually run decisions from.",
    primaryCTA: "Talk to a London SEO strategist",
    secondaryCTA: "Request an SEO & website audit",
    problemBullets: [
      "You're paying London agency retainers for generic work you could have got anywhere.",
      "You get big slide decks, but nobody can say what changed commercially.",
      "You're ranking for content pieces, not the high-intent searches you care about.",
      "Technical issues, Core Web Vitals and architecture keep getting pushed to 'later'.",
      "Leadership wants to know what SEO is really delivering and nobody has a credible answer.",
    ],
    solutionBullets: [
      "London and UK search strategy focused on the products, services and sectors that matter most.",
      "Technical and structural work to remove drag from everything else you do.",
      "Content and on-page strategy that connects SEO directly to funnel stages.",
      "Integrated reporting with your CRM so you see organic-sourced pipeline, not just traffic.",
      "Honest conversations about when to double down and when to cut losses.",
    ],
    keyMetrics: [
      {
        value: "2x",
        label: "Pipeline Growth",
        description: "Organic-sourced pipeline up in 12 months for a London-based B2B services firm",
      },
      {
        value: "+94%",
        label: "Organic Traffic",
        description: "Non-branded organic up after restructuring site architecture and content",
      },
      {
        value: "Board Level",
        label: "Reporting",
        description: "Board-level reporting that finally put SEO alongside other channels in the plan",
      },
    ],
    testimonialSnippet: {
      quote: "We wanted a London partner that felt like an internal growth team. Avorria are the first SEO agency that talks about pipeline and trade-offs, not just rankings.",
      author: "",
      role: "",
      company: "",
    },
    faqList: [
      {
        question: "We already have a global SEO partner – can you focus just on the UK/London side?",
        answer: "Yes. We can operate as the local layer, aligning with global strategy but making sure UK and London performance is actually looked after.",
      },
      {
        question: "Do you handle content and dev or just strategy?",
        answer: "We can do both. If you prefer, we'll act as the strategic/technical layer, briefing your existing content and dev teams.",
      },
      {
        question: "How do you report results?",
        answer: "Via a live-style dashboard and short written summaries. You'll see traffic, leads, pipeline and key pages – not just keyword tables.",
      },
      {
        question: "Are you only for big budgets?",
        answer: "We're best suited to teams already investing in marketing who want to tighten things up. If your total budget is tiny, a lighter, DIY approach may make more sense.",
      },
    ],
    targetKeyword: "SEO agency London",
    metaTitle: "SEO Agency London | Pipeline-Focused SEO Strategy | Avorria",
    metaDescription: "London SEO agency for teams done with vague reports. Clear strategy, proper implementation and reporting tied directly to pipeline and revenue.",
    relatedCaseStudies: [],
    relatedArticles: [],
  },

  // Web Design Sheffield
  {
    id: "web-design-sheffield",
    title: "Web Design Sheffield",
    slug: "web-design-sheffield",
    type: "service-location",
    service: getServiceBySlug("web-design")!,
    location: getLocationBySlug("sheffield")!,
    heroHeadline: "Web design in Sheffield that makes your site behave like a sales asset.",
    heroSubheadline: "We design and build websites for Sheffield businesses that look sharp and convert visitors into enquiries, bookings and orders – with tracking to prove it.",
    primaryCTA: "Talk about a website rebuild (Sheffield)",
    secondaryCTA: "Request a website & funnel teardown",
    problemBullets: [
      "Your site looks 'okay' but doesn't generate enough enquiries from Sheffield or beyond.",
      "It was designed like a brochure, not a sales journey.",
      "There's no clear CTA above the fold, just a menu and a vague strapline.",
      "You're scared to touch anything because nobody quite remembers how it was built.",
      "Every redesign has been about looks, not leads.",
    ],
    solutionBullets: [
      "Homepages and service pages structured around your real offers and process.",
      "Clear CTAs, proof, FAQs and next steps so visitors know exactly what to do.",
      "Fast, mobile-friendly design that doesn't frustrate people.",
      "Clean code and a modern stack your team can actually work with.",
      "Full tracking on forms, calls and key actions so we can improve, not guess.",
    ],
    keyMetrics: [
      {
        value: "+63%",
        label: "Qualified Enquiries",
        description: "Increase in 3 months after a focused homepage and services rebuild",
      },
      {
        value: "+41%",
        label: "Form Completion",
        description: "Form completion rate up after simplifying contact and quote flows",
      },
      {
        value: "Less Bounce",
        label: "Better Engagement",
        description: "Less bounce, more calls from Sheffield and surrounding areas",
      },
    ],
    testimonialSnippet: {
      quote: "We didn't want a flashy agency site, we wanted the phone to ring. Avorria rebuilt our key pages and we saw the difference in weeks, not years.",
      author: "",
      role: "",
      company: "",
    },
    faqList: [
      {
        question: "Do you only do full rebuilds?",
        answer: "No. Sometimes a focused set of changes to structure and key pages is smarter than ripping everything up. We'll tell you which path makes sense.",
      },
      {
        question: "Can you work on our existing platform?",
        answer: "Usually yes. If your platform is genuinely holding you back, we'll recommend a sensible migration – not a vanity rebuild.",
      },
      {
        question: "Who writes the copy?",
        answer: "We can handle it end-to-end, collaborate with you, or give your team detailed wireframes and messaging to work from.",
      },
      {
        question: "Will this help our SEO too?",
        answer: "Almost certainly. Clear structure, good content and fast pages are exactly what both users and search engines want.",
      },
    ],
    targetKeyword: "web design Sheffield",
    metaTitle: "Web Design Sheffield | Conversion-Focused Websites | Avorria",
    metaDescription: "Sheffield web design that makes your site behave like a sales asset. Sharp design that converts visitors into enquiries and orders.",
    relatedCaseStudies: [],
    relatedArticles: [],
  },

  // Digital Marketing Agency Yorkshire
  {
    id: "digital-marketing-agency-yorkshire",
    title: "Digital Marketing Agency Yorkshire",
    slug: "digital-marketing-agency-yorkshire",
    type: "service-location",
    service: getServiceBySlug("digital-marketing")!,
    location: getLocationBySlug("yorkshire")!,
    heroHeadline: "Digital marketing agency in Yorkshire for teams who want pipeline, not noise.",
    heroSubheadline: "Avorria partners with Yorkshire businesses who are done spinning up random campaigns. We connect SEO, paid and web so every pound has a job and every channel is held accountable.",
    primaryCTA: "Book a strategy call (Yorkshire)",
    secondaryCTA: "Request a free audit",
    problemBullets: [
      "You've tried 'someone who does Facebook/Google' and a couple of agencies – everybody talked big, nobody stuck around.",
      "You're spread across multiple suppliers with no joined-up plan.",
      "Reports talk about impressions and clicks, not leads and revenue.",
      "Your website, SEO and ads all feel disconnected.",
      "You're not against spending – you just want to see it work.",
    ],
    solutionBullets: [
      "Joined-up strategy for SEO, paid media and web based on your real commercial targets.",
      "Clear 90-day plans instead of random campaigns.",
      "Fixing tracking and reporting so you can see what's working across Yorkshire and beyond.",
      "A single team that takes responsibility for execution and optimisation.",
      "Regular reviews where we talk ruthless numbers, not vague 'brand activity'.",
    ],
    keyMetrics: [
      {
        value: "2.4x",
        label: "Pipeline Growth",
        description: "Pipeline from inbound up in under a year for a regional services brand",
      },
      {
        value: "-38%",
        label: "Cost Per Lead",
        description: "Cost per qualified lead down by aligning SEO, ads and landing pages",
      },
      {
        value: "Board Buy-In",
        label: "Clear Impact",
        description: "Board finally understood what digital was doing – and funded more of it",
      },
    ],
    testimonialSnippet: {
      quote: "We wanted a Yorkshire partner that would behave like an in-house team. Avorria are the first agency who actually show us how digital ties into revenue.",
      author: "",
      role: "",
      company: "",
    },
    faqList: [
      {
        question: "Do you work with businesses outside Yorkshire?",
        answer: "Yes, but many of our clients are based in Yorkshire or the North and like having a partner who understands the region.",
      },
      {
        question: "Are you full-service?",
        answer: "We focus on what drives pipeline: SEO, paid, web, content and tracking. If you need other specialist work (PR, brand filming etc.), we'll collaborate with partners.",
      },
      {
        question: "Do you do one-off projects or only retainers?",
        answer: "Both. We often start with a focused project (rebuild, audit, fix) then move into ongoing work if it makes sense.",
      },
      {
        question: "How do we get started?",
        answer: "Usually with a free audit or a strategy call. We'll review what you're doing now and tell you where we'd start.",
      },
    ],
    targetKeyword: "digital marketing agency Yorkshire",
    metaTitle: "Digital Marketing Agency Yorkshire | Pipeline-First Strategy | Avorria",
    metaDescription: "Yorkshire digital marketing agency for teams who want pipeline, not noise. Joined-up SEO, paid media and web strategies that drive revenue.",
    relatedCaseStudies: [],
    relatedArticles: [],
  },

  // Digital Marketing Agency UK
  {
    id: "digital-marketing-agency-uk",
    title: "Digital Marketing Agency UK",
    slug: "digital-marketing-agency-uk",
    type: "service-location",
    service: getServiceBySlug("digital-marketing")!,
    location: getLocationBySlug("uk")!,
    heroHeadline: "UK digital marketing partner for businesses who want grown-up conversations about growth.",
    heroSubheadline: "We work with UK-based businesses that are already investing in marketing and want to tighten everything up – strategy, execution, tracking and reporting – under one roof.",
    primaryCTA: "Book a UK strategy call",
    secondaryCTA: "Request a free SEO & website audit",
    problemBullets: [
      "You're working with multiple freelancers/shops and nobody truly owns performance.",
      "Every channel is 'doing something', but no one can clearly explain what it adds up to.",
      "The website isn't built for conversions, but everyone keeps driving paid traffic to it.",
      "Reporting is fragmented and full of noise.",
      "You suspect you're overpaying for underperformance.",
    ],
    solutionBullets: [
      "Clear positioning of channels: what SEO, paid, content and web each own.",
      "90-day plans with specific bets, tests and targets.",
      "Fixing the website and funnel so marketing spend isn't wasted.",
      "Joined-up tracking and dashboards that your leadership team can actually read.",
      "Regular reviews where we recommend what to stop, start and scale.",
    ],
    keyMetrics: [
      {
        value: "Multiple 6-Fig",
        label: "Pipeline Uplift",
        description: "Multiple six-figure pipeline uplift attributed to cleaned-up digital across UK clients",
      },
      {
        value: "Decisive",
        label: "Marketing Meetings",
        description: "Marketing meetings went from chaotic to decisive once the numbers were clear",
      },
      {
        value: "Leadership Buy-In",
        label: "Confidence",
        description: "Leadership confidence increased because they finally understood what was working",
      },
    ],
    testimonialSnippet: {
      quote: "We treat Avorria as our UK growth team. They challenge us, show us the numbers and own the execution. It's exactly what we needed.",
      author: "",
      role: "",
      company: "",
    },
    faqList: [
      {
        question: "Do you specialise in any particular sectors?",
        answer: "We work best with service-led businesses, multi-location brands and B2B companies where leads and pipeline are the main measure of success.",
      },
      {
        question: "Do you lock us into long contracts?",
        answer: "No. We usually recommend a 6–12 month runway to do meaningful work, but we don't hide behind punitive terms.",
      },
      {
        question: "Can you work with our existing in-house team?",
        answer: "Yes. We can be the strategic/technical layer on top of your in-house execution, or take full ownership where you don't have capacity.",
      },
      {
        question: "How do we know if we're a good fit?",
        answer: "If you're already spending and want clarity, discipline and better outcomes from that spend, we're probably aligned. A strategy call will make it obvious either way.",
      },
    ],
    targetKeyword: "digital marketing agency UK",
    metaTitle: "Digital Marketing Agency UK | Full-Funnel Growth Strategy | Avorria",
    metaDescription: "UK digital marketing partner for businesses who want grown-up conversations about growth. Strategy, execution, tracking and reporting under one roof.",
    relatedCaseStudies: [],
    relatedArticles: [],
  },
];

// Combined list of all landing pages (industry + location)
export const allLandingPages: LandingPage[] = [
  ...landingPages,
  ...serviceLocationLandingPages,
];

export const getLandingPageBySlug = (slug: string): LandingPage | undefined => {
  // First check industry/campaign pages
  const industryPage = landingPages.find((lp) => lp.slug === slug);
  if (industryPage) return industryPage;
  
  // Then check service-location pages
  return getServiceLocationPageBySlug(slug);
};

export const getLandingPagesByType = (type: LandingPage["type"]): LandingPage[] => {
  return landingPages.filter((lp) => lp.type === type);
};

export const getLandingPagesByService = (serviceSlug: string): LandingPage[] => {
  return landingPages.filter((lp) => lp.service.slug === serviceSlug);
};
