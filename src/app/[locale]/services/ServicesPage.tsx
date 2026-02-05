// src/app/[locale]/services/ServicesPage.tsx
"use client";

import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import CTA from "@/src/components/CTA";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const HERO_URL =
  "https://images.unsplash.com/photo-1629904869753-e8cb289490bd?auto=format&fit=crop&w=2400&q=80";

type Service = {
  title: string;
  body: string;
  outcome: string;
};

function Spinner({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-10"
      role="status"
      aria-live="polite"
    >
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-[rgb(var(--border))] border-t-[rgb(var(--foreground))]" />
      <p className="text-xs text-[rgb(var(--muted))]">{label}</p>
    </div>
  );
}

function DeliveryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 7L10.5 16.5L4 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3H15L19 7V21H7V3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M15 3V7H19" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function ServicesPage() {
  const t = useTranslations("Services");

  const services: Service[] = useMemo(
    () => [
      {
        title: t("services.0.title"),
        body: t("services.0.body"),
        outcome: t("services.0.outcome"),
      },
      {
        title: t("services.1.title"),
        body: t("services.1.body"),
        outcome: t("services.1.outcome"),
      },
      {
        title: t("services.2.title"),
        body: t("services.2.body"),
        outcome: t("services.2.outcome"),
      },
      {
        title: t("services.3.title"),
        body: t("services.3.body"),
        outcome: t("services.3.outcome"),
      },
      {
        title: t("services.4.title"),
        body: t("services.4.body"),
        outcome: t("services.4.outcome"),
      },
    ],
    [t]
  );

  const [active, setActive] = useState<Service>(services[0]);
  const [selectedTitle, setSelectedTitle] = useState<string>(services[0].title);

  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // When locale changes, the translated strings change too — re-sync selection safely.
    setActive(services[0]);
    setSelectedTitle(services[0].title);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]); // re-run on locale/messages change

  const handleSelect = (s: Service) => {
    if (s.title === selectedTitle) return;

    setSelectedTitle(s.title);
    setIsLoading(true);

    if (timerRef.current) window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setActive(s);
      setIsLoading(false);
    }, 650);
  };

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
              className="object-cover object-[center_15%]"
            />

            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-8 z-20">
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
      <section
        className="relative overflow-hidden pt-12 pb-16 sm:pt-14 sm:pb-20"
        aria-label={t("content.ariaLabel")}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950" />
          <div className="absolute inset-0 opacity-90 dark:opacity-70 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(34,211,238,0.30),transparent_60%),radial-gradient(860px_520px_at_85%_18%,rgba(99,102,241,0.26),transparent_62%),radial-gradient(820px_500px_at_75%_85%,rgba(236,72,153,0.18),transparent_62%),radial-gradient(760px_520px_at_18%_85%,rgba(16,185,129,0.14),transparent_64%)]" />

          <motion.div
            className="absolute -left-1/3 top-24 h-24 w-[160%] rotate-[-6deg] opacity-25 dark:opacity-15"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(56,189,248,0.35), rgba(99,102,241,0.35), rgba(236,72,153,0.28), transparent)",
            }}
            initial={false}
            animate={{ x: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.svg
            className="absolute -bottom-44 right-[-240px] h-[600px] w-[900px] opacity-65 dark:opacity-40"
            viewBox="0 0 900 600"
            fill="none"
            initial={false}
            animate={{
              x: [0, -14, 0, 14, 0],
              y: [0, 12, 0, -12, 0],
              rotate: [0, -0.8, 0, 0.6, 0],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M120 420C160 260 290 170 430 160C580 150 640 80 760 130C880 182 910 360 820 470C710 606 510 610 360 560C210 510 80 580 120 420Z"
              fill="rgb(var(--primary))"
              fillOpacity="0.22"
            />
          </motion.svg>
        </div>

        <Container>
          <SectionHeading title={t("content.headingTitle")} subtitle={t("content.headingSubtitle")} />

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
            <aside className="lg:col-span-4">
              <div className="border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm">
                <div className="border-b border-[rgb(var(--border))] p-5">
                  <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                    {t("list.title")}
                  </p>
                  <p className="mt-1 text-sm text-[rgb(var(--muted))]">{t("list.subtitle")}</p>
                </div>

                <ul className="p-2" aria-label={t("list.ariaLabel")}>
                  {services.map((s) => {
                    const selected = selectedTitle === s.title;

                    return (
                      <li key={s.title}>
                        <button
                          type="button"
                          onClick={() => handleSelect(s)}
                          aria-pressed={selected}
                          aria-label={t("list.itemAria", { title: s.title })}
                          className={[
                            "w-full text-left px-4 py-3 transition-all",
                            "cursor-pointer select-none border",
                            "border-transparent",
                            "hover:bg-[color-mix(in_srgb,rgb(var(--card))_82%,transparent)]",
                            "active:scale-[0.99]",
                            selected
                              ? "bg-[color-mix(in_srgb,rgb(var(--primary))_10%,transparent)] border-[rgb(var(--border))]"
                              : "",
                          ].join(" ")}
                        >
                          <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{s.title}</p>
                          <p className="mt-1 text-xs text-[rgb(var(--muted))]">{t("list.viewDetails")}</p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="relative border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm overflow-hidden">
                <div className="border-b border-[rgb(var(--border))] p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="chip">{t("detail.chip")}</span>
                    <span className="text-xs text-[rgb(var(--muted))]">{t("detail.kicker")}</span>
                  </div>

                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-[rgb(var(--foreground))] sm:text-2xl">
                    {active.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base">
                    {active.body}
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="border-l-2 border-[rgb(var(--border))] pl-4">
                    <p className="text-xs font-semibold text-[rgb(var(--muted))]">
                      {t("detail.outcomeLabel")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[rgb(var(--foreground))] sm:text-base">
                      {active.outcome}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a href="/contact" className="btn btn-primary">
                      {t("detail.ctaPrimary")}
                    </a>
                    <a href="/case-studies" className="btn btn-ghost">
                      {t("detail.ctaSecondary")}
                    </a>
                  </div>
                </div>

                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[rgb(var(--card))]/85 backdrop-blur-sm">
                    <Spinner label={t("loading")} />
                  </div>
                ) : null}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { k: t("highlights.0.k"), icon: <DeliveryIcon />, v: t("highlights.0.v") },
                  { k: t("highlights.1.k"), icon: <ShieldIcon />, v: t("highlights.1.v") },
                  { k: t("highlights.2.k"), icon: <DocsIcon />, v: t("highlights.2.v") },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="border border-[rgb(var(--border))] bg-[color-mix(in_srgb,rgb(var(--card))_92%,transparent)] p-5 shadow-sm text-center flex flex-col items-center"
                  >
                    <p className="text-xs font-semibold text-[rgb(var(--muted))]">{x.k}</p>
                    <div className="mt-3 text-[rgb(var(--foreground))] opacity-85">{x.icon}</div>
                    <p className="mt-3 text-sm font-semibold text-[rgb(var(--foreground))]">{x.v}</p>
                  </div>
                ))}
              </div>
            </div>
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

      <CTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        buttonText={t("cta.buttonText")}
        buttonHref="contact"
      />
    </>
  );
}
