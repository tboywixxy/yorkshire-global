"use client";

import React from "react";
import Container from "@/src/components/Container";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 flex-none text-emerald-400"
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

function ServerIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

export default function ModernItSection() {
  const t = useTranslations("Home.modernIT");
  const locale = useLocale();

  const col1Points = t.raw("col1.points") as string[];
  const col2Points = t.raw("col2.points") as string[];

  return (
    <section className="relative py-28 overflow-hidden bg-white dark:bg-slate-950">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(0 0 0) 1px, transparent 1px), linear-gradient(to right, rgb(0 0 0) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Gradient blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-100 dark:bg-emerald-950/40 blur-3xl opacity-50 -z-10" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-100 dark:bg-indigo-950/40 blur-3xl opacity-50 -z-10" />

      <Container>
        {/* Section label + heading */}
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl leading-tight">
            {t("intro")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">

          {/* ── Column 1: Managed IT Support (light card) ── */}
          <div className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] ring-1 ring-slate-200 dark:ring-white/10 transition-shadow duration-300 hover:shadow-[0_8px_40px_-4px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_8px_40px_-4px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Accent bar */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-emerald-400 to-teal-400 rounded-t-2xl" />

            {/* Icon badge */}
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-100 dark:ring-emerald-900">
              <ServerIcon />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t("col1.title")}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 flex-grow">
              {t("col1.desc")}
            </p>

            <ul role="list" className="mt-8 space-y-2.5">
              {col1Points.map((point) => (
                <li key={point} className="flex items-center gap-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50">
                    <CheckIcon />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/services/managed-it-support`}
              className="mt-10 flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-5 py-3 text-sm font-semibold text-white dark:text-slate-900 shadow-sm transition-all duration-200 hover:bg-slate-700 dark:hover:bg-slate-100 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {t("col1.cta")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* ── Column 2: Secure AI (dark card) ── */}
          <div className="group relative flex flex-col rounded-2xl bg-slate-950 p-8 sm:p-10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_8px_40px_-4px_rgba(99,102,241,0.25)] overflow-hidden">
            {/* Radial glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.25),transparent)]" />
            {/* Accent bar */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-t-2xl" />
            {/* Subtle corner decoration */}
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-indigo-600/10 blur-2xl" />

            {/* Icon badge */}
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-950/80 text-indigo-400 ring-1 ring-indigo-800/50">
              <AIIcon />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-white">
              {t("col2.title")}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-400 flex-grow">
              {t("col2.desc")}
            </p>

            <ul role="list" className="mt-8 space-y-2.5">
              {col2Points.map((point) => (
                <li key={point} className="flex items-center gap-x-3 text-sm text-slate-300">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-indigo-950/80">
                    <CheckIcon />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/services/secure-ai-development`}
              className="mt-10 flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-400 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              {t("col2.cta")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}
