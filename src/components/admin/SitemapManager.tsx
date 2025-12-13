import { useState } from "react";
import { format } from "date-fns";
import {
  Globe,
  FileText,
  MapPin,
  Newspaper,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { landingPages } from "@/data/landingPages";
import { locations } from "@/data/locations";
import { resources } from "@/data/resources";
import { services } from "@/data/services";

// Static pages configuration
const staticPages = [
  { path: "/", name: "Homepage", priority: 1.0, changefreq: "weekly" },
  { path: "/services", name: "Services", priority: 0.9, changefreq: "weekly" },
  { path: "/services/seo", name: "SEO Services", priority: 0.9, changefreq: "weekly" },
  { path: "/services/paid-media", name: "Paid Media", priority: 0.9, changefreq: "weekly" },
  { path: "/services/web-design", name: "Web Design", priority: 0.9, changefreq: "weekly" },
  { path: "/services/content-email", name: "Content & Email", priority: 0.8, changefreq: "weekly" },
  { path: "/services/analytics", name: "Analytics", priority: 0.8, changefreq: "weekly" },
  { path: "/services/social-personal-brand", name: "Social & Brand", priority: 0.8, changefreq: "weekly" },
  { path: "/case-studies", name: "Case Studies", priority: 0.9, changefreq: "weekly" },
  { path: "/about", name: "About", priority: 0.7, changefreq: "monthly" },
  { path: "/contact", name: "Contact", priority: 0.8, changefreq: "monthly" },
  { path: "/pricing", name: "Pricing", priority: 0.8, changefreq: "monthly" },
  { path: "/resources", name: "Resources", priority: 0.8, changefreq: "weekly" },
  { path: "/faqs", name: "FAQs", priority: 0.6, changefreq: "monthly" },
  { path: "/why-avorria", name: "Why Avorria", priority: 0.7, changefreq: "monthly" },
  { path: "/free-website-audit", name: "Free Website Audit", priority: 0.8, changefreq: "monthly" },
  { path: "/project-estimator", name: "Project Estimator", priority: 0.7, changefreq: "monthly" },
  { path: "/web-design-studio", name: "Web Design Studio", priority: 0.7, changefreq: "monthly" },
  { path: "/agency-teardown", name: "Agency Teardown", priority: 0.7, changefreq: "monthly" },
];

const BASE_URL = "https://avorria.com";

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  type: "static" | "landing" | "resource" | "location" | "case-study";
  name: string;
}

export default function SitemapManager() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);
  const [includeStatic, setIncludeStatic] = useState(true);
  const [includeLanding, setIncludeLanding] = useState(true);
  const [includeResources, setIncludeResources] = useState(true);
  const [includeLocations, setIncludeLocations] = useState(true);

  const today = format(new Date(), "yyyy-MM-dd");

  // Build all sitemap entries
  const getAllEntries = (): SitemapEntry[] => {
    const entries: SitemapEntry[] = [];

    if (includeStatic) {
      staticPages.forEach((page) => {
        entries.push({
          loc: `${BASE_URL}${page.path}`,
          lastmod: today,
          changefreq: page.changefreq,
          priority: page.priority,
          type: "static",
          name: page.name,
        });
      });
    }

    if (includeLanding) {
      landingPages.forEach((page) => {
        entries.push({
          loc: `${BASE_URL}/l/${page.slug}`,
          lastmod: today,
          changefreq: "monthly",
          priority: 0.7,
          type: "landing",
          name: page.title,
        });
      });
    }

    if (includeResources) {
      resources.forEach((resource) => {
        entries.push({
          loc: `${BASE_URL}/resources/${resource.slug}`,
          lastmod: resource.publishedDate || today,
          changefreq: "monthly",
          priority: resource.isPillar ? 0.8 : 0.6,
          type: "resource",
          name: resource.title,
        });
      });
    }

    if (includeLocations) {
      locations.forEach((location) => {
        entries.push({
          loc: `${BASE_URL}/locations/${location.slug}`,
          lastmod: today,
          changefreq: "monthly",
          priority: location.isPrimaryMarket ? 0.8 : 0.7,
          type: "location",
          name: location.city,
        });
      });
    }

    return entries;
  };

  // Generate main sitemap XML
  const generateMainSitemap = (): string => {
    const entries = getAllEntries();
    const urlEntries = entries
      .map(
        (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
      )
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
  };

  // Generate news sitemap XML
  const generateNewsSitemap = (): string => {
    const newsEntries = resources
      .filter((r) => r.publishedDate)
      .slice(0, 10)
      .map(
        (r) => `  <url>
    <loc>${BASE_URL}/resources/${r.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Avorria</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${r.publishedDate}</news:publication_date>
      <news:title>${r.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</news:title>
      <news:keywords>${r.category}, digital marketing, ${r.targetKeyword || "business growth"}</news:keywords>
    </news:news>
  </url>`
      )
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsEntries}
</urlset>`;
  };

  // Generate geo sitemap XML
  const generateGeoSitemap = (): string => {
    const geoEntries = locations
      .map(
        (loc) => `  <url>
    <loc>${BASE_URL}/locations/${loc.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${loc.isPrimaryMarket ? 0.8 : 0.7}</priority>
    <geo:geo>
      <geo:format>kml</geo:format>
    </geo:geo>
  </url>`
      )
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0">
${geoEntries}
</urlset>`;
  };

  // Generate sitemap index XML
  const generateSitemapIndex = (): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-news.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-geo.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
  };

  const handleGenerateSitemaps = async () => {
    setIsGenerating(true);
    try {
      // Generate all sitemaps
      const mainSitemap = generateMainSitemap();
      const newsSitemap = generateNewsSitemap();
      const geoSitemap = generateGeoSitemap();
      const sitemapIndex = generateSitemapIndex();

      // In production, you would save these to the public folder via an API
      // For now, we'll show a preview and allow download
      console.log("Generated sitemaps:", {
        main: mainSitemap,
        news: newsSitemap,
        geo: geoSitemap,
        index: sitemapIndex,
      });

      setLastGenerated(new Date());
      toast.success("Sitemaps generated successfully", {
        description: `${getAllEntries().length} URLs included in main sitemap`,
      });
    } catch (error) {
      toast.error("Failed to generate sitemaps");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadSitemap = (type: "main" | "news" | "geo" | "index") => {
    let content = "";
    let filename = "";

    switch (type) {
      case "main":
        content = generateMainSitemap();
        filename = "sitemap.xml";
        break;
      case "news":
        content = generateNewsSitemap();
        filename = "sitemap-news.xml";
        break;
      case "geo":
        content = generateGeoSitemap();
        filename = "sitemap-geo.xml";
        break;
      case "index":
        content = generateSitemapIndex();
        filename = "sitemap-index.xml";
        break;
    }

    const blob = new Blob([content], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`Downloaded ${filename}`);
  };

  const entries = getAllEntries();
  const entriesByType = {
    static: entries.filter((e) => e.type === "static").length,
    landing: entries.filter((e) => e.type === "landing").length,
    resource: entries.filter((e) => e.type === "resource").length,
    location: entries.filter((e) => e.type === "location").length,
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total URLs</p>
                <p className="text-2xl font-bold text-foreground">{entries.length}</p>
              </div>
              <Globe className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Static Pages</p>
                <p className="text-2xl font-bold text-foreground">{entriesByType.static}</p>
              </div>
              <FileText className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Landing Pages</p>
                <p className="text-2xl font-bold text-foreground">{entriesByType.landing}</p>
              </div>
              <Newspaper className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Locations</p>
                <p className="text-2xl font-bold text-foreground">{entriesByType.location}</p>
              </div>
              <MapPin className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Configuration */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Sitemap Configuration</CardTitle>
            <CardDescription>Select what to include in sitemaps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="static"
                checked={includeStatic}
                onCheckedChange={(checked) => setIncludeStatic(!!checked)}
              />
              <label htmlFor="static" className="text-sm text-foreground cursor-pointer">
                Static pages ({staticPages.length})
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="landing"
                checked={includeLanding}
                onCheckedChange={(checked) => setIncludeLanding(!!checked)}
              />
              <label htmlFor="landing" className="text-sm text-foreground cursor-pointer">
                Landing pages ({landingPages.length})
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="resources"
                checked={includeResources}
                onCheckedChange={(checked) => setIncludeResources(!!checked)}
              />
              <label htmlFor="resources" className="text-sm text-foreground cursor-pointer">
                Resources ({resources.length})
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="locations"
                checked={includeLocations}
                onCheckedChange={(checked) => setIncludeLocations(!!checked)}
              />
              <label htmlFor="locations" className="text-sm text-foreground cursor-pointer">
                Locations ({locations.length})
              </label>
            </div>

            <div className="pt-4 border-t border-border/50">
              <Button
                onClick={handleGenerateSitemaps}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Generate Sitemaps
              </Button>

              {lastGenerated && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last generated: {format(lastGenerated, "HH:mm:ss")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sitemap Files */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Sitemap Files</CardTitle>
            <CardDescription>Download or preview sitemap files</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-foreground">sitemap.xml</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadSitemap("main")}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("/sitemap.xml", "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-foreground">sitemap-index.xml</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadSitemap("index")}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("/sitemap-index.xml", "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-foreground">sitemap-news.xml</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadSitemap("news")}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("/sitemap-news.xml", "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-foreground">sitemap-geo.xml</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadSitemap("geo")}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("/sitemap-geo.xml", "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common sitemap tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open("https://search.google.com/search-console", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Google Search Console
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
                navigator.clipboard.writeText(`${BASE_URL}/sitemap.xml`);
                toast.success("Sitemap URL copied to clipboard");
              }}
            >
              <Globe className="h-4 w-4 mr-2" />
              Copy Sitemap URL
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* URL List */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>All URLs ({entries.length})</CardTitle>
          <CardDescription>Preview of URLs included in sitemap</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {entries.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-background/50 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge
                      variant="outline"
                      className={
                        entry.type === "static"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : entry.type === "landing"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : entry.type === "resource"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                      }
                    >
                      {entry.type}
                    </Badge>
                    <span className="text-foreground truncate">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="hidden md:block">{entry.priority}</span>
                    <span className="hidden lg:block">{entry.changefreq}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(entry.loc, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
