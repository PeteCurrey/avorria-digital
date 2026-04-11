import { MetadataRoute } from 'next';

const SITE_URL = "https://avorria.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1.0 },
    { path: '/about', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/services', priority: 0.8 },
    { path: '/services/seo', priority: 0.7 },
    { path: '/services/paid-media', priority: 0.7 },
    { path: '/services/web-design', priority: 0.7 },
    { path: '/privacy', priority: 0.5 },
    { path: '/terms', priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route.priority,
  }));
}
