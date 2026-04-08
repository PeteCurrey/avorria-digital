'use client';
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Shield,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";
import { trackEvent } from "@/lib/tracking";

interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; riskScore: number }[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Does your homepage have a hero slider or carousel?",
    options: [
      { label: "Yes, with 3+ rotating slides", riskScore: 20 },
      { label: "Yes, just 2 slides", riskScore: 10 },
      { label: "No, single static hero", riskScore: 0 },
    ],
  },
  {
    id: 2,
    question: "Can visitors understand what you do within 5 seconds?",
    options: [
      { label: "Absolutely – it's crystal clear", riskScore: 0 },
      { label: "Probably, if they read carefully", riskScore: 10 },
      { label: "Honestly, it's a bit vague", riskScore: 20 },
    ],
  },
  {
    id: 3,
    question: "Is your primary CTA visible above the fold?",
    options: [
      { label: "Yes, bold and clear", riskScore: 0 },
      { label: "It's there but subtle", riskScore: 10 },
      { label: "You have to scroll to find it", riskScore: 15 },
    ],
  },
  {
    id: 4,
    question: "Do you have social proof within the first 2 scrolls?",
    options: [
      { label: "Yes – logos, testimonials, or case studies", riskScore: 0 },
      { label: "Some, but buried lower", riskScore: 10 },
      { label: "Not really", riskScore: 15 },
    ],
  },
  {
    id: 5,
    question: "How many services do you list on your homepage?",
    options: [
      { label: "3-5 core services", riskScore: 0 },
      { label: "6-10 services", riskScore: 10 },
      { label: "10+ (we do everything!)", riskScore: 15 },
    ],
  },
  {
    id: 6,
    question: "When was your website last significantly updated?",
    options: [
      { label: "Within the last year", riskScore: 0 },
      { label: "1-2 years ago", riskScore: 10 },
      { label: "More than 2 years ago", riskScore: 15 },
    ],
  },
  {
    id: 7,
    question: "Is there a clear next step on every page?",
    options: [
      { label: "Yes, CTAs are strategically placed", riskScore: 0 },
      { label: "On most pages, not all", riskScore: 10 },
      { label: "People have to hunt for what to do next", riskScore: 15 },
    ],
  },
];

type RiskLevel = "safe" | "at-risk" | "critical" | "fired";

const getRiskLevel = (score: number): RiskLevel => {
  if (score <= 25) return "safe";
  if (score <= 50) return "at-risk";
  if (score <= 75) return "critical";
  return "fired";
};

const riskConfig: Record<RiskLevel, { 
  color: string; 
  bgColor: string; 
  icon: React.ElementType; 
  title: string; 
  message: string;
  cta: string;
}> = {
  safe: {
    color: "text-green-500",
    bgColor: "bg-green-500/10 border-green-500/30",
    icon: Shield,
    title: "Your Site is Safe!",
    message: "Great job! Your website follows conversion best practices. There's always room for optimization, but you're ahead of most.",
    cta: "Get a Performance Audit",
  },
  "at-risk": {
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10 border-yellow-500/30",
    icon: AlertTriangle,
    title: "At Risk",
    message: "Your site has some conversion killers that are likely costing you leads. A few strategic fixes could make a big difference.",
    cta: "Get Your Free Teardown",
  },
  critical: {
    color: "text-orange-500",
    bgColor: "bg-orange-500/10 border-orange-500/30",
    icon: Flame,
    title: "Critical Issues Found",
    message: "Your website has serious conversion problems. Every day these issues remain, you're leaving money on the table.",
    cta: "Request Urgent Review",
  },
  fired: {
    color: "text-destructive",
    bgColor: "bg-destructive/10 border-destructive/30",
    icon: Flame,
    title: "Your Site Should Be Fired 🔥",
    message: "Your website has multiple major issues that are actively hurting your business. It's time for a complete rebuild.",
    cta: "Book a Rebuild Strategy Call",
  },
};

const FireRiskQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswer = useCallback((questionId: number, riskScore: number) => {
    const newAnswers = { ...answers, [questionId]: riskScore };
    setAnswers(newAnswers);

    trackEvent("quiz_question_answered", {
      question_number: questionId,
      risk_score: riskScore,
    });

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Calculate final score
        const score = Object.values(newAnswers).reduce((sum, val) => sum + val, 0);
        setTotalScore(score);
        setIsComplete(true);

        trackEvent("quiz_completed", {
          score,
          risk_level: getRiskLevel(score),
        });

        // Confetti for safe scores
        if (score <= 25) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#22c55e", "#10b981", "#34d399"],
          });
        }
      }
    }, 300);
  }, [answers, currentStep]);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
    setTotalScore(0);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const riskLevel = getRiskLevel(totalScore);
  const config = riskConfig[riskLevel];

  return (
    <Card className="p-8 lg:p-12 border-accent/20 bg-card/50 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
              >
                <Sparkles className="h-4 w-4" />
                Interactive Quiz
              </motion.div>
              <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-2">
                Grade Your Website's Fire Risk
              </h3>
              <p className="text-muted-foreground">
                Answer 7 quick questions to find out if your site needs a rescue.
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h4 className="text-xl text-foreground font-medium">
                  {questions[currentStep].question}
                </h4>

                <div className="space-y-3">
                  {questions[currentStep].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleAnswer(questions[currentStep].id, option.riskScore)}
                      className={`w-full p-4 rounded-lg border text-left transition-all duration-200 hover:border-accent hover:bg-accent/5 ${
                        answers[questions[currentStep].id] === option.riskScore
                          ? "border-accent bg-accent/10"
                          : "border-border bg-background"
                      }`}
                    >
                      <span className="text-foreground">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {currentStep > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            {/* Score Display */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${config.bgColor} mb-6`}
            >
              <div className="text-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`text-4xl font-bold ${config.color}`}
                >
                  {totalScore}
                </motion.span>
                <span className="block text-sm text-muted-foreground">/100</span>
              </div>
            </motion.div>

            {/* Result Icon */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`flex justify-center mb-4 ${config.color}`}
            >
              <config.icon className="h-12 w-12" />
            </motion.div>

            {/* Result Text */}
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-2xl lg:text-3xl font-medium mb-4 ${config.color}`}
            >
              {config.title}
            </motion.h3>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground max-w-md mx-auto mb-8"
            >
              {config.message}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => {
                  trackEvent("quiz_cta_clicked", { risk_level: riskLevel });
                  window.location.href = "/free-seo-website-audit?source=fire-quiz&score=" + totalScore;
                }}
              >
                {config.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleRestart}>
                Retake Quiz
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default FireRiskQuiz;

