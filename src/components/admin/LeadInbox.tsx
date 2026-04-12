'use client';

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import {
  Mail,
  Phone,
  Calendar,
  Building2,
  Trash2,
  Search,
  CheckCircle2,
  Clock,
  MoreVertical,
  Inbox,
  Filter,
  RefreshCw,
  Archive
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLeadsAdmin, useDeleteLead, useUpdateLead, Lead } from "@/hooks/useLeads";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LeadInbox = () => {
  const { data: leads, isLoading, refetch } = useLeadsAdmin();
  const deleteLead = useDeleteLead();
  const updateLead = useUpdateLead();

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const selectedLead = useMemo(() => {
    return leads?.find((l) => l.id === selectedLeadId) || null;
  }, [leads, selectedLeadId]);

  const handleStatusChange = (id: string, newStatus: string) => {
    updateLead.mutate({ id, updates: { status: newStatus } });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      deleteLead.mutate(id);
      if (selectedLeadId === id) setSelectedLeadId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "contacted":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "qualified":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "converted":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "lost":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-12rem)] min-h-[600px]">
      {/* Left Pane - Inbox List */}
      <Card className="w-full md:w-1/3 flex flex-col bg-card/40 border-border/50 backdrop-blur-sm overflow-hidden flex-shrink-0">
        <div className="p-4 border-b border-border/50 space-y-3 bg-card/60">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Inbox className="h-4 w-4 text-accent" /> Inbox
              <Badge variant="secondary" className="ml-1 text-[10px]">
                {leads?.length || 0}
              </Badge>
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="pl-9 bg-background/50 border-border/50 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 text-xs bg-background/50 border-border/50">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/2 bg-muted rounded"></div>
                    <div className="h-2 w-3/4 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
              <Archive className="h-8 w-8 mb-3 opacity-20" />
              <p className="text-sm">No leads found in this view.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {filteredLeads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`w-full text-left p-4 transition-colors hover:bg-muted/30 ${
                    selectedLeadId === lead.id ? "bg-accent/5 border-l-2 border-accent" : "border-l-2 border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm truncate pr-2">{lead.name}</span>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">
                      {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate mb-2 flex items-center gap-1.5">
                    {lead.company ? (
                      <><Building2 className="h-3 w-3" /> {lead.company}</>
                    ) : (
                      <><Mail className="h-3 w-3" /> {lead.email}</>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline" className={`text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0 ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground capitalize">{lead.source}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </Card>

      {/* Right Pane - Detail View */}
      <Card className="w-full md:w-2/3 flex flex-col bg-card/30 border-border/50 backdrop-blur-sm overflow-hidden">
        {selectedLead ? (
          <>
            <div className="p-6 border-b border-border/50 bg-card/60 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-light tracking-tight text-foreground mb-1">
                  {selectedLead.name}
                </h2>
                {selectedLead.company && (
                  <p className="text-sm text-accent flex items-center gap-1.5 mb-2">
                    <Building2 className="h-4 w-4" /> {selectedLead.company}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                  <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors border border-border/50 bg-background/50 px-2 py-1 rounded">
                    <Mail className="h-3.5 w-3.5" /> {selectedLead.email}
                  </a>
                  {selectedLead.phone && (
                    <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors border border-border/50 bg-background/50 px-2 py-1 rounded">
                      <Phone className="h-3.5 w-3.5" /> {selectedLead.phone}
                    </a>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Select
                  value={selectedLead.status}
                  onValueChange={(value) => handleStatusChange(selectedLead.id, value)}
                >
                  <SelectTrigger className={`h-8 w-32 text-xs border ${getStatusColor(selectedLead.status)}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className="text-destructive flex items-center gap-2 cursor-pointer"
                      onClick={() => handleDelete(selectedLead.id)}
                    >
                      <Trash2 className="h-4 w-4" /> Delete Lead
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6 max-w-3xl">
                {/* Meta details grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-background/30 border border-border/50">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Received</p>
                    <p className="text-sm font-medium flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      {format(new Date(selectedLead.created_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Time</p>
                    <p className="text-sm font-medium flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-accent" />
                      {format(new Date(selectedLead.created_at), 'h:mm a')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Source</p>
                    <p className="text-sm font-medium capitalize flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                      {selectedLead.source}
                    </p>
                  </div>
                  {selectedLead.metadata && typeof selectedLead.metadata === 'object' && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Interest</p>
                      <p className="text-sm font-medium">
                        {(selectedLead.metadata as any).service || "General Inquiry"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Additional Metadata / Survey fields if present */}
                {selectedLead.metadata && typeof selectedLead.metadata === 'object' && Object.keys(selectedLead.metadata as object).length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold border-b border-border/50 pb-2 flex items-center gap-2">
                      Submission Details
                    </h4>
                    <div className="grid gap-3 pt-2">
                      {Object.entries(selectedLead.metadata as Record<string, any>).map(([key, value]) => {
                        if (!value || key === 'service') return null; // Skip empty or already shown
                        return (
                          <div key={key} className="bg-background/20 p-3 rounded border border-border/30">
                            <p className="text-xs text-muted-foreground capitalize mb-1">{key.replace(/_/g, ' ')}</p>
                            <p className="text-sm">{String(value)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Editable Notes Section */}
                <div className="space-y-2 pt-4">
                  <h4 className="text-sm font-semibold border-b border-border/50 pb-2">
                    Admin Notes
                  </h4>
                  <Textarea 
                    placeholder="Add internal notes about this lead. Changes are saved automatically."
                    className="min-h-[150px] bg-background/50 resize-none border-border/50 focus-visible:ring-accent/50"
                    defaultValue={selectedLead.notes || ""}
                    onBlur={(e) => {
                      if (e.target.value !== selectedLead.notes) {
                        updateLead.mutate({
                          id: selectedLead.id,
                          updates: { notes: e.target.value }
                        });
                      }
                    }}
                  />
                  <p className="text-[10px] text-muted-foreground text-right">Click outside to save notes</p>
                </div>
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 h-full">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Inbox className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No lead selected</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Select a lead from the inbox to view their details, update their status, or add internal notes.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
