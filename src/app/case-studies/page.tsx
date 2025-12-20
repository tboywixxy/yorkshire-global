"use client";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/CTA";
import Image from "next/image";
import { motion } from "framer-motion";

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

// ✅ Parent + child variants = smoother, consistent stagger
const gridVariants = {
  hidden: {},
  show: {
    transition: {
      // slower + smoother stagger
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    // optional: adds a nicer “soft” entrance; remove if you don’t want it
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      // use a gentle spring for natural feel (less “fast snap”)
      type: "spring",
      stiffness: 140,
      damping: 22,
      mass: 0.9,
    },
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* ✅ Top hero image (same as About/Services/Industries) */}
      <section className="-mt-14">
        <div className="relative h-[34vh] min-h-[300px] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt="Case Studies"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* overlays for readability under transparent navbar */}
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

          {/* ✅ Company + Page name (bottom-left) */}
          <div className="absolute bottom-4 left-4 z-20 pl-12">
            <motion.span
              className="inline-block select-none text-sm sm:text-base font-serif font-semibold text-white/90 tracking-wide"
              initial={false}
              whileHover={{ scale: 1.07 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 26,
                mass: 0.6,
              }}
            >
              Yorkshire Global Consulting Inc. - Case Studies
            </motion.span>
          </div>

          {/* spacer so navbar sits on top nicely */}
          <div className="relative z-10 h-full pt-14" />
        </div>
      </section>

      {/* ✅ Main section (with scroll reveal) */}
      <section className="py-12 sm:py-14 section-tint">
        <Container>
          <SectionHeading
            title="Case Studies"
            subtitle="High-level examples of how we support secure, structured delivery."
          />

          {/* ✅ Stagger from parent for smoother timing */}
          <motion.div
            className="mt-8 grid gap-6 lg:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            // ✅ This is important: reveals earlier + feels smoother when scrolling
            viewport={{
              once: true,
              amount: 0.18,
              // reveal begins slightly before the grid is fully in view
              margin: "0px 0px -12% 0px",
            }}
          >
            {cases.map((c) => (
              <motion.article
                key={c.title}
                className="card-img"
                variants={cardVariants}
              >
                {/* image */}
                <div className="card-img__media">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="card-img__photo"
                  />
                  <div className="card-img__overlay" />
                  <div className="absolute left-4 top-4">
                    <span className="chip">Case Study</span>
                  </div>
                </div>

                {/* content */}
                <div className="card-body">
                  <h3 className="text-base font-semibold text-[rgb(var(--foreground))]">
                    {c.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    {c.body}
                  </p>

                  <div className="mt-5 border-t border-[rgb(var(--border))] pt-4">
                    <p className="text-xs font-semibold text-[rgb(var(--foreground))]">
                      Outcome
                    </p>
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
