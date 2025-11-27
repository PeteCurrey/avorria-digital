import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AppShell from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  Users,
  DollarSign,
  FileText,
  Image,
  Video,
  ExternalLink,
  Calendar,
  Target,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

const PlatformCampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Demo campaign data
  const campaign = {
    id,
    name: "Q1 Lead Generation - Google Ads",
    client: "TechFlow Solutions",
    channel: "Google Ads",
    status: "Live",
    objective: "Lead Generation",
    budget: "$5,000/month",
    startDate: "2024-01-15",
    nextReview: "2024-02-15",
  };

  // KPI data
  const kpis = [
    {
      label: "Impressions",
      value: "847,234",
      change: "+12.3%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Clicks",
      value: "23,891",
      change: "+8.7%",
      trend: "up",
      icon: MousePointerClick,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Leads",
      value: "1,247",
      change: "+15.2%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Cost per Lead",
      value: "$38.42",
      change: "-5.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Performance over time data
  const performanceData = [
    { date: "Week 1", impressions: 180000, clicks: 5200, leads: 280, cpl: 42.5 },
    { date: "Week 2", impressions: 195000, clicks: 5800, leads: 310, cpl: 40.8 },
    { date: "Week 3", impressions: 210000, clicks: 6100, leads: 325, cpl: 39.2 },
    { date: "Week 4", impressions: 262234, clicks: 6791, leads: 332, cpl: 38.42 },
  ];

  // Testing notes
  const testingNotes = [
    {
      date: "2024-01-28",
      author: "Alex Morgan",
      note: "Tested new ad copy variation focusing on ROI benefits. Early data shows 18% higher CTR compared to control.",
      type: "Ad Copy Test",
    },
    {
      date: "2024-01-21",
      author: "Sarah Chen",
      note: "Adjusted bid strategy from manual CPC to target CPA of $40. Initial results promising with 12% more conversions.",
      type: "Bidding Strategy",
    },
    {
      date: "2024-01-14",
      author: "Alex Morgan",
      note: "Added new audience segment targeting previous website visitors. Seeing lower CPA ($32 vs $45) and better lead quality.",
      type: "Audience Test",
    },
  ];

  // Creative assets
  const creativeAssets = [
    {
      id: 1,
      name: "ROI Calculator Landing Page",
      type: "landing-page",
      url: "https://techflow.example.com/roi-calculator",
      performance: "Conversion rate: 8.2%",
      icon: FileText,
    },
    {
      id: 2,
      name: "Ad Creative Set A - Benefits Focus",
      type: "image",
      variations: 3,
      performance: "CTR: 3.8% (Best performer)",
      icon: Image,
    },
    {
      id: 3,
      name: "Video Ad - Product Demo",
      type: "video",
      duration: "30s",
      performance: "View rate: 42%, CTR: 2.1%",
      icon: Video,
    },
    {
      id: 4,
      name: "Ad Creative Set B - Feature Focus",
      type: "image",
      variations: 4,
      performance: "CTR: 2.9%",
      icon: Image,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "live":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "paused":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "completed":
        return "bg-gray-500/10 text-gray-700 border-gray-200";
      default:
        return "bg-blue-500/10 text-blue-700 border-blue-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getAssetIcon = (asset: any) => {
    const Icon = asset.icon;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <>
      <Helmet>
        <title>{campaign.name} - Campaign Detail - Avorria Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex" userRole="Account Lead">
        <div className="space-y-6">
          {/* Back button & header */}
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/platform/campaigns")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Campaigns
            </Button>

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-light text-foreground">
                    {campaign.name}
                  </h1>
                  <Badge className={cn("border", getStatusColor(campaign.status))}>
                    {campaign.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {campaign.client}
                  </span>
                  <span>•</span>
                  <span>{campaign.channel}</span>
                  <span>•</span>
                  <span>{campaign.objective}</span>
                  <span>•</span>
                  <span>{campaign.budget}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit Campaign
                </Button>
                <Button size="sm">
                  <Link to={`/platform/clients/${campaign.client.toLowerCase().replace(/\s+/g, '-')}`}>
                    View Client
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <Card key={kpi.label}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className={cn("rounded-lg p-2", kpi.bgColor)}>
                        <Icon className={cn("h-5 w-5", kpi.color)} />
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(kpi.trend)}
                        <span
                          className={cn(
                            "text-sm font-medium",
                            kpi.trend === "up" ? "text-green-600" : "text-red-600"
                          )}
                        >
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-foreground mb-1">
                        {kpi.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Performance Charts */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Last 4 weeks of campaign performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="clicks" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="clicks">Clicks & Leads</TabsTrigger>
                  <TabsTrigger value="impressions">Impressions</TabsTrigger>
                  <TabsTrigger value="cpl">Cost per Lead</TabsTrigger>
                </TabsList>

                <TabsContent value="clicks" className="space-y-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        className="text-xs"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        className="text-xs"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="clicks"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorClicks)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="leads"
                        stroke="hsl(var(--chart-2))"
                        fillOpacity={1}
                        fill="url(#colorLeads)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="impressions" className="space-y-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        className="text-xs"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        className="text-xs"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="impressions"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="cpl" className="space-y-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        className="text-xs"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        className="text-xs"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        domain={[35, 45]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                        formatter={(value) => [`$${value}`, "CPL"]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="cpl"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--chart-3))", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Testing Notes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Testing Notes & Optimizations</CardTitle>
                    <CardDescription>
                      What we're testing and what's next
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {testingNotes.map((note, index) => (
                  <div
                    key={index}
                    className="pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {note.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {note.date}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mb-2">{note.note}</p>
                    <p className="text-xs text-muted-foreground">— {note.author}</p>
                  </div>
                ))}

                <div className="pt-4">
                  <Label htmlFor="new-note" className="text-sm font-medium mb-2 block">
                    Add a new note
                  </Label>
                  <Textarea
                    id="new-note"
                    placeholder="What are you testing or planning to test next?"
                    className="resize-none mb-2"
                    rows={3}
                  />
                  <Button size="sm" className="w-full">
                    Save Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creative Assets */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Creative Assets</CardTitle>
                    <CardDescription>
                      Landing pages, ads, and creative variations
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Asset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {creativeAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                      {getAssetIcon(asset)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground">
                          {asset.name}
                        </h4>
                        {asset.type === "landing-page" && (
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {asset.performance}
                      </p>
                      {asset.variations && (
                        <p className="text-xs text-muted-foreground">
                          {asset.variations} variations
                        </p>
                      )}
                      {asset.duration && (
                        <p className="text-xs text-muted-foreground">
                          Duration: {asset.duration}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Campaign Details */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Start Date
                  </p>
                  <p className="text-base text-foreground">{campaign.startDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Next Review
                  </p>
                  <p className="text-base text-foreground">{campaign.nextReview}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Monthly Budget
                  </p>
                  <p className="text-base text-foreground">{campaign.budget}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

export default PlatformCampaignDetail;