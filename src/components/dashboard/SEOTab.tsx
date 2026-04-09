import Link from "next/link";
import KPICard from "./KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const SEOTab = () => {
  const visibilityData = [
    { month: "Jan", top3: 24, top10: 86, top20: 147, top100: 412 },
    { month: "Feb", top3: 28, top10: 94, top20: 162, top100: 438 },
    { month: "Mar", top3: 31, top10: 102, top20: 178, top100: 467 },
    { month: "Apr", top3: 36, top10: 118, top20: 194, top100: 489 },
    { month: "May", top3: 42, top10: 131, top20: 212, top100: 512 },
    { month: "Jun", top3: 47, top10: 143, top20: 228, top100: 534 },
  ];

  const keywordMovers = [
    { keyword: "b2b marketing automation", position: 3, change: 5, url: "/blog/marketing-automation", status: "Improving" },
    { keyword: "digital marketing agency london", position: 7, change: 3, url: "/services/seo", status: "Improving" },
    { keyword: "seo services for saas", position: 2, change: 0, url: "/services/seo", status: "New" },
    { keyword: "content marketing strategy", position: 12, change: -2, url: "/resources/content-marketing", status: "Dropping" },
    { keyword: "paid media management", position: 5, change: 8, url: "/services/paid-media", status: "Improving" },
    { keyword: "conversion rate optimization", position: 9, change: 4, url: "/services/web-design", status: "Improving" },
  ];

  const healthMetrics = [
    { label: "Critical Errors", count: 0, color: "green", description: "Site-breaking issues" },
    { label: "Warnings", count: 5, color: "yellow", description: "Minor technical issues" },
    { label: "Opportunities", count: 14, color: "blue", description: "Optimization suggestions" },
  ];

  const actionList = [
    { action: "Build topic cluster around 'growth marketing'", status: "In Progress" },
    { action: "Refresh outdated content from 2022", status: "Completed" },
    { action: "Add FAQ schema to pillar pages", status: "Next" },
    { action: "Internal link audit and optimization", status: "In Progress" },
    { action: "Create case study landing pages", status: "Next" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-foreground mb-1">SEO Performance</h2>
        <p className="text-sm text-muted-foreground">Organic search visibility and rankings</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard label="Organic Sessions" value={12847} delta={24} deltaLabel="vs prev" />
        <KPICard label="Non-Branded Sessions" value={8234} delta={31} deltaLabel="vs prev" />
        <KPICard label="Organic Leads" value={198} delta={22} deltaLabel="vs prev" />
        <KPICard label="Ranking Keywords" value={534} delta={4} deltaLabel="vs prev" />
        <KPICard label="Avg Position" value={18.4} delta={-2.1} deltaLabel="vs prev" />
      </div>

      {/* Keyword Visibility Chart */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">Keyword Visibility by Position</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={visibilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="top3" stackId="1" stroke="hsl(142, 71%, 45%)" fill="hsl(142, 71%, 45%)" fillOpacity={0.8} name="Top 3" />
              <Area type="monotone" dataKey="top10" stackId="1" stroke="hsl(220, 70%, 50%)" fill="hsl(220, 70%, 50%)" fillOpacity={0.6} name="4-10" />
              <Area type="monotone" dataKey="top20" stackId="1" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.4} name="11-20" />
              <Area type="monotone" dataKey="top100" stackId="1" stroke="hsl(var(--muted))" fill="hsl(var(--muted))" fillOpacity={0.2} name="21-100" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Movers & Shakers Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">Movers & Shakers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Keyword</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Position</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Change</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Page URL</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {keywordMovers.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.keyword}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-center">#{row.position}</td>
                    <td className="py-3 px-4 text-sm text-center">
                      {row.change > 0 ? (
                        <span className="text-green-500 font-medium">+{row.change}</span>
                      ) : row.change < 0 ? (
                        <span className="text-red-500 font-medium">{row.change}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.url}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={
                          row.status === "Improving"
                            ? "default"
                            : row.status === "New"
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Technical & On-Page Health */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-light">Technical & On-Page Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border ${
                    metric.color === "green"
                      ? "border-green-500/20 bg-green-500/5"
                      : metric.color === "yellow"
                      ? "border-yellow-500/20 bg-yellow-500/5"
                      : "border-blue-500/20 bg-blue-500/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{metric.label}</span>
                    <span
                      className={`text-2xl font-light ${
                        metric.color === "green"
                          ? "text-green-500"
                          : metric.color === "yellow"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }`}
                    >
                      {metric.count}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SEO Action List */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-light">SEO Action List</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {actionList.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <span className="text-sm text-foreground">{item.action}</span>
                  <Badge
                    variant={
                      item.status === "Completed"
                        ? "default"
                        : item.status === "In Progress"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-xs"
                  >
                    {item.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SEOTab;

