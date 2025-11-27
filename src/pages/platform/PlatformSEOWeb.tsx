import { Helmet } from "react-helmet-async";
import { useState } from "react";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Globe, ExternalLink, AlertCircle } from "lucide-react";

const PlatformSEOWeb = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const assets = [
    {
      id: "1",
      type: "Homepage",
      client: "TechCorp Industries",
      url: "https://techcorp.com",
      status: "live",
      lastUpdated: "Mar 10, 2024",
      owner: "Jordan Lee",
    },
    {
      id: "2",
      type: "Service page",
      client: "TechCorp Industries",
      url: "https://techcorp.com/enterprise",
      status: "live",
      lastUpdated: "Feb 28, 2024",
      owner: "Jordan Lee",
    },
    {
      id: "3",
      type: "Landing page",
      client: "GreenLeaf Solutions",
      url: "https://greenleaf.com/consultation",
      status: "in-progress",
      lastUpdated: "Mar 18, 2024",
      owner: "Sam Chen",
    },
    {
      id: "4",
      type: "Blog",
      client: "BlueSky Consulting",
      url: "https://bluesky.com/blog",
      status: "needs-review",
      lastUpdated: "Mar 5, 2024",
      owner: "Alex Morgan",
    },
    {
      id: "5",
      type: "Tool",
      client: "Urban Dynamics",
      url: "https://urban.com/calculator",
      status: "live",
      lastUpdated: "Jan 22, 2024",
      owner: "Jordan Lee",
    },
  ];

  const healthSnapshot = [
    {
      client: "TechCorp Industries",
      score: "B",
      issueCount: 3,
      flags: ["Missing internal links on 2 pages", "Slow load on /resources page"],
    },
    {
      client: "GreenLeaf Solutions",
      score: "A",
      issueCount: 0,
      flags: [],
    },
    {
      client: "BlueSky Consulting",
      score: "C",
      issueCount: 5,
      flags: ["Blog lacking H1 tags", "Broken links detected"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "in-progress":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "needs-review":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      default:
        return "";
    }
  };

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

  const filteredAssets = assets.filter((asset) => {
    const matchesType = typeFilter === "all" || asset.type === typeFilter;
    const matchesSearch =
      searchQuery === "" ||
      asset.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>SEO & Web Assets - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">SEO & Web Assets</h1>
            <p className="text-muted-foreground">
              Digital asset inventory and health snapshot across clients
            </p>
          </div>

          {/* SEO Health Snapshot */}
          <div>
            <h2 className="text-xl font-light text-foreground mb-4">SEO Health Snapshot</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {healthSnapshot.map((item) => (
                <Card key={item.client}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-foreground">{item.client}</h3>
                      <Badge variant="outline" className={getScoreColor(item.score)}>
                        Grade {item.score}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.issueCount === 0
                        ? "No issues detected"
                        : `${item.issueCount} issue${item.issueCount > 1 ? "s" : ""} need attention`}
                    </p>
                    {item.flags.length > 0 && (
                      <div className="space-y-2">
                        {item.flags.map((flag, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground">{flag}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search assets or clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="Homepage">Homepage</SelectItem>
                    <SelectItem value="Service page">Service page</SelectItem>
                    <SelectItem value="Landing page">Landing page</SelectItem>
                    <SelectItem value="Blog">Blog</SelectItem>
                    <SelectItem value="Tool">Tool</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Assets Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Assets</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr className="bg-muted/50">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Client
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        URL
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Last Updated
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Owner
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map((asset) => (
                      <tr key={asset.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-4">
                          <Badge variant="secondary" className="text-xs">
                            {asset.type}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-foreground">{asset.client}</td>
                        <td className="p-4">
                          <a
                            href={asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <Globe className="h-3 w-3" />
                            {asset.url}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className={getStatusColor(asset.status)}>
                            {asset.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{asset.lastUpdated}</td>
                        <td className="p-4 text-sm text-foreground">{asset.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

export default PlatformSEOWeb;
