import { Helmet } from "react-helmet-async";

const SITE_URL = "https://xarkaai.com";
const DEFAULT_TITLE = "Xarka | Enterprise Intelligence for Legal Operations";
const DEFAULT_DESCRIPTION =
  "Xarka delivers sovereign AI infrastructure and production-ready legal platforms for firms and in-house teams that require control, security, and measurable outcomes.";
const DEFAULT_IMAGE = `${SITE_URL}/xarka_logo.png`;

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

const normalizePath = (path = "/") => (path.startsWith("/") ? path : `/${path}`);

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  type = "website",
  noIndex = false,
  structuredData,
}: SEOProps) => {
  const canonicalUrl = `${SITE_URL}${normalizePath(path)}`;
  const robots = noIndex ? "noindex, nofollow, noarchive" : "index, follow";
  const schema = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {schema.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL };
export default SEO;
