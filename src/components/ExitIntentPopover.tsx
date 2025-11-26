import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ExitIntentPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 768) return;
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect mouse leaving from top of viewport
      if (e.clientY <= 0 && !hasShown) {
        console.log("Event: lead_popover_opened");
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handlePrimaryClick = () => {
    console.log("Event: cta_exit_intent_audit_clicked");
    window.location.href = "/free-seo-website-audit?source=exit-intent";
  };

  const handleSecondaryClick = () => {
    console.log("Event: cta_exit_intent_dismissed");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">
            Before you bounce – want a quick, honest teardown of your marketing?
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            We'll review your site, SEO and current setup, then send you a clear breakdown of what's working and what's not.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button onClick={handlePrimaryClick} size="lg" className="w-full">
            Yes, send me an audit
          </Button>
          <Button
            onClick={handleSecondaryClick}
            variant="ghost"
            size="lg"
            className="w-full"
          >
            No thanks, I love guessing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
