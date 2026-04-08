
interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  openingHours?: string[];
  priceRange?: string;
  image?: string;
  sameAs?: string[];
}

const defaultData: LocalBusinessSchemaProps = {
  name: "Avorria",
  description: "Performance-first digital marketing agency specialising in SEO, paid media, web design, and analytics for B2B and service businesses. Headquartered in Chesterfield, Derbyshire with clients across the UK and internationally.",
  url: "https://avorria.com",
  telephone: "+44 1onal 234 5678",
  email: "hello@avorria.com",
  address: {
    streetAddress: "Innovation Centre",
    addressLocality: "Chesterfield",
    addressRegion: "Derbyshire",
    postalCode: "S41 7QJ",
    addressCountry: "GB",
  },
  geo: {
    latitude: 53.2350,
    longitude: -1.4210,
  },
  openingHours: [
    "Mo-Fr 09:00-17:30",
  ],
  priceRange: "££££",
  image: "https://avorria.com/og-image.jpg",
  sameAs: [
    "https://www.linkedin.com/company/avorria",
    "https://twitter.com/avorria",
    "https://www.instagram.com/avorria",
  ],
};

export const LocalBusinessSchema = (props: LocalBusinessSchemaProps = {}) => {
  const data = { ...defaultData, ...props };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${data.url}/#organization`,
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    email: data.email,
    image: data.image,
    priceRange: data.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address?.streetAddress,
      addressLocality: data.address?.addressLocality,
      addressRegion: data.address?.addressRegion,
      postalCode: data.address?.postalCode,
      addressCountry: data.address?.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: data.geo?.latitude,
      longitude: data.geo?.longitude,
    },
    openingHoursSpecification: data.openingHours?.map((hours) => {
      const [days, time] = hours.split(" ");
      const [opens, closes] = time?.split("-") || ["09:00", "18:00"];
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days?.split("-").map((d) => {
          const dayMap: Record<string, string> = {
            Mo: "Monday",
            Tu: "Tuesday",
            We: "Wednesday",
            Th: "Thursday",
            Fr: "Friday",
            Sa: "Saturday",
            Su: "Sunday",
          };
          return dayMap[d] || d;
        }),
        opens,
        closes,
      };
    }),
    sameAs: data.sameAs,
    // Additional service-specific fields
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Derbyshire",
      },
      {
        "@type": "City",
        name: "Chesterfield",
      },
      {
        "@type": "City",
        name: "Derby",
      },
      {
        "@type": "City",
        name: "Nottingham",
      },
      {
        "@type": "City",
        name: "Sheffield",
      },
      {
        "@type": "City",
        name: "Manchester",
      },
      {
        "@type": "City",
        name: "Birmingham",
      },
      {
        "@type": "City",
        name: "London",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO Services",
            description: "Technical SEO, content strategy and organic search growth",
            url: "https://avorria.com/services/seo",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Paid Media",
            description: "PPC and social advertising campaigns with clear ROAS targets",
            url: "https://avorria.com/services/paid-media",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design & Development",
            description: "Conversion-focused websites built on modern stack",
            url: "https://avorria.com/web-design",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Analytics & Tracking",
            description: "GA4 setup, tracking implementation and dashboard creation",
            url: "https://avorria.com/services/analytics",
          },
        },
      ],
    },
  };

  return (
    
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    
  );
};

export default LocalBusinessSchema;
