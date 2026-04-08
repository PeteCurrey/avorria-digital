'use client';
import Link from "next/link";
import React, { useState, useMemo } from "react";
import SEOHead from "@/components/seo/SEOHead";
import { ExternalLink, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { locations } from "@/data/locations";
import { industries } from "@/data/industries";

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

type SortColumn = 'url' | 'lastmod' | 'changefreq' | 'priority';
type SortDirection = 'asc' | 'desc';

const changefreqOrder: Record<string, number> = {
  daily: 1,
  weekly: 2,
  monthly: 3,
  yearly: 4,
};

const Sitemap = () => {
  const [sortColumn, setSortColumn] = useState<SortColumn>('priority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
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

  // Add location pages (4 services x locations) - use slash pattern to match routes
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

  // Add industry landing pages using /lp/ pattern (matches actual route)
  const industryLandingPages = [
    'seo-trades-home-services',
    'seo-professional-services',
    'seo-b2b-saas',
    'seo-ecommerce-brands',
    'seo-multi-location-brands',
    'web-design-trades-home-services',
    'web-design-professional-services',
    'web-design-b2b-saas',
    'web-design-ecommerce-brands',
    'paid-media-trades-home-services',
    'paid-media-professional-services',
    'paid-media-b2b-saas',
    'paid-media-ecommerce-brands',
    'digital-marketing-trades-home-services',
    'digital-marketing-professional-services',
    'digital-marketing-b2b-saas',
    'digital-marketing-ecommerce-brands',
    'digital-marketing-multi-location-brands',
  ];
  
  industryLandingPages.forEach(slug => {
    entries.push({
      url: `/lp/${slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    });
  });

  // Sorted entries
  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => {
      let comparison = 0;
      
      switch (sortColumn) {
        case 'url':
          comparison = a.url.localeCompare(b.url);
          break;
        case 'lastmod':
          comparison = a.lastmod.localeCompare(b.lastmod);
          break;
        case 'changefreq':
          comparison = (changefreqOrder[a.changefreq] || 5) - (changefreqOrder[b.changefreq] || 5);
          break;
        case 'priority':
          comparison = parseFloat(a.priority) - parseFloat(b.priority);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [entries, sortColumn, sortDirection]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection(column === 'priority' ? 'desc' : 'asc');
    }
  };

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="w-4 h-4 opacity-40" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4" /> 
      : <ArrowDown className="w-4 h-4" />;
  };

  // Calculate statistics
  const totalUrls = entries.length;
  const highPriority = entries.filter(e => parseFloat(e.priority) >= 0.8).length;
  const mediumPriority = entries.filter(e => parseFloat(e.priority) >= 0.6 && parseFloat(e.priority) < 0.8).length;
  const lowPriority = entries.filter(e => parseFloat(e.priority) < 0.6).length;

  return (
    <>
      <SEOHead
        title="XML Sitemap | Avorria.com"
        description="Complete sitemap of Avorria.com with all pages, services, locations, and resources."
        canonical="/sitemap"
        noindex={true}
      />

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
              <div className="text-sm text-muted-foreground">High Priority (=0.8)</div>
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
                  <th 
                    className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('url')}
                  >
                    <div className="flex items-center gap-2">
                      URL
                      <SortIcon column="url" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 font-medium text-foreground hidden sm:table-cell cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('lastmod')}
                  >
                    <div className="flex items-center gap-2">
                      Last Modified
                      <SortIcon column="lastmod" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 font-medium text-foreground hidden md:table-cell cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('changefreq')}
                  >
                    <div className="flex items-center gap-2">
                      Change Frequency
                      <SortIcon column="changefreq" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('priority')}
                  >
                    <div className="flex items-center gap-2">
                      Priority
                      <SortIcon column="priority" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedEntries.map((entry, index) => (
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


