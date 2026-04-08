'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import CaseStudyEditor from "./CaseStudyEditor";
import {
  useCaseStudiesAdmin,
  useDeleteCaseStudy,
  useToggleFeatured,
  useTogglePublished,
  CaseStudyDB,
} from "@/hooks/useCaseStudies";

export const CaseStudiesTab = () => {
  const { data: caseStudies, isLoading } = useCaseStudiesAdmin();
  const deleteMutation = useDeleteCaseStudy();
  const toggleFeatured = useToggleFeatured();
  const togglePublished = useTogglePublished();
  
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudyDB | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMutation.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const handleToggleFeatured = (id: string, currentValue: boolean) => {
    toggleFeatured.mutate({ id, isFeatured: !currentValue });
  };

  const handleTogglePublished = (id: string, currentValue: boolean) => {
    togglePublished.mutate({ id, isPublished: !currentValue });
  };

  // Show editor if creating or editing
  if (isCreating || editingCaseStudy) {
    return (
      <CaseStudyEditor
        caseStudy={editingCaseStudy}
        onClose={() => {
          setEditingCaseStudy(null);
          setIsCreating(false);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Case Studies</h2>
          <p className="text-sm text-muted-foreground">
            {caseStudies?.length || 0} case studies
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Case Study
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {caseStudies?.length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">
              {caseStudies?.filter((cs) => cs.is_published).length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Published</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {caseStudies?.filter((cs) => !cs.is_published).length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Drafts</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">
              {caseStudies?.filter((cs) => cs.is_featured).length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Featured</p>
          </CardContent>
        </Card>
      </div>

      {/* Case Studies Table */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : caseStudies?.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No case studies yet</p>
              <Button onClick={() => setIsCreating(true)} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create your first case study
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Client</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseStudies?.map((caseStudy, idx) => (
                  <motion.tr
                    key={caseStudy.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-border/50"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{caseStudy.client}</p>
                        <p className="text-sm text-muted-foreground">
                          {caseStudy.title}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{caseStudy.sector}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {caseStudy.services.slice(0, 2).map((service) => (
                          <Badge
                            key={service}
                            variant="secondary"
                            className="text-xs"
                          >
                            {service}
                          </Badge>
                        ))}
                        {caseStudy.services.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{caseStudy.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={caseStudy.is_published}
                          onCheckedChange={() =>
                            handleTogglePublished(caseStudy.id, caseStudy.is_published)
                          }
                        />
                        {caseStudy.is_published ? (
                          <Eye className="h-4 w-4 text-green-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={caseStudy.is_featured}
                          onCheckedChange={() =>
                            handleToggleFeatured(caseStudy.id, caseStudy.is_featured)
                          }
                        />
                        {caseStudy.is_featured ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <StarOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingCaseStudy(caseStudy)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(caseStudy.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Case Study</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this case study? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CaseStudiesTab;

