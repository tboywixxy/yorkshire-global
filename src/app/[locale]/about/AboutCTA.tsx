"use client";

import CTA from "@/src/components/CTA";
import { useTranslations } from "next-intl";

export default function AboutCTA() {
  const t = useTranslations("About");

  return (
    <CTA
      title={t("cta.title")}
      subtitle={t("cta.subtitle")}
      buttonText={t("cta.buttonText", { default: "Contact Us" } as any)}
      buttonHref="contact"
    />
  );
}
