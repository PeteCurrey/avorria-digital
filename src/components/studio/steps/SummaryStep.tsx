import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Target, 
  Palette, 
  Layout, 
  Zap, 
  MessageSquare, 
  Download, 
  Loader2,
  CheckCircle2,
  Send
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { StudioConfig } from "@/types/studio";

interface SummaryStepProps {
  config: StudioConfig;
}

const purposeLabels = {
  "lead-generation": "Lead Generation",
  "content-hub": "Authority Hub",
  "product-saas": "Product / SaaS",
  "service-portal": "Service Platform",
};

const paletteLabels = {
  light: "Light Theme",
  dark: "Dark Theme",
  monochrome: "Monochrome",
  gradient: "Gradient",
};

const sizeLabels = {
  lean: "Lean (5-7 pages)",
  standard: "Standard (10-15 pages)",
  expanded: "Expanded (20+ pages)",
};

export const SummaryStep = ({ config }: SummaryStepProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [projectCode, setProjectCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  const generateProjectCode = () => {
    const prefix = "AVR";
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${year}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please provide your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const code = generateProjectCode();
      
      const { error } = await supabase.from("website_blueprints").insert({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        phone: formData.phone || null,
        purpose: config.purpose,
        palette: config.palette,
        site_size: config.siteSize,
        minimal: config.minimal,
        bold: config.bold,
        straight_talking: config.straightTalking,
        analytical: config.analytical,
        understated: config.understated,
        modules: config.modules,
        features: config.features,
        notes: config.notes || null,
        project_code: code,
        status: "new",
      });

      if (error) throw error;

      setProjectCode(code);
      setIsSubmitted(true);
      
      toast({
        title: "Blueprint submitted!",
        description: `Your project code is ${code}`,
      });
    } catch (error) {
      console.error("Error submitting blueprint:", error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-blueprint-pdf", {
        body: {
          config,
          contact: formData,
          projectCode,
        },
      });

      if (error) throw error;

      if (data?.html) {
        const { generatePDFFromHTML } = await import("@/lib/pdf-generator");
        
        await generatePDFFromHTML(data.html, {
          filename: `Avorria-Blueprint-${projectCode}.pdf`,
          imageQuality: 0.98,
          scale: 2,
          format: "a4",
          orientation: "portrait",
        });
      }
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "PDF generation failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent/20">
            <CheckCircle2 className="h-12 w-12 text-accent" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-4xl font-extralight tracking-tight text-white"
        >
          Blueprint Complete
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 max-w-md text-lg text-white/60"
        >
          We'll review your specifications and reach out within 24 hours with a tailored proposal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 rounded-xl border border-accent/30 bg-accent/10 px-8 py-4"
        >
          <p className="text-sm text-white/60">Your Project Code</p>
          <p className="text-2xl font-light tracking-wider text-accent">{projectCode}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            {isGeneratingPDF ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Download Blueprint PDF
          </Button>
          <Button
            onClick={() => navigate("/web-design")}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Back to Web Design
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-4xl font-extralight tracking-tight text-white md:text-5xl">
          Your <span className="text-accent">Blueprint</span>
        </h2>
        <p className="mx-auto max-w-lg text-lg font-extralight text-white/60">
          Review your configuration and submit to receive a tailored proposal.
        </p>
      </motion.div>

      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-2">
        {/* Configuration Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Purpose */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/40">Purpose</p>
                <p className="text-sm font-light text-white">
                  {purposeLabels[config.purpose]}
                </p>
              </div>
            </div>
          </div>

          {/* Aesthetic */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/40">Aesthetic</p>
                <p className="text-sm font-light text-white">
                  {paletteLabels[config.palette]} • {config.minimal > 50 ? "Bold" : "Minimal"} • {config.bold > 50 ? "Energetic" : "Calm"}
                </p>
              </div>
            </div>
          </div>

          {/* Structure */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <Layout className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/40">Structure</p>
                <p className="text-sm font-light text-white">
                  {sizeLabels[config.siteSize]}
                  {config.modules.length > 0 && ` + ${config.modules.length} modules`}
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/40">Features</p>
                <p className="text-sm font-light text-white">
                  {config.features.length > 0 
                    ? `${config.features.length} features selected`
                    : "No additional features"}
                </p>
              </div>
            </div>
          </div>

          {/* Personality */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/40">Personality</p>
                <p className="text-sm font-light text-white">
                  {config.straightTalking > 50 ? "Direct" : "Polished"} • 
                  {config.analytical > 50 ? " Analytical" : " Story-led"} • 
                  {config.understated > 50 ? " Showpiece" : " Understated"}
                </p>
              </div>
            </div>
          </div>

          {config.notes && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/40 mb-2">Notes</p>
              <p className="text-sm font-light text-white/80 line-clamp-3">{config.notes}</p>
            </div>
          )}
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <div>
            <h3 className="mb-1 text-lg font-light text-white">Complete Your Blueprint</h3>
            <p className="text-sm text-white/60">Tell us how to reach you</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/60">Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                required
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">Company</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Your company name"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">Phone</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 7XXX XXXXXX"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            size="lg"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Submit Blueprint
          </Button>

          <p className="text-center text-xs text-white/40">
            By submitting, you agree to our privacy policy. We'll never share your data.
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default SummaryStep;
