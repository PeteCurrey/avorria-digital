import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Volume2, VolumeX, Sparkles } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import StudioNav from "@/components/studio/StudioNav";
import PurposeStep from "@/components/studio/steps/PurposeStep";
import AestheticStep from "@/components/studio/steps/AestheticStep";
import StructureStep from "@/components/studio/steps/StructureStep";
import FeaturesStep from "@/components/studio/steps/FeaturesStep";
import PersonalityStep from "@/components/studio/steps/PersonalityStep";
import SummaryStep from "@/components/studio/steps/SummaryStep";
import { useClickSound } from "@/hooks/useClickSound";
import studioMockup from "@/assets/studio-mockup-dark.jpg";

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

import type { StudioConfig } from "@/types/studio";

// 3D Preview matrix: purpose -> palette -> size -> image
const previewMatrix: Record<string, Record<string, Record<string, string>>> = {
  "lead-generation": {
    dark: { compact: leadGenDarkCompact, standard: leadGenDark, expansive: leadGenDarkExpansive },
    light: { compact: leadGenLightCompact, standard: leadGenLight, expansive: leadGenLightExpansive },
    monochrome: { compact: leadGenMonoCompact, standard: leadGenMono, expansive: leadGenMonoExpansive },
    gradient: { compact: leadGenGradientCompact, standard: leadGenGradient, expansive: leadGenGradientExpansive },
  },
  "content-hub": {
    dark: { compact: contentHubDarkCompact, standard: contentHubDark, expansive: contentHubDarkExpansive },
    light: { compact: contentHubLightCompact, standard: contentHubLight, expansive: contentHubLightExpansive },
    monochrome: { compact: contentHubMonoCompact, standard: contentHubMono, expansive: contentHubMonoExpansive },
    gradient: { compact: contentHubGradientCompact, standard: contentHubGradient, expansive: contentHubGradientExpansive },
  },
  "product-saas": {
    dark: { compact: saasDarkCompact, standard: saasDark, expansive: saasDarkExpansive },
    light: { compact: saasLightCompact, standard: saasLight, expansive: saasLightExpansive },
    monochrome: { compact: saasMonoCompact, standard: saasMono, expansive: saasMonoExpansive },
    gradient: { compact: saasGradientCompact, standard: saasGradient, expansive: saasGradientExpansive },
  },
  "service-portal": {
    dark: { compact: serviceDarkCompact, standard: serviceDark, expansive: serviceDarkExpansive },
    light: { compact: serviceLightCompact, standard: serviceLight, expansive: serviceLightExpansive },
    monochrome: { compact: serviceMonoCompact, standard: serviceMono, expansive: serviceMonoExpansive },
    gradient: { compact: serviceGradientCompact, standard: serviceGradient, expansive: serviceGradientExpansive },
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
  const { playClick } = useClickSound();
  const mockupRef = useRef<HTMLDivElement>(null);
  
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
      playClick("navigate");
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

  // Wrap setConfig to play sound on changes
  const handleConfigChange = (newConfig: StudioConfig) => {
    if (soundEnabled) {
      playClick("select");
    }
    setConfig(newConfig);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PurposeStep config={config} setConfig={handleConfigChange} />;
      case 1:
        return <AestheticStep config={config} setConfig={handleConfigChange} />;
      case 2:
        return <StructureStep config={config} setConfig={handleConfigChange} />;
      case 3:
        return <FeaturesStep config={config} setConfig={handleConfigChange} />;
      case 4:
        return <PersonalityStep config={config} setConfig={handleConfigChange} />;
      case 5:
        return <SummaryStep config={config} />;
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

        {/* Sound Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (!soundEnabled) playClick("select");
          }}
          className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-sm transition-all hover:border-white/20"
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4 text-accent" />
          ) : (
            <VolumeX className="h-4 w-4 text-white/40" />
          )}
          <span className="text-xs text-white/60">
            {soundEnabled ? "Sound On" : "Sound Off"}
          </span>
        </motion.button>

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

          {/* Right: Enhanced Visual Preview Panel with Parallax */}
          <div 
            className="hidden lg:flex lg:w-[550px] lg:flex-col lg:border-l lg:border-white/5 lg:bg-gradient-to-b lg:from-zinc-950 lg:to-black relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Ambient glow effects */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            </div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div 
                className="h-full w-full"
                style={{
                  backgroundImage: `linear-gradient(hsl(var(--accent) / 0.5) 1px, transparent 1px),
                                   linear-gradient(90deg, hsl(var(--accent) / 0.5) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            {/* Main mockup container with 3D perspective */}
            <div 
              ref={mockupRef}
              className="relative z-10 flex flex-1 flex-col items-center justify-center px-8"
              style={{ perspective: "1000px" }}
            >
              {/* iMac mockup with parallax tilt effect */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full max-w-md"
              >
                {/* Background mockup image */}
                <img 
                  src={studioMockup} 
                  alt="Studio workspace" 
                  className="w-full h-auto rounded-lg"
                  style={{ transform: "translateZ(0)" }}
                />
                
                {/* Screen overlay with preview - lifted forward in 3D space */}
                <motion.div 
                  key={`${config.purpose}-${config.palette}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    top: '8%',
                    left: '22%',
                    right: '22%',
                    bottom: '35%',
                    transform: "translateZ(20px)",
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-sm">
                    <img 
                      src={currentPreview}
                      alt="Website preview"
                      className="w-full h-full object-cover object-top transition-all duration-500"
                    />
                    {/* Screen reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                    {/* Subtle screen glow */}
                    <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)]" />
                  </div>
                </motion.div>

                {/* Floating accent glow behind mockup */}
                <div className="absolute -inset-8 -z-10" style={{ transform: "translateZ(-30px)" }}>
                  <motion.div 
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent rounded-3xl blur-2xl"
                  />
                </div>
                
                {/* Additional depth layers for enhanced 3D effect */}
                <motion.div 
                  className="absolute -inset-4 -z-20 rounded-2xl bg-gradient-to-b from-white/5 to-transparent"
                  style={{ transform: "translateZ(-50px)" }}
                />
              </motion.div>

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
      </div>
    </>
  );
};

export default WebDesignStudioBuild;
