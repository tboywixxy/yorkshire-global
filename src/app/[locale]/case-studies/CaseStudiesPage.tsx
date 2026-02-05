// src/app/[locale]/case-studies/CaseStudiesPage.tsx
"use client";

import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import CTA from "@/src/components/CTA";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const HERO_URL =
  "https://images.unsplash.com/photo-1732304719348-1fcdf2500966?auto=format&fit=crop&w=2400&q=80";

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 22, mass: 0.9 }
  }
};

export default function CaseStudiesPage() {
  const t = useTranslations("CaseStudies");

  // ✅ build the case studies from translations (keeps it simple to maintain)
  const cases = [
    {
      title: t("cases.0.title"),
      body: t("cases.0.body"),
      result: t("cases.0.result"),
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1800&q=80"
    },
    {
      title: t("cases.1.title"),
      body: t("cases.1.body"),
      result: t("cases.1.result"),
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1800&q=80"
    },
    {
      title: t("cases.2.title"),
      body: t("cases.2.body"),
      result: t("cases.2.result"),
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80"
    }
  ];

  return (
    <>
      {/* HERO */}
      <section className="-mt-14" aria-label={t("hero.ariaLabel")}>
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <div className="relative h-[44vh] min-h-[360px] w-full">
            <Image
              src={HERO_URL}
              alt={t("hero.imageAlt")}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_30%]"
            />

            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-4 z-20">
              <Container>
                <motion.span
                  className="inline-block select-none text-sm sm:text-base font-serif font-semibold text-white/90 tracking-wide"
                  initial={false}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.7 }}
                >
                  {t("hero.kicker")}
                </motion.span>
              </Container>
            </div>

            <div className="relative z-10 h-full pt-14" />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 sm:py-14 section-tint" aria-label={t("content.ariaLabel")}>
        <Container>
          <SectionHeading title={t("content.headingTitle")} subtitle={t("content.headingSubtitle")} />

          <motion.div
            className="mt-8 grid gap-6 lg:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
          >
            {cases.map((c) => (
              <motion.article
                key={c.title}
                className="card-img"
                variants={cardVariants}
                aria-label={c.title}
              >
                <div className="card-img__media relative">
                  <Image
                    src={c.image}
                    alt={t("card.imageAlt", { title: c.title })}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="card-img__photo object-cover"
                  />
                  <div className="card-img__overlay" />
                  <div className="absolute left-4 top-4">
                    <span className="chip">{t("card.chip")}</span>
                  </div>
                </div>

                <div className="card-body">
                  <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">{c.title}</h2>

                  <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{c.body}</p>

                  <div className="mt-5 border-t border-[rgb(var(--border))] pt-4">
                    <p className="text-xs font-semibold text-[rgb(var(--foreground))]">
                      {t("card.outcomeLabel")}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[rgb(var(--foreground))]">
                      {c.result}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <CTA title={t("cta.title")} subtitle={t("cta.subtitle")} buttonHref="contact" />
    </>
  );
}
