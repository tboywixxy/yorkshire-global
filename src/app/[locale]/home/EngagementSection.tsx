"use client";

import React from "react";
import Container from "@/src/components/Container";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const STEP_ICONS = [
  // Chat / consultation
  <svg key="chat" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>,
  // Magnifying glass / assessment
  <svg key="search" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
  </svg>,
  // Rocket / implementation
  <svg key="rocket" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>,
];

export default function EngagementSection() {
  const t = useTranslations("Home.engagement");
  const locale = useLocale();
  const steps = t.raw("steps") as any[];

  return (
    <section className="relative py-28 bg-white dark:bg-slate-950 overflow-hidden border-t border-slate-200 dark:border-white/10">
      {/* Subtle background lines */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-900/50 dark:to-slate-950" />
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Steps with connecting line on desktop */}
        <div className="relative mx-auto max-w-5xl">
          {/* Horizontal connector line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-[calc(16.66%+1.25rem)] right-[calc(16.66%+1.25rem)] h-px bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 dark:from-emerald-900 dark:via-emerald-700 dark:to-emerald-900" />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {steps.map((step: any, idx: number) => (
              <div key={idx} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* Step number + icon */}
                <div className="relative mb-6 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-white/10 shadow-md lg:shadow-sm">
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white shadow">
                    {idx + 1}
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400">
                    {STEP_ICONS[idx]}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-3 rounded-xl bg-slate-900 dark:bg-white px-7 py-3.5 text-sm font-semibold text-white dark:text-slate-900 shadow-sm transition-all duration-200 hover:bg-slate-700 dark:hover:bg-slate-100 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            {t("cta")}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
