'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  RefreshCw,
  Play,
  Pause,
  TrendingUp,
  TrendingDown,
  Image as ImageIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  useMetaAdsAccounts,
  useMetaAdsCampaigns,
  useMetaAdsAggregatedMetrics,
  useMetaAdsCreatives,
  useCreateMetaAdsAccount,
  useUpdateMetaCampaign,
} from "@/hooks/useMetaAds";

const MetaAdsTab = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>();
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [newAccountData, setNewAccountData] = useState({
    account_id: "",
    name: "",
  });

  const { data: accounts, isLoading: accountsLoading } = useMetaAdsAccounts();
  const { data: campaigns, isLoading: campaignsLoading } = useMetaAdsCampaigns(selectedAccountId);
  const { data: creatives } = useMetaAdsCreatives(selectedAccountId);
  const metrics = useMetaAdsAggregatedMetrics(selectedAccountId);
  const createAccount = useCreateMetaAdsAccount();
  const updateCampaign = useUpdateMetaCampaign();

  const handleConnectAccount = async () => {
    if (!newAccountData.account_id || !newAccountData.name) {
      toast.error("Please fill in all required fields");
      return;
    }

    await createAccount.mutateAsync({
      account_id: newAccountData.account_id,
      name: newAccountData.name,
      account_status: "active",
      currency: "GBP",
      timezone: "Europe/London",
      is_active: true,
      access_token: null,
      token_expires_at: null,
      last_synced_at: null,
    });

    setConnectDialogOpen(false);
    setNewAccountData({ account_id: "", name: "" });
  };

  const handleToggleCampaignStatus = async (campaignId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "PAUSED" : "ACTIVE";
    await updateCampaign.mutateAsync({ campaignId, status: newStatus });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-GB").format(Math.round(value));
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Meta Ads Management</h2>
          <p className="text-muted-foreground">
            Manage Instagram and Facebook advertising campaigns
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Connect Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect Meta Ads Account</DialogTitle>
                <DialogDescription>
                  Enter your Meta Ads account details to connect
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="account-id">Account ID *</Label>
                  <Input
                    id="account-id"
                    placeholder="act_123456789"
                    value={newAccountData.account_id}
                    onChange={(e) =>
                      setNewAccountData({ ...newAccountData, account_id: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-name">Account Name *</Label>
                  <Input
                    id="account-name"
                    placeholder="My Company Ad Account"
                    value={newAccountData.name}
                    onChange={(e) =>
                      setNewAccountData({ ...newAccountData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setConnectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConnectAccount} disabled={createAccount.isPending}>
                  {createAccount.isPending ? "Connecting..." : "Connect"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Account Selector */}
      {accounts && accounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an ad account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} ({account.account_id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {selectedAccountId && (
        <>
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(metrics?.spend || 0)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impressions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(metrics?.impressions || 0)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(metrics?.clicks || 0)}</div>
                <p className="text-xs text-muted-foreground">
                  CTR: {formatPercentage(metrics?.ctr || 0)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ROAS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.roas?.toFixed(2) || "0.00"}Ã—</div>
                <p className="text-xs text-muted-foreground">
                  Revenue: {formatCurrency(metrics?.conversionValue || 0)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(metrics?.reach || 0)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(metrics?.conversions || 0)}</div>
                <p className="text-xs text-muted-foreground">
                  CPA: {formatCurrency(metrics?.cpa || 0)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaigns</CardTitle>
                  <CardDescription>Manage your Meta advertising campaigns</CardDescription>
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
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : campaigns && campaigns.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Objective</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{campaign.objective}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={campaign.status === "ACTIVE" ? "default" : "secondary"}
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {campaign.daily_budget
                            ? formatCurrency(Number(campaign.daily_budget)) + "/day"
                            : campaign.lifetime_budget
                            ? formatCurrency(Number(campaign.lifetime_budget)) + " lifetime"
                            : "â€”"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleToggleCampaignStatus(campaign.id, campaign.status)
                            }
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
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No campaigns found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Creatives Gallery */}
          {creatives && creatives.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Ad Creatives</CardTitle>
                <CardDescription>Preview your ad creatives and assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {creatives.slice(0, 6).map((creative) => (
                    <Card key={creative.id} className="overflow-hidden">
                      {creative.image_url && (
                        <div className="aspect-video bg-muted relative">
                          <img
                            src={creative.image_url}
                            alt={creative.title || "Ad creative"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {creative.title || "Untitled"}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {creative.body || "No description"}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {!selectedAccountId && accounts && accounts.length > 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Select an account to view campaigns</p>
            </div>
          </CardContent>
        </Card>
      )}

      {(!accounts || accounts.length === 0) && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                No Meta Ads accounts connected
              </p>
              <Button onClick={() => setConnectDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Connect Your First Account
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MetaAdsTab;


