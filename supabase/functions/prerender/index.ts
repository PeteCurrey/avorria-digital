import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SITE_URL = "https://avorria.com";
const DEFAULT_OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/7MJD8mgRihYZLAUga3hIuKQHE2u2/social-images/social-1765645939140-20250710_1857_image (1).png";
const TWITTER_HANDLE = "@avorria";

// Inline route metadata for edge function (subset of most important pages)
// Geo pages are generated dynamically below
const coreMetadata: Record<string, { title: string; description: string; h1: string; intro: string }> = {
  "/": {
    title: "Avorria – Digital Marketing, SEO & Web Design Agency | UK & USA",
    description: "Avorria is a performance-first digital marketing agency specialising in SEO, paid media, web design and analytics.",
    h1: "Digital Growth Systems for Serious Teams",
    intro: "Performance-first digital marketing agency for B2B and service businesses across the UK and USA.",
  },
  "/services": {
    title: "Digital Marketing Services | SEO, Paid Media, Web Design | Avorria",
    description: "Explore Avorria's full suite of digital marketing services including SEO, paid media, web design, content marketing, analytics and CRO.",
    h1: "Digital Marketing Services",
    intro: "Integrated digital marketing services engineered around pipeline and revenue.",
  },
  "/services/seo": {
    title: "SEO Services | Technical SEO, Content & Link Building | Avorria",
    description: "SEO services that drive revenue and qualified leads—not just rankings and reports.",
    h1: "SEO Services That Drive Revenue",
    intro: "Technical SEO, content strategy, and link building for B2B and service businesses.",
  },
  "/services/paid-media": {
    title: "Paid Media Services | Google Ads, Meta & LinkedIn | Avorria",
    description: "Paid media campaigns engineered for pipeline, not vanity metrics.",
    h1: "Paid Media That Delivers Pipeline",
    intro: "Google Ads, Meta Ads and LinkedIn campaigns managed by a performance-first agency.",
  },
  "/services/web-design": {
    title: "Web Design & Development | Conversion-Focused Websites | Avorria",
    description: "Modern, fast, conversion-optimized websites for B2B and service businesses.",
    h1: "Web Design That Converts",
    intro: "High-converting websites tuned for business results, speed, and search visibility.",
  },
  "/about": {
    title: "About Avorria | Performance-First Digital Marketing Agency",
    description: "Learn about Avorria—a performance-first digital marketing agency for B2B and service businesses.",
    h1: "About Avorria",
    intro: "Built by practitioners who got tired of the agency model.",
  },
  "/pricing": {
    title: "Pricing | Transparent Digital Marketing Packages | Avorria",
    description: "Transparent pricing for SEO, paid media, web design and digital marketing. No hidden fees.",
    h1: "Pricing",
    intro: "No-nonsense pricing for businesses that want clarity.",
  },
  "/contact": {
    title: "Contact Avorria | Book a Strategy Call",
    description: "Get in touch with Avorria. Book a strategy call or request an audit.",
    h1: "Get in Touch",
    intro: "Ready to grow? Book a strategy call or request a free audit.",
  },
  "/case-studies": {
    title: "Case Studies | Real Results from Real Clients | Avorria",
    description: "See how Avorria delivers measurable results for B2B and service businesses.",
    h1: "Case Studies",
    intro: "Real results from real businesses.",
  },
  "/resources": {
    title: "Resources & Guides | Marketing Knowledge Base | Avorria",
    description: "Free marketing resources, guides and frameworks for B2B and service businesses.",
    h1: "Resources & Guides",
    intro: "Practical marketing guides written for business owners and marketing leaders.",
  },
  "/faqs": {
    title: "Frequently Asked Questions | Avorria",
    description: "Answers to common questions about working with Avorria.",
    h1: "Frequently Asked Questions",
    intro: "Common questions about our services, pricing, and process.",
  },
  "/locations": {
    title: "Locations | SEO & Digital Marketing Across UK, USA & Beyond | Avorria",
    description: "Avorria serves businesses across the UK, USA, Australia, Canada, and New Zealand.",
    h1: "Our Locations",
    intro: "Local expertise with global capability.",
  },
  "/seo-agency": {
    title: "SEO Agency | Performance-Focused SEO Services | Avorria",
    description: "Performance-focused SEO agency for B2B and service businesses.",
    h1: "SEO Agency",
    intro: "Organic growth systems for serious businesses.",
  },
  "/paid-media-agency": {
    title: "Paid Media Agency | Google Ads & Meta Ads Management | Avorria",
    description: "Paid media agency managing Google Ads, Meta Ads, and LinkedIn campaigns.",
    h1: "Paid Media Agency",
    intro: "Campaigns built around pipeline and revenue.",
  },
  "/digital-marketing-agency": {
    title: "Digital Marketing Agency | Full-Service Growth Partner | Avorria",
    description: "Full-service digital marketing agency for growth-focused businesses.",
    h1: "Digital Marketing Agency",
    intro: "SEO, paid media, web design, and content under one roof.",
  },
};

// Geo page patterns
const geoServices: Record<string, { name: string; titlePattern: (c: string) => string; descPattern: (c: string) => string }> = {
  "seo-agency": {
    name: "SEO Agency",
    titlePattern: (c) => `SEO Agency ${c} | Performance-Focused SEO | Avorria`,
    descPattern: (c) => `${c} SEO agency that brings in leads, not just rankings.`,
  },
  "web-design": {
    name: "Web Design",
    titlePattern: (c) => `Web Design ${c} | Conversion-Focused Websites | Avorria`,
    descPattern: (c) => `${c} web design that converts visitors into enquiries.`,
  },
  "paid-media-agency": {
    name: "Paid Media Agency",
    titlePattern: (c) => `Paid Media Agency ${c} | Google & Meta Ads | Avorria`,
    descPattern: (c) => `${c} paid media agency that delivers ROI.`,
  },
  "digital-marketing-agency": {
    name: "Digital Marketing Agency",
    titlePattern: (c) => `Digital Marketing Agency ${c} | Full-Funnel Growth | Avorria`,
    descPattern: (c) => `${c} digital marketing agency for teams who want pipeline, not noise.`,
  },
};

function toTitleCase(slug: string): string {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function getMetaForPath(pathname: string): { title: string; description: string; h1: string; intro: string } | null {
  // Check core routes first
  if (coreMetadata[pathname]) return coreMetadata[pathname];

  // Check geo patterns: /{service-slug}/{location-slug}
  const parts = pathname.replace(/^\//, "").split("/");
  if (parts.length === 2) {
    const [serviceSlug, locationSlug] = parts;
    const svc = geoServices[serviceSlug];
    if (svc) {
      const city = toTitleCase(locationSlug);
      return {
        title: svc.titlePattern(city),
        description: svc.descPattern(city),
        h1: `${svc.name} in ${city}`,
        intro: `Avorria is a performance-focused ${svc.name.toLowerCase()} for businesses in ${city}.`,
      };
    }
  }

  return null;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildHtml(meta: { title: string; description: string; h1: string; intro: string }, pathname: string): string {
  const canonical = `${SITE_URL}${pathname}`;
  const ogImage = DEFAULT_OG_IMAGE;

  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="index, follow" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${escapeHtml(meta.title)}" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Avorria" />
  <meta property="og:locale" content="en_GB" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="${TWITTER_HANDLE}" />
  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
  <meta name="twitter:image" content="${ogImage}" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${escapeHtml(meta.title)}",
    "description": "${escapeHtml(meta.description)}",
    "url": "${canonical}",
    "publisher": {
      "@type": "Organization",
      "name": "Avorria",
      "url": "${SITE_URL}"
    }
  }
  </script>
</head>
<body>
  <main>
    <h1>${escapeHtml(meta.h1)}</h1>
    <p>${escapeHtml(meta.intro)}</p>
    <nav>
      <a href="${SITE_URL}/">Home</a> |
      <a href="${SITE_URL}/services">Services</a> |
      <a href="${SITE_URL}/contact">Contact</a> |
      <a href="${SITE_URL}/case-studies">Case Studies</a>
    </nav>
  </main>
  <script>window.location.href="${SITE_URL}${pathname}";</script>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathname = url.searchParams.get("path") || "/";
    
    const meta = getMetaForPath(pathname);
    if (!meta) {
      return new Response(
        JSON.stringify({ error: "Route not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = buildHtml(meta, pathname);
    return new Response(html, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
