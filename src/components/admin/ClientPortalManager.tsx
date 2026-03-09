import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClients } from "@/hooks/useClients";
import { useClientIntegrations, ALL_PLATFORMS, INTEGRATION_TYPES, useCreateClientIntegration, useUpdateClientIntegration, useDeleteClientIntegration, type ClientIntegration } from "@/hooks/useClientIntegrations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Settings, Plus, Trash2, RefreshCw, CheckCircle2, XCircle, AlertCircle,
  Search, BarChart3, Share2, Target, Sparkles, Shield, Eye, Plug, Wand2
} from "lucide-react";

const CATEGORY_META: Record<string, { label: string; icon: React.ElementType; description: string }> = {
  [INTEGRATION_TYPES.ANALYTICS]: { label: "Analytics", icon: BarChart3, description: "Track website performance and user behavior" },
  [INTEGRATION_TYPES.SOCIAL_MEDIA]: { label: "Social Media", icon: Share2, description: "Manage social accounts and publishing" },
  [INTEGRATION_TYPES.ADVERTISING]: { label: "Advertising", icon: Target, description: "Ad platform connections and budget tracking" },
  [INTEGRATION_TYPES.COMPETITOR]: { label: "Competitor Monitoring", icon: Search, description: "Track competitor activity and positioning" },
  [INTEGRATION_TYPES.CONTENT]: { label: "Content Automation", icon: Sparkles, description: "Automated content generation and scheduling" },
};

const ClientPortalManager = () => {
  const { data: clients, isLoading: clientsLoading } = useClients();
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>(INTEGRATION_TYPES.ANALYTICS);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardClientId, setWizardClientId] = useState("");

  const { data: integrations, isLoading: integrationsLoading } = useClientIntegrations(selectedClientId || undefined);
  const createIntegration = useCreateClientIntegration();
  const updateIntegration = useUpdateClientIntegration();
  const deleteIntegration = useDeleteClientIntegration();

  const filteredClients = clients?.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryPlatforms = ALL_PLATFORMS.filter(p => p.type === activeCategory);
  const connectedPlatforms = integrations?.map(i => i.platform) || [];

  const getIntegrationForPlatform = (platformKey: string): ClientIntegration | undefined =>
    integrations?.find(i => i.platform === platformKey);

  const handleAddIntegration = (platformKey: string, platformLabel: string, integrationType: string) => {
    if (!selectedClientId) return;
    createIntegration.mutate({
      client_id: selectedClientId,
      integration_type: integrationType,
      platform: platformKey,
      display_name: platformLabel,
    });
  };

  const handleToggleActive = (integration: ClientIntegration) => {
    updateIntegration.mutate({ id: integration.id, updates: { is_active: !integration.is_active } });
  };

  const handleRemoveIntegration = (id: string) => {
    if (confirm("Remove this integration?")) {
      deleteIntegration.mutate(id);
    }
  };

  const StatusIcon = ({ status }: { status: string | null }) => {
    switch (status) {
      case "synced": return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case "error": return <XCircle className="h-4 w-4 text-red-400" />;
      case "syncing": return <RefreshCw className="h-4 w-4 text-amber-400 animate-spin" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Onboarding wizard
  const renderWizard = () => (
    <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-accent" />
            Client Portal Setup Wizard
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {wizardStep === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Select a client to set up their portal and integrations.</p>
              <Select value={wizardClientId} onValueChange={setWizardClientId}>
                <SelectTrigger><SelectValue placeholder="Choose a client..." /></SelectTrigger>
                <SelectContent>
                  {clients?.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Select which integrations to enable for this client.</p>
              <div className="grid grid-cols-2 gap-3">
                {ALL_PLATFORMS.map(p => (
                  <label key={p.key} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card/50 cursor-pointer hover:border-accent/50 transition-colors">
                    <input type="checkbox" className="rounded" defaultChecked={["ga4", "gsc"].includes(p.key)} />
                    <span className="text-lg">{p.icon}</span>
                    <span className="text-sm font-medium">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {wizardStep === 2 && (
            <div className="space-y-4 text-center py-6">
              <CheckCircle2 className="h-12 w-12 mx-auto text-emerald-400" />
              <p className="text-lg font-medium">Portal Ready!</p>
              <p className="text-sm text-muted-foreground">The client portal has been configured. You can now manage integrations individually.</p>
            </div>
          )}
        </div>
        <DialogFooter>
          {wizardStep > 0 && wizardStep < 2 && (
            <Button variant="outline" onClick={() => setWizardStep(s => s - 1)}>Back</Button>
          )}
          {wizardStep < 2 ? (
            <Button
              onClick={() => {
                if (wizardStep === 0 && wizardClientId) {
                  setWizardStep(1);
                } else if (wizardStep === 1) {
                  setSelectedClientId(wizardClientId);
                  setWizardStep(2);
                }
              }}
              disabled={wizardStep === 0 && !wizardClientId}
            >
              {wizardStep === 0 ? "Next" : "Set Up Integrations"}
            </Button>
          ) : (
            <Button onClick={() => { setWizardOpen(false); setWizardStep(0); }}>Done</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {renderWizard()}

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border/50" onClick={() => setWizardOpen(true)}>
            <Wand2 className="h-4 w-4 mr-2" />
            Setup Wizard
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Client Selector */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              Client Portals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]" type="scroll">
              <div className="px-3 pb-3 space-y-1">
                {clientsLoading ? (
                  <p className="text-sm text-muted-foreground p-3">Loading...</p>
                ) : filteredClients?.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-3">No clients found</p>
                ) : (
                  filteredClients?.map(client => {
                    const isSelected = client.id === selectedClientId;
                    return (
                      <motion.button
                        key={client.id}
                        onClick={() => setSelectedClientId(client.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          isSelected
                            ? "bg-accent/15 text-accent border border-accent/30"
                            : "text-foreground hover:bg-muted/50 border border-transparent"
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">{client.name}</span>
                          <Badge variant="outline" className="text-[10px] capitalize shrink-0 ml-2">
                            {client.status}
                          </Badge>
                        </div>
                        {client.industry && (
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{client.industry}</p>
                        )}
                      </motion.button>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Integration Management */}
        {selectedClientId ? (
          <div className="space-y-4">
            {/* Category Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-card/50 border border-border/50 h-auto flex-wrap gap-1 p-1">
                {Object.entries(CATEGORY_META).map(([key, meta]) => {
                  const Icon = meta.icon;
                  const count = integrations?.filter(i => i.integration_type === key).length || 0;
                  return (
                    <TabsTrigger key={key} value={key} className="gap-2 data-[state=active]:bg-accent/15 data-[state=active]:text-accent">
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{meta.label}</span>
                      {count > 0 && (
                        <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">{count}</Badge>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.entries(CATEGORY_META).map(([catKey, catMeta]) => (
                <TabsContent key={catKey} value={catKey} className="mt-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">{catMeta.label}</h3>
                    <p className="text-sm text-muted-foreground">{catMeta.description}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {ALL_PLATFORMS.filter(p => p.type === catKey).map(platform => {
                      const integration = getIntegrationForPlatform(platform.key);
                      const isConnected = !!integration;

                      return (
                        <motion.div
                          key={platform.key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card className={`bg-card/50 border-border/50 backdrop-blur-sm transition-all duration-200 ${
                            isConnected ? "border-emerald-500/30" : "hover:border-accent/30"
                          }`}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{platform.icon}</span>
                                  <div>
                                    <p className="font-medium text-sm">{platform.label}</p>
                                    {isConnected && (
                                      <div className="flex items-center gap-1.5 mt-0.5">
                                        <StatusIcon status={integration.sync_status} />
                                        <span className="text-xs text-muted-foreground capitalize">
                                          {integration.sync_status || "idle"}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {isConnected && (
                                  <Switch
                                    checked={integration.is_active}
                                    onCheckedChange={() => handleToggleActive(integration)}
                                  />
                                )}
                              </div>

                              {isConnected ? (
                                <div className="space-y-2">
                                  {integration.last_synced_at && (
                                    <p className="text-xs text-muted-foreground">
                                      Last synced: {new Date(integration.last_synced_at).toLocaleDateString()}
                                    </p>
                                  )}
                                  {integration.error_message && (
                                    <p className="text-xs text-red-400 bg-red-500/10 rounded px-2 py-1">
                                      {integration.error_message}
                                    </p>
                                  )}
                                  <div className="flex gap-2 pt-1">
                                    <Button variant="outline" size="sm" className="h-7 text-xs flex-1">
                                      <Settings className="h-3 w-3 mr-1" />
                                      Configure
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-red-400 hover:text-red-300"
                                      onClick={() => handleRemoveIntegration(integration.id)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full h-8 text-xs mt-1"
                                  onClick={() => handleAddIntegration(platform.key, platform.label, catKey)}
                                  disabled={createIntegration.isPending}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Connect
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Portal Config Overview */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4 text-accent" />
                  Portal Configuration
                </CardTitle>
                <CardDescription>Control what this client sees in their portal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Analytics Dashboard", description: "Show GA4 and GSC data", defaultOn: true },
                    { label: "SEO Intelligence", description: "Keyword rankings and opportunities", defaultOn: true },
                    { label: "Content Calendar", description: "Shared content planning", defaultOn: false },
                    { label: "Competitor Reports", description: "Automated competitor analysis", defaultOn: false },
                    { label: "Ad Performance", description: "Google/Meta/LinkedIn Ads metrics", defaultOn: false },
                    { label: "Invoice Access", description: "View and download invoices", defaultOn: true },
                  ].map(feature => (
                    <div key={feature.label} className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-background/30">
                      <div>
                        <p className="text-sm font-medium">{feature.label}</p>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                      <Switch defaultChecked={feature.defaultOn} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-3">
              <Plug className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="text-muted-foreground">Select a client to manage their portal and integrations</p>
              <Button variant="outline" onClick={() => setWizardOpen(true)}>
                <Wand2 className="h-4 w-4 mr-2" />
                Launch Setup Wizard
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ClientPortalManager;
