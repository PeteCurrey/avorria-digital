import KPICard from "./KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";

const OverviewTab = () => {
  // Mock data
  const timeSeriesData = [
    { date: "Jan", sessions: 18400, leads: 287, qualified: 94 },
    { date: "Feb", sessions: 19200, leads: 312, qualified: 103 },
    { date: "Mar", sessions: 20800, leads: 356, qualified: 118 },
    { date: "Apr", sessions: 22100, leads: 389, qualified: 129 },
    { date: "May", sessions: 23600, leads: 402, qualified: 134 },
    { date: "Jun", sessions: 24318, leads: 412, qualified: 137 },
  ];

  const channelData = [
    {
      channel: "Organic Search",
      sessions: 12847,
      leads: 198,
      qualified: 67,
      cost: "—",
      cpl: "—",
      notes: "Strong growth in non-branded",
    },
    {
      channel: "Google Ads",
      sessions: 6284,
      leads: 134,
      qualified: 42,
      cost: "£8,240",
      cpl: "£196",
      notes: "Scaled last month",
    },
    {
      channel: "Meta Ads",
      sessions: 3127,
      leads: 58,
      qualified: 18,
      cost: "£4,120",
      cpl: "£229",
      notes: "Testing new creative",
    },
    {
      channel: "Direct",
      sessions: 1486,
      leads: 15,
      qualified: 7,
      cost: "—",
      cpl: "—",
      notes: "Brand strength indicator",
    },
    {
      channel: "Referral",
      sessions: 574,
      leads: 7,
      qualified: 3,
      cost: "—",
      cpl: "—",
      notes: "Partner content driving traffic",
    },
  ];

  const funnelData = [
    { stage: "Visitors", count: 24318, conversion: 100 },
    { stage: "Leads", count: 412, conversion: 1.69 },
    { stage: "Qualified", count: 137, conversion: 33.3 },
    { stage: "Opportunities", count: 58, conversion: 42.3 },
    { stage: "Won", count: 12, conversion: 20.7 },
  ];

  const actions = [
    "Migrated SEO content to new topic clusters around 'B2B marketing automation'",
    "Paused non-performing ad sets in Meta; budget reallocated to high-ROAS campaigns",
    "Launched new landing page for SaaS industry with A/B test on hero messaging",
    "Implemented conversion tracking improvements across GA4 and CRM",
    "Started monthly content pillar: 'The No-Bullshit Guide to Growth Marketing'",
  ];

  return (
    <div className="space-y-6">
      {/* Header with Date Range */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-foreground mb-1">Performance Overview</h2>
          <p className="text-sm text-muted-foreground">Last 30 days</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="30">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="quarter">This quarter</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log("dashboard_cta_download_report_clicked");
              // Future: implement PDF export of current dashboard view for monthly reporting
            }}
          >
            <Download size={16} className="mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Top KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Monthly Sessions" value={24318} delta={18} deltaLabel="vs prev" />
        <KPICard label="Leads" value={412} delta={27} deltaLabel="vs prev" />
        <KPICard label="Qualified Leads" value={137} delta={19} deltaLabel="vs prev" />
        <KPICard label="Est. Pipeline Value" value="£486,000" delta={22} deltaLabel="vs prev" format="currency" />
      </div>

      {/* Traffic → Leads Time Series */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">Traffic → Leads Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sessions" stroke="hsl(var(--primary))" strokeWidth={2} name="Sessions" />
              <Line type="monotone" dataKey="leads" stroke="hsl(var(--accent))" strokeWidth={2} name="Leads" />
              <Line type="monotone" dataKey="qualified" stroke="hsl(220, 70%, 50%)" strokeWidth={2} name="Qualified" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Channel Performance Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Channel</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Sessions</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Leads</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Qualified</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Cost</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">CPL</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {channelData.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.channel}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.sessions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.leads}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.qualified}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.cost}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.cpl}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Funnel Snapshot */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-light">Funnel Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-foreground">{stage.count.toLocaleString()}</span>
                      {idx > 0 && (
                        <span className="text-xs text-muted-foreground ml-2">({stage.conversion}%)</span>
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${stage.conversion}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What We're Doing About It */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-xl font-light">What We're Doing About It</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {actions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
