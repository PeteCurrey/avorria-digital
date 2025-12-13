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

// Location pages with geo-targeting data
const locationPages = [
  { 
    path: '/seo-agency/sheffield', 
    city: 'Sheffield', 
    region: 'South Yorkshire',
    country: 'GB',
    coords: { lat: 53.3811, lng: -1.4701 }
  },
  { 
    path: '/seo-agency/london', 
    city: 'London', 
    region: 'Greater London',
    country: 'GB',
    coords: { lat: 51.5074, lng: -0.1278 }
  },
  { 
    path: '/web-design/sheffield', 
    city: 'Sheffield', 
    region: 'South Yorkshire',
    country: 'GB',
    coords: { lat: 53.3811, lng: -1.4701 }
  },
  { 
    path: '/digital-marketing-agency/yorkshire', 
    city: 'Yorkshire', 
    region: 'Yorkshire and the Humber',
    country: 'GB',
    coords: { lat: 53.9591, lng: -1.0815 }
  },
  { 
    path: '/digital-marketing-agency/uk', 
    city: 'United Kingdom', 
    region: 'UK',
    country: 'GB',
    coords: { lat: 55.3781, lng: -3.4360 }
  },
]

// Landing pages (service-industry combinations)
const landingPages = [
  'seo-trades-home-services',
  'seo-professional-services',
  'seo-b2b-saas',
  'seo-ecommerce-brands',
  'seo-multi-location-brands',
  'web-design-trades',
  'paid-media-professional-services',
]

// Comparison pages
const comparisonPages = [
  'avorria-vs-typical-agency',
  'avorria-vs-diy',
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
  { path: '/services/seo', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/paid-media', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/web-design', priority: '0.9', changefreq: 'weekly' },
  { path: '/web-design', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/content-email', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/social-personal-brand', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/analytics', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/seo/local-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/seo/technical-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/seo/content-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/seo/analytics-tracking', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/seo/website-migrations', priority: '0.7', changefreq: 'monthly' },
  { path: '/free-seo-website-audit', priority: '0.9', changefreq: 'weekly' },
  { path: '/project-estimator', priority: '0.8', changefreq: 'monthly' },
  { path: '/website-health-check', priority: '0.8', changefreq: 'monthly' },
  { path: '/agency-report-teardown', priority: '0.7', changefreq: 'monthly' },
  { path: '/tools', priority: '0.7', changefreq: 'monthly' },
  { path: '/web-design/studio', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources', priority: '0.8', changefreq: 'weekly' },
  { path: '/resources/seo-glossary', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources/marketing-assets', priority: '0.6', changefreq: 'monthly' },
  { path: '/faqs', priority: '0.7', changefreq: 'monthly' },
  { path: '/reporting', priority: '0.6', changefreq: 'monthly' },
  { path: '/reporting/demo', priority: '0.5', changefreq: 'monthly' },
  { path: '/websites-we-would-fire', priority: '0.6', changefreq: 'monthly' },
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

    // GEO SITEMAP (for location pages)
    if (type === 'geo') {
      let geoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0">
`
      for (const loc of locationPages) {
        geoSitemap += `  <url>
    <loc>${baseUrl}${loc.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <geo:geo>
      <geo:format>kml</geo:format>
    </geo:geo>
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
    <loc>${supabaseUrl}/functions/v1/sitemap</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${supabaseUrl}/functions/v1/sitemap?type=news</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${supabaseUrl}/functions/v1/sitemap?type=geo</loc>
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

    // Add location pages with hreflang for UK targeting
    for (const loc of locationPages) {
      sitemap += `  <url>
    <loc>${baseUrl}${loc.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en-GB" href="${baseUrl}${loc.path}"/>
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

    // Add landing pages
    for (const slug of landingPages) {
      let path = ''
      if (slug.startsWith('seo-')) {
        path = `/seo/for/${slug.replace('seo-', '')}`
      } else if (slug.startsWith('web-design-')) {
        path = `/web-design/for/${slug.replace('web-design-', '')}`
      } else if (slug.startsWith('paid-media-')) {
        path = `/paid-media/for/${slug.replace('paid-media-', '')}`
      }
      
      if (path) {
        sitemap += `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
      }
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

    console.log(`Generated main sitemap with ${staticPages.length} static, ${locationPages.length} location, ${caseStudies?.length || 0} case studies, ${resourceArticles.length} resources`)

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
