import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ClientLogo {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ClientLogoInsert {
  name: string;
  logo_url?: string | null;
  website_url?: string | null;
  is_published?: boolean;
  display_order?: number;
}

export interface ClientLogoUpdate {
  id: string;
  name?: string;
  logo_url?: string | null;
  website_url?: string | null;
  is_published?: boolean;
  display_order?: number;
}
export const useClientLogosPublic = () => {
  return useQuery({
    queryKey: ["client-logos-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as ClientLogo[];
    },
  });
};
export const useClientLogosAdmin = () => {
  return useQuery({
    queryKey: ["client-logos-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as ClientLogo[];
    },
  });
};
export const useCreateClientLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (logo: ClientLogoInsert) => {
      const { data, error } = await supabase
        .from("client_logos")
        .insert(logo)
        .select()
        .single();

      if (error) throw error;
      return data as ClientLogo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-logos-admin"] });
      queryClient.invalidateQueries({ queryKey: ["client-logos-public"] });
      toast.success("Client logo created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create client logo: " + error.message);
    },
  });
};
export const useUpdateClientLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ClientLogoUpdate) => {
      const { data, error } = await supabase
        .from("client_logos")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as ClientLogo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-logos-admin"] });
      queryClient.invalidateQueries({ queryKey: ["client-logos-public"] });
      toast.success("Client logo updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update client logo: " + error.message);
    },
  });
};
export const useDeleteClientLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("client_logos")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-logos-admin"] });
      queryClient.invalidateQueries({ queryKey: ["client-logos-public"] });
      toast.success("Client logo deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete client logo: " + error.message);
    },
  });
};
