import { Check } from "lucide-react";

interface EstimatorProgressProps {
  currentStep: number;
  totalSteps: number;
}

const EstimatorProgress = ({ currentStep, totalSteps }: EstimatorProgressProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center relative flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step < currentStep
                    ? "bg-accent border-accent text-accent-foreground"
                    : step === currentStep
                    ? "border-accent text-accent bg-background"
                    : "border-border text-muted-foreground bg-background"
                }`}
              >
                {step < currentStep ? (
                  <Check size={20} />
                ) : (
                  <span className="text-sm font-semibold">{step}</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground mt-2 absolute -bottom-6 whitespace-nowrap">
                Step {step}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-0.5 flex-1 transition-all ${
                  step < currentStep ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstimatorProgress;
