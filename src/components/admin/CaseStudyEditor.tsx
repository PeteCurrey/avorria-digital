'use client';
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Save, Sparkles, Loader2, Info, BarChart3, FileText, Image, Quote, Layout } from "lucide-react";
import {
  useCreateCaseStudy,
  useUpdateCaseStudy,
  CaseStudyDB,
  CaseStudyInsert,
  BeforeAfterPair,
} from "@/hooks/useCaseStudies";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploader, MultiImageUploader } from "./ImageUploader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface CaseStudyEditorProps {
  caseStudy: CaseStudyDB | null;
  onClose: () => void;
}

const defaultCaseStudy: CaseStudyInsert = {
  slug: "",
  title: "",
  client: "",
  sector: "",
  services: [],
  timeframe: "",
  year: new Date().getFullYear(),
  outcome: "leads",
  hero_media_type: "image",
  hero_media_src: "",
  headline: "",
  subheadline: "",
  kpi_badges: [{ label: "", value: "", highlight: false }],
  problem: "",
  approach: [{ phase: "Discovery", title: "", description: "", duration: "" }],
  outcomes: [{ label: "", value: "", baseline: "", highlight: false }],
  gallery_media: [],
  before_after_pairs: [],
  related_slugs: [],
  is_featured: false,
  is_published: false,
};

const CaseStudyEditor = ({ caseStudy, onClose }: CaseStudyEditorProps) => {
  const [formData, setFormData] = useState<CaseStudyInsert>(
    caseStudy
      ? {
          slug: caseStudy.slug,
          title: caseStudy.title,
          client: caseStudy.client,
          sector: caseStudy.sector,
          services: caseStudy.services,
          timeframe: caseStudy.timeframe,
          year: caseStudy.year,
          outcome: caseStudy.outcome,
          hero_media_type: caseStudy.hero_media_type,
          hero_media_src: caseStudy.hero_media_src,
          hero_media_poster: caseStudy.hero_media_poster,
          headline: caseStudy.headline,
          subheadline: caseStudy.subheadline,
          kpi_badges: caseStudy.kpi_badges,
          problem: caseStudy.problem,
          approach: caseStudy.approach,
          outcomes: caseStudy.outcomes,
          gallery_media: caseStudy.gallery_media,
          before_media: caseStudy.before_media,
          after_media: caseStudy.after_media,
          before_after_pairs: caseStudy.before_after_pairs || [],
          quote: caseStudy.quote,
          pdf_content: caseStudy.pdf_content,
          related_slugs: caseStudy.related_slugs || [],
          is_featured: caseStudy.is_featured,
          is_published: caseStudy.is_published,
        }
      : defaultCaseStudy
  );

  const createMutation = useCreateCaseStudy();
  const updateMutation = useUpdateCaseStudy();

  const handleSave = async () => {
    try {
      if (caseStudy) {
        await updateMutation.mutateAsync({ id: caseStudy.id, updates: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving case study:", error);
    }
  };

  const updateField = <K extends keyof CaseStudyInsert>(
    key: K,
    value: CaseStudyInsert[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addKpiBadge = () => {
    updateField("kpi_badges", [
      ...formData.kpi_badges,
      { label: "", value: "", highlight: false },
    ]);
  };

  const removeKpiBadge = (index: number) => {
    updateField(
      "kpi_badges",
      formData.kpi_badges.filter((_, i) => i !== index)
    );
  };

  const updateKpiBadge = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updated = [...formData.kpi_badges];
    updated[index] = { ...updated[index], [field]: value };
    updateField("kpi_badges", updated);
  };

  const addApproachStep = () => {
    updateField("approach", [
      ...formData.approach,
      { phase: "", title: "", description: "", duration: "" },
    ]);
  };

  const removeApproachStep = (index: number) => {
    updateField(
      "approach",
      formData.approach.filter((_, i) => i !== index)
    );
  };

  const updateApproachStep = (index: number, field: string, value: string) => {
    const updated = [...formData.approach];
    updated[index] = { ...updated[index], [field]: value };
    updateField("approach", updated);
  };

  const addOutcome = () => {
    updateField("outcomes", [
      ...formData.outcomes,
      { label: "", value: "", baseline: "", highlight: false },
    ]);
  };

  const removeOutcome = (index: number) => {
    updateField(
      "outcomes",
      formData.outcomes.filter((_, i) => i !== index)
    );
  };

  const updateOutcome = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updated = [...formData.outcomes];
    updated[index] = { ...updated[index], [field]: value };
    updateField("outcomes", updated);
  };

  const [isGenerating, setIsGenerating] = useState(false);
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const canGenerate = formData.client.trim() && formData.sector.trim();

  const handleAIGenerate = async () => {
          "Authorization": `Bearer ${supabaseKey}`,
          "apikey": supabaseKey,
        },
        body: JSON.stringify({
          client: formData.client,
          sector: formData.sector,
          services: formData.services,
          outcome: formData.outcome,
          timeframe: formData.timeframe || "6 months",
          year: formData.year,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      if (data?.error) throw new Error(data.error);

      // Only populate empty fields
      setFormData((prev) => ({
        ...prev,
        headline: prev.headline || data.headline || "",
        subheadline: prev.subheadline || data.subheadline || "",
        problem: prev.problem || data.problem || "",
        title: prev.title || data.title || "",
        slug: prev.slug || data.slug || "",
        approach: prev.approach.length <= 1 && !prev.approach[0]?.title ? (data.approach || prev.approach) : prev.approach,
        kpi_badges: prev.kpi_badges.length <= 1 && !prev.kpi_badges[0]?.label ? (data.kpi_badges || prev.kpi_badges) : prev.kpi_badges,
        outcomes: prev.outcomes.length <= 1 && !prev.outcomes[0]?.label ? (data.outcomes || prev.outcomes) : prev.outcomes,
        quote: prev.quote?.text ? prev.quote : (data.quote || prev.quote),
      }));

      toast({ title: "Content generated", description: "AI-generated content has been added to empty fields. Review and adjust as needed." });
    } catch (err: any) {
      console.error("AI generation error:", err);
      toast({ title: "Generation failed", description: err.message || "Something went wrong. Try again.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  // Tab completion indicators
  const tabStatus = {
    basic: !!(formData.client && formData.sector && formData.title),
    hero: !!(formData.headline && formData.hero_media_src),
    content: !!(formData.problem && formData.approach[0]?.title),
    outcomes: !!(formData.outcomes[0]?.label),
    media: !!(formData.hero_media_src),
    quote: !!(formData.quote?.text),
  };

  return (
    <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-light text-foreground">
                  {caseStudy ? "Edit Case Study" : "New Case Study"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {caseStudy
                    ? `Editing: ${caseStudy.client}`
                    : "Create a new case study"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={handleAIGenerate}
                disabled={isGenerating || !canGenerate}
                className="gap-2 border-accent/30 text-accent hover:bg-accent/10 hover:text-accent"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {isGenerating ? "Generating..." : "Generate with AI"}
              </Button>
              <div className="flex items-center gap-2">
                <Label htmlFor="published" className="text-sm">
                  Published
                </Label>
                <Switch
                  id="published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) =>
                    updateField("is_published", checked)
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="featured" className="text-sm">
                  Featured
                </Label>
                <Switch
                  id="featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) =>
                    updateField("is_featured", checked)
                  }
                />
              </div>
              <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="basic" className="gap-1.5">
                <Info className="h-3.5 w-3.5" />
                Basic Info
                {tabStatus.basic && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500" />}
              </TabsTrigger>
              <TabsTrigger value="hero" className="gap-1.5">
                <Layout className="h-3.5 w-3.5" />
                Hero
                {tabStatus.hero && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500" />}
              </TabsTrigger>
              <TabsTrigger value="content" className="gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                Content
                {tabStatus.content && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500" />}
              </TabsTrigger>
              <TabsTrigger value="outcomes" className="gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" />
                Outcomes
                {tabStatus.outcomes && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500" />}
              </TabsTrigger>
              <TabsTrigger value="media" className="gap-1.5">
                <Image className="h-3.5 w-3.5" />
                Media
                {tabStatus.media && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500" />}
              </TabsTrigger>
              <TabsTrigger value="quote" className="gap-1.5">
                <Quote className="h-3.5 w-3.5" />
                Quote
                {tabStatus.quote && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500" />}
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        placeholder="Case study title..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) =>
                          updateField(
                            "slug",
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9-]/g, "-")
                          )
                        }
                        placeholder="url-friendly-slug"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Client Name</Label>
                      <Input
                        id="client"
                        value={formData.client}
                        onChange={(e) => updateField("client", e.target.value)}
                        placeholder="Client name..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sector">Sector</Label>
                      <Input
                        id="sector"
                        value={formData.sector}
                        onChange={(e) => updateField("sector", e.target.value)}
                        placeholder="e.g., Facilities Management"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        value={formData.year}
                        onChange={(e) =>
                          updateField("year", parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeframe">Timeframe</Label>
                      <Input
                        id="timeframe"
                        value={formData.timeframe}
                        onChange={(e) =>
                          updateField("timeframe", e.target.value)
                        }
                        placeholder="e.g., 6 months"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="outcome">Primary Outcome</Label>
                      <Select
                        value={formData.outcome}
                        onValueChange={(value) =>
                          updateField(
                            "outcome",
                            value as "leads" | "revenue" | "traffic" | "efficiency"
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leads">Leads</SelectItem>
                          <SelectItem value="revenue">Revenue</SelectItem>
                          <SelectItem value="traffic">Traffic</SelectItem>
                          <SelectItem value="efficiency">Efficiency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="services">Services (comma-separated)</Label>
                    <Input
                      id="services"
                      value={formData.services.join(", ")}
                      onChange={(e) =>
                        updateField(
                          "services",
                          e.target.value.split(",").map((s) => s.trim())
                        )
                      }
                      placeholder="Web Design, SEO, Content Strategy..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hero Tab */}
            <TabsContent value="hero">
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="headline">Headline</Label>
                    <Input
                      id="headline"
                      value={formData.headline}
                      onChange={(e) => updateField("headline", e.target.value)}
                      placeholder="Bold, impactful headline..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subheadline">Subheadline</Label>
                    <Textarea
                      id="subheadline"
                      value={formData.subheadline}
                      onChange={(e) =>
                        updateField("subheadline", e.target.value)
                      }
                      placeholder="Supporting description..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="heroMediaType">Media Type</Label>
                      <Select
                        value={formData.hero_media_type}
                        onValueChange={(value) =>
                          updateField(
                            "hero_media_type",
                            value as "image" | "video"
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroMediaSrc">Media URL</Label>
                      <Input
                        id="heroMediaSrc"
                        value={formData.hero_media_src}
                        onChange={(e) =>
                          updateField("hero_media_src", e.target.value)
                        }
                        placeholder="/lovable-uploads/..."
                      />
                    </div>
                  </div>

                  {/* KPI Badges */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>KPI Badges</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addKpiBadge}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Badge
                      </Button>
                    </div>
                    {formData.kpi_badges.map((badge, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-4 gap-2 items-end"
                      >
                        <Input
                          placeholder="Label"
                          value={badge.label}
                          onChange={(e) =>
                            updateKpiBadge(index, "label", e.target.value)
                          }
                        />
                        <Input
                          placeholder="Value"
                          value={badge.value}
                          onChange={(e) =>
                            updateKpiBadge(index, "value", e.target.value)
                          }
                        />
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={badge.highlight}
                            onCheckedChange={(checked) =>
                              updateKpiBadge(index, "highlight", checked)
                            }
                          />
                          <span className="text-sm text-muted-foreground">
                            Highlight
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeKpiBadge(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Problem & Approach</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="problem">The Problem</Label>
                    <Textarea
                      id="problem"
                      value={formData.problem}
                      onChange={(e) => updateField("problem", e.target.value)}
                      placeholder="Describe the challenge..."
                      rows={8}
                    />
                  </div>

                  {/* Approach Steps */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Approach Timeline</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addApproachStep}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Step
                      </Button>
                    </div>
                    {formData.approach.map((step, index) => (
                      <div
                        key={index}
                        className="p-4 border border-border rounded-lg space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Step {index + 1}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeApproachStep(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="Phase (e.g., Discovery)"
                            value={step.phase}
                            onChange={(e) =>
                              updateApproachStep(index, "phase", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Duration"
                            value={step.duration || ""}
                            onChange={(e) =>
                              updateApproachStep(
                                index,
                                "duration",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <Input
                          placeholder="Title"
                          value={step.title}
                          onChange={(e) =>
                            updateApproachStep(index, "title", e.target.value)
                          }
                        />
                        <Textarea
                          placeholder="Description"
                          value={step.description}
                          onChange={(e) =>
                            updateApproachStep(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={3}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Outcomes Tab */}
            <TabsContent value="outcomes">
              <Card>
                <CardHeader>
                  <CardTitle>Results & Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Outcome Metrics</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addOutcome}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Outcome
                    </Button>
                  </div>
                  {formData.outcomes.map((outcome, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5 gap-2 items-end"
                    >
                      <Input
                        placeholder="Label"
                        value={outcome.label}
                        onChange={(e) =>
                          updateOutcome(index, "label", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Value"
                        value={outcome.value}
                        onChange={(e) =>
                          updateOutcome(index, "value", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Baseline"
                        value={outcome.baseline || ""}
                        onChange={(e) =>
                          updateOutcome(index, "baseline", e.target.value)
                        }
                      />
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={outcome.highlight}
                          onCheckedChange={(checked) =>
                            updateOutcome(index, "highlight", checked)
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          Highlight
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOutcome(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media">
              <div className="space-y-6">
                {/* Hero Image */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hero Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImageUploader
                      label="Hero Background"
                      value={formData.hero_media_src}
                      onChange={(url) => updateField("hero_media_src", url)}
                      folder="hero"
                    />
                  </CardContent>
                </Card>

                {/* Before/After Pairs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Before & After Comparisons</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newPair: BeforeAfterPair = {
                            id: crypto.randomUUID(),
                            label: `Page ${(formData.before_after_pairs?.length || 0) + 1}`,
                            beforeImage: "",
                            afterImage: "",
                          };
                          updateField("before_after_pairs", [
                            ...(formData.before_after_pairs || []),
                            newPair,
                          ]);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Page
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {(formData.before_after_pairs || []).length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No before/after comparisons yet. Add pages to show website transformations.
                      </p>
                    ) : (
                      (formData.before_after_pairs || []).map((pair, index) => (
                        <div
                          key={pair.id}
                          className="p-4 border border-border rounded-lg space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <Input
                              value={pair.label}
                              onChange={(e) => {
                                const updated = [...(formData.before_after_pairs || [])];
                                updated[index] = { ...updated[index], label: e.target.value };
                                updateField("before_after_pairs", updated);
                              }}
                              placeholder="Page label (e.g., Homepage, About)"
                              className="max-w-xs"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                updateField(
                                  "before_after_pairs",
                                  (formData.before_after_pairs || []).filter((_, i) => i !== index)
                                );
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <ImageUploader
                              label="Before"
                              value={pair.beforeImage}
                              onChange={(url) => {
                                const updated = [...(formData.before_after_pairs || [])];
                                updated[index] = { ...updated[index], beforeImage: url };
                                updateField("before_after_pairs", updated);
                              }}
                              folder={`before-after/${formData.slug || "new"}`}
                            />
                            <ImageUploader
                              label="After"
                              value={pair.afterImage}
                              onChange={(url) => {
                                const updated = [...(formData.before_after_pairs || [])];
                                updated[index] = { ...updated[index], afterImage: url };
                                updateField("before_after_pairs", updated);
                              }}
                              folder={`before-after/${formData.slug || "new"}`}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                {/* Gallery */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MultiImageUploader
                      label="Gallery Images"
                      images={(formData.gallery_media || []).map((m, i) => ({
                        id: `gallery-${i}`,
                        url: m.src,
                        label: m.alt,
                      }))}
                      onChange={(images) => {
                        updateField(
                          "gallery_media",
                          images.map((img) => ({
                            type: "image" as const,
                            src: img.url,
                            alt: img.label || "",
                          }))
                        );
                      }}
                      folder={`gallery/${formData.slug || "new"}`}
                    />
                  </CardContent>
                </Card>

                {/* Related Studies */}
                <Card>
                  <CardHeader>
                    <CardTitle>Related Case Studies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label>Related slugs (comma-separated)</Label>
                      <Input
                        value={formData.related_slugs.join(", ")}
                        onChange={(e) =>
                          updateField(
                            "related_slugs",
                            e.target.value.split(",").map((s) => s.trim())
                          )
                        }
                        placeholder="entirefm-rebrand, ogn-facility-management"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Quote Tab */}
            <TabsContent value="quote">
              <Card>
                <CardHeader>
                  <CardTitle>Client Testimonial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quoteText">Quote Text</Label>
                    <Textarea
                      id="quoteText"
                      value={formData.quote?.text || ""}
                      onChange={(e) =>
                        updateField("quote", {
                          ...formData.quote,
                          text: e.target.value,
                          name: formData.quote?.name || "",
                          role: formData.quote?.role || "",
                        })
                      }
                      placeholder="What the client said..."
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quoteName">Name</Label>
                      <Input
                        id="quoteName"
                        value={formData.quote?.name || ""}
                        onChange={(e) =>
                          updateField("quote", {
                            ...formData.quote,
                            text: formData.quote?.text || "",
                            name: e.target.value,
                            role: formData.quote?.role || "",
                          })
                        }
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quoteRole">Role</Label>
                      <Input
                        id="quoteRole"
                        value={formData.quote?.role || ""}
                        onChange={(e) =>
                          updateField("quote", {
                            ...formData.quote,
                            text: formData.quote?.text || "",
                            name: formData.quote?.name || "",
                            role: e.target.value,
                          })
                        }
                        placeholder="CEO"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quoteCompany">Company</Label>
                      <Input
                        id="quoteCompany"
                        value={formData.quote?.company || ""}
                        onChange={(e) =>
                          updateField("quote", {
                            ...formData.quote,
                            text: formData.quote?.text || "",
                            name: formData.quote?.name || "",
                            role: formData.quote?.role || "",
                            company: e.target.value,
                          })
                        }
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
  );
};

export default CaseStudyEditor;

