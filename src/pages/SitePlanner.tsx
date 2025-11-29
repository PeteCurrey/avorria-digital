import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Save, LayoutDashboard, Eye } from "lucide-react";
import { PageTemplateLibrary } from "@/components/site-planner/PageTemplateLibrary";
import { SiteStructureBuilder } from "@/components/site-planner/SiteStructureBuilder";
import { trackEvent } from "@/lib/tracking";

interface WebsitePlan {
  id?: string;
  name: string;
  description: string;
  status: string;
}

export default function SitePlanner() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plan, setPlan] = useState<WebsitePlan>({
    name: "",
    description: "",
    status: "draft"
  });
  const [selectedPages, setSelectedPages] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to use the site planner");
      navigate("/auth/login");
    } else {
      trackEvent("site_planner_viewed", {
        user_id: user.id
      });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (plan.name || selectedPages.length > 0) {
      setHasUnsavedChanges(true);
    }
  }, [plan, selectedPages]);

  const handleAddPage = (template: any) => {
    const newPage = {
      page_type: template.id,
      page_title: template.name,
      page_slug: template.defaultSlug,
      sections: template.sections.filter((s: any) => s.isDefault).map((s: any) => s.id),
      is_enabled: true,
      position: selectedPages.length
    };
    
    setSelectedPages([...selectedPages, newPage]);
    trackEvent("site_planner_page_added", {
      page_type: template.id,
      page_title: template.name
    });
    toast.success(`Added ${template.name}`);
  };

  const handleRemovePage = (index: number) => {
    const page = selectedPages[index];
    setSelectedPages(selectedPages.filter((_, i) => i !== index));
    trackEvent("site_planner_page_removed", {
      page_type: page.page_type,
      page_title: page.page_title
    });
  };

  const handleUpdatePage = (index: number, updates: any) => {
    const updated = [...selectedPages];
    updated[index] = { ...updated[index], ...updates };
    setSelectedPages(updated);
  };

  const handleReorderPages = (newOrder: any[]) => {
    setSelectedPages(newOrder.map((page, index) => ({ ...page, position: index })));
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to save");
      return;
    }

    if (!plan.name) {
      toast.error("Please enter a plan name");
      return;
    }

    if (selectedPages.length === 0) {
      toast.error("Please add at least one page");
      return;
    }

    setIsSaving(true);

    try {
      let planId = plan.id;

      // Create or update plan
      if (planId) {
        const { error: updateError } = await supabase
          .from("website_plans")
          .update({
            name: plan.name,
            description: plan.description,
            status: plan.status
          })
          .eq("id", planId);

        if (updateError) throw updateError;
      } else {
        const { data: newPlan, error: insertError } = await supabase
          .from("website_plans")
          .insert({
            user_id: user.id,
            name: plan.name,
            description: plan.description,
            status: plan.status
          })
          .select()
          .single();

        if (insertError) throw insertError;
        planId = newPlan.id;
        setPlan({ ...plan, id: planId });
      }

      // Delete existing pages
      const { error: deleteError } = await supabase
        .from("website_plan_pages")
        .delete()
        .eq("plan_id", planId);

      if (deleteError) throw deleteError;

      // Insert updated pages
      const { error: pagesError } = await supabase
        .from("website_plan_pages")
        .insert(
          selectedPages.map(page => ({
            plan_id: planId,
            ...page
          }))
        );

      if (pagesError) throw pagesError;

      setHasUnsavedChanges(false);
      toast.success("Website plan saved successfully!");
      trackEvent("site_planner_saved", {
        plan_id: planId,
        page_count: selectedPages.length
      });
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error("Failed to save plan");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Website Planner | Avorria</title>
        <meta name="description" content="Plan your perfect website with our visual site builder" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Website Planner</h1>
                <p className="text-muted-foreground">
                  Design your perfect website structure. Select pages, customize sections, and build your roadmap.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !hasUnsavedChanges}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Plan"}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </div>
            </div>

            {/* Plan Details */}
            <Card className="p-6 mb-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Plan Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="e.g., New Corporate Website"
                    value={plan.name}
                    onChange={(e) => setPlan({ ...plan, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={plan.status}
                    onChange={(e) => setPlan({ ...plan, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="review">In Review</option>
                    <option value="approved">Approved</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe your website goals, target audience, and key requirements..."
                  value={plan.description}
                  onChange={(e) => setPlan({ ...plan, description: e.target.value })}
                  rows={3}
                />
              </div>
            </Card>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Template Library */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LayoutDashboard className="h-5 w-5" />
                <h2 className="text-2xl font-bold">Page Templates</h2>
              </div>
              <PageTemplateLibrary onAddPage={handleAddPage} selectedPages={selectedPages} />
            </div>

            {/* Right: Site Structure */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plus className="h-5 w-5" />
                <h2 className="text-2xl font-bold">
                  Your Site Structure ({selectedPages.length} pages)
                </h2>
              </div>
              <SiteStructureBuilder
                pages={selectedPages}
                onUpdatePage={handleUpdatePage}
                onRemovePage={handleRemovePage}
                onReorder={handleReorderPages}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
