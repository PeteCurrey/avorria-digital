import { Service } from "@/types/landingPage";

export const services: Service[] = [
  {
    id: "seo",
    name: "SEO",
    slug: "seo",
    shortDescription: "Technical SEO, content strategy, and link building engineered for revenue growth.",
    longDescription: "SEO services that drive revenue and qualified leads—not just rankings and reports.",
    primaryCTA: "Book SEO Strategy Call",
    secondaryCTA: "Request Free SEO Audit",
    pillarPageUrl: "/services/seo",
  },
  {
    id: "web-design",
    name: "Web Design & Development",
    slug: "web-design",
    shortDescription: "Modern, fast, conversion-optimized websites that blend premium design with technical excellence.",
    longDescription: "High-converting sites that look like top agencies but are tuned for business results.",
    primaryCTA: "Book Design Consultation",
    secondaryCTA: "View Portfolio",
    pillarPageUrl: "/services/web-design",
  },
  {
    id: "paid-media",
    name: "Paid Media",
    slug: "paid-media",
    shortDescription: "Performance campaigns across Google Ads, Meta, and LinkedIn.",
    longDescription: "Paid campaigns engineered for pipeline, not vanity metrics.",
    primaryCTA: "Book Paid Strategy Call",
    secondaryCTA: "Get Free Audit",
    pillarPageUrl: "/services/paid-media",
  },
  {
    id: "content-email",
    name: "Content & Email Marketing",
    slug: "content-email",
    shortDescription: "Long-form SEO content and automated email sequences that convert.",
    longDescription: "Content and email marketing tied directly to your sales process.",
    primaryCTA: "Book Content Strategy Call",
    secondaryCTA: "View Samples",
    pillarPageUrl: "/services/content-email",
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug);
};
