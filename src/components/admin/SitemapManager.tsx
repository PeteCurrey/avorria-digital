import React, { useState } from "react";
import { format } from "date-fns";
import {
  Globe,
  FileText,
  MapPin,
  Newspaper,
  RefreshCw,
  CheckCircle,
  Download,
  ExternalLink,
  Clock,
  Zap,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { landingPages } from "@/data/landingPages";
import { locations } from "@/data/locations";
import { resources } from "@/data/resources";

const EDGE_FUNCTION_BASE = "https://delvgmrcfaeubuixprwz.supabase.co/functions/v1/sitemap";

// Static pages configuration (mirrors edge function)
const staticPages = [
  { path: "/", name: "Homepage", priority: 1.0 },
  { path: "/services", name: "Services", priority: 0.9 },
  { path: "/services/seo", name: "SEO Services", priority: 0.9 },
  { path: "/services/paid-media", name: "Paid Media", priority: 0.9 },
  { path: "/services/web-design", name: "Web Design", priority: 0.9 },
  { path: "/case-studies", name: "Case Studies", priority: 0.9 },
  { path: "/contact", name: "Contact", priority: 0.9 },
  { path: "/pricing", name: "Pricing", priority: 0.9 },
  { path: "/about", name: "About", priority: 0.8 },
  { path: "/resources", name: "Resources", priority: 0.8 },
  { path: "/faqs", name: "FAQs", priority: 0.7 },
];

export default function SitemapManager() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [caseStudyCount, setCaseStudyCount] = useState<number | null>(null);

  // Fetch case study count from database
  const fetchCaseStudyCount = async () => {
    const { count } = await supabase
      .from("case_studies")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true);
    setCaseStudyCount(count);
  };

  // Refresh sitemaps by calling edge function
  const handleRefreshSitemaps = async () => {
    setIsRefreshing(true);
    try {
      // Call each sitemap endpoint to refresh cache
      const endpoints = [
        EDGE_FUNCTION_BASE,
        `${EDGE_FUNCTION_BASE}?type=index`,
        `${EDGE_FUNCTION_BASE}?type=news`,
        `${EDGE_FUNCTION_BASE}?type=geo`,
      ];

      await Promise.all(
        endpoints.map((url) =>
          fetch(url, { cache: "no-store" }).then((r) => r.text())
        )
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

  // Download sitemap from edge function
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

  // Open sitemap in new tab
  const openSitemap = (type: "main" | "news" | "geo" | "index") => {
    let url = EDGE_FUNCTION_BASE;
    switch (type) {
      case "index":
        url = `${EDGE_FUNCTION_BASE}?type=index`;
        break;
      case "news":
        url = `${EDGE_FUNCTION_BASE}?type=news`;
        break;
      case "geo":
        url = `${EDGE_FUNCTION_BASE}?type=geo`;
        break;
    }
    window.open(url, "_blank");
  };

  // 4 services per location for geo pages
  const geoPageCount = locations.length * 4;
  
  const totalUrls =
    staticPages.length +
    landingPages.length +
    geoPageCount +
    resources.length +
    (caseStudyCount || 0);

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Dynamic Sitemaps Enabled</p>
              <p className="text-sm text-muted-foreground">
                Sitemaps are generated dynamically from the database. When you publish new case studies, the sitemap automatically updates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Est. Total URLs</p>
                <p className="text-2xl font-bold text-foreground">{totalUrls}</p>
              </div>
              <Globe className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Case Studies</p>
                <p className="text-2xl font-bold text-foreground">
                  {caseStudyCount ?? "—"}
                </p>
              </div>
              <Database className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Landing Pages</p>
                <p className="text-2xl font-bold text-foreground">{landingPages.length}</p>
              </div>
              <Newspaper className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Geo Pages</p>
                <p className="text-2xl font-bold text-foreground">{geoPageCount}</p>
                <p className="text-xs text-muted-foreground">{locations.length} locations × 4 services</p>
              </div>
              <MapPin className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sitemap Endpoints */}
        <Card className="bg-card/50 border-border/50 md:col-span-2">
          <CardHeader>
            <CardTitle>Sitemap Endpoints</CardTitle>
            <CardDescription>Dynamic sitemaps served from edge functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { type: "main" as const, name: "sitemap.xml", desc: "Main sitemap with all pages" },
              { type: "index" as const, name: "sitemap-index.xml", desc: "Index pointing to all sitemaps" },
              { type: "news" as const, name: "sitemap-news.xml", desc: "News articles for Google News" },
              { type: "geo" as const, name: "sitemap-geo.xml", desc: "Location pages with geo data" },
            ].map((sitemap) => (
              <div
                key={sitemap.type}
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{sitemap.name}</p>
                    <p className="text-xs text-muted-foreground">{sitemap.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadSitemap(sitemap.type)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openSitemap(sitemap.type)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border/50">
              <Button
                onClick={handleRefreshSitemaps}
                disabled={isRefreshing}
                className="w-full"
              >
                {isRefreshing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh & Verify Sitemaps
              </Button>

              {lastRefreshed && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last verified: {format(lastRefreshed, "HH:mm:ss")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Sitemap management tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                window.open("https://search.google.com/search-console", "_blank")
              }
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Google Search Console
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open("/robots.txt", "_blank")}
            >
              <FileText className="h-4 w-4 mr-2" />
              View robots.txt
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                navigator.clipboard.writeText(EDGE_FUNCTION_BASE);
                toast.success("Sitemap URL copied");
              }}
            >
              <Globe className="h-4 w-4 mr-2" />
              Copy Sitemap URL
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => fetchCaseStudyCount()}
            >
              <Database className="h-4 w-4 mr-2" />
              Refresh Case Study Count
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Static Pages Preview */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Core Pages in Sitemap</CardTitle>
          <CardDescription>Static pages always included in the sitemap</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {staticPages.map((page, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-background/50 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-500/10 text-blue-400 border-blue-500/20"
                    >
                      {page.priority}
                    </Badge>
                    <span className="text-foreground">{page.name}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">{page.path}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
