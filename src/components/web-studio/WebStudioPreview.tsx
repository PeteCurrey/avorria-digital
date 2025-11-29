import { Card } from "@/components/ui/card";
import { BlueprintData } from "@/pages/WebStudio";
import { Monitor } from "lucide-react";

interface WebStudioPreviewProps {
  blueprint: BlueprintData;
}

export function WebStudioPreview({ blueprint }: WebStudioPreviewProps) {
  // Determine background color based on palette
  const getBgColor = () => {
    switch (blueprint.visualFeel.palette) {
      case "dark-cinematic":
        return "from-gray-900 to-gray-800";
      case "monochrome-accent":
        return "from-gray-100 to-gray-200";
      case "gradient-forward":
        return "from-purple-500/20 to-pink-500/20";
      default:
        return "from-white to-gray-50";
    }
  };

  // Determine density layout
  const getLayoutDensity = () => {
    return blueprint.visualFeel.density === "minimal" ? "space-y-12" : 
           blueprint.visualFeel.density === "content-rich" ? "space-y-4" : "space-y-8";
  };

  // Determine energy level
  const getAccentStyle = () => {
    return blueprint.visualFeel.energy === "bold" 
      ? "bg-gradient-to-r from-accent to-accent/70 h-3" 
      : blueprint.visualFeel.energy === "calm"
      ? "bg-muted h-2"
      : "bg-accent/50 h-2";
  };

  return (
    <Card className="border-border bg-card/80 backdrop-blur-sm shadow-card overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Live Preview</p>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
      </div>

      {/* Mock website preview */}
      <div className="aspect-[4/3] bg-gradient-to-br from-background to-secondary/30 p-6 overflow-hidden">
        <div className={`h-full bg-gradient-to-br ${getBgColor()} rounded-lg overflow-hidden shadow-inner transition-all duration-700`}>
          <div className={`p-8 h-full overflow-auto ${getLayoutDensity()}`}>
            {/* Header */}
            <div className="flex justify-between items-center pb-6 border-b border-current/10">
              <div className="w-24 h-6 bg-current/20 rounded" />
              <div className="flex gap-3">
                {blueprint.structure.pages.map((page, i) => (
                  <div key={i} className="w-16 h-4 bg-current/10 rounded" />
                ))}
              </div>
            </div>

            {/* Hero section */}
            <div className="mt-8">
              <div className={`${getAccentStyle()} rounded transition-all duration-500`} />
              <div className="mt-6 space-y-3">
                <div className="w-3/4 h-8 bg-current/30 rounded" />
                <div className="w-2/3 h-6 bg-current/20 rounded" />
                <div className="w-1/2 h-6 bg-current/15 rounded" />
              </div>
              
              {/* CTA buttons */}
              <div className="flex gap-3 mt-6">
                <div className="w-32 h-10 bg-accent/80 rounded" />
                <div className="w-32 h-10 bg-current/20 rounded" />
              </div>
            </div>

            {/* Content sections */}
            {blueprint.visualFeel.density !== "minimal" && (
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-full aspect-square bg-current/10 rounded" />
                    <div className="w-full h-3 bg-current/20 rounded" />
                    <div className="w-2/3 h-3 bg-current/15 rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* Features badges */}
            {blueprint.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {blueprint.features.slice(0, 5).map((feature, i) => (
                  <div key={i} className="px-3 py-1 bg-accent/20 text-xs rounded-full border border-accent/30">
                    {feature.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                  </div>
                ))}
              </div>
            )}

            {/* Site map visualization */}
            {blueprint.structure.size && (
              <div className="mt-8 flex justify-center gap-2">
                {blueprint.structure.pages.slice(0, 6).map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-current/20 rounded border border-current/30" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info footer */}
      <div className="p-4 bg-muted/50 text-center">
        <p className="text-xs text-muted-foreground">
          This preview updates as you make choices
        </p>
      </div>
    </Card>
  );
}
