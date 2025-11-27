import { Helmet } from "react-helmet-async";
import { useState } from "react";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent } from "@/components/ui/card";
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
import { Search, BookOpen, ArrowRight } from "lucide-react";

const PlatformPlaybooks = () => {
  const [channelFilter, setChannelFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const playbooks = [
    {
      id: "1",
      title: "SEO Foundations Audit",
      channel: "SEO",
      stage: "Foundations",
      complexity: "Medium",
      description: "Complete technical and on-page SEO audit protocol",
    },
    {
      id: "2",
      title: "Google Ads Lead Gen Setup",
      channel: "Paid",
      stage: "Foundations",
      complexity: "Light",
      description: "Account structure, campaign setup, and tracking implementation",
    },
    {
      id: "3",
      title: "Conversion Rate Optimization Audit",
      channel: "Web",
      stage: "Scale",
      complexity: "Heavy",
      description: "Full funnel analysis and prioritization framework",
    },
    {
      id: "4",
      title: "Analytics Migration Checklist",
      channel: "Analytics",
      stage: "Rescue",
      complexity: "Heavy",
      description: "GA4 migration and data integrity validation",
    },
    {
      id: "5",
      title: "Content Strategy Framework",
      channel: "Content",
      stage: "Foundations",
      complexity: "Medium",
      description: "ICP research, keyword mapping, and content calendar",
    },
    {
      id: "6",
      title: "Paid Media Scale Protocol",
      channel: "Paid",
      stage: "Scale",
      complexity: "Medium",
      description: "Budget allocation, testing framework, and reporting cadence",
    },
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Light":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Heavy":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "";
    }
  };

  const filteredPlaybooks = playbooks.filter((playbook) => {
    const matchesChannel = channelFilter === "all" || playbook.channel === channelFilter;
    const matchesSearch =
      searchQuery === "" ||
      playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playbook.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Playbooks & Docs - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Playbooks & Docs</h1>
            <p className="text-muted-foreground">
              Internal playbooks and SOPs for consistent delivery
            </p>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search playbooks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={channelFilter} onValueChange={setChannelFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All channels</SelectItem>
                    <SelectItem value="SEO">SEO</SelectItem>
                    <SelectItem value="Paid">Paid Media</SelectItem>
                    <SelectItem value="Web">Web</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Content">Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Playbooks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlaybooks.map((playbook) => (
              <Card key={playbook.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1">{playbook.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{playbook.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {playbook.channel}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {playbook.stage}
                    </Badge>
                    <Badge variant="outline" className={getComplexityColor(playbook.complexity)}>
                      {playbook.complexity}
                    </Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    View playbook
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppShell>
    </>
  );
};

export default PlatformPlaybooks;
