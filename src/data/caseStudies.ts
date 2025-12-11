/**
 * Case Studies Data Model
 * 
 * Complete data structure for premium case study presentation
 */

export interface CaseMetric {
  label: string;
  value: string;
  baseline?: string;
  highlight?: boolean;
}

export interface CaseQuote {
  text: string;
  name: string;
  role: string;
  company?: string;
}

export interface CaseTimelineStep {
  phase: string;
  title: string;
  description: string;
  duration?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  sector: string;
  services: string[];
  timeframe: string;
  year: number;
  outcome: 'leads' | 'revenue' | 'traffic' | 'efficiency';
  
  // Hero
  heroMedia: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
  };
  headline: string;
  subheadline: string;
  kpiBadges: CaseMetric[];
  
  // Content
  problem: string;
  approach: CaseTimelineStep[];
  outcomes: CaseMetric[];
  
  // Media
  galleryMedia: {
    type: 'image' | 'video';
    src: string;
    alt: string;
  }[];
  beforeMedia?: string;
  afterMedia?: string;
  
  // Social proof
  quote?: CaseQuote;
  
  // PDF content for download
  pdfContent?: {
    summary: string;
    keyResults: string[];
  };
  
  // Related
  relatedSlugs: string[];
  
  // Featured
  isFeatured?: boolean;
}

// Case studies data
export const caseStudies: CaseStudy[] = [
  {
    slug: "ogn-facility-management",
    title: "One Great Northern (OGN) | Crane Hire Website Redesign & SEO",
    client: "One Great Northern",
    sector: "Crane Hire & Specialist Lifting",
    services: ["Web Design", "SEO", "Content Strategy", "Technical Copywriting"],
    timeframe: "8 months",
    year: 2024,
    outcome: "leads",
    heroMedia: {
      type: "image",
      src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    },
    headline: "Technical precision meets digital excellence",
    subheadline: "How we transformed a specialist lifting company's outdated website into a lead-generating powerhouse — with clarity that matches their operational expertise.",
    kpiBadges: [
      { label: "Quality Enquiries", value: "+218%", highlight: true },
      { label: "Keyword Rankings", value: "147" },
      { label: "Bounce Rate", value: "-53%" },
    ],
    problem: `One Great Northern had spent years building an impeccable reputation in specialist lifting. Hot tub relocations. Silo installations. Steel frame erections. Timber frame lifts. Complex machinery moves. On-site, they were the contractors other contractors called when precision mattered.

Online? A different story entirely.

The website was stuck in 2015. Terminology was outdated — references to "self-drive crane hire" that hadn't been accurate for years. The specialist lifts that made OGN unique were buried or missing entirely. Visitors couldn't tell what OGN actually did, let alone why they were the best at it.

Search visibility was abysmal. Competitors with half the experience were outranking them for every valuable keyword. The site lacked trust signals, technical confidence, and any clear pathway for contractors to request a quote.

Worst of all, the digital presence didn't match the operational reality. OGN's team executed complex lifts with surgical precision — but their website suggested a company that hadn't evolved in a decade.

The brief was clear: build a digital experience that matches the technical excellence delivered on-site. Every. Single. Time.`,
    approach: [
      {
        phase: "Discovery",
        title: "Industry Immersion & Technical Audit",
        description: "We spent time understanding the lifting industry — the terminology, the buyer journey, the competitive landscape. A full technical audit revealed critical gaps: missing service pages, outdated language, and zero schema markup for local search.",
        duration: "3 weeks",
      },
      {
        phase: "Strategy",
        title: "Service Architecture & Keyword Mapping",
        description: "Mapped every specialist lifting service to high-intent search terms. Created a content architecture that gave each niche — from hot tub lifts to steel frame installations — its own optimised landing page with technical accuracy that would satisfy even the most demanding contractors.",
        duration: "2 weeks",
      },
      {
        phase: "Build",
        title: "Complete Website Rebuild",
        description: "Ground-up rebuild with premium UI, fast load times, and conversion-focused layouts. Mobile-first design for site managers checking quotes on their phones. Clear CTAs and streamlined enquiry forms that capture the right information first time.",
        duration: "8 weeks",
      },
      {
        phase: "Content",
        title: "Technical Copywriting & Service Pages",
        description: "Rewrote every word. Removed outdated terminology. Created dedicated pages for specialist services: silo work, machinery relocation, timber frame lifts, hot tub moves, steel erection. Each page written to demonstrate technical competence while remaining accessible.",
        duration: "4 weeks",
      },
      {
        phase: "SEO",
        title: "Technical SEO & Local Optimisation",
        description: "Full technical SEO implementation: schema markup, optimised meta architecture, internal linking strategy. Local SEO push targeting key service areas. Ongoing content updates to maintain momentum.",
        duration: "Ongoing",
      },
    ],
    outcomes: [
      { label: "Quality Enquiries", value: "+218%", baseline: "vs. previous year", highlight: true },
      { label: "First Page Rankings", value: "47", baseline: "target keywords" },
      { label: "Bounce Rate", value: "-53%", baseline: "site-wide reduction" },
      { label: "Page Load Time", value: "1.2s", baseline: "down from 6.8s" },
      { label: "Organic Traffic", value: "+312%", baseline: "6-month growth" },
      { label: "Conversion Rate", value: "4.8%", baseline: "up from 0.9%" },
    ],
    galleryMedia: [
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "OGN homepage with hero crane imagery" },
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Specialist lifting services page" },
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Mobile responsive quote request" },
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Hot tub relocation service page" },
    ],
    beforeMedia: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    afterMedia: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    quote: {
      text: "Avorria got it. They understood that our website needed to speak to contractors who know their stuff — not just look pretty. The new site actually represents who we are. Enquiries are up, and more importantly, they're the right kind of enquiries from people who understand what we do.",
      name: "Paul Richardson",
      role: "Operations Director",
      company: "One Great Northern",
    },
    pdfContent: {
      summary: "A complete digital transformation for One Great Northern, a UK specialist lifting and crane hire company. Avorria delivered an end-to-end website rebuild, technical copywriting overhaul, and SEO expansion — resulting in 218% more quality enquiries and dominant local search visibility.",
      keyResults: [
        "218% increase in quality enquiries",
        "47 first-page keyword rankings",
        "53% reduction in bounce rate",
        "312% organic traffic growth",
        "4.8% conversion rate (up from 0.9%)",
        "Dedicated landing pages for all specialist lifting services",
      ],
    },
    relatedSlugs: ["entirefm-rebrand", "multi-location-local-seo"],
    isFeatured: true,
  },
  {
    slug: "entirefm-rebrand",
    title: "EntireFM Digital Transformation | Facilities Management Website Redesign",
    client: "EntireFM",
    sector: "Facilities Management",
    services: ["Brand Development", "Web Design", "AI Integration", "SEO", "UX Optimisation"],
    timeframe: "6 months",
    year: 2024,
    outcome: "revenue",
    heroMedia: {
      type: "image",
      src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    },
    headline: "From outdated to industry-leading",
    subheadline: "A complete digital transformation for facilities management — AI-driven workflows, crystal-clear messaging, and a website that actually converts.",
    kpiBadges: [
      { label: "Enquiry Increase", value: "+156%", highlight: true },
      { label: "Bounce Rate", value: "-47%" },
      { label: "Time to Convert", value: "-62%" },
    ],
    problem: `EntireFM had been delivering exceptional facilities management services across the UK for years. But their digital presence? It told a different story entirely.

The website was a patchwork of legacy pages with inconsistent messaging, confusing navigation, and layouts that made even their own team wince. Service verticals were buried under generic copy. Visitors couldn't quickly understand what EntireFM actually did — let alone why they should choose them over the competition.

There was no structured customer journey. No automation. No AI-assisted workflows to handle the repetitive enquiries that were burning through staff time. The brand itself felt tired — competent, perhaps, but certainly not premium. In a sector where trust and professionalism are everything, EntireFM's digital front door was letting them down.

The challenge was clear: modernise the entire digital experience, sharpen the value proposition, and build a platform that could scale with the business — all without losing the authentic, people-first culture that made EntireFM great in the first place.`,
    approach: [
      {
        phase: "Discovery",
        title: "Strategic Audit & Messaging Workshop",
        description: "We started by listening. Stakeholder interviews, customer feedback analysis, and a full content audit revealed the gaps between what EntireFM delivered and what their website communicated. The messaging framework that emerged gave every service vertical a clear, differentiated position.",
        duration: "3 weeks",
      },
      {
        phase: "Architecture",
        title: "Information Architecture & UX Redesign",
        description: "We mapped the complete customer journey from first click to enquiry submission. New site architecture gave each service its own optimised pathway while maintaining intuitive cross-linking. User testing validated every major navigation decision.",
        duration: "4 weeks",
      },
      {
        phase: "Build",
        title: "Website Rebuild with AI Integration",
        description: "A ground-up rebuild on modern infrastructure. Clean, conversion-focused design language. AI-driven chatbot and workflow automations to handle initial enquiries, route leads intelligently, and reduce manual admin. Mobile-first, fast-loading, and built to scale.",
        duration: "8 weeks",
      },
      {
        phase: "SEO",
        title: "Technical SEO & Content Optimisation",
        description: "Full technical SEO implementation including schema markup, optimised meta architecture, and strategic internal linking. Each service page was crafted to target high-intent keywords like 'facilities management UK' and 'commercial FM services'.",
        duration: "Ongoing",
      },
      {
        phase: "Launch",
        title: "Phased Launch & Continuous Optimisation",
        description: "Staged rollout with real-time analytics monitoring. Post-launch CRO sprints addressed emerging friction points. Ongoing content updates keep the site fresh and rankings climbing.",
        duration: "Ongoing",
      },
    ],
    outcomes: [
      { label: "Enquiry Volume", value: "+156%", baseline: "vs. previous 6 months", highlight: true },
      { label: "Bounce Rate", value: "-47%", baseline: "site-wide average" },
      { label: "Time to First Enquiry", value: "-62%", baseline: "visitor journey" },
      { label: "Organic Visibility", value: "+89%", baseline: "target keyword rankings" },
      { label: "Page Load Speed", value: "1.4s", baseline: "down from 5.2s" },
      { label: "Lead Quality Score", value: "+71%", baseline: "sales team rating" },
    ],
    galleryMedia: [
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "EntireFM homepage redesign" },
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Services page with clear value proposition" },
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Mobile responsive design" },
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "AI chatbot integration" },
    ],
    beforeMedia: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    afterMedia: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    quote: {
      text: "Avorria didn't just build us a website — they transformed how we present ourselves to the market. The AI automations alone have saved our team hours every week. Enquiries are up, the right prospects are finding us, and for the first time, our digital presence matches the quality of our service delivery.",
      name: "David Mitchell",
      role: "Operations Director",
      company: "EntireFM",
    },
    pdfContent: {
      summary: "A comprehensive digital transformation for EntireFM, a leading UK facilities management provider. Avorria delivered a complete website rebuild, AI-driven workflow automations, messaging overhaul, and SEO optimisation — resulting in 156% more enquiries and a significantly stronger market position.",
      keyResults: [
        "156% increase in website enquiries",
        "47% reduction in bounce rate",
        "62% faster time to first enquiry",
        "89% improvement in organic keyword visibility",
        "AI chatbot handling 40% of initial enquiries",
        "71% improvement in lead quality scores",
      ],
    },
    relatedSlugs: ["ogn-facility-management", "professional-services-seo"],
    isFeatured: true,
  },
  {
    slug: "professional-services-seo",
    title: "Professional Services SEO Transformation",
    client: "Confidential",
    sector: "Professional Services",
    services: ["SEO", "Content"],
    timeframe: "6 months",
    year: 2024,
    outcome: "leads",
    heroMedia: {
      type: "image",
      src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    },
    headline: "184% more qualified leads",
    subheadline: "Full technical SEO overhaul and strategic content program for a B2B consulting firm",
    kpiBadges: [
      { label: "Organic Leads", value: "+184%", highlight: true },
      { label: "Top 3 Rankings", value: "12" },
      { label: "Pipeline Value", value: "£240k" },
    ],
    problem: "A mid-sized professional services firm was invisible in search results for their key services. Despite having strong expertise, they relied entirely on referrals and had no organic pipeline.",
    approach: [
      {
        phase: "Audit",
        title: "Technical & Content Audit",
        description: "Comprehensive analysis of technical SEO issues and content gaps versus top-ranking competitors.",
        duration: "2 weeks",
      },
      {
        phase: "Technical",
        title: "Technical SEO Fixes",
        description: "Resolved crawlability issues, implemented proper schema, and optimised site architecture.",
        duration: "4 weeks",
      },
      {
        phase: "Content",
        title: "Content Architecture Overhaul",
        description: "Restructured service pages and created pillar content targeting high-intent commercial keywords.",
        duration: "Ongoing",
      },
    ],
    outcomes: [
      { label: "Organic Leads", value: "+184%", baseline: "6-month increase" },
      { label: "Top 3 Rankings", value: "12", baseline: "priority keywords" },
      { label: "Pipeline Value", value: "£240k", baseline: "attributed to organic" },
    ],
    galleryMedia: [
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Performance dashboard" },
    ],
    quote: {
      text: "Avorria transformed our online presence. We went from relying entirely on referrals to having a steady stream of qualified inbound leads.",
      name: "Managing Partner",
      role: "Professional Services Firm",
    },
    relatedSlugs: ["ogn-facility-management", "b2b-saas-demand-gen"],
    isFeatured: true,
  },
  {
    slug: "multi-location-local-seo",
    title: "Multi-Location Local SEO Domination",
    client: "Confidential",
    sector: "Multi-Location Services",
    services: ["Local SEO", "Content"],
    timeframe: "9 months",
    year: 2023,
    outcome: "traffic",
    heroMedia: {
      type: "image",
      src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    },
    headline: "Dominating local search across 15 locations",
    subheadline: "Scalable local SEO system delivering consistent visibility gains",
    kpiBadges: [
      { label: "Local Traffic", value: "+132%", highlight: true },
      { label: "Enquiries", value: "+89%" },
      { label: "Locations in Pack", value: "15" },
    ],
    problem: "A service brand with 15+ locations was losing local search visibility to competitors. Their Google Business Profiles were inconsistent and they had no local landing page strategy.",
    approach: [
      {
        phase: "Audit",
        title: "Local Presence Audit",
        description: "Analysed all 15 GBP profiles and local citation consistency across the web.",
        duration: "2 weeks",
      },
      {
        phase: "Optimisation",
        title: "GBP Optimisation",
        description: "Standardised and optimised all Google Business Profiles with consistent NAP data and rich content.",
        duration: "4 weeks",
      },
      {
        phase: "Content",
        title: "Location Pages",
        description: "Created unique, locally-optimised landing pages for each location with proper schema markup.",
        duration: "6 weeks",
      },
      {
        phase: "Reviews",
        title: "Review Generation",
        description: "Implemented systematic review generation process across all locations.",
        duration: "Ongoing",
      },
    ],
    outcomes: [
      { label: "Local Organic Traffic", value: "+132%", baseline: "9-month increase" },
      { label: "Location Enquiries", value: "+89%", baseline: "growth" },
      { label: "Local Pack Rankings", value: "15/15", baseline: "locations ranking" },
    ],
    galleryMedia: [
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Local rankings dashboard" },
    ],
    relatedSlugs: ["ogn-facility-management", "trades-web-redesign"],
  },
  {
    slug: "b2b-saas-demand-gen",
    title: "B2B SaaS Demand Generation Engine",
    client: "Confidential",
    sector: "B2B SaaS",
    services: ["SEO", "Content", "Paid Media"],
    timeframe: "12 months",
    year: 2024,
    outcome: "leads",
    heroMedia: {
      type: "image",
      src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    },
    headline: "2.4x pipeline growth",
    subheadline: "Transforming traffic into demos with buyer-intent content strategy",
    kpiBadges: [
      { label: "Pipeline Growth", value: "2.4x", highlight: true },
      { label: "Demo Requests", value: "+156%" },
      { label: "CAC Reduction", value: "-38%" },
    ],
    problem: "A B2B SaaS company had traffic but no demos. Their content attracted the wrong audience and their site didn't convert visitors into trial signups.",
    approach: [
      {
        phase: "Analysis",
        title: "Conversion Analysis",
        description: "Deep-dive into user behaviour, content performance, and conversion funnel bottlenecks.",
        duration: "3 weeks",
      },
      {
        phase: "Strategy",
        title: "Content Strategy Rebuild",
        description: "Rebuilt content strategy around buyer-intent keywords and decision-stage content.",
        duration: "4 weeks",
      },
      {
        phase: "CRO",
        title: "Landing Page Optimisation",
        description: "Optimised key landing pages for conversion with clearer value props and CTAs.",
        duration: "6 weeks",
      },
      {
        phase: "Tracking",
        title: "Attribution Setup",
        description: "Implemented proper conversion tracking to measure content ROI accurately.",
        duration: "2 weeks",
      },
    ],
    outcomes: [
      { label: "Inbound Pipeline", value: "2.4x", baseline: "year-over-year" },
      { label: "Demo Requests", value: "+156%", baseline: "qualified demos" },
      { label: "Customer Acquisition Cost", value: "-38%", baseline: "reduction" },
    ],
    galleryMedia: [
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Analytics dashboard" },
    ],
    relatedSlugs: ["professional-services-seo", "ecommerce-paid-media"],
  },
  {
    slug: "ecommerce-paid-media",
    title: "E-commerce Paid Media Turnaround",
    client: "Confidential",
    sector: "E-commerce",
    services: ["Paid Media"],
    timeframe: "6 months",
    year: 2024,
    outcome: "revenue",
    heroMedia: {
      type: "image",
      src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    },
    headline: "From cost centre to growth driver",
    subheadline: "Complete paid media restructure delivering £1.2M attributed revenue",
    kpiBadges: [
      { label: "Revenue", value: "£1.2M", highlight: true },
      { label: "ROAS", value: "+67%" },
      { label: "CPA", value: "-42%" },
    ],
    problem: "An e-commerce brand was burning budget on paid ads with declining ROAS. Their campaigns were poorly structured and targeting was too broad.",
    approach: [
      {
        phase: "Audit",
        title: "Campaign Audit",
        description: "Comprehensive audit of existing Google Ads and Meta campaigns identifying waste and opportunities.",
        duration: "1 week",
      },
      {
        phase: "Restructure",
        title: "Campaign Restructure",
        description: "Rebuilt campaign architecture with proper audience segmentation and bid strategies.",
        duration: "3 weeks",
      },
      {
        phase: "Creative",
        title: "Creative Testing",
        description: "Developed creative testing framework for continuous optimisation.",
        duration: "Ongoing",
      },
      {
        phase: "Tracking",
        title: "Conversion Tracking",
        description: "Implemented enhanced conversion tracking for accurate attribution.",
        duration: "2 weeks",
      },
    ],
    outcomes: [
      { label: "Attributed Revenue", value: "£1.2M", baseline: "6 months" },
      { label: "ROAS Improvement", value: "+67%", baseline: "vs. previous" },
      { label: "CPA Reduction", value: "-42%", baseline: "cost per acquisition" },
    ],
    galleryMedia: [
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Campaign performance" },
    ],
    quote: {
      text: "They took our paid media from a cost centre to our primary growth driver. The difference is night and day.",
      name: "Head of Marketing",
      role: "E-commerce Brand",
    },
    relatedSlugs: ["entirefm-rebrand", "b2b-saas-demand-gen"],
  },
  {
    slug: "trades-web-redesign",
    title: "Trades Business Website Redesign",
    client: "Confidential",
    sector: "Trades & Home Services",
    services: ["Web Design"],
    timeframe: "8 weeks",
    year: 2023,
    outcome: "leads",
    heroMedia: {
      type: "image",
      src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    },
    headline: "215% more quote requests",
    subheadline: "Mobile-first redesign transforming online lead generation",
    kpiBadges: [
      { label: "Quote Requests", value: "+215%", highlight: true },
      { label: "Load Time", value: "1.1s" },
      { label: "Mobile Conv.", value: "+78%" },
    ],
    problem: "A successful trades business had an outdated website that didn't reflect their quality. Mobile experience was poor and they had no way to capture leads online.",
    approach: [
      {
        phase: "Discovery",
        title: "User Research",
        description: "Analysed existing user behaviour and competitor websites to inform design decisions.",
        duration: "1 week",
      },
      {
        phase: "Design",
        title: "Mobile-First Design",
        description: "Designed modern, mobile-first website with clear service pages and trust signals.",
        duration: "3 weeks",
      },
      {
        phase: "Development",
        title: "Performance Build",
        description: "Built with performance in mind, achieving sub-1.5s load times on mobile.",
        duration: "4 weeks",
      },
    ],
    outcomes: [
      { label: "Online Enquiries", value: "+215%", baseline: "quote requests" },
      { label: "Page Load Time", value: "1.1s", baseline: "from 3.2s" },
      { label: "Mobile Conversion", value: "+78%", baseline: "rate increase" },
    ],
    galleryMedia: [
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Website design" },
    ],
    relatedSlugs: ["ogn-facility-management", "multi-location-local-seo"],
  },
  {
    slug: "healthcare-content-strategy",
    title: "Healthcare Provider Content Strategy",
    client: "Confidential",
    sector: "Healthcare",
    services: ["Content", "SEO"],
    timeframe: "12 months",
    year: 2023,
    outcome: "traffic",
    heroMedia: {
      type: "image",
      src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    },
    headline: "340% organic traffic growth",
    subheadline: "Comprehensive content strategy building authority and trust",
    kpiBadges: [
      { label: "Organic Traffic", value: "+340%", highlight: true },
      { label: "First Page Rankings", value: "45" },
      { label: "Patient Enquiries", value: "+92%" },
    ],
    problem: "A private healthcare provider needed to build authority and trust online. They had no content strategy and were losing visibility to competitors with stronger content.",
    approach: [
      {
        phase: "Research",
        title: "Content Gap Analysis",
        description: "Identified content opportunities across the patient journey and competitive landscape.",
        duration: "3 weeks",
      },
      {
        phase: "Strategy",
        title: "Content Strategy Development",
        description: "Created comprehensive content strategy including pillar pages and topic clusters.",
        duration: "2 weeks",
      },
      {
        phase: "Production",
        title: "Content Production",
        description: "Produced high-quality patient education content and thought leadership pieces.",
        duration: "Ongoing",
      },
    ],
    outcomes: [
      { label: "Organic Traffic", value: "+340%", baseline: "12-month growth" },
      { label: "First Page Rankings", value: "45", baseline: "key terms" },
      { label: "Patient Enquiries", value: "+92%", baseline: "from organic" },
    ],
    galleryMedia: [
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Content performance" },
    ],
    relatedSlugs: ["professional-services-seo", "b2b-saas-demand-gen"],
  },
];

// Helper functions
export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find(cs => cs.slug === slug);
};

export const getFeaturedCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter(cs => cs.isFeatured);
};

export const getRelatedCaseStudies = (currentSlug: string, relatedSlugs: string[]): CaseStudy[] => {
  return caseStudies.filter(cs => relatedSlugs.includes(cs.slug) && cs.slug !== currentSlug);
};

// Filter options
export const filterOptions = {
  sectors: [...new Set(caseStudies.map(cs => cs.sector))],
  services: [...new Set(caseStudies.flatMap(cs => cs.services))],
  outcomes: [
    { value: 'leads', label: 'Lead Generation' },
    { value: 'revenue', label: 'Revenue Growth' },
    { value: 'traffic', label: 'Traffic Growth' },
    { value: 'efficiency', label: 'Cost Efficiency' },
  ],
  years: [...new Set(caseStudies.map(cs => cs.year))].sort((a, b) => b - a),
};
