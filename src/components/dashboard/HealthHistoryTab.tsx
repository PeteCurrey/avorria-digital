import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Future integration: pull real health check data from DB

const mockHealthData = [
  { date: "Nov 2025", score: 68 },
  { date: "Dec 2025", score: 70 },
  { date: "Jan 2026", score: 72 },
  { date: "Feb 2026", score: 75 }
];

const HealthHistoryTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-light mb-2 text-foreground">Website health history</h2>
        <p className="text-muted-foreground">
          This is based on automated checks; for full context, see your audits.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Health score trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Latest score</p>
            <p className="text-3xl font-light text-primary">75</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Change (30d)</p>
            <p className="text-3xl font-light text-green-500">+3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Checks run</p>
            <p className="text-3xl font-light text-foreground">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Issues fixed</p>
            <p className="text-3xl font-light text-green-500">8</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-secondary/30">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2 text-foreground">How health scores work</h3>
          <p className="text-muted-foreground text-sm">
            Health scores are calculated automatically based on technical checks across SEO, performance, conversion and tracking. These are directional indicators â€“ for actionable recommendations and context, refer to your full audits.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthHistoryTab;
