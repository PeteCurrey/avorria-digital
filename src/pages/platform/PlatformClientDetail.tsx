import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  FileText,
} from "lucide-react";

const PlatformClientDetail = () => {
  const { id } = useParams();

  // Demo client data
  const client = {
    id,
    name: "TechCorp Industries",
    industry: "B2B SaaS",
    logo: null,
    status: "live",
    description: "Enterprise SaaS platform for remote team collaboration",
    monthlyRetainer: "£8k-12k",
    engagementSince: "Jan 2024",
    primaryKPIs: ["Organic leads", "Demo requests", "Pipeline value"],
    currentFocus: [
      "Fix conversion tracking on demo request flow",
      "Scale Google Ads to £5k/month spend",
      "Rebuild core product landing pages for SEO",
    ],
    risks: [
      "Organic leads down 15% MoM - investigating technical issues",
      "High dependency on paid channels - need to diversify",
    ],
  };

  const services = [
    { name: "SEO", active: true, scope: "Technical SEO + content strategy", lastChange: "Feb 2024" },
    { name: "Paid Media", active: true, scope: "Google Ads + LinkedIn", lastChange: "Jan 2024" },
    { name: "Web Design", active: false, scope: "Landing page builds", lastChange: "Dec 2023" },
    { name: "Analytics", active: true, scope: "GA4 + tracking setup", lastChange: "Jan 2024" },
  ];

  const meetings = [
    { date: "Mar 15, 2024", type: "Strategy call", summary: "Reviewed Q1 performance and Q2 priorities" },
    { date: "Mar 1, 2024", type: "Weekly sync", summary: "Discussed Google Ads scaling plan" },
    { date: "Feb 15, 2024", type: "Workshop", summary: "ICP refinement and messaging workshop" },
  ];

  return (
    <>
      <Helmet>
        <title>{client.name} - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          {/* Client Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-light text-foreground">{client.name}</h1>
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-600 border-green-500/20"
                    >
                      {client.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{client.industry}</p>
                  <p className="text-sm text-muted-foreground">{client.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Monthly retainer</p>
                  <p className="text-lg font-medium text-foreground">{client.monthlyRetainer}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Engagement since</p>
                  <p className="text-lg font-medium text-foreground">{client.engagementSince}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Primary KPIs</p>
                  <p className="text-sm text-foreground">{client.primaryKPIs.join(", ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="services">Services & Scope</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="meetings">Meetings & Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Current Focus */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Current Focus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {client.currentFocus.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Risks & Flags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      Risks & Flags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {client.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span className="text-sm text-foreground">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card key={service.name}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-foreground">{service.name}</h3>
                        <Badge
                          variant="outline"
                          className={
                            service.active
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : "bg-gray-500/10 text-gray-600 border-gray-500/20"
                          }
                        >
                          {service.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{service.scope}</p>
                      <p className="text-xs text-muted-foreground">
                        Last change: {service.lastChange}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contract & Commercial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Term:</span> 6-month rolling retainer
                    </p>
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Billing:</span> Monthly in advance
                    </p>
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Notes:</span> 30-day notice period for changes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-muted-foreground">Sessions</span>
                    </div>
                    <p className="text-2xl font-light text-foreground">12.4k</p>
                    <p className="text-xs text-green-600">+15% vs last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-xs text-muted-foreground">Leads</span>
                    </div>
                    <p className="text-2xl font-light text-foreground">84</p>
                    <p className="text-xs text-red-600">-8% vs last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-muted-foreground">Qualified</span>
                    </div>
                    <p className="text-2xl font-light text-foreground">52</p>
                    <p className="text-xs text-green-600">+12% vs last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-muted-foreground">Pipeline</span>
                    </div>
                    <p className="text-2xl font-light text-foreground">£240k</p>
                    <p className="text-xs text-green-600">+22% vs last month</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="meetings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Meetings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meetings.map((meeting, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                      >
                        <Calendar className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground">{meeting.type}</p>
                            <Badge variant="secondary" className="text-xs">
                              {meeting.date}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{meeting.summary}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AppShell>
    </>
  );
};

export default PlatformClientDetail;
