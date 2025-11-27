import { Helmet } from "react-helmet-async";
import { useState } from "react";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Target } from "lucide-react";

const PlatformCampaigns = () => {
  const [channelFilter, setChannelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const campaigns = [
    {
      id: "1",
      name: "Enterprise SaaS Lead Gen",
      client: "TechCorp Industries",
      channel: "Google Ads",
      objective: "Lead generation",
      status: "live",
      nextReview: "Mar 25, 2024",
    },
    {
      id: "2",
      name: "Brand Awareness - LinkedIn",
      client: "GreenLeaf Solutions",
      channel: "LinkedIn Ads",
      objective: "Awareness",
      status: "live",
      nextReview: "Mar 28, 2024",
    },
    {
      id: "3",
      name: "Demo Retargeting Flow",
      client: "TechCorp Industries",
      channel: "Meta Ads",
      objective: "Retargeting",
      status: "live",
      nextReview: "Mar 30, 2024",
    },
    {
      id: "4",
      name: "Q2 Content Campaign",
      client: "BlueSky Consulting",
      channel: "SEO",
      objective: "Organic growth",
      status: "planned",
      nextReview: "Apr 5, 2024",
    },
    {
      id: "5",
      name: "Product Launch - Google Search",
      client: "Urban Dynamics",
      channel: "Google Ads",
      objective: "Lead generation",
      status: "paused",
      nextReview: "Apr 10, 2024",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "planned":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "paused":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      case "completed":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      default:
        return "";
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesChannel = channelFilter === "all" || campaign.channel === channelFilter;
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesStatus && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Campaigns & Channels - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Campaigns & Channels</h1>
            <p className="text-muted-foreground">
              Manage all live and planned campaigns across clients and channels
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
                    placeholder="Search campaigns or clients..."
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
                    <SelectItem value="Google Ads">Google Ads</SelectItem>
                    <SelectItem value="Meta Ads">Meta Ads</SelectItem>
                    <SelectItem value="LinkedIn Ads">LinkedIn Ads</SelectItem>
                    <SelectItem value="SEO">SEO</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr className="bg-muted/50">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Campaign
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Client
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Channel
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Objective
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Next Review
                      </th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{campaign.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-foreground">{campaign.client}</td>
                        <td className="p-4">
                          <Badge variant="secondary" className="text-xs">
                            {campaign.channel}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{campaign.objective}</td>
                        <td className="p-4">
                          <Badge variant="outline" className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{campaign.nextReview}</td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {filteredCampaigns.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No campaigns found matching your filters.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </AppShell>
    </>
  );
};

export default PlatformCampaigns;
