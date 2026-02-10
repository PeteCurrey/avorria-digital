import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Import example images for each purpose type
import leadGenDark from "@/assets/studio-previews/lead-gen-dark.jpg";
import contentHubDark from "@/assets/studio-previews/content-hub-dark.jpg";
import saasDark from "@/assets/studio-previews/saas-dark.jpg";
import serviceDark from "@/assets/studio-previews/service-dark.jpg";

interface PurposeExampleLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purposeType: string;
}

const PURPOSE_EXAMPLES: Record<string, {
  title: string;
  image: string;
  description: string;
  features: string[];
}> = {
  "lead-generation": {
    title: "Lead Generation Website",
    image: leadGenDark,
    description: "Designed to convert visitors into qualified leads. Every element is optimised for action — from the hero CTA to strategically placed trust signals and conversion-focused layouts.",
    features: [
      "Prominent calls-to-action above the fold",
      "Social proof & testimonials near conversion points",
      "Multi-step lead capture forms",
      "Exit-intent engagement tools",
      "A/B testable landing page layouts",
    ],
  },
  "content-hub": {
    title: "Authority Hub Website",
    image: contentHubDark,
    description: "Built around content and expertise. Positions your brand as a thought leader with resource libraries, long-form articles, and knowledge centres that attract organic traffic.",
    features: [
      "Resource library with filtering & search",
      "Thought leadership blog with categories",
      "Downloadable guides & whitepapers",
      "Newsletter subscription integration",
      "SEO-optimised content architecture",
    ],
  },
  "product-saas": {
    title: "Product / SaaS Website",
    image: saasDark,
    description: "Showcases features and drives signups for your digital product. Features interactive product tours, transparent pricing, and streamlined onboarding flows.",
    features: [
      "Interactive feature showcases",
      "Tiered pricing tables",
      "Product demo or video walkthrough",
      "User onboarding flow",
      "Integration & API documentation",
    ],
  },
  "service-portal": {
    title: "Service Platform Website",
    image: serviceDark,
    description: "Multi-area navigation for diverse professional service offerings. Clearly communicates each service area with dedicated pages, case studies, and booking systems.",
    features: [
      "Service area breakdown with dedicated pages",
      "Case study showcases per service",
      "Online booking & scheduling",
      "Team / expertise profiles",
      "Client portal integration",
    ],
  },
};

export const PurposeExampleLightbox = ({ open, onOpenChange, purposeType }: PurposeExampleLightboxProps) => {
  const example = PURPOSE_EXAMPLES[purposeType];
  if (!example) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-white/10 bg-black/95 p-0 text-white backdrop-blur-xl sm:rounded-2xl overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{example.title}</DialogTitle>
          <DialogDescription>Example of a {example.title.toLowerCase()}</DialogDescription>
        </DialogHeader>
        
        {/* Preview Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={example.image}
            alt={`${example.title} example`}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="text-2xl font-light text-white">{example.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5 p-6 pt-2">
          <p className="text-sm leading-relaxed text-white/70">{example.description}</p>

          <div>
            <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">Key Features</h4>
            <ul className="space-y-2">
              {example.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-white/60"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurposeExampleLightbox;
