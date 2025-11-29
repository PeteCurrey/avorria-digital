import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ConceptCanvas } from "@/components/studio/ConceptCanvas";
import { StudioPurpose } from "@/components/studio/StudioPurpose";
import { StudioMood } from "@/components/studio/StudioMood";
import { StudioStructure } from "@/components/studio/StudioStructure";
import { StudioFeatures } from "@/components/studio/StudioFeatures";
import { StudioPersonality } from "@/components/studio/StudioPersonality";
import { StudioSummary } from "@/components/studio/StudioSummary";
import { trackEvent } from "@/lib/tracking";
import type { StudioConfig } from "@/types/studio";

const WebDesignStudio = () => {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<StudioConfig>({
    purpose: "lead-generation",
    minimal: 50,
    bold: 50,
    palette: "light",
    siteSize: "standard",
    modules: [],
    features: [],
    straightTalking: 50,
    analytical: 50,
    understated: 50,
    notes: "",
  });

  useEffect(() => {
    trackEvent("studio_viewed", {
      entry_source: document.referrer || "direct",
    });
  }, []);

  const handleEnterStudio = () => {
    setShowConfigurator(true);
    trackEvent("studio_entered", {});
    setTimeout(() => {
      document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const steps = [
    { title: "Purpose", component: StudioPurpose },
    { title: "Look & Mood", component: StudioMood },
    { title: "Structure", component: StudioStructure },
    { title: "Features", component: StudioFeatures },
    { title: "Brand Personality", component: StudioPersonality },
    { title: "Summary", component: StudioSummary },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      trackEvent("studio_step_completed", {
        step_number: currentStep + 1,
        step_key: steps[currentStep].title.toLowerCase().replace(/ & /g, "_").replace(/ /g, "_"),
      });
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      trackEvent("studio_step_completed", {
        step_number: currentStep + 1,
        step_key: steps[currentStep].title.toLowerCase().replace(/ & /g, "_").replace(/ /g, "_"),
        is_back: true,
      });
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <>
      <Helmet>
        <title>Web Design Studio | Avorria</title>
        <meta
          name="description"
          content="Configure your next website with our premium Web Design Studio. Define the feel, structure, and features through an interactive visual experience."
        />
      </Helmet>

      {/* Full-Screen Hero Video */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/placeholder.svg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-background-with-colorful-lines-28644-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="mb-6 text-5xl font-extralight tracking-tight text-foreground md:text-7xl">
              Welcome to the Avorria Web Studio.
            </h1>
            <p className="mb-12 text-xl font-extralight text-muted-foreground md:text-2xl">
              A high-end configurator for your next website – not a template picker.
            </p>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={handleEnterStudio}
                className="group font-extralight"
              >
                Enter the Studio
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Link to="/services/web-design">
                <Button variant="ghost" size="lg" className="font-extralight">
                  Back to Web Design Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Configurator Section */}
      <AnimatePresence>
        {showConfigurator && (
          <motion.section
            id="configurator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-background py-20"
          >
            <div className="container mx-auto px-6">
              {/* Progress */}
              <div className="mb-12">
                <div className="mx-auto flex max-w-4xl items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full transition-all ${
                          index <= currentStep
                            ? "bg-accent scale-125"
                            : "bg-border"
                        }`}
                      />
                      <span
                        className={`text-xs font-extralight ${
                          index === currentStep
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Split Layout */}
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Left: Step Content */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col justify-between"
                >
                  <div>
                    <CurrentStepComponent config={config} setConfig={setConfig} />
                  </div>

                  {/* Navigation */}
                  {currentStep < steps.length - 1 && (
                    <div className="mt-12 flex gap-4">
                      {currentStep > 0 && (
                        <Button
                          variant="outline"
                          onClick={handleBack}
                          className="font-extralight"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                      )}
                      <Button
                        onClick={handleNext}
                        className="ml-auto font-extralight"
                      >
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </motion.div>

                {/* Right: Concept Canvas */}
                <div className="sticky top-20 h-[600px] lg:h-[700px]">
                  <ConceptCanvas config={config} />
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default WebDesignStudio;
