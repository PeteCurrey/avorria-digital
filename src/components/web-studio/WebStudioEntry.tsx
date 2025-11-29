import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface WebStudioEntryProps {
  onEnter: () => void;
}

export function WebStudioEntry({ onEnter }: WebStudioEntryProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger entry animation after mount
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
      {/* Animated gradient mesh background */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(at 20% 30%, hsla(320, 85%, 55%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 70%, hsla(260, 75%, 60%, 0.3) 0px, transparent 50%), radial-gradient(at 50% 50%, hsla(280, 70%, 65%, 0.2) 0px, transparent 50%)',
          opacity: isAnimating ? 1 : 0
        }}
      />

      {/* Floating panels animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-4xl px-6">
          {/* Abstract website frames */}
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] transition-all duration-1000 ${
              isAnimating ? 'opacity-20 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="absolute top-0 left-0 w-48 h-32 bg-accent/10 border border-accent/30 rounded-lg backdrop-blur-sm" 
                 style={{ transform: isAnimating ? 'translate(-120%, -60%)' : 'translate(0, 0)' }} />
            <div className="absolute top-0 right-0 w-64 h-40 bg-accent/10 border border-accent/30 rounded-lg backdrop-blur-sm" 
                 style={{ transform: isAnimating ? 'translate(120%, -50%)' : 'translate(0, 0)' }} />
            <div className="absolute bottom-0 left-0 w-56 h-36 bg-accent/10 border border-accent/30 rounded-lg backdrop-blur-sm" 
                 style={{ transform: isAnimating ? 'translate(-100%, 60%)' : 'translate(0, 0)' }} />
            <div className="absolute bottom-0 right-0 w-52 h-32 bg-accent/10 border border-accent/30 rounded-lg backdrop-blur-sm" 
                 style={{ transform: isAnimating ? 'translate(110%, 70%)' : 'translate(0, 0)' }} />
          </div>
        </div>
      </div>

      {/* Central content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div 
          className={`max-w-3xl text-center transition-all duration-1000 delay-300 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-accent" />
              </div>
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-2xl animate-pulse" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-light text-primary-foreground mb-6 leading-tight">
            Welcome to the Avorria Web Studio.
          </h1>

          {/* Subheadline */}
          <p className="text-xl lg:text-2xl text-primary-foreground/80 mb-4 leading-relaxed max-w-2xl mx-auto">
            A guided experience to explore how your next website could look and feel – then send us a tailored blueprint to start the build.
          </p>

          {/* Secondary text */}
          <p className="text-sm text-primary-foreground/60 mb-12 italic">
            Not a template builder. A high-end onboarding for serious projects.
          </p>

          {/* CTA */}
          <Button
            onClick={onEnter}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_40px_rgba(var(--accent),0.3)] hover:shadow-[0_0_50px_rgba(var(--accent),0.4)] transition-all duration-300 px-8 py-6 text-lg group"
          >
            Enter the Studio
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
