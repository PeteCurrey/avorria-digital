import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsSnapshot {
  id: string;
  website_id: string;
  page_views: number | null;
  unique_visitors: number | null;
  bounce_rate: number | null;
  avg_session_duration: string | null;
  top_pages: Array<{ path: string; views: number; change?: number }> | null;
  conversions: Record<string, number> | null;
  snapshot_date: string;
  created_at: string;
}

export interface AnalyticsSnapshotInsert {
  website_id: string;
  page_views?: number;
  unique_visitors?: number;
  bounce_rate?: number;
  avg_session_duration?: string;
  top_pages?: Array<{ path: string; views: number; change?: number }>;
  conversions?: Record<string, number>;
  snapshot_date: string;
}

export function useAnalyticsSnapshots(websiteId?: string) {
  return useQuery({
    queryKey: ['analytics_snapshots', websiteId],
    queryFn: async () => {
      let query = supabase
        .from('analytics_snapshots')
        .select('*')
        .order('snapshot_date', { ascending: false });

      if (websiteId) {
        query = query.eq('website_id', websiteId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as AnalyticsSnapshot[];
    },
  });
}

export function useLatestAnalyticsSnapshot(websiteId?: string) {
  return useQuery({
    queryKey: ['analytics_snapshots', 'latest', websiteId],
    queryFn: async () => {
      let query = supabase
        .from('analytics_snapshots')
        .select('*')
        .order('snapshot_date', { ascending: false })
        .limit(1);

      if (websiteId) {
        query = query.eq('website_id', websiteId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data?.[0] as AnalyticsSnapshot | undefined;
    },
  });
}

export function useCreateAnalyticsSnapshot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (snapshot: AnalyticsSnapshotInsert) => {
      const { data, error } = await supabase
        .from('analytics_snapshots')
        .insert(snapshot)
        .select()
        .single();

      if (error) throw error;
      return data as AnalyticsSnapshot;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics_snapshots'] });
    },
  });
}
