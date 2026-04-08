import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TeamMember {
  id: string;
  full_name: string;
  title: string;
  bio: string;
  initials: string;
  photo_url: string | null;
  linkedin_url: string | null;
  email: string | null;
  phone: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type TeamMemberInsert = Omit<TeamMember, "id" | "created_at" | "updated_at">;

const QUERY_KEY = ["team_members"];

export const useTeamMembers = () =>
  useQuery({
    queryKey: [...QUERY_KEY, "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members" as any)
        .select("*")
        .eq("is_published", true)
        .order("display_order");
      if (error) throw error;
      return data as unknown as TeamMember[];
    },
  });

export const useTeamMembersAdmin = () =>
  useQuery({
    queryKey: [...QUERY_KEY, "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members" as any)
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as unknown as TeamMember[];
    },
  });

export const useCreateTeamMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (member: TeamMemberInsert) => {
      const { data, error } = await supabase
        .from("team_members" as any)
        .insert(member as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};

export const useUpdateTeamMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<TeamMemberInsert>) => {
      const { data, error } = await supabase
        .from("team_members" as any)
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};

export const useDeleteTeamMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("team_members" as any)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};

