import React, { useState } from "react";
import { motion } from "framer-motion";
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
  X,
  ThumbsDown,
  Zap,
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
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bulkCount, setBulkCount] = useState(3);

  // Database hooks
  const { data: pendingContent, isLoading: loadingPending, refetch: refetchPending } = usePendingReviewContent();
  const { data: scheduledContent, isLoading: loadingScheduled, refetch: refetchScheduled } = useScheduledContent();
  const approveContent = useApproveContent();
  const rejectContent = useRejectContent();
  const updateContent = useUpdateContent();
  const deleteContent = useDeleteContent();
  const saveContent = useSaveGeneratedContent();

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

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic or idea");
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = buildPrompt();
      
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: {
          prompt,
          contentType,
          platform,
          tone,
          includeHashtags,
          count: bulkCount,
        },
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

      if (generateImage && newContent.length > 0) {
        await handleGenerateImage(newContent[0]);
      }
    } catch (error: any) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async (content: GeneratedContent) => {
    setIsGeneratingImage(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: {
          prompt: `Create a professional, modern image for: ${content.title || topic}. Style: clean, minimalist, suitable for ${platform} marketing.`,
          contentId: content.id,
        },
      });

      if (error) throw error;

      setGeneratedContent((prev) =>
        prev.map((c) =>
          c.id === content.id ? { ...c, imageUrl: data.imageUrl } : c
        )
      );
      toast.success("Image generated successfully");
    } catch (error: any) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const buildPrompt = () => {
    let prompt = `Create ${bulkCount} unique ${contentType} post(s) for ${platform} about: ${topic}.`;
    
    prompt += ` Tone: ${tone}.`;
    
    if (targetAudience) {
      prompt += ` Target audience: ${targetAudience}.`;
    }
    
    if (additionalContext) {
      prompt += ` Additional context: ${additionalContext}.`;
    }

    if (platform === "twitter") {
      prompt += " Keep each post under 280 characters.";
    } else if (platform === "linkedin") {
      prompt += " Make it professional and thought-provoking. Optimal length: 1300-2000 characters.";
    } else if (platform === "instagram") {
      prompt += " Make it visually descriptive and engaging. Include emoji where appropriate.";
    }

    if (includeHashtags) {
      prompt += " Include 3-5 relevant hashtags.";
    }

    return prompt;
  };

  const handleCopy = async (content: GeneratedContent | { content: string; id: string }) => {
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
      prev.map((c) =>
        c.id === contentId ? { ...c, content: editedText } : c
      )
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
    refetchScheduled();
  };

  const handleRejectDB = async (id: string) => {
    await rejectContent.mutateAsync({ id, reason: "Rejected by admin" });
    refetchPending();
  };

  const handleDeleteDB = async (id: string) => {
    await deleteContent.mutateAsync(id);
    refetchPending();
    refetchScheduled();
  };

  const PlatformIcon = platformIcons[platform] || FileText;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Content Studio</h2>
          <p className="text-muted-foreground">
            Generate, automate, and schedule content across all your channels
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Sparkles className="h-3 w-3" />
            Powered by AI
          </Badge>
          {pendingContent && pendingContent.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" />
              {pendingContent.length} pending review
            </Badge>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="generate" className="gap-2">
            <Wand2 className="h-4 w-4" />
            <span className="hidden sm:inline">Generate</span>
          </TabsTrigger>
          <TabsTrigger value="queue" className="gap-2 relative">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Review</span>
            {pendingContent && pendingContent.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                {pendingContent.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Scheduled</span>
          </TabsTrigger>
          <TabsTrigger value="automation" className="gap-2">
            <Settings2 className="h-4 w-4" />
            <span className="hidden sm:inline">Automation</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Generation Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-accent" />
                  Content Generator
                </CardTitle>
                <CardDescription>
                  Configure your content parameters and let AI do the heavy lifting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Type */}
                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {contentTypeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={contentType === option.value ? "default" : "outline"}
                        className="flex-col gap-1 h-auto py-3"
                        onClick={() => {
                          setContentType(option.value);
                          setPlatform(platformOptions[option.value][0].value);
                        }}
                      >
                        <option.icon className="h-4 w-4" />
                        <span className="text-xs">{option.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Platform */}
                {contentType === "social" && (
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {platformOptions[contentType]?.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Topic */}
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic / Idea *</Label>
                  <Textarea
                    id="topic"
                    placeholder="e.g., Share tips on improving website SEO for small businesses"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Tone */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Tone
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Target Audience */}
                <div className="space-y-2">
                  <Label htmlFor="audience" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Target Audience (optional)
                  </Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Marketing managers at SMBs"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>

                {/* Additional Context */}
                <div className="space-y-2">
                  <Label htmlFor="context">Additional Context (optional)</Label>
                  <Textarea
                    id="context"
                    placeholder="Any specific points, CTAs, or brand guidelines..."
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <Separator />

                {/* Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hashtags" className="flex items-center gap-2 cursor-pointer">
                      <Hash className="h-4 w-4" />
                      Include Hashtags
                    </Label>
                    <Switch
                      id="hashtags"
                      checked={includeHashtags}
                      onCheckedChange={setIncludeHashtags}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="image" className="flex items-center gap-2 cursor-pointer">
                      <ImageIcon className="h-4 w-4" />
                      Generate AI Image
                    </Label>
                    <Switch
                      id="image"
                      checked={generateImage}
                      onCheckedChange={setGenerateImage}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Number of Variations</Label>
                    <Select
                      value={bulkCount.toString()}
                      onValueChange={(v) => setBulkCount(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 3, 5, 10].map((n) => (
                          <SelectItem key={n} value={n.toString()}>
                            {n} {n === 1 ? "post" : "posts"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Content Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-accent" />
                    Generated Content
                  </span>
                  {generatedContent.length > 0 && (
                    <Badge variant="secondary">{generatedContent.length} items</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Review, edit, and save your AI-generated content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  {generatedContent.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">
                        Generated content will appear here
                      </p>
                      <p className="text-sm text-muted-foreground/70 mt-1">
                        Configure your settings and click "Generate Content"
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {generatedContent.map((content, index) => {
                        const Icon = platformIcons[content.platform] || FileText;
                        return (
                          <motion.div
                            key={content.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="border-border/50">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium capitalize">
                                      {content.platform}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {content.status}
                                    </Badge>
                                  </div>
                                </div>

                                {content.title && (
                                  <h4 className="font-semibold mb-2">{content.title}</h4>
                                )}

                                {editingContent === content.id ? (
                                  <div className="space-y-3">
                                    <Textarea
                                      value={editedText}
                                      onChange={(e) => setEditedText(e.target.value)}
                                      className="min-h-[120px]"
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => handleSaveEdit(content.id)}
                                      >
                                        <Save className="h-3 w-3 mr-1" />
                                        Save
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setEditingContent(null)}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {content.content}
                                  </p>
                                )}

                                {content.hashtags && content.hashtags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-3">
                                    {content.hashtags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        #{tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}

                                <Separator className="my-3" />

                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleCopy(content)}
                                  >
                                    {copiedId === content.id ? (
                                      <Check className="h-3 w-3 mr-1" />
                                    ) : (
                                      <Copy className="h-3 w-3 mr-1" />
                                    )}
                                    Copy
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEdit(content)}
                                  >
                                    <Edit3 className="h-3 w-3 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleSaveToQueue(content)}
                                    disabled={saveContent.isPending}
                                  >
                                    {saveContent.isPending ? (
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                    ) : (
                                      <Send className="h-3 w-3 mr-1" />
                                    )}
                                    Save to Queue
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => handleDelete(content.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Review Queue Tab */}
        <TabsContent value="queue" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-accent" />
                    Review Queue
                  </CardTitle>
                  <CardDescription>
                    Content awaiting your review and approval
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => refetchPending()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingPending ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !pendingContent || pendingContent.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Check className="h-12 w-12 text-green-500/50 mb-4" />
                  <p className="text-muted-foreground">All caught up!</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    No content pending review. Auto-generated content will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingContent.map((item) => {
                    const Icon = platformIcons[item.platform || ""] || FileText;
                    return (
                      <Card key={item.id} className="border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium capitalize">
                                {item.platform || item.content_type}
                              </span>
                              {item.auto_generated && (
                                <Badge variant="secondary" className="text-xs gap-1">
                                  <Zap className="h-3 w-3" />
                                  Auto
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                              </span>
                            </div>
                          </div>

                          {item.title && (
                            <h4 className="font-semibold mb-2">{item.title}</h4>
                          )}

                          <p className="text-sm text-muted-foreground whitespace-pre-wrap mb-3">
                            {item.content}
                          </p>

                          {item.hashtags && item.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.hashtags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <Separator className="my-3" />

                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveDB(item.id)}
                              disabled={approveContent.isPending}
                            >
                              {approveContent.isPending ? (
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              ) : (
                                <Check className="h-3 w-3 mr-1" />
                              )}
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCopy({ id: item.id, content: item.content })}
                            >
                              {copiedId === item.id ? (
                                <Check className="h-3 w-3 mr-1" />
                              ) : (
                                <Copy className="h-3 w-3 mr-1" />
                              )}
                              Copy
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleRejectDB(item.id)}
                              disabled={rejectContent.isPending}
                            >
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteDB(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Content Tab */}
        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Scheduled Content
                  </CardTitle>
                  <CardDescription>
                    Content approved and ready for publishing
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => refetchScheduled()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingScheduled ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !scheduledContent || scheduledContent.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No scheduled content</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Approved content with scheduled dates will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scheduledContent.map((item) => {
                    const Icon = platformIcons[item.platform || ""] || FileText;
                    return (
                      <Card key={item.id} className="border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium capitalize">
                                {item.platform || item.content_type}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {item.scheduled_for 
                                  ? format(new Date(item.scheduled_for), "MMM d, h:mm a")
                                  : "Approved"
                                }
                              </Badge>
                            </div>
                          </div>

                          {item.title && (
                            <h4 className="font-semibold mb-2">{item.title}</h4>
                          )}

                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {item.content}
                          </p>

                          <Separator className="my-3" />

                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCopy({ id: item.id, content: item.content })}
                            >
                              {copiedId === item.id ? (
                                <Check className="h-3 w-3 mr-1" />
                              ) : (
                                <Copy className="h-3 w-3 mr-1" />
                              )}
                              Copy
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteDB(item.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-6">
          <ContentRecipeManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentStudio;
