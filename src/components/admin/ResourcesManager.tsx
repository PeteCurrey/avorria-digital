import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Sparkles, Mail, Loader2 } from "lucide-react";
import { useResources, useCreateResource, useUpdateResource, useDeleteResource } from "@/hooks/useResources";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = ["SEO", "Web Design", "Analytics", "Paid Media", "Strategy"];

const emptyResource = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  category: "SEO",
  reading_time: 5,
  service_relation: null as string | null,
  industry_relation: null as string | null,
  is_pillar: false,
  is_published: true,
  target_keyword: null as string | null,
  meta_title: null as string | null,
  meta_description: null as string | null,
  published_date: new Date().toISOString().split("T")[0],
};

const ResourcesManager = () => {
  const navigate = useNavigate();
  const { data: resources, isLoading } = useResources();
  const createResource = useCreateResource();
  const updateResource = useUpdateResource();
  const deleteResource = useDeleteResource();

  const [editOpen, setEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyResource);
  const [generating, setGenerating] = useState(false);

  const handleEdit = (resource: any) => {
    setEditingId(resource.id);
    setForm({
      title: resource.title,
      slug: resource.slug,
      summary: resource.summary,
      content: resource.content,
      category: resource.category,
      reading_time: resource.reading_time,
      service_relation: resource.service_relation,
      industry_relation: resource.industry_relation,
      is_pillar: resource.is_pillar,
      is_published: resource.is_published,
      target_keyword: resource.target_keyword,
      meta_title: resource.meta_title,
      meta_description: resource.meta_description,
      published_date: resource.published_date,
    });
    setEditOpen(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setForm(emptyResource);
    setEditOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateResource.mutateAsync({ id: editingId, updates: form });
        toast({ title: "Resource updated" });
      } else {
        await createResource.mutateAsync(form);
        toast({ title: "Resource created" });
      }
      setEditOpen(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this resource?")) return;
    try {
      await deleteResource.mutateAsync(id);
      toast({ title: "Resource deleted" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: {
          prompt: `Write a 1000-word marketing resource article for Avorria, a digital marketing agency. 
Category: ${form.category}. 
Topic: ${form.title || "A practical guide relevant to " + form.category}. 
Tone: Direct, opinionated, no fluff. Written for business owners, not marketers.
Format: Markdown with H2 and H3 headings.
Include actionable advice and specific examples.
End with a call to action to book a strategy call.`,
          content_type: "resource_article",
        },
      });
      if (error) throw error;
      const content = data?.content || data?.text || "";
      setForm((prev) => ({
        ...prev,
        content,
        reading_time: Math.max(5, Math.ceil(content.split(/\s+/).length / 200)),
      }));
      toast({ title: "Content generated", description: "Review and edit before publishing." });
    } catch (err: any) {
      toast({ title: "Generation failed", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const handleSendAsNewsletter = (resource: any) => {
    navigate(`/admin?tab=newsletter`, {
      state: {
        prefill: {
          subject: `New Guide: ${resource.title}`,
          content_json: {
            sections: [
              { type: "heading", text: resource.title },
              { type: "text", text: resource.summary },
              { type: "cta", text: "Read the Full Guide", url: `https://avorria.com/resources/${resource.slug}` },
            ],
          },
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {resources?.length || 0} resources in database
        </p>
        <Button variant="accent" onClick={handleNew}>
          <Plus className="mr-2 h-4 w-4" />
          New Resource
        </Button>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : !resources?.length ? (
            <div className="p-8 text-center text-muted-foreground">
              <p className="mb-2">No resources in the database yet.</p>
              <p className="text-sm">Static resources from the data file are still served on the website. Create database resources here to manage them from the admin panel.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Read Time</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium max-w-xs truncate">{r.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{r.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={r.is_published ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}>
                        {r.is_published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>{r.reading_time} min</TableCell>
                    <TableCell>{r.published_date}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(r)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleSendAsNewsletter(r)}>
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(r.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit / Create Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Resource" : "New Resource"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  placeholder="auto-generated-from-title"
                />
              </div>
            </div>

            <div>
              <Label>Summary</Label>
              <Textarea value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} rows={2} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Reading Time (min)</Label>
                <Input type="number" value={form.reading_time} onChange={(e) => setForm((p) => ({ ...p, reading_time: parseInt(e.target.value) || 5 }))} />
              </div>
              <div>
                <Label>Published Date</Label>
                <Input type="date" value={form.published_date || ""} onChange={(e) => setForm((p) => ({ ...p, published_date: e.target.value }))} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Meta Title</Label>
                <Input value={form.meta_title || ""} onChange={(e) => setForm((p) => ({ ...p, meta_title: e.target.value }))} />
              </div>
              <div>
                <Label>Target Keyword</Label>
                <Input value={form.target_keyword || ""} onChange={(e) => setForm((p) => ({ ...p, target_keyword: e.target.value }))} />
              </div>
            </div>

            <div>
              <Label>Meta Description</Label>
              <Input value={form.meta_description || ""} onChange={(e) => setForm((p) => ({ ...p, meta_description: e.target.value }))} />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.is_published} onCheckedChange={(v) => setForm((p) => ({ ...p, is_published: v }))} />
                <Label>Published</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_pillar} onCheckedChange={(v) => setForm((p) => ({ ...p, is_pillar: v }))} />
                <Label>Pillar Guide</Label>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Content (Markdown)</Label>
                <Button variant="outline" size="sm" onClick={handleGenerate} disabled={generating}>
                  {generating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  {generating ? "Generating..." : "Generate with AI"}
                </Button>
              </div>
              <Textarea
                value={form.content}
                onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                rows={16}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button variant="accent" onClick={handleSave} disabled={!form.title || !form.slug || !form.content}>
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourcesManager;
