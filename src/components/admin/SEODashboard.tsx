import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  TrendingUp,
  Target,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  Loader2,
  Bell,
  Trash2,
  Shield,
  Lightbulb,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaticBeamBorder } from "@/components/BeamBorder";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SeoRanking {
  id: string;
  keyword: string;
  url: string;
  position: number | null;
  previous_position: number | null;
  search_volume: number | null;
  difficulty: number | null;
  recorded_at: string;
}

interface TargetKeyword {
  id: string;
  keyword: string;
  target_url: string | null;
  is_active: boolean;
  created_at: string;
}

interface CompetitorTarget {
  id: string;
  competitor_url: string;
  company_name: string | null;
  is_active: boolean;
  last_checked_at: string | null;
  created_at: string;
}

interface CompetitorSnapshot {
  id: string;
  competitor_url: string;
  company_name: string | null;
  positioning: string | null;
  threat_level: string | null;
  strengths: any[];
  weaknesses: any[];
  opportunities: any[];
  recommendations: any[];
  created_at: string;
}

interface SeoSuggestion {
  id: string;
  suggestion_type: string;
  target_page: string | null;
  suggestion: string;
  context: string | null;
  priority: string;
  status: string;
  created_at: string;
}

const getPositionChange = (current: number | null, previous: number | null) => {
  if (!current || !previous) return <Minus className="h-4 w-4 text-muted-foreground" />;
  if (current < previous) return <ArrowUp className="h-4 w-4 text-green-400" />;
  if (current > previous) return <ArrowDown className="h-4 w-4 text-red-400" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const getChangeValue = (current: number | null, previous: number | null) => {
  if (!current || !previous) return null;
  return previous - current;
};

const priorityColor = (p: string) => {
  if (p === "high") return "bg-red-500/10 text-red-400 border-red-500/20";
  if (p === "medium") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return "bg-blue-500/10 text-blue-400 border-blue-500/20";
};

const threatColor = (t: string | null) => {
  if (t === "high") return "bg-red-500/10 text-red-400 border-red-500/20";
  if (t === "medium") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return "bg-green-500/10 text-green-400 border-green-500/20";
};

export default function SEODashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [newKeyword, setNewKeyword] = useState("");
  const [newTargetUrl, setNewTargetUrl] = useState("");
  const [newCompetitorUrl, setNewCompetitorUrl] = useState("");
  const queryClient = useQueryClient();

  // Fetch real keyword data
  const { data: seoRankings, isLoading: rankingsLoading } = useQuery({
    queryKey: ["seo-rankings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_rankings")
        .select("*")
        .order("recorded_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data as SeoRanking[];
    },
  });

  const { data: targetKeywords } = useQuery({
    queryKey: ["seo-target-keywords"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_target_keywords" as any)
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as unknown as TargetKeyword[]) || [];
    },
  });

  // Competitor data
  const { data: competitorTargets } = useQuery({
    queryKey: ["competitor-targets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitor_targets" as any)
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as unknown as CompetitorTarget[]) || [];
    },
  });

  const { data: competitorSnapshots } = useQuery({
    queryKey: ["competitor-snapshots"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitor_snapshots" as any)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data as unknown as CompetitorSnapshot[]) || [];
    },
  });

  // SEO Suggestions
  const { data: seoSuggestions } = useQuery({
    queryKey: ["seo-suggestions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_suggestions" as any)
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data as unknown as SeoSuggestion[]) || [];
    },
  });

  // Mutations
  const addKeyword = useMutation({
    mutationFn: async ({ keyword, target_url }: { keyword: string; target_url?: string }) => {
      const { error } = await supabase.from("seo_target_keywords" as any).insert({ keyword, target_url: target_url || null });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-target-keywords"] });
      setNewKeyword("");
      setNewTargetUrl("");
      toast.success("Keyword added for tracking");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeKeyword = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("seo_target_keywords" as any).update({ is_active: false }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-target-keywords"] });
      toast.success("Keyword removed");
    },
  });

  const addCompetitor = useMutation({
    mutationFn: async (url: string) => {
      const { error } = await supabase.from("competitor_targets" as any).insert({ competitor_url: url });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["competitor-targets"] });
      setNewCompetitorUrl("");
      toast.success("Competitor added for tracking");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeCompetitor = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("competitor_targets" as any).update({ is_active: false }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["competitor-targets"] }),
  });

  const resolveSuggestion = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("seo_suggestions" as any)
        .update({ status, resolved_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-suggestions"] });
      toast.success("Suggestion updated");
    },
  });

  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const runCompetitorAnalysis = async () => {
    setIsRunningAnalysis(true);
    try {
      const { error } = await supabase.functions.invoke("auto-competitor-analysis");
      if (error) throw error;
      toast.success("Competitor analysis running...");
      setTimeout(() => queryClient.invalidateQueries({ queryKey: ["competitor-snapshots"] }), 10000);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsRunningAnalysis(false);
    }
  };

  const [isRunningOptimize, setIsRunningOptimize] = useState(false);
  const runSeoOptimize = async () => {
    setIsRunningOptimize(true);
    try {
      const { error } = await supabase.functions.invoke("seo-auto-optimize");
      if (error) throw error;
      toast.success("SEO analysis running...");
      setTimeout(() => queryClient.invalidateQueries({ queryKey: ["seo-suggestions"] }), 10000);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsRunningOptimize(false);
    }
  };

  // Deduplicate keywords
  const latestRankings = React.useMemo(() => {
    if (!seoRankings) return [];
    const seen = new Map<string, SeoRanking>();
    for (const r of seoRankings) {
      if (!seen.has(r.keyword)) seen.set(r.keyword, r);
    }
    return Array.from(seen.values());
  }, [seoRankings]);

  const rankChanges = React.useMemo(() => {
    return latestRankings
      .filter(k => k.position && k.previous_position)
      .map(k => ({ ...k, change: getChangeValue(k.position, k.previous_position) }))
      .filter(k => k.change !== null && Math.abs(k.change!) >= 1)
      .sort((a, b) => Math.abs(b.change!) - Math.abs(a.change!));
  }, [latestRankings]);

  const hasKeywords = latestRankings.length > 0;
  const improvingCount = latestRankings.filter(k => k.position && k.previous_position && k.position < k.previous_position).length;

  // Latest snapshot per competitor
  const latestSnapshots = React.useMemo(() => {
    if (!competitorSnapshots) return [];
    const seen = new Map<string, CompetitorSnapshot>();
    for (const s of competitorSnapshots) {
      if (!seen.has(s.competitor_url)) seen.set(s.competitor_url, s);
    }
    return Array.from(seen.values());
  }, [competitorSnapshots]);

  const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground/30 mb-6" />
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground max-w-md mb-4">{description}</p>
        </div>
      </CardContent>
    </Card>
  );

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    addKeyword.mutate({ keyword: newKeyword.trim(), target_url: newTargetUrl.trim() || undefined });
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid md:grid-cols-4 gap-4">
        <StaticBeamBorder duration={5}>
          <CardContent className="p-5">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Keywords Tracked</p>
              <motion.div className="text-3xl font-bold text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {latestRankings.length}
              </motion.div>
              {hasKeywords && (
                <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
                  <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> {improvingCount} improving
                </Badge>
              )}
            </div>
          </CardContent>
        </StaticBeamBorder>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-5 text-center">
            <p className="text-xs text-muted-foreground mb-2">Page 1 Rankings</p>
            <p className="text-3xl font-bold text-foreground">{latestRankings.filter(k => k.position && k.position <= 10).length}</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-5 text-center">
            <p className="text-xs text-muted-foreground mb-2">Competitors Tracked</p>
            <p className="text-3xl font-bold text-foreground">{competitorTargets?.length || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-5 text-center">
            <p className="text-xs text-muted-foreground mb-2">SEO Suggestions</p>
            <p className="text-3xl font-bold text-accent">{seoSuggestions?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Keywords Form */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Plus className="h-4 w-4" /> Add Target Keywords
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="e.g., digital marketing agency UK" value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)} className="flex-1" onKeyDown={(e) => e.key === "Enter" && handleAddKeyword()} />
            <Input placeholder="Target URL (optional)" value={newTargetUrl} onChange={(e) => setNewTargetUrl(e.target.value)} className="flex-1 max-w-xs" />
            <Button onClick={handleAddKeyword} disabled={addKeyword.isPending || !newKeyword.trim()}>
              {addKeyword.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />}
              Add
            </Button>
          </div>
          {targetKeywords && targetKeywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {targetKeywords.map((kw) => (
                <Badge key={kw.id} variant="secondary" className="gap-1 text-xs pr-1">
                  {kw.keyword}
                  <button onClick={() => removeKeyword.mutate(kw.id)} className="ml-1 hover:text-destructive transition-colors">
                    <Trash2 className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="overview" className="text-xs gap-1.5"><BarChart3 className="h-3.5 w-3.5" />Overview</TabsTrigger>
          <TabsTrigger value="chart" className="text-xs gap-1.5"><TrendingUp className="h-3.5 w-3.5" />Position Chart</TabsTrigger>
          <TabsTrigger value="keywords" className="text-xs gap-1.5"><Target className="h-3.5 w-3.5" />Keywords</TabsTrigger>
          <TabsTrigger value="changes" className="text-xs gap-1.5 relative">
            <Bell className="h-3.5 w-3.5" />Changes
            {rankChanges.length > 0 && <Badge variant="secondary" className="ml-1 h-4 min-w-[16px] text-[9px] px-1">{rankChanges.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="competitors" className="text-xs gap-1.5"><Shield className="h-3.5 w-3.5" />Competitors</TabsTrigger>
          <TabsTrigger value="suggestions" className="text-xs gap-1.5 relative">
            <Lightbulb className="h-3.5 w-3.5" />Suggestions
            {(seoSuggestions?.length || 0) > 0 && <Badge variant="secondary" className="ml-1 h-4 min-w-[16px] text-[9px] px-1">{seoSuggestions?.length}</Badge>}
          </TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          {!hasKeywords ? (
            <EmptyState title="No SEO data yet" description="Track keyword rankings by adding keywords above or connecting Search Console in Integrations." />
          ) : (
            <Card className="bg-card/50 border-border/50">
              <CardHeader><CardTitle>Keyword Performance Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {latestRankings.slice(0, 10).map((kw, idx) => (
                  <motion.div key={kw.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * idx }} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getPositionChange(kw.position, kw.previous_position)}
                      <span className="font-medium text-sm">{kw.keyword}</span>
                    </div>
                    <Badge variant="outline" className="font-mono">#{kw.position || "–"}</Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Keywords */}
        <TabsContent value="keywords">
          {!hasKeywords ? (
            <EmptyState title="No keywords tracked" description="Add keywords above to start tracking." />
          ) : (
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Keyword Rankings</CardTitle>
                <CardDescription>Track your position for target keywords</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead>Keyword</TableHead>
                      <TableHead className="text-center">Position</TableHead>
                      <TableHead className="text-center">Change</TableHead>
                      <TableHead className="text-center">Volume</TableHead>
                      <TableHead className="text-center">Difficulty</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestRankings.map((kw, idx) => (
                      <motion.tr key={kw.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * idx }} className="border-border/30">
                        <TableCell className="font-medium">{kw.keyword}</TableCell>
                        <TableCell className="text-center"><Badge variant="outline" className="font-mono">#{kw.position || "–"}</Badge></TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {getPositionChange(kw.position, kw.previous_position)}
                            {kw.previous_position && kw.position ? (
                              <span className={`text-sm font-mono ${kw.position < kw.previous_position ? "text-green-400" : kw.position > kw.previous_position ? "text-red-400" : "text-muted-foreground"}`}>
                                {kw.position < kw.previous_position ? "+" : ""}{(kw.previous_position - kw.position)}
                              </span>
                            ) : <span className="text-sm text-muted-foreground">–</span>}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{kw.search_volume?.toLocaleString() || "–"}</TableCell>
                        <TableCell className="text-center">
                          {kw.difficulty ? (
                            <div className="flex items-center justify-center gap-2">
                              <Progress value={Number(kw.difficulty)} className="w-16 h-2" />
                              <span className="text-xs text-muted-foreground">{kw.difficulty}</span>
                            </div>
                          ) : "–"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(kw.keyword)}`, "_blank")}>
                            <Search className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Rank Changes */}
        <TabsContent value="changes" className="space-y-6">
          {rankChanges.length === 0 ? (
            <EmptyState title="No rank changes detected" description="When keyword positions change, they'll appear here." />
          ) : (
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Recent Rank Changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rankChanges.map((kw, idx) => {
                  const isImproving = kw.change! > 0;
                  return (
                    <motion.div key={kw.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * idx }}
                      className={`flex items-center justify-between p-4 rounded-lg border ${isImproving ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`}
                    >
                      <div className="flex items-center gap-3">
                        {isImproving ? <ArrowUp className="h-5 w-5 text-green-400" /> : <ArrowDown className="h-5 w-5 text-red-400" />}
                        <div>
                          <p className="font-medium text-sm">{kw.keyword}</p>
                          <p className="text-xs text-muted-foreground">#{kw.previous_position} → #{kw.position}</p>
                        </div>
                      </div>
                      <Badge className={`font-mono text-sm ${isImproving ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/30"}`}>
                        {isImproving ? "+" : ""}{kw.change}
                      </Badge>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Competitors */}
        <TabsContent value="competitors" className="space-y-6">
          {/* Add competitor */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4" /> Competitor Tracking</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={runCompetitorAnalysis} disabled={isRunningAnalysis}>
                  {isRunningAnalysis ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <RefreshCw className="h-3 w-3 mr-1" />}
                  Run Analysis Now
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-3">
                <Input placeholder="https://competitor-agency.com" value={newCompetitorUrl} onChange={(e) => setNewCompetitorUrl(e.target.value)} className="flex-1" onKeyDown={(e) => e.key === "Enter" && newCompetitorUrl.trim() && addCompetitor.mutate(newCompetitorUrl.trim())} />
                <Button onClick={() => newCompetitorUrl.trim() && addCompetitor.mutate(newCompetitorUrl.trim())} disabled={addCompetitor.isPending || !newCompetitorUrl.trim()}>
                  {addCompetitor.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />}
                  Add
                </Button>
              </div>
              {competitorTargets && competitorTargets.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {competitorTargets.map((ct) => (
                    <Badge key={ct.id} variant="secondary" className="gap-1 text-xs pr-1">
                      <Globe className="h-2.5 w-2.5" />
                      {ct.company_name || ct.competitor_url.replace(/https?:\/\//,"").replace(/\/$/,"")}
                      {ct.last_checked_at && <span className="text-muted-foreground/50 text-[9px] ml-1">checked</span>}
                      <button onClick={() => removeCompetitor.mutate(ct.id)} className="ml-1 hover:text-destructive transition-colors">
                        <Trash2 className="h-2.5 w-2.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Latest snapshots */}
          {latestSnapshots.length === 0 ? (
            <EmptyState title="No competitor data yet" description="Add competitors above and run analysis to see competitive intelligence." />
          ) : (
            <div className="space-y-4">
              {latestSnapshots.map((snapshot) => (
                <Card key={snapshot.id} className="bg-card/50 border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-sm">{snapshot.company_name || snapshot.competitor_url}</CardTitle>
                        <CardDescription className="text-[11px]">{snapshot.positioning?.slice(0, 120)}...</CardDescription>
                      </div>
                      <Badge className={`${threatColor(snapshot.threat_level)} text-[10px]`}>
                        {snapshot.threat_level} threat
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-xs font-semibold mb-2 text-green-400 flex items-center gap-1"><ArrowUp className="h-3 w-3" /> Strengths</h4>
                        <div className="space-y-1">
                          {(snapshot.strengths || []).slice(0, 3).map((s: any, i: number) => (
                            <p key={i} className="text-[11px] text-muted-foreground">• {s.area || s.description || String(s)}</p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold mb-2 text-red-400 flex items-center gap-1"><ArrowDown className="h-3 w-3" /> Weaknesses</h4>
                        <div className="space-y-1">
                          {(snapshot.weaknesses || []).slice(0, 3).map((w: any, i: number) => (
                            <p key={i} className="text-[11px] text-muted-foreground">• {w.area || w.opportunity || String(w)}</p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold mb-2 text-accent flex items-center gap-1"><Lightbulb className="h-3 w-3" /> Opportunities</h4>
                        <div className="space-y-1">
                          {(snapshot.opportunities || []).slice(0, 3).map((o: any, i: number) => (
                            <p key={i} className="text-[11px] text-muted-foreground">• {o.title || o.action || String(o)}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    {(snapshot.recommendations || []).length > 0 && (
                      <div className="mt-4 pt-3 border-t border-border/30">
                        <h4 className="text-xs font-semibold mb-2">Key Recommendations</h4>
                        <div className="space-y-1.5">
                          {(snapshot.recommendations || []).slice(0, 3).map((r: any, i: number) => (
                            <div key={i} className="flex items-start gap-2">
                              <Badge className={`${priorityColor(r.priority || "medium")} text-[9px] px-1.5 py-0 mt-0.5`}>{r.priority}</Badge>
                              <p className="text-[11px] text-muted-foreground">{r.action || String(r)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* SEO Suggestions */}
        <TabsContent value="suggestions" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">AI-Powered SEO Suggestions</h3>
              <p className="text-[11px] text-muted-foreground">Automatically generated optimization recommendations</p>
            </div>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={runSeoOptimize} disabled={isRunningOptimize}>
              {isRunningOptimize ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Lightbulb className="h-3 w-3 mr-1" />}
              Generate Suggestions
            </Button>
          </div>

          {!seoSuggestions || seoSuggestions.length === 0 ? (
            <EmptyState title="No pending suggestions" description="Click 'Generate Suggestions' to get AI-powered SEO recommendations for your content." />
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {seoSuggestions.map((s, idx) => {
                  const typeLabels: Record<string, string> = {
                    internal_link: "Internal Link",
                    meta_description: "Meta Description",
                    content_gap: "Content Gap",
                    title_tag: "Title Tag",
                  };
                  const typeIcons: Record<string, React.ReactNode> = {
                    internal_link: <ExternalLink className="h-3 w-3" />,
                    meta_description: <Eye className="h-3 w-3" />,
                    content_gap: <Target className="h-3 w-3" />,
                    title_tag: <Search className="h-3 w-3" />,
                  };

                  return (
                    <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: 0.03 * idx }}>
                      <Card className="bg-card/50 border-border/50 hover:border-accent/20 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-[10px] gap-1 px-1.5 py-0">
                                  {typeIcons[s.suggestion_type]}
                                  {typeLabels[s.suggestion_type] || s.suggestion_type}
                                </Badge>
                                <Badge className={`${priorityColor(s.priority)} text-[10px] px-1.5 py-0`}>{s.priority}</Badge>
                                {s.target_page && (
                                  <span className="text-[10px] text-muted-foreground font-mono">/{s.target_page}</span>
                                )}
                              </div>
                              <p className="text-sm text-foreground">{s.suggestion}</p>
                              {s.context && <p className="text-[11px] text-muted-foreground mt-1">{s.context}</p>}
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-green-400 hover:text-green-300"
                                onClick={() => resolveSuggestion.mutate({ id: s.id, status: "applied" })}>
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                                onClick={() => resolveSuggestion.mutate({ id: s.id, status: "dismissed" })}>
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
