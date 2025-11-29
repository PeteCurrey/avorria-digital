import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BlueprintData } from "@/pages/WebStudio";
import { Home, FileText, Briefcase, BookOpen, DollarSign, MapPin, Users, Wrench } from "lucide-react";

interface StepStructureProps {
  blueprint: BlueprintData;
  onUpdate: (updates: Partial<BlueprintData>) => void;
}

const sizeOptions = [
  { id: "lean", label: "Lean", description: "3-5 pages, focused and fast" },
  { id: "standard", label: "Standard", description: "6-10 pages, comprehensive" },
  { id: "expanded", label: "Expanded", description: "11+ pages, full-featured" }
];

const pageOptions = [
  { id: "home", label: "Home", icon: Home, required: true },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "case-studies", label: "Case Studies", icon: FileText },
  { id: "resources", label: "Resources/Blog", icon: BookOpen },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "locations", label: "Locations", icon: MapPin },
  { id: "portal", label: "Client Portal", icon: Users },
  { id: "tools", label: "Tools/Calculators", icon: Wrench }
];

export function StepStructure({ blueprint, onUpdate }: StepStructureProps) {
  const togglePage = (pageId: string) => {
    const currentPages = blueprint.structure.pages;
    const newPages = currentPages.includes(pageId)
      ? currentPages.filter(p => p !== pageId)
      : [...currentPages, pageId];
    
    onUpdate({
      structure: { ...blueprint.structure, pages: newPages }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-light mb-2 text-foreground">
        Structure & key pages
      </h2>
      <p className="text-muted-foreground mb-8">
        Choose your site size and the pages you'll need.
      </p>

      {/* Size Selection */}
      <div className="mb-8">
        <label className="text-sm font-medium text-foreground mb-3 block">Site Size</label>
        <div className="grid grid-cols-3 gap-3">
          {sizeOptions.map((size) => {
            const isSelected = blueprint.structure.size === size.id;
            
            return (
              <Card
                key={size.id}
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? "border-accent bg-accent/5 shadow-card" 
                    : "border-border hover:border-accent/50"
                }`}
                onClick={() => onUpdate({ 
                  structure: { ...blueprint.structure, size: size.id } 
                })}
              >
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-foreground mb-1">{size.label}</p>
                  <p className="text-xs text-muted-foreground">{size.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Page Selection */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">Key Pages & Modules</label>
        <div className="grid gap-3">
          {pageOptions.map((page) => {
            const Icon = page.icon;
            const isSelected = blueprint.structure.pages.includes(page.id);
            
            return (
              <Card
                key={page.id}
                className={`cursor-pointer transition-all duration-300 ${
                  page.required ? "opacity-50" : ""
                } ${
                  isSelected 
                    ? "border-accent bg-accent/5" 
                    : "border-border hover:border-accent/50"
                }`}
                onClick={() => !page.required && togglePage(page.id)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <Checkbox
                    checked={isSelected}
                    disabled={page.required}
                    className="flex-shrink-0"
                  />
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{page.label}</p>
                    {page.required && (
                      <p className="text-xs text-muted-foreground">Required</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
