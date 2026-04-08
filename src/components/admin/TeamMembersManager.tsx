'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Linkedin, Mail } from "lucide-react";
import {
  useTeamMembersAdmin, useCreateTeamMember, useUpdateTeamMember, useDeleteTeamMember,
  TeamMember, TeamMemberInsert,
} from "@/hooks/useTeamMembers";

interface FormData {
  full_name: string;
  title: string;
  bio: string;
  initials: string;
  photo_url: string;
  linkedin_url: string;
  email: string;
  phone: string;
  display_order: number;
  is_published: boolean;
}

const emptyForm: FormData = {
  full_name: "", title: "", bio: "", initials: "", photo_url: "",
  linkedin_url: "", email: "", phone: "", display_order: 0, is_published: true,
};

const TeamMembersManager = () => {
  const { data: members, isLoading } = useTeamMembersAdmin();
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember();
  const deleteMember = useDeleteTeamMember();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (m: TeamMember) => {
    setEditingId(m.id);
    setFormData({
      full_name: m.full_name, title: m.title, bio: m.bio, initials: m.initials,
      photo_url: m.photo_url || "", linkedin_url: m.linkedin_url || "",
      email: m.email || "", phone: m.phone || "",
      display_order: m.display_order, is_published: m.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: TeamMemberInsert = {
      full_name: formData.full_name, title: formData.title, bio: formData.bio,
      initials: formData.initials || formData.full_name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
      photo_url: formData.photo_url || null,
      linkedin_url: formData.linkedin_url || null,
      email: formData.email || null, phone: formData.phone || null,
      display_order: formData.display_order, is_published: formData.is_published,
    };
    if (editingId) {
      await updateMember.mutateAsync({ id: editingId, ...payload });
    } else {
      await createMember.mutateAsync(payload);
    }
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleDelete = async () => {
    if (deleteId) { await deleteMember.mutateAsync(deleteId); setDeleteId(null); }
  };

  if (isLoading) {
    return <Card><CardContent className="p-8 text-center text-muted-foreground">Loading team members...</CardContent></Card>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Team Members</h2>
          <p className="text-muted-foreground">Manage team members displayed on the About page</p>
        </div>
        <Button onClick={handleOpenCreate}><Plus className="w-4 h-4 mr-2" />Add Member</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Order</TableHead>
                <TableHead>Person</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Links</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No team members yet. Add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                members?.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.display_order}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {m.photo_url ? (
                          <img src={m.photo_url} alt={m.full_name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-sm font-semibold">
                            {m.initials}
                          </div>
                        )}
                        <span className="font-medium">{m.full_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{m.title}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {m.linkedin_url && <a href={m.linkedin_url} target="_blank" rel="noopener noreferrer"><Linkedin className="w-4 h-4 text-muted-foreground hover:text-accent" /></a>}
                        {m.email && <a href={`mailto:${m.email}`}><Mail className="w-4 h-4 text-muted-foreground hover:text-accent" /></a>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch checked={m.is_published} onCheckedChange={() => updateMember.mutate({ id: m.id, is_published: !m.is_published })} className="scale-75" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(m)}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(m.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Initials</Label>
                <Input value={formData.initials} onChange={(e) => setFormData({ ...formData, initials: e.target.value })} placeholder="Auto-generated" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Job Title *</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Bio *</Label>
              <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={4} required />
            </div>
            <ImageUploader label="Photo" value={formData.photo_url} onChange={(url) => setFormData({ ...formData, photo_url: url })} folder="team-photos" placeholder="Upload a headshot" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input value={formData.linkedin_url} onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="published" checked={formData.is_published} onCheckedChange={(c) => setFormData({ ...formData, is_published: c })} />
              <Label htmlFor="published">Published</Label>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createMember.isPending || updateMember.isPending}>
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team Member?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamMembersManager;

