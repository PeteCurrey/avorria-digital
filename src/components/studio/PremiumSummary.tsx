import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/tracking";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { CheckCircle, FileText, Sparkles, ArrowRight, Building2, Mail, Phone, User, Download, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  budget: z.string().min(1, "Budget is required"),
  timeline: z.string().min(1, "Timeline is required"),
});

interface StudioState {
  purpose: string | null;
  density: string;
  energy: string;
  palette: string;
  structureSize: string;
  features: string[];
  straightTalking: number;
  analytical: number;
  understated: number;
  notes: string;
}

interface PremiumSummaryProps {
  state: StudioState;
}

export const PremiumSummary = ({ state }: PremiumSummaryProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [projectCode, setProjectCode] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    budget: "",
    timeline: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const purposeLabels: Record<string, string> = {
    lead_gen: "Lead Generation",
    authority: "Authority Hub",
    saas: "Product Marketing",
    platform: "Service Platform",
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-blueprint-pdf", {
        body: {
          projectCode,
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          purpose: state.purpose,
          palette: state.palette,
          density: state.density,
          energy: state.energy,
          structureSize: state.structureSize,
          features: state.features,
          straightTalking: state.straightTalking,
          analytical: state.analytical,
          understated: state.understated,
          budget: formData.budget,
          timeline: formData.timeline,
          notes: state.notes,
        },
      });

      if (error) throw error;

      if (data?.html) {
        // Dynamic import for html2pdf
        const html2pdf = (await import("html2pdf.js")).default;
        
        // Create a temporary container
        const container = document.createElement("div");
        container.innerHTML = data.html;
        container.style.position = "absolute";
        container.style.left = "-9999px";
        document.body.appendChild(container);

        // Generate PDF
        await html2pdf()
          .set({
            margin: 0,
            filename: `${projectCode}-blueprint.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .from(container)
          .save();

        // Clean up
        document.body.removeChild(container);
        
        trackEvent("studio_blueprint_pdf_downloaded", { projectCode });
        toast.success("Blueprint PDF downloaded!");
      }
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase.from("website_blueprints").insert({
        user_id: user?.id || null,
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone || null,
        budget: formData.budget,
        timeline: formData.timeline,
        purpose: state.purpose || "lead-generation",
        minimal: state.density === "minimal" ? 20 : 80,
        bold: state.energy === "bold" ? 80 : 20,
        palette: state.palette === "mono" ? "monochrome" : state.palette,
        site_size: state.structureSize,
        modules: [],
        features: state.features,
        straight_talking: state.straightTalking,
        analytical: state.analytical,
        understated: state.understated,
        notes: state.notes || null,
        stage: "discovery",
        priority: "normal",
      }).select("project_code").single();

      if (error) throw error;

      setProjectCode(data?.project_code || "AVR-2026-XXXX");

      trackEvent("studio_blueprint_submitted", {
        purpose: state.purpose,
        palette: state.palette,
        site_size: state.structureSize,
        feature_count: state.features.length,
        budget_band: formData.budget,
        timeline_band: formData.timeline,
      });

      toast.success("Blueprint submitted successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to save blueprint:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden"
      >
        {/* Success state with project code */}
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20"
          >
            <CheckCircle className="h-10 w-10 text-emerald-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-3 text-3xl font-light tracking-tight text-white">
              Blueprint Submitted
            </h2>
            <p className="mb-8 text-slate-400 max-w-md mx-auto">
              Your project is now in our system. We'll review your specifications and be in touch shortly.
            </p>
          </motion.div>

          {/* Project code badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex flex-col items-center gap-2 rounded-2xl border border-sky-500/20 bg-sky-500/5 px-8 py-6 mb-10"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-sky-300/70">Project Reference</span>
            <span className="text-2xl font-mono font-medium text-sky-300 tracking-wider">{projectCode}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:from-sky-600 hover:to-indigo-600"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download Blueprint PDF
                </>
              )}
            </Button>
            <Link to="/contact">
              <Button size="lg" className="gap-2 bg-white text-slate-900 hover:bg-slate-100">
                <Sparkles className="h-4 w-4" />
                Book Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/services/web-design">
              <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                Back to Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Blueprint Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-500/20 px-4 py-2 mb-6"
        >
          <FileText className="h-4 w-4 text-sky-400" />
          <span className="text-xs text-sky-300 font-medium">Your Website Blueprint</span>
        </motion.div>
        <h2 className="text-2xl font-light tracking-tight text-white mb-2">
          Configuration Complete
        </h2>
        <p className="text-slate-400 text-sm">
          Review your specifications and submit to begin the project
        </p>
      </div>

      {/* Specification Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Purpose</span>
          <p className="mt-2 text-sm text-white font-medium">
            {purposeLabels[state.purpose || "lead_gen"]}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Aesthetic</span>
          <p className="mt-2 text-sm text-white font-medium capitalize">
            {state.energy} · {state.palette}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Structure</span>
          <p className="mt-2 text-sm text-white font-medium capitalize">
            {state.structureSize} ({state.structureSize === "lean" ? "3-5" : state.structureSize === "standard" ? "6-10" : "10+"} pages)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Features</span>
          <p className="mt-2 text-sm text-white font-medium">
            {state.features.length > 0 ? `${state.features.length} selected` : "None selected"}
          </p>
        </motion.div>
      </div>

      {/* Features list if any */}
      {state.features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {state.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 text-xs text-violet-300"
            >
              {feature}
            </span>
          ))}
        </motion.div>
      )}

      {/* Personality spectrum */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Brand Personality</span>
        <div className="grid grid-cols-3 gap-4 mt-3">
          <div className="text-center">
            <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-sky-400 transition-all"
                style={{ width: `${state.straightTalking}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block">
              {state.straightTalking > 50 ? "Direct" : "Polished"}
            </span>
          </div>
          <div className="text-center">
            <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all"
                style={{ width: `${state.analytical}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block">
              {state.analytical > 50 ? "Analytical" : "Story-led"}
            </span>
          </div>
          <div className="text-center">
            <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-violet-400 transition-all"
                style={{ width: `${state.understated}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block">
              {state.understated > 50 ? "Understated" : "Showpiece"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-6 pt-6 border-t border-white/[0.06]"
      >
        <div className="text-center mb-8">
          <h3 className="text-lg font-light text-white mb-2">Your Details</h3>
          <p className="text-xs text-slate-500">We'll use this to prepare your proposal</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs text-slate-400 flex items-center gap-2">
              <User className="h-3 w-3" />
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-600 ${errors.name ? "border-red-500/50" : ""}`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-[10px] text-red-400">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-xs text-slate-400 flex items-center gap-2">
              <Building2 className="h-3 w-3" />
              Company
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={`bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-600 ${errors.company ? "border-red-500/50" : ""}`}
              placeholder="Company name"
            />
            {errors.company && <p className="text-[10px] text-red-400">{errors.company}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs text-slate-400 flex items-center gap-2">
              <Mail className="h-3 w-3" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-600 ${errors.email ? "border-red-500/50" : ""}`}
              placeholder="you@company.com"
            />
            {errors.email && <p className="text-[10px] text-red-400">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs text-slate-400 flex items-center gap-2">
              <Phone className="h-3 w-3" />
              Phone (optional)
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-600"
              placeholder="+44 ..."
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-xs text-slate-400">Investment Range</Label>
            <Select
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
            >
              <SelectTrigger className={`bg-slate-900/50 border-slate-700/50 text-white ${errors.budget ? "border-red-500/50" : ""}`}>
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="<10k">Under £10k</SelectItem>
                <SelectItem value="10k-25k">£10k - £25k</SelectItem>
                <SelectItem value="25k-50k">£25k - £50k</SelectItem>
                <SelectItem value="50k+">£50k+</SelectItem>
              </SelectContent>
            </Select>
            {errors.budget && <p className="text-[10px] text-red-400">{errors.budget}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline" className="text-xs text-slate-400">Ideal Timeline</Label>
            <Select
              value={formData.timeline}
              onValueChange={(value) => setFormData({ ...formData, timeline: value })}
            >
              <SelectTrigger className={`bg-slate-900/50 border-slate-700/50 text-white ${errors.timeline ? "border-red-500/50" : ""}`}>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="asap">ASAP</SelectItem>
                <SelectItem value="0-3">0-3 months</SelectItem>
                <SelectItem value="3-6">3-6 months</SelectItem>
                <SelectItem value="6+">6+ months</SelectItem>
              </SelectContent>
            </Select>
            {errors.timeline && <p className="text-[10px] text-red-400">{errors.timeline}</p>}
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-white text-slate-900 hover:bg-slate-100 font-medium gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Submit Blueprint
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </motion.form>
    </div>
  );
};
