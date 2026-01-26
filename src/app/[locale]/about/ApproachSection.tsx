// src/app/[locale]/about/ApproachSection.tsx
"use client";

import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import { useTranslations } from "next-intl";

export default function ApproachSection() {
  const t = useTranslations("About");

  const points = [
    t("approach.points.0"),
    t("approach.points.1"),
    t("approach.points.2"),
    t("approach.points.3"),
  ];

  const stepLabel = (idx: number) =>
    idx === 0 ? t("approach.steps.0") : idx === 1 ? t("approach.steps.1") : idx === 2 ? t("approach.steps.2") : t("approach.steps.3");

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 section-tint">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[rgb(var(--background))]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgb(var(--background))]/10 to-[rgb(var(--background))]/55" />
      </div>

      <Container>
        <SectionHeading title={t("approach.headingTitle")} subtitle={t("approach.headingSubtitle")} />

        <div className="mt-8 border border-[rgb(var(--border))] bg-[rgb(var(--card))]/90 backdrop-blur-md p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{t("approach.boxTitle")}</p>
              <p className="mt-1 text-sm text-[rgb(var(--muted))]">{t("approach.boxSubtitle")}</p>
            </div>

            <div className="border border-[rgb(var(--border))] bg-[color-mix(in_srgb,rgb(var(--card))_85%,transparent)] px-4 py-2 text-xs text-[rgb(var(--muted))]">
              {t("approach.badge")}
            </div>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {points.map((text, idx) => (
              <li
                key={idx}
                className="group border border-[rgb(var(--border))] bg-[color-mix(in_srgb,rgb(var(--card))_92%,transparent)] p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-2">
                    <p className="text-xs font-semibold text-[rgb(var(--foreground))]">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{stepLabel(idx)}</p>
                    <p className="mt-1 text-sm text-[rgb(var(--muted))]">{text}</p>
                  </div>
                </div>

                <div className="mt-4 h-px w-full bg-[rgb(var(--border))] opacity-40 transition-opacity group-hover:opacity-70" />
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="block h-[90px] w-full" preserveAspectRatio="none">
          <path
            d="M0,64 C240,120 480,20 720,64 C960,108 1200,120 1440,64 L1440,120 L0,120 Z"
            fill="rgb(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
