"use client";

import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import ServiceContactForm from "@/src/components/ServiceContactForm";
import { useTranslations } from "next-intl";

function CheckIcon({ className = "h-5 w-5 text-emerald-500" }: { className?: string }) {
  return (
    <svg className={`flex-none ${className}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

function MonitorIcon({ className = "h-6 w-6 text-emerald-600 dark:text-emerald-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="5" width="16" height="11" rx="2" />
      <path d="M9 20h6M12 16v4" strokeLinecap="round" />
      <path d="M8 10h2l1 2 2-4 1.5 2H16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ className = "h-6 w-6 text-emerald-600 dark:text-emerald-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3.5 19 6v5c0 4.4-3 7.8-7 9.5-4-1.7-7-5.1-7-9.5V6l7-2.5Z" strokeLinejoin="round" />
      <path d="m9.5 12 1.7 1.7 3.3-3.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendDownIcon({ className = "h-6 w-6 text-emerald-600 dark:text-emerald-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 5v14h16" strokeLinecap="round" />
      <path d="m6.5 9.5 4 4 3-3 4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LightBulbIcon({ className = "h-6 w-6 text-emerald-600 dark:text-emerald-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M9 18h6M10 21h4" strokeLinecap="round" />
      <path d="M8.5 14.5a7 7 0 1 1 7 0c-.9.6-1.5 1.4-1.8 2.5h-3.4c-.3-1.1-.9-1.9-1.8-2.5Z" strokeLinejoin="round" />
    </svg>
  );
}

const OVERVIEW_ICONS = [MonitorIcon, ShieldIcon, TrendDownIcon, LightBulbIcon] as const;

export default function ManagedITServicePage() {
  const t = useTranslations("Services.managedIT");
  const benefits = t.raw("benefits.items") as string[];

  // Retrieve raw arrays for other lists
  const overviewHighlights = t.raw("overview.highlights") as { label: string; icon: string }[];
  const securityItems = t.raw("security.items") as string[];
  const ctaItems = t.raw("cta.items") as string[];

  return (
    <div className="pb-20">

      {/* ── Hero ── */}
      <div className="relative pt-[8rem] pb-24 sm:pt-[9rem] sm:pb-28 overflow-hidden bg-white dark:bg-slate-950">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(0 0 0) 1px, transparent 1px), linear-gradient(to right, rgb(0 0 0) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-100 dark:bg-emerald-950/40 blur-3xl opacity-60 -z-10" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-teal-50 dark:bg-teal-950/30 blur-3xl opacity-60 -z-10" />
        {/* SVG abstract pattern */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full stroke-slate-900/[0.04] dark:stroke-white/[0.04] -z-10 [mask-image:radial-gradient(80%_80%_at_top_left,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="hero-pattern-managed-it" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#hero-pattern-managed-it)" />
        </svg>

        <Container className="relative">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </Container>
      </div>

      {/* ── Overview ── */}
      <section className="py-20 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl mb-6">
                {t("overview.title")}
              </h2>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                {t("overview.content")}
              </p>
            </div>
            {/* Stats / feature highlights */}
            <div className="grid grid-cols-2 gap-4">
              {overviewHighlights.map((item, idx) => {
                const Icon = OVERVIEW_ICONS[idx % OVERVIEW_ICONS.length];

                return (
                  <div key={item.label} className="flex flex-col gap-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 p-5 shadow-sm">
                    <Icon />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20">
        <Container>
          <div className="max-w-5xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl mb-4">
              {t("benefits.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-12 text-sm leading-7 max-w-2xl">
              Outsourcing IT management gives your team back the time and focus to drive core business goals.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-4 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 border border-slate-100 dark:border-white/10 hover:border-emerald-200 dark:hover:border-emerald-900 px-5 py-4 transition-all duration-200"
                >
                  <div className="flex-shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 group-hover:border-emerald-200 dark:group-hover:border-emerald-900 shadow-sm transition-colors">
                    <CheckIcon className="h-4 w-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-6">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Security ── */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.15),transparent)]" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-6">
                {t("security.title")}
              </h2>
              <p className="text-base leading-8 text-slate-300">
                {t("security.content")}
              </p>
            </div>
            {/* Feature list */}
            <div className="space-y-3">
              {securityItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 px-5 py-3.5">
                  <CheckIcon className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact" className="py-20 sm:py-28 bg-slate-900 text-white relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950" />
        <div className="pointer-events-none absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-emerald-900/20 blur-3xl -z-10" />

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-5">
                {t("cta.title")}
              </h2>
              <p className="text-base text-slate-300 mb-10 leading-7">
                {t("cta.subtitle")}
              </p>
              <ul className="space-y-3">
                {ctaItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-800/50">
                      <CheckIcon className="h-3.5 w-3.5 text-emerald-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-8">
              <ServiceContactForm preselectedService="managedIT" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
