import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { StaticBeamBorder } from "@/components/BeamBorder";

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

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "not-connected" | "error";
  lastSync: string | null;
  icon: React.ElementType;
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("team");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("client");
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const integrations: Integration[] = [
    {
      id: "ga",
      name: "Google Analytics",
      description: "Pull analytics data for reporting",
      status: "connected",
      lastSync: "5 minutes ago",
      icon: Globe,
    },
    {
      id: "gsc",
      name: "Google Search Console",
      description: "Access search performance and indexing",
      status: "connected",
      lastSync: "1 hour ago",
      icon: Database,
    },
    {
      id: "slack",
      name: "Slack",
      description: "Team notifications and alerts",
      status: "not-connected",
      lastSync: null,
      icon: Bell,
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect with 5000+ apps",
      status: "not-connected",
      lastSync: null,
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

      // Get roles for each user
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
      // In production, this would send an invite email
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
      // In production, this would remove the user's access
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      toast.success("Team member removed");
    } catch (error) {
      toast.error("Failed to remove team member");
    }
  };

  const handleConnectIntegration = (integration: Integration) => {
    if (integration.status === "connected") {
      toast.success(`${integration.name} disconnected`);
    } else {
      toast.success(`${integration.name} connected successfully`);
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
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 backdrop-blur-sm p-1">
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
            value="roles"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Shield className="h-4 w-4 mr-2" />
            Roles
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Key className="h-4 w-4 mr-2" />
            API
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
              <CardTitle className="text-lg flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                Connected Integrations
              </CardTitle>
              <CardDescription>
                Manage connections to external tools and platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {integrations.map((integration, idx) => (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="p-4 border border-border/50 rounded-lg bg-background/50 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <integration.icon className="h-5 w-5 text-primary" />
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
                              ) : null}
                              {integration.status === "connected" ? "Connected" : integration.status === "error" ? "Error" : "Not Connected"}
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
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant={integration.status === "connected" ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleConnectIntegration(integration)}
                      >
                        {integration.status === "connected" ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
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
                      {roleData.permissions.map((perm, permIdx) => (
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

        {/* API Tab */}
        <TabsContent value="api" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  API Keys
                </CardTitle>
                <CardDescription>
                  Manage API keys for external integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Publishable Key</Label>
                  <div className="flex gap-2">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      value="pk_live_••••••••••••••••"
                      readOnly
                      className="font-mono text-sm bg-muted/30"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secret Key</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value="sk_live_••••••••••••••••"
                      readOnly
                      className="font-mono text-sm bg-muted/30"
                    />
                    <Button variant="outline" size="icon">
                      <EyeOff className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Never share your secret key publicly
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate Keys
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Webhook Settings
                </CardTitle>
                <CardDescription>
                  Configure webhook endpoints
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
