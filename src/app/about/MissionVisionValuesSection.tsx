// app/about/MissionVisionValuesSection.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import SectionDivider from "@/components/SectionDivider";

type ValueItem = {
  title: string;
  body: string;
};

function ValuesSlider({ items }: { items: ValueItem[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  const active = items[index];

  return (
    <div className="mt-10 border-t border-[rgb(var(--border))] pt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[rgb(var(--foreground))]">Our Values</p>
          <p className="mt-1 text-xs text-[rgb(var(--muted))]">Swipe or use the arrows</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous value"
            className="inline-flex h-9 w-9 items-center justify-center border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--foreground))] hover:opacity-80"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Next value"
            className="inline-flex h-9 w-9 items-center justify-center border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--foreground))] hover:opacity-80"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden">
        <motion.div
          key={active.title}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) next();
            if (info.offset.x > 60) prev();
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="border border-[rgb(var(--border))] bg-[color-mix(in_srgb,rgb(var(--background))_96%,rgb(var(--primary))_4%)] p-6"
        >
          <p className="text-base font-semibold text-[rgb(var(--foreground))]">{active.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">{active.body}</p>
        </motion.div>

        <div className="mt-4 flex items-center gap-2">
          {items.map((v, i) => {
            const isActive = i === index;
            return (
              <button
                key={v.title}
                aria-label={`Go to ${v.title}`}
                onClick={() => setIndex(i)}
                className={[
                  "h-2.5 rounded-full transition-all",
                  isActive
                    ? "w-8 bg-[rgb(var(--primary))]"
                    : "w-2.5 bg-black/20 dark:bg-white/25 hover:opacity-80",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MissionVisionValuesSection() {
  const values = useMemo<ValueItem[]>(
    () => [
      {
        title: "Excellence",
        body: "We hold our work to the highest professional standards—focused on quality, rigor, and dependable delivery.",
      },
      {
        title: "Integrity",
        body: "We act transparently and responsibly in every engagement, building trust through clear communication and accountability.",
      },
      {
        title: "Security First",
        body: "We prioritize resilience in all technology and business processes, reducing risk while enabling growth.",
      },
      {
        title: "Client Commitment",
        body: "We focus on value, clarity, and long-term success—ensuring solutions are practical, measurable, and sustainable.",
      },
      {
        title: "Continuous Growth",
        body: "We evolve with emerging technologies and industry practices—always improving how we advise, build, and deliver.",
      },
    ],
    []
  );

  return (
    <section className="section-tint">
      <Container>
        <div className="py-14 sm:py-16">
          <SectionHeading
            title="Who We Are"
            subtitle="Yorkshire Global Consulting Inc. is an Ontario-based consulting firm focused on helping organizations become more secure, efficient, and operationally strong."
          />

          {/* ✅ Mission (top-left) + Vision (below-right) */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Mission - row 1, col 1 */}
            <div className="border-l-2 border-[rgb(var(--primary))] pl-5 lg:col-start-1 lg:row-start-1">
              <p className="text-xs font-semibold tracking-widest text-[rgb(var(--muted))]">
                OUR MISSION
              </p>
              <p className="mt-3 text-xl font-semibold leading-snug text-[rgb(var(--foreground))] sm:text-2xl">
                To help organizations build secure systems, make informed decisions, and deliver
                impactful results through structured processes and reliable execution.
              </p>
            </div>

            {/* Vision - row 2, col 2 */}
            <div className="border-l-2 border-[rgb(var(--accent))] pl-5 lg:col-start-2 lg:row-start-2 lg:text-right lg:border-l-0 lg:border-r-2 lg:pr-5">
              <p className="text-xs font-semibold tracking-widest text-[rgb(var(--muted))]">
                OUR VISION
              </p>
              <p className="mt-3 text-xl font-semibold leading-snug text-[rgb(var(--foreground))] sm:text-2xl">
                To be a trusted consulting partner known for integrity, quality, and measurable
                outcomes.
              </p>
            </div>
          </div>

          {/* ✅ Values slider below */}
          <ValuesSlider items={values} />
        </div>
      </Container>

      {/* ✅ Divider at the BOTTOM of this section */}
      <div className="relative -mb-1">
        <SectionDivider className="h-[64px] sm:h-[80px] md:h-[92px]" />
      </div>
    </section>
  );
}
