import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  ShoppingCart, 
  Calendar, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Globe, 
  Lock, 
  Zap,
  FileText,
  Video,
  Mail
} from "lucide-react";
import type { StudioConfig } from "@/types/studio";

interface FeaturesStepProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
}

const featureCategories = [
  {
    title: "Core Functionality",
    features: [
      { id: "search", label: "Site Search", icon: Search, description: "Help users find content quickly" },
      { id: "forms", label: "Advanced Forms", icon: FileText, description: "Multi-step forms with validation" },
      { id: "chat", label: "Live Chat", icon: MessageSquare, description: "Real-time customer support" },
      { id: "booking", label: "Booking System", icon: Calendar, description: "Schedule appointments online" },
    ],
  },
  {
    title: "E-commerce & Payments",
    features: [
      { id: "ecommerce", label: "E-commerce", icon: ShoppingCart, description: "Sell products online" },
      { id: "payments", label: "Payment Gateway", icon: Lock, description: "Secure online payments" },
      { id: "subscriptions", label: "Subscriptions", icon: Zap, description: "Recurring billing support" },
    ],
  },
  {
    title: "Content & Media",
    features: [
      { id: "blog", label: "Blog / CMS", icon: FileText, description: "Content management system" },
      { id: "video", label: "Video Integration", icon: Video, description: "Embedded video players" },
      { id: "newsletter", label: "Newsletter", icon: Mail, description: "Email capture and campaigns" },
    ],
  },
  {
    title: "Advanced Capabilities",
    features: [
      { id: "members", label: "Member Portal", icon: Users, description: "Gated content for members" },
      { id: "analytics", label: "Analytics Dashboard", icon: BarChart3, description: "Custom reporting views" },
      { id: "multilingual", label: "Multi-language", icon: Globe, description: "Support multiple languages" },
    ],
  },
];

export const FeaturesStep = ({ config, setConfig }: FeaturesStepProps) => {
  const toggleFeature = (featureId: string) => {
    const newFeatures = config.features.includes(featureId)
      ? config.features.filter((f) => f !== featureId)
      : [...config.features, featureId];
    setConfig({ ...config, features: newFeatures });
  };

  return (
    <div className="flex min-h-full flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-4xl font-extralight tracking-tight text-white md:text-5xl">
          What <span className="text-accent">capabilities</span>?
        </h2>
        <p className="mx-auto max-w-lg text-lg font-extralight text-white/60">
          Select the features and integrations your website needs.
        </p>
      </motion.div>

      <div className="mx-auto w-full max-w-5xl space-y-8">
        {featureCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + categoryIndex * 0.1 }}
          >
            <h3 className="mb-4 text-sm font-light text-white/60 uppercase tracking-wider">
              {category.title}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {category.features.map((feature, featureIndex) => {
                const Icon = feature.icon;
                const isSelected = config.features.includes(feature.id);

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + categoryIndex * 0.1 + featureIndex * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleFeature(feature.id)}
                    className={`group cursor-pointer rounded-xl border-2 p-4 transition-all ${
                      isSelected
                        ? "border-accent bg-accent/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          isSelected
                            ? "bg-accent text-accent-foreground"
                            : "bg-white/10 text-white/60 group-hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-light text-white truncate">{feature.label}</p>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleFeature(feature.id)}
                            className="shrink-0 border-white/30 data-[state=checked]:border-accent data-[state=checked]:bg-accent"
                          />
                        </div>
                        <p className="mt-1 text-xs text-white/40 line-clamp-2">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Selected Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-6 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3">
            <span className="text-sm text-white/60">Selected Features:</span>
            <span className="text-lg font-light text-accent">{config.features.length}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesStep;
