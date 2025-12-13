import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Star, 
  Eye, 
  EyeOff,
  Search,
  FileText,
  ExternalLink,
  Loader2,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCaseStudiesAdmin,
  useDeleteCaseStudy,
  useToggleFeatured,
  useTogglePublished,
  CaseStudyDB,
} from "@/hooks/useCaseStudies";
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
import CaseStudyEditor from "@/components/admin/CaseStudyEditor";

const PlatformCaseStudies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingStudy, setEditingStudy] = useState<CaseStudyDB | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: caseStudies, isLoading, error } = useCaseStudiesAdmin();
  const deleteMutation = useDeleteCaseStudy();
  const toggleFeatured = useToggleFeatured();
  const togglePublished = useTogglePublished();

  const filteredStudies = caseStudies?.filter(
    (study) =>
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const getSectorColor = (sector: string) => {
    const colors: Record<string, string> = {
      "Facilities Management": "bg-blue-500/10 text-blue-600 border-blue-500/20",
      "Crane Hire & Specialist Lifting": "bg-orange-500/10 text-orange-600 border-orange-500/20",
      "Classic & Prestige Automotive": "bg-purple-500/10 text-purple-600 border-purple-500/20",
      "Automotive Electrics & Diagnostics": "bg-green-500/10 text-green-600 border-green-500/20",
      "Vehicle Repairs & Diagnostics": "bg-red-500/10 text-red-600 border-red-500/20",
    };
    return colors[sector] || "bg-gray-500/10 text-gray-600 border-gray-500/20";
  };

  if (editingStudy || isCreating) {
    return (
      <CaseStudyEditor
        caseStudy={editingStudy}
        onClose={() => {
          setEditingStudy(null);
          setIsCreating(false);
        }}
      />
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Helmet>
          <title>Case Studies Manager - Avorria Growth Platform</title>
        </Helmet>
        <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div className="text-center">
              <p className="text-destructive font-medium mb-1">Failed to load case studies</p>
              <p className="text-sm text-muted-foreground">Please check your permissions and try again.</p>
            </div>
            <Button variant="outline" onClick={() => window.location.reload()} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </AppShell>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Case Studies Manager - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-light text-foreground mb-2">Case Studies</h1>
              <p className="text-muted-foreground">
                Manage your portfolio of case studies
              </p>
            </div>
            <Button onClick={() => setIsCreating(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Case Study
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                {isLoading ? (
                  <Skeleton className="h-8 w-12 mb-1" />
                ) : (
                  <div className="text-2xl font-bold">{caseStudies?.length || 0}</div>
                )}
                <p className="text-sm text-muted-foreground">Total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                {isLoading ? (
                  <Skeleton className="h-8 w-12 mb-1" />
                ) : (
                  <div className="text-2xl font-bold">
                    {caseStudies?.filter((s) => s.is_published).length || 0}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">Published</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                {isLoading ? (
                  <Skeleton className="h-8 w-12 mb-1" />
                ) : (
                  <div className="text-2xl font-bold">
                    {caseStudies?.filter((s) => s.is_featured).length || 0}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">Featured</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                {isLoading ? (
                  <Skeleton className="h-8 w-12 mb-1" />
                ) : (
                  <div className="text-2xl font-bold">
                    {caseStudies?.filter((s) => !s.is_published).length || 0}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">Drafts</p>
              </CardContent>
            </Card>
          </div>

          {/* Case Studies List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">All Case Studies</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                      <Skeleton className="w-24 h-16 rounded shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-4 w-32" />
                        <div className="flex gap-2">
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredStudies?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery
                    ? "No case studies match your search"
                    : "No case studies yet. Create your first one!"}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredStudies?.map((study) => (
                    <div
                      key={study.id}
                      className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      {/* Thumbnail */}
                      <div className="w-24 h-16 rounded overflow-hidden bg-muted shrink-0">
                        <img
                          src={study.hero_media_src}
                          alt={study.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-foreground mb-1 line-clamp-1">
                              {study.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {study.client} • {study.year}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {/* Featured Toggle */}
                            <div className="flex items-center gap-2">
                              <Star
                                className={`h-4 w-4 ${
                                  study.is_featured
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                              <Switch
                                checked={study.is_featured}
                                onCheckedChange={(checked) =>
                                  toggleFeatured.mutate({
                                    id: study.id,
                                    isFeatured: checked,
                                  })
                                }
                              />
                            </div>

                            {/* Published Toggle */}
                            <div className="flex items-center gap-2 ml-4">
                              {study.is_published ? (
                                <Eye className="h-4 w-4 text-green-500" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                              <Switch
                                checked={study.is_published}
                                onCheckedChange={(checked) =>
                                  togglePublished.mutate({
                                    id: study.id,
                                    isPublished: checked,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={getSectorColor(study.sector)}>
                            {study.sector}
                          </Badge>
                          {study.services.slice(0, 2).map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {study.services.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{study.services.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(`/case-studies/${study.slug}`, '_blank')}
                          title="View"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingStudy(study)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(study.id)}
                          className="text-destructive hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

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
      </AppShell>
    </>
  );
};

export default PlatformCaseStudies;
