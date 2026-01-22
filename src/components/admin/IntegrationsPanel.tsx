import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Zap,
  Search,
  BarChart3,
  Link as LinkIcon,
  Check,
  X,
  RefreshCw,
  ExternalLink,
  Settings,
  Shield,
  Database,
  Mail,
  Loader2,
  AlertCircle,
  Globe,
  Key,
  TestTube,
  FileJson,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  type: string;
  category: "google" | "seo" | "email" | "webhooks";
  isConnected: boolean;
  status: "active" | "inactive" | "error";
  lastSync?: string;
  configFields: { key: string; label: string; placeholder: string; type?: string; multiline?: boolean }[];
  testEndpoint?: string;
  helpUrl?: string;
}

const IntegrationsPanel = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "google-analytics",
      name: "Google Analytics",
      description: "Track website traffic and user behavior with GA4",
      icon: BarChart3,
      type: "google_analytics",
      category: "google",
      isConnected: false,
      status: "inactive",
      configFields: [
        { key: "propertyId", label: "Property ID", placeholder: "G-XXXXXXXXXX or 123456789" },
        { key: "serviceAccountJson", label: "Service Account JSON", placeholder: "Paste your service account JSON here...", type: "password", multiline: true },
      ],
      testEndpoint: "google-analytics",
      helpUrl: "https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries",
    },
    {
      id: "google-search-console",
      name: "Google Search Console",
      description: "Monitor search performance and indexing status",
      icon: Search,
      type: "google_search_console",
      category: "google",
      isConnected: false,
      status: "inactive",
      configFields: [
        { key: "siteUrl", label: "Site URL", placeholder: "https://yoursite.com or sc-domain:yoursite.com" },
        { key: "serviceAccountJson", label: "Service Account JSON", placeholder: "Paste your service account JSON here...", type: "password", multiline: true },
      ],
      testEndpoint: "google-search-console",
      helpUrl: "https://developers.google.com/webmaster-tools/v1/how-tos/authorizing",
    },
    {
      id: "dataforseo",
      name: "DataforSEO",
      description: "Get backlink data, SERP rankings, and keyword research",
      icon: Database,
      type: "dataforseo",
      category: "seo",
      isConnected: false,
      status: "inactive",
      configFields: [
        { key: "apiLogin", label: "API Login", placeholder: "your-login" },
        { key: "apiPassword", label: "API Password", placeholder: "your-password", type: "password" },
      ],
      testEndpoint: "dataforseo",
      helpUrl: "https://docs.dataforseo.com/v3/auth/",
    },
    {
      id: "serpapi",
      name: "SerpAPI",
      description: "Real-time SERP position tracking and search results",
      icon: Search,
      type: "serpapi",
      category: "seo",
      isConnected: false,
      status: "inactive",
      configFields: [
        { key: "apiKey", label: "API Key", placeholder: "your-api-key", type: "password" },
      ],
      testEndpoint: "serpapi",
      helpUrl: "https://serpapi.com/manage-api-key",
    },
    {
      id: "resend",
      name: "Resend",
      description: "Send transactional and marketing emails",
      icon: Mail,
      type: "resend",
      category: "email",
      isConnected: false,
      status: "inactive",
      configFields: [
        { key: "apiKey", label: "API Key", placeholder: "re_xxxxxxxxx", type: "password" },
        { key: "fromEmail", label: "From Email", placeholder: "hello@yourdomain.com" },
      ],
      helpUrl: "https://resend.com/docs/api-reference/introduction",
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>("google");
  const [configuring, setConfiguring] = useState<string | null>(null);
  const [configValues, setConfigValues] = useState<Record<string, Record<string, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({});

  useEffect(() => {
    fetchIntegrationStatus();
  }, []);

  const fetchIntegrationStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("seo_integrations")
        .select("*");

      if (error) throw error;

      if (data) {
        setIntegrations((prev) =>
          prev.map((integration) => {
            const dbIntegration = data.find((d) => d.integration_type === integration.type);
            if (dbIntegration) {
              // Pre-populate config values
              if (dbIntegration.config) {
                setConfigValues((prevConfig) => ({
                  ...prevConfig,
                  [integration.id]: dbIntegration.config as Record<string, string>,
                }));
              }
              return {
                ...integration,
                isConnected: dbIntegration.is_active || false,
                status: dbIntegration.is_active ? "active" : "inactive",
                lastSync: dbIntegration.last_sync_at || undefined,
              };
            }
            return integration;
          })
        );
      }
    } catch (error) {
      console.error("Error fetching integrations:", error);
    }
  };

  const handleConfigure = (integrationId: string) => {
    setConfiguring(configuring === integrationId ? null : integrationId);
    setTestResults((prev) => ({ ...prev, [integrationId]: undefined as any }));
  };

  const handleTestConnection = async (integration: Integration) => {
    if (!integration.testEndpoint) return;

    setIsTesting(integration.id);
    setTestResults((prev) => ({ ...prev, [integration.id]: undefined as any }));

    try {
      const { data, error } = await supabase.functions.invoke(integration.testEndpoint, {
        body: { action: "test" },
      });

      if (error) throw error;

      setTestResults((prev) => ({
        ...prev,
        [integration.id]: {
          success: true,
          message: data.message || "Connection successful!",
        },
      }));
      toast.success("Connection test passed!");
    } catch (error: any) {
      setTestResults((prev) => ({
        ...prev,
        [integration.id]: {
          success: false,
          message: error.message || "Connection failed",
        },
      }));
      toast.error("Connection test failed");
    } finally {
      setIsTesting(null);
    }
  };

  const handleSaveConfig = async (integration: Integration) => {
    const config = configValues[integration.id] || {};
    
    // Validate required fields
    const hasAllFields = integration.configFields?.every(
      (field) => config[field.key]?.trim()
    );

    if (!hasAllFields) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const { data: existing } = await supabase
        .from("seo_integrations")
        .select("id")
        .eq("integration_type", integration.type)
        .single();

      if (existing) {
        await supabase
          .from("seo_integrations")
          .update({
            is_active: true,
            config: config,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
      } else {
        await supabase.from("seo_integrations").insert({
          integration_type: integration.type,
          is_active: true,
          config: config,
        });
      }

      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === integration.id
            ? { ...i, isConnected: true, status: "active" }
            : i
        )
      );
      setConfiguring(null);
      toast.success(`${integration.name} connected successfully`);
    } catch (error: any) {
      console.error("Error saving integration:", error);
      toast.error("Failed to save integration");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDisconnect = async (integration: Integration) => {
    try {
      await supabase
        .from("seo_integrations")
        .update({ is_active: false })
        .eq("integration_type", integration.type);

      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === integration.id
            ? { ...i, isConnected: false, status: "inactive" }
            : i
        )
      );
      toast.success(`${integration.name} disconnected`);
    } catch (error: any) {
      console.error("Error disconnecting:", error);
      toast.error("Failed to disconnect integration");
    }
  };

  const handleSync = async (integration: Integration) => {
    if (!integration.testEndpoint) return;
    
    setIsSyncing(integration.id);
    try {
      const { error } = await supabase.functions.invoke(integration.testEndpoint, {
        body: { action: "sync" },
      });

      if (error) throw error;

      // Update last sync time
      await supabase
        .from("seo_integrations")
        .update({ last_sync_at: new Date().toISOString() })
        .eq("integration_type", integration.type);

      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === integration.id
            ? { ...i, lastSync: new Date().toISOString() }
            : i
        )
      );
      toast.success(`${integration.name} synced successfully`);
    } catch (error: any) {
      console.error("Error syncing:", error);
      toast.error(`Failed to sync ${integration.name}`);
    } finally {
      setIsSyncing(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-muted";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "google":
        return Globe;
      case "seo":
        return Search;
      case "email":
        return Mail;
      case "webhooks":
        return Zap;
      default:
        return Settings;
    }
  };

  const filteredIntegrations = integrations.filter(
    (i) => i.category === activeCategory
  );

  const connectedCount = integrations.filter((i) => i.isConnected).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">
            Connect your tools to power advanced analytics and automation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Zap className="h-3 w-3" />
            {connectedCount} of {integrations.length} connected
          </Badge>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="google" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Google</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">SEO APIs</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Webhooks</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          {activeCategory === "webhooks" ? (
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>
                  Set up webhooks to receive real-time notifications and trigger automations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Zap className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Webhook configuration coming soon</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Configure incoming and outgoing webhooks for advanced automation
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredIntegrations.map((integration) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="relative overflow-hidden h-full">
                    {/* Status Indicator */}
                    <div
                      className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(
                        integration.status
                      )}`}
                    />

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                            <integration.icon className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <CardDescription className="text-sm">
                              {integration.description}
                            </CardDescription>
                          </div>
                        </div>
                        {integration.isConnected ? (
                          <Badge variant="default" className="gap-1 bg-green-600">
                            <Check className="h-3 w-3" />
                            Connected
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <X className="h-3 w-3" />
                            Not connected
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {integration.lastSync && (
                        <p className="text-xs text-muted-foreground">
                          Last synced: {new Date(integration.lastSync).toLocaleString()}
                        </p>
                      )}

                      {/* Configuration Panel */}
                      {configuring === integration.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-4 pt-4 border-t"
                        >
                          {integration.configFields?.map((field) => (
                            <div key={field.key} className="space-y-2">
                              <Label htmlFor={`${integration.id}-${field.key}`}>
                                {field.label}
                              </Label>
                              {field.multiline ? (
                                <Textarea
                                  id={`${integration.id}-${field.key}`}
                                  placeholder={field.placeholder}
                                  value={configValues[integration.id]?.[field.key] || ""}
                                  onChange={(e) =>
                                    setConfigValues((prev) => ({
                                      ...prev,
                                      [integration.id]: {
                                        ...prev[integration.id],
                                        [field.key]: e.target.value,
                                      },
                                    }))
                                  }
                                  className="min-h-[100px] font-mono text-xs"
                                />
                              ) : (
                                <Input
                                  id={`${integration.id}-${field.key}`}
                                  type={field.type || "text"}
                                  placeholder={field.placeholder}
                                  value={configValues[integration.id]?.[field.key] || ""}
                                  onChange={(e) =>
                                    setConfigValues((prev) => ({
                                      ...prev,
                                      [integration.id]: {
                                        ...prev[integration.id],
                                        [field.key]: e.target.value,
                                      },
                                    }))
                                  }
                                />
                              )}
                            </div>
                          ))}

                          {/* Test Result */}
                          {testResults[integration.id] && (
                            <div
                              className={`flex items-center gap-2 p-3 rounded-lg ${
                                testResults[integration.id].success
                                  ? "bg-green-500/10 text-green-600"
                                  : "bg-red-500/10 text-red-600"
                              }`}
                            >
                              {testResults[integration.id].success ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <XCircle className="h-4 w-4" />
                              )}
                              <span className="text-sm">{testResults[integration.id].message}</span>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {integration.testEndpoint && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleTestConnection(integration)}
                                disabled={isTesting === integration.id}
                              >
                                {isTesting === integration.id ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <TestTube className="mr-2 h-4 w-4" />
                                )}
                                Test Connection
                              </Button>
                            )}
                            <Button
                              onClick={() => handleSaveConfig(integration)}
                              disabled={isSaving}
                              size="sm"
                            >
                              {isSaving ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="mr-2 h-4 w-4" />
                              )}
                              Save
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setConfiguring(null)}
                            >
                              Cancel
                            </Button>
                          </div>

                          {integration.helpUrl && (
                            <p className="text-xs text-muted-foreground">
                              Need help?{" "}
                              <a
                                href={integration.helpUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline inline-flex items-center gap-1"
                              >
                                View documentation
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </p>
                          )}
                        </motion.div>
                      )}

                      {/* Actions */}
                      {configuring !== integration.id && (
                        <div className="flex flex-wrap gap-2">
                          {integration.isConnected ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSync(integration)}
                                disabled={isSyncing === integration.id || !integration.testEndpoint}
                              >
                                {isSyncing === integration.id ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                )}
                                Sync Now
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleConfigure(integration.id)}
                              >
                                <Settings className="mr-2 h-4 w-4" />
                                Configure
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDisconnect(integration)}
                              >
                                Disconnect
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleConfigure(integration.id)}
                            >
                              <LinkIcon className="mr-2 h-4 w-4" />
                              Connect
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <Card className="bg-secondary/30">
        <CardContent className="flex items-start gap-4 p-6">
          <AlertCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Setting Up Google Integrations</h3>
            <p className="text-sm text-muted-foreground mb-3">
              To connect Google Analytics and Search Console, you'll need to create a service account 
              in Google Cloud Console and download the JSON key file. Make sure to grant the service 
              account access to your GA4 property and GSC site.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://console.cloud.google.com/iam-admin/serviceaccounts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Google Cloud Console
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://docs.dataforseo.com/v3/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  DataforSEO Docs
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://resend.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Resend Docs
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsPanel;
