'use client';
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  Edit, 
  Zap,
  Clock,
  Calendar,
  Hash,
  Loader2,
  Sparkles,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Mail,
  FileText
} from "lucide-react";
import { 
  useContentRecipes, 
  useCreateRecipe, 
  useUpdateRecipe, 
  useDeleteRecipe, 
  useToggleRecipe,
  useRunRecipe,
  ContentRecipe,
  CreateRecipeInput
} from "@/hooks/useContentRecipes";
import { formatDistanceToNow } from "date-fns";

const platformIcons: Record<string, React.ElementType> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  email: Mail,
  blog: FileText,
};

const frequencyOptions = [
  { value: "hourly", label: "Every Hour" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const contentTypeOptions = [
  { value: "social", label: "Social Media" },
  { value: "blog", label: "Blog Post" },
  { value: "email", label: "Email" },
];

const platformOptions: Record<string, { value: string; label: string }[]> = {
  social: [
    { value: "twitter", label: "Twitter/X" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
  ],
  blog: [{ value: "blog", label: "Blog" }],
  email: [{ value: "email", label: "Email Newsletter" }],
};

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "conversational", label: "Conversational" },
  { value: "inspirational", label: "Inspirational" },
  { value: "educational", label: "Educational" },
  { value: "witty", label: "Witty" },
];

interface RecipeFormData {
  name: string;
  description: string;
  content_type: string;
  platform: string;
  topics: string;
  tone: string;
  frequency: string;
  posts_per_run: number;
}

const defaultFormData: RecipeFormData = {
  name: "",
  description: "",
  content_type: "social",
  platform: "linkedin",
  topics: "",
  tone: "professional",
  frequency: "daily",
  posts_per_run: 3,
};

export function ContentRecipeManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<ContentRecipe | null>(null);
  const [formData, setFormData] = useState<RecipeFormData>(defaultFormData);

  const { data: recipes, isLoading } = useContentRecipes();
  const createRecipe = useCreateRecipe();
  const updateRecipe = useUpdateRecipe();
  const deleteRecipe = useDeleteRecipe();
  const toggleRecipe = useToggleRecipe();
  const runRecipe = useRunRecipe();

  const handleOpenDialog = (recipe?: ContentRecipe) => {
    if (recipe) {
      setEditingRecipe(recipe);
      setFormData({
        name: recipe.name,
        description: recipe.description || "",
        content_type: recipe.content_type,
        platform: recipe.platform || "linkedin",
        topics: Array.isArray(recipe.topics) ? recipe.topics.join(", ") : "",
        tone: recipe.tone,
        frequency: recipe.frequency,
        posts_per_run: recipe.posts_per_run,
      });
    } else {
      setEditingRecipe(null);
      setFormData(defaultFormData);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    const input: CreateRecipeInput = {
      name: formData.name,
      description: formData.description || undefined,
      content_type: formData.content_type,
      platform: formData.platform,
      topics: formData.topics.split(",").map((t) => t.trim()).filter(Boolean),
      tone: formData.tone,
      frequency: formData.frequency,
      posts_per_run: formData.posts_per_run,
    };

    if (editingRecipe) {
      await updateRecipe.mutateAsync({ id: editingRecipe.id, updates: input });
    } else {
      await createRecipe.mutateAsync(input);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      await deleteRecipe.mutateAsync(id);
    }
  };

  const handleToggle = async (recipe: ContentRecipe) => {
    await toggleRecipe.mutateAsync({ id: recipe.id, is_active: !recipe.is_active });
  };

  const handleRunNow = async (recipeId: string) => {
    await runRecipe.mutateAsync(recipeId);
  };

  const PlatformIcon = ({ platform }: { platform: string }) => {
    const Icon = platformIcons[platform] || Hash;
    return <Icon className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Content Recipes</h3>
          <p className="text-sm text-muted-foreground">
            Configure automated content generation rules
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              New Recipe
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingRecipe ? "Edit Recipe" : "Create Content Recipe"}
              </DialogTitle>
              <DialogDescription>
                Define what content to generate automatically
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Recipe Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Daily LinkedIn Tips"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What type of content should be generated?"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <Select
                    value={formData.content_type}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        content_type: value,
                        platform: platformOptions[value]?.[0]?.value || "",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypeOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) =>
                      setFormData({ ...formData, platform: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {platformOptions[formData.content_type]?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topics">Topics (comma-separated)</Label>
                <Input
                  id="topics"
                  placeholder="e.g., SEO, digital marketing, web design"
                  value={formData.topics}
                  onChange={(e) =>
                    setFormData({ ...formData, topics: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select
                    value={formData.tone}
                    onValueChange={(value) =>
                      setFormData({ ...formData, tone: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) =>
                      setFormData({ ...formData, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="posts_per_run">Posts Per Run</Label>
                <Input
                  id="posts_per_run"
                  type="number"
                  min={1}
                  max={10}
                  value={formData.posts_per_run}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      posts_per_run: parseInt(e.target.value) || 3,
                    })
                  }
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.name || createRecipe.isPending || updateRecipe.isPending}
                >
                  {createRecipe.isPending || updateRecipe.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {editingRecipe ? "Update Recipe" : "Create Recipe"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {recipes?.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No recipes yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first content recipe to start generating content automatically
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Create Recipe
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {recipes?.map((recipe) => (
            <Card key={recipe.id} className={!recipe.is_active ? "opacity-60" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <PlatformIcon platform={recipe.platform || ""} />
                    <CardTitle className="text-base">{recipe.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={recipe.is_active}
                      onCheckedChange={() => handleToggle(recipe)}
                    />
                  </div>
                </div>
                {recipe.description && (
                  <CardDescription>{recipe.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {recipe.content_type}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="mr-1 h-3 w-3" />
                    {recipe.frequency}
                  </Badge>
                  <Badge variant="outline">
                    {recipe.posts_per_run} posts/run
                  </Badge>
                </div>

                {Array.isArray(recipe.topics) && recipe.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {recipe.topics.slice(0, 3).map((topic, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {recipe.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{recipe.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {recipe.last_run_at && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Last run: {formatDistanceToNow(new Date(recipe.last_run_at), { addSuffix: true })}
                  </p>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRunNow(recipe.id)}
                    disabled={runRecipe.isPending}
                  >
                    {runRecipe.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Zap className="mr-2 h-4 w-4" />
                    )}
                    Run Now
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleOpenDialog(recipe)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


