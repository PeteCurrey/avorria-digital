import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const FunnelTab = () => {
  const funnelStages = [
    { stage: "Website Visitors", count: 24318, convRate: 100 },
    { stage: "Form Submissions", count: 412, convRate: 1.69 },
    { stage: "Qualified Leads", count: 137, convRate: 33.3 },
    { stage: "Opportunities", count: 58, convRate: 42.3 },
    { stage: "Closed-Won", count: 12, convRate: 20.7 },
  ];

  const conversionEvents = [
    { event: "Contact form submit", count: 287, convRate: 1.18, source: "All channels" },
    { event: "Phone click", count: 94, convRate: 0.39, source: "Mobile organic" },
    { event: "Estimator completed", count: 76, convRate: 0.31, source: "Paid + organic" },
    { event: "Free audit request", count: 58, convRate: 0.24, source: "Content + paid" },
    { event: "Chat initiated", count: 42, convRate: 0.17, source: "All channels" },
    { event: "Calendar booking", count: 31, convRate: 0.13, source: "Email + retargeting" },
  ];

  const attributionData = [
    { name: "Organic Search", value: 42, color: "hsl(220, 70%, 50%)" },
    { name: "Google Ads", value: 28, color: "hsl(var(--accent))" },
    { name: "Meta Ads", value: 14, color: "hsl(280, 60%, 55%)" },
    { name: "Direct", value: 9, color: "hsl(142, 71%, 45%)" },
    { name: "Referral", value: 7, color: "hsl(45, 93%, 47%)" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-foreground mb-1">Funnel & Conversions</h2>
        <p className="text-sm text-muted-foreground">Full journey from visitor to customer</p>
      </div>

      {/* Multi-step Funnel Chart */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {funnelStages.map((stage, idx) => {
              const width = 100 - idx * 15;
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-foreground">{stage.count.toLocaleString()}</span>
                      {idx > 0 && (
                        <span className="text-sm text-muted-foreground ml-2">
                          ({stage.convRate}% of prev)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="h-16 bg-secondary rounded-lg overflow-hidden mx-auto" style={{ width: `${width}%` }}>
                      <div className="h-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{stage.stage}</span>
                      </div>
                    </div>
                    {idx < funnelStages.length - 1 && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                        <svg width="40" height="20" className="text-muted-foreground">
                          <path d="M20 0 L20 20 M10 10 L20 20 L30 10" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Events Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">Conversion Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Event Name</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Count</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Conv Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Primary Source</th>
                </tr>
              </thead>
              <tbody>
                {conversionEvents.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.event}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.count}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.convRate}%</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Attribution Snapshot */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-light">First-Touch Attribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Shows the channel that first brought the visitor to your site
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-light">Last-Touch Attribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Organic Search", value: 38, color: "hsl(220, 70%, 50%)" },
                    { name: "Google Ads", value: 32, color: "hsl(var(--accent))" },
                    { name: "Meta Ads", value: 18, color: "hsl(280, 60%, 55%)" },
                    { name: "Direct", value: 7, color: "hsl(142, 71%, 45%)" },
                    { name: "Referral", value: 5, color: "hsl(45, 93%, 47%)" },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Shows the channel that converted the visitor into a lead
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-secondary">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note on attribution:</strong> These are simplified models for illustration. 
            In reality, most conversions involve multiple touchpoints. We track full customer journeys and use data-driven 
            attribution models to allocate credit accurately across all channels that contributed to a conversion.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunnelTab;
