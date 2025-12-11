import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  source: string;
  status: string;
  notes: string | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
}

export type LeadInsert = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  source?: string;
  status?: string;
  notes?: string | null;
  metadata?: Json;
};

export type LeadUpdate = {
  name?: string;
  email?: string;
  phone?: string | null;
  company?: string | null;
  source?: string;
  status?: string;
  notes?: string | null;
  metadata?: Json;
};

// Fetch all leads (admin only)
export function useLeadsAdmin() {
  return useQuery({
    queryKey: ['leads', 'admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Lead[];
    },
  });
}

// Create a new lead (public - for forms)
export function useCreateLead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (lead: LeadInsert) => {
      const { data, error } = await supabase
        .from('leads')
        .insert([lead])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
    onError: (error) => {
      console.error('Error creating lead:', error);
    },
  });
}

// Update lead status (admin only)
export function useUpdateLead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: LeadUpdate }) => {
      const { data, error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated');
    },
    onError: (error) => {
      toast.error('Failed to update lead');
      console.error('Error updating lead:', error);
    },
  });
}

// Delete a lead (admin only)
export function useDeleteLead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete lead');
      console.error('Error deleting lead:', error);
    },
  });
}

// Get lead stats
export function useLeadStats() {
  return useQuery({
    queryKey: ['leads', 'stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('status, source');
      
      if (error) throw error;
      
      const total = data.length;
      const byStatus = data.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const bySource = data.reduce((acc, lead) => {
        acc[lead.source] = (acc[lead.source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      return { total, byStatus, bySource };
    },
  });
}
