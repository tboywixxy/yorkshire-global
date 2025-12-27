// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

function normalizePath(p: string) {
  const clean = (p || "/").split("?")[0].split("#")[0];
  if (clean !== "/" && clean.endsWith("/")) return clean.slice(0, -1);
  return clean;
}

function isActive(pathname: string, href: string) {
  const path = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === "/") return path === "/";
  return path === target || path.startsWith(`${target}/`);
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
        d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname || "/");

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    setOpen(false);
  }, [mounted, currentPath]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!mounted) return;

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    const readTheme = () => {
      const isDark =
        root.classList.contains("dark") || root.getAttribute("data-theme") === "dark";
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
          scrolled
            ? "bg-sky-950/45 backdrop-blur border-b border-white/10"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-2 sm:px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between gap-2">
            <Link
              href="/"
              aria-label="Go to homepage"
              onClick={() => setOpen(false)}
              className="flex items-center shrink-0 -ml-1 sm:-ml-2 min-w-0"
            >
              {/* ✅ ONLY CHANGE: shrink logo at md so desktop nav fits (fixes 812px overflow) */}
              <span className="relative block h-[80px] w-[360px] max-w-[58vw] sm:h-[92px] sm:w-[440px] sm:max-w-[52vw] md:h-[70px] md:w-[260px] md:max-w-none lg:h-[110px] lg:w-[520px]">
                <Image
                  src={logoSrc}
                  alt="Yorkshire Global Consulting Inc. logo"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 280px"
                />
              </span>
            </Link>

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
                        active ? "text-black" : "text-white/90 hover:bg-white/10",
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

                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2 md:hidden shrink-0">
              <ThemeToggle />

              <button
                className={[
                  "inline-flex items-center justify-center rounded-xl",
                  "h-10 w-11 shadow-sm transition hover:opacity-90",
                  "bg-transparent",
                ].join(" ")}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <HamburgerIcon open={open} />
              </button>
            </div>
          </div>
        </div>
      </header>

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
                <Link href="/" onClick={() => setOpen(false)} aria-label="Go to homepage">
                  <span className="relative block h-12 w-[280px]">
                    <Image
                      src={!mounted ? "/logo1.png" : themeMode === "dark" ? "/logo-w1.png" : "/logo1.png"}
                      alt="Yorkshire Global Consulting Inc. logo"
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
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="px-5 pt-10">
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
                          ease: [0.22, 1, 0.36, 1],
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
                            active ? "opacity-100" : "opacity-85 hover:opacity-100",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "text-[10px] tracking-[0.22em] uppercase opacity-50",
                              "rounded-full border border-black/10 px-2 py-1 dark:border-white/10",
                              active ? "opacity-70" : "group-hover:opacity-70",
                            ].join(" ")}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>

                          <span className="relative">
                            {item.label}
                            <span
                              className={[
                                "absolute -bottom-1 right-0 h-[2px] w-0",
                                "bg-black/70 dark:bg-white/70",
                                "transition-all duration-200",
                                active ? "w-full" : "group-hover:w-full",
                              ].join(" ")}
                            />
                          </span>

                          <span
                            className={[
                              "text-base opacity-40 transition-all duration-200",
                              active
                                ? "translate-x-0 opacity-60"
                                : "group-hover:translate-x-1 group-hover:opacity-60",
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
                    Contact Us
                  </Link>
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
