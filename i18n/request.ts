// i18n/request.ts
import { getRequestConfig } from "next-intl/server";

export const SUPPORTED_LOCALES = ["en", "fr", "de", "zh"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(l: unknown): l is SupportedLocale {
  return typeof l === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(l);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const safeLocale: SupportedLocale = isSupportedLocale(locale) ? locale : "en";

  const nav = (await import(`../messages/${safeLocale}/nav.json`)).default;
  const contact = (await import(`../messages/${safeLocale}/contact.json`)).default;
  const footer = (await import(`../messages/${safeLocale}/footer.json`)).default;

  const home = (await import(`../messages/${safeLocale}/home.json`)).default;

  const caseStudies = (await import(`../messages/${safeLocale}/case-studies.json`)).default;
  const industries = (await import(`../messages/${safeLocale}/industries.json`)).default;
  const services = (await import(`../messages/${safeLocale}/services.json`)).default;
  const about = (await import(`../messages/${safeLocale}/about.json`)).default;

  return {
    locale: safeLocale,
    messages: {
      ...nav,
      ...contact,
      ...footer,

      ...home,

      ...caseStudies,
      ...industries,
      ...services,
      ...about,
    },
  };
});
