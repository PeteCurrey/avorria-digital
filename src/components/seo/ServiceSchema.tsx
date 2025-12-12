import { Helmet } from "react-helmet-async";

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string[];
  priceRange?: string;
  image?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export const ServiceSchema = ({
  name,
  description,
  url,
  provider = "Avorria",
  areaServed = ["United Kingdom", "London", "Sheffield", "Manchester"],
  priceRange = "££££",
  image,
  aggregateRating,
}: ServiceSchemaProps) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: url.startsWith("http") ? url : `https://avorria.com${url}`,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://avorria.com",
    },
    areaServed: areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    priceRange,
  };

  if (image) {
    schema.image = image.startsWith("http") ? image : `https://avorria.com${image}`;
  }

  if (aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ServiceSchema;
