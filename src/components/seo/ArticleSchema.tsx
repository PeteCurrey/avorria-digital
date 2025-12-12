import { Helmet } from "react-helmet-async";

interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  publisher?: string;
}

export const ArticleSchema = ({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = "Avorria",
  publisher = "Avorria",
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: url.startsWith("http") ? url : `https://avorria.com${url}`,
    image: image ? (image.startsWith("http") ? image : `https://avorria.com${image}`) : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
      url: "https://avorria.com",
    },
    publisher: {
      "@type": "Organization",
      name: publisher,
      url: "https://avorria.com",
      logo: {
        "@type": "ImageObject",
        url: "https://avorria.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `https://avorria.com${url}`,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ArticleSchema;
