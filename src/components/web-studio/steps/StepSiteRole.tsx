import { Card, CardContent } from "@/components/ui/card";
import { Target, Megaphone, Package, Users } from "lucide-react";
import { BlueprintData } from "@/pages/WebStudio";

interface StepSiteRoleProps {
  blueprint: BlueprintData;
  onUpdate: (updates: Partial<BlueprintData>) => void;
}

const roles = [
  {
    id: "lead-gen",
    icon: Target,
    label: "Lead-gen site",
    description: "Convert visitors into qualified leads and demo requests"
  },
  {
    id: "authority-hub",
    icon: Megaphone,
    label: "Authority hub",
    description: "Build trust through content, case studies, and thought leadership"
  },
  {
    id: "saas-product",
    icon: Package,
    label: "SaaS/Product site",
    description: "Showcase features, pricing, and drive sign-ups or trials"
  },
  {
    id: "service-platform",
    icon: Users,
    label: "Service platform/portal",
    description: "Client portals, resource hubs, or community platforms"
  }
];

export function StepSiteRole({ blueprint, onUpdate }: StepSiteRoleProps) {
  return (
    <div>
      <h2 className="text-3xl font-light mb-2 text-foreground">
        Site role & objective
      </h2>
      <p className="text-muted-foreground mb-8">
        What's the primary job this website needs to do?
      </p>

      <div className="grid gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = blueprint.siteRole === role.id;
          
          return (
            <Card
              key={role.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-card-hover ${
                isSelected 
                  ? "border-accent bg-accent/5 shadow-card" 
                  : "border-border hover:border-accent/50"
              }`}
              onClick={() => onUpdate({ siteRole: role.id })}
            >
              <CardContent className="p-6 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? "bg-accent/20" : "bg-muted"
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 text-foreground">
                    {role.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
