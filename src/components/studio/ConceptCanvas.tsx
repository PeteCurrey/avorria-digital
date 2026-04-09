import { motion } from "framer-motion";
import type { StudioConfig } from "@/types/studio";

interface ConceptCanvasProps {
  config: StudioConfig;
}

export const ConceptCanvas = ({ config }: ConceptCanvasProps) => {
  const getBackgroundColor = () => {
    switch (config.palette) {
      case "dark":
        return "hsl(var(--background))";
      case "monochrome":
        return "hsl(220, 10%, 95%)";
      case "gradient":
        return "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(280, 75%, 60%) 100%)";
      default:
        return "hsl(0, 0%, 100%)";
    }
  };

  const getBlockColor = () => {
    const intensity = config.bold / 100;
    const baseHue = config.palette === "gradient" ? "320" : "220";
    return `hsla(${baseHue}, ${50 + intensity * 35}%, ${60 - intensity * 20}%, ${0.1 + intensity * 0.15})`;
  };

  const getAccentColor = () => {
    const intensity = config.bold / 100;
    return `hsla(var(--accent), ${intensity})`;
  };

  const blockCount = Math.floor(3 + (config.minimal / 100) * 9);

  const getPurposeLayout = () => {
    switch (config.purpose) {
      case "lead-generation":
        return (
          <>
            <motion.div
              layout
              className="col-span-2 h-48 rounded-lg border-2"
              style={{
                backgroundColor: getBlockColor(),
                borderColor: getAccentColor(),
              }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <div className="h-4 w-32 rounded bg-foreground/20" />
                <div className="h-8 w-48 rounded" style={{ backgroundColor: getAccentColor() }} />
              </div>
            </motion.div>
            <motion.div
              layout
              className="h-32 rounded-lg border"
              style={{ backgroundColor: getBlockColor(), borderColor: "hsl(var(--border))" }}
            />
            <motion.div
              layout
              className="h-32 rounded-lg border"
              style={{ backgroundColor: getBlockColor(), borderColor: "hsl(var(--border))" }}
            />
          </>
        );
      case "content-hub":
        return Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            layout
            className="h-32 rounded-lg border"
            style={{ backgroundColor: getBlockColor(), borderColor: "hsl(var(--border))" }}
          >
            <div className="p-4">
              <div className="mb-2 h-3 w-full rounded bg-foreground/10" />
              <div className="h-2 w-3/4 rounded bg-foreground/5" />
            </div>
          </motion.div>
        ));
      case "product-saas":
        return (
          <>
            <motion.div
              layout
              className="col-span-2 h-40 rounded-lg border-2"
              style={{
                backgroundColor: getBlockColor(),
                borderColor: getAccentColor(),
              }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="h-6 w-40 rounded" style={{ backgroundColor: getAccentColor() }} />
              </div>
            </motion.div>
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                layout
                className="h-32 rounded-lg border"
                style={{ backgroundColor: getBlockColor(), borderColor: "hsl(var(--border))" }}
              />
            ))}
          </>
        );
      case "service-portal":
        return (
          <>
            <motion.div
              layout
              className="col-span-2 h-32 rounded-lg border"
              style={{ backgroundColor: getBlockColor(), borderColor: "hsl(var(--border))" }}
            />
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                layout
                className="h-40 rounded-lg border-2"
                style={{
                  backgroundColor: getBlockColor(),
                  borderColor: i === 0 ? getAccentColor() : "hsl(var(--border))",
                }}
              >
                <div className="p-4">
                  <div className="mb-3 h-4 w-20 rounded bg-foreground/15" />
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-foreground/5" />
                    <div className="h-2 w-3/4 rounded bg-foreground/5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </>
        );
    }
  };

  const sizeMultiplier = config.siteSize === "lean" ? 0.8 : config.siteSize === "expanded" ? 1.2 : 1;

  return (
    <motion.div
      layout
      className="relative h-full w-full overflow-hidden rounded-2xl border shadow-card"
      style={{
        background: getBackgroundColor(),
      }}
    >
      <div className="absolute inset-0 p-8">
        <motion.div
          layout
          className="grid h-full gap-4"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gridAutoRows: "minmax(80px, auto)",
          }}
        >
          {getPurposeLayout()}

          {/* Feature pills */}
          {config.features.length > 0 && (
            <motion.div
              layout
              className="col-span-2 flex flex-wrap gap-2 p-4"
            >
              {config.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-full border px-3 py-1 text-xs font-extralight"
                  style={{
                    backgroundColor: getBlockColor(),
                    borderColor: getAccentColor(),
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Module indicators */}
          {config.modules.length > 0 && (
            <motion.div
              layout
              className="col-span-2 border-t pt-4"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <div className="flex flex-wrap gap-3">
                {config.modules.map((module, index) => (
                  <motion.div
                    key={module}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 10, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex h-20 w-20 items-center justify-center rounded-lg border text-center text-[10px] font-extralight"
                    style={{
                      backgroundColor: getBlockColor(),
                      borderColor: "hsl(var(--border))",
                    }}
                  >
                    {module}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Brand personality summary */}
        {(config.straightTalking !== 50 || config.analytical !== 50 || config.understated !== 50) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-8 left-8 right-8 rounded-lg border bg-background/80 p-4 backdrop-blur-sm"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="space-y-1 text-xs font-extralight text-muted-foreground">
              <p>
                {config.straightTalking > 50 ? "Straight-talking" : "Polished"}
                {" · "}
                {config.analytical > 50 ? "Analytical" : "Story-led"}
                {" · "}
                {config.understated > 50 ? "Understated" : "Showpiece"}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
