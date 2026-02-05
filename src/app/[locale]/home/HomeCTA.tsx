"use client";

import CTA from "@/src/components/CTA";
import { useTranslations, useLocale } from "next-intl";

export default function HomeCTA() {
  const t = useTranslations("Home");
  const locale = useLocale(); // ✅ get current locale

  return (
    <CTA
      title={t("cta.title")}
      subtitle={t("cta.subtitle")}
      buttonText={t("cta.button")}
      buttonHref={`/${locale}/contact`} // ✅ real template string (no quotes)
    />
  );
}
