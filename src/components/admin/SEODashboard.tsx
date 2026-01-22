import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Search,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Link as LinkIcon,
  FileSearch,
  Gauge,
  Zap,
  Target,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaticBeamBorder, BeamBorder } from "@/components/BeamBorder";

// Mock data for SEO metrics
const seoHealthScore = 84;

const keywordRankings = [
  { keyword: "seo agency uk", position: 8, previousPosition: 12, volume: 2400, difficulty: 65, change: "up" },
  { keyword: "digital marketing agency", position: 15, previousPosition: 18, volume: 8100, difficulty: 78, change: "up" },
  { keyword: "b2b seo services", position: 5, previousPosition: 5, volume: 880, difficulty: 45, change: "same" },
  { keyword: "ecommerce seo", position: 22, previousPosition: 19, volume: 3600, difficulty: 72, change: "down" },
  { keyword: "local seo services", position: 11, previousPosition: 14, volume: 1900, difficulty: 58, change: "up" },
  { keyword: "website design agency", position: 18, previousPosition: 22, volume: 4400, difficulty: 68, change: "up" },
  { keyword: "paid media agency", position: 9, previousPosition: 11, volume: 1200, difficulty: 52, change: "up" },
  { keyword: "seo for saas", position: 6, previousPosition: 8, volume: 720, difficulty: 42, change: "up" },
];

const indexingStatus = {
  indexed: 187,
  discovered: 12,
  excluded: 5,
  errors: 2,
};

const coreWebVitals = [
  { metric: "LCP", value: "2.1s", target: "< 2.5s", status: "good", description: "Largest Contentful Paint" },
  { metric: "INP", value: "180ms", target: "< 200ms", status: "good", description: "Interaction to Next Paint" },
  { metric: "CLS", value: "0.08", target: "< 0.1", status: "good", description: "Cumulative Layout Shift" },
  { metric: "FCP", value: "1.4s", target: "< 1.8s", status: "good", description: "First Contentful Paint" },
];

const backlinks = {
  total: 342,
  referring_domains: 89,
  new_this_month: 14,
  lost_this_month: 3,
  top_domains: [
    { domain: "techcrunch.com", authority: 94, links: 2 },
    { domain: "hubspot.com", authority: 93, links: 3 },
    { domain: "searchenginejournal.com", authority: 88, links: 5 },
    { domain: "moz.com", authority: 91, links: 1 },
    { domain: "semrush.com", authority: 92, links: 2 },
  ],
};

const schemaValidation = [
  { page: "Homepage", type: "Organization", status: "valid" },
  { page: "Services", type: "Service", status: "valid" },
  { page: "Contact", type: "LocalBusiness", status: "valid" },
  { page: "Resources", type: "Article", status: "warning" },
  { page: "Case Studies", type: "WebPage", status: "valid" },
];

const getPositionChange = (change: string) => {
  switch (change) {
    case "up":
      return <ArrowUp className="h-4 w-4 text-green-400" />;
    case "down":
      return <ArrowDown className="h-4 w-4 text-red-400" />;
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const getVitalStatus = (status: string) => {
  switch (status) {
    case "good":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Good</Badge>;
    case "needs-improvement":
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Needs Work</Badge>;
    case "poor":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Poor</Badge>;
    default:
      return null;
  }
};

export default function SEODashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const totalIndexing = indexingStatus.indexed + indexingStatus.discovered + indexingStatus.excluded + indexingStatus.errors;
  const indexedPercentage = (indexingStatus.indexed / totalIndexing) * 100;

  return (
    <div className="space-y-6">
      {/* SEO Health Score */}
      <div className="grid md:grid-cols-3 gap-6">
        <StaticBeamBorder className="md:col-span-1" duration={5}>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">SEO Health Score</p>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(220, 20%, 20%)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#scoreGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 352" }}
                    animate={{ strokeDasharray: `${(seoHealthScore / 100) * 352} 352` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(320, 85%, 55%)" />
                      <stop offset="100%" stopColor="hsl(260, 70%, 55%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <motion.div
                  className="absolute"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-4xl font-bold text-foreground">{seoHealthScore}</span>
                  <span className="text-lg text-muted-foreground">/100</span>
                </motion.div>
              </div>
              <Badge className="mt-4 bg-green-500/20 text-green-400 border-green-500/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5 from last month
              </Badge>
            </div>
          </CardContent>
        </StaticBeamBorder>

        <Card className="bg-card/50 border-border/50 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="h-5 w-5" />
              Indexing Status
            </CardTitle>
            <CardDescription>How Google is crawling your site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Indexed Pages</span>
                <span className="font-medium">{indexingStatus.indexed} / {totalIndexing}</span>
              </div>
              <Progress value={indexedPercentage} className="h-3" />
              <div className="grid grid-cols-4 gap-4 mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-3 bg-green-500/10 rounded-lg"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-400">{indexingStatus.indexed}</p>
                  <p className="text-xs text-muted-foreground">Indexed</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center p-3 bg-blue-500/10 rounded-lg"
                >
                  <Search className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-blue-400">{indexingStatus.discovered}</p>
                  <p className="text-xs text-muted-foreground">Discovered</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center p-3 bg-yellow-500/10 rounded-lg"
                >
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-yellow-400">{indexingStatus.excluded}</p>
                  <p className="text-xs text-muted-foreground">Excluded</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-3 bg-red-500/10 rounded-lg"
                >
                  <XCircle className="h-5 w-5 text-red-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-red-400">{indexingStatus.errors}</p>
                  <p className="text-xs text-muted-foreground">Errors</p>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different SEO sections */}
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
          <TabsTrigger value="vitals">
            <Gauge className="h-4 w-4 mr-2" />
            Core Web Vitals
          </TabsTrigger>
          <TabsTrigger value="backlinks">
            <LinkIcon className="h-4 w-4 mr-2" />
            Backlinks
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Quick Stats */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Quick SEO Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-primary/70" />
                    <span>Keywords Tracked</span>
                  </div>
                  <span className="font-bold">{keywordRankings.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <span>Rankings Improved</span>
                  </div>
                  <span className="font-bold text-green-400">
                    {keywordRankings.filter(k => k.change === "up").length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <LinkIcon className="h-5 w-5 text-blue-400" />
                    <span>Total Backlinks</span>
                  </div>
                  <span className="font-bold">{backlinks.total}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-purple-400" />
                    <span>Referring Domains</span>
                  </div>
                  <span className="font-bold">{backlinks.referring_domains}</span>
                </div>
              </CardContent>
            </Card>

            {/* Schema Validation */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Schema Validation</CardTitle>
                <CardDescription>Structured data status by page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schemaValidation.map((schema, idx) => (
                    <motion.div
                      key={schema.page}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      className="flex items-center justify-between p-2 bg-background/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{schema.page}</p>
                        <p className="text-xs text-muted-foreground">{schema.type}</p>
                      </div>
                      {schema.status === "valid" ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Valid
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Warning
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords">
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
                  {keywordRankings.map((kw, idx) => (
                    <motion.tr
                      key={kw.keyword}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * idx }}
                      className="border-border/30"
                    >
                      <TableCell className="font-medium">{kw.keyword}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="font-mono">
                          #{kw.position}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {getPositionChange(kw.change)}
                          <span className="text-sm text-muted-foreground">
                            {kw.previousPosition}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {kw.volume.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Progress value={kw.difficulty} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground">{kw.difficulty}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            window.open(`https://www.google.com/search?q=${encodeURIComponent(kw.keyword)}`, "_blank");
                          }}
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
        </TabsContent>

        {/* Core Web Vitals Tab */}
        <TabsContent value="vitals">
          <div className="grid md:grid-cols-2 gap-6">
            {coreWebVitals.map((vital, idx) => (
              <motion.div
                key={vital.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <BeamBorder>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-lg font-bold">{vital.metric}</p>
                        <p className="text-sm text-muted-foreground">{vital.description}</p>
                      </div>
                      {getVitalStatus(vital.status)}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-foreground">{vital.value}</p>
                        <p className="text-sm text-muted-foreground">Target: {vital.target}</p>
                      </div>
                      <Zap className="h-8 w-8 text-primary/30" />
                    </div>
                  </CardContent>
                </BeamBorder>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Backlinks Tab */}
        <TabsContent value="backlinks" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center">
                <LinkIcon className="h-6 w-6 mx-auto mb-2 text-primary/70" />
                <p className="text-2xl font-bold">{backlinks.total}</p>
                <p className="text-sm text-muted-foreground">Total Backlinks</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center">
                <Globe className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                <p className="text-2xl font-bold">{backlinks.referring_domains}</p>
                <p className="text-sm text-muted-foreground">Referring Domains</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-400" />
                <p className="text-2xl font-bold text-green-400">+{backlinks.new_this_month}</p>
                <p className="text-sm text-muted-foreground">New This Month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center">
                <TrendingDown className="h-6 w-6 mx-auto mb-2 text-red-400" />
                <p className="text-2xl font-bold text-red-400">-{backlinks.lost_this_month}</p>
                <p className="text-sm text-muted-foreground">Lost This Month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Top Referring Domains</CardTitle>
              <CardDescription>Highest authority domains linking to your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {backlinks.top_domains.map((domain, idx) => (
                  <motion.div
                    key={domain.domain}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{domain.domain}</p>
                        <p className="text-xs text-muted-foreground">{domain.links} links</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        DA {domain.authority}
                      </Badge>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`https://${domain.domain}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
