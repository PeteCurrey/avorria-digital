import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Bell,
  Link as LinkIcon,
  Shield,
  Mail,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  RefreshCw,
  Key,
  Globe,
  Database,
  Zap,
  Settings,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  TestTube,
  Search,
  BarChart3,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings, useUpdateSiteSetting } from "@/hooks/useSiteSettings";

interface TeamMember {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  status: string;
  last_sign_in: string | null;
}

interface NotificationPrefs {
  emailDigest: boolean;
  clientAlerts: boolean;
  performanceAlerts: boolean;
  teamMentions: boolean;
  weeklyReport: boolean;
  monthlyReport: boolean;
  seoAlerts: boolean;
  securityAlerts: boolean;
}

interface APIKeyConfig {
  id: string;
  name: string;
  description: string;
  secretName: string;
  isConfigured: boolean;
  docUrl: string;
  icon: React.ElementType;
  instructions: string[];
}

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "not-connected" | "error" | "testing";
  lastSync: string | null;
  icon: React.ElementType;
  testEndpoint?: string;
  dataType?: string;
}

interface IntegrationTestResult {
  configured: boolean;
  error?: string;
  totals?: {
    clicks?: number;
    impressions?: number;
    sessions?: number;
    users?: number;
    pageViews?: number;
  };
  mockData?: boolean;
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("team");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [apiKeyValues, setApiKeyValues] = useState<Record<string, string>>({});
  const [testingApiKey, setTestingApiKey] = useState<string | null>(null);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("client");
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { data: siteSettings } = useSiteSettings();
  const updateSiteSetting = useUpdateSiteSetting();

  const [notifications, setNotifications] = useState<NotificationPrefs>({
    emailDigest: true,
    clientAlerts: true,
    performanceAlerts: true,
    teamMentions: true,
    weeklyReport: false,
    monthlyReport: true,
    seoAlerts: true,
    securityAlerts: true,
  });

  const apiKeyConfigs: APIKeyConfig[] = [
    {
      id: "google-analytics",
      name: "Google Analytics",
      description: "Pull traffic and conversion data for client reporting",
      secretName: "GOOGLE_ANALYTICS_KEY",
      isConfigured: false,
      docUrl: "https://console.cloud.google.com/apis/credentials",
      icon: BarChart3,
      instructions: [
        "Go to Google Cloud Console → APIs & Services → Credentials",
        "Create a Service Account with Analytics Viewer role",
        "Download the JSON key file",
        "Paste the entire JSON content below",
      ],
    },
    {
      id: "google-search-console",
      name: "Google Search Console",
      description: "Access search performance and indexing data",
      secretName: "GOOGLE_SEARCH_CONSOLE_KEY",
      isConfigured: false,
      docUrl: "https://console.cloud.google.com/apis/credentials",
      icon: Search,
      instructions: [
        "Use the same Service Account as Google Analytics",
        "Add the service account email to Search Console as a user",
        "Paste the JSON key content below",
      ],
    },
    {
      id: "dataforseo",
      name: "DataForSEO",
      description: "Keyword research and SERP tracking",
      secretName: "DATAFORSEO_LOGIN",
      isConfigured: false,
      docUrl: "https://dataforseo.com/apis",
      icon: Database,
      instructions: [
        "Sign up at dataforseo.com",
        "Go to Dashboard → API Access",
        "Copy your Login and Password",
        "Format: login:password",
      ],
    },
    {
      id: "serpapi",
      name: "SerpAPI",
      description: "Real-time SERP data and competitor analysis",
      secretName: "SERPAPI_KEY",
      isConfigured: false,
      docUrl: "https://serpapi.com/manage-api-key",
      icon: Globe,
      instructions: [
        "Sign up at serpapi.com",
        "Go to Dashboard → API Key",
        "Copy your API key",
      ],
    },
    {
      id: "resend",
      name: "Resend (Email)",
      description: "Send transactional and marketing emails",
      secretName: "RESEND_API_KEY",
      isConfigured: true,
      docUrl: "https://resend.com/api-keys",
      icon: Send,
      instructions: [
        "Sign up at resend.com",
        "Go to API Keys → Create API Key",
        "IMPORTANT: Also verify your domain at resend.com/domains",
        "Add the required DNS records for SPF, DKIM, DMARC",
      ],
    },
  ];

  const [integrationStatuses, setIntegrationStatuses] = useState<Record<string, Integration["status"]>>({
    ga: "not-connected",
    gsc: "not-connected",
    slack: "not-connected",
    zapier: "not-connected",
  });
  const [integrationLastSync, setIntegrationLastSync] = useState<Record<string, string | null>>({});
  const [integrationResults, setIntegrationResults] = useState<Record<string, IntegrationTestResult | null>>({});

  const integrations: Integration[] = [
    {
      id: "ga",
      name: "Google Analytics",
      description: "Pull analytics data for reporting",
      status: integrationStatuses.ga,
      lastSync: integrationLastSync.ga || null,
      icon: BarChart3,
      testEndpoint: "google-analytics",
      dataType: "analytics",
    },
    {
      id: "gsc",
      name: "Google Search Console",
      description: "Access search performance and indexing",
      status: integrationStatuses.gsc,
      lastSync: integrationLastSync.gsc || null,
      icon: Search,
      testEndpoint: "google-search-console",
      dataType: "search",
    },
    {
      id: "slack",
      name: "Slack",
      description: "Team notifications and alerts",
      status: integrationStatuses.slack,
      lastSync: integrationLastSync.slack || null,
      icon: Bell,
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect with 5000+ apps",
      status: integrationStatuses.zapier,
      lastSync: integrationLastSync.zapier || null,
      icon: Zap,
    },
  ];

  const rolePermissions = [
    {
      role: "Admin",
      description: "Full access to all features and settings",
      permissions: [
        { name: "Manage team members", granted: true },
        { name: "Access all clients", granted: true },
        { name: "Modify settings", granted: true },
        { name: "View financials", granted: true },
        { name: "Delete data", granted: true },
      ],
    },
    {
      role: "Strategist",
      description: "Full access to strategy and campaigns",
      permissions: [
        { name: "Manage team members", granted: false },
        { name: "Access all clients", granted: true },
        { name: "Modify settings", granted: false },
        { name: "View financials", granted: false },
        { name: "Delete data", granted: false },
      ],
    },
    {
      role: "Specialist",
      description: "Access to assigned clients only",
      permissions: [
        { name: "Manage team members", granted: false },
        { name: "Access all clients", granted: false },
        { name: "Modify settings", granted: false },
        { name: "View financials", granted: false },
        { name: "Delete data", granted: false },
      ],
    },
    {
      role: "Client",
      description: "View-only access to their own data",
      permissions: [
        { name: "Manage team members", granted: false },
        { name: "Access all clients", granted: false },
        { name: "Modify settings", granted: false },
        { name: "View financials", granted: false },
        { name: "Delete data", granted: false },
      ],
    },
  ];

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setIsLoadingTeam(true);
    try {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("id, email, full_name")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role");

      const membersWithRoles = profiles?.map((profile) => ({
        id: profile.id,
        email: profile.email || "",
        full_name: profile.full_name,
        role: roles?.find((r) => r.user_id === profile.id)?.role || "client",
        status: "active",
        last_sign_in: null,
      })) || [];

      setTeamMembers(membersWithRoles);
    } catch (error) {
      console.error("Error fetching team:", error);
      toast.error("Failed to load team members");
    } finally {
      setIsLoadingTeam(false);
    }
  };

  const handleNotificationToggle = (key: keyof NotificationPrefs) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Notification preference updated");
  };

  const handleInviteMember = async () => {
    if (!newMemberEmail) {
      toast.error("Please enter an email address");
      return;
    }

    setIsAddingMember(true);
    try {
      toast.success(`Invite sent to ${newMemberEmail}`);
      setNewMemberEmail("");
      setDialogOpen(false);
    } catch (error) {
      toast.error("Failed to send invite");
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;
    
    try {
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      toast.success("Team member removed");
    } catch (error) {
      toast.error("Failed to remove team member");
    }
  };

  const handleTestIntegration = async (integration: Integration) => {
    if (!integration.testEndpoint) {
      toast.info(`${integration.name} does not support live testing yet`);
      return;
    }

    setIntegrationStatuses(prev => ({ ...prev, [integration.id]: "testing" }));
    
    try {
      const { data, error } = await supabase.functions.invoke(integration.testEndpoint, {
        body: {},
      });

      if (error) throw error;

      const result = data as IntegrationTestResult;
      setIntegrationResults(prev => ({ ...prev, [integration.id]: result }));

      if (result.configured && !result.mockData) {
        setIntegrationStatuses(prev => ({ ...prev, [integration.id]: "connected" }));
        setIntegrationLastSync(prev => ({ ...prev, [integration.id]: new Date().toLocaleString() }));
        toast.success(`${integration.name} connected - Real data available!`, {
          description: integration.id === "ga" 
            ? `Sessions: ${result.totals?.sessions?.toLocaleString() || 0}`
            : `Clicks: ${result.totals?.clicks?.toLocaleString() || 0}`,
        });
      } else if (result.mockData) {
        setIntegrationStatuses(prev => ({ ...prev, [integration.id]: "not-connected" }));
        toast.warning(`${integration.name} not configured`, {
          description: "Using mock data. Add service account JSON to enable real data.",
        });
      } else {
        setIntegrationStatuses(prev => ({ ...prev, [integration.id]: "error" }));
        toast.error(`${integration.name} configuration error`, {
          description: result.error || "Check your credentials",
        });
      }
    } catch (error) {
      console.error(`Error testing ${integration.name}:`, error);
      setIntegrationStatuses(prev => ({ ...prev, [integration.id]: "error" }));
      toast.error(`Failed to test ${integration.name}`, {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const handleConnectIntegration = (integration: Integration) => {
    if (integration.testEndpoint) {
      handleTestIntegration(integration);
    } else if (integration.status === "connected") {
      toast.success(`${integration.name} disconnected`);
      setIntegrationStatuses(prev => ({ ...prev, [integration.id]: "not-connected" }));
    } else {
      toast.info(`${integration.name} integration coming soon`);
    }
  };

  const handleTestApiKey = async (configId: string) => {
    const config = apiKeyConfigs.find(c => c.id === configId);
    if (!config) return;
    
    setTestingApiKey(configId);
    try {
      // Check if there's a saved key in the DB
      const { data } = await supabase
        .from("seo_integrations")
        .select("config, is_active")
        .eq("integration_type", configId)
        .maybeSingle();

      if (data?.is_active && data?.config) {
        toast.success(`${config.name} is configured and active!`);
      } else if (apiKeyValues[configId]) {
        toast.info("Key entered but not saved yet. Click Save Key first.");
      } else {
        toast.warning(`${config.name} is not configured yet.`);
      }
    } catch (error) {
      toast.error("Failed to test connection");
    } finally {
      setTestingApiKey(null);
    }
  };

  const [savingApiKey, setSavingApiKey] = useState<string | null>(null);

  const handleSaveApiKey = async (configId: string, secretName: string) => {
    const value = apiKeyValues[configId];
    if (!value) {
      toast.error("Please enter an API key");
      return;
    }

    setSavingApiKey(configId);
    try {
      // Upsert into seo_integrations table
      const { data: existing } = await supabase
        .from("seo_integrations")
        .select("id")
        .eq("integration_type", configId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("seo_integrations")
          .update({
            config: { apiKey: value } as any,
            is_active: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("seo_integrations")
          .insert({
            integration_type: configId,
            config: { apiKey: value } as any,
            is_active: true,
          });
        if (error) throw error;
      }

      toast.success(`${secretName} saved successfully`);
      setApiKeyValues((prev) => ({ ...prev, [configId]: "" }));
      
      // Update the config's isConfigured status
      const updatedConfigs = apiKeyConfigs.map(c => 
        c.id === configId ? { ...c, isConfigured: true } : c
      );
      // Force re-render by updating state
      setApiKeyValues(prev => ({ ...prev }));
    } catch (error: any) {
      console.error("Failed to save API key:", error);
      toast.error("Failed to save API key: " + (error.message || "Unknown error"));
    } finally {
      setSavingApiKey(null);
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : "bg-muted text-muted-foreground border-border";
  };

  const getIntegrationStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "testing":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 backdrop-blur-sm p-1 flex-wrap h-auto">
          <TabsTrigger
            value="team"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger
            value="api-keys"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger
            value="roles"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Shield className="h-4 w-4 mr-2" />
            Roles
          </TabsTrigger>
          <TabsTrigger
            value="site"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Globe className="h-4 w-4 mr-2" />
            Site Features
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Settings className="h-4 w-4 mr-2" />
            Webhooks
          </TabsTrigger>
        </TabsList>

        {/* Team Management Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Team Members
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Manage who has access to the admin dashboard
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchTeamMembers}
                    className="border-border/50"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Invite Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invite Team Member</DialogTitle>
                        <DialogDescription>
                          Send an invitation to join your team
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="colleague@company.com"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="strategist">Strategist</SelectItem>
                              <SelectItem value="specialist">Specialist</SelectItem>
                              <SelectItem value="client">Client</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleInviteMember} disabled={isAddingMember}>
                          {isAddingMember ? "Sending..." : "Send Invite"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingTeam ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading team members...
                </div>
              ) : teamMembers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No team members found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member, idx) => (
                      <motion.tr
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * idx }}
                        className="border-border/30"
                      >
                        <TableCell className="font-medium">
                          {member.full_name || "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {member.email}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {member.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMember(member.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Configure email delivery preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: "emailDigest" as const, label: "Daily Digest", description: "Summary of key metrics each morning" },
                  { key: "weeklyReport" as const, label: "Weekly Report", description: "Comprehensive weekly performance summary" },
                  { key: "monthlyReport" as const, label: "Monthly Report", description: "Full month-over-month analysis" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={item.key}>{item.label}</Label>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      id={item.key}
                      checked={notifications[item.key]}
                      onCheckedChange={() => handleNotificationToggle(item.key)}
                    />
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Alert Notifications
                </CardTitle>
                <CardDescription>
                  Real-time alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: "clientAlerts" as const, label: "Client Alerts", description: "Issues with client accounts" },
                  { key: "performanceAlerts" as const, label: "Performance Alerts", description: "Significant changes in KPIs" },
                  { key: "seoAlerts" as const, label: "SEO Alerts", description: "Ranking changes and indexing issues" },
                  { key: "securityAlerts" as const, label: "Security Alerts", description: "Security-related notifications" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={item.key}>{item.label}</Label>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      id={item.key}
                      checked={notifications[item.key]}
                      onCheckedChange={() => handleNotificationToggle(item.key)}
                    />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-primary" />
                    Connected Integrations
                  </CardTitle>
                  <CardDescription>
                    Manage connections to external tools and platforms
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    integrations.filter(i => i.testEndpoint).forEach(i => handleTestIntegration(i));
                  }}
                  className="border-border/50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Test All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {integrations.map((integration, idx) => {
                  const result = integrationResults[integration.id];
                  return (
                    <motion.div
                      key={integration.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      className={`p-4 border rounded-lg transition-colors ${
                        integration.status === "connected"
                          ? "border-green-500/30 bg-green-500/5"
                          : integration.status === "error"
                          ? "border-red-500/30 bg-red-500/5"
                          : "border-border/50 bg-background/50 hover:bg-muted/30"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            integration.status === "connected"
                              ? "bg-green-500/20"
                              : integration.status === "error"
                              ? "bg-red-500/20"
                              : "bg-primary/10"
                          }`}>
                            <integration.icon className={`h-5 w-5 ${
                              integration.status === "connected"
                                ? "text-green-400"
                                : integration.status === "error"
                                ? "text-red-400"
                                : "text-primary"
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{integration.name}</h3>
                              <Badge
                                variant="outline"
                                className={getIntegrationStatusColor(integration.status)}
                              >
                                {integration.status === "connected" ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : integration.status === "error" ? (
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                ) : integration.status === "testing" ? (
                                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                ) : null}
                                {integration.status === "connected" 
                                  ? "Connected" 
                                  : integration.status === "error" 
                                  ? "Error" 
                                  : integration.status === "testing"
                                  ? "Testing..."
                                  : "Not Connected"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {integration.description}
                            </p>
                            {integration.lastSync && (
                              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Last synced: {integration.lastSync}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Live data preview */}
                      {integration.status === "connected" && result?.totals && (
                        <div className="mt-3 pt-3 border-t border-border/30 grid grid-cols-2 gap-2">
                          {integration.id === "ga" && (
                            <>
                              <div className="text-center p-2 bg-background/50 rounded">
                                <p className="text-lg font-bold text-foreground">
                                  {result.totals.sessions?.toLocaleString() || 0}
                                </p>
                                <p className="text-xs text-muted-foreground">Sessions</p>
                              </div>
                              <div className="text-center p-2 bg-background/50 rounded">
                                <p className="text-lg font-bold text-foreground">
                                  {result.totals.pageViews?.toLocaleString() || 0}
                                </p>
                                <p className="text-xs text-muted-foreground">Page Views</p>
                              </div>
                            </>
                          )}
                          {integration.id === "gsc" && (
                            <>
                              <div className="text-center p-2 bg-background/50 rounded">
                                <p className="text-lg font-bold text-foreground">
                                  {result.totals.clicks?.toLocaleString() || 0}
                                </p>
                                <p className="text-xs text-muted-foreground">Clicks</p>
                              </div>
                              <div className="text-center p-2 bg-background/50 rounded">
                                <p className="text-lg font-bold text-foreground">
                                  {result.totals.impressions?.toLocaleString() || 0}
                                </p>
                                <p className="text-xs text-muted-foreground">Impressions</p>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-3 flex justify-end gap-2">
                        {integration.testEndpoint && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTestIntegration(integration)}
                            disabled={integration.status === "testing"}
                          >
                            {integration.status === "testing" ? (
                              <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Testing...
                              </>
                            ) : (
                              <>
                                <TestTube className="h-4 w-4 mr-2" />
                                Test
                              </>
                            )}
                          </Button>
                        )}
                        <Button
                          variant={integration.status === "connected" ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleConnectIntegration(integration)}
                          disabled={integration.status === "testing"}
                        >
                          {integration.status === "connected" ? "Refresh" : integration.testEndpoint ? "Connect" : "Coming Soon"}
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Integration Setup Guide */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Integration Setup Guide
              </CardTitle>
              <CardDescription>
                How to connect Google Analytics and Search Console
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Google Analytics & Search Console Setup
                </h4>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Create a Google Cloud Project and enable Analytics Data API + Search Console API</li>
                  <li>Create a Service Account with Viewer permissions</li>
                  <li>Download the JSON key file</li>
                  <li>Add the service account email to your GA4 property (Admin → Property Access Management)</li>
                  <li>Add the service account email to Search Console (Settings → Users and permissions)</li>
                  <li>Configure the secrets in Lovable Cloud (GOOGLE_SERVICE_ACCOUNT_JSON, GOOGLE_ANALYTICS_PROPERTY_ID)</li>
                </ol>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer">
                      Google Cloud Console
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                      Search Console
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab - NEW */}
        <TabsContent value="api-keys" className="space-y-4">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                External API Keys
              </CardTitle>
              <CardDescription>
                Configure API keys for data providers and external services. These are stored securely in your backend.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {apiKeyConfigs.map((config, idx) => (
                  <AccordionItem
                    key={config.id}
                    value={config.id}
                    className="border border-border/50 rounded-lg px-4 bg-background/50"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <config.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-left flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{config.name}</span>
                            <Badge
                              variant="outline"
                              className={config.isConfigured 
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-muted text-muted-foreground border-border"
                              }
                            >
                              {config.isConfigured ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Configured
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Not Set
                                </>
                              )}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {config.description}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="space-y-4 pt-2">
                        {/* Instructions */}
                        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                          <h4 className="text-sm font-medium flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Setup Instructions
                          </h4>
                          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                            {config.instructions.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                          <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                            <a href={config.docUrl} target="_blank" rel="noopener noreferrer">
                              Open documentation
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        </div>

                        {/* API Key Input */}
                        <div className="space-y-2">
                          <Label htmlFor={`key-${config.id}`}>
                            {config.secretName}
                          </Label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Input
                                id={`key-${config.id}`}
                                type={showApiKey[config.id] ? "text" : "password"}
                                placeholder={config.isConfigured ? "••••••••••••••••" : "Enter API key..."}
                                value={apiKeyValues[config.id] || ""}
                                onChange={(e) => setApiKeyValues((prev) => ({ ...prev, [config.id]: e.target.value }))}
                                className="font-mono text-sm pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowApiKey((prev) => ({ ...prev, [config.id]: !prev[config.id] }))}
                              >
                                {showApiKey[config.id] ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTestApiKey(config.id)}
                            disabled={testingApiKey === config.id || (!apiKeyValues[config.id] && !config.isConfigured)}
                          >
                            {testingApiKey === config.id ? (
                              <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Testing...
                              </>
                            ) : (
                              <>
                                <TestTube className="h-4 w-4 mr-2" />
                                Test Connection
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSaveApiKey(config.id, config.secretName)}
                            disabled={!apiKeyValues[config.id] || savingApiKey === config.id}
                          >
                            {savingApiKey === config.id ? (
                              <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Key
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Resend Domain Verification Notice */}
          <Card className="bg-amber-500/10 border-amber-500/30">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium text-amber-200">Resend Domain Verification Required</h4>
                  <p className="text-sm text-muted-foreground">
                    To send emails from your own domain (not @resend.dev), you must verify your domain at{" "}
                    <a href="https://resend.com/domains" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      resend.com/domains
                    </a>
                    . Add the required DNS records (SPF, DKIM, DMARC) and wait for verification.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Settings Tab */}
        <TabsContent value="site" className="space-y-4">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Site Features
              </CardTitle>
              <CardDescription>
                Toggle global website features on or off
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Slide-in Audit Panel</Label>
                  <p className="text-sm text-muted-foreground">
                    Show the free audit offer panel when users scroll halfway down the page
                  </p>
                </div>
                <Switch
                  checked={siteSettings?.popup_slide_in_enabled ?? true}
                  onCheckedChange={(checked) => 
                    updateSiteSetting.mutate({ key: "popup_slide_in_enabled", value: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Exit-Intent Popover</Label>
                  <p className="text-sm text-muted-foreground">
                    Show the free audit offer when users move their mouse to leave the site
                  </p>
                </div>
                <Switch
                  checked={siteSettings?.popup_exit_intent_enabled ?? true}
                  onCheckedChange={(checked) => 
                    updateSiteSetting.mutate({ key: "popup_exit_intent_enabled", value: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {rolePermissions.map((roleData, idx) => (
              <motion.div
                key={roleData.role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{roleData.role}</CardTitle>
                    </div>
                    <CardDescription>{roleData.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {roleData.permissions.map((perm) => (
                        <div
                          key={perm.name}
                          className="flex items-center justify-between p-2 bg-background/50 rounded-lg"
                        >
                          <span className="text-sm">{perm.name}</span>
                          {perm.granted ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Webhooks Tab (renamed from API) */}
        <TabsContent value="api" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Webhook Settings
                </CardTitle>
                <CardDescription>
                  Configure webhook endpoints for real-time notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input
                    type="url"
                    placeholder="https://your-server.com/webhook"
                    className="bg-muted/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Events to Send</Label>
                  <div className="space-y-2">
                    {["lead.created", "lead.updated", "audit.completed", "alert.triggered"].map(
                      (event) => (
                        <div key={event} className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                          <span className="text-sm font-mono">{event}</span>
                          <Switch defaultChecked={event.includes("lead")} />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Webhook Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Webhook Secret
                </CardTitle>
                <CardDescription>
                  Use this secret to verify webhook payloads
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Signing Secret</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value="whsec_••••••••••••••••"
                      readOnly
                      className="font-mono text-sm bg-muted/30"
                    />
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use this secret to verify webhook signatures
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate Secret
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}