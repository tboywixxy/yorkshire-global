"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import SectionDivider from "@/components/SectionDivider";
import { motion, AnimatePresence } from "framer-motion";

type ServiceItem = {
  title: string;
  detail: string;
};

export default function ServicesPreviewSection() {
  const services: ServiceItem[] = useMemo(
    () => [
      {
        title: "Secure Software Development Lifecycle (SSDLc)",
        detail:
          "We help organizations integrate security into every stage of software development: secure coding practices, threat modeling, code reviews, DevSecOps integration, secure architecture guidance, and full SSDLc program setup.",
      },
      {
        title: "Cybersecurity Services",
        detail:
          "Risk and vulnerability assessments, security policy development, cloud and infrastructure security review, governance and compliance support, incident readiness planning, and security awareness training.",
      },
      {
        title: "Business Analysis",
        detail:
          "Requirements gathering, workflow analysis, gap assessments, process improvement, documentation (BRDs/FRDs, use cases, user stories), and stakeholder management.",
      },
      {
        title: "Project Management",
        detail:
          "Full lifecycle management, PMO setup, Agile/Waterfall/Hybrid delivery, scheduling and resource planning, risk and issue management, vendor coordination, and project recovery.",
      },
      {
        title: "Business & Strategy Consulting",
        detail:
          "Strategic planning, operational improvement, digital transformation guidance, change management, business continuity planning, and performance measurement frameworks.",
      },
    ],
    []
  );

  // ✅ Multi-open state
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <section className="relative py-14 sm:py-16 section-tint overflow-hidden">
      <Container>
        <SectionHeading title="Our Core Services" subtitle="A preview of what we deliver." />

        {/* ✅ Prevent other cards stretching to same height */}
        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => {
            const isOpen = openSet.has(idx);

            return (
              <div key={s.title} className="card-simple overflow-hidden self-start h-fit">
                <div className="p-6 flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold">{s.title}</p>

                  {/* ✅ Only this button toggles this card */}
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-label={isOpen ? "Collapse details" : "Expand details"}
                    aria-expanded={isOpen}
                    className="shrink-0"
                  >
                    <motion.span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1"
                      style={{
                        background: "color-mix(in srgb, rgb(var(--card)) 85%, transparent)",
                        color: "rgb(var(--foreground))",
                        // @ts-ignore
                        "--tw-ring-color": "color-mix(in srgb, rgb(var(--border)) 80%, transparent)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={isOpen ? "minus" : "plus"}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="text-lg leading-none select-none"
                        >
                          {isOpen ? "−" : "+"}
                        </motion.span>
                      </AnimatePresence>
                    </motion.span>
                  </button>
                </div>

                {/* Details for this card only */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden px-6 pb-6 -mt-2"
                    >
                      <p className="text-sm text-[rgb(var(--muted))]">{s.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Link href="/services" className="btn btn-primary">
            Explore Our Services
          </Link>
        </div>
      </Container>

      {/* Divider BELOW services section */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <SectionDivider className="h-[72px] sm:h-[90px] md:h-[100px]" />
      </div>

      {/* Spacer so divider doesn't cover content */}
      <div className="h-[72px] sm:h-[90px] md:h-[100px]" />
    </section>
  );
}
