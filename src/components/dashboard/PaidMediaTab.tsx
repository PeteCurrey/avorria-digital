import KPICard from "./KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PaidMediaTab = () => {
  const campaignData = [
    { name: "Brand Search", channel: "Google", spend: 2840, leads: 67, cpl: 42.39, convRate: 4.2, roas: 8.4, status: "Active" },
    { name: "Non-Brand Search", channel: "Google", spend: 3200, leads: 48, cpl: 66.67, convRate: 2.8, roas: 5.2, status: "Active" },
    { name: "Shopping", channel: "Google", spend: 2200, leads: 19, cpl: 115.79, convRate: 1.9, roas: 3.1, status: "Active" },
    { name: "Lead Gen", channel: "Meta", spend: 2680, leads: 41, cpl: 65.37, convRate: 3.4, roas: 4.8, status: "Active" },
    { name: "Retargeting", channel: "Meta", spend: 1440, leads: 17, cpl: 84.71, convRate: 2.1, roas: 3.6, status: "Active" },
    { name: "B2B Prospects", channel: "LinkedIn", spend: 1980, leads: 12, cpl: 165.00, convRate: 1.8, roas: 2.9, status: "Testing" },
    { name: "Display", channel: "Google", spend: 840, leads: 3, cpl: 280.00, convRate: 0.4, roas: 1.2, status: "Paused" },
  ];

  const roasData = [
    { campaign: "Brand Search", cpl: 42, roas: 8.4 },
    { campaign: "Non-Brand", cpl: 67, roas: 5.2 },
    { campaign: "Shopping", cpl: 116, roas: 3.1 },
    { campaign: "Lead Gen", cpl: 65, roas: 4.8 },
    { campaign: "Retargeting", cpl: 85, roas: 3.6 },
    { campaign: "LinkedIn", cpl: 165, roas: 2.9 },
  ];

  const experiments = [
    { test: "New creative variant (carousel vs single image)", result: "Carousel +34% CTR, +18% conv rate", outcome: "Winner - scaled" },
    { test: "Landing page B (hero CTA vs hero + mid-page)", result: "Mid-page +12% conv rate", outcome: "Winner - live" },
    { test: "Bid strategy (Target CPA vs Maximize Conversions)", result: "Max Conv -8% CPL, +22% volume", outcome: "Winner - implemented" },
    { test: "Audience expansion (lookalike 1% vs 3%)", result: "3% lookalike cheaper but lower quality", outcome: "Keep 1%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-foreground mb-1">Paid Media Performance</h2>
        <p className="text-sm text-muted-foreground">Ad spend, efficiency, and campaign results</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard label="Total Spend" value="£15,180" format="currency" />
        <KPICard label="Impressions" value={1847234} delta={14} deltaLabel="vs prev" />
        <KPICard label="Clicks" value={18472} delta={11} deltaLabel="vs prev" />
        <KPICard label="Leads from Paid" value={207} delta={19} deltaLabel="vs prev" />
        <KPICard label="Avg Cost per Lead" value="£73.33" format="currency" delta={-8} deltaLabel="vs prev" />
        <KPICard label="ROAS" value="4.8x" delta={12} deltaLabel="vs prev" />
      </div>

      {/* Performance by Campaign Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">Performance by Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Campaign</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Channel</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Spend</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Leads</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">CPL</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Conv Rate</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">ROAS</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaignData.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground text-center">{row.channel}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">£{row.spend.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.leads}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">£{row.cpl.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.convRate}%</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.roas}x</td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={
                          row.status === "Active"
                            ? "default"
                            : row.status === "Testing"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ROAS / CPL Chart */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">Cost per Lead & ROAS by Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roasData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="campaign" stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--muted-foreground))" label={{ value: 'CPL (£)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" label={{ value: 'ROAS (x)', angle: 90, position: 'insideRight' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="cpl" fill="hsl(var(--accent))" name="Cost per Lead (£)" />
              <Bar yAxisId="right" dataKey="roas" fill="hsl(220, 70%, 50%)" name="ROAS (x)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Experiment Log */}
      <Card className="border-border bg-accent/5">
        <CardHeader>
          <CardTitle className="text-xl font-light">Experiment Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experiments.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-border bg-background">
                <p className="text-sm font-medium text-foreground mb-2">{exp.test}</p>
                <p className="text-sm text-muted-foreground mb-2">→ {exp.result}</p>
                <Badge variant="secondary" className="text-xs">
                  {exp.outcome}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaidMediaTab;
