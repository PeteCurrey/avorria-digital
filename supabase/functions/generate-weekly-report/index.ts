import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReportData {
  leads: {
    total: number;
    new: number;
    contacted: number;
    qualified: number;
    converted: number;
    lost: number;
    weeklyGrowth: number;
  };
  analytics: {
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgSessionDuration: string;
    topPages: Array<{ path: string; views: number }>;
  };
  alerts: {
    total: number;
    unresolved: number;
    highSeverity: number;
  };
  clients: {
    total: number;
    active: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function generateReportData(supabase: any): Promise<ReportData> {
  // Fetch leads data
  const { data: leads } = await supabase.from("leads").select("*") as { data: Array<{ status: string; created_at: string }> | null };
  const leadsByStatus = {
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    lost: 0,
  };

  leads?.forEach((lead) => {
    if (leadsByStatus.hasOwnProperty(lead.status)) {
      leadsByStatus[lead.status as keyof typeof leadsByStatus]++;
    }
  });

  // Calculate weekly growth (leads from last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentLeads = leads?.filter(
    (lead) => new Date(lead.created_at) >= weekAgo
  ).length || 0;

  // Fetch analytics snapshot
  const { data: analyticsSnapshot } = await supabase
    .from("analytics_snapshots")
    .select("*")
    .order("snapshot_date", { ascending: false })
    .limit(1)
    .single() as { data: { page_views: number; unique_visitors: number; bounce_rate: number; avg_session_duration: string; top_pages: Array<{ path: string; views: number }> } | null };

  // Fetch alerts
  const { data: alerts } = await supabase.from("alerts").select("*") as { data: Array<{ is_resolved: boolean; severity: string }> | null };
  const unresolvedAlerts = alerts?.filter((a) => !a.is_resolved) || [];
  const highSeverityAlerts = alerts?.filter((a) => a.severity === "high") || [];

  // Fetch clients
  const { data: clients } = await supabase.from("clients").select("*") as { data: Array<{ status: string }> | null };
  const activeClients = clients?.filter((c) => c.status === "active") || [];

  return {
    leads: {
      total: leads?.length || 0,
      ...leadsByStatus,
      weeklyGrowth: recentLeads,
    },
    analytics: {
      pageViews: analyticsSnapshot?.page_views || 0,
      uniqueVisitors: analyticsSnapshot?.unique_visitors || 0,
      bounceRate: analyticsSnapshot?.bounce_rate || 0,
      avgSessionDuration: analyticsSnapshot?.avg_session_duration || "0m 0s",
      topPages: (analyticsSnapshot?.top_pages as Array<{ path: string; views: number }>) || [],
    },
    alerts: {
      total: alerts?.length || 0,
      unresolved: unresolvedAlerts.length,
      highSeverity: highSeverityAlerts.length,
    },
    clients: {
      total: clients?.length || 0,
      active: activeClients.length,
    },
  };
}

function generateHTMLReport(data: ReportData, periodStart: Date, periodEnd: Date): string {
  const formatDate = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 40px; background: #f8f9fa; }
    .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%); color: white; padding: 40px; text-align: center; }
    .header h1 { margin: 0 0 10px; font-size: 28px; }
    .header p { margin: 0; opacity: 0.8; }
    .content { padding: 40px; }
    .section { margin-bottom: 32px; }
    .section-title { font-size: 18px; font-weight: 600; color: #1a1a2e; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
    .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .metric-card { background: #f8f9fa; border-radius: 8px; padding: 20px; text-align: center; }
    .metric-value { font-size: 32px; font-weight: 700; color: #1a1a2e; }
    .metric-label { font-size: 14px; color: #6b7280; margin-top: 4px; }
    .metric-change { font-size: 12px; margin-top: 4px; }
    .metric-change.positive { color: #10b981; }
    .metric-change.negative { color: #ef4444; }
    .table { width: 100%; border-collapse: collapse; }
    .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    .table th { background: #f8f9fa; font-weight: 600; color: #374151; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; }
    .badge-green { background: #d1fae5; color: #059669; }
    .badge-blue { background: #dbeafe; color: #2563eb; }
    .badge-yellow { background: #fef3c7; color: #d97706; }
    .badge-red { background: #fee2e2; color: #dc2626; }
    .footer { background: #f8f9fa; padding: 24px 40px; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Weekly Performance Report</h1>
      <p>${formatDate(periodStart)} - ${formatDate(periodEnd)}</p>
    </div>
    
    <div class="content">
      <!-- Executive Summary -->
      <div class="section">
        <div class="section-title">📈 Executive Summary</div>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-value">${data.leads.total}</div>
            <div class="metric-label">Total Leads</div>
            <div class="metric-change positive">+${data.leads.weeklyGrowth} this week</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${data.analytics.pageViews.toLocaleString()}</div>
            <div class="metric-label">Page Views</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${data.clients.active}</div>
            <div class="metric-label">Active Clients</div>
          </div>
        </div>
      </div>

      <!-- Lead Pipeline -->
      <div class="section">
        <div class="section-title">👥 Lead Pipeline</div>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-value" style="color: #3b82f6;">${data.leads.new}</div>
            <div class="metric-label">New</div>
          </div>
          <div class="metric-card">
            <div class="metric-value" style="color: #f59e0b;">${data.leads.contacted}</div>
            <div class="metric-label">Contacted</div>
          </div>
          <div class="metric-card">
            <div class="metric-value" style="color: #8b5cf6;">${data.leads.qualified}</div>
            <div class="metric-label">Qualified</div>
          </div>
          <div class="metric-card">
            <div class="metric-value" style="color: #10b981;">${data.leads.converted}</div>
            <div class="metric-label">Converted</div>
          </div>
          <div class="metric-card">
            <div class="metric-value" style="color: #ef4444;">${data.leads.lost}</div>
            <div class="metric-label">Lost</div>
          </div>
        </div>
      </div>

      <!-- Website Analytics -->
      <div class="section">
        <div class="section-title">🌐 Website Analytics</div>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-value">${data.analytics.uniqueVisitors.toLocaleString()}</div>
            <div class="metric-label">Unique Visitors</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${data.analytics.bounceRate}%</div>
            <div class="metric-label">Bounce Rate</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${data.analytics.avgSessionDuration}</div>
            <div class="metric-label">Avg. Session</div>
          </div>
        </div>
        
        ${data.analytics.topPages.length > 0 ? `
        <h4 style="margin-top: 24px; margin-bottom: 12px;">Top Pages</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            ${data.analytics.topPages.slice(0, 5).map(page => `
              <tr>
                <td>${page.path}</td>
                <td>${page.views.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        ` : ''}
      </div>

      <!-- Alerts -->
      <div class="section">
        <div class="section-title">🔔 Alerts & Issues</div>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-value">${data.alerts.total}</div>
            <div class="metric-label">Total Alerts</div>
          </div>
          <div class="metric-card">
            <div class="metric-value" style="color: ${data.alerts.unresolved > 0 ? '#f59e0b' : '#10b981'};">${data.alerts.unresolved}</div>
            <div class="metric-label">Unresolved</div>
          </div>
          <div class="metric-card">
            <div class="metric-value" style="color: ${data.alerts.highSeverity > 0 ? '#ef4444' : '#10b981'};">${data.alerts.highSeverity}</div>
            <div class="metric-label">High Severity</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>This report was automatically generated by Avorria.</p>
      <p>© ${new Date().getFullYear()} Avorria. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { reportType = "weekly_summary" } = await req.json().catch(() => ({}));

    // Generate report data
    const periodEnd = new Date();
    const periodStart = new Date();
    periodStart.setDate(periodStart.getDate() - 7);

    const reportData = await generateReportData(supabase);
    const htmlReport = generateHTMLReport(reportData, periodStart, periodEnd);

    // Save report to storage
    const fileName = `weekly-report-${periodEnd.toISOString().split("T")[0]}.html`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("audit-reports")
      .upload(`reports/${fileName}`, new Blob([htmlReport], { type: "text/html" }), {
        contentType: "text/html",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("audit-reports")
      .getPublicUrl(`reports/${fileName}`);

    // Save to generated_reports table
    const { data: savedReport, error: saveError } = await supabase
      .from("generated_reports")
      .insert({
        report_type: reportType,
        file_url: urlData?.publicUrl || null,
        data: reportData,
        period_start: periodStart.toISOString().split("T")[0],
        period_end: periodEnd.toISOString().split("T")[0],
        sent_to: [],
      })
      .select()
      .single();

    if (saveError) {
      console.error("Save error:", saveError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        report: savedReport,
        reportUrl: urlData?.publicUrl,
        data: reportData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error generating report:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
