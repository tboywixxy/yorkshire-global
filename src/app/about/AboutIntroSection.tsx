// app/about/AboutIntroSection.tsx
"use client";

import Image from "next/image";
import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import HeroCornerBrand from "@/src/components/HeroCornerBrand";

const HERO_URL =
  "https://images.unsplash.com/photo-1740560051546-bdcc3ee72def?auto=format&fit=crop&w=2400&q=80";

export default function AboutIntroSection() {
  return (
    <section className="-mt-14">
      {/* HERO (edge-to-edge, fills screen) */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="relative h-[44vh] min-h-[360px] w-full">
          <Image
            src={HERO_URL}
            alt="About Yorkshire Global Consulting"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_70%]"
          />

          {/* lighter overlays */}
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-4 z-20">
            <Container>
              <HeroCornerBrand text="Yorkshire Global Consulting Inc. — About" />
            </Container>
          </div>

          <div className="relative z-10 h-full pt-14" />
        </div>
      </div>

      {/* Content */}
      <Container className="pt-10">
        <SectionHeading
          title="About Us"
          subtitle={
            <div className="max-w-3xl pr-6 sm:pr-10">
              <p className="leading-relaxed">
                <span className="font-serif text-lg sm:text-xl font-semibold text-[rgb(var(--foreground))]">
                  Yorkshire Global Consulting Inc.
                </span>{" "}
                is a premium, Canadian-based consulting firm in Ontario delivering world-class expertise across{" "}
                <span className="font-medium text-[rgb(var(--primary))]">technology</span>,{" "}
                <span className="font-medium text-[rgb(var(--accent))]">cybersecurity</span>,{" "}
                <span className="font-medium text-[rgb(var(--primary))]">business process reengineering</span>,{" "}
                <span className="font-medium text-[rgb(var(--accent))]">business analysis</span>,{" "}
                <span className="font-medium text-[rgb(var(--primary))]">project management</span>, and{" "}
                <span className="font-medium text-[rgb(var(--accent))]">enterprise solution deployment</span>.
              </p>
            </div>
          }
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm lg:col-span-2">
            <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">
              We help organizations modernize, scale, and secure their operations through strategic guidance,
              digital transformation, and hands-on execution. We bring together expertise in secure development,
              risk management, and delivery discipline to support organizations in an evolving technological landscape.
            </p>

            <div className="mt-6 border border-[rgb(var(--border))] bg-[color-mix(in_srgb,rgb(var(--background))_92%,rgb(var(--primary))_8%)] p-5">
              <p className="text-sm font-semibold text-[rgb(var(--foreground))]">What makes us different</p>
              <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                Our team brings deep industry experience and a global perspective—so we deliver measurable results,
                operational efficiency, and secure digital ecosystems for the modern enterprise.
              </p>

              <div className="mt-4 relative h-44 w-full overflow-hidden border border-[rgb(var(--border))]">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80"
                  alt="Team collaboration"
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1600&q=80"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover blur-2xl scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-[rgb(var(--card))]/60" />
            </div>

            <div className="relative p-4">
              <div className="relative h-56 w-full overflow-hidden border border-[rgb(var(--border))] sm:h-64">
                <Image
                  src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&w=1600&q=80"
                  alt="Cybersecurity and technology"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              <div className="mt-5 border-t border-[rgb(var(--border))] pt-5">
                <p className="text-sm font-semibold text-[rgb(var(--foreground))]">Our focus</p>

                <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
                  <li>• Security-first delivery</li>
                  <li>• Modernization & digital transformation</li>
                  <li>• Operational efficiency & governance</li>
                  <li>• Enterprise deployment & execution</li>
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="chip">Ontario</span>
                  <span className="chip">Canada</span>
                  <span className="chip">Global perspective</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
