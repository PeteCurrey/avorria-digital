'use client';
import Link from "next/link";
import React, { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  ExternalLink,
  Trash2,
  RefreshCw,
  Mail,
  MailCheck,
  Search,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { useAuditReports, useDeleteAuditReport, useAuditReportStats } from "@/hooks/useAuditReports";
import { toast } from "@/hooks/use-toast";

const AuditReportsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: audits, isLoading, refetch } = useAuditReports();
  const { data: stats } = useAuditReportStats();
  const deleteAudit = useDeleteAuditReport();

  const filteredAudits = audits?.filter(
    (audit) =>
      audit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.website_url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-muted-foreground";
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBadge = (score: number | null) => {
    if (!score) return <Badge variant="outline">N/A</Badge>;
    if (score >= 80)
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          {score}/100
        </Badge>
      );
    if (score >= 60)
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          {score}/100
        </Badge>
      );
    if (score >= 40)
      return (
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
          {score}/100
        </Badge>
      );
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        {score}/100
      </Badge>
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAudit.mutateAsync(id);
      toast({
        title: "Audit Deleted",
        description: "The audit report has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete audit report.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    if (audits && audits.length > 0) {
      const csv = [
        [
          "Date",
          "Name",
          "Email",
          "Company",
          "Website",
          "Score",
          "Email Sent",
          "Report URL",
        ],
        ...audits.map((audit) => [
          format(new Date(audit.created_at), "yyyy-MM-dd HH:mm"),
          audit.name,
          audit.email,
          audit.company_name,
          audit.website_url,
          audit.overall_score?.toString() || "N/A",
          audit.email_sent ? "Yes" : "No",
          audit.report_url || "",
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-reports-${format(new Date(), "yyyy-MM-dd")}.csv`;
      a.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <FileText className="h-5 w-5 mx-auto mb-2 text-primary/70" />
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {stats?.total || 0}
            </motion.p>
            <p className="text-sm text-muted-foreground">Total Audits</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-5 w-5 mx-auto mb-2 text-green-400" />
            <motion.p
              className="text-2xl font-bold text-green-400"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {stats?.thisWeek || 0}
            </motion.p>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-5 w-5 mx-auto mb-2 text-accent" />
            <motion.p
              className="text-2xl font-bold text-accent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {stats?.avgScore || 0}
            </motion.p>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <MailCheck className="h-5 w-5 mx-auto mb-2 text-purple-400" />
            <motion.p
              className="text-2xl font-bold text-purple-400"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {stats?.emailsSent || 0}
            </motion.p>
            <p className="text-sm text-muted-foreground">Emails Sent</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search audits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-border/50"
            onClick={handleExport}
            disabled={!audits?.length}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            className="border-border/50"
            onClick={() => refetch()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Audits Table */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : !filteredAudits?.length ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">No audit reports found</p>
              <p className="text-sm text-muted-foreground">
                Audits will appear here when visitors request them via the free
                audit tool.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Date</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAudits.map((audit, idx) => (
                  <motion.tr
                    key={audit.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-border/50"
                  >
                    <TableCell>
                      <div className="text-sm">
                        {format(new Date(audit.created_at), "MMM d, yyyy")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(audit.created_at), "HH:mm")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{audit.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {audit.email}
                      </div>
                    </TableCell>
                    <TableCell>{audit.company_name}</TableCell>
                    <TableCell>
                      <a
                        href={
                          audit.website_url.startsWith("http")
                            ? audit.website_url
                            : `https://${audit.website_url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline inline-flex items-center gap-1"
                      >
                        {audit.website_url.replace(/^https?:\/\//, "").slice(0, 30)}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>
                    <TableCell>{getScoreBadge(audit.overall_score)}</TableCell>
                    <TableCell>
                      {audit.email_sent ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <MailCheck className="h-3 w-3 mr-1" />
                          Sent
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground"
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Not Sent
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {audit.report_url && (
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="h-8 w-8"
                          >
                            <a
                              href={audit.report_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Audit Report</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this audit report for{" "}
                                {audit.company_name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(audit.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditReportsTab;


