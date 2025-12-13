import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("Generating dynamic robots.txt");

  try {
    const baseUrl = "https://avorria.com";

    // Build robots.txt content
    const robotsTxt = `# Robots.txt for Avorria
# Generated dynamically on ${new Date().toISOString()}

# Sitemaps
Sitemap: ${baseUrl}/sitemap-index.xml
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-news.xml
Sitemap: ${baseUrl}/sitemap-geo.xml

# Default rules for all bots
User-agent: *
Allow: /
Disallow: /admin
Disallow: /platform
Disallow: /client
Disallow: /api/
Disallow: /*?*
Disallow: /auth/

# Google-specific rules
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing-specific rules
User-agent: Bingbot
Allow: /
Crawl-delay: 2

# Block SEO tools from consuming bandwidth
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: PetalBot
Disallow: /

# Block AI crawlers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

# Block aggressive crawlers
User-agent: MegaIndex
Disallow: /

User-agent: BaiduSpider
Crawl-delay: 10

User-agent: YandexBot
Crawl-delay: 5

# Host directive
Host: ${baseUrl}
`;

    console.log("robots.txt generated successfully");

    return new Response(robotsTxt, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error("Error generating robots.txt:", error);
    
    return new Response(
      `User-agent: *\nAllow: /\nSitemap: https://avorria.com/sitemap.xml`,
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain; charset=utf-8',
        },
      }
    );
  }
});
