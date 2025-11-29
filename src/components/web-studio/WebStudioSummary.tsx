import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BlueprintData } from "@/pages/WebStudio";
import { WebStudioPreview } from "./WebStudioPreview";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/tracking";

interface WebStudioSummaryProps {
  blueprint: BlueprintData;
  onBack: () => void;
}

export function WebStudioSummary({ blueprint, onBack }: WebStudioSummaryProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    budget: "",
    timeline: ""
  });

  const budgetOptions = [
    "Under £10k",
    "£10k - £25k",
    "£25k - £50k",
    "£50k - £100k",
    "£100k+"
  ];

  const timelineOptions = [
    "ASAP",
    "0-3 months",
    "3-6 months",
    "6+ months"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.budget || !formData.timeline) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    trackEvent("web_studio_blueprint_submitted", {
      site_role: blueprint.siteRole,
      page_count: blueprint.structure.pages.length,
      feature_count: blueprint.features.length,
      budget: formData.budget,
      timeline: formData.timeline
    });

    setIsSubmitting(false);
    
    // Show success state
    toast.success("Blueprint sent successfully!", {
      description: "We'll review this and come back with a serious plan.",
      duration: 5000
    });

    // Navigate after short delay
    setTimeout(() => {
      navigate("/services/web-design");
    }, 2000);
  };

  const getSummaryText = (key: string, value: any): string => {
    if (typeof value === "object") {
      return Object.values(value).filter(Boolean).join(", ");
    }
    if (Array.isArray(value)) {
      return value.map(v => v.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")).join(", ");
    }
    return String(value).split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/50 to-background py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to configuration
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-light mb-4 text-foreground">
            Your Blueprint
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'll take this blueprint, sanity-check it against your goals, and come back with a realistic structure, visual direction and investment range.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Blueprint Summary */}
          <div className="space-y-6">
            <Card className="border-border bg-card shadow-card">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Site Role</h3>
                  <p className="text-lg text-foreground">{getSummaryText("siteRole", blueprint.siteRole)}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Visual Feel</h3>
                  <p className="text-lg text-foreground">
                    {blueprint.visualFeel.density} density, {blueprint.visualFeel.energy} energy
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getSummaryText("palette", blueprint.visualFeel.palette)}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Structure</h3>
                  <p className="text-lg text-foreground capitalize">{blueprint.structure.size} site</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {blueprint.structure.pages.length} pages: {getSummaryText("pages", blueprint.structure.pages)}
                  </p>
                </div>

                {blueprint.features.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Features</h3>
                    <p className="text-sm text-foreground">{getSummaryText("features", blueprint.features)}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Brand Personality</h3>
                  <p className="text-lg text-foreground capitalize">
                    {blueprint.personality.tone}, {blueprint.personality.approach}, {blueprint.personality.style}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="border-border bg-card shadow-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-light mb-6 text-foreground">Send Your Blueprint</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget Band *</Label>
                    <select
                      id="budget"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      required
                    >
                      <option value="">Select budget range</option>
                      {budgetOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="timeline">Timeline *</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {timelineOptions.map(option => (
                        <button
                          key={option}
                          type="button"
                          className={`px-4 py-2 rounded-md border transition-all ${
                            formData.timeline === option
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border hover:border-accent/50"
                          }`}
                          onClick={() => setFormData({ ...formData, timeline: option })}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-6"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send my blueprint to Avorria
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right: Final Preview */}
          <div className="lg:sticky lg:top-24">
            <WebStudioPreview blueprint={blueprint} />
            
            <Card className="border-border bg-card/80 backdrop-blur-sm mt-6 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">No cookie-cutter templates, no generic quotes.</strong> We'll review this blueprint and come back with a serious plan that fits your business.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
