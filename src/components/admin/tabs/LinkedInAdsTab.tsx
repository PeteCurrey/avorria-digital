import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Plus, Play, Pause, RefreshCw, Users, Target, TrendingUp, MousePointerClick, Eye, Handshake } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import {
  useLinkedInAdsAccounts,
  useLinkedInAdsCampaigns,
  useLinkedInAdsAggregatedMetrics,
  useLinkedInAdsCreatives,
  useCreateLinkedInAdsAccount,
  useUpdateLinkedInCampaign,
} from "@/hooks/useLinkedInAds";
import { toast } from "sonner";

const LinkedInAdsTab = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({ account_id: "", name: "" });

  const { data: accounts, isLoading: accountsLoading } = useLinkedInAdsAccounts();
  const { data: campaigns, isLoading: campaignsLoading } = useLinkedInAdsCampaigns(selectedAccountId || undefined);
  const { data: creatives } = useLinkedInAdsCreatives(selectedAccountId || undefined);
  const metrics = useLinkedInAdsAggregatedMetrics(selectedAccountId || undefined);
  const createAccount = useCreateLinkedInAdsAccount();
  const updateCampaign = useUpdateLinkedInCampaign();

  const handleConnectAccount = async () => {
    if (!newAccount.account_id || !newAccount.name) {
      toast.error("Please fill in all required fields");
      return;
    }
    await createAccount.mutateAsync({
      account_id: newAccount.account_id,
      name: newAccount.name,
      account_status: "active",
      currency: "GBP",
      timezone: "Europe/London",
      is_active: true,
      access_token: null,
      refresh_token: null,
      token_expires_at: null,
      last_synced_at: null,
    });
    setConnectDialogOpen(false);
    setNewAccount({ account_id: "", name: "" });
  };

  const handleToggleStatus = (campaignId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "PAUSED" : "ACTIVE";
    updateCampaign.mutate({ campaignId, status: newStatus });
  };

  const fmt = (v: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(v);

  const fmtNum = (v: number) => new Intl.NumberFormat("en-GB").format(Math.round(v));

  if (accountsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  const hasAccounts = accounts && accounts.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-foreground mb-1">LinkedIn Ads Management</h2>
          <p className="text-sm text-muted-foreground">B2B campaign performance and lead generation</p>
        </div>
        <div className="flex items-center gap-3">
          {hasAccounts && (
            <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
              <SelectTrigger className="w-[260px]">
                <SelectValue placeholder="Select account..." />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.name} ({acc.account_id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">
                <Plus className="mr-2 h-4 w-4" />
                Connect Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect LinkedIn Ads Account</DialogTitle>
                <DialogDescription>
                  Enter your LinkedIn Campaign Manager account details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="li-account-id">Account ID *</Label>
                  <Input
                    id="li-account-id"
                    placeholder="e.g. 123456789"
                    value={newAccount.account_id}
                    onChange={(e) => setNewAccount({ ...newAccount, account_id: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Find this in LinkedIn Campaign Manager → Account Settings
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="li-account-name">Account Name *</Label>
                  <Input
                    id="li-account-name"
                    placeholder="e.g. Avorria Digital - LinkedIn"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setConnectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConnectAccount} disabled={createAccount.isPending}>
                  {createAccount.isPending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Connecting...</>
                  ) : "Connect"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* No accounts state */}
      {!hasAccounts && (
        <Card className="border-border">
          <CardContent className="py-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[hsl(var(--accent)/0.1)] flex items-center justify-center">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">No LinkedIn Ads accounts connected</p>
                <p className="text-sm text-muted-foreground">
                  Connect your LinkedIn Campaign Manager account to start tracking B2B campaigns
                </p>
              </div>
              <Button variant="accent" onClick={() => setConnectDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Connect Your First Account
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account selected - show data */}
      {hasAccounts && !selectedAccountId && (
        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Select an account to view metrics and campaigns</p>
          </CardContent>
        </Card>
      )}

      {selectedAccountId && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <KPICard
              label="Total Spend"
              value={fmt(metrics?.spend || 0)}
              format="currency"
            />
            <KPICard label="Impressions" value={fmtNum(metrics?.impressions || 0)} />
            <KPICard label="Clicks" value={fmtNum(metrics?.clicks || 0)} />
            <KPICard label="Leads" value={fmtNum(metrics?.leads || 0)} />
            <KPICard
              label="Cost per Lead"
              value={fmt(metrics?.cpl || 0)}
              format="currency"
            />
            <KPICard
              label="CTR"
              value={`${(metrics?.ctr || 0).toFixed(2)}%`}
            />
          </div>

          {/* Engagement metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">ROAS</span>
                </div>
                <p className="text-2xl font-light text-foreground">{(metrics?.roas || 0).toFixed(2)}×</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <MousePointerClick className="h-4 w-4 text-accent" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">CPC</span>
                </div>
                <p className="text-2xl font-light text-foreground">{fmt(metrics?.cpc || 0)}</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Handshake className="h-4 w-4 text-accent" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Reactions</span>
                </div>
                <p className="text-2xl font-light text-foreground">{fmtNum(metrics?.reactions || 0)}</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="h-4 w-4 text-accent" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Shares</span>
                </div>
                <p className="text-2xl font-light text-foreground">{fmtNum(metrics?.shares || 0)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns Table */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-light">Campaigns</CardTitle>
                  <CardDescription>Manage your LinkedIn advertising campaigns</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {campaignsLoading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-14 w-full" />
                  ))}
                </div>
              ) : !campaigns || campaigns.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No campaigns found for this account
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Objective</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Budget</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaigns.map((campaign) => (
                        <TableRow key={campaign.id} className="hover:bg-secondary/50">
                          <TableCell className="font-medium text-foreground">
                            {campaign.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {campaign.objective}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {campaign.campaign_type}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={campaign.status === "ACTIVE" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {campaign.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-sm text-foreground">
                            {campaign.daily_budget
                              ? `${fmt(Number(campaign.daily_budget))}/day`
                              : campaign.total_budget
                              ? fmt(Number(campaign.total_budget))
                              : "—"}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleStatus(campaign.id, campaign.status)}
                              disabled={updateCampaign.isPending}
                            >
                              {campaign.status === "ACTIVE" ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Creatives Gallery */}
          {creatives && creatives.length > 0 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl font-light">Ad Creatives</CardTitle>
                <CardDescription>LinkedIn Sponsored Content and Message Ads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {creatives.slice(0, 6).map((creative) => (
                    <Card key={creative.id} className="border-border overflow-hidden">
                      {creative.image_url && (
                        <div className="aspect-video bg-muted relative">
                          <img
                            src={creative.image_url}
                            alt={creative.headline || "Ad creative"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4 space-y-1">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{creative.creative_type}</Badge>
                          <Badge
                            variant={creative.status === "ACTIVE" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {creative.status}
                          </Badge>
                        </div>
                        <p className="font-medium text-sm text-foreground line-clamp-1">
                          {creative.headline || "Untitled"}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {creative.body || "No description"}
                        </p>
                        {creative.call_to_action && (
                          <p className="text-xs font-medium text-accent">{creative.call_to_action}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default LinkedInAdsTab;
