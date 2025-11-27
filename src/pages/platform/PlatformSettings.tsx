import { Helmet } from "react-helmet-async";
import { useState } from "react";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PlatformSettings = () => {
  const { toast } = useToast();
  
  // Notification preferences state
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    clientAlerts: true,
    performanceAlerts: true,
    teamMentions: true,
    weeklyReport: false,
    monthlyReport: true,
  });

  // Team members data
  const teamMembers = [
    {
      id: "1",
      name: "Alex Morgan",
      email: "alex@avorria.com",
      role: "Account Lead",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Jordan Lee",
      email: "jordan@avorria.com",
      role: "Specialist",
      status: "active",
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Sam Chen",
      email: "sam@avorria.com",
      role: "Strategist",
      status: "active",
      lastActive: "3 hours ago",
    },
    {
      id: "4",
      name: "Taylor Kim",
      email: "taylor@avorria.com",
      role: "Specialist",
      status: "inactive",
      lastActive: "2 weeks ago",
    },
  ];

  // Role permissions
  const rolePermissions = [
    {
      role: "Account Lead",
      description: "Full access to clients, campaigns, and reporting. Can manage team members.",
      permissions: [
        { name: "View all clients", granted: true },
        { name: "Edit client data", granted: true },
        { name: "Manage campaigns", granted: true },
        { name: "Access reporting", granted: true },
        { name: "Manage team members", granted: true },
        { name: "Edit playbooks", granted: true },
        { name: "View financials", granted: true },
      ],
    },
    {
      role: "Strategist",
      description: "Full access to strategy, campaigns, and client work. Limited admin access.",
      permissions: [
        { name: "View all clients", granted: true },
        { name: "Edit client data", granted: true },
        { name: "Manage campaigns", granted: true },
        { name: "Access reporting", granted: true },
        { name: "Manage team members", granted: false },
        { name: "Edit playbooks", granted: true },
        { name: "View financials", granted: false },
      ],
    },
    {
      role: "Specialist",
      description: "Access to assigned clients and campaigns. Can execute and report.",
      permissions: [
        { name: "View all clients", granted: false },
        { name: "Edit client data", granted: false },
        { name: "Manage campaigns", granted: true },
        { name: "Access reporting", granted: true },
        { name: "Manage team members", granted: false },
        { name: "Edit playbooks", granted: false },
        { name: "View financials", granted: false },
      ],
    },
  ];

  // Integrations
  const integrations = [
    {
      id: "1",
      name: "Google Analytics",
      description: "Pull analytics data for client reporting",
      status: "connected",
      lastSync: "5 minutes ago",
    },
    {
      id: "2",
      name: "Google Ads",
      description: "Access campaign performance and manage ads",
      status: "connected",
      lastSync: "1 hour ago",
    },
    {
      id: "3",
      name: "HubSpot",
      description: "Sync leads and track pipeline",
      status: "not-connected",
      lastSync: null,
    },
    {
      id: "4",
      name: "Slack",
      description: "Team notifications and alerts",
      status: "connected",
      lastSync: "Real-time",
    },
  ];

  const handleNotificationToggle = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Notification preference updated",
      description: "Your changes have been saved.",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-500/10 text-green-600 border-green-500/20"
      : "bg-gray-500/10 text-gray-600 border-gray-500/20";
  };

  const getIntegrationStatusColor = (status: string) => {
    return status === "connected"
      ? "bg-green-500/10 text-green-600 border-green-500/20"
      : "bg-gray-500/10 text-gray-600 border-gray-500/20";
  };

  return (
    <>
      <Helmet>
        <title>Settings - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your team, notifications, integrations, and permissions
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="team" className="space-y-4">
            <TabsList>
              <TabsTrigger value="team">Team Management</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            </TabsList>

            {/* Team Management Tab */}
            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Team Members
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Manage who has access to the platform and their roles
                      </CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell className="text-muted-foreground">{member.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{member.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(member.status)}>
                              {member.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {member.lastActive}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium text-foreground">Email Notifications</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-digest">Daily digest</Label>
                          <p className="text-sm text-muted-foreground">
                            Summary of key metrics and alerts each morning
                          </p>
                        </div>
                        <Switch
                          id="email-digest"
                          checked={notifications.emailDigest}
                          onCheckedChange={() => handleNotificationToggle("emailDigest")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="weekly-report">Weekly report</Label>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive weekly performance summary
                          </p>
                        </div>
                        <Switch
                          id="weekly-report"
                          checked={notifications.weeklyReport}
                          onCheckedChange={() => handleNotificationToggle("weeklyReport")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="monthly-report">Monthly report</Label>
                          <p className="text-sm text-muted-foreground">
                            Full month-over-month analysis and insights
                          </p>
                        </div>
                        <Switch
                          id="monthly-report"
                          checked={notifications.monthlyReport}
                          onCheckedChange={() => handleNotificationToggle("monthlyReport")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium text-foreground">Alert Notifications</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="client-alerts">Client alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Urgent issues with client accounts or campaigns
                          </p>
                        </div>
                        <Switch
                          id="client-alerts"
                          checked={notifications.clientAlerts}
                          onCheckedChange={() => handleNotificationToggle("clientAlerts")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="performance-alerts">Performance alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Significant changes in KPIs or campaign performance
                          </p>
                        </div>
                        <Switch
                          id="performance-alerts"
                          checked={notifications.performanceAlerts}
                          onCheckedChange={() => handleNotificationToggle("performanceAlerts")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="team-mentions">Team mentions</Label>
                          <p className="text-sm text-muted-foreground">
                            When someone mentions you in notes or comments
                          </p>
                        </div>
                        <Switch
                          id="team-mentions"
                          checked={notifications.teamMentions}
                          onCheckedChange={() => handleNotificationToggle("teamMentions")}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integrations Tab */}
            <TabsContent value="integrations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Connected Integrations
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Manage connections to external tools and platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrations.map((integration) => (
                      <div
                        key={integration.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <LinkIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-foreground">{integration.name}</h3>
                              <Badge
                                variant="outline"
                                className={getIntegrationStatusColor(integration.status)}
                              >
                                {integration.status === "connected" ? "Connected" : "Not connected"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {integration.description}
                            </p>
                            {integration.lastSync && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Last synced: {integration.lastSync}
                              </p>
                            )}
                          </div>
                        </div>
                        {integration.status === "connected" ? (
                          <Button variant="outline">Disconnect</Button>
                        ) : (
                          <Button>Connect</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* API Keys Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Keys</CardTitle>
                  <CardDescription className="mt-1">
                    Manage API keys for platform integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="password"
                      placeholder="API Key"
                      defaultValue="••••••••••••••••"
                      readOnly
                    />
                    <Button variant="outline">Regenerate</Button>
                    <Button variant="ghost">Copy</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Keep your API keys secure. Regenerating will invalidate the old key.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Roles & Permissions Tab */}
            <TabsContent value="roles" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Roles & Permissions
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Understanding access levels for different team roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {rolePermissions.map((roleData) => (
                      <div key={roleData.role} className="border border-border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-medium text-foreground mb-1">
                              {roleData.role}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {roleData.description}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {roleData.permissions.map((permission) => (
                            <div
                              key={permission.name}
                              className="flex items-center gap-2 text-sm"
                            >
                              {permission.granted ? (
                                <Check className="h-4 w-4 text-green-600 shrink-0" />
                              ) : (
                                <X className="h-4 w-4 text-red-600 shrink-0" />
                              )}
                              <span
                                className={
                                  permission.granted ? "text-foreground" : "text-muted-foreground"
                                }
                              >
                                {permission.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AppShell>
    </>
  );
};

export default PlatformSettings;
