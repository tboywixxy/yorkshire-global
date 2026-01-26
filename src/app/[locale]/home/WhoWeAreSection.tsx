// src/app/[locale]/WhoWeAreSection.tsx
"use client";

import React, { useMemo } from "react";
import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import { useTranslations } from "next-intl";

export default function WhoWeAreSection() {
  const t = useTranslations("Home");

  const cards = useMemo(
    () => [
      {
        title: t("who.cards.0.title"),
        text: t("who.cards.0.text"),
        img: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: t("who.cards.1.title"),
        text: t("who.cards.1.text"),
        img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: t("who.cards.2.title"),
        text: t("who.cards.2.text"),
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    [t]
  );

  return (
    <section className="-mt-[35px] py-14 sm:-mt-[45px] sm:py-16 relative z-30" aria-label={t("who.aria.section")}>
      <Container>
        <SectionHeading title={t("who.headingTitle")} subtitle={t("who.headingSubtitle")} />

        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((c) => (
            <article key={c.title} className="card-img">
              <div className="card-img__media">
                <img src={c.img} alt={t("who.cardAlt", { title: c.title })} className="card-img__photo" loading="lazy" />
                <div className="card-img__overlay" />
              </div>
              <div className="card-body">
                <p className="text-sm font-semibold">{c.title}</p>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
