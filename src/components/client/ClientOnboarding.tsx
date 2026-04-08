'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  LayoutDashboard,
  Briefcase,
  FileText,
  BarChart3,
  MessageCircle,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ClientOnboardingProps {
  userName: string;
  clientName: string;
  accountManagerName?: string;
  accountManagerEmail?: string;
  onComplete: () => void;
  onDismiss: () => void;
}

interface OnboardingStep {
  icon: React.ElementType;
  title: string;
  description: string;
  image?: string;
}

const steps: OnboardingStep[] = [
  {
    icon: LayoutDashboard,
    title: "Your Dashboard",
    description: "Get a quick overview of all your projects, key metrics, and what we're working on. Everything you need at a glance.",
  },
  {
    icon: Briefcase,
    title: "Project Showcase",
    description: "View your website designs with our interactive before & after sliders. Explore fullscreen galleries and leave feedback directly on any design.",
  },
  {
    icon: FileText,
    title: "Proposals & Documents",
    description: "Review proposals, contracts, and important documents. Accept or request changes with a single click.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Track your website performance, SEO rankings, and marketing metrics. See exactly what's working.",
  },
  {
    icon: MessageCircle,
    title: "Leave Feedback",
    description: "Comment directly on designs and deliverables. We'll see your feedback instantly and respond promptly.",
  },
];

export const ClientOnboarding = ({
  userName,
  clientName,
  accountManagerName = "Your Account Manager",
  accountManagerEmail,
  onComplete,
  onDismiss,
}: ClientOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem(`onboarding-complete-${clientName}`, "true");
    setTimeout(onComplete, 300);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(`onboarding-dismissed-${clientName}`, "true");
    setTimeout(onDismiss, 300);
  };

  // Check if already completed
  useEffect(() => {
    const completed = localStorage.getItem(`onboarding-complete-${clientName}`);
    const dismissed = localStorage.getItem(`onboarding-dismissed-${clientName}`);
    if (completed || dismissed) {
      setIsVisible(false);
      onDismiss();
    }
  }, [clientName, onDismiss]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-6 pb-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="absolute top-4 right-4 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>

            {currentStep === 0 ? (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mx-auto mb-4"
                >
                  <img 
                    src="/logo.png" 
                    alt="Avorria" 
                    className="h-12 w-auto mx-auto"
                  />
                </motion.div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Welcome, {userName}!
                </h2>
                <p className="text-muted-foreground">
                  Let's take a quick tour of your client portal for {clientName}.
                </p>
              </div>
            ) : (
              <div className="pr-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      This portal gives you complete visibility into your project progress, designs, 
                      and performance metrics.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {steps.slice(1).map((s, i) => {
                        const StepIcon = s.icon;
                        return (
                          <div 
                            key={i}
                            className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                          >
                            <StepIcon className="h-4 w-4 text-primary" />
                            <span className="text-sm text-foreground">{s.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : isLastStep ? (
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground">{step.description}</p>
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="font-medium text-foreground">You're all set!</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {accountManagerName} is here to help if you need anything.
                      </p>
                      {accountManagerEmail && (
                        <a 
                          href={`mailto:${accountManagerEmail}`}
                          className="text-sm text-primary hover:underline mt-2 inline-block"
                        >
                          {accountManagerEmail}
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">{step.description}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 space-y-4">
            {/* Progress */}
            <Progress value={progress} className="h-1" />

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>

              <div className="flex items-center gap-1">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <Button onClick={handleNext} className="gap-2">
                {isLastStep ? "Get Started" : "Next"}
                {!isLastStep && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClientOnboarding;

