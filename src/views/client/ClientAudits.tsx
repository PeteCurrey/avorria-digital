'use client';
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle, AlertTriangle, Download, Share2 } from "lucide-react";

const ClientAudits = () => {
  const { impersonatedClient } = useAuth();
  const clientName = impersonatedClient || "TechCorp Industries";
  const [selectedAudit, setSelectedAudit] = useState<string | null>(null);

  const audits = [
    {
      id: "1",
      name: "Q1 2024 SEO & Website Audit",
      type: "SEO + Website",
      date: "Mar 1, 2024",
      status: "completed",
      overallScore: "B",
      seoScore: 78,
      websiteScore: 82,
      trackingScore: 65,
    },
    {
      id: "2",
      name: "Conversion Funnel Analysis",
      type: "Conversion",
      date: "Feb 15, 2024",
      status: "completed",
      overallScore: "C",
      seoScore: null,
      websiteScore: 68,
      trackingScore: 72,
    },
    {
      id: "3",
      name: "Initial Onboarding Audit",
      type: "Full audit",
      date: "Jan 10, 2024",
      status: "completed",
      overallScore: "C",
      seoScore: 65,
      websiteScore: 70,
      trackingScore: 58,
    },
  ];

  const getScoreColor = (score: string) => {
    switch (score) {
      case "A":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "B":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "C":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "D":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "";
    }
  };

  const auditDetail = {
    whatsWorking: [
      "Technical SEO foundations are solid - site speed, mobile-friendliness, and indexability all strong",
      "Core product pages have good structure and internal linking",
      "Google Ads conversion tracking is working correctly",
    ],
    whatsHolding: [
      "Demo request form tracking is broken - we're losing visibility on 30-40% of conversions",
      "Blog content isn't targeting commercial keywords - it's informational only",
      "No clear conversion path on 3 priority landing pages",
    ],
    priorityActions: [
      "Fix demo request tracking (GTM + GA4 event setup) - Est. 3 days",
      "Rebuild /solutions landing page with clear CTA hierarchy - Est. 5 days",
      "Implement lead scoring in HubSpot to separate demos from info requests - Est. 2 days",
    ],
    next90Days: [
      "Content audit and keyword mapping for 10 commercial blog posts",
      "A/B test homepage hero CTA placement",
      "Set up automated alerts for tracking failures",
      "Build 5 new comparison pages targeting bottom-funnel keywords",
    ],
  };

  if (selectedAudit) {
    const audit = audits.find((a) => a.id === selectedAudit);
    if (!audit) return null;

    return (
      <>
        
          <title>{audit.name} - Client Portal</title>
        

        <AppShell
          type="client"
          userName="Sarah Mitchell"
          userRole="Marketing Director"
          clientName={clientName}
        >
          <div className="space-y-6">
            {/* Back button */}
            <Button variant="ghost" onClick={() => setSelectedAudit(null)} className="mb-4">
              Ã¢â€ Â Back to audits
            </Button>

            {/* Audit Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-light text-foreground mb-2">{audit.name}</h1>
                    <p className="text-sm text-muted-foreground">
                      {audit.type} Ã¢â‚¬Â¢ {audit.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Overall score</p>
                    <Badge variant="outline" className={getScoreColor(audit.overallScore)}>
                      Grade {audit.overallScore}
                    </Badge>
                  </div>
                  {audit.seoScore && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">SEO score</p>
                      <p className="text-lg font-medium text-foreground">{audit.seoScore}/100</p>
                    </div>
                  )}
                  {audit.websiteScore && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Website/UX score</p>
                      <p className="text-lg font-medium text-foreground">{audit.websiteScore}/100</p>
                    </div>
                  )}
                  {audit.trackingScore && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Tracking score</p>
                      <p className="text-lg font-medium text-foreground">{audit.trackingScore}/100</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Audit Sections */}
            <Tabs defaultValue="working" className="space-y-4">
              <TabsList>
                <TabsTrigger value="working">What's Working</TabsTrigger>
                <TabsTrigger value="holding">What's Holding You Back</TabsTrigger>
                <TabsTrigger value="priority">Priority Actions</TabsTrigger>
                <TabsTrigger value="next90">Next 90 Days</TabsTrigger>
              </TabsList>

              <TabsContent value="working">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h2 className="text-lg font-medium text-foreground">What's Working</h2>
                    </div>
                    <ul className="space-y-3">
                      {auditDetail.whatsWorking.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">Ã¢Å“â€œ</span>
                          <span className="text-sm text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="holding">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <h2 className="text-lg font-medium text-foreground">What's Holding You Back</h2>
                    </div>
                    <ul className="space-y-3">
                      {auditDetail.whatsHolding.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">!</span>
                          <span className="text-sm text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="priority">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium text-foreground mb-4">
                      Priority Actions (0-30 days)
                    </h2>
                    <ul className="space-y-4">
                      {auditDetail.priorityActions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="next90">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium text-foreground mb-4">Next 90 Days</h2>
                    <ul className="space-y-3">
                      {auditDetail.next90Days.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">Ã¢â‚¬Â¢</span>
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
                  Want to turn this into an execution plan?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Let's prioritize these actions and build a 90-day roadmap.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link href="/contact">
                    <Button>Book a call</Button>
                  </Link>
                  <Link href="/project-estimator">
                    <Button variant="outline">Use project estimator</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </AppShell>
      </>
    );
  }

  return (
    <>
      
        <title>Audits - Client Portal</title>
      

      <AppShell
        type="client"
        userName="Sarah Mitchell"
        userRole="Marketing Director"
        clientName={clientName}
      >
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Audits</h1>
            <p className="text-muted-foreground">
              View all your SEO, website, and conversion audits with detailed recommendations.
            </p>
          </div>

          {/* Audits List */}
          <div className="grid grid-cols-1 gap-4">
            {audits.map((audit) => (
              <Card key={audit.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-foreground">{audit.name}</h3>
                        <Badge variant="outline" className={getScoreColor(audit.overallScore)}>
                          Grade {audit.overallScore}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {audit.type} Ã¢â‚¬Â¢ {audit.date}
                      </p>
                      <div className="flex gap-6">
                        {audit.seoScore && (
                          <div>
                            <p className="text-xs text-muted-foreground">SEO</p>
                            <p className="text-sm font-medium text-foreground">{audit.seoScore}/100</p>
                          </div>
                        )}
                        {audit.websiteScore && (
                          <div>
                            <p className="text-xs text-muted-foreground">Website/UX</p>
                            <p className="text-sm font-medium text-foreground">
                              {audit.websiteScore}/100
                            </p>
                          </div>
                        )}
                        {audit.trackingScore && (
                          <div>
                            <p className="text-xs text-muted-foreground">Tracking</p>
                            <p className="text-sm font-medium text-foreground">
                              {audit.trackingScore}/100
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button onClick={() => setSelectedAudit(audit.id)}>
                      View details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppShell>
    </>
  );
};

export default ClientAudits;


