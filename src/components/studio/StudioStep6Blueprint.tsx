import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { trackEvent } from "@/lib/tracking";
import type { StudioConfig } from "@/pages/WebDesignStudio";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

interface StudioStep6BlueprintProps {
  config: StudioConfig;
  onBack: () => void;
}

const budgetBands = [
  "Under £10k",
  "£10k–£25k",
  "£25k–£50k",
  "£50k+",
  "Not sure yet"
];

const timelines = [
  "ASAP",
  "0–3 months",
  "3–6 months",
  "6+ months"
];

export const StudioStep6Blueprint = ({ config, onBack }: StudioStep6BlueprintProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    budget: "",
    timeline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.budget || !formData.timeline) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Track submission
    trackEvent("studio_blueprint_submitted", {
      purpose: config.purpose,
      site_size: config.site_size,
      modules_count: config.modules_selected.length,
      features_count: config.features_selected.length,
      budget_band: formData.budget,
      timeline: formData.timeline,
    });

    // Here you would send the blueprint to your backend
    console.log("Blueprint submission:", { config, formData });

    toast.success("Blueprint sent successfully!");
    setSubmitted(true);
  };

  const getPurposeLabel = (purpose: string) => {
    const labels: Record<string, string> = {
      lead_generation: "Lead generation & enquiries",
      authority_hub: "Authority / content hub",
      product_saas: "Product / SaaS marketing",
      service_platform: "Service platform / portal",
      ecommerce: "E-commerce / booking",
    };
    return labels[purpose] || purpose;
  };

  const getPersonalitySummary = () => {
    const formality = config.brand_formality > 60 ? "Polished" : config.brand_formality < 40 ? "Straight-talking" : "Balanced";
    const voice = config.brand_voice > 60 ? "Story-driven" : config.brand_voice < 40 ? "Analytical" : "Mixed";
    const feel = config.brand_feel > 60 ? "Showpiece" : config.brand_feel < 40 ? "Understated" : "Refined";
    return `${formality}, ${voice}, ${feel}`;
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="space-y-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[hsl(320,85%,55%)]/20 mb-6">
          <CheckCircle2 className="w-10 h-10 text-[hsl(320,85%,55%)]" />
        </div>
        <div>
          <h1 className="text-5xl font-extralight text-white mb-4 leading-tight">
            Blueprint sent.
          </h1>
          <p className="text-white/60 text-lg font-light max-w-2xl">
            We'll review this and get back to you with a serious plan — no cookie-cutter templates, no generic quotes.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(260,75%,60%)] text-white font-light hover:shadow-[0_0_30px_-5px_hsla(320,85%,55%,0.5)]"
          >
            <Link to="/contact">Book a strategy call</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-white/60 hover:text-white hover:bg-white/10 font-light"
          >
            <Link to="/services/web-design">Back to Web Design Services</Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-5xl font-extralight text-white mb-4 leading-tight">
          Your Website Blueprint
        </h1>
        <p className="text-white/60 text-lg font-light">
          This isn't a template; it's a starting blueprint. We'll review this and come back with a realistic structure, visual direction and investment range.
        </p>
      </div>

      {/* Blueprint summary */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <div>
          <div className="text-white/40 text-xs font-light uppercase tracking-wider mb-1">Purpose</div>
          <div className="text-white font-light">{getPurposeLabel(config.purpose)}</div>
        </div>
        <div>
          <div className="text-white/40 text-xs font-light uppercase tracking-wider mb-1">Visual Feel</div>
          <div className="text-white font-light">
            {config.palette} · Density {config.visual_layout_density}/100 · Energy {config.visual_energy}/100
          </div>
        </div>
        <div>
          <div className="text-white/40 text-xs font-light uppercase tracking-wider mb-1">Structure</div>
          <div className="text-white font-light">{config.site_size} · {config.modules_selected.length} modules</div>
        </div>
        <div>
          <div className="text-white/40 text-xs font-light uppercase tracking-wider mb-1">Features</div>
          <div className="text-white font-light">{config.features_selected.length} selected</div>
        </div>
        <div>
          <div className="text-white/40 text-xs font-light uppercase tracking-wider mb-1">Brand Personality</div>
          <div className="text-white font-light">{getPersonalitySummary()}</div>
        </div>
      </div>

      {/* Contact form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white text-sm font-light">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 font-light focus:border-[hsl(320,85%,55%)] focus:ring-[hsl(320,85%,55%)]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-white text-sm font-light">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 font-light focus:border-[hsl(320,85%,55%)] focus:ring-[hsl(320,85%,55%)]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm font-light">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 font-light focus:border-[hsl(320,85%,55%)] focus:ring-[hsl(320,85%,55%)]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white text-sm font-light">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 font-light focus:border-[hsl(320,85%,55%)] focus:ring-[hsl(320,85%,55%)]"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-white text-sm font-light">Budget band *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {budgetBands.map((band) => (
              <button
                key={band}
                type="button"
                onClick={() => setFormData({ ...formData, budget: band })}
                className={`p-3 rounded-lg border text-sm font-light transition-all ${
                  formData.budget === band
                    ? "bg-white/10 border-[hsl(320,85%,55%)] text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/8"
                }`}
              >
                {band}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-white text-sm font-light">Timeline *</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {timelines.map((timeline) => (
              <button
                key={timeline}
                type="button"
                onClick={() => setFormData({ ...formData, timeline })}
                className={`p-3 rounded-lg border text-sm font-light transition-all ${
                  formData.timeline === timeline
                    ? "bg-white/10 border-[hsl(320,85%,55%)] text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/8"
                }`}
              >
                {timeline}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            onClick={onBack}
            variant="ghost"
            size="lg"
            className="text-white/60 hover:text-white hover:bg-white/10 font-light"
          >
            Back
          </Button>
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(260,75%,60%)] text-white font-light hover:shadow-[0_0_30px_-5px_hsla(320,85%,55%,0.5)]"
          >
            Send my blueprint to Avorria
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
