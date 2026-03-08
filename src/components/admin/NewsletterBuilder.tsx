import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Mail,
  Send,
  Eye,
  Smartphone,
  Monitor,
  Sparkles,
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Trash2,
  GripVertical,
  Calendar,
  Users,
  BarChart3,
  Clock,
  Loader2,
  Wand2,
  Save,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface NewsletterSection {
  id: string;
  type: "hero" | "text" | "featured" | "grid" | "cta" | "divider";
  content: {
    title?: string;
    subtitle?: string;
    body?: string;
    imageUrl?: string;
    buttonText?: string;
    buttonUrl?: string;
    items?: { title: string; description: string; url: string }[];
  };
}

interface Newsletter {
  id?: string;
  subject: string;
  previewText: string;
  sections: NewsletterSection[];
  status: "draft" | "scheduled" | "sent";
  scheduledFor?: string;
}

const NewsletterBuilder = () => {
  const [activeTab, setActiveTab] = useState("builder");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [newsletter, setNewsletter] = useState<Newsletter>({
    subject: "",
    previewText: "",
    sections: [
      {
        id: "hero-1",
        type: "hero",
        content: {
          title: "Your Weekly Marketing Insights",
          subtitle: "The latest trends, tips, and strategies",
          imageUrl: "/og-image.jpg",
        },
      },
    ],
    status: "draft",
  });
  const [subscribers, setSubscribers] = useState<{ email: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("hero-1");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("email, name")
        .eq("status", "active");

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  const sectionTypes = [
    { type: "hero", label: "Hero Section", icon: ImageIcon },
    { type: "text", label: "Text Block", icon: FileText },
    { type: "featured", label: "Featured Article", icon: Sparkles },
    { type: "grid", label: "Content Grid", icon: BarChart3 },
    { type: "cta", label: "Call to Action", icon: LinkIcon },
    { type: "divider", label: "Divider", icon: GripVertical },
  ];

  const addSection = (type: NewsletterSection["type"]) => {
    const newSection: NewsletterSection = {
      id: `${type}-${Date.now()}`,
      type,
      content: {},
    };

    if (type === "hero") {
      newSection.content = {
        title: "Section Title",
        subtitle: "Section subtitle goes here",
        imageUrl: "",
      };
    } else if (type === "text") {
      newSection.content = {
        body: "Add your content here...",
      };
    } else if (type === "featured") {
      newSection.content = {
        title: "Featured Article Title",
        body: "Brief description of the featured content...",
        imageUrl: "",
        buttonText: "Read More",
        buttonUrl: "#",
      };
    } else if (type === "grid") {
      newSection.content = {
        items: [
          { title: "Article 1", description: "Description...", url: "#" },
          { title: "Article 2", description: "Description...", url: "#" },
          { title: "Article 3", description: "Description...", url: "#" },
        ],
      };
    } else if (type === "cta") {
      newSection.content = {
        title: "Ready to get started?",
        body: "Contact us today for a free consultation",
        buttonText: "Get Started",
        buttonUrl: "#",
      };
    }

    setNewsletter((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    setExpandedSection(newSection.id);
  };

  const removeSection = (sectionId: string) => {
    setNewsletter((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
    }));
  };

  const updateSection = (sectionId: string, content: Partial<NewsletterSection["content"]>) => {
    setNewsletter((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, content: { ...s.content, ...content } } : s
      ),
    }));
  };

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: {
          prompt: `Create engaging newsletter content including a catchy subject line, preview text, and a featured article about digital marketing trends.`,
          contentType: "newsletter",
          platform: "email",
          tone: "professional",
          count: 1,
        },
      });

      if (error) throw error;

      if (data?.content?.[0]) {
        const generated = data.content[0];
        setNewsletter((prev) => ({
          ...prev,
          subject: generated.title || prev.subject,
          previewText: generated.subtitle || prev.previewText,
          sections: prev.sections.map((s, i) =>
            i === 0 && s.type === "hero"
              ? { ...s, content: { ...s.content, title: generated.title, subtitle: generated.subtitle } }
              : s
          ),
        }));
        toast.success("Content generated successfully");
      }
    } catch (error: any) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!newsletter.subject.trim()) {
      toast.error("Please enter a subject line");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from("newsletters").insert([{
        subject: newsletter.subject,
        preview_text: newsletter.previewText,
        content_json: JSON.parse(JSON.stringify({ sections: newsletter.sections })),
        status: "draft",
      }]);

      if (error) throw error;
      toast.success("Newsletter saved as draft");
    } catch (error: any) {
      console.error("Error saving newsletter:", error);
      toast.error("Failed to save newsletter");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newsletter.subject.trim()) {
      toast.error("Please enter a subject line");
      return;
    }

    if (subscribers.length === 0) {
      toast.error("No subscribers to send to");
      return;
    }

    setIsSending(true);
    try {
      // Generate HTML from sections
      const html = generateEmailHtml(newsletter);

      const { error } = await supabase.functions.invoke("send-newsletter", {
        body: {
          subject: newsletter.subject,
          previewText: newsletter.previewText,
          html,
          subscribers: subscribers.map((s) => s.email),
        },
      });

      if (error) throw error;

      toast.success(`Newsletter sent to ${subscribers.length} subscribers`);
      setNewsletter((prev) => ({ ...prev, status: "sent" }));
    } catch (error: any) {
      console.error("Error sending newsletter:", error);
      toast.error("Failed to send newsletter. Make sure RESEND_API_KEY is configured.");
    } finally {
      setIsSending(false);
    }
  };

  const generateEmailHtml = (nl: Newsletter): string => {
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${nl.subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #10b981, #3b82f6); padding: 40px 20px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 10px 0 0; opacity: 0.9; }
          .content { padding: 30px 20px; }
          .section { margin-bottom: 30px; }
          .section h2 { color: #1e293b; margin: 0 0 10px; }
          .section p { color: #64748b; line-height: 1.6; margin: 0; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; }
          .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; }
          .grid-item { border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; }
          .footer { background: #1e293b; color: #94a3b8; padding: 30px 20px; text-align: center; font-size: 12px; }
          .divider { border-top: 1px solid #e2e8f0; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
    `;

    nl.sections.forEach((section) => {
      switch (section.type) {
        case "hero":
          html += `
            <div class="header">
              ${section.content.imageUrl ? `<img src="${section.content.imageUrl}" alt="Header" style="max-width: 100%; margin-bottom: 20px; border-radius: 8px;">` : ""}
              <h1>${section.content.title || ""}</h1>
              <p>${section.content.subtitle || ""}</p>
            </div>
          `;
          break;
        case "text":
          html += `
            <div class="content">
              <div class="section">
                <p>${section.content.body || ""}</p>
              </div>
            </div>
          `;
          break;
        case "featured":
          html += `
            <div class="content">
              <div class="section">
                ${section.content.imageUrl ? `<img src="${section.content.imageUrl}" alt="Featured" style="max-width: 100%; margin-bottom: 15px; border-radius: 8px;">` : ""}
                <h2>${section.content.title || ""}</h2>
                <p>${section.content.body || ""}</p>
                ${section.content.buttonText ? `<p style="margin-top: 15px;"><a href="${section.content.buttonUrl || "#"}" class="button">${section.content.buttonText}</a></p>` : ""}
              </div>
            </div>
          `;
          break;
        case "grid":
          html += `
            <div class="content">
              <div class="grid">
                ${(section.content.items || [])
                  .map(
                    (item) => `
                    <div class="grid-item">
                      <h3 style="margin: 0 0 5px; font-size: 16px; color: #1e293b;">${item.title}</h3>
                      <p style="margin: 0; font-size: 14px;">${item.description}</p>
                    </div>
                  `
                  )
                  .join("")}
              </div>
            </div>
          `;
          break;
        case "cta":
          html += `
            <div class="content" style="text-align: center; padding: 40px 20px;">
              <h2>${section.content.title || ""}</h2>
              <p style="margin-bottom: 20px;">${section.content.body || ""}</p>
              ${section.content.buttonText ? `<a href="${section.content.buttonUrl || "#"}" class="button">${section.content.buttonText}</a>` : ""}
            </div>
          `;
          break;
        case "divider":
          html += `<div class="content"><div class="divider"></div></div>`;
          break;
      }
    });

    html += `
          <div class="footer">
            <p>You're receiving this because you subscribed to our newsletter.</p>
            <p><a href="#" style="color: #94a3b8;">Unsubscribe</a> | <a href="#" style="color: #94a3b8;">View in browser</a></p>
            <p style="margin-top: 15px;">© ${new Date().getFullYear()} Avorria. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return html;
  };

  const renderSectionEditor = (section: NewsletterSection) => {
    const isExpanded = expandedSection === section.id;
    const sectionType = sectionTypes.find((s) => s.type === section.type);
    const Icon = sectionType?.icon || FileText;

    return (
      <Card key={section.id} className="border-border/50">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
          onClick={() => setExpandedSection(isExpanded ? null : section.id)}
        >
          <div className="flex items-center gap-3">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            <Icon className="h-4 w-4 text-accent" />
            <span className="font-medium capitalize">{section.type.replace("-", " ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                removeSection(section.id);
              }}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>

        {isExpanded && (
          <CardContent className="border-t pt-4 space-y-4">
            {section.type === "hero" && (
              <>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={section.content.title || ""}
                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                    placeholder="Newsletter title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Input
                    value={section.content.subtitle || ""}
                    onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                    placeholder="Subtitle or tagline"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Header Image URL</Label>
                  <Input
                    value={section.content.imageUrl || ""}
                    onChange={(e) => updateSection(section.id, { imageUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </>
            )}

            {section.type === "text" && (
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  value={section.content.body || ""}
                  onChange={(e) => updateSection(section.id, { body: e.target.value })}
                  placeholder="Write your content..."
                  className="min-h-[120px]"
                />
              </div>
            )}

            {section.type === "featured" && (
              <>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={section.content.title || ""}
                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={section.content.body || ""}
                    onChange={(e) => updateSection(section.id, { body: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={section.content.imageUrl || ""}
                    onChange={(e) => updateSection(section.id, { imageUrl: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input
                      value={section.content.buttonText || ""}
                      onChange={(e) => updateSection(section.id, { buttonText: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Button URL</Label>
                    <Input
                      value={section.content.buttonUrl || ""}
                      onChange={(e) => updateSection(section.id, { buttonUrl: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            {section.type === "cta" && (
              <>
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input
                    value={section.content.title || ""}
                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    value={section.content.body || ""}
                    onChange={(e) => updateSection(section.id, { body: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input
                      value={section.content.buttonText || ""}
                      onChange={(e) => updateSection(section.id, { buttonText: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Button URL</Label>
                    <Input
                      value={section.content.buttonUrl || ""}
                      onChange={(e) => updateSection(section.id, { buttonUrl: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Newsletter Builder</h2>
          <p className="text-muted-foreground">
            Create beautiful newsletters with our visual builder
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Users className="h-3 w-3" />
            {subscribers.length} subscribers
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="builder" className="gap-2">
            <Mail className="h-4 w-4" />
            Builder
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="digest" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Weekly Digest
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Clock className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Builder Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Subject & Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="subject"
                        value={newsletter.subject}
                        onChange={(e) =>
                          setNewsletter((prev) => ({ ...prev, subject: e.target.value }))
                        }
                        placeholder="Your attention-grabbing subject..."
                      />
                      <Button
                        variant="outline"
                        onClick={handleGenerateContent}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preview">Preview Text</Label>
                    <Input
                      id="preview"
                      value={newsletter.previewText}
                      onChange={(e) =>
                        setNewsletter((prev) => ({ ...prev, previewText: e.target.value }))
                      }
                      placeholder="This appears next to your subject in inbox..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Sections */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Content Sections</CardTitle>
                    <CardDescription>Drag and drop to reorder</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-[500px]">
                    <div className="space-y-3 pr-4">
                      {newsletter.sections.map((section) => renderSectionEditor(section))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Add Sections */}
              <Card>
                <CardHeader>
                  <CardTitle>Add Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {sectionTypes.map((type) => (
                      <Button
                        key={type.type}
                        variant="outline"
                        className="flex-col gap-1 h-auto py-3"
                        onClick={() => addSection(type.type as NewsletterSection["type"])}
                      >
                        <type.icon className="h-4 w-4" />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleSave} disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Draft
                  </Button>
                  <Button
                    onClick={() => setActiveTab("preview")}
                    variant="outline"
                    className="w-full"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Separator />
                  <Button
                    onClick={handleSend}
                    disabled={isSending || subscribers.length === 0}
                    className="w-full"
                    variant="default"
                  >
                    {isSending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Send to {subscribers.length} subscribers
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Email Preview</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={previewMode === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("desktop")}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewMode === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${
                  previewMode === "mobile" ? "max-w-sm" : "max-w-2xl"
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: generateEmailHtml(newsletter) }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter History</CardTitle>
              <CardDescription>Previously sent newsletters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No newsletters sent yet</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Your sent newsletters will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsletterBuilder;
