import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "@/components/admin/ImageUploader";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Quote, Star } from "lucide-react";
import {
  useTestimonialsAdmin,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
  Testimonial,
  TestimonialInsert,
} from "@/hooks/useTestimonials";

interface TestimonialFormData {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar_url: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
}

const emptyForm: TestimonialFormData = {
  quote: "",
  author: "",
  role: "",
  company: "",
  avatar_url: "",
  is_featured: false,
  is_published: true,
  display_order: 0,
};

export const TestimonialsTab = () => {
  const { data: testimonials, isLoading } = useTestimonialsAdmin();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>(emptyForm);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      quote: testimonial.quote,
      author: testimonial.author,
      role: testimonial.role,
      company: testimonial.company,
      avatar_url: testimonial.avatar_url || "",
      is_featured: testimonial.is_featured,
      is_published: testimonial.is_published,
      display_order: testimonial.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload: TestimonialInsert = {
      quote: formData.quote,
      author: formData.author,
      role: formData.role,
      company: formData.company,
      avatar_url: formData.avatar_url || null,
      is_featured: formData.is_featured,
      is_published: formData.is_published,
      display_order: formData.display_order,
    };

    if (editingId) {
      await updateTestimonial.mutateAsync({ id: editingId, ...payload });
    } else {
      await createTestimonial.mutateAsync(payload);
    }

    setIsDialogOpen(false);
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteTestimonial.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const handleTogglePublished = async (testimonial: Testimonial) => {
    await updateTestimonial.mutateAsync({
      id: testimonial.id,
      is_published: !testimonial.is_published,
    });
  };

  const handleToggleFeatured = async (testimonial: Testimonial) => {
    await updateTestimonial.mutateAsync({
      id: testimonial.id,
      is_featured: !testimonial.is_featured,
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Loading testimonials...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <p className="text-muted-foreground">
            Manage client testimonials displayed on the website
          </p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Order</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="max-w-[300px]">Quote</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No testimonials yet. Add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                testimonials?.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell className="font-medium">
                      {testimonial.display_order}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {testimonial.avatar_url ? (
                          <img
                            src={testimonial.avatar_url}
                            alt={testimonial.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <Quote className="w-4 h-4 text-accent" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{testimonial.company}</TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="truncate text-sm text-muted-foreground">
                        "{testimonial.quote}"
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={testimonial.is_published}
                            onCheckedChange={() => handleTogglePublished(testimonial)}
                            className="scale-75"
                          />
                          <span className="text-xs">
                            {testimonial.is_published ? "Published" : "Draft"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={testimonial.is_featured}
                            onCheckedChange={() => handleToggleFeatured(testimonial)}
                            className="scale-75"
                          />
                          <span className="text-xs flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Featured
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(testimonial)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(testimonial.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quote">Quote *</Label>
              <Textarea
                id="quote"
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="What did the client say?"
                required
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author Name *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="CEO"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Inc"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>

            <ImageUploader
              label="Avatar Image"
              value={formData.avatar_url}
              onChange={(url) => setFormData({ ...formData, avatar_url: url })}
              folder="testimonials"
              placeholder="Upload a client photo"
            />

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createTestimonial.isPending || updateTestimonial.isPending}
              >
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The testimonial will be permanently deleted.
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
