import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AuditReport {
  id: string;
  lead_id: string | null;
  email: string;
  name: string;
  company_name: string;
  website_url: string;
  overall_score: number | null;
  report_url: string | null;
  report_file_name: string | null;
  sections: Record<string, unknown> | null;
  quick_wins: string[] | null;
  roadmap: string[] | null;
  email_sent: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useAuditReports() {
  return useQuery({
    queryKey: ["audit-reports"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/audit_reports?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch audit reports");
      return (await response.json()) as AuditReport[];
    },
  });
}

export function useDeleteAuditReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const session = await supabase.auth.getSession();
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/audit_reports?id=eq.${id}`,
        {
          method: "DELETE",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${session.data.session?.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete audit report");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit-reports"] });
    },
  });
}

export function useAuditReportStats() {
  return useQuery({
    queryKey: ["audit-report-stats"],
    queryFn: async () => {
      const session = await supabase.auth.getSession();
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/audit_reports?select=overall_score,email_sent,created_at`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${session.data.session?.access_token}`,
          },
        }
      );

      if (!response.ok) {
        return { total: 0, emailsSent: 0, avgScore: 0, thisWeek: 0 };
      }

      const data = (await response.json()) as Array<{
        overall_score: number | null;
        email_sent: boolean;
        created_at: string;
      }>;

      const total = data?.length || 0;
      const emailsSent = data?.filter((r) => r.email_sent).length || 0;
      const avgScore =
        data && data.length > 0
          ? Math.round(data.reduce((sum, r) => sum + (r.overall_score || 0), 0) / data.length)
          : 0;

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const thisWeek = data?.filter((r) => new Date(r.created_at) >= oneWeekAgo).length || 0;

      return { total, emailsSent, avgScore, thisWeek };
    },
  });
}
