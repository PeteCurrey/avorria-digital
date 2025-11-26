import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ContentUpgradeProps {
  title: string;
  description: string;
  buttonText: string;
  source: string;
  variant?: "seo" | "web" | "analytics" | "default";
}

export function ContentUpgrade({
  title,
  description,
  buttonText,
  source,
  variant = "default",
}: ContentUpgradeProps) {
  const handleClick = () => {
    console.log("Event: content_upgrade_clicked", { source, variant });
  };

  return (
    <Card className="p-6 my-8 bg-accent/10 border-accent/20">
      <div className="space-y-4">
        <h4 className="text-xl font-light text-foreground">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
        <Button asChild onClick={handleClick}>
          <a href={`/free-seo-website-audit?source=${source}`}>
            {buttonText}
          </a>
        </Button>
      </div>
    </Card>
  );
}
