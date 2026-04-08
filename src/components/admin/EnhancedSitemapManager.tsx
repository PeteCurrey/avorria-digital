'use client';
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Globe,
  FileText,
  MapPin,
  Target,
  BookOpen,
  Wrench,
  Shield,
  RefreshCw,
  CheckCircle,
  Download,
  ExternalLink,
  Clock,
  Zap,
  Search,
  ChevronDown,
  ChevronRight,
  Copy,
  Filter,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { StaticBeamBorder } from "@/components/BeamBorder";
import {
  getAllSitemapUrls,
  getTotalUrlCount,
  sitemapCategories,
  SitemapUrl,
} from "@/data/sitemapUrls";

const EDGE_FUNCTION_BASE = "https://delvgmrcfaeubuixprwz.supabase.co/functions/v1/sitemap";
const BASE_URL = "https://avorria.com";

const categoryIcons: Record<string, React.ReactNode> = {
  core: <Globe className="h-4 w-4" />,
  pillar: <FileText className="h-4 w-4" />,
  serviceIndustry: <Target className="h-4 w-4" />,
  geo: <MapPin className="h-4 w-4" />,
  resources: <BookOpen className="h-4 w-4" />,
  tools: <Wrench className="h-4 w-4" />,
  legal: <Shield className="h-4 w-4" />,
};

const getPriorityBadge = (priority: number) => {
  if (priority >= 0.9) {
    return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">High</Badge>;
  } else if (priority >= 0.7) {
    return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Medium</Badge>;
  } else {
    return <Badge className="bg-muted text-muted-foreground border-border/30 text-xs">Low</Badge>;
  }
};

const getStatusBadge = (status?: string) => {
  switch (status) {
    case "indexed":
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1 text-xs">
          <CheckCircle className="h-3 w-3" />
          Indexed
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 gap-1 text-xs">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      );
    case "error":
      return (
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 gap-1 text-xs">
          <AlertCircle className="h-3 w-3" />
          Error
        </Badge>
      );
    default:
      return null;
  }
};

interface CategorySectionProps {
  categoryId: string;
  urls: SitemapUrl[];
  searchQuery: string;
}

const CategorySection = ({ categoryId, urls, searchQuery }: CategorySectionProps) => {
  const [isOpen, setIsOpen] = useState(categoryId === "core");
  const category = sitemapCategories.find(c => c.id === categoryId);

  const filteredUrls = useMemo(() => {
    if (!searchQuery) return urls;
    return urls.filter(
      url =>
        url.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        url.path.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [urls, searchQuery]);

  if (filteredUrls.length === 0) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-card/50 border-border/50 overflow-hidden">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {categoryIcons[categoryId]}
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      {category?.name}
                      <Badge variant="outline" className="text-xs">
                        {filteredUrls.length} URLs
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {category?.description}
                    </CardDescription>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>

          <AnimatePresence>
            {isOpen && (
              <CollapsibleContent forceMount>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-0">
                    <div className="rounded-lg border border-border/50 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/30 hover:bg-muted/30">
                            <TableHead className="font-medium">Page</TableHead>
                            <TableHead className="font-medium">URL</TableHead>
                            <TableHead className="font-medium text-center">Priority</TableHead>
                            <TableHead className="font-medium text-center">Frequency</TableHead>
                            <TableHead className="font-medium text-center">Status</TableHead>
                            <TableHead className="font-medium text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUrls.map((url, idx) => (
                            <motion.tr
                              key={url.path}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.02 }}
                              className="border-border/30 hover:bg-muted/20"
                            >
                              <TableCell className="font-medium">{url.name}</TableCell>
                              <TableCell>
                                <a
                                  href={`${BASE_URL}${url.path}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center gap-1 text-sm"
                                >
                                  {url.path}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="text-xs text-muted-foreground">{url.priority}</span>
                                  {getPriorityBadge(url.priority)}
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge variant="outline" className="text-xs capitalize">
                                  {url.changeFreq}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                {getStatusBadge(url.status)}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => {
                                      navigator.clipboard.writeText(`${BASE_URL}${url.path}`);
                                      toast.success("URL copied to clipboard");
                                    }}
                                  >
                                    <Copy className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    asChild
                                  >
                                    <a href={`${BASE_URL}${url.path}`} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                  </Button>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </motion.div>
              </CollapsibleContent>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </Collapsible>
  );
};

export default function EnhancedSitemapManager() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [caseStudyCount, setCaseStudyCount] = useState<number | null>(null);

  const allUrls = useMemo(() => getAllSitemapUrls(), []);
  const totalUrls = getTotalUrlCount() + (caseStudyCount || 0);

  // Fetch case study count
  const fetchCaseStudyCount = async () => {
    const { count } = await supabase
      .from("case_studies")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true);
    setCaseStudyCount(count);
  };

  // Refresh sitemaps
  const handleRefreshSitemaps = async () => {
    setIsRefreshing(true);
    try {
      const endpoints = [
        EDGE_FUNCTION_BASE,
        `${EDGE_FUNCTION_BASE}?type=index`,
        `${EDGE_FUNCTION_BASE}?type=news`,
        `${EDGE_FUNCTION_BASE}?type=geo`,
      ];

      await Promise.all(
        endpoints.map(url => fetch(url, { cache: "no-store" }).then(r => r.text()))
      );

      await fetchCaseStudyCount();
      setLastRefreshed(new Date());
      toast.success("Sitemaps refreshed", {
        description: "All sitemap endpoints updated with latest data",
      });
    } catch (error) {
      toast.error("Failed to refresh sitemaps");
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Download sitemap
  const downloadSitemap = async (type: "main" | "news" | "geo" | "index") => {
    try {
      let url = EDGE_FUNCTION_BASE;
      let filename = "sitemap.xml";

      switch (type) {
        case "index":
          url = `${EDGE_FUNCTION_BASE}?type=index`;
          filename = "sitemap-index.xml";
          break;
        case "news":
          url = `${EDGE_FUNCTION_BASE}?type=news`;
          filename = "sitemap-news.xml";
          break;
        case "geo":
          url = `${EDGE_FUNCTION_BASE}?type=geo`;
          filename = "sitemap-geo.xml";
          break;
      }

      const response = await fetch(url);
      const content = await response.text();

      const blob = new Blob([content], { type: "application/xml" });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      toast.success(`Downloaded ${filename}`);
    } catch (error) {
      toast.error("Failed to download sitemap");
    }
  };

  // Export all URLs to CSV
  const exportToCSV = () => {
    const allUrlsList = [
      ...allUrls.core,
      ...allUrls.pillar,
      ...allUrls.serviceIndustry,
      ...allUrls.geo,
      ...allUrls.resources,
      ...allUrls.tools,
      ...allUrls.legal,
    ];

    const csvContent = [
      ["URL", "Name", "Category", "Priority", "Change Frequency", "Status"].join(","),
      ...allUrlsList.map(url =>
        [`${BASE_URL}${url.path}`, url.name, url.category, url.priority, url.changeFreq, url.status || "indexed"].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "sitemap-urls.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);

    toast.success("Exported sitemap URLs to CSV");
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaticBeamBorder duration={4}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total URLs</p>
                <motion.p
                  className="text-2xl font-bold text-foreground"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {totalUrls}
                </motion.p>
              </div>
              <Globe className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </StaticBeamBorder>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Location Pages</p>
                <p className="text-2xl font-bold text-foreground">{allUrls.geo.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Landing Pages</p>
                <p className="text-2xl font-bold text-foreground">{allUrls.serviceIndustry.length}</p>
              </div>
              <Target className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resources</p>
                <p className="text-2xl font-bold text-foreground">{allUrls.resources.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions Bar */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pages by name or URL..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadSitemap("main")}>
                <FileText className="h-4 w-4 mr-2" />
                sitemap.xml
              </Button>
              <Button
                size="sm"
                onClick={handleRefreshSitemaps}
                disabled={isRefreshing}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh All
              </Button>
            </div>
          </div>
          {lastRefreshed && (
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last verified: {format(lastRefreshed, "MMM d, yyyy 'at' HH:mm:ss")}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Dynamic Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Dynamic Sitemaps</p>
              <p className="text-sm text-muted-foreground">
                Sitemaps are generated dynamically from the database. Case studies and new content are automatically included when published.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* URL Categories */}
      <div className="space-y-4">
        <CategorySection categoryId="core" urls={allUrls.core} searchQuery={searchQuery} />
        <CategorySection categoryId="pillar" urls={allUrls.pillar} searchQuery={searchQuery} />
        <CategorySection categoryId="serviceIndustry" urls={allUrls.serviceIndustry} searchQuery={searchQuery} />
        <CategorySection categoryId="geo" urls={allUrls.geo} searchQuery={searchQuery} />
        <CategorySection categoryId="resources" urls={allUrls.resources} searchQuery={searchQuery} />
        <CategorySection categoryId="tools" urls={allUrls.tools} searchQuery={searchQuery} />
        <CategorySection categoryId="legal" urls={allUrls.legal} searchQuery={searchQuery} />
      </div>

      {/* Sitemap Endpoints */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Sitemap Endpoints</CardTitle>
          <CardDescription>Dynamic sitemaps served from edge functions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { type: "main" as const, name: "sitemap.xml", desc: "Main sitemap with all pages" },
            { type: "index" as const, name: "sitemap-index.xml", desc: "Index pointing to all sitemaps" },
            { type: "news" as const, name: "sitemap-news.xml", desc: "News articles for Google News" },
            { type: "geo" as const, name: "sitemap-geo.xml", desc: "Location pages with geo data" },
          ].map(sitemap => (
            <motion.div
              key={sitemap.type}
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-foreground">{sitemap.name}</p>
                  <p className="text-xs text-muted-foreground">{sitemap.desc}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => downloadSitemap(sitemap.type)}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    let url = EDGE_FUNCTION_BASE;
                    if (sitemap.type !== "main") url += `?type=${sitemap.type}`;
                    window.open(url, "_blank");
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

