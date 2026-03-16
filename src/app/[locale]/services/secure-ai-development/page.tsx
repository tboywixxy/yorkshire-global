"use client";

import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import { useTranslations } from "next-intl";
import ServiceContactForm from "@/src/components/ServiceContactForm";

function CheckIcon({ className = "h-4 w-4 text-indigo-400" }: { className?: string }) {
  return (
    <svg className={`flex-none ${className}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

const SECTIONS = [
  { key: "strategy", icon: "🎯", accent: "indigo" },
  { key: "design", icon: "⚡", accent: "violet" },
] as const;

export default function SecureAIServicePage() {
  const t = useTranslations("Services.secureAI");

  const strategyItems = t.raw("strategy.items") as { label: string; icon: string }[];
  const designItems = t.raw("design.items") as string[];
  const governanceItems = t.raw("governance.items") as string[];
  const integrationItems = t.raw("integration.items") as { label: string; icon: string }[];

  return (
    <div className="pb-20">

      {/* ── Hero ── */}
      <div className="relative pt-[8rem] pb-24 sm:pt-[9rem] sm:pb-28 overflow-hidden bg-slate-950">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-indigo-950/60 via-slate-950 to-violet-950/30" />
        {/* Radial glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        {/* Grid pattern */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full stroke-white/[0.05] -z-10 [mask-image:radial-gradient(80%_80%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="hero-pattern-secure-ai" width={40} height={40} patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" strokeWidth={1} fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#hero-pattern-secure-ai)" />
        </svg>

        <Container className="relative">
          <SectionHeading
            title={t("title")}
            subtitle={t("subtitle")}
            className="text-white"
            subtitleClassName="!text-slate-300"
          />
        </Container>
      </div>

      {/* ── Strategy ── */}
      <section className="py-20 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl mb-6">
                {t("strategy.title")}
              </h2>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                {t("strategy.content")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {strategyItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 p-5 shadow-sm">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Secure Design ── */}
      <section className="py-20">
        <Container>
          <div className="max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl mb-6">
                  {t("design.title")}
                </h2>
                <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                  {t("design.content")}
                </p>
              </div>
              <div className="space-y-3">
                {designItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-5 py-4">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900">
                      <CheckIcon className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Governance (dark) ── */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.18),transparent)]" />
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
                {t("governance.title")}
              </h2>
              <p className="text-base leading-8 text-slate-300">
                {t("governance.content")}
              </p>
            </div>
            <div className="space-y-3">
              {governanceItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 px-5 py-3.5">
                  <CheckIcon className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Integration ── */}
      <section className="py-20 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/10">
        <Container>
          <div className="max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl mb-6">
                  {t("integration.title")}
                </h2>
                <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                  {t("integration.content")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {integrationItems.map((item) => (
                  <div key={item.label} className="flex flex-col gap-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 p-5 shadow-sm">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact" className="py-20 sm:py-28 bg-slate-950 text-white relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950" />
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-indigo-900/20 blur-3xl -z-10" />

        <Container>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-5">
              {t("cta.title")}
            </h2>
            <p className="text-base text-slate-300 leading-7">
              {t("cta.subtitle")}
            </p>
          </div>
          <div className="max-w-xl mx-auto rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-8">
            <ServiceContactForm preselectedService="secureAI" />
          </div>
        </Container>
      </section>
    </div>
  );
}
