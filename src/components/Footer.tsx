"use client";

import Image from "next/image";
import Container from "@/src/components/Container";
import { useTranslations, useLocale } from "next-intl";
import { Link, locales } from "@/src/navigation";
import { usePathname as useNextPathname } from "next/navigation";

// =====================
// Helpers
// =====================
const SUPPORTED_LOCALES = ["en", "fr"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
const CONTACT_PHONE = "+1 (249) 800-5266";
const CONTACT_PHONE_HREF = "tel:+12498005266";

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
  const tHome = useTranslations("Home");
  const locale = toSupportedLocale(useLocale());
  const raw = useNextPathname() || "/";
  const pathnameNoLocale = stripLocalePrefix(raw);

  const serviceLinks = [
    {
      href: "/services/managed-it-support",
      label: tHome("services.items.0.title"),
    },
    {
      href: "/services/secure-ai-development",
      label: tHome("services.items.1.title"),
    },
    {
      href: "/services",
      label: tHome("services.items.2.title"),
    },
    {
      href: "/services",
      label: tHome("services.items.3.title"),
    },
    {
      href: "/services",
      label: tHome("services.items.4.title"),
    },
    {
      href: "/services",
      label: tHome("services.items.5.title"),
    },
    {
      href: "/services",
      label: tHome("services.items.6.title"),
    },
  ];

  return (
    <footer
      className="border-t"
      style={{
        borderColor: "rgb(var(--border))",
        background: "rgb(var(--background))",
      }}
    >
      <Container className="py-8 sm:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center justify-start">
              <span className="relative block h-16 w-[300px] sm:h-20 sm:w-[380px] lg:h-24 lg:w-[520px]">
                <Image
                  src="/logo1.png"
                  alt={t("brand.logoAlt")}
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 380px, 300px"
                  className="absolute inset-0 object-contain object-left opacity-100 transition-opacity duration-200 dark:opacity-0"
                />

                <Image
                  src="/logo-w1.png"
                  alt={t("brand.logoAlt")}
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 380px, 300px"
                  className="absolute inset-0 object-contain object-left opacity-0 transition-opacity duration-200 dark:opacity-100"
                />
              </span>
            </div>

            <p className="mt-3 text-sm text-[rgb(var(--muted))]">{t("brand.tagline")}</p>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">{t("brand.locationLine")}</p>
          </div>

          <div>
            <p className="text-sm font-semibold">{t("company.title")}</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/about">
                  {t("company.about")}
                </Link>
              </li>
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/industries">
                  Industries
                </Link>
              </li>
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/case-studies">
                  {t("company.caseStudies")}
                </Link>
              </li>
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">{t("services.title")}</p>
            <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
              {serviceLinks.map((item, index) => (
                <li key={`${item.href}-${index}`}>
                  <Link
                    className="hover:text-[rgb(var(--foreground))] hover:underline"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">{t("touch.title")}</p>
            <p className="mt-3 text-sm text-[rgb(var(--muted))]">{t("touch.blurb")}</p>

            <div className="mt-4 flex flex-col items-start gap-3">
              <Link href="/contact" className="btn btn-accent px-4 py-2">
                Contact Us
              </Link>

              <a
                href={CONTACT_PHONE_HREF}
                className="block text-sm font-medium text-[rgb(var(--foreground))] hover:underline"
              >
                {CONTACT_PHONE}
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col gap-3 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderTop: "1px solid rgb(var(--border))",
            color: "rgb(var(--muted))",
          }}
        >
          <p>{t("legal.copyright", { year: new Date().getFullYear() })}</p>

          <div className="flex items-center gap-2">
            <Link
              href={pathnameNoLocale}
              locale={"en" as any}
              scroll={false as any}
              className={[
                "uppercase tracking-wide",
                "hover:underline",
                "text-[rgb(var(--foreground))]",
                locale === "en" ? "font-bold" : "font-medium opacity-80",
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
                locale === "fr" ? "font-bold" : "font-medium opacity-80",
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