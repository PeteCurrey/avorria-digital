import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";
import {
  FileText,
  Download,
  Mail,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Play,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Eye,
  BarChart3,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  useScheduledReports,
  useGeneratedReports,
  useCreateScheduledReport,
  useUpdateScheduledReport,
  useDeleteScheduledReport,
  useGenerateReport,
  ScheduledReport,
} from "@/hooks/useScheduledReports";
import { useLeadsAdmin, useLeadStats } from "@/hooks/useLeads";
import { useLatestAnalyticsSnapshot } from "@/hooks/useAnalyticsSnapshots";

const ReportGenerator = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const { data: scheduledReports, isLoading: reportsLoading } = useScheduledReports();
  const { data: generatedReports, isLoading: generatedLoading } = useGeneratedReports();
  const { data: leads } = useLeadsAdmin();
  const { data: leadStats } = useLeadStats();
  const { data: analyticsSnapshot } = useLatestAnalyticsSnapshot();

  const createReport = useCreateScheduledReport();
  const updateReport = useUpdateScheduledReport();
  const deleteReport = useDeleteScheduledReport();
  const generateReport = useGenerateReport();

  const [newReport, setNewReport] = useState({
    name: "",
    report_type: "weekly_summary",
    schedule: "weekly",
    recipients: "",
  });

  const handleCreate = () => {
    createReport.mutate({
      name: newReport.name,
      report_type: newReport.report_type,
      schedule: newReport.schedule,
      recipients: newReport.recipients.split(",").map((e) => e.trim()).filter(Boolean),
      is_active: true,
    });
    setIsCreateOpen(false);
    setNewReport({ name: "", report_type: "weekly_summary", schedule: "weekly", recipients: "" });
  };

  const handleGenerateNow = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await generateReport.mutateAsync("weekly_summary");
      setGenerationProgress(100);
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
      }, 1000);
    }
  };

  // Current metrics preview
  const currentMetrics = {
    totalLeads: leads?.length || 0,
    newLeads: leadStats?.byStatus?.new || 0,
    convertedLeads: leadStats?.byStatus?.converted || 0,
    pageViews: analyticsSnapshot?.page_views || 0,
    uniqueVisitors: analyticsSnapshot?.unique_visitors || 0,
    bounceRate: analyticsSnapshot?.bounce_rate || 0,
  };

  return (
    <div className="space-y-6">
      {/* Report Preview Section */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Weekly Report Preview
              </CardTitle>
              <CardDescription>
                Current metrics that will be included in the next report
              </CardDescription>
            </div>
            <Button
              onClick={handleGenerateNow}
              disabled={isGenerating}
              className="bg-primary hover:bg-primary/90"
            >
              {isGenerating ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Generate Now
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isGenerating && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Generating report...</span>
                <span className="text-sm font-medium">{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <motion.div
              className="bg-muted/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentMetrics.totalLeads}</p>
              <p className="text-xs text-muted-foreground">Total Leads</p>
            </motion.div>

            <motion.div
              className="bg-muted/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentMetrics.newLeads}</p>
              <p className="text-xs text-muted-foreground">New Leads</p>
            </motion.div>

            <motion.div
              className="bg-muted/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CheckCircle className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentMetrics.convertedLeads}</p>
              <p className="text-xs text-muted-foreground">Converted</p>
            </motion.div>

            <motion.div
              className="bg-muted/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Eye className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentMetrics.pageViews.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Page Views</p>
            </motion.div>

            <motion.div
              className="bg-muted/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Users className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentMetrics.uniqueVisitors.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Visitors</p>
            </motion.div>

            <motion.div
              className="bg-muted/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <BarChart3 className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentMetrics.bounceRate}%</p>
              <p className="text-xs text-muted-foreground">Bounce Rate</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Scheduled Reports
            </CardTitle>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Automated Report</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Report Name</Label>
                    <Input
                      value={newReport.name}
                      onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                      placeholder="Weekly Performance Summary"
                    />
                  </div>

                  <div>
                    <Label>Report Type</Label>
                    <Select
                      value={newReport.report_type}
                      onValueChange={(v) => setNewReport({ ...newReport, report_type: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly_summary">Weekly Summary</SelectItem>
                        <SelectItem value="monthly_summary">Monthly Summary</SelectItem>
                        <SelectItem value="lead_report">Lead Report</SelectItem>
                        <SelectItem value="seo_report">SEO Performance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Schedule</Label>
                    <Select
                      value={newReport.schedule}
                      onValueChange={(v) => setNewReport({ ...newReport, schedule: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Recipients (comma-separated emails)</Label>
                    <Input
                      value={newReport.recipients}
                      onChange={(e) => setNewReport({ ...newReport, recipients: e.target.value })}
                      placeholder="team@company.com, manager@company.com"
                    />
                  </div>

                  <Button
                    onClick={handleCreate}
                    disabled={!newReport.name || !newReport.recipients || createReport.isPending}
                    className="w-full"
                  >
                    {createReport.isPending ? "Creating..." : "Create Schedule"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {reportsLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : scheduledReports && scheduledReports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.report_type.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell className="capitalize">{report.schedule}</TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        {report.recipients.length} recipient{report.recipients.length !== 1 && "s"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={report.is_active}
                        onCheckedChange={(checked) =>
                          updateReport.mutate({ id: report.id, is_active: checked })
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteReport.mutate(report.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No scheduled reports yet</p>
              <p className="text-sm">Create a schedule to automatically send reports</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Reports History */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Report History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : generatedReports && generatedReports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Sent To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        {report.report_type.replace("_", " ")}
                      </div>
                    </TableCell>
                    <TableCell>
                      {report.period_start && report.period_end
                        ? `${format(new Date(report.period_start), "MMM d")} - ${format(
                            new Date(report.period_end),
                            "MMM d"
                          )}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(report.generated_at), "MMM d, yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      {report.sent_to?.length || 0} recipient
                      {(report.sent_to?.length || 0) !== 1 && "s"}
                    </TableCell>
                    <TableCell className="text-right">
                      {report.file_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={report.file_url} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No reports generated yet</p>
              <p className="text-sm">Click "Generate Now" to create your first report</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportGenerator;
