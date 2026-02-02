import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export interface ClientAnalyticsConnection {
  id: string;
  client_id: string;
  project_id: string | null;
  ga4_property_id: string | null;
  gsc_property: string | null;
  is_active: boolean;
  last_synced_at: string | null;
  credentials_json: Json;
  created_at: string;
  updated_at: string;
  // Joined fields
  client?: {
    name: string;
  };
  project?: {
    name: string;
  };
}

export interface CreateConnectionData {
  client_id: string;
  project_id?: string;
  ga4_property_id?: string;
  gsc_property?: string;
  is_active?: boolean;
  credentials_json?: Json;
}

// Admin: Fetch all analytics connections
export function useAllAnalyticsConnections() {
  return useQuery({
    queryKey: ["analytics-connections", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_analytics_connections")
        .select(`
          *,
          client:clients(name),
          project:client_projects(name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ClientAnalyticsConnection[];
    },
  });
}

// Fetch connection for a specific client
export function useClientAnalyticsConnection(clientId: string | undefined) {
  return useQuery({
    queryKey: ["analytics-connections", clientId],
    queryFn: async () => {
      if (!clientId) return null;

      const { data, error } = await supabase
        .from("client_analytics_connections")
        .select(`
          *,
          client:clients(name),
          project:client_projects(name)
        `)
        .eq("client_id", clientId)
        .maybeSingle();

      if (error) throw error;
      return data as ClientAnalyticsConnection | null;
    },
    enabled: !!clientId,
  });
}

// Create analytics connection
export function useCreateAnalyticsConnection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (connectionData: CreateConnectionData) => {
      const { data, error } = await supabase
        .from("client_analytics_connections")
        .insert(connectionData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics-connections"] });
      toast.success("Analytics connection created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create connection: " + error.message);
    },
  });
}

// Update analytics connection
export function useUpdateAnalyticsConnection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<CreateConnectionData>;
    }) => {
      const { data, error } = await supabase
        .from("client_analytics_connections")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics-connections"] });
      toast.success("Analytics connection updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update connection: " + error.message);
    },
  });
}

// Delete analytics connection
export function useDeleteAnalyticsConnection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (connectionId: string) => {
      const { error } = await supabase
        .from("client_analytics_connections")
        .delete()
        .eq("id", connectionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics-connections"] });
      toast.success("Analytics connection deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete connection: " + error.message);
    },
  });
}

// Sync analytics data (trigger manual sync)
export function useSyncAnalytics() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (connectionId: string) => {
      // Update last_synced_at timestamp
      const { data, error } = await supabase
        .from("client_analytics_connections")
        .update({ last_synced_at: new Date().toISOString() })
        .eq("id", connectionId)
        .select()
        .single();

      if (error) throw error;
      
      // Future: Trigger actual sync via edge function
      // await supabase.functions.invoke('sync-client-analytics', { body: { connectionId } });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics-connections"] });
      toast.success("Analytics sync initiated");
    },
    onError: (error) => {
      toast.error("Failed to sync analytics: " + error.message);
    },
  });
}
