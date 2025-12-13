import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Alert {
  id: string;
  client_id: string | null;
  client_name: string | null;
  type: string;
  severity: string;
  description: string | null;
  is_resolved: boolean;
  resolved_at: string | null;
  created_at: string;
}

export interface AlertInsert {
  client_id?: string;
  client_name?: string;
  type: string;
  severity?: string;
  description?: string;
  is_resolved?: boolean;
}

export interface AlertUpdate {
  type?: string;
  severity?: string;
  description?: string;
  is_resolved?: boolean;
  resolved_at?: string;
}

export function useAlerts(options?: { unresolved?: boolean }) {
  return useQuery({
    queryKey: ['alerts', options],
    queryFn: async () => {
      let query = supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (options?.unresolved) {
        query = query.eq('is_resolved', false);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Alert[];
    },
  });
}

export function useCreateAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (alert: AlertInsert) => {
      const { data, error } = await supabase
        .from('alerts')
        .insert(alert)
        .select()
        .single();

      if (error) throw error;
      return data as Alert;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}

export function useResolveAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('alerts')
        .update({ 
          is_resolved: true, 
          resolved_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Alert;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}

export function useDeleteAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('alerts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}
