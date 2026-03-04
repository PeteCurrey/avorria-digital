import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ContentRecipeManager } from "./ContentRecipeManager";
import {
  usePendingReviewContent,
  useApprovedContent,
  useScheduledContent,
  useApproveContent,
  useRejectContent,
  useUpdateContent,
  useDeleteContent,
  useSaveGeneratedContent,
  useMarkPublished,
} from "@/hooks/useAIGeneratedContent";
import {
  Sparkles,
  Wand2,
  Image as ImageIcon,
  Copy,
  Check,
  RefreshCw,
  Calendar,
  Send,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Mail,
  FileText,
  Loader2,
  Eye,
  Edit3,
  Save,
  Trash2,
  Clock,
  Hash,
  Target,
  Palette,
  Settings2,
  ThumbsDown,
  Zap,
  Link2,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface GeneratedContent {
  id: string;
  type: string;
  platform: string;
  content: string;
  title?: string;
  hashtags?: string[];
  imageUrl?: string;
  isGeneratingImage?: boolean;
  status: "draft" | "review" | "approved" | "scheduled";
}

const ContentStudio = () => {
  const [activeTab, setActiveTab] = useState("generate");
  const [contentType, setContentType] = useState<string>("social");
  const [platform, setPlatform] = useState<string>("linkedin");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [targetAudience, setTargetAudience] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [generateImage, setGenerateImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bulkCount, setBulkCount] = useState(3);

  // Database hooks
  const { data: pendingContent, isLoading: loadingPending, refetch: refetchPending } = usePendingReviewContent();
  const { data: approvedContentDB, isLoading: loadingApproved, refetch: refetchApproved } = useApprovedContent();
  const { data: scheduledContent, isLoading: loadingScheduled, refetch: refetchScheduled } = useScheduledContent();
  const approveContent = useApproveContent();
  const rejectContent = useRejectContent();
  const updateContent = useUpdateContent();
  const deleteContent = useDeleteContent();
  const saveContent = useSaveGeneratedContent();
  const markPublished = useMarkPublished();

  const platformIcons: Record<string, React.ElementType> = {
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
    email: Mail,
    blog: FileText,
  };

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual & Friendly" },
    { value: "engaging", label: "Engaging & Bold" },
    { value: "educational", label: "Educational" },
    { value: "witty", label: "Witty & Clever" },
    { value: "inspirational", label: "Inspirational" },
  ];

  const contentTypeOptions = [
    { value: "social", label: "Social Post", icon: Twitter },
    { value: "blog", label: "Blog Post", icon: FileText },
    { value: "email", label: "Email", icon: Mail },
    { value: "newsletter", label: "Newsletter", icon: Mail },
  ];

  const platformOptions: Record<string, { value: string; label: string }[]> = {
    social: [
      { value: "linkedin", label: "LinkedIn" },
      { value: "twitter", label: "Twitter/X" },
      { value: "instagram", label: "Instagram" },
      { value: "facebook", label: "Facebook" },
    ],
    blog: [{ value: "blog", label: "Blog" }],
    email: [{ value: "email", label: "Email" }],
    newsletter: [{ value: "email", label: "Newsletter" }],
  };

  const handleGenerateImage = async (content: GeneratedContent) => {
    setGeneratedContent((prev) =>
      prev.map((c) => (c.id === content.id ? { ...c, isGeneratingImage: true } : c))
    );

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: {
          prompt: `Create a professional, modern marketing visual for: ${content.title || topic}. Style: clean, minimalist, suitable for ${content.platform} marketing. No text overlays.`,
          contentId: content.id,
        },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setGeneratedContent((prev) =>
          prev.map((c) =>
            c.id === content.id ? { ...c, imageUrl: data.imageUrl, isGeneratingImage: false } : c
          )
        );
        toast.success("Image generated!");
      } else {
        throw new Error(data?.error || "No image returned");
      }
    } catch (error: any) {
      console.error("Error generating image:", error);
      setGeneratedContent((prev) =>
        prev.map((c) => (c.id === content.id ? { ...c, isGeneratingImage: false } : c))
      );
      toast.error(error.message || "Failed to generate image");
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic or idea");
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = buildPrompt();

      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: { prompt, contentType, platform, tone, includeHashtags, count: bulkCount },
      });

      if (error) throw error;

      const newContent: GeneratedContent[] = data.content.map((item: any, index: number) => ({
        id: `${Date.now()}-${index}`,
        type: contentType,
        platform,
        content: item.content,
        title: item.title,
        hashtags: item.hashtags || [],
        status: "draft" as const,
      }));

      setGeneratedContent((prev) => [...newContent, ...prev]);
      toast.success(`Generated ${newContent.length} content piece(s)`);

      // Generate images for all content if toggled on
      if (generateImage) {
        for (const item of newContent) {
          handleGenerateImage(item);
        }
      }
    } catch (error: any) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const buildPrompt = () => {
    let prompt = `Create ${bulkCount} unique ${contentType} post(s) for ${platform} about: ${topic}.`;
    prompt += ` Tone: ${tone}.`;
    if (targetAudience) prompt += ` Target audience: ${targetAudience}.`;
    if (additionalContext) prompt += ` Additional context: ${additionalContext}.`;
    if (platform === "twitter") prompt += " Keep each post under 280 characters.";
    else if (platform === "linkedin") prompt += " Make it professional and thought-provoking. Optimal length: 1300-2000 characters.";
    else if (platform === "instagram") prompt += " Make it visually descriptive and engaging. Include emoji where appropriate.";
    if (includeHashtags) prompt += " Include 3-5 relevant hashtags.";
    return prompt;
  };

  const handleCopy = async (content: { content: string; id: string }) => {
    await navigator.clipboard.writeText(content.content);
    setCopiedId(content.id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (content: GeneratedContent) => {
    setEditingContent(content.id);
    setEditedText(content.content);
  };

  const handleSaveEdit = (contentId: string) => {
    setGeneratedContent((prev) =>
      prev.map((c) => (c.id === contentId ? { ...c, content: editedText } : c))
    );
    setEditingContent(null);
    toast.success("Content updated");
  };

  const handleDelete = (contentId: string) => {
    setGeneratedContent((prev) => prev.filter((c) => c.id !== contentId));
    toast.success("Content deleted");
  };

  const handleSaveToQueue = async (content: GeneratedContent) => {
    await saveContent.mutateAsync({
      content_type: content.type,
      platform: content.platform,
      title: content.title,
      content: content.content,
      hashtags: content.hashtags,
      tone,
      ai_prompt: topic,
      status: "review",
    });
    setGeneratedContent((prev) => prev.filter((c) => c.id !== content.id));
    refetchPending();
  };

  const handleApproveDB = async (id: string) => {
    await approveContent.mutateAsync({ id });
    refetchPending();
    refetchApproved();
  };

  const handleRejectDB = async (id: string) => {
    await rejectContent.mutateAsync({ id, reason: "Rejected by admin" });
    refetchPending();
  };

  const handleDeleteDB = async (id: string) => {
    await deleteContent.mutateAsync(id);
    refetchPending();
    refetchScheduled();
    refetchApproved();
  };

  // Shared content card renderer
  const ContentCard = ({
    item,
    actions,
    badge,
  }: {
    item: { id: string; platform?: string | null; content_type?: string; content: string; title?: string | null; hashtags?: string[] | null; created_at?: string; auto_generated?: boolean | null; scheduled_for?: string | null; imageUrl?: string; isGeneratingImage?: boolean };
    actions: React.ReactNode;
    badge?: React.ReactNode;
  }) => {
    const Icon = platformIcons[item.platform || ""] || FileText;
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        layout
      >
        <Card className="border-border/40 bg-card/80 backdrop-blur-sm hover:border-border/60 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary">
                <Icon className="h-3.5 w-3.5 text-accent" />
              </div>
              <span className="text-sm font-medium capitalize">
                {item.platform || item.content_type}
              </span>
              {item.auto_generated && (
                <Badge variant="secondary" className="text-[10px] gap-0.5 px-1.5 py-0">
                  <Zap className="h-2.5 w-2.5" /> Auto
                </Badge>
              )}
              {badge}
              {item.created_at && (
                <span className="text-[11px] text-muted-foreground ml-auto">
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </span>
              )}
            </div>

            {item.title && <h4 className="font-semibold text-sm mb-2">{item.title}</h4>}

            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {item.content}
            </p>

            {/* AI Generated Image */}
            {item.isGeneratingImage && (
              <div className="mt-3 rounded-lg border border-dashed border-border/60 bg-muted/30 p-6 flex flex-col items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
                <span className="text-xs text-muted-foreground">Generating image...</span>
              </div>
            )}
            {item.imageUrl && !item.isGeneratingImage && (
              <div className="mt-3 rounded-lg overflow-hidden border border-border/40">
                <img
                  src={item.imageUrl}
                  alt={item.title || "AI generated image"}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}

            {item.hashtags && item.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {item.hashtags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 border-accent/30 text-accent">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            <Separator className="my-3" />
            <div className="flex flex-wrap gap-1.5">{actions}</div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            AI Content Studio
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Generate, review, and schedule content across all your channels
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pendingContent && pendingContent.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" />
              {pendingContent.length} pending
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => {
              // Navigate to integrations tab in admin
              const event = new CustomEvent("admin-navigate", { detail: { tab: "settings" } });
              window.dispatchEvent(event);
              toast.info("Go to Settings → Integrations → Social tab to link your accounts");
            }}
          >
            <Link2 className="h-3.5 w-3.5" />
            Connect Social Accounts
          </Button>
        </div>
      </div>

      {/* Social Accounts Banner */}
      <Card className="border-accent/20 bg-gradient-to-r from-accent/5 via-transparent to-primary/5">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background">
                <Twitter className="h-3.5 w-3.5" />
              </div>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background">
                <Linkedin className="h-3.5 w-3.5" />
              </div>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background">
                <Instagram className="h-3.5 w-3.5" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Link social accounts for auto-publishing</p>
              <p className="text-xs text-muted-foreground">
                Connect your accounts in Settings → Integrations → Social to publish directly
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-accent hover:text-accent"
            onClick={() => toast.info("Navigate to Admin → Settings → Integrations → Social tab")}
          >
            Set up <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="generate" className="gap-1.5 data-[state=active]:bg-background">
            <Wand2 className="h-4 w-4" />
            <span className="hidden sm:inline">Generate</span>
          </TabsTrigger>
          <TabsTrigger value="queue" className="gap-1.5 relative data-[state=active]:bg-background">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Review</span>
            {pendingContent && pendingContent.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                {pendingContent.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-1.5 relative data-[state=active]:bg-background">
            <Check className="h-4 w-4" />
            <span className="hidden sm:inline">Approved</span>
            {approvedContentDB && approvedContentDB.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                {approvedContentDB.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="gap-1.5 data-[state=active]:bg-background">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Scheduled</span>
          </TabsTrigger>
          <TabsTrigger value="automation" className="gap-1.5 data-[state=active]:bg-background">
            <Settings2 className="h-4 w-4" />
            <span className="hidden sm:inline">Automation</span>
          </TabsTrigger>
        </TabsList>

        {/* ====== GENERATE TAB ====== */}
        <TabsContent value="generate" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Generation Form - 2 cols */}
            <Card className="lg:col-span-2 border-border/40">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wand2 className="h-5 w-5 text-accent" />
                  Content Generator
                </CardTitle>
                <CardDescription className="text-xs">
                  Configure and generate AI-powered content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Content Type */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Content Type</Label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {contentTypeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={contentType === option.value ? "default" : "outline"}
                        className="flex-col gap-1 h-auto py-2.5 text-xs"
                        size="sm"
                        onClick={() => {
                          setContentType(option.value);
                          setPlatform(platformOptions[option.value][0].value);
                        }}
                      >
                        <option.icon className="h-3.5 w-3.5" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Platform */}
                {contentType === "social" && (
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Platform</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {platformOptions[contentType]?.map((p) => (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Topic */}
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Topic / Idea *</Label>
                  <Textarea
                    id="topic"
                    placeholder="e.g., Share tips on improving website SEO for small businesses"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-[80px] text-sm"
                  />
                </div>

                {/* Tone & Audience in row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Palette className="h-3 w-3" /> Tone
                    </Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map((t) => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Variations</Label>
                    <Select value={bulkCount.toString()} onValueChange={(v) => setBulkCount(parseInt(v))}>
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 3, 5, 10].map((n) => (
                          <SelectItem key={n} value={n.toString()}>{n} {n === 1 ? "post" : "posts"}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="space-y-2">
                  <Label htmlFor="audience" className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Target className="h-3 w-3" /> Target Audience
                  </Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Marketing managers at SMBs"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>

                {/* Additional Context */}
                <div className="space-y-2">
                  <Label htmlFor="context" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Additional Context</Label>
                  <Textarea
                    id="context"
                    placeholder="Any specific points, CTAs, or brand guidelines..."
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    className="min-h-[60px] text-sm"
                  />
                </div>

                <Separator />

                {/* Toggles */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hashtags" className="flex items-center gap-2 cursor-pointer text-sm">
                      <Hash className="h-3.5 w-3.5 text-muted-foreground" /> Hashtags
                    </Label>
                    <Switch id="hashtags" checked={includeHashtags} onCheckedChange={setIncludeHashtags} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="image" className="flex items-center gap-2 cursor-pointer text-sm">
                      <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" /> Generate AI Images
                    </Label>
                    <Switch id="image" checked={generateImage} onCheckedChange={setGenerateImage} />
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles className="mr-2 h-4 w-4" /> Generate Content</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Content Preview - 3 cols */}
            <Card className="lg:col-span-3 border-border/40">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-accent" />
                    Generated Content
                  </span>
                  {generatedContent.length > 0 && (
                    <Badge variant="secondary" className="text-xs">{generatedContent.length} items</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[680px] pr-4">
                  <AnimatePresence mode="popLayout">
                    {generatedContent.length === 0 ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                      >
                        <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                          <Sparkles className="h-8 w-8 text-muted-foreground/40" />
                        </div>
                        <p className="text-muted-foreground font-medium">No content yet</p>
                        <p className="text-xs text-muted-foreground/60 mt-1 max-w-[240px]">
                          Configure your settings on the left and click "Generate Content"
                        </p>
                      </motion.div>
                    ) : (
                      <div className="space-y-3">
                        {generatedContent.map((content) => (
                          <ContentCard
                            key={content.id}
                            item={{ ...content, created_at: undefined }}
                            actions={
                              <>
                                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleCopy(content)}>
                                  {copiedId === content.id ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                  Copy
                                </Button>
                                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleEdit(content)}>
                                  <Edit3 className="h-3 w-3 mr-1" /> Edit
                                </Button>
                                {!content.imageUrl && !content.isGeneratingImage && (
                                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleGenerateImage(content)}>
                                    <ImageIcon className="h-3 w-3 mr-1" /> Image
                                  </Button>
                                )}
                                <Button size="sm" className="h-7 text-xs" onClick={() => handleSaveToQueue(content)} disabled={saveContent.isPending}>
                                  {saveContent.isPending ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Send className="h-3 w-3 mr-1" />}
                                  Queue
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive ml-auto" onClick={() => handleDelete(content.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </>
                            }
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ====== REVIEW TAB ====== */}
        <TabsContent value="queue" className="space-y-6">
          <Card className="border-border/40">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Eye className="h-5 w-5 text-accent" /> Review Queue
                  </CardTitle>
                  <CardDescription className="text-xs">Content awaiting your review and approval</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8" onClick={() => refetchPending()}>
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingPending ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !pendingContent || pendingContent.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-3">
                    <Check className="h-7 w-7 text-green-500/60" />
                  </div>
                  <p className="text-muted-foreground font-medium">All caught up!</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">No content pending review</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {pendingContent.map((item) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        actions={
                          <>
                            <Button size="sm" className="h-7 text-xs" onClick={() => handleApproveDB(item.id)} disabled={approveContent.isPending}>
                              <Check className="h-3 w-3 mr-1" /> Approve
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleCopy({ id: item.id, content: item.content })}>
                              {copiedId === item.id ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                              Copy
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs text-destructive hover:text-destructive" onClick={() => handleRejectDB(item.id)}>
                              <ThumbsDown className="h-3 w-3 mr-1" /> Reject
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive ml-auto" onClick={() => handleDeleteDB(item.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        }
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ====== APPROVED TAB ====== */}
        <TabsContent value="approved" className="space-y-6">
          <Card className="border-border/40">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Check className="h-5 w-5 text-green-500" /> Approved Content
                  </CardTitle>
                  <CardDescription className="text-xs">Ready to publish or schedule</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8" onClick={() => refetchApproved()}>
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingApproved ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !approvedContentDB || approvedContentDB.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-3">
                    <Check className="h-7 w-7 text-muted-foreground/40" />
                  </div>
                  <p className="text-muted-foreground font-medium">No approved content</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Approve content from the Review tab</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {approvedContentDB.map((item) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        badge={
                          <Badge className="bg-green-500/15 text-green-400 border-green-500/25 text-[10px] px-1.5 py-0">
                            Approved
                          </Badge>
                        }
                        actions={
                          <>
                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleCopy({ id: item.id, content: item.content })}>
                              {copiedId === item.id ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                              Copy
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => markPublished.mutateAsync(item.id).then(() => refetchApproved())}
                              disabled={markPublished.isPending}
                            >
                              {markPublished.isPending ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Send className="h-3 w-3 mr-1" />}
                              Publish
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={() => {
                                const scheduledFor = new Date();
                                scheduledFor.setDate(scheduledFor.getDate() + 1);
                                scheduledFor.setHours(9, 0, 0, 0);
                                updateContent.mutateAsync({
                                  id: item.id,
                                  updates: { status: "scheduled", scheduled_for: scheduledFor.toISOString() },
                                }).then(() => { refetchApproved(); refetchScheduled(); });
                              }}
                            >
                              <Calendar className="h-3 w-3 mr-1" /> Schedule
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive ml-auto" onClick={() => handleDeleteDB(item.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        }
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ====== SCHEDULED TAB ====== */}
        <TabsContent value="scheduled" className="space-y-6">
          <Card className="border-border/40">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-accent" /> Scheduled Content
                  </CardTitle>
                  <CardDescription className="text-xs">Queued for publishing at the scheduled time</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8" onClick={() => refetchScheduled()}>
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingScheduled ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !scheduledContent || scheduledContent.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-3">
                    <Calendar className="h-7 w-7 text-muted-foreground/40" />
                  </div>
                  <p className="text-muted-foreground font-medium">No scheduled content</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Schedule approved content to appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {scheduledContent.map((item) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        badge={
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {item.scheduled_for ? format(new Date(item.scheduled_for), "MMM d, h:mm a") : "Scheduled"}
                          </Badge>
                        }
                        actions={
                          <>
                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleCopy({ id: item.id, content: item.content })}>
                              {copiedId === item.id ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                              Copy
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive ml-auto" onClick={() => handleDeleteDB(item.id)}>
                              <Trash2 className="h-3 w-3 mr-1" /> Remove
                            </Button>
                          </>
                        }
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ====== AUTOMATION TAB ====== */}
        <TabsContent value="automation" className="space-y-6">
          <ContentRecipeManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentStudio;
