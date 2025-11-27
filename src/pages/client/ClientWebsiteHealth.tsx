import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

const ClientWebsiteHealth = () => {
  // Historical health scores
  const healthHistory = [
    { date: "Jan 2024", overall: 65, seo: 62, performance: 70, conversion: 58, tracking: 60 },
    { date: "Feb 2024", overall: 72, seo: 70, performance: 75, conversion: 68, tracking: 72 },
    { date: "Mar 2024", overall: 78, seo: 78, performance: 82, conversion: 72, tracking: 80 },
  ];

  const latestCheck = healthHistory[healthHistory.length - 1];

  const getScoreGrade = (score: number) => {
    if (score >= 85) return { grade: "A", color: "text-green-600", bg: "bg-green-500/10", border: "border-green-500/20" };
    if (score >= 70) return { grade: "B", color: "text-blue-600", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    if (score >= 55) return { grade: "C", color: "text-yellow-600", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
    return { grade: "D", color: "text-red-600", bg: "bg-red-500/10", border: "border-red-500/20" };
  };

  const overallGrade = getScoreGrade(latestCheck.overall);

  const categories = [
    { name: "SEO", score: latestCheck.seo, icon: Activity, trend: "+16 vs Jan" },
    { name: "Performance", score: latestCheck.performance, icon: TrendingUp, trend: "+12 vs Jan" },
    { name: "Conversion", score: latestCheck.conversion, icon: CheckCircle, trend: "+14 vs Jan" },
    { name: "Tracking", score: latestCheck.tracking, icon: AlertCircle, trend: "+20 vs Jan" },
  ];

  const whatsImproved = [
    "Page load time reduced from 4.2s to 2.8s",
    "Mobile-friendliness score increased to 95/100",
    "Fixed 12 broken internal links",
    "Implemented structured data on 5 priority pages",
    "Set up GA4 conversion tracking for demo requests",
  ];

  const stillNeeds = [
    "Blog content needs optimization for commercial keywords",
    "CTA placement on /solutions page needs testing",
    "3 landing pages still missing meta descriptions",
  ];

  return (
    <>
      <Helmet>
        <title>Website Health - Client Portal</title>
      </Helmet>

      <AppShell
        type="client"
        userName="Sarah Mitchell"
        userRole="Marketing Director"
        clientName="TechCorp Industries"
      >
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Website Health</h1>
            <p className="text-muted-foreground">
              Track your website's health score over time and see what's improving
            </p>
          </div>

          {/* Latest Score */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Latest health score</p>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={`text-2xl py-2 px-4 ${overallGrade.bg} ${overallGrade.color} ${overallGrade.border}`}
                    >
                      Grade {overallGrade.grade}
                    </Badge>
                    <div>
                      <p className="text-3xl font-light text-foreground">{latestCheck.overall}/100</p>
                      <p className="text-sm text-muted-foreground">{latestCheck.date}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-2xl font-light">+13</span>
                  <span className="text-sm text-muted-foreground">vs Jan</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const grade = getScoreGrade(category.score);
              
              return (
                <Card key={category.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={`h-5 w-5 ${grade.color}`} />
                      <p className="text-sm text-muted-foreground">{category.name}</p>
                    </div>
                    <p className="text-2xl font-light text-foreground mb-1">{category.score}/100</p>
                    <p className="text-xs text-green-600">{category.trend}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Historical Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Health Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthHistory.map((entry, index) => (
                  <div key={entry.date} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{entry.date}</span>
                      <span className="text-sm text-muted-foreground">
                        Overall: {entry.overall}/100
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">SEO</p>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${entry.seo}%` }}
                          />
                        </div>
                        <p className="text-xs text-foreground mt-1">{entry.seo}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Performance</p>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${entry.performance}%` }}
                          />
                        </div>
                        <p className="text-xs text-foreground mt-1">{entry.performance}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Conversion</p>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${entry.conversion}%` }}
                          />
                        </div>
                        <p className="text-xs text-foreground mt-1">{entry.conversion}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Tracking</p>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${entry.tracking}%` }}
                          />
                        </div>
                        <p className="text-xs text-foreground mt-1">{entry.tracking}</p>
                      </div>
                    </div>
                    {index < healthHistory.length - 1 && (
                      <div className="border-b border-border pt-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Details */}
          <Tabs defaultValue="improved" className="space-y-4">
            <TabsList>
              <TabsTrigger value="improved">What's Improved</TabsTrigger>
              <TabsTrigger value="needs">Still Needs Work</TabsTrigger>
            </TabsList>

            <TabsContent value="improved">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-medium text-foreground">What's Improved</h3>
                  </div>
                  <ul className="space-y-3">
                    {whatsImproved.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="needs">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <h3 className="text-lg font-medium text-foreground">Still Needs Work</h3>
                  </div>
                  <ul className="space-y-3">
                    {stillNeeds.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span className="text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">
                Want to see the full technical breakdown?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                View your latest comprehensive audit with detailed recommendations
              </p>
              <Link to="/client/audits">
                <Button>
                  View latest audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

export default ClientWebsiteHealth;
