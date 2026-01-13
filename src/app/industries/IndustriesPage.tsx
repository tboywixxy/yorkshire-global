// app/industries/IndustriesPage.tsx
"use client";

import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import CTA from "@/src/components/CTA";
import Image from "next/image";
import { motion } from "framer-motion";

const HERO_URL =
  "https://images.unsplash.com/photo-1740908900906-a51032597559?auto=format&fit=crop&w=2400&q=80";

type Industry = {
  title: string;
  body: string;
  image: { src: string; alt: string };
  cardShapeClass: string;
  accentGradClass: string;
};

const industries: Industry[] = [
  {
    title: "Healthcare",
    body: "Supporting secure systems, compliance, digital workflows, and operational efficiency.",
    image: {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=80",
      alt: "Healthcare systems and clinical workflows",
    },
    cardShapeClass: "rounded-[28px] sm:rounded-[34px]",
    accentGradClass:
      "bg-[radial-gradient(520px_220px_at_15%_10%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(520px_220px_at_85%_30%,rgba(16,185,129,0.12),transparent_62%)]",
  },
  {
    title: "Finance",
    body: "Helping financial organizations manage risk, strengthen security, and improve process clarity.",
    image: {
      src: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1800&q=80",
      alt: "Financial services and risk management",
    },
    cardShapeClass: "rounded-3xl sm:rounded-[42px]",
    accentGradClass:
      "bg-[radial-gradient(520px_240px_at_20%_20%,rgba(99,102,241,0.16),transparent_62%),radial-gradient(520px_220px_at_85%_20%,rgba(236,72,153,0.10),transparent_62%)]",
  },
  {
    title: "Technology & SaaS",
    body: "Guidance in secure development, technical project delivery, and scaling operations.",
    image: {
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1800&q=80",
      alt: "Technology and SaaS product delivery",
    },
    cardShapeClass: "rounded-[26px] sm:rounded-[30px]",
    accentGradClass:
      "bg-[radial-gradient(560px_260px_at_10%_15%,rgba(34,211,238,0.16),transparent_62%),radial-gradient(560px_260px_at_90%_70%,rgba(99,102,241,0.12),transparent_62%)]",
  },
  {
    title: "Public Sector",
    body: "Process improvement, risk management, and structured project execution for government bodies.",
    image: {
      src: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1800&q=80",
      alt: "Public sector delivery and governance",
    },
    cardShapeClass: "rounded-[18px] sm:rounded-[26px]",
    accentGradClass:
      "bg-[radial-gradient(520px_240px_at_15%_10%,rgba(148,163,184,0.14),transparent_62%),radial-gradient(520px_240px_at_85%_70%,rgba(56,189,248,0.10),transparent_62%)]",
  },
  {
    title: "Gaming & Digital Entertainment",
    body: "Secure application development, system stability, analytics, and workflow optimization.",
    image: {
      src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=80",
      alt: "Gaming and digital entertainment systems",
    },
    cardShapeClass: "rounded-[30px] sm:rounded-[44px]",
    accentGradClass:
      "bg-[radial-gradient(560px_240px_at_20%_25%,rgba(236,72,153,0.14),transparent_62%),radial-gradient(560px_240px_at_85%_65%,rgba(168,85,247,0.10),transparent_62%)]",
  },
  {
    title: "Small and Medium Enterprises",
    body: "Affordable, scalable consulting to strengthen technology, processes, and project delivery.",
    image: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
      alt: "Small business teams and operations",
    },
    cardShapeClass: "rounded-[24px] sm:rounded-[36px]",
    accentGradClass:
      "bg-[radial-gradient(560px_240px_at_15%_15%,rgba(16,185,129,0.12),transparent_62%),radial-gradient(560px_240px_at_85%_20%,rgba(34,211,238,0.12),transparent_62%)]",
  },
];

const MEDIA_SHAPE = "rounded-2xl sm:rounded-3xl";

export default function IndustriesPage() {
  return (
    <>
      {/* HERO (edge-to-edge, fills screen) */}
      <section className="-mt-14" aria-label="Industries hero">
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <div className="relative h-[44vh] min-h-[360px] w-full">
            <Image
              src={HERO_URL}
              alt="Industries hero background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_70%]"
            />

            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-4 z-20">
              <Container>
                <motion.span
                  className="inline-block select-none text-sm sm:text-base font-serif font-semibold text-white/90 tracking-wide"
                  initial={false}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 340, damping: 24, mass: 0.7 }}
                >
                  Yorkshire Global Consulting Inc. — Industries
                </motion.span>
              </Container>
            </div>

            <div className="relative z-10 h-full pt-14" />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative overflow-hidden pt-10 pb-14 sm:pt-12 sm:pb-18" aria-label="Industries content">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950" />
          <div className="absolute inset-0 opacity-85 dark:opacity-60 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(34,211,238,0.20),transparent_60%),radial-gradient(860px_520px_at_85%_18%,rgba(99,102,241,0.18),transparent_62%),radial-gradient(820px_500px_at_75%_85%,rgba(236,72,153,0.10),transparent_62%),radial-gradient(760px_520px_at_18%_85%,rgba(16,185,129,0.10),transparent_64%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-black/5 dark:bg-white/10" />
        </div>

        <Container>
          <SectionHeading
            title="Industries"
            subtitle="We adapt our approach to your environment, constraints, and delivery needs."
          />

          <div className="mt-9 grid gap-6 sm:mt-10 sm:gap-7">
            {industries.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <article
                  key={item.title}
                  className={[
                    "relative overflow-hidden",
                    "border border-black/10 dark:border-white/10",
                    "bg-transparent",
                    "shadow-none",
                    item.cardShapeClass,
                  ].join(" ")}
                >
                  <div
                    aria-hidden
                    className={[
                      "pointer-events-none absolute inset-0 opacity-[0.55] dark:opacity-[0.45]",
                      item.accentGradClass,
                    ].join(" ")}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10 dark:from-white/5 dark:to-transparent"
                  />

                  <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-12 lg:items-center lg:gap-8 lg:p-8">
                    {/* MEDIA */}
                    <div className={["lg:col-span-5", isLeft ? "lg:order-1" : "lg:order-2"].join(" ")}>
                      <div
                        className={[
                          "relative w-full overflow-hidden",
                          "border border-black/10 dark:border-white/10",
                          "shadow-md",
                          MEDIA_SHAPE,
                        ].join(" ")}
                      >
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          width={1400}
                          height={980}
                          loading="lazy"
                          decoding="async"
                          className="h-[210px] w-full object-cover sm:h-[240px] lg:h-[320px]"
                        />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                      </div>
                    </div>

                    {/* TEXT */}
                    <div className={["lg:col-span-7", isLeft ? "lg:order-2" : "lg:order-1"].join(" ")}>
                      <div className={["relative", isLeft ? "" : "lg:text-right"].join(" ")}>
                        <h2 className="text-xl font-semibold tracking-tight text-[rgb(var(--foreground))] sm:text-2xl">
                          {item.title}
                        </h2>

                        <p
                          className={[
                            "mt-2.5 text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base",
                            "max-w-2xl",
                            isLeft ? "" : "lg:ml-auto",
                          ].join(" ")}
                        >
                          {item.body}
                        </p>

                        <div
                          className={[
                            "mt-5 h-px w-24",
                            "bg-gradient-to-r from-[rgb(var(--foreground))]/30 via-[rgb(var(--foreground))]/10 to-transparent",
                            isLeft ? "" : "lg:ml-auto lg:bg-gradient-to-l",
                          ].join(" ")}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
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
        title="Have a unique industry requirement?"
        subtitle="We’ll tailor the engagement to your standards, risks, and delivery timeline."
      />
    </>
  );
}
