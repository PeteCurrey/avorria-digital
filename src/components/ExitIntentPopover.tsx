import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");

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
    console.log("Event: cta_exit_intent_audit_clicked", { websiteUrl, email });
    
    // Build query params for prefilling the form
    const params = new URLSearchParams();
    params.set("source", "exit-intent");
    if (websiteUrl) params.set("website", websiteUrl);
    if (email) params.set("email", email);
    
    window.location.href = `/free-seo-website-audit?${params.toString()}`;
  };

  const handleSecondaryClick = () => {
    console.log("Event: cta_exit_intent_dismissed");
    setIsOpen(false);
  };

  const isFormValid = websiteUrl.trim().length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">
            Before you go – want a free website audit?
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            We'll analyze your site and send you a clear breakdown of what's working and what's holding you back.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="exit-website">Your website URL *</Label>
            <Input
              id="exit-website"
              type="url"
              placeholder="https://yourwebsite.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exit-email">Your email (optional)</Label>
            <Input
              id="exit-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-3 pt-4">
          <Button 
            onClick={handlePrimaryClick} 
            size="lg" 
            className="w-full"
            disabled={!isFormValid}
          >
            Get my free audit
          </Button>
          <Button
            onClick={handleSecondaryClick}
            variant="ghost"
            size="lg"
            className="w-full"
          >
            No thanks, I'm good
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}