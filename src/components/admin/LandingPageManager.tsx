'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye,
  Loader2,
  Sparkles,
  Globe,
  FileText,
  Search,
  MapPin,
  Building2,
  ExternalLink,
  Copy,
  Check,
  X,
  Wand2,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { 
  useSEOLandingPages, 
  useCreateLandingPage, 
  useUpdateLandingPage, 
  useDeleteLandingPage,
  useToggleLandingPagePublish,
  useGenerateLandingPageContent,
  SEOLandingPage,
  CreateLandingPageInput,
} from "@/hooks/useSEOLandingPages";
import { useLandingPageAnalyticsSummary } from "@/hooks/useLandingPageAnalytics";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { industries } from "@/data/industries";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const defaultFormData: Partial<CreateLandingPageInput> = {
  slug: "",
  title: "",
  page_type: "service-location",
  service_slug: "seo",
  location_slug: "",
  industry_slug: "",
  hero_headline: "",
  hero_subheadline: "",
  primary_cta: "Book a Strategy Call",
  secondary_cta: "Request a Free Audit",
  problem_bullets: [],
  solution_bullets: [],
  key_metrics: [],
  process_steps: [],
  faq_list: [],
  target_keyword: "",
  meta_title: "",
  meta_description: "",
  is_published: false,
  is_featured: false,
};

export function LandingPageManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<SEOLandingPage | null>(null);
  const [formData, setFormData] = useState<Partial<CreateLandingPageInput>>(defaultFormData);
  const [activeFormTab, setActiveFormTab] = useState("basic");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterService, setFilterService] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCountry, setFilterCountry] = useState<string>("all");

  // Temp state for array fields
  const [problemBulletsText, setProblemBulletsText] = useState("");
  const [solutionBulletsText, setSolutionBulletsText] = useState("");

  const { data: pages, isLoading } = useSEOLandingPages();
  const { data: analyticsSummary } = useLandingPageAnalyticsSummary();
  const createPage = useCreateLandingPage();
  const updatePage = useUpdateLandingPage();
  const deletePage = useDeleteLandingPage();
  const togglePublish = useToggleLandingPagePublish();
  const generateContent = useGenerateLandingPageContent();

  // Get country from location_slug
  const getCountryFromLocation = (locationSlug: string | null) => {
    if (!locationSlug) return null;
    const location = locations.find(l => l.slug === locationSlug);
    return location?.countryCode || null;
  };

  const filteredPages = pages?.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = filterService === "all" || page.service_slug === filterService;
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "published" && page.is_published) ||
      (filterStatus === "draft" && !page.is_published);
    const matchesType = filterType === "all" || 
      (filterType === "location" && page.location_slug) ||
      (filterType === "industry" && page.industry_slug && !page.location_slug);
    const matchesCountry = filterCountry === "all" || getCountryFromLocation(page.location_slug) === filterCountry;
    return matchesSearch && matchesService && matchesStatus && matchesType && matchesCountry;
  });

  // Count pages by type
  const locationPageCount = pages?.filter(p => p.location_slug).length || 0;
  const industryPageCount = pages?.filter(p => p.industry_slug && !p.location_slug).length || 0;

  const handleOpenDialog = (page?: SEOLandingPage) => {
    if (page) {
      setEditingPage(page);
      setFormData({
        slug: page.slug,
        title: page.title,
        page_type: page.page_type,
        service_slug: page.service_slug,
        location_slug: page.location_slug || "",
        industry_slug: page.industry_slug || "",
        hero_headline: page.hero_headline,
        hero_subheadline: page.hero_subheadline,
        primary_cta: page.primary_cta,
        secondary_cta: page.secondary_cta,
        problem_bullets: page.problem_bullets || [],
        solution_bullets: page.solution_bullets || [],
        key_metrics: page.key_metrics || [],
        process_steps: page.process_steps || [],
        faq_list: page.faq_list || [],
        target_keyword: page.target_keyword,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        testimonial_quote: page.testimonial_quote || "",
        testimonial_author: page.testimonial_author || "",
        testimonial_role: page.testimonial_role || "",
        testimonial_company: page.testimonial_company || "",
        is_published: page.is_published,
        is_featured: page.is_featured,
      });
      setProblemBulletsText((page.problem_bullets || []).join("\n"));
      setSolutionBulletsText((page.solution_bullets || []).join("\n"));
    } else {
      setEditingPage(null);
      setFormData(defaultFormData);
      setProblemBulletsText("");
      setSolutionBulletsText("");
    }
    setActiveFormTab("basic");
    setIsDialogOpen(true);
  };

  const handleGenerateContent = async () => {
    if (!formData.service_slug) {
      toast.error("Please select a service first");
      return;
    }

    const service = services.find(s => s.slug === formData.service_slug)?.name || formData.service_slug;
    const location = formData.location_slug ? locations.find(l => l.slug === formData.location_slug)?.city : undefined;
    const industry = formData.industry_slug ? industries.find(i => i.slug === formData.industry_slug)?.name : undefined;

    try {
      const content = await generateContent.mutateAsync({ service, location, industry });
      
      setFormData(prev => ({
        ...prev,
        hero_headline: content.heroHeadline,
        hero_subheadline: content.heroSubheadline,
        problem_bullets: content.problemBullets,
        solution_bullets: content.solutionBullets,
        key_metrics: content.keyMetrics,
        process_steps: content.processSteps,
        faq_list: content.faqList,
        testimonial_quote: content.testimonialQuote,
        testimonial_author: content.testimonialAuthor,
        testimonial_role: content.testimonialRole,
        testimonial_company: content.testimonialCompany,
        target_keyword: content.targetKeyword,
        meta_title: content.metaTitle,
        meta_description: content.metaDescription,
      }));
      setProblemBulletsText(content.problemBullets?.join("\n") || "");
      setSolutionBulletsText(content.solutionBullets?.join("\n") || "");
      
      toast.success("Content generated! Review and customize as needed.");
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleAutoGenerateSlug = () => {
    const parts: string[] = [];
    if (formData.service_slug) parts.push(formData.service_slug);
    if (formData.location_slug) parts.push(formData.location_slug);
    if (formData.industry_slug) parts.push(formData.industry_slug);
    
    const slug = parts.join("-");
    const title = parts.map(p => {
      const service = services.find(s => s.slug === p);
      if (service) return service.name;
      const location = locations.find(l => l.slug === p);
      if (location) return location.city;
      const industry = industries.find(i => i.slug === p);
      if (industry) return industry.name;
      return p;
    }).join(" in ");

    setFormData(prev => ({
      ...prev,
      slug,
      title: title || slug,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.slug || !formData.title || !formData.hero_headline || !formData.service_slug) {
      toast.error("Please fill in all required fields");
      return;
    }

    const input: CreateLandingPageInput = {
      slug: formData.slug!,
      title: formData.title!,
      page_type: formData.page_type || "service-location",
      service_slug: formData.service_slug!,
      location_slug: formData.location_slug || undefined,
      industry_slug: formData.industry_slug || undefined,
      hero_headline: formData.hero_headline!,
      hero_subheadline: formData.hero_subheadline || "",
      primary_cta: formData.primary_cta,
      secondary_cta: formData.secondary_cta,
      problem_bullets: problemBulletsText.split("\n").filter(Boolean),
      solution_bullets: solutionBulletsText.split("\n").filter(Boolean),
      key_metrics: formData.key_metrics,
      process_steps: formData.process_steps,
      faq_list: formData.faq_list,
      testimonial_quote: formData.testimonial_quote,
      testimonial_author: formData.testimonial_author,
      testimonial_role: formData.testimonial_role,
      testimonial_company: formData.testimonial_company,
      target_keyword: formData.target_keyword || formData.slug!,
      meta_title: formData.meta_title || formData.title!,
      meta_description: formData.meta_description || formData.hero_subheadline || "",
      is_published: formData.is_published,
      is_featured: formData.is_featured,
    };

    if (editingPage) {
      await updatePage.mutateAsync({ id: editingPage.id, updates: input });
    } else {
      await createPage.mutateAsync(input);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this landing page?")) {
      await deletePage.mutateAsync(id);
    }
  };

  const handleTogglePublish = async (page: SEOLandingPage) => {
    await togglePublish.mutateAsync({ id: page.id, is_published: !page.is_published });
  };

  const getPageUrl = (page: SEOLandingPage) => {
    // Determine the correct URL based on service
    const prefixMap: Record<string, string> = {
      seo: "/seo-agency",
      "web-design": "/web-design",
      "paid-media": "/paid-media-agency",
      "digital-marketing": "/digital-marketing-agency",
    };
    const prefix = prefixMap[page.service_slug] || `/${page.service_slug}`;
    return `${prefix}/${page.slug}`;
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
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SEO Landing Pages</h2>
          <p className="text-muted-foreground">
            Create and manage location, service, and industry landing pages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Globe className="h-3 w-3" />
            {pages?.length || 0} pages
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Check className="h-3 w-3" />
            {pages?.filter(p => p.is_published).length || 0} published
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Page type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types ({pages?.length || 0})</SelectItem>
            <SelectItem value="location">Location ({locationPageCount})</SelectItem>
            <SelectItem value="industry">Industry ({industryPageCount})</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCountry} onValueChange={setFilterCountry}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="GB">🇬🇧 UK</SelectItem>
            <SelectItem value="US">🇺🇸 USA</SelectItem>
            <SelectItem value="AU">🇦🇺 Australia</SelectItem>
            <SelectItem value="NZ">🇳🇿 New Zealand</SelectItem>
            <SelectItem value="CA">🇨🇦 Canada</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterService} onValueChange={setFilterService}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {services.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              New Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>
                {editingPage ? "Edit Landing Page" : "Create New Landing Page"}
              </DialogTitle>
              <DialogDescription>
                Build SEO-optimized landing pages for services, locations, and industries
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeFormTab} onValueChange={setActiveFormTab} className="flex-1 overflow-hidden flex flex-col">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="proof">Social Proof</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>
              
              <ScrollArea className="flex-1 px-1">
                <TabsContent value="basic" className="space-y-4 py-4">
                  {/* Service/Location/Industry Selection */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Service *</Label>
                      <Select
                        value={formData.service_slug}
                        onValueChange={(v) => setFormData(prev => ({ ...prev, service_slug: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Select
                        value={formData.location_slug || "none"}
                        onValueChange={(v) => setFormData(prev => ({ ...prev, location_slug: v === "none" ? "" : v }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No location</SelectItem>
                          {locations.map((l) => (
                            <SelectItem key={l.slug} value={l.slug}>{l.city}, {l.country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select
                        value={formData.industry_slug || "none"}
                        onValueChange={(v) => setFormData(prev => ({ ...prev, industry_slug: v === "none" ? "" : v }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No industry</SelectItem>
                          {industries.map((i) => (
                            <SelectItem key={i.slug} value={i.slug}>{i.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={handleAutoGenerateSlug}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Auto-generate Slug & Title
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleGenerateContent}
                      disabled={generateContent.isPending}
                    >
                      {generateContent.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                      )}
                      Generate All Content with AI
                    </Button>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>URL Slug *</Label>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="e.g., seo-london"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Page Title *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., SEO Services in London"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hero Headline *</Label>
                    <Input
                      value={formData.hero_headline}
                      onChange={(e) => setFormData(prev => ({ ...prev, hero_headline: e.target.value }))}
                      placeholder="A compelling headline that grabs attention"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Hero Subheadline</Label>
                    <Textarea
                      value={formData.hero_subheadline}
                      onChange={(e) => setFormData(prev => ({ ...prev, hero_subheadline: e.target.value }))}
                      placeholder="Supporting text that expands on the headline"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary CTA</Label>
                      <Input
                        value={formData.primary_cta}
                        onChange={(e) => setFormData(prev => ({ ...prev, primary_cta: e.target.value }))}
                        placeholder="Book a Strategy Call"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary CTA</Label>
                      <Input
                        value={formData.secondary_cta}
                        onChange={(e) => setFormData(prev => ({ ...prev, secondary_cta: e.target.value }))}
                        placeholder="Request a Free Audit"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Problem Bullets (one per line)</Label>
                    <Textarea
                      value={problemBulletsText}
                      onChange={(e) => setProblemBulletsText(e.target.value)}
                      placeholder="Pain points your audience faces...&#10;One bullet per line"
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Solution Bullets (one per line)</Label>
                    <Textarea
                      value={solutionBulletsText}
                      onChange={(e) => setSolutionBulletsText(e.target.value)}
                      placeholder="How you solve those problems...&#10;One bullet per line"
                      className="min-h-[150px]"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="proof" className="space-y-4 py-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Testimonial</h4>
                    <div className="space-y-2">
                      <Label>Quote</Label>
                      <Textarea
                        value={formData.testimonial_quote || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, testimonial_quote: e.target.value }))}
                        placeholder="What a satisfied client says about working with you..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Author Name</Label>
                        <Input
                          value={formData.testimonial_author || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, testimonial_author: e.target.value }))}
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Input
                          value={formData.testimonial_role || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, testimonial_role: e.target.value }))}
                          placeholder="Marketing Director"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          value={formData.testimonial_company || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, testimonial_company: e.target.value }))}
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Target Keyword</Label>
                    <Input
                      value={formData.target_keyword}
                      onChange={(e) => setFormData(prev => ({ ...prev, target_keyword: e.target.value }))}
                      placeholder="e.g., seo agency london"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Meta Title (under 60 chars)</Label>
                    <Input
                      value={formData.meta_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                      placeholder="SEO Agency London | Avorria"
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.meta_title?.length || 0}/60 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Meta Description (under 160 chars)</Label>
                    <Textarea
                      value={formData.meta_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                      placeholder="Compelling description that appears in search results..."
                      className="min-h-[80px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.meta_description?.length || 0}/160 characters
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Publish Page</Label>
                      <p className="text-sm text-muted-foreground">Make this page visible to the public</p>
                    </div>
                    <Switch
                      checked={formData.is_published}
                      onCheckedChange={(v) => setFormData(prev => ({ ...prev, is_published: v }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Featured Page</Label>
                      <p className="text-sm text-muted-foreground">Highlight this page in listings</p>
                    </div>
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(v) => setFormData(prev => ({ ...prev, is_featured: v }))}
                    />
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={createPage.isPending || updatePage.isPending}
              >
                {(createPage.isPending || updatePage.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingPage ? "Update Page" : "Create Page"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pages List */}
      {filteredPages?.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Globe className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No landing pages yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first SEO landing page to start ranking for local and industry-specific searches
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Create Landing Page
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPages?.map((page) => {
            const analytics = analyticsSummary?.[page.id];
            return (
            <Card key={page.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{page.title}</h3>
                      {page.is_published ? (
                        <Badge variant="default" className="bg-green-600">Published</Badge>
                      ) : (
                        <Badge variant="outline">Draft</Badge>
                      )}
                      {page.is_featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {getPageUrl(page)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="gap-1">
                        <FileText className="h-3 w-3" />
                        {services.find(s => s.slug === page.service_slug)?.name || page.service_slug}
                      </Badge>
                      {page.location_slug && (
                        <Badge variant="outline" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          {locations.find(l => l.slug === page.location_slug)?.city || page.location_slug}
                        </Badge>
                      )}
                      {page.industry_slug && (
                        <Badge variant="outline" className="gap-1">
                          <Building2 className="h-3 w-3" />
                          {industries.find(i => i.slug === page.industry_slug)?.name || page.industry_slug}
                        </Badge>
                      )}
                    </div>
                    {/* Analytics summary */}
                    {analytics && (
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BarChart3 className="h-3 w-3" />
                          {analytics.total_views.toLocaleString()} views
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {analytics.total_conversions} conversions
                        </span>
                        <span>
                          {analytics.conversion_rate.toFixed(1)}% CVR
                        </span>
                        <span>
                          {analytics.avg_bounce_rate.toFixed(0)}% bounce
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Updated {formatDistanceToNow(new Date(page.updated_at), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTogglePublish(page)}
                    >
                      {page.is_published ? (
                        <>
                          <X className="h-4 w-4 mr-1" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Publish
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                    >
                      <a href={getPageUrl(page)} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenDialog(page)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(page.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )})}
        </div>
      )}
    </div>
  );
}

