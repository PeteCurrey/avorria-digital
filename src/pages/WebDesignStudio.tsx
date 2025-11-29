import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { StudioProgress } from "@/components/studio/StudioProgress";
import { StudioCanvas } from "@/components/studio/StudioCanvas";
import { StudioStep1Purpose } from "@/components/studio/StudioStep1Purpose";
import { StudioStep2LookFeel } from "@/components/studio/StudioStep2LookFeel";
import { StudioStep3Structure } from "@/components/studio/StudioStep3Structure";
import { StudioStep4Features } from "@/components/studio/StudioStep4Features";
import { StudioStep5Personality } from "@/components/studio/StudioStep5Personality";
import { StudioStep6Blueprint } from "@/components/studio/StudioStep6Blueprint";
import { trackEvent } from "@/lib/tracking";

export interface StudioConfig {
  purpose: string;
  visual_layout_density: number;
  visual_energy: number;
  palette: string;
  site_size: string;
  modules_selected: string[];
  features_selected: string[];
  brand_formality: number;
  brand_voice: number;
  brand_feel: number;
  brand_notes: string;
}

const WebDesignStudio = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<StudioConfig>({
    purpose: "",
    visual_layout_density: 50,
    visual_energy: 50,
    palette: "light",
    site_size: "",
    modules_selected: [],
    features_selected: [],
    brand_formality: 50,
    brand_voice: 50,
    brand_feel: 50,
    brand_notes: "",
  });

  const totalSteps = 6;

  useEffect(() => {
    trackEvent("studio_started", {
      entry_source: window.location.search.includes("from=") 
        ? new URLSearchParams(window.location.search).get("from") || "direct"
        : "direct"
    });
  }, []);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      trackEvent("studio_step_completed", {
        step_number: currentStep,
        step_key: getStepKey(currentStep),
      });
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateConfig = (updates: Partial<StudioConfig>) => {
    setConfig({ ...config, ...updates });
  };

  const getStepKey = (step: number): string => {
    const keys = ["purpose", "look_feel", "structure", "features", "personality", "blueprint"];
    return keys[step - 1] || "unknown";
  };

  return (
    <>
      <Helmet>
        <title>Web Design Studio | Avorria</title>
        <meta name="description" content="Create your website blueprint with Avorria's premium web design studio." />
        <link rel="canonical" href="https://avorria.com/web-design/studio" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[hsl(220,25%,8%)] via-[hsl(260,30%,12%)] to-[hsl(220,25%,8%)] relative overflow-hidden">
        {/* Ambient mesh gradient */}
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(at 27% 37%, hsla(250, 75%, 50%, 0.15) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(280, 70%, 50%, 0.15) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(320, 75%, 50%, 0.15) 0px, transparent 50%)" }} />

        {/* Progress indicator */}
        <StudioProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* Main content grid */}
        <div className="relative z-10 min-h-screen pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Step content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <StudioStep1Purpose
                      key="step1"
                      config={config}
                      updateConfig={updateConfig}
                      onNext={handleNext}
                    />
                  )}
                  {currentStep === 2 && (
                    <StudioStep2LookFeel
                      key="step2"
                      config={config}
                      updateConfig={updateConfig}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}
                  {currentStep === 3 && (
                    <StudioStep3Structure
                      key="step3"
                      config={config}
                      updateConfig={updateConfig}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}
                  {currentStep === 4 && (
                    <StudioStep4Features
                      key="step4"
                      config={config}
                      updateConfig={updateConfig}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}
                  {currentStep === 5 && (
                    <StudioStep5Personality
                      key="step5"
                      config={config}
                      updateConfig={updateConfig}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}
                  {currentStep === 6 && (
                    <StudioStep6Blueprint
                      key="step6"
                      config={config}
                      onBack={handleBack}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Right: Preview canvas */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="lg:sticky lg:top-32"
              >
                <StudioCanvas config={config} currentStep={currentStep} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebDesignStudio;
