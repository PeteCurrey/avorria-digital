'use client';
import React, { useState } from "react";
import { useAllInvoices, useCreateInvoice, useUpdateInvoice, useDeleteInvoice, useInvoiceStats, generateInvoiceNumber } from "@/hooks/useInvoices";
import { useAllProjects } from "@/hooks/useClientProjects";
import { useClients } from "@/hooks/useClients";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Trash2, 
  Pencil,
  Receipt,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PoundSterling,
  Send
} from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: Clock },
  sent: { label: "Sent", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Send },
  paid: { label: "Paid", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertTriangle },
  cancelled: { label: "Cancelled", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: Clock },
};

const InvoiceManager = () => {
  const { data: invoices, isLoading } = useAllInvoices();
  const { data: stats } = useInvoiceStats();
  const { data: clients } = useClients();
  const { data: projects } = useAllProjects();
  const createInvoice = useCreateInvoice();
  const updateInvoice = useUpdateInvoice();
  const deleteInvoice = useDeleteInvoice();

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    client_id: "",
    project_id: "",
    invoice_number: generateInvoiceNumber(),
    amount: "",
    currency: "GBP",
    status: "draft" as const,
    due_date: "",
    notes: "",
  });

  const resetForm = () => {
    setFormData({
      client_id: "",
      project_id: "",
      invoice_number: generateInvoiceNumber(),
      amount: "",
      currency: "GBP",
      status: "draft",
      due_date: "",
      notes: "",
    });
    setEditingInvoice(null);
  };

  const handleSubmit = async () => {
    if (!formData.client_id || !formData.amount || !formData.due_date) return;

    const client = clients?.find(c => c.id === formData.client_id);
    const user_id = client?.owner_id || "";

    if (editingInvoice) {
      await updateInvoice.mutateAsync({
        id: editingInvoice,
        updates: {
          ...formData,
          amount: parseFloat(formData.amount),
          project_id: formData.project_id || undefined,
        },
      });
    } else {
      await createInvoice.mutateAsync({
        ...formData,
        user_id,
        amount: parseFloat(formData.amount),
        project_id: formData.project_id || undefined,
        line_items: [],
      });
    }

    resetForm();
    setIsCreateOpen(false);
  };

  const handleEdit = (invoice: any) => {
    setFormData({
      client_id: invoice.client_id,
      project_id: invoice.project_id || "",
      invoice_number: invoice.invoice_number,
      amount: invoice.amount.toString(),
      currency: invoice.currency,
      status: invoice.status,
      due_date: invoice.due_date,
      notes: invoice.notes || "",
    });
    setEditingInvoice(invoice.id);
    setIsCreateOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      await deleteInvoice.mutateAsync(id);
    }
  };

  const handleMarkAsSent = async (invoice: any) => {
    await updateInvoice.mutateAsync({
      id: invoice.id,
      updates: { status: "sent" },
    });
  };

  const handleMarkAsPaid = async (invoice: any) => {
    await updateInvoice.mutateAsync({
      id: invoice.id,
      updates: { status: "paid" },
    });
  };

  const filteredInvoices = invoices?.filter(invoice =>
    invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.client?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clientProjects = formData.client_id 
    ? projects?.filter(p => p.client_id === formData.client_id) 
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingInvoice ? "Edit Invoice" : "Create New Invoice"}</DialogTitle>
              <DialogDescription>
                {editingInvoice ? "Update invoice details" : "Create a new invoice for a client"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Select
                    value={formData.client_id}
                    onValueChange={(value) => setFormData({ ...formData, client_id: value, project_id: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
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
                  <Label>Project (Optional)</Label>
                  <Select
                    value={formData.project_id}
                    onValueChange={(value) => setFormData({ ...formData, project_id: value })}
                    disabled={!formData.client_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientProjects?.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Invoice Number</Label>
                  <Input
                    value={formData.invoice_number}
                    onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
                    disabled={!!editingInvoice}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount (£)</Label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Payment terms, additional information..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!formData.client_id || !formData.amount || !formData.due_date}
              >
                {editingInvoice ? "Save Changes" : "Create Invoice"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Receipt className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <p className="text-xl font-bold">£{(stats?.totalValue || 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{stats?.total || 0} invoices</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-xs text-muted-foreground">Paid</span>
            </div>
            <p className="text-xl font-bold text-green-500">£{(stats?.paidValue || 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{stats?.paid || 0} invoices</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Outstanding</span>
            </div>
            <p className="text-xl font-bold text-yellow-500">£{(stats?.outstandingValue || 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{stats?.outstanding || 0} invoices</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Overdue</span>
            </div>
            <p className="text-xl font-bold text-red-500">£{(stats?.overdueValue || 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{stats?.overdue || 0} invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading invoices...</div>
          ) : filteredInvoices?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No invoices found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices?.map((invoice) => {
                  const status = statusConfig[invoice.status];
                  const StatusIcon = status.icon;
                  return (
                    <TableRow key={invoice.id} className="border-border/50">
                      <TableCell className="font-mono text-sm">
                        {invoice.invoice_number}
                      </TableCell>
                      <TableCell>{invoice.client?.name || "€”"}</TableCell>
                      <TableCell>{invoice.project?.name || "€”"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 font-medium">
                          <PoundSterling className="h-3 w-3" />
                          {Number(invoice.amount).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(invoice.due_date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {invoice.status === "draft" && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleMarkAsSent(invoice)}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send
                            </Button>
                          )}
                          {invoice.status === "sent" && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleMarkAsPaid(invoice)}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Mark Paid
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEdit(invoice)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceManager;


