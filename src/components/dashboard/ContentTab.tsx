import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ContentTab = () => {
  const topContent = [
    { title: "The No-Bullshit Guide to SEO for Real Businesses", type: "Pillar Guide", sessions: 2847, avgTime: "8:42", leads: 47 },
    { title: "High-Converting Websites: A Practical Playbook", type: "Pillar Guide", sessions: 2134, avgTime: "7:18", leads: 38 },
    { title: "SEO Services in London", type: "Landing Page", sessions: 1876, avgTime: "4:32", leads: 52 },
    { title: "Marketing Analytics & Tracking Deep-Dive", type: "Pillar Guide", sessions: 1542, avgTime: "9:14", leads: 29 },
    { title: "Case Study: SaaS Company 3x Organic Leads in 6 Months", type: "Case Study", sessions: 1289, avgTime: "5:47", leads: 24 },
    { title: "Free SEO & Website Audit Funnel", type: "Landing Page", sessions: 1147, avgTime: "3:21", leads: 76 },
    { title: "Web Design for Professional Services", type: "Landing Page", sessions: 982, avgTime: "4:18", leads: 31 },
  ];

  const emailMetrics = {
    openRate: 42.3,
    clickRate: 8.7,
    replies: 18,
  };

  const emailNarrative = `This month's nurture sequence focused on "Growth Marketing Fundamentals" — a 5-email series educating prospects on building a sustainable inbound engine. Open rates exceeded our benchmark by 12%, and we saw 18 direct replies from prospects asking about strategy calls. The series included case study highlights, practical frameworks, and clear CTAs to book consultations.`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-foreground mb-1">Content & Email Performance</h2>
        <p className="text-sm text-muted-foreground">Top-performing content and email engagement</p>
      </div>

      {/* Top Content Pieces */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">Top Content Pieces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Content Title</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Sessions</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Avg Time</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Leads</th>
                </tr>
              </thead>
              <tbody>
                {topContent.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.title}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="secondary" className="text-xs">
                        {row.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.sessions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">{row.avgTime}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right font-semibold">{row.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Email Performance Snapshot */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-light">Email Performance Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
                <span className="text-sm font-medium text-foreground">Open Rate</span>
                <span className="text-2xl font-light text-accent">{emailMetrics.openRate}%</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
                <span className="text-sm font-medium text-foreground">Click Rate</span>
                <span className="text-2xl font-light text-accent">{emailMetrics.clickRate}%</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
                <span className="text-sm font-medium text-foreground">Replies / Hand-raisers</span>
                <span className="text-2xl font-light text-accent">{emailMetrics.replies}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Narrative */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-xl font-light">This Month's Email Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed">{emailNarrative}</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Insights */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">Content Insights & Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-foreground">
              <span className="text-accent mt-0.5">✅œ</span>
              <span>
                <strong>Top performer:</strong> "No-Bullshit SEO Guide" continues to drive high-quality organic leads. 
                We're expanding this into a topic cluster with supporting articles on technical SEO, content strategy, and link building.
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-foreground">
              <span className="text-accent mt-0.5">✅œ</span>
              <span>
                <strong>Audit funnel optimization:</strong> The free audit page has a 6.6% conversion rate (sessions → leads). 
                We're A/B testing a new form layout to push this above 8%.
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-foreground">
              <span className="text-accent mt-0.5">✅œ</span>
              <span>
                <strong>Case studies:</strong> Case study content is converting at a higher rate than expected. 
                We're prioritizing 2 more detailed case studies for next month to capitalize on this.
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-foreground">
              <span className="text-accent mt-0.5">✅œ</span>
              <span>
                <strong>Email nurture:</strong> Next sequence will focus on "Paid Media vs Organic" — addressing common objections 
                and positioning Avorria's multi-channel approach.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;

