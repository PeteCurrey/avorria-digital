import { MetadataRoute } from 'next';
import { routeMetadata, SITE_URL } from '@/data/routeMetadata';
import { supabase } from '@/integrations/supabase/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Get all routes defined in our central registry
  const registryRoutes = Object.keys(routeMetadata).map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  // 2. Fetch dynamic case studies from Supabase
  let caseStudyRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: caseStudies } = await supabase
      .from('case_studies')
      .select('slug, updated_at')
      .eq('is_published', true);

    if (caseStudies) {
      caseStudyRoutes = caseStudies.map((study) => ({
        url: `${SITE_URL}/case-studies/${study.slug}`,
        lastModified: new Date(study.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching case studies for sitemap:', error);
  }

  // 3. Combine and return
  return [...registryRoutes, ...caseStudyRoutes];
}
