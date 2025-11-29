import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { BlueprintData } from "@/pages/WebStudio";

interface StepVisualFeelProps {
  blueprint: BlueprintData;
  onUpdate: (updates: Partial<BlueprintData>) => void;
}

const palettes = [
  { id: "light-airy", label: "Light & Airy", colors: ["bg-white", "bg-gray-50", "bg-gray-100"] },
  { id: "dark-cinematic", label: "Dark & Cinematic", colors: ["bg-gray-900", "bg-gray-800", "bg-gray-700"] },
  { id: "monochrome-accent", label: "Monochrome + Accent", colors: ["bg-gray-200", "bg-gray-400", "bg-accent"] },
  { id: "gradient-forward", label: "Gradient Forward", colors: ["bg-gradient-to-r from-purple-500 to-pink-500"] }
];

export function StepVisualFeel({ blueprint, onUpdate }: StepVisualFeelProps) {
  const handleDensityChange = (value: number[]) => {
    const density = value[0] < 33 ? "minimal" : value[0] > 66 ? "content-rich" : "balanced";
    onUpdate({ 
      visualFeel: { ...blueprint.visualFeel, density } 
    });
  };

  const handleEnergyChange = (value: number[]) => {
    const energy = value[0] < 33 ? "calm" : value[0] > 66 ? "bold" : "balanced";
    onUpdate({ 
      visualFeel: { ...blueprint.visualFeel, energy } 
    });
  };

  const getDensityValue = () => {
    return blueprint.visualFeel.density === "minimal" ? 16 : 
           blueprint.visualFeel.density === "content-rich" ? 84 : 50;
  };

  const getEnergyValue = () => {
    return blueprint.visualFeel.energy === "calm" ? 16 : 
           blueprint.visualFeel.energy === "bold" ? 84 : 50;
  };

  return (
    <div>
      <h2 className="text-3xl font-light mb-2 text-foreground">
        Visual feel & energy
      </h2>
      <p className="text-muted-foreground mb-8">
        Set the aesthetic direction for your site.
      </p>

      {/* Density Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-foreground">Layout Density</label>
          <span className="text-sm text-accent capitalize">{blueprint.visualFeel.density}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">Minimal</span>
          <Slider
            value={[getDensityValue()]}
            onValueChange={handleDensityChange}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground">Content-rich</span>
        </div>
      </div>

      {/* Energy Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-foreground">Visual Energy</label>
          <span className="text-sm text-accent capitalize">{blueprint.visualFeel.energy}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">Calm</span>
          <Slider
            value={[getEnergyValue()]}
            onValueChange={handleEnergyChange}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground">Bold</span>
        </div>
      </div>

      {/* Palette Selection */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">Color Palette</label>
        <div className="grid grid-cols-2 gap-3">
          {palettes.map((palette) => {
            const isSelected = blueprint.visualFeel.palette === palette.id;
            
            return (
              <Card
                key={palette.id}
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? "border-accent shadow-card" 
                    : "border-border hover:border-accent/50"
                }`}
                onClick={() => onUpdate({ 
                  visualFeel: { ...blueprint.visualFeel, palette: palette.id } 
                })}
              >
                <CardContent className="p-4">
                  <div className="flex gap-1 mb-2 h-8">
                    {palette.colors.map((color, i) => (
                      <div key={i} className={`flex-1 rounded ${color}`} />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-foreground">{palette.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
