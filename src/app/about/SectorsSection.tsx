"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";

type Sector = {
  name: string;
  description: string;
  imageUrl: string;
};

function Spinner({ label = "Loading sector details…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-[rgb(var(--border))] border-t-[rgb(var(--foreground))]" />
      <p className="text-xs text-[rgb(var(--muted))]">{label}</p>
    </div>
  );
}

export default function SectorsSection() {
  // ✅ more reliable Unsplash photos (different IDs; consistent)
  const sectors: Sector[] = useMemo(
    () => [
      {
        name: "Healthcare",
        description:
          "Digital systems that improve patient experience, streamline operations, and strengthen compliance across care delivery.",
        imageUrl:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80",
      },
      {
        name: "Finance",
        description:
          "Secure, reliable platforms for payments, analytics, risk management, and customer-facing digital banking experiences.",
        imageUrl:
          "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=2000&q=80",
      },
      {
        name: "Technology",
        description:
          "Product strategy, scalable architecture, and execution support to ship faster with stability and performance.",
        imageUrl:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
      },
      {
        name: "Retail",
        description:
          "Omnichannel experiences, inventory visibility, and customer insights that drive conversion and retention.",
        imageUrl:
          "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=2000&q=80",
      },
      {
        name: "Logistics",
        description:
          "Tracking, routing, and operations tooling that improves delivery performance, cost control, and real-time visibility.",
        imageUrl:
          "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=2000&q=80",
      },
      {
        name: "Government",
        description:
          "Service modernization, digital identity, and process improvement that improves access, transparency, and efficiency.",
        imageUrl:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2000&q=80",
      },
    ],
    []
  );

  // current “displayed” sector
  const [active, setActive] = useState<Sector>(sectors[0]);
  // current “selected highlight” in left list
  const [selectedName, setSelectedName] = useState<string>(sectors[0].name);

  // brief loading spinner when switching
  const [isLoading, setIsLoading] = useState(false);
  const switchTimerRef = useRef<number | null>(null);

  // auto-rotate every 20s
  const autoTimerRef = useRef<number | null>(null);

  // cleanup timers
  useEffect(() => {
    return () => {
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
      if (autoTimerRef.current) window.clearInterval(autoTimerRef.current);
    };
  }, []);

  const indexOfSelected = useMemo(() => {
    return sectors.findIndex((s) => s.name === selectedName);
  }, [sectors, selectedName]);

  const startAutoRotate = () => {
    if (autoTimerRef.current) window.clearInterval(autoTimerRef.current);

    autoTimerRef.current = window.setInterval(() => {
      // if currently “loading”, skip this tick so we don’t stack transitions
      if (isLoading) return;

      const currentIdx = sectors.findIndex((s) => s.name === selectedName);
      const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % sectors.length;
      handleSelect(sectors[nextIdx], { fromAuto: true });
    }, 20000);
  };

  useEffect(() => {
    startAutoRotate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedName, isLoading]);

  const handleSelect = (s: Sector, opts?: { fromAuto?: boolean }) => {
    if (s.name === selectedName) return;

    // highlight immediately like your Services page
    setSelectedName(s.name);
    setIsLoading(true);

    if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);

    // ✅ brief spinner (tune: 500–900ms feels good)
    switchTimerRef.current = window.setTimeout(() => {
      setActive(s);
      setIsLoading(false);
    }, 700);

    // If user clicks, we still keep auto-rotate running (it will continue from the new selection)
    // If you want to PAUSE auto-rotate after user clicks for a while, tell me and I’ll add it.
    void opts;
  };

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <SectionHeading
          title="Industries We Support"
          subtitle="We support clients across multiple sectors with a global perspective and execution discipline."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* LEFT: vertical list (Services-style) */}
          <div className="lg:col-span-4">
            <div className="border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm">
              <div className="border-b border-[rgb(var(--border))] p-5">
                <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                  Sectors
                </p>
                <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                  Click a sector to view details. (Auto-rotates every 20s)
                </p>
              </div>

              <ul className="p-2">
                {sectors.map((s) => {
                  const selected = selectedName === s.name;

                  return (
                    <li key={s.name}>
                      <button
                        type="button"
                        onClick={() => handleSelect(s)}
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
                          {s.name}
                        </p>
                        <p className="mt-1 text-xs text-[rgb(var(--muted))]">
                          View details →
                        </p>

                        {/* optional tiny progress hint (very subtle) */}
                        {selected ? (
                          <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full bg-[rgb(var(--border))]">
                            <div
                              className="h-full w-full origin-left animate-[grow_0.45s_ease-out]"
                              style={{ background: "rgb(var(--foreground))", opacity: 0.12 }}
                            />
                          </div>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* RIGHT: image + content */}
          <div className="lg:col-span-8">
            <div className="relative border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm overflow-hidden">
              {/* image */}
              <div className="relative h-56 sm:h-72 w-full overflow-hidden">
                {/* fade transition when active changes */}
                <div key={active.imageUrl} className="absolute inset-0">
                  <Image
                    src={active.imageUrl}
                    alt={active.name}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    priority={indexOfSelected === 0}
                  />
                  {/* subtle overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                </div>
              </div>

              {/* content */}
              <div
                key={active.name}
                className="p-6 sm:p-8 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <span className="chip">Sector</span>
                  <span className="text-xs text-[rgb(var(--muted))]">
                    Outcomes • Efficiency • Security
                  </span>
                </div>

                <p className="mt-3 text-lg font-semibold text-[rgb(var(--foreground))]">
                  {active.name}
                </p>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                  {active.description}
                </p>

                <div className="mt-5 border-t border-[rgb(var(--border))] pt-4">
                  <p className="text-sm text-[rgb(var(--muted))]">
                    We focus on measurable outcomes, operational efficiency, and secure
                    digital ecosystems tailored to the realities of this sector.
                  </p>
                </div>
              </div>

              {/* loading overlay */}
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[rgb(var(--card))]/85 backdrop-blur-sm">
                  <Spinner label="Loading sector details…" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>

      {/* tiny keyframes for optional micro-bar */}
      <style jsx global>{`
        @keyframes grow {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}
