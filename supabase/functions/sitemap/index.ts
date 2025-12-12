import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
}

// Static resources from the app
const staticResources = [
  'seo-audit-checklist-2024',
  'google-analytics-4-setup-guide',
  'local-seo-strategy-guide',
  'content-marketing-roi-framework',
  'technical-seo-fundamentals',
  'paid-media-budget-optimization',
  'website-speed-optimization-guide',
  'email-marketing-automation-playbook',
]

// Static pages with their priorities
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/seo-services', priority: '0.9', changefreq: 'weekly' },
  { path: '/web-design', priority: '0.9', changefreq: 'weekly' },
  { path: '/paid-media', priority: '0.9', changefreq: 'weekly' },
  { path: '/content-email', priority: '0.9', changefreq: 'weekly' },
  { path: '/social-personal-brand', priority: '0.9', changefreq: 'weekly' },
  { path: '/case-studies', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.8', changefreq: 'weekly' },
  { path: '/resources', priority: '0.7', changefreq: 'weekly' },
  { path: '/faqs', priority: '0.6', changefreq: 'monthly' },
  { path: '/why-avorria', priority: '0.7', changefreq: 'monthly' },
  { path: '/seo/technical-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/seo/local-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/seo/content-seo', priority: '0.8', changefreq: 'monthly' },
  { path: '/seo/analytics-tracking', priority: '0.8', changefreq: 'monthly' },
  { path: '/seo/website-migrations', priority: '0.8', changefreq: 'monthly' },
  { path: '/tools/website-health-check', priority: '0.7', changefreq: 'monthly' },
  { path: '/tools/agency-teardown', priority: '0.7', changefreq: 'monthly' },
  { path: '/tools/project-estimator', priority: '0.7', changefreq: 'monthly' },
  { path: '/web-design-studio', priority: '0.7', changefreq: 'monthly' },
  { path: '/seo-glossary', priority: '0.6', changefreq: 'monthly' },
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

    sitemap += `</urlset>`

    console.log(`Generated sitemap with ${staticPages.length} static pages, ${caseStudies?.length || 0} case studies, and ${staticResources.length} resources`)

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
