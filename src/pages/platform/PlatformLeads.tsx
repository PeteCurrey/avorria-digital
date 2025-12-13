import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeadsAdmin, useUpdateLead, useDeleteLead, Lead } from "@/hooks/useLeads";
import { toast } from "sonner";
import { 
  Search, MoreVertical, Mail, Phone, Building2, Calendar,
  TrendingUp, Users, Target, CheckCircle, XCircle, Clock,
  ArrowRight, ChevronRight, Star, Loader2, FileText, Trash2
} from "lucide-react";

// Lead status workflow stages
const STATUS_WORKFLOW = [
  { value: "new", label: "New", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  { value: "contacted", label: "Contacted", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  { value: "qualified", label: "Qualified", color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20" },
  { value: "proposal", label: "Proposal", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  { value: "won", label: "Won", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  { value: "lost", label: "Lost", color: "bg-red-500/10 text-red-600 border-red-500/20" },
];

// Calculate lead score based on available data
const calculateLeadScore = (lead: Lead): number => {
  let score = 0;
  
  // Has company info (+20)
  if (lead.company && lead.company.trim() !== "") score += 20;
  
  // Has phone number (+15)
  if (lead.phone && lead.phone.trim() !== "") score += 15;
  
  // Source scoring
  const sourceScores: Record<string, number> = {
    "project-estimator": 30,
    "free-audit": 25,
    "contact": 20,
    "agency-teardown": 25,
    "newsletter": 10,
    "referral": 35,
  };
  score += sourceScores[lead.source] || 10;
  
  // Status progression scoring
  const statusScores: Record<string, number> = {
    "new": 0,
    "contacted": 10,
    "qualified": 20,
    "proposal": 25,
    "won": 30,
    "lost": 0,
  };
  score += statusScores[lead.status] || 0;
  
  // Cap at 100
  return Math.min(score, 100);
};

const getScoreColor = (score: number): string => {
  if (score >= 70) return "text-green-600";
  if (score >= 40) return "text-amber-600";
  return "text-muted-foreground";
};

const getScoreLabel = (score: number): string => {
  if (score >= 70) return "Hot";
  if (score >= 40) return "Warm";
  return "Cold";
};

const PlatformLeads = () => {
  const { data: leads, isLoading, error } = useLeadsAdmin();
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();
  
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  const getStatusColor = (status: string) => {
    const found = STATUS_WORKFLOW.find(s => s.value === status);
    return found?.color || "bg-gray-500/10 text-gray-600 border-gray-500/20";
  };

  const getStatusLabel = (status: string) => {
    const found = STATUS_WORKFLOW.find(s => s.value === status);
    return found?.label || status;
  };

  const formatSource = (source: string) => {
    return source.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  // Filter leads
  const filteredLeads = (leads || []).filter((lead) => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    const matchesSearch =
      searchQuery === "" ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSource && matchesSearch;
  });

  // Get unique sources from leads
  const uniqueSources = [...new Set((leads || []).map(l => l.source))];

  // Stats
  const stats = {
    total: leads?.length || 0,
    new: leads?.filter(l => l.status === "new").length || 0,
    qualified: leads?.filter(l => l.status === "qualified").length || 0,
    won: leads?.filter(l => l.status === "won").length || 0,
  };

  // Pipeline counts for workflow view
  const pipelineCounts = STATUS_WORKFLOW.map(stage => ({
    ...stage,
    count: leads?.filter(l => l.status === stage.value).length || 0,
  }));

  const handleStatusChange = async (lead: Lead, newStatus: string) => {
    await updateLead.mutateAsync({
      id: lead.id,
      updates: { status: newStatus },
    });
  };

  const handleOpenDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setNotes(lead.notes || "");
    setDetailOpen(true);
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    await updateLead.mutateAsync({
      id: selectedLead.id,
      updates: { notes },
    });
    setDetailOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!leadToDelete) return;
    await deleteLead.mutateAsync(leadToDelete.id);
    setDeleteConfirmOpen(false);
    setLeadToDelete(null);
  };

  const handleDeleteClick = (lead: Lead) => {
    setLeadToDelete(lead);
    setDeleteConfirmOpen(true);
  };

  if (error) {
    return (
      <>
        <Helmet>
          <title>Leads - Avorria Growth Platform</title>
        </Helmet>
        <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-destructive mb-2">Failed to load leads</p>
              <p className="text-sm text-muted-foreground">Please check your permissions and try again.</p>
            </div>
          </div>
        </AppShell>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Leads - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Lead Management</h1>
            <p className="text-muted-foreground">
              Track, qualify, and convert leads through your sales pipeline
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">{stats.new}</p>
                    <p className="text-sm text-muted-foreground">New Leads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">{stats.qualified}</p>
                    <p className="text-sm text-muted-foreground">Qualified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">{stats.won}</p>
                    <p className="text-sm text-muted-foreground">Won</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="list" className="space-y-6">
            <TabsList>
              <TabsTrigger value="list">Lead List</TabsTrigger>
              <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
            </TabsList>

            {/* List View */}
            <TabsContent value="list" className="space-y-4">
              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search leads by name, email, or company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        {STATUS_WORKFLOW.map(stage => (
                          <SelectItem key={stage.value} value={stage.value}>
                            {stage.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sourceFilter} onValueChange={setSourceFilter}>
                      <SelectTrigger className="w-full md:w-44">
                        <SelectValue placeholder="Source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All sources</SelectItem>
                        {uniqueSources.map(source => (
                          <SelectItem key={source} value={source}>
                            {formatSource(source)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Leads Table */}
              {isLoading ? (
                <Card>
                  <CardContent className="p-12 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </CardContent>
                </Card>
              ) : filteredLeads.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No leads found matching your filters.</p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border bg-muted/30">
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Lead</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Source</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Created</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLeads.map((lead) => {
                            const score = calculateLeadScore(lead);
                            return (
                              <tr 
                                key={lead.id} 
                                className="border-b border-border hover:bg-muted/30 cursor-pointer"
                                onClick={() => handleOpenDetail(lead)}
                              >
                                <td className="py-4 px-4">
                                  <div>
                                    <p className="font-medium text-foreground">{lead.name}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Mail className="h-3 w-3" />
                                        {lead.email}
                                      </span>
                                      {lead.company && (
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                          <Building2 className="h-3 w-3" />
                                          {lead.company}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <Badge variant="secondary" className="text-xs">
                                    {formatSource(lead.source)}
                                  </Badge>
                                </td>
                                <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                                  <Select
                                    value={lead.status}
                                    onValueChange={(value) => handleStatusChange(lead, value)}
                                  >
                                    <SelectTrigger className="w-32 h-8">
                                      <Badge variant="outline" className={getStatusColor(lead.status)}>
                                        {getStatusLabel(lead.status)}
                                      </Badge>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {STATUS_WORKFLOW.map(stage => (
                                        <SelectItem key={stage.value} value={stage.value}>
                                          <Badge variant="outline" className={stage.color}>
                                            {stage.label}
                                          </Badge>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-2">
                                    <Star className={`h-4 w-4 ${getScoreColor(score)}`} />
                                    <span className={`font-medium ${getScoreColor(score)}`}>{score}</span>
                                    <span className="text-xs text-muted-foreground">({getScoreLabel(score)})</span>
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <span className="text-sm text-muted-foreground">
                                    {format(new Date(lead.created_at), "MMM d, yyyy")}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleOpenDetail(lead)}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        View details
                                      </DropdownMenuItem>
                                      {lead.phone && (
                                        <DropdownMenuItem asChild>
                                          <a href={`tel:${lead.phone}`}>
                                            <Phone className="mr-2 h-4 w-4" />
                                            Call {lead.phone}
                                          </a>
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem asChild>
                                        <a href={`mailto:${lead.email}`}>
                                          <Mail className="mr-2 h-4 w-4" />
                                          Email lead
                                        </a>
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem 
                                        onClick={() => handleDeleteClick(lead)}
                                        className="text-destructive"
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete lead
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Pipeline View */}
            <TabsContent value="pipeline" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {pipelineCounts.map((stage) => (
                  <Card key={stage.value} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={stage.color}>
                          {stage.label}
                        </Badge>
                        <span className="text-2xl font-light text-foreground">{stage.count}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {(leads || [])
                          .filter(l => l.status === stage.value)
                          .slice(0, 5)
                          .map(lead => (
                            <div 
                              key={lead.id}
                              className="p-2 rounded bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                              onClick={() => handleOpenDetail(lead)}
                            >
                              <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{lead.company || lead.email}</p>
                            </div>
                          ))}
                        {(leads || []).filter(l => l.status === stage.value).length > 5 && (
                          <p className="text-xs text-muted-foreground text-center">
                            +{(leads || []).filter(l => l.status === stage.value).length - 5} more
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pipeline Flow Visual */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pipeline Flow</CardTitle>
                  <CardDescription>Lead progression through stages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                    {pipelineCounts.map((stage, index) => (
                      <div key={stage.value} className="flex items-center">
                        <div className="flex flex-col items-center min-w-[100px]">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-light ${stage.color.replace('bg-', 'bg-').replace('/10', '/20')}`}>
                            {stage.count}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{stage.label}</p>
                        </div>
                        {index < pipelineCounts.length - 1 && (
                          <ChevronRight className="h-6 w-6 text-muted-foreground mx-2 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AppShell>

      {/* Lead Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedLead?.name}</DialogTitle>
            <DialogDescription>Lead details and activity</DialogDescription>
          </DialogHeader>
          
          {selectedLead && (
            <div className="space-y-6">
              {/* Lead Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a href={`mailto:${selectedLead.email}`} className="text-foreground hover:text-primary">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <a href={`tel:${selectedLead.phone}`} className="text-foreground hover:text-primary">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
                {selectedLead.company && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Company</p>
                    <p className="text-foreground">{selectedLead.company}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Source</p>
                  <Badge variant="secondary">{formatSource(selectedLead.source)}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Select
                    value={selectedLead.status}
                    onValueChange={(value) => {
                      handleStatusChange(selectedLead, value);
                      setSelectedLead({ ...selectedLead, status: value });
                    }}
                  >
                    <SelectTrigger className="w-40">
                      <Badge variant="outline" className={getStatusColor(selectedLead.status)}>
                        {getStatusLabel(selectedLead.status)}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_WORKFLOW.map(stage => (
                        <SelectItem key={stage.value} value={stage.value}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Lead Score</p>
                  <div className="flex items-center gap-2">
                    <Star className={`h-4 w-4 ${getScoreColor(calculateLeadScore(selectedLead))}`} />
                    <span className={`font-medium ${getScoreColor(calculateLeadScore(selectedLead))}`}>
                      {calculateLeadScore(selectedLead)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({getScoreLabel(calculateLeadScore(selectedLead))})
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Activity Timeline</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground">Lead created</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(selectedLead.created_at), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                  {selectedLead.updated_at !== selectedLead.created_at && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">Last updated</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(selectedLead.updated_at), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Notes</p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this lead..."
                  rows={4}
                />
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" asChild className="flex-1">
                  <a href={`mailto:${selectedLead.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </a>
                </Button>
                {selectedLead.phone && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={`tel:${selectedLead.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes} disabled={updateLead.isPending}>
              {updateLead.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lead</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {leadToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="outline" 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDelete} 
              disabled={deleteLead.isPending}
            >
              {deleteLead.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlatformLeads;
