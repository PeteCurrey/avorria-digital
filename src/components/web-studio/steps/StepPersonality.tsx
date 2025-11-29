import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { BlueprintData } from "@/pages/WebStudio";

interface StepPersonalityProps {
  blueprint: BlueprintData;
  onUpdate: (updates: Partial<BlueprintData>) => void;
}

const axes = [
  {
    id: "tone",
    label: "Communication Tone",
    left: "Straight-talking",
    right: "Polished"
  },
  {
    id: "approach",
    label: "Content Approach",
    left: "Analytical",
    right: "Story-led"
  },
  {
    id: "style",
    label: "Design Style",
    left: "Understated",
    right: "Showpiece"
  }
];

export function StepPersonality({ blueprint, onUpdate }: StepPersonalityProps) {
  const handleChange = (axis: string, value: number[]) => {
    const position = value[0] < 33 ? "left" : value[0] > 66 ? "right" : "balanced";
    onUpdate({
      personality: { ...blueprint.personality, [axis]: position }
    });
  };

  const getValue = (axis: string) => {
    const val = blueprint.personality[axis as keyof typeof blueprint.personality];
    return val === "left" ? 16 : val === "right" ? 84 : 50;
  };

  const getLabel = (axis: string) => {
    const val = blueprint.personality[axis as keyof typeof blueprint.personality];
    if (val === "balanced") return "Balanced";
    
    const axisData = axes.find(a => a.id === axis);
    return val === "left" ? axisData?.left : axisData?.right;
  };

  return (
    <div>
      <h2 className="text-3xl font-light mb-2 text-foreground">
        Brand personality & tone
      </h2>
      <p className="text-muted-foreground mb-8">
        Help us understand the character and voice of your brand.
      </p>

      <div className="space-y-8">
        {axes.map((axis) => (
          <Card key={axis.id} className="p-6 border-border">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-foreground">{axis.label}</label>
              <span className="text-sm text-accent font-medium">{getLabel(axis.id)}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground w-24 text-right">{axis.left}</span>
              <Slider
                value={[getValue(axis.id)]}
                onValueChange={(value) => handleChange(axis.id, value)}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-24">{axis.right}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-secondary rounded-lg border border-border">
        <p className="text-sm text-muted-foreground mb-2">Your brand personality:</p>
        <p className="text-lg font-medium text-foreground">
          {getLabel("tone")}, {getLabel("approach")}, {getLabel("style")}
        </p>
      </div>
    </div>
  );
}
