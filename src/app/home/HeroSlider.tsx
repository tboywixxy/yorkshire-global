// components/HeroSlider.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/src/components/Container";
import SectionDivider from "@/src/components/SectionDivider";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  image: string;
  headline: string;
  tagline: string;
  description: string;
};

export default function HeroSlider() {
  const slides: Slide[] = useMemo(
    () => [
      {
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80",
        headline: "Yorkshire Global Consulting Inc.",
        tagline: "Secure • Analyze • Deliver • Transform",
        description:
          "We help organizations strengthen their systems, streamline operations, and execute projects with confidence.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&w=2000&q=80",
        headline: "Security-first delivery",
        tagline: "Resilience built into your work",
        description:
          "From secure development practices to governance and compliance support, we reduce risk and improve outcomes.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2000&q=80",
        headline: "Clear analysis. Reliable execution.",
        tagline: "From requirements to results",
        description:
          "Business analysis and project management that aligns stakeholders and delivers measurable value.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const pauseUntilRef = useRef<number>(0);

  const active = slides[index];
  const next = slides[(index + 1) % slides.length];

  const goTo = (i: number) => {
    const n = slides.length;
    setIndex(((i % n) + n) % n);
    pauseUntilRef.current = Date.now() + 9000;
  };
  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const HeadlineTag = index === 0 ? ("h1" as const) : ("h2" as const);

  return (
    <section className="relative overflow-hidden -mt-14" aria-label="Hero">
      <div className="relative h-[72vh] min-h-[520px] sm:h-[70vh] sm:min-h-[520px] md:h-[66vh] md:min-h-[520px] w-full">
        <div className="absolute inset-0 bg-black -z-10" />

        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={active.image}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={active.image}
              alt={`${active.headline} background image`}
              fill
              priority={index === 0}
              sizes="100vw"
              // ✅ Fill the whole container
              className="object-cover object-[center_30%]"
            />
          </motion.div>
        </AnimatePresence>

        {/* ✅ lighter overlays */}
        <div className="absolute inset-0 z-10 bg-black/10" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/35 via-black/15 to-black/0" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

        {/* preload next image */}
        <Image src={next.image} alt="" width={10} height={10} className="hidden" />

        {/* ARROWS */}
        <div className="absolute inset-0 z-[30] pointer-events-none">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className={[
              "pointer-events-auto cursor-pointer",
              "group absolute top-1/2 -translate-y-1/2",
              "left-2 sm:left-3 md:left-4 lg:left-5 xl:left-6",
              "h-9 w-9 sm:h-10 sm:w-10 lg:h-10 lg:w-10 rounded-full",
              "border border-white/15 bg-white/10 backdrop-blur-md",
              "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
              "transition-all duration-200",
              "hover:bg-white/15 hover:border-white/25",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30",
            ].join(" ")}
          >
            <ChevronLeft className="mx-auto h-4 w-4 sm:h-[18px] sm:w-[18px] lg:h-5 lg:w-5 text-white/95 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className={[
              "pointer-events-auto cursor-pointer",
              "group absolute top-1/2 -translate-y-1/2",
              "right-2 sm:right-3 md:right-4 lg:right-5 xl:right-6",
              "h-9 w-9 sm:h-10 sm:w-10 lg:h-10 lg:w-10 rounded-full",
              "border border-white/15 bg-white/10 backdrop-blur-md",
              "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
              "transition-all duration-200",
              "hover:bg-white/15 hover:border-white/25",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30",
            ].join(" ")}
          >
            <ChevronRight className="mx-auto h-4 w-4 sm:h-[18px] sm:w-[18px] lg:h-5 lg:w-5 text-white/95 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* content */}
        <Container className="relative z-20 flex h-full items-center pt-16 sm:pt-16 md:pt-14 pb-10 sm:pb-10">
          <div className="max-w-[40rem] w-full pr-2 sm:pr-0 pl-12 sm:pl-14 md:pl-20 lg:pl-24 xl:pl-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.headline}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="chip text-[11px] sm:text-xs text-white">
                  Ontario, Canada • Serving multiple industries
                </p>

                <HeadlineTag className="mt-3 text-2xl font-semibold tracking-tight text-white sm:mt-4 sm:text-4xl md:text-5xl">
                  {active.headline}
                </HeadlineTag>

                <p className="mt-2 text-sm font-medium text-white/90 sm:mt-3 sm:text-base md:text-lg">
                  {active.tagline}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-white/85 sm:mt-4 sm:text-sm md:text-base">
                  {active.description}{" "}
                  <span className="hidden md:inline">
                    With expertise in secure development, cybersecurity, business analysis, and project management,
                    we deliver solutions that drive lasting results.
                  </span>
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
                  <Link
                    href="/about"
                    className="btn btn-ghost text-white ring-white/25 bg-white/10 hover:bg-white/15 !w-auto px-4 py-2 text-sm"
                  >
                    Learn More
                  </Link>
                  <Link href="/services" className="btn btn-primary !w-auto px-4 py-2 text-sm">
                    Our Services
                  </Link>
                  <Link href="/contact" className="btn btn-accent !w-auto px-4 py-2 text-sm">
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center gap-2 sm:mt-8" aria-label="Hero slide indicators">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={[
                    "rounded-full transition-all cursor-pointer",
                    i === index ? "h-2.5 w-9 bg-white" : "h-2.5 w-2.5 bg-white/45 hover:bg-white/70",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </Container>

        <div className="absolute inset-x-0 bottom-0 z-20">
          <SectionDivider className="h-[64px] sm:h-[80px] md:h-[90px]" />
        </div>
      </div>
    </section>
  );
}
