"use client";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/CTA";
import Image from "next/image";
import { motion } from "framer-motion";

const industries = [
  {
    title: "Healthcare",
    body: "Supporting secure systems, compliance, digital workflows, and operational efficiency.",
  },
  {
    title: "Finance",
    body: "Helping financial organizations manage risk, strengthen security, and improve process clarity.",
  },
  {
    title: "Technology & SaaS",
    body: "Guidance in secure development, technical project delivery, and scaling operations.",
  },
  {
    title: "Public Sector",
    body: "Process improvement, risk management, and structured project execution for government bodies.",
  },
  {
    title: "Gaming & Digital Entertainment",
    body: "Secure application development, system stability, analytics, and workflow optimization.",
  },
  {
    title: "Small and Medium Enterprises",
    body: "Affordable, scalable consulting to strengthen technology, processes, and project delivery.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* ✅ Top hero image */}
      <section className="-mt-14">
        <div className="relative h-[34vh] min-h-[300px] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=80"
            alt="Industries"
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
              Yorkshire Global Consulting Inc. - Industries
            </motion.span>
          </div>

          <div className="relative z-10 h-full pt-14" />
        </div>
      </section>

      {/* ✅ Main content */}
      <section className="relative overflow-hidden pt-10 pb-14 sm:pt-12 sm:pb-18">
        {/* Glassy background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950" />

          <div className="absolute inset-0 opacity-90 dark:opacity-70 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(34,211,238,0.28),transparent_60%),radial-gradient(860px_520px_at_85%_18%,rgba(99,102,241,0.24),transparent_62%),radial-gradient(820px_500px_at_75%_85%,rgba(236,72,153,0.16),transparent_62%),radial-gradient(760px_520px_at_18%_85%,rgba(16,185,129,0.12),transparent_64%)]" />

          <div className="absolute inset-0 backdrop-blur-[2px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-black/5 dark:bg-white/10" />
        </div>

        <Container>
          <SectionHeading
            title="Industries"
            subtitle="We adapt our approach to your environment, constraints, and delivery needs."
          />

          <div className="mt-9 space-y-8 sm:mt-10 sm:space-y-9">
            {industries.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  className="grid items-start gap-5 lg:grid-cols-12"
                  // ✅ smoother + lighter (no blur) so page won't hang
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.05, // tiny delay, not per-index
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Side label */}
                  <div className={["lg:col-span-2", isLeft ? "" : "lg:col-start-11"].join(" ")}>
                    <div
                      className={[
                        "inline-flex items-center gap-3",
                        isLeft ? "" : "lg:justify-end lg:w-full",
                      ].join(" ")}
                    >
                      <span className="text-[11px] font-semibold text-[rgb(var(--muted))]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-9 bg-[rgb(var(--border))]" />
                    </div>
                  </div>

                  {/* Main content */}
                  <div className={["lg:col-span-8", "lg:col-start-3"].join(" ")}>
                    <div
                      className={[
                        "relative",
                        // ✅ slightly tighter left/right rule
                        "border-l-2 border-[rgb(var(--border))] pl-4 sm:pl-5",
                        isLeft
                          ? ""
                          : "lg:ml-auto lg:text-right lg:border-l-0 lg:border-r-2 lg:pr-5 lg:pl-0",
                      ].join(" ")}
                    >
                      {/* ✅ smaller “cracked glass” panel (reduced size) */}
                      <div
                        className={[
                          "cracked-glass-panel",
                          "absolute -inset-x-1.5 -inset-y-3 -z-10",
                          "bg-white/30 dark:bg-white/5",
                          "backdrop-blur-md",
                          "border border-white/45 dark:border-white/10",
                          "shadow-[0_10px_26px_rgba(0,0,0,0.06)]",
                        ].join(" ")}
                      />

                      <p className="text-xl font-semibold tracking-tight text-[rgb(var(--foreground))] sm:text-2xl">
                        {item.title}
                      </p>

                      <p
                        className={[
                          "mt-2.5 text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base",
                          isLeft ? "max-w-2xl" : "lg:ml-auto lg:max-w-2xl",
                        ].join(" ")}
                      >
                        {item.body}
                      </p>

                      <div
                        className={[
                          "mt-4 h-px w-20",
                          "bg-gradient-to-r from-[rgb(var(--foreground))]/30 via-[rgb(var(--foreground))]/10 to-transparent",
                          isLeft ? "" : "lg:ml-auto lg:bg-gradient-to-l",
                        ].join(" ")}
                      />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className={["hidden lg:block lg:col-span-2", isLeft ? "" : "lg:col-start-1"].join(" ")} />
                </motion.div>
              );
            })}
          </div>
        </Container>

        {/* Bottom divider */}
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
