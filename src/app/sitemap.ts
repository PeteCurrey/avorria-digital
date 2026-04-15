import { MetadataRoute } from 'next';
import { getAllSitemapUrls } from '@/data/sitemapUrls';

const SITE_URL = "https://avorria.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allUrls = await getAllSitemapUrls();
  
  // Flatten all categories into a single array
  const routes = [
    ...allUrls.core,
    ...allUrls.pillar,
    ...allUrls.serviceIndustry,
    ...allUrls.geo,
    ...allUrls.resources,
    ...allUrls.glossary,
    ...allUrls.comparisons,
    ...allUrls.caseStudies,
    ...allUrls.tools,
    ...allUrls.legal,
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path.startsWith('/') ? route.path : '/' + route.path}`,
    lastModified: route.lastMod ? new Date(route.lastMod) : new Date(),
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));
}
