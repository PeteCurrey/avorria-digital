import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Plus, Pencil, Trash2, ExternalLink, Loader2 } from "lucide-react";
import {
  useClientLogosAdmin,
  useCreateClientLogo,
  useUpdateClientLogo,
  useDeleteClientLogo,
  ClientLogoInsert,
} from "@/hooks/useClientLogos";

interface ClientLogoFormData {
  name: string;
  logo_url: string;
  website_url: string;
  is_published: boolean;
  display_order: number;
}

const emptyForm: ClientLogoFormData = {
  name: "",
  logo_url: "",
  website_url: "",
  is_published: true,
  display_order: 0,
};

export const ClientLogosTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ClientLogoFormData>(emptyForm);

  const { data: logos, isLoading } = useClientLogosAdmin();
  const createLogo = useCreateClientLogo();
  const updateLogo = useUpdateClientLogo();
  const deleteLogo = useDeleteClientLogo();

  const handleOpenCreate = () => {
    setFormData({
      ...emptyForm,
      display_order: (logos?.length || 0) + 1,
    });
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (logo: typeof logos extends (infer T)[] ? T : never) => {
    setFormData({
      name: logo.name,
      logo_url: logo.logo_url || "",
      website_url: logo.website_url || "",
      is_published: logo.is_published,
      display_order: logo.display_order,
    });
    setEditingId(logo.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    const payload: ClientLogoInsert = {
      name: formData.name,
      logo_url: formData.logo_url || null,
      website_url: formData.website_url || null,
      is_published: formData.is_published,
      display_order: formData.display_order,
    };

    if (editingId) {
      await updateLogo.mutateAsync({ id: editingId, ...payload });
    } else {
      await createLogo.mutateAsync(payload);
    }

    setIsDialogOpen(false);
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteLogo.mutateAsync(deletingId);
      setDeletingId(null);
    }
  };

  const handleTogglePublished = async (id: string, currentValue: boolean) => {
    await updateLogo.mutateAsync({ id, is_published: !currentValue });
  };

  // Generate initials from company name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Manage client logos displayed on the home page
        </p>
        <Button onClick={handleOpenCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Logo
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Order</TableHead>
            <TableHead className="w-20">Logo</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Website</TableHead>
            <TableHead className="w-24">Published</TableHead>
            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logos?.map((logo) => (
            <TableRow key={logo.id}>
              <TableCell className="font-medium">{logo.display_order}</TableCell>
              <TableCell>
                {logo.logo_url ? (
                  <img
                    src={logo.logo_url}
                    alt={logo.name}
                    className="w-10 h-10 rounded-lg object-contain bg-muted"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {getInitials(logo.name)}
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{logo.name}</TableCell>
              <TableCell>
                {logo.website_url ? (
                  <a
                    href={logo.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="truncate max-w-[200px]">
                      {logo.website_url.replace(/^https?:\/\//, "")}
                    </span>
                  </a>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )}
              </TableCell>
              <TableCell>
                <Switch
                  checked={logo.is_published}
                  onCheckedChange={() =>
                    handleTogglePublished(logo.id, logo.is_published)
                  }
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenEdit(logo)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingId(logo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {logos?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No client logos yet. Add your first one!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Client Logo" : "Add Client Logo"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the client logo details"
                : "Add a new client logo to display on the home page"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Acme Corporation"
              />
            </div>

            <ImageUploader
              label="Logo Image"
              value={formData.logo_url}
              onChange={(url) => setFormData({ ...formData, logo_url: url })}
              folder="client-logos"
              placeholder="Upload or paste logo URL"
            />

            <div className="space-y-2">
              <Label htmlFor="website_url">Website URL (optional)</Label>
              <Input
                id="website_url"
                value={formData.website_url}
                onChange={(e) =>
                  setFormData({ ...formData, website_url: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    display_order: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_published">Published</Label>
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_published: checked })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                !formData.name ||
                createLogo.isPending ||
                updateLogo.isPending
              }
            >
              {createLogo.isPending || updateLogo.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : editingId ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Client Logo</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this client logo? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLogo.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
