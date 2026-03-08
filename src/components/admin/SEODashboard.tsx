import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaticBeamBorder } from "@/components/BeamBorder";
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

const getPositionChange = (current: number | null, previous: number | null) => {
  if (!current || !previous) return <Minus className="h-4 w-4 text-muted-foreground" />;
  if (current < previous) return <ArrowUp className="h-4 w-4 text-green-400" />;
  if (current > previous) return <ArrowDown className="h-4 w-4 text-red-400" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const getChangeValue = (current: number | null, previous: number | null) => {
  if (!current || !previous) return null;
  return previous - current; // positive = improved
};

export default function SEODashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [newKeyword, setNewKeyword] = useState("");
  const [newTargetUrl, setNewTargetUrl] = useState("");
  const queryClient = useQueryClient();

  // Fetch real keyword data from seo_rankings
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

  // Fetch target keywords
  const { data: targetKeywords, isLoading: keywordsLoading } = useQuery({
    queryKey: ["seo-target-keywords"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_target_keywords" as any)
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as TargetKeyword[];
    },
  });

  // Add keyword mutation
  const addKeyword = useMutation({
    mutationFn: async ({ keyword, target_url }: { keyword: string; target_url?: string }) => {
      const { error } = await supabase
        .from("seo_target_keywords" as any)
        .insert({ keyword, target_url: target_url || null });
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

  // Remove keyword mutation
  const removeKeyword = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("seo_target_keywords" as any)
        .update({ is_active: false })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-target-keywords"] });
      toast.success("Keyword removed");
    },
  });

  // Deduplicate keywords — show latest record per keyword
  const latestRankings = React.useMemo(() => {
    if (!seoRankings) return [];
    const seen = new Map<string, SeoRanking>();
    for (const r of seoRankings) {
      if (!seen.has(r.keyword)) seen.set(r.keyword, r);
    }
    return Array.from(seen.values());
  }, [seoRankings]);

  // Rank changes — keywords with significant movement
  const rankChanges = React.useMemo(() => {
    return latestRankings
      .filter(k => k.position && k.previous_position)
      .map(k => ({
        ...k,
        change: getChangeValue(k.position, k.previous_position),
      }))
      .filter(k => k.change !== null && Math.abs(k.change!) >= 1)
      .sort((a, b) => Math.abs(b.change!) - Math.abs(a.change!));
  }, [latestRankings]);

  const hasKeywords = latestRankings.length > 0;
  const improvingCount = latestRankings.filter(k => k.position && k.previous_position && k.position < k.previous_position).length;

  const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground/30 mb-6" />
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground max-w-md mb-4">{description}</p>
          <Badge variant="outline" className="text-xs">
            Add keywords below or connect Search Console in Integrations
          </Badge>
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
      {/* SEO Overview KPIs */}
      <div className="grid md:grid-cols-3 gap-6">
        <StaticBeamBorder className="md:col-span-1" duration={5}>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Keywords Tracked</p>
              <motion.div
                className="text-4xl font-bold text-foreground"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {latestRankings.length}
              </motion.div>
              {hasKeywords && (
                <Badge className="mt-4 bg-green-500/20 text-green-400 border-green-500/30">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {improvingCount} improving
                </Badge>
              )}
            </div>
          </CardContent>
        </StaticBeamBorder>

        <Card className="bg-card/50 border-border/50 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <p className="text-lg font-bold text-foreground">{latestRankings.length}</p>
                <p className="text-xs text-muted-foreground">Keywords Tracked</p>
              </div>
              <div className="text-center p-3 bg-green-500/10 rounded-lg">
                <p className="text-lg font-bold text-green-400">{improvingCount}</p>
                <p className="text-xs text-muted-foreground">Improving</p>
              </div>
              <div className="text-center p-3 bg-red-500/10 rounded-lg">
                <p className="text-lg font-bold text-red-400">
                  {latestRankings.filter(k => k.position && k.previous_position && k.position > k.previous_position).length}
                </p>
                <p className="text-xs text-muted-foreground">Declining</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-lg font-bold text-foreground">
                  {latestRankings.filter(k => k.position && k.position <= 10).length}
                </p>
                <p className="text-xs text-muted-foreground">Page 1</p>
              </div>
            </div>
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
            <Input
              placeholder="e.g., digital marketing agency UK"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleAddKeyword()}
            />
            <Input
              placeholder="Target URL (optional)"
              value={newTargetUrl}
              onChange={(e) => setNewTargetUrl(e.target.value)}
              className="flex-1 max-w-xs"
            />
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
                  <button
                    onClick={() => removeKeyword.mutate(kw.id)}
                    className="ml-1 hover:text-destructive transition-colors"
                  >
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
        <TabsList className="bg-card/50 border border-border/50">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="keywords">
            <Target className="h-4 w-4 mr-2" />
            Keywords
          </TabsTrigger>
          <TabsTrigger value="changes">
            <Bell className="h-4 w-4 mr-2" />
            Rank Changes
            {rankChanges.length > 0 && (
              <Badge variant="secondary" className="ml-1.5 h-4 min-w-[16px] text-[9px] px-1">
                {rankChanges.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {!hasKeywords ? (
            <EmptyState
              title="No SEO data yet"
              description="Track keyword rankings by adding keywords above or connecting Search Console in Integrations."
            />
          ) : (
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Keyword Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {latestRankings.slice(0, 10).map((kw, idx) => (
                  <motion.div
                    key={kw.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getPositionChange(kw.position, kw.previous_position)}
                      <span className="font-medium text-sm">{kw.keyword}</span>
                    </div>
                    <Badge variant="outline" className="font-mono">
                      #{kw.position || "–"}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="keywords">
          {!hasKeywords ? (
            <EmptyState
              title="No keywords tracked"
              description="Add keywords above to start tracking their search rankings and performance over time."
            />
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
                      <motion.tr
                        key={kw.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * idx }}
                        className="border-border/30"
                      >
                        <TableCell className="font-medium">{kw.keyword}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="font-mono">
                            #{kw.position || "–"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {getPositionChange(kw.position, kw.previous_position)}
                            {kw.previous_position && kw.position ? (
                              <span className={`text-sm font-mono ${
                                kw.position < kw.previous_position ? "text-green-400" :
                                kw.position > kw.previous_position ? "text-red-400" : "text-muted-foreground"
                              }`}>
                                {kw.position < kw.previous_position ? "+" : ""}{(kw.previous_position - kw.position)}
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">–</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {kw.search_volume?.toLocaleString() || "–"}
                        </TableCell>
                        <TableCell className="text-center">
                          {kw.difficulty ? (
                            <div className="flex items-center justify-center gap-2">
                              <Progress value={Number(kw.difficulty)} className="w-16 h-2" />
                              <span className="text-xs text-muted-foreground">{kw.difficulty}</span>
                            </div>
                          ) : "–"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(kw.keyword)}`, "_blank")}
                          >
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

        <TabsContent value="changes" className="space-y-6">
          {rankChanges.length === 0 ? (
            <EmptyState
              title="No rank changes detected"
              description="When keyword positions change, they'll appear here as notifications."
            />
          ) : (
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Rank Changes
                </CardTitle>
                <CardDescription>Keywords with position changes sorted by magnitude</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {rankChanges.map((kw, idx) => {
                  const isImproving = kw.change! > 0;
                  return (
                    <motion.div
                      key={kw.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        isImproving
                          ? "bg-green-500/5 border-green-500/20"
                          : "bg-red-500/5 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isImproving ? (
                          <ArrowUp className="h-5 w-5 text-green-400" />
                        ) : (
                          <ArrowDown className="h-5 w-5 text-red-400" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{kw.keyword}</p>
                          <p className="text-xs text-muted-foreground">
                            #{kw.previous_position} → #{kw.position}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`font-mono text-sm ${
                          isImproving
                            ? "bg-green-500/10 text-green-400 border-green-500/30"
                            : "bg-red-500/10 text-red-400 border-red-500/30"
                        }`}
                      >
                        {isImproving ? "+" : ""}{kw.change}
                      </Badge>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
