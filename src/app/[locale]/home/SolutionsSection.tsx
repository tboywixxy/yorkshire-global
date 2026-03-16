"use client";

import React from "react";
import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 flex-none text-emerald-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const SOLUTION_ICONS = [
  // Cybersecurity - shield
  <svg key="cyber" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
  // AI - sparkles
  <svg key="ai" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>,
  // Digital transformation - arrow trending up
  <svg key="transform" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>,
];

const ACCENT_COLORS = [
  { badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 ring-emerald-100 dark:ring-emerald-900/50", icon: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400", bar: "from-emerald-400 to-teal-400", cta: "bg-emerald-600 hover:bg-emerald-500 text-white" },
  { badge: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 ring-indigo-100 dark:ring-indigo-900/50", icon: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400", bar: "from-indigo-400 to-violet-400", cta: "bg-indigo-600 hover:bg-indigo-500 text-white" },
  { badge: "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400 ring-sky-100 dark:ring-sky-900/50", icon: "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400", bar: "from-sky-400 to-cyan-400", cta: "bg-sky-600 hover:bg-sky-500 text-white" },
];

const SERVICE_SLUGS = ["cybersecurity", "secureAI", "strategy"];

export default function SolutionsSection() {
  const t = useTranslations("Home.solutions");
  const locale = useLocale();
  const items = t.raw("items") as any[];

  return (
    <section className="relative py-28 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/10 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/10 to-transparent" />
      </div>

      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {items.map((item: any, idx: number) => {
            const colors = ACCENT_COLORS[idx % ACCENT_COLORS.length];
            const icon = SOLUTION_ICONS[idx % SOLUTION_ICONS.length];

            return (
              <div
                key={idx}
                className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 p-8 ring-1 ring-slate-200 dark:ring-white/10 shadow-sm hover:shadow-xl dark:hover:shadow-[0_8px_40px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Top gradient accent bar */}
                <div className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r ${colors.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />

                {/* Icon */}
                <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${colors.icon} ${colors.badge.split(' ').slice(-2).join(' ')}`}>
                  {icon}
                </div>

                <h3 className="text-base font-bold leading-6 text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400 flex-grow">
                  {item.desc}
                </p>

                <ul className="mt-6 space-y-2">
                  {item.points.map((point: string) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/60">
                        <CheckIcon />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/contact?service=${SERVICE_SLUGS[idx]}`}
                  className={`mt-8 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors.cta}`}
                >
                  {item.cta}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
