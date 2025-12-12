import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  type?: "website" | "article" | "product" | "service";
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

const SITE_NAME = "Avorria";
const SITE_URL = "https://avorria.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const TWITTER_HANDLE = "@avorria";

export const SEOHead = ({
  title,
  description,
  canonical,
  type = "website",
  image = DEFAULT_IMAGE,
  imageAlt,
  keywords = [],
  author = "Avorria",
  publishedTime,
  modifiedTime,
  noindex = false,
  children,
}: SEOHeadProps) => {
  const fullTitle = title.includes("Avorria") ? title : `${title} | ${SITE_NAME}`;
  const fullCanonical = canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <meta name="author" content={author} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

      {/* Article specific */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && (
        <meta property="article:author" content={author} />
      )}

      {children}
    </Helmet>
  );
};

export default SEOHead;
