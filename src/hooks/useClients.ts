import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Client {
  id: string;
  name: string;
  industry: string | null;
  services: string[];
  monthly_value: string | null;
  status: string;
  owner_id: string | null;
  owner_name: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientInsert {
  name: string;
  industry?: string;
  services?: string[];
  monthly_value?: string;
  status?: string;
  owner_id?: string;
  owner_name?: string;
  notes?: string;
}

export interface ClientUpdate {
  name?: string;
  industry?: string;
  services?: string[];
  monthly_value?: string;
  status?: string;
  owner_id?: string;
  owner_name?: string;
  notes?: string;
}

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Client[];
    },
  });
}

export function useClient(id: string) {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Client | null;
    },
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (client: ClientInsert) => {
      const { data, error } = await supabase
        .from('clients')
        .insert(client)
        .select()
        .single();

      if (error) throw error;
      return data as Client;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ClientUpdate }) => {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Client;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}

export function useClientStats() {
  return useQuery({
    queryKey: ['clients', 'stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('status');

      if (error) throw error;

      const stats = {
        total: data?.length || 0,
        onboarding: data?.filter(c => c.status === 'onboarding').length || 0,
        live: data?.filter(c => c.status === 'live').length || 0,
        atRisk: data?.filter(c => c.status === 'at-risk').length || 0,
        paused: data?.filter(c => c.status === 'paused').length || 0,
      };

      return stats;
    },
  });
}
