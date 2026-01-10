import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ScheduledReport {
  id: string;
  name: string;
  report_type: string;
  recipients: string[];
  schedule: string;
  last_sent_at: string | null;
  next_scheduled_at: string | null;
  config: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GeneratedReport {
  id: string;
  scheduled_report_id: string | null;
  report_type: string;
  file_url: string | null;
  data: Record<string, unknown> | null;
  period_start: string | null;
  period_end: string | null;
  generated_at: string;
  sent_to: string[] | null;
}

export function useScheduledReports() {
  return useQuery({
    queryKey: ["scheduled-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scheduled_reports")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as ScheduledReport[];
    },
  });
}

export function useGeneratedReports(limit = 10) {
  return useQuery({
    queryKey: ["generated-reports", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("generated_reports")
        .select("*")
        .order("generated_at", { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as GeneratedReport[];
    },
  });
}

export function useCreateScheduledReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (report: { name: string; report_type: string; schedule: string; recipients: string[]; is_active?: boolean }) => {
      const { data, error } = await supabase
        .from("scheduled_reports")
        .insert([report])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-reports"] });
      toast.success("Scheduled report created");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create: ${error.message}`);
    },
  });
}

export function useUpdateScheduledReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ScheduledReport> & { id: string }) => {
      const { data, error } = await supabase
        .from("scheduled_reports")
        .update(updates as Record<string, unknown>)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-reports"] });
      toast.success("Scheduled report updated");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update: ${error.message}`);
    },
  });
}

export function useDeleteScheduledReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("scheduled_reports")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-reports"] });
      toast.success("Scheduled report deleted");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete: ${error.message}`);
    },
  });
}

export function useGenerateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reportType: string = "weekly_summary") => {
      const { data, error } = await supabase.functions.invoke("generate-weekly-report", {
        body: { reportType },
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generated-reports"] });
      toast.success("Report generated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to generate report: ${error.message}`);
    },
  });
}
