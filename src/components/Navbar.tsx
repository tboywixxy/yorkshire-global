"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/src/components/ThemeToggle";

// next-intl
import { useLocale, useTranslations } from "next-intl";

// locale-aware Link + locales list
import { Link, locales } from "@/src/navigation";

// Next real pathname (includes locale prefix)
import { usePathname as useNextPathname } from "next/navigation";

// =========================================================
// Helpers
// =========================================================
function normalizePath(p: string) {
  const clean = (p || "/").split("?")[0].split("#")[0];
  if (clean !== "/" && clean.endsWith("/")) return clean.slice(0, -1);
  return clean;
}

/**
 * "/fr/contact" -> "/contact"
 * "/en"         -> "/"
 * "/de/about/"  -> "/about"
 */
function stripLocalePrefix(path: string) {
  const p = normalizePath(path || "/");
  const re = new RegExp(`^/(?:${(locales as readonly string[]).join("|")})(?=/|$)`, "i");
  const stripped = p.replace(re, "");
  return stripped === "" ? "/" : stripped;
}

// active check compares locale-less currentPath with locale-less href
function isActive(pathnameNoLocale: string, href: string) {
  const path = normalizePath(pathnameNoLocale);
  const target = normalizePath(href);
  if (target === "/") return path === "/";
  return path === target || path.startsWith(`${target}/`);
}

// Save + restore scroll so locale switch doesn't jump to top
function useScrollRestoreKey(key: string) {
  const keyRef = useRef(key);
  keyRef.current = key;

  const save = () => {
    try {
      sessionStorage.setItem(
        `__scroll:${keyRef.current}`,
        JSON.stringify({ x: window.scrollX, y: window.scrollY })
      );
    } catch {}
  };

  const restore = () => {
    try {
      const raw = sessionStorage.getItem(`__scroll:${keyRef.current}`);
      if (!raw) return;
      const pos = JSON.parse(raw) as { x: number; y: number };
      // next tick after navigation paint
      requestAnimationFrame(() => window.scrollTo(pos.x || 0, pos.y || 0));
    } catch {}
  };

  return { save, restore };
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-5" aria-hidden>
      <motion.span
        className="absolute left-0 top-[3px] h-[2px] w-full rounded-full bg-white"
        initial={false}
        animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 34, mass: 0.6 }}
      />
      <motion.span
        className="absolute left-0 top-[9px] h-[2px] w-full rounded-full bg-white"
        initial={false}
        animate={open ? { opacity: 0, scaleX: 0.6 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute left-0 top-[15px] h-[2px] w-full rounded-full bg-white"
        initial={false}
        animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 34, mass: 0.6 }}
      />
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"
      />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      aria-hidden
      initial={false}
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.18 }}
      className="opacity-80"
    >
      <path
        fill="currentColor"
        d="M12 15.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 12.67l5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z"
      />
    </motion.svg>
  );
}

function langLabel(l: string) {
  // compact label for the trigger (keeps navbar stable)
  if (l === "en") return "EN";
  if (l === "fr") return "FR";
  if (l === "de") return "DE";
  if (l === "zh") return "ZH";
  return l.toUpperCase();
}

function langName(l: string) {
  // friendly name for dropdown items
  if (l === "en") return "English";
  if (l === "fr") return "Français";
  if (l === "de") return "Deutsch";
  if (l === "zh") return "中文"; // or "Chinese"
  return l.toUpperCase();
}


// =========================================================
// ✅ Locale Dropdown (no scroll jump)
// =========================================================
function LocaleDropdown({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("Nav");
  const raw = useNextPathname() || "/";
  const pathnameNoLocale = stripLocalePrefix(raw);

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Persist scroll on locale switch
  const { save, restore } = useScrollRestoreKey(`localeSwitch:${raw}`);

  // Close on outside click / Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const otherLocales = (locales as readonly string[]).filter((l) => l !== locale);

  return (
    <div ref={wrapRef} className={["relative", className].join(" ")}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("ariaLanguageMenu")}
        aria-expanded={open}
        className={[
          "inline-flex items-center justify-center gap-2",
          "h-10 px-3 rounded-xl",
          "border border-white/10 bg-white/5 backdrop-blur",
          "text-white/95 hover:bg-white/10 transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30",
          "min-w-[72px]" // ✅ keeps navbar stable
        ].join(" ")}
      >
        <span className="text-[11px] font-semibold tracking-wide">{langLabel(locale)}</span>
        <span className="text-white/90">
          <ChevronDown open={open} />
        </span>
      </button>

      {/* Menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="langmenu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className={[
              "absolute right-0 mt-2 z-[999]",
              "w-[140px] overflow-hidden rounded-2xl",
              "border border-white/10 bg-black/70 backdrop-blur-xl",
              "shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            ].join(" ")}
          >
            <div className="p-1">
              {otherLocales.map((l) => (
                <Link
                  key={l}
                  href={pathnameNoLocale} // ✅ locale-less
                  locale={l as any} // ✅ prefixes once
                  scroll={false as any} // ✅ avoid default scroll restoration
                  onClick={() => {
                    // Save scroll, close menu; after route updates, restore.
                    save();
                    setOpen(false);
                    // Restore shortly after nav; rAF handles paint
                    setTimeout(() => restore(), 0);
                  }}
                  className={[
                    "flex items-center justify-between",
                    "px-3 py-2 rounded-xl",
                    "text-[12px] font-semibold",
                    "text-white/90 hover:bg-white/10 transition"
                  ].join(" ")}
                  aria-label={t("switchTo", { lang: langLabel(l) })}
                >
<span>{langName(l)} <span className="opacity-70">({langLabel(l)})</span></span>
                  <span className="opacity-60">↗</span>
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();

  // current URL
  const raw = useNextPathname() || "/";
  const currentPath = stripLocalePrefix(raw);

  const navItems = useMemo(
    () => [
      { href: "/", key: "home" },
      { href: "/about", key: "about" },
      { href: "/services", key: "services" },
      { href: "/industries", key: "industries" },
      { href: "/case-studies", key: "caseStudies" },
      { href: "/contact", key: "contact" }
    ],
    []
  );

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => setMounted(true), []);

  // close mobile menu when route changes
  useEffect(() => {
    if (!mounted) return;
    setOpen(false);
  }, [mounted, currentPath]);

  // lock scroll when mobile menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // detect scroll for header background
  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  // detect theme class changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    const readTheme = () => {
      const isDark = root.classList.contains("dark") || root.getAttribute("data-theme") === "dark";
      setThemeMode(isDark ? "dark" : "light");
    };

    readTheme();

    const obs = new MutationObserver(readTheme);
    obs.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => obs.disconnect();
  }, [mounted]);

  const logoSrc = !mounted
    ? "/logo-w1.png"
    : themeMode === "dark"
    ? "/logo-w1.png"
    : scrolled
    ? "/logo1.png"
    : "/logo-w1.png";

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "transition-colors duration-200",
          scrolled ? "bg-sky-950/45 backdrop-blur border-b border-white/10" : "bg-transparent border-b border-transparent"
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-2 sm:px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between gap-2">
            {/* LOGO */}
            <Link
              href="/"
              aria-label={t("ariaHome")}
              onClick={() => setOpen(false)}
              className="flex items-center shrink-0 -ml-1 sm:-ml-2 min-w-0"
            >
              <span className="relative block h-[80px] w-[360px] max-w-[58vw] sm:h-[92px] sm:w-[440px] sm:max-w-[52vw] md:h-[70px] md:w-[260px] md:max-w-none lg:h-[110px] lg:w-[520px]">
                <Image
                  src={logoSrc}
                  alt={t("logoAlt")}
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 280px"
                />
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center md:flex">
              <div className="relative flex items-center gap-1 rounded-xl p-1 whitespace-nowrap">
                {navItems.map((item) => {
                  const active = isActive(currentPath, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "relative rounded-lg whitespace-nowrap",
                        "px-2.5 py-2 md:px-2 lg:px-3",
                        "text-xs md:text-[11px] lg:text-xs",
                        "font-medium transition",
                        active ? "text-black" : "text-white/90 hover:bg-white/10"
                      ].join(" ")}
                    >
                      {active ? (
                        <motion.span
                          layoutId="desktop-nav-pill"
                          className="absolute inset-y-1 left-0 right-0 rounded-lg bg-white"
                          transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.6 }}
                          style={{ zIndex: 0 }}
                        />
                      ) : null}

                      <span className="relative z-10">{t(item.key as any)}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* DESKTOP RIGHT */}
            <div className="hidden items-center gap-2 md:flex">
              <LocaleDropdown />
              <ThemeToggle />
            </div>

            {/* MOBILE RIGHT */}
            <div className="flex items-center gap-2 md:hidden shrink-0">
              <ThemeToggle />

              <button
                className={[
                  "inline-flex items-center justify-center rounded-xl",
                  "h-10 w-11 shadow-sm transition hover:opacity-90",
                  "bg-transparent"
                ].join(" ")}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? t("ariaCloseMenu") : t("ariaOpenMenu")}
                aria-expanded={open}
              >
                <HamburgerIcon open={open} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobileOverlay"
            className="fixed inset-0 z-[999] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/35" onClick={() => setOpen(false)} />

            <motion.div
              className="absolute inset-0 bg-white text-black dark:bg-zinc-950 dark:text-white overflow-hidden"
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-300/10" />
              <div className="pointer-events-none absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-300/10" />

              <div className="flex items-center justify-between px-5 pt-5">
                <Link href="/" onClick={() => setOpen(false)} aria-label={t("ariaHome")}>
                  <span className="relative block h-12 w-[280px]">
                    <Image
                      src={!mounted ? "/logo1.png" : themeMode === "dark" ? "/logo-w1.png" : "/logo1.png"}
                      alt={t("logoAlt")}
                      fill
                      className="object-contain object-left"
                      sizes="280px"
                      priority
                    />
                  </span>
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/10"
                  aria-label={t("ariaCloseMenu")}
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="px-5 pt-6">
                <div className="flex justify-end">
                  {/* Mobile language dropdown */}
                  <LocaleDropdown className="border border-black/10 dark:border-white/10 bg-transparent" />
                </div>

                <div className="pt-8">
                  <div className="flex flex-col items-end text-right">
                    {navItems.map((item, idx) => {
                      const active = isActive(currentPath, item.href);

                      return (
                        <motion.div
                          key={item.href}
                          initial={{ x: 14, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: 0.05 + idx * 0.03,
                            duration: 0.22,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="w-full"
                        >
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={[
                              "group inline-flex items-center justify-end gap-3",
                              "py-3",
                              "text-xl leading-[1.05] tracking-tight font-semibold",
                              active ? "opacity-100" : "opacity-85 hover:opacity-100"
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "text-[10px] tracking-[0.22em] uppercase opacity-50",
                                "rounded-full border border-black/10 px-2 py-1 dark:border-white/10",
                                active ? "opacity-70" : "group-hover:opacity-70"
                              ].join(" ")}
                            >
                              {String(idx + 1).padStart(2, "0")}
                            </span>

                            <span className="relative">
                              {t(item.key as any)}
                              <span
                                className={[
                                  "absolute -bottom-1 right-0 h-[2px] w-0",
                                  "bg-black/70 dark:bg-white/70",
                                  "transition-all duration-200",
                                  active ? "w-full" : "group-hover:w-full"
                                ].join(" ")}
                              />
                            </span>

                            <span
                              className={[
                                "text-base opacity-40 transition-all duration-200",
                                active ? "translate-x-0 opacity-60" : "group-hover:translate-x-1 group-hover:opacity-60"
                              ].join(" ")}
                              aria-hidden
                            >
                              ↗
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-10 flex items-center justify-end gap-3">
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-sky-950 text-white dark:bg-white dark:text-black text-sm font-semibold shadow-sm"
                    >
                      {t("contactCta")}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="h-10" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
