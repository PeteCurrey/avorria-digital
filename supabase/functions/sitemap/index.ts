import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
}

// Resource articles with publication metadata
const resourceArticles = [
  { 
    slug: 'seo-for-real-businesses', 
    title: 'SEO for Real Businesses: A Practical Guide',
    published: '2024-11-15',
    keywords: ['SEO', 'small business', 'digital marketing']
  },
  { 
    slug: 'high-converting-websites-service-businesses', 
    title: 'High-Converting Websites for Service Businesses',
    published: '2024-10-20',
    keywords: ['web design', 'conversion optimisation', 'service business']
  },
  { 
    slug: 'marketing-analytics-tracking-playbook', 
    title: 'Marketing Analytics & Tracking Playbook',
    published: '2024-09-10',
    keywords: ['analytics', 'tracking', 'marketing data']
  },
]

// UK Locations with geo-targeting data
const ukLocations = [
  { slug: 'london', city: 'London', region: 'Greater London', country: 'GB', coords: { lat: 51.5074, lng: -0.1278 } },
  { slug: 'manchester', city: 'Manchester', region: 'Greater Manchester', country: 'GB', coords: { lat: 53.4808, lng: -2.2426 } },
  { slug: 'birmingham', city: 'Birmingham', region: 'West Midlands', country: 'GB', coords: { lat: 52.4862, lng: -1.8904 } },
  { slug: 'leeds', city: 'Leeds', region: 'West Yorkshire', country: 'GB', coords: { lat: 53.8008, lng: -1.5491 } },
  { slug: 'liverpool', city: 'Liverpool', region: 'Merseyside', country: 'GB', coords: { lat: 53.4084, lng: -2.9916 } },
  { slug: 'edinburgh', city: 'Edinburgh', region: 'Scotland', country: 'GB', coords: { lat: 55.9533, lng: -3.1883 } },
  { slug: 'glasgow', city: 'Glasgow', region: 'Scotland', country: 'GB', coords: { lat: 55.8642, lng: -4.2518 } },
  { slug: 'bristol', city: 'Bristol', region: 'South West England', country: 'GB', coords: { lat: 51.4545, lng: -2.5879 } },
  { slug: 'newcastle', city: 'Newcastle', region: 'Tyne and Wear', country: 'GB', coords: { lat: 54.9783, lng: -1.6178 } },
  { slug: 'nottingham', city: 'Nottingham', region: 'East Midlands', country: 'GB', coords: { lat: 52.9548, lng: -1.1581 } },
  { slug: 'cardiff', city: 'Cardiff', region: 'Wales', country: 'GB', coords: { lat: 51.4816, lng: -3.1791 } },
  { slug: 'sheffield', city: 'Sheffield', region: 'South Yorkshire', country: 'GB', coords: { lat: 53.3811, lng: -1.4701 } },
  { slug: 'yorkshire', city: 'Yorkshire', region: 'Yorkshire and the Humber', country: 'GB', coords: { lat: 53.9591, lng: -1.0815 } },
  { slug: 'uk', city: 'United Kingdom', region: 'UK', country: 'GB', coords: { lat: 55.3781, lng: -3.4360 } },
]

// USA Locations with geo-targeting data
const usaLocations = [
  { slug: 'new-york', city: 'New York', region: 'New York', country: 'US', coords: { lat: 40.7128, lng: -74.0060 } },
  { slug: 'los-angeles', city: 'Los Angeles', region: 'California', country: 'US', coords: { lat: 34.0522, lng: -118.2437 } },
  { slug: 'chicago', city: 'Chicago', region: 'Illinois', country: 'US', coords: { lat: 41.8781, lng: -87.6298 } },
  { slug: 'san-francisco', city: 'San Francisco', region: 'California', country: 'US', coords: { lat: 37.7749, lng: -122.4194 } },
  { slug: 'boston', city: 'Boston', region: 'Massachusetts', country: 'US', coords: { lat: 42.3601, lng: -71.0589 } },
  { slug: 'miami', city: 'Miami', region: 'Florida', country: 'US', coords: { lat: 25.7617, lng: -80.1918 } },
  { slug: 'austin', city: 'Austin', region: 'Texas', country: 'US', coords: { lat: 30.2672, lng: -97.7431 } },
  { slug: 'denver', city: 'Denver', region: 'Colorado', country: 'US', coords: { lat: 39.7392, lng: -104.9903 } },
  { slug: 'seattle', city: 'Seattle', region: 'Washington', country: 'US', coords: { lat: 47.6062, lng: -122.3321 } },
  { slug: 'atlanta', city: 'Atlanta', region: 'Georgia', country: 'US', coords: { lat: 33.7490, lng: -84.3880 } },
  { slug: 'las-vegas', city: 'Las Vegas', region: 'Nevada', country: 'US', coords: { lat: 36.1699, lng: -115.1398 } },
]

// Australia Locations with geo-targeting data
const auLocations = [
  { slug: 'sydney', city: 'Sydney', region: 'New South Wales', country: 'AU', coords: { lat: -33.8688, lng: 151.2093 } },
  { slug: 'melbourne', city: 'Melbourne', region: 'Victoria', country: 'AU', coords: { lat: -37.8136, lng: 144.9631 } },
  { slug: 'brisbane', city: 'Brisbane', region: 'Queensland', country: 'AU', coords: { lat: -27.4698, lng: 153.0251 } },
  { slug: 'perth', city: 'Perth', region: 'Western Australia', country: 'AU', coords: { lat: -31.9505, lng: 115.8605 } },
  { slug: 'adelaide', city: 'Adelaide', region: 'South Australia', country: 'AU', coords: { lat: -34.9285, lng: 138.6007 } },
  { slug: 'gold-coast', city: 'Gold Coast', region: 'Queensland', country: 'AU', coords: { lat: -28.0167, lng: 153.4000 } },
  { slug: 'canberra', city: 'Canberra', region: 'Australian Capital Territory', country: 'AU', coords: { lat: -35.2809, lng: 149.1300 } },
  { slug: 'hobart', city: 'Hobart', region: 'Tasmania', country: 'AU', coords: { lat: -42.8821, lng: 147.3272 } },
]

// New Zealand Locations with geo-targeting data
const nzLocations = [
  { slug: 'auckland', city: 'Auckland', region: 'Auckland Region', country: 'NZ', coords: { lat: -36.8509, lng: 174.7645 } },
  { slug: 'wellington', city: 'Wellington', region: 'Wellington Region', country: 'NZ', coords: { lat: -41.2866, lng: 174.7756 } },
]

// Canada Locations with geo-targeting data
const caLocations = [
  { slug: 'toronto', city: 'Toronto', region: 'Ontario', country: 'CA', coords: { lat: 43.6532, lng: -79.3832 } },
  { slug: 'vancouver', city: 'Vancouver', region: 'British Columbia', country: 'CA', coords: { lat: 49.2827, lng: -123.1207 } },
  { slug: 'montreal', city: 'Montreal', region: 'Quebec', country: 'CA', coords: { lat: 45.5017, lng: -73.5673 } },
]

// All locations combined
const allLocations = [...ukLocations, ...usaLocations, ...auLocations, ...nzLocations, ...caLocations]

// Helper to get hreflang based on country
const getHreflang = (country: string): string => {
  switch (country) {
    case 'GB': return 'en-GB'
    case 'US': return 'en-US'
    case 'AU': return 'en-AU'
    case 'NZ': return 'en-NZ'
    case 'CA': return 'en-CA'
    default: return 'en'
  }
}

// Services for geo pages
const geoServices = [
  { slug: 'seo-agency', name: 'SEO Agency' },
  { slug: 'web-design', name: 'Web Design' },
  { slug: 'digital-marketing-agency', name: 'Digital Marketing Agency' },
  { slug: 'paid-media-agency', name: 'Paid Media Agency' },
]

// Generate all location pages dynamically
const locationPages = allLocations.flatMap(loc => 
  geoServices.map(service => ({
    path: `/${service.slug}/${loc.slug}`,
    city: loc.city,
    region: loc.region,
    country: loc.country,
    coords: loc.coords,
    hreflang: getHreflang(loc.country),
  }))
)

// Comparison pages
const comparisonPages = [
  'avorria-vs-typical-agency',
  'avorria-vs-diy',
]

// Industry landing pages (service-for-industry combinations)
const industryLandingPages = [
  // SEO for industries
  { path: '/seo/for/trades-home-services', priority: '0.8' },
  { path: '/seo/for/trades', priority: '0.8' },
  { path: '/seo/for/professional-services', priority: '0.8' },
  { path: '/seo/for/b2b-saas', priority: '0.8' },
  { path: '/seo/for/saas', priority: '0.8' },
  { path: '/seo/for/ecommerce-brands', priority: '0.8' },
  { path: '/seo/for/ecommerce', priority: '0.8' },
  { path: '/seo/for/multi-location-brands', priority: '0.8' },
  { path: '/seo/for/multi-location', priority: '0.8' },
  // Web design for industries
  { path: '/web-design/for/trades-home-services', priority: '0.8' },
  { path: '/web-design/for/trades', priority: '0.8' },
  { path: '/web-design/for/professional-services', priority: '0.8' },
  { path: '/web-design/for/b2b-saas', priority: '0.8' },
  { path: '/web-design/for/saas', priority: '0.8' },
  { path: '/web-design/for/ecommerce-brands', priority: '0.8' },
  { path: '/web-design/for/ecommerce', priority: '0.8' },
  { path: '/web-design/for/multi-location-brands', priority: '0.8' },
  { path: '/web-design/for/multi-location', priority: '0.8' },
  // Paid media for industries
  { path: '/paid-media/for/trades-home-services', priority: '0.8' },
  { path: '/paid-media/for/trades', priority: '0.8' },
  { path: '/paid-media/for/professional-services', priority: '0.8' },
  { path: '/paid-media/for/b2b-saas', priority: '0.8' },
  { path: '/paid-media/for/saas', priority: '0.8' },
  { path: '/paid-media/for/ecommerce-brands', priority: '0.8' },
  { path: '/paid-media/for/ecommerce', priority: '0.8' },
  { path: '/paid-media/for/multi-location-brands', priority: '0.8' },
  { path: '/paid-media/for/multi-location', priority: '0.8' },
  // Digital marketing for industries
  { path: '/digital-marketing/for/trades-home-services', priority: '0.8' },
  { path: '/digital-marketing/for/trades', priority: '0.8' },
  { path: '/digital-marketing/for/professional-services', priority: '0.8' },
  { path: '/digital-marketing/for/b2b-saas', priority: '0.8' },
  { path: '/digital-marketing/for/saas', priority: '0.8' },
  { path: '/digital-marketing/for/ecommerce-brands', priority: '0.8' },
  { path: '/digital-marketing/for/ecommerce', priority: '0.8' },
  { path: '/digital-marketing/for/multi-location-brands', priority: '0.8' },
  { path: '/digital-marketing/for/multi-location', priority: '0.8' },
]

// Static pages with their priorities (excluding location pages - handled separately)
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
  { path: '/case-studies', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/why-avorria', priority: '0.8', changefreq: 'monthly' },
  // Hub pages
  { path: '/industries', priority: '0.9', changefreq: 'weekly' },
  { path: '/locations', priority: '0.9', changefreq: 'weekly' },
  // Service pillar pages
  { path: '/services/seo', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/paid-media', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/web-design', priority: '0.9', changefreq: 'weekly' },
  { path: '/web-design', priority: '0.9', changefreq: 'weekly' },
  { path: '/seo-agency', priority: '0.9', changefreq: 'weekly' },
  { path: '/digital-marketing-agency', priority: '0.9', changefreq: 'weekly' },
  { path: '/paid-media-agency', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/content-email', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/social-personal-brand', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/analytics', priority: '0.8', changefreq: 'monthly' },
  // SEO sub-services
  { path: '/services/seo/local-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/seo/technical-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/seo/content-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/seo/analytics-tracking', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/seo/website-migrations', priority: '0.7', changefreq: 'monthly' },
  // Lead capture pages
  { path: '/free-seo-website-audit', priority: '0.9', changefreq: 'weekly' },
  { path: '/project-estimator', priority: '0.8', changefreq: 'monthly' },
  { path: '/website-health-check', priority: '0.8', changefreq: 'monthly' },
  { path: '/agency-report-teardown', priority: '0.7', changefreq: 'monthly' },
  // Tools and resources
  { path: '/tools', priority: '0.7', changefreq: 'monthly' },
  { path: '/web-design/studio', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources', priority: '0.8', changefreq: 'weekly' },
  { path: '/resources/seo-glossary', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources/marketing-assets', priority: '0.6', changefreq: 'monthly' },
  { path: '/faqs', priority: '0.7', changefreq: 'monthly' },
  // Reporting
  { path: '/reporting', priority: '0.6', changefreq: 'monthly' },
  { path: '/reporting/demo', priority: '0.5', changefreq: 'monthly' },
  // Misc
  { path: '/websites-we-would-fire', priority: '0.6', changefreq: 'monthly' },
  { path: '/sitemap', priority: '0.5', changefreq: 'weekly' },
  { path: '/agency-report-teardown/thanks', priority: '0.3', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const type = url.searchParams.get('type') || 'main'

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const baseUrl = 'https://avorria.com'
    const today = new Date().toISOString().split('T')[0]

    // Helper to escape XML special characters
    const escapeXml = (str: string): string => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
    }

    // NEWS SITEMAP
    if (type === 'news') {
      let newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`
      for (const article of resourceArticles) {
        newsSitemap += `  <url>
    <loc>${baseUrl}/resources/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Avorria</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${article.published}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      <news:keywords>${article.keywords.join(', ')}</news:keywords>
    </news:news>
  </url>
`
      }
      newsSitemap += `</urlset>`

      console.log(`Generated news sitemap with ${resourceArticles.length} articles`)
      return new Response(newsSitemap, { headers: corsHeaders, status: 200 })
    }

    // GEO SITEMAP (for location pages) - uses standard format with hreflang for geo-targeting
    if (type === 'geo') {
      let geoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`
      for (const loc of locationPages) {
        geoSitemap += `  <url>
    <loc>${baseUrl}${loc.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="${loc.hreflang}" href="${baseUrl}${loc.path}"/>
  </url>
`
      }
      geoSitemap += `</urlset>`

      console.log(`Generated geo sitemap with ${locationPages.length} location pages`)
      return new Response(geoSitemap, { headers: corsHeaders, status: 200 })
    }

    // SITEMAP INDEX (returns index pointing to all sitemaps)
    if (type === 'index') {
      const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-news.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-geo.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`

      console.log('Generated sitemap index')
      return new Response(sitemapIndex, { headers: corsHeaders, status: 200 })
    }

    // MAIN SITEMAP (default)
    const { data: caseStudies, error } = await supabase
      .from('case_studies')
      .select('slug, updated_at, hero_media_src, hero_media_type, title, headline, client, sector, services')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching case studies:', error)
    }

    const generateImageCaption = (study: any): string => {
      const services = Array.isArray(study.services) ? study.services.join(', ') : ''
      return `${study.client} ${study.sector} case study - ${services} results by Avorria digital marketing agency`
    }

    const generateImageTitle = (study: any): string => {
      return `${study.headline || study.title} | ${study.client} Success Story`
    }

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

    // Add static pages
    for (const page of staticPages) {
      sitemap += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
    }

    // Add location pages with hreflang for proper geo targeting
    for (const loc of locationPages) {
      sitemap += `  <url>
    <loc>${baseUrl}${loc.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="${loc.hreflang}" href="${baseUrl}${loc.path}"/>
  </url>
`
    }

    // Add case studies with image entries
    if (caseStudies && caseStudies.length > 0) {
      for (const study of caseStudies) {
        const lastmod = study.updated_at 
          ? new Date(study.updated_at).toISOString().split('T')[0]
          : today
        
        let imageEntry = ''
        if (study.hero_media_src && study.hero_media_type === 'image') {
          const imageUrl = study.hero_media_src.startsWith('http') 
            ? study.hero_media_src 
            : `${baseUrl}${study.hero_media_src}`
          const caption = escapeXml(generateImageCaption(study))
          const title = escapeXml(generateImageTitle(study))
          
          imageEntry = `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:caption>${caption}</image:caption>
      <image:title>${title}</image:title>
    </image:image>`
        }

        sitemap += `  <url>
    <loc>${baseUrl}/case-studies/${study.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>${imageEntry}
  </url>
`
      }
    }

    // Add resource articles
    for (const article of resourceArticles) {
      sitemap += `  <url>
    <loc>${baseUrl}/resources/${article.slug}</loc>
    <lastmod>${article.published}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
    }

    // Add industry landing pages (service-for-industry)
    for (const page of industryLandingPages) {
      sitemap += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
    }

    // Add comparison pages
    for (const slug of comparisonPages) {
      sitemap += `  <url>
    <loc>${baseUrl}/why/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
    }

    sitemap += `</urlset>`

    console.log(`Generated main sitemap with ${staticPages.length} static, ${locationPages.length} location, ${industryLandingPages.length} industry, ${caseStudies?.length || 0} case studies, ${resourceArticles.length} resources`)

    return new Response(sitemap, { headers: corsHeaders, status: 200 })
  } catch (error: unknown) {
    console.error('Sitemap generation error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(`Error generating sitemap: ${message}`, {
      headers: { 'Content-Type': 'text/plain' },
      status: 500,
    })
  }
})
