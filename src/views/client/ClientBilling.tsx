import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMyInvoices } from "@/hooks/useInvoices";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Receipt, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  CreditCard,
  PoundSterling
} from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: Clock },
  sent: { label: "Awaiting Payment", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock },
  paid: { label: "Paid", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertTriangle },
  cancelled: { label: "Cancelled", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: Clock },
};

const ClientBilling = () => {
  const { impersonatedClient } = useAuth();
  const clientName = impersonatedClient || "Your Company";
  const { data: invoices, isLoading } = useMyInvoices();

  // Calculate totals
  const totalPaid = invoices?.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
  const totalOutstanding = invoices?.filter(inv => inv.status === "sent" || inv.status === "overdue").reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
  const overdueCount = invoices?.filter(inv => inv.status === "overdue").length || 0;

  return (
    <>
      
        <title>Billing - Client Portal</title>
      

      <AppShell
        type="client"
        userName="Sarah Mitchell"
        userRole="Marketing Director"
        clientName={clientName}
      >
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Billing & Invoices</h1>
            <p className="text-muted-foreground">
              View and manage your invoices and payment history.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">Total Paid</span>
                </div>
                <p className="text-2xl font-light text-foreground">
                  Â£{totalPaid.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Outstanding</span>
                </div>
                <p className="text-2xl font-light text-foreground">
                  Â£{totalOutstanding.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-muted-foreground">Overdue</span>
                </div>
                <p className="text-2xl font-light text-foreground">
                  {overdueCount} invoice{overdueCount !== 1 ? "s" : ""}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Invoices Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : invoices?.length === 0 ? (
                <div className="text-center py-12">
                  <Receipt className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No invoices yet</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices?.map((invoice) => {
                      const status = statusConfig[invoice.status];
                      const StatusIcon = status.icon;
                      const isPayable = invoice.status === "sent" || invoice.status === "overdue";

                      return (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-mono text-sm">
                            {invoice.invoice_number}
                          </TableCell>
                          <TableCell>
                            {invoice.project?.name || "â€”"}
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-1">
                              <PoundSterling className="h-3 w-3" />
                              {Number(invoice.amount).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(invoice.issue_date), "MMM d, yyyy")}
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
                            <div className="flex items-center justify-end gap-2">
                              {invoice.pdf_url && (
                                <a href={invoice.pdf_url} target="_blank" rel="noopener noreferrer">
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </a>
                              )}
                              {isPayable && (
                                <Button size="sm" variant="default">
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Pay Now
                                </Button>
                              )}
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
      </AppShell>
    </>
  );
};

export default ClientBilling;
