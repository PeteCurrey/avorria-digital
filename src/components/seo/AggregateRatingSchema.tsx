
interface AggregateRatingSchemaProps {
  ratingValue?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
  itemReviewed?: {
    type: "Organization" | "LocalBusiness" | "Service";
    name: string;
    url?: string;
  };
}

export const AggregateRatingSchema = ({
  ratingValue = 4.9,
  reviewCount = 47,
  bestRating = 5,
  worstRating = 1,
  itemReviewed = {
    type: "Organization",
    name: "Avorria",
    url: "https://avorria.com",
  },
}: AggregateRatingSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": itemReviewed.type,
    name: itemReviewed.name,
    url: itemReviewed.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: bestRating.toString(),
      worstRating: worstRating.toString(),
    },
  };

  return (
    
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    
  );
};

export default AggregateRatingSchema;
