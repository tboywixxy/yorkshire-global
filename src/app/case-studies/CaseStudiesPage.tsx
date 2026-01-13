// app/case-studies/CaseStudiesPage.tsx
"use client";

import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import CTA from "@/src/components/CTA";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const HERO_URL =
  "https://images.unsplash.com/photo-1732304719348-1fcdf2500966?auto=format&fit=crop&w=2400&q=80";

const cases = [
  {
    title: "Case Study 1 — SSDLc Implementation",
    body:
      "A technology company required a more secure development process. We implemented an SSDLc framework, introduced secure coding practices, and integrated automated scans into their pipeline.",
    result: "Improved resilience and faster release cycles.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Case Study 2 — Cybersecurity Risk Reduction",
    body:
      "A financial client needed to address repeated security audit findings. We improved their controls, updated policies, and strengthened their cloud security posture.",
    result: "Passed compliance audit and reduced risk exposure.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Case Study 3 — Project Recovery",
    body:
      "A major system deployment was at risk of failure. We stabilized the project, corrected the schedule, redefined requirements, and delivered under a revised plan.",
    result: "Successful implementation and positive stakeholder feedback.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80",
  },
];

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 22, mass: 0.9 },
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* HERO (edge-to-edge, fills screen) */}
      <section className="-mt-14" aria-label="Case studies hero">
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <div className="relative h-[44vh] min-h-[360px] w-full">
            <Image
              src={HERO_URL}
              alt="Case studies hero background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_30%]"
            />

            {/* lighter overlays */}
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-4 z-20">
              <Container>
                <motion.span
                  className="inline-block select-none text-sm sm:text-base font-serif font-semibold text-white/90 tracking-wide"
                  initial={false}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.7 }}
                >
                  Yorkshire Global Consulting Inc. — Case Studies
                </motion.span>
              </Container>
            </div>

            <div className="relative z-10 h-full pt-14" />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 sm:py-14 section-tint" aria-label="Case studies content">
        <Container>
          <SectionHeading
            title="Case Studies"
            subtitle="High-level examples of how we support secure, structured delivery."
          />

          <motion.div
            className="mt-8 grid gap-6 lg:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
          >
            {cases.map((c) => (
              <motion.article
                key={c.title}
                className="card-img"
                variants={cardVariants}
                aria-label={c.title}
              >
                <div className="card-img__media relative">
                  <Image
                    src={c.image}
                    alt={`${c.title} image`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="card-img__photo object-cover"
                  />
                  <div className="card-img__overlay" />
                  <div className="absolute left-4 top-4">
                    <span className="chip">Case Study</span>
                  </div>
                </div>

                <div className="card-body">
                  <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">
                    {c.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    {c.body}
                  </p>

                  <div className="mt-5 border-t border-[rgb(var(--border))] pt-4">
                    <p className="text-xs font-semibold text-[rgb(var(--foreground))]">Outcome</p>
                    <p className="mt-1 text-sm font-medium text-[rgb(var(--foreground))]">
                      {c.result}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <CTA
        title="Want results like these?"
        subtitle="Tell us about your project and we’ll outline a clear plan to move forward."
      />
    </>
  );
}
