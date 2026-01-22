import React, { useCallback, useEffect, useState } from "react";
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

interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

interface MutationResult<TInput, TOutput = void> {
  mutateAsync: (input: TInput) => Promise<TOutput>;
  mutate: (input: TInput) => void;
  isLoading: boolean;
  isPending: boolean;
  error: Error | null;
}

// Fetch all leads (admin only) with realtime updates
export function useLeadsAdmin(): QueryResult<Lead[]> {
  const [data, setData] = useState<Lead[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setData(data as Lead[]);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("leads-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          setData((prev) => [payload.new as Lead, ...(prev || [])]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "leads" },
        (payload) => {
          setData((prev) =>
            prev?.map((lead) =>
              lead.id === payload.new.id ? (payload.new as Lead) : lead
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "leads" },
        (payload) => {
          setData((prev) =>
            prev?.filter((lead) => lead.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  return { data, isLoading, error, refetch: fetchLeads };
}

// Create a new lead (public - for forms)
export function useCreateLead(): MutationResult<LeadInsert, Lead> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = useCallback(async (lead: LeadInsert) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("leads")
        .insert([lead])
        .select()
        .single();

      if (error) throw error;
      return data as Lead;
    } catch (err) {
      console.error("Error creating lead:", err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const mutate = useCallback((lead: LeadInsert) => {
    void mutateAsync(lead);
  }, [mutateAsync]);

  return { mutateAsync, mutate, isLoading, isPending: isLoading, error };
}

// Update lead status (admin only)
export function useUpdateLead(): MutationResult<{ id: string; updates: LeadUpdate }, Lead> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = useCallback(async ({ id, updates }: { id: string; updates: LeadUpdate }) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("leads")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      toast.success("Lead updated");
      return data as Lead;
    } catch (err) {
      toast.error("Failed to update lead");
      console.error("Error updating lead:", err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const mutate = useCallback((input: { id: string; updates: LeadUpdate }) => {
    void mutateAsync(input);
  }, [mutateAsync]);

  return { mutateAsync, mutate, isLoading, isPending: isLoading, error };
}

// Delete a lead (admin only)
export function useDeleteLead(): MutationResult<string> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Lead deleted");
    } catch (err) {
      toast.error("Failed to delete lead");
      console.error("Error deleting lead:", err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const mutate = useCallback((id: string) => {
    void mutateAsync(id);
  }, [mutateAsync]);

  return { mutateAsync, mutate, isLoading, isPending: isLoading, error };
}

// Get lead stats
export function useLeadStats(): QueryResult<{ total: number; byStatus: Record<string, number>; bySource: Record<string, number> }> {
  const [data, setData] = useState<{
    total: number;
    byStatus: Record<string, number>;
    bySource: Record<string, number>;
  } | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("leads")
        .select("status, source");

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

      setData({ total, byStatus, bySource });
    } catch (err) {
      console.error("Error fetching lead stats:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { data, isLoading, error, refetch: fetchStats };
}
