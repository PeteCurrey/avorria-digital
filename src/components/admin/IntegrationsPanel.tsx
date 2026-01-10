import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  type: string;
  isConnected: boolean;
  status: "active" | "inactive" | "error";
  lastSync?: string;
  configFields?: { key: string; label: string; placeholder: string; type?: string }[];
}

const IntegrationsPanel = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "google-analytics",
      name: "Google Analytics",
      description: "Track website traffic and user behavior",
      icon: BarChart3,
      type: "google_analytics",
      isConnected: false,
      status: "inactive",
      configFields: [
        { key: "propertyId", label: "Property ID", placeholder: "G-XXXXXXXXXX" },
      ],
    },
    {
      id: "google-search-console",
      name: "Google Search Console",
      description: "Monitor search performance and indexing",
      icon: Search,
      type: "google_search_console",
      isConnected: false,
      status: "inactive",
      configFields: [
        { key: "siteUrl", label: "Site URL", placeholder: "https://yoursite.com" },
      ],
    },
    {
      id: "dataforseo",
      name: "DataforSEO",
      description: "Get backlink data and SERP rankings",
      icon: Database,
      type: "dataforseo",
      isConnected: false,
      status: "inactive",
      configFields: [
        { key: "apiLogin", label: "API Login", placeholder: "your-login" },
        { key: "apiPassword", label: "API Password", placeholder: "your-password", type: "password" },
      ],
    },
    {
      id: "serpapi",
      name: "SerpAPI",
      description: "Real-time SERP position tracking",
      icon: Search,
      type: "serpapi",
      isConnected: false,
      status: "inactive",
      configFields: [
        { key: "apiKey", label: "API Key", placeholder: "your-api-key", type: "password" },
      ],
    },
    {
      id: "resend",
      name: "Resend",
      description: "Send transactional and marketing emails",
      icon: Mail,
      type: "resend",
      isConnected: false,
      status: "inactive",
      configFields: [
        { key: "apiKey", label: "API Key", placeholder: "re_xxxxxxxxx", type: "password" },
      ],
    },
  ]);

  const [configuring, setConfiguring] = useState<string | null>(null);
  const [configValues, setConfigValues] = useState<Record<string, Record<string, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

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
              return {
                ...integration,
                isConnected: dbIntegration.is_active,
                status: dbIntegration.is_active ? "active" : "inactive",
                lastSync: dbIntegration.last_sync_at,
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
    setIsSyncing(integration.id);
    try {
      // Call the appropriate edge function based on integration type
      let endpoint = "";
      switch (integration.type) {
        case "google_analytics":
          endpoint = "google-analytics";
          break;
        case "google_search_console":
          endpoint = "google-search-console";
          break;
        case "dataforseo":
          endpoint = "dataforseo";
          break;
        case "serpapi":
          endpoint = "serpapi";
          break;
        default:
          throw new Error("Unknown integration type");
      }

      const { error } = await supabase.functions.invoke(endpoint, {
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
        return "bg-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">
            Connect third-party services to enhance your analytics
          </p>
        </div>
        <Badge variant="outline" className="gap-1 w-fit">
          <Zap className="h-3 w-3" />
          {integrations.filter((i) => i.isConnected).length} connected
        </Badge>
      </div>

      {/* Integration Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((integration) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="relative overflow-hidden">
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
                    <Badge variant="default" className="gap-1">
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
                      </div>
                    ))}
                    <div className="flex gap-2">
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
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {integration.isConnected ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSync(integration)}
                        disabled={isSyncing === integration.id}
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
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <Card className="bg-secondary/30">
        <CardContent className="flex items-start gap-4 p-6">
          <AlertCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Need help setting up integrations?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Each integration requires API credentials from the respective service.
              Make sure you have the necessary permissions and API keys before connecting.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://developers.google.com/analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Google Analytics Docs
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://docs.dataforseo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  DataforSEO Docs
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
