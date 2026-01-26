// src/app/[locale]/about/MissionVisionValuesSection.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import SectionDivider from "@/src/components/SectionDivider";
import { useTranslations } from "next-intl";

type ValueItem = {
  title: string;
  body: string;
};

function ValuesSlider({
  items,
  ui,
}: {
  items: ValueItem[];
  ui: {
    title: string;
    subtitle: string;
    prevAria: string;
    nextAria: string;
    dotAria: (title: string) => string;
  };
}) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  const active = items[index];

  return (
    <div className="mt-10 border-t border-[rgb(var(--border))] pt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{ui.title}</p>
          <p className="mt-1 text-xs text-[rgb(var(--muted))]">{ui.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label={ui.prevAria}
            className="inline-flex h-9 w-9 items-center justify-center border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--foreground))] hover:opacity-80"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label={ui.nextAria}
            className="inline-flex h-9 w-9 items-center justify-center border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--foreground))] hover:opacity-80"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden">
        <motion.div
          key={active.title}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) next();
            if (info.offset.x > 60) prev();
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="border border-[rgb(var(--border))] bg-[color-mix(in_srgb,rgb(var(--background))_96%,rgb(var(--primary))_4%)] p-6"
        >
          <p className="text-base font-semibold text-[rgb(var(--foreground))]">{active.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">{active.body}</p>
        </motion.div>

        <div className="mt-4 flex items-center gap-2">
          {items.map((v, i) => {
            const isActive = i === index;
            return (
              <button
                key={v.title}
                aria-label={ui.dotAria(v.title)}
                onClick={() => setIndex(i)}
                className={[
                  "h-2.5 rounded-full transition-all",
                  isActive
                    ? "w-8 bg-[rgb(var(--primary))]"
                    : "w-2.5 bg-black/20 dark:bg-white/25 hover:opacity-80",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MissionVisionValuesSection() {
  const t = useTranslations("About");

  const values = useMemo<ValueItem[]>(
    () => [
      { title: t("mvv.values.0.title"), body: t("mvv.values.0.body") },
      { title: t("mvv.values.1.title"), body: t("mvv.values.1.body") },
      { title: t("mvv.values.2.title"), body: t("mvv.values.2.body") },
      { title: t("mvv.values.3.title"), body: t("mvv.values.3.body") },
      { title: t("mvv.values.4.title"), body: t("mvv.values.4.body") },
    ],
    [t]
  );

  return (
    <section className="section-tint">
      <Container>
        <div className="py-14 sm:py-16">
          <SectionHeading title={t("mvv.headingTitle")} subtitle={t("mvv.headingSubtitle")} />

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Mission */}
            <div className="border-l-2 border-[rgb(var(--primary))] pl-5 lg:col-start-1 lg:row-start-1">
              <p className="text-xs font-semibold tracking-widest text-[rgb(var(--muted))]">
                {t("mvv.missionLabel")}
              </p>
              <p className="mt-3 text-xl font-semibold leading-snug text-[rgb(var(--foreground))] sm:text-2xl">
                {t("mvv.missionText")}
              </p>
            </div>

            {/* Vision */}
            <div className="border-l-2 border-[rgb(var(--accent))] pl-5 lg:col-start-2 lg:row-start-2 lg:text-right lg:border-l-0 lg:border-r-2 lg:pr-5">
              <p className="text-xs font-semibold tracking-widest text-[rgb(var(--muted))]">
                {t("mvv.visionLabel")}
              </p>
              <p className="mt-3 text-xl font-semibold leading-snug text-[rgb(var(--foreground))] sm:text-2xl">
                {t("mvv.visionText")}
              </p>
            </div>
          </div>

          <ValuesSlider
            items={values}
            ui={{
              title: t("mvv.valuesTitle"),
              subtitle: t("mvv.valuesSubtitle"),
              prevAria: t("mvv.prevAria"),
              nextAria: t("mvv.nextAria"),
              dotAria: (title) => t("mvv.dotAria", { title }),
            }}
          />
        </div>
      </Container>

      <div className="relative -mb-1">
        <SectionDivider className="h-[64px] sm:h-[80px] md:h-[92px]" />
      </div>
    </section>
  );
}
