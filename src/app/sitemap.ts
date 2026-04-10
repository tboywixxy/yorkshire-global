import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yorkshireglobal.ca";

  // List of all path segments for your site
  const paths = [
    "",
    "/about",
    "/services",
    "/industries",
    "/case-studies",
    "/contact",
  ];

  // List of locales supported by your routing
  const locales = ["en", "fr", "de", "zh"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate localized URLs for each path
  for (const locale of locales) {
    for (const path of paths) {
      // Construct the full URL: e.g. https://yorkshireglobal.ca/en/services
      const url = `${baseUrl}/${locale}${path}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1.0 : 0.8,
      });
    }
  }

  // Also include root URLs if you want them to be crawled (they will redirect based on middleware)
  // But usually sitemaps should point to canonical, final URLs.
  // With localePrefix: 'always', the canonical URLs include the locale.

  return sitemapEntries;
}

