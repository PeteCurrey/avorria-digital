import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/tracking";
import type { StudioConfig } from "@/types/studio";
import { toast } from "sonner";

interface StudioSummaryProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
}

export const StudioSummary = ({ config }: StudioSummaryProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    budget: "",
    timeline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    trackEvent("studio_blueprint_submitted", {
      purpose: config.purpose,
      palette: config.palette,
      site_size: config.siteSize,
      module_count: config.modules.length,
      feature_count: config.features.length,
      budget_band: formData.budget,
      timeline_band: formData.timeline,
    });

    console.log("Studio Blueprint Submitted:", { config, formData });
    toast.success("Blueprint sent! We'll be in touch soon.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[500px] flex-col items-center justify-center text-center"
      >
        <h2 className="mb-4 text-4xl font-extralight tracking-tight text-foreground">
          Blueprint sent.
        </h2>
        <p className="mb-12 max-w-xl text-lg font-extralight text-muted-foreground">
          We'll review this and come back with a realistic structure, visual direction, and
          investment range.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link to="/contact">
            <Button size="lg" className="font-extralight">
              Book a strategy call
            </Button>
          </Link>
          <Link to="/services/web-design">
            <Button variant="outline" size="lg" className="font-extralight">
              Back to Web Design Services
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 text-3xl font-extralight tracking-tight text-foreground">
        Your Website Blueprint
      </h2>
      <p className="mb-10 text-lg font-extralight text-muted-foreground">
        Not a template, but the outline of the site we'll design for you.
      </p>

      {/* Summary */}
      <div className="mb-10 space-y-4 rounded-lg border bg-secondary/30 p-6">
        <div>
          <span className="text-sm font-extralight text-muted-foreground">Purpose:</span>
          <p className="font-extralight text-foreground">
            {config.purpose.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </p>
        </div>
        <div>
          <span className="text-sm font-extralight text-muted-foreground">Look & Mood:</span>
          <p className="font-extralight text-foreground">
            {config.minimal < 33 ? "Minimal" : config.minimal > 66 ? "Content-rich" : "Balanced"} ·{" "}
            {config.bold < 33 ? "Calm" : config.bold > 66 ? "Bold" : "Balanced"} ·{" "}
            {config.palette.charAt(0).toUpperCase() + config.palette.slice(1)} palette
          </p>
        </div>
        <div>
          <span className="text-sm font-extralight text-muted-foreground">Structure:</span>
          <p className="font-extralight text-foreground">
            {config.siteSize.charAt(0).toUpperCase() + config.siteSize.slice(1)} site
            {config.modules.length > 0 && ` with ${config.modules.length} additional modules`}
          </p>
        </div>
        {config.features.length > 0 && (
          <div>
            <span className="text-sm font-extralight text-muted-foreground">Features:</span>
            <p className="font-extralight text-foreground">{config.features.join(", ")}</p>
          </div>
        )}
        <div>
          <span className="text-sm font-extralight text-muted-foreground">Personality:</span>
          <p className="font-extralight text-foreground">
            {config.straightTalking > 50 ? "Straight-talking" : "Polished"} ·{" "}
            {config.analytical > 50 ? "Analytical" : "Story-led"} ·{" "}
            {config.understated > 50 ? "Understated" : "Showpiece"}
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" className="font-extralight">
              Name *
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="font-extralight"
            />
          </div>
          <div>
            <Label htmlFor="company" className="font-extralight">
              Company *
            </Label>
            <Input
              id="company"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="font-extralight"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="email" className="font-extralight">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="font-extralight"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="font-extralight">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="font-extralight"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="budget" className="font-extralight">
              Budget band *
            </Label>
            <Select
              required
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
            >
              <SelectTrigger className="font-extralight">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<10k">Under £10k</SelectItem>
                <SelectItem value="10k-25k">£10k - £25k</SelectItem>
                <SelectItem value="25k-50k">£25k - £50k</SelectItem>
                <SelectItem value="50k+">£50k+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="timeline" className="font-extralight">
              Timeline *
            </Label>
            <Select
              required
              value={formData.timeline}
              onValueChange={(value) => setFormData({ ...formData, timeline: value })}
            >
              <SelectTrigger className="font-extralight">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">ASAP</SelectItem>
                <SelectItem value="0-3">0-3 months</SelectItem>
                <SelectItem value="3-6">3-6 months</SelectItem>
                <SelectItem value="6+">6+ months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full font-extralight">
          Send my blueprint to Avorria
        </Button>
      </form>
    </div>
  );
};
