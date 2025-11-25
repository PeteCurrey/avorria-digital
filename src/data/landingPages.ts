import { LandingPage } from "@/types/landingPage";
import { getServiceBySlug } from "./services";
import { getIndustryBySlug } from "./industries";
import { getLocationBySlug } from "./locations";

export const landingPages: LandingPage[] = [
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
];

export const getLandingPageBySlug = (slug: string): LandingPage | undefined => {
  return landingPages.find((lp) => lp.slug === slug);
};

export const getLandingPagesByType = (type: LandingPage["type"]): LandingPage[] => {
  return landingPages.filter((lp) => lp.type === type);
};

export const getLandingPagesByService = (serviceSlug: string): LandingPage[] => {
  return landingPages.filter((lp) => lp.service.slug === serviceSlug);
};
