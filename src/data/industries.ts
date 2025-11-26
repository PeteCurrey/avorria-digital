import { Industry } from "@/types/landingPage";

export const industries: Industry[] = [
  {
    id: "trades-home-services",
    name: "Trades & Home Services",
    slug: "trades-home-services",
    painPoints: [
      "Lead quality is inconsistent—tire kickers instead of ready-to-buy customers",
      "Competitors dominate local search while you're invisible",
      "Your website doesn't convert calls or form fills",
      "Ad spend wastes budget on unqualified clicks",
      "No clear tracking from lead to job completion",
    ],
    typicalDealSize: "£500 - £10,000 per job",
    idealChannels: ["Local SEO", "Google Ads", "GMB Optimization", "Review Management"],
  },
  {
    id: "trades",
    name: "Trades & Home Services",
    slug: "trades",
    painPoints: [
      "Lead quality is inconsistent—tire kickers instead of ready-to-buy customers",
      "Competitors dominate local search while you're invisible",
      "Your website doesn't convert calls or form fills",
      "Ad spend wastes budget on unqualified clicks",
      "No clear tracking from lead to job completion",
    ],
    typicalDealSize: "£500 - £10,000 per job",
    idealChannels: ["Local SEO", "Google Ads", "GMB Optimization", "Review Management"],
  },
  {
    id: "professional-services",
    name: "Professional Services",
    slug: "professional-services",
    painPoints: [
      "Long sales cycles mean marketing results take forever to materialize",
      "Lead volume is fine but lead quality is terrible",
      "Your current agency can't connect marketing to actual revenue",
      "Content exists but it's not bringing in qualified prospects",
      "Tracking gaps make attribution impossible",
    ],
    typicalDealSize: "£5,000 - £100,000+ per client",
    idealChannels: ["SEO", "Paid Media", "Content Marketing", "LinkedIn"],
  },
  {
    id: "b2b-saas",
    name: "B2B SaaS",
    slug: "b2b-saas",
    painPoints: [
      "CAC is climbing while conversion rates stagnate",
      "Traffic is growing but signups aren't keeping pace",
      "Your funnel leaks at every stage",
      "Product-led growth has hit a ceiling",
      "Competitors are outspending you in paid channels",
    ],
    typicalDealSize: "MRR: £50 - £5,000+ per customer",
    idealChannels: ["SEO", "Paid Media", "Content Marketing", "CRO"],
  },
  {
    id: "saas-tech",
    name: "SaaS & Tech",
    slug: "saas",
    painPoints: [
      "CAC is climbing while conversion rates stagnate",
      "Traffic is growing but signups aren't keeping pace",
      "Your funnel leaks at every stage",
      "Product-led growth has hit a ceiling",
      "Competitors are outspending you in paid channels",
    ],
    typicalDealSize: "MRR: £50 - £5,000+ per customer",
    idealChannels: ["SEO", "Paid Media", "Content Marketing", "CRO"],
  },
  {
    id: "ecommerce-brands",
    name: "E-commerce Brands",
    slug: "ecommerce-brands",
    painPoints: [
      "Product pages don't rank despite having inventory",
      "Shopping campaigns burn budget without clear ROI",
      "Cart abandonment rate is embarrassingly high",
      "You're competing on price instead of value",
      "Customer acquisition cost makes growth unprofitable",
    ],
    typicalDealSize: "AOV varies widely",
    idealChannels: ["SEO", "Google Shopping", "Paid Social", "Email & Automation"],
  },
  {
    id: "multi-location-brands",
    name: "Multi-Location Brands",
    slug: "multi-location-brands",
    painPoints: [
      "Each location needs its own presence but managing them is chaos",
      "Local SEO is inconsistent across markets",
      "Corporate sites dominate while location pages get ignored",
      "Review management is fragmented",
      "No clear playbook to replicate success across new locations",
    ],
    typicalDealSize: "Varies by location and vertical",
    idealChannels: ["Local SEO", "Multi-location strategy", "GMB Management", "Paid Media"],
  },
  {
    id: "multi-location",
    name: "Multi-Location Businesses",
    slug: "multi-location",
    painPoints: [
      "Each location needs its own presence but managing them is chaos",
      "Local SEO is inconsistent across markets",
      "Corporate sites dominate while location pages get ignored",
      "Review management is fragmented",
      "No clear playbook to replicate success across new locations",
    ],
    typicalDealSize: "Varies by location and vertical",
    idealChannels: ["Local SEO", "Multi-location strategy", "GMB Management", "Paid Media"],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    slug: "ecommerce",
    painPoints: [
      "Product pages don't rank despite having inventory",
      "Shopping campaigns burn budget without clear ROI",
      "Cart abandonment rate is embarrassingly high",
      "You're competing on price instead of value",
      "Customer acquisition cost makes growth unprofitable",
    ],
    typicalDealSize: "AOV varies widely",
    idealChannels: ["SEO", "Google Shopping", "Paid Social", "Email & Automation"],
  },
];

export const getIndustryBySlug = (slug: string): Industry | undefined => {
  return industries.find((i) => i.slug === slug);
};
