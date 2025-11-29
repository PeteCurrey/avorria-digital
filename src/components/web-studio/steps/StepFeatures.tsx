import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BlueprintData } from "@/pages/WebStudio";
import { Sparkles, BookOpen, Shield, Zap, Search, ArrowRight } from "lucide-react";

interface StepFeaturesProps {
  blueprint: BlueprintData;
  onUpdate: (updates: Partial<BlueprintData>) => void;
}

const features = [
  {
    id: "interactive-tools",
    icon: Sparkles,
    label: "Interactive tools",
    description: "Calculators, estimators, or configurators"
  },
  {
    id: "content-library",
    icon: BookOpen,
    label: "Content library",
    description: "Resource hub, blog, or knowledge base"
  },
  {
    id: "client-portal",
    icon: Shield,
    label: "Client portal",
    description: "Login area for reports, documents, or dashboards"
  },
  {
    id: "animations",
    icon: Zap,
    label: "Animations & micro-interactions",
    description: "Premium movement and transitions"
  },
  {
    id: "seo-foundations",
    icon: Search,
    label: "SEO foundations & migration",
    description: "Technical SEO setup and content migration"
  },
  {
    id: "advanced-integrations",
    icon: ArrowRight,
    label: "Advanced integrations",
    description: "CRM, marketing automation, or custom APIs"
  }
];

export function StepFeatures({ blueprint, onUpdate }: StepFeaturesProps) {
  const toggleFeature = (featureId: string) => {
    const currentFeatures = blueprint.features;
    const newFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter(f => f !== featureId)
      : [...currentFeatures, featureId];
    
    onUpdate({ features: newFeatures });
  };

  return (
    <div>
      <h2 className="text-3xl font-light mb-2 text-foreground">
        Features & interactions
      </h2>
      <p className="text-muted-foreground mb-8">
        Select additional capabilities you'll need. These are optional.
      </p>

      <div className="grid gap-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isSelected = blueprint.features.includes(feature.id);
          
          return (
            <Card
              key={feature.id}
              className={`cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? "border-accent bg-accent/5 shadow-card" 
                  : "border-border hover:border-accent/50"
              }`}
              onClick={() => toggleFeature(feature.id)}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <Checkbox
                  checked={isSelected}
                  className="mt-1 flex-shrink-0"
                />
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {feature.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-sm text-muted-foreground mt-6 text-center italic">
        Don't worry if you're unsure – we'll refine this together.
      </p>
    </div>
  );
}
