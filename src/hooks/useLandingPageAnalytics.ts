import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface LandingPageAnalyticsSummary {
  landing_page_id: string;
  total_views: number;
  total_conversions: number;
  avg_bounce_rate: number;
  conversion_rate: number;
}

export interface LandingPageAnalyticsDetail {
  id: string;
  landing_page_id: string;
  date: string;
  page_views: number;
  unique_visitors: number;
  conversions: number;
  bounce_rate: number;
  avg_time_on_page: number;
}

// ------------------------------ Service-Industry Landing Pages ------------------------------
export function useLandingPageAnalyticsSummary() {
  return useQuery({
    queryKey: ['landing-page-analytics', 'summary'],
    queryFn: async () => {
      // Get last 30 days of analytics aggregated by page
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('landing_page_analytics')
        .select('landing_page_id, page_views, conversions, bounce_rate')
        .gte('date', thirtyDaysAgo.toISOString().split('T')[0]);

      if (error) throw error;

      // Aggregate by landing_page_id
      const aggregated: Record<string, LandingPageAnalyticsSummary> = {};
      
      (data || []).forEach((row: any) => {
        const id = row.landing_page_id;
        if (!aggregated[id]) {
          aggregated[id] = {
            landing_page_id: id,
            total_views: 0,
            total_conversions: 0,
            avg_bounce_rate: 0,
            conversion_rate: 0,
          };
        }
        aggregated[id].total_views += row.page_views || 0;
        aggregated[id].total_conversions += row.conversions || 0;
      });

      // Calculate averages and rates
      Object.values(aggregated).forEach(summary => {
        const rows = (data || []).filter((r: any) => r.landing_page_id === summary.landing_page_id);
        const bounceSum = rows.reduce((sum: number, r: any) => sum + (parseFloat(r.bounce_rate) || 0), 0);
        summary.avg_bounce_rate = rows.length > 0 ? bounceSum / rows.length : 0;
        summary.conversion_rate = summary.total_views > 0 
          ? (summary.total_conversions / summary.total_views) * 100 
          : 0;
      });

      return aggregated;
    },
  });
}

// Get detailed analytics for a specific landing page
export function useLandingPageAnalyticsDetail(landingPageId: string | null) {
  return useQuery({
    queryKey: ['landing-page-analytics', 'detail', landingPageId],
    queryFn: async () => {
      if (!landingPageId) return null;

      const { data, error } = await supabase
        .from('landing_page_analytics')
        .select('*')
        .eq('landing_page_id', landingPageId)
        .order('date', { ascending: false })
        .limit(30);

      if (error) throw error;
      return data as LandingPageAnalyticsDetail[];
    },
    enabled: !!landingPageId,
  });
}
