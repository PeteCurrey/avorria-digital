'use client';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Volume2, VolumeX, Sparkles, MessageSquare, Loader2 } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import StudioNav from "@/components/studio/StudioNav";
import PurposeStep from "@/components/studio/steps/PurposeStep";
import AestheticStep from "@/components/studio/steps/AestheticStep";
import StructureStep from "@/components/studio/steps/StructureStep";
import FeaturesStep from "@/components/studio/steps/FeaturesStep";
import PersonalityStep from "@/components/studio/steps/PersonalityStep";
import SummaryStep from "@/components/studio/steps/SummaryStep";
import { useClickSound } from "@/hooks/useClickSound";
import { DeviceMockup } from "@/components/studio/DeviceMockup";
import { DesignBriefChat } from "@/components/studio/DesignBriefChat";
import { useStepBasedAudio } from "@/hooks/useStepBasedAudio";

// Lead Generation previews by palette and size
import leadGenDark from "@/assets/studio-previews/lead-gen-dark.jpg";
import leadGenLight from "@/assets/studio-previews/lead-gen-light.jpg";
import leadGenMono from "@/assets/studio-previews/lead-gen-mono.jpg";
import leadGenGradient from "@/assets/studio-previews/lead-gen-gradient.jpg";
import leadGenDarkCompact from "@/assets/studio-previews/lead-gen-dark-compact.jpg";
import leadGenDarkExpansive from "@/assets/studio-previews/lead-gen-dark-expansive.jpg";
import leadGenLightCompact from "@/assets/studio-previews/lead-gen-light-compact.jpg";
import leadGenLightExpansive from "@/assets/studio-previews/lead-gen-light-expansive.jpg";
import leadGenMonoCompact from "@/assets/studio-previews/lead-gen-mono-compact.jpg";
import leadGenMonoExpansive from "@/assets/studio-previews/lead-gen-mono-expansive.jpg";
import leadGenGradientCompact from "@/assets/studio-previews/lead-gen-gradient-compact.jpg";
import leadGenGradientExpansive from "@/assets/studio-previews/lead-gen-gradient-expansive.jpg";

// Content Hub previews by palette and size
import contentHubDark from "@/assets/studio-previews/content-hub-dark.jpg";
import contentHubLight from "@/assets/studio-previews/content-hub-light.jpg";
import contentHubMono from "@/assets/studio-previews/content-hub-mono.jpg";
import contentHubGradient from "@/assets/studio-previews/content-hub-gradient.jpg";
import contentHubDarkCompact from "@/assets/studio-previews/content-hub-dark-compact.jpg";
import contentHubDarkExpansive from "@/assets/studio-previews/content-hub-dark-expansive.jpg";
import contentHubLightCompact from "@/assets/studio-previews/content-hub-light-compact.jpg";
import contentHubLightExpansive from "@/assets/studio-previews/content-hub-light-expansive.jpg";
import contentHubMonoCompact from "@/assets/studio-previews/content-hub-mono-compact.jpg";
import contentHubMonoExpansive from "@/assets/studio-previews/content-hub-mono-expansive.jpg";
import contentHubGradientCompact from "@/assets/studio-previews/content-hub-gradient-compact.jpg";
import contentHubGradientExpansive from "@/assets/studio-previews/content-hub-gradient-expansive.jpg";

// SaaS previews by palette and size
import saasDark from "@/assets/studio-previews/saas-dark.jpg";
import saasLight from "@/assets/studio-previews/saas-light.jpg";
import saasMono from "@/assets/studio-previews/saas-mono.jpg";
import saasGradient from "@/assets/studio-previews/saas-gradient.jpg";
import saasDarkCompact from "@/assets/studio-previews/saas-dark-compact.jpg";
import saasDarkExpansive from "@/assets/studio-previews/saas-dark-expansive.jpg";
import saasLightCompact from "@/assets/studio-previews/saas-light-compact.jpg";
import saasLightExpansive from "@/assets/studio-previews/saas-light-expansive.jpg";
import saasMonoCompact from "@/assets/studio-previews/saas-mono-compact.jpg";
import saasMonoExpansive from "@/assets/studio-previews/saas-mono-expansive.jpg";
import saasGradientCompact from "@/assets/studio-previews/saas-gradient-compact.jpg";
import saasGradientExpansive from "@/assets/studio-previews/saas-gradient-expansive.jpg";

// Service Portal previews by palette and size
import serviceDark from "@/assets/studio-previews/service-dark.jpg";
import serviceLight from "@/assets/studio-previews/service-light.jpg";
import serviceMono from "@/assets/studio-previews/service-mono.jpg";
import serviceGradient from "@/assets/studio-previews/service-gradient.jpg";
import serviceDarkCompact from "@/assets/studio-previews/service-dark-compact.jpg";
import serviceDarkExpansive from "@/assets/studio-previews/service-dark-expansive.jpg";
import serviceLightCompact from "@/assets/studio-previews/service-light-compact.jpg";
import serviceLightExpansive from "@/assets/studio-previews/service-light-expansive.jpg";
import serviceMonoCompact from "@/assets/studio-previews/service-mono-compact.jpg";
import serviceMonoExpansive from "@/assets/studio-previews/service-mono-expansive.jpg";
import serviceGradientCompact from "@/assets/studio-previews/service-gradient-compact.jpg";
import serviceGradientExpansive from "@/assets/studio-previews/service-gradient-expansive.jpg";

import studioBackground from "@/assets/studio-mockup-dark.jpg";
import type { StudioConfig } from "@/types/studio";

// 3D Preview matrix: purpose -> palette -> size -> image
// Size keys match StudioConfig: lean, standard, expanded
const previewMatrix: Record<string, Record<string, Record<string, string>>> = {
  "lead-generation": {
    dark: { lean: leadGenDarkCompact, standard: leadGenDark, expanded: leadGenDarkExpansive },
    light: { lean: leadGenLightCompact, standard: leadGenLight, expanded: leadGenLightExpansive },
    monochrome: { lean: leadGenMonoCompact, standard: leadGenMono, expanded: leadGenMonoExpansive },
    gradient: { lean: leadGenGradientCompact, standard: leadGenGradient, expanded: leadGenGradientExpansive },
  },
  "content-hub": {
    dark: { lean: contentHubDarkCompact, standard: contentHubDark, expanded: contentHubDarkExpansive },
    light: { lean: contentHubLightCompact, standard: contentHubLight, expanded: contentHubLightExpansive },
    monochrome: { lean: contentHubMonoCompact, standard: contentHubMono, expanded: contentHubMonoExpansive },
    gradient: { lean: contentHubGradientCompact, standard: contentHubGradient, expanded: contentHubGradientExpansive },
  },
  "product-saas": {
    dark: { lean: saasDarkCompact, standard: saasDark, expanded: saasDarkExpansive },
    light: { lean: saasLightCompact, standard: saasLight, expanded: saasLightExpansive },
    monochrome: { lean: saasMonoCompact, standard: saasMono, expanded: saasMonoExpansive },
    gradient: { lean: saasGradientCompact, standard: saasGradient, expanded: saasGradientExpansive },
  },
  "service-portal": {
    dark: { lean: serviceDarkCompact, standard: serviceDark, expanded: serviceDarkExpansive },
    light: { lean: serviceLightCompact, standard: serviceLight, expanded: serviceLightExpansive },
    monochrome: { lean: serviceMonoCompact, standard: serviceMono, expanded: serviceMonoExpansive },
    gradient: { lean: serviceGradientCompact, standard: serviceGradient, expanded: serviceGradientExpansive },
  },
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
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { playClick } = useClickSound();
  const mockupRef = useRef<HTMLDivElement>(null);
  
  // Step-based ambient audio that changes with each wizard step
  const { 
    isPlaying: musicPlaying, 
    isLoading: musicLoading, 
    toggle: toggleMusic,
    currentMood 
  } = useStepBasedAudio(currentStep, { volume: 0.3 });
  
  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for natural movement
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
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

  // Handle mouse move for parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize to -0.5 to 0.5
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const goToStep = (step: number) => {
    if (step < 0 || step >= steps.length) return;
    if (soundEnabled) {
      playClick("whoosh");
    }
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
  }, [currentStep, soundEnabled]);

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

  // Wrap setConfig to play sound on changes - use chime for selections
  const handleConfigChange = (newConfig: StudioConfig) => {
    if (soundEnabled) {
      playClick("chime");
    }
    setConfig(newConfig);
  };

  // Handler for slider tick sounds
  const handleSliderTick = useCallback(() => {
    if (soundEnabled) {
      playClick("tick", 0.6);
    }
  }, [soundEnabled, playClick]);

  // Handler for celebration sound on submit
  const handleCelebration = useCallback(() => {
    if (soundEnabled) {
      playClick("celebration");
    }
  }, [soundEnabled, playClick]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PurposeStep config={config} setConfig={handleConfigChange} />;
      case 1:
        return <AestheticStep config={config} setConfig={handleConfigChange} onSliderCommit={handleSliderTick} />;
      case 2:
        return <StructureStep config={config} setConfig={handleConfigChange} />;
      case 3:
        return <FeaturesStep config={config} setConfig={handleConfigChange} />;
      case 4:
        return <PersonalityStep config={config} setConfig={handleConfigChange} onSliderCommit={handleSliderTick} />;
      case 5:
        return <SummaryStep config={config} onSuccess={handleCelebration} />;
      default:
        return null;
    }
  };

  // Get preview based on purpose, palette AND site size combination
  const currentPreview = previewMatrix[config.purpose]?.[config.palette]?.[config.siteSize] || leadGenDark;

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

        {/* Sound Toggle - now controls both click sounds and ambient music */}
        <div className="fixed right-6 top-20 z-50 flex flex-col gap-2">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playClick("select");
            }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-sm transition-all hover:border-white/20"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-accent" />
            ) : (
              <VolumeX className="h-4 w-4 text-white/40" />
            )}
            <span className="text-xs text-white/60">
              {soundEnabled ? "Effects On" : "Effects Off"}
            </span>
          </motion.button>
          
          {/* Music Toggle with Mood Display */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={toggleMusic}
            disabled={musicLoading}
            className="flex flex-col items-start gap-1 rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 backdrop-blur-sm transition-all hover:border-white/20 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              {musicLoading ? (
                <Loader2 className="h-4 w-4 text-accent animate-spin" />
              ) : musicPlaying ? (
                <Volume2 className="h-4 w-4 text-accent" />
              ) : (
                <VolumeX className="h-4 w-4 text-white/40" />
              )}
              <span className="text-xs text-white/60">
                {musicLoading ? "Loading..." : musicPlaying ? "Music On" : "Music Off"}
              </span>
            </div>
            {(musicPlaying || musicLoading) && (
              <span className="text-[10px] text-accent/70 font-light">
                {musicLoading ? "Generating soundscape..." : `${steps[currentStep]?.label} — ${currentMood}`}
              </span>
            )}
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="flex min-h-screen pt-28 pb-24">
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
                className="mx-auto max-w-4xl py-8 px-6 lg:px-8 bg-white/[0.02] border border-white/5 rounded-lg backdrop-blur-sm"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Enhanced Visual Preview Panel with Dark Office Theme */}
          <div 
            className="hidden lg:flex lg:w-[550px] lg:flex-col lg:border-l lg:border-white/5 relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Dark office background image */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${studioBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            {/* Subtle dark overlay for depth */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Ambient glow effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            </div>

            {/* Main mockup container with 3D perspective */}
            <div 
              ref={mockupRef}
              className="relative z-10 flex flex-1 flex-col items-center justify-center px-8"
              style={{ perspective: "1000px" }}
            >
              {/* iMac mockup using DeviceMockup component */}
              <DeviceMockup className="w-full max-w-lg">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${config.purpose}-${config.palette}-${config.siteSize}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={currentPreview}
                      alt="Website preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </DeviceMockup>

              {/* Configuration summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center space-y-4"
              >
                {/* Live config badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 backdrop-blur-sm">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <span className="text-xs font-light tracking-widest text-accent uppercase">
                    Live Preview
                  </span>
                </div>

                {/* Config stats */}
                <motion.div
                  key={`${config.palette}-${config.siteSize}-${config.features.length}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-sm text-white/60">
                    <span className="capitalize font-medium text-white/80">{config.palette}</span>
                    {" "}theme • {" "}
                    <span className="capitalize font-medium text-white/80">{config.siteSize}</span>
                    {" "}site
                  </p>
                  {config.features.length > 0 && (
                    <p className="text-xs text-white/40">
                      {config.features.length} feature{config.features.length !== 1 ? 's' : ''} selected
                    </p>
                  )}
                </motion.div>

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-2 pt-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? "w-8 bg-accent"
                          : index < currentStep
                          ? "w-2 bg-accent/50"
                          : "w-2 bg-white/10"
                      }`}
                      animate={{
                        scale: index === currentStep ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 1,
                        repeat: index === currentStep ? Infinity : 0,
                        repeatDelay: 1,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
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
        
        {/* AI Design Brief Floating Trigger */}
        {!isChatOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:shadow-accent/50"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="font-medium">AI Design Brief</span>
          </motion.button>
        )}

        {/* AI Design Brief Chat Panel */}
        <DesignBriefChat
          config={config}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </div>
    </>
  );
};

export default WebDesignStudioBuild;

