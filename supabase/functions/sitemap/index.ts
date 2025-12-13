import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
}

// Static resources from the app
const staticResources = [
  'seo-for-real-businesses',
  'high-converting-websites-service-businesses',
  'marketing-analytics-tracking-playbook',
]

// Landing pages (service-industry and service-location combinations)
const landingPages = [
  // Service-Industry pages
  'seo-trades-home-services',
  'seo-professional-services',
  'seo-b2b-saas',
  'seo-ecommerce-brands',
  'seo-multi-location-brands',
  'web-design-trades',
  'paid-media-professional-services',
  // Service-Location pages
  'seo-london',
  'seo-agency-sheffield',
  'seo-agency-london',
  'web-design-sheffield',
  'digital-marketing-agency-yorkshire',
  'digital-marketing-agency-uk',
]

// Comparison pages
const comparisonPages = [
  'avorria-vs-typical-agency',
  'avorria-vs-diy',
]

// Static pages with their priorities
const staticPages = [
  // Homepage
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  
  // Core commercial pages
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
  { path: '/case-studies', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/why-avorria', priority: '0.8', changefreq: 'monthly' },
  
  // Service pillar pages
  { path: '/services/seo', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/paid-media', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/web-design', priority: '0.9', changefreq: 'weekly' },
  { path: '/web-design', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/content-email', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/social-personal-brand', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/analytics', priority: '0.8', changefreq: 'monthly' },
  
  // SEO sub-service pages
  { path: '/services/seo/local-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/seo/technical-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/seo/content-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/seo/analytics-tracking', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/seo/website-migrations', priority: '0.7', changefreq: 'monthly' },
  
  // Lead generation / tools
  { path: '/free-seo-website-audit', priority: '0.9', changefreq: 'weekly' },
  { path: '/project-estimator', priority: '0.8', changefreq: 'monthly' },
  { path: '/website-health-check', priority: '0.8', changefreq: 'monthly' },
  { path: '/agency-report-teardown', priority: '0.7', changefreq: 'monthly' },
  { path: '/tools', priority: '0.7', changefreq: 'monthly' },
  
  // Studio
  { path: '/web-design/studio', priority: '0.7', changefreq: 'monthly' },
  
  // Resources
  { path: '/resources', priority: '0.8', changefreq: 'weekly' },
  { path: '/resources/seo-glossary', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources/marketing-assets', priority: '0.6', changefreq: 'monthly' },
  
  // FAQs
  { path: '/faqs', priority: '0.7', changefreq: 'monthly' },
  
  // Reporting demo
  { path: '/reporting', priority: '0.6', changefreq: 'monthly' },
  { path: '/reporting/demo', priority: '0.5', changefreq: 'monthly' },
  
  // Content pages
  { path: '/websites-we-would-fire', priority: '0.6', changefreq: 'monthly' },
  
  // Location pages (explicit routes)
  { path: '/seo-agency/sheffield', priority: '0.8', changefreq: 'monthly' },
  { path: '/seo-agency/london', priority: '0.8', changefreq: 'monthly' },
  { path: '/web-design/sheffield', priority: '0.8', changefreq: 'monthly' },
  { path: '/digital-marketing-agency/yorkshire', priority: '0.8', changefreq: 'monthly' },
  { path: '/digital-marketing-agency/uk', priority: '0.8', changefreq: 'monthly' },
  
  // Legal pages
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch published case studies
    const { data: caseStudies, error } = await supabase
      .from('case_studies')
      .select('slug, updated_at')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching case studies:', error)
    }

    const baseUrl = 'https://avorria.com'
    const today = new Date().toISOString().split('T')[0]

    // Generate sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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

    // Add case studies from database
    if (caseStudies && caseStudies.length > 0) {
      for (const study of caseStudies) {
        const lastmod = study.updated_at 
          ? new Date(study.updated_at).toISOString().split('T')[0]
          : today
        sitemap += `  <url>
    <loc>${baseUrl}/case-studies/${study.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
      }
    }

    // Add resources
    for (const slug of staticResources) {
      sitemap += `  <url>
    <loc>${baseUrl}/resources/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
    }

    // Add landing pages (service-for-industry pattern)
    for (const slug of landingPages) {
      // Determine the correct URL pattern based on the slug
      let path = ''
      if (slug.includes('-agency-') || slug === 'seo-london' || slug === 'web-design-sheffield') {
        // Location-based landing pages are handled by static routes above
        continue
      } else {
        // Industry-based landing pages: /seo/for/trades-home-services
        const parts = slug.split('-')
        const service = parts[0] // e.g., 'seo', 'web', 'paid'
        if (slug.startsWith('seo-')) {
          path = `/seo/for/${slug.replace('seo-', '')}`
        } else if (slug.startsWith('web-design-')) {
          path = `/web-design/for/${slug.replace('web-design-', '')}`
        } else if (slug.startsWith('paid-media-')) {
          path = `/paid-media/for/${slug.replace('paid-media-', '')}`
        }
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

    console.log(`Generated sitemap with ${staticPages.length} static pages, ${caseStudies?.length || 0} case studies, ${staticResources.length} resources, ${landingPages.length} landing pages, and ${comparisonPages.length} comparison pages`)

    return new Response(sitemap, {
      headers: corsHeaders,
      status: 200,
    })
  } catch (error: unknown) {
    console.error('Sitemap generation error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(`Error generating sitemap: ${message}`, {
      headers: { 'Content-Type': 'text/plain' },
      status: 500,
    })
  }
})
