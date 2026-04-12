'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";

// Future integration:
// - Tie audits to authenticated user ID
// - Pull audit payloads from DB
// - Sync with free SEO & website audit submissions and agency teardown requests

interface Audit {
  id: string;
  name: string;
  type: "SEO" | "Website" | "Agency Teardown";
  status: "In Review" | "Completed";
  overallScore?: number;
  date: string;
}

const mockAudits: Audit[] = [
  {
    id: "1",
    name: "SEO & Website Audit – Jan 2026",
    type: "SEO",
    status: "Completed",
    overallScore: 72,
    date: "2026-01-15"
  },
  {
    id: "2",
    name: "Agency Report Teardown – Dec 2025",
    type: "Agency Teardown",
    status: "Completed",
    overallScore: 45,
    date: "2025-12-20"
  },
  {
    id: "3",
    name: "Website Conversion Audit – Feb 2026",
    type: "Website",
    status: "In Review",
    date: "2026-02-01"
  }
];

const AuditsTab = () => {
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusVariant = (status: Audit['status']) => {
    return status === "Completed" ? "default" : "secondary";
  };

  if (selectedAudit) {
    return (
      <div className="space-y-8">
        {/* Back Button */}
        <ScrollReveal>
        <Button variant="ghost" onClick={() => setSelectedAudit(null)}>
          ? Back to all audits
        </Button>
        </ScrollReveal>

        {/* Audit Detail */}
        <ScrollReveal>
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{selectedAudit.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{selectedAudit.date}</p>
              </div>
              {selectedAudit.overallScore && (
                <div className="text-center">
                  <div className={`text-4xl font-light ${getScoreColor(selectedAudit.overallScore)}`}>
                    {selectedAudit.overallScore}/100
                  </div>
                  <p className="text-sm text-muted-foreground">Overall health</p>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>
        </ScrollReveal>

        {/* Summary Cards */}
        {selectedAudit.overallScore && (
          <ScrollRevealGrid>
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="shadow-soft hover:shadow-elevated transition-all [transition-duration:var(--duration-normal)]">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">SEO Score</p>
                <p className="text-2xl font-light text-green-500">78</p>
                <Progress value={78} className="mt-2" />
              </CardContent>
            </Card>
            <Card className="shadow-soft hover:shadow-elevated transition-all [transition-duration:var(--duration-normal)]">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Conversion</p>
                <p className="text-2xl font-light text-yellow-500">70</p>
                <Progress value={70} className="mt-2" />
              </CardContent>
            </Card>
            <Card className="shadow-soft hover:shadow-elevated transition-all [transition-duration:var(--duration-normal)]">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Tracking</p>
                <p className="text-2xl font-light text-green-500">80</p>
                <Progress value={80} className="mt-2" />
              </CardContent>
            </Card>
            <Card className="shadow-soft hover:shadow-elevated transition-all [transition-duration:var(--duration-normal)]">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Performance</p>
                <p className="text-2xl font-light text-yellow-500">65</p>
                <Progress value={65} className="mt-2" />
              </CardContent>
            </Card>
          </div>
          </ScrollRevealGrid>
        )}

        {/* Detailed Sections */}
        <ScrollRevealGrid>
        <div className="space-y-6">
          <Card className="border-border/50 shadow-soft hover:shadow-elevated transition-all [transition-duration:var(--duration-normal)]">
            <CardHeader>
              <CardTitle className="text-xl">What's working</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-muted-foreground">Title tags present on all key pages with good keyword targeting.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-muted-foreground">Google Analytics and Facebook Pixel properly configured.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-muted-foreground">Clear CTAs on service pages with good contrast.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-elevated transition-all [transition-duration:var(--duration-normal)]">
            <CardHeader>
              <CardTitle className="text-xl">What's holding you back</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-muted-foreground">Missing H1 tags on 3 key pages – confusing search engines about page focus.</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-muted-foreground">Large uncompressed images slowing load time by 40%.</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-muted-foreground">Weak value proposition on homepage – visitors unsure what you do in first 3 seconds.</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-muted-foreground">GA4 events not configured – can't track form submissions or key user actions.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-elevated transition-all [transition-duration:var(--duration-normal)]">
            <CardHeader>
              <CardTitle className="text-xl">Priority actions (0–30 days)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium text-foreground mb-1">1. Fix missing H1 tags</h4>
                <p className="text-sm text-muted-foreground">Add clear, keyword-focused H1s to About, Services and Contact pages.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium text-foreground mb-1">2. Compress and optimize images</h4>
                <p className="text-sm text-muted-foreground">Reduce image file sizes by 60–80% without quality loss – will improve load time and Core Web Vitals.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium text-foreground mb-1">3. Rewrite homepage hero</h4>
                <p className="text-sm text-muted-foreground">Lead with clear outcome ("We help X do Y") instead of vague tagline.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-elevated transition-all [transition-duration:var(--duration-normal)]">
            <CardHeader>
              <CardTitle className="text-xl">Next 90 days roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>€¢ Set up GA4 conversion events for form submissions and call clicks</li>
                <li>€¢ Build out service-specific landing pages with proper SEO structure</li>
                <li>€¢ Add trust signals (testimonials, case studies, certifications) to key pages</li>
                <li>€¢ Implement structured data (schema) for better SERP visibility</li>
                <li>€¢ Create content strategy around top 10 commercial keywords</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        </ScrollRevealGrid>

        {/* CTA */}
        <ScrollReveal>
        <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20 shadow-soft">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-light mb-3 text-foreground">
              Turn this into a 90-day execution plan with Avorria
            </h3>
            <p className="text-muted-foreground mb-4">
              We'll own the implementation, reporting and optimization so you can focus on running your business.
            </p>
            <Button 
              onClick={() => {
                console.log("client_audit_cta_plan_clicked", { auditId: selectedAudit.id });
              }}
            >
              Book a strategy call
            </Button>
          </CardContent>
        </Card>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ScrollReveal>
      <div>
        <h2 className="text-3xl font-light mb-2 text-foreground">Your audits</h2>
        <p className="text-muted-foreground">
          View all audits and assessments we've completed for your business.
        </p>
      </div>
      </ScrollReveal>

      <ScrollReveal>
      <Card className="border-border/50 shadow-soft hover:shadow-elevated transition-all [transition-duration:var(--duration-normal)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Audit name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAudits.map((audit) => (
              <TableRow key={audit.id}>
                <TableCell className="font-medium">{audit.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{audit.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(audit.status)}>{audit.status}</Badge>
                </TableCell>
                <TableCell>
                  {audit.overallScore ? (
                    <span className={`font-medium ${getScoreColor(audit.overallScore)}`}>
                      {audit.overallScore}/100
                    </span>
                  ) : (
                    <span className="text-muted-foreground">–</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{audit.date}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      console.log("client_audit_view_opened", { auditId: audit.id });
                      setSelectedAudit(audit);
                      console.log("client_audit_detail_viewed", { auditId: audit.id });
                    }}
                  >
                    View details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      </ScrollReveal>
    </div>
  );
};

export default AuditsTab;


