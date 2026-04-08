'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ArrowRight,
  Globe
} from "lucide-react";
import { trackEvent } from "@/lib/tracking";

interface ScanResult {
  category: string;
  status: "pass" | "fail" | "warning";
  message: string;
}

const scanStages = [
  "Checking hero section...",
  "Analyzing CTA placement...",
  "Scanning for social proof...",
  "Evaluating mobile experience...",
  "Reviewing page speed...",
  "Checking SEO basics...",
];

const generateMockResults = (): ScanResult[] => {
  const results: ScanResult[] = [
    {
      category: "Hero Section",
      status: Math.random() > 0.6 ? "fail" : "pass",
      message: Math.random() > 0.6 ? "Multiple hero elements competing for attention" : "Clear hero with focused message",
    },
    {
      category: "CTA Visibility",
      status: Math.random() > 0.5 ? "warning" : "pass",
      message: Math.random() > 0.5 ? "Primary CTA below the fold on mobile" : "CTA clearly visible above fold",
    },
    {
      category: "Social Proof",
      status: Math.random() > 0.4 ? "fail" : "pass",
      message: Math.random() > 0.4 ? "No testimonials or case studies visible" : "Social proof present in hero area",
    },
    {
      category: "Mobile Experience",
      status: Math.random() > 0.7 ? "fail" : "warning",
      message: Math.random() > 0.7 ? "Layout breaks on smaller screens" : "Some elements need mobile optimization",
    },
    {
      category: "Page Speed",
      status: Math.random() > 0.5 ? "warning" : "pass",
      message: Math.random() > 0.5 ? "Large images slowing load time" : "Page loads within acceptable range",
    },
    {
      category: "SEO Basics",
      status: Math.random() > 0.6 ? "fail" : "warning",
      message: Math.random() > 0.6 ? "Missing meta description and alt tags" : "Basic SEO present but needs work",
    },
  ];

  return results;
};

const LiveAnalyzerPreview: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [results, setResults] = useState<ScanResult[] | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isScanning) {
      const stageInterval = setInterval(() => {
        setCurrentStage((prev) => {
          if (prev >= scanStages.length - 1) {
            clearInterval(stageInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);

      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 140);

      // Complete scan after all stages
      const completeTimeout = setTimeout(() => {
        setIsScanning(false);
        setResults(generateMockResults());
        trackEvent("analyzer_scan_completed", { url });
      }, scanStages.length * 1200 + 500);

      return () => {
        clearInterval(stageInterval);
        clearInterval(progressInterval);
        clearTimeout(completeTimeout);
      };
    }
  }, [isScanning, url]);

  const handleScan = () => {
    if (!url) return;
    
    trackEvent("analyzer_url_submitted", { url });
    setIsScanning(true);
    setCurrentStage(0);
    setScanProgress(0);
    setResults(null);
  };

  const handleReset = () => {
    setUrl("");
    setResults(null);
    setCurrentStage(0);
    setScanProgress(0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "fail":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const issueCount = results?.filter((r) => r.status !== "pass").length || 0;

  return (
    <Card className="p-8 lg:p-12 border-accent/20 overflow-hidden">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4"
        >
          <Search className="h-8 w-8 text-accent" />
        </motion.div>
        <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-2">
          Live Website Analyzer
        </h3>
        <p className="text-muted-foreground">
          Enter your URL for an instant preview of common issues.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!results ? (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* URL Input */}
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="url"
                placeholder="https://yourwebsite.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-12 h-14 text-lg"
                disabled={isScanning}
              />
            </div>

            {/* Scan Button / Progress */}
            {!isScanning ? (
              <Button
                size="lg"
                className="w-full"
                onClick={handleScan}
                disabled={!url}
              >
                Analyze My Website
                <Search className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Current Stage */}
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin text-accent" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentStage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {scanStages[currentStage]}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Scan Animation */}
                <div className="relative aspect-video bg-muted/50 rounded-lg overflow-hidden border border-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">{url}</span>
                  </div>
                  <motion.div
                    className="absolute left-0 top-0 w-full h-1 bg-accent"
                    animate={{
                      y: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ boxShadow: "0 0 20px hsl(var(--accent))" }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary */}
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Analyzed: {url}</p>
              <p className="text-lg font-medium">
                Found{" "}
                <span className={issueCount > 2 ? "text-destructive" : "text-yellow-500"}>
                  {issueCount} issue{issueCount !== 1 ? "s" : ""}
                </span>{" "}
                requiring attention
              </p>
            </div>

            {/* Results List */}
            <div className="space-y-3">
              {results.map((result, idx) => (
                <motion.div
                  key={result.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-lg border flex items-start gap-3 ${
                    result.status === "pass"
                      ? "bg-green-500/5 border-green-500/20"
                      : result.status === "warning"
                      ? "bg-yellow-500/5 border-yellow-500/20"
                      : "bg-destructive/5 border-destructive/20"
                  }`}
                >
                  {getStatusIcon(result.status)}
                  <div>
                    <p className="font-medium text-foreground">{result.category}</p>
                    <p className="text-sm text-muted-foreground">{result.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => {
                  trackEvent("analyzer_cta_clicked");
                  window.location.href = "/free-seo-website-audit?source=live-analyzer&url=" + encodeURIComponent(url);
                }}
              >
                Get Full Teardown
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleReset}
              >
                Analyze Another Site
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              This is a quick preview. Full teardowns include detailed recommendations and priority fixes.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default LiveAnalyzerPreview;


