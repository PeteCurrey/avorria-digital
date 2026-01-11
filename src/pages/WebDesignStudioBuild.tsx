import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import StudioNav from "@/components/studio/StudioNav";
import DeviceMockup from "@/components/studio/DeviceMockup";
import PurposeStep from "@/components/studio/steps/PurposeStep";
import AestheticStep from "@/components/studio/steps/AestheticStep";
import StructureStep from "@/components/studio/steps/StructureStep";
import FeaturesStep from "@/components/studio/steps/FeaturesStep";
import PersonalityStep from "@/components/studio/steps/PersonalityStep";
import SummaryStep from "@/components/studio/steps/SummaryStep";
import type { StudioConfig } from "@/types/studio";

// Import fallback images
import leadGenPreview from "@/assets/studio-previews/lead-gen.jpg";
import authorityPreview from "@/assets/studio-previews/authority.jpg";
import saasPreview from "@/assets/studio-previews/saas.jpg";
import platformPreview from "@/assets/studio-previews/platform.jpg";

const previewImages: Record<string, string> = {
  "lead-generation": leadGenPreview,
  "content-hub": authorityPreview,
  "product-saas": saasPreview,
  "service-portal": platformPreview,
};

const steps = [
  { id: "purpose", label: "Purpose" },
  { id: "aesthetic", label: "Aesthetic" },
  { id: "structure", label: "Structure" },
  { id: "features", label: "Features" },
  { id: "personality", label: "Personality" },
  { id: "summary", label: "Summary" },
];

const WebDesignStudioBuild = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [config, setConfig] = useState<StudioConfig>({
    purpose: "lead-generation",
    minimal: 50,
    bold: 50,
    palette: "dark",
    siteSize: "standard",
    modules: [],
    features: [],
    straightTalking: 50,
    analytical: 50,
    understated: 50,
    notes: "",
  });

  const goToStep = (step: number) => {
    if (step < 0 || step >= steps.length) return;
    setDirection(step > currentStep ? "forward" : "backward");
    setCurrentStep(step);
  };

  const nextStep = () => goToStep(currentStep + 1);
  const prevStep = () => goToStep(currentStep - 1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentStep < steps.length - 1) nextStep();
      if (e.key === "ArrowLeft" && currentStep > 0) prevStep();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  const slideVariants = {
    enter: (dir: "forward" | "backward") => ({
      x: dir === "forward" ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "forward" | "backward") => ({
      x: dir === "forward" ? -100 : 100,
      opacity: 0,
    }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PurposeStep config={config} setConfig={setConfig} />;
      case 1:
        return <AestheticStep config={config} setConfig={setConfig} />;
      case 2:
        return <StructureStep config={config} setConfig={setConfig} />;
      case 3:
        return <FeaturesStep config={config} setConfig={setConfig} />;
      case 4:
        return <PersonalityStep config={config} setConfig={setConfig} />;
      case 5:
        return <SummaryStep config={config} />;
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead
        title="Build Your Website | Web Design Studio | Avorria"
        description="Configure your perfect website with our AI-powered studio."
        canonical="/web-design/studio/build"
      />

      <div className="min-h-screen bg-black">
        {/* Navigation */}
        <StudioNav currentStep={currentStep} totalSteps={steps.length} />

        {/* Main Content */}
        <div className="flex min-h-screen pt-24 pb-24">
          {/* Left: Configuration Panel */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mx-auto max-w-4xl py-8"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Preview Canvas (hidden on mobile, visible on lg+) */}
          <div className="hidden lg:flex lg:w-[500px] lg:flex-col lg:items-center lg:justify-center lg:border-l lg:border-white/5 lg:bg-zinc-950/50 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="sticky top-32"
            >
              <DeviceMockup>
                <motion.img
                  key={config.purpose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={previewImages[config.purpose]}
                  alt="Website Preview"
                  className="h-full w-full object-cover"
                />
              </DeviceMockup>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-white/40">
                  {config.palette} • {config.siteSize} • {config.features.length} features
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Navigation */}
        {currentStep < steps.length - 1 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/5 bg-black/80 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-all ${
                  currentStep === 0
                    ? "cursor-not-allowed text-white/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                {currentStep > 0 && steps[currentStep - 1].label}
              </button>

              <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentStep
                        ? "w-6 bg-accent"
                        : index < currentStep
                        ? "bg-accent/50"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextStep}
                className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90"
              >
                {steps[currentStep + 1]?.label || "Next"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default WebDesignStudioBuild;
