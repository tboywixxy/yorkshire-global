"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

type DragState = {
  isDown: boolean;
  startX: number;
  lastX: number;
  velocity: number;
};

export default function IndustriesSection() {
  const industries = useMemo(
    () => [
      "Healthcare",
      "Finance",
      "Technology & SaaS",
      "Public Sector",
      "Gaming & Digital Entertainment",
      "Small and Medium Enterprises",
    ],
    []
  );

  const items = useMemo(() => [...industries, ...industries, ...industries], [industries]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const wRef = useRef<number>(0);
  const xRef = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  const dragRef = useRef<DragState>({
    isDown: false,
    startX: 0,
    lastX: 0,
    velocity: 0,
  });

  const BASE_SPEED = 0.55;
  const FRICTION = 0.92;
  const DRAG_MULT = 1.0;

  const measure = () => {
    const track = trackRef.current;
    if (!track) return;
    wRef.current = track.scrollWidth / 3;
  };

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const tick = () => {
      const track = trackRef.current;
      if (!track) return;

      const drag = dragRef.current;
      const isDragging = drag.isDown;

      if (!isDragging) {
        if (!isHovering) {
          xRef.current -= BASE_SPEED;
        }

        if (Math.abs(drag.velocity) > 0.01) {
          xRef.current -= drag.velocity;
          drag.velocity *= FRICTION;
        } else {
          drag.velocity = 0;
        }
      }

      const W = wRef.current || 1;
      if (xRef.current <= -W) xRef.current += W;
      if (xRef.current > 0) xRef.current -= W;

      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovering]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    dragRef.current.isDown = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.lastX = e.clientX;
    dragRef.current.velocity = 0;

    viewport.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDown) return;

    const dx = (e.clientX - dragRef.current.lastX) * DRAG_MULT;
    dragRef.current.lastX = e.clientX;

    xRef.current += dx;
    dragRef.current.velocity = -dx;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (viewport) {
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch {}
    }
    dragRef.current.isDown = false;
  };

  return (
    <section className="-mt-[10px] py-14 sm:py-16" aria-label="Industries we serve">
      <Container>
        <SectionHeading title="Industries We Serve" />

        <div className="relative mt-6">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12"
            style={{
              background:
                "linear-gradient(to right, rgb(var(--background)) 0%, rgba(0,0,0,0) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12"
            style={{
              background:
                "linear-gradient(to left, rgb(var(--background)) 0%, rgba(0,0,0,0) 100%)",
            }}
          />

          <div
            ref={viewportRef}
            className={[
              "relative overflow-hidden",
              "select-none touch-pan-y",
              dragRef.current.isDown ? "cursor-grabbing" : "cursor-grab",
            ].join(" ")}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="region"
            aria-label="Industries marquee"
          >
            <div
              ref={trackRef}
              className="flex flex-nowrap gap-4 will-change-transform"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              {items.map((industry, idx) => (
                <div
                  key={`${industry}-${idx}`}
                  className={[
                    "shrink-0 p-5 sm:p-6",
                    "border border-[rgb(var(--border))]",
                    "bg-[color-mix(in_srgb,rgb(var(--card))_88%,transparent)]",
                    "backdrop-blur-md",
                    "shadow-sm",
                    "transition-transform duration-300",
                    "hover:-translate-y-1 hover:scale-[1.01]",
                  ].join(" ")}
                  style={{
                    width: "min(300px, 80vw)",
                  }}
                >
                  <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                    {industry}
                  </p>
                  <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                    Tailored support for security, clarity, and delivery.
                  </p>

                  <div className="mt-4 h-px w-16 bg-[rgb(var(--foreground))]/15" />
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs text-[rgb(var(--muted))]">
            Tip: Hover to pause • Drag to scrub
          </p>
        </div>
      </Container>
    </section>
  );
}
