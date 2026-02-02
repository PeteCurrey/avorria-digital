import React, { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  BarChart3,
  Plus,
  Trash2,
  RefreshCw,
  Check,
  X,
  ExternalLink,
  Search,
  Loader2,
  Plug,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
  DialogFooter,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useAllAnalyticsConnections,
  useCreateAnalyticsConnection,
  useUpdateAnalyticsConnection,
  useDeleteAnalyticsConnection,
  useSyncAnalytics,
} from "@/hooks/useClientAnalyticsConnections";
import { useClients } from "@/hooks/useClients";
import { useAllProjects } from "@/hooks/useClientProjects";

const AnalyticsConnectionsTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [ga4PropertyId, setGa4PropertyId] = useState("");
  const [gscProperty, setGscProperty] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: connections, isLoading } = useAllAnalyticsConnections();
  const { data: clients } = useClients();
  const { data: projects } = useAllProjects();
  const createConnection = useCreateAnalyticsConnection();
  const updateConnection = useUpdateAnalyticsConnection();
  const deleteConnection = useDeleteAnalyticsConnection();
  const syncAnalytics = useSyncAnalytics();

  const filteredConnections = connections?.filter((conn) =>
    conn.client?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.ga4_property_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.gsc_property?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    if (!selectedClientId) return;

    createConnection.mutate(
      {
        client_id: selectedClientId,
        project_id: selectedProjectId || undefined,
        ga4_property_id: ga4PropertyId || undefined,
        gsc_property: gscProperty || undefined,
        is_active: true,
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
          resetForm();
        },
      }
    );
  };

  const resetForm = () => {
    setSelectedClientId("");
    setSelectedProjectId("");
    setGa4PropertyId("");
    setGscProperty("");
  };

  const handleToggleActive = (connectionId: string, currentStatus: boolean) => {
    updateConnection.mutate({
      id: connectionId,
      updates: { is_active: !currentStatus },
    });
  };

  const filteredProjects = projects?.filter(
    (p) => !selectedClientId || p.client_id === selectedClientId
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Analytics Connections</h2>
          <p className="text-muted-foreground">
            Connect Google Analytics and Search Console for each client.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Connection
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Analytics Connection</DialogTitle>
              <DialogDescription>
                Connect a client's Google Analytics and Search Console properties.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client *</Label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients?.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Project (Optional)</Label>
                <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No specific project</SelectItem>
                    {filteredProjects?.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ga4">GA4 Property ID</Label>
                <Input
                  id="ga4"
                  placeholder="e.g., 123456789"
                  value={ga4PropertyId}
                  onChange={(e) => setGa4PropertyId(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Found in GA4 Admin → Property Settings
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gsc">Search Console Property</Label>
                <Input
                  id="gsc"
                  placeholder="e.g., https://example.com"
                  value={gscProperty}
                  onChange={(e) => setGscProperty(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  The verified property URL from Search Console
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!selectedClientId || createConnection.isPending}
              >
                {createConnection.isPending && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Create Connection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search connections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Plug className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {connections?.length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Total Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {connections?.filter((c) => c.is_active).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {connections?.filter((c) => c.ga4_property_id).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">GA4 Connected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connections Table */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">All Connections</CardTitle>
          <CardDescription>Manage analytics integrations per client.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredConnections?.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No Connections Yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first analytics connection to get started.
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Connection
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>GA4 Property</TableHead>
                  <TableHead>Search Console</TableHead>
                  <TableHead>Last Synced</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConnections?.map((connection) => (
                  <TableRow key={connection.id}>
                    <TableCell className="font-medium">
                      {connection.client?.name || "Unknown"}
                    </TableCell>
                    <TableCell>
                      {connection.project?.name || (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {connection.ga4_property_id ? (
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {connection.ga4_property_id}
                        </code>
                      ) : (
                        <span className="text-muted-foreground">Not set</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {connection.gsc_property ? (
                        <a
                          href={connection.gsc_property}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline text-sm"
                        >
                          <Globe className="h-3 w-3" />
                          View
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">Not set</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {connection.last_synced_at ? (
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(connection.last_synced_at), {
                            addSuffix: true,
                          })}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Never</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={connection.is_active}
                          onCheckedChange={() =>
                            handleToggleActive(connection.id, connection.is_active)
                          }
                        />
                        <Badge
                          variant="outline"
                          className={
                            connection.is_active
                              ? "bg-green-500/10 text-green-500 border-green-500/30"
                              : "bg-gray-500/10 text-gray-500 border-gray-500/30"
                          }
                        >
                          {connection.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => syncAnalytics.mutate(connection.id)}
                          disabled={syncAnalytics.isPending}
                        >
                          <RefreshCw
                            className={`h-4 w-4 ${
                              syncAnalytics.isPending ? "animate-spin" : ""
                            }`}
                          />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Connection?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove the analytics connection for{" "}
                                {connection.client?.name}. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteConnection.mutate(connection.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsConnectionsTab;
