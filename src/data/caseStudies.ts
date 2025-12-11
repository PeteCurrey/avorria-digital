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
    title: "OGN Facility Management",
    client: "OGN Group",
    sector: "Facility Management",
    services: ["SEO", "Web Design", "Content"],
    timeframe: "8 months",
    year: 2024,
    outcome: "leads",
    heroMedia: {
      type: "image",
      src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    },
    headline: "From invisible to industry leader",
    subheadline: "How a strategic SEO overhaul positioned OGN as the go-to facility management provider",
    kpiBadges: [
      { label: "Organic Leads", value: "+312%", highlight: true },
      { label: "Ranking Keywords", value: "147" },
      { label: "Domain Authority", value: "+18" },
    ],
    problem: "OGN had been operating for over 15 years but had virtually zero online presence. Their competitors dominated search results while they relied entirely on word-of-mouth referrals. The existing website was outdated, slow, and failed to communicate their expertise in commercial facility management.",
    approach: [
      {
        phase: "Discovery",
        title: "Competitive & Technical Audit",
        description: "Deep-dive analysis of the facility management search landscape. Identified 200+ keyword opportunities where competitors were winning traffic OGN deserved.",
        duration: "2 weeks",
      },
      {
        phase: "Foundation",
        title: "Website Rebuild & Technical SEO",
        description: "Complete website redesign focused on conversion architecture. Implemented proper schema markup, site speed optimisation, and mobile-first design.",
        duration: "6 weeks",
      },
      {
        phase: "Content",
        title: "Authority Content Program",
        description: "Developed comprehensive service pages and thought leadership content targeting high-intent commercial keywords.",
        duration: "Ongoing",
      },
      {
        phase: "Optimisation",
        title: "Conversion Rate Optimisation",
        description: "A/B testing of key landing pages, form optimisation, and user journey refinement to maximise lead capture.",
        duration: "Ongoing",
      },
    ],
    outcomes: [
      { label: "Organic Leads", value: "+312%", baseline: "vs. previous year" },
      { label: "First Page Rankings", value: "47", baseline: "target keywords" },
      { label: "Page Load Time", value: "1.2s", baseline: "down from 6.8s" },
      { label: "Conversion Rate", value: "4.8%", baseline: "up from 0.9%" },
    ],
    galleryMedia: [
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "OGN website homepage" },
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Services page design" },
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Mobile responsive view" },
    ],
    beforeMedia: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    afterMedia: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    quote: {
      text: "Avorria didn't just improve our website—they transformed how we acquire customers. The leads we're getting now are exactly the type of clients we want to work with.",
      name: "James Morrison",
      role: "Managing Director",
      company: "OGN Group",
    },
    pdfContent: {
      summary: "A comprehensive SEO and web design engagement that transformed OGN's digital presence and lead generation capabilities.",
      keyResults: [
        "312% increase in organic leads",
        "47 first-page keyword rankings",
        "4.8% conversion rate (up from 0.9%)",
        "1.2s page load time (down from 6.8s)",
      ],
    },
    relatedSlugs: ["entirefm-rebrand", "multi-location-local-seo"],
    isFeatured: true,
  },
  {
    slug: "entirefm-rebrand",
    title: "EntireFM Digital Transformation",
    client: "EntireFM",
    sector: "Facility Management",
    services: ["Web Design", "Paid Media", "Content"],
    timeframe: "6 months",
    year: 2024,
    outcome: "revenue",
    heroMedia: {
      type: "image",
      src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
    },
    headline: "A rebrand that drives revenue",
    subheadline: "Complete digital transformation delivering £420k attributed revenue in the first year",
    kpiBadges: [
      { label: "Attributed Revenue", value: "£420k", highlight: true },
      { label: "ROAS", value: "4.2x" },
      { label: "Lead Quality", value: "+67%" },
    ],
    problem: "EntireFM's brand and website felt dated compared to newer market entrants. Their paid media campaigns were underperforming with poor targeting and creative fatigue. The sales team was overwhelmed with low-quality leads that rarely converted.",
    approach: [
      {
        phase: "Strategy",
        title: "Brand & Market Positioning",
        description: "Comprehensive brand strategy including messaging framework, visual identity refresh, and competitive positioning.",
        duration: "4 weeks",
      },
      {
        phase: "Design",
        title: "Website Redesign",
        description: "Modern, conversion-optimised website with clear value propositions and streamlined user journeys for different buyer personas.",
        duration: "8 weeks",
      },
      {
        phase: "Media",
        title: "Paid Media Restructure",
        description: "Complete rebuild of Google Ads and LinkedIn campaigns with improved audience targeting, ad creative, and conversion tracking.",
        duration: "Ongoing",
      },
      {
        phase: "Content",
        title: "Thought Leadership Program",
        description: "Regular content production establishing EntireFM as industry thought leaders, supporting both SEO and paid social efforts.",
        duration: "Ongoing",
      },
    ],
    outcomes: [
      { label: "Attributed Revenue", value: "£420k", baseline: "first 12 months" },
      { label: "Return on Ad Spend", value: "4.2x", baseline: "vs. 1.4x previous" },
      { label: "Lead Quality Score", value: "+67%", baseline: "sales team rating" },
      { label: "Cost Per Lead", value: "-42%", baseline: "reduction" },
    ],
    galleryMedia: [
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "EntireFM website" },
      { type: "image", src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg", alt: "Brand guidelines" },
    ],
    quote: {
      text: "The team at Avorria understood our business from day one. The new brand and website have completely changed how prospects perceive us.",
      name: "Sarah Chen",
      role: "Commercial Director",
      company: "EntireFM",
    },
    pdfContent: {
      summary: "A complete brand and digital transformation that repositioned EntireFM in the market and delivered measurable revenue growth.",
      keyResults: [
        "£420k attributed revenue in year one",
        "4.2x return on ad spend",
        "67% improvement in lead quality",
        "42% reduction in cost per lead",
      ],
    },
    relatedSlugs: ["ogn-facility-management", "ecommerce-paid-media"],
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
