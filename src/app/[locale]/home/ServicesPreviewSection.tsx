// src/app/[locale]/ServicesPreviewSection.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import SectionDivider from "@/src/components/SectionDivider";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

type ServiceItem = {
  title: string;
  detail: string;
};

export default function ServicesPreviewSection() {
  const t = useTranslations("Home");
  const locale = useLocale();

  const services: ServiceItem[] = useMemo(
    () => [
      { title: t("services.items.0.title"), detail: t("services.items.0.detail") },
      { title: t("services.items.1.title"), detail: t("services.items.1.detail") },
      { title: t("services.items.2.title"), detail: t("services.items.2.detail") },
      { title: t("services.items.3.title"), detail: t("services.items.3.detail") },
      { title: t("services.items.4.title"), detail: t("services.items.4.detail") },
    ],
    [t]
  );

  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <section className="relative py-14 sm:py-16 section-tint overflow-hidden" aria-label={t("services.aria.section")}>
      <Container>
        <SectionHeading title={t("services.headingTitle")} subtitle={t("services.headingSubtitle")} />

        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => {
            const isOpen = openSet.has(idx);

            return (
              <div key={s.title} className="card-simple overflow-hidden self-start h-fit">
                <div className="p-6 flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold">{s.title}</p>

                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-label={isOpen ? t("services.aria.collapse", { title: s.title }) : t("services.aria.expand", { title: s.title })}
                    aria-expanded={isOpen}
                    className="shrink-0"
                  >
                    <motion.span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1"
                      style={{
                        background: "color-mix(in srgb, rgb(var(--card)) 85%, transparent)",
                        color: "rgb(var(--foreground))",
                        // @ts-ignore
                        "--tw-ring-color": "color-mix(in srgb, rgb(var(--border)) 80%, transparent)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={isOpen ? "minus" : "plus"}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="text-lg leading-none select-none"
                        >
                          {isOpen ? "−" : "+"}
                        </motion.span>
                      </AnimatePresence>
                    </motion.span>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden px-6 pb-6 -mt-2"
                    >
                      <p className="text-sm text-[rgb(var(--muted))]">{s.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Link href={`/${locale}/services`} className="btn btn-primary">
            {t("services.exploreBtn")}
          </Link>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <SectionDivider className="h-[72px] sm:h-[90px] md:h-[100px]" />
      </div>

      <div className="h-[72px] sm:h-[90px] md:h-[100px]" />
    </section>
  );
}
