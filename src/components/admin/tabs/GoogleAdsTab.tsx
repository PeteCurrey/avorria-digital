'use client';
import Link from "next/link";
import { useState } from "react";
import KPICard from "@/components/dashboard/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGoogleAdsAccounts,
  useGoogleAdsCampaigns,
  useAggregatedMetrics,
  useGoogleAdsAlerts,
  useResolveGoogleAdsAlert,
  useUpdateGoogleAdsCampaign,
} from "@/hooks/useGoogleAds";
import { Loader2, AlertTriangle, Play, Pause, ExternalLink } from "lucide-react";

const GoogleAdsTab = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  const { data: accounts, isLoading: accountsLoading } = useGoogleAdsAccounts();
  const { data: campaigns, isLoading: campaignsLoading } = useGoogleAdsCampaigns(selectedAccountId);
  const { data: metrics, isLoading: metricsLoading } = useAggregatedMetrics(selectedAccountId);
  const { data: alerts } = useGoogleAdsAlerts();

  const resolveAlert = useResolveGoogleAdsAlert();
  const updateCampaign = useUpdateGoogleAdsCampaign();

  const handleCampaignStatusToggle = (campaignId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ENABLED" ? "PAUSED" : "ENABLED";
    updateCampaign.mutate({ id: campaignId, updates: { status: newStatus } });
  };

  if (accountsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-light text-foreground mb-1">Google Ads Management</h2>
          <p className="text-sm text-muted-foreground">
            Connect your Google Ads account to start managing campaigns
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-6">No Google Ads accounts connected</p>
            <Button variant="accent">Connect Google Ads Account</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-foreground mb-1">Google Ads Management</h2>
          <p className="text-sm text-muted-foreground">Campaign performance and optimization</p>
        </div>

        <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select account..." />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.name} ({account.customer_id})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Alerts Section */}
      {alerts && alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.slice(0, 3).map((alert) => (
            <Alert key={alert.id} variant={alert.severity === "critical" ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{alert.message}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => resolveAlert.mutate(alert.id)}
                  disabled={resolveAlert.isPending}
                >
                  Resolve
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {!selectedAccountId ? (
        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Select an account to view metrics</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* KPI Cards */}
          {metricsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <KPICard
                label="Total Spend"
                value={`Â£${metrics?.spend.toLocaleString() || "0"}`}
                format="currency"
              />
              <KPICard label="Impressions" value={metrics?.impressions || 0} />
              <KPICard label="Clicks" value={metrics?.clicks || 0} />
              <KPICard label="Conversions" value={metrics?.conversions || 0} />
              <KPICard
                label="Cost per Lead"
                value={`Â£${metrics?.cpl.toFixed(2) || "0"}`}
                format="currency"
              />
              <KPICard label="ROAS" value={`${metrics?.roas.toFixed(1) || "0"}x`} />
            </div>
          )}

          {/* Campaigns Table */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl font-light">Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              {campaignsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
              ) : !campaigns || campaigns.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No campaigns found for this account
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                          Campaign
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">
                          Type
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">
                          Status
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                          Budget
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">
                          Bidding
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr
                          key={campaign.id}
                          className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">
                                {campaign.name}
                              </span>
                              <ExternalLink className="h-3 w-3 text-muted-foreground" />
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground text-center">
                            {campaign.campaign_type}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge
                              variant={
                                campaign.status === "ENABLED"
                                  ? "default"
                                  : campaign.status === "PAUSED"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="text-xs"
                            >
                              {campaign.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-foreground text-right">
                            {campaign.budget_amount
                              ? `Â£${Number(campaign.budget_amount).toLocaleString()}`
                              : "â€”"}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground text-center">
                            {campaign.bidding_strategy || "â€”"}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleCampaignStatusToggle(campaign.id, campaign.status)
                              }
                              disabled={updateCampaign.isPending}
                            >
                              {campaign.status === "ENABLED" ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default GoogleAdsTab;


