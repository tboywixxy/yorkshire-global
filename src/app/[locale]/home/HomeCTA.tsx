"use client";

import CTA from "@/src/components/CTA";
import { useTranslations } from "next-intl";

export default function HomeCTA() {
  const t = useTranslations("Home");

  return (
    <CTA
      title={t("cta.title")}
      subtitle={t("cta.subtitle")}
      buttonText={t("cta.button")}
      buttonHref="/contact"
    />
  );
}
