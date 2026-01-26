// src/app/[locale]/about/SectorsSection.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Sector = {
  name: string;
  description: string;
  imageUrl: string;
};

function Spinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-[rgb(var(--border))] border-t-[rgb(var(--foreground))]" />
      <p className="text-xs text-[rgb(var(--muted))]">{label}</p>
    </div>
  );
}

export default function SectorsSection() {
  const t = useTranslations("About");

  const sectors: Sector[] = useMemo(
    () => [
      {
        name: t("sectors.items.0.name"),
        description: t("sectors.items.0.description"),
        imageUrl:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80",
      },
      {
        name: t("sectors.items.1.name"),
        description: t("sectors.items.1.description"),
        imageUrl:
          "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=2000&q=80",
      },
      {
        name: t("sectors.items.2.name"),
        description: t("sectors.items.2.description"),
        imageUrl:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
      },
      {
        name: t("sectors.items.3.name"),
        description: t("sectors.items.3.description"),
        imageUrl:
          "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=2000&q=80",
      },
      {
        name: t("sectors.items.4.name"),
        description: t("sectors.items.4.description"),
        imageUrl:
          "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=2000&q=80",
      },
      {
        name: t("sectors.items.5.name"),
        description: t("sectors.items.5.description"),
        imageUrl:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2000&q=80",
      },
    ],
    [t]
  );

  const [active, setActive] = useState<Sector>(sectors[0]);
  const [selectedName, setSelectedName] = useState<string>(sectors[0].name);

  const [isLoading, setIsLoading] = useState(false);
  const switchTimerRef = useRef<number | null>(null);
  const autoTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // locale changed: reset selection
    setActive(sectors[0]);
    setSelectedName(sectors[0].name);

    return () => {
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
      if (autoTimerRef.current) window.clearInterval(autoTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const indexOfSelected = useMemo(() => {
    return sectors.findIndex((s) => s.name === selectedName);
  }, [sectors, selectedName]);

  const startAutoRotate = () => {
    if (autoTimerRef.current) window.clearInterval(autoTimerRef.current);

    autoTimerRef.current = window.setInterval(() => {
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

  const handleSelect = (s: Sector, _opts?: { fromAuto?: boolean }) => {
    if (s.name === selectedName) return;

    setSelectedName(s.name);
    setIsLoading(true);

    if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);

    switchTimerRef.current = window.setTimeout(() => {
      setActive(s);
      setIsLoading(false);
    }, 700);
  };

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <SectionHeading title={t("sectors.headingTitle")} subtitle={t("sectors.headingSubtitle")} />

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* LEFT */}
          <div className="lg:col-span-4">
            <div className="border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm">
              <div className="border-b border-[rgb(var(--border))] p-5">
                <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{t("sectors.listTitle")}</p>
                <p className="mt-1 text-sm text-[rgb(var(--muted))]">{t("sectors.listSubtitle")}</p>
              </div>

              <ul className="p-2" aria-label={t("sectors.listAria")}>
                {sectors.map((s) => {
                  const selected = selectedName === s.name;

                  return (
                    <li key={s.name}>
                      <button
                        type="button"
                        onClick={() => handleSelect(s)}
                        aria-pressed={selected}
                        aria-label={t("sectors.itemAria", { name: s.name })}
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
                        <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{s.name}</p>
                        <p className="mt-1 text-xs text-[rgb(var(--muted))]">{t("sectors.viewDetails")}</p>

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

          {/* RIGHT */}
          <div className="lg:col-span-8">
            <div className="relative border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm overflow-hidden">
              <div className="relative h-56 sm:h-72 w-full overflow-hidden">
                <div key={active.imageUrl} className="absolute inset-0">
                  <Image
                    src={active.imageUrl}
                    alt={active.name}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    priority={indexOfSelected === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                </div>
              </div>

              <div key={active.name} className="p-6 sm:p-8 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="chip">{t("sectors.chip")}</span>
                  <span className="text-xs text-[rgb(var(--muted))]">{t("sectors.kicker")}</span>
                </div>

                <p className="mt-3 text-lg font-semibold text-[rgb(var(--foreground))]">{active.name}</p>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">{active.description}</p>

                <div className="mt-5 border-t border-[rgb(var(--border))] pt-4">
                  <p className="text-sm text-[rgb(var(--muted))]">{t("sectors.footerNote")}</p>
                </div>
              </div>

              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[rgb(var(--card))]/85 backdrop-blur-sm">
                  <Spinner label={t("sectors.loading")} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>

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
