import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClients, useCreateClient, useUpdateClient, useDeleteClient, useClientStats, type Client, type ClientInsert, type ClientUpdate } from "@/hooks/useClients";
import { useProfiles } from "@/hooks/useProfiles";
import { useAuth } from "@/hooks/useAuth";
import { ClientInviteDialog } from "./ClientInviteDialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Users,
  UserCheck,
  AlertTriangle,
  Pause,
  Rocket,
  Building2,
  UserPlus,
  Mail,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const statusConfig = {
  onboarding: { label: "Onboarding", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Rocket },
  live: { label: "Live", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: UserCheck },
  "at-risk": { label: "At Risk", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertTriangle },
  paused: { label: "Paused", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: Pause },
};

const serviceOptions = [
  "SEO",
  "Paid Media",
  "Web Design",
  "Content Marketing",
  "Social Media",
  "Email Marketing",
  "Brand Strategy",
  "Analytics",
];

const industryOptions = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Education",
  "Professional Services",
  "Hospitality",
  "Other",
];

const ClientsManager = () => {
  const navigate = useNavigate();
  const { setImpersonatedClient } = useAuth();
  const { data: clients, isLoading } = useClients();
  const { data: stats } = useClientStats();
  const { data: profiles } = useProfiles();
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [inviteClient, setInviteClient] = useState<Client | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    name: string;
    industry: string;
    services: string[];
    status: string;
    monthly_value: string;
    owner_id: string;
    notes: string;
  }>({
    name: "",
    industry: "",
    services: [],
    status: "onboarding",
    monthly_value: "",
    owner_id: "",
    notes: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      industry: "",
      services: [],
      status: "onboarding",
      monthly_value: "",
    owner_id: "none",
      notes: "",
    });
    setEditingClient(null);
  };

  const openEditDialog = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      industry: client.industry || "",
      services: client.services || [],
      status: client.status,
      monthly_value: client.monthly_value || "",
      owner_id: client.owner_id || "none",
      notes: client.notes || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Client name is required");
      return;
    }

    try {
      const ownerProfile = profiles?.find(p => p.id === formData.owner_id);
      
      const payload = {
        name: formData.name,
        industry: formData.industry || undefined,
        services: formData.services.length > 0 ? formData.services : undefined,
        status: formData.status,
        monthly_value: formData.monthly_value || undefined,
        owner_id: formData.owner_id && formData.owner_id !== "none" ? formData.owner_id : undefined,
        owner_name: ownerProfile?.full_name || ownerProfile?.email || undefined,
        notes: formData.notes || undefined,
      };

      if (editingClient) {
        await updateClient.mutateAsync({
          id: editingClient.id,
          updates: payload as ClientUpdate,
        });
        toast.success("Client updated successfully");
      } else {
        await createClient.mutateAsync(payload as ClientInsert);
        toast.success("Client created successfully");
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save client");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      try {
        await deleteClient.mutateAsync(id);
        toast.success("Client deleted successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to delete client");
      }
    }
  };

  const handleViewAsClient = (client: Client) => {
    setImpersonatedClient(client.id);
    navigate("/client");
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const filteredClients = clients?.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.owner_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.total || 0}</p>
                <p className="text-sm text-muted-foreground">Total Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Rocket className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.onboarding || 0}</p>
                <p className="text-sm text-muted-foreground">Onboarding</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <UserCheck className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.live || 0}</p>
                <p className="text-sm text-muted-foreground">Live</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.atRisk || 0}</p>
                <p className="text-sm text-muted-foreground">At Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-500/10">
                <Pause className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.paused || 0}</p>
                <p className="text-sm text-muted-foreground">Paused</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 border-border/50"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="onboarding">Onboarding</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="at-risk">At Risk</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingClient ? "Edit Client" : "Add New Client"}</DialogTitle>
              <DialogDescription>
                {editingClient 
                  ? "Update the client's information below."
                  : "Create a new client to manage their projects and invoices."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Acme Corporation"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>{config.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Monthly Value</Label>
                  <Input
                    value={formData.monthly_value}
                    onChange={(e) => setFormData({ ...formData, monthly_value: e.target.value })}
                    placeholder="e.g., £5,000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Link to User Account</Label>
                <Select
                  value={formData.owner_id}
                  onValueChange={(value) => setFormData({ ...formData, owner_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No linked user</SelectItem>
                    {profiles?.map(profile => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.full_name || profile.email} ({profile.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Link to a registered user so they can access the client portal.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Services</Label>
                <div className="grid grid-cols-2 gap-2 p-3 border border-border/50 rounded-lg">
                  {serviceOptions.map(service => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.services.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <label htmlFor={service} className="text-sm cursor-pointer">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Internal notes about this client..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={createClient.isPending || updateClient.isPending}>
                {editingClient ? "Save Changes" : "Create Client"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Clients Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading clients...</div>
          ) : filteredClients?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">No clients found</p>
              <p className="text-sm mb-4">Create your first client to get started.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Client</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Monthly Value</TableHead>
                  <TableHead>Linked User</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients?.map((client) => {
                  const config = statusConfig[client.status as keyof typeof statusConfig] || statusConfig.onboarding;
                  return (
                    <TableRow key={client.id} className="border-border/50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          {client.industry && (
                            <p className="text-sm text-muted-foreground">{client.industry}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {client.services?.slice(0, 2).map(service => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {client.services && client.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{client.services.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={config.color}>
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {client.monthly_value || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {client.owner_name || (client.owner_id ? "User linked" : "—")}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(client.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewAsClient(client)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View as Client
                            </DropdownMenuItem>
                            {!client.owner_id && (
                              <DropdownMenuItem onClick={() => setInviteClient(client)}>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Invite Client
                              </DropdownMenuItem>
                            )}
                            {client.owner_id && (
                              <DropdownMenuItem onClick={() => setInviteClient(client)}>
                                <Mail className="h-4 w-4 mr-2" />
                                Manage Access
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => openEditDialog(client)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(client.id, client.name)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Client Invite Dialog */}
      {inviteClient && (
        <ClientInviteDialog
          open={!!inviteClient}
          onOpenChange={(open) => !open && setInviteClient(null)}
          clientId={inviteClient.id}
          clientName={inviteClient.name}
          onSuccess={() => {
            // Refresh clients list
          }}
        />
      )}
    </div>
  );
};

export default ClientsManager;
