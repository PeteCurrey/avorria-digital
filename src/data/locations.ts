import { Location } from "@/types/landingPage";

export const locations: Location[] = [
  {
    id: "london",
    city: "London",
    country: "United Kingdom",
    slug: "london",
    isPrimaryMarket: true,
  },
  {
    id: "manchester",
    city: "Manchester",
    country: "United Kingdom",
    slug: "manchester",
    isPrimaryMarket: true,
  },
  {
    id: "birmingham",
    city: "Birmingham",
    country: "United Kingdom",
    slug: "birmingham",
    isPrimaryMarket: true,
  },
  {
    id: "bristol",
    city: "Bristol",
    country: "United Kingdom",
    slug: "bristol",
    isPrimaryMarket: false,
  },
  {
    id: "leeds",
    city: "Leeds",
    country: "United Kingdom",
    slug: "leeds",
    isPrimaryMarket: false,
  },
];

export const getLocationBySlug = (slug: string): Location | undefined => {
  return locations.find((l) => l.slug === slug);
};
