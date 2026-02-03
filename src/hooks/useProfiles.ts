import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export function useProfiles() {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, avatar_url, created_at, updated_at')
        .order('email');

      if (error) throw error;
      return data as Profile[];
    },
  });
}

export function useProfile(id: string | null) {
  return useQuery({
    queryKey: ['profiles', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, avatar_url, created_at, updated_at')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!id,
  });
}
