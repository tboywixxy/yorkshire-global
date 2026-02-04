"use client";

import Image from "next/image";
import Container from "@/src/components/Container";
import { useTranslations, useLocale } from "next-intl";
import { Link, locales } from "@/src/navigation"; // locale-aware Link
import { usePathname as useNextPathname } from "next/navigation";

// =====================
// Helpers
// =====================
const SUPPORTED_LOCALES = ["en", "fr"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function normalizePath(p: string) {
  const clean = (p || "/").split("?")[0].split("#")[0];
  if (clean !== "/" && clean.endsWith("/")) return clean.slice(0, -1);
  return clean;
}

function stripLocalePrefix(path: string) {
  const p = normalizePath(path || "/");
  const re = new RegExp(
    `^/(?:${(locales as readonly string[]).join("|")})(?=/|$)`,
    "i"
  );
  const stripped = p.replace(re, "");
  return stripped === "" ? "/" : stripped;
}

function toSupportedLocale(l: string): SupportedLocale {
  return (SUPPORTED_LOCALES.includes(l as any) ? l : "en") as SupportedLocale;
}

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = toSupportedLocale(useLocale());
  const raw = useNextPathname() || "/";
  const pathnameNoLocale = stripLocalePrefix(raw);

  return (
    <footer
      className="border-t"
      style={{
        borderColor: "rgb(var(--border))",
        background: "rgb(var(--background))"
      }}
    >
      <Container className="py-8 sm:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <div className="flex items-center justify-start">
              <span className="relative block h-16 w-[300px] sm:h-20 sm:w-[380px] lg:h-24 lg:w-[520px]">
                {/* Light mode logo */}
                <Image
                  src="/logo1.png"
                  alt={t("brand.logoAlt")}
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 380px, 300px"
                  className="absolute inset-0 object-contain object-left opacity-100 dark:opacity-0 transition-opacity duration-200"
                />

                {/* Dark mode logo */}
                <Image
                  src="/logo-w1.png"
                  alt={t("brand.logoAlt")}
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 380px, 300px"
                  className="absolute inset-0 object-contain object-left opacity-0 dark:opacity-100 transition-opacity duration-200"
                />
              </span>
            </div>

            <p className="mt-3 text-sm text-[rgb(var(--muted))]">{t("brand.tagline")}</p>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">{t("brand.locationLine")}</p>
          </div>

          {/* COMPANY */}
          <div>
            <p className="text-sm font-semibold">{t("company.title")}</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/about">
                  {t("company.about")}
                </Link>
              </li>
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/case-studies">
                  {t("company.caseStudies")}
                </Link>
              </li>
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/contact">
                  {t("company.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <p className="text-sm font-semibold">{t("services.title")}</p>
            <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
              <li>{t("services.items.ssdlc")}</li>
              <li>{t("services.items.cybersecurity")}</li>
              <li>{t("services.items.businessAnalysis")}</li>
              <li>{t("services.items.projectManagement")}</li>
              <li>{t("services.items.strategy")}</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <p className="text-sm font-semibold">{t("touch.title")}</p>
            <p className="mt-3 text-sm text-[rgb(var(--muted))]">{t("touch.blurb")}</p>

            <Link href="/contact" className="btn btn-accent mt-4 px-4 py-2">
              {t("touch.cta")}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 flex flex-col gap-3 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderTop: "1px solid rgb(var(--border))",
            color: "rgb(var(--muted))"
          }}
        >
          <p>{t("legal.copyright", { year: new Date().getFullYear() })}</p>

          {/* ✅ Inline language switch: ENGLISH | FRENCH (bold active) */}
          <div className="flex items-center gap-2">
            <Link
              href={pathnameNoLocale}
              locale={"en" as any}
              scroll={false as any}
              className={[
                "uppercase tracking-wide",
                "hover:underline",
                "text-[rgb(var(--foreground))]",
                locale === "en" ? "font-bold" : "font-medium opacity-80"
              ].join(" ")}
              aria-label="Switch language to English"
            >
              ENGLISH
            </Link>

            <span className="opacity-60">|</span>

            <Link
              href={pathnameNoLocale}
              locale={"fr" as any}
              scroll={false as any}
              className={[
                "uppercase tracking-wide",
                "hover:underline",
                "text-[rgb(var(--foreground))]",
                locale === "fr" ? "font-bold" : "font-medium opacity-80"
              ].join(" ")}
              aria-label="Switch language to French"
            >
              FRENCH
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
