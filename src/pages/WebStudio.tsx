import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { WebStudioEntry } from "@/components/web-studio/WebStudioEntry";
import { WebStudioStep } from "@/components/web-studio/WebStudioStep";
import { WebStudioPreview } from "@/components/web-studio/WebStudioPreview";
import { WebStudioSummary } from "@/components/web-studio/WebStudioSummary";
import { trackEvent } from "@/lib/tracking";

export interface BlueprintData {
  siteRole: string;
  visualFeel: {
    density: string;
    energy: string;
    palette: string;
  };
  structure: {
    size: string;
    pages: string[];
  };
  features: string[];
  personality: {
    tone: string;
    approach: string;
    style: string;
  };
}

export default function WebStudio() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [blueprint, setBlueprint] = useState<BlueprintData>({
    siteRole: "",
    visualFeel: {
      density: "balanced",
      energy: "balanced",
      palette: "light-airy"
    },
    structure: {
      size: "standard",
      pages: ["home"]
    },
    features: [],
    personality: {
      tone: "balanced",
      approach: "balanced",
      style: "balanced"
    }
  });

  const totalSteps = 5;

  useEffect(() => {
    trackEvent("web_studio_viewed", {
      timestamp: new Date().toISOString()
    });
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    trackEvent("web_studio_entered", {
      timestamp: new Date().toISOString()
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      trackEvent("web_studio_step_completed", {
        step: currentStep + 1,
        step_name: getStepName(currentStep)
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBlueprint = (updates: Partial<BlueprintData>) => {
    setBlueprint({ ...blueprint, ...updates });
  };

  const getStepName = (step: number): string => {
    const names = ["site_role", "visual_feel", "structure", "features", "personality"];
    return names[step] || "unknown";
  };

  if (!hasEntered) {
    return (
      <>
        <Helmet>
          <title>Web Studio | Avorria</title>
          <meta name="description" content="A guided experience to design your perfect website blueprint" />
        </Helmet>
        <WebStudioEntry onEnter={handleEnter} />
      </>
    );
  }

  if (currentStep === totalSteps) {
    return (
      <>
        <Helmet>
          <title>Your Blueprint | Avorria Web Studio</title>
        </Helmet>
        <WebStudioSummary blueprint={blueprint} onBack={handleBack} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Design Your Blueprint | Avorria Web Studio</title>
        <meta name="description" content="Configure your website with Avorria's guided studio experience" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/50 to-background">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-border/30 z-50">
          <div 
            className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-500"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Progress Indicator */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-full px-6 py-2 shadow-elegant">
            <p className="text-sm text-muted-foreground">
              Step <span className="text-foreground font-semibold">{currentStep + 1}</span> of {totalSteps}
              <span className="mx-2">·</span>
              <span className="text-foreground">{getStepName(currentStep).replace('_', ' ')}</span>
            </p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            {/* Left: Step Content */}
            <div className="lg:sticky lg:top-24">
              <WebStudioStep
                step={currentStep}
                blueprint={blueprint}
                onUpdate={updateBlueprint}
                onNext={handleNext}
                onBack={handleBack}
              />
            </div>

            {/* Right: Preview Canvas */}
            <div className="lg:sticky lg:top-24">
              <WebStudioPreview blueprint={blueprint} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
