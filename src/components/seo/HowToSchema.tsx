
interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration format, e.g., "PT30M" for 30 minutes
  estimatedCost?: {
    currency: string;
    value: string;
  };
}

export const HowToSchema = ({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
}: HowToSchemaProps) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };

  if (totalTime) {
    schema.totalTime = totalTime;
  }

  if (estimatedCost) {
    schema.estimatedCost = {
      "@type": "MonetaryAmount",
      currency: estimatedCost.currency,
      value: estimatedCost.value,
    };
  }

  return (
    
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    
  );
};

export default HowToSchema;
