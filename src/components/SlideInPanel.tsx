import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteSettings } from "@/hooks/useSiteSettings";
interface SlideInPanelProps {
  triggerAfterScroll?: number; // Percentage of page scrolled (0-100)
  triggerAfterSeconds?: number; // Seconds elapsed
}
export function SlideInPanel({
  triggerAfterScroll = 50,
  triggerAfterSeconds = 30
}: SlideInPanelProps) {
  const { data: siteSettings } = useSiteSettings();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  // If disabled globally, don't show
  const isEnabled = siteSettings?.popup_slide_in_enabled ?? true;
  useEffect(() => {
    if (isDismissed) return;
    let scrollTriggered = false;
    let timeTriggered = false;
    const checkTriggers = () => {
      if (scrollTriggered || timeTriggered) {
        setIsVisible(true);
      }
    };

    // Scroll trigger
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      if (scrollPercent >= triggerAfterScroll) {
        scrollTriggered = true;
        checkTriggers();
      }
    };

    // Time trigger
    const timer = setTimeout(() => {
      timeTriggered = true;
      checkTriggers();
    }, triggerAfterSeconds * 1000);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [triggerAfterScroll, triggerAfterSeconds, isDismissed]);
  const handleClose = () => {
    console.log("Event: lead_slidein_closed");
    setIsVisible(false);
    setIsDismissed(true);
  };
  const handleClick = () => {
    console.log("Event: lead_slidein_opened");
    window.location.href = "/free-seo-website-audit?source=slidein";
  };
  if (!isVisible || isDismissed) return null;
  return <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-slide-in-right max-w-[calc(100vw-2rem)] sm:max-w-none">
      <Card className="w-full sm:w-80 p-4 sm:p-6 shadow-lg bg-card border-border rounded-sm opacity-75">
        <button onClick={handleClose} className="absolute top-2 right-2 sm:top-3 sm:right-3 text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Close">
          <X className="w-5 h-5 sm:w-4 sm:h-4" />
        </button>

        <div className="space-y-3 sm:space-y-4 pr-6">
          <h4 className="text-base sm:text-lg font-light text-foreground">
            Get a free SEO & website audit
          </h4>
          <p className="text-sm text-muted-foreground">
            We'll record a short Loom-style teardown of your site and send you specific, actionable fixes.
          </p>
          <Button onClick={handleClick} className="w-full h-11 sm:h-10">
            Get my audit
          </Button>
        </div>
      </Card>
    </div>;
}