import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Search, TrendingUp, Target, BarChart3, Loader2, 
  CheckCircle, AlertTriangle, Info, Zap, Clock, Calendar,
  Globe, Users, ArrowUp, ArrowDown
} from "lucide-react";

interface AuditResult {
  overall_score: number;
  strengths: Array<{ title: string; description: string; impact: string }>;
  seo_opportunities: Array<{ title: string; description: string; priority: string; effort: string }>;
  technical_issues: Array<{ title: string; description: string; severity: string }>;
  quick_wins: Array<{ title: string; description: string; estimated_impact: string }>;
  medium_term: Array<{ title: string; description: string; timeline: string }>;
  long_term: Array<{ title: string; description: string; expected_outcome: string }>;
  seo_keywords?: string[];
  content_gaps?: string[];
}

interface CompetitorResult {
  company_name: string;
  positioning: string;
  strengths: Array<{ area: string; description: string; evidence: string }>;
  weaknesses: Array<{ area: string; description: string; opportunity: string }>;
  opportunities: Array<{ title: string; description: string; action: string }>;
  marketing_tactics: Array<{ tactic: string; effectiveness: string; replicable: boolean }>;
  threat_level: string;
  threat_reasoning: string;
  key_differentiators?: string[];
  recommendations?: Array<{ priority: string; action: string; expected_outcome: string }>;
}

interface KeywordResult {
  market_overview: { size: string; growth: string; key_trends: string[] };
  keywords: Array<{ keyword: string; search_volume: number; difficulty: number; intent: string; opportunity_score: number }>;
  related_keywords: Array<{ keyword: string; search_volume: number; difficulty: number; relevance: string }>;
  long_tail_keywords: Array<{ keyword: string; intent: string; content_angle: string }>;
  content_opportunities: Array<{ topic: string; format: string; target_keywords: string[]; estimated_traffic_potential: string }>;
  pain_points: string[];
  questions_to_answer: string[];
}

const ClientSEOIntelligence = () => {
  const { impersonatedClient } = useAuth();
  const clientName = impersonatedClient || "TechCorp Industries";
  
  // Website Analysis State
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  
  // Competitor Analysis State
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [isAnalyzingCompetitor, setIsAnalyzingCompetitor] = useState(false);
  const [competitorResult, setCompetitorResult] = useState<CompetitorResult | null>(null);
  
  // Keyword Research State
  const [keywords, setKeywords] = useState("");
  const [isResearching, setIsResearching] = useState(false);
  const [keywordResult, setKeywordResult] = useState<KeywordResult | null>(null);

  const analyzeWebsite = async () => {
    if (!websiteUrl) {
      toast.error("Please enter a website URL");
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('website-audit', {
        body: { url: websiteUrl, websiteName: clientName }
      });
      
      if (error) throw error;
      setAuditResult(data);
      toast.success("Website analysis complete!");
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error("Failed to analyze website. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeCompetitor = async () => {
    if (!competitorUrl) {
      toast.error("Please enter a competitor URL");
      return;
    }
    
    setIsAnalyzingCompetitor(true);
    try {
      const { data, error } = await supabase.functions.invoke('competitor-analysis', {
        body: { competitorUrl, myUrl: websiteUrl || undefined }
      });
      
      if (error) throw error;
      setCompetitorResult(data);
      toast.success("Competitor analysis complete!");
    } catch (error) {
      console.error('Competitor analysis error:', error);
      toast.error("Failed to analyze competitor. Please try again.");
    } finally {
      setIsAnalyzingCompetitor(false);
    }
  };

  const researchKeywords = async () => {
    if (!keywords) {
      toast.error("Please enter keywords to research");
      return;
    }
    
    setIsResearching(true);
    try {
      const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean);
      const { data, error } = await supabase.functions.invoke('keyword-research', {
        body: { keywords: keywordList }
      });
      
      if (error) throw error;
      setKeywordResult(data);
      toast.success("Keyword research complete!");
    } catch (error) {
      console.error('Keyword research error:', error);
      toast.error("Failed to research keywords. Please try again.");
    } finally {
      setIsResearching(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  const getPriorityBadgeVariant = (priority: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (priority?.toLowerCase()) {
      case 'high': return "destructive";
      case 'medium': return "default";
      default: return "secondary";
    }
  };

  const getThreatBadgeVariant = (level: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (level?.toLowerCase()) {
      case 'high': return "destructive";
      case 'medium': return "default";
      default: return "secondary";
    }
  };

  return (
    <>
      <Helmet>
        <title>SEO Intelligence - Client Portal</title>
        <meta name="description" content="AI-powered SEO intelligence and analysis tools" />
      </Helmet>

      <AppShell
        type="client"
        userName="Sarah Mitchell"
        userRole="Marketing Director"
        clientName={clientName}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">SEO Intelligence</h1>
            <p className="text-muted-foreground">
              AI-powered website analysis, competitor intelligence, and keyword research tools.
            </p>
          </div>

          <Tabs defaultValue="website" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website Analysis
              </TabsTrigger>
              <TabsTrigger value="competitor" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Competitor Analysis
              </TabsTrigger>
              <TabsTrigger value="keywords" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Keyword Research
              </TabsTrigger>
            </TabsList>

            {/* Website Analysis Tab */}
            <TabsContent value="website" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analyze Your Website</CardTitle>
                  <CardDescription>
                    Get AI-powered insights on SEO, content, and technical optimization opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter your website URL (e.g., https://example.com)"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={analyzeWebsite} disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {auditResult && (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <Card className="bg-gradient-to-br from-background to-muted/30">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Overall Website Score</p>
                          <p className={`text-6xl font-bold ${getScoreColor(auditResult.overall_score)}`}>
                            {auditResult.overall_score}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">out of 100</p>
                        </div>
                        <div className={`text-9xl font-bold ${getScoreColor(auditResult.overall_score)} opacity-20`}>
                          {getScoreGrade(auditResult.overall_score)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          Current Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {auditResult.strengths?.map((strength, i) => (
                            <li key={i} className="border-b border-border pb-3 last:border-0">
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-medium text-foreground">{strength.title}</span>
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  {strength.impact}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{strength.description}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Technical Issues */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-600">
                          <AlertTriangle className="h-5 w-5" />
                          Technical Issues
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {auditResult.technical_issues?.map((issue, i) => (
                            <li key={i} className="border-b border-border pb-3 last:border-0">
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-medium text-foreground">{issue.title}</span>
                                <Badge variant={issue.severity === 'critical' ? 'destructive' : 'secondary'}>
                                  {issue.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* SEO Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        SEO Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {auditResult.seo_opportunities?.map((opp, i) => (
                          <Card key={i} className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <span className="font-medium text-foreground">{opp.title}</span>
                                <div className="flex gap-1">
                                  <Badge variant={getPriorityBadgeVariant(opp.priority)}>
                                    {opp.priority}
                                  </Badge>
                                  <Badge variant="outline">{opp.effort}</Badge>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{opp.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          Quick Wins
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {auditResult.quick_wins?.map((item, i) => (
                            <li key={i} className="text-sm">
                              <p className="font-medium text-foreground">{item.title}</p>
                              <p className="text-muted-foreground text-xs">{item.description}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-blue-500" />
                          Medium Term
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {auditResult.medium_term?.map((item, i) => (
                            <li key={i} className="text-sm">
                              <p className="font-medium text-foreground">{item.title}</p>
                              <p className="text-muted-foreground text-xs">{item.description}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-purple-500" />
                          Long Term
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {auditResult.long_term?.map((item, i) => (
                            <li key={i} className="text-sm">
                              <p className="font-medium text-foreground">{item.title}</p>
                              <p className="text-muted-foreground text-xs">{item.description}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* SEO Keywords */}
                  {auditResult.seo_keywords && auditResult.seo_keywords.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <Search className="h-4 w-4" />
                          Detected Keywords
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {auditResult.seo_keywords.map((keyword, i) => (
                            <Badge key={i} variant="secondary">{keyword}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Competitor Analysis Tab */}
            <TabsContent value="competitor" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analyze Competitors</CardTitle>
                  <CardDescription>
                    Get AI-powered competitive intelligence to identify opportunities and threats.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter competitor website URL"
                      value={competitorUrl}
                      onChange={(e) => setCompetitorUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={analyzeCompetitor} disabled={isAnalyzingCompetitor}>
                      {isAnalyzingCompetitor ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Target className="mr-2 h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {competitorResult && (
                <div className="space-y-6">
                  {/* Competitor Overview */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{competitorResult.company_name || 'Competitor'}</CardTitle>
                          <CardDescription>{competitorResult.positioning}</CardDescription>
                        </div>
                        <Badge variant={getThreatBadgeVariant(competitorResult.threat_level)}>
                          {competitorResult.threat_level} threat
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{competitorResult.threat_reasoning}</p>
                      {competitorResult.key_differentiators && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Key Differentiators:</p>
                          <div className="flex flex-wrap gap-2">
                            {competitorResult.key_differentiators.map((diff, i) => (
                              <Badge key={i} variant="outline">{diff}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600 text-lg">
                          <ArrowUp className="h-5 w-5" />
                          Their Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {competitorResult.strengths?.map((item, i) => (
                            <li key={i} className="border-b border-border pb-3 last:border-0">
                              <p className="font-medium text-foreground">{item.area}</p>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                              <p className="text-xs text-muted-foreground italic mt-1">Evidence: {item.evidence}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Weaknesses */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600 text-lg">
                          <ArrowDown className="h-5 w-5" />
                          Their Weaknesses
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {competitorResult.weaknesses?.map((item, i) => (
                            <li key={i} className="border-b border-border pb-3 last:border-0">
                              <p className="font-medium text-foreground">{item.area}</p>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                              <p className="text-xs text-green-600 mt-1">Our opportunity: {item.opportunity}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Opportunities & Tactics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Opportunities for You
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {competitorResult.opportunities?.map((opp, i) => (
                          <Card key={i} className="bg-muted/30">
                            <CardContent className="p-4">
                              <p className="font-medium text-foreground">{opp.title}</p>
                              <p className="text-sm text-muted-foreground mt-1">{opp.description}</p>
                              <p className="text-xs text-primary mt-2">Action: {opp.action}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Marketing Tactics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Their Marketing Tactics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {competitorResult.marketing_tactics?.map((tactic, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <span className="text-sm text-foreground">{tactic.tactic}</span>
                            <div className="flex gap-2">
                              <Badge variant={tactic.effectiveness === 'high' ? 'default' : 'secondary'}>
                                {tactic.effectiveness}
                              </Badge>
                              {tactic.replicable && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Replicable
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* Keyword Research Tab */}
            <TabsContent value="keywords" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Keyword Research & Market Intelligence</CardTitle>
                  <CardDescription>
                    Discover keyword opportunities and market insights for your industry.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter keywords, separated by commas (e.g., seo agency, digital marketing)"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={researchKeywords} disabled={isResearching}>
                      {isResearching ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Researching...
                        </>
                      ) : (
                        <>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Research
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {keywordResult && (
                <div className="space-y-6">
                  {/* Market Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Market Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Market Size</p>
                          <p className="text-2xl font-light text-foreground">{keywordResult.market_overview.size}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Growth Trend</p>
                          <p className="text-2xl font-light text-foreground">{keywordResult.market_overview.growth}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Key Trends</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {keywordResult.market_overview.key_trends?.map((trend, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{trend}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Keywords Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Keyword Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Keyword</th>
                              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Volume</th>
                              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Difficulty</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Intent</th>
                              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Opportunity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {keywordResult.keywords?.map((kw, i) => (
                              <tr key={i} className="border-b border-border">
                                <td className="py-3 px-4 font-medium text-foreground">{kw.keyword}</td>
                                <td className="py-3 px-4 text-right text-foreground">{kw.search_volume?.toLocaleString()}</td>
                                <td className="py-3 px-4 text-right">
                                  <Badge variant={kw.difficulty > 70 ? 'destructive' : kw.difficulty > 40 ? 'default' : 'secondary'}>
                                    {kw.difficulty}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <Badge variant="outline">{kw.intent}</Badge>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <span className={`font-medium ${kw.opportunity_score > 70 ? 'text-green-600' : 'text-foreground'}`}>
                                    {kw.opportunity_score}%
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {keywordResult.content_opportunities?.map((opp, i) => (
                          <Card key={i} className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <span className="font-medium text-foreground">{opp.topic}</span>
                                <div className="flex gap-1">
                                  <Badge variant="outline">{opp.format}</Badge>
                                  <Badge variant={opp.estimated_traffic_potential === 'high' ? 'default' : 'secondary'}>
                                    {opp.estimated_traffic_potential}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {opp.target_keywords?.map((kw, j) => (
                                  <Badge key={j} variant="secondary" className="text-xs">{kw}</Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pain Points & Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Audience Pain Points
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {keywordResult.pain_points?.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                              <span className="text-primary mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Info className="h-5 w-5" />
                          Questions to Answer
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {keywordResult.questions_to_answer?.map((q, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                              <span className="text-primary mt-1">?</span>
                              {q}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </AppShell>
    </>
  );
};

export default ClientSEOIntelligence;
