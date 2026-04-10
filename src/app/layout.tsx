import type { Metadata } from "next";
import "@/index.css";
import { Providers } from "./providers";
import { Shell } from "./shell";

export const metadata: Metadata = {
  title: {
    default: "Avorria – Performance Digital Marketing Agency",
    template: "%s | Avorria",
  },
  description:
    "Avorria is a performance-driven digital marketing agency specialising in SEO, paid media, web design, and content marketing.",
  metadataBase: new URL("https://avorria.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-GB": "/",
      "en-US": "/",
      "en-AU": "/",
      "en-CA": "/",
      "en": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Avorria",
    locale: "en_GB",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "geo.region": "GB-DBY",
    "geo.placename": "Chesterfield",
    "geo.position": "53.2350;-1.4210",
    "ICBM": "53.2350, -1.4210",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
