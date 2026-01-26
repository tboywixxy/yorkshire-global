import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "fr", "de", "zh"] as const;
export const localePrefix = "always";

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  localePrefix
});
