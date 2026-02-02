import { Helmet } from "react-helmet-async";

interface ServiceArea {
  name: string;
  type: "City" | "AdministrativeArea" | "Country" | "State";
  containedIn?: string;
}

interface ServiceAreaSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  areas?: ServiceArea[];
}

const defaultAreas: ServiceArea[] = [
  // Primary Markets - UK (HQ Region)
  { name: "Chesterfield", type: "City", containedIn: "Derbyshire" },
  { name: "Derby", type: "City", containedIn: "Derbyshire" },
  { name: "Derbyshire", type: "AdministrativeArea", containedIn: "England" },
  { name: "Nottingham", type: "City", containedIn: "Nottinghamshire" },
  { name: "Mansfield", type: "City", containedIn: "Nottinghamshire" },
  { name: "Leicester", type: "City", containedIn: "Leicestershire" },
  { name: "Sheffield", type: "City", containedIn: "South Yorkshire" },
  { name: "Leeds", type: "City", containedIn: "West Yorkshire" },
  { name: "Manchester", type: "City", containedIn: "Greater Manchester" },
  { name: "Birmingham", type: "City", containedIn: "West Midlands" },
  { name: "London", type: "City", containedIn: "Greater London" },
  { name: "United Kingdom", type: "Country" },
  // Secondary Markets
  { name: "United States", type: "Country" },
  { name: "Australia", type: "Country" },
  { name: "Canada", type: "Country" },
  { name: "New Zealand", type: "Country" },
];

export const ServiceAreaSchema = ({
  serviceName,
  serviceDescription,
  serviceUrl,
  areas = defaultAreas,
}: ServiceAreaSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl.startsWith("http") ? serviceUrl : `https://avorria.com${serviceUrl}`,
    provider: {
      "@type": "ProfessionalService",
      name: "Avorria",
      url: "https://avorria.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chesterfield",
        addressRegion: "Derbyshire",
        addressCountry: "GB",
      },
    },
    areaServed: areas.map((area) => ({
      "@type": area.type,
      name: area.name,
      ...(area.containedIn && {
        containedIn: {
          "@type": "AdministrativeArea",
          name: area.containedIn,
        },
      }),
    })),
    serviceType: serviceName,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ServiceAreaSchema;
