import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { locations } from "@/data/locations";
import { industries } from "@/data/industries";

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const Sitemap = () => {
  const today = new Date().toISOString().split('T')[0];
  const baseUrl = "https://avorria.com";

  // Services for location pages
  const geoServices = [
    { slug: 'seo-agency', name: 'SEO Agency' },
    { slug: 'web-design', name: 'Web Design' },
    { slug: 'digital-marketing-agency', name: 'Digital Marketing Agency' },
    { slug: 'paid-media-agency', name: 'Paid Media Agency' },
  ];

  // Industry page service mappings
  const industryServices = [
    { prefix: 'seo', name: 'SEO' },
    { prefix: 'web-design', name: 'Web Design' },
    { prefix: 'paid-media', name: 'Paid Media' },
    { prefix: 'digital-marketing', name: 'Digital Marketing' },
  ];

  // Get unique industry slugs
  const uniqueIndustries = [...new Set(industries.map(i => i.slug))];

  // Build all sitemap entries
  const entries: SitemapEntry[] = [
    // Core pages
    { url: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { url: '/services', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/contact', lastmod: today, changefreq: 'monthly', priority: '0.9' },
    { url: '/pricing', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/case-studies', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/about', lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { url: '/why-avorria', lastmod: today, changefreq: 'monthly', priority: '0.8' },
    
    // Hub pages
    { url: '/industries', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/locations', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    
    // Service pillar pages
    { url: '/services/seo', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/services/paid-media', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/services/web-design', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/web-design', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/seo-agency', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/digital-marketing-agency', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/paid-media-agency', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/services/content-email', lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { url: '/services/social-personal-brand', lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { url: '/services/analytics', lastmod: today, changefreq: 'monthly', priority: '0.8' },
    
    // SEO sub-services
    { url: '/services/seo/local-seo', lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { url: '/services/seo/technical-seo', lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { url: '/services/seo/content-seo', lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { url: '/services/seo/analytics-tracking', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: '/services/seo/website-migrations', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    
    // Lead capture pages
    { url: '/free-seo-website-audit', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { url: '/project-estimator', lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { url: '/website-health-check', lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { url: '/agency-report-teardown', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: '/agency-report-teardown/thanks', lastmod: today, changefreq: 'monthly', priority: '0.3' },
    
    // Tools and resources
    { url: '/tools', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: '/web-design/studio', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: '/resources', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { url: '/resources/seo-glossary', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: '/resources/marketing-assets', lastmod: today, changefreq: 'monthly', priority: '0.6' },
    { url: '/resources/seo-for-real-businesses', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: '/resources/high-converting-websites-service-businesses', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: '/resources/marketing-analytics-tracking-playbook', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: '/faqs', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    
    // Reporting
    { url: '/reporting', lastmod: today, changefreq: 'monthly', priority: '0.6' },
    { url: '/reporting/demo', lastmod: today, changefreq: 'monthly', priority: '0.5' },
    
    // Comparison pages
    { url: '/why/avorria-vs-typical-agency', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: '/why/avorria-vs-diy', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    
    // Misc
    { url: '/websites-we-would-fire', lastmod: today, changefreq: 'monthly', priority: '0.6' },
    { url: '/sitemap', lastmod: today, changefreq: 'weekly', priority: '0.5' },
    
    // Legal pages
    { url: '/privacy', lastmod: today, changefreq: 'yearly', priority: '0.3' },
    { url: '/terms', lastmod: today, changefreq: 'yearly', priority: '0.3' },
  ];

  // Add location pages (4 services x 38 locations = 152 pages)
  locations.forEach(loc => {
    geoServices.forEach(service => {
      entries.push({
        url: `/${service.slug}/${loc.slug}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.8',
      });
    });
  });

  // Add industry landing pages (4 services x unique industries)
  uniqueIndustries.forEach(industrySlug => {
    industryServices.forEach(service => {
      entries.push({
        url: `/${service.prefix}/for/${industrySlug}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.8',
      });
    });
  });

  // Calculate statistics
  const totalUrls = entries.length;
  const highPriority = entries.filter(e => parseFloat(e.priority) >= 0.8).length;
  const mediumPriority = entries.filter(e => parseFloat(e.priority) >= 0.6 && parseFloat(e.priority) < 0.8).length;
  const lowPriority = entries.filter(e => parseFloat(e.priority) < 0.6).length;

  return (
    <>
      <Helmet>
        <title>XML Sitemap | Avorria.com</title>
        <meta name="description" content="Complete sitemap of Avorria.com with all pages, services, locations, and resources for SEO and navigation." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-[#4285f4] py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-white text-xl font-normal">XML Sitemap</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Description */}
          <p className="text-foreground mb-6">
            This sitemap contains <strong>{totalUrls}</strong> URLs for{" "}
            <a 
              href={baseUrl} 
              className="text-[#4285f4] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              avorria.com
            </a>
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{totalUrls}</div>
              <div className="text-sm text-muted-foreground">Total URLs</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{highPriority}</div>
              <div className="text-sm text-muted-foreground">High Priority (≥0.8)</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{mediumPriority}</div>
              <div className="text-sm text-muted-foreground">Medium (0.6-0.7)</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-muted-foreground">{lowPriority}</div>
              <div className="text-sm text-muted-foreground">Lower (&lt;0.6)</div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">URL</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground hidden sm:table-cell">Last Modified</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground hidden md:table-cell">Change Frequency</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Priority</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr 
                    key={entry.url} 
                    className={`border-b border-border hover:bg-muted/30 transition-colors ${
                      index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                    }`}
                  >
                    <td className="py-2 px-4">
                      <a 
                        href={`${baseUrl}${entry.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4285f4] hover:underline flex items-center gap-1"
                      >
                        {baseUrl}{entry.url}
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    </td>
                    <td className="py-2 px-4 text-muted-foreground hidden sm:table-cell">
                      {entry.lastmod}
                    </td>
                    <td className="py-2 px-4 text-muted-foreground capitalize hidden md:table-cell">
                      {entry.changefreq}
                    </td>
                    <td className="py-2 px-4">
                      <span className="text-[#dc3545] font-medium">{entry.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <p className="text-muted-foreground text-sm mt-6">
            This is an HTML representation of the XML sitemap. The actual XML sitemap is available at{" "}
            <a 
              href={`${baseUrl}/sitemap.xml`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4285f4] hover:underline"
            >
              {baseUrl}/sitemap.xml
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Sitemap;
