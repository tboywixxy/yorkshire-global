"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";

type Capability = {
  title: string;
  description: string;
};

type Accent = {
  key: string;
  bg: string;
  border: string;
  text: string;
  ring: string;
  stroke: string;
  chipBg: string;
};

const ACCENTS: Accent[] = [
  {
    key: "slate",
    bg: "rgba(241,245,249,0.80)",
    border: "rgba(100,116,139,0.35)",
    text: "rgb(15,23,42)",
    ring: "rgba(100,116,139,0.22)",
    stroke: "rgba(100,116,139,0.65)",
    chipBg: "rgba(241,245,249,0.95)",
  },
  {
    key: "zinc",
    bg: "rgba(250,250,250,0.90)",
    border: "rgba(113,113,122,0.35)",
    text: "rgb(24,24,27)",
    ring: "rgba(113,113,122,0.22)",
    stroke: "rgba(113,113,122,0.65)",
    chipBg: "rgba(244,244,245,0.95)",
  },
  {
    key: "stone",
    bg: "rgba(250,250,249,0.90)",
    border: "rgba(120,113,108,0.35)",
    text: "rgb(28,25,23)",
    ring: "rgba(120,113,108,0.22)",
    stroke: "rgba(120,113,108,0.65)",
    chipBg: "rgba(245,245,244,0.95)",
  },
  {
    key: "teal",
    bg: "rgba(240,253,250,0.85)",
    border: "rgba(13,148,136,0.28)",
    text: "rgb(0,72,63)",
    ring: "rgba(13,148,136,0.18)",
    stroke: "rgba(13,148,136,0.55)",
    chipBg: "rgba(204,251,241,0.80)",
  },
  {
    key: "sky",
    bg: "rgba(240,249,255,0.85)",
    border: "rgba(2,132,199,0.26)",
    text: "rgb(7,89,133)",
    ring: "rgba(2,132,199,0.18)",
    stroke: "rgba(2,132,199,0.55)",
    chipBg: "rgba(224,242,254,0.85)",
  },
  {
    key: "indigo",
    bg: "rgba(238,242,255,0.86)",
    border: "rgba(79,70,229,0.22)",
    text: "rgb(49,46,129)",
    ring: "rgba(79,70,229,0.16)",
    stroke: "rgba(79,70,229,0.50)",
    chipBg: "rgba(224,231,255,0.88)",
  },
  {
    key: "emerald",
    bg: "rgba(236,253,245,0.86)",
    border: "rgba(5,150,105,0.22)",
    text: "rgb(6,95,70)",
    ring: "rgba(5,150,105,0.16)",
    stroke: "rgba(5,150,105,0.50)",
    chipBg: "rgba(209,250,229,0.86)",
  },
  {
    key: "amber",
    bg: "rgba(255,251,235,0.88)",
    border: "rgba(217,119,6,0.22)",
    text: "rgb(120,53,15)",
    ring: "rgba(217,119,6,0.16)",
    stroke: "rgba(217,119,6,0.50)",
    chipBg: "rgba(254,243,199,0.88)",
  },
];

const FALLBACK_ACCENT: Accent = ACCENTS[0];

function accentForIndex(i: number) {
  return ACCENTS[i % ACCENTS.length];
}

export default function CapabilitiesSection() {
  const capabilities: Capability[] = [
    {
      title: "Technology Consulting",
      description:
        "We help you choose the right technology direction, architecture, and delivery approach to hit business goals faster.",
    },
    {
      title: "Cybersecurity & Risk Management",
      description:
        "Security assessments, controls, and governance that reduce exposure while keeping teams productive.",
    },
    {
      title: "Business Process Reengineering (BPR)",
      description:
        "Redesign workflows end-to-end to remove bottlenecks, improve speed, and increase operational quality.",
    },
    {
      title: "Business Analysis",
      description:
        "Translate business needs into clear requirements, user stories, and roadmaps that teams can execute.",
    },
    {
      title: "Project Management",
      description:
        "Structured planning, delivery tracking, and stakeholder management to keep projects on time and on budget.",
    },
    {
      title: "Enterprise Solution Deployment",
      description:
        "Implement and roll out enterprise tools with change management, training, and measurable adoption.",
    },
    {
      title: "Digital Transformation",
      description:
        "Modernize your processes, data, and customer experience with a practical, phased, transformation plan.",
    },
    {
      title: "Governance & Operational Improvement",
      description:
        "Strengthen decision-making and performance management with clear KPIs, policies, and execution rhythm.",
    },
  ];

  const accentMap = useMemo(() => {
    const map: Record<string, Accent> = {};
    capabilities.forEach((cap, idx) => {
      map[cap.title] = accentForIndex(idx);
    });
    return map;
  }, [capabilities]);

  const { left, right } = useMemo(() => {
    const l: Capability[] = [];
    const r: Capability[] = [];
    capabilities.forEach((c, idx) => (idx % 2 === 0 ? l.push(c) : r.push(c)));
    return { left: l, right: r };
  }, [capabilities]);

  const [active, setActive] = useState<Capability | null>(null);

  // ----- Desktop-only animated line refs
  const gridRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pathD, setPathD] = useState<string>("");
  const [svgBox, setSvgBox] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const setCardRef = (title: string) => (el: HTMLButtonElement | null) => {
    cardRefs.current[title] = el;
  };

  const computePath = () => {
    if (!gridRef.current || !centerRef.current || !active) {
      setPathD("");
      return;
    }

    const gridRect = gridRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();
    const activeEl = cardRefs.current[active.title];
    if (!activeEl) {
      setPathD("");
      return;
    }
    const fromRect = activeEl.getBoundingClientRect();

    const w = Math.max(0, gridRect.width);
    const h = Math.max(0, gridRect.height);
    setSvgBox({ w, h });

    const fromCenterX = fromRect.left - gridRect.left + fromRect.width / 2;
    const fromCenterY = fromRect.top - gridRect.top + fromRect.height / 2;

    const centerX = centerRect.left - gridRect.left + centerRect.width / 2;
    const centerY = centerRect.top - gridRect.top + centerRect.height / 2;

    const isFromLeft = fromCenterX < centerX;

    const startX = isFromLeft ? fromRect.right - gridRect.left : fromRect.left - gridRect.left;
    const startY = fromCenterY;

    const endX = isFromLeft ? centerRect.left - gridRect.left : centerRect.right - gridRect.left;
    const endY = centerY;

    const dx = Math.abs(endX - startX);
    const c1x = startX + (isFromLeft ? 1 : -1) * Math.min(150, dx * 0.55);
    const c1y = startY;
    const c2x = endX + (isFromLeft ? -1 : 1) * Math.min(150, dx * 0.25);
    const c2y = endY;

    setPathD(`M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`);
  };

  useLayoutEffect(() => {
    computePath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const onResize = () => computePath();
    const onScroll = () => computePath();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // ✅ FIX: activeAccent is NEVER null now
  const activeAccent: Accent =
    (active ? accentMap[active.title] : undefined) ?? FALLBACK_ACCENT;

  const DesktopCard = ({
    cap,
    selected,
    onClick,
    accent,
  }: {
    cap: Capability;
    selected: boolean;
    onClick: () => void;
    accent: Accent;
  }) => (
    <button
      ref={setCardRef(cap.title)}
      type="button"
      onClick={onClick}
      className={[
        "relative z-10 w-full text-left rounded-2xl border shadow-sm",
        "cursor-pointer select-none",
        "px-3 py-2",
        "transition-all duration-200 ease-out will-change-transform",
        "hover:-translate-y-0.5 hover:shadow-md",
        "active:translate-y-0 active:scale-[0.99]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--foreground))]/20",
        "border-[rgb(var(--border))] bg-[rgb(var(--card))]",
      ].join(" ")}
      style={selected ? { backgroundColor: accent.bg, borderColor: accent.border } : undefined}
    >
      <p
        className="text-[13px] font-semibold leading-snug"
        style={{ color: selected ? accent.text : "rgb(var(--foreground))" }}
      >
        {cap.title}
      </p>
    </button>
  );

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <SectionHeading
          title="What We Deliver"
          subtitle="World-class expertise across the full lifecycle—from strategy to hands-on execution."
        />

        {/* ✅ MOBILE: simple cards */}
        <div className="mt-8 grid gap-4 lg:hidden">
          {capabilities.map((cap, idx) => {
            const a = accentForIndex(idx);
            return (
              <div
                key={cap.title}
                className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                    {cap.title}
                  </p>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{ backgroundColor: a.chipBg, color: a.text }}
                  >
                    Focus
                  </span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ✅ DESKTOP */}
        <div ref={gridRef} className="relative mt-8 hidden lg:block">
          <svg
            className="pointer-events-none absolute inset-0 z-[5]"
            width={svgBox.w}
            height={svgBox.h}
            viewBox={`0 0 ${svgBox.w} ${svgBox.h}`}
            preserveAspectRatio="none"
          >
            <AnimatePresence>
              {/* ✅ FIX: remove "activeAccent ?" check (always exists now) */}
              {active && pathD ? (
                <motion.path
                  key={active.title}
                  d={pathD}
                  fill="none"
                  stroke={activeAccent.stroke}
                  strokeWidth={2.25}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
            </AnimatePresence>
          </svg>

          <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
            {/* LEFT */}
            <div className="space-y-2 lg:flex lg:flex-col lg:justify-center">
              {left.map((cap) => {
                const selected = active?.title === cap.title;
                return (
                  <DesktopCard
                    key={cap.title}
                    cap={cap}
                    selected={selected}
                    accent={accentMap[cap.title]}
                    onClick={() => setActive(cap)}
                  />
                );
              })}
            </div>

            {/* CENTER */}
            <div
              ref={centerRef}
              className={[
                "relative z-10 rounded-3xl border bg-[rgb(var(--card))] shadow-sm overflow-hidden",
                "border-[rgb(var(--border))]",
                "p-8 sm:p-9",
                "min-h-[260px]",
                "flex items-center justify-center",
              ].join(" ")}
              style={
                active
                  ? {
                      boxShadow: `0 0 0 2px ${activeAccent.ring}, 0 10px 25px rgba(0,0,0,0.06)`,
                      borderColor: activeAccent.border,
                    }
                  : undefined
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active?.title ?? "empty"}
                  className="w-full max-w-[46ch]"
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {!active ? (
                    <div className="w-full text-center">
                      <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                        Click to see details
                      </p>
                      <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                        Select a capability on the left or right to view the description here.
                      </p>
                    </div>
                  ) : (
                    <div className="w-full text-center">
                      <div className="mb-3 flex justify-center">
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
                          style={{
                            backgroundColor: activeAccent.chipBg,
                            color: activeAccent.text,
                          }}
                        >
                          Selected
                        </span>
                      </div>

                      <p className="text-lg font-semibold text-[rgb(var(--foreground))]">
                        {active.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">
                        {active.description}
                      </p>

                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={() => {
                            setActive(null);
                            setPathD("");
                          }}
                          className="text-sm font-medium text-[rgb(var(--foreground))] underline underline-offset-4 opacity-80 hover:opacity-100 transition"
                        >
                          Clear selection
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT */}
            <div className="space-y-2 lg:flex lg:flex-col lg:justify-center">
              {right.map((cap) => {
                const selected = active?.title === cap.title;
                return (
                  <DesktopCard
                    key={cap.title}
                    cap={cap}
                    selected={selected}
                    accent={accentMap[cap.title]}
                    onClick={() => setActive(cap)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
