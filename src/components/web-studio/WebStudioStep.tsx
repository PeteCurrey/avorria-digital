import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlueprintData } from "@/pages/WebStudio";
import { StepSiteRole } from "./steps/StepSiteRole";
import { StepVisualFeel } from "./steps/StepVisualFeel";
import { StepStructure } from "./steps/StepStructure";
import { StepFeatures } from "./steps/StepFeatures";
import { StepPersonality } from "./steps/StepPersonality";

interface WebStudioStepProps {
  step: number;
  blueprint: BlueprintData;
  onUpdate: (updates: Partial<BlueprintData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function WebStudioStep({ step, blueprint, onUpdate, onNext, onBack }: WebStudioStepProps) {
  const canProceed = () => {
    switch (step) {
      case 0:
        return blueprint.siteRole !== "";
      case 1:
        return true; // Visual feel has defaults
      case 2:
        return blueprint.structure.pages.length > 0;
      case 3:
        return true; // Features are optional
      case 4:
        return true; // Personality has defaults
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <StepSiteRole blueprint={blueprint} onUpdate={onUpdate} />;
      case 1:
        return <StepVisualFeel blueprint={blueprint} onUpdate={onUpdate} />;
      case 2:
        return <StepStructure blueprint={blueprint} onUpdate={onUpdate} />;
      case 3:
        return <StepFeatures blueprint={blueprint} onUpdate={onUpdate} />;
      case 4:
        return <StepPersonality blueprint={blueprint} onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm shadow-card-hover">
      <CardContent className="p-8 lg:p-10">
        {/* Step content */}
        <div className="mb-8 animate-fade-in">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={step === 0}
            className="flex-shrink-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!canProceed()}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground group"
          >
            {step === 4 ? "Review Blueprint" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
