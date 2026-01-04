// app/services/ServicesPage.tsx
"use client";

import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import CTA from "@/src/components/CTA";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type Service = {
  title: string;
  body: string;
  outcome: string;
};

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10" role="status" aria-live="polite">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-[rgb(var(--border))] border-t-[rgb(var(--foreground))]" />
      <p className="text-xs text-[rgb(var(--muted))]">Loading service details…</p>
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
  const services: Service[] = useMemo(
    () => [
      {
        title: "Secure Software Development Lifecycle (SSDLc)",
        body:
          "We help organizations integrate security into every stage of software development. Our services include secure coding practices, threat modeling, code reviews, DevSecOps integration, secure architecture guidance, and full SSDLc program setup.",
        outcome: "Outcome: Stronger applications built with security at their core.",
      },
      {
        title: "Cybersecurity Services",
        body:
          "We support organizations in strengthening their cybersecurity posture through risk and vulnerability assessments, security policy development, cloud and infrastructure security review, governance and compliance support, incident readiness planning, and security awareness training.",
        outcome:
          "Outcome: Reduced risk, improved resilience, and better security governance.",
      },
      {
        title: "Business Analysis",
        body:
          "We translate business needs into clear requirements that drive successful projects. Services include requirements gathering, process and workflow analysis, gap assessments, process improvement, documentation (BRDs, FRDs, use cases, user stories), and stakeholder management.",
        outcome: "Outcome: Greater clarity, reduced rework, and smoother execution.",
      },
      {
        title: "Project Management",
        body:
          "Our project managers help organizations deliver initiatives with structure and discipline. Services include full lifecycle management, PMO setup, Agile/Waterfall/Hybrid delivery, scheduling, resource planning, risk/issue management, vendor coordination, and project recovery.",
        outcome:
          "Outcome: Projects delivered on time, within budget, and aligned to goals.",
      },
      {
        title: "Business & Strategy Consulting",
        body:
          "We help organizations strengthen operations and prepare for growth. Services include strategic planning, operational improvement, digital transformation guidance, change management, business continuity planning, and performance measurement frameworks.",
        outcome:
          "Outcome: Better decisions, stronger operations, and sustainable performance.",
      },
    ],
    []
  );

  const [active, setActive] = useState<Service>(services[0]);
  const [selectedTitle, setSelectedTitle] = useState<string>(services[0].title);

  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleSelect = (s: Service) => {
    if (s.title === selectedTitle) return;

    setSelectedTitle(s.title);
    setIsLoading(true);

    if (timerRef.current) window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setActive(s);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <section className="-mt-14" aria-label="Services hero">
        <div className="relative h-[34vh] min-h-[300px] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=80"
            alt="Services hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

          <div className="absolute bottom-4 left-4 z-20 pl-12">
            <motion.span
              className="inline-block select-none text-sm sm:text-base font-serif font-semibold text-white/90 tracking-wide"
              initial={false}
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.6 }}
            >
              Yorkshire Global Consulting Inc. - Services
            </motion.span>
          </div>

          <div className="relative z-10 h-full pt-14" />
        </div>

        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-14 sm:pb-20" aria-label="Services content">
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
            <div className="-mt-2 sm:-mt-3">
              {/* ✅ SEO: Single H1 for Services page */}
              <SectionHeading
                title="Services"
                subtitle="Security-first consulting and delivery support — from secure development to governance, analysis, and execution."
              />
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
              <aside className="lg:col-span-4">
                <div className="border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm">
                  <div className="border-b border-[rgb(var(--border))] p-5">
                    <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                      Service Areas
                    </p>
                    <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                      Select a service to view details.
                    </p>
                  </div>

                  <ul className="p-2" aria-label="Service list">
                    {services.map((s) => {
                      const selected = selectedTitle === s.title;

                      return (
                        <li key={s.title}>
                          <button
                            type="button"
                            onClick={() => handleSelect(s)}
                            aria-pressed={selected}
                            aria-label={`View service: ${s.title}`}
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
                            <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                              {s.title}
                            </p>
                            <p className="mt-1 text-xs text-[rgb(var(--muted))]">View details →</p>
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
                      <span className="chip">Service</span>
                      <span className="text-xs text-[rgb(var(--muted))]">
                        Security-first • Execution-focused
                      </span>
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
                        Expected Outcome
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[rgb(var(--foreground))] sm:text-base">
                        {active.outcome}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <a href="/contact" className="btn btn-primary">
                        Request a consultation
                      </a>
                      <a href="/case-studies" className="btn btn-ghost">
                        View case studies
                      </a>
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[rgb(var(--card))]/85 backdrop-blur-sm">
                      <Spinner />
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    { k: "Delivery", icon: <DeliveryIcon />, v: "Structured execution" },
                    { k: "Security", icon: <ShieldIcon />, v: "Risk-led approach" },
                    { k: "Clarity", icon: <DocsIcon />, v: "Clear artifacts & docs" },
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
      </section>

      <CTA
        title="Not sure which service fits?"
        subtitle="Describe your situation and we’ll suggest the best starting point."
        buttonText="Request a consultation"
        buttonHref="/contact"
      />
    </>
  );
}
