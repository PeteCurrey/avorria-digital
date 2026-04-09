import { landingPages } from "./landingPages";
import { locations } from "./locations";
import { resources } from "./resources";

export interface SitemapUrl {
  path: string;
  name: string;
  priority: number;
  lastMod?: string;
  changeFreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  category: string;
  status?: "indexed" | "pending" | "error";
}

// ------------------------------ Core Pages ------------------------------
export const corePages: SitemapUrl[] = [
  { path: "/", name: "Homepage", priority: 1.0, changeFreq: "daily", category: "Core", status: "indexed" },
  { path: "/services", name: "Services", priority: 0.9, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/services/seo", name: "SEO Services", priority: 0.9, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/services/paid-media", name: "Paid Media", priority: 0.9, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/services/web-design", name: "Web Design", priority: 0.9, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/services/content-email", name: "Content & Email", priority: 0.8, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/services/social-personal-brand", name: "Social & Personal Brand", priority: 0.8, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/services/analytics", name: "Analytics & CRO", priority: 0.8, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/services/seo/local", name: "Local SEO", priority: 0.8, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/services/seo/technical", name: "Technical SEO", priority: 0.8, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/services/seo/content", name: "Content SEO", priority: 0.8, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/services/seo/analytics-tracking", name: "Analytics & Tracking", priority: 0.7, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/services/seo/migrations", name: "Website Migrations", priority: 0.7, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/case-studies", name: "Case Studies", priority: 0.9, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/contact", name: "Contact", priority: 0.9, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/pricing", name: "Pricing", priority: 0.9, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/about", name: "About", priority: 0.8, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/resources", name: "Resources", priority: 0.8, changeFreq: "weekly", category: "Core", status: "indexed" },
  { path: "/resources/seo-glossary", name: "SEO Glossary", priority: 0.7, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/faqs", name: "FAQs", priority: 0.7, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/why-avorria", name: "Why Avorria", priority: 0.7, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/reporting", name: "Reporting & Dashboards", priority: 0.7, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/locations", name: "Locations", priority: 0.7, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/industries", name: "Industries", priority: 0.7, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/websites-we-fire", name: "Websites We'd Fire", priority: 0.7, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/agency-teardown", name: "Agency Teardown", priority: 0.6, changeFreq: "monthly", category: "Core", status: "indexed" },
  { path: "/sitemap", name: "HTML Sitemap", priority: 0.3, changeFreq: "monthly", category: "Core", status: "indexed" },
];

// ------------------------------ Service-Industry Landing Pages ------------------------------
export const getServiceIndustryPages = (): SitemapUrl[] => {
  return landingPages
    .filter(lp => lp.type === "service-industry")
    .map(lp => ({
      path: `/lp/${lp.slug}`,
      name: lp.title,
      priority: 0.8,
      changeFreq: "weekly" as const,
      category: "Service-Industry",
      status: "indexed" as const,
    }));
};

// ------------------------------ Service-Location (Geo) Pages ------------------------------
// Uses slash pattern to match actual routes: /seo-agency/london
export const getGeoPages = (): SitemapUrl[] => {
  const services = [
    { slug: "seo-agency", name: "SEO Agency" },
    { slug: "web-design", name: "Web Design" },
    { slug: "paid-media-agency", name: "Paid Media Agency" },
    { slug: "digital-marketing-agency", name: "Digital Marketing Agency" },
  ];

  return locations.flatMap(location => 
    services.map(service => ({
      path: `/${service.slug}/${location.slug}`,
      name: `${service.name} ${location.city}`,
      priority: 0.7,
      changeFreq: "monthly" as const,
      category: "Location",
      status: "indexed" as const,
    }))
  );
};

// Resource/blog articles
export const getResourcePages = (): SitemapUrl[] => {
  return resources.map(resource => ({
    path: `/resources/${resource.slug}`,
    name: resource.title,
    priority: resource.isPillar ? 0.8 : 0.6,
    changeFreq: "monthly" as const,
    category: "Resources",
    status: "indexed" as const,
  }));
};

  // ------------------------------ Pillar Pages ------------------------------
export const pillarPages: SitemapUrl[] = [
  { path: "/seo-agency", name: "SEO Agency Pillar", priority: 0.9, changeFreq: "weekly", category: "Pillar", status: "indexed" },
  { path: "/paid-media-agency", name: "Paid Media Agency Pillar", priority: 0.9, changeFreq: "weekly", category: "Pillar", status: "indexed" },
  { path: "/digital-marketing-agency", name: "Digital Marketing Pillar", priority: 0.9, changeFreq: "weekly", category: "Pillar", status: "indexed" },
];

  // ------------------------------ Tool Pages ------------------------------
export const toolPages: SitemapUrl[] = [
  { path: "/tools", name: "Free Tools", priority: 0.7, changeFreq: "monthly", category: "Tools", status: "indexed" },
  { path: "/website-health-check", name: "Website Health Check", priority: 0.8, changeFreq: "monthly", category: "Tools", status: "indexed" },
  { path: "/project-estimator", name: "Project Estimator", priority: 0.7, changeFreq: "monthly", category: "Tools", status: "indexed" },
  { path: "/free-seo-website-audit", name: "Free SEO Audit", priority: 0.8, changeFreq: "monthly", category: "Tools", status: "indexed" },
  { path: "/audit-funnel", name: "Audit Funnel (Alternate)", priority: 0.8, changeFreq: "monthly", category: "Tools", status: "indexed" },
  { path: "/web-design/studio", name: "Web Design Studio", priority: 0.7, changeFreq: "monthly", category: "Tools", status: "indexed" },
];

  // ------------------------------ Legal Pages ------------------------------
export const legalPages: SitemapUrl[] = [
  { path: "/privacy", name: "Privacy Policy", priority: 0.3, changeFreq: "yearly", category: "Legal", status: "indexed" },
  { path: "/terms", name: "Terms of Service", priority: 0.3, changeFreq: "yearly", category: "Legal", status: "indexed" },
];

// Get all sitemap URLs organized by category
export const getAllSitemapUrls = () => {
  const serviceIndustryPages = getServiceIndustryPages();
  const geoPages = getGeoPages();
  const resourcePages = getResourcePages();

  return {
    core: corePages,
    pillar: pillarPages,
    serviceIndustry: serviceIndustryPages,
    geo: geoPages,
    resources: resourcePages,
    tools: toolPages,
    legal: legalPages,
  };
};

// Get total URL count
export const getTotalUrlCount = () => {
  const all = getAllSitemapUrls();
  return (
    all.core.length +
    all.pillar.length +
    all.serviceIndustry.length +
    all.geo.length +
    all.resources.length +
    all.tools.length +
    all.legal.length
  );
};

// Categories for display
export const sitemapCategories = [
  { id: "core", name: "Core Pages", icon: "Globe", description: "Essential website pages" },
  { id: "pillar", name: "Pillar Content", icon: "FileText", description: "Main service authority pages" },
  { id: "serviceIndustry", name: "Service-Industry", icon: "Target", description: "Industry-specific landing pages" },
  { id: "geo", name: "Location Pages", icon: "MapPin", description: "City and region specific pages" },
  { id: "resources", name: "Resources", icon: "BookOpen", description: "Blog posts and guides" },
  { id: "tools", name: "Tools", icon: "Wrench", description: "Free tools and calculators" },
  { id: "legal", name: "Legal", icon: "Shield", description: "Privacy and terms pages" },
];
