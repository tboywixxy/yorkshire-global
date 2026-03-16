"use client";

import React from "react";
import Container from "@/src/components/Container";
import { useTranslations } from "next-intl";

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 flex-none text-emerald-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function TrustSection() {
  const t = useTranslations("Home.trust");
  const points = t.raw("points") as string[];

  return (
    <section className="relative py-24 overflow-hidden bg-slate-950">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.12),transparent)]" />
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        <div className="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          {points.map((point, idx) => (
            <div
              key={point}
              className="group flex items-center gap-4 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 hover:border-emerald-500/30 px-6 py-5 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-950/80 border border-emerald-800/50 group-hover:border-emerald-600/50 transition-colors">
                <CheckIcon />
              </div>
              <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors leading-snug">
                {point}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
