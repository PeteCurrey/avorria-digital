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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ContentRecipeManager } from "./ContentRecipeManager";
import {
  usePendingReviewContent,
  useApprovedContent,
  useScheduledContent,
  useAIGeneratedContent,
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
  ArrowRight,
  Maximize2,
  Camera,
  Paintbrush,
  Box,
  X,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

const imageStyleOptions = [
  { value: "photographic", label: "Photographic", icon: Camera, desc: "Realistic stock-photo style" },
  { value: "illustrative", label: "Illustrative", icon: Paintbrush, desc: "Clean vector/abstract graphics" },
  { value: "3d-render", label: "3D Render", icon: Box, desc: "Modern 3D objects & scenes" },
];

const pipelineStages = [
  { key: "generate", label: "Generate", icon: Wand2 },
  { key: "queue", label: "Review", icon: Eye },
  { key: "approved", label: "Approved", icon: Check },
  { key: "scheduled", label: "Scheduled", icon: Calendar },
  { key: "published", label: "Published", icon: Globe },
];

const ContentStudio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("generate");
  const [contentType, setContentType] = useState<string>("social");
  const [platform, setPlatform] = useState<string>("linkedin");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [targetAudience, setTargetAudience] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [generateImage, setGenerateImage] = useState(false);
  const [imageStyle, setImageStyle] = useState("illustrative");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bulkCount, setBulkCount] = useState(3);

  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  // Custom prompt dialog
  const [customPromptOpen, setCustomPromptOpen] = useState(false);
  const [customPromptText, setCustomPromptText] = useState("");
  const [customPromptTargetId, setCustomPromptTargetId] = useState<string | null>(null);

  // Database hooks
  const { data: pendingContent, isLoading: loadingPending, refetch: refetchPending } = usePendingReviewContent();
  const { data: approvedContentDB, isLoading: loadingApproved, refetch: refetchApproved } = useApprovedContent();
  const { data: scheduledContent, isLoading: loadingScheduled, refetch: refetchScheduled } = useScheduledContent();
  const { data: publishedContent, isLoading: loadingPublished } = useAIGeneratedContent("published");
  const approveContent = useApproveContent();
  const rejectContent = useRejectContent();
  const updateContent = useUpdateContent();
  const deleteContent = useDeleteContent();
  const saveContent = useSaveGeneratedContent();
  const markPublished = useMarkPublished();

  // Real social connection status
  const { data: socialConnections } = useQuery({
    queryKey: ["social-integrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_integrations" as any)
        .select("integration_type, is_active")
        .in("integration_type", ["twitter", "linkedin", "instagram"]);
      if (error) return [];
      return (data || []) as { integration_type: string; is_active: boolean }[];
    },
  });

  const isConnected = (platform: string) =>
    socialConnections?.some((c) => c.integration_type === platform && c.is_active) ?? false;

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

  const getImageStylePrompt = (style: string) => {
    switch (style) {
      case "photographic":
        return "Photorealistic, professional photography style, natural lighting, high-resolution stock photo quality.";
      case "3d-render":
        return "Modern 3D rendered scene, clean materials, soft lighting, studio quality 3D visualization.";
      default:
        return "Clean vector illustration style, flat design, abstract marketing graphic, minimalist.";
    }
  };

  const getPlatformAspectHint = (plat: string) => {
    switch (plat) {
      case "instagram": return "Create a 1:1 square format image, optimised for Instagram feed.";
      case "linkedin": return "Create a 1.91:1 landscape format image, optimised for LinkedIn posts.";
      case "twitter": return "Create a 16:9 landscape format image, optimised for Twitter/X cards.";
      case "facebook": return "Create a 1.91:1 landscape format image, optimised for Facebook posts.";
      default: return "Create a 16:9 landscape format image.";
    }
  };

  const handleGenerateImage = async (content: GeneratedContent, customPrompt?: string) => {
    setGeneratedContent((prev) =>
      prev.map((c) => (c.id === content.id ? { ...c, isGeneratingImage: true } : c))
    );

    try {
      const stylePrompt = getImageStylePrompt(imageStyle);
      const aspectHint = getPlatformAspectHint(content.platform);
      const prompt = customPrompt
        ? customPrompt
        : `Create a professional marketing visual for: ${content.title || topic}. ${stylePrompt} ${aspectHint} Brand colours: deep black backgrounds with vibrant pink/magenta accents (#e91e8c). No text overlays.`;

      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt, contentId: content.id, imageStyle },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setGeneratedContent((prev) =>
          prev.map((c) =>
            c.id === content.id ? { ...c, imageUrl: data.imageUrl, isGeneratingImage: false } : c
          )
        );
        toast.success("Image generated with Avorria watermark!");
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

  const handleReplaceImage = (content: GeneratedContent) => {
    handleGenerateImage(content);
  };

  const handleCustomPromptImage = (contentId: string) => {
    setCustomPromptTargetId(contentId);
    setCustomPromptText("");
    setCustomPromptOpen(true);
  };

  const submitCustomPrompt = () => {
    if (!customPromptTargetId || !customPromptText.trim()) return;
    const content = generatedContent.find((c) => c.id === customPromptTargetId);
    if (content) {
      handleGenerateImage(content, customPromptText);
    }
    setCustomPromptOpen(false);
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

  // Pipeline counts
  const pipelineCounts: Record<string, number> = {
    generate: generatedContent.length,
    queue: pendingContent?.length || 0,
    approved: approvedContentDB?.length || 0,
    scheduled: scheduledContent?.length || 0,
    published: publishedContent?.length || 0,
  };

  // Shared content card renderer
  const ContentCard = ({
    item,
    actions,
    badge,
    nextStepHint,
  }: {
    item: { id: string; platform?: string | null; content_type?: string; content: string; title?: string | null; hashtags?: string[] | null; created_at?: string; auto_generated?: boolean | null; scheduled_for?: string | null; published_at?: string | null; imageUrl?: string; isGeneratingImage?: boolean };
    actions: React.ReactNode;
    badge?: React.ReactNode;
    nextStepHint?: string;
  }) => {
    const Icon = platformIcons[item.platform || ""] || FileText;
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        layout
      >
        <Card className="border-border/30 bg-card/60 backdrop-blur-sm hover:border-accent/20 transition-all duration-200 hover:shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 border border-accent/20">
                <Icon className="h-3.5 w-3.5 text-accent" />
              </div>
              <span className="text-xs font-medium capitalize tracking-wide text-foreground/80">
                {item.platform || item.content_type}
              </span>
              {item.auto_generated && (
                <Badge variant="secondary" className="text-[10px] gap-0.5 px-1.5 py-0">
                  <Zap className="h-2.5 w-2.5" /> Auto
                </Badge>
              )}
              {badge}
              {item.created_at && (
                <span className="text-[10px] text-muted-foreground/60 ml-auto font-mono">
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </span>
              )}
            </div>

            {item.title && <h4 className="font-semibold text-sm mb-2 tracking-tight">{item.title}</h4>}

            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {item.content}
            </p>

            {/* AI Generated Image */}
            {item.isGeneratingImage && (
              <div className="mt-3 rounded-lg border border-dashed border-accent/20 bg-accent/5 p-8 flex flex-col items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
                <span className="text-xs text-muted-foreground">Generating image...</span>
              </div>
            )}
            {item.imageUrl && !item.isGeneratingImage && (
              <div className="mt-3 rounded-lg overflow-hidden border border-border/30 relative group">
                <img
                  src={item.imageUrl}
                  alt={item.title || "AI generated image"}
                  className="w-full h-48 object-cover cursor-pointer transition-transform duration-200 group-hover:scale-[1.02]"
                  onClick={() => setLightboxImage(item.imageUrl!)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                  <Maximize2 className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              </div>
            )}

            {item.hashtags && item.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {item.hashtags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 border-accent/20 text-accent/80 font-mono">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {nextStepHint && (
              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground/50 bg-muted/20 rounded px-2 py-1">
                <ArrowRight className="h-2.5 w-2.5" />
                <span>Next: {nextStepHint}</span>
              </div>
            )}

            <Separator className="my-3 bg-border/30" />
            <div className="flex flex-wrap gap-1.5">{actions}</div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Image Lightbox */}
      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-border/20">
          <DialogHeader className="sr-only">
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {lightboxImage && (
            <div className="relative">
              <img
                src={lightboxImage}
                alt="Full size preview"
                className="w-full h-auto max-h-[85vh] object-contain"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
                onClick={() => setLightboxImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Custom Prompt Dialog */}
      <Dialog open={customPromptOpen} onOpenChange={setCustomPromptOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Paintbrush className="h-4 w-4 text-accent" />
              Custom Image Prompt
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Describe the image you want</Label>
              <Textarea
                value={customPromptText}
                onChange={(e) => setCustomPromptText(e.target.value)}
                placeholder="e.g., A modern office workspace with a laptop showing analytics charts, warm natural lighting, minimalist desk setup..."
                className="min-h-[100px] text-sm"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setCustomPromptOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={submitCustomPrompt} disabled={!customPromptText.trim()}>
                <ImageIcon className="h-3.5 w-3.5 mr-1.5" />
                Generate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            Content Studio
          </h2>
          <p className="text-muted-foreground text-xs mt-1 ml-10">
            Generate, review, and publish content across all channels
          </p>
        </div>
      </div>

      {/* Visual Pipeline Strip */}
      <div className="flex items-center gap-1 px-4 py-3 rounded-xl border border-border/20 bg-card/40 backdrop-blur-sm overflow-x-auto">
        {pipelineStages.map((stage, idx) => {
          const count = pipelineCounts[stage.key] || 0;
          const isActive = activeTab === stage.key;
          const StageIcon = stage.icon;
          return (
            <React.Fragment key={stage.key}>
              {idx > 0 && (
                <ArrowRight className="h-3 w-3 text-muted-foreground/30 flex-shrink-0 mx-0.5" />
              )}
              <button
                onClick={() => setActiveTab(stage.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs font-medium flex-shrink-0 ${
                  isActive
                    ? "bg-accent/10 border border-accent/30 text-accent shadow-sm"
                    : "hover:bg-muted/30 text-muted-foreground"
                }`}
              >
                <StageIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{stage.label}</span>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className={`inline-flex items-center justify-center h-4 min-w-[16px] rounded-full text-[9px] font-bold px-1 ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </motion.span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Social Accounts Status Bar */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border/30 bg-card/40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {[
              { icon: Twitter, label: "twitter", name: "X" },
              { icon: Linkedin, label: "linkedin", name: "LI" },
              { icon: Instagram, label: "instagram", name: "IG" },
            ].map(({ icon: SIcon, label, name }) => {
              const connected = isConnected(label);
              return (
                <div
                  key={name}
                  className={`relative h-7 w-7 rounded-full flex items-center justify-center border border-background ${
                    connected ? "bg-green-500/10 text-green-400" : "bg-muted/60 text-muted-foreground"
                  }`}
                >
                  <SIcon className="h-3 w-3" />
                  <span className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-background ${connected ? "bg-green-500" : "bg-muted-foreground/40"}`} />
                </div>
              );
            })}
          </div>
          <span className="text-xs text-muted-foreground">
            {socialConnections && socialConnections.filter(c => c.is_active).length > 0
              ? `${socialConnections.filter(c => c.is_active).length} account(s) connected`
              : "Connect accounts for auto-publishing"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-accent hover:text-accent ml-auto h-7 text-xs"
          onClick={() => navigate("/admin?tab=integrations")}
        >
          Manage <ArrowRight className="h-3 w-3" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6 bg-muted/30 backdrop-blur-sm border border-border/20 h-9">
          <TabsTrigger value="generate" className="gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs">
            <Wand2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Generate</span>
          </TabsTrigger>
          <TabsTrigger value="queue" className="gap-1.5 relative data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs">
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Review</span>
            {pendingContent && pendingContent.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 text-[9px] bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                {pendingContent.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-1.5 relative data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs">
            <Check className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Approved</span>
            {approvedContentDB && approvedContentDB.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 text-[9px] bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                {approvedContentDB.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs">
            <Calendar className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Scheduled</span>
          </TabsTrigger>
          <TabsTrigger value="published" className="gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs">
            <Globe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Published</span>
          </TabsTrigger>
          <TabsTrigger value="automation" className="gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs">
            <Settings2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Automation</span>
          </TabsTrigger>
        </TabsList>

        {/* ====== GENERATE TAB ====== */}
        <TabsContent value="generate" className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-5">
            {/* Generation Form - 2 cols */}
            <Card className="lg:col-span-2 border-border/20 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                  <Wand2 className="h-4 w-4 text-accent" />
                  Content Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Content Type */}
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">Content Type</Label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {contentTypeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={contentType === option.value ? "default" : "outline"}
                        className="flex-col gap-1 h-auto py-2 text-[11px]"
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
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">Platform</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="h-8 text-xs">
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
                <div className="space-y-1.5">
                  <Label htmlFor="topic" className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">Topic / Idea *</Label>
                  <Textarea
                    id="topic"
                    placeholder="e.g., Share tips on improving website SEO for small businesses"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-[70px] text-xs"
                  />
                </div>

                {/* Tone & Variations */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70 flex items-center gap-1">
                      <Palette className="h-2.5 w-2.5" /> Tone
                    </Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map((t) => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">Variations</Label>
                    <Select value={bulkCount.toString()} onValueChange={(v) => setBulkCount(parseInt(v))}>
                      <SelectTrigger className="h-8 text-xs">
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
                <div className="space-y-1.5">
                  <Label htmlFor="audience" className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70 flex items-center gap-1">
                    <Target className="h-2.5 w-2.5" /> Target Audience
                  </Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Marketing managers at SMBs"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>

                {/* Additional Context */}
                <div className="space-y-1.5">
                  <Label htmlFor="context" className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">Additional Context</Label>
                  <Textarea
                    id="context"
                    placeholder="Any specific points, CTAs, or brand guidelines..."
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    className="min-h-[50px] text-xs"
                  />
                </div>

                <Separator className="bg-border/20" />

                {/* Toggles */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hashtags" className="flex items-center gap-2 cursor-pointer text-xs">
                      <Hash className="h-3 w-3 text-muted-foreground/60" /> Hashtags
                    </Label>
                    <Switch id="hashtags" checked={includeHashtags} onCheckedChange={setIncludeHashtags} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="image" className="flex items-center gap-2 cursor-pointer text-xs">
                      <ImageIcon className="h-3 w-3 text-muted-foreground/60" /> Generate AI Images
                    </Label>
                    <Switch id="image" checked={generateImage} onCheckedChange={setGenerateImage} />
                  </div>
                </div>

                {/* Image Style Selector */}
                <AnimatePresence>
                  {generateImage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1.5 pt-1">
                        <Label className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">Image Style</Label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {imageStyleOptions.map((style) => (
                            <button
                              key={style.value}
                              onClick={() => setImageStyle(style.value)}
                              className={`flex flex-col items-center gap-1 rounded-lg border p-2.5 transition-all text-center ${
                                imageStyle === style.value
                                  ? "border-accent/40 bg-accent/10 text-accent"
                                  : "border-border/30 hover:border-border/50 text-muted-foreground"
                              }`}
                            >
                              <style.icon className="h-4 w-4" />
                              <span className="text-[10px] font-medium leading-tight">{style.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full"
                  size="default"
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
            <Card className="lg:col-span-3 border-border/20 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm font-semibold tracking-tight">
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-accent" />
                    Preview
                  </span>
                  {generatedContent.length > 0 && (
                    <Badge variant="secondary" className="text-[10px]">{generatedContent.length}</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[680px] pr-3">
                  <AnimatePresence mode="popLayout">
                    {generatedContent.length === 0 ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                      >
                        <div className="h-14 w-14 rounded-2xl bg-muted/30 border border-border/20 flex items-center justify-center mb-4">
                          <Sparkles className="h-6 w-6 text-muted-foreground/30" />
                        </div>
                        <p className="text-sm text-muted-foreground/60 font-medium">No content generated yet</p>
                        <p className="text-[11px] text-muted-foreground/40 mt-1 max-w-[220px]">
                          Configure settings and click Generate
                        </p>
                      </motion.div>
                    ) : (
                      <div className="space-y-3">
                        {generatedContent.map((content) => (
                          <ContentCard
                            key={content.id}
                            item={{ ...content, created_at: undefined }}
                            nextStepHint="Send to Review queue for approval"
                            actions={
                              <>
                                <Button size="sm" variant="outline" className="h-7 text-[11px] border-border/30" onClick={() => handleCopy(content)}>
                                  {copiedId === content.id ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                  Copy
                                </Button>
                                <Button size="sm" variant="outline" className="h-7 text-[11px] border-border/30" onClick={() => handleEdit(content)}>
                                  <Edit3 className="h-3 w-3 mr-1" /> Edit
                                </Button>
                                {content.imageUrl && !content.isGeneratingImage ? (
                                  <>
                                    <Button size="sm" variant="outline" className="h-7 text-[11px] border-border/30" onClick={() => handleReplaceImage(content)}>
                                      <RefreshCw className="h-3 w-3 mr-1" /> Replace
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 text-[11px] border-border/30" onClick={() => handleCustomPromptImage(content.id)}>
                                      <Paintbrush className="h-3 w-3 mr-1" /> Prompt
                                    </Button>
                                  </>
                                ) : !content.isGeneratingImage ? (
                                  <>
                                    <Button size="sm" variant="outline" className="h-7 text-[11px] border-border/30" onClick={() => handleGenerateImage(content)}>
                                      <ImageIcon className="h-3 w-3 mr-1" /> Image
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 text-[11px] border-border/30" onClick={() => handleCustomPromptImage(content.id)}>
                                      <Paintbrush className="h-3 w-3 mr-1" /> Custom
                                    </Button>
                                  </>
                                ) : null}
                                <Button size="sm" className="h-7 text-[11px]" onClick={() => handleSaveToQueue(content)} disabled={saveContent.isPending}>
                                  {saveContent.isPending ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Send className="h-3 w-3 mr-1" />}
                                  Queue
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 text-[11px] text-destructive hover:text-destructive ml-auto" onClick={() => handleDelete(content.id)}>
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
        <TabsContent value="queue" className="space-y-5">
          <Card className="border-border/20 bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                    <Eye className="h-4 w-4 text-accent" /> Review Queue
                  </CardTitle>
                  <CardDescription className="text-[11px]">Content awaiting review and approval</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs border-border/30" onClick={() => refetchPending()}>
                  <RefreshCw className="h-3 w-3 mr-1" /> Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingPending ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/40" />
                </div>
              ) : !pendingContent || pendingContent.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-12 w-12 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-center justify-center mb-3">
                    <Check className="h-5 w-5 text-green-500/50" />
                  </div>
                  <p className="text-sm text-muted-foreground/60 font-medium">All caught up</p>
                  <p className="text-[11px] text-muted-foreground/40 mt-1">No content pending review</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {pendingContent.map((item) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        nextStepHint="Approve → moves to Approved tab"
                        actions={
                          <>
                            <Button size="sm" className="h-7 text-[11px]" onClick={() => handleApproveDB(item.id)} disabled={approveContent.isPending}>
                              <Check className="h-3 w-3 mr-1" /> Approve
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-[11px] border-border/30" onClick={() => handleCopy({ id: item.id, content: item.content })}>
                              {copiedId === item.id ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                              Copy
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-[11px] text-destructive hover:text-destructive border-border/30" onClick={() => handleRejectDB(item.id)}>
                              <ThumbsDown className="h-3 w-3 mr-1" /> Reject
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-[11px] text-destructive hover:text-destructive ml-auto" onClick={() => handleDeleteDB(item.id)}>
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
        <TabsContent value="approved" className="space-y-5">
          <Card className="border-border/20 bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                    <Check className="h-4 w-4 text-green-500" /> Approved Content
                  </CardTitle>
                  <CardDescription className="text-[11px]">Ready to publish or schedule</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs border-border/30" onClick={() => refetchApproved()}>
                  <RefreshCw className="h-3 w-3 mr-1" /> Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingApproved ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/40" />
                </div>
              ) : !approvedContentDB || approvedContentDB.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-12 w-12 rounded-2xl bg-muted/30 border border-border/20 flex items-center justify-center mb-3">
                    <Check className="h-5 w-5 text-muted-foreground/30" />
                  </div>
                  <p className="text-sm text-muted-foreground/60 font-medium">No approved content</p>
                  <p className="text-[11px] text-muted-foreground/40 mt-1">Approve content from Review</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {approvedContentDB.map((item) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        badge={
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px] px-1.5 py-0">
                            Approved
                          </Badge>
                        }
                        nextStepHint="Publish now → Published tab, or Schedule → Scheduled tab"
                        actions={
                          <>
                            <Button size="sm" variant="outline" className="h-7 text-[11px] border-border/30" onClick={() => handleCopy({ id: item.id, content: item.content })}>
                              {copiedId === item.id ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                              Copy
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 text-[11px]"
                              onClick={() => markPublished.mutateAsync(item.id).then(() => refetchApproved())}
                              disabled={markPublished.isPending}
                            >
                              {markPublished.isPending ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Send className="h-3 w-3 mr-1" />}
                              Publish
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-[11px] border-border/30"
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
                            <Button size="sm" variant="ghost" className="h-7 text-[11px] text-destructive hover:text-destructive ml-auto" onClick={() => handleDeleteDB(item.id)}>
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
        <TabsContent value="scheduled" className="space-y-5">
          <Card className="border-border/20 bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                    <Calendar className="h-4 w-4 text-accent" /> Scheduled
                  </CardTitle>
                  <CardDescription className="text-[11px]">Queued for publishing</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs border-border/30" onClick={() => refetchScheduled()}>
                  <RefreshCw className="h-3 w-3 mr-1" /> Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingScheduled ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/40" />
                </div>
              ) : !scheduledContent || scheduledContent.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-12 w-12 rounded-2xl bg-muted/30 border border-border/20 flex items-center justify-center mb-3">
                    <Calendar className="h-5 w-5 text-muted-foreground/30" />
                  </div>
                  <p className="text-sm text-muted-foreground/60 font-medium">No scheduled content</p>
                  <p className="text-[11px] text-muted-foreground/40 mt-1">Schedule approved content to appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {scheduledContent.map((item) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        badge={
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-mono">
                            {item.scheduled_for ? format(new Date(item.scheduled_for), "MMM d, h:mm a") : "Scheduled"}
                          </Badge>
                        }
                        actions={
                          <>
                            <Button size="sm" variant="outline" className="h-7 text-[11px] border-border/30" onClick={() => handleCopy({ id: item.id, content: item.content })}>
                              {copiedId === item.id ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                              Copy
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-[11px] text-destructive hover:text-destructive ml-auto" onClick={() => handleDeleteDB(item.id)}>
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

        {/* ====== PUBLISHED TAB ====== */}
        <TabsContent value="published" className="space-y-5">
          <Card className="border-border/20 bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                    <Globe className="h-4 w-4 text-green-500" /> Published Content
                  </CardTitle>
                  <CardDescription className="text-[11px]">Content that has been published</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loadingPublished ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/40" />
                </div>
              ) : !publishedContent || publishedContent.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-12 w-12 rounded-2xl bg-muted/30 border border-border/20 flex items-center justify-center mb-3">
                    <Globe className="h-5 w-5 text-muted-foreground/30" />
                  </div>
                  <p className="text-sm text-muted-foreground/60 font-medium">No published content yet</p>
                  <p className="text-[11px] text-muted-foreground/40 mt-1">Published content will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {publishedContent.map((item) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        badge={
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px] px-1.5 py-0">
                            <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" /> Published
                            {item.published_at && ` · ${format(new Date(item.published_at), "MMM d")}`}
                          </Badge>
                        }
                        actions={
                          <>
                            <Button size="sm" variant="outline" className="h-7 text-[11px] border-border/30" onClick={() => handleCopy({ id: item.id, content: item.content })}>
                              {copiedId === item.id ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                              Copy
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-[11px] text-destructive hover:text-destructive ml-auto" onClick={() => handleDeleteDB(item.id)}>
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

        {/* ====== AUTOMATION TAB ====== */}
        <TabsContent value="automation" className="space-y-5">
          <ContentRecipeManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentStudio;
