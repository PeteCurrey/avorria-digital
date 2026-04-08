import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ClientStats {
  totalLeads: number;
  qualifiedLeads: number;
  pipelineValue: number;
  leadChange: number;
  qualifiedChange: number;
  pipelineChange: number;
}

export interface CurrentFocus {
  id: string;
  description: string;
}

// Get client statistics from database
export function useClientStats(clientId: string | null) {
  return useQuery({
    queryKey: ['client-stats', clientId],
    queryFn: async () => {
      // Get leads associated with this client (via campaigns or directly)
      const { data: leads, error } = await supabase
        .from('leads')
        .select('id, status, created_at, metadata')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculate stats
      const now = new Date();
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      const sixtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

      const currentPeriodLeads = (leads || []).filter(
        l => new Date(l.created_at) >= thirtyDaysAgo
      );
      const previousPeriodLeads = (leads || []).filter(
        l => new Date(l.created_at) >= sixtyDaysAgo && new Date(l.created_at) < thirtyDaysAgo
      );

      const currentQualified = currentPeriodLeads.filter(
        l => l.status === 'qualified' || l.status === 'contacted'
      ).length;
      const previousQualified = previousPeriodLeads.filter(
        l => l.status === 'qualified' || l.status === 'contacted'
      ).length;

      // Calculate changes
      const leadChange = previousPeriodLeads.length > 0 
        ? Math.round(((currentPeriodLeads.length - previousPeriodLeads.length) / previousPeriodLeads.length) * 100)
        : 0;
      const qualifiedChange = previousQualified > 0
        ? Math.round(((currentQualified - previousQualified) / previousQualified) * 100)
        : 0;

      // Estimate pipeline value (Â£5k per qualified lead as baseline)
      const pipelineValue = currentQualified * 5000;
      const previousPipelineValue = previousQualified * 5000;
      const pipelineChange = previousPipelineValue > 0
        ? Math.round(((pipelineValue - previousPipelineValue) / previousPipelineValue) * 100)
        : 0;

      return {
        totalLeads: currentPeriodLeads.length,
        qualifiedLeads: currentQualified,
        pipelineValue,
        leadChange,
        qualifiedChange,
        pipelineChange,
      } as ClientStats;
    },
    enabled: true, // Always fetch for now, can filter by clientId later
  });
}

// Get current focus items for a client
export function useClientFocus(clientId: string | null) {
  return useQuery({
    queryKey: ['client-focus', clientId],
    queryFn: async () => {
      // Get from client activities or campaigns
      const { data: campaigns, error } = await supabase
        .from('campaigns')
        .select('id, name, objective, status')
        .eq('status', 'active')
        .limit(5);

      if (error) throw error;

      // Transform campaigns into focus items
      const focusItems: CurrentFocus[] = (campaigns || []).map(c => ({
        id: c.id,
        description: c.objective || `${c.name} campaign in progress`,
      }));

      // Add some default focus items if no active campaigns
      if (focusItems.length === 0) {
        return [
          { id: '1', description: 'Scale paid media spend while maintaining target CPL' },
          { id: '2', description: 'Improve organic rankings for priority service pages' },
          { id: '3', description: 'Review and optimize conversion tracking setup' },
        ];
      }

      return focusItems;
    },
    enabled: true,
  });
}
