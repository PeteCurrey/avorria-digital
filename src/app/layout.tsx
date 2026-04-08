import type { Metadata } from "next";
import "@/index.css";
import { Providers } from "./providers";
import { Shell } from "./shell";

export const metadata: Metadata = {
  title: {
    default: "Avorria Digital — Performance Digital Marketing Agency",
    template: "%s | Avorria Digital",
  },
  description:
    "Avorria Digital is a performance-driven digital marketing agency specialising in SEO, paid media, web design, and content marketing.",
  metadataBase: new URL("https://avorria-digital.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "Avorria Digital",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
